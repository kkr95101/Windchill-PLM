/*----------------------------------------------------------------------------
 * �����     ��껌�� ����� ����ъ�
 *----------------------------------------------------------------------------
 * 2007.09.15  KJK    KJK  New Creating
 *---------------------------------------------------------------------------*/
/*****************************************************************************
 * Title                 : worklist.js
 * @author               : jgkim@digiteki.com
 * @date                 : 2007.10.15
 * @Description          : 寃곗� 怨듯�
 * @Copyright            : DIGITEKI. Ltd.
 ******************************************************************************/
var pop;
var approveTypeVal="";

function approvalHistory(docOid){
	var left = (screen.width/2)-(800/2);
	var top = (screen.height/2)-(600/2);
    var url = "/Windchill/extcore/jsp/worklist/ApprovalHistory.jsp?oid="+docOid;
    approvalHistoryPop = window.open(url, "ApproveDoc", "left=" + left + ", top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=800, height=600");
    approvalHistoryPop.focus();
}

function searchAppParticipant(type){
	var left = (screen.width/2)-(800/2);
	var top = (screen.height/2)-(600/2);
  var url = "/Windchill/extcore/jsp/worklist/ApproveLineSave.jsp?approveLineType=" + type;
  try{
  	approvelinePop = window.open(url, "approvelinePop", "left=" + left + ", top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=800, height=600");
	approvelinePop.focus();
  }catch(e){
  }
}

//User寃����� POPUP泥�━
function addApproveUser(approveType, obj, mode) {
	approveTypeVal = approveType;
	goSearchUser(obj, mode);
}

//User寃����� POPUP泥�━
function goSearchUser(obj, mode) {
	var fldObject = document.getElementById(obj.name);
	var userName = escape(encodeURIComponent(fldObject.value));
//	var leftPos = window.screenLeft + event.clientX;
//	var topPos = window.screenTop + event.clientY;
	var isDisable ="YES";
    var popWidth = 750;
    var popHeight = 550;
	var height	= screen.height; 
	var width	= screen.width;
	var leftPos = width/2 - popWidth/2; 
	var topPos	= height/2 - popHeight/2;
	if(leftPos<0) leftpos=0;
	if(topPos<0) toppos=0;
	pop = window.open("about:blank", "searchUser", "left=" + leftPos + ",top=" + topPos + ",width="+popWidth+",height="+popHeight+",scrollbars=yes,resizable=yes");
	pop.location.href = "/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=" + mode + "&keyvalue=" + userName + "&isDisable="+isDisable;	
}

