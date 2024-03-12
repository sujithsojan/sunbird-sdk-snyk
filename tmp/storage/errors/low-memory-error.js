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
var LowMemoryError = /** @class */ (function (_super) {
    __extends(LowMemoryError, _super);
    function LowMemoryError(message) {
        var _this = _super.call(this, message, 'LOW_MEMORY') || this;
        Object.setPrototypeOf(_this, LowMemoryError.prototype);
        return _this;
    }
    return LowMemoryError;
}(SunbirdError));
export { LowMemoryError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93LW1lbW9yeS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yYWdlL2Vycm9ycy9sb3ctbWVtb3J5LWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBb0Msa0NBQVk7SUFDNUMsd0JBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSxZQUFZLENBQUMsU0FHL0I7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzFELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFORCxDQUFvQyxZQUFZLEdBTS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgTG93TWVtb3J5RXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnTE9XX01FTU9SWScpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBMb3dNZW1vcnlFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==