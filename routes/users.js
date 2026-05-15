const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);
}   catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.get('/new', (req, res) => {
    res.render('new-user');
});

router.get('/:email/edit', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
}
    res.render('edit-user', { user });
}   catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.post('/:email/edit', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' 
});
}
username = req.body.username;
user.email = req.body.email;
if (req.body.password) {
    user.password = req.body.password;
}   
    await user.save();
    res.redirect('/users/list');    
}   catch (error) {
    res.status(400).json({ message: error.message });
}   
});


router.get('/:email', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
}
    res.json(user);
}   catch (error) {
    res.status(500).json({ message: error.message });
}
});



router.post('/', async (req, res) => {
    try {
    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
});

    const savedUser = await newUser.save();

    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.redirect('/users/list');
}   catch (error) {
    res.status(400).json({ message: error.message });
}
});


router.put('/:email', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
}

    if (req.body.username !== undefined) {
    user.username = req.body.username;
}

    if (req.body.email !== undefined) {
    user.email = req.body.email;
}

    if (req.body.password !== undefined) {
    user.password = req.body.password;
}

    const updatedUser = await user.save();

    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.json(userResponse);
}   catch (error) {
    res.status(400).json({ message: error.message });
}
});


router.delete('/:email', async (req, res) => {
    try {
    const deletedUser = await User.findOneAndDelete({
    email: req.params.email
});
    if (!deletedUser) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
}
    res.json({ message: 'Utilisateur supprimé', deletedUser });
}   catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.post('/:email/delete', async (req, res) => {
    try {
    const deletedUser = await User.findOneAndDelete({
    email: req.params.email
});
    if (!deletedUser) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' 

    });
}
    res.redirect('/users/list');
}   catch (error) {
    res.status(500).json({ message: error.message });
}
}); 




module.exports = router;