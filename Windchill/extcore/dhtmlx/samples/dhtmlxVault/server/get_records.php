<?php
	
	$files = array();
	
	$d = opendir("static");
	while (false != ($f = readdir($d))) {
		if (is_file("static/".$f)) array_push($files, $f);
	}
	closedir($d);
	
	sort($files);
	
	if (true) {
		
		// for xml output
		$xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n".
			'<files>'."\n";
		for ($q=0; $q<count($files); $q++) {
			$f = $files[$q];
			$xml .= "\t".'<file name="'.$f.'" serverName="'.$f.'" size="'.filesize("static/".$f).'"/>'."\n";
		}
		$xml .= '</files>';
		
		header("Content-Type: text/xml; charset=UTF-8");
		print_r($xml);
		
	} else {
		
		// for json output
		for ($q=0; $q<count($files); $q++) {
			$f = $files[$q];
			$files[$q] = '{name: "'.$f.'", serverName: "'.$f.'", size:"'.filesize("static/".$f).'"}';
		}
		
		header("Content-Type: text/plain; charset=UTF-8");
		print_r("[\n\t".implode(",\n\t", $files)."\n]");
		
	}
	
?>
