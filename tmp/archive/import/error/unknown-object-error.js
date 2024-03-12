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
import { ImportAssertionError } from './import-assertion-error';
var UnknownObjectError = /** @class */ (function (_super) {
    __extends(UnknownObjectError, _super);
    function UnknownObjectError(message) {
        var _this = _super.call(this, message, 'UNKNOWN_OBJECT_ERROR') || this;
        Object.setPrototypeOf(_this, UnknownObjectError.prototype);
        return _this;
    }
    return UnknownObjectError;
}(ImportAssertionError));
export { UnknownObjectError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1vYmplY3QtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXJjaGl2ZS9pbXBvcnQvZXJyb3IvdW5rbm93bi1vYmplY3QtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTlEO0lBQXdDLHNDQUFvQjtJQUN4RCw0QkFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxFQUFFLHNCQUFzQixDQUFDLFNBRXpDO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFMRCxDQUF3QyxvQkFBb0IsR0FLM0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ltcG9ydEFzc2VydGlvbkVycm9yfSBmcm9tICcuL2ltcG9ydC1hc3NlcnRpb24tZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgVW5rbm93bk9iamVjdEVycm9yIGV4dGVuZHMgSW1wb3J0QXNzZXJ0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnVU5LTk9XTl9PQkpFQ1RfRVJST1InKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFVua25vd25PYmplY3RFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==