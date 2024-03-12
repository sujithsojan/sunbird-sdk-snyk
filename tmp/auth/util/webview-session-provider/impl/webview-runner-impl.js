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
import * as qs from 'qs';
import { zip, race } from 'rxjs';
import { NoInappbrowserSessionAssertionFailError } from '../errors/no-inappbrowser-session-assertion-fail-error';
import { ParamNotCapturedError } from '../errors/param-not-captured-error';
import { take, mapTo } from 'rxjs/operators';
var WebviewRunnerImpl = /** @class */ (function () {
    function WebviewRunnerImpl() {
        this.extras = {};
        this.captured = {};
    }
    WebviewRunnerImpl.buildUrl = function (host, path, params) {
        return "" + host + path + "?" + qs.stringify(params);
    };
    WebviewRunnerImpl.prototype.resetInAppBrowserEventListeners = function () {
        var _this = this;
        if (!this.inAppBrowser) {
            throw new NoInappbrowserSessionAssertionFailError('InAppBrowser Session not found when resetInAppBrowserEventListeners()');
        }
        var _loop_1 = function (key) {
            if (this_1.inAppBrowser.listeners.hasOwnProperty(key)) {
                this_1.inAppBrowser.listeners[key].forEach(function (listener) {
                    _this.inAppBrowser.ref.removeEventListener(key, listener);
                });
                this_1.inAppBrowser.listeners[key].clear();
            }
        };
        var this_1 = this;
        for (var key in this.inAppBrowser.listeners) {
            _loop_1(key);
        }
    };
    WebviewRunnerImpl.prototype.launchWebview = function (_a) {
        var host = _a.host, path = _a.path, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var onExit;
            var _this = this;
            return __generator(this, function (_b) {
                this.inAppBrowser = {
                    ref: cordova.InAppBrowser.open(WebviewRunnerImpl.buildUrl(host, path, params), '_blank', 'zoom=no,clearcache=yes,clearsessioncache=yes,cleardata=yes'),
                    listeners: {
                        loadstart: new Set(),
                        exit: new Set()
                    }
                };
                onExit = function () {
                    _this.resetInAppBrowserEventListeners();
                    _this.inAppBrowser = undefined;
                };
                this.inAppBrowser.listeners.exit.add(onExit);
                this.inAppBrowser.ref.addEventListener('exit', onExit);
                return [2 /*return*/];
            });
        });
    };
    WebviewRunnerImpl.prototype.closeWebview = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.inAppBrowser) {
                    throw new NoInappbrowserSessionAssertionFailError('InAppBrowser Session not found');
                }
                this.inAppBrowser.ref.close();
                return [2 /*return*/];
            });
        });
    };
    WebviewRunnerImpl.prototype.any = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return race.apply(void 0, args).pipe(take(1)).toPromise();
    };
    WebviewRunnerImpl.prototype.all = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return zip.apply(void 0, args).pipe(take(1), mapTo(undefined)).toPromise();
    };
    WebviewRunnerImpl.prototype.launchCustomTab = function (_a) {
        var _this = this;
        var host = _a.host, path = _a.path, params = _a.params, extraParams = _a.extraParams;
        var url = WebviewRunnerImpl.buildUrl(host, path, params);
        return new Promise(function (resolve, reject) {
            customtabs.isAvailable(function () {
                // customTabs available
                customtabs.launch(url, function (resolved) {
                    _this.captured = __assign(__assign({}, _this.captured), qs.parse(resolved));
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function () {
                customtabs.launchInBrowser(url, extraParams, function (resolved) {
                    _this.captured = __assign(__assign({}, _this.captured), qs.parse(resolved));
                    resolve();
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    WebviewRunnerImpl.prototype.capture = function (_a) {
        var _this = this;
        var host = _a.host, path = _a.path, params = _a.params;
        if (!this.inAppBrowser) {
            throw new NoInappbrowserSessionAssertionFailError('InAppBrowser Session not found');
        }
        var isHostMatching = function (url) { return url.origin === host; };
        var isPathMatching = function (url) { return url.pathname === path; };
        var areParamsMatching = function (url) { return params.map(function (p) { return p; }).every(function (param) {
            if (param.exists === 'false') {
                return !url.searchParams.has(param.key);
            }
            else {
                if (param.match) {
                    return url.searchParams.has(param.key) && url.searchParams.get(param.key) === param.match;
                }
                return url.searchParams.has(param.key);
            }
        }); };
        return new Promise(function (resolve) {
            var onLoadStart = function (event) {
                if (event.url) {
                    var url_1 = new URL(event.url);
                    if (isHostMatching(url_1) &&
                        isPathMatching(url_1) &&
                        areParamsMatching(url_1)) {
                        _this.captured = __assign(__assign({}, _this.captured), params.reduce(function (acc, p) {
                            acc[p.resolveTo] = url_1.searchParams.get(p.key);
                            return acc;
                        }, {}));
                        _this.extras = {};
                        params.map(function (p) { return p.key; }).forEach(function (param) { return url_1.searchParams.delete(param); });
                        url_1.searchParams['forEach'](function (value, key) {
                            _this.extras[key] = value;
                        });
                        if (_this.inAppBrowser) {
                            _this.inAppBrowser.listeners.loadstart.delete(onLoadStart);
                            _this.inAppBrowser.ref.removeEventListener('loadstart', onLoadStart);
                        }
                        resolve();
                    }
                }
            };
            if (_this.inAppBrowser) {
                _this.inAppBrowser.listeners.loadstart.add(onLoadStart);
                _this.inAppBrowser.ref.addEventListener('loadstart', onLoadStart);
            }
        });
    };
    WebviewRunnerImpl.prototype.resolveCaptured = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.captured[param]) {
                    throw new ParamNotCapturedError(param + " was not captured");
                }
                return [2 /*return*/, this.captured[param]];
            });
        });
    };
    WebviewRunnerImpl.prototype.clearCapture = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.captured = {};
                return [2 /*return*/];
            });
        });
    };
    WebviewRunnerImpl.prototype.redirectTo = function (_a) {
        var host = _a.host, path = _a.path, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!this.inAppBrowser) {
                    throw new NoInappbrowserSessionAssertionFailError('InAppBrowser Session not found');
                }
                this.inAppBrowser.ref.executeScript({
                    code: "(() => {\n                        window.location.href = " + '`' + ("" + WebviewRunnerImpl.buildUrl(host, path, params)) + '`' + ";\n                    })()"
                });
                return [2 /*return*/];
            });
        });
    };
    WebviewRunnerImpl.prototype.success = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, __assign({}, this.captured)];
            });
        });
    };
    WebviewRunnerImpl.prototype.fail = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw __assign({}, this.captured);
            });
        });
    };
    WebviewRunnerImpl.prototype.getCaptureExtras = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, __assign({}, this.extras)];
            });
        });
    };
    return WebviewRunnerImpl;
}());
export { WebviewRunnerImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy1ydW5uZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hdXRoL3V0aWwvd2Vidmlldy1zZXNzaW9uLXByb3ZpZGVyL2ltcGwvd2Vidmlldy1ydW5uZXItaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBQyx1Q0FBdUMsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQy9HLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0M7SUFBQTtRQUNZLFdBQU0sR0FBNEIsRUFBRSxDQUFDO1FBQ3JDLGFBQVEsR0FBNEIsRUFBRSxDQUFDO0lBd01uRCxDQUFDO0lBL0xVLDBCQUFRLEdBQWYsVUFBZ0IsSUFBWSxFQUFFLElBQVksRUFBRSxNQUErQjtRQUN2RSxPQUFPLEtBQUcsSUFBSSxHQUFHLElBQUksU0FBSSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDO0lBQ3BELENBQUM7SUFFTSwyREFBK0IsR0FBdEM7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSx1Q0FBdUMsQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1NBQzlIO2dDQUVVLEdBQUc7WUFDVixJQUFJLE9BQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELE9BQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQWMsQ0FBQyxPQUFP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QUNoRTtnQkFFRCxzQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDOzs7S0FDL0I7SUFFSyx3Q0FBWSxHQUFsQjs7O2dCQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7O0tBQ3RCO0lBRUssc0NBQVUsR0FBaEIsVUFBaUIsRUFBcUY7WUFBcEYsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsTUFBTSxZQUFBOzs7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNwQixNQUFNLElBQUksdUNBQXVDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztpQkFDdkY7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO29CQUNoQyxJQUFJLEVBQUUsMkRBQzhCLEdBQUcsR0FBRyxJQUFHLEtBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFHLENBQUEsR0FBRyxHQUFHLEdBQUcsNkJBQzVGO2lCQUNoQixDQUFDLENBQUM7Ozs7S0FDTjtJQUVLLG1DQUFPLEdBQWI7OztnQkFDSSxtQ0FBVyxJQUFJLENBQUMsUUFBUSxHQUFFOzs7S0FDN0I7SUFFSyxnQ0FBSSxHQUFWOzs7Z0JBQ0ksbUJBQVUsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O0tBQzVCO0lBRUssNENBQWdCLEdBQXRCOzs7Z0JBQ0ksbUNBQVcsSUFBSSxDQUFDLE1BQU0sR0FBRTs7O0tBQzNCO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBMU1ELElBME1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtXZWJ2aWV3UnVubmVyfSBmcm9tICcuLi9kZWYvd2Vidmlldy1ydW5uZXInO1xuaW1wb3J0ICogYXMgcXMgZnJvbSAncXMnO1xuaW1wb3J0IHt6aXAsIHJhY2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtOb0luYXBwYnJvd3NlclNlc3Npb25Bc3NlcnRpb25GYWlsRXJyb3J9IGZyb20gJy4uL2Vycm9ycy9uby1pbmFwcGJyb3dzZXItc2Vzc2lvbi1hc3NlcnRpb24tZmFpbC1lcnJvcic7XG5pbXBvcnQge1BhcmFtTm90Q2FwdHVyZWRFcnJvcn0gZnJvbSAnLi4vZXJyb3JzL3BhcmFtLW5vdC1jYXB0dXJlZC1lcnJvcic7XG5pbXBvcnQgeyB0YWtlLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIFdlYnZpZXdSdW5uZXJJbXBsIGltcGxlbWVudHMgV2Vidmlld1J1bm5lciB7XG4gICAgcHJpdmF0ZSBleHRyYXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcHJpdmF0ZSBjYXB0dXJlZDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBwcml2YXRlIGluQXBwQnJvd3Nlcj86IHtcbiAgICAgICAgcmVmOiBJbkFwcEJyb3dzZXJTZXNzaW9uO1xuICAgICAgICBsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgIGxvYWRzdGFydDogU2V0PGFueT47XG4gICAgICAgICAgICBleGl0OiBTZXQ8YW55PjtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGJ1aWxkVXJsKGhvc3Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBwYXJhbXM6IHsgW3A6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgICAgIHJldHVybiBgJHtob3N0fSR7cGF0aH0/JHtxcy5zdHJpbmdpZnkocGFyYW1zKX1gO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldEluQXBwQnJvd3NlckV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5BcHBCcm93c2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9JbmFwcGJyb3dzZXJTZXNzaW9uQXNzZXJ0aW9uRmFpbEVycm9yKCdJbkFwcEJyb3dzZXIgU2Vzc2lvbiBub3QgZm91bmQgd2hlbiByZXNldEluQXBwQnJvd3NlckV2ZW50TGlzdGVuZXJzKCknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaW5BcHBCcm93c2VyLmxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5BcHBCcm93c2VyLmxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5BcHBCcm93c2VyLmxpc3RlbmVyc1trZXldIGFzIFNldDxhbnk+KS5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluQXBwQnJvd3NlciEucmVmLnJlbW92ZUV2ZW50TGlzdGVuZXIoa2V5IGFzIGFueSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgKHRoaXMuaW5BcHBCcm93c2VyLmxpc3RlbmVyc1trZXldIGFzIFNldDxhbnk+KS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbGF1bmNoV2Vidmlldyh7IGhvc3QsIHBhdGgsIHBhcmFtcyB9OiB7IGhvc3Q6IHN0cmluZzsgcGF0aDogc3RyaW5nOyBwYXJhbXM6IHsgW3A6IHN0cmluZ106IHN0cmluZyB9IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5pbkFwcEJyb3dzZXIgPSB7XG4gICAgICAgICAgICByZWY6IGNvcmRvdmEuSW5BcHBCcm93c2VyLm9wZW4oXG4gICAgICAgICAgICAgICAgV2Vidmlld1J1bm5lckltcGwuYnVpbGRVcmwoaG9zdCwgcGF0aCwgcGFyYW1zKSxcbiAgICAgICAgICAgICAgICAnX2JsYW5rJyxcbiAgICAgICAgICAgICAgICAnem9vbT1ubyxjbGVhcmNhY2hlPXllcyxjbGVhcnNlc3Npb25jYWNoZT15ZXMsY2xlYXJkYXRhPXllcydcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICBsb2Fkc3RhcnQ6IG5ldyBTZXQoKSxcbiAgICAgICAgICAgICAgICBleGl0OiBuZXcgU2V0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbkV4aXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0SW5BcHBCcm93c2VyRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5BcHBCcm93c2VyID0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaW5BcHBCcm93c2VyLmxpc3RlbmVycy5leGl0LmFkZChvbkV4aXQpO1xuICAgICAgICB0aGlzLmluQXBwQnJvd3Nlci5yZWYuYWRkRXZlbnRMaXN0ZW5lcignZXhpdCcsIG9uRXhpdCk7XG4gICAgfVxuXG4gICAgYXN5bmMgY2xvc2VXZWJ2aWV3KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5BcHBCcm93c2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9JbmFwcGJyb3dzZXJTZXNzaW9uQXNzZXJ0aW9uRmFpbEVycm9yKCdJbkFwcEJyb3dzZXIgU2Vzc2lvbiBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5BcHBCcm93c2VyLnJlZi5jbG9zZSgpO1xuICAgIH1cblxuICAgIGFueTxUPiguLi5hcmdzOiBQcm9taXNlPFQ+W10pOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHJhY2UoXG4gICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBhbGwoLi4uYXJnczogUHJvbWlzZTxhbnk+W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBsYXVuY2hDdXN0b21UYWIoe2hvc3QsIHBhdGgsIHBhcmFtcywgZXh0cmFQYXJhbXN9OiB7IGhvc3Q6IHN0cmluZzsgcGF0aDogc3RyaW5nOyBwYXJhbXM6IHsgW3A6IHN0cmluZ106IHN0cmluZyB9OyBleHRyYVBhcmFtczogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgdXJsID0gV2Vidmlld1J1bm5lckltcGwuYnVpbGRVcmwoaG9zdCwgcGF0aCwgcGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY3VzdG9tdGFicy5pc0F2YWlsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY3VzdG9tVGFicyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICBjdXN0b210YWJzLmxhdW5jaCh1cmwsIHJlc29sdmVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuY2FwdHVyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5xcy5wYXJzZShyZXNvbHZlZClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdXN0b210YWJzLmxhdW5jaEluQnJvd3Nlcih1cmwsIGV4dHJhUGFyYW1zLCByZXNvbHZlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdHVyZWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNhcHR1cmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ucXMucGFyc2UocmVzb2x2ZWQpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FwdHVyZSh7aG9zdCwgcGF0aCwgcGFyYW1zfTogeyBob3N0OiBzdHJpbmc7IHBhdGg6IHN0cmluZzsgcGFyYW1zOiB7IGtleTogc3RyaW5nOyByZXNvbHZlVG86IHN0cmluZywgbWF0Y2g/OiBzdHJpbmcsIGV4aXN0cz86ICd0cnVlJyB8ICdmYWxzZScgfVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluQXBwQnJvd3Nlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vSW5hcHBicm93c2VyU2Vzc2lvbkFzc2VydGlvbkZhaWxFcnJvcignSW5BcHBCcm93c2VyIFNlc3Npb24gbm90IGZvdW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc0hvc3RNYXRjaGluZyA9ICh1cmw6IFVSTCkgPT4gdXJsLm9yaWdpbiA9PT0gaG9zdDtcbiAgICAgICAgY29uc3QgaXNQYXRoTWF0Y2hpbmcgPSAodXJsOiBVUkwpID0+IHVybC5wYXRobmFtZSA9PT0gcGF0aDtcbiAgICAgICAgY29uc3QgYXJlUGFyYW1zTWF0Y2hpbmcgPSAodXJsOiBVUkwpID0+IHBhcmFtcy5tYXAocCA9PiBwKS5ldmVyeShwYXJhbSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW0uZXhpc3RzID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF1cmwuc2VhcmNoUGFyYW1zLmhhcyhwYXJhbS5rZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0ubWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuaGFzKHBhcmFtLmtleSkgJiYgdXJsLnNlYXJjaFBhcmFtcy5nZXQocGFyYW0ua2V5KSA9PT0gcGFyYW0ubWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuaGFzKHBhcmFtLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb25Mb2FkU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZXZlbnQudXJsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0hvc3RNYXRjaGluZyh1cmwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhdGhNYXRjaGluZyh1cmwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVQYXJhbXNNYXRjaGluZyh1cmwpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmNhcHR1cmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtcy5yZWR1Y2U8eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfT4oKGFjYywgcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NbcC5yZXNvbHZlVG9dID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQocC5rZXkpITtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dHJhcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm1hcChwID0+IHAua2V5KS5mb3JFYWNoKHBhcmFtID0+IHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKHBhcmFtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zWydmb3JFYWNoJ10oKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXh0cmFzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pbkFwcEJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluQXBwQnJvd3Nlci5saXN0ZW5lcnMubG9hZHN0YXJ0LmRlbGV0ZShvbkxvYWRTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbkFwcEJyb3dzZXIucmVmLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIG9uTG9hZFN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5BcHBCcm93c2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbkFwcEJyb3dzZXIubGlzdGVuZXJzLmxvYWRzdGFydC5hZGQob25Mb2FkU3RhcnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5BcHBCcm93c2VyLnJlZi5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBvbkxvYWRTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIHJlc29sdmVDYXB0dXJlZChwYXJhbTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNhcHR1cmVkW3BhcmFtXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcmFtTm90Q2FwdHVyZWRFcnJvcihgJHtwYXJhbX0gd2FzIG5vdCBjYXB0dXJlZGApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FwdHVyZWRbcGFyYW1dO1xuICAgIH1cblxuICAgIGFzeW5jIGNsZWFyQ2FwdHVyZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5jYXB0dXJlZCA9IHt9O1xuICAgIH1cblxuICAgIGFzeW5jIHJlZGlyZWN0VG8oe2hvc3QsIHBhdGgsIHBhcmFtc306IHsgaG9zdDogc3RyaW5nOyBwYXRoOiBzdHJpbmc7IHBhcmFtczogeyBbcDogc3RyaW5nXTogc3RyaW5nIH0gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5BcHBCcm93c2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9JbmFwcGJyb3dzZXJTZXNzaW9uQXNzZXJ0aW9uRmFpbEVycm9yKCdJbkFwcEJyb3dzZXIgU2Vzc2lvbiBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5BcHBCcm93c2VyLnJlZi5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgICAgIGNvZGU6IGAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgICsgJ2AnICsgYCR7V2Vidmlld1J1bm5lckltcGwuYnVpbGRVcmwoaG9zdCwgcGF0aCwgcGFyYW1zKX1gICsgJ2AnICsgYDtcbiAgICAgICAgICAgICAgICAgICAgfSkoKWBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3VjY2VzcygpOiBQcm9taXNlPHsgW3A6IHN0cmluZ106IHN0cmluZyB9PiB7XG4gICAgICAgIHJldHVybiB7Li4udGhpcy5jYXB0dXJlZH07XG4gICAgfVxuXG4gICAgYXN5bmMgZmFpbCgpOiBQcm9taXNlPHsgW3A6IHN0cmluZ106IHN0cmluZyB9PiB7XG4gICAgICAgIHRocm93IHsuLi50aGlzLmNhcHR1cmVkfTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDYXB0dXJlRXh0cmFzKCk6IFByb21pc2U8eyBbcDogc3RyaW5nXTogc3RyaW5nIH0+IHtcbiAgICAgICAgcmV0dXJuIHsuLi50aGlzLmV4dHJhc307XG4gICAgfVxufVxuIl19