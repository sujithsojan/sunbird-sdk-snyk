var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SunbirdError = /** @class */ (function (_super) {
    __extends(SunbirdError, _super);
    function SunbirdError(message, code) {
        var _this = _super.call(this, message) || this;
        _this._code = code;
        Object.setPrototypeOf(_this, SunbirdError.prototype);
        return _this;
    }
    Object.defineProperty(SunbirdError.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    return SunbirdError;
}(Error));
export { SunbirdError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VuYmlyZC1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdW5iaXJkLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUEyQyxnQ0FBSztJQUc1QyxzQkFBc0IsT0FBZSxFQUFFLElBQVk7UUFBbkQsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFIRyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVsQixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3hELENBQUM7SUFFRCxzQkFBSSw4QkFBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBMkMsS0FBSyxHQWEvQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdW5iaXJkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29kZTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgY29kZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9jb2RlID0gY29kZTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgU3VuYmlyZEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgZ2V0IGNvZGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGU7XG4gICAgfVxufVxuIl19