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
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NetworkQueueType } from '../../api/network-queue';
import { NetworkRequestHandler } from '../../api/network-queue/handlers/network-request-handler';
import { UniqueId } from '../../db/util/unique-id';
var UpdateContentStateApiHandler = /** @class */ (function () {
    function UpdateContentStateApiHandler(networkQueue, sdkConfig) {
        this.networkQueue = networkQueue;
        this.sdkConfig = sdkConfig;
    }
    UpdateContentStateApiHandler.prototype.handle = function (updateContentStateAPIRequest) {
        var _this = this;
        return this.networkQueue.enqueue(new NetworkRequestHandler(this.sdkConfig).generateNetworkQueueRequest(NetworkQueueType.COURSE_PROGRESS, { request: updateContentStateAPIRequest }, UniqueId.generateUniqueId(), updateContentStateAPIRequest.contents ? updateContentStateAPIRequest.contents.length : 0, true), true).pipe(mergeMap(function () {
            return new Observable(function (observer) {
                sbsync.onSyncSucces(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var courseProgressResponse, error;
                    return __generator(this, function (_a) {
                        courseProgressResponse = response.courseProgressResponse;
                        error = response.course_progress_error;
                        if (courseProgressResponse) {
                            observer.next(courseProgressResponse);
                        }
                        else if (error) {
                            observer.error(error);
                        }
                        observer.complete();
                        return [2 /*return*/];
                    });
                }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        observer.error(error);
                        return [2 /*return*/];
                    });
                }); });
            });
        }));
    };
    UpdateContentStateApiHandler.UPDATE_CONTENT_STATE_ENDPOINT = '/content/state/update';
    return UpdateContentStateApiHandler;
}());
export { UpdateContentStateApiHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbnRlbnQtc3RhdGUtYXBpLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY291cnNlL2hhbmRsZXJzL3VwZGF0ZS1jb250ZW50LXN0YXRlLWFwaS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFNLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBa0MsZ0JBQWdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwwREFBMEQsQ0FBQztBQUUvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHakQ7SUFJRSxzQ0FBb0IsWUFBMEIsRUFDMUIsU0FBb0I7UUFEcEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUN4QyxDQUFDO0lBRU0sNkNBQU0sR0FBYixVQUFjLDRCQUEwRDtRQUF4RSxpQkF1QkM7UUF0QkMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQywyQkFBMkIsQ0FDcEcsZ0JBQWdCLENBQUMsZUFBZSxFQUNoQyxFQUFDLE9BQU8sRUFBRSw0QkFBNEIsRUFBQyxFQUN2QyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckgsSUFBSSxDQUFDLEVBQ0wsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNWLFFBQVEsQ0FBQztZQUNQLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUEwQztnQkFDL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFPLFFBQVE7Ozt3QkFDM0Isc0JBQXNCLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3dCQUN6RCxLQUFLLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDO3dCQUM3QyxJQUFJLHNCQUFzQixFQUFFOzRCQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7eUJBQ3ZDOzZCQUFNLElBQUksS0FBSyxFQUFFOzRCQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUN2Qjt3QkFDRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7OztxQkFDckIsRUFBRSxVQUFPLEtBQUs7O3dCQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7OztxQkFDdkIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQTlCc0IsMERBQTZCLEdBQUcsdUJBQXVCLENBQUM7SUFnQ2pGLG1DQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FqQ1ksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcGlSZXF1ZXN0SGFuZGxlciwgQXBpU2VydmljZSwgSHR0cFJlcXVlc3RUeXBlLCBSZXF1ZXN0fSBmcm9tICcuLi8uLi9hcGknO1xuaW1wb3J0IHtCYXRjaCwgQ291cnNlU2VydmljZUNvbmZpZywgVXBkYXRlQ29udGVudFN0YXRlQVBJUmVxdWVzdH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcCwgbWVyZ2VNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmV0d29ya1F1ZXVlLCBOZXR3b3JrUXVldWVFbnRyeSwgTmV0d29ya1F1ZXVlVHlwZX0gZnJvbSAnLi4vLi4vYXBpL25ldHdvcmstcXVldWUnO1xuaW1wb3J0IHtOZXR3b3JrUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uLy4uL2FwaS9uZXR3b3JrLXF1ZXVlL2hhbmRsZXJzL25ldHdvcmstcmVxdWVzdC1oYW5kbGVyJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7VW5pcXVlSWR9IGZyb20gJy4uLy4uL2RiL3V0aWwvdW5pcXVlLWlkJztcbmltcG9ydCB7UHJvY2Vzc2luZ0Vycm9yfSBmcm9tICcuLi8uLi9hdXRoL2Vycm9ycy9wcm9jZXNzaW5nLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZUNvbnRlbnRTdGF0ZUFwaUhhbmRsZXIgaW1wbGVtZW50cyBBcGlSZXF1ZXN0SGFuZGxlcjxVcGRhdGVDb250ZW50U3RhdGVBUElSZXF1ZXN0LCB7IFtrZXk6IHN0cmluZ106IGFueSB9PiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVVBEQVRFX0NPTlRFTlRfU1RBVEVfRU5EUE9JTlQgPSAnL2NvbnRlbnQvc3RhdGUvdXBkYXRlJztcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0d29ya1F1ZXVlOiBOZXR3b3JrUXVldWUsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcpIHtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGUodXBkYXRlQ29udGVudFN0YXRlQVBJUmVxdWVzdDogVXBkYXRlQ29udGVudFN0YXRlQVBJUmVxdWVzdCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBhbnkgfT4ge1xuICAgIHJldHVybiB0aGlzLm5ldHdvcmtRdWV1ZS5lbnF1ZXVlKG5ldyBOZXR3b3JrUmVxdWVzdEhhbmRsZXIodGhpcy5zZGtDb25maWcpLmdlbmVyYXRlTmV0d29ya1F1ZXVlUmVxdWVzdChcbiAgICAgIE5ldHdvcmtRdWV1ZVR5cGUuQ09VUlNFX1BST0dSRVNTLFxuICAgICAge3JlcXVlc3Q6IHVwZGF0ZUNvbnRlbnRTdGF0ZUFQSVJlcXVlc3R9LFxuICAgICAgVW5pcXVlSWQuZ2VuZXJhdGVVbmlxdWVJZCgpLCB1cGRhdGVDb250ZW50U3RhdGVBUElSZXF1ZXN0LmNvbnRlbnRzID8gdXBkYXRlQ29udGVudFN0YXRlQVBJUmVxdWVzdC5jb250ZW50cy5sZW5ndGggOiAwLFxuICAgICAgdHJ1ZSksXG4gICAgICB0cnVlKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjx7IFtrZXk6IHN0cmluZ106IGFueSB9PikgPT4ge1xuICAgICAgICAgIHNic3luYy5vblN5bmNTdWNjZXMoYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb3Vyc2VQcm9ncmVzc1Jlc3BvbnNlID0gcmVzcG9uc2UuY291cnNlUHJvZ3Jlc3NSZXNwb25zZTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gcmVzcG9uc2UuY291cnNlX3Byb2dyZXNzX2Vycm9yO1xuICAgICAgICAgICAgaWYgKGNvdXJzZVByb2dyZXNzUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChjb3Vyc2VQcm9ncmVzc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9LCBhc3luYyAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cblxufVxuIl19