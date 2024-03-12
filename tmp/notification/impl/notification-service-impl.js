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
import { inject, injectable } from 'inversify';
import { NotificationStatus } from '..';
import { InjectionTokens } from '../../injection-tokens';
import { DbService } from '../../db';
import { NotificationEntry } from '../db/schema';
import { NotificationHandler } from '../handler/notification-handler';
import { CodePush } from '../../preference-keys';
import { BehaviorSubject, combineLatest, defer, interval, of, Subject } from 'rxjs';
import { map, mapTo, mergeMap, startWith, switchMap, tap, throttleTime } from 'rxjs/operators';
import { UserFeedCategory, UserFeedStatus } from '../../profile';
import { gzip } from 'pako/dist/pako_deflate';
import { ungzip } from 'pako/dist/pako_inflate';
var COLUMN_NAME_NOTIFICATION_JSON = NotificationEntry.COLUMN_NAME_NOTIFICATION_JSON;
var NotificationServiceImpl = /** @class */ (function () {
    function NotificationServiceImpl(dbService, sharedPreferences, profileService, keyValueStore) {
        this.dbService = dbService;
        this.sharedPreferences = sharedPreferences;
        this.profileService = profileService;
        this.keyValueStore = keyValueStore;
        this._notifications$ = new BehaviorSubject([]);
        this._notificationTrigger$ = new Subject();
    }
    NotificationServiceImpl_1 = NotificationServiceImpl;
    Object.defineProperty(NotificationServiceImpl.prototype, "notifications$", {
        get: function () {
            return this._notifications$;
        },
        enumerable: false,
        configurable: true
    });
    NotificationServiceImpl.prototype.onInit = function () {
        var _this = this;
        var interval$ = interval(1000 * 60 * 60).pipe(startWith(null), mapTo(null));
        var notificationTrigger$ = this._notificationTrigger$.pipe(startWith(null), throttleTime(1000));
        return combineLatest([
            interval$,
            notificationTrigger$
        ]).pipe(switchMap(function () {
            return defer(function () { return __awaiter(_this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.fetchNotificationAndUserFeed()];
                        case 1:
                            result = _a.sent();
                            this._notifications$.next(result);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }), mapTo(undefined));
    };
    NotificationServiceImpl.prototype.addNotification = function (notification) {
        var _this = this;
        if (notification.actionData && notification.actionData.actionType === 'codePush' && notification.actionData.deploymentKey) {
            this.sharedPreferences.putString(CodePush.DEPLOYMENT_KEY, notification.actionData.deploymentKey);
        }
        return this.dbService.read({
            table: NotificationEntry.TABLE_NAME,
            selection: NotificationEntry.COLUMN_NAME_MESSAGE_ID + "= ?",
            selectionArgs: [notification.id.toString()],
            limit: '1'
        }).pipe(mergeMap(function (notificationInDb) {
            if (notificationInDb && notificationInDb.length) {
                return _this.dbService.update({
                    table: NotificationEntry.TABLE_NAME,
                    selection: NotificationEntry.COLUMN_NAME_MESSAGE_ID + "= ?",
                    selectionArgs: [notification.id.toString()],
                    modelJson: NotificationHandler.constructNotificationDBModel(notification)
                }).pipe(mapTo(true));
            }
            else {
                return _this.dbService.insert({
                    table: NotificationEntry.TABLE_NAME,
                    modelJson: NotificationHandler.constructNotificationDBModel(notification)
                }).pipe(mapTo(true));
            }
        }), tap(function () { return _this.triggerNotificationChange(); }));
    };
    NotificationServiceImpl.prototype.deleteNotification = function (notification) {
        var _this = this;
        if (notification.source === 'USER_FEED') {
            return this.profileService.deleteUserFeedEntry({
                feedEntryId: notification.id,
                category: UserFeedCategory.NOTIFICATION,
            }).pipe(tap(function () { return _this.triggerNotificationChange(); }));
        }
        var query = ("DELETE FROM " + NotificationEntry.TABLE_NAME + " ")
            .concat(notification.id ? "WHERE " + NotificationEntry.COLUMN_NAME_MESSAGE_ID + " = " + notification.id : '');
        return this.dbService.execute(query).pipe(mapTo(true), tap(function () { return _this.triggerNotificationChange(); }));
    };
    NotificationServiceImpl.prototype.getAllNotifications = function (criteria) {
        return this.dbService.read(NotificationHandler.getFilterForNotification(criteria)).pipe(map(function (notificationInDb) {
            return notificationInDb.map(function (notification) {
                var notificationRes = JSON.parse(notification[COLUMN_NAME_NOTIFICATION_JSON]);
                notificationRes.isRead = notification[NotificationEntry.COLUMN_NAME_IS_READ];
                return notificationRes;
            });
        }));
    };
    NotificationServiceImpl.prototype.updateNotification = function (notification) {
        var _this = this;
        if (notification.source === 'USER_FEED') {
            return this.profileService.updateUserFeedEntry({
                feedEntryId: notification.id,
                category: UserFeedCategory.NOTIFICATION,
                request: {
                    status: notification.isRead ? UserFeedStatus.READ : UserFeedStatus.UNREAD
                }
            }).pipe(tap(function () { return _this.triggerNotificationChange(); }));
        }
        return this.dbService.read({
            table: NotificationEntry.TABLE_NAME,
            selection: NotificationEntry.COLUMN_NAME_MESSAGE_ID + "= ?",
            selectionArgs: [notification.id.toString()],
            limit: '1'
        }).pipe(mergeMap(function (notificationInDb) {
            if (notificationInDb && notificationInDb.length) {
                return _this.dbService.update({
                    table: NotificationEntry.TABLE_NAME,
                    selection: NotificationEntry.COLUMN_NAME_MESSAGE_ID + "= ?",
                    selectionArgs: [notification.id.toString()],
                    modelJson: NotificationHandler.constructNotificationDBModel(notification)
                }).pipe(mapTo(true));
            }
            else {
                return of(false);
            }
        }), tap(function () { return _this.triggerNotificationChange(); }));
    };
    NotificationServiceImpl.prototype.deleteAllNotifications = function () {
        var _this = this;
        return defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var notifications, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notifications = this._notifications$.getValue();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(notifications.map(function (n) { return _this.deleteNotification(n).toPromise(); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    NotificationServiceImpl.prototype.fetchNotificationAndUserFeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fetchNotifications, fetchFeeds, result, notifications, userFeedEntries;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.getAllNotifications({ notificationStatus: NotificationStatus.ALL }).toPromise()];
                            });
                        }); };
                        fetchFeeds = function () { return __awaiter(_this, void 0, void 0, function () {
                            var session, cacheKey, feed, e_3, e_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 6, , 7]);
                                        return [4 /*yield*/, this.profileService.getActiveProfileSession().toPromise()];
                                    case 1:
                                        session = _a.sent();
                                        cacheKey = NotificationServiceImpl_1.USER_NOTIFICATION_FEED_KEY + "_" + (session.managedSession ? session.managedSession.uid : session.uid);
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, this.profileService.getUserFeed().toPromise().then(function (entries) {
                                                return entries.filter(function (e) { return e.category === UserFeedCategory.NOTIFICATION; });
                                            })];
                                    case 3:
                                        feed = _a.sent();
                                        this.keyValueStore.setValue(cacheKey, gzip(JSON.stringify(feed))).toPromise();
                                        return [2 /*return*/, feed];
                                    case 4:
                                        e_3 = _a.sent();
                                        return [2 /*return*/, this.keyValueStore.getValue(cacheKey).toPromise()
                                                .then(function (r) { return JSON.parse(ungzip(r, { to: 'string' })); })
                                                .catch(function (e) {
                                                console.error(e);
                                                return [];
                                            })];
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        e_4 = _a.sent();
                                        return [2 /*return*/, []];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, Promise.all([
                                fetchNotifications(),
                                fetchFeeds()
                            ])];
                    case 1:
                        result = _a.sent();
                        notifications = result[0];
                        userFeedEntries = result[1];
                        return [2 /*return*/, notifications.concat(userFeedEntries.map(function (e) {
                                return __assign({ id: e['id'], source: 'USER_FEED', displayTime: new Date(e.createdOn).getTime(), expiry: e.expireOn ? new Date(e.expireOn).getTime() : 0, isRead: e.status === 'read' ? 1 : 0 }, e.data);
                            })).sort(function (a, b) {
                                return new Date(b.displayTime).getTime() - new Date(a.displayTime).getTime();
                            })];
                }
            });
        });
    };
    NotificationServiceImpl.prototype.triggerNotificationChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._notificationTrigger$.next(null);
                return [2 /*return*/];
            });
        });
    };
    var NotificationServiceImpl_1;
    NotificationServiceImpl.USER_NOTIFICATION_FEED_KEY = 'user_notification_feed';
    NotificationServiceImpl = NotificationServiceImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.DB_SERVICE)),
        __param(1, inject(InjectionTokens.SHARED_PREFERENCES)),
        __param(2, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(3, inject(InjectionTokens.KEY_VALUE_STORE)),
        __metadata("design:paramtypes", [DbService, Object, Object, Object])
    ], NotificationServiceImpl);
    return NotificationServiceImpl;
}());
export { NotificationServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXNlcnZpY2UtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub3RpZmljYXRpb24vaW1wbC9ub3RpZmljYXRpb24tc2VydmljZS1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFnRSxrQkFBa0IsRUFBQyxNQUFNLElBQUksQ0FBQztBQUNyRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFcEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5RixPQUFPLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0YsT0FBTyxFQUFpQixnQkFBZ0IsRUFBaUIsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzlGLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsSUFBTyw2QkFBNkIsR0FBRyxpQkFBaUIsQ0FB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QUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUNoQyxDQUFDLENBQUMsSUFBSSxDQUNJLENBQUM7NEJBQ3RCLENBQUMsQ0FBQyxDQUNMLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ1IsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNqRixDQUFDLENBQUMsRUFBQzs7OztLQUNOO0lBRWEsMkRBQXlCLEdBQXZDOzs7Z0JBQ0ksSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUN6Qzs7SUE3TnVCLGtEQUEwQixHQUFHLHdCQUF3QixDQUFDO0lBRHJFLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7UUFLSixXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQTt5Q0FIZSxTQUFTO09BSjNELHVCQUF1QixDQStObkM7SUFBRCw4QkFBQztDQUFBLEFBL05ELElBK05DO1NBL05ZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBpbmplY3RhYmxlfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0IHtOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvbkZpbHRlckNyaXRlcmlhLCBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TdGF0dXN9IGZyb20gJy4uJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi9kYic7XG5pbXBvcnQge05vdGlmaWNhdGlvbkVudHJ5fSBmcm9tICcuLi9kYi9zY2hlbWEnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25IYW5kbGVyfSBmcm9tICcuLi9oYW5kbGVyL25vdGlmaWNhdGlvbi1oYW5kbGVyJztcbmltcG9ydCB7U2hhcmVkUHJlZmVyZW5jZXN9IGZyb20gJy4uLy4uL3V0aWwvc2hhcmVkLXByZWZlcmVuY2VzJztcbmltcG9ydCB7Q29kZVB1c2h9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgZGVmZXIsIGludGVydmFsLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcCwgbWFwVG8sIG1lcmdlTWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwLCB0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7UHJvZmlsZVNlcnZpY2UsIFVzZXJGZWVkQ2F0ZWdvcnksIFVzZXJGZWVkRW50cnksIFVzZXJGZWVkU3RhdHVzfSBmcm9tICcuLi8uLi9wcm9maWxlJztcbmltcG9ydCB7U2RrU2VydmljZU9uSW5pdERlbGVnYXRlfSBmcm9tICcuLi8uLi9zZGstc2VydmljZS1vbi1pbml0LWRlbGVnYXRlJztcbmltcG9ydCB7S2V5VmFsdWVTdG9yZX0gZnJvbSAnLi4vLi4va2V5LXZhbHVlLXN0b3JlJztcbmltcG9ydCB7Z3ppcH0gZnJvbSAncGFrby9kaXN0L3Bha29fZGVmbGF0ZSc7XG5pbXBvcnQge3VuZ3ppcH0gZnJvbSAncGFrby9kaXN0L3Bha29faW5mbGF0ZSc7XG5pbXBvcnQgQ09MVU1OX05BTUVfTk9USUZJQ0FUSU9OX0pTT04gPSBOb3RpZmljYXRpb25FbnRyeS5DT0xVTU5fTkFNRV9OT1RJRklDQVRJT05fSlNPTjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgTm90aWZpY2F0aW9uU2VydmljZSwgU2RrU2VydmljZU9uSW5pdERlbGVnYXRlIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBVU0VSX05PVElGSUNBVElPTl9GRUVEX0tFWSA9ICd1c2VyX25vdGlmaWNhdGlvbl9mZWVkJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5EQl9TRVJWSUNFKSBwcml2YXRlIGRiU2VydmljZTogRGJTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5TSEFSRURfUFJFRkVSRU5DRVMpIHByaXZhdGUgc2hhcmVkUHJlZmVyZW5jZXM6IFNoYXJlZFByZWZlcmVuY2VzLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5QUk9GSUxFX1NFUlZJQ0UpIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5LRVlfVkFMVUVfU1RPUkUpIHByaXZhdGUga2V5VmFsdWVTdG9yZTogS2V5VmFsdWVTdG9yZVxuICAgICkge1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vdGlmaWNhdGlvbnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb3RpZmljYXRpb25bXT4oW10pO1xuICAgIHByaXZhdGUgX25vdGlmaWNhdGlvblRyaWdnZXIkID0gbmV3IFN1YmplY3Q8bnVsbD4oKTtcblxuICAgIGdldCBub3RpZmljYXRpb25zJCgpOiBTdWJqZWN0PE5vdGlmaWNhdGlvbltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3RpZmljYXRpb25zJDtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwkID0gaW50ZXJ2YWwoMTAwMCAqIDYwICogNjApLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICBtYXBUbyhudWxsKSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBub3RpZmljYXRpb25UcmlnZ2VyJCA9IHRoaXMuX25vdGlmaWNhdGlvblRyaWdnZXIkLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICB0aHJvdHRsZVRpbWUoMTAwMCksXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgaW50ZXJ2YWwkLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlciRcbiAgICAgICAgXSkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZmV0Y2hOb3RpZmljYXRpb25BbmRVc2VyRmVlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm90aWZpY2F0aW9ucyQubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhZGROb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5hY3Rpb25EYXRhICYmIG5vdGlmaWNhdGlvbi5hY3Rpb25EYXRhLmFjdGlvblR5cGUgPT09ICdjb2RlUHVzaCcgJiYgbm90aWZpY2F0aW9uLmFjdGlvbkRhdGEuZGVwbG95bWVudEtleSkge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoQ29kZVB1c2guREVQTE9ZTUVOVF9LRVksIG5vdGlmaWNhdGlvbi5hY3Rpb25EYXRhLmRlcGxveW1lbnRLZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBOb3RpZmljYXRpb25FbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtOb3RpZmljYXRpb25FbnRyeS5DT0xVTU5fTkFNRV9NRVNTQUdFX0lEfT0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbbm90aWZpY2F0aW9uLmlkLnRvU3RyaW5nKCldLFxuICAgICAgICAgICAgbGltaXQ6ICcxJ1xuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKG5vdGlmaWNhdGlvbkluRGI6IE5vdGlmaWNhdGlvbkVudHJ5LlNjaGVtYU1hcFtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbkluRGIgJiYgbm90aWZpY2F0aW9uSW5EYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogTm90aWZpY2F0aW9uRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7Tm90aWZpY2F0aW9uRW50cnkuQ09MVU1OX05BTUVfTUVTU0FHRV9JRH09ID9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW25vdGlmaWNhdGlvbi5pZC50b1N0cmluZygpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogTm90aWZpY2F0aW9uSGFuZGxlci5jb25zdHJ1Y3ROb3RpZmljYXRpb25EQk1vZGVsKG5vdGlmaWNhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogTm90aWZpY2F0aW9uRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjogTm90aWZpY2F0aW9uSGFuZGxlci5jb25zdHJ1Y3ROb3RpZmljYXRpb25EQk1vZGVsKG5vdGlmaWNhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFRvKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy50cmlnZ2VyTm90aWZpY2F0aW9uQ2hhbmdlKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIGlmIChub3RpZmljYXRpb24uc291cmNlID09PSAnVVNFUl9GRUVEJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZmlsZVNlcnZpY2UuZGVsZXRlVXNlckZlZWRFbnRyeSh7XG4gICAgICAgICAgICAgICAgZmVlZEVudHJ5SWQ6IG5vdGlmaWNhdGlvbi5pZCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFVzZXJGZWVkQ2F0ZWdvcnkuTk9USUZJQ0FUSU9OLFxuICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy50cmlnZ2VyTm90aWZpY2F0aW9uQ2hhbmdlKCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcXVlcnkgPSBgREVMRVRFIEZST00gJHtOb3RpZmljYXRpb25FbnRyeS5UQUJMRV9OQU1FfSBgXG4gICAgICAgICAgICAuY29uY2F0KG5vdGlmaWNhdGlvbi5pZCA/IGBXSEVSRSAke05vdGlmaWNhdGlvbkVudHJ5LkNPTFVNTl9OQU1FX01FU1NBR0VfSUR9ID0gJHtub3RpZmljYXRpb24uaWR9YCA6ICcnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLmV4ZWN1dGUocXVlcnkpLnBpcGUoXG4gICAgICAgICAgICBtYXBUbyh0cnVlKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLnRyaWdnZXJOb3RpZmljYXRpb25DaGFuZ2UoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRBbGxOb3RpZmljYXRpb25zKGNyaXRlcmlhOiBOb3RpZmljYXRpb25GaWx0ZXJDcml0ZXJpYSk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoTm90aWZpY2F0aW9uSGFuZGxlci5nZXRGaWx0ZXJGb3JOb3RpZmljYXRpb24oY3JpdGVyaWEpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChub3RpZmljYXRpb25JbkRiOiBOb3RpZmljYXRpb25FbnRyeS5TY2hlbWFNYXBbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmljYXRpb25JbkRiLm1hcCgobm90aWZpY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblJlczogTm90aWZpY2F0aW9uID0gSlNPTi5wYXJzZShub3RpZmljYXRpb25bQ09MVU1OX05BTUVfTk9USUZJQ0FUSU9OX0pTT05dISk7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvblJlcy5pc1JlYWQgPSBub3RpZmljYXRpb25bTm90aWZpY2F0aW9uRW50cnkuQ09MVU1OX05BTUVfSVNfUkVBRF0hO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uUmVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5zb3VyY2UgPT09ICdVU0VSX0ZFRUQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlU2VydmljZS51cGRhdGVVc2VyRmVlZEVudHJ5KHtcbiAgICAgICAgICAgICAgICBmZWVkRW50cnlJZDogbm90aWZpY2F0aW9uLmlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogVXNlckZlZWRDYXRlZ29yeS5OT1RJRklDQVRJT04sXG4gICAgICAgICAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG5vdGlmaWNhdGlvbi5pc1JlYWQgPyBVc2VyRmVlZFN0YXR1cy5SRUFEIDogVXNlckZlZWRTdGF0dXMuVU5SRUFEXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy50cmlnZ2VyTm90aWZpY2F0aW9uQ2hhbmdlKCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IE5vdGlmaWNhdGlvbkVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IGAke05vdGlmaWNhdGlvbkVudHJ5LkNPTFVNTl9OQU1FX01FU1NBR0VfSUR9PSA/YCxcbiAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtub3RpZmljYXRpb24uaWQudG9TdHJpbmcoKV0sXG4gICAgICAgICAgICBsaW1pdDogJzEnXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgobm90aWZpY2F0aW9uSW5EYjogTm90aWZpY2F0aW9uRW50cnkuU2NoZW1hTWFwW10pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uSW5EYiAmJiBub3RpZmljYXRpb25JbkRiLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBOb3RpZmljYXRpb25FbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtOb3RpZmljYXRpb25FbnRyeS5DT0xVTU5fTkFNRV9NRVNTQUdFX0lEfT0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbbm90aWZpY2F0aW9uLmlkLnRvU3RyaW5nKCldLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxKc29uOiBOb3RpZmljYXRpb25IYW5kbGVyLmNvbnN0cnVjdE5vdGlmaWNhdGlvbkRCTW9kZWwobm90aWZpY2F0aW9uKVxuICAgICAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVG8odHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMudHJpZ2dlck5vdGlmaWNhdGlvbkNoYW5nZSgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZUFsbE5vdGlmaWNhdGlvbnMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBkZWZlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25zID0gdGhpcy5fbm90aWZpY2F0aW9ucyQuZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChub3RpZmljYXRpb25zLm1hcCgobikgPT4gdGhpcy5kZWxldGVOb3RpZmljYXRpb24obikudG9Qcm9taXNlKCkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmZXRjaE5vdGlmaWNhdGlvbkFuZFVzZXJGZWVkKCk6IFByb21pc2U8Tm90aWZpY2F0aW9uW10+IHtcbiAgICAgICAgdHlwZSBQYXJ0aWFsTm90aWZpY2F0aW9uID0gRXhjbHVkZTxOb3RpZmljYXRpb24sICdpZCcgfCAnZGlzcGxheVRpbWUnIHwgJ2V4cGlyeScgfCAnaXNSZWFkJz47XG4gICAgICAgIGNvbnN0IGZldGNoTm90aWZpY2F0aW9ucyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbE5vdGlmaWNhdGlvbnMoe25vdGlmaWNhdGlvblN0YXR1czogTm90aWZpY2F0aW9uU3RhdHVzLkFMTH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGZldGNoRmVlZHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFjdGl2ZVByb2ZpbGVTZXNzaW9uKCkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSBgJHtOb3RpZmljYXRpb25TZXJ2aWNlSW1wbC5VU0VSX05PVElGSUNBVElPTl9GRUVEX0tFWX1fJHtzZXNzaW9uLm1hbmFnZWRTZXNzaW9uID8gc2Vzc2lvbi5tYW5hZ2VkU2Vzc2lvbi51aWQgOiBzZXNzaW9uLnVpZH1gO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmVlZCA9IGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0VXNlckZlZWQoKS50b1Byb21pc2UoKS50aGVuKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cmllcy5maWx0ZXIoZSA9PiBlLmNhdGVnb3J5ID09PSBVc2VyRmVlZENhdGVnb3J5Lk5PVElGSUNBVElPTikgYXMgVXNlckZlZWRFbnRyeTxQYXJ0aWFsTm90aWZpY2F0aW9uPltdO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZVN0b3JlLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBnemlwKEpTT04uc3RyaW5naWZ5KGZlZWQpKVxuICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmVlZDtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtleVZhbHVlU3RvcmUuZ2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUtleVxuICAgICAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4gSlNPTi5wYXJzZSh1bmd6aXAociwge3RvOiAnc3RyaW5nJ30pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaE5vdGlmaWNhdGlvbnMoKSxcbiAgICAgICAgICAgIGZldGNoRmVlZHMoKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBub3RpZmljYXRpb25zID0gcmVzdWx0WzBdO1xuICAgICAgICBjb25zdCB1c2VyRmVlZEVudHJpZXM6IFVzZXJGZWVkRW50cnk8UGFydGlhbE5vdGlmaWNhdGlvbj5bXSA9IHJlc3VsdFsxXTtcblxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9ucy5jb25jYXQoXG4gICAgICAgICAgICB1c2VyRmVlZEVudHJpZXMubWFwKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpZDogZVsnaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiAnVVNFUl9GRUVEJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVRpbWU6IG5ldyBEYXRlKGUuY3JlYXRlZE9uKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyeTogZS5leHBpcmVPbiA/IG5ldyBEYXRlKGUuZXhwaXJlT24pLmdldFRpbWUoKSA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGlzUmVhZDogZS5zdGF0dXMgPT09ICdyZWFkJyA/IDEgOiAwLFxuICAgICAgICAgICAgICAgICAgICAuLi5lLmRhdGFcbiAgICAgICAgICAgICAgICB9IGFzIE5vdGlmaWNhdGlvbjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGIuZGlzcGxheVRpbWUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuZGlzcGxheVRpbWUpLmdldFRpbWUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB0cmlnZ2VyTm90aWZpY2F0aW9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25UcmlnZ2VyJC5uZXh0KG51bGwpO1xuICAgIH1cbn1cbiJdfQ==