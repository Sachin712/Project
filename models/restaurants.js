// load mongoose since we need it to define a model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
restaurantSchema = new Schema({
  address: {
    building: String,
    coord: [Number],
    street: String,
    zipcode: String,
  },
  borough: String,
  cuisine: String,
  grades: [
    {
      date: Date,
      grade: String,
      score: Number,
    },
  ],
  name: String,
  restaurant_id: String,

  // "address": {
  //       "building": {
  //         "type": "String"
  //       },
  //       "coord": {
  //         "type": [
  //           "Mixed"
  //         ]
  //       },
  //       "street": {
  //         "type": "String"
  //       },
  //       "zipcode": {
  //         "type": "String"
  //       }
  //     },
  //     "borough": {
  //       "type": "String"
  //     },
  //     "cuisine": {
  //       "type": "String"
  //     },
  //     "grades": [{
  //       "date": "Date",
  //       "grade": "String",
  //       "score": "Number"
  //   }],
  //     // "grades": {
  //     //   "type": [
  //     //     "Object",
  //     //   ],
  //     //   "date":{
  //     //     "type": "Date"
  //     //   },
  //     //   "grade":{
  //     //     "type": "String"
  //     //   },
  //     //   "score":{
  //     //     "type": "Number"
  //     //   },
  //     // },
  //     "name": {
  //       "type": "String"
  //     },
  //     "restaurant_id": {
  //       "type": "String"
  //     },
});
module.exports = mongoose.model("restaurants", restaurantSchema);
