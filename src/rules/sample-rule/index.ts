import { RuleFactory, Commit, ResultStatus } from '../rule-types';

export const sampleRule: RuleFactory = config => ({
  meta: {
    name: 'Sample rule',
    key: 'sample-rule',
    description: 'This is a sample rule',
  },
  evaluate(context) {
    return {
      status: ResultStatus.Okay,
    };
  },
});

export default sampleRule;
