
/*----------------------------------------------------------------------------
 * 수정일      요청자  수정자  수정사유
 *----------------------------------------------------------------------------
 * 2007.09.15  KJK    KJK  New Creating
 *---------------------------------------------------------------------------*/
/*****************************************************************************
* Title                 : Form Control
* @author               : jgkim@digiteki.com
* @date                 : 2007.10.15
* @Description          : Form을 제어
* @Copyright            : DIGITEKI. Ltd.
******************************************************************************/

/**
 * window창 OPEN
 */
function UTIL_openPopup(nw,nh) {
  var opt,args = UTIL_openPopup.arguments;
  opt = "width="+nw+",height="+nh+",scrollbars=auto,resizable=yes"+
    ( (args.length>2)?",left="+args[2]:"")+
    ( (args.length>3)?"top="+args[3]:"");
  return window.open("about:blank","",opt);
}

/**
 * window창 OPEN
 */
function UTIL_openwin(url, width, height, moveCenter, scrollbars, resizable) {
  var openwinRef = null;
  scrollbars = (scrollbars == null) ? "1" : scrollbars;
  resizable = (resizable == null) ? "1" : resizable;
  openwinRef = window.open(url , "", "toolbar=0,location=0,status=1,menubar=0,scrollbars=" + scrollbars + ",resizable=" + resizable + ",width=" + width + ",height=" + height);
  if (moveCenter != null) {
    if(moveCenter) {
      var windowX = Math.ceil( (window.screen.width  - width) / 2 );
      var windowY = Math.ceil( (window.screen.height - height) / 2 );
      openwinRef.moveTo(windowX, windowY);
    }
  }
  return openwinRef;
}

function pleasewait(hide){
  if( document.all.waitBox != null ){
    if(hide){
      document.all.waitBox.style.display = "none";
    }else{
      document.all.waitBox.style.display = "block"
    }
  }
}

// 달력 창 POPUP
function UTIL_popCalendar(varName) {
  var fullDate = document.getElementById(varName);
  var str ="/Windchill/extcore/jsp/common/calendar.jsp?fld="+varName+"&fullDate="+fullDate.value;
  var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
  var leftpos = (screen.width - 224)/ 2; 
  var toppos = (screen.height - 230) / 2 ; 
  var rest = "width=220,height=230,left=" + leftpos + ',top=' + toppos;
  var newwin = window.open( str , "calendar", opts+rest);
}

// 시작일이 있는 달력창 Pop-up(시작일 이전 날짜 선택 안됨)
function UTIL_startDatePopCalendar(varName, startDate) {
	  var fullDate = document.getElementById(varName);
	  var str ="/Windchill/extcore/jsp/common/calendar.jsp?fld="+varName+"&fullDate="+fullDate.value+"&startDate="+startDate;
	  var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
	  var leftpos = (screen.width - 224)/ 2; 
	  var toppos = (screen.height - 230) / 2 ; 
	  var rest = "width=220,height=230,left=" + leftpos + ',top=' + toppos;
	  var newwin = window.open( str , "calendar", opts+rest);
	}

// 종료일이 있는 달력창 Pop-up(종료일 이후 날짜 선택 안됨)
function UTIL_endDatePopCalendar(varName, endDate) {
	var fullDate = document.getElementById(varName);
	var str ="/Windchill/extcore/jsp/common/calendar.jsp?fld="+varName+"&fullDate="+fullDate.value+"&endDate="+endDate;
	var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
	var leftpos = (screen.width - 224)/ 2; 
	var toppos = (screen.height - 230) / 2 ; 
	var rest = "width=220,height=230,left=" + leftpos + ',top=' + toppos;
	var newwin = window.open( str , "calendar", opts+rest);
}

// 해당FormValue를 Clear
function UTIL_clearFormValue(obj) {
  try
  {
    obj.value = "";
  }
  catch(execerr) { alert(execerr)}

  return false;
}

// User검색필드 Clear처리
function UTIL_clearObjInfo(obj1, obj2) {
  try
  {
      obj1.value = "";
      obj2.value = "";
  }
  catch(execerr) { alert(execerr) }

  return false;
}

