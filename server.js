const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();

const indexRoutes = require('./routes/index');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/users');

app.use(express.json());

app.use('/', indexRoutes);
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/users', usersRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});