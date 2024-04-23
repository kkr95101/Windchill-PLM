/*
 * TreeView v1.0
 * Developer : Navnath R. Kale
 * Last Updated : 08, Mar 2010
*/

function TreeView()
{
    this.treeView = {
        _showLines : false,
        _className : 'treeview',
        _lineStyle : 'default',
        _container : null,
        
        Type: 'TREEVIEW',
        PathSeparator : '\\',
        UpdateImageURL :  '/Windchill/extcore/images/treeimages/updating.gif',
        ToggleOnSelect : false,
        SelectedNode : null,
        EnableKeyNavigation : true,
        Nodes : [],

        _init: function(){
            this.Nodes._control = null;                       
            this.Nodes._this = this;

            var ul = this.Nodes._control;

            if(!ul && this.Nodes.length == 0){
                ul = document.createElement('ul');                    
                this.Nodes._control = ul;                
            };
            
            this.ShowLines(this._showLines);
            
            this.Nodes.AddAt = function(index, node){
                if(node == void 0){
                    alert('Node cannot be null');
                    return null;
                };
                
                if(index.toString().indexOf('-') >= 0){
                    alert('Index cannot be negative.');
                    return null;
                };

                node.Parent = null;
                node.Value = node.Value || node.Text;
                node._treeView = this._this;
                
                var refNode = ul.childNodes[index] || null;
                
                ul.insertBefore(node._control, refNode);

                this.splice(index, 0, node);                    

                if(this.length > 0){
                    var index = 0;
                    
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];
                        
                        _node._control.className = '';
                    };
                    
                    this[this.length-1]._control.className = 'last';  
                };
                
                return node; 
            };
            
            this.Nodes.AddAt1 = function(index, text, value, navigationURL, target, imageURL, imageOpenURL){
                return this.AddAt(index, new TreeNodes(text, value, navigationURL, target, imageURL, imageOpenURL));
            };
            
            this.Nodes.Add = function(node){
                return this.AddAt(this.length, node );
            };
                       
            this.Nodes.Add1 = function(text, value, navigationURL, target, imageURL, imageOpenURL){
                return this.Add(new TreeNodes(text, value, navigationURL, target, imageURL, imageOpenURL));
            };
            
            this.Nodes.RemoveAt = function(index){
                var node = this[index];               
                this.Remove(node);                
            };
            
            this.Nodes.Remove = function(node){
                if(node == void 0){
                    alert('Node cannot be null');
                    return null;                    
                };
                
                if(node.TreeView() == void 0 || node.Parent != void 0){
                    alert('Invalid node object supplied');
                    return null;
                }

                this._control.removeChild(node._control);            

                if(this.length > 0){
                    var index = 0;
                    
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];
                        
                        if(node == _node){
                            this.splice(index,1);
                            break;
                        }
                    };
                };
                
                if(node.TreeView().SelectedNode == node)
                    node.TreeView().SelectedNode = null;
                
                node = null;
                
                if(this.length > 0){
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];
                        
                        _node._control.className = '';                     
                    };
                    
                    this[this.length-1]._control.className = 'last';                     
                };
            };
            
            this.Nodes.Clear = function(){
                while(this.length > 0)
                    this.RemoveAt(0);
            };
            
            
        },
        
        SetContainer : function(parent){                    
            if(this._container == void 0){
                var objParent = typeof(parent) == 'string' ? document.getElementById(parent) : parent;
            
                if(objParent){
                    this._container = objParent;
                        
                    if(this._container && this.Nodes._control)
                        this._container.appendChild(this.Nodes._control);
                }
                else
                    alert('Parent cannot be null.');                
            }
            else
                alert('This control is already parented.');                
        },
        
        Container : function(){
            return this.__container;
        },
        
        CssName : function(className){
            if(className != void 0){
                this._className = className;
                
                if(this.Nodes._control != void 0){
                    this.Nodes._control.className = this._className;
                };
            };
                        
            return this._className;
        },
	    
	    SelectedValuePath : function(){
	        return this.SelectedNode == null ? null : this.SelectedNode.ValuePath();        
        },
        
        ExpandAll : function(){
            if(this.Nodes.length > 0){
                var index = 0;
                
                for(index = 0; index<= this.Nodes.length-1; index++){
                    var _node = this.Nodes[index];
                    _node.Toggle(true, true);
                };
            };
        },
        
        CollapseAll : function(){
            if(this.Nodes.length > 0){
                var index = 0;
                
                for(index = 0; index<= this.Nodes.length-1; index++){
                    var _node = this.Nodes[index];
                    _node.Toggle(false, true);
                };
            };
        },

        FindNode : function(valuePath){
            if(valuePath == void 0){
                alert('valuePath cannot be null');
                return null;
            };
            
            var index = 0;            
            var valuePathSegments = valuePath.split(this.PathSeparator);
            
            var node = null;
            
            for(segment in valuePathSegments){            
                if(node == void 0){
                    for(index = 0; index<= this.Nodes.length-1; index++){
                        var _node = this.Nodes[index];
                        if(_node.Value == valuePathSegments[segment]){
                            node = _node;
                            break;
                        };                            
                    };
                }
                else{
                    node = node.Find(valuePathSegments[segment], false);
                };                                            

                if(node == void 0)                            
                    return null;                
            };
            
            return node;
        },
        
        ShowLines : function(value){
            if(value != void 0){
                this._showLines = value;
                
                if(this.Nodes._control != void 0){
                    this.Nodes._control.className = (value ? this._className + ' ' + this._className + '_' + this._lineStyle + '_line' : this._className);
                };
            };
            
            return this._showLines;
        },
        
        LineStyle : function(value){
            if(value != void 0){
                this._lineStyle = value;
                this.ShowLines(this._showLines);
            };
            
            return this._lineStyle;                
        },
        
        Visible : function(value){
            if(value != void 0)
                this.Nodes._control.style.display = value ? '' : 'none';                       
            
            return this.Nodes._control.style.display == '';
        },

        SelectedNodeChanging : null,
        SelectedNodeChanged : null,
        
        BeforeCollapse : null,
        BeforeExpand : null,        
        AfterCollapse : null,
        AfterExpand : null
    };
    
    this.treeView._init();
    
    return this.treeView;
}

