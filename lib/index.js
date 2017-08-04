"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var config_1 = require("./config");
var logger_1 = require("./logger");
var logger = logger_1["default"]["for"]("index");
var application_1 = require("./application");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
process.on("uncaughtException", function (err) {
    switch (err.code) {
        case "EADDRINUSE":
            logger.error("   Address currently in use!");
            break;
        case "EACCES":
            logger.error("   Admin access required to use port " + app.get("port"));
            break;
        default: logger.error(err.stack);
    }
});
function main(args) {
    app.set("mode", config_1["default"].get("env"));
    app.set("port", config_1["default"].get("server.port"));
    app.set("staticDir", config_1["default"].getPath("server.staticDir"));
    var application = new application_1["default"](app);
    application.init().then(function () { return application.start(); });
}
main(process.argv.slice(2));
