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
import { inject, injectable } from "inversify";
import { InjectionTokens } from "../../injection-tokens";
import { FetchSegmentationCommandHandler } from "../handler/fetch-segmentation-command-handler";
import { FetchSegmentationTagHandler } from "../handler/fetch-segmentation-tags-handler";
import { StoreSegmentationCommandHandler } from "../handler/store-segmentation-command-handler";
import { StoreSegmentationTagHandler } from "../handler/store-segmentation-tag-handler";
var SegmentationServiceImpl = /** @class */ (function () {
    function SegmentationServiceImpl(keyValueStore) {
        this.keyValueStore = keyValueStore;
    }
    SegmentationServiceImpl.prototype.saveTags = function (tags, userId) {
        return new StoreSegmentationTagHandler(this.keyValueStore).handle(tags, userId);
    };
    SegmentationServiceImpl.prototype.getTags = function (userId) {
        return new FetchSegmentationTagHandler(this.keyValueStore).handle(userId);
    };
    SegmentationServiceImpl.prototype.removeTagsForId = function (userid) {
        throw new Error("Method not implemented.");
    };
    SegmentationServiceImpl.prototype.clearAllTags = function () {
        throw new Error("Method not implemented.");
    };
    SegmentationServiceImpl.prototype.saveCommandList = function (commandList, userId) {
        return new StoreSegmentationCommandHandler(this.keyValueStore).handle(commandList, userId);
    };
    SegmentationServiceImpl.prototype.getCommand = function (userId) {
        return new FetchSegmentationCommandHandler(this.keyValueStore).handle(userId);
    };
    SegmentationServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.KEY_VALUE_STORE)),
        __metadata("design:paramtypes", [Object])
    ], SegmentationServiceImpl);
    return SegmentationServiceImpl;
}());
export { SegmentationServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudGFpb24tc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlZ21lbnRhdGlvbi9pbXBsL3NlZ21lbnRhaW9uLXNlcnZpY2UtaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHekQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDaEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDaEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFHeEY7SUFFSSxpQ0FDcUQsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDOUUsQ0FBQztJQUVKLDBDQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsTUFBYztRQUNqQyxPQUFPLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHlDQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ2xCLE9BQU8sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxpREFBZSxHQUFmLFVBQWdCLE1BQWM7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw4Q0FBWSxHQUFaO1FBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxpREFBZSxHQUFmLFVBQWdCLFdBQVcsRUFBRSxNQUFNO1FBQy9CLE9BQU8sSUFBSSwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsNENBQVUsR0FBVixVQUFXLE1BQU07UUFDYixPQUFPLElBQUksK0JBQStCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBNUJRLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7UUFJSixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7O09BSG5DLHVCQUF1QixDQThCbkM7SUFBRCw4QkFBQztDQUFBLEFBOUJELElBOEJDO1NBOUJZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgaW5qZWN0YWJsZSB9IGZyb20gXCJpbnZlcnNpZnlcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW5zIH0gZnJvbSBcIi4uLy4uL2luamVjdGlvbi10b2tlbnNcIjtcbmltcG9ydCB7IEtleVZhbHVlU3RvcmUgfSBmcm9tIFwiLi4vLi4va2V5LXZhbHVlLXN0b3JlXCI7XG5pbXBvcnQgeyBTZWdtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2RlZi9zZWdtZW50YXRpb24tc2VydmljZVwiO1xuaW1wb3J0IHsgRmV0Y2hTZWdtZW50YXRpb25Db21tYW5kSGFuZGxlciB9IGZyb20gXCIuLi9oYW5kbGVyL2ZldGNoLXNlZ21lbnRhdGlvbi1jb21tYW5kLWhhbmRsZXJcIjtcbmltcG9ydCB7IEZldGNoU2VnbWVudGF0aW9uVGFnSGFuZGxlciB9IGZyb20gXCIuLi9oYW5kbGVyL2ZldGNoLXNlZ21lbnRhdGlvbi10YWdzLWhhbmRsZXJcIjtcbmltcG9ydCB7IFN0b3JlU2VnbWVudGF0aW9uQ29tbWFuZEhhbmRsZXIgfSBmcm9tIFwiLi4vaGFuZGxlci9zdG9yZS1zZWdtZW50YXRpb24tY29tbWFuZC1oYW5kbGVyXCI7XG5pbXBvcnQgeyBTdG9yZVNlZ21lbnRhdGlvblRhZ0hhbmRsZXIgfSBmcm9tIFwiLi4vaGFuZGxlci9zdG9yZS1zZWdtZW50YXRpb24tdGFnLWhhbmRsZXJcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlZ21lbnRhdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgU2VnbWVudGF0aW9uU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuS0VZX1ZBTFVFX1NUT1JFKSBwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmVcbiAgICApIHt9XG5cbiAgICBzYXZlVGFncyh0YWdzOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmVTZWdtZW50YXRpb25UYWdIYW5kbGVyKHRoaXMua2V5VmFsdWVTdG9yZSkuaGFuZGxlKHRhZ3MsIHVzZXJJZCk7XG4gICAgfVxuXG4gICAgZ2V0VGFncyh1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgRmV0Y2hTZWdtZW50YXRpb25UYWdIYW5kbGVyKHRoaXMua2V5VmFsdWVTdG9yZSkuaGFuZGxlKHVzZXJJZCk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVRhZ3NGb3JJZCh1c2VyaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH1cblxuICAgIGNsZWFyQWxsVGFncygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG5cbiAgICBzYXZlQ29tbWFuZExpc3QoY29tbWFuZExpc3QsIHVzZXJJZCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmVTZWdtZW50YXRpb25Db21tYW5kSGFuZGxlcih0aGlzLmtleVZhbHVlU3RvcmUpLmhhbmRsZShjb21tYW5kTGlzdCwgdXNlcklkKTtcbiAgICB9XG5cbiAgICBnZXRDb21tYW5kKHVzZXJJZCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgRmV0Y2hTZWdtZW50YXRpb25Db21tYW5kSGFuZGxlcih0aGlzLmtleVZhbHVlU3RvcmUpLmhhbmRsZSh1c2VySWQpO1xuICAgIH1cblxufSJdfQ==