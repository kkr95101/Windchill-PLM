//도번 중복 검사

var HSize = "768px";
var WSize = "1024px";
//도번 중복체크
function newHttp() {
	var xmlhttp = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		xmlhttp = new XMLHttpRequest();
		// If Pages are XHTML compliant, we should un-comment these lines so responseXML works in some older mozilla browsers
		//if (xmlhttp.overrideMimeType) {
		//   xmlhttp.overrideMimeType('text/xml');
		//}
	}
	else if (window.ActiveXObject) { // IE
		try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.5.0"); } catch (e) {
			try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.4.0"); } catch (e) {
				try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				}
			}
		}
	}
	return xmlhttp;
}

function setHeaders(xmlhttp) {
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	// set cgi.http_x_referer
	// depending on the browser cgi.http_referer may or may not be sent, and may or may not be writable.
	xmlhttp.setRequestHeader("Referer", window.location);
	xmlhttp.setRequestHeader("X-Referer", window.location);
	try {
		if(USER_AGENT) {
			xmlhttp.setRequestHeader("User-Agent", USER_AGENT);
		}
		if(is_ie) {
			xmlhttp.setRequestHeader("Accept-Language",getLocale());
		}
	} catch(e){}
}

function checkSystemNumber_(number) {
	var frm = document.frm;
	var mode = frm.mode.value;
	var oid = null;

	if(number=='' || number == null) {
		alert("번호를 입력하세요.");
		return;
	}
	if("UpdateImageDraw" == mode){
		oid = frm.oid.value;
	}
	var iframe = document.getElementById("checkDuplicationFrame");
	iframe.src = "/Windchill/extcore/jsp/caddoc/CadNumberDuplicateCheck.jsp?cadNumber="+number+"&system=yes&mode="+mode+"&oid="+oid;

}

function PartNumCheck(){

	var frm = document.frm;
	var partNumber = frm.part_Number.value;

	if(partNumber == null || partNumber == "" || partNumber == "undefined" || partNumber=="null"){
		alert("자동생성할 부품의 품번을 입력하세요");
		return false;
	}
	var iframe = document.getElementById("checkPartDuplicationFrame");
	iframe.src = "/Windchill/extcore/jsp/caddoc/PartNumberDuplicateCheck.jsp?cadNumber="+partNumber+"&system=yes";
}

function checkpartnumber(number){
	var frm = document.frm;

	if(number == '' || number == null){
		alert("번호를 입력하세요");
		return;
	}

	var iframe = document.getElementById("checkPartDuplicationFrame");
	iframe.src = "/Windchill/extcore/jsp/caddoc/PartNumberDuplicateCheck.jsp?cadNumber="+number+"&system=yes";
}
 

//도면  검색
function searchDraw() {
	var frm = document.frm;

	if ( checkProductValidation() ) {
		frm.action = "/Windchill/extcore/jsp/caddoc/ProDrawSrcSubIframe.jsp?sessionid=";
		frm.target = "getSearchDraw";
		frm.submit();
	}

}

//수정시 부품 중복 체크
function PartCheck(){
	var number = document.frm.Cad_Number.value;
	PartCreate();
	checkpartnumber(number);
}


//도면검색 팝업
function searchDrawPop(single) {
	var frm = document.frm;

	if(single == null || single == 'undefined' ) single = false;

	if ( checkPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/caddoc/ProDrawSrcSubIframePopup.jsp?sessionid=&single="+single;

		frm.target = "getSearchDrawPopup";
		frm.submit();
	}

}

//자동 제품 생성 div 활성화 
function PartCreate(){
	var doc = document.frm ;
	if(document.getElementById("CreatePart").checked){
		document.getElementById("PartTable").style.display = "none";
		document.getElementById("PartName").style.display ="block";
	}else{
		document.getElementById("PartTable").style.display = "block";
		document.getElementById("PartName").style.display ="none";
	}   
}

// 제품 등록
function createProduct() {
	var frm = document.frm;
	if(!confirm("제품을 등록하시겠습니까?")) {
		return;
	} else {

		frm.action = "/Windchill/servlet/ext/PartAction";
		frm.submit();
	}

}

