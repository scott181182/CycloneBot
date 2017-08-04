"use strict";
exports.__esModule = true;
function Inject(className) {
    return function (clazz, name) {
        var obj = clazz;
        if (!obj._inject) {
            obj._inject = {};
        }
        obj._inject[name] = className;
    };
}
exports.Inject = Inject;
