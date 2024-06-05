
<?php
/* ------------lire le fichier json--------  */
function lireJSON($filename) {
    $json_data = file_get_contents($filename);
    if ($json_data === false) {
        error_log("Erreur de lecture du fichier $filename");
        return [];
    }
    return json_decode($json_data, true);
}
/* ------------écrire sur le fichier json--------  */
function ecrireJSON($filename, $data) {
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    if (file_put_contents($filename, $json_data) === false) {
        error_log("Erreur d'écriture dans le fichier $filename");
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action']) && $data['action'] == 'addCargaison') {
        $newCargaison = [
            "idcargo" => uniqid(),
            "numero" => $data['numero'],
            "type" => $data['type'],
            "poids" => $data['poids'],
            "lieu_depart" => $data['lieu_depart'],
            "lieu_arrivee" => $data['lieu_arrivee'],
            "date_depart" => $data['date_depart'],
            "date_arrivee" => $data['date_arrivee'],
            "distance_km" => $data['distance_km'],
            "etat_avancement" => $data['etat_avancement'],
            "etat_globale" => $data['etat_globale'],
            "produits" => $data['produits'],
        ];

        error_log("Nouvelle cargaison: " . print_r($newCargaison, true));

        $currentData = lireJSON('../public/data/cargos.json');
        if ($currentData === null) {
            error_log("Erreur de décodage JSON pour le fichier");
            echo json_encode(["status" => "error", "message" => "Erreur de lecture des données existantes"]);
            exit;
        }

        // $currentData['cargaisons'][] = $newCargaison;
        array_unshift( $currentData['cargaisons'], $newCargaison );
        ecrireJSON('../public/data/cargos.json', $currentData);

        // Re-lire le fichier pour vérifier
        $verifData = lireJSON('../public/data/cargos.json');
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
        exit;
    }elseif (isset($data['action']) && $data['action'] == 'addproduit'){

        $newProduit = $data ['produit'];
        $newId = $data ['idcargo'];

        $currentData = lireJSON('../public/data/cargos.json');

        foreach ($currentData['cargaisons'] as $key => $value){
            if ($value['numero'] == $newId){
                $currentData['cargaisons'][$key]['produits'][] = $newProduit;
            }
        }

        ecrireJSON('../public/data/cargos.json', $currentData);
        $verifData = lireJSON('../public/data/cargos.json');
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "produit ajoutée avec succès"]);
        exit;
    }
    elseif (isset($data['action']) && $data['action'] == 'fermerCargaison'){

       
        $newId = $data ['id'];

        $currentData = lireJSON('../public/data/cargos.json');

        foreach ($currentData['cargaisons'] as $key => $value){
            if ($value['numero'] == $newId){
                $currentData['cargaisons'][$key]['etat_globale'] = "FERMÉE";
            }
        }

        ecrireJSON('../public/data/cargos.json', $currentData);
        $verifData = lireJSON('../public/data/cargos.json');
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "La cargaison est en État FERMÉE"]);
        exit;
    }
    elseif (isset($data['action']) && $data['action'] == 'ouvrirCargaison'){

       
        $newId = $data ['id'];

        $currentData = lireJSON('../public/data/cargos.json');

        foreach ($currentData['cargaisons'] as $key => $value){
            if ($value['numero'] == $newId){

                $currentData['cargaisons'][$key]['etat_globale'] = "OUVERTE";
            }
        }

        ecrireJSON('../public/data/cargos.json', $currentData);
        $verifData = lireJSON('../public/data/cargos.json');
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "La cargaison est en État OUVERTE"]);
        exit;
    }
    elseif (isset($data['action']) && $data['action'] == 'changerEtape'){

       $newEtat = $data['nouvelleEtape'];
        $newId = $data ['idCargaison'];

        $currentData = lireJSON('../public/data/cargos.json');

        foreach ($currentData['cargaisons'] as $key => $value){
            if ($value['numero'] == $newId){
            
                $currentData['cargaisons'][$key]['etat_avancement'] = $newEtat;
            }
        }

        ecrireJSON('../public/data/cargos.json', $currentData);
        $verifData = lireJSON('../public/data/cargos.json');
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "La cargaison est en État OUVERTE"]);
        exit;
    }
     else {
        echo json_encode(["status" => "error", "message" => "Action non reconnue"]);
        exit;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = lireJSON('../public/data/cargos.json');
    if ($data === null) {
        echo json_encode(["status" => "error", "message" => "Erreur de lecture des données existantes"]);
    }else {
        echo json_encode($data);
        }
        exit;
}
