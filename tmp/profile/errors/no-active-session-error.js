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
var NoActiveSessionError = /** @class */ (function (_super) {
    __extends(NoActiveSessionError, _super);
    function NoActiveSessionError(message) {
        var _this = _super.call(this, message, 'NO_ACTIVE_SESSION') || this;
        Object.setPrototypeOf(_this, NoActiveSessionError.prototype);
        return _this;
    }
    return NoActiveSessionError;
}(SunbirdError));
export { NoActiveSessionError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tYWN0aXZlLXNlc3Npb24tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvZmlsZS9lcnJvcnMvbm8tYWN0aXZlLXNlc3Npb24tZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRDtJQUEwQyx3Q0FBWTtJQUNsRCw4QkFBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0sT0FBTyxFQUFFLG1CQUFtQixDQUFDLFNBR3RDO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ2hFLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFORCxDQUEwQyxZQUFZLEdBTXJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgTm9BY3RpdmVTZXNzaW9uRXJyb3IgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnTk9fQUNUSVZFX1NFU1NJT04nKTtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgTm9BY3RpdmVTZXNzaW9uRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4iXX0=