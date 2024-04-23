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
	#docTable {
		width: 1200px;
		height: 400px;
	}
</style>
<script>
	$(document).ready(function() {
		onLoad();
	})
	
	let docGrid;
	
	function onLoad() {
		docGrid = new dhtmlXGridObject("docTable"); 
		docGrid.setImagePath("/Windchill/extcore/dhtmlx/imgs/");
		docGrid.setHeader("이름,내용,회원이름,회원나이,이터레이션,idA2A2,사용자성별,사용자조직");
		docGrid.setColumnIds("displayName,description,userName,userAge,iteration,idA2A2,userSex,userOrg");
		docGrid.setInitWidthsP("10,10,10,10,10,10,10,10");
		docGrid.setColAlign("center,center,center,center,center,center,center,center");
		docGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
		docGrid.setColSorting("str,str,str,str,str,str,str,str");
		docGrid.enableResizing("false,false,false,false,false,false,false,false");
		docGrid.setSkin("dhx_skyblue");
		docGrid.forceLabelSelection(true);
		docGrid.enablePaging(true, 10, 10, "pagingArea", true, "infoArea");
		docGrid.setPagingSkin("bricks");
		docGrid.enableBlockSelection();
    	docGrid.init();
	}
	
	function getDocList() {
		
		alert("getDocList function탐");
		var queryString = $("form[name=frm]").serialize();
		$.ajax({
		    url: "/Windchill/servlet/dgt/doc/getDGdocAjax",
		    type: 'post',
		    dataType : 'json',
		    data:  queryString,  // You don't need to use {} inside data because it automatically converts to JSON format, so you can just use it as is!
		    success: function(data) {
		        docGrid.clearAll();
		        docGrid.parse(data.docList, "js");
		    },
		    error: function(request, status, error) {
		        alert("에러 발생: " + error);
		        console.log(error);
		    }
		});
	}
	
	function enterKeyDown(){
		if(window.event.keyCode == 13){
			getDocList();
         }
	}
</script>
</head>
<body>
	<form id="frm" name="frm" onsubmit="return false">
	<input type="text" id="name" name="name" placeholder="문서이름을 입력하세요" onkeydown="enterKeyDown()">
	<a href="#" onclick="getDocList()">문서값 받아오기</a>
	</form>
	<div id="docTable" style="width: 1000px; height: 400px;"></div>
	<div id="pagingArea"></div>
	<span id="infoArea"></span>
</body>
</html>