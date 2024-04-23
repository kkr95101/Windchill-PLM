using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Text.RegularExpressions;
using System.IO;

namespace dhtmlxVault
{
    /// <summary>
    /// Summary description for dhtmlxVaultUploader
    /// </summary>
    public class dhtmlxVaultUploader : IHttpHandler
    {

        /* folder for files */
        private string FolderName
        {
            get
            {
                return HttpContext.Current.Server.MapPath("uploaded\\");
            }
        }

        public void ProcessRequest(HttpContext context)
        {

            /* max filesize request */
            if (context.Request["mode"] == "conf")
            {
                HttpRuntimeSection runTime = (HttpRuntimeSection)WebConfigurationManager.GetSection("system.web/httpRuntime");;
                int maxRequestLength = runTime.MaxRequestLength * 1024; //bytes
                context.Response.Write("{maxFileSize: " + maxRequestLength + "'}");
            }

            string filename = "";

            /*
            HTML5/FLASH MODE
            (MODE will detected on client side automaticaly. Working mode will passed to server as GET param "mode")
            response format
            if upload was good, you need to specify state=true and name - will passed in form.send() as serverName param
            {state: 'true', name: 'filename'}
            */            
            if (context.Request["mode"] == "html5" || context.Request["mode"] == "flash")
            {
                filename = context.Request.Files["file"].FileName;

                //context.Request.Files["file"].SaveAs(FolderName + filename);

                context.Response.ContentType = "text/json";
                context.Response.Write("{state: true, name: '" + filename.Replace("'", "\\'") + "'," +
                                        "extra: {info: 'just a way to send some extra data', param: 'some value here'}}");
            }

            /*
            HTML4 MODE
            response format:
            to cancel uploading
            {state: 'cancelled'}
            if upload was good, you need to specify state=true, name - will passed in form.send() as serverName param, size - filesize to update in list
            {state: 'true', name: 'filename', size: 1234}
            */
            if (context.Request["mode"] == "html4")
            {
                context.Response.ContentType = "text/html";
                if (context.Request["action"] == "cancel")
                {
                    context.Response.Write("{state:'cancelled'}");
                }
                else
                {
                    filename = context.Request.Files["file"].FileName;

                    //context.Request.Files["file"].SaveAs(FolderName + filename);

                    context.Response.Write("{state: true, name:'" + filename.Replace("'", "\\'") + "', size:" + context.Request.Files["file"].ContentLength + "," +
                                            "extra: {info: 'just a way to send some extra data', param: 'some value here'}}");
                }
            }

            /* 
            SILVERLIGHT MODE
            {state: true, name: 'filename', size: 1234}
            */
            if (context.Request["mode"] == "sl" && context.Request["fileSize"] != null 
                && context.Request["fileName"] != null && context.Request["fileKey"] != null)
            {
                /* available params
                   context.Request["fileName"], context.Request["fileSize"], context.Request["fileKey"] are available here

                   each file got temporary 12-chars length key
                   due some inner silverlight limitations, there will another request to check if file transferred and saved corrrectly
                   key matched to regex below */

                Match match = Regex.Match(context.Request["fileKey"], "^[a-z0-9]{12}$");

                if (match.Value == context.Request["fileKey"])
                {
                    // generate temp name for saving
                    string tempName = String.Format("{0}_data", match.Value);
		
		            // if action=="getUploadStatus" - that means file transfer was done and silverlight is wondering if c#/or other_server_side
		            // got and saved file correctly or not, filekey same for both requests

                    if (context.Request["action"] != "getUploadStatus")
                    {
                        // file is coming, save under temp name

                        /*using (FileStream fs = File.Create(FolderName + tempName))
                        {
                            SaveFile(context.Request.InputStream, fs);
                        }*/

                        // no needs to output something
                    }
                    else
                    {
                        // second "check" request is coming

                        string state = "false";
                        /*if (File.Exists(FolderName + tempName))
                        {
                            if (File.Exists(FolderName + context.Request["fileName"]))
                            {
                                File.Delete(FolderName + context.Request["fileName"]);
                            }
                            File.Move(FolderName + tempName, FolderName + context.Request["fileName"]);
                            state = "true";
                        }*/

                        state = "true"; // just for tests

                        context.Response.Write("{state: " + state + ", name:'" + filename.Replace("'", "\\'") + "', " +
                                            "extra: {info: 'just a way to send some extra data', param: 'some value here'}}");
                    }
                }
            }

        }

        private void SaveFile(Stream stream, FileStream fs)
        {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = stream.Read(buffer, 0, buffer.Length)) != 0)
            {
                fs.Write(buffer, 0, bytesRead);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}