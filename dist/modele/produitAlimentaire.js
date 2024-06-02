export class ProduitAlimentaire {
    libelle;
    poids;
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    info() {
        console.log("ProduitAlimentaire: " + this.libelle + " poids: " + this.poids);
    }
    calculerFrais(cargaison) {
        return this.poids * cargaison.getFrais();
    }
}
