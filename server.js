// to do:
// make mysql connection
// add server and routes (all routes in server for now)

var mysql = require("mysql");
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
// mysql connection config
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todopwa",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
// end mysql config
//public folder config
app.use(express.static("public"));
// handlebars set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// end handlebars set up

// Routes
app.get("/", function(req, res){
    connection.query("SELECT * FROM todos;", function(err, todosFromDB) {
        if (err) throw err;
        console.log(todosFromDB)
        res.render("index", {todos: todosFromDB})
      });
    
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);