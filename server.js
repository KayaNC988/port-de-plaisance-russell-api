const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport');


dotenv.config();
connectDB();
initializePassport();

const app = express();


const indexRoutes = require('./routes/index');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());

app.use(session({
    secret: 'monsecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/catways', catwaysRoutes);
app.use('/catways/:id/reservations', reservationsRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});