function addElementTr(  tr, OpenerPartTableName ){

	var doc = document;

	var noticeFlag  = false;
	var noticeMsg = "";
	var dupCnt    = 0;

	var resultTable = doc.getElementById( OpenerPartTableName );
	var parenttbodys  = resultTable.getElementsByTagName("tbody");
	var parenttbody = parenttbodys[0];

	for( var i =0; i < parenttbodys.length ;i++ ){
		resultTable.removeChild(parenttbodys[i]);
	}

	var childtbody = null;

	var mPartChecker = doc.getElementById( 'mPartChecker' );

	if ( mPartChecker != null && mPartChecker != 'undefined' ){

		if( mPartChecker.value == 'true' ){

			parenttbody = doc.createElement( "tbody" ) ;
			mPartChecker.value = 'false';

		}
	}

	childtbody = resultTable.appendChild( parenttbody );


	for( var j=0 ; j < tr.length ; j++ ){

		var trTds = tr[j].getElementsByTagName("td");
		var tableTrs  = parenttbody.getElementsByTagName("tr");
		var trcount = tableTrs.length;

		for ( var k=0;k<trcount; k++ ){

			var tableTds  = tableTrs[k].getElementsByTagName("td");
			if(tableTds[0].firstChild !=null && tableTds[0].firstChild != ""){
				if ( trTds[0].firstChild.value == tableTds[0].firstChild.value ) {

					if ( trTds[0].firstChild.value == tableTds[0].firstChild.value ) {

						if (!noticeFlag){

							noticeMsg = "[" + tableTds[2].childNodes[0].value  + "]";
							noticeFlag = true;
						}
						dupCnt = ++dupCnt;
					}
				}
			}
		}

		if (dupCnt > 0){
			if (dupCnt = 1){
				alert(noticeMsg+" 은(는) 이미 추가되었습니다.");
				return;

			}else{
				alert(noticeMsg+" 외 "+ dupCnt+"건이 이미 추가되었습니다.");
				return;
			}
		}

		var tableTr = parenttbody.appendChild( doc.createElement( "tr" )  );
		if( trcount%2 == 0 ){       
			tableTr.className = "Leven";
		}
		for( var i=0; i < trTds.length ; i++ ){
			var tableTd = tableTr.appendChild( doc.createElement( "td" ));
			tableTd.innerHTML = trTds[i].innerHTML;
			if(i==0){ 
				tableTd.firstChild.checked = false;
			}
		}
	}

	var divListTable01 = doc.getElementById("divListTable01");
	divListTable01.className="divListTable";
	styleListTable (divListTable01);
}

function setDocfield(tr){
	var doc = document;

	if(tr !=null && tr !='undefined' && tr.length>0){
		var trTds = tr[0].getElementsByTagName("td");

		doc.getElementById("partNumber").value  =   getElementValue( trTds[2].childNodes , "part_NumberText" ) ;
		doc.getElementById("partName").value  =   getElementValue( trTds[3].childNodes , "part_NameText" ) ;
		doc.getElementById("eco_no").value    =   getElementValue( trTds[5].childNodes , "econoText" ) ;
	}

}

function setDrawfield(tr){
	var doc = document;

	if(tr !=null && tr !='undefined' && tr.length>0){
		var trTds = tr[0].getElementsByTagName("td");

		doc.getElementById("Part_Oid").value  =   getElementValue( trTds[0].childNodes , "SelectedOid" ) ;
		//alert( doc.getElementById("Part_Oid").value );

	}

}

// 도면 등록
function createImageDraw() {
	var frm = document.frm;
	var number = frm.Cad_Number.value;

	if(ValidateCheck()){
		if(!confirm("도면을 등록하시겠습니까?")) {
			return;
		}else {
			frm.action = "/Windchill/servlet/ext/ImageDrawAction";
			frm.submit();
		}
	}


}

function checkBoxChecker( checkboxId ){
	var checkBoxs = document.getElementsByName( checkboxId );

	for(var i =0; i < checkBoxs.length ; i++){
		checkBoxs[i].checked = true;
	}
}

//제품 수정
function updateProduct() {
	var frm = document.frm;

	//  var modelCategory = frm.modelCategory[frm.modelCategory.selectedIndex].value;
	//if (checkModelValidation('create', modelCategory)) {
	if(!confirm("제품을 수정하시겠습니까?")) {
		return;
	} else {

		frm.action = "/Windchill/servlet/ext/PartAction";
		frm.submit();
	}

}

