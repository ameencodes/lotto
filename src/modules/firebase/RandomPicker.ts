import * as Models from "./base";
import * as admin from "firebase-admin";
export async function  determine_Prize_Pot(number_of_tickets:number,games_price :number) {

  const total_generated = number_of_tickets * games_price
 const profit =  (total_generated * 0.25) // profit fixed value that can be changed set at 25 %
  const total_prize_money  :any=   total_generated -  profit
  return total_prize_money
  }
  
export async function Winners_distrbuted_prize_amount (winners_array_ticket_id :any[],number_of_tickets:number,games_price:number) {
  const Winners_distrbuted_prize_amount_array = []
  const Total_Prize = await determine_Prize_Pot(number_of_tickets,games_price)
  const First_Place_Prize_amount :any =  Total_Prize * 0.7
  const Second_Place_Prize_amount =  Total_Prize * 0.2
  const Third_Place_Prize_amount =  Total_Prize * 0.1
  Winners_distrbuted_prize_amount_array.push(First_Place_Prize_amount,Second_Place_Prize_amount,Third_Place_Prize_amount)
  return Winners_distrbuted_prize_amount_array 



  // const winner_informaion : any []=  winner_informaion(winners_array_ticket_id)
 

}
export async function winner_information_setter(winners_array_ticket_id :any[],winners_distrbuted_prize_amount_array :any[]){

  for(let i =0;i<3;i++){
    let document_info :any = await (await Models.db.collection("tickets").doc(winners_array_ticket_id[i]).get()).data()
    
     let start_date  = document_info.start_date
     let end_date: any   = document_info.end_date
    let winner_id  =  document_info.id
    const user_id = document_info.ID
    await Models.db.collection("winners").add({
      position_prize:i,
      user_id: user_id,
      start_date: start_date,
       end_date: end_date,
       winner_ticketid: winners_array_ticket_id[i],
      PrizeAmount: winners_distrbuted_prize_amount_array[i]
    })
  }


  

}

// Using modern Fisher–Yates shuffle
export function randomisearray(TicketArray :any[]) :any {
  for (let i = TicketArray.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    const currentCard = TicketArray[i]
    const cardToSwap = TicketArray[swapIndex]
    TicketArray[i] = cardToSwap
    TicketArray[swapIndex] = currentCard
  }
  return TicketArray
  // randomize values in the array
}

export async function game_id () {

    const game_titles: any[] = []

    const ref= await Models.db.collection('/games/lotto/weekly').get()
    const query = ref.forEach(game =>{
        const game_data = game.data()
        const game_title = game_data.title 
        game_titles.push(game_title)
        
        
    })
    console.log(game_titles)
    return game_titles


}

export async function Weekly1_Jackpot_game() {
    let tickets_array: any[] = []
    const game_titles = await game_id()
    const game_title1 =  game_titles[0]
    const tickets = await Models.db.collection('ticket').where("game_name","==",`${game_title1}`).get()

    tickets.forEach((ticket) =>
      tickets_array.push(ticket.id)  

    )
    randomisearray(tickets_array)
}

export async function Delete_All_Tickets(game_title:any) {
  
  const ref =  await Models.db.collection('tickets').where("game_title","==",game_title).get()

  ref.forEach(async( doc)=>{
    doc.ref.delete()
  
  })

}

export async function Weekly2_Jackpot_game(game_start_date: any, game_end_date: any) {
  let winners_array: any[] = []
  let tickets_array: any = []
  let games_price: any
  games_price = 1
  const game_titles = await game_id()
  const game_title2 = game_titles[1]
  const tickets = await Models.db.collection('tickets').where("game_title", "==", game_title2).get()
  tickets.forEach((ticket) =>
    tickets_array.push(ticket.id)

  )
  const randomArray = randomisearray(tickets_array)
  for (let i = 0; i < 3; i++) {
    const winner_ticket_id = randomArray[i]
    winners_array.push(winner_ticket_id)
  }
  const winners_distrbuted_prize_amount = await Winners_distrbuted_prize_amount(winners_array, tickets_array.length, games_price)
  const Winner_information_setter = await winner_information_setter(winners_array, winners_distrbuted_prize_amount)
  console.log(winners_array)
  await Delete_All_Tickets(game_title2)
}


export async function  Weekly3_Jackpot_game (){
    let tickets_array: any[] = []
    const game_titles = await game_id()
    const game_title3 =  game_titles[2]
    const tickets = await Models.db.collection('tickets').where("game_name","==",`${game_title3}`).get()
    
    tickets.forEach((ticket) =>
      tickets_array.push(ticket.id)  

    )
    randomisearray(tickets_array)

}

export async function  Weekly4_Jackpot_game (){
    let tickets_array: any[] = []
    const game_titles = await game_id()
    const game_title4 =  game_titles[2]

    const tickets = await Models.db.collection('ticket').where("game_name","==",`${game_title4}`).get()
    
    tickets.forEach((ticket) =>
      tickets_array.push(ticket.id)  

    )
    randomisearray(tickets_array)

}
