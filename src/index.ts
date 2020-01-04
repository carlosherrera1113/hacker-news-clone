import { ApolloServer } from 'apollo-server-express';

import express from 'express';

import cookieParser from 'cookie-parser';

import cors from 'cors';

import * as jwt from 'jsonwebtoken';

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
  const { userId } = jwt.verify(token, process.env.APP_SECRET) as any;
  console.log(userId);
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

server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
