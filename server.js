const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jsxEngine = require("jsx-view-engine");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

// const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const Fruit = require("./models/fruits");
const Vegetable = require("./models/vegetables");

const vegetables = require("./models/vegetables.js");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());
app.use(methodOverride("_method"));

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// index, new, delete. Update, create, edit. And show.

// seed route
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

app.get("/vegetables/seed", async (req, res) => {
  try {
    await Vegetable.create([
      {
        name: "tomato",
        color: "red",
        readyToEat: true,
      },
      {
        name: "pepper",
        color: "yellow",
        readyToEat: false,
      },
      {
        name: "carrot",
        color: "orange",
        readyToEat: true,
      },
      {
        name: "zucchini",
        color: "green",
        readyToEat: false,
      },
      {
        name: "cabbage",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/vegetables");
  } catch (error) {
    console.error(error);
  }
});

app.get("/fruits/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", {
      fruits: fruits,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/vegetables/", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", {
      vegetables: vegetables,
    });
  } catch (error) {
    console.log(error);
  }
});

// new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// delete
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits"); //redirect back to fruits index
  } catch (error) {
    console.log(error);
  }
});

app.delete("/vegetables/:id", async (req, res) => {
  try {
    await Vegetable.findByIdAndRemove(req.params.id);
    res.redirect("/vegetables");
  } catch (error) {
    console.log(error);
  }
});

// update
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

app.put("/vegetables/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Vegetable.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/vegetables");
  } catch (error) {
    console.log(error);
  }
});

// create
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.create(req.body);
    // res.send(createdFruit);
    res.redirect("/fruits"); //send the user back to /fruits
  } catch (error) {
    console.log(error);
  }
});

app.post("/vegetables", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Vegetable.create(req.body);
    res.redirect("/vegetables");
  } catch (error) {
    console.log(error);
  }
});

// edit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (error) {
    console.log(error);
  }
});

app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVegi = await Vegetable.findById(req.params.id);
    res.render("vegetables/Edit", { vegetable: foundVegi });
  } catch (error) {
    console.log(error);
  }
});

//add show route
app.get("/fruits/:indexOfFruitsArray", async (req, res) => {
  console.log(req.params.indexOfFruitsArray);
  try {
    const fruit = await Fruit.findById(req.params.indexOfFruitsArray);
    res.render("fruits/Show", {
      fruit: fruit,
    });
  } catch (error) {}
  // res.send(fruits[req.params.indexOfFruitsArray]);
});

app.get("/vegetables/:indexOfVegetablesArray", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.indexOfVegetablesArray);
    res.render("vegetables/Show", {
      vegetable: vegetable,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log("listening");
});

// URL	HTTP Verb	Action	Used For	Mongoose Model Function
// /things/	GET	index	Displaying a list of all things	.find
// /things/new	GET	new	Display HTML form for creating a new thing	N/A
// /things	POST	create	Create a new thing	.create
// /things/:id	GET	show	Display a specific thing	.findById
// /things/:id/edit	GET	edit	Return an HTML form for editing a thing	.findById
// /things/:id	PATCH/PUT	update	Update a specific thing	.findByIdAndUpdate
// /things/:id	DELETE	destroy	Delete a specific thing	.findByIdAndDelete
