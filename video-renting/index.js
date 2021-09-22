// (IMP-11 IMPORTAREA  MODULULUI 'EXPRESS-ASYNC-ERRORS':
require('express-async-errors');

// (IMP-12 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');

// (IMP-10) IMPORTAREA  MODULULUI 'ERROR':
const error = require('./middleware/error');

// (IMP-9) IMPORTAREA  MODULULUI 'CONFIG':
const config = require('config');

// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// (IMP-8) IMPORTAREA 'JOI-OBJECTID'
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const genuri = require('./routes/genuri');
const clienti = require('./routes/clienti');
const filme = require('./routes/filme');
const inchirieri = require('./routes/inchirieri');
const utilizatori = require('./routes/utilizatori');
const autentificare = require('./routes/autentificare');
const express = require('express');
const app = express();




// APELAREA 'WINSTON'
//'TRANSPORT' PT 'INREGISTRAREA MESAJELOR' INTR-UN 'FISIER':
winston.add(winston.transports.File, { filename: 'logfile.log' });



// ____________________________________________________________________________
// CONDITIE:
if (!config.get('cheiaPrivataJWT')) {

    // AFISAREA 'ERORI':
    console.error('EROARE FATALA: cheiaPrivataJWT nu este definita.');

    // IESIREA DIN OBIECTUL GLOBAL - 'PROCESS'
    // MET. 'EXIT(0 = SUCCES, ALT_NR = ESEC)':
    process.exit(1);
}




// ____________________________________________________________________________
// CONECTAREA  LA  'BAZA DE DATE' - 'MONGODB':
mongoose.connect('mongodb://localhost/video-renting')
    // 'PROMISIUNEA' - IN 'CAZ DE SUCCES':
    .then(() => console.log('Conectat cu succes la Baza de Date MongoDB'))
    // 'PROMISIUNEA' - IN 'CAZ DE EROARE':
    .catch(err => console.error('Nu s-a putut conecta la MongoDB.'));




// ____________________________________________________________________________
// UTILIZARE
app.use(express.json());

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/GENURI' -> CATRE RUTA 'GENYRI'
app.use('/api/genuri', genuri);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/CLIENTI' -> CATRE RUTA 'CLIENTI'
app.use('/api/clienti', clienti);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/FILME' -> CATRE RUTA 'FILME'
app.use('/api/filme', filme);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/INCHIRIERI' -> CATRE RUTA 'INCHIRIERI'
app.use('/api/inchirieri', inchirieri);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/UTILIZATORI' -> CATRE RUTA 'UTILIZATORI'
app.use('/api/utilizatori', utilizatori);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/AUTENTIFICARE' -> CATRE RUTA 'AUTENTIFICARE'
app.use('/api/autentificare', autentificare);


// ____________________________________________________________________________
// UTILIZAREA - FUNC 'MIDDLEWARE ERROR' PRIN 'REFERINTA':
app.use(error);







// ____________________________________________________________________________
// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;


// ____________________________________________________________________________
// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
app.listen(port, () => {
    // 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    console.log(`Port de Ascultare ${port}...`);
});