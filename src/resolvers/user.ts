import { UserResolvers } from '../generated/codegen';

const User: UserResolvers = {
  links: ({ id }, args, context) => context.prisma.user({ id }).links(),
};

export default User;
