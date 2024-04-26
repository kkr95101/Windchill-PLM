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
/* ��ü ���̺� ��Ÿ�� */
table {
	border: 1px solid #a39485;
	font-size: 0.9em;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
	width: 100%;
	border-collapse: collapse;
	border-radius: 5px;
	overflow: hidden;
}

/* ���̺� ��� ��Ÿ�� */
th {
	text-align: left;
	font-weight: bold;
}

/* ���̺� �� ��Ÿ�� */
td, th {
	padding: 1em 0.5em;
	vertical-align: middle;
}

/* ��ũ ��Ÿ�� */
a {
	color: #73685d;
}

/* ��ư ���� ��Ÿ�� */
#buttArea {
	margin-top: 13px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

/* ��ư ��Ÿ�� */
#buttArea > input[type="button"] {
	border: none;
	min-height: 40px;
	min-width: 120px;
	border-radius: 5px;
	cursor: pointer;
}

/* ���� ��ư ��Ÿ�� */
#updateButton {
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

#updateButton:hover {
	background-color: #0056b3;
}

</style>
<script type="text/javascript">
	function update() {
		let oid = $("#oid").val();
		location.href = "/Windchill/servlet/dgt/part/partUpdate?oid=" + oid}
</script>
</head>
<body>
	<h3>ȸ�� ��</h3>
	<form id="frm" name="frm">
		<table border="1">
			<colgroup>
				<col width="10%">
				<col width="40%">
				<col width="10%">
				<col width="40%">
			</colgroup>

			<tr>
				<th>�̸�</th>
				<td colspan="3">${part.name}</td>
			</tr>
			<tr>
				<th>����</th>
				<td colspan="3">${part.iteration}</td>
			</tr>
			<tr>
				<th>Ÿ��</th>
				<td colspan="3">${part.partType}</td>
			</tr>
			<tr>
				<th>���</th>
				<td colspan="3">${part.material}</td>
			</tr>
			<tr>
				<th>����</th>
				<td colspan="3">${part.color}</td>
			</tr>
			<c:forEach var="brokerList" items="${brokerList}">
			<tr>
				<th>����</th>
				<td >${brokerList.name}</td>
				<td >${brokerList.description}</td>
				<td >${brokerList.userAge}</td>
			</tr>
			</c:forEach>
		</table>
			<input type="hidden" name ="oid" id="oid" value="${part.oid}">
	</form>
	<button id="updateButton" onclick="update()">����</button>
</body>
</html>