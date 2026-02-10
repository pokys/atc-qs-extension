const ext = globalThis.browser ?? globalThis.chrome;

const defaults = {
  actions: {
    click: { enabled: true, shop: "alza" },
    context: { enabled: true, shop: "tsbohemia" },
    alt_click: { enabled: true, shop: "edshop" },
    alt_context: { enabled: true, shop: "heureka" }
  }
};

const shopOptions = [
  { value: "alza", label: "alza.cz" },
  { value: "tsbohemia", label: "tsbohemia.cz" },
  { value: "edshop", label: "edshop.edsystem.cz" },
  { value: "heureka", label: "heureka.cz" },
  { value: "datart", label: "datart.cz" },
  { value: "iwant", label: "iwant.cz" },
  { value: "smarty", label: "smarty.cz" },
  { value: "allegro_czc", label: "allegro.cz (CZC)" },
  { value: "comfor", label: "comfor.cz" },
  { value: "mironet", label: "mironet.cz" }
];

function populateSelect(selectEl) {
  selectEl.textContent = "";
  for (const opt of shopOptions) {
    const optionEl = document.createElement("option");
    optionEl.value = opt.value;
    optionEl.textContent = opt.label;
    selectEl.appendChild(optionEl);
  }
}

function showStatus(text) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = text;
  if (!text) return;
  setTimeout(() => {
    statusEl.textContent = "";
  }, 1200);
}

async function load() {
  const stored = await ext.storage.local.get(defaults);
  const actions = stored.actions ?? defaults.actions;

  document.querySelectorAll("select[data-action]").forEach(selectEl => {
    populateSelect(selectEl);
    const key = selectEl.dataset.action;
    selectEl.value = actions[key]?.shop ?? defaults.actions[key].shop;
  });

  document.querySelectorAll("input[type=checkbox][data-action]").forEach(checkbox => {
    const key = checkbox.dataset.action;
    checkbox.checked = actions[key]?.enabled ?? true;
  });
}

async function save() {
  const actions = {};
  for (const key of Object.keys(defaults.actions)) {
    const checkbox = document.querySelector(`input[data-action="${key}"]`);
    const selectEl = document.querySelector(`select[data-action="${key}"]`);
    actions[key] = {
      enabled: checkbox?.checked ?? true,
      shop: selectEl?.value ?? defaults.actions[key].shop
    };
  }
  await ext.storage.local.set({ actions });
  showStatus("Ulozeno");
}

function wire() {
  document.querySelectorAll("input[type=checkbox], select").forEach(el => {
    el.addEventListener("change", () => {
      save();
    });
  });
}

load();
wire();
