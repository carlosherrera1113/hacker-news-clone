
import * as jwt from 'jsonwebtoken';

import { Response } from 'express';

import { Context } from './context';

import { User } from './generated/codegen';

export const getUserId = (context: Context) => {
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, process.env.APP_SECRET) as any;

    return userId;
  }

  throw new Error('Not Authenticated');
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('getToken', token, {
    httpOnly: true,
    path: './refresh_token',
  });
};

export const createToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id }, process.env.APP_SECRET, { expiresIn: '7d' },
  );
};
