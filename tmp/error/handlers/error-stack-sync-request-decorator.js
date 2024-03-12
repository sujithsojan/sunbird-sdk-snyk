var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ProducerData } from '../../telemetry';
import { defer } from 'rxjs';
var ErrorStackSyncRequestDecorator = /** @class */ (function () {
    function ErrorStackSyncRequestDecorator(apiConfig, deviceInfo, appInfo) {
        this.apiConfig = apiConfig;
        this.deviceInfo = deviceInfo;
        this.appInfo = appInfo;
    }
    ErrorStackSyncRequestDecorator.prototype.decorate = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.patchPData(request);
                        return [4 /*yield*/, this.patchContext(request)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, request];
                }
            });
        }); });
    };
    ErrorStackSyncRequestDecorator.prototype.patchContext = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = request;
                        _b = {
                            did: this.deviceInfo.getDeviceID()
                        };
                        return [4 /*yield*/, this.deviceInfo.getDeviceSpec().toPromise()];
                    case 1:
                        _a.context = (_b.spec = _c.sent(),
                            _b);
                        return [2 /*return*/];
                }
            });
        });
    };
    ErrorStackSyncRequestDecorator.prototype.patchPData = function (request) {
        request.pdata = new ProducerData();
        request.pdata.id = this.apiConfig.api_authentication.producerId;
        var pid = request.pdata.pid;
        if (pid) {
            request.pdata.pid = pid;
        }
        else if (this.apiConfig.api_authentication.producerUniqueId) {
            request.pdata.pid = this.apiConfig.api_authentication.producerUniqueId;
        }
        else {
            request.pdata.pid = 'sunbird.android';
        }
        if (!request.pdata.ver) {
            request.pdata.ver = this.appInfo.getVersionName();
        }
    };
    return ErrorStackSyncRequestDecorator;
}());
export { ErrorStackSyncRequestDecorator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RhY2stc3luYy1yZXF1ZXN0LWRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lcnJvci9oYW5kbGVycy9lcnJvci1zdGFjay1zeW5jLXJlcXVlc3QtZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUc3QyxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBYXZDO0lBQ0ksd0NBQ1ksU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsT0FBZ0I7UUFGaEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFFNUIsQ0FBQztJQUVELGlEQUFRLEdBQVIsVUFBUyxPQUFnQjtRQUF6QixpQkFNQztRQUxHLE9BQU8sS0FBSyxDQUFDOzs7O3dCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pCLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFoQyxTQUFnQyxDQUFDO3dCQUNqQyxzQkFBTyxPQUFPLEVBQUM7OzthQUNsQixDQUFDLENBQUM7SUFDWCxDQUFDO0lBRWEscURBQVksR0FBMUIsVUFBMkIsT0FBZ0I7Ozs7Ozt3QkFDdkMsS0FBQSxPQUFPLENBQUE7OzRCQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTs7d0JBQzVCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUYzRCxHQUFRLE9BQU8sSUFFWCxPQUFJLEdBQUUsU0FBaUQ7K0JBQzFELENBQUM7Ozs7O0tBQ0w7SUFFTyxtREFBVSxHQUFsQixVQUFtQixPQUFnQjtRQUMvQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFFaEUsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFFOUIsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxRTthQUFNO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFDTCxxQ0FBQztBQUFELENBQUMsQUExQ0QsSUEwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb2R1Y2VyRGF0YX0gZnJvbSAnLi4vLi4vdGVsZW1ldHJ5JztcbmltcG9ydCB7QXBpQ29uZmlnfSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtEZXZpY2VJbmZvLCBEZXZpY2VTcGVjfSBmcm9tICcuLi8uLi91dGlsL2RldmljZSc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXBwSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9hcHAnO1xuXG5pbnRlcmZhY2UgQ29udGV4dCB7XG4gICAgZGlkOiBzdHJpbmc7XG4gICAgc3BlYzogRGV2aWNlU3BlYztcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3Qge1xuICAgIHBkYXRhPzogUHJvZHVjZXJEYXRhO1xuICAgIGNvbnRleHQ/OiBDb250ZXh0O1xufVxuXG5leHBvcnQgY2xhc3MgRXJyb3JTdGFja1N5bmNSZXF1ZXN0RGVjb3JhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcGlDb25maWc6IEFwaUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICBwcml2YXRlIGFwcEluZm86IEFwcEluZm9cbiAgICApIHtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZShyZXF1ZXN0OiBSZXF1ZXN0KTogT2JzZXJ2YWJsZTxSZXF1ZXN0PiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRjaFBEYXRhKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGF0Y2hDb250ZXh0KHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBwYXRjaENvbnRleHQocmVxdWVzdDogUmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0LmNvbnRleHQgPSB7XG4gICAgICAgICAgICBkaWQ6IHRoaXMuZGV2aWNlSW5mby5nZXREZXZpY2VJRCgpLFxuICAgICAgICAgICAgc3BlYzogYXdhaXQgdGhpcy5kZXZpY2VJbmZvLmdldERldmljZVNwZWMoKS50b1Byb21pc2UoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgcGF0Y2hQRGF0YShyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3QucGRhdGEgPSBuZXcgUHJvZHVjZXJEYXRhKCk7XG5cbiAgICAgICAgcmVxdWVzdC5wZGF0YS5pZCA9IHRoaXMuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5wcm9kdWNlcklkO1xuXG4gICAgICAgIGNvbnN0IHBpZCA9IHJlcXVlc3QucGRhdGEucGlkO1xuXG4gICAgICAgIGlmIChwaWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucGRhdGEucGlkID0gcGlkO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5wcm9kdWNlclVuaXF1ZUlkKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnBkYXRhLnBpZCA9IHRoaXMuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5wcm9kdWNlclVuaXF1ZUlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdC5wZGF0YS5waWQgPSAnc3VuYmlyZC5hbmRyb2lkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVxdWVzdC5wZGF0YS52ZXIpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucGRhdGEudmVyID0gdGhpcy5hcHBJbmZvLmdldFZlcnNpb25OYW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=