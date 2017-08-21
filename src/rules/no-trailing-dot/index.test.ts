import { Commit, ResultStatus } from '../rule-types';

import { expect } from 'chai';
import 'mocha';

import noTrailingDotRule from './index';

describe('noTrailingDotRule', () => {
  it('accepts messages where last letter is not dot', async () => {
    const context: Commit = {
      message: {
        raw: 'Fix this issue\n\nBody',
      },
    };

    const result = await noTrailingDotRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Approved);
  });

  it('modifies messages to remove the last dot', async () => {
    const context: Commit = {
      message: {
        raw: 'Fix this issue.\n\nBody',
      },
    };

    const result = await noTrailingDotRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Fix this issue\n\nBody');
  });
});
