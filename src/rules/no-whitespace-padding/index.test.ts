import { Commit, ResultStatus } from '../rule-types';

import { expect } from 'chai';
import 'mocha';

import noWhitespacePaddingRule from './index';

describe('noSubjectPaddingRule', () => {
  it('accepts messages where there is no whitespace around the message lines', async () => {
    const context: Commit = {
      message: {
        raw: 'Fix this issue\n\nBody',
      },
    };

    const result = await noWhitespacePaddingRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Approved);
  });

  it('modifies messages where there is whitepace padding in front of the message', async () => {
    const context: Commit = {
      message: {
        raw: '  Fix this issue',
      },
    };

    const result = await noWhitespacePaddingRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Fix this issue');
  });

  it('modifies messages where there is whitepace padding after the subject', async () => {
    const context: Commit = {
      message: {
        raw: 'Fix this issue     ',
      },
    };

    const result = await noWhitespacePaddingRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Fix this issue');
  });

  it('modifies messages where there is whitepace around the subject', async () => {
    const context: Commit = {
      message: {
        raw: '  Fix this issue     ',
      },
    };

    const result = await noWhitespacePaddingRule().evaluate(context);
    expect(result.status).to.equal(ResultStatus.Modify);
    expect(result.proposed).to.equal('Fix this issue');
  });
});
