import { Content } from '../../content';
import { Observable } from 'rxjs';
import { PlayerInput } from './response';
export interface PlayerService {
    getPlayerConfig(content: Content, extraInfo: {
        [key: string]: any;
    }): Observable<PlayerInput>;
    savePlayerState(userId: string, parentId: string, identifier: string, saveState: string): any;
    deletePlayerSaveState(userId: string, parentId: string, contentId: string): any;
}
