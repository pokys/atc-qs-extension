# ATC → Alza 👽 (ATC Quick Search)

Rozšíření přidává ikonu u Part# na ATCompu a umožňuje rychlé vyhledání na Alze, TSBohemii, EDshopu a Heuréce.

## Struktura
- `shared/` – jediný zdrojový kód a ikony pro oba prohlížeče
- `firefox/manifest.json` – Firefox (MV2)
- `chrome/manifest.json` – Chrome (MV3)

## Release balíčky
Balíčky pro Firefox a Chrome se generují automaticky při publikaci GitHub Release.
Workflow vytvoří:
- `atc-qs-extension-firefox.zip`
- `atc-qs-extension-chrome.zip`

## Poznámka k testování
Repo je nastavené pro automatické balení na GitHubu. Pro lokální testování bez workflow je potřeba zkopírovat obsah `shared/` do dočasné složky spolu s odpovídajícím manifestem.
