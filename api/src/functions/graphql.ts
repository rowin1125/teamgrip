import { authDecoder } from '@redwoodjs/auth-dbauth-api';
import { createGraphQLHandler } from '@redwoodjs/graphql-server';

import directives from 'src/directives/**/*.{js,ts}';
import sdls from 'src/graphql/**/*.sdl.{js,ts}';
import services from 'src/services/**/*.{js,ts}';

import { getCurrentUser } from 'src/lib/auth';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

let generateGraphiQLHeader = undefined;

if (process.env.NODE_ENV === 'development') {
  try {
    const module = require('api/dist/lib/generateGraphiQLHeader');
    generateGraphiQLHeader = module.default;
  } catch (err) {
    console.log('Could not find generateGraphiQLHeader');
  }
}

export const handler = createGraphQLHandler({
  getCurrentUser,
  authDecoder,
  generateGraphiQLHeader,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  armorConfig: { maxDepth: { n: 12 } },
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect();
  },
});
