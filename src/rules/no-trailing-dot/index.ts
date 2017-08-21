import { RuleFactory, ResultStatus } from '../rule-types';

export const noTrailingDotRule: RuleFactory = config => ({
  meta: {
    name: 'No Trailing Dot',
    key: 'no-trailing-dot',
    description:
      'This rule ensures that the subject doesn\'t end in a comma.',
  },
  async evaluate(context) {
    const original = context.message.raw;
    const lastChar = original.slice(-1)[0];

    if (lastChar !== '.') {
      return {
        status: ResultStatus.Approved,
      };
    }
    return {
      status: ResultStatus.Modify,
      proposed: original.slice(0, -1),
    };
  },
});

export default noTrailingDotRule;
