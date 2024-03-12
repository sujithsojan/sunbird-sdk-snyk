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
var NoGroupFoundError = /** @class */ (function (_super) {
    __extends(NoGroupFoundError, _super);
    function NoGroupFoundError(message) {
        var _this = _super.call(this, message, 'NO_GROUP_FOUND') || this;
        Object.setPrototypeOf(_this, NoGroupFoundError.prototype);
        return _this;
    }
    return NoGroupFoundError;
}(SunbirdError));
export { NoGroupFoundError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZ3JvdXAtZm91bmQtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JvdXAtZGVwcmVjYXRlZC9lcnJvci9uby1ncm91cC1mb3VuZC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQXVDLHFDQUFZO0lBQy9DLDJCQUFZLE9BQWU7UUFBM0IsWUFDSSxrQkFBTSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsU0FHbkM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDN0QsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXVDLFlBQVksR0FNbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBOb0dyb3VwRm91bmRFcnJvciBleHRlbmRzIFN1bmJpcmRFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdOT19HUk9VUF9GT1VORCcpO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBOb0dyb3VwRm91bmRFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbiJdfQ==