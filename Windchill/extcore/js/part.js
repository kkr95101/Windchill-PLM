//도번 중복 검사

var HSize = "768px";
var WSize = "970px";
var BOMWSize = "1115px";

function checkSystemNumber(number) {
	var frm = document.frm;
	var mode = frm.mode.value;
	var oid = null;
	if(number=='' || number == null) {
		alert("번호를 입력하세요.");
		return;
	}

	if("updateProduct" == mode || "modifyPart" == mode){
		oid = frm.oid.value;
	}
	var iframe = document.getElementById("checkDuplicationFrame");
	iframe.src = "/Windchill/extcore/jsp/part/PartNumberDuplicateCheck.jsp?partNumber="+number+"&system=yes&mode="+mode+"&oid="+oid;
}

function attachPartforDraw(oid,updateFlag){
	var url = "/Windchill/extcore/jsp/part/relatePart.jsp?oid="+oid+"&UpdateFlag="+updateFlag;
	var partPop = window.open(url, "partPopup", "toolbar=0, status=1, resizable=yes, scrollbars=yes, location=0, menubar=0, width=1000, height=600");
}


function getNumber(AutoNum){

	var frm = document.frm;

	var product	= frm.ProductClass;
	var location	= frm.LocationClass;
	var customer = frm.CustomerClass;
	var engine 	= frm.EngineClass; 	
	frm.Part_Number.value = frm.prefix.value+AutoNum+"000" ;
	frm.numSeq.value = AutoNum;
}

