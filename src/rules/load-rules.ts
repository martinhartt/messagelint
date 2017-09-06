import { merge } from 'lodash';
import { GlobalConfig, Rule } from './rule-types';

export default function loadRules(config: GlobalConfig): Rule[] {
  return Object.keys(config.rules)
    .filter(ruleName => config.rules[ruleName] !== false)
    .map(ruleName => require('./' + ruleName).default(merge({}, config, config.rules[ruleName])));
}
