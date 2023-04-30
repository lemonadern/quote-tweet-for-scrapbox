import React, { ReactElement } from "react";

import { Message } from "../messagingTypes";

const getCurrentTab = async (): Promise<number | undefined> => {
  const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return currentTab.id;
};

const onClicked = async () => {
  const message: Message = {
    kind: "sendText",
    body: "Hi, this is a message from Popup!",
  };

  const tabId = await getCurrentTab();
  if (tabId === undefined) {
    throw Error("Cannot get id of current tab.");
  }

  chrome.tabs.sendMessage(tabId, message);
};

const Popup = (): ReactElement => {
  document.body.style.width = "15rem";
  document.body.style.height = "15rem";
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>Popup</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          onClicked();
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default Popup;
