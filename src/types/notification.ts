import { SimpleAnswer } from './answer';
import { SimpleComment } from './comment';
import { SimpleQuestion } from './question';
import { SimpleUser } from './user';

export type NotificationType =
  | 'question-voting'
  | 'answer-voting'
  | 'new-answer'
  | 'new-question'
  | 'new-comment';

export type Notification = {
  id: string;
  type: NotificationType;
  read: boolean;
  updatedAt: string;
};

export type QuestionVotingNotification = Notification & {
  type: 'question-voting';
  question: SimpleQuestion;
  vote: 'up' | 'down';
  total: number;
  lastVoters: SimpleUser[];
};

export type AnswerVotingNotification = Notification & {
  type: 'answer-voting';
  question: SimpleQuestion;
  answer: SimpleAnswer;
  vote: 'up' | 'down';
  total: number;
  lastVoters: SimpleUser[];
};

export type NewQuestionNotification = Notification & {
  type: 'new-question';
  question: SimpleQuestion & { title: string };
};

export type NewAnswerNotification = Notification & {
  type: 'new-answer';
  question: SimpleQuestion;
  answer: SimpleAnswer & { previewContent: string };
};
export type NewCommentNotification = Notification & {
  type: 'new-comment';
  question: SimpleQuestion;
  answer: SimpleAnswer;
  comment: SimpleComment & { previewContent: string };
};
