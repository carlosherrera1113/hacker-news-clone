
import { QueryResolvers } from '../generated/codegen';

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
};

export default Query;
