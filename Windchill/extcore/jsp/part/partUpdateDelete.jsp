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
		let submit = document.frm //document의 form이름을 가지고 form을 가지고옴
		submit.method = "post"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.action = "/Windchill/servlet/dgt/part/partUpdateAjax"; //form에다가 쓰는걸 여기서 제어할수도 있음

		let name = $("#name").val();
		let material = $("#material").val();
		let color = $("#color").val();

		if (name == null || name == "") {
			alert("제목을 입력하세요");
			frm.name.focus();
			return false; // 폼 제출 방지
		}
		if (material == null || material == "") {
			alert("제목을 입력하세요");
			frm.material.focus();
			return false; // 폼 제출 방지
		}
		if (color == null || color == "") {
			alert("제목을 입력하세요");
			frm.color.focus();
			return false; // 폼 제출 방지
		}
		submit.submit();

	}
	function deletePart() {
		let submit = document.frm //document의 form이름을 가지고 form을 가지고옴
		submit.method = "post"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.action = "/Windchill/servlet/dgt/part/partDelete"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.submit();

	}
</script>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		<input type = "hidden" name = "oid" id="oid" value="${part.oid}"> <!--oid hidden  -->
파트이름 : <input type = "text" name = "name" id="name" value="${part.name}">
파트재료 : <input type = "text" name = "material" id="material" value="${part.material}">
파트색깔 : <input type = "text" name = "color" id="color" value="${part.color}">
		<input type="button" value="부품수정" onclick="submitPart()">
		<input type="button" value="부품삭제" onclick="deletePart()">
	</form>

</body>
</html>