const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
};

const esRolValidoNoRequerido = async (rol) => {
    if (rol) {
        const existeRole = await Role.findOne({ rol });
        if (!existeRole) {
            throw new Error(`El rol ${rol} no está registrado en la BD`)
        }
    }
};

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const existeUserPorId = async (id) => {
    const existeUser = await Usuario.findById(id);
    if (!existeUser) {
        throw new Error(`El id no existe ${id}`);
    }
};

module.exports = {
    esRolValido,
    emailExiste,
    existeUserPorId,
    esRolValidoNoRequerido
}