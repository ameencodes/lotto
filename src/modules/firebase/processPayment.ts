import { db, Update } from './base'

export async function process_payment(snapshot: any) {
    const data = snapshot.val()
    let givenHash: string = data.V2_HASH
    let calculatedHash: string = data.my_hash
    let paymentid: string = data.PAYMENT_ID
    let depositamount = Number(data.PAYMENT_AMOUNT)
    const timestamp = new Date().getTime()
    if (givenHash == calculatedHash) {
        const timestamp = new Date().getTime()
        addToFireStore({
            timestamp: timestamp, match: true,
            provider: "Perfect Money",
            myhash: calculatedHash,
            perfect_money_v2_hash: givenHash
        })
        updatebalance(depositamount, paymentid)

    }
}

export async function addToFireStore(transaction: any) {
    await db.collection('transaction').add(transaction)
}

async function updatebalance(deposit_amount: number, paymentid: string) {
    let new_balance: number = 0
    let current_balance: number
    var deposit_id: string = ""
    const query = await db.collection("users").where("payment_id", "==", paymentid).get()

    query.forEach(doc => {
        deposit_id = doc.id
        const val = doc.data()
        current_balance = val.balance
        new_balance = current_balance + Number(deposit_amount.toFixed(3))
    })
    await Update("users", deposit_id, { balance: new_balance })








}