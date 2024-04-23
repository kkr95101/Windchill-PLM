/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

/* dhtmlx.com */

if (typeof(window.dhx4) == "undefined") {
	
	window.dhx4 = {
		
		version: "4.0.3",
		
		skin: null, // allow to be set by user
		
		skinDetect: function(comp) {
			var t = document.createElement("DIV");
			t.className = comp+"_skin_detect";
			if (document.body.firstChild) document.body.insertBefore(t, document.body.firstChild); else document.body.appendChild(t);
			var w = t.offsetWidth;
			t.parentNode.removeChild(t);
			t = null;
			return {10:"dhx_skyblue",20:"dhx_web",30:"dhx_terrace"}[w]||null;
		},
		
		// id manager
		lastId: 1,
		newId: function() {
			return this.lastId++;
		},
		
		// z-index manager
		zim: {
			data: {},
			step: 5,
			first: function() {
				return 100;
			},
			last: function() {
				var t = this.first();
				for (var a in this.data) t = Math.max(t, this.data[a]);
				return t;
			},
			reserve: function(id) {
				this.data[id] = this.last()+this.step;
				return this.data[id];
			},
			clear: function(id) {
				if (this.data[id] != null) {
					this.data[id] = null;
					delete this.data[id];
				}
			}
		},
		
		// string to boolean
		s2b: function(r) {
			return (r == true || r == 1 || r == "true" || r == "1" || r == "yes" || r == "y");
		},
		
		// trim
		trim: function(t) {
			return String(t).replace(/^\s{1,}/,"").replace(/\s{1,}$/,"");
		},
		
		// template parsing
		template: function(tpl, data, trim) {
			// tpl - template text
			// data - object with key-value
			// trim - true/false, trim values
			return tpl.replace(/#([a-zA-Z0-9_-]{1,})#/g, function(t,k){
				if (k.length > 0 && typeof(data[k]) != "undefined") {
					if (trim == true) return window.dhx4.trim(data[k]);
					return String(data[k]);
				}
				return "";
			});
		},
		
		// absolute top/left position on screen
		absLeft: function(obj) {
			if (typeof(obj) == "string") obj = document.getElementById(obj);
			return this._aOfs(obj).left;
		},
		absTop: function(obj) {
			if (typeof(obj) == "string") obj = document.getElementById(obj);
			return this._aOfs(obj).top;
		},
		_aOfsSum: function(elem) {
			var top = 0, left = 0;
			while (elem) {
				top = top + parseInt(elem.offsetTop);
				left = left + parseInt(elem.offsetLeft);
				elem = elem.offsetParent;
			}
			return {top: top, left: left};
		},
		_aOfsRect: function(elem) {
			var box = elem.getBoundingClientRect();
			var body = document.body;
			var docElem = document.documentElement;
			var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
			var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
			var clientTop = docElem.clientTop || body.clientTop || 0;
			var clientLeft = docElem.clientLeft || body.clientLeft || 0;
			var top  = box.top +  scrollTop - clientTop;
			var left = box.left + scrollLeft - clientLeft;
			return { top: Math.round(top), left: Math.round(left) };
		},
		_aOfs: function(elem) {
			if (elem.getBoundingClientRect) {
				return this._aOfsRect(elem);
			} else {
				return this._aOfsSum(elem);
			}
		},
		
		// copy obj
		_isObj: function(k) {
			return (k != null && typeof(k) == "object" && typeof(k.length) == "undefined");
		},
		_copyObj: function(r) {
			if (this._isObj(r)) {
				var t = {};
				for (var a in r) {
					if (typeof(r[a]) == "object" && r[a] != null) t[a] = this._copyObj(r[a]); else t[a] = r[a];
				}
			} else {
				var t = [];
				for (var a=0; a<r.length; a++) {
					if (typeof(r[a]) == "object" && r[a] != null) t[a] = this._copyObj(r[a]); else t[a] = r[a];
				}
			}
			return t;
		},
		
		// screen dim
		screenDim: function() {
			var isIE = (navigator.userAgent.indexOf("MSIE") >= 0);
			var dim = {};
			dim.left = document.body.scrollLeft;
			dim.right = dim.left+(window.innerWidth||document.body.clientWidth);
			dim.top = Math.max((isIE?document.documentElement:document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
			dim.bottom = dim.top+(isIE?Math.max(document.documentElement.clientHeight||0,document.documentElement.offsetHeight||0):window.innerHeight);
			return dim;
		},
		
		// input/textarea range selection
		selectTextRange: function(inp, start, end) {
			
			inp = (typeof(inp)=="string"?document.getElementById(inp):inp);
			
			var len = inp.value.length;
			start = Math.max(Math.min(start, len), 0);
			end = Math.min(end, len);
			
			if (inp.setSelectionRange) {
				try {inp.setSelectionRange(start, end);} catch(e){}; // combo in grid under IE requires try/catch
			} else if (inp.createTextRange) {
				var range = inp.createTextRange();
				range.moveStart("character", start);
				range.moveEnd("character", end-len);
				try {range.select();} catch(e){};
			}
		},
		
		// transition
		transData: null,
		transDetect: function() {
			
			if (this.transData == null) {
				
				this.transData = {transProp: false, transEv: null};
				
				// transition, MozTransition, WebkitTransition, msTransition, OTransition
				var k = {
					"MozTransition": "transitionend",
					"WebkitTransition": "webkitTransitionEnd",
					"OTransition": "oTransitionEnd",
					"msTransition": "transitionend",
					"transition": "transitionend"
				};
				
				for (var a in k) {
					if (this.transData.transProp == false && document.documentElement.style[a] != null) {
						this.transData.transProp = a;
						this.transData.transEv = k[a];
					}
				}
				k = null;
			}
			
			return this.transData;
			
		}
		
	};
	
	// browser
	window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
	window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
	window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
	window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
	window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0);
	window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0);
	window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
	window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
};

if (typeof(window.dhx4.ajax) == "undefined") {
	
	window.dhx4.ajax = {
		
		// if false - dhxr param will added to prevent caching on client side (default),
		// if true - do not add extra params
		cache: false,
		
		// default method for load/loadStruct, post/get allowed
		method: "post",
		
		get: function(url, onLoad) {
			this._call("GET", url, null, true, onLoad);
		},
		getSync: function(url) {
			return this._call("GET", url, null, false);
		},
		post: function(url, postData, onLoad) {
			if (arguments.length == 1) {
				postData = "";
			} else if (arguments.length == 2 && (typeof(postData) == "function" || typeof(window[postData]) == "function")) {
				onLoad = postData;
				postData = "";
			} else {
				postData = String(postData);
			}
			this._call("POST", url, postData, true, onLoad);
		},
		postSync: function(url, postData) {
			postData = (postData == null ? "" : String(postData));
			return this._call("POST", url, postData, false);
		},
		getLong: function(url, onLoad) {
			this._call("GET", url, null, true, onLoad, {url:url});
		},
		postLong: function(url, postData, onLoad) {
			if (arguments.length == 2 && (typeof(postData) == "function" || typeof(window[postData]))) {
				onLoad = postData;
				postData = "";
			}
			this._call("POST", url, postData, true, onLoad, {url:url, postData:postData});
		},
		_call: function(method, url, postData, async, onLoad, longParams) {
			
			var t = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
			var isQt = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
			
			if (async == true) {
				t.onreadystatechange = function() {
					if ((t.readyState == 4 && t.status == 200) || (isQt == true && t.readyState == 3)) { // what for long response and status 404?
						window.setTimeout(function(){
							if (typeof(onLoad) == "function") {
								onLoad.apply(window, [{xmlDoc:t}]); // dhtmlx-compat, response.xmlDoc.responseXML/responseText
							}
							if (longParams != null) {
								if (typeof(longParams.postData) != "undefined") {
									dhx4.ajax.postLong(longParams.url, longParams.postData, onLoad);
								} else {
									dhx4.ajax.getLong(longParams.url, onLoad);
								}
							}
							onLoad = null;
							t = null;
						},1);
					}
				}
			}
			
			if (method == "GET" && this.cache != true) {
				url += (url.indexOf("?")>=0?"&":"?")+"dhxr"+new Date().getTime();
			}
			
			t.open(method, url, async);
			
			if (method == "POST") {
				t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				if (this.cache != true) postData += (postData.length>0?"&":"")+"dhxr"+new Date().getTime();
			} else {
				postData = null;
			}
			
			t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			
			t.send(postData);
			
			if (!async) return {xmlDoc:t}; // dhtmlx-compat, response.xmlDoc.responseXML/responseText
			
		}
	};
	
};

if (typeof(window.dhx4._enableDataLoading) == "undefined") {

	window.dhx4._enableDataLoading = function(obj, initObj, xmlToJson, xmlRootTag, mode) {
		
		if (mode == "clear") {
			
			// clear attached functionality
			
			for (var a in obj._dhxdataload) {
				obj._dhxdataload[a] = null;
				delete obj._dhxdataload[a];
			};
			
			obj._loadData = null;
			obj._dhxdataload = null;
			obj.load = null;
			obj.loadStruct = null;
			
			obj = null;
			
			return;
			
		}
		
		obj._dhxdataload = { // move to obj.conf?
			initObj: initObj,
			xmlToJson: xmlToJson,
			xmlRootTag: xmlRootTag,
			onBeforeXLS: null
		};
		
		obj._loadData = function(data, loadParams, onLoad) {
			
			if (arguments.length == 2) {
				onLoad = loadParams;
				loadParams = null;
			}
			
			var obj = null;
			
			// deprecated from 4.0, compatability with version (url, type[json|xml], onLoad)
			if (arguments.length == 3) onLoad = arguments[2];
			
			if (typeof(data) == "string") {
				
				var k = data.replace(/^\s{1,}/,"").replace(/\s{1,}$/,"");
				
				var tag = new RegExp("^<"+this._dhxdataload.xmlRootTag);
				
				// xml
				if (tag.test(k.replace(/^<\?xml[^\?]*\?>\s*/, ""))) { // remove leading <?xml ...?> if any, \n can be also presenе
					if (window.DOMParser) { // ff,ie9
						obj = (new window.DOMParser()).parseFromString(data, "text/xml");
					} else if (typeof(window.ActiveXObject) != "undefined") {
						obj = new window.ActiveXObject("Microsoft.XMLDOM");
						obj.async = "false";
						obj.loadXML(data);
					}
					if (obj != null) obj = this[this._dhxdataload.xmlToJson].apply(this, [obj]); // xml to json
				}
				
				if (obj == null && (k.match(/^\{.*\}$/) != null || k.match(/^\[.*\]$/) != null)) {
					try { eval("dhx4.temp="+k); } catch(e) { dhx4.temp = null; }
					obj = dhx4.temp;
					dhx4.temp = null;
				}
				
				if (obj == null) {
					
					this.callEvent("onXLS",[]);
					
					var params = [];
					
					// allow to modify url and add params
					if (typeof(this._dhxdataload.onBeforeXLS) == "function") {
						var k = this._dhxdataload.onBeforeXLS.apply(this,[data]);
						if (k != null && typeof(k) == "object") {
							if (k.url != null) data = k.url;
							if (k.params != null) { for (var a in k.params) params.push(a+"="+encodeURIComponent(k.params[a])); }
						}
					}
					
					var t = this;
					var callBack = function(r) {
						
						var obj = null;
						
						if ((r.xmlDoc.getResponseHeader("Content-Type")||"").search(/xml/gi) >= 0 || (r.xmlDoc.responseText.replace(/^\s{1,}/,"")).match(/^</) != null) {
							obj = t[t._dhxdataload.xmlToJson].apply(t,[r.xmlDoc.responseXML]);
						} else {
							try { eval("dhx4.temp="+r.xmlDoc.responseText); } catch(e){ dhx4.temp = null; };
							obj = dhx4.temp;
							dhx4.temp = null;
						}
						
						// init
						if (obj != null) t[t._dhxdataload.initObj].apply(t,[obj,data]); // data => url
						
						t.callEvent("onXLE",[]);
						
						if (onLoad != null) {
							if (typeof(onLoad) == "function") {
								onLoad.apply(t,[]);
							} else if (typeof(window[onLoad]) == "function") {
								window[onLoad].apply(t,[]);
							}
						}
						
						callBack = onLoad = null;
						obj = r = t = null;
						
					};
					
					params = params.join("&")+(typeof(loadParams)=="string"?"&"+loadParams:"");
					
					if (dhx4.ajax.method == "post") {
						dhx4.ajax.post(data, params, callBack);
					} else if (dhx4.ajax.method == "get") {
						dhx4.ajax.get(data+(data.indexOf("?")>0?"":"")+params, callBack);
					}
					
					return;
				}
				
			} else {
				if (typeof(data.documentElement) == "object" || (typeof(data.tagName) != "undefined" && typeof(data.getElementsByTagName) != "undefined" && data.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) { // xml
					obj = this[this._dhxdataload.xmlToJson].apply(this, [data]);
				} else { // json
					obj = window.dhx4._copyObj(data);
				}
				
			}
			
			// init
			if (obj != null) this[this._dhxdataload.initObj].apply(this,[obj]);
			
			if (onLoad != null) {
				if (typeof(onLoad) == "function") {
					onLoad.apply(this, []);
				} else if (typeof(window[onLoad]) == "function") {
					window[onLoad].apply(this, []);
				}
				onLoad = null;
			}
			
		};
		
		// loadStruct for hdr/conf
		// load for data
		if (mode != null) {
			var k = {struct: "loadStruct", data: "load"};
			for (var a in mode) {
				if (mode[a] == true) obj[k[a]] = function() {return this._loadData.apply(this, arguments);}
			}
		}
		
		obj = null;
		
	};
};
if (typeof(window.dhx4._eventable) == "undefined") {
	
	window.dhx4._eventable = function(obj, mode) {
		
		if (mode == "clear") {
			
			obj.detachAllEvents();
			
			obj.dhxevs = null;
			
			obj.attachEvent = null;
			obj.detachEvent = null;
			obj.checkEvent = null;
			obj.callEvent = null;
			obj.detachAllEvents = null;
			
			obj = null;
			
			return;
			
		}
		
		obj.dhxevs = { data: {} };
		
		obj.attachEvent = function(name, func) {
			name = String(name).toLowerCase();
			if (!this.dhxevs.data[name]) this.dhxevs.data[name] = {};
			var eventId = window.dhx4.newId();
			this.dhxevs.data[name][eventId] = func;
			return eventId;
		}
		
		obj.detachEvent = function(eventId) {
			for (var a in this.dhxevs.data) {
				var k = 0;
				for (var b in this.dhxevs.data[a]) {
					if (b == eventId) {
						this.dhxevs.data[a][b] = null;
						delete this.dhxevs.data[a][b];
					} else {
						k++;
					}
				}
				if (k == 0) {
					this.dhxevs.data[a] = null;
					delete this.dhxevs.data[a];
				}
			}
		}
		
		obj.checkEvent = function(name) {
			name = String(name).toLowerCase();
			return (this.dhxevs.data[name] != null);
		}
		
		obj.callEvent = function(name, params) {
			name = String(name).toLowerCase();
			if (this.dhxevs.data[name] == null) return true;
			var r = true;
			for (var a in this.dhxevs.data[name]) {
				r = this.dhxevs.data[name][a].apply(this, params) && r;
			}
			return r;
		}
		
		obj.detachAllEvents = function() {
			for (var a in this.dhxevs.data) {
				for (var b in this.dhxevs.data[a]) {
					this.dhxevs.data[a][b] = null;
					delete this.dhxevs.data[a][b];
				}
				this.dhxevs.data[a] = null;
				delete this.dhxevs.data[a];
			}
		}
		
		obj = null;
	};
	
};
dhtmlx=function(obj){
	for (var a in obj) dhtmlx[a]=obj[a];
	return dhtmlx; //simple singleton
};
dhtmlx.extend_api=function(name,map,ext){
	var t = window[name];
	if (!t) return; //component not defined
	window[name]=function(obj){
		if (obj && typeof obj == "object" && !obj.tagName){
			var that = t.apply(this,(map._init?map._init(obj):arguments));
			//global settings
			for (var a in dhtmlx)
				if (map[a]) this[map[a]](dhtmlx[a]);			
			//local settings
			for (var a in obj){
				if (map[a]) this[map[a]](obj[a]);
				else if (a.indexOf("on")==0){
					this.attachEvent(a,obj[a]);
				}
			}
		} else
			var that = t.apply(this,arguments);
		if (map._patch) map._patch(this);
		return that||this;
	};
	window[name].prototype=t.prototype;
	if (ext)
		dhtmlXHeir(window[name].prototype,ext);
};

dhtmlxAjax={
	get:function(url,callback){
		var t=new dtmlXMLLoaderObject(true);
		t.async=(arguments.length<3);
		t.waitCall=callback;
		t.loadXML(url)
		return t;
	},
	post:function(url,post,callback){
		var t=new dtmlXMLLoaderObject(true);
		t.async=(arguments.length<4);
		t.waitCall=callback;
		t.loadXML(url,true,post)
		return t;
	},
	getSync:function(url){
		return this.get(url,null,true)
	},
	postSync:function(url,post){
		return this.post(url,post,null,true);		
	}
}

/**
  *     @desc: xmlLoader object
  *     @type: private
  *     @param: funcObject - xml parser function
  *     @param: object - jsControl object
  *     @param: async - sync/async mode (async by default)
  *     @param: rSeed - enable/disable random seed ( prevent IE caching)
  *     @topic: 0
  */
function dtmlXMLLoaderObject(funcObject, dhtmlObject, async, rSeed){
	this.xmlDoc="";

	if (typeof (async) != "undefined")
		this.async=async;
	else
		this.async=true;

	this.onloadAction=funcObject||null;
	this.mainObject=dhtmlObject||null;
	this.waitCall=null;
	this.rSeed=rSeed||false;
	return this;
};

dtmlXMLLoaderObject.count = 0;

/**
  *     @desc: xml loading handler
  *     @type: private
  *     @param: dtmlObject - xmlLoader object
  *     @topic: 0
  */
dtmlXMLLoaderObject.prototype.waitLoadFunction=function(dhtmlObject){
	var once = true;
	this.check=function (){
		if ((dhtmlObject)&&(dhtmlObject.onloadAction != null)){
			if ((!dhtmlObject.xmlDoc.readyState)||(dhtmlObject.xmlDoc.readyState == 4)){
				if (!once)
					return;

				once=false; //IE 5 fix
				dtmlXMLLoaderObject.count++;
				if (typeof dhtmlObject.onloadAction == "function")
					dhtmlObject.onloadAction(dhtmlObject.mainObject, null, null, null, dhtmlObject);

				if (dhtmlObject.waitCall){
					dhtmlObject.waitCall.call(this,dhtmlObject);
					dhtmlObject.waitCall=null;
				}
			}
		}
	};
	return this.check;
};

/**
  *     @desc: return XML top node
  *     @param: tagName - top XML node tag name (not used in IE, required for Safari and Mozilla)
  *     @type: private
  *     @returns: top XML node
  *     @topic: 0  
  */
dtmlXMLLoaderObject.prototype.getXMLTopNode=function(tagName, oldObj){
	if (typeof this.xmlDoc.status == "undefined" || this.xmlDoc.status < 400){
		if (this.xmlDoc.responseXML){
			var temp = this.xmlDoc.responseXML.getElementsByTagName(tagName);
			if(temp.length==0 && tagName.indexOf(":")!=-1)
				var temp = this.xmlDoc.responseXML.getElementsByTagName((tagName.split(":"))[1]);
			var z = temp[0];
		} else
			var z = this.xmlDoc.documentElement;

		if (z){
			this._retry=false;
			return z;
		}

		if (!this._retry&&_isIE){
			this._retry=true;
			var oldObj = this.xmlDoc;
			this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""), true);
			return this.getXMLTopNode(tagName, oldObj);
		}
	}

	dhtmlxError.throwError("LoadXML", "Incorrect XML", [
		(oldObj||this.xmlDoc),
		this.mainObject
	]);

	return document.createElement("DIV");
};

