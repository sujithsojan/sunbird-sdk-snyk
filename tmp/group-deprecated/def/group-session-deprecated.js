import { UniqueId } from '../../db/util/unique-id';
var GroupSessionDeprecated = /** @class */ (function () {
    function GroupSessionDeprecated(gid) {
        this._gid = gid;
        this._sid = UniqueId.generateUniqueId();
        this._createdTime = Date.now();
    }
    Object.defineProperty(GroupSessionDeprecated.prototype, "gid", {
        get: function () {
            return this._gid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupSessionDeprecated.prototype, "sid", {
        get: function () {
            return this._sid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupSessionDeprecated.prototype, "createdTime", {
        get: function () {
            return this._createdTime;
        },
        enumerable: false,
        configurable: true
    });
    return GroupSessionDeprecated;
}());
export { GroupSessionDeprecated };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtc2Vzc2lvbi1kZXByZWNhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dyb3VwLWRlcHJlY2F0ZWQvZGVmL2dyb3VwLXNlc3Npb24tZGVwcmVjYXRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7SUFLSSxnQ0FBWSxHQUFXO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHNCQUFJLHVDQUFHO2FBQVA7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBRzthQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0NBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VW5pcXVlSWR9IGZyb20gJy4uLy4uL2RiL3V0aWwvdW5pcXVlLWlkJztcblxuZXhwb3J0IGNsYXNzIEdyb3VwU2Vzc2lvbkRlcHJlY2F0ZWQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2dpZDogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NpZDogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NyZWF0ZWRUaW1lOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihnaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9naWQgPSBnaWQ7XG4gICAgICAgIHRoaXMuX3NpZCA9IFVuaXF1ZUlkLmdlbmVyYXRlVW5pcXVlSWQoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGdldCBnaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dpZDtcbiAgICB9XG5cbiAgICBnZXQgc2lkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNyZWF0ZWRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVkVGltZTtcbiAgICB9XG59XG4iXX0=