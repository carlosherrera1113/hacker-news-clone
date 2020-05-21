
import { QueryResolvers } from '../generated/codegen';
import { getUserId } from '../utils';

const Query: QueryResolvers = {
  feed: async (parent, { skip, first, orderBy, filter }, context) => {
    const where = filter ? {
      OR: [
        { description_contains: filter },
        { url_contains: filter },
      ],
    } : {};

    const links = await context.prisma.links({
      where,
      skip,
      first,
      orderBy,
    });

    const count = await context.prisma
      .linksConnection({ where })
      .aggregate()
      .count();

    return {
      links,
      count,
    };
  },
  me: async (parent, args, context) => {
    try {
      const userId = getUserId(context);
      const user = await context.prisma.user({ id: userId });

      return user;
    } catch (error) {
      return null;
    }
  },
};

export default Query;
