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
var CertificateAlreadyDownloaded = /** @class */ (function (_super) {
    __extends(CertificateAlreadyDownloaded, _super);
    function CertificateAlreadyDownloaded(message, filePath) {
        var _this = _super.call(this, message, 'CERTIFICATE_ALREADY_DOWNLOADED') || this;
        _this.filePath = filePath;
        Object.setPrototypeOf(_this, CertificateAlreadyDownloaded.prototype);
        return _this;
    }
    return CertificateAlreadyDownloaded;
}(SunbirdError));
export { CertificateAlreadyDownloaded };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtYWxyZWFkeS1kb3dubG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvdXJzZS9lcnJvcnMvY2VydGlmaWNhdGUtYWxyZWFkeS1kb3dubG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBa0QsZ0RBQVk7SUFFNUQsc0NBQVksT0FBZSxFQUFFLFFBQWdCO1FBQTdDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLGdDQUFnQyxDQUFDLFNBSWpEO1FBSEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3RFLENBQUM7SUFDSCxtQ0FBQztBQUFELENBQUMsQUFSRCxDQUFrRCxZQUFZLEdBUTdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdW5iaXJkRXJyb3J9IGZyb20gJy4uLy4uL3N1bmJpcmQtZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgQ2VydGlmaWNhdGVBbHJlYWR5RG93bmxvYWRlZCBleHRlbmRzIFN1bmJpcmRFcnJvciB7XG4gIHJlYWRvbmx5IGZpbGVQYXRoOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UsICdDRVJUSUZJQ0FURV9BTFJFQURZX0RPV05MT0FERUQnKTtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG5cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQ2VydGlmaWNhdGVBbHJlYWR5RG93bmxvYWRlZC5wcm90b3R5cGUpO1xuICB9XG59XG4iXX0=