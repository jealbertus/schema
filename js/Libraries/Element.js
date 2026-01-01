import {   EventBinding  	} 		from  './EventBinding.js';



export class Element{



	constructor(type){

		try{
			const $ 				= 	new EventBinding();
			this.element 			= 	document.createElement(type);
			this.element.innerHTML 	= 	""; 
			 
		 } catch(ex){
			console.log(ex.message);			 
		 }
		 
	}
	
	
	addEvent(eventName,callback){

		this.element.addEventListener( eventName, callback);
	}
	
	
	
	setAttribs(attribs){
		  
		 try{
			 
			if( Array.isArray(attribs) ){
				 
				this.attribs = attribs;
				this.attribs.forEach( (item,index ) => {
					
					if(item.attribName == "text"){
						var text = document.createTextNode( item.attribValue );
						this.addNode( text);
					} else {
						this.element.setAttribute(item.attribName,item.attribValue );
					}
					
				})
			} else {
				console.log("No es un array!! es : " + typeof attribs)
			}
			 
			 
		 } catch(ex){
			console.log(ex.message);			 
		 }		
		 
	}	
	
	
	
	addNode(node){
		 try{
			this.element.appendChild(node);
			 
		 } catch(ex){
			console.log(ex.message);			 
		 }		
	}	
	
	
	
	getElement(){
		return this.element;
	}
	
	
	
	
	
}