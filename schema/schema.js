const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { userQueries, userMuation } = require("./userSchema.js");
const { clientQueries, clientMutation } = require("./clientSchema.js");
const { projectQueries, projectMutation } = require("./projectSchema.js");

//Root Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQueries,
    ...clientQueries,
    ...projectQueries,
  },
});

//Root Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMuation,
    ...clientMutation,
    ...projectMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
