import sampleRules from './rules/sample-rule';
import { MessageResult, ResultStatus } from './ruleTypes';

export default function app(message: string) {
  const result: MessageResult = sampleRules.evaluate({
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
