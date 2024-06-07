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
        console.log(cargaison);
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.poids_max != null ? cargaison.poids_max + ' (KG)' : cargaison.nbr_prod_max}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance_km}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat_globale}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat_avancement}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 btn-add" data-id="${cargaison.numero}">
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"id="add_modal" data-id="${cargaison.numero}">
            <i class="material-icons" data-id="${cargaison.numero}">add</i>
            </button>
          </td> 
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 btn-view" data-id="${cargaison.numero}" id="toggle">
            <button class="bg-green-500 text-white px-1 py-1 rounded btn-view btn-ouvrir-cargo" type="button" data-id="${cargaison.numero}">ON</button>
            <button class="bg-red-500 text-white px-1 py-1 rounded btn-view btn-fermer-cargo" type="button" data-id="${cargaison.numero}">OFF</button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button class="bg-blue-500 text-white px-1 py-1 rounded btn-view detail-button" type="button"  data-id="${cargaison.numero}">voir</button>
            <select id="etat_avancement" class="etat-avancement-select" data-id="${cargaison.numero}">
              <option value="EN ATTENTE" ${cargaison.etat_avancement === "EN ATTENTE" ? 'selected' : ""}>EN ATTENTE</option>
              <option value="EN COURS" ${cargaison.etat_avancement === "EN COURS" ? 'selected' : ""}>EN COURS</option>
              <option value="ARRIVÉE" ${cargaison.etat_avancement === "ARRIVÉE" ? 'selected' : ""}>ARRIVÉE</option>
              <option value="PERDU" ${cargaison.etat_avancement === "PERDU" ? 'selected' : ""}>PERDU</option>
            </select>
          </td>
        `;
        cargaisonList.appendChild(row);
        /* =========== Modal add Product ========================== */
        const btn = row.querySelector(".btn-add");
        const productWeight = document.getElementById('productWeight');
        btn?.addEventListener('click', (event) => {
            if (cargaison.etat_globale == "OUVERTE") {
                if (cargaison.poids_max === null) {
                    productWeight.classList.add('hidden');
                }
                else {
                    productWeight.classList.remove('hidden');
                }
                const target = event.target;
                id = target.getAttribute('data-id');
                console.log(id);
                document.getElementById('mymodal1').showModal();
                console.log('Added');
            }
            else {
                afficherAlerte("la cargaison est fermée", "error");
            }
        });
    });
    //   // Assurez-vous que le code s'exécute après que le DOM est complètement chargé
    // document.addEventListener('DOMContentLoaded', () => {
    //   /* =========== Modal add Product ========================== */
    //   const rows = document.querySelectorAll(".row"); // Assurez-vous que ".row" sélectionne tous les éléments pertinents
    //   rows.forEach(row => {
    //     const btn = row.querySelector(".btn-add");
    //     const productWeight = document.getElementById('productWeight') as HTMLElement;
    //     btn?.addEventListener('click', (event) => {
    //       // Vérifiez l'état global de la cargaison
    //       if (cargaison.etat_globale === "OUVERTE") {
    //         // Cachez ou affichez le champ de poids du produit en fonction du poids maximum
    //         if (cargaison.poids_max === null) {
    //           productWeight.classList.add('hidden');
    //         } else {
    //           productWeight.classList.remove('hidden');
    //         }
    //         // Obtenez l'ID du produit à partir de l'attribut data-id
    //         const target = event.target as HTMLElement;
    //         const id = target.getAttribute('data-id');
    //         console.log(id);
    //         // Affichez la modal pour ajouter un produit
    //         (document.getElementById('mymodal1') as HTMLDialogElement).showModal();
    //         console.log('Added');
    //       } else {
    //         // Affichez une alerte si la cargaison est fermée
    //         afficherAlerte("La cargaison est fermée", "error");
    //       }
    //     });
    //   });
    // });
    // });
    /*  ============== Modal pour les détails de la cargaison ========================== */
    const details = document.querySelectorAll(".detail-button");
    details.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            id = target.getAttribute('data-id');
            console.log(id);
            const detailModal = document.getElementById('detail-modal');
            if (detailModal) {
                detailModal.classList.remove('hidden');
                detailModal.classList.add('flex');
            }
            const closeModalButton = document.getElementById('close-modal');
            if (closeModalButton) {
                closeModalButton.addEventListener('click', function () {
                    const detailModal = document.getElementById('detail-modal');
                    if (detailModal) {
                        detailModal.classList.remove('flex');
                        detailModal.classList.add('hidden');
                    }
                });
            }
            showDetails(id, cargaisons);
        });
    });
    /* ====================== Change État d'avancement ================================ */
    /* ============ Fonction qui active ou désactive les options du select en fonction de l'état actuel de la cargaison ================================== */
    function setOptionsByEtat(selectElement, etat) {
        const options = selectElement.querySelectorAll("option");
        options.forEach(option => {
            option.classList.remove("bg-green-200");
            if (etat === "EN ATTENTE" && option.value === "EN COURS") {
                option.disabled = false;
                option.classList.add("bg-green-200");
            }
            else if (etat === "EN COURS" && (option.value === "ARRIVÉE" || option.value === "PERDU")) {
                option.disabled = false;
                option.classList.add("bg-green-200");
            }
            else {
                option.disabled = true;
            }
        });
    }
    /* ====================== Changement d'état ========================== */
    document.querySelectorAll(".etat-avancement-select").forEach((select) => {
        const target = select;
        const cargaisonId = target.getAttribute("data-id");
        if (cargaisonId) {
            const cargaison = cargaisons.find(c => c.numero === cargaisonId);
            if (cargaison) {
                setOptionsByEtat(target, cargaison.etat_avancement);
            }
        }
        select.addEventListener("change", (event) => {
            const target = event.target;
            const cargaisonId = target.getAttribute("data-id");
            const newEtat = target.value;
            if (cargaisonId) {
                const cargaison = cargaisons.find(c => c.numero === cargaisonId);
                if (cargaison) {
                    if (cargaison.etat_avancement === "EN ATTENTE" && newEtat === "EN COURS") {
                        changerEtatAvancement(cargaisonId, newEtat);
                    }
                    else if (cargaison.etat_avancement === "EN COURS" && (newEtat === "ARRIVÉE" || newEtat === "PERDU")) {
                        changerEtatAvancement(cargaisonId, newEtat);
                    }
                    else {
                        console.log("Changement d'état non autorisé.");
                    }
                }
            }
        });
    });
    /* =============================== Evenement click bouton Ouvrir ============================*/
    // document.querySelectorAll(".btn-ouvrir-cargo").forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     const target = (event.target as HTMLElement).closest(".btn-ouvrir-cargo");
    //     if (target) {
    //       const cargaisonId = target.getAttribute("data-id");
    //       if (cargaisonId) {
    //         const cargaison = cargaisons.find(c => c.numero === cargaisonId);
    //         if (cargaison) {
    //           // Vérifier les états d'avancement et globale pour déterminer si la cargaison peut être ouverte
    //           if (cargaison.etat_avancement === "EN ATTENTE" && cargaison.etat_globale === "FERMÉE" || cargaison.etat_avancement === "ARRIVÉE" && cargaison.etat_globale === "FERMÉE") {
    //             console.log(cargaisonId);
    //             ouvrirCargaison(cargaisonId);
    //           } else {
    //             console.log("La cargaison ne peut pas être ouverte car elle est soit fermée, soit en COURS.");
    //           }
    //         } else {
    //           console.error("Cargaison non trouvée.");
    //         }
    //       } else {
    //         console.error("ID de cargaison non trouvé.");
    //       }
    //     }
    //   });
    // });
    document.querySelectorAll(".btn-ouvrir-cargo").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target.closest(".btn-ouvrir-cargo");
            if (target) {
                const cargaisonId = target.getAttribute("data-id");
                if (cargaisonId) {
                    const cargaison = cargaisons.find(c => c.numero === cargaisonId);
                    if (cargaison) {
                        // Vérifier les états d'avancement et globale pour déterminer si la cargaison peut être ouverte
                        if (cargaison.etat_avancement === "EN ATTENTE" && cargaison.etat_globale === "FERMÉE" || cargaison.etat_avancement === "ARRIVÉE" && cargaison.etat_globale === "FERMÉE") {
                            console.log(cargaisonId);
                            ouvrirCargaison(cargaisonId);
                        }
                        else if (cargaison.etat_avancement === "EN COURS") {
                            // Si la cargaison est en cours, la marquer automatiquement comme fermée
                            cargaison.etat_globale = "FERMÉE";
                            afficherAlerte(`La cargaison ${cargaisonId} est en cours et est maintenant fermée automatiquement.`, "error");
                        }
                        else {
                            afficherAlerte("La cargaison ne peut pas être ouverte car elle est soit fermée, soit en cours.", "error");
                        }
                    }
                    else {
                        console.error("Cargaison non trouvée.");
                    }
                }
                else {
                    console.error("ID de cargaison non trouvé.");
                }
            }
        });
    });
    /* =============================== Evenement click bouton fermée ============================*/
    document.querySelectorAll(".btn-fermer-cargo").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target.closest(".btn-fermer-cargo");
            if (target) {
                const cargaisonId = target.getAttribute("data-id");
                if (cargaisonId) {
                    const cargaison = cargaisons.find(c => c.numero === cargaisonId);
                    if (cargaison) {
                        if (cargaison.etat_avancement === "EN ATTENTE" && cargaison.etat_globale === "OUVERTE") {
                            console.log(cargaisonId);
                            fermerCargaison(cargaisonId);
                        }
                    }
                    else {
                        console.error("Cargaison non trouvée.");
                    }
                }
                else {
                    console.error("ID de cargaison non trouvé.");
                }
            }
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
// Fonction changer etat_avancement d'une cargaison
function changerEtatAvancement(cargaisonId, newEtat) {
    if (!cargaisonId)
        return;
    fetch("../template/api.php", {
        method: "POST",
        body: JSON.stringify({
            action: "changerEtape",
            idCargaison: cargaisonId,
            nouvelleEtape: newEtat,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.status === "success") {
            afficherAlerte("État d'avancement mis à jour avec succès", data.status);
            afficherCargaisons();
        }
        else {
            alert("Erreur lors de la mise à jour de l'état d'avancement");
        }
    })
        .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de la mise à jour de l'état d'avancement");
    });
}
// Fonction pour fermer une cargaison
function fermerCargaison(cargaisonId) {
    console.log(cargaisonId);
    if (!cargaisonId) {
        console.error("cargaisonId is null");
        return;
    }
    fetch("../template/api.php", {
        method: "POST",
        body: JSON.stringify({
            action: "fermerCargaison",
            id: cargaisonId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.status === "success") {
            afficherAlerte("La cargaison est FERMÉE avec succée", data.status);
            afficherCargaisons(); // Rafraîchir le tableau après fermeture
        }
        else {
            alert("Erreur lors de la fermeture de la cargaison : " + data.message);
        }
    })
        .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de la fermeture de la cargaison");
    });
}
// Fonction pour ouvrir une cargaison
function ouvrirCargaison(cargaisonId) {
    if (!cargaisonId) {
        console.error("cargaisonId is null");
        return;
    }
    fetch("../template/api.php", {
        method: "POST",
        body: JSON.stringify({
            action: "ouvrirCargaison",
            id: cargaisonId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.status === "success") {
            afficherAlerte("La cargaison est en État OUVERTE", data.status);
        }
        else if (data.status === "error") {
            afficherAlerte(data.message, data.status);
            afficherCargaisons(); // Rafraîchir le tableau après fermeture
        }
        else {
            alert("Erreur lors de l'ouverture de la cargaison : " + data.message);
        }
    })
        .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de l'ouverture de la cargaison");
    });
}
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
    const nbrProduitMax = parseFloat(document.getElementById('produit').value);
    const pointDepart = document.getElementById('depart').value;
    const pointArrive = document.getElementById('arrivee').value;
    const dateDepart = document.getElementById('dateDepart').value;
    const dateArrivee = document.getElementById('dateArrivee').value;
    const distance = parseFloat(document.getElementById('distance').value);
    console.log(typeCargaison);
    if (typeCargaison == "maritime") {
        cargaison = new CargaisonMaritime('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, nbrProduitMax, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERTE', []);
    }
    else if (typeCargaison == "aérienne") {
        cargaison = new CargaisonAerienne('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, nbrProduitMax, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERTE', []);
    }
    else if (typeCargaison == "routier") {
        cargaison = new CargaisonRoutier('addCargaison', idcargo, numero, typeCargaison, poidsCargaison, nbrProduitMax, pointDepart, pointArrive, dateDepart, dateArrivee, distance, 'EN ATTENTE', 'OUVERTE', []);
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
            afficherAlerte("Cargaison ajoutée avec succès", result.status);
            afficherCargaisons();
        }
        else if (result.status === "error") {
            afficherAlerte(result.message, result.status);
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
    const poidsProduit = parseFloat(document.getElementById('product').value);
    const etatProduit = document.getElementById('productState').value;
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
    console.log(poidsProduit);
    let clientApport = { nom: expéditeureNom, prenom: expéditeurePrenom, tel: expéditeureTelephone, adresse: expéditeureAdresse, email: expéditeureEmail };
    let destinataire = { nom: destinataireNom, prenom: destinatairePrenom, tel: destinataireTelephone, adresse: destinataireAdresse, email: destinataireEmail };
    if (typeProduit === 'alimentaire') {
        produit = new FoodProduct('addproduit', nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire);
        limitationProduit(id);
    }
    else if (typeProduit === 'chimique') {
        produit = new ChemicalProduct('addproduit', nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire, toxiciteProduit);
        limitationProduit;
    }
    else if (typeProduit === 'incassable') {
        produit = new FragileMaterial('addproduit', nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire);
        limitationProduit;
    }
    else if (typeProduit === 'cassable') {
        produit = new unbreackableMaterial('addproduit', nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire);
        limitationProduit;
    }
    else {
        afficherAlerte("Type de produit invalide", "error");
        return;
    }
    console.log(produit);
    function limitationProduit(id) {
        const cargaisonIndex = cargaisons.findIndex(c => c.numero === id);
        if (cargaisonIndex === -1) {
            console.error(`Cargaison avec id ${id} non trouvée.`);
            return;
        }
        const cargaison = cargaisons[cargaisonIndex];
        const poidsTotalProduits = cargaison.produits.reduce((total, produit) => total + produit.poids, 0);
        if (cargaison.poids_max !== null && poidsTotalProduits > cargaison.poids_max) {
            afficherAlerte("La cargaison ne peut pas dépasser le poids maximum autorisé.", "error");
            return;
        }
        if (cargaison.nbr_prod_max !== null && cargaison.produits.length > cargaison.nbr_prod_max) {
            afficherAlerte("La cargaison ne peut pas contenir plus de produits que le nombre maximum autorisé.", "error");
            return;
        }
    }
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
        const cargaisonIndex = cargaisons.findIndex(c => c.numero === id);
        const poidsTotalProduits = cargaison.produits.reduce((total, produit) => total + produit.poids, 0);
        if (cargaison.poids_max !== null && poidsTotalProduits > cargaison.poids_max) {
            afficherAlerte("La cargaison ne peut pas dépasser le poids maximum autorisé.", "error");
            return;
        }
        if (cargaison.nbr_prod_max !== null && cargaison.produits.length > cargaison.nbr_prod_max) {
            afficherAlerte("La cargaison ne peut pas contenir plus de produits que le nombre maximum autorisé.", "error");
            return;
        }
        if (result.status === 'success') {
            /*  alert(result.message); */
            afficherAlerte("produit ajoutée avec succès", result.status);
        }
        else if (result.status === "error") {
            afficherAlerte(result.message, result.status);
        }
        else {
            alert('Erreur lors de l\'ajout du produit');
        }
    });
});
function showDetails(id, cargaisons) {
    const cargaisonIndex = cargaisons.findIndex(c => c.numero === id);
    if (cargaisonIndex === -1) {
        console.error(`Cargaison avec id ${id} non trouvée.`);
        return;
    }
    const cargaison = cargaisons[cargaisonIndex];
    document.getElementById('detail-idcargo').innerText = cargaison.numero.toString();
    document.getElementById('detail-type').innerText = cargaison.type;
    document.getElementById('detail-lieu-depart').innerText = cargaison.lieu_depart;
    document.getElementById('detail-lieu-arrivee').innerText = cargaison.lieu_arrivee;
    document.getElementById('detail-date-depart').innerText = cargaison.date_depart;
    document.getElementById('detail-date-arrivee').innerText = cargaison.date_arrivee;
    document.getElementById('detail-distance').innerText = cargaison.distance_km.toString();
    document.getElementById('detail-etat-avancement').innerText = cargaison.etat_avancement;
    const produitsContainer = document.getElementById('detail-produits');
    produitsContainer.innerHTML = ''; // Clear previous content
    cargaison.produits.forEach(produit => {
        const card = document.createElement('div');
        card.className = 'bg-blue-100 p-4 rounded shadow-md overflow-scroll';
        card.innerHTML = `
      <h4 class="text-lg font-semibold text-blue-600">${produit.nom}</h4>
      <p><strong>Poids:</strong> ${produit.poids} kg</p>
      <p><strong>Client Apport:</strong> ${produit.clientApport.nom} ${produit.clientApport.prenom}, ${produit.clientApport.tel}, ${produit.clientApport.adresse}, ${produit.clientApport.email}</p>
      <p><strong>Destinataire:</strong> ${produit.destinataire.nom} ${produit.destinataire.prenom}, ${produit.destinataire.tel}, ${produit.destinataire.adresse}, ${produit.destinataire.email}</p>
    `;
        produitsContainer.appendChild(card);
    });
}
function afficherAlerte(message, type) {
    let alertDiv = document.getElementById("alert");
    let alertContent = document.getElementById("alertContent");
    let alertIcon = document.getElementById("alertIcon");
    // Remove any previous color and icon classes
    alertContent.classList.remove('bg-green-200', 'text-green-800', 'bg-red-200', 'text-red-800', 'bg-blue-200', 'text-blue-800');
    alertIcon.className = '';
    switch (type) {
        case 'success':
            alertContent.classList.add('text-green-800');
            alertIcon.classList.add('fas', 'fa-check-circle', 'text-green-800');
            break;
        case 'error':
            alertContent.classList.add('text-red-800');
            alertIcon.classList.add('fas', 'fa-exclamation-circle', 'text-red-800');
            break;
        default:
            alertContent.classList.add('text-blue-800');
            alertIcon.classList.add('fas', 'fa-info-circle', 'text-blue-800');
    }
    alertContent.textContent = message;
    alertDiv.classList.remove('hidden');
    alertDiv.classList.add('flex');
    setTimeout(() => {
        alertDiv.classList.add('hidden');
        alertDiv.classList.remove('flex');
    }, 5000);
}
