var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { DbService } from '../../db';
import { Context, SunbirdTelemetry, TelemetryDecorator } from '..';
import { TelemetryEntry, TelemetryProcessedEntry } from '../db/schema';
import { TelemetrySyncHandler } from '../handler/telemetry-sync-handler';
import { EventNamespace } from '../../events-bus';
import { ValidateTelemetryMetadata } from '../handler/import/validate-telemetry-metadata';
import { TelemetryEventType } from '../def/telemetry-event';
import { TransportProcessedTelemetry } from '../handler/import/transport-processed-telemetry';
import { UpdateImportedTelemetryMetadata } from '../handler/import/update-imported-telemetry-metadata';
import { GenerateImportTelemetryShare } from '../handler/import/generate-import-telemetry-share';
import { NetworkStatus } from '../../util/network';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { catchError, map, mapTo, mergeMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, defer, from, Observable, of, zip } from 'rxjs';
import { ApiKeys, TelemetryKeys } from '../../preference-keys';
import { TelemetryAutoSyncServiceImpl } from '../util/telemetry-auto-sync-service-impl';
import { ApiTokenHandler } from '../../api/handlers/api-token-handler';
import { AuthUtil } from '../../auth/util/auth-util';
var TelemetryServiceImpl = /** @class */ (function () {
    function TelemetryServiceImpl(dbService, decorator, profileService, groupService, keyValueStore, apiService, sdkConfig, deviceInfo, eventsBusService, fileService, frameworkService, networkInfoService, errorLoggerService, sharedPreferences, appInfoService, deviceRegisterService, courseService, networkQueue) {
        this.dbService = dbService;
        this.decorator = decorator;
        this.profileService = profileService;
        this.groupService = groupService;
        this.keyValueStore = keyValueStore;
        this.apiService = apiService;
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.eventsBusService = eventsBusService;
        this.fileService = fileService;
        this.frameworkService = frameworkService;
        this.networkInfoService = networkInfoService;
        this.errorLoggerService = errorLoggerService;
        this.sharedPreferences = sharedPreferences;
        this.appInfoService = appInfoService;
        this.deviceRegisterService = deviceRegisterService;
        this.courseService = courseService;
        this.networkQueue = networkQueue;
        this.campaignParameters = [];
        this.globalCdata = [];
        this.telemetryConfig = this.sdkConfig.telemetryConfig;
        this._lastSyncedTimestamp$ = new BehaviorSubject(undefined);
    }
    Object.defineProperty(TelemetryServiceImpl.prototype, "autoSync", {
        get: function () {
            if (!this.telemetryAutoSyncService) {
                this.telemetryAutoSyncService = new TelemetryAutoSyncServiceImpl(this, this.sharedPreferences);
            }
            return this.telemetryAutoSyncService;
        },
        enumerable: false,
        configurable: true
    });
    TelemetryServiceImpl.prototype.preInit = function () {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.getInitialUtmParameters().then(function (parameters) {
                    if (parameters && parameters.length) {
                        _this.updateCampaignParameters(parameters);
                    }
                });
                return [2 /*return*/, undefined];
            });
        }); });
    };
    TelemetryServiceImpl.prototype.onInit = function () {
        var _this = this;
        return combineLatest([
            defer(function () { return __awaiter(_this, void 0, void 0, function () {
                var lastSyncTimestamp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sharedPreferences.getString(TelemetryKeys.KEY_LAST_SYNCED_TIME_STAMP).toPromise()];
                        case 1:
                            lastSyncTimestamp = _a.sent();
                            if (lastSyncTimestamp) {
                                try {
                                    this._lastSyncedTimestamp$.next(parseInt(lastSyncTimestamp, 10));
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            }
                            return [2 /*return*/, undefined];
                    }
                });
            }); }),
            new Observable(function (observer) {
                sbsync.onAuthorizationError(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var error;
                    return __generator(this, function (_a) {
                        error = response.network_queue_error;
                        if (error) {
                            observer.next(error);
                        }
                        return [2 /*return*/];
                    });
                }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
            }).pipe(mergeMap(function (error) {
                if (error === 'API_TOKEN_EXPIRED') {
                    return new ApiTokenHandler(_this.sdkConfig.apiConfig, _this.apiService, _this.deviceInfo).refreshAuthToken().pipe(mergeMap(function (bearerToken) {
                        return _this.sharedPreferences.putString(ApiKeys.KEY_API_TOKEN, bearerToken);
                    }), catchError(function () { return of(undefined); }));
                }
                else {
                    return from(new AuthUtil(_this.sdkConfig.apiConfig, _this.apiService, _this.sharedPreferences, _this.eventsBusService).refreshSession()).pipe(catchError(function () { return of(undefined); }));
                }
            }))
        ]).pipe(mapTo(undefined));
    };
    TelemetryServiceImpl.prototype.saveTelemetry = function (request) {
        var _this = this;
        return defer(function () {
            try {
                var telemetry = JSON.parse(request);
                return _this.decorateAndPersist(telemetry);
            }
            catch (e) {
                console.error(e);
                return of(false);
            }
        });
    };
    TelemetryServiceImpl.prototype.audit = function (_a) {
        var env = _a.env, actor = _a.actor, currentState = _a.currentState, updatedProperties = _a.updatedProperties, type = _a.type, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, correlationData = _a.correlationData, rollUp = _a.rollUp;
        var audit = new SunbirdTelemetry.Audit(env, actor, currentState, updatedProperties, type, objId, objType, objVer, correlationData, rollUp);
        return this.decorateAndPersist(audit);
    };
    TelemetryServiceImpl.prototype.end = function (_a) {
        var type = _a.type, mode = _a.mode, duration = _a.duration, pageId = _a.pageId, summaryList = _a.summaryList, env = _a.env, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, rollup = _a.rollup, correlationData = _a.correlationData;
        var end = new SunbirdTelemetry.End(type, mode, duration, pageId, summaryList, env, objId, objType, objVer, rollup, correlationData);
        return this.decorateAndPersist(end);
    };
    TelemetryServiceImpl.prototype.error = function (request) {
        var error = new SunbirdTelemetry.Error(request.errorCode, request.errorType, request.stacktrace, request.pageId);
        this.errorLoggerService.logError(request).toPromise().catch(function (e) { return console.error(e); });
        return this.decorateAndPersist(error);
    };
    TelemetryServiceImpl.prototype.impression = function (_a) {
        var type = _a.type, subType = _a.subType, pageId = _a.pageId, visits = _a.visits, env = _a.env, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, rollup = _a.rollup, correlationData = _a.correlationData;
        var impression = new SunbirdTelemetry.Impression(type, subType, pageId, visits, env, objId, objType, objVer, rollup, correlationData);
        return this.decorateAndPersist(impression);
    };
    TelemetryServiceImpl.prototype.interact = function (_a) {
        var type = _a.type, subType = _a.subType, id = _a.id, pageId = _a.pageId, pos = _a.pos, env = _a.env, rollup = _a.rollup, valueMap = _a.valueMap, correlationData = _a.correlationData, objId = _a.objId, objType = _a.objType, objVer = _a.objVer;
        var interact = new SunbirdTelemetry.Interact(type, subType, id, pageId, pos, valueMap, env, objId, objType, objVer, rollup, correlationData);
        return this.decorateAndPersist(interact);
    };
    TelemetryServiceImpl.prototype.log = function (_a) {
        var type = _a.type, level = _a.level, message = _a.message, pageId = _a.pageId, params = _a.params, env = _a.env, actorType = _a.actorType;
        var log = new SunbirdTelemetry.Log(type, level, message, pageId, params, env, actorType);
        return this.decorateAndPersist(log);
    };
    TelemetryServiceImpl.prototype.share = function (_a) {
        var dir = _a.dir, type = _a.type, items = _a.items, correlationData = _a.correlationData, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, rollUp = _a.rollUp;
        var share = new SunbirdTelemetry.Share(dir, type, [], correlationData, objId, objType, objVer, rollUp);
        items.forEach(function (item) {
            share.addItem(item.type, item.origin, item.identifier, item.pkgVersion, item.transferCount, item.size);
        });
        return this.decorateAndPersist(share);
    };
    TelemetryServiceImpl.prototype.feedback = function (_a) {
        var rating = _a.rating, comments = _a.comments, env = _a.env, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, commentid = _a.commentid, commenttxt = _a.commenttxt;
        var feedback = new SunbirdTelemetry.Feedback(rating, comments, env, objId, objType, objVer, commentid, commenttxt);
        return this.decorateAndPersist(feedback);
    };
    TelemetryServiceImpl.prototype.start = function (_a) {
        var type = _a.type, deviceSpecification = _a.deviceSpecification, loc = _a.loc, mode = _a.mode, duration = _a.duration, pageId = _a.pageId, env = _a.env, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, rollup = _a.rollup, correlationData = _a.correlationData;
        var start = new SunbirdTelemetry.Start(type, deviceSpecification, loc, mode, duration, pageId, env, objId, objType, objVer, rollup, correlationData);
        return this.decorateAndPersist(start);
    };
    TelemetryServiceImpl.prototype.summary = function (_a) {
        var type = _a.type, starttime = _a.starttime, endtime = _a.endtime, timespent = _a.timespent, pageviews = _a.pageviews, interactions = _a.interactions, env = _a.env, mode = _a.mode, envsummary = _a.envsummary, eventsummary = _a.eventsummary, pagesummary = _a.pagesummary, extra = _a.extra, correlationData = _a.correlationData, objId = _a.objId, objType = _a.objType, objVer = _a.objVer, rollup = _a.rollup;
        var summary = new SunbirdTelemetry.Summary(type, starttime, endtime, timespent, pageviews, interactions, env, mode, envsummary, eventsummary, pagesummary, extra, correlationData, objId, objType, objVer, rollup);
        return this.decorateAndPersist(summary);
    };
    TelemetryServiceImpl.prototype.interrupt = function (_a) {
        var type = _a.type, pageId = _a.pageId;
        var interrupt = new SunbirdTelemetry.Interrupt(type, pageId);
        return this.decorateAndPersist(interrupt);
    };
    TelemetryServiceImpl.prototype.importTelemetry = function (importTelemetryRequest) {
        var _this = this;
        var importTelemetryContext = {
            sourceDBFilePath: importTelemetryRequest.sourceFilePath
        };
        return from(new ValidateTelemetryMetadata(this.dbService).execute(importTelemetryContext).then(function (importResponse) {
            return new TransportProcessedTelemetry(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new UpdateImportedTelemetryMetadata(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new UpdateImportedTelemetryMetadata(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new GenerateImportTelemetryShare(_this.dbService, _this).execute(importResponse.body);
        }).then(function (importResponse) {
            return true;
        }).catch(function (e) {
            console.error(e);
            return false;
        }));
    };
    TelemetryServiceImpl.prototype.getTelemetryStat = function () {
        var telemetryCountQuery = "\n            SELECT COUNT(*) as TELEMETRY_COUNT\n            FROM " + TelemetryEntry.TABLE_NAME + "\n        ";
        var processedTelemetryCountQuery = "\n            SELECT SUM(" + TelemetryProcessedEntry.COLUMN_NAME_NUMBER_OF_EVENTS + ") as PROCESSED_TELEMETRY_COUNT\n            FROM " + TelemetryProcessedEntry.TABLE_NAME + "\n        ";
        return zip(this.dbService.execute(telemetryCountQuery), this.dbService.execute(processedTelemetryCountQuery), this.keyValueStore.getValue(TelemetryKeys.KEY_LAST_SYNCED_TIME_STAMP)).pipe(map(function (results) {
            var telemetryCount = results[0][0]['TELEMETRY_COUNT'];
            var processedTelemetryCount = results[1][0]['PROCESSED_TELEMETRY_COUNT'];
            var lastSyncedTimestamp = results[2] ? parseInt(results[2], 10) : 0;
            return {
                unSyncedEventCount: telemetryCount + processedTelemetryCount,
                lastSyncTime: lastSyncedTimestamp
            };
        }));
    };
    TelemetryServiceImpl.prototype.resetDeviceRegisterTTL = function () {
        return new TelemetrySyncHandler(this.dbService, this.sdkConfig, this.deviceInfo, this.sharedPreferences, this.appInfoService, this.deviceRegisterService, this.keyValueStore, this.apiService, this.networkQueue).resetDeviceRegisterTTL();
    };
    TelemetryServiceImpl.prototype.sync = function (telemetrySyncRequest) {
        var _this = this;
        if (telemetrySyncRequest === void 0) { telemetrySyncRequest = {
            ignoreSyncThreshold: false,
            ignoreAutoSyncMode: false
        }; }
        return this.networkInfoService.networkStatus$.pipe(take(1), mergeMap(function (networkStatus) {
            if (networkStatus === NetworkStatus.ONLINE) {
                telemetrySyncRequest.ignoreSyncThreshold = true;
            }
            return of(telemetrySyncRequest);
        }), mergeMap(function (request) {
            return new TelemetrySyncHandler(_this.dbService, _this.sdkConfig, _this.deviceInfo, _this.sharedPreferences, _this.appInfoService, _this.deviceRegisterService, _this.keyValueStore, _this.apiService, _this.networkQueue).handle(request).pipe(tap(function (syncStat) {
                if (!syncStat.error && syncStat.syncedEventCount) {
                    var now = Date.now();
                    _this.sharedPreferences.putString(TelemetryKeys.KEY_LAST_SYNCED_TIME_STAMP, now + '').toPromise();
                    _this._lastSyncedTimestamp$.next(now);
                }
            }));
        }));
    };
    TelemetryServiceImpl.prototype.lastSyncedTimestamp = function () {
        return this._lastSyncedTimestamp$.asObservable();
    };
    TelemetryServiceImpl.prototype.buildContext = function () {
        var _this = this;
        return this.profileService.getActiveProfileSession().pipe(map(function (session) {
            return _this.decorator.buildContext(session.sid, _this.frameworkService.activeChannelId, new Context());
        }));
    };
    TelemetryServiceImpl.prototype.decorateAndPersist = function (telemetry) {
        var _this = this;
        return zip(this.profileService.getActiveProfileSession(), this.groupService.getActiveGroupSession()).pipe(mergeMap(function (sessions) {
            var profileSession = sessions[0];
            var groupSession = sessions[1];
            return _this.keyValueStore.getValue(TelemetrySyncHandler.TELEMETRY_LOG_MIN_ALLOWED_OFFSET_KEY).pipe(mergeMap(function (offset) {
                offset = offset || '0';
                var insertQuery = {
                    table: TelemetryEntry.TABLE_NAME,
                    modelJson: _this.decorator.prepare(_this.decorator.decorate(telemetry, profileSession, groupSession && groupSession.gid, Number(offset), _this.frameworkService.activeChannelId, _this.campaignParameters, _this.globalCdata), 1)
                };
                return _this.dbService.insert(insertQuery).pipe(tap(function () { return _this.eventsBusService.emit({
                    namespace: EventNamespace.TELEMETRY,
                    event: {
                        type: TelemetryEventType.SAVE,
                        payload: telemetry
                    }
                }); }), map(function (count) { return count > 1; }));
            }));
        }));
    };
    TelemetryServiceImpl.prototype.updateCampaignParameters = function (params) {
        this.campaignParameters = params;
    };
    TelemetryServiceImpl.prototype.populateGlobalCorRelationData = function (params) {
        this.globalCdata = params;
    };
    TelemetryServiceImpl.prototype.getInitialUtmParameters = function () {
        return new Promise(function (resolve, reject) {
            try {
                sbutility.getUtmInfo(function (response) {
                    resolve(response.val);
                }, function (err) {
                    reject(err);
                });
            }
            catch (xc) {
                reject(xc);
            }
        });
    };
    TelemetryServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.TELEMETRY_DECORATOR)),
        __param(2, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(3, inject(InjectionTokens.GROUP_SERVICE_DEPRECATED)),
        __param(4, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(5, inject(InjectionTokens.API_SERVICE)),
        __param(6, inject(InjectionTokens.SDK_CONFIG)),
        __param(7, inject(InjectionTokens.DEVICE_INFO)),
        __param(8, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(9, inject(InjectionTokens.FILE_SERVICE)),
        __param(10, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(11, inject(InjectionTokens.NETWORKINFO_SERVICE)),
        __param(12, inject(InjectionTokens.ERROR_LOGGER_SERVICE)),
        __param(13, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(14, inject(InjectionTokens.APP_INFO)),
        __param(15, inject(InjectionTokens.DEVICE_REGISTER_SERVICE)),
        __param(16, inject(InjectionTokens.COURSE_SERVICE)),
        __param(17, inject(InjectionTokens.NETWORK_QUEUE)),
        __metadata("design:paramtypes", [DbService,
            TelemetryDecorator, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
    ], TelemetryServiceImpl);
    return TelemetryServiceImpl;
}());
export { TelemetryServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZWxlbWV0cnkvaW1wbC90ZWxlbWV0cnktc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsTUFBTSxVQUFVLENBQUM7QUFDaEQsT0FBTyxFQUNILE9BQU8sRUFFUCxnQkFBZ0IsRUFFaEIsa0JBQWtCLEVBZXJCLE1BQU0sSUFBSSxDQUFDO0FBQ1osT0FBTyxFQUFDLGNBQWMsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUdyRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUt2RSxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzVGLE9BQU8sRUFBQywrQkFBK0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQ3JHLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBRS9GLE9BQU8sRUFBcUIsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBTXZELE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFn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TSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQTt5Q0FqQmlCLFNBQVM7WUFDQSxrQkFBa0I7T0FqQjdFLG9CQUFvQixDQTJXaEM7SUFBRCwyQkFBQztDQUFBLEFBM1dELElBMldDO1NBM1dZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlLCBJbnNlcnRRdWVyeX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtcbiAgICBDb250ZXh0LFxuICAgIEltcG9ydFRlbGVtZXRyeUNvbnRleHQsXG4gICAgU3VuYmlyZFRlbGVtZXRyeSxcbiAgICBUZWxlbWV0cnlBdWRpdFJlcXVlc3QsXG4gICAgVGVsZW1ldHJ5RGVjb3JhdG9yLFxuICAgIFRlbGVtZXRyeUVuZFJlcXVlc3QsXG4gICAgVGVsZW1ldHJ5RXJyb3JSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeUZlZWRiYWNrUmVxdWVzdCxcbiAgICBUZWxlbWV0cnlJbXBvcnRSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeUltcHJlc3Npb25SZXF1ZXN0LFxuICAgIFRlbGVtZXRyeUludGVyYWN0UmVxdWVzdCxcbiAgICBUZWxlbWV0cnlJbnRlcnJ1cHRSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeUxvZ1JlcXVlc3QsXG4gICAgVGVsZW1ldHJ5U2VydmljZSxcbiAgICBUZWxlbWV0cnlTaGFyZVJlcXVlc3QsXG4gICAgVGVsZW1ldHJ5U3RhcnRSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeVN0YXQsIFRlbGVtZXRyeVN1bW1hcnlSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeVN5bmNSZXF1ZXN0LFxuICAgIFRlbGVtZXRyeVN5bmNTdGF0XG59IGZyb20gJy4uJztcbmltcG9ydCB7VGVsZW1ldHJ5RW50cnksIFRlbGVtZXRyeVByb2Nlc3NlZEVudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZSwgUHJvZmlsZVNlc3Npb259IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtHcm91cFNlcnZpY2VEZXByZWNhdGVkLCBHcm91cFNlc3Npb25EZXByZWNhdGVkfSBmcm9tICcuLi8uLi9ncm91cC1kZXByZWNhdGVkJztcbmltcG9ydCB7VGVsZW1ldHJ5U3luY0hhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvdGVsZW1ldHJ5LXN5bmMtaGFuZGxlcic7XG5pbXBvcnQge0tleVZhbHVlU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0FwaVNlcnZpY2UsIFJlc3BvbnNlfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtUZWxlbWV0cnlDb25maWd9IGZyb20gJy4uL2NvbmZpZy90ZWxlbWV0cnktY29uZmlnJztcbmltcG9ydCB7RGV2aWNlSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9kZXZpY2UnO1xuaW1wb3J0IHtFdmVudE5hbWVzcGFjZSwgRXZlbnRzQnVzU2VydmljZX0gZnJvbSAnLi4vLi4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1ZhbGlkYXRlVGVsZW1ldHJ5TWV0YWRhdGF9IGZyb20gJy4uL2hhbmRsZXIvaW1wb3J0L3ZhbGlkYXRlLXRlbGVtZXRyeS1tZXRhZGF0YSc7XG5pbXBvcnQge1RlbGVtZXRyeUV2ZW50VHlwZX0gZnJvbSAnLi4vZGVmL3RlbGVtZXRyeS1ldmVudCc7XG5pbXBvcnQge1RyYW5zcG9ydFByb2Nlc3NlZFRlbGVtZXRyeX0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LXByb2Nlc3NlZC10ZWxlbWV0cnknO1xuaW1wb3J0IHtVcGRhdGVJbXBvcnRlZFRlbGVtZXRyeU1ldGFkYXRhfSBmcm9tICcuLi9oYW5kbGVyL2ltcG9ydC91cGRhdGUtaW1wb3J0ZWQtdGVsZW1ldHJ5LW1ldGFkYXRhJztcbmltcG9ydCB7R2VuZXJhdGVJbXBvcnRUZWxlbWV0cnlTaGFyZX0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvZ2VuZXJhdGUtaW1wb3J0LXRlbGVtZXRyeS1zaGFyZSc7XG5pbXBvcnQge0ZyYW1ld29ya1NlcnZpY2V9IGZyb20gJy4uLy4uL2ZyYW1ld29yayc7XG5pbXBvcnQge05ldHdvcmtJbmZvU2VydmljZSwgTmV0d29ya1N0YXR1c30gZnJvbSAnLi4vLi4vdXRpbC9uZXR3b3JrJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtFcnJvckxvZ2dlclNlcnZpY2V9IGZyb20gJy4uLy4uL2Vycm9yJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7QXBwSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9hcHAnO1xuaW1wb3J0IHtEZXZpY2VSZWdpc3RlclNlcnZpY2V9IGZyb20gJy4uLy4uL2RldmljZS1yZWdpc3Rlcic7XG5pbXBvcnQge2NhdGNoRXJyb3IsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCB0YWtlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBkZWZlciwgZnJvbSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIG9mLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcGlLZXlzLCBUZWxlbWV0cnlLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtUZWxlbWV0cnlBdXRvU3luY1NlcnZpY2VJbXBsfSBmcm9tICcuLi91dGlsL3RlbGVtZXRyeS1hdXRvLXN5bmMtc2VydmljZS1pbXBsJztcbmltcG9ydCB7Q291cnNlU2VydmljZX0gZnJvbSAnLi4vLi4vY291cnNlJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlfSBmcm9tICcuLi8uLi9hcGkvbmV0d29yay1xdWV1ZSc7XG5pbXBvcnQge0NvcnJlbGF0aW9uRGF0YX0gZnJvbSAnLi4vZGVmL3RlbGVtZXRyeS1tb2RlbCc7XG5pbXBvcnQge1Nka1NlcnZpY2VPbkluaXREZWxlZ2F0ZX0gZnJvbSAnLi4vLi4vc2RrLXNlcnZpY2Utb24taW5pdC1kZWxlZ2F0ZSc7XG5pbXBvcnQge1Nka1NlcnZpY2VQcmVJbml0RGVsZWdhdGV9IGZyb20gJy4uLy4uL3Nkay1zZXJ2aWNlLXByZS1pbml0LWRlbGVnYXRlJztcbmltcG9ydCB7QXBpVG9rZW5IYW5kbGVyfSBmcm9tICcuLi8uLi9hcGkvaGFuZGxlcnMvYXBpLXRva2VuLWhhbmRsZXInO1xuaW1wb3J0IHtBdXRoVXRpbH0gZnJvbSAnLi4vLi4vYXV0aC91dGlsL2F1dGgtdXRpbCc7XG5cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlbGVtZXRyeVNlcnZpY2VJbXBsIGltcGxlbWVudHMgVGVsZW1ldHJ5U2VydmljZSwgU2RrU2VydmljZU9uSW5pdERlbGVnYXRlLCBTZGtTZXJ2aWNlUHJlSW5pdERlbGVnYXRlIHtcbiAgICBwcml2YXRlIF9sYXN0U3luY2VkVGltZXN0YW1wJDogQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IHVuZGVmaW5lZD47XG4gICAgcHJpdmF0ZSB0ZWxlbWV0cnlBdXRvU3luY1NlcnZpY2U/OiBUZWxlbWV0cnlBdXRvU3luY1NlcnZpY2VJbXBsO1xuICAgIHByaXZhdGUgdGVsZW1ldHJ5Q29uZmlnOiBUZWxlbWV0cnlDb25maWc7XG4gICAgcHJpdmF0ZSBjYW1wYWlnblBhcmFtZXRlcnM6IENvcnJlbGF0aW9uRGF0YVtdID0gW107XG4gICAgcHJpdmF0ZSBnbG9iYWxDZGF0YTogQ29ycmVsYXRpb25EYXRhW10gPSBbXTtcblxuICAgIGdldCBhdXRvU3luYygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRlbGVtZXRyeUF1dG9TeW5jU2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy50ZWxlbWV0cnlBdXRvU3luY1NlcnZpY2UgPSBuZXcgVGVsZW1ldHJ5QXV0b1N5bmNTZXJ2aWNlSW1wbCh0aGlzLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRlbGVtZXRyeUF1dG9TeW5jU2VydmljZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREJfU0VSVklDRSkgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuVEVMRU1FVFJZX0RFQ09SQVRPUikgcHJpdmF0ZSBkZWNvcmF0b3I6IFRlbGVtZXRyeURlY29yYXRvcixcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKSBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuR1JPVVBfU0VSVklDRV9ERVBSRUNBVEVEKSBwcml2YXRlIGdyb3VwU2VydmljZTogR3JvdXBTZXJ2aWNlRGVwcmVjYXRlZCxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuS0VZX1ZBTFVFX1NUT1JFKSBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQSV9TRVJWSUNFKSBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKSBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm8sXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkVWRU5UU19CVVNfU0VSVklDRSkgcHJpdmF0ZSBldmVudHNCdXNTZXJ2aWNlOiBFdmVudHNCdXNTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GUkFNRVdPUktfU0VSVklDRSkgcHJpdmF0ZSBmcmFtZXdvcmtTZXJ2aWNlOiBGcmFtZXdvcmtTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ORVRXT1JLSU5GT19TRVJWSUNFKSBwcml2YXRlIG5ldHdvcmtJbmZvU2VydmljZTogTmV0d29ya0luZm9TZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5FUlJPUl9MT0dHRVJfU0VSVklDRSkgcHJpdmF0ZSBlcnJvckxvZ2dlclNlcnZpY2U6IEVycm9yTG9nZ2VyU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKSBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBQX0lORk8pIHByaXZhdGUgYXBwSW5mb1NlcnZpY2U6IEFwcEluZm8sXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9SRUdJU1RFUl9TRVJWSUNFKSBwcml2YXRlIGRldmljZVJlZ2lzdGVyU2VydmljZTogRGV2aWNlUmVnaXN0ZXJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT1VSU0VfU0VSVklDRSkgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ORVRXT1JLX1FVRVVFKSBwcml2YXRlIG5ldHdvcmtRdWV1ZTogTmV0d29ya1F1ZXVlLFxuICAgICkge1xuICAgICAgICB0aGlzLnRlbGVtZXRyeUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLnRlbGVtZXRyeUNvbmZpZztcbiAgICAgICAgdGhpcy5fbGFzdFN5bmNlZFRpbWVzdGFtcCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwcmVJbml0KCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldEluaXRpYWxVdG1QYXJhbWV0ZXJzKCkudGhlbigocGFyYW1ldGVycykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtcGFpZ25QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Jbml0KCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3luY1RpbWVzdGFtcCA9IGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKFRlbGVtZXRyeUtleXMuS0VZX0xBU1RfU1lOQ0VEX1RJTUVfU1RBTVApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U3luY1RpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFN5bmNlZFRpbWVzdGFtcCQubmV4dChwYXJzZUludChsYXN0U3luY1RpbWVzdGFtcCwgMTApKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHVuZGVmaW5lZD4pID0+IHtcbiAgICAgICAgICAgICAgICBzYnN5bmMub25BdXRob3JpemF0aW9uRXJyb3IoYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcmVzcG9uc2UubmV0d29ya19xdWV1ZV9lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGFzeW5jIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yID09PSAnQVBJX1RPS0VOX0VYUElSRUQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFwaVRva2VuSGFuZGxlcih0aGlzLnNka0NvbmZpZy5hcGlDb25maWcsIHRoaXMuYXBpU2VydmljZSwgdGhpcy5kZXZpY2VJbmZvKS5yZWZyZXNoQXV0aFRva2VuKCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoYmVhcmVyVG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKEFwaUtleXMuS0VZX0FQSV9UT0tFTiwgYmVhcmVyVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YodW5kZWZpbmVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShuZXcgQXV0aFV0aWwodGhpcy5zZGtDb25maWcuYXBpQ29uZmlnLCB0aGlzLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UpLnJlZnJlc2hTZXNzaW9uKCkpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZih1bmRlZmluZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIF0pLnBpcGUobWFwVG8odW5kZWZpbmVkKSk7XG5cbiAgICB9XG5cbiAgICBzYXZlVGVsZW1ldHJ5KHJlcXVlc3Q6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWxlbWV0cnk6IFN1bmJpcmRUZWxlbWV0cnkuVGVsZW1ldHJ5ID0gSlNPTi5wYXJzZShyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZUFuZFBlcnNpc3QodGVsZW1ldHJ5KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGF1ZGl0KHtlbnYsIGFjdG9yLCBjdXJyZW50U3RhdGUsIHVwZGF0ZWRQcm9wZXJ0aWVzLCB0eXBlLCBvYmpJZCwgb2JqVHlwZSwgb2JqVmVyLCBjb3JyZWxhdGlvbkRhdGEsIHJvbGxVcH06XG4gICAgICAgICAgICAgIFRlbGVtZXRyeUF1ZGl0UmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBhdWRpdCA9IG5ldyBTdW5iaXJkVGVsZW1ldHJ5LkF1ZGl0KGVudiwgYWN0b3IsIGN1cnJlbnRTdGF0ZSwgdXBkYXRlZFByb3BlcnRpZXMsIHR5cGUsIG9iaklkLFxuICAgICAgICAgICAgb2JqVHlwZSwgb2JqVmVyLCBjb3JyZWxhdGlvbkRhdGEsIHJvbGxVcCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChhdWRpdCk7XG4gICAgfVxuXG4gICAgZW5kKHtcbiAgICAgICAgICAgIHR5cGUsIG1vZGUsIGR1cmF0aW9uLCBwYWdlSWQsIHN1bW1hcnlMaXN0LCBlbnYsXG4gICAgICAgICAgICBvYmpJZCwgb2JqVHlwZSwgb2JqVmVyLCByb2xsdXAsIGNvcnJlbGF0aW9uRGF0YVxuICAgICAgICB9OiBUZWxlbWV0cnlFbmRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGVuZCA9IG5ldyBTdW5iaXJkVGVsZW1ldHJ5LkVuZCh0eXBlLCBtb2RlLCBkdXJhdGlvbiwgcGFnZUlkLCBzdW1tYXJ5TGlzdCwgZW52LCBvYmpJZCxcbiAgICAgICAgICAgIG9ialR5cGUsIG9ialZlciwgcm9sbHVwLCBjb3JyZWxhdGlvbkRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZUFuZFBlcnNpc3QoZW5kKTtcbiAgICB9XG5cbiAgICBlcnJvcihyZXF1ZXN0OiBUZWxlbWV0cnlFcnJvclJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgU3VuYmlyZFRlbGVtZXRyeS5FcnJvcihyZXF1ZXN0LmVycm9yQ29kZSwgcmVxdWVzdC5lcnJvclR5cGUsIHJlcXVlc3Quc3RhY2t0cmFjZSwgcmVxdWVzdC5wYWdlSWQpO1xuICAgICAgICB0aGlzLmVycm9yTG9nZ2VyU2VydmljZS5sb2dFcnJvcihyZXF1ZXN0KS50b1Byb21pc2UoKS5jYXRjaCgoZSkgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChlcnJvcik7XG4gICAgfVxuXG4gICAgaW1wcmVzc2lvbih7XG4gICAgICAgICAgICAgICAgICAgdHlwZSwgc3ViVHlwZSwgcGFnZUlkLCB2aXNpdHMsIGVudiwgb2JqSWQsXG4gICAgICAgICAgICAgICAgICAgb2JqVHlwZSwgb2JqVmVyLCByb2xsdXAsIGNvcnJlbGF0aW9uRGF0YVxuICAgICAgICAgICAgICAgfTogVGVsZW1ldHJ5SW1wcmVzc2lvblJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaW1wcmVzc2lvbiA9IG5ldyBTdW5iaXJkVGVsZW1ldHJ5LkltcHJlc3Npb24odHlwZSwgc3ViVHlwZSwgcGFnZUlkLCB2aXNpdHMsIGVudiwgb2JqSWQsXG4gICAgICAgICAgICBvYmpUeXBlLCBvYmpWZXIsIHJvbGx1cCEsIGNvcnJlbGF0aW9uRGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChpbXByZXNzaW9uKTtcbiAgICB9XG5cbiAgICBpbnRlcmFjdCh7XG4gICAgICAgICAgICAgICAgIHR5cGUsIHN1YlR5cGUsIGlkLCBwYWdlSWQsIHBvcywgZW52LCByb2xsdXAsXG4gICAgICAgICAgICAgICAgIHZhbHVlTWFwLCBjb3JyZWxhdGlvbkRhdGEsIG9iaklkLCBvYmpUeXBlLCBvYmpWZXJcbiAgICAgICAgICAgICB9OiBUZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaW50ZXJhY3QgPSBuZXcgU3VuYmlyZFRlbGVtZXRyeS5JbnRlcmFjdCh0eXBlLCBzdWJUeXBlLCBpZCwgcGFnZUlkLCBwb3MsIHZhbHVlTWFwLCBlbnYsIG9iaklkLFxuICAgICAgICAgICAgb2JqVHlwZSwgb2JqVmVyLCByb2xsdXAsIGNvcnJlbGF0aW9uRGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChpbnRlcmFjdCk7XG4gICAgfVxuXG4gICAgbG9nKHt0eXBlLCBsZXZlbCwgbWVzc2FnZSwgcGFnZUlkLCBwYXJhbXMsIGVudiwgYWN0b3JUeXBlfTogVGVsZW1ldHJ5TG9nUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBsb2cgPSBuZXcgU3VuYmlyZFRlbGVtZXRyeS5Mb2codHlwZSwgbGV2ZWwsIG1lc3NhZ2UsIHBhZ2VJZCwgcGFyYW1zLCBlbnYsIGFjdG9yVHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChsb2cpO1xuICAgIH1cblxuICAgIHNoYXJlKHtkaXIsIHR5cGUsIGl0ZW1zLCBjb3JyZWxhdGlvbkRhdGEsIG9iaklkLCBvYmpUeXBlLCBvYmpWZXIsIHJvbGxVcH06IFRlbGVtZXRyeVNoYXJlUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBzaGFyZSA9IG5ldyBTdW5iaXJkVGVsZW1ldHJ5LlNoYXJlKGRpciwgdHlwZSwgW10sIGNvcnJlbGF0aW9uRGF0YSwgb2JqSWQsIG9ialR5cGUsIG9ialZlciwgcm9sbFVwKTtcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc2hhcmUuYWRkSXRlbShpdGVtLnR5cGUsIGl0ZW0ub3JpZ2luLCBpdGVtLmlkZW50aWZpZXIsIGl0ZW0ucGtnVmVyc2lvbiwgaXRlbS50cmFuc2ZlckNvdW50LCBpdGVtLnNpemUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb3JhdGVBbmRQZXJzaXN0KHNoYXJlKTtcbiAgICB9XG5cbiAgICBmZWVkYmFjayh7cmF0aW5nLCBjb21tZW50cywgZW52LCBvYmpJZCwgb2JqVHlwZSwgb2JqVmVyLCBjb21tZW50aWQsIGNvbW1lbnR0eHR9OiBUZWxlbWV0cnlGZWVkYmFja1JlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgZmVlZGJhY2sgPSBuZXcgU3VuYmlyZFRlbGVtZXRyeS5GZWVkYmFjayhyYXRpbmcsIGNvbW1lbnRzLCBlbnYsIG9iaklkLFxuICAgICAgICAgICAgb2JqVHlwZSwgb2JqVmVyLCBjb21tZW50aWQsIGNvbW1lbnR0eHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZUFuZFBlcnNpc3QoZmVlZGJhY2spO1xuICAgIH1cblxuICAgIHN0YXJ0KHtcbiAgICAgICAgICAgICAgdHlwZSwgZGV2aWNlU3BlY2lmaWNhdGlvbiwgbG9jLCBtb2RlLCBkdXJhdGlvbiwgcGFnZUlkLCBlbnYsXG4gICAgICAgICAgICAgIG9iaklkLCBvYmpUeXBlLCBvYmpWZXIsIHJvbGx1cCwgY29ycmVsYXRpb25EYXRhXG4gICAgICAgICAgfTogVGVsZW1ldHJ5U3RhcnRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IFN1bmJpcmRUZWxlbWV0cnkuU3RhcnQodHlwZSwgZGV2aWNlU3BlY2lmaWNhdGlvbiwgbG9jLCBtb2RlLCBkdXJhdGlvbiwgcGFnZUlkLCBlbnYsIG9iaklkLFxuICAgICAgICAgICAgb2JqVHlwZSwgb2JqVmVyLCByb2xsdXAsIGNvcnJlbGF0aW9uRGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChzdGFydCk7XG4gICAgfVxuXG4gICAgc3VtbWFyeSh7XG4gICAgICAgICAgICAgICAgdHlwZSwgc3RhcnR0aW1lLCBlbmR0aW1lLCB0aW1lc3BlbnQsIHBhZ2V2aWV3cyxcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbnMsIGVudiwgbW9kZSwgZW52c3VtbWFyeSwgZXZlbnRzdW1tYXJ5LCBwYWdlc3VtbWFyeSwgZXh0cmEsIGNvcnJlbGF0aW9uRGF0YSxcbiAgICAgICAgb2JqSWQsIG9ialR5cGUsIG9ialZlciwgcm9sbHVwXG4gICAgICAgICAgICB9OiBUZWxlbWV0cnlTdW1tYXJ5UmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBzdW1tYXJ5ID0gbmV3IFN1bmJpcmRUZWxlbWV0cnkuU3VtbWFyeSh0eXBlLCBzdGFydHRpbWUsIGVuZHRpbWUsIHRpbWVzcGVudCwgcGFnZXZpZXdzLFxuICAgICAgICAgICAgaW50ZXJhY3Rpb25zLCBlbnYsIG1vZGUsIGVudnN1bW1hcnksIGV2ZW50c3VtbWFyeSwgcGFnZXN1bW1hcnksIGV4dHJhLCBjb3JyZWxhdGlvbkRhdGEsXG4gICAgICAgICAgICBvYmpJZCwgb2JqVHlwZSwgb2JqVmVyLCByb2xsdXApO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZUFuZFBlcnNpc3Qoc3VtbWFyeSk7XG4gICAgfVxuXG5cbiAgICBpbnRlcnJ1cHQoe3R5cGUsIHBhZ2VJZH06IFRlbGVtZXRyeUludGVycnVwdFJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaW50ZXJydXB0ID0gbmV3IFN1bmJpcmRUZWxlbWV0cnkuSW50ZXJydXB0KHR5cGUsIHBhZ2VJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQW5kUGVyc2lzdChpbnRlcnJ1cHQpO1xuICAgIH1cblxuICAgIGltcG9ydFRlbGVtZXRyeShpbXBvcnRUZWxlbWV0cnlSZXF1ZXN0OiBUZWxlbWV0cnlJbXBvcnRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGltcG9ydFRlbGVtZXRyeUNvbnRleHQ6IEltcG9ydFRlbGVtZXRyeUNvbnRleHQgPSB7XG4gICAgICAgICAgICBzb3VyY2VEQkZpbGVQYXRoOiBpbXBvcnRUZWxlbWV0cnlSZXF1ZXN0LnNvdXJjZUZpbGVQYXRoXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmcm9tKFxuICAgICAgICAgICAgbmV3IFZhbGlkYXRlVGVsZW1ldHJ5TWV0YWRhdGEodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0VGVsZW1ldHJ5Q29udGV4dCkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFuc3BvcnRQcm9jZXNzZWRUZWxlbWV0cnkodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVwZGF0ZUltcG9ydGVkVGVsZW1ldHJ5TWV0YWRhdGEodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVwZGF0ZUltcG9ydGVkVGVsZW1ldHJ5TWV0YWRhdGEodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlSW1wb3J0VGVsZW1ldHJ5U2hhcmUodGhpcy5kYlNlcnZpY2UsIHRoaXMpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFRlbGVtZXRyeVN0YXQoKTogT2JzZXJ2YWJsZTxUZWxlbWV0cnlTdGF0PiB7XG4gICAgICAgIGNvbnN0IHRlbGVtZXRyeUNvdW50UXVlcnkgPSBgXG4gICAgICAgICAgICBTRUxFQ1QgQ09VTlQoKikgYXMgVEVMRU1FVFJZX0NPVU5UXG4gICAgICAgICAgICBGUk9NICR7VGVsZW1ldHJ5RW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBwcm9jZXNzZWRUZWxlbWV0cnlDb3VudFF1ZXJ5ID0gYFxuICAgICAgICAgICAgU0VMRUNUIFNVTSgke1RlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LkNPTFVNTl9OQU1FX05VTUJFUl9PRl9FVkVOVFN9KSBhcyBQUk9DRVNTRURfVEVMRU1FVFJZX0NPVU5UXG4gICAgICAgICAgICBGUk9NICR7VGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZSh0ZWxlbWV0cnlDb3VudFF1ZXJ5KSxcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocHJvY2Vzc2VkVGVsZW1ldHJ5Q291bnRRdWVyeSksXG4gICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUuZ2V0VmFsdWUoVGVsZW1ldHJ5S2V5cy5LRVlfTEFTVF9TWU5DRURfVElNRV9TVEFNUClcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVsZW1ldHJ5Q291bnQ6IG51bWJlciA9IHJlc3VsdHNbMF1bMF1bJ1RFTEVNRVRSWV9DT1VOVCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZFRlbGVtZXRyeUNvdW50OiBudW1iZXIgPSByZXN1bHRzWzFdWzBdWydQUk9DRVNTRURfVEVMRU1FVFJZX0NPVU5UJ107XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFN5bmNlZFRpbWVzdGFtcDogbnVtYmVyID0gcmVzdWx0c1syXSA/IHBhcnNlSW50KHJlc3VsdHNbMl0hLCAxMCkgOiAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdW5TeW5jZWRFdmVudENvdW50OiB0ZWxlbWV0cnlDb3VudCArIHByb2Nlc3NlZFRlbGVtZXRyeUNvdW50LFxuICAgICAgICAgICAgICAgICAgICBsYXN0U3luY1RpbWU6IGxhc3RTeW5jZWRUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNldERldmljZVJlZ2lzdGVyVFRMKCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBuZXcgVGVsZW1ldHJ5U3luY0hhbmRsZXIoXG4gICAgICAgICAgICB0aGlzLmRiU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLFxuICAgICAgICAgICAgdGhpcy5kZXZpY2VJbmZvLFxuICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgICAgIHRoaXMuYXBwSW5mb1NlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmRldmljZVJlZ2lzdGVyU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSxcbiAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMubmV0d29ya1F1ZXVlXG4gICAgICAgICkucmVzZXREZXZpY2VSZWdpc3RlclRUTCgpO1xuICAgIH1cblxuICAgIHN5bmModGVsZW1ldHJ5U3luY1JlcXVlc3Q6IFRlbGVtZXRyeVN5bmNSZXF1ZXN0ID0ge1xuICAgICAgICBpZ25vcmVTeW5jVGhyZXNob2xkOiBmYWxzZSxcbiAgICAgICAgaWdub3JlQXV0b1N5bmNNb2RlOiBmYWxzZVxuICAgIH0pOiBPYnNlcnZhYmxlPFRlbGVtZXRyeVN5bmNTdGF0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ldHdvcmtJbmZvU2VydmljZS5uZXR3b3JrU3RhdHVzJC5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChuZXR3b3JrU3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldHdvcmtTdGF0dXMgPT09IE5ldHdvcmtTdGF0dXMuT05MSU5FKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbGVtZXRyeVN5bmNSZXF1ZXN0Lmlnbm9yZVN5bmNUaHJlc2hvbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvZih0ZWxlbWV0cnlTeW5jUmVxdWVzdCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUZWxlbWV0cnlTeW5jSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldmljZUluZm8sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwSW5mb1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlUmVnaXN0ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXR3b3JrUXVldWVcbiAgICAgICAgICAgICAgICApLmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICB0YXAoKHN5bmNTdGF0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN5bmNTdGF0LmVycm9yICYmIHN5bmNTdGF0LnN5bmNlZEV2ZW50Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKFRlbGVtZXRyeUtleXMuS0VZX0xBU1RfU1lOQ0VEX1RJTUVfU1RBTVAsIG5vdyArICcnKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U3luY2VkVGltZXN0YW1wJC5uZXh0KG5vdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbGFzdFN5bmNlZFRpbWVzdGFtcCgpOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdFN5bmNlZFRpbWVzdGFtcCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgYnVpbGRDb250ZXh0KCk6IE9ic2VydmFibGU8Q29udGV4dD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0b3IuYnVpbGRDb250ZXh0KFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uIS5zaWQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5hY3RpdmVDaGFubmVsSWQhLCBuZXcgQ29udGV4dCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWNvcmF0ZUFuZFBlcnNpc3QodGVsZW1ldHJ5OiBTdW5iaXJkVGVsZW1ldHJ5LlRlbGVtZXRyeSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLFxuICAgICAgICAgICAgdGhpcy5ncm91cFNlcnZpY2UuZ2V0QWN0aXZlR3JvdXBTZXNzaW9uKClcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHNlc3Npb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZVNlc3Npb246IFByb2ZpbGVTZXNzaW9uIHwgdW5kZWZpbmVkID0gc2Vzc2lvbnNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZXNzaW9uOiBHcm91cFNlc3Npb25EZXByZWNhdGVkIHwgdW5kZWZpbmVkID0gc2Vzc2lvbnNbMV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKFRlbGVtZXRyeVN5bmNIYW5kbGVyLlRFTEVNRVRSWV9MT0dfTUlOX0FMTE9XRURfT0ZGU0VUX0tFWSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKG9mZnNldD86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8ICcwJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0UXVlcnk6IEluc2VydFF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBUZWxlbWV0cnlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogdGhpcy5kZWNvcmF0b3IucHJlcGFyZSh0aGlzLmRlY29yYXRvci5kZWNvcmF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsZW1ldHJ5LCBwcm9maWxlU2Vzc2lvbiwgZ3JvdXBTZXNzaW9uICYmIGdyb3VwU2Vzc2lvbi5naWQsIE51bWJlcihvZmZzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2UuYWN0aXZlQ2hhbm5lbElkLCB0aGlzLmNhbXBhaWduUGFyYW1ldGVycywgdGhpcy5nbG9iYWxDZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydChpbnNlcnRRdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5ldmVudHNCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLlRFTEVNRVRSWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFRlbGVtZXRyeUV2ZW50VHlwZS5TQVZFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogdGVsZW1ldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChjb3VudCkgPT4gY291bnQgPiAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDYW1wYWlnblBhcmFtZXRlcnMocGFyYW1zOiBDb3JyZWxhdGlvbkRhdGFbXSkge1xuICAgICAgICB0aGlzLmNhbXBhaWduUGFyYW1ldGVycyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUdsb2JhbENvclJlbGF0aW9uRGF0YShwYXJhbXM6IENvcnJlbGF0aW9uRGF0YVtdKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2RhdGEgPSBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsVXRtUGFyYW1ldGVycygpOiBQcm9taXNlPENvcnJlbGF0aW9uRGF0YVtdPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxDb3JyZWxhdGlvbkRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzYnV0aWxpdHkuZ2V0VXRtSW5mbygocmVzcG9uc2U6IHsgdmFsOiBDb3JyZWxhdGlvbkRhdGFbXSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UudmFsKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHhjKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHhjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19