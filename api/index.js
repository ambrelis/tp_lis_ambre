const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app  = express ();

var corsOptions = {
  origin: "http://localhost:4200", // Frontend URL - important pour credentials
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  exposedHeaders: 'Authorization',
  credentials: true // CRUCIAL pour envoyer/recevoir des cookies
};

app.use(cors(corsOptions));
app.use(cookieParser()); // Parser les cookies

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CNAM application." });
});

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes")(app);

// set port, listen for requests
// const PORT =  3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

