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
var CancellationError = /** @class */ (function (_super) {
    __extends(CancellationError, _super);
    function CancellationError(message) {
        var _this = _super.call(this, message, 'CANCELLED') || this;
        Object.setPrototypeOf(_this, CancellationError.prototype);
        return _this;
    }
    return CancellationError;
}(SunbirdError));
export { CancellationError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsbGF0aW9uLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3JhZ2UvZXJyb3JzL2NhbmNlbGxhdGlvbi1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQXVDLHFDQUFZO0lBQy9DLDJCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsV0FBVyxDQUFDLFNBRzlCO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzdELENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFORCxDQUF1QyxZQUFZLEdBTWxEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgQ2FuY2VsbGF0aW9uRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQ0FOQ0VMTEVEJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIENhbmNlbGxhdGlvbkVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19