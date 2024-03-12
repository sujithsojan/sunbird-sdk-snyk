import { TrackingEnabled } from '../def/content';
import { ContentDisposition, ContentEncoding, ContentStatus, MimeType, State, Visibility } from './content-constants';
import { ContentEntry } from '../db/schema';
import { NumberUtil } from '../../util/number-util';
import { ArrayUtil } from '../../util/array-util';
import * as dayjs from 'dayjs';
import { CsPrimaryCategoryMapper } from '@project-sunbird/client-services/services/content/utilities/primary-category-mapper';
import { CsContentType } from '@project-sunbird/client-services/services/content';
var ContentUtil = /** @class */ (function () {
    function ContentUtil() {
    }
    ContentUtil.isAvailableLocally = function (contentState) {
        return contentState === State.ARTIFACT_AVAILABLE;
    };
    ContentUtil.isUpdateAvailable = function (serverData, localData) {
        var lVersion = -1;
        var sVersion = -1;
        if (serverData && serverData.pkgVersion) {
            sVersion = parseFloat(serverData.pkgVersion);
        }
        if (localData && localData.pkgVersion) {
            lVersion = parseFloat(localData.pkgVersion);
        }
        return sVersion > 0 && lVersion > 0 && sVersion > lVersion;
    };
    ContentUtil.hasChildren = function (localData) {
        if (!localData) {
            return false;
        }
        if (typeof (localData) === 'string') {
            localData = JSON.parse(localData);
        }
        return localData && localData.children;
    };
    ContentUtil.getContentRollup = function (identifier, hierarchyInfoList) {
        var l1, l2, l3, l4;
        if (!hierarchyInfoList || hierarchyInfoList.length === 0) {
            l1 = identifier;
        }
        else {
            for (var i = 0; i < hierarchyInfoList.length; i++) {
                if (i === 0) {
                    l1 = hierarchyInfoList[i].identifier;
                }
                else if (i === 1) {
                    l2 = hierarchyInfoList[i].identifier;
                }
                else if (i === 2) {
                    l3 = hierarchyInfoList[i].identifier;
                }
                else if (i === 3) {
                    l4 = hierarchyInfoList[i].identifier;
                }
                else {
                    break;
                }
            }
        }
        return { l1: l1, l2: l2, l3: l3, l4: l4 };
    };
    ContentUtil.getChildContentsIdentifiers = function (localData) {
        var childIdentifiers = [];
        var contentData;
        if (typeof (localData) === 'string') {
            contentData = JSON.parse(localData);
        }
        else {
            contentData = localData;
        }
        var children = contentData.children;
        if (children && children.length) {
            children.forEach(function (child) {
                childIdentifiers.push(child.identifier);
            });
        }
        return childIdentifiers;
    };
    /**
     * This method gets you the first part of the string that is divided after last index of "/"
     *
     * @param contentFolderName
     * @return
     */
    ContentUtil.getFirstPartOfThePathNameOnLastDelimiter = function (contentFolderName) {
        var lastIndexOfDelimiter = contentFolderName.lastIndexOf('/');
        if (lastIndexOfDelimiter > 0 && lastIndexOfDelimiter < contentFolderName.length) {
            return contentFolderName.substring(0, lastIndexOfDelimiter);
        }
        return undefined;
    };
    ContentUtil.hasPreRequisites = function (localData) {
        return JSON.parse(localData).pre_requisites;
    };
    ContentUtil.readVisibility = function (contentData) {
        var visibility = contentData.visibility;
        return visibility ? visibility : Visibility.DEFAULT;
    };
    ContentUtil.isCompatible = function (appConfig, compatibilityLevel) {
        return (compatibilityLevel >= appConfig.minCompatibilityLevel)
            && (compatibilityLevel <= appConfig.maxCompatibilityLevel);
    };
    ContentUtil.readCompatibilityLevel = function (contentData) {
        var compatibilityLevel = contentData.compatibilityLevel;
        return compatibilityLevel ? compatibilityLevel : this.defaultCompatibilityLevel;
    };
    ContentUtil.isDraftContent = function (status) {
        return (status && status === ContentStatus.DRAFT.valueOf());
    };
    ContentUtil.isExpired = function (expiryDate) {
        if (expiryDate) {
            var millis = new Date(expiryDate).getTime();
            if (new Date().getTime() > millis) {
                return true;
            }
        }
        return false;
    };
    /**
     * If status is DRAFT and pkgVersion == 0 then don't do the duplicate check..
     */
    ContentUtil.isDuplicateCheckRequired = function (isDraftContent, pkgVersion) {
        return isDraftContent && pkgVersion === 0;
    };
    ContentUtil.isImportFileExist = function (oldContentModel, contentData) {
        if (!oldContentModel || !contentData) {
            return false;
        }
        var isExist = false;
        var oldIdentifier = oldContentModel[ContentEntry.COLUMN_NAME_IDENTIFIER];
        var newIdentifier = contentData.identifier;
        var oldVisibility = oldContentModel[ContentEntry.COLUMN_NAME_VISIBILITY];
        var newVisibility = ContentUtil.readVisibility(contentData);
        if (oldIdentifier === newIdentifier && oldVisibility === newVisibility) {
            isExist = this.readPkgVersion(JSON.parse(oldContentModel[ContentEntry.COLUMN_NAME_LOCAL_DATA])) >=
                this.readPkgVersion(contentData);
        }
        return isExist;
    };
    ContentUtil.readPkgVersion = function (contentData) {
        return contentData.pkgVersion;
    };
    ContentUtil.readContentType = function (contentData) {
        var contentType = contentData.contentType;
        if (contentType) {
            contentType = contentType.toLowerCase();
        }
        return contentType;
    };
    ContentUtil.readPrimaryCategory = function (contentData) {
        var primaryCategory = contentData.primaryCategory;
        if (primaryCategory) {
            primaryCategory = primaryCategory.toLowerCase();
        }
        else {
            primaryCategory = CsPrimaryCategoryMapper.getPrimaryCategory(contentData.contentType.toLowerCase(), contentData.mimeType, contentData.resourceType).toLowerCase();
        }
        return primaryCategory;
    };
    ContentUtil.readPrimaryCategoryServer = function (contentData) {
        var primaryCategory = contentData.primaryCategory;
        if (primaryCategory) {
            primaryCategory = primaryCategory;
        }
        else {
            primaryCategory = CsPrimaryCategoryMapper.getPrimaryCategory(contentData.contentType.toLowerCase(), contentData.mimeType, contentData.resourceType);
        }
        return primaryCategory;
    };
    ContentUtil.readAudience = function (contentData) {
        var audience = contentData.audience;
        var audienceList = [];
        if (typeof audience === 'string') {
            audienceList.push(audience);
        }
        if (!audienceList || !audienceList.length) {
            audienceList.push('Learner');
        }
        audienceList.sort();
        return audienceList.join(',');
    };
    ContentUtil.readPragma = function (contentData) {
        var pragmaList = contentData.pragma;
        if (!pragmaList) {
            pragmaList = [];
        }
        return pragmaList.join(',');
    };
    /**
     * To Check whether the content is exist or not.
     *
     * @param existingContentInDB    Old ContentModel
     * @param newIdentifier New content identifier
     * @param newPkgVersion
     * @param keepLowerVersion
     * @return True - if file exists, False- does not exists
     */
    ContentUtil.doesContentExist = function (existingContentInDB, newIdentifier, newPkgVersion, keepLowerVersion) {
        if (!existingContentInDB) {
            return false;
        }
        var doestExist = false;
        var oldIdentifier = existingContentInDB[ContentEntry.COLUMN_NAME_IDENTIFIER];
        var contentData = JSON.parse(existingContentInDB[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
        if (oldIdentifier === newIdentifier) {
            var overrideDB = false;
            if (keepLowerVersion) {
                if (ContentUtil.readPkgVersion(contentData) < newPkgVersion) {
                    overrideDB = false;
                }
                else {
                    overrideDB = true;
                }
            }
            else if (ContentUtil.readPkgVersion(contentData) < newPkgVersion) {
                overrideDB = true;
            }
            if (overrideDB
                // If old content's pkgVersion is less than the new content then return false.
                //                        && ((readPkgVersion(existingContentInDB.getLocalData()) < newPkgVersion)
                //  If content_state is other than artifact available then also return  false.
                || (!keepLowerVersion
                    && existingContentInDB[ContentEntry.COLUMN_NAME_CONTENT_STATE] !== State.ARTIFACT_AVAILABLE.valueOf())) {
                doestExist = false;
            }
            else {
                doestExist = true;
            }
        }
        return doestExist;
    };
    ContentUtil.getContentRootDir = function (rootFilePath) {
        var url = (window.device.platform.toLowerCase() === "ios") ? rootFilePath.concat("content/") : rootFilePath.concat('content');
        return url;
    };
    ContentUtil.addOrUpdateViralityMetadata = function (localData, origin) {
        if (ContentUtil.isContentMetadataAbsent(localData)) {
            var viralityMetadata = {};
            viralityMetadata['origin'] = origin;
            viralityMetadata['transferCount'] = ContentUtil.INITIAL_VALUE_FOR_TRANSFER_COUNT;
            var contentMetadata = {};
            contentMetadata['virality'] = viralityMetadata;
            localData['contentMetadata'] = contentMetadata;
        }
        else if (ContentUtil.isContentMetadataPresentWithoutViralityMetadata(localData)) {
            var viralityMetadata = {};
            viralityMetadata['origin'] = origin;
            viralityMetadata['transferCount'] = ContentUtil.INITIAL_VALUE_FOR_TRANSFER_COUNT;
            (localData['contentMetaData'])['virality'] = viralityMetadata;
        }
        else {
            var viralityMetadata = (localData['contentMetaData'])['virality'];
            viralityMetadata['transferCount'] = ContentUtil.transferCount(viralityMetadata) + 1;
        }
    };
    ContentUtil.addViralityMetadataIfMissing = function (localData, origin) {
        if (!localData['contentMetaData']) {
            localData['contentMetaData'] = {};
        }
        var contentMetaData = localData['contentMetaData'];
        if (!contentMetaData['virality']) {
            contentMetaData.virality = {};
        }
        var viralityMetadata = localData['virality'];
        if (!viralityMetadata) {
            viralityMetadata = {};
        }
        if (!viralityMetadata['origin']) {
            viralityMetadata['origin'] = origin;
        }
        if (!viralityMetadata['transferCount']) {
            viralityMetadata['transferCount'] = ContentUtil.INITIAL_VALUE_FOR_TRANSFER_COUNT;
        }
    };
    /**
     * Content with artifact without zip i.e. pfd, mp4
     *
     * @param contentDisposition
     * @param contentEncoding
     * @return
     */
    ContentUtil.isInlineIdentity = function (contentDisposition, contentEncoding) {
        return contentDisposition
            && contentEncoding
            && ContentDisposition.INLINE.valueOf() === contentDisposition
            && ContentEncoding.IDENTITY.valueOf() === contentEncoding;
    };
    ContentUtil.isOnlineContent = function (contentData) {
        var contentDisposition = contentData.contentDisposition;
        return contentDisposition && ContentDisposition.ONLINE.valueOf() === contentDisposition;
    };
    ContentUtil.addOrUpdateDialcodeMapping = function (jsonStr, identifier, rootNodeIdentifier) {
        var dialcodeMapping;
        if (jsonStr) {
            dialcodeMapping = JSON.parse(jsonStr);
        }
        else {
            dialcodeMapping = {};
        }
        if (!dialcodeMapping.hasOwnProperty('identifier')) {
            dialcodeMapping['identifier'] = identifier;
        }
        var rootNodes = new Set();
        if (dialcodeMapping.hasOwnProperty('rootNodes')) {
            dialcodeMapping.forEach(function (dialcode) {
                rootNodes.add(dialcode);
            });
        }
        rootNodes.add(rootNodeIdentifier);
        dialcodeMapping['rootNodes'] = rootNodes;
        return JSON.stringify(dialcodeMapping);
    };
    ContentUtil.deDupe = function (array, property) {
        return array.filter(function (obj, pos, arr) {
            return arr.map(function (mapObj) { return mapObj[property]; }).indexOf(obj[property]) === pos;
        });
    };
    ContentUtil.getExportedFileName = function (contentsInDb, appName) {
        var fileName = 'blank.ecar';
        var firstContent;
        var rootContents = 0;
        if (contentsInDb.length > 0) {
            firstContent = contentsInDb[0];
        }
        var appendName = '';
        contentsInDb.forEach(function (contentInDb) {
            if (Visibility.DEFAULT.valueOf() === contentInDb[ContentEntry.COLUMN_NAME_VISIBILITY]) {
                rootContents++;
            }
        });
        if (rootContents > 1) {
            appendName.concat((rootContents - 1).toString());
        }
        if (firstContent) {
            var localData = JSON.parse(firstContent[ContentEntry.COLUMN_NAME_LOCAL_DATA]);
            var name_1 = localData.name;
            if (name_1 && name_1.length > ContentUtil.MAX_CONTENT_NAME) {
                name_1 = name_1.substring(0, ContentUtil.MAX_CONTENT_NAME - 3) + '...';
            }
            var pkgVersion = localData.pkgVersion;
            fileName = appName.toLowerCase() + "_" + name_1 + "-v" + pkgVersion + appendName + ".ecar";
        }
        return fileName;
    };
    ContentUtil.readOriginFromContentMap = function (item) {
        var metaData = item['contentMetadata'];
        var virality = metaData && metaData['virality'];
        return virality ? virality['origin'] : '';
    };
    ContentUtil.readTransferCountFromContentMap = function (item) {
        var metaData = item['contentMetadata'];
        var virality = metaData && metaData['virality'];
        return virality ? NumberUtil.parseInt(virality['transferCount']) : 0;
    };
    ContentUtil.readSizeFromContentMap = function (item) {
        return item.size ? item.size : '';
    };
    ContentUtil.getUidnIdentifierFiler = function (uid, identifier) {
        var uidFilter = uid && "uid = '" + uid + "'";
        var identifierFilter = identifier && "identifier = '" + identifier + "'";
        var filter = '';
        if (uidFilter && identifierFilter) {
            filter = "WHERE (" + identifierFilter + " AND " + uidFilter + ")";
        }
        else if (identifierFilter) {
            filter = "WHERE (" + identifierFilter + ")";
        }
        else if (uidFilter) {
            filter = "WHERE (" + uidFilter + ")";
        }
        return filter;
    };
    ContentUtil.getBasePath = function (basePath) {
        if (!basePath) {
            return '';
        }
        if (basePath.indexOf('file://') !== -1) {
            basePath = basePath.replace('file://', '');
        }
        else {
            basePath = 'file://'.concat(basePath);
        }
        return basePath;
    };
    ContentUtil.getRollup = function (identifier, hierachyInfo) {
        var l1, l2, l3, l4;
        if (!hierachyInfo) {
            l1 = identifier;
        }
        else {
            var i = void 0;
            for (i = 0; i < hierachyInfo.length; i++) {
                switch (i) {
                    case 0:
                        l1 = hierachyInfo[i].identifier;
                        break;
                    case 1:
                        l2 = hierachyInfo[i].identifier;
                        break;
                    case 2:
                        l3 = hierachyInfo[i].identifier;
                        break;
                    case 3:
                        l4 = hierachyInfo[i].identifier;
                        break;
                }
            }
        }
        var rollup = { l1: l1, l2: l2, l3: l3, l4: l4 };
        return rollup;
    };
    ContentUtil.addOrUpdateRefCount = function (refCount) {
        if (refCount < 0) {
            refCount = 0;
        }
        return refCount;
    };
    ContentUtil.isNotUnit = function (mimeType, visibility) {
        return !(MimeType.COLLECTION.valueOf() === mimeType && Visibility.PARENT.valueOf() === visibility);
    };
    ContentUtil.getContentAttribute = function (data) {
        var value = [];
        if (data) {
            if (typeof data === 'string') {
                value.push(data);
            }
            else {
                value = data;
            }
            if (value && value.length) {
                value.sort();
                var attribute = '';
                for (var i = 0; i < value.length; i++) {
                    if (i < value.length - 1) {
                        attribute = attribute.concat('~', value[i]);
                    }
                    else {
                        attribute = attribute.concat('~', value[i], '~');
                    }
                }
                return attribute.toLowerCase().trim();
            }
        }
        return '';
    };
    ContentUtil.getFindAllContentsWithIdentifierQuery = function (identifiers) {
        var identifiersStr = ArrayUtil.joinPreservingQuotes(identifiers);
        var orderBy = " order by " + ContentEntry.COLUMN_NAME_LOCAL_LAST_UPDATED_ON + " desc, " + ContentEntry.COLUMN_NAME_SERVER_LAST_UPDATED_ON + " desc";
        var filter = " where " + ContentEntry.COLUMN_NAME_IDENTIFIER + " in (" + identifiersStr + ") AND " + ContentEntry.COLUMN_NAME_REF_COUNT + " > 0";
        return "select * from " + ContentEntry.TABLE_NAME + " " + filter + " " + orderBy;
    };
    ContentUtil.getFindAllContentsQuery = function () {
        return "select * from " + ContentEntry.TABLE_NAME + " where " + ContentEntry.COLUMN_NAME_REF_COUNT + " > 0";
    };
    ContentUtil.constructContentDBModel = function (identifier, manifestVersion, localData, mimeType, contentType, visibility, path, refCount, contentState, audience, pragma, sizeOnDevice, board, medium, grade, primaryCategory) {
        var _a;
        return _a = {},
            _a[ContentEntry.COLUMN_NAME_IDENTIFIER] = identifier,
            _a[ContentEntry.COLUMN_NAME_SERVER_DATA] = '',
            _a[ContentEntry.COLUMN_NAME_PATH] = ContentUtil.getBasePath(path),
            _a[ContentEntry.COLUMN_NAME_REF_COUNT] = refCount,
            _a[ContentEntry.COLUMN_NAME_CONTENT_STATE] = contentState,
            _a[ContentEntry.COLUMN_NAME_SIZE_ON_DEVICE] = sizeOnDevice,
            _a[ContentEntry.COLUMN_NAME_MANIFEST_VERSION] = manifestVersion,
            _a[ContentEntry.COLUMN_NAME_LOCAL_DATA] = localData,
            _a[ContentEntry.COLUMN_NAME_MIME_TYPE] = mimeType,
            _a[ContentEntry.COLUMN_NAME_CONTENT_TYPE] = contentType,
            _a[ContentEntry.COLUMN_NAME_VISIBILITY] = visibility,
            _a[ContentEntry.COLUMN_NAME_AUDIENCE] = audience,
            _a[ContentEntry.COLUMN_NAME_PRAGMA] = pragma,
            _a[ContentEntry.COLUMN_NAME_LOCAL_LAST_UPDATED_ON] = dayjs().format(),
            _a[ContentEntry.COLUMN_NAME_BOARD] = ContentUtil.getContentAttribute(board),
            _a[ContentEntry.COLUMN_NAME_MEDIUM] = ContentUtil.getContentAttribute(medium),
            _a[ContentEntry.COLUMN_NAME_GRADE] = ContentUtil.getContentAttribute(grade),
            _a[ContentEntry.COLUMN_NAME_PRIMARY_CATEGORY] = primaryCategory,
            _a;
    };
    ContentUtil.getReferenceCount = function (existingContent, visibility) {
        var refCount;
        if (existingContent) {
            refCount = existingContent[ContentEntry.COLUMN_NAME_REF_COUNT];
            // if the content has a 'Default' visibility and update the same content then don't increase the reference count...
            if (!(Visibility.DEFAULT.valueOf() === existingContent[ContentEntry.COLUMN_NAME_VISIBILITY]
                && Visibility.DEFAULT.valueOf() === visibility)) {
                refCount = refCount + 1;
            }
        }
        else {
            refCount = 1;
        }
        return refCount;
    };
    /**
     * add or update the reference count for the content
     *
     */
    ContentUtil.getContentVisibility = function (existingContentInDb, objectType, previuosVisibility) {
        var visibility;
        if ('Library' === objectType) {
            visibility = Visibility.PARENT.valueOf();
        }
        else if (existingContentInDb) {
            if (!Visibility.PARENT.valueOf() === existingContentInDb[ContentEntry.COLUMN_NAME_VISIBILITY]) {
                // If not started from child content then do not shrink visibility.
                visibility = existingContentInDb[ContentEntry.COLUMN_NAME_VISIBILITY];
            }
        }
        return visibility ? visibility : previuosVisibility;
    };
    /**
     * Add or update the content_state. contentState should not update the spine_only when importing the spine content
     * after importing content with artifacts.
     *
     */
    ContentUtil.getContentState = function (existingContentInDb, contentState) {
        if (existingContentInDb && existingContentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE] > contentState) {
            contentState = existingContentInDb[ContentEntry.COLUMN_NAME_CONTENT_STATE];
        }
        return contentState;
    };
    ContentUtil.isFreeSpaceAvailable = function (deviceAvailableFreeSpace, fileSpace, bufferSize) {
        var BUFFER_SIZE = 1024 * 10;
        if (bufferSize > 0) {
            BUFFER_SIZE = bufferSize;
        }
        return deviceAvailableFreeSpace > 0 && deviceAvailableFreeSpace > (fileSpace + BUFFER_SIZE);
    };
    ContentUtil.transferCount = function (viralityMetadata) {
        var transferCount = viralityMetadata['transferCount'];
        return parseInt(transferCount, 0);
    };
    ContentUtil.isContentMetadataAbsent = function (localDataMap) {
        return !Boolean(localDataMap['contentMetaData']);
    };
    ContentUtil.isContentMetadataPresentWithoutViralityMetadata = function (localData) {
        return !Boolean((localData['contentMetaData'])['virality']);
    };
    ContentUtil.isTrackable = function (content) {
        if (content.trackable && typeof (content.trackable) === 'string') {
            content.trackable = JSON.parse(content.trackable);
        }
        if (content.trackable && content.trackable.enabled) {
            if (content.trackable.enabled === TrackingEnabled.YES) {
                return 1;
            }
            else if (content.mimeType === MimeType.COLLECTION) {
                return 0;
            }
            else {
                return -1;
            }
        }
        else {
            if (content.contentType.toLowerCase() === CsContentType.COURSE.toLowerCase()) {
                return 1;
            }
            else if (content.mimeType === MimeType.COLLECTION) {
                return 0;
            }
            else {
                return -1;
            }
        }
    };
    ContentUtil.getParseErrorObject = function (data) {
        try {
            return JSON.parse(data);
        }
        catch (_a) {
            return undefined;
        }
    };
    ContentUtil.defaultCompatibilityLevel = 1;
    ContentUtil.DEFAULT_PACKAGE_VERSION = -1;
    ContentUtil.INITIAL_VALUE_FOR_TRANSFER_COUNT = 0;
    ContentUtil.MAX_CONTENT_NAME = 30;
    return ContentUtil;
}());
export { ContentUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRlbnQvdXRpbC9jb250ZW50LXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE2QixlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBR3BILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxRkFBcUYsQ0FBQztBQUM1SCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFbEY7SUFBQTtJQWluQkEsQ0FBQztJQTNtQmlCLDhCQUFrQixHQUFoQyxVQUFpQyxZQUFvQjtRQUNqRCxPQUFPLFlBQVksS0FBSyxLQUFLLENBQUMsa0JBQWtCLENBQUM7SUFDckQsQ0FBQztJQUVhLDZCQUFpQixHQUEvQixVQUFnQyxVQUF1QixFQUFFLFNBQXNCO1FBQzNFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxCLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDckMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ25DLFFBQVEsR0FBRyxV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TSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUMxRSxPQUFPLENBQUMsQ0FBQzthQUNaO2lCQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUNqRCxPQUFPLENBQUMsQ0FBQzthQUNaO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtTQUNKO0lBQ0wsQ0FBQztJQUVhLCtCQUFtQixHQUFqQyxVQUFrQyxJQUFJO1FBQ2xDLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFBQyxXQUFNO1lBQ0osT0FBTyxTQUFTLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBOW1CYSxxQ0FBeUIsR0FBRyxDQUFDLENBQUM7SUFDN0IsbUNBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsNENBQWdDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLDRCQUFnQixHQUFHLEVBQUUsQ0FBQztJQTZtQmxELGtCQUFDO0NBQUEsQUFqbkJELElBaW5CQztTQWpuQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudERhdGEsIEhpZXJhcmNoeUluZm8sIFRyYWNraW5nRW5hYmxlZH0gZnJvbSAnLi4vZGVmL2NvbnRlbnQnO1xuaW1wb3J0IHtDb250ZW50RGlzcG9zaXRpb24sIENvbnRlbnRFbmNvZGluZywgQ29udGVudFN0YXR1cywgTWltZVR5cGUsIFN0YXRlLCBWaXNpYmlsaXR5fSBmcm9tICcuL2NvbnRlbnQtY29uc3RhbnRzJztcbmltcG9ydCB7Um9sbHVwfSBmcm9tICcuLi8uLi90ZWxlbWV0cnknO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uLy4uL2FwaS9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge0NvbnRlbnRFbnRyeX0gZnJvbSAnLi4vZGIvc2NoZW1hJztcbmltcG9ydCB7TnVtYmVyVXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9udW1iZXItdXRpbCc7XG5pbXBvcnQge0FycmF5VXRpbH0gZnJvbSAnLi4vLi4vdXRpbC9hcnJheS11dGlsJztcbmltcG9ydCAqIGFzIGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7Q2hpbGRDb250ZW50fSBmcm9tICcuLic7XG5pbXBvcnQge0NzUHJpbWFyeUNhdGVnb3J5TWFwcGVyfSBmcm9tICdAcHJvamVjdC1zdW5iaXJkL2NsaWVudC1zZXJ2aWNlcy9zZXJ2aWNlcy9jb250ZW50L3V0aWxpdGllcy9wcmltYXJ5LWNhdGVnb3J5LW1hcHBlcic7XG5pbXBvcnQgeyBDc0NvbnRlbnRUeXBlIH0gZnJvbSAnQHByb2plY3Qtc3VuYmlyZC9jbGllbnQtc2VydmljZXMvc2VydmljZXMvY29udGVudCc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50VXRpbCB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0Q29tcGF0aWJpbGl0eUxldmVsID0gMTtcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1BBQ0tBR0VfVkVSU0lPTiA9IC0xO1xuICAgIHByaXZhdGUgc3RhdGljIElOSVRJQUxfVkFMVUVfRk9SX1RSQU5TRkVSX0NPVU5UID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBNQVhfQ09OVEVOVF9OQU1FID0gMzA7XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQXZhaWxhYmxlTG9jYWxseShjb250ZW50U3RhdGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY29udGVudFN0YXRlID09PSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc1VwZGF0ZUF2YWlsYWJsZShzZXJ2ZXJEYXRhOiBDb250ZW50RGF0YSwgbG9jYWxEYXRhOiBDb250ZW50RGF0YSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbFZlcnNpb24gPSAtMTtcbiAgICAgICAgbGV0IHNWZXJzaW9uID0gLTE7XG5cbiAgICAgICAgaWYgKHNlcnZlckRhdGEgJiYgc2VydmVyRGF0YS5wa2dWZXJzaW9uKSB7XG4gICAgICAgICAgICBzVmVyc2lvbiA9IHBhcnNlRmxvYXQoc2VydmVyRGF0YS5wa2dWZXJzaW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbERhdGEgJiYgbG9jYWxEYXRhLnBrZ1ZlcnNpb24pIHtcbiAgICAgICAgICAgIGxWZXJzaW9uID0gcGFyc2VGbG9hdChsb2NhbERhdGEucGtnVmVyc2lvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc1ZlcnNpb24gPiAwICYmIGxWZXJzaW9uID4gMCAmJiBzVmVyc2lvbiA+IGxWZXJzaW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzQ2hpbGRyZW4obG9jYWxEYXRhKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghbG9jYWxEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiAobG9jYWxEYXRhKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxvY2FsRGF0YSA9IEpTT04ucGFyc2UobG9jYWxEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxEYXRhICYmIGxvY2FsRGF0YS5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbnRlbnRSb2xsdXAoaWRlbnRpZmllcjogc3RyaW5nLCBoaWVyYXJjaHlJbmZvTGlzdDogSGllcmFyY2h5SW5mb1tdKTogUm9sbHVwIHtcbiAgICAgICAgbGV0IGwxLCBsMiwgbDMsIGw0O1xuICAgICAgICBpZiAoIWhpZXJhcmNoeUluZm9MaXN0IHx8IGhpZXJhcmNoeUluZm9MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbDEgPSBpZGVudGlmaWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWVyYXJjaHlJbmZvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGwxID0gaGllcmFyY2h5SW5mb0xpc3RbaV0uaWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbDIgPSBoaWVyYXJjaHlJbmZvTGlzdFtpXS5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBsMyA9IGhpZXJhcmNoeUluZm9MaXN0W2ldLmlkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGw0ID0gaGllcmFyY2h5SW5mb0xpc3RbaV0uaWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2wxOiBsMSwgbDI6IGwyLCBsMzogbDMsIGw0OiBsNH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGlsZENvbnRlbnRzSWRlbnRpZmllcnMobG9jYWxEYXRhKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBjaGlsZElkZW50aWZpZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgY29udGVudERhdGE7XG4gICAgICAgIGlmICh0eXBlb2YgKGxvY2FsRGF0YSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250ZW50RGF0YSA9IEpTT04ucGFyc2UobG9jYWxEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnREYXRhID0gbG9jYWxEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuOiBDaGlsZENvbnRlbnRbXSA9IGNvbnRlbnREYXRhLmNoaWxkcmVuO1xuICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkSWRlbnRpZmllcnMucHVzaChjaGlsZC5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZElkZW50aWZpZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGdldHMgeW91IHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSBzdHJpbmcgdGhhdCBpcyBkaXZpZGVkIGFmdGVyIGxhc3QgaW5kZXggb2YgXCIvXCJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZW50Rm9sZGVyTmFtZVxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEZpcnN0UGFydE9mVGhlUGF0aE5hbWVPbkxhc3REZWxpbWl0ZXIoY29udGVudEZvbGRlck5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBsYXN0SW5kZXhPZkRlbGltaXRlcjogbnVtYmVyID0gY29udGVudEZvbGRlck5hbWUubGFzdEluZGV4T2YoJy8nKTtcblxuICAgICAgICBpZiAobGFzdEluZGV4T2ZEZWxpbWl0ZXIgPiAwICYmIGxhc3RJbmRleE9mRGVsaW1pdGVyIDwgY29udGVudEZvbGRlck5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudEZvbGRlck5hbWUuc3Vic3RyaW5nKDAsIGxhc3RJbmRleE9mRGVsaW1pdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBoYXNQcmVSZXF1aXNpdGVzKGxvY2FsRGF0YTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsRGF0YSkucHJlX3JlcXVpc2l0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWFkVmlzaWJpbGl0eShjb250ZW50RGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IGNvbnRlbnREYXRhLnZpc2liaWxpdHk7XG4gICAgICAgIHJldHVybiB2aXNpYmlsaXR5ID8gdmlzaWJpbGl0eSA6IFZpc2liaWxpdHkuREVGQVVMVDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQ29tcGF0aWJsZShhcHBDb25maWc6IEFwcENvbmZpZywgY29tcGF0aWJpbGl0eUxldmVsKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoY29tcGF0aWJpbGl0eUxldmVsID49IGFwcENvbmZpZy5taW5Db21wYXRpYmlsaXR5TGV2ZWwpXG4gICAgICAgICAgICAmJiAoY29tcGF0aWJpbGl0eUxldmVsIDw9IGFwcENvbmZpZy5tYXhDb21wYXRpYmlsaXR5TGV2ZWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZENvbXBhdGliaWxpdHlMZXZlbChjb250ZW50RGF0YTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY29tcGF0aWJpbGl0eUxldmVsID0gY29udGVudERhdGEuY29tcGF0aWJpbGl0eUxldmVsO1xuICAgICAgICByZXR1cm4gY29tcGF0aWJpbGl0eUxldmVsID8gY29tcGF0aWJpbGl0eUxldmVsIDogdGhpcy5kZWZhdWx0Q29tcGF0aWJpbGl0eUxldmVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNEcmFmdENvbnRlbnQoc3RhdHVzKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoc3RhdHVzICYmIHN0YXR1cyA9PT0gQ29udGVudFN0YXR1cy5EUkFGVC52YWx1ZU9mKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNFeHBpcmVkKGV4cGlyeURhdGU6IHN0cmluZykge1xuICAgICAgICBpZiAoZXhwaXJ5RGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgbWlsbGlzOiBudW1iZXIgPSBuZXcgRGF0ZShleHBpcnlEYXRlKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgPiBtaWxsaXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgc3RhdHVzIGlzIERSQUZUIGFuZCBwa2dWZXJzaW9uID09IDAgdGhlbiBkb24ndCBkbyB0aGUgZHVwbGljYXRlIGNoZWNrLi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzRHVwbGljYXRlQ2hlY2tSZXF1aXJlZChpc0RyYWZ0Q29udGVudCwgcGtnVmVyc2lvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0RyYWZ0Q29udGVudCAmJiBwa2dWZXJzaW9uID09PSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbXBvcnRGaWxlRXhpc3Qob2xkQ29udGVudE1vZGVsOiBDb250ZW50RW50cnkuU2NoZW1hTWFwIHwgdW5kZWZpbmVkLCBjb250ZW50RGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghb2xkQ29udGVudE1vZGVsIHx8ICFjb250ZW50RGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlzRXhpc3QgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkSWRlbnRpZmllciA9IG9sZENvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUl07XG4gICAgICAgIGNvbnN0IG5ld0lkZW50aWZpZXIgPSBjb250ZW50RGF0YS5pZGVudGlmaWVyO1xuICAgICAgICBjb25zdCBvbGRWaXNpYmlsaXR5ID0gb2xkQ29udGVudE1vZGVsW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXTtcbiAgICAgICAgY29uc3QgbmV3VmlzaWJpbGl0eSA9IENvbnRlbnRVdGlsLnJlYWRWaXNpYmlsaXR5KGNvbnRlbnREYXRhKTtcblxuICAgICAgICBpZiAob2xkSWRlbnRpZmllciA9PT0gbmV3SWRlbnRpZmllciAmJiBvbGRWaXNpYmlsaXR5ID09PSBuZXdWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICBpc0V4aXN0ID0gdGhpcy5yZWFkUGtnVmVyc2lvbihKU09OLnBhcnNlKG9sZENvbnRlbnRNb2RlbFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pKSA+PVxuICAgICAgICAgICAgICAgIHRoaXMucmVhZFBrZ1ZlcnNpb24oY29udGVudERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRXhpc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWFkUGtnVmVyc2lvbihjb250ZW50RGF0YSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBjb250ZW50RGF0YS5wa2dWZXJzaW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZENvbnRlbnRUeXBlKGNvbnRlbnREYXRhKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNvbnRlbnRUeXBlOiBzdHJpbmcgPSBjb250ZW50RGF0YS5jb250ZW50VHlwZTtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZFByaW1hcnlDYXRlZ29yeShjb250ZW50RGF0YSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBwcmltYXJ5Q2F0ZWdvcnk6IHN0cmluZyA9IGNvbnRlbnREYXRhLnByaW1hcnlDYXRlZ29yeTtcbiAgICAgICAgaWYgKHByaW1hcnlDYXRlZ29yeSkge1xuICAgICAgICAgICAgcHJpbWFyeUNhdGVnb3J5ID0gcHJpbWFyeUNhdGVnb3J5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmltYXJ5Q2F0ZWdvcnkgPSBDc1ByaW1hcnlDYXRlZ29yeU1hcHBlci5nZXRQcmltYXJ5Q2F0ZWdvcnkoXG4gICAgICAgICAgICAgIGNvbnRlbnREYXRhLmNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCksIGNvbnRlbnREYXRhLm1pbWVUeXBlLCBjb250ZW50RGF0YS5yZXNvdXJjZVR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByaW1hcnlDYXRlZ29yeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRQcmltYXJ5Q2F0ZWdvcnlTZXJ2ZXIoY29udGVudERhdGEpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcHJpbWFyeUNhdGVnb3J5OiBzdHJpbmcgPSBjb250ZW50RGF0YS5wcmltYXJ5Q2F0ZWdvcnk7XG4gICAgICAgIGlmIChwcmltYXJ5Q2F0ZWdvcnkpIHtcbiAgICAgICAgICAgIHByaW1hcnlDYXRlZ29yeSA9IHByaW1hcnlDYXRlZ29yeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaW1hcnlDYXRlZ29yeSA9IENzUHJpbWFyeUNhdGVnb3J5TWFwcGVyLmdldFByaW1hcnlDYXRlZ29yeShcbiAgICAgICAgICAgICAgY29udGVudERhdGEuY29udGVudFR5cGUudG9Mb3dlckNhc2UoKSwgY29udGVudERhdGEubWltZVR5cGUsIGNvbnRlbnREYXRhLnJlc291cmNlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByaW1hcnlDYXRlZ29yeTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZEF1ZGllbmNlKGNvbnRlbnREYXRhKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgYXVkaWVuY2UgPSBjb250ZW50RGF0YS5hdWRpZW5jZTtcbiAgICAgICAgY29uc3QgYXVkaWVuY2VMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIGF1ZGllbmNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYXVkaWVuY2VMaXN0LnB1c2goYXVkaWVuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXVkaWVuY2VMaXN0IHx8ICFhdWRpZW5jZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBhdWRpZW5jZUxpc3QucHVzaCgnTGVhcm5lcicpO1xuICAgICAgICB9XG4gICAgICAgIGF1ZGllbmNlTGlzdC5zb3J0KCk7XG4gICAgICAgIHJldHVybiBhdWRpZW5jZUxpc3Quam9pbignLCcpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHN0YXRpYyByZWFkUHJhZ21hKGNvbnRlbnREYXRhKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHByYWdtYUxpc3Q6IHN0cmluZ1tdID0gY29udGVudERhdGEucHJhZ21hO1xuICAgICAgICBpZiAoIXByYWdtYUxpc3QpIHtcbiAgICAgICAgICAgIHByYWdtYUxpc3QgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmFnbWFMaXN0LmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUbyBDaGVjayB3aGV0aGVyIHRoZSBjb250ZW50IGlzIGV4aXN0IG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBleGlzdGluZ0NvbnRlbnRJbkRCICAgIE9sZCBDb250ZW50TW9kZWxcbiAgICAgKiBAcGFyYW0gbmV3SWRlbnRpZmllciBOZXcgY29udGVudCBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIG5ld1BrZ1ZlcnNpb25cbiAgICAgKiBAcGFyYW0ga2VlcExvd2VyVmVyc2lvblxuICAgICAqIEByZXR1cm4gVHJ1ZSAtIGlmIGZpbGUgZXhpc3RzLCBGYWxzZS0gZG9lcyBub3QgZXhpc3RzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkb2VzQ29udGVudEV4aXN0KGV4aXN0aW5nQ29udGVudEluREI6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXAgfCB1bmRlZmluZWQsIG5ld0lkZW50aWZpZXI6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGtnVmVyc2lvbjogbnVtYmVyLCBrZWVwTG93ZXJWZXJzaW9uOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghZXhpc3RpbmdDb250ZW50SW5EQikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRvZXN0RXhpc3QgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb2xkSWRlbnRpZmllciA9IGV4aXN0aW5nQ29udGVudEluREJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0lERU5USUZJRVJdO1xuICAgICAgICBjb25zdCBjb250ZW50RGF0YSA9IEpTT04ucGFyc2UoZXhpc3RpbmdDb250ZW50SW5EQltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfREFUQV0pO1xuICAgICAgICBpZiAob2xkSWRlbnRpZmllciA9PT0gbmV3SWRlbnRpZmllcikge1xuICAgICAgICAgICAgbGV0IG92ZXJyaWRlREIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChrZWVwTG93ZXJWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKENvbnRlbnRVdGlsLnJlYWRQa2dWZXJzaW9uKGNvbnRlbnREYXRhKSA8IG5ld1BrZ1ZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgb3ZlcnJpZGVEQiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlREIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQ29udGVudFV0aWwucmVhZFBrZ1ZlcnNpb24oY29udGVudERhdGEpIDwgbmV3UGtnVmVyc2lvbikge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlREIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3ZlcnJpZGVEQlxuICAgICAgICAgICAgICAgIC8vIElmIG9sZCBjb250ZW50J3MgcGtnVmVyc2lvbiBpcyBsZXNzIHRoYW4gdGhlIG5ldyBjb250ZW50IHRoZW4gcmV0dXJuIGZhbHNlLlxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgJiYgKChyZWFkUGtnVmVyc2lvbihleGlzdGluZ0NvbnRlbnRJbkRCLmdldExvY2FsRGF0YSgpKSA8IG5ld1BrZ1ZlcnNpb24pXG4gICAgICAgICAgICAgICAgLy8gIElmIGNvbnRlbnRfc3RhdGUgaXMgb3RoZXIgdGhhbiBhcnRpZmFjdCBhdmFpbGFibGUgdGhlbiBhbHNvIHJldHVybiAgZmFsc2UuXG4gICAgICAgICAgICAgICAgfHwgKCFrZWVwTG93ZXJWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICYmIGV4aXN0aW5nQ29udGVudEluREJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdICE9PSBTdGF0ZS5BUlRJRkFDVF9BVkFJTEFCTEUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgICAgIGRvZXN0RXhpc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9lc3RFeGlzdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9lc3RFeGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbnRlbnRSb290RGlyKHJvb3RGaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHVybCA9ICh3aW5kb3cuZGV2aWNlLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9zXCIpID8gcm9vdEZpbGVQYXRoLmNvbmNhdChcImNvbnRlbnQvXCIpIDogcm9vdEZpbGVQYXRoLmNvbmNhdCgnY29udGVudCcpXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhZGRPclVwZGF0ZVZpcmFsaXR5TWV0YWRhdGEobG9jYWxEYXRhLCBvcmlnaW46IHN0cmluZykge1xuICAgICAgICBpZiAoQ29udGVudFV0aWwuaXNDb250ZW50TWV0YWRhdGFBYnNlbnQobG9jYWxEYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgdmlyYWxpdHlNZXRhZGF0YSA9IHt9O1xuICAgICAgICAgICAgdmlyYWxpdHlNZXRhZGF0YVsnb3JpZ2luJ10gPSBvcmlnaW47XG4gICAgICAgICAgICB2aXJhbGl0eU1ldGFkYXRhWyd0cmFuc2ZlckNvdW50J10gPSBDb250ZW50VXRpbC5JTklUSUFMX1ZBTFVFX0ZPUl9UUkFOU0ZFUl9DT1VOVDtcblxuICAgICAgICAgICAgY29uc3QgY29udGVudE1ldGFkYXRhID0ge307XG4gICAgICAgICAgICBjb250ZW50TWV0YWRhdGFbJ3ZpcmFsaXR5J10gPSB2aXJhbGl0eU1ldGFkYXRhO1xuXG4gICAgICAgICAgICBsb2NhbERhdGFbJ2NvbnRlbnRNZXRhZGF0YSddID0gY29udGVudE1ldGFkYXRhO1xuICAgICAgICB9IGVsc2UgaWYgKENvbnRlbnRVdGlsLmlzQ29udGVudE1ldGFkYXRhUHJlc2VudFdpdGhvdXRWaXJhbGl0eU1ldGFkYXRhKGxvY2FsRGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpcmFsaXR5TWV0YWRhdGEgPSB7fTtcbiAgICAgICAgICAgIHZpcmFsaXR5TWV0YWRhdGFbJ29yaWdpbiddID0gb3JpZ2luO1xuICAgICAgICAgICAgdmlyYWxpdHlNZXRhZGF0YVsndHJhbnNmZXJDb3VudCddID0gQ29udGVudFV0aWwuSU5JVElBTF9WQUxVRV9GT1JfVFJBTlNGRVJfQ09VTlQ7XG5cbiAgICAgICAgICAgIChsb2NhbERhdGFbJ2NvbnRlbnRNZXRhRGF0YSddKVsndmlyYWxpdHknXSA9IHZpcmFsaXR5TWV0YWRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2aXJhbGl0eU1ldGFkYXRhID0gKGxvY2FsRGF0YVsnY29udGVudE1ldGFEYXRhJ10pWyd2aXJhbGl0eSddO1xuICAgICAgICAgICAgdmlyYWxpdHlNZXRhZGF0YVsndHJhbnNmZXJDb3VudCddID0gQ29udGVudFV0aWwudHJhbnNmZXJDb3VudCh2aXJhbGl0eU1ldGFkYXRhKSArIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFkZFZpcmFsaXR5TWV0YWRhdGFJZk1pc3NpbmcobG9jYWxEYXRhLCBvcmlnaW46IHN0cmluZykge1xuICAgICAgICBpZiAoIWxvY2FsRGF0YVsnY29udGVudE1ldGFEYXRhJ10pIHtcbiAgICAgICAgICAgIGxvY2FsRGF0YVsnY29udGVudE1ldGFEYXRhJ10gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRNZXRhRGF0YSA9IGxvY2FsRGF0YVsnY29udGVudE1ldGFEYXRhJ107XG5cbiAgICAgICAgaWYgKCFjb250ZW50TWV0YURhdGFbJ3ZpcmFsaXR5J10pIHtcbiAgICAgICAgICAgIGNvbnRlbnRNZXRhRGF0YS52aXJhbGl0eSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aXJhbGl0eU1ldGFkYXRhID0gbG9jYWxEYXRhWyd2aXJhbGl0eSddO1xuICAgICAgICBpZiAoIXZpcmFsaXR5TWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHZpcmFsaXR5TWV0YWRhdGEgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmlyYWxpdHlNZXRhZGF0YVsnb3JpZ2luJ10pIHtcbiAgICAgICAgICAgIHZpcmFsaXR5TWV0YWRhdGFbJ29yaWdpbiddID0gb3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmlyYWxpdHlNZXRhZGF0YVsndHJhbnNmZXJDb3VudCddKSB7XG4gICAgICAgICAgICB2aXJhbGl0eU1ldGFkYXRhWyd0cmFuc2ZlckNvdW50J10gPSBDb250ZW50VXRpbC5JTklUSUFMX1ZBTFVFX0ZPUl9UUkFOU0ZFUl9DT1VOVDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRlbnQgd2l0aCBhcnRpZmFjdCB3aXRob3V0IHppcCBpLmUuIHBmZCwgbXA0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGVudERpc3Bvc2l0aW9uXG4gICAgICogQHBhcmFtIGNvbnRlbnRFbmNvZGluZ1xuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzSW5saW5lSWRlbnRpdHkoY29udGVudERpc3Bvc2l0aW9uOiBzdHJpbmcsIGNvbnRlbnRFbmNvZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBjb250ZW50RGlzcG9zaXRpb25cbiAgICAgICAgICAgICYmIGNvbnRlbnRFbmNvZGluZ1xuICAgICAgICAgICAgJiYgQ29udGVudERpc3Bvc2l0aW9uLklOTElORS52YWx1ZU9mKCkgPT09IGNvbnRlbnREaXNwb3NpdGlvblxuICAgICAgICAgICAgJiYgQ29udGVudEVuY29kaW5nLklERU5USVRZLnZhbHVlT2YoKSA9PT0gY29udGVudEVuY29kaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNPbmxpbmVDb250ZW50KGNvbnRlbnREYXRhKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnREaXNwb3NpdGlvbiA9IGNvbnRlbnREYXRhLmNvbnRlbnREaXNwb3NpdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnREaXNwb3NpdGlvbiAmJiBDb250ZW50RGlzcG9zaXRpb24uT05MSU5FLnZhbHVlT2YoKSA9PT0gY29udGVudERpc3Bvc2l0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYWRkT3JVcGRhdGVEaWFsY29kZU1hcHBpbmcoanNvblN0cjogc3RyaW5nLCBpZGVudGlmaWVyOiBzdHJpbmcsIHJvb3ROb2RlSWRlbnRpZmllcjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBkaWFsY29kZU1hcHBpbmc7XG4gICAgICAgIGlmIChqc29uU3RyKSB7XG4gICAgICAgICAgICBkaWFsY29kZU1hcHBpbmcgPSBKU09OLnBhcnNlKGpzb25TdHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlhbGNvZGVNYXBwaW5nID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRpYWxjb2RlTWFwcGluZy5oYXNPd25Qcm9wZXJ0eSgnaWRlbnRpZmllcicpKSB7XG4gICAgICAgICAgICBkaWFsY29kZU1hcHBpbmdbJ2lkZW50aWZpZXInXSA9IGlkZW50aWZpZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb290Tm9kZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlmIChkaWFsY29kZU1hcHBpbmcuaGFzT3duUHJvcGVydHkoJ3Jvb3ROb2RlcycpKSB7XG4gICAgICAgICAgICBkaWFsY29kZU1hcHBpbmcuZm9yRWFjaCgoZGlhbGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICByb290Tm9kZXMuYWRkKGRpYWxjb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJvb3ROb2Rlcy5hZGQocm9vdE5vZGVJZGVudGlmaWVyKTtcbiAgICAgICAgZGlhbGNvZGVNYXBwaW5nWydyb290Tm9kZXMnXSA9IHJvb3ROb2RlcztcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRpYWxjb2RlTWFwcGluZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkZUR1cGU8VD4oYXJyYXk6IFRbXSwgcHJvcGVydHkpOiBUW10ge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChvYmosIHBvcywgYXJyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXJyLm1hcChtYXBPYmogPT4gbWFwT2JqW3Byb3BlcnR5XSkuaW5kZXhPZihvYmpbcHJvcGVydHldKSA9PT0gcG9zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEV4cG9ydGVkRmlsZU5hbWUoY29udGVudHNJbkRiOiBDb250ZW50RW50cnkuU2NoZW1hTWFwW10sIGFwcE5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZmlsZU5hbWUgPSAnYmxhbmsuZWNhcic7XG4gICAgICAgIGxldCBmaXJzdENvbnRlbnQ6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXA7XG4gICAgICAgIGxldCByb290Q29udGVudHMgPSAwO1xuXG4gICAgICAgIGlmIChjb250ZW50c0luRGIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmlyc3RDb250ZW50ID0gY29udGVudHNJbkRiWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwZW5kTmFtZSA9ICcnO1xuICAgICAgICBjb250ZW50c0luRGIuZm9yRWFjaCgoY29udGVudEluRGIpID0+IHtcbiAgICAgICAgICAgIGlmIChWaXNpYmlsaXR5LkRFRkFVTFQudmFsdWVPZigpID09PSBjb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV0pIHtcbiAgICAgICAgICAgICAgICByb290Q29udGVudHMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJvb3RDb250ZW50cyA+IDEpIHtcbiAgICAgICAgICAgIGFwcGVuZE5hbWUuY29uY2F0KChyb290Q29udGVudHMgLSAxKS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaXJzdENvbnRlbnQhKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbERhdGEgPSBKU09OLnBhcnNlKGZpcnN0Q29udGVudCFbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdKTtcbiAgICAgICAgICAgIGxldCBuYW1lID0gbG9jYWxEYXRhLm5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZSAmJiBuYW1lLmxlbmd0aCA+IENvbnRlbnRVdGlsLk1BWF9DT05URU5UX05BTUUpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMCwgQ29udGVudFV0aWwuTUFYX0NPTlRFTlRfTkFNRSAtIDMpICsgJy4uLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHBrZ1ZlcnNpb24gPSBsb2NhbERhdGEucGtnVmVyc2lvbjtcbiAgICAgICAgICAgIGZpbGVOYW1lID0gYCR7YXBwTmFtZS50b0xvd2VyQ2FzZSgpfV8ke25hbWV9LXYke3BrZ1ZlcnNpb259JHthcHBlbmROYW1lfS5lY2FyYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWxlTmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRPcmlnaW5Gcm9tQ29udGVudE1hcChpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBtZXRhRGF0YTogYW55ID0gaXRlbVsnY29udGVudE1ldGFkYXRhJ107XG4gICAgICAgIGNvbnN0IHZpcmFsaXR5OiBhbnkgPSBtZXRhRGF0YSAmJiBtZXRhRGF0YVsndmlyYWxpdHknXTtcbiAgICAgICAgcmV0dXJuIHZpcmFsaXR5ID8gdmlyYWxpdHlbJ29yaWdpbiddIDogJyc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWFkVHJhbnNmZXJDb3VudEZyb21Db250ZW50TWFwKGl0ZW06IGFueSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1ldGFEYXRhOiBhbnkgPSBpdGVtWydjb250ZW50TWV0YWRhdGEnXTtcbiAgICAgICAgY29uc3QgdmlyYWxpdHk6IGFueSA9IG1ldGFEYXRhICYmIG1ldGFEYXRhWyd2aXJhbGl0eSddO1xuICAgICAgICByZXR1cm4gdmlyYWxpdHkgPyBOdW1iZXJVdGlsLnBhcnNlSW50KHZpcmFsaXR5Wyd0cmFuc2ZlckNvdW50J10pIDogMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRTaXplRnJvbUNvbnRlbnRNYXAoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2l6ZSA/IGl0ZW0uc2l6ZSA6ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VWlkbklkZW50aWZpZXJGaWxlcih1aWQ6IHN0cmluZywgaWRlbnRpZmllcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHVpZEZpbHRlciA9IHVpZCAmJiBgdWlkID0gJyR7dWlkfSdgO1xuICAgICAgICBjb25zdCBpZGVudGlmaWVyRmlsdGVyID0gaWRlbnRpZmllciAmJiBgaWRlbnRpZmllciA9ICcke2lkZW50aWZpZXJ9J2A7XG5cbiAgICAgICAgbGV0IGZpbHRlciA9ICcnO1xuICAgICAgICBpZiAodWlkRmlsdGVyICYmIGlkZW50aWZpZXJGaWx0ZXIpIHtcbiAgICAgICAgICAgIGZpbHRlciA9IGBXSEVSRSAoJHtpZGVudGlmaWVyRmlsdGVyfSBBTkQgJHt1aWRGaWx0ZXJ9KWA7XG4gICAgICAgIH0gZWxzZSBpZiAoaWRlbnRpZmllckZpbHRlcikge1xuICAgICAgICAgICAgZmlsdGVyID0gYFdIRVJFICgke2lkZW50aWZpZXJGaWx0ZXJ9KWA7XG4gICAgICAgIH0gZWxzZSBpZiAodWlkRmlsdGVyKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSBgV0hFUkUgKCR7dWlkRmlsdGVyfSlgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRCYXNlUGF0aChiYXNlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFiYXNlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNlUGF0aC5pbmRleE9mKCdmaWxlOi8vJykgIT09IC0xKSB7XG4gICAgICAgICAgICBiYXNlUGF0aCA9IGJhc2VQYXRoLnJlcGxhY2UoJ2ZpbGU6Ly8nLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlUGF0aCA9ICdmaWxlOi8vJy5jb25jYXQoYmFzZVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYXNlUGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFJvbGx1cChpZGVudGlmaWVyOiBzdHJpbmcsIGhpZXJhY2h5SW5mbzogSGllcmFyY2h5SW5mb1tdKTogUm9sbHVwIHtcbiAgICAgICAgbGV0IGwxLCBsMiwgbDMsIGw0O1xuICAgICAgICBpZiAoIWhpZXJhY2h5SW5mbykge1xuICAgICAgICAgICAgbDEgPSBpZGVudGlmaWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaGllcmFjaHlJbmZvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGwxID0gaGllcmFjaHlJbmZvW2ldLmlkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgbDIgPSBoaWVyYWNoeUluZm9baV0uaWRlbnRpZmllcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsMyA9IGhpZXJhY2h5SW5mb1tpXS5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGw0ID0gaGllcmFjaHlJbmZvW2ldLmlkZW50aWZpZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvbGx1cDogUm9sbHVwID0ge2wxOiBsMSwgbDI6IGwyLCBsMzogbDMsIGw0OiBsNH07XG4gICAgICAgIHJldHVybiByb2xsdXA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhZGRPclVwZGF0ZVJlZkNvdW50KHJlZkNvdW50OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAocmVmQ291bnQgPCAwKSB7XG4gICAgICAgICAgICByZWZDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZkNvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNOb3RVbml0KG1pbWVUeXBlLCB2aXNpYmlsaXR5KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKE1pbWVUeXBlLkNPTExFQ1RJT04udmFsdWVPZigpID09PSBtaW1lVHlwZSAmJiBWaXNpYmlsaXR5LlBBUkVOVC52YWx1ZU9mKCkgPT09IHZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29udGVudEF0dHJpYnV0ZShkYXRhKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zb3J0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCB2YWx1ZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUuY29uY2F0KCd+JywgdmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlLmNvbmNhdCgnficsIHZhbHVlW2ldLCAnficpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RmluZEFsbENvbnRlbnRzV2l0aElkZW50aWZpZXJRdWVyeShpZGVudGlmaWVyczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpZGVudGlmaWVyc1N0ciA9IEFycmF5VXRpbC5qb2luUHJlc2VydmluZ1F1b3RlcyhpZGVudGlmaWVycyk7XG4gICAgICAgIGNvbnN0IG9yZGVyQnkgPSBgIG9yZGVyIGJ5ICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0xBU1RfVVBEQVRFRF9PTn0gZGVzYywgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0xBU1RfVVBEQVRFRF9PTn0gZGVzY2A7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IGAgd2hlcmUgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfSURFTlRJRklFUn0gaW4gKCR7aWRlbnRpZmllcnNTdHJ9KSBBTkQgJHtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UfSA+IDBgO1xuICAgICAgICByZXR1cm4gYHNlbGVjdCAqIGZyb20gJHtDb250ZW50RW50cnkuVEFCTEVfTkFNRX0gJHtmaWx0ZXJ9ICR7b3JkZXJCeX1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RmluZEFsbENvbnRlbnRzUXVlcnkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBzZWxlY3QgKiBmcm9tICR7Q29udGVudEVudHJ5LlRBQkxFX05BTUV9IHdoZXJlICR7Q29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1JFRl9DT1VOVH0gPiAwYDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnN0cnVjdENvbnRlbnREQk1vZGVsKGlkZW50aWZpZXIsIG1hbmlmZXN0VmVyc2lvbiwgbG9jYWxEYXRhLCBtaW1lVHlwZSwgY29udGVudFR5cGUsIHZpc2liaWxpdHksIHBhdGgsIHJlZkNvdW50LFxuICAgICAgICBjb250ZW50U3RhdGUsIGF1ZGllbmNlLCBwcmFnbWEsIHNpemVPbkRldmljZSwgYm9hcmQsIG1lZGl1bSwgZ3JhZGUsIHByaW1hcnlDYXRlZ29yeSk6IENvbnRlbnRFbnRyeS5TY2hlbWFNYXAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9JREVOVElGSUVSXTogaWRlbnRpZmllcixcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0VSVkVSX0RBVEFdOiAnJyxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUEFUSF06IENvbnRlbnRVdGlsLmdldEJhc2VQYXRoKHBhdGgpLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9SRUZfQ09VTlRdOiByZWZDb3VudCxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV06IGNvbnRlbnRTdGF0ZSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfU0laRV9PTl9ERVZJQ0VdOiBzaXplT25EZXZpY2UsXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01BTklGRVNUX1ZFUlNJT05dOiBtYW5pZmVzdFZlcnNpb24sXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0xPQ0FMX0RBVEFdOiBsb2NhbERhdGEsXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX01JTUVfVFlQRV06IG1pbWVUeXBlLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9DT05URU5UX1RZUEVdOiBjb250ZW50VHlwZSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV06IHZpc2liaWxpdHksXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0FVRElFTkNFXTogYXVkaWVuY2UsXG4gICAgICAgICAgICBbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1BSQUdNQV06IHByYWdtYSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTE9DQUxfTEFTVF9VUERBVEVEX09OXTogZGF5anMoKS5mb3JtYXQoKSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQk9BUkRdOiBDb250ZW50VXRpbC5nZXRDb250ZW50QXR0cmlidXRlKGJvYXJkKSxcbiAgICAgICAgICAgIFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfTUVESVVNXTogQ29udGVudFV0aWwuZ2V0Q29udGVudEF0dHJpYnV0ZShtZWRpdW0pLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9HUkFERV06IENvbnRlbnRVdGlsLmdldENvbnRlbnRBdHRyaWJ1dGUoZ3JhZGUpLFxuICAgICAgICAgICAgW0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9QUklNQVJZX0NBVEVHT1JZXTogcHJpbWFyeUNhdGVnb3J5XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZWZlcmVuY2VDb3VudChleGlzdGluZ0NvbnRlbnQsIHZpc2liaWxpdHk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCByZWZDb3VudDogbnVtYmVyO1xuICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50KSB7XG4gICAgICAgICAgICByZWZDb3VudCA9IGV4aXN0aW5nQ29udGVudFtDb250ZW50RW50cnkuQ09MVU1OX05BTUVfUkVGX0NPVU5UXTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGNvbnRlbnQgaGFzIGEgJ0RlZmF1bHQnIHZpc2liaWxpdHkgYW5kIHVwZGF0ZSB0aGUgc2FtZSBjb250ZW50IHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIHJlZmVyZW5jZSBjb3VudC4uLlxuICAgICAgICAgICAgaWYgKCEoVmlzaWJpbGl0eS5ERUZBVUxULnZhbHVlT2YoKSA9PT0gZXhpc3RpbmdDb250ZW50W0NvbnRlbnRFbnRyeS5DT0xVTU5fTkFNRV9WSVNJQklMSVRZXVxuICAgICAgICAgICAgICAgICYmIFZpc2liaWxpdHkuREVGQVVMVC52YWx1ZU9mKCkgPT09IHZpc2liaWxpdHkpKSB7XG4gICAgICAgICAgICAgICAgcmVmQ291bnQgPSByZWZDb3VudCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWZDb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZkNvdW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBvciB1cGRhdGUgdGhlIHJlZmVyZW5jZSBjb3VudCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29udGVudFZpc2liaWxpdHkoZXhpc3RpbmdDb250ZW50SW5EYiwgb2JqZWN0VHlwZSwgcHJldml1b3NWaXNpYmlsaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdmlzaWJpbGl0eTtcbiAgICAgICAgaWYgKCdMaWJyYXJ5JyA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgICAgICAgdmlzaWJpbGl0eSA9IFZpc2liaWxpdHkuUEFSRU5ULnZhbHVlT2YoKTtcbiAgICAgICAgfSBlbHNlIGlmIChleGlzdGluZ0NvbnRlbnRJbkRiKSB7XG4gICAgICAgICAgICBpZiAoIVZpc2liaWxpdHkuUEFSRU5ULnZhbHVlT2YoKSA9PT0gZXhpc3RpbmdDb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfVklTSUJJTElUWV0pIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBub3Qgc3RhcnRlZCBmcm9tIGNoaWxkIGNvbnRlbnQgdGhlbiBkbyBub3Qgc2hyaW5rIHZpc2liaWxpdHkuXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IGV4aXN0aW5nQ29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX1ZJU0lCSUxJVFldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2aXNpYmlsaXR5ID8gdmlzaWJpbGl0eSA6IHByZXZpdW9zVmlzaWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgb3IgdXBkYXRlIHRoZSBjb250ZW50X3N0YXRlLiBjb250ZW50U3RhdGUgc2hvdWxkIG5vdCB1cGRhdGUgdGhlIHNwaW5lX29ubHkgd2hlbiBpbXBvcnRpbmcgdGhlIHNwaW5lIGNvbnRlbnRcbiAgICAgKiBhZnRlciBpbXBvcnRpbmcgY29udGVudCB3aXRoIGFydGlmYWN0cy5cbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29udGVudFN0YXRlKGV4aXN0aW5nQ29udGVudEluRGIsIGNvbnRlbnRTdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nQ29udGVudEluRGIgJiYgZXhpc3RpbmdDb250ZW50SW5EYltDb250ZW50RW50cnkuQ09MVU1OX05BTUVfQ09OVEVOVF9TVEFURV0gPiBjb250ZW50U3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnRlbnRTdGF0ZSA9IGV4aXN0aW5nQ29udGVudEluRGJbQ29udGVudEVudHJ5LkNPTFVNTl9OQU1FX0NPTlRFTlRfU1RBVEVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZW50U3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0ZyZWVTcGFjZUF2YWlsYWJsZShkZXZpY2VBdmFpbGFibGVGcmVlU3BhY2U6IG51bWJlciwgZmlsZVNwYWNlOiBudW1iZXIsIGJ1ZmZlclNpemU6IG51bWJlcikge1xuICAgICAgICBsZXQgQlVGRkVSX1NJWkUgPSAxMDI0ICogMTA7XG4gICAgICAgIGlmIChidWZmZXJTaXplID4gMCkge1xuICAgICAgICAgICAgQlVGRkVSX1NJWkUgPSBidWZmZXJTaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXZpY2VBdmFpbGFibGVGcmVlU3BhY2UgPiAwICYmIGRldmljZUF2YWlsYWJsZUZyZWVTcGFjZSA+IChmaWxlU3BhY2UgKyBCVUZGRVJfU0laRSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNmZXJDb3VudCh2aXJhbGl0eU1ldGFkYXRhKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgdHJhbnNmZXJDb3VudCA9IHZpcmFsaXR5TWV0YWRhdGFbJ3RyYW5zZmVyQ291bnQnXTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRyYW5zZmVyQ291bnQsIDApO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNDb250ZW50TWV0YWRhdGFBYnNlbnQobG9jYWxEYXRhTWFwKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhQm9vbGVhbihsb2NhbERhdGFNYXBbJ2NvbnRlbnRNZXRhRGF0YSddKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc0NvbnRlbnRNZXRhZGF0YVByZXNlbnRXaXRob3V0VmlyYWxpdHlNZXRhZGF0YShsb2NhbERhdGEpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFCb29sZWFuKChsb2NhbERhdGFbJ2NvbnRlbnRNZXRhRGF0YSddKVsndmlyYWxpdHknXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc1RyYWNrYWJsZShjb250ZW50KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGNvbnRlbnQudHJhY2thYmxlICYmIHR5cGVvZiAoY29udGVudC50cmFja2FibGUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGVudC50cmFja2FibGUgPSBKU09OLnBhcnNlKGNvbnRlbnQudHJhY2thYmxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudC50cmFja2FibGUgJiYgY29udGVudC50cmFja2FibGUuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGNvbnRlbnQudHJhY2thYmxlLmVuYWJsZWQgPT09IFRyYWNraW5nRW5hYmxlZC5ZRVMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGVudC5taW1lVHlwZSA9PT0gTWltZVR5cGUuQ09MTEVDVElPTikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5jb250ZW50VHlwZS50b0xvd2VyQ2FzZSgpID09PSBDc0NvbnRlbnRUeXBlLkNPVVJTRS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQubWltZVR5cGUgPT09IE1pbWVUeXBlLkNPTExFQ1RJT04pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQYXJzZUVycm9yT2JqZWN0KGRhdGEpOiBhbnkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19