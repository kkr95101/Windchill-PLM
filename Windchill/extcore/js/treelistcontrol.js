TreeListControlHandler = {
	nextID					: 0,
	getUniqueID				: function() { return this.nextID++; },
	allTrees				: new Array(),
	preventRowClick			: false,
	callExpand				: function(treeID, nodeID) { this.allTrees[treeID].allNodes[nodeID].expand(); },
	callCollapse			: function(treeID, nodeID) { this.allTrees[treeID].allNodes[nodeID].collapse(); },
	callRowClick			: function(treeID, nodeID) { this.allTrees[treeID].allNodes[nodeID].click(); },
	
	imgConnectMore			: 'connect.more.gif',
	imgConnectEnd			: 'connect.end.gif',
	imgConnectBridge		: 'connect.bridge.gif',
	imgHandleCollapseMore	: 'handle.collapse.more.gif',
	imgHandleCollapseEnd	: 'handle.collapse.end.gif',
	imgHandleExpandMore		: 'handle.expand.more.gif',
	imgHandleExpandEnd		: 'handle.expand.end.gif',
	imgEmpty				: 'empty.gif',
	imgIconDefault			: 'icon.folder.gif',
	
	
	xmlHTTPStateChange		: function(treeID, nodeID) { this.allTrees[treeID].allNodes[nodeID].xmlCallback(); }
}

function TreeListControl(sRootLabel, sIconSrc, hideColumnHeadings, hideRootNode) {
	this.ID						= TreeListControlHandler.getUniqueID();
	TreeListControlHandler.allTrees[this.ID] = this;
	this.all					= new Array(); //user indices
	this.allNodes				= new Array(); //system indices
	this.columns				= new Array();
	this.rootNode				= new TreeListControlNode(true, sIconSrc, null, 1);
	this.rootNode.columnText[0]	= sRootLabel;
	this.rootNode.depth			= 0;
	this.rootNode.bShowHandle	= false;
	this.rootNode.oTree			= this;
	this.allNodes[this.rootNode.ID] = this.rootNode;
	this.rendered				= false;
	this.nLabelColumn			= 0; //this is the column in which the icons and branches are drawn
	this.iconPath				= 'tlcimages/';
	this.showColumnHeadings		= hideColumnHeadings ? false : true;
	this.showRootNode			= hideRootNode ? false : true;
	this.disableRecalc			= false;
}

TreeListControl.prototype.toString = function() {
	var str, x;
	str = '';
	x = 0;
	for(var i=0; i<this.columns.length; i++) {
		str += '<div class="tlc_columnheading" style="width:' + this.columns[i].width + 'px; left:' + x + 'px; ' +
			   '">' + this.columns[i].name + "</div>";
		x += this.columns[i].width;
	}
	//str = '<div id="treelistcontrol' + this.ID + '" class="treelistcontrol" style="width:' + x +
	//	  'px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' + str +
	//	  '</tr></table>' + this.rootNode + '</div>';
	str = '<div id="treelistcontrol' + this.ID + '" class="treelistcontrol" style="width:' + (x + 4) +
		  'px;"><div class="tlc_headings" style="display:expression(TreeListControlHandler.allTrees[' + this.ID +
			   '].showColumnHeadings ? \'block\' : \'none\');">' + str + '</div>' + this.rootNode + '</div>';
	this.rendered = true;
	return str;
}

TreeListControl.prototype.redraw = function() {
	//redraw all icons in the tree
}

TreeListControl.prototype.add = function(oNode) {
	this.rootNode.add(oNode);
}

TreeListControl.prototype.addColumn = function(oColumn) {
	this.columns[this.columns.length] = oColumn;
}

function TreeListControlColumn(width, name, onclickdisabled) {
	this.name = name;
	this.width = width ? width : '100';
	this.onclickdisabled = onclickdisabled ? true : false;
	
}

function TreeListControlNode(bShowChildren, sIconSrc, sXMLSrc, refKey) {
	//refKey is an optional user-specified value which will be matched to this node for easy reference later
	this.columnText			= new Array();
	this.bShowChildren 		= bShowChildren ? true : false;
	this.sIconSrc			= sIconSrc ? sIconSrc : null;
	this.sXMLSrc			= (typeof(sXMLSrc) == 'string') ? sXMLSrc : '';
	this.bDynamicNode		= this.sXMLSrc.length > 0 ? true : false; //set to false once children are loaded to prevent sXMLSrc being used to dynamically load the children
	this.bShowHandle		= true; //this is the + or - icon
	this.refKey				= (refKey || refKey == 0) ? refKey : null;
	this.ID					= TreeListControlHandler.getUniqueID();
	this.sImages			= '';
	this.sHandle			= '';
	this.onclick			= '';
	this.useIcon			= true;

	this.nextSibling		= null;
	this.previousSibling	= null;
	this.firstChild			= null;
	this.lastChild			= null;
	this.parentNode			= null;
	this.oTree				= null;
	this.rendered			= false;
	
	//this.className			= 'tlc_node_row';
	//this.classNameHover		= 'tlc_node_row_hover';
	//this.classNameClick		= 'tlc_node_row_click';		
}

