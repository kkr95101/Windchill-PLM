<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>

<script type="text/javascript" src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<script>
		function submitPart(){
		let submit = document.frm //document�� form�̸��� ������ form�� �������
		submit.method = "post"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.action = "/Windchill/servlet/dgt/part/partUpdateAjax"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����

		let name = $("#name").val();
		let material = $("#material").val();
		let color = $("#color").val();

		if (name == null || name == "") {
			alert("������ �Է��ϼ���");
			frm.name.focus();
			return false; // �� ���� ����
		}
		if (material == null || material == "") {
			alert("������ �Է��ϼ���");
			frm.material.focus();
			return false; // �� ���� ����
		}
		if (color == null || color == "") {
			alert("������ �Է��ϼ���");
			frm.color.focus();
			return false; // �� ���� ����
		}
		submit.submit();

	}
	function deletePart() {
		let submit = document.frm //document�� form�̸��� ������ form�� �������
		submit.method = "post"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.action = "/Windchill/servlet/dgt/part/partDelete"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.submit();

	}
</script>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		<input type = "hidden" name = "oid" id="oid" value="${part.oid}"> <!--oid hidden  -->
��Ʈ�̸� : <input type = "text" name = "name" id="name" value="${part.name}">
��Ʈ��� : <input type = "text" name = "material" id="material" value="${part.material}">
��Ʈ���� : <input type = "text" name = "color" id="color" value="${part.color}">
		<input type="button" value="��ǰ����" onclick="submitPart()">
		<input type="button" value="��ǰ����" onclick="deletePart()">
	</form>

</body>
</html>