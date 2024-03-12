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
var InvalidProfileError = /** @class */ (function (_super) {
    __extends(InvalidProfileError, _super);
    function InvalidProfileError(message) {
        var _this = _super.call(this, message, 'INVALID_PROFILE_ERROR') || this;
        Object.setPrototypeOf(_this, InvalidProfileError.prototype);
        return _this;
    }
    return InvalidProfileError;
}(SunbirdError));
export { InvalidProfileError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1wcm9maWxlLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb2ZpbGUvZXJyb3JzL2ludmFsaWQtcHJvZmlsZS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQXlDLHVDQUFZO0lBQ2pELDZCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsdUJBQXVCLENBQUMsU0FHMUM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXlDLFlBQVksR0FNcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUHJvZmlsZUVycm9yIGV4dGVuZHMgU3VuYmlyZEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0lOVkFMSURfUFJPRklMRV9FUlJPUicpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnZhbGlkUHJvZmlsZUVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19