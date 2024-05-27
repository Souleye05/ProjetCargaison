<main class="container mx-auto py-8 px-4 w-4/5 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Liste des Cargaisons</h2>

    <!-- Bouton pour afficher le formulaire de création de cargaison -->
    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" id="add_modal">add</button>
    </div>
    <!-- Filtres -->
<div class="flex flex-wrap gap-4 mb-4">
  <div class="flex-1 min-w-[200px]">
    <label for="typeFilter" class="block font-medium">Filtrer par Type :</label>
    <select id="typeFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <option value="">Tous</option>
      <option value="maritime">Maritime</option>
      <option value="aérienne">Aérienne</option>
      <option value="routière">Routière</option>
    </select>
  </div>

  <div class="flex-1 min-w-[200px]">
    <label for="etatFilter" class="block font-medium">Filtrer par État d'Avancement :</label>
    <select id="etatFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <option value="">Tous</option>
      <option value="en_attente">En Attente</option>
      <option value="en_cours">En Cours</option>
      <option value="arrivé">Arrivé</option>
      <option value="récupéré">Récupéré</option>
      <option value="perdu">Perdu</option>
      <option value="archivé">Archivé</option>
    </select>
  </div>

  <div class="flex-1 min-w-[200px]">
    <label for="destinationFilter" class="block font-medium">Filtrer par Destination :</label>
    <input type="text" id="destinationFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
  </div>
</div>

<!-- Tableau des cargaisons -->
<table id="cargaisonTable" class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu de départ</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu d'arrivée</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de départ</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'arrivée</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
    </tr>
  </thead>
  <tbody id="cargaisonbody" class="bg-white divide-y divide-gray-200">
           <!-- Exemple de ligne de cargaison -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">12345</td>
                    <td class="px-6 py-4 whitespace-nowrap">Maritime</td>
                    <td class="px-6 py-4 whitespace-nowrap">En Cours</td>
                    <td class="px-6 py-4 whitespace-nowrap">New York</td>
                    <td class="px-6 py-4 whitespace-nowrap">12345</td>
                    <td class="px-6 py-4 whitespace-nowrap">Maritime</td>
                    <td class="px-6 py-4 whitespace-nowrap">En Cours</td>
                    <td class="px-6 py-4 whitespace-nowrap">New York</td>
                </tr>
                <!-- Ajoutez ici les autres lignes de cargaisons dynamiquement -->
            </tbody>
        </table>
        <div class="join float-right" id="pagination-controls">
            <button class="join-item btn">«</button>
            <button class="join-item btn">Page 22</button>
            <button class="join-item btn">»</button>
        </div>
    </div>
</main>


    <!-- ---------------------------------Formulaire d'ajout de cargaison -------------------------------------------------------->

<div id="my-modal" class="">
  <h2 class="text-2xl font-bold mb-4">Formulaire de création de Cargaison</h2>
  <form class="space-y-4" id="form_id">
    <div>
      <label for="numero" class="block font-medium">Numéro :</label>
      <input type="text" id="numero" name="numero" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="numeroError" class="text-red-500 text-sm hidden">Veuillez entrer un numéro valide.</span>
    </div>
    <div>
      <label for="limitation" class="block font-medium">Type de Limitation :</label>
      <select id="limitation" name="limitation" class="select select-bordered w-full">
        <option value="">Sélectionner</option>
        <option value="poids">Poids</option>
        <option value="produit">Produit</option>
      </select>
    </div>
    <div id="poidsField" class="hidden">
      <label for="poids" class="block font-medium">Poids :</label>
      <input type="text" id="poids" name="poids" class="input input-bordered w-full">
      <span id="poidsError" class="text-red-500 text-sm hidden">Veuillez entrer un poids valide.</span>
    </div>
    <div id="produitField" class="hidden">
      <label for="produit" class="block font-medium">Produit :</label>
      <input type="text" id="produit" name="produit" class="input input-bordered w-full">
      <span id="produitError" class="text-red-500 text-sm hidden">Veuillez entrer un produit valide.</span>
    </div>
    <div>
      <label for="type" class="block font-medium">Type :</label>
      <select id="type" name="type" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
        <option value="maritime">Maritime</option>
        <option value="aérienne">Aérienne</option>
        <option value="routière">Routière</option>
      </select>
    </div>
    <div>
      <label for="depart" class="block font-medium">Lieu de départ :</label>
      <input type="text" id="depart" name="depart" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="departError" class="text-red-500 text-sm hidden">Veuillez entrer un lieu de départ valide.</span>
    </div>
    <div>
      <label for="arrivee" class="block font-medium">Lieu d'arrivée :</label>
      <input type="text" id="arrivee" name="arrivee" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="arriveeError" class="text-red-500 text-sm hidden">Veuillez entrer un lieu d'arrivée valide.</span>
    </div>
    <div>
      <label for="dateDepart" class="block font-medium">Date de départ :</label>
      <input type="date" id="dateDepart" name="dateDepart" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="dateDepartError" class="text-red-500 text-sm hidden">Veuillez entrer une date de départ valide.</span>
    </div>
    <div>
      <label for="dateArrivee" class="block font-medium">Date d'arrivée :</label>
      <input type="date" id="dateArrivee" name="dateArrivee" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="dateArriveeError" class="text-red-500 text-sm hidden">Veuillez entrer une date d'arrivée valide.</span>
    </div>
    <div>
      <label for="distance" class="block font-medium">Distance :</label>
      <input type="text" id="distance" name="distance" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
      <span id="distanceError" class="text-red-500 text-sm hidden">Veuillez entrer une distance valide.</span>
    </div>
    <div>
      <button type="submit" id="valider" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Créer la Cargaison</button>
    </div>
    <div>
      <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" id="close">Fermer</button>
    </div>
  </form> 
</div>


 