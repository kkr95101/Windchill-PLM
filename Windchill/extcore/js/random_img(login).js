// ���� �̹��� ���̱� (�α��� ȭ��)

  // ������ �ε� �̺�Ʈ ó���� ����
 function randomimg() {
	 // �����ϰ� ������ ���� ��ü ����
      var myPhotos = new Array(                
		"/Windchill/extcore/images/login_center_img_02.jpg", "/Windchill/extcore/images/login_center_img_01.jpg", "/Windchill/extcore/images/login_center_img_02.jpg");             
	 // 0~2��° �ε����� �����ϰ� ����            
		var index = Math.floor(Math.random() * myPhotos.length); // Math.floor(2.7) = 2             
	// 0~2��° �ε����� �ش��ϴ� �̹����� ���            
		document.getElementById("imgPlaceHolder").src = myPhotos[index];                      
	};    