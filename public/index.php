<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion de Cargaison</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@1.14.3/dist/full.css" rel="stylesheet"> -->
    <!-- Ajouter le script pour Leaflet.js -->
    <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /> -->
    <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>> -->
    <!-- <script type="module" src=""></script>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    Material Design icon font -->
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <style>
        #map {
            height: 400px;
            
        }
        .produit{
            z-index: 1;
            position: fixed;
        } -->

        <!-- /* .modal { display: none; }
    .modal.show { display: block; }
   */
    </style>
</head>

<body class="font-sans bg-gray-100 text-gray-900 h-screen">
    <header class="bg-blue-900 text-white py-4">
        <div class="container mx-auto flex justify-between items-center px-4">
            <div class="flex items-center">
                <img src="" alt="Logo de l'application" class="h-8 mr-2">
                <h1 class="text-2xl font-bold ">Gestion de Cargaison</h1>
            </div> -->
            <!-- <nav>
                <ul class="flex ">
                    <li class="ml-6"><a href="#" class="hover:text-gray-300">Accueil</a></li>
                    <li class="ml-6"><a href="#" class="hover:text-gray-300">Gestion des Cargaisons</a></li>
                    <li class="ml-6"><a href="#" class="hover:text-gray-300">Suivi des Colis</a></li>
                    <li class="ml-6"><a href="#" class="hover:text-gray-300">Paramètres</a></li>
                </ul>
            </nav> -->
            <!-- <div class="flex items-center space-x-4">
                <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs rounded-full px-4 py-2">
                <img src="" alt="Profile Picture" class="rounded-full w-10 h-10 text-gray-900">
            </div>
        </div>
    </header> -->
    <!-- <header class=" text-white shadow-md py-4 rounded-lg mx-4 my-4">
        <div class="container mx-auto flex justify-between items-center px-4">
            <div class="flex items-center">
            <img src="../images/logos.jpeg" alt="Logo de l'application" class="h-20 mr-2 bg-blue-900">
                <h1 class="text-2xl font-bold ">Gestion de Cargaison</h1>
            </div>
            <div class="flex items-center space-x-4">
                <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs rounded-full px-4 py-2">
                <img src="https://via.placeholder.com/40" alt="Profile Picture" class="rounded-full w-10 h-10 text-gray-900">
            </div>
        </div>
    </header> -->

    <!-- <div class="flex h-full">
       <aside class="bg-gray-800 text-white w-1/6 py-8 px-4"> -->
  <!-- Contenu de la barre latérale -->
  <!-- <ul>
    <li class="mb-4 flex items-center">
      <i class="fas fa-box fa-2x mr-2"></i> Utilisation de fa-2x pour élargir l'icône 
      <a href="?page=Gestion des Cargaisons" class="hover:text-gray-300 text-lg">Gestion des Cargaisons</a>
    </li>
    <li class="mb-4 flex items-center">
      <i class="fas fa-truck fa-2x mr-2"></i>
      <a href="?page=Suivi des Colis" class="hover:text-gray-300 text-lg">Suivi des Colis</a>
    </li>
    <li class="mb-4 flex items-center">
      <i class="fas fa-cogs fa-2x mr-2"></i>
      <a href="?page=Paramètres" class="hover:text-gray-300 text-lg">Paramètres</a>
    </li>
  </ul>
</aside> -->



        <!-- <main class="container mx-auto py-8 px-8 w-4/5"> -->
            <!-- Ajoutez ici le contenu principal de chaque module -->
            <!-- 
            // $page = isset($_GET['page']) ? $_GET['page'] : 'Gestion des Cargaisons';
            // if (isset($_GET['page'])) {
                // $page = $_GET['page'];
                // if ($page === 'Gestion des Cargaisons') {
                    // include '../template/cargaison.php';
                // } elseif ($page === 'Suivi des Colis') {
                    // include '../template/colis.php';
                // } elseif ($page === 'Paramètres') {
                    // include '../template/parametre.php';
                // } else {
                    // echo "<p>Page non trouvée.</p>";
                // }
            // } else {
                // include '../template/cargaison.php';
            }
            // 
        </main>
    </div>

    <footer class="bg-blue-900 text-white py-4 mt-8 fixed bottom-0 w-full">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 Gestion de Cargaison. Tous droits réservés.</p>
        </div>
    </footer>
    <script type="module" src="../dist/test.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script>
        let map, startMarker, endMarker;
        let startPoint, endPoint; -->

        <!-- map = L.map('map').setView([0, 0], 2); // Change to world view
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Event listener to handle map click
        map.on('click', function(e) {
            if (!startPoint) {
                startPoint = e.latlng;
                startMarker = L.marker(startPoint, {
                    draggable: true
                }).addTo(map);
                reverseGeocode(startPoint, 'depart');

                // Add event listener to handle startMarker click for deselection
                startMarker.on('click', function() {
                    map.removeLayer(startMarker);
                    startPoint = null;
                    document.getElementById('depart').value = '';
                    document.getElementById('distance').value = '';
                });
            } else if (!endPoint) {
                endPoint = e.latlng;
                endMarker = L.marker(endPoint, {
                    draggable: true
                }).addTo(map);
                reverseGeocode(endPoint, 'arrivee');
                calculateDistance();

                // Add event listener to handle endMarker click for deselection
                endMarker.on('click', function() {
                    map.removeLayer(endMarker);
                    endPoint = null;
                    document.getElementById('arrivee').value = '';
                    document.getElementById('distance').value = '';
                });
            }
        });

        function reverseGeocode(latlng, elementId) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
                .then(response => response.json())
                .then(data => {
                    if (data.address) {
                        document.getElementById(elementId).value = data.address.city || data.address.town || data.address.village || data.address.country || '';
                    } else {
                        document.getElementById(elementId).value = '';
                        console.error('Address not found for the provided coordinates.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching address data:', error);
                    document.getElementById(elementId).value = '';
                });
        }

        function calculateDistance() {
            if (startPoint && endPoint) {
                const distance = map.distance(startPoint, endPoint) / 1000; // Convert to km
                document.getElementById('distance').value = distance.toFixed(2);
            }
        }


        function resetMap() {
            if (startMarker) map.removeLayer(startMarker);
            if (endMarker) map.removeLayer(endMarker);
            startPoint = null;
            endPoint = null;
            document.getElementById('depart').value = '';
            document.getElementById('arrivee').value = '';
            document.getElementById('distance').value = '';
        }
    </script>

