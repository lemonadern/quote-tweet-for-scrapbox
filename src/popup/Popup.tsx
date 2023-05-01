import React, { ReactElement, useState } from "react";

import { MessageRequest, MessageResponse, TweetInfomation } from "@/messagingTypes";

const getCurrentTabId = async (): Promise<number | undefined> => {
  const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return currentTab.id;
};

const sendHelloToConent = async () => {
  const message: MessageRequest = {
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

const getTweetInfomation = async () => {
  const tabId = await getCurrentTabId();
  if (tabId === undefined) {
    console.error("Cannot get id of current tab.");
    throw Error("Cannot get id of current tab.");
  }

  const response = await chrome.tabs.sendMessage<MessageRequest, MessageResponse>(tabId, {
    action: "request_tweet_infomation",
  });

  return response.data;
};

const buildFormattedString = ({ username, link, content, dateTime }: TweetInfomation) => {
  const prefix = `>[@${username} ${link}]`;
  const quotedContent = content.split("\n").map((t) => "> " + t);

  return prefix + "\n" + quotedContent.join("\n");
};

const writeTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to write Text to Clipboard.");
  }
};

const writeQuotedTweetToClipboard = async () => {
  const tweet = await getTweetInfomation();
  const quoted = buildFormattedString(tweet);
  writeTextToClipboard(quoted);
};

export const Popup = (): ReactElement => {
  document.body.style.width = "15rem";
  document.body.style.height = "15rem";
  const [copied, setCopied] = useState(false);
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
      {copied && <p className="text-red-500 font-semibold text-l">Tweet Coiped to Clipboard!</p>}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          writeQuotedTweetToClipboard();
          setCopied(true);
        }}
      >
        copy to clipboard
      </button>
    </div>
  );
};
