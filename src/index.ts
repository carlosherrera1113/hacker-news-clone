import { ApolloServer } from 'apollo-server-express';

import express from 'express';

import cookieParser from 'cookie-parser';

import cors from 'cors';

import * as jwt from 'jsonwebtoken';

import http from 'http';

import { importSchema } from 'graphql-import';

import { prisma } from './generated/prisma-client';

import resolvers from './resolvers/index';

import { createToken, sendRefreshToken, createRefreshToken } from './utils';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.getToken;

  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }
  const { userId } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as any;
  const user = await prisma.user({ id: userId });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createToken(user) });
});

const typeDefs = importSchema('src/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
      prisma,
    };
  },
});

const httpServer = http.createServer(app);

server.applyMiddleware({ app, cors: false });

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost4000:${server.subscriptionsPath}`);
});
