/**
 * @desc : dhtmlXGridObject의 이미지 폴더 경로
 * @returns {String}
 */
function getGridImagePath(){
	return "/Windchill/extcore/dhtmlx/imgs/";
}

/**
 * @desc :  dhtmlXGridObject의 Skin명
 * @returns {String}
 */
function getGridSkin(){
	return "dhx_skyblue";
}

/**
 * @desc : dhtmlXGridObject 생성(Class 함수에서만 사용해야함.)
 * @param : id - html tag의 id
 * @returns {dhtmlXGridObject}
 */
function createGrid(id){
	if(document.getElementById(id) == null){
		alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
		return null;
	}
	var grid = new dhtmlXGridObject(id);
	
	if(this.name == "dgFileGridObject"){
		grid.attachEvent("onRowDblClicked", downloadFileEvent);
	}
	
	if(this.name == "dgWorkUserGridObject"){
		grid.enableDragAndDrop(true);
	}
	
	return this.initGrid(grid);
}

/**
* @desc : dgTabbarObject에 dhtmlXGridObject 생성(Class 함수에서만 사용해야함.)
* @param : dgTabbar - (dgTabbarObject) 
* @param : tabIdx - tabbar의 tab 이름
* @returns {dhtmlXGridObject}
*/
function createDgTabbarGrid(dgTabbar, tabIdx){
	if(dgTabbar == null){
		alert("dgTabbarObject가 null입니다.");
		return null;
	}
	
	return this.createTabbarGrid(dgTabbar.tabbar, tabIdx);
}

/**
 * @desc : dhtmlXTabBar에 dhtmlXGridObject 생성(Class 함수에서만 사용해야함.)
 * @param : tabbar - (dhtmlXTabBar) tabbar Object
 * @param : tabIdx - tabbar의 tab 이름
 * @returns {dhtmlXGridObject}
 */
function createTabbarGrid(tabbar, tabIdx){
	if(tabbar == null){
		alert("Tabbar가 null입니다.");
		return null;
	}
	
	if(tabIdx == null){
		tabIdx = tabbar.getActiveTab();
	}
	
	var grid = tabbar.cells(tabIdx).attachGrid();
	
	if(this.name == "dgFileGridObject"){
		grid.attachEvent("onRowDblClicked", downloadFileEvent);
	}
	return this.initGrid(grid);
}

/**
 * @desc : downloadGrid의 기본 downloadfunction
 */
function downloadFileEvent(row, cell){
	document.location.href = row;
}

/**
 * @desc : dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
 */
function initGrid(grid){
	if(grid == null){
		alert("Grid가 null입니다.");
		return null;
	}
	grid.setImagePath(this.imagePath);
	grid.setHeader(this.header);
	grid.setColTypes(this.colTypes);
	grid.setInitWidths(this.initWidths);
	grid.setColAlign(this.colAlign);
	grid.setColSorting(this.colSorting);
	grid.setSkin(this.skin);
	//grid.enableSmartRendering(true,100);
	grid.init();
	
	return grid;
}
/**
 * @desc : 클릭이벤트 추가
 * @param : grid - (dhtmlXGridObject) dhtmlXGridObject Object
 * @param : event_function - (onRowSelected(row, cell)) 이벤트 함수
 */
function attachEventRowSelect(grid, event_function){
	if(grid == null){
		alert("Grid가 null입니다.");
		return;
	}
	grid.attachEvent("onRowSelect",event_function);
}
/**
 * @desc : 더블 클릭이벤트 추가
 * @param : grid - (dhtmlXGridObject) dhtmlXGridObject Object
 * @param : event_function - (onRowDblClicked(row, cell)) 이벤트 함수
 */
function attachEventRowDblClicked(grid, event_function){
	if(grid == null){
		alert("Grid가 null입니다.");
		return;
	}
	grid.attachEvent("onRowDblClicked",event_function);
}
/**
 * @desc : Grid의 Rows를 파라메터 문자로 리턴
 * @param : grid - (dhtmlXGridObject) dhtmlXGridObject Object
 * @param : paramName - GET 또는 POST로 넘길 파라메터 이름
 * @returns : {string} - GET 또는 POST로 넘길 파라메터 문자열
 */
