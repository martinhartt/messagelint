import { ResultStatus, RuleFactory } from '../rule-types';

export const sampleRule: RuleFactory = config => ({
  meta: {
    name: 'Sample rule',
    key: 'sample-rule',
    description: 'This is a sample rule',
  },
  async evaluate(context) {
    return {
      status: ResultStatus.Approved,
    };
  },
});

export default sampleRule;
