LERNINSEL v9.0.7 – Fächer pro Raum und Schüler pausieren

In GitHub im Repository "lerninsel" ersetzen:
- app.js
- sw.js

Danach einmal in Supabase im SQL Editor vollständig ausführen:
- supabase_v9_0_7_faecher_pause.sql

Fächerfreigabe:
- Im Lehrerbereich unter „Schüler“ können Fächer für den ganzen Raum
  pausiert oder fortgesetzt werden.
- Zusätzlich kann jedes Fach für einzelne Schüler pausiert werden.
- Pausierte Fächer werden in der Schüler- und Elternansicht ausgeblendet.
- Inhalte, bisherige Lernstände und Zugangscodes bleiben erhalten.
- Die Fächer heißen Mathe, Englisch, Deutsch, GSEL 1, GSEL 2 und Natur.

Die neue Deutsch-Hausaufgabe führt jetzt vom Einleitungssatz mit Titel,
Autor, Textsorte und Thema über vier kleine Abschnitte zur vollständigen
Inhaltsangabe. Satzanfänge und Beispiele erscheinen nur bei Bedarf.
Am Ende wird der vollständige Text zusammengesetzt und mit fünf Punkten geprüft.

Englisch:
- Flashkarten und Schreibtraining sind jetzt getrennt.
- Flashkarten lassen sich antippen und umdrehen.
- Bei den Flashkarten ist Deutsch nach Englisch voreingestellt.
- Die Richtung kann auf Englisch nach Deutsch gewechselt werden.
- Im Schreibtraining steht immer das deutsche Wort da und die englische
  Übersetzung muss selbst geschrieben werden.
- Falsche Wörter kommen in derselben Runde erneut.
- Richtig geschriebene Wörter erscheinen mit wachsenden Abständen wieder.
- Ältere Vokabeln bleiben dadurch erhalten, werden aber seltener abgefragt.

Geplant, aber in dieser Version noch nicht enthalten:
- Buchseiten für Englisch übernehmen und daraus Lückentexte erzeugen.

Zugangscodes:
- Neu erstellte oder neu vergebene Codes werden im Lehrerbereich angezeigt.
- Zugangsdaten können vollständig kopiert und erneut verschickt werden.
- Wenn ein alter Code nicht mehr bekannt ist, kann ein neuer vergeben werden.
- Vor dem ersten Zurücksetzen eines Elterncodes bitte zusätzlich
  supabase_v9_0_4_code_reset.sql einmal in Supabase ausführen.

Quiz:
- Kein Zeitdruck mehr im normalen Schülerquiz.
- Nach der Antwort werden richtige und falsche Möglichkeiten erklärt.
- Erst mit „Weiter“ erscheint die nächste Frage.
- Zehn neue Fragen zu Licht und Optik sind bereits enthalten.
- Die offensichtlich unsinnige Antwort zum Mond wurde ersetzt.
- Nach dem Hochladen im Lehrerbereich unter „Inhalte“ einmal
  „Neues Optik-Quiz für diese Klasse übernehmen“ drücken.

NotebookLM-Import:
- Im Lehrerbereich unter „Inhalte“ kann ein NotebookLM-Quiz als JSON
  eingefügt werden.
- Fach, Thema und Klassen auswählen und „Quiz importieren“ drücken.
- Das erwartete Format enthält questions, answers, correct und explanation.