function getRelatedObjectParamString(grid, paramName){
    var params = "";
	if(grid == null){
		alert("Grid가 null입니다.");
	    return "";
	}

	for(var i = 0 ; i < grid.getRowsNum() ; i++){
		params += "&" + paramName + "=" + grid.getRowId(i);
	}
	return params;
}
/*******************************************************************************************
 * @desc : 문서 Grid Object
 * @returns {dgDocGridObject}
 */
function dgDocGridObject(){
	this.name = "dgDocGridObject";
	this.imagePath = getGridImagePath();
	this.header = "번호,문서번호, 문서명, Version, 진행상태, 문서 분류, 코드 분류,  작성자, 작성일";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,100,*,60,70,100,100,70,70";
	this.colAlign = "left, left,left,left,left,left,left,left,left";
	this.colSorting = "int, str, str, str, str, str, str, str, date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDocGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDocGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDocGridObject.prototype.createTabbarGrid = createTabbarGrid;
// dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDocGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDocGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDocGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
// Grid의 Rows를 파라메터 문자로 리턴
dgDocGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 부품 Grid Object
 * @returns {dgPartGridObject}
 */
function dgPartGridObject(){
	this.name = "dgPartGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,구분,모델사양,품번,품명,부품코드,구조,진행상태,Version,작성자,작성일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,img,ro,ro,ro,ro";
	this.initWidths = "40,30,55,70,70,190,80,40,70,50,70,80";
	this.colAlign = "center,left,left,left,left,left,left,left,left,left,left,left,left";
	this.colSorting = "int,int,str,str,str,str,str,na,str,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgPartGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgPartGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgPartGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgPartGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgPartGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgPartGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgPartGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 부품 Grid Object
 * @returns {dgRevisePartGridObject}
 */
function dgRevisePartGridObject(){
	this.name = "dgRevisePartGridObject";
	this.imagePath = getGridImagePath();
	this.header = "품번,수량,진행상태,Version,작성자";
	this.colTypes = "tree,ed,ro,ro,ro";
	this.initWidths = "200,50,70,50,70";
	this.colAlign = "left,right,left,left,left";
	this.colSorting = "str,int,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgRevisePartGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgRevisePartGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgRevisePartGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgRevisePartGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgRevisePartGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgRevisePartGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgRevisePartGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;
/*******************************************************************************************
 * @desc : 부품 Grid Object
 * @returns {dgReviseAftPartGridObject}
 */
function dgReviseAftPartGridObject(){
	this.name = "dgReviseAftPartGridObject";
	this.imagePath = getGridImagePath();
	this.header = "품번,수량,진행상태,Version,작성자";
	this.colTypes = "ro,ed,ro,ro,ro";
	this.initWidths = "200,50,70,50,70";
	this.colAlign = "left,right,left,left,left";
	this.colSorting = "str,int,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgReviseAftPartGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgReviseAftPartGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgReviseAftPartGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgReviseAftPartGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgReviseAftPartGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgReviseAftPartGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgReviseAftPartGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : BOM Grid Object
 * @returns {dgPartGridObject}
 */
/*******************************************************************************************
 * @desc : BOM Grid Object
 * @returns {dgPartGridObject}
 */
function dgBomGridObject() {
	this.name = "dgBomGridObject";
	this.imagePath = getGridImagePath();
	this.header = "품번,품명,수량,Version,상태,고객EO,WEIGHT,MATERIAL";
	this.colTypes = "tree,ro,ed,ro,ro,ro,ro,ro";
	this.initWidths = "160,160,40,50,50,65,60,150";
	this.colAlign = "left,left,center,center,center,center,center,center";
	this.colSorting = "str,str,int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}

function dgBomGridObject(array) {
	this.name = "dgBomGridObject";
	this.imagePath = getGridImagePath();
	this.header = array[0];
	this.colTypes = array[1];
	this.initWidths = array[2];
	this.colAlign = array[3];
	this.colSorting = array[4];
	this.skin = getGridSkin();
	this.iconURL = "/Windchill/extcore/images/icon/";
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgBomGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgBomGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgBomGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgBomGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgBomGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgBomGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgBomGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : BOM Grid Object
 * @returns {dgPartGridObject}
 */
/*******************************************************************************************
 * @desc : BOM Grid Object
 * @returns {dgPartGridObject}
 */
function dgBomCompareGridObject() {
	this.name = "dgBomCompareGridObject";
	this.imagePath = getGridImagePath();
	this.header = "품번,품명,수량,version,상태,WEIGHT,MATERIAL";
	this.colTypes = "tree,ro,ro,ro,ro,ro,ro";
	this.initWidths = "150,150,50,50,50,60,150";
	this.colAlign = "left,left,center,center,center,center,center";
	this.colSorting = "str,str,int,str,str,str,str";
	this.skin = getGridSkin();

	return this;
}

function dgBomCompareGridObject(array) {
	this.name = "dgBomCompareGridObject";
	this.imagePath = getGridImagePath();
	this.header = array[0];
	this.colTypes = array[1];
	this.initWidths = array[2];
	this.colAlign = array[3];
	this.colSorting = array[4];
	this.skin = getGridSkin();
	
	return this;
}

// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgBomCompareGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgBomCompareGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgBomCompareGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgBomCompareGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgBomCompareGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgBomCompareGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgBomCompareGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/**
 *  BOM CompareGrid - CAD Bom View
 */
function dgCadBomCompareGridObject(){
    this.name = "dgBomCompareGridObject";
	this.imagePath = getGridImagePath();
	this.header = "부품번호,수량,부품명,품목코드";
	this.colTypes = "tree,ro,ro,ro";
	this.initWidths = "225,50,200,100";
	this.colAlign = "left,right,left,center";
	this.colSorting = "str,int,str,str"
	this.skin = getGridSkin();
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgCadBomCompareGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgCadBomCompareGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgCadBomCompareGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgCadBomCompareGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgCadBomCompareGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgCadBomCompareGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgCadBomCompareGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

 /**
 *  BOM CompareGrid - ERP Bom View
 */
function dgErpBomCompareGridObject(){
    this.name = "dgBomCompareGridObject";
	this.imagePath = getGridImagePath();
	this.header = "부품번호,수량,부품명,품목코드";
	this.colTypes = "tree,ro,ro,ro";
	this.initWidths = "225,50,200,100";
	this.colAlign = "left,right,left,center";
	this.colSorting = "str,int,str,str"
	this.skin = getGridSkin();
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgErpBomCompareGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgErpBomCompareGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgErpBomCompareGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgErpBomCompareGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgErpBomCompareGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgErpBomCompareGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgErpBomCompareGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;


/**
 *  BOM - ERP Bom View
 */
function dgErpBomGridObject(){
    this.name = "dgErpBomGridObject";
	this.imagePath = getGridImagePath();
	this.header = "부품번호,수량,부품명,품목코드,시작일,종료일,제조구분";
	this.colTypes = "tree,ro,ro,ro,ro,ro,ro";
	this.initWidths = "250,50,250,150,100,100,100";
	this.colAlign = "left,right,left,center,center,center,center";
	this.colSorting = "str,int,str,str,str,str,str"
	this.skin = getGridSkin();
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgErpBomGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgErpBomGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgErpBomGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgErpBomGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgErpBomGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgErpBomGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgErpBomGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;


/*******************************************************************************************
 * @desc : MBOM Grid Object
 * @returns {dgPartGridObject}
 */
/*******************************************************************************************
 * @desc : BOM Grid Object
 * @returns {dgPartGridObject}
 */
function dgMBomGridObject() {
	this.name = "dgMBomGridObject";
	this.imagePath = getGridImagePath();
	this.header = "부품번호,수량,부품명,품목코드,상태,Version,작성자,작성일,시작일,종료일,제조구분,창고";
	this.colTypes = "tree,ed,ro,ed,ro,ro,ro,ro,ed,ed,coro,coro";
	this.initWidths = "200,50,200,120,70,50,70,70,70,70,70,150";
	this.colAlign = "left,right,left,center,left,center,center,center,center,center,left,left";
	this.colSorting = "str,int,str,str,str,str,str,str,str,str,str"
	this.skin = getGridSkin();

	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgMBomGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgMBomGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgMBomGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgMBomGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgMBomGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgMBomGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgMBomGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 도면 Grid Object
 * @returns {dgDrawGridObject}
 */
function dgDrawGridObject(){
	this.name = "dgDrawGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,번호,도면번호,도면명,Version,진행상태,작성자,작성일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,80,400,50,100,80,80";
	this.colAlign = "center,left,left,left,left,left,left,left";
	this.colSorting = "int,int, str, str, str, str, str, date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDrawGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDrawGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDrawGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDrawGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDrawGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDrawGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgDrawGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : Eco Grid Object
 * @returns {dgEcoGridObject}
 */
function dgEcoGridObject(){
	this.name = "dgEcoGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,ECO번호,ECO제목,상태,사업부,적용구분,변경사유,설변형태,작성자,작성일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "30,30,100,300,50,70,70,70,60,50,80";
	this.colAlign = "center,center,center,left,center,center,center,center,center,center,center";
	this.colSorting = "int,int,str,str,str,str,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgEcoGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgEcoGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgEcoGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgEcoGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgEcoGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgEcoGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgEcoGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : Nc Grid Object
 * @returns {dgNcGridObject}
 */
function dgNcGridObject(){
this.name = "dgNcGridObject";
this.imagePath = getGridImagePath();
this.header = "#master_checkbox,NO,NCR번호,NCR제목,NCR구분,품번,품명,상태,부서,NCR작성,ECR,ECO,작성자,작성일";
this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro";
this.initWidths = "30,30,100,200,70,90,120,60,90,50,40,40,50,80";
this.colAlign = "center,center,left,left,left,left,left,center,center,center,center,center,center,left";
this.colSorting = "int,int,str,str,str,str,str,str,str,str,str,str,str,str";
this.skin = getGridSkin();

return this;
}
//dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgNcGridObject.prototype.initGrid = initGrid;
//dhtmlXGridObject 생성
dgNcGridObject.prototype.createGrid = createGrid;
//dhtmlXTabBar에 dhtmlXGridObject 생성
dgNcGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgNcGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
//클릭이벤트 추가
dgNcGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
//더블 클릭이벤트 추가
dgNcGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgNcGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;


/*******************************************************************************************
 * @desc : 프로젝트 일정변경이력 Grid Object
 * @returns {dgProjectChangeHistoryGridObject}
 */
function dgProjectChangeHistoryGridObject(){
	this.name = "dgProjectChangeHistoryGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,구분,변경일자,변경자,계획시작일,계획종료일,챠트,변경사유";
	this.colTypes = "ro,ro,ro,ro,ro,ro,img,ro";
	this.initWidths = "40,60,60,60,60,60,60,60,60";
	this.colAlign = "center,left,center,center,center,center,center,left";
	this.colSorting = "int,str,str,str,str,str,str,na,na";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgProjectChangeHistoryGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgProjectChangeHistoryGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgProjectChangeHistoryGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgProjectChangeHistoryGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgProjectChangeHistoryGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgProjectChangeHistoryGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgProjectChangeHistoryGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 프로젝트 이슈 Grid Object
 * @returns {dgTemplateProjectOutputObject}
 */
function dgProjectIssueGridObject(){
	this.name = "dgProjectIssueGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,태스크명,구분,제목,등록자,등록일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,100,100,100,100,100,100";
	this.colAlign = "center,center,center,center,left,center,center";
	this.colSorting = "int,int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgProjectIssueGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgProjectIssueGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgProjectIssueGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgProjectIssueGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgProjectIssueGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgProjectIssueGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgProjectIssueGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;


/*******************************************************************************************
 * @desc : Ecn Grid Object
 * @returns {dgEcnGridObject}
 */
function dgEcnGridObject(){
	this.name = "dgEcnGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,ECN번호,긴급,ECN제목,진행상태,설변주체,변경사유,설변형태,작성자,작성일";
	this.colTypes = "ch,ro,ro,img,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,100,40,250,70,70,80,80,70,80";
	this.colAlign = "center,left,left,left,left,left,left,left,left,left,left,left";
	this.colSorting = "int, int, str, na, str, str, str, str, str, str, date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgEcnGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgEcnGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgEcnGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgEcnGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgEcnGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgEcnGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgEcnGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : Ecr Grid Object
 * @returns {dgEcrGridObject}
 */
function dgEcrGridObject(){
	this.name = "dgEcrGridObject";
	this.imagePath = getGridImagePath();
	this.header = "ECR번호,ECR제목,요청사유,제품구분,조치요청일,진행상태,작성자,작성일";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "100,250,70,70,80,80,70,80";
	this.colAlign = "left,left,left,left,left,left,left,left,left";
	this.colSorting = "str, str, str, str, date, str, str, date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgEcrGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgEcrGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgEcrGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgEcrGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgEcrGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgEcrGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgEcrGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 첨부파일 Grid Object
 * @returns {dgFileGridObject}
 */
function dgFileGridObject(){
	this.name = "dgFileGridObject";
	this.imagePath = getGridImagePath();
	this.header = "번호,컨텐츠타입,파일명,파일사이즈";
	this.colTypes = "ro,ro,ro,ro";
	this.initWidths = "50,100,*,100";
	this.colAlign = "left,left,left,left";
	this.colSorting = "int, str, str, str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgFileGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgFileGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgFileGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgFileGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgFileGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgFileGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgFileGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 공지사항 Grid Object
 * @returns {dgNotifyGridObject}
 */
function dgNotifyGridObject(){
	this.name = "dgNotifyGridObject";
	this.imagePath = getGridImagePath();
	this.header = "번호,첨부,제목,등록일,등록자,조회";
	this.colTypes = "ro,img,ro,ro,ro,ro";
	this.initWidths = "50,60,*,150,80,80";
	this.colAlign = "left,left,left,left,left,left";
	this.colSorting = "str, na, str, date, str, int";
	this.skin = getGridSkin();

	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgNotifyGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgNotifyGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgNotifyGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgNotifyGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgNotifyGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgNotifyGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgNotifyGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재대기 Grid Object
 * @returns {dgWorkListGridObject}
 */
function dgWorkListGridObject(){
	this.name = "dgNotifyGridObject";
	this.imagePath = getGridImagePath();
	this.header = "번호,업무명,유형,업무 대상,진행상태,수신일자,입안자";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "50,70,70,*,80,140,80";
	this.colAlign = "left,left,left,left,left,left,left";
	this.colSorting = "int, str, str, str, str, date, str";
	this.skin = getGridSkin();

	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgWorkListGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgWorkListGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgWorkListGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgWorkListGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgWorkListGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgWorkListGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgWorkListGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 사용자정보 Grid Object
 * @returns {dgUserGridObject}
 */
function dgUserGridObject(){
	this.name = "dgUserGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,아이디,이름,부서,직위,이메일";
	this.colTypes = "ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,60,60,80,60,200";
	this.colAlign = "left,left,left,left,left,left";
	this.colSorting = "int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgUserGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgUserGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgUserGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgUserGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgUserGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgUserGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgUserGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 사용자선택 Grid Object
 * @returns {dgSelectUserGridObject}
 */
function dgSelectUserGridObject(){
	this.name = "dgSelectUserGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,아이디,이름,부서,직위,이메일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,60,60,80,60,200";
	this.colAlign = "center,left,left,left,left,left,left";
	this.colSorting = "str,int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgSelectUserGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgSelectUserGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgSelectUserGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgSelectUserGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgSelectUserGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgSelectUserGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgSelectUserGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재인정보 Grid Object
 * @returns {workUserGridObject}
 */
function dgWorkUserGridObject(){
	this.name = "dgWorkUserGridObject";
	this.imagePath = getGridImagePath();
	this.header = "이름";
	this.colTypes = "ro";
	this.initWidths = "*";
	this.colAlign = "center";
	this.colSorting = "str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgWorkUserGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgWorkUserGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgWorkUserGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgWorkUserGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgWorkUserGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgWorkUserGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgWorkUserGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 템플릿 프로젝트 Grid Object
 * @returns {dgTemplateProjectGridObject}
 */
function dgTemplateProjectGridObject(){
	this.name = "dgTemplateProjectGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,템플릿프로젝트명, 기간, 최초등록일, 최종수정일";
	this.colTypes = "ro,ro,ro,ro,ro";
	this.initWidths = "40,150,60,120,120";
	this.colAlign = "left,left,left,left,left";
	this.colSorting = "int,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgTemplateProjectGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgTemplateProjectGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgTemplateProjectGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgTemplateProjectGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgTemplateProjectGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgTemplateProjectGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgTemplateProjectGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 프로젝트 Grid Object
 * @returns {dgProjectGridObject}
 */
function dgProjectGridObject(){
	this.name = "dgProjectGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,프로젝트명,사업부,제품군,개발제품유형,설계권한,진행상태,진행율,고객사,차종,엔진,변속기,PM,기간,시작일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,200,80,80,80,80,60,80,60,60,60,60,80,60,80";
	this.colAlign = "center,center,center,center,left,left,left,center,center,center,left,left,center,center,center,center";
	this.colSorting = "int,int,str,str,str,str,str,str,str,str,str,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgProjectGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgProjectGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgProjectGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgProjectGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgProjectGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgProjectGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgProjectGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 템플릿 프로젝트 산출물 Grid Object
 * @returns {dgTemplateProjectOutputObject}
 */
function dgTemplateProjectOutputObject(){
	this.name = "dgTemplateProjectOutputObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,산출물명,문서분류,담당자,Version,상태,작성일자";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,200,250,50,40,60,80";
	this.colAlign = "center,left,left,left,center,center,center";
	this.colSorting = "str,int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgTemplateProjectOutputObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgTemplateProjectOutputObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgTemplateProjectOutputObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgTemplateProjectOutputObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgTemplateProjectOutputObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgTemplateProjectOutputObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgTemplateProjectOutputObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 프로젝트 전체 산출물 Grid Object
 * @returns {dgProjectAllOutputObject}
 */
function dgProjectAllOutputObject(){
	this.name = "dgProjectAllOutputObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,태스크,산출물명,문서분류,담당자,등록일,등록여부";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,100,100,100,100,100,100";
	this.colAlign = "left,left,left,left,left,left,left";
	this.colSorting = "int,str,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgProjectAllOutputObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgProjectAllOutputObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgProjectAllOutputObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgProjectAllOutputObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgProjectAllOutputObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgProjectAllOutputObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgProjectAllOutputObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 나의 프로젝트 산출물 Grid Object
 * @returns {dgMyProjectOutputObject}
 */
function dgMyProjectOutputObject(){
	this.name = "dgMyProjectOutputObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,프로젝트,태스크,산출물명,문서분류,등록일,등록여부";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,100,100,100,100,100,100";
	this.colAlign = "left,left,left,left,left,left,left";
	this.colSorting = "int,str,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgMyProjectOutputObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgMyProjectOutputObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgMyProjectOutputObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgMyProjectOutputObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgMyProjectOutputObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgMyProjectOutputObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgMyProjectOutputObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 프로젝트 참여자 Grid Object
 * @returns {dgSelectParticipantGridObject}
 */
function dgSelectParticipantGridObject(){
	this.name = "dgSelectParticipantGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,이름,부서,직위,프로젝트권한,이메일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,80,80,80,80,200";
	this.colAlign = "center,left,left,left,left,left,left";
	this.colSorting = "str,int,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgSelectParticipantGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgSelectParticipantGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgSelectParticipantGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgSelectParticipantGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgSelectParticipantGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgSelectParticipantGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgSelectParticipantGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 템플릿 태스크 Grid Object
 * @returns {dgTemplateTaskGridObject}
 */
function dgTemplateTaskGridObject(){
	this.name = "dgTemplateTaskGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,이름,기간";
	this.colTypes = "ch,ro,ro,ro";
	this.initWidths = "40,40,80,80";
	this.colAlign = "center,left,left,left";
	this.colSorting = "int,int,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgTemplateTaskGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgTemplateTaskGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgTemplateTaskGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgTemplateTaskGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgTemplateTaskGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgTemplateTaskGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgTemplateTaskGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 태스크 Grid Object
 * @returns {dgTaskGridObject}
 */
function dgTaskGridObject(){
	this.name = "dgTaskGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,이름,기간,계획시작일,계획종료일,실제시작일,실제종료일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,80,80,80,80,80,80";
	this.colAlign = "center,center,left,center,center,center,center,center";
	this.colSorting = "int,int,str,str,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgTaskGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgTaskGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgTaskGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgTaskGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgTaskGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgTaskGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgTaskGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 선행 태스크 Grid Object
 * @returns {dgDependTaskGridObject}
 */
function dgDependTaskGridObject(){
	this.name = "dgDependTaskGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,이름,기간";
	this.colTypes = "ro,ro,ro";
	this.initWidths = "40,80,80";
	this.colAlign = "left,left,left";
	this.colSorting = "int,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDependTaskGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDependTaskGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDependTaskGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDependTaskGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDependTaskGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDependTaskGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgDependTaskGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 템플릿 Work Grid Object
 * @returns {dgTemplateWorkGridObject}
 */
function dgTemplateWorkGridObject(){
	this.name = "dgTemplateWorkGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,이름,담당자,완료여부,완료일시";
	this.colTypes = "ch,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,200,80,120,120";
	this.colAlign = "center,left,left,left,center,center";
	this.colSorting = "int,int,str,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgTemplateWorkGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgTemplateWorkGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgTemplateWorkGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgTemplateWorkGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgTemplateWorkGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgTemplateWorkGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgTemplateWorkGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재대기 Grid Object
 * @returns {dgWorklistGridObject}
 */
function dgWorklistGridObject(){
	this.name = "dgWorklistGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,업무명,유형,업무대상,결재상태,수신일자,기한일자,입안자,taskURLPath";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,120,60,200,60,80,80,70,80";
	this.colAlign = "center,center,center,center,left,center,center,center,left,left";
	this.colSorting = "int,int,str,str,str,str,date,date,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgWorklistGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgWorklistGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgWorklistGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgWorklistGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgWorklistGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgWorklistGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgWorklistGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재완료 Grid Object
 * @returns {dgCompletedWorklistGridObject}
 */
function dgCompletedWorklistGridObject(){
	this.name = "dgCompletedWorklistGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,업무명,유형,업무대상,결재내역,수신일자,결재일자";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,120,60,200,60,80,80";
	this.colAlign = "center,center,center,center,left,center,center,center";
	this.colSorting = "int,int,str,str,str,str,date,date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgCompletedWorklistGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgCompletedWorklistGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgCompletedWorklistGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgCompletedWorklistGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgCompletedWorklistGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgCompletedWorklistGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgCompletedWorklistGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재선 Grid Object
 * @returns {dgApprovalLineGridObject}
 */
function dgApprovalLineGridObject(){
	this.name = "dgApprovalLineGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,역할,담당자,완료일자";
	this.colTypes = "ro,ro,ro,ro";
	this.initWidths = "40,120,180,150";
	this.colAlign = "center,center,center,center";
	this.colSorting = "int,str,str,date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgApprovalLineGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgApprovalLineGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgApprovalLineGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgApprovalLineGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgApprovalLineGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgApprovalLineGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgApprovalLineGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재이력 Grid Object
 * @returns {dgApprovalHistoryGridObject}
 */
function dgApprovalHistoryGridObject(){
	this.name = "dgApprovalHistoryGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,업무명,담당자,완료일자,의견";
	this.colTypes = "ro,ro,ro,ro,ro";
	this.initWidths = "40,80,120,130,300";
	this.colAlign = "center,center,center,center,center";
	this.colSorting = "int,str,str,date,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgApprovalHistoryGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgApprovalHistoryGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgApprovalHistoryGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgApprovalHistoryGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgApprovalHistoryGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgApprovalHistoryGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgApprovalHistoryGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 결재이력 Grid Object
 * @returns {dgApprovalHistoryGridObject}
 */
function dgNumberingPartGridObject(){
	this.name = "dgNumberingPartGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,품번,생성일자";
	this.colTypes = "ro,ed,ro";
	this.initWidths = "40,200,140";
	this.colAlign = "center,left,center";
	this.colSorting = "int,str,date";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgNumberingPartGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgNumberingPartGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgNumberingPartGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgNumberingPartGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgNumberingPartGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgNumberingPartGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgNumberingPartGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;


/*******************************************************************************************
 * @desc : 파트 대당 수량 Grid Object
 * @returns {dgPartPerCntGridObject}
 */
function dgPartPerCntGridObject(){
	this.name = "dgPartPerCntGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,부품구분,모델사양,Function,부품코드,품번,대당수량";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "30,60,100,80,100,100,100";
	this.colAlign = "center,left,left,left,left,left,right";
	this.colSorting = "int,str,str,str,str,str,int";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgPartPerCntGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgPartPerCntGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgPartPerCntGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgPartPerCntGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgPartPerCntGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgPartPerCntGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgPartPerCntGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 권한그룹 Grid Object
 * @returns {dgAclGroupGridObject}
 */
function dgAclGroupGridObject(){
	this.name = "dgAclGroupGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,권한그룹명,설명,구분이름";
	this.colTypes = "ch,ro,ro,ro,ro";
	this.initWidths = "40,40,100,100,100";
	this.colAlign = "center,center,left,left,left";
	this.colSorting = "int,int,str,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgAclGroupGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgAclGroupGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgAclGroupGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgAclGroupGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgAclGroupGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgAclGroupGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgAclGroupGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 제품 Grid Object
 * @returns {dgProductGridObject}
 */
function dgProductGridObject(){
	this.name = "dgProductGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,제조번호,장비명,버전,설비명,구조,상태,작성자,작성일";
	this.colTypes = "ch,ro,ro,ro,ro,ro,img,ro,ro,ro";
	this.initWidths = "40,40,80,80,80,80,80,80,80,100";
	this.colAlign = "center,center,left,left,center,left,center,center,center,left";
	this.colSorting = "int,int,str,str,int,str,na,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgProductGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgProductGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgProductGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgProductGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgProductGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgProductGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgProductGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 다운로드이력 Grid Object
 * @returns {dgApprovalHistoryGridObject}
 */
function dgDownHistoryGridObject(){
	this.name = "dgDownHistoryGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,부품 이름,다운로드횟수";
	this.colTypes = "ro,ro,ro";
	this.initWidths = "40,300,130";
	this.colAlign = "center,center,center";
	this.colSorting = "int,str,str";
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDownHistoryGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDownHistoryGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDownHistoryGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDownHistoryGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDownHistoryGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDownHistoryGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgDownHistoryGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 부품에 최상위 제품 Grid Object
 * @returns {dgProductGridObject}
 */
function dgPartProductGridObject(){
	this.name = "dgProductGridObject";
	this.imagePath = getGridImagePath();
	this.header = "#master_checkbox,NO,품번,품명,호기번호,설치라인,모델명,UNIT,고객명";
	this.colTypes = "ch,ro,ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,40,80,80,80,80,80,80,80";
	this.colAlign = "center,center,left,left,left,left,left,left,left";
	this.colSorting = "int,str,str,str,str,str,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgPartProductGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgPartProductGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgPartProductGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgPartProductGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgPartProductGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgPartProductGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgPartProductGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : 배포의뢰서 부품 Grid Object
 * @returns {dgDistPartGridObject}
 */
function dgDistPartGridObject(){
	this.name = "dgDistPartGridObject";
	this.imagePath = getGridImagePath();
	this.header = "NO,품번,품명,버전,상태,작성자,작성일";
	this.colTypes = "ro,ro,ro,ro,ro,ro,ro";
	this.initWidths = "40,80,80,80,80,80,*";
	this.colAlign = "center,left,left,center,center,center,left";
	this.colSorting = "int,str,str,int,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDistPartGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDistPartGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDistPartGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDistPartGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDistPartGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDistPartGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgDistPartGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;

/*******************************************************************************************
 * @desc : Dist BOM Grid Object
 * @returns {dgPartGridObject}
 */
function dgDistBomGridObject(){
	this.name = "dgDistBomGridObject";
	this.imagePath = getGridImagePath();
	this.header = "품번,품명,버전,수량,상태,작성자,작성일";
	this.colTypes = "tree,ro,ro,ed,ro,ro,ro";
	this.initWidths = "200,150,50,50,70,100,100";
	this.colAlign = "left,left,center,right,center,center,left";
	this.colSorting = "str,str,int,int,str,str,str"
	this.skin = getGridSkin();
	
	return this;
}
// dhtmlXGridObject 초기화(이미지경로, 헤더(타이틀), 컬럼타입, 컬럼 폭, 컬럼 정렬, 스킨)
dgDistBomGridObject.prototype.initGrid = initGrid;
// dhtmlXGridObject 생성
dgDistBomGridObject.prototype.createGrid = createGrid;
// dhtmlXTabBar에 dhtmlXGridObject 생성
dgDistBomGridObject.prototype.createTabbarGrid = createTabbarGrid;
//dgTabbarObject.tabbar(dhtmlXTabBar)에 dhtmlXGridObject 생성
dgDistBomGridObject.prototype.createDgTabbarGrid = createDgTabbarGrid;
// 클릭이벤트 추가
dgDistBomGridObject.prototype.attachEventRowSelect = attachEventRowSelect;
// 더블 클릭이벤트 추가
dgDistBomGridObject.prototype.attachEventRowDblClicked = attachEventRowDblClicked;
//Grid의 Rows를 파라메터 문자로 리턴
dgDistBomGridObject.prototype.getRelatedObjectParamString = getRelatedObjectParamString;
