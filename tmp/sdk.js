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
import { ApiServiceImpl } from './api';
import { DbCordovaService } from './db/impl/db-cordova-service';
import { TelemetryDecoratorImpl } from './telemetry/impl/decorator-impl';
import { TelemetryServiceImpl } from './telemetry/impl/telemetry-service-impl';
import { AuthServiceImpl } from './auth/impl/auth-service-impl';
import { CourseServiceImpl } from './course';
import { FrameworkServiceImpl, FrameworkUtilServiceImpl } from './framework';
import { ContentServiceImpl } from './content/impl/content-service-impl';
import { ProfileServiceImpl } from './profile';
import { KeyValueStoreImpl } from './key-value-store/impl/key-value-store-impl';
import { FormServiceImpl } from './form/impl/form-service-impl';
import { CachedItemStoreImpl } from './key-value-store/impl/cached-item-store-impl';
import { PageAssembleServiceImpl } from './page/impl/page-assemble-service-impl';
import { SharedPreferencesLocalStorage } from './util/shared-preferences/impl/shared-preferences-local-storage';
import { SharedPreferencesAndroid } from './util/shared-preferences/impl/shared-preferences-android';
import { FileServiceImpl } from './util/file/impl/file-service-impl';
import { ProfileSyllabusMigration } from './db/migrations/profile-syllabus-migration';
import { GroupProfileMigration } from './db/migrations/group-profile-migration';
import { MillisecondsToSecondsMigration } from './db/migrations/milliseconds-to-seconds-migration';
import { ErrorStackMigration } from './db/migrations/error-stack-migration';
import { FrameworkMigration } from './db/migrations/framework-migration';
import { ContentMarkerMigration } from './db/migrations/content-marker-migration';
import { SystemSettingsServiceImpl } from './system-settings';
import { ZipServiceImpl } from './util/zip/impl/zip-service-impl';
import { DeviceInfoImpl } from './util/device/impl/device-info-impl';
import { ContentFeedbackServiceImpl } from './content/impl/content-feedback-service-impl';
import { EventsBusServiceImpl } from './events-bus/impl/events-bus-service-impl';
import { SummarizerServiceImpl } from './summarizer';
import { DownloadServiceImpl } from './util/download/impl/download-service-impl';
import { AppInfoImpl } from './util/app/impl/app-info-impl';
import { PlayerServiceImpl } from './player';
import { OfflineSearchTextbookMigration } from './db/migrations/offline-search-textbook-migration';
import { Container } from 'inversify';
import { CsInjectionTokens, InjectionTokens } from './injection-tokens';
import { StorageServiceImpl } from './storage/impl/storage-service-impl';
import { NotificationServiceImpl } from './notification/impl/notification-service-impl';
import { ErrorLoggerServiceImpl } from './error/impl/error-logger-service-impl';
import { NetworkInfoServiceImpl } from './util/network/impl/network-info-service-impl';
import { SearchHistoryMigration } from './db/migrations/search-history-migration';
import { SearchHistoryServiceImpl } from './util/search-history/impl/search-history-service-impl';
import { RecentlyViewedMigration } from './db/migrations/recently-viewed-migration';
import { CourseAssessmentMigration } from './db/migrations/course-assessment-migration';
import { CodePUshExperimentServiceImpl } from './codepush-experiment';
import { FaqServiceImpl } from './faq';
import { DeviceRegisterServiceImpl } from './device-register';
import { combineLatest } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ArchiveServiceImpl } from './archive/impl/archive-service-impl';
import { NetworkQueueMigration } from './db/migrations/network-queue-migration';
import { NetworkQueueImpl } from './api/network-queue/impl/network-queue-impl';
import { CsModule } from '@project-sunbird/client-services';
import * as SHA1 from 'crypto-js/sha1';
import { GroupServiceImpl } from './group/impl/group-service-impl';
import { GroupServiceDeprecatedImpl } from './group-deprecated/impl/group-service-deprecated-impl';
import { ContentGeneralizationMigration } from './db/migrations/content-generalization-migration';
import { DiscussionServiceImpl } from './discussion/impl/discussion-service.impl';
import { SegmentationServiceImpl } from './segmentation';
import { DebuggingServiceImpl } from './debugging';
import { NotificationServiceV2Impl } from './notification-v2/impl/notification-service-v2-impl';
import { PlayerConfigDataMigrations } from './db/migrations/player-config-data-migrations';
import { CertificatePublicKeyMigration } from './db/migrations/certificate-public-key-migration';
import { CertificateServiceImpl } from './certificate';
var SunbirdSdk = /** @class */ (function () {
    function SunbirdSdk() {
        this._isInitialised = false;
    }
    Object.defineProperty(SunbirdSdk, "instance", {
        get: function () {
            if (!SunbirdSdk._instance) {
                SunbirdSdk._instance = new SunbirdSdk();
            }
            return SunbirdSdk._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "isInitialised", {
        get: function () {
            return this._isInitialised;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "sdkConfig", {
        get: function () {
            return this._container.get(InjectionTokens.SDK_CONFIG);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "appInfo", {
        get: function () {
            return this._container.get(InjectionTokens.APP_INFO);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "pageAssembleService", {
        get: function () {
            return this._container.get(InjectionTokens.PAGE_ASSEMBLE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "dbService", {
        get: function () {
            return this._container.get(InjectionTokens.DB_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "telemetryService", {
        get: function () {
            return this._container.get(InjectionTokens.TELEMETRY_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "authService", {
        get: function () {
            return this._container.get(InjectionTokens.AUTH_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "apiService", {
        get: function () {
            return this._container.get(InjectionTokens.API_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "keyValueStore", {
        get: function () {
            return this._container.get(InjectionTokens.KEY_VALUE_STORE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "profileService", {
        get: function () {
            return this._container.get(InjectionTokens.PROFILE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "groupService", {
        get: function () {
            return this._container.get(InjectionTokens.GROUP_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "groupServiceDeprecated", {
        get: function () {
            return this._container.get(InjectionTokens.GROUP_SERVICE_DEPRECATED);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "contentService", {
        get: function () {
            return this._container.get(InjectionTokens.CONTENT_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "contentFeedbackService", {
        get: function () {
            return this._container.get(InjectionTokens.CONTENT_FEEDBACK_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "courseService", {
        get: function () {
            return this._container.get(InjectionTokens.COURSE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "formService", {
        get: function () {
            return this._container.get(InjectionTokens.FORM_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "frameworkService", {
        get: function () {
            return this._container.get(InjectionTokens.FRAMEWORK_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "frameworkUtilService", {
        get: function () {
            return this._container.get(InjectionTokens.FRAMEWORK_UTIL_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "sharedPreferences", {
        get: function () {
            return this._container.get(InjectionTokens.SHARED_PREFERENCES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "systemSettingsService", {
        get: function () {
            return this._container.get(InjectionTokens.SYSTEM_SETTINGS_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "eventsBusService", {
        get: function () {
            return this._container.get(InjectionTokens.EVENTS_BUS_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "summarizerService", {
        get: function () {
            return this._container.get(InjectionTokens.SUMMARIZER_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "downloadService", {
        get: function () {
            return this._container.get(InjectionTokens.DOWNLOAD_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "playerService", {
        get: function () {
            return this._container.get(InjectionTokens.PLAYER_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "deviceInfo", {
        get: function () {
            return this._container.get(InjectionTokens.DEVICE_INFO);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "storageService", {
        get: function () {
            return this._container.get(InjectionTokens.STORAGE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "notificationService", {
        get: function () {
            return this._container.get(InjectionTokens.NOTIFICATION_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "errorLoggerService", {
        get: function () {
            return this._container.get(InjectionTokens.ERROR_LOGGER_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "networkInfoService", {
        get: function () {
            return this._container.get(InjectionTokens.NETWORKINFO_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "searchHistoryService", {
        get: function () {
            return this._container.get(InjectionTokens.SEARCH_HISTORY_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "codePushExperimentService", {
        get: function () {
            return this._container.get(InjectionTokens.CODEPUSH_EXPERIMENT_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "faqService", {
        get: function () {
            return this._container.get(InjectionTokens.FAQ_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "deviceRegisterService", {
        get: function () {
            return this._container.get(InjectionTokens.DEVICE_REGISTER_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "archiveService", {
        get: function () {
            return this._container.get(InjectionTokens.ARCHIVE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "networkQueueService", {
        get: function () {
            return this._container.get(InjectionTokens.NETWORK_QUEUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "discussionService", {
        get: function () {
            return this._container.get(InjectionTokens.DISCUSSION_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "segmentationService", {
        get: function () {
            return this._container.get(InjectionTokens.SEGMENTATION_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "debuggingService", {
        get: function () {
            return this._container.get(InjectionTokens.DEBUGGING_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "notificationServiceV2", {
        get: function () {
            return this._container.get(InjectionTokens.NOTIFICATION_SERVICE_V2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SunbirdSdk.prototype, "certificateService", {
        get: function () {
            return this._container.get(InjectionTokens.CERTIFICATE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    SunbirdSdk.prototype.init = function (sdkConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var sharedPreferences;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._container = new Container();
                        this._container.bind(InjectionTokens.CONTAINER).toConstantValue(this._container);
                        this._container.bind(InjectionTokens.DB_VERSION).toConstantValue(31);
                        this._container.bind(InjectionTokens.DB_MIGRATION_LIST).toConstantValue([
                            new ProfileSyllabusMigration(),
                            new GroupProfileMigration(),
                            new MillisecondsToSecondsMigration(),
                            new ContentMarkerMigration(),
                            new OfflineSearchTextbookMigration(),
                            new ErrorStackMigration(),
                            new SearchHistoryMigration(),
                            new RecentlyViewedMigration(),
                            new CourseAssessmentMigration(),
                            function () {
                                return new NetworkQueueMigration(sdkConfig, _this._container.get(InjectionTokens.NETWORK_QUEUE));
                            },
                            new ContentGeneralizationMigration(),
                            new PlayerConfigDataMigrations(),
                            new CertificatePublicKeyMigration(),
                            new FrameworkMigration()
                        ]);
                        switch (sdkConfig.platform) {
                            case 'cordova':
                                this._container.bind(InjectionTokens.SHARED_PREFERENCES)
                                    .to(SharedPreferencesAndroid).inSingletonScope();
                                break;
                            case 'web':
                                this._container.bind(InjectionTokens.SHARED_PREFERENCES)
                                    .to(SharedPreferencesLocalStorage).inSingletonScope();
                                break;
                            default:
                                throw new Error('FATAL_ERROR: Invalid platform');
                        }
                        this._container.bind(InjectionTokens.DB_SERVICE).to(DbCordovaService).inSingletonScope();
                        this._container.bind(InjectionTokens.FILE_SERVICE).to(FileServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.SDK_CONFIG).toConstantValue(sdkConfig);
                        this._container.bind(InjectionTokens.DEVICE_INFO).to(DeviceInfoImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.EVENTS_BUS_SERVICE).to(EventsBusServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.APP_INFO).to(AppInfoImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.API_SERVICE).to(ApiServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.AUTH_SERVICE).to(AuthServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.KEY_VALUE_STORE).to(KeyValueStoreImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.SYSTEM_SETTINGS_SERVICE)
                            .to(SystemSettingsServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.FRAMEWORK_SERVICE).to(FrameworkServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.PROFILE_SERVICE).to(ProfileServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.GROUP_SERVICE).to(GroupServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.GROUP_SERVICE_DEPRECATED).to(GroupServiceDeprecatedImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.ERROR_LOGGER_SERVICE).to(ErrorLoggerServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.ZIP_SERVICE).to(ZipServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.TELEMETRY_SERVICE).to(TelemetryServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.CONTENT_FEEDBACK_SERVICE)
                            .to(ContentFeedbackServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.FORM_SERVICE).to(FormServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.PAGE_ASSEMBLE_SERVICE).to(PageAssembleServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.FRAMEWORK_UTIL_SERVICE).to(FrameworkUtilServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.DOWNLOAD_SERVICE).to(DownloadServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.CONTENT_SERVICE).to(ContentServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.COURSE_SERVICE).to(CourseServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.SUMMARIZER_SERVICE).to(SummarizerServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.PLAYER_SERVICE).to(PlayerServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.CACHED_ITEM_STORE).to(CachedItemStoreImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.TELEMETRY_DECORATOR).to(TelemetryDecoratorImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.STORAGE_SERVICE).to(StorageServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.NOTIFICATION_SERVICE).to(NotificationServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.NETWORKINFO_SERVICE).to(NetworkInfoServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.SEARCH_HISTORY_SERVICE).to(SearchHistoryServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.CODEPUSH_EXPERIMENT_SERVICE).to(CodePUshExperimentServiceImpl)
                            .inSingletonScope();
                        this._container.bind(InjectionTokens.DEVICE_REGISTER_SERVICE).to(DeviceRegisterServiceImpl)
                            .inSingletonScope();
                        this._container.bind(InjectionTokens.FAQ_SERVICE).to(FaqServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.ARCHIVE_SERVICE).to(ArchiveServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.NETWORK_QUEUE).to(NetworkQueueImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.DISCUSSION_SERVICE).to(DiscussionServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.SEGMENTATION_SERVICE).to(SegmentationServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.DEBUGGING_SERVICE).to(DebuggingServiceImpl).inSingletonScope();
                        this._container.bind(InjectionTokens.NOTIFICATION_SERVICE_V2).to(NotificationServiceV2Impl).inSingletonScope();
                        this._container.bind(InjectionTokens.CERTIFICATE_SERVICE).to(CertificateServiceImpl).inSingletonScope();
                        sharedPreferences = this.sharedPreferences;
                        return [4 /*yield*/, CsModule.instance.init({
                                core: {
                                    httpAdapter: sdkConfig.platform === 'web' ? 'HttpClientBrowserAdapter' : 'HttpClientCordovaAdapter',
                                    global: {
                                        channelId: sdkConfig.apiConfig.api_authentication.channelId,
                                        producerId: sdkConfig.apiConfig.api_authentication.producerId,
                                        deviceId: SHA1(window.device.uuid).toString()
                                    },
                                    api: {
                                        host: sdkConfig.apiConfig.host,
                                        authentication: {}
                                    }
                                },
                                services: {
                                    contentServiceConfig: {
                                        hierarchyApiPath: '/api/questionset/v2',
                                        questionListApiPath: '/api/question/v2'
                                    },
                                    courseServiceConfig: {
                                        apiPath: '/api/course/v1',
                                        certRegistrationApiPath: '/api/certreg/v2/certs'
                                    },
                                    groupServiceConfig: {
                                        apiPath: '/api/group/v1',
                                        dataApiPath: '/api/data/v1/group',
                                        updateGroupGuidelinesApiPath: '/api/group/membership/v1'
                                    },
                                    userServiceConfig: {
                                        apiPath: '/api/user/v2'
                                    },
                                    formServiceConfig: {
                                        apiPath: '/api/data/v1/form'
                                    },
                                    discussionServiceConfig: {
                                        apiPath: '/discussion'
                                    },
                                    notificationServiceConfig: {
                                        apiPath: '/api/notification/v1/feed'
                                    },
                                    certificateServiceConfig: {
                                        apiPath: sdkConfig.certificateServiceConfig.apiPath,
                                        apiPathLegacy: sdkConfig.certificateServiceConfig.apiPathLegacy,
                                        rcApiPath: sdkConfig.certificateServiceConfig.rcApiPath
                                    },
                                    frameworkServiceConfig: {
                                        apiPath: '/api/framework/v1'
                                    },
                                }
                            }, (function () {
                                _this._container.rebind(CsInjectionTokens.HTTP_SERVICE).toConstantValue(CsModule.instance.httpService);
                                _this._container.rebind(CsInjectionTokens.GROUP_SERVICE).toConstantValue(CsModule.instance.groupService);
                                _this._container.rebind(CsInjectionTokens.COURSE_SERVICE).toConstantValue(CsModule.instance.courseService);
                                _this._container.rebind(CsInjectionTokens.USER_SERVICE).toConstantValue(CsModule.instance.userService);
                                _this._container.rebind(CsInjectionTokens.DISCUSSION_SERVICE).toConstantValue(CsModule.instance.discussionService);
                                _this._container.rebind(CsInjectionTokens.CONTENT_SERVICE).toConstantValue(CsModule.instance.contentService);
                                _this._container.rebind(CsInjectionTokens.NOTIFICATION_SERVICE_V2).toConstantValue(CsModule.instance.notificationService);
                                _this._container.rebind(CsInjectionTokens.CERTIFICATE_SERVICE).toConstantValue(CsModule.instance.certificateService);
                                _this._container.rebind(CsInjectionTokens.FRAMEWORK_SERVICE).toConstantValue(CsModule.instance.frameworkService);
                            }).bind(this), new /** @class */ (function () {
                                function class_1() {
                                }
                                class_1.prototype.setItem = function (key, value) {
                                    return sharedPreferences.putString(key, value).toPromise();
                                };
                                class_1.prototype.getItem = function (key) {
                                    return sharedPreferences.getString(key).toPromise();
                                };
                                return class_1;
                            }()))];
                    case 1:
                        _a.sent();
                        this._container.bind(CsInjectionTokens.HTTP_SERVICE).toConstantValue(CsModule.instance.httpService);
                        this._container.bind(CsInjectionTokens.GROUP_SERVICE).toConstantValue(CsModule.instance.groupService);
                        this._container.bind(CsInjectionTokens.COURSE_SERVICE).toConstantValue(CsModule.instance.courseService);
                        this._container.bind(CsInjectionTokens.USER_SERVICE).toConstantValue(CsModule.instance.userService);
                        this._container.bind(CsInjectionTokens.DISCUSSION_SERVICE).toConstantValue(CsModule.instance.discussionService);
                        this._container.bind(CsInjectionTokens.CONTENT_SERVICE).toConstantValue(CsModule.instance.contentService);
                        this._container.bind(CsInjectionTokens.NOTIFICATION_SERVICE_V2).toConstantValue(CsModule.instance.notificationService);
                        this._container.bind(CsInjectionTokens.CERTIFICATE_SERVICE).toConstantValue(CsModule.instance.certificateService);
                        this._container.bind(CsInjectionTokens.FRAMEWORK_SERVICE).toConstantValue(CsModule.instance.frameworkService);
                        return [4 /*yield*/, this.dbService.init()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.appInfo.init()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.preInit().toPromise()];
                    case 4:
                        _a.sent();
                        this._isInitialised = true;
                        this.postInit().subscribe();
                        return [2 /*return*/];
                }
            });
        });
    };
    SunbirdSdk.prototype.updateTelemetryConfig = function (update) {
        for (var key in update) {
            if (update.hasOwnProperty(key)) {
                this.sdkConfig.telemetryConfig[key] = update[key];
            }
        }
    };
    SunbirdSdk.prototype.updateDeviceRegisterConfig = function (update) {
        for (var key in update) {
            if (update.hasOwnProperty(key)) {
                this.sdkConfig.deviceRegisterConfig[key] = update[key];
                if (key === 'fcmToken') {
                    this.telemetryService.resetDeviceRegisterTTL();
                }
            }
        }
    };
    SunbirdSdk.prototype.updateContentServiceConfig = function (update) {
        for (var key in update) {
            if (update.hasOwnProperty(key)) {
                this.sdkConfig.contentServiceConfig[key] = update[key];
            }
        }
    };
    SunbirdSdk.prototype.updatePageServiceConfig = function (update) {
        for (var key in update) {
            if (update.hasOwnProperty(key)) {
                this.sdkConfig.pageServiceConfig[key] = update[key];
            }
        }
    };
    SunbirdSdk.prototype.preInit = function () {
        var _this = this;
        return this.telemetryService.preInit().pipe(concatMap(function () { return _this.frameworkService.preInit().pipe(concatMap(function () { return _this.profileService.preInit(); })); }));
    };
    SunbirdSdk.prototype.postInit = function () {
        return combineLatest([
            this.apiService.onInit(),
            this.authService.onInit(),
            this.summarizerService.onInit(),
            this.errorLoggerService.onInit(),
            this.eventsBusService.onInit(),
            this.downloadService.onInit(),
            this.contentService.onInit(),
            this.storageService.onInit(),
            this.telemetryService.onInit(),
            this.notificationService.onInit()
        ]);
    };
    return SunbirdSdk;
}());
export { SunbirdSdk };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWEsY0FBYyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBTWpELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUU5RCxPQUFPLEVBQWdCLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRTFELE9BQU8sRUFBbUIsb0JBQW9CLEVBQXdCLHdCQUF3QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ25ILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTlELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBRWxGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGlFQUFpRSxDQUFDO0FBQzlHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJEQUEyRCxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUNw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QyxPQUFPLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUNqRCxFQUZlLENBRWYsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sNkJBQVEsR0FBaEI7UUFDSSxPQUFPLGFBQWEsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7U0FDcEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQW5jRCxJQW1jQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpU2VydmljZSwgQXBpU2VydmljZUltcGx9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7RGJTZXJ2aWNlLCBNaWdyYXRpb24sIE1pZ3JhdGlvbkZhY3Rvcnl9IGZyb20gJy4vZGInO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7VGVsZW1ldHJ5RGVjb3JhdG9yLCBUZWxlbWV0cnlTZXJ2aWNlfSBmcm9tICcuL3RlbGVtZXRyeSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuL3Nkay1jb25maWcnO1xuaW1wb3J0IHtEYkNvcmRvdmFTZXJ2aWNlfSBmcm9tICcuL2RiL2ltcGwvZGItY29yZG92YS1zZXJ2aWNlJztcbmltcG9ydCB7VGVsZW1ldHJ5RGVjb3JhdG9ySW1wbH0gZnJvbSAnLi90ZWxlbWV0cnkvaW1wbC9kZWNvcmF0b3ItaW1wbCc7XG5pbXBvcnQge1RlbGVtZXRyeVNlcnZpY2VJbXBsfSBmcm9tICcuL3RlbGVtZXRyeS9pbXBsL3RlbGVtZXRyeS1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHtBdXRoU2VydmljZUltcGx9IGZyb20gJy4vYXV0aC9pbXBsL2F1dGgtc2VydmljZS1pbXBsJztcbmltcG9ydCB7Q29udGVudEZlZWRiYWNrU2VydmljZSwgQ29udGVudFNlcnZpY2UsIENvbnRlbnRTZXJ2aWNlQ29uZmlnfSBmcm9tICcuL2NvbnRlbnQnO1xuaW1wb3J0IHtDb3Vyc2VTZXJ2aWNlLCBDb3Vyc2VTZXJ2aWNlSW1wbH0gZnJvbSAnLi9jb3Vyc2UnO1xuaW1wb3J0IHtGb3JtU2VydmljZX0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7RnJhbWV3b3JrU2VydmljZSwgRnJhbWV3b3JrU2VydmljZUltcGwsIEZyYW1ld29ya1V0aWxTZXJ2aWNlLCBGcmFtZXdvcmtVdGlsU2VydmljZUltcGx9IGZyb20gJy4vZnJhbWV3b3JrJztcbmltcG9ydCB7Q29udGVudFNlcnZpY2VJbXBsfSBmcm9tICcuL2NvbnRlbnQvaW1wbC9jb250ZW50LXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge1Byb2ZpbGVTZXJ2aWNlLCBQcm9maWxlU2VydmljZUltcGx9IGZyb20gJy4vcHJvZmlsZSc7XG5pbXBvcnQge0NhY2hlZEl0ZW1TdG9yZSwgS2V5VmFsdWVTdG9yZX0gZnJvbSAnLi9rZXktdmFsdWUtc3RvcmUnO1xuaW1wb3J0IHtLZXlWYWx1ZVN0b3JlSW1wbH0gZnJvbSAnLi9rZXktdmFsdWUtc3RvcmUvaW1wbC9rZXktdmFsdWUtc3RvcmUtaW1wbCc7XG5pbXBvcnQge0Zvcm1TZXJ2aWNlSW1wbH0gZnJvbSAnLi9mb3JtL2ltcGwvZm9ybS1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge0NhY2hlZEl0ZW1TdG9yZUltcGx9IGZyb20gJy4va2V5LXZhbHVlLXN0b3JlL2ltcGwvY2FjaGVkLWl0ZW0tc3RvcmUtaW1wbCc7XG5pbXBvcnQge1BhZ2VBc3NlbWJsZVNlcnZpY2UsIFBhZ2VTZXJ2aWNlQ29uZmlnfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHtQYWdlQXNzZW1ibGVTZXJ2aWNlSW1wbH0gZnJvbSAnLi9wYWdlL2ltcGwvcGFnZS1hc3NlbWJsZS1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc0xvY2FsU3RvcmFnZX0gZnJvbSAnLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcy9pbXBsL3NoYXJlZC1wcmVmZXJlbmNlcy1sb2NhbC1zdG9yYWdlJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXNBbmRyb2lkfSBmcm9tICcuL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzL2ltcGwvc2hhcmVkLXByZWZlcmVuY2VzLWFuZHJvaWQnO1xuaW1wb3J0IHtGaWxlU2VydmljZUltcGx9IGZyb20gJy4vdXRpbC9maWxlL2ltcGwvZmlsZS1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHtQcm9maWxlU3lsbGFidXNNaWdyYXRpb259IGZyb20gJy4vZGIvbWlncmF0aW9ucy9wcm9maWxlLXN5bGxhYnVzLW1pZ3JhdGlvbic7XG5pbXBvcnQge0dyb3VwUHJvZmlsZU1pZ3JhdGlvbn0gZnJvbSAnLi9kYi9taWdyYXRpb25zL2dyb3VwLXByb2ZpbGUtbWlncmF0aW9uJztcbmltcG9ydCB7TWlsbGlzZWNvbmRzVG9TZWNvbmRzTWlncmF0aW9ufSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvbWlsbGlzZWNvbmRzLXRvLXNlY29uZHMtbWlncmF0aW9uJztcbmltcG9ydCB7RXJyb3JTdGFja01pZ3JhdGlvbn0gZnJvbSAnLi9kYi9taWdyYXRpb25zL2Vycm9yLXN0YWNrLW1pZ3JhdGlvbic7XG5pbXBvcnQge0ZyYW1ld29ya01pZ3JhdGlvbn0gZnJvbSAnLi9kYi9taWdyYXRpb25zL2ZyYW1ld29yay1taWdyYXRpb24nO1xuaW1wb3J0IHtDb250ZW50TWFya2VyTWlncmF0aW9ufSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvY29udGVudC1tYXJrZXItbWlncmF0aW9uJztcbmltcG9ydCB7U3lzdGVtU2V0dGluZ3NTZXJ2aWNlLCBTeXN0ZW1TZXR0aW5nc1NlcnZpY2VJbXBsfSBmcm9tICcuL3N5c3RlbS1zZXR0aW5ncyc7XG5pbXBvcnQge1ppcFNlcnZpY2V9IGZyb20gJy4vdXRpbC96aXAvZGVmL3ppcC1zZXJ2aWNlJztcbmltcG9ydCB7RGV2aWNlSW5mb30gZnJvbSAnLi91dGlsL2RldmljZSc7XG5pbXBvcnQge1ppcFNlcnZpY2VJbXBsfSBmcm9tICcuL3V0aWwvemlwL2ltcGwvemlwLXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge0RldmljZUluZm9JbXBsfSBmcm9tICcuL3V0aWwvZGV2aWNlL2ltcGwvZGV2aWNlLWluZm8taW1wbCc7XG5pbXBvcnQge0NvbnRlbnRGZWVkYmFja1NlcnZpY2VJbXBsfSBmcm9tICcuL2NvbnRlbnQvaW1wbC9jb250ZW50LWZlZWRiYWNrLXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge0V2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge0V2ZW50c0J1c1NlcnZpY2VJbXBsfSBmcm9tICcuL2V2ZW50cy1idXMvaW1wbC9ldmVudHMtYnVzLXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge1N1bW1hcml6ZXJTZXJ2aWNlLCBTdW1tYXJpemVyU2VydmljZUltcGx9IGZyb20gJy4vc3VtbWFyaXplcic7XG5pbXBvcnQge0Rvd25sb2FkU2VydmljZX0gZnJvbSAnLi91dGlsL2Rvd25sb2FkJztcbmltcG9ydCB7RG93bmxvYWRTZXJ2aWNlSW1wbH0gZnJvbSAnLi91dGlsL2Rvd25sb2FkL2ltcGwvZG93bmxvYWQtc2VydmljZS1pbXBsJztcbmltcG9ydCB7QXBwSW5mb30gZnJvbSAnLi91dGlsL2FwcCc7XG5pbXBvcnQge0FwcEluZm9JbXBsfSBmcm9tICcuL3V0aWwvYXBwL2ltcGwvYXBwLWluZm8taW1wbCc7XG5pbXBvcnQge1BsYXllclNlcnZpY2UsIFBsYXllclNlcnZpY2VJbXBsfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQge1RlbGVtZXRyeUNvbmZpZ30gZnJvbSAnLi90ZWxlbWV0cnkvY29uZmlnL3RlbGVtZXRyeS1jb25maWcnO1xuaW1wb3J0IHtPZmZsaW5lU2VhcmNoVGV4dGJvb2tNaWdyYXRpb259IGZyb20gJy4vZGIvbWlncmF0aW9ucy9vZmZsaW5lLXNlYXJjaC10ZXh0Ym9vay1taWdyYXRpb24nO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0NzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge1N0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtTdG9yYWdlU2VydmljZUltcGx9IGZyb20gJy4vc3RvcmFnZS9pbXBsL3N0b3JhZ2Utc2VydmljZS1pbXBsJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlSW1wbH0gZnJvbSAnLi9ub3RpZmljYXRpb24vaW1wbC9ub3RpZmljYXRpb24tc2VydmljZS1pbXBsJztcbmltcG9ydCB7RXJyb3JMb2dnZXJTZXJ2aWNlfSBmcm9tICcuL2Vycm9yJztcbmltcG9ydCB7RXJyb3JMb2dnZXJTZXJ2aWNlSW1wbH0gZnJvbSAnLi9lcnJvci9pbXBsL2Vycm9yLWxvZ2dlci1zZXJ2aWNlLWltcGwnO1xuaW1wb3J0IHtOZXR3b3JrSW5mb1NlcnZpY2V9IGZyb20gJy4vdXRpbC9uZXR3b3JrJztcbmltcG9ydCB7TmV0d29ya0luZm9TZXJ2aWNlSW1wbH0gZnJvbSAnLi91dGlsL25ldHdvcmsvaW1wbC9uZXR3b3JrLWluZm8tc2VydmljZS1pbXBsJztcbmltcG9ydCB7U2VhcmNoSGlzdG9yeU1pZ3JhdGlvbn0gZnJvbSAnLi9kYi9taWdyYXRpb25zL3NlYXJjaC1oaXN0b3J5LW1pZ3JhdGlvbic7XG5pbXBvcnQge1NlYXJjaEhpc3RvcnlTZXJ2aWNlfSBmcm9tICcuL3V0aWwvc2VhcmNoLWhpc3RvcnknO1xuaW1wb3J0IHtTZWFyY2hIaXN0b3J5U2VydmljZUltcGx9IGZyb20gJy4vdXRpbC9zZWFyY2gtaGlzdG9yeS9pbXBsL3NlYXJjaC1oaXN0b3J5LXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge1JlY2VudGx5Vmlld2VkTWlncmF0aW9ufSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvcmVjZW50bHktdmlld2VkLW1pZ3JhdGlvbic7XG5pbXBvcnQge0NvdXJzZUFzc2Vzc21lbnRNaWdyYXRpb259IGZyb20gJy4vZGIvbWlncmF0aW9ucy9jb3Vyc2UtYXNzZXNzbWVudC1taWdyYXRpb24nO1xuaW1wb3J0IHtDb2RlUHVzaEV4cGVyaW1lbnRTZXJ2aWNlLCBDb2RlUFVzaEV4cGVyaW1lbnRTZXJ2aWNlSW1wbH0gZnJvbSAnLi9jb2RlcHVzaC1leHBlcmltZW50JztcbmltcG9ydCB7RmFxU2VydmljZSwgRmFxU2VydmljZUltcGx9IGZyb20gJy4vZmFxJztcbmltcG9ydCB7RGV2aWNlUmVnaXN0ZXJDb25maWcsIERldmljZVJlZ2lzdGVyU2VydmljZSwgRGV2aWNlUmVnaXN0ZXJTZXJ2aWNlSW1wbH0gZnJvbSAnLi9kZXZpY2UtcmVnaXN0ZXInO1xuaW1wb3J0IHtjb21iaW5lTGF0ZXN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y29uY2F0TWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0FyY2hpdmVTZXJ2aWNlfSBmcm9tICcuL2FyY2hpdmUnO1xuaW1wb3J0IHtBcmNoaXZlU2VydmljZUltcGx9IGZyb20gJy4vYXJjaGl2ZS9pbXBsL2FyY2hpdmUtc2VydmljZS1pbXBsJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlTWlncmF0aW9ufSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvbmV0d29yay1xdWV1ZS1taWdyYXRpb24nO1xuaW1wb3J0IHtOZXR3b3JrUXVldWVJbXBsfSBmcm9tICcuL2FwaS9uZXR3b3JrLXF1ZXVlL2ltcGwvbmV0d29yay1xdWV1ZS1pbXBsJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlfSBmcm9tICcuL2FwaS9uZXR3b3JrLXF1ZXVlJztcbmltcG9ydCB7Q3NNb2R1bGV9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzJztcbmltcG9ydCB7Q3NIdHRwU2VydmljZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvY29yZS9odHRwLXNlcnZpY2UnO1xuaW1wb3J0ICogYXMgU0hBMSBmcm9tICdjcnlwdG8tanMvc2hhMSc7XG5pbXBvcnQge0NzR3JvdXBTZXJ2aWNlfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9ncm91cCc7XG5pbXBvcnQge0NzQ291cnNlU2VydmljZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY291cnNlJztcbmltcG9ydCB7R3JvdXBTZXJ2aWNlfSBmcm9tICcuL2dyb3VwJztcbmltcG9ydCB7R3JvdXBTZXJ2aWNlSW1wbH0gZnJvbSAnLi9ncm91cC9pbXBsL2dyb3VwLXNlcnZpY2UtaW1wbCc7XG5pbXBvcnQge0dyb3VwU2VydmljZURlcHJlY2F0ZWR9IGZyb20gJy4vZ3JvdXAtZGVwcmVjYXRlZCc7XG5pbXBvcnQge0dyb3VwU2VydmljZURlcHJlY2F0ZWRJbXBsfSBmcm9tICcuL2dyb3VwLWRlcHJlY2F0ZWQvaW1wbC9ncm91cC1zZXJ2aWNlLWRlcHJlY2F0ZWQtaW1wbCc7XG5pbXBvcnQge0NzVXNlclNlcnZpY2V9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL3VzZXInO1xuaW1wb3J0IHtDb250ZW50R2VuZXJhbGl6YXRpb25NaWdyYXRpb259IGZyb20gJy4vZGIvbWlncmF0aW9ucy9jb250ZW50LWdlbmVyYWxpemF0aW9uLW1pZ3JhdGlvbic7XG5pbXBvcnQge0NzQ2xpZW50U3RvcmFnZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvY29yZSc7XG5pbXBvcnQgeyBEaXNjdXNzaW9uU2VydmljZSB9IGZyb20gJy4vZGlzY3Vzc2lvbic7XG5pbXBvcnQgeyBEaXNjdXNzaW9uU2VydmljZUltcGwgfSBmcm9tICcuL2Rpc2N1c3Npb24vaW1wbC9kaXNjdXNzaW9uLXNlcnZpY2UuaW1wbCc7XG5pbXBvcnQgeyBDc0Rpc2N1c3Npb25TZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZGlzY3Vzc2lvbic7XG5pbXBvcnQgeyBDc0NvbnRlbnRTZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY29udGVudCc7XG5pbXBvcnQgeyBTZWdtZW50YXRpb25TZXJ2aWNlLCBTZWdtZW50YXRpb25TZXJ2aWNlSW1wbCB9IGZyb20gJy4vc2VnbWVudGF0aW9uJztcbmltcG9ydCB7IERlYnVnZ2luZ1NlcnZpY2UsIERlYnVnZ2luZ1NlcnZpY2VJbXBsIH0gZnJvbSAnLi9kZWJ1Z2dpbmcnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZVYySW1wbCB9IGZyb20gJy4vbm90aWZpY2F0aW9uLXYyL2ltcGwvbm90aWZpY2F0aW9uLXNlcnZpY2UtdjItaW1wbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlVjIgfSBmcm9tICcuL25vdGlmaWNhdGlvbi12Mi9kZWYvbm90aWZpY2F0aW9uLXNlcnZpY2UtdjInO1xuaW1wb3J0IHsgQ3NOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvbm90aWZpY2F0aW9uL2ludGVyZmFjZS9jcy1ub3RpZmljYXRpb24tc2VydmljZSc7XG5pbXBvcnQge1BsYXllckNvbmZpZ0RhdGFNaWdyYXRpb25zfSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvcGxheWVyLWNvbmZpZy1kYXRhLW1pZ3JhdGlvbnMnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGVQdWJsaWNLZXlNaWdyYXRpb24gfSBmcm9tICcuL2RiL21pZ3JhdGlvbnMvY2VydGlmaWNhdGUtcHVibGljLWtleS1taWdyYXRpb24nO1xuaW1wb3J0IHsgQ3NDZXJ0aWZpY2F0ZVNlcnZpY2UgfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jZXJ0aWZpY2F0ZSc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVNlcnZpY2UsIENlcnRpZmljYXRlU2VydmljZUltcGwgfSBmcm9tICcuL2NlcnRpZmljYXRlJztcbmltcG9ydCB7IENzRnJhbWV3b3JrU2VydmljZSB9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL2ZyYW1ld29yay9pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgU3VuYmlyZFNkayB7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBDb250YWluZXI7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U/OiBTdW5iaXJkU2RrO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogU3VuYmlyZFNkayB7XG4gICAgICAgIGlmICghU3VuYmlyZFNkay5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIFN1bmJpcmRTZGsuX2luc3RhbmNlID0gbmV3IFN1bmJpcmRTZGsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTdW5iaXJkU2RrLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc0luaXRpYWxpc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgaXNJbml0aWFsaXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSW5pdGlhbGlzZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHNka0NvbmZpZygpOiBTZGtDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxTZGtDb25maWc+KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKTtcbiAgICB9XG5cbiAgICBnZXQgYXBwSW5mbygpOiBBcHBJbmZvIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8QXBwSW5mbz4oSW5qZWN0aW9uVG9rZW5zLkFQUF9JTkZPKTtcbiAgICB9XG5cbiAgICBnZXQgcGFnZUFzc2VtYmxlU2VydmljZSgpOiBQYWdlQXNzZW1ibGVTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8UGFnZUFzc2VtYmxlU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlBBR0VfQVNTRU1CTEVfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGRiU2VydmljZSgpOiBEYlNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxEYlNlcnZpY2U+KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgdGVsZW1ldHJ5U2VydmljZSgpOiBUZWxlbWV0cnlTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8VGVsZW1ldHJ5U2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlRFTEVNRVRSWV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgYXV0aFNlcnZpY2UoKTogQXV0aFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxBdXRoU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkFVVEhfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGFwaVNlcnZpY2UoKTogQXBpU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PEFwaVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGtleVZhbHVlU3RvcmUoKTogS2V5VmFsdWVTdG9yZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PEtleVZhbHVlU3RvcmU+KEluamVjdGlvblRva2Vucy5LRVlfVkFMVUVfU1RPUkUpO1xuICAgIH1cblxuICAgIGdldCBwcm9maWxlU2VydmljZSgpOiBQcm9maWxlU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PFByb2ZpbGVTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgZ3JvdXBTZXJ2aWNlKCk6IEdyb3VwU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PEdyb3VwU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkdST1VQX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBncm91cFNlcnZpY2VEZXByZWNhdGVkKCk6IEdyb3VwU2VydmljZURlcHJlY2F0ZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxHcm91cFNlcnZpY2VEZXByZWNhdGVkPihJbmplY3Rpb25Ub2tlbnMuR1JPVVBfU0VSVklDRV9ERVBSRUNBVEVEKTtcbiAgICB9XG5cbiAgICBnZXQgY29udGVudFNlcnZpY2UoKTogQ29udGVudFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxDb250ZW50U2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkNPTlRFTlRfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRlbnRGZWVkYmFja1NlcnZpY2UoKTogQ29udGVudEZlZWRiYWNrU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PENvbnRlbnRGZWVkYmFja1NlcnZpY2U+KEluamVjdGlvblRva2Vucy5DT05URU5UX0ZFRURCQUNLX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBjb3Vyc2VTZXJ2aWNlKCk6IENvdXJzZVNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxDb3Vyc2VTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuQ09VUlNFX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBmb3JtU2VydmljZSgpOiBGb3JtU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PEZvcm1TZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRk9STV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgZnJhbWV3b3JrU2VydmljZSgpOiBGcmFtZXdvcmtTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8RnJhbWV3b3JrU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgZnJhbWV3b3JrVXRpbFNlcnZpY2UoKTogRnJhbWV3b3JrVXRpbFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxGcmFtZXdvcmtVdGlsU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19VVElMX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBzaGFyZWRQcmVmZXJlbmNlcygpOiBTaGFyZWRQcmVmZXJlbmNlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PFNoYXJlZFByZWZlcmVuY2VzPihJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKTtcbiAgICB9XG5cbiAgICBnZXQgc3lzdGVtU2V0dGluZ3NTZXJ2aWNlKCk6IFN5c3RlbVNldHRpbmdzU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PFN5c3RlbVNldHRpbmdzU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlNZU1RFTV9TRVRUSU5HU19TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzQnVzU2VydmljZSgpOiBFdmVudHNCdXNTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8RXZlbnRzQnVzU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkVWRU5UU19CVVNfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IHN1bW1hcml6ZXJTZXJ2aWNlKCk6IFN1bW1hcml6ZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8U3VtbWFyaXplclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5TVU1NQVJJWkVSX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBkb3dubG9hZFNlcnZpY2UoKTogRG93bmxvYWRTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8RG93bmxvYWRTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRE9XTkxPQURfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IHBsYXllclNlcnZpY2UoKTogUGxheWVyU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PFBsYXllclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5QTEFZRVJfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGRldmljZUluZm8oKTogRGV2aWNlSW5mbyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PERldmljZUluZm8+KEluamVjdGlvblRva2Vucy5ERVZJQ0VfSU5GTyk7XG4gICAgfVxuXG4gICAgZ2V0IHN0b3JhZ2VTZXJ2aWNlKCk6IFN0b3JhZ2VTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8U3RvcmFnZVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5TVE9SQUdFX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBub3RpZmljYXRpb25TZXJ2aWNlKCk6IE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxOb3RpZmljYXRpb25TZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuTk9USUZJQ0FUSU9OX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBlcnJvckxvZ2dlclNlcnZpY2UoKTogRXJyb3JMb2dnZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8RXJyb3JMb2dnZXJTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRVJST1JfTE9HR0VSX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBuZXR3b3JrSW5mb1NlcnZpY2UoKTogTmV0d29ya0luZm9TZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8TmV0d29ya0luZm9TZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuTkVUV09SS0lORk9fU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IHNlYXJjaEhpc3RvcnlTZXJ2aWNlKCk6IFNlYXJjaEhpc3RvcnlTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8U2VhcmNoSGlzdG9yeVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5TRUFSQ0hfSElTVE9SWV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgY29kZVB1c2hFeHBlcmltZW50U2VydmljZSgpOiBDb2RlUHVzaEV4cGVyaW1lbnRTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8Q29kZVB1c2hFeHBlcmltZW50U2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkNPREVQVVNIX0VYUEVSSU1FTlRfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGZhcVNlcnZpY2UoKTogRmFxU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PEZhcVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5GQVFfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGRldmljZVJlZ2lzdGVyU2VydmljZSgpOiBEZXZpY2VSZWdpc3RlclNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyLmdldDxEZXZpY2VSZWdpc3RlclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5ERVZJQ0VfUkVHSVNURVJfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0IGFyY2hpdmVTZXJ2aWNlKCk6IEFyY2hpdmVTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8QXJjaGl2ZVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5BUkNISVZFX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIGdldCBuZXR3b3JrUXVldWVTZXJ2aWNlKCk6IE5ldHdvcmtRdWV1ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PE5ldHdvcmtRdWV1ZT4oSW5qZWN0aW9uVG9rZW5zLk5FVFdPUktfUVVFVUUpO1xuICAgIH1cblxuICAgIGdldCBkaXNjdXNzaW9uU2VydmljZSgpOiBEaXNjdXNzaW9uU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PERpc2N1c3Npb25TZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRElTQ1VTU0lPTl9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgc2VnbWVudGF0aW9uU2VydmljZSgpOiBTZWdtZW50YXRpb25TZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8U2VnbWVudGF0aW9uU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlNFR01FTlRBVElPTl9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgZGVidWdnaW5nU2VydmljZSgpOiBEZWJ1Z2dpbmdTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5nZXQ8RGVidWdnaW5nU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkRFQlVHR0lOR19TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBnZXQgbm90aWZpY2F0aW9uU2VydmljZVYyKCk6IE5vdGlmaWNhdGlvblNlcnZpY2VWMiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PE5vdGlmaWNhdGlvblNlcnZpY2VWMj4oSW5qZWN0aW9uVG9rZW5zLk5PVElGSUNBVElPTl9TRVJWSUNFX1YyKTtcbiAgICB9XG5cbiAgICBnZXQgY2VydGlmaWNhdGVTZXJ2aWNlKCk6IENlcnRpZmljYXRlU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0PENlcnRpZmljYXRlU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkNFUlRJRklDQVRFX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpbml0KHNka0NvbmZpZzogU2RrQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDb250YWluZXI+KEluamVjdGlvblRva2Vucy5DT05UQUlORVIpLnRvQ29uc3RhbnRWYWx1ZSh0aGlzLl9jb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPG51bWJlcj4oSW5qZWN0aW9uVG9rZW5zLkRCX1ZFUlNJT04pLnRvQ29uc3RhbnRWYWx1ZSgzMSk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8KE1pZ3JhdGlvbiB8IE1pZ3JhdGlvbkZhY3RvcnkpW10+KEluamVjdGlvblRva2Vucy5EQl9NSUdSQVRJT05fTElTVCkudG9Db25zdGFudFZhbHVlKFtcbiAgICAgICAgICAgIG5ldyBQcm9maWxlU3lsbGFidXNNaWdyYXRpb24oKSxcbiAgICAgICAgICAgIG5ldyBHcm91cFByb2ZpbGVNaWdyYXRpb24oKSxcbiAgICAgICAgICAgIG5ldyBNaWxsaXNlY29uZHNUb1NlY29uZHNNaWdyYXRpb24oKSxcbiAgICAgICAgICAgIG5ldyBDb250ZW50TWFya2VyTWlncmF0aW9uKCksXG4gICAgICAgICAgICBuZXcgT2ZmbGluZVNlYXJjaFRleHRib29rTWlncmF0aW9uKCksXG4gICAgICAgICAgICBuZXcgRXJyb3JTdGFja01pZ3JhdGlvbigpLFxuICAgICAgICAgICAgbmV3IFNlYXJjaEhpc3RvcnlNaWdyYXRpb24oKSxcbiAgICAgICAgICAgIG5ldyBSZWNlbnRseVZpZXdlZE1pZ3JhdGlvbigpLFxuICAgICAgICAgICAgbmV3IENvdXJzZUFzc2Vzc21lbnRNaWdyYXRpb24oKSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5ldHdvcmtRdWV1ZU1pZ3JhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgc2RrQ29uZmlnLCB0aGlzLl9jb250YWluZXIuZ2V0PE5ldHdvcmtRdWV1ZT4oSW5qZWN0aW9uVG9rZW5zLk5FVFdPUktfUVVFVUUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXcgQ29udGVudEdlbmVyYWxpemF0aW9uTWlncmF0aW9uKCksXG4gICAgICAgICAgICBuZXcgUGxheWVyQ29uZmlnRGF0YU1pZ3JhdGlvbnMoKSxcbiAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0ZVB1YmxpY0tleU1pZ3JhdGlvbigpLFxuICAgICAgICAgICAgbmV3IEZyYW1ld29ya01pZ3JhdGlvbigpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHN3aXRjaCAoc2RrQ29uZmlnLnBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlICdjb3Jkb3ZhJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxTaGFyZWRQcmVmZXJlbmNlcz4oSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUylcbiAgICAgICAgICAgICAgICAgICAgLnRvKFNoYXJlZFByZWZlcmVuY2VzQW5kcm9pZCkuaW5TaW5nbGV0b25TY29wZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2ViJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxTaGFyZWRQcmVmZXJlbmNlcz4oSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUylcbiAgICAgICAgICAgICAgICAgICAgLnRvKFNoYXJlZFByZWZlcmVuY2VzTG9jYWxTdG9yYWdlKS5pblNpbmdsZXRvblNjb3BlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRkFUQUxfRVJST1I6IEludmFsaWQgcGxhdGZvcm0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPERiU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpLnRvKERiQ29yZG92YVNlcnZpY2UpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxGaWxlU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkZJTEVfU0VSVklDRSkudG8oRmlsZVNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8U2RrQ29uZmlnPihJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykudG9Db25zdGFudFZhbHVlKHNka0NvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8RGV2aWNlSW5mbz4oSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKS50byhEZXZpY2VJbmZvSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPEV2ZW50c0J1c1NlcnZpY2U+KEluamVjdGlvblRva2Vucy5FVkVOVFNfQlVTX1NFUlZJQ0UpLnRvKEV2ZW50c0J1c1NlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8QXBwSW5mbz4oSW5qZWN0aW9uVG9rZW5zLkFQUF9JTkZPKS50byhBcHBJbmZvSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPEFwaVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkudG8oQXBpU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxBdXRoU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkFVVEhfU0VSVklDRSkudG8oQXV0aFNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8S2V5VmFsdWVTdG9yZT4oSW5qZWN0aW9uVG9rZW5zLktFWV9WQUxVRV9TVE9SRSkudG8oS2V5VmFsdWVTdG9yZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxTeXN0ZW1TZXR0aW5nc1NlcnZpY2U+KEluamVjdGlvblRva2Vucy5TWVNURU1fU0VUVElOR1NfU0VSVklDRSlcbiAgICAgICAgICAgIC50byhTeXN0ZW1TZXR0aW5nc1NlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8RnJhbWV3b3JrU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKS50byhGcmFtZXdvcmtTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPFByb2ZpbGVTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKS50byhQcm9maWxlU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxHcm91cFNlcnZpY2U+KEluamVjdGlvblRva2Vucy5HUk9VUF9TRVJWSUNFKS50byhHcm91cFNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8R3JvdXBTZXJ2aWNlRGVwcmVjYXRlZD4oSW5qZWN0aW9uVG9rZW5zLkdST1VQX1NFUlZJQ0VfREVQUkVDQVRFRCkudG8oR3JvdXBTZXJ2aWNlRGVwcmVjYXRlZEltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxFcnJvckxvZ2dlclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5FUlJPUl9MT0dHRVJfU0VSVklDRSkudG8oRXJyb3JMb2dnZXJTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPFppcFNlcnZpY2U+KEluamVjdGlvblRva2Vucy5aSVBfU0VSVklDRSkudG8oWmlwU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxUZWxlbWV0cnlTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuVEVMRU1FVFJZX1NFUlZJQ0UpLnRvKFRlbGVtZXRyeVNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Q29udGVudEZlZWRiYWNrU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkNPTlRFTlRfRkVFREJBQ0tfU0VSVklDRSlcbiAgICAgICAgICAgIC50byhDb250ZW50RmVlZGJhY2tTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPEZvcm1TZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRk9STV9TRVJWSUNFKS50byhGb3JtU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxQYWdlQXNzZW1ibGVTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuUEFHRV9BU1NFTUJMRV9TRVJWSUNFKS50byhQYWdlQXNzZW1ibGVTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPEZyYW1ld29ya1V0aWxTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRlJBTUVXT1JLX1VUSUxfU0VSVklDRSkudG8oRnJhbWV3b3JrVXRpbFNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8RG93bmxvYWRTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuRE9XTkxPQURfU0VSVklDRSkudG8oRG93bmxvYWRTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPENvbnRlbnRTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuQ09OVEVOVF9TRVJWSUNFKS50byhDb250ZW50U2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDb3Vyc2VTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuQ09VUlNFX1NFUlZJQ0UpLnRvKENvdXJzZVNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8U3VtbWFyaXplclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5TVU1NQVJJWkVSX1NFUlZJQ0UpLnRvKFN1bW1hcml6ZXJTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPFBsYXllclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5QTEFZRVJfU0VSVklDRSkudG8oUGxheWVyU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDYWNoZWRJdGVtU3RvcmU+KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkudG8oQ2FjaGVkSXRlbVN0b3JlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPFRlbGVtZXRyeURlY29yYXRvcj4oSW5qZWN0aW9uVG9rZW5zLlRFTEVNRVRSWV9ERUNPUkFUT1IpLnRvKFRlbGVtZXRyeURlY29yYXRvckltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxTdG9yYWdlU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlNUT1JBR0VfU0VSVklDRSkudG8oU3RvcmFnZVNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Tm90aWZpY2F0aW9uU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLk5PVElGSUNBVElPTl9TRVJWSUNFKS50byhOb3RpZmljYXRpb25TZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPE5ldHdvcmtJbmZvU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLk5FVFdPUktJTkZPX1NFUlZJQ0UpLnRvKE5ldHdvcmtJbmZvU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxTZWFyY2hIaXN0b3J5U2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlNFQVJDSF9ISVNUT1JZX1NFUlZJQ0UpLnRvKFNlYXJjaEhpc3RvcnlTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPENvZGVQdXNoRXhwZXJpbWVudFNlcnZpY2U+KEluamVjdGlvblRva2Vucy5DT0RFUFVTSF9FWFBFUklNRU5UX1NFUlZJQ0UpLnRvKENvZGVQVXNoRXhwZXJpbWVudFNlcnZpY2VJbXBsKVxuICAgICAgICAgICAgLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxEZXZpY2VSZWdpc3RlclNlcnZpY2U+KEluamVjdGlvblRva2Vucy5ERVZJQ0VfUkVHSVNURVJfU0VSVklDRSkudG8oRGV2aWNlUmVnaXN0ZXJTZXJ2aWNlSW1wbClcbiAgICAgICAgICAgIC5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8RmFxU2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLkZBUV9TRVJWSUNFKS50byhGYXFTZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPEFyY2hpdmVTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuQVJDSElWRV9TRVJWSUNFKS50byhBcmNoaXZlU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxOZXR3b3JrUXVldWU+KEluamVjdGlvblRva2Vucy5ORVRXT1JLX1FVRVVFKS50byhOZXR3b3JrUXVldWVJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8RGlzY3Vzc2lvblNlcnZpY2U+KEluamVjdGlvblRva2Vucy5ESVNDVVNTSU9OX1NFUlZJQ0UpLnRvKERpc2N1c3Npb25TZXJ2aWNlSW1wbCkuaW5TaW5nbGV0b25TY29wZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPFNlZ21lbnRhdGlvblNlcnZpY2U+KEluamVjdGlvblRva2Vucy5TRUdNRU5UQVRJT05fU0VSVklDRSkudG8oU2VnbWVudGF0aW9uU2VydmljZUltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxEZWJ1Z2dpbmdTZXJ2aWNlPihJbmplY3Rpb25Ub2tlbnMuREVCVUdHSU5HX1NFUlZJQ0UpLnRvKERlYnVnZ2luZ1NlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Tm90aWZpY2F0aW9uU2VydmljZVYyPihJbmplY3Rpb25Ub2tlbnMuTk9USUZJQ0FUSU9OX1NFUlZJQ0VfVjIpLnRvKE5vdGlmaWNhdGlvblNlcnZpY2VWMkltcGwpLmluU2luZ2xldG9uU2NvcGUoKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDZXJ0aWZpY2F0ZVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5DRVJUSUZJQ0FURV9TRVJWSUNFKS50byhDZXJ0aWZpY2F0ZVNlcnZpY2VJbXBsKS5pblNpbmdsZXRvblNjb3BlKCk7XG5cbiAgICAgICAgY29uc3Qgc2hhcmVkUHJlZmVyZW5jZXMgPSB0aGlzLnNoYXJlZFByZWZlcmVuY2VzO1xuXG4gICAgICAgIGF3YWl0IENzTW9kdWxlLmluc3RhbmNlLmluaXQoe1xuICAgICAgICAgICAgICAgIGNvcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgaHR0cEFkYXB0ZXI6IHNka0NvbmZpZy5wbGF0Zm9ybSA9PT0gJ3dlYicgPyAnSHR0cENsaWVudEJyb3dzZXJBZGFwdGVyJyA6ICdIdHRwQ2xpZW50Q29yZG92YUFkYXB0ZXInLFxuICAgICAgICAgICAgICAgICAgICBnbG9iYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZDogc2RrQ29uZmlnLmFwaUNvbmZpZy5hcGlfYXV0aGVudGljYXRpb24uY2hhbm5lbElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjZXJJZDogc2RrQ29uZmlnLmFwaUNvbmZpZy5hcGlfYXV0aGVudGljYXRpb24ucHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZUlkOiBTSEExKHdpbmRvdy5kZXZpY2UudXVpZCkudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhcGk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHNka0NvbmZpZy5hcGlDb25maWcuaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50U2VydmljZUNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHlBcGlQYXRoOiAnL2FwaS9xdWVzdGlvbnNldC92MicsXG4gICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdEFwaVBhdGg6ICcvYXBpL3F1ZXN0aW9uL3YyJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VTZXJ2aWNlQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGlQYXRoOiAnL2FwaS9jb3Vyc2UvdjEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VydFJlZ2lzdHJhdGlvbkFwaVBhdGg6ICcvYXBpL2NlcnRyZWcvdjIvY2VydHMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwU2VydmljZUNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpUGF0aDogJy9hcGkvZ3JvdXAvdjEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFwaVBhdGg6ICcvYXBpL2RhdGEvdjEvZ3JvdXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlR3JvdXBHdWlkZWxpbmVzQXBpUGF0aDogJy9hcGkvZ3JvdXAvbWVtYmVyc2hpcC92MSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXNlclNlcnZpY2VDb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVBhdGg6ICcvYXBpL3VzZXIvdjInXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvcm1TZXJ2aWNlQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGlQYXRoOiAnL2FwaS9kYXRhL3YxL2Zvcm0nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRpc2N1c3Npb25TZXJ2aWNlQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGlQYXRoOiAnL2Rpc2N1c3Npb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2VDb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVBhdGg6ICcvYXBpL25vdGlmaWNhdGlvbi92MS9mZWVkJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0ZVNlcnZpY2VDb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVBhdGg6IHNka0NvbmZpZy5jZXJ0aWZpY2F0ZVNlcnZpY2VDb25maWcuYXBpUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVBhdGhMZWdhY3k6IHNka0NvbmZpZy5jZXJ0aWZpY2F0ZVNlcnZpY2VDb25maWcuYXBpUGF0aExlZ2FjeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJjQXBpUGF0aDogc2RrQ29uZmlnLmNlcnRpZmljYXRlU2VydmljZUNvbmZpZy5yY0FwaVBhdGhcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrU2VydmljZUNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpUGF0aDogJy9hcGkvZnJhbWV3b3JrL3YxJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0h0dHBTZXJ2aWNlPihDc0luamVjdGlvblRva2Vucy5IVFRQX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5odHRwU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0dyb3VwU2VydmljZT4oQ3NJbmplY3Rpb25Ub2tlbnMuR1JPVVBfU0VSVklDRSkudG9Db25zdGFudFZhbHVlKENzTW9kdWxlLmluc3RhbmNlLmdyb3VwU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0NvdXJzZVNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkNPVVJTRV9TRVJWSUNFKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2UuY291cnNlU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc1VzZXJTZXJ2aWNlPihDc0luamVjdGlvblRva2Vucy5VU0VSX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS51c2VyU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0Rpc2N1c3Npb25TZXJ2aWNlPihDc0luamVjdGlvblRva2Vucy5ESVNDVVNTSU9OX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5kaXNjdXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0NvbnRlbnRTZXJ2aWNlPihDc0luamVjdGlvblRva2Vucy5DT05URU5UX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5jb250ZW50U2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc05vdGlmaWNhdGlvblNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLk5PVElGSUNBVElPTl9TRVJWSUNFX1YyKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2Uubm90aWZpY2F0aW9uU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0NlcnRpZmljYXRlU2VydmljZT4oQ3NJbmplY3Rpb25Ub2tlbnMuQ0VSVElGSUNBVEVfU0VSVklDRSkudG9Db25zdGFudFZhbHVlKENzTW9kdWxlLmluc3RhbmNlLmNlcnRpZmljYXRlU2VydmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlYmluZDxDc0ZyYW1ld29ya1NlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2UuZnJhbWV3b3JrU2VydmljZSk7XG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgbmV3IGNsYXNzIGltcGxlbWVudHMgQ3NDbGllbnRTdG9yYWdlIHtcblxuICAgICAgICAgICAgICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhrZXksIHZhbHVlKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhrZXkpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPENzSHR0cFNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkhUVFBfU0VSVklDRSkudG9Db25zdGFudFZhbHVlKENzTW9kdWxlLmluc3RhbmNlLmh0dHBTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Q3NHcm91cFNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkdST1VQX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5ncm91cFNlcnZpY2UpO1xuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDc0NvdXJzZVNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkNPVVJTRV9TRVJWSUNFKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2UuY291cnNlU2VydmljZSk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPENzVXNlclNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLlVTRVJfU0VSVklDRSkudG9Db25zdGFudFZhbHVlKENzTW9kdWxlLmluc3RhbmNlLnVzZXJTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Q3NEaXNjdXNzaW9uU2VydmljZT4oQ3NJbmplY3Rpb25Ub2tlbnMuRElTQ1VTU0lPTl9TRVJWSUNFKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2UuZGlzY3Vzc2lvblNlcnZpY2UpO1xuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDc0NvbnRlbnRTZXJ2aWNlPihDc0luamVjdGlvblRva2Vucy5DT05URU5UX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5jb250ZW50U2VydmljZSk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5iaW5kPENzTm90aWZpY2F0aW9uU2VydmljZT4oQ3NJbmplY3Rpb25Ub2tlbnMuTk9USUZJQ0FUSU9OX1NFUlZJQ0VfVjIpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5ub3RpZmljYXRpb25TZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmJpbmQ8Q3NDZXJ0aWZpY2F0ZVNlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkNFUlRJRklDQVRFX1NFUlZJQ0UpLnRvQ29uc3RhbnRWYWx1ZShDc01vZHVsZS5pbnN0YW5jZS5jZXJ0aWZpY2F0ZVNlcnZpY2UpO1xuICAgICAgICB0aGlzLl9jb250YWluZXIuYmluZDxDc0ZyYW1ld29ya1NlcnZpY2U+KENzSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKS50b0NvbnN0YW50VmFsdWUoQ3NNb2R1bGUuaW5zdGFuY2UuZnJhbWV3b3JrU2VydmljZSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5kYlNlcnZpY2UuaW5pdCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmFwcEluZm8uaW5pdCgpO1xuICAgICAgICBhd2FpdCB0aGlzLnByZUluaXQoKS50b1Byb21pc2UoKTtcbiAgICAgICAgdGhpcy5faXNJbml0aWFsaXNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5wb3N0SW5pdCgpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVUZWxlbWV0cnlDb25maWcodXBkYXRlOiBQYXJ0aWFsPFRlbGVtZXRyeUNvbmZpZz4pIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdXBkYXRlKSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka0NvbmZpZy50ZWxlbWV0cnlDb25maWdba2V5XSA9IHVwZGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURldmljZVJlZ2lzdGVyQ29uZmlnKHVwZGF0ZTogUGFydGlhbDxEZXZpY2VSZWdpc3RlckNvbmZpZz4pIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdXBkYXRlKSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka0NvbmZpZy5kZXZpY2VSZWdpc3RlckNvbmZpZ1trZXldID0gdXBkYXRlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2ZjbVRva2VuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbGVtZXRyeVNlcnZpY2UucmVzZXREZXZpY2VSZWdpc3RlclRUTCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVDb250ZW50U2VydmljZUNvbmZpZyh1cGRhdGU6IFBhcnRpYWw8Q29udGVudFNlcnZpY2VDb25maWc+KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHVwZGF0ZSkge1xuICAgICAgICAgICAgaWYgKHVwZGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtDb25maWcuY29udGVudFNlcnZpY2VDb25maWdba2V5XSA9IHVwZGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVBhZ2VTZXJ2aWNlQ29uZmlnKHVwZGF0ZTogUGFydGlhbDxQYWdlU2VydmljZUNvbmZpZz4pIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdXBkYXRlKSB7XG4gICAgICAgICAgICBpZiAodXBkYXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka0NvbmZpZy5wYWdlU2VydmljZUNvbmZpZ1trZXldID0gdXBkYXRlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZUluaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbGVtZXRyeVNlcnZpY2UucHJlSW5pdCgpLnBpcGUoXG4gICAgICAgICAgICBjb25jYXRNYXAoKCkgPT4gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLnByZUluaXQoKS5waXBlKFxuICAgICAgICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB0aGlzLnByb2ZpbGVTZXJ2aWNlLnByZUluaXQoKSlcbiAgICAgICAgICAgICkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3N0SW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgdGhpcy5hcGlTZXJ2aWNlLm9uSW5pdCgpLFxuICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5vbkluaXQoKSxcbiAgICAgICAgICAgIHRoaXMuc3VtbWFyaXplclNlcnZpY2Uub25Jbml0KCksXG4gICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2VyU2VydmljZS5vbkluaXQoKSxcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzQnVzU2VydmljZS5vbkluaXQoKSxcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRTZXJ2aWNlLm9uSW5pdCgpLFxuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VydmljZS5vbkluaXQoKSxcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uub25Jbml0KCksXG4gICAgICAgICAgICB0aGlzLnRlbGVtZXRyeVNlcnZpY2Uub25Jbml0KCksXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uub25Jbml0KClcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIl19