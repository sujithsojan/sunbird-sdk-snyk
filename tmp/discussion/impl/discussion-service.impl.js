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
var DiscussionServiceImpl = /** @class */ (function () {
    function DiscussionServiceImpl(container) {
        this.container = container;
    }
    Object.defineProperty(DiscussionServiceImpl.prototype, "discussionServiceDelegate", {
        get: function () {
            return this.container.get(CsInjectionTokens.DISCUSSION_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    DiscussionServiceImpl.prototype.getForumIds = function (request) {
        return this.discussionServiceDelegate.getForumIds(request);
    };
    DiscussionServiceImpl.prototype.createUser = function (request) {
        return this.discussionServiceDelegate.createUser(request);
    };
    DiscussionServiceImpl.prototype.attachForum = function (request) {
        return this.discussionServiceDelegate.attachForum(request);
    };
    DiscussionServiceImpl.prototype.removeForum = function (request) {
        return this.discussionServiceDelegate.removeForum(request);
    };
    DiscussionServiceImpl.prototype.createForum = function (request) {
        return this.discussionServiceDelegate.createForum(request);
    };
    DiscussionServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __metadata("design:paramtypes", [Container])
    ], DiscussionServiceImpl);
    return DiscussionServiceImpl;
}());
export { DiscussionServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY3Vzc2lvbi1zZXJ2aWNlLmltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlzY3Vzc2lvbi9pbXBsL2Rpc2N1c3Npb24tc2VydmljZS5pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFNNUU7SUFHSSwrQkFDK0MsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUVuRSxDQUFDO0lBRUQsc0JBQVksNERBQXlCO2FBQXJDO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7OztPQUFBO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE9BQTZCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLE9BQTRCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE9BQTZCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE9BQTZCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQTlCUSxxQkFBcUI7UUFEakMsVUFBVSxFQUFFO1FBS0osV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3lDQUFvQixTQUFTO09BSjFELHFCQUFxQixDQWdDakM7SUFBRCw0QkFBQztDQUFBLEFBaENELElBZ0NDO1NBaENZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENzQXR0YWNoRm9ydW1SZXF1ZXN0LCBDc0F0dGFjaEZvcnVtUmVzcG9uc2UsIENzRGlzY3Vzc2lvblNlcnZpY2UsIENzUmVtb3ZlRm9ydW1SZXF1ZXN0LCBDc1JlbW92ZUZvcnVtUmVzcG9uc2UgfSBmcm9tIFwiQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZGlzY3Vzc2lvblwiO1xuaW1wb3J0IHsgQ29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tIFwiaW52ZXJzaWZ5XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IENzSW5qZWN0aW9uVG9rZW5zLCBJbmplY3Rpb25Ub2tlbnMgfSBmcm9tIFwiLi4vLi4vaW5qZWN0aW9uLXRva2Vuc1wiO1xuaW1wb3J0IHsgRGlzY3Vzc2lvblNlcnZpY2UgfSBmcm9tIFwiLi4vZGVmL2Rpc2N1c3Npb24tc2VydmljZVwiO1xuaW1wb3J0IHsgQ3NDcmVhdGVVc2VyUmVxdWVzdCwgQ3NDcmVhdGVVc2VyUmVzcG9uc2UsIENzR2V0Rm9ydW1JZHNSZXF1ZXN0LCBDc0dldEZvcnVtSWRzUmVzcG9uc2UgfSBmcm9tIFwiQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvZGlzY3Vzc2lvblwiO1xuXG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaXNjdXNzaW9uU2VydmljZUltcGwgaW1wbGVtZW50cyBEaXNjdXNzaW9uU2VydmljZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT05UQUlORVIpIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBkaXNjdXNzaW9uU2VydmljZURlbGVnYXRlKCk6IENzRGlzY3Vzc2lvblNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0KENzSW5qZWN0aW9uVG9rZW5zLkRJU0NVU1NJT05fU0VSVklDRSk7XG4gICAgfVxuXG4gICAgZ2V0Rm9ydW1JZHMocmVxdWVzdDogQ3NHZXRGb3J1bUlkc1JlcXVlc3QpOiBPYnNlcnZhYmxlPENzR2V0Rm9ydW1JZHNSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjdXNzaW9uU2VydmljZURlbGVnYXRlLmdldEZvcnVtSWRzKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGNyZWF0ZVVzZXIocmVxdWVzdDogQ3NDcmVhdGVVc2VyUmVxdWVzdCk6IE9ic2VydmFibGU8Q3NDcmVhdGVVc2VyUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY3Vzc2lvblNlcnZpY2VEZWxlZ2F0ZS5jcmVhdGVVc2VyKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGF0dGFjaEZvcnVtKHJlcXVlc3Q6IENzQXR0YWNoRm9ydW1SZXF1ZXN0KTogT2JzZXJ2YWJsZTxDc0F0dGFjaEZvcnVtUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY3Vzc2lvblNlcnZpY2VEZWxlZ2F0ZS5hdHRhY2hGb3J1bShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICByZW1vdmVGb3J1bShyZXF1ZXN0OiBDc1JlbW92ZUZvcnVtUmVxdWVzdCk6IE9ic2VydmFibGU8Q3NSZW1vdmVGb3J1bVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2N1c3Npb25TZXJ2aWNlRGVsZWdhdGUucmVtb3ZlRm9ydW0ocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgY3JlYXRlRm9ydW0ocmVxdWVzdCk6IE9ic2VydmFibGU8Q3NBdHRhY2hGb3J1bVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2N1c3Npb25TZXJ2aWNlRGVsZWdhdGUuY3JlYXRlRm9ydW0ocmVxdWVzdCk7XG4gICAgfVxuXG59XG4iXX0=