var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NetworkStatus } from '..';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';
var NetworkInfoServiceImpl = /** @class */ (function () {
    function NetworkInfoServiceImpl() {
        var _this = this;
        if (navigator.connection.type === Connection.NONE) {
            this.networkStatusSource = new BehaviorSubject(NetworkStatus.OFFLINE);
        }
        else {
            this.networkStatusSource = new BehaviorSubject(NetworkStatus.ONLINE);
        }
        window.addEventListener('online', function () {
            _this.networkStatusSource.next(NetworkStatus.ONLINE);
        }, false);
        window.addEventListener('offline', function () {
            _this.networkStatusSource.next(NetworkStatus.OFFLINE);
        }, false);
        this.networkStatus$ = this.networkStatusSource.asObservable();
    }
    NetworkInfoServiceImpl = __decorate([
        injectable(),
        __metadata("design:paramtypes", [])
    ], NetworkInfoServiceImpl);
    return NetworkInfoServiceImpl;
}());
export { NetworkInfoServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1pbmZvLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL25ldHdvcmsvaW1wbC9uZXR3b3JrLWluZm8tc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBcUIsYUFBYSxFQUFDLE1BQU0sSUFBSSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUdyQztJQUlJO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQy9DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hGO2FBQU07WUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQWdCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RjtRQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRVYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtZQUMvQixLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFVixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBcEJRLHNCQUFzQjtRQURsQyxVQUFVLEVBQUU7O09BQ0Esc0JBQXNCLENBcUJsQztJQUFELDZCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXR3b3JrSW5mb1NlcnZpY2UsIE5ldHdvcmtTdGF0dXN9IGZyb20gJy4uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7aW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5ldHdvcmtJbmZvU2VydmljZUltcGwgaW1wbGVtZW50cyBOZXR3b3JrSW5mb1NlcnZpY2Uge1xuICAgIG5ldHdvcmtTdGF0dXMkOiBPYnNlcnZhYmxlPE5ldHdvcmtTdGF0dXM+O1xuICAgIHByaXZhdGUgbmV0d29ya1N0YXR1c1NvdXJjZTogQmVoYXZpb3JTdWJqZWN0PE5ldHdvcmtTdGF0dXM+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuY29ubmVjdGlvbi50eXBlID09PSBDb25uZWN0aW9uLk5PTkUpIHtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya1N0YXR1c1NvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmV0d29ya1N0YXR1cz4oTmV0d29ya1N0YXR1cy5PRkZMSU5FKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya1N0YXR1c1NvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmV0d29ya1N0YXR1cz4oTmV0d29ya1N0YXR1cy5PTkxJTkUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya1N0YXR1c1NvdXJjZS5uZXh0KE5ldHdvcmtTdGF0dXMuT05MSU5FKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrU3RhdHVzU291cmNlLm5leHQoTmV0d29ya1N0YXR1cy5PRkZMSU5FKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMubmV0d29ya1N0YXR1cyQgPSB0aGlzLm5ldHdvcmtTdGF0dXNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIl19