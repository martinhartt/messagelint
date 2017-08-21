import loadRules from './load-rules';

import { expect } from 'chai';
import 'mocha';

describe('loadRules', () => {
  it('returns all the rules with no config', () => {
    const result = loadRules();
    expect(result.map(rule => rule.meta.key)).to.deep.equal(['first-letter-capital']);
  });

  it('does not return rules with a false value in config', () => {
    const result = loadRules({
      'first-letter-capital': false,
    });
    expect(result.map(rule => rule.meta.key)).to.deep.equal([]);
  });

  it('does return rules with a specific config', () => {
    const result = loadRules({
      'first-letter-capital': {
        test: true,
      },
    });
    expect(result.map(rule => rule.meta.key)).to.deep.equal(['first-letter-capital']);
  });
});
