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
var Node_js_1 = require("../Option/Node.js");
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var path_1 = require("path");
/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Files} files - containers
 */
var Workflow = function (files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, files_1, _a, Path, Name, File_1, _b, _c, _d, _e, directory, packageFiles, githubDir, workflowBase, _f, packageFiles_1, _package, packageDirectory, packageFile, environment, packageJSON, _g, _h, bundle, key, values, scripts, _j, _k, _l, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                _i = 0, files_1 = files;
                _o.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 27];
                _a = files_1[_i], Path = _a.Path, Name = _a.Name, File_1 = _a.File;
                _b = 0;
                _d = Directory_js_1.default;
                return [4 /*yield*/, (0, Package_js_1.default)("NPM")];
            case 2: return [4 /*yield*/, _d.apply(void 0, [_o.sent()])];
            case 3:
                _c = _o.sent();
                _o.label = 4;
            case 4:
                if (!(_b < _c.length)) return [3 /*break*/, 26];
                _e = _c[_b], directory = _e[0], packageFiles = _e[1];
                githubDir = "".concat(directory, "/.github");
                return [4 /*yield*/, File_1()];
            case 5:
                workflowBase = _o.sent();
                if (!(Path === "/workflows/" && Name === "Node.yml")) return [3 /*break*/, 10];
                _f = 0, packageFiles_1 = packageFiles;
                _o.label = 6;
            case 6:
                if (!(_f < packageFiles_1.length)) return [3 /*break*/, 10];
                _package = packageFiles_1[_f];
                packageDirectory = (0, path_1.dirname)(_package).replace(directory, "");
                return [4 /*yield*/, (0, promises_1.readFile)(_package, "utf-8")];
            case 7:
                packageFile = (_o.sent()).toString();
                return [4 /*yield*/, (0, Type_js_1.default)()];
            case 8:
                environment = (_o.sent()).get(_package.split("/").pop());
                if (typeof environment !== "undefined" &&
                    environment === "NPM") {
                    packageJSON = JSON.parse(packageFile);
                    for (_g = 0, _h = [
                        "bundledDependencies",
                        "bundleDependencies",
                        "dependencies",
                        "devDependencies",
                        "extensionDependencies",
                        "optionalDependencies",
                        "peerDependencies",
                        "peerDependenciesMeta",
                    ].sort(); _g < _h.length; _g++) {
                        bundle = _h[_g];
                        if (typeof packageJSON[bundle] !== "undefined") {
                            workflowBase.add("\n            - uses: actions/setup-node@v3.8.1\n              with:\n                  node-version: ${{ matrix.node-version }}\n                  cache: \"pnpm\"\n                  cache-dependency-path: .".concat(packageDirectory, "/pnpm-lock.yaml\n\n            - run: pnpm install\n              working-directory: .").concat(packageDirectory, "\n"));
                        }
                    }
                    for (key in packageJSON) {
                        if (Object.prototype.hasOwnProperty.call(packageJSON, key)) {
                            values = packageJSON[key];
                            if (key === "scripts") {
                                for (scripts in values) {
                                    if (Object.prototype.hasOwnProperty.call(values, scripts)) {
                                        if (scripts === "build") {
                                            workflowBase.add("\n            - run: pnpm run build\n              working-directory: .\n\n            - uses: actions/upload-artifact@v3.1.3\n              with:\n                  name: .".concat(packageDirectory.replaceAll("/", "-"), "-Node-${{ matrix.node-version }}-Target\n                  path: .").concat(packageDirectory, "/Target\n"));
                                        }
                                        if (scripts === "prepublishOnly") {
                                            workflowBase.add("\n            - run: pnpm run prepublishOnly\n              working-directory: .\n\n            - uses: actions/upload-artifact@v3.1.3\n              with:\n                  name: .".concat(packageDirectory.replaceAll("/", "-"), "-Node-${{ matrix.node-version }}-Target\n                  path: .").concat(packageDirectory, "/Target\n"));
                                        }
                                        if (scripts === "test") {
                                            workflowBase.add("\n            - run: pnpm run test\n              working-directory: .".concat(packageDirectory, "\n"));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                _o.label = 9;
            case 9:
                _f++;
                return [3 /*break*/, 6];
            case 10:
                if (!(workflowBase.size > 1)) return [3 /*break*/, 18];
                _o.label = 11;
            case 11:
                _o.trys.push([11, 13, , 14]);
                return [4 /*yield*/, (0, promises_1.mkdir)("".concat(githubDir).concat(Path), {
                        recursive: true,
                    })];
            case 12:
                _o.sent();
                return [3 /*break*/, 14];
            case 13:
                _j = _o.sent();
                console.log("Could not create: ".concat(githubDir).concat(Path));
                return [3 /*break*/, 14];
            case 14:
                _o.trys.push([14, 16, , 17]);
                return [4 /*yield*/, (0, promises_1.writeFile)("".concat(githubDir).concat(Path).concat(Name), "".concat(__spreadArray([], workflowBase, true).join("")))];
            case 15:
                _o.sent();
                return [3 /*break*/, 17];
            case 16:
                _k = _o.sent();
                console.log("Could not create workflow for: ".concat(githubDir, "/workflows/Node.yml"));
                return [3 /*break*/, 17];
            case 17: return [3 /*break*/, 25];
            case 18:
                _o.trys.push([18, 24, , 25]);
                return [4 /*yield*/, (0, promises_1.access)("".concat(githubDir).concat(Path).concat(Name), fs_1.constants.F_OK)];
            case 19:
                _o.sent();
                _o.label = 20;
            case 20:
                _o.trys.push([20, 22, , 23]);
                return [4 /*yield*/, (0, promises_1.rm)("".concat(githubDir).concat(Path).concat(Name))];
            case 21:
                _o.sent();
                return [3 /*break*/, 23];
            case 22:
                _l = _o.sent();
                console.log("Could not remove ".concat(Path).concat(Name, " for: ").concat(githubDir));
                return [3 /*break*/, 23];
            case 23: return [3 /*break*/, 25];
            case 24:
                _m = _o.sent();
                return [3 /*break*/, 25];
            case 25:
                _b++;
                return [3 /*break*/, 4];
            case 26:
                _i++;
                return [3 /*break*/, 1];
            case 27: return [2 /*return*/];
        }
    });
}); };
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Workflow(Node_js_1.default)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
