
function SearchSort(table, index){
	//alert(1);
	var KeyArray = new Array();
	var TrArray   = new Array();
	var SortArray = new Array();
	
	var resultTable = document.getElementById( "resultTable" );
		var childtbody = resultTable.getElementsByTagName( "tbody" );
		
		
		
		for( var i =0; i < childtbody.length ;i++ ){
			
			var bodyTr = childtbody[i].getElementsByTagName( "tr" ) ;
			
			
			KeyArray = new Array(bodyTr.length);
			TrArray   = bodyTr ;
			SortArray = new Array(bodyTr.length);
			
			for( var j =0; j < bodyTr.length ;j++ ){
				var bodyTd = bodyTr[j].getElementsByTagName( "td" ) ;
				
				//alert(bodyTd[index].innerHTML);
				KeyArray[j] = bodyTd[index].innerHTML ;
				SortArray[j] = bodyTd[index].innerHTML + "@" + j ;
				
				
				
				
				
				for( var k =0; k < bodyTd.length ;k++ ){
					if( bodyTd[k].firstChild != null ){
						
						
						
						
						if( bodyTd[k].firstChild.id == "SelectedOid" &&  bodyTd[k].firstChild.checked ){

							var counter_Length =  CheckCount.length;
		    				CheckCount.length ++;
		    				
		    				var tempTr = bodyTr[j].cloneNode(true);
		    				
		    				//single 로 넘어왔으면  checkbox로 변환해서 넘김

		 
		    				
		    				
		    					var tempBodyTd = tempTr.getElementsByTagName( "td" ) ;
		    					 
		    					
		    					//alert(tempBodyTd[index]);
 		    	   				//for( var m =0; m < tempBodyTd.length ;m++ ){
		    	   					if( tempBodyTd[0].firstChild != null ){
		    	   						
		    	   						if( tempBodyTd[0].firstChild.id == "SelectedOid" ){
		    	   							
		    	   							var type		= tempBodyTd[0].firstChild.type;
		    	   							var id		= tempBodyTd[0].firstChild.id;
		    	   							var name	= tempBodyTd[0].firstChild.name;
		    	   							var value	= tempBodyTd[0].firstChild.value;
		    	   							
		    	   						
		    	   					        tempBodyTd[0].removeChild( tempBodyTd[0].firstChild );
		    	   					        
		    	   					        var input = document.createElement( "INPUT" ) ;
		    	   					        
		    	   					        input.type	=	"checkbox";
		    	   					        input.id		=	id;
		    	   					        input.name	=	name;
		    	   					        input.value	=	value;
		    	   	    	           
		    	   					        tempBodyTd[0].appendChild( input );
		    	   					      
		    	   						
		    	   						}
		    	   					}
		    	   				//}
		    		
		    				
		    			 //parent의 요청형식이 관리를 포함하고 있는지를 구분
		    				if( IsUseBom ){
		    					
		    				}else{
		    					tempTr = deleteBomTd( tempTr , bomManager );
		    				}
		    				CheckCount[counter_Length]=tempTr;
		    				
						}
					}
				}
			}	
			SortArray.sort();
			for(var a=0 ;a < SortArray.length;a++){
				alert(SortArray[a]);
				
				var temp = SortArray[a].split("@");
				
				alert(temp[0]);
				
			}
			
		}
	
	
}

