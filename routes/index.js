const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('API Port de plaisance Russell');
});

module.exports = router;