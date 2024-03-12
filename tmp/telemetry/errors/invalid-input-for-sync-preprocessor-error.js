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
var InvalidInputForSyncPreprocessorError = /** @class */ (function (_super) {
    __extends(InvalidInputForSyncPreprocessorError, _super);
    function InvalidInputForSyncPreprocessorError(message) {
        var _this = _super.call(this, message, 'INVALID_INPUT_FOR_SYNC_PREPROCESSOR') || this;
        Object.setPrototypeOf(_this, InvalidInputForSyncPreprocessorError.prototype);
        return _this;
    }
    return InvalidInputForSyncPreprocessorError;
}(SunbirdError));
export { InvalidInputForSyncPreprocessorError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1pbnB1dC1mb3Itc3luYy1wcmVwcm9jZXNzb3ItZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVsZW1ldHJ5L2Vycm9ycy9pbnZhbGlkLWlucHV0LWZvci1zeW5jLXByZXByb2Nlc3Nvci1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQTBELHdEQUFZO0lBQ2xFLDhDQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUscUNBQXFDLENBQUMsU0FHeEQ7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxvQ0FBb0MsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDaEYsQ0FBQztJQUNMLDJDQUFDO0FBQUQsQ0FBQyxBQU5ELENBQTBELFlBQVksR0FNckUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkSW5wdXRGb3JTeW5jUHJlcHJvY2Vzc29yRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnSU5WQUxJRF9JTlBVVF9GT1JfU1lOQ19QUkVQUk9DRVNTT1InKTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW52YWxpZElucHV0Rm9yU3luY1ByZXByb2Nlc3NvckVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19