import { Cargaison } from './modele/cargaison.js';
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
// ====================================Validation of my field (formulaires) ==================================
// Function to validate the form
function validateForm() {
    let isValid = true;
    // Get form elements
    const numero = document.getElementById('numero').value.trim();
    const limitation = document.getElementById('limitation').value;
    const poids = document.getElementById('poids').value.trim();
    const produit = document.getElementById('produit').value.trim();
    const depart = document.getElementById('depart').value.trim();
    const arrivee = document.getElementById('arrivee').value.trim();
    const dateDepart = document.getElementById('dateDepart').value;
    const dateArrivee = document.getElementById('dateArrivee').value;
    const distance = document.getElementById('distance').value.trim();
    // Validate numero
    if (!numero) {
        showError('numeroError', 'Veuillez entrer un numéro valide.');
        isValid = false;
    }
    else {
        hideError('numeroError');
    }
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
/* --------Soumisson du formulaire ------------------------- */
document.getElementById('form_id')?.addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});
/* -------------------------Choix entre Produit et Poids ---------------------------- */
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
/* -------------------------Affichage de la liste des cargaisons ---------------------------- */
document.getElementById('valider')?.addEventListener('click', () => {
    afficherCargaisons();
});
/* -------------------------------- Filtre et pagination ----------------------------------------------- */
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
            (!etatFilter || cargaison.etat.toLowerCase() === etatFilter) &&
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${cargaison.idcargo}">voir</button></td>
        `;
        cargaisonList.appendChild(row);
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
document.getElementById('form_id')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    const idcargo = Cargaison.length + 1;
    const typeCargaison = document.getElementById('type').value;
    const numero = "CRG" + Math.floor(Math.random() * 1000); // Générer un numéro aléatoire pour la cargaison
    const poidsCargaison = parseFloat(document.getElementById('poids').value);
    const pointDepart = document.getElementById('depart').value;
    const pointArrive = document.getElementById('arrivee').value;
    const dateDepart = document.getElementById('dateDepart').value;
    const dateArrivee = document.getElementById('dateArrivee').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const cargaison = new Cargaison('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, pointDepart, pointArrive, dateDepart, dateArrivee, distance);
    console.log(cargaison);
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
            afficherCargaisons(); // Appel après succès
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
