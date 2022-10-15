const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
let db;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

function passwordProtected(req, res, next) {
  res.set("WWW-Authenticate", "Basic realm='Our MERN App'");
  if (req.headers.authorization === "Basic YWRtaW46YWRtaW4=") {
    next();
  } else {
    console.log(req.headers.authorization);
    res.status(401).send("try again");
  }
}

app.get("/", async (req, res) => {
  const allWorkouts = await db.collection("workouts").find().toArray();
  console.log(allWorkouts);
  res.render("home", { allWorkouts });
});

app.use(passwordProtected);

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/api/workouts", async (req, res) => {
  const allWorkouts = await db.collection("workouts").find().toArray();
  res.json(allWorkouts);
});

app.post("/create-animal"),
  async (req, res) => {
    console.log(req.body);
    res.send("thanks!");
  };

async function start() {
  const client = new MongoClient(
    "mongodb://root:root@localhost:27017/mernapp?&authSource=admin"
  );
  await client.connect();
  db = client.db();
  app.listen("3000");
}
start();

// npm start - Start server
// docker compose start - Start docker
// docker compose stop - Stop docker
