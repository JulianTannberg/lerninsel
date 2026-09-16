(() => {
  const state = {
    active: false,
    queue: [],
    retry: [],
    index: 0,
    round: 1,
    currentId: null,
    locked: false,
    buttons: new Map()
  };

  function addStyles() {
    if (document.getElementById('lerninselUxStyles')) return;
    const style = document.createElement('style');
    style.id = 'lerninselUxStyles';
    style.textContent = `
      .practiceLaunch{grid-column:1/-1}
      .practiceLaunch .practiceBig{width:100%;padding:15px 18px;font-size:1.08rem;font-weight:800;margin-top:10px}
      .sessionProgress{display:flex;justify-content:space-between;gap:10px;align-items:center;background:#eef4fb;border-radius:12px;padding:9px 11px;margin:0 0 12px;font-size:.86rem;font-weight:700;color:#334866}
      .sessionToast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;background:#e5f5e9;border:1px solid #91c59d;border-radius:14px;padding:12px 16px;box-shadow:0 8px 28px rgba(0,0,0,.16);font-weight:800;max-width:calc(100% - 28px);text-align:center}
    `;
    document.head.appendChild(style);
  }

  function patchPracticeOverview() {
    const root = document.getElementById('studentTasks');
    if (!root) return;

    [...root.querySelectorAll('.subjectHead')].forEach(head => {
      const title = head.querySelector('h3')?.textContent || '';
      if (!title.includes('Üben')) return;
      const grid = head.nextElementSibling;
      if (!grid || !grid.classList.contains('grid') || grid.dataset.practicePatched === '1') return;

      const buttons = [...grid.querySelectorAll('.openItem')];
      if (!buttons.length) return;

      const ids = buttons.map(b => b.dataset.id).filter(Boolean);
      buttons.forEach(b => state.buttons.set(b.dataset.id, b));
      const completed = [...grid.querySelectorAll('.card.task')].filter(card => card.querySelector('.badge.good')).length;

      grid.dataset.practicePatched = '1';
      grid.innerHTML = `
        <div class="card practiceLaunch">
          <div class="studentRow">
            <div>
              <strong>Übungsrunde</strong>
              <div class="small">Eine Frage nach der anderen. Falsche Fragen kommen am Ende wieder.</div>
            </div>
            <span class="badge ${completed === ids.length ? 'good' : ''}">${completed}/${ids.length} erledigt</span>
          </div>
          <button class="primary practiceBig" type="button">${completed ? 'Noch einmal üben' : 'Übung starten'}</button>
        </div>`;

      grid.querySelector('.practiceBig')?.addEventListener('click', () => startSession(ids));
    });
  }

  function startSession(ids) {
    if (!ids.length) return;
    state.active = true;
    state.queue = [...ids];
    state.retry = [];
    state.index = 0;
    state.round = 1;
    state.currentId = null;
    state.locked = false;
    launchNext();
  }

  function launchNext() {
    if (!state.active) return;

    if (state.index >= state.queue.length) {
      if (state.retry.length) {
        state.queue = [...state.retry];
        state.retry = [];
        state.index = 0;
        state.round += 1;
      } else {
        finishSession();
        return;
      }
    }

    const id = state.queue[state.index++];
    state.currentId = id;
    state.locked = false;

    const open = (tries = 0) => {
      const btn = state.buttons.get(id);
      if (!btn) {
        if (tries > 25) {
          finishSession();
          return;
        }
        setTimeout(() => open(tries + 1), 80);
        return;
      }
      btn.click();
      setTimeout(addSessionProgress, 30);
    };
    open();
  }

  function addSessionProgress() {
    if (!state.active) return;
    const inside = document.getElementById('workInside');
    if (!inside || inside.querySelector('.sessionProgress')) return;
    const label = state.round === 1
      ? `Frage ${state.index} von ${state.queue.length}`
      : `Wiederholung · Frage ${state.index} von ${state.queue.length}`;
    const box = document.createElement('div');
    box.className = 'sessionProgress';
    box.innerHTML = `<span>${label}</span><span>${state.round === 1 ? 'Üben' : 'Nochmal dran'}</span>`;
    inside.prepend(box);
  }

  function finishSession() {
    state.active = false;
    state.currentId = null;
    state.locked = false;
    const dlg = document.getElementById('workDialog');
    if (dlg?.open) dlg.close();
    try { if (typeof renderStudent === 'function') renderStudent(); } catch (_) {}
    const toast = document.createElement('div');
    toast.className = 'sessionToast';
    toast.textContent = '✓ Geschafft! Alle Fragen wurden richtig beantwortet.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }

  function moveOn(ok) {
    if (!state.active || state.locked) return;
    state.locked = true;

    if (!ok && state.currentId && !state.retry.includes(state.currentId)) {
      state.retry.push(state.currentId);
    }

    const feedback = document.querySelector('#workInside #feedback .feedback');
    if (feedback && !ok) {
      feedback.textContent = 'Noch nicht richtig. Diese Frage kommt am Ende noch einmal.';
    }

    document.querySelectorAll('#workInside button, #workInside select').forEach(el => {
      if (el.id !== 'closeWork') el.disabled = true;
    });

    setTimeout(() => {
      const dlg = document.getElementById('workDialog');
      if (dlg?.open) dlg.close();
      launchNext();
    }, ok ? 500 : 900);
  }

  function inspectAnswerResult() {
    if (!state.active || state.locked) return;
    const feedback = document.querySelector('#workInside #feedback .feedback');
    if (!feedback) return;
    const text = feedback.textContent || '';
    if (feedback.classList.contains('ok')) {
      moveOn(true);
      return;
    }
    if (feedback.classList.contains('no') &&
        /Noch nicht richtig|Noch ist mindestens eine Lücke falsch|Reihenfolge stimmt noch nicht/i.test(text)) {
      moveOn(false);
    }
  }

  // Lernseite: sichtbar bestätigen und automatisch schließen.
  document.addEventListener('click', e => {
    const btn = e.target.closest?.('#readDone');
    if (!btn) return;
    btn.textContent = '✓ Gelesen – gespeichert';
    btn.disabled = true;
    setTimeout(() => {
      const close = document.getElementById('closeWork');
      if (close) close.click();
      else {
        const dlg = document.getElementById('workDialog');
        if (dlg?.open) dlg.close();
      }
    }, 450);
  }, true);

  // Übungsrunde: nach dem Prüfen automatisch weiter bzw. falsch ans Ende.
  document.addEventListener('click', e => {
    if (!state.active) return;
    const btn = e.target.closest?.('button');
    if (!btn) return;
    const isCheck = btn.id === 'checkBtn' || btn.textContent.trim() === 'Antwort prüfen';
    if (!isCheck) return;
    setTimeout(inspectAnswerResult, 80);
  });

  // Bewusstes Schließen beendet die laufende Übungsrunde.
  document.addEventListener('click', e => {
    if (!state.active) return;
    if (e.target.closest?.('#closeWork')) {
      state.active = false;
      state.currentId = null;
      state.locked = false;
    }
  });

  addStyles();
  patchPracticeOverview();

  const studentTasks = document.getElementById('studentTasks');
  if (studentTasks) {
    new MutationObserver(() => {
      setTimeout(patchPracticeOverview, 0);
    }).observe(studentTasks, { childList: true, subtree: true });
  }
})();
