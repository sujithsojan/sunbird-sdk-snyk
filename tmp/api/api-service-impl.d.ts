import { Observable } from 'rxjs';
import { ApiService } from './def/api-service';
import { DeviceInfo } from '../util/device';
import { SharedPreferences } from '../util/shared-preferences';
import { Container } from 'inversify';
import { SdkConfig } from '../sdk-config';
import { EventsBusService } from '../events-bus';
import { CsHttpService, CsRequest, CsRequestInterceptor, CsResponse, CsResponseInterceptor } from '@project-sunbird/client-services/core/http-service';
import { BearerTokenRefreshInterceptor } from './util/authenticators/bearer-token-refresh-interceptor';
import { UserTokenRefreshInterceptor } from './util/authenticators/user-token-refresh-interceptor';
export declare class ApiServiceImpl implements ApiService {
    private container;
    private sdkConfig;
    private deviceInfo;
    private sharedPreferences;
    private eventsBusService;
    private httpService;
    private static PLANNED_MAINTENANCE_ERROR_CODE;
    private hasEmittedPlannedMaintenanceErrorEvent;
    private defaultRequestInterceptors;
    private defaultResponseInterceptors;
    private apiConfig;
    constructor(container: Container, sdkConfig: SdkConfig, deviceInfo: DeviceInfo, sharedPreferences: SharedPreferences, eventsBusService: EventsBusService, httpService: CsHttpService);
    private _bearerTokenRefreshInterceptor?;
    get bearerTokenRefreshInterceptor(): BearerTokenRefreshInterceptor;
    private _userTokenRefreshInterceptor?;
    get userTokenRefreshInterceptor(): UserTokenRefreshInterceptor;
    onInit(): Observable<undefined>;
    fetch<T = any>(request: CsRequest): Observable<CsResponse<T>>;
    setDefaultRequestInterceptors(interceptors: CsRequestInterceptor[]): void;
    setDefaultResponseInterceptors(interceptors: CsResponseInterceptor[]): void;
}
