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
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { CodePushExperiment } from '../../preference-keys';
import { tap } from 'rxjs/operators';
var CodePUshExperimentServiceImpl = /** @class */ (function () {
    function CodePUshExperimentServiceImpl(sharedPreferences) {
        this.sharedPreferences = sharedPreferences;
    }
    CodePUshExperimentServiceImpl.prototype.setDefaultDeploymentKey = function (deploymentKey) {
        return this.sharedPreferences.putString(CodePushExperiment.DEFAULT_DEPLOYMENT_KEY, deploymentKey);
    };
    CodePUshExperimentServiceImpl.prototype.getDefaultDeploymentKey = function () {
        return this.sharedPreferences.getString(CodePushExperiment.DEFAULT_DEPLOYMENT_KEY);
    };
    CodePUshExperimentServiceImpl.prototype.setExperimentKey = function (experimentKey) {
        var _this = this;
        return this.sharedPreferences.putString(CodePushExperiment.EXPERIMENT_KEY, experimentKey).pipe(tap(function () {
            if (!_this.experimentKey) {
                _this.experimentKey = experimentKey;
            }
        }));
    };
    CodePUshExperimentServiceImpl.prototype.getExperimentKey = function () {
        var _this = this;
        if (!this.experimentKey) {
            return this.sharedPreferences.getString(CodePushExperiment.EXPERIMENT_KEY).pipe(tap(function (key) {
                _this.experimentKey = key;
                return key;
            }));
        }
        else {
            return this.experimentKey;
        }
    };
    CodePUshExperimentServiceImpl.prototype.setExperimentAppVersion = function (appVersion) {
        return this.sharedPreferences.putString(CodePushExperiment.EXPERIMENT_APP_VERSION, appVersion);
    };
    CodePUshExperimentServiceImpl.prototype.getExperimentAppVersion = function () {
        return this.sharedPreferences.getString(CodePushExperiment.EXPERIMENT_APP_VERSION);
    };
    CodePUshExperimentServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Object])
    ], CodePUshExperimentServiceImpl);
    return CodePUshExperimentServiceImpl;
}());
export { CodePUshExperimentServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZXB1c2gtZXhwZXJpbWVudC1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29kZXB1c2gtZXhwZXJpbWVudC9pbXBsL2NvZGVwdXNoLWV4cGVyaW1lbnQtc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckM7SUFHSSx1Q0FDd0QsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDekYsQ0FBQztJQUVKLCtEQUF1QixHQUF2QixVQUF3QixhQUFxQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQUVELCtEQUF1QixHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCx3REFBZ0IsR0FBaEIsVUFBaUIsYUFBcUI7UUFBdEMsaUJBUUM7UUFQRyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDMUYsR0FBRyxDQUFDO1lBQ0EsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCx3REFBZ0IsR0FBaEI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQzNFLEdBQUcsQ0FBQyxVQUFBLEdBQUc7Z0JBQ0gsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7Z0JBQ3pCLE9BQU8sR0FBRyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQ0wsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQsK0RBQXVCLEdBQXZCLFVBQXdCLFVBQWtCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQsK0RBQXVCLEdBQXZCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdkYsQ0FBQztJQTVDUSw2QkFBNkI7UUFEekMsVUFBVSxFQUFFO1FBS0osV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7O09BSnRDLDZCQUE2QixDQStDekM7SUFBRCxvQ0FBQztDQUFBLEFBL0NELElBK0NDO1NBL0NZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvZGVQdXNoRXhwZXJpbWVudFNlcnZpY2UgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NoYXJlZFByZWZlcmVuY2VzfSBmcm9tICcuLi8uLi91dGlsL3NoYXJlZC1wcmVmZXJlbmNlcyc7XG5pbXBvcnQgeyBpbmplY3QsIGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW5zIH0gZnJvbSAnLi4vLi4vaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQgeyBDb2RlUHVzaEV4cGVyaW1lbnQgfSBmcm9tICcuLi8uLi9wcmVmZXJlbmNlLWtleXMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29kZVBVc2hFeHBlcmltZW50U2VydmljZUltcGwgaW1wbGVtZW50cyBDb2RlUHVzaEV4cGVyaW1lbnRTZXJ2aWNlIHtcbiAgICBleHBlcmltZW50S2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0hBUkVEX1BSRUZFUkVOQ0VTKSBwcml2YXRlIHNoYXJlZFByZWZlcmVuY2VzOiBTaGFyZWRQcmVmZXJlbmNlc1xuICAgICkge31cblxuICAgIHNldERlZmF1bHREZXBsb3ltZW50S2V5KGRlcGxveW1lbnRLZXk6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQ29kZVB1c2hFeHBlcmltZW50LkRFRkFVTFRfREVQTE9ZTUVOVF9LRVksIGRlcGxveW1lbnRLZXkpO1xuICAgIH1cblxuICAgIGdldERlZmF1bHREZXBsb3ltZW50S2V5KCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhDb2RlUHVzaEV4cGVyaW1lbnQuREVGQVVMVF9ERVBMT1lNRU5UX0tFWSk7XG4gICAgfVxuXG4gICAgc2V0RXhwZXJpbWVudEtleShleHBlcmltZW50S2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKENvZGVQdXNoRXhwZXJpbWVudC5FWFBFUklNRU5UX0tFWSwgZXhwZXJpbWVudEtleSkucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV4cGVyaW1lbnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlcmltZW50S2V5ID0gZXhwZXJpbWVudEtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEV4cGVyaW1lbnRLZXkoKTogc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLmV4cGVyaW1lbnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhDb2RlUHVzaEV4cGVyaW1lbnQuRVhQRVJJTUVOVF9LRVkpLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpbWVudEtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGVyaW1lbnRLZXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRFeHBlcmltZW50QXBwVmVyc2lvbihhcHBWZXJzaW9uOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKENvZGVQdXNoRXhwZXJpbWVudC5FWFBFUklNRU5UX0FQUF9WRVJTSU9OLCBhcHBWZXJzaW9uKTtcbiAgICB9XG5cbiAgICBnZXRFeHBlcmltZW50QXBwVmVyc2lvbigpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5nZXRTdHJpbmcoQ29kZVB1c2hFeHBlcmltZW50LkVYUEVSSU1FTlRfQVBQX1ZFUlNJT04pO1xuICAgIH1cblxuXG59XG4iXX0=