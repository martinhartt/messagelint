#!/usr/bin/env node
import * as program from 'commander';
import app from './app';

program
  .arguments('message')
  .action(message => {
    console.log(app(message));
  })
  .parse(process.argv);
