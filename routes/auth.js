const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
    return res.redirect('/');
}
    if (!user) {
    return res.redirect('/');
}
    req.logIn(user, (error) => {
    if (error) {
    return res.redirect('/');
}
    return res.redirect('/dashboard');
});

 })(req, res, next);

});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);   
        }
        res.redirect('/');
    });
});

router.get('/profile', (req, res) => {
   if (!req.isAuthenticated()) {
   return res.status(401).json({ message: 'Non authentifié' });
}

    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      
    });
});


module.exports = router;