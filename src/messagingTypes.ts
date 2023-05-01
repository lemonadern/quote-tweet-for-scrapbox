type SendText = {
  action: "send_text";
  data: string;
};

type RequestTweetInfomation = {
  action: "request_tweet_infomation";
};

type RespondTweetInfomation = {
  action: "respond_tweet_infomation";
  data: TweetInfomation;
};

export type MessageRequest = SendText | RequestTweetInfomation;
export type MessageResponse = RespondTweetInfomation;

// Tweet Infomation
export type TweetInfomation = {
  link: string;
  username: string;
  content: string;
  dateTime: string;
};
