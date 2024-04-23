
dui.tree = {};
dui.tree.Tree = Class.create();
dui.tree.Tree.prototype = {
	root : null,
	dragList : null,
	animation : true,
	pixelPerMove : 5,
	interval : 30,
	indent : "18px",
	nodeHeight : null,
	moveNode : true,
	selectedNode : null,
	imagePath : "images/",
	images : {
		openFolder : "folder_open.gif",
		closeFolder : "folder_close.gif",
		page : "page.gif",
		midPlus : "mid_plus.gif",
		midNormal : "mid_normal.gif",
		midMinus : "mid_minus.gif",
		midBlank : "mid_blank.gif",
		lastPlus : "last_plus.gif",
		lastNormal : "last_normal.gif",
		lastMinus : "last_minus.gif"
	},
	
	onChange : function (movedNode, targetNode, where) {},
	
	initialize : function() {
		this.dragList = new dui.tree.List();
		this.dragList.tree = this;
	},

	init : function (ulObj) { 
		if (typeof(ulObj) == "string") ulObj = document.getElementById(ulObj);
		this.root = ulObj;
		this.initTree(ulObj);
		ulObj.style.display = "block";
		this.draw(this.root, false);
	},

	initTree: function (ulObj) {
		ulObj.style.overflow = "hidden";
		var nodes = D$(ulObj).childElements();
		for (var i = 0; i<nodes.length; i++) {
			var node = this.makeNode(nodes[i]);
			if (node.hasClassName("Lcurrent")) {
				node.selected = true;
				this.openParent(node);
			}
			var childUL = node.getElementsByTagName("ul")[0];
			if (childUL) {
				this.initTree(childUL);
			}
			if (childUL || node.hasClassName("Lfolder")) {
				node.imFolder = true;
				node.imOpen = node.hasClassName("Lopen");
				node.lineImg.onclick = node.iconImg.onclick = this.toggle.bind(this, node);
			}
		}		
	},
	
	openParent : function (node) {
		var parent = node.parentNode.parentNode;
		if (parent.tagName.toUpperCase() == "LI") {
			if (!parent.imOpen) {
				parent.addClassName("Lopen");
				parent.imOpen = true;
			}
			this.openParent(parent);
		}
	},
	
	openAll : function () {
		var nodes = this.root.getElementsByTagName("li");
		for (var i = 0; i<nodes.length; i++) 
			nodes[i].imOpen = true;
		this.draw(this.root, false);
	},

	makeNode : function (liObj) {
		var node = dui.tree.Node.makeNode(liObj);
		node.tree = this;
		this.dragList.addItem(node.dragItem);
		return node;
	},

	draw : function (ul, animation) {
		var nodes = ul.childElements();
		
		for (var i=0; i<nodes.length; i++) {
			this.drawNode(nodes[i], animation);
			var childUL = nodes[i].getChildUL();
			if (childUL) this.draw(childUL, animation);
		}
		this.indentElement(ul);
	},
	
	drawNode : function (node, animation) {
		var images = this.getImages(node);
		node.lineImg.src = images.line;
		node.iconImg.src = images.icon;
		if (node.selected) this.registerSelected(node);
		if (node.imFolder && node.hasChild()) {
			if (node.imOpen) {
				this.open(node.getChildUL(), animation);
				if (node.isLast()) node.style.backgroundImage = "none";
				else node.style.background = "url("+this.imagePath + this.images.midBlank+") repeat-y left top";
			} else 
				this.close(node.getChildUL(), animation);
		}
	},
	
	getImages : function (node) {
		var lineImgSrc, iconImgSrc;
		var isLast = node.isLast();
		
		if (isLast) {
			if (node.imFolder) {
				if (node.hasChild()) {
					if (node.imOpen) lineImgSrc = this.imagePath + this.images.lastMinus;
					else lineImgSrc = this.imagePath + this.images.lastPlus;
				}
				else 
					lineImgSrc = this.imagePath + this.images.lastNormal;
			} else { 
				lineImgSrc = this.imagePath+this.images.lastNormal;
			}
		} else { 
			if (node.imFolder){
				if (node.hasChild()) {
					if (node.imOpen) lineImgSrc = this.imagePath + this.images.midMinus;
					else lineImgSrc = this.imagePath + this.images.midPlus;
				}
				else 
					lineImgSrc = this.imagePath + this.images.midNormal;
			} else {
				lineImgSrc = this.imagePath+this.images.midNormal;
			}
		}	
		
		if (node.imFolder) {
			//alert(node.getElementsByTagName("span")[2].innerHTML + node.hasChild());
			if (node.hasChild() && node.imOpen) iconImgSrc = this.imagePath + this.images.openFolder;
			else iconImgSrc = this.imagePath + this.images.closeFolder;
		} else {
			iconImgSrc = this.imagePath+this.images.page;
		}
		
		return { line:lineImgSrc, icon:iconImgSrc };
	},

	toggle : function (node, animation) {
		if (node.hasChild()) {
			node.imOpen = node.imOpen ? false : true;
			if (animation == undefined) animation = this.animation;
			this.drawNode(node, animation);
			//this.onChange();
		}
	},	

	selectNode : function (nodePath) {
		var nodeIndexes = nodePath.split(">");
		var ulObj = this.root;
		for (var i = 0; i < nodeIndexes.length; i++) {
			var selectedNode = ulObj.childElements()[nodeIndexes[i]];
			if (!selectedNode) break;
			if (selectedNode.imFolder) {
				selectedNode.imOpen = true;
				this.drawNode(selectedNode, false);
			}
			ulObj = selectedNode.getChildUL();
			if (!ulObj) break;
		}
		if (selectedNode) this.registerSelected(selectedNode);
		return selectedNode;
	},
	
	registerSelected : function(node) {
		if (this.selectedNode) {
			this.selectedNode.removeClassName("Lcurrent");
			this.selectedNode.selected = false;
		}
		this.selectedNode = node;
		node.addClassName("Lcurrent");
		node.selected = true;
	},
	
	getSelectedNode : function() {
		return this.selectedNode.dragItem;
	},
	
	getSelectedNodeName : function() {
		return this.selectedNode.getElementsByTagName("a")[0].innerHTML;
	},
	
	getSelectedNodeLink : function() {
		return this.selectedNode.getElementsByTagName("a")[0].href;
	},
	
	indentElement : function(obj) {
		obj.style.marginLeft = this.indent;
	}, 
	
	open : function(objUL, animation) {	
		var imgState = ""; 
		var isChild = false;
		var height = objUL.getHeight();
		if (animation) {
			var effect = new dui.effect.Scale(0, height, this.interval, this.pixelPerMove);
			effect.initWidth = 300;
			effect.initHeight = 0;
			effect.acceleration = -0.7;
			effect.nodisplay = true;
			effect.callback = function () {
				objUL.style.height = "";
			}
			effect.run(objUL);
		} else {
			objUL.style.display = "block";
		}
	},
	
	close : function(objUL, animation) {
		var height = (objUL.style.height) ? -parseInt(objUL.style.height) : -10000;	

		if (animation) {
			var effect = new dui.effect.Scale(0, height, this.interval, this.pixelPerMove);
			effect.acceleration = -0.7;
			effect.nodisplay = true;
			effect.callback = function () {
				objUL.style.height = "";
			}
			effect.run(objUL);
		} else {
			objUL.style.display = "none";
		}
	},

	getRoot : function () {
		return this.root;
	},
	
	enableMoveNode : function (flag) {
		this.moveNode = flag;
	}
}


