import { ProduitMateriel } from "./produitMateriel.js";
export class MaterielFragile extends ProduitMateriel {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
    calculerFrais(cargaison) {
        return this.poids * cargaison.getFrais();
    }
}
