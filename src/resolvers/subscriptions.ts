
import { SubscriptionResolvers } from '../generated/codegen';

const Subscriptions: SubscriptionResolvers = {
  newLink: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node(),
  },
  newVote: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
  },
};

export default Subscriptions;
