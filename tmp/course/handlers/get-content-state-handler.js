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
import { defer, iif } from 'rxjs';
import { map } from 'rxjs/operators';
import { CsInjectionTokens, InjectionTokens } from '../../injection-tokens';
var GetContentStateHandler = /** @class */ (function () {
    function GetContentStateHandler(apiService, courseServiceConfig, container) {
        this.apiService = apiService;
        this.courseServiceConfig = courseServiceConfig;
        this.container = container;
    }
    Object.defineProperty(GetContentStateHandler.prototype, "csCourseService", {
        get: function () {
            return this.container.get(CsInjectionTokens.COURSE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetContentStateHandler.prototype, "contentService", {
        get: function () {
            return this.container.get(InjectionTokens.CONTENT_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    GetContentStateHandler.prototype.handle = function (contentStateRequest) {
        var _this = this;
        delete contentStateRequest['returnRefreshedContentStates'];
        return iif(function () { return !contentStateRequest.contentIds || !contentStateRequest.contentIds.length; }, defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = contentStateRequest;
                        return [4 /*yield*/, this.contentService.getContentDetails({
                                contentId: contentStateRequest.courseId
                            }).toPromise().then(function (content) { return content.contentData['leafNodes'] || []; })];
                    case 1:
                        _a.contentIds = _b.sent();
                        return [2 /*return*/, this.fetchFromApi(contentStateRequest).toPromise()];
                }
            });
        }); }), defer(function () { return _this.fetchFromApi(contentStateRequest); }));
    };
    GetContentStateHandler.prototype.fetchFromApi = function (contentStateRequest) {
        if (contentStateRequest.contentIds && !contentStateRequest.contentIds.length) {
            delete contentStateRequest.contentIds;
        }
        return this.csCourseService.getContentState(contentStateRequest).pipe(map(function (contentStates) { return ({ contentList: contentStates }); }));
    };
    return GetContentStateHandler;
}());
export { GetContentStateHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRlbnQtc3RhdGUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaGFuZGxlcnMvZ2V0LWNvbnRlbnQtc3RhdGUtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzFFO0lBQ0ksZ0NBQ1ksVUFBc0IsRUFDdEIsbUJBQXdDLEVBQ3hDLFNBQW9CO1FBRnBCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRWhDLENBQUM7SUFFRCxzQkFBWSxtREFBZTthQUEzQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSxrREFBYzthQUExQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELENBQUM7OztPQUFBO0lBRU0sdUNBQU0sR0FBYixVQUFjLG1CQUEyQztRQUF6RCxpQkFjQztRQWJHLE9BQU8sbUJBQW1CLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUUzRCxPQUFPLEdBQUcsQ0FDTixjQUFNLE9BQUEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUF6RSxDQUF5RSxFQUMvRSxLQUFLLENBQUM7Ozs7O3dCQUNGLEtBQUEsbUJBQW1CLENBQUE7d0JBQWMscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDekUsU0FBUyxFQUFFLG1CQUFtQixDQUFDLFFBQVE7NkJBQzFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBdEMsQ0FBc0MsQ0FBQyxFQUFBOzt3QkFGeEUsR0FBb0IsVUFBVSxHQUFHLFNBRXVDLENBQUM7d0JBRXpFLHNCQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQzs7O2FBQzdELENBQUMsRUFDRixLQUFLLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQztJQUVPLDZDQUFZLEdBQXBCLFVBQXFCLG1CQUEyQztRQUM1RCxJQUFJLG1CQUFtQixDQUFDLFVBQVUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDMUUsT0FBTyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUNqRSxHQUFHLENBQUMsVUFBQyxhQUE2QixJQUFLLE9BQUEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQzNFLENBQUM7SUFDTixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlTZXJ2aWNlfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtDb250ZW50U3RhdGUsIENvdXJzZVNlcnZpY2VDb25maWcsIEdldENvbnRlbnRTdGF0ZVJlcXVlc3R9IGZyb20gJy4uJztcbmltcG9ydCB7ZGVmZXIsIGlpZiwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb250ZW50U2VydmljZX0gZnJvbSAnLi4vLi4vY29udGVudCc7XG5pbXBvcnQge0NvbnRhaW5lcn0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7Q3NJbmplY3Rpb25Ub2tlbnMsIEluamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge0NzQ291cnNlU2VydmljZX0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY291cnNlJztcblxuZXhwb3J0IGNsYXNzIEdldENvbnRlbnRTdGF0ZUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY291cnNlU2VydmljZUNvbmZpZzogQ291cnNlU2VydmljZUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IENvbnRhaW5lclxuICAgICkge1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGNzQ291cnNlU2VydmljZSgpOiBDc0NvdXJzZVNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0KENzSW5qZWN0aW9uVG9rZW5zLkNPVVJTRV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBjb250ZW50U2VydmljZSgpOiBDb250ZW50U2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXQoSW5qZWN0aW9uVG9rZW5zLkNPTlRFTlRfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZShjb250ZW50U3RhdGVSZXF1ZXN0OiBHZXRDb250ZW50U3RhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTx7IGNvbnRlbnRMaXN0OiBDb250ZW50U3RhdGVbXSB9PiB7XG4gICAgICAgIGRlbGV0ZSBjb250ZW50U3RhdGVSZXF1ZXN0WydyZXR1cm5SZWZyZXNoZWRDb250ZW50U3RhdGVzJ107XG5cbiAgICAgICAgcmV0dXJuIGlpZihcbiAgICAgICAgICAgICgpID0+ICFjb250ZW50U3RhdGVSZXF1ZXN0LmNvbnRlbnRJZHMgfHwgIWNvbnRlbnRTdGF0ZVJlcXVlc3QuY29udGVudElkcy5sZW5ndGgsXG4gICAgICAgICAgICBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGVudFN0YXRlUmVxdWVzdC5jb250ZW50SWRzID0gYXdhaXQgdGhpcy5jb250ZW50U2VydmljZS5nZXRDb250ZW50RGV0YWlscyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZDogY29udGVudFN0YXRlUmVxdWVzdC5jb3Vyc2VJZFxuICAgICAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpLnRoZW4oKGNvbnRlbnQpID0+IGNvbnRlbnQuY29udGVudERhdGFbJ2xlYWZOb2RlcyddIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUFwaShjb250ZW50U3RhdGVSZXF1ZXN0KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZGVmZXIoKCkgPT4gdGhpcy5mZXRjaEZyb21BcGkoY29udGVudFN0YXRlUmVxdWVzdCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaEZyb21BcGkoY29udGVudFN0YXRlUmVxdWVzdDogR2V0Q29udGVudFN0YXRlUmVxdWVzdCkge1xuICAgICAgICBpZiAoY29udGVudFN0YXRlUmVxdWVzdC5jb250ZW50SWRzICYmICFjb250ZW50U3RhdGVSZXF1ZXN0LmNvbnRlbnRJZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgY29udGVudFN0YXRlUmVxdWVzdC5jb250ZW50SWRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3NDb3Vyc2VTZXJ2aWNlLmdldENvbnRlbnRTdGF0ZShjb250ZW50U3RhdGVSZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgbWFwKChjb250ZW50U3RhdGVzOiBDb250ZW50U3RhdGVbXSkgPT4gKHsgY29udGVudExpc3Q6IGNvbnRlbnRTdGF0ZXMgfSkpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19