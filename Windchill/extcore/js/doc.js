/*----------------------------------------------------------------------------
 * 수정일      요청자  수정자  수정사유
 *----------------------------------------------------------------------------
 * 2007.09.15  KJK    KJK  New Creating
 *---------------------------------------------------------------------------*/
/*****************************************************************************
 * Title                 : Form Control
 * @author              : jgkim@digiteki.com
 * @date                : 2007.10.15
 * @Description        : Document관련 Javascript
 * @Copyright           : DIGITEKI. Ltd.
 ******************************************************************************/

function parentReload() {
    try {
        opener.parent.document.location.href = opener.parent.document.URL;
    } catch(execerr) {
    }
}
/**
 * 처리중 POP메세지창 OPEN
 */
function showLayer(spanName) {
    var obj = document.getElementById(spanName);
    visible = (obj.style.display != "none")
    if (visible) {
        obj.style.display = "none";
    } else {
        obj.style.display = "inline";
    }
}

/**
 * 일반 Window OPEN
 */
function openWindow(url, width, height) {
    var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
    var leftpos = (screen.width - width) / 2;
    var toppos = (screen.height - height) / 2 ;
    var rest = "width=" + width + ",height=" + height + ",left=" + leftpos + ',top=' + toppos;
    var optstr = opts + rest;
    var newwin = window.open(url, "openwin", opts + rest);
    newwin.focus();
}


/**
 * 진행중 Layout 종료
 */
function closeProcess() {
    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2');
    div1.style.display = "none";
    div2.style.display = "none";
}

/**
 * 관련문서 Row제거
 */
function delRelatedDoc() {
    var docLen = document.myform.docOid.length - 1;
    var delOids = document.getElementsByName("docOid");

    for (i = docLen; i >= 1; i--) {
        if (document.myform.checkDocOid[i].checked) {
            document.all.docTable.deleteRow(i + 1);
        }
    }
}

/**
 * Process보기창 OPEN
 */
function openProcess(url)
{
    window.open(url, "", "toolbar=no, height=540, width=700, resizable=yes")
}

//", " ==> " : " 치환
function v_replace(data){
    if (data == null)
        return "";
    data = data.replace(/●/gi, "'");
    data = data.replace(/★/gi, "\"");
    data = data.replace(/◆/gi, "\r");
    data = data.replace(/◆/gi, "\n");

    return data;
}

