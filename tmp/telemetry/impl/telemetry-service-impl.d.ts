import { DbService } from '../../db';
import { Context, TelemetryAuditRequest, TelemetryDecorator, TelemetryEndRequest, TelemetryErrorRequest, TelemetryFeedbackRequest, TelemetryImportRequest, TelemetryImpressionRequest, TelemetryInteractRequest, TelemetryInterruptRequest, TelemetryLogRequest, TelemetryService, TelemetryShareRequest, TelemetryStartRequest, TelemetryStat, TelemetrySummaryRequest, TelemetrySyncRequest, TelemetrySyncStat } from '..';
import { ProfileService } from '../../profile';
import { GroupServiceDeprecated } from '../../group-deprecated';
import { KeyValueStore } from '../../key-value-store';
import { ApiService } from '../../api';
import { DeviceInfo } from '../../util/device';
import { EventsBusService } from '../../events-bus';
import { FileService } from '../../util/file/def/file-service';
import { FrameworkService } from '../../framework';
import { NetworkInfoService } from '../../util/network';
import { SdkConfig } from '../../sdk-config';
import { ErrorLoggerService } from '../../error';
import { SharedPreferences } from '../../util/shared-preferences';
import { AppInfo } from '../../util/app';
import { DeviceRegisterService } from '../../device-register';
import { Observable } from 'rxjs';
import { TelemetryAutoSyncServiceImpl } from '../util/telemetry-auto-sync-service-impl';
import { CourseService } from '../../course';
import { NetworkQueue } from '../../api/network-queue';
import { CorrelationData } from '../def/telemetry-model';
import { SdkServiceOnInitDelegate } from '../../sdk-service-on-init-delegate';
import { SdkServicePreInitDelegate } from '../../sdk-service-pre-init-delegate';
export declare class TelemetryServiceImpl implements TelemetryService, SdkServiceOnInitDelegate, SdkServicePreInitDelegate {
    private dbService;
    private decorator;
    private profileService;
    private groupService;
    private keyValueStore;
    private apiService;
    private sdkConfig;
    private deviceInfo;
    private eventsBusService;
    private fileService;
    private frameworkService;
    private networkInfoService;
    private errorLoggerService;
    private sharedPreferences;
    private appInfoService;
    private deviceRegisterService;
    private courseService;
    private networkQueue;
    private _lastSyncedTimestamp$;
    private telemetryAutoSyncService?;
    private telemetryConfig;
    private campaignParameters;
    private globalCdata;
    get autoSync(): TelemetryAutoSyncServiceImpl;
    constructor(dbService: DbService, decorator: TelemetryDecorator, profileService: ProfileService, groupService: GroupServiceDeprecated, keyValueStore: KeyValueStore, apiService: ApiService, sdkConfig: SdkConfig, deviceInfo: DeviceInfo, eventsBusService: EventsBusService, fileService: FileService, frameworkService: FrameworkService, networkInfoService: NetworkInfoService, errorLoggerService: ErrorLoggerService, sharedPreferences: SharedPreferences, appInfoService: AppInfo, deviceRegisterService: DeviceRegisterService, courseService: CourseService, networkQueue: NetworkQueue);
    preInit(): Observable<undefined>;
    onInit(): Observable<undefined>;
    saveTelemetry(request: string): Observable<boolean>;
    audit({ env, actor, currentState, updatedProperties, type, objId, objType, objVer, correlationData, rollUp }: TelemetryAuditRequest): Observable<boolean>;
    end({ type, mode, duration, pageId, summaryList, env, objId, objType, objVer, rollup, correlationData }: TelemetryEndRequest): Observable<boolean>;
    error(request: TelemetryErrorRequest): Observable<boolean>;
    impression({ type, subType, pageId, visits, env, objId, objType, objVer, rollup, correlationData }: TelemetryImpressionRequest): Observable<boolean>;
    interact({ type, subType, id, pageId, pos, env, rollup, valueMap, correlationData, objId, objType, objVer }: TelemetryInteractRequest): Observable<boolean>;
    log({ type, level, message, pageId, params, env, actorType }: TelemetryLogRequest): Observable<boolean>;
    share({ dir, type, items, correlationData, objId, objType, objVer, rollUp }: TelemetryShareRequest): Observable<boolean>;
    feedback({ rating, comments, env, objId, objType, objVer, commentid, commenttxt }: TelemetryFeedbackRequest): Observable<boolean>;
    start({ type, deviceSpecification, loc, mode, duration, pageId, env, objId, objType, objVer, rollup, correlationData }: TelemetryStartRequest): Observable<boolean>;
    summary({ type, starttime, endtime, timespent, pageviews, interactions, env, mode, envsummary, eventsummary, pagesummary, extra, correlationData, objId, objType, objVer, rollup }: TelemetrySummaryRequest): Observable<boolean>;
    interrupt({ type, pageId }: TelemetryInterruptRequest): Observable<boolean>;
    importTelemetry(importTelemetryRequest: TelemetryImportRequest): Observable<boolean>;
    getTelemetryStat(): Observable<TelemetryStat>;
    resetDeviceRegisterTTL(): Observable<undefined>;
    sync(telemetrySyncRequest?: TelemetrySyncRequest): Observable<TelemetrySyncStat>;
    lastSyncedTimestamp(): Observable<number | undefined>;
    buildContext(): Observable<Context>;
    private decorateAndPersist;
    updateCampaignParameters(params: CorrelationData[]): void;
    populateGlobalCorRelationData(params: CorrelationData[]): void;
    private getInitialUtmParameters;
}