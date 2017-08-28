# 🌟 MessageLint

A formatter to make inconsistent commit messages obsolete!


## Installation and Usage

Go to any git project and run:

```
npm install -g messagelint
messagelint setup
```

Then create a commit as usual:

```
git commit -m "made a change"
```

MessageLint will either:

- Approve (silently)
- Modify (silently)
- Reject (verbosely)

...your commit message

## Development

```
git clone git@github.com:martinhartt/messagelint.git
npm install
npm build
npm start
```

## Rules

These rules are run as part of the linting process, and are setup to reflect
commit message best practices.

### No whitespace padding

This ensures there is no redundant whitespace around the subject and body of the
commit message.

### No trailing dot

Message subjects shouldn't end with a dot and this rule strips them if necessary.

### First letter capital

In line with most conventions, this rule ensures the first letter is capital.

### First word of the subject is a verb in present tense and imperitive mood
