import { of } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';
import { CsInjectionTokens } from '../../injection-tokens';
import { CertificatePublicKeyEntry } from '../db/schema';
var GetPublicKeyHandler = /** @class */ (function () {
    function GetPublicKeyHandler(dbService, container, certificateServiceConfig, apiConfig) {
        this.dbService = dbService;
        this.container = container;
        this.certificateServiceConfig = certificateServiceConfig;
        this.apiConfig = apiConfig;
    }
    Object.defineProperty(GetPublicKeyHandler.prototype, "csCertificateService", {
        get: function () {
            return this.container.get(CsInjectionTokens.CERTIFICATE_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    GetPublicKeyHandler.prototype.handle = function (request) {
        var _this = this;
        return this.dbService.read({
            table: CertificatePublicKeyEntry.TABLE_NAME,
            selection: CertificatePublicKeyEntry.COLUMN_NAME_IDENTIFIER + "= ?",
            selectionArgs: [request.osid.toString()]
        }).pipe(mergeMap(function (publicKeyInDb) {
            if (publicKeyInDb && publicKeyInDb.length) {
                if (publicKeyInDb[0].expiry_time < Date.now()) {
                    return _this.fetchFromServer(request).pipe(mergeMap(function (response) {
                        return _this.updatePublicKey(response);
                    }));
                }
                else {
                    return of({
                        osid: publicKeyInDb[0].identifier,
                        value: publicKeyInDb[0].public_key,
                        alg: publicKeyInDb[0].alg,
                        osOwner: publicKeyInDb[0].owner ? publicKeyInDb[0].owner.split(',') : []
                    });
                }
            }
            else {
                return _this.fetchFromServer(request).pipe(mergeMap(function (response) {
                    return _this.insertPublicKey(response);
                }));
            }
        }));
    };
    GetPublicKeyHandler.prototype.updatePublicKey = function (response) {
        return this.dbService.update({
            table: CertificatePublicKeyEntry.TABLE_NAME,
            selection: CertificatePublicKeyEntry.COLUMN_NAME_IDENTIFIER + " = ?",
            selectionArgs: [response.osid],
            modelJson: {
                identifier: response.osid,
                public_key: response.value,
                alg: response.alg,
                owner: response.osOwner && response.osOwner.length ? response.osOwner.join(',') : '',
                expiry_time: Date.now() + this.apiConfig.cached_requests.timeToLive
            }
        }).pipe(mapTo(response));
    };
    GetPublicKeyHandler.prototype.insertPublicKey = function (response) {
        return this.dbService.insert({
            table: CertificatePublicKeyEntry.TABLE_NAME,
            modelJson: {
                identifier: response.osid,
                public_key: response.value,
                alg: response.alg,
                owner: response.osOwner && response.osOwner.length ? response.osOwner.join(',') : '',
                expiry_time: Date.now() + this.apiConfig.cached_requests.timeToLive
            }
        }).pipe(mapTo(response));
    };
    GetPublicKeyHandler.prototype.fetchFromServer = function (request) {
        return this.csCertificateService.getPublicKey(request);
    };
    return GetPublicKeyHandler;
}());
export { GetPublicKeyHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXB1YmxpYy1rZXktaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jZXJ0aWZpY2F0ZS9oYW5kbGVycy9nZXQtcHVibGljLWtleS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUszRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHekQ7SUFFSSw2QkFDWSxTQUFvQixFQUNwQixTQUFvQixFQUNwQix3QkFBa0QsRUFDbEQsU0FBb0I7UUFIcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUVoQyxDQUFDO0lBRUQsc0JBQVkscURBQW9CO2FBQWhDO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBRUQsb0NBQU0sR0FBTixVQUFPLE9BQTRCO1FBQW5DLGlCQWdDQztRQS9CRyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSx5QkFBeUIsQ0FBQyxVQUFVO1lBQzNDLFNBQVMsRUFBSyx5QkFBeUIsQ0FBQyxzQkFBc0IsUUFBSztZQUNuRSxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNDLENBQUMsQ0FBQyxJQUFJLENBQ0gsUUFBUSxDQUFDLFVBQUMsYUFBb0Q7WUFDMUQsSUFB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VTthQUN0RTtTQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNsQixDQUFBO0lBQ0wsQ0FBQztJQUVPLDZDQUFlLEdBQXZCLFVBQXdCLE9BQTRCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUwsMEJBQUM7QUFBRCxDQUFDLEFBcEZELElBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpQ29uZmlnIH0gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXBUbywgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDc0luamVjdGlvblRva2VucyB9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7IENzQ2VydGlmaWNhdGVTZXJ2aWNlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY2VydGlmaWNhdGUnO1xuaW1wb3J0IHsgR2V0UHVibGljS2V5UmVxdWVzdCwgR2V0UHVibGljS2V5UmVzcG9uc2UgfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jZXJ0aWZpY2F0ZSc7XG5pbXBvcnQgeyBEYlNlcnZpY2UgfSBmcm9tICdzcmMnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGVQdWJsaWNLZXlFbnRyeSB9IGZyb20gJy4uL2RiL3NjaGVtYSc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVNlcnZpY2VDb25maWcgfSBmcm9tICcuLi9jb25maWcvY2VydGlmaWNhdGUtc2VydmljZS1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgR2V0UHVibGljS2V5SGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IENvbnRhaW5lcixcbiAgICAgICAgcHJpdmF0ZSBjZXJ0aWZpY2F0ZVNlcnZpY2VDb25maWc6IENlcnRpZmljYXRlU2VydmljZUNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhcGlDb25maWc6IEFwaUNvbmZpZ1xuICAgICkge1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGNzQ2VydGlmaWNhdGVTZXJ2aWNlKCk6IENzQ2VydGlmaWNhdGVTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldChDc0luamVjdGlvblRva2Vucy5DRVJUSUZJQ0FURV9TRVJWSUNFKTtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxdWVzdDogR2V0UHVibGljS2V5UmVxdWVzdCk6IE9ic2VydmFibGU8R2V0UHVibGljS2V5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IENlcnRpZmljYXRlUHVibGljS2V5RW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Q2VydGlmaWNhdGVQdWJsaWNLZXlFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSfT0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcmVxdWVzdC5vc2lkLnRvU3RyaW5nKCldXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgocHVibGljS2V5SW5EYjogQ2VydGlmaWNhdGVQdWJsaWNLZXlFbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwdWJsaWNLZXlJbkRiICYmIHB1YmxpY0tleUluRGIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwdWJsaWNLZXlJbkRiWzBdLmV4cGlyeV90aW1lIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tU2VydmVyKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc3BvbnNlOiBHZXRQdWJsaWNLZXlSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVQdWJsaWNLZXkocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvc2lkOiBwdWJsaWNLZXlJbkRiWzBdLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHB1YmxpY0tleUluRGJbMF0ucHVibGljX2tleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGc6IHB1YmxpY0tleUluRGJbMF0uYWxnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9zT3duZXI6IHB1YmxpY0tleUluRGJbMF0ub3duZXIgPyBwdWJsaWNLZXlJbkRiWzBdLm93bmVyLnNwbGl0KCcsJykgOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbVNlcnZlcihyZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHJlc3BvbnNlOiBHZXRQdWJsaWNLZXlSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc2VydFB1YmxpY0tleShyZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUHVibGljS2V5KHJlc3BvbnNlOiBHZXRQdWJsaWNLZXlSZXNwb25zZSk6IE9ic2VydmFibGU8R2V0UHVibGljS2V5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICB0YWJsZTogQ2VydGlmaWNhdGVQdWJsaWNLZXlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtDZXJ0aWZpY2F0ZVB1YmxpY0tleUVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJ9ID0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbcmVzcG9uc2Uub3NpZF0sXG4gICAgICAgICAgICBtb2RlbEpzb246IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiByZXNwb25zZS5vc2lkLFxuICAgICAgICAgICAgICAgIHB1YmxpY19rZXk6IHJlc3BvbnNlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGFsZzogcmVzcG9uc2UuYWxnLFxuICAgICAgICAgICAgICAgIG93bmVyOiByZXNwb25zZS5vc093bmVyICYmIHJlc3BvbnNlLm9zT3duZXIubGVuZ3RoID8gcmVzcG9uc2Uub3NPd25lci5qb2luKCcsJykgOiAnJyxcbiAgICAgICAgICAgICAgICBleHBpcnlfdGltZTogRGF0ZS5ub3coKSArIHRoaXMuYXBpQ29uZmlnLmNhY2hlZF9yZXF1ZXN0cy50aW1lVG9MaXZlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXBUbyhyZXNwb25zZSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5zZXJ0UHVibGljS2V5KHJlc3BvbnNlOiBHZXRQdWJsaWNLZXlSZXNwb25zZSk6IE9ic2VydmFibGU8R2V0UHVibGljS2V5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICB0YWJsZTogQ2VydGlmaWNhdGVQdWJsaWNLZXlFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgbW9kZWxKc29uOiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogcmVzcG9uc2Uub3NpZCxcbiAgICAgICAgICAgICAgICBwdWJsaWNfa2V5OiByZXNwb25zZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBhbGc6IHJlc3BvbnNlLmFsZyxcbiAgICAgICAgICAgICAgICBvd25lcjogcmVzcG9uc2Uub3NPd25lciAmJiByZXNwb25zZS5vc093bmVyLmxlbmd0aCA/IHJlc3BvbnNlLm9zT3duZXIuam9pbignLCcpIDogJycsXG4gICAgICAgICAgICAgICAgZXhwaXJ5X3RpbWU6IERhdGUubm93KCkgKyB0aGlzLmFwaUNvbmZpZy5jYWNoZWRfcmVxdWVzdHMudGltZVRvTGl2ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwVG8ocmVzcG9uc2UpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRnJvbVNlcnZlcihyZXF1ZXN0OiBHZXRQdWJsaWNLZXlSZXF1ZXN0KTogT2JzZXJ2YWJsZTxHZXRQdWJsaWNLZXlSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jc0NlcnRpZmljYXRlU2VydmljZS5nZXRQdWJsaWNLZXkocmVxdWVzdCk7XG4gICAgfVxuXG59XG4iXX0=