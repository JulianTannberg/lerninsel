LERNINSEL PWA – SICHERE VERSION

Supabase ist bereits in config.js eingetragen.
Das SQL-Schema supabase.sql wurde für Lehrer-, Schüler- und Elternzugang erstellt.

Nächste Schritte:
1. In Supabase Authentication prüfen/konfigurieren (E-Mail + Passwort).
2. Dateien dieses Ordners in ein GitHub-Repository hochladen.
3. GitHub Pages aktivieren (main / root).
4. PWA öffnen.
5. Lehrer: Konto anlegen/anmelden -> Lernraum erstellen -> Schüler anlegen -> Lernmaterial synchronisieren.
6. Schüler: Lernraum-Code + persönlicher Schülercode.
7. Eltern: Konto anlegen/anmelden -> Lernraum-Code + einmaligen Elterncode einlösen.

Sicherheit:
- Der Publishable Key in config.js ist für Browser-Apps vorgesehen.
- Niemals secret/service_role Keys in GitHub oder die PWA eintragen.
- Lehrer- und Eltern-RPCs verlangen ein authentifiziertes Supabase-Konto.
- Schülerdaten werden über Lernraum-Code + persönlichen Code serverseitig gefiltert.