//도면 수정
function modifyDraw() {
	var frm = document.frm;


	if(!confirm("도면을 수정하시겠습니까?")) {
		return;
	} else {
		/*checkBoxChecker("Eco_Oid");*/  
		frm.action = "/Windchill/servlet/ext/ImageDrawAction";
		frm.submit();
	}

}

//제품 검색
function searchProduct() {
	var frm = document.frm;


	if ( checkProductValidation() ) {
		frm.action = "/Windchill/extcore/jsp/part/ProProductSrcSubIframe.jsp?&sessionid=";

		frm.target = "getSearchProduct";
		frm.submit();
	}

}    

//부품 검색
function searchPart() {
	var frm = document.frm;


	if ( checkPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframe.jsp?&sessionid=";

		frm.target = "getSearchPart";
		frm.submit();
	}

}   


//부품 검색 popup
function searchPartPop() {
	var frm = document.frm;


	if ( checkPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframePopup.jsp?&sessionid=";

		frm.target = "getSearchPart";
		frm.submit();
	}

}   


//제품부품검색 페이징
function gotoPage(page, content, cmdMenu) {

	var frm = document.frm;

	frm.method = "post";
	frm.target = "getSearchDraw";
	if( frm.mode.value == 'searchDraw' ){
		frm.action = "/Windchill/extcore/jsp/caddoc/ProDrawSrcSubIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
	}
	frm.submit();
}

// 제품 상세화면 보기
function showProductDetailView(obj , oid){
	// obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 

	var url ="/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
	window.open( url , 'DTL', 'top=100px, left=100px height=800px, width=1024px,scrollbars=yes' );

}

// 부품 상세화면 보기
function showPartDetailView( obj , oid ){
	obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
}
function showPartDetailView_(obj){

	var oid = obj.getElementById("Part_Oid").value;

	var Url = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid;

	window.open(Url,"부품상세");
}
//제품 등록 페이지
function showCreateProduct( obj ){
	obj.location.href = "/Windchill/extcore/jsp/part/ProProductCrt.jsp"; 
}

//부품 등록 페이지
function showCreatePart( obj ){
	obj.location.href = "/Windchill/extcore/jsp/part/ProPartCrt.jsp"; 
}

//제품검색 validation
function checkProductValidation(){
	return true;
}
//부품검색 validation
function checkPartValidation(){
	return true;
}

//mode값이 search 계열 즉 단계( draw ) 값을 사용하는 페이지면 true를 리턴
function checksearcher(str){
	var rtv = false;
	var searcher = new Array( "searchPart" , "searchProduct"  );

	for( var i=0 ; i<searcher.length; i++ ){
		if( searcher[i] == str ){
			rtv = true ;
			break;
		}
	}
	return rtv;
}


//bom창 열기

function showBOMEditor(oid){
	// var url ="/Windchill/extcore/jsp/bom/BomEditorCnt.jsp?oid="+oid;
	var url ="/Windchill/extcore/jsp/bom/ViewBom.jsp?oid="+oid;
	window.open( url , 'BOM', 'top=100px, left=100px height=800px, width=1200px' );
}


//pop창 selectedAll 

function selectAll(){
	var frm = document.frm;

	var CheckCount;
	var checkBoxs = document.getElementsByName("SelectedOid");

	if( checkBoxs != null && checkBoxs.length > 0 ){
		for( var i=0 ; i < checkBoxs.length ; i++ ){
			if( checkBoxs[i].checked == true ){
				CheckCount.length ++;
				Check
			}
		}
	}

	alert(CheckCount.length);
}
//이력정보
function showImageDrawHistoryView(oid){
	//alert(oid);
	var url ="/Windchill/extcore/jsp/caddoc/ImageDrawHistoryDTL.jsp?oid="+oid; 
	window.open( url , 'HIS', 'scrollbars=1,resizable=1,top=100px, left=100px,height=600, width=1000' );
}
//수정창
function showUpdateImageDraw(oid){
	var url ="/Windchill/extcore/jsp/caddoc/updateImageCAD.jsp?oid="+oid;
	document.location.href = url;
}
function showUpdateRefDraw(oid){
	var url ="/Windchill/extcore/jsp/caddoc/updateRefDraw.jsp?oid="+oid;
	document.location.href = url;
}
//개정창
function reviseImageDraw() {
	var frm = document.frm;
	if(!confirm("도면을 개정하시겠습니까?")) {
		return;
	} else {
		frm.action = "/Windchill/servlet/ext/DGCADAction?cmd=revise";
		frm.submit();
	}

}
function deleteImageDraw(){
	var frm = document.frm;

	frm.mode.value="deleteImageDraw";

	if(!confirm("도면을 삭제하시겠습니까?")) {
		return;
	} else {
		frm.action = "/Windchill/servlet/ext/ImageDrawAction";
		frm.submit();
	}
}
/* function showDrawDetailView(obj , oid){
       var url ="/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
       window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
     }*/
