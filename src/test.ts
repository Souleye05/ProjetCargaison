import { Cargaison, CargaisonMaritime, CargaisonAerienne, CargaisonRoutier } from './modele/cargaison.js';
import { Product, FoodProduct, ChemicalProduct, MaterialProduct, FragileMaterial, unbreackableMaterial, Clients } from './modele/produit.js';
/* ==============================Modal formulaire ADD CARGO ============================================== */

const openModalButton = document.getElementById("add_modal");
openModalButton?.addEventListener("click", () => {
  ;
  const modal = document.getElementById("my-modal")

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
  const typeProduit = (document.getElementById('productType') as HTMLSelectElement).value;
  console.log("productType");
  const degreToxicite = (document.getElementById('productToxicity') as HTMLInputElement);

  if (typeProduit == 'chimique') {
    degreToxicite?.classList.remove('hidden');
  } else {
    degreToxicite?.classList.add('hidden');
  }
});


// ====================================Validation of my field (formulaires) ==================================

// Function to validate the form
function validateForm(): boolean {
  let isValid: boolean = true;

  // Get form elements
  const limitation: string = (document.getElementById('limitation') as HTMLSelectElement).value;
  const poids: string = (document.getElementById('poids') as HTMLInputElement).value.trim();
  const produit: string = (document.getElementById('produit') as HTMLInputElement).value.trim();
  const depart: string = (document.getElementById('depart') as HTMLInputElement).value.trim();
  const arrivee: string = (document.getElementById('arrivee') as HTMLInputElement).value.trim();
  const dateDepart: string = (document.getElementById('dateDepart') as HTMLInputElement).value;
  const dateArrivee: string = (document.getElementById('dateArrivee') as HTMLInputElement).value;
  const distance: string = (document.getElementById('distance') as HTMLInputElement).value.trim();

  // Validate limitation
  if (limitation === 'poids') {
    const poidsValue = parseFloat(poids);
    if (isNaN(poidsValue) || poidsValue <= 0) {
      showError('poidsError', 'Veuillez entrer un poids valide.');
      isValid = false;
    } else {
      hideError('poidsError');
    }
  }

  if (limitation === 'produit' && !produit) {
    showError('produitError', 'Veuillez entrer un produit valide.');
    isValid = false;
  } else {
    hideError('produitError');
  }

  // Validate depart
  if (!depart) {
    showError('departError', 'Veuillez entrer un lieu de départ valide.');
    isValid = false;
  } else {
    hideError('departError');
  }

  // Validate arrivee
  if (!arrivee) {
    showError('arriveeError', 'Veuillez entrer un lieu d\'arrivée valide.');
    isValid = false;
  } else {
    hideError('arriveeError');
  }

  // Validate dateDepart
  const currentDate: Date = new Date();
  const inputDateDepart: Date = new Date(dateDepart);
  currentDate.setHours(0, 0, 0, 0);  // Set current date to start of the day
  inputDateDepart.setHours(0, 0, 0, 0);  // Set input date to start of the day

  if (inputDateDepart < currentDate) {
    showError('dateDepartError', 'La date de départ ne peut pas être inférieure à la date du jour.');
    isValid = false;
  } else {
    hideError('dateDepartError');
  }

  // Validate dateArrivee
  const inputDateArrivee: Date = new Date(dateArrivee);
  inputDateArrivee.setHours(0, 0, 0, 0);  // Set input date to start of the day

  if (inputDateArrivee.getTime() === currentDate.getTime()) {
    showError('dateArriveeError', 'La date d\'arrivée ne peut pas être égale à la date du jour.');
    isValid = false;
  } else {
    hideError('dateArriveeError');
  }

  // Validate distance
  if (!distance || isNaN(parseFloat(distance))) {
    showError('distanceError', 'Veuillez entrer une distance valide.');
    isValid = false;
  } else {
    hideError('distanceError');
  }

  return isValid;
}

