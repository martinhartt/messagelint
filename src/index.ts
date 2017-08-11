#!/usr/bin/env node
import * as program from 'commander';
import app from './app';

program
  .arguments('message')
  .action(message => {
    app(message)
      .then(console.log)
      .catch(err =>
        console.error(`Your commit was rejected due to: \n\n${err.message}`),
      );
  })
  .parse(process.argv);
