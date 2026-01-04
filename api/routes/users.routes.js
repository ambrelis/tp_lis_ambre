module.exports = app => {
    const users = require("../controllers/users.controllers.js");
    const { authenticateToken, authorizeRoles } = require("../middleware/auth.middleware");
  
    var router = require("express").Router();

    // GET /api/users → Liste des utilisateurs (PUBLIC ou PROTÉGÉ selon besoins)
    router.get("/", users.getAll);
    
    // POST /api/users → Créer un utilisateur (PROTÉGÉ - admin uniquement)
    router.post("/", authenticateToken, authorizeRoles('admin'), users.create);

    app.use('/api/users/', router);
};
