const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/Reservation');
const passport = require('passport');



router.get('/', async (req, res) => {

  try {
    const reservations = await Reservation.find({
     catwayNumber: Number(req.params.id)
});
     res.render('reservations', { reservations,
     catwayNumber: req.params.id
}); 
}    catch (error) {
     res.status(500).json({ message: error.message });
}
});

router.get('/new', (req, res) => {
    res.render('new-reservation', { catwayNumber: req.params.id });
});

router.get('/:idReservation/edit', async (req, res) => {
    try {
    const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: Number(req.params.id)
});
    if (!reservation) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
}
    res.render('edit-reservation', { reservation, catwayNumber: req.params.id });
}    catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.get('/:idReservation', async (req, res) => {
    try {
    const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: Number(req.params.id)
});

    if (!reservation) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
}
    res.json(reservation);
}    catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.post('/:idReservation', async (req, res) => {
    try {
    const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: Number(req.params.id)
});
res.redirect(`/catways/${req.params.id}/reservations/${req.params.idReservation}`);
}    catch (error) {
    res.status(500).json({ message: error.message });
}   
});



router.post('/', async (req, res) => {

    try {
    const newReservation = new Reservation({
        catwayNumber: Number(req.params.id),
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
});
         await newReservation.save();

const savedReservation = await newReservation.save();
    res.redirect(`/catways/${req.params.id}/reservations/${savedReservation._id}`);
}   catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:idReservation', async (req, res) => {
   try {
   const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: Number(req.params.id)
});

    if (!reservation) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
}
    if (req.body.clientName !== undefined) {
    reservation.clientName = req.body.clientName;
}
    if (req.body.boatName !== undefined) {
    reservation.boatName = req.body.boatName;
}
    if (req.body.startDate !== undefined) {
    reservation.startDate = req.body.startDate;
}
    if (req.body.endDate !== undefined) {
    reservation.endDate = req.body.endDate;
}

   const updatedReservation = await reservation.save();
   res.redirect(`/catways/${req.params.id}/reservations/${updatedReservation._id}`);
}  catch (error) {
   res.status(400).json({ message: error.message });
}
});

router.post('/:idReservation/edit', async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: Number(req.params.id)
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        reservation.clientName = req.body.clientName;
        reservation.boatName = req.body.boatName;
        reservation.startDate = req.body.startDate;
        reservation.endDate = req.body.endDate;

        await reservation.save();
        res.redirect(`/catways/${req.params.id}/reservations`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:idReservation/delete', async (req, res) => {
    try {
        const deletedReservation = await Reservation.findOneAndDelete({
            _id: req.params.idReservation,
            catwayNumber: Number(req.params.id)
        });

        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.redirect(`/catways/${req.params.id}/reservations`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;