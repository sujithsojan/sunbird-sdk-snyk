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
import { defer, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { CsContentsGroupGenerator } from '@project-sunbird/client-services/services/content/utilities/content-group-generator';
import { Request } from '../../api';
import { ObjectUtil } from '../../util/object-util';
import * as SHA1 from 'crypto-js/sha1';
import { NetworkStatus } from '../../util/network';
import { MimeTypeCategoryMapping } from '@project-sunbird/client-services/models/content';
var ContentAggregator = /** @class */ (function () {
    function ContentAggregator(searchContentHandler, formService, contentService, cachedItemStore, courseService, profileService, apiService, networkInfoService) {
        this.searchContentHandler = searchContentHandler;
        this.formService = formService;
        this.contentService = contentService;
        this.cachedItemStore = cachedItemStore;
        this.courseService = courseService;
        this.profileService = profileService;
        this.apiService = apiService;
        this.networkInfoService = networkInfoService;
    }
    ContentAggregator.buildRequestHash = function (request) {
        return SHA1(JSON.stringify(ObjectUtil.withDeeplyOrderedKeys(request))).toString();
    };
    ContentAggregator.prototype.aggregate = function (request, excludeDataSrc, formRequest, formFields, cacheable) {
        var _this = this;
        if (cacheable === void 0) { cacheable = false; }
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var fields, fieldTasks, builtTasks, combinedHash, combinedTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!formRequest && !formFields) {
                            throw new Error('formRequest or formFields required');
                        }
                        fields = [];
                        if (!formRequest) return [3 /*break*/, 2];
                        formRequest.from = request.from;
                        return [4 /*yield*/, this.formService.getForm(formRequest).toPromise().then(function (r) { return r.form.data.fields; })];
                    case 1:
                        fields = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (formFields) {
                            fields = formFields;
                            cacheable = false;
                        }
                        _a.label = 3;
                    case 3:
                        fields = fields
                            .filter(function (field) { return excludeDataSrc.indexOf(field.dataSrc.type) === -1; });
                        fieldTasks = fields.map(function (field) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!field.dataSrc) {
                                            throw new Error('INVALID_CONFIG');
                                        }
                                        _a = field.dataSrc.type;
                                        switch (_a) {
                                            case 'CONTENT_FACETS': return [3 /*break*/, 1];
                                            case 'RECENTLY_VIEWED_CONTENTS': return [3 /*break*/, 3];
                                            case 'CONTENTS': return [3 /*break*/, 5];
                                            case 'TRACKABLE_COLLECTIONS': return [3 /*break*/, 7];
                                            case 'CONTENT_DISCOVERY_BANNER': return [3 /*break*/, 9];
                                        }
                                        return [3 /*break*/, 11];
                                    case 1: return [4 /*yield*/, this.buildFacetsTask(field, request)];
                                    case 2: return [2 /*return*/, _b.sent()];
                                    case 3: return [4 /*yield*/, this.buildRecentlyViewedTask(field, request)];
                                    case 4: return [2 /*return*/, _b.sent()];
                                    case 5: return [4 /*yield*/, this.buildContentSearchTask(field, request)];
                                    case 6: return [2 /*return*/, _b.sent()];
                                    case 7: return [4 /*yield*/, this.buildTrackableCollectionsTask(field, request)];
                                    case 8: return [2 /*return*/, _b.sent()];
                                    case 9: return [4 /*yield*/, this.buildContentDiscoveryBannerTask(field)];
                                    case 10: return [2 /*return*/, _b.sent()];
                                    case 11:
                                        {
                                            console.error('UNKNOWN_DATA_SRC');
                                            return [2 /*return*/, { requestHash: '', task: of([]) }];
                                        }
                                        _b.label = 12;
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(fieldTasks)];
                    case 4:
                        builtTasks = _a.sent();
                        combinedHash = builtTasks.map(function (b) { return b.requestHash; }).join('-');
                        combinedTasks = defer(function () { return __awaiter(_this, void 0, void 0, function () {
                            var networkStatus;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.networkInfoService.networkStatus$.pipe(take(1)).toPromise()];
                                    case 1:
                                        networkStatus = _a.sent();
                                        if (cacheable && networkStatus === NetworkStatus.OFFLINE) {
                                            throw new Error('ContentAggregator: offline request');
                                        }
                                        return [2 /*return*/, Promise.all(builtTasks.map(function (b) { return b.task.toPromise(); })).then(function (result) {
                                                return result
                                                    .reduce(function (acc, v) {
                                                    return __spreadArrays(acc, v);
                                                }, [])
                                                    .sort(function (a, b) { return a.index - b.index; });
                                            })];
                                }
                            });
                        }); });
                        return [2 /*return*/, defer(function () {
                                if (cacheable) {
                                    return _this.cachedItemStore.get(combinedHash, ContentAggregator.CONTENT_AGGREGATION_KEY, 'ttl_' + ContentAggregator.CONTENT_AGGREGATION_KEY, function () { return combinedTasks; });
                                }
                                return combinedTasks;
                            }).pipe(map(function (result) { return ({ result: result }); })).toPromise()];
                }
            });
        }); });
    };
    ContentAggregator.prototype.buildRecentlyViewedTask = function (field, request) {
        return __awaiter(this, void 0, void 0, function () {
            var session, requestParams;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        session = _a.sent();
                        requestParams = {
                            uid: session.managedSession ? session.managedSession.uid : session.uid,
                            primaryCategories: [],
                            recentlyViewed: true,
                            limit: 20
                        };
                        return [2 /*return*/, {
                                requestHash: 'RECENTLY_VIEWED_CONTENTS_' + ContentAggregator.buildRequestHash(requestParams),
                                task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var contents;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.contentService.getContents(requestParams).toPromise()];
                                            case 1:
                                                contents = _a.sent();
                                                return [2 /*return*/, field.sections.map(function (section) {
                                                        return {
                                                            index: section.index,
                                                            title: section.title,
                                                            data: {
                                                                name: section.index + '',
                                                                sections: [
                                                                    {
                                                                        name: section.index + '',
                                                                        count: contents.length,
                                                                        contents: contents.map(function (c) {
                                                                            c.contentData['cardImg'] = c.contentData.appIcon;
                                                                            return c;
                                                                        })
                                                                    }
                                                                ]
                                                            },
                                                            dataSrc: field.dataSrc,
                                                            theme: section.theme,
                                                            description: section.description,
                                                            landingDetails: section.landingDetails,
                                                            isEnabled: section.isEnabled
                                                        };
                                                    })];
                                        }
                                    });
                                }); })
                            }];
                }
            });
        });
    };
    ContentAggregator.prototype.buildContentDiscoveryBannerTask = function (field) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        requestHash: 'CONTENT_DISCOVERY_BANNER' + ContentAggregator.buildRequestHash(field.dataSrc.type),
                        task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, field.sections.map(function (section) {
                                        return {
                                            index: section.index,
                                            code: section.code,
                                            title: section.title,
                                            data: field.dataSrc.values.filter(function (value) { return Number(value.expiry) > Math.floor(Date.now() / 1000); }),
                                            dataSrc: field.dataSrc,
                                            theme: section.theme,
                                            description: section.description,
                                            landingDetails: section.landingDetails,
                                            isEnabled: section.isEnabled
                                        };
                                    })];
                            });
                        }); })
                    }];
            });
        });
    };
    ContentAggregator.prototype.buildFacetsTask = function (field, request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchRequest, searchCriteria;
            var _this = this;
            return __generator(this, function (_b) {
                if (field.dataSrc.values) {
                    return [2 /*return*/, {
                            requestHash: '',
                            task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, field.sections.map(function (section) {
                                            return {
                                                index: section.index,
                                                code: section.code,
                                                title: section.title,
                                                data: field.dataSrc.values.sort(function (a, b) { return a.index - b.index; }),
                                                dataSrc: field.dataSrc,
                                                theme: section.theme,
                                                description: section.description,
                                                landingDetails: section.landingDetails,
                                                isEnabled: section.isEnabled
                                            };
                                        })];
                                });
                            }); })
                        }];
                }
                _a = this.buildSearchRequestAndCriteria(field, request), searchRequest = _a.searchRequest, searchCriteria = _a.searchCriteria;
                searchCriteria.facets = field.dataSrc.mapping.map(function (m) { return m.facet; });
                searchRequest.facets = searchCriteria.facets;
                searchRequest.limit = 0;
                searchRequest.offset = 0;
                return [2 /*return*/, {
                        requestHash: 'CONTENT_FACETS_' + ContentAggregator.buildRequestHash(searchRequest),
                        task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                            var searchResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.searchContents(field, searchCriteria, searchRequest)];
                                    case 1:
                                        searchResult = _a.sent();
                                        return [2 /*return*/, field.sections.map(function (section, index) {
                                                var _a, _b, _c;
                                                var searchFacetFilters = (_a = searchResult.filterCriteria.facetFilters) !== null && _a !== void 0 ? _a : [];
                                                var toBeDeletedFacets = [];
                                                searchFacetFilters.map(function (x) {
                                                    var _a, _b;
                                                    var facetConfig = ((_b = (_a = field.dataSrc.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.find(function (element) { return element.name === x.name; }));
                                                    if (facetConfig) {
                                                        facetConfig.mergeableAttributes.map(function (attribute) {
                                                            toBeDeletedFacets.push(attribute);
                                                            var mergeableFacets = searchFacetFilters.find(function (facet) { return facet.name === attribute; });
                                                            x.values = x.values.filter(function (y) { return facetConfig.values.
                                                                find(function (z) { return (z.code === y.name.replace(/\s+/g, '').toLowerCase()); }); });
                                                            var configFacets = facetConfig.values.filter(function (configFacet) { return configFacet.type = attribute; });
                                                            if (mergeableFacets) {
                                                                mergeableFacets.values = mergeableFacets.values.
                                                                    filter(function (y) { return configFacets.find(function (z) { return (z.code === y.name.replace(/\s+/g, '')); }); });
                                                                x.values = x.values.concat(mergeableFacets.values);
                                                            }
                                                        });
                                                    }
                                                });
                                                searchFacetFilters = searchFacetFilters.filter(function (x) { return toBeDeletedFacets.indexOf(x.name) === -1; });
                                                var facetFilters = searchFacetFilters.find(function (x) { var _a; return x.name === ((_a = field.dataSrc.mapping[index]) === null || _a === void 0 ? void 0 : _a.facet); });
                                                if (facetFilters) {
                                                    var facetConfig_1 = (_c = (_b = field.dataSrc.params) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.find(function (x) { return x.name === facetFilters.name; });
                                                    return {
                                                        index: section.index,
                                                        title: section.title,
                                                        code: section.code,
                                                        data: facetFilters.values.map(function (filterValue) {
                                                            var _a;
                                                            var facetCategoryConfig = facetConfig_1 ? facetConfig_1.values.
                                                                find(function (x) { return x.code === filterValue.name.
                                                                replace(/\s+/g, '').toLowerCase(); }) : [];
                                                            return {
                                                                facet: (facetCategoryConfig === null || facetCategoryConfig === void 0 ? void 0 : facetCategoryConfig.name) ? facetCategoryConfig.name : filterValue.name,
                                                                searchCriteria: __assign(__assign({}, searchCriteria), { primaryCategories: [], impliedFilters: ((_a = facetCategoryConfig === null || facetCategoryConfig === void 0 ? void 0 : facetCategoryConfig.searchCriteria) === null || _a === void 0 ? void 0 : _a.impliedFilters) ?
                                                                        facetCategoryConfig.searchCriteria.impliedFilters :
                                                                        [{ name: facetFilters.name, values: [{ name: filterValue.name, apply: true }] }] }),
                                                                aggregate: field.dataSrc.mapping[index].aggregate,
                                                                filterPillBy: field.dataSrc.mapping[index].filterPillBy
                                                            };
                                                        }).sort(function (a, b) {
                                                            if (request.userPreferences) {
                                                                var facetPreferences = request.userPreferences[facetFilters.name];
                                                                if (!facetPreferences ||
                                                                    (Array.isArray(facetPreferences) &&
                                                                        facetPreferences.indexOf(a.facet) > -1 &&
                                                                        facetPreferences.indexOf(b.facet) > -1) ||
                                                                    (facetPreferences === a.facet &&
                                                                        facetPreferences === b.facet)) {
                                                                    return a.facet.localeCompare(b.facet);
                                                                }
                                                                if ((Array.isArray(facetPreferences) &&
                                                                    facetPreferences.indexOf(a.facet) > -1) ||
                                                                    (facetPreferences === a.facet)) {
                                                                    return -1;
                                                                }
                                                                if ((Array.isArray(facetPreferences) &&
                                                                    facetPreferences.indexOf(b.facet) > -1) ||
                                                                    (facetPreferences === b.facet)) {
                                                                    return 1;
                                                                }
                                                            }
                                                            return a.facet.localeCompare(b.facet);
                                                        }),
                                                        dataSrc: field.dataSrc,
                                                        theme: section.theme,
                                                        description: section.description,
                                                        landingDetails: section.landingDetails,
                                                        isEnabled: section.isEnabled
                                                    };
                                                }
                                                else {
                                                    return {
                                                        index: section.index,
                                                        title: section.title,
                                                        code: section.code,
                                                        data: [],
                                                        dataSrc: field.dataSrc,
                                                        theme: section.theme,
                                                        description: section.description,
                                                        isEnabled: section.isEnabled
                                                    };
                                                }
                                            })];
                                }
                            });
                        }); })
                    }];
            });
        });
    };
    ContentAggregator.prototype.buildTrackableCollectionsTask = function (field, request) {
        return __awaiter(this, void 0, void 0, function () {
            var apiService, session;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiService = this.apiService;
                        return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, {
                                requestHash: 'TRACKABLE_COLLECTIONS_' + ContentAggregator.buildRequestHash({
                                    userId: session.managedSession ? session.managedSession.uid : session.uid
                                }),
                                task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var courses;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.courseService.getEnrolledCourses({
                                                    userId: session.managedSession ? session.managedSession.uid : session.uid,
                                                    returnFreshCourses: true
                                                }, new /** @class */ (function () {
                                                    function class_1() {
                                                    }
                                                    class_1.prototype.handle = function (_a) {
                                                        var userId = _a.userId;
                                                        if (field.dataSrc.request.path) {
                                                            field.dataSrc.request.path = field.dataSrc.request.path.replace('${userId}', userId);
                                                        }
                                                        var apiRequest = Request.fromJSON(field.dataSrc.request);
                                                        return apiService.fetch(apiRequest)
                                                            .pipe(map(function (response) {
                                                            // response.body.result.courses.sort((a, b) => (a.enrolledDate! > b.enrolledDate! ? -1 : 1));
                                                            return response.body;
                                                        }));
                                                    };
                                                    return class_1;
                                                }())).toPromise()];
                                            case 1:
                                                courses = _a.sent();
                                                return [2 /*return*/, field.sections.map(function (section, index) {
                                                        if (!field.dataSrc.mapping[index] || !field.dataSrc.mapping[index].aggregate) {
                                                            return {
                                                                index: section.index,
                                                                title: section.title,
                                                                data: {
                                                                    name: section.index + '',
                                                                    sections: [
                                                                        {
                                                                            name: section.index + '',
                                                                            count: courses.length,
                                                                            contents: courses
                                                                        }
                                                                    ]
                                                                },
                                                                dataSrc: field.dataSrc,
                                                                theme: section.theme,
                                                                description: section.description,
                                                                landingDetails: section.landingDetails,
                                                                isEnabled: section.isEnabled
                                                            };
                                                        }
                                                        else {
                                                            var aggregate = field.dataSrc.mapping[index].aggregate;
                                                            return {
                                                                index: section.index,
                                                                title: section.title,
                                                                data: CsContentsGroupGenerator.generate({
                                                                    contents: courses,
                                                                    groupBy: aggregate.groupBy,
                                                                    sortBy: aggregate.sortBy ? _this.buildSortByCriteria(aggregate.sortBy) : [],
                                                                    filterBy: aggregate.filterBy ? _this.buildFilterByCriteria(aggregate.filterBy) : [],
                                                                    groupSortBy: aggregate.groupSortBy ? _this.buildSortByCriteria(aggregate.groupSortBy) : [],
                                                                    groupFilterBy: aggregate.groupFilterBy ? _this.buildFilterByCriteria(aggregate.groupFilterBy) : [],
                                                                    includeSearchable: false
                                                                }),
                                                                dataSrc: field.dataSrc,
                                                                theme: section.theme,
                                                                description: section.description,
                                                                landingDetails: section.landingDetails,
                                                                isEnabled: section.isEnabled
                                                            };
                                                        }
                                                    })];
                                        }
                                    });
                                }); })
                            }];
                }
            });
        });
    };
    ContentAggregator.prototype.buildContentSearchTask = function (field, request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchRequest, searchCriteria;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.buildSearchRequestAndCriteria(field, request), searchRequest = _a.searchRequest, searchCriteria = _a.searchCriteria;
                return [2 /*return*/, {
                        requestHash: 'CONTENTS_' + ContentAggregator.buildRequestHash(searchRequest),
                        task: defer(function () { return __awaiter(_this, void 0, void 0, function () {
                            var offlineSearchContentDataList, onlineContentsResponse, onlineSearchContentDataList, combinedContents;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ( /* fetch offline contents */function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if ((searchRequest.filters && searchRequest.filters.primaryCategory) ||
                                                    (searchCriteria.primaryCategories && searchCriteria.primaryCategories.length === 0)) {
                                                    return [2 /*return*/, []];
                                                }
                                                return [2 /*return*/, this.contentService.getContents({
                                                        primaryCategories: (searchCriteria.primaryCategories && searchCriteria.primaryCategories.length
                                                            && searchCriteria.primaryCategories) ||
                                                            (searchRequest.filters && searchRequest.filters.primaryCategory) ||
                                                            [],
                                                        board: searchCriteria.board,
                                                        medium: searchCriteria.medium,
                                                        grade: searchCriteria.grade
                                                    }).pipe(map(function (contents) { return contents.map(function (content) {
                                                        if (content.contentData.appIcon && !content.contentData.appIcon.startsWith('https://')) {
                                                            content.contentData.appIcon = content.basePath + content.contentData.appIcon;
                                                        }
                                                        return content.contentData;
                                                    }); })).toPromise()];
                                            });
                                        }); })()];
                                    case 1:
                                        offlineSearchContentDataList = _a.sent();
                                        return [4 /*yield*/, this.searchContents(field, searchCriteria, searchRequest)];
                                    case 2:
                                        onlineContentsResponse = _a.sent();
                                        onlineSearchContentDataList = (onlineContentsResponse.contentDataList || []).filter(function (contentData) {
                                            return !offlineSearchContentDataList.find(function (localContentData) { return localContentData.identifier === contentData.identifier; });
                                        });
                                        combinedContents = offlineSearchContentDataList.concat(onlineSearchContentDataList).map(function (c) {
                                            c['cardImg'] = c.appIcon;
                                            return c;
                                        });
                                        combinedContents.sort(function (a, b) { return (a.lastPublishedOn > b.lastPublishedOn ? -1 : 1); });
                                        return [2 /*return*/, field.sections.map(function (section, index) {
                                                if (!field.dataSrc.mapping[index] || !field.dataSrc.mapping[index].aggregate) {
                                                    return {
                                                        index: section.index,
                                                        title: section.title,
                                                        meta: {
                                                            searchCriteria: searchCriteria,
                                                            filterCriteria: onlineContentsResponse.filterCriteria,
                                                            searchRequest: searchRequest
                                                        },
                                                        data: {
                                                            name: section.index + '',
                                                            sections: [
                                                                {
                                                                    count: combinedContents.length,
                                                                    contents: combinedContents
                                                                }
                                                            ]
                                                        },
                                                        dataSrc: field.dataSrc,
                                                        theme: section.theme,
                                                        description: section.description,
                                                        landingDetails: section.landingDetails,
                                                        isEnabled: section.isEnabled
                                                    };
                                                }
                                                else {
                                                    var aggregate_1 = field.dataSrc.mapping[index].aggregate;
                                                    var data = (function () {
                                                        var d = CsContentsGroupGenerator.generate({
                                                            contents: combinedContents,
                                                            groupBy: aggregate_1.groupBy,
                                                            sortBy: aggregate_1.sortBy ? _this.buildSortByCriteria(aggregate_1.sortBy) : [],
                                                            filterBy: aggregate_1.filterBy ? _this.buildFilterByCriteria(aggregate_1.filterBy) : [],
                                                            groupSortBy: aggregate_1.groupSortBy ? _this.buildSortByCriteria(aggregate_1.groupSortBy) : [],
                                                            groupFilterBy: aggregate_1.groupFilterBy ? _this.buildFilterByCriteria(aggregate_1.groupFilterBy) : [],
                                                            combination: field.dataSrc.mapping[index].applyFirstAvailableCombination &&
                                                                request.applyFirstAvailableCombination,
                                                            includeSearchable: false
                                                        });
                                                        if (request.userPreferences && request.userPreferences[aggregate_1.groupBy]) {
                                                            d.sections.sort(function (a, b) {
                                                                if (request.userPreferences[aggregate_1.groupBy].
                                                                    indexOf(a.name.replace(/[^A-Z0-9]/ig, '').toLocaleLowerCase()) > -1 &&
                                                                    request.userPreferences[aggregate_1.groupBy].
                                                                        indexOf(b.name.replace(/[^A-Z0-9]/ig, '').toLocaleLowerCase()) > -1) {
                                                                    return a.name.localeCompare(b.name);
                                                                }
                                                                if (request.userPreferences[aggregate_1.groupBy].
                                                                    indexOf(a.name.replace(/[^A-Z0-9]/ig, '').toLocaleLowerCase()) > -1) {
                                                                    return -1;
                                                                }
                                                                if (request.userPreferences[aggregate_1.groupBy].
                                                                    indexOf(b.name.replace(/[^A-Z0-9]/ig, '').toLocaleLowerCase()) > -1) {
                                                                    return 1;
                                                                }
                                                                return 0;
                                                            });
                                                        }
                                                        if (d.name) {
                                                            var facetDet = onlineContentsResponse.filterCriteria.facetFilters || [];
                                                            facetDet.map(function (facet) {
                                                                var facetVal = (facet.name == d.name) ? facet.values : [];
                                                                return d.sections.filter(function (o1) {
                                                                    return facetVal.some(function (o2) {
                                                                        if ((o1.name).toLocaleLowerCase() === (o2.name).toLowerCase()) {
                                                                            o1.totalCount = o2.count;
                                                                        }
                                                                        return o1.name === o2.name;
                                                                    });
                                                                });
                                                            });
                                                        }
                                                        return d;
                                                    })();
                                                    return {
                                                        index: section.index,
                                                        title: section.title,
                                                        meta: {
                                                            searchCriteria: searchCriteria,
                                                            filterCriteria: onlineContentsResponse.filterCriteria,
                                                            searchRequest: searchRequest
                                                        },
                                                        data: data,
                                                        dataSrc: field.dataSrc,
                                                        theme: section.theme,
                                                        description: section.description,
                                                        landingDetails: section.landingDetails,
                                                        isEnabled: section.isEnabled
                                                    };
                                                }
                                            })];
                                }
                            });
                        }); })
                    }];
            });
        });
    };
    ContentAggregator.prototype.buildFilterByCriteria = function (config) {
        return config.reduce(function (agg, s) {
            Object.keys(s).forEach(function (k) { return agg.push({
                filterAttribute: k,
                filterCondition: {
                    operation: s[k].operation,
                    value: s[k].value
                }
            }); });
            return agg;
        }, []);
    };
    ContentAggregator.prototype.buildSortByCriteria = function (config) {
        return config.reduce(function (agg, s) {
            Object.keys(s).forEach(function (k) { return agg.push({
                sortAttribute: k,
                sortOrder: s[k],
            }); });
            return agg;
        }, []);
    };
    ContentAggregator.prototype.buildSearchRequestAndCriteria = function (field, request) {
        var _this = this;
        var buildSearchCriteriaFromSearchRequest = function (r) {
            return _this.searchContentHandler.getSearchCriteria(r);
        };
        var buildSearchRequestFromSearchCriteria = function (c) {
            return _this.searchContentHandler.getSearchContentRequest(c);
        };
        var tempSearchRequest = (function () {
            if (field.dataSrc.request && field.dataSrc.request.body) {
                return __assign({ filters: {} }, field.dataSrc.request.body.request);
            }
            else {
                return { filters: {} };
            }
        })();
        var tempSearchCriteria = (function () {
            if (request.interceptSearchCriteria) {
                return request.interceptSearchCriteria(buildSearchCriteriaFromSearchRequest({
                    request: tempSearchRequest
                }));
            }
            else {
                return buildSearchCriteriaFromSearchRequest({
                    request: tempSearchRequest
                });
            }
        })();
        return {
            searchRequest: buildSearchRequestFromSearchCriteria(tempSearchCriteria),
            searchCriteria: tempSearchCriteria
        };
    };
    ContentAggregator.prototype.searchContents = function (field, searchCriteria, searchRequest) {
        var apiService = this.apiService;
        return this.contentService.searchContent(searchCriteria, undefined, new /** @class */ (function () {
            function class_2() {
            }
            class_2.prototype.handle = function (_) {
                if (searchRequest && searchRequest.filters && searchRequest.filters.mimeType) {
                    var reducer = function (acc, cur) {
                        if (MimeTypeCategoryMapping[cur]) {
                            return acc.concat(MimeTypeCategoryMapping[cur]);
                        }
                        return acc.concat([cur]);
                    };
                    searchRequest.filters.mimeType = searchRequest.filters.mimeType.reduce(reducer, []);
                }
                if (field.dataSrc.request && field.dataSrc.request.body && field.dataSrc.request.body.request) {
                    field.dataSrc.request.body = {
                        request: __assign(__assign({}, field.dataSrc.request.body.request), searchRequest)
                    };
                }
                else {
                    field.dataSrc.request.body = {
                        request: searchRequest
                    };
                }
                var cacheKey = JSON.stringify(ObjectUtil.withDeeplyOrderedKeys(field.dataSrc.request));
                if (ContentAggregator.searchContentCache.has(cacheKey)) {
                    return of(ContentAggregator.searchContentCache.get(cacheKey)).pipe(map(function (success) {
                        return success.body;
                    }));
                }
                var apiRequest = Request.fromJSON(field.dataSrc.request);
                return apiService.fetch(apiRequest).pipe(tap(function (r) {
                    ContentAggregator.searchContentCache.set(cacheKey, r);
                }), map(function (success) {
                    return success.body;
                }));
            };
            return class_2;
        }()), true).pipe(catchError(function (e) {
            console.error(e);
            return of({
                id: 'OFFLINE_RESPONSE_ID',
                responseMessageId: 'OFFLINE_RESPONSE_ID',
                filterCriteria: searchCriteria,
                contentDataList: []
            });
        })).toPromise();
    };
    ContentAggregator.searchContentCache = new Map();
    ContentAggregator.CONTENT_AGGREGATION_KEY = 'content-aggregation';
    return ContentAggregator;
}());
export { ContentAggregator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1hZ2dyZWdhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvY29udGVudC1hZ2dyZWdhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFBQyxLQUFLLEVBQWMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVMxRCxPQUFPLEVBQ0gsd0JBQXdCLEVBRTNCLE1BQU0scUZBQXFGLENBQUM7QUFHN0YsT0FBTyxFQUFnQyxPQUFPLEVBQW9CLE1BQU0sV0FBVyxDQUFDO0FBR3BGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEtBQUssSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBcUIsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUEwSTFGO0lBVUksMkJBQ1ksb0JBQTBDLEVBQzFDLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLGtCQUFzQztRQVB0Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsdUJB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LFVBQVUsQ0FBQyxLQUFLLENBQWlCLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDcEQsR0FBRyxDQUFDLFVBQUMsQ0FBQztvQkFDRixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQyxPQUFPO29CQUNSLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztZQUNOLENBQUM7WUFDTCxjQUFDO1FBQUQsQ0FBQyxBQTNDRyxHQTJDSCxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDYixVQUFVLENBQUMsVUFBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqQixPQUFPLEVBQUUsQ0FBQztnQkFDTixFQUFFLEVBQUUscUJBQXFCO2dCQUN6QixpQkFBaUIsRUFBRSxxQkFBcUI7Z0JBQ3hDLGNBQWMsRUFBRSxjQUFjO2dCQUM5QixlQUFlLEVBQUUsRUFBRTthQUN0QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFwcUJjLG9DQUFrQixHQUFHLElBQUksR0FBRyxFQUFzQyxDQUFDO0lBQ25FLHlDQUF1QixHQUFHLHFCQUFxQixDQUFDO0lBb3FCbkUsd0JBQUM7Q0FBQSxBQXRxQkQsSUFzcUJDO1NBdHFCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbnRlbnQsXG4gICAgQ29udGVudEFnZ3JlZ2F0b3JSZXF1ZXN0LFxuICAgIENvbnRlbnRBZ2dyZWdhdG9yUmVzcG9uc2UsXG4gICAgQ29udGVudERhdGEsXG4gICAgQ29udGVudFJlcXVlc3QsXG4gICAgQ29udGVudFNlYXJjaENyaXRlcmlhLFxuICAgIENvbnRlbnRTZWFyY2hSZXN1bHQsXG4gICAgQ29udGVudFNlcnZpY2UsXG4gICAgQ29udGVudHNHcm91cGVkQnlQYWdlU2VjdGlvbixcbiAgICBTZWFyY2hSZXNwb25zZSxcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIHRha2UsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDYWNoZWRJdGVtU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge1NlYXJjaFJlcXVlc3R9IGZyb20gJy4uL2RlZi9zZWFyY2gtcmVxdWVzdCc7XG5pbXBvcnQge0Zvcm1SZXF1ZXN0LCBGb3JtU2VydmljZX0gZnJvbSAnLi4vLi4vZm9ybSc7XG5pbXBvcnQge1NlYXJjaENvbnRlbnRIYW5kbGVyfSBmcm9tICcuL3NlYXJjaC1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtcbiAgICBDc1NvcnRDcml0ZXJpYSxcbiAgICBDc0ZpbHRlckNyaXRlcmlhLFxufSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jb250ZW50JztcbmltcG9ydCB7XG4gICAgQ3NDb250ZW50c0dyb3VwR2VuZXJhdG9yLFxuICAgIENzQ29udGVudEdyb3VwXG59IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL3NlcnZpY2VzL2NvbnRlbnQvdXRpbGl0aWVzL2NvbnRlbnQtZ3JvdXAtZ2VuZXJhdG9yJztcbmltcG9ydCB7Q291cnNlU2VydmljZX0gZnJvbSAnLi4vLi4vY291cnNlJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgUmVxdWVzdCwgU2VyaWFsaXplZFJlcXVlc3R9IGZyb20gJy4uLy4uL2FwaSc7XG5pbXBvcnQge0dldEVucm9sbGVkQ291cnNlUmVzcG9uc2V9IGZyb20gJy4uLy4uL2NvdXJzZS9kZWYvZ2V0LWVucm9sbGVkLWNvdXJzZS1yZXNwb25zZSc7XG5pbXBvcnQge0NzUmVzcG9uc2V9IGZyb20gJ0Bwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL2NvcmUvaHR0cC1zZXJ2aWNlJztcbmltcG9ydCB7T2JqZWN0VXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9vYmplY3QtdXRpbCc7XG5pbXBvcnQgKiBhcyBTSEExIGZyb20gJ2NyeXB0by1qcy9zaGExJztcbmltcG9ydCB7TmV0d29ya0luZm9TZXJ2aWNlLCBOZXR3b3JrU3RhdHVzfSBmcm9tICcuLi8uLi91dGlsL25ldHdvcmsnO1xuaW1wb3J0IHsgTWltZVR5cGVDYXRlZ29yeU1hcHBpbmcgfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9tb2RlbHMvY29udGVudCc7XG5cbnR5cGUgUHJpbWl0aXZlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcbnR5cGUgUmVxdWVzdEhhc2ggPSBzdHJpbmc7XG5pbnRlcmZhY2UgQWdncmVnYXRpb25UYXNrPFQgZXh0ZW5kcyBEYXRhU291cmNlVHlwZSA9IGFueT4ge1xuICAgIHJlcXVlc3RIYXNoOiBSZXF1ZXN0SGFzaDtcbiAgICB0YXNrOiBPYnNlcnZhYmxlPENvbnRlbnRBZ2dyZWdhdGlvbjxUPltdPjtcbn1cblxuaW50ZXJmYWNlIEFnZ3JlZ2F0aW9uQ29uZmlnIHtcbiAgICBmaWx0ZXJCeT86IHtcbiAgICAgICAgW2ZpZWxkIGluIGtleW9mIENvbnRlbnREYXRhXToge1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBhbnksXG4gICAgICAgICAgICB2YWx1ZTogYW55XG4gICAgICAgIH1cbiAgICB9W107XG4gICAgc29ydEJ5Pzoge1xuICAgICAgICBbZmllbGQgaW4ga2V5b2YgQ29udGVudERhdGFdOiAnYXNjJyB8ICdkZXNjJyB8IHsgb3JkZXI6ICdhc2MnIHwgJ2Rlc2MnLCBwcmVmZXJlbmNlOiBQcmltaXRpdmVbXSB9XG4gICAgfVtdO1xuICAgIGdyb3VwQnk/OiBrZXlvZiBDb250ZW50RGF0YTtcbiAgICBncm91cFNvcnRCeT86IHtcbiAgICAgICAgW2ZpZWxkIGluIGtleW9mIENzQ29udGVudEdyb3VwXTogJ2FzYycgfCAnZGVzYycgfCB7IG9yZGVyOiAnYXNjJyB8ICdkZXNjJywgcHJlZmVyZW5jZTogUHJpbWl0aXZlW10gfVxuICAgIH1bXTtcbiAgICBncm91cEZpbHRlckJ5Pzoge1xuICAgICAgICBbZmllbGQgaW4ga2V5b2YgQ3NDb250ZW50R3JvdXBdOiB7XG4gICAgICAgICAgICBvcGVyYXRpb246IGFueSxcbiAgICAgICAgICAgIHZhbHVlOiBhbnlcbiAgICAgICAgfVxuICAgIH1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhU291cmNlTW9kZWxNYXAge1xuICAgICdDT05URU5UUyc6IHtcbiAgICAgICAgdHlwZTogJ0NPTlRFTlRTJyxcbiAgICAgICAgdGFnPzogc3RyaW5nLFxuICAgICAgICByZXF1ZXN0OiBQYXJ0aWFsPFNlcmlhbGl6ZWRSZXF1ZXN0PixcbiAgICAgICAgbWFwcGluZzoge1xuICAgICAgICAgICAgYXBwbHlGaXJzdEF2YWlsYWJsZUNvbWJpbmF0aW9uPzogYm9vbGVhbixcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0aW9uQ29uZmlnXG4gICAgICAgIH1bXVxuICAgIH07XG4gICAgJ1RSQUNLQUJMRV9DT0xMRUNUSU9OUyc6IHtcbiAgICAgICAgdHlwZTogJ1RSQUNLQUJMRV9DT0xMRUNUSU9OUycsXG4gICAgICAgIHRhZz86IHN0cmluZyxcbiAgICAgICAgcmVxdWVzdDogUGFydGlhbDxTZXJpYWxpemVkUmVxdWVzdD4sXG4gICAgICAgIG1hcHBpbmc6IHtcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0aW9uQ29uZmlnXG4gICAgICAgIH1bXVxuICAgIH07XG4gICAgJ0NPTlRFTlRfRkFDRVRTJzoge1xuICAgICAgICB0eXBlOiAnQ09OVEVOVF9GQUNFVFMnLFxuICAgICAgICB0YWc/OiBzdHJpbmcsXG4gICAgICAgIHZhbHVlcz86IERhdGFSZXNwb25zZU1hcFsnQ09OVEVOVF9GQUNFVFMnXVxuICAgICAgICByZXF1ZXN0OiBQYXJ0aWFsPFNlcmlhbGl6ZWRSZXF1ZXN0PixcbiAgICAgICAgbWFwcGluZzoge1xuICAgICAgICAgICAgZmFjZXQ6IHN0cmluZyxcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZT86IEFnZ3JlZ2F0aW9uQ29uZmlnLFxuICAgICAgICAgICAgZmlsdGVyUGlsbEJ5Pzogc3RyaW5nXG4gICAgICAgIH1bXSxcbiAgICAgICAgcGFyYW1zPzogYW55XG4gICAgfTtcbiAgICAnUkVDRU5UTFlfVklFV0VEX0NPTlRFTlRTJzoge1xuICAgICAgICB0eXBlOiAnUkVDRU5UTFlfVklFV0VEX0NPTlRFTlRTJyxcbiAgICAgICAgdGFnPzogc3RyaW5nLFxuICAgICAgICBtYXBwaW5nOiB7XG4gICAgICAgICAgICBhZ2dyZWdhdGU/OiBBZ2dyZWdhdGlvbkNvbmZpZ1xuICAgICAgICB9W11cbiAgICB9O1xuICAgICdDT05URU5UX0RJU0NPVkVSWV9CQU5ORVInOiB7XG4gICAgICAgIHR5cGU6ICdDT05URU5UX0RJU0NPVkVSWV9CQU5ORVInLFxuICAgICAgICB0YWc/OiBzdHJpbmcsXG4gICAgICAgIHZhbHVlcz86IERhdGFSZXNwb25zZU1hcFsnQ09OVEVOVF9ESVNDT1ZFUllfQkFOTkVSJ11cbiAgICAgICAgbWFwcGluZzoge31bXVxuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YVJlc3BvbnNlTWFwIHtcbiAgICAnVFJBQ0tBQkxFX0NPTExFQ1RJT05TJzogQ29udGVudHNHcm91cGVkQnlQYWdlU2VjdGlvbjtcbiAgICAnQ09OVEVOVF9GQUNFVFMnOiB7XG4gICAgICAgIGZhY2V0OiBzdHJpbmc7XG4gICAgICAgIGluZGV4PzogbnVtYmVyO1xuICAgICAgICBzZWFyY2hDcml0ZXJpYTogQ29udGVudFNlYXJjaENyaXRlcmlhO1xuICAgICAgICBwcmltYXJ5RmFjZXRGaWx0ZXJzPzogYW55O1xuICAgICAgICBhZ2dyZWdhdGU/OiBBZ2dyZWdhdGlvbkNvbmZpZ1xuICAgIH1bXTtcbiAgICAnUkVDRU5UTFlfVklFV0VEX0NPTlRFTlRTJzogQ29udGVudHNHcm91cGVkQnlQYWdlU2VjdGlvbjtcbiAgICAnQ09OVEVOVFMnOiBDb250ZW50c0dyb3VwZWRCeVBhZ2VTZWN0aW9uO1xuICAgICdDT05URU5UX0RJU0NPVkVSWV9CQU5ORVInOiB7XG4gICAgICAgIGNvZGU6IHN0cmluZztcbiAgICAgICAgdWk6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHN0cmluZztcbiAgICAgICAgICAgIHRleHQ6IHN0cmluZztcbiAgICAgICAgfTtcbiAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgICAgICBzdWJUeXBlOiBzdHJpbmc7XG4gICAgICAgICAgICBwYXJhbXM6IGFueTtcbiAgICAgICAgfTtcbiAgICAgICAgZXhwaXJ5OiBzdHJpbmc7XG4gICAgfVtdO1xufVxuXG5leHBvcnQgdHlwZSBEYXRhU291cmNlVHlwZSA9IGtleW9mIERhdGFTb3VyY2VNb2RlbE1hcDtcblxuZXhwb3J0IGludGVyZmFjZSBBZ2dyZWdhdG9yQ29uZmlnRmllbGQ8VCBleHRlbmRzIERhdGFTb3VyY2VUeXBlID0gYW55PiB7XG4gICAgZGF0YVNyYzogRGF0YVNvdXJjZU1vZGVsTWFwW1RdO1xuICAgIHNlY3Rpb25zOiB7XG4gICAgICAgIGluZGV4OiBudW1iZXI7XG4gICAgICAgIGNvZGU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgICAgIHRoZW1lOiBhbnk7XG4gICAgICAgIGlzRW5hYmxlZDogYm9vbGVhbjtcbiAgICAgICAgbGFuZGluZ0RldGFpbHM/IDoge1xuICAgICAgICAgICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICAgICAgfVxuICAgIH1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250ZW50QWdncmVnYXRpb248VCBleHRlbmRzIERhdGFTb3VyY2VUeXBlID0gYW55PiB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGxhbmRpbmdEZXRhaWxzPyA6IHtcbiAgICAgICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIH1cbiAgICBkYXRhOiBEYXRhUmVzcG9uc2VNYXBbVF07XG4gICAgZGF0YVNyYzogRGF0YVNvdXJjZU1vZGVsTWFwW1RdO1xuICAgIHRoZW1lOiBhbnk7XG4gICAgbWV0YT86IHtcbiAgICAgICAgZmlsdGVyQ3JpdGVyaWE/OiBDb250ZW50U2VhcmNoQ3JpdGVyaWE7XG4gICAgICAgIHNlYXJjaFJlcXVlc3Q/OiBTZWFyY2hSZXF1ZXN0O1xuICAgICAgICBzZWFyY2hDcml0ZXJpYT86IENvbnRlbnRTZWFyY2hDcml0ZXJpYTtcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udGVudEFnZ3JlZ2F0b3Ige1xuICAgIHByaXZhdGUgc3RhdGljIHNlYXJjaENvbnRlbnRDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBDc1Jlc3BvbnNlPFNlYXJjaFJlc3BvbnNlPj4oKTtcbiAgICBwcml2YXRlIHN0YXRpYyBDT05URU5UX0FHR1JFR0FUSU9OX0tFWSA9ICdjb250ZW50LWFnZ3JlZ2F0aW9uJztcblxuICAgIHByaXZhdGUgc3RhdGljIGJ1aWxkUmVxdWVzdEhhc2gocmVxdWVzdDogYW55KSB7XG4gICAgICAgIHJldHVybiBTSEExKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0VXRpbC53aXRoRGVlcGx5T3JkZXJlZEtleXMocmVxdWVzdCkpXG4gICAgICAgICkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hDb250ZW50SGFuZGxlcjogU2VhcmNoQ29udGVudEhhbmRsZXIsXG4gICAgICAgIHByaXZhdGUgZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNvbnRlbnRTZXJ2aWNlOiBDb250ZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjYWNoZWRJdGVtU3RvcmU6IENhY2hlZEl0ZW1TdG9yZSxcbiAgICAgICAgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5ldHdvcmtJbmZvU2VydmljZTogTmV0d29ya0luZm9TZXJ2aWNlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgYWdncmVnYXRlKFxuICAgICAgICByZXF1ZXN0OiBDb250ZW50QWdncmVnYXRvclJlcXVlc3QsXG4gICAgICAgIGV4Y2x1ZGVEYXRhU3JjOiBEYXRhU291cmNlVHlwZVtdLFxuICAgICAgICBmb3JtUmVxdWVzdD86IEZvcm1SZXF1ZXN0LFxuICAgICAgICBmb3JtRmllbGRzPzogQWdncmVnYXRvckNvbmZpZ0ZpZWxkW10sXG4gICAgICAgIGNhY2hlYWJsZSA9IGZhbHNlXG4gICAgKTogT2JzZXJ2YWJsZTxDb250ZW50QWdncmVnYXRvclJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZvcm1SZXF1ZXN0ICYmICFmb3JtRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtUmVxdWVzdCBvciBmb3JtRmllbGRzIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmaWVsZHM6IEFnZ3JlZ2F0b3JDb25maWdGaWVsZFtdID0gW107XG4gICAgICAgICAgICBpZiAoZm9ybVJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBmb3JtUmVxdWVzdC5mcm9tID0gcmVxdWVzdC5mcm9tO1xuICAgICAgICAgICAgICAgIGZpZWxkcyA9IGF3YWl0IHRoaXMuZm9ybVNlcnZpY2UuZ2V0Rm9ybShcbiAgICAgICAgICAgICAgICAgICAgZm9ybVJlcXVlc3RcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpLnRoZW4oKHIpID0+IHIuZm9ybS5kYXRhLmZpZWxkcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBmaWVsZHMgPSBmb3JtRmllbGRzO1xuICAgICAgICAgICAgICAgIGNhY2hlYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWVsZHMgPSBmaWVsZHNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChmaWVsZCkgPT4gZXhjbHVkZURhdGFTcmMuaW5kZXhPZihmaWVsZC5kYXRhU3JjLnR5cGUpID09PSAtMSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVGFza3M6IFByb21pc2U8QWdncmVnYXRpb25UYXNrPltdID0gZmllbGRzLm1hcChhc3luYyAoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmRhdGFTcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJTlZBTElEX0NPTkZJRycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZmllbGQuZGF0YVNyYy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NPTlRFTlRfRkFDRVRTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmJ1aWxkRmFjZXRzVGFzayhmaWVsZCwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1JFQ0VOVExZX1ZJRVdFRF9DT05URU5UUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5idWlsZFJlY2VudGx5Vmlld2VkVGFzayhmaWVsZCwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NPTlRFTlRTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmJ1aWxkQ29udGVudFNlYXJjaFRhc2soZmllbGQsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUUkFDS0FCTEVfQ09MTEVDVElPTlMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYnVpbGRUcmFja2FibGVDb2xsZWN0aW9uc1Rhc2soZmllbGQsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDT05URU5UX0RJU0NPVkVSWV9CQU5ORVInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuYnVpbGRDb250ZW50RGlzY292ZXJ5QmFubmVyVGFzayhmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VOS05PV05fREFUQV9TUkMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJlcXVlc3RIYXNoOiAnJywgdGFzazogb2YoW10pIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgYnVpbHRUYXNrcyA9IGF3YWl0IFByb21pc2UuYWxsKGZpZWxkVGFza3MpO1xuXG4gICAgICAgICAgICBjb25zdCBjb21iaW5lZEhhc2ggPSBidWlsdFRhc2tzLm1hcChiID0+IGIucmVxdWVzdEhhc2gpLmpvaW4oJy0nKTtcblxuICAgICAgICAgICAgY29uc3QgY29tYmluZWRUYXNrcyA9IGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXR3b3JrU3RhdHVzID0gYXdhaXQgdGhpcy5uZXR3b3JrSW5mb1NlcnZpY2UubmV0d29ya1N0YXR1cyQucGlwZShcbiAgICAgICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVhYmxlICYmIG5ldHdvcmtTdGF0dXMgPT09IE5ldHdvcmtTdGF0dXMuT0ZGTElORSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnRBZ2dyZWdhdG9yOiBvZmZsaW5lIHJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgICAgIGJ1aWx0VGFza3MubWFwKChiKSA9PiBiLnRhc2sudG9Qcm9taXNlKCkpXG4gICAgICAgICAgICAgICAgKS50aGVuKChyZXN1bHQ6IENvbnRlbnRBZ2dyZWdhdGlvbltdW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZTxDb250ZW50QWdncmVnYXRpb25bXT4oKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCAuLi52XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXI8T2JzZXJ2YWJsZTxDb250ZW50QWdncmVnYXRpb25bXT4+KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEl0ZW1TdG9yZS5nZXQ8Q29udGVudEFnZ3JlZ2F0aW9uW10+KFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRIYXNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudEFnZ3JlZ2F0b3IuQ09OVEVOVF9BR0dSRUdBVElPTl9LRVksXG4gICAgICAgICAgICAgICAgICAgICAgICAndHRsXycgKyBDb250ZW50QWdncmVnYXRvci5DT05URU5UX0FHR1JFR0FUSU9OX0tFWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGNvbWJpbmVkVGFza3NcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tYmluZWRUYXNrcztcbiAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+ICh7IHJlc3VsdCB9KSlcbiAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgYnVpbGRSZWNlbnRseVZpZXdlZFRhc2soXG4gICAgICAgIGZpZWxkOiBBZ2dyZWdhdG9yQ29uZmlnRmllbGQ8J1JFQ0VOVExZX1ZJRVdFRF9DT05URU5UUyc+LFxuICAgICAgICByZXF1ZXN0OiBDb250ZW50QWdncmVnYXRvclJlcXVlc3RcbiAgICApOiBQcm9taXNlPEFnZ3JlZ2F0aW9uVGFzazwnUkVDRU5UTFlfVklFV0VEX0NPTlRFTlRTJz4+IHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS50b1Byb21pc2UoKTtcblxuICAgICAgICBjb25zdCByZXF1ZXN0UGFyYW1zOiBDb250ZW50UmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHVpZDogc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogc2Vzc2lvbi51aWQsXG4gICAgICAgICAgICBwcmltYXJ5Q2F0ZWdvcmllczogW10sXG4gICAgICAgICAgICByZWNlbnRseVZpZXdlZDogdHJ1ZSxcbiAgICAgICAgICAgIGxpbWl0OiAyMFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0SGFzaDogJ1JFQ0VOVExZX1ZJRVdFRF9DT05URU5UU18nICsgQ29udGVudEFnZ3JlZ2F0b3IuYnVpbGRSZXF1ZXN0SGFzaChyZXF1ZXN0UGFyYW1zKSxcbiAgICAgICAgICAgIHRhc2s6IGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50cyA9IGF3YWl0IHRoaXMuY29udGVudFNlcnZpY2UuZ2V0Q29udGVudHMocmVxdWVzdFBhcmFtcykudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuc2VjdGlvbnMubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc2VjdGlvbi5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzZWN0aW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNlY3Rpb24uaW5kZXggKyAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZWN0aW9uLmluZGV4ICsgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY29udGVudHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IGNvbnRlbnRzLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmNvbnRlbnREYXRhWydjYXJkSW1nJ10gPSBjLmNvbnRlbnREYXRhLmFwcEljb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTcmM6IGZpZWxkLmRhdGFTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogc2VjdGlvbi50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzZWN0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZGluZ0RldGFpbHM6IHNlY3Rpb24ubGFuZGluZ0RldGFpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6IHNlY3Rpb24uaXNFbmFibGVkXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgQ29udGVudEFnZ3JlZ2F0aW9uPCdSRUNFTlRMWV9WSUVXRURfQ09OVEVOVFMnPjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBidWlsZENvbnRlbnREaXNjb3ZlcnlCYW5uZXJUYXNrKFxuICAgICAgZmllbGQ6IEFnZ3JlZ2F0b3JDb25maWdGaWVsZDwnQ09OVEVOVF9ESVNDT1ZFUllfQkFOTkVSJz4sXG4gICAgKTogUHJvbWlzZTxBZ2dyZWdhdGlvblRhc2s8J0NPTlRFTlRfRElTQ09WRVJZX0JBTk5FUic+PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0SGFzaDogJ0NPTlRFTlRfRElTQ09WRVJZX0JBTk5FUicgKyBDb250ZW50QWdncmVnYXRvci5idWlsZFJlcXVlc3RIYXNoKGZpZWxkLmRhdGFTcmMudHlwZSksXG4gICAgICAgICAgICB0YXNrOiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnNlY3Rpb25zLm1hcCgoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHNlY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBzZWN0aW9uLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2VjdGlvbi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZpZWxkLmRhdGFTcmMudmFsdWVzIS5maWx0ZXIoKHZhbHVlKSA9PiBOdW1iZXIodmFsdWUuZXhwaXJ5KSA+IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTcmM6IGZpZWxkLmRhdGFTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogc2VjdGlvbi50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzZWN0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZGluZ0RldGFpbHM6IHNlY3Rpb24ubGFuZGluZ0RldGFpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6IHNlY3Rpb24uaXNFbmFibGVkXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgQ29udGVudEFnZ3JlZ2F0aW9uPCdDT05URU5UX0RJU0NPVkVSWV9CQU5ORVInPjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBidWlsZEZhY2V0c1Rhc2soXG4gICAgICAgIGZpZWxkOiBBZ2dyZWdhdG9yQ29uZmlnRmllbGQ8J0NPTlRFTlRfRkFDRVRTJz4sXG4gICAgICAgIHJlcXVlc3Q6IENvbnRlbnRBZ2dyZWdhdG9yUmVxdWVzdFxuICAgICk6IFByb21pc2U8QWdncmVnYXRpb25UYXNrPCdDT05URU5UX0ZBQ0VUUyc+PiB7XG4gICAgICAgIGlmIChmaWVsZC5kYXRhU3JjLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGFzaDogJycsXG4gICAgICAgICAgICAgICAgdGFzazogZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuc2VjdGlvbnMubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzZWN0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHNlY3Rpb24uY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2VjdGlvbi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBmaWVsZC5kYXRhU3JjLnZhbHVlcyEuc29ydCgoYSwgYikgPT4gYS5pbmRleCEgLSBiLmluZGV4ISksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNyYzogZmllbGQuZGF0YVNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogc2VjdGlvbi50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc2VjdGlvbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5kaW5nRGV0YWlsczogc2VjdGlvbi5sYW5kaW5nRGV0YWlscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6IHNlY3Rpb24uaXNFbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgc2VhcmNoUmVxdWVzdCwgc2VhcmNoQ3JpdGVyaWEgfSA9IHRoaXMuYnVpbGRTZWFyY2hSZXF1ZXN0QW5kQ3JpdGVyaWEoZmllbGQsIHJlcXVlc3QpO1xuXG4gICAgICAgIHNlYXJjaENyaXRlcmlhLmZhY2V0cyA9IGZpZWxkLmRhdGFTcmMubWFwcGluZy5tYXAoKG0pID0+IG0uZmFjZXQpO1xuICAgICAgICBzZWFyY2hSZXF1ZXN0LmZhY2V0cyA9IHNlYXJjaENyaXRlcmlhLmZhY2V0cztcbiAgICAgICAgc2VhcmNoUmVxdWVzdC5saW1pdCA9IDA7XG4gICAgICAgIHNlYXJjaFJlcXVlc3Qub2Zmc2V0ID0gMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVxdWVzdEhhc2g6ICdDT05URU5UX0ZBQ0VUU18nICsgQ29udGVudEFnZ3JlZ2F0b3IuYnVpbGRSZXF1ZXN0SGFzaChzZWFyY2hSZXF1ZXN0KSxcbiAgICAgICAgICAgIHRhc2s6IGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBhd2FpdCB0aGlzLnNlYXJjaENvbnRlbnRzKGZpZWxkLCBzZWFyY2hDcml0ZXJpYSwgc2VhcmNoUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnNlY3Rpb25zLm1hcCgoc2VjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXJjaEZhY2V0RmlsdGVycyA9IHNlYXJjaFJlc3VsdC5maWx0ZXJDcml0ZXJpYS5mYWNldEZpbHRlcnMgPz8gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvQmVEZWxldGVkRmFjZXRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hGYWNldEZpbHRlcnMubWFwKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENvbmZpZyA9IChmaWVsZC5kYXRhU3JjLnBhcmFtcz8uY29uZmlnPy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5uYW1lID09PSB4Lm5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWNldENvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0Q29uZmlnLm1lcmdlYWJsZUF0dHJpYnV0ZXMubWFwKChhdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9CZURlbGV0ZWRGYWNldHMucHVzaChhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXJnZWFibGVGYWNldHMgPSBzZWFyY2hGYWNldEZpbHRlcnMuZmluZChmYWNldCA9PiBmYWNldC5uYW1lID09PSBhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4LnZhbHVlcyA9IHgudmFsdWVzLmZpbHRlcih5ID0+ICBmYWNldENvbmZpZy52YWx1ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kKHogPT4gKHouY29kZSA9PT0geS5uYW1lLnJlcGxhY2UoL1xccysvZywgJycpLnRvTG93ZXJDYXNlKCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ0ZhY2V0cyA9IGZhY2V0Q29uZmlnLnZhbHVlcy5maWx0ZXIoY29uZmlnRmFjZXQgPT4gY29uZmlnRmFjZXQudHlwZSA9IGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXJnZWFibGVGYWNldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlYWJsZUZhY2V0cyEhLnZhbHVlcyA9IG1lcmdlYWJsZUZhY2V0cyEhLnZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcih5ID0+IGNvbmZpZ0ZhY2V0cy5maW5kKHogPT4gKHouY29kZSA9PT0geS5uYW1lLnJlcGxhY2UoL1xccysvZywgJycpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4LnZhbHVlcyA9IHgudmFsdWVzLmNvbmNhdChtZXJnZWFibGVGYWNldHMhIS52YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hGYWNldEZpbHRlcnMgPSBzZWFyY2hGYWNldEZpbHRlcnMuZmlsdGVyKHggPT4gdG9CZURlbGV0ZWRGYWNldHMuaW5kZXhPZih4Lm5hbWUpID09PSAtMSApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldEZpbHRlcnMgPSBzZWFyY2hGYWNldEZpbHRlcnMuZmluZCgoeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHgubmFtZSA9PT0gZmllbGQuZGF0YVNyYy5tYXBwaW5nW2luZGV4XT8uZmFjZXRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjZXRGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENvbmZpZyA9IGZpZWxkLmRhdGFTcmMucGFyYW1zPy5jb25maWc/LmZpbmQoeCA9PiB4Lm5hbWUgPT09IGZhY2V0RmlsdGVycy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHNlY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHNlY3Rpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogc2VjdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZhY2V0RmlsdGVycy52YWx1ZXMubWFwKChmaWx0ZXJWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENhdGVnb3J5Q29uZmlnID0gZmFjZXRDb25maWcgPyBmYWNldENvbmZpZy52YWx1ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmQoeCA9PiB4LmNvZGUgPT09IGZpbHRlclZhbHVlLm5hbWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2UoL1xccysvZywgJycpLnRvTG93ZXJDYXNlKCkpIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldDogZmFjZXRDYXRlZ29yeUNvbmZpZz8ubmFtZSA/IGZhY2V0Q2F0ZWdvcnlDb25maWcubmFtZSA6IGZpbHRlclZhbHVlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hDcml0ZXJpYToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnNlYXJjaENyaXRlcmlhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDYXRlZ29yaWVzOiAgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wbGllZEZpbHRlcnM6IGZhY2V0Q2F0ZWdvcnlDb25maWc/LnNlYXJjaENyaXRlcmlhPy5pbXBsaWVkRmlsdGVycyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldENhdGVnb3J5Q29uZmlnLnNlYXJjaENyaXRlcmlhLmltcGxpZWRGaWx0ZXJzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt7bmFtZTogZmFjZXRGaWx0ZXJzLm5hbWUsIHZhbHVlczogW3tuYW1lOiBmaWx0ZXJWYWx1ZS5uYW1lLCBhcHBseTogdHJ1ZX1dfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbZmFjZXRGaWx0ZXJzLm5hbWVdOiBbZmlsdGVyVmFsdWUubmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IGZpZWxkLmRhdGFTcmMubWFwcGluZ1tpbmRleF0uYWdncmVnYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGlsbEJ5OiBmaWVsZC5kYXRhU3JjLm1hcHBpbmdbaW5kZXhdLmZpbHRlclBpbGxCeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXNlclByZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldFByZWZlcmVuY2VzID0gcmVxdWVzdC51c2VyUHJlZmVyZW5jZXNbZmFjZXRGaWx0ZXJzLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFmYWNldFByZWZlcmVuY2VzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGZhY2V0UHJlZmVyZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0UHJlZmVyZW5jZXMuaW5kZXhPZihhLmZhY2V0KSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0UHJlZmVyZW5jZXMuaW5kZXhPZihiLmZhY2V0KSA+IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXRQcmVmZXJlbmNlcyA9PT0gYS5mYWNldCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldFByZWZlcmVuY2VzID09PSBiLmZhY2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuZmFjZXQubG9jYWxlQ29tcGFyZShiLmZhY2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZmFjZXRQcmVmZXJlbmNlcykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXRQcmVmZXJlbmNlcy5pbmRleE9mKGEuZmFjZXQpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldFByZWZlcmVuY2VzID09PSBhLmZhY2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShmYWNldFByZWZlcmVuY2VzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNldFByZWZlcmVuY2VzLmluZGV4T2YoYi5mYWNldCkgPiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0UHJlZmVyZW5jZXMgPT09IGIuZmFjZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5mYWNldC5sb2NhbGVDb21wYXJlKGIuZmFjZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTcmM6IGZpZWxkLmRhdGFTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlY3Rpb24udGhlbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNlY3Rpb24uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZGluZ0RldGFpbHM6IHNlY3Rpb24ubGFuZGluZ0RldGFpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiBzZWN0aW9uLmlzRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHNlY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHNlY3Rpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogc2VjdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTcmM6IGZpZWxkLmRhdGFTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlY3Rpb24udGhlbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNlY3Rpb24uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiBzZWN0aW9uLmlzRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGJ1aWxkVHJhY2thYmxlQ29sbGVjdGlvbnNUYXNrKFxuICAgICAgICBmaWVsZDogQWdncmVnYXRvckNvbmZpZ0ZpZWxkPCdUUkFDS0FCTEVfQ09MTEVDVElPTlMnPixcbiAgICAgICAgcmVxdWVzdDogQ29udGVudEFnZ3JlZ2F0b3JSZXF1ZXN0LFxuICAgICk6IFByb21pc2U8QWdncmVnYXRpb25UYXNrPCdUUkFDS0FCTEVfQ09MTEVDVElPTlMnPj4ge1xuICAgICAgICBjb25zdCBhcGlTZXJ2aWNlID0gdGhpcy5hcGlTZXJ2aWNlO1xuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0SGFzaDogJ1RSQUNLQUJMRV9DT0xMRUNUSU9OU18nICsgQ29udGVudEFnZ3JlZ2F0b3IuYnVpbGRSZXF1ZXN0SGFzaCh7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbi51aWQgOiBzZXNzaW9uLnVpZFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXNrOiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY291cnNlcyA9IGF3YWl0IHRoaXMuY291cnNlU2VydmljZS5nZXRFbnJvbGxlZENvdXJzZXMoe1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHNlc3Npb24ubWFuYWdlZFNlc3Npb24gPyBzZXNzaW9uLm1hbmFnZWRTZXNzaW9uLnVpZCA6IHNlc3Npb24udWlkLFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5GcmVzaENvdXJzZXM6IHRydWVcbiAgICAgICAgICAgICAgICB9LCBuZXcgY2xhc3MgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjx7IHVzZXJJZDogc3RyaW5nIH0sIEdldEVucm9sbGVkQ291cnNlUmVzcG9uc2U+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlKHsgdXNlcklkIH06IHsgdXNlcklkOiBzdHJpbmcgfSk6IE9ic2VydmFibGU8R2V0RW5yb2xsZWRDb3Vyc2VSZXNwb25zZT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmRhdGFTcmMucmVxdWVzdC5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZGF0YVNyYy5yZXF1ZXN0LnBhdGggPSBmaWVsZC5kYXRhU3JjLnJlcXVlc3QucGF0aC5yZXBsYWNlKCcke3VzZXJJZH0nLCB1c2VySWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBpUmVxdWVzdCA9IFJlcXVlc3QuZnJvbUpTT04oZmllbGQuZGF0YVNyYy5yZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLmZldGNoPEdldEVucm9sbGVkQ291cnNlUmVzcG9uc2U+KGFwaVJlcXVlc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzcG9uc2UuYm9keS5yZXN1bHQuY291cnNlcy5zb3J0KChhLCBiKSA9PiAoYS5lbnJvbGxlZERhdGUhID4gYi5lbnJvbGxlZERhdGUhID8gLTEgOiAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuc2VjdGlvbnMubWFwKChzZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmRhdGFTcmMubWFwcGluZ1tpbmRleF0gfHwgIWZpZWxkLmRhdGFTcmMubWFwcGluZ1tpbmRleF0uYWdncmVnYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzZWN0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzZWN0aW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogc2VjdGlvbi5pbmRleCArICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNlY3Rpb24uaW5kZXggKyAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY291cnNlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IGNvdXJzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNyYzogZmllbGQuZGF0YVNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogc2VjdGlvbi50aGVtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc2VjdGlvbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5kaW5nRGV0YWlsczogc2VjdGlvbi5sYW5kaW5nRGV0YWlscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6IHNlY3Rpb24uaXNFbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWdncmVnYXRlID0gZmllbGQuZGF0YVNyYy5tYXBwaW5nW2luZGV4XS5hZ2dyZWdhdGUhO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc2VjdGlvbi5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2VjdGlvbi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBDc0NvbnRlbnRzR3JvdXBHZW5lcmF0b3IuZ2VuZXJhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50czogY291cnNlcyBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQnk6IGFnZ3JlZ2F0ZS5ncm91cEJ5ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydEJ5OiBhZ2dyZWdhdGUuc29ydEJ5ID8gdGhpcy5idWlsZFNvcnRCeUNyaXRlcmlhKGFnZ3JlZ2F0ZS5zb3J0QnkpIDogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckJ5OiBhZ2dyZWdhdGUuZmlsdGVyQnkgPyB0aGlzLmJ1aWxkRmlsdGVyQnlDcml0ZXJpYShhZ2dyZWdhdGUuZmlsdGVyQnkpIDogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU29ydEJ5OiBhZ2dyZWdhdGUuZ3JvdXBTb3J0QnkgPyB0aGlzLmJ1aWxkU29ydEJ5Q3JpdGVyaWEoYWdncmVnYXRlLmdyb3VwU29ydEJ5KSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEZpbHRlckJ5OiBhZ2dyZWdhdGUuZ3JvdXBGaWx0ZXJCeSA/IHRoaXMuYnVpbGRGaWx0ZXJCeUNyaXRlcmlhKGFnZ3JlZ2F0ZS5ncm91cEZpbHRlckJ5KSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlU2VhcmNoYWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU3JjOiBmaWVsZC5kYXRhU3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBzZWN0aW9uLnRoZW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzZWN0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmRpbmdEZXRhaWxzOiBzZWN0aW9uLmxhbmRpbmdEZXRhaWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogc2VjdGlvbi5pc0VuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgQ29udGVudEFnZ3JlZ2F0aW9uPCdUUkFDS0FCTEVfQ09MTEVDVElPTlMnPjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGJ1aWxkQ29udGVudFNlYXJjaFRhc2soXG4gICAgICAgIGZpZWxkOiBBZ2dyZWdhdG9yQ29uZmlnRmllbGQ8J0NPTlRFTlRTJz4sXG4gICAgICAgIHJlcXVlc3Q6IENvbnRlbnRBZ2dyZWdhdG9yUmVxdWVzdFxuICAgICk6IFByb21pc2U8QWdncmVnYXRpb25UYXNrPCdDT05URU5UUyc+PiB7XG4gICAgICAgIGNvbnN0IHsgc2VhcmNoUmVxdWVzdCwgc2VhcmNoQ3JpdGVyaWEgfSA9IHRoaXMuYnVpbGRTZWFyY2hSZXF1ZXN0QW5kQ3JpdGVyaWEoZmllbGQsIHJlcXVlc3QpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0SGFzaDogJ0NPTlRFTlRTXycgKyBDb250ZW50QWdncmVnYXRvci5idWlsZFJlcXVlc3RIYXNoKHNlYXJjaFJlcXVlc3QpLFxuICAgICAgICAgICAgdGFzazogZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZmxpbmVTZWFyY2hDb250ZW50RGF0YUxpc3Q6IENvbnRlbnREYXRhW10gPSBhd2FpdCAoLyogZmV0Y2ggb2ZmbGluZSBjb250ZW50cyAqLyBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2VhcmNoUmVxdWVzdC5maWx0ZXJzICYmIHNlYXJjaFJlcXVlc3QuZmlsdGVycy5wcmltYXJ5Q2F0ZWdvcnkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VhcmNoQ3JpdGVyaWEucHJpbWFyeUNhdGVnb3JpZXMgJiYgc2VhcmNoQ3JpdGVyaWEucHJpbWFyeUNhdGVnb3JpZXMubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRTZXJ2aWNlLmdldENvbnRlbnRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlDYXRlZ29yaWVzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzZWFyY2hDcml0ZXJpYS5wcmltYXJ5Q2F0ZWdvcmllcyAmJiBzZWFyY2hDcml0ZXJpYS5wcmltYXJ5Q2F0ZWdvcmllcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgc2VhcmNoQ3JpdGVyaWEucHJpbWFyeUNhdGVnb3JpZXMpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlYXJjaFJlcXVlc3QuZmlsdGVycyAmJiBzZWFyY2hSZXF1ZXN0LmZpbHRlcnMucHJpbWFyeUNhdGVnb3J5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmQ6IHNlYXJjaENyaXRlcmlhLmJvYXJkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaXVtOiBzZWFyY2hDcml0ZXJpYS5tZWRpdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogc2VhcmNoQ3JpdGVyaWEuZ3JhZGVcbiAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoY29udGVudHM6IENvbnRlbnRbXSkgPT4gY29udGVudHMubWFwKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY29udGVudERhdGEuYXBwSWNvbiAmJiAhY29udGVudC5jb250ZW50RGF0YS5hcHBJY29uLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jb250ZW50RGF0YS5hcHBJY29uID0gY29udGVudC5iYXNlUGF0aCArIGNvbnRlbnQuY29udGVudERhdGEuYXBwSWNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuY29udGVudERhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb25saW5lQ29udGVudHNSZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VhcmNoQ29udGVudHMoZmllbGQsIHNlYXJjaENyaXRlcmlhLCBzZWFyY2hSZXF1ZXN0KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9ubGluZVNlYXJjaENvbnRlbnREYXRhTGlzdDogQ29udGVudERhdGFbXSA9IChcbiAgICAgICAgICAgICAgICAgICAgb25saW5lQ29udGVudHNSZXNwb25zZS5jb250ZW50RGF0YUxpc3QgYXMgQ29udGVudERhdGFbXSB8fCBbXVxuICAgICAgICAgICAgICAgICkuZmlsdGVyKChjb250ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW9mZmxpbmVTZWFyY2hDb250ZW50RGF0YUxpc3QuZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgIChsb2NhbENvbnRlbnREYXRhKSA9PiBsb2NhbENvbnRlbnREYXRhLmlkZW50aWZpZXIgPT09IGNvbnRlbnREYXRhLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkQ29udGVudHM6IENvbnRlbnREYXRhW10gPSBvZmZsaW5lU2VhcmNoQ29udGVudERhdGFMaXN0LmNvbmNhdChvbmxpbmVTZWFyY2hDb250ZW50RGF0YUxpc3QpLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY1snY2FyZEltZyddID0gYy5hcHBJY29uO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb21iaW5lZENvbnRlbnRzLnNvcnQoKGEsIGIpID0+IChhLmxhc3RQdWJsaXNoZWRPbiEgPiBiLmxhc3RQdWJsaXNoZWRPbiEgPyAtMSA6IDEpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC5zZWN0aW9ucy5tYXAoKHNlY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmllbGQuZGF0YVNyYy5tYXBwaW5nW2luZGV4XSB8fCAhZmllbGQuZGF0YVNyYy5tYXBwaW5nW2luZGV4XS5hZ2dyZWdhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHNlY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHNlY3Rpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hDcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWE6IG9ubGluZUNvbnRlbnRzUmVzcG9uc2UuZmlsdGVyQ3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogc2VjdGlvbi5pbmRleCArICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBjb21iaW5lZENvbnRlbnRzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50czogY29tYmluZWRDb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU3JjOiBmaWVsZC5kYXRhU3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBzZWN0aW9uLnRoZW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzZWN0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmRpbmdEZXRhaWxzOiBzZWN0aW9uLmxhbmRpbmdEZXRhaWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogc2VjdGlvbi5pc0VuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgQ29udGVudEFnZ3JlZ2F0aW9uPCdDT05URU5UUyc+O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWdncmVnYXRlID0gZmllbGQuZGF0YVNyYy5tYXBwaW5nW2luZGV4XS5hZ2dyZWdhdGUhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IENzQ29udGVudHNHcm91cEdlbmVyYXRvci5nZW5lcmF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBjb21iaW5lZENvbnRlbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEJ5OiBhZ2dyZWdhdGUuZ3JvdXBCeSEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRCeTogYWdncmVnYXRlLnNvcnRCeSA/IHRoaXMuYnVpbGRTb3J0QnlDcml0ZXJpYShhZ2dyZWdhdGUuc29ydEJ5KSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJCeTogYWdncmVnYXRlLmZpbHRlckJ5ID8gdGhpcy5idWlsZEZpbHRlckJ5Q3JpdGVyaWEoYWdncmVnYXRlLmZpbHRlckJ5KSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cFNvcnRCeTogYWdncmVnYXRlLmdyb3VwU29ydEJ5ID8gdGhpcy5idWlsZFNvcnRCeUNyaXRlcmlhKGFnZ3JlZ2F0ZS5ncm91cFNvcnRCeSkgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBGaWx0ZXJCeTogYWdncmVnYXRlLmdyb3VwRmlsdGVyQnkgPyB0aGlzLmJ1aWxkRmlsdGVyQnlDcml0ZXJpYShhZ2dyZWdhdGUuZ3JvdXBGaWx0ZXJCeSkgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluYXRpb246IGZpZWxkLmRhdGFTcmMubWFwcGluZ1tpbmRleF0uYXBwbHlGaXJzdEF2YWlsYWJsZUNvbWJpbmF0aW9uICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFwcGx5Rmlyc3RBdmFpbGFibGVDb21iaW5hdGlvbiBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGVTZWFyY2hhYmxlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVzZXJQcmVmZXJlbmNlcyAmJiByZXF1ZXN0LnVzZXJQcmVmZXJlbmNlc1thZ2dyZWdhdGUuZ3JvdXBCeSFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuc2VjdGlvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QudXNlclByZWZlcmVuY2VzIVthZ2dyZWdhdGUuZ3JvdXBCeSFdIS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mKGEubmFtZSEucmVwbGFjZSgvW15BLVowLTldL2lnLCAnJykhLnRvTG9jYWxlTG93ZXJDYXNlKCkhKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC51c2VyUHJlZmVyZW5jZXMhW2FnZ3JlZ2F0ZS5ncm91cEJ5IV0hLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2YoYi5uYW1lIS5yZXBsYWNlKC9bXkEtWjAtOV0vaWcsICcnKSEudG9Mb2NhbGVMb3dlckNhc2UoKSkgPiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhLm5hbWUhLmxvY2FsZUNvbXBhcmUoYi5uYW1lISk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVzZXJQcmVmZXJlbmNlcyFbYWdncmVnYXRlLmdyb3VwQnkhXSEuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZihhLm5hbWUhLnJlcGxhY2UoL1teQS1aMC05XS9pZywgJycpIS50b0xvY2FsZUxvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51c2VyUHJlZmVyZW5jZXMhW2FnZ3JlZ2F0ZS5ncm91cEJ5IV0hLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2YoYi5uYW1lIS5yZXBsYWNlKC9bXkEtWjAtOV0vaWcsICcnKSEudG9Mb2NhbGVMb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZhY2V0RGV0ID0gb25saW5lQ29udGVudHNSZXNwb25zZS5maWx0ZXJDcml0ZXJpYS5mYWNldEZpbHRlcnMgfHwgW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXREZXQubWFwKChmYWNldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZhY2V0VmFsID0gKGZhY2V0Lm5hbWUgPT0gZC5uYW1lKSA/IGZhY2V0LnZhbHVlcyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VjdGlvbnMuZmlsdGVyKChvMSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWNldFZhbC5zb21lKChvMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG8xLm5hbWUpIS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAobzIubmFtZSkhLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8xLnRvdGFsQ291bnQgPSBvMi5jb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbzEubmFtZSA9PT0gbzIubmFtZTsgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzZWN0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBzZWN0aW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckNyaXRlcmlhOiBvbmxpbmVDb250ZW50c1Jlc3BvbnNlLmZpbHRlckNyaXRlcmlhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTcmM6IGZpZWxkLmRhdGFTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlY3Rpb24udGhlbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNlY3Rpb24uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZGluZ0RldGFpbHM6IHNlY3Rpb24ubGFuZGluZ0RldGFpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiBzZWN0aW9uLmlzRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBDb250ZW50QWdncmVnYXRpb248J0NPTlRFTlRTJz47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEZpbHRlckJ5Q3JpdGVyaWE8VD4oY29uZmlnOiB7XG4gICAgICAgIFtmaWVsZCBpbiBrZXlvZiBUXToge1xuICAgICAgICAgICAgb3BlcmF0aW9uOiBhbnksXG4gICAgICAgICAgICB2YWx1ZTogYW55XG4gICAgICAgIH1cbiAgICB9W10pOiBDc0ZpbHRlckNyaXRlcmlhPFQ+W10ge1xuICAgICAgICByZXR1cm4gY29uZmlnLnJlZHVjZSgoYWdnLCBzKSA9PiB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzKS5mb3JFYWNoKChrKSA9PiBhZ2cucHVzaCh7XG4gICAgICAgICAgICAgICAgZmlsdGVyQXR0cmlidXRlOiBrIGFzIGFueSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb25kaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBzW2tdLm9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNba10udmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gYWdnO1xuICAgICAgICB9LCBbXSBhcyBDc0ZpbHRlckNyaXRlcmlhPFQ+W10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRTb3J0QnlDcml0ZXJpYTxUPihjb25maWc6IHtcbiAgICAgICAgW2ZpZWxkIGluIGtleW9mIFRdOiAnYXNjJyB8ICdkZXNjJyB8IHsgb3JkZXI6ICdhc2MnIHwgJ2Rlc2MnLCBwcmVmZXJlbmNlOiBQcmltaXRpdmVbXSB9XG4gICAgfVtdKTogQ3NTb3J0Q3JpdGVyaWE8VD5bXSB7XG4gICAgICAgIHJldHVybiBjb25maWcucmVkdWNlKChhZ2csIHMpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHMpLmZvckVhY2goKGspID0+IGFnZy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzb3J0QXR0cmlidXRlOiBrIGFzIGFueSxcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXI6IHNba10sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gYWdnO1xuICAgICAgICB9LCBbXSBhcyBDc1NvcnRDcml0ZXJpYTxUPltdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkU2VhcmNoUmVxdWVzdEFuZENyaXRlcmlhKGZpZWxkOiBBZ2dyZWdhdG9yQ29uZmlnRmllbGQ8J0NPTlRFTlRTJyB8ICdDT05URU5UX0ZBQ0VUUyc+LCByZXF1ZXN0OiBDb250ZW50QWdncmVnYXRvclJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgYnVpbGRTZWFyY2hDcml0ZXJpYUZyb21TZWFyY2hSZXF1ZXN0OiAocikgPT4gQ29udGVudFNlYXJjaENyaXRlcmlhID0gKHIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaENvbnRlbnRIYW5kbGVyLmdldFNlYXJjaENyaXRlcmlhKHIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGJ1aWxkU2VhcmNoUmVxdWVzdEZyb21TZWFyY2hDcml0ZXJpYTogKGNyaXRlcmlhKSA9PiBTZWFyY2hSZXF1ZXN0ID0gKGMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaENvbnRlbnRIYW5kbGVyLmdldFNlYXJjaENvbnRlbnRSZXF1ZXN0KGMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRlbXBTZWFyY2hSZXF1ZXN0OiBTZWFyY2hSZXF1ZXN0ID0gKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWVsZC5kYXRhU3JjLnJlcXVlc3QgJiYgZmllbGQuZGF0YVNyYy5yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmaWx0ZXJzOiB7fSwgLi4uKGZpZWxkLmRhdGFTcmMucmVxdWVzdC5ib2R5IGFzIGFueSkucmVxdWVzdCB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBmaWx0ZXJzOiB7fSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGNvbnN0IHRlbXBTZWFyY2hDcml0ZXJpYTogQ29udGVudFNlYXJjaENyaXRlcmlhID0gKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LmludGVyY2VwdFNlYXJjaENyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QuaW50ZXJjZXB0U2VhcmNoQ3JpdGVyaWEoYnVpbGRTZWFyY2hDcml0ZXJpYUZyb21TZWFyY2hSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogdGVtcFNlYXJjaFJlcXVlc3RcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWlsZFNlYXJjaENyaXRlcmlhRnJvbVNlYXJjaFJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiB0ZW1wU2VhcmNoUmVxdWVzdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWFyY2hSZXF1ZXN0OiBidWlsZFNlYXJjaFJlcXVlc3RGcm9tU2VhcmNoQ3JpdGVyaWEodGVtcFNlYXJjaENyaXRlcmlhKSxcbiAgICAgICAgICAgIHNlYXJjaENyaXRlcmlhOiB0ZW1wU2VhcmNoQ3JpdGVyaWFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlYXJjaENvbnRlbnRzKFxuICAgICAgICBmaWVsZDogQWdncmVnYXRvckNvbmZpZ0ZpZWxkPCdDT05URU5UUycgfCAnQ09OVEVOVF9GQUNFVFMnPiwgc2VhcmNoQ3JpdGVyaWE6IENvbnRlbnRTZWFyY2hDcml0ZXJpYSwgc2VhcmNoUmVxdWVzdDogU2VhcmNoUmVxdWVzdFxuICAgICk6IFByb21pc2U8Q29udGVudFNlYXJjaFJlc3VsdD4ge1xuICAgICAgICBjb25zdCBhcGlTZXJ2aWNlID0gdGhpcy5hcGlTZXJ2aWNlO1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50U2VydmljZS5zZWFyY2hDb250ZW50KFxuICAgICAgICAgICAgc2VhcmNoQ3JpdGVyaWEsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBuZXcgY2xhc3MgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxTZWFyY2hSZXF1ZXN0LCBTZWFyY2hSZXNwb25zZT4ge1xuICAgICAgICAgICAgICAgIGhhbmRsZShfOiBTZWFyY2hSZXF1ZXN0KTogT2JzZXJ2YWJsZTxTZWFyY2hSZXNwb25zZT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VhcmNoUmVxdWVzdCAmJiBzZWFyY2hSZXF1ZXN0LmZpbHRlcnMgJiYgc2VhcmNoUmVxdWVzdC5maWx0ZXJzLm1pbWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWR1Y2VyID0gKGFjYywgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1pbWVUeXBlQ2F0ZWdvcnlNYXBwaW5nW2N1cl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoTWltZVR5cGVDYXRlZ29yeU1hcHBpbmdbY3VyXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW2N1cl0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVxdWVzdC5maWx0ZXJzLm1pbWVUeXBlID0gc2VhcmNoUmVxdWVzdC5maWx0ZXJzLm1pbWVUeXBlLnJlZHVjZShyZWR1Y2VyLCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmRhdGFTcmMucmVxdWVzdCAmJiBmaWVsZC5kYXRhU3JjLnJlcXVlc3QuYm9keSAmJiAoZmllbGQuZGF0YVNyYy5yZXF1ZXN0LmJvZHkgYXMgYW55KS5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5kYXRhU3JjLnJlcXVlc3QuYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihmaWVsZC5kYXRhU3JjLnJlcXVlc3QuYm9keSBhcyBhbnkpLnJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnNlYXJjaFJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIGFueTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmRhdGFTcmMucmVxdWVzdC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHNlYXJjaFJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0VXRpbC53aXRoRGVlcGx5T3JkZXJlZEtleXMoZmllbGQuZGF0YVNyYy5yZXF1ZXN0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbnRlbnRBZ2dyZWdhdG9yLnNlYXJjaENvbnRlbnRDYWNoZS5oYXMoY2FjaGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoQ29udGVudEFnZ3JlZ2F0b3Iuc2VhcmNoQ29udGVudENhY2hlLmdldChjYWNoZUtleSkhKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2Vzcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBpUmVxdWVzdCA9IFJlcXVlc3QuZnJvbUpTT04oZmllbGQuZGF0YVNyYy5yZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2UuZmV0Y2g8U2VhcmNoUmVzcG9uc2U+KGFwaVJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QWdncmVnYXRvci5zZWFyY2hDb250ZW50Q2FjaGUuc2V0KGNhY2hlS2V5LCByKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3MuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdHJ1ZSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdPRkZMSU5FX1JFU1BPTlNFX0lEJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlSWQ6ICdPRkZMSU5FX1JFU1BPTlNFX0lEJyxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ3JpdGVyaWE6IHNlYXJjaENyaXRlcmlhLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50RGF0YUxpc3Q6IFtdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==