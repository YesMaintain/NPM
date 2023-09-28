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
/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Files} Files - containers
 */
var Workflow = function (Files) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, Files_1, _a, Path, Name, File_1, _b, _c, _d, _e, _f, directory, packageFiles, githubDir, workflowBase, _g, packageFiles_1, _package, packageDirectory, environment, _h, _j, _k, _l, _m, _o, _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0:
                _i = 0, Files_1 = Files;
                _q.label = 1;
            case 1:
                if (!(_i < Files_1.length)) return [3 /*break*/, 30];
                _a = Files_1[_i], Path = _a.Path, Name = _a.Name, File_1 = _a.File;
                _b = 0;
                return [4 /*yield*/, Promise.resolve().then(function () { return require("../Library/Directory.js"); })];
            case 2:
                _e = (_d = (_q.sent())).default;
                return [4 /*yield*/, Promise.resolve().then(function () { return require("../Library/Package.js"); })];
            case 3: return [4 /*yield*/, (_q.sent()).default("Cargo")];
            case 4: return [4 /*yield*/, _e.apply(_d, [_q.sent()])];
            case 5:
                _c = _q.sent();
                _q.label = 6;
            case 6:
                if (!(_b < _c.length)) return [3 /*break*/, 29];
                _f = _c[_b], directory = _f[0], packageFiles = _f[1];
                githubDir = "".concat(directory, "/.github");
                return [4 /*yield*/, File_1()];
            case 7:
                workflowBase = _q.sent();
                if (!(Path === "/workflows/" && Name === "Rust.yml")) return [3 /*break*/, 14];
                _g = 0, packageFiles_1 = packageFiles;
                _q.label = 8;
            case 8:
                if (!(_g < packageFiles_1.length)) return [3 /*break*/, 14];
                _package = packageFiles_1[_g];
                return [4 /*yield*/, Promise.resolve().then(function () { return require("path"); })];
            case 9:
                packageDirectory = (_q.sent())
                    .dirname(_package)
                    .replace(directory, "");
                return [4 /*yield*/, Promise.resolve().then(function () { return require("../Library/Type.js"); })];
            case 10: return [4 /*yield*/, (_q.sent()).default()];
            case 11:
                environment = (_q.sent()).get(_package.split("/").pop());
                if (!(typeof environment !== "undefined" &&
                    environment === "Cargo")) return [3 /*break*/, 13];
                _j = (_h = workflowBase).add;
                _l = (_k = "\n            - uses: actions/cache@v3.3.2\n              with:\n                  path: |\n                      ~/.cargo/bin/\n                      ~/.cargo/registry/index/\n                      ~/.cargo/registry/cache/\n                      ~/.cargo/git/db/\n                      target/\n                      Target/\n                  key: ${{ runner.os }}-cargo-${{ hashFiles('.".concat(packageDirectory, "/Cargo.toml') }}\n            - uses: actions-rs/cargo@v1.0.3\n              with:\n                command: build\n                args: --release --all-features --manifest-path .").concat(packageDirectory, "/")).concat;
                return [4 /*yield*/, Promise.resolve().then(function () { return require("path"); })];
            case 12:
                _j.apply(_h, [_l.apply(_k, [(_q.sent()).basename(_package), "\n"])]);
                _q.label = 13;
            case 13:
                _g++;
                return [3 /*break*/, 8];
            case 14:
                if (!(workflowBase.size > 1)) return [3 /*break*/, 24];
                _q.label = 15;
            case 15:
                _q.trys.push([15, 18, , 19]);
                return [4 /*yield*/, Promise.resolve().then(function () { return require("fs/promises"); })];
            case 16: return [4 /*yield*/, (_q.sent()).mkdir("".concat(githubDir).concat(Path), {
                    recursive: true,
                })];
            case 17:
                _q.sent();
                return [3 /*break*/, 19];
            case 18:
                _m = _q.sent();
                console.log("Could not create: ".concat(githubDir).concat(Path));
                return [3 /*break*/, 19];
            case 19:
                _q.trys.push([19, 22, , 23]);
                return [4 /*yield*/, Promise.resolve().then(function () { return require("fs/promises"); })];
            case 20: return [4 /*yield*/, (_q.sent()).writeFile("".concat(githubDir).concat(Path).concat(Name), "".concat(__spreadArray([], workflowBase, true).join("")))];
            case 21:
                _q.sent();
                return [3 /*break*/, 23];
            case 22:
                _o = _q.sent();
                console.log("Could not create workflow for: ".concat(githubDir, "/workflows/Rust.yml"));
                return [3 /*break*/, 23];
            case 23: return [3 /*break*/, 28];
            case 24:
                _q.trys.push([24, 27, , 28]);
                return [4 /*yield*/, Promise.resolve().then(function () { return require("fs/promises"); })];
            case 25: return [4 /*yield*/, (_q.sent()).rm("".concat(githubDir).concat(Path).concat(Name), {
                    recursive: true,
                })];
            case 26:
                _q.sent();
                return [3 /*break*/, 28];
            case 27:
                _p = _q.sent();
                console.log("Could not remove ".concat(Path).concat(Name, " for: ").concat(githubDir));
                return [3 /*break*/, 28];
            case 28:
                _b++;
                return [3 /*break*/, 6];
            case 29:
                _i++;
                return [3 /*break*/, 1];
            case 30: return [2 /*return*/];
        }
    });
}); };
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = Workflow;
            return [4 /*yield*/, Promise.resolve().then(function () { return require("../Object/Rust.js"); })];
        case 1: return [4 /*yield*/, _a.apply(void 0, [(_b.sent()).default])];
        case 2: return [2 /*return*/, _b.sent()];
    }
}); }); });
