"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var config_1 = require("../config");
var service_1 = require("../service");
var alexa_model_1 = require("../model/alexa.model");
var flux_model_1 = require("../model/flux.model");
var logger_1 = require("../logger");
var logger = logger_1["default"]["for"]("alexa");
var APP_ID = config_1["default"].get("alexa.appID");
var AlexaService = (function () {
    function AlexaService() {
        var _this = this;
        this.intentMap = {
            "AMAZON.CancelIntent": function (req, res) { return _this.handleSessionEndedRequest; },
            "AMAZON.StopIntent": function (req, res) { return _this.handleSessionEndedRequest; },
            "TurnLightOn": function (req, res) { flux_model_1["default"].turnOn(false); return {}; },
            "TurnLightOff": function (req, res) { flux_model_1["default"].turnOff(false); return {}; },
            "TurnLightColor": function (req, res) {
                return {};
            }
        };
    }
    AlexaService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, service_1.Status.ok("empty")];
            });
        });
    };
    AlexaService.prototype.processRequest = function (req) {
        var request = req;
        if (request.session.application.applicationId !== APP_ID) {
            return Promise.reject("Invalid Application ID!");
        }
        var response = new alexa_model_1.AlexaResponse();
        var sessionMap;
        switch (request.request.type) {
            case "LaunchRequest":
                this.handleLaunchRequest(response);
                break;
            case "IntentRequest":
                sessionMap = this.handleIntentRequest(request, response);
                break;
            case "SessionEndedRequest":
                this.handleSessionEndedRequest(response);
                break;
        }
        return Promise.resolve({ version: "1.0", response: response, sessionAttributes: sessionMap });
    };
    AlexaService.prototype.handleLaunchRequest = function (response) {
        response.prompt("Cyclone Bot here. You can give me commands, like turn off the light, or turn the light green", "What is my purpose?");
    };
    AlexaService.prototype.handleIntentRequest = function (request, response) {
        if (this.intentMap[request.request.intent.name]) {
            return this.intentMap[request.request.intent.name](request, response);
        }
        else {
            this.handleUnhandledRequest(response);
            return {};
        }
    };
    AlexaService.prototype.handleSessionEndedRequest = function (response) {
        response.tell("Goodbye!");
        response.shouldEndSession = true;
        return {};
    };
    AlexaService.prototype.handleUnhandledRequest = function (response) {
        response.prompt("Sorry, I don't know how to do that. Please try again", "What is my purpose?");
    };
    return AlexaService;
}());
exports.AlexaService = AlexaService;
