"use strict";
exports.__esModule = true;
exports.admin = exports.functions = void 0;
var functions = require("firebase-functions");
exports.functions = functions;
var admin = require("firebase-admin");
exports.admin = admin;
//  import  { getFirestore} from  "@firebase/firestore"
// import { getFirestore } from 'firebase/firestore'
var serviceaccount_json_1 = require("./serviceaccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceaccount_json_1["default"]),
    databaseURL: "https://lotto-48a43-default-rtdb.europe-west1.firebasedatabase.app"
});
