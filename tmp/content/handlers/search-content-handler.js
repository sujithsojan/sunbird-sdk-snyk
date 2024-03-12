var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { MimeType, SearchType, SortOrder } from '..';
import { InteractType, TelemetryInteractRequest } from '../../telemetry';
import { NumberUtil } from '../../util/number-util';
var SearchContentHandler = /** @class */ (function () {
    function SearchContentHandler(appConfig, contentServiceConfig, telemetryService) {
        this.appConfig = appConfig;
        this.contentServiceConfig = contentServiceConfig;
        this.telemetryService = telemetryService;
    }
    SearchContentHandler.prototype.getSearchCriteria = function (requestMap) {
        var _this = this;
        var request = requestMap['request'];
        var query = request['query'];
        var exists = request['exists'];
        var limit = request['limit'];
        var offset = request['offset'];
        var mode;
        if (request.hasOwnProperty('mode') && request['mode'] === 'soft') {
            mode = 'soft';
        }
        var sortCriteria = [];
        if (request.hasOwnProperty('sort_by')) {
            var sortBy_1 = request['sort_by'];
            Object.keys(sortBy_1).forEach(function (key) {
                var criteria = {
                    sortAttribute: key,
                    sortOrder: _this.getSortOrder(String(sortBy_1[key]))
                };
                sortCriteria.push(criteria);
            });
        }
        var contentSearchCriteria = __assign(__assign(__assign({}, ((query ? { query: query } : {}))), ((exists ? { exists: exists } : {}))), { mode: mode, sortCriteria: sortCriteria, searchType: this.getSearchType(String(request['searchType'])), offset: offset ? offset : 0, limit: limit ? limit : 100 });
        var contentTypes;
        var primaryCategories;
        var impliedFilter;
        if (request.hasOwnProperty('filters')) {
            var filterMap = request['filters'];
            if (filterMap.contentType) {
                contentTypes = filterMap.contentType;
            }
            if (filterMap.primaryCategory) {
                primaryCategories = filterMap.primaryCategory;
            }
            impliedFilter = this.mapFilterValues(filterMap, contentSearchCriteria);
            contentSearchCriteria.impliedFilters = impliedFilter;
            contentSearchCriteria.contentTypes = contentTypes;
            contentSearchCriteria.primaryCategories = primaryCategories;
        }
        var facets;
        if (request.hasOwnProperty('facets')) {
            facets = request['facets'];
            contentSearchCriteria.facets = facets;
        }
        return contentSearchCriteria;
    };
    SearchContentHandler.prototype.getSearchContentRequest = function (criteria) {
        return {
            query: criteria.query,
            offset: criteria.offset,
            limit: criteria.limit,
            mode: criteria.mode,
            exists: (criteria.exists && criteria.exists.length > 0) ? criteria.exists : [],
            facets: (criteria.facets && criteria.facets.length > 0) ? criteria.facets : [],
            sort_by: this.getSortByRequest(criteria.sortCriteria),
            filters: this.getSearchFilter(criteria),
            fields: criteria.fields
        };
    };
    SearchContentHandler.prototype.getSearchFilter = function (criteria) {
        if (criteria.searchType.valueOf() === SearchType.SEARCH.valueOf()) {
            return this.getSearchRequest(criteria);
        }
        else if (criteria.searchType.valueOf() === SearchType.FILTER.valueOf()) {
            return this.getFilterRequest(criteria);
        }
        return {};
    };
    SearchContentHandler.prototype.getFilterRequest = function (criteria) {
        var searchFilter = {};
        this.addFiltersToRequest(searchFilter, criteria.facetFilters);
        this.addFiltersToRequest(searchFilter, criteria.impliedFilters);
        if (criteria.impliedFiltersMap && criteria.impliedFiltersMap.length > 0) {
            criteria.impliedFiltersMap.forEach(function (filterMap) {
                searchFilter = __assign(__assign({}, searchFilter), filterMap);
            });
        }
        return searchFilter;
    };
    SearchContentHandler.prototype.addFiltersToRequest = function (searchFilter, filter) {
        if (filter && filter.length) {
            filter.forEach(function (facetFilter) {
                var filterValueList = [];
                facetFilter.values.forEach(function (value) {
                    if (value.apply) {
                        filterValueList.push(value.name);
                    }
                });
                if (filterValueList.length) {
                    var key = facetFilter.name;
                    if (facetFilter['alternative']) {
                        switch (facetFilter.name) {
                            case 'board':
                                key = 'se_boards';
                                break;
                            case 'medium':
                                key = 'se_mediums';
                                break;
                            case 'gradeLevel':
                            case 'grade':
                                key = 'se_gradeLevels';
                                break;
                        }
                    }
                    searchFilter[key] = filterValueList;
                }
            });
        }
    };
    SearchContentHandler.prototype.getSearchRequest = function (criteria) {
        var _this = this;
        var filter = __assign(__assign(__assign(__assign(__assign({ audience: (criteria.audience && criteria.audience.length > 0) ? criteria.audience : [], status: criteria.contentStatusArray, objectType: ['Content', 'QuestionSet'], contentType: (criteria.contentTypes && criteria.contentTypes.length > 0) ? criteria.contentTypes : [], primaryCategory: (criteria.primaryCategories && criteria.primaryCategories.length > 0) ? criteria.primaryCategories : [] }, ((criteria.keywords && criteria.keywords.length) ? { keywords: criteria.keywords } : {})), ((criteria.dialCodes && criteria.dialCodes.length) ? { dialcodes: criteria.dialCodes } : {})), ((criteria.createdBy && criteria.createdBy.length) ? { createdBy: criteria.createdBy } : {})), ((criteria.grade && criteria.grade.length) ? { se_gradeLevels: criteria.grade } : {})), { se_mediums: (criteria.medium && criteria.medium.length > 0) ? criteria.medium : [], se_boards: (criteria.board && criteria.board.length > 0) ? criteria.board : [], language: (criteria.language && criteria.language.length > 0) ? criteria.language : [], topic: (criteria.topic && criteria.topic.length > 0) ? criteria.topic : [], purpose: (criteria.purpose && criteria.purpose.length > 0) ? criteria.purpose : [], channel: (criteria.channel && criteria.channel.length > 0) ? criteria.channel : [], mimeType: (criteria.mimeType && criteria.mimeType.length > 0) ? criteria.mimeType : [], subject: (criteria.subject && criteria.subject.length > 0) ? criteria.subject : [] });
        if (criteria.impliedFiltersMap) {
            criteria.impliedFiltersMap.forEach(function (impliedFilter) {
                Object.keys(impliedFilter).forEach(function (key) {
                    filter[key] = impliedFilter[key];
                });
            });
        }
        if (criteria.impliedFilters) {
            criteria.impliedFilters.forEach(function (impliedFilter) {
                Object.keys(impliedFilter).forEach(function (key) {
                    var values = impliedFilter['values'];
                    var name = impliedFilter['name'];
                    var filterValues = _this.getImpliedFilterValues(values);
                    if (!filter[name]) {
                        filter[name] = [];
                    }
                    if (filter[name]) {
                        var mergedValues_1 = filter[name].concat(filterValues);
                        if (mergedValues_1) {
                            filter[name] = mergedValues_1.filter(function (val, i) { return mergedValues_1.indexOf(val) === i; });
                        }
                    }
                });
            });
        }
        return filter;
    };
    SearchContentHandler.prototype.getImpliedFilterValues = function (values) {
        var filterValues = [];
        if (!values) {
            return [];
        }
        values.forEach(function (item) {
            if (item.apply) {
                filterValues.push(item.name);
            }
        });
        return filterValues;
    };
    SearchContentHandler.prototype.getSortByRequest = function (sortCriteria) {
        if (!sortCriteria) {
            return {};
        }
        return sortCriteria.reduce(function (acc, criteria) {
            acc[criteria.sortAttribute] = criteria.sortOrder;
            return acc;
        }, {});
    };
    SearchContentHandler.prototype.createFilterCriteria = function (previouscriteria, facets, appliedFilterMap) {
        var _this = this;
        var facetFilters = [];
        var contentSearchCriteria = {
            query: previouscriteria.query,
            limit: previouscriteria.limit,
            offset: previouscriteria.offset,
            facets: previouscriteria.facets,
            contentTypes: previouscriteria.contentTypes,
            primaryCategories: previouscriteria.primaryCategories,
            sortCriteria: previouscriteria.sortCriteria && previouscriteria.sortCriteria.length
                ? previouscriteria.sortCriteria : [],
            mode: previouscriteria.mode === 'soft' ? 'soft' : 'hard',
        };
        if (!facets) {
            return contentSearchCriteria;
        }
        facets.forEach(function (facet) {
            var appliedFilter = appliedFilterMap ? appliedFilterMap[facet.name] : [];
            var facetValues = facet.values;
            var values = _this.getSortedFilterValuesWithAppliedFilters(facetValues, appliedFilter);
            if (facet.name) {
                var filter = {
                    name: facet.name,
                    values: values
                };
                facetFilters.push(filter);
            }
            delete appliedFilterMap[facet.name];
        });
        contentSearchCriteria.facetFilters = facetFilters;
        contentSearchCriteria.impliedFilters = this.mapFilterValues(appliedFilterMap, contentSearchCriteria);
        return contentSearchCriteria;
    };
    SearchContentHandler.prototype.addFilterValue = function (facets, filters) {
        if (facets && facets.length > 0) {
            facets.forEach(function (facet) {
                var facetName = facet.name;
                var values = facet.values;
                var appliedFilter = filters[facetName];
            });
        }
    };
    SearchContentHandler.prototype.getFilterValuesWithAppliedFilter = function (facetValues, appliedFilter) {
        facetValues.forEach(function (facetValue) {
            var isApplied = false;
            if (appliedFilter && appliedFilter.indexOf(name) > -1) {
                isApplied = true;
            }
            facetValue.apply = isApplied;
        });
        return facetValues;
    };
    SearchContentHandler.prototype.mapSearchResponse = function (previousContentCriteria, searchResponse, searchRequest) {
        var contenDataList = (searchResponse.result.content || []).concat((searchResponse.result.QuestionSet || []));
        var constentSearchResult = {
            id: searchResponse.id,
            responseMessageId: searchResponse.params.resmsgid,
            filterCriteria: this.createFilterCriteria(previousContentCriteria, searchResponse.result.facets, searchRequest.filters),
            request: searchRequest,
            contentDataList: contenDataList,
            count: searchResponse.result.count,
            collectionDataList: searchResponse.result.collections ? searchResponse.result.collections : []
        };
        return constentSearchResult;
    };
    SearchContentHandler.prototype.getContentSearchFilter = function (contentIds, status, fields) {
        if (fields === void 0) { fields = []; }
        return {
            filters: {
                identifier: contentIds.filter(function (v, i) { return contentIds.indexOf(v) === i; }),
                status: status,
                objectType: ['Content']
            },
            fields: __spreadArrays(fields, [
                'downloadUrl', 'variants', 'mimeType', 'contentType', 'primaryCategory', 'pkgVersion'
            ])
        };
    };
    SearchContentHandler.prototype.getDownloadUrl = function (contentData, contentImport) {
        return __awaiter(this, void 0, void 0, function () {
            var downloadUrl, varientType, variants, spineData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            variants = (contentData.variants && typeof contentData.variants === 'string') ? JSON.parse(contentData.variants) : contentData.variants;
                        }
                        catch (_b) {
                            variants = contentData.variants;
                        }
                        if (contentData.mimeType === MimeType.COLLECTION.valueOf()) {
                            if (variants && variants['online']) {
                                varientType = 'online';
                            }
                            else if (variants && variants['spine']) {
                                varientType = 'spine';
                            }
                        }
                        else if (contentData.mimeType === MimeType.QUESTION_SET) {
                            if (variants && variants['full']) {
                                varientType = 'full';
                            }
                            else if (variants && variants['online']) {
                                varientType = 'online';
                            }
                        }
                        if (!(variants && varientType && variants[varientType])) return [3 /*break*/, 2];
                        spineData = variants[varientType];
                        downloadUrl = spineData && spineData['ecarUrl'];
                        return [4 /*yield*/, this.buildContentLoadingEvent(varientType, contentImport, contentData.primaryCategory || contentData.contentType, contentData.pkgVersion)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!downloadUrl) return [3 /*break*/, 4];
                        downloadUrl = contentData.downloadUrl.trim();
                        return [4 /*yield*/, this.buildContentLoadingEvent('full', contentImport, contentData.primaryCategory || contentData.contentType, contentData.pkgVersion)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, downloadUrl];
                }
            });
        });
    };
    SearchContentHandler.prototype.buildContentLoadingEvent = function (subtype, contentImport, contentType, contentVersion) {
        var telemetryInteractRequest = new TelemetryInteractRequest();
        telemetryInteractRequest.type = InteractType.OTHER;
        telemetryInteractRequest.subType = subtype;
        telemetryInteractRequest.pageId = 'ImportContent';
        telemetryInteractRequest.id = 'ImportContent';
        telemetryInteractRequest.objId = contentImport.contentId;
        telemetryInteractRequest.objType = contentType;
        telemetryInteractRequest.objVer = contentVersion;
        telemetryInteractRequest.rollup = contentImport.rollUp;
        telemetryInteractRequest.correlationData = contentImport.correlationData;
        return this.telemetryService.interact(telemetryInteractRequest).toPromise();
    };
    SearchContentHandler.prototype.getSortOrder = function (order) {
        var sortOrder;
        if (order === 'asc') {
            sortOrder = SortOrder.ASC;
        }
        else if (order === 'desc') {
            sortOrder = SortOrder.DESC;
        }
        else {
            sortOrder = SortOrder.DESC;
        }
        return sortOrder;
    };
    SearchContentHandler.prototype.getSearchType = function (type) {
        var searchType;
        if (type === 'search') {
            searchType = SearchType.SEARCH;
        }
        else if (type === 'filter') {
            searchType = SearchType.FILTER;
        }
        else {
            searchType = SearchType.SEARCH;
        }
        return searchType;
    };
    SearchContentHandler.prototype.getSortedFilterValuesWithAppliedFilters = function (facetValues, appliedFilters) {
        facetValues.forEach(function (facetValue) {
            var applied = false;
            if (appliedFilters) {
                appliedFilters.forEach(function (appliedFilter) {
                    if (appliedFilter && facetValue.name && facetValue.name.toLowerCase() === appliedFilter.toLowerCase()) {
                        applied = true;
                    }
                });
            }
            facetValue.apply = applied;
            facetValue.count = NumberUtil.parseInt(facetValue.count);
        });
        return facetValues;
    };
    SearchContentHandler.prototype.mapFilterValues = function (filtersMap, contentSearchCriteria) {
        var contentSearchFilters = [];
        var impliedFiltersMap = [];
        Object.keys(filtersMap).forEach(function (key) {
            var values = filtersMap[key];
            if (Array.isArray(values) && values.length) {
                var filterValues_1 = [];
                values.forEach(function (value) {
                    var filterValue = { name: value, apply: true };
                    filterValues_1.push(filterValue);
                });
                contentSearchFilters.push({ name: key, values: filterValues_1 });
            }
            else if (values) {
                var filterMap = {};
                filterMap[key] = values;
                impliedFiltersMap.push(filterMap);
            }
        });
        contentSearchCriteria.impliedFiltersMap = impliedFiltersMap;
        return contentSearchFilters;
    };
    return SearchContentHandler;
}());
export { SearchContentHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWNvbnRlbnQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL3NlYXJjaC1jb250ZW50LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQVNMLFFBQVEsRUFFUixVQUFVLEVBQ1YsU0FBUyxFQUNWLE1BQU0sSUFBSSxDQUFDO0FBR1osT0FBTyxFQUFDLFlBQVksRUFBRSx3QkFBd0IsRUFBbUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQ7SUFFRSw4QkFBb0IsU0FBb0IsRUFDcEIsb0JBQTBDLEVBQzFDLGdCQUFrQztRQUZsQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLFVBQWtDO1FBQXBELGlCQXdEQztRQXZEQyxJQUFNLE9BQU8sR0FBMkIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQztRQUNULElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ2hF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LFFBQVEsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQzFGLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQ3RGLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDbEYsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUM5RSxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3RGLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDMUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNsRixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENB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QyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxjQUFZLEVBQUMsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNLElBQUksTUFBTSxFQUFFO2dCQUNqQixJQUFNLFNBQVMsR0FBMkIsRUFBRSxDQUFDO2dCQUM3QyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILHFCQUFxQixDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzVELE9BQU8sb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUVILDJCQUFDO0FBQUQsQ0FBQyxBQTdaRCxJQTZaQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRlbnREYXRhLFxuICBDb250ZW50SW1wb3J0LFxuICBDb250ZW50U2VhcmNoQ3JpdGVyaWEsXG4gIENvbnRlbnRTZWFyY2hGaWx0ZXIsXG4gIENvbnRlbnRTZWFyY2hSZXN1bHQsXG4gIENvbnRlbnRTZXJ2aWNlQ29uZmlnLFxuICBDb250ZW50U29ydENyaXRlcmlhLFxuICBGaWx0ZXJWYWx1ZSxcbiAgTWltZVR5cGUsXG4gIFNlYXJjaFJlc3BvbnNlLFxuICBTZWFyY2hUeXBlLFxuICBTb3J0T3JkZXJcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uLy4uL2FwaS9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge1NlYXJjaEZpbHRlciwgU2VhcmNoUmVxdWVzdH0gZnJvbSAnLi4vZGVmL3NlYXJjaC1yZXF1ZXN0JztcbmltcG9ydCB7SW50ZXJhY3RUeXBlLCBUZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3QsIFRlbGVtZXRyeVNlcnZpY2V9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge051bWJlclV0aWx9IGZyb20gJy4uLy4uL3V0aWwvbnVtYmVyLXV0aWwnO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29udGVudEhhbmRsZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29udGVudFNlcnZpY2VDb25maWc6IENvbnRlbnRTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlbGVtZXRyeVNlcnZpY2U6IFRlbGVtZXRyeVNlcnZpY2UpIHtcbiAgfVxuXG4gIGdldFNlYXJjaENyaXRlcmlhKHJlcXVlc3RNYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBDb250ZW50U2VhcmNoQ3JpdGVyaWEge1xuICAgIGNvbnN0IHJlcXVlc3Q6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSByZXF1ZXN0TWFwWydyZXF1ZXN0J107XG4gICAgY29uc3QgcXVlcnkgPSByZXF1ZXN0WydxdWVyeSddO1xuICAgIGNvbnN0IGV4aXN0cyA9IHJlcXVlc3RbJ2V4aXN0cyddO1xuICAgIGNvbnN0IGxpbWl0ID0gcmVxdWVzdFsnbGltaXQnXTtcbiAgICBjb25zdCBvZmZzZXQgPSByZXF1ZXN0WydvZmZzZXQnXTtcbiAgICBsZXQgbW9kZTtcbiAgICBpZiAocmVxdWVzdC5oYXNPd25Qcm9wZXJ0eSgnbW9kZScpICYmIHJlcXVlc3RbJ21vZGUnXSA9PT0gJ3NvZnQnKSB7XG4gICAgICBtb2RlID0gJ3NvZnQnO1xuICAgIH1cbiAgICBjb25zdCBzb3J0Q3JpdGVyaWE6IENvbnRlbnRTb3J0Q3JpdGVyaWFbXSA9IFtdO1xuICAgIGlmIChyZXF1ZXN0Lmhhc093blByb3BlcnR5KCdzb3J0X2J5JykpIHtcbiAgICAgIGNvbnN0IHNvcnRCeSA9IHJlcXVlc3RbJ3NvcnRfYnknXTtcbiAgICAgIE9iamVjdC5rZXlzKHNvcnRCeSkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgY29uc3QgY3JpdGVyaWE6IENvbnRlbnRTb3J0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgc29ydEF0dHJpYnV0ZToga2V5LFxuICAgICAgICAgIHNvcnRPcmRlcjogdGhpcy5nZXRTb3J0T3JkZXIoU3RyaW5nKHNvcnRCeVtrZXldKSlcbiAgICAgICAgfTtcbiAgICAgICAgc29ydENyaXRlcmlhLnB1c2goY3JpdGVyaWEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudFNlYXJjaENyaXRlcmlhOiBDb250ZW50U2VhcmNoQ3JpdGVyaWEgPSB7XG4gICAgICAuLi4oKHF1ZXJ5ID8ge3F1ZXJ5OiBxdWVyeX0gOiB7fSkpLFxuICAgICAgLi4uKChleGlzdHMgPyB7ZXhpc3RzOiBleGlzdHN9IDoge30pKSxcbiAgICAgIG1vZGU6IG1vZGUsXG4gICAgICBzb3J0Q3JpdGVyaWE6IHNvcnRDcml0ZXJpYSxcbiAgICAgIHNlYXJjaFR5cGU6IHRoaXMuZ2V0U2VhcmNoVHlwZShTdHJpbmcocmVxdWVzdFsnc2VhcmNoVHlwZSddKSksXG4gICAgICBvZmZzZXQ6IG9mZnNldCA/IG9mZnNldCA6IDAsXG4gICAgICBsaW1pdDogbGltaXQgPyBsaW1pdCA6IDEwMFxuICAgIH07XG5cbiAgICBsZXQgY29udGVudFR5cGVzO1xuICAgIGxldCBwcmltYXJ5Q2F0ZWdvcmllcztcbiAgICBsZXQgaW1wbGllZEZpbHRlcjtcbiAgICBpZiAocmVxdWVzdC5oYXNPd25Qcm9wZXJ0eSgnZmlsdGVycycpKSB7XG4gICAgICBjb25zdCBmaWx0ZXJNYXA6IFNlYXJjaEZpbHRlciA9IHJlcXVlc3RbJ2ZpbHRlcnMnXSBhcyBTZWFyY2hGaWx0ZXI7XG4gICAgICBpZiAoZmlsdGVyTWFwLmNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGNvbnRlbnRUeXBlcyA9IGZpbHRlck1hcC5jb250ZW50VHlwZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWx0ZXJNYXAucHJpbWFyeUNhdGVnb3J5KSB7XG4gICAgICAgIHByaW1hcnlDYXRlZ29yaWVzID0gZmlsdGVyTWFwLnByaW1hcnlDYXRlZ29yeTtcbiAgICAgIH1cbiAgICAgIGltcGxpZWRGaWx0ZXIgPSB0aGlzLm1hcEZpbHRlclZhbHVlcyhmaWx0ZXJNYXAsIGNvbnRlbnRTZWFyY2hDcml0ZXJpYSk7XG4gICAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWEuaW1wbGllZEZpbHRlcnMgPSBpbXBsaWVkRmlsdGVyO1xuICAgICAgY29udGVudFNlYXJjaENyaXRlcmlhLmNvbnRlbnRUeXBlcyA9IGNvbnRlbnRUeXBlcztcbiAgICAgIGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5wcmltYXJ5Q2F0ZWdvcmllcyA9IHByaW1hcnlDYXRlZ29yaWVzO1xuICAgIH1cbiAgICBsZXQgZmFjZXRzOiBzdHJpbmdbXTtcbiAgICBpZiAocmVxdWVzdC5oYXNPd25Qcm9wZXJ0eSgnZmFjZXRzJykpIHtcbiAgICAgIGZhY2V0cyA9IHJlcXVlc3RbJ2ZhY2V0cyddO1xuICAgICAgY29udGVudFNlYXJjaENyaXRlcmlhLmZhY2V0cyA9IGZhY2V0cztcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGVudFNlYXJjaENyaXRlcmlhO1xuICB9XG5cbiAgZ2V0U2VhcmNoQ29udGVudFJlcXVlc3QoY3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSk6IFNlYXJjaFJlcXVlc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeTogY3JpdGVyaWEucXVlcnksXG4gICAgICBvZmZzZXQ6IGNyaXRlcmlhLm9mZnNldCxcbiAgICAgIGxpbWl0OiBjcml0ZXJpYS5saW1pdCxcbiAgICAgIG1vZGU6IGNyaXRlcmlhLm1vZGUsXG4gICAgICBleGlzdHM6IChjcml0ZXJpYS5leGlzdHMgJiYgY3JpdGVyaWEuZXhpc3RzLmxlbmd0aCA+IDApID8gY3JpdGVyaWEuZXhpc3RzIDogW10sXG4gICAgICBmYWNldHM6IChjcml0ZXJpYS5mYWNldHMgJiYgY3JpdGVyaWEuZmFjZXRzLmxlbmd0aCA+IDApID8gY3JpdGVyaWEuZmFjZXRzIDogW10sXG4gICAgICBzb3J0X2J5OiB0aGlzLmdldFNvcnRCeVJlcXVlc3QoY3JpdGVyaWEuc29ydENyaXRlcmlhISksXG4gICAgICBmaWx0ZXJzOiB0aGlzLmdldFNlYXJjaEZpbHRlcihjcml0ZXJpYSksXG4gICAgICBmaWVsZHM6IGNyaXRlcmlhLmZpZWxkc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFNlYXJjaEZpbHRlcihjcml0ZXJpYTogQ29udGVudFNlYXJjaENyaXRlcmlhKTogU2VhcmNoRmlsdGVyIHtcbiAgICBpZiAoY3JpdGVyaWEuc2VhcmNoVHlwZSEudmFsdWVPZigpID09PSBTZWFyY2hUeXBlLlNFQVJDSC52YWx1ZU9mKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNlYXJjaFJlcXVlc3QoY3JpdGVyaWEpO1xuICAgIH0gZWxzZSBpZiAoY3JpdGVyaWEuc2VhcmNoVHlwZSEudmFsdWVPZigpID09PSBTZWFyY2hUeXBlLkZJTFRFUi52YWx1ZU9mKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlclJlcXVlc3QoY3JpdGVyaWEpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlclJlcXVlc3QoY3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSk6IFNlYXJjaEZpbHRlciB7XG4gICAgbGV0IHNlYXJjaEZpbHRlcjogU2VhcmNoRmlsdGVyID0ge307XG4gICAgdGhpcy5hZGRGaWx0ZXJzVG9SZXF1ZXN0KHNlYXJjaEZpbHRlciwgY3JpdGVyaWEuZmFjZXRGaWx0ZXJzISk7XG4gICAgdGhpcy5hZGRGaWx0ZXJzVG9SZXF1ZXN0KHNlYXJjaEZpbHRlciwgY3JpdGVyaWEuaW1wbGllZEZpbHRlcnMhKTtcblxuICAgIGlmIChjcml0ZXJpYS5pbXBsaWVkRmlsdGVyc01hcCAmJiBjcml0ZXJpYS5pbXBsaWVkRmlsdGVyc01hcC5sZW5ndGggPiAwKSB7XG4gICAgICBjcml0ZXJpYS5pbXBsaWVkRmlsdGVyc01hcC5mb3JFYWNoKGZpbHRlck1hcCA9PiB7XG4gICAgICAgIHNlYXJjaEZpbHRlciA9IHtcbiAgICAgICAgICAuLi5zZWFyY2hGaWx0ZXIsXG4gICAgICAgICAgLi4uZmlsdGVyTWFwXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNlYXJjaEZpbHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsdGVyc1RvUmVxdWVzdChzZWFyY2hGaWx0ZXI6IFNlYXJjaEZpbHRlciwgZmlsdGVyOiBDb250ZW50U2VhcmNoRmlsdGVyW10pIHtcbiAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5sZW5ndGgpIHtcbiAgICAgIGZpbHRlci5mb3JFYWNoKGZhY2V0RmlsdGVyID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWVMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmYWNldEZpbHRlci52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlLmFwcGx5KSB7XG4gICAgICAgICAgICBmaWx0ZXJWYWx1ZUxpc3QucHVzaCh2YWx1ZS5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGtleSA9IGZhY2V0RmlsdGVyLm5hbWU7XG4gICAgICAgICAgaWYgKGZhY2V0RmlsdGVyWydhbHRlcm5hdGl2ZSddKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZhY2V0RmlsdGVyLm5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnYm9hcmQnOlxuICAgICAgICAgICAgICAgIGtleSA9ICdzZV9ib2FyZHMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtZWRpdW0nOlxuICAgICAgICAgICAgICAgIGtleSA9ICdzZV9tZWRpdW1zJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZ3JhZGVMZXZlbCc6XG4gICAgICAgICAgICAgIGNhc2UgJ2dyYWRlJzpcbiAgICAgICAgICAgICAgICBrZXkgPSAnc2VfZ3JhZGVMZXZlbHMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWFyY2hGaWx0ZXJba2V5XSA9IGZpbHRlclZhbHVlTGlzdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZWFyY2hSZXF1ZXN0KGNyaXRlcmlhOiBDb250ZW50U2VhcmNoQ3JpdGVyaWEpOiBTZWFyY2hGaWx0ZXIge1xuICAgIGNvbnN0IGZpbHRlciA9ICB7XG4gICAgICBhdWRpZW5jZTogKGNyaXRlcmlhLmF1ZGllbmNlICYmIGNyaXRlcmlhLmF1ZGllbmNlLmxlbmd0aCA+IDApID8gY3JpdGVyaWEuYXVkaWVuY2UgOiBbXSxcbiAgICAgIHN0YXR1czogY3JpdGVyaWEuY29udGVudFN0YXR1c0FycmF5LFxuICAgICAgb2JqZWN0VHlwZTogWydDb250ZW50JywgJ1F1ZXN0aW9uU2V0J10sXG4gICAgICBjb250ZW50VHlwZTogKGNyaXRlcmlhLmNvbnRlbnRUeXBlcyAmJiBjcml0ZXJpYS5jb250ZW50VHlwZXMubGVuZ3RoID4gMCkgPyBjcml0ZXJpYS5jb250ZW50VHlwZXMgOiBbXSxcbiAgICAgIHByaW1hcnlDYXRlZ29yeTogKGNyaXRlcmlhLnByaW1hcnlDYXRlZ29yaWVzICYmIGNyaXRlcmlhLnByaW1hcnlDYXRlZ29yaWVzLmxlbmd0aCA+IDApID8gY3JpdGVyaWEucHJpbWFyeUNhdGVnb3JpZXMgOiBbXSxcbiAgICAgIC4uLigoY3JpdGVyaWEua2V5d29yZHMgJiYgY3JpdGVyaWEua2V5d29yZHMubGVuZ3RoKSA/IHtrZXl3b3JkczogY3JpdGVyaWEua2V5d29yZHN9IDoge30pLFxuICAgICAgLi4uKChjcml0ZXJpYS5kaWFsQ29kZXMgJiYgY3JpdGVyaWEuZGlhbENvZGVzLmxlbmd0aCkgPyB7ZGlhbGNvZGVzOiBjcml0ZXJpYS5kaWFsQ29kZXN9IDoge30pLFxuICAgICAgLi4uKChjcml0ZXJpYS5jcmVhdGVkQnkgJiYgY3JpdGVyaWEuY3JlYXRlZEJ5Lmxlbmd0aCkgPyB7Y3JlYXRlZEJ5OiBjcml0ZXJpYS5jcmVhdGVkQnl9IDoge30pLFxuICAgICAgLi4uKChjcml0ZXJpYS5ncmFkZSAmJiBjcml0ZXJpYS5ncmFkZS5sZW5ndGgpID8ge3NlX2dyYWRlTGV2ZWxzOiBjcml0ZXJpYS5ncmFkZX0gOiB7fSksXG4gICAgICBzZV9tZWRpdW1zOiAoY3JpdGVyaWEubWVkaXVtICYmIGNyaXRlcmlhLm1lZGl1bS5sZW5ndGggPiAwKSA/IGNyaXRlcmlhLm1lZGl1bSA6IFtdLFxuICAgICAgc2VfYm9hcmRzOiAoY3JpdGVyaWEuYm9hcmQgJiYgY3JpdGVyaWEuYm9hcmQubGVuZ3RoID4gMCkgPyBjcml0ZXJpYS5ib2FyZCA6IFtdLFxuICAgICAgbGFuZ3VhZ2U6IChjcml0ZXJpYS5sYW5ndWFnZSAmJiBjcml0ZXJpYS5sYW5ndWFnZS5sZW5ndGggPiAwKSA/IGNyaXRlcmlhLmxhbmd1YWdlIDogW10sXG4gICAgICB0b3BpYzogKGNyaXRlcmlhLnRvcGljICYmIGNyaXRlcmlhLnRvcGljLmxlbmd0aCA+IDApID8gY3JpdGVyaWEudG9waWMgOiBbXSxcbiAgICAgIHB1cnBvc2U6IChjcml0ZXJpYS5wdXJwb3NlICYmIGNyaXRlcmlhLnB1cnBvc2UubGVuZ3RoID4gMCkgPyBjcml0ZXJpYS5wdXJwb3NlIDogW10sXG4gICAgICBjaGFubmVsOiAoY3JpdGVyaWEuY2hhbm5lbCAmJiBjcml0ZXJpYS5jaGFubmVsLmxlbmd0aCA+IDApID8gY3JpdGVyaWEuY2hhbm5lbCA6IFtdLFxuICAgICAgbWltZVR5cGU6IChjcml0ZXJpYS5taW1lVHlwZSAmJiBjcml0ZXJpYS5taW1lVHlwZS5sZW5ndGggPiAwKSA/IGNyaXRlcmlhLm1pbWVUeXBlIDogW10sXG4gICAgICBzdWJqZWN0OiAoY3JpdGVyaWEuc3ViamVjdCAmJiBjcml0ZXJpYS5zdWJqZWN0Lmxlbmd0aCA+IDApID8gY3JpdGVyaWEuc3ViamVjdCA6IFtdXG4gICAgfTtcblxuICAgIGlmIChjcml0ZXJpYS5pbXBsaWVkRmlsdGVyc01hcCkge1xuICAgICAgY3JpdGVyaWEuaW1wbGllZEZpbHRlcnNNYXAuZm9yRWFjaChpbXBsaWVkRmlsdGVyID0+IHtcbiAgICAgICAgT2JqZWN0LmtleXMoaW1wbGllZEZpbHRlcikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGZpbHRlcltrZXldID0gaW1wbGllZEZpbHRlcltrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY3JpdGVyaWEuaW1wbGllZEZpbHRlcnMpIHtcbiAgICAgIGNyaXRlcmlhLmltcGxpZWRGaWx0ZXJzLmZvckVhY2goaW1wbGllZEZpbHRlciA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKGltcGxpZWRGaWx0ZXIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBpbXBsaWVkRmlsdGVyWyd2YWx1ZXMnXTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gaW1wbGllZEZpbHRlclsnbmFtZSddO1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlcyA9IHRoaXMuZ2V0SW1wbGllZEZpbHRlclZhbHVlcyh2YWx1ZXMpO1xuICAgICAgICAgIGlmICghZmlsdGVyW25hbWVdKSB7XG4gICAgICAgICAgICBmaWx0ZXJbbmFtZV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpbHRlcltuYW1lXSkge1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkVmFsdWVzID0gZmlsdGVyW25hbWVdLmNvbmNhdChmaWx0ZXJWYWx1ZXMpO1xuICAgICAgICAgICAgaWYgKG1lcmdlZFZhbHVlcykge1xuICAgICAgICAgICAgICBmaWx0ZXJbbmFtZV0gPSBtZXJnZWRWYWx1ZXMuZmlsdGVyKCh2YWwsIGkpID0+IG1lcmdlZFZhbHVlcy5pbmRleE9mKHZhbCkgPT09IGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1wbGllZEZpbHRlclZhbHVlcyh2YWx1ZXM6IEZpbHRlclZhbHVlW10pOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICghdmFsdWVzKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHZhbHVlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5hcHBseSkge1xuICAgICAgICBmaWx0ZXJWYWx1ZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJWYWx1ZXM7XG4gIH1cblxuICBnZXRTb3J0QnlSZXF1ZXN0KHNvcnRDcml0ZXJpYT86IENvbnRlbnRTb3J0Q3JpdGVyaWFbXSk6IHsgW2tleTogc3RyaW5nXTogU29ydE9yZGVyIH0ge1xuICAgIGlmICghc29ydENyaXRlcmlhKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvcnRDcml0ZXJpYS5yZWR1Y2UoKGFjYywgY3JpdGVyaWEpID0+IHtcbiAgICAgIGFjY1tjcml0ZXJpYS5zb3J0QXR0cmlidXRlXSA9IGNyaXRlcmlhLnNvcnRPcmRlcjtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgY3JlYXRlRmlsdGVyQ3JpdGVyaWEocHJldmlvdXNjcml0ZXJpYTogQ29udGVudFNlYXJjaENyaXRlcmlhLCBmYWNldHM6IENvbnRlbnRTZWFyY2hGaWx0ZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwbGllZEZpbHRlck1hcDogU2VhcmNoRmlsdGVyKTogQ29udGVudFNlYXJjaENyaXRlcmlhIHtcbiAgICBjb25zdCBmYWNldEZpbHRlcnM6IENvbnRlbnRTZWFyY2hGaWx0ZXJbXSA9IFtdO1xuICAgIGNvbnN0IGNvbnRlbnRTZWFyY2hDcml0ZXJpYTogQ29udGVudFNlYXJjaENyaXRlcmlhID0ge1xuICAgICAgcXVlcnk6IHByZXZpb3VzY3JpdGVyaWEucXVlcnksXG4gICAgICBsaW1pdDogcHJldmlvdXNjcml0ZXJpYS5saW1pdCxcbiAgICAgIG9mZnNldDogcHJldmlvdXNjcml0ZXJpYS5vZmZzZXQsXG4gICAgICBmYWNldHM6IHByZXZpb3VzY3JpdGVyaWEuZmFjZXRzLFxuICAgICAgY29udGVudFR5cGVzOiBwcmV2aW91c2NyaXRlcmlhLmNvbnRlbnRUeXBlcyxcbiAgICAgIHByaW1hcnlDYXRlZ29yaWVzOiBwcmV2aW91c2NyaXRlcmlhLnByaW1hcnlDYXRlZ29yaWVzLFxuICAgICAgc29ydENyaXRlcmlhOiBwcmV2aW91c2NyaXRlcmlhLnNvcnRDcml0ZXJpYSAmJiBwcmV2aW91c2NyaXRlcmlhLnNvcnRDcml0ZXJpYS5sZW5ndGhcbiAgICAgICAgPyBwcmV2aW91c2NyaXRlcmlhLnNvcnRDcml0ZXJpYSA6IFtdLFxuICAgICAgbW9kZTogcHJldmlvdXNjcml0ZXJpYS5tb2RlID09PSAnc29mdCcgPyAnc29mdCcgOiAnaGFyZCcsXG4gICAgfTtcblxuICAgIGlmICghZmFjZXRzKSB7XG4gICAgICByZXR1cm4gY29udGVudFNlYXJjaENyaXRlcmlhO1xuICAgIH1cblxuICAgIGZhY2V0cy5mb3JFYWNoKChmYWNldCkgPT4ge1xuICAgICAgY29uc3QgYXBwbGllZEZpbHRlcjogc3RyaW5nW10gPSBhcHBsaWVkRmlsdGVyTWFwID8gYXBwbGllZEZpbHRlck1hcFtmYWNldC5uYW1lXSA6IFtdO1xuICAgICAgY29uc3QgZmFjZXRWYWx1ZXM6IEZpbHRlclZhbHVlW10gPSBmYWNldC52YWx1ZXM7XG4gICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldFNvcnRlZEZpbHRlclZhbHVlc1dpdGhBcHBsaWVkRmlsdGVycyhmYWNldFZhbHVlcywgYXBwbGllZEZpbHRlcik7XG4gICAgICBpZiAoZmFjZXQubmFtZSkge1xuICAgICAgICBjb25zdCBmaWx0ZXI6IENvbnRlbnRTZWFyY2hGaWx0ZXIgPSB7XG4gICAgICAgICAgbmFtZTogZmFjZXQubmFtZSxcbiAgICAgICAgICB2YWx1ZXM6IHZhbHVlc1xuICAgICAgICB9O1xuXG4gICAgICAgIGZhY2V0RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICB9XG4gICAgICBkZWxldGUgYXBwbGllZEZpbHRlck1hcFtmYWNldC5uYW1lXTtcbiAgICB9KTtcbiAgICBjb250ZW50U2VhcmNoQ3JpdGVyaWEuZmFjZXRGaWx0ZXJzID0gZmFjZXRGaWx0ZXJzO1xuICAgIGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5pbXBsaWVkRmlsdGVycyA9IHRoaXMubWFwRmlsdGVyVmFsdWVzKGFwcGxpZWRGaWx0ZXJNYXAsIGNvbnRlbnRTZWFyY2hDcml0ZXJpYSk7XG4gICAgcmV0dXJuIGNvbnRlbnRTZWFyY2hDcml0ZXJpYTtcbiAgfVxuXG4gIGFkZEZpbHRlclZhbHVlKGZhY2V0czogQ29udGVudFNlYXJjaEZpbHRlcltdLCBmaWx0ZXJzKSB7XG4gICAgaWYgKGZhY2V0cyAmJiBmYWNldHMubGVuZ3RoID4gMCkge1xuICAgICAgZmFjZXRzLmZvckVhY2goZmFjZXQgPT4ge1xuICAgICAgICBjb25zdCBmYWNldE5hbWU6IHN0cmluZyA9IGZhY2V0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHZhbHVlczogRmlsdGVyVmFsdWVbXSA9IGZhY2V0LnZhbHVlcztcbiAgICAgICAgY29uc3QgYXBwbGllZEZpbHRlcjogc3RyaW5nW10gPSBmaWx0ZXJzW2ZhY2V0TmFtZV07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRGaWx0ZXJWYWx1ZXNXaXRoQXBwbGllZEZpbHRlcihmYWNldFZhbHVlczogRmlsdGVyVmFsdWVbXSwgYXBwbGllZEZpbHRlcjogc3RyaW5nW10pOiBGaWx0ZXJWYWx1ZVtdIHtcbiAgICBmYWNldFZhbHVlcy5mb3JFYWNoKGZhY2V0VmFsdWUgPT4ge1xuICAgICAgbGV0IGlzQXBwbGllZCA9IGZhbHNlO1xuICAgICAgaWYgKGFwcGxpZWRGaWx0ZXIgJiYgYXBwbGllZEZpbHRlci5pbmRleE9mKG5hbWUpID4gLTEpIHtcbiAgICAgICAgaXNBcHBsaWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZhY2V0VmFsdWUuYXBwbHkgPSBpc0FwcGxpZWQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhY2V0VmFsdWVzO1xuICB9XG5cbiAgbWFwU2VhcmNoUmVzcG9uc2UocHJldmlvdXNDb250ZW50Q3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSwgc2VhcmNoUmVzcG9uc2U6IFNlYXJjaFJlc3BvbnNlLFxuICAgICAgc2VhcmNoUmVxdWVzdDogU2VhcmNoUmVxdWVzdCk6IENvbnRlbnRTZWFyY2hSZXN1bHQge1xuICAgICAgY29uc3QgY29udGVuRGF0YUxpc3QgPSAoc2VhcmNoUmVzcG9uc2UucmVzdWx0LmNvbnRlbnQgfHwgW10gKS5jb25jYXQoKHNlYXJjaFJlc3BvbnNlLnJlc3VsdC5RdWVzdGlvblNldCB8fCBbXSApKTtcbiAgICAgIGNvbnN0IGNvbnN0ZW50U2VhcmNoUmVzdWx0OiBDb250ZW50U2VhcmNoUmVzdWx0ID0ge1xuICAgICAgaWQ6IHNlYXJjaFJlc3BvbnNlLmlkLFxuICAgICAgcmVzcG9uc2VNZXNzYWdlSWQ6IHNlYXJjaFJlc3BvbnNlLnBhcmFtcy5yZXNtc2dpZCxcbiAgICAgIGZpbHRlckNyaXRlcmlhOiB0aGlzLmNyZWF0ZUZpbHRlckNyaXRlcmlhKHByZXZpb3VzQ29udGVudENyaXRlcmlhLCBzZWFyY2hSZXNwb25zZS5yZXN1bHQuZmFjZXRzLCBzZWFyY2hSZXF1ZXN0LmZpbHRlcnMpLFxuICAgICAgcmVxdWVzdDogc2VhcmNoUmVxdWVzdCxcbiAgICAgIGNvbnRlbnREYXRhTGlzdDogY29udGVuRGF0YUxpc3QsXG4gICAgICBjb3VudDogc2VhcmNoUmVzcG9uc2UucmVzdWx0LmNvdW50LFxuICAgICAgY29sbGVjdGlvbkRhdGFMaXN0OiBzZWFyY2hSZXNwb25zZS5yZXN1bHQuY29sbGVjdGlvbnMgPyBzZWFyY2hSZXNwb25zZS5yZXN1bHQuY29sbGVjdGlvbnMgOiBbXVxuICAgIH07XG4gICAgcmV0dXJuIGNvbnN0ZW50U2VhcmNoUmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldENvbnRlbnRTZWFyY2hGaWx0ZXIoY29udGVudElkczogc3RyaW5nW10sIHN0YXR1czogc3RyaW5nW10sIGZpZWxkczogKGtleW9mIENvbnRlbnREYXRhKVtdID0gW10pOiBTZWFyY2hSZXF1ZXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyczoge1xuICAgICAgICBpZGVudGlmaWVyOiBjb250ZW50SWRzLmZpbHRlcigodiwgaSkgPT4gY29udGVudElkcy5pbmRleE9mKHYpID09PSBpKSxcbiAgICAgICAgc3RhdHVzOiBzdGF0dXMsXG4gICAgICAgIG9iamVjdFR5cGU6IFsnQ29udGVudCddXG4gICAgICB9LFxuICAgICAgZmllbGRzOiBbXG4gICAgICAgIC4uLmZpZWxkcyxcbiAgICAgICAgJ2Rvd25sb2FkVXJsJywgJ3ZhcmlhbnRzJywgJ21pbWVUeXBlJywgJ2NvbnRlbnRUeXBlJywgJ3ByaW1hcnlDYXRlZ29yeScsICdwa2dWZXJzaW9uJ1xuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RG93bmxvYWRVcmwoY29udGVudERhdGE6IENvbnRlbnREYXRhLCBjb250ZW50SW1wb3J0PzogQ29udGVudEltcG9ydCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IGRvd25sb2FkVXJsO1xuICAgIGxldCB2YXJpZW50VHlwZTtcbiAgICBsZXQgdmFyaWFudHM7XG5cbiAgICB0cnl7XG4gICAgICB2YXJpYW50cyA9IChjb250ZW50RGF0YS52YXJpYW50cyAmJiB0eXBlb2YgY29udGVudERhdGEudmFyaWFudHM9PT0nc3RyaW5nJykgPyBKU09OLnBhcnNlKGNvbnRlbnREYXRhLnZhcmlhbnRzKSA6IGNvbnRlbnREYXRhLnZhcmlhbnRzO1xuICAgIH0gY2F0Y2h7XG4gICAgICB2YXJpYW50cyA9IGNvbnRlbnREYXRhLnZhcmlhbnRzO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50RGF0YS5taW1lVHlwZSA9PT0gTWltZVR5cGUuQ09MTEVDVElPTi52YWx1ZU9mKCkpIHtcbiAgICAgIGlmICh2YXJpYW50cyAmJiB2YXJpYW50c1snb25saW5lJ10pIHtcbiAgICAgICAgdmFyaWVudFR5cGUgPSAnb25saW5lJztcbiAgICAgIH0gZWxzZSBpZiAodmFyaWFudHMgJiYgdmFyaWFudHNbJ3NwaW5lJ10pIHtcbiAgICAgICAgdmFyaWVudFR5cGUgPSAnc3BpbmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihjb250ZW50RGF0YS5taW1lVHlwZSA9PT0gTWltZVR5cGUuUVVFU1RJT05fU0VUKXtcbiAgICAgIGlmICh2YXJpYW50cyAmJiB2YXJpYW50c1snZnVsbCddKSB7XG4gICAgICAgIHZhcmllbnRUeXBlID0gJ2Z1bGwnO1xuICAgICAgfSBlbHNlIGlmKHZhcmlhbnRzICYmIHZhcmlhbnRzWydvbmxpbmUnXSl7XG4gICAgICAgIHZhcmllbnRUeXBlID0gJ29ubGluZSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhcmlhbnRzICYmIHZhcmllbnRUeXBlICYmIHZhcmlhbnRzW3ZhcmllbnRUeXBlXSkge1xuICAgICAgY29uc3Qgc3BpbmVEYXRhID0gdmFyaWFudHNbdmFyaWVudFR5cGVdO1xuICAgICAgZG93bmxvYWRVcmwgPSBzcGluZURhdGEgJiYgc3BpbmVEYXRhWydlY2FyVXJsJ107XG4gICAgICBhd2FpdCB0aGlzLmJ1aWxkQ29udGVudExvYWRpbmdFdmVudCh2YXJpZW50VHlwZSwgY29udGVudEltcG9ydCEsXG4gICAgICAgIGNvbnRlbnREYXRhLnByaW1hcnlDYXRlZ29yeSB8fCBjb250ZW50RGF0YS5jb250ZW50VHlwZSwgY29udGVudERhdGEucGtnVmVyc2lvbik7XG4gICAgfVxuXG4gICAgaWYgKCFkb3dubG9hZFVybCkge1xuICAgICAgZG93bmxvYWRVcmwgPSBjb250ZW50RGF0YS5kb3dubG9hZFVybCEudHJpbSgpO1xuICAgICAgYXdhaXQgdGhpcy5idWlsZENvbnRlbnRMb2FkaW5nRXZlbnQoJ2Z1bGwnLCBjb250ZW50SW1wb3J0ISxcbiAgICAgICAgY29udGVudERhdGEucHJpbWFyeUNhdGVnb3J5IHx8IGNvbnRlbnREYXRhLmNvbnRlbnRUeXBlLCBjb250ZW50RGF0YS5wa2dWZXJzaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvd25sb2FkVXJsO1xuICB9XG5cbiAgYnVpbGRDb250ZW50TG9hZGluZ0V2ZW50KHN1YnR5cGU6IHN0cmluZywgY29udGVudEltcG9ydDogQ29udGVudEltcG9ydCwgY29udGVudFR5cGU6IHN0cmluZywgY29udGVudFZlcnNpb246IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHRlbGVtZXRyeUludGVyYWN0UmVxdWVzdCA9IG5ldyBUZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3QoKTtcbiAgICB0ZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3QudHlwZSA9IEludGVyYWN0VHlwZS5PVEhFUjtcbiAgICB0ZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3Quc3ViVHlwZSA9IHN1YnR5cGU7XG4gICAgdGVsZW1ldHJ5SW50ZXJhY3RSZXF1ZXN0LnBhZ2VJZCA9ICdJbXBvcnRDb250ZW50JztcbiAgICB0ZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3QuaWQgPSAnSW1wb3J0Q29udGVudCc7XG4gICAgdGVsZW1ldHJ5SW50ZXJhY3RSZXF1ZXN0Lm9iaklkID0gY29udGVudEltcG9ydC5jb250ZW50SWQ7XG4gICAgdGVsZW1ldHJ5SW50ZXJhY3RSZXF1ZXN0Lm9ialR5cGUgPSBjb250ZW50VHlwZTtcbiAgICB0ZWxlbWV0cnlJbnRlcmFjdFJlcXVlc3Qub2JqVmVyID0gY29udGVudFZlcnNpb247XG4gICAgdGVsZW1ldHJ5SW50ZXJhY3RSZXF1ZXN0LnJvbGx1cCA9IGNvbnRlbnRJbXBvcnQucm9sbFVwO1xuICAgIHRlbGVtZXRyeUludGVyYWN0UmVxdWVzdC5jb3JyZWxhdGlvbkRhdGEgPSBjb250ZW50SW1wb3J0LmNvcnJlbGF0aW9uRGF0YTtcbiAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmludGVyYWN0KHRlbGVtZXRyeUludGVyYWN0UmVxdWVzdCkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFNvcnRPcmRlcihvcmRlcik6IFNvcnRPcmRlciB7XG4gICAgbGV0IHNvcnRPcmRlcjogU29ydE9yZGVyO1xuICAgIGlmIChvcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgIHNvcnRPcmRlciA9IFNvcnRPcmRlci5BU0M7XG4gICAgfSBlbHNlIGlmIChvcmRlciA9PT0gJ2Rlc2MnKSB7XG4gICAgICBzb3J0T3JkZXIgPSBTb3J0T3JkZXIuREVTQztcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydE9yZGVyID0gU29ydE9yZGVyLkRFU0M7XG4gICAgfVxuICAgIHJldHVybiBzb3J0T3JkZXI7XG4gIH1cblxuICBwcml2YXRlIGdldFNlYXJjaFR5cGUodHlwZSk6IFNlYXJjaFR5cGUge1xuICAgIGxldCBzZWFyY2hUeXBlOiBTZWFyY2hUeXBlO1xuICAgIGlmICh0eXBlID09PSAnc2VhcmNoJykge1xuICAgICAgc2VhcmNoVHlwZSA9IFNlYXJjaFR5cGUuU0VBUkNIO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ZpbHRlcicpIHtcbiAgICAgIHNlYXJjaFR5cGUgPSBTZWFyY2hUeXBlLkZJTFRFUjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoVHlwZSA9IFNlYXJjaFR5cGUuU0VBUkNIO1xuICAgIH1cbiAgICByZXR1cm4gc2VhcmNoVHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U29ydGVkRmlsdGVyVmFsdWVzV2l0aEFwcGxpZWRGaWx0ZXJzKGZhY2V0VmFsdWVzOiBGaWx0ZXJWYWx1ZVtdLCBhcHBsaWVkRmlsdGVyczogc3RyaW5nW10pOiBGaWx0ZXJWYWx1ZVtdIHtcbiAgICBmYWNldFZhbHVlcy5mb3JFYWNoKChmYWNldFZhbHVlKSA9PiB7XG4gICAgICBsZXQgYXBwbGllZCA9IGZhbHNlO1xuICAgICAgaWYgKGFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICAgIGFwcGxpZWRGaWx0ZXJzLmZvckVhY2goKGFwcGxpZWRGaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoYXBwbGllZEZpbHRlciAmJiBmYWNldFZhbHVlLm5hbWUgJiYgZmFjZXRWYWx1ZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGFwcGxpZWRGaWx0ZXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgYXBwbGllZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZhY2V0VmFsdWUuYXBwbHkgPSBhcHBsaWVkO1xuICAgICAgZmFjZXRWYWx1ZS5jb3VudCA9IE51bWJlclV0aWwucGFyc2VJbnQoZmFjZXRWYWx1ZS5jb3VudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhY2V0VmFsdWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBGaWx0ZXJWYWx1ZXMoZmlsdGVyc01hcDogU2VhcmNoRmlsdGVyLCBjb250ZW50U2VhcmNoQ3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSk6IENvbnRlbnRTZWFyY2hGaWx0ZXJbXSB7XG4gICAgY29uc3QgY29udGVudFNlYXJjaEZpbHRlcnM6IENvbnRlbnRTZWFyY2hGaWx0ZXJbXSA9IFtdO1xuICAgIGNvbnN0IGltcGxpZWRGaWx0ZXJzTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9W10gPSBbXTtcbiAgICBPYmplY3Qua2V5cyhmaWx0ZXJzTWFwKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBmaWx0ZXJzTWFwW2tleV07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpICYmIHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWVzOiBGaWx0ZXJWYWx1ZVtdID0gW107XG4gICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlOiBGaWx0ZXJWYWx1ZSA9IHtuYW1lOiB2YWx1ZSwgYXBwbHk6IHRydWV9O1xuICAgICAgICAgIGZpbHRlclZhbHVlcy5wdXNoKGZpbHRlclZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRlbnRTZWFyY2hGaWx0ZXJzLnB1c2goe25hbWU6IGtleSwgdmFsdWVzOiBmaWx0ZXJWYWx1ZXN9KTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlck1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICBmaWx0ZXJNYXBba2V5XSA9IHZhbHVlcztcbiAgICAgICAgaW1wbGllZEZpbHRlcnNNYXAucHVzaChmaWx0ZXJNYXApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnRlbnRTZWFyY2hDcml0ZXJpYS5pbXBsaWVkRmlsdGVyc01hcCA9IGltcGxpZWRGaWx0ZXJzTWFwO1xuICAgIHJldHVybiBjb250ZW50U2VhcmNoRmlsdGVycztcbiAgfVxuXG59XG4iXX0=