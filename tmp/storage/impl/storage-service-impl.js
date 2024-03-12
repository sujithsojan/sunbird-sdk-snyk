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
import { StorageDestination } from '..';
import { of, zip } from 'rxjs';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { StorageKeys } from '../../preference-keys';
import { SharedPreferencesSetCollectionImpl } from '../../util/shared-preferences/impl/shared-preferences-set-collection-impl';
import { DbService } from '../../db';
import { TransferContentHandler } from '../handler/transfer-content-handler';
import { GetModifiedContentHandler } from '../handler/scan/get-modified-content-handler';
import { PerformActoinOnContentHandler } from '../handler/scan/perform-actoin-on-content-handler';
import { StorageHandler } from '../handler/storage-handler';
import { map, mapTo, mergeMap, tap } from 'rxjs/operators';
var StorageServiceImpl = /** @class */ (function () {
    function StorageServiceImpl(eventsBusService, sharedPreferences, dbService, deviceInfo, fileService, sdkConfig) {
        this.eventsBusService = eventsBusService;
        this.sharedPreferences = sharedPreferences;
        this.dbService = dbService;
        this.deviceInfo = deviceInfo;
        this.fileService = fileService;
        this.sdkConfig = sdkConfig;
        this.contentsToTransfer = new SharedPreferencesSetCollectionImpl(this.sharedPreferences, StorageKeys.KEY_TO_TRANSFER_LIST, function (item) { return item; });
        this.transferContentHandler = new TransferContentHandler(this.sdkConfig, this.fileService, this.dbService, this.eventsBusService, this.deviceInfo);
    }
    StorageServiceImpl_1 = StorageServiceImpl;
    StorageServiceImpl.prototype.onInit = function () {
        var _this = this;
        return zip(this.deviceInfo.getStorageVolumes(), this.getStorageDestination()).pipe(tap(function (r) {
            _this.availableStorageVolumes = r[0];
            _this.currentStorageDestination = r[1];
            _this.scanStorage().toPromise();
        }), mapTo(undefined));
    };
    StorageServiceImpl.prototype.getStorageDestinationDirectoryPath = function () {
        var _this = this;
        var storageVolume = this.availableStorageVolumes
            .find(function (volume) { return volume.storageDestination === _this.currentStorageDestination; });
        return storageVolume && storageVolume.info.contentStoragePath;
    };
    StorageServiceImpl.prototype.cancelTransfer = function () {
        return this.transferContentHandler.cancel();
    };
    StorageServiceImpl.prototype.getStorageDestination = function () {
        return this.sharedPreferences.getString(StorageServiceImpl_1.STORAGE_DESTINATION).pipe(map(function (storageDestination) {
            return storageDestination ? storageDestination : StorageDestination.INTERNAL_STORAGE;
        }));
    };
    StorageServiceImpl.prototype.getStorageDestinationVolumeInfo = function () {
        var _this = this;
        return this.getStorageDestination().pipe(map(function (storageDestination) {
            return _this.availableStorageVolumes
                .find(function (volume) { return volume.storageDestination === storageDestination; });
        }));
    };
    StorageServiceImpl.prototype.getToTransferContents = function () {
        return of([]);
    };
    StorageServiceImpl.prototype.getTransferringContent = function () {
        return of(undefined);
    };
    StorageServiceImpl.prototype.retryCurrentTransfer = function () {
        if (this.lastTransferContentsRequest) {
            return this.transferContents(__assign(__assign({}, this.lastTransferContentsRequest), { shouldMergeInDestination: true }));
        }
        return of(undefined);
    };
    StorageServiceImpl.prototype.transferContents = function (transferContentsRequest) {
        var _this = this;
        this.lastTransferContentsRequest = transferContentsRequest;
        transferContentsRequest.sourceFolder = this.getStorageDestinationDirectoryPath();
        return this.transferContentHandler.transfer(transferContentsRequest).pipe(mergeMap(function () { return _this.getStorageDestination(); }), map(function (storageDestination) {
            return storageDestination === StorageDestination.EXTERNAL_STORAGE ? StorageDestination.INTERNAL_STORAGE :
                StorageDestination.EXTERNAL_STORAGE;
        }), tap(function (newStorageDestination) {
            _this.currentStorageDestination = newStorageDestination;
        }), mergeMap(function (newStorageDestination) {
            return _this.sharedPreferences.putString(StorageServiceImpl_1.STORAGE_DESTINATION, newStorageDestination);
        }));
    };
    StorageServiceImpl.prototype.scanStorage = function () {
        var _this = this;
        var storageDestinationPath = this.getStorageDestinationDirectoryPath();
        var scanContext = { currentStoragePath: storageDestinationPath };
        if (!storageDestinationPath) {
            this.resetStorageDestination();
        }
        return new GetModifiedContentHandler(this.fileService, this.dbService).execute(scanContext).pipe(mergeMap(function (scanContentContext) {
            var storageHandler = new StorageHandler(_this.sdkConfig.appConfig, _this.fileService, _this.dbService, _this.deviceInfo);
            return new PerformActoinOnContentHandler(storageHandler).exexute(scanContentContext);
        }), mapTo(true));
    };
    StorageServiceImpl.prototype.resetStorageDestination = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentStorageDestination = StorageDestination.INTERNAL_STORAGE;
                return [2 /*return*/, this.sharedPreferences.putString(StorageServiceImpl_1.STORAGE_DESTINATION, StorageDestination.INTERNAL_STORAGE).toPromise()];
            });
        });
    };
    var StorageServiceImpl_1;
    StorageServiceImpl.STORAGE_DESTINATION = StorageKeys.KEY_STORAGE_DESTINATION;
    StorageServiceImpl = StorageServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.EVENTS_BUS_SERVICE)),
        __param(1, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(2, inject(InjectionTokens.DB_SERVICE)),
        __param(3, inject(InjectionTokens.DEVICE_INFO)),
        __param(4, inject(InjectionTokens.FILE_SERVICE)),
        __param(5, inject(InjectionTokens.SDK_CONFIG)),
        __metadata("design:paramtypes", [Object, Object, DbService, Object, Object, Object])
    ], StorageServiceImpl);
    return StorageServiceImpl;
}());
export { StorageServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmFnZS9pbXBsL3N0b3JhZ2Utc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGtCQUFrQixFQUEwQyxNQUFNLElBQUksQ0FBQztBQUMvRSxPQUFPLEVBQWEsRUFBRSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUU3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR2xELE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLDJFQUEyRSxDQUFDO0FBQzdILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFbkMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFJM0UsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RDtJQVNJLDRCQUFnRSxnQkFBa0MsRUFDbEMsaUJBQW9DLEVBQzVDLFNBQW9CLEVBQ25CLFVBQXNCLEVBQ3JCLFdBQXdCLEVBQzFCLFNBQW9CO1FBTFoscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxz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LENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTt5REFIb0IsU0FBUztPQVhuRSxrQkFBa0IsQ0FnSTlCO0lBQUQseUJBQUM7Q0FBQSxBQWhJRCxJQWdJQztTQWhJWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0b3JhZ2VEZXN0aW5hdGlvbiwgU3RvcmFnZVNlcnZpY2UsIFRyYW5zZmVyQ29udGVudHNSZXF1ZXN0fSBmcm9tICcuLic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtDb250ZW50fSBmcm9tICcuLi8uLi9jb250ZW50JztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtFdmVudHNCdXNTZXJ2aWNlfSBmcm9tICcuLi8uLi9ldmVudHMtYnVzJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7U3RvcmFnZUtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbn0gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMvZGVmL3NoYXJlZC1wcmVmZXJlbmNlcy1zZXQtY29sbGVjdGlvbic7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzU2V0Q29sbGVjdGlvbkltcGx9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzL2ltcGwvc2hhcmVkLXByZWZlcmVuY2VzLXNldC1jb2xsZWN0aW9uLWltcGwnO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uL2RiJztcbmltcG9ydCB7RGV2aWNlSW5mbywgU3RvcmFnZVZvbHVtZX0gZnJvbSAnLi4vLi4vdXRpbC9kZXZpY2UnO1xuaW1wb3J0IHtUcmFuc2ZlckNvbnRlbnRIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL3RyYW5zZmVyLWNvbnRlbnQtaGFuZGxlcic7XG5pbXBvcnQge1Nka0NvbmZpZ30gZnJvbSAnLi4vLi4vc2RrLWNvbmZpZyc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge1NjYW5Db250ZW50Q29udGV4dH0gZnJvbSAnLi4vZGVmL3NjYW4tcmVxdWVzdHMnO1xuaW1wb3J0IHtHZXRNb2RpZmllZENvbnRlbnRIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL3NjYW4vZ2V0LW1vZGlmaWVkLWNvbnRlbnQtaGFuZGxlcic7XG5pbXBvcnQge1BlcmZvcm1BY3RvaW5PbkNvbnRlbnRIYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL3NjYW4vcGVyZm9ybS1hY3RvaW4tb24tY29udGVudC1oYW5kbGVyJztcbmltcG9ydCB7U3RvcmFnZUhhbmRsZXJ9IGZyb20gJy4uL2hhbmRsZXIvc3RvcmFnZS1oYW5kbGVyJztcbmltcG9ydCB7bWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RvcmFnZVNlcnZpY2VJbXBsIGltcGxlbWVudHMgU3RvcmFnZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNUT1JBR0VfREVTVElOQVRJT04gPSBTdG9yYWdlS2V5cy5LRVlfU1RPUkFHRV9ERVNUSU5BVElPTjtcbiAgICBwcml2YXRlIGNvbnRlbnRzVG9UcmFuc2ZlcjogU2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uPHN0cmluZz47XG4gICAgcHJpdmF0ZSB0cmFuc2ZlckNvbnRlbnRIYW5kbGVyOiBUcmFuc2ZlckNvbnRlbnRIYW5kbGVyO1xuICAgIHByaXZhdGUgbGFzdFRyYW5zZmVyQ29udGVudHNSZXF1ZXN0PzogVHJhbnNmZXJDb250ZW50c1JlcXVlc3Q7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRTdG9yYWdlRGVzdGluYXRpb246IFN0b3JhZ2VEZXN0aW5hdGlvbjtcbiAgICBwcml2YXRlIGF2YWlsYWJsZVN0b3JhZ2VWb2x1bWVzOiBTdG9yYWdlVm9sdW1lW107XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5FVkVOVFNfQlVTX1NFUlZJQ0UpIHByaXZhdGUgZXZlbnRzQnVzU2VydmljZTogRXZlbnRzQnVzU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREVWSUNFX0lORk8pIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbyxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcpIHtcbiAgICAgICAgdGhpcy5jb250ZW50c1RvVHJhbnNmZXIgPSBuZXcgU2hhcmVkUHJlZmVyZW5jZXNTZXRDb2xsZWN0aW9uSW1wbChcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgICAgICBTdG9yYWdlS2V5cy5LRVlfVE9fVFJBTlNGRVJfTElTVCxcbiAgICAgICAgICAgIChpdGVtOiBzdHJpbmcpID0+IGl0ZW1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnRyYW5zZmVyQ29udGVudEhhbmRsZXIgPSBuZXcgVHJhbnNmZXJDb250ZW50SGFuZGxlcihcbiAgICAgICAgICAgIHRoaXMuc2RrQ29uZmlnLFxuICAgICAgICAgICAgdGhpcy5maWxlU2VydmljZSxcbiAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5ldmVudHNCdXNTZXJ2aWNlLFxuICAgICAgICAgICAgdGhpcy5kZXZpY2VJbmZvLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uSW5pdCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgdGhpcy5kZXZpY2VJbmZvLmdldFN0b3JhZ2VWb2x1bWVzKCksXG4gICAgICAgICAgICB0aGlzLmdldFN0b3JhZ2VEZXN0aW5hdGlvbigpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIHRhcCgocikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlU3RvcmFnZVZvbHVtZXMgPSByWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0b3JhZ2VEZXN0aW5hdGlvbiA9IHJbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuU3RvcmFnZSgpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZURlc3RpbmF0aW9uRGlyZWN0b3J5UGF0aCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBzdG9yYWdlVm9sdW1lID0gdGhpcy5hdmFpbGFibGVTdG9yYWdlVm9sdW1lc1xuICAgICAgICAgICAgLmZpbmQoKHZvbHVtZSkgPT4gdm9sdW1lLnN0b3JhZ2VEZXN0aW5hdGlvbiA9PT0gdGhpcy5jdXJyZW50U3RvcmFnZURlc3RpbmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2VWb2x1bWUgJiYgc3RvcmFnZVZvbHVtZS5pbmZvLmNvbnRlbnRTdG9yYWdlUGF0aDtcbiAgICB9XG5cbiAgICBjYW5jZWxUcmFuc2ZlcigpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2ZlckNvbnRlbnRIYW5kbGVyLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIGdldFN0b3JhZ2VEZXN0aW5hdGlvbigpOiBPYnNlcnZhYmxlPFN0b3JhZ2VEZXN0aW5hdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoU3RvcmFnZVNlcnZpY2VJbXBsLlNUT1JBR0VfREVTVElOQVRJT04pLnBpcGUoXG4gICAgICAgICAgICBtYXAoc3RvcmFnZURlc3RpbmF0aW9uID0+XG4gICAgICAgICAgICAgICAgc3RvcmFnZURlc3RpbmF0aW9uID8gc3RvcmFnZURlc3RpbmF0aW9uIGFzIFN0b3JhZ2VEZXN0aW5hdGlvbiA6IFN0b3JhZ2VEZXN0aW5hdGlvbi5JTlRFUk5BTF9TVE9SQUdFXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZURlc3RpbmF0aW9uVm9sdW1lSW5mbygpOiBPYnNlcnZhYmxlPFN0b3JhZ2VWb2x1bWU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RvcmFnZURlc3RpbmF0aW9uKCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoc3RvcmFnZURlc3RpbmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlU3RvcmFnZVZvbHVtZXNcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKHZvbHVtZSkgPT4gdm9sdW1lLnN0b3JhZ2VEZXN0aW5hdGlvbiA9PT0gc3RvcmFnZURlc3RpbmF0aW9uKSE7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFRvVHJhbnNmZXJDb250ZW50cygpOiBPYnNlcnZhYmxlPENvbnRlbnRbXT4ge1xuICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgIH1cblxuICAgIGdldFRyYW5zZmVycmluZ0NvbnRlbnQoKTogT2JzZXJ2YWJsZTxDb250ZW50IHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHJ5Q3VycmVudFRyYW5zZmVyKCk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RUcmFuc2ZlckNvbnRlbnRzUmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmZXJDb250ZW50cyh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5sYXN0VHJhbnNmZXJDb250ZW50c1JlcXVlc3QsXG4gICAgICAgICAgICAgICAgc2hvdWxkTWVyZ2VJbkRlc3RpbmF0aW9uOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHRyYW5zZmVyQ29udGVudHModHJhbnNmZXJDb250ZW50c1JlcXVlc3Q6IFRyYW5zZmVyQ29udGVudHNSZXF1ZXN0KTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgdGhpcy5sYXN0VHJhbnNmZXJDb250ZW50c1JlcXVlc3QgPSB0cmFuc2ZlckNvbnRlbnRzUmVxdWVzdDtcbiAgICAgICAgdHJhbnNmZXJDb250ZW50c1JlcXVlc3Quc291cmNlRm9sZGVyID0gdGhpcy5nZXRTdG9yYWdlRGVzdGluYXRpb25EaXJlY3RvcnlQYXRoKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZmVyQ29udGVudEhhbmRsZXIudHJhbnNmZXIodHJhbnNmZXJDb250ZW50c1JlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLmdldFN0b3JhZ2VEZXN0aW5hdGlvbigpKSxcbiAgICAgICAgICAgIG1hcCgoc3RvcmFnZURlc3RpbmF0aW9uOiBTdG9yYWdlRGVzdGluYXRpb24pID0+XG4gICAgICAgICAgICAgICAgc3RvcmFnZURlc3RpbmF0aW9uID09PSBTdG9yYWdlRGVzdGluYXRpb24uRVhURVJOQUxfU1RPUkFHRSA/IFN0b3JhZ2VEZXN0aW5hdGlvbi5JTlRFUk5BTF9TVE9SQUdFIDpcbiAgICAgICAgICAgICAgICAgICAgU3RvcmFnZURlc3RpbmF0aW9uLkVYVEVSTkFMX1NUT1JBR0VcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YXAoKG5ld1N0b3JhZ2VEZXN0aW5hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0b3JhZ2VEZXN0aW5hdGlvbiA9IG5ld1N0b3JhZ2VEZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKG5ld1N0b3JhZ2VEZXN0aW5hdGlvbikgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhTdG9yYWdlU2VydmljZUltcGwuU1RPUkFHRV9ERVNUSU5BVElPTiwgbmV3U3RvcmFnZURlc3RpbmF0aW9uKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNjYW5TdG9yYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBzdG9yYWdlRGVzdGluYXRpb25QYXRoID0gdGhpcy5nZXRTdG9yYWdlRGVzdGluYXRpb25EaXJlY3RvcnlQYXRoKCkhO1xuICAgICAgICBjb25zdCBzY2FuQ29udGV4dDogU2NhbkNvbnRlbnRDb250ZXh0ID0ge2N1cnJlbnRTdG9yYWdlUGF0aDogc3RvcmFnZURlc3RpbmF0aW9uUGF0aH07XG4gICAgICAgIGlmICghc3RvcmFnZURlc3RpbmF0aW9uUGF0aCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFN0b3JhZ2VEZXN0aW5hdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR2V0TW9kaWZpZWRDb250ZW50SGFuZGxlcih0aGlzLmZpbGVTZXJ2aWNlLCB0aGlzLmRiU2VydmljZSkuZXhlY3V0ZShzY2FuQ29udGV4dCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChzY2FuQ29udGVudENvbnRleHQ6IFNjYW5Db250ZW50Q29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VIYW5kbGVyID0gbmV3IFN0b3JhZ2VIYW5kbGVyKHRoaXMuc2RrQ29uZmlnLmFwcENvbmZpZywgdGhpcy5maWxlU2VydmljZSwgdGhpcy5kYlNlcnZpY2UsIHRoaXMuZGV2aWNlSW5mbyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQZXJmb3JtQWN0b2luT25Db250ZW50SGFuZGxlcihzdG9yYWdlSGFuZGxlcikuZXhleHV0ZShzY2FuQ29udGVudENvbnRleHQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXBUbyh0cnVlKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyByZXNldFN0b3JhZ2VEZXN0aW5hdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RvcmFnZURlc3RpbmF0aW9uID0gU3RvcmFnZURlc3RpbmF0aW9uLklOVEVSTkFMX1NUT1JBR0U7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhTdG9yYWdlU2VydmljZUltcGwuU1RPUkFHRV9ERVNUSU5BVElPTiwgU3RvcmFnZURlc3RpbmF0aW9uLklOVEVSTkFMX1NUT1JBR0UpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==