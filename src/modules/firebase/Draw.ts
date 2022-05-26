
import * as Models from "./base";
import * as random from"./RandomPicker" ;
import * as admin from "firebase-admin";


export async function draw(game_title: string) {
 let winners_array :any [] = []
    let tickets_array:any = []
    let games_price:any
    games_price = 1
    const tickets = await Models.db.collection('ticket').where("game_name","==",`${game_title}`).get()
    tickets.forEach((ticket) =>
     tickets_array.push(ticket.id)  
)
   const randomArray =  random.randomisearray(tickets_array)
   for(let i=0;i<3;i++){
     const   winner_ticket_id = randomArray[i]
     winners_array.push(winner_ticket_id)
   }
   const winners_distrbuted_prize_amount = await random.Winners_distrbuted_prize_amount (winners_array,tickets_array.length,games_price)
   const Winner_information_setter = await random.winner_information_setter(winners_array,winners_distrbuted_prize_amount)   
}


export async function check_game_date () {
    let day_game_id :any
    let weeky_game_id :any

    let cc :any  =  new Date()
    // const new_end_date:any 

let weekly_games_end_dates :any[] = []
let daily_games_end_dates :any[] = []
let game_title :string 
let end_date :any 
const date = new Date()
 const currentTime =  admin.firestore.Timestamp.fromDate(date)


const weekly_games = await Models.db.collection("games/lotto/weekly").get()
const daily_games = await Models.db.collection("games/lotto/daily").get()

weekly_games.forEach((game) => {
    const game_id =game.id
    const data = game.data()
  game_title = data.title
     end_date = data.end_date
   //s weekly_games_end_dates.push({"game_id":game_id,"end_date":end_date})
    weekly_games_end_dates.push(end_date)

})

weekly_games_end_dates.forEach(async (game) => {
    for (let id in game){
        if( currentTime> game[id].end_date) {
            await weekly_lock(id)
            await draw(game_title)
            await change_game_draw_date(id,currentTime)
        }

    }
})

daily_games.forEach((game) => {

    const data = game.data()
    const day_game_id = game.id
   const end_date = data.end_date
   daily_games_end_dates.push({"game_id":day_game_id ,"end_date":end_date})
})
daily_games_end_dates.forEach(async (game) => {
    for (let id in game){
        if( currentTime> game[id].end_date) {
            await daily_lock(id)
            await draw(game_title)
            await change_game_draw_date(id,currentTime)
        }

    }
})

}


//tickets cannot be bought if draw 
export  async function weekly_lock (game_id: string){
    await Models.Update("/games/lotto/weekly",game_id,{lock:true})
}
export async function daily_lock(game_id: string){
    await Models.Update("/games/lotto/daily",game_id,{lock:true})
}

export async function change_game_draw_date(game_id:string, currentTime:any){
let new_end_date = currentTime.setDate(currentTime.getDate() + 7);
new_end_date  =  admin.firestore.Timestamp.fromDate(new_end_date)



await Models.Update("/games/lotto/daily",game_id,{
    "start_date":currentTime,
     "end_date":new_end_date
})
}