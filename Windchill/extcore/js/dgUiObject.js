/*******************************************************************************************
 *  @desc : UI Object
 *  @returns : {dgUiObject}
 */
function dgUiObject(){
	this.isShowObject = true;
	this.showObjectText = "▲";
	this.hideObjectText = "▼";
	this.showObjectImg = "";
	this.hideObjectImg = "";
	return this;
}
/**
 * @desc : Html Tag Object 보여주기, 숨기기의 문자 설정
 * @param : showText - 보여주기 문자
 * @param : hideText - 숨기기 문자
 */
dgUiObject.prototype.setShowObjectText = function(showText, hideText){
	this.showObjectText = showText;
	this.hideObjectText = hideText;
}
/**
 * @desc : Html Tag Object 보여주기, 숨기기의 이미지 설정
 * @param : showSrc - 보여주기 이미지 URL(img tag의 src의 URL)
 * @param : hideSrc - 숨기기 이미지 URL(img tag의 src의 URL)
 */
dgUiObject.prototype.setShowObjectImgSrc = function(showSrc, hideSrc){
	this.showObjectImg = showSrc;
	this.hideObjectImg = hideSrc;
}
/**
 * @desc : Input Button으로 제어하는 보여주기 및 숨기기
 * @param : id - 보여주기 및 숨기기 할 Html Tag Object id
 * @param : ctlObj - Input Object
 */
dgUiObject.prototype.showObject_InputTag = function(id, ctlObj){
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return;
	}
	
	this.showObject("input", id, ctlObj);
}
/**
 * @desc : 이미지(img tag)로 제어하는 보여주기 및 숨기기
 * @param : id - 보여주기 및 숨기기 할 Html Tag Object id
 * @param : ctlObj - Img Object
 */
dgUiObject.prototype.showObject_ImgTag = function(id, ctlObj){
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return;
	}
	
	this.showObject("img", id, ctlObj);
}
/**
 * @desc : 이미지(img tag)로 제어하는 보여주기 및 숨기기
 * @param : type - input : Input Button Object, img : Img Object
 * @param : id - 보여주기 및 숨기기 할 Html Tag Object id
 * @param : ctlObj - Input 또는 Img Object
 */
dgUiObject.prototype.showObject = function(type, id, ctlObj){
	if(ctlObj == null || typeof(ctlObj) != "object"){
		alert("컨트롤 Object가 null 또는 object가 아닙니다.");
		return;
	}
	
	this.isShowObject = !(this.isShowObject);
	
	if(type == "input"){
		if(this.isShowObject) ctlObj.value = this.showObjectText;
		else ctlObj.value = this.hideObjectText;
	}else if(type == "img"){
		if(this.isShowObject) ctlObj.src = this.showObjectImg;
		else ctlObj.src = this.hideObjectImg;
	}else{
		return;
	}
	
	var obj = document.getElementById(id);
	
	if(this.isShowObject){
		obj.style.visibility = "";
		obj.style.height = "";
	}else{
		obj.style.visibility = "hidden";
		obj.style.height = "0px";
	}
}
/**
 * @desc : 특정 Html Tag Object의 높이를 확장한다.
 * @param : exId - 확장 할 Html Tag Object id
 */
dgUiObject.prototype.onResizeHeight_Body = function(exId){
	var exObj = document.getElementById(exId);
	if(exObj == null){
		alert("높이를 확장 할 Object의 ID가 '" + exId + "'인 Html Tag가 없습니다.");
		return;
	}
	var pObj = this.getParentObject(exId);
	var cHeight = document.documentElement.clientHeight;
	var bMargin = document.body.style.margin;
	
	//alert("Parent Object" + pObj);
	
	
	if(bMargin == null || bMargin == ""){
		bMargin = 10;
	}else{
		bMargin = 0 + bMargin.replace("px", "");
	}

	var eHeight = 0;
	for(var i = 0 ; i < document.body.children.length ; i++){
		var obj = document.body.children[i];
		
		if(obj.style.zIndex > 0 || obj.nodeName == '#comment')
			continue;
	
		if(obj != exObj){
			if(obj == pObj){
				eHeight += obj.offsetHeight - exObj.offsetHeight;
			}else{
				eHeight += obj.offsetHeight;
			}
		}
	}
	
	var height = cHeight - eHeight - 2 * bMargin - 3;
	if(height > 0) exObj.style.height = height + "px";
}
/**
 * @desc : Object의 Parent중 Body Tag Object의 바로 하위에 있는 Object 얻기
 * @param : id - Html Tag Object id
 * @returns : {HTMLElement}
 */
dgUiObject.prototype.getParentObject = function(id){
	
	var obj = document.getElementById(id);
	if(obj == null) return null;
	
	// 속도 때문에 15번만 수행함.
	var pObj = obj;
	for(var i = 0 ; i < 15 ; i++){
		if(document.body == pObj.parentNode){
			break;
		}
		pObj = pObj.parentNode;
	}
	
	if(obj == pObj) return null;
	
	return pObj;
}
