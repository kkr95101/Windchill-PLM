function register() {
		//var encId = frm.userId.value;
		var encPw = frm.userPw.value;

		var keySize = 128;
		var iterations = iterationCount = 10000;

		var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
		var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
		var passPhrase = "passPhrase passPhrase aes encoding algorithm";

		var aesUtil = new AesUtil(keySize, iterationCount);
		//var encryptId = aesUtil.encrypt(salt, iv, passPhrase, encId);

		//aesUtil = new AesUtil(keySize, iterationCount);
		var encryptPw = aesUtil.encrypt(salt, iv, passPhrase, encPw);
		
		if (!nullCheck(frm.userId, "ID를 입력하세요"))
			return;
		if (!nullCheck(frm.userPw, "PassWord를 입력하세요"))
			return;
		//var tUserPw = DGEncrypt(frm.userPw.value);

		//frm.userId.value = encryptId;
		frm.userPw.value = encryptPw;
		//쿠키 생성
		createId();
		//로그인 처리
		frm.submit();
	}