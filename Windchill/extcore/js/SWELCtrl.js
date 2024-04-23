document.write('<object classid="CLSID:FB1DC4F7-58E5-4AE0-A935-0D0EBCB8F450" codebase="/Windchill/s-works/SWELCtrl.cab#version=1,5,0,35" width="10" height="10" id="SWELCtrl" style="display:none" ></object>');
//document.write('<object classid="CLSID:FB1DC4F7-58E5-4AE0-A935-0D0EBCB8F450" codebase="/Windchill/s-works/SWELCtrl.cab#version=2,0,0,16" width="10" height="10" id="SWELCtrl" style="display:none"></object>');
var authkey = "QLWP-ESRN-TNPW-QODR";
var processtype = "2";
function start(controltype){
  try{
    var statuscheck = SWELCtrl.SWorkGetStatus(authkey);
    //alert(" statuscheck = [" + statuscheck + "]");
    if(statuscheck == 101)
    {
      var ret1 = SWELCtrl.SWorkSetProcess(authkey,processtype);
      var ret2 = SWELCtrl.SWorkSetIEControlPolicy(authkey, controltype);

      if(ret2 ==true){
    	//alert("보안이 시작 되었습니다.");  
        //alert("정상 동작 : 리턴값1["+ret1+"] / 리턴값2["+ret2+"]");
      }else{  
        //alert("에러 발생 : 리턴값1["+ret1+"] / 리턴값2["+ret2+"]");
    	  alert("S-Work 에러발생.\n관리자에게 문의 하십시오. \n로그인 화면으로 돌아갑니다.");
          parent.location.replace("http://plm.myunghwa.com");
      }
    }else if(statuscheck == 102){
      alert("S-Work이 로그인 되어 있지 않습니다.\n로그인 화면으로 돌아갑니다.");
      parent.location.replace("http://plm.myunghwa.com");
    }else if(statuscheck == 103){
      alert("S-Work이 설치되어 있지 않습니다.\n로그인 화면으로 돌아갑니다.");
      parent.location.replace("http://plm.myunghwa.com");
    }
 

//   else if(statuscheck == 111){
//      alert("S-Work 키 인증이 실패 하였습니다.\n로그인 화면으로 돌아갑니다.");
//      parent.location.replace("http://plm.myunghwa.com");
//    }


  }catch (e){
	  alert("S-Work Linker 가 설치되지 되어 있지 않습니다.\n로그인 화면으로 돌아갑니다.");
	  parent.location.replace("http://plm.myunghwa.com");
  }
}
function end(){
	alert("보안이 해제 되었습니다.");
  SWELCtrl.SWorkReleaseProcess(authkey, processtype);
}
//document.body.attachEvent("onunload", end);


