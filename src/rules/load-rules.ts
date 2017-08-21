import { Rule, Config } from './rule-types';

const defaultConfig: Config = {
  'no-whitespace-padding': true,
  'first-letter-capital': true,
};

export default function loadRules(config: Config = {}): Rule[] {
  const completeConfig = { ...defaultConfig, ...config };

  return Object.keys(completeConfig)
    .filter(ruleName => completeConfig[ruleName] !== false)
    .map(ruleName => require('./' + ruleName).default(config[ruleName]));
}
