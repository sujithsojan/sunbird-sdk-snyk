import {TelemetryStat} from './telemetry-stat';
import {TelemetrySyncStat} from './telemetry-sync-stat';
import {Observable} from 'rxjs';
import {
    TelemetryAuditRequest,
    TelemetryEndRequest,
    TelemetryErrorRequest,
    TelemetryFeedbackRequest,
    TelemetryImportRequest,
    TelemetryImpressionRequest,
    TelemetryInteractRequest,
    TelemetryInterruptRequest,
    TelemetryLogRequest,
    TelemetryShareRequest,
    TelemetryStartRequest,
    TelemetrySummaryRequest,
    TelemetrySyncRequest
} from './requests';
import {Context, CorrelationData} from './telemetry-model';
import {SdkServiceOnInitDelegate} from '../../sdk-service-on-init-delegate';
import {TelemetryAutoSyncService} from '..';
import { SdkServicePreInitDelegate } from '../../sdk-service-pre-init-delegate';

export interface TelemetryService extends SdkServiceOnInitDelegate, SdkServicePreInitDelegate {
    autoSync: TelemetryAutoSyncService;

    saveTelemetry(request: string): Observable<boolean>;

    audit(request: TelemetryAuditRequest): Observable<boolean>;

    start(request: TelemetryStartRequest): Observable<boolean>;

    interact(request: TelemetryInteractRequest): Observable<boolean>;

    impression(request: TelemetryImpressionRequest): Observable<boolean>;

    end(request: TelemetryEndRequest): Observable<boolean>;

    feedback(request: TelemetryFeedbackRequest): Observable<boolean>;

    log(request: TelemetryLogRequest): Observable<boolean>;

    share(request: TelemetryShareRequest): Observable<boolean>;

    error(request: TelemetryErrorRequest): Observable<boolean>;

    interrupt(request: TelemetryInterruptRequest): Observable<boolean>;

    importTelemetry(telemetryImportRequest: TelemetryImportRequest): Observable<boolean>;

    getTelemetryStat(): Observable<TelemetryStat>;

    sync(telemetrySyncRequest?: TelemetrySyncRequest): Observable<TelemetrySyncStat>;

    lastSyncedTimestamp(): Observable<number | undefined>;

    resetDeviceRegisterTTL(): Observable<undefined>;

    buildContext(): Observable<Context>;

    updateCampaignParameters(params: CorrelationData[]);

    summary(request: TelemetrySummaryRequest): Observable<boolean>;

    populateGlobalCorRelationData(params: CorrelationData[]);
}
