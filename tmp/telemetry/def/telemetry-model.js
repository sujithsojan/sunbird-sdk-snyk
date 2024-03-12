var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { ShareItemType } from './telemetry-constants';
import { NumberUtil } from '../../util/number-util';
var Actor = /** @class */ (function () {
    function Actor() {
        this.type = Actor.TYPE_USER;
    }
    Actor.TYPE_SYSTEM = 'System';
    Actor.TYPE_USER = 'User';
    return Actor;
}());
export { Actor };
var Context = /** @class */ (function () {
    function Context() {
    }
    return Context;
}());
export { Context };
var DeviceSpecification = /** @class */ (function () {
    function DeviceSpecification() {
        this.os = '';
        this.make = '';
        this.id = '';
        this.mem = -1.0;
        this.idisk = -1.0;
        this.edisk = -1.0;
        this.scrn = -1.0;
        this.cpu = '';
        this.sims = -1;
        this.cap = [];
    }
    return DeviceSpecification;
}());
export { DeviceSpecification };
var Etags = /** @class */ (function () {
    function Etags() {
    }
    return Etags;
}());
export { Etags };
var ExData = /** @class */ (function () {
    function ExData() {
    }
    return ExData;
}());
export { ExData };
// export class Feedback {
//     env: string;
//     rating: number;
//     comments: string;
//     id: string;
//     version: string;
//     type: string;
// }
var GameData = /** @class */ (function () {
    function GameData() {
    }
    return GameData;
}());
export { GameData };
var CorrelationData = /** @class */ (function () {
    function CorrelationData() {
    }
    return CorrelationData;
}());
export { CorrelationData };
var Rollup = /** @class */ (function () {
    function Rollup() {
    }
    return Rollup;
}());
export { Rollup };
var Visit = /** @class */ (function () {
    function Visit() {
    }
    return Visit;
}());
export { Visit };
var ProducerData = /** @class */ (function () {
    function ProducerData() {
    }
    ProducerData.prototype.ProducerData = function () {
        this.id = '';
        this.pid = '';
        this.ver = '';
    };
    return ProducerData;
}());
export { ProducerData };
var Search = /** @class */ (function () {
    function Search() {
    }
    return Search;
}());
export { Search };
// export class Share {
//     env: string;
//     direction: string;
//     dataType: string;
//     items: Array<{ [index: string]: any }>;
// }
var TelemetryObject = /** @class */ (function () {
    function TelemetryObject(id, type, version) {
        this.id = id;
        this.type = type;
        this.version = version;
    }
    TelemetryObject.prototype.setRollup = function (value) {
        this.rollup = value;
    };
    return TelemetryObject;
}());
export { TelemetryObject };
var ProcessedEventModel = /** @class */ (function () {
    function ProcessedEventModel() {
    }
    return ProcessedEventModel;
}());
export { ProcessedEventModel };
export var AuditState;
(function (AuditState) {
    AuditState["AUDIT_CREATED"] = "Created";
    AuditState["AUDIT_UPDATED"] = "Updated";
    AuditState["AUDIT_DELETED"] = "Deleted";
})(AuditState || (AuditState = {}));
export var SunbirdTelemetry;
(function (SunbirdTelemetry) {
    var Telemetry = /** @class */ (function () {
        function Telemetry(eid) {
            this.ver = Telemetry.TELEMETRY_VERSION;
            this.eid = eid;
            this.ets = Date.now();
            this.actor = new Actor();
            this.context = new Context();
            this.edata = {};
        }
        Telemetry.TELEMETRY_VERSION = '3.0';
        return Telemetry;
    }());
    SunbirdTelemetry.Telemetry = Telemetry;
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        function End(type, mode, duration, pageid, summaryList, env, objId, objType, objVer, rollup, correlationData) {
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollup === void 0) { rollup = {}; }
            if (correlationData === void 0) { correlationData = []; }
            var _this = _super.call(this, End.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign(__assign({}, (type ? { type: type } : {})), (duration ? { duration: duration } : {})), (pageid ? { pageid: pageid } : {})), (mode ? { mode: mode } : {})), (summaryList ? { summaryList: summaryList } : {}));
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = rollup;
            return _this;
        }
        End.EID = 'END';
        return End;
    }(Telemetry));
    SunbirdTelemetry.End = End;
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        function Start(type, dspec, loc, mode, duration, pageid, env, objId, objType, objVer, rollup, correlationData) {
            if (type === void 0) { type = ''; }
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollup === void 0) { rollup = {}; }
            if (correlationData === void 0) { correlationData = []; }
            var _this = _super.call(this, Start.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign(__assign(__assign({}, (type ? { type: type } : { type: '' })), (dspec ? { dspec: dspec } : {})), (loc ? { loc: loc } : {})), (mode ? { mode: mode } : {})), (duration ? { mode: mode } : {})), (pageid ? { pageid: pageid } : {}));
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = rollup ? rollup : {};
            return _this;
        }
        Start.EID = 'START';
        return Start;
    }(Telemetry));
    SunbirdTelemetry.Start = Start;
    var Summary = /** @class */ (function (_super) {
        __extends(Summary, _super);
        function Summary(type, starttime, endtime, timespent, pageviews, interactions, env, mode, envsummary, eventsummary, pagesummary, extra, correlationData, objId, objType, objVer, rollup) {
            if (correlationData === void 0) { correlationData = []; }
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollup === void 0) { rollup = {}; }
            var _this = _super.call(this, Summary.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign(__assign({ type: type, starttime: starttime, endtime: endtime, timespent: timespent, pageviews: pageviews, interactions: interactions }, (mode ? { mode: mode } : {})), (envsummary ? { envsummary: envsummary } : {})), (eventsummary ? { eventsummary: eventsummary } : {})), (pagesummary ? { pagesummary: pagesummary } : {})), (extra ? { extra: extra } : {}));
            // TODO need to check
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = rollup ? rollup : {};
            return _this;
        }
        Summary.EID = 'SUMMARY';
        return Summary;
    }(Telemetry));
    SunbirdTelemetry.Summary = Summary;
    var Interact = /** @class */ (function (_super) {
        __extends(Interact, _super);
        function Interact(type, subtype, id, pageid, pos, valuesMap, env, objId, objType, objVer, rollup, correlationData) {
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollup === void 0) { rollup = {}; }
            if (correlationData === void 0) { correlationData = []; }
            var _this = _super.call(this, Interact.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign({ type: type }, { subtype: subtype }), (id ? { id: id } : {})), (pageid ? { pageid: pageid } : {})), { extra: __assign(__assign({}, (pos ? { pos: pos } : {})), (valuesMap ? { values: [valuesMap] } : {})) });
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = rollup ? rollup : {};
            return _this;
        }
        Interact.EID = 'INTERACT';
        return Interact;
    }(Telemetry));
    SunbirdTelemetry.Interact = Interact;
    var Impression = /** @class */ (function (_super) {
        __extends(Impression, _super);
        function Impression(type, subtype, pageid, visits, env, objId, objType, objVer, rollup, correlationData) {
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollup === void 0) { rollup = {}; }
            if (correlationData === void 0) { correlationData = []; }
            var _this = _super.call(this, Impression.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign(__assign({}, (type ? { type: type } : { type: '' })), (subtype ? { subtype: subtype } : {})), (pageid ? { pageid: pageid } : {})), (pageid ? { uri: pageid } : {})), (visits ? { visits: visits } : {}));
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId ? objId : '', objType ? objType : '', objVer ? objVer : '');
            _this.object.rollup = rollup ? rollup : {};
            return _this;
        }
        Impression.EID = 'IMPRESSION';
        return Impression;
    }(Telemetry));
    SunbirdTelemetry.Impression = Impression;
    var Log = /** @class */ (function (_super) {
        __extends(Log, _super);
        function Log(type, level, message, pageid, params, env, actorType) {
            var _this = _super.call(this, Log.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign(__assign({}, (type ? { type: type } : { type: '' })), (level ? { level: level } : {})), (message ? { message: message } : {})), (pageid ? { pageid: pageid } : {})), (params ? { params: params } : {}));
            _this.context.env = env;
            var actor = new Actor();
            actor.type = actorType;
            _this.actor = actor;
            return _this;
        }
        Log.EID = 'LOG';
        return Log;
    }(Telemetry));
    SunbirdTelemetry.Log = Log;
    var Error = /** @class */ (function (_super) {
        __extends(Error, _super);
        function Error(errorCode, errorType, stacktrace, pageid) {
            var _this = _super.call(this, Error.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign({}, (errorCode ? { err: errorCode } : {})), (errorType ? { errtype: errorType } : {})), (stacktrace ? { stacktrace: stacktrace } : {})), (pageid ? { pageid: pageid } : {}));
            return _this;
        }
        Error.EID = 'ERROR';
        return Error;
    }(Telemetry));
    SunbirdTelemetry.Error = Error;
    var Interrupt = /** @class */ (function (_super) {
        __extends(Interrupt, _super);
        function Interrupt(type, pageid) {
            var _this = _super.call(this, Interrupt.EID) || this;
            _this.edata = __assign({ type: type }, (pageid ? { pageid: pageid } : {}));
            return _this;
        }
        Interrupt.EID = 'INTERRUPT';
        return Interrupt;
    }(Telemetry));
    SunbirdTelemetry.Interrupt = Interrupt;
    var Share = /** @class */ (function (_super) {
        __extends(Share, _super);
        function Share(dir, type, items, correlationData, objId, objType, objVer, rollUp) {
            if (correlationData === void 0) { correlationData = []; }
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (rollUp === void 0) { rollUp = new Rollup(); }
            var _this = _super.call(this, Share.EID) || this;
            _this.edata = __assign(__assign(__assign({}, (dir ? { dir: dir } : {})), (type ? { type: type } : {})), (items ? { items: items } : {}));
            _this.context.cdata = correlationData;
            _this.object = new TelemetryObject(objId ? objId : '', objType ? objType : '', objVer ? objVer : '');
            _this.object.rollup = rollUp;
            return _this;
        }
        Share.prototype.addItem = function (type, origin, identifier, pkgVersion, transferCount, size) {
            var item = {};
            item['origin'] = origin;
            item['id'] = identifier;
            item['type'] = this.capitalize(type.valueOf());
            if (type.valueOf() === ShareItemType.CONTENT.valueOf()
                || type.valueOf() === ShareItemType.EXPLODEDCONTENT.valueOf()) {
                item['ver'] = pkgVersion.toString();
                var paramsList = [];
                var param = {};
                param['transfers'] = NumberUtil.parseInt(transferCount);
                param['size'] = size;
                paramsList.push(param);
                item['params'] = paramsList;
            }
            var originMap = {};
            originMap['id'] = origin;
            originMap['type'] = 'Device';
            item['origin'] = originMap;
            this.edata.items.push(item);
        };
        Share.prototype.capitalize = function (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
        Share.EID = 'SHARE';
        return Share;
    }(Telemetry));
    SunbirdTelemetry.Share = Share;
    var Feedback = /** @class */ (function (_super) {
        __extends(Feedback, _super);
        function Feedback(rating, comments, env, objId, objType, objVer, commentid, commenttxt) {
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            var _this = _super.call(this, Feedback.EID) || this;
            _this.edata = __assign(__assign(__assign(__assign({}, (rating ? { rating: rating } : {})), (commentid ? { commentid: commentid } : {})), (commenttxt ? { commenttxt: commenttxt } : {})), (comments ? { comments: comments } : {}));
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = {};
            return _this;
        }
        Feedback.EID = 'FEEDBACK';
        return Feedback;
    }(Telemetry));
    SunbirdTelemetry.Feedback = Feedback;
    var Audit = /** @class */ (function (_super) {
        __extends(Audit, _super);
        function Audit(env, actor, currentState, updatedProperties, type, objId, objType, objVer, correlationData, rollup) {
            if (objId === void 0) { objId = ''; }
            if (objType === void 0) { objType = ''; }
            if (objVer === void 0) { objVer = ''; }
            if (correlationData === void 0) { correlationData = []; }
            if (rollup === void 0) { rollup = {}; }
            var _this = _super.call(this, Audit.EID) || this;
            _this.edata = __assign(__assign({ state: currentState }, (updatedProperties ? { props: updatedProperties } : {})), { type: type });
            _this.context.cdata = correlationData;
            _this.context.env = env;
            _this.object = new TelemetryObject(objId, objType, objVer);
            _this.object.rollup = rollup || {};
            _this.actor = actor;
            return _this;
        }
        Audit.EID = 'AUDIT';
        return Audit;
    }(Telemetry));
    SunbirdTelemetry.Audit = Audit;
})(SunbirdTelemetry || (SunbirdTelemetry = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsZW1ldHJ5LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RlbGVtZXRyeS9kZWYvdGVsZW1ldHJ5LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQ7SUFNSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBUGUsaUJBQVcsR0FBRyxRQUFRLENBQUM7SUFDdkIsZUFBUyxHQUFHLE1BQU0sQ0FBQztJQU92QyxZQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksS0FBSztBQXlCbEI7SUFBQTtJQVFBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7O0FBRUQ7SUFBQTtRQUNJLE9BQUUsR0FBRyxFQUFFLENBQUM7UUFDUixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLFFBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNYLFVBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNiLFVBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNiLFNBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUVaLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxTQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVixRQUFHLEdBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7QUFFRDtJQUFBO0lBSUEsQ0FBQztJQUFELFlBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7QUFFRDtJQUFBO0lBSUEsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7QUFFRCwwQkFBMEI7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LENBQUM7O1FBQ3ZCLENBQUM7UUF4QnVCLFNBQUcsR0FBRyxPQUFPLENBQUM7UUF5QjFDLFlBQUM7S0FBQSxBQTFCRCxDQUEyQixTQUFTLEdBMEJuQztJQTFCWSxzQkFBSyxRQTBCakIsQ0FBQTtBQUNMLENBQUMsRUF6V2dCLGdCQUFnQixLQUFoQixnQkFBZ0IsUUF5V2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2dMZXZlbCwgU2hhcmVJdGVtVHlwZX0gZnJvbSAnLi90ZWxlbWV0cnktY29uc3RhbnRzJztcbmltcG9ydCB7TnVtYmVyVXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9udW1iZXItdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBBY3RvciB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFRZUEVfU1lTVEVNID0gJ1N5c3RlbSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFRZUEVfVVNFUiA9ICdVc2VyJztcbiAgICBpZDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBBY3Rvci5UWVBFX1VTRVI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBSZXBvcnRTdW1tYXJ5IHtcbiAgICB1aWQ6IHN0cmluZztcbiAgICBjb250ZW50SWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFzdFVzZWRUaW1lOiBudW1iZXI7XG4gICAgbm9PZlF1ZXN0aW9uczogbnVtYmVyO1xuICAgIGNvcnJlY3RBbnN3ZXJzOiBudW1iZXI7XG4gICAgdG90YWxUaW1lc3BlbnQ6IG51bWJlcjtcbiAgICBoaWVyYXJjaHlEYXRhOiBzdHJpbmc7XG4gICAgdG90YWxNYXhTY29yZTogbnVtYmVyO1xuICAgIHRvdGFsU2NvcmU6IG51bWJlcjtcbiAgICB0b3RhbFF1ZXN0aW9uc1Njb3JlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBlbnY6IHN0cmluZztcbiAgICBjZGF0YTogQXJyYXk8Q29ycmVsYXRpb25EYXRhPjtcbiAgICBjaGFubmVsOiBzdHJpbmc7XG4gICAgcGRhdGE6IFByb2R1Y2VyRGF0YTtcbiAgICBzaWQ6IHN0cmluZztcbiAgICBkaWQ6IHN0cmluZztcbiAgICByb2xsdXA6IFJvbGx1cDtcbn1cblxuZXhwb3J0IGNsYXNzIERldmljZVNwZWNpZmljYXRpb24ge1xuICAgIG9zID0gJyc7XG4gICAgbWFrZSA9ICcnO1xuICAgIGlkID0gJyc7XG4gICAgbWVtID0gLTEuMDtcbiAgICBpZGlzayA9IC0xLjA7XG4gICAgZWRpc2sgPSAtMS4wO1xuICAgIHNjcm4gPSAtMS4wO1xuICAgIGNhbWVyYTogc3RyaW5nO1xuICAgIGNwdSA9ICcnO1xuICAgIHNpbXMgPSAtMTtcbiAgICBjYXA6IEFycmF5PHN0cmluZz4gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEV0YWdzIHtcbiAgICBhcHA6IEFycmF5PHN0cmluZz47XG4gICAgcGFydG5lcjogQXJyYXk8c3RyaW5nPjtcbiAgICBkaW1zOiBBcnJheTxzdHJpbmc+O1xufVxuXG5leHBvcnQgY2xhc3MgRXhEYXRhIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZGF0YTogc3RyaW5nO1xuXG59XG5cbi8vIGV4cG9ydCBjbGFzcyBGZWVkYmFjayB7XG4vLyAgICAgZW52OiBzdHJpbmc7XG4vLyAgICAgcmF0aW5nOiBudW1iZXI7XG4vLyAgICAgY29tbWVudHM6IHN0cmluZztcbi8vICAgICBpZDogc3RyaW5nO1xuLy8gICAgIHZlcnNpb246IHN0cmluZztcbi8vICAgICB0eXBlOiBzdHJpbmc7XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBHYW1lRGF0YSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB2ZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIENvcnJlbGF0aW9uRGF0YSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBSb2xsdXAge1xuICAgIGwxPzogc3RyaW5nO1xuICAgIGwyPzogc3RyaW5nO1xuICAgIGwzPzogc3RyaW5nO1xuICAgIGw0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVmlzaXQge1xuICAgIG9iamlkOiBzdHJpbmc7XG4gICAgb2JqdHlwZTogc3RyaW5nO1xuICAgIG9ianZlcjogc3RyaW5nO1xuICAgIHNlY3Rpb246IHN0cmluZztcbiAgICBpbmRleDogbnVtYmVyO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9kdWNlckRhdGEge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcGlkOiBzdHJpbmc7XG4gICAgdmVyOiBzdHJpbmc7XG5cbiAgICBQcm9kdWNlckRhdGEoKSB7XG4gICAgICAgIHRoaXMuaWQgPSAnJztcbiAgICAgICAgdGhpcy5waWQgPSAnJztcbiAgICAgICAgdGhpcy52ZXIgPSAnJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2gge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBxdWVyeTogc3RyaW5nO1xuICAgIGZpbHRlcnM6IHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfTtcbiAgICBzb3J0OiB7IFtpbmRleDogc3RyaW5nXTogYW55IH07XG4gICAgY29ycmVsYXRpb25pZDogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbn1cblxuLy8gZXhwb3J0IGNsYXNzIFNoYXJlIHtcbi8vICAgICBlbnY6IHN0cmluZztcbi8vICAgICBkaXJlY3Rpb246IHN0cmluZztcbi8vICAgICBkYXRhVHlwZTogc3RyaW5nO1xuLy8gICAgIGl0ZW1zOiBBcnJheTx7IFtpbmRleDogc3RyaW5nXTogYW55IH0+O1xuLy8gfVxuXG5leHBvcnQgY2xhc3MgVGVsZW1ldHJ5T2JqZWN0IHtcbiAgICBwdWJsaWMgcm9sbHVwPzogUm9sbHVwO1xuICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIHJlYWRvbmx5IHZlcnNpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Um9sbHVwKHZhbHVlOiBSb2xsdXApIHtcbiAgICAgICAgdGhpcy5yb2xsdXAgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9jZXNzZWRFdmVudE1vZGVsIHtcbiAgICBtc2dJZDogc3RyaW5nO1xuICAgIGRhdGE6IHN0cmluZztcbiAgICBudW1iZXJPZkV2ZW50czogbnVtYmVyO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIEF1ZGl0U3RhdGUge1xuICAgIEFVRElUX0NSRUFURUQgPSAnQ3JlYXRlZCcsXG4gICAgQVVESVRfVVBEQVRFRCA9ICdVcGRhdGVkJyxcbiAgICBBVURJVF9ERUxFVEVEID0gJ0RlbGV0ZWQnXG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3VuYmlyZFRlbGVtZXRyeSB7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRlbGVtZXRyeSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRFTEVNRVRSWV9WRVJTSU9OOiBzdHJpbmcgPSAnMy4wJztcblxuICAgICAgICBwdWJsaWMgZWlkOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBtaWQ6IHN0cmluZztcbiAgICAgICAgcHVibGljIGV0czogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgdmVyOiBzdHJpbmcgPSBUZWxlbWV0cnkuVEVMRU1FVFJZX1ZFUlNJT047XG4gICAgICAgIHB1YmxpYyBhY3RvcjogQWN0b3I7XG4gICAgICAgIHB1YmxpYyBjb250ZXh0OiBDb250ZXh0O1xuICAgICAgICBwdWJsaWMgb2JqZWN0OiBUZWxlbWV0cnlPYmplY3Q7XG4gICAgICAgIHB1YmxpYyBlZGF0YTogYW55O1xuICAgICAgICBwdWJsaWMgdGFnczogc3RyaW5nW107XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGVpZDogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVpZCA9IGVpZDtcbiAgICAgICAgICAgIHRoaXMuZXRzID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuYWN0b3IgPSBuZXcgQWN0b3IoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmVkYXRhID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRW5kIGV4dGVuZHMgVGVsZW1ldHJ5IHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUlEID0gJ0VORCc7XG5cbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlMaXN0OiB7fVtdIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpJZDogc3RyaW5nID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialZlcjogc3RyaW5nID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByb2xsdXA6IFJvbGx1cCA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBBcnJheTxDb3JyZWxhdGlvbkRhdGE+ID0gW10pIHtcbiAgICAgICAgICAgIHN1cGVyKEVuZC5FSUQpO1xuICAgICAgICAgICAgdGhpcy5lZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi4odHlwZSA/IHt0eXBlfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oZHVyYXRpb24gPyB7ZHVyYXRpb259IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihwYWdlaWQgPyB7cGFnZWlkfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4obW9kZSA/IHttb2RlfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oc3VtbWFyeUxpc3QgPyB7c3VtbWFyeUxpc3R9IDoge30pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNkYXRhID0gY29ycmVsYXRpb25EYXRhO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVudiA9IGVudjtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSBuZXcgVGVsZW1ldHJ5T2JqZWN0KG9iaklkLCBvYmpUeXBlLCBvYmpWZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3Qucm9sbHVwID0gcm9sbHVwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFN0YXJ0IGV4dGVuZHMgVGVsZW1ldHJ5IHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUlEID0gJ1NUQVJUJztcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgZHNwZWM6IERldmljZVNwZWNpZmljYXRpb24gfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGxvYzogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VpZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBlbnY6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgb2JqVmVyOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgcm9sbHVwOiBSb2xsdXAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBBcnJheTxDb3JyZWxhdGlvbkRhdGE+ID0gW10pIHtcbiAgICAgICAgICAgIHN1cGVyKFN0YXJ0LkVJRCk7XG4gICAgICAgICAgICB0aGlzLmVkYXRhID0ge1xuICAgICAgICAgICAgICAgIC4uLih0eXBlID8ge3R5cGV9IDoge3R5cGU6ICcnfSksXG4gICAgICAgICAgICAgICAgLi4uKGRzcGVjID8ge2RzcGVjfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4obG9jID8ge2xvY30gOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKG1vZGUgPyB7bW9kZX0gOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKGR1cmF0aW9uID8ge21vZGV9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihwYWdlaWQgPyB7cGFnZWlkfSA6IHt9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jZGF0YSA9IGNvcnJlbGF0aW9uRGF0YTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbnYgPSBlbnY7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IG5ldyBUZWxlbWV0cnlPYmplY3Qob2JqSWQsIG9ialR5cGUsIG9ialZlcik7XG4gICAgICAgICAgICB0aGlzLm9iamVjdC5yb2xsdXAgPSByb2xsdXAgPyByb2xsdXAgOiB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTdW1tYXJ5IGV4dGVuZHMgVGVsZW1ldHJ5IHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUlEID0gJ1NVTU1BUlknO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgc3RhcnR0aW1lOiBudW1iZXIsXG4gICAgICAgICAgICBlbmR0aW1lOiBudW1iZXIsXG4gICAgICAgICAgICB0aW1lc3BlbnQ6IG51bWJlcixcbiAgICAgICAgICAgIHBhZ2V2aWV3czogbnVtYmVyLFxuICAgICAgICAgICAgaW50ZXJhY3Rpb25zOiBudW1iZXIsXG4gICAgICAgICAgICBlbnY6IHN0cmluZyxcbiAgICAgICAgICAgIG1vZGU/OiBzdHJpbmcsXG4gICAgICAgICAgICBlbnZzdW1tYXJ5Pzoge1xuICAgICAgICAgICAgICAgIGVudjogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHRpbWVzcGVudDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHZpc2l0czogbnVtYmVyXG4gICAgICAgICAgICB9W10sXG4gICAgICAgICAgICBldmVudHN1bW1hcnk/OiB7XG4gICAgICAgICAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBjb3VudDogbnVtYmVyXG4gICAgICAgICAgICB9IFtdLFxuICAgICAgICAgICAgcGFnZXN1bW1hcnk/OiB7XG4gICAgICAgICAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZW52OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgdGltZXNwZW50OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgdmlzaXRzOiBudW1iZXJcbiAgICAgICAgICAgIH1bXSxcbiAgICAgICAgICAgIGV4dHJhPzoge1xuICAgICAgICAgICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0cmluZ1xuICAgICAgICAgICAgfVtdLFxuICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBBcnJheTxDb3JyZWxhdGlvbkRhdGE+ID0gW10sXG4gICAgICAgICAgICBvYmpJZDogc3RyaW5nID0gJycsXG4gICAgICAgICAgICBvYmpUeXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgIG9ialZlcjogc3RyaW5nID0gJycsXG4gICAgICAgICAgICByb2xsdXA6IFJvbGx1cCA9IHt9LFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHN1cGVyKFN1bW1hcnkuRUlEKTtcbiAgICAgICAgICAgIHRoaXMuZWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSwgc3RhcnR0aW1lLCBlbmR0aW1lLCB0aW1lc3BlbnQsIHBhZ2V2aWV3cywgaW50ZXJhY3Rpb25zLFxuICAgICAgICAgICAgICAgIC4uLihtb2RlID8ge21vZGV9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihlbnZzdW1tYXJ5ID8ge2VudnN1bW1hcnl9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihldmVudHN1bW1hcnkgPyB7ZXZlbnRzdW1tYXJ5fSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4ocGFnZXN1bW1hcnkgPyB7cGFnZXN1bW1hcnl9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihleHRyYSA/IHtleHRyYX0gOiB7fSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBUT0RPIG5lZWQgdG8gY2hlY2tcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jZGF0YSA9IGNvcnJlbGF0aW9uRGF0YTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5lbnYgPSBlbnY7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IG5ldyBUZWxlbWV0cnlPYmplY3Qob2JqSWQsIG9ialR5cGUsIG9ialZlcik7XG4gICAgICAgICAgICB0aGlzLm9iamVjdC5yb2xsdXAgPSByb2xsdXAgPyByb2xsdXAgOiB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcmFjdCBleHRlbmRzIFRlbGVtZXRyeSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVJRCA9ICdJTlRFUkFDVCc7XG5cbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VpZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBwb3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1bXSB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBlbnY6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgb2JqVmVyOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgcm9sbHVwOiBSb2xsdXAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgY29ycmVsYXRpb25EYXRhOiBBcnJheTxDb3JyZWxhdGlvbkRhdGE+ID0gW10pIHtcbiAgICAgICAgICAgIHN1cGVyKEludGVyYWN0LkVJRCk7XG4gICAgICAgICAgICB0aGlzLmVkYXRhID0ge1xuICAgICAgICAgICAgICAgIC4uLnt0eXBlfSxcbiAgICAgICAgICAgICAgICAuLi57c3VidHlwZX0sXG4gICAgICAgICAgICAgICAgLi4uKGlkID8ge2lkfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4ocGFnZWlkID8ge3BhZ2VpZH0gOiB7fSksXG4gICAgICAgICAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKHBvcyA/IHtwb3N9IDoge30pLFxuICAgICAgICAgICAgICAgICAgICAuLi4odmFsdWVzTWFwID8ge3ZhbHVlczogW3ZhbHVlc01hcF19IDoge30pLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2RhdGEgPSBjb3JyZWxhdGlvbkRhdGE7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW52ID0gZW52O1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSBuZXcgVGVsZW1ldHJ5T2JqZWN0KG9iaklkLCBvYmpUeXBlLCBvYmpWZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3Qucm9sbHVwID0gcm9sbHVwID8gcm9sbHVwIDoge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgSW1wcmVzc2lvbiBleHRlbmRzIFRlbGVtZXRyeSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVJRCA9ICdJTVBSRVNTSU9OJztcblxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZWlkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdHM6IFZpc2l0W10gfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBlbnY6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iaklkOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialR5cGU6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqVmVyOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGx1cDogUm9sbHVwID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWxhdGlvbkRhdGE6IEFycmF5PENvcnJlbGF0aW9uRGF0YT4gPSBbXSkge1xuICAgICAgICAgICAgc3VwZXIoSW1wcmVzc2lvbi5FSUQpO1xuICAgICAgICAgICAgdGhpcy5lZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi4odHlwZSA/IHt0eXBlfSA6IHt0eXBlOiAnJ30pLFxuICAgICAgICAgICAgICAgIC4uLihzdWJ0eXBlID8ge3N1YnR5cGV9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihwYWdlaWQgPyB7cGFnZWlkfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4ocGFnZWlkID8ge3VyaTogcGFnZWlkfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4odmlzaXRzID8ge3Zpc2l0c30gOiB7fSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNkYXRhID0gY29ycmVsYXRpb25EYXRhO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmVudiA9IGVudjtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0ID0gbmV3IFRlbGVtZXRyeU9iamVjdChvYmpJZCA/IG9iaklkIDogJycsIG9ialR5cGUgPyBvYmpUeXBlIDogJycsIG9ialZlciA/IG9ialZlciA6ICcnKTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnJvbGx1cCA9IHJvbGx1cCA/IHJvbGx1cCA6IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIExvZyBleHRlbmRzIFRlbGVtZXRyeSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVJRCA9ICdMT0cnO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IExvZ0xldmVsIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VpZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHt9W10gfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGVudjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBhY3RvclR5cGUpIHtcbiAgICAgICAgICAgIHN1cGVyKExvZy5FSUQpO1xuICAgICAgICAgICAgdGhpcy5lZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi4odHlwZSA/IHt0eXBlfSA6IHt0eXBlOiAnJ30pLFxuICAgICAgICAgICAgICAgIC4uLihsZXZlbCA/IHtsZXZlbH0gOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKG1lc3NhZ2UgPyB7bWVzc2FnZX0gOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKHBhZ2VpZCA/IHtwYWdlaWR9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihwYXJhbXMgPyB7cGFyYW1zfSA6IHt9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW52ID0gZW52O1xuICAgICAgICAgICAgY29uc3QgYWN0b3I6IEFjdG9yID0gbmV3IEFjdG9yKCk7XG4gICAgICAgICAgICBhY3Rvci50eXBlID0gYWN0b3JUeXBlO1xuICAgICAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEVycm9yIGV4dGVuZHMgVGVsZW1ldHJ5IHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUlEID0gJ0VSUk9SJztcblxuICAgICAgICBjb25zdHJ1Y3RvcihlcnJvckNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrdHJhY2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgcGFnZWlkOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN1cGVyKEVycm9yLkVJRCk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgLi4uKGVycm9yQ29kZSA/IHtlcnI6IGVycm9yQ29kZX0gOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKGVycm9yVHlwZSA/IHtlcnJ0eXBlOiBlcnJvclR5cGV9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihzdGFja3RyYWNlID8ge3N0YWNrdHJhY2V9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihwYWdlaWQgPyB7cGFnZWlkfSA6IHt9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgSW50ZXJydXB0IGV4dGVuZHMgVGVsZW1ldHJ5IHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRUlEID0gJ0lOVEVSUlVQVCc7XG5cbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBwYWdlaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3VwZXIoSW50ZXJydXB0LkVJRCk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ue3R5cGV9LFxuICAgICAgICAgICAgICAgIC4uLihwYWdlaWQgPyB7cGFnZWlkfSA6IHt9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTaGFyZSBleHRlbmRzIFRlbGVtZXRyeSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVJRCA9ICdTSEFSRSc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZGlyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IEFycmF5PHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfT4gfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogQXJyYXk8Q29ycmVsYXRpb25EYXRhPiA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBvYmpJZDogc3RyaW5nID0gJycsXG4gICAgICAgICAgICAgICAgICAgIG9ialR5cGU6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBvYmpWZXI6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICByb2xsVXA6IFJvbGx1cCA9IG5ldyBSb2xsdXAoKSkge1xuICAgICAgICAgICAgc3VwZXIoU2hhcmUuRUlEKTtcblxuICAgICAgICAgICAgdGhpcy5lZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oZGlyID8ge2RpcjogZGlyfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4odHlwZSA/IHt0eXBlOiB0eXBlfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oaXRlbXMgPyB7aXRlbXM6IGl0ZW1zfSA6IHt9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jZGF0YSA9IGNvcnJlbGF0aW9uRGF0YTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0ID0gbmV3IFRlbGVtZXRyeU9iamVjdChvYmpJZCA/IG9iaklkIDogJycsIG9ialR5cGUgPyBvYmpUeXBlIDogJycsIG9ialZlciA/IG9ialZlciA6ICcnKTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnJvbGx1cCA9IHJvbGxVcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEl0ZW0odHlwZTogU2hhcmVJdGVtVHlwZSB8IHN0cmluZywgb3JpZ2luOiBzdHJpbmcsIGlkZW50aWZpZXI6IHN0cmluZywgcGtnVmVyc2lvbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyQ291bnQ6IG51bWJlciwgc2l6ZTogc3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtOiB7IFtpbmRleDogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgICAgICAgIGl0ZW1bJ29yaWdpbiddID0gb3JpZ2luO1xuICAgICAgICAgICAgaXRlbVsnaWQnXSA9IGlkZW50aWZpZXI7XG4gICAgICAgICAgICBpdGVtWyd0eXBlJ10gPSB0aGlzLmNhcGl0YWxpemUodHlwZS52YWx1ZU9mKCkpO1xuICAgICAgICAgICAgaWYgKHR5cGUudmFsdWVPZigpID09PSBTaGFyZUl0ZW1UeXBlLkNPTlRFTlQudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgfHwgdHlwZS52YWx1ZU9mKCkgPT09IFNoYXJlSXRlbVR5cGUuRVhQTE9ERURDT05URU5ULnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1bJ3ZlciddID0gcGtnVmVyc2lvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtc0xpc3Q6IEFycmF5PHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfT4gPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbTogeyBbaW5kZXg6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgICAgICAgICAgcGFyYW1bJ3RyYW5zZmVycyddID0gTnVtYmVyVXRpbC5wYXJzZUludCh0cmFuc2ZlckNvdW50KTtcbiAgICAgICAgICAgICAgICBwYXJhbVsnc2l6ZSddID0gc2l6ZTtcbiAgICAgICAgICAgICAgICBwYXJhbXNMaXN0LnB1c2gocGFyYW0pO1xuICAgICAgICAgICAgICAgIGl0ZW1bJ3BhcmFtcyddID0gcGFyYW1zTGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbk1hcDogeyBbaW5kZXg6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgICAgICBvcmlnaW5NYXBbJ2lkJ10gPSBvcmlnaW47XG4gICAgICAgICAgICBvcmlnaW5NYXBbJ3R5cGUnXSA9ICdEZXZpY2UnO1xuICAgICAgICAgICAgaXRlbVsnb3JpZ2luJ10gPSBvcmlnaW5NYXA7XG5cbiAgICAgICAgICAgIHRoaXMuZWRhdGEuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhcGl0YWxpemUoaW5wdXQpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRmVlZGJhY2sgZXh0ZW5kcyBUZWxlbWV0cnkge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFSUQgPSAnRkVFREJBQ0snO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHJhdGluZzogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBlbnY6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgb2JqSWQ6IHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBvYmpUeXBlOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgb2JqVmVyOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudGlkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnR0eHQ6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3VwZXIoRmVlZGJhY2suRUlEKTtcblxuICAgICAgICAgICAgdGhpcy5lZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi4ocmF0aW5nID8ge3JhdGluZzogcmF0aW5nfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oY29tbWVudGlkID8ge2NvbW1lbnRpZDogY29tbWVudGlkfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oY29tbWVudHR4dCA/IHtjb21tZW50dHh0OiBjb21tZW50dHh0fSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi4oY29tbWVudHMgPyB7Y29tbWVudHM6IGNvbW1lbnRzfSA6IHt9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW52ID0gZW52O1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSBuZXcgVGVsZW1ldHJ5T2JqZWN0KG9iaklkLCBvYmpUeXBlLCBvYmpWZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3Qucm9sbHVwID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQXVkaXQgZXh0ZW5kcyBUZWxlbWV0cnkge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFSUQgPSAnQVVESVQnO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGVudjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBhY3RvcjogQWN0b3IsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZTogQXVkaXRTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFByb3BlcnRpZXM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIG9iaklkOiBzdHJpbmcgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgb2JqVHlwZTogc3RyaW5nID0gJycsXG4gICAgICAgICAgICAgICAgICAgIG9ialZlcjogc3RyaW5nID0gJycsXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlbGF0aW9uRGF0YTogQXJyYXk8Q29ycmVsYXRpb25EYXRhPiA9IFtdLFxuICAgICAgICAgICAgICAgICAgICByb2xsdXA6IFJvbGx1cCA9IHt9KSB7XG4gICAgICAgICAgICBzdXBlcihBdWRpdC5FSUQpO1xuXG4gICAgICAgICAgICB0aGlzLmVkYXRhID0ge1xuICAgICAgICAgICAgICAgIC4uLntzdGF0ZTogY3VycmVudFN0YXRlfSxcbiAgICAgICAgICAgICAgICAuLi4odXBkYXRlZFByb3BlcnRpZXMgPyB7cHJvcHM6IHVwZGF0ZWRQcm9wZXJ0aWVzfSA6IHt9KSxcbiAgICAgICAgICAgICAgICAuLi57dHlwZX1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2RhdGEgPSBjb3JyZWxhdGlvbkRhdGE7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZW52ID0gZW52O1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSBuZXcgVGVsZW1ldHJ5T2JqZWN0KG9iaklkLCBvYmpUeXBlLCBvYmpWZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3Qucm9sbHVwID0gcm9sbHVwIHx8IHt9O1xuICAgICAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19