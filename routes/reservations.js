const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getReservations);
router.get('/new', reservationController.getNewReservationForm);
router.get('/:idReservation/edit', reservationController.getEditReservationForm);
router.get('/:idReservation', reservationController.getReservationDetail);

router.post('/', reservationController.createReservation);
router.post('/:idReservation', reservationController.redirectToReservationDetail);
router.put('/:idReservation', reservationController.updateReservationApi);
router.post('/:idReservation/edit', reservationController.updateReservationFromForm);
router.post('/:idReservation/delete', reservationController.deleteReservation);


module.exports = router;