/**
  *     @desc: load XML from string
  *     @type: private
  *     @param: xmlString - xml string
  *     @topic: 0  
  */
dtmlXMLLoaderObject.prototype.loadXMLString=function(xmlString, silent){

	if (!_isIE){
		var parser = new DOMParser();
		this.xmlDoc=parser.parseFromString(xmlString, "text/xml");
	} else {
		this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		this.xmlDoc.async=this.async;
		this.xmlDoc.onreadystatechange = function(){};
		this.xmlDoc["loadXM"+"L"](xmlString);
	}
	
	if (silent)
		return;

	if (this.onloadAction)
		this.onloadAction(this.mainObject, null, null, null, this);

	if (this.waitCall){
		this.waitCall();
		this.waitCall=null;
	}
}
/**
  *     @desc: load XML
  *     @type: private
  *     @param: filePath - xml file path
  *     @param: postMode - send POST request
  *     @param: postVars - list of vars for post request
  *     @topic: 0
  */
dtmlXMLLoaderObject.prototype.loadXML=function(filePath, postMode, postVars, rpc){
	if (this.rSeed)
		filePath+=((filePath.indexOf("?") != -1) ? "&" : "?")+"a_dhx_rSeed="+(new Date()).valueOf();
	this.filePath=filePath;

	if ((!_isIE)&&(window.XMLHttpRequest))
		this.xmlDoc=new XMLHttpRequest();
	else {
		this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (this.async)
		this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);
	this.xmlDoc.open(postMode ? "POST" : "GET", filePath, this.async);

	if (rpc){
		this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("+navigator.userAgent+")");
		this.xmlDoc.setRequestHeader("Content-type", "text/xml");
	}

	else if (postMode)
		this.xmlDoc.setRequestHeader('Content-type', (this.contenttype || 'application/x-www-form-urlencoded'));
		
	this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");
	this.xmlDoc.send(null||postVars);

	if (!this.async)
		(new this.waitLoadFunction(this))();
};
/**
  *     @desc: destructor, cleans used memory
  *     @type: private
  *     @topic: 0
  */
dtmlXMLLoaderObject.prototype.destructor=function(){
	this._filterXPath = null;
	this._getAllNamedChilds = null;
	this._retry = null;
	this.async = null;
	this.rSeed = null;
	this.filePath = null;
	this.onloadAction = null;
	this.mainObject = null;
	this.xmlDoc = null;
	this.doXPath = null;
	this.doXPathOpera = null;
	this.doXSLTransToObject = null;
	this.doXSLTransToString = null;
	this.loadXML = null;
	this.loadXMLString = null;
	// this.waitLoadFunction = null;
	this.doSerialization = null;
	this.xmlNodeToJSON = null;
	this.getXMLTopNode = null;
	this.setXSLParamValue = null;
	return null;
}

dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(node){
        var t={};
        for (var i=0; i<node.attributes.length; i++)
            t[node.attributes[i].name]=node.attributes[i].value;
        t["_tagvalue"]=node.firstChild?node.firstChild.nodeValue:"";
        for (var i=0; i<node.childNodes.length; i++){
            var name=node.childNodes[i].tagName;
            if (name){
                if (!t[name]) t[name]=[];
                t[name].push(this.xmlNodeToJSON(node.childNodes[i]));
            }            
        }        
        return t;
    }

/**  
  *     @desc: Call wrapper
  *     @type: private
  *     @param: funcObject - action handler
  *     @param: dhtmlObject - user data
  *     @returns: function handler
  *     @topic: 0  
  */
function callerFunction(funcObject, dhtmlObject){
	this.handler=function(e){
		if (!e)
			e=window.event;
		funcObject(e, dhtmlObject);
		return true;
	};
	return this.handler;
};

/**  
  *     @desc: Calculate absolute position of html object
  *     @type: private
  *     @param: htmlObject - html object
  *     @topic: 0  
  */
function getAbsoluteLeft(htmlObject){
	return getOffset(htmlObject).left;
}
/**
  *     @desc: Calculate absolute position of html object
  *     @type: private
  *     @param: htmlObject - html object
  *     @topic: 0  
  */
function getAbsoluteTop(htmlObject){
	return getOffset(htmlObject).top;
}

function getOffsetSum(elem) {
	var top=0, left=0;
	while(elem) {
		top = top + parseInt(elem.offsetTop);
		left = left + parseInt(elem.offsetLeft);
		elem = elem.offsetParent;
	}
	return {top: top, left: left};
}
function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect();
	var body = document.body;
	var docElem = document.documentElement;
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;
	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;
	return { top: Math.round(top), left: Math.round(left) };
}
function getOffset(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem);
	} else {
		return getOffsetSum(elem);
	}
}

/**  
*     @desc: Convert string to it boolean representation
*     @type: private
*     @param: inputString - string for covertion
*     @topic: 0
*/
function convertStringToBoolean(inputString){
	if (typeof (inputString) == "string")
		inputString=inputString.toLowerCase();

	switch (inputString){
		case "1":
		case "true":
		case "yes":
		case "y":
		case 1:
		case true:
			return true;
			break;

		default: return false;
	}
}

/**  
*     @desc: find out what symbol to use as url param delimiters in further params
*     @type: private
*     @param: str - current url string
*     @topic: 0  
*/
function getUrlSymbol(str){
	if (str.indexOf("?") != -1)
		return "&"
	else
		return "?"
}

function dhtmlDragAndDropObject(){
	if (window.dhtmlDragAndDrop)
		return window.dhtmlDragAndDrop;

	this.lastLanding=0;
	this.dragNode=0;
	this.dragStartNode=0;
	this.dragStartObject=0;
	this.tempDOMU=null;
	this.tempDOMM=null;
	this.waitDrag=0;
	window.dhtmlDragAndDrop=this;

	return this;
};

dhtmlDragAndDropObject.prototype.removeDraggableItem=function(htmlNode){
	htmlNode.onmousedown=null;
	htmlNode.dragStarter=null;
	htmlNode.dragLanding=null;
}
dhtmlDragAndDropObject.prototype.addDraggableItem=function(htmlNode, dhtmlObject){
	htmlNode.onmousedown=this.preCreateDragCopy;
	htmlNode.dragStarter=dhtmlObject;
	this.addDragLanding(htmlNode, dhtmlObject);
}
dhtmlDragAndDropObject.prototype.addDragLanding=function(htmlNode, dhtmlObject){
	htmlNode.dragLanding=dhtmlObject;
}
dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){
	if ((e||window.event) && (e||event).button == 2)
		return;

	if (window.dhtmlDragAndDrop.waitDrag){
		window.dhtmlDragAndDrop.waitDrag=0;
		document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;
		document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;
		return false;
	}
	
	if (window.dhtmlDragAndDrop.dragNode)
		window.dhtmlDragAndDrop.stopDrag(e);	

	window.dhtmlDragAndDrop.waitDrag=1;
	window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;
	window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;
	window.dhtmlDragAndDrop.dragStartNode=this;
	window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;
	document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;
	document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;
	window.dhtmlDragAndDrop.downtime = new Date().valueOf();
	

	if ((e)&&(e.preventDefault)){
		e.preventDefault();
		return false;
	}
	return false;
};
dhtmlDragAndDropObject.prototype.callDrag=function(e){
	if (!e)
		e=window.event;
	dragger=window.dhtmlDragAndDrop;
	if ((new Date()).valueOf()-dragger.downtime<100) return;

	//if ((e.button == 0)&&(_isIE))
	//	return dragger.stopDrag();

	if (!dragger.dragNode){
		if (dragger.waitDrag){
			dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode, e);
	
			if (!dragger.dragNode)
				return dragger.stopDrag();
	
			dragger.dragNode.onselectstart=function(){return false;}
			dragger.gldragNode=dragger.dragNode;
			document.body.appendChild(dragger.dragNode);
			document.body.onmouseup=dragger.stopDrag;
			dragger.waitDrag=0;
			dragger.dragNode.pWindow=window;
			dragger.initFrameRoute();
		} 
		else return dragger.stopDrag(e, true);
	}

	if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode){
		var grd = dragger.gldragNode;

		if (dragger.gldragNode.old)
			grd=dragger.gldragNode.old;

		//if (!document.all) dragger.calculateFramePosition();
		grd.parentNode.removeChild(grd);
		var oldBody = dragger.dragNode.pWindow;

		if (grd.pWindow &&	grd.pWindow.dhtmlDragAndDrop.lastLanding)
			grd.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(grd.pWindow.dhtmlDragAndDrop.lastLanding);	
			
		//		var oldp=dragger.dragNode.parentObject;
		if (_isIE){
			var div = document.createElement("Div");
			div.innerHTML=dragger.dragNode.outerHTML;
			dragger.dragNode=div.childNodes[0];
		} else
			dragger.dragNode=dragger.dragNode.cloneNode(true);

		dragger.dragNode.pWindow=window;
		//		dragger.dragNode.parentObject=oldp;

		dragger.gldragNode.old=dragger.dragNode;
		document.body.appendChild(dragger.dragNode);
		oldBody.dhtmlDragAndDrop.dragNode=dragger.dragNode;
	}

	dragger.dragNode.style.left=e.clientX+15+(dragger.fx
		? dragger.fx*(-1)
		: 0)
		+(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";
	dragger.dragNode.style.top=e.clientY+3+(dragger.fy
		? dragger.fy*(-1)
		: 0)
		+(document.body.scrollTop||document.documentElement.scrollTop)+"px";

	if (!e.srcElement)
		var z = e.target;
	else
		z=e.srcElement;
	dragger.checkLanding(z, e);
}

