import { Response } from '../../../api';
var EcarCleanup = /** @class */ (function () {
    function EcarCleanup(fileService) {
        this.fileService = fileService;
    }
    EcarCleanup.prototype.execute = function (importContentContext) {
        var response = new Response();
        return this.fileService.removeRecursively(importContentContext.tmpLocation)
            .then(function () {
            response.body = importContentContext;
            return Promise.resolve(response);
        }).catch(function () {
            return Promise.reject(response);
        });
    };
    return EcarCleanup;
}());
export { EcarCleanup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNhci1jbGVhbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGFuZGxlcnMvaW1wb3J0L2VjYXItY2xlYW51cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDO0lBRUkscUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzVDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsb0JBQTBDO1FBQzlDLElBQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFdBQVksQ0FBQzthQUN2RSxJQUFJLENBQUM7WUFDRixRQUFRLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDO1lBQ3JDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3V0aWwvZmlsZS9kZWYvZmlsZS1zZXJ2aWNlJztcbmltcG9ydCB7SW1wb3J0Q29udGVudENvbnRleHR9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uLy4uLy4uL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBFY2FyQ2xlYW51cCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSkge1xuICAgIH1cblxuICAgIGV4ZWN1dGUoaW1wb3J0Q29udGVudENvbnRleHQ6IEltcG9ydENvbnRlbnRDb250ZXh0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVNlcnZpY2UucmVtb3ZlUmVjdXJzaXZlbHkoaW1wb3J0Q29udGVudENvbnRleHQudG1wTG9jYXRpb24hKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkgPSBpbXBvcnRDb250ZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19