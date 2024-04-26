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
			getDocList();
		});
		 
		function submitPart(){
		let submit = document.frm //document의 form이름을 가지고 form을 가지고옴
		submit.method = "post"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.action = "/Windchill/servlet/dgt/part/partUpdateAjax"; //form에다가 쓰는걸 여기서 제어할수도 있음

		let name = $("#name").val();
		let material = $("#material").val();
		let color = $("#color").val();

		//관련문서 저장
		let docCheck = $("input[name='linkDocCheckBox']");
		let docArray = "";
		
		for(let i = 0; i < docCheck.length; i++){
			if(docCheck.length==1){
				docArray += docCheck[i].value;
			}else{
				if(i < docCheck.length-1){
					docArray += docCheck[i].value + "#";
				}else{
					docArray += docCheck[i].value;
				}
			}
			
		}
		$("#docArray").val(docArray);
		
		
		if (name == null || name == "") {
			alert("제목을 입력하세요");
			frm.name.focus();
			return false; // 폼 제출 방지
		}
		if (material == null || material == "") {
			alert("제목을 입력하세요");
			frm.material.focus();
			return false; // 폼 제출 방지
		}
		if (color == null || color == "") {
			alert("제목을 입력하세요");
			frm.color.focus();
			return false; // 폼 제출 방지
		}
		submit.submit();

	}
	function deletePart() {
		let submit = document.frm //document의 form이름을 가지고 form을 가지고옴
		submit.method = "post"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.action = "/Windchill/servlet/dgt/part/partDelete"; //form에다가 쓰는걸 여기서 제어할수도 있음
		submit.submit();

	}
	function searchDoc(){
		let url = "/Windchill/servlet/dgt/doc/docPicker";
		tempWind = window.open(url,"_PICKER","width=1400, height=500"); 
	}
	
	function setDocLink(returnArr){
		if(!checkedDue('linkDocCheckBox', returnArr)){ 
			for(let i = 0; i<returnArr.length; i++){ 
				addRow('linkDocTable', returnArr[i], 'linkDocCheckBox');
			}	//받은데이터의 길이만큼 table에다가 addRow를 함 , linkDocCheckBox는 checkBox의 이름을 지정해주기위한것
			return "ok";
		}else{
			return "fail";
		}
	}
	function checkedDue(type, returnArr){
		let obj = document.getElementsByName(type); //변수값(type)인 name으로 된 속성값으로 노드에 접근해서 가져옴
		let returnVal = false; //기본세팅 false
		
		for(let i=0; i<obj.length; i++){ //노드를 돌면서 비어있으면 계속됨 
			if(obj[i].value== "" || obj[i].value == null || obj[i].value == "undefined"){
				continue; 
			}
			for(let j=0; j<returnArr.length; j++){ // 변수인 returnArr로 돌면서 각각의 값이 있으면 계속 없으면 true로 변환시킨후 브레이크
				if(obj[i].value != returnArr[j][0]){
					continue;
				}else{
					returnVal =true;
					break;
				}
			}
			if(!returnVal){ 
				continue;
			}else{
				break;
			}
		}
		return returnVal;
	}
	
	function createArray(rows, columns){
		let arr = new Array(rows);
		for(let i =0; i< rows; i++){
			arr[i] = new Array(columns);
		}
		return arr;
	}
	function getDocList(){
		let oid = $("#oid").val();
		let getArr = new Array();
		$.ajax({
			type : 'post',
			url : '/Windchill/servlet/dgt/part/getLinkTechDocList',
			data : {"oid":oid},
			dataType : "json",
			beforeSend : function(){
			/* 	openProgressDiv(); */
			},
			success : function(data){
				let dataSize = data.brokerList.length;
				
				getArr = createArray(dataSize, 3);
				for(let i=0; i< dataSize; i++){
					getArr[i][0] = data.brokerList[i].oid;
					getArr[i][1] = data.brokerList[i].description;
					getArr[i][2] = data.brokerList[i].userAge;
				}
				setDocLink(getArr);
			}
		})
	}
	
	
	function addRow(tableId, param, checkName){
		$('#linkDocCheckAll').prop("checked",false); //prop== checkbox check 해지
		let table = document.getElementById(tableId); 
		let rowlen = table.rows.length;
		let row = table.insertRow(rowlen);
		
		let td0 = row.insertCell(0);
		let oidStr = "<input type='checkbox' name='"+checkName+"'value='"+param[0]+"'/>";
		td0.innerHTML = oidStr;
		let td1 = row.insertCell(1);
		td1.innerHTML = param[1];
		let td2 = row.insertCell(2);
		td2.innerHTML = param[2];
		
	}
	function delDoc(tableId, checkBoxName){
		let dataLen = 0;
		let check = false;
		if(document.getElementById(tableId).rows.length>1){ //row가 1초과이면
			const checkBox = document.getElementsByName(checkBoxName);
			checkBox.forEach(function(){
				if($(this).is(":checked")){
					check = true;
					return;
				}
			});
			if(document.getElementsByName(checkBoxName).length>=1){
				dataLen = document.getElementsByName(checkBoxName).length;
				for(let i = dataLen; i >= 1; i--){
					if(document.getElementsByName(checkBoxName)[i-1].checked){
						document.getElementById(tableId).deleteRow(i);
					}
				}
			}
		}
		$("#linkDocCheckAll").prop("checked", false);
	}
	
	//체크박스 전체 체크
	function allCheck(checkBoxName, obj){
		if($(obj).is(":checked") == true && $("input:checkbox[name='"+checkBoxName+"']").length >0){
			$("input:checkbox[name='"+checkBoxName+"']").prop("checked",true);
		}else{
			obj.checked = false;
			$("input:checkbox[name='"+checkBoxName+"']").prop("checked",false);
		}
	}
	
	
</script>
<style type="text/css">
/* body에 대한 스타일 */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 20px;
}

/* form에 대한 스타일 */
form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 텍스트 입력 필드에 대한 스타일 */
input[type="text"] {
    width: 200px;
    padding: 8px;
    margin: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
}

/* 버튼에 대한 스타일 */
input[type="button"] {
    padding: 8px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

input[type="button"]:hover {
    background-color: #0056b3;
}

/* 테이블에 대한 스타일 */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

table, th, td {
    border: 1px solid #ccc;
}

th, td {
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

/* 제목에 대한 스타일 */
h3 {
    margin-top: 20px;
    color: #007bff;
}
</style>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		<input type = "hidden" name = "oid" id="oid" value="${part.oid}"> <!--oid hidden  -->
파트이름 : <input type = "text" name = "name" id="name" value="${part.name}">
파트재료 : <input type = "text" name = "material" id="material" value="${part.material}">
파트색깔 : <input type = "text" name = "color" id="color" value="${part.color}">
		<input type="hidden" name = "docArray" id="docArray" value="">
		<input type="button" value="부품수정" onclick="submitPart()">
		<input type="button" value="부품삭제" onclick="deletePart()">
		
		
	<h3>관련 문서</h3>
	<div class="buttArea">
		<input type="button" value="삭제" onclick="delDoc('linkDocTable', 'linkDocCheckBox')">
		<input type="button" value="문서검색" onclick="searchDoc()">
	</div>
	<table border ="1" id="linkDocTable">
		<colgroup>
			<col width="10%">
			<col width="30%">
			<col width="60%">
		</colgroup>
		<tr>
			<th><input type = "checkbox" id="linkDocCheckAll" onclick="allCheck('linkDocCheckBox', this)"></th>
			<th>문서제목</th>
			<th>문서내용</th>
		</tr>
	</table>
	
	</form>

</body>
</html>