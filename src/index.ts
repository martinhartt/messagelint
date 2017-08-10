#!/usr/bin/env node
import * as program from "commander";

program
  .arguments('message')
  .action(message => {
    console.log('Results: ', message);
  })
  .parse(process.argv);
