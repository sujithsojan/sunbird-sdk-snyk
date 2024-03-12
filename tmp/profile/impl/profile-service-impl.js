var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { ContentAccessStatus, NoActiveSessionError, NoProfileFoundError, ProfileSession, ProfileSource, ProfileType } from '..';
import { DbService } from '../../db';
import { GroupProfileEntry, ProfileEntry } from '../db/schema';
import { TenantInfoHandler } from '../handler/tenant-info-handler';
import { HttpRequestType, Request } from '../../api';
import { GetServerProfileDetailsHandler } from '../handler/get-server-profile-details-handler';
import { ProfileDbEntryMapper } from '../util/profile-db-entry-mapper';
import { AcceptTermConditionHandler } from '../handler/accept-term-condition-handler';
import { ProfileHandler } from '../handler/profile-handler';
import { ContentAccessEntry } from '../../content/db/schema';
import { InvalidProfileError } from '../errors/invalid-profile-error';
import { UniqueId } from '../../db/util/unique-id';
import { IsProfileAlreadyInUseHandler } from '../handler/is-profile-already-in-use-handler';
import { GenerateOtpHandler } from '../handler/generate-otp-handler';
import { VerifyOtpHandler } from '../handler/verify-otp-handler';
import { SearchLocationHandler } from '../handler/search-location-handler';
import { ContentUtil } from '../../content/util/content-util';
import { ProfileKeys } from '../../preference-keys';
import { TelemetryLogger } from '../../telemetry/util/telemetry-logger';
import { GetEparFilePath } from '../handler/export/get-epar-file-path';
import { CopyDatabase } from '../handler/export/copy-database';
import { CreateMetaData } from '../handler/export/create-metadata';
import { CleanupExportedFile } from '../handler/export/clean-up-exported-file';
import { GenerateProfileImportTelemetry } from '../handler/import/generate-profile-import-telemetry';
import { GenerateProfileExportTelemetry } from '../handler/export/generate-profile-export-telemetry';
import { ValidateProfileMetadata } from '../handler/import/validate-profile-metadata';
import { TransportUser } from '../handler/import/transport-user';
import { TransportGroup } from '../handler/import/transport-group';
import { TransportGroupProfile } from '../handler/import/transport-group-profile';
import { TransportFrameworkNChannel } from '../handler/import/transport-framework-n-channel';
import { TransportAssesments } from '../handler/import/transport-assesments';
import { UpdateImportedProfileMetadata } from '../handler/import/update-imported-profile-metadata';
import { Actor, AuditState, ObjectType } from '../../telemetry';
import { ObjectUtil } from '../../util/object-util';
import { TransportProfiles } from '../handler/import/transport-profiles';
import { Container, inject, injectable } from 'inversify';
import { CsInjectionTokens, InjectionTokens } from '../../injection-tokens';
import { defer, from, iif, of, throwError, zip } from 'rxjs';
import { catchError, finalize, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { UserMigrateHandler } from '../handler/user-migrate-handler';
import { ManagedProfileManager } from '../handler/managed-profile-manager';
import { CsModule } from '@project-sunbird/client-services';
import { DeleteProfileDataHandler } from '../handler/delete-profile-data.handler';
import { DeleteAccountHandler } from '../handler/delete-account-handler';
var ProfileServiceImpl = /** @class */ (function () {
    function ProfileServiceImpl(container, sdkConfig, dbService, apiService, cachedItemStore, keyValueStore, sharedPreferences, frameworkService, fileService, deviceInfo, authService, userService) {
        this.container = container;
        this.sdkConfig = sdkConfig;
        this.dbService = dbService;
        this.apiService = apiService;
        this.cachedItemStore = cachedItemStore;
        this.keyValueStore = keyValueStore;
        this.sharedPreferences = sharedPreferences;
        this.frameworkService = frameworkService;
        this.fileService = fileService;
        this.deviceInfo = deviceInfo;
        this.authService = authService;
        this.userService = userService;
        this.apiConfig = this.sdkConfig.apiConfig;
        this.profileServiceConfig = this.sdkConfig.profileServiceConfig;
        this.managedProfileManager = new ManagedProfileManager(this, this.authService, this.sdkConfig.profileServiceConfig, this.apiService, this.cachedItemStore, this.dbService, this.frameworkService, this.sharedPreferences);
    }
    ProfileServiceImpl_1 = ProfileServiceImpl;
    Object.defineProperty(ProfileServiceImpl.prototype, "telemetryService", {
        get: function () {
            return this.container.get(InjectionTokens.TELEMETRY_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    ProfileServiceImpl.prototype.preInit = function () {
        var _this = this;
        return this.sharedPreferences.getString(ProfileServiceImpl_1.KEY_USER_SESSION).pipe(map(function (s) { return s && JSON.parse(s); }), mergeMap(function (profileSession) {
            if (!profileSession) {
                var request = {
                    uid: '',
                    handle: '',
                    profileType: ProfileType.TEACHER,
                    source: ProfileSource.LOCAL
                };
                return _this.createProfile(request)
                    .pipe(mergeMap(function (profile) {
                    return _this.setActiveSessionForProfile(profile.uid);
                }), mapTo(undefined));
            }
            return profileSession.managedSession ?
                _this.managedProfileManager.switchSessionToManagedProfile({
                    uid: profileSession.managedSession.uid
                }) : _this.setActiveSessionForProfile(profileSession.uid).pipe(mapTo(undefined));
        }));
    };
    ProfileServiceImpl.prototype.checkServerProfileExists = function (request) {
        return this.userService.checkUserExists(request.matching, request.captchaResponseToken ? { token: request.captchaResponseToken, app: '1' } : undefined);
    };
    ProfileServiceImpl.prototype.createProfile = function (profile, profileSource) {
        var _this = this;
        if (profileSource === void 0) { profileSource = ProfileSource.LOCAL; }
        switch (profileSource) {
            case ProfileSource.LOCAL: {
                if (profile.source !== ProfileSource.LOCAL) {
                    throw new InvalidProfileError("Invalid value supplied for field 'source': " + profile.source);
                }
                else if (profile.serverProfile) {
                    throw new InvalidProfileError("Invalid value supplied for field 'serverProfile': " + profile.serverProfile);
                }
                profile.uid = UniqueId.generateUniqueId();
                break;
            }
            case ProfileSource.SERVER: {
                if (profile.source !== ProfileSource.SERVER) {
                    throw new InvalidProfileError("Invalid value supplied for field 'source': " + profile.source);
                }
                else if (!profile.serverProfile) {
                    throw new InvalidProfileError("Invalid value supplied for field 'serverProfile': " + profile.serverProfile);
                }
                else if (!profile.uid) {
                    throw new InvalidProfileError("Invalid value supplied for field 'uid': " + profile.uid);
                }
                break;
            }
        }
        profile.createdAt = Date.now();
        return this.dbService.insert({
            table: ProfileEntry.TABLE_NAME,
            modelJson: ProfileDbEntryMapper.mapProfileToProfileDBEntry(profile)
        }).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getActiveProfileSession()
                            .pipe(map(function (session) { return session.uid; }), catchError(function (e) {
                            if (e instanceof NoActiveSessionError) {
                                return of(profile.uid);
                            }
                            return throwError(e);
                        }), mergeMap(function (uid) {
                            var actor = new Actor();
                            actor.id = uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_CREATED,
                                updatedProperties: ObjectUtil.getTruthyProps(profile),
                                objId: profile.uid,
                                objType: ObjectType.USER,
                                correlationData: [{
                                        id: profile.profileType,
                                        type: 'UserRole'
                                    }]
                            };
                            return _this.telemetryService.audit(auditRequest);
                        }))
                            .toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), mergeMap(function () { return of(profile); }));
    };
    ProfileServiceImpl.prototype.deleteProfile = function (uid) {
        var _this = this;
        return this.dbService.read({
            table: ProfileEntry.TABLE_NAME,
            selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
            selectionArgs: [uid],
        }).pipe(map(function (rows) {
            if (!rows || !rows[0]) {
                throw new NoProfileFoundError("No Profile found with ID " + uid);
            }
            return ProfileDbEntryMapper.mapProfileDBEntryToProfile(rows[0]);
        }), tap(function (profile) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getActiveProfileSession()
                            .pipe(mergeMap(function (session) {
                            var actor = new Actor();
                            actor.id = session.uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_DELETED,
                                objId: uid,
                                objType: ObjectType.USER,
                                correlationData: [{
                                        id: profile.profileType,
                                        type: 'UserRole'
                                    }]
                            };
                            return _this.telemetryService.audit(auditRequest);
                        }))
                            .toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }), mergeMap(function () {
            return _this.dbService.delete({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            });
        }));
    };
    ProfileServiceImpl.prototype.updateProfile = function (profile) {
        var _this = this;
        return this.dbService.read({
            table: ProfileEntry.TABLE_NAME,
            selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
            selectionArgs: [profile.uid],
        }).pipe(map(function (rows) {
            if (!rows || !rows[0]) {
                throw new NoProfileFoundError("No Profile found with ID " + profile.uid);
            }
            return ProfileDbEntryMapper.mapProfileDBEntryToProfile(rows[0]);
        }), tap(function (prevProfile) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getActiveProfileSession().pipe(mergeMap(function (session) {
                            var actor = new Actor();
                            actor.id = session.uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_UPDATED,
                                updatedProperties: ObjectUtil.getPropDiff(profile, prevProfile),
                                objId: profile.uid,
                                objType: ObjectType.USER,
                                correlationData: [{
                                        id: profile.profileType,
                                        type: 'UserRole'
                                    }]
                            };
                            return _this.telemetryService.audit(auditRequest);
                        })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), mergeMap(function () {
            var profileDBEntry = ProfileDbEntryMapper.mapProfileToProfileDBEntry(profile);
            delete profileDBEntry[ProfileEntry.COLUMN_NAME_CREATED_AT];
            return _this.dbService.update({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [profile.uid],
                modelJson: profileDBEntry
            }).pipe(mergeMap(function () { return of(profile); }));
        }));
    };
    ProfileServiceImpl.prototype.updateServerProfile = function (updateUserInfoRequest) {
        return this.userService.updateProfile(updateUserInfoRequest, { apiPath: '/api/user/v3' });
    };
    ProfileServiceImpl.prototype.getTenantInfo = function (tenantInfoRequest) {
        return new TenantInfoHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(tenantInfoRequest);
    };
    ProfileServiceImpl.prototype.getAllProfiles = function (profileRequest) {
        var _this = this;
        if (!profileRequest) {
            return this.dbService.read({
                table: ProfileEntry.TABLE_NAME,
                columns: []
            }).pipe(map(function (profiles) { return _this.mapDbProfileEntriesToProfiles(profiles); }));
        }
        if (!profileRequest.groupId) {
            return this.dbService.read({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_SOURCE + " = ?",
                selectionArgs: [profileRequest.local ? ProfileSource.LOCAL : ProfileSource.SERVER],
                columns: []
            }).pipe(map(function (profiles) { return _this.mapDbProfileEntriesToProfiles(profiles); }));
        }
        if (profileRequest.groupId && (profileRequest.local || profileRequest.server)) {
            return this.dbService.execute("\n                SELECT * FROM " + ProfileEntry.TABLE_NAME + " LEFT JOIN " + GroupProfileEntry.TABLE_NAME + "\n                ON " + ProfileEntry.TABLE_NAME + "." + ProfileEntry.COLUMN_NAME_UID + " =\n                " + GroupProfileEntry.TABLE_NAME + "." + GroupProfileEntry.COLUMN_NAME_UID + "\n                WHERE " + GroupProfileEntry.COLUMN_NAME_GID + " = \"" + profileRequest.groupId + "\" AND\n                " + ProfileEntry.COLUMN_NAME_SOURCE + " = \"" + (profileRequest.local ? ProfileSource.LOCAL : ProfileSource.SERVER) + "\"\n            ").pipe(map(function (profiles) { return _this.mapDbProfileEntriesToProfiles(profiles); }));
        }
        return this.dbService.execute("\n            SELECT * FROM " + ProfileEntry.TABLE_NAME + "\n            LEFT JOIN " + GroupProfileEntry.TABLE_NAME + " ON\n            " + ProfileEntry.TABLE_NAME + "." + ProfileEntry.COLUMN_NAME_UID + " =\n            " + GroupProfileEntry.TABLE_NAME + "." + GroupProfileEntry.COLUMN_NAME_UID + "\n            WHERE " + GroupProfileEntry.TABLE_NAME + "." + GroupProfileEntry.COLUMN_NAME_GID + " = \"" + profileRequest.groupId + "\"\n        ").pipe(map(function (profiles) { return _this.mapDbProfileEntriesToProfiles(profiles); }));
    };
    ProfileServiceImpl.prototype.getServerProfilesDetails = function (serverProfileDetailsRequest) {
        return new GetServerProfileDetailsHandler(this.cachedItemStore, this.keyValueStore, this.container, this.profileServiceConfig)
            .handle(serverProfileDetailsRequest);
    };
    ProfileServiceImpl.prototype.getActiveSessionProfile = function (_a) {
        var _this = this;
        var requiredFields = _a.requiredFields;
        return this.getActiveProfileSession().pipe(mergeMap(function (profileSession) {
            return _this.dbService.read({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [profileSession.managedSession ? profileSession.managedSession.uid : profileSession.uid]
            }).pipe(map(function (rows) {
                var profileDBEntry = rows && rows[0];
                if (!profileDBEntry) {
                    throw new NoProfileFoundError("No profile found for profileSession with uid " + (profileSession.managedSession ? profileSession.managedSession.uid : profileSession.uid));
                }
                return ProfileDbEntryMapper.mapProfileDBEntryToProfile(profileDBEntry);
            }), mergeMap(function (profile) {
                if (profile.source === ProfileSource.SERVER) {
                    return _this.getServerProfilesDetails({
                        userId: profile.uid,
                        requiredFields: requiredFields
                    }).pipe(map(function (serverProfile) { return (__assign(__assign({}, profile), { handle: serverProfile.firstName + (serverProfile.lastName ? ' ' + serverProfile.lastName : ''), serverProfile: serverProfile })); }));
                }
                return of(profile);
            }));
        }));
    };
    ProfileServiceImpl.prototype.setActiveSessionForProfile = function (profileUid) {
        var _this = this;
        return defer(function () { return _this.generateSessionEndTelemetry(); }).pipe(mergeMap(function () {
            return _this.dbService.read({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [profileUid]
            });
        }), map(function (rows) {
            return rows && rows[0] && ProfileDbEntryMapper.mapProfileDBEntryToProfile(rows[0]);
        }), map(function (profile) {
            if (!profile) {
                throw new NoProfileFoundError('No Profile found');
            }
            return profile;
        }), mergeMap(function (profile) {
            return iif(function () { return profile.source === ProfileSource.SERVER; }, defer(function () {
                return _this.getServerProfilesDetails({
                    userId: profile.uid,
                    requiredFields: []
                }).pipe(map(function (serverProfile) { return (__assign(__assign({}, profile), { serverProfile: serverProfile })); }), mergeMap(function (attachedServerProfileDetailsProfile) {
                    return _this.frameworkService
                        .setActiveChannelId(attachedServerProfileDetailsProfile.serverProfile.rootOrg.hashTagId);
                }), catchError(function () { return of(undefined); }));
            }), _this.frameworkService.setActiveChannelId(_this.sdkConfig.apiConfig.api_authentication.channelId).pipe(mapTo(undefined))).pipe(mapTo(profile));
        }), mergeMap(function (profile) {
            var profileSession = new ProfileSession(profile.uid);
            if (CsModule.instance.isInitialised) {
                CsModule.instance.updateConfig(__assign(__assign({}, CsModule.instance.config), { core: __assign(__assign({}, CsModule.instance.config.core), { global: __assign(__assign({}, CsModule.instance.config.core.global), { sessionId: profileSession.sid }) }) }));
            }
            return _this.sharedPreferences.putString(ProfileServiceImpl_1.KEY_USER_SESSION, JSON.stringify(profileSession)).pipe(mapTo(true));
        }), tap(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.generateSessionStartTelemetry()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }));
    };
    ProfileServiceImpl.prototype.getActiveProfileSession = function () {
        return this.sharedPreferences.getString(ProfileServiceImpl_1.KEY_USER_SESSION).pipe(map(function (response) {
            if (response) {
                return JSON.parse(response);
            }
            throw new NoActiveSessionError('No active session available');
        }));
    };
    ProfileServiceImpl.prototype.acceptTermsAndConditions = function (acceptTermsConditions) {
        return new AcceptTermConditionHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(acceptTermsConditions);
    };
    ProfileServiceImpl.prototype.isProfileAlreadyInUse = function (isProfileAlreadyInUseRequest) {
        return new IsProfileAlreadyInUseHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(isProfileAlreadyInUseRequest);
    };
    ProfileServiceImpl.prototype.generateOTP = function (generateOtpRequest) {
        return new GenerateOtpHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(generateOtpRequest);
    };
    ProfileServiceImpl.prototype.verifyOTP = function (verifyOTPRequest) {
        return new VerifyOtpHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(verifyOTPRequest);
    };
    ProfileServiceImpl.prototype.searchLocation = function (locationSearchCriteria) {
        return new SearchLocationHandler(this.apiService, this.sdkConfig.profileServiceConfig, this.fileService, this.cachedItemStore)
            .handle(locationSearchCriteria);
    };
    ProfileServiceImpl.prototype.getAllContentAccess = function (criteria) {
        var query = "SELECT * FROM " + ContentAccessEntry.TABLE_NAME + " " + ContentUtil.getUidnIdentifierFiler(criteria.uid, criteria.contentId);
        return this.dbService.execute(query).pipe(map(function (contentAccessList) {
            return contentAccessList.map(function (contentAccess) {
                return ProfileHandler.mapDBEntryToContenetAccess(contentAccess);
            });
        }));
    };
    ProfileServiceImpl.prototype.addContentAccess = function (contentAccess) {
        var _this = this;
        return this.getActiveProfileSession().pipe(mergeMap(function (_a) {
            var uid = _a.uid;
            return _this.dbService.read({
                table: ContentAccessEntry.TABLE_NAME,
                selection: ContentAccessEntry.COLUMN_NAME_UID + "= ? AND " + ContentAccessEntry
                    .COLUMN_NAME_CONTENT_IDENTIFIER + "= ?",
                selectionArgs: [uid, contentAccess.contentId],
                orderBy: ContentAccessEntry.COLUMN_NAME_EPOCH_TIMESTAMP + " DESC",
                limit: '1'
            }).pipe(mergeMap(function (contentAccessInDb) {
                var contentAccessDbModel = {
                    uid: uid,
                    identifier: contentAccess.contentId,
                    epoch_timestamp: Date.now(),
                    status: ContentAccessStatus.PLAYED.valueOf(),
                    content_type: contentAccess.contentType && contentAccess.contentType.toLowerCase(),
                    learner_state: contentAccess.contentLearnerState &&
                        JSON.stringify(contentAccess.contentLearnerState.learnerState)
                };
                if (contentAccessInDb && contentAccessInDb.length) {
                    contentAccessDbModel.status = contentAccessInDb[0][ContentAccessEntry.COLUMN_NAME_STATUS];
                    return _this.dbService.update({
                        table: ContentAccessEntry.TABLE_NAME,
                        selection: ContentAccessEntry.COLUMN_NAME_UID + "= ? AND " + ContentAccessEntry
                            .COLUMN_NAME_CONTENT_IDENTIFIER + "= ?",
                        selectionArgs: [uid, contentAccess.contentId],
                        modelJson: contentAccessDbModel
                    }).pipe(map(function (v) { return v > 0; }));
                }
                else {
                    return _this.dbService.insert({
                        table: ContentAccessEntry.TABLE_NAME,
                        modelJson: contentAccessDbModel
                    }).pipe(map(function (v) { return v > 0; }));
                }
            }));
        }));
    };
    ProfileServiceImpl.prototype.exportProfile = function (profileExportRequest) {
        var _this = this;
        var exportProfileContext = {
            userIds: profileExportRequest.userIds,
            destinationFolder: profileExportRequest.destinationFolder,
            groupIds: profileExportRequest.groupIds
        };
        return from(new GetEparFilePath(this.fileService).execute(exportProfileContext).then(function (exportResponse) {
            return new CopyDatabase(_this.dbService).execute(exportResponse.body);
        }).then(function (exportResponse) {
            var response = { exportedFilePath: '' };
            return new CreateMetaData(_this.dbService, _this.fileService, _this.deviceInfo).execute(exportResponse.body);
        }).then(function (exportResponse) {
            var response = { exportedFilePath: '' };
            return new CleanupExportedFile(_this.dbService, _this.fileService).execute(exportResponse.body)
                .catch(function () { return exportResponse; });
        }).then(function (exportResponse) {
            return new GenerateProfileExportTelemetry(_this.dbService).execute(exportResponse.body);
        }).then(function (exportResponse) {
            return { exportedFilePath: exportResponse.body.destinationDBFilePath };
        }));
    };
    ProfileServiceImpl.prototype.importProfile = function (profileImportRequest) {
        var _this = this;
        var importProfileContext = {
            sourceDBFilePath: profileImportRequest.sourceFilePath,
        };
        return from(new ValidateProfileMetadata(this.dbService).execute(importProfileContext).then(function (importResponse) {
            return new TransportUser(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new TransportProfiles(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new TransportGroup(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new TransportGroupProfile(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new TransportFrameworkNChannel(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new TransportAssesments(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new UpdateImportedProfileMetadata(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return new GenerateProfileImportTelemetry(_this.dbService).execute(importResponse.body);
        }).then(function (importResponse) {
            return { failed: importResponse.body.failed, imported: importResponse.body.imported };
        }));
    };
    ProfileServiceImpl.prototype.mergeServerProfiles = function (mergeServerProfilesRequest) {
        var _this = this;
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.PATCH)
            .withPath(ProfileServiceImpl_1.MERGE_SERVER_PROFILES_PATH)
            .withBearerToken(true)
            .withHeaders({
            'x-source-user-token': mergeServerProfilesRequest.from.accessToken,
            'x-authenticated-user-token': mergeServerProfilesRequest.to.accessToken
        })
            .withBody({
            request: {
                fromAccountId: mergeServerProfilesRequest.from.userId,
                toAccountId: mergeServerProfilesRequest.to.userId
            }
        })
            .build();
        return this.apiService.fetch(apiRequest).pipe(map(function (res) {
            console.log(res);
            return undefined;
        }), finalize(function () {
            var launchUrl = _this.sdkConfig.apiConfig.user_authentication.mergeUserHost +
                _this.sdkConfig.apiConfig.user_authentication.authUrl + '/logout' + '?redirect_uri=' +
                _this.sdkConfig.apiConfig.host + '/oauth2callback';
            var inAppBrowserRef = cordova.InAppBrowser.open(launchUrl, '_blank', 'zoom=no,hidden=yes');
            inAppBrowserRef.addEventListener('loadstart', function (event) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (event.url.indexOf('/oauth2callback') > -1) {
                        inAppBrowserRef.close();
                    }
                    return [2 /*return*/];
                });
            }); });
        }));
    };
    ProfileServiceImpl.prototype.isDefaultChannelProfile = function () {
        return zip(this.frameworkService.getDefaultChannelId(), this.frameworkService.getActiveChannelId()).pipe(map(function (results) {
            return results[0] === results[1];
        }));
    };
    ProfileServiceImpl.prototype.getUserFeed = function () {
        var _this = this;
        return this.getActiveProfileSession().pipe(mergeMap(function (session) {
            return _this.userService.getUserFeed(session.managedSession ? session.managedSession.uid : session.uid, {
                apiPath: _this.sdkConfig.profileServiceConfig.profileApiPath_V5
            });
        }));
    };
    ProfileServiceImpl.prototype.updateUserFeedEntry = function (updateUserFeedRequest) {
        var _this = this;
        return this.getActiveProfileSession().pipe(mergeMap(function (session) {
            return _this.userService.updateUserFeedEntry(session.managedSession ? session.managedSession.uid : session.uid, updateUserFeedRequest.feedEntryId, updateUserFeedRequest.category, updateUserFeedRequest.request, {
                apiPath: _this.sdkConfig.profileServiceConfig.profileApiPath_V5
            }).pipe(mapTo(true), catchError(function () { return of(false); }));
        }));
    };
    ProfileServiceImpl.prototype.deleteUserFeedEntry = function (deleteUserFeedRequest) {
        var _this = this;
        return this.getActiveProfileSession().pipe(mergeMap(function (session) {
            return _this.userService.deleteUserFeedEntry(session.managedSession ? session.managedSession.uid : session.uid, deleteUserFeedRequest.feedEntryId, deleteUserFeedRequest.category, {
                apiPath: _this.sdkConfig.profileServiceConfig.profileApiPath
            }).pipe(mapTo(true), catchError(function () { return of(false); }));
        }));
    };
    ProfileServiceImpl.prototype.userMigrate = function (userMigrateRequest) {
        return new UserMigrateHandler(this.sdkConfig, this.apiService)
            .handle(userMigrateRequest);
    };
    ProfileServiceImpl.prototype.updateServerProfileDeclarations = function (request) {
        return this.userService.updateUserDeclarations(request.declarations, { apiPath: this.sdkConfig.profileServiceConfig.profileApiPath });
    };
    ProfileServiceImpl.prototype.getConsent = function (userConsent) {
        return this.userService.getConsent(userConsent, { apiPath: this.sdkConfig.profileServiceConfig.profileApiPath });
    };
    ProfileServiceImpl.prototype.updateConsent = function (userConsent) {
        return this.userService.updateConsent(userConsent, { apiPath: this.sdkConfig.profileServiceConfig.profileApiPath });
    };
    ProfileServiceImpl.prototype.mapDbProfileEntriesToProfiles = function (profiles) {
        return profiles.map(function (profile) { return ProfileDbEntryMapper.mapProfileDBEntryToProfile(profile); });
    };
    ProfileServiceImpl.prototype.generateSessionStartTelemetry = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, TelemetryLogger.log.start({
                        type: 'session', env: 'sdk'
                    }).toPromise()];
            });
        });
    };
    ProfileServiceImpl.prototype.generateSessionEndTelemetry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionString, profileSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.getString(ProfileServiceImpl_1.KEY_USER_SESSION).toPromise()];
                    case 1:
                        sessionString = _a.sent();
                        if (!sessionString) return [3 /*break*/, 3];
                        profileSession = JSON.parse(sessionString);
                        return [4 /*yield*/, TelemetryLogger.log.end({
                                type: 'session',
                                env: 'sdk',
                                duration: Math.floor((Date.now() - profileSession.createdTime) / 1000)
                            }).toPromise()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileServiceImpl.prototype.deleteProfileData = function (uid) {
        return new DeleteProfileDataHandler(this.dbService).delete(uid);
    };
    ProfileServiceImpl.prototype.deleteUser = function (deleteUserRequest) {
        return new DeleteAccountHandler(this.apiService, this.sdkConfig.profileServiceConfig).handle(deleteUserRequest);
    };
    var ProfileServiceImpl_1;
    ProfileServiceImpl.KEY_USER_SESSION = ProfileKeys.KEY_USER_SESSION;
    ProfileServiceImpl.MERGE_SERVER_PROFILES_PATH = '/api/user/v1/account/merge';
    ProfileServiceImpl = ProfileServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __param(1, inject(InjectionTokens.SDK_CONFIG)),
        __param(2, inject(InjectionTokens.DB_SERVICE)),
        __param(3, inject(InjectionTokens.API_SERVICE)),
        __param(4, inject(InjectionTokens.CACHED_ITEM_STORE)),
        __param(5, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(6, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(7, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(8, inject(InjectionTokens.FILE_SERVICE)),
        __param(9, inject(InjectionTokens.DEVICE_INFO)),
        __param(10, inject(InjectionTokens.AUTH_SERVICE)),
        __param(11, inject(CsInjectionTokens.USER_SERVICE)),
        __metadata("design:paramtypes", [Container, Object, DbService, Object, Object, Object, Object, Object, Object, Object, Object, Object])
    ], ProfileServiceImpl);
    return ProfileServiceImpl;
}());
export { ProfileServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS9pbXBsL3Byb2ZpbGUtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUlILG1CQUFtQixFQU1uQixvQkFBb0IsRUFDcEIsbUJBQW1CLEVBTW5CLGNBQWMsRUFDZCxhQUFhLEVBQ2IsV0FBVyxFQVNkLE1BQU0sSUFBSSxDQUFDO0FBQ1osT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBd0IsZUFBZSxFQUFFLE9BQU8sRUFBVyxNQUFNLFdBQVcsQ0FBQztBQUNwRixPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUU3RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNwRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FB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SixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDakMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3pDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsWUFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BDLFlBQUEsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFBO3lDQVhlLFNBQVMsVUFFUixTQUFTO09BWDNELGtCQUFrQixDQWtzQjlCO0lBQUQseUJBQUM7Q0FBQSxBQWxzQkQsSUFrc0JDO1NBbHNCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFjY2VwdFRlcm1zQ29uZGl0aW9uUmVxdWVzdCxcbiAgICBDb25zZW50LFxuICAgIENvbnRlbnRBY2Nlc3MsXG4gICAgQ29udGVudEFjY2Vzc1N0YXR1cyxcbiAgICBHZW5lcmF0ZU90cFJlcXVlc3QsXG4gICAgR2V0QWxsUHJvZmlsZVJlcXVlc3QsXG4gICAgSXNQcm9maWxlQWxyZWFkeUluVXNlUmVxdWVzdCxcbiAgICBMb2NhdGlvblNlYXJjaENyaXRlcmlhLFxuICAgIE1lcmdlU2VydmVyUHJvZmlsZXNSZXF1ZXN0LFxuICAgIE5vQWN0aXZlU2Vzc2lvbkVycm9yLFxuICAgIE5vUHJvZmlsZUZvdW5kRXJyb3IsXG4gICAgUHJvZmlsZSxcbiAgICBQcm9maWxlRXhwb3J0UmVxdWVzdCxcbiAgICBQcm9maWxlRXhwb3J0UmVzcG9uc2UsXG4gICAgUHJvZmlsZVNlcnZpY2UsXG4gICAgUHJvZmlsZVNlcnZpY2VDb25maWcsXG4gICAgUHJvZmlsZVNlc3Npb24sXG4gICAgUHJvZmlsZVNvdXJjZSxcbiAgICBQcm9maWxlVHlwZSxcbiAgICBSZWFkQ29uc2VudFJlc3BvbnNlLFxuICAgIFNlcnZlclByb2ZpbGUsXG4gICAgU2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0LFxuICAgIFRlbmFudEluZm9SZXF1ZXN0LFxuICAgIFVwZGF0ZUNvbnNlbnRSZXNwb25zZSxcbiAgICBVc2VyRmVlZEVudHJ5LFxuICAgIFVzZXJNaWdyYXRlUmVxdWVzdCxcbiAgICBWZXJpZnlPdHBSZXF1ZXN0XG59IGZyb20gJy4uJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge0dyb3VwUHJvZmlsZUVudHJ5LCBQcm9maWxlRW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1RlbmFudEluZm99IGZyb20gJy4uL2RlZi90ZW5hbnQtaW5mbyc7XG5pbXBvcnQge1RlbmFudEluZm9IYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL3RlbmFudC1pbmZvLWhhbmRsZXInO1xuaW1wb3J0IHtBcGlDb25maWcsIEFwaVNlcnZpY2UsIEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge0dldFNlcnZlclByb2ZpbGVEZXRhaWxzSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci9nZXQtc2VydmVyLXByb2ZpbGUtZGV0YWlscy1oYW5kbGVyJztcbmltcG9ydCB7Q2FjaGVkSXRlbVN0b3JlLCBLZXlWYWx1ZVN0b3JlfSBmcm9tICcuLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuaW1wb3J0IHtQcm9maWxlRGJFbnRyeU1hcHBlcn0gZnJvbSAnLi4vdXRpbC9wcm9maWxlLWRiLWVudHJ5LW1hcHBlcic7XG5pbXBvcnQge0NvbnRlbnRBY2Nlc3NGaWx0ZXJDcml0ZXJpYX0gZnJvbSAnLi4vZGVmL2NvbnRlbnQtYWNjZXNzLWZpbHRlci1jcml0ZXJpYSc7XG5pbXBvcnQge0FjY2VwdFRlcm1Db25kaXRpb25IYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL2FjY2VwdC10ZXJtLWNvbmRpdGlvbi1oYW5kbGVyJztcbmltcG9ydCB7UHJvZmlsZUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvcHJvZmlsZS1oYW5kbGVyJztcbmltcG9ydCB7Q29udGVudEFjY2Vzc0VudHJ5fSBmcm9tICcuLi8uLi9jb250ZW50L2RiL3NjaGVtYSc7XG5pbXBvcnQge0ludmFsaWRQcm9maWxlRXJyb3J9IGZyb20gJy4uL2Vycm9ycy9pbnZhbGlkLXByb2ZpbGUtZXJyb3InO1xuaW1wb3J0IHtVbmlxdWVJZH0gZnJvbSAnLi4vLi4vZGIvdXRpbC91bmlxdWUtaWQnO1xuaW1wb3J0IHtQcm9maWxlRXhpc3RzUmVzcG9uc2V9IGZyb20gJy4uL2RlZi9wcm9maWxlLWV4aXN0cy1yZXNwb25zZSc7XG5pbXBvcnQge0lzUHJvZmlsZUFscmVhZHlJblVzZUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvaXMtcHJvZmlsZS1hbHJlYWR5LWluLXVzZS1oYW5kbGVyJztcbmltcG9ydCB7R2VuZXJhdGVPdHBIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL2dlbmVyYXRlLW90cC1oYW5kbGVyJztcbmltcG9ydCB7VmVyaWZ5T3RwSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlci92ZXJpZnktb3RwLWhhbmRsZXInO1xuaW1wb3J0IHtMb2NhdGlvblNlYXJjaFJlc3VsdH0gZnJvbSAnLi4vZGVmL2xvY2F0aW9uLXNlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHtTZWFyY2hMb2NhdGlvbkhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvc2VhcmNoLWxvY2F0aW9uLWhhbmRsZXInO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtGcmFtZXdvcmtTZXJ2aWNlfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsnO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vLi4vY29udGVudC91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge1Byb2ZpbGVLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtUZWxlbWV0cnlMb2dnZXJ9IGZyb20gJy4uLy4uL3RlbGVtZXRyeS91dGlsL3RlbGVtZXRyeS1sb2dnZXInO1xuaW1wb3J0IHtQcm9maWxlSW1wb3J0UmVxdWVzdH0gZnJvbSAnLi4vZGVmL3Byb2ZpbGUtaW1wb3J0LXJlcXVlc3QnO1xuaW1wb3J0IHtQcm9maWxlSW1wb3J0UmVzcG9uc2V9IGZyb20gJy4uL2RlZi9wcm9maWxlLWltcG9ydC1yZXNwb25zZSc7XG5pbXBvcnQge0V4cG9ydFByb2ZpbGVDb250ZXh0fSBmcm9tICcuLi9kZWYvZXhwb3J0LXByb2ZpbGUtY29udGV4dCc7XG5pbXBvcnQge0dldEVwYXJGaWxlUGF0aH0gZnJvbSAnLi4vaGFuZGxlci9leHBvcnQvZ2V0LWVwYXItZmlsZS1wYXRoJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7Q29weURhdGFiYXNlfSBmcm9tICcuLi9oYW5kbGVyL2V4cG9ydC9jb3B5LWRhdGFiYXNlJztcbmltcG9ydCB7Q3JlYXRlTWV0YURhdGF9IGZyb20gJy4uL2hhbmRsZXIvZXhwb3J0L2NyZWF0ZS1tZXRhZGF0YSc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7Q2xlYW51cEV4cG9ydGVkRmlsZX0gZnJvbSAnLi4vaGFuZGxlci9leHBvcnQvY2xlYW4tdXAtZXhwb3J0ZWQtZmlsZSc7XG5pbXBvcnQge0dlbmVyYXRlUHJvZmlsZUltcG9ydFRlbGVtZXRyeX0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvZ2VuZXJhdGUtcHJvZmlsZS1pbXBvcnQtdGVsZW1ldHJ5JztcbmltcG9ydCB7R2VuZXJhdGVQcm9maWxlRXhwb3J0VGVsZW1ldHJ5fSBmcm9tICcuLi9oYW5kbGVyL2V4cG9ydC9nZW5lcmF0ZS1wcm9maWxlLWV4cG9ydC10ZWxlbWV0cnknO1xuaW1wb3J0IHtJbXBvcnRQcm9maWxlQ29udGV4dH0gZnJvbSAnLi4vZGVmL2ltcG9ydC1wcm9maWxlLWNvbnRleHQnO1xuaW1wb3J0IHtWYWxpZGF0ZVByb2ZpbGVNZXRhZGF0YX0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvdmFsaWRhdGUtcHJvZmlsZS1tZXRhZGF0YSc7XG5pbXBvcnQge1RyYW5zcG9ydFVzZXJ9IGZyb20gJy4uL2hhbmRsZXIvaW1wb3J0L3RyYW5zcG9ydC11c2VyJztcbmltcG9ydCB7VHJhbnNwb3J0R3JvdXB9IGZyb20gJy4uL2hhbmRsZXIvaW1wb3J0L3RyYW5zcG9ydC1ncm91cCc7XG5pbXBvcnQge1RyYW5zcG9ydEdyb3VwUHJvZmlsZX0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LWdyb3VwLXByb2ZpbGUnO1xuaW1wb3J0IHtUcmFuc3BvcnRGcmFtZXdvcmtOQ2hhbm5lbH0gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LWZyYW1ld29yay1uLWNoYW5uZWwnO1xuaW1wb3J0IHtUcmFuc3BvcnRBc3Nlc21lbnRzfSBmcm9tICcuLi9oYW5kbGVyL2ltcG9ydC90cmFuc3BvcnQtYXNzZXNtZW50cyc7XG5pbXBvcnQge1VwZGF0ZUltcG9ydGVkUHJvZmlsZU1ldGFkYXRhfSBmcm9tICcuLi9oYW5kbGVyL2ltcG9ydC91cGRhdGUtaW1wb3J0ZWQtcHJvZmlsZS1tZXRhZGF0YSc7XG5pbXBvcnQge0FjdG9yLCBBdWRpdFN0YXRlLCBPYmplY3RUeXBlLCBUZWxlbWV0cnlBdWRpdFJlcXVlc3QsIFRlbGVtZXRyeVNlcnZpY2V9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge09iamVjdFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0LXV0aWwnO1xuaW1wb3J0IHtUcmFuc3BvcnRQcm9maWxlc30gZnJvbSAnLi4vaGFuZGxlci9pbXBvcnQvdHJhbnNwb3J0LXByb2ZpbGVzJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7Q29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0NzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi4vLi4vYXV0aCc7XG5pbXBvcnQge2RlZmVyLCBmcm9tLCBpaWYsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaW5hbGl6ZSwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtVc2VyTWlncmF0ZVJlc3BvbnNlfSBmcm9tICcuLi9kZWYvdXNlci1taWdyYXRlLXJlc3BvbnNlJztcbmltcG9ydCB7VXNlck1pZ3JhdGVIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL3VzZXItbWlncmF0ZS1oYW5kbGVyJztcbmltcG9ydCB7TWFuYWdlZFByb2ZpbGVNYW5hZ2VyfSBmcm9tICcuLi9oYW5kbGVyL21hbmFnZWQtcHJvZmlsZS1tYW5hZ2VyJztcbmltcG9ydCB7Q3NVc2VyU2VydmljZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvdXNlcic7XG5pbXBvcnQge0NoZWNrVXNlckV4aXN0c1JlcXVlc3R9IGZyb20gJy4uL2RlZi9jaGVjay11c2VyLWV4aXN0cy1yZXF1ZXN0JztcbmltcG9ydCB7Q2hlY2tVc2VyRXhpc3RzUmVzcG9uc2V9IGZyb20gJy4uL2RlZi9jaGVjay11c2VyLWV4aXN0cy1yZXNwb25zZSc7XG5pbXBvcnQge1VwZGF0ZVNlcnZlclByb2ZpbGVEZWNsYXJhdGlvbnNSZXNwb25zZX0gZnJvbSAnLi4vZGVmL3VwZGF0ZS1zZXJ2ZXItcHJvZmlsZS1kZWNsYXJhdGlvbnMtcmVzcG9uc2UnO1xuaW1wb3J0IHtVcGRhdGVTZXJ2ZXJQcm9maWxlRGVjbGFyYXRpb25zUmVxdWVzdH0gZnJvbSAnLi4vZGVmL3VwZGF0ZS1zZXJ2ZXItcHJvZmlsZS1kZWNsYXJhdGlvbnMtcmVxdWVzdCc7XG5pbXBvcnQge0NzTW9kdWxlfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcyc7XG5pbXBvcnQge1VwZGF0ZVVzZXJGZWVkUmVxdWVzdH0gZnJvbSAnLi4vZGVmL3VwZGF0ZS11c2VyLWZlZWQtcmVxdWVzdCc7XG5pbXBvcnQge0RlbGV0ZVVzZXJGZWVkUmVxdWVzdH0gZnJvbSAnLi4vZGVmL2RlbGV0ZS11c2VyLWZlZWQtcmVxdWVzdCc7XG5pbXBvcnQge1VwZGF0ZVNlcnZlclByb2ZpbGVSZXNwb25zZX0gZnJvbSAnLi4vZGVmL3VwZGF0ZS1zZXJ2ZXItcHJvZmlsZS1yZXNwb25zZSc7XG5pbXBvcnQge1VwZGF0ZVNlcnZlclByb2ZpbGVJbmZvUmVxdWVzdH0gZnJvbSAnLi4vZGVmL3VwZGF0ZS1zZXJ2ZXItcHJvZmlsZS1pbmZvLXJlcXVlc3QnO1xuaW1wb3J0IHtEZWxldGVQcm9maWxlRGF0YUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvZGVsZXRlLXByb2ZpbGUtZGF0YS5oYW5kbGVyJztcbmltcG9ydCB7IERlbGV0ZVVzZXJSZXF1ZXN0IH0gZnJvbSAnLi4vZGVmL2RlbGV0ZS11c2VyLXJlcXVlc3QnO1xuaW1wb3J0IHsgRGVsZXRlQWNjb3VudEhhbmRsZXIgfSBmcm9tICcuLi9oYW5kbGVyL2RlbGV0ZS1hY2NvdW50LWhhbmRsZXInO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvZmlsZVNlcnZpY2VJbXBsIGltcGxlbWVudHMgUHJvZmlsZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEtFWV9VU0VSX1NFU1NJT04gPSBQcm9maWxlS2V5cy5LRVlfVVNFUl9TRVNTSU9OO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1FUkdFX1NFUlZFUl9QUk9GSUxFU19QQVRIID0gJy9hcGkvdXNlci92MS9hY2NvdW50L21lcmdlJztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBpQ29uZmlnOiBBcGlDb25maWc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlU2VydmljZUNvbmZpZzogUHJvZmlsZVNlcnZpY2VDb25maWc7XG4gICAgcmVhZG9ubHkgbWFuYWdlZFByb2ZpbGVNYW5hZ2VyOiBNYW5hZ2VkUHJvZmlsZU1hbmFnZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ09OVEFJTkVSKSBwcml2YXRlIGNvbnRhaW5lcjogQ29udGFpbmVyLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5BUElfU0VSVklDRSkgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DQUNIRURfSVRFTV9TVE9SRSkgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuS0VZX1ZBTFVFX1NUT1JFKSBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZSQU1FV09SS19TRVJWSUNFKSBwcml2YXRlIGZyYW1ld29ya1NlcnZpY2U6IEZyYW1ld29ya1NlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkZJTEVfU0VSVklDRSkgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRFVklDRV9JTkZPKSBwcml2YXRlIGRldmljZUluZm86IERldmljZUluZm8sXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFVVEhfU0VSVklDRSkgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoQ3NJbmplY3Rpb25Ub2tlbnMuVVNFUl9TRVJWSUNFKSBwcml2YXRlIHVzZXJTZXJ2aWNlOiBDc1VzZXJTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXBpQ29uZmlnID0gdGhpcy5zZGtDb25maWcuYXBpQ29uZmlnO1xuICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlQ29uZmlnID0gdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWc7XG4gICAgICAgIHRoaXMubWFuYWdlZFByb2ZpbGVNYW5hZ2VyID0gbmV3IE1hbmFnZWRQcm9maWxlTWFuYWdlcihcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcsXG4gICAgICAgICAgICB0aGlzLmFwaVNlcnZpY2UsXG4gICAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHRlbGVtZXRyeVNlcnZpY2UoKTogVGVsZW1ldHJ5U2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXQ8VGVsZW1ldHJ5U2VydmljZT4oSW5qZWN0aW9uVG9rZW5zLlRFTEVNRVRSWV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBwcmVJbml0KCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhQcm9maWxlU2VydmljZUltcGwuS0VZX1VTRVJfU0VTU0lPTikucGlwZShcbiAgICAgICAgICAgIG1hcCgocykgPT4gcyAmJiBKU09OLnBhcnNlKHMpKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChwcm9maWxlU2Vzc2lvbj86IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9maWxlU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBQcm9maWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlVHlwZTogUHJvZmlsZVR5cGUuVEVBQ0hFUixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogUHJvZmlsZVNvdXJjZS5MT0NBTFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVByb2ZpbGUocmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChwcm9maWxlOiBQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEFjdGl2ZVNlc3Npb25Gb3JQcm9maWxlKHByb2ZpbGUudWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlZFByb2ZpbGVNYW5hZ2VyLnN3aXRjaFNlc3Npb25Ub01hbmFnZWRQcm9maWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpZDogcHJvZmlsZVNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkXG4gICAgICAgICAgICAgICAgICAgIH0pIDogdGhpcy5zZXRBY3RpdmVTZXNzaW9uRm9yUHJvZmlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVTZXNzaW9uLnVpZFxuICAgICAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNoZWNrU2VydmVyUHJvZmlsZUV4aXN0cyhyZXF1ZXN0OiBDaGVja1VzZXJFeGlzdHNSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDaGVja1VzZXJFeGlzdHNSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5jaGVja1VzZXJFeGlzdHMoXG4gICAgICAgICAgICByZXF1ZXN0Lm1hdGNoaW5nLCByZXF1ZXN0LmNhcHRjaGFSZXNwb25zZVRva2VuID8ge3Rva2VuOiByZXF1ZXN0LmNhcHRjaGFSZXNwb25zZVRva2VuLCBhcHA6ICcxJ30gOiB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9maWxlKHByb2ZpbGU6IFByb2ZpbGUsIHByb2ZpbGVTb3VyY2U6IFByb2ZpbGVTb3VyY2UgPSBQcm9maWxlU291cmNlLkxPQ0FMKTogT2JzZXJ2YWJsZTxQcm9maWxlPiB7XG4gICAgICAgIHN3aXRjaCAocHJvZmlsZVNvdXJjZSkge1xuICAgICAgICAgICAgY2FzZSBQcm9maWxlU291cmNlLkxPQ0FMOiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2ZpbGUuc291cmNlICE9PSBQcm9maWxlU291cmNlLkxPQ0FMKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUHJvZmlsZUVycm9yKGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBmaWVsZCAnc291cmNlJzogJHtwcm9maWxlLnNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb2ZpbGUuc2VydmVyUHJvZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFByb2ZpbGVFcnJvcihgSW52YWxpZCB2YWx1ZSBzdXBwbGllZCBmb3IgZmllbGQgJ3NlcnZlclByb2ZpbGUnOiAke3Byb2ZpbGUuc2VydmVyUHJvZmlsZX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9maWxlLnVpZCA9IFVuaXF1ZUlkLmdlbmVyYXRlVW5pcXVlSWQoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByb2ZpbGVTb3VyY2UuU0VSVkVSOiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2ZpbGUuc291cmNlICE9PSBQcm9maWxlU291cmNlLlNFUlZFUikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFByb2ZpbGVFcnJvcihgSW52YWxpZCB2YWx1ZSBzdXBwbGllZCBmb3IgZmllbGQgJ3NvdXJjZSc6ICR7cHJvZmlsZS5zb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghcHJvZmlsZS5zZXJ2ZXJQcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUHJvZmlsZUVycm9yKGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBmaWVsZCAnc2VydmVyUHJvZmlsZSc6ICR7cHJvZmlsZS5zZXJ2ZXJQcm9maWxlfWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXByb2ZpbGUudWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUHJvZmlsZUVycm9yKGBJbnZhbGlkIHZhbHVlIHN1cHBsaWVkIGZvciBmaWVsZCAndWlkJzogJHtwcm9maWxlLnVpZH1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2ZpbGUuY3JlYXRlZEF0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIG1vZGVsSnNvbjogUHJvZmlsZURiRW50cnlNYXBwZXIubWFwUHJvZmlsZVRvUHJvZmlsZURCRW50cnkocHJvZmlsZSlcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChzZXNzaW9uKSA9PiBzZXNzaW9uLnVpZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBOb0FjdGl2ZVNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YocHJvZmlsZS51aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgodWlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5pZCA9IHVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci50eXBlID0gQWN0b3IuVFlQRV9TWVNURU07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdWRpdFJlcXVlc3Q6IFRlbGVtZXRyeUF1ZGl0UmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52OiAnc2RrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZTogQXVkaXRTdGF0ZS5BVURJVF9DUkVBVEVELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkUHJvcGVydGllczogT2JqZWN0VXRpbC5nZXRUcnV0aHlQcm9wcyhwcm9maWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IHByb2ZpbGUudWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBPYmplY3RUeXBlLlVTRVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9maWxlLnByb2ZpbGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1VzZXJSb2xlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmF1ZGl0KGF1ZGl0UmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gb2YocHJvZmlsZSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlUHJvZmlsZSh1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFt1aWRdLFxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyb3dzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyb3dzIHx8ICFyb3dzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb1Byb2ZpbGVGb3VuZEVycm9yKGBObyBQcm9maWxlIGZvdW5kIHdpdGggSUQgJHt1aWR9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb2ZpbGVEYkVudHJ5TWFwcGVyLm1hcFByb2ZpbGVEQkVudHJ5VG9Qcm9maWxlKHJvd3NbMF0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoYXN5bmMgKHByb2ZpbGU6IFByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHNlc3Npb246IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5pZCA9IHNlc3Npb24udWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnR5cGUgPSBBY3Rvci5UWVBFX1NZU1RFTTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF1ZGl0UmVxdWVzdDogVGVsZW1ldHJ5QXVkaXRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiBBdWRpdFN0YXRlLkFVRElUX0RFTEVURUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iaklkOiB1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialR5cGU6IE9iamVjdFR5cGUuVVNFUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHByb2ZpbGUucHJvZmlsZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnVXNlclJvbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbGVtZXRyeVNlcnZpY2UuYXVkaXQoYXVkaXRSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdWlkXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9maWxlKHByb2ZpbGU6IFByb2ZpbGUpOiBPYnNlcnZhYmxlPFByb2ZpbGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3Byb2ZpbGUudWlkXSxcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocm93cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcm93cyB8fCAhcm93c1swXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Qcm9maWxlRm91bmRFcnJvcihgTm8gUHJvZmlsZSBmb3VuZCB3aXRoIElEICR7cHJvZmlsZS51aWR9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb2ZpbGVEYkVudHJ5TWFwcGVyLm1hcFByb2ZpbGVEQkVudHJ5VG9Qcm9maWxlKHJvd3NbMF0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoYXN5bmMgKHByZXZQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChzZXNzaW9uOiBQcm9maWxlU2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmlkID0gc2Vzc2lvbi51aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci50eXBlID0gQWN0b3IuVFlQRV9TWVNURU07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF1ZGl0UmVxdWVzdDogVGVsZW1ldHJ5QXVkaXRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiBBdWRpdFN0YXRlLkFVRElUX1VQREFURUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFByb3BlcnRpZXM6IE9iamVjdFV0aWwuZ2V0UHJvcERpZmYocHJvZmlsZSwgcHJldlByb2ZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iaklkOiBwcm9maWxlLnVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBPYmplY3RUeXBlLlVTRVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvZmlsZS5wcm9maWxlVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1VzZXJSb2xlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmF1ZGl0KGF1ZGl0UmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVEQkVudHJ5ID0gUHJvZmlsZURiRW50cnlNYXBwZXIubWFwUHJvZmlsZVRvUHJvZmlsZURCRW50cnkocHJvZmlsZSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb2ZpbGVEQkVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9DUkVBVEVEX0FUXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3Byb2ZpbGUudWlkXSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBwcm9maWxlREJFbnRyeVxuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IG9mKHByb2ZpbGUpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlcnZlclByb2ZpbGUodXBkYXRlVXNlckluZm9SZXF1ZXN0OiBVcGRhdGVTZXJ2ZXJQcm9maWxlSW5mb1JlcXVlc3QpOiBPYnNlcnZhYmxlPFVwZGF0ZVNlcnZlclByb2ZpbGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS51cGRhdGVQcm9maWxlKHVwZGF0ZVVzZXJJbmZvUmVxdWVzdCwgeyBhcGlQYXRoIDogJy9hcGkvdXNlci92Myd9KTtcbiAgICB9XG5cbiAgICBnZXRUZW5hbnRJbmZvKHRlbmFudEluZm9SZXF1ZXN0OiBUZW5hbnRJbmZvUmVxdWVzdCk6IE9ic2VydmFibGU8VGVuYW50SW5mbz4ge1xuICAgICAgICByZXR1cm4gbmV3IFRlbmFudEluZm9IYW5kbGVyKHRoaXMuYXBpU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLnByb2ZpbGVTZXJ2aWNlQ29uZmlnKS5oYW5kbGUodGVuYW50SW5mb1JlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldEFsbFByb2ZpbGVzKHByb2ZpbGVSZXF1ZXN0PzogR2V0QWxsUHJvZmlsZVJlcXVlc3QpOiBPYnNlcnZhYmxlPFByb2ZpbGVbXT4ge1xuICAgICAgICBpZiAoIXByb2ZpbGVSZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdXG4gICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocHJvZmlsZXM6IFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSkgPT4gdGhpcy5tYXBEYlByb2ZpbGVFbnRyaWVzVG9Qcm9maWxlcyhwcm9maWxlcykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwcm9maWxlUmVxdWVzdC5ncm91cElkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICAgICAgdGFibGU6IFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1NPVVJDRX0gPSA/YCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcHJvZmlsZVJlcXVlc3QubG9jYWwgPyBQcm9maWxlU291cmNlLkxPQ0FMIDogUHJvZmlsZVNvdXJjZS5TRVJWRVJdLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdXG4gICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocHJvZmlsZXM6IFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSkgPT4gdGhpcy5tYXBEYlByb2ZpbGVFbnRyaWVzVG9Qcm9maWxlcyhwcm9maWxlcykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2ZpbGVSZXF1ZXN0Lmdyb3VwSWQgJiYgKHByb2ZpbGVSZXF1ZXN0LmxvY2FsIHx8IHByb2ZpbGVSZXF1ZXN0LnNlcnZlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKGBcbiAgICAgICAgICAgICAgICBTRUxFQ1QgKiBGUk9NICR7UHJvZmlsZUVudHJ5LlRBQkxFX05BTUV9IExFRlQgSk9JTiAke0dyb3VwUHJvZmlsZUVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICAgICAgT04gJHtQcm9maWxlRW50cnkuVEFCTEVfTkFNRX0uJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9XG4gICAgICAgICAgICAgICAgJHtHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FfS4ke0dyb3VwUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH1cbiAgICAgICAgICAgICAgICBXSEVSRSAke0dyb3VwUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0dJRH0gPSBcIiR7cHJvZmlsZVJlcXVlc3QuZ3JvdXBJZH1cIiBBTkRcbiAgICAgICAgICAgICAgICAke1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9TT1VSQ0V9ID0gXCIke3Byb2ZpbGVSZXF1ZXN0LmxvY2FsID8gUHJvZmlsZVNvdXJjZS5MT0NBTCA6IFByb2ZpbGVTb3VyY2UuU0VSVkVSfVwiXG4gICAgICAgICAgICBgKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocHJvZmlsZXM6IFByb2ZpbGVFbnRyeS5TY2hlbWFNYXBbXSkgPT4gdGhpcy5tYXBEYlByb2ZpbGVFbnRyaWVzVG9Qcm9maWxlcyhwcm9maWxlcykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShgXG4gICAgICAgICAgICBTRUxFQ1QgKiBGUk9NICR7UHJvZmlsZUVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICBMRUZUIEpPSU4gJHtHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FfSBPTlxuICAgICAgICAgICAgJHtQcm9maWxlRW50cnkuVEFCTEVfTkFNRX0uJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9XG4gICAgICAgICAgICAke0dyb3VwUHJvZmlsZUVudHJ5LlRBQkxFX05BTUV9LiR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfVxuICAgICAgICAgICAgV0hFUkUgJHtHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FfS4ke0dyb3VwUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0dJRH0gPSBcIiR7cHJvZmlsZVJlcXVlc3QuZ3JvdXBJZH1cIlxuICAgICAgICBgKS5waXBlKFxuICAgICAgICAgICAgbWFwKChwcm9maWxlczogUHJvZmlsZUVudHJ5LlNjaGVtYU1hcFtdKSA9PiB0aGlzLm1hcERiUHJvZmlsZUVudHJpZXNUb1Byb2ZpbGVzKHByb2ZpbGVzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRTZXJ2ZXJQcm9maWxlc0RldGFpbHMoc2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0OiBTZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFNlcnZlclByb2ZpbGU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZXRTZXJ2ZXJQcm9maWxlRGV0YWlsc0hhbmRsZXIodGhpcy5jYWNoZWRJdGVtU3RvcmUsIHRoaXMua2V5VmFsdWVTdG9yZSwgdGhpcy5jb250YWluZXIsIHRoaXMucHJvZmlsZVNlcnZpY2VDb25maWcpXG4gICAgICAgICAgLmhhbmRsZShzZXJ2ZXJQcm9maWxlRGV0YWlsc1JlcXVlc3QpO1xuICAgIH1cblxuICAgIGdldEFjdGl2ZVNlc3Npb25Qcm9maWxlKHtyZXF1aXJlZEZpZWxkc306IFBpY2s8U2VydmVyUHJvZmlsZURldGFpbHNSZXF1ZXN0LCAncmVxdWlyZWRGaWVsZHMnPik6IE9ic2VydmFibGU8UHJvZmlsZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocHJvZmlsZVNlc3Npb246IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogUHJvZmlsZUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3Byb2ZpbGVTZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gcHJvZmlsZVNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogcHJvZmlsZVNlc3Npb24udWlkXVxuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocm93cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZURCRW50cnkgPSByb3dzICYmIHJvd3NbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvZmlsZURCRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Qcm9maWxlRm91bmRFcnJvcihgTm8gcHJvZmlsZSBmb3VuZCBmb3IgcHJvZmlsZVNlc3Npb24gd2l0aCB1aWQgJHtwcm9maWxlU2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHByb2ZpbGVTZXNzaW9uLm1hbmFnZWRTZXNzaW9uLnVpZCA6IHByb2ZpbGVTZXNzaW9uLnVpZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb2ZpbGVEYkVudHJ5TWFwcGVyLm1hcFByb2ZpbGVEQkVudHJ5VG9Qcm9maWxlKHByb2ZpbGVEQkVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChwcm9maWxlOiBQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZmlsZS5zb3VyY2UgPT09IFByb2ZpbGVTb3VyY2UuU0VSVkVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VydmVyUHJvZmlsZXNEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBwcm9maWxlLnVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKHNlcnZlclByb2ZpbGU6IFNlcnZlclByb2ZpbGUpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlOiBzZXJ2ZXJQcm9maWxlLmZpcnN0TmFtZSArIChzZXJ2ZXJQcm9maWxlLmxhc3ROYW1lID8gJyAnICsgc2VydmVyUHJvZmlsZS5sYXN0TmFtZSA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclByb2ZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHByb2ZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVNlc3Npb25Gb3JQcm9maWxlKHByb2ZpbGVVaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoKCkgPT4gdGhpcy5nZW5lcmF0ZVNlc3Npb25FbmRUZWxlbWV0cnkoKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcHJvZmlsZVVpZF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChyb3dzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pID0+XG4gICAgICAgICAgICAgICAgcm93cyAmJiByb3dzWzBdICYmIFByb2ZpbGVEYkVudHJ5TWFwcGVyLm1hcFByb2ZpbGVEQkVudHJ5VG9Qcm9maWxlKHJvd3NbMF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKChwcm9maWxlOiBQcm9maWxlIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb1Byb2ZpbGVGb3VuZEVycm9yKCdObyBQcm9maWxlIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgocHJvZmlsZTogUHJvZmlsZSkgPT5cbiAgICAgICAgICAgICAgICBpaWYoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHByb2ZpbGUuc291cmNlID09PSBQcm9maWxlU291cmNlLlNFUlZFUixcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VydmVyUHJvZmlsZXNEZXRhaWxzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHByb2ZpbGUudWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKHNlcnZlclByb2ZpbGU6IFNlcnZlclByb2ZpbGUpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclByb2ZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGF0dGFjaGVkU2VydmVyUHJvZmlsZURldGFpbHNQcm9maWxlOiBQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYW1ld29ya1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRBY3RpdmVDaGFubmVsSWQoYXR0YWNoZWRTZXJ2ZXJQcm9maWxlRGV0YWlsc1Byb2ZpbGUuc2VydmVyUHJvZmlsZSEucm9vdE9yZy5oYXNoVGFnSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YodW5kZWZpbmVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1ld29ya1NlcnZpY2Uuc2V0QWN0aXZlQ2hhbm5lbElkKHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZy5hcGlfYXV0aGVudGljYXRpb24uY2hhbm5lbElkKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXBUbyhwcm9maWxlKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcCgocHJvZmlsZTogUHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpbGVTZXNzaW9uID0gbmV3IFByb2ZpbGVTZXNzaW9uKHByb2ZpbGUudWlkKTtcbiAgICAgICAgICAgICAgICBpZiAoQ3NNb2R1bGUuaW5zdGFuY2UuaXNJbml0aWFsaXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBDc01vZHVsZS5pbnN0YW5jZS51cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29yZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLkNzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5Dc01vZHVsZS5pbnN0YW5jZS5jb25maWcuY29yZS5nbG9iYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25JZDogcHJvZmlsZVNlc3Npb24uc2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICBQcm9maWxlU2VydmljZUltcGwuS0VZX1VTRVJfU0VTU0lPTiwgSlNPTi5zdHJpbmdpZnkocHJvZmlsZVNlc3Npb24pXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXBUbyh0cnVlKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiBhd2FpdCB0aGlzLmdlbmVyYXRlU2Vzc2lvblN0YXJ0VGVsZW1ldHJ5KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKTogT2JzZXJ2YWJsZTxQcm9maWxlU2Vzc2lvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoUHJvZmlsZVNlcnZpY2VJbXBsLktFWV9VU0VSX1NFU1NJT04pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9BY3RpdmVTZXNzaW9uRXJyb3IoJ05vIGFjdGl2ZSBzZXNzaW9uIGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhY2NlcHRUZXJtc0FuZENvbmRpdGlvbnMoYWNjZXB0VGVybXNDb25kaXRpb25zOiBBY2NlcHRUZXJtc0NvbmRpdGlvblJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBY2NlcHRUZXJtQ29uZGl0aW9uSGFuZGxlcih0aGlzLmFwaVNlcnZpY2UsIHRoaXMuc2RrQ29uZmlnLnByb2ZpbGVTZXJ2aWNlQ29uZmlnKS5oYW5kbGUoYWNjZXB0VGVybXNDb25kaXRpb25zKTtcbiAgICB9XG5cbiAgICBpc1Byb2ZpbGVBbHJlYWR5SW5Vc2UoaXNQcm9maWxlQWxyZWFkeUluVXNlUmVxdWVzdDogSXNQcm9maWxlQWxyZWFkeUluVXNlUmVxdWVzdCk6IE9ic2VydmFibGU8UHJvZmlsZUV4aXN0c1Jlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBuZXcgSXNQcm9maWxlQWxyZWFkeUluVXNlSGFuZGxlcih0aGlzLmFwaVNlcnZpY2UsIHRoaXMuc2RrQ29uZmlnLnByb2ZpbGVTZXJ2aWNlQ29uZmlnKS5oYW5kbGUoaXNQcm9maWxlQWxyZWFkeUluVXNlUmVxdWVzdCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVPVFAoZ2VuZXJhdGVPdHBSZXF1ZXN0OiBHZW5lcmF0ZU90cFJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZU90cEhhbmRsZXIodGhpcy5hcGlTZXJ2aWNlLCB0aGlzLnNka0NvbmZpZy5wcm9maWxlU2VydmljZUNvbmZpZykuaGFuZGxlKGdlbmVyYXRlT3RwUmVxdWVzdCk7XG4gICAgfVxuXG4gICAgdmVyaWZ5T1RQKHZlcmlmeU9UUFJlcXVlc3Q6IFZlcmlmeU90cFJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZXJpZnlPdHBIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcpLmhhbmRsZSh2ZXJpZnlPVFBSZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBzZWFyY2hMb2NhdGlvbihsb2NhdGlvblNlYXJjaENyaXRlcmlhOiBMb2NhdGlvblNlYXJjaENyaXRlcmlhKTogT2JzZXJ2YWJsZTxMb2NhdGlvblNlYXJjaFJlc3VsdFtdPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoTG9jYXRpb25IYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcsIHRoaXMuZmlsZVNlcnZpY2UsIHRoaXMuY2FjaGVkSXRlbVN0b3JlKVxuICAgICAgICAgICAgLmhhbmRsZShsb2NhdGlvblNlYXJjaENyaXRlcmlhKTtcbiAgICB9XG5cbiAgICBnZXRBbGxDb250ZW50QWNjZXNzKGNyaXRlcmlhOiBDb250ZW50QWNjZXNzRmlsdGVyQ3JpdGVyaWEpOiBPYnNlcnZhYmxlPENvbnRlbnRBY2Nlc3NbXT4ge1xuXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtDb250ZW50QWNjZXNzRW50cnkuVEFCTEVfTkFNRX0gJHtDb250ZW50VXRpbC5nZXRVaWRuSWRlbnRpZmllckZpbGVyKFxuICAgICAgICAgICAgY3JpdGVyaWEudWlkLCBjcml0ZXJpYS5jb250ZW50SWQpfWA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnRlbnRBY2Nlc3NMaXN0OiBDb250ZW50QWNjZXNzRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudEFjY2Vzc0xpc3QubWFwKChjb250ZW50QWNjZXNzOiBDb250ZW50QWNjZXNzRW50cnkuU2NoZW1hTWFwKSA9PlxuICAgICAgICAgICAgICAgICAgICBQcm9maWxlSGFuZGxlci5tYXBEQkVudHJ5VG9Db250ZW5ldEFjY2Vzcyhjb250ZW50QWNjZXNzKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZENvbnRlbnRBY2Nlc3MoY29udGVudEFjY2VzczogQ29udGVudEFjY2Vzcyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoe3VpZH06IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEFjY2Vzc0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke0NvbnRlbnRBY2Nlc3NFbnRyeS5DT0xVTU5fTkFNRV9VSUR9PSA/IEFORCAke0NvbnRlbnRBY2Nlc3NFbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5DT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVJ9PSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZCwgY29udGVudEFjY2Vzcy5jb250ZW50SWRdLFxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiBgJHtDb250ZW50QWNjZXNzRW50cnkuQ09MVU1OX05BTUVfRVBPQ0hfVElNRVNUQU1QfSBERVNDYCxcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChjb250ZW50QWNjZXNzSW5EYjogQ29udGVudEFjY2Vzc0VudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50QWNjZXNzRGJNb2RlbDogQ29udGVudEFjY2Vzc0VudHJ5LlNjaGVtYU1hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IHVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50QWNjZXNzLmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcG9jaF90aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBDb250ZW50QWNjZXNzU3RhdHVzLlBMQVlFRC52YWx1ZU9mKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF90eXBlOiBjb250ZW50QWNjZXNzLmNvbnRlbnRUeXBlICYmIGNvbnRlbnRBY2Nlc3MuY29udGVudFR5cGUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFybmVyX3N0YXRlOiBjb250ZW50QWNjZXNzLmNvbnRlbnRMZWFybmVyU3RhdGUhICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGNvbnRlbnRBY2Nlc3MuY29udGVudExlYXJuZXJTdGF0ZSEubGVhcm5lclN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50QWNjZXNzSW5EYiAmJiBjb250ZW50QWNjZXNzSW5EYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QWNjZXNzRGJNb2RlbC5zdGF0dXMgPSBjb250ZW50QWNjZXNzSW5EYlswXVtDb250ZW50QWNjZXNzRW50cnkuQ09MVU1OX05BTUVfU1RBVFVTXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRBY2Nlc3NFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtDb250ZW50QWNjZXNzRW50cnkuQ09MVU1OX05BTUVfVUlEfT0gPyBBTkQgJHtDb250ZW50QWNjZXNzRW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQ09MVU1OX05BTUVfQ09OVEVOVF9JREVOVElGSUVSfT0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFt1aWQsIGNvbnRlbnRBY2Nlc3MuY29udGVudElkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBjb250ZW50QWNjZXNzRGJNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCh2ID0+IHYgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEFjY2Vzc0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogY29udGVudEFjY2Vzc0RiTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGV4cG9ydFByb2ZpbGUocHJvZmlsZUV4cG9ydFJlcXVlc3Q6IFByb2ZpbGVFeHBvcnRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxQcm9maWxlRXhwb3J0UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgZXhwb3J0UHJvZmlsZUNvbnRleHQ6IEV4cG9ydFByb2ZpbGVDb250ZXh0ID0ge1xuICAgICAgICAgICAgdXNlcklkczogcHJvZmlsZUV4cG9ydFJlcXVlc3QudXNlcklkcyxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uRm9sZGVyOiBwcm9maWxlRXhwb3J0UmVxdWVzdC5kZXN0aW5hdGlvbkZvbGRlcixcbiAgICAgICAgICAgIGdyb3VwSWRzOiBwcm9maWxlRXhwb3J0UmVxdWVzdC5ncm91cElkcyFcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnJvbShcbiAgICAgICAgICAgIG5ldyBHZXRFcGFyRmlsZVBhdGgodGhpcy5maWxlU2VydmljZSkuZXhlY3V0ZShleHBvcnRQcm9maWxlQ29udGV4dCkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb3B5RGF0YWJhc2UodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUHJvZmlsZUV4cG9ydFJlc3BvbnNlID0ge2V4cG9ydGVkRmlsZVBhdGg6ICcnfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENyZWF0ZU1ldGFEYXRhKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLmRldmljZUluZm8pLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChleHBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUHJvZmlsZUV4cG9ydFJlc3BvbnNlID0ge2V4cG9ydGVkRmlsZVBhdGg6ICcnfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENsZWFudXBFeHBvcnRlZEZpbGUodGhpcy5kYlNlcnZpY2UsIHRoaXMuZmlsZVNlcnZpY2UpLmV4ZWN1dGUoZXhwb3J0UmVzcG9uc2UuYm9keSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IGV4cG9ydFJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKGV4cG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGVQcm9maWxlRXhwb3J0VGVsZW1ldHJ5KHRoaXMuZGJTZXJ2aWNlKS5leGVjdXRlKGV4cG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgfSkudGhlbigoZXhwb3J0UmVzcG9uc2U6IFJlc3BvbnNlPEV4cG9ydFByb2ZpbGVDb250ZXh0PikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7ZXhwb3J0ZWRGaWxlUGF0aDogZXhwb3J0UmVzcG9uc2UuYm9keS5kZXN0aW5hdGlvbkRCRmlsZVBhdGghfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBpbXBvcnRQcm9maWxlKHByb2ZpbGVJbXBvcnRSZXF1ZXN0OiBQcm9maWxlSW1wb3J0UmVxdWVzdCk6IE9ic2VydmFibGU8UHJvZmlsZUltcG9ydFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGltcG9ydFByb2ZpbGVDb250ZXh0OiBJbXBvcnRQcm9maWxlQ29udGV4dCA9IHtcbiAgICAgICAgICAgIHNvdXJjZURCRmlsZVBhdGg6IHByb2ZpbGVJbXBvcnRSZXF1ZXN0LnNvdXJjZUZpbGVQYXRoLFxuXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmcm9tKFxuICAgICAgICAgICAgbmV3IFZhbGlkYXRlUHJvZmlsZU1ldGFkYXRhKHRoaXMuZGJTZXJ2aWNlKS5leGVjdXRlKGltcG9ydFByb2ZpbGVDb250ZXh0KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRyYW5zcG9ydFVzZXIodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRyYW5zcG9ydFByb2ZpbGVzKHRoaXMuZGJTZXJ2aWNlKS5leGVjdXRlKGltcG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFuc3BvcnRHcm91cCh0aGlzLmRiU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHJhbnNwb3J0R3JvdXBQcm9maWxlKHRoaXMuZGJTZXJ2aWNlKS5leGVjdXRlKGltcG9ydFJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgfSkudGhlbigoaW1wb3J0UmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFuc3BvcnRGcmFtZXdvcmtOQ2hhbm5lbCh0aGlzLmRiU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVHJhbnNwb3J0QXNzZXNtZW50cyh0aGlzLmRiU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXBkYXRlSW1wb3J0ZWRQcm9maWxlTWV0YWRhdGEodGhpcy5kYlNlcnZpY2UpLmV4ZWN1dGUoaW1wb3J0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICB9KS50aGVuKChpbXBvcnRSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlUHJvZmlsZUltcG9ydFRlbGVtZXRyeSh0aGlzLmRiU2VydmljZSkuZXhlY3V0ZShpbXBvcnRSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oKGltcG9ydFJlc3BvbnNlOiBSZXNwb25zZTxJbXBvcnRQcm9maWxlQ29udGV4dD4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2ZhaWxlZDogaW1wb3J0UmVzcG9uc2UuYm9keS5mYWlsZWQhLCBpbXBvcnRlZDogaW1wb3J0UmVzcG9uc2UuYm9keS5pbXBvcnRlZCF9O1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIG1lcmdlU2VydmVyUHJvZmlsZXMobWVyZ2VTZXJ2ZXJQcm9maWxlc1JlcXVlc3Q6IE1lcmdlU2VydmVyUHJvZmlsZXNSZXF1ZXN0KTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgYXBpUmVxdWVzdCA9IG5ldyBSZXF1ZXN0LkJ1aWxkZXIoKVxuICAgICAgICAgICAgLndpdGhUeXBlKEh0dHBSZXF1ZXN0VHlwZS5QQVRDSClcbiAgICAgICAgICAgIC53aXRoUGF0aChQcm9maWxlU2VydmljZUltcGwuTUVSR0VfU0VSVkVSX1BST0ZJTEVTX1BBVEgpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAud2l0aEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICd4LXNvdXJjZS11c2VyLXRva2VuJzogbWVyZ2VTZXJ2ZXJQcm9maWxlc1JlcXVlc3QuZnJvbS5hY2Nlc3NUb2tlbixcbiAgICAgICAgICAgICAgICAneC1hdXRoZW50aWNhdGVkLXVzZXItdG9rZW4nOiBtZXJnZVNlcnZlclByb2ZpbGVzUmVxdWVzdC50by5hY2Nlc3NUb2tlblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aXRoQm9keSh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgICAgICAgICBmcm9tQWNjb3VudElkOiBtZXJnZVNlcnZlclByb2ZpbGVzUmVxdWVzdC5mcm9tLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgdG9BY2NvdW50SWQ6IG1lcmdlU2VydmVyUHJvZmlsZXNSZXF1ZXN0LnRvLnVzZXJJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoKGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhdW5jaFVybCA9IHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZy51c2VyX2F1dGhlbnRpY2F0aW9uLm1lcmdlVXNlckhvc3QgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNka0NvbmZpZy5hcGlDb25maWcudXNlcl9hdXRoZW50aWNhdGlvbi5hdXRoVXJsICsgJy9sb2dvdXQnICsgJz9yZWRpcmVjdF91cmk9JyArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLmFwaUNvbmZpZy5ob3N0ICsgJy9vYXV0aDJjYWxsYmFjayc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbkFwcEJyb3dzZXJSZWYgPSBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuKGxhdW5jaFVybCwgJ19ibGFuaycsICd6b29tPW5vLGhpZGRlbj15ZXMnKTtcblxuICAgICAgICAgICAgICAgIGluQXBwQnJvd3NlclJlZi5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCg8c3RyaW5nPiBldmVudC51cmwpLmluZGV4T2YoJy9vYXV0aDJjYWxsYmFjaycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluQXBwQnJvd3NlclJlZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlzRGVmYXVsdENoYW5uZWxQcm9maWxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldERlZmF1bHRDaGFubmVsSWQoKSxcbiAgICAgICAgICAgIHRoaXMuZnJhbWV3b3JrU2VydmljZS5nZXRBY3RpdmVDaGFubmVsSWQoKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0c1swXSA9PT0gcmVzdWx0c1sxXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0VXNlckZlZWQoKTogT2JzZXJ2YWJsZTxVc2VyRmVlZEVudHJ5W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyRmVlZChzZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbi51aWQgOiBzZXNzaW9uLnVpZCwge1xuICAgICAgICAgICAgICAgICAgICBhcGlQYXRoOiB0aGlzLnNka0NvbmZpZy5wcm9maWxlU2VydmljZUNvbmZpZy5wcm9maWxlQXBpUGF0aF9WNVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVVc2VyRmVlZEVudHJ5KHVwZGF0ZVVzZXJGZWVkUmVxdWVzdDogVXBkYXRlVXNlckZlZWRSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlckZlZWRFbnRyeShcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogc2Vzc2lvbi51aWQsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVVzZXJGZWVkUmVxdWVzdC5mZWVkRW50cnlJZCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVXNlckZlZWRSZXF1ZXN0LmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVc2VyRmVlZFJlcXVlc3QucmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpUGF0aDogdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcucHJvZmlsZUFwaVBhdGhfVjVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwVG8odHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoZmFsc2UpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZVVzZXJGZWVkRW50cnkoZGVsZXRlVXNlckZlZWRSZXF1ZXN0OiBEZWxldGVVc2VyRmVlZFJlcXVlc3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5kZWxldGVVc2VyRmVlZEVudHJ5KFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbi51aWQgOiBzZXNzaW9uLnVpZCxcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlVXNlckZlZWRSZXF1ZXN0LmZlZWRFbnRyeUlkLFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVVc2VyRmVlZFJlcXVlc3QuY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVBhdGg6IHRoaXMuc2RrQ29uZmlnLnByb2ZpbGVTZXJ2aWNlQ29uZmlnLnByb2ZpbGVBcGlQYXRoXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcFRvKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKGZhbHNlKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1c2VyTWlncmF0ZSh1c2VyTWlncmF0ZVJlcXVlc3Q6IFVzZXJNaWdyYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8VXNlck1pZ3JhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFVzZXJNaWdyYXRlSGFuZGxlcih0aGlzLnNka0NvbmZpZywgdGhpcy5hcGlTZXJ2aWNlKVxuICAgICAgICAgICAgLmhhbmRsZSh1c2VyTWlncmF0ZVJlcXVlc3QpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlcnZlclByb2ZpbGVEZWNsYXJhdGlvbnMocmVxdWVzdDogVXBkYXRlU2VydmVyUHJvZmlsZURlY2xhcmF0aW9uc1JlcXVlc3QpOiBPYnNlcnZhYmxlPFVwZGF0ZVNlcnZlclByb2ZpbGVEZWNsYXJhdGlvbnNSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS51cGRhdGVVc2VyRGVjbGFyYXRpb25zKHJlcXVlc3QuZGVjbGFyYXRpb25zLFxuICAgICAgICAgICAge2FwaVBhdGggOiB0aGlzLnNka0NvbmZpZy5wcm9maWxlU2VydmljZUNvbmZpZy5wcm9maWxlQXBpUGF0aH0pO1xuICAgIH1cblxuICAgIGdldENvbnNlbnQodXNlckNvbnNlbnQ6IENvbnNlbnQpOiBPYnNlcnZhYmxlPFJlYWRDb25zZW50UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0Q29uc2VudCh1c2VyQ29uc2VudCwgeyBhcGlQYXRoIDogdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcucHJvZmlsZUFwaVBhdGh9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb25zZW50KHVzZXJDb25zZW50OiBDb25zZW50KTogT2JzZXJ2YWJsZTxVcGRhdGVDb25zZW50UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UudXBkYXRlQ29uc2VudCh1c2VyQ29uc2VudCwgeyBhcGlQYXRoIDogdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcucHJvZmlsZUFwaVBhdGh9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcERiUHJvZmlsZUVudHJpZXNUb1Byb2ZpbGVzKHByb2ZpbGVzOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwW10pOiBQcm9maWxlW10ge1xuICAgICAgICByZXR1cm4gcHJvZmlsZXMubWFwKChwcm9maWxlOiBQcm9maWxlRW50cnkuU2NoZW1hTWFwKSA9PiBQcm9maWxlRGJFbnRyeU1hcHBlci5tYXBQcm9maWxlREJFbnRyeVRvUHJvZmlsZShwcm9maWxlKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVNlc3Npb25TdGFydFRlbGVtZXRyeSgpIHtcbiAgICAgICAgcmV0dXJuIFRlbGVtZXRyeUxvZ2dlci5sb2cuc3RhcnQoe1xuICAgICAgICAgICAgdHlwZTogJ3Nlc3Npb24nLCBlbnY6ICdzZGsnXG4gICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZ2VuZXJhdGVTZXNzaW9uRW5kVGVsZW1ldHJ5KCkge1xuICAgICAgICBjb25zdCBzZXNzaW9uU3RyaW5nID0gYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoUHJvZmlsZVNlcnZpY2VJbXBsLktFWV9VU0VSX1NFU1NJT04pLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIGlmIChzZXNzaW9uU3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlU2Vzc2lvbiA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0cmluZyk7XG5cbiAgICAgICAgICAgIGF3YWl0IFRlbGVtZXRyeUxvZ2dlci5sb2cuZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgZW52OiAnc2RrJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIHByb2ZpbGVTZXNzaW9uLmNyZWF0ZWRUaW1lKSAvIDEwMDApXG4gICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVByb2ZpbGVEYXRhKHVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgRGVsZXRlUHJvZmlsZURhdGFIYW5kbGVyKHRoaXMuZGJTZXJ2aWNlKS5kZWxldGUodWlkKTtcbiAgICB9XG5cbiAgICBkZWxldGVVc2VyKGRlbGV0ZVVzZXJSZXF1ZXN0OiBEZWxldGVVc2VyUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IERlbGV0ZUFjY291bnRIYW5kbGVyKHRoaXMuYXBpU2VydmljZSwgdGhpcy5zZGtDb25maWcucHJvZmlsZVNlcnZpY2VDb25maWcpLmhhbmRsZShkZWxldGVVc2VyUmVxdWVzdCk7XG4gICAgfVxufVxuXG4iXX0=