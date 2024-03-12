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
var InvalidArchiveError = /** @class */ (function (_super) {
    __extends(InvalidArchiveError, _super);
    function InvalidArchiveError(message) {
        var _this = _super.call(this, message, 'INVALID_ARCHIVE') || this;
        Object.setPrototypeOf(_this, InvalidArchiveError.prototype);
        return _this;
    }
    return InvalidArchiveError;
}(ImportAssertionError));
export { InvalidArchiveError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1hcmNoaXZlLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FyY2hpdmUvaW1wb3J0L2Vycm9yL2ludmFsaWQtYXJjaGl2ZS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFOUQ7SUFBeUMsdUNBQW9CO0lBQ3pELDZCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsU0FFcEM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQUxELENBQXlDLG9CQUFvQixHQUs1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW1wb3J0QXNzZXJ0aW9uRXJyb3J9IGZyb20gJy4vaW1wb3J0LWFzc2VydGlvbi1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkQXJjaGl2ZUVycm9yIGV4dGVuZHMgSW1wb3J0QXNzZXJ0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnSU5WQUxJRF9BUkNISVZFJyk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnZhbGlkQXJjaGl2ZUVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuIl19