var Migration = /** @class */ (function () {
    function Migration(migrationNumber, targetDbVersion) {
        this.targetDbVersion = targetDbVersion;
        this.migrationNumber = migrationNumber;
    }
    Migration.prototype.required = function (oldVersion, newVersion) {
        return oldVersion < this.targetDbVersion && this.targetDbVersion <= newVersion;
    };
    return Migration;
}());
export { Migration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RiL2RlZi9taWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7SUFLSSxtQkFBc0IsZUFBdUIsRUFBRSxlQUF1QjtRQUNsRSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBS0QsNEJBQVEsR0FBUixVQUFTLFVBQWtCLEVBQUUsVUFBa0I7UUFDM0MsT0FBTyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLFVBQVUsQ0FBQztJQUNuRixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYlNlcnZpY2V9IGZyb20gJy4vZGItc2VydmljZSc7XG5leHBvcnQgdHlwZSBNaWdyYXRpb25GYWN0b3J5ID0gKCkgPT4gTWlncmF0aW9uO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWlncmF0aW9uIHtcblxuICAgIHRhcmdldERiVmVyc2lvbjogbnVtYmVyO1xuICAgIG1pZ3JhdGlvbk51bWJlcjogbnVtYmVyO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1pZ3JhdGlvbk51bWJlcjogbnVtYmVyLCB0YXJnZXREYlZlcnNpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLnRhcmdldERiVmVyc2lvbiA9IHRhcmdldERiVmVyc2lvbjtcbiAgICAgICAgdGhpcy5taWdyYXRpb25OdW1iZXIgPSBtaWdyYXRpb25OdW1iZXI7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgYXBwbHkoZGJTZXJ2aWNlOiBEYlNlcnZpY2UpOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gICAgYWJzdHJhY3QgcXVlcmllcygpOiBBcnJheTxzdHJpbmc+O1xuXG4gICAgcmVxdWlyZWQob2xkVmVyc2lvbjogbnVtYmVyLCBuZXdWZXJzaW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG9sZFZlcnNpb24gPCB0aGlzLnRhcmdldERiVmVyc2lvbiAmJiB0aGlzLnRhcmdldERiVmVyc2lvbiA8PSBuZXdWZXJzaW9uO1xuICAgIH1cblxufVxuIl19