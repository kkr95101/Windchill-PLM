//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/

function dhtmlxDblCalendarObject(contId, isAutoDraw, options){this.scriptName = 'dhtmlxcalendar.js';this.entObj = document.createElement("DIV");this.winHeader = null
 this.style = "dhtmlxdblcalendar";this.uid = 'sc&dblCal'+Math.round(1000000*Math.random());this.numLoaded = 2;this.options = {isWinHeader: false,
 headerText: 'dhtmlxDblCalendarObject',
 headerButtons: '', 
 
 
 
 isWinDrag: false,
 msgClose: "Close",
 msgMinimize: "Minimize",
 msgToday: "Today",
 msgClear: "Clear"
 };if (options)for (x in options)this.options[x] = options[x];this.entBox = document.createElement("TABLE");this.entBox.cellPadding = "0px";this.entBox.cellSpacing = "0px";this.entBox.className = this.style;this.entObj.appendChild(this.entBox);var entRow = this.entBox.insertRow(0);var calLeft = entRow.insertCell(0);calLeft.style.paddingRight = '2px';var calRight = entRow.insertCell(1);this.leftCalendar = new dhtmlxCalendarObject(calLeft, false, this.options);this.leftCalendar._dblC = this;this.leftCalendar.setOnClickHandler(this.doOnCLeftClick);this.rightCalendar = new dhtmlxCalendarObject(calRight, false, this.options);this.rightCalendar._dblC = this;this.rightCalendar.setOnClickHandler(this.doOnCRightClick);this.doOnClick = null;this.onLanguageLoaded = null;this.getPosition = this.leftCalendar.getPosition;this.startDrag = this.leftCalendar.startDrag;this.stopDrag = this.leftCalendar.stopDrag;this.onDrag = this.leftCalendar.onDrag;this.drawHeader = this.leftCalendar.drawHeader;dhtmlxEventable(this);var self = this;if (typeof(contId)!= 'string') this.con = contId;else this.con = document.getElementById(contId);if (isAutoDraw)this.draw ();};dhtmlXDblCalendarObject = dhtmlxDblCalendarObject;dhtmlxDblCalendarObject.prototype.setHeader = function(isVisible, isDrag, btnsOpt){this.leftCalendar.options.isWinHeader = this.options.isWinHeader = isVisible;this.leftCalendar.options.isWinDrag = this.options.isWinDrag = isDrag;if (btnsOpt)this.options.headerButtons = this.leftCalendar.options.headerButtons = btnsOpt;if (this.isAutoDraw)this.drawHeader();};dhtmlxDblCalendarObject.prototype.setYearsRange = function(minYear, maxYear){var cs = [this.leftCalendar, this.rightCalendar];for (var ind=0;ind < cs.length;ind++){cs[ind].options.yearsRange = [parseInt(minYear), parseInt(maxYear)];cs[ind].allYears = [];for (var i=minYear;i <= maxYear;i++)cs[ind].allYears.push(i);}};dhtmlxDblCalendarObject.prototype.show = function(){this.parent.style.display = 'block';};dhtmlxDblCalendarObject.prototype.hide = function(){this.parent.style.display = 'none';};dhtmlxDblCalendarObject.prototype.createStructure = function(){if (this.options.isWinHeader){var headerRow = this.entBox.insertRow(0).insertCell(0);headerRow.colSpan = 2;headerRow.align = 'right';this.winHeader = document.createElement('DIV');headerRow.appendChild(this.winHeader);};this.setParent(this.con);};dhtmlxDblCalendarObject.prototype.draw = function(){if (!this.parent)this.createStructure();this.drawHeader();this.leftCalendar.draw();this.rightCalendar.draw();this.isAutoDraw = true;};dhtmlxDblCalendarObject.prototype.loadUserLanguage = function(lang, userCBfunction){this.numLoaded = 0;if (userCBfunction)this.onLanguageLoaded = userCBfunction;this.leftCalendar.loadUserLanguage(lang, this.languageLoaded);this.rightCalendar.loadUserLanguage(lang, this.languageLoaded);};dhtmlxDblCalendarObject.prototype.languageLoaded = function(status){var self = this._dblC;self.numLoaded ++;if (self.numLoaded == 2){for (param in this.options)self.options[param] = this.options[param];if (this.isAutoDraw)self.drawHeader();if (self.onLanguageLoaded)self.onLanguageLoaded(status);}};dhtmlxDblCalendarObject.prototype.setParent = function(newParent){if (newParent){this.parent = newParent;this.parent.style.display = 'block';this.parent.appendChild(this.entObj);}};dhtmlxDblCalendarObject.prototype.setOnClickHandler = function(func){this.doOnClick = func;};dhtmlxDblCalendarObject.prototype.doOnCLeftClick = function(date){date = new Date (date);this._dblC.rightCalendar.setSensitive(date, null);if (this._dblC.doOnClick)this._dblC.doOnClick(date, this, "left");return true;};dhtmlxDblCalendarObject.prototype.doOnCRightClick = function(date){date = new Date (date);this._dblC.leftCalendar.setSensitive(null, date);if (this._dblC.doOnClick)this._dblC.doOnClick(date, this, "right");return true;};dhtmlxDblCalendarObject.prototype.setSensitive = function(){this.rightCalendar.setSensitive(null, this.leftCalendar.date[0]);this.leftCalendar.setSensitive(this.rightCalendar.date[0], null);};dhtmlxDblCalendarObject.prototype.minimize = function(){if (!this.winHeader)return;var tr = this.winHeader.parentNode.parentNode.nextSibling;tr.parentNode.parentNode.style.width = parseInt(tr.parentNode.parentNode.offsetWidth) + 'px';if (tr)tr.style.display = (tr.style.display == 'none')? 'block': 'none';};dhtmlxDblCalendarObject.prototype.setDate = function(dateFrom,dateTo){this.leftCalendar.setDate(dateFrom);this.rightCalendar.setDate(dateTo);this.leftCalendar.setSensitive(null, this.rightCalendar.date[0]);this.rightCalendar.setSensitive(this.leftCalendar.date[0], null);};dhtmlxDblCalendarObject.prototype.setDateFormat = function(format){this.leftCalendar.setDateFormat(format);this.rightCalendar.setDateFormat(format);};dhtmlxDblCalendarObject.prototype.isVisible = function(){return (this.parent.style.display == 'block'?true:false);};dhtmlxDblCalendarObject.prototype.setHolidays = function(dates){this.leftCalendar.setHolidays(dates);this.rightCalendar.setHolidays(dates);};function dhtmlxCalendarObject (base, isAutoDraw, options){if (typeof(base)== "object" && base.parent)
 {options = {};for (i in base)options [i] = base [i];};this.isAutoDraw = base.autoDraw === false ? false : (isAutoDraw === false ? false : true)
 this.contId = base.parent || base;this.scriptName = 'dhtmlxcalendar.js';this.date = [this.cutTime(new Date())];this.selDate = [this.cutTime(new Date())];this.curDate = this.cutTime(new Date());this.entObj = document.createElement("DIV");this.monthPan = document.createElement("TABLE");this.dlabelPan = document.createElement("TABLE");this.daysPan = document.createElement("TABLE");this.parent = null;this.style = "dhtmlxcalendar";this.skinName = dhtmlx.skin || "";this.doOnClick = null;this.sensitiveFrom = null;this.sensitiveTo = null;this.insensitiveDates = null;this.activeCell = null;this.hotCell = null;this.winHeader = null
 this.onLanguageLoaded = null;this.dragging = false;this.minimized = false;this.uid = 'sc&Cal'+Math.round(1000000*Math.random());this.holidays = null;this.time = false;this.daysCells = {};this.weekCells = {};this.con = [];this.conInd = [];this.activeCon = null;this.activeConInd = 0;this.userPosition = false;this.useIframe = true;this._c = this;dhtmlxEventable(this);this.options = {btnPrev: "&laquo;",
 btnBgPrev: null,
 btnNext: "&raquo;",
 btnBgNext: null,
 yearsRange: [1900, 2100],
 
 isMonthEditable: false,
 isYearEditable: false,
 
 isWinHeader: false,
 headerText : 'Calendar header',
 headerButtons: 'TMX', 
 
 
 isWinDrag: true
 };defLeng = {langname: 'en-us',
 dateformat: '%Y-%m-%d',
 monthesFNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
 monthesSNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
 daysFNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
 daysSNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
 weekend: [0, 6],
 weekstart: 0,
 msgClose: "Close",
 msgMinimize: "Minimize",
 msgToday: "Today",
 msgClear: "Clear"
 };if (!window.dhtmlxCalendarLangModules)window.dhtmlxCalendarLangModules = {};window.dhtmlxCalendarLangModules['en-us'] = defLeng;if (window.dhtmlxCalendarObjects)window.dhtmlxCalendarObjects.push(this);else window.dhtmlxCalendarObjects = [this];dhtmlxEvent(document.body,"click",function(ev){for (var i=0;i < window.dhtmlxCalendarObjects.length;i++){var wCal = window.dhtmlxCalendarObjects [i];if (wCal.con[0].nodeName == 'INPUT')wCal.hide ()
 }});for (lg in defLeng)this.options[lg] = defLeng[lg];if (options)for (param in options)this.options[param] = options[param];this.loadUserLanguage();if (options)for (param in options)this.options[param] = options[param];this.allYears = Array();with (this.options)
 for (var i=yearsRange[0];i <= yearsRange[1];i++)this.allYears.push(i);if(this.isAutoDraw !== false)this.draw(options);return this;};dhtmlXCalendarObject = dhtmlxCalendarObject;dhtmlxCalendarObject.prototype={createStructure:function(){var self = this;if (!this.entObj.className)this.setSkin (this.skinName);this.entObj.style.position = "relative";if (this.options.isWinHeader){this.winHeader = document.createElement('DIV');this.entObj.appendChild(this.winHeader);};this.entBox = document.createElement("TABLE");this.entBox.className = "entbox";with (this.entBox) {cellPadding = "0px";cellSpacing = "0px";width = '100%';};this.entObj.appendChild(this.entBox);var monthBox = this.entBox.insertRow(0).insertCell(0);with (this.monthPan) {cellPadding = "0px";cellSpacing = "0px";width = '100%';align = 'center';};this.monthPan.className = "dxcalmonth";monthBox.appendChild(this.monthPan);var dlabelBox = this.entBox.insertRow(1).insertCell(0);dlabelBox.appendChild(this.dlabelPan);with (this.dlabelPan) {cellPadding = "0px";cellSpacing = "0px";width = '100%';align = 'center';};this.dlabelPan.className = "dxcaldlabel";var daysBox = this.entBox.insertRow(2).insertCell(0);daysBox.appendChild(this.daysPan);with (this.daysPan) {cellPadding = "1px";cellSpacing = "0px";width = '100%';align = 'center';};if(_isIE || _isKHTML)this.daysPan.className = "dxcaldays_ie";else
 this.daysPan.className = "dxcaldays";this.daysPan.onmousemove = function (e) {self.doHotKeys(e);};this.daysPan.onmouseout = function () {self.endHotKeys();};if (typeof(this.contId)!= 'string') {if (!this.contId.nodeName){for (var i=0;i < this.contId.length;i++){this.con[i] = document.getElementById(this.contId[i]);this.selDate[i] = this.cutTime(new Date());this.conInd[this.contId[i]] = i;}}else {this.con [0] = this.contId;this.conInd [this.contId.id] = 0;}}else 
 {this.con [0] = document.getElementById(this.contId);this.conInd [this.contId] = 0;};this.activeCon = this.con[0];if (this.con[0].nodeName == 'INPUT'){var div = document.createElement('DIV');with (div.style) {position = 'absolute';display = 'none';zIndex = 101;};this.setParent(div);document.body.appendChild(div);conOnclick = function (e) {if (self.isVisible())
 self.hide()
 else {self.activeCon = this;if (this.value){self.setFormatedDate(null, this.value);}else if (self.time){self.tp.reset();};self.show(this.id);self.draw();};if (this.id != self.activeCon.id){self.show(this.id);self.draw();};(e||event).cancelBubble=true;};this.doOnClick = function (date) {self.hide();self.activeCon.focus();return true;};conOnkeydown = function(e){if((e||window.event).keyCode==27)
 self.hide();else if((e||window.event).keyCode==13)
 self.show();};for (i in this.con){this.con[i].onclick = conOnclick;this.con[i].onkeydown = conOnkeydown;}}else this.setParent(this.con [0]);if(_isIE && this.useIframe){if(this.parent.style.zIndex==0){this.parent.style.zIndex = 100;};if(this.ifr == undefined && this._dblC == undefined){this.ifr = document.createElement("IFRAME");this.ifr.src="javascript:'';"
 this.ifr.style.position = "absolute";this.ifr.style.zIndex = 1;this.ifr.frameBorder = "no";this.ifr.style.top = getAbsoluteTop(this.entObj) + 'px';this.ifr.scrolling = 'no';this.ifr.style.display = this.parent.style.display;this.ifr.className = this.style + (this.skinName?'_':"") + this.skinName + "_ifr";this.parent.appendChild(this.ifr);}};this.entObj.onclick = function (e) {e = e||event;if (e.stopPropagation)e.stopPropagation();else e.cancelBubble = true;};if (!this.entObj.className)this.setSkin (this.skinName);},

 
 drawHeader:function(){if (this._dblC 
 || !this.options.isWinHeader 
 || !this.winHeader)return 
 var self = this;while (this.winHeader.hasChildNodes())
 this.winHeader.removeChild(this.winHeader.firstChild);this.winHeader.className = 'winHeader';this.winHeader.onselectstart=function(){return false};this.headerLabel = document.createElement('div');this.headerLabel.className = 'winTitle';this.headerLabel.appendChild(document.createTextNode(this.options.headerText));this.headerLabel.setAttribute('title', this.options.headerText);this.winHeader.appendChild(this.headerLabel);if (this.options.isWinDrag){this.winHeader.onmousedown = function(e) {self.startDrag(e);}};if (this.options.headerButtons.indexOf('X')>=0) {var btnClose = document.createElement('DIV');btnClose.className = 'btn_close';btnClose.setAttribute('title', this.options.msgClose);btnClose.onmousedown =function (e) {(e||event).cancelBubble=true;};btnClose.onclick = function (e) {(e||event).cancelBubble=true;self.hide();};this.winHeader.appendChild(btnClose);};if (this.options.headerButtons.indexOf('M')>=0) {var btnMin = document.createElement('DIV');btnMin.className = 'btn_mini';btnMin.setAttribute('title', this.options.msgMinimize);btnMin.onmousedown =function (e) {(e||event).cancelBubble=true;};btnMin.onclick = function(e) {this.className = this.className == 'btn_mini' ? 'btn_maxi' : 'btn_mini';(e||event).cancelBubble=true;self.minimize();};this.winHeader.appendChild(btnMin);};if (this.options.headerButtons.indexOf('C')>=0) {var btnClear = document.createElement('DIV');btnClear.className = 'btn_clear';btnClear.setAttribute('title', this.options.msgClear);btnClear.onmousedown =function (e) {(e||event).cancelBubble=true;};btnClear.onclick = function(e) {(e||event).cancelBubble=true;self.activeCon.value = "";self.hide();};this.winHeader.appendChild(btnClear);};if (this.options.headerButtons.indexOf('T')>=0) {var btnToday = document.createElement('DIV');btnToday.className = 'btn_today';btnToday.setAttribute('title', this.options.msgToday);btnToday.onmousedown =function (e) {(e||event).cancelBubble=true;};btnToday.onclick = function(e) {(e||event).cancelBubble=true;self.setDate(new Date());};this.winHeader.appendChild(btnToday);}},
 
 
 drawMonth:function(){var self = this;if (this.monthPan.hasChildNodes()) 
 this.monthPan.removeChild(this.monthPan.firstChild);var row = this.monthPan.insertRow(0);var cArLeft = row.insertCell(0);var cContent = row.insertCell(1);var cArRight = row.insertCell(2);cArLeft.align = "left";cArLeft.className = 'month_btn_left';var btnLabel = document.createElement("div");btnLabel.innerHTML = " ";cArLeft.appendChild(btnLabel);cArLeft.onclick = function(){self.prevMonth() };cArLeft.onselectstart = function () {return false};cArRight.align = "right";cArRight.className = 'month_btn_right';var btnLabel = document.createElement("div");btnLabel.innerHTML = " ";cArRight.appendChild(btnLabel);cArRight.onclick = function(){self.nextMonth() };cArRight.onselectstart = function () {return false};cContent.align = 'center';var mHeader = document.createElement("TABLE");with (mHeader) {cellPadding = "0px";cellSpacing = "0px";align = "center";};var mRow = mHeader.insertRow(0);var cMonth = mRow.insertCell(0);var cComma = mRow.insertCell(1);var cYear = mRow.insertCell(2);cContent.appendChild(mHeader);var date = this.date[0];this.planeMonth = document.createElement('DIV');this.planeMonth._c = this;this.planeMonth.appendChild(document.createTextNode(this.options.monthesFNames[date.getMonth()]));this.planeMonth.className = 'planeMonth';cMonth.appendChild(this.planeMonth);if (this.options.isMonthEditable){this.planeMonth.style.cursor = 'pointer';this.editorMonth = new dhtmlxRichSelector({nodeBefore: this.planeMonth,
 valueList: [0,1,2,3,4,5,6,7,8,9,10,11],
 titleList: this.options.monthesFNames,
 activeValue: this.options.monthesFNames[date.getMonth()],
 onSelect: this.onMonthSelect,
 isAllowUserValue: false
 });this.editorMonth._c = this;};cComma.appendChild(document.createTextNode(","));cComma.className = 'comma';this.planeYear = document.createElement('DIV');this.planeYear._c = this;this.planeYear.appendChild(document.createTextNode(date.getFullYear()));this.planeYear.className = 'planeYear';cYear.appendChild(this.planeYear);if (this.options.isYearEditable){this.planeYear.style.cursor = 'pointer';this.editorYear = new dhtmlxRichSelector({nodeBefore: this.planeYear,
 valueList: this.allYears,
 titleList: this.allYears,
 activeValue: date.getFullYear(),
 onSelect: this.onYearSelect,
 isOrderedList: true,
 isNumbersList: true,
 isAllowUserValue: true
 });this.editorYear._c = this;}},

 
 drawDayLabels:function() {var self = this;if(!this.dlabelPan.hasChildNodes()) 
 {var row = this.dlabelPan.insertRow(-1);row.className = "daynames";for(var i=0;i<7;i++){(this.weekCells [i] = row.insertCell(i)).appendChild(document.createTextNode(this.getDayName(i)))
 }}else 
 {for(var i=0;i<7;i++)this.weekCells[i].childNodes [0].nodeValue = this.getDayName(i);}},

 
 drawDays:function() {var self = this;var row = {}, cell;if(!this.daysPan.hasChildNodes()) 
 {for (var weekNumber=0;weekNumber<6;weekNumber++){row = this.daysPan.insertRow(-1);this.daysCells [weekNumber] = {};for (var i=0;i<7;i++){(this.daysCells [weekNumber] [i] = row.insertCell(-1)).appendChild(document.createTextNode(""));}}};var date = this.date[0], tempDate = new Date(date);var selectedDate = this.selDate[this.activeConInd].toDateString();tempDate.setDate(1);var day1 = (tempDate.getDay() - this.options.weekstart) % 7;if (day1 <= 0)day1 += 7;tempDate.setDate(- day1);tempDate.setDate(tempDate.getDate() + 1);if (tempDate.getDate()< tempDate.getDay()) 
 tempDate.setMonth(tempDate.getMonth() - 1);var curDay = null;for (var weekNumber=0;weekNumber<6;weekNumber++){for (var i=0;i<7;i++){if (curDay == tempDate.getDate())
 tempDate.setDate(tempDate.getDate() + 1);curDay = tempDate.getDate();cell = this.daysCells [weekNumber] [i];cell.setAttribute('id', this.uid+tempDate.getFullYear()+tempDate.getMonth()+tempDate.getDate());cell.childNodes [0].nodeValue = tempDate.getDate();cell.thisdate = tempDate.toString();cell.className = "thismonth";cell.onclick = null;if(tempDate.getMonth()!=date.getMonth())
 cell.className = "othermonth";if (this.insensitiveDates){var c = false;for (var j=0;j<this.insensitiveDates.length;j++){var s = /\.|\-/.exec(this.insensitiveDates[j])
 if (s)var f = (this.insensitiveDates[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (s && this.getFormatedDate(f, tempDate)== this.insensitiveDates[j] || tempDate.getDay () == this.insensitiveDates[j]) {this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);c = true;break;}};if (c)continue;};if (this.sensitiveFrom && this.sensitiveFrom instanceof Array){var c = true;for (var j=0;j<this.sensitiveFrom.length;j++){var s = /\.|\-/.exec(this.sensitiveFrom[j]);var f = (this.sensitiveFrom[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (this.getFormatedDate(f, tempDate)== this.sensitiveFrom[j])
 c = false;};if (c){this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);continue;}};if ((this.sensitiveFrom && (tempDate.valueOf()< this.sensitiveFrom.valueOf()))
 || (this.sensitiveTo && (tempDate.valueOf() > this.sensitiveTo.valueOf()))) {this.addClass(cell, "insensitive");tempDate.setDate(tempDate.getDate() + 1);continue;};if (this.isWeekend(i)&& tempDate.getMonth()==date.getMonth()) 
 cell.className = "weekend";if (tempDate.toDateString()== this.curDate.toDateString())
 this.addClass(cell, "current");if (tempDate.toDateString()== selectedDate) {this.activeCell = cell;this.addClass(cell, "selected");};if (this.holidays)for (var j=0;j<this.holidays.length;j++){var s = /\.|\-/.exec(this.holidays[j]);var f = (this.holidays[j].split (s).length == 2 ? '%m'+s+'%d' : '%Y'+s+'%m'+s+'%d');if (this.getFormatedDate(f, tempDate)== this.holidays[j])
 this.addClass(cell, "holiday");};cell.onclick = function(){var date = new Date(this.thisdate);self.setDate (date);if(!self.doOnClick || self.doOnClick(date)){self.callEvent("onClick", [date]);}};tempDate.setDate(tempDate.getDate() + 1);}}},

 
 draw:function(){if (!this.parent)this.createStructure();var self = this;if (this.loadingLanguage){setTimeout(function() {self.draw();return;}, 20);return;};this.drawHeader();this.drawMonth();this.drawDayLabels();this.drawDays();this.isAutoDraw = true;},

 
 loadUserLanguage:function(language, userCBfunction){if (userCBfunction)this.onLanguageLoaded = userCBfunction;if (!language){language="en-us";};this.loadingLanguage = language;if (!language){this.loadUserLanguageCallback(false);return;};if (language == this.options.langname){this.loadUserLanguageCallback(true);return;};var __lm = window.dhtmlxCalendarLangModules;if (__lm[language]){for (lg in __lm[language])this.options[lg] = __lm[language][lg];this.loadUserLanguageCallback(true);return;};var src, path = null;var scripts = document.getElementsByTagName('SCRIPT');for (var i=0;i<scripts.length;i++)if(src = scripts[i].getAttribute('src'))
 if (src.indexOf(this.scriptName)>= 0) {path = src.substr(0, src.indexOf(this.scriptName));break;};if (path === null){this.loadUserLanguageCallback(false);return;};this.options.langname = language;var langPath = path + 'lang/' + language + '.js';for (var i=0;i<scripts.length;i++)if(src = scripts[i].getAttribute('src'))
 if (src == langPath)return;var script = document.createElement('SCRIPT');script.setAttribute('language', "Java-Script");script.setAttribute('type', "text/javascript");script.setAttribute('src', langPath);document.body.appendChild(script);},

 loadUserLanguageCallback:function(status) {this.loadingLanguage = null;if (this.isAutoDraw)this.draw();if (this.onLanguageLoaded && (typeof(this.onLanguageLoaded)== 'function'))
 this.onLanguageLoaded(status);},

 loadLanguageModule:function(langModule) {var __c = window.dhtmlxCalendarObjects;for (var i=0;i<__c.length;i++){if (__c[i].loadingLanguage == langModule.langname){for (lg in langModule)__c[i].options[lg] = langModule[lg];__c[i].loadUserLanguageCallback(true);}};window.dhtmlxCalendarLangModules[langModule.langname] = langModule;},

 

 show:function(conId){this.activeCon = this.con[this._activeConInd(conId)];this.parent.style.display = '';this.parent.style.visibility = 'hidden';if (this.activeCon.nodeName == 'INPUT' && !this.userPosition){if( typeof window.innerWidth == 'number' ){docWidth = window.innerWidth;docHeight = window.innerHeight;}else {docWidth = document.body.offsetWidth;docHeight = document.body.offsetHeight;};var aLeft = getAbsoluteLeft( this.activeCon);var aTop = getAbsoluteTop( this.activeCon);if (aTop + this.parent.offsetHeight > docHeight && this.parent.offsetHeight < aTop)this.parent.style.top = aTop - this.parent.offsetHeight + this.activeCon.offsetHeight + 'px';else
 this.parent.style.top = aTop + 'px';if (aLeft + this.parent.offsetWidth + this.activeCon.offsetWidth > docWidth)this.parent.style.left = aLeft + 'px';else
 this.parent.style.left = aLeft + this.activeCon.offsetWidth + 'px';};if (this.ifr != undefined){this.ifr.style.top = this.entObj.offsetTop + 'px';this.ifr.style.left = this.entObj.offsetLeft + 'px';this.ifr.style.display = 'block';};if (this.time && !this.minimized){this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 147);this.tp.show ();};this.parent.style.visibility = 'visible';return this;},

 
 hide:function(){this.parent.style.display = 'none';if(this.ifr!=undefined)this.ifr.style.display = 'none';if (this.time)this.tp.hide();return this;},

 
 setDateFormat:function(format){this.options.dateformat = format;},



 
 cutTime:function(date) {date = new Date(date);var ndate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 1);return ndate;},


 
 setParent:function(newParent){if (newParent){this.parent = newParent;this.parent.appendChild(this.entObj);}},
 
 setDate:function(date, conId){tmpDate = date;conId = this._activeConInd (conId);this.activeCon = this.con [conId];if (typeof date != "Object"){date = this.setFormatedDate(null ,tmpDate);};if (isNaN(date)|| !date) {date = new Date;};this.date[conId] = new Date(this.cutTime(date));this.selDate[conId] = new Date(this.cutTime(date));if (this.isAutoDraw){this.draw();};if (this.activeCon.nodeName == 'INPUT'){this.activeCon.value = !tmpDate ? '' : this.getFormatedDate(this.options.dateformat, date);}},
 
 addClass:function(obj, styleName) {obj.className += ' ' + styleName;},

 
 resetClass:function(obj) {obj.className = obj.className.toString().split(' ')[0];},

 resetHotClass:function(obj) {obj.className = obj.className.toString().replace(/hover/, '');},

 
 setSkin:function(newSkin) {this.skinName = newSkin;var mode = "";mode = (this.minimized
 ? "_mini" 
 : (this.time 
 ? "_long"
 : (this.options.isWinHeader
 ? "_maxi"
 : ""
 )
 )
 );this.entObj.className = this.style + (newSkin ? '_' + newSkin : '');if (mode)this.entObj.className += " " + this.entObj.className + mode;if(this.ifr!=undefined){this.ifr.className = this.style + (newSkin ? '_' + newSkin : '') + mode + "_ifr";};if (this.time)(this.isVisible () && !this.minimized) ? this.tp.show () : this.tp.hide ();},
 
 
 getDate:function(conId)
 {return this.selDate[this._activeConInd(conId)].toString();},
 
 

 nextMonth:function(){var date = this.date[0], month;date.setDate(1);date.setMonth(month = date.getMonth() + 1);this.callEvent ("onChangeMonth",[(month+1 > 12 ? 1 : month+1), month || 12]);if (this.isAutoDraw)this.draw();},
 
 
 prevMonth:function(){var date = this.date[0], month;date.setDate(1);date.setMonth(month = date.getMonth()-1);this.callEvent ("onChangeMonth",[month+1 || 12,month+2 > 12 ? 1 : (month+2 || 12)]);if (this.isAutoDraw)this.draw();},
 
 setOnClickHandler:function(func){this.attachEvent("onClick",func);},

 

 getFormatedDate:function (dateformat, date, conInd) {if(!dateformat)dateformat = this.options.dateformat
 if(!date)date = this.selDate[this._activeConInd(conInd)];date = new Date(date);var out = '';var plain = true;for (var i=0;i<dateformat.length;i++){var replStr = dateformat.substr(i, 1);if (plain){if (replStr == '%'){plain = false;continue;};out += replStr;}else {switch (replStr) {case 'e':
 replStr = date.getDate();break;case 'd':
 replStr = date.getDate();if (replStr.toString().length == 1)
 replStr='0'+replStr;break;case 'j':
 var x = new Date(date.getFullYear(), 0, 0, 0, 0, 0, 0);replStr = Math.ceil((date.valueOf() - x.valueOf())/1000/60/60/24 - 1);while (replStr.toString().length < 3)
 replStr = '0' + replStr;break;case 'a':
 replStr = this.options.daysSNames[date.getDay()];break;case 'W':
 replStr = this.options.daysFNames[date.getDay()];break;case 'c':
 replStr = 1 + date.getMonth();break;case 'm':
 replStr = 1 + date.getMonth();if (replStr.toString().length == 1)
 replStr = '0' + replStr;break;case 'b':
 replStr = this.options.monthesSNames[date.getMonth()];break;case 'M':
 replStr = this.options.monthesFNames[date.getMonth()];break;case 'y':
 replStr = date.getFullYear();replStr = replStr.toString().substr(2);break;case 'Y':
 replStr = date.getFullYear();break;case 'H':
 case 'h':
 case 'i':
 case 's':
 case 'f':
 if (this.time){replStr = this.tp.getFormatedTime('%'+replStr, arguments[2]);};break;};out += replStr;plain = true;}};return out;},

 


 setFormatedDate: function(dateformatarg, date, conInd, skip){if (!date || !(typeof date == 'string')) return date;if (date == '0000-00-00'){this.setDate (new Date, conInd);return new Date;};if(!dateformatarg)dateformatarg = this.options.dateformat;if (this.time){this.tp.setFormatedTime(dateformatarg, date);};function parseMonth(val){var tmpAr = new Array(this.options.monthesSNames,this.options.monthesFNames);for(var j=0;j<tmpAr.length;j++){for (var i=0;i<tmpAr[j].length;i++)if (tmpAr[j][i].indexOf(val)== 0)
 return i;};return -1;};var outputDate = new Date(2008, 0, 1);var j=0;for(var i=0;i<dateformatarg.length;i++){var _char = dateformatarg.charAt(i);if(_char=="%"){var _cd = dateformatarg.charAt(i+1);var _nextpc = dateformatarg.indexOf("%",i+1);var _nextDelim = dateformatarg.substr(i+2,_nextpc-i-1-1);var _nDelimInDatePos = date.indexOf(_nextDelim,j);if(_nextDelim=="")_nDelimInDatePos = date.length
 if(_nDelimInDatePos==-1)return null;var value = date.substr(j, _nDelimInDatePos-j);if (_cd != 'M' && _cd != 'b')value = parseFloat(value);j=_nDelimInDatePos+_nextDelim.length
 switch (_cd) {case 'd':
 case 'e':
 outputDate.setDate(parseFloat(value));break;case "c":
 case "m":
 outputDate.setMonth(parseFloat(value) - 1);break;case "M":
 var val = parseMonth.call(this,value);if(val!=-1)outputDate.setMonth(parseFloat(val));else 
 return null;break;case "b":
 var val = parseMonth.call(this,value);if(val!=-1)outputDate.setMonth(parseFloat(val));else 
 return null;break;case 'Y':
 outputDate.setFullYear(parseFloat(value));break;case 'y':
 var year=parseFloat(value);outputDate.setFullYear(((year>20)?1900:2000) + year);break;}}};if (isNaN(outputDate))
 outputDate = new Date(this.selDate[this._activeConInd]);if (skip)return outputDate;this.setDate (outputDate, conInd);return this.selDate[this.activeConInd];},

 
 isWeekend:function(k){var q = k + this.options.weekstart;if (q > 6)q -= 7;for (var i=0;i<this.options.weekend.length;i++)if (this.options.weekend[i] == q)return true;return false;},

 
 getDayName:function(k){var q = k + this.options.weekstart;if (q > 6)q = q - 7;return this.options.daysSNames[q];},

 
 isVisible: function(){return this.parent.style.display != 'none';},
 doHotKeys:function(e){e = e||event;var cell = e.target || e.srcElement;if (cell.className.toString().indexOf('insensitive') >=0 ) {this.endHotKeys();}else {if (this.hotCell)this.resetHotClass(this.hotCell);this.addClass(cell, 'hover');this.hotCell = cell;}},

 endHotKeys:function(){if (this.hotCell){this.resetHotClass(this.hotCell);this.hotCell = null;}},
 _activeConInd:function(ind){if (!this.parent)this.createStructure();return (this.activeConInd = (this.conInd[ind]==0?'0':this.conInd[ind]) || (ind==0?'0':ind) || this.conInd[this.activeCon.id] || 0);}};function dhtmlxRichSelector(parametres) {for (x in parametres)this[x] = parametres[x];this.initValue = this.activeValue;if (!this.selectorSize)this.selectorSize = 7;var self = this;this.blurTimer = null;this.nodeBefore.onclick = function() {self.show();};this.editor = document.createElement('TEXTAREA');this.editor.value = this.activeValue;this.editor._s = this;this.editor.className = 'dhtmlxRichSelector';this.editor.onfocus = this.onFocus;this.editor.onblur = this.onBlur;this.selector = document.createElement('SELECT');this.selector.size = this.selectorSize;this.selector.className = 'dhtmlxRichSelector';if (this.valueList)for (var i = 0;i < this.valueList.length;i++)this.selector.options[i] = new Option(this.titleList[i], this.valueList[i], false, false);this.selector._s = this;this.selector.onfocus = this.onFocus;this.selector.onblur = this.onBlur;this.selector.onclick = function () {window.t = self;self.onSelect(self.selector.value);clearTimeout(self.blurTimer);};this.selector.getIndexByValue = function (Value, isFull) {var Select = this;Value = Value.toString().toUpperCase();if (!isFull)isFull=false;for (var i=0;i<Select.length;i++){var i_value = Select[i].text.toUpperCase();if (isFull){if(i_value == Value)return i;}else {if (i_value.indexOf(Value)== 0) return i;}};if (Select._s.isOrderedList){if (Select._s.isNumbersList)if (isNaN(Value)) return -1;i_value = Select[0].text.substring(0, Value.length).toUpperCase();if (i_value > Value)return 0;i_value = Select[Select.length-1].text.substring(0, Value.length);if (i_value < Value)return Select.length-1;};return -1;};this.con = document.createElement('DIV')
 this.con.className = 'dhtmlxRichSelector';with (this.con.style) {width = 'auto';display = 'none';};this.con.appendChild(this.editor);this.con.appendChild(this.selector);this.nodeBefore.parentNode.insertBefore(this.con, this.nodeBefore);return this;};dhtmlxRichSelector.prototype.show = function() {this.con.style.display = 'block';with (this.selector.style) {marginTop = parseInt(this.nodeBefore.offsetHeight)+'px';width = 'auto';};with (this.editor.style) {width = parseInt(this.nodeBefore.offsetWidth)+15+'px';height = parseInt(this.nodeBefore.offsetHeight)+'px';};this.selector.selectedIndex = this.selector.getIndexByValue(this.activeValue);this.editor.focus();};dhtmlxRichSelector.prototype.hide = function() {this.con.style.display = 'none';};dhtmlxRichSelector.prototype.onBlur = function() {var self = this._s;self.blurTimer = setTimeout(function(){if (self.isAllowUserValue){if (self.onSelect(self.editor.value))
 self.activeValue = self.editor.value;}else {if (self.onSelect(self.selector.value))
 self.activeValue = self.selector.value;}}, 10);};dhtmlxRichSelector.prototype.onFocus = function() {var self = this._s;if(self.blurTimer){clearTimeout(self.blurTimer);self.blurTimer = null;};if (this === this._s.selector)self.editor.focus();};dhtmlxCalendarObject.prototype.setHeader = function(isVisible, isDrag, btnsOpt){with (this.options) {isWinHeader = isVisible;isWinDrag = isDrag;if (btnsOpt)headerButtons = btnsOpt;};this.setSkin (this.skinName);};dhtmlxCalendarObject.prototype.setYearsRange = function(minYear, maxYear){this.options.yearsRange = [parseInt(minYear), parseInt(maxYear)];this.allYears = [];for (var i=minYear;i <= maxYear;i++)this.allYears.push(i);};dhtmlxCalendarObject.prototype.startDrag = function(e) {e = e||event;if ((e.button === 0)|| (e.button === 1)) {if (this.dragging){this.stopDrag(e);};this.drag_mx = e.clientX;this.drag_my = e.clientY;this.drag_spos = this.getPosition(this.parent);document.body.appendChild(this.parent);with (this.parent.style) {left = this.drag_spos[0] + 'px';top = this.drag_spos[1] + 'px';margin = '0px';position = 'absolute';};if (this.ifr){this.ifr.style.top = '0px';this.ifr.style.left = '0px';};this.bu_onmousemove = document.body.onmousemove;var self = this;document.body.onmousemove = function (e) {self.onDrag(e);};this.bu_onmouseup = document.body.onmouseup;document.body.onmouseup = function (e) {self.stopDrag(e);};this.dragging = true;}};dhtmlxCalendarObject.prototype.onDrag = function(e) {e = e||event;if ((e.button === 0)|| (e.button === 1)) {var delta_x = this.drag_mx - e.clientX;var delta_y = this.drag_my - e.clientY;this.parent.style.left = this.drag_spos[0] - delta_x + 'px';this.parent.style.top = this.drag_spos[1] - delta_y + 'px';if (this.time){this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);};if(this.ifr != undefined){this.ifr.style.left = 0;this.ifr.style.top = 0;}}else {this.stopDrag(e);}};dhtmlxCalendarObject.prototype.stopDrag = function(e) {e = e||event;document.body.onmouseup = (this.bu_onmouseup === window.undefined)? null: this.bu_onmouseup;document.body.onmousemove = (this.bu_onmousemove === window.undefined)? null: this.bu_onmousemove;this.dragging = false;};dhtmlxCalendarObject.prototype.minimize = function(){if (!this.winHeader)return;this.minimized = !this.minimized;this.entBox.style.display = (!this.minimized) ? '' : 'none';this.setSkin (this.skinName);};dhtmlxCalendarObject.prototype.onYearSelect = function(value) {if (!isNaN(value))
 {this._c.date[0].setFullYear(
 Math.min 
 (
 Math.max 
 (
 value, 
 this._c.allYears[0]
 ), 
 this._c.allYears.slice(-1)
 )
 );};this._c.draw();return (!isNaN(value));};dhtmlxCalendarObject.prototype.onMonthSelect = function(value) {this._c.date[0].setMonth(value);this._c.draw();return true;};dhtmlxCalendarObject.prototype.setPosition = function(argA,argB,argC){if(typeof(argA)=='object'){var posAr = this.getPosition(argA)
 var left = posAr[0]+argA.offsetWidth+(argC||0);var top = posAr[1]+(argB||0);};this.parent.style.position = "absolute";this.parent.style.top = (top||argA)+"px";this.parent.style.left = (left||argB)+"px";if (this.ifr != undefined){this.ifr.style.left = '0px';this.ifr.style.top = '0px';};if (this.time)this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);};dhtmlxCalendarObject.prototype.close = function(func){this.hide ();};dhtmlxCalendarObject.prototype.getPosition = function(oNode,pNode) {if(!pNode)var pNode = document.body
 var oCurrentNode=oNode;var iLeft=0;var iTop=0;while ((oCurrentNode)&&(oCurrentNode!=pNode)){iLeft+=oCurrentNode.offsetLeft-oCurrentNode.scrollLeft;iTop+=oCurrentNode.offsetTop-oCurrentNode.scrollTop;oCurrentNode=oCurrentNode.offsetParent;};if (pNode == document.body ){if (_isIE){if (document.documentElement.scrollTop)iTop+=document.documentElement.scrollTop;if (document.documentElement.scrollLeft)iLeft+=document.documentElement.scrollLeft;}else
 if (!_isFF){iLeft+=document.body.offsetLeft;iTop+=document.body.offsetTop;}};return new Array(iLeft,iTop);};dhtmlxCalendarObject.prototype.setSensitive = function(fromDate,toDate){if (fromDate)if (fromDate instanceof Date){this.sensitiveFrom = this.cutTime(fromDate);}else {this.sensitiveFrom = fromDate.toString ().split (',');};if (toDate)this.sensitiveTo = this.cutTime(toDate);if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.setHolidays = function(dates){this.holidays = dates.toString().split(",");if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.onChangeMonth = function (func) {this.attachEvent ("onChangeMonth",func);};dhtmlxCalendarObject.prototype.setInsensitiveDates = function (dates) {this.insensitiveDates = dates.toString().split(",");if (this.isAutoDraw)this.draw();};dhtmlxCalendarObject.prototype.enableTime = function (mode) {if (this.time = mode){this.tp = new dhtmlXTimePicker ();this.tp.setPosition (getAbsoluteLeft (this.parent) + 30, getAbsoluteTop (this.parent) + 160);for (m in dhtmlXTimePicker.prototype)(function (m) {if (!dhtmlxCalendarObject.prototype [m])dhtmlxCalendarObject.prototype [m] = function (){return this.tp[m].apply(this.tp, arguments)}})(m);}else {this.tp.entBox.parentNode.removeChild (this.tp.entBox);this.tp = null;};this.setSkin(this.skinName);};dhtmlxCalendarObject.prototype.setHeaderText = function (text) {this.options.headerText = text;if (this.headerLabel){this.headerLabel.childNodes[0].nodeValue = text;this.headerLabel.setAttribute('title', text);}};dhtmlxCalendarObject.prototype.disableIESelectFix = function (mode) {this.useIframe = !mode;if (this.ifr != undefined){this.ifr.parentNode.removeChild(this.ifr);this.ifr = null;}};
//v.2.6 build 100722

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/