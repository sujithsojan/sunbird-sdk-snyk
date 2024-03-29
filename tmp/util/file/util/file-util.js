var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    FileUtil.getFileExtension = function (filePath) {
        var extension = filePath.substring((filePath.lastIndexOf('.') + 1), filePath.length);
        return extension ? extension : '';
    };
    FileUtil.getFileName = function (filePath) {
        return filePath.substring(filePath.lastIndexOf('/') + 1);
    };
    FileUtil.getParentDir = function (directoryPath) {
        return directoryPath.substr(0, directoryPath.lastIndexOf('/', directoryPath.length - 2)).concat('/');
    };
    FileUtil.getDirectoryName = function (filePath) {
        var dirNames = filePath.split('/');
        return dirNames[dirNames.length - 2];
    };
    FileUtil.getTempDirPath = function (externalFilesDir) {
        return externalFilesDir + '/tmp';
    };
    FileUtil.isFreeSpaceAvailable = function (deviceAvailableFreeSpace, fileSpace, bufferSize) {
        var BUFFER_SIZE = 1024 * 10;
        if (bufferSize > 0) {
            BUFFER_SIZE = bufferSize;
        }
        return deviceAvailableFreeSpace > 0 && deviceAvailableFreeSpace > (fileSpace + BUFFER_SIZE);
    };
    FileUtil.getDirecory = function (path) {
        return path.substr(0, path.lastIndexOf('/'));
    };
    return FileUtil;
}());
export { FileUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvZmlsZS91dGlsL2ZpbGUtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUFBO0lBa0NBLENBQUM7SUFqQ2lCLHlCQUFnQixHQUE5QixVQUErQixRQUFnQjtRQUMzQyxJQUFNLFNBQVMsR0FBVyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0YsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFYSxvQkFBVyxHQUF6QixVQUEwQixRQUFnQjtRQUN0QyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRWEscUJBQVksR0FBMUIsVUFBMkIsYUFBcUI7UUFDNUMsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFYSx5QkFBZ0IsR0FBOUIsVUFBK0IsUUFBZ0I7UUFDM0MsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFYSx1QkFBYyxHQUE1QixVQUE2QixnQkFBd0I7UUFDakQsT0FBTyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVhLDZCQUFvQixHQUFsQyxVQUFtQyx3QkFBZ0MsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ3RHLElBQUksV0FBVyxHQUFXLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxVQUFVLENBQUM7U0FDNUI7UUFDRCxPQUFPLHdCQUF3QixHQUFHLENBQUMsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRWEsb0JBQVcsR0FBekIsVUFBMEIsSUFBWTtRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRmlsZVV0aWwge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RmlsZUV4dGVuc2lvbihmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uOiBzdHJpbmcgPSBmaWxlUGF0aC5zdWJzdHJpbmcoKGZpbGVQYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxKSwgZmlsZVBhdGgubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbiA/IGV4dGVuc2lvbiA6ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RmlsZU5hbWUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aC5zdWJzdHJpbmcoZmlsZVBhdGgubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGFyZW50RGlyKGRpcmVjdG9yeVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlQYXRoLnN1YnN0cigwLCBkaXJlY3RvcnlQYXRoLmxhc3RJbmRleE9mKCcvJywgZGlyZWN0b3J5UGF0aC5sZW5ndGggLSAyKSkuY29uY2F0KCcvJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJlY3RvcnlOYW1lKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkaXJOYW1lcyA9IGZpbGVQYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgIHJldHVybiBkaXJOYW1lc1tkaXJOYW1lcy5sZW5ndGggLSAyXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFRlbXBEaXJQYXRoKGV4dGVybmFsRmlsZXNEaXI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBleHRlcm5hbEZpbGVzRGlyICsgJy90bXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNGcmVlU3BhY2VBdmFpbGFibGUoZGV2aWNlQXZhaWxhYmxlRnJlZVNwYWNlOiBudW1iZXIsIGZpbGVTcGFjZTogbnVtYmVyLCBidWZmZXJTaXplOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IEJVRkZFUl9TSVpFOiBudW1iZXIgPSAxMDI0ICogMTA7XG4gICAgICAgIGlmIChidWZmZXJTaXplID4gMCkge1xuICAgICAgICAgICAgQlVGRkVSX1NJWkUgPSBidWZmZXJTaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXZpY2VBdmFpbGFibGVGcmVlU3BhY2UgPiAwICYmIGRldmljZUF2YWlsYWJsZUZyZWVTcGFjZSA+IChmaWxlU3BhY2UgKyBCVUZGRVJfU0laRSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJlY29yeShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcbiAgICB9XG59XG4iXX0=