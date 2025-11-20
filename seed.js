const mongoose = require("mongoose");
const { User } = require("./models");
const { mongoURI } = require("./config/keys");

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected!");

    await User.create({
      name: "test",
      email: "test@gmail.com",
      password: "123456"
    });

    console.log("Inserted!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
