const ext = globalThis.browser ?? globalThis.chrome;
const actionApi = ext.action ?? ext.browserAction;

async function updateIcon() {
  const { enabled = true } = await ext.storage.local.get("enabled");

  actionApi.setIcon({
    path: enabled
      ? { 32: "icon-32.png", 48: "icon-48.png" }
      : { 32: "icon-32-off.png", 48: "icon-48-off.png" }
  });
}

ext.runtime.onInstalled.addListener(async () => {
  const { enabled = true, openInBackground = false } = await ext.storage.local.get({
    enabled: true,
    openInBackground: false
  });
  await ext.storage.local.set({ enabled, openInBackground });
  updateIcon();
});

ext.runtime.onStartup.addListener(updateIcon);

actionApi.onClicked.addListener(async () => {
  const { enabled = true } = await ext.storage.local.get("enabled");
  await ext.storage.local.set({ enabled: !enabled });
  updateIcon();
});

ext.runtime.onMessage.addListener(message => {
  if (!message || message.type !== "open-url" || !message.url) return;

  const openTab = async () => {
    const { openInBackground = false } = await ext.storage.local.get("openInBackground");
    const createResult = ext.tabs.create({
      url: message.url,
      active: !openInBackground
    });
    if (createResult && typeof createResult.then === "function") {
      await createResult;
    }
  };

  const result = openTab();
  if (result && typeof result.then === "function") {
    result.catch(() => {});
  }
});
