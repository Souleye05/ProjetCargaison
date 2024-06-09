import { FoodProduct, ChemicalProduct, MaterialProduct, FragileMaterial } from "../modele/produit.js";
export class Cargaison {
    action;
    idcargo;
    numero;
    type;
    poids_max;
    nbr_prod_max;
    lieu_depart;
    lieu_arrivee;
    date_depart;
    date_arrivee;
    distance_km;
    etat_avancement;
    etat_globale;
    produits = [];
    constructor(action, idcargo, numero, type, poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale) {
        this.action = action;
        this.idcargo = idcargo;
        this.numero = numero;
        this.type = type;
        this.poids_max = poids_max;
        this.nbr_prod_max = nbr_prod_max;
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.date_depart = date_depart;
        this.date_arrivee = date_arrivee;
        this.distance_km = distance_km;
        this.etat_avancement = etat_avancement;
        this.etat_globale = etat_globale;
    }
    ajouterProduit(produit) {
        this.produits.push(produit);
        console.log(`Produit ajouté: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
    }
    nombreProduits() {
        return this.produits.length;
    }
    sommeTotal() {
        return this.produits.reduce((total, produit) => total * this.calculerFrais(produit), 0);
    }
    retireProduit(produit) {
        if (this.etat_avancement !== "EN ATTENTE" || this.etat_globale !== "OUVERT") {
            console.log("Les produits ne peuvent être retirés que si la cargaison est en attente et ouverte.");
            return;
        }
        const index = this.produits.indexOf(produit);
        if (index > -1) {
            this.produits.splice(index, 1);
            console.log(`Produit retiré: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
        }
        else {
            console.log(`Le produit ${produit.nom} n'est pas dans la cargaison`);
        }
    }
    fermer() {
        if (this.etat_avancement === "EN ATTENTE") {
            this.etat_globale = "FERMÉE";
        }
        else {
            console.log("Seules les cargaisons en attente peuvent être fermées");
        }
    }
    reouvrir() {
        if (this.etat_globale === "FERMÉE") {
            this.etat_avancement = "EN ATTENTE";
        }
        else {
            console.log("Seules les cargaisons fermées peuvent être rouvertes");
        }
    }
}
export class CargaisonMaritime extends Cargaison {
    produits;
    constructor(action, idcargo, numero, type, poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale, produit) {
        super(action, idcargo, numero, "Maritime", poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
        this.produits = [];
    }
    fermer() {
        if (this.etat_avancement === "EN ATTENTE") {
            this.etat_globale = "FERMÉE";
        }
        else {
            console.log("Seules les cargaisons en attente peuvent être fermées");
        }
    }
    reouvrir() {
        if (this.etat_globale === "FERMÉE") {
            this.etat_avancement = "EN ATTENTE";
        }
        else {
            console.log("Seules les cargaisons fermées peuvent être rouvertes");
        }
    }
    ajouterProduit(produit) {
        if (produit instanceof FragileMaterial) {
            console.log("Les produits fragiles ne doivent pas être transportés par voie maritime");
            return;
        }
        if (this.etat_avancement !== "EN ATTENTE") {
            console.log("La cargaison est fermée et ne peut plus recevoir de produits");
            return;
        }
        if (this.poids_max && this.sommeTotal() + produit.poids > this.poids_max) {
            console.log("La cargaison ne peut pas dépasser le poids maximum");
            return;
        }
        this.produits.push(produit);
    }
    calculerFrais(produit) {
        if (produit instanceof FragileMaterial) {
            console.log("Impossible to add");
            return 0;
        }
        let frais;
        if (produit instanceof ChemicalProduct) {
            frais = 500 * produit.poids * produit.toxicity + 10000;
        }
        else if (produit instanceof MaterialProduct) {
            frais = 400 * produit.poids * this.distance_km + 5000;
        }
        else {
            frais = 90 * produit.poids * this.distance_km + 5000;
        }
        return frais;
    }
}
export class CargaisonAerienne extends Cargaison {
    produits;
    constructor(action, idcargo, numero, type, poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale, produit) {
        super(action, idcargo, numero, "Aerienne", poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
        this.produits = produit;
    }
    fermer() {
        if (this.etat_avancement === "EN ATTENTE") {
            this.etat_globale = "FERMÉE";
        }
        else {
            alert("Seules les cargaisons en attente peuvent être fermées");
        }
    }
    reouvrir() {
        if (this.etat_globale === "FERMÉE") {
            this.etat_avancement = "EN ATTENTE";
        }
        else {
            console.log("Seules les cargaisons fermées peuvent être rouvertes");
        }
    }
    ajouterProduit(produit) {
        if (produit instanceof ChemicalProduct) {
            console.log("Les produits chimiques ne doivent pas être transportés par voie aérienne");
            return;
        }
        if (this.etat_avancement !== "EN ATTENTE") {
            console.log("La cargaison est fermée et ne peut plus recevoir de produits");
            return;
        }
        if (this.poids_max && this.sommeTotal() + produit.poids > this.poids_max) {
            console.log("La cargaison ne peut pas dépasser le poids maximum");
            return;
        }
        this.produits.push(produit);
    }
    calculerFrais(produit) {
        if (produit instanceof ChemicalProduct) {
            console.log("Impossible to add");
            return 0;
        }
        let frais;
        if (produit instanceof FoodProduct) {
            frais = 300 * produit.poids * this.distance_km + 5000;
        }
        else {
            frais = 1000 * produit.poids * this.distance_km;
        }
        return frais;
    }
}
export class CargaisonRoutier extends Cargaison {
    produits;
    constructor(action, idcargo, numero, type, poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale, produit) {
        super(action, idcargo, numero, "Routier", poids_max, nbr_prod_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
        this.produits = [];
    }
    fermer() {
        if (this.etat_avancement === "EN ATTENTE") {
            this.etat_globale = "FERMÉE";
        }
        else {
            console.log("Seules les cargaisons en attente peuvent être fermées");
        }
    }
    reouvrir() {
        if (this.etat_globale === "FERMÉE") {
            this.etat_avancement = "EN ATTENTE";
        }
        else {
            console.log("Seules les cargaisons fermées peuvent être rouvertes");
        }
    }
    ajouterProduit(produit) {
        if (produit instanceof ChemicalProduct) {
            console.log("Les produits chimiques ne doivent pas être transportés par voie Routiére");
            return;
        }
        if (this.etat_avancement !== "EN ATTENTE") {
            console.log("La cargaison est fermée et ne peut plus recevoir de produits");
            return;
        }
        if (this.poids_max && this.sommeTotal() + produit.poids > this.poids_max) {
            console.log("La cargaison ne peut pas dépasser le poids maximum");
            return;
        }
        this.produits.push(produit);
    }
    calculerFrais(produit) {
        if (produit instanceof ChemicalProduct) {
            console.log("Impossible to add");
            return 0;
        }
        let frais;
        if (produit instanceof FoodProduct) {
            frais = 100 * produit.poids * this.distance_km;
        }
        else {
            frais = 200 * produit.poids * this.distance_km;
        }
        return frais;
    }
}
