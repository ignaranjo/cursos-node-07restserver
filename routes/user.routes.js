const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar.campos');
const { esRolValido, emailExiste, existeUserPorId, esRolValidoNoRequerido } = require('../helpers/db-validators');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], userPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUserPorId ),
    check('rol').custom( esRolValidoNoRequerido ),
    validarCampos
], userPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUserPorId ),
    validarCampos
], userDelete);

router.patch('/', userPatch);

module.exports = router;