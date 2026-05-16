const User = require('../models/User');

exports.getUsersPage = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNewUserForm = (req, res) => {
    res.render('new-user');
};

exports.getEditUserForm = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.render('edit-user', { user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserFromForm = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        user.username = req.body.username;
        user.email = req.body.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();

        res.redirect('/users/list');

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUserFromForm = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        res.redirect('/users/list');

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
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

        res.json(updatedUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUserApi = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({
            email: req.params.email
        });

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({
            message: 'Utilisateur supprimé',
            deletedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUserFromForm = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({
            email: req.params.email
        });

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.redirect('/users/list');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};