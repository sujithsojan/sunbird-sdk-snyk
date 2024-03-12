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
var SignInError = /** @class */ (function (_super) {
    __extends(SignInError, _super);
    function SignInError(message) {
        var _this = _super.call(this, message, 'SIGN_IN_ERROR') || this;
        Object.setPrototypeOf(_this, SignInError.prototype);
        return _this;
    }
    return SignInError;
}(SunbirdError));
export { SignInError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2Vycm9ycy9zaWduLWluLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBaUMsK0JBQVk7SUFDekMscUJBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSxlQUFlLENBQUMsU0FHbEM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3ZELENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFORCxDQUFpQyxZQUFZLEdBTTVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgU2lnbkluRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnU0lHTl9JTl9FUlJPUicpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBTaWduSW5FcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==