import { Observable } from "rxjs";
import { DebuggingService, DebugWatcher } from "../def/debugging-service";
import { SharedPreferences } from '../../util/shared-preferences';
import { ProfileService } from "../../profile";
export declare class DebuggingServiceImpl implements DebuggingService {
    private sharedPreferences;
    private profileService;
    private _userId;
    private _deviceId;
    watcher: DebugWatcher;
    set userId(userId: string);
    get userId(): string;
    set deviceId(deviceId: string);
    get deviceId(): string;
    constructor(sharedPreferences: SharedPreferences, profileService: ProfileService);
    enableDebugging(traceID?: string): Observable<boolean>;
    disableDebugging(): Observable<boolean>;
    isDebugOn(): boolean;
}
