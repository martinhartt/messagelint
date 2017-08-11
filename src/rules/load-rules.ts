import Rule, { Config } from './rule-types';

const defaultConfig: Config = {
  'sample-rule': true,
};

export default function loadRules(config: Config = {}): Rule[] {
  const completeConfig = { ...defaultConfig, ...config };

  return Object.keys(completeConfig)
    .filter(ruleName => completeConfig[ruleName] !== false)
    .map(ruleName => require('./' + ruleName).default(config[ruleName]));
}
