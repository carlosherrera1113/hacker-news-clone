import { LinkResolvers } from '../generated/codegen';

const Link: LinkResolvers = {
  postedBy: ({ id }, args, context) => context.prisma.link({ id }).postedBy(),

  votes: ({ id }, args, context) => context.prisma.link({ id }).votes(),
};

export default Link;
