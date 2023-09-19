const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const vegetables = require("./models/vegetables.js");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// index, new, delete. Update, create, edit. And show.

app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/Index", { fruits: fruits });
});

app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

// new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// delete

// update

// create
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  res.redirect('/fruits'); //send the user back to /fruits
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  vegetables.push(req.body);
  res.redirect('/vegetables');
});

//add show route
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});

app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.indexOfVegetablesArray],
  });
});

app.listen(3000, () => {
  console.log("listening");
});