//문서 유형 선택 팝업 오픈
function openDocTypePop(mm_idx){
    var popWidth = "670";
    var popHeight = "287";
    var ml = (screen.availWidth - eval(popWidth))/3;
    var mt = (screen.availHeight - eval(popHeight))/3;
    menuFrm.target = "DOC_TYPE_POP";
    menuFrm.action = "/Windchill/extcore/jsp/document/SearchDocTypePopup.jsp";
    var popWin = window.open("","DOC_TYPE_POP","top=" + mt + " , left=" + ml + " , status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=0,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    popWin.focus();
    menuFrm.submit();
    menuFrm.target = "_self";
}

//file 첨부 추가
function attachFile() {
    var attachTable = document.all.attachTable;
    trObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
    trObjClone = trObj.cloneNode("true");
    trObj.insertAdjacentElement("afterEnd", trObjClone);

    newTrObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
//    newTrObj.style.display = "block";
}

//file 첨부 삭제
function delAttachFile() {
    var attachLen = 0;

    if(frm.attachOid.length != undefined){
        attachLen = document.frm.attachOid.length-1;
    }

    var delOids = document.getElementsByName("attachOid");
    for (i = attachLen; i >= 1; i--) {
        if (frm.chkSECONDARY[i] != undefined && frm.chkSECONDARY[i].checked) {
            document.all.attachTable.deleteRow(i);
        }
    }
}

// User검색필드 POPUP처리
function f_searchUser(obj){
    var fldObject = document.getElementById(obj.name);
    var userName = fldObject.value;
    var left = window.screenLeft + 25;
    var top = window.screenTop + 10;
    pop = window.open("about:blank","","left="+left+",top="+top+",width=750,height=450,scrollbars=yes,resizable=yes");
    pop.location.href="/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&function=addUserToTarget&keyvalue="+userName+"&formName="+obj.form.name+"&target="+obj.name;
    
  return false;
}

//문서 상세
function f_viewDocObj(oid) {

    var popWidth = "950";
    var popHeight = "750";
    var ml = window.screenLeft + 25;
    var mt = window.screenTop + 10;

    frm.target = "doc_pop";
    if(oid.indexOf("ADPGeneralDoc") > -1){
        frm.action = "/Windchill/extcore/jsp/document/ViewGeneralDocPopup.jsp?docOid="+oid;
    }else{
        frm.action = "/Windchill/extcore/jsp/document/ViewTechReportDocPopup.jsp?docOid="+oid;
    }

    var docPop = window.open("", "doc_pop", "top=" + mt + " , left=" + ml + " , status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    docPop.focus();
    frm.submit();
    frm.target = "_self";
}

//문서 변경 이력 팝업
function f_viewDocHist(oid){
    var width = 500;
    var height = 350;
    var ml = window.screenLeft + 25;
    var mt = window.screenTop + 10;
    var url = "/Windchill/extcore/jsp/document/ViewGeneralDocHistPopup.jsp?docOid="+oid;
    var docHistPop = window.open(url, "v_docHist", "top=" + mt + " , left=" + ml + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=" + width + ",height=" + height + ",resizable=no");
    docHistPop.focus();
}


//프로젝트 검색 팝업
function f_searchProjectPop(pjtName, selMode){
    var width = 850;
    var height = 700;
    var ml = window.screenLeft + 25;
    var mt = window.screenTop + 10;

    var url = "/Windchill/extcore/jsp/project/PrjSearchPop.jsp?selMode="+selMode+"&prjName="+pjtName;
    srchPjtPop = window.open(url, "open_window", "top=" + mt + " , left=" + ml + " , scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=" + width + ",height=" + height + ",resizable=yes");
    srchPjtPop.focus();
}

//프로젝트 정보 받기
function setPrjInfo(pjtData){
    if(frm.pjtName != undefined && frm.pjtOid != undefined){
        frm.pjtName.value = pjtData[0][6];
        frm.pjtOid.value = pjtData[0][0];
    }else if(frm.s_pjtName != undefined && frm.s_pjtOid != undefined){
        frm.s_pjtName.value = pjtData[0][6];
        frm.s_pjtOid.value = pjtData[0][0];
    }

    if(frm.customer != undefined){
        for(var inx=0; inx<frm.customer.length; inx++){
            if(frm.customer[inx].value == pjtData[0][7]){
                frm.customer[inx].selected = true;
                frm.customer.disabled = true;
                break;
            }
        }
    }

    srchPjtPop.close();
}

//프로젝트 상세
function f_viewProject(oid) {
    width = screen.availWidth * 3 / 4;
    height = screen.availHeight * 8 / 10;
    var ml = window.screenLeft + 25;
    var mt = window.screenTop + 10;

    var url = "/Windchill/extcore/jsp/project/PrjInfoFrame.jsp?oid=" + oid;
    prjWin = window.open(url, "window", "top=" + mt + " , left=" + ml + " , scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=" + width + ",height=" + height + ",resizable=yes");
    prjWin.focus();
}

/**
 * 결재이력창
 * @param oid
 */
function f_VersionedAppHist(oid) {
    var popWidth = "1000";
    var popHeight = "800";
    var ml = window.screenLeft + 25;
    var mt = window.screenTop + 10;
    histPop = window.open("about:blank", "결재이력", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    histPop.location.href = "/Windchill/extcore/jsp/worklist/VersionedWorkHistoryItemPop.jsp?oid=" + oid;
    histPop.focus();
}

function getXMLHttpRequest(){
  if(window.ActiveXObject){
    try{
      return new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e){
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }catch(e1){
        return null;
      }
    }
  }else if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }else{
    return null;
  }
}

var httpRequest = null;
function sendRequest(url, params, callback, method){
  httpRequest = getXMLHttpRequest();
  var httpMethod = method ? method : 'GET';

  if(httpMethod != 'GET' && httpMethod != 'POST'){
    httpMethod = 'GET';
  }

  var httpParams = (params == null || params == '') ? null : params;
  var httpUrl = url;

  if(httpMethod == 'GET' && httpParams != null){
    httpUrl = httpUrl + "?" + httpParams;
  }

  httpRequest.open(httpMethod, httpUrl, true);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.onreadystatechange = callback;
  httpRequest.send(httpMethod == 'POST' ? httpParams : null);
}

//공백 치환
function f_Replace(val){
  val = val.replace(/\s/g, "");
  return val;
}

//Site에 해당하는 location
function f_searchLocation(site, childObj, isSelected){
    if(!isNull(site)){
        frm.target = "tpFrame";
        frm.action = "/Windchill/extcore/jsp/ccm/searchLocation.jsp?site="+site+"&childObj="+childObj+"&isLocSelected="+isSelected;
        frm.submit();
    }else{
        var obj = eval("frm." + childObj);
        for(var inx=obj.length; inx>0; inx--){
            obj.remove(inx);   //기존 location 정보 삭제
        }
    }
}

//숫자 & tab 허용
function f_NumObj(){
    if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 9) {
        return true;
    } else {
        event.returnValue = false;
    }
}

function appSearchUser(){
  if (event.keyCode == 13){
    f_srchUser('app', frm.appObj);
  }
}

function setAppParticipant(mainAppListData, actAppListData, refAppListData){
  // Remove
  setAppParticipantRemove();
  
  // 검토자 or 의뢰 검토자 
  if(mainAppListData.length > 0){
    var mainAppListSel = document.frm.mainAppList;
    for(var i = 0; i < mainAppListData.length; i++){
      var op = document.createElement("option");
      op.value = mainAppListData[i][0];
      op.text = mainAppListData[i][1];
      mainAppListSel.add(op);
    }
  }
  // 승인자 or 의뢰 승인자 
  if(actAppListData.length > 0){
    var actAppListSel = document.frm.actAppList;
    for(var i = 0; i < actAppListData.length; i++){
      var op = document.createElement("option");
      op.value = actAppListData[i][0];
      op.text = actAppListData[i][1];
      actAppListSel.add(op);
    }
  }
  // 접수자 or 배포자 
  if(refAppListData.length > 0){
    var refAppListSel = document.frm.refAppList;
    for(var i = 0; i < refAppListData.length; i++){
      var op = document.createElement("option");
      op.value = refAppListData[i][0];
      op.text = refAppListData[i][1];
      refAppListSel.add(op);
    }
  }
  try{
    appPop.close();
  }catch(e){
    
  }
}

function setAppParticipantRemove(){
  var mainAppList = document.frm.mainAppList;
  var actAppList = document.frm.actAppList;
  var refAppList = document.frm.refAppList;
  if(mainAppList.length > 0){
        for(var inx=mainAppList.length-1; inx>=0; inx--){
          mainAppList.remove(inx);
        }
    }
  if(actAppList.length > 0){
        for(var inx=actAppList.length-1; inx>=0; inx--){
          actAppList.remove(inx);
        }
    }
  if(refAppList.length > 0){
        for(var inx=refAppList.length-1; inx>=0; inx--){
          refAppList.remove(inx);
        }
    }
}

function handlerNum(obj) 
{

    e = window.event; //윈도우의 event를 잡는것입니다. 그냥 써주심됩니당.
    //숫자열 0 ~ 9 : 48 ~ 57, 키패드 0 ~ 9 : 96 ~ 105 ,8 : backspace, 46 : delete -->키코드값을 구분합니다. 저것들이 숫자랍니다.

    if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8 || e.keyCode == 46)
    {
        if(e.keyCode == 48 || e.keyCode == 96)//0을 눌렀을경우
        {
            if(obj.value == "0" ){ // 0이 입력된 후 0을 눌렀을경우 ex > 00
                e.returnValue=false; //-->입력되지않는다.
            }else{ //다른숫자뒤에오는 0은
                return; //-->입력시킨다.
            }
        }

        else return; 

    }

    else e.returnValue=false;

}

