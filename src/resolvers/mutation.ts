
import * as bcrypt from 'bcryptjs';

import { getUserId, sendRefreshToken, createToken, createRefreshToken } from '../utils';

import { MutationResolvers, AuthPayload } from '../generated/codegen';

const Mutation: MutationResolvers = {
  signUp: async (parent, args, context): Promise<AuthPayload> => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = createToken(user);

    sendRefreshToken(context.res, createRefreshToken(user));

    return {
      token,
      user,
    };
  },
  login: async (parent, { email, password }, context): Promise<AuthPayload> => {
    const user = await context.prisma.user({ email });

    const valid = await bcrypt.compare(password, user ? user.password : '');

    if (!user || !valid) {
      throw new Error('Invalid Credentials!');
    }
    const token = createToken(user);

    sendRefreshToken(context.res, createRefreshToken(user));

    return {
      token,
      user,
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
  vote: async (parent, { linkId }, context) => {
    const userId = getUserId(context);

    const linkExists = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: linkId },
    });

    if (linkExists) {
      throw new Error(`Already voted for link: ${linkId}`);
    }

    const vote = await context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: linkId } },
    });

    return vote;
  },
};

export default Mutation;
