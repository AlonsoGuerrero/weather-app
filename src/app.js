const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Alonso Guerrero",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Alonso Guerrero",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Alonso Geurrero",
    helpText: "Our engineers are working on this page",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(address, (error, { latitud, longitud, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitud, longitud, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Alonso Guerrero",
    ErrorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Alonso Guerrero",
    ErrorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
