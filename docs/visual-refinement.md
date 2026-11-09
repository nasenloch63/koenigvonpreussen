# Visueller Feinschliff · 08.11.2026
Bestehendes Helsa-Design beibehalten. Hero-Bildrahmen begrenzt; passende Positionen für Architektur, Bar, Gastgeber und Food; mobile Bilder kompakter. Abschnitte und rechtliche Seiten dichter gesetzt, Buttons/Focus/Pressed konsistent. Galerie in Restaurant ausschließlich aus den vorhandenen, belegten Medien suppe/gericht/dessert; Quellen und Preview-Freigabe siehe content-audit.md und reports/medien-herkunft.json. Native Dialoge zentriert, Hintergrundscroll bei offenem Dialog gesperrt. CSS-Scrollbewegung progressiv; ohne JS und ohne versteckten Inhalt, bei Reduced Motion abgeschaltet. Keine Abhängigkeiten installiert.

Prüfungen: Typecheck, gezielter ESLint über ausführbare Quellen/Konfigurationen und Production Build erfolgreich. 20 Renderfälle über alle zehn Routen bei 390/1440 px inklusive vollständig geladener Bilder; 50 Browser-/axe-Fälle an 360/390/768/1024/1440 ohne Overflow, pageerror oder gemeldete Verstöße. Menü Escape/Fokusrückgabe sowie 200%-Body-Schriftprobe geprüft. Galerie auf 390/1440: Vergrößern, Pfeiltasten, Zurück, Escape, Fokusrückgabe und axe bei offenem Dialog erfolgreich. Keine vollständige Barrierefreiheitszertifizierung, keine neue Lighthouse-Messung.

Initialer Rendering-Test blieb an einem absichtlich verborgenen Dialogbild hängen. Test korrigiert: sichtbare Bilder im Seitenlauf; Dialogbilder separat bei offenem Dialog geprüft. Keine Bilder waren defekt.

Veröffentlichung nach ausdrücklicher Freigabe des Nutzers. Weiterhin offen: endgültiger Datenschutztext, fachliche Inhalts-/Preisfreigaben und dauerhafte Medienrechte. Keine neuen Fakten oder fremden Medien.

## Live-Abnahme
Freigegebene Fassung öffentlich: https://koenig-von-preussen-preview-rdtk8g97p-naser-solutions.vercel.app/
Deployment dpl_9SFqiHj8aHeHcGyEGuUKH9VHYL7N, staging, READY. 20 Live-Renderfälle mit geladenen sichtbaren Bildern; Galerie auf Desktop/Mobile mit Pfeiltasten, Buttons, Escape und Fokusrückgabe bestanden. Zusätzliche manuelle Browserprüfung des vergrößerten Dessertfotos: geladen. 10 Routen/11 interne Ziele ohne HTTP-Fehler, je eine H1, richtige Canonicals und noindex; Sitemap/robots/404/Datenschutzredirect geprüft.
