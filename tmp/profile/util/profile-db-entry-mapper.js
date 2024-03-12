import { ProfileEntry } from '../db/schema';
var ProfileDbEntryMapper = /** @class */ (function () {
    function ProfileDbEntryMapper() {
    }
    ProfileDbEntryMapper.mapProfileDBEntryToProfile = function (profileEntry) {
        return {
            uid: profileEntry[ProfileEntry.COLUMN_NAME_UID],
            handle: profileEntry[ProfileEntry.COLUMN_NAME_HANDLE],
            createdAt: profileEntry[ProfileEntry.COLUMN_NAME_CREATED_AT],
            medium: profileEntry[ProfileEntry.COLUMN_NAME_MEDIUM] ? profileEntry[ProfileEntry.COLUMN_NAME_MEDIUM].split(',') : [],
            board: profileEntry[ProfileEntry.COLUMN_NAME_BOARD] ? profileEntry[ProfileEntry.COLUMN_NAME_BOARD].split(',') : [],
            subject: profileEntry[ProfileEntry.COLUMN_NAME_SUBJECT] ? profileEntry[ProfileEntry.COLUMN_NAME_SUBJECT].split(',') : [],
            profileType: profileEntry[ProfileEntry.COLUMN_NAME_PROFILE_TYPE],
            grade: profileEntry[ProfileEntry.COLUMN_NAME_GRADE] ? profileEntry[ProfileEntry.COLUMN_NAME_GRADE].split(',') : [],
            syllabus: profileEntry[ProfileEntry.COLUMN_NAME_SYLLABUS] ? profileEntry[ProfileEntry.COLUMN_NAME_SYLLABUS].split(',') : [],
            source: profileEntry[ProfileEntry.COLUMN_NAME_SOURCE],
            gradeValue: profileEntry[ProfileEntry.COLUMN_NAME_GRADE_VALUE] && JSON.parse(profileEntry[ProfileEntry.COLUMN_NAME_GRADE_VALUE]),
            categories: profileEntry[ProfileEntry.COLUMN_NAME_CATEGORIES]
        };
    };
    ProfileDbEntryMapper.mapProfileToProfileDBEntry = function (profile) {
        var _a;
        return _a = {},
            _a[ProfileEntry.COLUMN_NAME_UID] = profile.uid,
            _a[ProfileEntry.COLUMN_NAME_HANDLE] = profile.handle,
            _a[ProfileEntry.COLUMN_NAME_CREATED_AT] = Number(profile.createdAt),
            _a[ProfileEntry.COLUMN_NAME_MEDIUM] = (profile.medium ? profile.medium.join(',') : ''),
            _a[ProfileEntry.COLUMN_NAME_BOARD] = (profile.board ? profile.board.join(',') : ''),
            _a[ProfileEntry.COLUMN_NAME_SUBJECT] = (profile.subject ? profile.subject.join(',') : ''),
            _a[ProfileEntry.COLUMN_NAME_PROFILE_TYPE] = profile.profileType,
            _a[ProfileEntry.COLUMN_NAME_GRADE] = (profile.grade ? profile.grade.join(',') : ''),
            _a[ProfileEntry.COLUMN_NAME_SYLLABUS] = (profile.syllabus ? profile.syllabus.join(',') : ''),
            _a[ProfileEntry.COLUMN_NAME_SOURCE] = profile.source,
            _a[ProfileEntry.COLUMN_NAME_GRADE_VALUE] = (profile.gradeValue ? JSON.stringify(profile.gradeValue) : ''),
            _a[ProfileEntry.COLUMN_NAME_CATEGORIES] = (profile.categories ? JSON.stringify(profile.categories) : ''),
            _a;
    };
    return ProfileDbEntryMapper;
}());
export { ProfileDbEntryMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1kYi1lbnRyeS1tYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS91dGlsL3Byb2ZpbGUtZGItZW50cnktbWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHMUM7SUFBQTtJQW1DQSxDQUFDO0lBbENpQiwrQ0FBMEIsR0FBeEMsVUFBeUMsWUFBb0M7UUFDekUsT0FBTztZQUNILEdBQUcsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztZQUMvQyxNQUFNLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUNyRCxTQUFTLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztZQUM1RCxNQUFNLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JILEtBQUssRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEgsT0FBTyxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4SCxXQUFXLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBZ0I7WUFDL0UsS0FBSyxFQUFFLFlBQVksQ0FBQyxZQUFZ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L3NjaGVtYSc7XG5pbXBvcnQge1Byb2ZpbGUsIFByb2ZpbGVTb3VyY2UsIFByb2ZpbGVUeXBlfSBmcm9tICcuLic7XG5cbmV4cG9ydCBjbGFzcyBQcm9maWxlRGJFbnRyeU1hcHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBtYXBQcm9maWxlREJFbnRyeVRvUHJvZmlsZShwcm9maWxlRW50cnk6IFByb2ZpbGVFbnRyeS5TY2hlbWFNYXApOiBQcm9maWxlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVpZDogcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdLFxuICAgICAgICAgICAgaGFuZGxlOiBwcm9maWxlRW50cnlbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0hBTkRMRV0sXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfQ1JFQVRFRF9BVF0sXG4gICAgICAgICAgICBtZWRpdW06IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfTUVESVVNXSA/IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfTUVESVVNXS5zcGxpdCgnLCcpIDogW10sXG4gICAgICAgICAgICBib2FyZDogcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9CT0FSRF0gPyBwcm9maWxlRW50cnlbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0JPQVJEXS5zcGxpdCgnLCcpIDogW10sXG4gICAgICAgICAgICBzdWJqZWN0OiBwcm9maWxlRW50cnlbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1NVQkpFQ1RdID8gcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9TVUJKRUNUXS5zcGxpdCgnLCcpIDogW10sXG4gICAgICAgICAgICBwcm9maWxlVHlwZTogcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9QUk9GSUxFX1RZUEVdIGFzIFByb2ZpbGVUeXBlLFxuICAgICAgICAgICAgZ3JhZGU6IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR1JBREVdID8gcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV0uc3BsaXQoJywnKSA6IFtdLFxuICAgICAgICAgICAgc3lsbGFidXM6IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfU1lMTEFCVVNdID8gcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9TWUxMQUJVU10uc3BsaXQoJywnKSA6IFtdLFxuICAgICAgICAgICAgc291cmNlOiBwcm9maWxlRW50cnlbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1NPVVJDRV0gYXMgUHJvZmlsZVNvdXJjZSxcbiAgICAgICAgICAgIGdyYWRlVmFsdWU6IHByb2ZpbGVFbnRyeVtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR1JBREVfVkFMVUVdICYmIEpTT04ucGFyc2UocHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV9WQUxVRV0pLFxuICAgICAgICAgICAgY2F0ZWdvcmllczogcHJvZmlsZUVudHJ5W1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9DQVRFR09SSUVTXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbWFwUHJvZmlsZVRvUHJvZmlsZURCRW50cnkocHJvZmlsZTogUHJvZmlsZSk6IFByb2ZpbGVFbnRyeS5TY2hlbWFNYXAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdOiBwcm9maWxlLnVpZCxcbiAgICAgICAgICAgIFtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfSEFORExFXTogcHJvZmlsZS5oYW5kbGUsXG4gICAgICAgICAgICBbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0NSRUFURURfQVRdOiBOdW1iZXIocHJvZmlsZS5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9NRURJVU1dOiAocHJvZmlsZS5tZWRpdW0gPyBwcm9maWxlLm1lZGl1bS5qb2luKCcsJykgOiAnJyksXG4gICAgICAgICAgICBbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0JPQVJEXTogKHByb2ZpbGUuYm9hcmQgPyBwcm9maWxlLmJvYXJkLmpvaW4oJywnKSA6ICcnKSxcbiAgICAgICAgICAgIFtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfU1VCSkVDVF06IChwcm9maWxlLnN1YmplY3QgPyBwcm9maWxlLnN1YmplY3Quam9pbignLCcpIDogJycpLFxuICAgICAgICAgICAgW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9QUk9GSUxFX1RZUEVdOiBwcm9maWxlLnByb2ZpbGVUeXBlLFxuICAgICAgICAgICAgW1Byb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV06IChwcm9maWxlLmdyYWRlID8gcHJvZmlsZS5ncmFkZS5qb2luKCcsJykgOiAnJyksXG4gICAgICAgICAgICBbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1NZTExBQlVTXTogKHByb2ZpbGUuc3lsbGFidXMgPyBwcm9maWxlLnN5bGxhYnVzLmpvaW4oJywnKSA6ICcnKSxcbiAgICAgICAgICAgIFtQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfU09VUkNFXTogcHJvZmlsZS5zb3VyY2UsXG4gICAgICAgICAgICBbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0dSQURFX1ZBTFVFXTogKHByb2ZpbGUuZ3JhZGVWYWx1ZSA/IEpTT04uc3RyaW5naWZ5KHByb2ZpbGUuZ3JhZGVWYWx1ZSkgOiAnJyksXG4gICAgICAgICAgICBbUHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX0NBVEVHT1JJRVNdOiAocHJvZmlsZS5jYXRlZ29yaWVzID8gSlNPTi5zdHJpbmdpZnkocHJvZmlsZS5jYXRlZ29yaWVzKSA6ICcnKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==