// User검색필드 Clear처리
function UTIL_clearUserInfo(obj) {
  try
  {
    ( eval("document."+ obj.form.name + "." + obj.name +"_ID")).value = "";
    ( eval("document."+ obj.form.name + "." + obj.name )).value = "";
  }
  catch(execerr) { alert(execerr) }

  return false;
}

// User검색필드 Clear처리
function UTIL_clearUserInfoForm(obj, form) {
  try
  {
    ( eval("document."+ form + "." + obj.name +"_ID")).value = "";
    ( eval("document."+ form + "." + obj.name )).value = "";
  }
  catch(execerr) { alert(execerr)}

  return false;
}
//projectName 필드 Clear 처리
function UTIL_clearProjectInfo(obj){
	try {
		( eval("document."+ obj.form.name + "." + obj.name )).value = "";
	} catch (execerr) {
		// TODO: handle exception
		alert(execerr)
	}
	return false;
}

function UTIL_clearModelInfo(obj) {
  try
  {
    ( eval("document."+ obj.form.name + "." + obj.name )).value = "";
        ( eval("document."+ obj.form.name + "." + obj.name +"Oid")).value = "";
        ( eval("document."+ obj.form.name + "." +"partType")).value = "";
    }
  catch(execerr) { alert(execerr)}

  return false;
}

function UTIL_findUserList(){
    var left = window.screenLeft+event.clientX;
    var top = window.screenTop+event.clientY;
    
    var left =  (window.screen.width/2) - (700/2);
    var top = (window.screen.height/2) - (500/2);
    
    var pop = window.open("about:blank","userWin","left="+left+",top="+top+",width=700,height=500,scrollbars=yes,resizable=yes");
    pop.location.href="/Windchill/extcore/jsp/pms/company/findUserList.jsp?mode=m";
}

// User검색필드 POPUP처리
function UTIL_searchUser(obj){
  if (event.keyCode == 13){
    var fldObject = document.getElementById(obj.name);
    var userName = escape(encodeURIComponent(fldObject.value));
//    var left = window.screenLeft+event.clientX;
//    var top = window.screenTop+event.clientY;
    
    var left = (screen.availWidtht - 750)/2;
    var top = (screen.availHeight - 500)/2;
    
    pop = window.open("about:blank","","left="+left+",top="+top+",width=750,height=500,scrollbars=yes,resizable=yes");
    pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&callFlag=srchAppUser&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  } else {
    return true;
  }
  return false;
}

// User검색필드 POPUP처리
function UTIL_searchUserForm(obj, form){
  if (event.keyCode == 13){
    var fldObject = document.getElementById(obj.name);
    var userName = escape(encodeURIComponent(fldObject.value));
//    var left = window.screenLeft+event.clientX;
//    var top = window.screenTop+event.clientY;
    var left = (screen.availWidtht - 700)/2;
    var top = (screen.availHeight - 410)/2;
    
    var pop = window.open("about:blank","","left="+left+",top="+top+",width=700,height=410,scrollbars=yes,resizable=yes");
    pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+form+"&target="+obj.name;
  } else {
    return true;
  }
  return false;
}

/**
 * 위임자Form필드 Clear
 */
function deleteDelegator()
{
  document.myform.revdelegator.value = "";
  document.myform.revdelegatorID.value = "";
}

function openDelegation(workitem)
{
  if (trim(document.myform.revdelegator.value) == '') {
    alert('위임자를 할당하여 주십시요!');
    return;
  }
  if (confirm("위임하시겠습니까?"))
  {
    var str = "/Windchill/servlet/ext/TaskDelegateAction?mode=TaskDelegate&workitem="+workitem+"&touser=" + document.myform.revdelegatorID.value;
    window.open(str, "revdelegator", "toolbar=no, height=470, width=550, resizable=yes")
  }
}

function UTIL_searchUserClick(obj){
  //var fldObject = document.getElementById(obj.name);  
  var userName = escape(encodeURIComponent(obj.value));
	
//  var left = window.screenLeft+event.clientX;
//  var top = window.screenTop+event.clientY;
//  var left = window.screenLeft/2;
//  var top = window.screenTop/2;
  
  var left =  (window.screen.width/2) - (750/2);
  var top = (window.screen.height/2) - (550/2);
  
  var pop = window.open("about:blank","","left="+left+",top="+top+",width=750,height=550,scrollbars=yes,resizable=yes");
  //결재위임 시 삭제된 유저 안나오게 처리 요청 append by jikim
  if(obj.name=='delegateUser'){
	  pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name+"&isDisable=Y";
  }
  if(obj.name!='delegateUser'){
  pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  }
  //pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  return false;
}

