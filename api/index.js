const express = require("express");
const cors = require("cors");
const app = express();

// 👇 CONFIGURATION CORS "OPEN BAR"
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CNAM application." });
});

const db = require("./models");

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Base de données synchronisée (ALTER) !");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/pollution.routes.js")(app); // J'ai mis le chemin explicite pour être sûr

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT}.);
});
