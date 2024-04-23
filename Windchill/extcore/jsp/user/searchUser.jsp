<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/Windchill/extcore/dhtmlx/dhtmlx.css" />
<script type="text/javascript" src="/Windchill/extcore/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<script>
	$(document).ready(function() {
		onLoad();
		getUsers();
	});
	
	let userGrid;
	function onLoad() {
		userGrid = new dhtmlXGridObject("userTable");
		userGrid.setImagePath("/Windchill/extcore/dhtmlx/imgs/");
		userGrid.setHeader("이름,oid,이메일,가입일");
		userGrid.setColumnIds("name,oid,email,regDate");
		userGrid.setInitWidthsP("20,20,30,30");
		userGrid.setColAlign("center,left,left,left");
		userGrid.setColTypes("ro,ro,ro,ro");
		userGrid.enableResizing("false,false,false,false");
		userGrid.setSkin("dhx_skyblue");
		userGrid.setColSorting("str,str,str,str");
		userGrid.enableResizing("false,false,false,false");
		userGrid.setPagingSkin("bricks");
		userGrid.enableBlockSelection();
		userGrid.enablePaging(true, 10, 10, "pagingArea", true, "infoArea");
		userGrid.init();
	}
	
	function getUsers() {
		$.ajax({
			url : "/Windchill/servlet/dgt/user/searchUser",
			type : "POST",
			dataType : "json",
			data : {},
			error : function(request, status, error) {
				alert("code : " + request.status + "\\n message : " + 
						request.responseText + "\\n error : " + error)
			},
			success : function(data) {
				userGrid.parse(data.userList, "js");
			}
		})
	}
</script>
<style>
	div#content {
		width: 1200px;
		height: 800px;
	}
	div#content > div#userTable {
		width: 100%;
		height: 305px;
	}
</style>
</head>
<body>
	<div>
		<div id="header">
			<h3>user list</h3>
		</div>
		<div id="content">
			<div id="userTable"></div> <!-- 그리드 생성될 공간 -->
			<p id="pagingArea"/> <!--페이징 표시될 공간 -->
			<p id="infoArea"/> <!--페이징 정보 표시될 공간 -->
		</div>
	</div>
</body>
</html>