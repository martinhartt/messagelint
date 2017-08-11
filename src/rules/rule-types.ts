export interface Message {
  raw: string;
}

export interface Commit {
  message: Message;
}

export enum ResultStatus {
  Okay,
  Modify,
  ConfirmModify,
  Reject,
}

export interface MessageResult {
  status: ResultStatus;
  warning?: string;
  proposed?: string;
}

export interface RuleEvaluator {
  (context: Commit): Promise<MessageResult> | MessageResult;
}

export interface RuleMeta {
  name: string;
  key: string;
  description: string;
}

export default interface Rule {
  meta: RuleMeta;
  evaluate: RuleEvaluator;
};

export interface Config {
  [key: string]: boolean | object;
}

export interface RuleFactory {
  (config: Config): Rule;
}
