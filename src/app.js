const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const e = require("express");

const app = express();

//define paths for express config
const publibDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

////setup static direcotry to serve
///this code will find the directory and became the root
app.use(express.static(publibDirectoryPath));

//setup handlebars engine and view location
//this code use to setup handlebars for us to create dynamic templates even without exporting hbs in this file
//handlebar file is on templates/views/index.hbs
app.set("view engine", "hbs"); ///handlebars hbs...
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); ///for reusables can render in html file with syntax of ex: {{header}}

/// render() allows to render 1 of views or handlebars template
/// 1st param 'index' = index.hbs  a template inside templates/views folder
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App", ///injected object
        name: "Jordan",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Jordan",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Jordan",
        message: "This is some helpful text",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    geocode.getGeocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                return res.send({ forecastData, location });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (req.query.search === "") {
        return res.send({
            error: "You must provide a serch term",
        });
    }
    res.send({
        products: [],
    });
});


//Error Render
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Error",
        name: "Jordan",
        message: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Error",
        name: "Jordan",
        message: "Page not found",
    });
});

app.listen(3000, () => {
    //start up the server port=3000
    console.log("Server is up on port 3000");
});