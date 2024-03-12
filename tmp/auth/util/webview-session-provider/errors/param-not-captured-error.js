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
import { WebviewRunnerError } from './webview-runner-error';
var ParamNotCapturedError = /** @class */ (function (_super) {
    __extends(ParamNotCapturedError, _super);
    function ParamNotCapturedError(message) {
        var _this = _super.call(this, message, 'PARAM_NOT_CAPTURED') || this;
        Object.setPrototypeOf(_this, ParamNotCapturedError.prototype);
        return _this;
    }
    return ParamNotCapturedError;
}(WebviewRunnerError));
export { ParamNotCapturedError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tbm90LWNhcHR1cmVkLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvZXJyb3JzL3BhcmFtLW5vdC1jYXB0dXJlZC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQ7SUFBMkMseUNBQWtCO0lBQ3pELCtCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsU0FHdkM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDakUsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQTJDLGtCQUFrQixHQU01RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2Vidmlld1J1bm5lckVycm9yfSBmcm9tICcuL3dlYnZpZXctcnVubmVyLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIFBhcmFtTm90Q2FwdHVyZWRFcnJvciBleHRlbmRzIFdlYnZpZXdSdW5uZXJFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdQQVJBTV9OT1RfQ0FQVFVSRUQnKTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgUGFyYW1Ob3RDYXB0dXJlZEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19