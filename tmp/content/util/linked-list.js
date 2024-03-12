var LinkedNode = /** @class */ (function () {
    function LinkedNode(elem) {
        this._elem = elem;
        this.next = null;
    }
    Object.defineProperty(LinkedNode.prototype, "elem", {
        get: function () {
            return this._elem;
        },
        enumerable: false,
        configurable: true
    });
    return LinkedNode;
}());
export { LinkedNode };
var LinkedList = /** @class */ (function () {
    function LinkedList(headElement) {
        this.head = null;
        this.len = 0;
        this.head = headElement || null;
    }
    LinkedList.prototype.append = function (elem) {
        var node = new LinkedNode(elem);
        var current;
        if (this.head === null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    };
    LinkedList.prototype.isEmpty = function () {
        return this.len;
    };
    LinkedList.prototype.addAll = function (list) {
        var _this = this;
        list.forEach(function (item) {
            _this.append(item);
        });
    };
    LinkedList.prototype.remove = function () {
        return this.removeAt(0);
    };
    LinkedList.prototype.removeAt = function (pos) {
        if (pos > -1 && pos < this.len && this.head) {
            var current = this.head;
            var previous = current;
            var index = 0;
            if (pos === 0) {
                this.head = current.next;
            }
            else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.len--;
            return current;
        }
        else {
            return undefined;
        }
    };
    return LinkedList;
}());
export { LinkedList };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VkLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC91dGlsL2xpbmtlZC1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBSUksb0JBQVksSUFBTztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxzQkFBSSw0QkFBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7QUFFRDtJQUlJLG9CQUFZLFdBQTJCO1FBSC9CLFNBQUksR0FBeUIsSUFBSSxDQUFDO1FBQ2xDLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFHWixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxJQUFPO1FBQ2pCLElBQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBc0IsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU07WUFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU0sNEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBR00sMkJBQU0sR0FBYixVQUFjLElBQVM7UUFBdkIsaUJBSUM7UUFIRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkJBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sNkJBQVEsR0FBaEIsVUFBaUIsR0FBVztRQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxRQUFRLEdBQWtCLE9BQU8sQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILE9BQU8sS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQ2xDLFFBQVEsR0FBRyxPQUFPLENBQUM7b0JBQ25CLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUMxQjtnQkFDRCxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxPQUFPLE9BQU8sQ0FBQztTQUNsQjthQUFNO1lBQ0gsT0FBTyxTQUFTLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIExpbmtlZE5vZGU8VD4ge1xuICAgIHB1YmxpYyBuZXh0OiBMaW5rZWROb2RlPFQ+IHwgbnVsbDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtOiBUO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbTogVCkge1xuICAgICAgICB0aGlzLl9lbGVtID0gZWxlbTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgZWxlbSgpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlua2VkTGlzdDxUPiB7XG4gICAgcHJpdmF0ZSBoZWFkOiBMaW5rZWROb2RlPFQ+IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZW4gPSAwO1xuXG4gICAgY29uc3RydWN0b3IoaGVhZEVsZW1lbnQ/OiBMaW5rZWROb2RlPFQ+KSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IGhlYWRFbGVtZW50IHx8IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGVuZChlbGVtOiBUKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgTGlua2VkTm9kZShlbGVtKTtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IExpbmtlZE5vZGU8VD47XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sZW4rKztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuO1xuICAgIH1cblxuXG4gICAgcHVibGljIGFkZEFsbChsaXN0OiBUW10pIHtcbiAgICAgICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSgpOiBMaW5rZWROb2RlPFQ+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQXQoMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVBdChwb3M6IG51bWJlcik6IExpbmtlZE5vZGU8VD4gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAocG9zID4gLTEgJiYgcG9zIDwgdGhpcy5sZW4gJiYgdGhpcy5oZWFkKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgIGxldCBwcmV2aW91czogTGlua2VkTm9kZTxUPiA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICAgICAgICBpZiAocG9zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHBvcyAmJiBjdXJyZW50Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sZW4tLTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19