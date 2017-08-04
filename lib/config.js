"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var pure_config_1 = require("pure-config");
var CONFIG_DIR = __dirname + "/config";
var MODE = process.argv[2] ? process.argv[2] :
    fs_1.existsSync(CONFIG_DIR + "/mode.txt") ? fs_1.readFileSync(CONFIG_DIR + "/mode.txt", "utf8").trim() :
        process.env.NODE_ENV ? process.env.NODE_ENV :
            "dev";
var config = new pure_config_1.Configuration(CONFIG_DIR + "/" + MODE + "/config.pure");
config.put("env", MODE);
exports["default"] = config;
