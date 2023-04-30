type sendTextMessage = {
  kind: "sendText";
  body: string;
};

export type Message = sendTextMessage;
