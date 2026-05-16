const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const catwayController = require('../controllers/catwayController');
const reservationsRoute = require('./reservations');

router.use('/:id/reservations', reservationsRoute);

router.get('/', catwayController.getAllCatwaysApi);
router.get('/list', isAuthenticated, catwayController.getCatwaysPage);
router.get('/new', isAuthenticated, catwayController.getNewCatwayForm);
router.get('/:id/edit', isAuthenticated, catwayController.getEditCatwayForm);
router.post('/:id/edit', isAuthenticated, catwayController.updateCatwayFromForm);
router.get('/:id/reservations', isAuthenticated, catwayController.getCatwayReservations);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatwayApi);
router.delete('/:id/delete', catwayController.deleteCatway);

module.exports = router;