const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const reservationsRoute = require('./reservations');
router.use('/:id/reservations', reservationsRoute);



router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.get('/list', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});


router.get('/new', (req, res) => {
    res.render('new-catway');
});

router.get('/:id/edit', async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.render('edit-catway', { catway });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/:id/edit', async (req, res) => {
    try {
        await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
                            {
                            catwayType: req.body.catwayType,
                            catwayState: req.body.catwayState
                            }
);
res.redirect('/catways-page');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });     

router.get('/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.render('reservations', { reservations,
                catwayNumber: req.params.id
    });
    } catch (error) {
        res.status(500).json({ message: error.message });   
        }
                                     

         });  


router.get('/:id', async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

});


router.post('/', async (req, res) => {
    try {

        const newCatway = new Catway({
            catwayNumber: req.body.catwayNumber,
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        });



        const savedCatway = await newCatway.save();

        res.redirect('/catways-page');
    } catch (error) {
        res.status(400).json({ message: error.message });

    }

});

router.put('/:id', async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        if (req.body.catwayState !== undefined) {
            catway.catwayState = req.body.catwayState;
        }

        const updatedCatway = await catway.save();
        res.json(updatedCatway);
    }   catch (error) {
        res.status(400).json({ message: error.message });
    }

});



router.post('/:id/delete', async (req, res) => {

    try {
        await Catway.findOneAndDelete({ 
            catwayNumber: req.params.id 
        });
        res.redirect('/catways-page');

    } catch (error) {
        res.status(500).json({ 
            message: error.message });
    }
});




module.exports = router