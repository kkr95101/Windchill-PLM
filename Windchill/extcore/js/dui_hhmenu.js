
dui.hhmenu = {};
dui.hhmenu.HHMenu = function() {};
dui.hhmenu.HHMenu.prototype = {
	rootUL : null,
	menus : [],
	hoverMenu : null,
	currentMenu1 : null,
	currentMenu2 : null,
	timer : null,
	
	init : function (ulObj) {
		if (typeof(ulObj) == "string") ulObj = document.getElementById(ulObj);
		this.rootUL = D$(ulObj);
		var menus = this.rootUL.childElements();
		var currentMenu1, currentMenu2;
		for (var i=0; i<menus.length; i++) {
			menus[i].childUL = D$(menus[i]).getElementsByTagName("ul")[0];
			menus[i].link = menus[i].getElementsByTagName("a")[0];
			dui.CB.addEventHandler(menus[i].link, "mouseover", this.onMouseOver.bind(this, menus[i]));
			dui.CB.addEventHandler(menus[i].link, "focus", this.onMouseOver.bind(this, menus[i]));
			dui.CB.addEventHandler(menus[i].link, "mouseout", this.onMouseOut.bind(this, menus[i]));
			menus[i].index = i;
			if (this.currentMenu1 == null && menus[i].hasClassName("Lcurrent")) currentMenu1 = i;
			if (menus[i].childUL) {
				this.adjustPosition(menus[i].childUL);
				dui.CB.addEventHandler(menus[i].childUL, "mouseover", this.onMouseOver.bind(this, menus[i]));
				dui.CB.addEventHandler(menus[i].childUL, "mouseout", this.onMouseOut.bind(this, menus[i]));

				menus[i].childMenus = menus[i].childUL.childElements();
				for (var j = 0; j < menus[i].childMenus.length; j++) {
					if (D$(menus[i].childMenus[j]).hasClassName("Lcurrent")) currentMenu2 = j;
					menus[i].childMenus[j].index = j;
				}
			}
		}
		this.addHoverEvent();
		this.menus = menus;
		this.setCurrent(currentMenu1, currentMenu2);
		this.showMenu(menus[this.currentMenu1]);
	},
	
	addHoverEvent : function () {
		var mouseOverHandler = function () {
			this.addClassName("Lhover");
			this.addClassName("Lhover"+this.index);
		}
		var mouseOutHandler = function () {
			this.removeClassName("Lhover");
			this.removeClassName("Lhover"+this.index);
		}
		var menus = this.rootUL.getElementsByTagName("li");
		for (var i = 0; i < menus.length; i++) {
			dui.CB.addEventHandler(menus[i], "mouseover", mouseOverHandler.bind(menus[i]));
			dui.CB.addEventHandler(menus[i], "mouseout", mouseOutHandler.bind(menus[i]));
		}
	},
	
	setCurrent : function (idx1, idx2) {
		if (this.currentMenu1 != null) {
			this.currentMenu1.removeClassName("Lcurrent");
			this.currentMenu1.removeClassName("Lcurrent" + this.currentMenu1.index);
			this.hideMenu(this.currentMenu1);
			this.currentMenu1 = null;
		}
		if (idx1 >= 0) {
			this.menus[idx1].addClassName("Lcurrent");
			this.menus[idx1].addClassName("Lcurrent"+idx1);
			this.showMenu(this.menus[idx1]);
			this.currentMenu1 = this.menus[idx1];
		}
		
		if (this.currentMenu2 != null) {
			this.currentMenu2.removeClassName("Lcurrent");
			this.currentMenu2.removeClassName("Lcurrent" + this.currentMenu2.index);
			this.currentMenu2 = null;
		}
		if (idx2 >= 0) {
			this.menus[idx1].childMenus[idx2].addClassName("Lcurrent");
			this.menus[idx1].childMenus[idx2].addClassName("Lcurrent"+idx2);
			this.currentMenu2 = this.menus[idx1].childMenus[idx2];
		}
	},
	
	adjustPosition : function (childUL) {
		childUL.style.visibility = "hidden";
		var oldDisplay = D$(childUL).getStyle("display");
		childUL.style.display = "block";
		this.setULWidth(childUL);

		var childOffset = childUL.offsetParent == childUL.parentNode ?  childUL.offsetLeft+childUL.parentNode.offsetLeft : childUL.offsetLeft; // 원래 왼쪽에서부터의 거리
		var offset = (childUL.offsetWidth - childUL.parentNode.offsetWidth)/2;  // 왼쪽으로 이동시킬 거리
		if (offset > childOffset) offset = childOffset; // 이동시킬 거리가 왼쪽끝보다 많으면 왼쪽끝에 붙인다.
		childOffset -= offset;

		// align right
		var rightOffset = childUL.offsetWidth + childOffset - this.rootUL.offsetWidth;
		if (rightOffset > 0) offset += rightOffset;

		if (this.userOffset) offset += this.userOffset;
		childUL.style.left = childUL.offsetLeft - offset + "px";
		childUL.style.visibility = "visible";
		childUL.style.display = oldDisplay;		
	},
	
	setULWidth : function (childUL) {
		var liList = childUL.getElementsByTagName("li");
		var width = 0;
		for (var i=0; i<liList.length; i++) {
			var li = D$(liList[i]);
			width += li.offsetWidth+parseInt(li.getStyle("margin-left"))+parseInt(li.getStyle("margin-right"));
		}
		childUL.style.width = width+20+"px"; // firefox에서는 포지셔닝된 부모보다 width가 커지지 못해 아래로 떨어지므로 width를 지정해주어야 함. 20은 여유분.
	},
	
	onMouseOver : function (menu) {
		if (this.timer) clearTimeout(this.timer);
		this.hideMenu(this.currentMenu1);
		this.hideMenu(this.hoverMenu);
		this.showMenu(menu);
		this.hoverMenu = menu;
	},
	 
	onMouseOut : function (menu) {
		this.timer = setTimeout(this.doMouseOut.bind(this, menu), 700);
	},
	
	doMouseOut : function (menu) {
		this.hideMenu(menu);
		this.showMenu(this.currentMenu1);
	},
	
	showMenu : function (menu) {
		if (menu && menu.childUL) menu.childUL.style.display = "block";
	},
	
	hideMenu : function (menu) {
		if (menu && menu.childUL) menu.childUL.style.display = "none";
	}
}

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
