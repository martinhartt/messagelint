import Rule, { Commit, ResultStatus } from '../ruleTypes';

const sampleRule: Rule = {
  meta: {
    name: 'Sample rule',
    description: 'This is a sample rule',
  },
  evaluate(context) {
    return {
      status: ResultStatus.Okay,
    };
  },
};

export default sampleRule;
