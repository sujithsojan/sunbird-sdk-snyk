var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { LinkedList } from '../list/linked-list';
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        return _super.call(this) || this;
    }
    Queue.prototype.enque = function (value) {
        _super.prototype.add.call(this, value);
    };
    Queue.prototype.deque = function () {
        var first = this.head;
        this.head = this.head.next;
        return first;
    };
    return Queue;
}(LinkedList));
export { Queue };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9xdWV1ZS9xdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBSS9DO0lBQW9ELHlCQUFhO0lBRTdEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBRU0scUJBQUssR0FBWixVQUFhLEtBQVE7UUFDakIsaUJBQU0sR0FBRyxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxxQkFBSyxHQUFaO1FBQ0ksSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUFvRCxVQUFVLEdBZ0I3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlua2VkTGlzdH0gZnJvbSAnLi4vbGlzdC9saW5rZWQtbGlzdCc7XG5pbXBvcnQge0xpc3ROb2RlfSBmcm9tICcuLi9saXN0L2xpc3Qtbm9kZSc7XG5pbXBvcnQge0NvbXBhcmF0b3J9IGZyb20gJy4uL2xpc3QvY29tcGFyYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZTxUIGV4dGVuZHMgQ29tcGFyYXRvcjxUPj4gZXh0ZW5kcyBMaW5rZWRMaXN0PFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbnF1ZSh2YWx1ZTogVCk6IHZvaWQge1xuICAgICAgICBzdXBlci5hZGQodmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXF1ZSgpOiBMaXN0Tm9kZTxUPiB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5oZWFkO1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH1cblxufVxuIl19