import { promessConnexion } from "./connexion.js";

export const recupererTaches_bd = async () => {
    let connexion = await promessConnexion;
    let result = await connexion.all(`SELECT * FROM tache`);

    // Supposons que vous voulez retourner toutes les tâches.
    return result;
}

export const ajouterTaches_bd = async (texte) => {
    let connexion = await promessConnexion;
    let result = await connexion.run('INSERT INTO tache (texte, est_coche) VALUES (?, 0)', [texte]);
    // await connexion.run('INSERT INTO tache (texte, est_coche) VALUES (?, 0)', [texte]);

    // console.log('tache ajouter');
    // Il est préférable d'utiliser result.lastID ici.
    return result.lastID;
}

export const terminerTaches_bd = async (idTache) => {
    let connexion = await promessConnexion;

    await connexion.run(`UPDATE tache SET est_coche = NOT est_coche WHERE id_tache = ?`, [idTache]);
}
