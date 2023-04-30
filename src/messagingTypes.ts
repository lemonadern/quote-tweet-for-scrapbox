type SendText = {
  action: "send_text";
  data: string;
};

type RequestUpdateClipboard = {
  action: "request_update_clipboard";
  data: string;
};

export type Message = SendText | RequestUpdateClipboard;
