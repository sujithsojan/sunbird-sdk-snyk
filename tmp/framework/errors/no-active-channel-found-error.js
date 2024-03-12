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
var NoActiveChannelFoundError = /** @class */ (function (_super) {
    __extends(NoActiveChannelFoundError, _super);
    function NoActiveChannelFoundError(message) {
        var _this = _super.call(this, message, 'NO_ACTIVE_CHANNEL_FOUND_ERROR') || this;
        Object.setPrototypeOf(_this, NoActiveChannelFoundError.prototype);
        return _this;
    }
    return NoActiveChannelFoundError;
}(SunbirdError));
export { NoActiveChannelFoundError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tYWN0aXZlLWNoYW5uZWwtZm91bmQtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnJhbWV3b3JrL2Vycm9ycy9uby1hY3RpdmUtY2hhbm5lbC1mb3VuZC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQStDLDZDQUFZO0lBQ3ZELG1DQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsK0JBQStCLENBQUMsU0FHbEQ7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDckUsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQU5ELENBQStDLFlBQVksR0FNMUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBOb0FjdGl2ZUNoYW5uZWxGb3VuZEVycm9yIGV4dGVuZHMgU3VuYmlyZEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ05PX0FDVElWRV9DSEFOTkVMX0ZPVU5EX0VSUk9SJyk7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIE5vQWN0aXZlQ2hhbm5lbEZvdW5kRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=