"use strict";
exports.__esModule = true;
var config_1 = require("../config");
var fluxjs_1 = require("fluxjs");
var myBulb = new fluxjs_1.FluxBulb(config_1["default"].get("flux.ip"));
exports["default"] = myBulb;
exports.ColorMap = {
    "white": new fluxjs_1.Color(255, 255, 255),
    "red": new fluxjs_1.Color(255, 0, 0),
    "green": new fluxjs_1.Color(0, 255, 0),
    "blue": new fluxjs_1.Color(0, 0, 255),
    "yellow": new fluxjs_1.Color(255, 255, 0),
    "magenta": new fluxjs_1.Color(255, 0, 255),
    "cyan": new fluxjs_1.Color(0, 255, 255),
    "purple": new fluxjs_1.Color(128, 0, 128),
    "orange": new fluxjs_1.Color(255, 128, 255),
    "fuchsia": new fluxjs_1.Color(255, 0, 255),
    "pink": new fluxjs_1.Color(255, 192, 203)
};
