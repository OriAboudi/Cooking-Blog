const indexR = require("./index"); // create index route
const usersR = require("./users"); // create index users
const recipesR = require("./recipes"); // create recipes index route
const categoriesR = require("./categories"); // create categories index route
const commentsR = require("./comments"); // create comments index route
const ratingR = require("./rating"); // create rating index route

exports.routesInit = (app) => { // create a function for using routes on the app 
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/recipes", recipesR);
    app.use("/categories", categoriesR);
    app.use("/comments", commentsR);
    app.use("/rating", ratingR);


    // If you are writing a rout or a file that does not exist in Public
    // that will display error 404 
    app.use((req, res) => {
        res.status(404).json({ msg_error: "Url not found, 404!" });
    })
}



