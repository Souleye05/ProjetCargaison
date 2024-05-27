import { Cargaison } from './modele/cargaison.js';
//     const limitationType = (document.getElementById('limitation') as HTMLSelectElement);
//     limitationType.addEventListener('change', () => {
//     const poidsField = document.getElementById('poidsField') as HTMLElement;
//     const produitField = document.getElementById('produitField') as HTMLElement;
//     if (limitationType.value == 'poids') {
//         poidsField.classList.remove('hidden');
//         produitField.classList.add('hidden');
//     } else if (limitationType.value == 'produit') {
//         poidsField.classList.add('hidden');
//         produitField.classList.remove('hidden');
//     } else {
//         poidsField.classList.add('hidden');
//         produitField.classList.add('hidden');
//     }
// });
// -------------------------------------Validation of my field (formulaires) -------------------------------------
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
    if (limitation === 'poids' && !poids) {
        showError('poidsError', 'Veuillez entrer un poids valide.');
        isValid = false;
    }
    else {
        hideError('poidsError');
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
    if (!dateDepart) {
        showError('dateDepartError', 'Veuillez entrer une date de départ valide.');
        isValid = false;
    }
    else {
        hideError('dateDepartError');
    }
    // Validate dateArrivee
    if (!dateArrivee) {
        showError('dateArriveeError', 'Veuillez entrer une date d\'arrivée valide.');
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
// Event listener for form submission
document.getElementById('form_id')?.addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});
// Event listener for limitation field change
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
// Event listener for close button
document.getElementById('close')?.addEventListener('click', function () {
    const modal = document.getElementById('my-modal');
    modal?.classList.add('hidden');
});
// Affichage of my liste of cargaisons
document.getElementById('valider')?.addEventListener('click', () => {
    afficherCargaisons();
});
/* --------------------- fonction filtre et Pagination ----------------------------------- */
let currentPage = 1;
// Nombre de cargaisons par page
const itemsPerPage = 5;
let cargaisons = [];
function afficherCargaisons() {
    fetch('../public/data/cargos.json')
        .then(response => response.json())
        .then(data => {
        cargaisons = data.cargaisons;
        displayPage(currentPage);
    });
}
//   filter par catégories
document.getElementById('typeFilter')?.addEventListener('change', applyFilters);
document.getElementById('etatFilter')?.addEventListener('change', applyFilters);
document.getElementById('destinationFilter')?.addEventListener('input', applyFilters);
function applyFilters() {
    // Reset to the first page whenever filters change
    currentPage = 1;
    displayPage(currentPage);
}
function displayPage(page) {
    const typeFilter = document.getElementById('typeFilter').value;
    const etatFilter = document.getElementById('etatFilter').value;
    const destinationFilter = document.getElementById('destinationFilter').value.toLowerCase();
    const filteredCargaisons = cargaisons.filter(cargaison => {
        return ((typeFilter === '' || cargaison.type.toLowerCase() === typeFilter.toLowerCase()) &&
            (etatFilter === '') &&
            (destinationFilter === '' || cargaison.lieu_arrivee.toLowerCase().includes(destinationFilter)));
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
    const paginationControls = document.getElementById('pagination-controls');
    if (!paginationControls)
        return;
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i.toString();
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
        });
        paginationControls.appendChild(button);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    afficherCargaisons();
});
document.getElementById('form_id')?.addEventListener('submit', (event) => {
    event.preventDefault();
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
        }
        else {
            alert('Erreur lors de l\'ajout de la cargaison');
        }
    });
});
afficherCargaisons();
