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
var ImportAssertionError = /** @class */ (function (_super) {
    __extends(ImportAssertionError, _super);
    function ImportAssertionError(message, code) {
        var _this = _super.call(this, message, "ASSERTION_ERROR_" + code) || this;
        Object.setPrototypeOf(_this, ImportAssertionError.prototype);
        return _this;
    }
    return ImportAssertionError;
}(SunbirdError));
export { ImportAssertionError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWFzc2VydGlvbi1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcmNoaXZlL2ltcG9ydC9lcnJvci9pbXBvcnQtYXNzZXJ0aW9uLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQ7SUFBbUQsd0NBQVk7SUFDM0QsOEJBQXNCLE9BQWUsRUFBRSxJQUFZO1FBQW5ELFlBQ0ksa0JBQU0sT0FBTyxFQUFFLHFCQUFtQixJQUFNLENBQUMsU0FFNUM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDaEUsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQUxELENBQW1ELFlBQVksR0FLOUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbXBvcnRBc3NlcnRpb25FcnJvciBleHRlbmRzIFN1bmJpcmRFcnJvciB7XG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgY29kZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIGBBU1NFUlRJT05fRVJST1JfJHtjb2RlfWApO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0QXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=