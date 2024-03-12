var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defer, of } from 'rxjs';
import { injectable } from 'inversify';
import { map, mapTo } from 'rxjs/operators';
var SharedPreferencesLocalStorage = /** @class */ (function () {
    function SharedPreferencesLocalStorage() {
        this.listeners = new Map();
    }
    SharedPreferencesLocalStorage.prototype.getString = function (key) {
        return defer(function () { return of(localStorage.getItem(key)).pipe(map(function (v) { return v || undefined; })); });
    };
    SharedPreferencesLocalStorage.prototype.putString = function (key, value) {
        return defer(function () { return of(localStorage.setItem(key, value)).pipe(mapTo(undefined)); });
    };
    SharedPreferencesLocalStorage.prototype.putBoolean = function (key, value) {
        return defer(function () {
            return of(localStorage.setItem(key, value + '')).pipe(mapTo(true));
        });
    };
    SharedPreferencesLocalStorage.prototype.getBoolean = function (key) {
        return defer(function () { return of(localStorage.getItem(key) === 'true'); });
    };
    SharedPreferencesLocalStorage.prototype.addListener = function (key, listener) {
        var keyListeners = this.listeners.get(key) || [];
        keyListeners.push(listener);
        this.listeners.set(key, keyListeners);
    };
    SharedPreferencesLocalStorage.prototype.removeListener = function (key, listener) {
        var keyListeners = this.listeners.get(key) || [];
        this.listeners.set(key, keyListeners.filter(function (l) { return l !== listener; }));
    };
    SharedPreferencesLocalStorage = __decorate([
        injectable()
    ], SharedPreferencesLocalStorage);
    return SharedPreferencesLocalStorage;
}());
export { SharedPreferencesLocalStorage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLXByZWZlcmVuY2VzLWxvY2FsLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMvaW1wbC9zaGFyZWQtcHJlZmVyZW5jZXMtbG9jYWwtc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUMsS0FBSyxFQUFjLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUM7SUFBQTtRQUNZLGNBQVMsR0FBc0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQXFDckUsQ0FBQztJQW5DVSxpREFBUyxHQUFoQixVQUFpQixHQUFXO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakQsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxJQUFJLFNBQVMsRUFBZCxDQUFjLENBQUMsQ0FBQyxFQURaLENBQ1ksQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFTSxpREFBUyxHQUFoQixVQUFpQixHQUFXLEVBQUUsS0FBYTtRQUN2QyxPQUFPLEtBQUssQ0FBQyxjQUFNLE9BQUEsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN4RCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFERixDQUNFLENBQ3BCLENBQUM7SUFDTixDQUFDO0lBRU0sa0RBQVUsR0FBakIsVUFBa0IsR0FBVyxFQUFFLEtBQWM7UUFDekMsT0FBTyxLQUFLLENBQUM7WUFDVCxPQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQURoQixDQUNnQixDQUNuQixDQUFDO0lBQ04sQ0FBQztJQUVNLGtEQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDekIsT0FBTyxLQUFLLENBQUMsY0FBTSxPQUFBLEVBQUUsQ0FDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQ3ZDLEVBRmtCLENBRWxCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtREFBVyxHQUFYLFVBQVksR0FBVyxFQUFFLFFBQThCO1FBQ25ELElBQU0sWUFBWSxHQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekUsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHNEQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsUUFBOEI7UUFDdEQsSUFBTSxZQUFZLEdBQXlCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxRQUFRLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBckNRLDZCQUE2QjtRQUR6QyxVQUFVLEVBQUU7T0FDQSw2QkFBNkIsQ0FzQ3pDO0lBQUQsb0NBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQXRDWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLic7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2luamVjdGFibGV9IGZyb20gJ2ludmVyc2lmeSc7XG5pbXBvcnQge21hcCwgbWFwVG99IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFByZWZlcmVuY2VzTG9jYWxTdG9yYWdlIGltcGxlbWVudHMgU2hhcmVkUHJlZmVyZW5jZXMge1xuICAgIHByaXZhdGUgbGlzdGVuZXJzOiBNYXA8c3RyaW5nLCAoKHY6IGFueSkgPT4gdm9pZClbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgZ2V0U3RyaW5nKGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IG9mKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHYpID0+IHYgfHwgdW5kZWZpbmVkKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0U3RyaW5nKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IG9mKGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpKS5waXBlKFxuICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0Qm9vbGVhbihrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+XG4gICAgICAgICAgICBvZihsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlICsgJycpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcFRvKHRydWUpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCb29sZWFuKGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBkZWZlcigoKSA9PiBvZihcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgPT09ICd0cnVlJ1xuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBhZGRMaXN0ZW5lcihrZXk6IHN0cmluZywgbGlzdGVuZXI6ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IGtleUxpc3RlbmVyczogKCh2OiBhbnkpID0+IHZvaWQpW10gPSB0aGlzLmxpc3RlbmVycy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAga2V5TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQoa2V5LCBrZXlMaXN0ZW5lcnMpO1xuICAgIH1cblxuICAgIHJlbW92ZUxpc3RlbmVyKGtleTogc3RyaW5nLCBsaXN0ZW5lcjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3Qga2V5TGlzdGVuZXJzOiAoKHY6IGFueSkgPT4gdm9pZClbXSA9IHRoaXMubGlzdGVuZXJzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5zZXQoa2V5LCBrZXlMaXN0ZW5lcnMuZmlsdGVyKChsKSA9PiBsICE9PSBsaXN0ZW5lcikpO1xuICAgIH1cbn1cbiJdfQ==