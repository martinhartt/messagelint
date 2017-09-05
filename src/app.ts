import * as execa from 'execa';
import { chmod, readFile, writeFile } from 'mz/fs';
import { join } from 'path';

import loadRules from './rules/load-rules';
import ruleRunner from './rules/rule-runner';
import { ResultStatus } from './rules/rule-types';

export default async function app(command: string, message: string) {
  const gitRootCommand = await execa.shell('git rev-parse --show-toplevel');
  const gitRoot = gitRootCommand.stdout;

  let config: object | null;
  try {
    const configFile = await readFile(join(gitRoot, '.messagelintrc.json'));
    config = JSON.parse(configFile.toString('ascii'));
  } catch (e) {
    config = null;
  }

  switch (command) {
    case 'setup':
      console.log('Setting up MessageLint...\n'); // tslint:disable-line:no-console

      const hookTemplatePath = join(__dirname, '../hooks/commit-msg');
      const hookTemplateContent = await readFile(hookTemplatePath);

      const hookPath = join(gitRoot, '.git/hooks/', 'commit-msg');

      writeFile(hookPath, hookTemplateContent);
      chmod(hookPath, '755');

      return 'Success ✅';
    case 'lint':
      const rules = loadRules();

      const result = await ruleRunner(rules, {
        message: {
          raw: message,
        },
      });

      switch (result.status) {
        case ResultStatus.Rejected:
          throw new Error(
            `❌  MessageLint: Your commit message was rejected due to: \n\n${result.warning}\n\n`,
          );
        case ResultStatus.Approved:
          return message;
        case ResultStatus.Modify:
          return result.proposed;
      }
  }
}
