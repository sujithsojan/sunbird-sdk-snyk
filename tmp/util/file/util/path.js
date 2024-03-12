var Path = /** @class */ (function () {
    function Path() {
    }
    Path.dirPathFromFilePath = function (filePath) {
        return filePath.substring(0, filePath.lastIndexOf('/'));
    };
    Path.fileNameFromFilePath = function (filePath) {
        return filePath.substring(filePath.lastIndexOf('/') + 1);
    };
    Path.getAssetPath = function () {
        return (window.device.platform.toLowerCase() === "ios" ? cordova.file.applicationDirectory + 'www/assets' : Path.ASSETS_PATH);
    };
    Path.ASSETS_PATH = 'file:///android_asset/www/assets';
    return Path;
}());
export { Path };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2ZpbGUvdXRpbC9wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQUE7SUFhQSxDQUFDO0lBVmlCLHdCQUFtQixHQUFqQyxVQUFrQyxRQUFnQjtRQUM5QyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRWEseUJBQW9CLEdBQWxDLFVBQW1DLFFBQWdCO1FBQy9DLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDYSxpQkFBWSxHQUExQjtRQUNJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsWUFBWSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDakksQ0FBQztJQVhhLGdCQUFXLEdBQUcsa0NBQWtDLENBQUM7SUFZbkUsV0FBQztDQUFBLEFBYkQsSUFhQztTQWJZLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGF0aCB7XG4gICAgcHVibGljIHN0YXRpYyBBU1NFVFNfUEFUSCA9ICdmaWxlOi8vL2FuZHJvaWRfYXNzZXQvd3d3L2Fzc2V0cyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRpclBhdGhGcm9tRmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aC5zdWJzdHJpbmcoMCwgZmlsZVBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaWxlTmFtZUZyb21GaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLnN1YnN0cmluZyhmaWxlUGF0aC5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QXNzZXRQYXRoKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5kZXZpY2UucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gXCJpb3NcIiA/ICBjb3Jkb3ZhLmZpbGUuYXBwbGljYXRpb25EaXJlY3RvcnkgKyAnd3d3L2Fzc2V0cyc6IFBhdGguQVNTRVRTX1BBVEgpXG4gICAgfVxufVxuIl19