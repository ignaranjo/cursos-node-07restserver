const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //agregar validacion de si es un number


    /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit));

    const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
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

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    //TODO: validar contra bd
    if (password) {
        //Encriptar la password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await Usuario.findByIdAndUpdate(id, rest);

    res.json(userDB);
};

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API'
    })
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    //borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json(usuario)
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};