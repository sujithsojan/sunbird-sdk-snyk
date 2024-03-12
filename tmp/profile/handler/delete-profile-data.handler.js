var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { defer, of, zip } from 'rxjs';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { ContentAccessEntry, ContentFeedbackEntry, ContentMarkerEntry } from '../../content/db/schema';
import { KeyValueStoreEntry } from '../../key-value-store/db/schema';
import { PlayerConfigEntry } from '../../player/db/schema';
import { SearchHistoryEntry } from '../../util/search-history/db/schema';
import { GroupProfileEntry, LearnerAssessmentsEntry, LearnerSummaryEntry, ProfileEntry, UserEntry } from '../db/schema';
var DeleteProfileDataHandler = /** @class */ (function () {
    function DeleteProfileDataHandler(dbService) {
        this.dbService = dbService;
    }
    DeleteProfileDataHandler.prototype.delete = function (uid) {
        var _this = this;
        return defer(function () { return of(_this.dbService.beginTransaction()); }).pipe(mergeMap(function () {
            return zip(_this.dbService.delete({
                table: ProfileEntry.TABLE_NAME,
                selection: ProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: ContentMarkerEntry.TABLE_NAME,
                selection: ContentMarkerEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: ContentAccessEntry.TABLE_NAME,
                selection: ContentAccessEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: LearnerAssessmentsEntry.TABLE_NAME,
                selection: LearnerAssessmentsEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: LearnerSummaryEntry.TABLE_NAME,
                selection: LearnerSummaryEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: ContentFeedbackEntry.TABLE_NAME,
                selection: ContentFeedbackEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: SearchHistoryEntry.TABLE_NAME,
                selection: SearchHistoryEntry.COLUMN_NAME_USER_ID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: GroupProfileEntry.TABLE_NAME,
                selection: GroupProfileEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: UserEntry.TABLE_NAME,
                selection: UserEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.delete({
                table: PlayerConfigEntry.TABLE_NAME,
                selection: PlayerConfigEntry.COLUMN_NAME_USER_ID + " = ?",
                selectionArgs: [uid]
            }), _this.dbService.execute("DELETE  FROM " + KeyValueStoreEntry.TABLE_NAME + " \n                                            WHERE " + KeyValueStoreEntry.COLUMN_NAME_KEY + " \n                                            LIKE '%%" + uid + "%%'")).pipe(mapTo(true));
        }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.execute("SELECT * FROM " + KeyValueStoreEntry.TABLE_NAME + " \n                     WHERE " + KeyValueStoreEntry.COLUMN_NAME_KEY + " \n                     LIKE '%%userProfileDetails%%'")
                            .pipe(map(function (result) {
                            return result.filter(function (element) {
                                var value = JSON.parse(element.value);
                                return value.managedBy === uid;
                            }).map(function (element1) {
                                var value = JSON.parse(element1.value);
                                return value.userId;
                            });
                        }), mergeMap(function (uidList) {
                            var deleteNoSQLObservable = _this.dbService.execute("DELETE  FROM " + KeyValueStoreEntry.TABLE_NAME + " \n                            WHERE " + _this.generateLikeQuery(uidList, KeyValueStoreEntry.COLUMN_NAME_KEY));
                            if (uidList.length) {
                                return deleteNoSQLObservable.pipe(mapTo(uidList));
                            }
                            else {
                                return of(true).pipe(mapTo(uidList));
                            }
                        }), mergeMap(function (uidList) {
                            var deleteProfileObservable = _this.dbService.execute("DELETE  FROM " + ProfileEntry.TABLE_NAME + " \n                            WHERE " + _this.generateLikeQuery(uidList, ProfileEntry.COLUMN_NAME_UID));
                            if (uidList.length) {
                                return deleteProfileObservable.pipe(mapTo(true));
                            }
                            else {
                                return of(true).pipe(mapTo(true));
                            }
                        })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), tap(function () {
            _this.dbService.endTransaction(true);
        }), catchError(function (e) {
            console.error(e);
            _this.dbService.endTransaction(false);
            return of(false);
        }));
    };
    DeleteProfileDataHandler.prototype.generateLikeQuery = function (data, coloumnName) {
        var likeQuery = '';
        var initialQuery = coloumnName + " LIKE ";
        for (var i = 0; i < data.length; i++) {
            if (i < data.length - 1) {
                likeQuery = likeQuery.concat(initialQuery, "'%%~" + data[i].toLowerCase().trim() + "~%%' OR ");
            }
            else {
                likeQuery = likeQuery.concat(initialQuery, "'%%~" + data[i].toLowerCase().trim() + "~%%' ");
            }
        }
        return "(" + likeQuery + ")";
    };
    return DeleteProfileDataHandler;
}());
export { DeleteProfileDataHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXByb2ZpbGUtZGF0YS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb2ZpbGUvaGFuZGxlci9kZWxldGUtcHJvZmlsZS1kYXRhLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLEtBQUssRUFBb0IsRUFBRSxFQUFjLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFVLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhIO0lBRUksa0NBQ1ksU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUVoQyxDQUFDO0lBRUQseUNBQU0sR0FBTixVQUFPLEdBQVc7UUFBbEIsaUJBMEdDO1FBekdHLE9BQU8sS0FBSyxDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQyxJQUFJLENBQzFELFFBQVEsQ0FBQztZQUNMLE9BQU8sR0FBRyxDQUNOLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFB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QUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsU0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQU8sQ0FBQyxDQUFDO2FBQzFGO1NBQ0o7UUFDRCxPQUFPLE1BQUksU0FBUyxNQUFHLENBQUM7SUFDNUIsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQS9IRCxJQStIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGVmZXIsIGZyb20sIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgcmVkdWNlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbnRlbnRBY2Nlc3NFbnRyeSwgQ29udGVudEZlZWRiYWNrRW50cnksIENvbnRlbnRNYXJrZXJFbnRyeSB9IGZyb20gJy4uLy4uL2NvbnRlbnQvZGIvc2NoZW1hJztcbmltcG9ydCB7IEtleVZhbHVlU3RvcmVFbnRyeSB9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZS9kYi9zY2hlbWEnO1xuaW1wb3J0IHsgUGxheWVyQ29uZmlnRW50cnkgfSBmcm9tICcuLi8uLi9wbGF5ZXIvZGIvc2NoZW1hJztcbmltcG9ydCB7IFNlYXJjaEhpc3RvcnlFbnRyeSB9IGZyb20gJy4uLy4uL3V0aWwvc2VhcmNoLWhpc3RvcnkvZGIvc2NoZW1hJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQgeyBHcm91cFByb2ZpbGVFbnRyeSwgTGVhcm5lckFzc2Vzc21lbnRzRW50cnksIExlYXJuZXJTdW1tYXJ5RW50cnksIFByb2ZpbGVFbnRyeSwgVXNlckVudHJ5IH0gZnJvbSAnLi4vZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIERlbGV0ZVByb2ZpbGVEYXRhSGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIGRlbGV0ZSh1aWQ6IHN0cmluZyApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IG9mKHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKSkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UHJvZmlsZUVudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFt1aWRdXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRiU2VydmljZS5kZWxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRNYXJrZXJFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDb250ZW50TWFya2VyRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEFjY2Vzc0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRBY2Nlc3NFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdWlkXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdWlkXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke0xlYXJuZXJTdW1tYXJ5RW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogQ29udGVudEZlZWRiYWNrRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEZlZWRiYWNrRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogU2VhcmNoSGlzdG9yeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke1NlYXJjaEhpc3RvcnlFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogR3JvdXBQcm9maWxlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogVXNlckVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGAke1VzZXJFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdWlkXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBQbGF5ZXJDb25maWdFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VpZF1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYERFTEVURSAgRlJPTSAke0tleVZhbHVlU3RvcmVFbnRyeS5UQUJMRV9OQU1FfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtLZXlWYWx1ZVN0b3JlRW50cnkuQ09MVU1OX05BTUVfS0VZfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTElLRSAnJSUke3VpZH0lJSdgKVxuICAgICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwVG8odHJ1ZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoXG4gICAgICAgICAgICAgICAgICAgIGBTRUxFQ1QgKiBGUk9NICR7S2V5VmFsdWVTdG9yZUVudHJ5LlRBQkxFX05BTUV9IFxuICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHtLZXlWYWx1ZVN0b3JlRW50cnkuQ09MVU1OX05BTUVfS0VZfSBcbiAgICAgICAgICAgICAgICAgICAgIExJS0UgJyUldXNlclByb2ZpbGVEZXRhaWxzJSUnYClcbiAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEtleVZhbHVlU3RvcmVFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZmlsdGVyKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gSlNPTi5wYXJzZShlbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLm1hbmFnZWRCeSA9PT0gdWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5tYXAoZWxlbWVudDEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IEpTT04ucGFyc2UoZWxlbWVudDEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudXNlcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh1aWRMaXN0OiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZU5vU1FMT2JzZXJ2YWJsZSA9IHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYERFTEVURSAgRlJPTSAke0tleVZhbHVlU3RvcmVFbnRyeS5UQUJMRV9OQU1FfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXSEVSRSAke3RoaXMuZ2VuZXJhdGVMaWtlUXVlcnkodWlkTGlzdCwgS2V5VmFsdWVTdG9yZUVudHJ5LkNPTFVNTl9OQU1FX0tFWSl9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1aWRMaXN0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWxldGVOb1NRTE9ic2VydmFibGUucGlwZShtYXBUbyh1aWRMaXN0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSkucGlwZShtYXBUbyh1aWRMaXN0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHVpZExpc3Q6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlUHJvZmlsZU9ic2VydmFibGUgPSB0aGlzLmRiU2VydmljZS5leGVjdXRlKGBERUxFVEUgIEZST00gJHtQcm9maWxlRW50cnkuVEFCTEVfTkFNRX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV0hFUkUgJHt0aGlzLmdlbmVyYXRlTGlrZVF1ZXJ5KHVpZExpc3QsIFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSUQpfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodWlkTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVsZXRlUHJvZmlsZU9ic2VydmFibGUucGlwZShtYXBUbyh0cnVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSkucGlwZShtYXBUbyh0cnVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRiU2VydmljZS5lbmRUcmFuc2FjdGlvbih0cnVlKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRiU2VydmljZS5lbmRUcmFuc2FjdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUxpa2VRdWVyeShkYXRhOiBzdHJpbmdbXSwgY29sb3Vtbk5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBsaWtlUXVlcnkgPSAnJztcbiAgICAgICAgY29uc3QgaW5pdGlhbFF1ZXJ5ID0gYCR7Y29sb3Vtbk5hbWV9IExJS0UgYDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGxpa2VRdWVyeSA9IGxpa2VRdWVyeS5jb25jYXQoaW5pdGlhbFF1ZXJ5LCBgJyUlfiR7ZGF0YVtpXS50b0xvd2VyQ2FzZSgpLnRyaW0oKX1+JSUnIE9SIGApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaWtlUXVlcnkgPSBsaWtlUXVlcnkuY29uY2F0KGluaXRpYWxRdWVyeSwgYCclJX4ke2RhdGFbaV0udG9Mb3dlckNhc2UoKS50cmltKCl9fiUlJyBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCgke2xpa2VRdWVyeX0pYDtcbiAgICB9XG59Il19