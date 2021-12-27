const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = (req = request, res = response) => {
    const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
    res.json({
        ok: true,
        msg: 'get API',
        q,
        nombre,
        apikey
    })
};

const userPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //verificar si el correo existe

    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en la BD
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post API',
        usuario
    })
};

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id,  password, google, correo, ...rest } = req.body;

    //TODO: validar contra bd
    if (password) {
        //Encriptar la password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await Usuario.findByIdAndUpdate( id, rest );

    res.json({
        ok: true,
        msg: 'put API',
        userDB
    })
};

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API'
    })
}

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete API'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};