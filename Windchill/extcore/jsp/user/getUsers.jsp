<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/Windchill/extcore/css/style.css" />
<link rel="stylesheet" type="text/css" href="/Windchill/extcore/dhtmlx/dhtmlx.css" />
<link rel="stylesheet" type="text/css" href="/Windchill/extcore/css/flexslider.css" media="screen" />
<script type="text/javascript" src="/Windchill/extcore/js/common.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="/Windchill/extcore/dhtmlx/dhtmlx.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
<meta charset="UTF-8">
<title>문서조회</title>
</head>
<body>
	<table border="1" class="table" id="searchDocTable" class="table table-hover">
		<colgroup>
	        <col width="20%">
	        <col width="30%">
	        <col width="20">
	        <col width="30%">
		</colgroup>
		<thead>
			<tr>
				<th>이름</th>
				<th>이메일</th>
				<th>oid</th>
				<th>가입일</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach var="user" items="${userList}">
			<tr>
				<td>${user.name}</td>
				<td>${user.email}</td>
				<td>${user.oid}</td>
				<td>${user.regDate}</td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
</body>
</html>