export class FoodProduct {
    action;
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class ChemicalProduct {
    action;
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    toxicity;
    constructor(action, nom, poids, clientsApport, destinataire, toxicity) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
        this.toxicity = toxicity;
    }
}
export class MaterialProduct {
    action;
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class FragileMaterial {
    action;
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class unbreackableMaterial {
    action;
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(action, nom, poids, clientsApport, destinataire) {
        this.action = action;
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
