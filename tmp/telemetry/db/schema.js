import { DbConstants } from '../../db';
export var TelemetryEntry;
(function (TelemetryEntry) {
    TelemetryEntry._ID = '_id';
    TelemetryEntry.TABLE_NAME = 'telemetry';
    TelemetryEntry.COLUMN_NAME_EVENT_TYPE = 'event_type';
    TelemetryEntry.COLUMN_NAME_EVENT = 'event';
    TelemetryEntry.COLUMN_NAME_TIMESTAMP = 'timestamp';
    TelemetryEntry.COLUMN_NAME_PRIORITY = 'priority';
    TelemetryEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + TelemetryEntry.TABLE_NAME + ' (' +
            TelemetryEntry._ID + DbConstants.SPACE + ' INTEGER PRIMARY KEY,' +
            TelemetryEntry.COLUMN_NAME_EVENT_TYPE + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryEntry.COLUMN_NAME_EVENT + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryEntry.COLUMN_NAME_TIMESTAMP + DbConstants.SPACE + DbConstants.INT_TYPE + DbConstants.COMMA_SEP +
            TelemetryEntry.COLUMN_NAME_PRIORITY + DbConstants.SPACE + DbConstants.INT_TYPE +
            ' )';
    };
    TelemetryEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + TelemetryEntry.TABLE_NAME;
    };
})(TelemetryEntry || (TelemetryEntry = {}));
export var TelemetryProcessedEntry;
(function (TelemetryProcessedEntry) {
    TelemetryProcessedEntry._ID = '_id';
    TelemetryProcessedEntry.TABLE_NAME = 'processed_telemetry';
    TelemetryProcessedEntry.COLUMN_NAME_MSG_ID = 'msg_id';
    TelemetryProcessedEntry.COLUMN_NAME_DATA = 'data';
    TelemetryProcessedEntry.COLUMN_NAME_NUMBER_OF_EVENTS = 'event_count';
    TelemetryProcessedEntry.COLUMN_NAME_PRIORITY = 'priority';
    TelemetryProcessedEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + TelemetryProcessedEntry.TABLE_NAME + ' (' +
            TelemetryProcessedEntry._ID + ' INTEGER PRIMARY KEY,' +
            TelemetryProcessedEntry.COLUMN_NAME_MSG_ID + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryProcessedEntry.COLUMN_NAME_DATA + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryProcessedEntry.COLUMN_NAME_NUMBER_OF_EVENTS + DbConstants.SPACE + DbConstants.INT_TYPE + DbConstants.COMMA_SEP +
            TelemetryProcessedEntry.COLUMN_NAME_PRIORITY + DbConstants.SPACE + DbConstants.INT_TYPE +
            ' )';
    };
    TelemetryProcessedEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + TelemetryProcessedEntry.TABLE_NAME;
    };
})(TelemetryProcessedEntry || (TelemetryProcessedEntry = {}));
export var EventPriorityEntry;
(function (EventPriorityEntry) {
    EventPriorityEntry._ID = '_id';
    EventPriorityEntry.TABLE_NAME = 'event_priority';
    EventPriorityEntry.COLUMN_NAME_EVENT = 'event';
    EventPriorityEntry.COLUMN_NAME_PRIORITY = 'priority';
    EventPriorityEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + EventPriorityEntry.TABLE_NAME + ' (' +
            EventPriorityEntry._ID + ' INTEGER PRIMARY KEY,' +
            EventPriorityEntry.COLUMN_NAME_EVENT + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            EventPriorityEntry.COLUMN_NAME_PRIORITY + DbConstants.SPACE + DbConstants.INT_TYPE +
            ' )';
    };
    EventPriorityEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + EventPriorityEntry.TABLE_NAME;
    };
})(EventPriorityEntry || (EventPriorityEntry = {}));
export var TelemetryTagEntry;
(function (TelemetryTagEntry) {
    TelemetryTagEntry._ID = '_id';
    TelemetryTagEntry.TABLE_NAME = 'telemetry_tags';
    TelemetryTagEntry.COLUMN_NAME_NAME = 'name';
    TelemetryTagEntry.COLUMN_NAME_HASH = 'hash';
    TelemetryTagEntry.COLUMN_NAME_DESCRIPTION = 'description';
    TelemetryTagEntry.COLUMN_NAME_START_DATE = 'start_date';
    TelemetryTagEntry.COLUMN_NAME_END_DATE = 'end_date';
    TelemetryTagEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + TelemetryTagEntry.TABLE_NAME + ' (' +
            TelemetryTagEntry._ID + ' INTEGER PRIMARY KEY,' +
            TelemetryTagEntry.COLUMN_NAME_NAME + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryTagEntry.COLUMN_NAME_HASH + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryTagEntry.COLUMN_NAME_DESCRIPTION + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            TelemetryTagEntry.COLUMN_NAME_START_DATE + DbConstants.SPACE + DbConstants.DATE_TYPE + DbConstants.COMMA_SEP +
            TelemetryTagEntry.COLUMN_NAME_END_DATE + DbConstants.SPACE + DbConstants.DATE_TYPE +
            ' )';
    };
    TelemetryTagEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + TelemetryTagEntry.TABLE_NAME;
    };
})(TelemetryTagEntry || (TelemetryTagEntry = {}));
export var MetaEntry;
(function (MetaEntry) {
    MetaEntry._ID = '_id';
    MetaEntry.TABLE_NAME = 'meta_data';
    MetaEntry.COLUMN_NAME_MSG_ID = 'key';
    MetaEntry.COLUMN_NAME_DATA = 'value';
    MetaEntry.getCreateEntry = function () {
        return 'CREATE TABLE ' + MetaEntry.TABLE_NAME + ' (' +
            MetaEntry._ID + ' INTEGER PRIMARY KEY,' +
            MetaEntry.COLUMN_NAME_MSG_ID + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            MetaEntry.COLUMN_NAME_DATA + DbConstants.SPACE + DbConstants.TEXT_TYPE +
            ' )';
    };
    MetaEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + MetaEntry.TABLE_NAME;
    };
})(MetaEntry || (MetaEntry = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RlbGVtZXRyeS9kYi9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVyQyxNQUFNLEtBQVcsY0FBYyxDQThCOUI7QUE5QkQsV0FBaUIsY0FBYztJQUNkLGtCQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1oseUJBQVUsR0FBRyxXQUFXLENBQUM7SUFDekIscUNBQXNCLEdBQUcsWUFBWSxDQUFDO0lBQ3RDLGdDQUFpQixHQUFHLE9BQU8sQ0FBQztJQUM1QixvQ0FBcUIsR0FBRyxXQUFXLENBQUM7SUFDcEMsbUNBQW9CLEdBQUcsVUFBVSxDQUFDO0lBVWxDLDZCQUFjLEdBQW1CO1FBQzFDLE9BQU8sNkJBQTZCLEdBQUcsY0FBYyxDQUFDLFVBQVUsR0FBRyxJQUFJO1lBQ25FLGNBQWMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyx1QkFBdUI7WUFDaEUsY0FBYyxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUztZQUN6RyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTO1lBQ3BHLGNBQWMsQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVM7WUFDdkcsY0FBYyxDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVE7WUFDOUUsSUFBSSxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0lBRVcsNkJBQWMsR0FBbUI7UUFDMUMsT0FBTyx1QkFBdUIsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO0lBQy9ELENB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O1FBQzFDLE9BQU8sdUJBQXVCLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxDQUFDLENBQUM7QUFDTixDQUFDLEVBdkJnQixTQUFTLEtBQVQsU0FBUyxRQXVCekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RiQ29uc3RhbnRzfSBmcm9tICcuLi8uLi9kYic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVGVsZW1ldHJ5RW50cnkge1xuICAgIGV4cG9ydCBjb25zdCBfSUQgPSAnX2lkJztcbiAgICBleHBvcnQgY29uc3QgVEFCTEVfTkFNRSA9ICd0ZWxlbWV0cnknO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9FVkVOVF9UWVBFID0gJ2V2ZW50X3R5cGUnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9FVkVOVCA9ICdldmVudCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1RJTUVTVEFNUCA9ICd0aW1lc3RhbXAnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9QUklPUklUWSA9ICdwcmlvcml0eSc7XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1hcCB7XG4gICAgICAgIFtfSURdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9FVkVOVF9UWVBFXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfRVZFTlRdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9USU1FU1RBTVBdOiBudW1iZXI7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9QUklPUklUWV06IG51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Q3JlYXRlRW50cnk6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICcgKyBUZWxlbWV0cnlFbnRyeS5UQUJMRV9OQU1FICsgJyAoJyArXG4gICAgICAgICAgICBUZWxlbWV0cnlFbnRyeS5fSUQgKyBEYkNvbnN0YW50cy5TUEFDRSArICcgSU5URUdFUiBQUklNQVJZIEtFWSwnICtcbiAgICAgICAgICAgIFRlbGVtZXRyeUVudHJ5LkNPTFVNTl9OQU1FX0VWRU5UX1RZUEUgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBUZWxlbWV0cnlFbnRyeS5DT0xVTU5fTkFNRV9FVkVOVCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIFRlbGVtZXRyeUVudHJ5LkNPTFVNTl9OQU1FX1RJTUVTVEFNUCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgVGVsZW1ldHJ5RW50cnkuQ09MVU1OX05BTUVfUFJJT1JJVFkgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLklOVF9UWVBFICtcbiAgICAgICAgICAgICcgKSc7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXREZWxldGVFbnRyeTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAnRFJPUCBUQUJMRSBJRiBFWElTVFMgJyArIFRlbGVtZXRyeUVudHJ5LlRBQkxFX05BTUU7XG4gICAgfTtcblxufVxuXG5cbmV4cG9ydCBuYW1lc3BhY2UgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkge1xuXG4gICAgZXhwb3J0IGNvbnN0IF9JRCA9ICdfaWQnO1xuICAgIGV4cG9ydCBjb25zdCBUQUJMRV9OQU1FID0gJ3Byb2Nlc3NlZF90ZWxlbWV0cnknO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9NU0dfSUQgPSAnbXNnX2lkJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfREFUQSA9ICdkYXRhJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTlVNQkVSX09GX0VWRU5UUyA9ICdldmVudF9jb3VudCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1BSSU9SSVRZID0gJ3ByaW9yaXR5JztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWFwIHtcbiAgICAgICAgW19JRF06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX01TR19JRF06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0RBVEFdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9OVU1CRVJfT0ZfRVZFTlRTXTogbnVtYmVyO1xuICAgICAgICBbQ09MVU1OX05BTUVfUFJJT1JJVFldOiBudW1iZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAnICsgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuQ09MVU1OX05BTUVfTVNHX0lEICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgVGVsZW1ldHJ5UHJvY2Vzc2VkRW50cnkuQ09MVU1OX05BTUVfREFUQSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIFRlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LkNPTFVNTl9OQU1FX05VTUJFUl9PRl9FVkVOVFMgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLklOVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIFRlbGVtZXRyeVByb2Nlc3NlZEVudHJ5LkNPTFVNTl9OQU1FX1BSSU9SSVRZICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5JTlRfVFlQRSArXG4gICAgICAgICAgICAnICknO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0RGVsZXRlRW50cnk6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0RST1AgVEFCTEUgSUYgRVhJU1RTICcgKyBUZWxlbWV0cnlQcm9jZXNzZWRFbnRyeS5UQUJMRV9OQU1FO1xuICAgIH07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgRXZlbnRQcmlvcml0eUVudHJ5IHtcblxuICAgIGV4cG9ydCBjb25zdCBfSUQgPSAnX2lkJztcbiAgICBleHBvcnQgY29uc3QgVEFCTEVfTkFNRSA9ICdldmVudF9wcmlvcml0eSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0VWRU5UID0gJ2V2ZW50JztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfUFJJT1JJVFkgPSAncHJpb3JpdHknO1xuXG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Q3JlYXRlRW50cnk6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICcgKyBFdmVudFByaW9yaXR5RW50cnkuVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgRXZlbnRQcmlvcml0eUVudHJ5Ll9JRCArICcgSU5URUdFUiBQUklNQVJZIEtFWSwnICtcbiAgICAgICAgICAgIEV2ZW50UHJpb3JpdHlFbnRyeS5DT0xVTU5fTkFNRV9FVkVOVCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIEV2ZW50UHJpb3JpdHlFbnRyeS5DT0xVTU5fTkFNRV9QUklPUklUWSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgK1xuICAgICAgICAgICAgJyApJztcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldERlbGV0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdEUk9QIFRBQkxFIElGIEVYSVNUUyAnICsgRXZlbnRQcmlvcml0eUVudHJ5LlRBQkxFX05BTUU7XG4gICAgfTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBUZWxlbWV0cnlUYWdFbnRyeSB7XG5cbiAgICBleHBvcnQgY29uc3QgX0lEID0gJ19pZCc7XG4gICAgZXhwb3J0IGNvbnN0IFRBQkxFX05BTUUgPSAndGVsZW1ldHJ5X3RhZ3MnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9OQU1FID0gJ25hbWUnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9IQVNIID0gJ2hhc2gnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9ERVNDUklQVElPTiA9ICdkZXNjcmlwdGlvbic7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1NUQVJUX0RBVEUgPSAnc3RhcnRfZGF0ZSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0VORF9EQVRFID0gJ2VuZF9kYXRlJztcblxuXG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAnICsgVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfTkFNRSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0hBU0ggKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9ERVNDUklQVElPTiArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX1NUQVJUX0RBVEUgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLkRBVEVfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9FTkRfREFURSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuREFURV9UWVBFICtcbiAgICAgICAgICAgICcgKSc7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXREZWxldGVFbnRyeTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAnRFJPUCBUQUJMRSBJRiBFWElTVFMgJyArIFRBQkxFX05BTUU7XG4gICAgfTtcblxufVxuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFFbnRyeSB7XG5cbiAgICBleHBvcnQgY29uc3QgX0lEID0gJ19pZCc7XG4gICAgZXhwb3J0IGNvbnN0IFRBQkxFX05BTUUgPSAnbWV0YV9kYXRhJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTVNHX0lEID0gJ2tleSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0RBVEEgPSAndmFsdWUnO1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBTY2hlbWFNYXAge1xuICAgICAgICBbX0lEXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfTVNHX0lEXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfREFUQV06IHN0cmluZztcbiAgICB9XG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgJyArIE1ldGFFbnRyeS5UQUJMRV9OQU1FICsgJyAoJyArXG4gICAgICAgICAgICBNZXRhRW50cnkuX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgTWV0YUVudHJ5LkNPTFVNTl9OQU1FX01TR19JRCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIE1ldGFFbnRyeS5DT0xVTU5fTkFNRV9EQVRBICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgK1xuICAgICAgICAgICAgJyApJztcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldERlbGV0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdEUk9QIFRBQkxFIElGIEVYSVNUUyAnICsgTWV0YUVudHJ5LlRBQkxFX05BTUU7XG4gICAgfTtcbn1cbiJdfQ==