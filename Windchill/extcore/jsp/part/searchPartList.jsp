<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="/Windchill/extcore/dhtmlx/dhtmlx.css" />
<script type="text/javascript" src="/Windchill/extcore/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript"
	src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<script>
	$(document).ready(function() {
		onLoad();
		getParts();
	});

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

	function getParts() {
		$.ajax({
			url : "/Windchill/servlet/dgt/part/partListAjax",
			type : "get",
			dataType : "json",
			data : {},
			error : function(request, status, error) {
				alert("code : " + request.status + "\\n message : "
						+ request.responseText + "\\n error : " + error)
			},
			success : function(data){
				partGrid.parse(data.partList,"js");
			}

		})
	}
</script>
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
</head>
<body>
	<div>
		<div id="header">
			<h3>part List</h3>
		</div>
		<div id="content">
			<div id="partTable"></div>
			<p id="pagingArea">
			<p id="infoArea">
		</div>
	</div>
</body>
</html>