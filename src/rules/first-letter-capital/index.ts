import { RuleFactory, ResultStatus } from '../rule-types';

export const firstLetterCapitalRule: RuleFactory = config => ({
  meta: {
    name: 'First Letter Capital',
    key: 'first-letter-capital',
    description:
      'This rule ensures that the first letter in the subject is always capital, matching the sentence case.',
  },
  async evaluate(context) {
    const original = context.message.raw;

    if (original[0] === original[0].toUpperCase()) {
      return {
        status: ResultStatus.Approved,
      };
    }
    return {
      status: ResultStatus.Modify,
      proposed: original.replace(original[0], original[0].toUpperCase()),
    };
  },
});

export default firstLetterCapitalRule;
