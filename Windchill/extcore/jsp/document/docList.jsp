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
		getDocList();
	})
	
	let docGrid;
	
	function onLoad() {
		docGrid = new dhtmlXGridObject("docTable"); 
		docGrid.setImagePath("/Windchill/extcore/dhtmlx/imgs/");
		docGrid.setHeader("문서명,설명,이터레이션,사용자이름,사용자성별,사용자조직");
		docGrid.setColumnIds("displayName,description,iteration,userName,userSex,userOrg");
		docGrid.setInitWidthsP("20,10,4,6,19.2,20");
		docGrid.setColAlign("center,center,center,center,center,center");
		docGrid.setColTypes("ro,ro,ro,ro,ro,ro");
		docGrid.setColSorting("str,str,stㄱ,str,str,str");
		docGrid.enableResizing("false,false,false,false,false,false");
		docGrid.setSkin("dhx_skyblue");
		docGrid.forceLabelSelection(true);
		docGrid.enablePaging(true, 10, 10, "pagingArea", true, "infoArea");
		docGrid.setPagingSkin("bricks");
		docGrid.enableBlockSelection();
    	docGrid.init();
	}
	
	function getDocList() {
		$.ajax({
			url : "/Windchill/servlet/dgt/doc/getDocList",
			type : "POST",
			dataType : "json",
			data : $("#frm").serialize(),
			error : function(request, status, error) {
				alert("code : " + request.status + "\\n" + "message : " + request.responseText + "\\n" + "error : " + error);
			},
			success : function(data) {
// 				alert(data.docList[0].state);
				docGrid.parse(data.docList,"js");
			}
		})
	}
</script>
</head>
<body>
	<span id="infoArea"></span>
	<div id="docTable"></div>
	<div id="pagingArea"></div>
</body>
</html>