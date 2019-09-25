
import * as jwt from 'jsonwebtoken';

import { Context } from './context';

const getUserId = (context: Context) => {
  const Authorization = context.req.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };

    return userId;
  }

  throw new Error('Not Authenticated');
};

export default getUserId;
