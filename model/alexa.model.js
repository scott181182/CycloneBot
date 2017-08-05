"use strict";
exports.__esModule = true;
var AlexaResponse = (function () {
    function AlexaResponse() {
        this.tell("I don't know what to say!");
    }
    AlexaResponse.prototype.tell = function (text) {
        this.outputSpeech = { type: "PlainText", text: text };
        this.shouldEndSession = true;
    };
    AlexaResponse.prototype.ssml = function (ssml) {
        this.outputSpeech = { type: "SSML", ssml: ssml };
        this.shouldEndSession = true;
    };
    AlexaResponse.prototype.prompt = function (text, reprompt) {
        if (reprompt === void 0) { reprompt = "What is my purpose?"; }
        this.tell(text);
        this.reprompt = { outputSpeech: { type: "PlainText", text: reprompt } };
        this.shouldEndSession = false;
    };
    AlexaResponse.prototype.promptSSML = function (text, reprompt) {
        this.ssml(text);
        this.reprompt = { outputSpeech: { type: "SSML", ssml: reprompt } };
        this.shouldEndSession = false;
    };
    return AlexaResponse;
}());
exports.AlexaResponse = AlexaResponse;
