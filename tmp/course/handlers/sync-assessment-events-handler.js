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
import { from, Observable, of } from 'rxjs';
import { CourseAssessmentEntry } from '../../summarizer/db/schema';
import { map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { NetworkQueueType } from '../../api/network-queue';
import { NetworkRequestHandler } from '../../api/network-queue/handlers/network-request-handler';
import { UniqueId } from '../../db/util/unique-id';
import { ObjectUtil } from '../../util/object-util';
var SyncAssessmentEventsHandler = /** @class */ (function () {
    function SyncAssessmentEventsHandler(courseService, sdkConfig, dbService, networkQueue) {
        this.courseService = courseService;
        this.sdkConfig = sdkConfig;
        this.dbService = dbService;
        this.networkQueue = networkQueue;
        this.capturedAssessmentEvents = {};
    }
    SyncAssessmentEventsHandler.prototype.handle = function (capturedAssessmentEvents) {
        var _this = this;
        this.capturedAssessmentEvents = capturedAssessmentEvents;
        return from(this.syncCapturedAssessmentEvents()
            .then(function () {
            _this.capturedAssessmentEvents = {};
        })
            .then(function () {
            return _this.syncPersistedAssessmentEvents();
        })
            .catch(function (e) {
            Object.keys(_this.capturedAssessmentEvents).forEach(function (key) {
                var context = JSON.parse(key);
                _this.capturedAssessmentEvents[key].forEach(function (event) {
                    if (context.batchStatus !== 2) {
                        _this.persistAssessEvent(event, context).toPromise();
                    }
                });
            });
        })).pipe(mapTo(undefined));
    };
    SyncAssessmentEventsHandler.prototype.invokeSyncApi = function (assessmentTelemetrySyncRequest) {
        var _this = this;
        console.log('COURSE_ASSESSMENT_INVOKED_SYNC----------------------------------------------', assessmentTelemetrySyncRequest.assessments.map(function (a) { return ({
            assessmentTs: a.assessmentTs,
            userId: a.userId,
            contentId: a.contentId,
            courseId: a.courseId,
            batchId: a.batchId,
            attemptId: a.attemptId,
            events: a.events.length
        }); }));
        return this.networkQueue.enqueue(new NetworkRequestHandler(this.sdkConfig).generateNetworkQueueRequest(NetworkQueueType.COURSE_ASSESMENT, { request: assessmentTelemetrySyncRequest }, UniqueId.generateUniqueId(), 0, true), true).pipe(mergeMap(function () {
            return new Observable(function (observer) {
                sbsync.onSyncSucces(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var courseAssesmentResponse, error;
                    return __generator(this, function (_a) {
                        courseAssesmentResponse = response.courseAssesmentResponse;
                        error = response.course_assesment_error;
                        if (courseAssesmentResponse) {
                            observer.next(courseAssesmentResponse);
                        }
                        else if (error) {
                            observer.error(error);
                        }
                        observer.complete();
                        return [2 /*return*/];
                    });
                }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        observer.error(error);
                        return [2 /*return*/];
                    });
                }); });
            });
        })).toPromise();
    };
    SyncAssessmentEventsHandler.prototype.persistAssessEvent = function (event, courseContext) {
        var _a;
        return this.dbService.insert({
            table: CourseAssessmentEntry.TABLE_NAME,
            modelJson: (_a = {},
                _a[CourseAssessmentEntry.COLUMN_NAME_ASSESSMENT_EVENT] = JSON.stringify(event),
                _a[CourseAssessmentEntry.COLUMN_NAME_CONTENT_ID] = event.object.id,
                _a[CourseAssessmentEntry.COLUMN_NAME_CREATED_AT] = event.ets,
                _a[CourseAssessmentEntry.COLUMN_NAME_USER_ID] = courseContext.userId,
                _a[CourseAssessmentEntry.COLUMN_NAME_COURSE_ID] = courseContext.courseId,
                _a[CourseAssessmentEntry.COLUMN_NAME_BATCH_ID] = courseContext.batchId,
                _a)
        }).pipe(mapTo(undefined));
    };
    SyncAssessmentEventsHandler.prototype.syncCapturedAssessmentEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assessmentTelemetrySyncRequest;
            var _this = this;
            return __generator(this, function (_a) {
                assessmentTelemetrySyncRequest = Object.keys(this.capturedAssessmentEvents)
                    .reduce(function (acc, key) {
                    var context = JSON.parse(key);
                    var events = _this.capturedAssessmentEvents[key];
                    if (!acc.userId) {
                        acc.userId = context['userId'];
                    }
                    var contentState = {
                        contentId: events[0].object.id,
                        courseId: context['courseId'],
                        batchId: context['batchId'],
                        status: 2
                    };
                    if (!acc.contents.find(function (c) { return ObjectUtil.equals(c, contentState); })) {
                        acc.contents.push(contentState);
                    }
                    var assessmentTs = events.reduce(function (etsAcc, e) {
                        return e.ets < etsAcc ? e.ets : etsAcc;
                    }, events[0].ets);
                    acc.assessments.push({
                        assessmentTs: assessmentTs,
                        userId: context['userId'],
                        contentId: events[0].object.id,
                        courseId: context['courseId'],
                        batchId: context['batchId'],
                        attemptId: _this.courseService.generateAssessmentAttemptId({
                            courseId: context['courseId'],
                            batchId: context['batchId'],
                            contentId: events[0].object.id,
                            userId: context['userId'],
                            date: assessmentTs
                        }),
                        events: events
                    });
                    return acc;
                }, { userId: '', contents: [], assessments: [] });
                if (!assessmentTelemetrySyncRequest.userId ||
                    !assessmentTelemetrySyncRequest.contents.length ||
                    !assessmentTelemetrySyncRequest.assessments.length) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this.invokeSyncApi(assessmentTelemetrySyncRequest)];
            });
        });
    };
    SyncAssessmentEventsHandler.prototype.syncPersistedAssessmentEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.dbService.execute("\n            SELECT\n                " + CourseAssessmentEntry.COLUMN_NAME_USER_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_CONTENT_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_COURSE_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_BATCH_ID + ",\n                MIN(" + CourseAssessmentEntry.COLUMN_NAME_CREATED_AT + ") as first_ts,\n                GROUP_CONCAT(" + CourseAssessmentEntry.COLUMN_NAME_ASSESSMENT_EVENT + ",',') as events\n            FROM " + CourseAssessmentEntry.TABLE_NAME + "\n            GROUP BY\n                " + CourseAssessmentEntry.COLUMN_NAME_USER_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_CONTENT_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_COURSE_ID + ",\n                " + CourseAssessmentEntry.COLUMN_NAME_BATCH_ID + "\n            ORDER BY " + CourseAssessmentEntry.COLUMN_NAME_CREATED_AT + "\n        ").pipe(map(function (entries) {
                    return entries.map(function (entry) {
                        return {
                            userId: entry[CourseAssessmentEntry.COLUMN_NAME_USER_ID],
                            contentId: entry[CourseAssessmentEntry.COLUMN_NAME_CONTENT_ID],
                            courseId: entry[CourseAssessmentEntry.COLUMN_NAME_COURSE_ID],
                            batchId: entry[CourseAssessmentEntry.COLUMN_NAME_BATCH_ID],
                            firstTs: entry.first_ts,
                            events: JSON.parse('[' + entry.events + ']')
                        };
                    });
                }), mergeMap(function (entries) {
                    if (!entries.length) {
                        return of(undefined);
                    }
                    var assessmentTelemetrySyncRequest = entries
                        .reduce(function (acc, _a) {
                        var firstTs = _a.firstTs, userId = _a.userId, contentId = _a.contentId, courseId = _a.courseId, batchId = _a.batchId, events = _a.events;
                        if (!acc.userId) {
                            acc.userId = userId;
                        }
                        var contentState = {
                            contentId: contentId,
                            courseId: courseId,
                            batchId: batchId,
                            status: 2
                        };
                        if (!acc.contents.find(function (c) { return ObjectUtil.equals(c, contentState); })) {
                            acc.contents.push(contentState);
                        }
                        acc.assessments.push({
                            assessmentTs: firstTs,
                            userId: userId,
                            contentId: contentId,
                            courseId: courseId,
                            batchId: batchId,
                            attemptId: _this.courseService.generateAssessmentAttemptId({
                                courseId: courseId,
                                batchId: batchId,
                                contentId: contentId,
                                userId: userId
                            }),
                            events: events
                        });
                        return acc;
                    }, { userId: '', contents: [], assessments: [] });
                    return _this.invokeSyncApi(assessmentTelemetrySyncRequest);
                }), tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dbService.execute("DELETE FROM " + CourseAssessmentEntry.TABLE_NAME).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }), mapTo(undefined)).toPromise();
                return [2 /*return*/];
            });
        });
    };
    SyncAssessmentEventsHandler.UPDATE_CONTENT_STATE_ENDPOINT = '/content/state/update';
    return SyncAssessmentEventsHandler;
}());
export { SyncAssessmentEventsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1hc3Nlc3NtZW50LWV2ZW50cy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvdXJzZS9oYW5kbGVycy9zeW5jLWFzc2Vzc21lbnQtZXZlbnRzLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQVksRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBS2pFLE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQWUsZ0JBQWdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUMvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBa0NsRDtJQUtFLHFDQUNVLGFBQTRCLEVBQzVCLFNBQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLFlBQTBCO1FBSDFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU41Qiw2QkFBd0IsR0FBZ0UsRUFBRSxDQUFDO0lBUW5HLENBQUM7SUFFRCw0Q0FBTSxHQUFOLFVBQU8sd0JBQXFGO1FBQTVGLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7UUFFekQsT0FBTyxJQUFJLENBQ1QsSUFBSSxDQUFDLDRCQUE0QixFQUFFO2FBQ2hDLElB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QUMsRUFBRTs0QkFDL0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQ25DO3dCQUVELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDOzRCQUNqQixZQUFZLEVBQUUsT0FBTzs0QkFDckIsTUFBTSxRQUFBOzRCQUNOLFNBQVMsV0FBQTs0QkFDVCxRQUFRLFVBQUE7NEJBQ1IsT0FBTyxTQUFBOzRCQUNQLFNBQVMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDO2dDQUN0RCxRQUFRLFVBQUE7Z0NBQ1IsT0FBTyxTQUFBO2dDQUNQLFNBQVMsV0FBQTtnQ0FDVCxNQUFNLFFBQUE7NkJBQ1QsQ0FBQzs0QkFDRixNQUFNLFFBQUE7eUJBQ1QsQ0FBQyxDQUFDO3dCQUNILE9BQU8sR0FBRyxDQUFDO29CQUNmLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztvQkFDcEQsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQzs7Z0NBQ0YscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUJBQWUscUJBQXFCLENBQUMsVUFBWSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7Z0NBQTNGLHNCQUFBLFNBQTJGLEVBQUE7O3lCQUFBLENBQzVGLEVBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUNqQixDQUFDLFNBQVMsRUFBRSxDQUFDOzs7O0tBQ2Y7SUE3TnVCLHlEQUE2QixHQUFHLHVCQUF1QixDQUFDO0lBOE5sRixrQ0FBQztDQUFBLEFBL05ELElBK05DO1NBL05ZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Q291cnNlQXNzZXNzbWVudEVudHJ5fSBmcm9tICcuLi8uLi9zdW1tYXJpemVyL2RiL3NjaGVtYSc7XG5pbXBvcnQge1N1bmJpcmRUZWxlbWV0cnl9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtDb250ZW50U3RhdGUsIENvdXJzZVNlcnZpY2V9IGZyb20gJy4uJztcbmltcG9ydCB7bWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtOZXR3b3JrUXVldWUsIE5ldHdvcmtRdWV1ZVR5cGV9IGZyb20gJy4uLy4uL2FwaS9uZXR3b3JrLXF1ZXVlJztcbmltcG9ydCB7TmV0d29ya1JlcXVlc3RIYW5kbGVyfSBmcm9tICcuLi8uLi9hcGkvbmV0d29yay1xdWV1ZS9oYW5kbGVycy9uZXR3b3JrLXJlcXVlc3QtaGFuZGxlcic7XG5pbXBvcnQge1VuaXF1ZUlkfSBmcm9tICcuLi8uLi9kYi91dGlsL3VuaXF1ZS1pZCc7XG5pbXBvcnQge09iamVjdFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0LXV0aWwnO1xuXG5pbnRlcmZhY2UgUmF3RW50cnkge1xuICBbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSURdOiBzdHJpbmc7XG4gIFtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRF06IHN0cmluZztcbiAgW0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT1VSU0VfSURdOiBzdHJpbmc7XG4gIFtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQkFUQ0hfSURdOiBzdHJpbmc7XG4gIGZpcnN0X3RzOiBudW1iZXI7XG4gIGV2ZW50czogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRW50cnkge1xuICB1c2VySWQ6IHN0cmluZztcbiAgY29udGVudElkOiBzdHJpbmc7XG4gIGNvdXJzZUlkOiBzdHJpbmc7XG4gIGJhdGNoSWQ6IHN0cmluZztcbiAgZmlyc3RUczogbnVtYmVyO1xuICBldmVudHM6IFN1bmJpcmRUZWxlbWV0cnkuVGVsZW1ldHJ5W107XG59XG5cbmludGVyZmFjZSBBc3Nlc3NtZW50VGVsZW1ldHJ5U3luY1JlcXVlc3Qge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIGNvbnRlbnRzOiBDb250ZW50U3RhdGVbXTtcbiAgICBhc3Nlc3NtZW50czoge1xuICAgICAgICBhc3Nlc3NtZW50VHM6IG51bWJlcjsgLy8gQXNzZXNzbWVudCB0aW1lIGluIGVwb2NoXG4gICAgICAgIHVzZXJJZDogc3RyaW5nLCAgLy8gVXNlciBJZGVudGlmaWVyIC0gcmVxdWlyZWRcbiAgICAgICAgY29udGVudElkOiBzdHJpbmcsIC8vIENvbnRlbnQgSWRlbnRpZmllciAtIHJlcXVpcmVkXG4gICAgICAgIGNvdXJzZUlkOiBzdHJpbmcsIC8vIENvdXJzZSBJZGVudGlmaWVyIC0gcmVxdWlyZWRcbiAgICAgICAgYmF0Y2hJZDogc3RyaW5nOyAvLyBCYXRjaCBJZGVudGlmaWVyIC0gcmVxdWlyZWRcbiAgICAgICAgYXR0ZW1wdElkOiBzdHJpbmcsIC8vIEF0dGVtcHQgSWRlbnRpZmllciAtIHJlcXVpcmVkXG4gICAgICAgIGV2ZW50czogU3VuYmlyZFRlbGVtZXRyeS5UZWxlbWV0cnlbXSAvLyBPbmx5ICdBU1NFU1MnIEV2ZW50cyAtIHJlcXVpcmVkXG4gICAgfVtdO1xufVxuXG5leHBvcnQgY2xhc3MgU3luY0Fzc2Vzc21lbnRFdmVudHNIYW5kbGVyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVVBEQVRFX0NPTlRFTlRfU1RBVEVfRU5EUE9JTlQgPSAnL2NvbnRlbnQvc3RhdGUvdXBkYXRlJztcblxuICBwcml2YXRlIGNhcHR1cmVkQXNzZXNzbWVudEV2ZW50czogeyBba2V5OiBzdHJpbmddOiBTdW5iaXJkVGVsZW1ldHJ5LlRlbGVtZXRyeVtdIHwgdW5kZWZpbmVkIH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmV0d29ya1F1ZXVlOiBOZXR3b3JrUXVldWVcbiAgKSB7XG4gIH1cblxuICBoYW5kbGUoY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzOiB7IFtrZXk6IHN0cmluZ106IFN1bmJpcmRUZWxlbWV0cnkuVGVsZW1ldHJ5W10gfCB1bmRlZmluZWQgfSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgdGhpcy5jYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMgPSBjYXB0dXJlZEFzc2Vzc21lbnRFdmVudHM7XG5cbiAgICByZXR1cm4gZnJvbShcbiAgICAgIHRoaXMuc3luY0NhcHR1cmVkQXNzZXNzbWVudEV2ZW50cygpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNhcHR1cmVkQXNzZXNzbWVudEV2ZW50cyA9IHt9O1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3luY1BlcnNpc3RlZEFzc2Vzc21lbnRFdmVudHMoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IEpTT04ucGFyc2Uoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0hLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0LmJhdGNoU3RhdHVzICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzaXN0QXNzZXNzRXZlbnQoZXZlbnQsIGNvbnRleHQpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICApLnBpcGUoXG4gICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaW52b2tlU3luY0FwaShhc3Nlc3NtZW50VGVsZW1ldHJ5U3luY1JlcXVlc3Q6IEFzc2Vzc21lbnRUZWxlbWV0cnlTeW5jUmVxdWVzdCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ0NPVVJTRV9BU1NFU1NNRU5UX0lOVk9LRURfU1lOQy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuICAgICAgYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0LmFzc2Vzc21lbnRzLm1hcCgoYSkgPT4gKHtcbiAgICAgICAgYXNzZXNzbWVudFRzOiBhLmFzc2Vzc21lbnRUcyxcbiAgICAgICAgdXNlcklkOiBhLnVzZXJJZCxcbiAgICAgICAgY29udGVudElkOiBhLmNvbnRlbnRJZCxcbiAgICAgICAgY291cnNlSWQ6IGEuY291cnNlSWQsXG4gICAgICAgIGJhdGNoSWQ6IGEuYmF0Y2hJZCxcbiAgICAgICAgYXR0ZW1wdElkOiBhLmF0dGVtcHRJZCxcbiAgICAgICAgZXZlbnRzOiBhLmV2ZW50cy5sZW5ndGhcbiAgICAgIH0pKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5uZXR3b3JrUXVldWUuZW5xdWV1ZShuZXcgTmV0d29ya1JlcXVlc3RIYW5kbGVyKHRoaXMuc2RrQ29uZmlnKS5nZW5lcmF0ZU5ldHdvcmtRdWV1ZVJlcXVlc3QoXG4gICAgICBOZXR3b3JrUXVldWVUeXBlLkNPVVJTRV9BU1NFU01FTlQsXG4gICAgICB7cmVxdWVzdDogYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0fSxcbiAgICAgIFVuaXF1ZUlkLmdlbmVyYXRlVW5pcXVlSWQoKSwgMCxcbiAgICAgIHRydWUpLFxuICAgICAgdHJ1ZSkucGlwZShcbiAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8eyBba2V5OiBzdHJpbmddOiBhbnkgfT4pID0+IHtcbiAgICAgICAgICBzYnN5bmMub25TeW5jU3VjY2VzKGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY291cnNlQXNzZXNtZW50UmVzcG9uc2UgPSByZXNwb25zZS5jb3Vyc2VBc3Nlc21lbnRSZXNwb25zZTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcmVzcG9uc2UuY291cnNlX2Fzc2VzbWVudF9lcnJvcjtcbiAgICAgICAgICAgIGlmIChjb3Vyc2VBc3Nlc21lbnRSZXNwb25zZSkge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGNvdXJzZUFzc2VzbWVudFJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9LCBhc3luYyAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KSkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RBc3Nlc3NFdmVudChldmVudDogU3VuYmlyZFRlbGVtZXRyeS5UZWxlbWV0cnksIGNvdXJzZUNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgIHRhYmxlOiBDb3Vyc2VBc3Nlc3NtZW50RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgIG1vZGVsSnNvbjoge1xuICAgICAgICBbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX0FTU0VTU01FTlRfRVZFTlRdOiBKU09OLnN0cmluZ2lmeShldmVudCksXG4gICAgICAgIFtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRF06IGV2ZW50Lm9iamVjdC5pZCxcbiAgICAgICAgW0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DUkVBVEVEX0FUXTogZXZlbnQuZXRzLFxuICAgICAgICBbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSURdOiBjb3Vyc2VDb250ZXh0LnVzZXJJZCxcbiAgICAgICAgW0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT1VSU0VfSURdOiBjb3Vyc2VDb250ZXh0LmNvdXJzZUlkLFxuICAgICAgICBbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX0JBVENIX0lEXTogY291cnNlQ29udGV4dC5iYXRjaElkLFxuICAgICAgfSBhcyBDb3Vyc2VBc3Nlc3NtZW50RW50cnkuU2NoZW1hTWFwXG4gICAgfSkucGlwZShcbiAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzeW5jQ2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzKCkge1xuICAgICAgY29uc3QgYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0OiBBc3Nlc3NtZW50VGVsZW1ldHJ5U3luY1JlcXVlc3QgPSBPYmplY3Qua2V5cyh0aGlzLmNhcHR1cmVkQXNzZXNzbWVudEV2ZW50cylcbiAgICAgICAgICAucmVkdWNlPEFzc2Vzc21lbnRUZWxlbWV0cnlTeW5jUmVxdWVzdD4oKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBKU09OLnBhcnNlKGtleSk7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0hO1xuXG4gICAgICAgICAgICAgIGlmICghYWNjLnVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgYWNjLnVzZXJJZCA9IGNvbnRleHRbJ3VzZXJJZCddO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgY29udGVudFN0YXRlOiBDb250ZW50U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGV2ZW50c1swXS5vYmplY3QuaWQsXG4gICAgICAgICAgICAgICAgICBjb3Vyc2VJZDogY29udGV4dFsnY291cnNlSWQnXSxcbiAgICAgICAgICAgICAgICAgIGJhdGNoSWQ6IGNvbnRleHRbJ2JhdGNoSWQnXSxcbiAgICAgICAgICAgICAgICAgIHN0YXR1czogMlxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmICghYWNjLmNvbnRlbnRzLmZpbmQoKGMpID0+IE9iamVjdFV0aWwuZXF1YWxzKGMsIGNvbnRlbnRTdGF0ZSkpKSB7XG4gICAgICAgICAgICAgICAgICBhY2MuY29udGVudHMucHVzaChjb250ZW50U3RhdGUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgYXNzZXNzbWVudFRzID0gZXZlbnRzLnJlZHVjZSgoZXRzQWNjLCBlKSA9PlxuICAgICAgICAgICAgICAgICAgZS5ldHMgPCBldHNBY2MgPyBlLmV0cyA6IGV0c0FjYywgZXZlbnRzWzBdLmV0cyk7XG5cbiAgICAgICAgICAgICAgYWNjLmFzc2Vzc21lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgYXNzZXNzbWVudFRzOiBhc3Nlc3NtZW50VHMsXG4gICAgICAgICAgICAgICAgICB1c2VySWQ6IGNvbnRleHRbJ3VzZXJJZCddLFxuICAgICAgICAgICAgICAgICAgY29udGVudElkOiBldmVudHNbMF0ub2JqZWN0LmlkLFxuICAgICAgICAgICAgICAgICAgY291cnNlSWQ6IGNvbnRleHRbJ2NvdXJzZUlkJ10sXG4gICAgICAgICAgICAgICAgICBiYXRjaElkOiBjb250ZXh0WydiYXRjaElkJ10sXG4gICAgICAgICAgICAgICAgICBhdHRlbXB0SWQ6IHRoaXMuY291cnNlU2VydmljZS5nZW5lcmF0ZUFzc2Vzc21lbnRBdHRlbXB0SWQoe1xuICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZUlkOiBjb250ZXh0Wydjb3Vyc2VJZCddLFxuICAgICAgICAgICAgICAgICAgICAgIGJhdGNoSWQ6IGNvbnRleHRbJ2JhdGNoSWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGV2ZW50c1swXS5vYmplY3QuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBjb250ZXh0Wyd1c2VySWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBhc3Nlc3NtZW50VHNcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgZXZlbnRzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt1c2VySWQ6ICcnLCBjb250ZW50czogW10sIGFzc2Vzc21lbnRzOiBbXX0pO1xuXG4gICAgICBpZiAoXG4gICAgICAgICAgIWFzc2Vzc21lbnRUZWxlbWV0cnlTeW5jUmVxdWVzdC51c2VySWQgfHxcbiAgICAgICAgICAhYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0LmNvbnRlbnRzLmxlbmd0aCB8fFxuICAgICAgICAgICFhc3Nlc3NtZW50VGVsZW1ldHJ5U3luY1JlcXVlc3QuYXNzZXNzbWVudHMubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmludm9rZVN5bmNBcGkoYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc3luY1BlcnNpc3RlZEFzc2Vzc21lbnRFdmVudHMoKSB7XG4gICAgdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShgXG4gICAgICAgICAgICBTRUxFQ1RcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEfSxcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSxcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT1VSU0VfSUR9LFxuICAgICAgICAgICAgICAgICR7Q291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX0JBVENIX0lEfSxcbiAgICAgICAgICAgICAgICBNSU4oJHtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQ1JFQVRFRF9BVH0pIGFzIGZpcnN0X3RzLFxuICAgICAgICAgICAgICAgIEdST1VQX0NPTkNBVCgke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9BU1NFU1NNRU5UX0VWRU5UfSwnLCcpIGFzIGV2ZW50c1xuICAgICAgICAgICAgRlJPTSAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5UQUJMRV9OQU1FfVxuICAgICAgICAgICAgR1JPVVAgQllcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEfSxcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSxcbiAgICAgICAgICAgICAgICAke0NvdXJzZUFzc2Vzc21lbnRFbnRyeS5DT0xVTU5fTkFNRV9DT1VSU0VfSUR9LFxuICAgICAgICAgICAgICAgICR7Q291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX0JBVENIX0lEfVxuICAgICAgICAgICAgT1JERVIgQlkgJHtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQ1JFQVRFRF9BVH1cbiAgICAgICAgYCkucGlwZShcbiAgICAgIG1hcCgoZW50cmllczogUmF3RW50cnlbXSkgPT4ge1xuICAgICAgICByZXR1cm4gZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJJZDogZW50cnlbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSURdLFxuICAgICAgICAgICAgY29udGVudElkOiBlbnRyeVtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRF0sXG4gICAgICAgICAgICBjb3Vyc2VJZDogZW50cnlbQ291cnNlQXNzZXNzbWVudEVudHJ5LkNPTFVNTl9OQU1FX0NPVVJTRV9JRF0sXG4gICAgICAgICAgICBiYXRjaElkOiBlbnRyeVtDb3Vyc2VBc3Nlc3NtZW50RW50cnkuQ09MVU1OX05BTUVfQkFUQ0hfSURdLFxuICAgICAgICAgICAgZmlyc3RUczogZW50cnkuZmlyc3RfdHMsXG4gICAgICAgICAgICBldmVudHM6IEpTT04ucGFyc2UoJ1snICsgZW50cnkuZXZlbnRzICsgJ10nKVxuICAgICAgICAgIH0gYXMgRW50cnk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoZW50cmllczogRW50cnlbXSkgPT4ge1xuICAgICAgICAgIGlmICghZW50cmllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0OiBBc3Nlc3NtZW50VGVsZW1ldHJ5U3luY1JlcXVlc3QgPSBlbnRyaWVzXG4gICAgICAgICAgICAgIC5yZWR1Y2U8QXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0PigoYWNjLCB7XG4gICAgICAgICAgICAgICAgICBmaXJzdFRzLCB1c2VySWQsIGNvbnRlbnRJZCwgY291cnNlSWQsIGJhdGNoSWQsIGV2ZW50c1xuICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoIWFjYy51c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY2MudXNlcklkID0gdXNlcklkO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50U3RhdGU6IENvbnRlbnRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgYmF0Y2hJZDogYmF0Y2hJZCxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDJcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIGlmICghYWNjLmNvbnRlbnRzLmZpbmQoKGMpID0+IE9iamVjdFV0aWwuZXF1YWxzKGMsIGNvbnRlbnRTdGF0ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWNjLmNvbnRlbnRzLnB1c2goY29udGVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgYWNjLmFzc2Vzc21lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIGFzc2Vzc21lbnRUczogZmlyc3RUcyxcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZUlkLFxuICAgICAgICAgICAgICAgICAgICAgIGJhdGNoSWQsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdElkOiB0aGlzLmNvdXJzZVNlcnZpY2UuZ2VuZXJhdGVBc3Nlc3NtZW50QXR0ZW1wdElkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJhdGNoSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgZXZlbnRzXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgIH0sIHt1c2VySWQ6ICcnLCBjb250ZW50czogW10sIGFzc2Vzc21lbnRzOiBbXX0pO1xuICAgICAgICAgIHJldHVybiB0aGlzLmludm9rZVN5bmNBcGkoYXNzZXNzbWVudFRlbGVtZXRyeVN5bmNSZXF1ZXN0KTtcbiAgICAgIH0pLFxuICAgICAgdGFwKGFzeW5jICgpID0+XG4gICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYERFTEVURSBGUk9NICR7Q291cnNlQXNzZXNzbWVudEVudHJ5LlRBQkxFX05BTUV9YCkudG9Qcm9taXNlKClcbiAgICAgICksXG4gICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgKS50b1Byb21pc2UoKTtcbiAgfVxufVxuIl19