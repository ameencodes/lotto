import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
//  import  { getFirestore} from  "@firebase/firestore"
// import { getFirestore } from 'firebase/firestore'
import serviceaccount from "./serviceaccount.json";

admin.initializeApp({
  credential: admin.credential.cert(<any>serviceaccount),
  databaseURL: "https://lotto-48a43-default-rtdb.europe-west1.firebasedatabase.app",
  
});

// const database  =   getFirestore();


export {
  functions,
  admin,
  // database
  
};
