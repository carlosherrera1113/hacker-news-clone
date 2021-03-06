import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type Maybe<T> = T | null;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  LinkOrderByInput: LinkOrderByInput,
  Feed: ResolverTypeWrapper<Feed>,
  Link: ResolverTypeWrapper<Link>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  User: ResolverTypeWrapper<User>,
  Vote: ResolverTypeWrapper<Vote>,
  Mutation: ResolverTypeWrapper<{}>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  LinkOrderByInput: LinkOrderByInput,
  Feed: Feed,
  Link: Link,
  ID: Scalars['ID'],
  DateTime: Scalars['DateTime'],
  User: User,
  Vote: Vote,
  Mutation: {},
  AuthPayload: AuthPayload,
  SuccessMessage: SuccessMessage,
  Subscription: {},
  Boolean: Scalars['Boolean'],
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FeedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = ResolversObject<{
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>,
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
}>;

export type LinkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  votes?: Resolver<Maybe<Array<ResolversTypes['Vote']>>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  post?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationPostArgs, 'url' | 'description'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password' | 'name'>>,
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  logout?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>,
  vote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationVoteArgs, 'linkId'>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  feed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, QueryFeedArgs>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  newLink?: SubscriptionResolver<ResolversTypes['Link'], "newLink", ParentType, ContextType>,
  newVote?: SubscriptionResolver<ResolversTypes['Vote'], "newVote", ParentType, ContextType>,
}>;

export type SuccessMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  links?: Resolver<Maybe<Array<ResolversTypes['Link']>>, ParentType, ContextType>,
}>;

export type VoteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Feed?: FeedResolvers<ContextType>,
  Link?: LinkResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  SuccessMessage?: SuccessMessageResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Vote?: VoteResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};


export type Feed = {
   __typename?: 'Feed',
  links: Array<Link>,
  count: Scalars['Int'],
};

export type Link = {
   __typename?: 'Link',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  description: Scalars['String'],
  url: Scalars['String'],
  postedBy?: Maybe<User>,
  votes?: Maybe<Array<Vote>>,
};

export enum LinkOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type Mutation = {
   __typename?: 'Mutation',
  post: Link,
  signUp: AuthPayload,
  login: AuthPayload,
  logout?: Maybe<SuccessMessage>,
  vote: Vote,
};


export type MutationPostArgs = {
  url: Scalars['String'],
  description: Scalars['String']
};


export type MutationSignUpArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationVoteArgs = {
  linkId: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  feed: Feed,
  me?: Maybe<User>,
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  first?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<LinkOrderByInput>
};

export type Subscription = {
   __typename?: 'Subscription',
  newLink: Link,
  newVote: Vote,
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage',
  message?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  links?: Maybe<Array<Link>>,
};

export type Vote = {
   __typename?: 'Vote',
  id: Scalars['ID'],
  link?: Maybe<Link>,
  user?: Maybe<User>,
};
