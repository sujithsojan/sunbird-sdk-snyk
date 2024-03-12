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
import { AppInfoKeys } from '../../../preference-keys';
import { map } from 'rxjs/operators';
import { CsModule } from '@project-sunbird/client-services';
var AppInfoImpl = /** @class */ (function () {
    function AppInfoImpl(sdkConfig, sharedPreferences) {
        var _this = this;
        this.sdkConfig = sdkConfig;
        this.sharedPreferences = sharedPreferences;
        if (sdkConfig.platform !== 'cordova') {
            this.versionName = 'sunbird-debug';
        }
        cordova.getAppVersion.getAppName(function (appName) { return _this.appName = appName; });
    }
    AppInfoImpl.prototype.getVersionName = function () {
        return this.versionName;
    };
    AppInfoImpl.prototype.getAppName = function () {
        return this.appName;
    };
    AppInfoImpl.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packageName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setFirstAccessTimestamp()];
                    case 1:
                        _a.sent();
                        if (this.sdkConfig.platform !== 'cordova') {
                            return [2 /*return*/, undefined];
                        }
                        packageName = this.sdkConfig.appConfig.buildConfigPackage ? this.sdkConfig.appConfig.buildConfigPackage : 'org.sunbird.app';
                        return [2 /*return*/, this.getBuildConfigValue(packageName, 'REAL_VERSION_NAME')
                                .then(function (versionName) {
                                _this.versionName = versionName;
                                if (CsModule.instance.isInitialised) {
                                    CsModule.instance.updateConfig(__assign(__assign({}, CsModule.instance.config), { core: __assign(__assign({}, CsModule.instance.config.core), { global: __assign(__assign({}, CsModule.instance.config.core.global), { appVersion: versionName }) }) }));
                                }
                                console.log('version name', _this.versionName);
                                return;
                            })];
                }
            });
        });
    };
    /** @internal */
    AppInfoImpl.prototype.getBuildConfigValue = function (packageName, property) {
        return new Promise(function (resolve, reject) {
            try {
                sbutility.getBuildConfigValue(packageName, property, function (entry) {
                    resolve(entry);
                }, function (err) {
                    console.error(err);
                    reject(err);
                });
            }
            catch (xc) {
                console.error(xc);
                reject(xc);
            }
        });
    };
    /** @internal */
    AppInfoImpl.prototype.getFirstAccessTimestamp = function () {
        return this.sharedPreferences.getString(AppInfoKeys.KEY_FIRST_ACCESS_TIMESTAMP)
            .pipe(map(function (ts) { return ts; }));
    };
    AppInfoImpl.prototype.setFirstAccessTimestamp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.getString(AppInfoKeys.KEY_FIRST_ACCESS_TIMESTAMP).toPromise()];
                    case 1:
                        timestamp = _a.sent();
                        if (!!timestamp) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sharedPreferences.putString(AppInfoKeys.KEY_FIRST_ACCESS_TIMESTAMP, Date.now() + '').toPromise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    AppInfoImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Object, Object])
    ], AppInfoImpl);
    return AppInfoImpl;
}());
export { AppInfoImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWluZm8taW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2FwcC9pbXBsL2FwcC1pbmZvLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFHMUQ7SUFLSSxxQkFDZ0QsU0FBb0IsRUFDWixpQkFBb0M7UUFGNUYsaUJBUUM7UUFQK0MsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNaLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFeEYsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztTQUN0QztRQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQXRCLENBQXNCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsZ0NBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRVksMEJBQUksR0FBakI7Ozs7Ozs0QkFDSSxxQkFBTSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBQTs7d0JB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QUFDLGtCQUFrQixDQUFDLENBQUE7O09BUHRDLFdBQVcsQ0FrRnZCO0lBQUQsa0JBQUM7Q0FBQSxBQWxGRCxJQWtGQztTQWxGWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtBcHBJbmZvfSBmcm9tICcuLic7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge0FwcEluZm9LZXlzfSBmcm9tICcuLi8uLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0NzTW9kdWxlfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBJbmZvSW1wbCBpbXBsZW1lbnRzIEFwcEluZm8ge1xuXG4gICAgcHJpdmF0ZSB2ZXJzaW9uTmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgYXBwTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXNcbiAgICApIHtcbiAgICAgICAgaWYgKHNka0NvbmZpZy5wbGF0Zm9ybSAhPT0gJ2NvcmRvdmEnKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb25OYW1lID0gJ3N1bmJpcmQtZGVidWcnO1xuICAgICAgICB9XG4gICAgICAgIGNvcmRvdmEuZ2V0QXBwVmVyc2lvbi5nZXRBcHBOYW1lKChhcHBOYW1lKSA9PiB0aGlzLmFwcE5hbWUgPSBhcHBOYW1lKTtcbiAgICB9XG5cbiAgICBnZXRWZXJzaW9uTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uTmFtZTtcbiAgICB9XG5cbiAgICBnZXRBcHBOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcE5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0Rmlyc3RBY2Nlc3NUaW1lc3RhbXAoKTtcbiAgICAgICAgaWYgKHRoaXMuc2RrQ29uZmlnLnBsYXRmb3JtICE9PSAnY29yZG92YScpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFja2FnZU5hbWUgPSB0aGlzLnNka0NvbmZpZy5hcHBDb25maWcuYnVpbGRDb25maWdQYWNrYWdlID8gdGhpcy5zZGtDb25maWcuYXBwQ29uZmlnLmJ1aWxkQ29uZmlnUGFja2FnZSA6ICdvcmcuc3VuYmlyZC5hcHAnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWlsZENvbmZpZ1ZhbHVlKHBhY2thZ2VOYW1lLCAnUkVBTF9WRVJTSU9OX05BTUUnKVxuICAgICAgICAgICAgLnRoZW4oKHZlcnNpb25OYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uTmFtZSA9IHZlcnNpb25OYW1lO1xuICAgICAgICAgICAgICAgIGlmIChDc01vZHVsZS5pbnN0YW5jZS5pc0luaXRpYWxpc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIENzTW9kdWxlLmluc3RhbmNlLnVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5Dc01vZHVsZS5pbnN0YW5jZS5jb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uQ3NNb2R1bGUuaW5zdGFuY2UuY29uZmlnLmNvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLkNzTW9kdWxlLmluc3RhbmNlLmNvbmZpZy5jb3JlLmdsb2JhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbjogdmVyc2lvbk5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmVyc2lvbiBuYW1lJywgdGhpcy52ZXJzaW9uTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGdldEJ1aWxkQ29uZmlnVmFsdWUocGFja2FnZU5hbWUsIHByb3BlcnR5KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzYnV0aWxpdHkuZ2V0QnVpbGRDb25maWdWYWx1ZShwYWNrYWdlTmFtZSwgcHJvcGVydHksIChlbnRyeTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoICh4Yykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGMpO1xuICAgICAgICAgICAgICAgIHJlamVjdCh4Yyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBnZXRGaXJzdEFjY2Vzc1RpbWVzdGFtcCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoQXBwSW5mb0tleXMuS0VZX0ZJUlNUX0FDQ0VTU19USU1FU1RBTVApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKHRzKSA9PiB0cyEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2V0Rmlyc3RBY2Nlc3NUaW1lc3RhbXAoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKEFwcEluZm9LZXlzLktFWV9GSVJTVF9BQ0NFU1NfVElNRVNUQU1QKS50b1Byb21pc2UoKTtcbiAgICAgICAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKEFwcEluZm9LZXlzLktFWV9GSVJTVF9BQ0NFU1NfVElNRVNUQU1QLCBEYXRlLm5vdygpICsgJycpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==