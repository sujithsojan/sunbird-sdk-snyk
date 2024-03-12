var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Migration } from '..';
import { EventPriorityEntry, TelemetryEntry, TelemetryProcessedEntry, TelemetryTagEntry } from '../../telemetry/db/schema';
import { ImportedMetadataEntry, LearnerAssessmentsEntry, LearnerSummaryEntry, ProfileEntry, UserEntry } from '../../profile/db/schema';
import { GroupEntry, GroupProfileEntry } from '../../group-deprecated/db/schema';
import { PartnerEntry } from '../../partner/db/schema';
import { ContentAccessEntry, ContentEntry, ContentFeedbackEntry, ContentMarkerEntry } from '../../content/db/schema';
import { NotificationEntry } from '../../notification/db/schema';
import { KeyValueStoreEntry } from '../../key-value-store/db/schema';
import { ErrorStackEntry } from '../../error/db/schema';
import { SearchHistoryEntry } from '../../util/search-history/db/schema';
import { CourseAssessmentEntry } from '../../summarizer/db/schema';
import { NetworkQueueEntry } from '../../api/network-queue';
import { PlayerConfigEntry } from '../../player/db/schema';
import { CertificatePublicKeyEntry } from '../../certificate/db/schema';
var InitialMigration = /** @class */ (function (_super) {
    __extends(InitialMigration, _super);
    function InitialMigration() {
        return _super.call(this, 1, 16) || this;
    }
    InitialMigration.prototype.apply = function (dbService) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.queries().map(function (query) { return dbService.execute(query).toPromise(); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitialMigration.prototype.queries = function () {
        return [
            TelemetryEntry.getCreateEntry(),
            TelemetryProcessedEntry.getCreateEntry(),
            TelemetryTagEntry.getCreateEntry(),
            EventPriorityEntry.getCreateEntry(),
            UserEntry.getCreateEntry(),
            ProfileEntry.getCreateEntry(),
            ImportedMetadataEntry.getCreateEntry(),
            PartnerEntry.getCreateEntry(),
            ContentEntry.getCreateEntry(),
            LearnerAssessmentsEntry.getCreateEntry(),
            LearnerSummaryEntry.getCreateEntry(),
            ContentAccessEntry.getCreateEntry(),
            ContentFeedbackEntry.getCreateEntry(),
            NotificationEntry.getCreateEntry(),
            GroupEntry.getCreateEntry(),
            GroupProfileEntry.getCreateEntry(),
            KeyValueStoreEntry.getCreateEntry(),
            ContentMarkerEntry.getCreateEntry(),
            ErrorStackEntry.getCreateEntry(),
            SearchHistoryEntry.getCreateEntry(),
            CourseAssessmentEntry.getCreateEntry(),
            NetworkQueueEntry.getCreateEntry(),
            PlayerConfigEntry.getCreateEntry(),
            CertificatePublicKeyEntry.getCreateEntry()
        ];
    };
    return InitialMigration;
}(Migration));
export { InitialMigration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbC1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvbWlncmF0aW9ucy9pbml0aWFsLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFZLFNBQVMsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN4QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDekgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNySSxPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNuSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEU7SUFBc0Msb0NBQVM7SUFFM0M7ZUFDSSxrQkFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFWSxnQ0FBSyxHQUFsQixVQUFtQixTQUFvQjs7Ozs0QkFDbkMscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDLEVBQUE7O3dCQUF0RixTQUFzRixDQUFDO3dCQUN2RixzQkFBTzs7OztLQUNWO0lBRUQsa0NBQU8sR0FBUDtRQUNJLE9BQU87WUFDSCxjQUFjLENBQUMsY0FBYyxFQUFFO1lBQy9CLHVCQUF1QixDQUFDLGNBQWMsRUFBRTtZQUN4QyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7WUFDbEMsa0JBQWtCLENBQUMsY0FBYyxFQUFFO1lBQ25DLFNBQVMsQ0FBQyxjQUFjLEVBQUU7WUFDMUIsWUFBWSxDQUFDLGNBQWMsRUFBRTtZQUM3QixxQkFBcUIsQ0FBQyxjQUFjLEVBQUU7WUFDdEMsWUFBWSxDQUFDLGNBQWMsRUFBRTtZQUM3QixZQUFZLENBQUMsY0FBYyxFQUFFO1lBQzdCLHVCQUF1QixDQUFDLGNBQWMsRUFBRTtZQUN4QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUU7WUFDcEMsa0JBQWtCLENBQUMsY0FBYyxFQUFFO1lBQ25DLG9CQUFvQixDQUFDLGNBQWMsRUFBRTtZQUNyQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7WUFDbEMsVUFBVSxDQUFDLGNBQWMsRUFBRTtZQUMzQixpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7WUFDbEMsa0JBQWtCLENBQUMsY0FBYyxFQUFFO1lBQ25DLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtZQUNuQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2hDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtZQUNuQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUU7WUFDdEMsaUJBQWlCLENBQUMsY0FBYyxFQUFFO1lBQ2xDLGlCQUFpQixDQUFDLGNBQWMsRUFBRTtZQUNsQyx5QkFBeUIsQ0FBQyxjQUFjLEVBQUU7U0FDN0MsQ0FBQztJQUNOLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUF4Q0QsQ0FBc0MsU0FBUyxHQXdDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZSwgTWlncmF0aW9ufSBmcm9tICcuLic7XG5pbXBvcnQge0V2ZW50UHJpb3JpdHlFbnRyeSwgVGVsZW1ldHJ5RW50cnksIFRlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LCBUZWxlbWV0cnlUYWdFbnRyeX0gZnJvbSAnLi4vLi4vdGVsZW1ldHJ5L2RiL3NjaGVtYSc7XG5pbXBvcnQge0ltcG9ydGVkTWV0YWRhdGFFbnRyeSwgTGVhcm5lckFzc2Vzc21lbnRzRW50cnksIExlYXJuZXJTdW1tYXJ5RW50cnksIFByb2ZpbGVFbnRyeSwgVXNlckVudHJ5fSBmcm9tICcuLi8uLi9wcm9maWxlL2RiL3NjaGVtYSc7XG5pbXBvcnQge0dyb3VwRW50cnksIEdyb3VwUHJvZmlsZUVudHJ5fSBmcm9tICcuLi8uLi9ncm91cC1kZXByZWNhdGVkL2RiL3NjaGVtYSc7XG5pbXBvcnQge1BhcnRuZXJFbnRyeX0gZnJvbSAnLi4vLi4vcGFydG5lci9kYi9zY2hlbWEnO1xuaW1wb3J0IHtDb250ZW50QWNjZXNzRW50cnksIENvbnRlbnRFbnRyeSwgQ29udGVudEZlZWRiYWNrRW50cnksIENvbnRlbnRNYXJrZXJFbnRyeX0gZnJvbSAnLi4vLi4vY29udGVudC9kYi9zY2hlbWEnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25FbnRyeX0gZnJvbSAnLi4vLi4vbm90aWZpY2F0aW9uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0tleVZhbHVlU3RvcmVFbnRyeX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlL2RiL3NjaGVtYSc7XG5pbXBvcnQge0Vycm9yU3RhY2tFbnRyeX0gZnJvbSAnLi4vLi4vZXJyb3IvZGIvc2NoZW1hJztcbmltcG9ydCB7U2VhcmNoSGlzdG9yeUVudHJ5fSBmcm9tICcuLi8uLi91dGlsL3NlYXJjaC1oaXN0b3J5L2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvdXJzZUFzc2Vzc21lbnRFbnRyeX0gZnJvbSAnLi4vLi4vc3VtbWFyaXplci9kYi9zY2hlbWEnO1xuaW1wb3J0IHtOZXR3b3JrUXVldWVFbnRyeX0gZnJvbSAnLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuaW1wb3J0IHtQbGF5ZXJDb25maWdFbnRyeX0gZnJvbSAnLi4vLi4vcGxheWVyL2RiL3NjaGVtYSc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVB1YmxpY0tleUVudHJ5IH0gZnJvbSAnLi4vLi4vY2VydGlmaWNhdGUvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIEluaXRpYWxNaWdyYXRpb24gZXh0ZW5kcyBNaWdyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDEsIDE2KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYXBwbHkoZGJTZXJ2aWNlOiBEYlNlcnZpY2UpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLnF1ZXJpZXMoKS5tYXAoKHF1ZXJ5KSA9PiBkYlNlcnZpY2UuZXhlY3V0ZShxdWVyeSkudG9Qcm9taXNlKCkpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHF1ZXJpZXMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBUZWxlbWV0cnlFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIFRlbGVtZXRyeVRhZ0VudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBFdmVudFByaW9yaXR5RW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIFVzZXJFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgUHJvZmlsZUVudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBJbXBvcnRlZE1ldGFkYXRhRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIFBhcnRuZXJFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgQ29udGVudEVudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBMZWFybmVyQXNzZXNzbWVudHNFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgTGVhcm5lclN1bW1hcnlFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgQ29udGVudEFjY2Vzc0VudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBDb250ZW50RmVlZGJhY2tFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgTm90aWZpY2F0aW9uRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIEdyb3VwRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIEdyb3VwUHJvZmlsZUVudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBLZXlWYWx1ZVN0b3JlRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIENvbnRlbnRNYXJrZXJFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgRXJyb3JTdGFja0VudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBTZWFyY2hIaXN0b3J5RW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIENvdXJzZUFzc2Vzc21lbnRFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLFxuICAgICAgICAgICAgTmV0d29ya1F1ZXVlRW50cnkuZ2V0Q3JlYXRlRW50cnkoKSxcbiAgICAgICAgICAgIFBsYXllckNvbmZpZ0VudHJ5LmdldENyZWF0ZUVudHJ5KCksXG4gICAgICAgICAgICBDZXJ0aWZpY2F0ZVB1YmxpY0tleUVudHJ5LmdldENyZWF0ZUVudHJ5KClcbiAgICAgICAgXTtcbiAgICB9XG5cbn1cbiJdfQ==