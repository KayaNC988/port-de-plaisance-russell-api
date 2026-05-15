# API Port de plaisance Russell

Application web de gestion des catways et des résetrvations du port de plaisance Russell

## Technologies utilisées 

- Node.js
- Express.js
- MongoDB 
- Mongoose
- EJS 
- Passport.js
- CSS

## Installation 

'''bash
npm install
'''

## Lancement du projet 

'''txt
http://localhost:3000
'''

## Authentification

'''txt
POST/login
GET/logout
'''

## Routes Catways 

```txt
GET /catways
GET /catways/:id
POST /catways
PUT /catways/:id
DELETE /catways/:id
```

## Routes Réservations

```txt
GET /catways/:id/reservations
GET /catways/:id/reservations/:idReservation
POST /catways/:id/reservations
PUT /catways/:id/reservations/:idReservation
DELETE /catways/:id/reservations/:idReservation
```

## Routes Utilisateurs

```txt
GET /users
GET /users/:email
POST /users
PUT /users/:email
DELETE /users/:email
```

## Base de données

Collections utilisées :

- users
- catways
- reservations

## Auteur

Projet réalisé dans le cadre de la formation développeur web.