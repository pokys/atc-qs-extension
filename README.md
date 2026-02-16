# ATC -> Alza

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white)](https://addons.mozilla.org/cs/firefox/addon/atc-qs/)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf)

Rozsireni pro rychle vyhledani product/part kodu na vybranych ceskych e-shopech.

Store listing texty jsou v:
- `store-description.md`
- `store-short.txt`

## Struktura
- `shared/` - jediny zdrojovy kod a ikony pro oba prohlizece
- `firefox/manifest.json` - Firefox (MV2)
- `chrome/manifest.json` - Chrome (MV3)

## Release balicky
Balicky pro Firefox a Chrome se generuji automaticky pri publikaci GitHub Release.
Workflow vytvori:
- `atc-qs-extension-firefox.zip`
- `atc-qs-extension-chrome.zip`

## Rucni build (bez GitHub Actions)
Pokud chces balicek vytvorit lokalne bez workflow, staci zkopirovat sdilene soubory a pridat spravny manifest.

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

## Store odkazy
- Firefox (AMO): [https://addons.mozilla.org/cs/firefox/addon/atc-qs/](https://addons.mozilla.org/cs/firefox/addon/atc-qs/)
- Chrome Web Store: [https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf](https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf)

## Attribution
[Alien head icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/alien-head)
