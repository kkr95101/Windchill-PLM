/*
Product Name: dhtmlxVault 
Version: 2.3 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhtmlXVaultObject.prototype.setServerHandlers=function(a){this.conf.upload_url=a};dhtmlXVaultObject.prototype.setImagePath=function(a){};dhtmlXVaultObject.prototype.create=function(a){};dhtmlXVaultObject.prototype.onAddFile=function(a){this.attachEvent("onBeforeFileAdd",function(b,c){return a.apply(this,[b])})};dhtmlXVaultObject.prototype.onFileUploaded=function(a){this.attachEvent("onUploadFile",function(b){a.apply(this,[b])});this.attachEvent("onUploadFail",function(b){a.apply(this,[b])})};dhtmlXVaultObject.prototype.onUploadComplete=function(a){this.attachEvent("onUploadComplete",function(b){a.apply(this,b)})};dhtmlXVaultObject.prototype.setFormField=function(c,d){for(var b in {url:1,swf_url:1,sl_url:1}){this.conf[b]+=(String(this.conf[b]).indexOf("?")<0?"?":"&")+c+"="+encodeURIComponent(d)}};