function setApproveUser(appData) {
	var frm = document.forms[0];	
	var resultTable = document.getElementById(approveTypeVal);
	var selMode = "";
	var roleText = "";
	var childtbodyList = resultTable.getElementsByTagName("tbody");
	var childtbody = childtbodyList[0];
	var bodyTr ;
	var bodyTd ;
	var chkValue;
	
	var appType = "";
	var roleLan_1 = "";
	var roleLan_2 = "";
	var optFalg = true;
	if (document.getElementById('appType') != null && document.getElementById('appType').value != "" ) {
		appType = document.getElementById('appType').value // Only Document Type19
		if ('TYPE19' == appType) { // Only Document Type19
			if (document.getElementById('roleLan_1') == null || document.getElementById('roleLan_1').value == "" ){
				optFalg = false;
			} else {
				roleLan_1 = document.getElementById('roleLan_1').value // 寃��
				roleLan_2 = document.getElementById('roleLan_2').value // �����
			}
		}
	}
	
	var reviewerChk = true;
	var reviewerDueChk = true;
//	alert(approveTypeVal);
	if ( approveTypeVal.indexOf("REVIEW_") > -1 ) {
		selMode = frm.reviwerType.options[frm.reviwerType.selectedIndex].getAttribute('selMode');
		roleText = frm.reviwerType.options[frm.reviwerType.selectedIndex].text;
		if (appData.length > 0) {
			for ( var inx = 0; inx < appData.length; inx++) {
				if ( createUser == appData[inx][0]){
					reviewerChk = false;
				}
				
				var userId = appData[inx][0] + "";				
				var reviewerTable = document.getElementById("reviewerTable");		
				var childTrNodes = reviewerTable.getElementsByTagName("tr");
				var childTr ;
				var uid ;
				for( var i =0; i < childTrNodes.length ;i++ ){
					childTr = childTrNodes[i];
					uid = childTr.getAttribute("id");
					if ( uid != null ) {
						if ( uid == userId) {
							reviewerDueChk = false;
						}
					}					
				}
			}
		}
	}
	else {
		selMode = frm.approveType.options[frm.approveType.selectedIndex].getAttribute('selMode');
		roleText = frm.approveType.options[frm.approveType.selectedIndex].text;		
	}
	
	if ('TYPE19' == appType) { // Only Document Type19
		selMode = 'm'; // 寃�� 蹂듭�.
	}
	if( reviewerChk && reviewerDueChk ){
		if (f_validAppList(resultTable, appData) && f_validSelMode(resultTable, roleText, selMode)) {
			if (appData.length > 0) {
				
				for ( var inx = 0; inx < appData.length; inx++) {
					chkValue = approveTypeVal +"^" +appData[inx][0];
					
					bodyTr = childtbody.appendChild( document.createElement( "tr" ) );
					bodyTr.setAttribute( "id" , appData[inx][0] );
					
					if ('TYPE19' == appType && optFalg) { // Only Document Type19

						bodyTd = bodyTr.appendChild( document.createElement( "th" ) );
						bodyTd.setAttribute( "align" , "center" );
						bodyTd.setAttribute( "width" , "25%" );
						bodyTd.className = "ellipsis";
						bodyTd.style.textAlign="center";
						
//						bodyTd.innerText = "寃��";
						bodyTd.innerText = roleLan_1;
						if ( approveTypeVal.indexOf("REFERENCE") > -1 ) {
//							bodyTd.innerText = "�����;
							bodyTd.innerText = roleLan_2;
							if (document.getElementById('DG_REFERENCE') != null) {
								document.getElementById('DG_REFERENCE').style.display = 'inline';
							}
							
						}
							
					}
					
					bodyTd = bodyTr.appendChild( document.createElement( "td" ) );
					bodyTd.setAttribute( "align" , "center" );
					bodyTd.setAttribute( "width" , "94%" );
					bodyTd.className = "ellipsis";
					bodyTd.style.textAlign="left";
					bodyTd.innerHTML = "<input type='hidden' name='approvalChk' value='"+chkValue+"' /><nobr>"+appData[inx][1]+" ["+appData[inx][2]+"]"+ "</nobr>";
					
					bodyTd = bodyTr.appendChild( document.createElement( "td" ) );
					bodyTd.setAttribute( "align" , "center" );
					bodyTd.setAttribute( "width" , "100" );
					bodyTd.className = "ellipsis";
					bodyTd.style.textAlign="center";
					bodyTd.innerHTML = "<a href='#' onclick='f_deleteAppList(); return false;' >" 
						+ "<img src='/Windchill/extcore/images/del.gif' border='0'></a>"; 
					
				}
				frm.userText.value = "";
			}   
		} 	
	}
	else {
		if ( ! reviewerChk ) {
//			alert("������ 寃�� ��껌��� �ㅼ�媛���������.");			
		}
		else if ( ! reviewerDueChk) {
//			alert("���ъ���� �щ� 寃�� ��껌��� �ㅼ�媛���������.");
		}
	}

	pop.close();
}

/**
 * 寃곗���異�� ��以�났 �щ� 泥댄�
 * @param obj
 * @param appData
 */
