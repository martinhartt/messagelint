import loadRules from './load-rules';
import { GlobalConfig } from './rule-types';

import { expect } from 'chai';
import { merge } from 'lodash';
import 'mocha';

const baseConfig = require('../../configs/base.json') as GlobalConfig; // tslint:disable-line

describe('loadRules', () => {
  it('returns all the rules with no config', () => {
    const result = loadRules(baseConfig);
    expect(result.map(rule => rule.meta.key)).to.have.members([
      'no-whitespace-padding',
      'first-word-verb',
      'first-letter-capital',
      'no-trailing-dot',
    ]);
  });

  it('does not return rules with a false value in config', () => {
    const result = loadRules(
      merge({}, baseConfig, {
        rules: { 'first-letter-capital': false },
      }),
    );
    expect(result.map(rule => rule.meta.key)).to.not.include('first-letter-capital');
  });

  it('does return rules with a specific config', () => {
    const result = loadRules(
      merge({}, baseConfig, {
        'first-letter-capital': {
          test: true,
        },
      }),
    );
    expect(result.map(rule => rule.meta.key)).to.include('first-letter-capital');
  });
});
