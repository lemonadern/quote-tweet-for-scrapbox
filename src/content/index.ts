import { Message } from "../messagingTypes";

console.log("ContentScript: Content Script is here.");

if (document === null) {
  console.error("ContentScript: document is not here.");
}

chrome.runtime.onMessage.addListener(
  async (message: Message, messageSender: chrome.runtime.MessageSender, sendResponse) => {
    if (message.kind !== "sendText") return;

    console.log(`ContentScript: message recieved: ${message.body}`);
  }
);
