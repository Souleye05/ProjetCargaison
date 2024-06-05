export class FoodProduct {
    action;
    nom;
    poids;
    etat;
    prix;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, etat, prix, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.etat = etat;
        this.prix = prix;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class ChemicalProduct {
    action;
    nom;
    poids;
    etat;
    prix;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    toxicity;
    constructor(action, nom, poids, etat, prix, clientsApport, destinataire, toxicity) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.etat = etat;
        this.prix = prix;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
        this.toxicity = toxicity;
    }
}
export class MaterialProduct {
    action;
    nom;
    poids;
    etat;
    prix;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, etat, prix, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.etat = etat;
        this.prix = prix;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class FragileMaterial {
    action;
    nom;
    poids;
    etat;
    prix;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, etat, prix, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.etat = etat;
        this.prix = prix;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class unbreackableMaterial {
    action;
    nom;
    poids;
    etat;
    prix;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, etat, prix, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.etat = etat;
        this.prix = prix;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
