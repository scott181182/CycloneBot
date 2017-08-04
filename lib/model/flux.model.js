"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var fluxjs_1 = require("fluxjs");
var myBulb = new fluxjs_1.FluxBulb(config_1["default"].get("flux.ip"));
exports["default"] = myBulb;