function etcDisabledEvt(isEtc){
  document.frm.engineEtc.value = "";
  if("000" == isEtc.toUpperCase()){
    document.frm.engineEtc.disabled = "";
  }else{
    document.frm.engineEtc.disabled = "disabled";
  }
  
}

function addDocs(target) {
    var docOids = document.getElementsByName("dOid");
    var docNumbers = document.getElementsByName("dNumber");
    var docNames = document.getElementsByName("dName");
    var docVersions = document.getElementsByName("dVersion");
    var docStates = document.getElementsByName("dState");
    var selectedDocs = document.getElementsByName("checkDocOid");
    var docCreator = document.getElementsByName("dCreator");
    var docCreateDate = document.getElementsByName("dCreateDate");

    var count = 0;
    for(var i=0;i<selectedDocs.length;i++) {
        if(selectedDocs[i].checked) {
            count++;
        }
    }
    if(count == 0) {
        alert("문서를 하나이상 선택하세요.");
        return;
    }

    var docData = new Array();
    var idx = 0;
    for(var i=0;i<selectedDocs.length;i++) {
        if(selectedDocs[i].checked) {
            var duplicate = true;
            var tempArr = new Array();
            tempArr[0] = docOids[i].value;
            tempArr[1] = docNumbers[i].value;
            tempArr[2] = docNames[i].value;
            tempArr[3] = docVersions[i].value;
            tempArr[4] = docStates[i].value;
            tempArr[5] = docCreator[i].value;
            tempArr[6] = docCreateDate[i].value;

            docData[idx++] = tempArr;
        }
    }
    parent.opener.addDoc(docData, target);
}

function getToday(){
  var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  var today = new Date(year, mon, day);
  return today;
}

function trim(str){
  str = str.replace(/(^\s*)|(\s*$)/g, "");
  return str;
}

function enterSearch() {
    var objElement;
    if( event.type == "keydown" && event.keyCode==13 ){
        objElement = window.event.srcElement;
        if (objElement.name != "creator" && objElement.name != "modifier"){
          searchEvt();
        }
    }
}
function cancelEvt(docOid){
  if(confirm("의뢰요청을 취소 하시겠습니까?")){
    var element = document.getElementById("cancelFrame");
    element.src = "/Windchill/extcore/jsp/document/requestCanceledAction.jsp?docOid=" + docOid;
  }
}

function ParentStyleHeightDoc(count){
   parent.setSearchStylehheight(count);
   searchEvt();
}

function printEvt(){
  if(confirm("출력 화면으로 이동 하시겠습니까?")){
    var x = document.documentElement.clientWidth;
    var y = document.documentElement.clientHeight;
    
    window.open("/Windchill/extcore/jsp/document/docViewPrint.jsp", "", "scrollbars=yes, resizable=yes, manubar=yes, toolbar=yes, width="+x+"px, height="+y+"px");
  }
}

