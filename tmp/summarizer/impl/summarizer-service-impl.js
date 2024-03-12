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
import { ContentCache, SummarizerHandler, SummarizerQueries, SummaryTelemetryEventHandler } from '..';
import { DbService } from '../../db';
import { LearnerAssessmentsEntry, LearnerSummaryEntry } from '../../profile/db/schema';
import { NumberUtil } from '../../util/number-util';
import { EventNamespace } from '../../events-bus';
import { TelemetryEventType } from '../../telemetry/def/telemetry-event';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ValidationError } from '../../errors';
var SummarizerServiceImpl = /** @class */ (function () {
    function SummarizerServiceImpl(dbService, contenService, eventsBusService, courseService, sharedPreference, profileService) {
        this.dbService = dbService;
        this.contenService = contenService;
        this.eventsBusService = eventsBusService;
        this.courseService = courseService;
        this.sharedPreference = sharedPreference;
        this.profileService = profileService;
        this.summarizerTelemetryHandler = new SummaryTelemetryEventHandler(this.courseService, this.sharedPreference, this, this.eventsBusService, this.contenService, this.profileService);
    }
    SummarizerServiceImpl.prototype.onInit = function () {
        this.eventsBusService.registerObserver({ namespace: EventNamespace.TELEMETRY, observer: this });
        return of(undefined);
    };
    SummarizerServiceImpl.prototype.getDetailsPerQuestion = function (request) {
        var query = SummarizerQueries.getQuetsionDetailsQuery(request.uids, request.contentId, request.qId);
        return this.dbService.execute(query).pipe(map(function (questionSummaries) {
            return SummarizerHandler.mapDBEntriesToQuestionDetails(questionSummaries);
        }));
    };
    SummarizerServiceImpl.prototype.getLearnerAssessmentDetails = function (request) {
        var query = SummarizerQueries.getDetailReportsQuery(request.uids, request.contentId);
        return this.dbService.execute(query).pipe(map(function (assessmentDetailsInDb) {
            return SummarizerHandler.mapDBEntriesToLearnerAssesmentDetails(assessmentDetailsInDb);
        }));
    };
    SummarizerServiceImpl.prototype.getReportByQuestions = function (request) {
        var _this = this;
        var questionReportQuery = SummarizerQueries.getQuestionReportsQuery(request.uids, request.contentId);
        var accuracyQuery = SummarizerQueries.getReportAccuracyQuery(request.uids, request.contentId);
        return this.dbService.execute(accuracyQuery).pipe(map(function (accuracyReports) { return SummarizerHandler.mapDBEntriesToAccuracy(accuracyReports); }), mergeMap(function (accuracyMap) {
            return _this.dbService.execute(questionReportQuery).pipe(map(function (assessmentDetailsInDb) {
                return SummarizerHandler.mapDBEntriesToQuestionReports(accuracyMap, assessmentDetailsInDb);
            }));
        }));
    };
    SummarizerServiceImpl.prototype.getReportsByUser = function (request) {
        var query = SummarizerQueries.getReportsByUserQuery(request.uids, request.contentId);
        return this.dbService.execute(query).pipe(map(function (assesmentDetailsInDb) {
            return SummarizerHandler.mapDBEntriesToUserReports(assesmentDetailsInDb);
        }));
    };
    SummarizerServiceImpl.prototype.getSummary = function (request) {
        var _this = this;
        if (!request.uids) {
            throw new ValidationError('uids are mandatory');
        }
        var query = SummarizerQueries.getChildProgressQuery(request.uids);
        return this.getContentCache(request.uids).pipe(mergeMap(function (cache) {
            return _this.dbService.execute(query).pipe(map(function (assesmentsInDb) {
                return SummarizerHandler.mapDBEntriesToLearnerAssesmentSummary(assesmentsInDb, cache);
            }));
        }));
    };
    SummarizerServiceImpl.prototype.getContentCache = function (uids) {
        var _this = this;
        if (this.contentMap && Object.keys(this.contentMap).length) {
            return of(this.contentMap);
        }
        else {
            this.contentMap = new Map();
            var contentRequest = { resourcesOnly: true, primaryCategories: [], uid: uids };
            return this.contenService.getContents(contentRequest).pipe(map(function (results) {
                results.forEach(function (element) {
                    var cacheContent = new ContentCache();
                    cacheContent.name = element.contentData && element.contentData.name;
                    cacheContent.totalScore = element.contentData && element.contentData.totalScore;
                    cacheContent.lastUsedTime = element.lastUsedTime;
                    cacheContent.identifier = element.identifier;
                    _this.contentMap.set(element.identifier, cacheContent);
                });
                return _this.contentMap;
            }));
        }
    };
    SummarizerServiceImpl.prototype.saveLearnerAssessmentDetails = function (event) {
        var _this = this;
        var learnerAssesmentDetils = SummarizerHandler.mapTelemetryToLearnerAssesmentDetails(event);
        var learnerAssessmentDbSchema = SummarizerHandler.mapLearnerAssesmentDetailsToDbEntries(learnerAssesmentDetils);
        var filter = SummarizerQueries.getFilterForLearnerAssessmentDetails(learnerAssesmentDetils.qid, learnerAssesmentDetils.uid, learnerAssesmentDetils.contentId, learnerAssesmentDetils.hierarchyData);
        var query = SummarizerQueries.getLearnerAssessmentsQuery(filter);
        return this.dbService.execute(query).pipe(mergeMap(function (rows) {
            if (rows && rows.length) {
                return _this.dbService.update({
                    table: LearnerAssessmentsEntry.TABLE_NAME,
                    selection: SummarizerQueries.getUpdateSelection(),
                    selectionArgs: [learnerAssesmentDetils.uid,
                        learnerAssesmentDetils.contentId,
                        learnerAssesmentDetils.hierarchyData ? learnerAssesmentDetils.hierarchyData : '',
                        learnerAssesmentDetils.qid],
                    modelJson: learnerAssessmentDbSchema
                }).pipe(map(function (v) { return v > 0; }));
            }
            else {
                if (learnerAssesmentDetils.qid) {
                    return _this.dbService.insert({
                        table: LearnerAssessmentsEntry.TABLE_NAME,
                        modelJson: learnerAssessmentDbSchema
                    }).pipe(map(function (v) { return v > 0; }));
                }
                return of(false);
            }
        }));
    };
    SummarizerServiceImpl.prototype.saveLearnerContentSummaryDetails = function (event) {
        var _this = this;
        var learnerContentSummaryDetails = SummarizerHandler.mapTelemetryToContentSummaryDetails(event);
        var learnerAssessmentDbSchema = SummarizerHandler.mapContentSummaryDetailsToDbEntries(learnerContentSummaryDetails);
        return this.dbService.read({
            table: LearnerSummaryEntry.TABLE_NAME,
            selection: SummarizerQueries.getLearnerSummaryReadSelection(learnerContentSummaryDetails.hierarchyData),
            selectionArgs: [learnerContentSummaryDetails.uid,
                learnerContentSummaryDetails.contentId,
                learnerContentSummaryDetails.hierarchyData]
        }).pipe(mergeMap(function (rows) {
            if (rows && rows.length) {
                learnerAssessmentDbSchema.sessions = rows[0][LearnerSummaryEntry.COLUMN_NAME_SESSIONS] + 1;
                learnerAssessmentDbSchema.avg_ts = NumberUtil.toFixed(learnerContentSummaryDetails.timespent /
                    learnerContentSummaryDetails.sessions);
                learnerAssessmentDbSchema.total_ts = learnerContentSummaryDetails.timespent;
                learnerAssessmentDbSchema.last_updated_on = learnerContentSummaryDetails.timestamp;
                return _this.dbService.update({
                    table: LearnerSummaryEntry.TABLE_NAME,
                    selection: SummarizerQueries.getLearnerSummaryReadSelection(learnerContentSummaryDetails.hierarchyData),
                    selectionArgs: [learnerContentSummaryDetails.uid,
                        learnerContentSummaryDetails.contentId,
                        learnerContentSummaryDetails.hierarchyData],
                    modelJson: learnerAssessmentDbSchema
                }).pipe(map(function (v) { return v > 0; }));
            }
            else {
                learnerAssessmentDbSchema.avg_ts = learnerContentSummaryDetails.timespent;
                learnerAssessmentDbSchema.sessions = 1;
                learnerAssessmentDbSchema.total_ts = learnerContentSummaryDetails.timespent;
                learnerAssessmentDbSchema.last_updated_on = learnerContentSummaryDetails.timestamp;
                return _this.dbService.insert({
                    table: LearnerSummaryEntry.TABLE_NAME,
                    modelJson: learnerAssessmentDbSchema
                }).pipe(map(function (v) { return v > 0; }));
            }
        }));
    };
    SummarizerServiceImpl.prototype.deletePreviousAssessmentDetails = function (uid, contentId) {
        var _this = this;
        return this.dbService.read({
            table: LearnerSummaryEntry.TABLE_NAME,
            selection: LearnerSummaryEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerSummaryEntry.COLUMN_NAME_UID + " = ?",
            selectionArgs: [contentId, uid]
        }).pipe(mergeMap(function (summariesinDb) {
            if (summariesinDb && summariesinDb.length) {
                return _this.dbService.delete({
                    table: LearnerSummaryEntry.TABLE_NAME,
                    selection: LearnerSummaryEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerSummaryEntry.COLUMN_NAME_UID + " = ?",
                    selectionArgs: [contentId, uid]
                });
            }
            else {
                return of(undefined);
            }
        }), mergeMap(function () {
            return _this.dbService.read({
                table: LearnerAssessmentsEntry.TABLE_NAME,
                selection: LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerAssessmentsEntry.COLUMN_NAME_UID + " = ?",
                selectionArgs: [contentId, uid]
            });
        }), mergeMap(function (assesmentsInDb) {
            if (assesmentsInDb && assesmentsInDb.length) {
                return _this.dbService.delete({
                    table: LearnerAssessmentsEntry.TABLE_NAME,
                    selection: LearnerAssessmentsEntry.COLUMN_NAME_CONTENT_ID + " = ? AND " + LearnerAssessmentsEntry.COLUMN_NAME_UID + " = ?",
                    selectionArgs: [contentId, uid]
                });
            }
            else {
                return of(undefined);
            }
        }));
    };
    SummarizerServiceImpl.prototype.onEvent = function (event) {
        if (event.type === TelemetryEventType.SAVE) {
            return this.summarizerTelemetryHandler.handle(event.payload);
        }
        return of(undefined);
    };
    SummarizerServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.CONTENT_SERVICE)),
        __param(2, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(3, inject(InjectionTokens.COURSE_SERVICE)),
        __param(4, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(5, inject(InjectionTokens.PROFILE_SERVICE)),
        __metadata("design:paramtypes", [DbService, Object, Object, Object, Object, Object])
    ], SummarizerServiceImpl);
    return SummarizerServiceImpl;
}());
export { SummarizerServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyaXplci1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3VtbWFyaXplci9pbXBsL3N1bW1hcml6ZXItc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxZQUFZLEVBTVosaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUdqQiw0QkFBNEIsRUFDL0IsTUFBTSxJQUFJLENBQUM7QUFDWixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXJGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE9BQU8sRUFBaUIsa0JBQWtCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUl2RixPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFJN0M7SUFJSSwrQkFDZ0QsU0FBb0IsRUFDZixhQUE2QixFQUMxQixnQkFBa0MsRUFDdEMsYUFBNEIsRUFDeEIsZ0JBQW1DLEVBQ3RDLGNBQThCO1FBTG5DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFDMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUUvRSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQzlHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzlGLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxREFBcUIsR0FBckIsVUFBc0IsT0FBdUI7UUFDekMsSUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLFVBQUMsaUJBQW9DO1lBQ3JDLE9BQUEsaUJBQWlCLENBQUMsNkJBQTZCLENBQUMsaUJBQWlCLENBQUM7UUFBbEUsQ0FBa0UsQ0FBQyxDQUMxRSxDQUFDO0lBQ04sQ0FBQztJQUVELDJEQUEyQixHQUEzQixVQUE0QixPQUF1QjtRQUMvQyxJQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLFVBQUMscUJBQTBEO1lBQzNELE9BQUEsaUJBQWlCLENBQUMscUNBQXFDLENBQUMscUJBQXFCLENBQUM7UUFBOUUsQ0FBOEUsQ0FBQyxDQUN0RixDQUFDO0lBQ04sQ0FBQztJQUVELG9EQUFvQixHQUFwQixVQUFxQixPQUF1QjtRQUE1QyxpQkFhQztRQVpHLElBQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkcsSUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQzdDLEdBQUcsQ0FBQyxVQUFDLGVBQXlELElBQUssT0FBQSxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBekQsQ0FBeUQsQ0FBQyxFQUM3SCxRQUFRLENBQUMsVUFBQyxXQUFtQztZQUN6QyxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsVUFBQyxxQkFDbUQ7Z0JBQ3BELE9BQUEsaUJBQWlCLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLHFCQUFxQixDQUFDO1lBQW5GLENBQW1GLENBQUMsQ0FDM0YsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCLFVBQWlCLE9BQXVCO1FBQ3BDLElBQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsVUFBQyxvQkFBZ0U7WUFDakUsT0FBQSxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUFqRSxDQUFpRSxDQUFDLENBQ3pFLENBQUM7SUFDTixDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLE9BQXVCO1FBQWxDLGlCQWFDO1FBWkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDZixNQUFNLElBQUksZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzFDLFFBQVEsQ0FBQyxVQUFDLEtBQWdDO1lBQ3RDLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsVUFBQyxjQUErQztnQkFDaEQsT0FBQSxpQkFBaUIsQ0FBQyxxQ0FBcUMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO1lBQTlFLENBQThFLENBQUMsQ0FDdEYsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sK0NBQWUsR0FBdkIsVUFBd0IsSUFBYztRQUF0QyxpQkFvQkM7UUFuQkcsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUN4RCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7WUFDbEQsSUFBTSxjQUFjLEdBQW1CLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO1lBQy9GLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUN0RCxHQUFHLENBQUMsVUFBQyxPQUFrQjtnQkFDbkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQ25CLElBQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7b0JBQ3hDLFlBQVksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDcEUsWUFBWSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO29CQUNoRixZQUFZLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBQ2pELFlBQVksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCw0REFBNEIsR0FBNUIsVUFBNkIsS0FBZ0I7UUFBN0MsaUJBb0NDO1FBbkNHLElBQU0sc0JBQXNCLEdBQTZCLGlCQUFpQixDQUFDLHFDQUFxQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hILElBQU0seUJBQXlCLEdBQzNCLGlCQUFpQixDQUFDLHFDQUFxQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEYsSUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsb0NBQW9DLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLEdBQUcsRUFDeEgsc0JBQXNCLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLElBQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNyQyxRQUFRLENBQUMsVUFBQyxJQUF5QztZQUMvQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNyQixPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUN6QixLQUFLLEVBQUUsdUJBQXVCLENBQUMsVUFBVTtvQkFDekMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFO29CQUNqRCxhQUFhLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHO3dCQUN0QyxzQkFBc0IsQ0FBQyxTQUFTO3dCQUNoQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDaEYsc0JBQXNCLENBQUMsR0FBRyxDQUFDO29CQUMvQixTQUFTLEVBQUUseUJBQXlCO2lCQUN2QyxDQUFDLENBQUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxDQUFDLENBQ2xCLENBQUM7YUFFTDtpQkFBTTtnQkFDSCxJQUFJLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtvQkFDNUIsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzt3QkFDekIsS0FBSyxFQUFFLHVCQUF1QixDQUFDLFVBQVU7d0JBQ3pDLFNBQVMsRUFBRSx5QkFBeUI7cUJBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FDbEIsQ0FBQztpQkFDTDtnQkFFRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsZ0VBQWdDLEdBQWhDLFVBQWlDLEtBQWdCO1FBQWpELGlCQTJDQztRQTFDRyxJQUFNLDRCQUE0QixHQUFpQyxpQkFBaUIsQ0FBQyxtQ0FBbUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoSSxJQUFNLHlCQUF5QixHQUMzQixpQkFBaUIsQ0FBQyxtQ0FBbUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFVBQVU7WUFDckMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLDhCQUE4QixDQUFDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQztZQUN2RyxhQUFhLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHO2dCQUM1Qyw0QkFBNEIsQ0FBQyxTQUFTO2dCQUN0Qyw0QkFBNEIsQ0FBQyxhQUFhLENBQUM7U0FDbEQsQ0FBQyxDQUFDLElBQUksQ0FDSCxRQUFRLENBQUMsVUFBQyxJQUF5QztZQUMvQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNyQix5QkFBeUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzRix5QkFBeUIsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTO29CQUN4Riw0QkFBNEIsQ0FBQyxRQUFTLENBQUMsQ0FBQztnQkFDNUMseUJBQXlCLENBQUMsUUFBUSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDNUUseUJBQXlCLENBQUMsZUFBZSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDbkYsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFVBQVU7b0JBQ3JDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQyw0QkFBNEIsQ0FBQyxhQUFhLENBQUM7b0JBQ3ZHLGFBQWEsRUFBRSxDQUFDLDRCQUE0QixDQUFDLEdBQUc7d0JBQzVDLDRCQUE0QixDQUFDLFNBQVM7d0JBQ3RDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQztvQkFDL0MsU0FBUyxFQUFFLHlCQUF5QjtpQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssQ0FBQyxDQUNsQixDQUFDO2FBRUw7aUJBQU07Z0JBQ0gseUJBQXlCLENBQUMsTUFBTSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDMUUseUJBQXlCLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDdkMseUJBQXlCLENBQUMsUUFBUSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDNUUseUJBQXlCLENBQUMsZUFBZSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQztnQkFDbkYsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFVBQVU7b0JBQ3JDLFNBQVMsRUFBRSx5QkFBeUI7aUJBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FDbEIsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCwrREFBK0IsR0FBL0IsVUFBZ0MsR0FBVyxFQUFFLFNBQWlCO1FBQTlELGlCQW9DQztRQW5DRyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxVQUFVO1lBQ3JDLFNBQVMsRUFBSyxtQkFBbUIsQ0FBQyxzQkFBc0IsaUJBQVksbUJBQW1CLENBQUMsZUFBZSxTQUFNO1lBQzdHLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7U0FDbEMsQ0FBQyxDQUFDLElBQUksQ0FDSCxRQUFRLENBQUMsVUFBQyxhQUE4QztZQUNwRCxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUN2QyxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CLENBQUMsVUFBVTtvQkFDckMsU0FBUyxFQUFLLG1CQUFtQixDQUFDLHNCQUFzQixpQkFBWSxtQkFBbUIsQ0FBQyxlQUFlLFNBQU07b0JBQzdHLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7aUJBQ2xDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsUUFBUSxDQUFDO1lBQ0wsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLHVCQUF1QixDQUFDLFVBQVU7Z0JBQ3pDLFNBQVMsRUFBSyx1QkFBdUIsQ0FBQyxzQkFBc0IsaUJBQVksdUJBQXVCLENBQUMsZUFBZSxTQUFNO2dCQUNySCxhQUFhLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO2FBQ2xDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxVQUFDLGNBQW1EO1lBQ3pELElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQ3pCLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxVQUFVO29CQUN6QyxTQUFTLEVBQUssdUJBQXVCLENBQUMsc0JBQXNCLGlCQUFZLHVCQUF1QixDQUFDLGVBQWUsU0FBTTtvQkFDckgsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQztpQkFDbEMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELHVDQUFPLEdBQVAsVUFBUSxLQUFxQjtRQUN6QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsSUFBSSxFQUFFO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEU7UUFFRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBaE9RLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7UUFNSixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN0QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7eUNBTGUsU0FBUztPQUwzRCxxQkFBcUIsQ0FpT2pDO0lBQUQsNEJBQUM7Q0FBQSxBQWpPRCxJQWlPQztTQWpPWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbnRlbnRDYWNoZSxcbiAgICBMZWFybmVyQXNzZXNzbWVudERldGFpbHMsXG4gICAgTGVhcm5lckFzc2Vzc21lbnRTdW1tYXJ5LFxuICAgIExlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMsXG4gICAgUXVlc3Rpb25TdW1tYXJ5LFxuICAgIFJlcG9ydERldGFpbFBlclVzZXIsXG4gICAgU3VtbWFyaXplckhhbmRsZXIsXG4gICAgU3VtbWFyaXplclF1ZXJpZXMsXG4gICAgU3VtbWFyaXplclNlcnZpY2UsXG4gICAgU3VtbWFyeVJlcXVlc3QsXG4gICAgU3VtbWFyeVRlbGVtZXRyeUV2ZW50SGFuZGxlclxufSBmcm9tICcuLic7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeSwgTGVhcm5lclN1bW1hcnlFbnRyeX0gZnJvbSAnLi4vLi4vcHJvZmlsZS9kYi9zY2hlbWEnO1xuaW1wb3J0IHtTdW5iaXJkVGVsZW1ldHJ5fSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtOdW1iZXJVdGlsfSBmcm9tICcuLi8uLi91dGlsL251bWJlci11dGlsJztcbmltcG9ydCB7RXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c1NlcnZpY2V9IGZyb20gJy4uLy4uL2V2ZW50cy1idXMnO1xuaW1wb3J0IHtDb250ZW50LCBDb250ZW50UmVxdWVzdCwgQ29udGVudFNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtUZWxlbWV0cnlFdmVudCwgVGVsZW1ldHJ5RXZlbnRUeXBlfSBmcm9tICcuLi8uLi90ZWxlbWV0cnkvZGVmL3RlbGVtZXRyeS1ldmVudCc7XG5pbXBvcnQge0NvdXJzZVNlcnZpY2V9IGZyb20gJy4uLy4uL2NvdXJzZSc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge1Byb2ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9wcm9maWxlJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtFdmVudE9ic2VydmVyfSBmcm9tICcuLi8uLi9ldmVudHMtYnVzL2RlZi9ldmVudC1vYnNlcnZlcic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBtZXJnZU1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtWYWxpZGF0aW9uRXJyb3J9IGZyb20gJy4uLy4uL2Vycm9ycyc7XG5pbXBvcnQgVGVsZW1ldHJ5ID0gU3VuYmlyZFRlbGVtZXRyeS5UZWxlbWV0cnk7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdW1tYXJpemVyU2VydmljZUltcGwgaW1wbGVtZW50cyBTdW1tYXJpemVyU2VydmljZSwgRXZlbnRPYnNlcnZlcjxUZWxlbWV0cnlFdmVudD4ge1xuICAgIHByaXZhdGUgY29udGVudE1hcDogTWFwPHN0cmluZywgQ29udGVudENhY2hlPjtcbiAgICBwcml2YXRlIHN1bW1hcml6ZXJUZWxlbWV0cnlIYW5kbGVyOiBTdW1tYXJ5VGVsZW1ldHJ5RXZlbnRIYW5kbGVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkNPTlRFTlRfU0VSVklDRSkgcHJpdmF0ZSBjb250ZW5TZXJ2aWNlOiBDb250ZW50U2VydmljZSxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRVZFTlRTX0JVU19TRVJWSUNFKSBwcml2YXRlIGV2ZW50c0J1c1NlcnZpY2U6IEV2ZW50c0J1c1NlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkNPVVJTRV9TRVJWSUNFKSBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKSBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnN1bW1hcml6ZXJUZWxlbWV0cnlIYW5kbGVyID0gbmV3IFN1bW1hcnlUZWxlbWV0cnlFdmVudEhhbmRsZXIodGhpcy5jb3Vyc2VTZXJ2aWNlLCB0aGlzLnNoYXJlZFByZWZlcmVuY2UsIHRoaXMsXG4gICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UsIHRoaXMuY29udGVuU2VydmljZSwgdGhpcy5wcm9maWxlU2VydmljZSk7XG4gICAgfVxuXG4gICAgb25Jbml0KCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHRoaXMuZXZlbnRzQnVzU2VydmljZS5yZWdpc3Rlck9ic2VydmVyKHtuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLlRFTEVNRVRSWSwgb2JzZXJ2ZXI6IHRoaXN9KTtcbiAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgZ2V0RGV0YWlsc1BlclF1ZXN0aW9uKHJlcXVlc3Q6IFN1bW1hcnlSZXF1ZXN0KTogT2JzZXJ2YWJsZTx7IFtwOiBzdHJpbmddOiBhbnkgfVtdPiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0UXVldHNpb25EZXRhaWxzUXVlcnkocmVxdWVzdC51aWRzLCByZXF1ZXN0LmNvbnRlbnRJZCwgcmVxdWVzdC5xSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocXVlc3Rpb25TdW1tYXJpZXM6IFF1ZXN0aW9uU3VtbWFyeVtdKSA9PlxuICAgICAgICAgICAgICAgIFN1bW1hcml6ZXJIYW5kbGVyLm1hcERCRW50cmllc1RvUXVlc3Rpb25EZXRhaWxzKHF1ZXN0aW9uU3VtbWFyaWVzKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRMZWFybmVyQXNzZXNzbWVudERldGFpbHMocmVxdWVzdDogU3VtbWFyeVJlcXVlc3QpOiBPYnNlcnZhYmxlPE1hcDxzdHJpbmcsIFJlcG9ydERldGFpbFBlclVzZXI+PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0RGV0YWlsUmVwb3J0c1F1ZXJ5KHJlcXVlc3QudWlkcywgcmVxdWVzdC5jb250ZW50SWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoYXNzZXNzbWVudERldGFpbHNJbkRiOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5TY2hlbWFNYXBbXSkgPT5cbiAgICAgICAgICAgICAgICBTdW1tYXJpemVySGFuZGxlci5tYXBEQkVudHJpZXNUb0xlYXJuZXJBc3Nlc21lbnREZXRhaWxzKGFzc2Vzc21lbnREZXRhaWxzSW5EYikpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UmVwb3J0QnlRdWVzdGlvbnMocmVxdWVzdDogU3VtbWFyeVJlcXVlc3QpOiBPYnNlcnZhYmxlPHsgW3A6IHN0cmluZ106IGFueSB9W10+IHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25SZXBvcnRRdWVyeSA9IFN1bW1hcml6ZXJRdWVyaWVzLmdldFF1ZXN0aW9uUmVwb3J0c1F1ZXJ5KHJlcXVlc3QudWlkcywgcmVxdWVzdC5jb250ZW50SWQpO1xuICAgICAgICBjb25zdCBhY2N1cmFjeVF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0UmVwb3J0QWNjdXJhY3lRdWVyeShyZXF1ZXN0LnVpZHMsIHJlcXVlc3QuY29udGVudElkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUoYWNjdXJhY3lRdWVyeSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoYWNjdXJhY3lSZXBvcnRzOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5BY2N1cmFjeVNjaGVtYVtdKSA9PiBTdW1tYXJpemVySGFuZGxlci5tYXBEQkVudHJpZXNUb0FjY3VyYWN5KGFjY3VyYWN5UmVwb3J0cykpLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGFjY3VyYWN5TWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlc3Rpb25SZXBvcnRRdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChhc3Nlc3NtZW50RGV0YWlsc0luRGI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlF1ZXN0aW9uUmVwb3J0c1NjaGVtYVtdKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgU3VtbWFyaXplckhhbmRsZXIubWFwREJFbnRyaWVzVG9RdWVzdGlvblJlcG9ydHMoYWNjdXJhY3lNYXAsIGFzc2Vzc21lbnREZXRhaWxzSW5EYikpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UmVwb3J0c0J5VXNlcihyZXF1ZXN0OiBTdW1tYXJ5UmVxdWVzdCk6IE9ic2VydmFibGU8eyBbcDogc3RyaW5nXTogYW55IH1bXT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IFN1bW1hcml6ZXJRdWVyaWVzLmdldFJlcG9ydHNCeVVzZXJRdWVyeShyZXF1ZXN0LnVpZHMsIHJlcXVlc3QuY29udGVudElkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGFzc2VzbWVudERldGFpbHNJbkRiOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5Vc2VyUmVwb3J0U2NoZW1hW10pID0+XG4gICAgICAgICAgICAgICAgU3VtbWFyaXplckhhbmRsZXIubWFwREJFbnRyaWVzVG9Vc2VyUmVwb3J0cyhhc3Nlc21lbnREZXRhaWxzSW5EYikpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0U3VtbWFyeShyZXF1ZXN0OiBTdW1tYXJ5UmVxdWVzdCk6IE9ic2VydmFibGU8TGVhcm5lckFzc2Vzc21lbnRTdW1tYXJ5W10+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0LnVpZHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3IoJ3VpZHMgYXJlIG1hbmRhdG9yeScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0Q2hpbGRQcm9ncmVzc1F1ZXJ5KHJlcXVlc3QudWlkcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnRDYWNoZShyZXF1ZXN0LnVpZHMpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoY2FjaGU6IE1hcDxzdHJpbmcsIENvbnRlbnRDYWNoZT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChhc3Nlc21lbnRzSW5EYjogTGVhcm5lclN1bW1hcnlFbnRyeS5TY2hlbWFNYXBbXSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFN1bW1hcml6ZXJIYW5kbGVyLm1hcERCRW50cmllc1RvTGVhcm5lckFzc2VzbWVudFN1bW1hcnkoYXNzZXNtZW50c0luRGIsIGNhY2hlKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbnRlbnRDYWNoZSh1aWRzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8TWFwPHN0cmluZywgQ29udGVudENhY2hlPj4ge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50TWFwICYmIE9iamVjdC5rZXlzKHRoaXMuY29udGVudE1hcCkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5jb250ZW50TWFwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBDb250ZW50Q2FjaGU+KCk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UmVxdWVzdDogQ29udGVudFJlcXVlc3QgPSB7cmVzb3VyY2VzT25seTogdHJ1ZSwgcHJpbWFyeUNhdGVnb3JpZXM6IFtdLCB1aWQ6IHVpZHN9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVuU2VydmljZS5nZXRDb250ZW50cyhjb250ZW50UmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKHJlc3VsdHM6IENvbnRlbnRbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUNvbnRlbnQgPSBuZXcgQ29udGVudENhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUNvbnRlbnQubmFtZSA9IGVsZW1lbnQuY29udGVudERhdGEgJiYgZWxlbWVudC5jb250ZW50RGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVDb250ZW50LnRvdGFsU2NvcmUgPSBlbGVtZW50LmNvbnRlbnREYXRhICYmIGVsZW1lbnQuY29udGVudERhdGEudG90YWxTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlQ29udGVudC5sYXN0VXNlZFRpbWUgPSBlbGVtZW50Lmxhc3RVc2VkVGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlQ29udGVudC5pZGVudGlmaWVyID0gZWxlbWVudC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50TWFwLnNldChlbGVtZW50LmlkZW50aWZpZXIsIGNhY2hlQ29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50TWFwO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUxlYXJuZXJBc3Nlc3NtZW50RGV0YWlscyhldmVudDogVGVsZW1ldHJ5KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGxlYXJuZXJBc3Nlc21lbnREZXRpbHM6IExlYXJuZXJBc3Nlc3NtZW50RGV0YWlscyA9IFN1bW1hcml6ZXJIYW5kbGVyLm1hcFRlbGVtZXRyeVRvTGVhcm5lckFzc2VzbWVudERldGFpbHMoZXZlbnQpO1xuICAgICAgICBjb25zdCBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5TY2hlbWFNYXAgPVxuICAgICAgICAgICAgU3VtbWFyaXplckhhbmRsZXIubWFwTGVhcm5lckFzc2VzbWVudERldGFpbHNUb0RiRW50cmllcyhsZWFybmVyQXNzZXNtZW50RGV0aWxzKTtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gU3VtbWFyaXplclF1ZXJpZXMuZ2V0RmlsdGVyRm9yTGVhcm5lckFzc2Vzc21lbnREZXRhaWxzKGxlYXJuZXJBc3Nlc21lbnREZXRpbHMucWlkLCBsZWFybmVyQXNzZXNtZW50RGV0aWxzLnVpZCxcbiAgICAgICAgICAgIGxlYXJuZXJBc3Nlc21lbnREZXRpbHMuY29udGVudElkLCBsZWFybmVyQXNzZXNtZW50RGV0aWxzLmhpZXJhcmNoeURhdGEpO1xuICAgICAgICBjb25zdCBxdWVyeSA9IFN1bW1hcml6ZXJRdWVyaWVzLmdldExlYXJuZXJBc3Nlc3NtZW50c1F1ZXJ5KGZpbHRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKHF1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHJvd3M6IExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogU3VtbWFyaXplclF1ZXJpZXMuZ2V0VXBkYXRlU2VsZWN0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbbGVhcm5lckFzc2VzbWVudERldGlscy51aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2VzbWVudERldGlscy5jb250ZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2VzbWVudERldGlscy5oaWVyYXJjaHlEYXRhID8gbGVhcm5lckFzc2VzbWVudERldGlscy5oaWVyYXJjaHlEYXRhIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2VzbWVudERldGlscy5xaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWFybmVyQXNzZXNtZW50RGV0aWxzLnFpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCh2ID0+IHYgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzYXZlTGVhcm5lckNvbnRlbnRTdW1tYXJ5RGV0YWlscyhldmVudDogVGVsZW1ldHJ5KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHM6IExlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMgPSBTdW1tYXJpemVySGFuZGxlci5tYXBUZWxlbWV0cnlUb0NvbnRlbnRTdW1tYXJ5RGV0YWlscyhldmVudCk7XG4gICAgICAgIGNvbnN0IGxlYXJuZXJBc3Nlc3NtZW50RGJTY2hlbWE6IExlYXJuZXJTdW1tYXJ5RW50cnkuU2NoZW1hTWFwID1cbiAgICAgICAgICAgIFN1bW1hcml6ZXJIYW5kbGVyLm1hcENvbnRlbnRTdW1tYXJ5RGV0YWlsc1RvRGJFbnRyaWVzKGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogTGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBTdW1tYXJpemVyUXVlcmllcy5nZXRMZWFybmVyU3VtbWFyeVJlYWRTZWxlY3Rpb24obGVhcm5lckNvbnRlbnRTdW1tYXJ5RGV0YWlscy5oaWVyYXJjaHlEYXRhKSxcbiAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLnVpZCxcbiAgICAgICAgICAgICAgICBsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgICBsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLmhpZXJhcmNoeURhdGFdXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocm93czogTGVhcm5lckFzc2Vzc21lbnRzRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hLnNlc3Npb25zID0gcm93c1swXVtMZWFybmVyU3VtbWFyeUVudHJ5LkNPTFVNTl9OQU1FX1NFU1NJT05TXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGxlYXJuZXJBc3Nlc3NtZW50RGJTY2hlbWEuYXZnX3RzID0gTnVtYmVyVXRpbC50b0ZpeGVkKGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMudGltZXNwZW50IC9cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMuc2Vzc2lvbnMhKTtcbiAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2Vzc21lbnREYlNjaGVtYS50b3RhbF90cyA9IGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMudGltZXNwZW50O1xuICAgICAgICAgICAgICAgICAgICBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hLmxhc3RfdXBkYXRlZF9vbiA9IGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyU3VtbWFyeUVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFN1bW1hcml6ZXJRdWVyaWVzLmdldExlYXJuZXJTdW1tYXJ5UmVhZFNlbGVjdGlvbihsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLmhpZXJhcmNoeURhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2xlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMudWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMuY29udGVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuZXJDb250ZW50U3VtbWFyeURldGFpbHMuaGllcmFyY2h5RGF0YV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IGxlYXJuZXJBc3Nlc3NtZW50RGJTY2hlbWFcbiAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCh2ID0+IHYgPiAwKVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2Vzc21lbnREYlNjaGVtYS5hdmdfdHMgPSBsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLnRpbWVzcGVudDtcbiAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2Vzc21lbnREYlNjaGVtYS5zZXNzaW9ucyA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGxlYXJuZXJBc3Nlc3NtZW50RGJTY2hlbWEudG90YWxfdHMgPSBsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLnRpbWVzcGVudDtcbiAgICAgICAgICAgICAgICAgICAgbGVhcm5lckFzc2Vzc21lbnREYlNjaGVtYS5sYXN0X3VwZGF0ZWRfb24gPSBsZWFybmVyQ29udGVudFN1bW1hcnlEZXRhaWxzLnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogTGVhcm5lclN1bW1hcnlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBsZWFybmVyQXNzZXNzbWVudERiU2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZVByZXZpb3VzQXNzZXNzbWVudERldGFpbHModWlkOiBzdHJpbmcsIGNvbnRlbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IExlYXJuZXJTdW1tYXJ5RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSA9ID8gQU5EICR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbY29udGVudElkLCB1aWRdXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoc3VtbWFyaWVzaW5EYjogTGVhcm5lclN1bW1hcnlFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdW1tYXJpZXNpbkRiICYmIHN1bW1hcmllc2luRGIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5kZWxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IExlYXJuZXJTdW1tYXJ5RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSA9ID8gQU5EICR7TGVhcm5lclN1bW1hcnlFbnRyeS5DT0xVTU5fTkFNRV9VSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbY29udGVudElkLCB1aWRdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7TGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9JRH0gPSA/IEFORCAke0xlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LkNPTFVNTl9OQU1FX1VJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2NvbnRlbnRJZCwgdWlkXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoYXNzZXNtZW50c0luRGI6IExlYXJuZXJBc3Nlc3NtZW50c0VudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFzc2VzbWVudHNJbkRiICYmIGFzc2VzbWVudHNJbkRiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX0lEfSA9ID8gQU5EICR7TGVhcm5lckFzc2Vzc21lbnRzRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2NvbnRlbnRJZCwgdWlkXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uRXZlbnQoZXZlbnQ6IFRlbGVtZXRyeUV2ZW50KTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFRlbGVtZXRyeUV2ZW50VHlwZS5TQVZFKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdW1tYXJpemVyVGVsZW1ldHJ5SGFuZGxlci5oYW5kbGUoZXZlbnQucGF5bG9hZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICB9XG59XG4iXX0=