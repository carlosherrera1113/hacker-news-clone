
import * as jwt from 'jsonwebtoken';

import { Context } from './context';

import { User } from './generated/codegen';

const getUserId = (context: Context) => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer', '');

    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
            userId: User;
        };

    return userId.id;
  }

  throw new Error('Not Authenticated');
};

export default getUserId;
