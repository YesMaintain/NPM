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
        var User, Organizations, Repositories, _i, _a, Repository, _b, _c, Organization, _d, _e, Repository, _f, Organizations_1, Organization, pass, _g, Repositories_1, repo, _h, repositories_1, repository;
        var _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    User = Environment_js_1.default.User;
                    Organizations = [];
                    Repositories = [];
                    _i = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/repos"))];
                case 1:
                    _a = (_j = (_m.sent())) === null || _j === void 0 ? void 0 : _j.data;
                    _m.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    Repository = _a[_i];
                    Repositories.push({
                        owner: User,
                        name: Repository.name,
                    });
                    _m.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4:
                    _b = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /users/".concat(User, "/orgs"))];
                case 5:
                    _c = (_k = (_m.sent())) === null || _k === void 0 ? void 0 : _k.data;
                    _m.label = 6;
                case 6:
                    if (!(_b < _c.length)) return [3 /*break*/, 11];
                    Organization = _c[_b];
                    Organizations.push({
                        name: Organization.login,
                    });
                    _d = 0;
                    return [4 /*yield*/, (0, Request_js_1.default)("GET /orgs/".concat(Organization.login, "/repos"))];
                case 7:
                    _e = (_l = (_m.sent())) === null || _l === void 0 ? void 0 : _l.data;
                    _m.label = 8;
                case 8:
                    if (!(_d < _e.length)) return [3 /*break*/, 10];
                    Repository = _e[_d];
                    Repositories.push({
                        owner: Organization.login,
                        name: Repository.name,
                    });
                    _m.label = 9;
                case 9:
                    _d++;
                    return [3 /*break*/, 8];
                case 10:
                    _b++;
                    return [3 /*break*/, 6];
                case 11:
                    _f = 0, Organizations_1 = Organizations;
                    _m.label = 12;
                case 12:
                    if (!(_f < Organizations_1.length)) return [3 /*break*/, 16];
                    Organization = Organizations_1[_f];
                    // start: actions/permissions
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /orgs/".concat(Organization.name, "/actions/permissions"), {
                            org: Organization.name,
                            enabled_repositories: "all",
                            allowed_actions: "all",
                        })];
                case 13:
                    // start: actions/permissions
                    _m.sent();
                    // end: actions/permissions
                    // actions/permissions/workflow
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /orgs/".concat(Organization.name, "/actions/permissions/workflow"), {
                            org: Organization.name,
                            default_workflow_permissions: "write",
                            can_approve_pull_request_reviews: true,
                        })];
                case 14:
                    // end: actions/permissions
                    // actions/permissions/workflow
                    _m.sent();
                    _m.label = 15;
                case 15:
                    _f++;
                    return [3 /*break*/, 12];
                case 16:
                    pass = null;
                    _g = 0, Repositories_1 = Repositories;
                    _m.label = 17;
                case 17:
                    if (!(_g < Repositories_1.length)) return [3 /*break*/, 26];
                    repo = Repositories_1[_g];
                    for (_h = 0, repositories_1 = repositories; _h < repositories_1.length; _h++) {
                        repository = repositories_1[_h];
                        if (repo.name === repository) {
                            pass = true;
                        }
                        else {
                            pass = false;
                        }
                    }
                    if (!(pass === null || pass)) return [3 /*break*/, 25];
                    // start: vulnerability-alerts
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /repos/".concat(repo.owner, "/").concat(repo.name, "/vulnerability-alerts"))];
                case 18:
                    // start: vulnerability-alerts
                    _m.sent();
                    // end: vulnerability-alerts
                    // start: automated-security-fixes
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /repos/".concat(repo.owner, "/").concat(repo.name, "/automated-security-fixes"))];
                case 19:
                    // end: vulnerability-alerts
                    // start: automated-security-fixes
                    _m.sent();
                    // end: automated-security-fixes
                    // start: patch
                    return [4 /*yield*/, (0, Request_js_1.default)("PATCH /repos/".concat(repo.owner, "/").concat(repo.name), {
                            has_issues: true,
                            has_projects: false,
                            has_wiki: false,
                            allow_squash_merge: true,
                            allow_merge_commit: true,
                            allow_rebase_merge: false,
                            allow_auto_merge: true,
                            delete_branch_on_merge: true,
                            allow_update_branch: true,
                            use_squash_pr_title_as_default: true,
                            allow_forking: true,
                            web_commit_signoff_required: true,
                        })];
                case 20:
                    // end: automated-security-fixes
                    // start: patch
                    _m.sent();
                    // end: patch
                    // start: actions/permissions
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /repos/".concat(repo.owner, "/").concat(repo.name, "/actions/permissions"), {
                            enabled: true,
                            allowed_actions: "all",
                        })];
                case 21:
                    // end: patch
                    // start: actions/permissions
                    _m.sent();
                    // end: actions/permissions
                    // start: actions/permissions/workflow
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /repos/".concat(repo.owner, "/").concat(repo.name, "/actions/permissions/workflow"), {
                            default_workflow_permissions: "write",
                            can_approve_pull_request_reviews: true,
                        })];
                case 22:
                    // end: actions/permissions
                    // start: actions/permissions/workflow
                    _m.sent();
                    // end: actions/permissions/workflow
                    // start: starred
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /user/starred/".concat(repo.owner, "/").concat(repo.name))];
                case 23:
                    // end: actions/permissions/workflow
                    // start: starred
                    _m.sent();
                    // end: starred
                    // start: actions/permissions/access
                    return [4 /*yield*/, (0, Request_js_1.default)("PUT /repos/".concat(repo.owner, "/").concat(repo.name, "/actions/permissions/access"), {
                            access_level: "organization",
                        })];
                case 24:
                    // end: starred
                    // start: actions/permissions/access
                    _m.sent();
                    _m.label = 25;
                case 25:
                    _g++;
                    return [3 /*break*/, 17];
                case 26: return [2 /*return*/];
            }
        });
    });
});
