import { readFile, writeFile } from 'mz/fs';

import loadRules from './rules/load-rules';
import ruleRunner from './rules/rule-runner';
import { ResultStatus } from './rules/rule-types';


export default async function app(command: string, message: string) {
  switch (command) {
    case 'setup':
      console.log('Setting up better-commit...')
      const hook = await readFile('./hooks/commit-msg');
      console.log('hook is ', hook)
      break;
    case 'lint':
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
      break;
  }

}
