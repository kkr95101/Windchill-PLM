/********************************************************************************
 * Left Menu Click
 * @History     : 2010.09.08 jhJeong Initial Creation
 ********************************************************************************/
function menuLink(mm_idx) {

}

//********************************
//Sub Menu
//********************************
function goPageUrl(url) {
	top.document.location.href = url;
}

function goLogout() {
	if (!confirm ("Logout �Ͻðڽ��ϱ�?"))
	{
		return;
	}
	top.document.execCommand('ClearAuthenticationCache');
	top.document.location.href='/Windchill/extcore/com/digitek/auth/jsp/login.jsp';
}


//********************************
//Sub Menu �̵� �Լ�
//********************************
function goSubMenu(menuUrl, contentUrl) {
	top.document.location.href = "/Windchill/extcore/jsp/main/Portal.jsp?category=" + menuUrl + "&cmdMenu=" + contentUrl;
}

//********************************
//Sub Menu �̵� �Լ�
//2010.09.09  jhJeong
//********************************
function goSubMenu(menuUrl, contentUrl, menuIndex) {
	top.document.location.href = "/Windchill/extcore/jsp/main/Portal.jsp?category=" + menuUrl + "&cmdMenu=" + contentUrl + "&menuIndex=" + menuIndex;
}

//********************************
//Sub Menu �̵� �Լ�
//2010.09.09  jhJeong
//********************************
//function goSubMenu(menuUrl, contentUrl, menuIndex, defaultOrderBy) {
//document.location.href = "/Windchill/extcore/jsp/main/Portal.jsp?category=" + menuUrl + "&cmdMenu=" + contentUrl + "&menuIndex=" + menuIndex + "&defaultOrderBy=" + defaultOrderBy;
//}

//********************************
//Sub Menu �̵� �Լ�
//2010.09.09  jhJeong
//********************************
//function goSubMenu(menuUrl, contentUrl, menuIndex, defaultOrderBy, state) {
//document.location.href = "/Windchill/extcore/jsp/main/Portal.jsp?category=" + menuUrl + "&cmdMenu=" + contentUrl + "&menuIndex=" + menuIndex + "&defaultOrderBy=" + defaultOrderBy + "&state=" + state;
//}

//********************************
//Sub Menu �̵� �Լ�
//2011.08.29
//********************************
function goSubMenuByKey(menuUrl, contentUrl, menukey, menuIndex) {
	top.document.location.href = "/Windchill/extcore/jsp/main/Portal.jsp?category=" + menuUrl + "&cmdMenu=" + contentUrl + "&menuIndex=" + menuIndex+ "&menukey=" + menukey;
}


//������Ʈ���� Menu
function goPMS() {
	top.document.location.href = "/Windchill/extcore/com/digitek/portal/main/jsp/Portal.jsp?cmdMenu=PrjCmdMenu&content=ProjectList";
}

//********************************
//POPUP Menu �̵� �Լ�
//********************************
function goPMSMenu(menuUrl, contentUrl) {
	top.document.location.href="/Windchill/extcore/com/digitek/portal/main/jsp/Portal.jsp?cmdMenu=" + menuUrl + "&content=" + contentUrl;

}

function goFirstChildMenu(id){
    var firstSubMenu = $("ul.subNavi").filter("#"+id);
    var firstList = firstSubMenu.children().first(); 
    var firstLink = firstList.find("a").attr("href"); 

    document.location.href = firstLink;
    
}
