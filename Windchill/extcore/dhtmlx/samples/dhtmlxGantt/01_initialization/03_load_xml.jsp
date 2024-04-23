<!DOCTYPE html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>Load data from XML file</title>
</head>
	<script src="/Windchill/extcore/dhtmlx/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="/Windchill/extcore/dhtmlx/dhtmlxgantt.css" type="text/css" media="screen" title="no title" charset="utf-8">

	
<body>
	<style type="text/css">
		html, body{ padding:0px; margin:0px; height:100%; }
	</style>
	<div id="gantt_here" style='width:100%; height:100%;'></div>
	<script type="text/javascript">
		gantt.config.date_grid = "%Y-%m-%d %H:%i";
		gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
		gantt.init("gantt_here");
		gantt.load("/Windchill/extcore/dhtmlx/samples/dhtmlxGantt/common/data.xml", "xml");
	</script>
</body>