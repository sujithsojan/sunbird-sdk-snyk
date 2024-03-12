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
import { ArchiveObjectType } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectNotFoundError } from '../error/object-not-found-error';
import { NetworkQueueEntry, NetworkQueueType } from '../../../api/network-queue';
var TelemetryExportDelegate = /** @class */ (function () {
    function TelemetryExportDelegate(dbService, fileService) {
        this.dbService = dbService;
        this.fileService = fileService;
    }
    TelemetryExportDelegate.prototype.export = function (request, context) {
        var _this = this;
        return new Observable(function (observer) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var archivePackageProgress, e_1, messageIds, currentMessageId, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            archivePackageProgress = {
                                task: '',
                                completed: [],
                            };
                            observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'VALIDATING' }));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.validate()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            observer.error(e_1);
                            return [2 /*return*/];
                        case 4:
                            observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'PREPARING' }));
                            return [4 /*yield*/, this.prepare(context)];
                        case 5:
                            _a.sent();
                            observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'INITIALIZING' }));
                            return [4 /*yield*/, this.createWorkspace()];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.getMessageIds()];
                        case 7:
                            messageIds = _a.sent();
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, 12, , 13]);
                            _a.label = 9;
                        case 9:
                            if (!messageIds.length) return [3 /*break*/, 11];
                            currentMessageId = messageIds.pop();
                            return [4 /*yield*/, this.processBatch(currentMessageId).then(function (result) {
                                    if (!result) {
                                        observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'SKIPPING_BATCH' }));
                                        return;
                                    }
                                    var file = result.file, mid = result.mid, eventsCount = result.eventsCount, size = result.size;
                                    observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'BUILDING_BATCH', completed: __spreadArrays(archivePackageProgress.completed, [
                                            {
                                                file: file,
                                                mid: mid,
                                                eventsCount: eventsCount,
                                                size: size,
                                                objectType: ArchiveObjectType.TELEMETRY,
                                                contentEncoding: 'gzip',
                                                explodedSize: -1
                                            }
                                        ]) }));
                                })];
                        case 10:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            e_2 = _a.sent();
                            observer.error(e_2);
                            return [2 /*return*/];
                        case 13:
                            observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'OBJECT_ARCHIVE_COMPLETE' }));
                            observer.complete();
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
    };
    TelemetryExportDelegate.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var batchCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.execute(("\n            SELECT count(*) as COUNT FROM " + NetworkQueueEntry.TABLE_NAME + " WHERE " + NetworkQueueEntry.COLUMN_NAME_TYPE + " = '" + NetworkQueueType.TELEMETRY + "'\n        ").trim()).pipe(map(function (result) {
                            return result && result[0] && (result[0]['COUNT']);
                        })).toPromise()];
                    case 1:
                        batchCount = _a.sent();
                        if (!batchCount) {
                            throw new ObjectNotFoundError('No telemetry to export');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TelemetryExportDelegate.prototype.prepare = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.workspaceSubPath = "" + context.workspacePath;
                return [2 /*return*/];
            });
        });
    };
    TelemetryExportDelegate.prototype.createWorkspace = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.createDir(this.workspaceSubPath, false)];
            });
        });
    };
    TelemetryExportDelegate.prototype.getMessageIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.read({
                            table: NetworkQueueEntry.TABLE_NAME,
                            columns: [NetworkQueueEntry.COLUMN_NAME_MSG_ID],
                            selection: NetworkQueueEntry.COLUMN_NAME_TYPE + " = ?",
                            selectionArgs: [NetworkQueueType.TELEMETRY],
                            distinct: true
                        }).toPromise()];
                    case 1:
                        entries = _a.sent();
                        return [2 /*return*/, entries.map(function (e) { return e[NetworkQueueEntry.COLUMN_NAME_MSG_ID]; })];
                }
            });
        });
    };
    TelemetryExportDelegate.prototype.processBatch = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var batch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.read({
                            table: NetworkQueueEntry.TABLE_NAME,
                            selection: NetworkQueueEntry.COLUMN_NAME_MSG_ID + " = ? AND " + NetworkQueueEntry.COLUMN_NAME_TYPE + " = ?",
                            selectionArgs: [messageId, NetworkQueueType.TELEMETRY]
                        }).toPromise()];
                    case 1:
                        batch = (_a.sent())[0];
                        if (!batch) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fileService.writeFile(this.workspaceSubPath, batch[NetworkQueueEntry.COLUMN_NAME_MSG_ID], batch[NetworkQueueEntry.COLUMN_NAME_DATA], {
                                replace: true
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                size: [NetworkQueueEntry.COLUMN_NAME_DATA].length,
                                eventsCount: batch[NetworkQueueEntry.COLUMN_NAME_NUMBER_OF_ITEM],
                                mid: batch[NetworkQueueEntry.COLUMN_NAME_MSG_ID],
                                file: "" + batch[NetworkQueueEntry.COLUMN_NAME_MSG_ID]
                            }];
                }
            });
        });
    };
    return TelemetryExportDelegate;
}());
export { TelemetryExportDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LWV4cG9ydC1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcmNoaXZlL2V4cG9ydC9pbXBsL3RlbGVtZXRyeS1leHBvcnQtZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUF1QixpQkFBaUIsRUFBMkQsTUFBTSxPQUFPLENBQUM7QUFHeEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNoQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFL0U7SUFHSSxpQ0FDWSxTQUFvQixFQUNwQixXQUF3QjtRQUR4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBRXBDLENBQUM7SUFFRCx3Q0FBTSxHQUFOLFVBQU8sT0FBK0MsRUFBRSxPQUFvQztRQUE1RixpQkFpRkM7UUFoRkcsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQVE7WUFDM0IsQ0FBQzs7Ozs7NEJBQ08sc0JBQXNCLEdBQTZEO2dDQUNuRixJQUFJLEVBQUUsRUFBRTtnQ0FDUixTQUFTLEVBQUUsRUFBRTs2QkFDaEIsQ0FBQzs0QkFFRixRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQix5QkFDN0Isc0JBQXNCLEtBQ3pCLElBQUksRUFBRSxZQUFZLEdBQ3JCLENBQUMsQ0FBQzs7Ozs0QkFHQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7OzRCQUFyQixTQUFxQixDQUFDOzs7OzRCQUV0QixRQUFRLENBQUMsS0FBSyxDQUFD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QUFDO3dCQUVsQixJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNSLHNCQUFPO3lCQUNWO3dCQUVELHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMzQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFDekM7Z0NBQ0ksT0FBTyxFQUFFLElBQUk7NkJBQ2hCLENBQ0osRUFBQTs7d0JBUEQsU0FPQyxDQUFDO3dCQUVGLHNCQUFPO2dDQUNILElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTTtnQ0FDakQsV0FBVyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsQ0FBQztnQ0FDaEUsR0FBRyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQztnQ0FDaEQsSUFBSSxFQUFFLEtBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFHOzZCQUN6RCxFQUFDOzs7O0tBQ0w7SUFDTCw4QkFBQztBQUFELENBQUMsQUF6SkQsSUF5SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FyY2hpdmVFeHBvcnREZWxlZ2F0ZX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtBcmNoaXZlRXhwb3J0UmVxdWVzdCwgQXJjaGl2ZU9iamVjdFR5cGUsIEFyY2hpdmVQYWNrYWdlRXhwb3J0Q29udGV4dCwgQXJjaGl2ZU9iamVjdEV4cG9ydFByb2dyZXNzfSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1RlbGVtZXRyeUFyY2hpdmVQYWNrYWdlTWV0YX0gZnJvbSAnLi4vZGVmL3RlbGVtZXRyeS1hcmNoaXZlLXBhY2thZ2UtbWV0YSc7XG5pbXBvcnQge09iamVjdE5vdEZvdW5kRXJyb3J9IGZyb20gJy4uL2Vycm9yL29iamVjdC1ub3QtZm91bmQtZXJyb3InO1xuaW1wb3J0IHtOZXR3b3JrUXVldWVFbnRyeSwgTmV0d29ya1F1ZXVlVHlwZX0gZnJvbSAnLi4vLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuXG5leHBvcnQgY2xhc3MgVGVsZW1ldHJ5RXhwb3J0RGVsZWdhdGUgaW1wbGVtZW50cyBBcmNoaXZlRXhwb3J0RGVsZWdhdGUge1xuICAgIHByaXZhdGUgd29ya3NwYWNlU3ViUGF0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIGV4cG9ydChyZXF1ZXN0OiBQaWNrPEFyY2hpdmVFeHBvcnRSZXF1ZXN0LCAnZmlsZVBhdGgnPiwgY29udGV4dDogQXJjaGl2ZVBhY2thZ2VFeHBvcnRDb250ZXh0KTogT2JzZXJ2YWJsZTxBcmNoaXZlT2JqZWN0RXhwb3J0UHJvZ3Jlc3M8VGVsZW1ldHJ5QXJjaGl2ZVBhY2thZ2VNZXRhPj4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhcmNoaXZlUGFja2FnZVByb2dyZXNzOiBBcmNoaXZlT2JqZWN0RXhwb3J0UHJvZ3Jlc3M8VGVsZW1ldHJ5QXJjaGl2ZVBhY2thZ2VNZXRhPiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGFzazogJycsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogW10sXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgdGFzazogJ1ZBTElEQVRJTkcnLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgIHRhc2s6ICdQUkVQQVJJTkcnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnByZXBhcmUoY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgIHRhc2s6ICdJTklUSUFMSVpJTkcnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdvcmtzcGFjZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZUlkcyA9IGF3YWl0IHRoaXMuZ2V0TWVzc2FnZUlkcygpO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG1lc3NhZ2VJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TWVzc2FnZUlkID0gbWVzc2FnZUlkcy5wb3AoKSE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnByb2Nlc3NCYXRjaChjdXJyZW50TWVzc2FnZUlkKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5hcmNoaXZlUGFja2FnZVByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzazogJ1NLSVBQSU5HX0JBVENIJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtmaWxlLCBtaWQsIGV2ZW50c0NvdW50LCBzaXplfSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzazogJ0JVSUxESU5HX0JBVENIJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5hcmNoaXZlUGFja2FnZVByb2dyZXNzLmNvbXBsZXRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEFyY2hpdmVPYmplY3RUeXBlLlRFTEVNRVRSWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RW5jb2Rpbmc6ICdnemlwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBsb2RlZFNpemU6IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgdGFzazogJ09CSkVDVF9BUkNISVZFX0NPTVBMRVRFJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHZhbGlkYXRlKCkge1xuICAgICAgICBjb25zdCBiYXRjaENvdW50ID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShgXG4gICAgICAgICAgICBTRUxFQ1QgY291bnQoKikgYXMgQ09VTlQgRlJPTSAke05ldHdvcmtRdWV1ZUVudHJ5LlRBQkxFX05BTUV9IFdIRVJFICR7TmV0d29ya1F1ZXVlRW50cnkuQ09MVU1OX05BTUVfVFlQRX0gPSAnJHtOZXR3b3JrUXVldWVUeXBlLlRFTEVNRVRSWX0nXG4gICAgICAgIGAudHJpbSgpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdFswXSAmJiAocmVzdWx0WzBdWydDT1VOVCddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgaWYgKCFiYXRjaENvdW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0Tm90Rm91bmRFcnJvcignTm8gdGVsZW1ldHJ5IHRvIGV4cG9ydCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBwcmVwYXJlKGNvbnRleHQ6IEFyY2hpdmVQYWNrYWdlRXhwb3J0Q29udGV4dCkge1xuICAgICAgICB0aGlzLndvcmtzcGFjZVN1YlBhdGggPSBgJHtjb250ZXh0LndvcmtzcGFjZVBhdGh9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVdvcmtzcGFjZSgpOiBQcm9taXNlPERpcmVjdG9yeUVudHJ5PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVTZXJ2aWNlLmNyZWF0ZURpcih0aGlzLndvcmtzcGFjZVN1YlBhdGgsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldE1lc3NhZ2VJZHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogTmV0d29ya1F1ZXVlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtOZXR3b3JrUXVldWVFbnRyeS5DT0xVTU5fTkFNRV9NU0dfSURdLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtOZXR3b3JrUXVldWVFbnRyeS5DT0xVTU5fTkFNRV9UWVBFfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW05ldHdvcmtRdWV1ZVR5cGUuVEVMRU1FVFJZXSxcbiAgICAgICAgICAgIGRpc3RpbmN0OiB0cnVlXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiBlbnRyaWVzLm1hcCgoZSkgPT4gZVtOZXR3b3JrUXVldWVFbnRyeS5DT0xVTU5fTkFNRV9NU0dfSURdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHByb2Nlc3NCYXRjaChtZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8eyBmaWxlOiBzdHJpbmcsIG1pZDogc3RyaW5nLCBldmVudHNDb3VudDogbnVtYmVyLCBzaXplOiBudW1iZXIgfSB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBiYXRjaDogTmV0d29ya1F1ZXVlRW50cnkuU2NoZW1hTWFwID0gKGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IE5ldHdvcmtRdWV1ZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IGAke05ldHdvcmtRdWV1ZUVudHJ5LkNPTFVNTl9OQU1FX01TR19JRH0gPSA/IEFORCAke05ldHdvcmtRdWV1ZUVudHJ5LkNPTFVNTl9OQU1FX1RZUEV9ID0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbbWVzc2FnZUlkLCBOZXR3b3JrUXVldWVUeXBlLlRFTEVNRVRSWV1cbiAgICAgICAgfSkudG9Qcm9taXNlKCkpWzBdO1xuXG4gICAgICAgIGlmICghYmF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuZmlsZVNlcnZpY2Uud3JpdGVGaWxlKFxuICAgICAgICAgICAgdGhpcy53b3Jrc3BhY2VTdWJQYXRoLFxuICAgICAgICAgICAgYmF0Y2hbTmV0d29ya1F1ZXVlRW50cnkuQ09MVU1OX05BTUVfTVNHX0lEXSxcbiAgICAgICAgICAgIGJhdGNoW05ldHdvcmtRdWV1ZUVudHJ5LkNPTFVNTl9OQU1FX0RBVEFdLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlcGxhY2U6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2l6ZTogW05ldHdvcmtRdWV1ZUVudHJ5LkNPTFVNTl9OQU1FX0RBVEFdLmxlbmd0aCxcbiAgICAgICAgICAgIGV2ZW50c0NvdW50OiBiYXRjaFtOZXR3b3JrUXVldWVFbnRyeS5DT0xVTU5fTkFNRV9OVU1CRVJfT0ZfSVRFTV0sXG4gICAgICAgICAgICBtaWQ6IGJhdGNoW05ldHdvcmtRdWV1ZUVudHJ5LkNPTFVNTl9OQU1FX01TR19JRF0sXG4gICAgICAgICAgICBmaWxlOiBgJHtiYXRjaFtOZXR3b3JrUXVldWVFbnRyeS5DT0xVTU5fTkFNRV9NU0dfSURdfWBcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=