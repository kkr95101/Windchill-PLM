// 랜덤 이미지 보이기 (로그인 화면)

  // 페이지 로드 이벤트 처리기 구성
 function randomimg() {
	 // 랜덤하게 보여줄 사진 개체 저장
      var myPhotos = new Array(                
		"/Windchill/extcore/images/login_center_img_02.jpg", "/Windchill/extcore/images/login_center_img_01.jpg", "/Windchill/extcore/images/login_center_img_02.jpg");             
	 // 0~2번째 인덱스를 랜덤하게 생성            
		var index = Math.floor(Math.random() * myPhotos.length); // Math.floor(2.7) = 2             
	// 0~2번째 인덱스에 해당하는 이미지를 출력            
		document.getElementById("imgPlaceHolder").src = myPhotos[index];                      
	};    