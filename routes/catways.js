const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const catwayController = require('../controllers/catwayController');
const reservationsRoute = require('./reservations');

router.use('/:id/reservations', reservationsRoute);

router.get('/', catwayController.getAllCatwaysApi);
router.get('/list', catwayController.getCatwaysPage);
router.get('/new', catwayController.getNewCatwayForm);
router.get('/:id/edit', catwayController.getEditCatwayForm);
router.post('/:id/edit', catwayController.updateCatwayFromForm);
router.get('/:id/reservations', catwayController.getCatwayReservations);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatwayApi);
router.delete('/:id/delete', catwayController.deleteCatway);

module.exports = router;