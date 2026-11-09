# König von Preußen · Helsa

Bestehende Next.js-Website des Landgasthofs in Helsa. Verbindliche Unternehmensquelle: https://kvp-helsa.de/restaurant/ und zugehörige Seiten auf kvp-helsa.de.

## Auf einem anderen PC weiterarbeiten

Benötigt: Git, Node.js 24 und pnpm 11.25.0.

```sh
git clone https://github.com/nasenloch63/koenigvonpreussen.git
cd koenigvonpreussen
pnpm install --frozen-lockfile
pnpm dev
```

Danach http://localhost:3000 öffnen. Der Projektordner kann direkt in Codex oder einem Editor geöffnet werden. Für lokale Entwicklung sind keine Zugangsdaten notwendig. Optional `.env.example` nach `.env.local` kopieren und die eigene Preview-Adresse als `NEXT_PUBLIC_SITE_URL` setzen.

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

Für die erste Typprüfung zunächst bauen, damit Next.js die Routentypen erzeugt. Nach Änderungen committen und pushen; auf dem anderen PC vor Arbeitsbeginn `git pull --ff-only` ausführen.

## Struktur

- `app/`: Seiten, Design und Metadaten
- `components/`: Navigation, Galerie, physisches Speisekartenbuch und mobile Blättereffekte
- `content/` und `lib/`: zentrale Helsa-Daten und Seitenlogik
- `public/`: verwendete Originalmedien und Downloads
- `docs/`: Quellen-/Rechteprüfung und dokumentierte Änderungen
- `tests/`: Inhalts- und Seitenmodelltests

## Preview und Veröffentlichung

Aktuell geprüfte öffentliche noindex-Preview:
https://koenig-von-preussen-preview-7pahvm9u2-naser-solutions.vercel.app/speisekarte/

Bestehendes Vercel-Projekt: `koenig-von-preussen-preview`, Team Naser Solutions. Dieses Repository wurde zunächst als Quellcode-Übergabe verbunden; automatische Vercel-Deployments sind damit nicht eingerichtet. Kein neues Vercel-Projekt erstellen und keine Kundendomain/DNS ändern. `noindex` bleibt bis zur bestätigten Launch-Freigabe erhalten.

## Quellen und Freigaben

Originalfotos und Logo wurden für die öffentliche Vorabversion freigegeben; daraus folgt keine allgemeine Weiterverwendungslizenz. Weitere Rechte-/Inhaltsfragen stehen in `docs/content-audit.md`. Keine Inhalte des anderen Betriebs in Marxzell ergänzen. Rechtstexte, Preise und dauerhafte Mediennutzung benötigen vor dem endgültigen Launch weiterhin fachliche Freigabe.

Das externe vollständige Quellenarchiv, historische Sicherungen, lokale Prüfberichte, `.env`-Dateien, `.vercel`, `node_modules` und `.next` sind absichtlich nicht Teil des Repositories. Alle zum Ausführen dieser Website nötigen öffentlichen Assets sind enthalten.
