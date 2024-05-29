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
			getDocListObj();
		});
		 
		function submitPart(){
		let submit = document.frm //document�� form�̸��� ������ form�� �������
		submit.method = "post"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.action = "/Windchill/servlet/dgt/part/partUpdateAjax"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����

		let name = $("#name").val();
		let material = $("#material").val();
		let color = $("#color").val();

		// v to v
		//���ù��� ����
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
		
		// o to o
		//���ù��� ����
		let docCheckobj = $("input[name='linkDocCheckBoxObj']");
		console.log(docCheckobj);
		let docArrayObj = "";
		
		
		for(let i = 0; i < docCheckobj.length; i++){
			if(docCheckobj.length==1){
				docArrayObj += docCheckobj[i].value;
			}else{
				if(i < docCheckobj.length-1){
					docArrayObj += docCheckobj[i].value + "#";
				}else{
					docArrayObj += docCheckobj[i].value;
				}
			}
			
		}
		console.log(docCheckobj);
		$("#docArrayObj").val(docArrayObj);
		
		
		
		if (name == null || name == "") {
			alert("������ �Է��ϼ���");
			frm.name.focus();
			return false; // �� ���� ����
		}
		if (material == null || material == "") {
			alert("������ �Է��ϼ���");
			frm.material.focus();
			return false; // �� ���� ����
		}
		if (color == null || color == "") {
			alert("������ �Է��ϼ���");
			frm.color.focus();
			return false; // �� ���� ����
		}
		submit.submit();

	}
	function deletePart() {
		let submit = document.frm //document�� form�̸��� ������ form�� �������
		submit.method = "post"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.action = "/Windchill/servlet/dgt/part/partDelete"; //form���ٰ� ���°� ���⼭ �����Ҽ��� ����
		submit.submit();

	}
	// v to v
	function searchDoc(){
		
		let url = "/Windchill/servlet/dgt/doc/docPicker";
		tempWind = window.open(url,"_PICKER","width=1400, height=500"); //pickerâ�� ���� �޼���
	}
	// o to o
	function searchDocObj(){
		
		let url = "/Windchill/servlet/dgt/doc/docPickerObj";
		tempWind = window.open(url,"_PICKER","width=1400, height=500"); //pickerâ�� ���� �޼���
	}
	// v to v
	function setDocLink(returnArr){
		if(!checkedDue('linkDocCheckBox', returnArr)){ 
			for(let i = 0; i<returnArr.length; i++){ 
				addRow('linkDocTable', returnArr[i], 'linkDocCheckBox');
			}	//������������ ���̸�ŭ table���ٰ� addRow�� �� , linkDocCheckBox�� checkBox�� �̸��� �������ֱ����Ѱ�
			return "ok";
		}else{
			return "fail";
		}
	}
	// o to o
	function setDocLinkObj(returnArr){
		if(!checkedDue('linkDocCheckBoxObj', returnArr)){ 
			for(let i = 0; i<returnArr.length; i++){ 
				addRowObj('linkDocTableObj', returnArr[i], 'linkDocCheckBoxObj');
			}	//������������ ���̸�ŭ table���ٰ� addRow�� �� , linkDocCheckBox�� checkBox�� �̸��� �������ֱ����Ѱ�
			return "ok";
		}else{
			return "fail";
		}
	}
	function checkedDue(type, returnArr){
		let obj = document.getElementsByName(type); //������(type)�� name���� �� �Ӽ������� ��忡 �����ؼ� ������
		let returnVal = false; //�⺻���� false
		
		for(let i=0; i<obj.length; i++){ //��带 ���鼭 ��������� ��ӵ� 
			if(obj[i].value== "" || obj[i].value == null || obj[i].value == "undefined"){
				continue; 
			}
			for(let j=0; j<returnArr.length; j++){ // ������ returnArr�� ���鼭 ������ ���� ������ ��� ������ true�� ��ȯ��Ų�� �극��ũ
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
	// v to v
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
	
	// o to o
	function getDocListObj(){
		let oid = $("#oid").val();
		let getArr = new Array();
		$.ajax({
			type : 'post',
			url : '/Windchill/servlet/dgt/part/getLinkTechObjDocList',
			data : {"oid":oid},
			dataType : "json",
			beforeSend : function(){
			/* 	openProgressDiv(); */
			},
			success : function(data){
				let dataSize = data.brokerListObj.length;
				
				getArr = createArray(dataSize, 3);
				for(let i=0; i< dataSize; i++){
					getArr[i][0] = data.brokerListObj[i].oid;
					getArr[i][1] = data.brokerListObj[i].description;
					getArr[i][2] = data.brokerListObj[i].userAge;
				}
				setDocLinkObj(getArr);
			}
		})
	}
	
	//v to v
	function addRow(tableId, param, checkName){
		$('#linkDocCheckAll').prop("checked",false); //prop== checkbox check ����
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
	//o to o
	function addRowObj(tableId, param, checkName){
		$('#linkDocCheckAllObj').prop("checked",false); //prop== checkbox check ����
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
	// v to v
	function delDoc(tableId, checkBoxName){
		let dataLen = 0;
		let check = false;
		if(document.getElementById(tableId).rows.length>1){ //row�� 1�ʰ��̸�
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
	
	// o to o
	function delDocObj(tableId, checkBoxName){
		let dataLen = 0;
		let check = false;
		if(document.getElementById(tableId).rows.length>1){ //row�� 1�ʰ��̸�
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
		$("#linkDocCheckAllobj").prop("checked", false);
	}
	
	//üũ�ڽ� ��ü üũ
	function allCheck(checkBoxName, obj){
		if($(obj).is(":checked") == true && $("input:checkbox[name='"+checkBoxName+"']").length >0){
			$("input:checkbox[name='"+checkBoxName+"']").prop("checked",true);
		}else{
			obj.checked = false;
			$("input:checkbox[name='"+checkBoxName+"']").prop("checked",false);
		}
	}
	
	//üũ�ڽ� ��ü üũObj
	function allCheckObj(checkBoxNameObj, obj){
		if($(obj).is(":checked") == true && $("input:checkbox[name='"+checkBoxNameObj+"']").length >0){
			$("input:checkbox[name='"+checkBoxNameObj+"']").prop("checked",true);
		}else{
			obj.checked = false;
			$("input:checkbox[name='"+checkBoxNameObj+"']").prop("checked",false);
		}
	}
	
</script>
<style type="text/css">
/* body�� ���� ��Ÿ�� */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 20px;
}

/* form�� ���� ��Ÿ�� */
form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* �ؽ�Ʈ �Է� �ʵ忡 ���� ��Ÿ�� */
input[type="text"] {
    width: 200px;
    padding: 8px;
    margin: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
}

/* ��ư�� ���� ��Ÿ�� */
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

/* ���̺� ���� ��Ÿ�� */
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

/* ���� ���� ��Ÿ�� */
h3 {
    margin-top: 20px;
    color: #007bff;
}
</style>
</head>
<body>
	<form name = "frm" onSubmit="submit()" id="frm">
		<input type = "hidden" name = "oid" id="oid" value="${part.oid}"> <!--oid hidden  -->
��Ʈ�̸� : <input type = "text" name = "name" id="name" value="${part.name}">
��Ʈ��� : <input type = "text" name = "material" id="material" value="${part.material}">
��Ʈ���� : <input type = "text" name = "color" id="color" value="${part.color}">
		<input type="hidden" name = "docArray" id="docArray" value="">
		<input type="hidden" name = "docArrayObj" id="docArrayObj" value="">
		<input type="button" value="��ǰ����" onclick="submitPart()">
		<input type="button" value="��ǰ����" onclick="deletePart()">
		
		
	<h3>���� ����</h3>
	<div class="buttArea">
		<input type="button" value="����" onclick="delDoc('linkDocTable', 'linkDocCheckBox')">
		<input type="button" value="�����˻�" onclick="searchDoc()">
	</div>
	<table border ="1" id="linkDocTable">
		<colgroup>
			<col width="10%">
			<col width="30%">
			<col width="60%">
		</colgroup>
		<tr>
			<th><input type = "checkbox" id="linkDocCheckAll" onclick="allCheck('linkDocCheckBox', this)"></th>
			<th>��������</th>
			<th>��������</th>
		</tr>
	</table>
	
	<h3>���� ����obj</h3>
	<div class="buttArea">
		<input type="button" value="����" onclick="delDocObj('linkDocTableObj', 'linkDocCheckBoxObj')">
		<input type="button" value="�����˻�" onclick="searchDocObj()">
	</div>
	<table border ="1" id="linkDocTableObj">
		<colgroup>
			<col width="10%">
			<col width="30%">
			<col width="60%">
		</colgroup>
		<tr>
			<th><input type = "checkbox" id="linkDocCheckAllObj" onclick="allCheckObj('linkDocCheckBoxObj', this)"></th>
			<th>��������</th>
			<th>��������</th>
		</tr>
	</table>
	
	</form>

</body>
</html>