//상세 팝업
function showVerDetailView(oid){
	var url = "/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
}
function bntDisplay(value){

	var autoNum = document.getElementById("CadNUM");
	var duplication = document.getElementById("AutoNUM");
	var Part_Num_TXT = document.getElementById("Part_Num_TXT");
	var RPart_Num_TXT = document.getElementById("RPart_Num_TXT");
	var Customer_EO_NO_TXT = document.getElementById("Customer_EO_NO_TXT");
	var RCustomer_EO_NO_TXT = document.getElementById("RCustomer_EO_NO_TXT");
	var CreatePart = document.getElementById("CreatePart");
	var CheckBoxDiv = document.getElementById("checkBoxDiv");
	var Part_Num_Value = document.getElementById("Part_Value");
	var Part_Value_TXT = document.getElementById("Part_Value_TXT");
	var Part_Value = document.getElementById("PARTNUM");

	var EcoTable  = document.getElementById("EcoTable");
	if(value =="승인도"){
		duplication.style.display="block";
		autoNum.style.display ="none";
		Part_Num_TXT.style.display = "none";
		RPart_Num_TXT.style.display = "block";
		RCustomer_EO_NO_TXT.style.display = "block";
		Customer_EO_NO_TXT.style.display = "none";
		CheckBoxDiv.style.display = "none";
		Part_Num_Value.style.display = "block";
		Part_Value_TXT.style.display="none";
		CreatePart.checked = "";

		EcoTable.style.display="block";

	}else if(value =="시작" || value =="양산") {
		duplication.style.display="none";
		autoNum.style.display ="block";
		Part_Num_TXT.style.display = "block";
		RPart_Num_TXT.style.display = "none";
		Customer_EO_NO_TXT.style.display = "block";
		RCustomer_EO_NO_TXT.style.display = "none";
		//CreatePart.style.display = "inline-block";
		Part_Value.value=""
			Part_Num_Value.style.display = "none";
		Part_Value_TXT.style.display="block";
		CheckBoxDiv.style.display = "";
		EcoTable.style.display="none";

	}else{
		duplication.style.display="none";
		autoNum.style.display ="none";
		EcoTable.style.display="none";
	}

}
function ValidateCheck(){

	var frm = document.frm;
	var Cad_Name = frm.Cad_Name.value;
	var Cad_Num = frm.Cad_Number.value;
	var CreatePart = frm.CreatePart.value;
	var DrawClass = frm.drawClass.value;
	var Duplication = frm.checkDuplication.value;

	if(Cad_Name == null || Cad_Name == "" || Cad_Name == "undefined" || Cad_Name =="null"){
		alert("도면번호를 선택하세요 ");
		return false;
	}else if(Cad_Num == null || Cad_Num == "" || Cad_Num == "undefined" || Cad_Num=="null"){
		alert("도면번호를 입력하세요");
		return false;
	}else if(DrawClass == null || DrawClass == "" || DrawClass == "undefined" || DrawClass=="null"){
		alert("제품분류를 입력하세요");
		return false;
	}else if(Duplication == 'false'){
		alert("도면번호를 중복체크해주세요 ");
		return false;
	}else if(frm.CreatePart.checked){
		var bool = AutoNumbering();
		return bool;
	}else{
		return true;
	}

}
function AutoNumbering(){
	var frm = document.frm;
	var part_Number = frm.part_Number.value;
	var part_Name = frm.part_Name.value;
	var checkPartDuplication = frm.checkPartDuplication.value;
	if(part_Number == null || part_Number == "" || part_Number == "undefined" || part_Number=="null"){
		alert("자동생성할 부품의 품번을 입력하세요");
		return false;
	}else if(part_Name == null || part_Name == "" || part_Name == "undefined" || part_Name=="null"){
		alert("자동생성할 부품의 품명을 입력하세요 ");
		return false;
	}else if(checkPartDuplication == 'false'){
		alert("자동생성할 부품의 품번을 중복체크해주세요");
		return false;
	}else{
		return true;
	}
}
function Numbering(){
	var frm = document.frm;
	var Draw = frm.DrawClass.value;
	if(Draw =="승인도"){
		var PartNum = frm.PARTNUM.value;
		var EO_NO = frm.Customer_EO_NO.value;
		if(PartNum == "" || PartNum==null || PartNum == "undefined"){
			alert("품목코드를 입력하셔야 합니다.");
		}else if(EO_NO =="" || EO_NO == null || EO_NO == "undefined"){
			alert("고객EO NO를 입력하셔야 합니다.");
		}else{
			var number = PartNum +"_"+ EO_NO; 
			checkSystemNumber_(number); 

			var Cad_Num = document.getElementById("Cad_Number");
			Cad_Num.value = number; 
		}
	}       
}
function Auto_Number(){

	var frm = document.frm;
	var checkpart = document.getElementById("CreatePart").checked;  
	var CadNum = document.frm.Cad_Number.value;

	if(CadNum == null || CadNum == "undefined" || CadNum=="" || CadNum=="null"){
		alert("도면번호를 입력하세요"); 
	}else{
		checkSystemNumber_(CadNum);
	}
}

