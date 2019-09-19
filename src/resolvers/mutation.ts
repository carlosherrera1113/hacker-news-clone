
import * as bcrypt from 'bcryptjs';

import * as jwt from 'jsonwebtoken';

import getUserId from '../utils';

import { MutationResolvers } from '../generated/codegen';

const Mutation: MutationResolvers = {
  signUp: async (parent, args, context) => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      id: user.id,
    };
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email });

    const valid = await bcrypt.compare(password, user ? user.password : '');

    if (!user || !valid) {
      throw new Error('Invalid Credentials!');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      id: user.id,
    };
  },
  post: async (parent, { description, url }, context) => {
    const userId = getUserId(context);

    const link = await context.prisma.createLink({
      description,
      url,
      postedBy: { connect: { id: userId } },
    });

    return link;
  },
};

export default Mutation;
