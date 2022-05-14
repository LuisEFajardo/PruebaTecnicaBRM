const {response} = require('express');
const {validationResult} = require('express-validator');

const validateRequest = (req, res = response, next) =>{

    // esta funcion se ejecuta si el check del middleware de la ruta no se ha cumplido
    // envia una respuesta al cliente con el detalle del error
    // si no se encuentra ningun error pasa a la siguiente validacion con el metodo next

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    next();

}

module.exports = {
    validateRequest,
}