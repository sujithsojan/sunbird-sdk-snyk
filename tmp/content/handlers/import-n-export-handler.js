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
import { ContentEntry } from '../db/schema';
import { ContentUtil } from '../util/content-util';
import * as dayjs from 'dayjs';
import { ArrayUtil } from '../../util/array-util';
import { FileName, Visibility } from '..';
var COLUMN_NAME_LOCAL_DATA = ContentEntry.COLUMN_NAME_LOCAL_DATA;
var COLUMN_NAME_IDENTIFIER = ContentEntry.COLUMN_NAME_IDENTIFIER;
var COLUMN_NAME_REF_COUNT = ContentEntry.COLUMN_NAME_REF_COUNT;
var ImportNExportHandler = /** @class */ (function () {
    function ImportNExportHandler(deviceInfo, dbService, fileService) {
        this.deviceInfo = deviceInfo;
        this.dbService = dbService;
        this.fileService = fileService;
    }
    ImportNExportHandler.prototype.populateItems = function (contentsInDb) {
        var _this = this;
        var items = [];
        var allContentsIdentifier = [];
        var childIdentifiers = [];
        var contentIndex = {};
        contentsInDb.forEach(function (contentInDb) {
            // item local data
            var item = JSON.parse(contentInDb[COLUMN_NAME_LOCAL_DATA]);
            // index item
            contentIndex[contentInDb[COLUMN_NAME_IDENTIFIER]] = item;
            ContentUtil.addViralityMetadataIfMissing(item, _this.deviceInfo.getDeviceID());
            // get item's children only to mark children with visibility as Parent
            if (ContentUtil.hasChildren(item)) {
                // store children identifiers
                var childContentIdentifiers = ContentUtil.getChildContentsIdentifiers(item);
                childIdentifiers = childIdentifiers.concat(childContentIdentifiers);
            }
            allContentsIdentifier.push(contentInDb[COLUMN_NAME_IDENTIFIER]);
        });
        try {
            allContentsIdentifier.forEach(function (identifier) {
                var contentData = contentIndex[identifier];
                if (ArrayUtil.contains(childIdentifiers, identifier)) {
                    contentData['visibility'] = Visibility.PARENT.valueOf();
                }
                items.push(contentData);
            });
        }
        catch (e) {
            console.log(e);
        }
        return items;
    };
    ImportNExportHandler.prototype.populateItemList = function (contentWithAllChildren) {
        var _this = this;
        var items = [];
        var allContentsIdentifier = [];
        var childIdentifiers = [];
        var contentIndex = {};
        contentWithAllChildren.forEach(function (item) {
            contentIndex[item['identifier']] = item;
            ContentUtil.addViralityMetadataIfMissing(item, _this.deviceInfo.getDeviceID());
            // get item's children only to mark children with visibility as Parent
            if (ContentUtil.hasChildren(item)) {
                // store children identifiers
                var childContentIdentifiers = ContentUtil.getChildContentsIdentifiers(item);
                childIdentifiers = childIdentifiers.concat(childContentIdentifiers);
            }
            allContentsIdentifier.push(item['identifier']);
        });
        try {
            allContentsIdentifier.forEach(function (identifier) {
                var contentData = contentIndex[identifier];
                if (ArrayUtil.contains(childIdentifiers, identifier)) {
                    contentData['visibility'] = Visibility.PARENT.valueOf();
                }
                items.push(contentData);
            });
        }
        catch (e) {
            console.log(e);
        }
        return items;
    };
    ImportNExportHandler.prototype.getContentExportDBModelToExport = function (contentIds) {
        return __awaiter(this, void 0, void 0, function () {
            var contentModelToExport, contentsInDb, manifestPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentModelToExport = [];
                        return [4 /*yield*/, this.findAllContentsWithIdentifiers(contentIds)];
                    case 1:
                        contentsInDb = _a.sent();
                        manifestPath = ContentUtil.getBasePath(contentsInDb[0][ContentEntry.COLUMN_NAME_PATH]);
                        return [4 /*yield*/, this.fileService.readAsText(manifestPath, FileName.MANIFEST.valueOf())
                                .then(function (fileContents) { return __awaiter(_this, void 0, void 0, function () {
                                var childContents, childIdentifiers;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            childContents = JSON.parse(fileContents).archive.items;
                                            childIdentifiers = [];
                                            childContents.forEach(function (element) {
                                                childIdentifiers.push(element.identifier);
                                            });
                                            return [4 /*yield*/, this.findAllContentsWithIdentifiers(childIdentifiers, true)];
                                        case 1:
                                            contentModelToExport = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (err) {
                                console.log('fileRead error', err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(ContentUtil.deDupe(contentModelToExport, 'identifier'))];
                }
            });
        });
    };
    ImportNExportHandler.prototype.generateManifestForArchive = function (items) {
        var manifest = {};
        var archive = {};
        archive.ttl = 24;
        archive.count = items.length;
        archive.items = items;
        // Initialize manifest
        manifest['id'] = ImportNExportHandler.EKSTEP_CONTENT_ARCHIVE;
        manifest['ver'] = ImportNExportHandler.SUPPORTED_MANIFEST_VERSION;
        manifest['ts'] = dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]');
        manifest['archive'] = archive;
        return manifest;
    };
    ImportNExportHandler.prototype.findAllContentsWithIdentifiers = function (identifiers, sort) {
        var orderByString = '';
        if (sort) {
            if (identifiers.length) {
                orderByString = identifiers.reduce(function (acc, identifier, index) {
                    return acc + (" WHEN '" + identifier + "' THEN " + index);
                }, " ORDER BY CASE " + COLUMN_NAME_IDENTIFIER) + ' END';
            }
        }
        var identifiersStr = ArrayUtil.joinPreservingQuotes(identifiers);
        var filter = " where " + COLUMN_NAME_IDENTIFIER + " in (" + identifiersStr + ") AND " + COLUMN_NAME_REF_COUNT + " > 0";
        var query = "select * from " + ContentEntry.TABLE_NAME + " " + filter + " " + orderByString;
        return this.dbService.execute(query).toPromise();
    };
    ImportNExportHandler.EKSTEP_CONTENT_ARCHIVE = 'ekstep.content.archive';
    ImportNExportHandler.SUPPORTED_MANIFEST_VERSION = '1.1';
    return ImportNExportHandler;
}());
export { ImportNExportHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW4tZXhwb3J0LWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9oYW5kbGVycy9pbXBvcnQtbi1leHBvcnQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHaEQsT0FBTyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsTUFBTSxJQUFJLENBQUM7QUFDeEMsSUFBTyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUM7QUFDcEUsSUFBTyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUM7QUFDcEUsSUFBTyxxQkFBcUIsR0FBRyxZQUFZLENBQUMscUJBQXFCLENBQUM7QUFFbEU7SUFJSSw4QkFBb0IsVUFBc0IsRUFDdEIsU0FBcUIsRUFDckIsV0FBeUI7UUFGekIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO0lBRzdDLENBQUM7SUFFRCw0Q0FBYSxHQUFiLFVBQWMsWUFBc0M7UUFBcEQsaUJBa0NDO1FBakNHLElBQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQztRQUN4QixJQUFNLHFCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUMzQyxJQUFJLGdCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNwQyxJQUFNLFlBQVksR0FBMkIsRUFBRSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXO1lBQzdCLGtCQUFrQjtZ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b0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxJQUFNLE1BQU0sR0FBRyxZQUFVLHNCQUFzQixhQUFRLGNBQWMsY0FBUyxxQkFBcUIsU0FBTSxDQUFDO1FBQzFHLElBQU0sS0FBSyxHQUFHLG1CQUFpQixZQUFZLENBQUMsVUFBVSxTQUFJLE1BQU0sU0FBSSxhQUFlLENBQUM7UUFDcEYsT0FBTyxJQUFJLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBOUh1QiwyQ0FBc0IsR0FBRyx3QkFBd0IsQ0FBQztJQUNsRCwrQ0FBMEIsR0FBRyxLQUFLLENBQUM7SUE4SC9ELDJCQUFDO0NBQUEsQUFoSUQsSUFnSUM7U0FoSVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50RW50cnl9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQge0NvbnRlbnRVdGlsfSBmcm9tICcuLi91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQgKiBhcyBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtBcnJheVV0aWx9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXktdXRpbCc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7RmlsZU5hbWUsIFZpc2liaWxpdHl9IGZyb20gJy4uJztcbmltcG9ydCBDT0xVTU5fTkFNRV9MT0NBTF9EQVRBID0gQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEE7XG5pbXBvcnQgQ09MVU1OX05BTUVfSURFTlRJRklFUiA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSO1xuaW1wb3J0IENPTFVNTl9OQU1FX1JFRl9DT1VOVCA9IENvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9SRUZfQ09VTlQ7XG5cbmV4cG9ydCBjbGFzcyBJbXBvcnRORXhwb3J0SGFuZGxlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUtTVEVQX0NPTlRFTlRfQVJDSElWRSA9ICdla3N0ZXAuY29udGVudC5hcmNoaXZlJztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTVVBQT1JURURfTUFOSUZFU1RfVkVSU0lPTiA9ICcxLjEnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGJTZXJ2aWNlPzogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U/OiBGaWxlU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgcG9wdWxhdGVJdGVtcyhjb250ZW50c0luRGI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXSk6IHsgW2tleTogc3RyaW5nXTogYW55IH1bXSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBhbnlbXSA9IFtdO1xuICAgICAgICBjb25zdCBhbGxDb250ZW50c0lkZW50aWZpZXI6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBjaGlsZElkZW50aWZpZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBjb250ZW50SW5kZXg6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgICAgY29udGVudHNJbkRiLmZvckVhY2goKGNvbnRlbnRJbkRiKSA9PiB7XG4gICAgICAgICAgICAvLyBpdGVtIGxvY2FsIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBKU09OLnBhcnNlKGNvbnRlbnRJbkRiW0NPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKTtcbiAgICAgICAgICAgIC8vIGluZGV4IGl0ZW1cbiAgICAgICAgICAgIGNvbnRlbnRJbmRleFtjb250ZW50SW5EYltDT0xVTU5fTkFNRV9JREVOVElGSUVSXV0gPSBpdGVtO1xuICAgICAgICAgICAgQ29udGVudFV0aWwuYWRkVmlyYWxpdHlNZXRhZGF0YUlmTWlzc2luZyhpdGVtLCB0aGlzLmRldmljZUluZm8hLmdldERldmljZUlEKCkpO1xuICAgICAgICAgICAgLy8gZ2V0IGl0ZW0ncyBjaGlsZHJlbiBvbmx5IHRvIG1hcmsgY2hpbGRyZW4gd2l0aCB2aXNpYmlsaXR5IGFzIFBhcmVudFxuICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmhhc0NoaWxkcmVuKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgY2hpbGRyZW4gaWRlbnRpZmllcnNcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRJZGVudGlmaWVyczogc3RyaW5nW10gPSBDb250ZW50VXRpbC5nZXRDaGlsZENvbnRlbnRzSWRlbnRpZmllcnMoaXRlbSk7XG4gICAgICAgICAgICAgICAgY2hpbGRJZGVudGlmaWVycyA9IGNoaWxkSWRlbnRpZmllcnMuY29uY2F0KGNoaWxkQ29udGVudElkZW50aWZpZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWxsQ29udGVudHNJZGVudGlmaWVyLnB1c2goY29udGVudEluRGJbQ09MVU1OX05BTUVfSURFTlRJRklFUl0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFsbENvbnRlbnRzSWRlbnRpZmllci5mb3JFYWNoKChpZGVudGlmaWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudERhdGEgPSBjb250ZW50SW5kZXhbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5VXRpbC5jb250YWlucyhjaGlsZElkZW50aWZpZXJzLCBpZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50RGF0YVsndmlzaWJpbGl0eSddID0gVmlzaWJpbGl0eS5QQVJFTlQudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGNvbnRlbnREYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIHBvcHVsYXRlSXRlbUxpc3QoY29udGVudFdpdGhBbGxDaGlsZHJlbjogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdIHtcbiAgICAgICAgY29uc3QgaXRlbXM6IGFueVtdID0gW107XG4gICAgICAgIGNvbnN0IGFsbENvbnRlbnRzSWRlbnRpZmllcjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGNoaWxkSWRlbnRpZmllcnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRlbnRJbmRleDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICBjb250ZW50V2l0aEFsbENoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnRlbnRJbmRleFtpdGVtWydpZGVudGlmaWVyJ11dID0gaXRlbTtcbiAgICAgICAgICAgIENvbnRlbnRVdGlsLmFkZFZpcmFsaXR5TWV0YWRhdGFJZk1pc3NpbmcoaXRlbSwgdGhpcy5kZXZpY2VJbmZvIS5nZXREZXZpY2VJRCgpKTtcbiAgICAgICAgICAgIC8vIGdldCBpdGVtJ3MgY2hpbGRyZW4gb25seSB0byBtYXJrIGNoaWxkcmVuIHdpdGggdmlzaWJpbGl0eSBhcyBQYXJlbnRcbiAgICAgICAgICAgIGlmIChDb250ZW50VXRpbC5oYXNDaGlsZHJlbihpdGVtKSkge1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlIGNoaWxkcmVuIGlkZW50aWZpZXJzXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb250ZW50SWRlbnRpZmllcnM6IHN0cmluZ1tdID0gQ29udGVudFV0aWwuZ2V0Q2hpbGRDb250ZW50c0lkZW50aWZpZXJzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGNoaWxkSWRlbnRpZmllcnMgPSBjaGlsZElkZW50aWZpZXJzLmNvbmNhdChjaGlsZENvbnRlbnRJZGVudGlmaWVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFsbENvbnRlbnRzSWRlbnRpZmllci5wdXNoKGl0ZW1bJ2lkZW50aWZpZXInXSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYWxsQ29udGVudHNJZGVudGlmaWVyLmZvckVhY2goKGlkZW50aWZpZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50RGF0YSA9IGNvbnRlbnRJbmRleFtpZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXlVdGlsLmNvbnRhaW5zKGNoaWxkSWRlbnRpZmllcnMsIGlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnREYXRhWyd2aXNpYmlsaXR5J10gPSBWaXNpYmlsaXR5LlBBUkVOVC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goY29udGVudERhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRDb250ZW50RXhwb3J0REJNb2RlbFRvRXhwb3J0KGNvbnRlbnRJZHM6IHN0cmluZ1tdKTogUHJvbWlzZTxDb250ZW50RW50cnkuU2NoZW1hTWFwW10+IHtcbiAgICAgICAgbGV0IGNvbnRlbnRNb2RlbFRvRXhwb3J0OiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10gPSBbXTtcbiAgICAgICAgLy8gY29uc3QgcXVldWU6IFF1ZXVlPENvbnRlbnRFbnRyeS5TY2hlbWFNYXA+ID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzSW5EYjogQ29udGVudEVudHJ5LlNjaGVtYU1hcFtdID0gYXdhaXQgdGhpcy5maW5kQWxsQ29udGVudHNXaXRoSWRlbnRpZmllcnMoY29udGVudElkcyk7XG4gICAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IENvbnRlbnRVdGlsLmdldEJhc2VQYXRoKGNvbnRlbnRzSW5EYlswXVtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF0hKTtcbiAgICAgICAgYXdhaXQgdGhpcy5maWxlU2VydmljZSEucmVhZEFzVGV4dChtYW5pZmVzdFBhdGgsIEZpbGVOYW1lLk1BTklGRVNULnZhbHVlT2YoKSlcbiAgICAgICAgICAgIC50aGVuKGFzeW5jIChmaWxlQ29udGVudHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZENvbnRlbnRzID0gSlNPTi5wYXJzZShmaWxlQ29udGVudHMpLmFyY2hpdmUuaXRlbXM7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJZGVudGlmaWVyczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBjaGlsZENvbnRlbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkSWRlbnRpZmllcnMucHVzaChlbGVtZW50LmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRNb2RlbFRvRXhwb3J0ID0gYXdhaXQgdGhpcy5maW5kQWxsQ29udGVudHNXaXRoSWRlbnRpZmllcnMoY2hpbGRJZGVudGlmaWVycywgdHJ1ZSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVSZWFkIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKENvbnRlbnRVdGlsLmRlRHVwZShjb250ZW50TW9kZWxUb0V4cG9ydCwgJ2lkZW50aWZpZXInKSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVNYW5pZmVzdEZvckFyY2hpdmUoaXRlbXM6IGFueVtdKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIGNvbnN0IG1hbmlmZXN0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgIGNvbnN0IGFyY2hpdmU6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgICAgYXJjaGl2ZS50dGwgPSAyNDtcbiAgICAgICAgYXJjaGl2ZS5jb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgYXJjaGl2ZS5pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgbWFuaWZlc3RcbiAgICAgICAgbWFuaWZlc3RbJ2lkJ10gPSBJbXBvcnRORXhwb3J0SGFuZGxlci5FS1NURVBfQ09OVEVOVF9BUkNISVZFO1xuICAgICAgICBtYW5pZmVzdFsndmVyJ10gPSBJbXBvcnRORXhwb3J0SGFuZGxlci5TVVBQT1JURURfTUFOSUZFU1RfVkVSU0lPTjtcbiAgICAgICAgbWFuaWZlc3RbJ3RzJ10gPSBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERFRISDptbTpzc1taXScpO1xuICAgICAgICBtYW5pZmVzdFsnYXJjaGl2ZSddID0gYXJjaGl2ZTtcbiAgICAgICAgcmV0dXJuIG1hbmlmZXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEFsbENvbnRlbnRzV2l0aElkZW50aWZpZXJzKGlkZW50aWZpZXJzOiBzdHJpbmdbXSwgc29ydD8pOiBQcm9taXNlPENvbnRlbnRFbnRyeS5TY2hlbWFNYXBbXT4ge1xuICAgICAgICBsZXQgb3JkZXJCeVN0cmluZyA9ICcnO1xuICAgICAgICBpZiAoc29ydCkge1xuICAgICAgICAgICAgaWYgKGlkZW50aWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9yZGVyQnlTdHJpbmcgPSBpZGVudGlmaWVycy5yZWR1Y2UoKGFjYywgaWRlbnRpZmllciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGAgV0hFTiAnJHtpZGVudGlmaWVyfScgVEhFTiAke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSwgYCBPUkRFUiBCWSBDQVNFICR7Q09MVU1OX05BTUVfSURFTlRJRklFUn1gKSArICcgRU5EJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXJzU3RyID0gQXJyYXlVdGlsLmpvaW5QcmVzZXJ2aW5nUXVvdGVzKGlkZW50aWZpZXJzKTtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gYCB3aGVyZSAke0NPTFVNTl9OQU1FX0lERU5USUZJRVJ9IGluICgke2lkZW50aWZpZXJzU3RyfSkgQU5EICR7Q09MVU1OX05BTUVfUkVGX0NPVU5UfSA+IDBgO1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBzZWxlY3QgKiBmcm9tICR7Q29udGVudEVudHJ5LlRBQkxFX05BTUV9ICR7ZmlsdGVyfSAke29yZGVyQnlTdHJpbmd9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlIS5leGVjdXRlKHF1ZXJ5KS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=