dhtmlDragAndDropObject.prototype.calculateFramePosition=function(n){
	//this.fx = 0, this.fy = 0;
	if (window.name){
		var el = parent.frames[window.name].frameElement.offsetParent;
		var fx = 0;
		var fy = 0;

		while (el){
			fx+=el.offsetLeft;
			fy+=el.offsetTop;
			el=el.offsetParent;
		}

		if ((parent.dhtmlDragAndDrop)){
			var ls = parent.dhtmlDragAndDrop.calculateFramePosition(1);
			fx+=ls.split('_')[0]*1;
			fy+=ls.split('_')[1]*1;
		}

		if (n)
			return fx+"_"+fy;
		else
			this.fx=fx;
		this.fy=fy;
	}
	return "0_0";
}
dhtmlDragAndDropObject.prototype.checkLanding=function(htmlObject, e){
	if ((htmlObject)&&(htmlObject.dragLanding)){
		if (this.lastLanding)
			this.lastLanding.dragLanding._dragOut(this.lastLanding);
		this.lastLanding=htmlObject;
		this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX,
			e.clientY, e);
		this.lastLanding_scr=(_isIE ? e.srcElement : e.target);
	} else {
		if ((htmlObject)&&(htmlObject.tagName != "BODY"))
			this.checkLanding(htmlObject.parentNode, e);
		else {
			if (this.lastLanding)
				this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e);
			this.lastLanding=0;

			if (this._onNotFound)
				this._onNotFound();
		}
	}
}
dhtmlDragAndDropObject.prototype.stopDrag=function(e, mode){
	dragger=window.dhtmlDragAndDrop;

	if (!mode){
		dragger.stopFrameRoute();
		var temp = dragger.lastLanding;
		dragger.lastLanding=null;

		if (temp)
			temp.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, temp, (_isIE
				? event.srcElement
				: e.target));
	}
	dragger.lastLanding=null;

	if ((dragger.dragNode)&&(dragger.dragNode.parentNode == document.body))
		dragger.dragNode.parentNode.removeChild(dragger.dragNode);
	dragger.dragNode=0;
	dragger.gldragNode=0;
	dragger.fx=0;
	dragger.fy=0;
	dragger.dragStartNode=0;
	dragger.dragStartObject=0;
	document.body.onmouseup=dragger.tempDOMU;
	document.body.onmousemove=dragger.tempDOMM;
	dragger.tempDOMU=null;
	dragger.tempDOMM=null;
	dragger.waitDrag=0;
}

dhtmlDragAndDropObject.prototype.stopFrameRoute=function(win){
	if (win)
		window.dhtmlDragAndDrop.stopDrag(1, 1);

	for (var i = 0; i < window.frames.length; i++){
		try{
		if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
			window.frames[i].dhtmlDragAndDrop.stopFrameRoute(window);
		} catch(e){}
	}

	try{
	if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
		parent.dhtmlDragAndDrop.stopFrameRoute(window);
	} catch(e){}
}
dhtmlDragAndDropObject.prototype.initFrameRoute=function(win, mode){
	if (win){
		window.dhtmlDragAndDrop.preCreateDragCopy();
		window.dhtmlDragAndDrop.dragStartNode=win.dhtmlDragAndDrop.dragStartNode;
		window.dhtmlDragAndDrop.dragStartObject=win.dhtmlDragAndDrop.dragStartObject;
		window.dhtmlDragAndDrop.dragNode=win.dhtmlDragAndDrop.dragNode;
		window.dhtmlDragAndDrop.gldragNode=win.dhtmlDragAndDrop.dragNode;
		window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;
		window.waitDrag=0;

		if (((!_isIE)&&(mode))&&((!_isFF)||(_FFrv < 1.8)))
			window.dhtmlDragAndDrop.calculateFramePosition();
	}
	try{
	if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
		parent.dhtmlDragAndDrop.initFrameRoute(window);
	}catch(e){}

	for (var i = 0; i < window.frames.length; i++){
		try{
		if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
			window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, ((!win||mode) ? 1 : 0));
		} catch(e){}
	}
}

 _isFF = false;
 _isIE = false;
 _isOpera = false;
 _isKHTML = false;
 _isMacOS = false;
 _isChrome = false;
 _FFrv = false;
 _KHTMLrv = false;
 _OperaRv = false;

if (navigator.userAgent.indexOf('Macintosh') != -1)
	_isMacOS=true;


if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
	_isChrome=true;

if ((navigator.userAgent.indexOf('Safari') != -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){
	 _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));

	if (_KHTMLrv > 525){ //mimic FF behavior for Safari 3.1+
		_isFF=true;
		 _FFrv = 1.9;
	} else
		_isKHTML=true;
} else if (navigator.userAgent.indexOf('Opera') != -1){
	_isOpera=true;
	_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));
}


else if (navigator.appName.indexOf("Microsoft") != -1){
	_isIE=true;
	if ((navigator.appVersion.indexOf("MSIE 8.0")!= -1 || 
		 navigator.appVersion.indexOf("MSIE 9.0")!= -1 || 
		 navigator.appVersion.indexOf("MSIE 10.0")!= -1 ||
		 document.documentMode > 7) && 
			document.compatMode != "BackCompat"){
		_isIE=8;
	}
} else if (navigator.appName  == 'Netscape' && navigator.userAgent.indexOf("Trident") != -1){
	//ie11
	_isIE=8;
} else {
	_isFF=true;
	 _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
}


//multibrowser Xpath processor
dtmlXMLLoaderObject.prototype.doXPath=function(xpathExp, docObj, namespace, result_type){
	if (_isKHTML || (!_isIE && !window.XPathResult))
		return this.doXPathOpera(xpathExp, docObj);

	if (_isIE){ //IE
		if (!docObj)
			if (!this.xmlDoc.nodeName)
				docObj=this.xmlDoc.responseXML
			else
				docObj=this.xmlDoc;

		if (!docObj)
			dhtmlxError.throwError("LoadXML", "Incorrect XML", [
				(docObj||this.xmlDoc),
				this.mainObject
			]);

		if (namespace != null)
			docObj.setProperty("SelectionNamespaces", "xmlns:xsl='"+namespace+"'"); //

		if (result_type == 'single'){
			return docObj.selectSingleNode(xpathExp);
		}
		else {
			return docObj.selectNodes(xpathExp)||new Array(0);
		}
	} else { //Mozilla
		var nodeObj = docObj;

		if (!docObj){
			if (!this.xmlDoc.nodeName){
				docObj=this.xmlDoc.responseXML
			}
			else {
				docObj=this.xmlDoc;
			}
		}

		if (!docObj)
			dhtmlxError.throwError("LoadXML", "Incorrect XML", [
				(docObj||this.xmlDoc),
				this.mainObject
			]);

		if (docObj.nodeName.indexOf("document") != -1){
			nodeObj=docObj;
		}
		else {
			nodeObj=docObj;
			docObj=docObj.ownerDocument;
		}
		var retType = XPathResult.ANY_TYPE;

		if (result_type == 'single')
			retType=XPathResult.FIRST_ORDERED_NODE_TYPE
		var rowsCol = new Array();
		var col = docObj.evaluate(xpathExp, nodeObj, function(pref){
			return namespace
		}, retType, null);

		if (retType == XPathResult.FIRST_ORDERED_NODE_TYPE){
			return col.singleNodeValue;
		}
		var thisColMemb = col.iterateNext();

		while (thisColMemb){
			rowsCol[rowsCol.length]=thisColMemb;
			thisColMemb=col.iterateNext();
		}
		return rowsCol;
	}
}

function _dhtmlxError(type, name, params){
	if (!this.catches)
		this.catches=new Array();

	return this;
}

_dhtmlxError.prototype.catchError=function(type, func_name){
	this.catches[type]=func_name;
}
_dhtmlxError.prototype.throwError=function(type, name, params){
	if (this.catches[type])
		return this.catches[type](type, name, params);

	if (this.catches["ALL"])
		return this.catches["ALL"](type, name, params);

	alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);
	return null;
}

window.dhtmlxError=new _dhtmlxError();


//opera fake, while 9.0 not released
//multibrowser Xpath processor
dtmlXMLLoaderObject.prototype.doXPathOpera=function(xpathExp, docObj){
	//this is fake for Opera
	var z = xpathExp.replace(/[\/]+/gi, "/").split('/');
	var obj = null;
	var i = 1;

	if (!z.length)
		return [];

	if (z[0] == ".")
		obj=[docObj]; else if (z[0] == ""){
		obj=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(z[i].replace(/\[[^\]]*\]/g, ""));
		i++;
	} else
		return [];

	for (i; i < z.length; i++)obj=this._getAllNamedChilds(obj, z[i]);

	if (z[i-1].indexOf("[") != -1)
		obj=this._filterXPath(obj, z[i-1]);
	return obj;
}

dtmlXMLLoaderObject.prototype._filterXPath=function(a, b){
	var c = new Array();
	var b = b.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");

	for (var i = 0; i < a.length; i++)
		if (a[i].getAttribute(b))
			c[c.length]=a[i];

	return c;
}
dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a, b){
	var c = new Array();

	if (_isKHTML)
		b=b.toUpperCase();

	for (var i = 0; i < a.length; i++)for (var j = 0; j < a[i].childNodes.length; j++){
		if (_isKHTML){
			if (a[i].childNodes[j].tagName&&a[i].childNodes[j].tagName.toUpperCase() == b)
				c[c.length]=a[i].childNodes[j];
		}

		else if (a[i].childNodes[j].tagName == b)
			c[c.length]=a[i].childNodes[j];
	}

	return c;
}

function dhtmlXHeir(a, b){
	for (var c in b)
		if (typeof (b[c]) == "function")
			a[c]=b[c];
	return a;
}

function dhtmlxEvent(el, event, handler){
	if (el.addEventListener)
		el.addEventListener(event, handler, false);

	else if (el.attachEvent)
		el.attachEvent("on"+event, handler);
}

//============= XSL Extension ===================================

dtmlXMLLoaderObject.prototype.xslDoc=null;
dtmlXMLLoaderObject.prototype.setXSLParamValue=function(paramName, paramValue, xslDoc){
	if (!xslDoc)
		xslDoc=this.xslDoc

	if (xslDoc.responseXML)
		xslDoc=xslDoc.responseXML;
	var item =
		this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+paramName+"']", xslDoc,
			"http:/\/www.w3.org/1999/XSL/Transform", "single");

	if (item != null)
		item.firstChild.nodeValue=paramValue
}
dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(xslDoc, xmlDoc){
	if (!xslDoc)
		xslDoc=this.xslDoc;

	if (xslDoc.responseXML)
		xslDoc=xslDoc.responseXML

	if (!xmlDoc)
		xmlDoc=this.xmlDoc;

	if (xmlDoc.responseXML)
		xmlDoc=xmlDoc.responseXML

	//MOzilla
	if (!_isIE){
		if (!this.XSLProcessor){
			this.XSLProcessor=new XSLTProcessor();
			this.XSLProcessor.importStylesheet(xslDoc);
		}
		var result = this.XSLProcessor.transformToDocument(xmlDoc);
	} else {
		var result = new ActiveXObject("Msxml2.DOMDocument.3.0");
		try{
			xmlDoc.transformNodeToObject(xslDoc, result);
		}catch(e){
			result = xmlDoc.transformNode(xslDoc);
		}
	}
	return result;
}

dtmlXMLLoaderObject.prototype.doXSLTransToString=function(xslDoc, xmlDoc){
	var res = this.doXSLTransToObject(xslDoc, xmlDoc);
	if(typeof(res)=="string")
		return res;
	return this.doSerialization(res);
}

dtmlXMLLoaderObject.prototype.doSerialization=function(xmlDoc){
	if (!xmlDoc)
			xmlDoc=this.xmlDoc;
	if (xmlDoc.responseXML)
			xmlDoc=xmlDoc.responseXML
	if (!_isIE){
		var xmlSerializer = new XMLSerializer();
		return xmlSerializer.serializeToString(xmlDoc);
	} else
		return xmlDoc.xml;
}

/**
*   @desc: 
*   @type: private
*/
dhtmlxEventable=function(obj){
		obj.attachEvent=function(name, catcher, callObj){
			name='ev_'+name.toLowerCase();
			if (!this[name])
				this[name]=new this.eventCatcher(callObj||this);
				
			return(name+':'+this[name].addEvent(catcher)); //return ID (event name & event ID)
		}
		obj.callEvent=function(name, arg0){ 
			name='ev_'+name.toLowerCase();
			if (this[name])
				return this[name].apply(this, arg0);
			return true;
		}
		obj.checkEvent=function(name){
			return (!!this['ev_'+name.toLowerCase()])
		}
		obj.eventCatcher=function(obj){
			var dhx_catch = [];
			var z = function(){
				var res = true;
				for (var i = 0; i < dhx_catch.length; i++){
					if (dhx_catch[i] != null){
						var zr = dhx_catch[i].apply(obj, arguments);
						res=res&&zr;
					}
				}
				return res;
			}
			z.addEvent=function(ev){
				if (typeof (ev) != "function")
					ev=eval(ev);
				if (ev)
					return dhx_catch.push(ev)-1;
				return false;
			}
			z.removeEvent=function(id){
				dhx_catch[id]=null;
			}
			return z;
		}
		obj.detachEvent=function(id){
			if (id != false){
				var list = id.split(':');           //get EventName and ID
				this[list[0]].removeEvent(list[1]); //remove event
			}
		}
		obj.detachAllEvents = function(){
			for (var name in this){
				if (name.indexOf("ev_")==0){
					this.detachEvent(name);
					this[name] = null;
				}
			}
		}
		obj = null;
};

/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

