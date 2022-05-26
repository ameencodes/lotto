// import * as functions from "firebase-functions";

import * as Models from "./firebase/base";
import * as admin from "firebase-admin";


export async function query_balance(userid: any) {

  const Document = await Models.db.collection("users").doc(`${userid}`).get()
  const info: any = Document.data()
  let bal = info.balance
  return bal;
  console.log(bal)

}

export async function createTicket(userid: string, game: string) {
  const data: any = {
    UID: userid,
    Game: game,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }

  const game_ticket_ref = Models.db.collection("ticket")

  const active_ticket_ref = Models.db.collection("users").doc(`${userid}`).collection("Active_Games")
  const user_transaction_ref = Models.db.collection("users").doc(`${userid}`).collection("Transactions")



  await game_ticket_ref.add({
    ID: userid,

    Game: game,

    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }).then((documentReference: any) => {
    console.log(`Added document with name: ${documentReference.id}`);
  });

  await active_ticket_ref.add({ data: data }).then((documentReference: any) => {
    console.log(`Added document with name: ${documentReference.id}`);
  });
  await user_transaction_ref.add({
    ID: userid,

    Game: game,

    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }).then((documentReference: any) => {
    console.log(`Added document with name: ${documentReference.id}`);
  });




}
export function total_ticket_price(number_of_tickets: number, amount: any) {
  let total_spent_on_tickets = number_of_tickets * amount
  return total_spent_on_tickets;

}

export async function ticket_dates (weeklyordaily:string,game_id:string) {


  let  game_datess :any   
  const games  =  await Models.db.collection(`/games/lotto/${weeklyordaily}`).where("game_name","==",game_id).get()

  games.forEach(game => {
    const game_data  :any= game.data()
    const start   = game_data.start_date
    const end =  game_data.end_date
   
    game_datess.push(start,end)
    

  })

  return (game_datess)



}

  export async function Update_balance(number_of_tickets: any,  uid: any, game: string, ref: any, weeklyordaily: any) {

  let game_uid 

 let game_start_date
 let game_end_date

 let price

 const game_uid_ref =await  Models.db.collection(`/games/lotto/${weeklyordaily}`).where("title","==",game).get();
  (   game_uid_ref).forEach(game_ui => {
    game_uid = game_ui.id
    const game_data = game_ui.data()
    game_start_date =  game_data.start_date
    game_end_date=  game_data.end_date
    price = game_data.price
  }

    
    )

 const total_spent_on_tickets = total_ticket_price(number_of_tickets, price)
  const current_balance = await query_balance(uid)
  
  
  const new_balance = current_balance - total_spent_on_tickets

  if (new_balance >= 0 && current_balance >= total_spent_on_tickets) {
    const updated_balance = await Models.Update("users", uid, { balance: `${new_balance.toFixed(3)}` })
    const user_transaction_ref = Models.db.collection("tickets_history" )
    const game_ticket_ref =  Models.db.collection("tickets")
    for (let i = 0; i < number_of_tickets; i++) {

   
    
await game_ticket_ref.add({ ID: uid, game_title: game,createdAt: admin.firestore.FieldValue.serverTimestamp() ,
  start_date:  game_start_date, end_date:  game_end_date , important :false, price

}).then((documentReference) => {
console.log(`Added document with name: ${documentReference.id}`);
});
    
      await user_transaction_ref.add({ ID: uid, game_title: game,  createdAt: admin.firestore.FieldValue.serverTimestamp() , price,
        start_date:  game_start_date, end_date:  game_end_date

      }).then((documentReference: any) => {
        console.log(`Added document with name: ${documentReference.id}`);
      });
    }
    ref.remove()
    return updated_balance

  }
  else {
    ref.remove()

  }
}


export async function game_date(weeklyordaily: string, game: any) {
  let ticket_da = [ ]
  const game_ref: any = await (await Models.db.collection(`/games/lotto/${weeklyordaily}`).doc(`${game}`).get()).data();
  const start_date = game_ref.start_date
  const end_date = game_ref.end_date
  ticket_da.push(start_date, end_date)

  return ticket_da

}

export async function ticket_price(game_id:any,weeklyordaily:any) {

const game_ref = await Models.db.collection(`/games/lotto/${weeklyordaily}`).doc(game_id).get()
 const game_data  :any = game_ref.data();
 const price :any  = game_data.price

return {price}

}