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
var AuthTokenRefreshError = /** @class */ (function (_super) {
    __extends(AuthTokenRefreshError, _super);
    function AuthTokenRefreshError(message) {
        var _this = _super.call(this, message, 'AUTH_TOKEN_REFRESH_ERROR') || this;
        Object.setPrototypeOf(_this, AuthTokenRefreshError.prototype);
        return _this;
    }
    return AuthTokenRefreshError;
}(SunbirdError));
export { AuthTokenRefreshError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC10b2tlbi1yZWZyZXNoLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvZXJyb3JzL2F1dGgtdG9rZW4tcmVmcmVzaC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQTJDLHlDQUFZO0lBQ25ELCtCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsMEJBQTBCLENBQUMsU0FHN0M7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDakUsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQTJDLFlBQVksR0FNdEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBBdXRoVG9rZW5SZWZyZXNoRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQVVUSF9UT0tFTl9SRUZSRVNIX0VSUk9SJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEF1dGhUb2tlblJlZnJlc2hFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==