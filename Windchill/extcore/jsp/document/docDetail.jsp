<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<script type="text/javascript"
	src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<style>
table {
	border: 1px #a39485 solid;
	font-size: .9em;
	box-shadow: 0 2px 5px rgba(0, 0, 0, .25);
	width: 100%;
	border-collapse: collapse;
	border-radius: 5px;
	overflow: hidden;
}

th {
	text-align: left;
	font-weight: bold;
}

td, th {
	padding: 1em .5em;
	vertical-align: middle;
}

a {
	color: #73685d;
}

#buttArea {
	margin-top: 13px;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}

#buttArea>input[type="button"] {
	border: none;
	min-height: 40px;
	min-width: 120px;
	border-radius: 5px;
	cursor: pointer;
}
</style>
<script type="text/javascript">
	function update(){
		location.href="/Windchill/servlet/dgt/doc/docUpdateDoc?idA2A2="+${doc.idA2A2};
	}
</script>
</head>
<body>
	<h3>회원 상세</h3>
	<form id="frm" name="frm">
		<table border="1">
			<colgroup>
				<col width="10%">
				<col width="40%">
				<col width="10%">
				<col width="40%">
			</colgroup>

			<tr>
				<th>이름</th>
				<td colspan="3">${doc.name}</td>
			</tr>
			<tr>
				<th>idA2A2</th>
				<td colspan="3">${doc.idA2A2}</td>
			</tr>
			<tr>
				<th>내용</th>
				<td><c:out value="${doc.description}" /></td>
				<th>회원이름</th>
				<td><c:out value="${doc.userName}" /></td>
			</tr>
			<tr>
				<th>회원나이</th>
				<td colspan="3"><c:out value="${doc.userAge}" /></td>
			</tr>
			<tr>
				<th>회원성별</th>
				<td colspan="3"><c:out value="${doc.userSex}" /></td>
			</tr>
			<tr>
				<th>회원조직</th>
				<td colspan="3"><c:out value="${doc.userOrg}" /></td>
			</tr>
		</table>
	</form>
	<button id="updateButton" onclick="update()">수정</button>
</body>
</html>