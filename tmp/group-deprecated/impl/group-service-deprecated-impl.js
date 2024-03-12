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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { DbService } from '../../db';
import { GroupEntry, GroupProfileEntry } from '../db/schema';
import { GroupSessionDeprecated, NoActiveGroupSessionError, NoGroupFoundError } from '..';
import { GroupMapper } from '../util/group-mapper';
import { UniqueId } from '../../db/util/unique-id';
import { GroupKeys } from '../../preference-keys';
import { Actor, AuditState, ObjectType } from '../../telemetry';
import { ObjectUtil } from '../../util/object-util';
import { Container, inject, injectable } from 'inversify';
import { InjectionTokens } from '../../injection-tokens';
import { defer, from, Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, mapTo, mergeMap, reduce, tap } from 'rxjs/operators';
var GroupServiceDeprecatedImpl = /** @class */ (function () {
    function GroupServiceDeprecatedImpl(container, dbService, profileService, sharedPreferences) {
        this.container = container;
        this.dbService = dbService;
        this.profileService = profileService;
        this.sharedPreferences = sharedPreferences;
    }
    GroupServiceDeprecatedImpl_1 = GroupServiceDeprecatedImpl;
    Object.defineProperty(GroupServiceDeprecatedImpl.prototype, "telemetryService", {
        get: function () {
            return this.container.get(InjectionTokens.TELEMETRY_SERVICE);
        },
        enumerable: false,
        configurable: true
    });
    GroupServiceDeprecatedImpl.prototype.createGroup = function (group) {
        var _this = this;
        group.gid = UniqueId.generateUniqueId();
        group.createdAt = Date.now();
        group.updatedAt = Date.now();
        return this.dbService.insert({
            table: GroupEntry.TABLE_NAME,
            modelJson: GroupMapper.mapGroupToGroupDBEntry(group)
        }).pipe(tap(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().pipe(map(function (session) { return session.uid; }), mergeMap(function (uid) {
                            var actor = new Actor();
                            actor.id = uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_CREATED,
                                updatedProperties: ObjectUtil.getTruthyProps(group),
                                objId: group.gid,
                                objType: ObjectType.GROUP
                            };
                            return _this.telemetryService.audit(auditRequest);
                        })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), map(function () { return group; }));
    };
    GroupServiceDeprecatedImpl.prototype.deleteGroup = function (gid) {
        var _this = this;
        return defer(function () { return of(_this.dbService.beginTransaction()); }).pipe(mergeMap(function () {
            return zip(_this.dbService.delete({
                table: GroupEntry.TABLE_NAME,
                selection: GroupEntry.COLUMN_NAME_GID + " = ?",
                selectionArgs: [gid]
            }), _this.dbService.delete({
                table: GroupProfileEntry.TABLE_NAME,
                selection: GroupProfileEntry.COLUMN_NAME_GID + " = ?",
                selectionArgs: [gid]
            })).pipe(mapTo(undefined));
        }), tap(function () {
            _this.dbService.endTransaction(true);
        }), tap(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().pipe(mergeMap(function (session) {
                            var actor = new Actor();
                            actor.id = session.uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_DELETED,
                                objId: gid,
                                objType: ObjectType.GROUP
                            };
                            return _this.telemetryService.audit(auditRequest);
                        })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), catchError(function (e) {
            _this.dbService.endTransaction(false);
            return Observable.throw(e);
        }));
    };
    GroupServiceDeprecatedImpl.prototype.updateGroup = function (group) {
        var _this = this;
        return this.dbService.read({
            table: GroupEntry.TABLE_NAME,
            selection: 'gid = ?',
            selectionArgs: [group.gid],
        }).pipe(map(function (rows) {
            if (!rows || !rows[0]) {
                return Observable.throw(new NoGroupFoundError("No Group found with ID " + group.gid));
            }
            return GroupMapper.mapGroupDBEntryToGroup(rows[0]);
        }), tap(function (prevGroup) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getActiveProfileSession().pipe(mergeMap(function (session) {
                            var actor = new Actor();
                            actor.id = session.uid;
                            actor.type = Actor.TYPE_SYSTEM;
                            var auditRequest = {
                                env: 'sdk',
                                actor: actor,
                                currentState: AuditState.AUDIT_UPDATED,
                                updatedProperties: ObjectUtil.getPropDiff(group, prevGroup),
                                objId: group.gid,
                                objType: ObjectType.GROUP
                            };
                            return _this.telemetryService.audit(auditRequest);
                        })).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), mergeMap(function () {
            var _a;
            return _this.dbService.update({
                table: GroupEntry.TABLE_NAME,
                selection: 'gid = ?',
                selectionArgs: [group.gid],
                modelJson: (_a = {},
                    _a[GroupEntry.COLUMN_NAME_NAME] = group.name,
                    _a[GroupEntry.COLUMN_NAME_SYLLABUS] = group.syllabus.join(','),
                    _a[GroupEntry.COLUMN_NAME_UPDATED_AT] = Date.now(),
                    _a[GroupEntry.COLUMN_NAME_GRADE] = group.grade.join(','),
                    _a[GroupEntry.COLUMN_NAME_GRADE_VALUE] = JSON.stringify(group.gradeValue),
                    _a)
            }).pipe(mapTo(group));
        }));
    };
    GroupServiceDeprecatedImpl.prototype.getActiveSessionGroup = function () {
        var _this = this;
        return this.getActiveGroupSession().pipe(map(function (profileSession) {
            if (!profileSession) {
                throw new NoActiveGroupSessionError('No active session available');
            }
            return profileSession;
        }), mergeMap(function (profileSession) {
            return _this.dbService.read({
                table: GroupEntry.TABLE_NAME,
                selection: GroupEntry.COLUMN_NAME_GID + " = ?",
                selectionArgs: [profileSession.gid]
            }).pipe(map(function (rows) { return rows && rows[0]; }));
        }));
    };
    GroupServiceDeprecatedImpl.prototype.setActiveSessionForGroup = function (gid) {
        var _this = this;
        return this.dbService.read({
            table: GroupEntry.TABLE_NAME,
            selection: GroupEntry.COLUMN_NAME_GID + " = ?",
            selectionArgs: [gid]
        }).pipe(map(function (rows) {
            return rows && rows[0] && GroupMapper.mapGroupDBEntryToGroup(rows[0]);
        }), map(function (group) {
            if (!group) {
                throw new NoGroupFoundError('No Profile found');
            }
            return group;
        }), mergeMap(function (group) {
            var groupSession = new GroupSessionDeprecated(group.gid);
            return _this.sharedPreferences.putString(GroupServiceDeprecatedImpl_1.KEY_GROUP_SESSION, JSON.stringify({
                gid: groupSession.gid,
                sid: groupSession.sid,
                createdTime: groupSession.createdTime
            })).pipe(mapTo(true));
        }));
    };
    GroupServiceDeprecatedImpl.prototype.getActiveGroupSession = function () {
        return this.sharedPreferences.getString(GroupServiceDeprecatedImpl_1.KEY_GROUP_SESSION).pipe(map(function (response) {
            if (!response) {
                return undefined;
            }
            return JSON.parse(response);
        }));
    };
    GroupServiceDeprecatedImpl.prototype.getAllGroups = function (groupRequest) {
        var _this = this;
        return defer(function () {
            if (groupRequest) {
                return _this.dbService.execute("\n                    SELECT * FROM " + GroupEntry.TABLE_NAME + "\n                    LEFT JOIN " + GroupProfileEntry.TABLE_NAME + " ON\n                    " + GroupEntry.TABLE_NAME + "." + GroupEntry.COLUMN_NAME_GID + " =\n                    " + GroupProfileEntry.TABLE_NAME + "." + GroupProfileEntry.COLUMN_NAME_GID + "\n                    WHERE " + GroupProfileEntry.COLUMN_NAME_UID + " = \"" + groupRequest.uid + "\"").pipe(map(function (groups) {
                    return groups.map(function (group) { return GroupMapper.mapGroupDBEntryToGroup(group); });
                }));
            }
            return _this.dbService.read({
                table: GroupEntry.TABLE_NAME,
                columns: []
            }).pipe(map(function (groups) {
                return groups.map(function (group) { return GroupMapper.mapGroupDBEntryToGroup(group); });
            }));
        }).pipe(mergeMap(function (groups) {
            return from(groups);
        }), mergeMap(function (group) {
            return _this.profileService.getAllProfiles({
                groupId: group.gid
            }).pipe(map(function (profiles) { return (__assign(__assign({}, group), { profilesCount: profiles.length })); }));
        }), reduce(function (allResponses, currentResponse) { return __spreadArrays(allResponses, [currentResponse]); }, []));
    };
    GroupServiceDeprecatedImpl.prototype.addProfilesToGroup = function (profileToGroupRequest) {
        var _this = this;
        return defer(function () { return of(_this.dbService.beginTransaction()); }).pipe(mergeMap(function () { return _this.dbService.delete({
            table: GroupProfileEntry.TABLE_NAME,
            selection: GroupProfileEntry.COLUMN_NAME_GID + " = ?",
            selectionArgs: [profileToGroupRequest.groupId]
        }); }), mergeMap(function () {
            if (!profileToGroupRequest.uidList.length) {
                return of(0);
            }
            return zip.apply(void 0, profileToGroupRequest.uidList.map(function (uid) {
                var _a;
                return _this.dbService.insert({
                    table: GroupProfileEntry.TABLE_NAME,
                    modelJson: (_a = {},
                        _a[GroupProfileEntry.COLUMN_NAME_GID] = profileToGroupRequest.groupId,
                        _a[GroupProfileEntry.COLUMN_NAME_UID] = uid,
                        _a)
                });
            })).pipe(mapTo(profileToGroupRequest.uidList.length));
        }), tap(function () {
            _this.dbService.endTransaction(true);
        }), catchError(function (e) {
            _this.dbService.endTransaction(false);
            return throwError(e);
        }));
    };
    GroupServiceDeprecatedImpl.prototype.removeActiveGroupSession = function () {
        var _this = this;
        return this.getActiveGroupSession().pipe(mergeMap(function (groupSession) {
            if (!groupSession) {
                return of(undefined);
            }
            return _this.sharedPreferences.putString(GroupServiceDeprecatedImpl_1.KEY_GROUP_SESSION, '');
        }));
    };
    var GroupServiceDeprecatedImpl_1;
    GroupServiceDeprecatedImpl.KEY_GROUP_SESSION = GroupKeys.KEY_GROUP_SESSION;
    GroupServiceDeprecatedImpl = GroupServiceDeprecatedImpl_1 = __decorate([
        injectable(),
        __param(0, inject(InjectionTokens.CONTAINER)),
        __param(1, inject(InjectionTokens.DB_SERVICE)),
        __param(2, inject(InjectionTokens.PROFILE_SERVICE)),
        __param(3, inject(InjectionTokens.SHARED_PREFERENCES)),
        __metadata("design:paramtypes", [Container,
            DbService, Object, Object])
    ], GroupServiceDeprecatedImpl);
    return GroupServiceDeprecatedImpl;
}());
export { GroupServiceDeprecatedImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtc2VydmljZS1kZXByZWNhdGVkLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JvdXAtZGVwcmVjYXRlZC9pbXBsL2dyb3VwLXNlcnZpY2UtZGVwcmVjYXRlZC1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMzRCxPQUFPLEVBSUgsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixpQkFBaUIsRUFFcEIsTUFBTSxJQUFJLENBQUM7QUFDWixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFDdkcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFF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LEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsNkRBQXdCLEdBQXhCO1FBQUEsaUJBU0M7UUFSRyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FDcEMsUUFBUSxDQUFDLFVBQUMsWUFBWTtZQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLDRCQUEwQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDOztJQXZTdUIsNENBQWlCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDO0lBRC9ELDBCQUEwQjtRQUR0QyxVQUFVLEVBQUU7UUFJSSxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDakMsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN2QyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTt5Q0FIVyxTQUFTO1lBQ1IsU0FBUztPQUpuRSwwQkFBMEIsQ0F5U3RDO0lBQUQsaUNBQUM7Q0FBQSxBQXpTRCxJQXlTQztTQXpTWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiU2VydmljZX0gZnJvbSAnLi4vLi4vZGInO1xuaW1wb3J0IHtHcm91cEVudHJ5LCBHcm91cFByb2ZpbGVFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7XG4gICAgR2V0QWxsR3JvdXBSZXF1ZXN0RGVwcmVjYXRlZCxcbiAgICBHcm91cERlcHJlY2F0ZWQsXG4gICAgR3JvdXBTZXJ2aWNlRGVwcmVjYXRlZCxcbiAgICBHcm91cFNlc3Npb25EZXByZWNhdGVkLFxuICAgIE5vQWN0aXZlR3JvdXBTZXNzaW9uRXJyb3IsXG4gICAgTm9Hcm91cEZvdW5kRXJyb3IsXG4gICAgUHJvZmlsZXNUb0dyb3VwUmVxdWVzdERlcHJlY2F0ZWRcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IHtHcm91cE1hcHBlcn0gZnJvbSAnLi4vdXRpbC9ncm91cC1tYXBwZXInO1xuaW1wb3J0IHtVbmlxdWVJZH0gZnJvbSAnLi4vLi4vZGIvdXRpbC91bmlxdWUtaWQnO1xuaW1wb3J0IHtQcm9maWxlU2VydmljZSwgUHJvZmlsZVNlc3Npb259IGZyb20gJy4uLy4uL3Byb2ZpbGUnO1xuaW1wb3J0IHtTaGFyZWRQcmVmZXJlbmNlc30gZnJvbSAnLi4vLi4vdXRpbC9zaGFyZWQtcHJlZmVyZW5jZXMnO1xuaW1wb3J0IHtHcm91cEtleXN9IGZyb20gJy4uLy4uL3ByZWZlcmVuY2Uta2V5cyc7XG5pbXBvcnQge0FjdG9yLCBBdWRpdFN0YXRlLCBPYmplY3RUeXBlLCBUZWxlbWV0cnlBdWRpdFJlcXVlc3QsIFRlbGVtZXRyeVNlcnZpY2V9IGZyb20gJy4uLy4uL3RlbGVtZXRyeSc7XG5pbXBvcnQge09iamVjdFV0aWx9IGZyb20gJy4uLy4uL3V0aWwvb2JqZWN0LXV0aWwnO1xuaW1wb3J0IHtDb250YWluZXIsIGluamVjdCwgaW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW5zfSBmcm9tICcuLi8uLi9pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7ZGVmZXIsIGZyb20sIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCB6aXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgcmVkdWNlLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyb3VwU2VydmljZURlcHJlY2F0ZWRJbXBsIGltcGxlbWVudHMgR3JvdXBTZXJ2aWNlRGVwcmVjYXRlZCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgS0VZX0dST1VQX1NFU1NJT04gPSBHcm91cEtleXMuS0VZX0dST1VQX1NFU1NJT047XG5cbiAgICBjb25zdHJ1Y3RvcihAaW5qZWN0KEluamVjdGlvblRva2Vucy5DT05UQUlORVIpIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXIsXG4gICAgICAgICAgICAgICAgQGluamVjdChJbmplY3Rpb25Ub2tlbnMuREJfU0VSVklDRSkgcHJpdmF0ZSBkYlNlcnZpY2U6IERiU2VydmljZSxcbiAgICAgICAgICAgICAgICBAaW5qZWN0KEluamVjdGlvblRva2Vucy5QUk9GSUxFX1NFUlZJQ0UpIHByaXZhdGUgcHJvZmlsZVNlcnZpY2U6IFByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBpbmplY3QoSW5qZWN0aW9uVG9rZW5zLlNIQVJFRF9QUkVGRVJFTkNFUykgcHJpdmF0ZSBzaGFyZWRQcmVmZXJlbmNlczogU2hhcmVkUHJlZmVyZW5jZXMpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0ZWxlbWV0cnlTZXJ2aWNlKCk6IFRlbGVtZXRyeVNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0PFRlbGVtZXRyeVNlcnZpY2U+KEluamVjdGlvblRva2Vucy5URUxFTUVUUllfU0VSVklDRSk7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXAoZ3JvdXA6IEdyb3VwRGVwcmVjYXRlZCk6IE9ic2VydmFibGU8R3JvdXBEZXByZWNhdGVkPiB7XG4gICAgICAgIGdyb3VwLmdpZCA9IFVuaXF1ZUlkLmdlbmVyYXRlVW5pcXVlSWQoKTtcbiAgICAgICAgZ3JvdXAuY3JlYXRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgZ3JvdXAudXBkYXRlZEF0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuaW5zZXJ0KHtcbiAgICAgICAgICAgIHRhYmxlOiBHcm91cEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBtb2RlbEpzb246IEdyb3VwTWFwcGVyLm1hcEdyb3VwVG9Hcm91cERCRW50cnkoZ3JvdXApXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICB0YXAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0QWN0aXZlUHJvZmlsZVNlc3Npb24oKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKHNlc3Npb24pID0+IHNlc3Npb24udWlkKSxcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHVpZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmlkID0gdWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IudHlwZSA9IEFjdG9yLlRZUEVfU1lTVEVNO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdWRpdFJlcXVlc3Q6IFRlbGVtZXRyeUF1ZGl0UmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnY6ICdzZGsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZTogQXVkaXRTdGF0ZS5BVURJVF9DUkVBVEVELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRQcm9wZXJ0aWVzOiBPYmplY3RVdGlsLmdldFRydXRoeVByb3BzKGdyb3VwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpJZDogZ3JvdXAuZ2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialR5cGU6IE9iamVjdFR5cGUuR1JPVVBcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbGVtZXRyeVNlcnZpY2UuYXVkaXQoYXVkaXRSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKCkgPT4gZ3JvdXApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlR3JvdXAoZ2lkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgICAgICByZXR1cm4gZGVmZXIoKCkgPT4gb2YodGhpcy5kYlNlcnZpY2UuYmVnaW5UcmFuc2FjdGlvbigpKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gemlwKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRiU2VydmljZS5kZWxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IEdyb3VwRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7R3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9HSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbZ2lkXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HSUR9ID0gP2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbZ2lkXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24odHJ1ZSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChzZXNzaW9uOiBQcm9maWxlU2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmlkID0gc2Vzc2lvbi51aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci50eXBlID0gQWN0b3IuVFlQRV9TWVNURU07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF1ZGl0UmVxdWVzdDogVGVsZW1ldHJ5QXVkaXRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiBBdWRpdFN0YXRlLkFVRElUX0RFTEVURUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IGdpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBPYmplY3RUeXBlLkdST1VQXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmF1ZGl0KGF1ZGl0UmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlR3JvdXAoZ3JvdXA6IEdyb3VwRGVwcmVjYXRlZCk6IE9ic2VydmFibGU8R3JvdXBEZXByZWNhdGVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgIHRhYmxlOiBHcm91cEVudHJ5LlRBQkxFX05BTUUsXG4gICAgICAgICAgICBzZWxlY3Rpb246ICdnaWQgPSA/JyxcbiAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtncm91cC5naWRdLFxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyb3dzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyb3dzIHx8ICFyb3dzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBOb0dyb3VwRm91bmRFcnJvcihgTm8gR3JvdXAgZm91bmQgd2l0aCBJRCAke2dyb3VwLmdpZH1gKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdyb3VwTWFwcGVyLm1hcEdyb3VwREJFbnRyeVRvR3JvdXAocm93c1swXSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcChhc3luYyAocHJldkdyb3VwKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9maWxlU2VydmljZS5nZXRBY3RpdmVQcm9maWxlU2Vzc2lvbigpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKChzZXNzaW9uOiBQcm9maWxlU2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmlkID0gc2Vzc2lvbi51aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci50eXBlID0gQWN0b3IuVFlQRV9TWVNURU07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF1ZGl0UmVxdWVzdDogVGVsZW1ldHJ5QXVkaXRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogJ3NkaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiBBdWRpdFN0YXRlLkFVRElUX1VQREFURUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFByb3BlcnRpZXM6IE9iamVjdFV0aWwuZ2V0UHJvcERpZmYoZ3JvdXAsIHByZXZHcm91cCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IGdyb3VwLmdpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBPYmplY3RUeXBlLkdST1VQXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZWxlbWV0cnlTZXJ2aWNlLmF1ZGl0KGF1ZGl0UmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YWJsZTogR3JvdXBFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246ICdnaWQgPSA/JyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW2dyb3VwLmdpZF0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgW0dyb3VwRW50cnkuQ09MVU1OX05BTUVfTkFNRV06IGdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbR3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9TWUxMQUJVU106IGdyb3VwLnN5bGxhYnVzLmpvaW4oJywnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtHcm91cEVudHJ5LkNPTFVNTl9OQU1FX1VQREFURURfQVRdOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgW0dyb3VwRW50cnkuQ09MVU1OX05BTUVfR1JBREVdOiBncm91cC5ncmFkZS5qb2luKCcsJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBbR3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV9WQUxVRV06IEpTT04uc3RyaW5naWZ5KGdyb3VwLmdyYWRlVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXBUbyhncm91cClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVTZXNzaW9uR3JvdXAoKTogT2JzZXJ2YWJsZTxHcm91cERlcHJlY2F0ZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0aXZlR3JvdXBTZXNzaW9uKCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocHJvZmlsZVNlc3Npb246IEdyb3VwU2Vzc2lvbkRlcHJlY2F0ZWQgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXByb2ZpbGVTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0FjdGl2ZUdyb3VwU2Vzc2lvbkVycm9yKCdObyBhY3RpdmUgc2Vzc2lvbiBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZmlsZVNlc3Npb247XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChwcm9maWxlU2Vzc2lvbjogR3JvdXBTZXNzaW9uRGVwcmVjYXRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGU6IEdyb3VwRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBgJHtHcm91cEVudHJ5LkNPTFVNTl9OQU1FX0dJRH0gPSA/YCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQXJnczogW3Byb2ZpbGVTZXNzaW9uLmdpZF1cbiAgICAgICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoKHJvd3MpID0+IHJvd3MgJiYgcm93c1swXSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVTZXNzaW9uRm9yR3JvdXAoZ2lkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGJTZXJ2aWNlLnJlYWQoe1xuICAgICAgICAgICAgdGFibGU6IEdyb3VwRW50cnkuVEFCTEVfTkFNRSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7R3JvdXBFbnRyeS5DT0xVTU5fTkFNRV9HSUR9ID0gP2AsXG4gICAgICAgICAgICBzZWxlY3Rpb25BcmdzOiBbZ2lkXVxuICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyb3dzOiBHcm91cEVudHJ5LlNjaGVtYU1hcFtdKSA9PlxuICAgICAgICAgICAgICAgIHJvd3MgJiYgcm93c1swXSAmJiBHcm91cE1hcHBlci5tYXBHcm91cERCRW50cnlUb0dyb3VwKHJvd3NbMF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKChncm91cDogR3JvdXBEZXByZWNhdGVkIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Hcm91cEZvdW5kRXJyb3IoJ05vIFByb2ZpbGUgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1lcmdlTWFwKChncm91cDogR3JvdXBEZXByZWNhdGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZXNzaW9uID0gbmV3IEdyb3VwU2Vzc2lvbkRlcHJlY2F0ZWQoZ3JvdXAuZ2lkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRQcmVmZXJlbmNlcy5wdXRTdHJpbmcoR3JvdXBTZXJ2aWNlRGVwcmVjYXRlZEltcGwuS0VZX0dST1VQX1NFU1NJT04sIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZ2lkOiBncm91cFNlc3Npb24uZ2lkLFxuICAgICAgICAgICAgICAgICAgICBzaWQ6IGdyb3VwU2Vzc2lvbi5zaWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRUaW1lOiBncm91cFNlc3Npb24uY3JlYXRlZFRpbWVcbiAgICAgICAgICAgICAgICB9KSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwVG8odHJ1ZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVHcm91cFNlc3Npb24oKTogT2JzZXJ2YWJsZTxHcm91cFNlc3Npb25EZXByZWNhdGVkIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFByZWZlcmVuY2VzLmdldFN0cmluZyhHcm91cFNlcnZpY2VEZXByZWNhdGVkSW1wbC5LRVlfR1JPVVBfU0VTU0lPTikucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRBbGxHcm91cHMoZ3JvdXBSZXF1ZXN0PzogR2V0QWxsR3JvdXBSZXF1ZXN0RGVwcmVjYXRlZCk6IE9ic2VydmFibGU8R3JvdXBEZXByZWNhdGVkW10+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChncm91cFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYlNlcnZpY2UuZXhlY3V0ZShgXG4gICAgICAgICAgICAgICAgICAgIFNFTEVDVCAqIEZST00gJHtHcm91cEVudHJ5LlRBQkxFX05BTUV9XG4gICAgICAgICAgICAgICAgICAgIExFRlQgSk9JTiAke0dyb3VwUHJvZmlsZUVudHJ5LlRBQkxFX05BTUV9IE9OXG4gICAgICAgICAgICAgICAgICAgICR7R3JvdXBFbnRyeS5UQUJMRV9OQU1FfS4ke0dyb3VwRW50cnkuQ09MVU1OX05BTUVfR0lEfSA9XG4gICAgICAgICAgICAgICAgICAgICR7R3JvdXBQcm9maWxlRW50cnkuVEFCTEVfTkFNRX0uJHtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9HSUR9XG4gICAgICAgICAgICAgICAgICAgIFdIRVJFICR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfVUlEfSA9IFwiJHtncm91cFJlcXVlc3QhLnVpZH1cImBcbiAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoZ3JvdXBzOiBHcm91cEVudHJ5LlNjaGVtYU1hcFtdKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzLm1hcCgoZ3JvdXA6IEdyb3VwRW50cnkuU2NoZW1hTWFwKSA9PiBHcm91cE1hcHBlci5tYXBHcm91cERCRW50cnlUb0dyb3VwKGdyb3VwKSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5yZWFkKHtcbiAgICAgICAgICAgICAgICB0YWJsZTogR3JvdXBFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdXG4gICAgICAgICAgICB9KS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZ3JvdXBzOiBHcm91cEVudHJ5LlNjaGVtYU1hcFtdKSA9PlxuICAgICAgICAgICAgICAgICAgICBncm91cHMubWFwKChncm91cDogR3JvdXBFbnRyeS5TY2hlbWFNYXApID0+IEdyb3VwTWFwcGVyLm1hcEdyb3VwREJFbnRyeVRvR3JvdXAoZ3JvdXApKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoZ3JvdXBzOiBHcm91cERlcHJlY2F0ZWRbXSkgPT5cbiAgICAgICAgICAgICAgICBmcm9tKGdyb3VwcylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcCgoZ3JvdXA6IEdyb3VwRGVwcmVjYXRlZCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldEFsbFByb2ZpbGVzKHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXAuZ2lkXG4gICAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChwcm9maWxlcykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmdyb3VwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXNDb3VudDogcHJvZmlsZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZWR1Y2UoKGFsbFJlc3BvbnNlczogR3JvdXBEZXByZWNhdGVkW10sIGN1cnJlbnRSZXNwb25zZTogR3JvdXBEZXByZWNhdGVkKSA9PiBbLi4uYWxsUmVzcG9uc2VzLCBjdXJyZW50UmVzcG9uc2VdLCBbXSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIGFkZFByb2ZpbGVzVG9Hcm91cChwcm9maWxlVG9Hcm91cFJlcXVlc3Q6IFByb2ZpbGVzVG9Hcm91cFJlcXVlc3REZXByZWNhdGVkKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIGRlZmVyKCgpID0+IG9mKHRoaXMuZGJTZXJ2aWNlLmJlZ2luVHJhbnNhY3Rpb24oKSkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiB0aGlzLmRiU2VydmljZS5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogYCR7R3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR0lEfSA9ID9gLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkFyZ3M6IFtwcm9maWxlVG9Hcm91cFJlcXVlc3QuZ3JvdXBJZF1cbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXByb2ZpbGVUb0dyb3VwUmVxdWVzdC51aWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHppcChcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvZmlsZVRvR3JvdXBSZXF1ZXN0LnVpZExpc3QubWFwKCh1aWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRiU2VydmljZS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiBHcm91cFByb2ZpbGVFbnRyeS5UQUJMRV9OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsSnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbR3JvdXBQcm9maWxlRW50cnkuQ09MVU1OX05BTUVfR0lEXTogcHJvZmlsZVRvR3JvdXBSZXF1ZXN0Lmdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtHcm91cFByb2ZpbGVFbnRyeS5DT0xVTU5fTkFNRV9VSURdOiB1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcFRvKHByb2ZpbGVUb0dyb3VwUmVxdWVzdC51aWRMaXN0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGJTZXJ2aWNlLmVuZFRyYW5zYWN0aW9uKHRydWUpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYlNlcnZpY2UuZW5kVHJhbnNhY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmVBY3RpdmVHcm91cFNlc3Npb24oKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0aXZlR3JvdXBTZXNzaW9uKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChncm91cFNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkUHJlZmVyZW5jZXMucHV0U3RyaW5nKEdyb3VwU2VydmljZURlcHJlY2F0ZWRJbXBsLktFWV9HUk9VUF9TRVNTSU9OLCAnJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==