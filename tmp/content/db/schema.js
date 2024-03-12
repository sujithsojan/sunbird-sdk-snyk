import { DbConstants } from '../../db';
export var ContentEntry;
(function (ContentEntry) {
    ContentEntry.TABLE_NAME = 'content';
    ContentEntry._ID = '_id';
    ContentEntry.COLUMN_NAME_IDENTIFIER = 'identifier';
    ContentEntry.COLUMN_NAME_SERVER_DATA = 'server_data';
    ContentEntry.COLUMN_NAME_LOCAL_DATA = 'local_data';
    ContentEntry.COLUMN_NAME_MIME_TYPE = 'mime_type';
    ContentEntry.COLUMN_NAME_PATH = 'path';
    ContentEntry.COLUMN_NAME_INDEX = 'search_index';
    ContentEntry.COLUMN_NAME_VISIBILITY = 'visibility'; // Visibility could be Default or Parent
    ContentEntry.COLUMN_NAME_SERVER_LAST_UPDATED_ON = 'server_last_updated_on';
    ContentEntry.COLUMN_NAME_LOCAL_LAST_UPDATED_ON = 'local_last_updated_on';
    ContentEntry.COLUMN_NAME_MANIFEST_VERSION = 'manifest_version';
    ContentEntry.COLUMN_NAME_REF_COUNT = 'ref_count';
    ContentEntry.COLUMN_NAME_CONTENT_STATE = 'content_state'; // 0 - Seen but not available (only serverData will be available),
    // 1 - Only spine, 2 - Artifact available
    ContentEntry.COLUMN_NAME_CONTENT_TYPE = 'content_type'; // Content type could be story,
    // worksheet, game, collection, textbook.
    ContentEntry.COLUMN_NAME_AUDIENCE = 'audience'; // learner, instructor
    ContentEntry.COLUMN_NAME_PRAGMA = 'pragma'; // external, ads
    ContentEntry.COLUMN_NAME_UID = 'uid'; // list of comma separated uid
    ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE = 'size_on_device'; // list of comma separated uid
    ContentEntry.COLUMN_NAME_BOARD = 'board';
    ContentEntry.COLUMN_NAME_MEDIUM = 'medium';
    ContentEntry.COLUMN_NAME_GRADE = 'grade';
    ContentEntry.COLUMN_NAME_DIALCODES = 'dialcodes';
    ContentEntry.COLUMN_NAME_CHILD_NODES = 'child_nodes';
    ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY = 'primary_category';
    ContentEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + ContentEntry.TABLE_NAME + ' (' +
            ContentEntry._ID + ' INTEGER PRIMARY KEY,' +
            ContentEntry.COLUMN_NAME_IDENTIFIER + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' UNIQUE NOT NULL' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_SERVER_DATA + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_LOCAL_DATA + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_MIME_TYPE + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_PATH + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_INDEX + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_VISIBILITY + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_SERVER_LAST_UPDATED_ON + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_LOCAL_LAST_UPDATED_ON + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_REF_COUNT + DbConstants.SPACE + DbConstants.INT_TYPE + ' NOT NULL DEFAULT 1' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_CONTENT_STATE + DbConstants.SPACE + DbConstants.INT_TYPE + ' NOT NULL DEFAULT 2' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_CONTENT_TYPE + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_AUDIENCE + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' DEFAULT \'Learner\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE + DbConstants.SPACE + DbConstants.INT_TYPE + ' NOT NULL DEFAULT 0' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_PRAGMA + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_BOARD + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_MEDIUM + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_GRADE + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_MANIFEST_VERSION + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_DIALCODES + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_CHILD_NODES + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' +
            ' )';
    };
    ContentEntry.getDeleteEntry = function () {
        return 'DROP TABLE IF EXISTS ' + ContentEntry.TABLE_NAME;
    };
    ContentEntry.getAlterEntryForContentSize = function () {
        return 'ALTER TABLE ' + ContentEntry.TABLE_NAME + ' ADD COLUMN ' + ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE + DbConstants.INT_TYPE + ' NOT NULL DEFAULT 0;';
    };
    ContentEntry.getAlterEntryForPragma = function () {
        return 'ALTER TABLE ' + ContentEntry.TABLE_NAME + ' ADD COLUMN ' + ContentEntry.COLUMN_NAME_PRAGMA + DbConstants.TEXT_TYPE + ' DEFAULT \'\';';
    };
    ContentEntry.getAlterEntryForBoard = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_BOARD + " TEXT DEFAULT ''";
    };
    ContentEntry.getAlterEntryForMedium = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_MEDIUM + " TEXT DEFAULT ''";
    };
    ContentEntry.getAlterEntryForGrade = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_GRADE + " TEXT DEFAULT ''";
    };
    ContentEntry.getAlterEntryForDialCode = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_DIALCODES + " TEXT DEFAULT ''";
    };
    ContentEntry.getAlterEntryForChildNodes = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_CHILD_NODES + " TEXT DEFAULT ''";
    };
    ContentEntry.getAlterEntryForPrimaryCategory = function () {
        return "ALTER TABLE " + ContentEntry.TABLE_NAME + " ADD COLUMN " + ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY + " TEXT DEFAULT ''";
    };
})(ContentEntry || (ContentEntry = {}));
export var ContentAccessEntry;
(function (ContentAccessEntry) {
    ContentAccessEntry._ID = '_id';
    ContentAccessEntry.TABLE_NAME = 'content_access';
    ContentAccessEntry.COLUMN_NAME_UID = 'uid';
    ContentAccessEntry.COLUMN_NAME_CONTENT_IDENTIFIER = 'identifier';
    ContentAccessEntry.COLUMN_NAME_EPOCH_TIMESTAMP = 'epoch_timestamp';
    ContentAccessEntry.COLUMN_NAME_STATUS = 'status'; // viewed = 1, partiallyPlayed = 2, fullyPlayed = 3
    ContentAccessEntry.COLUMN_NAME_CONTENT_TYPE = 'content_type';
    ContentAccessEntry.COLUMN_NAME_LEARNER_STATE = 'learner_state';
    ContentAccessEntry.COLUMN_NAME_PRIMARY_CATEGORY = 'primary_category';
    ContentAccessEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + ContentAccessEntry.TABLE_NAME + ' (' +
            ContentAccessEntry._ID + ' INTEGER PRIMARY KEY,' +
            ContentAccessEntry.COLUMN_NAME_UID + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentAccessEntry.COLUMN_NAME_CONTENT_IDENTIFIER + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentAccessEntry.COLUMN_NAME_EPOCH_TIMESTAMP + DbConstants.SPACE + DbConstants.INT_TYPE + DbConstants.COMMA_SEP +
            ContentAccessEntry.COLUMN_NAME_STATUS + DbConstants.SPACE + DbConstants.INT_TYPE + DbConstants.COMMA_SEP +
            ContentAccessEntry.COLUMN_NAME_CONTENT_TYPE + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentAccessEntry.COLUMN_NAME_LEARNER_STATE + DbConstants.SPACE + DbConstants.BLOB_TYPE +
            ' )';
    };
    ContentAccessEntry.deleteTable = function () {
        return 'DROP TABLE IF EXISTS ' + ContentAccessEntry.TABLE_NAME;
    };
    ContentAccessEntry.getAlterEntryForPrimaryCategory = function () {
        return "ALTER TABLE " + ContentAccessEntry.TABLE_NAME + " ADD COLUMN " + ContentAccessEntry.COLUMN_NAME_PRIMARY_CATEGORY + " TEXT DEFAULT ''";
    };
})(ContentAccessEntry || (ContentAccessEntry = {}));
export var ContentFeedbackEntry;
(function (ContentFeedbackEntry) {
    ContentFeedbackEntry._ID = '_id';
    ContentFeedbackEntry.TABLE_NAME = 'feedback';
    ContentFeedbackEntry.COLUMN_NAME_CONTENT_ID = 'identifier';
    ContentFeedbackEntry.COLUMN_NAME_UID = 'uid';
    ContentFeedbackEntry.COLUMN_NAME_RATING = 'rating';
    ContentFeedbackEntry.COLUMN_NAME_COMMENTS = 'comments';
    ContentFeedbackEntry.COLUMN_NAME_CREATED_AT = 'createdAt';
    ContentFeedbackEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + ContentFeedbackEntry.TABLE_NAME + ' (' +
            ContentFeedbackEntry._ID + ' INTEGER PRIMARY KEY,' +
            ContentFeedbackEntry.COLUMN_NAME_CONTENT_ID + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentFeedbackEntry.COLUMN_NAME_UID + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentFeedbackEntry.COLUMN_NAME_RATING + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentFeedbackEntry.COLUMN_NAME_COMMENTS + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentFeedbackEntry.COLUMN_NAME_CREATED_AT + DbConstants.SPACE + DbConstants.INT_TYPE +
            ' )';
    };
    ContentFeedbackEntry.deleteTable = function () {
        return 'DROP TABLE IF EXISTS ' + ContentFeedbackEntry.TABLE_NAME;
    };
})(ContentFeedbackEntry || (ContentFeedbackEntry = {}));
export var ContentMarkerEntry;
(function (ContentMarkerEntry) {
    ContentMarkerEntry._ID = '_id';
    ContentMarkerEntry.TABLE_NAME = 'content_marker';
    ContentMarkerEntry.COLUMN_NAME_UID = 'uid';
    ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER = 'identifier';
    ContentMarkerEntry.COLUMN_NAME_EPOCH_TIMESTAMP = 'epoch_timestamp';
    ContentMarkerEntry.COLUMN_NAME_DATA = 'data';
    ContentMarkerEntry.COLUMN_NAME_EXTRA_INFO = 'extra_info';
    ContentMarkerEntry.COLUMN_NAME_MARKER = 'marker';
    ContentMarkerEntry.COLUMN_NAME_MIME_TYPE = 'mime_type';
    ContentMarkerEntry.getCreateEntry = function () {
        return 'CREATE TABLE IF NOT EXISTS ' + ContentMarkerEntry.TABLE_NAME + ' (' +
            ContentMarkerEntry._ID + ' INTEGER PRIMARY KEY,' +
            ContentMarkerEntry.COLUMN_NAME_UID + DbConstants.SPACE + DbConstants.TEXT_TYPE + ' NOT NULL' + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_CONTENT_IDENTIFIER + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_EPOCH_TIMESTAMP + DbConstants.SPACE + DbConstants.INT_TYPE + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_DATA + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_EXTRA_INFO + DbConstants.SPACE + DbConstants.TEXT_TYPE + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_MIME_TYPE + DbConstants.SPACE + DbConstants.TEXT_TYPE + '  DEFAULT \'\'' + DbConstants.COMMA_SEP +
            ContentMarkerEntry.COLUMN_NAME_MARKER + DbConstants.SPACE + DbConstants.INT_TYPE +
            ' )';
    };
    ContentMarkerEntry.deleteTable = function () {
        return 'DROP TABLE IF EXISTS ' + ContentMarkerEntry.TABLE_NAME;
    };
    ContentMarkerEntry.getAlterEntryForMimeType = function () {
        return "ALTER TABLE " + ContentMarkerEntry.TABLE_NAME + " ADD COLUMN " + ContentMarkerEntry.COLUMN_NAME_MIME_TYPE + " TEXT DEFAULT ''";
    };
})(ContentMarkerEntry || (ContentMarkerEntry = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvZGIvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHckMsTUFBTSxLQUFXLFlBQVksQ0FzSDVCO0FBdEhELFdBQWlCLFlBQVk7SUFDWix1QkFBVSxHQUFHLFNBQVMsQ0FBQztJQUN2QixnQkFBRyxHQUFHLEtBQUssQ0FBQztJQUNaLG1DQUFzQixHQUFHLFlBQVksQ0FBQztJQUN0QyxvQ0FBdUIsR0FBRyxhQUFhLENBQUM7SUFDeEMsbUNBQXNCLEdBQUcsWUFBWSxDQUFDO0lBQ3RDLGtDQUFxQixHQUFHLFdBQVcsQ0FBQztJQUNwQyw2QkFBZ0IsR0FBRyxNQUFNLENBQUM7SUFDMUIsOEJBQWlCLEdBQUcsY0FBYyxDQUFDO0lBQ25DLG1DQUFzQixHQUFHLFlBQVksQ0FBQyxDQUFHLHdDQUF3QztJQUNqRiwrQ0FBa0MsR0FBRyx3QkFBd0IsQ0FBQztJQUM5RCw4Q0FBaUMsR0FBRyx1QkFBdUIsQ0FBQztJQUM1RCx5Q0FBNEIsR0FBRyxrQkFBa0IsQ0FBQztJQUNsRCxrQ0FBcUIsR0FBRyxXQUFXLENBQUM7SUFDcEMsc0NBQXlCLEdBQUcsZUFBZSxDQUFDLENBQUMsa0VBQWtFO0lBQzVILHlDQUF5QztJQUM1QixxQ0FBd0IsR0FBRyxjQUFjLENBQUMsQ0FBRywrQkFBK0I7SUFDekYseUNBQXlDO0lBQzVCLGlDQUFvQixHQUFHLFVBQVUsQ0FBQyxDQUFHLHNCQUFzQjtJQUMzRCwrQkFBa0IsR0FBRyxRQUFRLENBQUMsQ0FBRyxnQkFBZ0I7SUFDakQsNEJBQWUsR0FBRyxLQUFLLENBQUMsQ0FBRyw4QkFBOEI7SUFDekQsdUNBQTBCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBRyw4QkFBOEI7SUFDL0UsOEJBQWlCLEdBQUcsT0FBTyxDQUFDO0lBQzVCLCtCQUFrQixHQUFHLFFBQVEs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WUFDaEQsbUJBQUEsZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLFNBQVM7WUFDakcsbUJBQUEsOEJBQThCLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTO1lBQ2xHLG1CQUFBLDJCQUEyQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUztZQUM5RixtQkFBQSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVM7WUFDcEYsbUJBQUEsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTO1lBQzFGLG1CQUFBLHFCQUFxQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsU0FBUztZQUM1RyxtQkFBQSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRO1lBQzdELElBQUksQ0FBQztJQUNiLENBQUMsQ0FBQztJQUVXLDhCQUFXLEdBQW1CO1FBQ3ZDLE9BQU8sdUJBQXVCLEdBQUcsbUJBQUEsVUFBVSxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVXLDJDQUF3QixHQUFtQjtRQUNwRCxPQUFPLGlCQUFlLG1CQUFBLFVBQVUsb0JBQWUsbUJBQUEscUJBQXFCLHFCQUFrQixDQUFDO0lBQzNGLENBQUMsQ0FBQztBQUNOLENBQUMsRUExQ2dCLGtCQUFrQixLQUFsQixrQkFBa0IsUUEwQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYkNvbnN0YW50c30gZnJvbSAnLi4vLi4vZGInO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udGVudEVudHJ5IHtcbiAgICBleHBvcnQgY29uc3QgVEFCTEVfTkFNRSA9ICdjb250ZW50JztcbiAgICBleHBvcnQgY29uc3QgX0lEID0gJ19pZCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0lERU5USUZJRVIgPSAnaWRlbnRpZmllcic7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1NFUlZFUl9EQVRBID0gJ3NlcnZlcl9kYXRhJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTE9DQUxfREFUQSA9ICdsb2NhbF9kYXRhJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTUlNRV9UWVBFID0gJ21pbWVfdHlwZSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1BBVEggPSAncGF0aCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0lOREVYID0gJ3NlYXJjaF9pbmRleCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1ZJU0lCSUxJVFkgPSAndmlzaWJpbGl0eSc7ICAgLy8gVmlzaWJpbGl0eSBjb3VsZCBiZSBEZWZhdWx0IG9yIFBhcmVudFxuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9TRVJWRVJfTEFTVF9VUERBVEVEX09OID0gJ3NlcnZlcl9sYXN0X3VwZGF0ZWRfb24nO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9MT0NBTF9MQVNUX1VQREFURURfT04gPSAnbG9jYWxfbGFzdF91cGRhdGVkX29uJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTUFOSUZFU1RfVkVSU0lPTiA9ICdtYW5pZmVzdF92ZXJzaW9uJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfUkVGX0NPVU5UID0gJ3JlZl9jb3VudCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEUgPSAnY29udGVudF9zdGF0ZSc7IC8vIDAgLSBTZWVuIGJ1dCBub3QgYXZhaWxhYmxlIChvbmx5IHNlcnZlckRhdGEgd2lsbCBiZSBhdmFpbGFibGUpLFxuICAgIC8vIDEgLSBPbmx5IHNwaW5lLCAyIC0gQXJ0aWZhY3QgYXZhaWxhYmxlXG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRSA9ICdjb250ZW50X3R5cGUnOyAgIC8vIENvbnRlbnQgdHlwZSBjb3VsZCBiZSBzdG9yeSxcbiAgICAvLyB3b3Jrc2hlZXQsIGdhbWUsIGNvbGxlY3Rpb24sIHRleHRib29rLlxuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9BVURJRU5DRSA9ICdhdWRpZW5jZSc7ICAgLy8gbGVhcm5lciwgaW5zdHJ1Y3RvclxuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9QUkFHTUEgPSAncHJhZ21hJzsgICAvLyBleHRlcm5hbCwgYWRzXG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1VJRCA9ICd1aWQnOyAgIC8vIGxpc3Qgb2YgY29tbWEgc2VwYXJhdGVkIHVpZFxuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRSA9ICdzaXplX29uX2RldmljZSc7ICAgLy8gbGlzdCBvZiBjb21tYSBzZXBhcmF0ZWQgdWlkXG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0JPQVJEID0gJ2JvYXJkJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTUVESVVNID0gJ21lZGl1bSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0dSQURFID0gJ2dyYWRlJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfRElBTENPREVTID0gJ2RpYWxjb2Rlcyc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0NISUxEX05PREVTID0gJ2NoaWxkX25vZGVzJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfUFJJTUFSWV9DQVRFR09SWSA9ICdwcmltYXJ5X2NhdGVnb3J5JztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWFwIHtcbiAgICAgICAgW0NPTFVNTl9OQU1FX0lERU5USUZJRVJdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9TRVJWRVJfREFUQV06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9NSU1FX1RZUEVdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9QQVRIXT86IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0lOREVYXT86IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX1ZJU0lCSUxJVFldPzogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfU0VSVkVSX0xBU1RfVVBEQVRFRF9PTl0/OiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9MT0NBTF9MQVNUX1VQREFURURfT05dPzogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfTUFOSUZFU1RfVkVSU0lPTl06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX1JFRl9DT1VOVF0/OiBudW1iZXI7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9DT05URU5UX1NUQVRFXT86IG51bWJlcjtcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRV06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0FVRElFTkNFXT86IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX1BSQUdNQV0/OiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRV0/OiBudW1iZXI7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9CT0FSRF0/OiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9NRURJVU1dPzogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfR1JBREVdPzogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfRElBTENPREVTXT86IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NISUxEX05PREVTXT86IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX1BSSU1BUllfQ0FURUdPUlldOiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAnICsgVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgQ29udGVudEVudHJ5Ll9JRCArICcgSU5URUdFUiBQUklNQVJZIEtFWSwnICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0lERU5USUZJRVIgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgVU5JUVVFIE5PVCBOVUxMJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9TRVJWRVJfREFUQSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0xPQ0FMX0RBVEEgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9NSU1FX1RZUEUgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9QQVRIICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfSU5ERVggKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9WSVNJQklMSVRZICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfU0VSVkVSX0xBU1RfVVBEQVRFRF9PTiArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0xPQ0FMX0xBU1RfVVBEQVRFRF9PTiArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX1JFRl9DT1VOVCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgKyAnIE5PVCBOVUxMIERFRkFVTFQgMScgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgKyAnIE5PVCBOVUxMIERFRkFVTFQgMicgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQ09OVEVOVF9UWVBFICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQVVESUVOQ0UgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgREVGQVVMVCBcXCdMZWFybmVyXFwnJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9TSVpFX09OX0RFVklDRSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgKyAnIE5PVCBOVUxMIERFRkFVTFQgMCcgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfUFJBR01BICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnICBERUZBVUxUIFxcJ1xcJycgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQk9BUkQgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgIERFRkFVTFQgXFwnXFwnJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9NRURJVU0gKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgIERFRkFVTFQgXFwnXFwnJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9HUkFERSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgJyAgREVGQVVMVCBcXCdcXCcnICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX01BTklGRVNUX1ZFUlNJT04gKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9ESUFMQ09ERVMgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgIERFRkFVTFQgXFwnXFwnJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9DSElMRF9OT0RFUyArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgJyAgREVGQVVMVCBcXCdcXCcnICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX1BSSU1BUllfQ0FURUdPUlkgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgIERFRkFVTFQgXFwnXFwnJyArXG4gICAgICAgICAgICAnICknO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0RGVsZXRlRW50cnk6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0RST1AgVEFCTEUgSUYgRVhJU1RTICcgKyBUQUJMRV9OQU1FO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvckNvbnRlbnRTaXplOiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdBTFRFUiBUQUJMRSAnICsgVEFCTEVfTkFNRSArICcgQUREIENPTFVNTiAnICsgQ09MVU1OX05BTUVfU0laRV9PTl9ERVZJQ0UgKyBEYkNvbnN0YW50cy5JTlRfVFlQRSArICcgTk9UIE5VTEwgREVGQVVMVCAwOyc7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBbHRlckVudHJ5Rm9yUHJhZ21hOiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdBTFRFUiBUQUJMRSAnICsgVEFCTEVfTkFNRSArICcgQUREIENPTFVNTiAnICsgQ09MVU1OX05BTUVfUFJBR01BICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgJyBERUZBVUxUIFxcJ1xcJzsnO1xuICAgIH07XG5cblxuICAgIGV4cG9ydCBjb25zdCBnZXRBbHRlckVudHJ5Rm9yQm9hcmQ6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYEFMVEVSIFRBQkxFICR7VEFCTEVfTkFNRX0gQUREIENPTFVNTiAke0NPTFVNTl9OQU1FX0JPQVJEfSBURVhUIERFRkFVTFQgJydgO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvck1lZGl1bTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgQUxURVIgVEFCTEUgJHtUQUJMRV9OQU1FfSBBREQgQ09MVU1OICR7Q09MVU1OX05BTUVfTUVESVVNfSBURVhUIERFRkFVTFQgJydgO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvckdyYWRlOiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBBTFRFUiBUQUJMRSAke1RBQkxFX05BTUV9IEFERCBDT0xVTU4gJHtDT0xVTU5fTkFNRV9HUkFERX0gVEVYVCBERUZBVUxUICcnYDtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFsdGVyRW50cnlGb3JEaWFsQ29kZTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgQUxURVIgVEFCTEUgJHtUQUJMRV9OQU1FfSBBREQgQ09MVU1OICR7Q09MVU1OX05BTUVfRElBTENPREVTfSBURVhUIERFRkFVTFQgJydgO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvckNoaWxkTm9kZXM6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYEFMVEVSIFRBQkxFICR7VEFCTEVfTkFNRX0gQUREIENPTFVNTiAke0NPTFVNTl9OQU1FX0NISUxEX05PREVTfSBURVhUIERFRkFVTFQgJydgO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvclByaW1hcnlDYXRlZ29yeTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgQUxURVIgVEFCTEUgJHtUQUJMRV9OQU1FfSBBREQgQ09MVU1OICR7Q09MVU1OX05BTUVfUFJJTUFSWV9DQVRFR09SWX0gVEVYVCBERUZBVUxUICcnYDtcbiAgICB9O1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnRlbnRBY2Nlc3NFbnRyeSB7XG5cbiAgICBleHBvcnQgY29uc3QgX0lEID0gJ19pZCc7XG4gICAgZXhwb3J0IGNvbnN0IFRBQkxFX05BTUUgPSAnY29udGVudF9hY2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9VSUQgPSAndWlkJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfQ09OVEVOVF9JREVOVElGSUVSID0gJ2lkZW50aWZpZXInO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9FUE9DSF9USU1FU1RBTVAgPSAnZXBvY2hfdGltZXN0YW1wJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfU1RBVFVTID0gJ3N0YXR1cyc7IC8vIHZpZXdlZCA9IDEsIHBhcnRpYWxseVBsYXllZCA9IDIsIGZ1bGx5UGxheWVkID0gM1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9DT05URU5UX1RZUEUgPSAnY29udGVudF90eXBlJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfTEVBUk5FUl9TVEFURSA9ICdsZWFybmVyX3N0YXRlJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfUFJJTUFSWV9DQVRFR09SWSA9ICdwcmltYXJ5X2NhdGVnb3J5JztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWFwIHtcbiAgICAgICAgW0NPTFVNTl9OQU1FX1VJRF06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NPTlRFTlRfSURFTlRJRklFUl06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0VQT0NIX1RJTUVTVEFNUF06IG51bWJlcjtcbiAgICAgICAgW0NPTFVNTl9OQU1FX1NUQVRVU106IG51bWJlcjtcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NPTlRFTlRfVFlQRV06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0xFQVJORVJfU1RBVEVdOiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAnICsgVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfVUlEICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnIE5PVCBOVUxMJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVIgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9FUE9DSF9USU1FU1RBTVAgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLklOVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX1NUQVRVUyArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuSU5UX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQ09OVEVOVF9UWVBFICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfTEVBUk5FUl9TVEFURSArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuQkxPQl9UWVBFICtcbiAgICAgICAgICAgICcgKSc7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVUYWJsZTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAnRFJPUCBUQUJMRSBJRiBFWElTVFMgJyArIFRBQkxFX05BTUU7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBbHRlckVudHJ5Rm9yUHJpbWFyeUNhdGVnb3J5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBBTFRFUiBUQUJMRSAke1RBQkxFX05BTUV9IEFERCBDT0xVTU4gJHtDT0xVTU5fTkFNRV9QUklNQVJZX0NBVEVHT1JZfSBURVhUIERFRkFVTFQgJydgO1xuICAgIH07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udGVudEZlZWRiYWNrRW50cnkge1xuXG4gICAgZXhwb3J0IGNvbnN0IF9JRCA9ICdfaWQnO1xuICAgIGV4cG9ydCBjb25zdCBUQUJMRV9OQU1FID0gJ2ZlZWRiYWNrJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfQ09OVEVOVF9JRCA9ICdpZGVudGlmaWVyJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfVUlEID0gJ3VpZCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX1JBVElORyA9ICdyYXRpbmcnO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9DT01NRU5UUyA9ICdjb21tZW50cyc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0NSRUFURURfQVQgPSAnY3JlYXRlZEF0JztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWFwIHtcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NPTlRFTlRfSURdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9VSURdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9SQVRJTkddOiBudW1iZXI7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9DT01NRU5UU106IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NSRUFURURfQVRdOiBudW1iZXI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IGdldENyZWF0ZUVudHJ5OiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAnICsgVEFCTEVfTkFNRSArICcgKCcgK1xuICAgICAgICAgICAgX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfQ09OVEVOVF9JRCArIERiQ29uc3RhbnRzLlNQQUNFICsgRGJDb25zdGFudHMuVEVYVF9UWVBFICsgJyBOT1QgTlVMTCcgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfVUlEICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnIE5PVCBOVUxMJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9SQVRJTkcgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArICcgTk9UIE5VTEwnICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0NPTU1FTlRTICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnIE5PVCBOVUxMJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9DUkVBVEVEX0FUICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5JTlRfVFlQRSArXG4gICAgICAgICAgICAnICknO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlVGFibGU6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0RST1AgVEFCTEUgSUYgRVhJU1RTICcgKyBUQUJMRV9OQU1FO1xuICAgIH07XG59XG5cblxuZXhwb3J0IG5hbWVzcGFjZSBDb250ZW50TWFya2VyRW50cnkge1xuXG4gICAgZXhwb3J0IGNvbnN0IF9JRCA9ICdfaWQnO1xuICAgIGV4cG9ydCBjb25zdCBUQUJMRV9OQU1FID0gJ2NvbnRlbnRfbWFya2VyJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfVUlEID0gJ3VpZCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0NPTlRFTlRfSURFTlRJRklFUiA9ICdpZGVudGlmaWVyJztcbiAgICBleHBvcnQgY29uc3QgQ09MVU1OX05BTUVfRVBPQ0hfVElNRVNUQU1QID0gJ2Vwb2NoX3RpbWVzdGFtcCc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0RBVEEgPSAnZGF0YSc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX0VYVFJBX0lORk8gPSAnZXh0cmFfaW5mbyc7XG4gICAgZXhwb3J0IGNvbnN0IENPTFVNTl9OQU1FX01BUktFUiA9ICdtYXJrZXInO1xuICAgIGV4cG9ydCBjb25zdCBDT0xVTU5fTkFNRV9NSU1FX1RZUEUgPSAnbWltZV90eXBlJztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWFwIHtcbiAgICAgICAgW0NPTFVNTl9OQU1FX1VJRF06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0NPTlRFTlRfSURFTlRJRklFUl06IHN0cmluZztcbiAgICAgICAgW0NPTFVNTl9OQU1FX0VQT0NIX1RJTUVTVEFNUF06IG51bWJlcjtcbiAgICAgICAgW0NPTFVNTl9OQU1FX0RBVEFdOiBzdHJpbmc7XG4gICAgICAgIFtDT0xVTU5fTkFNRV9FWFRSQV9JTkZPXTogc3RyaW5nO1xuICAgICAgICBbQ09MVU1OX05BTUVfTUFSS0VSXTogbnVtYmVyO1xuICAgICAgICBbQ09MVU1OX05BTUVfTUlNRV9UWVBFXTogc3RyaW5nO1xuICAgIH1cblxuICAgIGV4cG9ydCBjb25zdCBnZXRDcmVhdGVFbnRyeTogKCgpID0+IHN0cmluZykgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJyArIENvbnRlbnRNYXJrZXJFbnRyeS5UQUJMRV9OQU1FICsgJyAoJyArXG4gICAgICAgICAgICBDb250ZW50TWFya2VyRW50cnkuX0lEICsgJyBJTlRFR0VSIFBSSU1BUlkgS0VZLCcgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfVUlEICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnIE5PVCBOVUxMJyArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9DT05URU5UX0lERU5USUZJRVIgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9FUE9DSF9USU1FU1RBTVAgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLklOVF9UWVBFICsgRGJDb25zdGFudHMuQ09NTUFfU0VQICtcbiAgICAgICAgICAgIENPTFVNTl9OQU1FX0RBVEEgKyBEYkNvbnN0YW50cy5TUEFDRSArIERiQ29uc3RhbnRzLlRFWFRfVFlQRSArIERiQ29uc3RhbnRzLkNPTU1BX1NFUCArXG4gICAgICAgICAgICBDT0xVTU5fTkFNRV9FWFRSQV9JTkZPICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfTUlNRV9UWVBFICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5URVhUX1RZUEUgKyAnICBERUZBVUxUIFxcJ1xcJycgKyBEYkNvbnN0YW50cy5DT01NQV9TRVAgK1xuICAgICAgICAgICAgQ09MVU1OX05BTUVfTUFSS0VSICsgRGJDb25zdGFudHMuU1BBQ0UgKyBEYkNvbnN0YW50cy5JTlRfVFlQRSArXG4gICAgICAgICAgICAnICknO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlVGFibGU6ICgoKSA9PiBzdHJpbmcpID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJ0RST1AgVEFCTEUgSUYgRVhJU1RTICcgKyBUQUJMRV9OQU1FO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QWx0ZXJFbnRyeUZvck1pbWVUeXBlOiAoKCkgPT4gc3RyaW5nKSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGBBTFRFUiBUQUJMRSAke1RBQkxFX05BTUV9IEFERCBDT0xVTU4gJHtDT0xVTU5fTkFNRV9NSU1FX1RZUEV9IFRFWFQgREVGQVVMVCAnJ2A7XG4gICAgfTtcbn1cbiJdfQ==