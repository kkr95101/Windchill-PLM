
dui.Tab = function (obj) {
	this.initialize(obj);
}
dui.Tab.initPage = function () {
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className.indexOf("divTab") != -1) new dui.Tab(divs[i]);
	}
}
dui.Tab.prototype = {
	initialize : function(tabList) {
		if (typeof tabList == "string") tabList = document.getElementById(tabList);
		if (!tabList) return;
		var tabs = tabList.getElementsByTagName("li");
		for (var i=0; i<tabs.length; i++) {
			tabs[i].index = i;
			var link = tabs[i].getElementsByTagName("a")[0];
			if (!link.onclick) link.onclick = function () { return false; }
			dui.CB.addEventHandler(tabs[i], "click", function () {
				for (var k=0; k<tabs.length; k++) {
					var link = tabs[k].getElementsByTagName("a")[0];
					if (link && link.href && (linkIndex = link.href.lastIndexOf("#")) != -1 && 
						(tabarea = document.getElementById(link.href.substring(linkIndex+1)))) {
						if (k == this.index) tabarea.style.display = "block";
						else tabarea.style.display = "none";
					}
					if (k == this.index) D$(this).addClassName("Lcurrent");
					else D$(tabs[k]).removeClassName("Lcurrent");
				}
			}.bind(tabs[i]));
		}
	}
}

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
