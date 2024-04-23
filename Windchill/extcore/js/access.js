/**
 * jclee 2015-09-08
 * @param system ("PDM", "PMS", "CPC", "Dashbord" ~~)
 * @param module ("���", "�����", "��ǰ(����)��", ~~~)
 * @param menu ("����˻�", "������" ~~)
 * @param logInOutYN (�α��� : "Y", �α׾ƿ� : "N", etc : "")
 */
function accessLogPlm (system, module, menu, logInOutYN) {
	
//	$.ajax({
//        url      : '/Windchill/servlet/dgt/access/controller/saveDGAccessPlm',
//        data     : { 
//        		accessSystem   : system
//        	  , accessModule   : module
//        	  , accessMenuName : menu
//        	  , logInOutYN 	   : logInOutYN
//        },
//        type     : 'POST',
//        dataType : "json",        
//        beforeSend: function(){	 
//        },
//        complete: function(){
//        }
//    });
	
}
/**
 * jclee 2015-09-09
 * @param id	 (�����Id)
 * @param name   (������̸�)
 * @param corp   (��ü��)
 * @param module (����)
 * @param menu   (�޴���)
 * @param logInOutYN (�α��� : "Y", �α׾ƿ�: "N", �޴����� : "")
 */
function accessLogCpc (id, name,  corp, module, menu, logInOutYN) {
	
	$.ajax({
		url      : '/Windchill/servlet/dgt/access/controller/saveDGAccessCpc',
		data     : {
			  userId 		 : id
			, userName 		 : name			
			, userCorp 		 : corp
			, accessModule   : module
			, accessMenuName : menu
			, logInOutYN 	 : logInOutYN
		},
		type     : 'POST',
		dataType : "json",        
		beforeSend: function(){	 
		},
		complete: function(){
		}
	});
	
}