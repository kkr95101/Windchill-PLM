
	/*
	 * 링크, 이미지 테두리 없애기
	 */
	function bluring(){
		if(event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG") document.body.focus();
	}
	//document.onfocusin = bluring;

	/*
	 * 입력값 체크 
	 */
	function isNullData(str){
		if(str == null) return true;
		str = str.trim();
		if(typeof(str) == 'undefined') return true;
		if(str == undefined) return true;
		if(str.length == 0) return true;
		for(var i=0;i<str.length;i++){
			if(str.charCodeAt(i) != 32) return false;
		}
		return true;
	}
	
	function checkNull(str){
		if(isNullData(str)) str = "";
		return str;
	}

	/*
	 *  getElementsByName() 으로 obj 입력
	 *  getRadioValue( document.getElementsByName("radio") );
	 */
	function getRadioValue(obj){
		
		var ret;
		var length = obj.length;
		for( var i=0; i < length; i++ ){
			if( obj[i].type == "radio" ){
				if( obj[i].checked ) ret = obj[i].value;
			}
		}
		return ret;
	}
	
	String.prototype.trim = function(){
	    return this.replace(/(^\s*)|(\s*$)/gi, "");
	}

	String.prototype.replaceAll = function(str1, str2) {
	    var temp_str = "";
	    if (this.trim() != "" && str1 != str2) {

	        temp_str = this.trim();
	        while (temp_str.indexOf(str1) > -1){
	            temp_str = temp_str.replace(str1, str2);
	        }
	    }
	    return temp_str;
	}
	
	/*
	 * 숫자입력 확인
	 * onblur=NumericCheck(this)
	 */
	function NumericCheck(obj)
	{
		var nowvar = obj.value;
		var fixvar = nowvar.replace(/,/gi,"");

		obj.value = fixvar;

		if(obj.value!="")
		{
			if(!checknumber(obj.value))
			{
				obj.value="";
				obj.focus();
			}
		}
	}
	
	function checknumber(evar){
		var r = isNaN(evar.replace(/-/gi,""));
		if(r)
		{
			alert("숫자만 입력가능 합니다.");
			return false;
		}else
		{
			return true;
		}
	}
	
	function goFramePage(frameName, url){
		
		var frame = parent.document.getElementById(frameName);
		if(frame == null) {
			alert(frameName + "인 frame은 존재하지 않습니다.");
		}
		else{
			frame.src = "/Windchill/extcore/jsp/inc/Loading.jsp?url=" + url;
		}
	}
	
	function goFrameLayoutPage(frameName, url){
		
		var frame = parent.document.getElementById(frameName);
		if(frame == null) {
			alert(frameName + "인 frame은 존재하지 않습니다.");
		}
		else{
			url = "/Windchill/extcore/jsp/inc/Loading.jsp?url=" + url;
			layout_AttachUrl(frame.contentWindow.dgLayout, 0, url);
		}
	}
	
	function loadUrl(url){
		url = "/Windchill/extcore/jsp/inc/Loading.jsp?url=" + url;
		return url;
	}
	
	function setObjectCHeight(objName){

		var cHeight = document.documentElement.clientHeight;
		var obj = document.getElementById(objName);
		obj.style.height = (cHeight-34) + "px";//-26;
	}

	function setInnerObjectCHeight(objName){

		var cHeight = document.documentElement.clientHeight;
		var obj = document.getElementById(objName);
		obj.style.height = (cHeight-3) + "px";
	}
	/*
	 * null인경우 다른 문자로 대체
	 */
	function replaceNullData(str, rstr){
		return isNullData(str) ? rstr : str;
	}
	
	/*
	 * Code Combobox의 XML를 얻기 위한 URL
	 */
	function getCategoryCodeUrl(category){ 
		return "/Windchill/servlet/dgt/DGCodeServlet?cmd=getCodeComboXML&category=" + category + "&isRoot=false&defaultText=--선택--";
	}
	
	/*
	 * Code Combobox의 XML를 얻기 위한 URL
	 */
	function getCategoryCodeUrl2(category){ 
		return "/Windchill/servlet/dgt/project/controller/getComboList?cmd=getCodeComboXML&category=" + category + "&isRoot=false&defaultText=--선택--";
	}
	
	/*
	 * Sub Code Combobox의 XML를 얻기 위한 URL
	 */
	function getSubCodeUrl(category, code){
		return "/Windchill/servlet/dgt/DGCodeServlet?cmd=getCodeComboXML&category=" + category + "&isRoot=false&selfcode=" + code;
	}

	function getCodeUrl(category, setCode){
		return "/Windchill/servlet/dgt/DGCodeServlet?cmd=getCodeComboXML&category=" + category + "&isRoot=true&setCode=" + setCode;
	}
	
    function getHostname(){
        return "http://" + location.hostname;
    }
    
	function checkSelected(gridobj){
		
		var checkedlist = gridobj.getCheckedRows(0);
		if(isNullData(checkedlist)){
			alert("선택된 로우가 없습니다.");
			return false;
		}
		else{
			return true;
		}
	}
	
	function layout_AttachUrl(layoutObject, idx, url){
		if(layoutObject == null){
			alert("DhtmlxLayout Object가 null입니다.");
			return;
		}
		
		var _url;
		if(url.indexOf(getHostname()) != 0)
			_url = getHostname() + url;
		else
			_url = url;
		
		try{
			layoutObject.items[idx].getFrame().contentWindow.document.location = _url;
		}catch(e){
			layoutObject.items[idx].attachURL(_url);
		}
	}
	
	function layoutLeft_AttachUrl(layoutObject, url){
		layout_AttachUrl(layoutObject, 0, url);
	}
	
	function layoutRight_AttachUrl(layoutObject, url){
		layout_AttachUrl(layoutObject, 1, url);
	}
	
	function parentLayoutLeft_AttachUrl(url){
		layoutLeft_AttachUrl(parent.layout,url);
	}
	
	function parentLayoutRight_AttachUrl(url){
		layoutRight_AttachUrl(parent.layout, url);
	}

	function onValidateError(input, value, result){
		alert("aaa");
		if(!result){
			var validateRole = input.validate;
			if(validateRole == "Empty"){
			}
			else if(validateRole == "NotEmpty"){
//				input.value = "필수 입력 항목입니다";
			}
			else if(validateRole == "ValidBoolean"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidEmail"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidInteger"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidNumeric"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidAplhaNumeric"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidDatetime"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidDate"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidTime"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidIPv4"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidCurrency"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidSSN"){
//				input.value = "형식이 올바르지 않습니다";
			}
			else if(validateRole == "ValidSIN"){
//				input.value = "형식이 올바르지 않습니다";
			}
		}
	}
	
	function disableDHTMLXEditor(dgEditor){
		var toolbar = dgEditor.tb;
		toolbar.forEachItem(function(item){
			toolbar.disableItem(item);
		});
		dgEditor.edDoc.body.disabled = true;
	}

	function openWindow(gourl,_width,_height,winname)
	{
	    var sw = screen.availWidth;
	    var sh = screen.availHeight;
	    
	    var px = (sw-_width)/2;
	    var py = (sh-_height)/2;

	    if(isNullData(winname))
	    {
	        winname = new Date().getTime();
	    }
	    WinOpenPop = window.open(gourl,winname,'width='+_width+',height='+_height+',top='+py+',left='+px+',resizable=yes,status=no,scrollbars=yes');
	    //return WinOpenPop;
	}
	
	function openWindowMaximum(gourl,winname)
	{
	    var sw = screen.availWidth;
	    var sh = screen.availHeight;
	    
	    var px = 0;
	    var py = 0;

	    if(winname=="")
	    {
	        winname = new Date().getTime();
	    }
	    WinOpenPop = window.open(gourl,winname,'width='+sw+',height='+sh+',top='+py+',left='+px+',resizable=yes,status=no,scrollbars=no');
	    //return WinOpenPop;
	}
	
	function openWindowFullScreen(gourl,_width,_height,winname)
	{
	    var sw = screen.availWidth;
	    var sh = screen.availHeight;
	    
	    var px = (sw-_width)/2;
	    var py = (sh-_height)/2;

	    if(winname=="")
	    {
	        winname = new Date().getTime();
	    }
	    WinOpenPop = window.open(gourl,winname,'width='+_width+',height='+_height+',top='+py+',left='+px+',fullscreen=yes,resizable=yes,status=no,scrollbars=no');
	    //return WinOpenPop;
	}
	
	function encodeUriParam(param){
		if(param == null || param == "") return param;

		return escape(encodeURIComponent(param));
	}
	
	/**
	 * adjusts a column's size to make all content visible
	 * @param grid
	 */
	function adjustColumn(grid){
		
		if(grid.getRowsNum() > 0){
			for(var i = 0 ; i < grid.getColumnCount() ; i++){
				grid.adjustColumnSize(i);
			}
		}
	}

	function checkSingleSelect(rId,cInd,state){
		if(state){
			var rows = this.getRowsNum();
			var cols = this.getColumnCount();
			for(var i=0; i < rows; i++){
				var _rId = this.getRowId(i);
				if(rId == _rId) continue;
				else this.cells(_rId, cInd).setValue(0);
			}
		}
	}
	
	function openProgressDiv(){
		var progress = document.getElementById("progressDiv");
		if(progress == null) return;
		
		progress.innerHTML = "<table width='100%' height='100%' border='0'><tr>	<td align='center' valign='middle'><img src='/Windchill/extcore/dhtmlx/imgs/dhxlayout_skyblue/dhxlayout_cell_progress.gif' border='0'/></td></tr></table>";
		progress.style.display = "block";
	}
	
	function closeProgressDiv(){
		var progress = document.getElementById("progressDiv");
		if(progress == null) return;
		
		progress.style.display = "none";
	}
	
	function view(oid){
		
		var url = "";
		if(oid.indexOf("DGDocument") > 0){
			url = "/Windchill/extcore/jsp/document/ViewDoc.jsp?oid="+oid+"&passSecurity=true";
			openWindow(url, 800, 600, "ViewDocWin");
		}
		else if(oid.indexOf("DGDistribution") > 0){
			url = "/Windchill/extcore/jsp/document/ViewDistribution.jsp?oid="+oid;
			openWindow(url, 800, 600, "ViewDistributionWin");
		}
		else if(oid.indexOf("DGChangeOrder") > 0){
			if(oid.indexOf("-") > 0){
				oid = oid.substring(6,oid.length);
				url = "/Windchill/extcore/jsp/change/ViewFirstEco.jsp?oid="+oid + "&popup=true";
				openWindow(url, 900, 800, "ViewFirstEcoWin");
			}else{
				url = "/Windchill/extcore/jsp/change/ViewEco.jsp?oid="+oid + "&popup=true";
				openWindow(url, 900, 800, "ViewEcoWin");
			}
		}
		else if(oid.indexOf("DGChangeRequest") > 0){
			url = "/Windchill/extcore/jsp/change/ViewEcr.jsp?oid="+oid + "&popup=true";
			openWindow(url, 800, 600, "ViewEcoWin");
		}
		else if(oid.indexOf("DGNCDeptReport") > 0){
			url = "/Windchill/extcore/jsp/change/ViewDeptNc.jsp?oid="+oid + "&popup=true";	
			openWindow(url,"750","650","ViewDeptNc");
		}
		else if(oid.indexOf("DGNCReport") > 0){
			url = "/Windchill/extcore/jsp/change/ViewNc.jsp?oid="+oid + "&popup=true";
			openWindow(url, 800, 900, "ViewNcWin");
		}
		else{
			//
			return;
		}
	}

	function checkStatus(state){
		
		if(state == "DG_WKI"){
			document.getElementById("DG_WKI").style.backgroundColor = "orange";
		}
		else if(state == "DG_ASI"){
			document.getElementById("DG_ASI").style.backgroundColor = "orange";
		}
		else if(state == "DG_RVI"){
			document.getElementById("DG_RVI").style.backgroundColor = "orange";
		}
		else if(state == "DG_AGI"){
			document.getElementById("DG_AGI").style.backgroundColor = "orange";
		}
		else if(state == "DG_DFI"){
			document.getElementById("DG_DFI").style.backgroundColor = "orange";
		}
		else if(state == "DG_DFD"){
			document.getElementById("DG_DFD").style.backgroundColor = "orange";
		}
		else if(state == "DG_RJD"){
			document.getElementById("DG_RJD").style.backgroundColor = "orange";
		}
		else if(state == "DG_RWK"){
			document.getElementById("DG_RWK").style.backgroundColor = "orange";
		}
		else if(state == "DG_RWKI"){
			document.getElementById("DG_RWKI").style.backgroundColor = "orange";
		}
		else if(state == "DG_RRVI"){
			document.getElementById("DG_RRVI").style.backgroundColor = "orange";
		}
		else if(state == "DG_RAGI"){
			document.getElementById("DG_RAGI").style.backgroundColor = "orange";
		}
		else if(state == "DG_RWK"){
			document.getElementById("DG_RWK").style.backgroundColor = "orange";
		}
		else if(state == "DG_RDFI"){
			document.getElementById("DG_RDFI").style.backgroundColor = "orange";
		}
		else if(state == "DG_RDFD"){
			document.getElementById("DG_RDFD").style.backgroundColor = "orange";
		}
		else if(state == "DG_RRJD"){
			document.getElementById("DG_RRJD").style.backgroundColor = "orange";
		}
		else if(state == "DG_ECI"){
			document.getElementById("DG_ECI").style.backgroundColor = "orange";
		}
	}

	function showDialogMaximum(url)
	{
	    var sw = screen.availWidth;
	    var sh = screen.availHeight;
	    var px = 0;
	    var py = 0;
		var rtnValue = window.showModalDialog(url, null, 'dialogWidth:'+sw+'px;dialogHeight:'+sh+'px;dialogTop:'+py+'px;dialogLeft:'+px+'px;resizable:yes;scrollbars:no');
		return rtnValue;
	}
	
	/*
	 * Window Modal Dialog 창 열기
	 * 기본 옵션 값 = "dialogWidth:600px;dialogHeight:800px;dialogTop:0px;dialogLeft:0px;resizable:yes;scroll:no;"
	 */
	function showDialog(url,array, option){
	    
		if(option != null && "" == option )
			option = "dialogWidth:600px;dialogHeight:800px;dialogTop:0px;dialogLeft:0px;resizable:yes;scroll:no;";
		
		var rtnValue = window.showModalDialog(url,array,option);
		
		return rtnValue;
	}
	
	function showCenterDialog(url, _width, _height){

	    var sw = screen.availWidth;
	    var sh = screen.availHeight;
	    var px = (sw-_width)/2;
	    var py = (sh-_height)/2;
	    
		var rtnValue = window.showModalDialog(url, null, "dialogWidth:"+_width+"px;dialogHeight:"+_height+"px;dialogTop:"+py+"px;dialogLeft:"+px+"px;resizable:yes;scroll:no;");
		return rtnValue;
	}
	
	/*
	 * Window Dialog 창에서 Save 버튼 클릭 이벤트
	 * (주의 사항)
	 * dgTabbar을 사용하여 만든 그리드만 동작 함
	 * 리턴 값은 각 그리드에서 선택한 row의 ouid 리스트를 string으로 전달함.
	 * 여러개의 경우는 구분자로 ","을 사용한다.
	 */
	function doSaveDialog(isMutiSelectMode){
		
		var rtn_ArrayValue = new Array(2);
		rtn_ArrayValue[0] = "";
		rtn_ArrayValue[1] = new Array();
		
		if(isMutiSelectMode == undefined) isMutiSelectMode = true;
		
		if(!isMutiSelectMode){
			var grid = dgTabbar.getActiveTabGrid();
			var checkedRows = grid.getSelectedRowId();
			
			if(grid != null && checkedRows!=null && checkedRows.length > 0 )
				rtn_ArrayValue = checkOuidDuplication(grid, rtn_ArrayValue,checkedRows);
		}else{
			
			var tabCount = dgTabbar.tabbar.getNumberOfTabs();
			
			for(var i=0; i< tabCount; i++){
				dgTabbar.tabbar.goToPrevTab();
			}
			

			for(var i=0; i< tabCount; i++){

				var grid = dgTabbar.getActiveTabGrid();
				
				var checkedRows = grid.getCheckedRows(0);
				
				if(checkedRows.length > 0){
					rtn_ArrayValue = checkOuidDuplication(grid, rtn_ArrayValue,checkedRows);
				}
				
				dgTabbar.tabbar.goToNextTab();
				
			}
		}
		
		window.returnValue = rtn_ArrayValue;	
		
		window.close();
	}
	
	/*
	 * Window Dialog 창에서 Close 버튼 클릭 이벤트
	 * (주의 사항)
	 * dgTabbar을 사용하여 만든 그리드만 동작 함
	 */
	function doCloseDialog(){
		
		var rtn_ArrayValue = new Array(2);
		rtn_ArrayValue[0] = "";
		rtn_ArrayValue[1] = new Array();
		
		window.returnValue = rtn_ArrayValue;
		window.close();
	}
	
	/*
	 * Window Dialog 창에서 Close 버튼 클릭 이벤트
	 * (주의 사항)
	 * dgTabbar을 사용하여 만든 그리드만 동작 함
	 * 각 그리드에서 선택한 ouid의 중복 체크
	 */
	function checkOuidDuplication(grid, tArrayList,sOuidlist ){
		var rtnvalue = tArrayList;
		
		if(tArrayList[0].length > 0) rtnvalue[0]+=",";
		
		var rowData = new Array();
		
		var target = tArrayList[0];
		var arrTarget = target.split(",");
		
		var source = sOuidlist;
		var arrSource = sOuidlist.split(",");
		
		var duplication = false;
		
		for(var i = 0;  i < arrSource.length; i++){
			duplication = false;
			
			for(var j = 0; j < arrTarget.length; j++){
				if(arrSource[i] == arrTarget[j]){
					duplication = true;
					break;
				}
			}
			
			if(!duplication){
				if(i != arrSource.length-1){
					rtnvalue[0] += arrSource[i] + ",";
				}else{
					rtnvalue[0] += arrSource[i];
				}
				
				var rowData= new Array();
				
				for(var k=0 ; k < grid.getColumnsNum(); k++){
					if(k!=0)
						rowData.push(grid.cells(arrSource[i],k).getValue());
					else
						rowData.push("0");
				}
				
				rtnvalue[1].push(rowData);
			}
		}
		
		return rtnvalue;
	}
	
	/*
	 * Window Dialog 창 호출 후 부모 창 Tabbar의 활성화 된 Grid에 row 추가 
	 * (주의 사항)
	 * dgTabbar을 사용하여 만든 그리드만 동작 함
	 */
	function addRowTabbarGrid(inDgTabbar, inOuidDataList, oid){
		
		if( inOuidDataList != null && inOuidDataList[0] != null && inOuidDataList[0] != ""){
			var ouidList = inOuidDataList[0].split(",");
			var rowsList = inOuidDataList[1];
			var grid = inDgTabbar.getActiveTabGrid();
			var duplication = false;
			
			for(var i = 0 ; i < ouidList.length ; i++){   //자기 자신 oid 체크
			if(oid !=null && oid!="" && ouidList[i]==oid) continue;
				
				duplication = false;
				for(var j=0; j < grid.getRowsNum(); j++){
					
					if(ouidList[i] == grid.getRowId(j)){
						duplication = true;
						break;
					}
					
				}
				if(!duplication && ouidList[i] != ""){
					rowsList[i][1] = grid.getRowsNum()+1;
					grid.addRow(ouidList[i],rowsList[i],grid.getRowsNum());
				}	
			}
		}
		
	}
	/*
	 * dgTabar 사용시 고정된 헤더의 마지막 컬럼의 폭을 증가 시키는 함수
	 * (주의 사항)
	 * dgTabbar을 사용하여 만든 그리드만 동작 함
	 * jsp 페이지의 onResize 및 search 함수의 grid 데이터 load 함수내에 사용
	 * onResize함수 에서 if(dgTabbar != null) resizeTabbarGridColum(dgTabbar.getActiveTabGrid());
	 * 
	 * 파라미터 :활성화 된 그리드를 넘기
	 */

	function resizeTabbarGridColum(grid){

		var gridTotalWidth = 4;
	    var isInitial = false;
		
	    if(grid == null) return;
	    
		for(var i=0; i < grid.getColumnsNum()-1; i++){
			gridTotalWidth+= grid.getColWidth(i); 
			
			if(isNaN(gridTotalWidth)){
				isInitial = true;
				break;
			}
				
		}
	
		//initial cell width
		if(isInitial){
			
			gridTotalWidth = 4;
			
			for(var i=0; i < grid.getColumnsNum()-1; i++){
				gridTotalWidth+= parseInt(grid.initCellWidth[i]); 
			}
		}
		
		
		var style = document.getElementById("tabbar").style;
		
		if(style.pixelWidth > gridTotalWidth)
			grid.setColWidth(grid.getColumnsNum()-1,style.pixelWidth - gridTotalWidth);
       
	}
	
	function setNavigationText(txt){
		
		var navSpan;
		if(document.getElementById("navSpan") != null) navSpan = document.getElementById("navSpan");
		else if(parent.document.getElementById("navSpan") != null) navSpan = parent.document.getElementById("navSpan");
		else if(parent.parent.document.getElementById("navSpan") != null) navSpan = parent.parent.document.getElementById("navSpan");
		
		if(navSpan != null) navSpan.innerText = txt;
		
	}
	
	function setTitleText(txt){
		
		var titleSpan;
		if(document.getElementById("titleSpan") != null) titleSpan = document.getElementById("titleSpan");
		else if(parent.document.getElementById("titleSpan") != null) titleSpan = parent.document.getElementById("titleSpan");
		else if(parent.parent.document.getElementById("titleSpan") != null) titleSpan = parent.parent.document.getElementById("titleSpan");
		
		if(titleSpan != null) titleSpan.innerText = txt;
	}
		
	
	function showUserDialog(creator, creatorOid){
		var array = new Array();
		var url = "/Windchill/extcore/jsp/org/SelectDGEmployee.jsp?isSingle=true&userSelect=true";
		
		var rtnValue = showDialog(url,array,option = "dialogWidth:750px;dialogHeight:600px;dialogTop:0px;dialogLeft:0px;resizable:yes;scroll:no;");
		
		if(rtnValue != null){
			document.getElementById(creatorOid).value = rtnValue[0];
			document.getElementById(creator).value = rtnValue[1];
		}
	}
	
	function doSaveUserDialog(){
		
		if(grid == null) return;

		if(!checkSelected(grid)){
			return;
		}
		else{
			var checkedlist = grid.getCheckedRows(0);
			var uoids = checkedlist.split(",");
			if(uoids.length > 1){
				alert("하나의 사용자만 체크해주세요\n Cheak only one user");
				return;
			}else{
				if( confirm("추가 하시겠습니까?\n Do you add?") ){
					var rtn_ArrayValue = new Array(2);
					rtn_ArrayValue[0] = checkedlist;
					rtn_ArrayValue[1] = grid.cells(checkedlist, 4).getValue()+" / "+grid.cells(checkedlist, 3).getValue() + grid.cells(checkedlist, 5).getValue();
					
					window.returnValue = rtn_ArrayValue;
					window.close();
				}
			}
		}
	}
	
	function doCloseUserDialog(){
		var rtn_ArrayValue = new Array(2);
		rtn_ArrayValue[0] = "";
		rtn_ArrayValue[1] = "";
		
		window.returnValue = rtn_ArrayValue;
		window.close();
	}
	
	function subcontractor(FullName, oid){  //협력업체 검색 후 체크 된 유저의 이름과 oid 반환
		
		var array = new Array();
		var url = "/Windchill/extcore/jsp/document/SearchSubcontractor.jsp?category=customer_category";
		
		var rtnValue = showDialog(url,array,option = "dialogWidth:520px;dialogHeight:500px;dialogTop:0px;dialogLeft:0px;resizable:yes;scroll:no;");
		
		if(rtnValue != null){
			document.getElementById(oid).value = rtnValue[0];
			document.getElementById(FullName).value = rtnValue[1];
		}
	}
	
	function openPrintableView(dhtmlxObject){
		
		if(dhtmlxObject == null) {
			alert("지정된 그리드가 없습니다.");
			return;
		}
		else{
			if(dhtmlxObject.tabbar != null){
				dhtmlxObject.getActiveTabGrid().printView();
			}
			else{
				dhtmlxObject.printView();
			}
		}
	}
	
	function resetCombo(dhtmlxComboObject){
		if(dhtmlxComboObject == null){
			alert("초기화할 콤보가 없습니다");
			return;
		}
		else{
			try{
				dhtmlxComboObject.setComboText("");
				dhtmlxComboObject.unSelectOption();
			}
			catch(e){
			}
		}
	}
	/*
	 * 관련 객체 추가 시 Grid의 번호를 정렬해준다
	 * 
	 * 파라미터 :활성화 된 그리드 , 번호의 Index   (보통 체크박스 있으면 번호 인덱스는 1)
	 */
	function alignNumber(gridName ,index){   
		var ids = gridName.getAllRowIds();
		if(index==null || index=="") index = 1;   
		if(ids==null || ids=="") return; 
		else{
			var rowIds = ids.split(",");
			for(var i=0 ; rowIds.length > i ; i++){
				gridName.cells(rowIds[i],index).setValue(i+1);
			}
		}
	}
	
	/**
	 * 조회된 grid row Count를 Tab 레이블에 표시해준다. ex) WBS => WBS [rowcount]
	 * @param dhtmlxTabbarObj
	 * @param id
	 * @param grid
	 */
	function setTabbarLabel(dhtmlxTabbarObj, id, grid){
		
		var tabbar = dhtmlxTabbarObj.getTabbar();
		var tabName = tabbar.tabs(id).getText();
		var pos = tabName.indexOf("[");
		if(pos != -1){
			tabName = tabName.substring(0, pos);
		}
		tabbar.tabs(id).setText(tabName+"["+ grid.getRowsNum() +"]");
	}
	
	
	
	