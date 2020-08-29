import { GiraphyObjectType } from '@giraphy/giraphy/lib/schema/giraphy-schema';
import { initGiraphyApp } from '@giraphy/giraphy/lib/app';
import * as queryExtend from './schema';
import { usersRootQuery } from './base-schema';
import { GraphQLSchema } from 'graphql';

export const rootQueryObject = new GiraphyObjectType({
  name: "Query",
  fields: () => ({
    users: usersRootQuery,
  }),
});

queryExtend.default();

const schema = new GraphQLSchema({
  query: rootQueryObject.objectType,
});

initGiraphyApp(schema);