function UTIL_addListOption(optBox, optName, optValue){
    var listbox = eval("document.all" + "." + optBox);
    listbox.options[listbox.length] = new Option( optName,optValue );
}

function UTIL_clearListBox(target){
  var routeListBox = eval("document.all" + "." + target);
  if (routeListBox.length > 0){
      routeListBox.length = 0;
  }
}

function UTIL_clearAllListBox(objname){
  var objName;
  var listObj = document.getElementsByName(objname);
  for (var i = 0; i < listObj.length; i++) {
    objName = listObj[i].value;
        var Obj = document.getElementById(objName);
        var tagname = Obj.tagName.toUpperCase();

    var tmpObj ; 
    if (tagname == "INPUT") {
      tmpObj = document.getElementById(objName);
      tmpObj.value ="";
            tmpObj = document.getElementById(objName + "ID");
      tmpObj.value ="";
        } else if (tagname == "SELECT") {
      tmpObj = document.getElementById(objName);
      if (tmpObj.length > 0){
        tmpObj.length = 0;
      }
    }
  }   
}

// User검색필드 POPUP처리
function UTIL_findUser(){
  if (event.keyCode == 13){
//    var left = window.screenLeft+event.clientX;
//    var top = window.screenTop+event.clientY;
    
    var left =  (window.screen.width/2) - (700/2);
    var top = (window.screen.height/2) - (410/2);
    
    var pop = window.open("about:blank","","left="+left+",top="+top+",width=700,height=410,scrollbars=yes,resizable=yes");
    pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  } else {
    return true;
  }
  return false;
}

function UTIL_openUserInfo(userName) {
    window.open("/Windchill/extcore/jsp/common/UserInfoPopCnt.jsp?userName="+ userName,"UserInfo", "status=no, toolbar=no,scrollbars=no, height=370, width=350, resizable=no");
    
}

function closeProcess() {
    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2');
    div1.style.display = "none";
    div2.style.display = "none";
}

// 실행중입니다. 레이어생성
function CreateWaitLayer(left, top) {
  if( !left ) left = 200;
  if( !top ) top = 200;
  document.writeln("<div id=\"waitBox\" align=\"right\" ");
  document.writeln("style=\"position:absolute;z-index:1;display:none;top:"+top+"px; left:"+left+"px;\">");
  document.writeln(" <iframe scrolling=no src=\"/Windchill/extcore/jsp/common/wait_iframe.jsp\" frameborder=0 width=\"369\" height=\"173\"></iframe>");
  document.writeln("</div>");
}

// 실행중입니다. 레이어숨김
function HideWaitLayer() {
  if( document.all.waitBox != null ){
    document.all.waitBox.style.display = "none";
  }
}

// 실행중입니다. 레이어보임
function ShowWaitLayer(left, top) {
  if( document.all.waitBox != null ){
    if( left ){
      document.all.waitBox.style.left = left;
    }

    if( top ){
      document.all.waitBox.style.top = top;
    }
    document.all.waitBox.style.display = "block";
  }
}

// Popup Window
function openWin(url, width, height){
  open(url, "", "toolbar=no, location=no, directories=no, status=yes, menubar=no, scrollbars=yes, width=" + width + ", height=" + height);
}

/**
 * 하위분류코드가져오기
 * @param selectObject
 */
function selectInit(selectObject) {
    for (var i = selectObject.options.length; i > 0; i--) {
        selectObject.remove(i);
    }
}
/**
 * 하위분류코드가져오기
 * @param selectObject
 */
function selectClass(selectObject) {
    var formName = selectObject.form.name;
    var frameName = selectObject.targetFrame;
    var iframe = document.getElementById(frameName);
    var classification ;
    var codeType;
    if (selectObject.tagName.toUpperCase() == 'SELECT'){
       classification = selectObject.options[selectObject.selectedIndex].value;
       codeType = selectObject.options[selectObject.selectedIndex].codeType;
    }else {
       classification = selectObject.value;
       codeType = selectObject.codeType;
    }
    var childTarget = selectObject.childCom;
    iframe.src = "/Windchill/extcore/jsp/common/DGCodeClassfication.jsp?code=" + classification + "&formName=" + formName + "&childTarget=" + childTarget + "&codeType=" + codeType;
}

