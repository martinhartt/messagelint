import ruleRunner from './rule-runner';
import { Rule, ResultStatus, Result, Commit } from './rule-types';

import { expect } from 'chai';
import 'mocha';

const ruleFactory = (result: Result) => ({
  meta: {
    name: '',
    key: '',
    description: '',
  },
  async evaluate(context: Commit) {
    return result;
  },
});

const approveRule = ruleFactory({
  status: ResultStatus.Approved,
});

const modifyRule = ruleFactory({
  status: ResultStatus.Modify,
  proposed: 'Hello',
});

const rejectRule = ruleFactory({
  status: ResultStatus.Rejected,
  warning: 'Not ok',
});

describe('ruleRunner', () => {
  const context = {
    message: {
      raw: 'Fix this problem',
    },
  };

  it('retuns an approved result if all the rules are approved', async () => {
    const rules: Rule[] = [approveRule, approveRule];

    expect(await ruleRunner(rules, context)).to.deep.equal({
      status: ResultStatus.Approved,
    });
  });

  it('retuns a reject result if one of the rules are rejected', async () => {
    const rules: Rule[] = [approveRule, rejectRule, approveRule];

    expect(await ruleRunner(rules, context)).to.deep.equal({
      status: ResultStatus.Rejected,
      warning: 'Not ok',
    });
  });

  it('retuns a auto modify result if one of the rules return it', async () => {
    const rules: Rule[] = [approveRule, modifyRule, approveRule];

    expect(await ruleRunner(rules, context)).to.deep.equal({
      status: ResultStatus.Modify,
      proposed: 'Hello',
    });
  });
});
