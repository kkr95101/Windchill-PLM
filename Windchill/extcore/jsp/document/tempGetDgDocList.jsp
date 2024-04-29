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
<style>
#docTable {
	width: 1200px;
	height: 400px;
}
/* 전체 폼 스타일 */
form {
	margin-bottom: 20px;
}

/* 입력 필드 스타일 */
input[type="text"] {
	padding: 8px;
	margin-right: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
}

/* 링크 스타일 */
a {
	color: #007bff;
	text-decoration: none;
	margin-right: 10px;
}

a:hover {
	text-decoration: underline;
}

/* 버튼 스타일 */
input[type="button"] {
	padding: 8px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 10px;
}

input[type="button"]:hover {
	background-color: #0056b3;
}

/* 테이블 스타일 */
#docTable {
	width: 100%;
	height: 400px;
	border: 1px solid #ccc;
}

/* 페이징 영역 스타일 */
#pagingArea, #infoArea {
	margin-top: 10px;
	display: inline-block;
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
		docGrid
				.setHeader("#master_checkbox,이름,내용,회원이름,회원나이,이터레이션,idA2A2,사용자성별,사용자조직");
		docGrid
				.setColumnIds(",displayName,description,userName,userAge,iteration,idA2A2,userSex,userOrg");
		docGrid.setInitWidthsP("10,10,10,10,10,10,10,10,10");
		docGrid
				.setColAlign("center,center,center,center,center,center,center,center,center");
		docGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro");
		docGrid.setColSorting("str,str,str,str,str,str,str,str,str");
		docGrid
				.enableResizing("false,false,false,false,false,false,false,false,false");
		docGrid.setSkin("dhx_skyblue");
		docGrid.forceLabelSelection(true);
		docGrid.enablePaging(true, 10, 10, "pagingArea", true, "infoArea");
		docGrid.setPagingSkin("bricks");
		docGrid.enableBlockSelection();
		docGrid.init();
	}

	function getDocList() {

		var queryString = $("form[name=frm]").serialize();
		$.ajax({
			url : "/Windchill/servlet/dgt/doc/getDGdocAjax",
			type : 'post',
			dataType : 'json',
			data : queryString, // You don't need to use {} inside data because it automatically converts to JSON format, so you can just use it as is!
			success : function(data) {
				docGrid.clearAll();
				docGrid.parse(data.docList, "js");
			},
			error : function(request, status, error) {
				alert("에러 발생: " + error);
				console.log(error);
			}
		});
	}

	function enterKeyDown() {
		if (window.event.keyCode == 13) { //keycode 13은 키보드
			getDocList();
		}
	}
	function apply() {
		let checkobjs = docGrid.getCheckedRows(0); //체크한 로우를 가져올 수 있음

		if (checkobjs == null || checkobjs == "") {
			alert("선택한 문서가 없습니다.");
			return;
		} else {
			let tempArr = checkobjs.split(','); // ,를 없애고 넣음

			let returnArr = new Array(); //배열선언
			for (let i = 0; i < tempArr.length; i++) {
				returnArr[i] = new Array(); //1차원 배열선언 여기서는 배열을 참조하는 배열을 선언하는것임
				returnArr[i][0] = docGrid.getRowAttribute(tempArr[i], "oid"); // oid dhtmlx의 getRowAttribute로 받아옴
				returnArr[i][1] = docGrid.getRowAttribute(tempArr[i],
						"description");
				returnArr[i][2] = docGrid.getRowAttribute(tempArr[i],
						"displayName");
			}

			window.opener.setDocLink(returnArr); // opener 자기 부모창에 던져주는거, return으로 ok,fail받음
			window.close();
		}
	}
</script>
</head>
<body>
	<form id="frm" name="frm" onsubmit="return false">
		<input type="text" id="name" name="name" placeholder="문서이름을 입력하세요"
			onkeydown="enterKeyDown()"> <a href="#"
			onclick="getDocList()">문서값 받아오기</a> <input type="button" value="적용"
			onclick="apply()"> <input type="button" value="닫기"
			onclick="window.close()">
		<!-- 윈도우창 닫기 -->
	</form>
	<div id="docTable" style="width: 1000px; height: 400px;"></div>
	<div id="pagingArea"></div>
	<span id="infoArea"></span>
</body>
</html>