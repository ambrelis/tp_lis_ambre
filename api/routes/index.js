module.exports = app => {  
  require("./pollution.routes")(app);
  require("./users.routes")(app);
  require("./auth.routes")(app);
}
