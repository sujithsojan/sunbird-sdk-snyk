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
var InterruptError = /** @class */ (function (_super) {
    __extends(InterruptError, _super);
    function InterruptError(message) {
        var _this = _super.call(this, message, 'INTERRUPT_ERROR') || this;
        Object.setPrototypeOf(_this, WebviewRunnerError.prototype);
        return _this;
    }
    return InterruptError;
}(WebviewRunnerError));
export { InterruptError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJydXB0LWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2F1dGgvdXRpbC93ZWJ2aWV3LXNlc3Npb24tcHJvdmlkZXIvZXJyb3JzL2ludGVycnVwdC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQ7SUFBb0Msa0NBQWtCO0lBQ2xELHdCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsU0FHcEM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDOUQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQW9DLGtCQUFrQixHQU1yRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2Vidmlld1J1bm5lckVycm9yfSBmcm9tICcuL3dlYnZpZXctcnVubmVyLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIEludGVycnVwdEVycm9yIGV4dGVuZHMgV2Vidmlld1J1bm5lckVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0lOVEVSUlVQVF9FUlJPUicpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBXZWJ2aWV3UnVubmVyRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=