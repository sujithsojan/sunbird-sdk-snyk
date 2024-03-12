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
import { FileName, Visibility } from '../..';
import { Response } from '../../../api';
import { ContentMapper } from '../../util/content-mapper';
import { ContentUtil } from '../../util/content-util';
import { GetContentDetailsHandler } from '../get-content-details-handler';
import { ContentEntry } from '../../db/schema';
var COLUMN_NAME_PATH = ContentEntry.COLUMN_NAME_PATH;
var CreateHierarchy = /** @class */ (function () {
    function CreateHierarchy(dbService, fileService) {
        this.dbService = dbService;
        this.fileService = fileService;
        this.HIERARCHY_FILE_NAME = 'hierarchy.json';
        this.contentMap = {};
    }
    CreateHierarchy.prototype.execute = function (importContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var data, manifestJson, archive, items, rootContentId, hierarchyInfoList, rootContent, contentInDb, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileService.readAsText(importContentContext.tmpLocation, FileName.MANIFEST.valueOf())];
                    case 1:
                        data = _a.sent();
                        manifestJson = JSON.parse(data);
                        archive = manifestJson.archive;
                        items = archive.items;
                        items.forEach(function (item) {
                            var content = ContentMapper.mapServerResponseToContent(item);
                            var visibility = ContentUtil.readVisibility(item);
                            if (!ContentUtil.isNotUnit(item.mimeType, visibility)) {
                                content.isAvailableLocally = true;
                            }
                            if (visibility === Visibility.DEFAULT.valueOf()) {
                                rootContentId = item.identifier;
                            }
                            _this.contentMap[content.identifier] = content;
                        });
                        hierarchyInfoList = [];
                        rootContent = this.contentMap[rootContentId];
                        this.createTextBookHierarchy(rootContent, hierarchyInfoList);
                        return [4 /*yield*/, this.dbService.read(GetContentDetailsHandler.getReadContentQuery(rootContentId)).toPromise()];
                    case 2:
                        contentInDb = _a.sent();
                        return [4 /*yield*/, this.fileService.writeFile(ContentUtil.getBasePath(contentInDb[0][COLUMN_NAME_PATH]), this.HIERARCHY_FILE_NAME, JSON.stringify(rootContent), { replace: true })];
                    case 3:
                        _a.sent();
                        response = new Response();
                        response.body = importContentContext;
                        return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * fetchChildrenOfContent()
     * @param content
     */
    CreateHierarchy.prototype.createTextBookHierarchy = function (content, sourceInfoList) {
        // const childContentModels: ContentEntry.SchemaMap[] =
        //     await this.getSortedChildrenList(contentInDb[ContentEntry.COLUMN_NAME_LOCAL_DATA], ChildContents.ALL);
        var sortedChildContents = this.getSortedChildrenList(content.contentData);
        if (sortedChildContents && sortedChildContents.length) {
            var hierarchyInfoList = [];
            hierarchyInfoList = hierarchyInfoList.concat(sourceInfoList);
            hierarchyInfoList.push({
                identifier: content.identifier,
                contentType: content.contentType
            });
            content.hierarchyInfo = hierarchyInfoList;
            // if (level === -1 || currentLevel <= level) {
            var childContents = [];
            for (var _i = 0, sortedChildContents_1 = sortedChildContents; _i < sortedChildContents_1.length; _i++) {
                var element = sortedChildContents_1[_i];
                var childContentModel = element;
                var childContent = this.createTextBookHierarchy(childContentModel, 
                // currentLevel + 1,
                // level,
                hierarchyInfoList);
                childContents.push(childContent);
            }
            content.children = childContents;
            // }
        }
        else {
            content.hierarchyInfo = sourceInfoList;
        }
        return content;
    };
    CreateHierarchy.prototype.getSortedChildrenList = function (localData) {
        var _this = this;
        var childContents = localData['children'];
        if (!childContents || !childContents.length) {
            return [];
        }
        childContents = childContents.sort(function (childContent1, childContent2) {
            return (childContent1.index - childContent2.index);
        });
        var sortedChildContents = [];
        childContents.forEach(function (childContent) {
            var contentInMap = _this.contentMap[childContent.identifier];
            if (contentInMap) {
                sortedChildContents.push(contentInMap);
            }
        });
        return sortedChildContents;
    };
    return CreateHierarchy;
}());
export { CreateHierarchy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWhpZXJhcmNoeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hhbmRsZXJzL2ltcG9ydC9jcmVhdGUtaGllcmFyY2h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBcUMsUUFBUSxFQUF1QyxVQUFVLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDcEgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxJQUFPLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUV4RDtJQUtJLHlCQUFvQixTQUFvQixFQUNwQixXQUF3QjtRQUR4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSjNCLHdCQUFtQixHQUFHLGdCQUFnQixDQUFDO1FBQ2hELGVBQVUsR0FBMkIsRUFBRSxDQUFDO0lBSWhELENBQUM7SUFFWSxpQ0FBTyxHQUFwQixVQUFxQixvQkFBMEM7Ozs7Ozs0QkFDOUMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsV0FBWSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQTs7d0JBQXhHLElBQUksR0FBRyxTQUFpRzt3QkFDeEcsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hDLE9BQU8sR0FBRyxZQUFZLENB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QixDQUFDLENBQUM7Z0JBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztZQUNqQyxJQUFJO1NBQ1A7YUFBTTtZQUNILE9BQU8sQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVPLCtDQUFxQixHQUE3QixVQUE4QixTQUFzQjtRQUFwRCxpQkFtQkM7UUFsQkcsSUFBSSxhQUFhLEdBQW1CLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFhLEVBQUUsYUFBYTtZQUM1RCxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLG1CQUFtQixHQUFjLEVBQUUsQ0FBQztRQUMxQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsWUFBWTtZQUM5QixJQUFNLFlBQVksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxJQUFJLFlBQVksRUFBRTtnQkFDZCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDMUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sbUJBQW1CLENBQUM7SUFDL0IsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXZHRCxJQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7Q2hpbGRDb250ZW50LCBDb250ZW50LCBDb250ZW50RGF0YSwgRmlsZU5hbWUsIEhpZXJhcmNoeUluZm8sIEltcG9ydENvbnRlbnRDb250ZXh0LCBWaXNpYmlsaXR5fSBmcm9tICcuLi8uLic7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0IHtDb250ZW50TWFwcGVyfSBmcm9tICcuLi8uLi91dGlsL2NvbnRlbnQtbWFwcGVyJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC11dGlsJztcbmltcG9ydCB7R2V0Q29udGVudERldGFpbHNIYW5kbGVyfSBmcm9tICcuLi9nZXQtY29udGVudC1kZXRhaWxzLWhhbmRsZXInO1xuaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7Q29udGVudEVudHJ5fSBmcm9tICcuLi8uLi9kYi9zY2hlbWEnO1xuaW1wb3J0IENPTFVNTl9OQU1FX1BBVEggPSBDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSDtcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUhpZXJhcmNoeSB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IEhJRVJBUkNIWV9GSUxFX05BTUUgPSAnaGllcmFyY2h5Lmpzb24nO1xuICAgIHByaXZhdGUgY29udGVudE1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGltcG9ydENvbnRlbnRDb250ZXh0OiBJbXBvcnRDb250ZW50Q29udGV4dCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UucmVhZEFzVGV4dChpbXBvcnRDb250ZW50Q29udGV4dC50bXBMb2NhdGlvbiEsIEZpbGVOYW1lLk1BTklGRVNULnZhbHVlT2YoKSk7XG4gICAgICAgIGNvbnN0IG1hbmlmZXN0SnNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGNvbnN0IGFyY2hpdmUgPSBtYW5pZmVzdEpzb24uYXJjaGl2ZTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhcmNoaXZlLml0ZW1zO1xuICAgICAgICBsZXQgcm9vdENvbnRlbnRJZDogc3RyaW5nO1xuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ6IENvbnRlbnQgPSBDb250ZW50TWFwcGVyLm1hcFNlcnZlclJlc3BvbnNlVG9Db250ZW50KGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoIUNvbnRlbnRVdGlsLmlzTm90VW5pdChpdGVtLm1pbWVUeXBlLCB2aXNpYmlsaXR5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNBdmFpbGFibGVMb2NhbGx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgPT09IFZpc2liaWxpdHkuREVGQVVMVC52YWx1ZU9mKCkpIHtcbiAgICAgICAgICAgICAgICByb290Q29udGVudElkID0gaXRlbS5pZGVudGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50TWFwW2NvbnRlbnQuaWRlbnRpZmllcl0gPSBjb250ZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdID0gW107XG4gICAgICAgIGNvbnN0IHJvb3RDb250ZW50OiBDb250ZW50ID0gdGhpcy5jb250ZW50TWFwW3Jvb3RDb250ZW50SWQhXTtcbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0Qm9va0hpZXJhcmNoeShyb290Q29udGVudCwgaGllcmFyY2h5SW5mb0xpc3QpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRJbkRiID0gYXdhaXQgdGhpcy5kYlNlcnZpY2UucmVhZChHZXRDb250ZW50RGV0YWlsc0hhbmRsZXIuZ2V0UmVhZENvbnRlbnRRdWVyeShyb290Q29udGVudElkISkpLnRvUHJvbWlzZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLndyaXRlRmlsZShDb250ZW50VXRpbC5nZXRCYXNlUGF0aChjb250ZW50SW5EYlswXVtDT0xVTU5fTkFNRV9QQVRIXSEpLFxuICAgICAgICAgICAgdGhpcy5ISUVSQVJDSFlfRklMRV9OQU1FLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocm9vdENvbnRlbnQpLFxuICAgICAgICAgICAge3JlcGxhY2U6IHRydWV9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgcmVzcG9uc2UuYm9keSA9IGltcG9ydENvbnRlbnRDb250ZXh0O1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmZXRjaENoaWxkcmVuT2ZDb250ZW50KClcbiAgICAgKiBAcGFyYW0gY29udGVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlVGV4dEJvb2tIaWVyYXJjaHkoY29udGVudDogQ29udGVudCwgc291cmNlSW5mb0xpc3Q/OiBIaWVyYXJjaHlJbmZvW10pOiBDb250ZW50IHtcbiAgICAgICAgLy8gY29uc3QgY2hpbGRDb250ZW50TW9kZWxzOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPVxuICAgICAgICAvLyAgICAgYXdhaXQgdGhpcy5nZXRTb3J0ZWRDaGlsZHJlbkxpc3QoY29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdLCBDaGlsZENvbnRlbnRzLkFMTCk7XG5cbiAgICAgICAgY29uc3Qgc29ydGVkQ2hpbGRDb250ZW50czogQ29udGVudFtdID0gdGhpcy5nZXRTb3J0ZWRDaGlsZHJlbkxpc3QoY29udGVudC5jb250ZW50RGF0YSk7XG5cbiAgICAgICAgaWYgKHNvcnRlZENoaWxkQ29udGVudHMgJiYgc29ydGVkQ2hpbGRDb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdID0gW107XG4gICAgICAgICAgICBoaWVyYXJjaHlJbmZvTGlzdCA9IGhpZXJhcmNoeUluZm9MaXN0LmNvbmNhdChzb3VyY2VJbmZvTGlzdCEpO1xuICAgICAgICAgICAgaGllcmFyY2h5SW5mb0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogY29udGVudC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50LmNvbnRlbnRUeXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRlbnQuaGllcmFyY2h5SW5mbyA9IGhpZXJhcmNoeUluZm9MaXN0ITtcblxuICAgICAgICAgICAgLy8gaWYgKGxldmVsID09PSAtMSB8fCBjdXJyZW50TGV2ZWwgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ29udGVudHM6IENvbnRlbnRbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNvcnRlZENoaWxkQ29udGVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRNb2RlbCA9IGVsZW1lbnQgYXMgQ29udGVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnQ6IENvbnRlbnQgPSB0aGlzLmNyZWF0ZVRleHRCb29rSGllcmFyY2h5KGNoaWxkQ29udGVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50TGV2ZWwgKyAxLFxuICAgICAgICAgICAgICAgICAgICAvLyBsZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgaGllcmFyY2h5SW5mb0xpc3QpO1xuICAgICAgICAgICAgICAgIGNoaWxkQ29udGVudHMucHVzaChjaGlsZENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGVudC5jaGlsZHJlbiA9IGNoaWxkQ29udGVudHM7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50LmhpZXJhcmNoeUluZm8gPSBzb3VyY2VJbmZvTGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U29ydGVkQ2hpbGRyZW5MaXN0KGxvY2FsRGF0YTogQ29udGVudERhdGEpOiBDb250ZW50W10ge1xuICAgICAgICBsZXQgY2hpbGRDb250ZW50czogQ2hpbGRDb250ZW50W10gPSBsb2NhbERhdGFbJ2NoaWxkcmVuJ107XG4gICAgICAgIGlmICghY2hpbGRDb250ZW50cyB8fCAhY2hpbGRDb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkQ29udGVudHMgPSBjaGlsZENvbnRlbnRzLnNvcnQoKGNoaWxkQ29udGVudDEsIGNoaWxkQ29udGVudDIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoY2hpbGRDb250ZW50MS5pbmRleCAtIGNoaWxkQ29udGVudDIuaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzb3J0ZWRDaGlsZENvbnRlbnRzOiBDb250ZW50W10gPSBbXTtcbiAgICAgICAgY2hpbGRDb250ZW50cy5mb3JFYWNoKGNoaWxkQ29udGVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50SW5NYXAgPSB0aGlzLmNvbnRlbnRNYXBbY2hpbGRDb250ZW50LmlkZW50aWZpZXJdO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRJbk1hcCkge1xuICAgICAgICAgICAgICAgIHNvcnRlZENoaWxkQ29udGVudHMucHVzaChjb250ZW50SW5NYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc29ydGVkQ2hpbGRDb250ZW50cztcbiAgICB9XG59XG4iXX0=