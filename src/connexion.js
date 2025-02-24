import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { existsSync } from 'fs';

// Vérification de l'existence de la base de données
const FILE_EXISTS = existsSync(process.env.DB_FILE);

const createDatabase = async (promessConnexion) => {
    let connexion = await promessConnexion;
    console.log("Création de la base de données...");
    await connexion.exec(
        `CREATE TABLE IF NOT EXISTS tache
        (
            id_tache INTEGER PRIMARY KEY,
            texte TEXT NOT NULL,
            est_coche INTEGER NOT NULL
        );`
    );
    // creation de la table

    await connexion.exec(
        `INSERT INTO tache (texte, est_coche) VALUES
        ('Fait tes devoirs ce soir', 0),
        ('Fait ta lessive', 0),
        ('Ce couche', 0),
        ('Fait ta priere', 0);`
    );
    return connexion;
};

let promessConnexion = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

const checkAndCreateTable = async () => {
    let connexion = await promessConnexion;
    const tableExists = await connexion.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='tache'`);
    if (!tableExists) {
        console.log("Table 'tache' non trouvée, création de la table...");
        await createDatabase(promessConnexion);
    } else {
        console.log("Table 'tache' existe déjà.");
    }
};

if (!FILE_EXISTS) {
    promessConnexion = createDatabase(promessConnexion);
    console.log("Base de données créée car elle n'existait pas.");
} else {
    console.log("Base de données existante trouvée.");
    checkAndCreateTable();
}

export { promessConnexion };
