const db = require("../../models/index");

class Conection {
  
    // Esta clase realiza la autenticación a la base de datos
    // Tambien cierra la conexion
    async autenticate(){
       
        await db.sequelize.authenticate()
        .then(()=>{
            console.log("Autenticado");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    async close(){
        await db.sequelize.close();
    }

    getDb(){
        return this.db;
    }
}

module.exports = Conection;
