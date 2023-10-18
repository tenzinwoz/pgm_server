const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const colors = require("colors");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();
//Connect to DB
connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
