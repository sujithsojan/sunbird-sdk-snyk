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
import { defer, iif, of, zip } from 'rxjs';
import { InjectionTokens } from '../../injection-tokens';
import { inject, injectable } from 'inversify';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
var CachedItemStoreImpl = /** @class */ (function () {
    function CachedItemStoreImpl(sdkConfig, keyValueStore, sharedPreferences) {
        this.sdkConfig = sdkConfig;
        this.keyValueStore = keyValueStore;
        this.sharedPreferences = sharedPreferences;
        this.apiConfig = this.sdkConfig.apiConfig;
    }
    CachedItemStoreImpl_1 = CachedItemStoreImpl;
    CachedItemStoreImpl.isItemEmpty = function (item) {
        if (Array.isArray(item) && item.length === 0) {
            return true;
        }
        else if (typeof item === 'object' && Object.keys(item).length === 0) {
            return true;
        }
        return false;
    };
    CachedItemStoreImpl.prototype.get = function (id, noSqlkey, timeToLiveKey, fromServer, initial, timeToLive, emptyCondition) {
        var _this = this;
        return fromServer().pipe(tap(function (response) {
            _this.saveItemTTL(id, timeToLiveKey).toPromise();
            _this.saveItemToDb(id, noSqlkey, response).toPromise();
        }), catchError(function () {
            return _this.getCached(id, noSqlkey, timeToLiveKey, fromServer, initial, timeToLive, emptyCondition);
        }));
    };
    CachedItemStoreImpl.prototype.getCached = function (id, noSqlkey, timeToLiveKey, fromServer, initial, timeToLive, emptyCondition) {
        var _this = this;
        return this.isItemCachedInDb(timeToLiveKey, id).pipe(mergeMap(function (isItemCachedInDb) {
            if (isItemCachedInDb) {
                return _this.isItemTTLExpired(timeToLiveKey, id, !isNaN(timeToLive) ? timeToLive : _this.apiConfig.cached_requests.timeToLive).pipe(mergeMap(function (isItemTTLExpired) {
                    if (isItemTTLExpired) {
                        return _this.keyValueStore.getValue(noSqlkey + '-' + id).pipe(map(function (v) { return JSON.parse(v); }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, fromServer().pipe(switchMap(function (item) {
                                                return _this.saveItem(id, timeToLiveKey, noSqlkey, item, emptyCondition);
                                            })).toPromise()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_1 = _a.sent();
                                        console.error(e_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }));
                    }
                    else {
                        return _this.keyValueStore.getValue(noSqlkey + '-' + id).pipe(map(function (v) { return JSON.parse(v); }));
                    }
                }));
            }
            else {
                if (initial) {
                    return initial().pipe(switchMap(function (item) {
                        return _this.saveItem(id, timeToLiveKey, noSqlkey, item, emptyCondition);
                    }), catchError(function (e) {
                        return fromServer().pipe(switchMap(function (item) {
                            return _this.saveItem(id, timeToLiveKey, noSqlkey, item, emptyCondition);
                        }));
                    }));
                }
                else {
                    return fromServer().pipe(switchMap(function (item) {
                        return _this.saveItem(id, timeToLiveKey, noSqlkey, item, emptyCondition);
                    }));
                }
            }
        }));
    };
    CachedItemStoreImpl.prototype.isItemCachedInDb = function (timeToLiveKey, id) {
        return this.sharedPreferences.getString(timeToLiveKey + '-' + id).pipe(mergeMap(function (ttl) {
            return iif(function () { return !!ttl; }, defer(function () { return of(true); }), defer(function () { return of(false); }));
        }));
    };
    CachedItemStoreImpl.prototype.isItemTTLExpired = function (timeToLiveKey, id, timeToLive) {
        return this.sharedPreferences.getString(timeToLiveKey + '-' + id).pipe(map(function (ttl) {
            var savedTimestamp = Number(ttl);
            var nowTimeStamp = Date.now();
            if (nowTimeStamp - savedTimestamp < timeToLive) {
                return false;
            }
            return true;
        }));
    };
    CachedItemStoreImpl.prototype.saveItem = function (id, timeToLiveKey, noSqlkey, item, emptyCondition) {
        if (CachedItemStoreImpl_1.isItemEmpty(item) || (emptyCondition && emptyCondition(item))) {
            return of(item);
        }
        return zip(this.saveItemTTL(id, timeToLiveKey), this.saveItemToDb(id, noSqlkey, item)).pipe(switchMap(function () {
            return of(item);
        }));
    };
    CachedItemStoreImpl.prototype.saveItemTTL = function (id, timeToLiveKey) {
        return this.sharedPreferences.putString(timeToLiveKey + '-' + id, Date.now() + '').pipe(mergeMap(function (val) {
            return of(true);
        }));
    };
    CachedItemStoreImpl.prototype.saveItemToDb = function (id, noSqlkey, item) {
        return this.keyValueStore.setValue(noSqlkey + '-' + id, JSON.stringify(item));
    };
    var CachedItemStoreImpl_1;
    CachedItemStoreImpl = CachedItemStoreImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(2, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], CachedItemStoreImpl);
    return CachedItemStoreImpl;
}());
export { CachedItemStoreImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkLWl0ZW0tc3RvcmUtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9rZXktdmFsdWUtc3RvcmUvaW1wbC9jYWNoZWQtaXRlbS1zdG9yZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFJckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHekU7SUFJSSw2QkFDZ0QsU0FBb0IsRUFDZixhQUE0QixFQUN6QixpQkFBb0M7UUFGNUMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDeEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDOzRCQVRRLG1CQUFtQjtJQVdiLCtCQUFXLEdBQTFCLFVBQTJCLElBQVM7UUFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkUsT0FBTyxJ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QyxDQUFDLElBQUksQ0FDbkYsUUFBUSxDQUFDLFVBQUMsR0FBRztZQUNULE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sMENBQVksR0FBcEIsVUFBcUIsRUFBVSxFQUFFLFFBQWdCLEVBQUUsSUFBSTtRQUNuRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDOztJQXBLUSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO1FBTUosV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN2QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs7T0FQdEMsbUJBQW1CLENBcUsvQjtJQUFELDBCQUFDO0NBQUEsQUFyS0QsSUFxS0M7U0FyS1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWNoZWRJdGVtU3RvcmUsIEtleVZhbHVlU3RvcmV9IGZyb20gJy4uJztcbmltcG9ydCB7ZGVmZXIsIGlpZiwgT2JzZXJ2YWJsZSwgb2YsIHppcH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FwaUNvbmZpZ30gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGVkSXRlbVN0b3JlSW1wbCBpbXBsZW1lbnRzIENhY2hlZEl0ZW1TdG9yZSB7XG5cbiAgICBwcml2YXRlIGFwaUNvbmZpZzogQXBpQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLktFWV9WQUxVRV9TVE9SRSkgcHJpdmF0ZSBrZXlWYWx1ZVN0b3JlOiBLZXlWYWx1ZVN0b3JlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzKSB7XG4gICAgICAgIHRoaXMuYXBpQ29uZmlnID0gdGhpcy5zZGtDb25maWcuYXBpQ29uZmlnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzSXRlbUVtcHR5KGl0ZW06IGFueSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSAmJiBpdGVtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0PFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBub1NxbGtleTogc3RyaW5nLFxuICAgICAgICB0aW1lVG9MaXZlS2V5OiBzdHJpbmcsXG4gICAgICAgIGZyb21TZXJ2ZXI6ICgpID0+IE9ic2VydmFibGU8VD4sXG4gICAgICAgIGluaXRpYWw/OiAoKSA9PiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICB0aW1lVG9MaXZlPzogbnVtYmVyLFxuICAgICAgICBlbXB0eUNvbmRpdGlvbj86IChpdGVtOiBUKSA9PiBib29sZWFuXG4gICAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiBmcm9tU2VydmVyKCkucGlwZShcbiAgICAgICAgICAgIHRhcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVJdGVtVFRMKGlkLCB0aW1lVG9MaXZlS2V5KS50b1Byb21pc2UoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUl0ZW1Ub0RiKGlkLCBub1NxbGtleSwgcmVzcG9uc2UpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQ8VD4oXG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBub1NxbGtleSxcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvTGl2ZUtleSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbVNlcnZlcixcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbCxcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvTGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlDb25kaXRpb24sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhY2hlZDxUPihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbm9TcWxrZXk6IHN0cmluZyxcbiAgICAgICAgdGltZVRvTGl2ZUtleTogc3RyaW5nLFxuICAgICAgICBmcm9tU2VydmVyOiAoKSA9PiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICBpbml0aWFsPzogKCkgPT4gT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgdGltZVRvTGl2ZT86IG51bWJlcixcbiAgICAgICAgZW1wdHlDb25kaXRpb24/OiAoaXRlbTogVCkgPT4gYm9vbGVhblxuICAgICk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0l0ZW1DYWNoZWRJbkRiKHRpbWVUb0xpdmVLZXksIGlkKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGlzSXRlbUNhY2hlZEluRGI6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNJdGVtQ2FjaGVkSW5EYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0l0ZW1UVExFeHBpcmVkKHRpbWVUb0xpdmVLZXksIGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgIWlzTmFOKHRpbWVUb0xpdmUhKSA/IHRpbWVUb0xpdmUhIDogdGhpcy5hcGlDb25maWcuY2FjaGVkX3JlcXVlc3RzLnRpbWVUb0xpdmUpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoaXNJdGVtVFRMRXhwaXJlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0l0ZW1UVExFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtleVZhbHVlU3RvcmUuZ2V0VmFsdWUobm9TcWxrZXkgKyAnLScgKyBpZCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgodikgPT4gSlNPTi5wYXJzZSh2ISkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBmcm9tU2VydmVyKCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoaXRlbTogVCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVJdGVtPFQ+KGlkLCB0aW1lVG9MaXZlS2V5LCBub1NxbGtleSwgaXRlbSwgZW1wdHlDb25kaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKG5vU3Fsa2V5ICsgJy0nICsgaWQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKHYpID0+IEpTT04ucGFyc2UodiEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsKCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGl0ZW06IFQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUl0ZW08VD4oaWQsIHRpbWVUb0xpdmVLZXksIG5vU3Fsa2V5LCBpdGVtLCBlbXB0eUNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbVNlcnZlcigpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGl0ZW06IFQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlSXRlbTxUPihpZCwgdGltZVRvTGl2ZUtleSwgbm9TcWxrZXksIGl0ZW0sIGVtcHR5Q29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbVNlcnZlcigpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtOiBUKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmVJdGVtPFQ+KGlkLCB0aW1lVG9MaXZlS2V5LCBub1NxbGtleSwgaXRlbSwgZW1wdHlDb25kaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSXRlbUNhY2hlZEluRGIodGltZVRvTGl2ZUtleTogc3RyaW5nLCBpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyh0aW1lVG9MaXZlS2V5ICsgJy0nICsgaWQpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgodHRsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpZihcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gISF0dGwsXG4gICAgICAgICAgICAgICAgICAgIGRlZmVyKCgpID0+IG9mKHRydWUpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIoKCkgPT4gb2YoZmFsc2UpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJdGVtVFRMRXhwaXJlZCh0aW1lVG9MaXZlS2V5OiBzdHJpbmcsIGlkOiBzdHJpbmcsIHRpbWVUb0xpdmU6IG51bWJlcik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcodGltZVRvTGl2ZUtleSArICctJyArIGlkKS5waXBlKFxuICAgICAgICAgICAgbWFwKCh0dGwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzYXZlZFRpbWVzdGFtcDogbnVtYmVyID0gTnVtYmVyKHR0bCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93VGltZVN0YW1wOiBudW1iZXIgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGlmIChub3dUaW1lU3RhbXAgLSBzYXZlZFRpbWVzdGFtcCA8IHRpbWVUb0xpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVJdGVtPFQ+KGlkOiBzdHJpbmcsIHRpbWVUb0xpdmVLZXk6IHN0cmluZywgbm9TcWxrZXk6IHN0cmluZywgaXRlbTogVCwgZW1wdHlDb25kaXRpb24/OiAoaXRlbTogVCkgPT4gYm9vbGVhbikge1xuICAgICAgICBpZiAoQ2FjaGVkSXRlbVN0b3JlSW1wbC5pc0l0ZW1FbXB0eShpdGVtKSB8fCAoZW1wdHlDb25kaXRpb24gJiYgZW1wdHlDb25kaXRpb24oaXRlbSkpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgdGhpcy5zYXZlSXRlbVRUTChpZCwgdGltZVRvTGl2ZUtleSksXG4gICAgICAgICAgICB0aGlzLnNhdmVJdGVtVG9EYihpZCwgbm9TcWxrZXksIGl0ZW0pXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGl0ZW0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVJdGVtVFRMKGlkOiBzdHJpbmcsIHRpbWVUb0xpdmVLZXk6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcodGltZVRvTGl2ZUtleSArICctJyArIGlkLCBEYXRlLm5vdygpICsgJycpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVJdGVtVG9EYihpZDogc3RyaW5nLCBub1NxbGtleTogc3RyaW5nLCBpdGVtKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVZhbHVlU3RvcmUuc2V0VmFsdWUobm9TcWxrZXkgKyAnLScgKyBpZCwgSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xuICAgIH1cbn1cbiJdfQ==