function dhtmlXVaultObject(conf) {
	
	var that = this;
	
	this.conf = {
		version: "2.3",
		skin: (conf.skin||window.dhx4.skin||(typeof(dhtmlx)!="undefined"?dhtmlx.skin:null)||window.dhx4.skinDetect("dhxvault")||"dhx_skyblue"),
		param_name: (typeof(conf.paramName)!="undefined"?conf.paramName:"file"),
		engine: null,
		list: "list_default",
		url: conf.uploadUrl||"",
		// multiple files, html5/flash only
		multiple_files: (typeof(conf.multiple)!="undefined"?conf.multiple==true:true),
		// swf-file path
		swf_file: conf.swfPath||"",
		swf_url:  conf.swfUrl||"",
		swf_logs: conf.swfLogs||"no",
		// sl-data
		sl_xap:  conf.slXap,
		sl_url:  conf.slUrl,
		sl_logs: conf.slLogs,
		// common
		enabled: true,
		auto_start: (typeof(conf.autoStart)!="undefined"?conf.autoStart==true:true), // true by default
		auto_remove: (typeof(conf.autoRemove)!="undefined"?conf.autoRemove==true:false), // false by default
		files_added: 0,
		uploaded_count: 0,
		files_limit: (typeof(conf.filesLimit)!="undefined"?conf.filesLimit:0), // max files
		max_file_size: 0, // can be truth if > 0
		buttons: { // visible buttons
			upload: (typeof(conf.buttonUpload)!="undefined"?(conf.buttonUpload==true):false),
			clear: (typeof(conf.buttonClear)!="undefined"?(conf.buttonClear==true):true)
		},
		// offsets
		ofs: {
			dhx_skyblue: 5,
			dhx_web: 7,
			dhx_terrace: 10,
			bootstrap: 10
		},
		// data
		uploaded_state: {}, // save state tru/false for uploaded or failed
		uploaded_files: {}, // uploaded files data
		// progress mode
		progress_mode: "percent", // "percent","eta"
		// icons
		icon_def: "",
		icons: {} // generated
	}
	
	this.list = new this[this.conf.list]();
	
	// icons
	this.conf.icon_def = this.icon_def;
	for (var a in this.icons) {
		for (var q=0; q<this.icons[a].length; q++) this.conf.icons[this.icons[a][q]] = a;
	}
	
	// engine detect
	if (typeof(conf.mode) == "string" && typeof(this[conf.mode]) == "function") {
		this.conf.engine = conf.mode;
	} else {
		this.conf.engine = "html4";
		
		var k = null;
		if (typeof(window.FormData) != "undefined" && typeof(window.XMLHttpRequest) != "undefined") {
			k = new XMLHttpRequest();
			if (typeof(k.upload) == "undefined") k = null;
		}
		
		if (k != null) {
			// IE10, IE11, FF, Chrome, Opera
			this.conf.engine = "html5";
		} else if (typeof(window.swfobject) != "undefined" || k === false) {
			var k = swfobject.getFlashPlayerVersion();
			if (k.major >= 10) this.conf.engine = "flash";
		} else {
			// check if silverlight installed
			this.conf.sl_v = this.getSLVersion();
			if (this.conf.sl_v) this.conf.engine = "sl";
		}
		k = null;
	}
	
	var base = (typeof(conf.parent) != "undefined" ? conf.parent : conf.container);
	base = (typeof(base)=="string"?document.getElementById(base):base);
	conf.parent = conf.container = null;
	
	if (base._attach_mode == true) {
		this.base = base;
	} else {
		this.base = document.createElement("DIV");
		base.appendChild(this.base);
	}
	this.base.className += " dhx_vault_"+this.conf.skin;
	if (base._no_border == true) this.base.style.border = "0px solid white";
	
	base = conf = null;
	
	// buttons
	this.p_controls = document.createElement("DIV");
	this.p_controls.className = "dhx_vault_controls";
	this.base.appendChild(this.p_controls);
	this.p_controls.onselectstart = function(e){
		e = e||event;
		if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
		return false;
	}
	
	// files
	this.p_files = document.createElement("DIV");
	this.p_files.className = "dhx_vault_files";
	this.base.appendChild(this.p_files);
	
	this._doOnFilesClick = function(e) {
		e = e||event;
		var t = e.target||e.srcElement;
		var action = null;
		while (t != that.p_files && action == null) {
			if (action == null && t != null && t._action != null) {
				action = t._action;
			} else {
				t = t.parentNode;
			}
		}
		if (action == null) return;
		if (action.data == "delete_file") {
			if (that.conf.enabled) that._removeFileFromQueue(action.id);
		}
	}
	if (typeof(window.addEventListener) == "function") {
		this.p_files.addEventListener("click", this._doOnFilesClick, false);
	} else {
		this.p_files.attachEvent("onclick", this._doOnFilesClick);
	}
	
	this.file_data = {};
	
	this._initToolbar = function() {
		
		// add
		this.b_opts = {
			browse:	{ str: "btnAdd", onclick: null },
			upload:	{ str: "btnUpload", onclick: function() { if (!that.conf.enabled) return; if (!that.conf.uploading) { that._uploadStart(); } } },
			cancel:	{ str: "btnCancel", onclick: function() { if (!that.conf.enabled) return; that._uploadStop(); that._switchButton(false); } },
			clear:	{ str: "btnClean", onclick: function() { if (!that.conf.enabled) return; that.clear(); }, css: "float:right!important;"}
		};
		
		this.buttons = {};
		
		for (var a in this.b_opts) {
			var k = document.createElement("DIV");
			k.innerHTML = "<div class='dhxvault_button_icon dhx_vault_icon_"+a+"'></div>"+
					"<div class='dhxvault_button_text'>"+this.strings[this.b_opts[a].str]+"</div>";
			
			if (this.b_opts[a].css != null) k.style.cssText += this.b_opts[a].css;
			k.className = "dhx_vault_button";
			k._css = k.className;
			k._onclick = this.b_opts[a].onclick;
			k.onmouseover = function() {
				if (that.conf.enabled != true) return;
				if (this._hover == true) return;
				this._hover = true;
				this.className = this._css+" dhx_vault_button"+this._css_p+"_hover";
			}
			k.onmouseout = function() {
				if (that.conf.enabled != true) return;
				if (this._hover != true) return;
				this._hover = false;
				this.className = this._css;
			}
			k.onmousedown = function() {
				if (that.conf.enabled != true) return;
				if (this._hover != true) return;
				this._pressed = true;
				this.className = this._css+" dhx_vault_button"+this._css_p+"_pressed";
			}
			k.onmouseup = function(e) {
				if (that.conf.enabled != true) return;
				if (this._pressed != true) return;
				this._pressed = false;
				this.className = this._css+(this._hover?" dhx_vault_button"+this._css_p+"_hover":"");
				if (this._onclick != null) this._onclick();
			}
			if (this.b_opts[a].tooltip) k.title = this.b_opts[a].tooltip;
			this.p_controls.appendChild(k);
			this.buttons[a] = k;
			k = null;
			
			// visibile
			if (a == "upload" || a == "clear") this.buttons[a].style.display = (this.conf.buttons[a] == true?"":"none");
			
			this.b_opts[a].onclick = null;
			this.b_opts[a] = null;
			delete this.b_opts[a];
		}
		
		this.b_opts = null;
		delete this.b_opts;
		
		this.buttons.cancel.style.display = "none";
	}
	
	this._readableSize = function(t) {
		var i = false;
		var b = ["b","Kb","Mb","Gb","Tb","Pb","Eb"];
		for (var q=0; q<b.length; q++) if (t > 1024) t = t / 1024; else if (i === false) i = q;
		if (i === false) i = b.length-1;
		return Math.round(t*100)/100+" "+b[i];
	}
	
	this._beforeAddFileToList = function(name, size, lastModifiedDate) {
		return (this.callEvent("onBeforeFileAdd", [{
			id: null,
			name: name,
			size: size,
			lastModifiedDate: lastModifiedDate,
			serverName: null,
			uploaded: false,
			error: false
		}])===true);
	}
	
	this._addFileToList = function(id, name, size, state, progress) {
		
		var ext = this.getFileExtension(name);
		var icon = (ext.length>0?(this.conf.icons[ext.toLowerCase()]||this.conf.icon_def):this.conf.icon_def);
		
		// add div for new file
		this.list.addFileItem(id, this.p_files);
		
		// render file in list
		this.list.renderFileRecord(id, {name: name, icon: icon, size: size, readableSize: this._readableSize(size||0), state: state, progress: progress});
		
		this.callEvent("onFileAdd", [{
			id: id,
			name: name,
			size: size,
			lastModifiedDate: this.file_data[id].file.lastModifiedDate||null,
			serverName: null,
			uploaded: false,
			error: false
		}]);
		
	}
	
	this._removeFileFromList = function(id) {
		
		// remove div from list
		this.list.removeFileRecord(id);
		
		if (this.conf.uploaded_files[id] != null) {
			this.conf.uploaded_files[id] = null;
			delete this.conf.uploaded_files[id];
		}
		
		if (this.conf.uploaded_state[id] != null) {
			this.conf.uploaded_state[id] = null;
			delete this.conf.uploaded_state[id];
		}
		
	}
	
	this._updateFileInList = function(id, state, progress) {
		if (this.list.isFileItemExist(id) == false) return;
		if (state == "uploading" && this.conf.progress_mode == "eta" && this._etaStart != null) this._etaStart(id);
		// progress
		this._updateProgress(id, state, progress);
	}
	
	this._updateProgress = function(id, state, progress) {
		if (state == "added") {
			this.list.updateFileState(id, {state: state});
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) this._etaEnd(id);
			return;
		}
		if (state == "fail") {
			this.list.updateFileState(id, {state: state, str_error: this.strings.error});
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) this._etaEnd(id);
			return;
		}
		if (state == "uploaded") {
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) this._etaEnd(id);
			var str_done = this.strings.done;
			var nameSizeData = (this.conf.engine != "html4" ? null : {name: this.file_data[id].name, size: this.file_data[id].size, readableSize: this._readableSize(this.file_data[id].size||0)}); // for html4 mode - update size
			window.setTimeout(function(){
				that.list.updateFileState(id, {state: "uploaded", str_done: str_done});
				if (nameSizeData != null) that.list.updateFileNameSize(id, nameSizeData);
			}, 100); // for very little files or goood internet line
			return;
		}
		if (state == "uploading") {
			if ((progress < 100 && this.conf.progress_type == "loader") || this.file_data[id].custom == true) {
				/* html4 mode or custom record - no progress */
				this.list.updateFileState(id, {state: "uploading_html4"});
			} else if (this.conf.progress_mode == "eta") {
				var eta = (this._etaCheck!=null?this._etaCheck(id,progress):null);
				this.list.updateFileState(id, {state: "uploading", progress: progress, eta: (eta==null?null:"eta: "+eta)});
			} else if (this.conf.progress_mode == "percent") {
				this.list.updateFileState(id, {state: "uploading", progress: progress, eta: progress+"%"});
			}
		}
	}
	
	this._removeFilesByState = function(state) {
		for (var a in this.file_data) {
			if (state === true || this.file_data[a].state == state) {
				this._removeFileFromQueue(a);
			}
		}
	}
	
	this._switchButton = function(state) {
		
		if (state == true) {
			if (this.conf.buttons.upload == true) {
				this.buttons.upload.style.display = "none";
				this.buttons.cancel.style.display = "";
			}
		} else {
			var t = this.conf.uploaded_count;
			var f = [];
			for (var a in this.conf.uploaded_state) {
				f.push({
					id: a,
					name: this._fileName,
					size: (this.file_data[a]!=null?this.file_data[a].size:null),
					lastModifiedDate: (this.file_data[a]!=null?(this.file_data[a].file.lastModifiedDate||null):null),
					serverName: (this.conf.uploaded_files[a]?this.conf.uploaded_files[a].serverName:null),
					uploaded: this.conf.uploaded_state[a],
					error: !this.conf.uploaded_state[a]
				});
			}
			if (this.conf.buttons.upload == true) {
				this.buttons.upload.style.display = "";
				this.buttons.cancel.style.display = "none";
			}
			this.conf.uploaded_count = 0;
			this.conf.uploaded_state = {};
			if (t > 0) this.callEvent("onUploadComplete",[f]);
		}
	}
	
	this._uploadStart = function() {
		
		this._switchButton(true);
		
		// change status for prev fail auploads if any
		if (!this.conf.uploading) {
			for (var a in this.file_data) {
				if (this.file_data[a].state == "fail") {
					this.file_data[a].state = "added";
					this._updateFileInList(a, "added", 0);
				}
			}
		}
		
		this.conf.uploading = true;
		
		var t = false;
		
		for (var a in this.file_data) {
			if (!t && [this.file_data[a].state] == "added") {
				t = true;
				this.file_data[a].state = "uploading";
				this._updateFileInList(a, "uploading", 0);
				this._doUploadFile(a);
			}
		}
		if (!t) {
			this.conf.uploading = false;
			this._switchButton(false);
		}
		
	}
	
	this._onUploadSuccess = function(id, serverName, r, extra) {
		
		// flash mode
		if (typeof(r) != "undefined" && this.conf.engine == "flash") {
			try {eval("dhx4.temp="+r.data);} catch(e){dhx4.temp=null;};
			var t = dhx4.temp;
			dhx4.temp = null;
			if (t != null && t.state == true && t.name != null) {
				serverName = t.name;
				if (t.extra != null) extra = t.extra;
			} else {
				this._onUploadFail(id, (t!=null&&t.extra!=null?t.extra:null));
				return;
			}
		}
		//
		this.conf.uploaded_count++;
		this.conf.uploaded_files[id] = {realName: this.file_data[id].name, serverName: serverName};
		this.file_data[id].state = "uploaded";
		this.conf.uploaded_state[id] = true;
		this._updateFileInList(id, "uploaded", 100);
		this.callEvent("onUploadFile", [{
			id: id,
			name: this.file_data[id].name,
			size: this.file_data[id].size,
			lastModifiedDate: this.file_data[id].file.lastModifiedDate||null,
			serverName: serverName,
			uploaded: true,
			error: false
		}, extra]);
		if (this.conf.auto_remove) this._removeFileFromQueue(id);
		if (this.conf.uploading) this._uploadStart();
	}
	
	this._onUploadFail = function(id, extra) {
		this.file_data[id].state = "fail";
		this._updateFileInList(id, "fail", 0);
		this.conf.uploaded_state[id] = false;
		this.callEvent("onUploadFail", [{
			id: id,
			name: this.file_data[id].name,
			size: this.file_data[id].size,
			lastModifiedDate: this.file_data[id].file.lastModifiedDate||null,
			serverName: null,
			uploaded: false,
			error: true
		}, extra]);
		if (this.conf.uploading) this._uploadStart();
	}
	
	this._onUploadAbort = function(id) {
		this.conf.uploading = false;
		this.file_data[id].state = "added";
		this._updateFileInList(id, "added", 0);
		this.callEvent("onUploadCancel",[{
			id: id,
			name: this.file_data[id].name,
			size: this.file_data[id].size,
			lastModifiedDate: this.file_data[id].file.lastModifiedDate,
			serverName: null,
			uploaded: false,
			error: false
		}]);
	}
	
	this.unload = function() {
		
		this.callEvent = function(){return true;}; // some events while files will removed from list
		
		//
		if (typeof(window.addEventListener) == "function") {
			this.p_files.removeEventListener("click", this._doOnFilesClick, false);
		} else {
			this.p_files.detachEvent("onclick", this._doOnFilesClick);
		}
		
		// remove all files from queue/list
		this._removeFilesByState(true);
		this.conf.uploaded_files = null;
		this.file_data = null;
		
		// custom engine stuff
		this._unloadEngine();
		
		this.list.unload();
		this.list = null;
		this.icons = null;
		
		// buttons
		for (var a in this.buttons) {
			this.buttons[a].onclick = null;
			this.buttons[a].onmouseover = null;
			this.buttons[a].onmouseout = null;
			this.buttons[a].onmousedown = null;
			this.buttons[a].onmouseup = null;
			this.buttons[a]._onclick = null;
			this.buttons[a].parentNode.removeChild(this.buttons[a]);
			this.buttons[a] = null;
			delete this.buttons[a];
		}
		this.buttons = null;
		
		// buttons container
		this.p_controls.onselectstart = null;
		this.p_controls.parentNode.removeChild(this.p_controls);
		this.p_controls = null;
		
		// buttons container
		this.p_files.parentNode.removeChild(this.p_files);
		this.p_files = null;
		
		window.dhx4._eventable(this, "clear");
		this.callEvent = null;
		
		for (var a in this.conf) {
			this.conf[a] = null;
			delete this.conf[a];
		}
		this.conf = null;
		this.strings = null;
		
		for (var a in this) {
			if (typeof(this[a]) == "function") this[a] = null;
		}
		
		// main container
		if (this.base._attach_mode != true) this.base.parentNode.removeChild(this.base);
		this.base = null;
		
		that = a = null;
		
	}
	
	// init engine-relative funcs
	var e = new this[this.conf.engine]();
	for (var a in e) { this[a] = e[a]; e[a] = null; }
	a = e = p = null;
	
	// init app
	this._initToolbar();
	this._initEngine();
	this.setSkin(this.conf.skin);
	
	window.dhx4._eventable(this);
	
	// files limit
	this.attachEvent("onFileAdd", function(){
		this.conf.files_added++;
	});
	this.attachEvent("onBeforeFileAdd", function(){
		if (this.conf.files_limit == 0) return true;
		return (this.conf.files_added < this.conf.files_limit);
	});
	
	// IE7 size fix
	if (window.dhx4.isIE7 || navigator.userAgent.indexOf("MSIE 7.0")>=0) {
		var vault = this;
		window.setTimeout(function(){vault.setSizes();vault=null;},1);
	}
	
	// server settings if any
	window.dhx4.ajax.post(this.conf.url, "mode=conf", function(r){
		try {eval("dhx4.temp="+r.xmlDoc.responseText);} catch(e){};
		var t = dhx4.temp;
		dhx4.temp = null;
		if (t != null) {
			if (t.maxFileSize != null) that.conf.max_file_size = parseInt(t.maxFileSize);
		}
	});
	
	return this;
	
};

