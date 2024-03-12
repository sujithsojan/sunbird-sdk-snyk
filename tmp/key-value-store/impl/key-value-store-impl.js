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
import { DbService } from '../../db';
import { KeyValueStoreEntry } from '../db/schema';
import { injectable, inject } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { map, mergeMap } from 'rxjs/operators';
var KeyValueStoreImpl = /** @class */ (function () {
    function KeyValueStoreImpl(dbService) {
        this.dbService = dbService;
    }
    KeyValueStoreImpl.prototype.getValue = function (key) {
        return this.dbService.read({
            table: KeyValueStoreEntry.TABLE_NAME,
            columns: [],
            selection: KeyValueStoreEntry.COLUMN_NAME_KEY + " = ?",
            selectionArgs: [key]
        }).pipe(map(function (res) { return res[0] && res[0].value; }));
    };
    KeyValueStoreImpl.prototype.setValue = function (key, value) {
        var _this = this;
        return this.getValue(key).pipe(mergeMap(function (response) {
            var _a, _b;
            if (response) {
                return _this.dbService.update({
                    table: KeyValueStoreEntry.TABLE_NAME,
                    selection: KeyValueStoreEntry.COLUMN_NAME_KEY + " = ?",
                    selectionArgs: [key],
                    modelJson: (_a = {},
                        _a[KeyValueStoreEntry.COLUMN_NAME_KEY] = key,
                        _a[KeyValueStoreEntry.COLUMN_NAME_VALUE] = value,
                        _a)
                }).pipe(map(function (v) { return v > 0; }));
            }
            else {
                return _this.dbService.insert({
                    table: KeyValueStoreEntry.TABLE_NAME,
                    modelJson: (_b = {},
                        _b[KeyValueStoreEntry.COLUMN_NAME_KEY] = key,
                        _b[KeyValueStoreEntry.COLUMN_NAME_VALUE] = value,
                        _b)
                }).pipe(map(function (v) { return v > 0; }));
            }
        }));
    };
    KeyValueStoreImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __metadata("design:paramtypes", [DbService])
    ], KeyValueStoreImpl);
    return KeyValueStoreImpl;
}());
export { KeyValueStoreImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXZhbHVlLXN0b3JlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMva2V5LXZhbHVlLXN0b3JlL2ltcGwva2V5LXZhbHVlLXN0b3JlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0M7SUFDSSwyQkFBd0QsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUM1RSxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLEdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLEVBQUUsa0JBQWtCLENBQUMsVUFBVTtZQUNwQyxPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBSyxrQkFBa0IsQ0FBQyxlQUFlLFNBQU07WUFDdEQsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsR0FBcUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUF0QixDQUFzQixDQUFDLENBQ3pFLENBQUM7SUFDTixDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLEdBQVcsRUFBRSxLQUFhO1FBQW5DLGlCQTZCQztRQTVCRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMxQixRQUFRLENBQUMsVUFBQyxRQUE0Qjs7WUFDbEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFVBQVU7b0JBQ3BDLFNBQVMsRUFBSyxrQkFBa0IsQ0FBQyxlQUFlLFNBQU07b0JBQ3RELGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDcEIsU0FBUzt3QkFDTCxHQUFDLGtCQUFrQixDQUFDLGVBQWUsSUFBRyxHQUFHO3dCQUN6QyxHQUFDLGtCQUFrQixDQUFDLGlCQUFpQixJQUFHLEtBQUs7MkJBQ2hEO2lCQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FDbEIsQ0FBQzthQUVMO2lCQUFNO2dCQUNILE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO29CQUNwQyxTQUFTO3dCQUNMLEdBQUMsa0JBQWtCLENBQUMsZUFBZSxJQUFHLEdBQUc7d0JBQ3pDLEdBQUMsa0JBQWtCLENBQUMsaUJBQWlCLElBQUcsS0FBSzsyQkFDaEQ7aUJBQ0osQ0FBQyxDQUFDLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssQ0FBQyxDQUNsQixDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQTVDUSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO1FBRUksV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3lDQUFvQixTQUFTO09BRG5FLGlCQUFpQixDQTZDN0I7SUFBRCx3QkFBQztDQUFBLEFBN0NELElBNkNDO1NBN0NZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7S2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4nO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uL2RiJztcbmltcG9ydCB7S2V5VmFsdWVTdG9yZUVudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtpbmplY3RhYmxlLCBpbmplY3R9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge0luamVjdGlvblRva2Vuc30gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXAsIG1lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZVN0b3JlSW1wbCBpbXBsZW1lbnRzIEtleVZhbHVlU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBLZXlWYWx1ZVN0b3JlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtLZXlWYWx1ZVN0b3JlRW50cnkuQ09MVU1OX05BTUVfS0VZfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2tleV1cbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXSkgPT4gcmVzWzBdICYmIHJlc1swXS52YWx1ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZShrZXkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocmVzcG9uc2U6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBLZXlWYWx1ZVN0b3JlRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7S2V5VmFsdWVTdG9yZUVudHJ5LkNPTFVNTl9OQU1FX0tFWX0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtrZXldLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW0tleVZhbHVlU3RvcmVFbnRyeS5DT0xVTU5fTkFNRV9LRVldOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW0tleVZhbHVlU3RvcmVFbnRyeS5DT0xVTU5fTkFNRV9WQUxVRV06IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IEtleVZhbHVlU3RvcmVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW0tleVZhbHVlU3RvcmVFbnRyeS5DT0xVTU5fTkFNRV9LRVldOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW0tleVZhbHVlU3RvcmVFbnRyeS5DT0xVTU5fTkFNRV9WQUxVRV06IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAodiA9PiB2ID4gMClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cblxuIl19