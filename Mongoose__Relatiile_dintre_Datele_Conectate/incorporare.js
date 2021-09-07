// ==============================================================
// (0) INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');



// ==============================================================
// (1) CREAREA & CONECTAREA LA BAZA DE DATE 'LOC DE JOACA' - 'LOC DE JOACA')
//     PRIN MET. 'CONNECT()' (CARE RETURNEAZA 'PROMISIUNI')
mongoose.connect('mongodb://localhost/incorporare-matrice-subdocumente')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB ...', err));



// ==============================================================
// (2.1.1) SCHEMA 'AUTOR'  
const schemaAutor = new mongoose.Schema({
    nume: String,
    biografie: String,
    website: String
});



// ==============================================================
// (2.1.2) MODELUL 'AUTOR' CU 'SCHEMA'  
const Autor = mongoose.model('Autor', schemaAutor);



// ==============================================================
// (2.2) MODELUL 'CURS' CU 'SCHEMA'  
const Curs = mongoose.model('Curs', new mongoose.Schema({
    nume: String,
    // INCORPORAREA 'MATRICEI DE SUB-DOCUMENTE':
    autori: [schemaAutor]
}));







// ==============================================================
// (3.1) FUNC. ASINCRONE 'CREARECURS()' 
//       (PT. CREAREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
// async function creareCurs(nume, autori) {
//     // CREAREA OBIECTULUI 'CURS' (INSTANTA A CLASEI):
//     const curs = new Curs({
//         nume,
//         autori
//     });

//     // SALVAREA OBIECTULUI 'CURS' IN 'BAZA DE DATE' - IN 'REZULTAT'
//     // PRIN MET. 'SAVE()' -> CARE  RETURNEAZA O 'PROMISIUNE':
//     // 'OPERATII  ASINCRONE & ASTEPTARE'
//     const rezultat = await curs.save();

// AFISARE 'REZULTAT':
//     console.log(rezultat);
// }







// ==============================================================
// (3.2) FUNC. ASINCRONE 'LISTACURSURI()' 
//       (PT. CITIREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
// async function listaCursuri() {
//     const cursuri = await Curs
//         // MET. FIND - PRELUAREA 'CURSURILOR'  
//         .find();


// AFISARE 'CURSURI':
//     console.log(cursuri);
// }







// ==============================================================
// (3.3) FUNC. ASINCRONE 'UPGRADAREAUTOR()' 
//       (PT. UPGRADAREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
// async function upgradareAutor(idCurs) {
//     // GASIREA 'CURSULUI' DUPA 'ID':
// const curs = await Curs.findById(idCurs);

// UPGRADAREA DIRECTA A 'OBIECTULUI DE INTEROGARE'
//     const curs = await Curs.update({ _id: idCurs }, {
// OPERATORUL '$SET':
// $set: {
// UPGRADAREA 'NUMELUI AUTORULUI' UNUI 'CURS':
//     'autor.nume': 'Jeanine Alexandra'
// }

//         // STERGEREA 'SUBDOCUMENTULUI' - PRIN OPERATORUL '$UNSET'
//         $unset: {
// UPGRADAREA 'NUMELUI AUTORULUI' UNUI 'CURS':
// 'autor.nume': ''
//             'autor': ''
//         }
//     });

// MODIFICAM 'NUMELE  AUTORULUI':
// curs.autor.nume = 'Marius Chivu';

// SALVAM IN 'CURS':
// curs.save();
// }



// ==============================================================
// (3.4) FUNC. ASINCRONE 'ADAUGAAUTOR()' 
//       (PT. CREAREA 'DOCUMENTELOR NOI' IN 'MONGODB')
// ==============================================================
async function adaugaAutor(idCurs, autor) {
    // GASIREA 'CURSULUI' DUPA 'ID':
    const curs = await Curs.findById(idCurs);

    // MET. 'PUSH()' - PT. ADAUGAREA 'AUTORULUI' IN 'MATRICE':
    curs.autori.push(autor);

    // SALVAREA IN 'DB' A 'CURSULUI':
    curs.save();
}






// ==============================================================
// (3.5) FUNC. ASINCRONE 'STERGEAUTOR()' 
//       (PT. CSTERGEREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function stergeAutor(idCurs, idAutor) {
    // GASIREA 'CURSULUI' DUPA 'ID':
    const curs = await Curs.findById(idCurs);

    // MET. 'ID()' - PT. CAUTAREA 'OBIECTULUI COPIL' DUPA 'ID'-UL SAU:
    const autor = curs.autori.id(idAutor);

    // APELAREA METODEI 'REMOVE()' PE OBIECTUL 'AUTOR':
    autor.remove();

    // SALVAREA IN 'DB' A 'CURSULUI':
    curs.save();
}







// ==============================================================
// (4.1.1) APELARE FUNC. 'CREARECURS()' 
// ==============================================================
// creareCurs('Curs Node', new Autor({ nume: 'Marius' }));


// ==============================================================
// (4.1.2) APELARE FUNC. 'CREARECURS()'CU 'MATRICE DE SUB-DOCUMENTE':
// ==============================================================
// creareCurs('Curs Node', [
//     new Autor({ nume: 'Marius' }),
//     new Autor({ nume: 'Nicholas' })
// ]);



// ==============================================================
// (4.2) APELARE FUNC. 'UPGRADAREAUTOR('ID')' 
// ==============================================================
// upgradareAutor('6137294c1853c624783b0bd8');



// ==============================================================
// (4.3 APELARE FUNC. 'ADAUGAAUTOR('ID')' 
// ==============================================================
// adaugaAutor('6137601cd2ff8005f8f0b8ce', new Autor({ nume: 'Aurel' }));


// ==============================================================
// (4.4 APELARE FUNC. 'STERGEAUTOR('ID DOC', 'ID AUTOR')' 
// ==============================================================
stergeAutor('6137601cd2ff8005f8f0b8ce', '613766d7c13c7d2818b0604e');