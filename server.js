const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport');
const path = require('path');


dotenv.config();
connectDB();
initializePassport();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


app.use('/catways', catwaysRoutes);
app.use('/catways/:id/reservations', reservationsRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/');
    }

    res.render('dashboard', {
        user: req.user,
        today: new Date().toLocaleDateString('fr-FR')
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});