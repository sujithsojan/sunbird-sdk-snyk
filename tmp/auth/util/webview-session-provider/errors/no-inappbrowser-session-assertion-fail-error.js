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
var NoInappbrowserSessionAssertionFailError = /** @class */ (function (_super) {
    __extends(NoInappbrowserSessionAssertionFailError, _super);
    function NoInappbrowserSessionAssertionFailError(message) {
        var _this = _super.call(this, message, 'NO_INAPPBROWSER_SESSION_ASSERTION_FAIL') || this;
        Object.setPrototypeOf(_this, WebviewRunnerError.prototype);
        return _this;
    }
    return NoInappbrowserSessionAssertionFailError;
}(WebviewRunnerError));
export { NoInappbrowserSessionAssertionFailError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8taW5hcHBicm93c2VyLXNlc3Npb24tYXNzZXJ0aW9uLWZhaWwtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXV0aC91dGlsL3dlYnZpZXctc2Vzc2lvbi1wcm92aWRlci9lcnJvcnMvbm8taW5hcHBicm93c2VyLXNlc3Npb24tYXNzZXJ0aW9uLWZhaWwtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFEO0lBQTZELDJEQUFrQjtJQUMzRSxpREFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxFQUFFLHdDQUF3QyxDQUFDLFNBRzNEO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFDTCw4Q0FBQztBQUFELENBQUMsQUFORCxDQUE2RCxrQkFBa0IsR0FNOUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1dlYnZpZXdSdW5uZXJFcnJvcn0gZnJvbSAnLi93ZWJ2aWV3LXJ1bm5lci1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBOb0luYXBwYnJvd3NlclNlc3Npb25Bc3NlcnRpb25GYWlsRXJyb3IgZXh0ZW5kcyBXZWJ2aWV3UnVubmVyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnTk9fSU5BUFBCUk9XU0VSX1NFU1NJT05fQVNTRVJUSU9OX0ZBSUwnKTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgV2Vidmlld1J1bm5lckVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19