TreeListControlNode.prototype.toString = function() {
	var str = '<div class="tlc_node" id="tlcnode' + this.ID + '">';
	str += '<div class="tlc_node_row" onmouseenter="this.className=\'tlc_node_row_hover\'"' +
		   ' onmouseleave="this.className=\'tlc_node_row\';" style="cursor:default;' +
		   (this.parentNode == null ? 'display:expression(TreeListControlHandler.allTrees[' + this.oTree.ID +
			   '].showRootNode ? \'block\' : \'none\');' : '') + '" onclick="if(!TreeListControlHandler.preventRowClick) { ' + this.onclick + ' }"' +
		   ' onmousedown="if(!TreeListControlHandler.preventRowClick) this.className=\'tlc_node_row_click\';" onmouseup="this.className=\'tlc_node_row_hover\';">';
	var c = this.oTree.columns;
	var x = 0;
	for(var i=0; i<c.length; i++) {
		str += '<div class="tlc_node_text" style="width:' + c[i].width + 'px; left:' + x + 'px;"' +
				(c[i].onclickdisabled ? ' onmouseenter="TreeListControlHandler.preventRowClick=true;" onmouseleave="TreeListControlHandler.preventRowClick=false;"' : '' )+ '>';
		if(this.oTree.nLabelColumn == i) {
			if(!this.oTree.disableRecalc) this.recalcImages();
			str += '<span>'; //handle and images
			//str += this.sImages + this.sHandle + '<img src="' + (this.sIconSrc ? this.sIconSrc : this.oTree.iconPath + TreeListControlHandler.imgIconDefault) + '" width="16" height="16" align="absmiddle">';
			str += this.sImages + this.sHandle;
			str += '</span>&nbsp;';
		}
		str += '<span>' + (this.columnText[i] ? this.columnText[i] : '&nbsp;') + '</span></div>';
		x += c[i].width;
	}
	str += '</div><div id="children' + this.ID + '" class="tlc_node_children" style="display:' + ((this.bShowChildren && this.firstChild) ? 'block' : 'none') + '">';
	var node = this.firstChild;
	while(node) {
		str += node;
		node = node.nextSibling;
	}
	str += "</div></div>";
	this.rendered = true
	return str;
}

TreeListControlNode.prototype.recalcImages = function() {
	var h = TreeListControlHandler;
	this.sImages = '';
	if(this.parentNode) {
		if(this.parentNode.parentNode) {
			this.sImages = this.parentNode.sImages;
			this.sImages += '<img src="' + this.oTree.iconPath +
							(this.parentNode.nextSibling ? h.imgConnectBridge : h.imgEmpty) +
							'" width="16" height="16" align="absmiddle">';
		}
		if(this.firstChild || this.bDynamicNode) {
			if(this.bShowChildren && !this.bDynamicNode) {
				this.sHandle = '<img src="' + this.oTree.iconPath +
								(this.nextSibling ? h.imgHandleCollapseMore : h.imgHandleCollapseEnd) +
								 '" style="cursor:hand;"' +
								' width="16" height="16" align="absmiddle" onmouseenter="TreeListControlHandler.preventRowClick=true;" onmouseleave="TreeListControlHandler.preventRowClick=false;"' +
								' onclick="TreeListControlHandler.callCollapse(' +
								this.oTree.ID + ',' + this.ID + ');">';
			} else {
				this.sHandle = '<img src="' + this.oTree.iconPath +
								(this.nextSibling ? h.imgHandleExpandMore : h.imgHandleExpandEnd) +
								 '" style="cursor:hand;"' +
								' width="16" height="16" align="absmiddle"' +
								' onmouseenter="TreeListControlHandler.preventRowClick=true;"' +
								' onmouseleave="TreeListControlHandler.preventRowClick=false;"' +
								' onclick="TreeListControlHandler.callExpand(' +
								this.oTree.ID + ',' + this.ID + ');">';
			}
		} else {
			this.sHandle = '<img src="' + this.oTree.iconPath +
							(this.nextSibling ? h.imgConnectMore : h.imgConnectEnd) +
							'" width="16" height="16" align="absmiddle">';
		}
	}
	if(this.rendered) {
		var o = document.all['tlcnode'+this.ID].firstChild.childNodes[this.oTree.nLabelColumn].firstChild;
		//o.innerHTML = this.sImages + this.sHandle + (this.useIcon ? '<img src="' + (this.sIconSrc ? this.sIconSrc : this.oTree.iconPath + TreeListControlHandler.imgIconDefault) + '" width="16" height="16" align="absmiddle">' : '');
		o.innerHTML = this.sImages + this.sHandle ;
	}
}

