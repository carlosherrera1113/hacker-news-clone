
import { VoteResolvers } from '../generated/codegen';

const Vote: VoteResolvers = {
  link: ({ id }, args, context) => context.prisma.vote({ id }).link(),

  user: ({ id }, args, context) => context.prisma.vote({ id }).user(),
};

export default Vote;
