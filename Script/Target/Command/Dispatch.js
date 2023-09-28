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
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_js_1 = require("../Library/Environment.js");
var Request_js_1 = require("../Library/Request.js");
exports.default = (function (repositories) {
    if (repositories === void 0) { repositories = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var User, Organizations, Repositories, _i, _a, repo, _b, _c, org, _d, _e, repo, pass, _f, Repositories_1, repo, _g, repositories_1, repository, _h, _j, workflow;
        var _k, _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    User = Environment_js_1.default.User;
                    Organizations = [];
                    Repositories = [];
                    _i = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/repos"))];
                case 1:
                    _a = (_k = (_q.sent())) === null || _k === void 0 ? void 0 : _k.data;
                    _q.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    repo = _a[_i];
                    Repositories.push({
                        owner: User,
                        name: repo.name,
                    });
                    _q.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4:
                    _b = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/orgs"))];
                case 5:
                    _c = (_l = (_q.sent())) === null || _l === void 0 ? void 0 : _l.data;
                    _q.label = 6;
                case 6:
                    if (!(_b < _c.length)) return [3 /*break*/, 11];
                    org = _c[_b];
                    Organizations.push({
                        name: org.login,
                    });
                    _d = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /orgs/".concat(org.login, "/repos"))];
                case 7:
                    _e = (_m = (_q.sent())) === null || _m === void 0 ? void 0 : _m.data;
                    _q.label = 8;
                case 8:
                    if (!(_d < _e.length)) return [3 /*break*/, 10];
                    repo = _e[_d];
                    Repositories.push({
                        owner: org.login,
                        name: repo.name,
                    });
                    _q.label = 9;
                case 9:
                    _d++;
                    return [3 /*break*/, 8];
                case 10:
                    _b++;
                    return [3 /*break*/, 6];
                case 11:
                    pass = undefined;
                    _f = 0, Repositories_1 = Repositories;
                    _q.label = 12;
                case 12:
                    if (!(_f < Repositories_1.length)) return [3 /*break*/, 18];
                    repo = Repositories_1[_f];
                    /* Checking if the repository is in the list of repositories. */
                    for (_g = 0, repositories_1 = repositories; _g < repositories_1.length; _g++) {
                        repository = repositories_1[_g];
                        if (repo.name === repository) {
                            pass = true;
                        }
                        else {
                            pass = false;
                        }
                    }
                    if (!(typeof pass === "undefined" || pass)) return [3 /*break*/, 17];
                    _h = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /repos/".concat(repo.owner, "/").concat(repo.name, "/actions/workflows"), { owner: repo.owner, repo: repo.name })];
                case 13:
                    _j = (_p = (_o = (_q.sent())) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.workflows;
                    _q.label = 14;
                case 14:
                    if (!(_h < _j.length)) return [3 /*break*/, 17];
                    workflow = _j[_h];
                    return [4 /*yield*/, (0, Request_js_1.default)("POST /repos/".concat(repo.owner, "/").concat(repo.name, "/actions/workflows/").concat(workflow.id, "/dispatches"), {
                            ref: "main",
                        })];
                case 15:
                    _q.sent();
                    _q.label = 16;
                case 16:
                    _h++;
                    return [3 /*break*/, 14];
                case 17:
                    _f++;
                    return [3 /*break*/, 12];
                case 18: return [2 /*return*/];
            }
        });
    });
});