/*
 * dui.tree.Item
 */
dui.tree.Node = function() {};
dui.tree.Node.makeNode = function (liObj) {
	Element.extend(liObj);
	Object.extend(liObj, dui.tree.Node.prototype);
	liObj.init();
	return liObj;
};
dui.tree.Node.prototype = {
	imFolder : false,
	imOpen : false,
	icon : null,
	dragItem : null,
	lineImg : null,
	iconImg : null,
	ul : null,
	tree : null,
	html : null,

	/*
	 Node 구조
	 
	 <li>

      └ <div>  -- wrap

           └ <img>  -- line img

           └ <span>  -- dragitem
	 		
                 └ <img>  -- icon img
	 			
                 └ <user html>
	 			
	 */
	init : function () {
		var childElements = this.childElements();
		var userNodeElements = [];
		for (var i=0; i<childElements.length; i++) {
			if (childElements[i].tagName.toUpperCase() == "UL") break;
			userNodeElements.push(childElements[i]);
		}
		var wrap = document.createElement("div");
		this.insertAdjacentElement("afterBegin", wrap);
		wrap.style.display = "inline";
		wrap.noWrap = true;
		var lineImg = new Element("img");
		wrap.appendChild(lineImg);
		var iconImg = document.createElement("img");
		lineImg.style.verticalAlign = iconImg.style.verticalAlign = "middle";
		var dragItem = dui.tree.Item.makeItem();
		dragItem.appendChild(iconImg);
		wrap.appendChild(dragItem);
		for (var i = 0; i < userNodeElements.length; i++) {
			dragItem.appendChild(userNodeElements[i]);
		}
		dragItem.node = this;
		dragItem.adjacent = lineImg;
		this.dragItem = dragItem;
		this.lineImg = lineImg;
		this.iconImg = iconImg;
	},

	hasChild : function () {
		var childElements = this.childElements();
		var childUL = childElements[childElements.length-1];
		return childUL.tagName == "UL" && childUL.childElements().length > 0;
	}, 
	
	getChildUL : function () {
		var childElements = this.childElements();
		if (childElements[childElements.length-1].tagName == "UL") return childElements[childElements.length-1];
		else return null;
	},
	
	isLast : function () {
		return this.next() ? false : true;
	}
}
/*
 * dui.tree.Item
 */
