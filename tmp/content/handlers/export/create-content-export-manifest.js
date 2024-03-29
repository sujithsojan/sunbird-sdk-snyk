import { Response } from '../../../api';
import * as dayjs from 'dayjs';
var CreateContentExportManifest = /** @class */ (function () {
    function CreateContentExportManifest(dbService, exportHandler) {
        this.dbService = dbService;
        this.exportHandler = exportHandler;
    }
    CreateContentExportManifest.prototype.execute = function (exportContentContext) {
        var response = new Response();
        var items = this.exportHandler.populateItems(exportContentContext.contentModelsToExport);
        exportContentContext.items = [];
        exportContentContext.manifest = {};
        exportContentContext.items = exportContentContext.items.concat(items);
        var archive = {};
        archive['ttl'] = 24;
        archive['count'] = exportContentContext.items.length;
        archive['items'] = exportContentContext.items;
        // Initialize manifest
        exportContentContext.manifest['id'] = CreateContentExportManifest.EKSTEP_CONTENT_ARCHIVE;
        exportContentContext.manifest['ver'] = CreateContentExportManifest.SUPPORTED_MANIFEST_VERSION;
        exportContentContext.manifest['ts'] = dayjs().format();
        exportContentContext.manifest['archive'] = archive;
        response.body = exportContentContext;
        return Promise.resolve(response);
    };
    CreateContentExportManifest.EKSTEP_CONTENT_ARCHIVE = 'ekstep.content.archive';
    CreateContentExportManifest.SUPPORTED_MANIFEST_VERSION = '1.1';
    return CreateContentExportManifest;
}());
export { CreateContentExportManifest };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbnRlbnQtZXhwb3J0LW1hbmlmZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvZXhwb3J0L2NyZWF0ZS1jb250ZW50LWV4cG9ydC1tYW5pZmVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRy9CO0lBS0kscUNBQW9CLFNBQW9CLEVBQ3BCLGFBQW1DO1FBRG5DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQXNCO0lBQ3ZELENBQUM7SUFFRCw2Q0FBTyxHQUFQLFVBQVEsb0JBQTBDO1FBQzlDLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBTSxLQUFLLEdBQVUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNsRyxvQkFBb0IsQ0FBQyxLQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkUsSUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxLQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFFOUMsc0JBQXNCO1FBQ3RCLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRywyQkFBMkIsQ0FBQyxzQkFBc0IsQ0FBQztRQUN6RixvQkFBb0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsMkJBQTJCLENBQUMsMEJBQTBCLENBQUM7UUFDOUYsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZELG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkQsUUFBUSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQXpCdUIsa0RBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFDbEQsc0RBQTBCLEdBQUcsS0FBSyxDQUFDO0lBMEIvRCxrQ0FBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGJTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9kYic7XG5pbXBvcnQge0V4cG9ydENvbnRlbnRDb250ZXh0fSBmcm9tICcuLi8uLic7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi8uLi8uLi9hcGknO1xuaW1wb3J0ICogYXMgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHtJbXBvcnRORXhwb3J0SGFuZGxlcn0gZnJvbSAnLi4vaW1wb3J0LW4tZXhwb3J0LWhhbmRsZXInO1xuXG5leHBvcnQgY2xhc3MgQ3JlYXRlQ29udGVudEV4cG9ydE1hbmlmZXN0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVLU1RFUF9DT05URU5UX0FSQ0hJVkUgPSAnZWtzdGVwLmNvbnRlbnQuYXJjaGl2ZSc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU1VQUE9SVEVEX01BTklGRVNUX1ZFUlNJT04gPSAnMS4xJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJTZXJ2aWNlOiBEYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBleHBvcnRIYW5kbGVyOiBJbXBvcnRORXhwb3J0SGFuZGxlcikge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoZXhwb3J0Q29udGVudENvbnRleHQ6IEV4cG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgY29uc3QgaXRlbXM6IGFueVtdID0gdGhpcy5leHBvcnRIYW5kbGVyLnBvcHVsYXRlSXRlbXMoZXhwb3J0Q29udGVudENvbnRleHQuY29udGVudE1vZGVsc1RvRXhwb3J0KTtcbiAgICAgICAgZXhwb3J0Q29udGVudENvbnRleHQuaXRlbXMhID0gW107XG4gICAgICAgIGV4cG9ydENvbnRlbnRDb250ZXh0Lm1hbmlmZXN0ID0ge307XG4gICAgICAgIGV4cG9ydENvbnRlbnRDb250ZXh0Lml0ZW1zID0gZXhwb3J0Q29udGVudENvbnRleHQuaXRlbXMhLmNvbmNhdChpdGVtcyk7XG4gICAgICAgIGNvbnN0IGFyY2hpdmU6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgICAgYXJjaGl2ZVsndHRsJ10gPSAyNDtcbiAgICAgICAgYXJjaGl2ZVsnY291bnQnXSA9IGV4cG9ydENvbnRlbnRDb250ZXh0Lml0ZW1zIS5sZW5ndGg7XG4gICAgICAgIGFyY2hpdmVbJ2l0ZW1zJ10gPSBleHBvcnRDb250ZW50Q29udGV4dC5pdGVtcztcblxuICAgICAgICAvLyBJbml0aWFsaXplIG1hbmlmZXN0XG4gICAgICAgIGV4cG9ydENvbnRlbnRDb250ZXh0Lm1hbmlmZXN0WydpZCddID0gQ3JlYXRlQ29udGVudEV4cG9ydE1hbmlmZXN0LkVLU1RFUF9DT05URU5UX0FSQ0hJVkU7XG4gICAgICAgIGV4cG9ydENvbnRlbnRDb250ZXh0Lm1hbmlmZXN0Wyd2ZXInXSA9IENyZWF0ZUNvbnRlbnRFeHBvcnRNYW5pZmVzdC5TVVBQT1JURURfTUFOSUZFU1RfVkVSU0lPTjtcbiAgICAgICAgZXhwb3J0Q29udGVudENvbnRleHQubWFuaWZlc3RbJ3RzJ10gPSBkYXlqcygpLmZvcm1hdCgpO1xuICAgICAgICBleHBvcnRDb250ZW50Q29udGV4dC5tYW5pZmVzdFsnYXJjaGl2ZSddID0gYXJjaGl2ZTtcbiAgICAgICAgcmVzcG9uc2UuYm9keSA9IGV4cG9ydENvbnRlbnRDb250ZXh0O1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbn1cbiJdfQ==