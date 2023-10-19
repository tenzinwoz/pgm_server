const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const User = require("../models/User.js");

//User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//User Query
const userQueries = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return User.findById(args.id);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return User.find();
    },
  },
};

//User Mutation
const userMuation = {
  //Add User
  addUser: {
    type: UserType,
    args: {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const { firstName, lastName, phone, email } = args;
      const user = new User({
        firstName,
        lastName,
        phone,
        email,
      });
      return user.save();
    },
  },
};

module.exports = { UserType, userQueries, userMuation };
