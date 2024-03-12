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
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
var QuestionSetFileReadHandler = /** @class */ (function () {
    function QuestionSetFileReadHandler(storageService, fileService) {
        this.storageService = storageService;
        this.fileService = fileService;
    }
    QuestionSetFileReadHandler.prototype.getLocallyAvailableQuestion = function (questionIds, parentId) {
        var _this = this;
        var path = this.storageService.getStorageDestinationDirectoryPath();
        var questionList = [];
        questionIds.forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {
            var textData;
            return __generator(this, function (_a) {
                textData = this.fileService.readAsText((window.device.platform.toLowerCase() === "ios")
                    ? path + "/content/" + parentId + "/" + id : path + "content/" + parentId + "/" + id, 'index.json');
                questionList.push(textData);
                return [2 /*return*/];
            });
        }); });
        return from(Promise.all(questionList)).pipe(map(function (questions) {
            return {
                questions: questions.map(function (q) {
                    if (q && (typeof q === 'string')) {
                        var data = JSON.parse(q);
                        return data.archive.items[0];
                    }
                    return q;
                }),
                count: questions.length
            };
        }));
    };
    return QuestionSetFileReadHandler;
}());
export { QuestionSetFileReadHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tc2V0LWZpbGUtcmVhZC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvcXVlc3Rpb24tc2V0LWZpbGUtcmVhZC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDO0lBQ0ksb0NBQ1ksY0FBOEIsRUFDOUIsV0FBd0I7UUFEeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ2xDLENBQUM7SUFFSSxnRUFBMkIsR0FBbEMsVUFBbUMsV0FBVyxFQUFFLFFBQVE7UUFBeEQsaUJBc0JDO1FBckJHLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUN0RSxJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDM0IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFNLEVBQUU7OztnQkFDbEIsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUFDO29CQUM3RSxDQUFDLENBQUksSUFBSSxpQkFBWSxRQUFRLFNBQUksRUFBSSxDQUFDLENBQUMsQ0FBSSxJQUFJLGdCQUFXLFFBQVEsU0FBSSxFQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzFHLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OzthQUMvQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2QyxHQUFHLENBQUMsVUFBQSxTQUFTO1lBQ1QsT0FBTztnQkFDSCxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQU07b0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLEVBQUU7d0JBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztnQkFDRixLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU07YUFDMUIsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUwsaUNBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zdG9yYWdlL2RlZi9zdG9yYWdlLXNlcnZpY2UnO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TZXRGaWxlUmVhZEhhbmRsZXJ7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZVxuICAgICl7fVxuXG4gICAgcHVibGljIGdldExvY2FsbHlBdmFpbGFibGVRdWVzdGlvbihxdWVzdGlvbklkcywgcGFyZW50SWQpe1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5zdG9yYWdlU2VydmljZS5nZXRTdG9yYWdlRGVzdGluYXRpb25EaXJlY3RvcnlQYXRoKCk7XG4gICAgICAgIGxldCBxdWVzdGlvbkxpc3Q6IGFueSA9IFtdO1xuICAgICAgICBxdWVzdGlvbklkcy5mb3JFYWNoKGFzeW5jIGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHREYXRhID0gdGhpcy5maWxlU2VydmljZS5yZWFkQXNUZXh0KCh3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9zXCIpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7cGF0aH0vY29udGVudC8ke3BhcmVudElkfS8ke2lkfWAgOiBgJHtwYXRofWNvbnRlbnQvJHtwYXJlbnRJZH0vJHtpZH1gLCAnaW5kZXguanNvbicpO1xuICAgICAgICAgICAgcXVlc3Rpb25MaXN0LnB1c2godGV4dERhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwocXVlc3Rpb25MaXN0KSkucGlwZShcbiAgICAgICAgICAgIG1hcChxdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uczogcXVlc3Rpb25zLm1hcCgocTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocSAmJiAodHlwZW9mIHEgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmFyY2hpdmUuaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiBxdWVzdGlvbnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0iXX0=