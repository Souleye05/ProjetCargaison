<main class="container mx-auto py-4 px-8 w-full bg-white rounded-lg shadow-lg flex flex-col gap-2">
    <h2 class="text-2xl font-bold mb-1 text-center">Liste des Cargaisons</h2>

    <!-- ============= Bouton pour afficher le formulaire de création de cargaison =============================== -->
    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" id="add_modal">add</button>
    </div>

    <!-- -================= Formulaire d'ajout produit dans cargaison  =================== ---->

<dialog id="mymodal1" class="produit"> 
    <div class="bg-white p-6 rounded-lg shadow-lg border w-full flex" style="width:100%">
        <form method="dialog" class="border-none">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button> 
        </form>
        <form id="addProductForm" class="" style="width:100%">
            <div class="flex flex-row space-y-10 gap-3">
                <!-- Produit Section -->
                <div class="mt-20">
                    <h3 class="text-md font-semibold text-gray-800 mb-2">Produit</h3>
                    <div class="mb-4">
                        <label for="productName" class="block text-gray-700">Nom du produit</label>
                        <input type="text" id="nomProduit" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="productType" class="block text-gray-700">Type de produit</label>
                        <select id="productType" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Sélectionner</option>
                            <option value="alimentaire">Alimentaire</option>
                            <option value="chimique">chimique</option>
                            <option value="incassable">incassable</option>
                            <option value="fragile">fragile</option>
                        </select>
                        <!-- <span>ce type de produit</span> -->
                    </div>
                    <div class="mb-4 hidden" id="productToxicity">
                        <label for="productToxicity" class="block text-gray-700">Toxicity</label>
                        <input type="text" id="productToxicity" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                    <div class="mb-4">
                        <label for="productWeight" class="block text-gray-700">Poids</label>
                        <input type="text" id="productWeight" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                    <div class="mb-4">
                        <label for="productPrice" class="block text-gray-700">Prix</label>
                        <input type="text" id="productPrice" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                </div>
                <!-- Client Section -->
                <div>
                    <h3 class="text-md font-semibold text-gray-800 mb-2">Informations du client</h3>
                    <div class="mb-4">
                        <label for="clientFirstName" class="block text-gray-700">Nom du client</label>
                        <input type="text" id="clientFirstName" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                    <div class="mb-4">
                        <label for="clientLastName" class="block text-gray-700">Prenom du client</label>
                        <input type="text" id="clientLastName" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                    <div class="mb-4">
                        <label for="clientPhone" class="block text-gray-700">Numero de telephone</label>
                        <input type="text" id="clientPhone" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="clientAddress" class="block text-gray-700">Adresse</label>
                        <input type="text" id="clientAddress" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                    <div class="mb-4">
                        <label for="clientAddress" class="block text-gray-700">E-mail</label>
                        <input type="text" id="clientMail" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <!-- <span class="error">error</span> -->
                    </div>
                </div>
                <!-- Destinataire Section -->
                <div>
                    <h3 class="text-md font-semibold text-gray-800 mb-2">Informations du destinataire</h3>
                    <div class="mb-4">
                        <label for="recipientFirstName" class="block text-gray-700">Nom du destinataire</label>
                        <input type="text" id="nomDestin" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="recipientLastName" class="block text-gray-700">Prenom du destinataire</label>
                        <input type="text" id="prenomDestin" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="recipientAddress" class="block text-gray-700">téléphone du destinataire</label>
                        <input type="text" id="TelDestin" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="recipientAddress" class="block text-gray-700">Adresse du destinataire</label>
                        <input type="text" id="addressDestin" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="recipientAddress" class="block text-gray-700">E-mail du destinataire</label>
                        <input type="text" id="MailDestin" class="w-full px-4 py-2 border rounded-lg border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
            </div>
            <button type="button" id="addProduct" class="w-full text-gray-100 bg-blue-500   py-2 rounded-lg mt-6">Ajouter</button>
        </form>
    </div>
