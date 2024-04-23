/*******************************************************************************************
 *  @desc : Combo Object
 *  @returns : {dgComboObject}
 */
function dgComboObject(){
  this.width = 200;
  return this;
}
/**
 * @desc : dhtmlXCombo 생성
 * @param : id - html tag의 id
 * @param : name - html input name
 * @param : width - dhtmlCombo 폭(width)
 */
dgComboObject.prototype.createCombo = function(id, name, width){
  if(document.getElementById(id) == null){
    alert("ID가 '" + id + "'인 Html Tag가 없습니다.");
    return null;
  }
  
  if(width == null){
    width = document.getElementById(id).style.width;
    if(width == null || width == ""){
      width = this.width;
    }
  }
  
  var combo = new dhtmlXCombo(id, name, width);
  combo.readonly(true);
  return combo;
}
/**
 * @desc : xml 데이터 로드 및 Combo Option 선택
 * @param : combo - dhtmlXCombo Object
 * @param : url - xml 데이터 url
 * @param : selVal - Combo Option 선택하기 위한 Value 값 또는 Input Tag Object
 */
dgComboObject.prototype.loadXML = function(combo, url, selVal){
  if(combo == null){
    alert("Combo가 null입니다.");
    return;
  }
  
  if(url == null || url == ""){
    alert("url이 null 또는 '' 입니다.");
    return;
  }
  
  if(typeof(selVal) == "object"){
    selVal = selVal.value;
  }
  
  combo.clearAll();
  combo.setComboText("");

  
  combo.load(url, function(){
    if(selVal != null){
      combo.selectOption(combo.getIndexByValue(selVal), true, true);
    }
  });
}

/**
 * @desc : xml 데이터 로드 및 Combo Option 선택
 * @param : combo - dhtmlXCombo Object
 * @param : url - xml 데이터 url
 * @param : selVal - Combo Option 선택하기 위한 Value 값 또는 Input Tag Object
 */
dgComboObject.prototype.loadURL = function(combo, url, selVal){
  if(combo == null){
    alert("Combo가 null입니다.");
    return;
  }
  
  if(url == null || url == ""){
    alert("url이 null 또는 '' 입니다.");
    return;
  }
  
  if(typeof(selVal) == "object"){
    selVal = selVal.value;
  }
  
  combo.clearAll();
  combo.setComboText("");

  
  combo.load(url, function(){
    if(selVal != null){
    	alert("aaa");
      combo.selectOption(combo.getIndexByValue(selVal), true, true);
    }
  });
}
/**
 * @desc : Change Event
 * @param : combo - (dhtmlXCombo) dhtmlXCombo Object
 * @param : event_function - (onChange()) 이벤트 함수
 */
dgComboObject.prototype.attachEventChange = function(combo, event_function){
  if(combo == null){
    alert("Combo가 null입니다.");
    return;
  }

  combo.attachEvent("onChange", event_function);  
}
/**
 * @desc : SelectionChange Event
 * @param : combo - (dhtmlXCombo) dhtmlXCombo Object
 * @param : event_function - (onSelectionChange()) 이벤트 함수
 */
dgComboObject.prototype.attachEventSelectionChange = function(combo, event_function){
  if(combo == null){
    alert("Combo가 null입니다.");
    return;
  }

  combo.attachEvent("onSelectionChange", event_function);  
}