function makeSubTr( IsUseBom , bomManager , single ){

	var CheckCount = new Array();
	var resultTable = document.getElementById( "resultTable" );
	var childtbody = resultTable.getElementsByTagName( "tbody" );

	for( var i =0; i < childtbody.length ;i++ ){

		var bodyTr = childtbody[i].getElementsByTagName( "tr" ) ;
		for( var j =0; j < bodyTr.length ;j++ ){

			var bodyTd = bodyTr[j].getElementsByTagName( "td" ) ;
			for( var k =0; k < bodyTd.length ;k++ ){
				if( bodyTd[k].firstChild != null ){
					if( bodyTd[k].firstChild.id == "SelectedOid" &&  bodyTd[k].firstChild.checked ){

						var counter_Length =  CheckCount.length;
						CheckCount.length ++;

						var tempTr = bodyTr[j].cloneNode(true);

						//single 로 넘어왔으면  checkbox로 변환해서 넘김

						if ( single ){
							var tempBodyTd = tempTr.getElementsByTagName( "td" ) ;

							//for( var m =0; m < tempBodyTd.length ;m++ ){
							if( tempBodyTd[0].firstChild != null ){

								if( tempBodyTd[0].firstChild.id == "SelectedOid" ){

									var type    = tempBodyTd[0].firstChild.type;
									var id    = tempBodyTd[0].firstChild.id;
									var name  = tempBodyTd[0].firstChild.name;
									var value = tempBodyTd[0].firstChild.value;


									tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );

									var input = document.createElement( "INPUT" ) ;

									input.type  = "checkbox";
									input.id    = id;
									input.name  = name;
									input.value = value;

									tempBodyTd[0].appendChild( input );

								}
							}
						}

						//parent의 요청형식이 관리를 포함하고 있는지를 구분
						if( IsUseBom ){

						}else{
							tempTr = deleteBomTd( tempTr , bomManager );
						}
						CheckCount[counter_Length]=tempTr;

					}
				}
			}
		}
	}
	return CheckCount;
}
function addDrawForProduct(checkDrawOid){
	var oid = null;
	var checkdraw = document.getElementsByName(checkDrawOid);
	var linkDrawOid = opener.document.getElementById("linkDrawOid");
	var splitOid = linkDrawOid.value.split("/");
	var addOid = null;
	oid = linkDrawOid.value;
	var Count= null;

	for(var i = 0; i<checkdraw.length; i++){
		if(checkdraw[i].checked){
			Count = i;
			for(var j =0; j < splitOid.length; j++){
				if(splitOid[j] == checkdraw[i].value){
					alert("중복된 도면이 있습니다. 다시 선택하세요");
					return;
				}
			}
			if( addOid == null){
				addOid = checkdraw[i].value;
			}else{
				addOid = addOid + "/" +checkdraw[i].value;
			}
			if( oid == null || oid == ""){
				oid = checkdraw[i].value;
			}else{
				oid = oid + "/" +checkdraw[i].value;
			}

		}
		Count++;
	}


	if(checkdraw.length == 0){
		alert("도면이 없습니다.");
		return;
	}else if(addOid == null){
		alert("도면을 선택하세요");
		return;
	}


	var url = "/Windchill/extcore/jsp/caddoc/relateDraw.jsp?oid="+oid+"&addOid="+addOid;
	window.open( url, '', 'scrollbars=1,resizable=1,top=100px, left=100px,height=0,width=0');
}