</dialog>



 
    <!-- <button id="add_modal" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add</button> -->


     <!-- <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button> 
    -->
   
    

   <!-- ============== cHAMPS À FILTRES ====================== -->
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
        <label for="etatFilter" class="block font-medium">Filtrer par État:</label>
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


    <!-- =========== Tableau des cargaisons ============== -->
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
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État Globale</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retirer Produit</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On/Off</th>
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
                    <td class="bg-red"><?= $cargaisons['etat_avancement'] ?></td>
                    <td class="bg-red"><?= $cargaisons[''] ?></td>
                    <td class="bg-red"><?= $cargaisons[''] ?></td>
                    <td class="bg-red"><?= $cargaisons[''] ?></td>
                </tr>
            <?php } ?>

            <!-- Ajoutez ici les autres lignes de cargaisons dynamiquement -->
        </tbody>
    </table>
    <div class="join float-right" id="pagination-controls">
    <button class="join-item btn" id="prevPage">«</button>
    <button class="join-item btn" id="pageDisplay">Page 1</button>
    <button class="join-item btn" id="nextPage">»</button>
</div>

    </div>
</main>


<!-- -================= Formulaire d'ajout de cargaison  =================== ---->

<div id="my-modal" class="bg-white p-8 rounded-lg shadow-lg w-2/4 hidden fixed inset-0 z-20 m-auto flex flex-col justify-center items-center">
    <h2 class="text-2xl font-bold mb-4">Formulaire de création de Cargaison</h2>
    <form class="space-y-4 w-full" id="form_id">
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
        <!-- Lieux de départ et d'arrivée sur la même ligne -->
        <div class="flex gap-4">
            <div class="flex-1">
                <label for="depart" class="block font-medium">Lieu de départ :</label>
                <input type="text" id="depart" name="depart" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                <span id="departError" class="text-red-500 text-sm hidden">Veuillez entrer un lieu de départ valide.</span>
            </div>
            <div class="flex-1">
                <label for="arrivee" class="block font-medium">Lieu d'arrivée :</label>
                <input type="text" id="arrivee" name="arrivee" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                <span id="arriveeError" class="text-red-500 text-sm hidden">Veuillez entrer un lieu d'arrivée valide.</span>
            </div>
        </div>
        <div id="map" class="mt-4"></div>
        <!-- Dates de départ et d'arrivée sur la même ligne -->
        <div class="flex gap-4 mb-4 h-20 justify-between items-center p-2">
            <div class="flex-1">
                <label for="dateDepart" class="block font-medium">Date de départ :</label>
                <input type="date" id="dateDepart" name="dateDepart" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                <span id="dateDepartError" class="text-red-500 text-sm hidden">Veuillez entrer une date de départ valide.</span>
            </div>
            <div class="flex-1">
                <label for="dateArrivee" class="block font-medium">Date d'arrivée :</label>
                <input type="date" id="dateArrivee" name="dateArrivee" class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                <span id="dateArriveeError" class="text-red-500 text-sm hidden">Veuillez entrer une date d'arrivée valide.</span>
            </div>
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


<div id="detail-modal" class="hidden fixed inset-0 flex items-center justify-center">
  <div class="bg-white p-4 rounded shadow-lg">
    <h2>Détails de la cargaison</h2>
    <p><strong>ID Cargaison:</strong> <span id="detail-idcargo"></span></p>
    <p><strong>Type:</strong> <span id="detail-type"></span></p>
    <p><strong>Lieu de départ:</strong> <span id="detail-lieu-depart"></span></p>
    <p><strong>Lieu d'arrivée:</strong> <span id="detail-lieu-arrivee"></span></p>
    <p><strong>Date de départ:</strong> <span id="detail-date-depart"></span></p>
    <p><strong>Date d'arrivée:</strong> <span id="detail-date-arrivee"></span></p>
    <p><strong>Distance (km):</strong> <span id="detail-distance"></span></p>
    <p><strong>État d'avancement:</strong> <span id="detail-etat-avancement"></span></p>
    <h3>Produits</h3>
    <ul id="detail-produits"></ul>
    <button id="close-modal">Fermer</button>
  </div>
</div>