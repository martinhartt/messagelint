import { expect } from 'chai';
import 'mocha';
import setupConfig from './setup-config';

describe('setupConfig', () => {
  it('should correctly populate the default values from the base config', () => {
    const config = {};

    const result = setupConfig(config);

    expect(result).to.deep.equal({
      name: 'base',
      extends: null,
      prefix: /(?:)/,
      skip: [],
      shouldReject: true,
      whenFixable: 'modify',
      rules: {
        'no-whitespace-padding': true,
        'first-word-verb': { tense: 'infinitive' },
        'first-letter-capital': true,
        'no-trailing-dot': true,
      },
    });
  });

  it('should correctly recursively extend other configs', () => {
    const config = {
      extends: ['messagelint'],
      rules: {
        'no-trailing-dot': {
          skip: ['[abc]?'],
        },
      },
    };

    const result = setupConfig(config);

    expect(result).to.deep.equal({
      name: 'messagelint',
      extends: null,
      prefix: /(?:)/,
      skip: [/^\s*v\d+(\.d+(\.d+)?)?\s*$/],
      shouldReject: true,
      whenFixable: 'modify',
      rules: {
        'no-whitespace-padding': true,
        'first-word-verb': { tense: 'infinitive' },
        'first-letter-capital': true,
        'no-trailing-dot': {
          skip: [/[abc]?/],
        },
      },
    });
  });
});
