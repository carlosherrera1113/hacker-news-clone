
import { LinkResolvers } from '../generated/graphql';

const Link: LinkResolvers = {
  postedBy: async (parent, context: any) => context.prisma.link({ id: parent.id }).postedBy(),
  votes: async (parent, context: any) => context.prisma.link({ id: parent.id }).votes(),
};

export default Link;
