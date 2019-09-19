
import Query from './query';

import Subscription from './subscription';

import Mutation from './mutation';

import Link from './link';

import User from './user';

import Vote from './vote';

import { Resolvers } from '../generated/codegen';

const resolvers: Resolvers = {
  Query,
  Subscription,
  Mutation,
  Link,
  User,
  Vote,
};

export default resolvers;