function goPage(path){
	if(path == "결재관리" ){
		goSubMenu('MENU_WORK', 'WORK_READY', 'M2_1');
	}else if(path=="문서관리" ){
		goSubMenu('MENU_DOC', 'TRIP_APPLICATION','M3_1');
	}else if(path=="도면관리" ){
		goSubMenu('MENU_DRW', 'PRODUCT', 'M4_1');
	}else if(path=="개발관리" ){
		goSubMenu('MENU_DEVELOP', 'ECR', 'M5_1');
	}else if(path=="프로젝트관리"){
		goSubMenu('MENU_PMS', 'PMS_SEARCH', 'M6_1');
	}else if(path=="품질관리"){
		goSubMenu('MENU_QULITIY', 'SEARCH_QULITY', 'M7_1');
	}
}
function addElementEcoTr(  tr, OpenerPartTableName ){

	var doc = document;

	var noticeFlag  = false;
	var noticeMsg  = "";
	var dupCnt   = 0;

	var resultTable = doc.getElementById( OpenerPartTableName );

	var parenttbodys  = resultTable.getElementsByTagName("tbody");
	var parenttbody = parenttbodys[0];


	for( var i =0; i < parenttbodys.length ;i++ ){
		resultTable.removeChild( parenttbodys[ i ] );
	}

	var childtbody = null;
	var mPartChecker = doc.getElementById( "mProductChecker" );
	if  ( mPartChecker != null && mPartChecker != 'undefined' ){

		if( mPartChecker.value == 'true' ){
			parenttbody = doc.createElement( "tbody" ) ;
			mPartChecker.value = 'false';
		}
	}else{
		parenttbody = doc.createElement( "tbody" ) ;
	}
	childtbody = resultTable.appendChild( parenttbody );

	for( var j=0 ; j < tr.length ; j++ ){

		var trTds = tr[j].getElementsByTagName("td");
		var tableTrs  = parenttbody.getElementsByTagName("tr");
		var trcount = tableTrs.length;

		for ( var k=0;k<trcount; k++ ){

			var tableTds  = tableTrs[k].getElementsByTagName("td");
			if ( trTds[0].firstChild.value == tableTds[0].firstChild.value ) {

				if (!noticeFlag){
					noticeMsg = "[" + tableTds[0].firstChild.num  + "]";
					noticeFlag = true;
				}
				dupCnt ++;
			}
		}

		if (dupCnt > 0){
			if (dupCnt = 1){
				alert( noticeMsg + " 은(는) 이미 추가되었습니다." );
				return;

			}else{
				alert( noticeMsg + " 외 " + dupCnt + "건이 이미 추가되었습니다." );
				return;
			}
		}

		var tableTr = parenttbody.appendChild( doc.createElement( "tr" )  );
		if( trcount%2 == 0 ){       
			tableTr.className = "Leven";
		}
		for( var i=0; i < trTds.length ; i++ ){
			var tableTd = tableTr.appendChild( doc.createElement( "td" ));
			tableTd.innerHTML = trTds[i].innerHTML;
			if(i==0){ 
				tableTd.firstChild.checked = false;
			}
		}
	}
	//if (tr.length > 0){
	//     alert( tr.length+"건이 추가되었습니다.");
	//}
	var divListTable01 = doc.getElementById("divListTable01");
	divListTable01.className="divListTable";
	styleListTable (divListTable01);

	return tr.length;
}

function showECODetailView( oid ){
	// obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 
	var url ="/Windchill/extcore/jsp/eco/ECODTL.jsp?oid="+oid;
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );

}
function enterSearch() {
	var objElement;
	if( event.type == "keydown" && event.keyCode==13 ){
		objElement = window.event.srcElement;
		if (objElement.name != "creator" && objElement.name != "modifier"){
			searchDraw();
		}
	}
}
function ParentStyleHeightDraw(count){
	var doc = parent;
	doc.setSearchStylehheight(count);
	searchDraw();
}