TreeView.Parse = function(object)
{
    function __converter(object, element){
        
        if(element != void 0 && element.tagName && element.tagName == 'UL'){
            if(object == void 0)
                object = new TreeView();

            for(var liIndex = 0; liIndex <= element.childNodes.length-1; liIndex++){
                var li = element.childNodes[liIndex];

                if(li != void 0 && li.tagName && li.tagName == 'LI'){
                    var treeNode = new TreeNodes(li.childNodes[0]);
                    
                    if(object.Type == 'TREEVIEW')
                        object.Nodes.Add(treeNode);
                    else
                        object.ChildNodes.Add(treeNode);

                    __converter(treeNode, li.childNodes[1]);
                };
            };
            
            return object;
        };
        
        return null;
    };

    var obj = typeof(object) == 'string' ? document.getElementById(object) : object;
        
    if(obj == void 0)
        throw('Invalid object provided');

    return __converter(null, obj);
}

function TreeNodes(text, value, navigationURL, target, imageURL, imageOpenURL)
{
    this.treeNode = {
        _navigateUrl : navigationURL || 'javascript:void(0)',
        _target : target || null,
        _imageURL: imageURL,
        _imageOpenURL: imageOpenURL,
        _control : null,
        _isUpdating : false,
        _treeView : null,
        
        Type : 'TREENODE',
        Text : text,
        Value : value,
        ChildNodes : [],
        Parent : null,
        Image: null,
        
        _onTaggleClick : function(evt){
            
            var e = evt || window.event;
            var trgt = e.target || e.srcElement;

            if(trgt && (e.nodeType == 3 || e.nodeType == 4))
                trgt = trgt.parentNode;

            if(trgt.treeNode)
                return trgt.treeNode.Toggle();
            
            return false;                
        },
        
        _onNodeClick : function(evt){
            
            var e = evt || window.event;
            var trgt = e.target || e.srcElement;

            if(trgt && (e.nodeType == 3 || e.nodeType == 4))
                trgt = trgt.parentNode;

            trgt = trgt.tagName == 'A' ? trgt : trgt.parentNode;
            var action = true;
                        
            if(trgt && trgt.treeNode)
                action = trgt.treeNode.Select();                

            if(!action){
                e.returnValue = false;
                e.cancelBubble = true;
                
                if( e.stopPropagation ) { e.stopPropagation(); }
                if( e.preventDefault ) { e.preventDefault(); }
            };

            return action;
        },
        
        _onNodeNavigate : function(evt){
            
            function KeyLeftPressed(node){
                if(node.ChildNodes.length > 0 && node.IsExpanded())
                    return node.Collapsed();
                else
                    return KeyUPPressed(node);
            };
            
            function KeyRightPressed(node){
                if(node.ChildNodes.length > 0 && !node.IsExpanded())
                    return node.Expanded();
                else
                    return KeyDownPressed(node);                    
            };

            function KeyUPPressed(node){
            
                function __selectLastNode(node){
                    if(node != void 0){
                        if(node.ChildNodes.length > 0 && node.IsExpanded())
                            __selectLastNode(node.ChildNodes[node.ChildNodes.length-1]);
                        else
                            return node.Select();
                    };
                    
                    return false;
                };

                var nodeIndex = node.Index();                               
                var treeNodeCollection = null;

                try{
                    treeNodeCollection = node.Parent != void 0 ? node.Parent.ChildNodes : node.TreeView().Nodes;
                } catch(e){}

                if(treeNodeCollection){
                    if(nodeIndex > 0){
                        var treeNode = treeNodeCollection[nodeIndex-1];
                        return __selectLastNode(treeNode);
                    }
                    else if(nodeIndex == 0 && node.Parent != void 0){
                        return node.Parent.Select();
                    };
                };
                
                return true;
            };  
            
            function __selectNextNode(node){   
                var index = node.Index();
                
                if(index > -1 && node != void 0){
                    try{
                        treeNodeCollection = node.Parent != void 0 ? node.Parent.ChildNodes : node.TreeView().Nodes;
                    } catch(e){}
                    
                    if(treeNodeCollection != void 0 && treeNodeCollection.length > 0){
                        if(treeNodeCollection.length-1 > index)
                            return treeNodeCollection[index+1].Select();
                        else if(node.Parent != void 0)
                            return __selectNextNode(node.Parent);
                    };
                };

                return false;
            }

            function KeyDownPressed(node){
                if(node.ChildNodes.length > 0 && node.IsExpanded())
                    node.ChildNodes[0].Select();
                else
                    __selectNextNode(node);
            };
            
            var e = evt || window.event;
            
            var keyCode = e.keyCode;
            
            if(keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40){
                var trgt = e.target || e.srcElement;

                if(trgt && (e.nodeType == 3 || e.nodeType == 4))
                    trgt = trgt.parentNode;
                
                trgt = trgt.tagName == 'A' ? trgt : trgt.parentNode;                                
                var action = true;

                if(trgt != void 0 && trgt.treeNode != void 0 && trgt.treeNode.AllowKeyNavigation == true){
                    var treeView = trgt.treeNode.TreeView();
                    
                    if(treeView != void 0 && treeView.EnableKeyNavigation == true) {
                        if(keyCode == 37)
                            action = KeyLeftPressed(trgt.treeNode);
                        else if(keyCode == 39)
                            action = KeyRightPressed(trgt.treeNode);
                        else if(keyCode == 40)
                            KeyDownPressed(trgt.treeNode);
                        else if(keyCode == 38)                        
                            KeyUPPressed(trgt.treeNode);
                    };                            
                };
                
                if(!action){
                    e.returnValue = false;
                    e.cancelBubble = true;
                    
                    if( e.stopPropagation ) { e.stopPropagation(); }
                    if( e.preventDefault ) { e.preventDefault(); }
                };

                return action;
            };
            
            return true;                
        },        

        _init : function(){
            if(typeof(this.Text) != 'string'){
                if(this.Text.nodeType){
                    if(this.Text.nodeType == 3 || this.Text.nodeType == 4){
                        this.Text = this.Text.data;
                    }
                    else if(this.Text.tagName && this.Text.tagName == 'A'){
                        this._navigateUrl = this.Text.getAttribute('href');
                        this._target = this.Text.getAttribute('target');   
                        this.Text = this.Text.innerText;                                     
                    }
                    else
                        throw("This object is not supported for parsing.");
                }
            }
            
            var _li = document.createElement('li');
            _li.setAttribute('nowrap','nowrap');
            
            var _div = document.createElement('div');
            _div.className = 'hitarea expandable-hitarea';
            _div.title = 'Collapse ' + this.Text;
            _div.style.display = 'none';

            if(_div.addEventListener)
                _div.addEventListener('click',this._onTaggleClick, false);
            else if(_div.attachEvent)
                _div.attachEvent('onclick',this._onTaggleClick);

            var _a = document.createElement('a');
            
            if(_a.addEventListener){
                _a.addEventListener('click',this._onNodeClick, false);
                _a.addEventListener('keydown',this._onNodeNavigate, false);
                _a.addEventListener('focus',this._onNodeClick, false);
            }                
            else if(_a.attachEvent){
                _a.attachEvent('onclick',this._onNodeClick);
                _a.attachEvent('onkeydown',this._onNodeNavigate);
                _a.attachEvent('onfocus',this._onNodeClick);
            };
            
            this.Image = document.createElement('img');
            this.Image.setAttribute('border','0');
            this.Image.className = 'treeview-node-image';
            
            if(!this._imageURL)
                this.Image.style.display = 'none';
                
            _a.appendChild(this.Image);
            
            var span = document.createElement('span');            
            span.innerHTML = this.Text;

            //tooltip에 <font 관련 내용이 나와서 Skip 처리 한다
            //_a.setAttribute('title',this.Text);
            
           _a.appendChild(span);
            
            _div.treeNode = _a.treeNode = this;

            _li.appendChild(_div);
            _li.appendChild(_a);

            _li.setAttribute('value', this.Value);
            this._control = _li;               

            this.ChildNodes._control = document.createElement('ul');
            this.ChildNodes._control.style.display = 'none';
            this._control.appendChild(this.ChildNodes._control);           

            this.ChildNodes._this = this;

            this.SetNavigationURL(this._navigateUrl, this._target);            
            this.SetImageURL(this._imageURL, this._imageOpenURL);                        
            
            this.ChildNodes.AddAt = function(index, node){
                if(node == void 0){
                    alert('Node cannot be null');
                    return null;                    
                };
            
                if(index.toString().indexOf('-') >= 0){
                    alert('Index cannot be negative.');
                    return null;
                };
                
                node.Parent = this._this;
                node.Value = node.Value || node.Text;
                
                var ul = node.Parent.ChildNodes._control;
                
                if(!ul && node.Parent.ChildNodes.length == 0)
                {
                    ul = document.createElement('ul');
                    node.Parent.ChildNodes._control = ul;
                    node.Parent._control.appendChild(ul);
                };                                       
                
                var refNode = ul.childNodes[index] || null;
                
                ul.insertBefore(node._control, refNode);

                this.splice(index, 0, node);
                
                if(this.length > 0){
                    var index = 0;
                    
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];
                        _node._control.className = '';
                        var _div = _node._control.getElementsByTagName('div')[0];  
                        _div.style.display = _node.ChildNodes.length == 0 ? 'none' : '';                        
                    };
                    
                    this[this.length-1]._control.className = 'last';
                    var _div = this._this._control.getElementsByTagName('div')[0];  
                    _div.style.display = this._this.ChildNodes.length == 0 ? 'none' : '';                      
                };
                
                return node;
            };
            
            this.ChildNodes.AddAt1 = function(index, text, value, navigationURL, target, imageURL, imageOpenURL){
                return this.AddAt(index, new TreeNodes(text, value, navigationURL, target, imageURL, imageOpenURL));
            };            
            
            this.ChildNodes.Add = function(node){
                return this.AddAt(this.length, node);
            };
            
            this.ChildNodes.Add1 = function(text, value, navigationURL, target, imageURL, imageOpenURL){
                return this.Add(new TreeNodes(text, value, navigationURL, target, imageURL, imageOpenURL));
            };
            
            this.ChildNodes.RemoveAt = function(index){ 
                var node = this[index];               
                this.Remove(node);
            };
            
            this.ChildNodes.Remove = function(node){     
                if(node == void 0){
                    alert('Node cannot be null');
                    return null;                    
                };

                this._control.removeChild(node._control);                
                                                
                if(this.length > 0){
                    var index = 0;
                    
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];
                        
                        if(node == _node){
                            this.splice(index,1);
                            break;
                        };
                    };
                };
                
                if(node.TreeView() != void 0 && 
                    node.TreeView().SelectedNode == node)
                        node.TreeView().SelectedNode = null;
                
                node = null;
                
                if(this.length > 0){
                    for(index = 0; index<= this.length-1; index++){
                        var _node = this[index];                        
                        _node._control.className = '';                     
                    };
                    
                    this[this.length-1]._control.className = 'last';                     
                };
                
                var _div = this._this._control.getElementsByTagName('div')[0];  
                _div.style.display = this.length == 0 ? 'none' : '';                        
                                               
                this._this.SetImageURL(this._this._imageURL, this._this._imageOpenURL); 
            };
            
            this.ChildNodes.Clear = function(){
                while(this.length > 0)
                    this.RemoveAt(0);
            };
        },
        
        TreeView : function(fn){
        
            var _parent = this;
            
            while(true){
                if(_parent.Parent == void 0)
                    return _parent._treeView;
                else{
                    _parent = _parent.Parent;
                    
                    if(fn) fn(_parent);
                };
            };
            
            return null;
        },
                
        IsExpanded: function(){
            if(this.ChildNodes.length > 0 && this.ChildNodes._control)
                return this.ChildNodes._control.style.display != 'none';
                
            return false;
        },
        
        NavigationURL : function(){
            return this._navigateUrl;
        },

        Target : function(){
            return this._target;
        },
        
        SetNavigationURL : function(url, target){
            this._navigateUrl = url || 'javascript:void(0)';
            this._target = target || null;
            
            this._control.getElementsByTagName('a')[0].href = this._navigateUrl;
            
            if(this._target)
                this._control.getElementsByTagName('a')[0].target = this._target;
            else
                this._control.getElementsByTagName('a')[0].removeAttribute('target');
        },     
        
        SetImageURL : function(url, urlOpen){
            this._imageURL = url || null
            this._imageOpenURL = urlOpen || null
            
            if(this.Image && !this._isUpdating){
                this.Image.className = '';
                
                if(this.ChildNodes.length == 0 || !this.IsExpanded()){
                    if(!this._imageURL)
                        this.Image.style.display = 'none';
                    else{
                        this.Image.style.display = '';
                        this.Image.src = this._imageURL;
                    };
                }
                else{
                    if(!this._imageOpenURL && !this._imageURL)
                        this.Image.style.display = 'none';
                    else{
                        this.Image.style.display = '';
                        this.Image.src = this._imageOpenURL || this._imageURL;
                    };
                };
            };
        },
        
        Select : function(){
            if(this._control && this._control.childNodes[1].focus)
                this._control.childNodes[1].focus();
                
            var _parent = this.TreeView(function(parent){parent.Expanded()});                      

            if(_parent != void 0){
                
                var action = true;
                
                if(_parent.SelectedNodeChanging)
                    action = _parent.SelectedNodeChanging(_parent, this) || true;
                
                if(!action) return false;
                
                if(_parent.SelectedNode != void 0){
                    _parent.SelectedNode._control.className = _parent.SelectedNode._control.className.replace('selected','');
                };

                _parent.SelectedNode = this;
                _parent.SelectedNode._control.className = (_parent.SelectedNode._control.className + ' ' || '') + 'selected';
                
                if(_parent.ToggleOnSelect)
                    this.Toggle();

                if(_parent.SelectedNodeChanged)
                    return _parent.SelectedNodeChanged(_parent, _parent.SelectedNode);

                return true;
            };
            
            return false;
        },
        
        ValuePath : function(){
            var _valuePath = this.Value;
            var _parent = this.Parent;

            while(_parent != void 0){
                _valuePath = _parent.Value + '#PathSeparator#' + _valuePath;
                _parent = _parent.Parent;
            };
            
            _parent = this.TreeView();
            
            var PathSeparator = '\\';
            if(_parent) PathSeparator = _parent.PathSeparator || '\\';
                
            return _valuePath.replace(/#PathSeparator#/g,PathSeparator);
        },
        
        Toggle : function(value, recursive){
            if(this.ChildNodes._control){
                var isExpanded = this.IsExpanded();
                var isExpanding = ((value != void 0 ? 
                                      (value  ? '' : 'none') :
                                      (this.ChildNodes._control.style.display == 'none' ? '' : 'none')) == '');
                
                
                var _parent = this.TreeView();
                            
                var action = true;
            
                if(_parent != void 0)
                   if(!isExpanded && isExpanding && _parent.BeforeExpand)
                        action = _parent.BeforeExpand(_parent, this) || true;
                    else if(isExpanded && !isExpanding && _parent.BeforeCollapse) 
                        action = _parent.BeforeCollapse(_parent,this) || true;       
                
                if(!action) return false;
                
                this.ChildNodes._control.style.display = (isExpanding ? '' : 'none');                                                        
                
                var _div = this._control.getElementsByTagName('div')[0];                
                _div.className = 'hitarea ' + (!isExpanding ? 'expandable' : 'collapsable') + '-hitarea';
                _div.title = (!isExpanding ? 'Expand ' : 'Collapse ') + this.Text;               
                
                this.SetImageURL(this._imageURL, this._imageOpenURL);
                
                if(recursive && this.ChildNodes.length > 0){
                    var index = 0;
                    
                    for(index = 0; index<= this.ChildNodes.length-1; index++){
                        var _node = this.ChildNodes[index];
                        
                        _node.Toggle(value, true);
                    };
                    
                    this.ChildNodes[this.ChildNodes.length-1]._control.className = (this.ChildNodes[this.ChildNodes.length-1]._control.className + ' ') || '' + 'last';
                };
                               
                if(_parent != void 0)                
                   if(isExpanding && _parent.AfterExpand)
                        _parent.AfterExpand(_parent, this);
                    else if(_parent.AfterCollapse) 
                        _parent.AfterCollapse(_parent,this);                        

                return true;
            };

            return false;
        },
        
        Expanded : function(recursive){
            this.Toggle(true, recursive);
        },
        
        Collapsed : function(recursive){
            this.Toggle(false, recursive); 
        },
        
        Find : function(value, recursive){
            var index = 0;

            for(index = 0; index<= this.ChildNodes.length-1; index++){
                var _node = this.ChildNodes[index];
                if(_node.Value == value)
                    return _node;
                else if(recursive)
                    return _node.Find(value, recursive);
            };
            
            return null;
        },
        
        BeginUpdate : function(){
            var treeView = this.TreeView();
        
            if(this.Image && treeView){
                this.Image.style.display = '';
                this.Image.src = treeView.UpdateImageURL;
                this._isUpdating = true;
            };
        },
        
        EndUpdate: function(){
            this._isUpdating = false;
            this.SetImageURL(this._imageURL, this._imageOpenURL);
        },
        
        Visible : function(value){
            if(this._control)
                this._control.style.display = value ? '' : 'none';
                
            return this._control.style.display == '';                
        },
        
        Level : function(){
            var level = 0;
            var _parent = this.Parent;

            while(_parent != void 0){
                level++;
                _parent = _parent.Parent;
            };
            
            return level;
        },
        
        IsSelected : function(){
            var treeView = this.TreeView();
            
            return (treeView && treeView.SelectedNode == this);
        },
        
        Index : function(){
            
            var treeNodeCollection = null;
            
            try{
                treeNodeCollection = this.Parent != void 0 ? this.Parent.ChildNodes : this.TreeView().Nodes;
            } catch(e){}
            
            if(treeNodeCollection != void 0){
                for(var index = 0; index<= treeNodeCollection.length-1; index++){                    
                    if(treeNodeCollection[index] == this)
                        return index;
                };
            };
            
            return -1;
        },
        
        AllowKeyNavigation : true
    };
    
    this.treeNode._init();
    
    return this.treeNode;
}