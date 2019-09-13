
import { QueryResolvers } from '../generated/codegen';

const Query: QueryResolvers = {
  feed: async (parent, args, context) => {
    const where = args.filter ? {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    } : {};

    const links: any[] = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    });

    const count: number = await context.prisma
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
