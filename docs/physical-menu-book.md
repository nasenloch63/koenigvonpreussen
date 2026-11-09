# Physische Doppelseiten · 08.11.2026

## Ursache und Korrektur
Der frühere rechte Inhalt drehte bis 88 Grad, wurde ausgetauscht und erschien von der Gegenseite erneut. Die linke Begrüßung war ein unabhängiger permanenter Bereich. Versetzte Stack-Schatten ragten aus dem Einband.

Jetzt bestehen fünf dauerhafte Blätter mit jeweils Vorder- und Rückseite. Folge: [Begrüßung,1], [2,3], [4,5], [6,7], [8,9], [10,Abschluss]. Gleich breite Hälften sind für eine deckungsgleiche Landung notwendig. Die Blätter drehen am Buchfalz zwischen 0 und -180 Grad. Rückseite separat um 180 Grad ausgerichtet; beide Flächen backface-hidden, undurchsichtig. Inhalte werden während einer Drehung nicht ersetzt. Die Endposition wird vor dem Entfernen der Animation übernommen. Z-Ordnung hebt nur das aktive Blatt an. Mehrfachklick-Sperre gilt über komplette Kategoriesprünge; diese blättern nacheinander durch echte Blätter.

Ein durchgehender Rahmen, Innenradien passend zur Rahmenstärke und keine versetzten Papierstapel außerhalb des Rahmens. Farben, Schriften, Original-Logo, alle 26 Gerichte/Preise, PDF, Navigation und Footer erhalten. Der Zähler nennt tatsächlich sichtbare Seiten, Kategorien können bei einem Übergang beide markiert sein. Nur sichtbare Flächen stehen im Accessibility-Baum. Mobile unter 761px zeigt die zwei Seiten in voller Breite nacheinander, ohne 3D-Drehung; Reduced Motion wechselt ebenfalls direkt. Keine Bibliothek ergänzt.

## Ausgeführte Prüfungen
- Vollständiger Production Build, Typecheck und ESLint erfolgreich; nach letzten Änderungen erneuter Build, Typecheck und gezielter Lint.
- 11 Node-Tests erfolgreich (Inhalte, Herkunft, Pagination und vier neue Doppelseiten-Regressionstests). Bekannter Node-Hinweis zur automatischen ES-Modul-Erkennung, kein Testfehler.
- Alle 6 Doppelseiten auf 360/390/768/1024/1440px: 30 Browserfälle, keine abgeschnittenen Seiteninhalte und kein horizontaler Overflow. Desktop-Höhe bleibt über alle Doppelseiten gleich (Subpixel-Rundung <0,001px). Mobile Seiten wachsen in normalem Lesefluss mit ihrem Inhalt.
- Erste Öffnung → zweimal vor → zweimal zurück: [1] → [2,3] → [4,5] → [2,3] → [1]. Begrüßung nur in erster Öffnung zugänglich/sichtbar.
- Hauptgerichte-Kategoriesprung auf [4,5], Kategorien/Status korrekt; schneller Doppelklick bewegt genau ein Blatt. 5 physische Blätter bleiben im DOM.
- 52 Browsermessungen während einer Drehung: 3D-Matrizen des aktiven Blatts und entgegengesetzte Vorder-/Rückseiten bestätigt. Tatsächliche Browseransichten kontrolliert, keine Konsolenwarnungen/-fehler.
- Reduced Motion im Code kontrolliert; keine separate OS-Emulation. Keine neue Lighthouse-/axe-Prüfung.

Prüfdaten: reports/physical-book-responsive.json und reports/physical-book-turn-samples.json.
Vorstand gesichert außerhalb der Auslieferung: Helsa_Sicherung_PhysicalBook_20261108_183300. Projekt ist kein Git-Repository. Kundendomain/DNS unverändert; öffentliche Preview bleibt noindex.

## Live-Prüfung
https://koenig-von-preussen-preview-3it4lb4ke-naser-solutions.vercel.app/speisekarte/
Deployment dpl_A37xc9gv2su1ZtZRwA1zPiA8QhEw: READY, öffentlich ohne Anmeldung. Die geforderte Folge zweimal vor/zurück sowie Hauptgerichte-Sprung im Live-Browser erneut bestanden. Mobile 390px geöffnet und Kategorie gewechselt, keine Browserwarnungen/-fehler. noindex/nofollow im Live-DOM bestätigt.
HTTP-Liveprüfung: 10 Routen mit Status 200 und noindex, 11 interne Ziele fehlerfrei; robots/sitemap, 404 und Datenschutz-Weiterleitung korrekt. Bericht: reports/helsa-live-http.json.
