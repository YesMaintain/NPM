"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Directory_js_1 = require("../Library/Directory.js");
var Package_js_1 = require("../Library/Package.js");
var Type_js_1 = require("../Library/Type.js");
var Dependabot_js_1 = require("../Option/Dependabot.js");
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var path_1 = require("path");
/**
 * It creates a `dependabot.yml` file in each `.github` directory of each repository in the current
 * working directory
 * @param {Files} Files - This is an array of objects that contain the path, name, and workflow
 * function.
 */
var Workflow = function (Files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, Files_1, _a, Path, Name, File_1, _b, _c, _d, _e, _Dir, FilesPackage, GitHub, Base, _loop_1, _f, FilesPackage_1, Package, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _i = 0, Files_1 = Files;
                _l.label = 1;
            case 1:
                if (!(_i < Files_1.length)) return [3 /*break*/, 26];
                _a = Files_1[_i], Path = _a.Path, Name = _a.Name, File_1 = _a.File;
                _b = 0;
                _d = Directory_js_1.default;
                return [4 /*yield*/, (0, Package_js_1.default)()];
            case 2: return [4 /*yield*/, _d.apply(void 0, [_l.sent()])];
            case 3:
                _c = _l.sent();
                _l.label = 4;
            case 4:
                if (!(_b < _c.length)) return [3 /*break*/, 25];
                _e = _c[_b], _Dir = _e[0], FilesPackage = _e[1];
                GitHub = "".concat(_Dir, "/.github");
                return [4 /*yield*/, File_1()];
            case 5:
                Base = _l.sent();
                if (!(Path === "/")) return [3 /*break*/, 9];
                _loop_1 = function (Package) {
                    var DirPackage, Environment;
                    return __generator(this, function (_m) {
                        switch (_m.label) {
                            case 0:
                                DirPackage = (0, path_1.dirname)(Package).replace(_Dir, "");
                                return [4 /*yield*/, (0, Type_js_1.default)()];
                            case 1:
                                Environment = (_m.sent()).get(Package.split("/").pop());
                                if (Environment !== "Cloudflare") {
                                    Base.add("\n    - package-ecosystem: \"".concat(typeof Environment !== "undefined"
                                        ? String(Environment).toLowerCase()
                                        : (function () {
                                            switch (Package.split(".").pop()) {
                                                case "csproj":
                                                    return "nuget";
                                                default:
                                                    return "npm";
                                            }
                                        })(), "\"\n      directory: \"").concat(DirPackage ? DirPackage : "/", "\"\n      schedule:\n          interval: \"daily\"\n      versioning-strategy: ").concat(typeof Environment !== "undefined"
                                        ? (function () {
                                            switch (Environment) {
                                                case "Cargo":
                                                    return "lockfile-only";
                                                default:
                                                    return "increase";
                                            }
                                        })()
                                        : "increase", "\n"));
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _f = 0, FilesPackage_1 = FilesPackage;
                _l.label = 6;
            case 6:
                if (!(_f < FilesPackage_1.length)) return [3 /*break*/, 9];
                Package = FilesPackage_1[_f];
                return [5 /*yield**/, _loop_1(Package)];
            case 7:
                _l.sent();
                _l.label = 8;
            case 8:
                _f++;
                return [3 /*break*/, 6];
            case 9:
                if (!(Base.size > 0)) return [3 /*break*/, 17];
                _l.label = 10;
            case 10:
                _l.trys.push([10, 12, , 13]);
                return [4 /*yield*/, (0, promises_1.mkdir)("".concat(GitHub).concat(Path), {
                        recursive: true,
                    })];
            case 11:
                _l.sent();
                return [3 /*break*/, 13];
            case 12:
                _g = _l.sent();
                console.log("Could not create: ".concat(GitHub).concat(Path));
                return [3 /*break*/, 13];
            case 13:
                _l.trys.push([13, 15, , 16]);
                return [4 /*yield*/, (0, promises_1.writeFile)("".concat(GitHub).concat(Path).concat(Name), "".concat(__spreadArray([], Base, true).join("")))];
            case 14:
                _l.sent();
                return [3 /*break*/, 16];
            case 15:
                _h = _l.sent();
                console.log("Could not create workflow for: ".concat(GitHub, "/dependabot.yml"));
                return [3 /*break*/, 16];
            case 16: return [3 /*break*/, 24];
            case 17:
                _l.trys.push([17, 23, , 24]);
                return [4 /*yield*/, (0, promises_1.access)("".concat(GitHub).concat(Path).concat(Name), fs_1.constants.F_OK)];
            case 18:
                _l.sent();
                _l.label = 19;
            case 19:
                _l.trys.push([19, 21, , 22]);
                return [4 /*yield*/, (0, promises_1.rm)("".concat(GitHub).concat(Path).concat(Name))];
            case 20:
                _l.sent();
                return [3 /*break*/, 22];
            case 21:
                _j = _l.sent();
                console.log("Could not remove ".concat(Path).concat(Name, " for: ").concat(GitHub));
                return [3 /*break*/, 22];
            case 22: return [3 /*break*/, 24];
            case 23:
                _k = _l.sent();
                return [3 /*break*/, 24];
            case 24:
                _b++;
                return [3 /*break*/, 4];
            case 25:
                _i++;
                return [3 /*break*/, 1];
            case 26: return [2 /*return*/];
        }
    });
}); };
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Workflow(Dependabot_js_1.default)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
