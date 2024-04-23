<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<script>
	function ver() {
		let id = $("#id").val();
		let password = $("#password").val();
		let fullName = $("#fullName").val();
		let email = $("#email").val();
		let org = $("#org").val();
	}
</script>
<body>
	<form id="frm">
		<span>아이디 : <input type="text" name="id" id="id"/></span>
		<span>비밀번호 : <input type="text" name="password" id="id" /></span>
		<span>이름 : <input type="text" name="fullName" id="id" /></span>
		<span>이메일 : <input type="text" name="email" id="id" /></span>
		<span>조직 : <input type="text" name="org" value="DIGITEK" id="id" readonly /></span>
	</form>
	<input type="submit" onSubmit="ver()" value="회원가입">
</body>
</html>