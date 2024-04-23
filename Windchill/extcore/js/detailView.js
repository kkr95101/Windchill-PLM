/***************************************************************************************************
 * Source     : detailView.js
 * Copyright  : (c) DIGITEK. All right reserved
 * CreateDate : 2011.
 * Creator    : kjk
 * ModuleID   :
 * Desc       :
 **************************************************************************************************/


function showDetailView(oid, popFlag, etcParam) {
	
    var detailWin;
	var width = 1110;
	var height = 700;
    if (popFlag!=true){
        popName = "_blank"; 
    }
    
    if (etcParam == undefined){
    	etcParam = "";
    }

    if (oid.indexOf("notice") > -1) {
        if (popFlag){
        	document.location.href = "/Windchill/extcore/jsp/notice/NotiViewCnt.jsp?noticeOid=" + oid + etcParam;
        }
        else{
        	var left = (screen.width/2) - (900/2);
    	    var top = (screen.height/2) - (700/2);
        	detailWin = window.open("/Windchill/extcore/jsp/notice/NotiViewCnt.jsp?noticeOid=" + oid + etcParam, "noticePopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=900, height=700");
        	detailWin.focus();
        }
    } 
    else if (oid.indexOf("Ecr") > -1) {
        if (popFlag){
        	document.location.href = "/Windchill/extcore/jsp/change/detailEcr.jsp?oid=" + oid + etcParam;        	
        }
        else{
        	var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
        	detailWin = window.open("/Windchill/extcore/jsp/change/detailEcr.jsp?oid=" + oid + etcParam, "ecrPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
        	detailWin.focus();
        }	
    } 
    else if (oid.indexOf("Eco") > -1) {
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/change/detailEco.jsp?oid=" + oid + etcParam;
    	}
    	else{
    		
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    	    detailWin = window.open("/Windchill/extcore/jsp/change/detailEco.jsp?oid=" + oid + etcParam, "ecoPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    		detailWin.focus();
    	}
    } 
    else if(oid.indexOf("WTPart") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/part/PartDetailPopup.jsp?partOid=" + oid + etcParam;
    	}
    	else{
    		height = 800;
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/part/detailPart.jsp?oid=" + oid,"_blank", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    		detailWin.focus();
    	}
    } 
    else if(oid.indexOf("DGTechDoc") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/document/techDoc/viewDGTechDoc.jsp?oid=" + oid + etcParam;
    	}
    	else{
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/document/techDoc/viewDGTechDoc.jsp?oid=" + oid + etcParam,  "DGTechPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    		detailWin.focus();
    	}
    }
    else if(oid.indexOf("DGImageDraw") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/caddoc/detailCAD.jsp?oid=" + oid + etcParam;
    	}
    	else{
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/caddoc/detailCAD.jsp?oid=" + oid + etcParam,  "DGImagePopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);    		
    		detailWin.focus();
    	}
    } 
    else if(oid.indexOf("EPMDocument") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/caddoc/detailCAD.jsp?oid=" + oid + etcParam;
    	}
    	else{
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/caddoc/detailCAD.jsp?oid=" + oid + etcParam,  "EPMPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    		detailWin.focus();    		
    	}
    } 
    else if(oid.indexOf("DGRefDraw") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/extcore/jsp/caddoc/datailDGRefDraw.jsp?oid=" + oid + etcParam;
    	}
    	else{
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/caddoc/datailDGRefDraw.jsp?oid=" + oid + etcParam,  "DGRefDrawPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    		detailWin.focus();    		    		
    	}
    } 
    else if(oid.indexOf("DGSecurityLift") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/securityLift/viewSecurityLift.jsp?oid=" + oid + etcParam,  "DGSecurityLiftPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();    		    		
    	
    } 
    else if(oid.indexOf("DGManufactureData") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/manufacture/detailMFTData.jsp?oid=" + oid + etcParam,  "DGManufactureDataPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    	
    } 
    else if(oid.indexOf("DGCastingDraw") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/manufacture/detailMFTCasting.jsp?oid=" + oid + etcParam,  "DGManufactureDataPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    	
    } 
    else if(oid.indexOf("DGMachiningDraw") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/manufacture/detailMFTMachining.jsp?oid=" + oid + etcParam,  "DGManufactureDataPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    	
    } 
    else if(oid.indexOf("DGSampleRequest") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/request/detailSampleReq.jsp?oid=" + oid + etcParam,  "DGSampleRequestPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    } 
    else if(oid.indexOf("DGTestRequest") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/request/detailTestReq.jsp?oid=" + oid + etcParam,  "DGTestRequestPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    } 
    else if(oid.indexOf("DGSampleResult") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
    	detailWin = window.open("/Windchill/extcore/jsp/request/detailSampleResult.jsp?oid=" + oid + etcParam,  "DGSampleResultPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	detailWin.focus();
    } 
    else if(oid.indexOf("DGTest") > -1){
    	if(oid.indexOf("DGTestResult") > -1){
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/request/detailTestResult.jsp?oid=" + oid + etcParam,  "DGTestResultPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	}else{
    		width=530;
    		height=340;
    		var left = (screen.width/2) - (width/2);
    	    var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/extcore/jsp/request/detailTest.jsp?oid=" + oid + etcParam,  "DGTestResultPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
    	}
    	detailWin.focus();
    }
    else if(oid.indexOf("DGBeforeReview") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/servlet/dgt/beforeReview/controller/detailDGBeforeReview?oid=" + oid + etcParam,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+height+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
    else if(oid.indexOf("IsirReq:") > -1){
		if(etcParam=="eo"){
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
			detailWin = window.open("/Windchill/extcore/jsp/cpc/change/viewECONotice.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		}else{
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
			detailWin = window.open("/Windchill/extcore/jsp/cpc/partdev/viewDevRfqReq.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		}
		detailWin.focus();
	}
	else if(oid.indexOf("CPC4m:") > -1){
		var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/cpc4m/viewCPC4mNotice.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("HSEstimateResult") > -1){
		var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/estimate/viewEstimateResult.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("HSEstimateReq") > -1){
		var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/estimate/viewEstimateReq.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("DGProjectApprovalDoc") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/servlet/dgt/project/controller/viewApprovalDoc?oid="+ oid +"&approvalDocOid=" + oid;
    	}else{
    		width=900;
    		var left = (screen.width/2) - (900/2);
    		var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/servlet/dgt/project/controller/viewApprovalDoc?oid="+ oid +"&approvalDocOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
    		detailWin.focus();
    	}
    }
	else if(oid.indexOf("DGOpenIssue") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/servlet/dgt/openIssue/controller/viewOpenIssue?oid=" + oid;
    	}else{
    		width=900;
    		height=650;
    		var left = (screen.width/2) - (width/2);
    		var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/servlet/dgt/openIssue/controller/viewOpenIssue?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
    		detailWin.focus();
    	}
    }
    else if(oid.indexOf("DGIssueResult") > -1){
    	if (popFlag){
    		document.location.href = "/Windchill/servlet/dgt/openIssue/controller/viewIssueResult?oid=" + oid ;
    	}else{
    		width=900;
    		var left = (screen.width/2) - (width/2);
    		var top = (screen.height/2) - (height/2);
    		detailWin = window.open("/Windchill/servlet/dgt/openIssue/controller/viewIssueResult?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
    		detailWin.focus();
    	}
    }
    else if(oid.indexOf("DGProjectMaster") > -1){
    	width=1150;
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
        detailWin = window.open("/Windchill/servlet/dgt/project/controller/viewProjectTab?projectMasterOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
        detailWin.focus();
    }
    else if(oid.indexOf("DGProject") > -1){
    	width=1150;
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
        detailWin = window.open("/Windchill/servlet/dgt/project/controller/viewProjectTab?projectOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
        detailWin.focus();
    }
    else if(oid.indexOf("DGTask") > -1){
    	width=900;
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (height/2);
        detailWin = window.open("/Windchill/servlet/dgt/project/controller/viewTaskActivity?taskOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
        detailWin.focus();
    }
    else if(oid.indexOf("DGTargetCost") > -1){  
    	var left = (screen.width/2) - (1150/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
        detailWin = window.open("/Windchill/servlet/dgt/cost/controller/viewTargetCost?targetCostOid=" + oid +"&targetTab=cost",  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1150,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
        detailWin.focus();
    }
    else if(oid.indexOf("DGEpiMaster") > -1){  
    	var left = (screen.width/2) - (1150/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
        detailWin = window.open("/Windchill/extcore/jsp/epi/viewEpi.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1150,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
        detailWin.focus();
    }
    else if (oid.indexOf("DGDVPAndR") > -1){
    	var left = (screen.width/2) - (1150/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
    	detailWin = window.open("/Windchill/servlet/dgt/dvpandr/controller/detailDGDVPV?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1150,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
        detailWin.focus();
    }
    else if(oid.indexOf("IsirReqResult:") > -1){
    	var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/common/viewISIRResult.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1050,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("CPC4mResult:") > -1){
		var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/common/viewISIR4mResult.jsp?oid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1050,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("C4M-") > -1){
		var left = (screen.width/2) - (width/2);
	    var top = (screen.height/2) - (((screen.availHeight*8)/10)/2);
		detailWin = window.open("/Windchill/extcore/jsp/cpc/cpc4m/viewCPC4MReq.jsp?docNumber=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width=1050,height=" + screen.availHeight * 8 / 10 + ",resizable=yes");
		detailWin.focus();
	}
}

function updateDetail(oid, popFlag, etcParam) {
	
	var detailWin;
	var width = 1110;
	var height = 700;
	
	if (popFlag!=true){
		popName = "_blank"; 
	}
	
	if (etcParam == undefined){
		etcParam = "";
	}
	
	if (oid.indexOf("notice") > -1) {
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/notice/NotiUpdateCnt.jsp?noticeOid=" + oid + etcParam;
		}
		else{
			var left = (screen.width/2) - (900/2);
			var top = (screen.height/2) - (700/2);
			detailWin = window.open("/Windchill/extcore/jsp/notice/NotiUpdateCnt.jsp?noticeOid=" + oid + etcParam, "noticePopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=900, height=700");
			detailWin.focus();
		}
	} 
	else if (oid.indexOf("Ecr") > -1) {
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/change/updateEcr.jsp?oid=" + oid + etcParam;        	
		}
		else{
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (height/2);
			detailWin = window.open("/Windchill/extcore/jsp/change/updateEcr.jsp?oid=" + oid + etcParam, "ecrPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
			detailWin.focus();
		}	
	} 
	else if (oid.indexOf("Eco") > -1) {
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/change/updateEco.jsp?oid=" + oid + etcParam;
		}
		else{
			
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (height/2);
			detailWin = window.open("/Windchill/extcore/jsp/change/updateEco.jsp?oid=" + oid + etcParam, "ecoPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
			detailWin.focus();
		}
	} 
	else if(oid.indexOf("WTPart") > -1){
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/part/PartDetailPopup.jsp?partOid=" + oid + etcParam;
		}
		else{
			height = 800;
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (height/2);
			detailWin = window.open("/Windchill/extcore/jsp/part/updatePart.jsp?oid=" + oid,"wtpartPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
			detailWin.focus();
		}
	} 
	else if(oid.indexOf("DGTechDoc") > -1){
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/document/techDoc/updateDGTechDoc.jsp?oid=" + oid + etcParam;
		}
		else{
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (height/2);
			detailWin = window.open("/Windchill/extcore/jsp/document/techDoc/updateDGTechDoc.jsp?oid=" + oid + etcParam,  "DGTechPopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);
			detailWin.focus();
		}
	}
	else if(oid.indexOf("DGImageDraw") > -1){
		if (popFlag){
			document.location.href = "/Windchill/extcore/jsp/caddoc/updateImageCAD.jsp?oid=" + oid + etcParam;
		}
		else{
			var left = (screen.width/2) - (width/2);
			var top = (screen.height/2) - (height/2);
			detailWin = window.open("/Windchill/extcore/jsp/caddoc/updateImageCAD.jsp?oid=" + oid + etcParam,  "DGImagePopup", "left=" + left + ",top=" + top + ", toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width="+width+", height="+height);    		
			detailWin.focus();
		}
	} 
	else if(oid.indexOf("DGOpenIssue") > -1){
		width=900;
		height=650;
		var left = (screen.width/2) - (width/2);
		var top = (screen.height/2) - (height/2);
		detailWin = window.open("/Windchill/servlet/dgt/openIssue/controller/modifyOpenIssue?openIssueOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
		detailWin.focus();
	}
	else if(oid.indexOf("DGIssueResult") > -1){
		width=900;
		var left = (screen.width/2) - (width/2);
		var top = (screen.height/2) - (height/2);
		detailWin = window.open("/Windchill/servlet/dgt/openIssue/controller/modifyIssueResult?issueResultOid=" + oid ,  "window", "left=" + left + ",top=" + top + ", scrollbars=yes,status=no,menubar=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=yes");
		detailWin.focus();
	}
}

var HSize = "700px";
var WSize = "900px";

var partViewWin;
var productViewWin;

function showProductDetailView(obj , oid){
	
	if (obj != null){
		var left = (screen.width/2) - (900/2);
	    var top = (screen.height/2) - (700/2);
		 var url ="/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
		 partViewWin = window.open( url , 'ProductDetail', 'scrollbars=1,resizable=1,top=' + top + ', left=' + left + ', height='+HSize+', width='+WSize );
		 partViewWin.focus();
		
	}else{
		document.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
	}	 
}


function showPartDetailView(obj , oid){
	
	if (obj != null){
		var left = (screen.width/2) - (900/2);
	    var top = (screen.height/2) - (700/2);
		 var url ="/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid;  
		 productViewWin = window.open( url , 'PartDetail', 'scrollbars=1,resizable=1,top=' + top + ', left=' + left + ', height='+HSize+', width='+WSize );
		 productViewWin.focus();
	}else{
		 document.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid;	
	}
	 
}