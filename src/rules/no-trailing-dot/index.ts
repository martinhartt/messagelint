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
    const lines = original.split('\n');
    const subject = lines[0];
    const lastChar = subject.slice(-1)[0];

    if (lastChar !== '.') {
      return {
        status: ResultStatus.Approved,
      };
    }
    return {
      status: ResultStatus.Modify,
      proposed: `${subject.slice(0, -1)}${(lines.length > 1) ? '\n' : ''}${lines.slice(1).join('\n')}`, // HACK
    };
  },
});

export default noTrailingDotRule;
