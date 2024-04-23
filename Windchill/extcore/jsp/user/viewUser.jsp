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
	$(document).ready(function() {
		$("#userList").click(function() {
			location.href="/Windchill/servlet/dgt/user/users/qss";
		})
	})
</script>
<style>
	table {
	  border: 1px #a39485 solid;
	  font-size: .9em;
	  box-shadow: 0 2px 5px rgba(0,0,0,.25);
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
	
	#buttArea > input[type="button"] {
    	border:none;
   	 	min-height:40px; 
	    min-width: 120px;
	    border-radius: 5px;
	    cursor: pointer;
	}
</style>
</head>
<body>
	<h3>회원 상세</h3>
	<table border="1">
		<colgroup>
			<col width="10%">
			<col width="40%">
			<col width="10%">
			<col width="40%">
		</colgroup>
		<tr>
			<th>이름</th>
			<td colspan="3">${user.fullName}</td>
		</tr>
		<tr>
			<th>이메일</th>
			<td><c:out value="${user.email}"/></td>
			<th>조직</th>
			<td><c:out value="${user.org}"/></td>
		</tr>
		<tr>
			<th>가입일</th>
			<td colspan="3"><c:out value="${user.regDate}"/></td>
		</tr>
	</table>
	<div id="buttArea">
		<input type="button" id="userList" value="목록">
		<input type="button" id="userUpdate" value="수정">
	</div>
</body>
</html>