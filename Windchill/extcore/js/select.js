 /**
 * @(#)	select.js
 * Copyright (c) e3ps. All rights reserverd
 * 
 * @version 1.00
 * @author Seung-hwan Choi, skyprda@e3ps.com
 */
var lbl_Select = unescape('%uC120%uD0DD'); // lable select name
// node
function DGSelectNode(_value, _text)
{
	this.level = -1;
	this.value = _value;
	this.text = _text;
	// extend Attributes
	this.etc1 = '';
	this.etc2 = '';
	this.etc3 = '';
	
	this.child = new Array();
	
	this.add = function(child)
	{
		this.child.push(child);
		child.level = this.level+1;
	}
}

// get Root Select Node
function getRootSelect(rootSelectName)
{
	return eval('root'+rootSelectName);
}

// get the Name of Root_Select
function getRootSelectName(objSelect)
{
	var objname = objSelect.name;
	return objname.substring(0, objname.length-1);
}

// get the index Number of Select
function getSelectIndex(objSelect)
{
	var objname = objSelect.name;
	return parseInt(objname.substring(objname.length-1, objname.length));
}

// get the Selected DGSelectNode
function getSelectedDGNode(_rootName)
{
	return eval('DG'+_rootName);
}

// 
function printSelect(_selectName)
{
	var rootNode = getRootSelect(_selectName);
	if(rootNode.child.length != 0)
	{
		var select0 = document.getElementById(_selectName +'0');
		if(select0 == null)
		{
			createTR(_selectName);
			createTD(_selectName, 0);
			select0 = document.getElementById(_selectName +'0');
		}
		
		var tempChild = rootNode.child;
		var i=0;
		for (i=0 ; i < tempChild.length ; i++)
		{
			select0.options[i] = new Option(tempChild[i].text, tempChild[i].value);
		}
		
		select0.options[i] = new Option(lbl_Select, '');
		select0.options[i].selected = true;
	}
}

function createTR(selectName)
{
	var tableObj = document.getElementById('selectTable'+selectName);
	var newTr = tableObj.insertRow();
	newTr.style.background = '#D6DBE7';

	newTr = tableObj.insertRow();
	newTr.style.background = 'white';
}

function createTD(selectName, idxSelect)
{
	if(idxSelect > 9) return;
	
	var objSelect = document.getElementById(selectName+idxSelect);
	if(objSelect != null) return;

	var tableObj = document.getElementById('selectTable'+selectName);
	var newTd = tableObj.rows[0].insertCell();
	newTd.style.background = '#8899aa';
	newTd.style.color = 'white';
	newTd.style.borderWidth = 1;
	newTd.style.borderColor = '#667788';
	newTd.style.borderStyle = 'solid';
	newTd.style.textAlign = 'center';
	newTd.innerText = (idxSelect+1)+unescape('%uBD84%uB958');

	newTd = tableObj.rows[1].insertCell();
	var f = eval('function'+selectName);
	newTd.innerHTML = "<select name="+selectName+idxSelect+" onChange=\"redirect(this, '"+selectName+(idxSelect+1)+"');"+f+"\" style='width:100%'><option></option></select>";
}

function redirect(objSelect, _nextSelectName)
{
	setSelectDGNode(objSelect);
	
	var nextSelect = document.getElementById(_nextSelectName);
	if(nextSelect == null) 
	{
		var selectNode = eval('DG'+getRootSelectName(objSelect));
		if(selectNode == null || selectNode.child.length == 0)  return;

		createTD(getRootSelectName(objSelect), getSelectIndex(objSelect)+1);
		nextSelect = document.getElementById(_nextSelectName);
	}
	
	// initialize
	initializeSelect(nextSelect);
	if(objSelect[objSelect.selectedIndex].value == '' && objSelect[objSelect.selectedIndex].text == lbl_Select) return;
	refreshSelect(objSelect, nextSelect);
}

function refreshSelect(_select, _nextSelect)
{
	var rootName = getRootSelectName(_select);
	var tempNode = eval('DG'+rootName);
	if(tempNode == null) setSelectDGNode(_select);

	tempNode = eval('DG'+rootName);
	if(tempNode == null) return;
	
	var arrayChild = tempNode.child;
	
	var i=0;
	for (i=0 ; i < arrayChild.length ; i++)
		_nextSelect.options[i] = new Option(arrayChild[i].text, arrayChild[i].value);
	
	_nextSelect.options[i] = new Option( i==0?'':lbl_Select, '');
	_nextSelect.options[i].selected = true;
}

function initializeSelect(_nextSelect)
{
	if(_nextSelect == null) return;
	
	for (var x=_nextSelect.length-1 ; x>0 ; x--) 
		_nextSelect.options[x]=null
	
	_nextSelect.options[0] = new Option('', '');
	_nextSelect.options[0].selected = true;
	
	var level = getSelectIndex(_nextSelect) + 1;
	var rootSelectName = getRootSelectName(_nextSelect);
	initializeSelect(document.getElementById(rootSelectName+level));
}

function setSelectDGNode(_selectTag)
{
	var level = getSelectIndex(_selectTag);
	var rootSelectName = getRootSelectName(_selectTag);
	eval('DG'+rootSelectName+'=null');
	findDGSelectNode(getRootSelect(rootSelectName), level, _selectTag.value, rootSelectName);
//	return tempSelectedNode;
}
function findDGSelectNode(_node, _level, _value, _rootSelectName)
{
	var isReturn = false;
	eval('if(DG'+_rootSelectName+' != null) isResult = true;');
	if(isReturn) 	return;

	var tempChild = _node.child;
	for (var i=0 ; i < tempChild.length ; i++)
	{
//	alert(tempChild[i].value + " - current level : " + _level + "   obj level : " + tempChild[i].level);
		if(_level == tempChild[i].level  &&  _value == tempChild[i].value )
		{
			eval('DG'+_rootSelectName+'=tempChild[i]');
			return;
		}
		else if(_level > tempChild[i].level)
			findDGSelectNode(tempChild[i], _level, _value, _rootSelectName);
	}
	return;
}

// check
function isSelectedAll(_rootSelectName)
{
	var idx = 0;
	while(idx < 10)
	{
		var obj = document.getElementById(_rootSelectName+(idx++));
		if(obj == null) break;
		
		if(obj[obj.selectedIndex].text == lbl_Select)
		{
			alert(unescape('%uD56D%uBAA9%uC744%20%uC120%uD0DD%uD558%uC138%uC694'));
			obj.focus();
			return false;
		}
	}
	return true;
}

// set data in SELECT html-tag
function setSelectData(rootSelectName, _level, _value)
{
	var objSelect = document.getElementById(rootSelectName+_level);
	objSelect.value = _value;
	
	setSelectDGNode(objSelect);

	var nextSelect = document.getElementById(rootSelectName+(_level+1));
	if(nextSelect == null) 
	{
		var selectNode = eval('DG'+getRootSelectName(objSelect));
		if(selectNode.child.length == 0)  return;

		createTD(rootSelectName, _level+1);
		nextSelect = document.getElementById(rootSelectName+ (_level+1));
	}
	
	refreshSelect(objSelect, nextSelect);
}