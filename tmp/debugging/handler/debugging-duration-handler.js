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
import { CsClientStorage } from "@project-sunbird/client-services/core";
var DebuggingDurationHandler = /** @class */ (function () {
    function DebuggingDurationHandler(sharedPreferences, debuggingServiceImpl) {
        this.sharedPreferences = sharedPreferences;
        this.debuggingServiceImpl = debuggingServiceImpl;
    }
    DebuggingDurationHandler.prototype.handle = function (observer) {
        return __awaiter(this, void 0, void 0, function () {
            var startTimeStamp, watch_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedPreferences.getString('debug_started_at').toPromise()];
                    case 1:
                        startTimeStamp = _a.sent();
                        console.log(startTimeStamp);
                        if (startTimeStamp) {
                            watch_1 = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                var cur, diff;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            cur = new Date().getTime();
                                            diff = (cur - new Date(parseInt(startTimeStamp)).getTime()) / 1000;
                                            diff /= 60;
                                            console.log('diff', Math.abs(Math.round(diff)));
                                            if (!(Math.abs(Math.round(diff)) >= 10)) return [3 /*break*/, 2];
                                            this.sharedPreferences.putString('debug_started_at', '').toPromise();
                                            this.debuggingServiceImpl.disableDebugging();
                                            return [4 /*yield*/, this.sharedPreferences.putString(CsClientStorage.TRACE_ID, '').toPromise()];
                                        case 1:
                                            _a.sent();
                                            observer.next(false);
                                            observer.complete();
                                            clearInterval(watch_1);
                                            this.debuggingServiceImpl.watcher.interval = null;
                                            this.debuggingServiceImpl.watcher.observer = null;
                                            this.debuggingServiceImpl.watcher.debugStatus = false;
                                            return [3 /*break*/, 3];
                                        case 2:
                                            observer.next(true);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, 1 * 60 * 1000);
                            this.debuggingServiceImpl.watcher.interval = watch_1;
                            this.debuggingServiceImpl.watcher.observer = observer;
                            this.debuggingServiceImpl.watcher.debugStatus = true;
                        }
                        else {
                            observer.next(false);
                            observer.complete();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return DebuggingDurationHandler;
}());
export { DebuggingDurationHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdnaW5nLWR1cmF0aW9uLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVidWdnaW5nL2hhbmRsZXIvZGVidWdnaW5nLWR1cmF0aW9uLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBS3hFO0lBQ0ksa0NBQ1ksaUJBQW9DLEVBQ3BDLG9CQUEwQztRQUQxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVFLHlDQUFNLEdBQVosVUFBYSxRQUE2Qjs7Ozs7OzRCQUNqQixxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF2RixjQUFjLEdBQUcsU0FBc0U7d0JBQzNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzVCLElBQUksY0FBYyxFQUFFOzRCQUNaLFVBQVEsV0FBVyxDQUFDOzs7Ozs0Q0FDaEIsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7NENBQzNCLElBQUksR0FBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBd0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7NENBQ2hGLElBQUksSUFBSSxFQUFFLENBQUM7NENBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpREFDNUMsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUEsRUFBaEMsd0JBQWdDOzRDQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDOzRDQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs0Q0FDN0MscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzs0Q0FBL0UsU0FBK0UsQ0FBQzs0Q0FDaEYsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0Q0FDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRDQUNwQixhQUFhLENBQUMsT0FBSyxDQUFDLENBQUM7NENBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs0Q0FDbEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzRDQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Ozs0Q0FFdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7aUNBRTNCLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDZCxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFLLENBQUM7NEJBQ25ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs0QkFDdEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO3lCQUN4RDs2QkFBTTs0QkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNyQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQ3ZCOzs7OztLQUNKO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3NDbGllbnRTdG9yYWdlIH0gZnJvbSBcIkBwcm9qZWN0LXN1bmJpcmQvY2xpZW50LXNlcnZpY2VzL2NvcmVcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgU2hhcmVkUHJlZmVyZW5jZXMgfSBmcm9tIFwiLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXNcIjsgXG5pbXBvcnQgeyBEZWJ1Z2dpbmdTZXJ2aWNlSW1wbCB9IGZyb20gXCIuLi9pbXBsL2RlYnVnZ2luLXNlcnZpY2UtaW1wbFwiO1xuXG5leHBvcnQgY2xhc3MgRGVidWdnaW5nRHVyYXRpb25IYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMsXG4gICAgICAgIHByaXZhdGUgZGVidWdnaW5nU2VydmljZUltcGw6IERlYnVnZ2luZ1NlcnZpY2VJbXBsXG4gICAgKSB7fVxuXG4gICAgYXN5bmMgaGFuZGxlKG9ic2VydmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSB7XG4gICAgICAgIGxldCBzdGFydFRpbWVTdGFtcCA9IGF3YWl0IHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMuZ2V0U3RyaW5nKCdkZWJ1Z19zdGFydGVkX2F0JykudG9Qcm9taXNlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0YXJ0VGltZVN0YW1wKTtcbiAgICAgICAgaWYgKHN0YXJ0VGltZVN0YW1wKSB7XG4gICAgICAgICAgICBsZXQgd2F0Y2ggPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN1ciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkaWZmID0oY3VyIC0gbmV3IERhdGUocGFyc2VJbnQoc3RhcnRUaW1lU3RhbXAgYXMgc3RyaW5nKSkuZ2V0VGltZSgpKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgZGlmZiAvPSA2MDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlmZicsIE1hdGguYWJzKE1hdGgucm91bmQoZGlmZikpKTtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoTWF0aC5yb3VuZChkaWZmKSkgPj0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoJ2RlYnVnX3N0YXJ0ZWRfYXQnLCAnJykudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nU2VydmljZUltcGwuZGlzYWJsZURlYnVnZ2luZygpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLnB1dFN0cmluZyhDc0NsaWVudFN0b3JhZ2UuVFJBQ0VfSUQsJycpLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3YXRjaCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nU2VydmljZUltcGwud2F0Y2hlci5pbnRlcnZhbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nU2VydmljZUltcGwud2F0Y2hlci5vYnNlcnZlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nU2VydmljZUltcGwud2F0Y2hlci5kZWJ1Z1N0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMSo2MCoxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZGVidWdnaW5nU2VydmljZUltcGwud2F0Y2hlci5pbnRlcnZhbCA9IHdhdGNoO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Z2dpbmdTZXJ2aWNlSW1wbC53YXRjaGVyLm9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICB0aGlzLmRlYnVnZ2luZ1NlcnZpY2VJbXBsLndhdGNoZXIuZGVidWdTdGF0dXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChmYWxzZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==