export var StorageEventType;
(function (StorageEventType) {
    StorageEventType["TRANSFER_PROGRESS"] = "TRANSFER_PROGRESS";
    StorageEventType["TRANSFER_COMPLETED"] = "TRANSFER_COMPLETED";
    StorageEventType["TRANSFER_REVERT_COMPLETED"] = "TRANSFER_REVERT_COMPLETED";
    StorageEventType["TRANSFER_FAILED_DUPLICATE_CONTENT"] = "TRANSFER_FAILED_DUPLICATE_CONTENT";
    StorageEventType["TRANSFER_FAILED_LOW_MEMORY"] = "TRANSFER_FAILED_LOW_MEMORY";
})(StorageEventType || (StorageEventType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yYWdlL2RlZi9zdG9yYWdlLWV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9DQSxNQUFNLENBQU4sSUFBWSxnQkFNWDtBQU5ELFdBQVksZ0JBQWdCO0lBQ3hCLDJEQUF1QyxDQUFBO0lBQ3ZDLDZEQUF5QyxDQUFBO0lBQ3pDLDJFQUF1RCxDQUFBO0lBQ3ZELDJGQUF1RSxDQUFBO0lBQ3ZFLDZFQUF5RCxDQUFBO0FBQzdELENBQUMsRUFOVyxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBTTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudHNCdXNFdmVudH0gZnJvbSAnLi4vLi4vZXZlbnRzLWJ1cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZUV2ZW50IGV4dGVuZHMgRXZlbnRzQnVzRXZlbnQge1xuICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZVRyYW5zZmVyUHJvZ3Jlc3MgZXh0ZW5kcyBTdG9yYWdlRXZlbnQge1xuICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfUFJPR1JFU1M7XG4gICAgcGF5bG9hZDoge1xuICAgICAgICBwcm9ncmVzczoge1xuICAgICAgICAgICAgdHJhbnNmZXJyZWRDb3VudDogbnVtYmVyLFxuICAgICAgICAgICAgdG90YWxDb3VudDogbnVtYmVyXG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlVHJhbnNmZXJDb21wbGV0ZWQgZXh0ZW5kcyBTdG9yYWdlRXZlbnQge1xuICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfQ09NUExFVEVEO1xuICAgIHBheWxvYWQ6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlVHJhbnNmZXJSZXZlcnRDb21wbGV0ZWQgZXh0ZW5kcyBTdG9yYWdlRXZlbnQge1xuICAgIHR5cGU6IFN0b3JhZ2VFdmVudFR5cGUuVFJBTlNGRVJfUkVWRVJUX0NPTVBMRVRFRDtcbiAgICBwYXlsb2FkOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZVRyYW5zZmVyRmFpbGVkRHVwbGljYXRlQ29udGVudCBleHRlbmRzIFN0b3JhZ2VFdmVudCB7XG4gICAgdHlwZTogU3RvcmFnZUV2ZW50VHlwZS5UUkFOU0ZFUl9GQUlMRURfRFVQTElDQVRFX0NPTlRFTlQ7XG4gICAgcGF5bG9hZDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VUcmFuc2ZlckZhaWxlZExvd01lbW9yeSBleHRlbmRzIFN0b3JhZ2VFdmVudCB7XG4gICAgdHlwZTogU3RvcmFnZUV2ZW50VHlwZS5UUkFOU0ZFUl9GQUlMRURfTE9XX01FTU9SWTtcbiAgICBwYXlsb2FkOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBlbnVtIFN0b3JhZ2VFdmVudFR5cGUge1xuICAgIFRSQU5TRkVSX1BST0dSRVNTID0gJ1RSQU5TRkVSX1BST0dSRVNTJyxcbiAgICBUUkFOU0ZFUl9DT01QTEVURUQgPSAnVFJBTlNGRVJfQ09NUExFVEVEJyxcbiAgICBUUkFOU0ZFUl9SRVZFUlRfQ09NUExFVEVEID0gJ1RSQU5TRkVSX1JFVkVSVF9DT01QTEVURUQnLFxuICAgIFRSQU5TRkVSX0ZBSUxFRF9EVVBMSUNBVEVfQ09OVEVOVCA9ICdUUkFOU0ZFUl9GQUlMRURfRFVQTElDQVRFX0NPTlRFTlQnLFxuICAgIFRSQU5TRkVSX0ZBSUxFRF9MT1dfTUVNT1JZID0gJ1RSQU5TRkVSX0ZBSUxFRF9MT1dfTUVNT1JZJ1xufVxuIl19