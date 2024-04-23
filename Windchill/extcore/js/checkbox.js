//var cbox = document.forms[0].checkboxEach;
//var len; 

function checkCbox(cbox)
{
	if(cbox==null) 
		len=0;
	else
	{
		len=cbox.length
		if(''+len == 'undefined') len = 1;
	}
	return len;
}


function selectAll(cboxAll, cbox) 
{	
    var len = checkCbox(cbox);
	if(cbox != null)
		if(len > 1){
			for(var i=0 ; i<len ; i++) 
			{
				if ( cboxAll.checked == true ) cbox[i].checked=true;
				else	cbox[i].checked=false;
			}
		}else{
			if ( cboxAll.checked == true ) cbox.checked=true;
			else cbox.checked=false;
		}
} 

function selectAllUnChecked(cboxAll, cbox)
{
	if(cboxAll == null) return;
    var len = checkCbox(cbox);
    if(cbox != null) {
        if (len > 1){
			if ( cboxAll.checked == true) cboxAll.checked = false;
		} else{
			if ( cboxAll.checked == true) cboxAll.checked = false;
			else cboxAll.checked = true;
		}

		for (var i=0 ; i<len ; i++ )
		{
			if(len>1) {
				if( cbox[i].checked != true) break;
				if ( (i+1) == len) cboxAll.checked = true;
			}
		}
	}
}

 function setAllUnChecked(thisObj, cbox)
 {
     if(thisObj == null) return;
     var len = checkCbox(cbox);
     if(cbox != null) {
         for (var i=0 ; i<len ; i++ )
         {
             if(len>1) {
                if( cbox[i].checked == true) cbox[i].checked = false; 
             }
         }
     }
     thisObj.checked = true;
 }

function isChecked(cboxAll, cbox)
{
	var len = checkCbox(cbox);
	if(cbox != null) {
		if(len > 1){
			for(var i=0 ; i<len ; i++) 
			{
				if( cbox[i].checked == true )
					return true;
			}
		}else{
			if ( cbox.checked == true )
					return true;
		}
	}
	alert(unescape('%uD558%uB098%20%uC774%uC0C1%20%uC120%uD0DD%uD558%uC138%uC694'));
	return false;
}

// ??? checkbox? ??? ????.
function getSelectedCBox(cbox)
{
	var len = checkCbox(cbox);
	if(cbox != null) 
	{
		if(len > 1)
		{
			for(var i=0 ; i<len ; i++) 
			{			
				if (cbox[i].checked)
					return cbox[i];
			}
		}else{
			if (cbox.checked==true) return cbox;
		}	
	}
	return null;
}

function getSelectedList(cbox)
{
	var selectedList = "";
	var len = checkCbox(cbox);
	if(cbox != null) 
	{
		if(len > 1)
		{
			for(var i=0 ; i<len ; i++) 
			{			
				if (cbox[i].checked==true)
					selectedList += "oid="+cbox[i].value+"&";
			}
		}else{
			if (cbox.checked==true) selectedList += "oid="+cbox.value;
		}	
	}
	return selectedList;
}

function isSelected(cbox)
{
	var list = getSelectedList(cbox);
	if(list.length == 0)
	{
		alert(unescape("%uC120%uD0DD%uB41C%20%uD56D%uBAA9%uC774%20%uC5C6%uC2B5%uB2C8%uB2E4"));
		return false;
	}

//	if(!confirm('??!!\n??? ?????????'))
//		return false;

	return true;
}

// 해당 Task가 아닐 경우 저장된 값이나 초기값을 유지(클릭해도 변하지 않음)
function clickValid(chk, nm)
{
	if (chk) {
		document.getElementById(nm).checked = false;
	} else {
		document.getElementById(nm).checked = true;
	}
}

/**
 * radioBox의 Value 가져온다.
 * @param radioObj
 */
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}
/**
 * radioBox의 Value Setting
 * @param radioObj
 * @param newValue
 */
function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}



