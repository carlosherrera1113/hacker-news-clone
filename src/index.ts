import { ApolloServer, makeExecutableSchema } from 'apollo-server';

import * as fs from 'fs';

import { prisma } from './generated/prisma-client';

import resolvers from './resolvers/index';

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync('./src/schema.graphql', 'utf-8'),
});

const server = new ApolloServer({
  schema,
  resolvers,
  context: (request): any => ({
    ...request,
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