dhtmlXVaultObject.prototype.icon_def = "icon_def";
dhtmlXVaultObject.prototype.icons = {
	// css => list_of_extensions
	icon_image:	["jpg", "jpeg", "gif", "png", "bmp", "tiff", "pcx", "svg", "ico"],
	icon_psd:	["psd"],
	icon_video:	["avi", "mpg", "mpeg", "rm", "move", "mov", "mkv", "flv", "f4v", "mp4", "3gp"],
	icon_audio:	["wav", "aiff", "au", "mp3", "aac", "wma", "ogg", "flac", "ape", "wv", "m4a", "mid", "midi"],
	icon_arch:	["rar", "zip", "tar", "tgz", "arj", "gzip", "bzip2", "7z", "ace", "apk", "deb"],
	icon_text:	["txt", "nfo", "djvu", "xml"],
	icon_html:	["htm", "html"],
	icon_doc:	["doc", "docx", "rtf", "odt"],
	icon_xls:	["xls", "xlsx"],
	icon_pdf:	["pdf", "ps"],
	icon_exe:	["exe"],
	icon_dmg:	["dmg"]
};

dhtmlXVaultObject.prototype.upload = function() {
	if (!this.conf.uploading) this._uploadStart();
};

dhtmlXVaultObject.prototype.setAutoStart = function(state) {
	this.conf.auto_start = (state==true);
};

dhtmlXVaultObject.prototype.setAutoRemove = function(state) {
	this.conf.auto_remove = (state==true);
};

dhtmlXVaultObject.prototype.setURL = function(url) {
	this.conf.url = url;
};

dhtmlXVaultObject.prototype.enable = function() {
	if (this.conf.enabled == true) return;
	this.conf.enabled = true;
	this.base.className = String(this.base.className).replace(/\s{0,}dhx_vault_dis/gi,"");
	//this.p_files.className = "dhx_vault_files";
	//this.p_controls.className = "dhx_vault_controls";
	if (this.conf.engine == "flash") document.getElementById(this.conf.swf_obj_id).style.display = "";
};

dhtmlXVaultObject.prototype.disable = function() {
	if (this.conf.enabled != true) return;
	this.conf.enabled = false;
	this.base.className += " dhx_vault_dis";
	// this.p_files.className = "dhx_vault_files dhx_vault_dis";
	// this.p_controls.className = "dhx_vault_controls dhx_vault_dis";
	if (this.conf.engine == "flash") document.getElementById(this.conf.swf_obj_id).style.display = "none";
};

dhtmlXVaultObject.prototype.setWidth = function(w) { // set width of the control in pixels
	if (this.base._attach_mode == true) return;
	this.base.parentNode.style.width = w+"px";
	this.setSizes();
};

dhtmlXVaultObject.prototype.setHeight = function(h) { // set height of the control in pixels
	if (this.base._attach_mode == true) return;
	this.base.parentNode.style.height = h+"px";
	this.setSizes();
};

dhtmlXVaultObject.prototype.setFilesLimit = function(t) { // control the number of uploaded files
	this.conf.files_added = 0; // reset old settings
	this.conf.files_limit = t;
};

dhtmlXVaultObject.prototype.getStatus = function() {
	// 0 - filelist is empty
	// 1 - all files in filelist uploaded
	//-1 - not all files uploaded
	var t = 0;
	for (var a in this.file_data) {
		if (this.file_data[a].state != "uploaded") return -1;
		t = 1;
	}
	return t;
};

dhtmlXVaultObject.prototype.getData = function() {
	// return struct of uploaded files
	var t = [];
	for (var a in this.conf.uploaded_files) {
		t.push({
			id: a,
			name: this.file_data[a].name,
			size: this.file_data[a].size,
			serverName: this.conf.uploaded_files[a].serverName,
			uploaded: true,
			error: false
		});
	}
	return t;
};

dhtmlXVaultObject.prototype.clear = function() {
	if (this.callEvent("onBeforeClear", []) !== true) return;
	if (this.conf.uploading) this._uploadStop();
	this._switchButton(false);
	this._removeFilesByState(true);
	this.callEvent("onClear",[]);
};

dhtmlXVaultObject.prototype.setSkin = function(skin) {
	if (skin != this.conf.skin) {
		this.base.className = String(this.base.className).replace(new RegExp("\s{0,}dhx_vault_"+this.conf.skin)," dhx_vault_"+skin);
		this.conf.skin = skin;
	}
	
	// update buttons data
	this._updateBttonsSkin();
	
	
	var ofs = this.conf.ofs[this.conf.skin];
	
	this.buttons.browse.style.marginLeft = ofs+"px";
	this.buttons.upload.style.marginLeft = (skin=="dhx_terrace"?"-1px":ofs+"px");
	this.buttons.cancel.style.marginLeft = this.buttons.upload.style.marginLeft;
	this.buttons.clear.style.marginRight = ofs+"px";
	
	// border-radius
	var r = "";
	if (skin == "dhx_terrace") {
		r = (this.conf.buttons.upload == true) ? "0px":"3px";
	}
	
	this.buttons.browse.style.borderTopRightRadius = r;
	this.buttons.browse.style.borderBottomRightRadius = r;
	this.buttons.upload.style.borderTopLeftRadius = r;
	this.buttons.upload.style.borderBottomLeftRadius = r;
	this.buttons.cancel.style.borderTopLeftRadius = this.buttons.upload.style.borderTopLeftRadius;
	this.buttons.cancel.style.borderBottomLeftRadius = this.buttons.upload.style.borderBottomLeftRadius;
	
	this.setSizes();
};

dhtmlXVaultObject.prototype._updateBttonsSkin = function() {
	for (var a in this.buttons) {
		var css = "dhx_vault_button";
		var css_p = "";
		if (this.buttonCss != null && this.buttonCss[this.conf.skin] != null && this.buttonCss[this.conf.skin][a] != null) {
			css_p = this.buttonCss[this.conf.skin][a];
			css += css_p;
		}
		this.buttons[a]._css = this.buttons[a].className = css;
		this.buttons[a]._css_p = css_p;
	}
};

dhtmlXVaultObject.prototype.setSizes = function() {
	
	var w1 = this.base.offsetWidth-(this.base.clientWidth||this.base.scrollWidth);
	var h1 = this.base.offsetHeight-this.base.clientHeight;
	
	this.base.style.width = Math.max(0, this.base.parentNode.clientWidth-w1)+"px";
	this.base.style.height = Math.max(0, this.base.parentNode.clientHeight-h1)+"px";
	
	var ofs = this.conf.ofs[this.conf.skin];
	this.p_files.style.top = this.p_controls.offsetHeight+"px";
	this.p_files.style.left = ofs+"px";
	if (!this.conf.ofs_f) {
		this.p_files.style.width = "100px";
		this.p_files.style.height = "100px";
		this.conf.ofs_f = {
			w: this.p_files.offsetWidth-this.p_files.clientWidth,
			h: this.p_files.offsetHeight-this.p_files.clientHeight
		};
	}
	
	this.p_files.style.width = Math.max(this.base.clientWidth-ofs*2-this.conf.ofs_f.w,0)+"px";
	this.p_files.style.height = Math.max(this.base.clientHeight-this.p_controls.offsetHeight-ofs-this.conf.ofs_f.h,0)+"px";
	
	if (typeof(this.callEvent) == "function") {
		// dataload progress
		this.callEvent("_onSetSizes", []);
	}
	
};

dhtmlXVaultObject.prototype.getFileExtension = function(name) {
	var ext = "";
	var k = String(name).match(/\.([^\.\s]*)$/i); // "filename.jpg" -> [".jpg","jpg"]
	if (k != null) ext = k[1];
	return ext;
};

dhtmlXVaultObject.prototype.strings = {
	// labels
	done: "Done",
	error: "Error",
	// buttons
	btnAdd: "Add files",
	btnUpload: "Upload",
	btnClean: "Clear all",
	btnCancel: "Cancel"
};

dhtmlXVaultObject.prototype.setStrings = function(data) {
	for (var a in data) this.strings[a] = data[a];
	// update files in list
	for (var a in this.file_data) {
		var state = this.file_data[a].state;
		if (state == "uploaded" || state == "fail") {
			this.list.updateFileState(a, {
				state: state,
				str_error: this.strings.error,
				str_done: this.strings.done
			});
		}
	}
	// update buttons
	var t = {browse: "btnAdd", upload: "btnUpload", clear: "btnClean", cancel: "btnCancel"};
	for (var a in t) this.buttons[a].childNodes[1].innerHTML = this.strings[t[a]];
	
};

dhtmlXVaultObject.prototype.getMaxFileSize = function() {
	return this.conf.max_file_size;
};

/****************************************************************************************************************************************************************************************************************/
//	HTML 5

