//도번 중복 검사

var HSize = "768px";
var WSize = "810px";


    function checkSystemNumber(number) {
        var frm = document.frm;
        
        if(number=='' || number == null) {
            alert("번호를 입력하세요.");
            return;
        }

        var iframe = document.getElementById("checkDuplicationFrame");
        iframe.src = "/Windchill/extcore/jsp/part/PartNumberDuplicateCheck.jsp?partNumber="+number+"&system=yes";
    }
    //제품 분류 combo가져오기
    function getClassCombo( type, key , obj , productObj , getNum  ) {
    	
    	if(getNum == null) getNum="Y";
    	var frm = document.frm;
       
        var iframe = document.getElementById("getClassFrame");
        var ProductValue = productObj.value;
        var mode			= frm.mode.value;
        if( ProductValue == 'undefined' )  ProductValue = "" ;
        
        iframe.src = "/Windchill/extcore/jsp/eco/ECOSelectProductClassSub.jsp?type="			+ type 
                                                                                                   + "&key="			+ key  
                                                                                                   + "&comboName="	+ obj.name
                                                                                                   + "&product="		+ ProductValue
                                                                                                   + "&getNum="		+ getNum
        																						   + "&mode="			+ mode;


    }   
    
    function comboSelectedText(obj){
    	var rtv ="";
    	
    	/*for( var i=0 ; i<obj.options.length ; i++ ){
    		
    		if( obj.options[i].selected == true ){
     			rtv = obj.options[i].text;
    			break;
    		}
    	}*/
    	rtv = obj.options[obj.options.selectedIndex].innerHTML;
    	return rtv;
    }
    
    function comboReset(obj ){
    	var firstOption = obj.options[0];
    	
    	obj.options.length = 0;
    	obj.add( firstOption );
   
    }
    
    
    function changeFolder(obj , getNum){
    	var targetObj ;
    	var key ;
    	 var frm = document.frm;
    	 
    	 var product	= frm.ProductClass;
    	 var location	= frm.LocationClass;
    	 var customer = frm.CustomerClass;
    	 var engine 	= frm.EngineClass;
    	 var draw		= frm.DrawClass;

    	
    	 
    	 var tempSpace = "EGR Cooler";
    	 
    	 tempSpace = "";
    	 var tempSlash= "/";
    	 
    	 var type ="";
    	 
    	 var searcher = checksearcher( frm.mode.value );
    	 
    	if( obj == product ){
    		
    		
    		comboReset( location );
    		comboReset( customer );
    		comboReset( engine );
    		if( searcher ){
     			comboReset( draw );
    		}
    		
    		targetObj = location ;
    		
    		key = tempSpace ;
    		type ="product";
    	}else if( obj == location ){
    		
    		comboReset( customer );
    		comboReset( engine );
       		if( searcher ){
     			comboReset( draw );
    		}
 
    		
    		
    		targetObj = customer ;
    		
    		key = tempSpace +tempSlash+ comboSelectedText(obj) ;
    		type ="location";
    	}else if( obj == customer ){
		
    		comboReset( engine );
       		if( searcher ){
     			comboReset( draw );
    		}
 
	
    		targetObj = engine ;
    		//alert(1);
    		//alert(comboSelectedText(location));
    		//alert(comboSelectedText(obj));
    		key = tempSpace +tempSlash+ comboSelectedText(location) 
    		                        +tempSlash+ comboSelectedText(obj) ;
    		//alert(3);
    		type ="customer";
    		//alert(4);
    		//alert(type); 
     	} else if( obj == engine ){
     		
       		if( searcher ){
     			comboReset( draw );
    		}
    		
     		targetObj = draw ;
    		
     		key = tempSpace +tempSlash+ comboSelectedText(location) 
    								+tempSlash+ comboSelectedText(customer) 
    		                        +tempSlash+ comboSelectedText(obj) ;
    		type ="engine";
     	} 
    	
    	getClassCombo( type, key , targetObj , product , getNum ) ;
    	
    }
    
    function getNumber(prefix , AutoNum){
     	var frm = document.frm;
     	frm.eco_no.value = prefix +AutoNum ;
     	
    	document.getElementById("ECO_Number_text").innerHTML = prefix +AutoNum ; 
    	frm.numSeq.value = AutoNum;
    	frm.prefix.value = prefix;
    	
    }

    // ECO 등록
    function createECO() {
        var frm = document.frm;
       
      //  var modelCategory = frm.modelCategory[frm.modelCategory.selectedIndex].value;
        if (checkModelValidation('create')) {
            if(!confirm("ECO을 등록하시겠습니까?")) {
                return;
            } else {

                frm.action = "/Windchill/servlet/ext/ChangeAction";
                frm.submit();
            }
        }

    }
     
    //ECO 수정
     function updateECO() {
        var frm = document.frm;
       
      //  var modelCategory = frm.modelCategory[frm.modelCategory.selectedIndex].value;
        //if (checkModelValidation('create', modelCategory)) {
            if(!confirm("ECO을 수정하시겠습니까?")) {
                return;
            } else {
            	checkboxChecker("PartOid");
            	checkboxChecker("ProductOid");
            	checkboxChecker("LinkedConformDrawOID");
                frm.action = "/Windchill/servlet/ext/ChangeAction";
                frm.submit();
            }

    }

     function checkModelValidation(mode){
    	 var doc = document;
    	 
    	 if('create' == mode ){
    	 
	    	 var engineClass = doc.getElementById("EngineClass");
	    	 if(engineClass.value == ''){
	    		 alert("제품분류를 선택해 주시기 바랍니다.");
	    		 
	    		 return false;
	    	 } else return true;
    	 }
     }
     
     
     function checkboxChecker( checkboxId ){
    	 
    	 
    	 var checkBoxs = document.getElementsByName( checkboxId );
    	 for(var i =0; i < checkBoxs.length ; i++){
    		 checkBoxs[i].checked = true;
    	 }
     }
     
     function ParentStyleHeightECO(count){
    	 var doc = parent;
    	 doc.setSearchStylehheight(count);
    	 searchECO();
     }
     //ECO 검색
     function searchECO() {
        var frm = document.frm;
        
      
       // if ( checkProductValidation() ) {
	        frm.action = "/Windchill/extcore/jsp/eco/EcoSrcSubIframe.jsp?sessionid=";

	        frm.target = "getSearchECO";
	        frm.submit();
       // }
 
    }    
     //ECO 검색 Pop
     function searchECOPop() {
        var frm = document.frm;
        
      
       // if ( checkProductValidation() ) {
	        frm.action = "/Windchill/extcore/jsp/eco/EcoSrcIframe.jsp?sessionid=";

	        frm.target = "getSearchECOPop";
	        frm.submit();
       // }
 
    }   
     
     // 페이징
     function gotoPage(page, content, cmdMenu) {
    	 
    	 var frm = document.frm;
     	 frm.method = "post";
         
         if( frm.mode.value == 'searchECO' ){
        	 frm.action = "/Windchill/extcore/jsp/eco/EcoSrcSubIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
        	 frm.target = "getSearchECO";
        	 
         }else if( frm.mode.value == 'searchECOpop' ){
        	 frm.action = "/Windchill/extcore/jsp/eco/EcoSrcIframe.jsp?page="+page+'&sessionid='+frm.sessionid.value;
        	 frm.target = "getSearchECOPop";
        	 
         }else if( frm.mode.value == 'searchPartPopeco' ){
        	 frm.target = "getPagePopup";
        	 frm.action = "/Windchill/extcore/jsp/eco/ECOPartSrcSubIframePopup.jsp?page="+page+'&sessionid='+frm.sessionid.value;
         }
         
          frm.submit();
     }
     
    
     
     
     // ECO 상세화면 보기
     
     function showECODetailView( oid ){
    	// obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 
    	 var url ="/Windchill/extcore/jsp/eco/ECODTL.jsp?oid="+oid;
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
    	 
     }

     
     //ECO 등록 페이지
     function showCreateECO(  ){
    	 //obj.location.href = "/Windchill/extcore/jsp/part/ProProductCrt.jsp"; 
    	 
    	 var url ="/Windchill/extcore/jsp/eco/ECOCrt.jsp";
    	 window.open( url , 'CRT', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
     }
 
  
     //ECO 수정 페이지
     function showUpdateECO( oid ){
    	  var url ="/Windchill/extcore/jsp/eco/ECOUpt.jsp?oid="+oid;
    	 
    	 document.location.href = url;
   
     }
     //ECO 삭제
     function deleteECO( oid ){
    	var frm = document.frm;
     	frm.mode.value="deleco";
     	   	 
     	 if(!confirm("ECO를 삭제하시겠습니까?")) {
              return;
          } else {
          	 frm.action = "/Windchill/servlet/ext/ChangeAction";
              frm.submit();
          }
     }

     
     
     //ECO검색 validation
     function checkECOValidation(){
    	 return true;
     }
 
     
// 이력정보 팝업
     
     function showECOHistoryView( oid ){
    	// obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
    	 var url ="/Windchill/extcore/jsp/part/ProHistoryDTL.jsp?oid="+oid; 
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
     }
     
     
     //mode값이 search 계열 즉 단계( draw ) 값을 사용하는 페이지면 true를 리턴
     function checksearcher( str ){
    	 var rtv = false;
    	 var searcher = new Array( "" , "searchProduct"  );

    	 for( var i=0 ; i<searcher.length; i++ ){
    		 if( searcher[i] == str ){
    			 rtv = true ;
    			 break;
    		 }
     	 }
    	 return rtv;
     }
     

     function setpart( ParentType, IsUseBom, OpenerPartTableName  ,CheckBoxName , bomManager , single  ){
    	 var doc = opener;
    	 
    	
     	 if ( bomManager ==null || bomManager == "undefined"|| bomManager == "" ) bomManager ="bomManager";
     	 
     	if ( single ==null || single == "undefined" ) single = false;
     	 
    	 // dtemlx 형식에서 요청한것인지 일반 jsp에서 요청한것인지에 따른 리턴 패턴
    	 if( ParentType == "normal" ){
    	    	//일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.
    	    	
    		 doc.addElementTr( makeSubTr( IsUseBom , bomManager, single , CheckBoxName ) , OpenerPartTableName );
   	    	doc.addChildPart(CheckBoxName);
    	 }
    	 
    	// self.close();
     }


     function makeSubTr( IsUseBom , bomManager , single , CheckBoxName ){
    	 
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
     	
     	var resultTable	= doc.getElementById( OpenerPartTableName );

     	var parenttbodys	= resultTable.getElementsByTagName("tbody");
     	var parenttbody	= parenttbodys[0];

     	
     		for( var i =0; i < parenttbodys.length ;i++ ){

     			
       			resultTable.removeChild( parenttbodys[ i ] );

       		}
     		 
     		var childtbody = null;

     		if( OpenerPartTableName == "resultProductTable" ){
	     		var mPartChecker = doc.getElementById( "mProductChecker" );
	        	if	( mPartChecker != null && mPartChecker != 'undefined' ){
	   	    	 
	       	    	 if( mPartChecker.value == 'true' ){
	
	       	    		 parenttbody = doc.createElement( "tbody" ) ;
	       	    		 mPartChecker.value = 'false';
	       	           	
	       	    	 }
	        	}
     		} else {
         		var mPartChecker = doc.getElementById( "mPartChecker" );
            	if	( mPartChecker != null && mPartChecker != 'undefined' ){
       	    	 
           	    	 if( mPartChecker.value == 'true' ){

           	    		 parenttbody = doc.createElement( "tbody" ) ;
           	    		 mPartChecker.value = 'false';
           	           	
           	    	 }
            	}    			
     		}

     		 
    	    childtbody = resultTable.appendChild( parenttbody );
       		
     		
     		for( var j=0 ; j < tr.length ; j++ ){
     			
     			var trTds	=	tr[j].getElementsByTagName("td");
     			var tableTrs	= parenttbody.getElementsByTagName("tr");
     			var trcount	=	tableTrs.length;

     			for ( var k=0;k<trcount; k++ ){
     				
     				var tableTds	= tableTrs[k].getElementsByTagName("td");
			
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
     		//if (tr.length > 0){
	       //     alert( tr.length+"건이 추가되었습니다.");
     		//}
     		var divListTable01 = doc.getElementById("divListTable01");
     	    divListTable01.className="divListTable";
      	    styleListTable (divListTable01);
      	    
      	    return tr.length;
     }
     
     function addParts() {

    	 var SelectedOid			= document.getElementsByName("SelectedOid");
    	 var part_Number			= document.getElementsByName("part_NumberText");
    	 var part_Name			= document.getElementsByName("part_NameText");
    	 var Version				= document.getElementsByName("VersionText");
    	 var State					= document.getElementsByName("StateText");
    	 var Creater				= document.getElementsByName("CreaterText");
    	 var CreateTimestamp	= document.getElementsByName("CreateTimestampText");
    	 var OldVersion			= document.getElementsByName("OldVersionText");
    	 
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
                  
                 tempArr[0] = SelectedOid	[i].value;
                 tempArr[1] = part_Number[i].value;
                 tempArr[2] = part_Name[i].value;
                 tempArr[3] = Version[i].value;
                 tempArr[4] = State[i].value;
                 tempArr[5] = Creater[i].value;
                 tempArr[6] = CreateTimestamp[i].value;
                 tempArr[7] = OldVersion[i].value;


                 partData[idx++] = tempArr;
             }
         }
         opener.addPart(partData);
         
     }
     
     function getPart( ParentType, IsUseBom,TableName , CheckBoxName , single ){
    	 
    	 var url ="/Windchill/extcore/jsp/eco/ECOPartSrcPopup.jsp?";
    	 var param	=	"ParentType="+ ParentType +"&IsUseBom="+ IsUseBom +"&TableName="+ TableName +"&CheckBoxName=" + CheckBoxName+"&single="+single;
    	 param	=  param + "&parttype=Part"	;
    	 window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
    	 
     }
     
     function getProduct( ParentType, IsUseBom,TableName , CheckBoxName , single ){
    	 
    	 var url ="/Windchill/extcore/jsp/eco/ECOPartSrcPopup.jsp?";
    	 var param	=	"ParentType="+ ParentType +"&IsUseBom="+ IsUseBom +"&TableName="+ TableName +"&CheckBoxName=" + CheckBoxName+"&single="+single;
    	       param	= param + "&parttype=Product"	;
    	 window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
    	 
     }
     
     
     
     function deleteTableList( SelectedOid , TableName ) {
  	    var Obj			=	document.getElementsByName(SelectedOid );
  	    var TableObj	=	document.getElementById( TableName  );
  	    var Len			=	0;

  	    Len = Obj.length  - 1;

  	    if(Obj.length>0){
	  	    for (var i = Len; i >= 0; i--) {
	  	        if (Obj[i].checked) {
	  	        	TableObj.deleteRow(i+1);
	  	        }
	  	    }
  	    }else{
  	    	alert("삭제할 대상이 없습니다.");
  	    }
  	}
     
     
     
     
     function attachFile(){
    	    var attachTable = document.all.attachTable;
    	    trObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
    	    trObjClone = trObj.cloneNode("true");
    	    trObj.insertAdjacentElement("afterEnd", trObjClone);

    	    newTrObj = attachTable.children(0).children(attachTable.children(0).children.length - 1);
//    	    newTrObj.style.display = "block";
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
    	 	var popWidth = "860";
    	    var popHeight = "600";
    	    var ml = (screen.availWidth - eval(popWidth)) / 3;
    	    var mt = (screen.availHeight - eval(popHeight)) / 3;
    	    docPop = window.open("/Windchill/extcore/jsp/document/searchDocLinkPopup.jsp?table="+table, "_blank", "top=" + mt + ", left=" + ml + ", status=yes, toolbar=no, location=no, directories=no, menubar=no,scrollbars=1,resizable=yes,width=" + popWidth + ",height=" + popHeight);
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
                 newTrObj.children(1).innerHTML = "<a href=\"javascript:showDetailView('" + docData[i][0] + "');\">" + docData[i][1] + "</a>";
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
     
     //부품 검색 popup
     function searchPartPop(single) {
        var frm = document.frm;
        
        if(single == null || single == 'undefined' ) single = false;
      
        if ( checkPartValidation() ) {
	        frm.action = "/Windchill/extcore/jsp/eco/ECOPartSrcSubIframePopup.jsp?sessionid=&single="+single;
	        
	        frm.target = "getSearchPartPopup";
	        frm.submit();
        }
 
    }   
     
     //부품검색 validation
     function checkPartValidation(){
    	 return true;
     }

     
     
     // 제품 상세화면 보기
     
     function showProductDetailView(obj , oid){
    	// obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 
    	 var url ="/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
    	 
     }
     
    // 부품 상세화면 보기
     
     function showPartDetailView( obj , oid ){
    	// obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
    	 var url ="/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
     }
     
     
     //도면상세 팝업
     function showdrawDetailView(oid){
    	 var url = "/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
     }
     
     
     
     //bom창 열기
     
     function showBOMEditor(oid){
    	// var url ="/Windchill/extcore/jsp/bom/BomEditorCnt.jsp?oid="+oid;
    	 var url ="/Windchill/extcore/jsp/bom/ViewBom.jsp?oid="+oid;
    	 window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
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

     
     function setEcoSrcfield(tr){
 	    var doc = document;
 	 
 	    if(tr !=null && tr !='undefined' && tr.length>0){
	    		var trTds	=	tr[0].getElementsByTagName("td");
	    		
	    		doc.getElementById("partoid").value	= 	getElementValue( trTds[0].childNodes , "SelectedOid" ) ;
	    		doc.getElementById("partno").value		= 	getElementValue( trTds[2].childNodes , "part_NumberText" ) ;
	    		
	    		alert( "제품 (부품) [ "+doc.getElementById("partno").value+" ]이 추가 되었습니다."  );
  		}
  }
     
     function resetpart(){
    	 document.getElementById("partoid").value	= 	"";
    	 document.getElementById("partno").value	= 	"";
     }
     
     
     
     
     function setEco( OpenerPartTableName  ,CheckBoxName ){
    	 var doc = opener;
    	 var tr = makeSubEcoTr( CheckBoxName );
	   	  if(tr != null && tr != ''){
	    	  var count = doc.addElementEcoTr( makeSubEcoTr( CheckBoxName ) , OpenerPartTableName );
	   	     
		    	 if(count>0){
		    		 alert("추가하였습니다.");
		    		 self.close();
		    	 }
	    	  }else {
	    		  alert("ECO를 선택해 주십시오.");
	    	  }
	     }
     
     function makeSubEcoTr( CheckBoxName ){
    	 
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
     		    					var tempBodyTd = tempTr.getElementsByTagName( "td" ) ;
     		    					 
       		    	   					if( tempBodyTd[0].firstChild != null ){
    		    	   						
     		    	   						if( tempBodyTd[0].firstChild.id == "SelectedOid" ){
     		    	   							
     		    	   							var type	= "checkbox";
     		    	   							var id		= CheckBoxName;
     		    	   							var name	= CheckBoxName;
     		    	   							var value	= tempBodyTd[0].firstChild.value;
     		    	   							

     		    	   					        tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );
     		    	   					        tempBodyTd[0].innerHTML = "<INPUT type='checkbox' id='"+CheckBoxName
     		    	   					                                                    +"' name='"+CheckBoxName
     		    	   					                                                   +"' value='"+value+"' >";
      		    	   						}
     		    	   					}
      		    				CheckCount[counter_Length]=tempTr;
     						}
     					}
     				}
     			}
     		}
     		return CheckCount;
       }

     