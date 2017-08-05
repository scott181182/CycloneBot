"use strict";
exports.__esModule = true;
var groupme_service_1 = require("./services/groupme.service");
var alexa_service_1 = require("./services/alexa.service");
var status_handler_1 = require("./handlers/status.handler");
var groupme_handler_1 = require("./handlers/groupme.handler");
var alexa_handler_1 = require("./handlers/alexa.handler");
var flux_handler_1 = require("./handlers/flux.handler");
exports.SERVICES = [
    groupme_service_1.GroupMeService,
    alexa_service_1.AlexaService
];
exports.ROUTES = {
    "/api/status": { get: status_handler_1.StatusHandler },
    "/callback": { post: groupme_handler_1.GroupMeCallback },
    "/api/groupme/test": { get: groupme_handler_1.GroupeMeTest },
    "/api/alexa": { post: alexa_handler_1.AlexaHandler },
    "/api/flux/:control": { get: flux_handler_1.LightHandler }
};
