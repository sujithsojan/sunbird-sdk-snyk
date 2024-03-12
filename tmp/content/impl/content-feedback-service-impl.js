var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ContentFeedbackEntry } from '../db/schema';
import { DbService } from '../../db';
import { ContentFeedbackHandler } from '../handlers/content-feedback-handler';
import { QueryBuilder } from '../../db/util/query-builder';
import { ContentUtil } from '../util/content-util';
import { ShareItemType } from '../../telemetry';
import { injectable, inject } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { map, mergeMap } from 'rxjs/operators';
var ContentFeedbackServiceImpl = /** @class */ (function () {
    function ContentFeedbackServiceImpl(dbService, profileService, telemetryService) {
        this.dbService = dbService;
        this.profileService = profileService;
        this.telemetryService = telemetryService;
    }
    ContentFeedbackServiceImpl.prototype.getFeedback = function (contentFeedbackFilterCriteria) {
        var query = "SELECT * FROM " + ContentFeedbackEntry.TABLE_NAME + " " + ContentUtil.getUidnIdentifierFiler(contentFeedbackFilterCriteria.uid, contentFeedbackFilterCriteria.contentId);
        return this.dbService.execute(query).pipe(map(function (feedbackList) {
            return feedbackList.map(function (feedback) {
                return ContentFeedbackHandler.mapFeedbackDBEntrytoResponseFeedback(feedback);
            });
        }));
    };
    ContentFeedbackServiceImpl.prototype.sendFeedback = function (contentFeedback) {
        var _this = this;
        return this.profileService.getActiveProfileSession()
            .pipe(mergeMap(function (response) {
            var readQuery = {
                table: ContentFeedbackEntry.TABLE_NAME,
                selection: new QueryBuilder()
                    .where('? = ? AND ? = ?')
                    .args([ContentFeedbackEntry.COLUMN_NAME_CONTENT_ID,
                    contentFeedback.contentId, ContentFeedbackEntry.COLUMN_NAME_UID, response.uid])
                    .end()
                    .build(),
                limit: '1'
            };
            var feedbackModel = {
                uid: response.uid,
                identifier: contentFeedback.contentId,
                rating: contentFeedback.rating,
                comments: contentFeedback.comments,
                createdAt: Date.now(),
            };
            return _this.telemetryService.feedback({
                env: 'sdk',
                rating: contentFeedback.rating,
                comments: contentFeedback.comments,
                objId: contentFeedback.contentId,
                objType: ShareItemType.CONTENT.valueOf(),
                objVer: contentFeedback.contentVersion,
            }).pipe(mergeMap(function () {
                return _this.dbService.read(readQuery).pipe(mergeMap(function (rows) {
                    if (rows && rows.length) {
                        return _this.dbService.update({
                            table: ContentFeedbackEntry.TABLE_NAME,
                            selection: ContentFeedbackEntry.COLUMN_NAME_UID + "= ? AND " + ContentFeedbackEntry
                                .COLUMN_NAME_CONTENT_ID + "= ?",
                            selectionArgs: [response.uid, contentFeedback.contentId],
                            modelJson: feedbackModel
                        }).pipe(map(function (v) { return v > 0; }));
                    }
                    else {
                        return _this.dbService.insert({
                            table: ContentFeedbackEntry.TABLE_NAME,
                            modelJson: feedbackModel
                        }).pipe(map(function (v) { return v > 0; }));
                    }
                }));
            }));
        }));
    };
    ContentFeedbackServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(2, inject(InjectionTokens.TELEMETRY_SERVICE)),
        __metadata("design:paramtypes", [DbService, Object, Object])
    ], ContentFeedbackServiceImpl);
    return ContentFeedbackServiceImpl;
}());
export { ContentFeedbackServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1mZWVkYmFjay1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9pbXBsL2NvbnRlbnQtZmVlZGJhY2stc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQUMsU0FBUyxFQUFZLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBbUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcvQztJQUVJLG9DQUF3RCxTQUFvQixFQUNmLGNBQThCLEVBQzVCLGdCQUFrQztRQUZ6QyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFFakcsQ0FBQztJQUVELGdEQUFXLEdBQVgsVUFBWSw2QkFBNEQ7UUFDcEUsSUFBTSxLQUFLLEdBQUcsbUJBQWlCLG9CQUFvQixDQUFDLFVBQVUsU0FBSSxXQUFXLENBQUMsc0JBQXNCLENBQ2hHLDZCQUE2QixDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQyxTQUFTLENBQUcsQ0FBQztRQUNsRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLFVBQUMsWUFBOEM7WUFDbkQsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBd0M7Z0JBQzdELE9BQUEsc0JBQXNCLENBQUMsb0NBQW9DLENBQUMsUUFBUSxDQUFDO1lBQXJFLENBQXFFLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sQ0FBQztJQUVELGlEQUFZLEdBQVosVUFBYSxlQUFnQztRQUE3QyxpQkEwREM7UUF6REcsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFO2FBQy9DLElBQUksQ0FDRCxRQUFRLENBQUMsVUFBQyxRQUFvQztZQUMxQyxJQUFNLFNBQVMsR0FBYztnQkFDekIsS0FBSyxFQUFFLG9CQUFvQixDQUFDLFVBQVU7Z0JBQ3RDLFNBQVMsRUFBRSxJQUFJLFlBQVksRUFBRTtxQkFDeEIsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3FCQUN4QixJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0I7b0JBQzlDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsZUFBZSxFQUFFLFFBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDbkYsR0FBRyxFQUFFO3FCQUNMLEtBQUssRUFBRTtnQkFDWixLQUFLLEVBQUUsR0FBRzthQUNiLENBQUM7WUFFRixJQUFNLGFBQWEsR0FBbUM7Z0JBQ2xELEdBQUcsRUFBRSxRQUFTLENBQUMsR0FBRztnQkFDbEIsVUFBVSxFQUFFLGVBQWUsQ0FBQyxTQUFTO2dCQUNyQyxNQUFNLEVBQUUsZUFBZSxDQUFDLE1BQU07Z0JBQzlCLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtnQkFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7YUFDeEIsQ0FBQztZQUNGLE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztnQkFDbEMsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsTUFBTSxFQUFFLGVBQWUsQ0FBQyxNQUFNO2dCQUM5QixRQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVE7Z0JBQ2xDLEtBQUssRUFBRSxlQUFlLENBQUMsU0FBUztnQkFDaEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUN4QyxNQUFNLEVBQUUsZUFBZSxDQUFDLGNBQWM7YUFDekMsQ0FBQyxDQUFDLElBQUksQ0FDSCxRQUFRLENBQUM7Z0JBQ0wsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ3RDLFFBQVEsQ0FBQyxVQUFDLElBQUk7b0JBQ1YsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDckIsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzs0QkFDekIsS0FBSyxFQUFFLG9CQUFvQixDQUFDLFVBQVU7NEJBQ3RDLFNBQVMsRUFDRixvQkFBb0IsQ0FBQyxlQUFlLGdCQUFXLG9CQUFvQjtpQ0FDakUsc0JBQXNCLFFBQUs7NEJBQ3BDLGFBQWEsRUFBRSxDQUFDLFFBQVMsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQzs0QkFDekQsU0FBUyxFQUFFLGFBQWE7eUJBQzNCLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FDbEIsQ0FBQztxQkFDTDt5QkFBTTt3QkFDSCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOzRCQUN6QixLQUFLLEVBQUUsb0JBQW9CLENBQUMsVUFBVTs0QkFDdEMsU0FBUyxFQUFFLGFBQWE7eUJBQzNCLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FDbEIsQ0FBQztxQkFDTDtnQkFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBOUVRLDBCQUEwQjtRQUR0QyxVQUFVLEVBQUU7UUFHSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO3lDQUZhLFNBQVM7T0FGbkUsMEJBQTBCLENBZ0Z0QztJQUFELGlDQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0FoRlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50RmVlZGJhY2ssIENvbnRlbnRGZWVkYmFja0ZpbHRlckNyaXRlcmlhLCBDb250ZW50RmVlZGJhY2tTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtDb250ZW50RmVlZGJhY2tFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7RGJTZXJ2aWNlLCBSZWFkUXVlcnl9IGZyb20gJy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudEZlZWRiYWNrSGFuZGxlcn0gZnJvbSAnLi4vaGFuZGxlcnMvY29udGVudC1mZWVkYmFjay1oYW5kbGVyJztcbmltcG9ydCB7UXVlcnlCdWlsZGVyfSBmcm9tICcuLi8uLi9kYi91dGlsL3F1ZXJ5LWJ1aWxkZXInO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZSwgUHJvZmlsZVNlc3Npb259IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtTaGFyZUl0ZW1UeXBlLCBUZWxlbWV0cnlTZXJ2aWNlfSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHsgaW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7IEluamVjdGlvblRva2VucyB9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRlbnRGZWVkYmFja1NlcnZpY2VJbXBsIGltcGxlbWVudHMgQ29udGVudEZlZWRiYWNrU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlBST0ZJTEVfU0VSVklDRSkgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuVEVMRU1FVFJZX1NFUlZJQ0UpIHByaXZhdGUgdGVsZW1ldHJ5U2VydmljZTogVGVsZW1ldHJ5U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgZ2V0RmVlZGJhY2soY29udGVudEZlZWRiYWNrRmlsdGVyQ3JpdGVyaWE6IENvbnRlbnRGZWVkYmFja0ZpbHRlckNyaXRlcmlhKTogT2JzZXJ2YWJsZTxDb250ZW50RmVlZGJhY2tbXT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7Q29udGVudEZlZWRiYWNrRW50cnkuVEFCTEVfTkFNRX0gJHtDb250ZW50VXRpbC5nZXRVaWRuSWRlbnRpZmllckZpbGVyKFxuICAgICAgICAgICAgY29udGVudEZlZWRiYWNrRmlsdGVyQ3JpdGVyaWEudWlkLCBjb250ZW50RmVlZGJhY2tGaWx0ZXJDcml0ZXJpYS5jb250ZW50SWQpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgbWFwKChmZWVkYmFja0xpc3Q6IENvbnRlbnRGZWVkYmFja0VudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmVlZGJhY2tMaXN0Lm1hcCgoZmVlZGJhY2s6IENvbnRlbnRGZWVkYmFja0VudHJ5LlNjaGVtYU1hcCkgPT5cbiAgICAgICAgICAgICAgICBDb250ZW50RmVlZGJhY2tIYW5kbGVyLm1hcEZlZWRiYWNrREJFbnRyeXRvUmVzcG9uc2VGZWVkYmFjayhmZWVkYmFjaykpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHNlbmRGZWVkYmFjayhjb250ZW50RmVlZGJhY2s6IENvbnRlbnRGZWVkYmFjayk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgocmVzcG9uc2U6IFByb2ZpbGVTZXNzaW9uIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRRdWVyeTogUmVhZFF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRGZWVkYmFja0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IG5ldyBRdWVyeUJ1aWxkZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aGVyZSgnPyA9ID8gQU5EID8gPSA/JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJncyhbQ29udGVudEZlZWRiYWNrRW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEZlZWRiYWNrLmNvbnRlbnRJZCwgQ29udGVudEZlZWRiYWNrRW50cnkuQ09MVU1OX05BTUVfVUlELCByZXNwb25zZSEudWlkXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnVpbGQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiAnMSdcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmZWVkYmFja01vZGVsOiBDb250ZW50RmVlZGJhY2tFbnRyeS5TY2hlbWFNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlc3BvbnNlIS51aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50RmVlZGJhY2suY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nOiBjb250ZW50RmVlZGJhY2sucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbnRlbnRGZWVkYmFjay5jb21tZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVsZW1ldHJ5U2VydmljZS5mZWVkYmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nOiBjb250ZW50RmVlZGJhY2sucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbnRlbnRGZWVkYmFjay5jb21tZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaklkOiBjb250ZW50RmVlZGJhY2suY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqVHlwZTogU2hhcmVJdGVtVHlwZS5DT05URU5ULnZhbHVlT2YoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialZlcjogY29udGVudEZlZWRiYWNrLmNvbnRlbnRWZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHJlYWRRdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHJvd3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBDb250ZW50RmVlZGJhY2tFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtDb250ZW50RmVlZGJhY2tFbnRyeS5DT0xVTU5fTkFNRV9VSUR9PSA/IEFORCAke0NvbnRlbnRGZWVkYmFja0VudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkNPTFVNTl9OQU1FX0NPTlRFTlRfSUR9PSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3Jlc3BvbnNlIS51aWQsIGNvbnRlbnRGZWVkYmFjay5jb250ZW50SWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IGZlZWRiYWNrTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRGZWVkYmFja0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogZmVlZGJhY2tNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCh2ID0+IHYgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=