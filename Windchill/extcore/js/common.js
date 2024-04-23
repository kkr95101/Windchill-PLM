// �����۸�ũ �׵θ� ��ֱ�

function bluring() {
	if (event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG")
		document.body.focus();
}
document.onfocusin = bluring;

//
var _topMenu, _leftMenu, _leftMenuHtml, _slideMenu;
function changeLeftMenuStyle(aEvent) {
	_leftMenu.innerHTML = _leftMenuHtml;
	var menuObj = "";

	if (aEvent)
		menuObj = aEvent.target;
	else
		menuObj = event.srcElement;

	var changeEls = document.getElementById("divLeftMenuStyle").getElementsByTagName("img");
	for (var i = 0; i < changeEls.length; i++) {
		if (changeEls[i] == menuObj) {
			switch (i) {
			case 0:
				_leftMenu.className = "LslideMenu";
				break;
			case 1:
				_leftMenu.className = "LtreeMenu";
				break;
			}
		}
	}
	initLeftMenu();
}

function initPage() {
	initTopMenu();
	initLeftMenu();

	var divLeftMenuStyle = document.getElementById("divLeftMenuStyle");
	if (divLeftMenuStyle) {
		var changeEls = document.getElementById("divLeftMenuStyle").getElementsByTagName("img");
		for (var i = 0; i < changeEls.length; i++) {
			changeEls[i].onclick = changeLeftMenuStyle;
		}
	}
	initTab();
	initTable();
	initList();
	initTreeBlock();
}

function initTopMenu() {
	var root = document.getElementById("divTopMenu");
	if (!root || !dui.hhmenu)
		return;
	_topMenu = new dui.hhmenu.HHMenu();
	_topMenu.init(root.getElementsByTagName("ul")[0]);
// _topMenu.setCurrent(1,1);
}

function initLeftMenu() {
	_leftMenu = D$("divLeftMenu");
	if (!_leftMenu)
		return;
	_leftMenuHtml = _leftMenu.innerHTML;
	if (_leftMenu.hasClassName("LslideMenu"))
		initSlideMenu();
	else if (_leftMenu.hasClassName("LtreeMenu"))
		initTreeMenu();
}

function initSlideMenu() {
	var root = _leftMenu.getElementsByTagName("ul")[0];
	_slideMenu = dui.SlideMenu.makeSlideMenu(root, true, true); // �޴��� ������  �������� ���(xxx, true, xxx) 
																//, �ٸ��� ���� ����� �ڵ����� ������ ��� (xxx, xxx, // true)
}

function initTreeMenu() {
	treeMenu = new dui.tree.Tree();
	treeMenu.imagePath = "../images/treemenu_images/";
	treeMenu.enableMoveNode(false);
	var root = document.getElementById("divLeftMenu").getElementsByTagName("ul")[0];
	treeMenu.init(root);
// var selectedNode = treeMenu.selectNode("0>1>1");
}

function initTab() {
	if (dui && dui.Tab)
		dui.Tab.initPage();
}

function initTreeBlock() {
	if (!dui.tree)
		return;
	var treeBlocks = document.getElementsByClassName("divTree");
	for (var i = 0; i < treeBlocks.length; i++) {
		var tree = new dui.tree.Tree();
		tree.imagePath = "../images/tree_images/";
		tree.enableMoveNode(false);
		var root = treeBlocks[i].getElementsByTagName("ul")[0];
		tree.init(root);
	}
}

function initTable() {
	var listTables = document.getElementsByClassName("divListTable");
	for (var i = 0; i < listTables.length; i++) {
		styleListTable(listTables[i]);
	}
}

function initList() {
	var lists = document.getElementsByTagName("ul");
	for (var i = 0; i < lists.length; i++) {
		styleList(lists[i]);
	}
}

// ���̺� hover�� Lhover Ŭ���� �ο�
function styleListTable(listTableBlock) {
	var table = listTableBlock.getElementsByTagName("table")[0];
	var trArr = table.getElementsByTagName("tr");
	for (var i = 0; i < trArr.length; i++) {
		dui.CB.addEventHandler(D$(trArr[i]), "mouseover", function() {
			this.addClassName("Lhover");
		}.bind(trArr[i]));
		dui.CB.addEventHandler(trArr[i], "mouseout", function() {
			this.removeClassName("Lhover");
		}.bind(trArr[i]));
	}
}

// ����Ʈ hover�� Lhover Ŭ���� �ο�
function styleList(list) {
	var items = list.getElementsByTagName("li");
	for (var i = 0; i < items.length; i++) {
		dui.CB.addEventHandler(D$(items[i]), "mouseover", function() {
			this.addClassName("Lhover");
		}.bind(items[i]));
		dui.CB.addEventHandler(items[i], "mouseout", function() {
			this.removeClassName("Lhover");
		}.bind(items[i]));
	}
}

// IE6 CSS �̹��� ���û ���� ��ó�ڵ�
try {
	document.execCommand("BackgroundImageCache", false, true);
} catch (ignored) {
}

if ((typeof (dui)) != "undefined") {
	dui.CB.addEventHandler(window, "load", initPage);
}

// �̹��� rollhover
function MM_preloadImages() { // v3.0
	var d = document;
	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
		for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
	}
}

