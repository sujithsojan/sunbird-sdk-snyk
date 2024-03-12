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
import { HttpRequestType, Request } from '../../api';
import { CourseServiceImpl } from '..';
import { from, of } from 'rxjs';
import { catchError, map, mapTo, mergeMap, tap } from 'rxjs/operators';
var GetEnrolledCourseHandler = /** @class */ (function () {
    function GetEnrolledCourseHandler(keyValueStore, apiService, courseServiceConfig, sharedPreference, apiHandler) {
        this.keyValueStore = keyValueStore;
        this.apiService = apiService;
        this.courseServiceConfig = courseServiceConfig;
        this.sharedPreference = sharedPreference;
        this.apiHandler = apiHandler;
        this.GET_ENROLLED_COURSES_ENDPOINT = '/user/enrollment/list/';
        this.STORED_ENROLLED_COURSES_PREFIX = 'enrolledCourses';
    }
    GetEnrolledCourseHandler.prototype.handle = function (request) {
        var _this = this;
        return this.keyValueStore.getValue(this.STORED_ENROLLED_COURSES_PREFIX + request.userId)
            .pipe(mergeMap(function (value) {
            if (!value) {
                return _this.fetchFromServer(request).pipe(mergeMap(function (courses) {
                    return _this.keyValueStore.setValue(_this.STORED_ENROLLED_COURSES_PREFIX + request.userId, JSON.stringify(courses)).pipe(mapTo(courses.result.courses), tap(function (courseList) {
                        return from(_this.updateLastPlayedContent(courseList));
                    }));
                }));
            }
            else if (request.returnFreshCourses) {
                return _this.fetchFromServer(request)
                    .pipe(mergeMap(function (courses) {
                    return _this.keyValueStore.setValue(_this.STORED_ENROLLED_COURSES_PREFIX + request.userId, JSON.stringify(courses)).pipe(mapTo(courses.result.courses), tap(function (courseList) {
                        return from(_this.updateLastPlayedContent(courseList));
                    }));
                }), catchError(function () {
                    var response = JSON.parse(value);
                    var result = response['result'];
                    var courses;
                    if (result && result.hasOwnProperty('courses')) {
                        courses = result['courses'];
                    }
                    else {
                        courses = response['courses'];
                    }
                    return of(courses);
                }));
            }
            else {
                // TODO
                var response = JSON.parse(value);
                var result = response['result'];
                var courses = void 0;
                if (result && result.hasOwnProperty('courses')) {
                    courses = result['courses'];
                }
                else {
                    courses = response['courses'];
                }
                return of(courses);
            }
        }));
    };
    GetEnrolledCourseHandler.prototype.updateLastPlayedContent = function (courses) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, courses_1, course, key, lastReadContentId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, courses_1 = courses;
                        _a.label = 1;
                    case 1:
                        if (!(_i < courses_1.length)) return [3 /*break*/, 4];
                        course = courses_1[_i];
                        key = CourseServiceImpl.LAST_READ_CONTENTID_PREFIX.concat('_')
                            .concat(course['userId']).concat('_')
                            .concat(course['contentId']).concat('_')
                            .concat(course['batchId']);
                        lastReadContentId = course['lastReadContentId'];
                        if (!course['lastReadContentId']) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sharedPreference.putString(key, lastReadContentId).toPromise()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, Promise.resolve(true)];
                }
            });
        });
    };
    GetEnrolledCourseHandler.prototype.fetchFromServer = function (request) {
        if (this.apiHandler) {
            return this.apiHandler.handle(request);
        }
        var apiRequest = new Request.Builder()
            .withType(HttpRequestType.GET)
            .withPath(this.courseServiceConfig.apiPath + this.GET_ENROLLED_COURSES_ENDPOINT + request.userId
            + '?orgdetails=orgName,email'
            + '&fields=contentType,topic,name,channel,pkgVersion,primaryCategory,trackable'
            + '&batchDetails=name,endDate,startDate,status,enrollmentType,createdBy,certificates')
            .withBearerToken(true)
            .withUserToken(true)
            .build();
        return this.apiService.fetch(apiRequest)
            .pipe(map(function (response) {
            return response.body;
        }));
    };
    return GetEnrolledCourseHandler;
}());
export { GetEnrolledCourseHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWVucm9sbGVkLWNvdXJzZS1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvdXJzZS9oYW5kbGVycy9nZXQtZW5yb2xsZWQtY291cnNlLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xGLE9BQU8sRUFBOEIsaUJBQWlCLEVBQTZCLE1BQU0sSUFBSSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxJQUFJLEVBQWMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBSTFDLE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckU7SUFLSSxrQ0FDWSxhQUE0QixFQUM1QixVQUFzQixFQUN0QixtQkFBd0MsRUFDeEMsZ0JBQW1DLEVBQ25DLFVBQTZFO1FBSjdFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQW1FO1FBUnhFLGtDQUE2QixHQUFHLHdCQUF3QixDQUFDO1FBQ3pELG1DQUE4QixHQUFHLGlCQUFpQixDQUFDO0lBU3BFLENBQUM7SUFFRCx5Q0FBTSxHQUFOLFVBQU8sT0FBbUM7UUFBMUMsaUJBMERDO1FBekRHLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDbkYsSUFBSSxDQUNELFFBQVEsQ0FBQyxVQUFDLEtBQXlCO1lBQy9CLElBQUksQ0FBQyxLQUFL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LENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNWLENBQUM7SUFDTCwrQkFBQztBQUFELENBQUMsQUE5R0QsSUE4R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwaVJlcXVlc3RIYW5kbGVyLCBBcGlTZXJ2aWNlLCBIdHRwUmVxdWVzdFR5cGUsIFJlcXVlc3R9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge0NvdXJzZSwgQ291cnNlU2VydmljZUNvbmZpZywgQ291cnNlU2VydmljZUltcGwsIEZldGNoRW5yb2xsZWRDb3Vyc2VSZXF1ZXN0fSBmcm9tICcuLic7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7S2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7R2V0RW5yb2xsZWRDb3Vyc2VSZXNwb25zZX0gZnJvbSAnLi4vZGVmL2dldC1lbnJvbGxlZC1jb3Vyc2UtcmVzcG9uc2UnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBHZXRFbnJvbGxlZENvdXJzZUhhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxGZXRjaEVucm9sbGVkQ291cnNlUmVxdWVzdCwgQ291cnNlW10+IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgR0VUX0VOUk9MTEVEX0NPVVJTRVNfRU5EUE9JTlQgPSAnL3VzZXIvZW5yb2xsbWVudC9saXN0Lyc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBTVE9SRURfRU5ST0xMRURfQ09VUlNFU19QUkVGSVggPSAnZW5yb2xsZWRDb3Vyc2VzJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlQ29uZmlnOiBDb3Vyc2VTZXJ2aWNlQ29uZmlnLFxuICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2U6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBwcml2YXRlIGFwaUhhbmRsZXI/OiBBcGlSZXF1ZXN0SGFuZGxlcjx7IHVzZXJJZDogc3RyaW5nIH0sIEdldEVucm9sbGVkQ291cnNlUmVzcG9uc2U+XG4gICAgKSB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcXVlc3Q6IEZldGNoRW5yb2xsZWRDb3Vyc2VSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDb3Vyc2VbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKHRoaXMuU1RPUkVEX0VOUk9MTEVEX0NPVVJTRVNfUFJFRklYICsgcmVxdWVzdC51c2VySWQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21TZXJ2ZXIocmVxdWVzdCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY291cnNlczogR2V0RW5yb2xsZWRDb3Vyc2VSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlWYWx1ZVN0b3JlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TVE9SRURfRU5ST0xMRURfQ09VUlNFU19QUkVGSVggKyByZXF1ZXN0LnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGNvdXJzZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKGNvdXJzZXMucmVzdWx0LmNvdXJzZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKChjb3Vyc2VMaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20odGhpcy51cGRhdGVMYXN0UGxheWVkQ29udGVudChjb3Vyc2VMaXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QucmV0dXJuRnJlc2hDb3Vyc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21TZXJ2ZXIocmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGNvdXJzZXM6IEdldEVucm9sbGVkQ291cnNlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtleVZhbHVlU3RvcmUuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TVE9SRURfRU5ST0xMRURfQ09VUlNFU19QUkVGSVggKyByZXF1ZXN0LnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShjb3Vyc2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKGNvdXJzZXMucmVzdWx0LmNvdXJzZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcCgoY291cnNlTGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLnVwZGF0ZUxhc3RQbGF5ZWRDb250ZW50KGNvdXJzZUxpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlWydyZXN1bHQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3Vyc2VzOiBDb3Vyc2VbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmhhc093blByb3BlcnR5KCdjb3Vyc2VzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzID0gcmVzdWx0Wydjb3Vyc2VzJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZXMgPSByZXNwb25zZVsnY291cnNlcyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGNvdXJzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2VbJ3Jlc3VsdCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdXJzZXM6IENvdXJzZVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuaGFzT3duUHJvcGVydHkoJ2NvdXJzZXMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZXMgPSByZXN1bHRbJ2NvdXJzZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlcyA9IHJlc3BvbnNlWydjb3Vyc2VzJ107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoY291cnNlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHVwZGF0ZUxhc3RQbGF5ZWRDb250ZW50KGNvdXJzZXM6IENvdXJzZVtdKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGZvciAoY29uc3QgY291cnNlIG9mIGNvdXJzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IENvdXJzZVNlcnZpY2VJbXBsLkxBU1RfUkVBRF9DT05URU5USURfUFJFRklYLmNvbmNhdCgnXycpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChjb3Vyc2VbJ3VzZXJJZCddISkuY29uY2F0KCdfJylcbiAgICAgICAgICAgICAgICAuY29uY2F0KGNvdXJzZVsnY29udGVudElkJ10hKS5jb25jYXQoJ18nKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoY291cnNlWydiYXRjaElkJ10hKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RSZWFkQ29udGVudElkID0gY291cnNlWydsYXN0UmVhZENvbnRlbnRJZCddO1xuICAgICAgICAgICAgaWYgKGNvdXJzZVsnbGFzdFJlYWRDb250ZW50SWQnXSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZS5wdXRTdHJpbmcoa2V5LCBsYXN0UmVhZENvbnRlbnRJZCEpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaEZyb21TZXJ2ZXIocmVxdWVzdDogRmV0Y2hFbnJvbGxlZENvdXJzZVJlcXVlc3QpOiBPYnNlcnZhYmxlPEdldEVucm9sbGVkQ291cnNlUmVzcG9uc2U+IHtcbiAgICAgICAgaWYgKHRoaXMuYXBpSGFuZGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpSGFuZGxlci5oYW5kbGUocmVxdWVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcGlSZXF1ZXN0OiBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QuQnVpbGRlcigpXG4gICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLkdFVClcbiAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLmNvdXJzZVNlcnZpY2VDb25maWcuYXBpUGF0aCArIHRoaXMuR0VUX0VOUk9MTEVEX0NPVVJTRVNfRU5EUE9JTlQgKyByZXF1ZXN0LnVzZXJJZFxuICAgICAgICAgICAgICAgICsgJz9vcmdkZXRhaWxzPW9yZ05hbWUsZW1haWwnXG4gICAgICAgICAgICAgICAgKyAnJmZpZWxkcz1jb250ZW50VHlwZSx0b3BpYyxuYW1lLGNoYW5uZWwscGtnVmVyc2lvbixwcmltYXJ5Q2F0ZWdvcnksdHJhY2thYmxlJ1xuICAgICAgICAgICAgICAgICsgJyZiYXRjaERldGFpbHM9bmFtZSxlbmREYXRlLHN0YXJ0RGF0ZSxzdGF0dXMsZW5yb2xsbWVudFR5cGUsY3JlYXRlZEJ5LGNlcnRpZmljYXRlcycpXG4gICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAud2l0aFVzZXJUb2tlbih0cnVlKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDxHZXRFbnJvbGxlZENvdXJzZVJlc3BvbnNlPihhcGlSZXF1ZXN0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=