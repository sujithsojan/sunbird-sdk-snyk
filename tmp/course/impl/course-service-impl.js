var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { UpdateContentStateTarget } from '..';
import { defer, interval, Observable, of } from 'rxjs';
import { GetBatchDetailsHandler } from '../handlers/get-batch-details-handler';
import { UpdateContentStateApiHandler } from '../handlers/update-content-state-api-handler';
import { GetCourseBatchesHandler } from '../handlers/get-course-batches-handler';
import { GetEnrolledCourseHandler } from '../handlers/get-enrolled-course-handler';
import { EnrollCourseHandler } from '../handlers/enroll-course-handler';
import { CachedItemRequestSourceFrom } from '../../key-value-store';
import { HttpRequestType, Request } from '../../api';
import { UnenrollCourseHandler } from '../handlers/unenroll-course-handler';
import { DbService } from '../../db';
import { ContentKeys } from '../../preference-keys';
import { GetContentStateHandler } from '../handlers/get-content-state-handler';
import { UpdateEnrolledCoursesHandler } from '../handlers/update-enrolled-courses-handler';
import { OfflineContentStateHandler } from '../handlers/offline-content-state-handler';
import { CourseUtil } from '../course-util';
import { Container, inject, injectable } from 'inversify';
import { CsInjectionTokens, InjectionTokens } from '../../injection-tokens';
import { DownloadStatus } from '../../util/download';
import * as MD5 from 'crypto-js/md5';
import { SyncAssessmentEventsHandler } from '../handlers/sync-assessment-events-handler';
import { ObjectUtil } from '../../util/object-util';
import { catchError, concatMap, delay, filter, map, mapTo, mergeMap, take } from 'rxjs/operators';
import * as qs from 'qs';
import { GetLearnerCertificateHandler } from '../handlers/get-learner-certificate-handler';
import { OfflineAssessmentScoreProcessor } from './offline-assessment-score-processor';
import { CourseCertificateManagerImpl } from './course-certificate-manager-impl';
var CourseServiceImpl = /** @class */ (function () {
    function CourseServiceImpl(sdkConfig, apiService, profileService, keyValueStore, dbService, sharedPreferences, appInfo, fileService, cachedItemStore, csCourseService, networkQueue, container, authService) {
        this.sdkConfig = sdkConfig;
        this.apiService = apiService;
        this.profileService = profileService;
        this.keyValueStore = keyValueStore;
        this.dbService = dbService;
        this.sharedPreferences = sharedPreferences;
        this.appInfo = appInfo;
        this.fileService = fileService;
        this.cachedItemStore = cachedItemStore;
        this.csCourseService = csCourseService;
        this.networkQueue = networkQueue;
        this.container = container;
        this.authService = authService;
        this.capturedAssessmentEvents = {};
        this.courseServiceConfig = this.sdkConfig.courseServiceConfig;
        this.profileServiceConfig = this.sdkConfig.profileServiceConfig;
        this.syncAssessmentEventsHandler = new SyncAssessmentEventsHandler(this, this.sdkConfig, this.dbService, this.networkQueue);
        this.offlineAssessmentScoreProcessor = new OfflineAssessmentScoreProcessor(this.keyValueStore, this.sharedPreferences);
    }
    CourseServiceImpl_1 = CourseServiceImpl;
    Object.defineProperty(CourseServiceImpl.prototype, "certificateManager", {
        get: function () {
            if (!this._certificateManager) {
                this._certificateManager = new CourseCertificateManagerImpl(this.profileService, this.fileService, this.keyValueStore, this.csCourseService);
            }
            return this._certificateManager;
        },
        enumerable: false,
        configurable: true
    });
    CourseServiceImpl.buildUrl = function (host, path, params) {
        return "" + host + path + "?" + qs.stringify(params);
    };
    CourseServiceImpl.prototype.getBatchDetails = function (request) {
        return new GetBatchDetailsHandler(this.apiService, this.courseServiceConfig)
            .handle(request);
    };
    CourseServiceImpl.prototype.updateContentState = function (request) {
        var _this = this;
        if (!request.target) {
            request.target = [UpdateContentStateTarget.LOCAL, UpdateContentStateTarget.SERVER];
        }
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var offlineContentStateHandler, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        offlineContentStateHandler = new OfflineContentStateHandler(this.keyValueStore);
                        if (!(request.target.indexOf(UpdateContentStateTarget.SERVER) > -1)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (new UpdateContentStateApiHandler(this.networkQueue, this.sdkConfig)
                                .handle(CourseUtil.getUpdateContentStateRequest(request))).toPromise()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(request.target.indexOf(UpdateContentStateTarget.LOCAL) > -1)) return [3 /*break*/, 7];
                        return [4 /*yield*/, offlineContentStateHandler.manipulateEnrolledCoursesResponseLocally(request).toPromise()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, offlineContentStateHandler.manipulateGetContentStateResponseLocally(request).toPromise()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, true];
                }
            });
        }); });
    };
    CourseServiceImpl.prototype.getCourseBatches = function (request) {
        return new GetCourseBatchesHandler(this.apiService, this.courseServiceConfig).handle(request);
    };
    CourseServiceImpl.prototype.getEnrolledCourses = function (request, apiHandler) {
        return new GetEnrolledCourseHandler(this.keyValueStore, this.apiService, this.courseServiceConfig, this.sharedPreferences, apiHandler).handle(request);
    };
    CourseServiceImpl.prototype.getUserEnrolledCourses = function (_a) {
        var _this = this;
        var request = _a.request, from = _a.from;
        return this.cachedItemStore[from === CachedItemRequestSourceFrom.SERVER ? 'get' : 'getCached'](request.userId + (request.filters ? '_' + JSON.stringify(request.filters) : ''), CourseServiceImpl_1.USER_ENROLLMENT_LIST_KEY_PREFIX, 'ttl_' + CourseServiceImpl_1.USER_ENROLLMENT_LIST_KEY_PREFIX, function () { return _this.csCourseService.getUserEnrolledCourses(request, {}, { apiPath: '/api/course/v2', certRegistrationApiPath: '' }); });
    };
    CourseServiceImpl.prototype.enrollCourse = function (request) {
        var _this = this;
        return new EnrollCourseHandler(this.apiService, this.courseServiceConfig)
            .handle(request)
            .pipe(mergeMap(function (isEnrolled) {
            if (isEnrolled) {
                var courseContext = {};
                courseContext['userId'] = request.userId;
                courseContext['batchStatus'] = request.batchStatus;
                return _this.sharedPreferences.putString(ContentKeys.COURSE_CONTEXT, JSON.stringify(courseContext)).pipe(delay(2000), concatMap(function () {
                    return _this.getEnrolledCourses({ userId: request.userId, returnFreshCourses: true });
                }), mapTo(isEnrolled));
            }
            return of(isEnrolled);
        }));
    };
    CourseServiceImpl.prototype.getContentState = function (request) {
        var _this = this;
        var key = CourseServiceImpl_1.GET_CONTENT_STATE_KEY_PREFIX.concat(request.userId, request.courseId);
        var offlinecontentStateHandler = new OfflineContentStateHandler(this.keyValueStore);
        var updateCourseHandler = new UpdateEnrolledCoursesHandler(this.keyValueStore, offlinecontentStateHandler);
        return this.keyValueStore.getValue(key)
            .pipe(mergeMap(function (value) {
            if (!value || request.returnRefreshedContentStates) {
                return new GetContentStateHandler(_this.apiService, _this.courseServiceConfig, _this.container).handle(request)
                    .pipe(mergeMap(function (response) {
                    if (response) {
                        return _this.keyValueStore.setValue(key, JSON.stringify(response))
                            .pipe(mergeMap(function () {
                            return offlinecontentStateHandler.getLocalContentStateResponse(request);
                        }), mergeMap(function () {
                            return updateCourseHandler.updateEnrollCourses(request);
                        }));
                    }
                    else {
                        return of(undefined);
                    }
                }), catchError(function (error) {
                    return offlinecontentStateHandler.getLocalContentStateResponse(request)
                        .pipe(mergeMap(function () {
                        return updateCourseHandler.updateEnrollCourses(request);
                    }));
                }));
            }
            else {
                return offlinecontentStateHandler.getLocalContentStateResponse(request);
            }
        }));
    };
    CourseServiceImpl.prototype.unenrollCourse = function (unenrollCourseRequest) {
        var _this = this;
        return new UnenrollCourseHandler(this.apiService, this.courseServiceConfig).handle(unenrollCourseRequest)
            .pipe(delay(2000), concatMap(function () {
            return _this.getEnrolledCourses({ userId: unenrollCourseRequest.userId, returnFreshCourses: true });
        }), mapTo(true));
    };
    CourseServiceImpl.prototype.downloadCurrentProfileCourseCertificate = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var activeProfile, userId, folderPath, filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        activeProfile = (_a.sent());
                        userId = activeProfile.managedSession ? activeProfile.managedSession.uid : activeProfile.uid;
                        folderPath = (window.device.platform.toLowerCase() === 'ios') ? cordova.file.documentsDirectory : cordova.file.externalRootDirectory;
                        filePath = folderPath + "Download/" + request.certificate.name + "_" + request.courseId + "_" + userId + ".pdf";
                        return [2 /*return*/, { userId: userId }];
                }
            });
        }); }).pipe(mergeMap(function (_a) {
            var userId = _a.userId;
            var signCertificateRequest = new Request.Builder()
                .withType(HttpRequestType.POST)
                .withPath(CourseServiceImpl_1.CERTIFICATE_SIGN_ENDPOINT)
                .withBearerToken(true)
                .withUserToken(true)
                .withBody({
                request: {
                    pdfUrl: request.certificate.url
                }
            })
                .build();
            return _this.apiService.fetch(signCertificateRequest)
                .pipe(map(function (response) {
                return {
                    signedPdfUrl: response.body.result.signedUrl,
                    userId: userId
                };
            }));
        }), mergeMap(function (_a) {
            var signedPdfUrl = _a.signedPdfUrl, userId = _a.userId;
            var downloadRequest = {
                uri: signedPdfUrl,
                title: request.certificate.token,
                description: '',
                mimeType: 'application/pdf',
                visibleInDownloadsUi: true,
                notificationVisibility: 1,
                destinationInExternalPublicDir: {
                    dirType: 'Download',
                    subPath: "/" + request.certificate.name + "_" + request.courseId + "_" + userId + ".pdf"
                },
                headers: []
            };
            return new Observable(function (observer) {
                downloadManager.enqueue(downloadRequest, function (err, id) {
                    if (err) {
                        return observer.error(err);
                    }
                    observer.next(id);
                    observer.complete();
                });
            });
        }), mergeMap(function (downloadId) {
            return interval(1000)
                .pipe(mergeMap(function () {
                return new Observable(function (observer) {
                    downloadManager.query({ ids: [downloadId] }, function (err, entries) {
                        if (err || (entries[0].status === DownloadStatus.STATUS_FAILED)) {
                            return observer.error(err || new Error('Unknown Error'));
                        }
                        return observer.next(entries[0]);
                    });
                });
            }), filter(function (entry) { return entry.status === DownloadStatus.STATUS_SUCCESSFUL; }), take(1));
        }), map(function (entry) { return ({ path: entry.localUri }); }));
    };
    CourseServiceImpl.prototype.hasCapturedAssessmentEvent = function (_a) {
        var courseContext = _a.courseContext;
        var key = ObjectUtil.toOrderedString(courseContext);
        return !!this.capturedAssessmentEvents[key];
    };
    CourseServiceImpl.prototype.captureAssessmentEvent = function (_a) {
        var event = _a.event, courseContext = _a.courseContext;
        var key = ObjectUtil.toOrderedString(courseContext);
        if (!this.capturedAssessmentEvents[key]) {
            this.capturedAssessmentEvents[key] = [];
        }
        this.capturedAssessmentEvents[key].push(event);
    };
    CourseServiceImpl.prototype.syncAssessmentEvents = function (options) {
        if (options === void 0) { options = { persistedOnly: false }; }
        var capturedAssessmentEvents = {};
        if (!options.persistedOnly) {
            capturedAssessmentEvents = this.capturedAssessmentEvents;
            this.resetCapturedAssessmentEvents();
        }
        this.offlineAssessmentScoreProcessor.process(capturedAssessmentEvents);
        return this.syncAssessmentEventsHandler.handle(capturedAssessmentEvents);
    };
    CourseServiceImpl.prototype.resetCapturedAssessmentEvents = function () {
        this.capturedAssessmentEvents = {};
    };
    CourseServiceImpl.prototype.generateAssessmentAttemptId = function (request) {
        return MD5([request.courseId, request.batchId, request.contentId,
            request.userId, request.date ? request.date : Date.now()].join('-')).toString();
    };
    CourseServiceImpl.prototype.displayDiscussionForum = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var session, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getSession().toPromise()];
                    case 1:
                        session = _a.sent();
                        if (!session) {
                            return [2 /*return*/, false];
                        }
                        accessToken = session.managed_access_token || session.access_token;
                        cordova.InAppBrowser.open(CourseServiceImpl_1.buildUrl(this.sdkConfig.apiConfig.host, CourseServiceImpl_1.DISCUSSION_FORUM_ENDPOINT, {
                            'access_token': accessToken,
                            'returnTo': "/category/" + request.forumId
                        }), '_blank', 'zoom=no,clearcache=yes,clearsessioncache=yes,cleardata=yes,hideurlbar=yes,hidenavigationbuttons=true');
                        return [2 /*return*/, true];
                }
            });
        }); });
    };
    CourseServiceImpl.prototype.getLearnerCertificates = function (request) {
        return new GetLearnerCertificateHandler(this.apiService, this.cachedItemStore).handle(request);
    };
    CourseServiceImpl.prototype.syncCourseProgress = function (request) {
        return this.csCourseService.updateContentState(request, { apiPath: '/api/course/v1' });
    };
    CourseServiceImpl.prototype.clearAssessments = function () {
        var _this = this;
        return this.sharedPreferences.getString(ContentKeys.COURSE_CONTEXT).pipe(map(function (value) {
            var result = value ? JSON.parse(value) : {};
            if (result) {
                var key = ObjectUtil.toOrderedString(result);
                if (_this.capturedAssessmentEvents[key]) {
                    _this.capturedAssessmentEvents[key] = [];
                }
            }
            return undefined;
        }));
    };
    var CourseServiceImpl_1;
    CourseServiceImpl.USER_ENROLLMENT_LIST_KEY_PREFIX = 'userEnrollmentList';
    CourseServiceImpl.GET_CONTENT_STATE_KEY_PREFIX = 'getContentState';
    CourseServiceImpl.GET_ENROLLED_COURSE_KEY_PREFIX = 'enrolledCourses';
    CourseServiceImpl.UPDATE_CONTENT_STATE_KEY_PREFIX = 'updateContentState';
    CourseServiceImpl.LAST_READ_CONTENTID_PREFIX = 'lastReadContentId';
    CourseServiceImpl.CERTIFICATE_SIGN_ENDPOINT = '/api/certreg/v1/certs/download';
    CourseServiceImpl.DISCUSSION_FORUM_ENDPOINT = '/discussions/auth/sunbird-oidc/callback';
    CourseServiceImpl = CourseServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.API_SERVICE)),
        __param(2, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(3, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(4, inject(InjectionTokens.DB_SERVICE)),
        __param(5, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(6, inject(InjectionTokens.APP_INFO)),
        __param(7, inject(InjectionTokens.FILE_SERVICE)),
        __param(8, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __param(9, inject(CsInjectionTokens.COURSE_SERVICE)),
        __param(10, inject(InjectionTokens.NETWORK_QUEUE)),
        __param(11, inject(InjectionTokens.CONTAINER)),
        __param(12, inject(InjectionTokens.AUTH_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, DbService, Object, Object, Object, Object, Object, Object, Container, Object])
    ], CourseServiceImpl);
    return CourseServiceImpl;
}());
export { CourseServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaW1wbC9jb3Vyc2Utc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFnQkgsd0JBQXdCLEVBQzNCLE1BQU0sSUFBSSxDQUFDO0FBQ1osT0FBTyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFZLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUMxRixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsMkJBQTJCLEVBQWlDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEcsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ3JG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Q0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDeEMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JDLFlBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQyxZQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7eUVBUmtCLFNBQVMsa0RBT1YsU0FBUztPQXZDMUQsaUJBQWlCLENBMFc3QjtJQUFELHdCQUFDO0NBQUEsQUExV0QsSUEwV0M7U0ExV1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBCYXRjaCxcbiAgICBDb250ZW50U3RhdGVSZXNwb25zZSxcbiAgICBDb3Vyc2UsXG4gICAgQ291cnNlQmF0Y2hEZXRhaWxzUmVxdWVzdCxcbiAgICBDb3Vyc2VCYXRjaGVzUmVxdWVzdCxcbiAgICBDb3Vyc2VTZXJ2aWNlLFxuICAgIENvdXJzZVNlcnZpY2VDb25maWcsXG4gICAgRGlzcGxheURpc2N1c3Npb25Gb3J1bVJlcXVlc3QsXG4gICAgRW5yb2xsQ291cnNlUmVxdWVzdCxcbiAgICBGZXRjaEVucm9sbGVkQ291cnNlUmVxdWVzdCxcbiAgICBHZW5lcmF0ZUF0dGVtcHRJZFJlcXVlc3QsXG4gICAgR2V0Q29udGVudFN0YXRlUmVxdWVzdCwgR2V0TGVhcm5lckNlcmlmaWNhdGVSZXF1ZXN0LFxuICAgIEdldFVzZXJFbnJvbGxlZENvdXJzZXNSZXF1ZXN0LFxuICAgIFVuZW5yb2xsQ291cnNlUmVxdWVzdCxcbiAgICBVcGRhdGVDb250ZW50U3RhdGVSZXF1ZXN0LFxuICAgIFVwZGF0ZUNvbnRlbnRTdGF0ZVRhcmdldFxufSBmcm9tICcuLic7XG5pbXBvcnQge2RlZmVyLCBpbnRlcnZhbCwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2UsIFByb2ZpbGVTZXJ2aWNlQ29uZmlnfSBmcm9tICcuLi8uLi9wcm9maWxlJztcbmltcG9ydCB7R2V0QmF0Y2hEZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZ2V0LWJhdGNoLWRldGFpbHMtaGFuZGxlcic7XG5pbXBvcnQge1VwZGF0ZUNvbnRlbnRTdGF0ZUFwaUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL3VwZGF0ZS1jb250ZW50LXN0YXRlLWFwaS1oYW5kbGVyJztcbmltcG9ydCB7R2V0Q291cnNlQmF0Y2hlc0hhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL2dldC1jb3Vyc2UtYmF0Y2hlcy1oYW5kbGVyJztcbmltcG9ydCB7R2V0RW5yb2xsZWRDb3Vyc2VIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy9nZXQtZW5yb2xsZWQtY291cnNlLWhhbmRsZXInO1xuaW1wb3J0IHtFbnJvbGxDb3Vyc2VIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy9lbnJvbGwtY291cnNlLWhhbmRsZXInO1xuaW1wb3J0IHtDYWNoZWRJdGVtUmVxdWVzdFNvdXJjZUZyb20sIENhY2hlZEl0ZW1TdG9yZSwgS2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2UsIEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdH0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7VW5lbnJvbGxDb3Vyc2VIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVycy91bmVucm9sbC1jb3Vyc2UtaGFuZGxlcic7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50S2V5c30gZnJvbSAnLi4vLi4vcHJlZmVyZW5jZS1rZXlzJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7R2V0Q29udGVudFN0YXRlSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZ2V0LWNvbnRlbnQtc3RhdGUtaGFuZGxlcic7XG5pbXBvcnQge1VwZGF0ZUVucm9sbGVkQ291cnNlc0hhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL3VwZGF0ZS1lbnJvbGxlZC1jb3Vyc2VzLWhhbmRsZXInO1xuaW1wb3J0IHtPZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvb2ZmbGluZS1jb250ZW50LXN0YXRlLWhhbmRsZXInO1xuaW1wb3J0IHtDb3Vyc2VVdGlsfSBmcm9tICcuLi9jb3Vyc2UtdXRpbCc7XG5pbXBvcnQge0NvbnRhaW5lciwgaW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtDc0luamVjdGlvblRva2VucywgSW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7R2V0Q2VydGlmaWNhdGVSZXF1ZXN0fSBmcm9tICcuLi9kZWYvZ2V0LWNlcnRpZmljYXRlLXJlcXVlc3QnO1xuaW1wb3J0IHtBcHBJbmZvfSBmcm9tICcuLi8uLi91dGlsL2FwcCc7XG5pbXBvcnQge0Rvd25sb2FkU3RhdHVzfSBmcm9tICcuLi8uLi91dGlsL2Rvd25sb2FkJztcbmltcG9ydCB7RG93bmxvYWRDZXJ0aWZpY2F0ZVJlc3BvbnNlfSBmcm9tICcuLi9kZWYvZG93bmxvYWQtY2VydGlmaWNhdGUtcmVzcG9uc2UnO1xuaW1wb3J0IHtTdW5iaXJkVGVsZW1ldHJ5fSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0ICogYXMgTUQ1IGZyb20gJ2NyeXB0by1qcy9tZDUnO1xuaW1wb3J0IHtTeW5jQXNzZXNzbWVudEV2ZW50c0hhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXJzL3N5bmMtYXNzZXNzbWVudC1ldmVudHMtaGFuZGxlcic7XG5pbXBvcnQge09iamVjdFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0LXV0aWwnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBjb25jYXRNYXAsIGRlbGF5LCBmaWx0ZXIsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge0NzQ291cnNlU2VydmljZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY291cnNlJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlfSBmcm9tICcuLi8uLi9hcGkvbmV0d29yay1xdWV1ZSc7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tICcuLi8uLi9hdXRoJztcbmltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcbmltcG9ydCB7R2V0TGVhcm5lckNlcnRpZmljYXRlSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvZ2V0LWxlYXJuZXItY2VydGlmaWNhdGUtaGFuZGxlcic7XG5pbXBvcnQge0xlYXJuZXJDZXJ0aWZpY2F0ZX0gZnJvbSAnLi4vZGVmL2dldC1sZWFybmVyLWNlcnRpZmljYXRlLXJlc3BvbnNlJztcbmltcG9ydCB7T2ZmbGluZUFzc2Vzc21lbnRTY29yZVByb2Nlc3Nvcn0gZnJvbSAnLi9vZmZsaW5lLWFzc2Vzc21lbnQtc2NvcmUtcHJvY2Vzc29yJztcbmltcG9ydCB7R2V0RW5yb2xsZWRDb3Vyc2VSZXNwb25zZX0gZnJvbSAnLi4vZGVmL2dldC1lbnJvbGxlZC1jb3Vyc2UtcmVzcG9uc2UnO1xuaW1wb3J0IHtDb3Vyc2VDZXJ0aWZpY2F0ZU1hbmFnZXJ9IGZyb20gJy4uL2RlZi9jb3Vyc2UtY2VydGlmaWNhdGUtbWFuYWdlcic7XG5pbXBvcnQge0NvdXJzZUNlcnRpZmljYXRlTWFuYWdlckltcGx9IGZyb20gJy4vY291cnNlLWNlcnRpZmljYXRlLW1hbmFnZXItaW1wbCc7XG5pbXBvcnQge1VwZGF0ZUNvbnRlbnRTdGF0ZVJlc3BvbnNlfSBmcm9tICcuLi9kZWYvdXBkYXRlLWNvbnRlbnQtc3RhdGUtcmVzcG9uc2UnO1xuaW1wb3J0IHtVcGRhdGVDb3Vyc2VDb250ZW50U3RhdGVSZXF1ZXN0fSBmcm9tICcuLi9kZWYvdXBkYXRlLWNvdXJzZS1jb250ZW50LXN0YXRlLXJlcXVlc3QnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ291cnNlU2VydmljZUltcGwgaW1wbGVtZW50cyBDb3Vyc2VTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBVU0VSX0VOUk9MTE1FTlRfTElTVF9LRVlfUFJFRklYID0gJ3VzZXJFbnJvbGxtZW50TGlzdCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHRVRfQ09OVEVOVF9TVEFURV9LRVlfUFJFRklYID0gJ2dldENvbnRlbnRTdGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHRVRfRU5ST0xMRURfQ09VUlNFX0tFWV9QUkVGSVggPSAnZW5yb2xsZWRDb3Vyc2VzJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFVQREFURV9DT05URU5UX1NUQVRFX0tFWV9QUkVGSVggPSAndXBkYXRlQ29udGVudFN0YXRlJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExBU1RfUkVBRF9DT05URU5USURfUFJFRklYID0gJ2xhc3RSZWFkQ29udGVudElkJztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDRVJUSUZJQ0FURV9TSUdOX0VORFBPSU5UID0gJy9hcGkvY2VydHJlZy92MS9jZXJ0cy9kb3dubG9hZCc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRElTQ1VTU0lPTl9GT1JVTV9FTkRQT0lOVCA9ICcvZGlzY3Vzc2lvbnMvYXV0aC9zdW5iaXJkLW9pZGMvY2FsbGJhY2snO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY291cnNlU2VydmljZUNvbmZpZzogQ291cnNlU2VydmljZUNvbmZpZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb2ZpbGVTZXJ2aWNlQ29uZmlnOiBQcm9maWxlU2VydmljZUNvbmZpZztcbiAgICBwcml2YXRlIGNhcHR1cmVkQXNzZXNzbWVudEV2ZW50czogeyBba2V5OiBzdHJpbmddOiBTdW5iaXJkVGVsZW1ldHJ5LlRlbGVtZXRyeVtdIHwgdW5kZWZpbmVkIH0gPSB7fTtcbiAgICBwcml2YXRlIHN5bmNBc3Nlc3NtZW50RXZlbnRzSGFuZGxlcjogU3luY0Fzc2Vzc21lbnRFdmVudHNIYW5kbGVyO1xuICAgIHByaXZhdGUgb2ZmbGluZUFzc2Vzc21lbnRTY29yZVByb2Nlc3NvcjogT2ZmbGluZUFzc2Vzc21lbnRTY29yZVByb2Nlc3NvcjtcblxuICAgIHByaXZhdGUgX2NlcnRpZmljYXRlTWFuYWdlcj86IENvdXJzZUNlcnRpZmljYXRlTWFuYWdlcjtcbiAgICBnZXQgY2VydGlmaWNhdGVNYW5hZ2VyKCk6IENvdXJzZUNlcnRpZmljYXRlTWFuYWdlciB7XG4gICAgICAgIGlmICghdGhpcy5fY2VydGlmaWNhdGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9jZXJ0aWZpY2F0ZU1hbmFnZXIgPSBuZXcgQ291cnNlQ2VydGlmaWNhdGVNYW5hZ2VySW1wbChcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZVN0b3JlLFxuICAgICAgICAgICAgICAgIHRoaXMuY3NDb3Vyc2VTZXJ2aWNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jZXJ0aWZpY2F0ZU1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQSV9TRVJWSUNFKSBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlBST0ZJTEVfU0VSVklDRSkgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLktFWV9WQUxVRV9TVE9SRSkgcHJpdmF0ZSBrZXlWYWx1ZVN0b3JlOiBLZXlWYWx1ZVN0b3JlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUFBfSU5GTykgcHJpdmF0ZSBhcHBJbmZvOiBBcHBJbmZvLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgQGluamVjdChDc0luamVjdGlvblRva2Vucy5DT1VSU0VfU0VSVklDRSkgcHJpdmF0ZSBjc0NvdXJzZVNlcnZpY2U6IENzQ291cnNlU2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuTkVUV09SS19RVUVVRSkgcHJpdmF0ZSBuZXR3b3JrUXVldWU6IE5ldHdvcmtRdWV1ZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ09OVEFJTkVSKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udGFpbmVyLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BVVRIX1NFUlZJQ0UpIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VDb25maWcgPSB0aGlzLnNka0NvbmZpZy5jb3Vyc2VTZXJ2aWNlQ29uZmlnO1xuICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlQ29uZmlnID0gdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWc7XG5cbiAgICAgICAgdGhpcy5zeW5jQXNzZXNzbWVudEV2ZW50c0hhbmRsZXIgPSBuZXcgU3luY0Fzc2Vzc21lbnRFdmVudHNIYW5kbGVyKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLFxuICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtRdWV1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9mZmxpbmVBc3Nlc3NtZW50U2NvcmVQcm9jZXNzb3IgPSBuZXcgT2ZmbGluZUFzc2Vzc21lbnRTY29yZVByb2Nlc3NvcihcbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWVTdG9yZSwgdGhpcy5zaGFyZWRQcmVmZXJlbmNlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZFVybChob3N0OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcGFyYW1zOiB7IFtwOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgICAgICByZXR1cm4gYCR7aG9zdH0ke3BhdGh9PyR7cXMuc3RyaW5naWZ5KHBhcmFtcyl9YDtcbiAgICB9XG5cbiAgICBnZXRCYXRjaERldGFpbHMocmVxdWVzdDogQ291cnNlQmF0Y2hEZXRhaWxzUmVxdWVzdCk6IE9ic2VydmFibGU8QmF0Y2g+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZXRCYXRjaERldGFpbHNIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5jb3Vyc2VTZXJ2aWNlQ29uZmlnKVxuICAgICAgICAgICAgLmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb250ZW50U3RhdGUocmVxdWVzdDogVXBkYXRlQ29udGVudFN0YXRlUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QudGFyZ2V0KSB7XG4gICAgICAgICAgICByZXF1ZXN0LnRhcmdldCA9IFtVcGRhdGVDb250ZW50U3RhdGVUYXJnZXQuTE9DQUwsIFVwZGF0ZUNvbnRlbnRTdGF0ZVRhcmdldC5TRVJWRVJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmxpbmVDb250ZW50U3RhdGVIYW5kbGVyOiBPZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlciA9IG5ldyBPZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlcih0aGlzLmtleVZhbHVlU3RvcmUpO1xuXG4gICAgICAgICAgICBpZiAocmVxdWVzdC50YXJnZXQhLmluZGV4T2YoVXBkYXRlQ29udGVudFN0YXRlVGFyZ2V0LlNFUlZFUikgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IChuZXcgVXBkYXRlQ29udGVudFN0YXRlQXBpSGFuZGxlcih0aGlzLm5ldHdvcmtRdWV1ZSwgdGhpcy5zZGtDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFuZGxlKENvdXJzZVV0aWwuZ2V0VXBkYXRlQ29udGVudFN0YXRlUmVxdWVzdChyZXF1ZXN0KSkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnRhcmdldCEuaW5kZXhPZihVcGRhdGVDb250ZW50U3RhdGVUYXJnZXQuTE9DQUwpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBvZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlci5tYW5pcHVsYXRlRW5yb2xsZWRDb3Vyc2VzUmVzcG9uc2VMb2NhbGx5KHJlcXVlc3QpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIGF3YWl0IG9mZmxpbmVDb250ZW50U3RhdGVIYW5kbGVyLm1hbmlwdWxhdGVHZXRDb250ZW50U3RhdGVSZXNwb25zZUxvY2FsbHkocmVxdWVzdCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDb3Vyc2VCYXRjaGVzKHJlcXVlc3Q6IENvdXJzZUJhdGNoZXNSZXF1ZXN0KTogT2JzZXJ2YWJsZTxCYXRjaFtdPiB7XG4gICAgICAgIHJldHVybiBuZXcgR2V0Q291cnNlQmF0Y2hlc0hhbmRsZXIodGhpcy5hcGlTZXJ2aWNlLCB0aGlzLmNvdXJzZVNlcnZpY2VDb25maWcpLmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBnZXRFbnJvbGxlZENvdXJzZXMoXG4gICAgICAgIHJlcXVlc3Q6IEZldGNoRW5yb2xsZWRDb3Vyc2VSZXF1ZXN0LFxuICAgICAgICBhcGlIYW5kbGVyPzogQXBpUmVxdWVzdEhhbmRsZXI8eyB1c2VySWQ6IHN0cmluZyB9LCBHZXRFbnJvbGxlZENvdXJzZVJlc3BvbnNlPlxuICAgICk6IE9ic2VydmFibGU8Q291cnNlW10+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZXRFbnJvbGxlZENvdXJzZUhhbmRsZXIoXG4gICAgICAgICAgICB0aGlzLmtleVZhbHVlU3RvcmUsIHRoaXMuYXBpU2VydmljZSwgdGhpcy5jb3Vyc2VTZXJ2aWNlQ29uZmlnLCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLCBhcGlIYW5kbGVyXG4gICAgICAgICkuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldFVzZXJFbnJvbGxlZENvdXJzZXMoe3JlcXVlc3QsIGZyb219OiBHZXRVc2VyRW5yb2xsZWRDb3Vyc2VzUmVxdWVzdCk6IE9ic2VydmFibGU8Q291cnNlW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkSXRlbVN0b3JlW2Zyb20gPT09IENhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbS5TRVJWRVIgPyAnZ2V0JyA6ICdnZXRDYWNoZWQnXShcbiAgICAgICAgICAgIHJlcXVlc3QudXNlcklkICsgKHJlcXVlc3QuZmlsdGVycyA/ICdfJyArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuZmlsdGVycykgOiAnJyksXG4gICAgICAgICAgICBDb3Vyc2VTZXJ2aWNlSW1wbC5VU0VSX0VOUk9MTE1FTlRfTElTVF9LRVlfUFJFRklYLFxuICAgICAgICAgICAgJ3R0bF8nICsgQ291cnNlU2VydmljZUltcGwuVVNFUl9FTlJPTExNRU5UX0xJU1RfS0VZX1BSRUZJWCxcbiAgICAgICAgICAgICgpID0+IHRoaXMuY3NDb3Vyc2VTZXJ2aWNlLmdldFVzZXJFbnJvbGxlZENvdXJzZXMocmVxdWVzdCwge30sIHthcGlQYXRoOiAnL2FwaS9jb3Vyc2UvdjInLCBjZXJ0UmVnaXN0cmF0aW9uQXBpUGF0aDogJyd9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBlbnJvbGxDb3Vyc2UocmVxdWVzdDogRW5yb2xsQ291cnNlUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IEVucm9sbENvdXJzZUhhbmRsZXIodGhpcy5hcGlTZXJ2aWNlLCB0aGlzLmNvdXJzZVNlcnZpY2VDb25maWcpXG4gICAgICAgICAgICAuaGFuZGxlKHJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoaXNFbnJvbGxlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbnJvbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291cnNlQ29udGV4dDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlQ29udGV4dFsndXNlcklkJ10gPSByZXF1ZXN0LnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZUNvbnRleHRbJ2JhdGNoU3RhdHVzJ10gPSByZXF1ZXN0LmJhdGNoU3RhdHVzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQ29udGVudEtleXMuQ09VUlNFX0NPTlRFWFQsIEpTT04uc3RyaW5naWZ5KGNvdXJzZUNvbnRleHQpKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5KDIwMDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEVucm9sbGVkQ291cnNlcyh7dXNlcklkOiByZXF1ZXN0LnVzZXJJZCwgcmV0dXJuRnJlc2hDb3Vyc2VzOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8oaXNFbnJvbGxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoaXNFbnJvbGxlZCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudFN0YXRlKHJlcXVlc3Q6IEdldENvbnRlbnRTdGF0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnRTdGF0ZVJlc3BvbnNlIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IGtleSA9IENvdXJzZVNlcnZpY2VJbXBsLkdFVF9DT05URU5UX1NUQVRFX0tFWV9QUkVGSVguY29uY2F0KHJlcXVlc3QudXNlcklkLCByZXF1ZXN0LmNvdXJzZUlkKTtcbiAgICAgICAgY29uc3Qgb2ZmbGluZWNvbnRlbnRTdGF0ZUhhbmRsZXIgPSBuZXcgT2ZmbGluZUNvbnRlbnRTdGF0ZUhhbmRsZXIodGhpcy5rZXlWYWx1ZVN0b3JlKTtcbiAgICAgICAgY29uc3QgdXBkYXRlQ291cnNlSGFuZGxlcjogVXBkYXRlRW5yb2xsZWRDb3Vyc2VzSGFuZGxlciA9XG4gICAgICAgICAgICBuZXcgVXBkYXRlRW5yb2xsZWRDb3Vyc2VzSGFuZGxlcih0aGlzLmtleVZhbHVlU3RvcmUsIG9mZmxpbmVjb250ZW50U3RhdGVIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5VmFsdWVTdG9yZS5nZXRWYWx1ZShrZXkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgodmFsdWU/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCByZXF1ZXN0LnJldHVyblJlZnJlc2hlZENvbnRlbnRTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2V0Q29udGVudFN0YXRlSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmhhbmRsZShyZXF1ZXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtleVZhbHVlU3RvcmUuc2V0VmFsdWUoa2V5LCBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZmZsaW5lY29udGVudFN0YXRlSGFuZGxlci5nZXRMb2NhbENvbnRlbnRTdGF0ZVJlc3BvbnNlKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZUNvdXJzZUhhbmRsZXIudXBkYXRlRW5yb2xsQ291cnNlcyhyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZjxDb250ZW50U3RhdGVSZXNwb25zZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2ZmbGluZWNvbnRlbnRTdGF0ZUhhbmRsZXIuZ2V0TG9jYWxDb250ZW50U3RhdGVSZXNwb25zZShyZXF1ZXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlQ291cnNlSGFuZGxlci51cGRhdGVFbnJvbGxDb3Vyc2VzKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZmZsaW5lY29udGVudFN0YXRlSGFuZGxlci5nZXRMb2NhbENvbnRlbnRTdGF0ZVJlc3BvbnNlKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgdW5lbnJvbGxDb3Vyc2UodW5lbnJvbGxDb3Vyc2VSZXF1ZXN0OiBVbmVucm9sbENvdXJzZVJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBVbmVucm9sbENvdXJzZUhhbmRsZXIodGhpcy5hcGlTZXJ2aWNlLCB0aGlzLmNvdXJzZVNlcnZpY2VDb25maWcpLmhhbmRsZSh1bmVucm9sbENvdXJzZVJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkZWxheSgyMDAwKSxcbiAgICAgICAgICAgICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnJvbGxlZENvdXJzZXMoe3VzZXJJZDogdW5lbnJvbGxDb3Vyc2VSZXF1ZXN0LnVzZXJJZCwgcmV0dXJuRnJlc2hDb3Vyc2VzOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwVG8odHJ1ZSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvd25sb2FkQ3VycmVudFByb2ZpbGVDb3Vyc2VDZXJ0aWZpY2F0ZShyZXF1ZXN0OiBHZXRDZXJ0aWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvZmlsZSA9IChhd2FpdCB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkudG9Qcm9taXNlKCkpO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gYWN0aXZlUHJvZmlsZS5tYW5hZ2VkU2Vzc2lvbiA/IGFjdGl2ZVByb2ZpbGUubWFuYWdlZFNlc3Npb24udWlkIDogYWN0aXZlUHJvZmlsZS51aWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJykgPyBjb3Jkb3ZhLmZpbGUuZG9jdW1lbnRzRGlyZWN0b3J5IDogY29yZG92YS5maWxlLmV4dGVybmFsUm9vdERpcmVjdG9yeTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYCR7Zm9sZGVyUGF0aH1Eb3dubG9hZC8ke3JlcXVlc3QuY2VydGlmaWNhdGUubmFtZX1fJHtyZXF1ZXN0LmNvdXJzZUlkfV8ke3VzZXJJZH0ucGRmYDtcbiAgICAgICAgICAgIHJldHVybiB7dXNlcklkfTtcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKCh7dXNlcklkfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25DZXJ0aWZpY2F0ZVJlcXVlc3QgPSBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QT1NUKVxuICAgICAgICAgICAgICAgICAgICAud2l0aFBhdGgoQ291cnNlU2VydmljZUltcGwuQ0VSVElGSUNBVEVfU0lHTl9FTkRQT0lOVClcbiAgICAgICAgICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgICAgICAgICAud2l0aFVzZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgICAgICAgICAud2l0aEJvZHkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBkZlVybDogcmVxdWVzdC5jZXJ0aWZpY2F0ZS51cmwhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZmV0Y2g8eyByZXN1bHQ6IHsgc2lnbmVkVXJsOiBzdHJpbmcgfSB9PihzaWduQ2VydGlmaWNhdGVSZXF1ZXN0KVxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduZWRQZGZVcmw6IHJlc3BvbnNlLmJvZHkucmVzdWx0LnNpZ25lZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCh7c2lnbmVkUGRmVXJsLCB1c2VySWR9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRSZXF1ZXN0OiBFbnF1ZXVlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJpOiBzaWduZWRQZGZVcmwsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXF1ZXN0LmNlcnRpZmljYXRlLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgICAgIG1pbWVUeXBlOiAnYXBwbGljYXRpb24vcGRmJyxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluRG93bmxvYWRzVWk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblZpc2liaWxpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uSW5FeHRlcm5hbFB1YmxpY0Rpcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyVHlwZTogJ0Rvd25sb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlBhdGg6IGAvJHtyZXF1ZXN0LmNlcnRpZmljYXRlLm5hbWV9XyR7cmVxdWVzdC5jb3Vyc2VJZH1fJHt1c2VySWR9LnBkZmBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTWFuYWdlci5lbnF1ZXVlKGRvd25sb2FkUmVxdWVzdCwgKGVyciwgaWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pIGFzIE9ic2VydmFibGU8c3RyaW5nPjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGRvd25sb2FkSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnZhbCgxMDAwKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxFbnF1ZXVlZEVudHJ5PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZE1hbmFnZXIucXVlcnkoe2lkczogW2Rvd25sb2FkSWRdfSwgKGVyciwgZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciB8fCAoZW50cmllc1swXS5zdGF0dXMgPT09IERvd25sb2FkU3RhdHVzLlNUQVRVU19GQUlMRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVyciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5uZXh0KGVudHJpZXNbMF0hIGFzIEVucXVldWVkRW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChlbnRyeTogRW5xdWV1ZWRFbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSBEb3dubG9hZFN0YXR1cy5TVEFUVVNfU1VDQ0VTU0ZVTCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoZW50cnkpID0+ICh7cGF0aDogZW50cnkubG9jYWxVcml9KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzQ2FwdHVyZWRBc3Nlc3NtZW50RXZlbnQoe2NvdXJzZUNvbnRleHR9OiB7IGNvdXJzZUNvbnRleHQ6IGFueSB9KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IE9iamVjdFV0aWwudG9PcmRlcmVkU3RyaW5nKGNvdXJzZUNvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiAhIXRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV07XG4gICAgfVxuXG4gICAgcHVibGljIGNhcHR1cmVBc3Nlc3NtZW50RXZlbnQoe2V2ZW50LCBjb3Vyc2VDb250ZXh0fSkge1xuICAgICAgICBjb25zdCBrZXkgPSBPYmplY3RVdGlsLnRvT3JkZXJlZFN0cmluZyhjb3Vyc2VDb250ZXh0KTtcblxuICAgICAgICBpZiAoIXRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0hLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzeW5jQXNzZXNzbWVudEV2ZW50cyhvcHRpb25zID0ge3BlcnNpc3RlZE9ubHk6IGZhbHNlfSk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIGxldCBjYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMgPSB7fTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMucGVyc2lzdGVkT25seSkge1xuICAgICAgICAgICAgY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzID0gdGhpcy5jYXB0dXJlZEFzc2Vzc21lbnRFdmVudHM7XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRDYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9mZmxpbmVBc3Nlc3NtZW50U2NvcmVQcm9jZXNzb3IucHJvY2VzcyhjYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNBc3Nlc3NtZW50RXZlbnRzSGFuZGxlci5oYW5kbGUoXG4gICAgICAgICAgICBjYXB0dXJlZEFzc2Vzc21lbnRFdmVudHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXRDYXB0dXJlZEFzc2Vzc21lbnRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVBc3Nlc3NtZW50QXR0ZW1wdElkKHJlcXVlc3Q6IEdlbmVyYXRlQXR0ZW1wdElkUmVxdWVzdCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBNRDUoXG4gICAgICAgICAgICBbcmVxdWVzdC5jb3Vyc2VJZCwgcmVxdWVzdC5iYXRjaElkLCByZXF1ZXN0LmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnVzZXJJZCwgcmVxdWVzdC5kYXRlID8gcmVxdWVzdC5kYXRlIDogRGF0ZS5ub3coKV0uam9pbignLScpXG4gICAgICAgICkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5RGlzY3Vzc2lvbkZvcnVtKHJlcXVlc3Q6IERpc3BsYXlEaXNjdXNzaW9uRm9ydW1SZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgdGhpcy5hdXRoU2VydmljZS5nZXRTZXNzaW9uKCkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBzZXNzaW9uLm1hbmFnZWRfYWNjZXNzX3Rva2VuIHx8IHNlc3Npb24uYWNjZXNzX3Rva2VuO1xuXG4gICAgICAgICAgICBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuKFxuICAgICAgICAgICAgICAgIENvdXJzZVNlcnZpY2VJbXBsLmJ1aWxkVXJsKHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZy5ob3N0LCBDb3Vyc2VTZXJ2aWNlSW1wbC5ESVNDVVNTSU9OX0ZPUlVNX0VORFBPSU5ULCB7XG4gICAgICAgICAgICAgICAgICAgICdhY2Nlc3NfdG9rZW4nOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgJ3JldHVyblRvJzogYC9jYXRlZ29yeS8ke3JlcXVlc3QuZm9ydW1JZH1gXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgJ19ibGFuaycsXG4gICAgICAgICAgICAgICAgJ3pvb209bm8sY2xlYXJjYWNoZT15ZXMsY2xlYXJzZXNzaW9uY2FjaGU9eWVzLGNsZWFyZGF0YT15ZXMsaGlkZXVybGJhcj15ZXMsaGlkZW5hdmlnYXRpb25idXR0b25zPXRydWUnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGVhcm5lckNlcnRpZmljYXRlcyhyZXF1ZXN0OiBHZXRMZWFybmVyQ2VyaWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPHsgY291bnQ6IG51bWJlciwgY29udGVudDogTGVhcm5lckNlcnRpZmljYXRlW10gfT4ge1xuICAgICAgICByZXR1cm4gbmV3IEdldExlYXJuZXJDZXJ0aWZpY2F0ZUhhbmRsZXIodGhpcy5hcGlTZXJ2aWNlLCB0aGlzLmNhY2hlZEl0ZW1TdG9yZSkuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIHN5bmNDb3Vyc2VQcm9ncmVzcyhyZXF1ZXN0OiBVcGRhdGVDb3Vyc2VDb250ZW50U3RhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxVcGRhdGVDb250ZW50U3RhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jc0NvdXJzZVNlcnZpY2UudXBkYXRlQ29udGVudFN0YXRlKHJlcXVlc3QsIHthcGlQYXRoOiAnL2FwaS9jb3Vyc2UvdjEnfSk7XG4gICAgfVxuXG4gICAgY2xlYXJBc3Nlc3NtZW50cygpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoQ29udGVudEtleXMuQ09VUlNFX0NPTlRFWFQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPyBKU09OLnBhcnNlKHZhbHVlKSA6IHt9O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0VXRpbC50b09yZGVyZWRTdHJpbmcocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdHVyZWRBc3Nlc3NtZW50RXZlbnRzW2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==