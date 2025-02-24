let textInput = document.getElementById('textbox-tache');
let formulaire = document.getElementById('form-tache');
let cases = document.querySelectorAll('#liste-taches input');


const ajouterTache = async () => {
    // event.preventDefault(); //on n'a pas besoin de event.prevent car on veut la page s'actualise. Mais si nous voulons empecher le refresh il mettre le mot event en parametre de de la fonctuon ajouterTache 
    let donnee = {
        texte: textInput.value
    }
    await fetch('/api/tache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnee)
    });
    console.log("Requete envoye");
}

const cocheTache = async (event) => {
    let donnee = {
        id: event.currentTarget.dataset.id
    }
    event.currentTarget.checked = !event.currentTarget.checked

    let response = await fetch('/api/tache', {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnee)
    });

    if (response.ok) {
        let data = await response.json(); //recupere les donnees en json et met ca dans la variable data
        console.log(data);
        let lescases = document.querySelector('input[data-id ="${data.id}"]');
        lescases.checked = !lescases.checked;
    }
}

if (formulaire) {
    formulaire.addEventListener('submit', ajouterTache);
}

for (let pour_chaque_case of cases) {
    pour_chaque_case.addEventListener('change', cocheTache);
}