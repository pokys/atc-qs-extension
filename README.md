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

## Obchody s doplnky
https://addons.mozilla.org/cs/firefox/addon/atc-qs/


## Poznámka k testování
Repo je nastavené pro automatické balení na GitHubu. Pro lokální testování bez workflow je potřeba zkopírovat obsah `shared/` do dočasné složky spolu s odpovídajícím manifestem.

## Ruční build (bez GitHub Actions)
Pokud chceš balíček vytvořit lokálně bez workflow, stačí zkopírovat sdílené soubory a přidat správný manifest.

Firefox:
```bash
mkdir -p dist/firefox
cp shared/* dist/firefox/
cp firefox/manifest.json dist/firefox/manifest.json
cd dist/firefox && zip -r ../atc-qs-extension-firefox.zip .
```

Chrome:
```bash
mkdir -p dist/chrome
cp shared/* dist/chrome/
cp chrome/manifest.json dist/chrome/manifest.json
cd dist/chrome && zip -r ../atc-qs-extension-chrome.zip .
```

## Attribution
[Alien head icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/alien-head)
