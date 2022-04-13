require("dotenv").config();

module.exports = {
  //url : "mongodb+srv://harshit:harshit@cluster0.pgsa1.mongodb.net/sample_restaurants?authSource=admin&replicaSet=atlas-m68q3j-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

  url:
    "mongodb+srv://" +
    process.env.USER +
    ":" +
    process.env.PASSWORD +
    "@cluster0.7dsmg.mongodb.net/sample_restaurants?retryWrites=true&w=majority",
};
