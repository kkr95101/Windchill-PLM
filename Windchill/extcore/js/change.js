/**
 * 설계변경관련 상세보기 창
 * @param oid
 */
function showChangeDetail(oid) {
    var changeWin;
    if (oid.indexOf("ADPECR") > -1) {
        changeWin = window.open("/Windchill/extcore/jsp/change/DetailECR.jsp?oid=" + oid, "ECR상세정보", "toolbar=0, status=1,resizable=yes, scrollbars=yes, location=0, menubar=0, width=1000, height=1000");
    } else if (oid.indexOf("ADPECO") > -1) {
        changeWin = window.open("/Windchill/extcore/jsp/change/DetailECO.jsp?oid=" + oid, "ECO상세정보", "toolbar=0, status=1,resizable=yes, scrollbars=yes, location=0, menubar=0, width=1000, height=1000");
    } else if (oid.indexOf("ADPECA") > -1) {
        changeWin = window.open("/Windchill/extcore/jsp/change/DetailECA.jsp?oid=" + oid, "ECA상세정보", "toolbar=0, status=1,resizable=yes, scrollbars=yes, location=0, menubar=0, width=1000, height=1000");
    }
    changeWin.focus();
}


/**
 * 첨부파일 추가
 */
function attachFile() {
    var attachTable = document.all.attachTable;
    trObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
    trObjClone = trObj.cloneNode("true");
    trObj.insertAdjacentElement("afterEnd", trObjClone);

    newTrObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
//    newTrObj.style.display = "block";
}

/**
 * 첨부파일 삭제
 */
function delAttachFile() {
    var attachLen = 0;

    if (frm.attachOid.length != undefined) {
        attachLen = document.forms[0].attachOid.length - 1;
    }

    var delOids = document.getElementsByName("attachOid");
    for (i = attachLen; i >= 1; i--) {
        if (frm.chkSECONDARY[i] != undefined && frm.chkSECONDARY[i].checked) {
            document.all.attachTable.deleteRow(i);
        }
    }
}

/**
 * 결재자 정보 Set
 * @param appData
 */
function setAppList(appData) {

    var selectVal = "";
    var selectText = "";
    var data = null;

    var appTypeCode = "";
    var appTypeName = "";

    deleteAppList(frm.approveUserList);
    if(frm.appType){
	    appTypeCode = frm.appType.value + "^";
	    appTypeName = "[" + frm.appType.str + "]";

	    if (f_validAppList(frm.approveUserList, appData)) {

	        if (appData.length > 0) {
	            for (var inx = 0; inx < appData.length; inx++) {
	                selectVal = appTypeCode + appData[inx][0];           //userID
	                selectText = appTypeName + appData[inx][1];          //userName
	                frm.approveUserList.options[frm.approveUserList.length] = new Option(selectText, selectVal);
	                frm.userText.value = appData[inx][1];
	            }

	        }
	    } else {
	        pop.focus();
	        return;
	    }
	}
    pop.close();
}

/**
 * 결재자 추가 시 중복 여부 체크
 * @param obj
 * @param appData
 */
function f_validAppList(obj, appData) {

    var userID = "";
    if (obj.length > 0) {
        for (var inx = 0; inx < obj.length; inx++) {
            userID = f_beforeStr(obj[inx].value, "^");

            for (var jnx = 0; jnx < appData.length; jnx++) {
                if (userID == appData[jnx][0]) {
                    alert(appData[jnx][1] + "은[는] 이미 추가되었습니다.");
                    return false;
                }
            }
        }
    }
    return true;
}

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
 * 사용자 검색
 * @param obj
 */
function searchUser(obj) {
    var fldObject = document.getElementById(obj.name);
    var userName = fldObject.value;
    var left = window.screenLeft + event.clientX;
    var top = window.screenTop + event.clientY;
    pop = window.open("about:blank", "", "left=" + left + ",top=" + top + ",width=700,height=410,scrollbars=yes,resizable=yes");
    pop.location.href = "/Windchill/extcore/jsp/pms/company/selectUserFrm.jsp?mode=s&callFlag=srchAppUser&function=addUserToAPPList&keyvalue=" + userName;
}


// User검색필드 Clear처리
function clearUser(obj) {
	try
	{
		( eval("document."+ obj.form.name + "." + obj.name )).value = "";

	}
	catch(execerr) { alert(execerr) }

	return false;
}


