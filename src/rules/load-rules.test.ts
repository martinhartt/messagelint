import loadRules from './load-rules';

import { expect } from 'chai';
import 'mocha';

describe('loadRules', () => {
  it('returns all the rules with no config', () => {
    const result = loadRules();
    expect(result.map(rule => rule.meta.key)).to.deep.equal(['sample-rule']);
  });

  it('does not return rules with a false value in config', () => {
    const result = loadRules({
      'sample-rule': false,
    });
    expect(result.map(rule => rule.meta.key)).to.deep.equal([]);
  });

  it('does return rules with a specific config', () => {
    const result = loadRules({
      'sample-rule': {
        test: true,
      },
    });
    expect(result.map(rule => rule.meta.key)).to.deep.equal(['sample-rule']);
  });
});
