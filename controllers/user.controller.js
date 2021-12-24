const { response, request} = require('express');

const userGet = (req = request, res = response) => {
    const { q, nombre = "no name", apikey, page= 1, limit } = req.query;
    res.json({
        ok: true,
        msg: 'get API',
        q,
        nombre,
        apikey
    })
};

const userPost = (req, res = response) => {
    const { nombre, edad} = req.body;
    res.json({
        ok: true,
        msg: 'post API',
        nombre,
        edad
    })
};

const userPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: 'put API',
        id
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