"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var config_1 = require("./config");
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["ERROR"] = 0] = "ERROR";
    LogLevels[LogLevels["WARN"] = 1] = "WARN";
    LogLevels[LogLevels["INFO"] = 2] = "INFO";
    LogLevels[LogLevels["DEBUG"] = 3] = "DEBUG";
})(LogLevels || (LogLevels = {}));
var LEVEL = config_1["default"].get("env") === "prod" ? LogLevels.INFO : LogLevels.DEBUG;
var outFile = config_1["default"].get("logger.outFile");
var errFile = config_1["default"].get("logger.errFile");
var outPath = config_1["default"].getPath("logger.outFile");
var errPath = config_1["default"].getPath("logger.errFile");
var writer = {
    log: outFile === "console" ?
        function (msg) { return console.log(msg); } :
        function (msg) { return fs_1.appendFileSync(outPath, msg + "\n"); },
    error: errFile === "console" ?
        function (msg) { return console.error(msg); } :
        function (msg) { return fs_1.appendFileSync(errPath, msg + "\n"); }
};
function pad(num) { return (num < 10 ? "0" : "") + num; }
function getTimestamp() {
    var now = new Date();
    return now.getFullYear() +
        "-" + pad(now.getMonth() + 1) +
        "-" + pad(now.getDate()) +
        " " + pad(now.getHours()) +
        ":" + pad(now.getMinutes()) +
        ":" + pad(now.getSeconds());
}
var Logger = (function () {
    function Logger(domain) {
        this.domain = domain;
        this.level = LEVEL;
    }
    Logger["for"] = function (domain) { return new Logger(domain); };
    Logger.prototype.writeln = function (msg, tags, error) {
        var preamble = tags.map(function (dom) { return "[" + dom + "]"; }).join(" ");
        var timestamp = getTimestamp();
        var message = "[" + timestamp + "]" + preamble + " : " + msg;
        writer[error ? "error" : "log"](message);
    };
    Logger.prototype.println = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        this.writeln(msg, tags, false);
    };
    Logger.prototype.errorln = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        this.writeln(msg, tags, true);
    };
    Logger.prototype.lethal = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        this.errorln.apply(this, [msg, "lethal"].concat(tags));
        process.exit(1);
    };
    Logger.prototype.error = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        if (this.level >= LogLevels.ERROR) {
            this.errorln.apply(this, [msg, "error", this.domain].concat(tags));
        }
    };
    Logger.prototype.warn = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        if (this.level >= LogLevels.WARN) {
            this.errorln.apply(this, [msg, "warn", this.domain].concat(tags));
        }
    };
    Logger.prototype.info = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        if (this.level >= LogLevels.INFO) {
            this.println.apply(this, [msg, "info", this.domain].concat(tags));
        }
    };
    Logger.prototype.debug = function (msg) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        if (this.level >= LogLevels.DEBUG) {
            this.println.apply(this, [msg, "debug", this.domain].concat(tags));
        }
    };
    return Logger;
}());
exports["default"] = Logger;
