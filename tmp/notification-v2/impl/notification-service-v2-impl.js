var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Container, inject, injectable } from "inversify";
import { CsInjectionTokens, InjectionTokens } from "../../injection-tokens";
var NotificationServiceV2Impl = /** @class */ (function () {
    function NotificationServiceV2Impl(container) {
        this.container = container;
    }
    Object.defineProperty(NotificationServiceV2Impl.prototype, "NotificationServiceV2Delegate", {
        get: function () {
            return this.container.get(CsInjectionTokens.NOTIFICATION_SERVICE_V2);
        },
        enumerable: false,
        configurable: true
    });
    NotificationServiceV2Impl.prototype.notificationRead = function (uid) {
        return this.NotificationServiceV2Delegate.notificationRead(uid);
    };
    NotificationServiceV2Impl.prototype.notificationUpdate = function (request) {
        return this.NotificationServiceV2Delegate.notificationUpdate(request);
    };
    NotificationServiceV2Impl.prototype.notificationDelete = function (request) {
        return this.NotificationServiceV2Delegate.notificationDelete(request);
    };
    NotificationServiceV2Impl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __metadata("design:paramtypes", [Container])
    ], NotificationServiceV2Impl);
    return NotificationServiceV2Impl;
}());
export { NotificationServiceV2Impl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlcnZpY2UtdjItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub3RpZmljYXRpb24tdjIvaW1wbC9ub3RpZmljYXRpb24tc2VydmljZS12Mi1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFPNUU7SUFFSSxtQ0FDK0MsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUVuRSxDQUFDO0lBRUQsc0JBQVksb0VBQTZCO2FBQXpDO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBRUQsb0RBQWdCLEdBQWhCLFVBQWlCLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHNEQUFrQixHQUFsQixVQUFtQixPQUFnQztRQUMvQyxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsc0RBQWtCLEdBQWxCLFVBQW1CLE9BQWdDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFyQlEseUJBQXlCO1FBRHJDLFVBQVUsRUFBRTtRQUlKLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTt5Q0FBb0IsU0FBUztPQUgxRCx5QkFBeUIsQ0F1QnJDO0lBQUQsZ0NBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDc0F0dGFjaEZvcnVtUmVzcG9uc2UgfSBmcm9tIFwiQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZGlzY3Vzc2lvblwiO1xuaW1wb3J0IHsgQ29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tIFwiaW52ZXJzaWZ5XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IENzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnMgfSBmcm9tIFwiLi4vLi4vaW5qZWN0aW9uLXRva2Vuc1wiO1xuaW1wb3J0IHsgQ3NDcmVhdGVVc2VyUmVzcG9uc2UgfSBmcm9tIFwiQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZGlzY3Vzc2lvblwiO1xuaW1wb3J0IHsgQ3NOb3RpZmljYXRpb25EZWxldGVSZXEsIENzTm90aWZpY2F0aW9uUmVhZFJlc3BvbnNlLCBDc05vdGlmaWNhdGlvblVwZGF0ZVJlcSB9IGZyb20gXCJAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9ub3RpZmljYXRpb24vaW50ZXJmYWNlL2NzLW5vdGlmaWNhdGlvbi1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlVjIgfSBmcm9tIFwiLi4vZGVmL25vdGlmaWNhdGlvbi1zZXJ2aWNlLXYyXCI7XG5cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2VWMkltcGwgaW1wbGVtZW50cyBOb3RpZmljYXRpb25TZXJ2aWNlVjIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkNPTlRBSU5FUikgcHJpdmF0ZSBjb250YWluZXI6IENvbnRhaW5lclxuICAgICkge1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IE5vdGlmaWNhdGlvblNlcnZpY2VWMkRlbGVnYXRlKCk6IE5vdGlmaWNhdGlvblNlcnZpY2VWMiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXQoQ3NJbmplY3Rpb25Ub2tlbnMuTk9USUZJQ0FUSU9OX1NFUlZJQ0VfVjIpO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvblJlYWQodWlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENzTm90aWZpY2F0aW9uUmVhZFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLk5vdGlmaWNhdGlvblNlcnZpY2VWMkRlbGVnYXRlLm5vdGlmaWNhdGlvblJlYWQodWlkKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25VcGRhdGUocmVxdWVzdDogQ3NOb3RpZmljYXRpb25VcGRhdGVSZXEpOiBPYnNlcnZhYmxlPENzQ3JlYXRlVXNlclJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLk5vdGlmaWNhdGlvblNlcnZpY2VWMkRlbGVnYXRlLm5vdGlmaWNhdGlvblVwZGF0ZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25EZWxldGUocmVxdWVzdDogQ3NOb3RpZmljYXRpb25EZWxldGVSZXEpOiBPYnNlcnZhYmxlPENzQXR0YWNoRm9ydW1SZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5Ob3RpZmljYXRpb25TZXJ2aWNlVjJEZWxlZ2F0ZS5ub3RpZmljYXRpb25EZWxldGUocmVxdWVzdCk7XG4gICAgfVxuXG59XG4iXX0=