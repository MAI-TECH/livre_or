const { response } = require("express");
//  Modules
const express = require("express");
const session = require("express-session");
const { request } = require("http");


//  Vatriables
const app = express();

//  Template
app.set("view engine", "ejs");
app.set("trust proxy", 1)

//  Middleware
app.use(express.json());
app.use("/assets", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "$2y$12$OCu861NixlpTdrF.7wJAouCy08QvEbevMDb/1F5QEXkWlUEyvA7DG", resave: false, saveUninitialized: true, cookie: { secure: false } }))
app.use(require("./middlewares/flash"));

//  Routes
app.get("/", (request, response) => {
    let Message = require("./models/message");
    Message.all((messages) => {

    response.render("pages/index", {messages : messages});
    });
});

app.get("/message/:id", (request, response) => {
    let Message = require("./models/message");
    Message.find(request.params.id, (message) => {
        response.render("messages/show", {message : message});
    })
})

app.post("/", (request, response) => {
    if (request.body.message === undefined || request.body.message === "") {
        request.flash("error", "Vous n'avez pas postez de message :(");
        response.redirect("/");
    }
    else {
        let Message = require("./models/message");
        Message.create(request.body.message, () => {
            request.flash("success", "merci !");
            response.redirect("/");
        })
    }
});


//  launch the server
app.listen(8080);