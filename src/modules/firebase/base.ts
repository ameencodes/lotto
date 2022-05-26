import {admin} from "./index";
export const db = admin.firestore();
export const rtdb = admin.database()

// create reference of colleciton
export async function reference(collection: any) {
  const ref = db.collection(`${collection}`);

  return ref;
}

// returns document
export async function get_document(collection: any, UserId: any) {
  const ref =await reference(collection);
  const value = await (await (await ref).doc(`${UserId}`).get()).data();
  console.log(value);
  return value;
}
// returns a subollection of a doucment
export async function document_subcollection(collection: string , UserId: string, subcollection:string,number_subcollection: number,){
  const ref =await reference(collection);
 // const document : any  =  await  get_document(collectiion,UserId)
  const document  = await  ref.doc(`${UserId}`)
  const subcolleciton   = await document.collection(`${subcollection}`)
  return subcolleciton;


}


// returns the field requested

export async function get_field(collection: any, UserId: string, field: string) {
  const ref = await reference(collection);
  const value:any = await (await (await ref).doc(`${UserId}`).get()).data();
  const data = value.field;
 
  return data;
}
// Updates Document
export async function Update(collection: any, docToEdit: any, data: any) {
  // const ref = db.collection(`${collection}`)
  const collection_refernce = await   reference(collection);
  await (await (await collection_refernce).doc(`${docToEdit}`)).update(data);
}
// Updates a nested record in firestore
export async function Update_nested_field(collection: string, docToEdit: string, data: []) {
  // docToEdit: string,field:string
  const ref = reference(collection);
  data.forEach(async (item) => {
    (await ref).doc(`${docToEdit}`).update({
      item,

    });
  });
}

export async function remove(collection: any, docToEdit: any) {
  const collection_refernce = await reference(collection);
  await (await collection_refernce).doc(`${docToEdit}`).delete().then(() => {
    console.log("The document has been succesfully");
  });
}
export async function create(collection:string, data: any ) {
  const collection_refernce = await reference(`${collection}`);
  await collection_refernce.add({data}).then((documentReference :any ) => {
    console.log(`Added document with name: ${documentReference.id}`);
  });
}
export async function create_doc_subcollection_doc(collection:string , UserId:string,subcollection:string,data:any){
  const doc_subcollection_ref = await document_subcollection(collection,UserId,subcollection,data)
 await doc_subcollection_ref.add({data}).then((documentReference :any) =>{
    console.log(`Added document with name: ${documentReference.id}`)
  })

}


