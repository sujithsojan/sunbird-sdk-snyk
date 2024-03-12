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
import { ExportAssertionError } from './export-assertion-error';
var InvalidRequestError = /** @class */ (function (_super) {
    __extends(InvalidRequestError, _super);
    function InvalidRequestError(message) {
        var _this = _super.call(this, message, 'INVALID_REQUEST') || this;
        Object.setPrototypeOf(_this, InvalidRequestError.prototype);
        return _this;
    }
    return InvalidRequestError;
}(ExportAssertionError));
export { InvalidRequestError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1yZXF1ZXN0LWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FyY2hpdmUvZXhwb3J0L2Vycm9yL2ludmFsaWQtcmVxdWVzdC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFOUQ7SUFBeUMsdUNBQW9CO0lBQ3pELDZCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsU0FFcEM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQUxELENBQXlDLG9CQUFvQixHQUs1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXhwb3J0QXNzZXJ0aW9uRXJyb3J9IGZyb20gJy4vZXhwb3J0LWFzc2VydGlvbi1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUmVxdWVzdEVycm9yIGV4dGVuZHMgRXhwb3J0QXNzZXJ0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnSU5WQUxJRF9SRVFVRVNUJyk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnZhbGlkUmVxdWVzdEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19