module.exports = {
    // JWT Configuration - Bonnes pratiques pour l'Exercice 06
    JWT_SECRET: process.env.JWT_SECRET || "EMMA123_SUPER_SECRET_KEY_CHANGE_IN_PRODUCTION",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "EMMA123_REFRESH_SECRET_KEY",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    
    // Legacy
    ACCESS_TOKEN_SECRET: "EMMA123",
    
    // Database
    BDD: {
        "host": "dpg-d4m4it7pm1nc73cmqk6g-a.oregon-postgres.render.com",
        "port": "5432",
        "user": "pollution2_user",
        "password": "unoEPx4z0GvY1lz3fIcefeeWRHyQ1wpj",
        "bdname": "pollution2"
    }
}

