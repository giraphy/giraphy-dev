"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRootQuery = exports.users = exports.commentsRootQuery = exports.comments = void 0;
var graphql_1 = require("graphql");
var giraphy_schema_1 = require("@giraphy/giraphy/lib/schema/giraphy-schema");
var rdbms_schema_1 = require("@giraphy/giraphy/lib/schema/rdbms/rdbms-schema");
var rdbms_util_1 = require("@giraphy/giraphy/lib/schema/rdbms/rdbms-util");
exports.comments = new giraphy_schema_1.GiraphyObjectType({
    name: "Comments",
    // @ts-ignore
    sqlTable: "comments",
    uniqueKey: "comment_id",
    fields: function () { return ({
        commentId: {
            type: graphql_1.GraphQLString,
            sqlColumn: "comment_id",
        },
        userId: {
            type: graphql_1.GraphQLString,
            sqlColumn: "user_id",
        },
        body: {
            type: graphql_1.GraphQLString,
            sqlColumn: "body",
        },
        usersOne: {
            type: exports.users.objectType,
            sqlJoin: function (commentsTable, usersTable) {
                return commentsTable + ".user_id = " + usersTable + ".user_id";
            },
            args: {
                userId: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
            },
            where: function (table, args, context) {
                // @ts-ignore
                return Object.keys(args).map(function (key) { return table + "." + exports.users.fieldConfig[key].sqlColumn + " = " + rdbms_util_1.escapeSqlString(args[key]); })
                    .join(" and ");
            },
        },
    }); },
});
exports.commentsRootQuery = {
    type: new graphql_1.GraphQLList(exports.comments.objectType),
    resolve: function (source, args, context, info) {
        return rdbms_schema_1.executeQuery(info, context);
    },
    args: {
        commentId: { type: graphql_1.GraphQLString },
        userId: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
    },
    // @ts-ignore
    where: function (table, args, context) {
        // @ts-ignore
        return Object.keys(args).map(function (key) { return table + "." + exports.comments.fieldConfig[key].sqlColumn + " = " + rdbms_util_1.escapeSqlString(args[key]); })
            .join(" and ");
    },
};
exports.users = new giraphy_schema_1.GiraphyObjectType({
    name: "Users",
    // @ts-ignore
    sqlTable: "users",
    uniqueKey: "user_id",
    fields: function () { return ({
        userId: {
            type: graphql_1.GraphQLString,
            sqlColumn: "user_id",
        },
        email: {
            type: graphql_1.GraphQLString,
            sqlColumn: "email",
        },
        commentsList: {
            type: new graphql_1.GraphQLList(exports.comments.objectType),
            sqlJoin: function (usersTable, commentsTable) {
                return usersTable + ".user_id = " + commentsTable + ".user_id";
            },
            args: {
                commentId: { type: graphql_1.GraphQLString },
                userId: { type: graphql_1.GraphQLString },
                body: { type: graphql_1.GraphQLString },
            },
            where: function (table, args, context) {
                // @ts-ignore
                return Object.keys(args).map(function (key) { return table + "." + exports.comments.fieldConfig[key].sqlColumn + " = " + rdbms_util_1.escapeSqlString(args[key]); })
                    .join(" and ");
            },
        },
    }); },
});
exports.usersRootQuery = {
    type: new graphql_1.GraphQLList(exports.users.objectType),
    resolve: function (source, args, context, info) {
        return rdbms_schema_1.executeQuery(info, context);
    },
    args: {
        userId: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
    },
    // @ts-ignore
    where: function (table, args, context) {
        // @ts-ignore
        return Object.keys(args).map(function (key) { return table + "." + exports.users.fieldConfig[key].sqlColumn + " = " + rdbms_util_1.escapeSqlString(args[key]); })
            .join(" and ");
    },
};
