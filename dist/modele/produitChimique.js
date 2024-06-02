export class ProduitChimique {
    libelle;
    poids;
    toxicite;
    constructor(libelle, poids, toxicite) {
        this.libelle = libelle;
        this.poids = poids;
        this.toxicite = toxicite;
    }
    calculerFrais(cargaison) {
        return this.poids * cargaison.getFrais();
    }
}