// Function to show error message
function showError(elementId: string, message: string) {
  const errorElement = document.getElementById(elementId) as HTMLSpanElement;
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

// Function to hide error message
function hideError(elementId: string) {
  const errorElement = document.getElementById(elementId) as HTMLSpanElement;
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
  const limitation: string = (document.getElementById('limitation') as HTMLSelectElement).value;
  const poidsField = document.getElementById('poidsField');
  const produitField = document.getElementById('produitField');

  if (limitation === 'poids') {
    poidsField?.classList.remove('hidden');
    produitField?.classList.add('hidden');
  } else if (limitation === 'produit') {
    poidsField?.classList.add('hidden');
    produitField?.classList.remove('hidden');
  } else {
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
let currentPage: number = 1;

const itemsPerPage: number = 5;
let cargaisons: Cargaison[] = [];

function afficherCargaisons(): void {
  fetch('../template/api.php')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      cargaisons = data.cargaisons;
      displayPage(currentPage);
    });
}
let id: string | null;
function displayPage(page: number): void {
  const numeroFilter = (document.getElementById('numeroFilter') as HTMLInputElement).value.toLowerCase();
  const typeFilter = (document.getElementById('typeFilter') as HTMLSelectElement).value.toLowerCase();
  const etatFilter = (document.getElementById('etatFilter') as HTMLSelectElement).value.toLowerCase();
  const destinationFilter = (document.getElementById('destinationFilter') as HTMLInputElement).value.toLowerCase();
  const departFilter = (document.getElementById('departFilter') as HTMLInputElement).value.toLowerCase();
  const dateDepartFilter = (document.getElementById('dateDepartFilter') as HTMLInputElement).value;
  const dateArriveeFilter = (document.getElementById('dateArriveeFilter') as HTMLInputElement).value;
  
  const filteredCargaisons = cargaisons.filter(cargaison => {
    // console.log(cargaison);
    return (
      (!numeroFilter || cargaison.numero.toLowerCase().includes(numeroFilter)) &&
      (!typeFilter || cargaison.type.toLowerCase() === typeFilter) &&
      (!etatFilter || cargaison.etat_avancement.toLowerCase() === etatFilter) &&
      (!destinationFilter || cargaison.lieu_arrivee.toLowerCase().includes(destinationFilter)) &&
      (!departFilter || cargaison.lieu_depart.toLowerCase().includes(departFilter)) &&
      (!dateDepartFilter || cargaison.date_depart === dateDepartFilter) &&
      (!dateArriveeFilter || cargaison.date_arrivee === dateArriveeFilter)
      
    );
  });

  const cargaisonList = document.getElementById('cargaisonbody');
  if (!cargaisonList) return;

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
              <option value="EN ATTENTE" ${cargaison.etat_avancement === "EN ATTENTE" ?'selected':""}>EN ATTENTE</option>
              <option value="EN COURS" ${cargaison.etat_avancement === "EN COURS" ?'selected':""}>EN COURS</option>
              <option value="ARRIVÉE" ${cargaison.etat_avancement === "ARRIVÉE" ?'selected':""}>ARRIVÉE</option>
              <option value="PERDU" ${cargaison.etat_avancement === "PERDU" ?'selected':""}>PERDU</option>
            </select>
          </td>
        `;
    cargaisonList.appendChild(row);

  /* =========== Modal add Product ========================== */
    const btn = row.querySelector(".btn-add");
    const productWeight = document.getElementById('productWeight') as HTMLElement;
    
      btn?.addEventListener('click', (event) => {
        if (cargaison.etat_globale == "OUVERTE") {
          if (cargaison.poids_max === null){
            productWeight.classList.add('hidden');
          }else{
            productWeight.classList.remove('hidden');
          }
          const target = event.target as HTMLElement;
          id = target.getAttribute('data-id');
          console.log(id);
  
  
          (document.getElementById('mymodal1') as HTMLDialogElement).showModal()
          console.log('Added');
        }else{
          afficherAlerte("la cargaison est fermée", "error")
        }
       
      })

  });

  /*  ============== Modal pour les détails de la cargaison ========================== */
  const details = document.querySelectorAll(".detail-button");
  details.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
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
      showDetails(id, cargaisons)
    })
  })
  
/* ============ Fonction qui active ou désactive les options du select en fonction de l'état actuel de la cargaison ================================== */
function setOptionsByEtat(selectElement: HTMLSelectElement, etat: string): void {
  const options = selectElement.querySelectorAll("option");

  options.forEach(option => {
    option.classList.remove("bg-green-200");

    if (etat === "EN ATTENTE" && option.value === "EN COURS") {
      option.disabled = false;
      option.classList.add("bg-green-200"); 
    } else if (etat === "EN COURS" && (option.value === "ARRIVÉE" || option.value === "PERDU")) {
      option.disabled = false;
      option.classList.add("bg-green-200");
    } else {
      option.disabled = true;
    }
  });
}


      /* ====================== Changement d'état Cargaison ========================== */ 

      document.querySelectorAll(".etat-avancement-select").forEach((select) => {
        const target = select as HTMLSelectElement;
        const cargaisonId = target.getAttribute("data-id");
        if (cargaisonId) {
          const cargaison = cargaisons.find(c => c.numero === cargaisonId);
          if (cargaison) {
            setOptionsByEtat(target, cargaison.etat_avancement);
          }
        }
      
        select.addEventListener("change", (event) => {
          const target = event.target as HTMLSelectElement;
          const cargaisonId = target.getAttribute("data-id");
          const newEtat = target.value;
      
          if (cargaisonId) {
            const cargaison = cargaisons.find(c => c.numero === cargaisonId);
            if (cargaison) {
              if (cargaison.etat_avancement === "EN ATTENTE" && newEtat === "EN COURS") {
                if (cargaison.etat_globale === "FERMÉE") {
                  changerEtatAvancement(cargaisonId, newEtat);
                } else {
                  afficherAlerte("La cargaison doit être fermée pour être mise en cours.", 'error');
                }
              } else if (cargaison.etat_avancement === "EN COURS" && (newEtat === "ARRIVÉE" || newEtat === "PERDU")) {
                changerEtatAvancement(cargaisonId, newEtat);
              } else {
                afficherAlerte("Changement d'état non autorisé.", 'error');
              }
            }
          }
        });
      });
      

/* =============================== Evenement click bouton Ouvrir et Fermer ============================*/

document.querySelectorAll(".btn-ouvrir-cargo, .btn-fermer-cargo").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest(".btn-ouvrir-cargo, .btn-fermer-cargo");

    if (target) {
      const cargaisonId = target.getAttribute("data-id");
      if (cargaisonId) {
        const cargaison = cargaisons.find(c => c.numero === cargaisonId);
        if (cargaison) {
          const isOuvrir = target.classList.contains("btn-ouvrir-cargo");

          if (isOuvrir) {
            if ((cargaison.etat_avancement === "EN ATTENTE" || cargaison.etat_avancement === "ARRIVÉE") && cargaison.etat_globale === "FERMÉE") {
              changerEtatCargaison(cargaisonId, 'ouvrir');
            } else {
              afficherAlerte("La cargaison ne peut pas être ouverte car elle est soit fermée, soit en cours.", "error");
            }
          } else {
            if (cargaison.etat_avancement === "EN ATTENTE" && cargaison.etat_globale === "OUVERTE") {
              changerEtatCargaison(cargaisonId, 'fermer');
            } else {
              afficherAlerte("La cargaison ne peut pas être fermée car elle n'est pas en attente ou déjà fermée.", "error");
            }
          }
        } else {
          console.error("Cargaison non trouvée.");
        }
      } else {
        console.error("ID de cargaison non trouvé.");
      }
    }
  });
});


  updatePaginationControls(filteredCargaisons.length);
}

function updatePaginationControls(totalItems: number): void {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageDisplay = document.getElementById('pageDisplay');
  if (!pageDisplay) return;

  pageDisplay.innerText = `Page ${currentPage}`;

  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');

  if (prevPage && nextPage) {
    (prevPage as HTMLButtonElement).disabled = currentPage === 1;
    (nextPage as HTMLButtonElement).disabled = currentPage === totalPages;
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
function changerEtatAvancement(cargaisonId: string | null, newEtat: string): void {
  if (!cargaisonId) return;

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
      } else {
        alert("Erreur lors de la mise à jour de l'état d'avancement");
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour de l'état d'avancement");
    });
}

//
function changerEtatCargaison(cargaisonId: string | null, action: 'ouvrir' | 'fermer'): void {
  if (!cargaisonId) {
    console.error("cargaisonId is null");
    return;
  }

  const apiAction = action === 'ouvrir' ? 'ouvrirCargaison' : 'fermerCargaison';

  fetch("../template/api.php", {
    method: "POST",
    body: JSON.stringify({
      action: apiAction,
      id: cargaisonId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const message = action === 'ouvrir' ? "La cargaison est en État OUVERTE" : "La cargaison est FERMÉE avec succès";
        afficherAlerte(message, data.status);
        afficherCargaisons(); // Rafraîchir le tableau après ouverture ou fermeture
      } else {
        const message = action === 'ouvrir' ? "Erreur lors de l'ouverture de la cargaison : " : "Erreur lors de la fermeture de la cargaison : ";
        alert(message + data.message);
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      const message = action === 'ouvrir' ? "Erreur lors de l'ouverture de la cargaison" : "Erreur lors de la fermeture de la cargaison";
      alert(message);
    });
}
function changeEtatProduit(numPro: string | null, newEtatPro: string, id: string | null): void {
  console.log('Changing state for product:', numPro, 'to:', newEtatPro, 'with cargo id:', id);

  if (!numPro) return;

  fetch("../template/api.php", {
    method: "POST",
    body: JSON.stringify({
      action: "changerEtatProduit",
      numero: numPro,
      nouvelEtat: newEtatPro,
      idcargo: id
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response data:', data);
      if (data.status === "success") {
        afficherAlerte("État du produit mis à jour avec succès", data.status);
        afficherCargaisons();
      } else {
        alert("Erreur lors de la mise à jour de l'état du produit");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/* =========================== Ajouter cargaison ======================================= */
let cargaison: Cargaison;
let produit: Product;

document.getElementById('form_id')?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }
  /* ====================== Recupération des données formulaire Cargaison ===================================== */
  const idcargo: number = Cargaison.length + 1;
  const typeCargaison: string = (document.getElementById('type') as HTMLSelectElement).value;
  const numero: string = "CRG" + Math.floor(Math.random() * 1000);  // Générer un numéro aléatoire pour la cargaison
  const poidsCargaison: number = parseFloat((document.getElementById('poids') as HTMLInputElement).value);
  const nbrProduitMax: number = parseFloat((document.getElementById('produit') as HTMLInputElement).value);
  const pointDepart: string = (document.getElementById('depart') as HTMLInputElement).value;
  const pointArrive: string = (document.getElementById('arrivee') as HTMLInputElement).value;
  const dateDepart: string = (document.getElementById('dateDepart') as HTMLInputElement).value;
  const dateArrivee: string = (document.getElementById('dateArrivee') as HTMLInputElement).value;
  const distance: number = parseFloat((document.getElementById('distance') as HTMLInputElement).value);



  if (typeCargaison == "maritime") {
    cargaison = new CargaisonMaritime(
      'addCargaison',
      idcargo,
      numero,
      typeCargaison,
      poidsCargaison,
      nbrProduitMax,
      pointDepart,
      pointArrive,
      dateDepart,
      dateArrivee,
      distance,
      'EN ATTENTE',
      'OUVERTE',
      []
    );
    

  } else if (typeCargaison == "aerienne") {
    cargaison = new CargaisonAerienne(
      'addCargaison',
      idcargo,
      numero,
      typeCargaison,
      poidsCargaison,
      nbrProduitMax,
      pointDepart,
      pointArrive,
      dateDepart,
      dateArrivee,
      distance,
      'EN ATTENTE',
      'OUVERTE',
      []
    );  
  
  } else if (typeCargaison == "routier") {
    cargaison = new CargaisonRoutier(
      'addCargaison',
      idcargo,
      numero,
      typeCargaison,
      poidsCargaison,
      nbrProduitMax,
      pointDepart,
      pointArrive,
      dateDepart,
      dateArrivee,
      distance,
      'EN ATTENTE',
      'OUVERTE',
      []
    );
    
  } else {
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
      }else if(result.status === "error"){
        afficherAlerte(result.message,result.status);
      }
      else {
        alert('Erreur lors de l\'ajout de la cargaison');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout de la cargaison');
    });

    document.getElementById('form_id')?.onreset;
});
/* ============================= Ajouter Produit ===================================== */
document.getElementById('addProduct')?.addEventListener('click', (event) => {
  event.preventDefault();

  const numeroPro: string = "PRO" + Math.floor(Math.random() * 1000);
  const nomProduit: string = (document.getElementById('nomProduit') as HTMLSelectElement).value;
  const poidsProduit: number = parseFloat((document.getElementById('poidsProduct') as HTMLInputElement).value);
  const etatProduit: string = (document.getElementById('productState') as HTMLSelectElement).value;
  const typeProduit: string = (document.getElementById('productType') as HTMLSelectElement).value;
  const toxiciteProduit: number = parseFloat((document.getElementById('productToxicity') as HTMLSelectElement).value);
  const prix: number = parseFloat((document.getElementById('productPrice') as HTMLSelectElement).value);
  const expéditeurePrenom: string = (document.getElementById('clientLastName') as HTMLSelectElement).value;
  const expéditeureNom = (document.getElementById('clientFirstName') as HTMLSelectElement).value;
  const expéditeureTelephone = parseFloat((document.getElementById('clientPhone') as HTMLSelectElement).value);
  const expéditeureAdresse = parseFloat((document.getElementById('Address') as HTMLInputElement).value);
  const expéditeureEmail = (document.getElementById('clientMail') as HTMLSelectElement).value;
  const destinataireNom = (document.getElementById('nomDestin') as HTMLSelectElement).value;
  const destinatairePrenom = (document.getElementById('prenomDestin') as HTMLSelectElement).value;
  const destinataireTelephone = parseFloat((document.getElementById('TelDestin') as HTMLSelectElement).value);
  const destinataireAdresse = parseFloat((document.getElementById('addressDestin') as HTMLSelectElement).value);
  const destinataireEmail = (document.getElementById('MailDestin') as HTMLSelectElement).value;
console.log(poidsProduit);

const limite = limitationProduit(id);
console.log(limite);

if (limite == true){
  let clientApport: Clients = { nom: expéditeureNom, prenom: expéditeurePrenom, tel: expéditeureTelephone, adresse: expéditeureAdresse, email: expéditeureEmail };
  let destinataire: Clients = { nom: destinataireNom, prenom: destinatairePrenom, tel: destinataireTelephone, adresse: destinataireAdresse, email: destinataireEmail }

  if (typeProduit === 'alimentaire') {
    produit = new FoodProduct('addproduit', numeroPro, nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire);
  } else if (typeProduit === 'chimique') {
    produit = new ChemicalProduct('addproduit', numeroPro, nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire, toxiciteProduit);  
  } else if (typeProduit === 'incassable') {
    produit = new FragileMaterial('addproduit', numeroPro, nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire);  
  } else if (typeProduit === 'cassable') {
    produit = new unbreackableMaterial('addproduit', numeroPro, nomProduit, poidsProduit, etatProduit, prix, clientApport, destinataire); 
  } else {
    afficherAlerte("Type de produit invalide", "error");
    return;
  }

  console.log(produit);
    
  const donne = {
    "action": "addproduit",
    "produit": produit,
    "idcargo": id
  }
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
        afficherAlerte("produit ajoutée avec succès", "success");
      }else if(result.status === "error"){
        afficherAlerte(result.message,result.status);
      } else {
        alert('Erreur lors de l\'ajout du produit');
      }
    })
}else{
  afficherAlerte("La cargaison ne peut pas dépasser le poids maximum autorisé.", "error");
  return;
}

});

/* ===================== Affichage Détail ================================= */
function showDetails(id: string | null, cargaisons: Cargaison[]) {
  const cargaisonIndex = cargaisons.findIndex(c => c.numero === id);
  if (cargaisonIndex === -1) {
    console.error(`Cargaison avec id ${id} non trouvée.`);
    return;
  }

  const cargaison = cargaisons[cargaisonIndex];

  (document.getElementById('detail-idcargo') as HTMLSpanElement).innerText = cargaison.numero.toString();
  (document.getElementById('detail-type') as HTMLSpanElement).innerText = cargaison.type;
  (document.getElementById('detail-lieu-depart') as HTMLSpanElement).innerText = cargaison.lieu_depart;
  (document.getElementById('detail-lieu-arrivee') as HTMLSpanElement).innerText = cargaison.lieu_arrivee;
  (document.getElementById('detail-date-depart') as HTMLSpanElement).innerText = cargaison.date_depart;
  (document.getElementById('detail-date-arrivee') as HTMLSpanElement).innerText = cargaison.date_arrivee;
  (document.getElementById('detail-distance') as HTMLSpanElement).innerText = cargaison.distance_km.toString();
  (document.getElementById('detail-etat-avancement') as HTMLSpanElement).innerText = cargaison.etat_avancement;

  const produitsContainer = document.getElementById('detail-produits') as HTMLDivElement;
  produitsContainer.innerHTML = ''; // Clear previous content

  cargaison.produits.forEach(produit => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow-md border border-blue-200';

    card.innerHTML = `
      <h4 class="text-lg font-semibold text-blue-700">${produit.nom}</h4>
      <p><strong class="text-blue-700">Poids:</strong> <span class="text-gray-700">${produit.poids} kg</span></p>
      <p><strong class="text-blue-700">EtatProduit:</strong> <span class="text-gray-700">${produit.etat}</span></p>
      <p><strong class="text-blue-700">ChangeEtat:</strong> 
        <span class="text-gray-700">
          <select id="etatPro-${produit.numPro}" data-id="${produit.numPro}" class="etat-avancement-select-pro" ${cargaison.etat_avancement !== 'ARRIVÉE' ? 'disabled' : ''}>
            <option value="en cours" ${produit.etat === "en cours" ? 'selected' : ''}>En cours</option>
            <option value="arrive" ${produit.etat === "arrive" ? 'selected' : ''}>Arrivé</option>
            <option value="perdu" ${produit.etat === "perdu" ? 'selected' : ''}>Perdu</option>
            <option value="recupere" ${produit.etat === "recupere" ? 'selected' : ''}>Recupere</option>
            <option value="archive" ${produit.etat === "archive" ? 'selected' : ''}>Archivé</option>
          </select>
        </span>
      </p>
      <p><strong class="text-blue-700">Client Apport:</strong></p>
      <ul class="list-disc list-inside text-gray-700">
        <li><strong class="text-blue-700">Nom:</strong> ${produit.clientApport.nom}</li>
        <li><strong class="text-blue-700">Prénom:</strong> ${produit.clientApport.prenom}</li>
        <li><strong class="text-blue-700">Téléphone:</strong> ${produit.clientApport.tel}</li>
        <li><strong class="text-blue-700">Adresse:</strong> ${produit.clientApport.adresse}</li>
        <li><strong class="text-blue-700">Email:</strong> ${produit.clientApport.email}</li>
      </ul>
      <p><strong class="text-blue-700">Destinataire:</strong></p>
      <ul class="list-disc list-inside text-gray-700">
        <li><strong class="text-blue-700">Nom:</strong> ${produit.destinataire.nom}</li>
        <li><strong class="text-blue-700">Prénom:</strong> ${produit.destinataire.prenom}</li>
        <li><strong class="text-blue-700">Téléphone:</strong> ${produit.destinataire.tel}</li>
        <li><strong class="text-blue-700">Adresse:</strong> ${produit.destinataire.adresse}</li>
        <li><strong class="text-blue-700">Email:</strong> ${produit.destinataire.email}</li>
      </ul>
    `;

    produitsContainer.appendChild(card);

    // Ajout du gestionnaire d'événement pour changer l'état du produit
    const selectElement = card.querySelector(`#etatPro-${produit.numPro}`);
    selectElement?.addEventListener('change', function (event) {
      const newEtatPro = (selectElement as HTMLSelectElement).value;
      const target = event.target as HTMLElement;
      const idPro = target.getAttribute('data-id');
      changeEtatProduit(idPro, newEtatPro, id);
    });
  });
}


