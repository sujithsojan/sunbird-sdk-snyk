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
import { inject, injectable } from "inversify";
import { Observable, of } from "rxjs";
import { InjectionTokens } from "../../injection-tokens";
import { DebuggingDurationHandler } from "../handler/debugging-duration-handler";
import { CsClientStorage } from "@project-sunbird/client-services/core";
import { JwtUtil } from "../../util/jwt-util";
var DebuggingServiceImpl = /** @class */ (function () {
    function DebuggingServiceImpl(sharedPreferences, profileService) {
        this.sharedPreferences = sharedPreferences;
        this.profileService = profileService;
        this.watcher = {
            interval: null,
            observer: null,
            debugStatus: false
        };
    }
    Object.defineProperty(DebuggingServiceImpl.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (userId) {
            this._userId = userId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebuggingServiceImpl.prototype, "deviceId", {
        get: function () {
            return this._deviceId;
        },
        set: function (deviceId) {
            this._deviceId = deviceId;
        },
        enumerable: false,
        configurable: true
    });
    DebuggingServiceImpl.prototype.enableDebugging = function (traceID) {
        var _this = this;
        /* TODO
         * generateJWT token and set it
         * set startTimestamp store it in preferences
         * start a check every 5min to check expiry
         * if expired then reset the destory the JWT token
         */
        return new Observable(function (observer) {
            _this.profileService.getActiveProfileSession().toPromise().then(function (profile) { return __awaiter(_this, void 0, void 0, function () {
                var _jwt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(profile === null || profile === void 0 ? void 0 : profile.uid)) return [3 /*break*/, 6];
                            this._userId = profile.uid;
                            return [4 /*yield*/, JwtUtil.createJWTToken(this._deviceId, this.userId)];
                        case 1:
                            _jwt = _a.sent();
                            if (!traceID) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sharedPreferences.putString(CsClientStorage.TRACE_ID, traceID).toPromise()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.sharedPreferences.putString(CsClientStorage.TRACE_ID, _jwt).toPromise()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            new DebuggingDurationHandler(this.sharedPreferences, this).handle(observer);
                            console.log('Watcher Value:', this.watcher);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    DebuggingServiceImpl.prototype.disableDebugging = function () {
        if (this.watcher.debugStatus) {
            clearTimeout(this.watcher.interval);
            this.watcher.observer.complete();
            this.watcher = {
                interval: null,
                observer: null,
                debugStatus: false
            };
            this.sharedPreferences.putString('debug_started_at', '').toPromise();
            this.sharedPreferences.putString(CsClientStorage.TRACE_ID, '').toPromise();
            return of(true);
        }
        return of(false);
    };
    DebuggingServiceImpl.prototype.isDebugOn = function () {
        if (this.watcher.debugStatus) {
            return true;
        }
        else {
            return false;
        }
    };
    DebuggingServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(1, inject(InjectionTokens.PROFILE_SERVICE)),
        __metadata("design:paramtypes", [Object, Object])
    ], DebuggingServiceImpl);
    return DebuggingServiceImpl;
}());
export { DebuggingServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdnaW4tc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlYnVnZ2luZy9pbXBsL2RlYnVnZ2luLXNlcnZpY2UtaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFakYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc5QztJQXFCSSw4QkFDd0QsaUJBQW9DLEVBQ3ZDLGNBQThCO1FBRDNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdkMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRS9FLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEtBQUs7U0FDckIsQ0FBQztJQUNOLENBQUM7SUF6QkQsc0JBQUksd0NBQU07YUFJVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO2FBTkQsVUFBVyxNQUFNO1lBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSwwQ0FBUTthQUlaO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFORCxVQUFhLFFBQVE7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFpQkQsOENBQWUsR0FBZixVQUFnQixPQUFnQjtRQUFoQyxpQkF5QkM7UUF4Qkc7Ozs7O1dBS0c7UUFDSCxPQUFPLElBQUksVUFBVSxDQUFVLFVBQUEsUUFBUTtZQUNuQyxLQUFJLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQU8sT0FBTzs7Ozs7a0NBQ3JFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHOzRCQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs0QkFDZCxxQkFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs0QkFBaEUsSUFBSSxHQUFHLFNBQXlEO2lDQUNsRSxPQUFPLEVBQVAsd0JBQU87NEJBQ1AscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzs0QkFBckYsU0FBcUYsQ0FBQzs7Z0NBRXRGLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7NEJBQWxGLFNBQWtGLENBQUM7Ozs0QkFFdkYsSUFBSSx3QkFBd0IsQ0FDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUN0QixJQUFJLENBQ1AsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztpQkFFbkQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUMxQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFBRSxLQUFLO2FBQ3JCLENBQUM7WUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjtRQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCx3Q0FBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFqRlEsb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtRQXVCSixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7O09BdkJuQyxvQkFBb0IsQ0FtRmhDO0lBQUQsMkJBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQW5GWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tIFwiaW52ZXJzaWZ5XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbnMgfSBmcm9tIFwiLi4vLi4vaW5qZWN0aW9uLXRva2Vuc1wiO1xuaW1wb3J0IHsgRGVidWdnaW5nU2VydmljZSwgRGVidWdXYXRjaGVyIH0gZnJvbSBcIi4uL2RlZi9kZWJ1Z2dpbmctc2VydmljZVwiO1xuaW1wb3J0IHsgU2hhcmVkUHJlZmVyZW5jZXMgfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQgeyBEZWJ1Z2dpbmdEdXJhdGlvbkhhbmRsZXIgfSBmcm9tIFwiLi4vaGFuZGxlci9kZWJ1Z2dpbmctZHVyYXRpb24taGFuZGxlclwiO1xuaW1wb3J0IHsgUHJvZmlsZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vcHJvZmlsZVwiO1xuaW1wb3J0IHsgQ3NDbGllbnRTdG9yYWdlIH0gZnJvbSBcIkBwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL2NvcmVcIjtcbmltcG9ydCB7IEp3dFV0aWwgfSBmcm9tIFwiLi4vLi4vdXRpbC9qd3QtdXRpbFwiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVidWdnaW5nU2VydmljZUltcGwgaW1wbGVtZW50cyBEZWJ1Z2dpbmdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX3VzZXJJZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RldmljZUlkOiBzdHJpbmc7XG4gICAgcHVibGljIHdhdGNoZXI6IERlYnVnV2F0Y2hlcjtcbiAgICBzZXQgdXNlcklkKHVzZXJJZCkge1xuICAgICAgICB0aGlzLl91c2VySWQgPSB1c2VySWQ7XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJJZDtcbiAgICB9XG5cbiAgICBzZXQgZGV2aWNlSWQoZGV2aWNlSWQpIHtcbiAgICAgICAgdGhpcy5fZGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgICB9XG5cbiAgICBnZXQgZGV2aWNlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZXZpY2VJZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKSBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKSBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLndhdGNoZXIgPSB7XG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcbiAgICAgICAgICAgIG9ic2VydmVyOiBudWxsLFxuICAgICAgICAgICAgZGVidWdTdGF0dXM6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZW5hYmxlRGVidWdnaW5nKHRyYWNlSUQ/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgLyogVE9ET1xuICAgICAgICAgKiBnZW5lcmF0ZUpXVCB0b2tlbiBhbmQgc2V0IGl0XG4gICAgICAgICAqIHNldCBzdGFydFRpbWVzdGFtcCBzdG9yZSBpdCBpbiBwcmVmZXJlbmNlc1xuICAgICAgICAgKiBzdGFydCBhIGNoZWNrIGV2ZXJ5IDVtaW4gdG8gY2hlY2sgZXhwaXJ5XG4gICAgICAgICAqIGlmIGV4cGlyZWQgdGhlbiByZXNldCB0aGUgZGVzdG9yeSB0aGUgSldUIHRva2VuXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnRvUHJvbWlzZSgpLnRoZW4oYXN5bmMgKHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvZmlsZT8udWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJJZCA9IHByb2ZpbGUudWlkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfand0ID0gYXdhaXQgSnd0VXRpbC5jcmVhdGVKV1RUb2tlbih0aGlzLl9kZXZpY2VJZCwgdGhpcy51c2VySWQpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZUlEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhDc0NsaWVudFN0b3JhZ2UuVFJBQ0VfSUQsIHRyYWNlSUQpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQ3NDbGllbnRTdG9yYWdlLlRSQUNFX0lELCBfand0KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXcgRGVidWdnaW5nRHVyYXRpb25IYW5kbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgKS5oYW5kbGUob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV2F0Y2hlciBWYWx1ZTonLCB0aGlzLndhdGNoZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlRGVidWdnaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAodGhpcy53YXRjaGVyLmRlYnVnU3RhdHVzKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy53YXRjaGVyLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hlci5vYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy53YXRjaGVyID0ge1xuICAgICAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxuICAgICAgICAgICAgICAgIG9ic2VydmVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGRlYnVnU3RhdHVzOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKCdkZWJ1Z19zdGFydGVkX2F0JywgJycpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQ3NDbGllbnRTdG9yYWdlLlRSQUNFX0lELCAnJykudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBpc0RlYnVnT24oKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLndhdGNoZXIuZGVidWdTdGF0dXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19