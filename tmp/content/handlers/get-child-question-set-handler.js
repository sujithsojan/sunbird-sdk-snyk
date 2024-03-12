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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { ContentEntry } from '../db/schema';
import { ContentUtil } from '../util/content-util';
var GetChildQuestionSetHandler = /** @class */ (function () {
    function GetChildQuestionSetHandler(contentService, dbService, storageService, fileService) {
        this.contentService = contentService;
        this.dbService = dbService;
        this.storageService = storageService;
        this.fileService = fileService;
    }
    GetChildQuestionSetHandler.prototype.handle = function (questionSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, questionSet, path, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getQuery(questionSetId);
                        return [4 /*yield*/, this.getQuestionSetFromQuery(query)];
                    case 1:
                        questionSet = _a.sent();
                        if (!(!questionSet || !questionSet.isAvailableLocally)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchServerChildQuestions(questionSetId)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!questionSet.children) {
                            return [2 /*return*/, []];
                        }
                        _a.label = 4;
                    case 4:
                        path = this.storageService.getStorageDestinationDirectoryPath();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.fetchDBChildQuestions(questionSet, path)];
                    case 6:
                        questionSet = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        return [2 /*return*/, questionSet.children];
                    case 8: return [2 /*return*/, questionSet.children];
                }
            });
        });
    };
    GetChildQuestionSetHandler.prototype.fetchDBChildQuestions = function (questionSet, path) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var childrenSet, _b, _c, child, newQuestionSet, query, question, data, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!questionSet || !questionSet.children) {
                            return [2 /*return*/, questionSet];
                        }
                        childrenSet = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, 12, 17]);
                        _b = __asyncValues(questionSet.children);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 10];
                        child = _c.value;
                        if (!(child.objectType === 'QuestionSet')) return [3 /*break*/, 7];
                        newQuestionSet = void 0;
                        query = this.getQuery(child.identifier);
                        return [4 /*yield*/, this.getQuestionSetFromQuery(query)];
                    case 4:
                        newQuestionSet = _d.sent();
                        if (!(newQuestionSet && newQuestionSet.children)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fetchDBChildQuestions(newQuestionSet, path)];
                    case 5:
                        newQuestionSet = _d.sent();
                        childrenSet.push(newQuestionSet);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        if (!(child.objectType === 'Question')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.fileService.readAsText(path + "content/" + questionSet.identifier + "/" + child.identifier, 'index.json')];
                    case 8:
                        question = _d.sent();
                        if (question && (typeof question === 'string')) {
                            data = JSON.parse(question);
                            if (data && data.archive && data.archive.items.length) {
                                childrenSet.push(data.archive.items[0]);
                            }
                        }
                        _d.label = 9;
                    case 9: return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _d.trys.push([12, , 15, 16]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(_b)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17:
                        questionSet.children = childrenSet;
                        return [2 /*return*/, questionSet];
                }
            });
        });
    };
    GetChildQuestionSetHandler.prototype.getQuery = function (questionSetId) {
        return "SELECT * FROM " + ContentEntry.TABLE_NAME + " WHERE (" + ContentEntry.COLUMN_NAME_IDENTIFIER + " = '" + questionSetId + "')";
    };
    GetChildQuestionSetHandler.prototype.getQuestionSetFromQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var contentInDb, questionSetData, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbService.execute(query).toPromise()];
                    case 1:
                        contentInDb = _a.sent();
                        if (contentInDb && contentInDb.length && contentInDb[0][ContentEntry.COLUMN_NAME_LOCAL_DATA]) {
                            questionSetData = JSON.parse(contentInDb[0][ContentEntry.COLUMN_NAME_LOCAL_DATA]);
                            questionSetData['isAvailableLocally'] = ContentUtil.isAvailableLocally(contentInDb[0][ContentEntry.COLUMN_NAME_CONTENT_STATE]);
                            return [2 /*return*/, questionSetData];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GetChildQuestionSetHandler.prototype.fetchServerChildQuestions = function (questionSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var questionSetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contentService.getQuestionSetHierarchy(questionSetId).toPromise()];
                    case 1:
                        questionSetData = _a.sent();
                        if (questionSetData && questionSetData.questionset && questionSetData.questionset.children) {
                            return [2 /*return*/, questionSetData.questionset.children];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    return GetChildQuestionSetHandler;
}());
export { GetChildQuestionSetHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNoaWxkLXF1ZXN0aW9uLXNldC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvZ2V0LWNoaWxkLXF1ZXN0aW9uLXNldC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVuRDtJQUNJLG9DQUNZLGNBQWtDLEVBQ2xDLFNBQW9CLEVBQ3BCLGNBQThCLEVBQzlCLFdBQXdCO1FBSHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNsQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUNsQyxDQUFDO0lBRUcsMkNBQU0sR0FBWixVQUFhLGFBQWE7Ozs7Ozt3QkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBRTdCLHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQXZELFdBQVcsR0FBRyxTQUF5QyxDQUFDOzZCQUVyRCxDQUFBLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFBLEVBQS9DLHdCQUErQzt3QkFDdkMscUJBQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxFQUFBOzRCQUExRCxzQkFBTyxTQUFtRCxFQUFDOzt3QkFDeEQsSUFBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUM7NEJBQzVCLHNCQUFPLEVBQUUsRUFBQzt5QkFDYjs7O3dCQUNLLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtDQUFrQyxFQUFFLENB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QyxvQkFBb0IsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFFLENBQUMsQ0FBQzs0QkFDaEksc0JBQU8sZUFBZSxFQUFDO3lCQUMxQjt3QkFDRCxzQkFBTyxJQUFJLEVBQUM7Ozt3QkFFWixzQkFBTyxJQUFJLEVBQUM7Ozs7O0tBRW5CO0lBRUssOERBQXlCLEdBQS9CLFVBQWdDLGFBQWE7Ozs7OzRCQUNaLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFuRyxlQUFlLEdBQVEsU0FBNEU7d0JBQ3pHLElBQUcsZUFBZSxJQUFJLGVBQWUsQ0FBQyxXQUFXLElBQUksZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUM7NEJBQ3RGLHNCQUFPLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFBO3lCQUM5Qzt3QkFDRCxzQkFBTyxFQUFFLEVBQUM7Ozs7S0FDYjtJQUVMLGlDQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc3RvcmFnZS9kZWYvc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHsgRGJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHsgQ29udGVudEVudHJ5IH0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7IENvbnRlbnRTZXJ2aWNlSW1wbCB9IGZyb20gJy4uL2ltcGwvY29udGVudC1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHsgQ29udGVudFV0aWwgfSBmcm9tICcuLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBHZXRDaGlsZFF1ZXN0aW9uU2V0SGFuZGxlcntcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50U2VydmljZTogQ29udGVudFNlcnZpY2VJbXBsLFxuICAgICAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2VTZXJ2aWNlOiBTdG9yYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2VcbiAgICApe31cblxuICAgIGFzeW5jIGhhbmRsZShxdWVzdGlvblNldElkKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5KHF1ZXN0aW9uU2V0SWQpO1xuICAgICAgICBsZXQgcXVlc3Rpb25TZXQ7XG4gICAgICAgIHF1ZXN0aW9uU2V0ID0gYXdhaXQgdGhpcy5nZXRRdWVzdGlvblNldEZyb21RdWVyeShxdWVyeSk7XG5cbiAgICAgICAgaWYoIXF1ZXN0aW9uU2V0IHx8ICFxdWVzdGlvblNldC5pc0F2YWlsYWJsZUxvY2FsbHkpe1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZmV0Y2hTZXJ2ZXJDaGlsZFF1ZXN0aW9ucyhxdWVzdGlvblNldElkKTtcbiAgICAgICAgfSBlbHNlIGlmKCFxdWVzdGlvblNldC5jaGlsZHJlbil7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0U3RvcmFnZURlc3RpbmF0aW9uRGlyZWN0b3J5UGF0aCgpO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBxdWVzdGlvblNldCA9IGF3YWl0IHRoaXMuZmV0Y2hEQkNoaWxkUXVlc3Rpb25zKHF1ZXN0aW9uU2V0LCBwYXRoKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIHJldHVybiBxdWVzdGlvblNldC5jaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlc3Rpb25TZXQuY2hpbGRyZW47XG4gICAgICAgIFxuICAgIH1cblxuICAgIGFzeW5jIGZldGNoREJDaGlsZFF1ZXN0aW9ucyhxdWVzdGlvblNldCwgcGF0aCl7XG4gICAgICAgIGlmKCFxdWVzdGlvblNldCB8fCAhcXVlc3Rpb25TZXQuY2hpbGRyZW4gKXtcbiAgICAgICAgICAgIHJldHVybiBxdWVzdGlvblNldDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGlsZHJlblNldDogYW55ID0gW107XG4gICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2hpbGQgb2YgcXVlc3Rpb25TZXQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmKGNoaWxkLm9iamVjdFR5cGUgPT09ICdRdWVzdGlvblNldCcpe1xuICAgICAgICAgICAgICAgIGxldCBuZXdRdWVzdGlvblNldDtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZ2V0UXVlcnkoY2hpbGQuaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgbmV3UXVlc3Rpb25TZXQgPSBhd2FpdCB0aGlzLmdldFF1ZXN0aW9uU2V0RnJvbVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZihuZXdRdWVzdGlvblNldCAmJiBuZXdRdWVzdGlvblNldC5jaGlsZHJlbil7XG4gICAgICAgICAgICAgICAgICAgIG5ld1F1ZXN0aW9uU2V0ID0gYXdhaXQgdGhpcy5mZXRjaERCQ2hpbGRRdWVzdGlvbnMobmV3UXVlc3Rpb25TZXQsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblNldC5wdXNoKG5ld1F1ZXN0aW9uU2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoY2hpbGQub2JqZWN0VHlwZSA9PT0gJ1F1ZXN0aW9uJyl7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLnJlYWRBc1RleHQoYCR7cGF0aH1jb250ZW50LyR7cXVlc3Rpb25TZXQuaWRlbnRpZmllcn0vJHtjaGlsZC5pZGVudGlmaWVyfWAsICdpbmRleC5qc29uJyk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uICYmICh0eXBlb2YgcXVlc3Rpb24gPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShxdWVzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5hcmNoaXZlICYmIGRhdGEuYXJjaGl2ZS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuU2V0LnB1c2goZGF0YS5hcmNoaXZlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWVzdGlvblNldC5jaGlsZHJlbiA9IGNoaWxkcmVuU2V0O1xuICAgICAgICByZXR1cm4gcXVlc3Rpb25TZXQ7XG4gICAgfVxuXG4gICAgZ2V0UXVlcnkocXVlc3Rpb25TZXRJZCl7XG4gICAgICAgIHJldHVybiBgU0VMRUNUICogRlJPTSAke0NvbnRlbnRFbnRyeS5UQUJMRV9OQU1FfSBXSEVSRSAoJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gPSAnJHtxdWVzdGlvblNldElkfScpYDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRRdWVzdGlvblNldEZyb21RdWVyeShxdWVyeSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50SW5EYiA9IGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgaWYoY29udGVudEluRGIgJiYgY29udGVudEluRGIubGVuZ3RoICYmIGNvbnRlbnRJbkRiWzBdW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9MT0NBTF9EQVRBXSl7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb25TZXREYXRhID0gSlNPTi5wYXJzZShjb250ZW50SW5EYlswXVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9uU2V0RGF0YVsnaXNBdmFpbGFibGVMb2NhbGx5J10gPSBDb250ZW50VXRpbC5pc0F2YWlsYWJsZUxvY2FsbHkoY29udGVudEluRGJbMF1bQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdISk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXN0aW9uU2V0RGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZmV0Y2hTZXJ2ZXJDaGlsZFF1ZXN0aW9ucyhxdWVzdGlvblNldElkKXtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25TZXREYXRhOiBhbnkgPSBhd2FpdCB0aGlzLmNvbnRlbnRTZXJ2aWNlLmdldFF1ZXN0aW9uU2V0SGllcmFyY2h5KHF1ZXN0aW9uU2V0SWQpLnRvUHJvbWlzZSgpO1xuICAgICAgICBpZihxdWVzdGlvblNldERhdGEgJiYgcXVlc3Rpb25TZXREYXRhLnF1ZXN0aW9uc2V0ICYmIHF1ZXN0aW9uU2V0RGF0YS5xdWVzdGlvbnNldC5jaGlsZHJlbil7XG4gICAgICAgICAgICByZXR1cm4gcXVlc3Rpb25TZXREYXRhLnF1ZXN0aW9uc2V0LmNoaWxkcmVuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxufSJdfQ==