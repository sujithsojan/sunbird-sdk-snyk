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
import { MimeType, Visibility } from '../..';
import { ContentEntry } from '../../db/schema';
import { ArrayUtil } from '../../../util/array-util';
import { ContentKeys } from '../../../preference-keys';
import { tap, mergeMap } from 'rxjs/operators';
var UpdateSizeOnDevice = /** @class */ (function () {
    function UpdateSizeOnDevice(dbService, sharedPreferences, fileService) {
        this.dbService = dbService;
        this.sharedPreferences = sharedPreferences;
        this.fileService = fileService;
    }
    UpdateSizeOnDevice.prototype.execute = function () {
        return this.updateAllRootContentSize().toPromise();
    };
    UpdateSizeOnDevice.prototype.findAllChildContents = function (childIdentifiers) {
        var query = "SELECT * FROM " + ContentEntry.TABLE_NAME + "\n                       WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + " IN (" + ArrayUtil.joinPreservingQuotes(childIdentifiers) + ")\n                       AND " + ContentEntry.COLUMN_NAME_REF_COUNT + " > 0";
        return this.dbService.execute(query).toPromise();
    };
    UpdateSizeOnDevice.prototype.updateAllRootContentSize = function () {
        var _this = this;
        var query = "SELECT * FROM " + ContentEntry.TABLE_NAME + " WHERE " + ContentEntry.COLUMN_NAME_REF_COUNT + " > 0\n        AND " + ContentEntry.COLUMN_NAME_VISIBILITY + " = '" + Visibility.DEFAULT.valueOf() + "'";
        return this.dbService.execute(query).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.sharedPreferences.putBoolean(ContentKeys.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL, false).toPromise()];
        }); }); }), mergeMap(function (rootContentsInDb) { return __awaiter(_this, void 0, void 0, function () {
            var updateContentModels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateContentModels = [];
                        return [4 /*yield*/, Promise.all(rootContentsInDb.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var sizeOnDevice, identifiers, childContentsInDb;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getSizeOnDevice(item)];
                                        case 1:
                                            sizeOnDevice = _a.sent();
                                            identifiers = JSON.parse(item[ContentEntry.COLUMN_NAME_LOCAL_DATA]).childNodes;
                                            if (!identifiers) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.findAllChildContents(identifiers)];
                                        case 2:
                                            childContentsInDb = _a.sent();
                                            childContentsInDb.forEach(function (content) {
                                                sizeOnDevice += content[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] || 0;
                                            });
                                            item[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = sizeOnDevice;
                                            updateContentModels.push(item);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.updateInDb(updateContentModels);
                        return [2 /*return*/];
                }
            });
        }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.sharedPreferences.putBoolean(ContentKeys.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL, true).toPromise()];
        }); }); }));
    };
    UpdateSizeOnDevice.prototype.getSizeOnDevice = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var size, fileMapList, fileMap, identifier, metaDataList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        size = 0;
                        if (!(node[ContentEntry.COLUMN_NAME_MIME_TYPE] === MimeType.COLLECTION.valueOf())) return [3 /*break*/, 3];
                        if (!(node[ContentEntry.COLUMN_NAME_VISIBILITY] === Visibility.DEFAULT.valueOf())) return [3 /*break*/, 2];
                        fileMapList = [];
                        fileMap = {};
                        identifier = node[ContentEntry.COLUMN_NAME_IDENTIFIER];
                        fileMap['identifier'] = identifier;
                        fileMap['path'] = node[ContentEntry.COLUMN_NAME_PATH];
                        fileMapList.push(fileMap);
                        return [4 /*yield*/, this.getMetaData(fileMapList)];
                    case 1:
                        metaDataList = _a.sent();
                        size = metaDataList[identifier] ? metaDataList[identifier].size : 0;
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        size = node[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] ? node[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] : 0;
                        _a.label = 4;
                    case 4: return [2 /*return*/, Promise.resolve(size ? size : 0)];
                }
            });
        });
    };
    UpdateSizeOnDevice.prototype.updateInDb = function (contentsInDb) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, contentsInDb_1, element, contentInDb, identifier;
            return __generator(this, function (_a) {
                this.dbService.beginTransaction();
                for (_i = 0, contentsInDb_1 = contentsInDb; _i < contentsInDb_1.length; _i++) {
                    element = contentsInDb_1[_i];
                    contentInDb = element;
                    identifier = contentInDb[ContentEntry.COLUMN_NAME_IDENTIFIER];
                    this.dbService.update({
                        table: ContentEntry.TABLE_NAME,
                        selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
                        selectionArgs: [identifier],
                        modelJson: contentInDb
                    }).toPromise();
                }
                this.dbService.endTransaction(true);
                return [2 /*return*/];
            });
        });
    };
    UpdateSizeOnDevice.prototype.getMetaData = function (fileMapList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.getMetaData(fileMapList, function (entry) {
                            resolve(entry);
                        }, function (err) {
                            console.error(err);
                            reject(err);
                        });
                    })];
            });
        });
    };
    UpdateSizeOnDevice.prototype.updateTextBookSize = function (rootContentId) {
        var _this = this;
        console.log('in updateAllRootContentSize');
        var query = "SELECT * FROM " + ContentEntry.TABLE_NAME + " WHERE " + ContentEntry.COLUMN_NAME_IDENTIFIER + " == " + rootContentId;
        return this.dbService.execute(query).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.sharedPreferences.putBoolean(ContentKeys.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL, false).toPromise()];
        }); }); }), mergeMap(function (rootContentsInDb) { return __awaiter(_this, void 0, void 0, function () {
            var updateContentModels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateContentModels = [];
                        return [4 /*yield*/, Promise.all(rootContentsInDb.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var sizeOnDevice, identifiers, childContentsInDb;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getSizeOnDevice(item)];
                                        case 1:
                                            sizeOnDevice = _a.sent();
                                            identifiers = JSON.parse(item[ContentEntry.COLUMN_NAME_LOCAL_DATA]).childNodes;
                                            if (!identifiers) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.findAllChildContents(identifiers)];
                                        case 2:
                                            childContentsInDb = _a.sent();
                                            childContentsInDb.forEach(function (content) {
                                                sizeOnDevice += content[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] || 0;
                                            });
                                            item[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = sizeOnDevice;
                                            updateContentModels.push(item);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.updateInDb(updateContentModels);
                        return [2 /*return*/];
                }
            });
        }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.sharedPreferences.putBoolean(ContentKeys.KEY_IS_UPDATE_SIZE_ON_DEVICE_SUCCESSFUL, true).toPromise()];
        }); }); }));
    };
    return UpdateSizeOnDevice;
}());
export { UpdateSizeOnDevice };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXNpemUtb24tZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvaW1wb3J0L3VwZGF0ZS1zaXplLW9uLWRldmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxPQUFPLENBQUM7QUFHakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQztJQUVJLDRCQUFvQixTQUFvQixFQUFVLGlCQUFvQyxFQUFVLFdBQXdCO1FBQXBHLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDeEgsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTyxpREFBb0IsR0FBNUIsVUFBNkIsZ0JBQTBCO1FBQ25ELElBQU0sS0FBSyxHQUFHLG1CQUFpQixZQUFZLENBQUMsVUFBVSx1Q0FDL0IsWUFBWSxDQUFDLHNCQUFzQixhQUFRLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxzQ0FDN0YsWUFBWSxDQUFDLHFCQUFxQixTQUFNLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNy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LG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxFQUFBOzs0Q0FBMUYsaUJBQWlCLEdBQTZCLFNBQTRDOzRDQUNoRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dEQUM3QixZQUFZLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0Q0FDMUUsQ0FBQyxDQUFDLENBQUM7NENBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLFlBQVksQ0FBQzs0Q0FDN0QsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztpQ0FFdEMsQ0FBQyxDQUFDLEVBQUE7O3dCQVhILFNBV0csQ0FBQzt3QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Ozs7YUFDeEMsQ0FBQyxFQUNGLEdBQUcsQ0FBQztZQUNBLHNCQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLHVDQUF1QyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBO2lCQUFBLENBQzNHLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTCx5QkFBQztBQUFELENBQUMsQUExSEQsSUEwSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtNaW1lVHlwZSwgVmlzaWJpbGl0eSwgSW1wb3J0Q29udGVudENvbnRleHR9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge0NvbnRlbnRLZXlzfSBmcm9tICcuLi8uLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHsgdGFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVNpemVPbkRldmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLCBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcywgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQWxsUm9vdENvbnRlbnRTaXplKCkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kQWxsQ2hpbGRDb250ZW50cyhjaGlsZElkZW50aWZpZXJzOiBzdHJpbmdbXSk6IFByb21pc2U8Q29udGVudEVudHJ5LlNjaGVtYU1hcFtdPiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtDb250ZW50RW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gSU4gKCR7QXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKGNoaWxkSWRlbnRpZmllcnMpfSlcbiAgICAgICAgICAgICAgICAgICAgICAgQU5EICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVH0gPiAwYDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFsbFJvb3RDb250ZW50U2l6ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7Q29udGVudEVudHJ5LlRBQkxFX05BTUV9IFdIRVJFICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVH0gPiAwXG4gICAgICAgIEFORCAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZfSA9ICcke1Zpc2liaWxpdHkuREVGQVVMVC52YWx1ZU9mKCl9J2A7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgdGFwKGFzeW5jICgpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRCb29sZWFuKENvbnRlbnRLZXlzLktFWV9JU19VUERBVEVfU0laRV9PTl9ERVZJQ0VfU1VDQ0VTU0ZVTCwgZmFsc2UpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKHJvb3RDb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUNvbnRlbnRNb2RlbHM6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocm9vdENvbnRlbnRzSW5EYi5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVPbkRldmljZSA9IGF3YWl0IHRoaXMuZ2V0U2l6ZU9uRGV2aWNlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZGVudGlmaWVycyA9IEpTT04ucGFyc2UoaXRlbVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZGVudGlmaWVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZmluZEFsbENoaWxkQ29udGVudHMoaWRlbnRpZmllcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDb250ZW50c0luRGIuZm9yRWFjaChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplT25EZXZpY2UgKz0gY29udGVudFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0laRV9PTl9ERVZJQ0VdIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1bQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1NJWkVfT05fREVWSUNFXSA9IHNpemVPbkRldmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvbnRlbnRNb2RlbHMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUluRGIodXBkYXRlQ29udGVudE1vZGVscyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0Qm9vbGVhbihDb250ZW50S2V5cy5LRVlfSVNfVVBEQVRFX1NJWkVfT05fREVWSUNFX1NVQ0NFU1NGVUwsIHRydWUpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRTaXplT25EZXZpY2Uobm9kZSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGxldCBzaXplID0gMDtcbiAgICAgICAgaWYgKG5vZGVbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01JTUVfVFlQRV0gPT09IE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpKSB7XG4gICAgICAgICAgICBpZiAobm9kZVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV0gPT09IFZpc2liaWxpdHkuREVGQVVMVC52YWx1ZU9mKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTWFwTGlzdDogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdID0gW107XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXTtcbiAgICAgICAgICAgICAgICBmaWxlTWFwWydpZGVudGlmaWVyJ10gPSBpZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIGZpbGVNYXBbJ3BhdGgnXSA9IG5vZGVbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BBVEhdITtcbiAgICAgICAgICAgICAgICBmaWxlTWFwTGlzdC5wdXNoKGZpbGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFEYXRhTGlzdDogYW55ID0gYXdhaXQgdGhpcy5nZXRNZXRhRGF0YShmaWxlTWFwTGlzdCk7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IG1ldGFEYXRhTGlzdFtpZGVudGlmaWVyXSA/IG1ldGFEYXRhTGlzdFtpZGVudGlmaWVyXS5zaXplIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpemUgPSBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV0gPyBub2RlW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV0gOiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2l6ZSA/IHNpemUgOiAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHVwZGF0ZUluRGIoY29udGVudHNJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10pIHtcbiAgICAgICAgdGhpcy5kYlNlcnZpY2UuYmVnaW5UcmFuc2FjdGlvbigpO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY29udGVudHNJbkRiKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50SW5EYiA9IGVsZW1lbnQgYXMgQ29udGVudEVudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl07XG5cbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0gP2AsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2lkZW50aWZpZXJdLFxuICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogY29udGVudEluRGJcbiAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZ2V0TWV0YURhdGEoZmlsZU1hcExpc3Q6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzYnV0aWxpdHkuZ2V0TWV0YURhdGEoZmlsZU1hcExpc3QsXG4gICAgICAgICAgICAgICAgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGV4dEJvb2tTaXplKHJvb3RDb250ZW50SWQ6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gdXBkYXRlQWxsUm9vdENvbnRlbnRTaXplJyk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtDb250ZW50RW50cnkuVEFCTEVfTkFNRX0gV0hFUkUgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gPT0gJHtyb290Q29udGVudElkfWA7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgdGFwKGFzeW5jICgpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRCb29sZWFuKENvbnRlbnRLZXlzLktFWV9JU19VUERBVEVfU0laRV9PTl9ERVZJQ0VfU1VDQ0VTU0ZVTCwgZmFsc2UpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKHJvb3RDb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUNvbnRlbnRNb2RlbHM6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJvb3RDb250ZW50c0luRGIubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplT25EZXZpY2UgPSBhd2FpdCB0aGlzLmdldFNpemVPbkRldmljZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBKU09OLnBhcnNlKGl0ZW1bQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKS5jaGlsZE5vZGVzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWRlbnRpZmllcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkQ29udGVudHNJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBhd2FpdCB0aGlzLmZpbmRBbGxDaGlsZENvbnRlbnRzKGlkZW50aWZpZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHNJbkRiLmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZU9uRGV2aWNlICs9IGNvbnRlbnRbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1NJWkVfT05fREVWSUNFXSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV0gPSBzaXplT25EZXZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb250ZW50TW9kZWxzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbkRiKHVwZGF0ZUNvbnRlbnRNb2RlbHMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dEJvb2xlYW4oQ29udGVudEtleXMuS0VZX0lTX1VQREFURV9TSVpFX09OX0RFVklDRV9TVUNDRVNTRlVMLCB0cnVlKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19