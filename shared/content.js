(async function () {
  const ext = globalThis.browser ?? globalThis.chrome;
  const defaults = {
    enabled: true,
    actions: {
      click: { enabled: true, shop: "alza" },
      context: { enabled: true, shop: "tsbohemia" },
      alt_click: { enabled: true, shop: "edshop" },
      alt_context: { enabled: true, shop: "heureka" }
    }
  };
  const stored = await ext.storage.local.get(defaults);
  const enabled = stored.enabled ?? true;
  if (!enabled) return;
  const actions = stored.actions ?? defaults.actions;

  const shops = {
    alza: {
      label: "alza.cz",
      url: part => "https://www.alza.cz/search.htm?exps=" + encodeURIComponent(part)
    },
    tsbohemia: {
      label: "tsbohemia.cz",
      url: part => "https://www.tsbohemia.cz/search?query=" + encodeURIComponent(part)
    },
    edshop: {
      label: "edshop.edsystem.cz",
      url: part => "https://edshop.edsystem.cz/pages/productlist.aspx?fulltext=" + encodeURIComponent(part)
    },
    heureka: {
      label: "heureka.cz",
      url: part => "https://www.heureka.cz/?h%5Bfraze%5D=" + encodeURIComponent(part)
    },
    datart: {
      label: "datart.cz",
      url: part => "https://www.datart.cz/vyhledavani?q=" + encodeURIComponent(part)
    },
    iwant: {
      label: "iwant.cz",
      url: part => "https://www.iwant.cz/Vyhledavani?query=" + encodeURIComponent(part)
    },
    smarty: {
      label: "smarty.cz",
      url: part => "https://www.smarty.cz/Vyhledavani?query=" + encodeURIComponent(part)
    },
    allegro_czc: {
      label: "allegro.cz (CZC)",
      url: part => "https://allegro.cz/obchod/czc-cz/nabidky?string=" + encodeURIComponent(part)
    },
    comfor: {
      label: "comfor.cz",
      url: part => "https://www.comfor.cz/search/?q=" + encodeURIComponent(part)
    },
    mironet: {
      label: "mironet.cz",
      url: part => "https://www.mironet.cz/ProductList/showSearch?EXPF=" + encodeURIComponent(part)
    }
  };

  function createIcon(partNumber) {
    const icon = document.createElement("span");
    icon.textContent = "👽";
    icon.className = "atc-alien";
    icon.style.marginLeft = "6px";
    icon.style.cursor = "pointer";
    icon.style.opacity = "0.8";

    function titleFor(actionKey, label) {
      const action = actions[actionKey];
      if (!action || !action.enabled) return `${label}: vypnuto`;
      const shop = shops[action.shop];
      return `${label}: ${shop ? shop.label : "neznamy"}`;
    }

    icon.title =
      titleFor("click", "Klik") + "\n" +
      titleFor("context", "Pravy klik") + "\n" +
      titleFor("alt_click", "Alt + klik") + "\n" +
      titleFor("alt_context", "Alt + pravy klik");

    function openForAction(actionKey, part) {
      const action = actions[actionKey];
      if (!action || !action.enabled) return;
      const shop = shops[action.shop];
      if (!shop) return;
      window.open(shop.url(part), "_blank", "noopener");
    }

    icon.addEventListener("click", e => {
      e.preventDefault();
      openForAction(e.altKey ? "alt_click" : "click", partNumber);
    });

    icon.addEventListener("contextmenu", e => {
      e.preventDefault();
      openForAction(e.altKey ? "alt_context" : "context", partNumber);
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
