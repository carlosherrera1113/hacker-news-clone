import { ApolloServer } from 'apollo-server';

import { importSchema } from 'graphql-import';

import { prisma } from './generated/prisma-client';

import resolvers from './resolvers/index';

const typeDefs = importSchema('src/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): any => ({
    ...request,
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