function f_validAppList(obj, appData) {

	var resultTable = obj;  		
	var childTrNodes = resultTable.getElementsByTagName("tr");
	var childTr ;
	var uid ;
	
	var dupliMsg = " has already been added.";
	if (document.getElementById('dupliMsg') != null && document.getElementById('dupliMsg').value != "" ) {
		dupliMsg = document.getElementById('dupliMsg').value // multi language
	}
	
	for( var i =0; i < childTrNodes.length ;i++ ){
		childTr = childTrNodes[i];
		uid = childTr.getAttribute("id");
		for ( var jnx = 0; jnx < appData.length; jnx++) {
			if (uid == appData[jnx][0]) {				
//				alert(appData[jnx][1] + "���� �대� 異������듬���");
				alert(appData[jnx][1] + dupliMsg);
				return false;
			}
		}	  
	}
	return true;
}

/**
 * 寃곗���異�� ���⑥� 寃곗����щ� 泥댄�
 * @param obj
 * @param appData
 */
function f_validSelMode(obj, roleText, selMode) {

	var onlyMsg = " Only one person specify";
	if (document.getElementById('onlyMsg') != null && document.getElementById('onlyMsg').value != "" ) {
		onlyMsg = document.getElementById('onlyMsg').value // multi language
	}
	
	var resultTable = obj;  		
	var childTrNodes = resultTable.getElementsByTagName("tr");
	if (selMode == 's' && childTrNodes.length > 0){
//		alert(roleText +"����1紐�� 吏������������.");
		alert(roleText + onlyMsg);
		return false;
	}
	
	return true;
}


/**
 * 援щ���湲곗� ��臾몄���由ы�
 * @param str
 * @param delim
 */
function f_beforeStr(str, delim) {
	var rtn = "";
	if (!isNull(str)) {
		if (str.indexOf(delim) > -1) {
			rtn = str.substring(str.indexOf(delim) + 1, str.length);
		} else {
			rtn = str;
		}
	}
	return rtn;
}

/**
 * 援щ���湲곗� ��臾몄���由ы�
 * @param str
 * @param delim
 */
function f_afterStr(str, delim) {
	var rtn = "";
	if (!isNull(str)) {
		if (str.indexOf(delim) > -1) {
			rtn = str.substring(0, str.indexOf(delim));
		} else {
			rtn = str;
		}
	}
	return rtn;
}

/**
 * 寃곗������
 * @param obj
 */
function f_deleteAppListAll() {
	var targetTableNodes = document.querySelectorAll(".approvalTable");
	var targetTable;
	var childtbody;

	document.forms[0].userText.value = '';
	for( var i =0; i < targetTableNodes.length ;i++ ){
		targetTable = targetTableNodes[i];
		childtTrList = targetTable.getElementsByTagName("tr");

		for(var inx=childtTrList.length-1; inx >=0; inx--){
			targetTable.deleteRow(inx);
		}
	}
	$("#approvalStr").val("");
}
/**
 * ecr ��껌援щ� 怨��, 寃곗������(only GMB ecr)
 */
function f_deleteAppListAll2() {
	var targetTableNodes = document.querySelectorAll(".approvalTable2");
	var targetTable;
	var childtbody;

	document.forms[0].userText2.value = '';
	for( var i =0; i < targetTableNodes.length ;i++ ){
		targetTable = targetTableNodes[i];
		childtTrList = targetTable.getElementsByTagName("tr");

		for(var inx=childtTrList.length-1; inx >=0; inx--){
			targetTable.deleteRow(inx);
		}
	
	}	  
}

/**
 * 寃곗������
 * @param obj
 */
function f_deleteAppList(){
	var lo_this       = window.event.srcElement; // �대깽�멸� 諛����媛�껜媛�� ���ш린��踰�� �닿�吏�
	var lo_table      = lo_this.parentNode.parentNode.parentNode.parentNode  //踰���쇰� 遺�� ��� 4踰�㎏ 媛�껜�����釉��吏�
	var li_row_index  = lo_this.parentNode.parentNode.parentNode.rowIndex; // 踰���쇰� 遺�� ��� 2踰�㎏��� TR �닿�吏�洹�TR ��INDEX 媛�
	lo_table.deleteRow(li_row_index); // �����李얠� �몃��ㅼ� �대���� TR ��������...
	
	
	// For GMB Doc only
	var checkInputValue = "false";
	if ('TYPE19' == document.getElementById('appType').value) { // Only Document Type19
		var approvalChkObj   = document.getElementsByName("approvalChk" );
		for (var i = 0; i < approvalChkObj.length; i++) {
			var approveUserValue = approvalChkObj[i].value;
        	var approve_data = approveUserValue.split("^");
			var approveRole = approve_data[0];
//        	alert(approveRole);
            if(approveRole=="DG_REFERENCE"){
            	checkInputValue = "true";
            	break;
            }  
		}
		if ( checkInputValue=="false" ) {
			document.getElementById('DG_REFERENCE').style.display = 'none';
		} 
	}
	// GMB Doc end
	
}


