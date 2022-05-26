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
exports.Weekly4_Jackpot_game = exports.Weekly3_Jackpot_game = exports.Weekly2_Jackpot_game = exports.Weekly1_Jackpot_game = exports.game_id = exports.randomisearray = void 0;
var Models = require("./base");
// Using modern Fisher–Yates shuffle
function randomisearray(TicketArray) {
    for (var i = TicketArray.length - 1; i > 0; i--) {
        var swapIndex = Math.floor(Math.random() * (i + 1));
        var currentCard = TicketArray[i];
        var cardToSwap = TicketArray[swapIndex];
        TicketArray[i] = cardToSwap;
        TicketArray[swapIndex] = currentCard;
    }
    return TicketArray;
    // randomize values in the array
}
exports.randomisearray = randomisearray;
function game_id() {
    return __awaiter(this, void 0, void 0, function () {
        var game_titles, ref, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    game_titles = [];
                    return [4 /*yield*/, Models.db.collection('/games/lotto/weekly').get()];
                case 1:
                    ref = _a.sent();
                    query = ref.forEach(function (game) {
                        var game_data = game.data();
                        var game_title = game_data.title;
                        game_titles.push(game_title);
                    });
                    return [2 /*return*/, game_titles];
            }
        });
    });
}
exports.game_id = game_id;
function Weekly1_Jackpot_game() {
    return __awaiter(this, void 0, void 0, function () {
        var game_titles, game_title1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, game_id()];
                case 1:
                    game_titles = _a.sent();
                    game_title1 = game_titles[0];
                    return [2 /*return*/, game_title1];
            }
        });
    });
}
exports.Weekly1_Jackpot_game = Weekly1_Jackpot_game;
function Weekly2_Jackpot_game() {
    return __awaiter(this, void 0, void 0, function () {
        var game_titles, game_title2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, game_id()];
                case 1:
                    game_titles = _a.sent();
                    game_title2 = game_titles[1];
                    return [2 /*return*/, game_title2];
            }
        });
    });
}
exports.Weekly2_Jackpot_game = Weekly2_Jackpot_game;
function Weekly3_Jackpot_game() {
    return __awaiter(this, void 0, void 0, function () {
        var game_titles, game_title3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, game_id()];
                case 1:
                    game_titles = _a.sent();
                    game_title3 = game_titles[2];
                    return [2 /*return*/, game_title3];
            }
        });
    });
}
exports.Weekly3_Jackpot_game = Weekly3_Jackpot_game;
function Weekly4_Jackpot_game() {
    return __awaiter(this, void 0, void 0, function () {
        var game_titles, game_title4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, game_id()];
                case 1:
                    game_titles = _a.sent();
                    game_title4 = game_titles[2];
                    return [2 /*return*/, game_title4];
            }
        });
    });
}
exports.Weekly4_Jackpot_game = Weekly4_Jackpot_game;
Weekly1_Jackpot_game();
