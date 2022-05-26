import * as functions from "firebase-functions";
import { Update_balance, query_balance } from "./modules/trigger";
import { Response, Request, NextFunction } from "express"
import * as Models from "./modules/firebase/base";
import * as Game_Logic from "./modules/firebase/RandomPicker"
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid'
import ShortUniqueId from 'short-unique-id'
import { process_payment } from './modules/firebase/processPayment'
import { processLocalPayment } from './modules/firebase/processLocalPayment'
import { check_game_date } from './modules/firebase/Draw'
import * as admin from "firebase-admin";

export const processPayments = functions.database.ref("payments/{paymentId}").onCreate(async (snapshot, context) => {

  process_payment(snapshot)
});

export const Local_processPayments = functions.database.ref("/local_pending_payments/{paymentId}").onCreate(async (snapshot, context) => {

  processLocalPayment(snapshot)
});


export const nation = functions.https.onRequest((request: any, response: any) => {

  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
export const BuyTickets = functions.database.ref('/tickets/{ticketId}').onCreate(async (snapshot, context) => {

  const data = snapshot.val()
  const ref = snapshot.ref
  const value = await Update_balance(data.quantity, data.user_id, data.game_title, ref, data.weeklyordaily)

})
export async function pending(req: Request, res: Response, next: NextFunction) {
  const ref = Models.rtdb.ref('tickets')
  await ref.push({
    uid: req.params.id,
    number_of_tickets: req.body.ticket_number,
    amount: req.body.amount,
    game_Id: req.body.game_Id,
    game: req.body.game

  });

  res.json({ penidng: true })


}

export async function createprofile(uid: any, email: any) {
  let bool = true
  let created_doc: any
  let created_doc_id: any


  while (true) {

    const uid = new ShortUniqueId({ length: 10 });
    let paymentId = uid();
    let paymentid = { paymentId: paymentId }
    let auth_uid = { auth_uid: uid, email }
    let profile_completed = { profile_completed: false }
    let data = await Models.db.collection("users").where("paymentId ", "==", `${paymentId}`).get()
    if (data.empty) {
      created_doc = await Models.db.collection("users").add({ auth_uid: uid, email, paymentId: paymentId, profile_completed: false, UTID: "" })

      created_doc_id = await created_doc.id

      bool = false
      break
    }

  }

  if (bool == false) {
    while (true) {
      const uid = new ShortUniqueId({ length: 10 });
      let UTID = uid();
      let data_utid = await Models.db.collection("users").where("UTID ", "==", `${UTID}`).get()

      if (data_utid.empty) {
        await Models.db.collection("users").doc(created_doc_id).update({ UTID: UTID })

        break


      }

    }

  }
}


export const user_created_trigger = functions.auth.user().onCreate((user) => {
  createprofile(user.uid, user.email)
});

export async function start_end_date() {
  let date_array: any[] = [];
  var startdate = new Date();
  var start_date = new Date()
  const end_date = new Date(startdate.setDate(startdate.getDate() + 7))

  date_array.push(start_date, end_date)

  return (date_array)



}

// scheduler function 1st weekly lotto game

exports.game1lotterydraw= functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {

  const game_titles = await Game_Logic.game_id()
  const game_title1 = game_titles[0]
  console.log("The game_title in question is ....:", game_title1)
  const dates: any[] = await start_end_date()
  let game_startdate: any;
  let game_enddate: any;
  const game = await Models.db.collection("/games/lotto/weekly").where("title", "==", `${game_title1}`).get()

  let doc_id: any
  let data: any

  game.forEach(doc => {
    data = doc.data()
    doc_id = doc.id
    game_startdate = data.start_date
    game_enddate = data.end_date

  })
  console.log('The currenet Date is :', Date())
  console.log("The game end date is ", game_enddate)
  const epoch_game_end_date = game_enddate.toMillis()
  const comaprable_game_end_date = new Date(epoch_game_end_date)
  console.log(" The compareable end date of the game is : =>>>>>>> ", comaprable_game_end_date)
  if (new Date() > comaprable_game_end_date) {
    const winners = await Game_Logic.Weekly2_Jackpot_game(data.start_date, data.end_date)
    await Models.db.collection("/games/lotto/weekly").doc(`${doc_id}`).update({ locked: true, start_date: dates[0], end_date: dates[1] })

    console.log('This will be run every 1 minutes!');
  }



})
// scheduler function 2nd weekly lotto game


exports.game2lotterydraw= functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {
  const game_titles = await Game_Logic.game_id()
  const game_title2 = game_titles[1]
  console.log("The game_title in question is ....:", game_title2)
  const dates: any[] = await start_end_date()
  let game_startdate: any;
  let game_enddate: any;
  const game = await Models.db.collection("/games/lotto/weekly").where("title", "==", `${game_title2}`).get()

  let doc_id: any
  let data: any

  game.forEach(doc => {
    data = doc.data()
    doc_id = doc.id
    game_startdate = data.start_date
    game_enddate = data.end_date

  })
  console.log('The currenet Date is :', Date())
  console.log("The game end date is ", game_enddate)
  const epoch_game_end_date = game_enddate.toMillis()
  const comaprable_game_end_date = new Date(epoch_game_end_date)
  console.log(" The compareable end date of the game is : =>>>>>>> ", comaprable_game_end_date)
  if (new Date() > comaprable_game_end_date) {
    const winners = await Game_Logic.Weekly2_Jackpot_game(data.start_date, data.end_date)
    await Models.db.collection("/games/lotto/weekly").doc(`${doc_id}`).update({ locked: true, start_date: dates[0], end_date: dates[1] })
  }



})
// scheduler function 3rd weekly lotto game

