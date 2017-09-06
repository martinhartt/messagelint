import { mapValues, merge } from 'lodash';

import { BaseConfig, GlobalConfig } from '../rules/rule-types';

interface SimpleConfig extends BaseConfig {
  extends?: string[];
  rules?: {
    [name: string]: BaseConfig | boolean;
  };
}

function extractSuperConfig(config: SimpleConfig): object {
  if (config.name === 'base') {
    return config;
  }

  let superConfigNames = config.extends as string[] | null;
  if (!superConfigNames || !superConfigNames.length) {
    superConfigNames = ['base'];
  }

  let superConfigs: object[];
  try {
    superConfigs = superConfigNames.map(name =>
      extractSuperConfig(require('../../configs/' + name + '.json')),
    );
  } catch (e) {
    throw new Error('You are extending a non-existant config in your .messagelintrc file');
  }

  return merge({}, ...superConfigs, config, { extends: null });
}

function convertToRegex(input: RegExp | string): RegExp {
  if (input instanceof RegExp) {
    return input;
  }
  return new RegExp(input);
}

function fixTypes(config: SimpleConfig): object {
  if (config !== Object(config)) {
    return config;
  }

  return merge(
    {},
    config,
    config.prefix !== undefined && {
      prefix: convertToRegex(config.prefix),
    },
    config.skip && {
      skip: config.skip.map(convertToRegex),
    },
    config.rules && {
      rules: mapValues(config.rules, fixTypes),
    },
  );
}

export default function setupConfig(json: object): GlobalConfig {
  return fixTypes(extractSuperConfig(json as SimpleConfig) as SimpleConfig) as GlobalConfig;
}
