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
var NoCertificateFound = /** @class */ (function (_super) {
    __extends(NoCertificateFound, _super);
    function NoCertificateFound(message) {
        var _this = _super.call(this, message, 'NO_CERTIFICATE_FOUND') || this;
        Object.setPrototypeOf(_this, NoCertificateFound.prototype);
        return _this;
    }
    return NoCertificateFound;
}(SunbirdError));
export { NoCertificateFound };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tY2VydGlmaWNhdGUtZm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY291cnNlL2Vycm9ycy9uby1jZXJ0aWZpY2F0ZS1mb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpEO0lBQXdDLHNDQUFZO0lBQ2xELDRCQUFZLE9BQWU7UUFBM0IsWUFDRSxrQkFBTSxPQUFPLEVBQUUsc0JBQXNCLENBQUMsU0FHdkM7UUFEQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDNUQsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXdDLFlBQVksR0FNbkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1bmJpcmRFcnJvcn0gZnJvbSAnLi4vLi4vc3VuYmlyZC1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBOb0NlcnRpZmljYXRlRm91bmQgZXh0ZW5kcyBTdW5iaXJkRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlLCAnTk9fQ0VSVElGSUNBVEVfRk9VTkQnKTtcblxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBOb0NlcnRpZmljYXRlRm91bmQucHJvdG90eXBlKTtcbiAgfVxufVxuIl19