function deleteAppList(obj) {
	if(obj != null){
		if (obj.length > 0) {
			for (var inx = obj.length - 1; inx >= 0; inx--) {
				obj.remove(inx);
			}
		}
	}
}

/**
 * select 된 내역 취소 처리
 * @param obj
 */
function undoSelect(obj) {
    var Form = null;
    if (obj.form == null) {
        alert("<form> 태그가 없습니다.");
        return null;
    } else {
        Form = obj.form;
    }
    var element_len = Form.elements.length;
    for (var i = 0; i < element_len; i++) {
        thisObj = Form.elements[i];
        if (thisObj.tagName.toUpperCase() == 'SELECT') {
            if (thisObj.setType == obj.setType) {
                if (thisObj.name != obj.name) {
                    thisObj.selectedIndex = -1;
                }
            }
        }
    }
}

/**
 * 부품검색창
 * @param multiple
 */
var partPop;
function searchPartPop(selMode, selObj, isModelOnly) {
    var popWidth = "1000";
    var popHeight = "750";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;
    partPop = window.open("about:blank", "부품검색", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    partPop.location.href = "/Windchill/extcore/jsp/part/SearchPartPopup.jsp?selMode=" + selMode+"&selObj="+selObj+"&isModelOnly=" + isModelOnly;
    partPop.focus();
}

/**
 * 결재이력창
 * @param oid
 */
function workHistInfo(oid) {
    var popWidth = "800";
    var popHeight = "500";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;
    histPop = window.open("about:blank", "결재이력", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    histPop.location.href = "/Windchill/extcore/jsp/worklist/WorkHistoryItemPop.jsp?oid=" + oid;
    histPop.focus();
}

/**
 * BOM 검색
 * @param oid
 * @param selMode
 * @param enableState
 */
var bomPop;
function searchBOMInfo(oid, selMode, enableState) {
    var popWidth = "1120";
    var popHeight = "800";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;
    bomPop = window.open("about:blank", "BOM검색", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    bomPop.location.href = "/Windchill/extcore/jsp/bom/BomPartSearchPopup.jsp?oid=" + oid + "&selMode=" + selMode + "&enableState=" + enableState + "&partType=master&excludeStdPart=Y";
    bomPop.focus();
}

/**
 * BOM View 창
 * @param oid
 * @param configView
 */
function viewECOBOMInfo(oid, configView) {
    var popWidth = "1120";
    var popHeight = "800";
    var ml = (screen.availWidth - eval(popWidth)) / 3;
    var mt = (screen.availHeight - eval(popHeight)) / 3;
    bomPop = window.open("about:blank", "BOM검색", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
    bomPop.location.href = "/Windchill/extcore/jsp/bom/BomPartSearchPopup.jsp?oid=" + oid + "&configView=" + configView + "&enableState=VIEW";
    bomPop.focus();
}

function deleteTableRow(tableID, rowIndex){
    var targetTable = document.getElementById(tableID);
    if (targetTable){
        targetTable.deleteRow(rowIndex);
    }
}

/*
 function addPart() {
    var partData = new Array();
    var idx = 0;

    var partOids = document.getElementsByName("prtOid");
    var partNumbers = document.getElementsByName("prtNumber");
    var partNames = document.getElementsByName("prtName");
    var partStates = document.getElementsByName("prtState");
    var partVersions = document.getElementsByName("prtVersion");
    var partCreators = document.getElementsByName("prtCreator");
    var partCreateDates = document.getElementsByName("prtCreateDate");

    for(var i=0;i<partOids.length;i++) {

        var tempArr = new Array();
        tempArr[0] = partOids[i].value;
        tempArr[1] = partNumbers[i].value;
        tempArr[2] = partNames[i].value;
        tempArr[3] = partStates[i].value;
        tempArr[4] = partVersions[i].value;
        tempArr[5] = partCreators[i].value;
        tempArr[6] = partCreateDates[i].value;

        partData[idx++] = tempArr;
    }
    addApprovalPart(partData);
}

*/

function delRelatedPart() {
    var prtLen = document.frm.prtChkBox.length - 1;

    for (var i = prtLen; i >= 1; i--) {
        if (document.frm.prtChkBox[i].checked) {
            document.all.prt_tbl.deleteRow(i + 1);
        }
    }
}