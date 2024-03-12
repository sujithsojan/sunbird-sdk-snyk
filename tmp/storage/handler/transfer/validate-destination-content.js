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
import { ContentUtil } from '../../../content/util/content-util';
import { FileName, Visibility } from '../../../content';
import { defer } from 'rxjs';
var ValidateDestinationContent = /** @class */ (function () {
    function ValidateDestinationContent(fileService, appConfig) {
        this.fileService = fileService;
        this.appConfig = appConfig;
    }
    ValidateDestinationContent.prototype.execute = function (context) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = context;
                        return [4 /*yield*/, this.getSubdirectoriesEntries(context.destinationFolder)
                                .then(function (entries) { return _this.extractValidContentIdsInDestination(entries); })];
                    case 1:
                        _a.validContentIdsInDestination =
                            _b.sent();
                        return [2 /*return*/, context];
                }
            });
        }); });
    };
    ValidateDestinationContent.prototype.getSubdirectoriesEntries = function (directoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.listDir(directoryPath.replace(/\/$/, ''))
                        .then(function (entries) { return entries
                        .filter(function (e) { return e.isDirectory; }); })];
            });
        });
    };
    ValidateDestinationContent.prototype.extractValidContentIdsInDestination = function (entries) {
        return __awaiter(this, void 0, void 0, function () {
            var validContentIdsInDestination, _i, entries_1, entry, manifest, e_1, items, _a, items_1, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validContentIdsInDestination = [];
                        _i = 0, entries_1 = entries;
                        _b.label = 1;
                    case 1:
                        if (!(_i < entries_1.length)) return [3 /*break*/, 7];
                        entry = entries_1[_i];
                        if (!entry.isDirectory) return [3 /*break*/, 6];
                        manifest = void 0;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.extractManifest(entry)];
                    case 3:
                        manifest = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (!manifest) {
                            return [3 /*break*/, 6];
                        }
                        items = manifest.archive.items;
                        for (_a = 0, items_1 = items; _a < items_1.length; _a++) {
                            item = items_1[_a];
                            if (ContentUtil.readVisibility(item) === Visibility.PARENT) {
                                continue;
                            }
                            if (ContentUtil.isDraftContent(item.status) && ContentUtil.isExpired(item.expires)) {
                                continue;
                            }
                            validContentIdsInDestination.push(entry.name);
                        }
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, validContentIdsInDestination];
                }
            });
        });
    };
    ValidateDestinationContent.prototype.extractManifest = function (directoryEntry) {
        return __awaiter(this, void 0, void 0, function () {
            var manifestStringified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileService.readAsText(directoryEntry.nativeURL, FileName.MANIFEST.valueOf())];
                    case 1:
                        manifestStringified = _a.sent();
                        return [2 /*return*/, JSON.parse(manifestStringified)];
                }
            });
        });
    };
    return ValidateDestinationContent;
}());
export { ValidateDestinationContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZGVzdGluYXRpb24tY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdG9yYWdlL2hhbmRsZXIvdHJhbnNmZXIvdmFsaWRhdGUtZGVzdGluYXRpb24tY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFL0QsT0FBTyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRXZDO0lBRUksb0NBQW9CLFdBQXdCLEVBQ3hCLFNBQW9CO1FBRHBCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDeEMsQ0FBQztJQUVELDRDQUFPLEdBQVAsVUFBUSxPQUErQjtRQUF2QyxpQkFPQztRQU5HLE9BQU8sS0FBSyxDQUFDOzs7Ozs7d0JBQ1QsS0FBQSxPQUFPLENBQUE7d0JBQ0gscUJBQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxpQkFBa0IsQ0FBQztpQ0FDMUQsSUFBSSxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1DQUFtQyxDQUFDLE9BQU8sQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLEVBQUE7O3dCQUY3RSxHQUFRLDRCQUE0Qjs0QkFDaEMsU0FDeUUsQ0FBQzt3QkFDOUUsc0JBQU8sT0FBTyxFQUFDOzs7YUFDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDZEQUF3QixHQUF0QyxVQUF1QyxhQUFxQjs7O2dCQUN4RCxzQkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDNUQsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTzt5QkFDbkIsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBYixDQUFhLENBQUMsRUFEZCxDQUNjLENBQzlCLEVBQUM7OztLQUNUO0lBRWEsd0VBQW1DLEdBQWpELFVBQWtELE9BQWdCOzs7Ozs7d0JBQ3hELDRCQUE0QixHQUFhLEVBQUUsQ0FBQzs4QkFFdkIsRUFBUCxtQkFBTzs7OzZCQUFQLENBQUEscUJBQU8sQ0FBQTt3QkFBaEIsS0FBSzs2QkFDUixLQUFLLENBQUMsV0FBVyxFQUFqQix3QkFBaUI7d0JBQ2IsUUFBUSxTQUFzQixDQUFDOzs7O3dCQUVwQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBNUMsUUFBUSxHQUFHLFNBQWlDLENBQUM7Ozs7Ozt3QkFJakQsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDWCx3QkFBUzt5QkFDWjt3QkFDSyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ3JDLFdBQXdCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUFFOzRCQUFmLElBQUk7NEJBQ1gsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0NBQ3hELFNBQVM7NkJBQ1o7NEJBRUQsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQ0FDaEYsU0FBUzs2QkFDWjs0QkFDRCw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNqRDs7O3dCQXJCVyxJQUFPLENBQUE7OzRCQXlCM0Isc0JBQU8sNEJBQTRCLEVBQUM7Ozs7S0FDdkM7SUFFYSxvREFBZSxHQUE3QixVQUE4QixjQUFxQjs7Ozs7NEJBQ25CLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUN6RCxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQTs7d0JBRHBELG1CQUFtQixHQUFHLFNBQzhCO3dCQUMxRCxzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUM7Ozs7S0FDMUM7SUFnQkwsaUNBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWxlU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vdXRpbC9maWxlL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uLy4uLy4uL2FwaS9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge01hbmlmZXN0LCBUcmFuc2ZlckNvbnRlbnRDb250ZXh0fSBmcm9tICcuLi90cmFuc2Zlci1jb250ZW50LWhhbmRsZXInO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vLi4vLi4vY29udGVudC91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge0VudHJ5fSBmcm9tICcuLi8uLi8uLi91dGlsL2ZpbGUnO1xuaW1wb3J0IHtGaWxlTmFtZSwgVmlzaWJpbGl0eX0gZnJvbSAnLi4vLi4vLi4vY29udGVudCc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlRGVzdGluYXRpb25Db250ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcpIHtcbiAgICB9XG5cbiAgICBleGVjdXRlKGNvbnRleHQ6IFRyYW5zZmVyQ29udGVudENvbnRleHQpOiBPYnNlcnZhYmxlPFRyYW5zZmVyQ29udGVudENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnRleHQudmFsaWRDb250ZW50SWRzSW5EZXN0aW5hdGlvbiA9XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRTdWJkaXJlY3Rvcmllc0VudHJpZXMoY29udGV4dC5kZXN0aW5hdGlvbkZvbGRlciEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChlbnRyaWVzKSA9PiB0aGlzLmV4dHJhY3RWYWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uKGVudHJpZXMpKTtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldFN1YmRpcmVjdG9yaWVzRW50cmllcyhkaXJlY3RvcnlQYXRoOiBzdHJpbmcpOiBQcm9taXNlPEVudHJ5W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UubGlzdERpcihkaXJlY3RvcnlQYXRoLnJlcGxhY2UoL1xcLyQvLCAnJykpXG4gICAgICAgICAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGUgPT4gZS5pc0RpcmVjdG9yeSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBleHRyYWN0VmFsaWRDb250ZW50SWRzSW5EZXN0aW5hdGlvbihlbnRyaWVzOiBFbnRyeVtdKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkQ29udGVudElkc0luRGVzdGluYXRpb246IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFuaWZlc3Q6IE1hbmlmZXN0IHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbmlmZXN0ID0gYXdhaXQgdGhpcy5leHRyYWN0TWFuaWZlc3QoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hbmlmZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IG1hbmlmZXN0LmFyY2hpdmUuaXRlbXM7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDb250ZW50VXRpbC5yZWFkVmlzaWJpbGl0eShpdGVtKSA9PT0gVmlzaWJpbGl0eS5QQVJFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLmlzRHJhZnRDb250ZW50KGl0ZW0uc3RhdHVzKSAmJiBDb250ZW50VXRpbC5pc0V4cGlyZWQoaXRlbS5leHBpcmVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsaWRDb250ZW50SWRzSW5EZXN0aW5hdGlvbi5wdXNoKGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZENvbnRlbnRJZHNJbkRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZXh0cmFjdE1hbmlmZXN0KGRpcmVjdG9yeUVudHJ5OiBFbnRyeSk6IFByb21pc2U8TWFuaWZlc3Q+IHtcbiAgICAgICAgY29uc3QgbWFuaWZlc3RTdHJpbmdpZmllZCA9IGF3YWl0IHRoaXMuZmlsZVNlcnZpY2UucmVhZEFzVGV4dChcbiAgICAgICAgICAgIGRpcmVjdG9yeUVudHJ5Lm5hdGl2ZVVSTCwgRmlsZU5hbWUuTUFOSUZFU1QudmFsdWVPZigpKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobWFuaWZlc3RTdHJpbmdpZmllZCk7XG4gICAgfVxuICAgIC8vIFRPRE86IFN3YXlhbmdqaXRcbiAgICAvLyBwcml2YXRlIHZhbGlkYXRlTWFuaWZlc3QobWFuaWZlc3Q6IE1hbmlmZXN0KTogYm9vbGVhbiB7XG4gICAgLy8gICAgIHJldHVybiBtYW5pZmVzdC52ZXJzaW9uICE9PSAnMS4wJyAmJlxuICAgIC8vICAgICAgICAgISFtYW5pZmVzdFsnYXJjaGl2ZSddICYmXG4gICAgLy8gICAgICAgICAhIW1hbmlmZXN0WydhcmNoaXZlJ11bJ2l0ZW1zJ10gJiZcbiAgICAvLyAgICAgICAgICEhbWFuaWZlc3RbJ2FyY2hpdmUnXVsnaXRlbXMnXS5sZW5ndGggJiZcbiAgICAvLyAgICAgICAgIHRoaXMudmFsaWRhdGVJdGVtcyhtYW5pZmVzdFsnYXJjaGl2ZSddWydpdGVtcyddKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIHZhbGlkYXRlSXRlbXMoaXRlbXM6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgLy8gICAgIHJldHVybiBpdGVtcy5ldmVyeSgoaXRlbSkgPT5cbiAgICAvLyAgICAgICAgIENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGl0ZW0pID09PSBWaXNpYmlsaXR5LlBBUkVOVCB8fFxuICAgIC8vICAgICAgICAgIUNvbnRlbnRVdGlsLmlzQ29tcGF0aWJsZSh0aGlzLmFwcENvbmZpZywgQ29udGVudFV0aWwucmVhZENvbXBhdGliaWxpdHlMZXZlbChpdGVtKSlcbiAgICAvLyAgICAgKSAmJiBpdGVtcy5ldmVyeSgoaXRlbSkgPT4gQ29udGVudFV0aWwuaXNEcmFmdENvbnRlbnQoaXRlbS5zdGF0dXMpICYmIENvbnRlbnRVdGlsLmlzRXhwaXJlZChpdGVtLmV4cGlyZXMpKTtcbiAgICAvLyB9XG59XG4iXX0=