
/*----------------------------------------------------------------------------
 * ������      ��û��  ������  ��������
 *----------------------------------------------------------------------------
 * 2007.09.15  KJK    KJK  New Creating
 *---------------------------------------------------------------------------*/
/*****************************************************************************
* Title                 : util.js
* @author               : jgkim@digiteki.com
* @date                 : 2004.10.15
* @Description          : Common Util
* @Copyright            : DIGITEKI. Ltd.
******************************************************************************/

var domain = location.hostname;

/**
 * ��Ʈ�� ��ü�� �޼ҵ� �߰�
 */
String.prototype.trim = function(str) {
  str = this != window ? this : str;
  return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.bytes = function(str) {
  str = this != window ? this : str;
  var len = 0;
  for(j = 0; j < str.length; j++) {
    var chr = str.charAt(j);
    len += (chr.charCodeAt() > 128) ? 2 : 1
  }
  return len;
}

function getByte(s){
    s += "";
    return s.bytes();
}

function trim( str ) {
  str = new String(str);
    return str.trim();
}

function isNull(str) {
    if( trim(str) == "" ){
        return true;
    }
  return false;
}

function ObjByteCheck(obj, len, name) {
  var b = getByte(obj.value);
    if( (obj.type == "text" || obj.type == "password") && b > len ){
        if( name ){
            alert(name+" "+len+"Byte�� �Է¹ٶ��ϴ�. ���� Byte�� "+b+"Byte �Դϴ�.\r\n���ڸ� �ٿ��ֽʽÿ�.");
        }
    obj.focus();
    return false;
    }
  return true;
}
/**
 *  ID�� Sequence ��ȣ�� ��ü ã�� 
 * @param baseID
 */
function getElementByModifiedID(baseID){
    var allWantedElements = [];
    var idMod = 0;
    while(document.getElementById(baseID + idMod)) {
        allWantedElements.push(document.getElementById(baseID + idMod++));
    }
    return allWantedElements;
}

/**
 *  �ʼ��׸� �Է�üũ
 */
function checkObj( element, msg, fixsize ) {
  var len = element.length;

  if(len == null){
    var obj = element;
    var err = false;
    var tagname = obj.tagName.toUpperCase();

    if(tagname == "SELECT"){
      if(isNull(obj.value)){
        msg += " �����ϼ���.\t";
        err = true;
      }
    }
    else if( obj.type == "radio" || obj.type == "checkbox" ){
      if(obj.checked == false){
        msg += " üũ�ϼ���.\t";
        err = true;
      }
    }
    else{
      obj.value = trim(obj.value);
      if(fixsize){
        if(obj.value.length != 1*fixsize){
          msg += " "+fixsize+"�ڸ��� �Է��ϼ���.\t";
          err = true;
        }
      }
      else if(isNull(obj.value)){
        msg += " �Է��ϼ���.\t";
        err = true;
      }
    }

    if(err){
      alert(msg);
      obj.focus();
      return true;
    }else{
      return false;
    }
  }
  else
  {
    var err = true;
    var type = null;
    var tagname = null;

    for(var i = 0; i < len; i++){
      obj = element[i];
      tagname = obj.tagName.toUpperCase();

      if( tagname == "OPTION" ){
          obj = element;
        tagname = obj.tagName.toUpperCase();
        len = 1;
      }

      if(tagname == "SELECT"){
        type = "select";
        if( !isNull(obj.value) ){
          err = false;
          break;
        }
      }
      else if( obj.type == "radio" || obj.type == "checkbox" ){
        type = "radio";
        if( obj.checked == true ){
          err = false;
          break;
        }
      }
      else{
        type = "text";
        obj.value = trim(obj.value);

        if(fixsize){
          if(obj.value.length == 1*fixsize){
            err = false;
          }
          else if(obj.value){
            err = true;
            alert(msg += " "+fixsize+"�ڸ��� �Է��ϼ���.\t");
            obj.focus();
            return true;
          }
        }
        else if(!isNull(obj.value)){
          err = false;
          break;
        }
      }
    }

    if(err == true){
      if(type == "select"){
        msg += " �����ϼ���.\t";
      }
      else if(type == "radio"){
        msg += " üũ�ϼ���.\t";
      }
      else{
        msg += " �Է��ϼ���.\t";
        obj.value = "";
      }
      alert(msg);
      obj.focus();
      return true;
    }
  }
  return false;
}

function getLength(str) {
    var temp, nbytes, klen, c;

    temp = escape(str);
    klen = temp.length;
    nbytes = 0;
    for (var i = 0; i < klen; i++) {
        c = temp.charAt(i);
        nbytes++;
        if (c == '%') {
            if (temp.charAt(i + 1) == 'u') {
                i += 5;
                nbytes++;
            }
            else
                i += 2;
        }
    }
    return nbytes;
}


/********** Enter Key �Է½� ��Ŀ���̵� **********/
function myIndex(Form, obj){
  var element_len = Form.elements.length;

  var index = null;
  var idx = obj.getAttribute("findex");
  if( idx != null && idx != "" ){
      return idx;
  }
  var tempArray = new Array();

  var cnt = 0;
  for(var i = 0; i < element_len; i++){
    thisObj = Form.elements[i];
    thisObj.findex = i;
  }
  idx = obj.getAttribute("findex");
  return idx;
}

function next(obj, nextObjName){
  var obj2 = null;
  try{
    if( !obj && !nextObjName ){
      if(event.keyCode==13) event.keyCode = 9;
      return;
    }

    var Form = null;
    if(obj.form == null){
      alert("<form> �±װ� �����ϴ�.");
      return;
    }else{
      Form = obj.form;
    }

    if( event.type == "keydown" && event.keyCode==13 ){

      if( nextObjName != null && nextObjName != "" ){
        obj2 = eval("obj.form."+nextObjName);
        if( obj2 != null ){
          obj2.focus();
          return;
        }
      }

      var nextobj = obj.getAttribute("nextobj");
      if( nextobj != null && nextobj != "" ){
        obj2 = eval("obj.form."+nextobj);
        if( obj2 != null ){
          obj2.focus();
          return;
        }
      }
      event.keyCode = 9;
      return;

    }

    if( (event.type == "keyup" || event.type == "keypress") && event.keyCode==13 ){

      if( nextObjName != null && nextObjName != "" ){
        obj2 = eval("obj.form."+nextObjName);
        if( obj2 != null ){
          obj2.focus();
          return;
        }
      }

      var nextobj = obj.getAttribute("nextobj");
      if( nextobj != null && nextobj != "" ){
        obj2 = eval("obj.form."+nextobj);
        if( obj2 != null ){
          obj2.focus();
          return;
        }
      }

      obj2 = getNextObj(obj);
      if( obj2 != null ) obj2.focus();

      return;
    }

    if( event.type == "focus" && obj.readOnly == true ){

      if( nextObjName != null && nextObjName != "" ){
        obj2 = eval("obj.form."+nextObjName);
        obj2.focus();
        return;
      }

      var nextobj = obj.getAttribute("nextobj");
      if( nextobj != null && nextobj != "" ){
        obj2 = eval("obj.form."+nextobj);
        obj2.focus();
        return;
      }

    }
  }catch(exception){
    if( obj2 != null ){
        try{
        next(obj);
      }catch(exception1){
      }
    }
  }
}

function getNextObj(obj){
  var Form = null;
  if(obj.form == null){
    alert("<form> �±װ� �����ϴ�.");
    return null;
  }else{
    Form = obj.form;
  }
  var element_len = Form.elements.length;
  var idx = myIndex(Form, obj);
  next_focus_index = idx + 1;

  if( obj.name && obj.type ){
    if( Form.elements[obj.name].length != null && (obj.type == "radio" || obj.type == "checkbox") ){
      next_focus_index = Form.elements[obj.name][0].idx + Form.elements[obj.name].length;
    }
  }

  do{
    nextObj = Form.elements[next_focus_index];
    if( nextObj == null ) return null;
    objType = nextObj.type;

    if( objType != null ){
      view = nextObj.getAttribute("display");
      if( objType == "hidden" || nextObj.disabled || nextObj.readOnly || view == "none" ){
        next_focus_index++;
      }else{
        break;
      }
    }else break;

  }while( next_focus_index < element_len );

  if(Form.elements[next_focus_index] == null){
    return null;
  }
  return Form.elements[next_focus_index];
}
/********** Enter Key �Է½� ��Ŀ���̵� **********/



/**
 *  text box �� ���� Trim
 */
function TrimObjectValue(obj) {
  if( obj ){
      obj.value = trim(obj.value);
    return obj.value;
  }
  return "";
}

function delCommaObject(obj, isMinus, isFloat) {
  var val   = new String(obj.value);
  var temp  = "";
  var num   = "";

  for(var i = 0; i < val.length; i++) {
    temp = val.charAt(i);
    if( temp >= "0" && temp <= "9" )
      num += temp;
    if( isMinus && temp == "-" )
      num += temp;
    if( isFloat && temp == "." )
      num += temp;
  }
  obj.value = num;
  return obj.value;
}

/**
 * checkbox �� radio ���ú���
 */
function CheckboxChecked(obj, chk, noDisabled) {
  if( obj ){
    var len = obj.length;
    if( len == null ){

      if(noDisabled == true){
        if((obj.disabled == false) && (obj.readOnly == false)) obj.checked = chk;
      }else{
        obj.checked = chk;
      }
    }else{
      for(var i = 0; i < len; i++) {
        if(noDisabled == true){
          if((obj[i].disabled == false) && (obj[i].readOnly == false)) obj[i].checked = chk;
        }else{
          obj[i].checked = chk;
        }
      }
    }
  }
}

function CheckBoxEPMToggle(){
    var frm = document.frm;
  var chkEpms = document.getElementsByName("chkEpm");
    for(var i=0;i<chkEpms.length;i++) {
        chkEpms[i].checked = frm.chkEpmAll.checked;
    }
}

function CheckBoxPartToggle(){
    var frm = document.frm;
  var chkEpms = document.getElementsByName("chkPart");
    for(var i=0;i<chkEpms.length;i++) {
        chkEpms[i].checked = frm.chkPartAll.checked;
    }
}

/**
 * checkbox �� radio ���ÿ���
 */
function isChecked(obj) {
    var len = obj.length;
  if( len == null ){
      return obj.checked;
  }else{
    for(var i = 0; i < len; i++) {
      if( obj[i].checked )
          return true;
    }
  }
  return false;
}

/**
 * checkbox �� radio ���ü�
 */
function CountOfChecked(obj) {
    var len = obj.length;
  var count = 0;

  if( len == null ){
      if(obj.checked) count = 1;
  }else{
    for(var i = 0; i < len; i++) {
      if( obj[i].checked )
          count++;
    }
  }
  return count;
}


// ���� ����
function isNumber(num){
  var str = /[^0-9]/;
  if (str.test(num)){
    return false;
  }
  return true;
}


function checkDate(obj) {
    var date = obj.value;
  if( date == "" ){
      return;
  }
  if( isDate(date) == false ){
      alert("�߸��� ��¥�Դϴ�.");
    obj.value = "";
    obj.focus();
  }
}

/*
 * ��ȿ�� ��¥������ üũ
 * from : yyyymmdd
 */
function isDate( dt1, dt2, dt3 ){
  var f_yy = null;
  var f_mm = null;
  var f_dd = null;

  // dt1 �� yyyymmdd �� �Է��ϰ� dt2, dt3 �� �Է����� ���� ��� - isDate( 20030105 )
  if( dt1.length == 8 && dt2 == null && dt3 == null ){
    dt1 += "";
    f_yy = dt1.substring(0,4)*1;
    f_mm = dt1.substring(4,6)*1;
    f_dd = dt1.substring(6,8)*1;
  }else if( dt1 != null && dt2 != null && dt3 != null ){ // isDate( 2003, 1, 5 ), isDate( '2003', '01', '05' )
    f_yy = dt1*1;
    f_mm = dt2*1;
    f_dd = dt3*1;
  }

  // isDate( 20030105 ), isDate( 2003, 1, 5 ), isDate( '2003', '01', '05' )
  // �� ���°� �ƴѰ��� false
  if(f_yy == null) return false;

  if( f_yy.length < 4 || f_yy < 0 ) return false;
  if( f_mm.length < 1 || f_mm < 0 || f_mm > 12 ) return false;
  if( f_dd.length < 1 || f_dd < 0 || f_dd > 31 ) return false;

  f_dt = new Date(f_yy, f_mm-1, f_dd);

  if(f_dd != f_dt.getDate()){
    return false;
  }
  return true;
}

/**
 * ������ �÷��׿� ���� ���� , �� , ���ڸ� ����
 * @param field ���� �ʵ�
 *      YEAR = 1;
 *      MONTH = 2;
 *      DATE = 3;
 * @param amount ���ϰ��� ����
 * @param date ���� ��� ��¥
 * @return ����� ��¥
 */
function getOpDate( field, amount, date ){

    var f_yy    = null;
    var f_mm    = null;
    var f_dd    = null;
    var f_dt    = null;
    var str     = "";

    // dt1 �� yyyymmdd
    if( date.length == 8 ){
        date = new String(date);
        f_yy = date.substring(0,4)*1;
        f_mm = date.substring(4,6)*1;
        f_dd = date.substring(6,8)*1;
    }else{
        return "99990101";
    }

    if( field == "1" ){
        f_dt = new Date(f_yy+amount, f_mm-1, f_dd);
    }else if( field == "2" ){
        f_dt = new Date(f_yy, f_mm-1+amount, f_dd);
    }else if( field == "3" ){
        f_dt = new Date(f_yy, f_mm-1, f_dd+amount);
    }else{
        return "99990101";
    }

    str += addStr(new String(f_dt.getYear()), 2, "0");
    str += addStr(new String(f_dt.getMonth()+1), 2, "0");
    str += addStr(new String(f_dt.getDate()), 2, "0");

    return str;
}
//���� �ʵ尡 �ùٸ��� üũ
function isMonthVaild(mm) {
    if(parseInt(mm.value) > 12) {
        alert('���� �Է��� �ùٸ��� �ʽ��ϴ�.!');
        mm.value='';
        mm.focus();
    }
}

function isDateVaild(dd) {
    if(parseInt(dd.value) > 31) {
        alert('���� �Է��� �ùٸ��� �ʽ��ϴ�.!');
        dd.value = '';
        dd.focus();
    }
}

/**
 * ��ü���̰� len �� �ǰ� source�� �տ� s�� �߰�
 */
function addStr(source, len, s) {
  if(s == null)
    s = "0";

  s += "";
  if(source == "") source = "";
  var temp = "";

  for (var i = 0; i < len - source.length; i++) {
    temp += s;
  }

  return temp + source;
}

/**
 * ��ü���̰� len �� �ǰ� source�� �ڿ� s�� �߰�
 */
function backAddStr(source, len, s) {
  if(s == null)
    s = "0";

  s += "";
  if(source == "") source = "";
  var temp = "";

  for (var i = 0; i < len - source.length; i++) {
    temp += s;
  }

  return source + temp;
}

//���ڿ����� ���ڸ� ��������
function getNumber(str) {
  var val   = new String(str);
  var temp  = "";
  var num   = "";

  for(var i = 0; i < val.length; i++) {
    temp = val.charAt(i);
    if(temp >= "0" && temp <= "9")
      num += temp;
  }
  return num;
}

  function getFloat(str) {
    var val = str+"";
    var temp = "";
    var num = "";

    for(i = 0; i < val.length; i++) {
      temp = val.charAt(i);
      if( (temp >= "0" && temp <= "9") || temp == '.' ) num += temp;
    }
  if( num != '' ) num = parseFloat(num);
    return num;
  }

  function getUnParseFloat(str) {
    var val = str+"";
    var temp = "";
    var num = "";

    for(i = 0; i < val.length; i++) {
      temp = val.charAt(i);
      if( (temp >= "0" && temp <= "9") || temp == '.' ) num += temp;
    }
    return num;
  }

  function getMNumber(str) {
    var val = str+"";
    var temp = "";
    var num = "";
    var isMinus = false;

    if( val.indexOf("-") == 0 ){
        isMinus = true;
        val = val.substring(1);
    }

    for(var i=0; i<val.length; i++) {
      temp = val.charAt(i);
      if(temp >= "0" && temp <= "9") num += temp;
    }

    if( isMinus ) num = "-"+num;
    return num;
  }

  function getMFloat(str) {
    var val = str+"";
    var temp = "";
    var num = "";
    var isMinus = false;

    if( val.indexOf("-") == 0 ){
        isMinus = true;
        val = val.substring(1);
    }

    for(i=0; i<val.length; i++) {
      temp = val.charAt(i);
      if(temp >= "0" && temp <= "9" || temp == '.') num += temp;
    }
    if(num == "") num = 0;
    if( isMinus ) num = -1*num;

    return num;
  }


// �޺��ڽ� ����
function ComboNmSort(obj){
  var cnt = obj.options.length;
  if(cnt < 2) return;

  var defaultValue = obj.value;
  var tempArray = new Array();
  var tempArray2 = new Array();
  var nullValue = null;
  var nullText = null;

  var k = 0;
  for(var i = 0; i < cnt; i++){
    if( obj.options[i].value == "" ){
      nullValue = obj.options[i].value;
      nullText = obj.options[i].text;
      continue;
    }
    tempArray[k] = obj.options[i].text+"^^-^^+=12*&^%"+k;
    tempArray2[k] = obj.options[i].value;
    k++;
  }
  tempArray.sort();

  for(var i = 0; i < tempArray.length; i++){
    var idx = i;

    if( nullValue != null ){
      idx = i+1;
      if( i == 0 ){
        obj[0] = new Option();
        obj[0].text = nullText;
        obj[0].value = nullValue;
      }
    }

    var value = tempArray[i];
    var text = value.substring(0, value.indexOf("^^-^^+=12*&^%"));
    var index = value.substring(value.indexOf("^^-^^+=12*&^%")+"^^-^^+=12*&^%".length);
    value = tempArray2[index];

    obj[idx] = new Option();
    obj[idx].text = text;
    obj[idx].value = value;
  }
  obj.value = defaultValue;
}


function comma(odata) {
  var sdata = "";
  var data = getMNumber(odata);

  var dataLen = data.length;
  var splitnum= dataLen % 3;
  var returnVal = "";

  for (var i = 0; i < dataLen; i++) {
    sdata = data.substr(i,1);
    returnVal = returnVal+sdata;
    if (((i+1)%3) == splitnum && i < (dataLen-1)) {
      returnVal = returnVal + ",";
    }
  }
  if( returnVal.indexOf("-,") == 0 ){
    returnVal = "-"+returnVal.substring(2);
  }
  return returnVal;
}

function delComma(odata) {
  return getNumber(odata);
}

/*
 * �Է°��ɱ���üũ
 */
function lenCheck(obj){    
    var str = obj.value;
    var max = obj.getAttribute("maxlength");
    var hmax = Math.floor(Number(max/2));
    var result = "";
    var len = 0;

    for(j = 0; j < str.length; j++) {
        var chr = str.charAt(j);
        len += (chr.charCodeAt() > 128) ? 2 : 1;
        if( len > max ){
            alert("�ѱ��� "+hmax+"�� ����, ����-������ "+max+"�� ������ �Է��� �����մϴ�");
        obj.value = "";
        obj.focus();
      return false;
        }else{
            result = result + chr;
        }
    }   
    return;
}

/**
 *  �ش翬���� ���ϼ�
 *  ���� : getTotalDays(yyyy, mm) �Ǵ� getTotalDays(yyyymm)
 */
function getTotalDays(yyyy, mm) {
  if( yyyy.length >= 6 ){
      mm = yyyy.substring(4,6);
      yyyy = yyyy.substring(0,4);
  }

  var yyyymm = new String(yyyy)+new String(mm);

    var totDays = 31;
    for(i = 28; i <= 31; i++) {
        if( !isDate( yyyymm+new String(i) ) ){
            totDays = i-1;
            break;
        }
    }
    return totDays;
}

/**
 *  ���ڿ� ġȯ
 *  str���� from�� to�� ġȯ
 */
function replace(str, a, b) {
    if (str == null) return null;
    var temp = "";
    var stopChk = true;
    var idx1 = 0;
    var idx2 = 0;
    var len = a.length;

    while(stopChk){
      idx1 = str.indexOf(a, idx2);
      if (idx1 != -1){
        temp += str.substring(idx2, idx1) + b;
        idx2 = idx1 + len;
      }else{
        temp += str.substring(idx2);
        stopChk = false;
      }
    }
    return temp;
}

function getCount(source, delim){
  if ( source == "" ) return 0;
  var result = 0;

    var i = 0;
    var j = 0;

    while ((j = source.indexOf(delim, i)) >= 0) {
        result++;
        i = j + delim.length;
    }
    return result;
}


/**
 * from(yyyymmdd) �� to(yyyymmdd) ������
 * ������ or �ϼ��� ���
 * flag: m-������, d-�ϼ� ���
 */
function f_cal_date(flag, from, to){
  from += "";
  to += "";
  f_yy = from.substring(0,4)*1;
  f_mm = from.substring(4,6)*1;
  f_dd = from.substring(6,8)*1;
  t_yy = to.substring(0,4)*1;
  t_mm = to.substring(4,6)*1;
  t_dd = to.substring(6,8)*1;

  f_dt = new Date(f_yy, f_mm-1, f_dd);
  t_dt = new Date(t_yy, t_mm-1, t_dd);

  if(flag == "m") // ���� ���
  {
    var months = 0;
    months = t_yy*12 + t_mm - f_yy*12 - f_mm;
    if(t_dd+1 < f_dd){
      months--;
    }
    return months;
  }
  else if(flag == "d") // �ϼ� ���
  {
    return (t_dt.getTime() - f_dt.getTime())/86400000;
  }
}

function blurParseNumber(obj) {

}

function GetOnlyNumEng(ths){
	var NumEng = /^[A-Za-z0-9]+$/;

	if(NumEng.test(ths.value) || ths.value == ""){}
	else{
		alert("���ڿ� �����ڸ� �Է��ϼ���.");
		ths.value = "";
		ths.focus();
	}
}




/**
 *  keyDown �̺�Ʈ �߻��� ����� ���ڸ� �Է°����ϰ��Ѵ�.
 *  onkeyup="onlyEng(this);"
 */
function onlyEng(objtext1) {
  var inText = objtext1.value;
  var ret;
  for (var i = 0; i < inText.length; i++) {
      ret = inText.charCodeAt(i);
  
      if ((ret > 122) || (ret < 48) || (ret > 57 && ret < 65) || (ret > 90 && ret < 97)) { // �ѱ�,Ư������ ������
        alert("�����ڿ� ���ڸ��� �Է��ϼ���\n\n�ѱ۰� Ư�����ڴ� �ȵ˴ϴ�.");
        objtext1.value = "";
        objtext1.focus();
        return false;
      }
  }
  return true;
}

/**
 *  keyDown �̺�Ʈ �߻��� ����� ����, Ư������ �Է°����ϰ��Ѵ�.
 *  onkeyup="onlyEng(this);"
 */
function onlyEngESC(objtext1) {
  var inText = objtext1.value;
  var ret;
  for (var i = 0; i < inText.length; i++) {
      ret = inText.charCodeAt(i);
  
      if ((ret > 122) || (ret < 48) || (ret > 57 && ret < 65) || (ret > 90 && ret < 97)) { // �ѱ�,Ư������ ������
        alert("�����ڿ� ���ڸ��� �Է��ϼ���\n\n�ѱ۰� Ư�����ڴ� �ȵ˴ϴ�.");
        objtext1.value = "";
        objtext1.focus();
        return false;
      }
  }
  return true;
}

function nonkr(obj) {
  onvalue = obj.value;
  if (onvalue.search(/[��-��|��-��|��-��]/) != -1) {
    alert("�ѱ��� �Է� �ȵ˴ϴ�.");
    obj.value = "";
    obj.focus();
    return false;
  }
}



/* ���ڸ� �Է°����ϰ� �ϴ� ��� : ��ȭ��ȣ, �ѽ� �� */
/* <input type="text" onKeyDown="OnlyNumber(this);" onBlur="blurParseNumber(this);" */

/**
 *  keyDown �̺�Ʈ �߻��� ���ڸ� �Է°����ϰ��Ѵ�.
 */
function OnlyNumber(obj, isNext) {
  if( event.type == "keydown" ){
    if( event.keyCode==13 && isNext != false ){
      event.keyCode = 9;
      return;
    }
    intFilter(obj, false);
  }
  else if( event.type == "blur" ){
    var s = getNumber(obj.value);
    obj.value = s;
  }
}

function get_Onlynum(decimal){
    var input = event.srcElement; // enter  ==> code(13) , // 0 ~ 9 ==> code(48 ~ 57)
    var code = event.keyCode; // -   ==> code(45)
    
    var value = input.value; // .   ==> code(46)
    if( ((value.length==0)&&(code==46)) || ((value.indexOf(".")>-1)&&(code==46)) || code==13 || ((value=="0")&&(code==48)) || code==45 ){
        event.returnValue=false; 
    }else{
//    	alert(code);
        if(decimal){    // �Ҽ��� ���
            if( (value=="0")&&((code>=45)&&(code<=57))&&(code!=46) )input.select();
 
            if( (((code<48)||(code>57))&& (code < 96)||(code > 105)) && (code!=46) && (code!=8) && (code!=190)&& (code!=37)&& (code!=39)&& (code!=9) ){
                alert("���ڸ� �Է��Ͻʽÿ�.");
                event.returnValue=false;
            }
            //alert(getCount(value,'.')+":"+code);
            if (getCount(value,'.') > 0 && (code == 190)){
                alert("��ȿ�� �������� �ƴմϴ�.");
                event.returnValue=false;            	
            }
        }else{
            if(value=="0")input.select();
            if(code==46){
                alert("������ �Է°����մϴ�.");
                event.returnValue=false;
            }else if( (code<48)||(code>57) ){
                alert("���ڸ� �Է��Ͻʽÿ�.");
                event.returnValue=false;
            }
        }
    }
}
 
 


//  onKeyUp="NextFocus(this)"
// var nextobj = obj.getAttribute("nextobj");
function NextFocus(obj) {
    var maxlength = obj.getAttribute("maxlength");
  var nextobj = obj.getAttribute("nextobj");

  if( maxlength ){
    if( obj.value.length == maxlength ){
      if( !nextobj ){
          nextobj = getNextObj(obj);
      }

      if( nextobj ){
        nextobj.focus();
      }
    }
  }
}

/** ������ �޸� �ֱ� minus ���� *************
 *  <form name=eform>
 *    <input type=text name=id
 *    onKeyDown="intFilter(this,true);"
 *    onblur="if(!intPath())return false;intComma(this,true);"
 *    onKeyUp="if(!intPath())return false;intComma(this,true);">
 *  </form>
 */
/** ������ �޸�üũ
 *  onKeyDown="return intFilter(this,true);"
 *  onKeyUp="if(!intPath())return false; intComma(this,true);"
 *  onblur="if(!intPath())return false;intComma(this,true);"
 */
function intFilter(obj, isMinus){
  if( event.keyCode == 109 ){
    event.keyCode = 189;
  }

  if( isMinus == true && event.keyCode == 189 && obj.value.indexOf("-") == -1 ){ // -
    obj.value = obj.value.replace(",","");
    if( isNumber(obj.value) ) obj.value *= 1;
    obj.value = "-"+comma(obj.value);
    event.returnValue = false;
    return false;
  }

  if(( ( (48 <= event.keyCode && event.keyCode <= 57) || (96 <= event.keyCode && event.keyCode <= 105))
    && event.shiftKey == false ) // ����
    || event.keyCode == 8  // <- del
    || event.keyCode == 9  // tab
    || event.keyCode == 13 // enter
    || event.keyCode == 16 // shift
    || event.keyCode == 17 // Ctrl
    || event.keyCode == 25 // Ctrl
    || event.keyCode == 21 // �ѿ�
    || event.keyCode == 37 // <-
    || event.keyCode == 39 // ->
    || event.keyCode == 46 // del
    || event.keyCode == 110 // del
    || event.keyCode == 91 // ����
    || event.keyCode == 92 // ����
    || event.keyCode == 144 // Num Lock
    )
  {
    return true;
  }
  else{
    event.returnValue = false;
    return false;
  }
}

/** ������ �޸�üũ
 *  onKeyDown="return intFilter(this,true);"
 *  onKeyUp="intPath(); intComma(this,true);"
 *  onblur="intPath();intComma(this,true);"
 */
function intPath() {
  if( event.keyCode == 229 // ���콺
    //|| event.keyCode == 8  // <- del
    || event.keyCode == 9  // tab
    || event.keyCode == 13 // enter
    || event.keyCode == 16 // shift
    || event.keyCode == 17 // Ctrl
    || event.keyCode == 25 // Ctrl
    || event.keyCode == 21 // �ѿ�
    || event.keyCode == 37 // <-
    || event.keyCode == 39 // ->
    //|| event.keyCode == 46 // del
    || event.keyCode == 91 // ����
    || event.keyCode == 92 // ����
    || event.keyCode == 144 // Num Lock
    || event.keyCode == 114 // F3
  )
  {
    event.returnValue = false;
    return false;
  }
  else{
    return true;
  }
}

/** ������ �޸�üũ
 *  onKeyDown="return intFilter(this,true);"
 *  onKeyUp="intPath(); intComma(this,true);"
 *  onblur="intPath();intComma(this,true);"
 */
function intComma(obj,minus,nextObj){
    val = obj.value;
  if(val.length > 0){
    var isMinus = false;
    if(val.indexOf("-") == 0){
      isMinus = true;
      val = val.substring(1);
    }

    val = getNumber(val);
    if( isNumber(val) ) val *= 1;

    if(isMinus && minus == true){
      val = "-"+val;
    }

      if( event.type == "blur" ){
        if(val == "-0") val = "0";
        if(val == "-") val = "";
      }

    obj.value = comma(val);

    if(obj.maxLength && val.length >= obj.maxLength){
      if( nextObj == null || nextObj == "" )
        nextObj = getNextObj(obj);
      nextObj.focus();
    }
    return;
  }
}



/************ �Ǽ��� �޸� �ֱ� minus ���� **************/
/** �Ǽ��� �޸� �ֱ� minus ���� *************
 *  <form name=eform>
 *    <input type=text name=id
 *    onKeyDown="floatFilter(this,true);"
 *    onblur="if(!floatPath())return false;floatComma(this, 4,true);"
 *    onKeyUp="if(!floatPath())return false;floatComma(this, 4,true);">
 *  </form>
 */
/** �Ǽ��� �޸�üũ
 *  onKeyDown="return floatFilter(this,true);"
 *  onKeyUp="if(!floatPath())return false; floatComma(this, 4,true);"
 *  onblur="if(!floatPath())return false;floatComma(this, 4,true);"
 */
  function floatFilter(obj, minus){

    if( event.keyCode == 109 ){
        event.keyCode = 189;
    }

    if( event.keyCode == 110 ){
        event.keyCode = 190;
    }

    if( minus == true && event.keyCode == 189 && obj.value.indexOf("-") == -1 ){ // -
      obj.value = obj.value.replace(",","");
      var f1 = obj.value;
      var f2 = "";
      if( obj.value.indexOf(".") != -1 ){ // �Ҽ�������
        f1 = obj.value.substring(0, obj.value.indexOf("."));
        f2 = obj.value.substring(obj.value.indexOf("."));
      }
      if( f1 && f1 != "-" && isNumber(f1) ) f1 *= 1;

      obj.value = "-"+comma(f1)+f2;
    event.returnValue = false;
      return false;

    }else if(event.keyCode == 190 && obj.value.indexOf(".") == -1 && obj.value != "" ){// .
      return true;
    }

    if(( ( (48 <= event.keyCode && event.keyCode <= 57) || (96 <= event.keyCode && event.keyCode <= 105))
        && event.shiftKey == false ) // ����
        || event.keyCode == 8 // <- del
        || event.keyCode == 9 // tab
        || event.keyCode == 13 // enter
        || event.keyCode == 16 // shift
        || event.keyCode == 17 // Ctrl
        || event.keyCode == 25 // Ctrl
        || event.keyCode == 21 // �ѿ�
        || event.keyCode == 37 // <-
        || event.keyCode == 39 // ->
        || event.keyCode == 46 // del
    || event.keyCode == 110 // del
        || event.keyCode == 91 // ����
        || event.keyCode == 92 // ����
        || event.keyCode == 144 // Num Lock
      )
    {
      return true;
    }
  else{
    event.returnValue = false;
    return false;
  }
  }

  /* onKeyUp="if(!floatPath())return false; floatComma(this,true);" */
  function floatPath() {
    if( event.keyCode == 229 // ���콺
      //|| event.keyCode == 8  // <- del
      || event.keyCode == 9  // tab
      || event.keyCode == 13 // enter
      || event.keyCode == 16 // shift
      || event.keyCode == 17 // Ctrl
      || event.keyCode == 25 // Ctrl
      || event.keyCode == 21 // �ѿ�
      || event.keyCode == 37 // <-
      || event.keyCode == 39 // ->
      //|| event.keyCode == 46 // del
      || event.keyCode == 91 // ����
      || event.keyCode == 92 // ����
      || event.keyCode == 144 // Num Lock
    )
    {
    event.returnValue = false;
    return false;
    }else return true;
  }

  /* onKeyUp="if(!floatPath())return false; floatComma(this, 4,true);" */
  function floatComma(obj, point,minus,nextObj){
    var val = new String(obj.value);

    if(val.length > 0){
      var zeroStr = "00000000000000000000000";
      if( point == null || point == "" ) point = "0";
      point = getNumber(point);
      if( point == null || point == "" ) point = "0";
      point *= 1;

      var isMinus = false;
      if(val.indexOf("-") == 0){
        isMinus = true;
        val = val.substring(1);
      }

      var f1 = val;
      var f2 = "";
      if( f1.indexOf(".") != -1 ){ // �Ҽ�������
        f1 = val.substring(0, val.indexOf("."));
        f2 = val.substring(val.indexOf("."));

        if( point > 0 ){
          if( f1.length > (obj.maxLength-point-1) ){
            f2 = "."+f1.substring(obj.maxLength-point-1)+f2.substring(1);
            f1 = f1.substring(0,obj.maxLength-point-1);
          }

          if( f2.length-1 > point ) f2 = f2.substring(0,point+1);
        }

      }else if( f1.length > (obj.maxLength-point-1) ){
        f1 = f1.substring(0,obj.maxLength-point-1);
      }

      f1 = getNumber(f1);
      if( f1 && isNumber(f1) ) f1 *= 1;
      if(isMinus && minus == true){
        f1 = "-"+f1;
      }

      if(event.type == "blur" && f2 == ".") f2 = "";
      if( event.type == "blur" ){
          f2 = getPointNum(f2);
          if(f2 == ".") f2 = "";
      }
      val = comma(f1)+f2;

      if( event.type == "blur" ){
        if(val == "-0") val = "0";
        if(val == "-") val = "";
      }

      obj.value = val;

      if(obj.maxLength && val.length >= obj.maxLength){
        if( nextObj == null || nextObj == "" ) nextObj = getNextObj(obj);
        nextObj.focus();
      }
      return;
    }
  }

  function getPointNum(val){
      if( val.length == 0 ) return "";
      var num = replace(val, "0", " ");
      num = trim(num);
      num = replace(num, " ", "0");
      return num;
  }

  function fComma(value, point, minus){
      value = ""+value;
      var zeroStr = "00000000000000000000";
      if( point == null || point == "" ) point = "0";
      point = getNumber(point);
      if( point == null || point == "" ) point = "0";
      point *= 1;

      var isMinus = false;
      if(value.indexOf("-") == 0){
        isMinus = true;
        value = value.substring(1);
      }

      var f1 = value;
      var f2 = "";
      if( f1.indexOf(".") != -1 ){ // �Ҽ�������
        f1 = value.substring(0, value.indexOf("."));
        f2 = value.substring(value.indexOf("."));

        if( point > 0 ){
          if( f2.length-1 > point ) f2 = f2.substring(0,point+1);
        }
      }

      f1 = getNumber(f1);
      if( isNumber(f1) ) f1 *= 1;
      if(isMinus && minus){
        f1 = "-"+f1;
      }

      f2 = getPointNum(f2);
      if(f2 == ".") f2 = "";
      value = comma(f1)+f2;

      return value;
  }

  function fUnParseComma(value, point, minus){
      value = ""+value;
      var zeroStr = "00000000000000000000";
      if( point == null || point == "" ) point = "0";
      point = getNumber(point);
      if( point == null || point == "" ) point = "0";
      point *= 1;

      var isMinus = false;
      if(value.indexOf("-") == 0){
        isMinus = true;
        value = value.substring(1);
      }

      var f1 = value;
      var f2 = "";
      if( f1.indexOf(".") != -1 ){ // �Ҽ�������
        f1 = value.substring(0, value.indexOf("."));
        f2 = value.substring(value.indexOf("."));

        if( point > 0 ){
          if( f2.length-1 > point ) f2 = f2.substring(0,point+1);
        }
      }

      f1 = getNumber(f1);
      if( isNumber(f1) ) f1 *= 1;
      if(isMinus && minus){
        f1 = "-"+f1;
      }

      f2 = trim(f2);
      if(f2 == ".") f2 = "";
      value = comma(f1)+f2;

      return value;
  }


/**
 * �ڹٽ�ũ��Ʈ���� ������ �߻����� �ʰ�ó��
 * @param str
 * @return
 */
function forScript(str){
  if(str == "") return "";
  str = replace(str, "\\","\\\\");
  str = replace(str, "'","\\\'");
  str = replace(str, "\"","\\\"");
  str = replace(str, "\r","\\r");
  str = replace(str, "\n","\\n");
  return str;
}

/**
 *  �����̰�
    <span id="blink_layer0"><font color='#FB8F44'>���ڰ� �����Դϴ�.</font></span>
    <script language="JavaScript">
    <!--
    blink('blink_layer0', document.all('blink_layer0').innerHTML, 350);
    //-->
    </script>
 */
function blink(objId, html1, html2, blinkTime){
  obj = document.all(objId);
  html = obj.innerHTML;
  obj.innerHTML = html1;
  if(obj.innerHTML == html){
    obj.innerHTML = html2;
  }
  else{
    obj.innerHTML = html1;
  }
  setTimeout("blink('"+objId+"','"+forScript(html1)+"','"+forScript(html2)+"', "+blinkTime+")",blinkTime);
}

/**
 *  ������ �ֹι�ȣ/����ڹ�ȣ üũ
 */
function checkAcctssn(acctssn){
  if( acctssn.length == 13 ){
    // �ֹι�ȣ
      return isJuminNum(acctssn);
  }
  else if( acctssn.length == 10 ){
    // ����ڹ�ȣ
      return chkBizNo(acctssn);
  }
  else{
    return false;
  }
}

/**
 *  �ֹε�Ϲ�ȣ üũ
 */
function JuminCheck(jumin1, jumin2){
  var chk=0;
  var jumin = jumin1.value + '-' + jumin2.value;
  if(jumin.length < 13)
  {
  }
  for (var i = 0; i <=5 ; i++) {
    chk = chk + ((i%8+2) * jumin.substring(i,i+1))
  }
  for (var i = 6; i <=11 ; i++) {
    chk = chk + ((i%8+2) * jumin.substring(i+1,i+2))
  }
  chk = 11 - (chk %11);
  chk = chk % 10;

  if ( chk != jumin.substring(13,14) ) {
    alert ('�ֹε�Ϲ�ȣ�� �ùٸ��� �ʽ��ϴ�.');
    jumin1.value='';
    jumin2.value='';
    jumin1.focus();
    return false;
  }
  return true;
}

function isJuminNum(jumin){
  var chk = 0;
  if(jumin.length < 13) return false;

  jumin = jumin.substring(0,6)+"-"+jumin.substring(6,13);

  for (var i = 0; i <=5 ; i++) {
    chk = chk + ((i%8+2) * jumin.substring(i,i+1))
  }
  for (var i = 6; i <=11 ; i++) {
    chk = chk + ((i%8+2) * jumin.substring(i+1,i+2))
  }
  chk = 11 - (chk %11);
  chk = chk % 10;

  if ( chk != jumin.substring(13,14) ) {
    return false;
  }
  return true;
}

function chkBizNo(sSerial) {
  //10�ڸ� ���ڸ� �μ��� �޴´�.
  //�� ���� �̿��� ���� ����ǥ������ �̿��Ͽ� ���ֹ�����.
  var objstring=sSerial.replace(/D/g,"");

  // 10�ڸ� �������� Ȯ��
  if (objstring.length !=10) return false;

  var biz_value=new Array(10);
  var li_temp, li_lastid;

  //��ȿ�� �˻� ��ƾ ����  ex)111-11-11111
  biz_value[0] = ( parseFloat(objstring.substring(0 ,1)) * 1 ) % 10;
  biz_value[1] = ( parseFloat(objstring.substring(1 ,2)) * 3 ) % 10;
  biz_value[2] = ( parseFloat(objstring.substring(2 ,3)) * 7 ) % 10;
  biz_value[3] = ( parseFloat(objstring.substring(3 ,4)) * 1 ) % 10;
  biz_value[4] = ( parseFloat(objstring.substring(4 ,5)) * 3 ) % 10;
  biz_value[5] = ( parseFloat(objstring.substring(5 ,6)) * 7 ) % 10;
  biz_value[6] = ( parseFloat(objstring.substring(6 ,7)) * 1 ) % 10;
  biz_value[7] = ( parseFloat(objstring.substring(7 ,8)) * 3 ) % 10;
  li_temp = parseFloat(objstring.substring(8,9)) * 5 + "0";
  biz_value[8] = parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
  biz_value[9] = parseFloat(objstring.substring(9,10));

   li_lastid = (10 - ( ( biz_value[0] + biz_value[1] + biz_value[2]
    + biz_value[3] + biz_value[4] + biz_value[5] + biz_value[6]
   + biz_value[7] + biz_value[8] ) % 10 ) ) % 10;

    return biz_value[9]==li_lastid ? true : false;
}


//�̸��� üũ
function EmailCheck(cf, isdel, isselect){
  if(cf.value.length > 0){
    emailEx1 = /[^@]+@[A-Za-z0-9_\-]+\.[A-Za-z]+/;
    emailEx2 = /[^@]+@[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z]+/;
    emailEx3 = /[^@]+@[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z]+/;
    emailEx4 = /[^@]+@[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z]+/;
    var tmp = true;
    if(cf.value.charAt(cf.value.length*1-1) == "."){
      tmp = false;
    }
    var isOk = false;
    if(emailEx1.test(cf.value) && tmp) isOk = true;
    if(emailEx2.test(cf.value) && tmp) isOk = true;
    if(emailEx3.test(cf.value) && tmp) isOk = true;
    if(emailEx4.test(cf.value) && tmp) isOk = true;

    if( isOk == true ){
        var email = cf.value;
      tmp = email.substr(email.indexOf("@")+1);
      if( tmp.indexOf("@") != -1 ){
          isOk = false;
      }
    }

    if( isOk == true ) return true;

    alert('�����ּҰ� ���Ŀ� ���� �ʽ��ϴ�.\t\n');

    if( isdel != false ){
        cf.value = "";
    }

    if( isselect == true ){
        cf.select();
    }else{
      cf.focus();
    }
    return false;
  }
}


//idüũ
function Id_Check(element, s, e) {
  var id = element.value;
  if(id == "")
  {
    alert('���̵� �Է��ϼ���! \t\n');
    element.focus();
    return false;
  }

  /*
  var str = /[^a-z]/;
  if(str.test(id.substring(0,1)))
  {
    alert("���̵�� ���� �ҹ��ڷ� ���� �ؾ� �մϴ�.! \t\n");
    element.select();
    return false;
  }
  */

  str = /[^0-9a-zA-Z]/;
  if (id.length < s || id.length > e || str.test(id)){
    alert("���̵�� �ּ� "+s+", �ִ� "+e+"���� ������, ���ڸ� �����մϴ�.\t\n");
    element.select();
    return false;
  }



  return true;
}


//��й�ȣ üũ
function PasswdCheck(element, s, e){
  var pw = element.value;
  var str = /[^a-z0-9A-Z]/;
  if (pw.length < s || pw.length > e || str.test(pw)){
    alert('��й�ȣ�� �ּ� '+s+', �ִ� '+e+'���� �����ڳ� ���ڰ� ���յ� ���ڿ��̾�� �մϴ�!! \t\n');
    element.value='';
    element.focus();
    return false;
  }
  return true;
}


/**
 *
 */
function SearchDate(dt, left, top){
  var url = "/CompPop05.do";

  if( dt ){
      url += "?date="+dt;
  }

  var dialogLeft = 0;
  var dialogTop = 0;

  try{
    dialogLeft = window.event.x-100;
    dialogTop = window.event.y+188;
  }catch(exception){
    dialogLeft = 200;
    dialogTop = 200;
  }

  if( left ) dialogLeft = left;
  if( top ) dialogTop = top;

    var option = "dialogWidth:260px;"
                  + "dialogHeight:250px;"
                  + "status:no;"
                  + "help:no;"
                  + "resizable:no;"
                  + "scroll:no;";
    option += "dialogLeft:"+dialogLeft+";";
    option += "dialogTop:"+dialogTop+";";

    var re_data = window.showModalDialog(url, null, option);

  if( re_data != null && re_data.length == 8 ){
      return re_data;
  }else{
    return "";
  }
}

//�Ҽ��� �ݿø�(2005.01.04 ksj �߰�)
function numround(num,pos){
   var posV = Math.pow(10,(pos?pos:2))
   return Math.round(num*posV)/posV
}


// �Ҽ��� 4�ڸ��� ���ϱ�
function CalcMulti(n1, n2) {
    if( n1 == "" ) n1 = 0;
    if( n2 == "" ) n2 = 0;

  n1 = new Number(n1);
  n2 = new Number(n2);

  n1 = Math.round(n1*100000)/10;
  n2 = Math.round(n2*100000)/10;
  var str = new String((n1*n2)/100000000);

  if( str.indexOf(".") != -1 ){
    var tmp = str.substring(str.indexOf(".")+1);
    if(tmp.length > 4){
      tmp = new Number(tmp.substring(0,4));
      str = str.substring(0,str.indexOf(".")+1) + new String(tmp);
    }
    else{
      tmp = new Number(tmp);
      str = str.substring(0,str.indexOf(".")+1) + new String(tmp);
    }
  }

  return Number(str);
}


// �����ڽ��� üũ�� �׸��� ��
function getRadioValue(obj) {
    if( obj.length == null ){
        if( obj.checked ) return obj.value;
    }
  else{
    var len = obj.length;
    for(var i = 0; i <  len; i++) {
      if( obj[i].checked ) return obj[i].value;
    }
  }
  return null;
}



/**
 * �ݾ��� �ѱ۷� ��ȯ����
 * @param i
 * @return
 */
function getStep( i ){
  var str = "";

  if( i == 0 ) str = "õ";
  else if( i == 1 ) str = "��";
  else if( i == 2 ) str = "��";
  else if( i == 3 ) str = "";
  return str;
}

/**
 * �ݾ��� �ѱ۷� ��ȯ����
 * @param i
 * @return
 */
function getLevel( i ){
  var str = null;

  if( i == 3 ) str = "";
  else if( i == 2 ) str = "��";
  else if( i == 1 ) str = "��";
  else if( i == 0 ) str = "��";
  else str = "err";
  return str;
}

/**
 * ���ڸ� �ѱ�ǥ������ ����
 * 123,1234,1234,1234
 * @param s    ��Ʈ��
 * @return �ѱ�ǥ��
 */
function numToKr( str ){
    str = replace(new String(str),"-","");
  var amt = addStr( replace(new String(str),",","") , 15, " " );
  var bufHangul = "";
  var s = null;
  var ss = "";
  var n = 0;

  for(var i = 1; i <= 15; i++){
    s = amt.substring(i-1, i);

    if( s == " " ) continue;
    n = i%4;
    if(n == 0) ss = "";


    if( s != "0" ){
      s = getHangul(s);
      ss += s;
      s = getStep(n);
      ss += s;
    }

    if( n == 3 && "" != ss ){
      ss += getLevel( Math.floor(new Number(i/4)) );
      bufHangul += ss;
    }
  }
  return bufHangul;
}

/**
 * ���ڸ� �ѱ�ǥ������ ����
 *
 * @param s    ��Ʈ��
 * @return �ѱ�ǥ��
 */
function getHangul( s ){
   if ( s == null ) return "";
  var str = null;
  if( s == "1" ) str = "��";
  else if( s == "2" ) str = "��";
  else if( s == "3" ) str = "��";
  else if( s == "4" ) str = "��";
  else if( s == "5" ) str = "��";
  else if( s == "6" ) str = "��";
  else if( s == "7" ) str = "ĥ";
  else if( s == "8" ) str = "��";
  else if( s == "9" ) str = "��";
  else str = "";
  return str;
}



// ����, ����, �ݿø�
function NumberMath(i_num, pos, mode) {
    if( i_num == "" ) return "";
  var chk = false;

  var w_unit = 1;
  var c_unit = 1;
  var o_num = i_num;

  // �������� 16.34
  if( pos == "10000" ){ // ������
    w_unit  = 0.00001;
    c_unit = 100000;
  }
  else if( pos == "1000" ){ // õ����
    w_unit  = 0.0001;
    c_unit = 10000;
  }
  else if( pos == "100" ){  // �����
    w_unit  = 0.001;
    c_unit = 1000;
  }
  else if( pos == "10" ){ // �ʴ���
    w_unit  = 0.01;
    c_unit = 100;
  }
  else if( pos == "1" ){  // ������
    w_unit  = 0.1;
    c_unit = 10;
  }
  else if( pos == ".1" ){ // �Ҽ�1
    w_unit  = 1;
    c_unit  = 1;
  }
  else if( pos == ".2" ){ // �Ҽ�2
    w_unit  = 10;
    c_unit  = 0.1;
  }
  else if( pos == ".3" ){ // �Ҽ�3
    w_unit  = 100;
    c_unit  = 0.01;
  }
  else if( pos == ".4" ){ // �Ҽ�4
    w_unit  = 1000;
    c_unit  = 0.001;
  }
  else if( pos == ".5" ){ // �Ҽ�5
    w_unit  = 10000;
    c_unit  = 0.0001;
  }
  else{
    w_unit  = 1;
    c_unit  = 1;
  }

  if( mode == "����" ){
    o_num = Math.ceil(i_num*w_unit);
  }
  else if( mode == "����" ){
    o_num = Math.floor(i_num*w_unit);
  }
  else if( mode == "�ݿø�" ){
      o_num = Math.round(i_num*w_unit);
  }

  if( w_unit > 0 ){
      o_num = o_num/w_unit;
  }else{
      o_num = o_num*c_unit;
  }

  return o_num;
}


/**
 *  ����ڹ�ȣ�� 000-00-00000 ���·� return
 * @param compnum
 * @return 000-00-00000
 */
function getFormatCompnum(compnum) {
  if( compnum.length < 10 ) return "";

  if ( compnum.length == 13 )
  {
    return compnum.substring(0, 6)
      + "-"
      + compnum.substring(6, 13);
  }
  else if( compnum.length == 10 )
  {
    return compnum.substring(0, 3)
      + "-"
      + compnum.substring(3, 5)
      + "-"
      + compnum.substring(5, 10);
  }
  else{
    return compnum;
  }
}

function setSortingImg(idx, isDesc){
  var img = "";
  if(isDesc == "TRUE"){
    img = "<img src='/Windchill/extcore/images/icon_descending.gif' />&nbsp;";
  } else {
    img = "<img src='/Windchill/extcore/images/icon_ascending.gif' />&nbsp;";
  }
  var sortingImg = document.getElementsByName("sortingImg");
  for(var i = 0; i < sortingImg.length; i++){
    sortingImg[i].innerHTML = "";
  }
  sortingImg[idx].innerHTML = img;

}

/**
 * String encode
 * @param string
 */
function encodeUriParam(param){
	if(param == null || param == "") return param;

	return escape(encodeURIComponent(param));
}
/**
 * dhtmlx grid ����
 * @param grid
 */
function adjustColumn(grid){
	
	if(grid.getRowsNum() > 0){
		for(var i = 0 ; i < grid.getColumnCount() ; i++){
			grid.adjustColumnSize(i);
		}
	}
}
/**
 * defultDateSet
 */
function setDefaultDate(){
    var f = document.frm;
    
    var toDate = new Date();
    var toMonth = "0" + (toDate.getMonth()+1);
    toMonth = toMonth.substr(toMonth.length - 2);
    var toDay = "0" + toDate.getDate();
    toDay = toDay.substr(toDay.length - 2);
    var toYear = toDate.getFullYear();
    var outToDate = toYear + "-" + toMonth + "-" + toDay;
    /* toDate.setDate(toDate.getDate()-7); */
    var beforeYear;
    var beforeMonth = "0" + (toDate.getMonth());    
    if(toMonth!=1){
    	beforeYear = toDate.getFullYear();   	
    	beforeMonth = beforeMonth.substr(beforeMonth.length - 2);
    }else{
    	beforeYear = toDate.getFullYear()-1;
    	beforeMonth = 12;
    }
    var beforeDay = "0" + toDate.getDate();
    beforeDay = beforeDay.substr(beforeDay.length - 2);
    
    //���� ���
    var dt = new Date(beforeYear, beforeMonth, 0);
    if(beforeDay> dt.getDate()){
    	beforeDay = dt.getDate();
    }
    
    var beforeDate = beforeYear + "-" + beforeMonth + "-" + beforeDay;

    f.modifyStartDate.value = beforeDate;
    f.modifyEndDate.value = outToDate;
}

function link_sort(a,b,order){
	
	if(a.trim().indexOf("</font></a></div>") > -1){
		var n = a.trim().replace(/ /g, '');
		n = n.trim().substring(0, n.trim().indexOf("</font></a></div>"));
		n = n.trim().substring(n.trim().lastIndexOf(">")+1);
		
		var m=b.trim().replace(/ /g, '');
		m = m.substring(0, m.trim().indexOf("</font></a></div>"));
		m = m.trim().substring(m.trim().lastIndexOf(">")+1);		
	}
	else if(a.trim().indexOf("</font></a>") > -1){
		var n = a.trim().replace(/ /g, '');
		n = n.trim().substring(0, n.trim().indexOf("</font></a>"));
		n = n.trim().substring(n.trim().lastIndexOf(">")+1);
		
		var m=b.trim().replace(/ /g, '');
		m = m.substring(0, m.trim().indexOf("</font></a>"));
		m = m.trim().substring(m.trim().lastIndexOf(">")+1);		
	}
	else {
		var n = a.trim().replace(/ /g, '');
		n = n.trim().substring(0, n.trim().indexOf("</a>"));
		n = n.trim().substring(n.trim().lastIndexOf(">")+1);
		
		var m=b.trim().replace(/ /g, '');
		m = m.substring(0, m.trim().indexOf("</a>"));
		m = m.trim().substring(m.trim().lastIndexOf(">")+1);		
	}

	if(order=="asc")
        return n>m?1:-1;
    else
        return n<m?1:-1;
}

function ulink_sort(a,b,order){
	 var n = a.replace(/ /g, '');
	    n = n.substring(0, n.indexOf("</u></a>"));
	    n = n.substring(n.lastIndexOf(">")+1);

	    var m=b.replace(/ /g, '');
	    m = m.substring(0, m.indexOf("</u></a>"));
	    m = m.substring(m.lastIndexOf(">")+1);
	    
	    if(order=="asc")
	        return n>m?1:-1;
	    else
	        return n<m?1:-1;
}
