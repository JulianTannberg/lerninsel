LERNINSEL v8 – NEUAUFBAU

Neu in dieser Version:
- Ein Fach kann beliebig viele Themen enthalten.
- Jedes Thema kann Lernen, Üben, Hausaufgaben und Quiz enthalten.
- Üben läuft als eine Runde: eine Aufgabe nach der anderen; falsche/unsichere Aufgaben kommen am Ende wieder.
- Flashkarten mit „Antwort zeigen“, „Gewusst“, „Unsicher“, „Nicht gewusst“.
- Lernseiten schließen nach „Gelesen“ automatisch.
- Themengebundene Solo-Quizze mit Zeit und Quizpunkten.
- Live-Quiz mit 6-stelligem Spielcode (Supabase-Erweiterung nötig).
- Schülerprofil mit Spitzname + Avatar.
- Inselpunkte fachübergreifend.
- Je 4 Inselpunkte wird eine globale Spielrunde freigeschaltet.
- Minispiel „Muschel-Sammler“.
- Elternzugang nur noch mit Lernraum-Code + persönlichem Elterncode, ohne E-Mail.
- Ein Gerät merkt sich seine Rolle; Schüler sehen danach nicht die Lehrer-/Elternauswahl.
- Lehrerzugang bleibt mit E-Mail + Passwort geschützt.

DATEIEN AUF GITHUB:
Alle Dateien/Ordner aus diesem Paket in das Repository hochladen.
Vorhandene gleichnamige Dateien ersetzen:
  index.html
  app.js
  config.js
  manifest.webmanifest
  sw.js
  icons/

SUPABASE:
1. Supabase öffnen.
2. SQL Editor öffnen.
3. Inhalt aus supabase_v8_migration.sql ausführen.
   Das Skript ergänzt die bestehende Datenbank und löscht keine bisherigen Schüler-/Lernstände.
4. Danach in der Lerninsel als Lehrer anmelden.
5. Unter „Inhalte“ auf „Piratenpaket / neue Struktur synchronisieren“ klicken.

TEST:
- Demo-Schüler: Schülergerät einrichten → „Nur Demo auf diesem Gerät“.
- Im Demo-Modus sind Piraten, Flashkarten, Quiz, Inselpunkte und Minispiel direkt testbar.
- Online braucht ein echter Schüler Lernraum-Code + persönlichen Schülercode.
- Eltern brauchen Lernraum-Code + den im Lehrerbereich erzeugten Elterncode.

Direktlinks für die spätere Verteilung:
  ?rolle=schueler
  ?rolle=eltern
  ?rolle=lehrer

Beispiel:
https://DEINE-DOMAIN/lerninsel/?rolle=schueler
