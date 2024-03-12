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
import * as SHA1 from 'crypto-js/sha1';
import { Observable, of } from 'rxjs';
import { injectable } from 'inversify';
import { StorageDestination } from '../../../storage';
import { distinctUntilChanged, finalize, tap } from 'rxjs/operators';
var DeviceInfoImpl = /** @class */ (function () {
    function DeviceInfoImpl() {
        this.deviceId = SHA1(window.device.uuid).toString();
    }
    DeviceInfoImpl.prototype.getDeviceID = function () {
        return this.deviceId;
    };
    DeviceInfoImpl.prototype.getDeviceSpec = function () {
        var _this = this;
        if (this.deviceSpec) {
            return of(this.deviceSpec);
        }
        return new Observable(function (observer) {
            sbutility.getDeviceSpec(function (deviceSpec) {
                _this.deviceSpec = deviceSpec;
                observer.next(deviceSpec);
                observer.complete();
            });
        });
    };
    DeviceInfoImpl.prototype.getAvailableInternalMemorySize = function () {
        return new Observable(function (observer) {
            sbutility.getAvailableInternalMemorySize(function (value) {
                observer.next(value);
                observer.complete();
            }, function (e) {
                observer.error(e);
            });
        });
    };
    DeviceInfoImpl.prototype.getStorageVolumes = function () {
        return Observable.create(function (observer) {
            sbutility.getStorageVolumes(function (volumes) {
                observer.next(volumes.map(function (v) {
                    if (v.isRemovable) {
                        return {
                            storageDestination: StorageDestination.EXTERNAL_STORAGE,
                            info: __assign({}, v)
                        };
                    }
                    return {
                        storageDestination: StorageDestination.INTERNAL_STORAGE,
                        info: __assign({}, v)
                    };
                }));
                observer.complete();
            }, function (e) {
                observer.error(e);
            });
        });
    };
    DeviceInfoImpl.prototype.isKeyboardShown = function () {
        var shownCallback1;
        var shownCallback2;
        var hideCallback1;
        var hideCallback2;
        return new Observable(function (observer) {
            shownCallback1 = function () { return observer.next(true); };
            shownCallback2 = function () { return observer.next(true); };
            hideCallback1 = function () { return observer.next(false); };
            hideCallback2 = function () { return observer.next(false); };
            window.addEventListener('native.keyboardshow', shownCallback1);
            window.addEventListener('keyboardWillShow', shownCallback2);
            window.addEventListener('native.keyboardhide', hideCallback1);
            window.addEventListener('keyboardWillHide', hideCallback1);
        })
            .pipe(distinctUntilChanged(), tap(function () {
            console.log('Subscribed isKeyboardShown event');
        }), finalize(function () {
            console.log('Unsubscribed isKeyboardShown event');
            window.removeEventListener('native.keyboardshow', shownCallback1);
            window.removeEventListener('keyboardWillShow', shownCallback2);
            window.removeEventListener('native.keyboardhide', hideCallback1);
            window.removeEventListener('keyboardWillHide', hideCallback1);
        }));
    };
    DeviceInfoImpl = __decorate([
        injectable(),
        __metadata("design:paramtypes", [])
    ], DeviceInfoImpl);
    return DeviceInfoImpl;
}());
export { DeviceInfoImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWluZm8taW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2RldmljZS9pbXBsL2RldmljZS1pbmZvLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEtBQUssSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxVQUFVLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDckMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduRTtJQUtJO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFRO1lBQzNCLFNBQVMsQ0FBQyxhQUFhLENBQUMsVUFBQyxVQUFzQjtnQkFDM0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxD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LEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBOUZRLGNBQWM7UUFEMUIsVUFBVSxFQUFFOztPQUNBLGNBQWMsQ0ErRjFCO0lBQUQscUJBQUM7Q0FBQSxBQS9GRCxJQStGQztTQS9GWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZXZpY2VJbmZvLCBEZXZpY2VTcGVjLCBTdG9yYWdlVm9sdW1lfSBmcm9tICcuLic7XG5pbXBvcnQgKiBhcyBTSEExIGZyb20gJ2NyeXB0by1qcy9zaGExJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtTdG9yYWdlRGVzdGluYXRpb259IGZyb20gJy4uLy4uLy4uL3N0b3JhZ2UnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmluYWxpemUsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGV2aWNlSW5mb0ltcGwgaW1wbGVtZW50cyBEZXZpY2VJbmZvIHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGV2aWNlSWQ6IHN0cmluZztcbiAgICBwcml2YXRlIGRldmljZVNwZWM6IERldmljZVNwZWM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZXZpY2VJZCA9IFNIQTEod2luZG93LmRldmljZS51dWlkKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGdldERldmljZUlEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZUlkO1xuICAgIH1cblxuICAgIGdldERldmljZVNwZWMoKTogT2JzZXJ2YWJsZTxEZXZpY2VTcGVjPiB7XG4gICAgICAgIGlmICh0aGlzLmRldmljZVNwZWMpIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmRldmljZVNwZWMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5nZXREZXZpY2VTcGVjKChkZXZpY2VTcGVjOiBEZXZpY2VTcGVjKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2VTcGVjID0gZGV2aWNlU3BlYztcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRldmljZVNwZWMpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmxlSW50ZXJuYWxNZW1vcnlTaXplKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS5nZXRBdmFpbGFibGVJbnRlcm5hbE1lbW9yeVNpemUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZVZvbHVtZXMoKTogT2JzZXJ2YWJsZTxTdG9yYWdlVm9sdW1lW10+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgc2J1dGlsaXR5LmdldFN0b3JhZ2VWb2x1bWVzKCh2b2x1bWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2b2x1bWVzLm1hcCgodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodi5pc1JlbW92YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlRGVzdGluYXRpb246IFN0b3JhZ2VEZXN0aW5hdGlvbi5FWFRFUk5BTF9TVE9SQUdFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHsuLi52fVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlRGVzdGluYXRpb246IFN0b3JhZ2VEZXN0aW5hdGlvbi5JTlRFUk5BTF9TVE9SQUdFLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbzogey4uLnZ9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzS2V5Ym9hcmRTaG93bigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IHNob3duQ2FsbGJhY2sxO1xuICAgICAgICBsZXQgc2hvd25DYWxsYmFjazI7XG5cbiAgICAgICAgbGV0IGhpZGVDYWxsYmFjazE7XG4gICAgICAgIGxldCBoaWRlQ2FsbGJhY2syO1xuXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHNob3duQ2FsbGJhY2sxID0gKCkgPT4gb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHNob3duQ2FsbGJhY2syID0gKCkgPT4gb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIGhpZGVDYWxsYmFjazEgPSAoKSA9PiBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIGhpZGVDYWxsYmFjazIgPSAoKSA9PiBvYnNlcnZlci5uZXh0KGZhbHNlKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ25hdGl2ZS5rZXlib2FyZHNob3cnLCBzaG93bkNhbGxiYWNrMSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5Ym9hcmRXaWxsU2hvdycsIHNob3duQ2FsbGJhY2syKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ25hdGl2ZS5rZXlib2FyZGhpZGUnLCBoaWRlQ2FsbGJhY2sxKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlib2FyZFdpbGxIaWRlJywgaGlkZUNhbGxiYWNrMSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJzY3JpYmVkIGlzS2V5Ym9hcmRTaG93biBldmVudCcpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vuc3Vic2NyaWJlZCBpc0tleWJvYXJkU2hvd24gZXZlbnQnKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbmF0aXZlLmtleWJvYXJkc2hvdycsIHNob3duQ2FsbGJhY2sxKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWJvYXJkV2lsbFNob3cnLCBzaG93bkNhbGxiYWNrMik7XG5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ25hdGl2ZS5rZXlib2FyZGhpZGUnLCBoaWRlQ2FsbGJhY2sxKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWJvYXJkV2lsbEhpZGUnLCBoaWRlQ2FsbGJhY2sxKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=