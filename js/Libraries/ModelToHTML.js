import {   Binding  	} 	from './Binding.js';

export class ModelToHTML{
	
	constructor(){
		this.model = {};
		 
	}
	
	
	SetBinding(model){
		
		this.model = model
		
		for (const property in this.model) {
			
			if(document.getElementById(property)){											
				let element = document.getElementById(property);
				let binding = 		new Binding({
					//JAVASCRIPT
					'object'		: 	this.model, 	//Javascript Model | Class User{ userName: 'jose',age:34}
					'property'		: 	property,		//Name of property | userName
					//HTML
					'element'		: 	element,  		//html element <input type="text">
					'attribute'		: 	'value',		//<input type="text" value='jose'>
					'event' 		: 	'change'        //click, change,enter
				});
			}
		}		
	}
	
	
	Validate(model){
		
		let isValid = false;
		let totalError = 0;
		this.model = model
		for (const property in this.model) {
			
			if(document.getElementById(property)){											
				 let element = document.getElementById(property);
				 
				 if (!element.checkValidity()) {
					 totalError++;
				 }
				 
				  if (element.validity.tooLong) {
					totalError++;;
				  }
					
			}
		}

		if(totalError == 0){ isValid = true;}
		
		return isValid;
		
	}
	
}