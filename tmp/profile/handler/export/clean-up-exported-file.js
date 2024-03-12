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
import { ArrayUtil } from '../../../util/array-util';
import { Response } from '../../../api';
import { ErrorCode } from '../../../content';
import { LearnerAssessmentsEntry, LearnerSummaryEntry, ProfileEntry, UserEntry } from '../../db/schema';
import { MetaEntry } from '../../../telemetry/db/schema';
import { GroupEntry, GroupProfileEntry } from '../../../group-deprecated/db/schema';
import { KeyValueStoreEntry } from '../../../key-value-store/db/schema';
var CleanupExportedFile = /** @class */ (function () {
    function CleanupExportedFile(dbService, fileService) {
        this.dbService = dbService;
        this.fileService = fileService;
    }
    CleanupExportedFile.prototype.execute = function (exportContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                response = new Response();
                return [2 /*return*/, this.getAllTables().then(function (tables) {
                        var allTables = tables.map(function (obj) {
                            return obj.name;
                        });
                        return _this.removeTables(allTables, _this.getAllTablesToExclude());
                    }).then(function () {
                        return _this.deleteUnwantedProfilesAndUsers(exportContext.userIds);
                    }).then(function () {
                        return _this.deleteUnwantedProfileSummary(exportContext.userIds);
                    }).then(function () {
                        return _this.deleteUnwantedGroups(exportContext.groupIds);
                    }).then(function () {
                        return _this.deleteUnwantedGroupProfiles(exportContext.groupIds);
                    }).then(function () {
                        return _this.keepAllFrameworknChannel();
                    }).then(function () {
                        return _this.fileService.getMetaData(exportContext.destinationDBFilePath);
                    }).then(function (metaData) {
                        exportContext.size = metaData.size.toString();
                        return _this.populateMetaData({ FILE_SIZE: metaData.size });
                    }).then(function () {
                        return _this.fileService.removeFile(exportContext.destinationDBFilePath.concat('-journal'));
                    }).then(function () {
                        response.body = exportContext;
                        return response;
                    }).catch(function (e) {
                        response.errorMesg = ErrorCode.EXPORT_FAILED;
                        throw response;
                    })];
            });
        });
    };
    CleanupExportedFile.prototype.getAllTables = function () {
        var allTblesQuery = "SELECT name FROM sqlite_master WHERE type = 'table'";
        return this.dbService.execute(allTblesQuery, true).toPromise();
    };
    CleanupExportedFile.prototype.getAllTablesToExclude = function () {
        return [MetaEntry.TABLE_NAME,
            UserEntry.TABLE_NAME,
            ProfileEntry.TABLE_NAME,
            LearnerAssessmentsEntry.TABLE_NAME,
            LearnerSummaryEntry.TABLE_NAME,
            GroupEntry.TABLE_NAME,
            GroupProfileEntry.TABLE_NAME,
            KeyValueStoreEntry.TABLE_NAME];
    };
    CleanupExportedFile.prototype.removeTables = function (allTables, allTablesToExclude) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, allTables_1, table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, allTables_1 = allTables;
                        _a.label = 1;
                    case 1:
                        if (!(_i < allTables_1.length)) return [3 /*break*/, 4];
                        table = allTables_1[_i];
                        if (ArrayUtil.contains(allTablesToExclude, table)) {
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, this.dbService.execute("DROP TABLE IF EXISTS " + table, true).toPromise()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    CleanupExportedFile.prototype.populateMetaData = function (metaData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(metaData).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    var model;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                model = { key: key, value: metaData[key] };
                                return [4 /*yield*/, this.dbService.insert({
                                        table: MetaEntry.TABLE_NAME,
                                        modelJson: model, useExternalDb: true
                                    }).toPromise()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    CleanupExportedFile.prototype.deleteUnwantedProfilesAndUsers = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var profilesToRetain, usersToRetain, _i, userIds_1, userId, profilesInDb, usersInDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        profilesToRetain = [];
                        usersToRetain = [];
                        _i = 0, userIds_1 = userIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < userIds_1.length)) return [3 /*break*/, 5];
                        userId = userIds_1[_i];
                        return [4 /*yield*/, this.dbService.read({
                                table: ProfileEntry.TABLE_NAME,
                                useExternalDb: true,
                                selection: ProfileEntry.COLUMN_NAME_UID + "=?",
                                selectionArgs: [userId],
                                limit: '1'
                            }).toPromise()];
                    case 2:
                        profilesInDb = _a.sent();
                        if (profilesInDb && profilesInDb.length) {
                            profilesToRetain.push(profilesInDb[0][ProfileEntry.COLUMN_NAME_UID]);
                        }
                        return [4 /*yield*/, this.dbService.read({
                                table: UserEntry.TABLE_NAME,
                                useExternalDb: true,
                                selection: UserEntry.COLUMN_NAME_UID + "=?",
                                selectionArgs: [userId],
                                limit: '1'
                            }).toPromise()];
                    case 3:
                        usersInDb = _a.sent();
                        if (usersInDb && usersInDb.length) {
                            usersToRetain.push(usersInDb[0][UserEntry.COLUMN_NAME_UID]);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, this.cleanTable(ProfileEntry.TABLE_NAME, ProfileEntry.COLUMN_NAME_UID, profilesToRetain)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.cleanTable(UserEntry.TABLE_NAME, UserEntry.COLUMN_NAME_UID, profilesToRetain)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CleanupExportedFile.prototype.deleteUnwantedProfileSummary = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cleanTable(LearnerAssessmentsEntry.TABLE_NAME, LearnerAssessmentsEntry.COLUMN_NAME_UID, userIds)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cleanTable(LearnerSummaryEntry.TABLE_NAME, LearnerSummaryEntry.COLUMN_NAME_UID, userIds)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CleanupExportedFile.prototype.deleteUnwantedGroups = function (groupIds) {
        return __awaiter(this, void 0, void 0, function () {
            var groupsToRetain, _i, groupIds_1, groupId, groupsInDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!groupIds || !groupIds.length) {
                            return [2 /*return*/];
                        }
                        groupsToRetain = [];
                        _i = 0, groupIds_1 = groupIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < groupIds_1.length)) return [3 /*break*/, 4];
                        groupId = groupIds_1[_i];
                        return [4 /*yield*/, this.dbService.read({
                                table: GroupEntry.TABLE_NAME,
                                useExternalDb: true,
                                selection: GroupEntry.COLUMN_NAME_GID + "=?",
                                selectionArgs: [groupId],
                                limit: '1'
                            }).toPromise()];
                    case 2:
                        groupsInDb = _a.sent();
                        if (groupsInDb && groupsInDb.length) {
                            groupsToRetain.push(groupsInDb[0][GroupProfileEntry.COLUMN_NAME_GID]);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.cleanTable(GroupEntry.TABLE_NAME, GroupEntry.COLUMN_NAME_GID, groupsToRetain)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CleanupExportedFile.prototype.deleteUnwantedGroupProfiles = function (groupIds) {
        return __awaiter(this, void 0, void 0, function () {
            var groupsToRetain, _i, groupIds_2, groupId, groupsInDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!groupIds || !groupIds.length) {
                            return [2 /*return*/];
                        }
                        groupsToRetain = [];
                        _i = 0, groupIds_2 = groupIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < groupIds_2.length)) return [3 /*break*/, 4];
                        groupId = groupIds_2[_i];
                        return [4 /*yield*/, this.dbService.read({
                                table: GroupProfileEntry.TABLE_NAME,
                                useExternalDb: true,
                                selection: GroupProfileEntry.COLUMN_NAME_GID + "=?",
                                selectionArgs: [groupId],
                                limit: '1'
                            }).toPromise()];
                    case 2:
                        groupsInDb = _a.sent();
                        if (groupsInDb && groupsInDb.length) {
                            groupsToRetain.push(groupsInDb[0][ProfileEntry.COLUMN_NAME_UID]);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.cleanTable(GroupEntry.TABLE_NAME, GroupEntry.COLUMN_NAME_GID, groupIds)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CleanupExportedFile.prototype.keepAllFrameworknChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, keyvalueStores;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT *  FROM  " + KeyValueStoreEntry.TABLE_NAME + "\n                       WHERE " + KeyValueStoreEntry.COLUMN_NAME_KEY + " LIKE 'channel_details_key-%'\n                       OR " + KeyValueStoreEntry.COLUMN_NAME_KEY + " LIKE 'framework_details_key-%'\n                       OR " + KeyValueStoreEntry.COLUMN_NAME_KEY + " LIKE 'form-%'";
                        return [4 /*yield*/, this.dbService.execute(query, true).toPromise()];
                    case 1:
                        keyvalueStores = _a.sent();
                        return [4 /*yield*/, this.dbService.execute("DELETE FROM " + KeyValueStoreEntry.TABLE_NAME, true)];
                    case 2:
                        _a.sent();
                        keyvalueStores.forEach(function (keyValueInDb) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.dbService.insert({
                                            table: KeyValueStoreEntry.TABLE_NAME,
                                            useExternalDb: true,
                                            modelJson: keyValueInDb
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    CleanupExportedFile.prototype.cleanTable = function (tableName, coloumn, entities) {
        return __awaiter(this, void 0, void 0, function () {
            var entityFilter, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!entities || !entities.length) {
                            return [2 /*return*/];
                        }
                        entityFilter = ArrayUtil.joinPreservingQuotes(entities);
                        query = "DELETE FROM " + tableName + "\n             WHERE " + coloumn + "  NOT IN(" + entityFilter + ")";
                        return [4 /*yield*/, this.dbService.execute(query, true).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CleanupExportedFile;
}());
export { CleanupExportedFile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4tdXAtZXhwb3J0ZWQtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9maWxlL2hhbmRsZXIvZXhwb3J0L2NsZWFuLXVwLWV4cG9ydGVkLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTNDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdEcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNsRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUV0RTtJQUVJLDZCQUFvQixTQUFvQixFQUNwQixXQUF3QjtRQUR4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzVDLENBQUM7SUFFWSxxQ0FBTyxHQUFwQixVQUFxQixhQUFtQzs7Ozs7Z0JBQzlDLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxzQkFBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBYTt3QkFDMUMsSUFBTSxTQUFTLEdBQWEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7NEJBQ3ZDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsT0FBTyxLQUFJLENB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Ozs7NENBQ3BFLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOzRDQUN4QixLQUFLLEVBQUUsa0JBQWtCLENBQUMsVUFBVTs0Q0FDcEMsYUFBYSxFQUFFLElBQUk7NENBQ25CLFNBQVMsRUFBRSxZQUFZO3lDQUMxQixDQUFDLEVBQUE7O3dDQUpGLFNBSUUsQ0FBQzs7Ozs2QkFDTixDQUFDLENBQUM7Ozs7O0tBRU47SUFHYSx3Q0FBVSxHQUF4QixVQUF5QixTQUFpQixFQUFFLE9BQWUsRUFBRSxRQUFrQjs7Ozs7O3dCQUMzRSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTs0QkFDL0Isc0JBQU87eUJBQ1Y7d0JBQ0ssWUFBWSxHQUFXLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDaEUsS0FBSyxHQUNQLGlCQUFlLFNBQVMsNkJBQ2YsT0FBTyxpQkFBWSxZQUFZLE1BQUcsQ0FBQzt3QkFDaEQscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBckQsU0FBcUQsQ0FBQzs7Ozs7S0FDekQ7SUFDTCwwQkFBQztBQUFELENBQUMsQUFyTEQsSUFxTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtFcnJvckNvZGV9IGZyb20gJy4uLy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtFeHBvcnRQcm9maWxlQ29udGV4dH0gZnJvbSAnLi4vLi4vZGVmL2V4cG9ydC1wcm9maWxlLWNvbnRleHQnO1xuaW1wb3J0IHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeSwgTGVhcm5lclN1bW1hcnlFbnRyeSwgUHJvZmlsZUVudHJ5LCBVc2VyRW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge01ldGFFbnRyeX0gZnJvbSAnLi4vLi4vLi4vdGVsZW1ldHJ5L2RiL3NjaGVtYSc7XG5pbXBvcnQge0dyb3VwRW50cnksIEdyb3VwUHJvZmlsZUVudHJ5fSBmcm9tICcuLi8uLi8uLi9ncm91cC1kZXByZWNhdGVkL2RiL3NjaGVtYSc7XG5pbXBvcnQge0tleVZhbHVlU3RvcmVFbnRyeX0gZnJvbSAnLi4vLi4vLi4va2V5LXZhbHVlLXN0b3JlL2RiL3NjaGVtYSc7XG5cbmV4cG9ydCBjbGFzcyBDbGVhbnVwRXhwb3J0ZWRGaWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZShleHBvcnRDb250ZXh0OiBFeHBvcnRQcm9maWxlQ29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhYmxlcygpLnRoZW4oKHRhYmxlczogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFRhYmxlczogc3RyaW5nW10gPSB0YWJsZXMubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVRhYmxlcyhhbGxUYWJsZXMsIHRoaXMuZ2V0QWxsVGFibGVzVG9FeGNsdWRlKCkpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZVVud2FudGVkUHJvZmlsZXNBbmRVc2VycyhleHBvcnRDb250ZXh0LnVzZXJJZHMpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZVVud2FudGVkUHJvZmlsZVN1bW1hcnkoZXhwb3J0Q29udGV4dC51c2VySWRzKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVVbndhbnRlZEdyb3VwcyhleHBvcnRDb250ZXh0Lmdyb3VwSWRzKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVVbndhbnRlZEdyb3VwUHJvZmlsZXMoZXhwb3J0Q29udGV4dC5ncm91cElkcyk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2VlcEFsbEZyYW1ld29ya25DaGFubmVsKCk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UuZ2V0TWV0YURhdGEoZXhwb3J0Q29udGV4dC5kZXN0aW5hdGlvbkRCRmlsZVBhdGghKTtcbiAgICAgICAgfSkudGhlbigobWV0YURhdGE6IE1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICBleHBvcnRDb250ZXh0LnNpemUgPSBtZXRhRGF0YS5zaXplLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3B1bGF0ZU1ldGFEYXRhKHtGSUxFX1NJWkU6IG1ldGFEYXRhLnNpemV9KTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxlU2VydmljZS5yZW1vdmVGaWxlKGV4cG9ydENvbnRleHQuZGVzdGluYXRpb25EQkZpbGVQYXRoIS5jb25jYXQoJy1qb3VybmFsJykpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBleHBvcnRDb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3JNZXNnID0gRXJyb3JDb2RlLkVYUE9SVF9GQUlMRUQ7XG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBbGxUYWJsZXMoKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgICAgICBjb25zdCBhbGxUYmxlc1F1ZXJ5ID0gYFNFTEVDVCBuYW1lIEZST00gc3FsaXRlX21hc3RlciBXSEVSRSB0eXBlID0gJ3RhYmxlJ2A7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKGFsbFRibGVzUXVlcnksIHRydWUpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QWxsVGFibGVzVG9FeGNsdWRlKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtNZXRhRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIFVzZXJFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgTGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgR3JvdXBFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgR3JvdXBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIEtleVZhbHVlU3RvcmVFbnRyeS5UQUJMRV9OQU1FXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZVRhYmxlcyhhbGxUYWJsZXM6IHN0cmluZ1tdLCBhbGxUYWJsZXNUb0V4Y2x1ZGU6IHN0cmluZ1tdKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGZvciAoY29uc3QgdGFibGUgb2YgYWxsVGFibGVzKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXlVdGlsLmNvbnRhaW5zKGFsbFRhYmxlc1RvRXhjbHVkZSwgdGFibGUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS5leGVjdXRlKGBEUk9QIFRBQkxFIElGIEVYSVNUUyAke3RhYmxlfWAsIHRydWUpLnRvUHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcG9wdWxhdGVNZXRhRGF0YShtZXRhRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICAgICAgICBPYmplY3Qua2V5cyhtZXRhRGF0YSkuZm9yRWFjaChhc3luYyAoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHtrZXk6IGtleSwgdmFsdWU6IG1ldGFEYXRhW2tleV19O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICB0YWJsZTogTWV0YUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgbW9kZWxKc29uOiBtb2RlbCwgdXNlRXh0ZXJuYWxEYjogdHJ1ZVxuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZGVsZXRlVW53YW50ZWRQcm9maWxlc0FuZFVzZXJzKHVzZXJJZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzVG9SZXRhaW46IHN0cmluZ1tdID0gW107XG4gICAgICAgIGNvbnN0IHVzZXJzVG9SZXRhaW46IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdXNlcklkIG9mIHVzZXJJZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVzSW5EYjogUHJvZmlsZUVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHVzZUV4dGVybmFsRGI6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfT0/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdXNlcklkXSxcbiAgICAgICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmIChwcm9maWxlc0luRGIgJiYgcHJvZmlsZXNJbkRiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHByb2ZpbGVzVG9SZXRhaW4ucHVzaChwcm9maWxlc0luRGJbMF1bUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB1c2Vyc0luRGI6IFVzZXJFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBVc2VyRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICB1c2VFeHRlcm5hbERiOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7VXNlckVudHJ5LkNPTFVNTl9OQU1FX1VJRH09P2AsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VzZXJJZF0sXG4gICAgICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBpZiAodXNlcnNJbkRiICYmIHVzZXJzSW5EYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB1c2Vyc1RvUmV0YWluLnB1c2godXNlcnNJbkRiWzBdW1VzZXJFbnRyeS5DT0xVTU5fTkFNRV9VSURdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuY2xlYW5UYWJsZShQcm9maWxlRW50cnkuVEFCTEVfTkFNRSwgUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRCwgcHJvZmlsZXNUb1JldGFpbik7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xlYW5UYWJsZShVc2VyRW50cnkuVEFCTEVfTkFNRSwgVXNlckVudHJ5LkNPTFVNTl9OQU1FX1VJRCwgcHJvZmlsZXNUb1JldGFpbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBkZWxldGVVbndhbnRlZFByb2ZpbGVTdW1tYXJ5KHVzZXJJZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xlYW5UYWJsZShMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLCBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9VSUQsIHVzZXJJZHMpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsZWFuVGFibGUoTGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FLCBMZWFybmVyU3VtbWFyeUVudHJ5LkNPTFVNTl9OQU1FX1VJRCwgdXNlcklkcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBkZWxldGVVbndhbnRlZEdyb3Vwcyhncm91cElkczogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKCFncm91cElkcyB8fCAhZ3JvdXBJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBzVG9SZXRhaW46IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXBJZCBvZiBncm91cElkcykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBzSW5EYjogR3JvdXBFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0dyb3VwRW50cnkuQ09MVU1OX05BTUVfR0lEfT0/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbZ3JvdXBJZF0sXG4gICAgICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICBpZiAoZ3JvdXBzSW5EYiAmJiBncm91cHNJbkRiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwc1RvUmV0YWluLnB1c2goZ3JvdXBzSW5EYlswXVtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HSURdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmNsZWFuVGFibGUoR3JvdXBFbnRyeS5UQUJMRV9OQU1FLCBHcm91cEVudHJ5LkNPTFVNTl9OQU1FX0dJRCwgZ3JvdXBzVG9SZXRhaW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZGVsZXRlVW53YW50ZWRHcm91cFByb2ZpbGVzKGdyb3VwSWRzOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAoIWdyb3VwSWRzIHx8ICFncm91cElkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncm91cHNUb1JldGFpbjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBncm91cElkIG9mIGdyb3VwSWRzKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cHNJbkRiOiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHVzZUV4dGVybmFsRGI6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HSUR9PT9gLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtncm91cElkXSxcbiAgICAgICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmIChncm91cHNJbkRiICYmIGdyb3Vwc0luRGIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzVG9SZXRhaW4ucHVzaChncm91cHNJbkRiWzBdW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmNsZWFuVGFibGUoR3JvdXBFbnRyeS5UQUJMRV9OQU1FLCBHcm91cEVudHJ5LkNPTFVNTl9OQU1FX0dJRCwgZ3JvdXBJZHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMga2VlcEFsbEZyYW1ld29ya25DaGFubmVsKCkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiAgRlJPTSAgJHtLZXlWYWx1ZVN0b3JlRW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtLZXlWYWx1ZVN0b3JlRW50cnkuQ09MVU1OX05BTUVfS0VZfSBMSUtFICdjaGFubmVsX2RldGFpbHNfa2V5LSUnXG4gICAgICAgICAgICAgICAgICAgICAgIE9SICR7S2V5VmFsdWVTdG9yZUVudHJ5LkNPTFVNTl9OQU1FX0tFWX0gTElLRSAnZnJhbWV3b3JrX2RldGFpbHNfa2V5LSUnXG4gICAgICAgICAgICAgICAgICAgICAgIE9SICR7S2V5VmFsdWVTdG9yZUVudHJ5LkNPTFVNTl9OQU1FX0tFWX0gTElLRSAnZm9ybS0lJ2A7XG5cbiAgICAgICAgY29uc3Qga2V5dmFsdWVTdG9yZXM6IEtleVZhbHVlU3RvcmVFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnksIHRydWUpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYERFTEVURSBGUk9NICR7S2V5VmFsdWVTdG9yZUVudHJ5LlRBQkxFX05BTUV9YCwgdHJ1ZSk7XG4gICAgICAgIGtleXZhbHVlU3RvcmVzLmZvckVhY2goYXN5bmMgKGtleVZhbHVlSW5EYjogS2V5VmFsdWVTdG9yZUVudHJ5LlNjaGVtYU1hcCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICB0YWJsZTogS2V5VmFsdWVTdG9yZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtb2RlbEpzb246IGtleVZhbHVlSW5EYlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGFzeW5jIGNsZWFuVGFibGUodGFibGVOYW1lOiBzdHJpbmcsIGNvbG91bW46IHN0cmluZywgZW50aXRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmICghZW50aXRpZXMgfHwgIWVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVudGl0eUZpbHRlcjogc3RyaW5nID0gQXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKGVudGl0aWVzKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPVxuICAgICAgICAgICAgYERFTEVURSBGUk9NICR7dGFibGVOYW1lfVxuICAgICAgICAgICAgIFdIRVJFICR7Y29sb3Vtbn0gIE5PVCBJTigke2VudGl0eUZpbHRlcn0pYDtcbiAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSwgdHJ1ZSkudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19