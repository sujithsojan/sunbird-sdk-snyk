var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var FrameworkMapper = /** @class */ (function () {
    function FrameworkMapper() {
    }
    FrameworkMapper.prepareFrameworkCategoryAssociations = function (framework) {
        if (!framework.categories) {
            return framework;
        }
        framework.categories = framework.categories.map(function (category, categoryIndex) {
            if (!category.terms) {
                return category;
            }
            return __assign(__assign({}, category), { terms: category.terms.map(function (term) {
                    if (!term.associations) {
                        return term;
                    }
                    if (term.associations.length) {
                        term.associations = term.associations.filter(function (association) {
                            return (categoryIndex >= framework.categories.length - 1)
                                || (association.category === framework.categories[categoryIndex + 1].code);
                        });
                    }
                    return term;
                }) });
        });
        return __assign({}, framework);
    };
    FrameworkMapper.prepareFrameworkTranslations = function (framework, language) {
        framework.name = FrameworkMapper.getTranslatedValue(framework.translations, language, framework.name);
        if (framework.categories) {
            framework.categories = framework.categories
                .map(function (category) {
                category.name = FrameworkMapper.getTranslatedValue(category.translations, language, category.name);
                if (category.terms) {
                    category.terms = category.terms
                        .map(function (term) {
                        term.name = FrameworkMapper.getTranslatedValue(term.translations, language, term.name);
                        return term;
                    });
                }
                return category;
            });
        }
        return framework;
    };
    FrameworkMapper.prepareFrameworkCategoryTranslations = function (frameworkCategory, language) {
        frameworkCategory.name = FrameworkMapper.getTranslatedValue(frameworkCategory.translations, language, frameworkCategory.name);
        if (frameworkCategory.terms) {
            frameworkCategory.terms = frameworkCategory.terms
                .map(function (term) {
                term.name = FrameworkMapper.getTranslatedValue(term.translations, language, term.name);
                return term;
            });
        }
        return frameworkCategory;
    };
    FrameworkMapper.getTranslatedValue = function (translations, language, defaultTranslation) {
        if (!translations) {
            return defaultTranslation;
        }
        var translationsObj = JSON.parse(translations);
        return translationsObj[language] || defaultTranslation;
    };
    return FrameworkMapper;
}());
export { FrameworkMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrLW1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdXRpbC9mcmFtZXdvcmstbWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtJQWlGQSxDQUFDO0lBaEZpQixvREFBb0MsR0FBbEQsVUFBbUQsU0FBb0I7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBMkIsRUFBRSxhQUFxQjtZQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxRQUFRLENBQUM7YUFDbkI7WUFFRCw2QkFDTyxRQUFRLEtBQ1gsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtvQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLE9BQU8sSUFBSSxDQUFDO3FCQUNmO29CQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7d0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFnQzs0QkFDMUUsT0FBTyxDQUFDLGFBQWEsSUFBSSxTQUFTLENBQUMsVUFBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7bUNBQ25ELENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsVUFBVyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEYsQ0FBQyxDQUFDLENBQUM7cUJBQ047b0JBRUQsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxJQUNKO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxvQkFBVyxTQUFTLEVBQUU7SUFDMUIsQ0FBQztJQUVhLDRDQUE0QixHQUExQyxVQUEyQyxTQUFvQixFQUFFLFFBQWdCO1FBQzdFLFNBQVMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0RyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdEIsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVTtpQkFDdEMsR0FBRyxDQUFDLFVBQUMsUUFBMkI7Z0JBQzdCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNoQixRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLO3lCQUMxQixHQUFHLENBQUMsVUFBQyxJQUFJO3dCQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFdkYsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2dCQUVELE9BQU8sUUFBUSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1NBRVY7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRWEsb0RBQW9DLEdBQWxELFVBQW1ELGlCQUFvQyxFQUFFLFFBQWdCO1FBQ3JHLGlCQUFpQixDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5SCxJQUFJLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUN6QixpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSztpQkFDNUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtnQkFDTixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXZGLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFYyxrQ0FBa0IsR0FBakMsVUFBa0MsWUFBZ0MsRUFBRSxRQUFnQixFQUFFLGtCQUEwQjtRQUM1RyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsT0FBTyxrQkFBa0IsQ0FBQztTQUM3QjtRQUVELElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFakQsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksa0JBQWtCLENBQUM7SUFDM0QsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQWpGRCxJQWlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2F0ZWdvcnlBc3NvY2lhdGlvbiwgRnJhbWV3b3JrLCBGcmFtZXdvcmtDYXRlZ29yeX0gZnJvbSAnLi4nO1xuXG5leHBvcnQgY2xhc3MgRnJhbWV3b3JrTWFwcGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIHByZXBhcmVGcmFtZXdvcmtDYXRlZ29yeUFzc29jaWF0aW9ucyhmcmFtZXdvcms6IEZyYW1ld29yayk6IEZyYW1ld29yayB7XG4gICAgICAgIGlmICghZnJhbWV3b3JrLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZXdvcms7XG4gICAgICAgIH1cblxuICAgICAgICBmcmFtZXdvcmsuY2F0ZWdvcmllcyA9IGZyYW1ld29yay5jYXRlZ29yaWVzLm1hcCgoY2F0ZWdvcnk6IEZyYW1ld29ya0NhdGVnb3J5LCBjYXRlZ29yeUluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghY2F0ZWdvcnkudGVybXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgdGVybXM6IGNhdGVnb3J5LnRlcm1zLm1hcCgodGVybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRlcm0uYXNzb2NpYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGVybS5hc3NvY2lhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtLmFzc29jaWF0aW9ucyA9IHRlcm0uYXNzb2NpYXRpb25zLmZpbHRlcigoYXNzb2NpYXRpb246IENhdGVnb3J5QXNzb2NpYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNhdGVnb3J5SW5kZXggPj0gZnJhbWV3b3JrLmNhdGVnb3JpZXMhLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChhc3NvY2lhdGlvbi5jYXRlZ29yeSA9PT0gZnJhbWV3b3JrLmNhdGVnb3JpZXMhW2NhdGVnb3J5SW5kZXggKyAxXS5jb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7Li4uZnJhbWV3b3JrfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByZXBhcmVGcmFtZXdvcmtUcmFuc2xhdGlvbnMoZnJhbWV3b3JrOiBGcmFtZXdvcmssIGxhbmd1YWdlOiBzdHJpbmcpOiBGcmFtZXdvcmsge1xuICAgICAgICBmcmFtZXdvcmsubmFtZSA9IEZyYW1ld29ya01hcHBlci5nZXRUcmFuc2xhdGVkVmFsdWUoZnJhbWV3b3JrLnRyYW5zbGF0aW9ucywgbGFuZ3VhZ2UsIGZyYW1ld29yay5uYW1lKTtcblxuICAgICAgICBpZiAoZnJhbWV3b3JrLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgIGZyYW1ld29yay5jYXRlZ29yaWVzID0gZnJhbWV3b3JrLmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgICAubWFwKChjYXRlZ29yeTogRnJhbWV3b3JrQ2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkubmFtZSA9IEZyYW1ld29ya01hcHBlci5nZXRUcmFuc2xhdGVkVmFsdWUoY2F0ZWdvcnkudHJhbnNsYXRpb25zLCBsYW5ndWFnZSwgY2F0ZWdvcnkubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5LnRlcm1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS50ZXJtcyA9IGNhdGVnb3J5LnRlcm1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgodGVybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtLm5hbWUgPSBGcmFtZXdvcmtNYXBwZXIuZ2V0VHJhbnNsYXRlZFZhbHVlKHRlcm0udHJhbnNsYXRpb25zLCBsYW5ndWFnZSwgdGVybS5uYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYW1ld29yaztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByZXBhcmVGcmFtZXdvcmtDYXRlZ29yeVRyYW5zbGF0aW9ucyhmcmFtZXdvcmtDYXRlZ29yeTogRnJhbWV3b3JrQ2F0ZWdvcnksIGxhbmd1YWdlOiBzdHJpbmcpOiBGcmFtZXdvcmtDYXRlZ29yeSB7XG4gICAgICAgIGZyYW1ld29ya0NhdGVnb3J5Lm5hbWUgPSBGcmFtZXdvcmtNYXBwZXIuZ2V0VHJhbnNsYXRlZFZhbHVlKGZyYW1ld29ya0NhdGVnb3J5LnRyYW5zbGF0aW9ucywgbGFuZ3VhZ2UsIGZyYW1ld29ya0NhdGVnb3J5Lm5hbWUpO1xuXG4gICAgICAgIGlmIChmcmFtZXdvcmtDYXRlZ29yeS50ZXJtcykge1xuICAgICAgICAgICAgZnJhbWV3b3JrQ2F0ZWdvcnkudGVybXMgPSBmcmFtZXdvcmtDYXRlZ29yeS50ZXJtc1xuICAgICAgICAgICAgICAgIC5tYXAoKHRlcm0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVybS5uYW1lID0gRnJhbWV3b3JrTWFwcGVyLmdldFRyYW5zbGF0ZWRWYWx1ZSh0ZXJtLnRyYW5zbGF0aW9ucywgbGFuZ3VhZ2UsIHRlcm0ubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhbWV3b3JrQ2F0ZWdvcnk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VHJhbnNsYXRlZFZhbHVlKHRyYW5zbGF0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkLCBsYW5ndWFnZTogc3RyaW5nLCBkZWZhdWx0VHJhbnNsYXRpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdHJhbnNsYXRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFRyYW5zbGF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25zT2JqID0gSlNPTi5wYXJzZSh0cmFuc2xhdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbnNPYmpbbGFuZ3VhZ2VdIHx8IGRlZmF1bHRUcmFuc2xhdGlvbjtcbiAgICB9XG59XG4iXX0=