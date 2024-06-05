import { Product,  FoodProduct, ChemicalProduct, MaterialProduct, FragileMaterial, unbreackableMaterial } from "../modele/produit.js";
import { Clients } from "../modele/produit.js";

export abstract class Cargaison {
    action: string;
    idcargo: number;
    numero: string;
    type: string;
    poids_max: number;
    lieu_depart: string;
    lieu_arrivee: string;
    date_depart: string;
    date_arrivee: string;
    distance_km: number;
    etat_avancement: string;
    etat_globale: string;
    produits: Product[] = [];

    constructor(
        action: string,
        idcargo: number,
        numero: string,
        type: string,
        poids_max: number,
        lieu_depart: string,
        lieu_arrivee: string,
        date_depart: string,
        date_arrivee: string,
        distance_km: number,
        etat_avancement: string,
        etat_globale: string,
        
    ) {
        this.action = action;
        this.idcargo = idcargo;
        this.numero = numero;
        this.type = type;
        this.poids_max = poids_max;
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.date_depart = date_depart;
        this.date_arrivee = date_arrivee;
        this.distance_km = distance_km;
        this.etat_avancement = etat_avancement;
        this.etat_globale = etat_globale;
        
    }

    abstract calculerFrais(produit: Product): number;

    public ajouterProduit(produit: Product): void {

        this.produits.push(produit);
        console.log(`Produit ajouté: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
    }

    public nombreProduits(): number {
        return this.produits.length;
    }

    public sommeTotal(): number {
        return this.produits.reduce((total, produit) => total * this.calculerFrais(produit), 0);
    }

    public retireProduit(produit: Product): void {
      if (this.etat_avancement !== "EN ATTENTE" || this.etat_globale !== "OUVERT") {
        console.log("Les produits ne peuvent être retirés que si la cargaison est en attente et ouverte.");
        return;
      }
  
      const index = this.produits.indexOf(produit);
      if (index > -1) {
        this.produits.splice(index, 1);
        console.log(`Produit retiré: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
      } else {
        console.log(`Le produit ${produit.nom} n'est pas dans la cargaison`);
      }
    }
  
    public fermer(): void {
        if (this.etat_avancement === "EN ATTENTE") {
            this.etat_globale = "FERMÉE";
        } else {
            console.log("Seules les cargaisons en attente peuvent être fermées");
        }
    }

    public reouvrir(): void {
        if (this.etat_globale === "FERMÉE") {
            this.etat_avancement = "EN ATTENTE";
        } else {
            console.log("Seules les cargaisons fermées peuvent être rouvertes");
        }
    }
  
}

