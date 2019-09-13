
import Query from './query';

import Subscriptions from './subscriptions';

import Link from './link';

import { Resolvers } from '../generated/codegen';

const resolvers: Resolvers = {
  Query,
  Subscriptions,
  Link,
};

export default resolvers;
