import * as dayjs from 'dayjs';
import { ProcessedEventModel } from '..';
import { UniqueId } from '../../db/util/unique-id';
var EventProcessor = /** @class */ (function () {
    function EventProcessor() {
    }
    EventProcessor.prototype.process = function (eventJsonArray) {
        var mesgId = UniqueId.generateUniqueId();
        var processedEventMap = {
            id: 'ekstep.telemetry',
            ver: '1.0',
            ts: this.formatCurrentDate(),
            params: this.getParams(mesgId),
            events: eventJsonArray
        };
        var model = new ProcessedEventModel();
        model.data = JSON.stringify(processedEventMap);
        model.msgId = mesgId;
    };
    EventProcessor.prototype.getParams = function (msgid) {
        return {
            did: window.device.uuid,
            msgid: msgid,
            key: '',
            requesterId: ''
        };
    };
    EventProcessor.prototype.formatCurrentDate = function () {
        return dayjs().format();
    };
    return EventProcessor;
}());
export { EventProcessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZWxlbWV0cnkvaW1wbC9wcm9jZXNzLWV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLElBQUksQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7SUFBQTtJQStCQSxDQUFDO0lBN0JHLGdDQUFPLEdBQVAsVUFBUSxjQUEwQjtRQUM5QixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxJQUFNLGlCQUFpQixHQUFHO1lBQ3RCLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsR0FBRyxFQUFFLEtBQUs7WUFDVixFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM5QixNQUFNLEVBQUUsY0FBYztTQUN6QixDQUFDO1FBRUYsSUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBRXpCLENBQUM7SUFFTyxrQ0FBUyxHQUFqQixVQUFrQixLQUFhO1FBQzNCLE9BQU87WUFDSCxHQUFHLEVBQVEsTUFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQzlCLEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLEVBQUU7WUFDUCxXQUFXLEVBQUUsRUFBRTtTQUNsQixDQUFDO0lBQ04sQ0FBQztJQUVPLDBDQUFpQixHQUF6QjtRQUNJLE9BQU8sS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7UHJvY2Vzc2VkRXZlbnRNb2RlbH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtVbmlxdWVJZH0gZnJvbSAnLi4vLi4vZGIvdXRpbC91bmlxdWUtaWQnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRQcm9jZXNzb3Ige1xuXG4gICAgcHJvY2VzcyhldmVudEpzb25BcnJheTogQXJyYXk8YW55Pikge1xuICAgICAgICBjb25zdCBtZXNnSWQgPSBVbmlxdWVJZC5nZW5lcmF0ZVVuaXF1ZUlkKCk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEV2ZW50TWFwID0ge1xuICAgICAgICAgICAgaWQ6ICdla3N0ZXAudGVsZW1ldHJ5JyxcbiAgICAgICAgICAgIHZlcjogJzEuMCcsXG4gICAgICAgICAgICB0czogdGhpcy5mb3JtYXRDdXJyZW50RGF0ZSgpLFxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldFBhcmFtcyhtZXNnSWQpLFxuICAgICAgICAgICAgZXZlbnRzOiBldmVudEpzb25BcnJheVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IFByb2Nlc3NlZEV2ZW50TW9kZWwoKTtcbiAgICAgICAgbW9kZWwuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHByb2Nlc3NlZEV2ZW50TWFwKTtcbiAgICAgICAgbW9kZWwubXNnSWQgPSBtZXNnSWQ7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhcmFtcyhtc2dpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaWQ6ICg8YW55PndpbmRvdykuZGV2aWNlLnV1aWQsXG4gICAgICAgICAgICBtc2dpZDogbXNnaWQsXG4gICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgcmVxdWVzdGVySWQ6ICcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRDdXJyZW50RGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGRheWpzKCkuZm9ybWF0KCk7XG4gICAgfVxuXG59XG4iXX0=