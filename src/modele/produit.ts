export interface Clients {
    nom: string;
    prenom: string;
    tel: string;
    adresse: string;
    email: string;
}

export interface Product {
    nom: string;
    poids: number;
    typePro: string;
    typeCargo: string;
    clientApport: Clients;
    destinataire: Clients;
}

export class FoodProduct implements Product {
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;


    constructor(nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
   
}

export class ChemicalProduct implements Product {
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;
    toxicity: number;

    constructor(nom: string, poids: number, clientsApport: Clients, destinataire: Clients, toxicity: number) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
        this.toxicity = toxicity;
    }
}

export abstract class MaterialProduct implements Product {
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
  }
  

export class FragileMaterial implements MaterialProduct {
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}

export class unbreackableMaterial implements MaterialProduct {
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
   
}
