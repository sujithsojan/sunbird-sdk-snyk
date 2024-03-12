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
var InAppBrowserExitError = /** @class */ (function (_super) {
    __extends(InAppBrowserExitError, _super);
    function InAppBrowserExitError(message) {
        var _this = _super.call(this, message, 'IN_APP_BROWSER_EXIT_ERROR') || this;
        Object.setPrototypeOf(_this, InAppBrowserExitError.prototype);
        return _this;
    }
    return InAppBrowserExitError;
}(SunbirdError));
export { InAppBrowserExitError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tYXBwLWJyb3dzZXItZXhpdC1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2Vycm9ycy9pbi1hcHAtYnJvd3Nlci1leGl0LWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBMkMseUNBQVk7SUFDbkQsK0JBQVksT0FBZTtRQUEzQixZQUNJLGtCQUFNLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQyxTQUc5QztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNqRSxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBMkMsWUFBWSxHQU10RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3VuYmlyZEVycm9yfSBmcm9tICcuLi8uLi9zdW5iaXJkLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIEluQXBwQnJvd3NlckV4aXRFcnJvciBleHRlbmRzIFN1bmJpcmRFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdJTl9BUFBfQlJPV1NFUl9FWElUX0VSUk9SJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEluQXBwQnJvd3NlckV4aXRFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==