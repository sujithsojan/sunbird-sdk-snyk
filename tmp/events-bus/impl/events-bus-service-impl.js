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
import { of, Subject, zip } from 'rxjs';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { catchError, filter, map, mapTo, take, tap } from 'rxjs/operators';
var EventsBusServiceImpl = /** @class */ (function () {
    function EventsBusServiceImpl(sdkConfig) {
        this.sdkConfig = sdkConfig;
        this.eventsBus = new Subject();
        this.eventDelegates = [];
        this.eventsBusConfig = this.sdkConfig.eventsBusConfig;
    }
    EventsBusServiceImpl.prototype.onInit = function () {
        var _this = this;
        return this.eventsBus
            .pipe(tap(function (eventContainer) {
            if (_this.eventsBusConfig.debugMode) {
                console.log('SDK Telemetry Events', eventContainer);
            }
        }), tap(function (eventContainer) { return __awaiter(_this, void 0, void 0, function () {
            var delegateHandlers, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delegateHandlers = this.eventDelegates
                            .filter(function (d) { return d.namespace === eventContainer.namespace; })
                            .map(function (d) { return d.observer.onEvent(eventContainer.event)
                            .pipe(take(1), catchError(function (e) {
                            console.error('Error: ', e, 'EventObserver: ', d);
                            return of(undefined);
                        })); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, zip.apply(void 0, delegateHandlers).toPromise()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error('EVENT_BUS_DELEGATE_ERROR', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }), mapTo(undefined));
    };
    EventsBusServiceImpl.prototype.events = function (eventFilter) {
        return this.eventsBus.asObservable()
            .pipe(filter(function (eventContainer) { return eventFilter ? eventContainer.namespace === eventFilter : true; }), map(function (eventContainer) { return eventContainer.event; }));
    };
    EventsBusServiceImpl.prototype.emit = function (_a) {
        var namespace = _a.namespace, event = _a.event;
        this.eventsBus.next({
            namespace: namespace,
            event: event
        });
    };
    EventsBusServiceImpl.prototype.registerObserver = function (_a) {
        var namespace = _a.namespace, observer = _a.observer;
        this.eventDelegates.push({ namespace: namespace, observer: observer });
    };
    EventsBusServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __metadata("design:paramtypes", [Object])
    ], EventsBusServiceImpl);
    return EventsBusServiceImpl;
}());
export { EventsBusServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLWJ1cy1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZlbnRzLWJ1cy9pbXBsL2V2ZW50cy1idXMtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUtsRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFRekU7SUFLSSw4QkFBd0QsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUpwRSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFDMUMsbUJBQWMsR0FBNkUsRUFBRSxDQUFDO1FBSWxHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFDMUQsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFBQSxpQkE2QkM7UUE1QkcsT0FBTyxJQUFJLENBQUMsU0FBUzthQUNoQixJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUMsY0FBOEI7WUFDL0IsSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUN2RDtRQUNMLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxVQUFPLGNBQThCOzs7Ozt3QkFDL0IsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWM7NkJBQ3ZDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLFNBQVMsRUFBeEMsQ0FBd0MsQ0FBQzs2QkFDdkQsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQzs2QkFDL0MsSUFBSSxDQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxVQUFVLENBQUMsVUFBQyxDQUFDOzRCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDbEQsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxDQUNMLEVBUE8sQ0FPUCxDQUNKLENBQUM7Ozs7d0JBR0YscUJBQU0sR0FBRyxlQUFJLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxFQUFBOzt3QkFBMUMsU0FBMEMsQ0FBQzs7Ozt3QkFFM0MsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxHQUFDLENBQUMsQ0FBQzs7Ozs7YUFFcEQsQ0FBQyxFQUNGLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDbkIsQ0FBQztJQUNWLENBQUM7SUFFRCxxQ0FBTSxHQUFOLFVBQU8sV0FBb0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTthQUMvQixJQUFJLENBQ0QsTUFBTSxDQUFDLFVBQUEsY0FBYyxJQUFJLE9BQUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUE3RCxDQUE2RCxDQUFDLEVBQ3ZGLEdBQUcsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxLQUFLLEVBQXBCLENBQW9CLENBQUMsQ0FDaEQsQ0FBQztJQUNWLENBQUM7SUFFRCxtQ0FBSSxHQUFKLFVBQXFDLEVBQWtDO1lBQWpDLFNBQVMsZUFBQSxFQUFFLEtBQUssV0FBQTtRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNoQixTQUFTLFdBQUE7WUFDVCxLQUFLLE9BQUE7U0FDUixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWdCLEdBQWhCLFVBQWlCLEVBQThDO1lBQTdDLFNBQVMsZUFBQSxFQUFFLFFBQVEsY0FBQTtRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBekRRLG9CQUFvQjtRQURoQyxVQUFVLEVBQUU7UUFNSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7O09BTHRDLG9CQUFvQixDQTBEaEM7SUFBRCwyQkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnROYW1lc3BhY2UsIEV2ZW50c0J1c0V2ZW50LCBFdmVudHNCdXNTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mLCBTdWJqZWN0LCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFbWl0UmVxdWVzdH0gZnJvbSAnLi4vZGVmL2VtaXQtcmVxdWVzdCc7XG5pbXBvcnQge1JlZ2lzdGVyT2JzZXJ2ZXJSZXF1ZXN0fSBmcm9tICcuLi9kZWYvcmVnaXN0ZXItb2JzZXJ2ZXItcmVxdWVzdCc7XG5pbXBvcnQge0V2ZW50T2JzZXJ2ZXJ9IGZyb20gJy4uL2RlZi9ldmVudC1vYnNlcnZlcic7XG5pbXBvcnQge0V2ZW50c0J1c0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnL2V2ZW50cy1idXMtY29uZmlnJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgbWFwVG8sIHRha2UsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgRXZlbnRDb250YWluZXIge1xuICAgIG5hbWVzcGFjZTogc3RyaW5nO1xuICAgIGV2ZW50OiBFdmVudHNCdXNFdmVudDtcbn1cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50c0J1c1NlcnZpY2VJbXBsIGltcGxlbWVudHMgRXZlbnRzQnVzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBldmVudHNCdXMgPSBuZXcgU3ViamVjdDxFdmVudENvbnRhaW5lcj4oKTtcbiAgICBwcml2YXRlIGV2ZW50RGVsZWdhdGVzOiB7IG5hbWVzcGFjZTogRXZlbnROYW1lc3BhY2UsIG9ic2VydmVyOiBFdmVudE9ic2VydmVyPEV2ZW50c0J1c0V2ZW50PiB9W10gPSBbXTtcbiAgICBwcml2YXRlIGV2ZW50c0J1c0NvbmZpZzogRXZlbnRzQnVzQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZykge1xuICAgICAgICB0aGlzLmV2ZW50c0J1c0NvbmZpZyA9IHRoaXMuc2RrQ29uZmlnLmV2ZW50c0J1c0NvbmZpZztcbiAgICB9XG5cbiAgICBvbkluaXQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzQnVzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKGV2ZW50Q29udGFpbmVyOiBFdmVudENvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNCdXNDb25maWcuZGVidWdNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU0RLIFRlbGVtZXRyeSBFdmVudHMnLCBldmVudENvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YXAoYXN5bmMgKGV2ZW50Q29udGFpbmVyOiBFdmVudENvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxlZ2F0ZUhhbmRsZXJzID0gdGhpcy5ldmVudERlbGVnYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZCkgPT4gZC5uYW1lc3BhY2UgPT09IGV2ZW50Q29udGFpbmVyLm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGQpID0+IGQub2JzZXJ2ZXIub25FdmVudChldmVudENvbnRhaW5lci5ldmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6ICcsIGUsICdFdmVudE9ic2VydmVyOiAnLCBkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHppcCguLi5kZWxlZ2F0ZUhhbmRsZXJzKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVZFTlRfQlVTX0RFTEVHQVRFX0VSUk9SJywgZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGV2ZW50cyhldmVudEZpbHRlcj86IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50c0J1cy5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50Q29udGFpbmVyID0+IGV2ZW50RmlsdGVyID8gZXZlbnRDb250YWluZXIubmFtZXNwYWNlID09PSBldmVudEZpbHRlciA6IHRydWUpLFxuICAgICAgICAgICAgICAgIG1hcCgoZXZlbnRDb250YWluZXIpID0+IGV2ZW50Q29udGFpbmVyLmV2ZW50KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBlbWl0PFQgZXh0ZW5kcyBFdmVudHNCdXNFdmVudCA9IGFueT4oe25hbWVzcGFjZSwgZXZlbnR9OiBFbWl0UmVxdWVzdDxUPik6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50c0J1cy5uZXh0KHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgIGV2ZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT2JzZXJ2ZXIoe25hbWVzcGFjZSwgb2JzZXJ2ZXJ9OiBSZWdpc3Rlck9ic2VydmVyUmVxdWVzdCkge1xuICAgICAgICB0aGlzLmV2ZW50RGVsZWdhdGVzLnB1c2goe25hbWVzcGFjZSwgb2JzZXJ2ZXJ9KTtcbiAgICB9XG59XG4iXX0=