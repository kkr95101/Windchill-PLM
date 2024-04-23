/**
 * @desc : dhtmlXGridObject의 이미지 폴더 경로
 * @returns {String}
 */
function getTabbarImagePath(){
	return "/Windchill/extcore/dhtmlx/imgs/";
}

/**
 * @desc :  dhtmlXGridObject의 Skin명
 * @returns {String}
 */
function getTabbarSkin(){
	return "dhx_skyblue";
}

/*******************************************************************************************
 *  @desc : TabBar Object
 *  @param : id - html tag의 id
 *  @returns : {dgTabbarObject}
 */
function dgTabbarObject(id){
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return null;
	}
	this.tabIdx = 1;
	this.tabTempIdx = "!@#$%%^&*";
	this.tabFirstIdx = null;
	
	this.tabbar = new dhtmlXTabBar(id);
	this.tabbar.setSkin(getTabbarSkin());
	this.tabbar.enableAutoReSize(true);

	return this;
}

/**
 * @desc : dhtmlXTabBar Object 얻기
 * @returns : {dhtmlXTabBar}
 */
dgTabbarObject.prototype.getTabbar = function(){
	return this.tabbar;
}

/**
 * @desc : Tab에 닫기 버튼 생성 유무
 * @param : isCloseButton - true : 닫기 버튼(O), false : 닫기 버튼(X)
 */
dgTabbarObject.prototype.enableTabCloseButton = function(isCloseButton){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
	}
	this.tabbar.enableTabCloseButton(isCloseButton);
}

/**
 * @desc : Tabbar에 Tab 추가
 * @param : tabTitle - Tab 명
 * @param : size - Tab의 폭(가로 정렬)
 * @returns : {int}
 */
dgTabbarObject.prototype.addTab = function(tabTitle, size){
	return this._addTab(this.tabIdx++, tabTitle, size);
}

/**
 * @desc : Tabbar에 가상 Tab 추가 ( 검색 화면에서 처음 오픈 할때 빈 Tab을 보여주기 위함)
 * @param : tabTitle - Tab 명
 * @param : size - Tab의 폭(가로 정렬)
 * @returns : {int}
 */
dgTabbarObject.prototype.addTempTab = function(tabTitle, size){
	return this._addTab(this.tabTempIdx, tabTitle, size);
}

/**
 * @desc : Tabbar에 Tab 추가
 * @param : tabIdx - Tab의 ID
 * @param : tabTitle - Tab 명
 * @param : size - Tab의 폭(가로 정렬)
 * @returns : {int}
 */
dgTabbarObject.prototype._addTab = function(tabIdx, tabTitle, size){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return -1;
	}
	
	if(this.tabTempIdx != tabIdx){
		if (this.tabbar.tabs(this.tabTempIdx) != null){
			this.tabbar.tabs(this.tabTempIdx).close();
		}
	}

	if(this.tabFirstIdx == null){
		this.tabFirstIdx = tabIdx;
	}
	this.tabbar.addTab(tabIdx, tabTitle , size + "px");
	
	if(this.tabbar.tabs(tabIdx) != null){
		this.tabbar.tabs(tabIdx).setActive();
	}
	
	return tabIdx;
}

/**
 * @desc : Tabbar에 tag Object를 Tab 추가
 * @param : tabIdx - Tab의 ID
 * @param : id - html tag의 id
 */
dgTabbarObject.prototype.attachObject = function(tabIdx, id){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}
	
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return;
	}
	
	this.tabbar.cells(tabIdx).attachObject(id);
}

/**
 * @desc : Tabbar에 tag Object를 Tab 추가
 * @param : tabIdx - Tab의 ID
 * @param : id - html tag의 id
 */
dgTabbarObject.prototype.attachURL = function(tabIdx, url){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}
	/*
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return;
	}
	*/
	this.tabbar.cells(tabIdx).attachURL(url);
}

/**
 * @desc : tabIdx Tab 활성화
 * @param : tabIdx - Tab의 ID
 */
dgTabbarObject.prototype.setActiveTab = function(tabIdx){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}
	this.tabbar.tabs(tabIdx).setActive();
}

/**
* @desc : 첫번째 Tab 활성화
*/
dgTabbarObject.prototype.setActiveFirstTab = function(){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}

	if(this.tabFirstIdx != null)
		this.tabbar.tabs(this.tabFirstIdx).setActive();
}

/**
* @desc : 활성화 된 Tab 얻기
*/
dgTabbarObject.prototype.getActiveTab = function(){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}
	return this.tabbar.getActiveTab();
}

/**
* @desc : 활성화 된 Tab의 Grid 얻기
*/
dgTabbarObject.prototype.getActiveTabGrid = function(){
	if(this.tabbar == null){
		alert("Tabbar가 null입니다.");
		return;
	}
	var tabIdx;
	var grid;
	
	try{
		tabIdx = this.tabbar.getActiveTab();
		var obj = this.tabbar.cells(tabIdx).getAttachedObject();
		if (typeof(window.dhtmlXGridObject) == "function" && obj instanceof dhtmlXGridObject) {
			grid = obj;
		}
		
	}catch(e){
		grid = null;
	}
	
	return grid;
}