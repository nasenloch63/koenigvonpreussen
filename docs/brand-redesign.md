# Markenredesign · 08.11.2026

## Verbindliche Referenz
https://kvp-helsa.de/, visuell im Browser kontrolliert. Vollständiges, rot-schwarzes Original-Logo aus `header a.o-home-link > svg` unverändert extrahiert, `public/logo-original.svg`, Original-ViewBox 0 0 228 60. Kein Nachzeichnen, Umfärben oder Beschneiden. Alte isolierte Wortmarke `public/logo.svg` aus der Auslieferung entfernt, im vorherigen Sicherungsstand erhalten. Header, mobiler Navigationsdialog und Footer verwenden dieselbe Datei bei erhaltenem Seitenverhältnis. Original-Favicon: https://kvp-helsa.de/wp-content/uploads/2024/08/cropped-krone-192x192.png. Social-Bild aus vollständigem Original-Logo, originalem Creme und der belegten bestehenden Hausaufnahme, ohne neue Unternehmensfotos.

## Farben und Fundstelle
https://kvp-helsa.de/wp-content/themes/kvp/_/css/style.css?ver=1725552666, Zeilen 300–310: Primary #B10F1F, Primary Dark #9E1220, Secondary #FBF4EB, Secondary Light #FDFAF7, White #FFFFFF, Black #000000, Gray Dark #4B5563. Logo enthält unverändert #B10F1F und #1D1D1B. Berechnete Browserfarben bestätigen Weiß/Schwarz für Body/Header, #FBF4EB für Footer und #B10F1F für Kontaktpfeil/Social-Links. Zentrale Tokens in app/globals.css. Rahmen entstehen aus diesen Farben mit Transparenz. Keine früheren Grün-/Gold-Tokens mehr.

Berechnete WCAG-Kontraste: Rot/Weiß 7,10:1, Rot/Creme 6,51:1, Schwarz/Creme 19,24:1, Grau/Weiß 7,56:1. Keine umfassende Zertifizierung.

## Gestaltung
Durchgehend überarbeitete globale Gestaltung statt aufgeschichteter Farb-Overrides: weißer Header mit Original-Logo, cremefarbene Hero-Flächen, schwarze ruhige Headlines, rote Orientierung und taktile Reservierungsbuttons. Speisekarte mit roten Kategorieüberschriften und klaren Preisen, Galerie mit cremefarbenem Rahmen und roter Akzentlinie, Kontaktbereiche und heller Footer in derselben Markenwelt. Alle vorhandenen Inhalte, Buchungslinks und zehn Routen erhalten. Bildausschnitte für Architektur, Personen und Gerichte gezielt übernommen. Bestehende lokal gehostete Newsreader/Manrope beibehalten; Logo-Schrift unverändert im Original-SVG. Native Dialoge mit Tastatur, Escape und Fokusrückgabe. Reduced Motion schaltet Bewegungen ab. Keine neuen Abhängigkeiten.

## Prüfung
50 Browser-Layoutprüfungen: zehn Routen bei 360, 390, 768, 1024 und 1440 px, kein horizontaler Überlauf. 20 vollständige Screenshots für 390/1440 px visuell gesichtet. Original-Logo geladen, korrekte Proportionen; keine als defekt gemeldeten sichtbaren Bilder. Mobile Navigation und Galerie geöffnet, Pfeiltaste/Zurück/Escape und Fokusrückgabe geprüft. Archiv per Enter geöffnet, neun Termine sichtbar. Galerie auch auf Desktop kontrolliert. Typecheck, ESLint und Production Build erfolgreich; fünf Inhaltstests bestanden. Ein Suchtest hatte die SVG-Pfadkoordinate 14.7248 irrtümlich als alte Telefonnummer gemeldet; Test auf tatsächliche Telefonnummer präzisiert, Logo unverändert. Galerie lädt das Dialogbild erst beim Öffnen; Warnung über ein verborgenes Bild mit Höhe 0 beseitigt. Das native details-Element darf schon vor Hydration geöffnet werden; ausschließlich dessen open-Attribut-Abgleich wird entsprechend toleriert. In der anschließenden Produktionsprüfung von Galerie und Archiv keine Browserwarnungen/-fehler.

Kein neuer Lighthouse-Lauf und kein neuer vollständiger axe-Lauf; frühere Scores werden nicht als Prüfung dieses Redesigns ausgegeben. Keine realen Reservierungen oder E-Mails versendet.

## Rechte und Abnahme
Originalfotos und Logo sind vom Nutzer für die öffentliche Vorabversion freigegeben. Dauerhafte Launch-Rechte, finale Datenschutzfassung sowie fachliche Inhalts-/Preisfreigaben bleiben offen. Preview bleibt noindex; keine Kundendomain/DNS-Änderung. Quellen/Hashes in reports/brand-provenance.json. Vorheriger Stand außerhalb des öffentlichen Builds gesichert (Helsa_Sicherung_Markenredesign_*).

## Veröffentlichung und Live-Prüfung
https://koenig-von-preussen-preview-k9463yzt7-naser-solutions.vercel.app/

Deployment dpl_CLmteFedMtzafAMuesuc5PtjmeFk, bestehendes Projekt koenig-von-preussen-preview im Team Naser Solutions, Preview/staging, READY. Öffentlich ungeschützt gemäß bestehender Freigabe. 20 Live-Browserfälle über zehn Routen bei 390/1440 px ohne Überlauf oder gemeldete defekte Bilder. Keine Browserwarnungen/-fehler im Live-Seitenlauf. Mobile Navigation und Galerie einschließlich Escape/Fokusrückgabe erneut erfolgreich. Zehn Routen HTTP 200; elf interne Linkziele erfolgreich; noindex in HTML/Headers, robots Disallow /, Sitemap erreichbar, 404 und Datenschutz-Weiterleitung 308 geprüft. Logo, Favicon und Social-Bild per Hash identisch mit lokalem Stand; alte Wortmarke /logo.svg liefert 404. Sieben zentrale Inhaltsdateien und zehn Fotos gegenüber Sicherung unverändert (17 Hash-Abgleiche). Screenshots brand-live-desktop.png, brand-live-mobile.png, brand-live-gallery.png.
