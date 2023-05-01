import { MessageRequest, MessageResponse, TweetInfomation } from "../messagingTypes";

console.log("ContentScript: Content Script is here.");

if (document === null) {
  console.error("ContentScript: document is not here.");
}

if (window.location === null) {
  console.error("ContentScript: window.location is not here.");
}

const getTweetInfomation = (): TweetInfomation => {
  const ogDescriptionMetaTag = document.querySelector("[property^=og][property$=description]");
  // TODO: better-way
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const contentString = ogDescriptionMetaTag?.content as string;
  const content = contentString.slice(1, -1);

  const timeElement = document.querySelector("time");
  const dateTime = timeElement?.textContent as string;

  const username = window.location.href.split("/")[3];

  return {
    content,
    link: window.location.href,
    dateTime,
    username,
  };
};

chrome.runtime.onMessage.addListener(
  async (
    message: MessageRequest,
    messageSender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void
  ) => {
    switch (message.action) {
      case "send_text": {
        console.info(`(ContentScript) Message recieved: ${message.action}`);
        break;
      }
      case "request_tweet_infomation": {
        console.info(`(ContentScript) Message recieved: ${message.action}`);
        const tweetInfo = getTweetInfomation();
        sendResponse({
          action: "respond_tweet_infomation",
          data: tweetInfo,
        });
        console.info(`(ContentScript) Message: sent: TweetInfo`);
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
