//���� �̹��� ���̱� (Home ȭ��)

// ������ �ε� �̺�Ʈ ó���� ����
function randomimg() {
	// �����ϰ� ������ ���� ��ü ����
	var myPhotos = new Array(                
			"/Windchill/extcore/images/home_left_img_02.jpg", "/Windchill/extcore/images/home_left_img_03.jpg", "/Windchill/extcore/images/home_left_img_04.jpg", "/Windchill/extcore/images/home_left_img_01.jpg");             
	// 0~2��° �ε����� �����ϰ� ����            
	var index = Math.floor(Math.random() * myPhotos.length); // Math.floor(4.7) = 4             
	// 0~2��° �ε����� �ش��ϴ� �̹����� ���            
	document.getElementById("imgPlaceHolder").src = myPhotos[index];                      
};    

function randomimgEng() {
	// �����ϰ� ������ ���� ��ü ����
	var myPhotos = new Array(                
			"/Windchill/extcore/images/home_left_img_02_e.jpg", "/Windchill/extcore/images/home_left_img_03_e.jpg", "/Windchill/extcore/images/home_left_img_04_e.jpg", "/Windchill/extcore/images/home_left_img_01_e.jpg");             
	// 0~2��° �ε����� �����ϰ� ����            
	var index = Math.floor(Math.random() * myPhotos.length); // Math.floor(4.7) = 4             
	// 0~2��° �ε����� �ش��ϴ� �̹����� ���            
	document.getElementById("imgPlaceHolder").src = myPhotos[index];                      
}; 	
