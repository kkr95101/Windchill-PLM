<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="/Windchill/extcore/js/jquery/jquery-1.11.1.min.js"></script>
<script>
		let tempWind;
		function submitPart(){
			let submit = document.frm 	 //document의 form이름을 가지고 form을 가지고옴
			submit.method = "post";		 //form에다가 쓰는걸 여기서 제어할수도 있음
			submit.action = "/Windchill/servlet/dgt/part/partSaveAjax"; //form에다가 쓰는걸 여기서 제어할수도 있음
			
			let name = $("#name").val();
			let material = $("#material").val();
			let color = $("#color").val();
			
			console.log(`${name}`);
			
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
			
			
			if(name == null || name == ""){
				alert("제목을 입력하세요");
				frm.name.focus();
				return false; // 폼 제출 방지
			}if(material == null || material == ""){
				alert("제목을 입력하세요");
				frm.material.focus();
				return false; // 폼 제출 방지
			}if(color == null || color == ""){
				alert("제목을 입력하세요");
				frm.color.focus();
				return false; // 폼 제출 방지
			}
 			submit.submit();
			
		}	
		
		function searchDoc(){
			
			let url = "/Windchill/servlet/dgt/doc/docPicker";
			tempWind = window.open(url,"_PICKER","width=1400, height=500"); //picker창을 여는 메서드
		}
		
		function setDocLink(returnArr){
			if(!checkedDue('linkDocCheckBox', returnArr)){ //checkedDue를 통해 true,false를 반환받음 false로받으면 !연산자떄문에 true로 변환되어 진행되게 만듬
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
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		부품이름 : <input type = "text" name = "name" id="name">
		부품속성 : <input type = "text" name = "material" id="material">
		부품색깔 : <input type = "text" name = "color" id="color">
		<input type="hidden" name = "docArray" id="docArray" value="">
		<input type="button" value="부품등록" onclick="submitPart()">
	</form>
	
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
	
</body>
</html>