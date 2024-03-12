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
var DuplicateContentError = /** @class */ (function (_super) {
    __extends(DuplicateContentError, _super);
    function DuplicateContentError(message) {
        var _this = _super.call(this, message, 'DUPLICATE_CONTENT') || this;
        Object.setPrototypeOf(_this, DuplicateContentError.prototype);
        return _this;
    }
    return DuplicateContentError;
}(SunbirdError));
export { DuplicateContentError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlLWNvbnRlbnQtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmFnZS9lcnJvcnMvZHVwbGljYXRlLWNvbnRlbnQtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRDtJQUEyQyx5Q0FBWTtJQUNuRCwrQkFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxFQUFFLG1CQUFtQixDQUFDLFNBR3RDO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ2pFLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFORCxDQUEyQyxZQUFZLEdBTXREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgRHVwbGljYXRlQ29udGVudEVycm9yIGV4dGVuZHMgU3VuYmlyZEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0RVUExJQ0FURV9DT05URU5UJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIER1cGxpY2F0ZUNvbnRlbnRFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==