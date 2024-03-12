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
import { DownloadEventType, DownloadStatus } from '..';
import { BehaviorSubject, defer, EMPTY, from, iif, interval, Observable, of, zip } from 'rxjs';
import { EventNamespace } from '../../../events-bus';
import Set from 'typescript-collections/dist/lib/Set';
import * as downloadManagerInstance from 'cordova-plugin-android-downloadmanager';
import { DownloadKeys } from '../../../preference-keys';
import { TelemetryLogger } from '../../../telemetry/util/telemetry-logger';
import { InteractSubType, InteractType } from '../../../telemetry';
import { SharedPreferencesSetCollectionImpl } from '../../shared-preferences/impl/shared-preferences-set-collection-impl';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../../injection-tokens';
import { catchError, concatMapTo, distinctUntilChanged, mapTo, mergeMap, switchMap, take, tap, map } from 'rxjs/operators';
import { ContentUtil } from '../../../content/util/content-util';
var DownloadServiceImpl = /** @class */ (function () {
    function DownloadServiceImpl(eventsBusService, sharedPreferences) {
        this.eventsBusService = eventsBusService;
        this.sharedPreferences = sharedPreferences;
        this.currentDownloadRequest$ = new BehaviorSubject(undefined);
        this.completedDownloadRequestsCache = new Set(function (r) { return r.identifier; });
        window['downloadManager'] = downloadManagerInstance;
        this.sharedPreferencesSetCollection = new SharedPreferencesSetCollectionImpl(this.sharedPreferences, DownloadServiceImpl_1.KEY_TO_DOWNLOAD_LIST, function (item) { return item.identifier; });
    }
    DownloadServiceImpl_1 = DownloadServiceImpl;
    DownloadServiceImpl.generateDownloadStartTelemetry = function (downloadRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, TelemetryLogger.log.interact({
                        type: InteractType.OTHER,
                        subType: InteractSubType.CONTENT_DOWNLOAD_INITIATE,
                        env: 'sdk',
                        pageId: 'ContentDetail',
                        id: 'ContentDetail',
                        objId: downloadRequest.identifier,
                        objType: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['primaryCategory'] ?
                            ContentUtil.readPrimaryCategoryServer(downloadRequest['contentMeta']) : 'Content',
                        objVer: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['pkgVersion'] ?
                            downloadRequest['contentMeta']['pkgVersion'] : '',
                        correlationData: downloadRequest['correlationData'] || []
                    }).pipe(mapTo(undefined)).toPromise()];
            });
        });
    };
    DownloadServiceImpl.generateDownloadCompleteTelemetry = function (downloadRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, TelemetryLogger.log.interact({
                        type: InteractType.OTHER,
                        subType: InteractSubType.CONTENT_DOWNLOAD_SUCCESS,
                        env: 'sdk',
                        pageId: 'ContentDetail',
                        id: 'ContentDetail',
                        objId: downloadRequest.identifier,
                        objType: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['primaryCategory'] ?
                            ContentUtil.readPrimaryCategoryServer(downloadRequest['contentMeta']) : 'Content',
                        objVer: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['pkgVersion'] ?
                            downloadRequest['contentMeta']['pkgVersion'] : '',
                        correlationData: downloadRequest['correlationData'] || []
                    }).pipe(mapTo(undefined)).toPromise()];
            });
        });
    };
    DownloadServiceImpl.generateDownloadCancelTelemetry = function (downloadRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, TelemetryLogger.log.interact({
                        type: InteractType.OTHER,
                        subType: InteractSubType.CONTENT_DOWNLOAD_CANCEL,
                        env: 'sdk',
                        pageId: 'ContentDetail',
                        id: 'ContentDetail',
                        objId: downloadRequest.identifier,
                        objType: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['primaryCategory'] ?
                            ContentUtil.readPrimaryCategoryServer(downloadRequest['contentMeta']) : 'Content',
                        objVer: downloadRequest['contentMeta'] && downloadRequest['contentMeta']['pkgVersion'] ?
                            downloadRequest['contentMeta']['pkgVersion'] : '',
                        correlationData: downloadRequest['correlationData'] || []
                    }).pipe(mapTo(undefined)).toPromise()];
            });
        });
    };
    DownloadServiceImpl.prototype.onInit = function () {
        var _this = this;
        return this.switchToNextDownloadRequest()
            .pipe(mergeMap(function () {
            return _this.listenForDownloadProgressChanges();
        }));
    };
    DownloadServiceImpl.prototype.download = function (downloadRequests) {
        var _this = this;
        return this.currentDownloadRequest$
            .pipe(take(1), mergeMap(function (currentDownloadRequest) {
            if (currentDownloadRequest) {
                return _this.addToDownloadList(downloadRequests);
            }
            return _this.addToDownloadList(downloadRequests)
                .pipe(tap(function () { return _this.switchToNextDownloadRequest().toPromise(); }));
        }));
    };
    DownloadServiceImpl.prototype.cancel = function (downloadCancelRequest, generateTelemetry) {
        var _this = this;
        if (generateTelemetry === void 0) { generateTelemetry = true; }
        return this.currentDownloadRequest$
            .pipe(take(1), mergeMap(function (currentDownloadRequest) {
            if (currentDownloadRequest && currentDownloadRequest.identifier === downloadCancelRequest.identifier) {
                return new Observable(function (observer) {
                    downloadManager.remove([currentDownloadRequest.downloadId], function (err, removeCount) {
                        if (err) {
                            observer.error(err);
                        }
                        observer.next(!!removeCount);
                        observer.complete();
                    });
                }).pipe(mergeMap(function () { return _this.removeFromDownloadList(downloadCancelRequest, generateTelemetry); }), tap(function () { return _this.switchToNextDownloadRequest().toPromise(); }));
            }
            return _this.removeFromDownloadList(downloadCancelRequest, generateTelemetry);
        }));
    };
    DownloadServiceImpl.prototype.cancelAll = function () {
        var _this = this;
        return this.currentDownloadRequest$
            .pipe(take(1), mergeMap(function (currentDownloadRequest) {
            if (currentDownloadRequest) {
                return new Observable(function (observer) {
                    downloadManager.remove([currentDownloadRequest.downloadId], function (err, removeCount) {
                        if (err) {
                            observer.error(err);
                        }
                        observer.next(!!removeCount);
                        observer.complete();
                    });
                }).pipe(mergeMap(function () { return _this.removeAllFromDownloadList(); }), mergeMap(function () { return _this.switchToNextDownloadRequest(); }));
            }
            return _this.removeAllFromDownloadList();
        }));
    };
    DownloadServiceImpl.prototype.registerOnDownloadCompleteDelegate = function (downloadCompleteDelegate) {
        this.downloadCompleteDelegate = downloadCompleteDelegate;
    };
    DownloadServiceImpl.prototype.getActiveDownloadRequests = function () {
        return this.sharedPreferencesSetCollection.asListChanges().pipe(map(function (list) {
            return list.sort(function (first, second) {
                var firstPriority = first.withPriority || 0;
                var secondPriority = second.withPriority || 0;
                return secondPriority - firstPriority;
            });
        }));
    };
    DownloadServiceImpl.prototype.switchToNextDownloadRequest = function () {
        var _this = this;
        return this.sharedPreferencesSetCollection.asSet()
            .pipe(mergeMap(function (downloadListAsSet) {
            if (!downloadListAsSet.size()) {
                return of(undefined).pipe(tap(function () { return _this.currentDownloadRequest$.next(undefined); }));
            }
            var anyDownloadRequest = downloadListAsSet.toArray()
                .sort(function (first, second) {
                var firstPriority = first.withPriority || 0;
                var secondPriority = second.withPriority || 0;
                return secondPriority - firstPriority;
            })
                .shift();
            return new Observable(function (observer) {
                downloadManager.enqueue({
                    uri: anyDownloadRequest.downloadUrl,
                    title: anyDownloadRequest.filename,
                    description: '',
                    mimeType: anyDownloadRequest.mimeType,
                    visibleInDownloadsUi: true,
                    notificationVisibility: 1,
                    destinationInExternalFilesDir: {
                        dirType: DownloadServiceImpl_1.DOWNLOAD_DIR_NAME,
                        subPath: anyDownloadRequest.filename
                    },
                    headers: []
                }, function (err, id) {
                    if (err) {
                        return observer.error(err);
                    }
                    observer.next(id);
                });
            }).pipe(tap(function (downloadId) {
                var dataDirectory = window.device.platform.toLowerCase() === "ios" ? cordova.file.documentsDirectory : cordova.file.externalDataDirectory;
                anyDownloadRequest.downloadedFilePath = dataDirectory +
                    DownloadServiceImpl_1.DOWNLOAD_DIR_NAME + '/' + anyDownloadRequest.filename;
                anyDownloadRequest.downloadId = downloadId;
                _this.currentDownloadRequest$.next(anyDownloadRequest);
            }), tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DownloadServiceImpl_1.generateDownloadStartTelemetry(anyDownloadRequest)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }), mapTo(undefined), catchError(function () {
                return _this.cancel({
                    identifier: anyDownloadRequest.identifier
                });
            }));
        }));
    };
    DownloadServiceImpl.prototype.addToDownloadList = function (requests) {
        return this.sharedPreferencesSetCollection.addAll(requests).pipe(mapTo(undefined));
    };
    DownloadServiceImpl.prototype.removeFromDownloadList = function (request, generateTelemetry) {
        var _this = this;
        return this.sharedPreferencesSetCollection.asList()
            .pipe(mergeMap(function (downloadRequests) {
            var toRemoveDownloadRequest = downloadRequests
                .find(function (downloadRequest) { return downloadRequest.identifier === request.identifier; });
            if (!toRemoveDownloadRequest) {
                return of(undefined);
            }
            return _this.sharedPreferencesSetCollection.remove(toRemoveDownloadRequest)
                .pipe(mapTo(undefined), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = generateTelemetry;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, DownloadServiceImpl_1.generateDownloadCancelTelemetry(toRemoveDownloadRequest)];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2: return [2 /*return*/, _a];
                    }
                });
            }); }));
        }));
    };
    DownloadServiceImpl.prototype.removeAllFromDownloadList = function () {
        var _this = this;
        return this.sharedPreferencesSetCollection.asList()
            .pipe(take(1), mergeMap(function (downloadRequests) {
            return _this.sharedPreferencesSetCollection.clear()
                .pipe(mergeMap(function () {
                return from(downloadRequests)
                    .pipe(tap(function (downloadRequest) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, DownloadServiceImpl_1.generateDownloadCancelTelemetry(downloadRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }), concatMapTo(of(undefined)));
            }));
        }));
    };
    DownloadServiceImpl.prototype.handleDownloadCompletion = function (downloadProgress) {
        var _this = this;
        return this.currentDownloadRequest$
            .pipe(take(1), mergeMap(function (currentDownloadRequest) {
            if (downloadProgress.payload.status === DownloadStatus.STATUS_SUCCESSFUL) {
                _this.completedDownloadRequestsCache.add(currentDownloadRequest);
                return iif(function () { return !!_this.downloadCompleteDelegate; }, defer(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        DownloadServiceImpl_1.generateDownloadCompleteTelemetry(currentDownloadRequest);
                        this.downloadCompleteDelegate.onDownloadCompletion(currentDownloadRequest).toPromise();
                        return [2 /*return*/];
                    });
                }); }), defer(function () { return of(undefined); })).pipe(mapTo(undefined));
            }
            return of(undefined);
        }));
    };
    DownloadServiceImpl.prototype.emitProgressInEventBus = function (downloadProgress) {
        var _this = this;
        return defer(function () {
            return of(_this.eventsBusService.emit({
                namespace: EventNamespace.DOWNLOADS,
                event: downloadProgress
            })).pipe(mapTo(undefined));
        });
    };
    DownloadServiceImpl.prototype.getDownloadProgress = function (downloadRequest) {
        var _this = this;
        return new Observable(function (observer) {
            downloadManager.query({ ids: [downloadRequest.downloadId] }, function (err, entries) {
                if (err) {
                    observer.next({
                        type: DownloadEventType.PROGRESS,
                        payload: {
                            downloadId: downloadRequest.downloadId,
                            identifier: downloadRequest.identifier,
                            progress: -1,
                            bytesDownloaded: 0,
                            totalSizeInBytes: 0,
                            status: DownloadStatus.STATUS_FAILED
                        }
                    });
                    observer.complete();
                    _this.cancel({ identifier: downloadRequest.identifier }).toPromise();
                    return;
                }
                var entry = entries[0];
                observer.next({
                    type: DownloadEventType.PROGRESS,
                    payload: {
                        downloadId: downloadRequest.downloadId,
                        identifier: downloadRequest.identifier,
                        progress: Math.round(entry.totalSizeBytes >= 0 ? (entry.bytesDownloadedSoFar / entry.totalSizeBytes) * 100 : -1),
                        bytesDownloaded: entry.bytesDownloadedSoFar,
                        totalSizeInBytes: entry.totalSizeBytes,
                        status: entry.status
                    }
                });
                observer.complete();
            });
        });
    };
    DownloadServiceImpl.prototype.listenForDownloadProgressChanges = function () {
        var _this = this;
        return this.currentDownloadRequest$
            .pipe(switchMap(function (currentDownloadRequest) {
            if (!currentDownloadRequest) {
                return of(undefined);
            }
            _this.eventsBusService.emit({
                namespace: EventNamespace.DOWNLOADS,
                event: {
                    type: DownloadEventType.START,
                    payload: undefined
                }
            });
            return interval(1000)
                .pipe(mergeMap(function () {
                return _this.getDownloadProgress(currentDownloadRequest);
            }), distinctUntilChanged(function (prev, next) {
                return JSON.stringify(prev) === JSON.stringify(next);
            }), mergeMap(function (downloadProgress) {
                return zip(_this.handleDownloadCompletion(downloadProgress), _this.emitProgressInEventBus(downloadProgress)).pipe(mapTo(downloadProgress));
            }), tap(function (downloadProgress) {
                if (downloadProgress.payload.status === DownloadStatus.STATUS_FAILED ||
                    downloadProgress.payload.status === DownloadStatus.STATUS_SUCCESSFUL) {
                    _this.eventsBusService.emit({
                        namespace: EventNamespace.DOWNLOADS,
                        event: {
                            type: DownloadEventType.END,
                            payload: undefined
                        }
                    });
                }
            }), mapTo(undefined));
        }));
    };
    DownloadServiceImpl.prototype.trackDownloads = function (downloadStatRequest) {
        var _this = this;
        if (!downloadStatRequest.groupBy.fieldPath || !downloadStatRequest.groupBy.value) {
            return EMPTY;
        }
        return this.getActiveDownloadRequests().pipe(map(function (queued) {
            var hasMatchingFieldValue = function (request) {
                return downloadStatRequest.groupBy.value === downloadStatRequest.groupBy.fieldPath.split('.').reduce(function (o, i) {
                    if (o && o[i]) {
                        return o[i];
                    }
                    return undefined;
                }, request);
            };
            return {
                completed: _this.completedDownloadRequestsCache.size() ? _this.completedDownloadRequestsCache.toArray().filter(hasMatchingFieldValue) : [],
                queued: queued.length ? queued.filter(hasMatchingFieldValue) : []
            };
        }));
    };
    DownloadServiceImpl.prototype.onContentDelete = function (identifier) {
        this.completedDownloadRequestsCache.remove({ identifier: identifier });
    };
    var DownloadServiceImpl_1;
    DownloadServiceImpl.KEY_TO_DOWNLOAD_LIST = DownloadKeys.KEY_TO_DOWNLOAD_LIST;
    DownloadServiceImpl.DOWNLOAD_DIR_NAME = 'Download';
    DownloadServiceImpl = DownloadServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(1, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Object, Object])
    ], DownloadServiceImpl);
    return DownloadServiceImpl;
}());
export { DownloadServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvZG93bmxvYWQvaW1wbC9kb3dubG9hZC1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUVILGlCQUFpQixFQUlqQixjQUFjLEVBRWpCLE1BQU0sSUFBSSxDQUFDO0FBQ1osT0FBTyxFQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTdGLE9BQU8sRUFBQyxjQUFjLEVBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFFckUsT0FBTyxHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDdEQsT0FBTyxLQUFLLHVCQUF1QixNQUFNLHdDQUF3QyxDQUFDO0FBRWxGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRSxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQztBQUN4SCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FB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O29CQUN0RyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2Y7b0JBRUQsT0FBTyxTQUFTLENBQUM7Z0JBQ3JCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUM7WUFFRixPQUFPO2dCQUNILFNBQVMsRUFDTCxLQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakksTUFBTSxFQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUNoRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCw2Q0FBZSxHQUFmLFVBQWdCLFVBQWtCO1FBQzlCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLFlBQUEsRUFBcUIsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7O0lBaGJ1Qix3Q0FBb0IsR0FBRyxZQUFZLENBQUMsb0JBQW9CLENBQUM7SUFDekQscUNBQWlCLEdBQUcsVUFBVSxDQUFDO0lBRjlDLG1CQUFtQjtRQUQvQixVQUFVLEVBQUU7UUFXSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs7T0FYOUMsbUJBQW1CLENBa2IvQjtJQUFELDBCQUFDO0NBQUEsQUFsYkQsSUFrYkM7U0FsYlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEb3dubG9hZENhbmNlbFJlcXVlc3QsXG4gICAgRG93bmxvYWRFdmVudFR5cGUsXG4gICAgRG93bmxvYWRQcm9ncmVzcyxcbiAgICBEb3dubG9hZFJlcXVlc3QsXG4gICAgRG93bmxvYWRTZXJ2aWNlLFxuICAgIERvd25sb2FkU3RhdHVzLFxuICAgIFRyYWNrRG93bmxvYWRSZXF1ZXN0XG59IGZyb20gJy4uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBkZWZlciwgRU1QVFksIGZyb20sIGlpZiwgaW50ZXJ2YWwsIE9ic2VydmFibGUsIG9mLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTZGtTZXJ2aWNlT25Jbml0RGVsZWdhdGV9IGZyb20gJy4uLy4uLy4uL3Nkay1zZXJ2aWNlLW9uLWluaXQtZGVsZWdhdGUnO1xuaW1wb3J0IHtFdmVudE5hbWVzcGFjZSwgRXZlbnRzQnVzU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IFNldCBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1NldCc7XG5pbXBvcnQgKiBhcyBkb3dubG9hZE1hbmFnZXJJbnN0YW5jZSBmcm9tICdjb3Jkb3ZhLXBsdWdpbi1hbmRyb2lkLWRvd25sb2FkbWFuYWdlcic7XG5pbXBvcnQge0Rvd25sb2FkQ29tcGxldGVEZWxlZ2F0ZX0gZnJvbSAnLi4vZGVmL2Rvd25sb2FkLWNvbXBsZXRlLWRlbGVnYXRlJztcbmltcG9ydCB7RG93bmxvYWRLZXlzfSBmcm9tICcuLi8uLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtUZWxlbWV0cnlMb2dnZXJ9IGZyb20gJy4uLy4uLy4uL3RlbGVtZXRyeS91dGlsL3RlbGVtZXRyeS1sb2dnZXInO1xuaW1wb3J0IHtJbnRlcmFjdFN1YlR5cGUsIEludGVyYWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vdGVsZW1ldHJ5JztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9ufSBmcm9tICcuLi8uLi9zaGFyZWQtcHJlZmVyZW5jZXMvZGVmL3NoYXJlZC1wcmVmZXJlbmNlcy1zZXQtY29sbGVjdGlvbic7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbkltcGx9IGZyb20gJy4uLy4uL3NoYXJlZC1wcmVmZXJlbmNlcy9pbXBsL3NoYXJlZC1wcmVmZXJlbmNlcy1zZXQtY29sbGVjdGlvbi1pbXBsJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBjb25jYXRNYXBUbywgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcFRvLCBtZXJnZU1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb250ZW50RGVsZXRlTGlzdGVuZXJ9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvZGVmL2NvbnRlbnQtZGVsZXRlLWxpc3RlbmVyJztcbmltcG9ydCB7RG93bmxvYWRUcmFja2luZ30gZnJvbSAnLi4vZGVmL3Jlc3BvbnNlJztcbmltcG9ydCB7IENvbnRlbnRVdGlsIH0gZnJvbSAnLi4vLi4vLi4vY29udGVudC91dGlsL2NvbnRlbnQtdXRpbCc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFNlcnZpY2VJbXBsIGltcGxlbWVudHMgRG93bmxvYWRTZXJ2aWNlLCBTZGtTZXJ2aWNlT25Jbml0RGVsZWdhdGUsIENvbnRlbnREZWxldGVMaXN0ZW5lciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgS0VZX1RPX0RPV05MT0FEX0xJU1QgPSBEb3dubG9hZEtleXMuS0VZX1RPX0RPV05MT0FEX0xJU1Q7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRE9XTkxPQURfRElSX05BTUUgPSAnRG93bmxvYWQnO1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50RG93bmxvYWRSZXF1ZXN0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RG93bmxvYWRSZXF1ZXN0IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIHByaXZhdGUgZG93bmxvYWRDb21wbGV0ZURlbGVnYXRlPzogRG93bmxvYWRDb21wbGV0ZURlbGVnYXRlO1xuICAgIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uOiBTaGFyZWRQcmVmZXJlbmNlc1NldENvbGxlY3Rpb248RG93bmxvYWRSZXF1ZXN0PjtcblxuICAgIHByaXZhdGUgY29tcGxldGVkRG93bmxvYWRSZXF1ZXN0c0NhY2hlOiBTZXQ8RG93bmxvYWRSZXF1ZXN0PiA9IG5ldyBTZXQ8RG93bmxvYWRSZXF1ZXN0PigocikgPT4gci5pZGVudGlmaWVyKTtcblxuICAgIGNvbnN0cnVjdG9yKEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkVWRU5UU19CVVNfU0VSVklDRSkgcHJpdmF0ZSBldmVudHNCdXNTZXJ2aWNlOiBFdmVudHNCdXNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMpIHtcbiAgICAgICAgd2luZG93Wydkb3dubG9hZE1hbmFnZXInXSA9IGRvd25sb2FkTWFuYWdlckluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uID0gbmV3IFNoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbkltcGwoXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICAgICAgRG93bmxvYWRTZXJ2aWNlSW1wbC5LRVlfVE9fRE9XTkxPQURfTElTVCxcbiAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLmlkZW50aWZpZXJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZW5lcmF0ZURvd25sb2FkU3RhcnRUZWxlbWV0cnkoZG93bmxvYWRSZXF1ZXN0OiBEb3dubG9hZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIFRlbGVtZXRyeUxvZ2dlci5sb2cuaW50ZXJhY3Qoe1xuICAgICAgICAgICAgdHlwZTogSW50ZXJhY3RUeXBlLk9USEVSLFxuICAgICAgICAgICAgc3ViVHlwZTogSW50ZXJhY3RTdWJUeXBlLkNPTlRFTlRfRE9XTkxPQURfSU5JVElBVEUsXG4gICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgcGFnZUlkOiAnQ29udGVudERldGFpbCcsXG4gICAgICAgICAgICBpZDogJ0NvbnRlbnREZXRhaWwnLFxuICAgICAgICAgICAgb2JqSWQ6IGRvd25sb2FkUmVxdWVzdC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgb2JqVHlwZTogZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddICYmIGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXVsncHJpbWFyeUNhdGVnb3J5J10gP1xuICAgICAgICAgICAgICAgIENvbnRlbnRVdGlsLnJlYWRQcmltYXJ5Q2F0ZWdvcnlTZXJ2ZXIoZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddKSA6ICdDb250ZW50JyxcbiAgICAgICAgICAgIG9ialZlcjogZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddICYmIGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXVsncGtnVmVyc2lvbiddID9cbiAgICAgICAgICAgICAgICBkb3dubG9hZFJlcXVlc3RbJ2NvbnRlbnRNZXRhJ11bJ3BrZ1ZlcnNpb24nXSA6ICcnLFxuICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBkb3dubG9hZFJlcXVlc3RbJ2NvcnJlbGF0aW9uRGF0YSddIHx8IFtdXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVEb3dubG9hZENvbXBsZXRlVGVsZW1ldHJ5KGRvd25sb2FkUmVxdWVzdDogRG93bmxvYWRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBUZWxlbWV0cnlMb2dnZXIubG9nLmludGVyYWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEludGVyYWN0VHlwZS5PVEhFUixcbiAgICAgICAgICAgIHN1YlR5cGU6IEludGVyYWN0U3ViVHlwZS5DT05URU5UX0RPV05MT0FEX1NVQ0NFU1MsXG4gICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgcGFnZUlkOiAnQ29udGVudERldGFpbCcsXG4gICAgICAgICAgICBpZDogJ0NvbnRlbnREZXRhaWwnLFxuICAgICAgICAgICAgb2JqSWQ6IGRvd25sb2FkUmVxdWVzdC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgb2JqVHlwZTogZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddICYmIGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXVsncHJpbWFyeUNhdGVnb3J5J10gP1xuICAgICAgICAgICAgQ29udGVudFV0aWwucmVhZFByaW1hcnlDYXRlZ29yeVNlcnZlcihkb3dubG9hZFJlcXVlc3RbJ2NvbnRlbnRNZXRhJ10pIDogJ0NvbnRlbnQnLFxuICAgICAgICAgICAgb2JqVmVyOiBkb3dubG9hZFJlcXVlc3RbJ2NvbnRlbnRNZXRhJ10gJiYgZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddWydwa2dWZXJzaW9uJ10gP1xuICAgICAgICAgICAgICAgIGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXVsncGtnVmVyc2lvbiddIDogJycsXG4gICAgICAgICAgICBjb3JyZWxhdGlvbkRhdGE6IGRvd25sb2FkUmVxdWVzdFsnY29ycmVsYXRpb25EYXRhJ10gfHwgW11cbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZW5lcmF0ZURvd25sb2FkQ2FuY2VsVGVsZW1ldHJ5KGRvd25sb2FkUmVxdWVzdDogRG93bmxvYWRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBUZWxlbWV0cnlMb2dnZXIubG9nLmludGVyYWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEludGVyYWN0VHlwZS5PVEhFUixcbiAgICAgICAgICAgIHN1YlR5cGU6IEludGVyYWN0U3ViVHlwZS5DT05URU5UX0RPV05MT0FEX0NBTkNFTCxcbiAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICBwYWdlSWQ6ICdDb250ZW50RGV0YWlsJyxcbiAgICAgICAgICAgIGlkOiAnQ29udGVudERldGFpbCcsXG4gICAgICAgICAgICBvYmpJZDogZG93bmxvYWRSZXF1ZXN0LmlkZW50aWZpZXIsXG4gICAgICAgICAgICBvYmpUeXBlOiBkb3dubG9hZFJlcXVlc3RbJ2NvbnRlbnRNZXRhJ10gJiYgZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddWydwcmltYXJ5Q2F0ZWdvcnknXSA/XG4gICAgICAgICAgICBDb250ZW50VXRpbC5yZWFkUHJpbWFyeUNhdGVnb3J5U2VydmVyKGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXSkgOiAnQ29udGVudCcsXG4gICAgICAgICAgICBvYmpWZXI6IGRvd25sb2FkUmVxdWVzdFsnY29udGVudE1ldGEnXSAmJiBkb3dubG9hZFJlcXVlc3RbJ2NvbnRlbnRNZXRhJ11bJ3BrZ1ZlcnNpb24nXSA/XG4gICAgICAgICAgICAgICAgZG93bmxvYWRSZXF1ZXN0Wydjb250ZW50TWV0YSddWydwa2dWZXJzaW9uJ10gOiAnJyxcbiAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogZG93bmxvYWRSZXF1ZXN0Wydjb3JyZWxhdGlvbkRhdGEnXSB8fCBbXVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3dpdGNoVG9OZXh0RG93bmxvYWRSZXF1ZXN0KClcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RlbkZvckRvd25sb2FkUHJvZ3Jlc3NDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkb3dubG9hZChkb3dubG9hZFJlcXVlc3RzOiBEb3dubG9hZFJlcXVlc3RbXSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnREb3dubG9hZFJlcXVlc3QkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChjdXJyZW50RG93bmxvYWRSZXF1ZXN0PzogRG93bmxvYWRSZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RG93bmxvYWRSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRUb0Rvd25sb2FkTGlzdChkb3dubG9hZFJlcXVlc3RzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvRG93bmxvYWRMaXN0KGRvd25sb2FkUmVxdWVzdHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5zd2l0Y2hUb05leHREb3dubG9hZFJlcXVlc3QoKS50b1Byb21pc2UoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgY2FuY2VsKGRvd25sb2FkQ2FuY2VsUmVxdWVzdDogRG93bmxvYWRDYW5jZWxSZXF1ZXN0LCBnZW5lcmF0ZVRlbGVtZXRyeTogYm9vbGVhbiA9IHRydWUpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RG93bmxvYWRSZXF1ZXN0JFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY3VycmVudERvd25sb2FkUmVxdWVzdD86IERvd25sb2FkUmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudERvd25sb2FkUmVxdWVzdCAmJiBjdXJyZW50RG93bmxvYWRSZXF1ZXN0LmlkZW50aWZpZXIgPT09IGRvd25sb2FkQ2FuY2VsUmVxdWVzdC5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRNYW5hZ2VyLnJlbW92ZShbY3VycmVudERvd25sb2FkUmVxdWVzdC5kb3dubG9hZElkIV0sIChlcnIsIHJlbW92ZUNvdW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KCEhcmVtb3ZlQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLnJlbW92ZUZyb21Eb3dubG9hZExpc3QoZG93bmxvYWRDYW5jZWxSZXF1ZXN0LCBnZW5lcmF0ZVRlbGVtZXRyeSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLnN3aXRjaFRvTmV4dERvd25sb2FkUmVxdWVzdCgpLnRvUHJvbWlzZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZyb21Eb3dubG9hZExpc3QoZG93bmxvYWRDYW5jZWxSZXF1ZXN0LCBnZW5lcmF0ZVRlbGVtZXRyeSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgY2FuY2VsQWxsKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RG93bmxvYWRSZXF1ZXN0JFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY3VycmVudERvd25sb2FkUmVxdWVzdD86IERvd25sb2FkUmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudERvd25sb2FkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTWFuYWdlci5yZW1vdmUoW2N1cnJlbnREb3dubG9hZFJlcXVlc3QuZG93bmxvYWRJZCFdLCAoZXJyLCByZW1vdmVDb3VudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCghIXJlbW92ZUNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5yZW1vdmVBbGxGcm9tRG93bmxvYWRMaXN0KCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHRoaXMuc3dpdGNoVG9OZXh0RG93bmxvYWRSZXF1ZXN0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsRnJvbURvd25sb2FkTGlzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Eb3dubG9hZENvbXBsZXRlRGVsZWdhdGUoZG93bmxvYWRDb21wbGV0ZURlbGVnYXRlOiBEb3dubG9hZENvbXBsZXRlRGVsZWdhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb3dubG9hZENvbXBsZXRlRGVsZWdhdGUgPSBkb3dubG9hZENvbXBsZXRlRGVsZWdhdGU7XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlRG93bmxvYWRSZXF1ZXN0cygpOiBPYnNlcnZhYmxlPERvd25sb2FkUmVxdWVzdFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbi5hc0xpc3RDaGFuZ2VzKCkucGlwZShcbiAgICAgICAgICAgIG1hcCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnNvcnQoKGZpcnN0LCBzZWNvbmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQcmlvcml0eSA9IGZpcnN0LndpdGhQcmlvcml0eSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRQcmlvcml0eSA9IHNlY29uZC53aXRoUHJpb3JpdHkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY29uZFByaW9yaXR5IC0gZmlyc3RQcmlvcml0eTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzd2l0Y2hUb05leHREb3dubG9hZFJlcXVlc3QoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uLmFzU2V0KClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChkb3dubG9hZExpc3RBc1NldDogU2V0PERvd25sb2FkUmVxdWVzdD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb3dubG9hZExpc3RBc1NldC5zaXplKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuY3VycmVudERvd25sb2FkUmVxdWVzdCQubmV4dCh1bmRlZmluZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFueURvd25sb2FkUmVxdWVzdCA9IGRvd25sb2FkTGlzdEFzU2V0LnRvQXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGZpcnN0LCBzZWNvbmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFByaW9yaXR5ID0gZmlyc3Qud2l0aFByaW9yaXR5IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUHJpb3JpdHkgPSBzZWNvbmQud2l0aFByaW9yaXR5IHx8IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2Vjb25kUHJpb3JpdHkgLSBmaXJzdFByaW9yaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaGlmdCgpIGFzIERvd25sb2FkUmVxdWVzdDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTWFuYWdlci5lbnF1ZXVlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6IGFueURvd25sb2FkUmVxdWVzdC5kb3dubG9hZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYW55RG93bmxvYWRSZXF1ZXN0LmZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZTogYW55RG93bmxvYWRSZXF1ZXN0Lm1pbWVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVJbkRvd25sb2Fkc1VpOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblZpc2liaWxpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25JbkV4dGVybmFsRmlsZXNEaXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyVHlwZTogRG93bmxvYWRTZXJ2aWNlSW1wbC5ET1dOTE9BRF9ESVJfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUGF0aDogYW55RG93bmxvYWRSZXF1ZXN0LmZpbGVuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVyciwgaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcCgoZG93bmxvYWRJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRGlyZWN0b3J5ID0gd2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiID8gY29yZG92YS5maWxlLmRvY3VtZW50c0RpcmVjdG9yeSA6IGNvcmRvdmEuZmlsZS5leHRlcm5hbERhdGFEaXJlY3RvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnlEb3dubG9hZFJlcXVlc3QuZG93bmxvYWRlZEZpbGVQYXRoID0gZGF0YURpcmVjdG9yeSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRG93bmxvYWRTZXJ2aWNlSW1wbC5ET1dOTE9BRF9ESVJfTkFNRSArICcvJyArIGFueURvd25sb2FkUmVxdWVzdC5maWxlbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnlEb3dubG9hZFJlcXVlc3QuZG93bmxvYWRJZCA9IGRvd25sb2FkSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RG93bmxvYWRSZXF1ZXN0JC5uZXh0KGFueURvd25sb2FkUmVxdWVzdCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiBhd2FpdCBEb3dubG9hZFNlcnZpY2VJbXBsLmdlbmVyYXRlRG93bmxvYWRTdGFydFRlbGVtZXRyeShhbnlEb3dubG9hZFJlcXVlc3QhKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogYW55RG93bmxvYWRSZXF1ZXN0LmlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0Rvd25sb2FkTGlzdChyZXF1ZXN0czogRG93bmxvYWRSZXF1ZXN0W10pOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlc1NldENvbGxlY3Rpb24uYWRkQWxsKHJlcXVlc3RzKS5waXBlKFxuICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbURvd25sb2FkTGlzdChyZXF1ZXN0OiBEb3dubG9hZENhbmNlbFJlcXVlc3QsIGdlbmVyYXRlVGVsZW1ldHJ5OiBib29sZWFuKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uLmFzTGlzdCgpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoZG93bmxvYWRSZXF1ZXN0czogRG93bmxvYWRSZXF1ZXN0W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9SZW1vdmVEb3dubG9hZFJlcXVlc3QgPSBkb3dubG9hZFJlcXVlc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgoZG93bmxvYWRSZXF1ZXN0KSA9PiBkb3dubG9hZFJlcXVlc3QuaWRlbnRpZmllciA9PT0gcmVxdWVzdC5pZGVudGlmaWVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9SZW1vdmVEb3dubG9hZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uLnJlbW92ZSh0b1JlbW92ZURvd25sb2FkUmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKGFzeW5jICgpID0+IGdlbmVyYXRlVGVsZW1ldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGF3YWl0IERvd25sb2FkU2VydmljZUltcGwuZ2VuZXJhdGVEb3dubG9hZENhbmNlbFRlbGVtZXRyeSh0b1JlbW92ZURvd25sb2FkUmVxdWVzdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlQWxsRnJvbURvd25sb2FkTGlzdCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlc1NldENvbGxlY3Rpb24uYXNMaXN0KClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGRvd25sb2FkUmVxdWVzdHM6IERvd25sb2FkUmVxdWVzdFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbi5jbGVhcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKGRvd25sb2FkUmVxdWVzdHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKGRvd25sb2FkUmVxdWVzdCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgRG93bmxvYWRTZXJ2aWNlSW1wbC5nZW5lcmF0ZURvd25sb2FkQ2FuY2VsVGVsZW1ldHJ5KGRvd25sb2FkUmVxdWVzdCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdE1hcFRvKG9mKHVuZGVmaW5lZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRG93bmxvYWRDb21wbGV0aW9uKGRvd25sb2FkUHJvZ3Jlc3M6IERvd25sb2FkUHJvZ3Jlc3MpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RG93bmxvYWRSZXF1ZXN0JFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY3VycmVudERvd25sb2FkUmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG93bmxvYWRQcm9ncmVzcy5wYXlsb2FkLnN0YXR1cyA9PT0gRG93bmxvYWRTdGF0dXMuU1RBVFVTX1NVQ0NFU1NGVUwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVkRG93bmxvYWRSZXF1ZXN0c0NhY2hlLmFkZChjdXJyZW50RG93bmxvYWRSZXF1ZXN0ISk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gISF0aGlzLmRvd25sb2FkQ29tcGxldGVEZWxlZ2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd25sb2FkU2VydmljZUltcGwuZ2VuZXJhdGVEb3dubG9hZENvbXBsZXRlVGVsZW1ldHJ5KGN1cnJlbnREb3dubG9hZFJlcXVlc3QhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZENvbXBsZXRlRGVsZWdhdGUhLm9uRG93bmxvYWRDb21wbGV0aW9uKGN1cnJlbnREb3dubG9hZFJlcXVlc3QhKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcigoKSA9PiBvZih1bmRlZmluZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRQcm9ncmVzc0luRXZlbnRCdXMoZG93bmxvYWRQcm9ncmVzczogRG93bmxvYWRQcm9ncmVzcyk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBkZWZlcigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5ldmVudHNCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuRE9XTkxPQURTLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBkb3dubG9hZFByb2dyZXNzXG4gICAgICAgICAgICB9KSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERvd25sb2FkUHJvZ3Jlc3MoZG93bmxvYWRSZXF1ZXN0OiBEb3dubG9hZFJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkUHJvZ3Jlc3M+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgZG93bmxvYWRNYW5hZ2VyLnF1ZXJ5KHtpZHM6IFtkb3dubG9hZFJlcXVlc3QuZG93bmxvYWRJZCFdfSwgKGVyciwgZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBEb3dubG9hZEV2ZW50VHlwZS5QUk9HUkVTUyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZElkOiBkb3dubG9hZFJlcXVlc3QuZG93bmxvYWRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBkb3dubG9hZFJlcXVlc3QuaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXNEb3dubG9hZGVkOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsU2l6ZUluQnl0ZXM6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBEb3dubG9hZFN0YXR1cy5TVEFUVVNfRkFJTEVEXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gYXMgRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoe2lkZW50aWZpZXI6IGRvd25sb2FkUmVxdWVzdC5pZGVudGlmaWVyfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gZW50cmllc1swXTtcblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBEb3dubG9hZEV2ZW50VHlwZS5QUk9HUkVTUyxcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRJZDogZG93bmxvYWRSZXF1ZXN0LmRvd25sb2FkSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBkb3dubG9hZFJlcXVlc3QuaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBNYXRoLnJvdW5kKGVudHJ5LnRvdGFsU2l6ZUJ5dGVzID49IDAgPyAoZW50cnkuYnl0ZXNEb3dubG9hZGVkU29GYXIgLyBlbnRyeS50b3RhbFNpemVCeXRlcykgKiAxMDAgOiAtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlc0Rvd25sb2FkZWQ6IGVudHJ5LmJ5dGVzRG93bmxvYWRlZFNvRmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxTaXplSW5CeXRlczogZW50cnkudG90YWxTaXplQnl0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGVudHJ5LnN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBhcyBEb3dubG9hZFByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuRm9yRG93bmxvYWRQcm9ncmVzc0NoYW5nZXMoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudERvd25sb2FkUmVxdWVzdCRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoY3VycmVudERvd25sb2FkUmVxdWVzdDogRG93bmxvYWRSZXF1ZXN0IHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudERvd25sb2FkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLkRPV05MT0FEUyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRG93bmxvYWRFdmVudFR5cGUuU1RBUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnZhbCgxMDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREb3dubG9hZFByb2dyZXNzKGN1cnJlbnREb3dubG9hZFJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChwcmV2LCBuZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwcmV2KSA9PT0gSlNPTi5zdHJpbmdpZnkobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGRvd25sb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRG93bmxvYWRDb21wbGV0aW9uKGRvd25sb2FkUHJvZ3Jlc3MhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFByb2dyZXNzSW5FdmVudEJ1cyhkb3dubG9hZFByb2dyZXNzISlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8oZG93bmxvYWRQcm9ncmVzcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXAoKGRvd25sb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRQcm9ncmVzcy5wYXlsb2FkLnN0YXR1cyA9PT0gRG93bmxvYWRTdGF0dXMuU1RBVFVTX0ZBSUxFRCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRQcm9ncmVzcy5wYXlsb2FkLnN0YXR1cyA9PT0gRG93bmxvYWRTdGF0dXMuU1RBVFVTX1NVQ0NFU1NGVUxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBFdmVudE5hbWVzcGFjZS5ET1dOTE9BRFMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRG93bmxvYWRFdmVudFR5cGUuRU5ELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgdHJhY2tEb3dubG9hZHMoZG93bmxvYWRTdGF0UmVxdWVzdDogVHJhY2tEb3dubG9hZFJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkVHJhY2tpbmc+IHtcbiAgICAgICAgaWYgKCFkb3dubG9hZFN0YXRSZXF1ZXN0Lmdyb3VwQnkuZmllbGRQYXRoIHx8ICFkb3dubG9hZFN0YXRSZXF1ZXN0Lmdyb3VwQnkudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZURvd25sb2FkUmVxdWVzdHMoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChxdWV1ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNNYXRjaGluZ0ZpZWxkVmFsdWUgPSAocmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93bmxvYWRTdGF0UmVxdWVzdC5ncm91cEJ5LnZhbHVlID09PSBkb3dubG9hZFN0YXRSZXF1ZXN0Lmdyb3VwQnkuZmllbGRQYXRoLnNwbGl0KCcuJykucmVkdWNlKChvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobyAmJiBvW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9baV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0sIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZERvd25sb2FkUmVxdWVzdHNDYWNoZS5zaXplKCkgPyB0aGlzLmNvbXBsZXRlZERvd25sb2FkUmVxdWVzdHNDYWNoZS50b0FycmF5KCkuZmlsdGVyKGhhc01hdGNoaW5nRmllbGRWYWx1ZSkgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcXVldWVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVkLmxlbmd0aCA/IHF1ZXVlZC5maWx0ZXIoaGFzTWF0Y2hpbmdGaWVsZFZhbHVlKSA6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25Db250ZW50RGVsZXRlKGlkZW50aWZpZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZERvd25sb2FkUmVxdWVzdHNDYWNoZS5yZW1vdmUoeyBpZGVudGlmaWVyIH0gYXMgRG93bmxvYWRSZXF1ZXN0KTtcbiAgICB9XG59XG4iXX0=