export interface Message {
  raw: string;
}

export interface Commit {
  message: Message;
}

export enum ResultStatus {
  Approved,
  Modify,
  Rejected,
}

export interface Result {
  status: ResultStatus;
  warning?: string;
  proposed?: string;
}

export type RuleEvaluator = (context: Commit) => Promise<Result>;

export interface RuleMeta {
  name: string;
  key: string;
  description: string;
}

export interface Rule {
  meta: RuleMeta;
  evaluate: RuleEvaluator;
}

export interface Config {
  [key: string]: boolean | object;
}

export type RuleFactory = (config?: Config) => Rule;
