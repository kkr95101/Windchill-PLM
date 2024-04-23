<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/Windchill/extcore/dhtmlx/dhtmlx.css" />
<script type="text/javascript" src="/Windchill/extcore/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<style>
	div#content {
		width: 1400px;
		height: 800px;
	}
	div#content > div#partTable {
		width: 100%;
		height: 400px;
	}
</style>
<script>
	$(document).ready(function() {
		onLoad();
	})
	
	let partGrid;
	
	function onLoad() {
		partGrid = new dhtmlXGridObject("partTable");
		partGrid.setImagePath("/Windchill/extcore/dhtmlx/imgs/");
		partGrid.setHeader("이름,버전,타입,재료,색깔");
		partGrid.setColumnIds("displayName,iteration,partType,material,color");
		partGrid.setInitWidthsP("20,30,20,20,20");
		partGrid.setColAlign("center,left,left,center,center");
		partGrid.setColTypes("ro,ro,ro,ro,ro");
		partGrid.enableResizing("false,false,false,false,false");
		partGrid.setSkin("dhx_skyblue");
		partGrid.setColSorting("str,str,str,str,str");
		partGrid.enableResizing("false,false,false,false,false");
		partGrid.setPagingSkin("bricks");
		partGrid.enableBlockSelection();
		partGrid.enablePaging(true, 10, 10, "pagingArea", true, "infoArea");
		partGrid.init();
	}
	
	function getPartList() {
		
		var queryString = $("form[name=frm]").serialize();
		$.ajax({
		    url: "/Windchill/servlet/dgt/part/partSearchAjax",
		    type: 'post',
		    dataType : 'json',
		    data:  queryString,  // You don't need to use {} inside data because it automatically converts to JSON format, so you can just use it as is!
		    success: function(data) {
		        partGrid.clearAll();
		        partGrid.parse(data.partList, "js");
		    },
		    error: function(request, status, error) {
		        alert("에러 발생: " + error);
		        console.log(error);
		    }
		});
	}
	
	function enterKeydown(){
		if(window.event.keyCode == 13){
			getPartList();
			
		}
		
	}
</script>
</head>
<body>
	<form id="frm" name="frm" onsubmit="return false">
	<input type="text" id="name" name="name" placeholder="파트이름을 입력하세요" onkeydown="enterKeydown()">
	<a href="#" onclick="getPartList()">파트이름으로 찾기</a>
	</form>
	<div id="partTable" style="width: 1000px; height: 400px;"></div>
	<div id="pagingArea"></div>
	<span id="infoArea"></span>
</body>
</html>