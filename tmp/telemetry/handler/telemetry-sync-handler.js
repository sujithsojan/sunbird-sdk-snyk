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
import { InteractSubType, InteractType, TelemetryAutoSyncModes } from '..';
import { StringToGzippedString } from '../impl/string-to-gzipped-string';
import { TelemetryEntriesToStringPreprocessor } from '../impl/telemetry-entries-to-string-preprocessor';
import { TelemetryEntry } from '../db/schema';
import { UniqueId } from '../../db/util/unique-id';
import dayjs from 'dayjs';
import { TelemetryLogger } from '../util/telemetry-logger';
import { CodePush, TelemetryKeys } from '../../preference-keys';
import { defer, of, zip } from 'rxjs';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { NetworkQueueType } from '../../api/network-queue';
import { NetworkRequestHandler } from '../../api/network-queue/handlers/network-request-handler';
var TelemetrySyncHandler = /** @class */ (function () {
    function TelemetrySyncHandler(dbService, sdkConfig, deviceInfo, sharedPreferences, appInfoService, deviceRegisterService, keyValueStore, apiService, networkQueue) {
        this.dbService = dbService;
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.sharedPreferences = sharedPreferences;
        this.appInfoService = appInfoService;
        this.deviceRegisterService = deviceRegisterService;
        this.keyValueStore = keyValueStore;
        this.apiService = apiService;
        this.networkQueue = networkQueue;
        this.preprocessors = [
            new TelemetryEntriesToStringPreprocessor(),
            new StringToGzippedString()
        ];
        this.telemetryConfig = this.sdkConfig.telemetryConfig;
        this.apiConfig = this.sdkConfig.apiConfig;
    }
    TelemetrySyncHandler.prototype.resetDeviceRegisterTTL = function () {
        return zip(this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_IS_SUCCESSFUL_KEY, ''), this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_ATTEMPT_TIME_STAMP_KEY, '')).pipe(mapTo(undefined));
    };
    TelemetrySyncHandler.prototype.handle = function (_a) {
        var _this = this;
        var ignoreSyncThreshold = _a.ignoreSyncThreshold, ignoreAutoSyncMode = _a.ignoreAutoSyncMode;
        var isForceSynced = !!(ignoreSyncThreshold && ignoreAutoSyncMode);
        return this.registerDevice().pipe(catchError(function () {
            ignoreSyncThreshold = true;
            return of(undefined);
        }), mergeMap(function () {
            return _this.hasTelemetryThresholdCrossed().pipe(mergeMap(function (hasTelemetryThresholdCrossed) {
                if (!hasTelemetryThresholdCrossed && !ignoreSyncThreshold) {
                    return of({
                        syncedEventCount: 0,
                        syncTime: Date.now(),
                        syncedFileSize: 0
                    });
                }
                return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                    var mode, currentSyncStat, eventCount, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.sharedPreferences.getString(TelemetryKeys.KEY_AUTO_SYNC_MODE).toPromise()];
                            case 1:
                                mode = _a.sent();
                                switch (mode) {
                                    case TelemetryAutoSyncModes.OFF:
                                        return [2 /*return*/, {
                                                syncedEventCount: 0,
                                                syncTime: Date.now(),
                                                syncedFileSize: 0,
                                                error: new Error('AUTO_SYNC_MODE: ' + TelemetryAutoSyncModes.OFF)
                                            }];
                                    case TelemetryAutoSyncModes.OVER_WIFI:
                                        if (navigator.connection.type !== Connection.WIFI) {
                                            return [2 /*return*/, {
                                                    syncedEventCount: 0,
                                                    syncTime: Date.now(),
                                                    syncedFileSize: 0,
                                                    error: new Error('AUTO_SYNC_MODE: ' + TelemetryAutoSyncModes.OVER_WIFI)
                                                }];
                                        }
                                        break;
                                    case TelemetryAutoSyncModes.ALWAYS_ON:
                                        break;
                                    default:
                                        break;
                                }
                                currentSyncStat = {
                                    syncedEventCount: 0,
                                    syncTime: Date.now(),
                                    syncedFileSize: 0
                                };
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, this.processEventsBatch(isForceSynced).toPromise()];
                            case 3:
                                eventCount = _a.sent();
                                currentSyncStat = {
                                    syncedEventCount: currentSyncStat.syncedEventCount + eventCount,
                                    syncTime: Date.now(),
                                    syncedFileSize: 0
                                };
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                currentSyncStat = {
                                    syncedEventCount: currentSyncStat.syncedEventCount,
                                    syncTime: Date.now(),
                                    syncedFileSize: 0,
                                    error: e_1
                                };
                                return [3 /*break*/, 5];
                            case 5:
                                if (eventCount && !currentSyncStat.error) return [3 /*break*/, 2];
                                _a.label = 6;
                            case 6: return [2 /*return*/, currentSyncStat];
                        }
                    });
                }); });
            }));
        }));
    };
    TelemetrySyncHandler.prototype.processEventsBatch = function (isForceSynced) {
        var _this = this;
        return this.fetchEvents().pipe(mergeMap(function (events) {
            return _this.processEvents(events).pipe(mergeMap(function (processedEventsMeta) {
                return _this.persistinNetworkQueue(processedEventsMeta, processedEventsMeta.processedEventsSize, isForceSynced).pipe(mergeMap(function () { return _this.deleteEvents(events); }), mapTo(events.length));
            }));
        }));
    };
    TelemetrySyncHandler.prototype.registerDevice = function () {
        var _this = this;
        return zip(this.keyValueStore.getValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_ATTEMPT_TIME_STAMP_KEY), this.keyValueStore.getValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_IS_SUCCESSFUL_KEY)).pipe(mergeMap(function (results) {
            var lastSyncDeviceRegisterAttemptTimestamp = results[0];
            var lastSyncDeviceRegisterIsSuccessful = results[1];
            if (lastSyncDeviceRegisterAttemptTimestamp && lastSyncDeviceRegisterIsSuccessful) {
                var offset = lastSyncDeviceRegisterIsSuccessful === 'false' ?
                    TelemetrySyncHandler.REGISTER_API_FAILURE_TTL : TelemetrySyncHandler.REGISTER_API_SUCCESS_TTL;
                if (Math.abs(parseInt(lastSyncDeviceRegisterAttemptTimestamp, 10) - Date.now()) < offset) {
                    return of(undefined);
                }
            }
            return _this.deviceRegisterService.registerDevice().pipe(tap(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var actions, serverTime, now, currentOffset, allowedOffset;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            actions = res.result.actions;
                            actions.forEach(function (element) {
                                if (element.type === 'experiment' && element.key) {
                                    _this.sharedPreferences.putString(CodePush.DEPLOYMENT_KEY, element.data.key).toPromise();
                                }
                            });
                            serverTime = new Date(res.ts).getTime();
                            now = Date.now();
                            currentOffset = serverTime - now;
                            allowedOffset = Math.abs(currentOffset) > this.telemetryConfig.telemetryLogMinAllowedOffset ? currentOffset : 0;
                            if (!allowedOffset) return [3 /*break*/, 3];
                            return [4 /*yield*/, TelemetryLogger.log.interact({
                                    type: InteractType.OTHER,
                                    subType: InteractSubType.DEVICE_TIME_OFFSET_FOUND,
                                    env: 'sdk',
                                    pageId: 'sdk',
                                    id: 'sdk',
                                    valueMap: {
                                        deviceTime: now,
                                        offsetTime: allowedOffset
                                    }
                                }).toPromise()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.keyValueStore
                                    .setValue(TelemetrySyncHandler.TELEMETRY_LOG_MIN_ALLOWED_OFFSET_KEY, allowedOffset + '').toPromise()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }), mergeMap(function () {
                return zip(_this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_ATTEMPT_TIME_STAMP_KEY, Date.now() + ''), _this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_IS_SUCCESSFUL_KEY, 'true')).pipe(mapTo(undefined));
            }), catchError(function (e) {
                return zip(_this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_ATTEMPT_TIME_STAMP_KEY, Date.now() + ''), _this.keyValueStore.setValue(TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_IS_SUCCESSFUL_KEY, 'false')).pipe(mergeMap(function () {
                    console.error(e);
                    throw new Error('Device Registration Failed');
                }));
            }));
        }));
    };
    TelemetrySyncHandler.prototype.hasTelemetryThresholdCrossed = function () {
        var _this = this;
        return this.dbService.execute("\n            SELECT count(*) as COUNT FROM " + TelemetryEntry.TABLE_NAME).pipe(map(function (result) {
            if (result && result[0] && (result[0]['COUNT'] >= _this.telemetryConfig.telemetrySyncThreshold)) {
                return true;
            }
            else {
                return false;
            }
        }));
    };
    TelemetrySyncHandler.prototype.fetchEvents = function () {
        return this.dbService.execute("\n            SELECT * FROM " + TelemetryEntry.TABLE_NAME + "\n            WHERE " + TelemetryEntry.COLUMN_NAME_PRIORITY + " = (SELECT MIN (" + TelemetryEntry.COLUMN_NAME_PRIORITY + ")\n            FROM " + TelemetryEntry.TABLE_NAME + ")\n            ORDER BY " + TelemetryEntry.COLUMN_NAME_TIMESTAMP + "\n            LIMIT " + this.telemetryConfig.telemetrySyncBandwidth);
    };
    TelemetrySyncHandler.prototype.processEvents = function (events) {
        if (!events.length) {
            return of({
                processedEventsSize: 0
            });
        }
        var messageId = UniqueId.generateUniqueId();
        return of({
            processedEvents: this.preprocessors.reduce(function (acc, current) {
                return current.process(acc);
            }, {
                id: 'ekstep.telemetry',
                ver: '1.0',
                ts: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
                events: events.map(function (e) { return JSON.parse(e[TelemetryEntry.COLUMN_NAME_EVENT]); }),
                params: {
                    did: this.deviceInfo.getDeviceID(),
                    msgid: messageId,
                    key: '',
                    requesterId: ''
                }
            }),
            processedEventsSize: events.length,
            messageId: messageId
        });
    };
    TelemetrySyncHandler.prototype.persistinNetworkQueue = function (_a, eventsCount, isForceSynced) {
        var processedEvents = _a.processedEvents, messageId = _a.messageId;
        if (!processedEvents) {
            return of(undefined);
        }
        return this.networkQueue.enqueue(new NetworkRequestHandler(this.sdkConfig).generateNetworkQueueRequest(NetworkQueueType.TELEMETRY, processedEvents, messageId, eventsCount, isForceSynced), true).pipe(mapTo(undefined));
    };
    TelemetrySyncHandler.prototype.deleteEvents = function (events) {
        if (!events.length) {
            return of(undefined);
        }
        return this.dbService.execute("\n            DELETE FROM " + TelemetryEntry.TABLE_NAME + "\n            WHERE " + TelemetryEntry._ID + " IN (" + events.map(function (event) { return event[TelemetryEntry._ID]; }).join(',') + ")\n        ");
    };
    TelemetrySyncHandler.TELEMETRY_LOG_MIN_ALLOWED_OFFSET_KEY = 'telemetry_log_min_allowed_offset_key';
    TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_ATTEMPT_TIME_STAMP_KEY = 'last_synced_device_register_attempt_time_stamp';
    TelemetrySyncHandler.LAST_SYNCED_DEVICE_REGISTER_IS_SUCCESSFUL_KEY = 'last_synced_device_register_is_successful';
    TelemetrySyncHandler.TELEMETRY_ENDPOINT = '/telemetry';
    TelemetrySyncHandler.REGISTER_API_SUCCESS_TTL = 24 * 60 * 60 * 1000;
    TelemetrySyncHandler.REGISTER_API_FAILURE_TTL = 60 * 60 * 1000;
    return TelemetrySyncHandler;
}());
export { TelemetrySyncHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LXN5bmMtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZWxlbWV0cnkvaGFuZGxlci90ZWxlbWV0cnktc3luYy1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUEwQyxNQUFNLElBQUksQ0FBQztBQUVsSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUt0RyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBR3pELE9BQU8sRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHOUQsT0FBTyxFQUFDLEtBQUssRUFBYyxFQUFFLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDckUsT0FBTyxFQUFlLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMERBQTBELENBQUM7QUFRL0Y7SUFjRSw4QkFDVSxTQUFvQixFQUNwQixTQUFvQixFQUNwQixVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsY0FBdUIsRUFDdkIscUJBQTRDLEVBQzVDLGFBQTZCLEVBQzdCLFVBQXVC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LENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLCtCQUNSLGNBQWMsQ0FBQyxVQUFVLDRCQUMvQixjQUFjLENBQUMsR0FBRyxhQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFDL0YsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXJSc0IseURBQW9DLEdBQUcsc0NBQXNDLENBQUM7SUFFN0UsdUVBQWtELEdBQUcsZ0RBQWdELENBQUM7SUFDdEcsa0VBQTZDLEdBQUcsMkNBQTJDLENBQUM7SUFDN0YsdUNBQWtCLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLDZDQUF3QixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUMvQyw2Q0FBd0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQWdScEUsMkJBQUM7Q0FBQSxBQXhSRCxJQXdSQztTQXhSWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaUNvbmZpZywgQXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2V9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge0ludGVyYWN0U3ViVHlwZSwgSW50ZXJhY3RUeXBlLCBUZWxlbWV0cnlBdXRvU3luY01vZGVzLCBUZWxlbWV0cnlTeW5jUmVxdWVzdCwgVGVsZW1ldHJ5U3luY1N0YXR9IGZyb20gJy4uJztcbmltcG9ydCB7VGVsZW1ldHJ5U3luY1ByZXByb2Nlc3Nvcn0gZnJvbSAnLi4vZGVmL3RlbGVtZXRyeS1zeW5jLXByZXByb2Nlc3Nvcic7XG5pbXBvcnQge1N0cmluZ1RvR3ppcHBlZFN0cmluZ30gZnJvbSAnLi4vaW1wbC9zdHJpbmctdG8tZ3ppcHBlZC1zdHJpbmcnO1xuaW1wb3J0IHtUZWxlbWV0cnlFbnRyaWVzVG9TdHJpbmdQcmVwcm9jZXNzb3J9IGZyb20gJy4uL2ltcGwvdGVsZW1ldHJ5LWVudHJpZXMtdG8tc3RyaW5nLXByZXByb2Nlc3Nvcic7XG5pbXBvcnQge0tleVZhbHVlU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge1RlbGVtZXRyeUVudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtVbmlxdWVJZH0gZnJvbSAnLi4vLi4vZGIvdXRpbC91bmlxdWUtaWQnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7VGVsZW1ldHJ5TG9nZ2VyfSBmcm9tICcuLi91dGlsL3RlbGVtZXRyeS1sb2dnZXInO1xuaW1wb3J0IHtUZWxlbWV0cnlDb25maWd9IGZyb20gJy4uL2NvbmZpZy90ZWxlbWV0cnktY29uZmlnJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7Q29kZVB1c2gsIFRlbGVtZXRyeUtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge0FwcEluZm99IGZyb20gJy4uLy4uL3V0aWwvYXBwJztcbmltcG9ydCB7RGV2aWNlUmVnaXN0ZXJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kZXZpY2UtcmVnaXN0ZXInO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgb2YsIHppcH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlLCBOZXR3b3JrUXVldWVUeXBlfSBmcm9tICcuLi8uLi9hcGkvbmV0d29yay1xdWV1ZSc7XG5pbXBvcnQge05ldHdvcmtSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vLi4vYXBpL25ldHdvcmstcXVldWUvaGFuZGxlcnMvbmV0d29yay1yZXF1ZXN0LWhhbmRsZXInO1xuXG5pbnRlcmZhY2UgUHJvY2Vzc2VkRXZlbnRzTWV0YSB7XG4gIHByb2Nlc3NlZEV2ZW50cz86IHN0cmluZztcbiAgcHJvY2Vzc2VkRXZlbnRzU2l6ZTogbnVtYmVyO1xuICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBUZWxlbWV0cnlTeW5jSGFuZGxlciBpbXBsZW1lbnRzIEFwaVJlcXVlc3RIYW5kbGVyPFRlbGVtZXRyeVN5bmNSZXF1ZXN0LCBUZWxlbWV0cnlTeW5jU3RhdD4ge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVEVMRU1FVFJZX0xPR19NSU5fQUxMT1dFRF9PRkZTRVRfS0VZID0gJ3RlbGVtZXRyeV9sb2dfbWluX2FsbG93ZWRfb2Zmc2V0X2tleSc7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTEFTVF9TWU5DRURfREVWSUNFX1JFR0lTVEVSX0FUVEVNUFRfVElNRV9TVEFNUF9LRVkgPSAnbGFzdF9zeW5jZWRfZGV2aWNlX3JlZ2lzdGVyX2F0dGVtcHRfdGltZV9zdGFtcCc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IExBU1RfU1lOQ0VEX0RFVklDRV9SRUdJU1RFUl9JU19TVUNDRVNTRlVMX0tFWSA9ICdsYXN0X3N5bmNlZF9kZXZpY2VfcmVnaXN0ZXJfaXNfc3VjY2Vzc2Z1bCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVEVMRU1FVFJZX0VORFBPSU5UID0gJy90ZWxlbWV0cnknO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBSRUdJU1RFUl9BUElfU1VDQ0VTU19UVEwgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBSRUdJU1RFUl9BUElfRkFJTFVSRV9UVEwgPSA2MCAqIDYwICogMTAwMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHByZXByb2Nlc3NvcnM6IFRlbGVtZXRyeVN5bmNQcmVwcm9jZXNzb3JbXTtcbiAgcHJpdmF0ZSByZWFkb25seSB0ZWxlbWV0cnlDb25maWc6IFRlbGVtZXRyeUNvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBhcGlDb25maWc6IEFwaUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgIHByaXZhdGUgYXBwSW5mb1NlcnZpY2U6IEFwcEluZm8sXG4gICAgcHJpdmF0ZSBkZXZpY2VSZWdpc3RlclNlcnZpY2U6IERldmljZVJlZ2lzdGVyU2VydmljZSxcbiAgICBwcml2YXRlIGtleVZhbHVlU3RvcmU/OiBLZXlWYWx1ZVN0b3JlLFxuICAgIHByaXZhdGUgYXBpU2VydmljZT86IEFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZXR3b3JrUXVldWU/OiBOZXR3b3JrUXVldWVcbiAgKSB7XG4gICAgdGhpcy5wcmVwcm9jZXNzb3JzID0gW1xuICAgICAgbmV3IFRlbGVtZXRyeUVudHJpZXNUb1N0cmluZ1ByZXByb2Nlc3NvcigpLFxuICAgICAgbmV3IFN0cmluZ1RvR3ppcHBlZFN0cmluZygpXG4gICAgXTtcbiAgICB0aGlzLnRlbGVtZXRyeUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLnRlbGVtZXRyeUNvbmZpZztcbiAgICB0aGlzLmFwaUNvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZztcbiAgfVxuXG4gIHJlc2V0RGV2aWNlUmVnaXN0ZXJUVEwoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gemlwKFxuICAgICAgdGhpcy5rZXlWYWx1ZVN0b3JlIS5zZXRWYWx1ZShUZWxlbWV0cnlTeW5jSGFuZGxlci5MQVNUX1NZTkNFRF9ERVZJQ0VfUkVHSVNURVJfSVNfU1VDQ0VTU0ZVTF9LRVksICcnKSxcbiAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSEuc2V0VmFsdWUoVGVsZW1ldHJ5U3luY0hhbmRsZXIuTEFTVF9TWU5DRURfREVWSUNFX1JFR0lTVEVSX0FUVEVNUFRfVElNRV9TVEFNUF9LRVksICcnKVxuICAgICkucGlwZShcbiAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlKHtpZ25vcmVTeW5jVGhyZXNob2xkLCBpZ25vcmVBdXRvU3luY01vZGV9OiBUZWxlbWV0cnlTeW5jUmVxdWVzdCk6IE9ic2VydmFibGU8VGVsZW1ldHJ5U3luY1N0YXQ+IHtcbiAgICBjb25zdCBpc0ZvcmNlU3luY2VkOiBib29sZWFuID0gISEoaWdub3JlU3luY1RocmVzaG9sZCAmJiBpZ25vcmVBdXRvU3luY01vZGUpO1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyRGV2aWNlKCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICBpZ25vcmVTeW5jVGhyZXNob2xkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVGVsZW1ldHJ5VGhyZXNob2xkQ3Jvc3NlZCgpLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAoKGhhc1RlbGVtZXRyeVRocmVzaG9sZENyb3NzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmICghaGFzVGVsZW1ldHJ5VGhyZXNob2xkQ3Jvc3NlZCAmJiAhaWdub3JlU3luY1RocmVzaG9sZCkge1xuICAgICAgICAgICAgICByZXR1cm4gb2Yoe1xuICAgICAgICAgICAgICAgIHN5bmNlZEV2ZW50Q291bnQ6IDAsXG4gICAgICAgICAgICAgICAgc3luY1RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgc3luY2VkRmlsZVNpemU6IDBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtb2RlID0gYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoVGVsZW1ldHJ5S2V5cy5LRVlfQVVUT19TWU5DX01PREUpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFRlbGVtZXRyeUF1dG9TeW5jTW9kZXMuT0ZGOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3luY2VkRXZlbnRDb3VudDogMCxcbiAgICAgICAgICAgICAgICAgICAgc3luY1RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgIHN5bmNlZEZpbGVTaXplOiAwLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdBVVRPX1NZTkNfTU9ERTogJyArIFRlbGVtZXRyeUF1dG9TeW5jTW9kZXMuT0ZGKVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjYXNlIFRlbGVtZXRyeUF1dG9TeW5jTW9kZXMuT1ZFUl9XSUZJOlxuICAgICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGUgIT09IENvbm5lY3Rpb24uV0lGSSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgIHN5bmNlZEV2ZW50Q291bnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgc3luY1RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgc3luY2VkRmlsZVNpemU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG5ldyBFcnJvcignQVVUT19TWU5DX01PREU6ICcgKyBUZWxlbWV0cnlBdXRvU3luY01vZGVzLk9WRVJfV0lGSSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVGVsZW1ldHJ5QXV0b1N5bmNNb2Rlcy5BTFdBWVNfT046XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTeW5jU3RhdDogVGVsZW1ldHJ5U3luY1N0YXQgPSB7XG4gICAgICAgICAgICAgICAgc3luY2VkRXZlbnRDb3VudDogMCxcbiAgICAgICAgICAgICAgICBzeW5jVGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBzeW5jZWRGaWxlU2l6ZTogMFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBsZXQgZXZlbnRDb3VudDtcbiAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBldmVudENvdW50ID0gYXdhaXQgdGhpcy5wcm9jZXNzRXZlbnRzQmF0Y2goaXNGb3JjZVN5bmNlZCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50U3luY1N0YXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmNlZEV2ZW50Q291bnQ6IGN1cnJlbnRTeW5jU3RhdC5zeW5jZWRFdmVudENvdW50ICsgZXZlbnRDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgc3luY1RpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgIHN5bmNlZEZpbGVTaXplOiAwXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW5jU3RhdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3luY2VkRXZlbnRDb3VudDogY3VycmVudFN5bmNTdGF0LnN5bmNlZEV2ZW50Q291bnQsXG4gICAgICAgICAgICAgICAgICAgIHN5bmNUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBzeW5jZWRGaWxlU2l6ZTogMCxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IHdoaWxlIChldmVudENvdW50ICYmICFjdXJyZW50U3luY1N0YXQuZXJyb3IpO1xuICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFN5bmNTdGF0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwcm9jZXNzRXZlbnRzQmF0Y2goaXNGb3JjZVN5bmNlZDogYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hFdmVudHMoKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKGV2ZW50cykgPT5cbiAgICAgICAgdGhpcy5wcm9jZXNzRXZlbnRzKGV2ZW50cykucGlwZShcbiAgICAgICAgICBtZXJnZU1hcCgocHJvY2Vzc2VkRXZlbnRzTWV0YSkgPT5cbiAgICAgICAgICAgIHRoaXMucGVyc2lzdGluTmV0d29ya1F1ZXVlKHByb2Nlc3NlZEV2ZW50c01ldGEsIHByb2Nlc3NlZEV2ZW50c01ldGEucHJvY2Vzc2VkRXZlbnRzU2l6ZSwgaXNGb3JjZVN5bmNlZCkucGlwZShcbiAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5kZWxldGVFdmVudHMoZXZlbnRzKSksXG4gICAgICAgICAgICAgIG1hcFRvKGV2ZW50cy5sZW5ndGgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJEZXZpY2UoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gemlwKFxuICAgICAgdGhpcy5rZXlWYWx1ZVN0b3JlIS5nZXRWYWx1ZShUZWxlbWV0cnlTeW5jSGFuZGxlci5MQVNUX1NZTkNFRF9ERVZJQ0VfUkVHSVNURVJfQVRURU1QVF9USU1FX1NUQU1QX0tFWSksXG4gICAgICB0aGlzLmtleVZhbHVlU3RvcmUhLmdldFZhbHVlKFRlbGVtZXRyeVN5bmNIYW5kbGVyLkxBU1RfU1lOQ0VEX0RFVklDRV9SRUdJU1RFUl9JU19TVUNDRVNTRlVMX0tFWSksXG4gICAgKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKHJlc3VsdHM6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBsYXN0U3luY0RldmljZVJlZ2lzdGVyQXR0ZW1wdFRpbWVzdGFtcCA9IHJlc3VsdHNbMF07XG4gICAgICAgIGNvbnN0IGxhc3RTeW5jRGV2aWNlUmVnaXN0ZXJJc1N1Y2Nlc3NmdWwgPSByZXN1bHRzWzFdO1xuXG4gICAgICAgIGlmIChsYXN0U3luY0RldmljZVJlZ2lzdGVyQXR0ZW1wdFRpbWVzdGFtcCAmJiBsYXN0U3luY0RldmljZVJlZ2lzdGVySXNTdWNjZXNzZnVsKSB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbGFzdFN5bmNEZXZpY2VSZWdpc3RlcklzU3VjY2Vzc2Z1bCA9PT0gJ2ZhbHNlJyA/XG4gICAgICAgICAgICBUZWxlbWV0cnlTeW5jSGFuZGxlci5SRUdJU1RFUl9BUElfRkFJTFVSRV9UVEwgOiBUZWxlbWV0cnlTeW5jSGFuZGxlci5SRUdJU1RFUl9BUElfU1VDQ0VTU19UVEw7XG5cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGFyc2VJbnQobGFzdFN5bmNEZXZpY2VSZWdpc3RlckF0dGVtcHRUaW1lc3RhbXAsIDEwKSAtIERhdGUubm93KCkpIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2VSZWdpc3RlclNlcnZpY2UucmVnaXN0ZXJEZXZpY2UoKS5waXBlKFxuICAgICAgICAgIHRhcChhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gcmVzLnJlc3VsdC5hY3Rpb25zO1xuICAgICAgICAgICAgYWN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09PSAnZXhwZXJpbWVudCcgJiYgZWxlbWVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhDb2RlUHVzaC5ERVBMT1lNRU5UX0tFWSxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YS5rZXkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlclRpbWUgPSBuZXcgRGF0ZShyZXMudHMpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gc2VydmVyVGltZSAtIG5vdztcbiAgICAgICAgICAgIGNvbnN0IGFsbG93ZWRPZmZzZXQgPVxuICAgICAgICAgICAgICBNYXRoLmFicyhjdXJyZW50T2Zmc2V0KSA+IHRoaXMudGVsZW1ldHJ5Q29uZmlnLnRlbGVtZXRyeUxvZ01pbkFsbG93ZWRPZmZzZXQgPyBjdXJyZW50T2Zmc2V0IDogMDtcbiAgICAgICAgICAgIGlmIChhbGxvd2VkT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIGF3YWl0IFRlbGVtZXRyeUxvZ2dlci5sb2cuaW50ZXJhY3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6IEludGVyYWN0VHlwZS5PVEhFUixcbiAgICAgICAgICAgICAgICBzdWJUeXBlOiBJbnRlcmFjdFN1YlR5cGUuREVWSUNFX1RJTUVfT0ZGU0VUX0ZPVU5ELFxuICAgICAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICAgICAgcGFnZUlkOiAnc2RrJyxcbiAgICAgICAgICAgICAgICBpZDogJ3NkaycsXG4gICAgICAgICAgICAgICAgdmFsdWVNYXA6IHtcbiAgICAgICAgICAgICAgICAgIGRldmljZVRpbWU6IG5vdyxcbiAgICAgICAgICAgICAgICAgIG9mZnNldFRpbWU6IGFsbG93ZWRPZmZzZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmtleVZhbHVlU3RvcmUhXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKFRlbGVtZXRyeVN5bmNIYW5kbGVyLlRFTEVNRVRSWV9MT0dfTUlOX0FMTE9XRURfT0ZGU0VUX0tFWSwgYWxsb3dlZE9mZnNldCArICcnKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUhLnNldFZhbHVlKFRlbGVtZXRyeVN5bmNIYW5kbGVyLkxBU1RfU1lOQ0VEX0RFVklDRV9SRUdJU1RFUl9BVFRFTVBUX1RJTUVfU1RBTVBfS0VZLFxuICAgICAgICAgICAgICAgIERhdGUubm93KCkgKyAnJyksXG4gICAgICAgICAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSEuc2V0VmFsdWUoVGVsZW1ldHJ5U3luY0hhbmRsZXIuTEFTVF9TWU5DRURfREVWSUNFX1JFR0lTVEVSX0lTX1NVQ0NFU1NGVUxfS0VZLFxuICAgICAgICAgICAgICAgICd0cnVlJylcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUhLnNldFZhbHVlKFRlbGVtZXRyeVN5bmNIYW5kbGVyLkxBU1RfU1lOQ0VEX0RFVklDRV9SRUdJU1RFUl9BVFRFTVBUX1RJTUVfU1RBTVBfS0VZLFxuICAgICAgICAgICAgICAgIERhdGUubm93KCkgKyAnJyksXG4gICAgICAgICAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSEuc2V0VmFsdWUoVGVsZW1ldHJ5U3luY0hhbmRsZXIuTEFTVF9TWU5DRURfREVWSUNFX1JFR0lTVEVSX0lTX1NVQ0NFU1NGVUxfS0VZLFxuICAgICAgICAgICAgICAgICdmYWxzZScpXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGV2aWNlIFJlZ2lzdHJhdGlvbiBGYWlsZWQnKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzVGVsZW1ldHJ5VGhyZXNob2xkQ3Jvc3NlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShgXG4gICAgICAgICAgICBTRUxFQ1QgY291bnQoKikgYXMgQ09VTlQgRlJPTSAke1RlbGVtZXRyeUVudHJ5LlRBQkxFX05BTUV9YFxuICAgICkucGlwZShcbiAgICAgIG1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0WzBdICYmIChyZXN1bHRbMF1bJ0NPVU5UJ10gPj0gdGhpcy50ZWxlbWV0cnlDb25maWcudGVsZW1ldHJ5U3luY1RocmVzaG9sZCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hFdmVudHMoKTogT2JzZXJ2YWJsZTxUZWxlbWV0cnlFbnRyeS5TY2hlbWFNYXBbXT4ge1xuICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKGBcbiAgICAgICAgICAgIFNFTEVDVCAqIEZST00gJHtUZWxlbWV0cnlFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgV0hFUkUgJHtUZWxlbWV0cnlFbnRyeS5DT0xVTU5fTkFNRV9QUklPUklUWX0gPSAoU0VMRUNUIE1JTiAoJHtUZWxlbWV0cnlFbnRyeS5DT0xVTU5fTkFNRV9QUklPUklUWX0pXG4gICAgICAgICAgICBGUk9NICR7VGVsZW1ldHJ5RW50cnkuVEFCTEVfTkFNRX0pXG4gICAgICAgICAgICBPUkRFUiBCWSAke1RlbGVtZXRyeUVudHJ5LkNPTFVNTl9OQU1FX1RJTUVTVEFNUH1cbiAgICAgICAgICAgIExJTUlUICR7dGhpcy50ZWxlbWV0cnlDb25maWcudGVsZW1ldHJ5U3luY0JhbmR3aWR0aH1gXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0V2ZW50cyhldmVudHM6IFRlbGVtZXRyeUVudHJ5LlNjaGVtYU1hcFtdKTogT2JzZXJ2YWJsZTxQcm9jZXNzZWRFdmVudHNNZXRhPiB7XG4gICAgaWYgKCFldmVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb2Yoe1xuICAgICAgICBwcm9jZXNzZWRFdmVudHNTaXplOiAwXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlSWQgPSBVbmlxdWVJZC5nZW5lcmF0ZVVuaXF1ZUlkKCk7XG4gICAgcmV0dXJuIG9mKHtcbiAgICAgIHByb2Nlc3NlZEV2ZW50czogdGhpcy5wcmVwcm9jZXNzb3JzLnJlZHVjZTxhbnk+KChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQucHJvY2VzcyhhY2MpO1xuICAgICAgfSwge1xuICAgICAgICBpZDogJ2Vrc3RlcC50ZWxlbWV0cnknLFxuICAgICAgICB2ZXI6ICcxLjAnLFxuICAgICAgICB0czogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nKSxcbiAgICAgICAgZXZlbnRzOiBldmVudHMubWFwKChlKSA9PiBKU09OLnBhcnNlKGVbVGVsZW1ldHJ5RW50cnkuQ09MVU1OX05BTUVfRVZFTlRdKSksXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRpZDogdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCksXG4gICAgICAgICAgbXNnaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgIHJlcXVlc3RlcklkOiAnJ1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHByb2Nlc3NlZEV2ZW50c1NpemU6IGV2ZW50cy5sZW5ndGgsXG4gICAgICBtZXNzYWdlSWRcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyc2lzdGluTmV0d29ya1F1ZXVlKHtwcm9jZXNzZWRFdmVudHMsIG1lc3NhZ2VJZH06IFByb2Nlc3NlZEV2ZW50c01ldGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c0NvdW50OiBudW1iZXIsIGlzRm9yY2VTeW5jZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgIGlmICghcHJvY2Vzc2VkRXZlbnRzKSB7XG4gICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZXR3b3JrUXVldWUhLmVucXVldWUobmV3IE5ldHdvcmtSZXF1ZXN0SGFuZGxlcih0aGlzLnNka0NvbmZpZykuZ2VuZXJhdGVOZXR3b3JrUXVldWVSZXF1ZXN0KFxuICAgICAgTmV0d29ya1F1ZXVlVHlwZS5URUxFTUVUUlksIHByb2Nlc3NlZEV2ZW50cywgbWVzc2FnZUlkLCBldmVudHNDb3VudCwgaXNGb3JjZVN5bmNlZCksIHRydWUpLnBpcGUoXG4gICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVsZXRlRXZlbnRzKGV2ZW50czogVGVsZW1ldHJ5RW50cnkuU2NoZW1hTWFwW10pOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgIGlmICghZXZlbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYFxuICAgICAgICAgICAgREVMRVRFIEZST00gJHtUZWxlbWV0cnlFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgV0hFUkUgJHtUZWxlbWV0cnlFbnRyeS5fSUR9IElOICgke2V2ZW50cy5tYXAoKGV2ZW50KSA9PiBldmVudFtUZWxlbWV0cnlFbnRyeS5fSURdKS5qb2luKCcsJyl9KVxuICAgICAgICBgKTtcbiAgfVxufVxuIl19