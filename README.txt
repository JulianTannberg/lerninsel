Lerninsel v8.8 – Komplettpaket – 17.09.2026

Diese ZIP kann vollständig in das bestehende GitHub-Repository hochgeladen werden.
Vorhandene gleichnamige Dateien und Ordner ersetzen.

Enthalten:
- vollständige PWA mit index.html, config.js, Manifest, Service Worker und Icons
- Deutsch: Balladen, John Maynard, Inhaltsangabe und Hausaufgabenhilfe mit 8 Stichpunkten
- Natur: Licht und Sehen, Lichtquellen, Lichtausbreitung, G/g/B/b, Schattenwurf,
  Lochblende, Spiegelung mit Lot und Geodreieck sowie Winkelspiegel
- Natur: Vorbereitung und vierseitige Probe-Arbeit als PDF
- Englisch: Vokabeln und Sätze; eigene Vokabeln können im Lehrerbereich ergänzt werden
- Multiple-Choice-Antworten werden gemischt
- Quiz: 1 Punkt pro richtiger Antwort, bei 8 Fragen höchstens 8 Punkte
- Schließen/Abbrechen bei Übungen, Quizzen und Live-Quiz
- Lehrerbereich: Lernraum kann direkt unter Inhalte oder Schüler erstellt werden
- Lehrerbereich: eigener Testmodus ohne Speicherung echter Lernstände;
  das Minispiel ist dort bereits mit 0 Punkten testbar

GitHub:
Alle Dateien und den Ordner icons/ hochladen und vorhandene Dateien ersetzen.

Supabase:
Nur falls die v8-Erweiterungen dort noch nicht ausgeführt wurden:
1. supabase_v8_migration.sql ausführen.
2. Danach supabase_v8_1_fix.sql ausführen.
Die SQL-Dateien sind nicht für GitHub nötig, sondern für den Supabase SQL Editor.

Nach dem Hochladen die Lerninsel einmal vollständig neu laden. Der neue
Service-Worker-Cache heißt lerninsel-v8.8-20260917.
