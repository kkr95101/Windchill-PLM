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
		<span>���̵� : <input type="text" name="id" id="id"/></span>
		<span>��й�ȣ : <input type="text" name="password" id="id" /></span>
		<span>�̸� : <input type="text" name="fullName" id="id" /></span>
		<span>�̸��� : <input type="text" name="email" id="id" /></span>
		<span>���� : <input type="text" name="org" value="DIGITEK" id="id" readonly /></span>
	</form>
	<input type="submit" onSubmit="ver()" value="ȸ������">
</body>
</html>