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
import { ExistingContentAction } from '../..';
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
var COLUMN_NAME_PATH = ContentEntry.COLUMN_NAME_PATH;
import { ArrayUtil } from '../../../util/array-util';
import { defer } from 'rxjs';
var DeleteSourceFolder = /** @class */ (function () {
    function DeleteSourceFolder(eventsBusService) {
        this.eventsBusService = eventsBusService;
    }
    DeleteSourceFolder.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var content, moveContentResponse, tempDestination, e_1, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        content = context.contentsInSource[i];
                                        moveContentResponse = context.duplicateContents.find(function (m) {
                                            return m.identifier === content[COLUMN_NAME_IDENTIFIER];
                                        });
                                        tempDestination = context.destinationFolder.concat('temp', '/');
                                        if (!(!moveContentResponse || ArrayUtil.isEmpty(context.duplicateContents))) return [3 /*break*/, 9];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 7, , 8]);
                                        return [4 /*yield*/, this_1.copyFolder(tempDestination.concat(content[COLUMN_NAME_IDENTIFIER]), context.destinationFolder + content[COLUMN_NAME_IDENTIFIER])];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.deleteFolder(tempDestination.concat(content[COLUMN_NAME_IDENTIFIER]))];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.deleteFolder(content[COLUMN_NAME_PATH])];
                                    case 4:
                                        _b.sent();
                                        if (!(i === (context.contentsInSource.length - 1))) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this_1.deleteFolder(tempDestination)];
                                    case 5:
                                        _b.sent();
                                        _b.label = 6;
                                    case 6: return [3 /*break*/, 8];
                                    case 7:
                                        e_1 = _b.sent();
                                        return [3 /*break*/, 8];
                                    case 8: return [2 /*return*/, "continue"];
                                    case 9:
                                        if (!context.existingContentAction) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        if (moveContentResponse.status === MoveContentStatus.SAME_VERSION_IN_BOTH) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        _a = context.existingContentAction;
                                        switch (_a) {
                                            case ExistingContentAction.KEEP_HIGER_VERSION: return [3 /*break*/, 10];
                                            case ExistingContentAction.KEEP_LOWER_VERSION: return [3 /*break*/, 12];
                                            case ExistingContentAction.KEEP_SOURCE: return [3 /*break*/, 14];
                                            case ExistingContentAction.IGNORE: return [3 /*break*/, 16];
                                            case ExistingContentAction.KEEP_DESTINATION: return [3 /*break*/, 16];
                                        }
                                        return [3 /*break*/, 16];
                                    case 10:
                                        if (moveContentResponse.status === MoveContentStatus.HIGHER_VERSION_IN_DESTINATION) {
                                            return [3 /*break*/, 16];
                                        }
                                        return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 11:
                                        _b.sent();
                                        return [3 /*break*/, 16];
                                    case 12:
                                        if (moveContentResponse.status === MoveContentStatus.LOWER_VERSION_IN_DESTINATION) {
                                            return [3 /*break*/, 16];
                                        }
                                        return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 13:
                                        _b.sent();
                                        return [3 /*break*/, 16];
                                    case 14: return [4 /*yield*/, this_1.removeSourceAndDestination(context, content, moveContentResponse)];
                                    case 15:
                                        _b.sent();
                                        return [3 /*break*/, 16];
                                    case 16:
                                        if (!(i === (context.contentsInSource.length - 1))) return [3 /*break*/, 18];
                                        return [4 /*yield*/, this_1.deleteFolder(tempDestination)];
                                    case 17:
                                        _b.sent();
                                        _b.label = 18;
                                    case 18: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < context.contentsInSource.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, context];
                }
            });
        }); });
    };
    DeleteSourceFolder.prototype.deleteFolder = function (deletedirectory) {
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
    DeleteSourceFolder.prototype.copyFolder = function (sourceDirectory, destinationDirectory) {
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
    DeleteSourceFolder.prototype.renameFolder = function (sourceDirectory, toDirectoryName) {
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
    DeleteSourceFolder.prototype.removeSourceAndDestination = function (context, content, moveContentResponse) {
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
    return DeleteSourceFolder;
}());
export { DeleteSourceFolder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXNvdXJjZS1mb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmFnZS9oYW5kbGVyL3RyYW5zZmVyL2RlbGV0ZS1zb3VyY2UtZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBc0IsaUJBQWlCLEVBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFDM0csT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUU1QyxJQUFPLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztBQUNwRSxJQUFPLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxFQUFDLEtBQUssRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQUNJLDRCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDO0lBRUQsb0NBQU8sR0FBUCxVQUFRLE9BQStCO1FBQXZDLGlCQTJEQztRQTFERyxPQUFPLEtBQUssQ0FBQzs7Ozs7NENBQ0EsQ0FBQzs7Ozs7d0NBQ0EsT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FDdkMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGlCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFDLENBQXNCOzRDQUMvRSxPQUFBLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDLHNCQUFzQixDQUFDO3dDQUFoRCxDQUFnRCxDQUNuRCxDQUFDO3dDQUNJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUJBQWtCLENBQUMsTUFBTSxDQUFDLE1BQU0s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QXlDLE9BQStCLEVBQy9CLE9BQStCLEVBQy9CLG1CQUF3Qzs7Ozs0QkFDN0UscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWtCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFBOzt3QkFBbkcsU0FBbUcsQ0FBQzt3QkFDcEcscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxFQUFBOzt3QkFBbkQsU0FBbUQsQ0FBQzs7Ozs7S0FDdkQ7SUFDTCx5QkFBQztBQUFELENBQUMsQUEvR0QsSUErR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vdmVDb250ZW50UmVzcG9uc2UsIE1vdmVDb250ZW50U3RhdHVzLCBUcmFuc2ZlckNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7RXhpc3RpbmdDb250ZW50QWN0aW9ufSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0V2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IENPTFVNTl9OQU1FX0lERU5USUZJRVIgPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUjtcbmltcG9ydCBDT0xVTU5fTkFNRV9QQVRIID0gQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEg7XG5pbXBvcnQge0FycmF5VXRpbH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9hcnJheS11dGlsJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlU291cmNlRm9sZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50c0J1c1NlcnZpY2U6IEV2ZW50c0J1c1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpOiBPYnNlcnZhYmxlPFRyYW5zZmVyQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGV4dC5jb250ZW50c0luU291cmNlIS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZXh0LmNvbnRlbnRzSW5Tb3VyY2UhW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVDb250ZW50UmVzcG9uc2UgPSBjb250ZXh0LmR1cGxpY2F0ZUNvbnRlbnRzIS5maW5kKChtOiBNb3ZlQ29udGVudFJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICAgICAgICBtLmlkZW50aWZpZXIgPT09IGNvbnRlbnRbQ09MVU1OX05BTUVfSURFTlRJRklFUl1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBEZXN0aW5hdGlvbiA9IGNvbnRleHQuZGVzdGluYXRpb25Gb2xkZXIhLmNvbmNhdCgndGVtcCcsICcvJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFtb3ZlQ29udGVudFJlc3BvbnNlIHx8IEFycmF5VXRpbC5pc0VtcHR5KGNvbnRleHQuZHVwbGljYXRlQ29udGVudHMhKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb3B5Rm9sZGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEZXN0aW5hdGlvbi5jb25jYXQoY29udGVudFtDT0xVTU5fTkFNRV9JREVOVElGSUVSXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kZXN0aW5hdGlvbkZvbGRlciEgKyBjb250ZW50W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGb2xkZXIodGVtcERlc3RpbmF0aW9uLmNvbmNhdChjb250ZW50W0NPTFVNTl9OQU1FX0lERU5USUZJRVJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZvbGRlcihjb250ZW50W0NPTFVNTl9OQU1FX1BBVEhdISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gKGNvbnRleHQuY29udGVudHNJblNvdXJjZSEubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZvbGRlcih0ZW1wRGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0LmV4aXN0aW5nQ29udGVudEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobW92ZUNvbnRlbnRSZXNwb25zZS5zdGF0dXMgPT09IE1vdmVDb250ZW50U3RhdHVzLlNBTUVfVkVSU0lPTl9JTl9CT1RIKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5leGlzdGluZ0NvbnRlbnRBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uS0VFUF9ISUdFUl9WRVJTSU9OOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVDb250ZW50UmVzcG9uc2Uuc3RhdHVzID09PSBNb3ZlQ29udGVudFN0YXR1cy5ISUdIRVJfVkVSU0lPTl9JTl9ERVNUSU5BVElPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVTb3VyY2VBbmREZXN0aW5hdGlvbihjb250ZXh0LCBjb250ZW50LCBtb3ZlQ29udGVudFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV4aXN0aW5nQ29udGVudEFjdGlvbi5LRUVQX0xPV0VSX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZUNvbnRlbnRSZXNwb25zZS5zdGF0dXMgPT09IE1vdmVDb250ZW50U3RhdHVzLkxPV0VSX1ZFUlNJT05fSU5fREVTVElOQVRJT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlU291cmNlQW5kRGVzdGluYXRpb24oY29udGV4dCwgY29udGVudCwgbW92ZUNvbnRlbnRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uS0VFUF9TT1VSQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZVNvdXJjZUFuZERlc3RpbmF0aW9uKGNvbnRleHQsIGNvbnRlbnQsIG1vdmVDb250ZW50UmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXhpc3RpbmdDb250ZW50QWN0aW9uLklHTk9SRTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFeGlzdGluZ0NvbnRlbnRBY3Rpb24uS0VFUF9ERVNUSU5BVElPTjpcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IChjb250ZXh0LmNvbnRlbnRzSW5Tb3VyY2UhLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRm9sZGVyKHRlbXBEZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGRlbGV0ZUZvbGRlcihkZWxldGVkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmICghZGVsZXRlZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LnJtKGRlbGV0ZWRpcmVjdG9yeSwgJycsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNvcHlGb2xkZXIoc291cmNlRGlyZWN0b3J5OiBzdHJpbmcsIGRlc3RpbmF0aW9uRGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgICAgICBpZiAoIXNvdXJjZURpcmVjdG9yeSB8fCAhZGVzdGluYXRpb25EaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5jb3B5RGlyZWN0b3J5KHNvdXJjZURpcmVjdG9yeSwgZGVzdGluYXRpb25EaXJlY3RvcnksICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlbmFtZUZvbGRlcihzb3VyY2VEaXJlY3Rvcnk6IHN0cmluZywgdG9EaXJlY3RvcnlOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgICAgICBpZiAoIXNvdXJjZURpcmVjdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5yZW5hbWVEaXJlY3Rvcnkoc291cmNlRGlyZWN0b3J5LCB0b0RpcmVjdG9yeU5hbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZVNvdXJjZUFuZERlc3RpbmF0aW9uKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBDb250ZW50RW50cnkuU2NoZW1hTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvbnRlbnRSZXNwb25zZTogTW92ZUNvbnRlbnRSZXNwb25zZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZvbGRlcihjb250ZXh0LmRlc3RpbmF0aW9uRm9sZGVyIS5jb25jYXQobW92ZUNvbnRlbnRSZXNwb25zZS5pZGVudGlmaWVyLCAnX3RlbXAnKSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRm9sZGVyKGNvbnRlbnRbQ09MVU1OX05BTUVfUEFUSF0hKTtcbiAgICB9XG59XG4iXX0=