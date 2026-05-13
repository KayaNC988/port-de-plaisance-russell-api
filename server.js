const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport');
const path = require('path');
const methodOverride = require('method-override');




dotenv.config();
connectDB();
initializePassport();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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


app.use('/api/reservations', reservationsRoutes);
app.use('/catways', catwaysRoutes);
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

app.get('/catways-page', async (req, res) => {
    try {
        const Catway = require('./models/Catway');
        const catways = await Catway.find();
        res.render('catways', { catways 
 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

app.post('/catways/:id/delete', async (req, res) => {

    try {   
        const Catway = require('./models/Catway');
        await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        res.redirect('/catways-page');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});