/**
 * �ㅽ�留�媛�껜��硫����異��
 */
String.prototype.trim = function(str) {
	str = this != window ? this : str;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

function isNull(str) {
	if( trim(str) == "" ){
		return true;
	}
	return false;
}

function trim( str ) {
	str = new String(str);
	return str.trim();
}

function setAppParticipant(type, appData){
	// Remove
	
	var frm = document.forms[0];
	var approveType;
	var resultTable;
	var childtbodyList ;
	var childtbody ;
	var bodyTr ;
	var bodyTd ;
	var chkValue ;

//	var appType = "";
//	if (document.getElementById('appType') != null && document.getElementById('appType').value != "" ) {
//		appType = document.getElementById('appType').value // Only Document Type19
//	}
	
	var roleLan_1 = "";
	var roleLan_2 = "";
	
	if ('TYPE19' == type) { // Only Document Type19
		roleLan_1 = document.getElementById('roleLan_1').value // 寃��
		roleLan_2 = document.getElementById('roleLan_2').value // �����
	}
	
	f_deleteAppListAll();
	
	if (appData.length > 0) {
		for ( var inx = 0; inx < appData.length; inx++) {
			resultTable = document.getElementById(appData[inx][0]);			
			childtbodyList = resultTable.getElementsByTagName("tbody");
			childtbody = childtbodyList[0];
			
			chkValue = appData[inx][1];

			bodyTr = childtbody.appendChild( document.createElement( "tr" ) );
			bodyTr.setAttribute( "id" , appData[inx][0] );
			
			if ('TYPE19' == type) { // Only Document Type19

				bodyTd = bodyTr.appendChild( document.createElement( "th" ) );
				bodyTd.setAttribute( "align" , "center" );
				bodyTd.setAttribute( "width" , "25%" );
				bodyTd.className = "ellipsis";
				bodyTd.style.textAlign="center";
//				bodyTd.innerText = "寃��";
				bodyTd.innerText = roleLan_1;
				if ( appData[inx][0].indexOf("REFERENCE") > -1 ) {
//					bodyTd.innerText = "�����;
					bodyTd.innerText = roleLan_2;
					if (document.getElementById('DG_REFERENCE') != null) {
						document.getElementById('DG_REFERENCE').style.display = 'inline';
					}
					
				}
					
			}

			bodyTd = bodyTr.appendChild( document.createElement( "td" ) );
			bodyTd.setAttribute( "align" , "center" );
			bodyTd.setAttribute( "width" , "95%" );
			bodyTd.className = "ellipsis";
			bodyTd.style.textAlign="left";
			bodyTd.innerHTML = "<input type='hidden' name='approvalChk' value='"+chkValue+"' /><nobr>"+appData[inx][2] + "</nobr>";

			bodyTd = bodyTr.appendChild( document.createElement( "td" ) );
			bodyTd.setAttribute( "align" , "center" );
			bodyTd.setAttribute( "width" , "100" );
			bodyTd.className = "ellipsis";
			bodyTd.style.textAlign="center";
			bodyTd.innerHTML = "<a href='#' onclick='f_deleteAppList(); return false;' >" 
				+ "<img src='/Windchill/extcore/images/del.gif' border='0'></a>"; 

		}
		frm.userText.value = "";
	}   

	try{
		approvelinePop.close();
	}catch(e){

	}
}