function selectClassByName(objName, childValue) {
    var objs = document.getElementsByName(objName);
    var selectObject;
    for ( var i=0; i<objs.length; i++){
         if (objs[i].checked){
             selectObject = objs[i];
             break;
         }
    }

    var formName = selectObject.form.name;
    var frameName = selectObject.targetFrame;
    var iframe = document.getElementById(frameName);

    var classification = selectObject.value;
    var codeType = selectObject.codeType;
    var childTarget = selectObject.childCom;
    iframe.src = "/Windchill/extcore/jsp/common/DGCodeClassfication.jsp?code=" + classification + "&formName=" + formName + "&childTarget=" + childTarget + "&codeType=" + codeType + "&childValue=" + childValue;
}

function selectClassficationByID(parentID, childValue) {
    var selectObject = document.getElementById(parentID);
    var formName = selectObject.form.name;
    var frameName = selectObject.targetFrame;
    var iframe = document.getElementById(frameName);
    var classfication = selectObject.options[selectObject.selectedIndex].value;
    var codeType = selectObject.options[selectObject.selectedIndex].codeType;
    var childTarget = selectObject.childCom;
    iframe.src = "/Windchill/extcore/jsp/common/DGCodeClassfication.jsp?code=" + classfication + "&formName=" + formName + "&childTarget=" + childTarget + "&type=" + codeType + "&chaildValue=" + childValue;
}

function changeApprovalList(oid) {
    approvalWin = window.open("/Windchill/extcore/jsp/worklist/ChangeApprovalList.jsp?oid=" + oid, "결재정보변경", "toolbar=0, status=0, scrollbars=yes, location=0, menubar=0, width=800, height=280");
    approvalWin.focus();
}

function delegateApprove(workOid) {

    var frm = document.forms[0];
    frm.target = "delegateWin";
    frm.action = "/Windchill/extcore/jsp/worklist/DelegateTask.jsp?workOid="+workOid;

    var delegateWin = window.open("", "delegateWin", "toolbar=0, status=0, scrollbars=yes, location=0, menubar=0, width=500, height=200");
    delegateWin.focus();
    frm.submit();
    frm.target = "_blank";
}

function selfClose(){
  self.close();
}

