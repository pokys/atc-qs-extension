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
  const { enabled = true, openInBackground = false, middleClickMultiOpen = true } = await ext.storage.local.get({
    enabled: true,
    openInBackground: false,
    middleClickMultiOpen: true
  });
  await ext.storage.local.set({ enabled, openInBackground, middleClickMultiOpen });
  updateIcon();
});

ext.runtime.onStartup.addListener(updateIcon);

actionApi.onClicked.addListener(async () => {
  const { enabled = true } = await ext.storage.local.get("enabled");
  await ext.storage.local.set({ enabled: !enabled });
  updateIcon();
});

ext.runtime.onMessage.addListener(message => {
  if (!message || !message.type) return;

  const openTab = async (url, isFirst, openInBackground) => {
    const createResult = ext.tabs.create({
      url,
      active: openInBackground ? false : isFirst
    });
    if (createResult && typeof createResult.then === "function") {
      await createResult;
    }
  };

  if (message.type === "open-url" && message.url) {
    const result = (async () => {
      const { openInBackground = false } = await ext.storage.local.get("openInBackground");
      await openTab(message.url, true, openInBackground);
    })();
    if (result && typeof result.then === "function") {
      result.catch(() => {});
    }
    return;
  }

  if (message.type === "open-urls" && Array.isArray(message.urls) && message.urls.length) {
    const result = (async () => {
      const { openInBackground = false } = await ext.storage.local.get("openInBackground");
      for (let i = 0; i < message.urls.length; i++) {
        await openTab(message.urls[i], i === 0, openInBackground);
      }
    })();
    if (result && typeof result.then === "function") {
      result.catch(() => {});
    }
  }
});
