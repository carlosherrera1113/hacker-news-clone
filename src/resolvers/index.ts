
import Query from './query';

import Subscription from './subscription';

import Link from './link';

import User from './user';

import { Resolvers } from '../generated/codegen';

const resolvers: Resolvers = {
  Query,
  Subscription,
  Link,
  User,
};

export default resolvers;
