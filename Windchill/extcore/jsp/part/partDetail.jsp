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
	function update() {
		let oid = $("#oid").val();
		location.href = "/Windchill/servlet/dgt/part/partUpdate?oid=" + oid}
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
				<td colspan="3">${part.name}</td>
			</tr>
			<tr>
				<th>버전</th>
				<td colspan="3">${part.iteration}</td>
			</tr>
			<tr>
				<th>타입</th>
				<td colspan="3">${part.partType}</td>
			</tr>
			<tr>
				<th>재료</th>
				<td colspan="3">${part.material}</td>
			</tr>
			<tr>
				<th>색깔</th>
				<td colspan="3">${part.color}</td>
			</tr>
			<c:forEach var="brokerList" items="${brokerList}">
			<tr>
				<th>문서</th>
				<td >${brokerList.name}</td>
				<td >${brokerList.description}</td>
				<td >${brokerList.userAge}</td>
			</tr>
			</c:forEach>
		</table>
			<input type="hidden" name ="oid" id="oid" value="${part.oid}">
	</form>
	<button id="updateButton" onclick="update()">수정</button>
</body>
</html>