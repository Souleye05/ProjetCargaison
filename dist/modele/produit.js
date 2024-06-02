export class FoodProduct {
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(nom, poids, clientsApport, destinataire) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class ChemicalProduct {
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    toxicity;
    constructor(nom, poids, clientsApport, destinataire, toxicity) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
        this.toxicity = toxicity;
    }
}
export class MaterialProduct {
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(nom, poids, clientsApport, destinataire) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class FragileMaterial {
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(nom, poids, clientsApport, destinataire) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
export class unbreackableMaterial {
    nom;
    poids;
    typePro = "";
    typeCargo = "";
    clientApport;
    destinataire;
    constructor(nom, poids, clientsApport, destinataire) {
        this.nom = nom;
        this.poids = poids;
        this.clientApport = clientsApport;
        this.destinataire = destinataire;
    }
}
