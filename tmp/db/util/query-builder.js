var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this.query = '';
    }
    QueryBuilder.prototype.where = function (condition) {
        this.query += condition.trim();
        return new QueryBuilder.WhereDecorator(this);
    };
    QueryBuilder.prototype.build = function () {
        return this.query;
    };
    QueryBuilder.ConstraintDecorator = /** @class */ (function () {
        function ConstraintDecorator(queryBuilder) {
            this.queryBuilder = queryBuilder;
        }
        ConstraintDecorator.prototype.and = function () {
            this.queryBuilder.query += ' AND ';
            return this.queryBuilder;
        };
        ConstraintDecorator.prototype.or = function () {
            this.queryBuilder.query += ' OR ';
            return this.queryBuilder;
        };
        ConstraintDecorator.prototype.end = function () {
            return this.queryBuilder;
        };
        return ConstraintDecorator;
    }());
    QueryBuilder.WhereDecorator = /** @class */ (function () {
        function WhereDecorator(queryBuilder) {
            this.queryBuilder = queryBuilder;
        }
        WhereDecorator.prototype.args = function (args) {
            var _this = this;
            args.forEach(function (arg) {
                _this.interpolate(arg);
            });
            return new QueryBuilder.ConstraintDecorator(this.queryBuilder);
        };
        WhereDecorator.prototype.interpolate = function (arg) {
            if (isNaN(arg)) {
                arg = '"' + arg + '"';
            }
            this.queryBuilder.query = this.queryBuilder.query.replace('?', arg);
        };
        return WhereDecorator;
    }());
    return QueryBuilder;
}());
export { QueryBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi91dGlsL3F1ZXJ5LWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFBQTtRQThDWSxVQUFLLEdBQUcsRUFBRSxDQUFDO0lBV3ZCLENBQUM7SUFURyw0QkFBSyxHQUFMLFVBQU0sU0FBaUI7UUFDbkIsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0IsT0FBTyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQXZEYyxnQ0FBbUI7UUFHOUIsNkJBQVksWUFBMEI7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDckMsQ0FBQztRQUVELGlDQUFHLEdBQUg7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7UUFFRCxnQ0FBRSxHQUFGO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBRUQsaUNBQUcsR0FBSDtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBcEJvQyxJQW9CbkM7SUFFYSwyQkFBYztRQUd6Qix3QkFBWSxZQUEwQjtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNyQyxDQUFDO1FBRUQsNkJBQUksR0FBSixVQUFLLElBQWM7WUFBbkIsaUJBTUM7WUFMRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDYixLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELG9DQUFXLEdBQVgsVUFBWSxHQUFXO1lBQ25CLElBQUksS0FBSyxDQUFDLEdBQVUsQ0FBQyxFQUFFO2dCQUNuQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDekI7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFyQitCLElBcUI5QjtJQWFOLG1CQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBRdWVyeUJ1aWxkZXIge1xuICAgIHByaXZhdGUgc3RhdGljIENvbnN0cmFpbnREZWNvcmF0b3IgPSBjbGFzcyBDb25zdHJhaW50RGVjb3JhdG9yIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBxdWVyeUJ1aWxkZXI6IFF1ZXJ5QnVpbGRlcjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihxdWVyeUJ1aWxkZXI6IFF1ZXJ5QnVpbGRlcikge1xuICAgICAgICAgICAgdGhpcy5xdWVyeUJ1aWxkZXIgPSBxdWVyeUJ1aWxkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhbmQoKTogUXVlcnlCdWlsZGVyIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlCdWlsZGVyLnF1ZXJ5ICs9ICcgQU5EICc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUJ1aWxkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBvcigpOiBRdWVyeUJ1aWxkZXIge1xuICAgICAgICAgICAgdGhpcy5xdWVyeUJ1aWxkZXIucXVlcnkgKz0gJyBPUiAnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlCdWlsZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kKCk6IFF1ZXJ5QnVpbGRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUJ1aWxkZXI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgV2hlcmVEZWNvcmF0b3IgPSBjbGFzcyBXaGVyZURlY29yYXRvciB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcXVlcnlCdWlsZGVyOiBRdWVyeUJ1aWxkZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IocXVlcnlCdWlsZGVyOiBRdWVyeUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlCdWlsZGVyID0gcXVlcnlCdWlsZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncyhhcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICAgICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlKGFyZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWVyeUJ1aWxkZXIuQ29uc3RyYWludERlY29yYXRvcih0aGlzLnF1ZXJ5QnVpbGRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpbnRlcnBvbGF0ZShhcmc6IHN0cmluZykge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGFyZyBhcyBhbnkpKSB7XG4gICAgICAgICAgICAgICAgYXJnID0gJ1wiJyArIGFyZyArICdcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5QnVpbGRlci5xdWVyeSA9IHRoaXMucXVlcnlCdWlsZGVyLnF1ZXJ5LnJlcGxhY2UoJz8nLCBhcmcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgcXVlcnkgPSAnJztcblxuICAgIHdoZXJlKGNvbmRpdGlvbjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgdGhpcy5xdWVyeSArPSBjb25kaXRpb24udHJpbSgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUXVlcnlCdWlsZGVyLldoZXJlRGVjb3JhdG9yKHRoaXMpO1xuICAgIH1cblxuICAgIGJ1aWxkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICAgIH1cbn1cblxuIl19