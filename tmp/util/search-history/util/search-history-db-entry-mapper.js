import { SearchHistoryEntry } from '../db/schema';
var COLUMN_NAME_USER_ID = SearchHistoryEntry.COLUMN_NAME_USER_ID;
var COLUMN_NAME_QUERY = SearchHistoryEntry.COLUMN_NAME_QUERY;
var COLUMN_NAME_TIME_STAMP = SearchHistoryEntry.COLUMN_NAME_TIME_STAMP;
var SearchHistoryDbEntryMapper = /** @class */ (function () {
    function SearchHistoryDbEntryMapper() {
    }
    SearchHistoryDbEntryMapper.mapSearchHistoryDbEntryToSearchEntry = function (dbEntry) {
        return {
            uid: dbEntry[COLUMN_NAME_USER_ID],
            query: dbEntry[COLUMN_NAME_QUERY],
            timestamp: dbEntry[COLUMN_NAME_TIME_STAMP]
        };
    };
    return SearchHistoryDbEntryMapper;
}());
export { SearchHistoryDbEntryMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpc3RvcnktZGItZW50cnktbWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvc2VhcmNoLWhpc3RvcnkvdXRpbC9zZWFyY2gtaGlzdG9yeS1kYi1lbnRyeS1tYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2hELElBQU8sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsbUJBQW1CLENBQUM7QUFDcEUsSUFBTyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQztBQUNoRSxJQUFPLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDO0FBRTFFO0lBQUE7SUFRQSxDQUFDO0lBUGlCLCtEQUFvQyxHQUFsRCxVQUFtRCxPQUFxQztRQUNwRixPQUFPO1lBQ0gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztZQUNqQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLFNBQVMsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUM7U0FDN0MsQ0FBQztJQUNOLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUFSRCxJQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZWFyY2hFbnRyeX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtTZWFyY2hIaXN0b3J5RW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQgQ09MVU1OX05BTUVfVVNFUl9JRCA9IFNlYXJjaEhpc3RvcnlFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEO1xuaW1wb3J0IENPTFVNTl9OQU1FX1FVRVJZID0gU2VhcmNoSGlzdG9yeUVudHJ5LkNPTFVNTl9OQU1FX1FVRVJZO1xuaW1wb3J0IENPTFVNTl9OQU1FX1RJTUVfU1RBTVAgPSBTZWFyY2hIaXN0b3J5RW50cnkuQ09MVU1OX05BTUVfVElNRV9TVEFNUDtcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEhpc3RvcnlEYkVudHJ5TWFwcGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIG1hcFNlYXJjaEhpc3RvcnlEYkVudHJ5VG9TZWFyY2hFbnRyeShkYkVudHJ5OiBTZWFyY2hIaXN0b3J5RW50cnkuU2NoZW1hTWFwKTogU2VhcmNoRW50cnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdWlkOiBkYkVudHJ5W0NPTFVNTl9OQU1FX1VTRVJfSURdLFxuICAgICAgICAgICAgcXVlcnk6IGRiRW50cnlbQ09MVU1OX05BTUVfUVVFUlldLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBkYkVudHJ5W0NPTFVNTl9OQU1FX1RJTUVfU1RBTVBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19