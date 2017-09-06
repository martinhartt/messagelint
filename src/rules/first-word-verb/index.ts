import { BaseConfig, ResultStatus, RuleFactory } from '../rule-types';
let nlp = require('compromise'); // tslint:disable-line
import matchStringCasing from '../../util/matchStringCasing';

interface FirstWordVerbConfig extends BaseConfig {
  tense: string;
}

function getInfinitiveFromLexicon(verb: string): string {
  // HACK Find verb in list
  return require('../../../lexicon/verbs-to-infinitive.json')[verb];
}

export const firstWordVerbRule: RuleFactory = (config: FirstWordVerbConfig) => ({
  meta: {
    name: 'First word verb',
    key: 'first-word-verb',
    description: 'This rule ensures the first word is an verb in present form',
  },
  async evaluate(context) {
    const original = context.message.raw;
    const lines = original.split('\n');
    const subject = lines[0];

    const words = nlp(subject).out('tags');

    if (!words[0].tags.includes('Verb')) {
      // HACK Find verb in list
      const newVerb = getInfinitiveFromLexicon(words[0].normal);

      if (newVerb) {
        const newVerbRightCase = newVerb[0].toUpperCase() + newVerb.slice(1);

        return {
          status: ResultStatus.Modify,
          proposed: subject.replace(words[0].text, newVerbRightCase),
        };
      }

      return {
        status: ResultStatus.Rejected,
        warning: 'The first word of the commit is not a verb',
      };
    }

    if (!words[0].tags.includes('Infinitive')) {
      let newVerb = getInfinitiveFromLexicon(words[0].normal);
      if (!newVerb) {
        newVerb = nlp(words[0].text).verbs().toInfinitive().out();
      }

      const newVerbRightCase = newVerb[0].toUpperCase() + newVerb.slice(1);

      return {
        status: ResultStatus.Modify,
        proposed: subject.replace(words[0].text, newVerbRightCase),
      };
    }

    return {
      status: ResultStatus.Approved,
    };
  },
});

export default firstWordVerbRule;
