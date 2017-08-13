import { Rule, Result, Commit, ResultStatus } from './rule-types';

interface ConfirmModifyCallback {
  (proposedMessage: string): Promise<boolean>;
}

export default async function ruleRunner(
  rules: Rule[],
  commit: Commit,
): Promise<Result> {
  let currentCommit = commit;
  let lastModifyResult: Result | null = null;

  for (const rule of rules) {
    const result = await rule.evaluate(currentCommit);

    switch (result.status) {
      case ResultStatus.Approved:
        continue;
      case ResultStatus.Modify:
        if (!result.proposed)
          throw new Error('Rule error: there is no proposed message!');

        lastModifyResult = result;
        currentCommit.message.raw = result.proposed;
        continue;
      case ResultStatus.Rejected:
        if (!result.warning)
          throw new Error('Rule error: there is no warning message!');

        return result;
    }
  }

  return (
    lastModifyResult || {
      status: ResultStatus.Approved,
    }
  );
}
