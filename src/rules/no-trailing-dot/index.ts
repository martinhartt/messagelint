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

    const matches = original.match(/^([^\n\.]+)(\.*)([\s\S]*)$/);

    if (!matches) {
      return {
        status: ResultStatus.Rejected,
      };
    }

    if (matches[2] === '') {
      return {
        status: ResultStatus.Approved,
      };
    }
    return {
      status: ResultStatus.Modify,
      proposed: `${matches[1]}${matches[3]}`,
    };

  },
});

export default noTrailingDotRule;