dhtmlXVaultObject.prototype.html5 = function(){};
dhtmlXVaultObject.prototype.html5.prototype = {
	
	_initEngine: function() {
		
		var that = this;
		this.buttons["browse"].onclick = function(){
			if (that.conf.enabled) that.f.click();
		}
		
		this.conf.progress_type = "percentage";
		this.conf.dnd_enabled = true;
		
		// Safari on Windows sometimes have problem with multiple file selections
		// file length set to zero, do not allow multiple file selecting
		// d-n-d seems works fine
		
		var k = window.navigator.userAgent;
		var mp = true;
		if (k.match(/Windows/gi) != null && k.match(/AppleWebKit/gi) != null && k.match(/Safari/gi) != null) {
			if (k.match(/Version\/5\.1\.5/gi)) this.conf.multiple_files = false;
			if (k.match(/Version\/5\.1[^\.\d{1,}]/gi)) this.conf.dnd_enabled = false;
			if (k.match(/Version\/5\.1\.1/gi)) {
				this.conf.multiple_files = false;
				this.conf.dnd_enabled = false;
			}
			if (k.match(/Version\/5\.1\.2/gi)) this.conf.dnd_enabled = false;
			if (k.match(/Version\/5\.1\.7/gi)) this.conf.multiple_files = false;
		}
		
		// "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8"	// ok, no dnd
		// "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5"	// ok, no dnd
		// "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4"	// ok, no dnd
		// "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27"	// ok, no dnd
		// "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"	// ok, no dnd
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50"				// ok, dnd partialy fail, disabled
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22"			// multiple files add - fail, dnd partialy fail, disabled
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7"			// ok, dnd partialy fail, disabled
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.54.16 (KHTML, like Gecko) Version/5.1.4 Safari/534.54.16"			// ok
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3"			// multiple files add - fail
		// "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"			// dnd - ok, multiselect - fail (Windows 8)
		
		// input
		this._addFileInput();
		
		// FF, Opera, Chrome, IE10, IE11
		if (this.conf.dnd_enabled && this._initDND != null) this._initDND();
		
	},
	
	_addFileInput: function() {
		
		// complete input reload, opera needs
		if (this.f != null) {
			this.f.onchange = null;
			this.f.parentNode.removeChild(this.f);
			this.f = null;
		}
		
		var that = this;
		
		this.f = document.createElement("INPUT");
		this.f.type = "file";
		
		if (this.conf.multiple_files) this.f.multiple = "1";
		this.f.className = "dhx_vault_input";
		this.p_controls.appendChild(this.f);
		
		this.f.onchange = function() {
			that._parseFilesInInput(this.files);
			if (window.dhx4.isOpera) that._addFileInput(); else this.value = "";
		}
	},
	
	_doUploadFile: function(id) {
		
		if (this.file_data[id].custom == true) {
			this._cfUploadStart(id);
			return;
		}
		
		var that = this;
		
		if (!this.loader) {
			
			this.loader = new XMLHttpRequest();
			this.loader.upload.onprogress = function(e) {
				if (that.file_data[this._idd].state == "uploading") that._updateFileInList(this._idd, "uploading", Math.round(e.loaded*100/e.total));
			}
			this.loader.onload = function(e) {
				try {eval("dhx4.temp="+this.responseText);} catch(e){};
				var r = dhx4.temp;
				dhx4.temp = null;
				
				if (r != null && typeof(r) == "object" && typeof(r.state) != "undefined" && r.state == true) {
					that._onUploadSuccess(this.upload._idd, r.name, null, r.extra);
				} else {
					that._onUploadFail(this.upload._idd, (r!=null&&r.extra!=null?r.extra:null));
				}
				r = null;
			}
			this.loader.onerror = function(e) {
				that._onUploadFail(this.upload._idd);
			}
			this.loader.onabort = function(e) {
				that._onUploadAbort(this.upload._idd);
			}
		}
		
		this.loader.upload._idd = id;
		
		var form = new FormData();
		form.append("mode", "html5");
		
		if (this.file_data[id].size == 0 && (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Trident") > 0)) { // IE10, IE11 - zero_size file issue, upload filename only
			form.append("file_name", String(this.file_data[id].name));
			form.append("zero_size", "1");
		} else {
			form.append(this.conf.param_name, this.file_data[id].file);
		}
		
		if (window.dhx4.ajax.cache != true) form.append("dhxr"+new Date().getTime(), "");
		
		this.loader.open("POST", this.conf.url, true);
		this.loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		this.loader.send(form);
		
	},
	
	_uploadStop: function() {
		if (!this.conf.uploading) return;
		if (this.cf_loader_id != null) {
			this._cfUploadStop();
		} else if (this.loader != null) {
			this.loader.abort();
		}
	},
	
	_parseFilesInInput: function(f) {
		for (var q=0; q<f.length; q++) this._addFileToQueue(f[q]);
	},
	
	_addFileToQueue: function(f) {
		if (!this._beforeAddFileToList(f.name, f.size, f.lastModifiedDate)) return; // html5 mode, f.lastModifiedDate works in Chrome/Opera/Safari/FF/IE11
		var id = (f._idd||window.dhx4.newId());
		this.file_data[id] = {file: f, name: f.name, size: f.size, state: "added"};
		this._addFileToList(id, f.name, f.size, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) this._uploadStart(true);
	},
	
	_removeFileFromQueue: function(id) {
		
		if (!this.file_data[id]) return;
		
		var name = this.file_data[id].name;
		var serverName = (this.conf.uploaded_files!=null&&this.conf.uploaded_files[id]!=null?this.conf.uploaded_files[id].serverName:null);
		
		var fileData = {
			id: Number(id),
			name: name,
			size: this.file_data[id].size,
			serverName: serverName,
			uploaded: (this.file_data[id].state == "uploaded"),
			error: (this.file_data[id].state == "fail")
		};
		if (this.callEvent("onBeforeFileRemove",[fileData]) !== true) return;
		
		var k = false;
		if (this.cf_loader_id != null || (this.conf.uploading && this.loader != null && id == this.loader.upload._idd && this.file_data[id].state == "uploading")) {
			this._uploadStop();
			k = true;
		}
		
		this.file_data[id].file = null;
		this.file_data[id].name = null;
		this.file_data[id].size = null;
		this.file_data[id].state = null;
		this.file_data[id] = null;
		delete this.file_data[id];
		
		this._removeFileFromList(id);
		
		this.callEvent("onFileRemove",[fileData]);
		
		if (k) this._uploadStart();

	},
	
	_unloadEngine: function() {
		
		this.buttons["browse"].onclick = null;
		
		if (this.conf.dnd_enabled && this._unloadDND != null) this._unloadDND();
		
		this.f.onchange = null;
		this.f.parentNode.removeChild(this.f);
		this.f = null;
		
		if (this.loader) {
			this.loader.upload.onprogress = null;
			this.loader.onload = null;
			this.loader.onerror = null;
			this.loader.onabort = null;
			this.loader.upload._idd = null;
			this.loader = null;
		}
		
		this._initEngine = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._parseFilesInInput = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._unloadEngine = null;
		
	}
	
};

/****************************************************************************************************************************************************************************************************************/
//	HTML 4

dhtmlXVaultObject.prototype.html4 = function(){};
dhtmlXVaultObject.prototype.html4.prototype = {
	
	_initEngine: function() {
		
		this._addForm();
		this.conf.progress_type = "loader";
		if (window.dhx4.isIE6||window.dhx4.isIE7) this.buttons.browse.style.filter = "";
	},
	
	_addForm: function() {
		
		var that = this;
		
		if (!this.k) {
			
			this.k = document.createElement("DIV");
			this.k.className = "dhx_vault_file_form_cont";
			this.buttons["browse"].appendChild(this.k);
			
			this.conf.fr_name = "dhx_vault_file_"+window.dhx4.newId();
			this.k.innerHTML = '<iframe name="'+this.conf.fr_name+'" style="height:0px;width:0px;" frameBorder="0"></iframe>';
			
			this.fr = this.k.firstChild;
			
			if (window.navigator.userAgent.indexOf("MSIE") >= 0) {
				this.fr.onreadystatechange = function() {
					if (this.readyState == "complete") that._onLoad();
				}
			} else {
				this.fr.onload = function() {
					that._onLoad();
				}
			}
			
		}
		
		var f = document.createElement("DIV");
		f.innerHTML = "<form method='POST' enctype='multipart/form-data' target='"+this.conf.fr_name+"' class='dhx_vault_file_form' name='dhx_vault_file_form_"+window.dhx4.newId()+"'>"+
				"<input type='hidden' name='mode' value='html4'>"+
				"<input type='hidden' name='uid' value=''>"+
				"<input type='file' name='"+this.conf.param_name+"' class='dhx_vault_file_input'>"+
				"</form>";
		this.k.appendChild(f);
		
		f.firstChild.lastChild.onchange = function() {
			
			var name = this.value.match(/[^\/\\]*$/)[0];
			
			this.previousSibling.value = this._idd = window.dhx4.newId();
			//
			var lastModifiedDate = null; // html4 mode, works in IE10/IE11/FF/Chrome/Opera/Safari
			var size = null;
			if (this.files != null && this.files[0] != null) {
				lastModifiedDate = this.files[0].lastModifiedDate||null;
				size = this.files[0].size||null;
			}
			//
			if (!that._beforeAddFileToList(name, size, lastModifiedDate)) return;
			that._addFileToQueue(this);
			this.onchange = null;
			this.parentNode.parentNode.style.display = "none";
			that._addForm();
		}
		
		f = null;
	},
	
	_onLoad: function() {
		
		if (this.conf.uploading && this.fr._idd != null) {
			try {eval("dhx4.temp="+this.fr.contentWindow.document.body.innerHTML);} catch(e){};
			var r = dhx4.temp;
			dhx4.temp = null;
			if (r != null) {
				if (typeof(r.state) != "undefined") {
					if (r.state == "cancelled") {
						this._onUploadAbort(this.fr._idd);
						this.fr.contentWindow.document.body.innerHTML = "";
						r = null;
						return;
					} else if (r.state == true) {
						if (typeof(r.size) != "undefined" && !isNaN(r.size)) this.file_data[this.fr._idd].size = r.size;
						this._onUploadSuccess(this.fr._idd, r.name, null, r.extra);
						r = null;
						return;
					}
				}
			}
			this._onUploadFail(this.fr._idd, (r!=null && r.extra != null ? r.extra:null));
		}
		
	},
	
	_addFileToQueue: function(t) {
		var v = t.value.match(/[^\\\/]*$/);
		if (v[0] != null) v = v[0]; else v = t.value;
		//
		var lastModifiedDate = null;
		var size = null;
		if (t.files != null && t.files[0] != null) {
			lastModifiedDate = t.files[0].lastModifiedDate||null;
			size = t.files[0].size||null;
		}
		//
		this.file_data[t._idd] = { file: {lastModifiedDate:lastModifiedDate}, name: v, size: size, form: t.parentNode, node: t.parentNode.parentNode, input: t, state: "added"};
		
		this._addFileToList(t._idd, v, (size||false), "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) this._uploadStart(true);
	},
	
	_removeFileFromQueue: function(id) {
		
		var name = this.file_data[id].name;
		var serverName = (this.conf.uploaded_files!=null&&this.conf.uploaded_files[id]!=null?this.conf.uploaded_files[id].serverName:null);
		
		var fileData = {
			id: Number(id),
			name: name,
			size: this.file_data[id].size||null,
			serverName: serverName,
			uploaded: (this.file_data[id].state == "uploaded"),
			error: (this.file_data[id].state == "fail")
		};
		
		if (this.callEvent("onBeforeFileRemove",[fileData]) !== true) return;
		
		var k = false;
		if (this.file_data[id].custom == true) {
			if (this.cf_loader_id != null) {
				this._uploadStop();
				k = true;
			}
		} else {
			this.file_data[id].input.onchange = null;
			this.file_data[id].form.removeChild(this.file_data[id].input);
			this.file_data[id].node.removeChild(this.file_data[id].form);
			this.file_data[id].node.parentNode.removeChild(this.file_data[id].node);
			this.file_data[id].input = null;
			this.file_data[id].form = null;
			this.file_data[id].node = null;
		}
		
		this.file_data[id].name = null;
		this.file_data[id].size = null;
		this.file_data[id].state = null;
		this.file_data[id] = null;
		delete this.file_data[id];
		
		this._removeFileFromList(id);
		
		this.callEvent("onFileRemove",[fileData]);
		
		if (k) this._uploadStart();
	},
	
	_doUploadFile: function(id) {
		if (this.file_data[id].custom == true) {
			this._cfUploadStart(id);
		} else {
			this.fr._idd = id;
			this.file_data[id].form.action = this.conf.url;
			this.file_data[id].form.submit();
		}
	},
	
	_uploadStop: function() {
		if (!this.conf.uploading) return;
		if (this.cf_loader_id == null) {
			this._onUploadAbort(this.fr._idd);
			this.fr.contentWindow.location.href = (this.conf.url)+(this.conf.url.indexOf("?")<0?"?":"&")+"mode=html4&action=cancel&dhxr"+new Date().getTime();
		} else {
			this._cfUploadStop();
		}
	},
	
	_unloadEngine: function() {
		
		if (this.k) {
			
			this.conf.fr_name = null;
			this.fr.onreadystatechange = null;
			this.fr.onload = null;
			this.fr.parentNode.removeChild(this.fr);
			this.fr = null;
			
			// remove empty form
			this.k.firstChild.firstChild.lastChild.onchange = null;
			
			this.k.parentNode.removeChild(this.k);
			this.k = null;
			
		}
		
		this._initEngine = null;
		this._addForm = null;
		this._onLoad = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null;
		
	}
	
};

/****************************************************************************************************************************************************************************************************************/
//	FLASH

dhtmlXVaultObject.prototype.flash = function(){};
dhtmlXVaultObject.prototype.flash.prototype = {
	
	_initEngine: function() {
		
		if (!window.dhtmlXVaultSWFObjects) {
			window.dhtmlXVaultSWFObjects = {
				items: {},
				callEvent: function(id, name, params) {
					return window.dhtmlXVaultSWFObjects.items[id].uploader[name].apply(window.dhtmlXVaultSWFObjects.items[id].uploader,params);
				}
			};
		}
		
		var wmode = (window.dhx4.isIE6||window.dhx4.isIE7||navigator.userAgent.indexOf("MSIE 7.0")>=0?"opaque":"transparent");
		wnome = "transparent";
		
		this.conf.swf_obj_id = "dhxVaultSWFObject_"+window.dhx4.newId();
		this.conf.swf_file = this.conf.swf_file+(this.conf.swf_file.indexOf("?")>=0?"&":"?")+"dhxr"+new Date().getTime();
		if (window.dhx4.isIE) {
			// special for IE
			this.buttons.browse.innerHTML += "<div style='position:absolute;width:100%;height:100%;background-color:white;opacity:0;filter:alpha(opacity=0);left:0px;top:0px;'></div>";
			// IE6/IE7 gradient fix
			if (window.dhx4.isIE6 || window.dhx4.isIE7) this.buttons.browse.style.filter = "";
		}
		this.buttons.browse.innerHTML += "<div class='dhx_vault_flash_obj'><div id='"+this.conf.swf_obj_id+"'></div></div>";
		swfobject.embedSWF(this.conf.swf_file, this.conf.swf_obj_id, "100%", "100%", "9", null, {ID:this.conf.swf_obj_id,enableLogs:this.conf.swf_logs,GVar:"dhtmlXVaultSWFObjects",paramName:this.conf.param_name,multiple:(this.conf.multiple_files?"Y":"")}, {wmode:wmode});
		
		// IE6/IE7 gradient fix in a window
		if ((window.dhx4.isIE6 || window.dhx4.isIE7) && this.conf.skin == "dhx_skyblue") {
			if (this.base.parentNode != null && this.base.parentNode.parentNode != null && this.base.parentNode.parentNode.className != null && this.base.parentNode.parentNode.className == "dhx_cell_wins") {
				this.base.parentNode.parentNode.style.filter = "none";
			}
		}
		
		var v = swfobject.getFlashPlayerVersion();
		
		this.conf.progress_type = "percentage";
		
		window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id] = {id: this.conf.swf_obj_id, uploader: this};
	},
	
	_beforeAddFileToQueue: function(name, size, lastModifiedDate) {
		return (this.callEvent("onBeforeFileAdd", [{
			id: null,
			name: name,
			size: size,
			lastModifiedDate: lastModifiedDate,
			serverName: null,
			uploaded: false,
			error: false
		}])===true?1:0);
	},
	
	_addFileToQueue: function(id, name, size, lastModifiedDate) {
		if (window.dhx4.isIE) {
			// focus+hide fix for IE
			var k = document.createElement("INPUT");
			k.type = "TEXT";
			k.style.position = "absolute";
			k.style.left = "0px";
			k.style.top = window.dhx4.absTop(this.buttons["browse"])+"px";
			k.style.width = "10px";
			document.body.appendChild(k);
			k.focus();
			document.body.removeChild(k);
			k = null;
		}
		this.file_data[id] = {file: {lastModifiedDate:lastModifiedDate}, name: name, size: size, state: "added"};
		this._addFileToList(id, name, size, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) this._uploadStart(true);
	},
	
	_removeFileFromQueue: function(id) {
		
		if (!this.file_data[id]) return;
		
		var name = this.file_data[id].name;
		var serverName = (this.conf.uploaded_files!=null&&this.conf.uploaded_files[id]!=null?this.conf.uploaded_files[id].serverName:null);
		
		var fileData = {
			id: Number(id),
			name: name,
			size: this.file_data[id].size,
			serverName: serverName,
			uploaded: (this.file_data[id].state == "uploaded"),
			error: (this.file_data[id].state == "fail")
		};
		if (this.callEvent("onBeforeFileRemove",[fileData]) !== true) return;
		
		var k = false;
		if (this.conf.uploading && this.file_data[id].state == "uploading") {
			this._uploadStop();
			k = true;
		}
		
		swfobject.getObjectById(this.conf.swf_obj_id).removeFileById(id);
		
		this.file_data[id].name = null;
		this.file_data[id].size = null;
		this.file_data[id].state = null;
		this.file_data[id] = null;
		delete this.file_data[id];
		
		this._removeFileFromList(id);
		
		this.callEvent("onFileRemove",[fileData]);
		
		if (k) this._uploadStart();
		
	},
	
	_doUploadFile: function(id) {
		if (this.file_data[id].custom == true) {
			this._cfUploadStart(id);
		} else {
			swfobject.getObjectById(this.conf.swf_obj_id).upload(id, this.conf.swf_url);
		}
	},
	
	_uploadStop: function(id) {
		if (this.cf_loader_id != null) {
			this._cfUploadStop();
		} else {
			for (var a in this.file_data) if (this.file_data[a].state == "uploading") swfobject.getObjectById(this.conf.swf_obj_id).uploadStop(a);
		}
	},
	
	_getId: function() {
		return window.dhx4.newId();
	},
	
	_unloadEngine: function() {
		
		// remove instance from global storage
		
		if (window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id]) {
			window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id].id = null;
			window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id].uploader = null;
			window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id] = null
			delete window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id];
		}
		
		this.conf.swf_obj_id = null;
		
		this._initEngine = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null;
	}
	
};

