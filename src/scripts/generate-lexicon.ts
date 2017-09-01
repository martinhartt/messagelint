const nlp = require('compromise'); // tslint:disable-line
const verbConjugations: Lexicon[] = require('../../lexicon/verb-conjugations.json'); // tslint:disable-line
import { writeFile } from 'mz/fs';
import { join } from 'path';

const tenses = [
  'infinitive',
  'past',
  'gerund',
  'present',
];

interface TenseToSomething {
  infinitive: string | any;
  past: string | any;
  gerund: string | any;
  present: string | any;
  [key: string]: string | any;
}

const tenseToLexiconKey: TenseToSomething = {
  infinitive: 'infinitive',
  past: 'past',
  gerund: 'present participle',
  present: '3rd singular present',
};

interface Lexicon {
  'infinitive': string;
  'past': string;
  'present participle': string;
  '3rd singular present': string;
  [key: string]: string;
}

const tenseToConjugationKey: TenseToSomething = {
  infinitive: 'Infinitive',
  past: 'PastTense',
  gerund: 'Gerund',
  present: 'PresentTense',
};

const tenseToCorrections: TenseToSomething = {
  infinitive: {},
  past: {},
  gerund: {},
  present: {},
};

for (const verb of verbConjugations) {
  for (const toTense of tenses) {
    for (const fromTense of tenses) {
      const calculatedConjugations = nlp(verb[tenseToLexiconKey[fromTense]]).verbs().conjugate();

      if (!calculatedConjugations || !calculatedConjugations[0]) {
        tenseToCorrections[toTense][verb[tenseToLexiconKey[fromTense]]] = verb[tenseToLexiconKey[toTense]];
        continue;
      }


      const calculatedResult = calculatedConjugations[0][tenseToConjugationKey[toTense]];
      const expectedResult = verb[tenseToLexiconKey[toTense]];

      // (calculatedResult !== expectedResult) && console.log('Comparing ', calculatedResult, expectedResult, calculatedResult === expectedResult);

      if (calculatedResult !== expectedResult) {
        tenseToCorrections[toTense][verb[tenseToLexiconKey[fromTense]]] = verb[tenseToLexiconKey[toTense]];
      }
    }
  }
}

Promise.all(tenses.map(tense => writeFile(join(__dirname, `../../lexicon/verbs-to-${tense}.json`), JSON.stringify(tenseToCorrections[tense], null, '  '))));
