import { Cargaison, CargaisonMaritime, CargaisonAerienne, CargaisonRoutier } from './modele/cargaison.js';
import { FoodProduct, ChemicalProduct, FragileMaterial, unbreackableMaterial } from './modele/produit.js';
/* ==============================Modal formulaire ADD CARGO ============================================== */
const openModalButton = document.getElementById("add_modal");
openModalButton?.addEventListener("click", () => {
    ;
    const modal = document.getElementById("my-modal");
    if (openModalButton && modal) {
        modal?.classList.remove("hidden");
    }
    /*  ----- close button -----------*/
    document.getElementById('close')?.addEventListener('click', function () {
        const modal = document.getElementById('my-modal');
        modal?.classList.add('hidden');
    });
    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal?.classList.add("hidden");
        }
    });
});
/* ============================== affichage du degré de toxicité pour le type chimique ================================ */
document.getElementById('productType')?.addEventListener("change", function () {
    const typeProduit = document.getElementById('productType').value;
    console.log("productType");
    const degreToxicite = document.getElementById('productToxicity');
    if (typeProduit == 'chimique') {
        degreToxicite?.classList.remove('hidden');
    }
    else {
        degreToxicite?.classList.add('hidden');
    }
});
// ====================================Validation of my field (formulaires) ==================================
// Function to validate the form
function validateForm() {
    let isValid = true;
    // Get form elements
    const limitation = document.getElementById('limitation').value;
    const poids = document.getElementById('poids').value.trim();
    const produit = document.getElementById('produit').value.trim();
    const depart = document.getElementById('depart').value.trim();
    const arrivee = document.getElementById('arrivee').value.trim();
    const dateDepart = document.getElementById('dateDepart').value;
    const dateArrivee = document.getElementById('dateArrivee').value;
    const distance = document.getElementById('distance').value.trim();
    // Validate limitation
    if (limitation === 'poids') {
        const poidsValue = parseFloat(poids);
        if (isNaN(poidsValue) || poidsValue <= 0) {
            showError('poidsError', 'Veuillez entrer un poids valide.');
            isValid = false;
        }
        else {
            hideError('poidsError');
        }
    }
    if (limitation === 'produit' && !produit) {
        showError('produitError', 'Veuillez entrer un produit valide.');
        isValid = false;
    }
    else {
        hideError('produitError');
    }
    // Validate depart
    if (!depart) {
        showError('departError', 'Veuillez entrer un lieu de départ valide.');
        isValid = false;
    }
    else {
        hideError('departError');
    }
    // Validate arrivee
    if (!arrivee) {
        showError('arriveeError', 'Veuillez entrer un lieu d\'arrivée valide.');
        isValid = false;
    }
    else {
        hideError('arriveeError');
    }
    // Validate dateDepart
    const currentDate = new Date();
    const inputDateDepart = new Date(dateDepart);
    currentDate.setHours(0, 0, 0, 0); // Set current date to start of the day
    inputDateDepart.setHours(0, 0, 0, 0); // Set input date to start of the day
    if (inputDateDepart < currentDate) {
        showError('dateDepartError', 'La date de départ ne peut pas être inférieure à la date du jour.');
        isValid = false;
    }
    else {
        hideError('dateDepartError');
    }
    // Validate dateArrivee
    const inputDateArrivee = new Date(dateArrivee);
    inputDateArrivee.setHours(0, 0, 0, 0); // Set input date to start of the day
    if (inputDateArrivee.getTime() === currentDate.getTime()) {
        showError('dateArriveeError', 'La date d\'arrivée ne peut pas être égale à la date du jour.');
        isValid = false;
    }
    else {
        hideError('dateArriveeError');
    }
    // Validate distance
    if (!distance || isNaN(parseFloat(distance))) {
        showError('distanceError', 'Veuillez entrer une distance valide.');
        isValid = false;
    }
    else {
        hideError('distanceError');
    }
    return isValid;
}
// Function to show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}
// Function to hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}
/* ================= Soumisson du formulaire ======================= */
document.getElementById('form_id')?.addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});
/* ======================== Choix entre Produit et Poids ============================ */
document.getElementById('limitation')?.addEventListener('change', function () {
    const limitation = document.getElementById('limitation').value;
    const poidsField = document.getElementById('poidsField');
    const produitField = document.getElementById('produitField');
    if (limitation === 'poids') {
        poidsField?.classList.remove('hidden');
        produitField?.classList.add('hidden');
    }
    else if (limitation === 'produit') {
        poidsField?.classList.add('hidden');
        produitField?.classList.remove('hidden');
    }
    else {
        poidsField?.classList.add('hidden');
        produitField?.classList.add('hidden');
    }
});
/* ====================== Affichage de la liste des cargaisons =============================== */
document.getElementById('valider')?.addEventListener('click', () => {
    afficherCargaisons();
});
afficherCargaisons();
/* ====================== Filtre et pagination ================================== */
let currentPage = 1;
const itemsPerPage = 5;
let cargaisons = [];
function afficherCargaisons() {
    fetch('../template/api.php')
        .then(response => response.json())
        .then(data => {
        console.log(data);
        cargaisons = data.cargaisons;
        displayPage(currentPage);
    });
}
let id;
function displayPage(page) {
    const numeroFilter = document.getElementById('numeroFilter').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value.toLowerCase();
    const etatFilter = document.getElementById('etatFilter').value.toLowerCase();
    const destinationFilter = document.getElementById('destinationFilter').value.toLowerCase();
    const departFilter = document.getElementById('departFilter').value.toLowerCase();
    const dateDepartFilter = document.getElementById('dateDepartFilter').value;
    const dateArriveeFilter = document.getElementById('dateArriveeFilter').value;
    const filteredCargaisons = cargaisons.filter(cargaison => {
        return ((!numeroFilter || cargaison.numero.toLowerCase().includes(numeroFilter)) &&
            (!typeFilter || cargaison.type.toLowerCase() === typeFilter) &&
            (!etatFilter || cargaison.etat_avancement.toLowerCase() === etatFilter) &&
            (!destinationFilter || cargaison.lieu_arrivee.toLowerCase().includes(destinationFilter)) &&
            (!departFilter || cargaison.lieu_depart.toLowerCase().includes(departFilter)) &&
            (!dateDepartFilter || cargaison.date_depart === dateDepartFilter) &&
            (!dateArriveeFilter || cargaison.date_arrivee === dateArriveeFilter));
    });
    const cargaisonList = document.getElementById('cargaisonbody');
    if (!cargaisonList)
        return;
    cargaisonList.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCargaisons = filteredCargaisons.slice(startIndex, endIndex);
    pageCargaisons.forEach(cargaison => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.numero}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.type}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance_km}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat_avancement}<select id="etat_avancement">
    <option value="EN ATTENTE">En attente</option>
    <option value="EN ROUTE">En route</option>
    <option value="ARRIVÉE">Arrivée</option>
    <option value="PERDU">Perdu</option>
  </select></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 btn-add" data-id="${cargaison.numero}"> <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"id="add_modal" data-id="${cargaison.numero}"><i class="material-icons" data-id="${cargaison.numero}">add</i></button></td> 
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 btn-view" data-id="${cargaison.idcargo}" id="toggle"> <button class="bg-green-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${cargaison.idcargo}">Ouvert</button></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${cargaison.numero}">voir</button></td>
        `;
        cargaisonList.appendChild(row);
    });
    const btns = document.querySelectorAll(".btn-add");
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            id = target.getAttribute('data-id');
            console.log(id);
            document.getElementById('mymodal1').showModal();
            console.log('Added');
        });
    });
    updatePaginationControls(filteredCargaisons.length);
}
function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageDisplay = document.getElementById('pageDisplay');
    if (!pageDisplay)
        return;
    pageDisplay.innerText = `Page ${currentPage}`;
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    if (prevPage && nextPage) {
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    afficherCargaisons();
});
document.getElementById('numeroFilter')?.addEventListener('input', () => displayPage(1));
document.getElementById('typeFilter')?.addEventListener('change', () => displayPage(1));
document.getElementById('etatFilter')?.addEventListener('change', () => displayPage(1));
document.getElementById('destinationFilter')?.addEventListener('input', () => displayPage(1));
document.getElementById('departFilter')?.addEventListener('input', () => displayPage(1));
document.getElementById('dateDepartFilter')?.addEventListener('change', () => displayPage(1));
document.getElementById('dateArriveeFilter')?.addEventListener('change', () => displayPage(1));
document.getElementById('prevPage')?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
});
document.getElementById('nextPage')?.addEventListener('click', () => {
    const totalPages = Math.ceil(cargaisons.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
});
/* =========================== Ajouter cargaison ======================================= */
let cargaison;
let produit;
document.getElementById('form_id')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    /* ====================== Recupération des données formulaire Cargaison ===================================== */
    const idcargo = Cargaison.length + 1;
    const typeCargaison = document.getElementById('type').value;
    const numero = "CRG" + Math.floor(Math.random() * 1000); // Générer un numéro aléatoire pour la cargaison
    const poidsCargaison = parseFloat(document.getElementById('poids').value);
    const pointDepart = document.getElementById('depart').value;
    const pointArrive = document.getElementById('arrivee').value;
    const dateDepart = document.getElementById('dateDepart').value;
    const dateArrivee = document.getElementById('dateArrivee').value;
    const distance = parseFloat(document.getElementById('distance').value);
    console.log(typeCargaison);
    if (typeCargaison == "maritime") {
        cargaison = new CargaisonMaritime('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERT');
    }
    else if (typeCargaison == "aérienne") {
        cargaison = new CargaisonAerienne('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERT', []);
    }
    else if (typeCargaison == "routiére") {
        cargaison = new CargaisonRoutier('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERT');
    }
    else {
        alert("Type de cargaison invalide");
        return;
    }
    fetch('../template/api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargaison),
    })
        .then(response => response.json())
        .then(result => {
        console.log(result);
        if (result.status === 'success') {
            alert(result.message);
            afficherCargaisons();
        }
        else {
            alert('Erreur lors de l\'ajout de la cargaison');
        }
    })
        .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de la cargaison');
    });
});
/* ============================= Ajouter Produit ===================================== */
document.getElementById('addProduct')?.addEventListener('click', (event) => {
    event.preventDefault();
    const numero = "PRO" + Math.floor(Math.random() * 1000);
    const nomProduit = document.getElementById('nomProduit').value;
    const poidsProduit = parseFloat(document.getElementById('productWeight').value);
    const typeProduit = document.getElementById('productType').value;
    const toxiciteProduit = parseFloat(document.getElementById('productToxicity').value);
    const prix = parseFloat(document.getElementById('productPrice').value);
    const expéditeurePrenom = document.getElementById('clientLastName').value;
    const expéditeureNom = document.getElementById('clientFirstName').value;
    const expéditeureTelephone = parseFloat(document.getElementById('clientPhone').value);
    const expéditeureAdresse = parseFloat(document.getElementById('clientAddress').value);
    const expéditeureEmail = document.getElementById('clientMail').value;
    const destinataireNom = document.getElementById('nomDestin').value;
    const destinatairePrenom = document.getElementById('prenomDestin').value;
    const destinataireTelephone = parseFloat(document.getElementById('TelDestin').value);
    const destinataireAdresse = parseFloat(document.getElementById('addressDestin').value);
    const destinataireEmail = document.getElementById('MailDestin').value;
    let clientApport = { nom: expéditeureNom, prenom: expéditeurePrenom, tel: expéditeureTelephone, adresse: expéditeureAdresse, email: expéditeureEmail };
    let destinataire = { nom: destinataireNom, prenom: destinatairePrenom, tel: destinataireTelephone, adresse: destinataireAdresse, email: destinataireEmail };
    if (typeProduit === 'alimentaire') {
        produit = new FoodProduct('addproduit', nomProduit, poidsProduit, clientApport, destinataire);
    }
    else if (typeProduit === 'chimique') {
        produit = new ChemicalProduct('addproduit', nomProduit, poidsProduit, clientApport, destinataire, toxiciteProduit);
    }
    else if (typeProduit === 'incassable') {
        produit = new FragileMaterial('addproduit', nomProduit, poidsProduit, clientApport, destinataire);
    }
    else if (typeProduit === 'cassable') {
        produit = new unbreackableMaterial('addproduit', nomProduit, poidsProduit, clientApport, destinataire);
    }
    else {
        alert("Type de produit invalide");
        return;
    }
    console.log(produit);
    const donne = {
        "action": "addproduit",
        "produit": produit,
        "idcargo": id
    };
    fetch('../template/api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donne),
    })
        .then(response => response.json())
        .then(result => {
        console.log(result);
        if (result.status === 'success') {
            alert(result.message);
        }
        else {
            alert('Erreur lors de l\'ajout du produit');
        }
    });
});
// Gestion du bouton unique pour ouvrir/fermer la cargaison
const toggleButon = document.getElementById('toggle');
toggleButon.addEventListener('click', function () {
    if (cargaison) {
        if (cargaison.etat_avancement === "EN ATTENTE") {
            cargaison.fermer();
            console.log(`Cargaison fermée. État de la cargaison: ${cargaison.etat_avancement}`);
        }
        else if (cargaison.etat_avancement === "FERMÉE") {
            cargaison.reouvrir();
            console.log(`Cargaison rouverte. État de la cargaison: ${cargaison.etat_avancement}`);
        }
        else {
            console.log("La cargaison ne peut être fermée ou rouverte que si elle est en attente ou fermée.");
        }
    }
    else {
        alert("Veuillez créer une cargaison d'abord");
    }
});
// Gestion du changement de l'état d'avancement
const etatAvancementSelect = document.getElementById('etat_avancement');
etatAvancementSelect.addEventListener('change', function (event) {
    if (cargaison) {
        cargaison.etat_avancement = event.target.value;
        console.log(`Nouvel état d'avancement: ${cargaison.etat_avancement}`);
    }
    else {
        alert("Veuillez créer une cargaison d'abord");
    }
});
