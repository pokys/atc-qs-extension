(async function () {
  const ext = globalThis.browser ?? globalThis.chrome;
  const { enabled = true } = await ext.storage.local.get("enabled");
  if (!enabled) return;

  function createIcon(partNumber) {
    const icon = document.createElement("span");
    icon.textContent = "👽";
    icon.className = "atc-alien";
    icon.style.marginLeft = "6px";
    icon.style.cursor = "pointer";
    icon.style.opacity = "0.8";

    icon.title =
      "Klik: Alza\n" +
      "Pravý klik: TSBohemia\n" +
      "Alt + klik: EDshop\n" +
      "Alt + pravý klik: Heureka";

    icon.addEventListener("click", e => {
      e.preventDefault();
      window.open(
        e.altKey
          ? "https://edshop.edsystem.cz/pages/productlist.aspx?fulltext=" + encodeURIComponent(partNumber)
          : "https://www.alza.cz/search.htm?exps=" + encodeURIComponent(partNumber),
        "_blank",
        "noopener"
      );
    });

    icon.addEventListener("contextmenu", e => {
      e.preventDefault();
      window.open(
        e.altKey
          ? "https://www.heureka.cz/?h%5Bfraze%5D=" + encodeURIComponent(partNumber)
          : "https://www.tsbohemia.cz/search?query=" + encodeURIComponent(partNumber),
        "_blank",
        "noopener"
      );
    });

    return icon;
  }

  // DETAIL PRODUKTU
  const detailCells = [...document.querySelectorAll("div.col-xs-6")];
  for (let i = 0; i < detailCells.length; i++) {
    if (detailCells[i].textContent.toLowerCase().includes("part")) {
      const valueCell = detailCells[i + 1];
      if (valueCell && !valueCell.querySelector(".atc-alien")) {
        const part = valueCell.textContent.trim();
        if (part) valueCell.appendChild(createIcon(part));
      }
      break;
    }
  }

  // SEZNAM PRODUKTŮ – FIX PRO DYNAMICKÉ NAČÍTÁNÍ
  function injectIconsIntoList() {
    document.querySelectorAll("table.vypis td.col-13").forEach(cell => {
      if (cell.querySelector(".atc-alien")) return;

      const part = cell.textContent.trim();
      if (!part) return;

      cell.appendChild(createIcon(part));
    });
  }

  // první pokus
  injectIconsIntoList();

  // observer pro vyhledávání / filtrování / stránkování
  const tableContainer = document.querySelector(".table-container");
  if (tableContainer) {
    const observer = new MutationObserver(() => {
      injectIconsIntoList();
    });

    observer.observe(tableContainer, {
      childList: true,
      subtree: true
    });
  }
})();
