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
import { FileName } from '../..';
import Queue from 'typescript-collections/dist/lib/Queue';
import { ContentUtil } from '../../util/content-util';
import { ImportNExportHandler } from '../import-n-export-handler';
import { Response } from '../../../api';
import { MimeType } from '../../util/content-constants';
var CreateContentImportManifest = /** @class */ (function () {
    function CreateContentImportManifest(dbService, deviceInfo, fileService) {
        this.dbService = dbService;
        this.deviceInfo = deviceInfo;
        this.fileService = fileService;
        this.contentDataMap = {};
    }
    CreateContentImportManifest.prototype.execute = function (importContentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var data, manifestJson, archive, items, response, e_1;
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
                            _this.contentDataMap[item.identifier] = item;
                        });
                        response = new Response();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.createnWriteManifest(importContentContext.identifiers, importContentContext.destinationFolder)];
                    case 3:
                        _a.sent();
                        response.body = importContentContext;
                        return [2 /*return*/, Promise.resolve(response)];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [2 /*return*/, Promise.reject(response)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateContentImportManifest.prototype.createnWriteManifest = function (identifiers, destinationFolder) {
        return __awaiter(this, void 0, void 0, function () {
            var importnExportHandler, fileMapList, _loop_1, this_1, _i, identifiers_1, identifier;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        importnExportHandler = new ImportNExportHandler(this.deviceInfo);
                        fileMapList = [];
                        _loop_1 = function (identifier) {
                            var item = this_1.contentDataMap[identifier];
                            var queue = new Queue();
                            queue.add(item);
                            var node = void 0;
                            var contentWithAllChildren = [];
                            contentWithAllChildren.push(item);
                            var _loop_2 = function () {
                                node = queue.dequeue();
                                if (ContentUtil.hasChildren(node)) {
                                    var childContentsIdentifiers = ContentUtil.getChildContentsIdentifiers(node);
                                    if (childContentsIdentifiers && childContentsIdentifiers.length) {
                                        var childItems_1 = [];
                                        childContentsIdentifiers.forEach(function (contentId) {
                                            var childItem = _this.contentDataMap[contentId];
                                            if (childItem) {
                                                queue.add(childItem);
                                                childItems_1.push(childItem);
                                            }
                                        });
                                        contentWithAllChildren = contentWithAllChildren.concat(childItems_1);
                                    }
                                }
                            };
                            while (!queue.isEmpty()) {
                                _loop_2();
                            }
                            var items = importnExportHandler.populateItemList(contentWithAllChildren);
                            var manifest = importnExportHandler.generateManifestForArchive(items);
                            var fileMap = {};
                            if (items && items[0] && items[0].parent && items[0].mimeType === MimeType.QUESTION) {
                                fileMap['path'] = ContentUtil.getBasePath(ContentUtil.getContentRootDir(destinationFolder).concat('/', items[0].parent, '/', identifier, '/'));
                            }
                            else {
                                fileMap['path'] = ContentUtil.getBasePath(ContentUtil.getContentRootDir(destinationFolder).concat('/', identifier, '/'));
                            }
                            fileMap['fileName'] = FileName.MANIFEST.valueOf();
                            fileMap['data'] = JSON.stringify(manifest);
                            fileMapList.push(fileMap);
                        };
                        this_1 = this;
                        for (_i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
                            identifier = identifiers_1[_i];
                            _loop_1(identifier);
                        }
                        return [4 /*yield*/, this.writeFile(fileMapList)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO: move this method to file-service
    CreateContentImportManifest.prototype.writeFile = function (fileMapList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sbutility.writeFile(fileMapList, function (entry) {
                            resolve();
                        }, function (err) {
                            console.error(err);
                            reject(err);
                        });
                    })];
            });
        });
    };
    return CreateContentImportManifest;
}());
export { CreateContentImportManifest };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbnRlbnQtaW1wb3J0LW1hbmlmZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvaW1wb3J0L2NyZWF0ZS1jb250ZW50LWltcG9ydC1tYW5pZmVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUMsUUFBUSxFQUF1QixNQUFNLE9BQU8sQ0FBQztBQUVyRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFHaEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFdEQ7SUFJSSxxQ0FBb0IsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsV0FBd0I7UUFGeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSnBDLG1CQUFjLEdBQTJCLEVBQUUsQ0FBQztJQUtwRCxDQUFDO0lBRUssNkNBQU8sR0FBYixVQUFjLG9CQUEwQzs7Ozs7OzRCQUN2QyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFZLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFBOzt3QkFBeEcsSUFBSSxHQUFHLFNBQWlHO3dCQUN4RyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7d0JBQy9CLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUU1QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTs0QkFDZixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ2hELENBQUMsQ0FBQyxDQUFDO3dCQUVHLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDOzs7O3dCQUV0QyxxQkFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsV0FBWSxFQUFFLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLEVBQUE7O3dCQUExRyxTQUEwRyxDQUFDO3dCQUMzRyxRQUFRLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDO3dCQUNyQyxzQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7d0JBRWpDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUM7d0JBQ2pCLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUM7Ozs7O0tBRXZDO0lBRWEsMERBQW9CLEdBQWxDLFVBQW1DLFdBQXFCLEVBQUUsaUJBQXlCOzs7Ozs7O3dCQUN6RSxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDakUsV0FBVyxHQUE2QixFQUFFLENBQUM7NENBRXRDLFVBQVU7NEJBQ2pCLElBQU0sSUFBSSxHQUFHLE9BQUssY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUM3QyxJQUFNLEtBQUssR0FBa0MsSUFBSSxLQUFLLEVBQUUsQ0FBQzs0QkFDekQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDaEIsSUFBSSxJQUFJLFNBQXdCLENBQUM7NEJBQ2pDLElBQUksc0JBQXNCLEdBQTZCLEVBQUUsQ0FBQzs0QkFDMUQsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQ0FFOUIsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUcsQ0FBQztnQ0FFeEIsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO29DQUMvQixJQUFNLHdCQUF3QixHQUFhLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDekYsSUFBSSx3QkFBd0IsSUFBSSx3QkFBd0IsQ0FBQyxNQUFNLEVBQUU7d0NBQzdELElBQU0sWUFBVSxHQUE2QixFQUFFLENBQUM7d0NBQ2hELHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7NENBQ3ZDLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7NENBQ2pELElBQUksU0FBUyxFQUFFO2dEQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0RBQ3JCLFlBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NkNBQzlCO3dDQUNMLENBQUMsQ0FBQyxDQUFDO3dDQUNILHNCQUFzQixHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxZQUFVLENBQUMsQ0FBQztxQ0FDdEU7aUNBQ0o7OzRCQWhCTCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTs7NkJBaUJ0Qjs0QkFDRCxJQUFNLEtBQUssR0FBVSxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzRCQUNuRixJQUFNLFFBQVEsR0FBMkIsb0JBQW9CLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBRWhHLElBQU0sT0FBTyxHQUEyQixFQUFFLENBQUM7NEJBQzNDLElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBQztnQ0FDL0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzs2QkFDbEo7aUNBQUs7Z0NBQ0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzs2QkFDNUg7NEJBQ0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUUzQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7d0JBckM5QixXQUFvQyxFQUFYLDJCQUFXLEVBQVgseUJBQVcsRUFBWCxJQUFXOzRCQUF6QixVQUFVO29DQUFWLFVBQVU7eUJBc0NwQjt3QkFFRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBakMsU0FBaUMsQ0FBQzs7Ozs7S0FDckM7SUFFRCx5Q0FBeUM7SUFDM0IsK0NBQVMsR0FBdkIsVUFBd0IsV0FBa0I7OztnQkFDdEMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDL0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQzNCLFVBQUMsS0FBSzs0QkFDRixPQUFPLEVBQUUsQ0FBQzt3QkFDZCxDQUFDLEVBQUUsVUFBQSxHQUFHOzRCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDaEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBQ0wsa0NBQUM7QUFBRCxDQUFDLEFBekZELElBeUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7RmlsZU5hbWUsIEltcG9ydENvbnRlbnRDb250ZXh0fSBmcm9tICcuLi8uLic7XG5pbXBvcnQge0NvbnRlbnRFbnRyeX0gZnJvbSAnLi4vLi4vZGIvc2NoZW1hJztcbmltcG9ydCBRdWV1ZSBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlJztcbmltcG9ydCB7Q29udGVudFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC11dGlsJztcbmltcG9ydCB7SW1wb3J0TkV4cG9ydEhhbmRsZXJ9IGZyb20gJy4uL2ltcG9ydC1uLWV4cG9ydC1oYW5kbGVyJztcbmltcG9ydCB7RGV2aWNlSW5mb30gZnJvbSAnLi4vLi4vLi4vdXRpbC9kZXZpY2UnO1xuaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vLi4vLi4vYXBpJztcbmltcG9ydCB7TWltZVR5cGV9IGZyb20gJy4uLy4uL3V0aWwvY29udGVudC1jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ29udGVudEltcG9ydE1hbmlmZXN0IHtcblxuICAgIHByaXZhdGUgY29udGVudERhdGFNYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgZXhlY3V0ZShpbXBvcnRDb250ZW50Q29udGV4dDogSW1wb3J0Q29udGVudENvbnRleHQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmZpbGVTZXJ2aWNlLnJlYWRBc1RleHQoaW1wb3J0Q29udGVudENvbnRleHQudG1wTG9jYXRpb24hLCBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCkpO1xuICAgICAgICBjb25zdCBtYW5pZmVzdEpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBjb25zdCBhcmNoaXZlID0gbWFuaWZlc3RKc29uLmFyY2hpdmU7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXJjaGl2ZS5pdGVtcztcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnREYXRhTWFwW2l0ZW0uaWRlbnRpZmllcl0gPSBpdGVtO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlbldyaXRlTWFuaWZlc3QoaW1wb3J0Q29udGVudENvbnRleHQuaWRlbnRpZmllcnMhLCBpbXBvcnRDb250ZW50Q29udGV4dC5kZXN0aW5hdGlvbkZvbGRlcik7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gaW1wb3J0Q29udGVudENvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZW5Xcml0ZU1hbmlmZXN0KGlkZW50aWZpZXJzOiBzdHJpbmdbXSwgZGVzdGluYXRpb25Gb2xkZXI6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbXBvcnRuRXhwb3J0SGFuZGxlciA9IG5ldyBJbXBvcnRORXhwb3J0SGFuZGxlcih0aGlzLmRldmljZUluZm8pO1xuICAgICAgICBjb25zdCBmaWxlTWFwTGlzdDogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBpZGVudGlmaWVyIG9mIGlkZW50aWZpZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jb250ZW50RGF0YU1hcFtpZGVudGlmaWVyXTtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlOiBRdWV1ZTxDb250ZW50RW50cnkuU2NoZW1hTWFwPiA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICAgICAgcXVldWUuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgbGV0IG5vZGU6IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgICAgICAgICBsZXQgY29udGVudFdpdGhBbGxDaGlsZHJlbjogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdID0gW107XG4gICAgICAgICAgICBjb250ZW50V2l0aEFsbENoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB3aGlsZSAoIXF1ZXVlLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBxdWV1ZS5kZXF1ZXVlKCkhO1xuXG4gICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmhhc0NoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkQ29udGVudHNJZGVudGlmaWVyczogc3RyaW5nW10gPSBDb250ZW50VXRpbC5nZXRDaGlsZENvbnRlbnRzSWRlbnRpZmllcnMobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZENvbnRlbnRzSWRlbnRpZmllcnMgJiYgY2hpbGRDb250ZW50c0lkZW50aWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJdGVtczogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzSWRlbnRpZmllcnMuZm9yRWFjaCgoY29udGVudElkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJdGVtID0gdGhpcy5jb250ZW50RGF0YU1hcFtjb250ZW50SWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUuYWRkKGNoaWxkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkSXRlbXMucHVzaChjaGlsZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFdpdGhBbGxDaGlsZHJlbiA9IGNvbnRlbnRXaXRoQWxsQ2hpbGRyZW4uY29uY2F0KGNoaWxkSXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXRlbXM6IGFueVtdID0gaW1wb3J0bkV4cG9ydEhhbmRsZXIucG9wdWxhdGVJdGVtTGlzdChjb250ZW50V2l0aEFsbENoaWxkcmVuKTtcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0gaW1wb3J0bkV4cG9ydEhhbmRsZXIuZ2VuZXJhdGVNYW5pZmVzdEZvckFyY2hpdmUoaXRlbXMpO1xuXG4gICAgICAgICAgICBjb25zdCBmaWxlTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgICAgICBpZihpdGVtcyAmJiBpdGVtc1swXSAmJiBpdGVtc1swXS5wYXJlbnQgJiYgaXRlbXNbMF0ubWltZVR5cGUgPT09IE1pbWVUeXBlLlFVRVNUSU9OKXtcbiAgICAgICAgICAgICAgICBmaWxlTWFwWydwYXRoJ10gPSBDb250ZW50VXRpbC5nZXRCYXNlUGF0aChDb250ZW50VXRpbC5nZXRDb250ZW50Um9vdERpcihkZXN0aW5hdGlvbkZvbGRlcikuY29uY2F0KCcvJywgaXRlbXNbMF0ucGFyZW50LCAnLycsIGlkZW50aWZpZXIsICcvJykpO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgIGZpbGVNYXBbJ3BhdGgnXSA9IENvbnRlbnRVdGlsLmdldEJhc2VQYXRoKENvbnRlbnRVdGlsLmdldENvbnRlbnRSb290RGlyKGRlc3RpbmF0aW9uRm9sZGVyKS5jb25jYXQoJy8nLCBpZGVudGlmaWVyLCAnLycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGVNYXBbJ2ZpbGVOYW1lJ10gPSBGaWxlTmFtZS5NQU5JRkVTVC52YWx1ZU9mKCk7XG4gICAgICAgICAgICBmaWxlTWFwWydkYXRhJ10gPSBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCk7XG5cbiAgICAgICAgICAgIGZpbGVNYXBMaXN0LnB1c2goZmlsZU1hcCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLndyaXRlRmlsZShmaWxlTWFwTGlzdCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbW92ZSB0aGlzIG1ldGhvZCB0byBmaWxlLXNlcnZpY2VcbiAgICBwcml2YXRlIGFzeW5jIHdyaXRlRmlsZShmaWxlTWFwTGlzdDogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNidXRpbGl0eS53cml0ZUZpbGUoZmlsZU1hcExpc3QsXG4gICAgICAgICAgICAgICAgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=