dhtmlXVaultObject.prototype.setSWFURL = function(swf_url) {
	this.conf.swf_url = swf_url;
};

/****************************************************************************************************************************************************************************************************************/
//	SILVERLIGHT

dhtmlXVaultObject.prototype.sl = function(){};
dhtmlXVaultObject.prototype.sl.prototype = {
	
	_initEngine: function() {
		
		if (typeof(this.conf.sl_v) == "undefined") this.conf.sl_v = this.getSLVersion();
		
		if (!window.dhtmlXVaultSLObjects) {
			window.dhtmlXVaultSLObjects = {
				items: {},
				callEvent: function(id, name, params) {
					window.dhtmlXVaultSLObjects.items[id].uploader[name].apply(window.dhtmlXVaultSLObjects.items[id].uploader,params);
				}
			};
		}
		
		//var that = this;
		
		this.conf.sl_obj_id = "dhtmlXFileUploaderSLObject_"+window.dhx4.newId();
		
		if (this.conf.sl_v != false) {
			this.buttons["browse"].innerHTML += '<div style="width:100%;height:100%;left:0px;top:0px;position:absolute;">'+
									'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="'+this.conf.sl_obj_id+'">'+
										'<param name="source" value="'+this.conf.sl_xap+'"/>'+
										'<param name="background" value="Transparent"/>'+
										'<param name="windowless" value="true"/>'+
										'<param name="initParams" value="SLID='+this.conf.sl_obj_id+',LOGS='+this.conf.sl_logs+',GVAR=dhtmlXVaultSLObjects"/>'+
										'<param name="minRuntimeVersion" value="5.0"/>'+
									'</object>'+
								'</div>';
		} else {
			this.buttons["browse"].style.cursor = "wait";
			this.buttons["browse"].title = "";
		}
		
		this.conf.progress_type = "percentage";
		
		window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = {id: this.conf.sl_obj_id, uploader: this};
	},
	
	_addFileToQueue: function(id, name, size) {
		this.file_data[id] = {name: name, size: size, state: "added", file: {lastModifiedDate: null}};
		this._addFileToList(id, name, size, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) this._uploadStart(true);
	},
	
	_removeFileFromQueue: function(id) {
		if (!this.file_data[id]) return;
		
		var k = false;
		if (this.conf.uploading && this.file_data[id].state == "uploading") {
			this._uploadStop();
			k = true;
		}
		
		document.getElementById([this.conf.sl_obj_id]).Content.a.removeFileById(id);
		
		this.file_data[id].name = null;
		this.file_data[id].size = null;
		this.file_data[id].state = null;
		this.file_data[id].file = null;
		this.file_data[id] = null;
		delete this.file_data[id];
		
		this._removeFileFromList(id);
		
		if (k) this._uploadStart();
		
	},
	
	_doUploadFile: function(id) {
		document.getElementById(this.conf.sl_obj_id).Content.a.upload(id, this.conf.sl_url, "&mode=sl&dhxr"+new Date().getTime()); // leading "&" required!
	},
	
	_uploadStop: function(id) {
		this.conf.uploading = false;
		for (var a in this.file_data) if (this.file_data[a].state == "uploading") document.getElementById(this.conf.sl_obj_id).Content.a.uploadStop(a);
	},
	
	_unloadEngine: function() {
		
		// remove instance from global storage
		
		if (window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id]) {
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].id = null;
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].uploader = null;
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = null
			delete window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id];
		}
		
		this.conf.sl_obj_id = null;
		
		this._initEngine = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null;
	}
	
};

dhtmlXVaultObject.prototype.setSLURL = function(url) {
	this.conf.sl_url = url;
};

dhtmlXVaultObject.prototype.getSLVersion = function() {
	var v = false;
	if (window.dhx4.isIE) {
		try {
			var t = new ActiveXObject('AgControl.AgControl');
			if (t != null) {
				// loop through [4-x, 0-9] until supported
				var k1 = 4, k2 = 0;
				while (t.isVersionSupported([k1,k2].join("."))) {
					v = [k1,k2];
					if (++k2 > 9) { k1++; k2=0; }
				}
			}
			t = null;
		} catch(e) {};
	} else {
		if (navigator.plugins["Silverlight Plug-In"] != null) {
			v = navigator.plugins["Silverlight Plug-In"].description.split(".");
		}
	}
	return v;
};

/****************************************************************************************************************************************************************************************************************/
// DEFAULT FILES VIEW

dhtmlXVaultObject.prototype.list_default = function() {
	
	this.t = {};
	
	this.addFileItem = function(id, fileList) {
		
		var item = document.createElement("DIV");
		item._idd = id;
		fileList.appendChild(item);
		
		this.t[id] = item;
		
		item = fileList = null;
	}
	
	this.isFileItemExist = function(id) {
		return (this.t[id] != null);
	}
	
	this.renderFileRecord = function(id, data) {
		
		var item = this.t[id];
		if (!item == null) return;
		
		item.className = "dhx_vault_file dhx_vault_file_"+data.state;
		item.innerHTML = "<div class='dhx_vault_file_param dhx_vault_file_name'>&nbsp;</div>"+
				"<div class='dhx_vault_file_param dhx_vault_file_progress'>&nbsp;</div>"+
				"<div class='dhx_vault_file_param dhx_vault_file_delete'>&nbsp;</div>"+
				"<div class='dhx_vault_file_icon dhx_vault_"+data.icon+"'><div class='dhx_vault_all_icons'></div></div>";
		
		item.childNodes[2]._action = {id: id, data: "delete_file"};
		
		this.updateFileNameSize(id, data);
		
		item = null;
	}
	
	this.removeFileRecord = function(id) {
		
		var item = this.t[id];
		if (item == null) return;
		
		item._idd = null;
		item.childNodes[2]._action = null;
		item.parentNode.removeChild(item);
		item = null;
		
		this.t[id] = null;
		delete this.t[id];
		
	}
	
	this.updateFileNameSize = function(id, data) {
		
		var item = this.t[id];
		if (item == null) return;
		
		item.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>"+data.name+(!isNaN(data.size) && data.size !== false ? " ("+data.readableSize+")":"&nbsp;")+"</div>";
		item.childNodes[0].title = data.name+(!isNaN(data.size) && data.size !== false ? " ("+data.readableSize+")" : "");
		
		item = null;
		
	}
	
	this.updateFileState = function(id, data) {
		
		var item = this.t[id];
		if (item == null) return;
		
		var k = false;
		if (this.updateFileStateExtra != null) k = this.updateFileStateExtra(id, data);
		
		if (!k) {
			if (data.state == "added") {
				
				item.className = "dhx_vault_file dhx_vault_file_added";
				item.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				item.childNodes[1].innerHTML = "&nbsp;";
			}
			
			if (data.state == "fail") {
				item.className = "dhx_vault_file dhx_vault_file_fail";
				item.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				item.childNodes[1].innerHTML = data.str_error;
			}
			
			if (data.state == "uploaded") {
				item.className = "dhx_vault_file dhx_vault_file_uploaded";
				item.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				item.childNodes[1].innerHTML = data.str_done;
			}
			
			if (data.state == "uploading_html4" || data.state == "uploading") {
				// gif
				item.className = "dhx_vault_file dhx_vault_file_uploading";
				item.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_uploading";
				item.childNodes[1].innerHTML = "<div class='dhx_vault_progress'><div class='dhx_vault_progress_loader'>&nbsp;</div></div>";
			}
			
		}
		
		item = null;
	}
	
	this.updateStrings = function() {
		
	}
	
	this.unload = function() {
		this.t = null;
	}
	
};

// attach to container
if (typeof(window.dhtmlXCellObject) != "undefined" && typeof(dhtmlXCellObject.prototype.attachVault) == "undefined") {

	dhtmlXCellObject.prototype.attachVault = function(conf) {
		
		var obj = document.createElement("DIV");
		obj.style.position = "relative";
		obj.style.width = "100%";
		obj.style.height = "100%";
		obj.style.overflow = "hidden";
		this._attachObject(obj);
		
		obj._attach_mode = true;
		obj._no_border = true;
		
		// keep borders for windows
		if (typeof(window.dhtmlXWindowsCell) != "undefined" && this instanceof dhtmlXWindowsCell) {
			obj._no_border = false;
		}
		
		if (typeof(conf) != "object" || conf == null) conf = {};
		conf.parent = obj;
		if (typeof(conf.skin) == "undefined") conf.skin = this.conf.skin;
		
		this.dataType = "vault";
		this.dataObj = new dhtmlXVaultObject(conf);
		
		// sometimes layout broke vault's dimension
		if (typeof(window.dhtmlXLayoutCell) != "undefined" && this instanceof dhtmlXLayoutCell) {
			this.layout._getMainInst().attachEvent("onExpand", function(ids){
				for (var q=0; q<ids.length; q++) {
					var cell = this.cells(ids[q]);
					if (cell.dataType == "vault" && cell.dataObj != null) cell.dataObj.setSizes();
					cell = null;
				}
			});
		}
		
		conf.parent = null;
		conf = obj = null;
		
		return this.dataObj;
	};
	
};

// bootstrap skin buttons
dhtmlXVaultObject.prototype.buttonCss = {
	bootstrap: {
		browse: "_browse",
		upload: "_upload",
		cancel: "_cancel",
		clear: "_clear"
	}
};

// attach to popup
if (typeof(window.dhtmlXPopup) != "undefined" && typeof(dhtmlXPopup.prototype.attachVault) == "undefined") {
	dhtmlXPopup.prototype.attachVault = function(width, height, conf) {
		return this._attachNode("vault", {width: width||350, height: height||200, conf:conf||{}});
	};
	dhtmlXPopup.prototype._attach_init_vault = function(data) {
		data.conf.parent = this._nodeId;
		document.getElementById(this._nodeId)._no_border = true;
		if (typeof(data.conf.skin) == "undefined") data.conf.skin = this.conf.skin;
		this._nodeObj = new dhtmlXVaultObject(data.conf);
	};
};

/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhtmlXVaultObject.prototype.load = function(url, callback) { // load list of early uploaded files from server
	
	if (this.conf.dataload_inited != true) {
		
		this.conf.dataload_inited = true;
		
		// check if not set - enable by the default
		if (typeof(this.conf.dataload_progress) == "undefined") this.conf.dataload_progress = true;
		
		// progress events
		this.attachEvent("onXLS", this._progressOn);
		this.attachEvent("onXLE", this._progressOff);
		
		// use common data loading functionality,
		// it will override current function after first call
		window.dhx4._enableDataLoading(this, "_initObj", "_xmlToObj", "files", {data:true});
		
		this.load.apply(this, arguments);
	}
	
};

dhtmlXVaultObject.prototype.addFileRecord = function(file, status) { // add custom file record to list
	
	if (status == null || {added: true, uploaded: true}[status] != true) return;
	
	var id = window.dhx4.newId();
	if (typeof(file.name) == "undefined" || file.name == null) file.name = "New File Record";
	if (typeof(file.size) == "undefined" || file.size == null) file.size = false; // not set
	
	this.file_data[id] = {file:{}};
	
	this._addFileToList(id, file.name, file.size, status, 0);
	
	if (status == "uploaded") {
		if (typeof(file.serverName) == "undefined" && file.serverName == null) file.serverName = file.name;
		this.conf.uploaded_files[id] = { realName: file.name, serverName: file.serverName };
	};
	
	this.file_data[id] = {
		name: file.name,
		size: file.size,
		state: status, // "added", "uploaded"
		file: {},
		custom: true,  // required for custom record
		fileData: file // will go to server
	};
	
	this.list.updateFileState(id, {state: status, str_done: this.strings.done});
	
	if (this.conf.auto_start && !this.conf.uploading) this._uploadStart(true);
};

