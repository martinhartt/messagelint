import { RuleFactory, ResultStatus } from '../rule-types';

export const noWhitespacePaddingRule: RuleFactory = config => ({
  meta: {
    name: 'No Whitespace Padding',
    key: 'no-whitespace-padding',
    description:
      'This rule ensures there is no whitespace around each line of the message',
  },
  async evaluate(context) {
    const original = context.message.raw;
    const trimmed = original.trim();

    const newString = original.split('\n').map(s => s.trim()).join('\n');

    if (newString === original) {
      return {
        status: ResultStatus.Approved,
      };
    } else {
      return {
        status: ResultStatus.Modify,
        proposed: newString,
      }
    }
  },
});

export default noWhitespacePaddingRule;
