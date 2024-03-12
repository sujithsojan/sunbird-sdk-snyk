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
import { SunbirdError } from '../../sunbird-error';
var NoProfileFoundError = /** @class */ (function (_super) {
    __extends(NoProfileFoundError, _super);
    function NoProfileFoundError(message) {
        var _this = _super.call(this, message, 'NO_PROFILE_FOUND') || this;
        Object.setPrototypeOf(_this, NoProfileFoundError.prototype);
        return _this;
    }
    return NoProfileFoundError;
}(SunbirdError));
export { NoProfileFoundError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tcHJvZmlsZS1mb3VuZC1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm9maWxlL2Vycm9ycy9uby1wcm9maWxlLWZvdW5kLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBeUMsdUNBQVk7SUFDakQsNkJBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxTQUdyQztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUMvRCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBeUMsWUFBWSxHQU1wRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3VuYmlyZEVycm9yfSBmcm9tICcuLi8uLi9zdW5iaXJkLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIE5vUHJvZmlsZUZvdW5kRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnTk9fUFJPRklMRV9GT1VORCcpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBOb1Byb2ZpbGVGb3VuZEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19