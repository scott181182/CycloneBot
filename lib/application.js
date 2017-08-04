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
var express_1 = require("express");
var logger_1 = require("./logger");
var logger = logger_1["default"]["for"]("app");
var routes_1 = require("./routes");
var service_1 = require("./service");
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var Application = (function () {
    function Application(app) {
        this.app = app;
        this.services = {};
        this.handlers = {};
    }
    Application.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        routes_1.SERVICES.forEach(function (serv) {
                            _this.services[serv.name] = new serv();
                        });
                        return [4, this.initServices()];
                    case 1:
                        stat = _a.sent();
                        if (!stat.succeeded()) {
                            logger.lethal(stat.message);
                        }
                        else {
                            logger.info(stat.message);
                        }
                        Object.keys(routes_1.ROUTES).forEach(function (path) {
                            var hooks = routes_1.ROUTES[path];
                            Object.keys(hooks).forEach(function (method) {
                                var handlerClass = hooks[method];
                                var handler = _this.injectHandler(handlerClass);
                                _this.handlers[handlerClass.name] = handler;
                                _this.app[method](path, handler.handle.bind(handler));
                            });
                        });
                        this.app.use(express_1.static(this.app.get("staticDir")));
                        this.app.get("*", function (req, res) {
                            return res.status(404).json({ status: service_1.Status.error("Resource not found!") });
                        });
                        return [2];
                }
            });
        });
    };
    Application.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            logger.info("Server running!\n   Port: " + _this.app.get("port") + "\n   Mode: " + _this.app.get("mode"));
            logger.info(_this.app.get("mode") === "dev" ?
                "To run in production, pass 'prod' as an argument" :
                "To run in development, don't pass 'prod' as an argument");
        });
    };
    Application.prototype.initServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, keys, _i, keys_1, key, stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = service_1.Status.ok("All Services initialized successfully!");
                        keys = Object.keys(this.services);
                        _i = 0, keys_1 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3, 4];
                        key = keys_1[_i];
                        logger.info("   Initializing service [" + key + "]...");
                        return [4, this.services[key].init()];
                    case 2:
                        stat = _a.sent();
                        if (!stat.succeeded()) {
                            ret = service_1.Status.error("[" + key + "] " + stat.message);
                            return [3, 4];
                        }
                        logger.info("   " + stat.message);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, ret];
                }
            });
        });
    };
    Application.prototype.injectHandler = function (fn) {
        var _this = this;
        var handl = new fn();
        var inject = handl._inject;
        if (inject) {
            Object.keys(inject).forEach(function (field) {
                handl[field] = _this.services[inject[field]];
            });
        }
        return handl;
    };
    return Application;
}());
exports["default"] = Application;
