import loadRules from './rules/load-rules';
import { ResultStatus } from './rules/rule-types';

export default async function app(message: string) {
  const rules = loadRules();

  for (const rule of rules) {
    const result = await rule.evaluate({
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
