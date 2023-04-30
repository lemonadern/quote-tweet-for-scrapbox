import React, { ReactElement } from "react";

import { Message } from "../messagingTypes";

const getCurrentTabId = async (): Promise<number | undefined> => {
  const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return currentTab.id;
};

const sendHelloToConent = async () => {
  const message: Message = {
    action: "send_text",
    data: "Hello, this is a message from Popup!",
  };

  const tabId = await getCurrentTabId();
  if (tabId === undefined) {
    console.error("Cannot get id of current tab.");
    throw Error("Cannot get id of current tab.");
  }

  chrome.tabs.sendMessage(tabId, message);
  console.info(`Message sent: ${message.action}`);
};

const requestUpdatingClipboard = async () => {
  const message: Message = {
    action: "request_update_clipboard",
    data: `clipboard updated at ${new Date()}`,
  };

  const tabId = await getCurrentTabId();
  if (tabId === undefined) {
    console.error("Cannot get id of current tab.");
    throw Error("Cannot get id of current tab.");
  }

  chrome.tabs.sendMessage(tabId, message);
  console.info(`Message sent: ${message.action}`);
};

const updateClipboard = async () => {
  await navigator.clipboard.writeText(`Clipboard updated at ${new Date()}`);
};

export const Popup = (): ReactElement => {
  document.body.style.width = "15rem";
  document.body.style.height = "15rem";
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          sendHelloToConent();
        }}
      >
        hello
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          // requestUpdatingClipboard();
          updateClipboard();
        }}
      >
        copy to clipboard
      </button>
    </div>
  );
};
