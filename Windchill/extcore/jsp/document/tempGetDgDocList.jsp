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
/* ��ü �� ��Ÿ�� */
form {
	margin-bottom: 20px;
}

/* �Է� �ʵ� ��Ÿ�� */
input[type="text"] {
	padding: 8px;
	margin-right: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
}

/* ��ũ ��Ÿ�� */
a {
	color: #007bff;
	text-decoration: none;
	margin-right: 10px;
}

a:hover {
	text-decoration: underline;
}

/* ��ư ��Ÿ�� */
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

/* ���̺� ��Ÿ�� */
#docTable {
	width: 100%;
	height: 400px;
	border: 1px solid #ccc;
}

/* ����¡ ���� ��Ÿ�� */
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
				.setHeader("#master_checkbox,�̸�,����,ȸ���̸�,ȸ������,���ͷ��̼�,idA2A2,����ڼ���,���������");
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
				alert("���� �߻�: " + error);
				console.log(error);
			}
		});
	}

	function enterKeyDown() {
		if (window.event.keyCode == 13) { //keycode 13�� Ű����
			getDocList();
		}
	}
	function apply() {
		let checkobjs = docGrid.getCheckedRows(0); //üũ�� �ο츦 ������ �� ����

		if (checkobjs == null || checkobjs == "") {
			alert("������ ������ �����ϴ�.");
			return;
		} else {
			let tempArr = checkobjs.split(','); // ,�� ���ְ� ����

			let returnArr = new Array(); //�迭����
			for (let i = 0; i < tempArr.length; i++) {
				returnArr[i] = new Array(); //1���� �迭���� ���⼭�� �迭�� �����ϴ� �迭�� �����ϴ°���
				returnArr[i][0] = docGrid.getRowAttribute(tempArr[i], "oid"); // oid dhtmlx�� getRowAttribute�� �޾ƿ�
				returnArr[i][1] = docGrid.getRowAttribute(tempArr[i],
						"description");
				returnArr[i][2] = docGrid.getRowAttribute(tempArr[i],
						"displayName");
			}

			window.opener.setDocLink(returnArr); // opener �ڱ� �θ�â�� �����ִ°�, return���� ok,fail����
			window.close();
		}
	}
</script>
</head>
<body>
	<form id="frm" name="frm" onsubmit="return false">
		<input type="text" id="name" name="name" placeholder="�����̸��� �Է��ϼ���"
			onkeydown="enterKeyDown()"> <a href="#"
			onclick="getDocList()">������ �޾ƿ���</a> <input type="button" value="����"
			onclick="apply()"> <input type="button" value="�ݱ�"
			onclick="window.close()">
		<!-- ������â �ݱ� -->
	</form>
	<div id="docTable" style="width: 1000px; height: 400px;"></div>
	<div id="pagingArea"></div>
	<span id="infoArea"></span>
</body>
</html>