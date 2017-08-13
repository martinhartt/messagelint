import { Commit, ResultStatus } from '../rule-types';

import { expect } from 'chai';
import 'mocha';

import firstLetterCapitalRule from './index';

describe('firstLetterCapitalRule', () => {
  it('accepts messages where first letter is uppercase', async () => {
    const context: Commit = {
      message: {
        raw: 'Fix this issue',
      },
    };

    const result = await firstLetterCapitalRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Approved);
  });

  it('modifies messages where first letter is not uppercase', async () => {
    const context: Commit = {
      message: {
        raw: 'fix this issue',
      },
    };

    const result = await firstLetterCapitalRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Fix this issue');
  });

  it('does not modify the whitespace before and after the string', async () => {
    const context: Commit = {
      message: {
        raw: '     fix this issue  ',
      },
    };

    const result = await firstLetterCapitalRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('     Fix this issue  ');
  });
});
