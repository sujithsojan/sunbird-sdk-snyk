var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Actor, ProducerData } from '../../telemetry';
import { ContentUtil } from '../../content/util/content-util';
import { inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DbService } from '../../db';
import { PlayerConfigEntry, PlayerDbEntryMapper } from '../db/schema';
var PlayerServiceImpl = /** @class */ (function () {
    function PlayerServiceImpl(profileService, groupService, config, frameworkService, deviceInfo, appInfo, dbService) {
        this.profileService = profileService;
        this.groupService = groupService;
        this.config = config;
        this.frameworkService = frameworkService;
        this.deviceInfo = deviceInfo;
        this.appInfo = appInfo;
        this.dbService = dbService;
    }
    PlayerServiceImpl.prototype.getPlayerConfig = function (content, extraInfo) {
        var _this = this;
        var context = {};
        context.did = this.deviceInfo.getDeviceID();
        context.origin = this.config.apiConfig.host;
        var pData = new ProducerData();
        pData.id = this.config.apiConfig.api_authentication.producerId;
        pData.pid = this.config.apiConfig.api_authentication.producerUniqueId;
        pData.ver = this.appInfo.getVersionName();
        context.pdata = pData;
        var playerInput = {};
        content.rollup = ContentUtil.getRollup(content.identifier, content.hierarchyInfo);
        context.objectRollup = content.rollup;
        if (window.device.platform.toLowerCase() === 'ios') {
            content.basePath = (content.basePath || (content.basePath = '')).replace(/\/$/, '');
        }
        else {
            content.basePath = content.basePath.replace(/\/$/, '');
        }
        if (content.isAvailableLocally) {
            content.contentData.streamingUrl = content.basePath;
            content.contentData.previewUrl = content.basePath;
        }
        playerInput.metadata = content;
        playerInput.config = this.config.playerConfig;
        return this.profileService.getActiveProfileSession().pipe(mergeMap(function (session) {
            context.sid = session ? session.sid : '';
            var actor = new Actor();
            actor.id = session ? session.uid : '';
            context.actor = actor;
            var deeplinkBasePath = _this.config.appConfig.deepLinkBasePath;
            context.deeplinkBasePath = deeplinkBasePath ? deeplinkBasePath : '';
            var parentId = (content.rollup && content.rollup.l1) ? content.rollup.l1 : content.identifier;
            _this.fetchPlayerState(actor.id, parentId, content.identifier).then(function (result) {
                if (result && playerInput.config) {
                    playerInput.config = __assign(__assign({}, playerInput.config), JSON.parse(result.saveState));
                }
            });
            return _this.profileService.getActiveSessionProfile({ requiredFields: [] });
        }), mergeMap(function (profile) {
            if (profile && profile.serverProfile) {
                var organisations = profile.serverProfile['organisations'];
                if (organisations) {
                    var orgId = organisations[0] && organisations[0]['organisationId'];
                    context.contextRollup = { l1: orgId };
                }
            }
            if (profile && profile.profileType) {
                extraInfo['correlationData'] = (extraInfo['correlationData'] || []).concat([
                    { id: profile.profileType, type: 'UserType' }
                ]);
            }
            return _this.groupService.getActiveGroupSession();
        }), mergeMap(function (groupSession) {
            var corRelationList = [];
            if (groupSession && groupSession.gid) {
                corRelationList.push({ id: groupSession.gid, type: 'group' });
            }
            var isStreaming = extraInfo && extraInfo.hasOwnProperty('streaming');
            var appCorrelationData = extraInfo['correlationData'];
            if (appCorrelationData && appCorrelationData.length) {
                corRelationList = corRelationList.concat(appCorrelationData);
            }
            corRelationList.push({ id: isStreaming ? 'streaming' : 'offline', type: 'PlayerLaunch' });
            context.cdata = corRelationList;
            playerInput.context = context;
            var appContext = {};
            appContext['local'] = true;
            appContext['server'] = false;
            appContext['groupId'] = groupSession ? groupSession.gid : '';
            playerInput.appContext = appContext;
            return _this.frameworkService.getActiveChannelId();
        }), mergeMap(function (channelId) {
            context.channel = channelId ? channelId : _this.config.apiConfig.api_authentication.channelId;
            playerInput.context = context;
            return of(playerInput);
        }));
    };
    PlayerServiceImpl.prototype.savePlayerState = function (userId, parentId, identifier, saveState) {
        var _this = this;
        return this.dbService.read({
            table: PlayerConfigEntry.TABLE_NAME,
            selection: PlayerConfigEntry.COLUMN_NAME_USER_ID + " = ? AND " + PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER + " = ?\n                 AND " + PlayerConfigEntry.COLUMN_IDENTIFIER + " = ?",
            selectionArgs: [userId, parentId, identifier]
        }).toPromise().then(function (rows) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (rows && rows.length) {
                    return [2 /*return*/, this.dbService.update({
                            table: PlayerConfigEntry.TABLE_NAME,
                            selection: PlayerConfigEntry.COLUMN_NAME_USER_ID + " = ? AND " + PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER + " = ?\n                        AND " + PlayerConfigEntry.COLUMN_IDENTIFIER + " = ?",
                            selectionArgs: [userId, parentId, identifier],
                            modelJson: PlayerDbEntryMapper.mapPlayerStateToPlayerDbEntry(userId, parentId, identifier, saveState)
                        }).toPromise()];
                }
                else {
                    return [2 /*return*/, this.dbService.insert({
                            table: PlayerConfigEntry.TABLE_NAME,
                            modelJson: PlayerDbEntryMapper.mapPlayerStateToPlayerDbEntry(userId, parentId, identifier, saveState)
                        }).toPromise()];
                }
                return [2 /*return*/];
            });
        }); });
    };
    PlayerServiceImpl.prototype.fetchPlayerState = function (userId, parentId, contentId) {
        return this.dbService.read({
            table: PlayerConfigEntry.TABLE_NAME,
            selection: PlayerConfigEntry.COLUMN_NAME_USER_ID + " = ? AND " + PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER + " = ?\n             AND " + PlayerConfigEntry.COLUMN_IDENTIFIER + " = ?",
            selectionArgs: [userId, parentId, contentId],
        }).toPromise().then(function (rows) {
            return rows && rows[0] && PlayerDbEntryMapper.mapPlayerDbEntryToPlayer(rows[0]);
        });
    };
    PlayerServiceImpl.prototype.deletePlayerSaveState = function (userId, parentId, contentId) {
        return this.dbService.delete({
            table: PlayerConfigEntry.TABLE_NAME,
            selection: PlayerConfigEntry.COLUMN_NAME_USER_ID + " =? AND " + PlayerConfigEntry.COLUMN_PARENT_IDENTIFIER + " = ?\n            AND " + PlayerConfigEntry.COLUMN_IDENTIFIER + " = ?",
            selectionArgs: [userId, parentId, contentId]
        }).toPromise();
    };
    PlayerServiceImpl = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(1, inject(InjectionTokens.GROUP_SERVICE_DEPRECATED)),
        __param(2, inject(InjectionTokens.SDK_CONFIG)),
        __param(3, inject(InjectionTokens.FRAMEWORK_SERVICE)),
        __param(4, inject(InjectionTokens.DEVICE_INFO)),
        __param(5, inject(InjectionTokens.APP_INFO)),
        __param(6, inject(InjectionTokens.DB_SERVICE)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, DbService])
    ], PlayerServiceImpl);
    return PlayerServiceImpl;
}());
export { PlayerServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF5ZXIvaW1wbC9wbGF5ZXItc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFDLEtBQUssRUFBbUIsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHckUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQWEsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUdwRTtJQUNJLDJCQUE2RCxjQUE4QixFQUNyQixZQUFvQyxFQUNsRCxNQUFpQixFQUNWLGdCQUFrQyxFQUN4QyxVQUFzQixFQUN6QixPQUFnQixFQUNkLFNBQW9CO1FBTmYsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ1YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRTVFLENBQUM7SUFFRCwyQ0FBZSxHQUFmLFVBQWdCLE9BQWdCLEVB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LE1BQU0sQ0FBQztZQUN6QixLQUFLLEVBQUUsaUJBQWlCLENBQUMsVUFBVTtZQUNuQyxTQUFTLEVBQUssaUJBQWlCLENBQUMsbUJBQW1CLGdCQUFXLGlCQUFpQixDQUFDLHdCQUF3Qiw4QkFDbEcsaUJBQWlCLENBQUMsaUJBQWlCLFNBQU07WUFDL0MsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7U0FDL0MsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUExSVEsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtRQUVJLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN2QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUNoRCxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7eUZBQW9CLFNBQVM7T0FQbkUsaUJBQWlCLENBMkk3QjtJQUFELHdCQUFDO0NBQUEsQUEzSUQsSUEySUM7U0EzSVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQbGF5ZXJTZXJ2aWNlfSBmcm9tICcuLic7XG5pbXBvcnQge0NvbnRlbnR9IGZyb20gJy4uLy4uL2NvbnRlbnQnO1xuaW1wb3J0IHtQcm9maWxlLCBQcm9maWxlU2VydmljZSwgUHJvZmlsZVNlc3Npb259IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtHcm91cFNlcnZpY2VEZXByZWNhdGVkLCBHcm91cFNlc3Npb25EZXByZWNhdGVkfSBmcm9tICcuLi8uLi9ncm91cC1kZXByZWNhdGVkJztcbmltcG9ydCB7Q29udGV4dCwgUGxheWVySW5wdXR9IGZyb20gJy4uL2RlZi9yZXNwb25zZSc7XG5pbXBvcnQge0RldmljZUluZm99IGZyb20gJy4uLy4uL3V0aWwvZGV2aWNlJztcbmltcG9ydCB7QWN0b3IsIENvcnJlbGF0aW9uRGF0YSwgUHJvZHVjZXJEYXRhfSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtTZGtDb25maWd9IGZyb20gJy4uLy4uL3Nkay1jb25maWcnO1xuaW1wb3J0IHtGcmFtZXdvcmtTZXJ2aWNlfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsnO1xuaW1wb3J0IHtDb250ZW50VXRpbH0gZnJvbSAnLi4vLi4vY29udGVudC91dGlsL2NvbnRlbnQtdXRpbCc7XG5pbXBvcnQge0FwcEluZm99IGZyb20gJy4uLy4uL3V0aWwvYXBwJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbnN9IGZyb20gJy4uLy4uL2luamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtQbGF5ZXJDb25maWdFbnRyeSwgUGxheWVyRGJFbnRyeU1hcHBlcn0gZnJvbSAnLi4vZGIvc2NoZW1hJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYXllclNlcnZpY2VJbXBsIGltcGxlbWVudHMgUGxheWVyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoQGluamVjdChJbmplY3Rpb25Ub2tlbnMuUFJPRklMRV9TRVJWSUNFKSBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5HUk9VUF9TRVJWSUNFX0RFUFJFQ0FURUQpIHByaXZhdGUgZ3JvdXBTZXJ2aWNlOiBHcm91cFNlcnZpY2VEZXByZWNhdGVkLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNES19DT05GSUcpIHByaXZhdGUgY29uZmlnOiBTZGtDb25maWcsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuRlJBTUVXT1JLX1NFUlZJQ0UpIHByaXZhdGUgZnJhbWV3b3JrU2VydmljZTogRnJhbWV3b3JrU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5ERVZJQ0VfSU5GTykgcHJpdmF0ZSBkZXZpY2VJbmZvOiBEZXZpY2VJbmZvLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLkFQUF9JTkZPKSBwcml2YXRlIGFwcEluZm86IEFwcEluZm8sXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREJfU0VSVklDRSkgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICApIHtcbiAgICB9XG5cbiAgICBnZXRQbGF5ZXJDb25maWcoY29udGVudDogQ29udGVudCwgZXh0cmFJbmZvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogT2JzZXJ2YWJsZTxQbGF5ZXJJbnB1dD4ge1xuICAgICAgICBjb25zdCBjb250ZXh0OiBDb250ZXh0ID0ge307XG4gICAgICAgIGNvbnRleHQuZGlkID0gdGhpcy5kZXZpY2VJbmZvLmdldERldmljZUlEKCk7XG4gICAgICAgIGNvbnRleHQub3JpZ2luID0gdGhpcy5jb25maWcuYXBpQ29uZmlnLmhvc3Q7XG4gICAgICAgIGNvbnN0IHBEYXRhID0gbmV3IFByb2R1Y2VyRGF0YSgpO1xuICAgICAgICBwRGF0YS5pZCA9IHRoaXMuY29uZmlnLmFwaUNvbmZpZy5hcGlfYXV0aGVudGljYXRpb24ucHJvZHVjZXJJZDtcbiAgICAgICAgcERhdGEucGlkID0gdGhpcy5jb25maWcuYXBpQ29uZmlnLmFwaV9hdXRoZW50aWNhdGlvbi5wcm9kdWNlclVuaXF1ZUlkO1xuICAgICAgICBwRGF0YS52ZXIgPSB0aGlzLmFwcEluZm8uZ2V0VmVyc2lvbk5hbWUoKTtcbiAgICAgICAgY29udGV4dC5wZGF0YSA9IHBEYXRhO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcklucHV0OiBQbGF5ZXJJbnB1dCA9IHt9O1xuICAgICAgICBjb250ZW50LnJvbGx1cCA9IENvbnRlbnRVdGlsLmdldFJvbGx1cChjb250ZW50LmlkZW50aWZpZXIsIGNvbnRlbnQuaGllcmFyY2h5SW5mbyEpO1xuICAgICAgICBjb250ZXh0Lm9iamVjdFJvbGx1cCA9IGNvbnRlbnQucm9sbHVwO1xuICAgICAgICBpZiAod2luZG93LmRldmljZS5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJykge1xuICAgICAgICAgICAgY29udGVudC5iYXNlUGF0aCA9IChjb250ZW50LmJhc2VQYXRoIHx8IChjb250ZW50LmJhc2VQYXRoID0gJycpKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGVudC5iYXNlUGF0aCA9IGNvbnRlbnQuYmFzZVBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudC5pc0F2YWlsYWJsZUxvY2FsbHkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuY29udGVudERhdGEuc3RyZWFtaW5nVXJsID0gY29udGVudC5iYXNlUGF0aDtcbiAgICAgICAgICAgIGNvbnRlbnQuY29udGVudERhdGEucHJldmlld1VybCA9IGNvbnRlbnQuYmFzZVBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVySW5wdXQubWV0YWRhdGEgPSBjb250ZW50O1xuICAgICAgICBwbGF5ZXJJbnB1dC5jb25maWcgPSB0aGlzLmNvbmZpZy5wbGF5ZXJDb25maWc7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChzZXNzaW9uOiBQcm9maWxlU2Vzc2lvbiB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2lkID0gc2Vzc2lvbiA/IHNlc3Npb24uc2lkIDogJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICBhY3Rvci5pZCA9IHNlc3Npb24gPyBzZXNzaW9uLnVpZCA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYWN0b3IgPSBhY3RvcjtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWVwbGlua0Jhc2VQYXRoID0gdGhpcy5jb25maWcuYXBwQ29uZmlnLmRlZXBMaW5rQmFzZVBhdGg7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kZWVwbGlua0Jhc2VQYXRoID0gZGVlcGxpbmtCYXNlUGF0aCA/IGRlZXBsaW5rQmFzZVBhdGggOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZDogc3RyaW5nID0gKGNvbnRlbnQucm9sbHVwICYmIGNvbnRlbnQucm9sbHVwLmwxKSA/IGNvbnRlbnQucm9sbHVwLmwxIDogY29udGVudC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hQbGF5ZXJTdGF0ZShhY3Rvci5pZCwgcGFyZW50SWQsIGNvbnRlbnQuaWRlbnRpZmllcikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcGxheWVySW5wdXQuY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJbnB1dC5jb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucGxheWVySW5wdXQuY29uZmlnLCAuLi5KU09OLnBhcnNlKHJlc3VsdC5zYXZlU3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlU2Vzc2lvblByb2ZpbGUoe3JlcXVpcmVkRmllbGRzOiBbXX0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgocHJvZmlsZTogUHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcm9maWxlICYmIHByb2ZpbGUuc2VydmVyUHJvZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmdhbmlzYXRpb25zID0gcHJvZmlsZS5zZXJ2ZXJQcm9maWxlWydvcmdhbmlzYXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmdhbmlzYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmdJZCA9IG9yZ2FuaXNhdGlvbnNbMF0gJiYgb3JnYW5pc2F0aW9uc1swXVsnb3JnYW5pc2F0aW9uSWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY29udGV4dFJvbGx1cCA9IHtsMTogb3JnSWR9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9maWxlICYmIHByb2ZpbGUucHJvZmlsZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFJbmZvWydjb3JyZWxhdGlvbkRhdGEnXSA9IChleHRyYUluZm9bJ2NvcnJlbGF0aW9uRGF0YSddIHx8IFtdKS5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAge2lkOiBwcm9maWxlLnByb2ZpbGVUeXBlLCB0eXBlOiAnVXNlclR5cGUnfVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBTZXJ2aWNlLmdldEFjdGl2ZUdyb3VwU2Vzc2lvbigpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtZXJnZU1hcCgoZ3JvdXBTZXNzaW9uOiBHcm91cFNlc3Npb25EZXByZWNhdGVkIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvclJlbGF0aW9uTGlzdDogQ29ycmVsYXRpb25EYXRhW10gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBTZXNzaW9uICYmIGdyb3VwU2Vzc2lvbi5naWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29yUmVsYXRpb25MaXN0LnB1c2goe2lkOiBncm91cFNlc3Npb24uZ2lkLCB0eXBlOiAnZ3JvdXAnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU3RyZWFtaW5nID0gZXh0cmFJbmZvICYmIGV4dHJhSW5mby5oYXNPd25Qcm9wZXJ0eSgnc3RyZWFtaW5nJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBwQ29ycmVsYXRpb25EYXRhOiBDb3JyZWxhdGlvbkRhdGFbXSA9IGV4dHJhSW5mb1snY29ycmVsYXRpb25EYXRhJ107XG4gICAgICAgICAgICAgICAgaWYgKGFwcENvcnJlbGF0aW9uRGF0YSAmJiBhcHBDb3JyZWxhdGlvbkRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvclJlbGF0aW9uTGlzdCA9IGNvclJlbGF0aW9uTGlzdC5jb25jYXQoYXBwQ29ycmVsYXRpb25EYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29yUmVsYXRpb25MaXN0LnB1c2goe2lkOiBpc1N0cmVhbWluZyA/ICdzdHJlYW1pbmcnIDogJ29mZmxpbmUnLCB0eXBlOiAnUGxheWVyTGF1bmNoJ30pO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2RhdGEgPSBjb3JSZWxhdGlvbkxpc3Q7XG4gICAgICAgICAgICAgICAgcGxheWVySW5wdXQuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBwQ29udGV4dDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgICAgICAgICAgICAgIGFwcENvbnRleHRbJ2xvY2FsJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFwcENvbnRleHRbJ3NlcnZlciddID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXBwQ29udGV4dFsnZ3JvdXBJZCddID0gZ3JvdXBTZXNzaW9uID8gZ3JvdXBTZXNzaW9uLmdpZCA6ICcnO1xuICAgICAgICAgICAgICAgIHBsYXllcklucHV0LmFwcENvbnRleHQgPSBhcHBDb250ZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYW1ld29ya1NlcnZpY2UuZ2V0QWN0aXZlQ2hhbm5lbElkKCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChjaGFubmVsSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2hhbm5lbCA9IGNoYW5uZWxJZCA/IGNoYW5uZWxJZCA6IHRoaXMuY29uZmlnLmFwaUNvbmZpZy5hcGlfYXV0aGVudGljYXRpb24uY2hhbm5lbElkO1xuICAgICAgICAgICAgICAgIHBsYXllcklucHV0LmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihwbGF5ZXJJbnB1dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmVQbGF5ZXJTdGF0ZSh1c2VySWQ6IHN0cmluZywgcGFyZW50SWQ6IHN0cmluZywgIGlkZW50aWZpZXI6IHN0cmluZywgc2F2ZVN0YXRlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IFBsYXllckNvbmZpZ0VudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IGAke1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9OQU1FX1VTRVJfSUR9ID0gPyBBTkQgJHtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fUEFSRU5UX0lERU5USUZJRVJ9ID0gP1xuICAgICAgICAgICAgICAgICBBTkQgJHtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fSURFTlRJRklFUn0gPSA/YCxcbiAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFt1c2VySWQsIHBhcmVudElkLCBpZGVudGlmaWVyXVxuICAgICAgICB9KS50b1Byb21pc2UoKS50aGVuKGFzeW5jIChyb3dzKSA9PiB7XG4gICAgICAgICAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogUGxheWVyQ29uZmlnRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtQbGF5ZXJDb25maWdFbnRyeS5DT0xVTU5fTkFNRV9VU0VSX0lEfSA9ID8gQU5EICR7UGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX1BBUkVOVF9JREVOVElGSUVSfSA9ID9cbiAgICAgICAgICAgICAgICAgICAgICAgIEFORCAke1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdXNlcklkLCBwYXJlbnRJZCwgaWRlbnRpZmllcl0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogUGxheWVyRGJFbnRyeU1hcHBlci5tYXBQbGF5ZXJTdGF0ZVRvUGxheWVyRGJFbnRyeSh1c2VySWQsIHBhcmVudElkLCBpZGVudGlmaWVyLCBzYXZlU3RhdGUpXG4gICAgICAgICAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogUGxheWVyQ29uZmlnRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBQbGF5ZXJEYkVudHJ5TWFwcGVyLm1hcFBsYXllclN0YXRlVG9QbGF5ZXJEYkVudHJ5KHVzZXJJZCwgcGFyZW50SWQsIGlkZW50aWZpZXIsIHNhdmVTdGF0ZSlcbiAgICAgICAgICAgICAgICB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaFBsYXllclN0YXRlKHVzZXJJZDogc3RyaW5nLCBwYXJlbnRJZDogc3RyaW5nLCBjb250ZW50SWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UucmVhZCh7XG4gICAgICAgICAgICB0YWJsZTogUGxheWVyQ29uZmlnRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX05BTUVfVVNFUl9JRH0gPSA/IEFORCAke1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9QQVJFTlRfSURFTlRJRklFUn0gPSA/XG4gICAgICAgICAgICAgQU5EICR7UGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX0lERU5USUZJRVJ9ID0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbdXNlcklkLCBwYXJlbnRJZCwgY29udGVudElkXSxcbiAgICAgICAgfSkudG9Qcm9taXNlKCkudGhlbigocm93cykgPT5cbiAgICAgICAgICAgIHJvd3MgJiYgcm93c1swXSAmJiBQbGF5ZXJEYkVudHJ5TWFwcGVyLm1hcFBsYXllckRiRW50cnlUb1BsYXllcihyb3dzWzBdKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZVBsYXllclNhdmVTdGF0ZSh1c2VySWQ6IHN0cmluZywgcGFyZW50SWQ6IHN0cmluZywgY29udGVudElkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmRlbGV0ZSh7XG4gICAgICAgICAgICB0YWJsZTogUGxheWVyQ29uZmlnRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7UGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX05BTUVfVVNFUl9JRH0gPT8gQU5EICR7UGxheWVyQ29uZmlnRW50cnkuQ09MVU1OX1BBUkVOVF9JREVOVElGSUVSfSA9ID9cbiAgICAgICAgICAgIEFORCAke1BsYXllckNvbmZpZ0VudHJ5LkNPTFVNTl9JREVOVElGSUVSfSA9ID9gLFxuICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3VzZXJJZCwgcGFyZW50SWQsIGNvbnRlbnRJZF1cbiAgICAgICAgfSkudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19