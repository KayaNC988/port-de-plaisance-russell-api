const { isAuthenticated } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/list', isAuthenticated, userController.getUsersPage);

router.get('/', userController.getAllUsers);

router.get('/new', isAuthenticated, userController.getNewUserForm);

router.get('/:email/edit', isAuthenticated, userController.getEditUserForm);

router.post('/:email/edit', isAuthenticated, userController.updateUserFromForm);

router.get('/:email', userController.getUserByEmail);

router.post('/', userController.createUserFromForm);

router.put('/:email', userController.updateUser);

router.delete('/:email', userController.deleteUserApi);

router.post('/:email/delete', isAuthenticated, userController.deleteUserFromForm);



module.exports = router;