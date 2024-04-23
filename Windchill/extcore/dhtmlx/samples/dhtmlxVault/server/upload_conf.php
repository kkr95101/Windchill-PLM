<?php

header("Content-Type: text/json");

$url = "http://".$_SERVER["HTTP_HOST"].dirname($_SERVER["REQUEST_URI"])."/upload_handler.php";

print_r(json_encode(array(
	"parent"	=> "vaultObj",		// container for init, common for all demos
	"uploadUrl"	=> $url,		// html4/html5 upload url
	"swfUrl"	=> $url,		// flash upload url
	"slUrl"		=> $url,		// silverlight upload url, FULL path required
	"swfPath"	=> "dhxvault.swf",	// path to flash uploader
	"slXap"		=> "dhxvault.xap"	// path to silverlight uploader
)));

?>
