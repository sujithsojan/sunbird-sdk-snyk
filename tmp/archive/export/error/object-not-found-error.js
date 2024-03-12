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
import { ExportAssertionError } from './export-assertion-error';
var ObjectNotFoundError = /** @class */ (function (_super) {
    __extends(ObjectNotFoundError, _super);
    function ObjectNotFoundError(message) {
        var _this = _super.call(this, message, 'OBJECT_NOT_FOUND') || this;
        Object.setPrototypeOf(_this, ObjectNotFoundError.prototype);
        return _this;
    }
    return ObjectNotFoundError;
}(ExportAssertionError));
export { ObjectNotFoundError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LW5vdC1mb3VuZC1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcmNoaXZlL2V4cG9ydC9lcnJvci9vYmplY3Qtbm90LWZvdW5kLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUU5RDtJQUF5Qyx1Q0FBb0I7SUFDekQsNkJBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxTQUVyQztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUMvRCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBeUMsb0JBQW9CLEdBSzVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFeHBvcnRBc3NlcnRpb25FcnJvcn0gZnJvbSAnLi9leHBvcnQtYXNzZXJ0aW9uLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBFeHBvcnRBc3NlcnRpb25FcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdPQkpFQ1RfTk9UX0ZPVU5EJyk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBPYmplY3ROb3RGb3VuZEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19