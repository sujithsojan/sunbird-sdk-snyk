import { CachedItemRequestSourceFrom, CachedItemStore } from '../../key-value-store';
import { Channel, ChannelDetailsRequest, Framework, FrameworkDetailsRequest, FrameworkService, OrganizationSearchCriteria, OrganizationSearchResponse } from '..';
import { FileService } from '../../util/file/def/file-service';
import { Observable } from 'rxjs';
import { Organization } from '../def/organization';
import { ApiService } from '../../api';
import { SharedPreferences } from '../../util/shared-preferences';
import { SystemSettingsService } from '../../system-settings';
import { SdkConfig } from '../../sdk-config';
import { CsFrameworkService } from '@project-sunbird/client-services/services/framework/interface';
import { FormRequest } from 'src';
export declare class FrameworkServiceImpl implements FrameworkService {
    private sdkConfig;
    private fileService;
    private apiService;
    private cachedItemStore;
    private sharedPreferences;
    private systemSettingsService;
    private csFrameworkService;
    private static readonly KEY_ACTIVE_CHANNEL_ID;
    private static readonly SEARCH_ORGANIZATION_ENDPOINT;
    private _activeChannelId?;
    constructor(sdkConfig: SdkConfig, fileService: FileService, apiService: ApiService, cachedItemStore: CachedItemStore, sharedPreferences: SharedPreferences, systemSettingsService: SystemSettingsService, csFrameworkService: CsFrameworkService);
    get activeChannelId(): string | undefined;
    preInit(): Observable<undefined>;
    getDefaultChannelId(): Observable<string>;
    getDefaultChannelDetails(request?: {
        from: CachedItemRequestSourceFrom;
    }): Observable<Channel>;
    getChannelDetails(request: ChannelDetailsRequest): Observable<Channel>;
    getFrameworkDetails(request: FrameworkDetailsRequest): Observable<Framework>;
    getFrameworkConfig(frameworkId: string, formRequest?: FormRequest): Observable<any>;
    searchOrganization<T extends Partial<Organization>>(request: OrganizationSearchCriteria<T>): Observable<OrganizationSearchResponse<T>>;
    getActiveChannelId(): Observable<string>;
    setActiveChannelId(channelId: string): Observable<undefined>;
}
