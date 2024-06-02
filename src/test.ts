import { Cargaison, CargaisonMaritime, CargaisonAerienne, CargaisonRoutier } from './modele/cargaison.js';
import { Product, FoodProduct, ChemicalProduct, MaterialProduct, FragileMaterial, unbreackableMaterial } from './modele/produit.js';
/* ==============================Modal formulaire ADD CARGO ============================================== */

const openModalButton = document.getElementById("add_modal");
openModalButton?.addEventListener("click", () => {;
  const modal = document.getElementById("my-modal")
  
  if (openModalButton && modal) {
          modal?.classList.remove("hidden");
        }   
        /*  ----- close button -----------*/
        document.getElementById('close')?.addEventListener('click', function() {
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
 
document.getElementById('productType')?.addEventListener("change", function(){
  const typeProduit = (document.getElementById('productType') as HTMLSelectElement).value;
  console.log("productType");
  const degreToxicite = (document.getElementById('productToxicity') as HTMLInputElement);
    
    if (typeProduit == 'chimique'){
       degreToxicite?.classList.remove('hidden');
    }else{
        degreToxicite?.classList.add('hidden');
    }
});


// ====================================Validation of my field (formulaires) ==================================

// Function to validate the form
function validateForm(): boolean {
    let isValid: boolean = true;
  
    // Get form elements
    const numero: string = (document.getElementById('numero') as HTMLInputElement).value.trim();
    const limitation: string = (document.getElementById('limitation') as HTMLSelectElement).value;
    const poids: string = (document.getElementById('poids') as HTMLInputElement).value.trim();
    const produit: string = (document.getElementById('produit') as HTMLInputElement).value.trim();
    const depart: string = (document.getElementById('depart') as HTMLInputElement).value.trim();
    const arrivee: string = (document.getElementById('arrivee') as HTMLInputElement).value.trim();
    const dateDepart: string = (document.getElementById('dateDepart') as HTMLInputElement).value;
    const dateArrivee: string = (document.getElementById('dateArrivee') as HTMLInputElement).value;
    const distance: string = (document.getElementById('distance') as HTMLInputElement).value.trim();
  
    // Validate numero
    if (!numero) {
      showError('numeroError', 'Veuillez entrer un numéro valide.');
      isValid = false;
    } else {
      hideError('numeroError');
    }
  
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
  document.getElementById('form_id')?.addEventListener('submit', function(event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });
  
  /* ======================== Choix entre Produit et Poids ============================ */

  document.getElementById('limitation')?.addEventListener('change', function() {
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

/* ====================== Filtre et pagination ================================== */
let currentPage: number = 1;

const itemsPerPage: number = 5; 
let cargaisons: Cargaison[] = [];

function afficherCargaisons(): void {
    fetch('../template/api.php')
    .then(response => response.json())
      .then(data => {
        console.log(data);
        cargaisons = data.cargaisons;
        displayPage(currentPage);
      });
  }

  function displayPage(page: number): void {
    const numeroFilter = (document.getElementById('numeroFilter') as HTMLInputElement).value.toLowerCase();
    const typeFilter = (document.getElementById('typeFilter') as HTMLSelectElement).value.toLowerCase();
    const etatFilter = (document.getElementById('etatFilter') as HTMLSelectElement).value.toLowerCase();
    const destinationFilter = (document.getElementById('destinationFilter') as HTMLInputElement).value.toLowerCase();
    const departFilter = (document.getElementById('departFilter') as HTMLInputElement).value.toLowerCase();
    const dateDepartFilter = (document.getElementById('dateDepartFilter') as HTMLInputElement).value;
    const dateArriveeFilter = (document.getElementById('dateArriveeFilter') as HTMLInputElement).value;

    const filteredCargaisons = cargaisons.filter(cargaison => {
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_depart}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.date_arrivee}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance_km}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 btn-add"> <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"id="add_modal"><i class="material-icons" >add</i></button></td> 
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${cargaison.idcargo}">voir</button></td>
        `;
        cargaisonList.appendChild(row);
    });
    const btns= document.querySelectorAll(".btn-add");
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        (document.getElementById('mymodal1') as HTMLDialogElement).showModal()
        console.log('Added');
      })
     
      
    })
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
    
  document.getElementById('form_id')?.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;  
    }
  
    const idcargo: number = Cargaison.length +1;
    const typeCargaison: string = (document.getElementById('type') as HTMLSelectElement).value;
    const numero: string = "CRG" + Math.floor(Math.random() * 1000);  // Générer un numéro aléatoire pour la cargaison
    const poidsCargaison: number = parseFloat((document.getElementById('poids') as HTMLInputElement).value);
    const pointDepart: string = (document.getElementById('depart') as HTMLInputElement).value;
    const pointArrive: string = (document.getElementById('arrivee') as HTMLInputElement).value;
    const dateDepart: string = (document.getElementById('dateDepart') as HTMLInputElement).value;
    const dateArrivee: string = (document.getElementById('dateArrivee') as HTMLInputElement).value;
    const distance: number = parseFloat((document.getElementById('distance') as HTMLInputElement).value);
  
    const cargaison: Cargaison = new CargaisonMaritime(
      'addCargaison',
      idcargo,
      numero,
      typeCargaison,
      poidsCargaison,
      pointDepart,
      pointArrive,
      dateDepart,
      dateArrivee,
      distance
    );
  
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
          afficherCargaisons();  // Appel après succès
        } else {
          alert('Erreur lors de l\'ajout de la cargaison');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de la cargaison');
      });
  });
  
    
    



  

  
 