TreeListControlNode.prototype.recalcChildImages = function() {
	var node = this.firstChild;
	while(node) {
		node.recalcImages();
		node.recalcChildImages();
		node = node.nextSibling;
	}
}

TreeListControlNode.prototype.expand = function() {
	this.bShowChildren = true;
	var o = document.all['tlcnode' + this.ID];
	o.lastChild.style.display = 'block';
	var id1 = this.oTree.ID;
	var id2 = this.ID;
	if(!this.oTree.disableRecalc) this.recalcImages();
	if(this.bDynamicNode) {
		document.all['tlcnode' + this.ID].firstChild.className = 'tlc_node_row';
		this.bDynamicNode = false;
		var tempnode = new TreeListControlNode(false, this.oTree.iconPath + 'icon.arrow.gif');
		tempnode.setColumnText(this.oTree.nLabelColumn, '<span style="color:#FF6600">Loading...</span>');
		this.add(tempnode);
		this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		var treeid = this.oTree.ID;
		var nodeid = this.ID;
		this.xmlhttp.onreadystatechange = function() { TreeListControlHandler.xmlHTTPStateChange(treeid, nodeid); };
		try {
		this.xmlhttp.open("POST", this.sXMLSrc, true);
		this.xmlhttp.send(null);
		} catch(ex){}
	}
}

TreeListControlNode.prototype.collapse = function() {
	this.bShowChildren = false;
	var o = document.all['tlcnode' + this.ID];
	o.lastChild.style.display = 'none';
	//var img = o.childNodes[0].childNodes[this.oTree.nLabelColumn].firstChild.lastChild.previousSibling;
	var img = o.childNodes[0].childNodes[this.oTree.nLabelColumn].firstChild.lastChild;

	var id1 = this.oTree.ID;
	var id2 = this.ID;

	img.onclick = function() { TreeListControlHandler.callExpand(id1, id2); return false; };
	img.src = this.oTree.iconPath + (this.nextSibling ? TreeListControlHandler.imgHandleExpandMore : TreeListControlHandler.imgHandleExpandEnd);
}

TreeListControlNode.prototype.click = function() {
	
}

TreeListControlNode.prototype.setText = function() {
	for(var i=0; i<arguments.length; i++)
		this.setColumnText(i, arguments[i]);
}

TreeListControlNode.prototype.setColumnText = function(nColumn, sText) {
	this.columnText[nColumn] = (sText ? sText : '');
	if(this.rendered) {
		var o = document.all['tlcnode' + this.ID];
		o.firstChild.childNodes[nColumn].lastChild.innerHTML = this.columnText[nColumn];
	}
}

TreeListControlNode.prototype.add = function(oNode, bNoRedraw, oSibling, bInsertAfter) {
	if(bNoRedraw) this.oTree.disableRecalc = true;
	this.bDynamicNode = false;
	oNode.oTree = this.oTree;
	oNode.parentNode = this;
	if(oNode.refKey || oNode.refKey == 0) this.oTree.all[oNode.refKey] = oNode;
	this.oTree.allNodes[oNode.ID] = oNode;
	if(!this.firstChild) {
		this.firstChild = oNode;
		this.lastChild = oNode;
	} else {
		var node1, node2;
		if(oSibling) {
			if(bInsertAfter) {
				node1 = oSibling;
				node2 = oSibling.nextSibling;
			} else {
				node1 = oSibling.previousSibling;
				node2 = oSibling;
			}
		} else {
			node1 = this.lastChild;
			node2 = null;
		}
		if(node1) {
			oNode.previousSibling = node1;
			node1.nextSibling = oNode;
		} else {
			this.firstChild = oNode;
		}
		if(node2) {
			oNode.nextSibling = node2;
			node2.previousSibling = oNode;
		} else {
			this.lastChild = oNode;
		}
	}
	if(this.oTree.rendered) {
		var oSib;
		var html = oNode + '';
		var oParent = document.all['tlcnode' + this.ID];
		if(node1) {
			oSib = document.all['tlcnode' + node1.ID];
			oSib.insertAdjacentHTML('afterEnd', html);
		} else if(node2) {
			oSib = document.all['tlcnode' + node2.ID];
			oSib.insertAdjacentHTML('beforeBegin', html);
		} else {
			oParent.lastChild.innerHTML = html;
		}
		if(this.parentNode) this.expand();
		if(!node2 && node1) {
			node1.recalcImages();
			node1.recalcChildImages();
		}
	}
	if(bNoRedraw) this.oTree.disableRecalc = false;
}

