#!/usr/bin/env node
import * as program from 'commander';
import app from './app';

program
  .arguments('command message')
  .action((command, message) => {
    app(command, message).then(console.log).catch(err => {
      console.error(err.message); // tslint:disable-line:no-console
      process.exit(1);
    });
  })
  .parse(process.argv);
