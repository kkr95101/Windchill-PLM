<%@page language="java" contentType="text/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%

String reqUrl = request.getRequestURI().substring(0,request.getRequestURI().lastIndexOf("/"));
String upload_Handler = "http://"+request.getHeader("HOST")+reqUrl+"/upload_handler.jsp";

Object[][] sampleArr = {
      {"vaultObj", upload_Handler, upload_Handler, upload_Handler, "dhxvault.swf" ,"dhxvault.xap"}
      };
JSONObject jsonList = new JSONObject();
JSONArray itemList = new JSONArray();

for(int i=0;i < sampleArr.length; i++){
    JSONObject tempJson = new JSONObject();
    tempJson.put("parent", sampleArr[i][0]);
    tempJson.put("uploadUrl", sampleArr[i][1]);
    tempJson.put("swfUrl", sampleArr[i][2]);
    tempJson.put("slUrl", sampleArr[i][3]);
    tempJson.put("swfPath", sampleArr[i][4]);
	tempJson.put("slXap", sampleArr[i][5]);
	tempJson.put("autoStart", false);
	tempJson.put("buttonUpload", false);
    out.print(tempJson);
}
%>
