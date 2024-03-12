import { GroupProfileEntry } from '../../profile/db/schema';
var GroupProfileMapper = /** @class */ (function () {
    function GroupProfileMapper() {
    }
    GroupProfileMapper.mapGroupProfileDBEntryToGroupProfile = function (groupProfileEntry) {
        return {
            gid: groupProfileEntry[GroupProfileEntry.COLUMN_NAME_GID],
            uid: groupProfileEntry[GroupProfileEntry.COLUMN_NAME_UID]
        };
    };
    GroupProfileMapper.mapGroupToGroupDBEntry = function (groupProfile) {
        var _a;
        return _a = {},
            _a[GroupProfileEntry.COLUMN_NAME_GID] = groupProfile.gid,
            _a[GroupProfileEntry.COLUMN_NAME_UID] = groupProfile.uid,
            _a;
    };
    return GroupProfileMapper;
}());
export { GroupProfileMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcHJvZmlsZS1tYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JvdXAtZGVwcmVjYXRlZC91dGlsL2dyb3VwLXByb2ZpbGUtbWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRzFEO0lBQUE7SUFlQSxDQUFDO0lBZGlCLHVEQUFvQyxHQUFsRCxVQUFtRCxpQkFBOEM7UUFDN0YsT0FBTztZQUNILEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDekQsR0FBRyxFQUFFLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztTQUM1RCxDQUFDO0lBQ04sQ0FBQztJQUVhLHlDQUFzQixHQUFwQyxVQUFxQyxZQUFvQzs7UUFDckU7WUFDSSxHQUFDLGlCQUFpQixDQUFDLGVBQWUsSUFBRyxZQUFZLENBQUMsR0FBRztZQUNyRCxHQUFDLGlCQUFpQixDQUFDLGVBQWUsSUFBRyxZQUFZLENBQUMsR0FBRztlQUN2RDtJQUNOLENBQUM7SUFFTCx5QkFBQztBQUFELENBQUMsQUFmRCxJQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcm91cFByb2ZpbGVFbnRyeX0gZnJvbSAnLi4vLi4vcHJvZmlsZS9kYi9zY2hlbWEnO1xuaW1wb3J0IHtHcm91cFByb2ZpbGVEZXByZWNhdGVkfSBmcm9tICcuLic7XG5cbmV4cG9ydCBjbGFzcyBHcm91cFByb2ZpbGVNYXBwZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgbWFwR3JvdXBQcm9maWxlREJFbnRyeVRvR3JvdXBQcm9maWxlKGdyb3VwUHJvZmlsZUVudHJ5OiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXApOiBHcm91cFByb2ZpbGVEZXByZWNhdGVkIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdpZDogZ3JvdXBQcm9maWxlRW50cnlbR3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR0lEXSxcbiAgICAgICAgICAgIHVpZDogZ3JvdXBQcm9maWxlRW50cnlbR3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbWFwR3JvdXBUb0dyb3VwREJFbnRyeShncm91cFByb2ZpbGU6IEdyb3VwUHJvZmlsZURlcHJlY2F0ZWQpOiBHcm91cFByb2ZpbGVFbnRyeS5TY2hlbWFNYXAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW0dyb3VwUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0dJRF06IGdyb3VwUHJvZmlsZS5naWQsXG4gICAgICAgICAgICBbR3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEXTogZ3JvdXBQcm9maWxlLnVpZFxuICAgICAgICB9O1xuICAgIH1cblxufVxuIl19