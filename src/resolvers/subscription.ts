
import { SubscriptionResolvers, Link, Vote } from '../generated/codegen';

const Subscription: SubscriptionResolvers = {
  newLink: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node(),
    resolve: (payload: Link) => payload,
  },
  newVote: {
    subscribe: (parent, args, context) => context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
    resolve: (payload: Vote) => payload,
  },
};

export default Subscription;
