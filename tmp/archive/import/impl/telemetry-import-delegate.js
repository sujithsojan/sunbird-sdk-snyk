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
import { Observable } from 'rxjs';
import { UnknownObjectError } from '../error/unknown-object-error';
import { NetworkQueueType } from '../../../api/network-queue';
import { NetworkRequestHandler } from '../../../api/network-queue/handlers/network-request-handler';
var TelemetryImportDelegate = /** @class */ (function () {
    function TelemetryImportDelegate(dbService, fileService, networkQueue, sdkConfig) {
        this.dbService = dbService;
        this.fileService = fileService;
        this.networkQueue = networkQueue;
        this.sdkConfig = sdkConfig;
    }
    TelemetryImportDelegate.prototype.import = function (request, context) {
        var _this = this;
        return new Observable(function (observer) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var archivePackageProgress, items, currentItem, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            archivePackageProgress = {
                                task: '',
                                pending: [],
                            };
                            items = context.items;
                            observer.next({
                                task: 'PREPARING',
                                pending: __spreadArrays(items)
                            });
                            return [4 /*yield*/, this.prepare(context)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            _a.label = 3;
                        case 3:
                            if (!items.length) return [3 /*break*/, 5];
                            currentItem = items.pop();
                            if (currentItem.contentEncoding !== 'gzip') {
                                observer.error(new UnknownObjectError("Unknown content encoding " + currentItem.contentEncoding));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.processBatch(currentItem).then(function () {
                                    observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'IMPORTING_BATCH', pending: __spreadArrays(items) }));
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            observer.error(e_1);
                            return [2 /*return*/];
                        case 7:
                            observer.next(archivePackageProgress = __assign(__assign({}, archivePackageProgress), { task: 'OBJECT_IMPORT_COMPLETE' }));
                            observer.complete();
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
    };
    TelemetryImportDelegate.prototype.prepare = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.workspaceSubPath = "" + context.workspacePath;
                return [2 /*return*/];
            });
        });
    };
    TelemetryImportDelegate.prototype.processBatch = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.readAsBinaryString(this.workspaceSubPath, item.file).then(function (content) {
                        _this.networkQueue.enqueue(new NetworkRequestHandler(_this.sdkConfig).generateNetworkQueueRequest(NetworkQueueType.TELEMETRY, content, item.mid, item.eventsCount, false), false).toPromise();
                    })];
            });
        });
    };
    return TelemetryImportDelegate;
}());
export { TelemetryImportDelegate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LWltcG9ydC1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcmNoaXZlL2ltcG9ydC9pbXBsL3RlbGVtZXRyeS1pbXBvcnQtZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVoQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUlqRSxPQUFPLEVBQWUsZ0JBQWdCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2REFBNkQsQ0FBQztBQUdsRztJQUdFLGlDQUNVLFNBQW9CLEVBQ3BCLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLFNBQW9CO1FBSHBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUU5QixDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUNFLE9BQStDLEVBQy9DLE9BQWlFO1FBRm5FLGlCQXNEQztRQWxEQyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsUUFBUTtZQUM3QixDQUFDOzs7Ozs0QkFDSyxzQkFBc0IsR0FBNkQ7Z0NBQ3JGLElBQUksRUFBRSxFQUFFO2dDQUNSLE9BQU8sRUFBRSxFQUFFOzZCQUNaLENBQUM7NEJBRUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7NEJBRTVCLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0NBQ1osSUFBSSxFQUFFLFdBQVc7Z0NBQ2pCLE9BQU8saUJBQ0YsS0FBSyxDQUNUOzZCQUNGLENBQUMsQ0FBQzs0QkFFSCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFBOzs0QkFBM0IsU0FBMkIsQ0FBQzs7Ozs7O2lDQUduQixLQUFLLENBQUMsTUFBTTs0QkFDWCxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRyxDQUFDOzRCQUVqQyxJQUFJLFdBQVcsQ0FBQyxlQUFlLEtBQUssTUFBTSxFQUFFO2dDQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksa0JBQWtCLENBQUMsOEJBQTRCLFdBQVcsQ0FBQyxlQUFpQixDQUFDLENBQUMsQ0FBQztnQ0FDbEcsc0JBQU87NkJBQ1I7NEJBRUQscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLHlCQUMvQixzQkFBc0IsS0FDekIsSUFBSSxFQUFFLGlCQUFpQixFQUN2QixPQUFPLGlCQUNGLEtBQUssSUFFWCxDQUFDLENBQUM7Z0NBQ0wsQ0FBQyxDQUFDLEVBQUE7OzRCQVJGLFNBUUUsQ0FBQzs7Ozs7NEJBR0wsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQzs0QkFDbEIsc0JBQU87OzRCQUdULFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLHlCQUMvQixzQkFBc0IsS0FDekIsSUFBSSxFQUFFLHdCQUF3QixHQUMvQixDQUFDLENBQUM7NEJBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7O2lCQUNyQixDQUFDLEVBQUUsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVhLHlDQUFPLEdBQXJCLFVBQXNCLE9BQW9DOzs7Z0JBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFHLE9BQU8sQ0FBQyxhQUFlLENBQUM7Ozs7S0FDcEQ7SUFFYSw4Q0FBWSxHQUExQixVQUEyQixJQUFpQzs7OztnQkFDMUQsc0JBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87d0JBQ3hGLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQXFCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLDJCQUEyQixDQUM3RixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDaEcsQ0FBQyxDQUFDLEVBQUM7OztLQUNKO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcmNoaXZlSW1wb3J0RGVsZWdhdGV9IGZyb20gJy4uJztcbmltcG9ydCB7XG4gIEFyY2hpdmVJbXBvcnRSZXF1ZXN0LFxuICBBcmNoaXZlT2JqZWN0SW1wb3J0UHJvZ3Jlc3MsXG4gIEFyY2hpdmVQYWNrYWdlRXhwb3J0Q29udGV4dCxcbiAgQXJjaGl2ZVBhY2thZ2VJbXBvcnRDb250ZXh0XG59IGZyb20gJy4uLy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1RlbGVtZXRyeUFyY2hpdmVQYWNrYWdlTWV0YX0gZnJvbSAnLi4vLi4vZXhwb3J0L2RlZi90ZWxlbWV0cnktYXJjaGl2ZS1wYWNrYWdlLW1ldGEnO1xuaW1wb3J0IHtVbmtub3duT2JqZWN0RXJyb3J9IGZyb20gJy4uL2Vycm9yL3Vua25vd24tb2JqZWN0LWVycm9yJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1RlbGVtZXRyeUVudHJ5LCBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeX0gZnJvbSAnLi4vLi4vLi4vdGVsZW1ldHJ5L2RiL3NjaGVtYSc7XG5pbXBvcnQge05ldHdvcmtRdWV1ZSwgTmV0d29ya1F1ZXVlVHlwZX0gZnJvbSAnLi4vLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuaW1wb3J0IHtOZXR3b3JrUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uLy4uLy4uL2FwaS9uZXR3b3JrLXF1ZXVlL2hhbmRsZXJzL25ldHdvcmstcmVxdWVzdC1oYW5kbGVyJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi8uLi9zZGstY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIFRlbGVtZXRyeUltcG9ydERlbGVnYXRlIGltcGxlbWVudHMgQXJjaGl2ZUltcG9ydERlbGVnYXRlIHtcbiAgcHJpdmF0ZSB3b3Jrc3BhY2VTdWJQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldHdvcmtRdWV1ZTogTmV0d29ya1F1ZXVlLFxuICAgIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWdcbiAgKSB7XG4gIH1cblxuICBpbXBvcnQoXG4gICAgcmVxdWVzdDogUGljazxBcmNoaXZlSW1wb3J0UmVxdWVzdCwgJ2ZpbGVQYXRoJz4sXG4gICAgY29udGV4dDogQXJjaGl2ZVBhY2thZ2VJbXBvcnRDb250ZXh0PFRlbGVtZXRyeUFyY2hpdmVQYWNrYWdlTWV0YT5cbiAgKTogT2JzZXJ2YWJsZTxBcmNoaXZlT2JqZWN0SW1wb3J0UHJvZ3Jlc3M+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgYXJjaGl2ZVBhY2thZ2VQcm9ncmVzczogQXJjaGl2ZU9iamVjdEltcG9ydFByb2dyZXNzPFRlbGVtZXRyeUFyY2hpdmVQYWNrYWdlTWV0YT4gPSB7XG4gICAgICAgICAgdGFzazogJycsXG4gICAgICAgICAgcGVuZGluZzogW10sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaXRlbXMgPSBjb250ZXh0Lml0ZW1zO1xuXG4gICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgIHRhc2s6ICdQUkVQQVJJTkcnLFxuICAgICAgICAgIHBlbmRpbmc6IFtcbiAgICAgICAgICAgIC4uLml0ZW1zXG4gICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLnByZXBhcmUoY29udGV4dCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3aGlsZSAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9IGl0ZW1zLnBvcCgpITtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLmNvbnRlbnRFbmNvZGluZyAhPT0gJ2d6aXAnKSB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBVbmtub3duT2JqZWN0RXJyb3IoYFVua25vd24gY29udGVudCBlbmNvZGluZyAke2N1cnJlbnRJdGVtLmNvbnRlbnRFbmNvZGluZ31gKSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9jZXNzQmF0Y2goY3VycmVudEl0ZW0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgLi4uYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyxcbiAgICAgICAgICAgICAgICB0YXNrOiAnSU1QT1JUSU5HX0JBVENIJyxcbiAgICAgICAgICAgICAgICBwZW5kaW5nOiBbXG4gICAgICAgICAgICAgICAgICAuLi5pdGVtc1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlci5uZXh0KGFyY2hpdmVQYWNrYWdlUHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgLi4uYXJjaGl2ZVBhY2thZ2VQcm9ncmVzcyxcbiAgICAgICAgICB0YXNrOiAnT0JKRUNUX0lNUE9SVF9DT01QTEVURScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcmVwYXJlKGNvbnRleHQ6IEFyY2hpdmVQYWNrYWdlRXhwb3J0Q29udGV4dCkge1xuICAgIHRoaXMud29ya3NwYWNlU3ViUGF0aCA9IGAke2NvbnRleHQud29ya3NwYWNlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcm9jZXNzQmF0Y2goaXRlbTogVGVsZW1ldHJ5QXJjaGl2ZVBhY2thZ2VNZXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UucmVhZEFzQmluYXJ5U3RyaW5nKHRoaXMud29ya3NwYWNlU3ViUGF0aCwgaXRlbS5maWxlKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICB0aGlzLm5ldHdvcmtRdWV1ZS5lbnF1ZXVlKG5ldyBOZXR3b3JrUmVxdWVzdEhhbmRsZXIodGhpcy5zZGtDb25maWcpLmdlbmVyYXRlTmV0d29ya1F1ZXVlUmVxdWVzdChcbiAgICAgICAgTmV0d29ya1F1ZXVlVHlwZS5URUxFTUVUUlksIGNvbnRlbnQsIGl0ZW0ubWlkLCBpdGVtLmV2ZW50c0NvdW50LCBmYWxzZSksIGZhbHNlKS50b1Byb21pc2UoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19