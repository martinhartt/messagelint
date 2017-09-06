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

export interface BaseConfig {
  name?: string;
  prefix: RegExp;
  skip: RegExp[];
  shouldReject: boolean;
  shouldModify: boolean;
}

export interface GlobalConfig extends BaseConfig {
  rules: {
    [name: string]: BaseConfig | boolean;
  };
}

export type RuleFactory = (config?: BaseConfig) => Rule;
