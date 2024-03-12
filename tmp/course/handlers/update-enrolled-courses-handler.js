var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { of } from 'rxjs';
import { ArrayUtil } from '../../util/array-util';
import { map, mergeMap } from 'rxjs/operators';
var UpdateEnrolledCoursesHandler = /** @class */ (function () {
    function UpdateEnrolledCoursesHandler(keyValueStore, offlineContentStateHandler) {
        this.keyValueStore = keyValueStore;
        this.offlineContentStateHandler = offlineContentStateHandler;
    }
    UpdateEnrolledCoursesHandler.prototype.updateEnrollCourses = function (request) {
        var _this = this;
        var enrolledCoursesKey = UpdateEnrolledCoursesHandler.GET_ENROLLED_COURSES_KEY_PREFIX.concat(request.userId);
        return this.offlineContentStateHandler.getLocalContentStateResponse(request)
            .pipe(mergeMap(function (contentState) {
            return _this.keyValueStore.getValue(enrolledCoursesKey)
                .pipe(mergeMap(function (value) {
                if (value) {
                    var response = JSON.parse(value);
                    var result = response['result'];
                    var courses = void 0;
                    if (result && result.hasOwnProperty('courses')) {
                        courses = result['courses'];
                    }
                    else {
                        courses = response['courses'];
                    }
                    var newCourses_1 = __spreadArrays(courses);
                    courses.forEach(function (course) {
                        if (course.courseId === request.courseId && course.batchId === request.batchId) {
                            var updateCourse_1 = course;
                            var contentList = contentState.contentList;
                            contentList.forEach(function (content) {
                                if (content.status === 2) {
                                    var playedOffLine = course.contentsPlayedOffline;
                                    if (!playedOffLine) {
                                        playedOffLine = [];
                                    }
                                    playedOffLine.push(content.contentId);
                                    updateCourse_1.contentsPlayedOffline = ArrayUtil.deDupe(playedOffLine);
                                }
                            });
                            var toUpdateIndex = newCourses_1.findIndex(function (el) {
                                return el.contentId === course.contentId && el.batchId === course.batchId;
                            });
                            newCourses_1.splice(toUpdateIndex, 1, updateCourse_1);
                        }
                    });
                    if (newCourses_1 && newCourses_1.length) {
                        if (result && result.hasOwnProperty('courses')) {
                            result['courses'] = newCourses_1;
                        }
                        else {
                            response['courses'] = newCourses_1;
                        }
                        return _this.keyValueStore.setValue(enrolledCoursesKey, JSON.stringify(response))
                            .pipe(map(function () {
                            return contentState;
                        }));
                    }
                    else {
                        return of(contentState);
                    }
                }
                else {
                    return of(contentState);
                }
            }));
        }));
    };
    UpdateEnrolledCoursesHandler.GET_ENROLLED_COURSES_KEY_PREFIX = 'enrolledCourses';
    return UpdateEnrolledCoursesHandler;
}());
export { UpdateEnrolledCoursesHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWVucm9sbGVkLWNvdXJzZXMtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3Vyc2UvaGFuZGxlcnMvdXBkYXRlLWVucm9sbGVkLWNvdXJzZXMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QztJQUdJLHNDQUFvQixhQUE0QixFQUM1QiwwQkFBc0Q7UUFEdEQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtJQUMxRSxDQUFDO0lBRUQsMERBQW1CLEdBQW5CLFVBQW9CLE9BQStCO1FBQW5ELGlCQWdFQztRQS9ERyxJQUFNLGtCQUFrQixHQUFHLDRCQUE0QixDQUFDLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0csT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDO2FBQ3ZFLElBQUksQ0FDRCxRQUFRLENBQUMsVUFBQyxZQUFrQztZQUN4QyxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO2lCQUNqRCxJQUFJLENBQ0QsUUFBUSxDQUFDLFVBQUMsS0FBeUI7Z0JBQy9CLElBQUksS0FBSyxFQUFFO29CQUNQLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25DLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxPQUFPLFNBQVUsQ0FBQztvQkFDdEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDNUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0gsT0FBTyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDakM7b0JBQ0QsSUFBTSxZQUFVLGtCQUFpQixPQUFPLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7d0JBQzNCLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLE9BQU8sRUFBRTs0QkFDNUUsSUFBTSxjQUFZLEdBQUcsTUFBTSxDQUFDOzRCQUM1QixJQUFNLFdBQVcsR0FBbUIsWUFBWSxDQUFDLFdBQVcsQ0FBQzs0QkFDN0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0NBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0NBQ3RCLElBQUksYUFBYSxHQUFhLE1BQU0sQ0FBQyxxQkFBc0IsQ0FBQztvQ0FDNUQsSUFBSSxDQUFDLGFBQWEsRUFBRTt3Q0FDaEIsYUFBYSxHQUFHLEVBQUUsQ0FBQztxQ0FDdEI7b0NBQ0QsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLENBQUM7b0NBQ3ZDLGNBQVksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lDQUN4RTs0QkFDTCxDQUFDLENBQUMsQ0FBQzs0QkFFSCxJQUFNLGFBQWEsR0FBRyxZQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBVTtnQ0FDbEQsT0FBTyxFQUFFLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsT0FBTyxDQUFDOzRCQUM5RSxDQUFDLENBQUMsQ0FBQzs0QkFDSCxZQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsY0FBWSxDQUFDLENBQUM7eUJBQ3JEO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksWUFBVSxJQUFJLFlBQVUsQ0FBQyxNQUFNLEVBQUU7d0JBQ2pDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7NEJBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFVLENBQUM7eUJBQ2xDOzZCQUFNOzRCQUNILFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFVLENBQUM7eUJBQ3BDO3dCQUNELE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDM0UsSUFBSSxDQUNELEdBQUcsQ0FBQzs0QkFDQSxPQUFPLFlBQVksQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztxQkFDVDt5QkFBTTt3QkFDSCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDM0I7aUJBQ0o7cUJBQU07b0JBQ0gsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzNCO1lBRUwsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFFVixDQUFDO0lBdEV1Qiw0REFBK0IsR0FBRyxpQkFBaUIsQ0FBQztJQXlFaEYsbUNBQUM7Q0FBQSxBQTFFRCxJQTBFQztTQTFFWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0tleVZhbHVlU3RvcmV9IGZyb20gJy4uLy4uL2tleS12YWx1ZS1zdG9yZSc7XG5pbXBvcnQge0NvbnRlbnRTdGF0ZSwgQ29udGVudFN0YXRlUmVzcG9uc2UsIENvdXJzZSwgR2V0Q29udGVudFN0YXRlUmVxdWVzdH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtPZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlcn0gZnJvbSAnLi9vZmZsaW5lLWNvbnRlbnQtc3RhdGUtaGFuZGxlcic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXJyYXlVdGlsfSBmcm9tICcuLi8uLi91dGlsL2FycmF5LXV0aWwnO1xuaW1wb3J0IHttYXAsIG1lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVFbnJvbGxlZENvdXJzZXNIYW5kbGVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBHRVRfRU5ST0xMRURfQ09VUlNFU19LRVlfUFJFRklYID0gJ2Vucm9sbGVkQ291cnNlcyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtleVZhbHVlU3RvcmU6IEtleVZhbHVlU3RvcmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlcjogT2ZmbGluZUNvbnRlbnRTdGF0ZUhhbmRsZXIpIHtcbiAgICB9XG5cbiAgICB1cGRhdGVFbnJvbGxDb3Vyc2VzKHJlcXVlc3Q6IEdldENvbnRlbnRTdGF0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPENvbnRlbnRTdGF0ZVJlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IGVucm9sbGVkQ291cnNlc0tleSA9IFVwZGF0ZUVucm9sbGVkQ291cnNlc0hhbmRsZXIuR0VUX0VOUk9MTEVEX0NPVVJTRVNfS0VZX1BSRUZJWC5jb25jYXQocmVxdWVzdC51c2VySWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5vZmZsaW5lQ29udGVudFN0YXRlSGFuZGxlci5nZXRMb2NhbENvbnRlbnRTdGF0ZVJlc3BvbnNlKHJlcXVlc3QpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoY29udGVudFN0YXRlOiBDb250ZW50U3RhdGVSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlWYWx1ZVN0b3JlLmdldFZhbHVlKGVucm9sbGVkQ291cnNlc0tleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlWydyZXN1bHQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3Vyc2VzOiBDb3Vyc2VbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmhhc093blByb3BlcnR5KCdjb3Vyc2VzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzID0gcmVzdWx0Wydjb3Vyc2VzJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZXMgPSByZXNwb25zZVsnY291cnNlcyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Q291cnNlczogQ291cnNlW10gPSBbLi4uY291cnNlc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzLmZvckVhY2goKGNvdXJzZTogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdXJzZS5jb3Vyc2VJZCA9PT0gcmVxdWVzdC5jb3Vyc2VJZCAmJiBjb3Vyc2UuYmF0Y2hJZCA9PT0gcmVxdWVzdC5iYXRjaElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUNvdXJzZSA9IGNvdXJzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudExpc3Q6IENvbnRlbnRTdGF0ZVtdID0gY29udGVudFN0YXRlLmNvbnRlbnRMaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TGlzdC5mb3JFYWNoKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5zdGF0dXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVkT2ZmTGluZTogc3RyaW5nW10gPSBjb3Vyc2UuY29udGVudHNQbGF5ZWRPZmZsaW5lITtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllZE9mZkxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVkT2ZmTGluZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZWRPZmZMaW5lLnB1c2goY29udGVudC5jb250ZW50SWQhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb3Vyc2UuY29udGVudHNQbGF5ZWRPZmZsaW5lID0gQXJyYXlVdGlsLmRlRHVwZShwbGF5ZWRPZmZMaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9VcGRhdGVJbmRleCA9IG5ld0NvdXJzZXMuZmluZEluZGV4KChlbDogQ291cnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwuY29udGVudElkID09PSBjb3Vyc2UuY29udGVudElkICYmIGVsLmJhdGNoSWQgPT09IGNvdXJzZS5iYXRjaElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q291cnNlcy5zcGxpY2UodG9VcGRhdGVJbmRleCwgMSwgdXBkYXRlQ291cnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvdXJzZXMgJiYgbmV3Q291cnNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnY291cnNlcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnY291cnNlcyddID0gbmV3Q291cnNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVsnY291cnNlcyddID0gbmV3Q291cnNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5VmFsdWVTdG9yZS5zZXRWYWx1ZShlbnJvbGxlZENvdXJzZXNLZXksIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoY29udGVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihjb250ZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuXG59XG4iXX0=