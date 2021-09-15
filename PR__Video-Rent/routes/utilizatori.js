// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/UTILIZATOR.JS'  
//         (RETURNEAZA '.Utilizator' SI '.validare')
const { Utilizator, validare } = require('../models/utilizator');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.ROUTER()'
const router = express.Router();







// ____________________________________________________________________________
// RUTA 1: POST('/')
// PT. 'CREAREA UTILIZATORILOR, INREGISTRAREA':
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // VALIDAREA 1:
    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validare(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);


    // VALIDAREA 2:
    // NE ASIGURAM CA 'UTILIZATORUL' NU ESTE 'DEJA INREGISTRAT'
    // CARE VA RETURNEAZA O 'PROMISIUNE' - PE CARE O 'AWAYT': 
    let utilizator = await Utilizator.findOne({ email: req.body.email });

    // DACA 'UTILIZATORUL EXISTA' IN 'BAZA DE DATE'
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
    if (utilizator) return res.status(400).send('Utilizator deja înregistrat.');


    // RESETAREA - OBIECTULUI 'UTILIZATOR':
    utilizator = new Utilizator({
        nume: req.body.nume,
        email: req.body.email,
        parola: req.body.parola
    });

    // SALVAREA 'UTILIZATORULUI' IN 'BAZA DE DATE'
    await utilizator.save();


    // RETURNAM 'RASPUNSULUI' - 'UTILIZATOR' CATRE 'CLIENT'
    res.send(utilizator);
});
// ____________________________________________________________________________




// ____________________________________________________________________________
// EXPORTARE 'ROUTER'
// ____________________________________________________________________________
module.exports = router;