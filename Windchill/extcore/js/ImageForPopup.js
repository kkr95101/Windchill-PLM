//도번 중복 검사
    
var HSize = "768px";
var WSize = "1024px";
  //도번 중복체크
  function checkSystemNumber_(number) {
        var frm = document.frm;
        //alert(number);
        if(number=='' || number == null) {
            alert("번호를 입력하세요.");
            return;
        }

        var iframe = document.getElementById("checkDuplicationFrame");
        iframe.src = "/Windchill/extcore/jsp/caddoc/CadNumberDuplicateCheck.jsp?cadNumber="+number+"&system=yes";
    }
    //제품 분류 combo가져오기
    function getClassCombo_( type, key , obj , productObj , getNum  ) {
    
      //alert(type);
      if(getNum == null) getNum="Y";
      var frm = document.frm;
       //alert(document.location.href);
        var iframe = document.getElementById("getClassFrame");
        var ProductValue = productObj.value;
        
        if(ProductValue == 'undefined')  ProductValue = "" ;
        
        iframe.src = "/Windchill/extcore/jsp/caddoc/ProSelectProductClassSub.jsp?type="+type+"&key="+key+"&comboName="+obj.name+"&product="+ProductValue+"&getNum="+getNum;                                                                                           

    }   
    
    function comboSelectedText(obj){
      var rtv ="";
      for( var i=0 ; i<obj.options.length ; i++ ){
        if( obj.options[i].selected == true ){
          
          rtv = obj.options[i].text;
          break;
        }
      }
      
      return rtv;
    }
    
    function comboReset(obj ){
      var firstOption = obj.options[0];
      
      obj.options.length = 0;
      obj.add( firstOption );
   
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
    
    function changeFolder_(obj , getNum){
        var targetObj ;
      var key ;
       var frm = document.frm;
       
       var product  = frm.ProductClass;
       var location = frm.LocationClass;
       var customer = frm.CustomerClass;
       var engine   = frm.EngineClass;
       var draw   = frm.DrawClass;
      
       
      
       
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
        getClassCombo_( type, key , targetObj , product , getNum ) ;
      }else if( obj == location ){
        
        comboReset( customer );
        comboReset( engine );
          if( searcher ){
          comboReset( draw );
        }
 
        
        
        targetObj = customer ;
        
        key = tempSpace +tempSlash+ comboSelectedText(obj) ;
        type ="location";
        getClassCombo_( type, key , targetObj , product , getNum ) ;
      }else if( obj == customer ){
        
        comboReset( engine );
          if( searcher ){
          comboReset( draw );
        }
 
        
        targetObj = engine ;
        
        key = tempSpace +tempSlash+ comboSelectedText(location) 
                                +tempSlash+ comboSelectedText(obj) ;
        type ="customer";
        getClassCombo_( type, key , targetObj , product , getNum ) ;
      } else if( obj == engine ){
        
          if( searcher ){
          comboReset( draw );
        }
        
        targetObj = draw ;
        
        key = tempSpace +tempSlash+ comboSelectedText(location) 
                    +tempSlash+ comboSelectedText(customer) 
                                +tempSlash+ comboSelectedText(obj) ;
        type ="engine";
        getClassCombo_( type, key , targetObj , product , getNum ) ;
      }  else if(obj == draw){
        frm.Cad_Number.value = "";
        if(draw.value =="승인도"){
          alert("승인도의 도면번호는 자동채번됩니다.");
          autoNumber();
          bntDisplay(draw.value);
         }else{
           bntDisplay(draw.value)
         } 
        
    }
      
      
      
    }
    //도면검색 팝업
    function searchDrawPop(single) {
        var frm = document.frm;
        
        if(single == null || single == 'undefined' ) single = false;
      
        if ( checkshowPartValidation() ) {
          frm.action = "/Windchill/extcore/jsp/caddoc/ProDrawSrcSubIframePopup.jsp?sessionid=&single="+single;
          
          frm.target = "getSearchDrawPopup";
          frm.submit();
        }
    }
    //부품검색 validation
    function checkshowPartValidation(){
     return true;
    }
    function DaddElementTr(  tr, OpenerPartTableName ,checker ){

     
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

         var mChecker = doc.getElementById( checker );
         
           if ( mChecker != null && mChecker != 'undefined' ){
            
             if( mChecker.value == 'true' ){

               parenttbody = doc.createElement( "tbody" ) ;
               mChecker.value = 'false';
                  
             }
           }
         
           childtbody = resultTable.appendChild( parenttbody );
          
        
        for( var j=0 ; j < tr.length ; j++ ){
          
          var trTds = tr[j].getElementsByTagName("td");
          var tableTrs= parenttbody.getElementsByTagName("tr");
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
 
  


     
     
     //제품부품검색 페이징
     function gotoPage(page, content, cmdMenu) {
       
       var frm = document.frm;
       frm.method = "post";
         frm.target = "getSearchDrawPopup";
         if( frm.mode.value == 'searchDrawPopup' ){
           frm.action = "/Windchill/extcore/jsp/caddoc/ProDrawSrcSubIframePopup.jsp?page="+page+'&sessionid='+frm.sessionid.value;
         }
         frm.submit();
     }
     
    
     
     
     // 제품 상세화면 보기
     
     function showProductDetailView(obj , oid){
      // obj.location.href = "/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid; 
       var url ="/Windchill/extcore/jsp/part/ProProductDTL.jsp?oid="+oid;
       window.open( url , 'DTL', 'top=100px, left=100px height=800px, width=1024px' );
       
     }
     
    // 부품 상세화면 보기
     
     function showPartDetailView( obj , oid ){
       obj.location.href = "/Windchill/extcore/jsp/part/ProPartDTL.jsp?oid="+oid; 
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
       window.open( url , 'HIS', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
      }
     //수정창
     function showUpdateImageDraw(oid){
       var url ="/Windchill/extcore/jsp/caddoc/ImageDrawUpt.jsp?oid="+oid;
       document.location.href = url;
     }
     //개정창
     function revisionImageDraw() {
         var frm = document.frm;
        
         frm.mode.value = "RevisionDraw";
             if(!confirm("도면을 개정하시겠습니까?")) {
                 return;
             } else {
              
                 frm.action = "/Windchill/servlet/ext/ImageDrawAction";
                 frm.submit();
             }

     }
     function deleteImageDraw(){
       var frm = document.frm;
       
      frm.mode.value="delDraw";
           
       if(!confirm("도면을 삭제하시겠습니까?")) {
             return;
         } else {
           frm.action = "/Windchill/servlet/ext/ImageDrawAction";
             frm.submit();
         }
       
     }
     function showDrawDetailView(obj , oid){
       var url ="/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
       window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
     }
     //상세 팝업
     function showVerDetailView(oid){
       var url = "/Windchill/extcore/jsp/caddoc/viewDGImageDraw.jsp?drwOid="+oid;
       window.open( url , '', 'scrollbars=1,resizable=1,top=100px, left=100px, height='+HSize+', width='+WSize );
     }
     function bntDisplay(value){
        
       var autoNum = document.getElementById("autoNum");
       var duplication = document.getElementById("duplication");
      
       if(value =="승인도"){
         duplication.style.display="none";
         autoNum.style.display ="block";
      }else if(value =="시작" || value =="양산") {
         duplication.style.display="block";
         autoNum.style.display ="none";
      }else{
         duplication.style.display="none";
         autoNum.style.display ="none";
      }
        
    }
     function autoNumber(){
       var frm = document.frm;
       frm.Cad_Number.readOnly = true;   
     }
     function ValidateCheck(){
       var frm = document.frm;
       var Cad_Name = frm.Cad_Name.value;
       var Cad_Num = frm.Cad_Number.value;
       if(Cad_Name == null || Cad_Name == "" || Cad_Name == "undefined" || Cad_Name =="null"){
         alert("도면명을 입력하세요 ");
         return false;
       }else if(Cad_Num == null || Cad_Num == "" || Cad_Num == "undefined" || Cad_Num=="null"){
         alert("도면번호를 입력하세요");
         return false;
       }else{
         return true;
       }
     }
     
     
     function setDraw ( ParentType, OpenerPartTableName ,CheckBoxName , single , checker ){
       
       var doc = opener;
      if ( single ==null || single == "undefined" ) single = false;
       
       // dtemlx 형식에서 요청한것인지 일반 jsp에서 요청한것인지에 따른 리턴 패턴
       if( ParentType == "normal" ){
            //일반 jsp라면 선택한 정보를 기준으로 tr을 생성해서 parent table을 세팅해 준다.
         
         doc.DaddElementTr( DmakeSubTr( single , CheckBoxName ) , OpenerPartTableName , checker );
            
       }
       self.close();
     }
     
     function getDraw( ParentType,TableName ,CheckBoxName ,single , checker ){
       var url ="/Windchill/extcore/jsp/caddoc/searchDrawPopup.jsp?";
       var param  = "ParentType="+ ParentType +"&TableName="+ TableName 
                      +"&CheckBoxName=" + CheckBoxName+"&single="+single
                      +"&checker=" + checker;
       window.open( url+param , '', 'scrollbars=1,resizable=1,top=100px, left=100px,height='+HSize+', width='+WSize );
     }
     function DmakeSubTr( single ,CheckBoxName){
       
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
                    
                    var type = 'radio';

                    if ( single ){
                      type = 'checkbox';
                    }

                    var tempBodyTd = tempTr.getElementsByTagName( "td" ) ;
                    if( tempBodyTd[0].firstChild != null ){
                    
                      if( tempBodyTd[0].firstChild.id == "SelectedOid" ){
                        
                        //var type  = tempBodyTd[0].firstChild.type;
                        //var id    = tempBodyTd[0].firstChild.id;
                        //var name  = tempBodyTd[0].firstChild.name;
                        var value = tempBodyTd[0].firstChild.value;
                        
                      
                            tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );
                            
                            var input = document.createElement( "INPUT" ) ;
                            
                            input.type  = type;
                            input.id  = CheckBoxName;
                            input.name  = CheckBoxName;
                            input.value = value;
                             //alert(input.id);
                            tempBodyTd[0].appendChild( input );
                          
                      
                      }
                    }
                    
                    if( CheckBoxName == 'LinkedConformDrawOID'){ 
                      deleteViewDrawTd( tempTr );
                    }else{
                      deleteCustomer_CNTd( tempTr );
                    }
                    
                   //parent의 요청형식이 관리를 포함하고 있는지를 구분
                    
                    
                    
                    CheckCount[counter_Length]=tempTr;
                    
                }
              }
            }
          }
        }
        return CheckCount;
      }
     
     function deleteViewDrawTd( tempTr ){
       
      var bodyTd = tempTr.getElementsByTagName( "td" ) ;
        for( var k =0; k < bodyTd.length ;k++ ){

          if( bodyTd[k].id != null ){
            if( bodyTd[k].id == "ViewImage" ){
                  tempTr.removeChild( bodyTd[k] );
                  break;
            }
          }
          /*if(k == 1) {
            tempTr.removeChild( bodyTd[k] );
            break;
          }*/
        }
        return tempTr;
     }
     
     function deleteCustomer_CNTd( tempTr ){
       
      var bodyTd = tempTr.getElementsByTagName( "td" ) ;
        for( var k =0; k < bodyTd.length ;k++ ){

          if( bodyTd[k].id != null ){
            if( bodyTd[k].id == "Customer_CN" ){
                  tempTr.removeChild( bodyTd[k] );
                  break;
            }
          }
          /*if(k == 1) {
            tempTr.removeChild( bodyTd[k] );
            break;
          }*/
        }
        return tempTr;
  }
     