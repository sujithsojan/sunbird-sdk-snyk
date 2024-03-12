var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Stack = /** @class */ (function () {
    function Stack(stack) {
        this._stack = stack || [];
    }
    Object.defineProperty(Stack.prototype, "count", {
        get: function () {
            return this._stack.length;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.push = function (item) {
        this._stack.push(item);
    };
    Stack.prototype.pop = function () {
        return this._stack.pop();
    };
    Stack.prototype.clear = function () {
        this._stack = [];
    };
    Stack.prototype.isEmpty = function () {
        return (this._stack.length === 0);
    };
    Stack.prototype.addAll = function (item) {
        this._stack = __spreadArrays(this._stack, item);
    };
    return Stack;
}());
export { Stack };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC91dGlsL3N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQUdJLGVBQVksS0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHNCQUFXLHdCQUFLO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVNLG9CQUFJLEdBQVgsVUFBWSxJQUFPO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLG1CQUFHLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFHLENBQUM7SUFDOUIsQ0FBQztJQUVNLHFCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sdUJBQU8sR0FBZDtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sc0JBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sa0JBQ0osSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1YsQ0FBQztJQUNOLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdGFjazxUPiB7XG4gICAgcHJpdmF0ZSBfc3RhY2s6IFRbXTtcblxuICAgIGNvbnN0cnVjdG9yKHN0YWNrPzogVFtdKSB7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gc3RhY2sgfHwgW107XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhY2subGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoKGl0ZW06IFQpIHtcbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhY2sucG9wKCkhO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9zdGFjay5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBbGwoaXRlbTogVFtdKSB7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW1xuICAgICAgICAgICAgLi4udGhpcy5fc3RhY2ssXG4gICAgICAgICAgICAuLi5pdGVtXG4gICAgICAgIF07XG4gICAgfVxufVxuIl19