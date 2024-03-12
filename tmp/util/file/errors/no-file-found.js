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
import { SunbirdError } from '../../../sunbird-error';
var NoFileFoundError = /** @class */ (function (_super) {
    __extends(NoFileFoundError, _super);
    function NoFileFoundError(message) {
        var _this = _super.call(this, message, 'NO_FILE_FOUND') || this;
        Object.setPrototypeOf(_this, NoFileFoundError.prototype);
        return _this;
    }
    return NoFileFoundError;
}(SunbirdError));
export { NoFileFoundError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZmlsZS1mb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2ZpbGUvZXJyb3JzL25vLWZpbGUtZm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRDtJQUFzQyxvQ0FBWTtJQUM5QywwQkFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxFQUFFLGVBQWUsQ0FBQyxTQUdsQztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUM1RCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBc0MsWUFBWSxHQU1qRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3VuYmlyZEVycm9yfSBmcm9tICcuLi8uLi8uLi9zdW5iaXJkLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIE5vRmlsZUZvdW5kRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnTk9fRklMRV9GT1VORCcpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBOb0ZpbGVGb3VuZEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19