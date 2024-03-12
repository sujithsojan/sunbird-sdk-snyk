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
import { MoveContentStatus } from '../transfer-content-handler';
import { ContentEntry } from '../../../content/db/schema';
import { ExistingContentAction, StorageEventType } from '../..';
import { EventNamespace } from '../../../events-bus';
import { ArrayUtil } from '../../../util/array-util';
import { CancellationError } from '../../errors/cancellation-error';
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
var COLUMN_NAME_PATH = ContentEntry.COLUMN_NAME_PATH;
import { defer } from 'rxjs';
var CopyContentFromSourceToDestination = /** @class */ (function () {
    function CopyContentFromSourceToDestination(eventsBusService) {
        this.eventsBusService = eventsBusService;
        this.contentsTransferred = 0;
    }
    CopyContentFromSourceToDestination.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (content) {
                            var moveContentResponse, destination, e_1, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!context.hasTransferCancelled) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.deleteFolder(context.destinationFolder.concat('temp', '/'))];
                                    case 1:
                                        _b.sent();
                                        throw new CancellationError('CANCELLED');
                                    case 2:
                                        moveContentResponse = context.duplicateContents.find(function (m) {
                                            return m.identifier === content[COLUMN_NAME_IDENTIFIER];
                                        });
                                        if (!(!moveContentResponse || ArrayUtil.isEmpty(context.duplicateContents))) return [3 /*break*/, 7];
                                        destination = context.destinationFolder.concat('temp', '/');
                                        _b.label = 3;
                                    case 3:
                                        _b.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, this_1.copyFolder(content[COLUMN_NAME_PATH], destination + content[COLUMN_NAME_IDENTIFIER])];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        e_1 = _b.sent();
                                        return [3 /*break*/, 6];
                                    case 6:
                                        this_1.emitContentTransferProgress(context);
                                        return [2 /*return*/, "continue"];
                                    case 7:
                                        if (!context.existingContentAction) {
                                            this_1.emitContentTransferProgress(context);
                                            return [2 /*return*/, "continue"];
                                        }
                                        if (moveContentResponse.status === MoveContentStatus.SAME_VERSION_IN_BOTH) {
                                            this_1.emitContentTransferProgress(context);
                                            return [2 /*return*/, "continue"];
                                        }
                                        _a = context.existingContentAction;
                                        switch (_a) {
                                            case ExistingContentAction.KEEP_HIGER_VERSION: return [3 /*break*/, 8];
                                            case ExistingContentAction.KEEP_LOWER_VERSION: return [3 /*break*/, 11];
                                            case ExistingContentAction.KEEP_SOURCE: return [3 /*break*/, 14];
                                            case ExistingContentAction.IGNORE: return [3 /*break*/, 17];
                                            case ExistingContentAction.KEEP_DESTINATION: return [3 /*break*/, 17];
                                        }
                                        return [3 /*break*/, 17];
                                    case 8:
                                        if (moveContentResponse.status === MoveContentStatus.HIGHER_VERSION_IN_DESTINATION) {
                                            return [3 /*break*/, 17];
                                        }
                                        return [4 /*yield*/, this_1.copyToTempDestination(context, content, moveContentResponse)];
                                    case 9:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 10:
                                        _b.sent();
                                        return [3 /*break*/, 17];
                                    case 11:
                                        if (moveContentResponse.status === MoveContentStatus.LOWER_VERSION_IN_DESTINATION) {
                                            return [3 /*break*/, 17];
                                        }
                                        return [4 /*yield*/, this_1.copyToTempDestination(context, content, moveContentResponse)];
                                    case 12:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 13:
                                        _b.sent();
                                        return [3 /*break*/, 17];
                                    case 14: return [4 /*yield*/, this_1.copyToTempDestination(context, content, moveContentResponse)];
                                    case 15:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 16:
                                        _b.sent();
                                        return [3 /*break*/, 17];
                                    case 17:
                                        this_1.emitContentTransferProgress(context);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = context.contentsInSource;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        content = _a[_i];
                        return [5 /*yield**/, _loop_1(content)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, context];
                }
            });
        }); });
    };
    CopyContentFromSourceToDestination.prototype.emitContentTransferProgress = function (context) {
        this.eventsBusService.emit({
            namespace: EventNamespace.STORAGE,
            event: {
                type: StorageEventType.TRANSFER_PROGRESS,
                payload: {
                    progress: {
                        transferredCount: ++this.contentsTransferred,
                        totalCount: context.contentsInSource.length
                    }
                }
            }
        });
    };
    CopyContentFromSourceToDestination.prototype.deleteFolder = function (deletedirectory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!deletedirectory) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.rm(deletedirectory, '', function () {
                            resolve();
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    CopyContentFromSourceToDestination.prototype.copyFolder = function (sourceDirectory, destinationDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!sourceDirectory || !destinationDirectory) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.copyDirectory(sourceDirectory, destinationDirectory, function () {
                            resolve();
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    CopyContentFromSourceToDestination.prototype.renameFolder = function (sourceDirectory, toDirectoryName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!sourceDirectory) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.renameDirectory(sourceDirectory, toDirectoryName, function () {
                            resolve();
                        }, function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    CopyContentFromSourceToDestination.prototype.copyToTempDestination = function (context, content, moveContentResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.renameFolder(context.destinationFolder, moveContentResponse.identifier)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.copyFolder(content[COLUMN_NAME_PATH], context.destinationFolder + content[COLUMN_NAME_IDENTIFIER])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CopyContentFromSourceToDestination.prototype.removeSourceAndDestination = function (context, content, moveContentResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteFolder(context.destinationFolder.concat(moveContentResponse.identifier, '_temp'))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deleteFolder(content[COLUMN_NAME_PATH])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CopyContentFromSourceToDestination;
}());
export { CopyContentFromSourceToDestination };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1jb250ZW50LWZyb20tc291cmNlLXRvLWRlc3RpbmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0b3JhZ2UvaGFuZGxlci90cmFuc2Zlci9jb3B5LWNvbnRlbnQtZnJvbS1zb3VyY2UtdG8tZGVzdGluYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFzQixpQkFBaUIsRUFBeUIsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGdCQUFnQixFQUEwQixNQUFNLE9BQU8sQ0FBQztBQUN2RixPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxJQUFPLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztBQUNwRSxJQUFPLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRXZDO0lBR0ksNENBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRjlDLHdCQUFtQixHQUFHLENBQUMsQ0FBQztJQUdoQyxDQUFDO0lBRUQsb0RBQU8sR0FBUCxVQUFRLE9BQStCO1FBQXZDLGlCQWtFQztRQWpFRyxPQUFPLEtBQUssQ0FBQzs7Ozs7NENBQ0UsT0FBTzs7Ozs7NkNBRVYsT0FBTyxDQUFDLG9CQUFvQixFQUE1Qix3QkFBNEI7d0NBQzVCLHFCQUFNLE9BQUssWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFB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LENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUE7O3dCQUFuRyxTQUFtRyxDQUFDO3dCQUNwRyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLEVBQUE7O3dCQUFuRCxTQUFtRCxDQUFDOzs7OztLQUN2RDtJQUNMLHlDQUFDO0FBQUQsQ0FBQyxBQWpKRCxJQWlKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW92ZUNvbnRlbnRSZXNwb25zZSwgTW92ZUNvbnRlbnRTdGF0dXMsIFRyYW5zZmVyQ29udGVudENvbnRleHR9IGZyb20gJy4uL3RyYW5zZmVyLWNvbnRlbnQtaGFuZGxlcic7XG5pbXBvcnQge0NvbnRlbnRFbnRyeX0gZnJvbSAnLi4vLi4vLi4vY29udGVudC9kYi9zY2hlbWEnO1xuaW1wb3J0IHtFeGlzdGluZ0NvbnRlbnRBY3Rpb24sIFN0b3JhZ2VFdmVudFR5cGUsIFN0b3JhZ2VUcmFuc2ZlclByb2dyZXNzfSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0V2ZW50TmFtZXNwYWNlLCBFdmVudHNCdXNTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9ldmVudHMtYnVzJztcbmltcG9ydCB7QXJyYXlVdGlsfSBmcm9tICcuLi8uLi8uLi91dGlsL2FycmF5LXV0aWwnO1xuaW1wb3J0IHtDYW5jZWxsYXRpb25FcnJvcn0gZnJvbSAnLi4vLi4vZXJyb3JzL2NhbmNlbGxhdGlvbi1lcnJvcic7XG5pbXBvcnQgQ09MVU1OX05BTUVfSURFTlRJRklFUiA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSO1xuaW1wb3J0IENPTFVNTl9OQU1FX1BBVEggPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSDtcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgQ29weUNvbnRlbnRGcm9tU291cmNlVG9EZXN0aW5hdGlvbiB7XG4gICAgcHJpdmF0ZSBjb250ZW50c1RyYW5zZmVycmVkID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRzQnVzU2VydmljZTogRXZlbnRzQnVzU2VydmljZSkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoY29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCk6IE9ic2VydmFibGU8VHJhbnNmZXJDb250ZW50Q29udGV4dD4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb250ZW50IG9mIGNvbnRleHQuY29udGVudHNJblNvdXJjZSEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lmhhc1RyYW5zZmVyQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRm9sZGVyKGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLmNvbmNhdCgndGVtcCcsICcvJykpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoJ0NBTkNFTExFRCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVDb250ZW50UmVzcG9uc2UgPSBjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzIS5maW5kKChtOiBNb3ZlQ29udGVudFJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICAgICAgICBtLmlkZW50aWZpZXIgPT09IGNvbnRlbnRbQ09MVU1OX05BTUVfSURFTlRJRklFUl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtb3ZlQ29udGVudFJlc3BvbnNlIHx8IEFycmF5VXRpbC5pc0VtcHR5KGNvbnRleHQuZHVwbGljYXRlQ29udGVudHMhKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLmNvbmNhdCgndGVtcCcsICcvJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29weUZvbGRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50W0NPTFVNTl9OQU1FX1BBVEhdISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiArIGNvbnRlbnRbQ09MVU1OX05BTUVfSURFTlRJRklFUl1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdENvbnRlbnRUcmFuc2ZlclByb2dyZXNzKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQuZXhpc3RpbmdDb250ZW50QWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdENvbnRlbnRUcmFuc2ZlclByb2dyZXNzKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobW92ZUNvbnRlbnRSZXNwb25zZSEuc3RhdHVzID09PSBNb3ZlQ29udGVudFN0YXR1cy5TQU1FX1ZFUlNJT05fSU5fQk9USCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRDb250ZW50VHJhbnNmZXJQcm9ncmVzcyhjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LmV4aXN0aW5nQ29udGVudEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV4aXN0aW5nQ29udGVudEFjdGlvbi5LRUVQX0hJR0VSX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZUNvbnRlbnRSZXNwb25zZSEuc3RhdHVzID09PSBNb3ZlQ29udGVudFN0YXR1cy5ISUdIRVJfVkVSU0lPTl9JTl9ERVNUSU5BVElPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb3B5VG9UZW1wRGVzdGluYXRpb24oY29udGV4dCwgY29udGVudCwgbW92ZUNvbnRlbnRSZXNwb25zZSEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVTb3VyY2VBbmREZXN0aW5hdGlvbihjb250ZXh0LCBjb250ZW50LCBtb3ZlQ29udGVudFJlc3BvbnNlISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uS0VFUF9MT1dFUl9WRVJTSU9OOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVDb250ZW50UmVzcG9uc2UhLnN0YXR1cyA9PT0gTW92ZUNvbnRlbnRTdGF0dXMuTE9XRVJfVkVSU0lPTl9JTl9ERVNUSU5BVElPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb3B5VG9UZW1wRGVzdGluYXRpb24oY29udGV4dCwgY29udGVudCwgbW92ZUNvbnRlbnRSZXNwb25zZSEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVTb3VyY2VBbmREZXN0aW5hdGlvbihjb250ZXh0LCBjb250ZW50LCBtb3ZlQ29udGVudFJlc3BvbnNlISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uS0VFUF9TT1VSQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvcHlUb1RlbXBEZXN0aW5hdGlvbihjb250ZXh0LCBjb250ZW50LCBtb3ZlQ29udGVudFJlc3BvbnNlISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZVNvdXJjZUFuZERlc3RpbmF0aW9uKGNvbnRleHQsIGNvbnRlbnQsIG1vdmVDb250ZW50UmVzcG9uc2UhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV4aXN0aW5nQ29udGVudEFjdGlvbi5JR05PUkU6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXhpc3RpbmdDb250ZW50QWN0aW9uLktFRVBfREVTVElOQVRJT046XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Q29udGVudFRyYW5zZmVyUHJvZ3Jlc3MoY29udGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRDb250ZW50VHJhbnNmZXJQcm9ncmVzcyhjb250ZXh0OiBUcmFuc2ZlckNvbnRlbnRDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzQnVzU2VydmljZS5lbWl0KHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuU1RPUkFHRSxcbiAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RvcmFnZUV2ZW50VHlwZS5UUkFOU0ZFUl9QUk9HUkVTUyxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2ZlcnJlZENvdW50OiArK3RoaXMuY29udGVudHNUcmFuc2ZlcnJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQ291bnQ6IGNvbnRleHQuY29udGVudHNJblNvdXJjZSEubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGFzIFN0b3JhZ2VUcmFuc2ZlclByb2dyZXNzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZGVsZXRlRm9sZGVyKGRlbGV0ZWRpcmVjdG9yeTogc3RyaW5nKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgaWYgKCFkZWxldGVkaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dW5kZWZpbmVkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzYnV0aWxpdHkucm0oZGVsZXRlZGlyZWN0b3J5LCAnJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY29weUZvbGRlcihzb3VyY2VEaXJlY3Rvcnk6IHN0cmluZywgZGVzdGluYXRpb25EaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmICghc291cmNlRGlyZWN0b3J5IHx8ICFkZXN0aW5hdGlvbkRpcmVjdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LmNvcHlEaXJlY3Rvcnkoc291cmNlRGlyZWN0b3J5LCBkZXN0aW5hdGlvbkRpcmVjdG9yeSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcmVuYW1lRm9sZGVyKHNvdXJjZURpcmVjdG9yeTogc3RyaW5nLCB0b0RpcmVjdG9yeU5hbWU6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmICghc291cmNlRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LnJlbmFtZURpcmVjdG9yeShzb3VyY2VEaXJlY3RvcnksIHRvRGlyZWN0b3J5TmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY29weVRvVGVtcERlc3RpbmF0aW9uKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogQ29udGVudEVudHJ5LlNjaGVtYU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29udGVudFJlc3BvbnNlOiBNb3ZlQ29udGVudFJlc3BvbnNlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVuYW1lRm9sZGVyKGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLCBtb3ZlQ29udGVudFJlc3BvbnNlLmlkZW50aWZpZXIpO1xuICAgICAgICBhd2FpdCB0aGlzLmNvcHlGb2xkZXIoXG4gICAgICAgICAgICBjb250ZW50W0NPTFVNTl9OQU1FX1BBVEhdISxcbiAgICAgICAgICAgIGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhICsgY29udGVudFtDT0xVTU5fTkFNRV9JREVOVElGSUVSXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcmVtb3ZlU291cmNlQW5kRGVzdGluYXRpb24oY29udGV4dDogVHJhbnNmZXJDb250ZW50Q29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29udGVudFJlc3BvbnNlOiBNb3ZlQ29udGVudFJlc3BvbnNlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRm9sZGVyKGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLmNvbmNhdChtb3ZlQ29udGVudFJlc3BvbnNlLmlkZW50aWZpZXIsICdfdGVtcCcpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGb2xkZXIoY29udGVudFtDT0xVTU5fTkFNRV9QQVRIXSEpO1xuICAgIH1cbn1cbiJdfQ==