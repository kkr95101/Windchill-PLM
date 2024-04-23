
dui.dnd = {};

dui.dnd.Dragable = function () {};
dui.dnd.Dragable.makeDragable = function (elId) {
	var el = (typeof elId == "object") ? D$(elId) : D$(document.getElementById(elId));
	Object.extend(el, dui.dnd.Dragable.prototype);
	return el;
};
dui.dnd.Dragable.state = {
	NONE : 0,
	DRAGGING : 1
}
dui.dnd.Dragable.prototype = {
	dropZones : null,
	state : dui.dnd.Dragable.state.NONE,
	isDragable : true,
	iDiffX : null,
	iDiffY : null,
	mouseDownLock : false,
	dragged : false,
	
	beforeMouseDown : function (aEvent) {},
	afterMouseDown : function (aEvent) {},
	beforeMouseMove : function (aEvent) {}, 
	afterMouseMove : function (aEvent) {}, 
	beforeMouseUp : function (aEvent) {},
	afterMouseUp : function (aEvent) {},
	dragStarted : function (aEvent) {}, 
	dragEnded : function (aEvent) {}, 
	clicked: function (aEvent) {}, 

	onmousedown : function (aEvent) {
		aEvent = dui.CB.getEvent(aEvent);
		if (this.mouseDownLock) return false;
		if (this.beforeMouseDown(aEvent) == false) return false;
		this.mouseDownLock = true;
		document.body.onmousemove = this._mousemove.bind(this);
		document.body.onmouseup = this._mouseUp.bind(this);
		this.afterMouseDown(aEvent);
		return false;
	},

	_mousemove : function (aEvent) {
		if (this.beforeMouseMove(aEvent) == false) return false;
		if (this.state == dui.dnd.Dragable.state.NONE) {
			if (this.dragStarted(aEvent) ==  false) {
				this.cancelDrag(aEvent);
			} else {
				this.dragged = true;
				this.state = dui.dnd.Dragable.state.DRAGGING;
			}
		}
		aEvent = dui.CB.getEvent(aEvent);

		if (!this.iDiffX) this.iDiffX = aEvent.clientX - this.offsetLeft;  // offsetParent 엘리먼트의 client X좌표
		if (!this.iDiffY) this.iDiffY = aEvent.clientY - this.offsetTop;

		this.style.left = (aEvent.clientX - this.iDiffX) + "px";
		this.style.top = (aEvent.clientY - this.iDiffY) + "px";
		if(this.dropZones) this.checkDropZoneOver(aEvent);
		this.afterMouseMove(aEvent);
		return false;
	},
	
	_mouseUp : function (aEvent) { 
		this.mouseDownLock = false;
		if (this.beforeMouseUp(aEvent) == false) return false;
		this.state = dui.dnd.Dragable.state.NONE;
		this.cancelDrag(aEvent);
		if(this.dropZones) this.checkDropZoneDrop(aEvent);
		this.afterMouseUp(aEvent);

		if (this.dragged) {
			this.dragged = false;
			this.dragEnded(aEvent);
		} else {
			this.clicked(aEvent);
		}
		return false;
	},

	cancelDrag : function (aEvent) {
		this.iDiffX = this.iDiffY = null;
		document.body.onmousemove = null;
		document.body.onmouseup = null;
	},
	
	setEventSrc : function (elId) {
		var el = (typeof elId == "object") ? elId : document.getElementById(elId);
		el.onmousedown = this.onmousedown.bindAsEventListener(this);
		this.onmousedown = null;
	},
	
	registerDropZone : function (dropZone) {
		if (!this.dropZones) this.dropZones = [];
		this.dropZones.push(dropZone);
	},
	
	checkDropZoneOver : function (aEvent) {
		for (var i=0; i<this.dropZones.length; i++) {
		   	if (this.isDropZoneOver(i)) this.dropZones[i].onOver(aEvent, this);
		}
	},
	
	checkDropZoneDrop : function(aEvent) {
		for (var i = 0; i < this.dropZones.length; i++) {
			if (this.isDropZoneOver(i)) 
				this.dropZones[i].onDrop(aEvent, this);
			else 
				this.dropZones[i].onCancel(aEvent, this);
		}
	},
	
	isDropZoneOver : function(index) {
		var temp = Position.cumulativeOffset(this.dropZones[index]);
		var dzX = temp[0];
		var dzX2 = dzX + this.dropZones[index].offsetWidth;
		var dzY = temp[1];
		var dzY2 = dzY + this.dropZones[index].offsetHeight;
		temp = Position.cumulativeOffset(this);
		var drX = temp[0];
		var drX2 = drX + this.offsetWidth;
		var drY = temp[1];
		var drY2 = drY + this.offsetHeight;
		//dui.log("dzX:"+dzX+",dzX2:"+dzX2+",dzY:"+dzY+",dzY2:"+dzY2+",drX:"+drX+",drX2:"+drX2+",drY:"+drY+",drY2:"+drY2);
		if ( !( (drX < dzX && drX2 < dzX) || (drX > dzX2 && drX2 > dzX2) ||
		        (drY < dzY && drY2 < dzY) || (drY > dzY2 && drY2 > dzY2) )
		   ) return true;
		
		return false;
	}
};
dui.dnd.DropZone = function () {};
dui.dnd.DropZone.makeDropZone = function (elId) {
	var el = (typeof elId == "object") ? elId : document.getElementById(elId);
	Object.extend(el, dui.dnd.DropZone.prototype);
	return el;
};
dui.dnd.DropZone.prototype = {
	onOver : function (aEvent, dragable) {},
	onDrop : function (aEvent, dragable) {},
	onCancel : function (aEvent, dragable) {}
}

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
