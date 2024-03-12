var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    ArrayUtil.joinPreservingQuotes = function (array) {
        return array.map(function (i) { return "'" + i + "'"; }).join(',');
    };
    ArrayUtil.isEmpty = function (array) {
        return !array || array.length === 0;
    };
    ArrayUtil.contains = function (array, item) {
        return array && array.indexOf(item) !== -1;
    };
    ArrayUtil.deDupe = function (array) {
        return array.filter(function (value, index, arr) {
            return arr.indexOf(value) === index;
        });
    };
    return ArrayUtil;
}());
export { ArrayUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2FycmF5LXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFBQTtJQW1CQSxDQUFDO0lBakJpQiw4QkFBb0IsR0FBbEMsVUFBbUMsS0FBZTtRQUM5QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFJLENBQUMsTUFBRyxFQUFSLENBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRWEsaUJBQU8sR0FBckIsVUFBeUIsS0FBVTtRQUMvQixPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFYSxrQkFBUSxHQUF0QixVQUF1QixLQUFlLEVBQUUsSUFBWTtRQUNoRCxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFYSxnQkFBTSxHQUFwQixVQUFxQixLQUFLO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRztZQUNsQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcnJheVV0aWwge1xuXG4gICAgcHVibGljIHN0YXRpYyBqb2luUHJlc2VydmluZ1F1b3RlcyhhcnJheTogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYXJyYXkubWFwKGkgPT4gYCcke2l9J2ApLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHk8VD4oYXJyYXk6IFRbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW5zKGFycmF5OiBzdHJpbmdbXSwgaXRlbTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBhcnJheSAmJiBhcnJheS5pbmRleE9mKGl0ZW0pICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlRHVwZShhcnJheSk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=