const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');



router.get('/', async (req, res) => {

    try {

        const reservations = await Reservation.find();

        res.json(reservations);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});


router.get('/:id', async (req, res) => {

    try {

        const reservation = await Reservation.findById(req.params.id);



        if (!reservation) {

            return res.status(404).json({ message: 'Réservation non trouvée' });

        }



        res.json(reservation);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});




router.post('/', async (req, res) => {

    try {

        const newReservation = new Reservation({

            catwayNumber: req.body.catwayNumber,

            clientName: req.body.clientName,

            boatName: req.body.boatName,

            startDate: req.body.startDate,

            endDate: req.body.endDate

        });



        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});





router.put('/:id', async (req, res) => {

    try {

        const updatedReservation = await Reservation.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );



        if (!updatedReservation) {

            return res.status(404).json({ message: 'Réservation non trouvée' });

        }



        res.json(updatedReservation);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});





router.delete('/:id', async (req, res) => {

    try {

        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);



        if (!deletedReservation) {

            return res.status(404).json({ message: 'Réservation non trouvée' });

        }



        res.json({ message: 'Réservation supprimée', deletedReservation });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});



module.exports = router