dui.tree.Item = function() {};
dui.tree.Item.makeItem = function () {
	var el = document.createElement("span");
	el.className = "LtreeDragItem";
	Element.extend(el);
	Object.extend(el, dui.tree.Item.prototype);
	el.init();
	return el;
};

Object.extend(dui.tree.Item.prototype, dui.dnd.Dragable.prototype);
Object.extend(dui.tree.Item.prototype, 
{
	boundSpace : 4,
	selected : false,
	tree : null,
	
	init : function () {
	},

	beforeMouseDownOnItem : function (aEvent) {},
	afterMouseDownOnItem : function (aEvent) {},
	beforeMouseMoveOnItem : function (aEvent) {}, 
	afterMouseMoveOnItem : function (aEvent) {}, 
	beforeMouseUpOnItem : function (aEvent) {},
	afterMouseUpOnItem : function (aEvent) {},
	dragStartedOnItem : function (aEvent) {}, 
	dragEndedOnItem : function (aEvent) {}, 
	clickedOnItem : function (aEvent) {}, 

	beforeMouseDown : function (aEvent) {
		this.beforeMouseDownOnItem(aEvent);
		dui.CB.stopPropagation(aEvent);
	},
	
	afterMouseDown : function (aEvent) {
		this.afterMouseDownOnItem(aEvent);
	},

	beforeMouseMove : function (aEvent) {
		this.beforeMouseMoveOnItem(aEvent);
	},

	afterMouseMove : function (aEvent) {
		if (!this.node.tree.moveNode) return;
		
		this.afterMouseMoveOnItem(aEvent);
		this.container.checkBound(this);
	},
	
	beforeMouseUp : function (aEvent) {
		this.beforeMouseUpOnItem(aEvent);
	},

	afterMouseUp : function(aEvent){
		this.afterMouseUpOnItem(aEvent);
	},
	
	dragStarted : function (aEvent) {
		if (!this.node.tree.moveNode) return;

		if (this.dragStartedOnItem(aEvent) == false) return false;
		this.container.dragItem(this);
	},
	
	dragEnded : function (aEvent) {
		if (!this.node.tree.moveNode) return;

		this.dragEndedOnItem(aEvent);
		this.container.releaseItem(this);
	},
	
	clicked : function (aEvent) {
		this.clickedOnItem(aEvent);
	},
	
	getBound: function (position) {
		if (!this.node.tree.nodeHeight) {
			this.node.tree.nodeHeight = this.node.lineImg.offsetHeight;
		}
		var offsets = this.cumulativeOffset();
		var x = offsets[0];
		var y = offsets[1]+this.offsetHeight-this.node.tree.nodeHeight;
		var width = this.offsetWidth;
		var height = this.node.tree.nodeHeight;

		switch (position) {
			case "middle" : return {x:x, x2:x+width, y:y+height/2-this.boundSpace/2,y2:y+height/2+this.boundSpace/2};
			case "top"    : return {x:x, x2:x+width, y:y, y2:y+this.boundSpace};
			case "bottom" : return {x:x, x2:x+width, y:y+height-this.boundSpace, y2:y+height};
		}
	}, 
	
	onclick : function (aEvent) {
		this.node.tree.registerSelected(this.node);
		dui.CB.stopPropagation(aEvent);
	}});	