function MM_swapImgRestore() { // v3.0
	var i, x, a = document.MM_sr;
	for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
		x.src = x.oSrc;
}

function MM_findObj(n, d) { // v4.01
	var p, i, x;
	if (!d)
		d = document;
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all)
		x = d.all[n];
	for (i = 0; !x && i < d.forms.length; i++)
		x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++)
		x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById)
		x = d.getElementById(n);
	return x;
}

function MM_swapImage() { // v3.0
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;
	for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;
			if (!x.oSrc)
				x.oSrc = x.src;
			x.src = a[i + 2];
		}
}

function MM_goToURL() { // v3.0
	var i, args = MM_goToURL.arguments;
	document.MM_returnValue = false;
	for (i = 0; i < (args.length - 1); i += 2)
		eval(args[i] + ".location='" + args[i + 1] + "'");
}

function openProgressDiv() {
	var progress = document.getElementById("progressDiv");
	if (progress == null)
		return;
	progress.innerHTML = "<table width='100%' height='100%' border='0'><tr>	<td align='center' valign='middle'><img src='/Windchill/extcore/dhtmlx/imgs/dhxlayout_skyblue/dhxlayout_cell_progress.gif' border='0'/></td></tr></table>";
	progress.style.display = "block";
}

function closeProgressDiv() {
	var progress = document.getElementById("progressDiv");
	if (progress == null)
		return;

	progress.style.display = "none";
}
// session time START
var bLogin = true;

// Logout Timer 객체 정의
var LogOutTimer = function() {
	var S = {
		timer : null,
		limit : 1000 * 60 * 60,
		logout : function() {
			// alert("LogOut : "+new Date());
			bLogin = false;
			if (opener) {
//				alert('popup');
				self.close();
			} else {
//				alert('parent');
				parent.document.location.href = '/Windchill/extcore/auth/logout.jsp';
			}
		},
		start : function() {
			if (bLogin) {
				// alert("Timer start : "+new Date());
				S.timer = window.setTimeout(S.logout, S.limit);
			} else {
				if (opener) {
//					alert('popup');
					self.close();
				} else {
					// alert("이미 로그아웃 ");
					parent.document.location.href = '/Windchill/extcore/auth/logout.jsp';
				}
			}
		},
		reset : function() {
			// alert("call reset");
			window.clearTimeout(S.timer);
			S.start();
		}
	};

	window.onmousemove = function() {
		S.reset();
	};
	return S;
}();

// 로그아웃 타이머 실행
LogOutTimer.start();

// session time END
