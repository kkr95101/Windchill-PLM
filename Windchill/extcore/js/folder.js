
function changeFinalFolder( obj ){
	frm.subfolder.value= obj.value;
}

function getClassCombo(folderPath , obj, selectVal) {
	var frm = document.frm;
	var iframe = document.getElementById("getClassFrame");
	iframe.src = "/Windchill/extcore/jsp/caddoc/ProSelectProductClassSub.jsp?folderPath="+ folderPath + "&comboName=" + obj.name + "&selectVal=" + selectVal;
}  
          
//콤보리스트에서 선택한 항목 가져오는 함수 
function comboSelectedText(obj){
	var rtv ="";
	if (obj.options != null){   	  
		for( var i=0 ; i<obj.options.length ; i++ ){
			if( obj.options[i].selected == true ){

				rtv = obj.options[i].text;
				break;
			}
		}
	}

	return rtv;
}

//제품분류 항목 Reset
function comboReset(obj ){
	var firstOption = obj.options[0];

	obj.options.length = 0;
	obj.add( firstOption );

}

function changeFolder(obj , getNum){
	var targetObj ;
	var folderPath ;
	var frm = document.frm;

	var product	= frm.productClass;
	var customer = frm.customerClass;
	var project = frm.projectClass;
	var draw = frm.drawClass;

	if( obj == product ){
		comboReset( customer );
		comboReset( project );
		if(getNum != null)comboReset( draw );

		targetObj =  customer;
	}else if( obj == customer ){
		comboReset( project );
		if(getNum != null)comboReset( draw );		

		targetObj = project ;		
	}else if( obj == project ){
		if(getNum != null){
			comboReset( draw );
			targetObj = draw ;
		}
	} 

	folderPath = obj.value;
	frm.subfolder.value = folderPath;
	if(targetObj != null)getClassCombo( folderPath , targetObj ) ;
}
