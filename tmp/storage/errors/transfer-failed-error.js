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
var TransferFailedError = /** @class */ (function (_super) {
    __extends(TransferFailedError, _super);
    function TransferFailedError(message, directory) {
        var _this = _super.call(this, message, 'TRANSFER_FAILED_ERROR') || this;
        _this.directory = directory;
        Object.setPrototypeOf(_this, TransferFailedError.prototype);
        return _this;
    }
    return TransferFailedError;
}(SunbirdError));
export { TransferFailedError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXItZmFpbGVkLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0b3JhZ2UvZXJyb3JzL3RyYW5zZmVyLWZhaWxlZC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQXlDLHVDQUFZO0lBQ2pELDZCQUFZLE9BQWUsRUFBa0IsU0FBaUI7UUFBOUQsWUFDSSxrQkFBTSxPQUFPLEVBQUUsdUJBQXVCLENBQUMsU0FHMUM7UUFKNEMsZUFBUyxHQUFULFNBQVMsQ0FBUTtRQUcxRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXlDLFlBQVksR0FNcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2ZlckZhaWxlZEVycm9yIGV4dGVuZHMgU3VuYmlyZEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHB1YmxpYyByZWFkb25seSBkaXJlY3Rvcnk6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnVFJBTlNGRVJfRkFJTEVEX0VSUk9SJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFRyYW5zZmVyRmFpbGVkRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=