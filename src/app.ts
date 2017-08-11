import loadRules from './rules/load-rules';
import { MessageResult, ResultStatus } from './rules/rule-types';

export default function app(message: string) {
  const rules = loadRules();
  console.log(rules);

  for (const rule of rules) {
    const result: MessageResult = rule.evaluate({
      message: {
        raw: message,
      },
    });

    if (result.status == ResultStatus.Okay) {
      return message;
    } else {
      throw new Error(result.warning);
    }
  }
}