//하위 부품 추가 
function searchPartPopFromModel(selMode, table) {
	var popWidth = WSize;
	var popHeight = HSize;
	var ml = (screen.availWidth - eval(popWidth)) / 3;
	var mt = (screen.availHeight - eval(popHeight)) / 3;
	partPop = window.open("/Windchill/extcore/jsp/part/SearchPartPopup.jsp?selMode=" + selMode+"&table="+table+"&selObj=part"+"&isModelOnly=false&isPartOnly=true", "모델검색", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
	//partPop.location.href = "/Windchill/extcore/jsp/part/SearchPartPopup.jsp?selMode=" + selMode+"&selObj="+selObj;
	partPop.focus();
}

//하위부품 삭제

function deleteMPartList() {
	var modelLen = document.frm.checkMPartOid.length - 1;
	for (var i = modelLen; i >= 0; i--) {
		if (document.frm.checkMPartOid[i].checked) {
			document.all.modelTable.deleteRow(i+1);
		}
	}
}

//제품 등록
function createProduct() {
	var frm = document.frm;

	if (checkModelValidation('createProduct')) {
		if(!confirm("제품을 등록하시겠습니까?")) {
			return;
		} else {
			ChildPartChecker("SelectedOid");  
			ChildPartChecker("LinkedDrawOID"); 
			ChildPartChecker("LinkedConformDrawOID"); 
			frm.action = "/Windchill/servlet/ext/PartAction";
			frm.submit();
		}
	}

}

//부품 등록
function createPart() {
	var frm = document.frm;

	if (checkPartValidation('create')) {
		if(!confirm("부품을 등록하시겠습니까?")) {
			return;
		} else {
			ChildPartChecker("SelectedOid");  
			ChildPartChecker("LinkedDrawOID"); 
			ChildPartChecker("LinkedConformDrawOID"); 
			frm.action = "/Windchill/servlet/ext/PartAction";
			frm.submit();
		}
	}

}

//제품 수정
function updateProduct() {
	var frm = document.frm;

	if(!confirm("제품을 수정하시겠습니까?")) {
		return;
	} else {

		/*ChildPartChecker("SelectedOid");          	
            	ChildPartChecker("LinkedDrawOID"); 
            	ChildPartChecker("LinkedConformDrawOID"); */
		frm.action = "/Windchill/servlet/ext/PartAction";
		frm.submit();
	}

}

//부품 수정
function modifyPart() {
	var frm = document.frm;

	//  var modelCategory = frm.modelCategory[frm.modelCategory.selectedIndex].value;
	//if (checkModelValidation('create', modelCategory)) {
	if(!confirm("부품을 수정하시겠습니까?")) {
		return;
	} else {

		//하위파트 checker
		/*	ChildPartChecker("SelectedOid"); 
            	ChildPartChecker("LinkedDrawOID"); 
            	ChildPartChecker("LinkedConformDrawOID"); */

		frm.action = "/Windchill/servlet/ext/PartAction";
		frm.submit();
	}

}
function checkModelValidation(mode){
	var doc = document;

	if('createProduct' == mode ){

		var productClass	= doc.getElementById("ProductClass");
		var customerClass	= doc.getElementById("CustomerClass"); 
		var modelClass	= doc.getElementById("ModelClass"); 
		var pnameClass	= doc.getElementById("PNameClass");
		var drawClass	= doc.getElementById("DrawClass"); 
		var part_Number	= doc.getElementById("Part_Number");
		var part_Name		= doc.getElementById("Part_Name");
		var Duplication = document.getElementById("checkDuplication");


		if(productClass.value == ''){
			alert("제품분류를 선택해 주시기 바랍니다.");
			return false;
		}else if(customerClass.value == ''){
			alert("고객사를 선택해 주시기 바랍니다.");
			return false;
		}else if(modelClass.value == ''){
			alert("기종를 선택해 주시기 바랍니다.");
			return false;
		}else if(pnameClass.value == ''){
			alert("PName을 선택해 주시기 바랍니다.");
			return false;
		}else if(drawClass.value == ''){
			alert("도면유형을 선택해 주시기 바랍니다.");
			return false;
		}else if(Duplication.value == 'false'){
			alert("품번 중복체크를 해주시기 바랍니다.");
			return false;
		}else if(part_Name.value == ''){
			alert("품명를 입력해 주시기 바랍니다.");
			return false;
		}else if(part_Number.value == ''){
			alert("품명를 입력해 주시기 바랍니다.");
			return false;
		}else return true;
	}
}

function checkPartValidation(mode){
	var doc = document;

	if('create' == mode ){

		var drawClass	= doc.getElementById("DrawClass");
		var part_Number	= doc.getElementById("Part_Number");
		var part_Name		= doc.getElementById("Part_Name");
		var Duplication	= doc.getElementById("checkDuplication");

		if(drawClass.value == ''){
			alert("제품분류를 선택해 주시기 바랍니다.");
			return false;
		}else if(part_Number.value == ''){
			alert("품번을 입력해 주시기 바랍니다.");
			return false;
		}else if(Duplication.value == "false"){
			alert("품번 중복체크를 해주시기 바랍니다.");
			return false;
		}else if(part_Name.value == ''){
			alert("품명를 입력해 주시기 바랍니다.");
			return false;
		}else return true;
	}
}

function ChildPartChecker( checkboxId ){
	var checkBoxs = document.getElementsByName( checkboxId );

	for(var i =0; i < checkBoxs.length ; i++){
		checkBoxs[i].checked = true;
	}
}
function ParentStyleHeightProduct(count){
	var doc = parent;
	doc.setSearchStylehheight(count);
	searchProduct();
}
function ParentStyleHeightPart(count){
	var doc = parent;
	doc.setSearchStylehheight(count);
	searchPart();
}
function ParentStyleHeightBom(count){
	var doc = parent;
	doc.setSearchStylehheight(count);
	searchBom();
}
//제품 검색
function searchProduct() {
	var frm = document.frm;

	if ( checkProductValidation() ) {
		frm.action = "/Windchill/extcore/jsp/part/ProProductSrcSubIframe.jsp?sessionid=";

		frm.target = "getSearchProduct";
		frm.submit();
	}
}    

//부품 검색
function searchPart() {
	var frm = document.frm;

	if ( checkshowPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframe.jsp?sessionid=";

		frm.target = "getSearchPart";
		frm.submit();
	}

}   
//BOM 검색
function searchBom() {
	var frm = document.frm;


	if ( checkshowPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/bom/ProBomSrcSubIframe.jsp?sessionid=";

		frm.target = "getSearchBom";
		frm.submit();
	}

}   

//부품 검색 popup
function searchPartPop() {

	var frm = document.frm;
	var Is_Product = document.getElementsByName("is_Product");

	if ( checkshowPartValidation() ) {
		for(var i = 0 ; i < Is_Product.length; i++){
			if(Is_Product[i].checked){

				if(Is_Product[i].value == "Product"){
					frm.action = "/Windchill/extcore/jsp/part/ProProductSrcSubIframe.jsp?sessionid=&linkFlag=true";
				}else if(Is_Product[i].value == "Part"){
					frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframe.jsp?sessionid=&linkFlag=true";
				}
			}
		}
		frm.target = "getSearchPartPopup";
		frm.submit();
	}

}   
function getDraw( TableName  ,CheckBoxName ,single,popupFlag ){
	var url ="/Windchill/extcore/jsp/caddoc/SearchCadList.jsp?";
	var param  = "TableName="+ TableName +"&CheckBoxName=" + CheckBoxName+"&single="+single+"&popupFlag="+popupFlag;
	window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}
//부품 검색 popup
function searchPartECOPop(single) {
	var frm = document.frm;

	if(single == null || single == 'undefined' ) single = false;

	if ( checkshowPartValidation() ) {
		frm.action = "/Windchill/extcore/jsp/eco/ECOPartSrcSubIframePopup.jsp?sessionid=&single="+single;

		frm.target = "getSearchPartPopup";
		frm.submit();
	}

}     

//제품부품검색 페이징
function gotoPage(page, content, cmdMenu) {

	var frm = document.frm;
	frm.method = "post";

	if( frm.mode.value == 'searchProduct' ){
		frm.action = "/Windchill/extcore/jsp/part/ProProductSrcSubIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
		frm.target = "getSearchProduct";

	}else if( frm.mode.value == 'searchPart' ){
		frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
		frm.target = "getSearchPart";

	}else if( frm.mode.value == 'searchPartPop' ){
		var single = frm.single.value;
		frm.action = "/Windchill/extcore/jsp/part/ProPartSrcSubIframePopup.jsp?page="+page+'&sessionid='+frm.sessionid.value+'&single='+single;
		frm.target = "getSearchPartPopup";

	}else if( frm.mode.value == 'searchPartPopeco' ){
		var single = frm.single.value;
		frm.action = "/Windchill/extcore/jsp/eco/ECOPartSrcSubIframePopup.jsp?page="+page+'&sessionid='+frm.sessionid.value+'&single='+single;
		frm.target = "getSearchPartPopup";

	}else {
		frm.action = "/Windchill/extcore/jsp/bom/ProBomSrcSubIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
		frm.target = "getSearchBom";

	}
	//frm.target = "";
	frm.submit();

}


//제품 상세화면 POPUP 보기

function showProductDetailViewpopup(obj , oid){
	// obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 
	var url ="/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
	window.open( url , 'popup', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );

}

//부품 상세화면 POPUP 보기

function showPartDetailViewpopup( obj , oid ){
	// obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
	var url ="/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
	window.open( url , 'popup', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}


function showPartDetailViewPop( obj , oid ){
	// obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
	var url ="/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
	window.open( url , 'detailPop', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}


//제품 등록 페이지
function showCreateProduct(obj){
	var url ="/Windchill/extcore/jsp/part/ProProductCrt.jsp";
	window.open( url , '_blank', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}


//부품 등록 페이지
function showCreatePart( obj ){
	//obj.location.href = "/Windchill/extcore/jsp/part/ProPartCrt.jsp"; 
	var url ="/Windchill/extcore/jsp/part/ProPartCrt.jsp";
	window.open( url , '_blank', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}

//제품 수정 페이지
function showUpdateProduct( oid ){
	//obj.location.href = "/Windchill/extcore/jsp/part/ProProductUpt.jsp"; 

	var url ="/Windchill/extcore/jsp/part/ProProductUpt.jsp?oid="+oid;

	document.location.href = url;

	//window.open( url , 'DTL', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}

//부품 수정 페이지
function showUpdatePart( oid ){
	//obj.location.href = "/Windchill/extcore/jsp/part/ProPartUpt.jsp"; 
	var url ="/Windchill/extcore/jsp/part/ProPartUpt.jsp?oid="+oid;

	document.location.href = url;

	// window.open( url , 'DTL', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
}


//도면상세 팝업
function showdrawDetailView(oid){
	var url = "/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
}
//2D도면상세 팝업
function show2DDraw(oid){
	var url = "/Windchill/extcore/jsp/part/Pro2DDrawList.jsp?oid="+oid;
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
}

//제품검색 validation
function checkProductValidation(){
	return true;
}
//부품검색 validation
function checkshowPartValidation(){
	return true;
}

//이력정보 팝업
function showPartHistoryView( oid ){
	var url ="/Windchill/extcore/jsp/part/ProHistoryDTL.jsp?oid="+oid; 
	window.open( url , 'HistoryPart', 'scrollbars=1,resizable=1,top=100px, left=100px,height=600, width='+WSize );
}
function showECOHistory( oid ){
	var url ="/Windchill/extcore/jsp/part/HistoryECO.jsp?oid="+oid; 
	window.open( url , 'HistoryECO', 'scrollbars=1,resizable=1,top=100px, left=100px,height=600, width='+WSize );
}
//연관문서 팝업

function showPartDocLinkView( oid ){
	var url ="/Windchill/extcore/jsp/part/ProProductDocLink.jsp?oid="+oid; 
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
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
	window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+BOMWSize );
}


//pop창 selectedAll 

function selectAll(id,allChecked){
	var frm = document.frm;

	var CheckCount;
	var checkBoxs = document.getElementsByName(id );

	if( checkBoxs != null && checkBoxs.length > 0 ){
		for( var i=0 ; i < checkBoxs.length ; i++ ){
			if( allChecked == true ){
				checkBoxs[i].checked = true;
			}else checkBoxs[i].checked = false;
		}
	}
}

function setpart( ParentType, IsUseBom, OpenerPartTableName  ,CheckBoxName , bomManager , single  ){ 
	var doc = opener; 
	if ( bomManager ==null || bomManager == "undefined"|| bomManager == "" ) bomManager ="bomManager";

	if ( single ==null || single == "undefined" ) single = false;

	// dtemlx 형식에서 요청한것인지 일반 jsp에서 요청한것인지에 따른 리턴 패턴
	if( ParentType == "normal" ){
		//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.

		doc.addElementTr( makeSubTr( IsUseBom , bomManager, single ) , OpenerPartTableName );

	}else  if( ParentType == "docFieldText" ){
		//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.

		single = true;

		var  TR = makeSubTr( IsUseBom , bomManager, single );

		doc.setDocfield( TR );
		doc.addElementTr( TR, OpenerPartTableName );

	}else  if( ParentType == "drawFieldText" ){
		//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.

		single = true;

		var  TR = makeSubTr( IsUseBom , bomManager, single );

		//delete
		var rows = doc.document.getElementById("resultTable").rows.length;
		if(rows == 2){
			doc.document.getElementById("resultTable").deleteRow(1);
		}	 

		doc.setDrawfield( TR );
		doc.addElementTr( TR, OpenerPartTableName );
	}else  if( ParentType == "dhtmlx" ){
		addParts();
	}else if( ParentType == "eco" ){
		//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.

		var count =  doc.addElementTr( makeECOSubTr( IsUseBom , bomManager, single , CheckBoxName ) , OpenerPartTableName );

		if(count > 0){
			addChildPart( CheckBoxName  , count);
		}
	}else if( ParentType == "ecopart" ){
		//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.  	    
		var count =  doc.addElementTr( makeECOSubTr( IsUseBom , bomManager, single , CheckBoxName ) , OpenerPartTableName );      	     

	} else  if( ParentType == "ecosrc" ){    	    	
		doc.setEcoSrcfield(makeSubTr( IsUseBom , bomManager, single ));
		self.close();
	}

	// self.close();
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

									var type		= tempBodyTd[0].firstChild.type;
									var id		= tempBodyTd[0].firstChild.id;
									var name	= tempBodyTd[0].firstChild.name;
									var value	= tempBodyTd[0].firstChild.value;


									tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );

									var input = document.createElement( "INPUT" ) ;

									input.type	=	"checkbox";
									input.id		=	id;
									input.name	=	name;
									input.value	=	value;

									tempBodyTd[0].appendChild( input );


								}
							}
							//}
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


function makeECOSubTr( IsUseBom , bomManager , single , CheckBoxName ){

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

						var tempBodyTd = tempTr.getElementsByTagName( "td" ) ;

						//for( var m =0; m < tempBodyTd.length ;m++ ){
						if( tempBodyTd[0].firstChild != null ){

							if( tempBodyTd[0].firstChild.id == "SelectedOid" ){

								var type		= tempBodyTd[0].firstChild.type;
								var id		= tempBodyTd[0].firstChild.id;
								var name	= tempBodyTd[0].firstChild.name;
								var value	= tempBodyTd[0].firstChild.value;


								tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );
								tempBodyTd[0].innerHTML = "<INPUT type='checkbox' id='"+CheckBoxName
								+"' name='"+CheckBoxName
								+"' value='"+value+"' >";
							}
						}

						//parent의 요청형식이 BOM관리를 포함하고 있는지를 구분
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





function deleteBomTd( tempTr ,bomManager){

	var bodyTd = tempTr.getElementsByTagName( "td" ) ;
	for( var k =0; k < bodyTd.length ;k++ ){
		if( bodyTd[k].id != null ){
			if( bodyTd[k].id == bomManager ){
				tempTr.removeChild( bodyTd[k] );
				break;
			}
		}
	}
	return tempTr;
}

function setDocfield(tr){
	var doc = document;

	if(tr !=null && tr !='undefined' && tr.length>0){
		var trTds	=	tr[0].getElementsByTagName("td");

		doc.getElementById("partNumber").value	= 	getElementValue( trTds[2].childNodes , "part_NumberText" ) ;
		doc.getElementById("partName").value		= 	getElementValue( trTds[3].childNodes , "part_NameText" ) ;
		doc.getElementById("eco_no").value		= 	getElementValue( trTds[5].childNodes , "econoText" ) ;
	}

}

function setDrawfield(tr){
	var doc = document;

	if(tr !=null && tr !='undefined' && tr.length>0){
		var trTds	=	tr[0].getElementsByTagName("td");

		doc.getElementById("Part_Oid").value	= 	getElementValue( trTds[0].childNodes , "SelectedOid" ) ;
		//alert( doc.getElementById("Part_Oid").value );

	}

}


function getElementValue( elementArray , id ){
	for(var i=0 ; i<elementArray.length ; i++){
		if(elementArray[i].id == id ){
			return  elementArray[i].value;
		}
	}
}

function addElementTr(  tr, OpenerPartTableName ){

	var doc = document;

	var noticeFlag	=	false;
	var noticeMsg	=	"";
	var dupCnt		=	0;
	var totalCnt	=	0;
	var resultTable	= doc.getElementById( OpenerPartTableName );
	var parenttbodys	= resultTable.getElementsByTagName("tbody");
	var parenttbody	= parenttbodys[0];

	for( var i =0; i < parenttbodys.length ;i++ ){
		resultTable.removeChild(parenttbodys[i]);
	}

	var childtbody = null;

	var mPartChecker = doc.getElementById( 'mPartChecker' );

	if	( mPartChecker != null && mPartChecker != 'undefined' ){

		if( mPartChecker.value == 'true' ){

			parenttbody = doc.createElement( "tbody" ) ;
			mPartChecker.value = 'false';

		}
	}

	childtbody = resultTable.appendChild( parenttbody );


	for( var j=0 ; j < tr.length ; j++ ){

		var trTds	=	tr[j].getElementsByTagName("td");
		var tableTrs	= parenttbody.getElementsByTagName("tr");
		var trcount	=	tableTrs.length;

		for ( var k=0;k<trcount; k++ ){

			var tableTds	= tableTrs[k].getElementsByTagName("td");
			if(tableTds[0].firstChild !=null && tableTds[0].firstChild != ""){
				if ( trTds[0].firstChild.value == tableTds[0].firstChild.value ) {

					//if ( trTds[0].firstChild.value == tableTds[0].firstChild.value ) {

					if (!noticeFlag){

						noticeMsg = "[" + trTds[0].firstChild.num  + "]";
						noticeFlag = true;
					}
					dupCnt ++ ;
					//}

				}else{
					totalCnt++;
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


		var tableTr	=	parenttbody.appendChild( doc.createElement( "tr" )  );
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
	//alert(dupCnt);
	if ( tr.length > 0 ){
		alert(  tr.length + "건이 추가되었습니다." );
	}else{
		alert("추가할 부품을 선택 하셔요.");
	}

	var divListTable01 = doc.getElementById("divListTable01");
	divListTable01.className="divListTable";
	styleListTable (divListTable01);

	return dupCnt;

}

function addParts() {

	var SelectedOid      = document.getElementsByName("checkPartOid");
//	var SelectedOid			= document.getElementsByName("SelectedOid");
	var part_Number			= document.getElementsByName("dNumber");
	var part_Name			= document.getElementsByName("dName");
	var Version				= document.getElementsByName("dVersion");
	var State					= document.getElementsByName("dState_Text");
	var Creater				= document.getElementsByName("dCreator");
	var CreateTimestamp	= document.getElementsByName("dCreateDate");
//	var OldVersion			= document.getElementsByName("OldVersionText");

	var count = 0;
	for(var i=0;i<SelectedOid.length;i++) {
		if(SelectedOid[i].checked) {
			count++;
		}
	}
	if(count == 0) {
		alert("부품을 하나이상 선택하세요.");
		return;
	}

	var partData = new Array();
	var idx = 0;
	for(var i=0;i<SelectedOid.length;i++) {
		if(SelectedOid[i].checked) {
			var duplicate = true;
			var tempArr = new Array();

			tempArr[0] = SelectedOid[i].value;
			tempArr[1] = part_Number[i].value;
			tempArr[2] = part_Name[i].value;
			tempArr[3] = Version[i].value;
			tempArr[4] = State[i].value;
			tempArr[5] = Creater[i].value;
			tempArr[6] = CreateTimestamp[i].value;
//			tempArr[7] = OldVersion[i].value;

			partData[idx++] = tempArr;
		}
	}
	opener.addPart(partData);

}
function addPartForProduct(checkPartOid,openerType){
	var oid = null;
	var checkpart = document.getElementsByName(checkPartOid);
	var linkPartOid = opener.document.getElementById("linkPartOid");
	var splitOid = linkPartOid.value.split("/");
	var Count= null;
	var addOid = null;
	oid = linkPartOid.value;

	for(var i = 0; i<checkpart.length; i++){
		if(checkpart[i].checked){
			Count = i;
			for(var j =0; j < splitOid.length; j++){
				if(splitOid[j] == checkpart[i].value){
					alert("중복된 제품(완성품)/부품이 있습니다. 다시 선택하세요");
					return;
				}
			}
			if( addOid == null){
				addOid = checkpart[i].value;
			}else{
				addOid = addOid + "/" +checkpart[i].value;
			}
			if( oid == null || oid == ""){
				oid = checkpart[i].value;
			}else{
				oid = oid + "/" +checkpart[i].value;
			}
		}
	}

	if(checkpart.length == 0){
		alert("제품(완성품) 또는 부품이 없습니다.");
		return;
	}else if(Count == null){
		alert("제품(완성품) 또는 부품을 선택하세요");
		return;
	}

	var url = "/Windchill/extcore/jsp/part/relatePart.jsp?oid="+oid+"&addOid="+addOid+"&openerType="+openerType;
	window.open( url, '', 'scrollbars=1,resizable=1,top=100px, left=100px,height=0,width=0');
}
function getPart( TableName , CheckBoxName , single ,openerType){

	var url ="/Windchill/extcore/jsp/part/ProPartSrcPopup.jsp?";
	var param	=	"&TableName="+ TableName +"&CheckBoxName=" + CheckBoxName+"&singleSelect="+single+"&openerType="+openerType+"&linkFlag=true";
	window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );

}

function getPartTemp( ParentType, IsUseBom,TableName , CheckBoxName , single ){

	var url ="/Windchill/extcore/jsp/part/ProPartSrcPopup.jsp?";
	var param  = "ParentType="+ ParentType +"&IsUseBom="+ IsUseBom +"&TableName="+ TableName +"&CheckBoxName=" + CheckBoxName+"&single="+single;
	window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );

}


function deleteTableListWithoutDoc( SelectedOid , TableName ) {
	var doc		=	document;
	var Obj		=	doc.getElementsByName(SelectedOid );
	var TableObj	=	doc.getElementById( TableName  );
	var Len		=	0;
	var childtbody = TableObj.getElementsByTagName("tbody");
	var bodyTr = childtbody[0].getElementsByTagName( "tr" );

	var TrueCount =0;
	for( var i =0; i < bodyTr.length ;i++ ){
		var bodyTds = bodyTr[i].getElementsByTagName( "td" );

		if(bodyTds[0].firstChild !=null && bodyTds[0].firstChild != ""){
			if (bodyTds[0].firstChild.checked) {
				TableObj.deleteRow(i+1);
				TrueCount ++;
			}
		}
	}
	if( TrueCount == 0 ){
		alert("삭제할 대상이 없습니다.");
		return false;
	}
}

function deleteTableList ( SelectedOid , TableName,LinkOid,cnt ) {
	var cntValue = null;
	if(cnt == "cnt"){
		cntValue = document.getElementById(cnt).value;
	}
	var Obj			=	document.getElementsByName(SelectedOid );
	var ObjValue    = 	document.getElementById(SelectedOid);
	var TableObj	=	document.getElementById( TableName  );
	var Len			=	0;

	var Oid = document.getElementById(LinkOid).value;
	var splitOid = Oid.split("/");
	var returnOid=null;
	Len = Obj.length  - 1;
	var TrueCount =0;

	if(Obj.length>0){
		for (var i = Len; i >= 0; i--) {
			if (Obj[i].checked) {
				var Count = i;
				if(cntValue != null && cntValue != "undefined"){
					Count = Count + parseInt(cntValue);
				}
				TableObj.deleteRow(Count+1);
				TrueCount ++;
			}
		}

	}


	if(document.getElementsByName(SelectedOid) == null){
		document.getElementById(LinkOid).value = "";
	}else{
		var SelectOid = document.getElementsByName(SelectedOid);

		for(var j = 0; j < SelectOid.length;j++){
			if(j==0){
				returnOid = SelectOid[j].value;
			}else{
				returnOid = returnOid + "/"+SelectOid[j].value;
			}
		}
		if(returnOid != null){
			document.getElementById(LinkOid).value = returnOid;
		}else{
			document.getElementById(LinkOid).value = "";
		}
	}
	if( TrueCount == 0 ){
		alert("삭제할 대상이 없습니다.");
		return false;
	}
}
function deleteTableListDraw ( SelectedOid , TableName,LinkOid ) {

	var Obj			=	document.getElementsByName(SelectedOid );
	var ObjValue    = 	document.getElementById(SelectedOid);
	var TableObj	=	document.getElementById( TableName  );
	var Len			=	0;

	var Oid = document.getElementById(LinkOid).value;
	var splitOid = Oid.split("/");
	var returnOid="";
	Len = Obj.length  - 1;
	var TrueCount =0;

	if(Obj.length>0){
		for (var i = Len; i >= 0; i--) {
			if (Obj[i].checked) {
				TableObj.deleteRow(i);
				TrueCount ++;
			}
		}

	}


	if(document.getElementsByName(SelectedOid).length == 1){
		document.getElementById(LinkOid).value = "";
	}else{
		var SelectOid = document.getElementsByName(SelectedOid);
		if(SelectOid.length != 0){
			for(var j = 1; j < SelectOid.length;j++){
				if(j==1){
					returnOid = SelectOid[j].value;
				}else{
					returnOid = returnOid + "/"+SelectOid[j].value;
				}
			}
		}
		document.getElementById(LinkOid).value = returnOid;
	}
	if( TrueCount == 0 ){
		alert("삭제할 대상이 없습니다.");
		return false;
	}

}
function deleteTableList_( SelectedOid , TableName ) {
	var Obj			=	document.getElementsByName(SelectedOid );
	var TableObj	=	document.getElementById( TableName  );
	var Len			=	0;

	Len = Obj.length  - 1;
	var TrueCount =0;
	if(Obj.length>0){
		for (var i = Len; i >= 0; i--) {
			if (Obj[i].checked) {
				TableObj.deleteRow(i+1);
				TrueCount ++;
			}
		}
		document.getElementById("Part_Oid").value = "";
	}
	if( TrueCount == 0 ){
		alert("삭제할 대상이 없습니다.");
		return false;
	}
}


function attachFile(){
	var attachTable = document.all.attachTable;
	trObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
	trObjClone = trObj.cloneNode("true");
	trObj.insertAdjacentElement("afterEnd", trObjClone);

	newTrObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
//	newTrObj.style.display = "block";
}
function delAttachFile(){
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


function searchDocPop(table){
	var popWidth = "1050";
	var popHeight = "600";
	var ml = (screen.availWidth - eval(popWidth)) / 3;
	var mt = (screen.availHeight - eval(popHeight)) / 3;
	docPop = window.open("/Windchill/extcore/jsp/document/techDoc/searchTechDocPicker.jsp?table="+table, "_blank", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
	docPop.focus();
}
function deleteDocList() {
	var docLen = document.frm.checkDocOid.length - 1;
	for (var i = docLen; i >= 0; i--) {
		if (document.frm.checkDocOid[i].checked) {
			document.all.docTable.deleteRow(i+1);
		}
	}
}

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


/**
 * Deprecated, use requestHandler.doRequest instead
 * @deprecated
 */
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


function addDoc(docData, target) {
	var docTable;
	var chkBox;
	var executorData = new Array();
	var tempData = null;
	var cnt = 0;
	var noticeFlag = false;
	var noticeMsg ="";
	var dupCnt = 0;
	docTable = document.getElementById(target);
	chkBox = document.getElementsByName("checkDocOid");

	if (chkBox.length > 0) {
		for (var i = 0; i < chkBox.length; i++) {
			for (var n = 0; n < docData.length; n++) {

				if (chkBox[i].value == docData[n][0]) {
					if (!noticeFlag){
						noticeMsg = "[" + docData[n][1] + "]";
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
			docPop.focus();
			return;

		}else{
			alert(noticeMsg+" 외 "+ dupCnt+"건이 이미 추가되었습니다.");
			docPop.focus();
			return;
		}
	}

	for (var i = 0; i < docData.length; i++) {
		if (docData[i][0] != ""){
			trObj = docTable.children(0).children(docTable.children(0).children.length - 1);
			trObjClone = trObj.cloneNode("true");
			trObj.insertAdjacentElement("afterEnd", trObjClone);
			newTrObj = docTable.children(0).children(docTable.children(0).children.length - 1);
			newTrObj.style.display = "block";
			newTrObj.children(0).children(0).value = docData[i][0];   //문서Oid
			newTrObj.children(0).children(1).value = docData[i][0];   //문서Oid

			newTrObj.children(1).innerHTML = "<a href=\"#\" onClick=\"showDetailView('" + docData[i][0] + "');return false;\">" + docData[i][1] + "</a>";
			newTrObj.children(2).innerHTML = docData[i][2];    //문서명
			newTrObj.children(3).innerHTML = docData[i][3];    //Version
			newTrObj.children(4).innerHTML = docData[i][4];    //상태
			newTrObj.children(5).innerHTML = docData[i][5];    //Version
			newTrObj.children(6).innerHTML = docData[i][6];    //상태
			cnt++;
		}

	}
	if(document.getElementById("linkDocNull") != null){
		document.getElementById("linkDocNull").style.display="none";
	}
	if (cnt > 0) {
		if (docPop != null)
			docPop.close();
	}

}




