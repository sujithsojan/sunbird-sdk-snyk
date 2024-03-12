var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Observable } from 'rxjs';
import { injectable } from 'inversify';
import { mapTo } from 'rxjs/operators';
var SharedPreferencesAndroid = /** @class */ (function () {
    function SharedPreferencesAndroid() {
        this.listeners = new Map();
        this.sharedPreferences = plugins.SharedPreferences.getInstance(SharedPreferencesAndroid_1.sharedPreferncesName);
    }
    SharedPreferencesAndroid_1 = SharedPreferencesAndroid;
    SharedPreferencesAndroid.prototype.getString = function (key) {
        var _this = this;
        var value = localStorage.getItem(key);
        if (value) {
            localStorage.removeItem(key);
            return this.putString(key, value).pipe(mapTo(value));
        }
        else {
            return new Observable(function (observer) {
                _this.sharedPreferences.getString(key, '', function (v) {
                    observer.next(v);
                    observer.complete();
                }, function (e) {
                    observer.error(e);
                });
            });
        }
    };
    SharedPreferencesAndroid.prototype.putString = function (key, value) {
        var _this = this;
        return new Observable(function (observer) {
            _this.sharedPreferences.putString(key, value, function () {
                (_this.listeners.get(key) || []).forEach(function (listener) { return listener(value); });
                observer.next(undefined);
                observer.complete();
            }, function (e) {
                observer.error(e);
            });
        });
    };
    SharedPreferencesAndroid.prototype.putBoolean = function (key, value) {
        var _this = this;
        return new Observable(function (observer) {
            _this.sharedPreferences.putBoolean(key, value, function () {
                (_this.listeners.get(key) || []).forEach(function (listener) { return listener(value); });
                observer.next(true);
                observer.complete();
            }, function (e) {
                observer.error(e);
            });
        });
    };
    SharedPreferencesAndroid.prototype.getBoolean = function (key) {
        var _this = this;
        var value = localStorage.getItem(key);
        if (value) {
            localStorage.removeItem(key);
            return this.putBoolean(key, value === 'true').pipe(mapTo(value === 'true'));
        }
        else {
            return new Observable(function (observer) {
                _this.sharedPreferences.getBoolean(key, false, function (v) {
                    observer.next(v);
                    observer.complete();
                }, function (e) {
                    observer.error(e);
                });
            });
        }
    };
    SharedPreferencesAndroid.prototype.addListener = function (key, listener) {
        var keyListeners = this.listeners.get(key) || [];
        keyListeners.push(listener);
        this.listeners.set(key, keyListeners);
    };
    SharedPreferencesAndroid.prototype.removeListener = function (key, listener) {
        var keyListeners = this.listeners.get(key) || [];
        this.listeners.set(key, keyListeners.filter(function (l) { return l !== listener; }));
    };
    var SharedPreferencesAndroid_1;
    SharedPreferencesAndroid.sharedPreferncesName = 'org.ekstep.genieservices.preference_file';
    SharedPreferencesAndroid = SharedPreferencesAndroid_1 = __decorate([
        injectable()
    ], SharedPreferencesAndroid);
    return SharedPreferencesAndroid;
}());
export { SharedPreferencesAndroid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLXByZWZlcmVuY2VzLWFuZHJvaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMvaW1wbC9zaGFyZWQtcHJlZmVyZW5jZXMtYW5kcm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDckMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3JDO0lBQUE7UUFHWSxjQUFTLEdBQXNDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFekQsc0JBQWlCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQywwQkFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBOEVySCxDQUFDO2lDQW5GWSx3QkFBd0I7SUFPMUIsNENBQVMsR0FBaEIsVUFBaUIsR0FBVztRQUE1QixpQkFtQkM7UUFsQkcsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QyxJQUFJLEtBQUssRUFBRTtZQUNQLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDZixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFRO2dCQUMzQixLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBQyxDQUFDO29CQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsRUFBRSxVQUFDLENBQUM7b0JBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLDRDQUFTLEdBQWhCLFVBQWlCLEdBQVcsRUFBRSxLQUFhO1FBQTNDLGlCQVVDO1FBVEcsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQVE7WUFDM0IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO2dCQUN6QyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztnQkFDdkUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLENBQUMsRUFBRSxVQUFDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZDQUFVLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxLQUFjO1FBQTdDLGlCQVVDO1FBVEcsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQVE7WUFDM0IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO2dCQUMxQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztnQkFDdkUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLENBQUMsRUFBRSxVQUFDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZDQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFBN0IsaUJBbUJDO1FBbEJHLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsSUFBSSxLQUFLLEVBQUU7WUFDUCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDOUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FDMUIsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsUUFBUTtnQkFDM0IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQUMsQ0FBQztvQkFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN4QixDQUFDLEVBQUUsVUFBQyxDQUFDO29CQUNELFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCw4Q0FBVyxHQUFYLFVBQVksR0FBVyxFQUFFLFFBQThCO1FBQ25ELElBQU0sWUFBWSxHQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekUsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGlEQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsUUFBOEI7UUFDdEQsSUFBTSxZQUFZLEdBQXlCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxRQUFRLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOztJQWpGdUIsNkNBQW9CLEdBQUcsMENBQTBDLENBQUM7SUFEakYsd0JBQXdCO1FBRHBDLFVBQVUsRUFBRTtPQUNBLHdCQUF3QixDQW1GcEM7SUFBRCwrQkFBQztDQUFBLEFBbkZELElBbUZDO1NBbkZZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2luamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge21hcFRvfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRQcmVmZXJlbmNlc0FuZHJvaWQgaW1wbGVtZW50cyBTaGFyZWRQcmVmZXJlbmNlcyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc2hhcmVkUHJlZmVybmNlc05hbWUgPSAnb3JnLmVrc3RlcC5nZW5pZXNlcnZpY2VzLnByZWZlcmVuY2VfZmlsZSc7XG5cbiAgICBwcml2YXRlIGxpc3RlbmVyczogTWFwPHN0cmluZywgKCh2OiBhbnkpID0+IHZvaWQpW10+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlcyA9IHBsdWdpbnMuU2hhcmVkUHJlZmVyZW5jZXMuZ2V0SW5zdGFuY2UoU2hhcmVkUHJlZmVyZW5jZXNBbmRyb2lkLnNoYXJlZFByZWZlcm5jZXNOYW1lKTtcblxuICAgIHB1YmxpYyBnZXRTdHJpbmcoa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXRTdHJpbmcoa2V5LCB2YWx1ZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXBUbyh2YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoa2V5LCAnJywgKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHB1dFN0cmluZyhrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IE9ic2VydmFibGU8dW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKGtleSwgdmFsdWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAodGhpcy5saXN0ZW5lcnMuZ2V0KGtleSkgfHwgW10pLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0Qm9vbGVhbihrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRCb29sZWFuKGtleSwgdmFsdWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAodGhpcy5saXN0ZW5lcnMuZ2V0KGtleSkgfHwgW10pLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJvb2xlYW4oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHV0Qm9vbGVhbihrZXksIHZhbHVlID09PSAndHJ1ZScpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwVG8odmFsdWUgPT09ICd0cnVlJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRCb29sZWFuKGtleSwgZmFsc2UsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodik7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZExpc3RlbmVyKGtleTogc3RyaW5nLCBsaXN0ZW5lcjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3Qga2V5TGlzdGVuZXJzOiAoKHY6IGFueSkgPT4gdm9pZClbXSA9IHRoaXMubGlzdGVuZXJzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICBrZXlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChrZXksIGtleUxpc3RlbmVycyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTGlzdGVuZXIoa2V5OiBzdHJpbmcsIGxpc3RlbmVyOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICBjb25zdCBrZXlMaXN0ZW5lcnM6ICgodjogYW55KSA9PiB2b2lkKVtdID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChrZXksIGtleUxpc3RlbmVycy5maWx0ZXIoKGwpID0+IGwgIT09IGxpc3RlbmVyKSk7XG4gICAgfVxufVxuIl19