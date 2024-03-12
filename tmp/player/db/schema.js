import { DbConstants } from '../../db';
export var PlayerConfigEntry;
(function (PlayerConfigEntry) {
    PlayerConfigEntry.TABLE_NAME = 'player_data';
    PlayerConfigEntry._ID = '_id';
    PlayerConfigEntry.COLUMN_NAME_USER_ID = 'user_id';
    PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER = 'parent_identifier';
    PlayerConfigEntry.COLUMN_IDENTIFIER = 'identifier';
    PlayerConfigEntry.COLUMN_PLAYER_CONFIG = 'player_config';
    PlayerConfigEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + PlayerConfigEntry.TABLE_NAME + ' (' + PlayerConfigEntry._ID +
            ' INTEGER PRIMARY KEY' + DbConstants.COMMA_SEP +
            PlayerConfigEntry.COLUMN_NAME_USER_ID + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            PlayerConfigEntry.COLUMN_IDENTIFIER + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            PlayerConfigEntry.COLUMN_PLAYER_CONFIG + DbConstants.SPACE + DbConstants.TEXT_TYPE + ')';
    };
    PlayerConfigEntry.deleteTable = function () {
        return 'DROP TABLE IF EXISTS ' + PlayerConfigEntry.TABLE_NAME;
    };
    PlayerConfigEntry.getAlterEntryForPlayerConfig = function () {
        return "ALTER TABLE " + PlayerConfigEntry.TABLE_NAME + " ADD COLUMN " + PlayerConfigEntry.COLUMN_PLAYER_CONFIG + " TEXT DEFAULT ''";
    };
})(PlayerConfigEntry || (PlayerConfigEntry = {}));
var PlayerDbEntryMapper = /** @class */ (function () {
    function PlayerDbEntryMapper() {
    }
    PlayerDbEntryMapper.mapPlayerDbEntryToPlayer = function (playerEntry) {
        return {
            userId: playerEntry[PlayerConfigEntry.COLUMN_NAME_USER_ID],
            parentId: playerEntry[PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER],
            contentId: playerEntry[PlayerConfigEntry.COLUMN_IDENTIFIER],
            saveState: playerEntry[PlayerConfigEntry.COLUMN_PLAYER_CONFIG]
        };
    };
    PlayerDbEntryMapper.mapPlayerStateToPlayerDbEntry = function (userId, parentId, contentId, saveState) {
        var _a;
        return _a = {},
            _a[PlayerConfigEntry.COLUMN_NAME_USER_ID] = userId,
            _a[PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER] = parentId,
            _a[PlayerConfigEntry.COLUMN_IDENTIFIER] = contentId,
            _a[PlayerConfigEntry.COLUMN_PLAYER_CONFIG] = saveState,
            _a;
    };
    return PlayerDbEntryMapper;
}());
export { PlayerDbEntryMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BsYXllci9kYi9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVyQyxNQUFNLEtBQVcsaUJBQWlCLENBK0JqQztBQS9CRCxXQUFpQixpQkFBaUI7SUFDakIsNEJBQVUsR0FBRyxhQUFhLENBQUM7SUFDM0IscUJBQUcsR0FBRyxLQUFLLENBQUM7SUFDWixxQ0FBbUIsR0FBRyxTQUFTLENBQUM7SUFDaEMsMENBQXdCLEdBQUcsbUJBQW1CLENBQUM7SUFDL0MsbUNBQWlCLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLHNDQUFvQixHQUFHLGVBQWUsQ0FBQztJQVN2QyxnQ0FBYyxHQUFtQjtRQUMxQyxPQUFPLDZCQUE2QixHQUFHLGtCQUFBLFVBQVUsR0FBRyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRztZQUM1RSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsU0FBUztZQUM5QyxrQkFBQSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVM7WUFDdkYsa0JBQUEsd0JBQXdCLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTO1lBQzVGLGtCQUFBLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUztZQUNyRixrQkFBQSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQy9FLENBQUMsQ0FBQztJQUVXLDZCQUFXLEdBQW1CO1FBQ3ZDLE9BQU8sdUJBQXVCLEdBQUcsa0JBQUEsVUFBVSxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVXLDhDQUE0QixHQUFtQjtRQUN4RCxPQUFPLGlCQUFlLGtCQUFBLFVBQVUsb0JBQWUsa0JBQUEsb0JBQW9CLHFCQUFrQixDQUFDO0lBQzFGLENBQUMsQ0FBQztBQUNOLENBQUMsRUEvQmdCLGlCQUFpQixLQUFqQixpQkFBaUIsUUErQmpDO0FBU0Q7SUFBQTtJQWtCQSxDQUFDO0lBakJpQiw0Q0FBd0IsR0FBdEMsVUFBdUMsV0FBd0M7UUFDM0UsT0FBTztZQUNILE1BQU0sRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUM7WUFDMUQsUUFBUSxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztZQUNqRSxTQUFTLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO1lBQzNELFNBQVMsRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUM7U0FDakUsQ0FBQztJQUNOLENBQUM7SUFFYSxpREFBNkIsR0FBM0MsVUFBNEMsTUFBYyxFQUFFLFFBQWdCLEVBQUcsU0FBaUIsRUFBRSxTQUFpQjs7UUFDL0c7WUFDSSxHQUFDLGlCQUFpQixDQUFDLG1CQUFtQixJQUFHLE1BQU07WUFDL0MsR0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsSUFBRyxRQUFRO1lBQ3RELEdBQUMsaUJBQWlCLENBQUMsaUJBQWlCLElBQUcsU0FBUztZQUNoRCxHQUFDLGlCQUFpQixDQUFDLG9CQUFvQixJQUFHLFNBQVM7ZUFDckQ7SUFDTixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYkNvbnN0YW50c30gZnJvbSAnLi4vLi4vZGInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBsYXllckNvbmZpZ0VudHJ5IHtcbiAgICBleHBvcnQgY29uc3QgVEFCTEVfTkFNRSA9ICdwbGF5ZXJfZGF0YSc7XG4gICAgZXhwb3J0IGNvbnN0IF9JRCA9ICdfaWQnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9VU0VSX0lEID0gJ3VzZXJfaWQnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fUEFSRU5UX0lERU5USUZJRVIgPSAncGFyZW50X2lkZW50aWZpZXInO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fSURFTlRJRklFUiA9ICdpZGVudGlmaWVyJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX1BMQVlFUl9DT05GSUcgPSAncGxheWVyX2NvbmZpZyc7XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1hcCB7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9VU0VSX0lEXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX1BBUkVOVF9JREVOVElGSUVSXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX0lERU5USUZJRVJdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fUExBWUVSX0NPTkZJR106IHN0cmluZztcbiAgICB9XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Q3JlYXRlRW50cnk6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICcgKyBUQUJMRV9OQU1FICsgJyAoJyArIFBsYXllckNvbmZpZ0VudHJ5Ll9JRCArXG4gICAgICAgICAgICAnIElOVEVHRVIgUFJJTUFSWSBLRVknICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX1VTRVJfSUQgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fUEFSRU5UX0lERU5USUZJRVIgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fSURFTlRJRklFUiArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9QTEFZRVJfQ09ORklHICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnKSc7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVUYWJsZTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAnRFJPUCBUQUJMRSBJRiBFWElTVFMgJyArIFRBQkxFX05BTUU7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBbHRlckVudHJ5Rm9yUGxheWVyQ29uZmlnOiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBBTFRFUiBUQUJMRSAke1RBQkxFX05BTUV9IEFERCBDT0xVTU4gJHtDT0xVTU5fUExBWUVSX0NPTkZJR30gVEVYVCBERUZBVUxUICcnYDtcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXllclNhdmVTdGF0ZSB7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgcGFyZW50SWQ6IHN0cmluZztcbiAgICBjb250ZW50SWQ6IHN0cmluZztcbiAgICBzYXZlU3RhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFBsYXllckRiRW50cnlNYXBwZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgbWFwUGxheWVyRGJFbnRyeVRvUGxheWVyKHBsYXllckVudHJ5OiBQbGF5ZXJDb25maWdFbnRyeS5TY2hlbWFNYXApOiBQbGF5ZXJTYXZlU3RhdGUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlcklkOiBwbGF5ZXJFbnRyeVtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEXSxcbiAgICAgICAgICAgIHBhcmVudElkOiBwbGF5ZXJFbnRyeVtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fUEFSRU5UX0lERU5USUZJRVJdLFxuICAgICAgICAgICAgY29udGVudElkOiBwbGF5ZXJFbnRyeVtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fSURFTlRJRklFUl0sXG4gICAgICAgICAgICBzYXZlU3RhdGU6IHBsYXllckVudHJ5W1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9QTEFZRVJfQ09ORklHXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbWFwUGxheWVyU3RhdGVUb1BsYXllckRiRW50cnkodXNlcklkOiBzdHJpbmcsIHBhcmVudElkOiBzdHJpbmcsICBjb250ZW50SWQ6IHN0cmluZywgc2F2ZVN0YXRlOiBzdHJpbmcpOiBQbGF5ZXJDb25maWdFbnRyeS5TY2hlbWFNYXAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSURdOiB1c2VySWQsXG4gICAgICAgICAgICBbUGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX1BBUkVOVF9JREVOVElGSUVSXTogcGFyZW50SWQsXG4gICAgICAgICAgICBbUGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX0lERU5USUZJRVJdOiBjb250ZW50SWQsXG4gICAgICAgICAgICBbUGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX1BMQVlFUl9DT05GSUddOiBzYXZlU3RhdGVcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbiJdfQ==