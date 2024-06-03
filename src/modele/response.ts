// export class APIHandler {
//     private endpoint: string;
  
//     constructor(endpoint: string) {
//       this.endpoint = endpoint;
//     }
  
//     async postData(data: any): Promise<void> {
//       try {
//         const response = await fetch(this.endpoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
  
//         const result = await response.json();
//         console.log(result);
  
//         if (result.status === 'success') {
//           alert(result.message);
//           return result;
//         } else {
//           alert("Erreur lors de l'ajout");
//           return null;
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         alert('Erreur de communication avec le serveur');
//         return null;
//       }
//     }
//   }
  
//   // Utilisation de la classe pour différents cas
//   const apiHandler = new APIHandler('../template/api.php');
  
//   // Cas 1: ajout de cargaison
//   const cargaison = { /* vos données de cargaison */ };
//   apiHandler.postData(cargaison).then(result => {
//     if (result) {
//       afficherCargaisons();
//     }
//   });
  
//   // Cas 2: ajout de produit
//   const produit = { /* vos données de produit */ };
//   apiHandler.postData(produit);
  
//   // Cas 3: changement de données
//   const change = { /* vos données de changement */ };
//   apiHandler.postData(change);
  