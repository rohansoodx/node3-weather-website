const express = require("express"); //express is a function
const path = require("path");
const hbs = require("hbs"); //for using partials
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express(); //express returns an app object
const port = process.env.PORT || 3000;

/*
console.log(__dirname); //path to the where the script lives
console.log(__filename); //path to where the script lives, including the script itself
*/

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public"); //points to public directory now
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//in app settings, tell express we want to use hbs. So we setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // telling express where to look for views by giving it a custom path
hbs.registerPartials(partialsPath);

//--------------------setup static directory to serve
app.use(express.static(publicDirectoryPath)); //express can now serve static assets

/*
//Now this will not run becuase first it goes to the static folder, finds index.html (by default points to/) and it will run that 
app.get("/", (req, res) => {
  res.send("<h1>Hello!!!</h1>");
});
*/

/*
Shifted to public as static assets
app.get("/help", (req, res) => {
  res.send([
    {
      name: "Rohan",
      age: 27
    },
    {
      name: "Sood",
      age: 27
    }
  ]);
});

app.get("/about", (req, res) => {
  res.send("<h1>Hello From About</h1>");
});
*/

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rohan"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rohan Sood"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Some helpful text",
    title: "Help",
    name: "Rohan Sood"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    //we use this return pattern instead of else
    return res.send({
      error: "Provide the address in query parameters"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error }); // shorthand version --> destructuring
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location, //shorthand version
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Rohan Sood",
    title: "404 Page",
    errorMessage: "Help Article Not Found!"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "Rohan Sood",
    title: "404 Page",
    errorMessage: "Page Not Found!"
  });
});

app.listen(port, () => {
  console.log("This method is called when the server starts! On: " + port);
});
