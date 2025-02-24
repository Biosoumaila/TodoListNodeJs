import "dotenv/config";
import express, { json, response } from "express";
import { engine } from 'express-handlebars';
import { recupererTaches_bd, terminerTaches_bd, ajouterTaches_bd } from "./src/fonctionsource.js";


const app = express();// creation de notre application express

app.engine('handlebars', engine()); //installation de handlebars

app.set('view engine', 'handlebars');// utilisation de handlebar pour voir a l'ecran du client

app.set('views', './views');//configuration du repertoire a utiliser pour obtenir les templates handlebar

// ajout des midleware
app.use(json());

// indication du dossier public
app.use(express.static('public'));

// creation d'une route
app.get('/', async (request, response) => {

    response.render('taches', {
        titre: "VOS TACHES",
        styles: ['/css/tache.css'],
        scripts: ['/js/client.js'],
        taches: await recupererTaches_bd()
    });// dans la tache tu me genere la tache
    // console.log("serveur demarrer");
});

app.patch('/api/tache', async (request, response) => {
    console.log('requete recu');
    await terminerTaches_bd(request.body.id);
    console.log(request.body.id);
    response.status(200).json({
        id: request.body.id
    }); // si la requete est bonne tuu envoie le resultat du code 200
})

app.post('/api/tache', async (request, response) => {
    console.log(request.body.texte);
    await ajouterTaches_bd(request.body.texte);

    // console.log('requete recu');//Pour voir si la requete marche
    // response.status(201).json({ id: id });
    response.status(201).end();

})

// demmarrer le serveur et mise a l'ecoute

if (process.env.NODE_ENV === 'developpement') {
    app.listen(process.env.PORT);

    console.log(
        "l\application est a l'ecoute  http://localhost:" + process.env.PORT);
}