//호기상세에서 작업이력 리스트 팝업 호출
function f_viewCsWorkListPop(serialOid){
    var frm = document.myform;
    var popWidth = "800";
    var popHeight = "600";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;

    frm.target = "cswork_pop";
    frm.action = "/Windchill/extcore/jsp/cswork/ViewADPWorkListBySerialPopup.jsp?serialOid="+serialOid;

    var csWorkPop = window.open("", "cswork_pop", "top=" + mt + " , left=" + ml + " , status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    csWorkPop.focus();
    frm.submit();
    frm.target = "_self";
}

function openSearchECA(serialOid){
    var frm = document.myform;
    var popWidth = "1000";
    var popHeight = "600";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;

    frm.target = "eca_pop";
    frm.action = "/Windchill/extcore/jsp/change/SearchECABySerialPopup.jsp?linkedSerial="+serialOid+"&state=ADP_WORK_COMPLETE";

    var eca_pop = window.open("", "eca_pop", "top=" + mt + " , left=" + ml + " , status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    eca_pop.focus();
    frm.submit();
    frm.target = "_self";
}


/* Tooltip 관련  2011.01.27 jhJeong added*/
/*
var tipwidth='150px' //툴팁 가로사이즈
var tipbgcolor='lightyellow'  //툴팁배경색상
var disappeardelay=250  //마우스아웃시 사라지는 시간설정
var vertical_offset="6px" //기준점에서 하단으로 여백
var horizontal_offset="0px" //기준점에서 좌측 여백


var ie4=document.all
var ns6=document.getElementById&&!document.all

if (ie4||ns6)
  document.write('<div id="fixedtipdiv" style="visibility:hidden;width:'+tipwidth+';background-color:'+tipbgcolor+'" ></div>')
*/

function getposOffset(what, offsettype){
  var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
  var parentEl=what.offsetParent;
  while (parentEl!=null){
    totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
    parentEl=parentEl.offsetParent;
  }
return totaloffset;
}


function showhide(obj, e, visible, hidden, tipwidth){
  if (ie4||ns6)
    dropmenuobj.style.left=dropmenuobj.style.top=-500
  if (tipwidth!=""){
    dropmenuobj.widthobj=dropmenuobj.style
    dropmenuobj.widthobj.width=tipwidth
  }
  if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
    obj.visibility=visible
  else if (e.type=="click")
    obj.visibility=hidden
}

function iecompattest(){
  return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
  var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
  if (whichedge=="rightedge"){
  var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
    dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
  if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
    edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
  }
  else{
  var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
    dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
  if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
    edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
  }
return edgeoffset
}

function fixedtooltip(menucontents, obj, e, tipwidth){
  if (window.event) event.cancelBubble=true
  else if (e.stopPropagation) e.stopPropagation()
    clearhidetip()

    dropmenuobj=document.getElementById? document.getElementById("fixedtipdiv") : fixedtipdiv
    dropmenuobj.innerHTML=menucontents

  if (ie4||ns6){

    showhide(dropmenuobj.style, e, "visible", "hidden", tipwidth)
    dropmenuobj.x=getposOffset(obj, "left")
    dropmenuobj.y=getposOffset(obj, "top")
    dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
    dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
  }
}

function hidetip(e){
  if (typeof dropmenuobj!="undefined"){
  if (ie4||ns6)
    dropmenuobj.style.visibility="hidden"
  }
}

function delayhidetip(){
  if (ie4||ns6)
    delayhide=setTimeout("hidetip()",disappeardelay)
}

function clearhidetip(){
  if (typeof delayhide!="undefined")
    clearTimeout(delayhide)
}

function f_showTooltip(str, obj){
//    fixedtooltip(str, obj, event, '300px');
    obj.title = str.replace("<br>", "\n");
}

function f_hideTooltip(){
    delayhidetip();
}

function viewDisplay(oid) {
    displayWin = window.open("/Windchill/wtcore/jsp/wvs/viewmarkup.jsp?objref=OR:"+oid, "표현목록표시",  "toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=700, height=400");
    displayWin.focus();
}

function UTIL_searchCompany(obj){
	//alert("UTIL_searchCompany");
  if (event.keyCode == 13){
    var fldObject = document.getElementById(obj.name);
    var userName = fldObject.value;
    //var left = window.screenLeft+event.clientX;
    //var top = window.screenTop+event.clientY;
    
//    var height	= screen.height; 
//	var width	= screen.width;
//	var left = width/2 - 1000/2; 
//	var top	= height/2 - 500/2;
	
    var left =  (window.screen.width/2) - (1000/2);
    var top = (window.screen.height/2) - (500/2);
    
    pop = window.open("about:blank","","left="+left+",top="+top+",width=1000,height=500,scrollbars=yes,resizable=yes");
    ///Windchill/extcore/jsp/cpc/admin/searchCompanyPopup.jsp?mode=s
    pop.location.href="/Windchill/extcore/jsp/cpc/admin/searchCompanyPopup.jsp?mode=s&callFlag=srchAppUser&function=addUserToTarget&coName="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  } else {
    return true;
  }
  return false;
}

function UTIL_searchCompanyClick(obj){
	//alert("UTIL_searchCompanyClick");
  //var fldObject = document.getElementById(obj.name);  
  var userName = obj.value;
	
//  var left = window.screenLeft+event.clientX;
//  var top = window.screenTop+event.clientY;
  
  var left =  (window.screen.width/2) - (1000/2);
  var top = (window.screen.height/2) - (500/2);
  var pop = window.open("about:blank","","left="+left+",top="+top+",width=1000,height=500,scrollbars=yes,resizable=yes");
  pop.location.href="/Windchill/extcore/jsp/cpc/admin/searchCompanyPopup.jsp?mode=s&function=addUserToTarget&coName="+userName+"&formName="+obj.form.name+"&target="+obj.name;
  return false;
}