exports.game3lotterydraw= functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {
  const game_titles = await Game_Logic.game_id()
  const game_title3 = game_titles[2]
  console.log("The game_title in question is ....:", game_title3)
  const dates: any[] = await start_end_date()
  let game_startdate: any;
  let game_enddate: any;
  const game = await Models.db.collection("/games/lotto/weekly").where("title", "==", `${game_title3}`).get()

  let doc_id: any
  let data: any

  game.forEach(doc => {

    data = doc.data()
    doc_id = doc.id
    game_startdate = data.start_date
    game_enddate = data.end_date

  })
  console.log('The currenet Date is :', Date())
  console.log("The game end date is ", game_enddate)
  const epoch_game_end_date = game_enddate.toMillis()
  const comaprable_game_end_date = new Date(epoch_game_end_date)
  console.log(" The compareable end date of the game is : =>>>>>>> ", comaprable_game_end_date)
  if (new Date() > comaprable_game_end_date) {
    const winners = await Game_Logic.Weekly2_Jackpot_game(data.start_date, data.end_date)
    await Models.db.collection("/games/lotto/weekly").doc(`${doc_id}`).update({ locked: true, start_date: dates[0], end_date: dates[1] })

   
  }



})
// scheduler function 4th weekly lotto game

exports.game4lotterydraw= functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {
  const game_titles = await Game_Logic.game_id()
  const game_title4 = game_titles[3]
  console.log("The game_title in question is ....:", game_title4)
  const dates: any[] = await start_end_date()
  let game_startdate: any;
  let game_enddate: any;
  const game = await Models.db.collection("/games/lotto/weekly").where("title", "==", `${game_title4}`).get()

  let doc_id: any
  let data: any

  game.forEach(doc => {

    data = doc.data()
    doc_id = doc.id
    game_startdate = data.start_date
    game_enddate = data.end_date

  })
  console.log('The currenet Date is :', Date())
  console.log("The game end date is ", game_enddate)
  const epoch_game_end_date = game_enddate.toMillis()
  const comaprable_game_end_date = new Date(epoch_game_end_date)
  console.log(" The compareable end date of the game is : =>>>>>>> ", comaprable_game_end_date)
  if (new Date() > comaprable_game_end_date) {
    const winners = await Game_Logic.Weekly2_Jackpot_game(data.start_date, data.end_date)
    await Models.db.collection("/games/lotto/weekly").doc(`${doc_id}`).update({ locked: true, start_date: dates[0], end_date: dates[1] })

   
  }



})


