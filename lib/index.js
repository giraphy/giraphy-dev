"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootQueryObject = void 0;
var giraphy_schema_1 = require("@giraphy/giraphy/lib/schema/giraphy-schema");
var app_1 = require("@giraphy/giraphy/lib/app");
var queryExtend = __importStar(require("./schema"));
var base_schema_1 = require("./base-schema");
var graphql_1 = require("graphql");
exports.rootQueryObject = new giraphy_schema_1.GiraphyObjectType({
    name: "Query",
    fields: function () { return ({
        users: base_schema_1.usersRootQuery,
        comments: base_schema_1.commentsRootQuery,
    }); },
});
queryExtend.default();
var schema = new graphql_1.GraphQLSchema({
    query: exports.rootQueryObject.objectType,
});
app_1.initGiraphyApp(schema);
