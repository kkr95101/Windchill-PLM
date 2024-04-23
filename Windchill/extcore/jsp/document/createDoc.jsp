<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<script>
		function submitDoc(){
			let submit = document.frm 	 //document의 form이름을 가지고 form을 가지고옴
			submit.method = "post";		 //form에다가 쓰는걸 여기서 제어할수도 있음
			submit.action = "/Windchill/servlet/dgt/doc/saveDoc"; //form에다가 쓰는걸 여기서 제어할수도 있음
			
			let name = $("#name").val();
			let description = $("#description").val();
			let userName = $("#userName").val();
			let userAge = $("#userAge").val();
			let userSex = $("#userSex").val();
			let userOrg = $("#userOrg").val();
			
			console.log(`${name}, ${description}, ${userName}, ${userAge}, ${userSex}, ${userOrg}`);
			
			if(name == null || name == ""){
				alert("제목을 입력하세요");
				frm.name.focus();
				return false; // 폼 제출 방지
			}if(description == null || description == ""){
				alert("내용을 입력하세요");
				frm.description.focus();
				 return false; // 폼 제출 방지
			}if(userName == null || userName == ""){
				alert("회원이름을 입력하세요");
				frm.userName.focus();
				 return false; // 폼 제출 방지
			}if(userAge == null || userAge == ""){
				alert("회원나이을 입력하세요");
				frm.userAge.focus();
				 return false; // 폼 제출 방지
			}if(userSex == null || userSex == ""){
				alert("회원성별을 입력하세요");
				frm.userSex.focus();
				 return false; // 폼 제출 방지
			}if(userOrg == null || userOrg == ""){
				alert("회원부서을 입력하세요");
				frm.userOrg.focus();
				 return false; // 폼 제출 방지
			}
			submit.submit();
			
		}	
</script>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		문서제목 : <input type = "text" name = "name" id="name">
		내용 : <input type = "text" name = "description" id="description">
		회원이름 : <input type = "text" name = "userName" id="userName">
		회원나이 : <input type = "text" name = "userAge" id="userAge">
		회원성별 : <input type = "text" name = "userSex" id="userSex">
		회원부서 : <input type = "text" name = "userOrg" id="userOrg">
		<input type="button" value="문서등록" onclick="submitDoc()">
	</form>
</body>
</html>