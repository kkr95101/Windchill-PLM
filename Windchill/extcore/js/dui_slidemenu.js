
dui.SlideMenu = {};

dui.SlideMenu = function () {};
dui.SlideMenu.makeSlideMenu = function (elId, isFrame, autoClose) {
	var el = D$(elId);
	Object.extend(el, dui.SlideMenu.prototype);
	el.isFrame = isFrame==undefined ? true : isFrame; 
	el.autoClose = autoClose==undefined ? true : autoClose; 
	el.init();
	return el;
};
dui.SlideMenu.prototype = {
	isFrame : null,
	autoClose : null,
	currLI : null,
	openLI : [],
	beforeOpen : function(menu) {},
	afterOpen : function(menu) {},
	beforeClose : function(menu) {},
	afterClose : function(menu) {},

	init : function() {
		this.setMenu(this, 0);
	},

	setMenu : function(UL, depth) { 
		var LIs = UL.childElements();
		for (var i=0; i<LIs.length; i++) {
			D$(LIs[i]).depth = depth;
			if (LIs[i].hasClassName("Lcurrent")) this.currLI = LIs[i];
			var childUL = this.getChildUL(LIs[i]);
			if (childUL) {
				LIs[i].childUL = D$(childUL);
				LIs[i].state = "closed";
				if (LIs[i].hasClassName("Lopen")) {
					LIs[i].state = "open";
					this.openLI[depth] = LIs[i]
				}
				this.setMenu(childUL, depth+1);
			} else 	LIs[i].state = "none";
			
			dui.CB.addEventHandler(LIs[i], "click", this.toggle.bind(this));
		}
	},	

	getChildUL : function(LI) { 
		var childElements = LI.childElements(); 
		if (childElements[childElements.length-1].tagName == "UL") return childElements[childElements.length-1];
		else return null;
	},
	
	toggle : function(evt) {
		var LI;
		if (evt.tagName == "LI") LI = evt;
		else {
			dui.CB.stopPropagation(evt);
			var evtSrc = evt.target ? evt.target : evt.srcElement;
			if (!this.isFrame && evtSrc.tagName == "A" && evtSrc.href.substr(evtSrc.href.length-1)!="#") return;
			LI = this.getLIFromEvtSrc(evtSrc);
			if (!LI) return;
		} 
		
		this.setCurrent(LI);
		
		if (this.autoClose) {
			if (this.openLI[LI.depth] && this.openLI[LI.depth] == LI) return;
			if (this.openLI[LI.depth]) this.close(this.openLI[LI.depth]);
			this.open(LI);
			this.openLI[LI.depth] = LI;
		} else {
			if (LI.state == "open") this.close(LI);
			else if (LI.state == "closed") this.open(LI);
		}
	},
	
	setCurrent : function (LI) {
		if (!LI.hasClassName("Lcurrent")) {
			if (this.currLI) this.currLI.removeClassName("Lcurrent");
			LI.className += " Lcurrent ";				
			this.currLI = LI;
		}
	},
	
	open : function(LI) {
		if (!LI || !LI.childUL) return;
		LI.childUL.style.display = "block";
		LI.state = "open";
		LI.addClassName("Lopen");
	},
	
	close : function(LI) {
		if (!LI || !LI.childUL) return;
		LI.childUL.style.display = "none";
		LI.state = "closed";
		LI.removeClassName("Lopen");
	},
	
	selectMenu : function(idx0, idx1, idx2) {
		if (arguments.length == 1) this.toggle(this.childElements()[idx0]);
		else if(arguments.length == 2)	 this.toggle(this.childElements()[idx0].childUL.childElements()[idx1]);
		else if(arguments.length == 3) this.toggle(this.childElements()[idx0].childUL.childElements()[idx1].childUL.childElements()[idx2]);
		
		this.init();
	},
	
	getLIFromEvtSrc : function (obj) {
		if (obj.tagName == "LI") return obj;
		if (obj.tagName == "SPAN") return obj.parentNode;
		if (obj.tagName == "A") return obj.parentNode.parentNode;
		return null;
	}
}

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
