# Mobile Seitenbereitschaft

Codebefund: Alle physischen Blätter waren bereits dauerhaft im DOM. Mobile CSS setzte jedoch jede nicht aktuelle Fläche auf display:none. Damit fehlten Nachbarseiten ihre Layout-/Paintflächen bis zum setIndex. Es gab keinen nachgelagerten Datenabruf pro Gericht; die textbasierten Inhaltsseiten verwenden dieselben bereits auf der Seite benutzten Fonts. Dieser Codepfad kann zusätzliche Layoutarbeit im Moment des Wechsels verursachen. Das konkrete vom Nutzer beobachtete Flackern auf einem realen Smartphone wurde nicht reproduziert.

Korrektur: Aktuelle, vorherige und nächste Öffnung erhalten auf Mobile vollständige Layoutboxen. Vorbereitete Seiten liegen absolut in derselben Grid-Zeile unter den deckenden aktiven Seiten, mit niedrigerem z-index, aria-hidden/inert. Nur entfernte Seiten bleiben display:none. Die sichtbaren Seiten bestimmen wie bisher die Höhe; vorbereitete Inhalte werden am Buchrahmen geclippt. Bei einem entfernten Kategoriesprung wird das Ziel zuerst synchron unter der aktuellen Öffnung aktiviert und sein Layout aufgelöst, danach wechseln aktive Seiten und Zähler in einem gemeinsamen synchronen Commit. Keine Timeouts, keine neue Animation, kein Remount der Blätter. Pagination und Seiteninhalt sind memoisiert. Das Original-Logo wird früh geladen; keine zusätzlichen Medien und keine neuen Abhängigkeiten. Desktop-3D unverändert.

Prüfungen: Production Build, Typecheck, ESLint und elf vorhandene Tests bestanden. 36 Browserfälle auf 360/390/760/1440px: mehrfach vor/zurück und Kategorien Suppen/Dessert/Hauptgerichte. Alle als bereit markierten Flächen hatten display:flex und positive Breite/Höhe, auch bevor sie aktiv wurden. Kein horizontaler Overflow, keine Konsolenwarnungen/-fehler. Mobile Screenshot visuell kontrolliert.

Grenze: Desktop-Browser mit schmalem Viewport, kein physisches Smartphone und keine CPU-/Netzwerk-Drosselung. Damit kein Nachweis für sämtliche mobilen GPU-/Rasterisierungsbedingungen. Die bestätigte Korrektur betrifft die Layoutbereitschaft und den synchronen Sichtbarkeitswechsel.

Messdaten: reports/mobile-ready-browser.json. Sicherung: Helsa_Sicherung_MobileReady_20261108_235506. Keine Kunden-Domain/DNS geändert; Preview bleibt öffentlich/noindex.

Live geprüft: https://koenig-von-preussen-preview-5hq1ihicy-naser-solutions.vercel.app/speisekarte/
READY, öffentlich ohne Anmeldung; vorbereitete Seiten 2/3 schon vor erstem Klick mit vollständigen Layoutboxen bestätigt. Vor/zurück und Kategorien live geprüft, keine Konsolenwarnungen/-fehler, noindex bestätigt.
