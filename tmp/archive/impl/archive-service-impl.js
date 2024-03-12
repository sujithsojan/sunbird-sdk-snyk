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
import { ArchiveObjectType, } from '..';
import { combineLatest, from, Observable, concat, defer, throwError, of } from 'rxjs';
import { concatMap, map, mapTo, tap } from 'rxjs/operators';
import { UniqueId } from '../../db/util/unique-id';
import { TelemetryExportDelegate } from '../export/impl/telemetry-export-delegate';
import { DbService } from '../../db';
import { InjectionTokens } from '../../injection-tokens';
import { inject, injectable } from 'inversify';
import { ShareDirection, ShareType } from '../../telemetry';
import { InvalidRequestError } from '..';
import { TelemetryImportDelegate } from '../import/impl/telemetry-import-delegate';
import { InvalidArchiveError } from '../import/error/invalid-archive-error';
import { FileUtil } from '../../util/file/util/file-util';
var ArchiveServiceImpl = /** @class */ (function () {
    function ArchiveServiceImpl(fileService, dbService, telemetryService, zipService, deviceInfo, networkQueue, sdkConfig) {
        this.fileService = fileService;
        this.dbService = dbService;
        this.telemetryService = telemetryService;
        this.zipService = zipService;
        this.deviceInfo = deviceInfo;
        this.networkQueue = networkQueue;
        this.sdkConfig = sdkConfig;
    }
    ArchiveServiceImpl_1 = ArchiveServiceImpl;
    ArchiveServiceImpl.reduceObjectProgressToArchiveObjectExportProgress = function (results) {
        return results.reduce(function (acc, _a) {
            var type = _a.type, progress = _a.progress;
            acc.set(type, progress);
            return acc;
        }, new Map());
    };
    ArchiveServiceImpl.reduceObjectProgressToArchiveObjectImportProgress = function (results) {
        return results.reduce(function (acc, _a) {
            var type = _a.type, progress = _a.progress;
            acc.set(type, progress);
            return acc;
        }, new Map());
    };
    ArchiveServiceImpl.prototype.export = function (exportRequest) {
        var _this = this;
        var folderPath = (window.device.platform.toLowerCase() === "ios") ? cordova.file.documentsDirectory : cordova.file.externalCacheDirectory;
        var workspacePath = "" + folderPath + UniqueId.generateUniqueId();
        var lastResult;
        if (!exportRequest.objects.length) {
            return throwError(new InvalidRequestError('No archive objects to export'));
        }
        return concat(defer(function () { return from(_this.fileService.createDir(workspacePath, false)); }).pipe(concatMap(function () {
            return combineLatest(exportRequest.objects.map(function (object) {
                switch (object.type) {
                    case ArchiveObjectType.CONTENT:
                        // TODO
                        throw new Error('To be implemented');
                    case ArchiveObjectType.PROFILE:
                        // TODO
                        throw new Error('To be implemented');
                    case ArchiveObjectType.TELEMETRY:
                        return new TelemetryExportDelegate(_this.dbService, _this.fileService).export({ filePath: exportRequest.filePath }, { workspacePath: workspacePath }).pipe(map(function (progress) { return ({ type: ArchiveObjectType.TELEMETRY, progress: progress }); }));
                }
            }));
        }), map(function (results) {
            return {
                task: 'BUILDING',
                progress: ArchiveServiceImpl_1.reduceObjectProgressToArchiveObjectExportProgress(results)
            };
        }), tap(function (results) { return lastResult = results; })), defer(function () { return _this.generateManifestFile(lastResult, workspacePath); }), defer(function () { return _this.generateZipArchive(lastResult, workspacePath); }), defer(function () { return _this.generateExportTelemetries(lastResult, workspacePath); })).pipe(tap(function (results) { return lastResult = results; }));
    };
    ArchiveServiceImpl.prototype.generateExportTelemetries = function (progress, workspacePath) {
        var _this = this;
        progress.progress.forEach(function (v, k) {
            switch (k) {
                case ArchiveObjectType.CONTENT:
                    // TODO
                    throw new Error('To be implemented');
                case ArchiveObjectType.PROFILE:
                    // TODO
                    throw new Error('To be implemented');
                case ArchiveObjectType.TELEMETRY: {
                    // const items = (v as ArchiveObjectExportProgress<TelemetryPackageMeta>).completed.map((entry) => {
                    //     return {
                    //         type: ShareItemType.TELEMETRY,
                    //         origin: this.deviceInfo.getDeviceID(),
                    //         identifier: entry.mid,
                    //         pkgVersion: 1,
                    //         transferCount: entry.eventsCount,
                    //         size: entry.size + ''
                    //     };
                    // });
                    var req = {
                        dir: ShareDirection.OUT,
                        type: ShareType.FILE,
                        items: [],
                        env: 'sdk'
                    };
                    _this.telemetryService.share(req).toPromise();
                }
            }
        });
        return of(__assign({}, progress));
    };
    ArchiveServiceImpl.prototype.generateZipArchive = function (progress, workspacePath) {
        var _this = this;
        var folderPath = (window.device.platform.toLowerCase() === "ios") ? cordova.file.documentsDirectory : cordova.file.externalCacheDirectory;
        var zipFilePath = folderPath + "archive-" + new Date().toISOString() + ".zip";
        return new Observable(function (observer) {
            _this.zipService.zip(workspacePath, { target: zipFilePath }, [], [], function () {
                observer.next();
                observer.complete();
            }, function (e) {
                observer.error(e);
            });
        }).pipe(mapTo(__assign(__assign({}, progress), { task: 'COMPLETE', filePath: zipFilePath })));
    };
    ArchiveServiceImpl.prototype.generateManifestFile = function (_a, workspacePath) {
        var _this = this;
        var progress = _a.progress;
        return this.telemetryService.buildContext().pipe(map(function (c) { return c.pdata; }), concatMap(function (producerData) {
            var flattenedItems = Array.from(progress.entries()).reduce(function (acc, _a) {
                var objectType = _a[0], objectProgress = _a[1];
                return acc.concat(objectProgress.completed);
            }, []);
            return from(_this.fileService.writeFile(workspacePath, 'manifest.json', JSON.stringify({
                id: ArchiveServiceImpl_1.ARCHIVE_ID,
                ver: ArchiveServiceImpl_1.ARCHIVE_VERSION,
                ts: (new Date()).toISOString(),
                producer: producerData,
                archive: {
                    count: flattenedItems.length,
                    items: flattenedItems
                }
            }), {
                replace: true
            }));
        }), mapTo({
            progress: progress,
            task: 'BUILDING_MANIFEST'
        }));
    };
    ArchiveServiceImpl.prototype.import = function (importRequest) {
        var _this = this;
        var folderPath = (window.device.platform.toLowerCase() === "ios") ? cordova.file.documentsDirectory : cordova.file.externalCacheDirectory;
        var workspacePath = "" + folderPath + UniqueId.generateUniqueId();
        if (!importRequest.objects.length) {
            return throwError(new InvalidRequestError('No archive objects to export'));
        }
        var lastResult = {
            task: '',
            progress: new Map(),
            filePath: importRequest.filePath
        };
        return concat(defer(function () { return from(_this.fileService.createDir(workspacePath, false)); }).pipe(concatMap(function () { return _this.extractZipArchive(lastResult, workspacePath); })), defer(function () { return _this.readManifestFile(lastResult, workspacePath, importRequest.objects.map(function (o) { return o.type; })); }), defer(function () { return _this.generateImportTelemetries(lastResult, workspacePath); }), defer(function () {
            return combineLatest(importRequest.objects.map(function (object) {
                switch (object.type) {
                    case ArchiveObjectType.CONTENT:
                        // TODO
                        throw new Error('To be implemented');
                    case ArchiveObjectType.PROFILE:
                        // TODO
                        throw new Error('To be implemented');
                    case ArchiveObjectType.TELEMETRY:
                        return new TelemetryImportDelegate(_this.dbService, _this.fileService, _this.networkQueue, _this.sdkConfig).import({
                            filePath: importRequest.filePath
                        }, {
                            workspacePath: workspacePath,
                            items: lastResult.progress
                                .get(ArchiveObjectType.TELEMETRY).pending
                        }).pipe(map(function (progress) { return ({ type: ArchiveObjectType.TELEMETRY, progress: progress }); }));
                }
            })).pipe(map(function (results) {
                return {
                    task: 'IMPORTING',
                    progress: ArchiveServiceImpl_1.reduceObjectProgressToArchiveObjectImportProgress(results)
                };
            }));
        }), of(__assign(__assign({}, lastResult), { task: 'COMPLETE' }))).pipe(tap(function (results) { return lastResult = results; }));
    };
    ArchiveServiceImpl.prototype.generateImportTelemetries = function (progress, workspacePath) {
        var _this = this;
        progress.progress.forEach(function (v, k) {
            switch (k) {
                case ArchiveObjectType.CONTENT:
                    // TODO
                    throw new Error('To be implemented');
                case ArchiveObjectType.PROFILE:
                    // TODO
                    throw new Error('To be implemented');
                case ArchiveObjectType.TELEMETRY: {
                    // const items = (v as ArchiveObjectImportProgress<TelemetryPackageMeta>).pending.map((entry) => {
                    //     return {
                    //         type: ShareItemType.TELEMETRY,
                    //         origin: this.deviceInfo.getDeviceID(),
                    //         identifier: entry.mid,
                    //         pkgVersion: 1,
                    //         transferCount: entry.eventsCount,
                    //         size: entry.size + ''
                    //     };
                    // });
                    var req = {
                        dir: ShareDirection.IN,
                        type: ShareType.FILE.valueOf(),
                        items: [],
                        env: 'sdk'
                    };
                    _this.telemetryService.share(req).toPromise();
                }
            }
        });
        return of(__assign({}, progress));
    };
    ArchiveServiceImpl.prototype.extractZipArchive = function (progress, workspacePath) {
        var _this = this;
        var filePath = progress.filePath;
        return new Observable(function (observer) {
            sbutility.copyFile(FileUtil.getDirecory(filePath), workspacePath + "/", FileUtil.getFileName(filePath), function () {
                _this.zipService.unzip(workspacePath + "/" + FileUtil.getFileName(filePath), { target: workspacePath + '/' }, function () {
                    observer.next();
                    observer.complete();
                }, function (e) { return observer.error(e); });
            }, function (e) {
                console.error(e);
                observer.error(e);
            });
        }).pipe(mapTo(__assign(__assign({}, progress), { task: 'EXTRACTING' })));
    };
    ArchiveServiceImpl.prototype.readManifestFile = function (importProgress, workspacePath, objectTypes) {
        return from(this.fileService.readAsText(workspacePath, 'manifest.json')).pipe(map(function (content) {
            try {
                return JSON.parse(content);
            }
            catch (e) {
                throw new InvalidArchiveError('Invalid manfiest.json');
            }
        }), map(function (manifest) {
            return __assign(__assign({}, importProgress), { progress: (function () {
                    objectTypes.forEach(function (type) {
                        var items = manifest.archive.items.filter(function (i) { return i.objectType === type; });
                        if (!items.length) {
                            throw new InvalidArchiveError('Nothing to import');
                        }
                        importProgress.progress.set(type, {
                            task: 'INITIALISING',
                            pending: items
                        });
                    });
                    return importProgress.progress;
                })(), task: 'VALIDATING' });
        }));
    };
    var ArchiveServiceImpl_1;
    ArchiveServiceImpl.ARCHIVE_ID = 'sunbird.data.archive';
    ArchiveServiceImpl.ARCHIVE_VERSION = '1.0';
    ArchiveServiceImpl = ArchiveServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.FILE_SERVICE)),
        __param(1, inject(InjectionTokens.DB_SERVICE)),
        __param(2, inject(InjectionTokens.TELEMETRY_SERVICE)),
        __param(3, inject(InjectionTokens.ZIP_SERVICE)),
        __param(4, inject(InjectionTokens.DEVICE_INFO)),
        __param(5, inject(InjectionTokens.NETWORK_QUEUE)),
        __param(6, inject(InjectionTokens.SDK_CONFIG)),
        __metadata("design:paramtypes", [Object, DbService, Object, Object, Object, Object, Object])
    ], ArchiveServiceImpl);
    return ArchiveServiceImpl;
}());
export { ArchiveServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjaGl2ZS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXJjaGl2ZS9pbXBsL2FyY2hpdmUtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUlILGlCQUFpQixHQUdwQixNQUFNLElBQUksQ0FBQztBQUNaLE9BQU8sRUFBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQWUsY0FBYyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUVqSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxJQUFJLENBQUM7QUFDdkMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDakYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBdUJ4RDtJQUlJLDRCQUNrRCxXQUF3QixFQUMxQixTQUFvQixFQUNiLGdCQUFrQyxFQUN4QyxVQUFz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bUJBQW1CLENBQUMsQ0FBQzt5QkFDdEQ7d0JBRUQsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUM5QixJQUFJLEVBQUUsY0FBYzs0QkFDcEIsT0FBTyxFQUFFLEtBQUs7eUJBQ2pCLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLGNBQWMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxFQUFFLEVBQ0osSUFBSSxFQUFFLFlBQVksSUFDcEI7UUFDTixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQzs7SUFyVmMsNkJBQVUsR0FBRyxzQkFBc0IsQ0FBQztJQUNwQyxrQ0FBZSxHQUFHLEtBQUssQ0FBQztJQUY5QixrQkFBa0I7UUFEOUIsVUFBVSxFQUFFO1FBTUosV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN6QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNyQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7aURBTG9CLFNBQVM7T0FOM0Qsa0JBQWtCLENBdVY5QjtJQUFELHlCQUFDO0NBQUEsQUF2VkQsSUF1VkM7U0F2Vlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBcmNoaXZlRXhwb3J0UHJvZ3Jlc3MsXG4gICAgQXJjaGl2ZUV4cG9ydFJlcXVlc3QsIEFyY2hpdmVJbXBvcnRQcm9ncmVzcyxcbiAgICBBcmNoaXZlSW1wb3J0UmVxdWVzdCxcbiAgICBBcmNoaXZlT2JqZWN0VHlwZSxcbiAgICBBcmNoaXZlT2JqZWN0RXhwb3J0UHJvZ3Jlc3MsXG4gICAgQXJjaGl2ZVNlcnZpY2UsIEFyY2hpdmVPYmplY3RJbXBvcnRQcm9ncmVzcyxcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtjb21iaW5lTGF0ZXN0LCBmcm9tLCBPYnNlcnZhYmxlLCBjb25jYXQsIGRlZmVyLCB0aHJvd0Vycm9yLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NvbmNhdE1hcCwgbWFwLCBtYXBUbywgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1VuaXF1ZUlkfSBmcm9tICcuLi8uLi9kYi91dGlsL3VuaXF1ZS1pZCc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1RlbGVtZXRyeUV4cG9ydERlbGVnYXRlfSBmcm9tICcuLi9leHBvcnQvaW1wbC90ZWxlbWV0cnktZXhwb3J0LWRlbGVnYXRlJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7UHJvZHVjZXJEYXRhLCBTaGFyZURpcmVjdGlvbiwgU2hhcmVUeXBlLCBUZWxlbWV0cnlTZXJ2aWNlLCBUZWxlbWV0cnlTaGFyZVJlcXVlc3R9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge1ppcFNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvemlwL2RlZi96aXAtc2VydmljZSc7XG5pbXBvcnQge0ludmFsaWRSZXF1ZXN0RXJyb3J9IGZyb20gJy4uJztcbmltcG9ydCB7VGVsZW1ldHJ5SW1wb3J0RGVsZWdhdGV9IGZyb20gJy4uL2ltcG9ydC9pbXBsL3RlbGVtZXRyeS1pbXBvcnQtZGVsZWdhdGUnO1xuaW1wb3J0IHtJbnZhbGlkQXJjaGl2ZUVycm9yfSBmcm9tICcuLi9pbXBvcnQvZXJyb3IvaW52YWxpZC1hcmNoaXZlLWVycm9yJztcbmltcG9ydCB7VGVsZW1ldHJ5QXJjaGl2ZVBhY2thZ2VNZXRhfSBmcm9tICcuLi9leHBvcnQvZGVmL3RlbGVtZXRyeS1hcmNoaXZlLXBhY2thZ2UtbWV0YSc7XG5pbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvdXRpbC9maWxlLXV0aWwnO1xuaW1wb3J0IHtEZXZpY2VJbmZvfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge05ldHdvcmtRdWV1ZX0gZnJvbSAnLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuXG5pbnRlcmZhY2UgQXJjaGl2ZU1hbmlmZXN0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcjogc3RyaW5nO1xuICAgIHRzOiBzdHJpbmc7XG4gICAgcHJvZHVjZXI6IFByb2R1Y2VyRGF0YTtcbiAgICBhcmNoaXZlOiB7XG4gICAgICAgIGNvdW50OiBudW1iZXI7XG4gICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiBBcmNoaXZlT2JqZWN0VHlwZVxuICAgICAgICAgICAgZmlsZTogc3RyaW5nO1xuICAgICAgICAgICAgY29udGVudEVuY29kaW5nOiAnaWRlbnRpdHknIHwgJ2d6aXAnO1xuICAgICAgICAgICAgc2l6ZTogbnVtYmVyO1xuICAgICAgICAgICAgZXhwbG9kZWRTaXplOiBudW1iZXI7XG4gICAgICAgIH1bXTtcbiAgICB9O1xufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXJjaGl2ZVNlcnZpY2VJbXBsIGltcGxlbWVudHMgQXJjaGl2ZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIEFSQ0hJVkVfSUQgPSAnc3VuYmlyZC5kYXRhLmFyY2hpdmUnO1xuICAgIHByaXZhdGUgc3RhdGljIEFSQ0hJVkVfVkVSU0lPTiA9ICcxLjAnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZJTEVfU0VSVklDRSkgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlRFTEVNRVRSWV9TRVJWSUNFKSBwcml2YXRlIHRlbGVtZXRyeVNlcnZpY2U6IFRlbGVtZXRyeVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlpJUF9TRVJWSUNFKSBwcml2YXRlIHppcFNlcnZpY2U6IFppcFNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKSBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm8sXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLk5FVFdPUktfUVVFVUUpIHByaXZhdGUgbmV0d29ya1F1ZXVlOiBOZXR3b3JrUXVldWUsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWdcbiAgICApIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZWR1Y2VPYmplY3RQcm9ncmVzc1RvQXJjaGl2ZU9iamVjdEV4cG9ydFByb2dyZXNzKFxuICAgICAgICByZXN1bHRzOiB7IHR5cGU6IEFyY2hpdmVPYmplY3RUeXBlLCBwcm9ncmVzczogQXJjaGl2ZU9iamVjdEV4cG9ydFByb2dyZXNzIH1bXVxuICAgICk6IE1hcDxBcmNoaXZlT2JqZWN0VHlwZSwgQXJjaGl2ZU9iamVjdEV4cG9ydFByb2dyZXNzPiB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWNjLCB7dHlwZSwgcHJvZ3Jlc3N9KSA9PiB7XG4gICAgICAgICAgICBhY2Muc2V0KHR5cGUsIHByb2dyZXNzKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIG5ldyBNYXA8QXJjaGl2ZU9iamVjdFR5cGUsIEFyY2hpdmVPYmplY3RFeHBvcnRQcm9ncmVzcz4oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVkdWNlT2JqZWN0UHJvZ3Jlc3NUb0FyY2hpdmVPYmplY3RJbXBvcnRQcm9ncmVzcyhcbiAgICAgICAgcmVzdWx0czogeyB0eXBlOiBBcmNoaXZlT2JqZWN0VHlwZSwgcHJvZ3Jlc3M6IEFyY2hpdmVPYmplY3RJbXBvcnRQcm9ncmVzcyB9W10sXG4gICAgKTogTWFwPEFyY2hpdmVPYmplY3RUeXBlLCBBcmNoaXZlT2JqZWN0SW1wb3J0UHJvZ3Jlc3M+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKChhY2MsIHt0eXBlLCBwcm9ncmVzc30pID0+IHtcbiAgICAgICAgICAgIGFjYy5zZXQodHlwZSwgcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgbmV3IE1hcDxBcmNoaXZlT2JqZWN0VHlwZSwgQXJjaGl2ZU9iamVjdEltcG9ydFByb2dyZXNzPigpKTtcbiAgICB9XG5cbiAgICBleHBvcnQoZXhwb3J0UmVxdWVzdDogQXJjaGl2ZUV4cG9ydFJlcXVlc3QpOiBPYnNlcnZhYmxlPEFyY2hpdmVFeHBvcnRQcm9ncmVzcz4ge1xuICAgICAgICBjb25zdCBmb2xkZXJQYXRoID0gKHdpbmRvdy5kZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gXCJpb3NcIikgPyBjb3Jkb3ZhLmZpbGUuZG9jdW1lbnRzRGlyZWN0b3J5IDogY29yZG92YS5maWxlLmV4dGVybmFsQ2FjaGVEaXJlY3Rvcnk7XG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZVBhdGggPSBgJHtmb2xkZXJQYXRofSR7VW5pcXVlSWQuZ2VuZXJhdGVVbmlxdWVJZCgpfWA7XG4gICAgICAgIGxldCBsYXN0UmVzdWx0OiBBcmNoaXZlRXhwb3J0UHJvZ3Jlc3MgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCFleHBvcnRSZXF1ZXN0Lm9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgSW52YWxpZFJlcXVlc3RFcnJvcignTm8gYXJjaGl2ZSBvYmplY3RzIHRvIGV4cG9ydCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25jYXQoXG4gICAgICAgICAgICBkZWZlcigoKSA9PiBmcm9tKHRoaXMuZmlsZVNlcnZpY2UuY3JlYXRlRGlyKHdvcmtzcGFjZVBhdGgsIGZhbHNlKSkpLnBpcGUoXG4gICAgICAgICAgICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRSZXF1ZXN0Lm9iamVjdHMubWFwPE9ic2VydmFibGU8eyB0eXBlOiBBcmNoaXZlT2JqZWN0VHlwZSwgcHJvZ3Jlc3M6IEFyY2hpdmVPYmplY3RFeHBvcnRQcm9ncmVzcyB9Pj4ob2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQXJjaGl2ZU9iamVjdFR5cGUuQ09OVEVOVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBBcmNoaXZlT2JqZWN0VHlwZS5QUk9GSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBiZSBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEFyY2hpdmVPYmplY3RUeXBlLlRFTEVNRVRSWTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVGVsZW1ldHJ5RXhwb3J0RGVsZWdhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuZXhwb3J0KHsgZmlsZVBhdGg6IGV4cG9ydFJlcXVlc3QuZmlsZVBhdGggfSwgeyB3b3Jrc3BhY2VQYXRoIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChwcm9ncmVzcykgPT4gKHsgdHlwZTogQXJjaGl2ZU9iamVjdFR5cGUuVEVMRU1FVFJZLCBwcm9ncmVzczogcHJvZ3Jlc3MgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChyZXN1bHRzOiB7IHR5cGU6IEFyY2hpdmVPYmplY3RUeXBlLCBwcm9ncmVzczogQXJjaGl2ZU9iamVjdEV4cG9ydFByb2dyZXNzIH1bXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFzazogJ0JVSUxESU5HJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBBcmNoaXZlU2VydmljZUltcGwucmVkdWNlT2JqZWN0UHJvZ3Jlc3NUb0FyY2hpdmVPYmplY3RFeHBvcnRQcm9ncmVzcyhyZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRhcCgocmVzdWx0cykgPT4gbGFzdFJlc3VsdCA9IHJlc3VsdHMpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgZGVmZXIoKCkgPT4gdGhpcy5nZW5lcmF0ZU1hbmlmZXN0RmlsZShsYXN0UmVzdWx0ISwgd29ya3NwYWNlUGF0aCkpLFxuICAgICAgICAgICAgZGVmZXIoKCkgPT4gdGhpcy5nZW5lcmF0ZVppcEFyY2hpdmUobGFzdFJlc3VsdCEsIHdvcmtzcGFjZVBhdGgpKSxcbiAgICAgICAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2VuZXJhdGVFeHBvcnRUZWxlbWV0cmllcyhsYXN0UmVzdWx0ISwgd29ya3NwYWNlUGF0aCkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIHRhcCgocmVzdWx0cykgPT4gbGFzdFJlc3VsdCA9IHJlc3VsdHMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUV4cG9ydFRlbGVtZXRyaWVzKHByb2dyZXNzOiBBcmNoaXZlRXhwb3J0UHJvZ3Jlc3MsIHdvcmtzcGFjZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8QXJjaGl2ZUV4cG9ydFByb2dyZXNzPiB7XG4gICAgICAgIHByb2dyZXNzLnByb2dyZXNzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICBjYXNlIEFyY2hpdmVPYmplY3RUeXBlLkNPTlRFTlQ6XG4gICAgICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgIGNhc2UgQXJjaGl2ZU9iamVjdFR5cGUuUFJPRklMRTpcbiAgICAgICAgICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBiZSBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgY2FzZSBBcmNoaXZlT2JqZWN0VHlwZS5URUxFTUVUUlk6IHtcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBpdGVtcyA9ICh2IGFzIEFyY2hpdmVPYmplY3RFeHBvcnRQcm9ncmVzczxUZWxlbWV0cnlQYWNrYWdlTWV0YT4pLmNvbXBsZXRlZC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiBTaGFyZUl0ZW1UeXBlLlRFTEVNRVRSWSxcbiAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIG9yaWdpbjogdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCksXG4gICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZGVudGlmaWVyOiBlbnRyeS5taWQsXG4gICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwa2dWZXJzaW9uOiAxLFxuICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdHJhbnNmZXJDb3VudDogZW50cnkuZXZlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzaXplOiBlbnRyeS5zaXplICsgJydcbiAgICAgICAgICAgICAgICAgICAvLyAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcTogVGVsZW1ldHJ5U2hhcmVSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICBkaXI6IFNoYXJlRGlyZWN0aW9uLk9VVCxcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogU2hhcmVUeXBlLkZJTEUsXG4gICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgZW52OiAnc2RrJ1xuICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICB0aGlzLnRlbGVtZXRyeVNlcnZpY2Uuc2hhcmUocmVxKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2Yoe1xuICAgICAgICAgICAgLi4ucHJvZ3Jlc3MsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVaaXBBcmNoaXZlKHByb2dyZXNzOiBBcmNoaXZlRXhwb3J0UHJvZ3Jlc3MsIHdvcmtzcGFjZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8QXJjaGl2ZUV4cG9ydFByb2dyZXNzPiB7XG4gICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKSA/IGNvcmRvdmEuZmlsZS5kb2N1bWVudHNEaXJlY3RvcnkgOiBjb3Jkb3ZhLmZpbGUuZXh0ZXJuYWxDYWNoZURpcmVjdG9yeTtcbiAgICAgICAgY29uc3QgemlwRmlsZVBhdGggPSBgJHtmb2xkZXJQYXRofWFyY2hpdmUtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LnppcGA7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuemlwU2VydmljZS56aXAod29ya3NwYWNlUGF0aCwgeyB0YXJnZXQ6IHppcEZpbGVQYXRoIH0sIFtdLCBbXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8oe1xuICAgICAgICAgICAgICAgIC4uLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIHRhc2s6ICdDT01QTEVURScsXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IHppcEZpbGVQYXRoXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVNYW5pZmVzdEZpbGUoeyBwcm9ncmVzc306IEFyY2hpdmVFeHBvcnRQcm9ncmVzcywgd29ya3NwYWNlUGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcmNoaXZlRXhwb3J0UHJvZ3Jlc3M+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVsZW1ldHJ5U2VydmljZS5idWlsZENvbnRleHQoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChjKSA9PiBjLnBkYXRhKSxcbiAgICAgICAgICAgIGNvbmNhdE1hcCgocHJvZHVjZXJEYXRhOiBQcm9kdWNlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmbGF0dGVuZWRJdGVtcyA9IEFycmF5LmZyb20ocHJvZ3Jlc3MuZW50cmllcygpKS5yZWR1Y2U8e1xuICAgICAgICAgICAgICAgICAgICBmaWxlOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbmNvZGluZzogJ2lkZW50aXR5JyB8ICdnemlwJztcbiAgICAgICAgICAgICAgICB9W10+KChhY2MsIFtvYmplY3RUeXBlLCBvYmplY3RQcm9ncmVzc10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQob2JqZWN0UHJvZ3Jlc3MuY29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmZpbGVTZXJ2aWNlLndyaXRlRmlsZShcbiAgICAgICAgICAgICAgICAgICAgd29ya3NwYWNlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJ21hbmlmZXN0Lmpzb24nLFxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogQXJjaGl2ZVNlcnZpY2VJbXBsLkFSQ0hJVkVfSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXI6IEFyY2hpdmVTZXJ2aWNlSW1wbC5BUkNISVZFX1ZFUlNJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB0czogKG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWNlcjogcHJvZHVjZXJEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJjaGl2ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBmbGF0dGVuZWRJdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGZsYXR0ZW5lZEl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gYXMgQXJjaGl2ZU1hbmlmZXN0KSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcFRvKHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB0YXNrOiAnQlVJTERJTkdfTUFOSUZFU1QnXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGltcG9ydChpbXBvcnRSZXF1ZXN0OiBBcmNoaXZlSW1wb3J0UmVxdWVzdCk6IE9ic2VydmFibGU8QXJjaGl2ZUltcG9ydFByb2dyZXNzPiB7XG4gICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSBcImlvc1wiKSA/IGNvcmRvdmEuZmlsZS5kb2N1bWVudHNEaXJlY3RvcnkgOiBjb3Jkb3ZhLmZpbGUuZXh0ZXJuYWxDYWNoZURpcmVjdG9yeTtcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlUGF0aCA9IGAke2ZvbGRlclBhdGh9JHtVbmlxdWVJZC5nZW5lcmF0ZVVuaXF1ZUlkKCl9YDtcblxuICAgICAgICBpZiAoIWltcG9ydFJlcXVlc3Qub2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBJbnZhbGlkUmVxdWVzdEVycm9yKCdObyBhcmNoaXZlIG9iamVjdHMgdG8gZXhwb3J0JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxhc3RSZXN1bHQ6IEFyY2hpdmVJbXBvcnRQcm9ncmVzcyA9IHtcbiAgICAgICAgICAgIHRhc2s6ICcnLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IG5ldyBNYXA8QXJjaGl2ZU9iamVjdFR5cGUsIEFyY2hpdmVPYmplY3RJbXBvcnRQcm9ncmVzcz4oKSxcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbXBvcnRSZXF1ZXN0LmZpbGVQYXRoXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGNvbmNhdChcbiAgICAgICAgICAgIGRlZmVyKCgpID0+IGZyb20odGhpcy5maWxlU2VydmljZS5jcmVhdGVEaXIod29ya3NwYWNlUGF0aCwgZmFsc2UpKSkucGlwZShcbiAgICAgICAgICAgICAgICBjb25jYXRNYXAoKCkgPT4gdGhpcy5leHRyYWN0WmlwQXJjaGl2ZShsYXN0UmVzdWx0LCB3b3Jrc3BhY2VQYXRoKSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB0aGlzLnJlYWRNYW5pZmVzdEZpbGUobGFzdFJlc3VsdCwgd29ya3NwYWNlUGF0aCwgaW1wb3J0UmVxdWVzdC5vYmplY3RzLm1hcChvID0+IG8udHlwZSkpKSxcbiAgICAgICAgICAgIGRlZmVyKCgpID0+IHRoaXMuZ2VuZXJhdGVJbXBvcnRUZWxlbWV0cmllcyhsYXN0UmVzdWx0LCB3b3Jrc3BhY2VQYXRoKSksXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydFJlcXVlc3Qub2JqZWN0cy5tYXA8T2JzZXJ2YWJsZTx7IHR5cGU6IEFyY2hpdmVPYmplY3RUeXBlLCBwcm9ncmVzczogQXJjaGl2ZU9iamVjdEltcG9ydFByb2dyZXNzIH0+PihvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3QudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQXJjaGl2ZU9iamVjdFR5cGUuQ09OVEVOVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvIGJlIGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBBcmNoaXZlT2JqZWN0VHlwZS5QUk9GSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEFyY2hpdmVPYmplY3RUeXBlLlRFTEVNRVRSWTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUZWxlbWV0cnlJbXBvcnREZWxlZ2F0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV0d29ya1F1ZXVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZGtDb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pbXBvcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IGltcG9ydFJlcXVlc3QuZmlsZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya3NwYWNlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBsYXN0UmVzdWx0LnByb2dyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldChBcmNoaXZlT2JqZWN0VHlwZS5URUxFTUVUUlkpIS5wZW5kaW5nIGFzIFRlbGVtZXRyeUFyY2hpdmVQYWNrYWdlTWV0YVtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKHByb2dyZXNzKSA9PiAoeyB0eXBlOiBBcmNoaXZlT2JqZWN0VHlwZS5URUxFTUVUUlksIHByb2dyZXNzOiBwcm9ncmVzcyB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzdWx0czogeyB0eXBlOiBBcmNoaXZlT2JqZWN0VHlwZSwgcHJvZ3Jlc3M6IEFyY2hpdmVPYmplY3RJbXBvcnRQcm9ncmVzcyB9W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzazogJ0lNUE9SVElORycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IEFyY2hpdmVTZXJ2aWNlSW1wbC5yZWR1Y2VPYmplY3RQcm9ncmVzc1RvQXJjaGl2ZU9iamVjdEltcG9ydFByb2dyZXNzKHJlc3VsdHMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvZih7XG4gICAgICAgICAgICAgICAgLi4ubGFzdFJlc3VsdCxcbiAgICAgICAgICAgICAgICB0YXNrOiAnQ09NUExFVEUnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgdGFwKChyZXN1bHRzKSA9PiBsYXN0UmVzdWx0ID0gcmVzdWx0cylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlSW1wb3J0VGVsZW1ldHJpZXMocHJvZ3Jlc3M6IEFyY2hpdmVJbXBvcnRQcm9ncmVzcywgd29ya3NwYWNlUGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcmNoaXZlSW1wb3J0UHJvZ3Jlc3M+IHtcbiAgICAgICAgcHJvZ3Jlc3MucHJvZ3Jlc3MuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBBcmNoaXZlT2JqZWN0VHlwZS5DT05URU5UOlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG8gYmUgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICBjYXNlIEFyY2hpdmVPYmplY3RUeXBlLlBST0ZJTEU6XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBiZSBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIGNhc2UgQXJjaGl2ZU9iamVjdFR5cGUuVEVMRU1FVFJZOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGl0ZW1zID0gKHYgYXMgQXJjaGl2ZU9iamVjdEltcG9ydFByb2dyZXNzPFRlbGVtZXRyeVBhY2thZ2VNZXRhPikucGVuZGluZy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6IFNoYXJlSXRlbVR5cGUuVEVMRU1FVFJZLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIG9yaWdpbjogdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCksXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWRlbnRpZmllcjogZW50cnkubWlkLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBrZ1ZlcnNpb246IDEsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdHJhbnNmZXJDb3VudDogZW50cnkuZXZlbnRzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2l6ZTogZW50cnkuc2l6ZSArICcnXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXE6IFRlbGVtZXRyeVNoYXJlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogU2hhcmVEaXJlY3Rpb24uSU4sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBTaGFyZVR5cGUuRklMRS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnY6ICdzZGsnXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLnNoYXJlKHJlcSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2Yoe1xuICAgICAgICAgICAgLi4ucHJvZ3Jlc3MsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXh0cmFjdFppcEFyY2hpdmUocHJvZ3Jlc3M6IEFyY2hpdmVJbXBvcnRQcm9ncmVzcywgd29ya3NwYWNlUGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcmNoaXZlSW1wb3J0UHJvZ3Jlc3M+IHtcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwcm9ncmVzcy5maWxlUGF0aCE7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5jb3B5RmlsZShcbiAgICAgICAgICAgICAgICBGaWxlVXRpbC5nZXREaXJlY29yeShmaWxlUGF0aCksXG4gICAgICAgICAgICAgICAgYCR7d29ya3NwYWNlUGF0aH0vYCxcbiAgICAgICAgICAgICAgICBGaWxlVXRpbC5nZXRGaWxlTmFtZShmaWxlUGF0aCksXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnppcFNlcnZpY2UudW56aXAoXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHt3b3Jrc3BhY2VQYXRofS8ke0ZpbGVVdGlsLmdldEZpbGVOYW1lKGZpbGVQYXRoKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0YXJnZXQ6IHdvcmtzcGFjZVBhdGggKyAnLycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiBvYnNlcnZlci5lcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKHtcbiAgICAgICAgICAgICAgICAuLi5wcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB0YXNrOiAnRVhUUkFDVElORycsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZE1hbmlmZXN0RmlsZShcbiAgICAgICAgaW1wb3J0UHJvZ3Jlc3M6IEFyY2hpdmVJbXBvcnRQcm9ncmVzcyxcbiAgICAgICAgd29ya3NwYWNlUGF0aDogc3RyaW5nLFxuICAgICAgICBvYmplY3RUeXBlczogQXJjaGl2ZU9iamVjdFR5cGVbXVxuICAgICk6IE9ic2VydmFibGU8QXJjaGl2ZUltcG9ydFByb2dyZXNzPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZmlsZVNlcnZpY2UucmVhZEFzVGV4dCh3b3Jrc3BhY2VQYXRoLCAnbWFuaWZlc3QuanNvbicpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEFyY2hpdmVFcnJvcignSW52YWxpZCBtYW5maWVzdC5qc29uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKG1hbmlmZXN0OiBBcmNoaXZlTWFuaWZlc3QpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5pbXBvcnRQcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBtYW5pZmVzdC5hcmNoaXZlLml0ZW1zLmZpbHRlcigoaSkgPT4gaS5vYmplY3RUeXBlID09PSB0eXBlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJjaGl2ZUVycm9yKCdOb3RoaW5nIHRvIGltcG9ydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydFByb2dyZXNzLnByb2dyZXNzLnNldCh0eXBlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2s6ICdJTklUSUFMSVNJTkcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nOiBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1wb3J0UHJvZ3Jlc3MucHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICAgICAgICAgIHRhc2s6ICdWQUxJREFUSU5HJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==