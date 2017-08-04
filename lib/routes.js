"use strict";
exports.__esModule = true;
var groupme_service_1 = require("./services/groupme.service");
var status_handler_1 = require("./handlers/status.handler");
var groupme_handler_1 = require("./handlers/groupme.handler");
exports.SERVICES = [
    groupme_service_1.GroupMeService
];
exports.ROUTES = {
    "/api/status": { get: status_handler_1.StatusHandler },
    "/callback": { post: groupme_handler_1.GroupMeCallback },
    "/api/groupme/test": { get: groupme_handler_1.GroupeMeTest }
};
