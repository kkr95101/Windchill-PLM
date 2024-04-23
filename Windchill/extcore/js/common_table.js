/*****************************************************************************
 * page	overview : Html 관련 Common Function
 *****************************************************************************/

/**
* Table에 행 추가
* @param tableid Table ID
* @return row 추가된 행
*/
function addTableRow(tableid, rowclass){
	var row = tableid.insertRow(tableid.rows.length);
	
	if ( rowclass != null && rowclass != "" ) {
		row.className = rowclass;
	}

	return row;
}

/**
* Table에 열을 추가
* @param row 추가되어야 할 행
* @param colindex 열 위치 0 부터 시작
* @param colvalue 추가될 값
* @param cellclass 적용할 TD classname
* @return col 추가된 col
*/
function addTableCol(row, colindex, colvalue, cellclass, colspan, rowspan){
	var col = row.insertCell(colindex);

	col.innerHTML = colvalue;
	if ( cellclass != null && cellclass != "" ) {
		col.className = cellclass;
	}
	
	if ( colspan != null && colspan != "" ) {
		col.colSpan = colspan;
	}
	
	if ( rowspan != null && rowspan != "" ) {
		col.rowspan = rowspan;
	}

	return col;
}

/**
* Table No가 정렬
* @param tableid Table ID
* @param colindex No가 있는 Col Index 0부터 시작 -1 인 경우 ColIndex 처리 안함
* @param startrow 1이 시작되는 Row Number 0부터 시작
*/
function setTableIndex(tableid, colindex, startrow)
{
	var row = null;
	var k = 0;

	if (colindex == -1 ) {
		return;
	} else if ( startrow == null || startrow == "" || startrow == 0 ) {
		k = 1;
	} else {
		k = startrow - 1;
	}
	
	for( i = startrow; i < tableid.rows.length; i++){
		row = tableid.rows[i].cells[colindex];
		row.innerHTML = i + k;
	}
}

/**
* Object 배열중에 같은 값이 있는지 비교한다.
* @param obj Form 객체
* @param compStr 비교가
* @return boolean
*/
function checkSameValue(obj, compStr){
	if(obj)	{
		// object 배열 길이가 1인 경우
		if(!obj.length)	{
			if(obj.value == compStr)
				return false;
		} else {
			for(i=0;i<obj.length;i++) {
				if(obj[i].value == compStr)
					return false;
			}
		}
	}

	return true;
}


/**
 * Table Row를 삭제한다.
 * @param id	테이블 ID
 * @param obj	Form객체
 */
function deleteRow(id, obj)
{
	var row			= obj.parentElement.parentElement;
	var rowindex	= row.rowIndex;

	id.deleteRow(rowindex);
}

/**
 * Table Row중 CheckBox 선택딘 Row만 삭제한다.
 * @param id	테이블 ID
 * @param formName	Form Name
 * @param formObj	CheckBox 객체명
 */
function deleteTableRow(id, formName, formObj)
{

	if(formName[formObj])
	{
		//선택된 Row가 1개 있을때  Row 삭제
		if(!formName[formObj].length)
		{
			if(formName[formObj].checked == true)
				deleteRow(id,formName[formObj]);
		}
		else
		{
			//선택된 Row가 1개 이상일때의 Row 삭제
			var length	= formName[formObj].length;
			for(i=0;i<length;i++)
			{
				if(formName[formObj][i].checked == true)
				{
					deleteRow(id,formName[formObj][i]);

					if(i != (length - 1))
						deleteTableRow(id, formName, formObj);//재귀함수
				}
			}
		}
	}
}

/**
 * 체크박스 All 선택/반전
 * @param obj	onclick 이벤트를 발생시킬 객체
 * @param form	선택/반전될 객체
 */
function allCheck(obj,form)
{
	if ( form == null )
	{
		return;
	}

	if (!form.length )
	{
		if(obj.checked == true)
		{
			form.checked = true;
		}
		else
		{
			form.checked = false;
		}

		return;
	}

	if(obj.checked == true)
	{
		for(i=0;i<form.length;i++)
		{
			form[i].checked = true;
		}
	}
	else
	{
		for(i=0;i<form.length;i++)
		{
			form[i].checked = false;
		}
	}
}