</body>

</html> -->


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion de Cargaison</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@1.14.3/dist/full.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script type="module" src=""></script>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <style>
        #map {
            height: 400px;
        }

        .produit {
            z-index: 1;
            position: fixed;
        }

        /* .modal { display: none; }
        .modal.show { display: block; }
        */
    </style>
</head>

<body class="font-sans bg-gray-100 text-gray-900 h-screen flex flex-col">
    <header class="bg-blue-900 text-white py-4">
        <div class="container mx-auto flex justify-between items-center px-4">
            <div class="flex items-center">
                <img src="" alt="Logo de l'application" class="h-8 mr-2">
                <h1 class="text-2xl font-bold">Gestion de Cargaison</h1>
            </div>
            <div class="flex items-center space-x-4">
                <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs rounded-full px-4 py-2">
                <img src="" alt="Profile Picture" class="rounded-full w-10 h-10 text-gray-900">
            </div>
            <button id="nav-toggle" class="lg:hidden text-gray-200">
                <i class="fas fa-bars fa-2x"></i>
            </button>
        </div>
    </header>

    <div class="flex flex-1">
        <aside class="bg-gray-800 text-white w-full md:w-1/4 lg:w-1/6 py-8 px-4">
            <ul>
                <li class="mb-4 flex items-center">
                    <i class="fas fa-box fa-2x mr-2"></i>
                    <a href="?page=Gestion des Cargaisons" class="hover:text-gray-300 text-lg">Gestion des Cargaisons</a>
                </li>
                <li class="mb-4 flex items-center">
                    <i class="fas fa-truck fa-2x mr-2"></i>
                    <a href="?page=Suivi des Colis" class="hover:text-gray-300 text-lg">Suivi des Colis</a>
                </li>
                <li class="mb-4 flex items-center">
                    <i class="fas fa-cogs fa-2x mr-2"></i>
                    <a href="?page=Paramètres" class="hover:text-gray-300 text-lg">Paramètres</a>
                </li>
            </ul>

        </aside>

        <main class="container mx-auto py-8 px-4 w-full md:w-3/4 lg:w-5/6">
            <?php
            $page = isset($_GET['page']) ? $_GET['page'] : 'Gestion des Cargaisons';
            if (isset($_GET['page'])) {
                $page = $_GET['page'];
                if ($page === 'Gestion des Cargaisons') {
                    include '../template/cargaison.php';
                } elseif ($page === 'Suivi des Colis') {
                    include '../template/colis.php';
                } elseif ($page === 'Paramètres') {
                    include '../template/parametre.php';
                } else {
                    echo "<p>Page non trouvée.</p>";
                }
            } else {
                include '../template/cargaison.php';
            }
            ?>
        </main>
    </div>

    <footer class="bg-blue-900 text-white py-4 mt-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 Gestion de Cargaison. Tous droits réservés.</p>
        </div>
    </footer>
    <script type="module" src="../dist/test.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script>
        let map, startMarker, endMarker;
        let startPoint, endPoint;

        map = L.map('map').setView([0, 0], 2); // Change to world view
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        map.on('click', function (e) {
            if (!startPoint) {
                startPoint = e.latlng;
                startMarker = L.marker(startPoint, {
                    draggable: true
                }).addTo(map);
                reverseGeocode(startPoint, 'depart');

                startMarker.on('click', function () {
                    map.removeLayer(startMarker);
                    startPoint = null;
                    document.getElementById('depart').value = '';
                    document.getElementById('distance').value = '';
                });
            } else if (!endPoint) {
                endPoint = e.latlng;
                endMarker = L.marker(endPoint, {
                    draggable: true
                }).addTo(map);
                reverseGeocode(endPoint, 'arrivee');
                calculateDistance();

                endMarker.on('click', function () {
                    map.removeLayer(endMarker);
                    endPoint = null;
                    document.getElementById('arrivee').value = '';
                    document.getElementById('distance').value = '';
                });
            }
        });

        function reverseGeocode(latlng, elementId) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
                .then(response => response.json())
                .then(data => {
                    if (data.address) {
                        document.getElementById(elementId).value = data.address.city || data.address.town || data.address.village || data.address.country || '';
                    } else {
                        document.getElementById(elementId).value = '';
                        console.error('Address not found for the provided coordinates.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching address data:', error);
                    document.getElementById(elementId).value = '';
                });
        }

        function calculateDistance() {
            if (startPoint && endPoint) {
                const distance = map.distance(startPoint, endPoint) / 1000; // Convert to km
                document.getElementById('distance').value = distance.toFixed(2);
            }
        }

        function resetMap() {
            if (startMarker) map.removeLayer(startMarker);
            if (endMarker) map.removeLayer(endMarker);
            startPoint = null;
            endPoint = null;
            document.getElementById('depart').value = '';
            document.getElementById('arrivee').value = '';
            document.getElementById('distance').value = '';
        }
    </script>
</body>

</html>
