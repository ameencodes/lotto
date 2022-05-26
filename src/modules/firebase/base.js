"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.create_doc_subcollection_doc = exports.create = exports.remove = exports.Update_nested_field = exports.Update = exports.get_field = exports.document_subcollection = exports.get_document = exports.reference = exports.rtdb = exports.db = void 0;
var index_1 = require("./index");
exports.db = index_1.admin.firestore();
exports.rtdb = index_1.admin.database();
// create reference of colleciton
function reference(collection) {
    return __awaiter(this, void 0, void 0, function () {
        var ref;
        return __generator(this, function (_a) {
            ref = exports.db.collection("" + collection);
            return [2 /*return*/, ref];
        });
    });
}
exports.reference = reference;
// returns document
function get_document(collection, UserId) {
    return __awaiter(this, void 0, void 0, function () {
        var ref, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference(collection)];
                case 1:
                    ref = _a.sent();
                    return [4 /*yield*/, ref];
                case 2: return [4 /*yield*/, (_a.sent()).doc("" + UserId).get()];
                case 3: return [4 /*yield*/, (_a.sent()).data()];
                case 4:
                    value = _a.sent();
                    console.log(value);
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.get_document = get_document;
// returns a subollection of a doucment
function document_subcollection(collection, UserId, subcollection, number_subcollection) {
    return __awaiter(this, void 0, void 0, function () {
        var ref, document, subcolleciton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference(collection)];
                case 1:
                    ref = _a.sent();
                    return [4 /*yield*/, ref.doc("" + UserId)];
                case 2:
                    document = _a.sent();
                    return [4 /*yield*/, document.collection("" + subcollection)];
                case 3:
                    subcolleciton = _a.sent();
                    return [2 /*return*/, subcolleciton];
            }
        });
    });
}
exports.document_subcollection = document_subcollection;
// returns the field requested
function get_field(collection, UserId, field) {
    return __awaiter(this, void 0, void 0, function () {
        var ref, value, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference(collection)];
                case 1:
                    ref = _a.sent();
                    return [4 /*yield*/, ref];
                case 2: return [4 /*yield*/, (_a.sent()).doc("" + UserId).get()];
                case 3: return [4 /*yield*/, (_a.sent()).data()];
                case 4:
                    value = _a.sent();
                    data = value.field;
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.get_field = get_field;
// Updates Document
function Update(collection, docToEdit, data) {
    return __awaiter(this, void 0, void 0, function () {
        var collection_refernce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference(collection)];
                case 1:
                    collection_refernce = _a.sent();
                    return [4 /*yield*/, collection_refernce];
                case 2: return [4 /*yield*/, (_a.sent()).doc("" + docToEdit)];
                case 3: return [4 /*yield*/, (_a.sent()).update(data)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.Update = Update;
// Updates a nested record in firestore
function Update_nested_field(collection, docToEdit, data) {
    return __awaiter(this, void 0, void 0, function () {
        var ref;
        var _this = this;
        return __generator(this, function (_a) {
            ref = reference(collection);
            data.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ref];
                        case 1:
                            (_a.sent()).doc("" + docToEdit).update({
                                item: item
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.Update_nested_field = Update_nested_field;
function remove(collection, docToEdit) {
    return __awaiter(this, void 0, void 0, function () {
        var collection_refernce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference(collection)];
                case 1:
                    collection_refernce = _a.sent();
                    return [4 /*yield*/, collection_refernce];
                case 2: return [4 /*yield*/, (_a.sent()).doc("" + docToEdit)["delete"]().then(function () {
                        console.log("The document has been succesfully");
                    })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function create(collection, data) {
    return __awaiter(this, void 0, void 0, function () {
        var collection_refernce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reference("" + collection)];
                case 1:
                    collection_refernce = _a.sent();
                    // await collection_refernce.add({d :data})
                    return [4 /*yield*/, collection_refernce.add({ data: data }).then(function (documentReference) {
                            console.log("Added document with name: " + documentReference.id);
                        })];
                case 2:
                    // await collection_refernce.add({d :data})
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function create_doc_subcollection_doc(collection, UserId, subcollection, data) {
    return __awaiter(this, void 0, void 0, function () {
        var doc_subcollection_ref;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, document_subcollection(collection, UserId, subcollection, data)];
                case 1:
                    doc_subcollection_ref = _a.sent();
                    return [4 /*yield*/, doc_subcollection_ref.add({ data: data }).then(function (documentReference) {
                            console.log("Added document with name: " + documentReference.id);
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create_doc_subcollection_doc = create_doc_subcollection_doc;
// export  const show  = functions.https.onCall(async  (data , context) => {
//     const collection_refernce = reference(data.collection);
//     let value   = await (await (await collection_refernce).doc(`${data.id}`).get()).data()
//    return value
// })
// show("games","l26h9o6MGR0BZjExvRm4")
// get_document("games","l26h9o6MGR0BZjExvRm4")
