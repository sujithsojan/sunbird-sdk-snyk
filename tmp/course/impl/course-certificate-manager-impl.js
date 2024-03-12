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
import { defer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { gzip } from 'pako/dist/pako_deflate';
import { ungzip } from 'pako/dist/pako_inflate';
var CourseCertificateManagerImpl = /** @class */ (function () {
    function CourseCertificateManagerImpl(profileService, fileService, keyValueStore, csCourseService) {
        this.profileService = profileService;
        this.fileService = fileService;
        this.keyValueStore = keyValueStore;
        this.csCourseService = csCourseService;
    }
    CourseCertificateManagerImpl.prototype.isCertificateCached = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getCertificateFromCache(request)];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    CourseCertificateManagerImpl.prototype.getCertificate = function (request) {
        var _this = this;
        return this.csCourseService.getSignedCourseCertificate(request.certificate.identifier).pipe(tap(function (r) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.keyValueStore).setValue;
                        return [4 /*yield*/, this.buildCertificatePersistenceId(request)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), gzip(r.printUri, { to: 'string' })]).toPromise()];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); }), map(function (r) { return r.printUri; }), catchError(function (e) {
            return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                var cached;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCertificateFromCache(request)];
                        case 1:
                            cached = _a.sent();
                            if (cached) {
                                return [2 /*return*/, cached];
                            }
                            throw e;
                    }
                });
            }); });
        }));
    };
    CourseCertificateManagerImpl.prototype.downloadCertificate = function (_a) {
        var _this = this;
        var fileName = _a.fileName, blob = _a.blob;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fileService.writeFile(cordova.file.externalDataDirectory, fileName, blob, { replace: true }).
                        then(function () {
                        return {
                            path: "" + cordova.file.externalDataDirectory + fileName
                        };
                    })];
            });
        }); });
    };
    CourseCertificateManagerImpl.prototype.buildCertificatePersistenceId = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var session, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        session = _a.sent();
                        userId = session.managedSession ? session.managedSession.uid : session.uid;
                        return [2 /*return*/, "certificate_" + request.certificate.identifier + "_" + request.courseId + "_" + userId];
                }
            });
        });
    };
    CourseCertificateManagerImpl.prototype.getCertificateFromCache = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.keyValueStore).getValue;
                        return [4 /*yield*/, this.buildCertificatePersistenceId(request)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()]).toPromise()];
                    case 2:
                        value = _c.sent();
                        return [2 /*return*/, value ? ungzip(value, { to: 'string' }) : undefined];
                }
            });
        });
    };
    return CourseCertificateManagerImpl;
}());
export { CourseCertificateManagerImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLWNlcnRpZmljYXRlLW1hbmFnZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaW1wbC9jb3Vyc2UtY2VydGlmaWNhdGUtbWFuYWdlci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFJdkMsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJcEQsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU5QztJQUNJLHNDQUNZLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLGVBQWdDO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFFNUMsQ0FBQztJQUVELDBEQUFtQixHQUFuQixVQUFvQixPQUE4QjtRQUFsRCxpQkFTQztRQVJHLE9BQU8sS0FBSyxDQUFDOzs7Ozs7d0JBRUsscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxFQUFBOzRCQUFyRCxzQkFBTyxDQUFDLENBQUMsQ0FBQyxTQUEyQyxDQUFDLEVBQUM7Ozt3QkFFdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQzt3QkFDakIsc0JBQU8sS0FBSyxFQUFDOzs7O2FBRXBCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxREFBYyxHQUFkLFVBQWUsT0FBOEI7UUFBN0MsaUJBcUJDO1FBcEJHLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVcsQ0FBQyxDQUFDLElBQUksQ0FDeEYsR0FBRyxDQUFDLFVBQU8sQ0FBQzs7Ozs7d0JBQ0YsS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQSxDQUFDLFFBQVEsQ0FBQTt3QkFDN0IscUJBQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxFQUFBOzRCQURyRCxxQkFBTSxjQUNGLFNBQWlELEVBQ2pELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUMsRUFBRSxFQUFFLFFBQVEsRUFBQyxDQUFDLEVBQ25DLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUhiLFNBR2EsQ0FBQzs7OzthQUNqQixDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsRUFDdEIsVUFBVSxDQUFDLFVBQUMsQ0FBQztZQUNULE9BQU8sS0FBSyxDQUFDOzs7O2dDQUNNLHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsRUFBQTs7NEJBQXBELE1BQU0sR0FBRyxTQUEyQzs0QkFFMUQsSUFBSSxNQUFNLEVBQUU7Z0NBQ1Isc0JBQU8sTUFBTSxFQUFDOzZCQUNqQjs0QkFFRCxNQUFNLENBQUMsQ0FBQzs7O2lCQUNYLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsMERBQW1CLEdBQW5CLFVBQW9CLEVBQThDO1FBQWxFLGlCQWFDO1lBYnFCLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBQTtRQUNoQyxPQUFPLEtBQUssQ0FBQzs7Z0JBQ1Qsc0JBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQ2hDLFFBQVEsRUFBRSxJQUFXLEVBQ3JCLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUNsQjt3QkFDRCxJQUFJLENBQUM7d0JBQ0QsT0FBTzs0QkFDSCxJQUFJLEVBQUUsS0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFFBQVU7eUJBQzNELENBQUM7b0JBQ04sQ0FBQyxDQUFDLEVBQUM7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLG9FQUE2QixHQUEzQyxVQUE0QyxPQUE4Qjs7Ozs7NEJBQ3RELHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXpFLE9BQU8sR0FBRyxTQUErRDt3QkFDekUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNqRixzQkFBTyxpQkFBZSxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsU0FBSSxPQUFPLENBQUMsUUFBUSxTQUFJLE1BQVEsRUFBQzs7OztLQUN4RjtJQUVhLDhEQUF1QixHQUFyQyxVQUFzQyxPQUE4Qjs7Ozs7O3dCQUM1QyxLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUMsUUFBUSxDQUFBO3dCQUMzQyxxQkFBTSxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLEVBQUE7NEJBRHZDLHFCQUFNLGNBQ2hCLFNBQWlELEVBQ3BELENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUZQLEtBQUssR0FBRyxTQUVEO3dCQUViLHNCQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUM7Ozs7S0FDNUQ7SUFDTCxtQ0FBQztBQUFELENBQUMsQUF2RUQsSUF1RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvdXJzZUNlcnRpZmljYXRlTWFuYWdlcn0gZnJvbSAnLi4vZGVmL2NvdXJzZS1jZXJ0aWZpY2F0ZS1tYW5hZ2VyJztcbmltcG9ydCB7RG93bmxvYWRDZXJ0aWZpY2F0ZVJlcXVlc3R9IGZyb20gJy4uL2RlZi9kb3dubG9hZC1jZXJ0aWZpY2F0ZS1yZXF1ZXN0JztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEb3dubG9hZENlcnRpZmljYXRlUmVzcG9uc2V9IGZyb20gJy4uL2RlZi9kb3dubG9hZC1jZXJ0aWZpY2F0ZS1yZXNwb25zZSc7XG5pbXBvcnQge0dldENlcnRpZmljYXRlUmVxdWVzdH0gZnJvbSAnLi4vZGVmL2dldC1jZXJ0aWZpY2F0ZS1yZXF1ZXN0JztcbmltcG9ydCB7Q3NDb3Vyc2VTZXJ2aWNlfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jb3Vyc2UnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge0tleVZhbHVlU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi91dGlsL2ZpbGUvZGVmL2ZpbGUtc2VydmljZSc7XG5pbXBvcnQge2d6aXB9IGZyb20gJ3Bha28vZGlzdC9wYWtvX2RlZmxhdGUnO1xuaW1wb3J0IHt1bmd6aXB9IGZyb20gJ3Bha28vZGlzdC9wYWtvX2luZmxhdGUnO1xuXG5leHBvcnQgY2xhc3MgQ291cnNlQ2VydGlmaWNhdGVNYW5hZ2VySW1wbCBpbXBsZW1lbnRzIENvdXJzZUNlcnRpZmljYXRlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBrZXlWYWx1ZVN0b3JlOiBLZXlWYWx1ZVN0b3JlLFxuICAgICAgICBwcml2YXRlIGNzQ291cnNlU2VydmljZTogQ3NDb3Vyc2VTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIGlzQ2VydGlmaWNhdGVDYWNoZWQocmVxdWVzdDogR2V0Q2VydGlmaWNhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShhd2FpdCB0aGlzLmdldENlcnRpZmljYXRlRnJvbUNhY2hlKHJlcXVlc3QpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2VydGlmaWNhdGUocmVxdWVzdDogR2V0Q2VydGlmaWNhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3NDb3Vyc2VTZXJ2aWNlLmdldFNpZ25lZENvdXJzZUNlcnRpZmljYXRlKHJlcXVlc3QuY2VydGlmaWNhdGUuaWRlbnRpZmllciEpLnBpcGUoXG4gICAgICAgICAgICB0YXAoYXN5bmMgKHIpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmtleVZhbHVlU3RvcmUuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYnVpbGRDZXJ0aWZpY2F0ZVBlcnNpc3RlbmNlSWQocmVxdWVzdCksXG4gICAgICAgICAgICAgICAgICAgIGd6aXAoci5wcmludFVyaSwge3RvOiAnc3RyaW5nJ30pXG4gICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChyKSA9PiByLnByaW50VXJpKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBhd2FpdCB0aGlzLmdldENlcnRpZmljYXRlRnJvbUNhY2hlKHJlcXVlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkb3dubG9hZENlcnRpZmljYXRlKHsgZmlsZU5hbWUsIGJsb2IgfTogRG93bmxvYWRDZXJ0aWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2Uud3JpdGVGaWxlKFxuICAgICAgICAgICAgICBjb3Jkb3ZhLmZpbGUuZXh0ZXJuYWxEYXRhRGlyZWN0b3J5ICxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSwgYmxvYiBhcyBhbnksXG4gICAgICAgICAgICAgICAge3JlcGxhY2U6IHRydWV9XG4gICAgICAgICAgICApLlxuICAgICAgICAgICAgdGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogYCR7Y29yZG92YS5maWxlLmV4dGVybmFsRGF0YURpcmVjdG9yeX0ke2ZpbGVOYW1lfWBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgYnVpbGRDZXJ0aWZpY2F0ZVBlcnNpc3RlbmNlSWQocmVxdWVzdDogR2V0Q2VydGlmaWNhdGVSZXF1ZXN0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS50b1Byb21pc2UoKTtcbiAgICAgICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogc2Vzc2lvbi51aWQ7XG4gICAgICAgIHJldHVybiBgY2VydGlmaWNhdGVfJHtyZXF1ZXN0LmNlcnRpZmljYXRlLmlkZW50aWZpZXJ9XyR7cmVxdWVzdC5jb3Vyc2VJZH1fJHt1c2VySWR9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldENlcnRpZmljYXRlRnJvbUNhY2hlKHJlcXVlc3Q6IEdldENlcnRpZmljYXRlUmVxdWVzdCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5idWlsZENlcnRpZmljYXRlUGVyc2lzdGVuY2VJZChyZXF1ZXN0KSxcbiAgICAgICAgKS50b1Byb21pc2UoKTtcblxuICAgICAgICByZXR1cm4gdmFsdWUgPyB1bmd6aXAodmFsdWUsIHt0bzogJ3N0cmluZyd9KSA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=