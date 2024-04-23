/*******************************************************************************************
 *  @desc : Calendar Object
 *  @param : divId - html div tag의 id
 *  @param : inputId1 - html input tag의 id(시작 날짜 Input)
 *  @param : inputId2 - html input tag의 id(종료 날짜 Input)
 *  @param : showVer - 다중 달력의 세로 위치(TOP : 클릭한 포인트 위에 표시, BOTTOM : 클릭한 포인트 아래에 표시)
 *  @param : showHor - 다중 달력의 가로 위치(LEFT : 클릭한 포인트 왼쪽에 표시, RIGHT : 클릭한 포인트 오른쪽에 표시)
 *  @returns : {dgCalendarObject}
 */
function dgCalendarObject(divId, inputId1, showVer, showHor){
  this.divObject = document.getElementById(divId);
  if(this.divObject == null){
    alert("Div ID의 Object가 없습니다.");
    return null;
  }

  this.inputObject_01 = document.getElementById(inputId1);
  if(this.inputObject_01 == null){
    alert("Input ID의 Object가 없습니다.");
    return null;
  }

  this.calendar = new dhtmlxCalendarObject(divId);
  this.calendar.setDateFormat("%Y-%m-%d");
  this.calendar.draw();
  this.hide();
  
  this.showVer;
  this.showHor;
  this.setShowVer(showVer);
  this.setShowHor(showHor);
  
  return this;
}

/**
 * @desc : 달력의 세로 위치
 * @param : showVer - 다중 달력의 세로 위치(TOP : 클릭한 포인트 위에 표시, BOTTOM : 클릭한 포인트 아래에 표시)
 */
dgCalendarObject.prototype.setShowVer = function(showVer){
  if(this.showVer == "TOP") this.showVer = "TOP";
  else         this.showVer = "BOTTOM";
}
/**
 * @desc : 달력의 가로 위치
 * @param : showHor - 다중 달력의 가로 위치(LEFT : 클릭한 포인트 왼쪽에 표시, RIGHT : 클릭한 포인트 오른쪽에 표시)
 */
dgCalendarObject.prototype.setShowHor = function(showHor){
  if(this.showHor == "RIGHT") this.showVer = "RIGHT";
  else          this.showVer = "LEFT";
}
/**
 * @desc : 달력 표시 또는 숨기기
 */
dgCalendarObject.prototype.showHide = function(){
  if(this.divObject.style.display == "none"){
    this.show();
  }else{
    this.hide();
  }
}
/**
 * @desc : 달력 표시
 */
dgCalendarObject.prototype.show = function(){
  this.divObject.style.display = "";
  
  if(this.showVer == "TOP"){
    this.divObject.style.top = (event.clientY - this.divObject.clientHeight - 10) + "px";
  }else{
    this.divObject.style.top = (event.clientY + 10) + "px";
  }
  
  if(this.showHor == "RIGHT"){
    this.divObject.style.left = (event.clientX + 10) + "px";
  }else{
    this.divObject.style.left = (event.clientX - this.divObject.clientWidth - 10) + "px";
  }
}
/**
 * @desc : 달력 숨기기
 */
dgCalendarObject.prototype.hide = function(){
  this.divObject.style.display = "none";
}


/*******************************************************************************************
 *  @desc : Calendar Object
 *  @param : divId - html div tag의 id
 *  @param : inputId1 - html input tag의 id(시작 날짜 Input)
 *  @param : inputId2 - html input tag의 id(종료 날짜 Input)
 *  @param : showVer - 다중 달력의 세로 위치(TOP : 클릭한 포인트 위에 표시, BOTTOM : 클릭한 포인트 아래에 표시)
 *  @param : showHor - 다중 달력의 가로 위치(LEFT : 클릭한 포인트 왼쪽에 표시, RIGHT : 클릭한 포인트 오른쪽에 표시)
 *  @returns : {dgCalendarObject}
 */
function dgDbCalendarObject(divId, inputId1, inputId2, showVer, showHor){
	this.divObject = document.getElementById(divId);
	if(this.divObject == null){
		alert("Div ID의 Object가 없습니다.");
		return null;
	}

	this.inputObject_01 = document.getElementById(inputId1);
	this.inputObject_02 = document.getElementById(inputId2);
	if(this.inputObject_01 == null || this.inputObject_02 == null){
		alert("Input ID의 Object가 없습니다.");
		return null;
	}
	
	this.calendar = new dhtmlxDblCalendarObject(divId);
	this.calendar.setDateFormat("%Y-%m-%d");
	this.calendar.setDates("2012-08-07","2012-08-23");
	this.calendar.show();
	this.hide();
	
	this.showVer;
	this.showHor;
	this.setShowVer(showVer);
	this.setShowHor(showHor);
	
	return this;
}

/**
 * @desc : 달력의 세로 위치
 * @param : showVer - 다중 달력의 세로 위치(TOP : 클릭한 포인트 위에 표시, BOTTOM : 클릭한 포인트 아래에 표시)
 */
dgDbCalendarObject.prototype.setShowVer = function(showVer){
	if(this.showVer == "TOP") this.showVer = "TOP";
	else				 this.showVer = "BOTTOM";
}
/**
 * @desc : 달력의 가로 위치
 * @param : showHor - 다중 달력의 가로 위치(LEFT : 클릭한 포인트 왼쪽에 표시, RIGHT : 클릭한 포인트 오른쪽에 표시)
 */
dgDbCalendarObject.prototype.setShowHor = function(showHor){
	if(this.showHor == "RIGHT")	this.showVer = "RIGHT";
	else				 	this.showVer = "LEFT";
}
/**
 * @desc : 달력 표시 또는 숨기기
 */
dgDbCalendarObject.prototype.showHide = function(){
	if(this.divObject.style.display == "none"){
		this.show();
	}else{
		this.hide();
	}
}
/**
 * @desc : 달력 표시
 */
dgDbCalendarObject.prototype.show = function(){
	this.divObject.style.display = "";
	
	if(this.showVer == "TOP"){
		this.divObject.style.top = (event.clientY - this.divObject.clientHeight - 10) + "px";
	}else{
		this.divObject.style.top = (event.clientY + 10) + "px";
	}
	
	if(this.showHor == "RIGHT"){
		this.divObject.style.left = (event.clientX - 10) + "px";
	}else{
		this.divObject.style.left = (event.clientX - this.divObject.clientWidth + 10) + "px";
	}
}
/**
 * @desc : 달력 숨기기
 */
dgDbCalendarObject.prototype.hide = function(){
	this.divObject.style.display = "none";
}

