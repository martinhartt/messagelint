import { Commit, ResultStatus } from '../rule-types';

import { expect } from 'chai';
import 'mocha';

import firstWordVerbRule from './index';

describe('firstWordVerbRule', () => {
  it('accepts messages where first word is an verb in present form', async () => {
    const context: Commit = {
      message: {
        raw: 'Make a script',
      },
    };

    const result = await firstWordVerbRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Approved);
  });

  it('modifies messages where first word is not an verb in present form', async () => {
    const context: Commit = {
      message: {
        raw: 'Made a script',
      },
    };

    const result = await firstWordVerbRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Make a script');
  });

  it('modifies messages where first word is not an verb in present form', async () => {
    const context: Commit = {
      message: {
        raw: 'Making a script',
      },
    };

    const result = await firstWordVerbRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Make a script');
  });

  it('reject messages where first word is not an verb', async () => {
    const context: Commit = {
      message: {
        raw: 'Hello world',
      },
    };

    const result = await firstWordVerbRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Rejected);
  });
});
