import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';
import { GiraphyObjectType } from '@giraphy/giraphy/lib/schema/giraphy-schema';
import { escapeSqlString } from '@giraphy/giraphy/lib/schema/rdbms/rdbms-util';
import { executeQuery } from '@giraphy/giraphy/lib/schema/rdbms/rdbms-schema';

export const users: GiraphyObjectType<any, any, any> = new GiraphyObjectType({
  name: "Users",
  // @ts-ignore
  sqlTable: "users",
  uniqueKey: "user_id",
  fields: () => ({
    userId: {
      type: GraphQLString,
      sqlColumn: "user_id",
    },
    email: {
      type: GraphQLString,
      sqlColumn: "email",
    }
  }),
});

export const usersRootQuery: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(users.objectType),
  resolve: (source, args, context, info) => {
    return executeQuery(info, context)
  },
};
