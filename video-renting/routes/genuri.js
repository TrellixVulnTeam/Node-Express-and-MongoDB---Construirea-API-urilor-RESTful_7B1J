// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-5) IMPORTAREA 'MIDDLEWARE/AUTORIZARE.JS'
const autorizare = require('../middleware/autorizare');

// ____________________________________________________________________________
// (IMP-6) IMPORTAREA 'MIDDLEWARE/ADMINISTRATOR.JS'
const administrator = require('../middleware/administrator');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/GEN.JS'  
//         (RETURNEAZA '.Gen' SI '.validare')
const { Gen, validare } = require('../models/gen');

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
// RUTA 1.1: '/'
// 'CITIREA' PRIN  MET. 'GET()':
// ____________________________________________________________________________
router.get('/', async(req, res) => {

    // BLOCURILE DE INCERCARI 'TRY{} & CATCH{}':
    try {
        // RETURNAREA 'PROMISIUNI' - 'GENURI' & 'SORTARE' DUPA 'NUME':
        const genuri = await Gen.find().sort('nume');

        // RETURNAM 'RASPUNSULUI' CATRE 'GENuri'
        res.send(genuri);

    } catch (exception) {

        // RETURNAM 'RASPUNSULUI' CATRE 'GENuri'
        // EROAREA '500' - 'EROARE INTERNA DE  SERVER'
        res.status(500).send('Ceva a eșuat.');
    }
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 2: POST('/', MIDDLEWARE, ROITE_HANDLER)
// 'CREAREA' PRIN MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.post('/', autorizare, async(req, res) => {

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validare(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // CREARE OBIECTUL 'GEN':
    let gen = new Gen({ nume: req.body.nume });


    //     // ADAUGAM OBIECTUL 'CURS' -> IN MATRICEA 'CURSURI':
    // SALVAREA IN BAZA DE DATE:
    gen = await gen.save();

    // RETURNAM 'RASPUNSULUI' CATRE 'GEN'
    res.send(gen);
});
// ____________________________________________________________________________








// ____________________________________________________________________________
// RUTA 3: '/:ID'
// 'UPGRADARE' PRIN MET. 'PUT(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.put('/:id', async(req, res) => {
    const { error } = validare(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    //  LOGICA:  DACAGASIREA 'GENULUI':
    const gen = await Gen.findByIdAndUpdate(req.params.id, { nume: req.body.nume }, {
        new: true
    });

    // LOGICA: DACA 'CURSUL NU EXISTA' -> RETURNAM '404' (RESURSA NU A FOST GASITA)
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen) return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');

    // RETURNAM 'RASPUNSULUI' CATRE 'GEN'
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 4: '/:ID'
// 'STERGEREA' PRIN MET. 'DELETE(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.delete('/:id', [autorizare, administrator], async(req, res) => {

    // 'GASIREA & STERGEREA' DUPA 'ID':
    const gen = await Gen.findByIdAndRemove(req.params.id);


    // LOGICA '1.2': DACA 'ELEMENTUL CAUTAT' NU EXISTA - RETURNAM EROAREA '404'
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen)
        return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');


    // RETURNAM 'RASPUNSULUI' CATRE 'GEN'
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 1.2: '/:ID' 
// 'CITIREA' PRIN MET. 'GET()'
// ____________________________________________________________________________
router.get('/:id', async(req, res) => {

    // GASIREA UNUI SINGUR GEN DUPA ID:
    const gen = await Gen.findById(req.params.id);

    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen) return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');
    // RETURNAM 'RASPUNSULUI' CATRE 'GEN'
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// EXPORTARE 'ROUTER'
// ____________________________________________________________________________
module.exports = router;