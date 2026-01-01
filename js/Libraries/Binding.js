export class Binding{

	constructor(entity){
		 
		 
		 
		try{
			
			let _this 			= this
			
			this.element 		= entity.element
			this.value 			= entity.object[entity.property]
			this.attribute 		= entity.attribute;
			 
			 
			
			this.valueGetter 	= function(){
				return _this.value;
			}
			
			this.valueSetter 	= function(val){
				_this.value 						= val
				_this.element[_this.attribute] 		= val
				
				 
			}

			if(entity.event){
				
				this.element.addEventListener(entity.event, function(event){
					  
					if( _this.element.getAttribute("type") == 'checkbox'){
						
						if(_this.element.checked == true){
							_this.value 	= 1; 	
						} else {
							_this.value 	= 0;	
						}
					} else {
						_this.value 	= _this.element[_this.attribute];
						/*
						 //Esta expresion es especifica para un objeto o modelo no para todos, lo cual es un error que este asi: 
						 entity.object['total'] 	= (entity.object['quantity'] * entity.object['price']) - entity.object['discount'];
						*/
					}
					
					
				})       
			}

			Object.defineProperty(entity.object, entity.property, {
				get: this.valueGetter,
				set: this.valueSetter
			});

			entity.object[entity.property] 	= this.value;
			
			
			 
			this.element[this.attribute] = this.value			 
			 
		} catch(ex){
			console.log(ex.message);			 
		}
		 
	}
}