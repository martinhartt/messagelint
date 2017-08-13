import loadRules from './rules/load-rules';
import ruleRunner from './rules/rule-runner';
import { ResultStatus } from './rules/rule-types';

export default async function app(message: string) {
  const rules = loadRules();

  const result = await ruleRunner(rules, {
    message: {
      raw: message,
    },
  });

  switch (result.status) {
    case ResultStatus.Rejected:
      throw new Error(result.warning);
    case ResultStatus.Approved:
      return message;
    case ResultStatus.Modify:
      return result.proposed;
  }
}
