const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');



router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


router.get('/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
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

        res.status(201).json(savedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }

});

router.put('/:id', async (req, res) => {
    try {
        const updatedCatway = await Catway.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );



        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }



        res.json(updatedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.delete('/:id', async (req, res) => {

    try {
        const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
        if (!deletedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });

        }

        res.json({ message: 'Catway supprimé', deletedCatway });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



module.exports = router