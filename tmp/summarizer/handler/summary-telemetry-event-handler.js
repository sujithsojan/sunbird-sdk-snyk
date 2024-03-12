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
import { Actor, AuditState } from '../../telemetry';
import { CourseServiceImpl, UpdateContentStateTarget } from '../../course';
import { ContentKeys } from '../../preference-keys';
import { EventNamespace } from '../../events-bus';
import { ContentEventType, MarkerType } from '../../content';
import { ContentAccessStatus } from '../../profile';
import { defer, iif, of } from 'rxjs';
import { delay, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { CsContentProgressCalculator } from '@project-sunbird/client-services/services/content/utilities/content-progress-calculator';
import { TelemetryLogger } from '../../telemetry/util/telemetry-logger';
import { CsPrimaryCategory } from '@project-sunbird/client-services/services/content';
import { TrackingEnabled } from '@project-sunbird/client-services/models';
var TrackableSessionProxyContentProvider = /** @class */ (function () {
    function TrackableSessionProxyContentProvider(contentService) {
        this.contentService = contentService;
    }
    TrackableSessionProxyContentProvider.prototype.provide = function (request, primaryCategory) {
        var _this = this;
        request.objectType = TrackableSessionProxyContentProvider.getCategoryMapper(primaryCategory);
        if (this.trackableSessionContentCache) {
            return iif(function () { return !!_this.trackableSessionContentCache[request.contentId]; }, defer(function () { return of(_this.trackableSessionContentCache[request.contentId]); }), defer(function () { return _this.contentService.getContentDetails(request).pipe(tap(function (content) { return _this.trackableSessionContentCache[request.contentId] = content; })); }));
        }
        return this.contentService.getContentDetails(request);
    };
    TrackableSessionProxyContentProvider.prototype.cache = function (content) {
        if (this.trackableSessionContentCache) {
            this.trackableSessionContentCache[content.identifier] = content;
        }
    };
    TrackableSessionProxyContentProvider.prototype.init = function () {
        this.trackableSessionContentCache = {};
    };
    TrackableSessionProxyContentProvider.prototype.dispose = function () {
        this.trackableSessionContentCache = undefined;
    };
    TrackableSessionProxyContentProvider.getCategoryMapper = function (primaryCategory) {
        switch (primaryCategory) {
            case CsPrimaryCategory.PRACTICE_QUESTION_SET:
                return 'QuestionSet';
            case 'Multiple Choice Question':
                return 'Question';
        }
    };
    return TrackableSessionProxyContentProvider;
}());
var SummaryTelemetryEventHandler = /** @class */ (function () {
    function SummaryTelemetryEventHandler(courseService, sharedPreference, summarizerService, eventBusService, contentService, profileService) {
        this.courseService = courseService;
        this.sharedPreference = sharedPreference;
        this.summarizerService = summarizerService;
        this.eventBusService = eventBusService;
        this.contentService = contentService;
        this.profileService = profileService;
        this.currentUID = undefined;
        this.currentContentID = undefined;
        this.courseContext = {};
        this.trackableSessionProxyContentProvider = new TrackableSessionProxyContentProvider(this.contentService);
    }
    SummaryTelemetryEventHandler.checkPData = function (pdata) {
        if (pdata != null && pdata.pid !== null) {
            return pdata.pid.indexOf(SummaryTelemetryEventHandler.CONTENT_PLAYER_PID) !== -1;
        }
        return false;
    };
    SummaryTelemetryEventHandler.isContentTrackable = function (content) {
        return !!content.contentData.trackable && content.contentData.trackable.enabled === TrackingEnabled.YES;
    };
    SummaryTelemetryEventHandler.isCourseAssessmentContent = function (content) {
        return content.primaryCategory && (content.primaryCategory.toLowerCase() === CsPrimaryCategory.COURSE_ASSESSMENT.toLowerCase());
    };
    SummaryTelemetryEventHandler.prototype.updateContentState = function (event) {
        var _this = this;
        return this.getCourseContext().pipe(mergeMap(function (courseContext) {
            var userId = courseContext['userId'];
            var courseId = courseContext['courseId'];
            var batchId = courseContext['batchId'];
            var batchStatus = 0;
            if (courseContext.hasOwnProperty('batchStatus')) {
                batchStatus = courseContext['batchStatus'];
            }
            var BATCH_IN_PROGRESS = 1;
            if (batchStatus === BATCH_IN_PROGRESS) { // If the batch is expired then do not update content status.
                var contentId_1 = event.object.id;
                return _this.checkStatusOfContent(userId, courseId, batchId, contentId_1).pipe(mergeMap(function (status) {
                    if (event.eid === 'START' && status === 0) {
                        var updateContentStateRequest = {
                            userId: userId,
                            contentId: contentId_1,
                            courseId: courseId,
                            batchId: batchId,
                            status: 1,
                            progress: 5
                        };
                        return _this.courseService.updateContentState(updateContentStateRequest).pipe(mapTo(undefined));
                    }
                    else if ((event.eid === 'END' && status === 0) ||
                        (event.eid === 'END' && status === 1)) {
                        return _this.trackableSessionProxyContentProvider.provide({ contentId: event.object.id }, event.object.type).pipe(mergeMap(function (content) {
                            return _this.validEndEvent(event, content, courseContext).pipe(mergeMap(function (isValid) {
                                if (isValid) {
                                    var progress = CsContentProgressCalculator.calculate(event.edata.summary, content.mimeType);
                                    var updateContentStateRequest_1 = {
                                        userId: userId,
                                        contentId: content.identifier,
                                        courseId: courseId,
                                        batchId: batchId,
                                        status: progress === 100 ? 2 : 1,
                                        progress: progress,
                                        target: SummaryTelemetryEventHandler.isCourseAssessmentContent(content) ?
                                            [UpdateContentStateTarget.LOCAL] :
                                            [UpdateContentStateTarget.LOCAL, UpdateContentStateTarget.SERVER]
                                    };
                                    _this.generateAuditTelemetry(userId, courseId, batchId, content, event.object ? event.object.rollup : {});
                                    return _this.courseService.updateContentState(updateContentStateRequest_1).pipe(tap(function () {
                                        _this.eventBusService.emit({
                                            namespace: EventNamespace.CONTENT,
                                            event: {
                                                type: ContentEventType.COURSE_STATE_UPDATED,
                                                payload: {
                                                    contentId: updateContentStateRequest_1.courseId
                                                }
                                            }
                                        });
                                    }), mapTo(undefined));
                                }
                                else {
                                    return of(undefined);
                                }
                            }));
                        }));
                    }
                    return of(undefined);
                }), tap(function () {
                    _this.updateLastReadContentId(userId, courseId, batchId, contentId_1).toPromise();
                }));
            }
            else {
                return of(undefined);
            }
        }));
    };
    SummaryTelemetryEventHandler.prototype.handle = function (event) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var content, content;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event.eid === 'START')) return [3 /*break*/, 4];
                        if (!SummaryTelemetryEventHandler.checkPData(event.context.pdata)) return [3 /*break*/, 1];
                        this.courseService.resetCapturedAssessmentEvents();
                        return [2 /*return*/, this.processOEStart(event).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.summarizerService.saveLearnerAssessmentDetails(event).pipe(mapTo(undefined)).toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getCourseContext().pipe(mergeMap(function () {
                                                return _this.updateContentState(event);
                                            })).toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.markContentAsPlayed(event)
                                                .toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })).toPromise()];
                    case 1:
                        if (!(event.object && event.object.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.trackableSessionProxyContentProvider
                                .provide({ contentId: event.object.id }, event.object.type).toPromise()];
                    case 2:
                        content = _a.sent();
                        if (SummaryTelemetryEventHandler.isContentTrackable(content)) {
                            this.trackableSessionProxyContentProvider.init();
                            this.trackableSessionProxyContentProvider.cache(content);
                            return [2 /*return*/, this.getCourseContext().pipe(mapTo(undefined)).toPromise()];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 8];
                    case 4:
                        if (!(event.eid === 'ASSESS' && SummaryTelemetryEventHandler.checkPData(event.context.pdata))) return [3 /*break*/, 5];
                        return [2 /*return*/, this.processOEAssess(event).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                var context;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getCourseContext().toPromise()];
                                        case 1:
                                            context = _a.sent();
                                            if (!(event.context.cdata.find(function (c) { return c.type === 'AttemptId'; })
                                                && context.userId && context.courseId && context.batchId)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.courseService.captureAssessmentEvent({ event: event, courseContext: context })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.summarizerService.saveLearnerAssessmentDetails(event).pipe(mapTo(undefined)).toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })).toPromise()];
                    case 5:
                        if (!(event.eid === 'END')) return [3 /*break*/, 8];
                        if (!SummaryTelemetryEventHandler.checkPData(event.context.pdata)) return [3 /*break*/, 6];
                        return [2 /*return*/, this.processOEEnd(event).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.summarizerService.saveLearnerContentSummaryDetails(event).pipe(mapTo(undefined)).toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getCourseContext().pipe(mergeMap(function () {
                                                return _this.updateContentState(event);
                                            })).toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })).toPromise()];
                    case 6:
                        if (!(event.object && event.object.id)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.trackableSessionProxyContentProvider
                                .provide({ contentId: event.object.id }, event.object.type).toPromise()];
                    case 7:
                        content = _a.sent();
                        if (SummaryTelemetryEventHandler.isContentTrackable(content)) {
                            this.trackableSessionProxyContentProvider.dispose();
                            return [2 /*return*/, this.setCourseContextEmpty().toPromise()];
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    };
    SummaryTelemetryEventHandler.prototype.setCourseContextEmpty = function () {
        this.courseContext = {};
        return this.sharedPreference.putString(ContentKeys.COURSE_CONTEXT, '');
    };
    SummaryTelemetryEventHandler.prototype.validEndEvent = function (event, content, courseContext) {
        var _this = this;
        var isCourseAssessmentSyncPending = function () {
            return courseContext &&
                (SummaryTelemetryEventHandler.isCourseAssessmentContent(content) ||
                    (content.contentType && content.contentType.toLowerCase() === 'onboardingresource') ||
                    (content.primaryCategory && content.primaryCategory.toLowerCase() === 'onboardingresource')) &&
                _this.courseService.hasCapturedAssessmentEvent({ courseContext: courseContext });
        };
        return defer(function () { return of(undefined); })
            .pipe(delay(2000), map(function () {
            if (isCourseAssessmentSyncPending()) {
                return false;
            }
            return event.edata.summary && !!event.edata.summary.find(function (s) { return s['progress']; });
        }), tap(function () { return _this.courseService.resetCapturedAssessmentEvents(); }));
    };
    SummaryTelemetryEventHandler.prototype.updateLastReadContentId = function (userId, courseId, batchId, contentId) {
        var key = CourseServiceImpl.LAST_READ_CONTENTID_PREFIX.concat('_')
            .concat(userId).concat('_')
            .concat(courseId).concat('_')
            .concat(batchId);
        return this.sharedPreference.putString(key, contentId);
    };
    SummaryTelemetryEventHandler.prototype.markContentAsPlayed = function (event) {
        var _this = this;
        var uid = event.actor.id;
        var identifier = event.object.id;
        var request = {
            contentId: identifier
        };
        return this.trackableSessionProxyContentProvider.provide(request, event.object.type).pipe(mergeMap(function (content) {
            var addContentAccessRequest = {
                status: ContentAccessStatus.PLAYED,
                contentId: identifier,
                contentType: content.contentType || content.primaryCategory
            };
            return _this.profileService.addContentAccess(addContentAccessRequest).pipe(mergeMap(function () {
                var contentMarkerRequest = {
                    uid: uid,
                    contentId: identifier,
                    data: JSON.stringify(content.contentData),
                    marker: MarkerType.PREVIEWED,
                    isMarked: true,
                    extraInfo: {}
                };
                return _this.contentService.setContentMarker(contentMarkerRequest).pipe(mapTo(true));
            }));
        }));
    };
    SummaryTelemetryEventHandler.prototype.getCourseContext = function () {
        return this.sharedPreference.getString(ContentKeys.COURSE_CONTEXT).pipe(map(function (value) {
            return value ? JSON.parse(value) : {};
        }));
    };
    SummaryTelemetryEventHandler.prototype.checkStatusOfContent = function (userId, courseId, batchId, contentId) {
        var _this = this;
        var contentStateRequest = {
            userId: userId,
            batchId: batchId,
            contentIds: [contentId],
            courseId: courseId
        };
        return this.courseService.getContentState(contentStateRequest).pipe(map(function (contentStateResponse) {
            var contentStateList = contentStateResponse && contentStateResponse.contentList;
            return _this.getStatus(contentStateList, contentId);
        }));
    };
    SummaryTelemetryEventHandler.prototype.getStatus = function (contentStateList, contentId) {
        if (contentStateList === void 0) { contentStateList = []; }
        var content = contentStateList.find(function (c) { return c.contentId === contentId; });
        return (content && content.status) || 0;
    };
    SummaryTelemetryEventHandler.prototype.processOEStart = function (event) {
        this.currentUID = event.actor.id;
        this.currentContentID = event.object.id;
        return of(undefined);
    };
    SummaryTelemetryEventHandler.prototype.processOEAssess = function (event) {
        var _this = this;
        if (this.currentUID && this.currentContentID &&
            this.currentUID.toLocaleLowerCase() === event.actor.id.toLocaleLowerCase() &&
            this.currentContentID.toLocaleLowerCase() === event.object.id.toLocaleLowerCase()) {
            return this.summarizerService.deletePreviousAssessmentDetails(this.currentUID, this.currentContentID).pipe(tap(function () {
                _this.currentUID = undefined;
                _this.currentContentID = undefined;
            }), mapTo(undefined));
        }
        return of(undefined);
    };
    SummaryTelemetryEventHandler.prototype.processOEEnd = function (event) {
        return of(undefined);
    };
    SummaryTelemetryEventHandler.prototype.generateAuditTelemetry = function (userId, courseId, batchId, content, rollup) {
        var actor = new Actor();
        actor.id = userId;
        actor.type = Actor.TYPE_USER;
        var cdata = [
            {
                type: 'CourseId',
                id: courseId || ''
            },
            {
                type: 'BatchId',
                id: batchId || ''
            },
            {
                type: 'UserId',
                id: userId || ''
            },
            {
                type: 'ContentId',
                id: content.identifier || ''
            }
        ];
        var auditRequest = {
            env: 'course',
            actor: actor,
            currentState: AuditState.AUDIT_UPDATED,
            updatedProperties: ['progress'],
            objId: content.identifier,
            objType: content.contentData.contentType || '',
            objVer: content.contentData.pkgVersion || '',
            rollUp: rollup || {},
            correlationData: cdata,
            type: 'content-progress'
        };
        TelemetryLogger.log.audit(auditRequest).toPromise();
    };
    SummaryTelemetryEventHandler.CONTENT_PLAYER_PID = 'contentplayer';
    return SummaryTelemetryEventHandler;
}());
export { SummaryTelemetryEventHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS10ZWxlbWV0cnktZXZlbnQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdW1tYXJpemVyL2hhbmRsZXIvc3VtbWFyeS10ZWxlbWV0cnktZXZlbnQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBZ0UsTUFBTSxpQkFBaUIsQ0FBQztBQUVqSCxPQUFPLEVBSUgsaUJBQWlCLEVBR2pCLHdCQUF3QixFQUMzQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGNBQWMsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRSxPQUFPLEVBQWdDLGdCQUFnQixFQUF3QyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFnQixtQkFBbUIsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0seUZBQXlGLENBQUM7QUFDcEksT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUd4RTtJQUdJLDhDQUNZLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUUxQyxDQUFDO0lBRUQsc0RB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a0JBQWtCO1NBQzNCLENBQUM7UUFDRixlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBeFh1QiwrQ0FBa0IsR0FBRyxlQUFlLENBQUM7SUF5WGpFLG1DQUFDO0NBQUEsQUExWEQsSUEwWEM7U0ExWFksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7QWN0b3IsIEF1ZGl0U3RhdGUsIFByb2R1Y2VyRGF0YSwgUm9sbHVwLCBTdW5iaXJkVGVsZW1ldHJ5LCBUZWxlbWV0cnlBdWRpdFJlcXVlc3R9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge1N1bW1hcml6ZXJTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge1xuICAgIENvbnRlbnRTdGF0ZSxcbiAgICBDb250ZW50U3RhdGVSZXNwb25zZSxcbiAgICBDb3Vyc2VTZXJ2aWNlLFxuICAgIENvdXJzZVNlcnZpY2VJbXBsLFxuICAgIEdldENvbnRlbnRTdGF0ZVJlcXVlc3QsXG4gICAgVXBkYXRlQ29udGVudFN0YXRlUmVxdWVzdCxcbiAgICBVcGRhdGVDb250ZW50U3RhdGVUYXJnZXRcbn0gZnJvbSAnLi4vLi4vY291cnNlJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7Q29udGVudEtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge0V2ZW50TmFtZXNwYWNlLCBFdmVudHNCdXNTZXJ2aWNlfSBmcm9tICcuLi8uLi9ldmVudHMtYnVzJztcbmltcG9ydCB7Q29udGVudCwgQ29udGVudERldGFpbFJlcXVlc3QsIENvbnRlbnRFdmVudFR5cGUsIENvbnRlbnRNYXJrZXJSZXF1ZXN0LCBDb250ZW50U2VydmljZSwgTWFya2VyVHlwZX0gZnJvbSAnLi4vLi4vY29udGVudCc7XG5pbXBvcnQge0NvbnRlbnRBY2Nlc3MsIENvbnRlbnRBY2Nlc3NTdGF0dXMsIFByb2ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm9maWxlJztcbmltcG9ydCB7ZGVmZXIsIGlpZiwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDc0NvbnRlbnRQcm9ncmVzc0NhbGN1bGF0b3J9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL2NvbnRlbnQvdXRpbGl0aWVzL2NvbnRlbnQtcHJvZ3Jlc3MtY2FsY3VsYXRvcic7XG5pbXBvcnQge1RlbGVtZXRyeUxvZ2dlcn0gZnJvbSAnLi4vLi4vdGVsZW1ldHJ5L3V0aWwvdGVsZW1ldHJ5LWxvZ2dlcic7XG5pbXBvcnQge0NzUHJpbWFyeUNhdGVnb3J5fSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jb250ZW50JztcbmltcG9ydCB7VHJhY2tpbmdFbmFibGVkfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9tb2RlbHMnO1xuaW1wb3J0IFRlbGVtZXRyeSA9IFN1bmJpcmRUZWxlbWV0cnkuVGVsZW1ldHJ5O1xuXG5jbGFzcyBUcmFja2FibGVTZXNzaW9uUHJveHlDb250ZW50UHJvdmlkZXIge1xuICAgIHByaXZhdGUgdHJhY2thYmxlU2Vzc2lvbkNvbnRlbnRDYWNoZT86IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IENvbnRlbnQgfCB1bmRlZmluZWQgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbnRlbnRTZXJ2aWNlOiBDb250ZW50U2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIHByb3ZpZGUocmVxdWVzdDogQ29udGVudERldGFpbFJlcXVlc3QsIHByaW1hcnlDYXRlZ29yeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb250ZW50PiB7XG4gICAgICAgIHJlcXVlc3Qub2JqZWN0VHlwZSA9IFRyYWNrYWJsZVNlc3Npb25Qcm94eUNvbnRlbnRQcm92aWRlci5nZXRDYXRlZ29yeU1hcHBlcihwcmltYXJ5Q2F0ZWdvcnkpO1xuICAgICAgICBpZiAodGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWlmKFxuICAgICAgICAgICAgICAgICgpID0+ICEhdGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlIVtyZXF1ZXN0LmNvbnRlbnRJZF0sXG4gICAgICAgICAgICAgICAgZGVmZXIoKCkgPT4gb2YodGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlIVtyZXF1ZXN0LmNvbnRlbnRJZF0hKSksXG4gICAgICAgICAgICAgICAgZGVmZXIoKCkgPT4gdGhpcy5jb250ZW50U2VydmljZS5nZXRDb250ZW50RGV0YWlscyhyZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICB0YXAoKGNvbnRlbnQpID0+IHRoaXMudHJhY2thYmxlU2Vzc2lvbkNvbnRlbnRDYWNoZSFbcmVxdWVzdC5jb250ZW50SWRdID0gY29udGVudClcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRTZXJ2aWNlLmdldENvbnRlbnREZXRhaWxzKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGNhY2hlKGNvbnRlbnQ6IENvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhY2thYmxlU2Vzc2lvbkNvbnRlbnRDYWNoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlW2NvbnRlbnQuaWRlbnRpZmllcl0gPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlID0ge307XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy50cmFja2FibGVTZXNzaW9uQ29udGVudENhY2hlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5TWFwcGVyKHByaW1hcnlDYXRlZ29yeTogc3RyaW5nKSB7XG4gICAgICAgIHN3aXRjaCAocHJpbWFyeUNhdGVnb3J5KSB7XG4gICAgICAgICAgICBjYXNlIENzUHJpbWFyeUNhdGVnb3J5LlBSQUNUSUNFX1FVRVNUSU9OX1NFVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1F1ZXN0aW9uU2V0JztcbiAgICAgICAgICAgIGNhc2UgJ011bHRpcGxlIENob2ljZSBRdWVzdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdRdWVzdGlvbic7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8VGVsZW1ldHJ5LCB1bmRlZmluZWQ+IHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDT05URU5UX1BMQVlFUl9QSUQgPSAnY29udGVudHBsYXllcic7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRVSUQ/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBjdXJyZW50Q29udGVudElEPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgY291cnNlQ29udGV4dCA9IHt9O1xuICAgIHByaXZhdGUgdHJhY2thYmxlU2Vzc2lvblByb3h5Q29udGVudFByb3ZpZGVyOiBUcmFja2FibGVTZXNzaW9uUHJveHlDb250ZW50UHJvdmlkZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2U6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBwcml2YXRlIHN1bW1hcml6ZXJTZXJ2aWNlOiBTdW1tYXJpemVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1c1NlcnZpY2U6IEV2ZW50c0J1c1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29udGVudFNlcnZpY2U6IENvbnRlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy50cmFja2FibGVTZXNzaW9uUHJveHlDb250ZW50UHJvdmlkZXIgPSBuZXcgVHJhY2thYmxlU2Vzc2lvblByb3h5Q29udGVudFByb3ZpZGVyKHRoaXMuY29udGVudFNlcnZpY2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrUERhdGEocGRhdGE6IFByb2R1Y2VyRGF0YSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAocGRhdGEgIT0gbnVsbCAmJiBwZGF0YS5waWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwZGF0YS5waWQuaW5kZXhPZihTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyLkNPTlRFTlRfUExBWUVSX1BJRCkgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc0NvbnRlbnRUcmFja2FibGUoXG4gICAgICAgIGNvbnRlbnQ6IENvbnRlbnRcbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhY29udGVudC5jb250ZW50RGF0YS50cmFja2FibGUgJiYgY29udGVudC5jb250ZW50RGF0YS50cmFja2FibGUuZW5hYmxlZCA9PT0gVHJhY2tpbmdFbmFibGVkLllFUztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc0NvdXJzZUFzc2Vzc21lbnRDb250ZW50KGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQucHJpbWFyeUNhdGVnb3J5ICYmIChjb250ZW50LnByaW1hcnlDYXRlZ29yeS50b0xvd2VyQ2FzZSgpID09PSBDc1ByaW1hcnlDYXRlZ29yeS5DT1VSU0VfQVNTRVNTTUVOVC50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb250ZW50U3RhdGUoZXZlbnQ6IFRlbGVtZXRyeSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvdXJzZUNvbnRleHQoKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNvdXJzZUNvbnRleHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IGNvdXJzZUNvbnRleHRbJ3VzZXJJZCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXJzZUlkID0gY291cnNlQ29udGV4dFsnY291cnNlSWQnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXRjaElkID0gY291cnNlQ29udGV4dFsnYmF0Y2hJZCddO1xuICAgICAgICAgICAgICAgIGxldCBiYXRjaFN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNvdXJzZUNvbnRleHQuaGFzT3duUHJvcGVydHkoJ2JhdGNoU3RhdHVzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYmF0Y2hTdGF0dXMgPSBjb3Vyc2VDb250ZXh0WydiYXRjaFN0YXR1cyddO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IEJBVENIX0lOX1BST0dSRVNTID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYmF0Y2hTdGF0dXMgPT09IEJBVENIX0lOX1BST0dSRVNTKSB7IC8vIElmIHRoZSBiYXRjaCBpcyBleHBpcmVkIHRoZW4gZG8gbm90IHVwZGF0ZSBjb250ZW50IHN0YXR1cy5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudElkID0gZXZlbnQub2JqZWN0LmlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja1N0YXR1c09mQ29udGVudCh1c2VySWQsIGNvdXJzZUlkLCBiYXRjaElkLCBjb250ZW50SWQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoc3RhdHVzOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZWlkID09PSAnU1RBUlQnICYmIHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVDb250ZW50U3RhdGVSZXF1ZXN0OiBVcGRhdGVDb250ZW50U3RhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdGNoSWQ6IGJhdGNoSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdXJzZVNlcnZpY2UudXBkYXRlQ29udGVudFN0YXRlKHVwZGF0ZUNvbnRlbnRTdGF0ZVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoZXZlbnQuZWlkID09PSAnRU5EJyAmJiBzdGF0dXMgPT09IDApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChldmVudC5laWQgPT09ICdFTkQnICYmIHN0YXR1cyA9PT0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2thYmxlU2Vzc2lvblByb3h5Q29udGVudFByb3ZpZGVyLnByb3ZpZGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudElkOiBldmVudC5vYmplY3QuaWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQub2JqZWN0LnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZEVuZEV2ZW50KGV2ZW50LCBjb250ZW50LCBjb3Vyc2VDb250ZXh0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoaXNWYWxpZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IENzQ29udGVudFByb2dyZXNzQ2FsY3VsYXRvci5jYWxjdWxhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXZlbnQuZWRhdGEuc3VtbWFyeSwgY29udGVudC5taW1lVHlwZSBhcyBhbnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUNvbnRlbnRTdGF0ZVJlcXVlc3Q6IFVwZGF0ZUNvbnRlbnRTdGF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGNvbnRlbnQuaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXRjaElkOiBiYXRjaElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHByb2dyZXNzID09PSAxMDAgPyAyIDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogU3VtbWFyeVRlbGVtZXRyeUV2ZW50SGFuZGxlci5pc0NvdXJzZUFzc2Vzc21lbnRDb250ZW50KGNvbnRlbnQpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtVcGRhdGVDb250ZW50U3RhdGVUYXJnZXQuTE9DQUxdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtVcGRhdGVDb250ZW50U3RhdGVUYXJnZXQuTE9DQUwsIFVwZGF0ZUNvbnRlbnRTdGF0ZVRhcmdldC5TRVJWRVJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlQXVkaXRUZWxlbWV0cnkodXNlcklkLCBjb3Vyc2VJZCwgYmF0Y2hJZCwgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQub2JqZWN0ID8gZXZlbnQub2JqZWN0LnJvbGx1cCEgOiB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291cnNlU2VydmljZS51cGRhdGVDb250ZW50U3RhdGUodXBkYXRlQ29udGVudFN0YXRlUmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuQ09OVEVOVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb250ZW50RXZlbnRUeXBlLkNPVVJTRV9TVEFURV9VUERBVEVELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IHVwZGF0ZUNvbnRlbnRTdGF0ZVJlcXVlc3QuY291cnNlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGFzdFJlYWRDb250ZW50SWQodXNlcklkLCBjb3Vyc2VJZCwgYmF0Y2hJZCwgY29udGVudElkKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZShldmVudDogU3VuYmlyZFRlbGVtZXRyeS5UZWxlbWV0cnkpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmVpZCA9PT0gJ1NUQVJUJykge1xuICAgICAgICAgICAgICAgIGlmIChTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyLmNoZWNrUERhdGEoZXZlbnQuY29udGV4dC5wZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLnJlc2V0Q2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc09FU3RhcnQoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VtbWFyaXplclNlcnZpY2Uuc2F2ZUxlYXJuZXJBc3Nlc3NtZW50RGV0YWlscyhldmVudCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRDb3Vyc2VDb250ZXh0KCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQ29udGVudFN0YXRlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubWFya0NvbnRlbnRBc1BsYXllZChldmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50Lm9iamVjdCAmJiBldmVudC5vYmplY3QuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMudHJhY2thYmxlU2Vzc2lvblByb3h5Q29udGVudFByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvdmlkZSh7Y29udGVudElkOiBldmVudC5vYmplY3QuaWR9LCBldmVudC5vYmplY3QudHlwZSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFN1bW1hcnlUZWxlbWV0cnlFdmVudEhhbmRsZXIuaXNDb250ZW50VHJhY2thYmxlKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrYWJsZVNlc3Npb25Qcm94eUNvbnRlbnRQcm92aWRlci5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrYWJsZVNlc3Npb25Qcm94eUNvbnRlbnRQcm92aWRlci5jYWNoZShjb250ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291cnNlQ29udGV4dCgpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZWlkID09PSAnQVNTRVNTJyAmJiBTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyLmNoZWNrUERhdGEoZXZlbnQuY29udGV4dC5wZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzT0VBc3Nlc3MoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgdGhpcy5nZXRDb3Vyc2VDb250ZXh0KCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY29udGV4dC5jZGF0YS5maW5kKChjKSA9PiBjLnR5cGUgPT09ICdBdHRlbXB0SWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbnRleHQudXNlcklkICYmIGNvbnRleHQuY291cnNlSWQgJiYgY29udGV4dC5iYXRjaElkXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvdXJzZVNlcnZpY2UuY2FwdHVyZUFzc2Vzc21lbnRFdmVudCh7ZXZlbnQsIGNvdXJzZUNvbnRleHQ6IGNvbnRleHR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnN1bW1hcml6ZXJTZXJ2aWNlLnNhdmVMZWFybmVyQXNzZXNzbWVudERldGFpbHMoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5laWQgPT09ICdFTkQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKFN1bW1hcnlUZWxlbWV0cnlFdmVudEhhbmRsZXIuY2hlY2tQRGF0YShldmVudC5jb250ZXh0LnBkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzT0VFbmQoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3VtbWFyaXplclNlcnZpY2Uuc2F2ZUxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0Q291cnNlQ29udGV4dCgpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUNvbnRlbnRTdGF0ZShldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5vYmplY3QgJiYgZXZlbnQub2JqZWN0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnRyYWNrYWJsZVNlc3Npb25Qcm94eUNvbnRlbnRQcm92aWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3ZpZGUoe2NvbnRlbnRJZDogZXZlbnQub2JqZWN0LmlkfSwgZXZlbnQub2JqZWN0LnR5cGUpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyLmlzQ29udGVudFRyYWNrYWJsZShjb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja2FibGVTZXNzaW9uUHJveHlDb250ZW50UHJvdmlkZXIuZGlzcG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRDb3Vyc2VDb250ZXh0RW1wdHkoKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb3Vyc2VDb250ZXh0RW1wdHkoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgdGhpcy5jb3Vyc2VDb250ZXh0ID0ge307XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2UucHV0U3RyaW5nKENvbnRlbnRLZXlzLkNPVVJTRV9DT05URVhULCAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZEVuZEV2ZW50KGV2ZW50OiBUZWxlbWV0cnksIGNvbnRlbnQ6IENvbnRlbnQsIGNvdXJzZUNvbnRleHQ/OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgaXNDb3Vyc2VBc3Nlc3NtZW50U3luY1BlbmRpbmcgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY291cnNlQ29udGV4dCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgU3VtbWFyeVRlbGVtZXRyeUV2ZW50SGFuZGxlci5pc0NvdXJzZUFzc2Vzc21lbnRDb250ZW50KGNvbnRlbnQpIHx8XG4gICAgICAgICAgICAgICAgICAgIChjb250ZW50LmNvbnRlbnRUeXBlICYmIGNvbnRlbnQuY29udGVudFR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ29uYm9hcmRpbmdyZXNvdXJjZScpIHx8XG4gICAgICAgICAgICAgICAgICAgIChjb250ZW50LnByaW1hcnlDYXRlZ29yeSAmJiBjb250ZW50LnByaW1hcnlDYXRlZ29yeS50b0xvd2VyQ2FzZSgpID09PSAnb25ib2FyZGluZ3Jlc291cmNlJylcbiAgICAgICAgICAgICAgICApICYmXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmhhc0NhcHR1cmVkQXNzZXNzbWVudEV2ZW50KHtjb3Vyc2VDb250ZXh0fSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IG9mKHVuZGVmaW5lZCkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkZWxheSgyMDAwKSxcbiAgICAgICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb3Vyc2VBc3Nlc3NtZW50U3luY1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5lZGF0YS5zdW1tYXJ5ICYmICEhZXZlbnQuZWRhdGEuc3VtbWFyeS5maW5kKChzKSA9PiBzWydwcm9ncmVzcyddKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5jb3Vyc2VTZXJ2aWNlLnJlc2V0Q2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzKCkpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTGFzdFJlYWRDb250ZW50SWQodXNlcklkOiBzdHJpbmcsIGNvdXJzZUlkOiBzdHJpbmcsIGJhdGNoSWQ6IHN0cmluZywgY29udGVudElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBrZXkgPSBDb3Vyc2VTZXJ2aWNlSW1wbC5MQVNUX1JFQURfQ09OVEVOVElEX1BSRUZJWC5jb25jYXQoJ18nKVxuICAgICAgICAgICAgLmNvbmNhdCh1c2VySWQpLmNvbmNhdCgnXycpXG4gICAgICAgICAgICAuY29uY2F0KGNvdXJzZUlkKS5jb25jYXQoJ18nKVxuICAgICAgICAgICAgLmNvbmNhdChiYXRjaElkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZS5wdXRTdHJpbmcoa2V5LCBjb250ZW50SWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFya0NvbnRlbnRBc1BsYXllZChldmVudCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCB1aWQgPSBldmVudC5hY3Rvci5pZDtcbiAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IGV2ZW50Lm9iamVjdC5pZDtcbiAgICAgICAgY29uc3QgcmVxdWVzdDogQ29udGVudERldGFpbFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBjb250ZW50SWQ6IGlkZW50aWZpZXJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2thYmxlU2Vzc2lvblByb3h5Q29udGVudFByb3ZpZGVyLnByb3ZpZGUocmVxdWVzdCwgZXZlbnQub2JqZWN0LnR5cGUpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudDogQ29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZENvbnRlbnRBY2Nlc3NSZXF1ZXN0OiBDb250ZW50QWNjZXNzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IENvbnRlbnRBY2Nlc3NTdGF0dXMuUExBWUVELFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50LmNvbnRlbnRUeXBlIHx8IGNvbnRlbnQucHJpbWFyeUNhdGVnb3J5IVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZmlsZVNlcnZpY2UuYWRkQ29udGVudEFjY2VzcyhhZGRDb250ZW50QWNjZXNzUmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudE1hcmtlclJlcXVlc3Q6IENvbnRlbnRNYXJrZXJSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZDogdWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZDogaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50LmNvbnRlbnREYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXI6IE1hcmtlclR5cGUuUFJFVklFV0VELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTWFya2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhSW5mbzoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50U2VydmljZS5zZXRDb250ZW50TWFya2VyKGNvbnRlbnRNYXJrZXJSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q291cnNlQ29udGV4dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlLmdldFN0cmluZyhDb250ZW50S2V5cy5DT1VSU0VfQ09OVEVYVCkucGlwZShcbiAgICAgICAgICAgIG1hcCgodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IEpTT04ucGFyc2UodmFsdWUpIDoge307XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tTdGF0dXNPZkNvbnRlbnQodXNlcklkOiBzdHJpbmcsIGNvdXJzZUlkOiBzdHJpbmcsIGJhdGNoSWQ6IHN0cmluZywgY29udGVudElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBjb250ZW50U3RhdGVSZXF1ZXN0OiBHZXRDb250ZW50U3RhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICBiYXRjaElkOiBiYXRjaElkLFxuICAgICAgICAgICAgY29udGVudElkczogW2NvbnRlbnRJZF0sXG4gICAgICAgICAgICBjb3Vyc2VJZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q29udGVudFN0YXRlKGNvbnRlbnRTdGF0ZVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnRlbnRTdGF0ZVJlc3BvbnNlPzogQ29udGVudFN0YXRlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50U3RhdGVMaXN0OiBDb250ZW50U3RhdGVbXSA9IGNvbnRlbnRTdGF0ZVJlc3BvbnNlISAmJiBjb250ZW50U3RhdGVSZXNwb25zZSEuY29udGVudExpc3Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHVzKGNvbnRlbnRTdGF0ZUxpc3QsIGNvbnRlbnRJZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3RhdHVzKGNvbnRlbnRTdGF0ZUxpc3Q6IENvbnRlbnRTdGF0ZVtdID0gW10sIGNvbnRlbnRJZCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50U3RhdGVMaXN0LmZpbmQoYyA9PiBjLmNvbnRlbnRJZCA9PT0gY29udGVudElkKTtcbiAgICAgICAgcmV0dXJuIChjb250ZW50ICYmIGNvbnRlbnQuc3RhdHVzKSB8fCAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc09FU3RhcnQoZXZlbnQ6IFRlbGVtZXRyeSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHRoaXMuY3VycmVudFVJRCA9IGV2ZW50LmFjdG9yLmlkO1xuICAgICAgICB0aGlzLmN1cnJlbnRDb250ZW50SUQgPSBldmVudC5vYmplY3QuaWQ7XG5cbiAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzT0VBc3Nlc3MoZXZlbnQ6IFRlbGVtZXRyeSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVJRCAmJiB0aGlzLmN1cnJlbnRDb250ZW50SUQgJiZcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVJRC50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBldmVudC5hY3Rvci5pZC50b0xvY2FsZUxvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZW50SUQudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gZXZlbnQub2JqZWN0LmlkLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdW1tYXJpemVyU2VydmljZS5kZWxldGVQcmV2aW91c0Fzc2Vzc21lbnREZXRhaWxzKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVJRCxcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZW50SURcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVSUQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudENvbnRlbnRJRCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzT0VFbmQoZXZlbnQ6IFRlbGVtZXRyeSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVBdWRpdFRlbGVtZXRyeSh1c2VySWQ6IHN0cmluZywgY291cnNlSWQ6IHN0cmluZywgYmF0Y2hJZDogc3RyaW5nLCBjb250ZW50OiBDb250ZW50LCByb2xsdXA6IFJvbGx1cCkge1xuICAgICAgICBjb25zdCBhY3RvciA9IG5ldyBBY3RvcigpO1xuICAgICAgICBhY3Rvci5pZCA9IHVzZXJJZDtcbiAgICAgICAgYWN0b3IudHlwZSA9IEFjdG9yLlRZUEVfVVNFUjtcbiAgICAgICAgY29uc3QgY2RhdGEgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0NvdXJzZUlkJyxcbiAgICAgICAgICAgICAgICBpZDogY291cnNlSWQgfHwgJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0JhdGNoSWQnLFxuICAgICAgICAgICAgICAgIGlkOiBiYXRjaElkIHx8ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdVc2VySWQnLFxuICAgICAgICAgICAgICAgIGlkOiB1c2VySWQgfHwgJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0NvbnRlbnRJZCcsXG4gICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnQuaWRlbnRpZmllciB8fCAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGF1ZGl0UmVxdWVzdDogVGVsZW1ldHJ5QXVkaXRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgZW52OiAnY291cnNlJyxcbiAgICAgICAgICAgIGFjdG9yLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlOiBBdWRpdFN0YXRlLkFVRElUX1VQREFURUQsXG4gICAgICAgICAgICB1cGRhdGVkUHJvcGVydGllczogWydwcm9ncmVzcyddLFxuICAgICAgICAgICAgb2JqSWQ6IGNvbnRlbnQuaWRlbnRpZmllcixcbiAgICAgICAgICAgIG9ialR5cGU6IGNvbnRlbnQuY29udGVudERhdGEuY29udGVudFR5cGUgfHwgJycsXG4gICAgICAgICAgICBvYmpWZXI6IGNvbnRlbnQuY29udGVudERhdGEucGtnVmVyc2lvbiB8fCAnJyxcbiAgICAgICAgICAgIHJvbGxVcDogcm9sbHVwIHx8IHt9LFxuICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBjZGF0YSxcbiAgICAgICAgICAgIHR5cGU6ICdjb250ZW50LXByb2dyZXNzJ1xuICAgICAgICB9O1xuICAgICAgICBUZWxlbWV0cnlMb2dnZXIubG9nLmF1ZGl0KGF1ZGl0UmVxdWVzdCkudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19