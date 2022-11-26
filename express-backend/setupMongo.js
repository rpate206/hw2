// importing mongoose library after adding it as dependency in package.json file
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://:@cluster0.ffynzsc.mongodb.net/?retryWrites=true&w=majority";

function connect() {
  const options = { useNewUrlParser: true };
  // async process to handle output after attempting to connect to db
  mongoose.connect(uri, options).then(
    () => {
      // connection to db successful
      console.log("Database connection established!");
    },
    (err) => {
      // connection to db failed
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;
