<main class="container mx-auto py-4 px-8 w-full bg-white rounded-lg shadow-lg flex flex-col gap-2">
    <h2 class="text-2xl font-bold mb-1 text-center">Liste des Cargaisons</h2>

    <!-- Bouton pour afficher le formulaire de création de cargaison -->
    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" id="add_modal">add</button>
    </div>
    <!-- <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
  <i class="material-icons">add</i>
</button> -->
    <!-- <button id="add_modal" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add</button> -->


    <!-- <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button> -->
    <!-- <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab"id="add_modal"> 
    <i class="material-icons" >add</i>
</button> -->
    <!-- Colored mini FAB button -->
    <!-- <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
      <i class="material-icons">add</i>
    </button> -->

   <!-- Filtres -->
<div class="flex flex-wrap gap-4 mb-4 h-20 justify-between items-center p-2">
    <div class="flex-1 min-w-[200px]">
        <label for="numeroFilter" class="block font-medium">Filtrer par Numéro :</label>
        <input type="text" id="numeroFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
    </div>
    <div class="flex-1">
        <label for="typeFilter" class="block font-medium">Filtrer par Type :</label>
        <select id="typeFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 py-3">
            <option value="">Tous</option>
            <option value="maritime">Maritime</option>
            <option value="aérienne">Aérienne</option>
            <option value="routière">Routière</option>
        </select>
    </div>
    <div class="flex-1">
        <label for="etatFilter" class="block font-medium">Filtrer par État d'Avancement :</label>
        <select id="etatFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
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
        <input type="text" id="destinationFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
    </div>
    <div class="flex-1 min-w-[200px]">
        <label for="departFilter" class="block font-medium">Filtrer par Lieu de Départ :</label>
        <input type="text" id="departFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
    </div>
    <div class="flex-1 min-w-[200px]">
        <label for="dateDepartFilter" class="block font-medium">Filtrer par Date de Départ :</label>
        <input type="date" id="dateDepartFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
    </div>
    <div class="flex-1 min-w-[200px]">
        <label for="dateArriveeFilter" class="block font-medium">Filtrer par Date d'Arrivée :</label>
        <input type="date" id="dateArriveeFilter" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-3">
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

        <?php
        $mes_donnees = file_get_contents('../public/data/cargos.json');
        $cargaisonPhp = json_decode($mes_donnees, true)['cargaisons'];
        ?>
        <tbody id="cargaisonbody" class="bg-white divide-y divide-gray-200">
            <!-- Exemple de ligne de cargaison -->
            <?php foreach ($cargaisonPhp as $cargaisons) {

            ?>
                <tr>

                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['numero'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['type'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['lieu_depart'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['lieu_arrivee'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['date_depart'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['date_arrivee'] ?></td>
                    <td class="px-6 py-4 whitespace-nowrap"><?= $cargaisons['distance_km'] ?></td>
                    <td class="bg-red"></td>
                </tr>
            <?php } ?>

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

<div id="my-modal" class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hidden absolute z-20 top-8 left-1/2">
    <h2 class="text-2xl font-bold mb-4">Formulaire de création de Cargaison</h2>
    <form class="space-y-4" id="form_id">
        <div>
            <label for="limitation" class="block font-medium">Type de Limitation :</label>
            <select id="limitation" name="limitation" class="select select-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                <option value="">Sélectionner</option>
                <option value="poids">Poids</option>
                <option value="produit">Produit</option>
            </select>
        </div>
        <div id="poidsField" class="hidden">
            <label for="poids" class="block font-medium">Poids :</label>
            <input type="text" id="poids" name="poids" class="input input-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
            <span id="poidsError" class="text-red-500 text-sm hidden">Veuillez entrer un poids valide.</span>
        </div>
        <div id="produitField" class="hidden">
            <label for="produit" class="block font-medium">Produit :</label>
            <input type="text" id="produit" name="produit" class="input input-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
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
        <div id="map" class="mt-4"></div>
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
        <div class="flex justify-between">
            <button type="submit" id="valider" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Créer la Cargaison</button>
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" id="close">Fermer</button>
        </div>
    </form>
</div>










<!--   Modal 
     <div id="modal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center hidden">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold mb-4">Formulaire de création de Cargaison</h2>
            <form class="space-y-4" id="form_id">
                <div>
                    <label for="numero" class="block font-medium">Numéro :</label>
                    <input type="text" id="numero" name="numero" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                    <span id="numeroError" class="text-red-500 text-sm hidden">Veuillez entrer un numéro valide.</span>
                </div>
                <div>
                    <label for="limitation" class="block font-medium">Type de Limitation :</label>
                    <select id="limitation" name="limitation" class="select select-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                        <option value="">Sélectionner</option>
                        <option value="poids">Poids</option>
                        <option value="produit">Produit</option>
                    </select>
                </div>
                <div id="poidsField" class="hidden">
                    <label for="poids" class="block font-medium">Poids :</label>
                    <input type="text" id="poids" name="poids" class="input input-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                    <span id="poidsError" class="text-red-500 text-sm hidden">Veuillez entrer un poids valide.</span>
                </div>
                <div id="produitField" class="hidden">
                    <label for="produit" class="block font-medium">Produit :</label>
                    <input type="text" id="produit" name="produit" class="input input-bordered w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
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
                <div id="map" class="mt-4"></div>
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
                <div class="flex justify-between">
                    <button type="submit" id="valider" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Créer la Cargaison</button>
                    <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" id="close-modal">Fermer</button>
                </div>
            </form>
        </div>
    </div>
 -->