const express = require('express');
const router = express.Router({ mergeParams: true });

const { isAuthenticated } = require('../middlewares/authMiddleware');
const reservationController = require('../controllers/reservationController');

router.get('/', isAuthenticated, reservationController.getReservations);
router.get('/new', isAuthenticated, reservationController.getNewReservationForm);
router.get('/:idReservation/edit', isAuthenticated, reservationController.getEditReservationForm);
router.get('/:idReservation', isAuthenticated, reservationController.getReservationDetail);

router.post('/', reservationController.createReservation);
router.post('/:idReservation', reservationController.redirectToReservationDetail);
router.put('/:idReservation', reservationController.updateReservationApi);
router.post('/:idReservation/edit', isAuthenticated, reservationController.updateReservationFromForm);
router.post('/:idReservation/delete', isAuthenticated, reservationController.deleteReservation);


module.exports = router;