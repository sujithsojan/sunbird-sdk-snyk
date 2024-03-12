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
var ProcessingError = /** @class */ (function (_super) {
    __extends(ProcessingError, _super);
    function ProcessingError(message) {
        var _this = _super.call(this, message, 'PROCESSING_ERROR') || this;
        Object.setPrototypeOf(_this, ProcessingError.prototype);
        return _this;
    }
    return ProcessingError;
}(SunbirdError));
export { ProcessingError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2luZy1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2Vycm9ycy9wcm9jZXNzaW5nLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBcUMsbUNBQVk7SUFDN0MseUJBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxTQUdyQztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDM0QsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXFDLFlBQVksR0FNaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBQcm9jZXNzaW5nRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnUFJPQ0VTU0lOR19FUlJPUicpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBQcm9jZXNzaW5nRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=