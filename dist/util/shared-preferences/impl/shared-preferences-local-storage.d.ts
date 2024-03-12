import { SharedPreferences } from '..';
import { Observable } from 'rxjs';
export declare class SharedPreferencesLocalStorage implements SharedPreferences {
    getString(key: string): Observable<string | undefined>;
    putString(key: string, value: string): Observable<undefined>;
    putBoolean(key: string, value: boolean): Observable<boolean>;
    getBoolean(key: string): Observable<boolean>;
}
