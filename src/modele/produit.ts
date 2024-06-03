export interface Clients {
    nom: string;
    prenom: string;
    tel: number;
    adresse: number;
    email: string;
}

export interface Product {
    action: string;
    nom: string;
    poids: number;
    typePro: string;
    typeCargo: string;
    clientApport: Clients;
    destinataire: Clients;
}

export class FoodProduct implements Product {
    action: string;
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;


    constructor(action: string, nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
   
}

export class ChemicalProduct implements Product {
    action: string;
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;
    toxicity: number;

    constructor(action: string, nom: string, poids: number, clientsApport: Clients, destinataire: Clients, toxicity: number) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
        this.toxicity = toxicity;
    }
}

export abstract class MaterialProduct implements Product {
    action: string;
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(action: string, nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
  }
  

export class FragileMaterial implements MaterialProduct {
    action: string;
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(action: string, nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}

export class unbreackableMaterial implements MaterialProduct {
    action: string;
    nom: string;
    poids: number;
    typePro = "";
    typeCargo = "";
    clientApport: Clients;
    destinataire: Clients;

    constructor(action: string, nom: string, poids: number, clientsApport: Clients, destinataire: Clients) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
   
}
