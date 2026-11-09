# Speisekartenbuch und kompakter Footer · 08.11.2026

## Umsetzung
Originaldaten aus content/menu.json vollständig und unverändert: 26 Gerichte in 5 Kategorien, auf 10 Buchseiten mit maximal 3 Gerichten verteilt. Rot/Creme/Original-SVG-Logo wie im bestehenden Markenauftritt. Desktop: linker Einband mit Original-Logo und ruhiger typografischer Gestaltung, rechts ein Papierblatt mit perspektivischem Seitenwechsel. Mobile: einspaltiges Buch mit Original-Logo, während der Buchansicht griffbereiten Vor-/Zurück-Buttons. Kategorienwahl, Tastatur links/rechts, Statusansage, abgesicherte erste/letzte Seite, Sperre gegen Mehrfachklicks während des Umblätterns. Keine neue Bibliothek. Animation über native Web Animations API; Reduced Motion wechselt direkt ohne Drehung; ohne Animation-API unmittelbarer Seitenwechsel. Vollständige native aufklappbare Leseliste und Original-PDF bleiben zugänglich, auch ohne JavaScript ist die Leseliste bedienbar. Unsichtbare, inerte Maßseiten reservieren die erforderliche gemeinsame Höhe für alle Seiten, auch bei responsiver Textanordnung.

Footer: große Abschiedsbühne entfernt, Kontakt/Original-Logo zuerst, Restaurant/Küche sowie Hotel-Check-in/out in nativen aufklappbaren Bereichen, Links erhalten. Standardhöhe gemessen: rund 275px Desktop (1440), 537px Mobile (390). Keine Kontaktdaten oder Zeiten entfernt.

## Tatsächlich durchgeführte Prüfungen
Typecheck, ESLint und Production Build erfolgreich. Sieben Node-Inhaltstests einschließlich vollständiger Erhaltung/Sortierung der 26 Gerichte und Kategorie-/Seiteneinteilung bestanden. Node meldet im separaten TS-Test lediglich einen Hinweis zur automatischen ES-Modul-Erkennung; kein Fehler.
50 Browser-Blätterfälle: alle 10 Seiten bei 360/390/768/1024/1440 px. Kein horizontaler Overflow; Seitenhöhen pro Bildschirmbreite stabil (Rundungsdifferenz <0,001px Desktop). Vorherige variable Höhen auf schmalen Displays gefunden und durch gemeinsamen Maßblock behoben; erneut geprüft. Auf jeder Breite alle 26 Namen durchlaufen. Erste/letzte Grenze, Zurück mit Tastatur, Direktwahl, schneller Doppelklick ohne Überspringen und Liste mit 26 Einträgen geprüft. Footer-Bereiche per Enter geöffnet; vollständige Restaurant-/Küchen- und Hotelzeiten sichtbar. Keine Browserwarnungen/-fehler im Prüfablauf.
Reduced-Motion-Implementierung im Code geprüft; keine gesonderte OS-Emulation. Keine neue Lighthouse-/axe-Zertifizierung. Keine Buchungen oder Nachrichten versendet.

Vorstand außerhalb der Auslieferung gesichert in Helsa_Sicherung_MenuBook_20261108_090331. Keine Änderungen an Kundendomain oder DNS. Preview bleibt öffentlich/noindex. Bestehende offenen Launch-Punkte (Datenschutz, fachliche Preis-/Inhaltsfreigabe, dauerhafte Medienrechte) bleiben bestehen.

## Veröffentlichte und geprüfte Preview
https://koenig-von-preussen-preview-1m4rmrk3r-naser-solutions.vercel.app/speisekarte/

Deployment dpl_8oHbiwXVAFbDPnvhhGnmCVNJsxqK: READY, öffentlicher Zugriff ohne Anmeldung. Desktop und 390px live geöffnet; Vor/Zurück, Hauptgerichte-Direktwahl und Footer-Zeiten geprüft. Keine Konsolenfehler oder Warnungen. Alle sichtbaren Bilder geladen; das nicht geöffnete mobile Menü enthält ein unsichtbares Lazy-Logo. 10 Routen HTTP 200, alle noindex und korrekte Canonicals, 11 interne Ziele ohne Fehler, robots/sitemap erreichbar, 404 und Datenschutz-Weiterleitung geprüft. Bericht: reports/helsa-live-http.json.
