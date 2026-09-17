Lerninsel v9.0 – Komplettpaket – 17.09.2026

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
- Lehrerbereich auf dem Handy: alle sechs Bereiche bleiben sichtbar
- Schüler werden über feste Eingabefelder statt über Browser-Popups angelegt
- Eigene Englisch-Vokabeln werden direkt mit Englisch- und Deutsch-Feld eingetragen
- mehrere Klassen/Lernräume mit Umschaltung im Lehrerbereich
- dauerhafte Inhaltsbibliothek: Klassen per Haken zuweisen oder ausblenden
- Abwählen löscht weder Inhalt noch vorhandenen Lernstand
- „Buchseiten – Thema“ mit bis zu sechs Originalfotos/PDFs und Zusammenfassung
- Hausaufgaben mit Pflichtdatum, optionalem Abgabedatum, Originalfoto und Hilfen
- in der Schülerübersicht erscheinen nur unerledigte, datierte Hausaufgaben
- benannte Elternzugänge mit eigenem Elterncode pro Schüler

GitHub:
Alle Dateien und den Ordner icons/ hochladen und vorhandene Dateien ersetzen.

Supabase – wichtig:
Bei einer bereits eingerichteten Lerninsel:
1. Falls noch nicht geschehen: supabase_v8_migration.sql ausführen.
2. Falls noch nicht geschehen: supabase_v8_1_fix.sql ausführen.
3. Danach zwingend einmal supabase_v9_klassen_inhalte.sql ausführen.

Bei einer ganz neuen, leeren Supabase-Datenbank:
1. supabase_basis_mit_eltern.sql ausführen.
2. supabase_v8_migration.sql ausführen.
3. supabase_v8_1_fix.sql ausführen.
4. supabase_v9_klassen_inhalte.sql ausführen.

Die Basisdatei NICHT erneut über eine bereits eingerichtete Datenbank laufen lassen.
Die v9-Datei ergänzt mehrere Klassen, die Inhaltsbibliothek und benannte
Elternzugänge. Bestehende Schüler, Inhalte und Lernstände werden nicht gelöscht.

Hinweis: Die Zusammenfassung zu fotografierten Buchseiten wird im Lehrerbereich
eingefügt oder geschrieben. Eine automatische KI-Texterkennung ist in dieser
offlinefähigen ZIP nicht enthalten.

Nach dem Hochladen die Lerninsel einmal vollständig neu laden. Der neue
Service-Worker-Cache heißt lerninsel-v9.0-20260917.
