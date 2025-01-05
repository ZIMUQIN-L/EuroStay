// MessageTypes.ts
export type MessageType = 'request' | 'question' | 'reply' | 'user' | 'host';

interface BaseMessage {
  id: string;
  type: MessageType;
  sender: 'user' | 'host';
  time: string;
  direction: 'right' | 'left';
  content: string;
}

export interface RequestMessage extends BaseMessage {
  type: 'request';
  data: {
    toUid: number;
    subjectId: number;
    content: string;
  };
}

export interface QuestionMessage extends BaseMessage {
  type: 'question';
  data: {
    toUid: number;
    content: string;
  };
}

export interface ReplyMessage extends BaseMessage {
  type: 'reply';
  data: {
    toUid: number;
    answerTo: string; // 对应问题消息的 id
    content: string;
  };
}

export type Message = RequestMessage | QuestionMessage | ReplyMessage | BaseMessage;
