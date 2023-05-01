export const getCurrentTabId = async (): Promise<number | undefined> => {
  const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return currentTab.id;
};
