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
import { Container, inject, injectable } from "inversify";
import { defer, Observable, interval } from 'rxjs';
import { catchError, map, tap, filter, mergeMap, take } from 'rxjs/operators';
import { CsInjectionTokens, InjectionTokens } from "../../injection-tokens";
import { DbService } from "../../db";
import { GetPublicKeyHandler } from "../handlers/get-public-key-handler";
import { gzip } from 'pako/dist/pako_deflate';
import { ungzip } from 'pako/dist/pako_inflate';
var CertificateServiceImpl = /** @class */ (function () {
    function CertificateServiceImpl(container, dbService, sdkConfig, profileService, keyValueStore, fileService) {
        this.container = container;
        this.dbService = dbService;
        this.sdkConfig = sdkConfig;
        this.profileService = profileService;
        this.keyValueStore = keyValueStore;
        this.fileService = fileService;
    }
    CertificateServiceImpl.prototype.getCertificates = function (req) {
        return this.csCertificateService.fetchCertificates(req);
    };
    CertificateServiceImpl.prototype.getPublicKey = function (request) {
        return new GetPublicKeyHandler(this.dbService, this.container, this.sdkConfig.certificateServiceConfig, this.sdkConfig.apiConfig).handle(request);
    };
    CertificateServiceImpl.prototype.getCertificate = function (request) {
        var _this = this;
        return this.csCertificateService.getCerificateDownloadURI({
            certificateId: request.certificate.identifier,
            type: request.certificate.type,
            schemaName: 'certificate',
            templateUrl: request.certificate.templateUrl
        }).pipe(tap(function (r) { return __awaiter(_this, void 0, void 0, function () {
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
    CertificateServiceImpl.prototype.downloadCertificate = function (_a) {
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
    CertificateServiceImpl.prototype.downloadLegacyeCertificate = function (request) {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var activeProfile, userId, folderPath, filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                    case 1:
                        activeProfile = (_a.sent());
                        userId = activeProfile.managedSession ? activeProfile.managedSession.uid : activeProfile.uid;
                        folderPath = (window.device.platform.toLowerCase() === 'ios') ? cordova.file.documentsDirectory : cordova.file.externalRootDirectory;
                        filePath = folderPath + "Download/" + request.certificate.name + "_" + request.courseId + "_" + userId + ".pdf";
                        return [2 /*return*/, { userId: userId }];
                }
            });
        }); }).pipe(mergeMap(function (_a) {
            var userId = _a.userId;
            return _this.csCertificateService.getLegacyCerificateDownloadURI({
                pdfUrl: request.certificate.url,
            }).pipe(map(function (response) {
                return {
                    signedPdfUrl: response.signedUrl,
                    userId: userId
                };
            }));
        }), mergeMap(function (_a) {
            var signedPdfUrl = _a.signedPdfUrl, userId = _a.userId;
            var downloadRequest = {
                uri: signedPdfUrl,
                title: request.certificate.token,
                description: '',
                mimeType: 'application/pdf',
                visibleInDownloadsUi: true,
                notificationVisibility: 1,
                destinationInExternalPublicDir: {
                    dirType: 'Download',
                    subPath: "/" + request.certificate.name + "_" + request.courseId + "_" + userId + ".pdf"
                },
                headers: []
            };
            return new Observable(function (observer) {
                downloadManager.enqueue(downloadRequest, function (err, id) {
                    if (err) {
                        return observer.error(err);
                    }
                    observer.next(id);
                    observer.complete();
                });
            });
        }), mergeMap(function (downloadId) {
            return interval(1000)
                .pipe(mergeMap(function () {
                return new Observable(function (observer) {
                    downloadManager.query({ ids: [downloadId] }, function (err, entries) {
                        if (err || (entries[0].status === DownloadStatus.STATUS_FAILED)) {
                            return observer.error(err || new Error('Unknown Error'));
                        }
                        return observer.next(entries[0]);
                    });
                });
            }), filter(function (entry) { return entry.status === DownloadStatus.STATUS_SUCCESSFUL; }), take(1));
        }), map(function (entry) { return ({ path: entry.localUri }); }));
    };
    CertificateServiceImpl.prototype.isCertificateCached = function (request) {
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
    CertificateServiceImpl.prototype.getEncodedData = function (req) {
        return this.csCertificateService.getEncodedData(req);
    };
    CertificateServiceImpl.prototype.verifyCertificate = function (req) {
        return this.csCertificateService.verifyCertificate(req);
    };
    Object.defineProperty(CertificateServiceImpl.prototype, "csCertificateService", {
        get: function () {
            return this.container.get(CsInjectionTokens.CERTIFICATE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    CertificateServiceImpl.prototype.buildCertificatePersistenceId = function (request) {
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
    CertificateServiceImpl.prototype.getCertificateFromCache = function (request) {
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
    CertificateServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __param(1, inject(InjectionTokens.DB_SERVICE)),
        __param(2, inject(InjectionTokens.SDK_CONFIG)),
        __param(3, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(4, inject(InjectionTokens.KEY_VALUE_STORE)),
        __param(5, inject(InjectionTokens.FILE_SERVICE)),
        __metadata("design:paramtypes", [Container,
            DbService, Object, Object, Object, Object])
    ], CertificateServiceImpl);
    return CertificateServiceImpl;
}());
export { CertificateServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtc2VydmljZS1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NlcnRpZmljYXRlL2ltcGwvY2VydGlmaWNhdGUtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUxRCxPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFxQixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUXpFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFLOUM7SUFFSSxnQ0FBdUQsU0FBb0IsRUFDM0IsU0FBb0IsRUFDcEIsU0FBb0IsRUFDZixjQUE4QixFQUM5QixhQUE0QixFQUMvQixXQUF3QjtRQUxuQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQzNCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUMxRSxD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QztJQUFELDZCQUFDO0NBQUEsQUFyS0QsSUFxS0M7U0FyS1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGFpbmVyLCBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tIFwiaW52ZXJzaWZ5XCI7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVNlcnZpY2UsIENzTGVhcm5lckNlcnRpZmljYXRlLCBHZXRQdWJsaWNLZXlSZXF1ZXN0LCBHZXRQdWJsaWNLZXlSZXNwb25zZSB9IGZyb20gXCIuLi9kZWYvY2VydGlmaWNhdGUtc2VydmljZVwiO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgaW50ZXJ2YWwsIE9ic2VydmVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWFwLCB0YXAsICBjb25jYXRNYXAsIGRlbGF5LCBmaWx0ZXIsIG1lcmdlTWFwLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDc0luamVjdGlvblRva2VucywgSW5qZWN0aW9uVG9rZW5zIH0gZnJvbSBcIi4uLy4uL2luamVjdGlvbi10b2tlbnNcIjtcbmltcG9ydCB7IERiU2VydmljZSB9IGZyb20gXCIuLi8uLi9kYlwiO1xuaW1wb3J0IHsgR2V0UHVibGljS2V5SGFuZGxlciB9IGZyb20gXCIuLi9oYW5kbGVycy9nZXQtcHVibGljLWtleS1oYW5kbGVyXCI7XG5pbXBvcnQgeyBTZGtDb25maWcgfSBmcm9tIFwiLi4vLi4vc2RrLWNvbmZpZ1wiO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZX0gZnJvbSAnLi4vLi4vcHJvZmlsZSc7XG5pbXBvcnQge0Rvd25sb2FkQ2VydGlmaWNhdGVSZXNwb25zZX0gZnJvbSAnLi4vLi4vY291cnNlL2RlZi9kb3dubG9hZC1jZXJ0aWZpY2F0ZS1yZXNwb25zZSc7XG5pbXBvcnQge0dldENlcnRpZmljYXRlUmVxdWVzdH0gZnJvbSAnLi4vLi4vY291cnNlL2RlZi9nZXQtY2VydGlmaWNhdGUtcmVxdWVzdCc7XG5pbXBvcnQgeyBDc0NlcnRpZmljYXRlU2VydmljZSwgQ1NHZXRMZWFybmVyQ2VyaWZpY2F0ZVJlcXVlc3QsIENzVmVyaWZ5Q2VydGlmaWNhdGVSZXNwb25zZSwgQ3NMZWFybmVyQ2VydGlmaWNhdGVSZXNwb25zZSwgQ3NWZXJpZnlDZXJ0aWZpY2F0ZVJlcXVlc3QgfSBmcm9tIFwiQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY2VydGlmaWNhdGVcIjtcbmltcG9ydCB7S2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7Z3ppcH0gZnJvbSAncGFrby9kaXN0L3Bha29fZGVmbGF0ZSc7XG5pbXBvcnQge3VuZ3ppcH0gZnJvbSAncGFrby9kaXN0L3Bha29faW5mbGF0ZSc7XG5pbXBvcnQgeyBEb3dubG9hZENlcnRpZmljYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9jb3Vyc2UvZGVmL2Rvd25sb2FkLWNlcnRpZmljYXRlLXJlcXVlc3RcIjtcblxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2VydGlmaWNhdGVTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIENlcnRpZmljYXRlU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT05UQUlORVIpIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXIsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkRCX1NFUlZJQ0UpIHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgc2RrQ29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlBST0ZJTEVfU0VSVklDRSkgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLktFWV9WQUxVRV9TVE9SRSkgcHJpdmF0ZSBrZXlWYWx1ZVN0b3JlOiBLZXlWYWx1ZVN0b3JlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5GSUxFX1NFUlZJQ0UpIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2VydGlmaWNhdGVzKHJlcTogQ1NHZXRMZWFybmVyQ2VyaWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPENzTGVhcm5lckNlcnRpZmljYXRlUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3NDZXJ0aWZpY2F0ZVNlcnZpY2UuZmV0Y2hDZXJ0aWZpY2F0ZXMocmVxKTtcbiAgICB9XG4gICBcbiAgICBnZXRQdWJsaWNLZXkocmVxdWVzdDogR2V0UHVibGljS2V5UmVxdWVzdCk6IE9ic2VydmFibGU8R2V0UHVibGljS2V5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZXRQdWJsaWNLZXlIYW5kbGVyKHRoaXMuZGJTZXJ2aWNlLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5zZGtDb25maWcuY2VydGlmaWNhdGVTZXJ2aWNlQ29uZmlnLCB0aGlzLnNka0NvbmZpZy5hcGlDb25maWcpLmhhbmRsZShyZXF1ZXN0KVxuICAgIH1cblxuICAgIGdldENlcnRpZmljYXRlKHJlcXVlc3Q6IEdldENlcnRpZmljYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNzQ2VydGlmaWNhdGVTZXJ2aWNlLmdldENlcmlmaWNhdGVEb3dubG9hZFVSSSh7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkOiByZXF1ZXN0LmNlcnRpZmljYXRlLmlkZW50aWZpZXIhLFxuICAgICAgICAgICAgdHlwZTpyZXF1ZXN0LmNlcnRpZmljYXRlLnR5cGUsXG4gICAgICAgICAgICBzY2hlbWFOYW1lOiAnY2VydGlmaWNhdGUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHJlcXVlc3QuY2VydGlmaWNhdGUudGVtcGxhdGVVcmxcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIHRhcChhc3luYyAocikgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMua2V5VmFsdWVTdG9yZS5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5idWlsZENlcnRpZmljYXRlUGVyc2lzdGVuY2VJZChyZXF1ZXN0KSxcbiAgICAgICAgICAgICAgICAgICAgZ3ppcChyLnByaW50VXJpLCB7dG86ICdzdHJpbmcnfSlcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKHIpID0+IHIucHJpbnRVcmkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlZCA9IGF3YWl0IHRoaXMuZ2V0Q2VydGlmaWNhdGVGcm9tQ2FjaGUocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICBkb3dubG9hZENlcnRpZmljYXRlKHsgZmlsZU5hbWUsIGJsb2IgfTogRG93bmxvYWRDZXJ0aWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2Uud3JpdGVGaWxlKFxuICAgICAgICAgICAgICBjb3Jkb3ZhLmZpbGUuZXh0ZXJuYWxEYXRhRGlyZWN0b3J5ICxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSwgYmxvYiBhcyBhbnksXG4gICAgICAgICAgICAgICAge3JlcGxhY2U6IHRydWV9XG4gICAgICAgICAgICApLlxuICAgICAgICAgICAgdGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogYCR7Y29yZG92YS5maWxlLmV4dGVybmFsRGF0YURpcmVjdG9yeX0ke2ZpbGVOYW1lfWBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb3dubG9hZExlZ2FjeWVDZXJ0aWZpY2F0ZShyZXF1ZXN0OiBHZXRDZXJ0aWZpY2F0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPERvd25sb2FkQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvZmlsZSA9IChhd2FpdCB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkudG9Qcm9taXNlKCkpO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gYWN0aXZlUHJvZmlsZS5tYW5hZ2VkU2Vzc2lvbiA/IGFjdGl2ZVByb2ZpbGUubWFuYWdlZFNlc3Npb24udWlkIDogYWN0aXZlUHJvZmlsZS51aWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJykgPyBjb3Jkb3ZhLmZpbGUuZG9jdW1lbnRzRGlyZWN0b3J5IDogY29yZG92YS5maWxlLmV4dGVybmFsUm9vdERpcmVjdG9yeTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYCR7Zm9sZGVyUGF0aH1Eb3dubG9hZC8ke3JlcXVlc3QuY2VydGlmaWNhdGUubmFtZX1fJHtyZXF1ZXN0LmNvdXJzZUlkfV8ke3VzZXJJZH0ucGRmYDtcbiAgICAgICAgICAgIHJldHVybiB7IHVzZXJJZCB9O1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHsgdXNlcklkIH0pID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNzQ2VydGlmaWNhdGVTZXJ2aWNlLmdldExlZ2FjeUNlcmlmaWNhdGVEb3dubG9hZFVSSSh7XG4gICAgICAgICAgICAgICAgICAgIHBkZlVybDogcmVxdWVzdC5jZXJ0aWZpY2F0ZS51cmwhLFxuICAgICAgICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmVkUGRmVXJsOiByZXNwb25zZS5zaWduZWRVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCh7IHNpZ25lZFBkZlVybCwgdXNlcklkIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZFJlcXVlc3Q6IEVucXVldWVSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmk6IHNpZ25lZFBkZlVybCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QuY2VydGlmaWNhdGUudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbWltZVR5cGU6ICdhcHBsaWNhdGlvbi9wZGYnLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5Eb3dubG9hZHNVaTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uVmlzaWJpbGl0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25JbkV4dGVybmFsUHVibGljRGlyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJUeXBlOiAnRG93bmxvYWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUGF0aDogYC8ke3JlcXVlc3QuY2VydGlmaWNhdGUubmFtZX1fJHtyZXF1ZXN0LmNvdXJzZUlkfV8ke3VzZXJJZH0ucGRmYFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRNYW5hZ2VyLmVucXVldWUoZG93bmxvYWRSZXF1ZXN0LCAoZXJyLCBpZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoZG93bmxvYWRJZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVydmFsKDEwMDApXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEVucXVldWVkRW50cnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTWFuYWdlci5xdWVyeSh7IGlkczogW2Rvd25sb2FkSWRdIH0sIChlcnIsIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgfHwgKGVudHJpZXNbMF0uc3RhdHVzID09PSBEb3dubG9hZFN0YXR1cy5TVEFUVVNfRkFJTEVEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIgfHwgbmV3IEVycm9yKCdVbmtub3duIEVycm9yJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIubmV4dChlbnRyaWVzWzBdISBhcyBFbnF1ZXVlZEVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZW50cnk6IEVucXVldWVkRW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gRG93bmxvYWRTdGF0dXMuU1RBVFVTX1NVQ0NFU1NGVUwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGVudHJ5KSA9PiAoeyBwYXRoOiBlbnRyeS5sb2NhbFVyaSB9KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpc0NlcnRpZmljYXRlQ2FjaGVkKHJlcXVlc3Q6IEdldENlcnRpZmljYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5nZXRDZXJ0aWZpY2F0ZUZyb21DYWNoZShyZXF1ZXN0KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEVuY29kZWREYXRhKHJlcSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNzQ2VydGlmaWNhdGVTZXJ2aWNlLmdldEVuY29kZWREYXRhKHJlcSlcbiAgICB9XG5cbiAgICB2ZXJpZnlDZXJ0aWZpY2F0ZShyZXE6IENzVmVyaWZ5Q2VydGlmaWNhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxDc1ZlcmlmeUNlcnRpZmljYXRlUmVzcG9uc2U+e1xuICAgICAgICByZXR1cm4gdGhpcy5jc0NlcnRpZmljYXRlU2VydmljZS52ZXJpZnlDZXJ0aWZpY2F0ZShyZXEpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY3NDZXJ0aWZpY2F0ZVNlcnZpY2UoKTogQ3NDZXJ0aWZpY2F0ZVNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0KENzSW5qZWN0aW9uVG9rZW5zLkNFUlRJRklDQVRFX1NFUlZJQ0UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgYnVpbGRDZXJ0aWZpY2F0ZVBlcnNpc3RlbmNlSWQocmVxdWVzdDogR2V0Q2VydGlmaWNhdGVSZXF1ZXN0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS50b1Byb21pc2UoKTtcbiAgICAgICAgY29uc3QgdXNlcklkID0gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbiA/IHNlc3Npb24ubWFuYWdlZFNlc3Npb24udWlkIDogc2Vzc2lvbi51aWQ7XG4gICAgICAgIHJldHVybiBgY2VydGlmaWNhdGVfJHtyZXF1ZXN0LmNlcnRpZmljYXRlLmlkZW50aWZpZXJ9XyR7cmVxdWVzdC5jb3Vyc2VJZH1fJHt1c2VySWR9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldENlcnRpZmljYXRlRnJvbUNhY2hlKHJlcXVlc3Q6IEdldENlcnRpZmljYXRlUmVxdWVzdCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5idWlsZENlcnRpZmljYXRlUGVyc2lzdGVuY2VJZChyZXF1ZXN0KSxcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gdW5nemlwKHZhbHVlLCB7dG86ICdzdHJpbmcnfSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG59Il19