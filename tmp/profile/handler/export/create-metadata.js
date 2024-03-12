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
import { Response } from '../../../api';
import { UniqueId } from '../../../db/util/unique-id';
import { MetaEntry } from '../../../telemetry/db/schema';
var CreateMetaData = /** @class */ (function () {
    function CreateMetaData(dbService, fileService, deviceInfo) {
        this.dbService = dbService;
        this.fileService = fileService;
        this.deviceInfo = deviceInfo;
    }
    CreateMetaData.prototype.execute = function (exportContext) {
        return __awaiter(this, void 0, void 0, function () {
            var response, metaData;
            var _this = this;
            return __generator(this, function (_a) {
                response = new Response();
                metaData = this.generateMetaData(exportContext.userIds, exportContext.groupIds);
                return [2 /*return*/, this.dbService.open(exportContext.destinationDBFilePath).then(function () {
                        return _this.dbService.execute(MetaEntry.getCreateEntry(), true).toPromise();
                    }).then(function () {
                        return _this.populateMetaData(metaData);
                    }).then(function () {
                        response.body = exportContext;
                        return response;
                    }).catch(function (error) {
                        console.log('error', error);
                        throw response;
                    })];
            });
        });
    };
    CreateMetaData.prototype.generateMetaData = function (userIds, groupIds) {
        var metaData = {};
        metaData['version'] = 20;
        metaData['types'] = JSON.stringify(['userprofile']);
        metaData['did'] = this.deviceInfo.getDeviceID();
        metaData['export_id'] = UniqueId.generateUniqueId();
        if (!groupIds) {
            groupIds = [];
        }
        metaData['profiles_count'] = userIds.length + groupIds.length;
        return metaData;
    };
    CreateMetaData.prototype.populateMetaData = function (metaData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(metaData).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    var model;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                model = { key: key, value: metaData[key] };
                                return [4 /*yield*/, this.dbService.insert({
                                        table: MetaEntry.TABLE_NAME,
                                        modelJson: model, useExternalDb: true
                                    }).toPromise()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return CreateMetaData;
}());
export { CreateMetaData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW1ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGUvaGFuZGxlci9leHBvcnQvY3JlYXRlLW1ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBR3BELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RDtJQUNJLHdCQUFvQixTQUFvQixFQUNwQixXQUF3QixFQUN4QixVQUFzQjtRQUZ0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDMUMsQ0FBQztJQUVZLGdDQUFPLEdBQXBCLFVBQXFCLGFBQW1DOzs7OztnQkFDOUMsUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ3BDLFFBQVEsR0FBMkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RyxzQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2xFLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ0osT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSixRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDOUIsT0FBTyxRQUFRLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7d0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQzVCLE1BQU0sUUFBUSxDQUFDO29CQUNuQixDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFHTyx5Q0FBZ0IsR0FBeEIsVUFBeUIsT0FBaUIsRUFBRSxRQUFrQjtRQUMxRCxJQUFNLFFBQVEsR0FBMkIsRUFBRSxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM5RCxPQUFPLFFBQVEsQ0FBQztJQUVwQixDQUFDO0lBRWEseUNBQWdCLEdBQTlCLFVBQStCLFFBQWdDOzs7O2dCQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFPLEdBQUc7Ozs7O2dDQUM5QixLQUFLLEdBQUcsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQztnQ0FDL0MscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0NBQ3hCLEtBQUssRUFBRSxTQUFTLENBQUMsVUFBVTt3Q0FDM0IsU0FBUyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSTtxQ0FDeEMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOztnQ0FIZCxTQUdjLENBQUM7Ozs7cUJBQ2xCLENBQUMsQ0FBQzs7OztLQUNOO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2RiJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7VW5pcXVlSWR9IGZyb20gJy4uLy4uLy4uL2RiL3V0aWwvdW5pcXVlLWlkJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7RXhwb3J0UHJvZmlsZUNvbnRleHR9IGZyb20gJy4uLy4uL2RlZi9leHBvcnQtcHJvZmlsZS1jb250ZXh0JztcbmltcG9ydCB7TWV0YUVudHJ5fSBmcm9tICcuLi8uLi8uLi90ZWxlbWV0cnkvZGIvc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZU1ldGFEYXRhIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbykge1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKGV4cG9ydENvbnRleHQ6IEV4cG9ydFByb2ZpbGVDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgY29uc3QgbWV0YURhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB0aGlzLmdlbmVyYXRlTWV0YURhdGEoZXhwb3J0Q29udGV4dC51c2VySWRzLCBleHBvcnRDb250ZXh0Lmdyb3VwSWRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLm9wZW4oZXhwb3J0Q29udGV4dC5kZXN0aW5hdGlvbkRCRmlsZVBhdGghKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5leGVjdXRlKE1ldGFFbnRyeS5nZXRDcmVhdGVFbnRyeSgpLCB0cnVlKS50b1Byb21pc2UoKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3B1bGF0ZU1ldGFEYXRhKG1ldGFEYXRhKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gZXhwb3J0Q29udGV4dDtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGdlbmVyYXRlTWV0YURhdGEodXNlcklkczogc3RyaW5nW10sIGdyb3VwSWRzOiBzdHJpbmdbXSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICBjb25zdCBtZXRhRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICBtZXRhRGF0YVsndmVyc2lvbiddID0gMjA7XG4gICAgICAgIG1ldGFEYXRhWyd0eXBlcyddID0gSlNPTi5zdHJpbmdpZnkoWyd1c2VycHJvZmlsZSddKTtcbiAgICAgICAgbWV0YURhdGFbJ2RpZCddID0gdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCk7XG4gICAgICAgIG1ldGFEYXRhWydleHBvcnRfaWQnXSA9IFVuaXF1ZUlkLmdlbmVyYXRlVW5pcXVlSWQoKTtcbiAgICAgICAgaWYgKCFncm91cElkcykge1xuICAgICAgICAgICAgZ3JvdXBJZHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBtZXRhRGF0YVsncHJvZmlsZXNfY291bnQnXSA9IHVzZXJJZHMubGVuZ3RoICsgZ3JvdXBJZHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbWV0YURhdGE7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHBvcHVsYXRlTWV0YURhdGEobWV0YURhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAgICAgT2JqZWN0LmtleXMobWV0YURhdGEpLmZvckVhY2goYXN5bmMgKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB7a2V5OiBrZXksIHZhbHVlOiBtZXRhRGF0YVtrZXldfTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgdGFibGU6IE1ldGFFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogbW9kZWwsIHVzZUV4dGVybmFsRGI6IHRydWVcbiAgICAgICAgICAgIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=