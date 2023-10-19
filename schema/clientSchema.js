const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");
const User = require("../models/User.js");
const { UserType } = require("./userSchema.js");

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const clientQueries = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return Client.find();
    },
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Client.findById(args.id);
    },
  },
};

const clientMutation = {
  //Add Client
  addClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
        userId: args.userId,
      });
      return client.save();
    },
  },
  //Delete Client
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      Project.find({ clientId: args.id }).then((projects) => {
        projects.forEach((project) => {
          project.deleteOne();
        });
      });
      return Client.findByIdAndDelete(args.id);
    },
  },
};

module.exports = { ClientType, clientQueries, clientMutation };
