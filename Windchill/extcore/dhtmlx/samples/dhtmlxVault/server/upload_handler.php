<?php

/*
mode=conf request
max filesize 
*/

if (@$_REQUEST["mode"] == "conf") {
	function parse_num($k) {
		$p = 0;
		preg_match("/(\d{1,})([kmg]?)/i", trim($k), $r);
		if (isset($r) && isset($r[1])) {
			$p = $r[1];
			if (isset($r[2])) {
				switch(strtolower($r[2])) {
					case "g": $p *= 1024;
					case "m": $p *= 1024;
					case "k": $p *= 1024;
				}
			}
		}
		return $p;
	}
	
	header("Content-Type: text/json");
	print_r(json_encode(array(
		"maxFileSize" => min(parse_num(ini_get("upload_max_filesize")), parse_num(ini_get("post_max_size")))
	)));
	
	die();
}

/*

HTML5/FLASH MODE

(MODE will detected on client side automaticaly. Working mode will passed to server as GET param "mode")

response format

if upload was good, you need to specify state=true and name - will passed in form.send() as serverName param
{state: 'true', name: 'filename'}

*/

if (@$_REQUEST["mode"] == "html5" || @$_REQUEST["mode"] == "flash") {
	if (@$_REQUEST["zero_size"] == "1") {
		$filename = @$_REQUEST["file_name"];
		//file_put_contents("uploaded/".$filename, ""); // IE10,IE11 zero file fix
	} else {
		$filename = $_FILES["file"]["name"];
		//move_uploaded_file($_FILES["file"]["tmp_name"],"uploaded/".$filename);
	}
	//
	header("Content-Type: text/json");
	print_r(json_encode(array(
		"state" => true,
		"name"  => $filename,
		"extra" => array(
				"info"  => "just a way to send some extra data",
				"param" => "some value here"
		)
	)));
	die();
	
}

/*

HTML4 MODE

response format:

to cancel uploading
{state: 'cancelled'}

if upload was good, you need to specify state=true, name - will passed in form.send() as serverName param, size - filesize to update in list
{state: 'true', name: 'filename', size: 1234}

*/

if (@$_REQUEST["mode"] == "html4") {
	header("Content-Type: text/html");
	if (@$_REQUEST["action"] == "cancel") {
		print_r(json_encode(array("state"=>"cancelled")));
	} else {
		$filename = $_FILES["file"]["name"];
		// move_uploaded_file($_FILES["file"]["tmp_name"], "uploaded/".$filename);
		print_r(json_encode(array(
			"state" => true,
			"name"  => $filename,
			"size"  => $_FILES["file"]["size"],
			"extra" => array(
					"info"  => "just a way to send some extra data",
					"param" => "some value here"
			)
		)));
	}
	die();
}

/* SILVERLIGHT MODE */
/*
{state: true, name: 'filename', size: 1234}
*/

if (@$_REQUEST["mode"] == "sl" && isset($_REQUEST["fileSize"]) && isset($_REQUEST["fileName"]) && isset($_REQUEST["fileKey"])) {
	
	// available params
	// $_REQUEST["fileName"], $_REQUEST["fileSize"], $_REQUEST["fileKey"] are available here
	
	// each file got temporary 12-chars length key
	// due some inner silverlight limitations, there will another request to check if file transferred and saved corrrectly
	// key matched to regex below
	
	preg_match("/^[a-z0-9]{12}$/", $_REQUEST["fileKey"], $p);
	
	if (@$p[0] === $_REQUEST["fileKey"]) {
		
		// generate temp name for saving
		$temp_name = "uploaded/".md5($p[0]);
		
		// if action=="getUploadStatus" - that means file transfer was done and silverlight is wondering if php/orhet_server_side
		// got and saved file correctly or not, filekey same for both requests
		
		if (@$_REQUEST["action"] != "getUploadStatus") {
			// file is coming, save under temp name
			/*
			$postData = file_get_contents("php://input");
			if (strlen($postData) == $_REQUEST["fileSize"]) {
				file_put_contents($temp_name, $postData);
			}
			*/
			
			// no needs to output something
		} else {
			// second "check" request is coming
			/*
			$state = "false";
			if (file_exists($temp_name)) {
				rename($temp_name, "uploaded/".$_REQUEST["fileName"]);
				$state = "true";
			}
			*/
			
			$state = "true"; // just for tests
			
			// print upload state
			// state: true/false (w/o any quotes)
			// name: server name/id
			header("Content-Type: text/json");
			print_r('{state: '.$state.', name: "'.str_replace('"','\\"',$_REQUEST["fileName"]).'",extra:{info:"uploaded successfully",param:"some value"}}');
		}
	}
}


/*

CUSTOM FILE RECORD, added in 2.3

response: {state: true, name: 'filename', size: 1234}

state	true/false
name	server file name
size	optional, will update size in list of specified

*/

if (@$_REQUEST["mode"] == "custom") {
	sleep(1);
	echo "{state: true, name: '".str_replace("'", "\\'", $_REQUEST["name"])."', extra: {param: 'value'}}";
}

?>
