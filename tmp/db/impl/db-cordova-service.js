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
import { Migration } from '..';
import { InitialMigration } from '../migrations/initial-migration';
import { QueryBuilder } from '../util/query-builder';
import { injectable, inject } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { Observable } from 'rxjs';
var DbCordovaService = /** @class */ (function () {
    function DbCordovaService(sdkConfig, dBVersion, appMigrationList) {
        this.sdkConfig = sdkConfig;
        this.dBVersion = dBVersion;
        this.appMigrationList = appMigrationList;
        this.context = this.sdkConfig.dbConfig;
    }
    DbCordovaService.prototype.update = function (updateQuery) {
        return new Observable(function (observer) {
            db.update(updateQuery.table, updateQuery.selection || '', updateQuery.selectionArgs || [], updateQuery.modelJson, updateQuery.useExternalDb || false, function (count) {
                observer.next(count);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise((function (resolve) {
                        db.init(_this.context.dbName, _this.dBVersion, [], function (value) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(value.method === 'onCreate')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.onCreate()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!(value.method === 'onUpgrade')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.onUpgrade(value.oldVersion, value.newVersion)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        _this.hasInitialized().subscribe(function () {
                            resolve();
                        });
                    }))];
            });
        });
    };
    DbCordovaService.prototype.hasInitialized = function () {
        return this.execute('DROP TABLE IF EXISTS dummy_init_table');
    };
    DbCordovaService.prototype.delete = function (deleteQuery) {
        var query = "\n            DELETE FROM " + deleteQuery.table + "\n            WHERE " + new QueryBuilder().where(deleteQuery.selection).args(deleteQuery.selectionArgs).end().build() + "\n        ";
        return new Observable(function (observer) {
            db.execute(query, deleteQuery.useExternalDb || false, function (value) {
                observer.next(value);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.onCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new InitialMigration().apply(this)];
            });
        });
    };
    DbCordovaService.prototype.onUpgrade = function (oldVersion, newVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, m, migration;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.appMigrationList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        m = _a[_i];
                        migration = void 0;
                        if (m instanceof Migration) {
                            migration = m;
                        }
                        else {
                            migration = m();
                        }
                        console.log('Migration', migration);
                        if (!migration.required(oldVersion, newVersion)) return [3 /*break*/, 3];
                        return [4 /*yield*/, migration.apply(this)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DbCordovaService.prototype.execute = function (query, useExternalDb) {
        return new Observable(function (observer) {
            db.execute(query, useExternalDb || false, function (value) {
                observer.next(value);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.read = function (readQuery) {
        return new Observable(function (observer) {
            db.read(!!readQuery.distinct, readQuery.table, readQuery.columns || [], readQuery.selection || '', readQuery.selectionArgs || [], readQuery.groupBy || '', readQuery.having || '', readQuery.orderBy || '', readQuery.limit || '', readQuery.useExternalDb || false, function (json) {
                observer.next(json);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.insert = function (inserQuery) {
        return new Observable(function (observer) {
            db.insert(inserQuery.table, inserQuery.modelJson, inserQuery.useExternalDb || false, function (number) {
                observer.next(number);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.beginTransaction = function () {
        db.beginTransaction();
    };
    DbCordovaService.prototype.endTransaction = function (isOperationSuccessful, useExternalDb) {
        db.endTransaction(isOperationSuccessful, useExternalDb || false);
    };
    DbCordovaService.prototype.copyDatabase = function (destination) {
        return new Observable(function (observer) {
            db.copyDatabase(destination, function (success) {
                observer.next(success);
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    DbCordovaService.prototype.open = function (dbFilePath) {
        return new Promise((function (resolve, reject) {
            db.open(dbFilePath, function (value) {
                resolve();
            }, function (value) {
                reject();
            });
        }));
    };
    DbCordovaService = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.DB_VERSION)),
        __param(2, inject(InjectionTokens.DB_MIGRATION_LIST)),
        __metadata("design:paramtypes", [Object, Number, Array])
    ], DbCordovaService);
    return DbCordovaService;
}());
export { DbCordovaService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItY29yZG92YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL2ltcGwvZGItY29yZG92YS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0QsU0FBUyxFQUEyQyxNQUFNLElBQUksQ0FBQztBQUN0SCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHaEM7SUFHSSwwQkFBd0QsU0FBb0IsRUFDcEIsU0FBaUIsRUFDVixnQkFBa0Q7UUFGekQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ1YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQztRQUU3RyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFHRCxpQ0FBTSxHQUFOLFVBQU8sV0FBd0I7UUFDM0IsT0FBTyxJQUFJLFVBQVUsQ0FBUyxVQUFBLFFBQVE7WUFDbEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUN2QixXQUFXLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFDM0IsV0FBVyxDQUFDLGFBQWEsSUFBSSxFQUFFLEVBQy9CLFdBQVcsQ0FBQyxTQUFTLEVBQ3JCLFdBQVcsQ0FBQyxhQUFhLElBQUksS0FBSyxFQUNsQyxVQUFDLEtBQVU7Z0JBQ1AsUUFBUSxDQUFD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QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLFVBQWtCO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQVksQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNkLFVBQUMsS0FBSztnQkFDRixPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsTUFBTSxFQUFFLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBOUpRLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7UUFJSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOztPQUw3QyxnQkFBZ0IsQ0FnSzVCO0lBQUQsdUJBQUM7Q0FBQSxBQWhLRCxJQWdLQztTQWhLWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiQ29uZmlnLCBEYlNlcnZpY2UsIERlbGV0ZVF1ZXJ5LCBJbnNlcnRRdWVyeSwgTWlncmF0aW9uLCBNaWdyYXRpb25GYWN0b3J5LCBSZWFkUXVlcnksIFVwZGF0ZVF1ZXJ5fSBmcm9tICcuLic7XG5pbXBvcnQge0luaXRpYWxNaWdyYXRpb259IGZyb20gJy4uL21pZ3JhdGlvbnMvaW5pdGlhbC1taWdyYXRpb24nO1xuaW1wb3J0IHtRdWVyeUJ1aWxkZXJ9IGZyb20gJy4uL3V0aWwvcXVlcnktYnVpbGRlcic7XG5pbXBvcnQge2luamVjdGFibGUsIGluamVjdH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYkNvcmRvdmFTZXJ2aWNlIGltcGxlbWVudHMgRGJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGNvbnRleHQ6IERiQ29uZmlnO1xuXG4gICAgY29uc3RydWN0b3IoQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9WRVJTSU9OKSBwcml2YXRlIGRCVmVyc2lvbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX01JR1JBVElPTl9MSVNUKSBwcml2YXRlIGFwcE1pZ3JhdGlvbkxpc3Q6IChNaWdyYXRpb24gfCBNaWdyYXRpb25GYWN0b3J5KVtdXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuc2RrQ29uZmlnLmRiQ29uZmlnO1xuICAgIH1cblxuXG4gICAgdXBkYXRlKHVwZGF0ZVF1ZXJ5OiBVcGRhdGVRdWVyeSk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIGRiLnVwZGF0ZSh1cGRhdGVRdWVyeS50YWJsZSxcbiAgICAgICAgICAgICAgICB1cGRhdGVRdWVyeS5zZWxlY3Rpb24gfHwgJycsXG4gICAgICAgICAgICAgICAgdXBkYXRlUXVlcnkuc2VsZWN0aW9uQXJncyB8fCBbXSxcbiAgICAgICAgICAgICAgICB1cGRhdGVRdWVyeS5tb2RlbEpzb24sXG4gICAgICAgICAgICAgICAgdXBkYXRlUXVlcnkudXNlRXh0ZXJuYWxEYiB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICAoY291bnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBpbml0KCk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgZGIuaW5pdCh0aGlzLmNvbnRleHQuZGJOYW1lLFxuICAgICAgICAgICAgICAgIHRoaXMuZEJWZXJzaW9uLFxuICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgIGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubWV0aG9kID09PSAnb25DcmVhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9uQ3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUubWV0aG9kID09PSAnb25VcGdyYWRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vblVwZ3JhZGUodmFsdWUub2xkVmVyc2lvbiwgdmFsdWUubmV3VmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB0aGlzLmhhc0luaXRpYWxpemVkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzSW5pdGlhbGl6ZWQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgnRFJPUCBUQUJMRSBJRiBFWElTVFMgZHVtbXlfaW5pdF90YWJsZScpO1xuICAgIH1cblxuICAgIGRlbGV0ZShkZWxldGVRdWVyeTogRGVsZXRlUXVlcnkpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICAgICAgIERFTEVURSBGUk9NICR7ZGVsZXRlUXVlcnkudGFibGV9XG4gICAgICAgICAgICBXSEVSRSAke25ldyBRdWVyeUJ1aWxkZXIoKS53aGVyZShkZWxldGVRdWVyeS5zZWxlY3Rpb24pLmFyZ3MoZGVsZXRlUXVlcnkuc2VsZWN0aW9uQXJncykuZW5kKCkuYnVpbGQoKX1cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8dW5kZWZpbmVkPihvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBkYi5leGVjdXRlKHF1ZXJ5LCBkZWxldGVRdWVyeS51c2VFeHRlcm5hbERiIHx8IGZhbHNlLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvbkNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWFsTWlncmF0aW9uKCkuYXBwbHkodGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvblVwZ3JhZGUob2xkVmVyc2lvbjogbnVtYmVyLCBuZXdWZXJzaW9uOiBudW1iZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIHRoaXMuYXBwTWlncmF0aW9uTGlzdCkge1xuICAgICAgICAgICAgbGV0IG1pZ3JhdGlvbjogTWlncmF0aW9uO1xuICAgICAgICAgICAgaWYgKG0gaW5zdGFuY2VvZiBNaWdyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBtaWdyYXRpb24gPSBtO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaWdyYXRpb24gPSBtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTWlncmF0aW9uJywgbWlncmF0aW9uKTtcbiAgICAgICAgICAgIGlmIChtaWdyYXRpb24ucmVxdWlyZWQob2xkVmVyc2lvbiwgbmV3VmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBtaWdyYXRpb24uYXBwbHkodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlKHF1ZXJ5OiBzdHJpbmcsIHVzZUV4dGVybmFsRGI/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGFueT4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgZGIuZXhlY3V0ZShxdWVyeSwgdXNlRXh0ZXJuYWxEYiB8fCBmYWxzZSwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZChyZWFkUXVlcnk6IFJlYWRRdWVyeSk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIGRiLnJlYWQoISFyZWFkUXVlcnkuZGlzdGluY3QsXG4gICAgICAgICAgICAgICAgcmVhZFF1ZXJ5LnRhYmxlLFxuICAgICAgICAgICAgICAgIHJlYWRRdWVyeS5jb2x1bW5zIHx8IFtdLFxuICAgICAgICAgICAgICAgIHJlYWRRdWVyeS5zZWxlY3Rpb24gfHwgJycsXG4gICAgICAgICAgICAgICAgcmVhZFF1ZXJ5LnNlbGVjdGlvbkFyZ3MgfHwgW10sXG4gICAgICAgICAgICAgICAgcmVhZFF1ZXJ5Lmdyb3VwQnkgfHwgJycsXG4gICAgICAgICAgICAgICAgcmVhZFF1ZXJ5LmhhdmluZyB8fCAnJyxcbiAgICAgICAgICAgICAgICByZWFkUXVlcnkub3JkZXJCeSB8fCAnJyxcbiAgICAgICAgICAgICAgICByZWFkUXVlcnkubGltaXQgfHwgJycsXG4gICAgICAgICAgICAgICAgcmVhZFF1ZXJ5LnVzZUV4dGVybmFsRGIgfHwgZmFsc2UsXG4gICAgICAgICAgICAgICAgKGpzb246IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoanNvbik7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbnNlcnQoaW5zZXJRdWVyeTogSW5zZXJ0UXVlcnkpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgZGIuaW5zZXJ0KGluc2VyUXVlcnkudGFibGUsXG4gICAgICAgICAgICAgICAgaW5zZXJRdWVyeS5tb2RlbEpzb24sIGluc2VyUXVlcnkudXNlRXh0ZXJuYWxEYiB8fCBmYWxzZSwgKG51bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQobnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJlZ2luVHJhbnNhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGRiLmJlZ2luVHJhbnNhY3Rpb24oKTtcbiAgICB9XG5cbiAgICBlbmRUcmFuc2FjdGlvbihpc09wZXJhdGlvblN1Y2Nlc3NmdWw6IGJvb2xlYW4sIHVzZUV4dGVybmFsRGI/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGRiLmVuZFRyYW5zYWN0aW9uKGlzT3BlcmF0aW9uU3VjY2Vzc2Z1bCwgdXNlRXh0ZXJuYWxEYiB8fCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY29weURhdGFiYXNlKGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIGRiLmNvcHlEYXRhYmFzZShkZXN0aW5hdGlvbiwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvcGVuKGRiRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBkYi5vcGVuKGRiRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiJdfQ==