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
		function submitDoc(){
			let submit = document.frm 	 //document�� form�̸��� ������ form�� �������
			submit.method = "post";		 //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
			submit.action = "/Windchill/servlet/dgt/doc/docUpdate"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
			
			let name = $("#name").val();
			let description = $("#description").val();
			let userName = $("#userName").val();
			let userAge = $("#userAge").val();
			let userSex = $("#userSex").val();
			let userOrg = $("#userOrg").val();
			
			console.log(`${name}, ${description}, ${userName}, ${userAge}`);
			
			if(name == null || name == ""){
				alert("������ �Է��ϼ���");
				frm.name.focus();
				return false; // �� ���� ����
			}if(description == null || description == ""){
				alert("������ �Է��ϼ���");
				frm.description.focus();
				 return false; // �� ���� ����
			}if(userName == null || userName == ""){
				alert("ȸ���̸��� �Է��ϼ���");
				frm.userName.focus();
				 return false; // �� ���� ����
			}if(userAge == null || userAge == ""){
				alert("ȸ�������� �Է��ϼ���");
				frm.userAge.focus();
				 return false; // �� ���� ����
			}if(userSex == null || userSex == ""){
				alert("ȸ�������� �Է��ϼ���");
				frm.userSex.focus();
				 return false; // �� ���� ����
			}if(userOrg == null || userOrg == ""){
				alert("ȸ�������� �Է��ϼ���");
				frm.userOrg.focus();
				 return false; // �� ���� ����
			}
			submit.submit();
			
		}	
		function deleteDoc(){
			let submit = document.frm 	 //document�� form�̸��� ������ form�� �������
			submit.method = "post";		 //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
			submit.action = "/Windchill/servlet/dgt/doc/docDelete"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
			submit.submit();
			
		}	
</script>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
				<input type = "hidden" name = "oid" id="oid" value="${doc.oid}"> <!--oid hidden  -->
		�������� : <input type = "text" name = "name" id="name" value="${doc.name}">
		����	: 	<input type = "text" name = "description" id="description" value="${doc.description}">
		ȸ���̸� : <input type = "text" name = "userName" id="userName" value="${doc.userName}">
		ȸ������ : <input type = "text" name = "userAge" id="userAge" value="${doc.userAge}">
		ȸ������ : <input type = "text" name = "userSex" id="userSex" value="${doc.userSex}">
		ȸ������ : <input type = "text" name = "userOrg" id="userOrg" value="${doc.userOrg}">
		<input type="button" value="��������" onclick="submitDoc()">
		<input type="button" value="��������" onclick="deleteDoc()">
	</form>

</body>
</html>