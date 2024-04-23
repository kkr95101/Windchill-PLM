<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Collection"%>
<%@ page import="javax.servlet.http.Part"%>
<%@ page import="org.apache.commons.io.FilenameUtils"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Enumeration"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="javax.servlet.http.HttpServlet"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.http.HttpServletResponse"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="org.apache.commons.fileupload.FileUploadException"%>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="java.util.*"%>
<%@page import="java.io.DataInputStream"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="org.omg.CORBA.portable.OutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="org.apache.catalina.connector.Request"%>

<%

/*
THE FOLLOWING FILES ARE REQUIRED IN YOUR PROJECT:
commons-fileupload.jar
commons-io.jar
*/
System.out.println("Called.....upload_handler..........");

String uploadDir = "D:/";

String mode = request.getParameter("mode");
String action = "";
System.out.println("mode..........1   :"+mode);

ServletFileUpload uploader = null;
List<FileItem> items = null;

if (mode == null || (mode != null && !mode.equals("conf") && !mode.equals("sl"))) {
	uploader = new ServletFileUpload(new DiskFileItemFactory());
	uploader.setHeaderEncoding("UTF-8");
	items = uploader.parseRequest(request);
}
System.out.println("mode..........2   :"+mode);
if (mode == null) {
	mode = "";
System.out.println("mode..........3   :"+mode);
	for (FileItem item : items) {
		if (item != null) {
			if (item.getFieldName().equals("mode")) {
				mode = getStringFromStream(item.getInputStream());
				System.out.println("mode..........4   :"+mode);
			}
			if (item.getFieldName().equals("action")) {
				action = getStringFromStream(item.getInputStream());
			}
		}
	}
}

if (mode.equals("conf")) {
	int maxPostSize = 2000000;
	
	response.setHeader("Content-type", "text/json");
	response.getWriter().write("{ \"maxFileSize\":" + maxPostSize + " }");
}

System.out.println("mode.........."+mode);
if (mode.equals("html4") || mode.equals("flash") || mode.equals("html5")) {
	if (action.equals("cancel")) {
		response.setHeader("Content-type", "text/json");
		response.getWriter().write("{\"state\":\"cancelled\"}");
	} else {
		String filename = "";
		Integer filesize = 0;
		int cnt = 0;
    
		for (FileItem item : items) {
			if (!item.isFormField()) {
				cnt ++;   
				// Process form file field (input type="file").
				String fieldname = item.getFieldName();
				filename = FilenameUtils.getName(item.getName());
				InputStream filecontent = item.getInputStream();

				// Write to file
				File f=new File(uploadDir + filename);
				FileOutputStream fout=new FileOutputStream(f);
				byte buf[]=new byte[1024];
				int len;
				while((len=filecontent.read(buf))>0) {
					fout.write(buf,0,len);
					filesize+=len;
				}
				fout.close(); 
			}
		}
		response.setHeader("Content-type", "text/html");
		response.getWriter().write("{\"state\":true,\"name\":\"" + filename.replace("\"","\\\"") + "\",\"size\":" + filesize + ",\"extra\":{\"info\":\"just a way to send some extra data\",\"param\":\"some value here\"}}");
	}
}

HashMap p = new HashMap();

Enumeration params = request.getParameterNames();
while (params.hasMoreElements()) {
	String name = (String)params.nextElement();
	p.put(name, request.getParameter(name));
}

String fileName = request.getParameter("fileName");
String fileSize = request.getParameter("fileSize");
String fileKey = request.getParameter("fileKey");


if (mode != null && mode.equals("sl") && fileName != null && fileSize != null && fileKey != null) {
	action = request.getParameter("action");

	if (action != null && action.equals("getUploadStatus")) {
		response.setContentType("text/json");
		out.print("{state: true, name:'" + fileName + "'}");
	} else {
		/* FileOutputStream file = new FileOutputStream(uploadDir+fileName);
		file.write(IOUtils.readFully(request.getInputStream(), -1, false));
		file.close(); */
	}
}

%>

<%!
String getStringFromStream(InputStream is) throws Exception {
	BufferedReader br = new BufferedReader(new InputStreamReader(is));
	StringBuilder sb = new StringBuilder();
	String line;
	while ((line = br.readLine()) != null) {
		sb.append(line);
	}
	return sb.toString();
}
%>

