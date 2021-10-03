// IMPORTAM:
const moment = require('moment');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');
const express = require('express');
const date = require('joi/lib/types/date');
const router = express.Router();



// RUTA 'POST('/')'
router.post('/', auth, async(req, res) => {
    // DACA ('ID CLIENT' DIN 'CORPUL RASP' NU ARE 'O VALOARE')
    // RETURNAM 'RASP.' CU STATUS '400' CU MESAJUL:
    if (!req.body.customerId) return res.status(400).send('customerId not provided.');
    if (!req.body.movieId) return res.status(400).send('movieId not provided.');


    // CAUTAM 'CUSTOMERID' & 'MOVIEID'
    Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    // DACA (NU EXISTA 'INCHIRIERE') - RETURNAM '404':
    if (!rental) return res.status(404).send('Rental.not found.');


    // DACA (DATA DE RETURNARE) ESTE DEJA SETATA - RETURNAM '400':
    if (rental.dateReturned) return res.status(400).send('Return already processed.');


    // DATA 'RETURNARII INCHIRIERI':
    rental.dateReturned = new Date();


    // 'NR. ZILELOR' DE 'INCHIRIERE':
    const rentalDays = moment().diff(rental.dateOut, 'days');

    // SETAM 'TAXA DE INCHIRIERE' PRIN BIBLIOTECA 'MOMENT'
    // CALCULAM 'NR. DE ZILE' DE LA 'DATA DE IESIRE' A 'FILMULUI':
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;


    // SALVAM 'INCHIRIEREA':
    await rental.save();


    // CAUTAM 'ID-UL FILMULUI', PE CARE IL 'UPGRADAM'
    await Movie.update({ _id: rental.movie._id }, {
        // INCREMENTAM 'NR. DE FILME' DIN 'STOC'
        $inc: { numberInStock: 1 }
    });


    // RETURNAM ' STATUS 200' & TRIMITEREA IN 'RASPUNS' A 'INCHIRIERII':
    return res.status(200).send(rental);
});


// EXPORTAM:
module.exports = router;