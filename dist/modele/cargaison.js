// import { Produit } from "./produit.js";
// import { ProduitChimique } from "./produitChimique.js";
// import { MaterielFragile } from "./materielFragile.js";
// export abstract class Cargaison {
//     protected produits: Produit[] = [];
//     protected distance: number;
//     protected frais: number;
//     public image: string;
//     constructor(distance: number, frais: number, image: string) {
//         this.distance = distance;
//         this.frais = frais;
//         this.image = image;
//     }
//     abstract calculerFrais(): number;
//     public ajouterProduit(produit: Produit): void {
//         if (this.produits.length >= 10) {
//             console.log("La cargaison est pleine");
//             return;
//         }
//         if (produit instanceof MaterielFragile && this instanceof CargaisonMaritime) {
//             console.log("Les produits fragiles ne doivent pas être transportés par voie maritime");
//             return;
//         }
//         if (produit instanceof ProduitChimique && !(this instanceof CargaisonMaritime)) {
//             console.log("Les produits chimiques doivent être transportés par voie maritime");
//             return;
//         }
//         this.produits.push(produit);
//         console.log("Produit ajouté: ${produit.libelle} - Montant Total: ${this.sommeTotal()} ");
//     }
//     public nombreProduits(): number {
//         return this.produits.length;
//     }
//     public sommeTotal(): number {
//         return this.produits.reduce((total, produit) => total + produit.poids * this.frais, 0);
//     }
//     public getDistance(): number {
//         return this.distance;
//     }
//     public setDistance(distance: number): void {
//         if (distance < 0) {
//             throw new Error("La distance ne peut pas être négative");
//         }
//         this.distance = distance;
//     }
//     public getFrais(): number {
//         return this.frais;
//     }
//     public setFrais(frais: number): void {
//         if (frais < 0) {
//             throw new Error("Les frais ne peuvent pas être négatifs");
//         }
//         this.frais = frais;
//     }
//     public getProduits(): Produit[] {
//         return this.produits;
//     }
// }
// export class CargaisonMaritime extends Cargaison {
//     private dureeTransit: number;
//     constructor(distance: number, frais: number, image: string) {
//         super(distance, frais, image);
//         this.dureeTransit = 19; 
//     }
//     public calculerFrais(): number {
//         return this.distance * this.frais;
//     }
//     public getDureeTransit(): number {
//         return this.dureeTransit;
//     }
//     public setDureeTransit(dureeTransit: number): void {
//         if (dureeTransit < 0) {
//             throw new Error("La durée du transit ne peut pas être négative");
//         }
//         this.dureeTransit = dureeTransit;
//     }
// }
// export class CargaisonAerienne extends Cargaison {
//     constructor(distance: number, image: string) {
//         super(distance, 100, image); 
//     }
//     public calculerFrais(): number {
//         return this.distance * this.frais;
//     }
// }
// export class CargaisonRoutier extends Cargaison {
//     constructor(distance: number, image: string) {
//         super(distance, 90, image); 
//     }
//     public calculerFrais(): number {
//         return this.distance * this.frais;
//     }
// }
export class Cargaison {
    action;
    idcargo;
    numero;
    type;
    poids_max;
    lieu_depart;
    lieu_arrivee;
    date_depart;
    date_arrivee;
    distance;
    etat;
    // etat_avancement: string;
    // etat_globale: string;
    constructor(action, idcargo, numero, type, poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance) {
        this.action = action;
        this.idcargo = idcargo;
        this.numero = numero;
        this.type = type;
        this.poids_max = poids_max;
        this.distance = distance;
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.date_depart = date_depart;
        this.date_arrivee = date_arrivee;
        // this.etat_avancement = etat_avancement;
        // this.etat_globale = etat_globale;
    }
}
