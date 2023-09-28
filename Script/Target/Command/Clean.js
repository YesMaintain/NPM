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
var User = Environment_js_1.default.User;
var All = {
    Organizations: [],
    Repositories: [],
};
exports.default = (function (Repositories) {
    if (Repositories === void 0) { Repositories = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var Get, _i, _a, Repository, Organizations, _b, _c, Organization, Repositories_2, _d, _e, repo, Pass, _f, _g, Repository, _h, Repositories_1, _Repository, Runs, _j, _k, run, Caches, _l, _m, Cache_1;
        var _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0: return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/repos"))];
                case 1:
                    Get = _q.sent();
                    if (Get) {
                        for (_i = 0, _a = Get.data; _i < _a.length; _i++) {
                            Repository = _a[_i];
                            All.Repositories.push({
                                Owner: User,
                                Name: Repository.name,
                            });
                        }
                    }
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/orgs"))];
                case 2:
                    Organizations = _q.sent();
                    if (!Organizations) return [3 /*break*/, 6];
                    _b = 0, _c = Organizations.data;
                    _q.label = 3;
                case 3:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    Organization = _c[_b];
                    All.Organizations.push({
                        Name: Organization.login,
                    });
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /orgs/".concat(Organization.login, "/repos"))];
                case 4:
                    Repositories_2 = _q.sent();
                    if (Repositories_2) {
                        for (_d = 0, _e = Repositories_2.data; _d < _e.length; _d++) {
                            repo = _e[_d];
                            All.Repositories.push({
                                Owner: Organization.login,
                                Name: repo.name,
                            });
                        }
                    }
                    _q.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 3];
                case 6:
                    Pass = null;
                    _f = 0, _g = All.Repositories;
                    _q.label = 7;
                case 7:
                    if (!(_f < _g.length)) return [3 /*break*/, 19];
                    Repository = _g[_f];
                    for (_h = 0, Repositories_1 = Repositories; _h < Repositories_1.length; _h++) {
                        _Repository = Repositories_1[_h];
                        if (Repository.Name === _Repository) {
                            Pass = true;
                        }
                        else {
                            Pass = false;
                        }
                    }
                    if (!(Pass === null || Pass)) return [3 /*break*/, 18];
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /repos/".concat(Repository.Owner, "/").concat(Repository.Name, "/actions/runs"), {
                            owner: Repository.Owner,
                            repo: Repository.Name,
                        })];
                case 8:
                    Runs = _q.sent();
                    if (!((_o = Runs === null || Runs === void 0 ? void 0 : Runs.data) === null || _o === void 0 ? void 0 : _o.workflow_runs)) return [3 /*break*/, 13];
                    _j = 0, _k = Runs.data.workflow_runs;
                    _q.label = 9;
                case 9:
                    if (!(_j < _k.length)) return [3 /*break*/, 13];
                    run = _k[_j];
                    return [4 /*yield*/, (0, Request_js_1.default)("DELETE /repos/".concat(Repository.Owner, "/").concat(Repository.Name, "/actions/runs/").concat(run.id), {
                            owner: Repository.Owner,
                            repo: Repository.Name,
                            run_id: run.id,
                        })];
                case 10:
                    _q.sent();
                    return [4 /*yield*/, (0, Request_js_1.default)("DELETE /repos/".concat(Repository.Owner, "/").concat(Repository.Name, "/actions/runs/").concat(run.id, "/logs"), {
                            owner: Repository.Owner,
                            repo: Repository.Name,
                            run_id: run.id,
                        })];
                case 11:
                    _q.sent();
                    _q.label = 12;
                case 12:
                    _j++;
                    return [3 /*break*/, 9];
                case 13: return [4 /*yield*/, (0, Request_js_1.default)("GET /repos/".concat(Repository.Owner, "/").concat(Repository.Name, "/actions/caches"), {
                        owner: Repository.Owner,
                        repo: Repository.Name,
                    })];
                case 14:
                    Caches = _q.sent();
                    if (!((_p = Caches === null || Caches === void 0 ? void 0 : Caches.data) === null || _p === void 0 ? void 0 : _p.actions_caches)) return [3 /*break*/, 18];
                    _l = 0, _m = Caches.data.actions_caches;
                    _q.label = 15;
                case 15:
                    if (!(_l < _m.length)) return [3 /*break*/, 18];
                    Cache_1 = _m[_l];
                    return [4 /*yield*/, (0, Request_js_1.default)("DELETE /repos/".concat(Repository.Owner, "/").concat(Repository.Name, "/actions/caches/").concat(Cache_1.id), {
                            owner: Repository.Owner,
                            repo: Repository.Name,
                            cache_id: Cache_1.id,
                        })];
                case 16:
                    _q.sent();
                    _q.label = 17;
                case 17:
                    _l++;
                    return [3 /*break*/, 15];
                case 18:
                    _f++;
                    return [3 /*break*/, 7];
                case 19: return [2 /*return*/];
            }
        });
    });
});
