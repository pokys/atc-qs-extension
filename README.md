# ATC -> Alza

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white)](https://addons.mozilla.org/cs/firefox/addon/atc-qs/)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf)

Rozšíření pro rychlé vyhledání product/part kódu na vybraných českých e-shopech.

## Co doplněk umí
- Rychlé otevření cílového e-shopu přes klik na ikonu u kódu produktu.
- Nastavitelné mapování akcí (klik, pravý klik, Alt + klik, Alt + pravý klik).
- Prostřední klik: otevře všechny aktivní e-shopy (výchozí stav: zapnuto).
- Volitelná funkce `Otevírat odkazy na pozadí`.
- Volitelná podpora detailu produktu na `comfor.cz` a `edshop.edsystem.cz`.

Store listing texty jsou v:
- `store-description.md`
- `store-short.txt`

## Struktura
- `shared/` - jeden zdrojový kód a ikony pro oba prohlížeče
- `firefox/manifest.json` - Firefox (MV2)
- `chrome/manifest.json` - Chrome (MV3)

## Release balíčky
Balíčky pro Firefox a Chrome se generují automaticky při publikaci GitHub Release.
Workflow vytvoří:
- `atc-qs-extension-firefox.zip`
- `atc-qs-extension-chrome.zip`

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

## Store odkazy
- Firefox (AMO): [https://addons.mozilla.org/cs/firefox/addon/atc-qs/](https://addons.mozilla.org/cs/firefox/addon/atc-qs/)
- Chrome Web Store: [https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf](https://chromewebstore.google.com/detail/atc-%E2%86%92-alza-%F0%9F%91%BD/fmcnoalaommmddcgoafidohcnbcobbaf)

## Attribution
[Alien head icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/alien-head)