/* ======================= Fonction d'affichage d'alerte personnalisée ===================================== */
function afficherAlerte(message: string, type: string) {
  let alertDiv = document.getElementById("alert") as HTMLDivElement;
  let alertContent = document.getElementById("alertContent") as HTMLElement;
  let alertIcon = document.getElementById("alertIcon") as HTMLElement;
  
  // Remove any previous color and icon classes
  alertContent.classList.remove('bg-green-200', 'text-green-800', 'bg-red-200', 'text-red-800', 'bg-blue-200', 'text-blue-800');
  alertIcon.className = '';
  
  switch(type) {
    case 'success':
      alertContent.classList.add('text-green-800', 'text-lg');
      alertIcon.classList.add('fas', 'fa-check-circle', 'text-green-800');
      break;
    case 'error':
      alertContent.classList.add('text-red-800', 'text-lg');
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


/* ================== Limitatio  de cargaison ========================================= */
  function limitationProduit(id: string | null) {
    const cargaisonIndex = cargaisons.findIndex(c => c.numero === id);
    if (cargaisonIndex === -1) {
      console.error(`Cargaison avec id ${id} non trouvée.`);
      return;
    }
  
    const cargaison = cargaisons[cargaisonIndex];
    const poidsTotalProduits = cargaison.produits.reduce((total, produit) => total + produit.poids, 0);
    
    if (cargaison.poids_max !== null && poidsTotalProduits > cargaison.poids_max) {
      afficherAlerte("La cargaison ne peut pas dépasser le poids maximum autorisé.", "error");
      return false;
    }
  
    if (cargaison.nbr_prod_max !== null && cargaison.produits.length > cargaison.nbr_prod_max) {
      afficherAlerte("La cargaison ne peut pas contenir plus de produits que le nombre maximum autorisé.", "error");
      return false;
    }

    return true
  
  }