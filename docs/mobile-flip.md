# Mobiler Blättereffekt · 09.11.2026

Mobile hatte zuvor einen direkten Seitenwechsel ohne Animation. Jetzt erhält jede der zwei lesbaren mobilen Seiten beim Wechsel ein temporäres zweiseitiges Drehblatt mit Vorder- und Rückseite. Die echte Zielseite liegt bereits vor Beginn deckend darunter. Perspektive und rotateY wirken über 680ms, vorwärts links angeschlagen, rückwärts rechts. Die Hintergrundseiten bleiben währenddessen dauerhaft gemountet; der sichtbare Endzustand wird synchron übernommen, bevor die Drehblätter entfernt werden. Keine Daten-/Bildabfrage beim Blättern, keine Ladeanzeige oder künstliche Wartezeit. Reduced Motion wechselt direkt. Busy-Sperre verhindert parallele Turns. Desktop-Blätter bleiben unverändert.

Mobile benötigt maximal zwei temporäre Drehblätter (je zwei Flächen). Nur Nachbarn/aktives Ziel werden vorbereitet, keine pauschalen GPU-Layer für sämtliche Menüseiten. Originalfarben, Inhalte und Original-Logo unverändert.

Prüfung: 28 Blättervorgänge (zweimal vor/zurück, Dessert/Hauptgerichte/Suppen) über 360/390/760/1440px. Während der Bewegung wurden laufend 3D-Matrizen und Layoutboxen der Zielseiten erfasst. Alle 21 mobilen Vorgänge hatten echte 3D-Matrizen; Zielseiten waren in jeder Stichprobe vorhanden, display:flex und mit positiver Höhe. Ein während Rückwärtsrotation gefundener horizontaler Überlauf wurde durch Clip am mobilen Bühnenrand behoben; vollständige Reihe danach fehlerfrei. Keine Browserwarnungen/-fehler. Production Build, Typecheck, ESLint der geänderten Komponente und elf Regressionstests erfolgreich. Bekannter Node-Modultyp-Hinweis ist kein Testfehler.

Grenze: Browser-Viewporttests, kein physisches Smartphone und keine CPU-/Netzwerk-Drosselung. Keine pauschale Garantie für jedes Mobilgerät. Messdaten: reports/mobile-flip-browser.json.

Preview bleibt öffentlich/noindex. Keine Kundendomain/DNS geändert.

Live geprüft: https://koenig-von-preussen-preview-7pahvm9u2-naser-solutions.vercel.app/speisekarte/
READY, öffentlich und noindex. Fünf Vor-/Zurück-/Kategoriesprünge live bei 390px: 3D-Bewegung in allen Fällen gemessen, keine leeren Zielseiten oder horizontaler Overflow; keine Konsolenfehler/-warnungen.
