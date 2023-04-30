import { Message } from "../messagingTypes";

console.log("ContentScript: Content Script is here.");

if (document === null) {
  console.error("ContentScript: document is not here.");
}

const updateClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.info("Success: set text to clipboard.");
  } catch (err) {
    console.error("Failed: clipboard write");
  }
};

chrome.runtime.onMessage.addListener(
  async (message: Message, messageSender: chrome.runtime.MessageSender, _) => {
    switch (message.action) {
      case "send_text": {
        console.info(`(ContentScript) Message recieved: ${message.action}`);
        break;
      }
      case "request_update_clipboard": {
        console.info(`(ContentScript) Message recieved: ${message.action}`);
        updateClipboard(message.data);
        break;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _unreachable: never = message;
        break;
      }
    }
  }
);
