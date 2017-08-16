import { RuleFactory, ResultStatus } from '../rule-types';

export const noTrailingDotRule: RuleFactory = config => ({
  meta: {
    name: 'First Letter Capital',
    key: 'first-letter-capital',
    description:
      'This rule ensures that the first letter in the subject is always capital, matching the sentence case.',
  },
  async evaluate(context) {
    const original = context.message.raw;
    const trimmed = original.trim();
    const lastChar = trimmed.slice(-1)[0];

    if (lastChar !== '.') {
      return {
        status: ResultStatus.Approved,
      };
    }
    return {
      status: ResultStatus.Modify,
      proposed: original.replace(trimmed[0], trimmed[0].toUpperCase()),
    };
  },
});

export default noTrailingDotRule;
