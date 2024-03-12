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
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../../injection-tokens';
import { DbService } from '../../../db';
import { NetworkQueueEntry } from '../db/schema';
import { Request } from '../..';
import { Observable } from 'rxjs';
import { ApiKeys, AuthKeys } from '../../../preference-keys';
import { map, mergeMap } from 'rxjs/operators';
var NetworkQueueImpl = /** @class */ (function () {
    function NetworkQueueImpl(dbService, sharedPreferences, deviceInfo, sdkConfig) {
        this.dbService = dbService;
        this.sharedPreferences = sharedPreferences;
        this.deviceInfo = deviceInfo;
        this.sdkConfig = sdkConfig;
    }
    NetworkQueueImpl.prototype.enqueue = function (request, shouldSync) {
        var _this = this;
        var body = this.getTypeOf(request.networkRequest.body) === 'Uint8Array' ?
            request.networkRequest.body['buffer'] : request.networkRequest.body;
        return new Observable(function (observer) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = request;
                            return [4 /*yield*/, this.interceptRequest(request.networkRequest).toPromise()];
                        case 1:
                            _a.networkRequest = _b.sent();
                            sbsync.enqueue(body, NetworkQueueEntry.Mapper.networkQueueRequestToEntry(request), shouldSync, function () {
                                observer.next(undefined);
                                observer.complete();
                            }, function (err) {
                                observer.error(err);
                            });
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
    };
    NetworkQueueImpl.prototype.interceptRequest = function (request) {
        var _this = this;
        return this.sharedPreferences.getString(ApiKeys.KEY_API_TOKEN)
            .pipe(map(function (bearerToken) {
            if (bearerToken) {
                var existingHeaders = request.headers;
                existingHeaders['Authorization'] = "Bearer " + bearerToken;
                request.headers = existingHeaders;
            }
            return request;
        }), mergeMap(function () {
            return _this.sharedPreferences.getString(AuthKeys.KEY_OAUTH_SESSION)
                .pipe(map(function (stringifiedSessionData) {
                if (stringifiedSessionData) {
                    var sessionData = JSON.parse(stringifiedSessionData);
                    var existingHeaders = request.headers;
                    existingHeaders['X-Authenticated-User-Token'] = sessionData.access_token;
                    if (sessionData.managed_access_token) {
                        existingHeaders['X-Authenticated-For'] = sessionData.managed_access_token;
                    }
                    request.headers = existingHeaders;
                }
                return request;
            }));
        }), map(function () {
            request.headers['X-Channel-Id'] = _this.sdkConfig.apiConfig.api_authentication.channelId;
            request.headers['X-App-Id'] = _this.sdkConfig.apiConfig.api_authentication.producerId;
            request.headers['X-Device-Id'] = _this.deviceInfo.getDeviceID();
            request.headers['Accept'] = 'application/json';
            request.headers['Content-Type'] = 'application/json';
            request.headers['Access-Control-Allow-Origin'] = '*';
            request.body = {};
            var apiRequest = new Request.Builder()
                .withSerializer(request.serializer)
                .withHost(_this.sdkConfig.apiConfig.host)
                .withType(request.type)
                .withPath(request.path)
                .withHeaders(request.headers)
                .withBody({})
                .withBearerToken(true)
                .build();
            return apiRequest;
        }));
    };
    NetworkQueueImpl.prototype.getTypeOf = function (object) {
        switch (Object.prototype.toString.call(object)) {
            case '[object Uint8Array]':
                return 'Uint8Array';
            default:
                return 'Unknown';
        }
    };
    NetworkQueueImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(2, inject(InjectionTokens.DEVICE_INFO)),
        __param(3, inject(InjectionTokens.SDK_CONFIG)),
        __metadata("design:paramtypes", [DbService, Object, Object, Object])
    ], NetworkQueueImpl);
    return NetworkQueueImpl;
}());
export { NetworkQueueImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1xdWV1ZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9uZXR3b3JrLXF1ZXVlL2ltcGwvbmV0d29yay1xdWV1ZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQTRCLE9BQU8sRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN6RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU83QztJQUNFLDBCQUM4QyxTQUFvQixFQUNaLGlCQUFvQyxFQUMzQyxVQUFzQixFQUN2QixTQUFvQjtRQUhwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ1osc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUMzQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFFbEUsQ0FBQztJQUVELGtDQUFPLEdBQVAsVUFBUSxPQUE0QixFQUFFLFVBQW1CO1FBQXpELGlCQWdCQztRQWZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQztZQUN6RSxP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QUF6RkQsSUF5RkM7U0F6RlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGluamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vZGInO1xuaW1wb3J0IHtOZXR3b3JrUXVldWVFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlLCBOZXR3b3JrUXVldWVSZXF1ZXN0fSBmcm9tICcuLi9kZWYvbmV0d29yay1xdWV1ZSc7XG5pbXBvcnQge1JlcXVlc3QgYXMgTmV0d29ya1JlcXVlc3QsIFJlcXVlc3R9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FwaUtleXMsIEF1dGhLZXlzfSBmcm9tICcuLi8uLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHttYXAsIG1lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge09BdXRoU2Vzc2lvbn0gZnJvbSAnLi4vLi4vLi4vYXV0aCc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi8uLi9zZGstY29uZmlnJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5ldHdvcmtRdWV1ZUltcGwgaW1wbGVtZW50cyBOZXR3b3JrUXVldWUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREVWSUNFX0lORk8pIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbyxcbiAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TREtfQ09ORklHKSBwcml2YXRlIHNka0NvbmZpZzogU2RrQ29uZmlnLFxuICApIHtcbiAgfVxuXG4gIGVucXVldWUocmVxdWVzdDogTmV0d29ya1F1ZXVlUmVxdWVzdCwgc2hvdWxkU3luYzogYm9vbGVhbik6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuZ2V0VHlwZU9mKHJlcXVlc3QubmV0d29ya1JlcXVlc3QuYm9keSkgPT09ICdVaW50OEFycmF5JyA/XG4gICAgICByZXF1ZXN0Lm5ldHdvcmtSZXF1ZXN0LmJvZHlbJ2J1ZmZlciddIDogcmVxdWVzdC5uZXR3b3JrUmVxdWVzdC5ib2R5O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QubmV0d29ya1JlcXVlc3QgPSBhd2FpdCB0aGlzLmludGVyY2VwdFJlcXVlc3QocmVxdWVzdC5uZXR3b3JrUmVxdWVzdCkudG9Qcm9taXNlKCk7XG4gICAgICAgIHNic3luYy5lbnF1ZXVlKGJvZHksIE5ldHdvcmtRdWV1ZUVudHJ5Lk1hcHBlci5uZXR3b3JrUXVldWVSZXF1ZXN0VG9FbnRyeShyZXF1ZXN0KSwgc2hvdWxkU3luYywgKCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGludGVyY2VwdFJlcXVlc3QocmVxdWVzdDogUmVxdWVzdCk6IE9ic2VydmFibGU8TmV0d29ya1JlcXVlc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoQXBpS2V5cy5LRVlfQVBJX1RPS0VOKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoYmVhcmVyVG9rZW4pID0+IHtcbiAgICAgICAgICBpZiAoYmVhcmVyVG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycztcbiAgICAgICAgICAgIGV4aXN0aW5nSGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke2JlYXJlclRva2VufWA7XG4gICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSBleGlzdGluZ0hlYWRlcnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH0pLFxuICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEF1dGhLZXlzLktFWV9PQVVUSF9TRVNTSU9OKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgoc3RyaW5naWZpZWRTZXNzaW9uRGF0YT86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdpZmllZFNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uRGF0YTogT0F1dGhTZXNzaW9uID0gSlNPTi5wYXJzZShzdHJpbmdpZmllZFNlc3Npb25EYXRhKTtcblxuICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdIZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzO1xuICAgICAgICAgICAgICAgICAgZXhpc3RpbmdIZWFkZXJzWydYLUF1dGhlbnRpY2F0ZWQtVXNlci1Ub2tlbiddID0gc2Vzc2lvbkRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25EYXRhLm1hbmFnZWRfYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nSGVhZGVyc1snWC1BdXRoZW50aWNhdGVkLUZvciddID0gc2Vzc2lvbkRhdGEubWFuYWdlZF9hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IGV4aXN0aW5nSGVhZGVycztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1snWC1DaGFubmVsLUlkJ10gPSB0aGlzLnNka0NvbmZpZy5hcGlDb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLmNoYW5uZWxJZDtcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbJ1gtQXBwLUlkJ10gPSB0aGlzLnNka0NvbmZpZy5hcGlDb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLnByb2R1Y2VySWQ7XG4gICAgICAgICAgcmVxdWVzdC5oZWFkZXJzWydYLURldmljZS1JZCddID0gdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCk7XG4gICAgICAgICAgcmVxdWVzdC5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1snQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJ10gPSAnKic7XG4gICAgICAgICAgcmVxdWVzdC5ib2R5ID0ge307XG4gICAgICAgICAgY29uc3QgYXBpUmVxdWVzdDogUmVxdWVzdCA9IG5ldyBSZXF1ZXN0LkJ1aWxkZXIoKVxuICAgICAgICAgICAgLndpdGhTZXJpYWxpemVyKHJlcXVlc3Quc2VyaWFsaXplcilcbiAgICAgICAgICAgIC53aXRoSG9zdCh0aGlzLnNka0NvbmZpZy5hcGlDb25maWcuaG9zdClcbiAgICAgICAgICAgIC53aXRoVHlwZShyZXF1ZXN0LnR5cGUpXG4gICAgICAgICAgICAud2l0aFBhdGgocmVxdWVzdC5wYXRoKVxuICAgICAgICAgICAgLndpdGhIZWFkZXJzKHJlcXVlc3QuaGVhZGVycylcbiAgICAgICAgICAgIC53aXRoQm9keSh7fSlcbiAgICAgICAgICAgIC53aXRoQmVhcmVyVG9rZW4odHJ1ZSlcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgICAgICAgIHJldHVybiBhcGlSZXF1ZXN0O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHlwZU9mKG9iamVjdCkge1xuICAgIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkpIHtcbiAgICAgIGNhc2UgJ1tvYmplY3QgVWludDhBcnJheV0nOlxuICAgICAgICByZXR1cm4gJ1VpbnQ4QXJyYXknO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==