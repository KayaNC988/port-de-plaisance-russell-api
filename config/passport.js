const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');


function initializePassport() {
    passport.use(
    new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        console.log('EMAIL RECU:', email);
        console.log('USER TROUVE:', user ? user.email : 'Aucun utilisateur trouvé');
        console.log('HASH EN BASE DE DONNEES:', user ? user.password : 'N/A');
        console.log('PASSWORD RECU:', password);
    if (!user) {
    return done(null, false, { message: 'Utilisateur non trouvé' });
}
        const isMatch = password === user.password;
        console.log('MATCH :', isMatch);
        if (!isMatch) {
        return done(null, false, { message: 'Mot de passe incorrect' });
}

    return done(null, user);
}   catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    return done(error);
    
}
}
)
);

  passport.serializeUser((user, done) => {
     done(null, user.id);
});

   passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    done(null, user);
}   catch (error) {
    done(error);
}
   
});
}


module.exports = initializePassport;