TreeListControlNode.prototype.insertBefore = function(oNode, bNoRedraw) {
	this.parentNode.add(oNode, bNoRedraw, this, false);
}

TreeListControlNode.prototype.insertAfter = function(oNode, bNoRedraw) {
	this.parentNode.add(oNode, bNoRedraw, this, true);
}

TreeListControlNode.prototype.remove = function() {
	this.removeChildren();
	var node1 = this.previousSibling;
	var node2 = this.nextSibling;
	if(node1)
		node1.nextSibling = node2;
	else
		this.parentNode.firstChild = node2;
	if(node2)
		node2.previousSibling = node1;
	else
		this.parentNode.lastChild = node1;
	this.oTree.allNodes[this.ID] = null;
	if(this.refKey != null) this.oTree.all[this.refKey] = null;
	var p = document.all['tlcnode' + this.ID].parentElement;
	document.all['tlcnode' + this.ID].removeNode(true);
	if(this.rendered && this.previousSibling && !this.nextSibling) {
		this.previousSibling.recalcImages();
		this.previousSibling.recalcChildImages();
	}
	if(!this.parentNode.firstChild) {
		this.parentNode.recalcImages();
		p.style.display = 'none';
	}
	this.rendered = false;
	this.parentNode = null;
	this.nextSibling = null;
	this.previousSibling = null;
	this.firstChild = null;
	this.lastChild = null;
	return this;
}

TreeListControlNode.prototype.removeChildren = function() {
	var node = this.firstChild;
	while(node) {
		node.removeChildren();
		this.oTree.allNodes[node.ID] = null;
		var dead = node;
		node = node.nextSibling;
		delete dead;
	}
}

TreeListControlNode.prototype.xmlCallback = function() {
	var failed;
	if(this.xmlhttp.readyState == 4)
		if(this.xmlhttp.status==0) {
			var xml = new ActiveXObject("Microsoft.XMLDOM");
			if(xml.loadXML(this.xmlhttp.responseText)) {
				failed = false;
				this.firstChild.remove();
				if(xml.documentElement) {
					this.addXMLChildNodes(xml.documentElement, this);
				}
				this.recalcImages();
			} else {
				failed = true;
			}
		} else {
			failed = true;
		}
		if(failed) {
			this.firstChild.setColumnText(this.oTree.nLabelColumn, '<span style="color:red">Unavailable - ' + this.xmlhttp.status + '</span>');
			this.firstChild.useIcon = false;
			this.firstChild.recalcImages();
		}
}

TreeListControlNode.prototype.addXMLChildNodes = function(xml, oParent) {
	var showchildren, refkey, xmlsrc, onclick, iconsrc;
	if(xml.childNodes.length > 0) {
		var x = xml.lastChild;
		while(x) {
			showchildren = x.getAttribute('showchildren');
			if(!showchildren) showchildren = false;
			else showchildren = (showchildren == 'yes' ? true : false);
			refkey = x.getAttribute('refkey');
			if(!refkey) refkey = null;
			xmlsrc = x.getAttribute('xmlsrc');
			if(!xmlsrc) xmlsrc = null;
			onclick = x.getAttribute('onclick');
			if(!onclick) onclick = null;
			iconsrc = x.getAttribute('iconsrc');
			if(!iconsrc) iconsrc = null;
			var node = new TreeListControlNode(showchildren, iconsrc, xmlsrc, refkey);
			node.onclick = onclick;
			for(var i=0; i<x.childNodes.length-1; i++)
				node.setColumnText(i,x.childNodes[i].firstChild.nodeValue+'');
			if(oParent.firstChild)
				oParent.firstChild.insertBefore(node);
			else
				oParent.add(node);
			if(x.lastChild.childNodes.length > 0)
				this.addXMLChildNodes(x.lastChild, node)
			x = x.previousSibling;
		}
	}
}