export class CargaisonMaritime extends Cargaison {
  produits: (FoodProduct | unbreackableMaterial | ChemicalProduct)[];
    constructor(
        action: string,
        idcargo: number,
        numero: string,
        type: string,
        poids_max: number,
        lieu_depart: string,
        lieu_arrivee: string,
        date_depart: string,
        date_arrivee: string,
        distance_km: number,
        etat_avancement: string,
        etat_globale: string,
        produit: []
        
    ) {
        super(action, idcargo, numero, "Maritime", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
       this.produits = [];
       
    }
    fermer(): void {
      if (this.etat_avancement === "EN ATTENTE") {
          this.etat_globale = "FERMÉE";
      } else {
          console.log("Seules les cargaisons en attente peuvent être fermées");
      }
  }
  reouvrir(): void {
    if (this.etat_globale === "FERMÉE") {
        this.etat_avancement = "EN ATTENTE";
    } else {
        console.log("Seules les cargaisons fermées peuvent être rouvertes");
    }
}
    ajouterProduit(produit: FoodProduct | unbreackableMaterial | ChemicalProduct): void {
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
calculerFrais(produit: FoodProduct | unbreackableMaterial | ChemicalProduct): number{
  if (produit instanceof FragileMaterial) {
    console.log("Impossible to add");
      return 0;
  } 
  let frais: number;
    if (produit instanceof ChemicalProduct){
      frais = 500 * produit.poids * produit.toxicity + 10000;
    }else if (produit instanceof MaterialProduct) {
      frais = 400 * produit.poids * this.distance_km + 5000;
    }else{
      frais = 90 * produit.poids * this.distance_km + 5000;
    }
    return frais;
}
}

export class CargaisonAerienne extends Cargaison {
  produits: (FoodProduct | MaterialProduct)[];
    constructor(
        action: string,
        idcargo: number,
        numero: string,
        type: string,
        poids_max: number,
        lieu_depart: string,
        lieu_arrivee: string,
        date_depart: string,
        date_arrivee: string,
        distance_km: number,
        etat_avancement: string,
        etat_globale: string,
        produit: []
        
    ) {
        super(action, idcargo, numero, "Aerienne", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
        this.produits = produit;

    }
    fermer(): void {
      if (this.etat_avancement === "EN ATTENTE") {
          this.etat_globale = "FERMÉE";
      } else {
          console.log("Seules les cargaisons en attente peuvent être fermées");
      }
  }
  reouvrir(): void {
    if (this.etat_globale === "FERMÉE") {
        this.etat_avancement = "EN ATTENTE";
    } else {
        console.log("Seules les cargaisons fermées peuvent être rouvertes");
    }
}
    public ajouterProduit(produit: FoodProduct | MaterialProduct): void {
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
calculerFrais(produit: FoodProduct | MaterialProduct): number {
  if (produit instanceof ChemicalProduct){
    console.log("Impossible to add");
      return 0;
  }
  let frais: number;
  if (produit instanceof FoodProduct){
    frais = 300 * produit.poids * this.distance_km + 5000;
  }else {
    frais = 1000 * produit.poids * this.distance_km;
  }
  return frais;

}
}

export class CargaisonRoutier extends Cargaison {
  produits: (FoodProduct | MaterialProduct)[];

    constructor(
        action: string,
        idcargo: number,
        numero: string,
        type: string,
        poids_max: number,
        lieu_depart: string,
        lieu_arrivee: string,
        date_depart: string,
        date_arrivee: string,
        distance_km: number,
        etat_avancement: string,
        etat_globale: string,
        produit: []
      
    ) {
        super(action, idcargo, numero, "Routier", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
        this.produits = [];
    }
    fermer(): void {
      if (this.etat_avancement === "EN ATTENTE") {
          this.etat_globale = "FERMÉE";
      } else {
          console.log("Seules les cargaisons en attente peuvent être fermées");
      }
  }
  reouvrir(): void {
    if (this.etat_globale === "FERMÉE") {
        this.etat_avancement = "EN ATTENTE";
    } else {
        console.log("Seules les cargaisons fermées peuvent être rouvertes");
    }
}
       ajouterProduit(produit: FoodProduct | MaterialProduct): void {
        if (produit instanceof ChemicalProduct){
          console.log("Les produits chimiques ne doivent pas être transportés par voie Routiére");
        return;
        }
        if (this.etat_avancement!== "EN ATTENTE") {
          console.log("La cargaison est fermée et ne peut plus recevoir de produits");
          return;
      }
      if (this.poids_max && this.sommeTotal() + produit.poids > this.poids_max) {
        console.log("La cargaison ne peut pas dépasser le poids maximum");
        return;
    }
    this.produits.push(produit);
   
}
calculerFrais(produit: FoodProduct | MaterialProduct): number {
  if (produit instanceof ChemicalProduct){
    console.log("Impossible to add");
      return 0;
  }
  let frais: number;
  if (produit instanceof FoodProduct){
    frais = 100 * produit.poids * this.distance_km;
  }else {
    frais = 200 * produit.poids * this.distance_km;
  }
  return frais;

}
} 


// import { Product, FoodProduct, ChemicalProduct, MaterialProduct, FragileMaterial, unbreackableMaterial } from "../modele/produit.js";
// import { Clients } from "../modele/produit.js";

// export abstract class Cargaison {
//     action: string;
//     idcargo: number;
//     numero: string;
//     type: string;
//     poids_max: number;
//     lieu_depart: string;
//     lieu_arrivee: string;
//     date_depart: string;
//     date_arrivee: string;
//     distance_km: number;
//     etat_avancement: string;
//     etat_globale: string;
//     produits: Product[] = [];

//     constructor(
//         action: string,
//         idcargo: number,
//         numero: string,
//         type: string,
//         poids_max: number,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         date_depart: string,
//         date_arrivee: string,
//         distance_km: number,
//         etat_avancement: string,
//         etat_globale: string,
//     ) {
//         this.action = action;
//         this.idcargo = idcargo;
//         this.numero = numero;
//         this.type = type;
//         this.poids_max = poids_max;
//         this.lieu_depart = lieu_depart;
//         this.lieu_arrivee = lieu_arrivee;
//         this.date_depart = date_depart;
//         this.date_arrivee = date_arrivee;
//         this.distance_km = distance_km;
//         this.etat_avancement = etat_avancement;
//         this.etat_globale = etat_globale;
//     }

//     abstract calculerFrais(produit: Product): number;

//     public ajouterProduit(produit: Product): void {
//         if (this.etat_avancement !== "EN ATTENTE" || this.etat_globale !== "OUVERTE") {
//             console.log("Les produits ne peuvent être ajoutés que si la cargaison est en attente et ouverte.");
//             return;
//         }
//         if (this.poids_max && this.sommeTotal() + produit.poids > this.poids_max) {
//             console.log("La cargaison ne peut pas dépasser le poids maximum");
//             return;
//         }
//         this.produits.push(produit);
//         console.log(`Produit ajouté: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
//     }

//     public nombreProduits(): number {
//         return this.produits.length;
//     }

//     public sommeTotal(): number {
//         return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
//     }

//     public retireProduit(produit: Product): void {
//         if (this.etat_avancement !== "EN ATTENTE" || this.etat_globale !== "OUVERTE") {
//             console.log("Les produits ne peuvent être retirés que si la cargaison est en attente et ouverte.");
//             return;
//         }

//         const index = this.produits.indexOf(produit);
//         if (index > -1) {
//             this.produits.splice(index, 1);
//             console.log(`Produit retiré: ${produit.nom} - Montant Total: ${this.sommeTotal()}`);
//         } else {
//             console.log(`Le produit ${produit.nom} n'est pas dans la cargaison`);
//         }
//     }

//     public fermer(): void {
//         if (this.etat_avancement === "EN ATTENTE" && this.etat_globale === "OUVERTE") {
//             this.etat_globale = "FERMÉE";
//             console.log("La cargaison a été fermée.");
//         } else {
//             console.log("Seules les cargaisons en attente et ouvertes peuvent être fermées.");
//         }
//     }

//     public reouvrir(): void {
//         if (this.etat_globale === "FERMÉE" && this.etat_avancement === "EN ATTENTE") {
//             this.etat_avancement = "EN ATTENTE";
//             this.etat_globale = "OUVERTE";
//             console.log("La cargaison a été rouverte.");
//         } else {
//             console.log("Seules les cargaisons fermées et en attente peuvent être rouvertes.");
//         }
//     }

//     public changerEtatArrivee(): void {
//         if (this.etat_avancement === "EN COURS") {
//             this.etat_avancement = "ARRIVÉE";
//             console.log("La cargaison est arrivée.");
//         } else {
//             console.log("Seules les cargaisons en cours peuvent être marquées comme arrivées.");
//         }
//     }

//     public gererProduitsArrivee(): void {
//         if (this.etat_avancement === "ARRIVÉE") {
//             const dateCourante = new Date();
//             const dateLimite = new Date(this.date_arrivee);
//             dateLimite.setDate(dateLimite.getDate() + 15);

//             this.produits.forEach(produit => {
//                 if (produit.etat === "PERDU") {
//                     console.log(`Produit ${produit.nom} est perdu.`);
//                 } else if (produit.etat === "EN ATTENTE" && dateCourante > dateLimite) {
//                     produit.etat = "ARCHIVÉE";
//                     console.log(`Produit ${produit.nom} archivé automatiquement.`);
//                 }
//             });
//         } else {
//             console.log("Les produits peuvent être gérés uniquement lorsque la cargaison est arrivée.");
//         }
//     }
// }

// export class CargaisonMaritime extends Cargaison {
//     produits: (FoodProduct | unbreackableMaterial | ChemicalProduct)[] = [];

//     constructor(
//         action: string,
//         idcargo: number,
//         numero: string,
//         type: string,
//         poids_max: number,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         date_depart: string,
//         date_arrivee: string,
//         distance_km: number,
//         etat_avancement: string,
//         etat_globale: string,
//         produit: []
//     ) {
//         super(action, idcargo, numero, "Maritime", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
//         this.produits = [];

//     }

//     ajouterProduit(produit: FoodProduct | unbreackableMaterial | ChemicalProduct): void {
//         if (produit instanceof FragileMaterial) {
//             console.log("Les produits fragiles ne doivent pas être transportés par voie maritime");
//             return;
//         }
//         super.ajouterProduit(produit);
//     }

//     calculerFrais(produit: FoodProduct | unbreackableMaterial | ChemicalProduct): number {
//         let frais: number;
//         if (produit instanceof ChemicalProduct) {
//             frais = 500 * produit.poids * produit.toxicity + 10000;
//         } else if (produit instanceof MaterialProduct) {
//             frais = 400 * produit.poids * this.distance_km + 5000;
//         } else {
//             frais = 90 * produit.poids * this.distance_km + 5000;
//         }
//         return frais;
//     }
// }

// export class CargaisonAerienne extends Cargaison {
//     produits: (FoodProduct | MaterialProduct)[] = [];

//     constructor(
//         action: string,
//         idcargo: number,
//         numero: string,
//         type: string,
//         poids_max: number,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         date_depart: string,
//         date_arrivee: string,
//         distance_km: number,
//         etat_avancement: string,
//         etat_globale: string,
//         produit: []
//     ) {
//         super(action, idcargo, numero, "Aerienne", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
//         this.produits = [];

//     }

//     ajouterProduit(produit: FoodProduct | MaterialProduct): void {
//         if (produit instanceof ChemicalProduct) {
//             console.log("Les produits chimiques ne doivent pas être transportés par voie aérienne");
//             return;
//         }
//         super.ajouterProduit(produit);
//     }

//     calculerFrais(produit: FoodProduct | MaterialProduct): number {
//         let frais: number;
//         if (produit instanceof FoodProduct) {
//             frais = 300 * produit.poids * this.distance_km + 5000;
//         } else {
//             frais = 1000 * produit.poids * this.distance_km;
//         }
//         return frais;
//     }
// }

// export class CargaisonRoutier extends Cargaison {
//     produits: (FoodProduct | MaterialProduct)[] = [];

//     constructor(
//         action: string,
//         idcargo: number,
//         numero: string,
//         type: string,
//         poids_max: number,
//         lieu_depart: string,
//         lieu_arrivee: string,
//         date_depart: string,
//         date_arrivee: string,
//         distance_km: number,
//         etat_avancement: string,
//         etat_globale: string,
//         produit: []
//     ) {
//         super(action, idcargo, numero, "Routier", poids_max, lieu_depart, lieu_arrivee, date_depart, date_arrivee, distance_km, etat_avancement, etat_globale);
//         this.produits = [];

//     }

//     ajouterProduit(produit: FoodProduct | MaterialProduct): void {
//         if (produit instanceof ChemicalProduct) {
//             console.log("Les produits chimiques ne doivent pas être transportés par voie routière");
//             return;
//         }
//         super.ajouterProduit(produit);
//     }

//     calculerFrais(produit: FoodProduct | MaterialProduct): number {
//         let frais: number;
//         if (produit instanceof FoodProduct) {
//             frais = 100 * produit.poids * this.distance_km;
//         } else {
//             frais = 200 * produit.poids * this.distance_km;
//         }
//         return frais;
//     }
// }
