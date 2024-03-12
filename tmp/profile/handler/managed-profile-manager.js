var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { defer, of, Subject } from 'rxjs';
import { NoActiveSessionError, NoProfileFoundError, ProfileSession, ProfileSource, ProfileType } from '..';
import { HttpRequestType, Request } from '../../api';
import { CachedItemRequestSourceFrom } from '../../key-value-store';
import { mapTo, mergeMap, startWith, take, tap } from 'rxjs/operators';
import { ProfileEntry } from '../db/schema';
import { ProfileDbEntryMapper } from '../util/profile-db-entry-mapper';
import { ProfileKeys } from '../../preference-keys';
import { TelemetryLogger } from '../../telemetry/util/telemetry-logger';
import { ArrayUtil } from '../../util/array-util';
var ManagedProfileManager = /** @class */ (function () {
    function ManagedProfileManager(profileService, authService, profileServiceConfig, apiService, cachedItemStore, dbService, frameworkService, sharedPreferences) {
        this.profileService = profileService;
        this.authService = authService;
        this.profileServiceConfig = profileServiceConfig;
        this.apiService = apiService;
        this.cachedItemStore = cachedItemStore;
        this.dbService = dbService;
        this.frameworkService = frameworkService;
        this.sharedPreferences = sharedPreferences;
        this.managedProfileAdded$ = new Subject();
    }
    ManagedProfileManager.prototype.addManagedProfile = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var uid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isLoggedInUser()];
                    case 1:
                        if (!(_a.sent())) {
                            throw new NoActiveSessionError('No active LoggedIn Session found');
                        }
                        return [4 /*yield*/, this.createManagedProfile(request)];
                    case 2:
                        uid = (_a.sent()).uid;
                        setTimeout(function () {
                            _this.managedProfileAdded$.next(true);
                        }, 1000);
                        return [2 /*return*/, { uid: uid }];
                }
            });
        }); });
    };
    ManagedProfileManager.prototype.getManagedServerProfiles = function (request) {
        var _this = this;
        return this.managedProfileAdded$.pipe(startWith(false), mergeMap(function (managedProfileAdded) {
            return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                var profile, managedByUid, fetchFromServer;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.isLoggedInUser()];
                        case 1:
                            if (!(_a.sent())) {
                                throw new NoActiveSessionError('No active LoggedIn Session found');
                            }
                            if (request.from !== CachedItemRequestSourceFrom.SERVER) {
                                request.from = managedProfileAdded ? CachedItemRequestSourceFrom.SERVER : CachedItemRequestSourceFrom.CACHE;
                            }
                            return [4 /*yield*/, this.profileService.getActiveSessionProfile({ requiredFields: [] })
                                    .toPromise()];
                        case 2:
                            profile = _a.sent();
                            managedByUid = (profile.serverProfile && profile.serverProfile['managedBy']) ?
                                profile.serverProfile['managedBy'] :
                                profile.uid;
                            fetchFromServer = function () {
                                return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var managedByProfile, _a, searchManagedProfilesRequest;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(profile.serverProfile && !profile.serverProfile['managedBy'])) return [3 /*break*/, 1];
                                                _a = profile.serverProfile;
                                                return [3 /*break*/, 3];
                                            case 1: return [4 /*yield*/, this.profileService.getServerProfilesDetails({
                                                    userId: profile.serverProfile['managedBy'],
                                                    requiredFields: request.requiredFields
                                                }).toPromise()];
                                            case 2:
                                                _a = (_b.sent());
                                                _b.label = 3;
                                            case 3:
                                                managedByProfile = _a;
                                                searchManagedProfilesRequest = new Request.Builder()
                                                    .withType(HttpRequestType.GET)
                                                    .withPath(this.profileServiceConfig.profileApiPath + "/managed/" + managedByUid)
                                                    .withParameters({
                                                    'withTokens': 'true',
                                                    'sortBy': 'createdDate',
                                                    'order': 'desc'
                                                })
                                                    .withBearerToken(true)
                                                    .withUserToken(true)
                                                    .build();
                                                return [4 /*yield*/, this.apiService
                                                        .fetch(searchManagedProfilesRequest)
                                                        .toPromise()
                                                        .then(function (response) {
                                                        return __spreadArrays([
                                                            managedByProfile
                                                        ], response.body.result.response.content
                                                            .sort(function (a, b) { return new Date(b['createdDate']).getTime() - new Date(a['createdDate']).getTime(); }));
                                                    })];
                                            case 4: return [2 /*return*/, _b.sent()];
                                        }
                                    });
                                }); }).pipe(tap(function (managedProfiles) { return __awaiter(_this, void 0, void 0, function () {
                                    var persistedProfiles, nonPersistedProfiles, _i, nonPersistedProfiles_1, managedProfile;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.dbService.execute("\n                                    SELECT * from " + ProfileEntry.TABLE_NAME + "\n                                    WHERE " + ProfileEntry.COLUMN_NAME_UID + "\n                                    IN (" + ArrayUtil.joinPreservingQuotes(managedProfiles.map(function (p) { return p.id; })) + ")\n                                ").toPromise()
                                                    .then(function (entries) {
                                                    return entries.map(function (e) { return ProfileDbEntryMapper.mapProfileDBEntryToProfile(e); });
                                                })];
                                            case 1:
                                                persistedProfiles = _a.sent();
                                                nonPersistedProfiles = managedProfiles.filter(function (managedProfile) {
                                                    return !persistedProfiles.find(function (p) { return p.uid === managedProfile.id; });
                                                });
                                                for (_i = 0, nonPersistedProfiles_1 = nonPersistedProfiles; _i < nonPersistedProfiles_1.length; _i++) {
                                                    managedProfile = nonPersistedProfiles_1[_i];
                                                    this.persistManagedProfile(managedProfile);
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            };
                            return [2 /*return*/, this.cachedItemStore[request.from === CachedItemRequestSourceFrom.SERVER ? 'get' : 'getCached'](managedByUid, ManagedProfileManager.MANGED_SERVER_PROFILES_LOCAL_KEY, 'ttl_' + ManagedProfileManager.MANGED_SERVER_PROFILES_LOCAL_KEY, function () { return fetchFromServer(); }).toPromise()];
                    }
                });
            }); });
        }));
    };
    ManagedProfileManager.prototype.switchSessionToManagedProfile = function (_a) {
        var _this = this;
        var uid = _a.uid;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var profileSession, initialSession, findProfile, profile, authSession_1, managedProfiles, managedProfile, authSession_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        profileSession = _a.sent();
                        initialSession = __assign({}, profileSession);
                        return [4 /*yield*/, TelemetryLogger.log.end({
                                type: 'session',
                                env: 'sdk',
                                mode: 'switch-user',
                                duration: Math.floor((Date.now() - (initialSession.managedSession || initialSession).createdTime) / 1000),
                                correlationData: [
                                    {
                                        type: 'InitiatorId',
                                        id: initialSession.managedSession ? initialSession.managedSession.uid : initialSession.uid
                                    },
                                    {
                                        type: 'ManagedUserId',
                                        id: uid
                                    },
                                ]
                            }).toPromise()];
                    case 2:
                        _a.sent();
                        findProfile = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.dbService.read({
                                        table: ProfileEntry.TABLE_NAME,
                                        selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                                        selectionArgs: [uid]
                                    }).toPromise().then(function (rows) {
                                        return rows && rows[0] && ProfileDbEntryMapper.mapProfileDBEntryToProfile(rows[0]);
                                    })];
                            });
                        }); };
                        return [4 /*yield*/, findProfile()];
                    case 3:
                        profile = _a.sent();
                        if (!profile) {
                            throw new NoProfileFoundError("No Profile found with uid=" + uid);
                        }
                        else if (profile.source !== ProfileSource.SERVER) {
                            throw new NoProfileFoundError("No Server Profile found with uid=" + uid);
                        }
                        if (!(profileSession.uid === uid)) return [3 /*break*/, 6];
                        profileSession.managedSession = undefined;
                        return [4 /*yield*/, this.authService.getSession().toPromise()];
                    case 4:
                        authSession_1 = (_a.sent());
                        authSession_1.managed_access_token = undefined;
                        return [4 /*yield*/, this.authService.setSession(new /** @class */ (function () {
                                function class_1() {
                                }
                                class_1.prototype.provide = function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, authSession_1];
                                        });
                                    });
                                };
                                return class_1;
                            }())).toPromise()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        profileSession.managedSession = new ProfileSession(uid);
                        return [4 /*yield*/, this.getManagedServerProfiles({
                                from: CachedItemRequestSourceFrom.CACHE,
                                requiredFields: []
                            }).pipe(take(1)).toPromise()];
                    case 7:
                        managedProfiles = _a.sent();
                        managedProfile = managedProfiles.find(function (m) { return m.id === uid; });
                        return [4 /*yield*/, this.authService.getSession().toPromise()];
                    case 8:
                        authSession_2 = (_a.sent());
                        authSession_2.managed_access_token = managedProfile['managedToken'];
                        return [4 /*yield*/, this.authService.setSession(new /** @class */ (function () {
                                function class_2() {
                                }
                                class_2.prototype.provide = function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, authSession_2];
                                        });
                                    });
                                };
                                return class_2;
                            }())).toPromise()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, this.sharedPreferences.putString(ProfileKeys.KEY_USER_SESSION, JSON.stringify(profileSession)).toPromise()];
                    case 11:
                        _a.sent();
                        TelemetryLogger.log.start({
                            type: 'session',
                            env: 'sdk',
                            mode: 'switch-user',
                            correlationData: [
                                {
                                    type: 'InitiatorId',
                                    id: initialSession.managedSession ? initialSession.managedSession.uid : initialSession.uid
                                },
                                {
                                    type: 'ManagedUserId',
                                    id: profileSession.managedSession ? profileSession.managedSession.uid : profileSession.uid
                                },
                            ]
                        }).toPromise();
                        return [2 /*return*/];
                }
            });
        }); }).pipe(mergeMap(function () {
            return _this.authService.getSession().pipe(mergeMap(function (session) {
                return _this.authService.setSession(new /** @class */ (function () {
                    function class_3() {
                    }
                    class_3.prototype.provide = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, __assign(__assign({}, session), { userToken: uid })];
                            });
                        });
                    };
                    return class_3;
                }()));
            }));
        }), mergeMap(function () { return __awaiter(_this, void 0, void 0, function () {
            var serverProfile, rootOrgId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getServerProfilesDetails({
                            userId: uid,
                            requiredFields: []
                        }).toPromise()];
                    case 1:
                        serverProfile = _a.sent();
                        rootOrgId = serverProfile.rootOrg ? serverProfile.rootOrg.hashTagId : serverProfile['rootOrgId'];
                        return [2 /*return*/, this.frameworkService.setActiveChannelId(rootOrgId).toPromise()];
                }
            });
        }); }), mapTo(undefined));
    };
    ManagedProfileManager.prototype.persistManagedProfile = function (serverProfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: adding missing fields; should remove
                serverProfile.userId = serverProfile.id;
                serverProfile.rootOrg = {
                    hashTagId: serverProfile['rootOrgId']
                };
                this.profileService.createProfile({
                    uid: serverProfile.id,
                    profileType: ProfileType.STUDENT,
                    source: ProfileSource.SERVER,
                    handle: serverProfile.firstName,
                    board: (serverProfile.framework && serverProfile.framework['board']) || [],
                    medium: (serverProfile.framework && serverProfile.framework['medium']) || [],
                    grade: (serverProfile.framework && serverProfile.framework['gradeLevel']) || [],
                    gradeValue: (serverProfile.framework && serverProfile.framework['gradeValue']) || '',
                    subject: (serverProfile.framework && serverProfile.framework['subject']) || [],
                    serverProfile: serverProfile
                }, ProfileSource.SERVER).toPromise();
                this.cachedItemStore.getCached(serverProfile.id, ManagedProfileManager.USER_PROFILE_DETAILS_KEY_PREFIX, ManagedProfileManager.USER_PROFILE_DETAILS_KEY_PREFIX, function () { return of(serverProfile); }).toPromise();
                return [2 /*return*/];
            });
        });
    };
    ManagedProfileManager.prototype.createManagedProfile = function (addManagedProfileRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var currentProfile, createManagedProfileRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveSessionProfile({ requiredFields: [] }).toPromise()];
                    case 1:
                        currentProfile = _a.sent();
                        if (currentProfile.source !== ProfileSource.SERVER) {
                            throw new NoActiveSessionError('No active session available');
                        }
                        createManagedProfileRequest = new Request.Builder()
                            .withType(HttpRequestType.POST)
                            .withPath(this.profileServiceConfig.profileApiPath_V2 + '/managed/create')
                            .withBearerToken(true)
                            .withUserToken(true)
                            .withBody({
                            request: addManagedProfileRequest
                        })
                            .build();
                        return [4 /*yield*/, this.apiService.fetch(createManagedProfileRequest).toPromise()
                                .then(function (response) { return ({ uid: response.body.result.userId }); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ManagedProfileManager.prototype.isLoggedInUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getSession().toPromise()];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    ManagedProfileManager.MANGED_SERVER_PROFILES_LOCAL_KEY = 'managed_server_profiles-';
    ManagedProfileManager.USER_PROFILE_DETAILS_KEY_PREFIX = 'userProfileDetails';
    return ManagedProfileManager;
}());
export { ManagedProfileManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlZC1wcm9maWxlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL21hbmFnZWQtcHJvZmlsZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxLQUFLLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQ0gsb0JBQW9CLEVBQ3BCLG1CQUFtQixFQUluQixjQUFjLEVBQ2QsYUFBYSxFQUNiLFdBQVcsRUFFZCxNQUFNLElBQUksQ0FBQztBQUNaLE9BQU8sRUFBYSxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRS9ELE9BQU8sRUFBQywyQkFBMkIsRUFBa0IsTUFBTSx1QkFBdUIsQ0FBQztBQUVuRixPQUFPLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFckUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQ7SUFLSSwrQkFDWSxjQUE4QixFQUM5QixXQUF3QixFQUN4QixvQkFBMEMsRUFDMUMsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEMsU0FBb0IsRUFDcEIsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQVBwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JB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RUFBQyxDQUFDLEVBQXBDLENBQW9DLENBQUMsRUFBQTs0QkFEN0Qsc0JBQU8sU0FDc0QsRUFBQzs7OztLQUNqRTtJQUVhLDhDQUFjLEdBQTVCOzs7OzRCQUNjLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUE7NEJBQXpELHNCQUFPLENBQUMsQ0FBQyxDQUFDLFNBQStDLENBQUMsRUFBQzs7OztLQUM5RDtJQWxTdUIsc0RBQWdDLEdBQUcsMEJBQTBCLENBQUM7SUFDOUQscURBQStCLEdBQUcsb0JBQW9CLENBQUM7SUFrU25GLDRCQUFDO0NBQUEsQUFwU0QsSUFvU0M7U0FwU1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZGRNYW5hZ2VkUHJvZmlsZVJlcXVlc3R9IGZyb20gJy4uL2RlZi9hZGQtbWFuYWdlZC1wcm9maWxlLXJlcXVlc3QnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBOb0FjdGl2ZVNlc3Npb25FcnJvcixcbiAgICBOb1Byb2ZpbGVGb3VuZEVycm9yLFxuICAgIFByb2ZpbGUsXG4gICAgUHJvZmlsZVNlcnZpY2UsXG4gICAgUHJvZmlsZVNlcnZpY2VDb25maWcsXG4gICAgUHJvZmlsZVNlc3Npb24sXG4gICAgUHJvZmlsZVNvdXJjZSxcbiAgICBQcm9maWxlVHlwZSxcbiAgICBTZXJ2ZXJQcm9maWxlXG59IGZyb20gJy4uJztcbmltcG9ydCB7QXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtBdXRoU2VydmljZSwgT0F1dGhTZXNzaW9uLCBTZXNzaW9uUHJvdmlkZXJ9IGZyb20gJy4uLy4uL2F1dGgnO1xuaW1wb3J0IHtDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20sIENhY2hlZEl0ZW1TdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7R2V0TWFuYWdlZFNlcnZlclByb2ZpbGVzUmVxdWVzdH0gZnJvbSAnLi4vZGVmL2dldC1tYW5hZ2VkLXNlcnZlci1wcm9maWxlcy1yZXF1ZXN0JztcbmltcG9ydCB7bWFwVG8sIG1lcmdlTWFwLCBzdGFydFdpdGgsIHRha2UsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtQcm9maWxlRW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtQcm9maWxlRGJFbnRyeU1hcHBlcn0gZnJvbSAnLi4vdXRpbC9wcm9maWxlLWRiLWVudHJ5LW1hcHBlcic7XG5pbXBvcnQge0ZyYW1ld29ya1NlcnZpY2V9IGZyb20gJy4uLy4uL2ZyYW1ld29yayc7XG5pbXBvcnQge1Byb2ZpbGVLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtUZWxlbWV0cnlMb2dnZXJ9IGZyb20gJy4uLy4uL3RlbGVtZXRyeS91dGlsL3RlbGVtZXRyeS1sb2dnZXInO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBNYW5hZ2VkUHJvZmlsZU1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1BTkdFRF9TRVJWRVJfUFJPRklMRVNfTE9DQUxfS0VZID0gJ21hbmFnZWRfc2VydmVyX3Byb2ZpbGVzLSc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVVNFUl9QUk9GSUxFX0RFVEFJTFNfS0VZX1BSRUZJWCA9ICd1c2VyUHJvZmlsZURldGFpbHMnO1xuICAgIHByaXZhdGUgbWFuYWdlZFByb2ZpbGVBZGRlZCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwcm9maWxlU2VydmljZUNvbmZpZzogUHJvZmlsZVNlcnZpY2VDb25maWcsXG4gICAgICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmcmFtZXdvcmtTZXJ2aWNlOiBGcmFtZXdvcmtTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICApIHtcbiAgICB9XG5cbiAgICBhZGRNYW5hZ2VkUHJvZmlsZShyZXF1ZXN0OiBBZGRNYW5hZ2VkUHJvZmlsZVJlcXVlc3QpOiBPYnNlcnZhYmxlPHsgdWlkOiBzdHJpbmcgfT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5pc0xvZ2dlZEluVXNlcigpKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0FjdGl2ZVNlc3Npb25FcnJvcignTm8gYWN0aXZlIExvZ2dlZEluIFNlc3Npb24gZm91bmQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeyB1aWQgfSA9IGF3YWl0IHRoaXMuY3JlYXRlTWFuYWdlZFByb2ZpbGUocmVxdWVzdCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlZFByb2ZpbGVBZGRlZCQubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICByZXR1cm4geyB1aWQgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TWFuYWdlZFNlcnZlclByb2ZpbGVzKHJlcXVlc3Q6IEdldE1hbmFnZWRTZXJ2ZXJQcm9maWxlc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFNlcnZlclByb2ZpbGVbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VkUHJvZmlsZUFkZGVkJC5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChtYW5hZ2VkUHJvZmlsZUFkZGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXdhaXQgdGhpcy5pc0xvZ2dlZEluVXNlcigpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vQWN0aXZlU2Vzc2lvbkVycm9yKCdObyBhY3RpdmUgTG9nZ2VkSW4gU2Vzc2lvbiBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuZnJvbSAhPT0gQ2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tLlNFUlZFUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5mcm9tID0gbWFuYWdlZFByb2ZpbGVBZGRlZCA/IENhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbS5TRVJWRVIgOiBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20uQ0FDSEU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVTZXNzaW9uUHJvZmlsZSh7cmVxdWlyZWRGaWVsZHM6IFtdfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYW5hZ2VkQnlVaWQ6IHN0cmluZyA9IChwcm9maWxlLnNlcnZlclByb2ZpbGUgJiYgcHJvZmlsZS5zZXJ2ZXJQcm9maWxlWydtYW5hZ2VkQnknXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZS5zZXJ2ZXJQcm9maWxlWydtYW5hZ2VkQnknXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlLnVpZDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmZXRjaEZyb21TZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hbmFnZWRCeVByb2ZpbGU6IFNlcnZlclByb2ZpbGUgPSAocHJvZmlsZS5zZXJ2ZXJQcm9maWxlICYmICFwcm9maWxlLnNlcnZlclByb2ZpbGVbJ21hbmFnZWRCeSddKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGUuc2VydmVyUHJvZmlsZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0U2VydmVyUHJvZmlsZXNEZXRhaWxzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBwcm9maWxlLnNlcnZlclByb2ZpbGUhWydtYW5hZ2VkQnknXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHM6IHJlcXVlc3QucmVxdWlyZWRGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hNYW5hZ2VkUHJvZmlsZXNSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoVHlwZShIdHRwUmVxdWVzdFR5cGUuR0VUKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2l0aFBhdGgoYCR7dGhpcy5wcm9maWxlU2VydmljZUNvbmZpZy5wcm9maWxlQXBpUGF0aH0vbWFuYWdlZC8ke21hbmFnZWRCeVVpZH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2l0aFBhcmFtZXRlcnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dpdGhUb2tlbnMnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc29ydEJ5JzogJ2NyZWF0ZWREYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcmRlcic6ICdkZXNjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoVXNlclRva2VuKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXBpU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmV0Y2g8eyByZXN1bHQ6IHsgcmVzcG9uc2U6IHsgY29udGVudDogU2VydmVyUHJvZmlsZVtdIH0gfSB9PihzZWFyY2hNYW5hZ2VkUHJvZmlsZXNSZXF1ZXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZWRCeVByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucmVzcG9uc2UuYm9keS5yZXN1bHQucmVzcG9uc2UuY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYlsnY3JlYXRlZERhdGUnXSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYVsnY3JlYXRlZERhdGUnXSkuZ2V0VGltZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAobWFuYWdlZFByb2ZpbGVzOiBTZXJ2ZXJQcm9maWxlW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVyc2lzdGVkUHJvZmlsZXM6IFByb2ZpbGVbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0VMRUNUICogZnJvbSAke1Byb2ZpbGVFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSU4gKCR7QXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKG1hbmFnZWRQcm9maWxlcy5tYXAocCA9PiBwLmlkKSl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGVudHJpZXM6IGFueVtdKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMubWFwKGUgPT4gUHJvZmlsZURiRW50cnlNYXBwZXIubWFwUHJvZmlsZURCRW50cnlUb1Byb2ZpbGUoZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vblBlcnNpc3RlZFByb2ZpbGVzID0gbWFuYWdlZFByb2ZpbGVzLmZpbHRlcigobWFuYWdlZFByb2ZpbGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcGVyc2lzdGVkUHJvZmlsZXMuZmluZChwID0+IHAudWlkID09PSBtYW5hZ2VkUHJvZmlsZS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1hbmFnZWRQcm9maWxlIG9mIG5vblBlcnNpc3RlZFByb2ZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNpc3RNYW5hZ2VkUHJvZmlsZShtYW5hZ2VkUHJvZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRJdGVtU3RvcmVbcmVxdWVzdC5mcm9tID09PSBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20uU0VSVkVSID8gJ2dldCcgOiAnZ2V0Q2FjaGVkJ10oXG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VkQnlVaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VkUHJvZmlsZU1hbmFnZXIuTUFOR0VEX1NFUlZFUl9QUk9GSUxFU19MT0NBTF9LRVksXG4gICAgICAgICAgICAgICAgICAgICAgICAndHRsXycgKyBNYW5hZ2VkUHJvZmlsZU1hbmFnZXIuTUFOR0VEX1NFUlZFUl9QUk9GSUxFU19MT0NBTF9LRVksXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBmZXRjaEZyb21TZXJ2ZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3dpdGNoU2Vzc2lvblRvTWFuYWdlZFByb2ZpbGUoe3VpZH06IHsgdWlkOiBzdHJpbmcgfSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlU2Vzc2lvbiA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxTZXNzaW9uID0gey4uLnByb2ZpbGVTZXNzaW9ufTtcblxuICAgICAgICAgICAgYXdhaXQgVGVsZW1ldHJ5TG9nZ2VyLmxvZy5lbmQoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzZXNzaW9uJyxcbiAgICAgICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgICAgIG1vZGU6ICdzd2l0Y2gtdXNlcicsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSAoaW5pdGlhbFNlc3Npb24ubWFuYWdlZFNlc3Npb24gfHwgaW5pdGlhbFNlc3Npb24pLmNyZWF0ZWRUaW1lKSAvIDEwMDApLFxuICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnSW5pdGlhdG9ySWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGluaXRpYWxTZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gaW5pdGlhbFNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogaW5pdGlhbFNlc3Npb24udWlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VkVXNlcklkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB1aWRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgY29uc3QgZmluZFByb2ZpbGU6ICgpID0+IFByb21pc2U8UHJvZmlsZSB8IHVuZGVmaW5lZD4gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKChyb3dzKSA9PlxuICAgICAgICAgICAgICAgICAgICByb3dzICYmIHJvd3NbMF0gJiYgUHJvZmlsZURiRW50cnlNYXBwZXIubWFwUHJvZmlsZURCRW50cnlUb1Byb2ZpbGUocm93c1swXSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IGZpbmRQcm9maWxlKCk7XG5cbiAgICAgICAgICAgIGlmICghcHJvZmlsZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb1Byb2ZpbGVGb3VuZEVycm9yKGBObyBQcm9maWxlIGZvdW5kIHdpdGggdWlkPSR7dWlkfWApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9maWxlLnNvdXJjZSAhPT0gUHJvZmlsZVNvdXJjZS5TRVJWRVIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Qcm9maWxlRm91bmRFcnJvcihgTm8gU2VydmVyIFByb2ZpbGUgZm91bmQgd2l0aCB1aWQ9JHt1aWR9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcm9maWxlU2Vzc2lvbi51aWQgPT09IHVpZCkge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVTZXNzaW9uLm1hbmFnZWRTZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF1dGhTZXNzaW9uID0gKGF3YWl0IHRoaXMuYXV0aFNlcnZpY2UuZ2V0U2Vzc2lvbigpLnRvUHJvbWlzZSgpKSE7XG4gICAgICAgICAgICAgICAgYXV0aFNlc3Npb24ubWFuYWdlZF9hY2Nlc3NfdG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hdXRoU2VydmljZS5zZXRTZXNzaW9uKG5ldyBjbGFzcyBpbXBsZW1lbnRzIFNlc3Npb25Qcm92aWRlciB7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2Vzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA9IG5ldyBQcm9maWxlU2Vzc2lvbih1aWQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWFuYWdlZFByb2ZpbGVzID0gYXdhaXQgdGhpcy5nZXRNYW5hZ2VkU2VydmVyUHJvZmlsZXMoe1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20uQ0FDSEUsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzOiBbXVxuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWFuYWdlZFByb2ZpbGUgPSBtYW5hZ2VkUHJvZmlsZXMuZmluZCgobSkgPT4gbS5pZCA9PT0gdWlkKSE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhdXRoU2Vzc2lvbiA9IChhd2FpdCB0aGlzLmF1dGhTZXJ2aWNlLmdldFNlc3Npb24oKS50b1Byb21pc2UoKSkhO1xuICAgICAgICAgICAgICAgIGF1dGhTZXNzaW9uLm1hbmFnZWRfYWNjZXNzX3Rva2VuID0gbWFuYWdlZFByb2ZpbGVbJ21hbmFnZWRUb2tlbiddO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXV0aFNlcnZpY2Uuc2V0U2Vzc2lvbihuZXcgY2xhc3MgaW1wbGVtZW50cyBTZXNzaW9uUHJvdmlkZXIge1xuICAgICAgICAgICAgICAgICAgICBhc3luYyBwcm92aWRlKCk6IFByb21pc2U8T0F1dGhTZXNzaW9uPiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoXG4gICAgICAgICAgICAgICAgUHJvZmlsZUtleXMuS0VZX1VTRVJfU0VTU0lPTiwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZVNlc3Npb24pXG4gICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICBUZWxlbWV0cnlMb2dnZXIubG9nLnN0YXJ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgZW52OiAnc2RrJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnc3dpdGNoLXVzZXInLFxuICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnSW5pdGlhdG9ySWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGluaXRpYWxTZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gaW5pdGlhbFNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogaW5pdGlhbFNlc3Npb24udWlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VkVXNlcklkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHByb2ZpbGVTZXNzaW9uLm1hbmFnZWRTZXNzaW9uLnVpZCA6IHByb2ZpbGVTZXNzaW9uLnVpZFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmdldFNlc3Npb24oKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoc2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2Uuc2V0U2Vzc2lvbihuZXcgY2xhc3MgaW1wbGVtZW50cyBTZXNzaW9uUHJvdmlkZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jIHByb3ZpZGUoKTogUHJvbWlzZTxPQXV0aFNlc3Npb24+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnNlc3Npb24hLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlclRva2VuOiB1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmVyUHJvZmlsZTogU2VydmVyUHJvZmlsZSA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0U2VydmVyUHJvZmlsZXNEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1aWQsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzOiBbXVxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdE9yZ0lkID0gc2VydmVyUHJvZmlsZS5yb290T3JnID8gc2VydmVyUHJvZmlsZS5yb290T3JnLmhhc2hUYWdJZCA6IHNlcnZlclByb2ZpbGVbJ3Jvb3RPcmdJZCddO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWV3b3JrU2VydmljZS5zZXRBY3RpdmVDaGFubmVsSWQocm9vdE9yZ0lkKS50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBwZXJzaXN0TWFuYWdlZFByb2ZpbGUoc2VydmVyUHJvZmlsZTogU2VydmVyUHJvZmlsZSkge1xuICAgICAgICAvLyBUT0RPOiBhZGRpbmcgbWlzc2luZyBmaWVsZHM7IHNob3VsZCByZW1vdmVcbiAgICAgICAgc2VydmVyUHJvZmlsZS51c2VySWQgPSBzZXJ2ZXJQcm9maWxlLmlkO1xuICAgICAgICBzZXJ2ZXJQcm9maWxlLnJvb3RPcmcgPSB7XG4gICAgICAgICAgICBoYXNoVGFnSWQ6IHNlcnZlclByb2ZpbGVbJ3Jvb3RPcmdJZCddXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5wcm9maWxlU2VydmljZS5jcmVhdGVQcm9maWxlKHtcbiAgICAgICAgICAgIHVpZDogc2VydmVyUHJvZmlsZS5pZCxcbiAgICAgICAgICAgIHByb2ZpbGVUeXBlOiBQcm9maWxlVHlwZS5TVFVERU5ULFxuICAgICAgICAgICAgc291cmNlOiBQcm9maWxlU291cmNlLlNFUlZFUixcbiAgICAgICAgICAgIGhhbmRsZTogc2VydmVyUHJvZmlsZS5maXJzdE5hbWUsXG4gICAgICAgICAgICBib2FyZDogKHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrICYmIHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrWydib2FyZCddKSB8fCBbXSxcbiAgICAgICAgICAgIG1lZGl1bTogKHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrICYmIHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrWydtZWRpdW0nXSkgfHwgW10sXG4gICAgICAgICAgICBncmFkZTogKHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrICYmIHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrWydncmFkZUxldmVsJ10pIHx8IFtdLFxuICAgICAgICAgICAgZ3JhZGVWYWx1ZTogKHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrICYmIHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrWydncmFkZVZhbHVlJ10pIHx8ICcnLFxuICAgICAgICAgICAgc3ViamVjdDogKHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrICYmIHNlcnZlclByb2ZpbGUuZnJhbWV3b3JrWydzdWJqZWN0J10pIHx8IFtdLFxuICAgICAgICAgICAgc2VydmVyUHJvZmlsZTogc2VydmVyUHJvZmlsZVxuICAgICAgICB9LCBQcm9maWxlU291cmNlLlNFUlZFUikudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgdGhpcy5jYWNoZWRJdGVtU3RvcmUuZ2V0Q2FjaGVkKFxuICAgICAgICAgICAgc2VydmVyUHJvZmlsZS5pZCxcbiAgICAgICAgICAgIE1hbmFnZWRQcm9maWxlTWFuYWdlci5VU0VSX1BST0ZJTEVfREVUQUlMU19LRVlfUFJFRklYLFxuICAgICAgICAgICAgTWFuYWdlZFByb2ZpbGVNYW5hZ2VyLlVTRVJfUFJPRklMRV9ERVRBSUxTX0tFWV9QUkVGSVgsXG4gICAgICAgICAgICAoKSA9PiBvZihzZXJ2ZXJQcm9maWxlKVxuICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlTWFuYWdlZFByb2ZpbGUoYWRkTWFuYWdlZFByb2ZpbGVSZXF1ZXN0OiBBZGRNYW5hZ2VkUHJvZmlsZVJlcXVlc3QpOiBQcm9taXNlPHsgdWlkOiBzdHJpbmcgfT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50UHJvZmlsZSA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlU2Vzc2lvblByb2ZpbGUoe3JlcXVpcmVkRmllbGRzOiBbXX0pLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50UHJvZmlsZS5zb3VyY2UgIT09IFByb2ZpbGVTb3VyY2UuU0VSVkVSKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9BY3RpdmVTZXNzaW9uRXJyb3IoJ05vIGFjdGl2ZSBzZXNzaW9uIGF2YWlsYWJsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTWFuYWdlZFByb2ZpbGVSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLlBPU1QpXG4gICAgICAgICAgICAud2l0aFBhdGgodGhpcy5wcm9maWxlU2VydmljZUNvbmZpZy5wcm9maWxlQXBpUGF0aF9WMiArICcvbWFuYWdlZC9jcmVhdGUnKVxuICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLndpdGhVc2VyVG9rZW4odHJ1ZSlcbiAgICAgICAgICAgIC53aXRoQm9keSh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdDogYWRkTWFuYWdlZFByb2ZpbGVSZXF1ZXN0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHJlc3VsdDogeyB1c2VySWQ6IHN0cmluZyB9IH0+KGNyZWF0ZU1hbmFnZWRQcm9maWxlUmVxdWVzdCkudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHt1aWQ6IHJlc3BvbnNlLmJvZHkucmVzdWx0LnVzZXJJZH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGlzTG9nZ2VkSW5Vc2VyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRTZXNzaW9uKCkudG9Qcm9taXNlKCkpO1xuICAgIH1cbn1cbiJdfQ==