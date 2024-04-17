
const express = require("express");
const dotenv = require("dotenv");
const UserModel = require("./model");

const mongoose = require("mongoose");
const app = express();
dotenv.config();
app.use(express.json());

if (process.env.MODE !== "TEST") {
  const { DB_PASSWORD, DB_USER } = process.env;
  /**********************connection to our DB********************************/
  const dbURL =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority`;
  // once
  mongoose
    .connect(dbURL)
    .then(function (connection) {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
}


async function createUser(req, res) {
  try {
    let user = await UserModel.create(req.body);
    res.status(200).json({
      message: user,
      status: "successful"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      status:"failure"
    });
  }
}


app.post("/api/users", createUser);
/*************************************************/



if (process.env.MODE !== "TEST") {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is listening at PORT ${port}`);
  });
} else {

  module.exports = app;
}



