const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/list', userController.getUsersPage);

router.get('/', userController.getAllUsers);

router.get('/new', userController.getNewUserForm);

router.get('/:email/edit', userController.getEditUserForm);

router.post('/:email/edit', userController.updateUserFromForm);

router.get('/:email', userController.getUserByEmail);

router.post('/', userController.createUserFromForm);

router.put('/:email', userController.updateUser);

router.delete('/:email', userController.deleteUserApi);

router.post('/:email/delete', userController.deleteUserFromForm);



module.exports = router;