// uploading
dhtmlXVaultObject.prototype._cfOnUpload = function() {
	
	if (this.cf_loader_id == null) return;
	var id = this.cf_loader_id;
	this.cf_loader_id = null;
	
	dhx4.temp = null;
	try {eval("dhx4.temp="+this.cf_loader.responseText);} catch(e){};
	var r = dhx4.temp;
	dhx4.temp = null;
	
	try {
		this.cf_loader.onreadystatechange = null;
		this.cf_loader = null;
	} catch(e){};
	
	try {
		delete this.cf_loader.onreadystatechange;
		delete this.cf_loader;
	} catch(e){};
	
	if (r != null && typeof(r) == "object" && typeof(r.state) != "undefined" && r.state == true) {
		if (this.file_data[id].custom == true && typeof(r.size) != "undefined") this._cfUpdateSize(id, r.size);
		this._onUploadSuccess(id, r.name, undefined, r.extra);
	} else {
		this._onUploadFail(id, (r!=null&&r.extra!=null?r.extra:null));
	}
	
	r = null;
	
};

dhtmlXVaultObject.prototype._cfUpdateSize = function(id, size) {
	
	this.file_data[id].size = size;
	var nameSizeData = {
		name: this.file_data[id].name,
		size: this.file_data[id].size,
		readableSize: this._readableSize(this.file_data[id].size||0)
	};
	var t = this;
	window.setTimeout(function(){
		t.list.updateFileNameSize(id, nameSizeData);
		t = nameSizeData = null;
	},100);
	
};

dhtmlXVaultObject.prototype._cfUploadStart = function(id) {
	
	var postData = ["mode=custom"];
	for (var a in this.file_data[id].fileData) postData.push(encodeURIComponent(a)+"="+encodeURIComponent(this.file_data[id].fileData[a]));
	postData = postData.join("&");
	
	var that = this;
	
	this.cf_loader = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
	this.cf_loader.onreadystatechange = function() {
		if (that.cf_loader.readyState == 4) {
			if (that.cf_loader.status == 200) {
				that._cfOnUpload();
			} else if (that.cf_loader.status == 404) {
				that._onUploadFail(that.cf_loader_id);
			}
			that = null;
		}
	}
	
	if (window.dhx4.ajax.cache != true) postData += (postData.length>0?"&":"")+"dhxr"+new Date().getTime();
	
	this.cf_loader_id = id;
	
	this.cf_loader.open("POST", this.conf.url, true);
	this.cf_loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	this.cf_loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	this.cf_loader.send(postData);
	
};

dhtmlXVaultObject.prototype._cfUploadStop = function() {
	var id = this.cf_loader_id;
	this.cf_loader_id = null;
	this.cf_loader.abort();
	this._onUploadAbort(id);
};

// data loading
dhtmlXVaultObject.prototype._initObj = function(data) {
	for (var q=0; q<data.length; q++) this.addFileRecord(data[q], "uploaded");
};


dhtmlXVaultObject.prototype._xmlToObj = function(doc) {
	
	var f = [];
	
	if (!this.conf.xml_attrs) this.conf.xml_attrs = {name: "name", size: "size", serverName: "serverName"}; // xml_name:json_name
	
	var t = doc.getElementsByTagName("files")[0];
	for (var q=0; q<t.childNodes.length; q++) {
		if (t.childNodes[q].tagName != null && String(t.childNodes[q].tagName).toLowerCase() == "file") {
			var i = t.childNodes[q];
			var r = {};
			for (var a in this.conf.xml_attrs) {
				if (i.getAttribute(a) != null) {
					r[this.conf.xml_attrs[a]] = i.getAttribute(a);
				}
			}
			f.push(r);
			i = r = null;
		}
	}
	
	return f;
};

// progress
dhtmlXVaultObject.prototype._progressOn = function() {
	
	if (this.conf.dataload_progress == true) {
		
		if (this.conf.progress_tm != null) window.clearTimeout(this.conf.progress_tm);
		
		if (this.p_progress == null) {
		
			this.p_progress = document.createElement("DIV");
			this.p_progress.className = "dhx_vault_f_pr";
			this.base.appendChild(this.p_progress);
			
			// set sizes event
			if (typeof(this.conf.progress_event) == "undefined") this.conf.progress_event = this.attachEvent("_onSetSizes", this._progressAdjust);
			
			this._progressAdjust();
		}
		
	}
};

dhtmlXVaultObject.prototype._progressOff = function() {
	var t = this;
	if (this.conf.progress_tm != null) window.clearTimeout(this.conf.progress_tm);
	this.conf.progress_tm = window.setTimeout(function(){
		if (t.p_progress != null) {
			t.p_progress.parentNode.removeChild(t.p_progress);
			t.p_progress = null;
		};
		t = null;
	}, 200);
};

dhtmlXVaultObject.prototype._progressAdjust = function() {
	if (this.p_progress != null) {
		this.p_progress.style.left = this.p_files.style.left;
		this.p_progress.style.top = this.p_files.style.top;
		this.p_progress.style.width = this.p_files.style.width;
		this.p_progress.style.height = this.p_files.style.height;
	}
};


/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhtmlXVaultObject.prototype._initDND = function() {
	
	var that = this;
	
	this.dnd = {};
	
	this._showDNDBox = function() {
		
		if (!this.conf.enabled) return;
		
		if (!this.dnd.box) {
			
			this.dnd.box = document.createElement("DIV");
			this.dnd.box.className = "dhx_vault_dnd_box";
			this.base.appendChild(this.dnd.box);
			this.p_files.className = "dhx_vault_files dhx_vault_dnd_box_over";
			this.dnd.box.style.top = this.p_files.style.top;
			this.dnd.box.style.left = this.p_files.style.left;
			this.dnd.box.style.width = this.p_files.offsetWidth-(this.dnd.box.offsetWidth-this.dnd.box.clientWidth)+"px";
			this.dnd.box.style.height = this.p_files.offsetHeight-(this.dnd.box.offsetHeight-this.dnd.box.clientHeight)+"px";
			this.dnd.box.innerHTML = "<div class='dhx_vault_dnd_box_text' style='margin-top:"+Math.round(this.dnd.box.offsetHeight/2-24)+"px;'>"+this.strings.dnd+"</div>";
			
			this.dnd.box.ondragenter = function(e){
				that.dnd.last_node = e.target;
				if (!e.dataTransfer) return;
				try {
					e.dataTransfer.effectAllowed = "copy";
					e.dataTransfer.dropEffect = "copy";
				} catch(er){};
				e.stopPropagation();
				e.preventDefault();
			}
			this.dnd.box.ondragover = function(e){
				that.dnd.last_node = e.target;
				if (!e.dataTransfer) return;
				e.stopPropagation();
				e.preventDefault();
			}
			this.dnd.box.ondrop = function(e) {
				if (!e.dataTransfer) return;
				try {
					e.dataTransfer.effectAllowed = "copy";
					e.dataTransfer.dropEffect = "copy";
				} catch(er){};
				e.stopPropagation();
				e.preventDefault();
				if (e.dataTransfer.files.length>0) {
					that._parseFilesInInput(e.dataTransfer.files);
				} else {
					that.callEvent("_onNodeDrop",[e.dataTransfer]);
				};
				that._hideDNDBox();
			}
			
		}
	}
	this._hideDNDBox = function() {
		if (this.dnd.box != null) {
			this.dnd.box.ondragenter = null;
			this.dnd.box.ondragover = null;
			this.dnd.box.ondrop = null;
			this.dnd.box.parentNode.removeChild(this.dnd.box);
			this.dnd.box = null;
			this.p_files.className = "dhx_vault_files";
			//
			this.dnd.last_node = null;
			
		}
	}
	this.dnd.last_node = null;
	
	this._doOnWinDragEnter = function(e) { // show box
		that.dnd.last_node = e.target;
		that._showDNDBox();
	}
	this._doOnWinDragLeave = function(e) { // hide box, out of window or esc key
		if (that.dnd.last_node == e.target) {
			window.setTimeout(function(){that._hideDNDBox();},1);  // timeout for IE dnd-artefacts
		};
	}
	
	window.addEventListener("dragenter", this._doOnWinDragEnter, false);
	window.addEventListener("dragleave", this._doOnWinDragLeave, false);
	
	// window.ondragover and window.drop => prevent to open file in a tab in case of incorrect dropping
	this._doOnWinDragOver = function(e) {
		if (!e.dataTransfer) return;
		try {
			e.dataTransfer.effectAllowed = "none";
			e.dataTransfer.dropEffect = "none";
		} catch(er){};
		e.stopPropagation();
		e.preventDefault();
	}
	this._doOnWinDrop = function(e) {
		if (!e.dataTransfer) return;
		e.stopPropagation();
		e.preventDefault();
		that._hideDNDBox();
	}
	
	window.addEventListener("dragover", this._doOnWinDragOver, false);
	window.addEventListener("drop", this._doOnWinDrop, false);
	
	this._unloadDND = function() {
		
		window.removeEventListener("dragenter", this._doOnWinDragEnter, false);
		window.removeEventListener("dragleave", this._doOnWinDragLeave, false);
		window.removeEventListener("dragover", this._doOnWinDragOver, false);
		window.removeEventListener("drop", this._doOnWinDrop, false);
		
		for (var a in this._dndNodesData) {
			if (this._dndNodesData[a].inst_id == this.conf.inst_id) {
				this.removeDraggableNode(this._dndNodesData[a].node);
			}
		}
		
		this._hideDNDBox();
		
		this._showDNDBox = null;
		this._hideDNDBox = null;
		this._doOnWinDragEnter = null;
		this._doOnWinDragLeave = null;
		this._doOnWinDragOver = null;
		this._doOnWinDrop = null;
		this._initDND = null;
		this._unloadDND = null;
		this.dnd = null;
		
		that = null;
	};
};

dhtmlXVaultObject.prototype.strings.dnd = "Drop files here";

// drag custom objects
dhtmlXVaultObject.prototype._dndNodesData = {};

dhtmlXVaultObject.prototype.addDraggableNode = function(node, data) {
	
	if (typeof(window.addEventListener) != "function") return;
	
	if (typeof(node) == "string") node = document.getElementById(node);
	
	if (typeof(node._dhxvault_dnd_id) != "undefined") { // already mapped, support multiple vaults to drop, 1 vault=>1 data
		node = null;
		return;
	}
	
	if (this.conf.inst_id == null) {
		this.conf.inst_id = window.dhx4.newId();
	}
	
	if (this._onNodeDragStart == null) {
		this._onNodeDragStart = function(e) {
			e = e||event;
			e.dataTransfer.setData("text", this._dhxvault_dnd_id);
		}
		this._onNodeDrop = function(dataTransfer) {
			var id = dataTransfer.getData("text");
			if (id != null && this._dndNodesData[id] != null) this.callEvent("onDrop", [this._dndNodesData[id].node, this._dndNodesData[id].data]);
		}
		this.attachEvent("_onNodeDrop", this._onNodeDrop);
	}
	
	var id = String(window.dhx4.newId()); // IE required string here
	node._dhxvault_dnd_id = id;
	this._dndNodesData[id] = {
		inst_id: this.conf.inst_id,
		node: node,
		data: data
	};
	
	node.addEventListener("dragstart", this._onNodeDragStart, false);
	node = null;
	
};

dhtmlXVaultObject.prototype.removeDraggableNode = function(node) {
	
	if (typeof(node) == "string") node = document.getElementById(node);
	
	if (typeof(node._dhxvault_dnd_id) == "undefined") { // not mapped
		node = null;
		return;
	}
	
	this._dndNodesData[node._dhxvault_dnd_id].node = null;
	this._dndNodesData[node._dhxvault_dnd_id].data = null;
	delete this._dndNodesData[node._dhxvault_dnd_id];
	delete node._dhxvault_dnd_id;
	
	node.removeEventListener("dragstart", this._onNodeDragStart);
	node = null;
	
};

/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhtmlXVaultObject.prototype.setProgressMode = function(mode) {
	this.conf.progress_mode = mode;
};

dhtmlXVaultObject.prototype.list_default.prototype.updateFileStateExtra = function(id, data) {
	
	var item = this.t[id];
	if (item == null) return;
	
	if (data.state == "uploading") {
		item.className = "dhx_vault_file dhx_vault_file_uploading";
		item.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
		item.childNodes[1].innerHTML = "<div class='dhx_vault_progress'><div class='dhx_vault_progress_bg' style='width:"+data.progress+"%;'>&nbsp;</div></div>"+
						(data.eta!=null?"<span class='progress_eta'>"+data.eta+"</span>":"");
	}
	
	item = null;
	return (data.state == "uploading");
	
};

dhtmlXVaultObject.prototype._etaStart = function(id) {
	
	if (typeof(this.conf.files_time) == "undefined") {
		this.conf.files_time = {};
	}
	
	if (this.conf.files_time[id] == null) {
		this.conf.files_time[id] = {start: new Date().getTime(), end: 0, size: this.file_data[id].size};
	}
	
};

dhtmlXVaultObject.prototype._etaCheck = function(id, progress) {

	var eta = null;
	
	if (this.conf.files_time[id] != null && progress > 0) {
		
		var time = (new Date().getTime()-this.conf.files_time[id].start)/1000;
		var time_left = (time*100/progress-time).toFixed(0);
		
		// time left
		var d = new Date().getTime();
		if ((this.conf.files_time[id].time_upd == null || this.conf.files_time[id].time_upd+1100 < d) && this.conf.files_time[id].start+3000 < d) { // show eta after 3sec of upload
			this.conf.files_time[id].time_left = Math.max(1,time_left);
			this.conf.files_time[id].time_upd = d;
		}
		
		if (this.conf.files_time[id].time_left != null) eta = this._timeHIS(this.conf.files_time[id].time_left);
	}
	
	return eta;
};

dhtmlXVaultObject.prototype._etaEnd = function(id) {
	this.conf.files_time[id] = null;
	delete this.conf.files_time[id];
};

dhtmlXVaultObject.prototype._timeHIS = function(sec) {
	// hours
	var t = ["h","m","s"];
	var r = [];
	var i = 3600;
	for (var q=0; q<3; q++) {
		var h = Math.floor(sec/i);
		sec = sec-h*i;
		if (h > 0 || r.length > 0) r.push(String(h)+t[q]);
		if (i > 1) i = i/60;
	}
	return r.join(" ");
};

