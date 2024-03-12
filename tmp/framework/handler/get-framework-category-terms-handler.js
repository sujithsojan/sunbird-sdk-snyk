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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import Set from 'typescript-collections/dist/lib/Set';
import { makeString } from 'typescript-collections/dist/lib/util';
import { FrameworkMapper } from '../util/framework-mapper';
import { FrameworkKeys } from '../../preference-keys';
import { map, mergeMap, tap } from 'rxjs/operators';
var GetFrameworkCategoryTermsHandler = /** @class */ (function () {
    function GetFrameworkCategoryTermsHandler(frameworkUtilService, frameworkService, sharedPreferences) {
        this.frameworkUtilService = frameworkUtilService;
        this.frameworkService = frameworkService;
        this.sharedPreferences = sharedPreferences;
    }
    GetFrameworkCategoryTermsHandler.prototype.handle = function (request) {
        var _this = this;
        return (function () {
            if (request.frameworkId) {
                return _this.getTranslatedFrameworkDetails(request.frameworkId, request.requiredCategories, request.language);
            }
            return _this.getActiveChannelTranslatedDefaultFrameworkDetails(request);
        })().pipe(tap(function (framework) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.putString(FrameworkKeys.KEY_ACTIVE_CHANNEL_ACTIVE_FRAMEWORK_ID, framework.identifier).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }), map(function (framework) {
            var terms = [];
            if (!request.prevCategoryCode && request.currentCategoryCode) {
                terms = _this.getCategoryTerms(framework, request).toArray();
            }
            else {
                terms = _this.getCategoryAssociationTerms(framework, request).toArray();
            }
            if (request.currentCategoryCode === 'gradeLevel') {
                var maxIndex_1 = terms.reduce(function (acc, val) { return (val.index && (val.index > acc)) ? val.index : acc; }, 0);
                terms.sort(function (i, j) { return (i.index || maxIndex_1 + 1) - (j.index || maxIndex_1 + 1); });
            }
            else {
                terms.sort(function (i, j) { return i.name.localeCompare(j.name); });
            }
            var othersOptionIndex = terms.indexOf(terms.find(function (val) { return val.name === 'Others'; }));
            if (othersOptionIndex >= 0 && othersOptionIndex !== terms.length) {
                var temp = terms[terms.length - 1];
                terms[terms.length - 1] = terms[othersOptionIndex];
                terms[othersOptionIndex] = temp;
            }
            return terms;
        }));
    };
    GetFrameworkCategoryTermsHandler.prototype.getActiveChannelTranslatedDefaultFrameworkDetails = function (request) {
        var _this = this;
        return this.frameworkUtilService.getActiveChannel({ from: request.from }).pipe(mergeMap(function (channel) {
            return _this.getTranslatedFrameworkDetails(channel.defaultFramework, request.requiredCategories, request.language, request.from);
        }));
    };
    GetFrameworkCategoryTermsHandler.prototype.getTranslatedFrameworkDetails = function (frameworkId, requiredCategories, language, from) {
        return this.frameworkService.getFrameworkDetails({
            from: from,
            frameworkId: frameworkId,
            requiredCategories: requiredCategories
        }).pipe(map(function (f) { return FrameworkMapper.prepareFrameworkTranslations(f, language); }));
    };
    GetFrameworkCategoryTermsHandler.prototype.getAllCategoriesTermsSet = function (framework) {
        if (!framework.categories) {
            return new Set();
        }
        return framework.categories
            .reduce(function (acc, category) { return __spreadArrays(acc, [category.terms || []]); }, [])
            .reduce(function (acc, val) { return acc.concat(val); }, [])
            .reduce(function (acc, val) {
            acc.add(val);
            return acc;
        }, new Set(function (term) { return makeString(term); }));
    };
    GetFrameworkCategoryTermsHandler.prototype.getCategoryTerms = function (framework, request) {
        return framework.categories.find(function (category) { return category.code === request.currentCategoryCode; }).terms
            .reduce(function (acc, val) {
            acc.add(val);
            return acc;
        }, new Set(function (term) { return makeString(term); }));
    };
    GetFrameworkCategoryTermsHandler.prototype.getCategoryAssociationTerms = function (framework, request) {
        var _this = this;
        if (!framework.categories) {
            return new Set();
        }
        var categoryTerms = framework.categories.find(function (category) { return category.code === request.prevCategoryCode; }).terms;
        if (!categoryTerms) {
            return new Set();
        }
        var categoryAssociationsArray = categoryTerms
            .filter(function (term) { return request.selectedTermsCodes.find(function (selectedTerm) { return selectedTerm === term.code; }); })
            .map(function (term) { return term.associations || []; });
        if (categoryAssociationsArray.some(function (categoryAssociations) { return categoryAssociations.length === 0; })) {
            return framework.categories.find(function (category) { return category.code === request.currentCategoryCode; }).terms
                .reduce(function (acc, val) {
                acc.add(val);
                return acc;
            }, new Set(function (term) { return makeString(term); }));
        }
        else {
            return categoryAssociationsArray
                .reduce(function (acc, val) { return acc.concat(val); }, [])
                .reduce(function (acc, val) {
                acc.add(val);
                return acc;
            }, new Set(function (term) { return makeString(term); }))
                .toArray()
                .map(function (association) {
                return _this.getAllCategoriesTermsSet(framework).toArray().find(function (term) {
                    return term.identifier === association.identifier;
                });
            })
                .reduce(function (acc, val) {
                acc.add(val);
                return acc;
            }, new Set(function (term) { return makeString(term); }));
        }
    };
    return GetFrameworkCategoryTermsHandler;
}());
export { GetFrameworkCategoryTermsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWZyYW1ld29yay1jYXRlZ29yeS10ZXJtcy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZyYW1ld29yay9oYW5kbGVyL2dldC1mcmFtZXdvcmstY2F0ZWdvcnktdGVybXMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsT0FBTyxHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHbEQ7SUFFSSwwQ0FBb0Isb0JBQTBDLEVBQzFDLGdCQUFrQyxFQUNsQyxpQkFBb0M7UUFGcEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDeEQsQ0FBQztJQUVELGlEQUFNLEdBQU4sVUFBTyxPQUF5QztRQUFoRCxpQkFxQ0M7UUFwQ0csT0FBUSxDQUFDO1lBQ0wsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEg7WUFFRCxPQUFPLEtBQUksQ0FBQyxpREFBaUQsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQWlDLEVBQUUsQ0FBQyxJQUFJLENBQ3JDLEdBQUcsQ0FBQyxV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QUFVLEtBQUssV0FBVyxDQUFDLFVBQVU7Z0JBQTFDLENBQTBDLENBQzdDO1lBRkQsQ0FFQyxDQUNKO2lCQUNBLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLEVBQUUsSUFBSSxHQUFHLENBQWUsVUFBQyxJQUFJLElBQUssT0FBQSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FDdkQsQ0FBQztTQUNUO0lBQ0wsQ0FBQztJQUNMLHVDQUFDO0FBQUQsQ0FBQyxBQTNJRCxJQTJJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge1xuICAgIENhdGVnb3J5QXNzb2NpYXRpb24sXG4gICAgQ2F0ZWdvcnlUZXJtLFxuICAgIENoYW5uZWwsXG4gICAgRnJhbWV3b3JrLFxuICAgIEZyYW1ld29ya0NhdGVnb3J5LFxuICAgIEZyYW1ld29ya0NhdGVnb3J5Q29kZSxcbiAgICBGcmFtZXdvcmtTZXJ2aWNlLFxuICAgIEZyYW1ld29ya1V0aWxTZXJ2aWNlLFxuICAgIEdldEZyYW1ld29ya0NhdGVnb3J5VGVybXNSZXF1ZXN0XG59IGZyb20gJy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQgU2V0IGZyb20gJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvU2V0JztcbmltcG9ydCB7bWFrZVN0cmluZ30gZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsJztcbmltcG9ydCB7RnJhbWV3b3JrTWFwcGVyfSBmcm9tICcuLi91dGlsL2ZyYW1ld29yay1tYXBwZXInO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtGcmFtZXdvcmtLZXlzfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHttYXAsIG1lcmdlTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q2FjaGVkSXRlbVJlcXVlc3RTb3VyY2VGcm9tfSBmcm9tICcuLi8uLi9rZXktdmFsdWUtc3RvcmUnO1xuXG5leHBvcnQgY2xhc3MgR2V0RnJhbWV3b3JrQ2F0ZWdvcnlUZXJtc0hhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxHZXRGcmFtZXdvcmtDYXRlZ29yeVRlcm1zUmVxdWVzdCwgQ2F0ZWdvcnlUZXJtW10+IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJhbWV3b3JrVXRpbFNlcnZpY2U6IEZyYW1ld29ya1V0aWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcykge1xuICAgIH1cblxuICAgIGhhbmRsZShyZXF1ZXN0OiBHZXRGcmFtZXdvcmtDYXRlZ29yeVRlcm1zUmVxdWVzdCk6IE9ic2VydmFibGU8Q2F0ZWdvcnlUZXJtW10+IHtcbiAgICAgICAgcmV0dXJuICgoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QuZnJhbWV3b3JrSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUcmFuc2xhdGVkRnJhbWV3b3JrRGV0YWlscyhyZXF1ZXN0LmZyYW1ld29ya0lkLCByZXF1ZXN0LnJlcXVpcmVkQ2F0ZWdvcmllcywgcmVxdWVzdC5sYW5ndWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZUNoYW5uZWxUcmFuc2xhdGVkRGVmYXVsdEZyYW1ld29ya0RldGFpbHMocmVxdWVzdCk7XG4gICAgICAgIH0pIGFzICgpID0+IE9ic2VydmFibGU8RnJhbWV3b3JrPikoKS5waXBlKFxuICAgICAgICAgICAgdGFwKGFzeW5jIChmcmFtZXdvcms6IEZyYW1ld29yaykgPT5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgRnJhbWV3b3JrS2V5cy5LRVlfQUNUSVZFX0NIQU5ORUxfQUNUSVZFX0ZSQU1FV09SS19JRCwgZnJhbWV3b3JrLmlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKChmcmFtZXdvcms6IEZyYW1ld29yaykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0ZXJtczogQ2F0ZWdvcnlUZXJtW10gPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICghcmVxdWVzdC5wcmV2Q2F0ZWdvcnlDb2RlICYmIHJlcXVlc3QuY3VycmVudENhdGVnb3J5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXJtcyA9IHRoaXMuZ2V0Q2F0ZWdvcnlUZXJtcyhmcmFtZXdvcmssIHJlcXVlc3QpLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZXJtcyA9IHRoaXMuZ2V0Q2F0ZWdvcnlBc3NvY2lhdGlvblRlcm1zKGZyYW1ld29yaywgcmVxdWVzdCkudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5jdXJyZW50Q2F0ZWdvcnlDb2RlID09PSAnZ3JhZGVMZXZlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4SW5kZXg6IG51bWJlciA9IHRlcm1zLnJlZHVjZSgoYWNjLCB2YWwpID0+ICh2YWwuaW5kZXggJiYgKHZhbC5pbmRleCA+IGFjYykpID8gdmFsLmluZGV4IDogYWNjLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICB0ZXJtcy5zb3J0KChpLCBqKSA9PiAoaS5pbmRleCB8fCBtYXhJbmRleCArIDEpIC0gKGouaW5kZXggfHwgbWF4SW5kZXggKyAxKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVybXMuc29ydCgoaSwgaikgPT4gaS5uYW1lLmxvY2FsZUNvbXBhcmUoai5uYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyc09wdGlvbkluZGV4ID0gdGVybXMuaW5kZXhPZih0ZXJtcy5maW5kKHZhbCA9PiB2YWwubmFtZSA9PT0gJ090aGVycycpISk7XG4gICAgICAgICAgICAgICAgaWYgKCBvdGhlcnNPcHRpb25JbmRleCA+PSAwICYmIG90aGVyc09wdGlvbkluZGV4ICE9PSB0ZXJtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHRlcm1zW3Rlcm1zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXJtc1t0ZXJtcy5sZW5ndGggLSAxXSA9IHRlcm1zW290aGVyc09wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgdGVybXNbb3RoZXJzT3B0aW9uSW5kZXhdID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1zO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEFjdGl2ZUNoYW5uZWxUcmFuc2xhdGVkRGVmYXVsdEZyYW1ld29ya0RldGFpbHMoXG4gICAgICAgIHJlcXVlc3Q6IEdldEZyYW1ld29ya0NhdGVnb3J5VGVybXNSZXF1ZXN0XG4gICAgKTogT2JzZXJ2YWJsZTxGcmFtZXdvcms+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWV3b3JrVXRpbFNlcnZpY2UuZ2V0QWN0aXZlQ2hhbm5lbCh7IGZyb206IHJlcXVlc3QuZnJvbSB9KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNoYW5uZWw6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUcmFuc2xhdGVkRnJhbWV3b3JrRGV0YWlscyhcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5kZWZhdWx0RnJhbWV3b3JrLCByZXF1ZXN0LnJlcXVpcmVkQ2F0ZWdvcmllcywgcmVxdWVzdC5sYW5ndWFnZSwgcmVxdWVzdC5mcm9tXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmFuc2xhdGVkRnJhbWV3b3JrRGV0YWlscyhcbiAgICAgICAgZnJhbWV3b3JrSWQ6IHN0cmluZyxcbiAgICAgICAgcmVxdWlyZWRDYXRlZ29yaWVzOiBGcmFtZXdvcmtDYXRlZ29yeUNvZGVbXSxcbiAgICAgICAgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgICAgICAgZnJvbT86IENhY2hlZEl0ZW1SZXF1ZXN0U291cmNlRnJvbSxcbiAgICApOiBPYnNlcnZhYmxlPEZyYW1ld29yaz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZXdvcmtTZXJ2aWNlLmdldEZyYW1ld29ya0RldGFpbHMoe1xuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGZyYW1ld29ya0lkLFxuICAgICAgICAgICAgcmVxdWlyZWRDYXRlZ29yaWVzXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGYpID0+IEZyYW1ld29ya01hcHBlci5wcmVwYXJlRnJhbWV3b3JrVHJhbnNsYXRpb25zKGYsIGxhbmd1YWdlKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEFsbENhdGVnb3JpZXNUZXJtc1NldChmcmFtZXdvcms6IEZyYW1ld29yayk6IFNldDxDYXRlZ29yeVRlcm0+IHtcbiAgICAgICAgaWYgKCFmcmFtZXdvcmsuY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQ8Q2F0ZWdvcnlUZXJtPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYW1ld29yay5jYXRlZ29yaWVzXG4gICAgICAgICAgICAucmVkdWNlKChhY2M6IENhdGVnb3J5VGVybVtdW10sIGNhdGVnb3J5OiBGcmFtZXdvcmtDYXRlZ29yeSkgPT4gWy4uLmFjYywgY2F0ZWdvcnkudGVybXMgfHwgW11dLCBbXSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCksIFtdKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjLmFkZCh2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIG5ldyBTZXQ8Q2F0ZWdvcnlUZXJtPigodGVybSkgPT4gbWFrZVN0cmluZyh0ZXJtKSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDYXRlZ29yeVRlcm1zKGZyYW1ld29yazogRnJhbWV3b3JrLCByZXF1ZXN0OiBHZXRGcmFtZXdvcmtDYXRlZ29yeVRlcm1zUmVxdWVzdCk6IFNldDxDYXRlZ29yeVRlcm0+IHtcbiAgICAgICAgcmV0dXJuIGZyYW1ld29yay5jYXRlZ29yaWVzIS5maW5kKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuY29kZSA9PT0gcmVxdWVzdC5jdXJyZW50Q2F0ZWdvcnlDb2RlKSEudGVybXMhXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY2MuYWRkKHZhbCEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIG5ldyBTZXQ8Q2F0ZWdvcnlUZXJtPigodGVybSkgPT4gbWFrZVN0cmluZyh0ZXJtKSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDYXRlZ29yeUFzc29jaWF0aW9uVGVybXMoZnJhbWV3b3JrOiBGcmFtZXdvcmssIHJlcXVlc3Q6IEdldEZyYW1ld29ya0NhdGVnb3J5VGVybXNSZXF1ZXN0KTogU2V0PENhdGVnb3J5VGVybT4ge1xuICAgICAgICBpZiAoIWZyYW1ld29yay5jYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldDxDYXRlZ29yeVRlcm0+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYXRlZ29yeVRlcm1zID0gZnJhbWV3b3JrLmNhdGVnb3JpZXMuZmluZCgoY2F0ZWdvcnkpID0+IGNhdGVnb3J5LmNvZGUgPT09IHJlcXVlc3QucHJldkNhdGVnb3J5Q29kZSkhLnRlcm1zO1xuICAgICAgICBpZiAoIWNhdGVnb3J5VGVybXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0PENhdGVnb3J5VGVybT4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5QXNzb2NpYXRpb25zQXJyYXk6IENhdGVnb3J5QXNzb2NpYXRpb25bXVtdID0gY2F0ZWdvcnlUZXJtc1xuICAgICAgICAgICAgLmZpbHRlcigodGVybSkgPT4gcmVxdWVzdC5zZWxlY3RlZFRlcm1zQ29kZXMhLmZpbmQoKHNlbGVjdGVkVGVybSkgPT4gc2VsZWN0ZWRUZXJtID09PSB0ZXJtLmNvZGUpKVxuICAgICAgICAgICAgLm1hcCgodGVybSkgPT4gdGVybS5hc3NvY2lhdGlvbnMgfHwgW10pO1xuXG4gICAgICAgIGlmIChjYXRlZ29yeUFzc29jaWF0aW9uc0FycmF5LnNvbWUoKGNhdGVnb3J5QXNzb2NpYXRpb25zKSA9PiBjYXRlZ29yeUFzc29jaWF0aW9ucy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWV3b3JrLmNhdGVnb3JpZXMhLmZpbmQoKGNhdGVnb3J5KSA9PiBjYXRlZ29yeS5jb2RlID09PSByZXF1ZXN0LmN1cnJlbnRDYXRlZ29yeUNvZGUpIS50ZXJtcyFcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLmFkZCh2YWwhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgICAgIH0sIG5ldyBTZXQ8Q2F0ZWdvcnlUZXJtPigodGVybSkgPT4gbWFrZVN0cmluZyh0ZXJtKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNhdGVnb3J5QXNzb2NpYXRpb25zQXJyYXlcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpLCBbXSlcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLmFkZCh2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICAgICAgfSwgbmV3IFNldDxDYXRlZ29yeUFzc29jaWF0aW9uPigodGVybSkgPT4gbWFrZVN0cmluZyh0ZXJtKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgICAgIC5tYXAoKGFzc29jaWF0aW9uOiBDYXRlZ29yeUFzc29jaWF0aW9uKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEFsbENhdGVnb3JpZXNUZXJtc1NldChmcmFtZXdvcmspLnRvQXJyYXkoKS5maW5kKCh0ZXJtKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGVybS5pZGVudGlmaWVyID09PSBhc3NvY2lhdGlvbi5pZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5hZGQodmFsISk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgICAgICB9LCBuZXcgU2V0PENhdGVnb3J5VGVybT4oKHRlcm0pID0+IG1ha2VTdHJpbmcodGVybSkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==