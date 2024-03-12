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
import { CourseServiceImpl } from './course-service-impl';
import { ContentKeys } from '../../preference-keys';
import { map } from 'rxjs/operators';
var OfflineAssessmentScoreProcessor = /** @class */ (function () {
    function OfflineAssessmentScoreProcessor(keyValueStore, sharedPreference) {
        this.keyValueStore = keyValueStore;
        this.sharedPreference = sharedPreference;
    }
    OfflineAssessmentScoreProcessor.prototype.process = function (capturedAssessments) {
        return __awaiter(this, void 0, void 0, function () {
            var context, BATCH_IN_PROGRESS, _loop_1, this_1, _i, _a, k;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCourseContext().toPromise()];
                    case 1:
                        context = _b.sent();
                        BATCH_IN_PROGRESS = 1;
                        if (!(context.batchStatus === BATCH_IN_PROGRESS)) return [3 /*break*/, 5];
                        _loop_1 = function (k) {
                            var courseContext, events, key, contentStateString, contentState, contentScores;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        courseContext = JSON.parse(k);
                                        events = capturedAssessments[k];
                                        if (!events) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        key = CourseServiceImpl.GET_CONTENT_STATE_KEY_PREFIX.concat(courseContext.userId, courseContext.courseId);
                                        return [4 /*yield*/, this_1.keyValueStore.getValue(key).toPromise()];
                                    case 1:
                                        contentStateString = _a.sent();
                                        contentState = (function () {
                                            // if already in db
                                            if (contentStateString) {
                                                return JSON.parse(contentStateString);
                                            }
                                            return { contentList: [] };
                                        })();
                                        contentScores = events.reduce(function (acc, event) {
                                            try {
                                                var attemptId = event.context.cdata.find(function (c) { return c.type === 'AttemptId'; }).id;
                                                var contentId_1 = event.object.id;
                                                var maxScore = event.edata.item.maxscore;
                                                var score = event.edata.score;
                                                if (acc[contentId_1]) {
                                                    var contentStateScore = acc[contentId_1];
                                                    contentStateScore.attemptId = attemptId;
                                                    contentStateScore.lastAttemptedOn = Date.now() + '';
                                                    contentStateScore.totalMaxScore += maxScore;
                                                    contentStateScore.totalScore += score;
                                                }
                                                else {
                                                    acc[contentId_1] = {
                                                        attemptId: attemptId,
                                                        lastAttemptedOn: Date.now() + '',
                                                        totalMaxScore: maxScore,
                                                        totalScore: score,
                                                    };
                                                }
                                                if (!contentState.contentList.find(function (c) { return c.contentId === contentId_1; })) {
                                                    contentState.contentList.push({
                                                        'lastAccessTime': '2021-01-14 07:09:32:602+0000',
                                                        'contentId': contentId_1,
                                                        'progress': 100,
                                                        'batchId': courseContext.batchId,
                                                        'courseId': courseContext.courseId,
                                                        'collectionId': courseContext.courseId,
                                                        'lastCompletedTime': '2021-01-14 07:09:32:810+0000',
                                                        'status': 2,
                                                    });
                                                }
                                            }
                                            catch (e) {
                                                console.error(e);
                                            }
                                            return acc;
                                        }, {});
                                        contentState.contentList = contentState.contentList.map(function (c) {
                                            // no attempts made previously
                                            if (!c.score || !c.score.length) {
                                                c.score = contentScores[c.contentId] ? [contentScores[c.contentId]] : [];
                                                c.bestScore = c.score.reduce(function (acc, score) {
                                                    if (!acc) {
                                                        return score;
                                                    }
                                                    if (acc.totalScore < score.totalScore) {
                                                        return score;
                                                    }
                                                    return acc;
                                                }, undefined);
                                                return c;
                                            }
                                            // append attempt
                                            if (contentScores[c.contentId]) {
                                                c.score.push(contentScores[c.contentId]);
                                                if (c.bestScore && (c.bestScore.totalScore < contentScores[c.contentId].totalScore)) {
                                                    c.bestScore = contentScores[c.contentId];
                                                }
                                                return c;
                                            }
                                            return c;
                                        });
                                        console.log(contentState);
                                        // store back
                                        return [4 /*yield*/, this_1.keyValueStore.setValue(key, JSON.stringify(contentState)).toPromise()];
                                    case 2:
                                        // store back
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = Object.keys(capturedAssessments);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        k = _a[_i];
                        return [5 /*yield**/, _loop_1(k)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OfflineAssessmentScoreProcessor.prototype.getCourseContext = function () {
        return this.sharedPreference.getString(ContentKeys.COURSE_CONTEXT).pipe(map(function (value) {
            return value ? JSON.parse(value) : {};
        }));
    };
    return OfflineAssessmentScoreProcessor;
}());
export { OfflineAssessmentScoreProcessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS1hc3Nlc3NtZW50LXNjb3JlLXByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaW1wbC9vZmZsaW5lLWFzc2Vzc21lbnQtc2NvcmUtcHJvY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSXhELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckM7SUFDSSx5Q0FDWSxhQUE0QixFQUM1QixnQkFBbUM7UUFEbkMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtJQUUvQyxDQUFDO0lBRUssaURBQU8sR0FBYixVQUNJLG1CQUFnRjs7Ozs7NEJBRWhFLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBbkQsT0FBTyxHQUFHLFNBQXlDO3dCQUNuRCxpQkFBaUIsR0FBRyxDQUFDLENBQUM7NkJBQ3hCLENBQUEsT0FBTyxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsQ0FBQSxFQUF6Qyx3QkFBeUM7NENBQzlCLENBQUM7Ozs7O3dDQUNGLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUM5QixNQUFNLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUU7O3lDQUVaO3dDQUNLLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7d0NBQ3JGLHFCQUFNLE9B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QyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3Q0FEaEYsYUFBYTt3Q0FDYixTQUFnRixDQUFDOzs7Ozs7OEJBaEZyQyxFQUFoQyxLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7Ozs2QkFBaEMsQ0FBQSxjQUFnQyxDQUFBO3dCQUFyQyxDQUFDO3NEQUFELENBQUM7Ozs7O3dCQUFJLElBQWdDLENBQUE7Ozs7OztLQW1GdkQ7SUFDTywwREFBZ0IsR0FBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDbkUsR0FBRyxDQUFDLFVBQUMsS0FBeUI7WUFDMUIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUNMLHNDQUFDO0FBQUQsQ0FBQyxBQXhHRCxJQXdHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7S2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7U3VuYmlyZFRlbGVtZXRyeX0gZnJvbSAnLi4vLi4vdGVsZW1ldHJ5JztcbmltcG9ydCB7Q291cnNlU2VydmljZUltcGx9IGZyb20gJy4vY291cnNlLXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge0NvbnRlbnRTdGF0ZVJlc3BvbnNlfSBmcm9tICcuLi9kZWYvcmVxdWVzdC10eXBlcyc7XG5pbXBvcnQge0NvbnRlbnRTdGF0ZSwgQ29udGVudFN0YXRlU2NvcmV9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL2NvdXJzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbnRlbnRLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuXG5leHBvcnQgY2xhc3MgT2ZmbGluZUFzc2Vzc21lbnRTY29yZVByb2Nlc3NvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUga2V5VmFsdWVTdG9yZTogS2V5VmFsdWVTdG9yZSxcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlOiBTaGFyZWRQcmVmZXJlbmNlc1xuICAgICkge1xuICAgIH1cblxuICAgIGFzeW5jIHByb2Nlc3MoXG4gICAgICAgIGNhcHR1cmVkQXNzZXNzbWVudHM6IHsgW2tleTogc3RyaW5nXTogU3VuYmlyZFRlbGVtZXRyeS5UZWxlbWV0cnlbXSB8IHVuZGVmaW5lZCB9XG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCB0aGlzLmdldENvdXJzZUNvbnRleHQoKS50b1Byb21pc2UoKTtcbiAgICAgICAgY29uc3QgQkFUQ0hfSU5fUFJPR1JFU1MgPSAxO1xuICAgICAgICBpZiAoY29udGV4dC5iYXRjaFN0YXR1cyA9PT0gQkFUQ0hfSU5fUFJPR1JFU1MpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyhjYXB0dXJlZEFzc2Vzc21lbnRzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXJzZUNvbnRleHQgPSBKU09OLnBhcnNlKGspO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGNhcHR1cmVkQXNzZXNzbWVudHNba107XG4gICAgICAgICAgICAgICAgaWYgKCFldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IENvdXJzZVNlcnZpY2VJbXBsLkdFVF9DT05URU5UX1NUQVRFX0tFWV9QUkVGSVguY29uY2F0KGNvdXJzZUNvbnRleHQudXNlcklkLCBjb3Vyc2VDb250ZXh0LmNvdXJzZUlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50U3RhdGVTdHJpbmcgPSBhd2FpdCB0aGlzLmtleVZhbHVlU3RvcmUuZ2V0VmFsdWUoa2V5KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50U3RhdGU6IENvbnRlbnRTdGF0ZVJlc3BvbnNlID0gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxyZWFkeSBpbiBkYlxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50U3RhdGVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7Y29udGVudExpc3Q6IFtdfTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRTY29yZXM6IHsgW2NvbnRlbnRJZDogc3RyaW5nXTogQ29udGVudFN0YXRlU2NvcmUgfSA9IGV2ZW50cy5yZWR1Y2UoKGFjYywgZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0ZW1wdElkID0gZXZlbnQuY29udGV4dC5jZGF0YS5maW5kKChjKSA9PiBjLnR5cGUgPT09ICdBdHRlbXB0SWQnKS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRJZCA9IGV2ZW50Lm9iamVjdC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heFNjb3JlID0gZXZlbnQuZWRhdGEuaXRlbS5tYXhzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gZXZlbnQuZWRhdGEuc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjW2NvbnRlbnRJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50U3RhdGVTY29yZTogQ29udGVudFN0YXRlU2NvcmUgPSAoYWNjW2NvbnRlbnRJZF0gYXMgQ29udGVudFN0YXRlU2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZVNjb3JlLmF0dGVtcHRJZCA9IGF0dGVtcHRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50U3RhdGVTY29yZS5sYXN0QXR0ZW1wdGVkT24gPSBEYXRlLm5vdygpICsgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFN0YXRlU2NvcmUudG90YWxNYXhTY29yZSArPSBtYXhTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50U3RhdGVTY29yZS50b3RhbFNjb3JlICs9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NbY29udGVudElkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdElkOiBhdHRlbXB0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RBdHRlbXB0ZWRPbjogRGF0ZS5ub3coKSArICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbE1heFNjb3JlOiBtYXhTY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxTY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGVudFN0YXRlLmNvbnRlbnRMaXN0LmZpbmQoYyA9PiBjLmNvbnRlbnRJZCA9PT0gY29udGVudElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdGF0ZS5jb250ZW50TGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhc3RBY2Nlc3NUaW1lJzogJzIwMjEtMDEtMTQgMDc6MDk6MzI6NjAyKzAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudElkJzogY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZ3Jlc3MnOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiYXRjaElkJzogY291cnNlQ29udGV4dC5iYXRjaElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY291cnNlSWQnOiBjb3Vyc2VDb250ZXh0LmNvdXJzZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29sbGVjdGlvbklkJzogY291cnNlQ29udGV4dC5jb3Vyc2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhc3RDb21wbGV0ZWRUaW1lJzogJzIwMjEtMDEtMTQgMDc6MDk6MzI6ODEwKzAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhdHVzJzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgICAgICBjb250ZW50U3RhdGUuY29udGVudExpc3QgPSBjb250ZW50U3RhdGUuY29udGVudExpc3QubWFwKChjOiBDb250ZW50U3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gYXR0ZW1wdHMgbWFkZSBwcmV2aW91c2x5XG4gICAgICAgICAgICAgICAgICAgIGlmICghYy5zY29yZSB8fCAhYy5zY29yZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuc2NvcmUgPSBjb250ZW50U2NvcmVzW2MuY29udGVudElkIV0gPyBbY29udGVudFNjb3Jlc1tjLmNvbnRlbnRJZCFdXSA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5iZXN0U2NvcmUgPSBjLnNjb3JlLnJlZHVjZTxDb250ZW50U3RhdGVTY29yZSB8IHVuZGVmaW5lZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICgoYWNjOiBDb250ZW50U3RhdGVTY29yZSB8IHVuZGVmaW5lZCwgc2NvcmU6IENvbnRlbnRTdGF0ZVNjb3JlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjLnRvdGFsU2NvcmUgPCBzY29yZS50b3RhbFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBhcHBlbmQgYXR0ZW1wdFxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFNjb3Jlc1tjLmNvbnRlbnRJZCFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLnNjb3JlLnB1c2goY29udGVudFNjb3Jlc1tjLmNvbnRlbnRJZCFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLmJlc3RTY29yZSAmJiAoYy5iZXN0U2NvcmUhLnRvdGFsU2NvcmUgPCBjb250ZW50U2NvcmVzW2MuY29udGVudElkIV0udG90YWxTY29yZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmJlc3RTY29yZSA9IGNvbnRlbnRTY29yZXNbYy5jb250ZW50SWQhXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgYmFja1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMua2V5VmFsdWVTdG9yZS5zZXRWYWx1ZShrZXksIEpTT04uc3RyaW5naWZ5KGNvbnRlbnRTdGF0ZSkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0Q291cnNlQ29udGV4dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlLmdldFN0cmluZyhDb250ZW50S2V5cy5DT1VSU0VfQ09OVEVYVCkucGlwZShcbiAgICAgICAgICAgIG1hcCgodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IEpTT04ucGFyc2UodmFsdWUpIDoge307XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==