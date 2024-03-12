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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Actor, Context, ProducerData } from '..';
import { UniqueId } from '../../db/util/unique-id';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
var TelemetryDecoratorImpl = /** @class */ (function () {
    function TelemetryDecoratorImpl(sdkConfig, deviceInfo, appInfo, codePushExperimentService) {
        this.sdkConfig = sdkConfig;
        this.deviceInfo = deviceInfo;
        this.appInfo = appInfo;
        this.codePushExperimentService = codePushExperimentService;
        this.apiConfig = this.sdkConfig.apiConfig;
    }
    TelemetryDecoratorImpl.prototype.decorate = function (event, profileSession, gid, offset, channelId, campaignParameters, globalCData) {
        if (offset === void 0) { offset = 0; }
        var uid = profileSession.uid, sid = profileSession.sid;
        event.ets += offset;
        if (!event.mid) {
            event.mid = UniqueId.generateUniqueId();
        }
        if (uid) {
            this.patchActor(event, uid);
        }
        else {
            this.patchActor(event, '');
        }
        this.patchContext(event, sid, channelId, campaignParameters, globalCData);
        // TODO Add tag patching logic
        event.context.cdata = __spreadArrays(event.context.cdata, [
            {
                id: profileSession.managedSession ? profileSession.managedSession.sid : profileSession.sid,
                type: 'UserSession'
            }
        ]);
        return event;
    };
    TelemetryDecoratorImpl.prototype.patchActor = function (event, uid) {
        if (!event.actor) {
            event.actor = new Actor();
        }
        var actor = event.actor;
        if (!actor.id) {
            actor.id = uid;
        }
        if (!actor.type) {
            actor.type = Actor.TYPE_USER;
        }
    };
    TelemetryDecoratorImpl.prototype.patchContext = function (event, sid, channelId, campaignParameters, globalCdata) {
        if (!event.context) {
            event.context = new Context();
        }
        event.context = this.buildContext(sid, channelId, event.context, campaignParameters, globalCdata);
    };
    TelemetryDecoratorImpl.prototype.patchPData = function (event) {
        if (!event.pdata) {
            event.pdata = new ProducerData();
        }
        var pData = event.pdata;
        if (!pData.id) {
            pData.id = this.apiConfig.api_authentication.producerId;
        }
        var pid = pData.pid;
        if (pid) {
            pData.pid = pid;
        }
        else if (this.apiConfig.api_authentication.producerUniqueId) {
            pData.pid = this.apiConfig.api_authentication.producerUniqueId;
        }
        else {
            pData.pid = 'sunbird.android';
        }
        if (!pData.ver) {
            pData.ver = this.appInfo.getVersionName();
        }
    };
    TelemetryDecoratorImpl.prototype.prepare = function (event, priority) {
        return {
            event: JSON.stringify(event),
            event_type: event.eid,
            timestamp: Date.now(),
            priority: 1
        };
    };
    TelemetryDecoratorImpl.prototype.buildContext = function (sid, channelId, context, campaignParameters, globalCData) {
        context.channel = channelId;
        this.patchPData(context);
        if (!context.env) {
            context.env = 'app';
        }
        var expKey = this.codePushExperimentService.getExperimentKey();
        if (typeof (expKey) === 'string') {
            context.pdata.pid = context.pdata.pid + '-' + expKey;
        }
        context.sid = sid;
        context.did = this.deviceInfo.getDeviceID();
        if (channelId !== this.apiConfig.api_authentication.channelId) {
            context.rollup = { l1: channelId };
        }
        // patching cData
        context.cdata = context.cdata ? context.cdata.concat(campaignParameters || []) : (campaignParameters || []);
        context.cdata = context.cdata ? context.cdata.concat(globalCData || []) : (globalCData || []);
        return context;
    };
    TelemetryDecoratorImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.SDK_CONFIG)),
        __param(1, inject(InjectionTokens.DEVICE_INFO)),
        __param(2, inject(InjectionTokens.APP_INFO)),
        __param(3, inject(InjectionTokens.CODEPUSH_EXPERIMENT_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], TelemetryDecoratorImpl);
    return TelemetryDecoratorImpl;
}());
export { TelemetryDecoratorImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVsZW1ldHJ5L2ltcGwvZGVjb3JhdG9yLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFtQixZQUFZLEVBQXVDLE1BQU0sSUFBSSxDQUFDO0FBSXZHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFPdkQ7SUFHSSxnQ0FDZ0QsU0FBb0IsRUFDbkIsVUFBc0IsRUFDekIsT0FBZ0IsRUFDRyx5QkFBb0Q7UUFIckUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDRyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ2pILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVELHlDQUFRLEdBQVIsVUFDSSxLQUFnQixFQUNoQixjQUE4QixFQUM5QixHQUFZLEVBQ1osTUFBa0IsRUFDbEIsU0FBa0IsRUFDbEIsa0JBQXNDLEVBQ3RDLFdBQStCO1FBSC9CLHVCQUFBLEVBQUEsVUFBa0I7UUFLWCxJQUFBLEdBQUcsR0FBUyxjQUFjLElBQXZCLEVBQUUsR0FBRyxHQUFJLGNBQWMsSUFBbEIsQ0FBbUI7UUFDbEMsS0FBSyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDWixLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFD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QWtCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUcsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUE5R1Esc0JBQXNCO1FBRGxDLFVBQVUsRUFBRTtRQUtKLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBOztPQVAvQyxzQkFBc0IsQ0ErR2xDO0lBQUQsNkJBQUM7Q0FBQSxBQS9HRCxJQStHQztTQS9HWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FjdG9yLCBDb250ZXh0LCBDb3JyZWxhdGlvbkRhdGEsIFByb2R1Y2VyRGF0YSwgU3VuYmlyZFRlbGVtZXRyeSwgVGVsZW1ldHJ5RGVjb3JhdG9yfSBmcm9tICcuLic7XG5pbXBvcnQge0FwaUNvbmZpZ30gZnJvbSAnLi4vLi4vYXBpJztcbmltcG9ydCB7RGV2aWNlSW5mb30gZnJvbSAnLi4vLi4vdXRpbC9kZXZpY2UnO1xuaW1wb3J0IHtBcHBJbmZvfSBmcm9tICcuLi8uLi91dGlsL2FwcCc7XG5pbXBvcnQge1VuaXF1ZUlkfSBmcm9tICcuLi8uLi9kYi91dGlsL3VuaXF1ZS1pZCc7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7U2RrQ29uZmlnfSBmcm9tICcuLi8uLi9zZGstY29uZmlnJztcbmltcG9ydCB7Q29kZVB1c2hFeHBlcmltZW50U2VydmljZX0gZnJvbSAnLi4vLi4vY29kZXB1c2gtZXhwZXJpbWVudCc7XG5pbXBvcnQge1Byb2ZpbGVTZXNzaW9ufSBmcm9tICcuLi8uLi9wcm9maWxlJztcbmltcG9ydCBUZWxlbWV0cnkgPSBTdW5iaXJkVGVsZW1ldHJ5LlRlbGVtZXRyeTtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlbGVtZXRyeURlY29yYXRvckltcGwgaW1wbGVtZW50cyBUZWxlbWV0cnlEZWNvcmF0b3Ige1xuICAgIHByaXZhdGUgYXBpQ29uZmlnOiBBcGlDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuU0RLX0NPTkZJRykgcHJpdmF0ZSBzZGtDb25maWc6IFNka0NvbmZpZyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREVWSUNFX0lORk8pIHByaXZhdGUgZGV2aWNlSW5mbzogRGV2aWNlSW5mbyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQVBQX0lORk8pIHByaXZhdGUgYXBwSW5mbzogQXBwSW5mbyxcbiAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuQ09ERVBVU0hfRVhQRVJJTUVOVF9TRVJWSUNFKSBwcml2YXRlIGNvZGVQdXNoRXhwZXJpbWVudFNlcnZpY2U6IENvZGVQdXNoRXhwZXJpbWVudFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hcGlDb25maWcgPSB0aGlzLnNka0NvbmZpZy5hcGlDb25maWc7XG4gICAgfVxuXG4gICAgZGVjb3JhdGUoXG4gICAgICAgIGV2ZW50OiBUZWxlbWV0cnksXG4gICAgICAgIHByb2ZpbGVTZXNzaW9uOiBQcm9maWxlU2Vzc2lvbixcbiAgICAgICAgZ2lkPzogc3RyaW5nLFxuICAgICAgICBvZmZzZXQ6IG51bWJlciA9IDAsXG4gICAgICAgIGNoYW5uZWxJZD86IHN0cmluZyxcbiAgICAgICAgY2FtcGFpZ25QYXJhbWV0ZXJzPzogQ29ycmVsYXRpb25EYXRhW10sXG4gICAgICAgIGdsb2JhbENEYXRhPzogQ29ycmVsYXRpb25EYXRhW11cbiAgICApOiBhbnkge1xuICAgICAgICBjb25zdCB7dWlkLCBzaWR9ID0gcHJvZmlsZVNlc3Npb247XG4gICAgICAgIGV2ZW50LmV0cyArPSBvZmZzZXQ7XG4gICAgICAgIGlmICghZXZlbnQubWlkKSB7XG4gICAgICAgICAgICBldmVudC5taWQgPSBVbmlxdWVJZC5nZW5lcmF0ZVVuaXF1ZUlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVpZCkge1xuICAgICAgICAgICAgdGhpcy5wYXRjaEFjdG9yKGV2ZW50LCB1aWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXRjaEFjdG9yKGV2ZW50LCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaENvbnRleHQoZXZlbnQsIHNpZCwgY2hhbm5lbElkLCBjYW1wYWlnblBhcmFtZXRlcnMsIGdsb2JhbENEYXRhKTtcbiAgICAgICAgLy8gVE9ETyBBZGQgdGFnIHBhdGNoaW5nIGxvZ2ljXG4gICAgICAgIGV2ZW50LmNvbnRleHQuY2RhdGEgPSBbXG4gICAgICAgICAgICAuLi5ldmVudC5jb250ZXh0LmNkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWQ6IHByb2ZpbGVTZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gcHJvZmlsZVNlc3Npb24ubWFuYWdlZFNlc3Npb24uc2lkIDogcHJvZmlsZVNlc3Npb24uc2lkLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdVc2VyU2Vzc2lvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgcGF0Y2hBY3RvcihldmVudDogVGVsZW1ldHJ5LCB1aWQ6IHN0cmluZykge1xuICAgICAgICBpZiAoIWV2ZW50LmFjdG9yKSB7XG4gICAgICAgICAgICBldmVudC5hY3RvciA9IG5ldyBBY3RvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdG9yOiBBY3RvciA9IGV2ZW50LmFjdG9yO1xuICAgICAgICBpZiAoIWFjdG9yLmlkKSB7XG4gICAgICAgICAgICBhY3Rvci5pZCA9IHVpZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjdG9yLnR5cGUpIHtcbiAgICAgICAgICAgIGFjdG9yLnR5cGUgPSBBY3Rvci5UWVBFX1VTRVI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhdGNoQ29udGV4dChldmVudDogVGVsZW1ldHJ5LCBzaWQsIGNoYW5uZWxJZCwgY2FtcGFpZ25QYXJhbWV0ZXJzPzogQ29ycmVsYXRpb25EYXRhW10sIGdsb2JhbENkYXRhPzogQ29ycmVsYXRpb25EYXRhW10pIHtcbiAgICAgICAgaWYgKCFldmVudC5jb250ZXh0KSB7XG4gICAgICAgICAgICBldmVudC5jb250ZXh0ID0gbmV3IENvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5jb250ZXh0ID0gdGhpcy5idWlsZENvbnRleHQoc2lkLCBjaGFubmVsSWQsIGV2ZW50LmNvbnRleHQsIGNhbXBhaWduUGFyYW1ldGVycywgZ2xvYmFsQ2RhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGF0Y2hQRGF0YShldmVudDogQ29udGV4dCkge1xuICAgICAgICBpZiAoIWV2ZW50LnBkYXRhKSB7XG4gICAgICAgICAgICBldmVudC5wZGF0YSA9IG5ldyBQcm9kdWNlckRhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwRGF0YTogUHJvZHVjZXJEYXRhID0gZXZlbnQucGRhdGE7XG4gICAgICAgIGlmICghcERhdGEuaWQpIHtcbiAgICAgICAgICAgIHBEYXRhLmlkID0gdGhpcy5hcGlDb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLnByb2R1Y2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGlkID0gcERhdGEucGlkO1xuICAgICAgICBpZiAocGlkKSB7XG4gICAgICAgICAgICBwRGF0YS5waWQgPSBwaWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hcGlDb25maWcuYXBpX2F1dGhlbnRpY2F0aW9uLnByb2R1Y2VyVW5pcXVlSWQpIHtcbiAgICAgICAgICAgIHBEYXRhLnBpZCA9IHRoaXMuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5wcm9kdWNlclVuaXF1ZUlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcERhdGEucGlkID0gJ3N1bmJpcmQuYW5kcm9pZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwRGF0YS52ZXIpIHtcbiAgICAgICAgICAgIHBEYXRhLnZlciA9IHRoaXMuYXBwSW5mby5nZXRWZXJzaW9uTmFtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlcGFyZShldmVudDogVGVsZW1ldHJ5LCBwcmlvcml0eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXZlbnQ6IEpTT04uc3RyaW5naWZ5KGV2ZW50KSxcbiAgICAgICAgICAgIGV2ZW50X3R5cGU6IGV2ZW50LmVpZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHByaW9yaXR5OiAxXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYnVpbGRDb250ZXh0KHNpZDogc3RyaW5nLCBjaGFubmVsSWQ6IHN0cmluZywgY29udGV4dDogQ29udGV4dCwgY2FtcGFpZ25QYXJhbWV0ZXJzPzogQ29ycmVsYXRpb25EYXRhW10sIGdsb2JhbENEYXRhPzogQ29ycmVsYXRpb25EYXRhW10pOiBDb250ZXh0IHtcbiAgICAgICAgY29udGV4dC5jaGFubmVsID0gY2hhbm5lbElkO1xuICAgICAgICB0aGlzLnBhdGNoUERhdGEoY29udGV4dCk7XG4gICAgICAgIGlmICghY29udGV4dC5lbnYpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZW52ID0gJ2FwcCc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXhwS2V5ID0gdGhpcy5jb2RlUHVzaEV4cGVyaW1lbnRTZXJ2aWNlLmdldEV4cGVyaW1lbnRLZXkoKTtcbiAgICAgICAgaWYgKHR5cGVvZiAoZXhwS2V5KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRleHQucGRhdGEucGlkID0gY29udGV4dC5wZGF0YS5waWQgKyAnLScgKyBleHBLZXk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zaWQgPSBzaWQ7XG4gICAgICAgIGNvbnRleHQuZGlkID0gdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCk7XG4gICAgICAgIGlmIChjaGFubmVsSWQgIT09IHRoaXMuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5jaGFubmVsSWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQucm9sbHVwID0ge2wxOiBjaGFubmVsSWR9O1xuICAgICAgICB9XG4gICAgICAgIC8vIHBhdGNoaW5nIGNEYXRhXG4gICAgICAgIGNvbnRleHQuY2RhdGEgPSBjb250ZXh0LmNkYXRhID8gY29udGV4dC5jZGF0YS5jb25jYXQoY2FtcGFpZ25QYXJhbWV0ZXJzIHx8IFtdKSA6IChjYW1wYWlnblBhcmFtZXRlcnMgfHwgW10pO1xuICAgICAgICBjb250ZXh0LmNkYXRhID0gY29udGV4dC5jZGF0YSA/IGNvbnRleHQuY2RhdGEuY29uY2F0KGdsb2JhbENEYXRhIHx8IFtdKSA6IChnbG9iYWxDRGF0YSB8fCBbXSk7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cbiJdfQ==