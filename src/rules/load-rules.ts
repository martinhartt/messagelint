import { Config, Rule } from './rule-types';

const defaultConfig: Config = {
  'no-whitespace-padding': true,
  'first-word-verb': true,
  'first-letter-capital': true,
  'no-trailing-dot': true,
};

export default function loadRules(config: Config = {}): Rule[] {
  const completeConfig = { ...defaultConfig, ...config };

  return Object.keys(completeConfig)
    .filter(ruleName => completeConfig[ruleName] !== false)
    .map(ruleName => require('./' + ruleName).default(config[ruleName]));
}
