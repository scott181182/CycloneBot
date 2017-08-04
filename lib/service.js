"use strict";
exports.__esModule = true;
var logger_1 = require("./logger");
var logger = logger_1["default"]["for"]("status");
var Status = (function () {
    function Status(status, message) {
        this.status = status;
        this.message = message;
    }
    Status.ok = function (msg) { return new Status("ok", msg || ""); };
    Status.error = function (msg) { return new Status("error", msg); };
    Status.prototype.succeeded = function () { return this.status === "ok"; };
    return Status;
}());
exports.Status = Status;
