var doc = {
	FORM_ACTION : "/Windchill/servlet/ext/DocAction",
	PRIMARY_TAG : "<input type=\"file\" name=\"primaryID\" class=\"Ltext\" id=\"input3\" style=\"width:100%; background-color: white; cursor:hand;\"/>",
	isNotNull : function(value){
		var result = true;
		if(value == ""){
			result = false;
		}else if(value == null){
			result = false;
		}else if(value == "null"){
			result = false;
		}
		return result;
	},
	isNull : function(value){
		var result = false;
		if(value == ""){
			result = true;
		}else if(value == null){
			result = true;
		}else if(value == "null"){
			result = true;
		}
		return result;
	},
    openFixWindow : function(url, width, height, name){
        var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
        var leftpos = (screen.width - width) / 2;
        var toppos = (screen.height - height) / 2 ;
        var rest = "width=" + width + ",height=" + height + ",left=" + leftpos + ',top=' + toppos;
        var optstr = opts + rest;
        var newwin = window.open(url, name, opts + rest);
        newwin.focus();
    },
    openWindow : function(url){
    	var width = 1090;
    	var height = 650; 
    	var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=1,resizable=1,";
    	var leftpos = (screen.width - width) / 2;
    	var toppos = (screen.height - height) / 2 ;
    	var rest = "width=" + width + ",height=" + height + ",left=" + leftpos + ',top=' + toppos;
    	var optstr = opts + rest;
    	var newwin = window.open(url, "openWin", opts + rest);
    	newwin.focus();
    },
    addType : function(){
    	var form = document.frm;
    	var majorOid = form.majorCode.value;
    	var subOid = form.subCode.value;
    	var typeOid = form.typeCode.value;
    	
    	if(this.isNull(majorOid)){
    		alert("대분류를 선택하세요");
    		form.majorCode.focus();
    	}else if(this.isNull(subOid)){
    		alert("중분류를 선택하세요");
    		form.subCode.focus();
    	}else if(this.isNull(typeOid)){
    		alert("소분류를 선택하세요");
    		form.typeCode.focus();
    	}else{
    		form.action = this.FORM_ACTION;
    		form.target = "actionFrame";
    		form.method = "post";
    		form.submit();
    	}
    	
    },
    setTemplateDownloadUrl : function(values){
    	// (DGDocTypeOid | DGDocumentOid)
    	var oid = values.split("|");
    	var holderOid = oid[1];
    	document.frm.templateLink.value = "/Windchill/servlet/AttachmentsDownloadDirectionServlet?oid=" + holderOid;
    },
    tempateDownload : function(value){
    	if(this.isNotNull(value)){
    		document.all.templateDownLoadFrame.src = value;
    	}
    },
    fileDownload : function(oid){
    	if(this.isNotNull(oid)){
    		document.all.fileDownLoadFrame.src = "/Windchill/servlet/AttachmentsDownloadDirectionServlet?oid=" + oid;
    	}
    },
    createDocEvt : function(mode){
    	var modelOid = document.frm.partOid.value;
    	var iframe = document.getElementById("hidden_frame");
    	iframe.src = "stateChangeAction.jsp?modelOid=" + modelOid + "&mode=" + mode;
    },
    createDocSubmit : function(mode){	// CreateDGDoc.jsp Form Submit
    	var f = document.frm;
    	frm.mode.value = frm.mode.value + "_" + mode;
    	if(this.isNull(f.docName.value)){
    		alert("문서명은 필수 값 입니다.");
    		f.docName.focus();
    	}else{
            //SLB('/Windchill/extcore/images/jloading.png','image',false);
            showProcessingstatus(128,80);
            document.getElementById("LdivButton").style.visibility="hidden";
    		f.action = this.FORM_ACTION;
    		f.method = "post";
            f.target ="hidden_frame";
    		f.submit();
    	}
    },
    setTypeValue : function(values){	// CreateDGDoc.jsp Type Setting
    	var oid = values.split("|");
    	var majorCode = "";
    	var subCode = "";
    	var typeCode = "";
    	if(oid.length > 1){
    	    majorCode = oid[0];
            subCode = oid[1];
            typeCode = oid[2];
    	}
    	document.frm.majorCode.value = majorCode;
    	document.frm.subCode.value = subCode;
    	document.frm.typeCode.value = typeCode;
    },
    primaryChange : function(element){
    	if(element.innerHTML == "변경"){
    		element.innerHTML = "취소";
    	}else{
    		element.innerHTML = "변경";
    	}
    	var td = document.getElementById("primaryTD");
    	var temp = "";
    	temp = td.innerHTML;
    	td.innerHTML = this.PRIMARY_TAG;
    	this.PRIMARY_TAG = temp;
    },
    attachFile : function(){
		var attachTable = document.all.attachTable;
	    trObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
	    trObjClone = trObj.cloneNode("true");
	    trObj.insertAdjacentElement("afterEnd", trObjClone);

	    newTrObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
//	    newTrObj.style.display = "block";
	},
	delAttachFile : function(){
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
	},
    updateEvt : function(oid){
    	location.href = "/Windchill/extcore/jsp/document/updateDGGeneralDoc.jsp?docOid=" + oid;
    },
    updateDocSubmit : function(mode){
    	var f = document.frm;
    	f.mode.value = mode;
		f.action = this.FORM_ACTION;
		f.method = "post";
		f.submit();
    },
    checkBoxControl : function(){
    	if(document.all.allChecked.checked == true){
			for(var i=1;document.all.chkSECONDARY.length > i; i++){
				document.all.chkSECONDARY[i].checked = "checked";
			}
		}else{
			for(var i=1;document.all.chkSECONDARY.length > i; i++){
				document.all.chkSECONDARY[i].checked = "";
			}
		}
    },
    deleteEvt : function(mode){
    	if(confirm("삭제하시겠습니까?")){
    		var f = document.frm;
    		f.mode.value = mode;
    		f.action = this.FORM_ACTION;
    		f.method = "post";
    		f.submit();
    	}
    },
    versionHistory : function(docOid){
    	var url = "/Windchill/extcore/jsp/document/versionHistoryPopup.jsp?docOid=" + docOid;
    	this.openFixWindow(url, 900, 500, "versionHistory");
    },
    popCalendar : function(varName){
    	var str ="/Windchill/extcore/jsp/common/calendar.jsp?fld="+varName;
    	var opts = "toolbar=0,location=0,directory=0,status=0,menubar=0,scrollbars=0,resizable=0,";
    	var leftpos = (screen.width - 224)/ 2; 
    	var toppos = (screen.height - 230) / 2 ; 
    	var rest = "width=220,height=230,left=" + leftpos + ',top=' + toppos;
    	var newwin = window.open( str , "calendar", opts+rest);
    },
    viewBaseline : function(baselineName, modelOid){
    	var param = "?baselineName=" + baselineName +"&modelOid=" + modelOid;
    	var url = "/Windchill/extcore/jsp/document/viewBaselinePopup.jsp" + param;
    	var width = "1030";
    	var height = "750";
    	var name = "viewBaseline";
    	this.openFixWindow(url, width, height, name);
    },
    getSubClass : function(majorClassOid){
    	var f = document.frm;
    	f.action = "/Windchill/extcore/jsp/document/createDGDocTypeSubPage.jsp?majorClassOid="+majorClassOid;
    	f.method = "post";
    	f.target = "subFrame";
    	f.submit();
    },
    docTypeUpdate : function(){
    	var f = document.frm;
    	f.action = this.FORM_ACTION;
    	f.method = "post";
    	f.submit();
    },
    completeSave : function(mode){
    	var f = document.frm;
    	f.mode.value = mode;
    	f.action = this.FORM_ACTION;
    	f.method = "post";
    	f.submit();
    },
    searchDefaultDisplay : function(e){
    	if(e.src.indexOf("minus") > -1){
    		e.src = "/Windchill/extcore/images/tree_plus.gif";
    		document.getElementById("defaultCon").style.display = "none";
    		document.frm.defaultCondition.value="off";
    	}else{
    		e.src = "/Windchill/extcore/images/tree_minus.gif";
    		document.getElementById("defaultCon").style.display = "";
    		document.frm.defaultCondition.value="on";
    	}
    	document.frm.docNumber.value = "";
    	document.frm.docName.value = "";
//    	document.frm.majorCode.value = "";
//    	document.frm.subCode.value = "";
//    	document.frm.typeCode.value = "";
//    	document.frm.typeSelect[0].selected = "selected";
    	document.frm.model.value = "";
    },
    searchCommonDisplay : function(){
        var common = document.getElementById("common");
    	if(document.frm.commonCondition.value == "block"){ // 감추기 기능
    		document.getElementById("showImage").src = "/Windchill/extcore/images/tree_plus.gif";
    		common.style.display = "none";
    		document.frm.commonCondition.value="none";
    	}else if(document.frm.commonCondition.value == "none"){
    		document.getElementById("showImage").src = "/Windchill/extcore/images/tree_minus.gif";
    		common.style.display = "";
    		document.frm.commonCondition.value="block";
    	}
    	document.frm.revision[0].checked = "checked";
    	document.frm.creator.value = "";
    	document.frm.creator_ID.value = "";
    	document.frm.createStartDate.value = "";
    	document.frm.createEndDate.value = "";
    }
}