/*
 * dui.tree.List
 */
dui.tree.List = Class.create();
dui.tree.List.prototype = {
	items : null,
	root : null,
	insertPosition : null,
	boundLine : null,
	selectedFolder : null,
	changeListOrder : true,
	boundPosition : "middle",
	
	onMovable : function (hoverItem, nearItem) {},
	onNotMovable : function (hoverItem) {},
	
	initialize : function (el) {
		this.items = [];
		this.insertPosition = {};
	},
	
	addItem : function (item) {
		item.container = this;
		this.items.push(item);
	},
	
	setBoundPosition : function (position) {
		this.boundPosition = position;
	},
	
	checkBound: function (hoverItem) {
		if (!this.changeListOrder) return;
		
		var bound1 = hoverItem.getBound(this.boundPosition);
		var overlap = false;
		var where;
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i].offsetHeight == 0 ||this.items[i] == hoverItem || this.items[i].node.descendantOf(hoverItem.node)) continue;
			if ( (this.items[i].node.next() != hoverItem.node && this.isOverlap(bound1, this.items[i].getBound(where = "bottom"))) || 
				(!this.items[i].node.previous() && this.isOverlap(bound1, this.items[i].getBound(where = "top"))) ||
				(this.items[i].node.imFolder && this.isOverlap(bound1, this.items[i].getBound(where = "middle")))
				) {
				//dui.log(this.items[i].getElementsByTagName("span")[1].innerHTML+":"+this.items[i].parentNode.previous()+":"+where)
				overlap = true;
				break;
			} 
		}
		if (overlap) {
			this.showMoveSign(this.items[i], where);
		} else {
			this.removeBoundLine();
			this.unselectFolder();
		}
	},
	
	showMoveSign : function (item, where) {
		if (where == "middle") {
			if (this.selectedFolder) {
				 if (this.selectedFolder == item) return;
				 else {
				 	this.unselectFolder();
					this.selectFolder(item);
				 }
			} else {
				this.removeBoundLine();
				this.selectFolder(item);
			}
			
		}
		else {
			if (this.isBoundLineVisible()) {
				if (item == this.insertPosition.item) {
					return;
				}
				else {
					this.removeBoundLine();
					this.showBoundLine(item, where);
				}
			} else {
				this.unselectFolder();
				this.showBoundLine(item, where);
			}
		}
	},
	
	selectFolder : function (item) {
		item.style.backgroundColor = "#3399FF";
		this.selectedFolder = item;
	},
	
	unselectFolder : function () {
		if (!this.selectedFolder) return;
		this.selectedFolder.style.backgroundColor = "";
		this.selectedFolder = null; 
	},
	
	isOverlap : function (bound1, bound2) {
		var aX = bound1.x;
		var aX2 = bound1.x2;
		var aY = bound1.y;
		var aY2 = bound1.y2;
		var bX = bound2.x;
		var bX2 = bound2.x2;
		var bY = bound2.y;
		var bY2 = bound2.y2;
		
		//dui.log(aX+","+aX2+","+aY+","+aY2+","+bX+","+bX2+","+bY+","+bY2);
		if (!((aX < bX && aX2 < bX) || (aX > bX2 && aX2 > bX2) || (aY < bY && aY2 < bY) || (aY > bY2 && aY2 > bY2)) ) {
			return true;
		}
		return false;
	},
	
	dragItem : function (item) {
		if (!item.clonedItem) {
			item.clonedItem = this.getClone(item);
		}
		item.insertAdjacentElement('afterEnd', item.clonedItem);

		this.absolutize(item);
		document.body.appendChild(item);

		item.style.zIndex = 9999;
		item.addClassName("LtreeDragged");
	},
	
	getClone : function (item) {
		var EL = document.createElement(item.tagName);
		EL.className = "LtreeClone";
		EL.style.display = "inline";
		EL.nowrap = "nowrap";
		EL.innerHTML = item.innerHTML;
		EL.imClone = true;
		return EL;
	},

	absolutize : function(item) {
		item.oldstyle = {
			position:item.style.position, 
			left:item.style.left,
			top:item.style.top,
			width:item.style.width, height:item.style.height,
			marginLeft:item.getStyle("marginLeft"),
			marginTop:item.getStyle("marginTop")
		};

		var offsets = item.cumulativeOffset();
		var top     = offsets[1];
		var left    = offsets[0];
		//var dimensions = item.getDimensions();
		//var width   = dimensions.width;
		//var height  = this.tree.nodeHeight || dimensions.height;
		//var oldHeight = item.offsetHeight;
		item.style.position = "absolute";
		item.style.left = left + "px"
		//item.style.top = top - (item.offsetHeight-oldHeight) + "px"
		item.style.top = top + "px"
		//item.style.width = width + "px";
		//item.style.height = height + "px";
		item.style.marginLeft = "0";
		item.style.marginTop = "0";
	},

	deabsolutize : function (item) {
		item.adjacent.insertAdjacentElement("afterEnd", item);
		item.style.position = item.oldstyle.position;
		item.style.left = item.oldstyle.left;
		item.style.top = item.oldstyle.top;
		item.style.width = item.oldstyle.width;
		item.style.height = item.oldstyle.height;
		item.style.marginLeft = item.oldstyle.marginLeft;
		item.style.marginTop = item.oldstyle.marginTop;
	},
	
	releaseItem : function (item) {
		if (this.isBoundLineVisible() || this.selectedFolder) {
			if (this.isBoundLineVisible()) {
				var where = this.insertPosition.where == "top" ? "beforeBegin" : "afterEnd";
				this.insertPosition.item.node.insertAdjacentElement(where, item.node);
				this.removeBoundLine();
				where = this.insertPosition.where == "top" ? "previous" : "next";
				this.tree.onChange(item.node, this.insertPosition.item.node, where);
			} else 	if (this.selectedFolder) {
				var childUL = this.selectedFolder.node.getChildUL();
				if (!childUL) {
					childUL = new Element("ul");
					this.selectedFolder.node.appendChild(childUL);
				}
				childUL.appendChild(item.node);
				this.tree.onChange(item.node, this.selectedFolder.node, "into");
				this.unselectFolder();
			}
			var nodeUL = item.node.parentNode;
			if (nodeUL.getElementsByTagName("li").length == 0) nodeUL.parentNode.removeChild(nodeUL);
			this.resetItems();
			this.tree.draw(this.tree.root, false);
		}
		this.deabsolutize(item);
		item.removeClassName("LtreeDragged");
		item.clonedItem.parentNode.removeChild(item.clonedItem);
	},
	
	resetItems : function () {
		var items = document.getElementsByClassName("LtreeDragItem");
		for (var i=0; i<items.length; i++) {
			this.items[i] = items[i];
		}
	},
	
	showBoundLine : function (item, where) {
		if (!this.boundLine) {
			var EL = new Element("div");
			EL.className = "LtreeBoundLine";
			EL.style.overflow = "hidden"
			EL.style.position = "absolute";
			EL.style.display = "none";
			document.body.appendChild(EL);
			this.boundLine = EL;
		}
		var lineImg = item.node.lineImg;
		var offsets = lineImg.cumulativeOffset();
		var left    = offsets[0]+lineImg.offsetWidth;
		var top     = where == "top" ? offsets[1] :offsets[1]+lineImg.offsetHeight-2;

		this.boundLine.style.left = left + "px"
		this.boundLine.style.top = top + "px"
		this.boundLine.style.width = item.offsetWidth + "px"
		this.boundLine.style.display = "block";
		this.insertPosition.item = item;
		this.insertPosition.where = where;
	},

	removeBoundLine : function () {
		if (this.boundLine && this.boundLine.style.display == "block") {
			this.boundLine.style.display = "none";
		}
	},
	
	isBoundLineVisible : function () {
		if (this.boundLine && this.boundLine.style.display == "block") return true;
		return false;
	},
	
	enableChangeListOrder : function (flag) {
		this.changeListOrder = flag;
	}
}

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
