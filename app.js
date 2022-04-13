var express = require("express");
var app = express();
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const exphbs = require("express-handlebars");
var path = require("path"); // Using Path
app.use(express.static(path.join(__dirname, "public"))); // Connecting to the segments
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs"); //Able to render hbs file

app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
var db = require("./db/methods");
var port = process.env.PORT || 8000;

db.initialize();

var Rest = require("./models/restaurants");
const {
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
} = require("./db/methods");

app.get("/getrestaurants", function (req, res) {
  Rest.find(function (err, rest) {
    if (err) res.send(err);

    res.json(rest);
  });
});

app.get("/step3", (req, res) => {
  res.render("./pages/step3", { layout: false });
});

//route for paginaton through URL
app.get("/api/restaurants", async (req, res) => {
  var page = req.query.page;
  var perPage = req.query.perPage;
  var borough = req.query.borough;

  console.log(page, perPage, borough);

  let temp = await db.getAllRestaurants(page, perPage, borough);
  //console.log("here ");
  res.send(temp);
});

//route for step3 hbs
app.post("/api/restaurants", async (req, res) => {
  var page = req.body.page;
  var perPage = req.body.perPage;
  var borough = req.body.Borough;

  console.log(page, perPage, borough);

  let temp = await db.getAllRestaurants(page, perPage, borough);
  //console.log("here ");
  res.send(temp);
});

app.get("/api/restaurants/:_id", async (req, res) => {
  let id = req.params._id;
  let result = await getRestaurantById(id);
  console.log(result);
  res.send(result);
});

app.get("/addForm", (req, res) => {
  res.render("./pages/addform", { layout: false });
});

// create book and send back all books after creation
app.post("/api/restaurants", async function (req, res) {
  // create mongose method to create a new record into collection

  var data = req.body;
  console.log(data);
  let updatedData = {
    address: {
      building: data.Building,
      coord: [parseInt(data.Coord1), parseInt(data.Coord2)],
      street: data.Street,
      zipcode: data.Zipcode,
    },
    borough: data.Borough,
    cuisine: data.Cuisine,
    grades: [
      {
        date: data.Date,
        grade: data.Grade,
        score: data.Score,
      },
    ],
    name: data.Name,
    restaurant_id: data.Restaurant_id,
  };
  console.log(updatedData);

  let result = await db.addNewRestaurant(updatedData);

  res.send(result);
});

// create book and send back all books after creation
app.put("/api/restaurants", async (req, res) => {
  // create mongose method to update an existing record into collection

  let id = req.body._id;
  var data = {
    borough: req.body.Borough,
    cuisine: req.body.Cuisine,
    name: req.body.Name,
  };

  let result = await updateRestaurantById(data, id);
  res.send(result);
  // save the user
});

app.get("/addUpdateRestaurant", (req, res) => {
  res.send(`<form action="/update" method="post">
  
	 
	ID: <input type="text" name="_id"><br><br>
	  Borough: <input type="text" name="Borough"><br><br>
	  Cuisine: <input type="text" name="Cuisine"><br><br><br>  
	  Name: <input type="text" name="Name"><br><br>

  
	  <input type="submit" value="Submit">
	  </form>`);
});

// delete a employee by id
app.delete("/api/restaurants", async (req, res) => {
  let id = req.body._id;
  let result = await deleteRestaurantById(id);
  if (result) res.send(result);
  else res.status(404).send("Error deleting record.");
});

app.get("/deleteRestaurant", (req, res) => {
  res.send(`<form action="/delete" method="post">
  
	 
	ID: <input type="text" name="_id"><br><br>  
	  <input type="submit" value="Submit">
	  </form>`);
});

app.listen(port);
console.log("App listening on port : " + port);
