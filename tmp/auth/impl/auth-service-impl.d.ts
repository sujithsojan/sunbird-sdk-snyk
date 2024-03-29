import { AuthService, OAuthSession, SessionProvider } from '..';
import { ApiService } from '../../api';
import { Observable } from 'rxjs';
import { SharedPreferences } from '../../util/shared-preferences';
import { EventsBusService } from '../../events-bus';
import { SdkConfig } from '../../sdk-config';
export declare class AuthServiceImpl implements AuthService {
    private sdkConfig;
    private apiService;
    private sharedPreferences;
    private eventsBusService;
    private static readonly ACCESS_TOKEN_NEARING_EXPIRY_DELTA;
    private authUtil;
    private apiConfig;
    constructor(sdkConfig: SdkConfig, apiService: ApiService, sharedPreferences: SharedPreferences, eventsBusService: EventsBusService);
    onInit(): Observable<undefined>;
    setSession(sessionProvider: SessionProvider): Observable<undefined>;
    getSession(): Observable<OAuthSession | undefined>;
    resignSession(): Observable<void>;
    refreshSession(): Observable<void>;
    onAccessTokenNearingExpiry(): Observable<boolean>;
}
