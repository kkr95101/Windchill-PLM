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
		location.href="/Windchill/servlet/dgt/part/partUpdate?idA2A2="+${part.idA2A2};
	}
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
		</table>
	</form>
	<button id="updateButton" onclick="update()">����</button>
</body>
</html>