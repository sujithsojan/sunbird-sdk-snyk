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
import { HttpRequestType, Request } from '../../api';
import { ContentEventType, MimeType, Visibility } from '..';
import { of } from 'rxjs';
import { ContentEntry } from '../db/schema';
import { QueryBuilder } from '../../db/util/query-builder';
import { ContentMapper } from '../util/content-mapper';
import { ContentMarkerHandler } from './content-marker-handler';
import { ContentUtil } from '../util/content-util';
import { EventNamespace } from '../../events-bus';
import { map, mergeMap, tap } from 'rxjs/operators';
var COLUMN_NAME_MIME_TYPE = ContentEntry.COLUMN_NAME_MIME_TYPE;
var COLUMN_NAME_VISIBILITY = ContentEntry.COLUMN_NAME_VISIBILITY;
var GetContentDetailsHandler = /** @class */ (function () {
    function GetContentDetailsHandler(contentFeedbackService, profileService, apiService, contentServiceConfig, dbService, eventsBusService) {
        this.contentFeedbackService = contentFeedbackService;
        this.profileService = profileService;
        this.apiService = apiService;
        this.contentServiceConfig = contentServiceConfig;
        this.dbService = dbService;
        this.eventsBusService = eventsBusService;
        this.GET_CONTENT_DETAILS_ENDPOINT = '/read';
    }
    GetContentDetailsHandler.getReadContentQuery = function (identifier) {
        return {
            table: ContentEntry.TABLE_NAME,
            selection: new QueryBuilder()
                .where('? = ?')
                .args([ContentEntry.COLUMN_NAME_IDENTIFIER, identifier])
                .end()
                .build(),
            limit: '1'
        };
    };
    GetContentDetailsHandler.isUnit = function (contentDbEntry) {
        return contentDbEntry[COLUMN_NAME_MIME_TYPE] === MimeType.COLLECTION
            && contentDbEntry[COLUMN_NAME_VISIBILITY] === Visibility.PARENT;
    };
    GetContentDetailsHandler.prototype.handle = function (request) {
        var _this = this;
        request.emitUpdateIfAny = request.emitUpdateIfAny === undefined ? true : request.emitUpdateIfAny;
        return this.fetchFromDB(request.contentId).pipe(mergeMap(function (contentDbEntry) {
            if (!contentDbEntry) {
                return _this.fetchAndDecorate(request);
            }
            return of(ContentMapper.mapContentDBEntryToContent(contentDbEntry)).pipe(mergeMap(function (content) {
                if (typeof (content.contentData.originData) === 'string') {
                    content.contentData.originData = ContentUtil.getParseErrorObject(content.contentData.originData);
                }
                if (content.contentData.trackable && typeof (content.contentData.trackable) === 'string') {
                    content.contentData.trackable = JSON.parse(content.contentData.trackable);
                }
                return _this.decorateContent({
                    content: content,
                    attachFeedback: request.attachFeedback,
                    attachContentAccess: request.attachContentAccess,
                    attachContentMarker: request.attachContentMarker
                });
            }), tap(function (localContent) { return __awaiter(_this, void 0, void 0, function () {
                var sendStreamUrlEvent, serverDataInDb, serverContentData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!request.emitUpdateIfAny || GetContentDetailsHandler.isUnit(contentDbEntry)) {
                                return [2 /*return*/];
                            }
                            sendStreamUrlEvent = false;
                            serverDataInDb = contentDbEntry[ContentEntry.COLUMN_NAME_SERVER_DATA] &&
                                JSON.parse(contentDbEntry[ContentEntry.COLUMN_NAME_SERVER_DATA]);
                            if (!serverDataInDb) {
                                sendStreamUrlEvent = true;
                            }
                            else if (!serverDataInDb.streamingUrl) {
                                sendStreamUrlEvent = true;
                            }
                            return [4 /*yield*/, this.fetchFromServer(request).toPromise()];
                        case 1:
                            serverContentData = _a.sent();
                            contentDbEntry[ContentEntry.COLUMN_NAME_SERVER_DATA] = JSON.stringify(serverContentData);
                            contentDbEntry[ContentEntry.COLUMN_NAME_SERVER_LAST_UPDATED_ON] = serverContentData['lastUpdatedOn'];
                            contentDbEntry[ContentEntry.COLUMN_NAME_AUDIENCE] = ContentUtil.readAudience(serverContentData);
                            return [4 /*yield*/, this.dbService.update({
                                    table: ContentEntry.TABLE_NAME,
                                    selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " =?",
                                    selectionArgs: [contentDbEntry[ContentEntry.COLUMN_NAME_IDENTIFIER]],
                                    modelJson: contentDbEntry
                                }).toPromise()];
                        case 2:
                            _a.sent();
                            if (ContentUtil.isUpdateAvailable(serverContentData, localContent.contentData)) {
                                this.eventsBusService.emit({
                                    namespace: EventNamespace.CONTENT,
                                    event: {
                                        type: ContentEventType.UPDATE,
                                        payload: {
                                            contentId: localContent.contentData.identifier,
                                            size: serverContentData.size
                                        }
                                    }
                                });
                            }
                            if (serverContentData) {
                                this.eventsBusService.emit({
                                    namespace: EventNamespace.CONTENT,
                                    event: {
                                        type: ContentEventType.SERVER_CONTENT_DATA,
                                        payload: {
                                            contentId: serverContentData.identifier,
                                            streamingUrl: serverContentData.streamingUrl,
                                            licenseDetails: serverContentData.licenseDetails,
                                            size: serverContentData.size,
                                            serverContentData: serverContentData,
                                        }
                                    }
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            }); }));
        }));
    };
    /** @internal */
    GetContentDetailsHandler.prototype.fetchFromDB = function (contentId) {
        return this.dbService.read({
            table: ContentEntry.TABLE_NAME,
            selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " = ?",
            selectionArgs: [contentId],
            limit: '1'
        }).pipe(map(function (contentsFromDB) { return contentsFromDB[0]; }));
    };
    GetContentDetailsHandler.prototype.fetchFromDBForAll = function (contentIds) {
        return this.dbService.read({
            table: ContentEntry.TABLE_NAME,
            selection: ContentEntry.COLUMN_NAME_IDENTIFIER + " IN (" + contentIds + ")"
        });
    };
    GetContentDetailsHandler.prototype.fetchFromServer = function (request) {
        switch (request.objectType) {
            case 'QuestionSet':
                return this.apiService.fetch(new Request.Builder()
                    .withHost(this.contentServiceConfig.host)
                    .withType(HttpRequestType.GET)
                    .withPath(this.contentServiceConfig.questionSetReadApiPath +
                    this.GET_CONTENT_DETAILS_ENDPOINT + '/' + request.contentId)
                    .withBearerToken(false)
                    .build()).pipe(map(function (response) {
                    return response.body.result.questionset;
                }));
            case 'Question':
                return this.apiService.fetch(new Request.Builder()
                    .withHost(this.contentServiceConfig.host)
                    .withType(HttpRequestType.GET)
                    .withPath(this.contentServiceConfig.questionReadApiPath +
                    this.GET_CONTENT_DETAILS_ENDPOINT + '/' + request.contentId)
                    .withBearerToken(false)
                    .build()).pipe(map(function (response) {
                    return response.body.result.question;
                }));
            default:
                return this.apiService.fetch(new Request.Builder()
                    .withHost(this.contentServiceConfig.host)
                    .withType(HttpRequestType.GET)
                    .withPath(this.contentServiceConfig.apiPath + this.GET_CONTENT_DETAILS_ENDPOINT + '/' + request.contentId)
                    .withParameters({
                    licenseDetails: 'name,url,description'
                })
                    .withBearerToken(true)
                    .build()).pipe(map(function (response) {
                    return response.body.result.content;
                }));
        }
    };
    GetContentDetailsHandler.prototype.fetchAndDecorate = function (request) {
        var _this = this;
        return this.fetchFromServer(request).pipe(map(function (contentData) {
            return ContentMapper.mapServerResponseToContent(contentData);
        }), mergeMap(function (content) {
            return _this.decorateContent({
                content: content,
                attachFeedback: request.attachFeedback,
                attachContentAccess: request.attachContentAccess,
                attachContentMarker: request.attachContentMarker
            });
        }));
    };
    /** @internal */
    GetContentDetailsHandler.prototype.decorateContent = function (request) {
        var _this = this;
        return of(request.content).pipe(mergeMap(function (content) {
            if (request.attachContentAccess) {
                return _this.attachContentAccess(content);
            }
            return of(content);
        }), mergeMap(function (content) {
            if (request.attachFeedback) {
                return _this.attachFeedback(content);
            }
            return of(content);
        }), mergeMap(function (content) {
            if (request.attachContentMarker) {
                return _this.attachContentMarker(content);
            }
            return of(content);
        }));
    };
    GetContentDetailsHandler.prototype.attachContentAccess = function (content) {
        var _this = this;
        return this.profileService.getActiveProfileSession().pipe(mergeMap(function (_a) {
            var uid = _a.uid;
            return _this.profileService.getAllContentAccess({
                contentId: content.identifier,
                uid: uid
            }).pipe(map(function (contentAccess) {
                return __assign(__assign({}, content), { contentAccess: contentAccess });
            }));
        }));
    };
    GetContentDetailsHandler.prototype.attachFeedback = function (content) {
        var _this = this;
        return this.profileService.getActiveProfileSession().pipe(mergeMap(function (_a) {
            var uid = _a.uid;
            return _this.contentFeedbackService.getFeedback({
                contentId: content.identifier,
                uid: uid
            }).pipe(map(function (contentFeedback) {
                return __assign(__assign({}, content), { contentFeedback: contentFeedback });
            }));
        }));
    };
    GetContentDetailsHandler.prototype.attachContentMarker = function (content) {
        var _this = this;
        return this.profileService.getActiveProfileSession().pipe(mergeMap(function (_a) {
            var uid = _a.uid;
            return new ContentMarkerHandler(_this.dbService).getContentMarker(content.identifier, uid).pipe(map(function (contentMarkers) {
                return __assign(__assign({}, content), { contentMarkers: contentMarkers });
            }));
        }));
    };
    return GetContentDetailsHandler;
}());
export { GetContentDetailsHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRlbnQtZGV0YWlscy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvZ2V0LWNvbnRlbnQtZGV0YWlscy1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFnQyxlQUFlLEVBQUUsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xGLE9BQU8sRUFLSCxnQkFBZ0IsRUFLaEIsUUFBUSxFQUNSLFVBQVUsRUFDYixNQUFNLElBQUksQ0FBQztBQUNaLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELElBQU8scUJBQXFCLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixDQUFDO0FBQ2xFLElBQU8sc0JBQXNCLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDO0FBRXBFO0lBR0ksa0NBQW9CLHNCQUE4QyxFQUM5QyxjQUE4QixFQUM5QixVQUFzQixFQUN0QixvQkFBMEMsRUFDMUMsU0FBb0IsRUFDcEIsZ0JBQWtDO1FBTGxDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7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O2dCQUNoQyw2QkFDTyxPQUFPLEtBQ1YsY0FBYyxnQkFBQSxJQUNoQjtZQUNOLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQWxSRCxJQWtSQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBpUmVxdWVzdEhhbmRsZXIsIEFwaVNlcnZpY2UsIEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdH0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7XG4gICAgQ29udGVudCxcbiAgICBDb250ZW50RGF0YSxcbiAgICBDb250ZW50RGVjb3JhdGVSZXF1ZXN0LFxuICAgIENvbnRlbnREZXRhaWxSZXF1ZXN0LFxuICAgIENvbnRlbnRFdmVudFR5cGUsXG4gICAgQ29udGVudEZlZWRiYWNrLFxuICAgIENvbnRlbnRGZWVkYmFja1NlcnZpY2UsXG4gICAgQ29udGVudE1hcmtlcixcbiAgICBDb250ZW50U2VydmljZUNvbmZpZyxcbiAgICBNaW1lVHlwZSxcbiAgICBWaXNpYmlsaXR5XG59IGZyb20gJy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYlNlcnZpY2UsIFJlYWRRdWVyeX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge1F1ZXJ5QnVpbGRlcn0gZnJvbSAnLi4vLi4vZGIvdXRpbC9xdWVyeS1idWlsZGVyJztcbmltcG9ydCB7Q29udGVudE1hcHBlcn0gZnJvbSAnLi4vdXRpbC9jb250ZW50LW1hcHBlcic7XG5pbXBvcnQge0NvbnRlbnRBY2Nlc3MsIFByb2ZpbGVTZXJ2aWNlLCBQcm9maWxlU2Vzc2lvbn0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge0NvbnRlbnRNYXJrZXJIYW5kbGVyfSBmcm9tICcuL2NvbnRlbnQtbWFya2VyLWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vdXRpbC9jb250ZW50LXV0aWwnO1xuaW1wb3J0IHtFdmVudE5hbWVzcGFjZSwgRXZlbnRzQnVzU2VydmljZX0gZnJvbSAnLi4vLi4vZXZlbnRzLWJ1cyc7XG5pbXBvcnQge21hcCwgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IENPTFVNTl9OQU1FX01JTUVfVFlQRSA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9NSU1FX1RZUEU7XG5pbXBvcnQgQ09MVU1OX05BTUVfVklTSUJJTElUWSA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZO1xuXG5leHBvcnQgY2xhc3MgR2V0Q29udGVudERldGFpbHNIYW5kbGVyIGltcGxlbWVudHMgQXBpUmVxdWVzdEhhbmRsZXI8Q29udGVudERldGFpbFJlcXVlc3QsIENvbnRlbnQ+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IEdFVF9DT05URU5UX0RFVEFJTFNfRU5EUE9JTlQgPSAnL3JlYWQnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZW50RmVlZGJhY2tTZXJ2aWNlOiBDb250ZW50RmVlZGJhY2tTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbnRlbnRTZXJ2aWNlQ29uZmlnOiBDb250ZW50U2VydmljZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRzQnVzU2VydmljZTogRXZlbnRzQnVzU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmVhZENvbnRlbnRRdWVyeShpZGVudGlmaWVyOiBzdHJpbmcpOiBSZWFkUXVlcnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBuZXcgUXVlcnlCdWlsZGVyKClcbiAgICAgICAgICAgICAgICAud2hlcmUoJz8gPSA/JylcbiAgICAgICAgICAgICAgICAuYXJncyhbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVIsIGlkZW50aWZpZXJdKVxuICAgICAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgICAgIC5idWlsZCgpLFxuICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNVbml0KGNvbnRlbnREYkVudHJ5OiBDb250ZW50RW50cnkuU2NoZW1hTWFwKSB7XG4gICAgICAgIHJldHVybiBjb250ZW50RGJFbnRyeVtDT0xVTU5fTkFNRV9NSU1FX1RZUEVdID09PSBNaW1lVHlwZS5DT0xMRUNUSU9OXG4gICAgICAgICAgICAmJiBjb250ZW50RGJFbnRyeVtDT0xVTU5fTkFNRV9WSVNJQklMSVRZXSA9PT0gVmlzaWJpbGl0eS5QQVJFTlQ7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZShyZXF1ZXN0OiBDb250ZW50RGV0YWlsUmVxdWVzdCk6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICByZXF1ZXN0LmVtaXRVcGRhdGVJZkFueSA9IHJlcXVlc3QuZW1pdFVwZGF0ZUlmQW55ID09PSB1bmRlZmluZWQgPyB0cnVlIDogcmVxdWVzdC5lbWl0VXBkYXRlSWZBbnk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tREIocmVxdWVzdC5jb250ZW50SWQpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudERiRW50cnk6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXAgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnREYkVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoQW5kRGVjb3JhdGUocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKENvbnRlbnRNYXBwZXIubWFwQ29udGVudERCRW50cnlUb0NvbnRlbnQoY29udGVudERiRW50cnkpKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudDogQ29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29udGVudC5jb250ZW50RGF0YS5vcmlnaW5EYXRhKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNvbnRlbnREYXRhLm9yaWdpbkRhdGEgPSBDb250ZW50VXRpbC5nZXRQYXJzZUVycm9yT2JqZWN0KGNvbnRlbnQuY29udGVudERhdGEub3JpZ2luRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jb250ZW50RGF0YS50cmFja2FibGUgJiYgdHlwZW9mIChjb250ZW50LmNvbnRlbnREYXRhLnRyYWNrYWJsZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jb250ZW50RGF0YS50cmFja2FibGUgPSBKU09OLnBhcnNlKGNvbnRlbnQuY29udGVudERhdGEudHJhY2thYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29yYXRlQ29udGVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hGZWVkYmFjazogcmVxdWVzdC5hdHRhY2hGZWVkYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hDb250ZW50QWNjZXNzOiByZXF1ZXN0LmF0dGFjaENvbnRlbnRBY2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoQ29udGVudE1hcmtlcjogcmVxdWVzdC5hdHRhY2hDb250ZW50TWFya2VyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRhcChhc3luYyAobG9jYWxDb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QuZW1pdFVwZGF0ZUlmQW55IHx8IEdldENvbnRlbnREZXRhaWxzSGFuZGxlci5pc1VuaXQoY29udGVudERiRW50cnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VuZFN0cmVhbVVybEV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXJEYXRhSW5EYjogQ29udGVudERhdGEgPSBjb250ZW50RGJFbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0RBVEFdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShjb250ZW50RGJFbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0RBVEFdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXJ2ZXJEYXRhSW5EYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRTdHJlYW1VcmxFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzZXJ2ZXJEYXRhSW5EYi5zdHJlYW1pbmdVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kU3RyZWFtVXJsRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXJDb250ZW50RGF0YTogQ29udGVudERhdGEgPSBhd2FpdCB0aGlzLmZldGNoRnJvbVNlcnZlcihyZXF1ZXN0KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnREYkVudHJ5W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9TRVJWRVJfREFUQV0gPSBKU09OLnN0cmluZ2lmeShzZXJ2ZXJDb250ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50RGJFbnRyeVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0xBU1RfVVBEQVRFRF9PTl0gPSBzZXJ2ZXJDb250ZW50RGF0YVsnbGFzdFVwZGF0ZWRPbiddO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudERiRW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0FVRElFTkNFXSA9IENvbnRlbnRVdGlsLnJlYWRBdWRpZW5jZShzZXJ2ZXJDb250ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IENvbnRlbnRFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbY29udGVudERiRW50cnlbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEpzb246IGNvbnRlbnREYkVudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmlzVXBkYXRlQXZhaWxhYmxlKHNlcnZlckNvbnRlbnREYXRhLCBsb2NhbENvbnRlbnQuY29udGVudERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNCdXNTZXJ2aWNlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IEV2ZW50TmFtZXNwYWNlLkNPTlRFTlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb250ZW50RXZlbnRUeXBlLlVQREFURSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IGxvY2FsQ29udGVudC5jb250ZW50RGF0YS5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNlcnZlckNvbnRlbnREYXRhLnNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmVyQ29udGVudERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c0J1c1NlcnZpY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UuQ09OVEVOVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IENvbnRlbnRFdmVudFR5cGUuU0VSVkVSX0NPTlRFTlRfREFUQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ6IHNlcnZlckNvbnRlbnREYXRhLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nVXJsOiBzZXJ2ZXJDb250ZW50RGF0YS5zdHJlYW1pbmdVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZURldGFpbHM6IHNlcnZlckNvbnRlbnREYXRhLmxpY2Vuc2VEZXRhaWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNlcnZlckNvbnRlbnREYXRhLnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyQ29udGVudERhdGE6IHNlcnZlckNvbnRlbnREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHB1YmxpYyBmZXRjaEZyb21EQihjb250ZW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29udGVudEVudHJ5LlNjaGVtYU1hcCB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2NvbnRlbnRJZF0sXG4gICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnRlbnRzRnJvbURCOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10pID0+IGNvbnRlbnRzRnJvbURCWzBdKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBmZXRjaEZyb21EQkZvckFsbChjb250ZW50SWRzOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogQ29udGVudEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IGAke0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfSBJTiAoJHtjb250ZW50SWRzfSlgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZldGNoRnJvbVNlcnZlcihyZXF1ZXN0OiBDb250ZW50RGV0YWlsUmVxdWVzdCk6IE9ic2VydmFibGU8Q29udGVudERhdGE+IHtcbiAgICAgICAgc3dpdGNoIChyZXF1ZXN0Lm9iamVjdFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1F1ZXN0aW9uU2V0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgcmVzdWx0OiB7IHF1ZXN0aW9uc2V0OiBDb250ZW50RGF0YSB9IH0+KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoSG9zdCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLmhvc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLkdFVClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLnF1ZXN0aW9uU2V0UmVhZEFwaVBhdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuR0VUX0NPTlRFTlRfREVUQUlMU19FTkRQT0lOVCArICcvJyArIHJlcXVlc3QuY29udGVudElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbihmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5idWlsZCgpXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5yZXN1bHQucXVlc3Rpb25zZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ1F1ZXN0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmZldGNoPHsgcmVzdWx0OiB7IHF1ZXN0aW9uOiBDb250ZW50RGF0YSB9IH0+KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoSG9zdCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLmhvc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLkdFVClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLnF1ZXN0aW9uUmVhZEFwaVBhdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuR0VUX0NPTlRFTlRfREVUQUlMU19FTkRQT0lOVCArICcvJyArIHJlcXVlc3QuY29udGVudElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhCZWFyZXJUb2tlbihmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5idWlsZCgpXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5yZXN1bHQucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5mZXRjaDx7IHJlc3VsdDogeyBjb250ZW50OiBDb250ZW50RGF0YSB9IH0+KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVxdWVzdC5CdWlsZGVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoSG9zdCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLmhvc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aFR5cGUoSHR0cFJlcXVlc3RUeXBlLkdFVClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoUGF0aCh0aGlzLmNvbnRlbnRTZXJ2aWNlQ29uZmlnLmFwaVBhdGggKyB0aGlzLkdFVF9DT05URU5UX0RFVEFJTFNfRU5EUE9JTlQgKyAnLycgKyByZXF1ZXN0LmNvbnRlbnRJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoUGFyYW1ldGVycyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZURldGFpbHM6ICduYW1lLHVybCxkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAud2l0aEJlYXJlclRva2VuKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYnVpbGQoKVxuICAgICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkucmVzdWx0LmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZldGNoQW5kRGVjb3JhdGUocmVxdWVzdDogQ29udGVudERldGFpbFJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnRlbnREYXRhOiBDb250ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb250ZW50TWFwcGVyLm1hcFNlcnZlclJlc3BvbnNlVG9Db250ZW50KGNvbnRlbnREYXRhKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNvbnRlbnQ6IENvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZUNvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hGZWVkYmFjazogcmVxdWVzdC5hdHRhY2hGZWVkYmFjayxcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoQ29udGVudEFjY2VzczogcmVxdWVzdC5hdHRhY2hDb250ZW50QWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hDb250ZW50TWFya2VyOiByZXF1ZXN0LmF0dGFjaENvbnRlbnRNYXJrZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHB1YmxpYyBkZWNvcmF0ZUNvbnRlbnQocmVxdWVzdDogQ29udGVudERlY29yYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICByZXR1cm4gb2YocmVxdWVzdC5jb250ZW50KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hdHRhY2hDb250ZW50QWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF0dGFjaENvbnRlbnRBY2Nlc3MoY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmF0dGFjaEZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF0dGFjaEZlZWRiYWNrKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvZihjb250ZW50KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hdHRhY2hDb250ZW50TWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF0dGFjaENvbnRlbnRNYXJrZXIoY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaENvbnRlbnRBY2Nlc3MoY29udGVudDogQ29udGVudCk6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoe3VpZH06IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWxsQ29udGVudEFjY2Vzcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZDogY29udGVudC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICB1aWRcbiAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKGNvbnRlbnRBY2Nlc3M6IENvbnRlbnRBY2Nlc3NbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBY2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hGZWVkYmFjayhjb250ZW50OiBDb250ZW50KTogT2JzZXJ2YWJsZTxDb250ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKCh7dWlkfTogUHJvZmlsZVNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RmVlZGJhY2tTZXJ2aWNlLmdldEZlZWRiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudElkOiBjb250ZW50LmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIHVpZFxuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoY29udGVudEZlZWRiYWNrOiBDb250ZW50RmVlZGJhY2tbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRGZWVkYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaENvbnRlbnRNYXJrZXIoY29udGVudDogQ29udGVudCk6IE9ic2VydmFibGU8Q29udGVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoe3VpZH06IFByb2ZpbGVTZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250ZW50TWFya2VySGFuZGxlcih0aGlzLmRiU2VydmljZSkuZ2V0Q29udGVudE1hcmtlcihjb250ZW50LmlkZW50aWZpZXIsIHVpZCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChjb250ZW50TWFya2VyczogQ29udGVudE1hcmtlcltdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudE1hcmtlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19