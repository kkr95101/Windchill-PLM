//Project Info 팝업
function viewProjectMaster(projectMasterOid) {
    var url = "/Windchill/servlet/dgt/project/controller/viewProjectTab";
    url = url + "?projectMasterOid=" + projectMasterOid;
    popupCenter(url, "", "1280", "800", "yes");
}
//Project Info 팝업
function viewPreProjectMaster(projectMasterOid) {
	var url = "/Windchill/servlet/dgt/project/controller/viewPreProjectTab";
	url = url + "?projectMasterOid=" + projectMasterOid;
	popupCenter(url, "", "1150", "800", "yes");
}

function viewProject(projectOid) {
    var url = "/Windchill/servlet/dgt/project/controller/viewProjectTab";
    url = url + "?projectOid=" + projectOid;
    popupCenter(url, "projectTab", "1150", "800", "yes");
}   

/**
 * 프로젝트승인원 상세보기
 */
 function viewApprovalDoc(approvalDocOid) {
     var url = "/Windchill/servlet/dgt/project/controller/viewApprovalDoc";
     url = url + "?approvalDocOid=" + approvalDocOid;
     url = url + "&oid=" + approvalDocOid;
     popupCenter(url, "approvalDoc", "900", "700", "yes");
 }
//회의록 info
 function viewMinutes(minutesOid) {
     var url = "/Windchill/servlet/dgt/project/controller/viewMinutes";
     url = url + "?minutesOid=" + minutesOid;
     popupCenter(url, "minutes", "1150", "800", "yes");
 }   

function viewOpenIssueInfo(openIssueOid){
    var url = "/Windchill/servlet/dgt/openIssue/controller/viewOpenIssue";
    url = url + "?oid=" + openIssueOid;
    popupCenter(url, "openIssue", "900", "700", "yes");    
}

function viewIssueResultInfo(oid){
    var url = "/Windchill/servlet/dgt/openIssue/controller/viewIssueResult";
    url = url + "?oid=" + oid;
    popupCenter(url, "issueResult", "900", "700", "yes");    
}


//Template Info 팝업
function viewTemplateInfo(projectOid) {
    var url = "/Windchill/servlet/dgt/project/controller/viewTemplateTab";
    url = url + "?projectOid=" + projectOid;
    popupCenter(url, "templateTab", "1070", "800", "yes");
}

function viewTaskInfo(taskOid) {
    var url = "/Windchill/servlet/dgt/project/controller/viewTaskActivity";
    url = url + "?taskOid=" + taskOid;
    var popName = popupCenter(url, "viewTaskActivityPopup", "900", "800", "yes");
    popName.dialogArguments = window;
    popName.focus();
}

function viewTemplateTaskInfo(taskOid) {
    var url = "/Windchill/servlet/dgt/project/controller/viewTemplateTaskActivity";
    url = url + "?taskOid=" + taskOid;
    var popName = popupCenter(url, "viewTemplateTaskActivityPopup", "900", "700", "yes");
    popName.dialogArguments = window;
    popName.focus();
}

function getDefaultValue(str, def){
    var defValue = null;
    if (typeof def == "undefined"){
        defValue = '';
    }else{
        defValue = def;
    }
    
    if (typeof str == "undefined"){
        return defValue;
    }else if (str == null) {
        return defValue;
    }else{
        return str;
    }
}

function change_selected_color(o) {
    o.style.color = o.children[o.selectedIndex].style.color;
}

function link_sort(a,b,order){

    var n = a.replace(/ /g, '');
    n = n.substring(0, n.indexOf("</a>"));
    n = n.substring(n.lastIndexOf(">")+1);

    var m=b.replace(/ /g, '');
    m = m.substring(0, m.indexOf("</a>"));
    m = m.substring(m.lastIndexOf(">")+1);
    
    if(order=="asc")
        return n>m?1:-1;
    else
        return n<m?1:-1;
};
