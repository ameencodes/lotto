import {  addToFireStore } from './processPayment'
import { db, Update } from './base'

let payee_uid: string
let payor_current_balance: number
let payor_updated_balance: number
let payee_current_balance: number
let payee_updated_balance: number

export async function processLocalPayment(snapshot: any) {
    const transaction_data = snapshot.val()
    const payor_uid = transaction_data.payor_uid
    const payee_paymentid = transaction_data.payment_id
    let transfer_amount = transaction_data.transfer_amount
    // transfer_amount = Number(transfer_amount).toFixed(3)
    transfer_amount = Number(transfer_amount)
    payor_current_balance = await get_balance(payor_uid)
    payor_updated_balance = payor_current_balance - transfer_amount
    payor_updated_balance = Number(payor_updated_balance.toFixed(3))
    payee_updated_balance = await new_payee_balance(payee_paymentid, transfer_amount)
 await updatebalance(payor_uid, payor_updated_balance)
 await updatebalance(payee_uid, payee_updated_balance)

     addToFireStore({ 
        payee_paymentid :payee_paymentid,
    payor_uid: payor_uid ,
    transfer_amount: transfer_amount,
    provider: "Local Payment",
    payor_balance_before: payor_current_balance,
    payor_balance_after: payor_updated_balance ,
    payee_balance_before:payee_current_balance ,
    payee_balance_after:payee_updated_balance
    })
    
}

async function get_balance(uid: string) {
    const document_data: any = await (await db.collection("users").doc(uid).get()).data()
    let balance = document_data.balance
    // balance = Number(balance).toFixed(3)
    return balance
}

async function new_payee_balance(paymentid: string, transfer_amount: number) {
    const query = await db.collection("users").where("payment_id", "==", paymentid).get()
    query.forEach(doc => {
        payee_uid = doc.id
        const val = doc.data()
        payee_current_balance = val.balance
    })
    payee_updated_balance = Number(payee_current_balance) + (transfer_amount)
    payee_updated_balance = payee_current_balance + (transfer_amount)

    payee_updated_balance = Number(payee_updated_balance.toFixed(3))
    return payee_updated_balance
}

async function updatebalance(uid: string, updated_balance: number) {
    await Update("users", uid, { balance: updated_balance })
}