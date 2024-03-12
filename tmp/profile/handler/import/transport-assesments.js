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
import { LearnerAssessmentsEntry, LearnerSummaryEntry, ProfileEntry } from '../../db/schema';
import { Response } from '../../../api';
import { ArrayUtil } from '../../../util/array-util';
import { SummarizerQueries } from '../../../summarizer';
var TransportAssesments = /** @class */ (function () {
    function TransportAssesments(dbService) {
        this.dbService = dbService;
    }
    TransportAssesments.prototype.execute = function (importContext) {
        var _this = this;
        var response = new Response();
        return this.dbService.read({
            table: ProfileEntry.TABLE_NAME,
            orderBy: ProfileEntry.COLUMN_NAME_HANDLE + " asc",
            useExternalDb: true
        }).toPromise().then(function (profiles) {
            var userIds = profiles.map(function (element) {
                return element[ProfileEntry.COLUMN_NAME_UID];
            });
            return _this.deleteUnwantedAssesments(userIds);
        }).then(function () {
            return _this.saveLearnerAssesmentDetails();
        }).then(function () {
            return _this.saveLearnerSummary();
        }).then(function () {
            response.body = importContext;
            return response;
        });
    };
    TransportAssesments.prototype.deleteUnwantedAssesments = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var uidsFilter, learnerAssesmentDeleteQuery, learnerSummaryDeleteQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uidsFilter = ArrayUtil.joinPreservingQuotes(userIds);
                        learnerAssesmentDeleteQuery = "DELETE FROM " + LearnerAssessmentsEntry.TABLE_NAME + "\n             WHERE " + LearnerAssessmentsEntry.COLUMN_NAME_UID + "  NOT IN(" + uidsFilter + ")";
                        learnerSummaryDeleteQuery = "DELETE FROM " + LearnerSummaryEntry.TABLE_NAME + "\n             WHERE " + LearnerSummaryEntry.COLUMN_NAME_UID + "  NOT IN(" + uidsFilter + ")";
                        return [4 /*yield*/, this.dbService.execute(learnerAssesmentDeleteQuery, true).toPromise()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dbService.execute(learnerSummaryDeleteQuery, true).toPromise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransportAssesments.prototype.saveLearnerAssesmentDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assesmentsFromExternalDb, _i, assesmentsFromExternalDb_1, element, assesmentFromExternalDb, filter, query, assesmentsInCurrentDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.read({
                            table: LearnerAssessmentsEntry.TABLE_NAME,
                            orderBy: "" + LearnerAssessmentsEntry.COLUMN_NAME_Q_INDEX,
                            useExternalDb: true
                        }).toPromise()];
                    case 1:
                        assesmentsFromExternalDb = _a.sent();
                        _i = 0, assesmentsFromExternalDb_1 = assesmentsFromExternalDb;
                        _a.label = 2;
                    case 2:
                        if (!(_i < assesmentsFromExternalDb_1.length)) return [3 /*break*/, 8];
                        element = assesmentsFromExternalDb_1[_i];
                        assesmentFromExternalDb = element;
                        filter = SummarizerQueries.getFilterForLearnerAssessmentDetails(assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_QID], assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_UID], assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID], assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_HIERARCHY_DATA]);
                        query = SummarizerQueries.getLearnerAssessmentsQuery(filter);
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 3:
                        assesmentsInCurrentDb = _a.sent();
                        if (!(assesmentsInCurrentDb && assesmentsInCurrentDb.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.dbService.update({
                                table: LearnerAssessmentsEntry.TABLE_NAME,
                                selection: LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID + " = ?\n                                AND " + LearnerAssessmentsEntry.COLUMN_NAME_UID + " = ?\n                                AND " + LearnerAssessmentsEntry.COLUMN_NAME_QID + " = ?",
                                selectionArgs: [assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID],
                                    assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_UID],
                                    assesmentFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_QID]],
                                modelJson: assesmentFromExternalDb
                            }).toPromise()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.dbService.insert({
                            table: LearnerAssessmentsEntry.TABLE_NAME,
                            modelJson: assesmentFromExternalDb
                        }).toPromise()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TransportAssesments.prototype.saveLearnerSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var summariesFromExternalDb, _i, summariesFromExternalDb_1, element, summaryFromExternalDb, summaryInCurrentDb;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.read({
                            table: LearnerSummaryEntry.TABLE_NAME,
                            useExternalDb: true
                        }).toPromise()];
                    case 1:
                        summariesFromExternalDb = _a.sent();
                        _i = 0, summariesFromExternalDb_1 = summariesFromExternalDb;
                        _a.label = 2;
                    case 2:
                        if (!(_i < summariesFromExternalDb_1.length)) return [3 /*break*/, 8];
                        element = summariesFromExternalDb_1[_i];
                        summaryFromExternalDb = element;
                        return [4 /*yield*/, this.dbService.read({
                                table: LearnerSummaryEntry.TABLE_NAME,
                                selection: LearnerSummaryEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerSummaryEntry.COLUMN_NAME_UID + " = ?",
                                selectionArgs: [summaryFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID],
                                    summaryFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_UID]],
                            }).toPromise()];
                    case 3:
                        summaryInCurrentDb = _a.sent();
                        if (!(summaryInCurrentDb && summaryInCurrentDb.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.dbService.update({
                                table: LearnerSummaryEntry.TABLE_NAME,
                                selection: LearnerSummaryEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerSummaryEntry.COLUMN_NAME_UID + " = ?",
                                selectionArgs: [summaryFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID],
                                    summaryFromExternalDb[LearnerAssessmentsEntry.COLUMN_NAME_UID]],
                                modelJson: summaryFromExternalDb
                            }).toPromise()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.dbService.insert({
                            table: LearnerSummaryEntry.TABLE_NAME,
                            modelJson: summaryFromExternalDb
                        }).toPromise()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8:
                        summariesFromExternalDb.forEach(function (summaryFromExternalDB) { return __awaiter(_this, void 0, void 0, function () {
                            var filter, query, assesmentsInCurrentDb;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filter = SummarizerQueries.getFilterForLearnerAssessmentDetails(summaryFromExternalDB[LearnerAssessmentsEntry.COLUMN_NAME_QID], summaryFromExternalDB[LearnerAssessmentsEntry.COLUMN_NAME_UID], summaryFromExternalDB[LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID], summaryFromExternalDB[LearnerAssessmentsEntry.COLUMN_NAME_HIERARCHY_DATA]);
                                        query = SummarizerQueries.getLearnerAssessmentsQuery(filter);
                                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                                    case 1:
                                        assesmentsInCurrentDb = _a.sent();
                                        if (!(assesmentsInCurrentDb && assesmentsInCurrentDb.length)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.dbService.update({
                                                table: LearnerSummaryEntry.TABLE_NAME,
                                                modelJson: assesmentsInCurrentDb[0]
                                            }).toPromise()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, this.dbService.insert({
                                            table: LearnerSummaryEntry.TABLE_NAME,
                                            modelJson: assesmentsInCurrentDb[0]
                                        }).toPromise()];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return TransportAssesments;
}());
export { TransportAssesments };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWFzc2VzbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsZS9oYW5kbGVyL2ltcG9ydC90cmFuc3BvcnQtYXNzZXNtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFdEQ7SUFDSSw2QkFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLGFBQW1DO1FBQWxELGlCQW1CQztRQWxCRyxJQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVO1lBQzlCLE9BQU8sRUFBSyxZQUFZLENBQUMsa0JBQWtCLFNBQU07WUFDakQsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWtDO1lBQ25ELElBQU0sT0FBTyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2dCQUMzQyxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMs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QUFxRDt3Q0FDckQscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0RBQ3hCLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxVQUFVO2dEQUNyQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDOzZDQUN0QyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dDQUhkLFNBR2MsQ0FBQzs7NENBRWYscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7NENBQ3hCLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxVQUFVOzRDQUNyQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO3lDQUN0QyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dDQUhkLFNBR2MsQ0FBQzs7Ozs7NkJBRXRCLENBQUMsQ0FBQzs7Ozs7S0FDTjtJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQTFIRCxJQTBIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0ltcG9ydFByb2ZpbGVDb250ZXh0fSBmcm9tICcuLi8uLi9kZWYvaW1wb3J0LXByb2ZpbGUtY29udGV4dCc7XG5pbXBvcnQge0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LCBMZWFybmVyU3VtbWFyeUVudHJ5LCBQcm9maWxlRW50cnl9IGZyb20gJy4uLy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge1N1bW1hcml6ZXJRdWVyaWVzfSBmcm9tICcuLi8uLi8uLi9zdW1tYXJpemVyJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEFzc2VzbWVudHMge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShpbXBvcnRDb250ZXh0OiBJbXBvcnRQcm9maWxlQ29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIG9yZGVyQnk6IGAke1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9IQU5ETEV9IGFzY2AsXG4gICAgICAgICAgICB1c2VFeHRlcm5hbERiOiB0cnVlXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpLnRoZW4oKHByb2ZpbGVzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZHM6IHN0cmluZ1tdID0gcHJvZmlsZXMubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZVVud2FudGVkQXNzZXNtZW50cyh1c2VySWRzKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlTGVhcm5lckFzc2VzbWVudERldGFpbHMoKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlTGVhcm5lclN1bW1hcnkoKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gaW1wb3J0Q29udGV4dDtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBkZWxldGVVbndhbnRlZEFzc2VzbWVudHModXNlcklkczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgdWlkc0ZpbHRlcjogc3RyaW5nID0gQXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKHVzZXJJZHMpO1xuICAgICAgICBjb25zdCBsZWFybmVyQXNzZXNtZW50RGVsZXRlUXVlcnkgPVxuICAgICAgICAgICAgYERFTEVURSBGUk9NICR7TGVhcm5lckFzc2Vzc21lbnRzRW50cnkuVEFCTEVfTkFNRX1cbiAgICAgICAgICAgICBXSEVSRSAke0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX1VJRH0gIE5PVCBJTigke3VpZHNGaWx0ZXJ9KWA7XG4gICAgICAgIGNvbnN0IGxlYXJuZXJTdW1tYXJ5RGVsZXRlUXVlcnkgPVxuICAgICAgICAgICAgYERFTEVURSBGUk9NICR7TGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgIFdIRVJFICR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ICBOT1QgSU4oJHt1aWRzRmlsdGVyfSlgO1xuICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS5leGVjdXRlKGxlYXJuZXJBc3Nlc21lbnREZWxldGVRdWVyeSwgdHJ1ZSkudG9Qcm9taXNlKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUobGVhcm5lclN1bW1hcnlEZWxldGVRdWVyeSwgdHJ1ZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzYXZlTGVhcm5lckFzc2VzbWVudERldGFpbHMoKSB7XG4gICAgICAgIGNvbnN0IGFzc2VzbWVudHNGcm9tRXh0ZXJuYWxEYjogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuU2NoZW1hTWFwW10gPSBhd2FpdCB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgb3JkZXJCeTogYCR7TGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfUV9JTkRFWH1gLFxuICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZVxuICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGFzc2VzbWVudHNGcm9tRXh0ZXJuYWxEYikge1xuICAgICAgICAgICAgY29uc3QgYXNzZXNtZW50RnJvbUV4dGVybmFsRGIgPSBlbGVtZW50IGFzIExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlNjaGVtYU1hcDtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IFN1bW1hcml6ZXJRdWVyaWVzLmdldEZpbHRlckZvckxlYXJuZXJBc3Nlc3NtZW50RGV0YWlscyhcbiAgICAgICAgICAgICAgICBhc3Nlc21lbnRGcm9tRXh0ZXJuYWxEYltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9RSURdLFxuICAgICAgICAgICAgICAgIGFzc2VzbWVudEZyb21FeHRlcm5hbERiW0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX1VJRF0sXG4gICAgICAgICAgICAgICAgYXNzZXNtZW50RnJvbUV4dGVybmFsRGJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRF0sXG4gICAgICAgICAgICAgICAgYXNzZXNtZW50RnJvbUV4dGVybmFsRGJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfSElFUkFSQ0hZX0RBVEFdKTtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0TGVhcm5lckFzc2Vzc21lbnRzUXVlcnkoZmlsdGVyKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2VzbWVudHNJbkN1cnJlbnREYjogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuU2NoZW1hTWFwW10gPSBhd2FpdCB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmIChhc3Nlc21lbnRzSW5DdXJyZW50RGIgJiYgYXNzZXNtZW50c0luQ3VycmVudERiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfSUR9ID0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBTkQgJHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBTkQgJHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9RSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFthc3Nlc21lbnRGcm9tRXh0ZXJuYWxEYltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VzbWVudEZyb21FeHRlcm5hbERiW0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX1VJRF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3Nlc21lbnRGcm9tRXh0ZXJuYWxEYltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9RSURdXSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBhc3Nlc21lbnRGcm9tRXh0ZXJuYWxEYlxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBhc3Nlc21lbnRGcm9tRXh0ZXJuYWxEYlxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzYXZlTGVhcm5lclN1bW1hcnkoKSB7XG4gICAgICAgIGNvbnN0IHN1bW1hcmllc0Zyb21FeHRlcm5hbERiOiBMZWFybmVyU3VtbWFyeUVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogTGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgdXNlRXh0ZXJuYWxEYjogdHJ1ZVxuICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHN1bW1hcmllc0Zyb21FeHRlcm5hbERiKSB7XG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5RnJvbUV4dGVybmFsRGIgPSBlbGVtZW50IGFzIExlYXJuZXJTdW1tYXJ5RW50cnkuU2NoZW1hTWFwO1xuICAgICAgICAgICAgY29uc3Qgc3VtbWFyeUluQ3VycmVudERiOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5TY2hlbWFNYXBbXSA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtMZWFybmVyU3VtbWFyeUVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfSUR9ID0gPyBBTkQgJHtMZWFybmVyU3VtbWFyeUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbc3VtbWFyeUZyb21FeHRlcm5hbERiW0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfSURdLFxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5RnJvbUV4dGVybmFsRGJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfVUlEXV0sXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmIChzdW1tYXJ5SW5DdXJyZW50RGIgJiYgc3VtbWFyeUluQ3VycmVudERiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSA9ID8gQU5EICR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtzdW1tYXJ5RnJvbUV4dGVybmFsRGJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5RnJvbUV4dGVybmFsRGJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfVUlEXV0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogc3VtbWFyeUZyb21FeHRlcm5hbERiXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogc3VtbWFyeUZyb21FeHRlcm5hbERiXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VtbWFyaWVzRnJvbUV4dGVybmFsRGIuZm9yRWFjaChhc3luYyAoc3VtbWFyeUZyb21FeHRlcm5hbERCOiBMZWFybmVyU3VtbWFyeUVudHJ5LlNjaGVtYU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0RmlsdGVyRm9yTGVhcm5lckFzc2Vzc21lbnREZXRhaWxzKFxuICAgICAgICAgICAgICAgIHN1bW1hcnlGcm9tRXh0ZXJuYWxEQltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9RSURdLFxuICAgICAgICAgICAgICAgIHN1bW1hcnlGcm9tRXh0ZXJuYWxEQltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9VSURdLFxuICAgICAgICAgICAgICAgIHN1bW1hcnlGcm9tRXh0ZXJuYWxEQltMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEXSxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5RnJvbUV4dGVybmFsREJbTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfSElFUkFSQ0hZX0RBVEFdKTtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0TGVhcm5lckFzc2Vzc21lbnRzUXVlcnkoZmlsdGVyKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2VzbWVudHNJbkN1cnJlbnREYjogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuU2NoZW1hTWFwW10gPSBhd2FpdCB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIGlmIChhc3Nlc21lbnRzSW5DdXJyZW50RGIgJiYgYXNzZXNtZW50c0luQ3VycmVudERiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogYXNzZXNtZW50c0luQ3VycmVudERiWzBdXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogYXNzZXNtZW50c0luQ3VycmVudERiWzBdXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19