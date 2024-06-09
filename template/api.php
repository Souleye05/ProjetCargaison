<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use TCPDF;

// Charger l'autoloader de Composer
require '../vendor/autoload.php';

function envoyerEmail($destinataire, $sujet, $message) {
    $mail = new PHPMailer(true);
    try {
        // Configurer le serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'dsouleye105@gmail.com'; 
        $mail->Password = 'sbcb okyf ljhj wbbm'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('dsouleye105@gmail.com', 'Cargo');
        $mail->addAddress($destinataire);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $sujet;
        $mail->Body    = $message;

        $mail->send();
        echo 'Email envoyé avec succès.';
       
    } catch (Exception $e) {
        error_log("Échec de l'envoi de l'email. Erreur de PHPMailer: {$mail->ErrorInfo}");
    }
}

function generateReceipt($cargaison, $produit) {
    $pdf = new TCPDF();

    // Set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('JULES CÉSAR SERVICES');
    $pdf->SetTitle('Reçu de Cargaison');
    $pdf->SetSubject('Reçu de Cargaison');
    $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // Add a page
    $pdf->AddPage();

    // Title
    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->Cell(0, 15, 'Reçu de Cargaison', 0, 1, 'C');
    

    // Cargaison Info
    $pdf->SetFont('helvetica', '', 12);
    $html = '<h1>Informations de la Cargaison</h1>';
    $html .= '<p>Numéro: ' . $cargaison['numero'] . '</p>';
    $html .= '<p>Point de Départ: ' . $cargaison['lieu_depart'] . '</p>';
    $html .= '<p>Point d\'Arrivée: ' . $cargaison['lieu_arrivee'] . '</p>';
    $html .= '<p>Date de Départ: ' . $cargaison['date_depart'] . '</p>';
    $html .= '<p>Date d\'Arrivée: ' . $cargaison['date_arrivee'] . '</p>';
    $html .= '<p>Distance: ' . $cargaison['distance_km'] . ' km</p>';
    $html .= '<p>Type: ' . $cargaison['type'] . '</p>';

    // Produit Info
    $html .= '<h3>Informations du Produit</h3>';
    $html .= '<p>Numéro: ' . $produit['numPro'] . '</p>';
    $html .= '<p>Nom: ' . $produit['nom'] . '</p>';
    $html .= '<p>Poids: ' . $produit['poids'] . ' kg</p>';
    $html .= '<p>Type: ' . $produit['typeProduit'] . '</p>';
    $html .= '<p>Type: ' . $produit['frais'] .'FCFA </p>';
    $pdf->writeHTML($html, true, false, true, false, '');

    // Save PDF to a file
    $filename =  '/var/www/html/miniProjet/recu/recu.pdf';
    // $pdf->Output($filename, 'F');

    if (is_writable(dirname($filename))) {
        $pdf->Output($filename, 'F');
        echo json_encode(['message' => 'Le reçu a été généré et sauvegardé avec succès.']);
    } else {
        echo json_encode(['error' => 'Le répertoire n\'est pas accessible en écriture']);
    }

    return $filename;
}

function sendEmailWithReceipt($clientEmail, $pdfFilename) {
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Remplacez par le serveur SMTP de votre fournisseur
        $mail->SMTPAuth   = true;
        $mail->Username   = 'dsouleye105@gmail.com'; // Votre adresse email SMTP
        $mail->Password   = 'sbcb okyf ljhj wbbm'; // Votre mot de passe SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; // Port SMTP

        // Destinataires
        $mail->setFrom('dsouleye105@gmail.com', 'Jules César');
        $mail->addAddress($clientEmail);

        // Pièce jointe
        $mail->addAttachment($pdfFilename);

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = 'Reçu de votre Cargaison';
        $mail->Body    = 'Veuillez trouver ci-joint le reçu de votre cargaison.';

        $mail->send();
        echo 'Le reçu a été envoyé avec succès';
        return true;
    } catch (Exception $e) {
        echo "Le message n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
    }
}
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
            "poids_max" => $data['poids_max'],
            "nbr_prod_max" => $data['nbr_prod_max'],
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
         $mail = $newProduit['clientApport']['email'];
$CliMail = $newProduit['destinataire']['email'];
        $currentData = lireJSON('../public/data/cargos.json');
        

        foreach ($currentData['cargaisons'] as $key => $value){
            if ($value['numero'] == $newId){
                $currentData['cargaisons'][$key]['produits'][] = $newProduit;
                $recu = generateReceipt($value,$newProduit);
                sendEmailWithReceipt($mail,$recu);
            }
        }
        envoyerEmail($mail, "Voici le mail d'avertissement", " Ce-ci est un message de test");
        envoyerEmail($CliMail, "Voici le mail d'avertissement", " Ce-ci est un message de test");

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

    elseif (isset($data['action']) && $data['action'] == 'changerEtatProduit') {
    $newEtatPro = $data['nouvelEtat'];
    $newId = $data['numero']; // Correction du nom de la variable
    $cargoId = $data['idcargo'];

    // Log des données reçues pour le débogage
    error_log("Received data: " . print_r($data, true));

    $currentData = lireJSON('../public/data/cargos.json');

    foreach ($currentData['cargaisons'] as $key => $value) {
        if ($value['numero'] == $cargoId) {
            $cargaison = $value;
            foreach ($value['produits'] as $key1 => $produit) {
                if ($produit['numPro'] == $newId) {
                    // Gérer les états des produits en fonction de l'état de la cargaison
                    if ($cargaison['etat_avancement'] !== 'ARRIVÉE') {
                        // Si la cargaison n'est pas encore arrivée, on ne peut pas changer l'état des produits
                        echo json_encode(["status" => "error", "message" => "L'état du produit ne peut être changé que lorsque la cargaison est arrivée."]);
                        exit;
                    } else {
                        // Log avant la mise à jour
                        error_log("Before update: " . print_r($produit, true));

                        // Mettre à jour l'état du produit
                        $currentData['cargaisons'][$key]['produits'][$key1]['etat'] = $newEtatPro;

                        // Log après la mise à jour
                        error_log("After update: " . print_r($currentData['cargaisons'][$key]['produits'][$key1], true));
                    }
                    break 2; // Sortir des deux boucles
                }
            }
        }
    }

    ecrireJSON('../public/data/cargos.json', $currentData);

    $verifData = lireJSON('../public/data/cargos.json');
    error_log("Données après écriture: " . print_r($verifData, true));

    echo json_encode(["status" => "success", "message" => "Le produit est en État OUVERTE"]);
    exit;
}

// ===================== Logique d'archivage automatique des produits 15 jours après l'arrivée de la cargaison ==================//
foreach ($currentData['cargaisons'] as $key => $cargaison) {
    if ($cargaison['etat_avancement'] == 'ARRIVÉE') {
        $dateArrivee = new DateTime($cargaison['date_arrivee']);
        $dateActuelle = new DateTime();

        $interval = $dateArrivee->diff($dateActuelle);
        if ($interval->days >= 15) {
            foreach ($cargaison['produits'] as $key1 => $produit) {
                if ($produit['etat'] !== 'archive') {
                    $currentData['cargaisons'][$key]['produits'][$key1]['etat'] = 'archive';
                }
            }
        }
    }
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
