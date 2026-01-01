import {   Element   			} 	from './Element.js';
import {   Binding  			} 	from './Binding.js';
import {   EventBinding  		} 	from './EventBinding.js';

/*
    Datos dinamicos desde catalogos
*/

import {   Tipo 				    } 	from './../DAO/Tipo.js';
import {   ComponenteP  			} 	from './../DAO/ComponenteP.js'; 

export class HTML {
	
	
	
	constructor(){
		
		/*
			Collection of Models
		*/
		
		window.COLLECTION		= 	[];
		
		
		window.htmlCOLLECTION	= 	[];
		window.htmlMATRIX		= 	[];
		
		/* 
			Single Model
		*/
		window.MODEL			=   {};
		window.MODELhtml		=   {};
		
		
		this.dataSources = [
	 
		 { path: "Tipo" 		,		jsClass : Tipo			},
		 { path: "Componente" 	,		jsClass : ComponenteP	},
		];

		this.previousID = 0;
		this.rowID = 0;
		this.objecto = {};
		this.newRow = {};
		this.currentRow = {};
		this.index = 0;

		this.elementHTML		= null;
		
	}	
	
	
	SetObjectHTML(model,HTMLprototype, parent ){
		that.ProcesarObjeto(model,HTMLprototype,parentHTML);
	}
	
	
	ProcesarObjeto(model,HTMLprototype,parent){
		try{
			if( Array.isArray(HTMLprototype) ){
				
				HTMLprototype.forEach(function(el){
					//Crear el elemento
					let element  = new Element(el.elementType);
					
					//Agregar Atributos
					element.setAttribs( el.attribs );
					console.log(element);
					
					//Agregar Datos
							
					if(el.isProperty){
						
						
						let value = Reflect.get(row, el.propertyName);
						
						  
						if( el.elementType == "input" ){
						
							let attribs = [
								{ attribName : 'value', attribValue : value }
							]						
							
							element.setAttribs( attribs );
							
						} else {
						   
						    if(el.hasHTML){
						      let temp =   element.getElement();
						      temp.appendChild(value);
						      console.log(el.hasHTML);
						    } else {
						        	var text = document.createTextNode( value );
							        element.addNode( text);
						    }
						
						}
						
						
						//21/05/2021 si es una imagen
						if( el.elementType == "img" ){
							let attribs = [
								{ attribName : 'src', attribValue : value }
							];

							element.setAttribs( attribs );							
						}
						
						
						if(el.binding){
							 
							//Binding to current model 
							let binding = 		new Binding({
								//JAVASCRIPT
								'object'		: 	row, 					//Javascript Model | Class User{ userName: 'jose',age:34}
								'property'		: 	el.propertyName,		//Name of property | userName
								//HTML
								'element'		: 	element.getElement(),   //html element <input type="text">
								'attribute'		: 	'value',				//<input type="text" value='jose'>
								'event' 		: 	'change'                //click, change,enter
							});					
						   
						}
						
					}  
					
					if(el.hasText){
						var text = document.createTextNode( el.text );
						element.addNode( text);
					}

					if(el.setID){
						let value = Reflect.get(row, 'id');
						let attribs = [
								{ attribName : 'id', attribValue : value }
						];
						
						element.setAttribs( attribs );
					}



					var result = element.getElement();
					 
					 
					/*
						Validar si es un objeto Element o HTML
					*/
					if(	parent instanceof Element	){
						parent.addNode(result);	
					} else {
						parent.appendChild(result);
					}					
					
					//Si tiene hijos
					if(el.hasChilds == true){
						self.ProcesarObjeto( row,el.Childs,element );
					}					
					
					if(el.hasDataSource){
									// Test each route for potential match
						const potentialMatches = self.dataSources.map(route => {
							
							return {
								route: route,
								result: el.dataSource.match(route.path)
							};
						});

						 

						let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
						let newRoute = "";
						
						
						if (!match) {
							console.log('Not found');
						} 

						let objView = new match.route.jsClass();
						let data = objView.getCollection();
						
						
						let promise_dom = objView.getCollection().then( response => {
							
							response.model.forEach( item => {
							
								let sub_element = new Element(el.type);
								 
								let attribs2 =[
									{
										attribName 	: 'value',
										attribValue	:  item.id
									},
								   {
										attribName 	: 'text',
										attribValue	:  item[el.displayField]
									}
								];
								sub_element.setAttribs(attribs2);
								
								element.addNode(sub_element.getElement());
							
							});
						
						});
					
				 
				
					}
			
				});
			}			
		} catch(e){
			console.log(e.message);
		}		
	}
	
	
	SetCollectionHTML(models,HTMLprototype, parent, eventBindings ){
		
		let that = this;
		
		try{
		
			let parentHTML = document.getElementById(parent);
			 
			var self = this;
			//Validar si es un array
			if( Array.isArray(models) ){
				window.htmlMATRIX = [];
				models.forEach(function(model) {
					
					that.ProcesarFila(model,HTMLprototype,parentHTML,eventBindings);
					window.htmlMATRIX.push(  { index: self.index, ...self.currentRow, ...self.objeto } );				
					self.index = self.index + 1; 
				});

			}			
			
			
		} catch(e){
			console.log(e.message);
		}			
		
	}
	
	
	ProcesarFila(row, HTMLprototype,parent,eventBindings){
		
		var self = this;
		self.previousID = Reflect.get(row, 'id');
		self.rowID = Reflect.get(row, 'id');
		//self.currentRow = { rowID : self.rowID };
		 
		
				
		
		try{
			
			
			if( Array.isArray(HTMLprototype) ){
				
				HTMLprototype.forEach(function(el){
					//Crear el elemento
					let element  = new Element(el.elementType);
							
					
					 
					if(el.elementType == "a"){
						//console.log(el.attribs);
					}
					
					if(element.hasAlternateAttribs){
						//Agregar Atributos alternos
						let value = Reflect.get(row, el.relatedProperty);
						
						if(value == "1"){
							element.setAttribs( el.whenTrue );
						} else {
							element.setAttribs( el.whenFalse );
						}
						
					} else {
						//Agregar Atributos por defecto
						element.setAttribs( el.attribs );
					
					}
					
					var uniqueElement = element.getElement();
					 
					
					//Agregar Datos
							
					if(el.isProperty){
						
						
						let value = Reflect.get(row, el.propertyName);
						
						
						if( el.elementType == "input" ){
						
							let attribs = [
								{ attribName : 'value', attribValue : value }
							]						
							
							element.setAttribs( attribs );
							
						} else {
						     
                            if(el.hasHTML){
                                
						      let temp =   element.getElement();
						      temp.innerHTML = value;
						     
						    } else {
						        	var text = document.createTextNode( value );
							        element.addNode( text);
						    }
						}
						
						
						//21/05/2021 si es una imagen
						if( el.elementType == "img" ){
							let attribs = [
								{ attribName : 'src', attribValue : value }
							];

							element.setAttribs( attribs );							
						}
						
						
						if(el.binding){
							//Binding to current model 
							let binding = 		new Binding({
								'object'		: 	row,
								'property'		: 	el.propertyName,
								'element'		: 	element.getElement(),
								'attribute'		: 	'value',
								'event' 		: 	'change'
							});					
							 
						   var nombreCelda = el.propertyName;
						  // window.htmlCOLLECTION.push(self.currentRow);
						  
						   
						    
						   //self.newRow = { id : self.rowID };
						     binding['parentIndex'] = self.index;
						    self.newRow[el.propertyName] = binding
						    //self.newRow['parentIndex'] = self.index;
						   
							self.objeto = { id : self.rowID, ...self.newRow }						  
						    
							
							//Agregar referencia a la matriz de elementos tipo INPUT
							if( el.elementType == "input" ){
							
								let attribs = [
									{ attribName : 'ref', attribValue : self.index }
								]						
								
								element.setAttribs( attribs );
								
							} 		


							//Agregar referencia a la matriz de elementos tipo SELECT
							if( el.elementType == "select" ){
							
								let attribs = [
									{ attribName : 'ref', attribValue : self.index }
								]						
								
								element.setAttribs( attribs );
								
							} 	
							

						}
							
							 					    
				
						
						
					}  
					
					if(el.hasText){
						var text = document.createTextNode( el.text );
						element.addNode( text);
					}

					if(el.setID){
						let value = Reflect.get(row, 'id');
						let attribs = [
								{ attribName : 'id', attribValue : value }
						];
						
						element.setAttribs( attribs );
					}

					

					var result = element.getElement();
					  
					 
						/*
						let $ = new EventBinding();
						let fnServer = new Function([], "console.log('y ...');that.GetRow(id);");
						if(uniqueElement.classList.contains(eventBindings.className)){
							 
							$.SetEvent(uniqueElement,eventBindings.eventName,eventBindings.callback)
						}  					
						*/
					/*
					

						Validar si es un objeto Element o HTML
					*/
					
					//Agregar Eventos
					 
					if(Array.isArray(eventBindings)){
						
						let $ = new EventBinding();
						eventBindings.forEach(function(e){
							if(uniqueElement.classList.contains(e.className)){
								$.SetEvent(uniqueElement,e.eventName,e.callback)
							} 						
						})
							
						
						
					}
					
					if(	parent instanceof Element	){
						parent.addNode(result);	
					} else {
						parent.appendChild(result);
					}					
					
					//Si tiene hijos
					if(el.hasChilds == true){
						self.ProcesarFila( row,el.Childs,element,eventBindings );
					}					
					
					
						/*
						    hasDataSource   : true | false :boolean
						    dataSource      : DAO          :model 
						    hasParameter    : ID           :int
						    [ getCollectionByParentID ]
						    type            : element type :string
						    valueDisplay    : true | false :boolean   
						    
						*/
					
					if(el.hasDataSource){
									// Test each route for potential match
						const potentialMatches = self.dataSources.map(route => {
							
							return {
								route: route,
								result: el.dataSource.match(route.path)
							};
						});

						 

						let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
						let newRoute = "";
						
						
						if (!match) {
							console.log('Not found');
						} 

						let objView = new match.route.jsClass();
						//let data = objView.getCollection();
						
						//04/08/2021
						let init_element = new Element(el.type);
						let attribs_option = [];
						
						attribs_option =[
							{
								attribName 	: 'value',
								attribValue	:  0
							},
						    {
								attribName 	: 'text',
								attribValue	:  'Seleccione'
							}
						];
						
						init_element.setAttribs(attribs_option);
										
						element.addNode(init_element.getElement());						
						

						if(el.hasParameter){ 
						    
						    if(el.IsString){
									let filter = Reflect.get(row, "id");
								
									let promise_dom = objView.getCollectionFilter(el.filter).then( response => {
										
										//Si trae data
										let data = response.model || response.collection;
										if(data.length > 0) {
										data.forEach( item => {
											/*Si lo que se va a mostrar es igual a su valor o es distinto o sea su ID*/
												let sub_element = new Element(el.type);
												let attribs2 = [];
												if(el.valueDisplay){
													
													attribs2 =[
														{
															attribName 	: 'value',
															attribValue	:  item[el.displayField]
														},
													   {
															attribName 	: 'text',
															attribValue	:  item[el.displayField]
														}
													];
												} else {
													attribs2 =[
														{
															attribName 	: 'value',
															attribValue	:  item.id
														},
													   {
															attribName 	: 'text',
															attribValue	:  item[el.displayField]
														}
													];
												}
												
												sub_element.setAttribs(attribs2);
												
												element.addNode(sub_element.getElement());
											
											});
										}
									});							        
						    }
						    
						    if(el.IsInt){
							    let parentID = Reflect.get(row, 'id');
							
    							 let promise_dom = objView.getCollectionByParentID(parentID).then( response => {
    								
    								//Si trae data
    								let data = response.model || response.collection;
    								if(data.length > 0) {
    									data.forEach( item => {
    									/*Si lo que se va a mostrar es igual a su valor o es distinto o sea su ID*/
    										let sub_element = new Element(el.type);
    										let attribs2 = [];
    										if(el.valueDisplay){
    											
    											attribs2 =[
    												{
    													attribName 	: 'value',
    													attribValue	:  item[el.displayField]
    												},
    											   {
    													attribName 	: 'text',
    													attribValue	:  item[el.displayField]
    												}
    											];
    										} else {
    											attribs2 =[
    												{
    													attribName 	: 'value',
    													attribValue	:  item.id
    												},
    											   {
    													attribName 	: 'text',
    													attribValue	:  item[el.displayField]
    												}
    											];
    										}
    										
    										sub_element.setAttribs(attribs2);
    										
    										element.addNode(sub_element.getElement());
    									
    									});
    								}
    							});						        
						    }
						

							
						} else {
						
							let promise_dom = objView.getCollection().then( response => {
								
								let data = response.model || response.collection;
								data.forEach( item => {
								
									let sub_element = new Element(el.type);
									
									 
									 
									let attribs2 =[
										{
											attribName 	: 'value',
											attribValue	:  item.id
										},
									   {
											attribName 	: 'text',
											attribValue	:  item[el.displayField]
										}
									];
									sub_element.setAttribs(attribs2);
									
									element.addNode(sub_element.getElement());
								
								});
							
							});
					
						}
				
					}
					
					
				
				 	
			
				});
				
				 
				
				 
	
				
				//window.htmlMATRIX = { ...currentRow, ...self.objeto };
				//console.log(window.htmlMATRIX);				
			}
			
		} catch(e){
			console.log(e.message);
		}		
			
		
	}




   SetDynamicGrid(models,HTMLprototype, parent, eventBindings){
   
		let that = this;
		
	 
		
			let parentHTML = document.getElementById(parent);
			 
			 
			//Validar si es un array
			if( Array.isArray(models) ){
								
				window.htmlMATRIX = [];
				models.forEach(function(model) {
					
					that.SetTable(model,HTMLprototype,parentHTML,eventBindings);
					window.htmlMATRIX.push(  { index: self.index, ...self.currentRow, ...self.objeto } );				
					self.index = self.index + 1; 					
				});

			}			
			
			
		 		   
   }
   
   
   
   SetTable(row, HTMLprototype,parent,eventBindings){
	var self = this;
	
	 
		self.previousID = Reflect.get(row, 'id');
		self.rowID = Reflect.get(row, 'id');	 
	
	
			 
		
			 
			if( Array.isArray(HTMLprototype) ){
				
				 
				
				
				HTMLprototype.forEach(function(el){
					//Crear el elemento
					/*
						Si elementTypeID es diferente de null
					
					*/
					
 				
					var elementTypeName = 'input';
					let w_elementTypeID = Reflect.get(row, 'elementType');
					let w_columnName 	= Reflect.get(row, 'columnName');
					let w_dynamicDataGrid 	= Reflect.get(row, 'dynamicDataGrid');
					 
					let hasData = Reflect.get(row, 'hasData');
					let position = Reflect.get(row, 'position');
					let data = [];

					if(hasData){
						data = Reflect.get(row, 'data');
						data = JSON.parse(data);
						 
						 
					}


					if(data.length > 0 && el.propertyName == 'position') {
						self.elementHTML  = new Element("select");
						data.forEach( item => {
						
							let sub_element = new Element('option');
							
							 
							 
							let attribs2 =[
								{
									attribName 	: 'value',
									attribValue	:  item.id
								},
							   {
									attribName 	: 'text',
									attribValue	:  item.descripcion
								}
							];
							sub_element.setAttribs(attribs2);
							
							self.elementHTML.addNode(sub_element.getElement());
						
						});						
					} else {
					
						if(el.propertyName.length > 0){
						 
							
							 
								if(el.propertyName == w_columnName){
									if(w_elementTypeID == "2"){
										elementTypeName = 'select'
									 }									 
									
									//Crear el elemento
									self.elementHTML  = new Element(elementTypeName);							
								
								
								} else {
								
									self.elementHTML  = new Element(el.elementType);	
								
								}
							 
							 
						}	else {
						 
							//Crear el elemento
							self.elementHTML  = new Element(el.elementType);
						}
						
						if(typeof self.elementHTML == undefined){
							self.elementHTML  = new Element(el.elementType);
							console.log(el.elementType);
							 
							
						}
				}	 
/*					 

*/				 
 
					if(el.elementType == "a"){
						//console.log(el.attribs);
					}
					//Agregar Atributos
					self.elementHTML.setAttribs( el.attribs );
					
					var uniqueElement = self.elementHTML.getElement();
					
					
					
					//Agregar Datos
							
					if(el.isProperty){
						
						
						let value = Reflect.get(row, el.propertyName);
						
						
						if( el.elementType == "input" ){
						
							let attribs = [
								{ attribName : 'value', attribValue : value }
							]						
							
							self.elementHTML.setAttribs( attribs );
							
						} else {
						     
                            if(el.hasHTML){
                                
						      let temp =   self.elementHTML.getElement();
						      temp.innerHTML = value;
						     
						    } else {
						        	var text = document.createTextNode( value );
							        self.elementHTML.addNode( text);
						    }
						}
						
						
						//21/05/2021 si es una imagen
						if( el.elementType == "img" ){
							let attribs = [
								{ attribName : 'src', attribValue : value }
							];

							self.elementHTML.setAttribs( attribs );							
						}
						
						
						if(el.binding){
							//Binding to current model 
							let binding = 		new Binding({
								'object'		: 	row,
								'property'		: 	el.propertyName,
								'element'		: 	self.elementHTML.getElement(),
								'attribute'		: 	'value',
								'event' 		: 	'change'
							});		


							binding['parentIndex'] = self.index;
							self.newRow[el.propertyName] = binding
		 
								   
							self.objeto = { id : self.rowID, ...self.newRow }		
							
						   
						}
						
					}  
					
 						
					
					
					if(el.hasText){
						var text = document.createTextNode( el.text );
						self.elementHTML.addNode( text);
					}

					if(el.setID){
						let value = Reflect.get(row, 'id');
						let attribs = [
								{ attribName : 'id', attribValue : value }
						];
						
						self.elementHTML.setAttribs( attribs );
					}

					

					var result = self.elementHTML.getElement();			
				//Agregar Eventos
					 
					 if(Array.isArray(eventBindings)){
						
						let $ = new EventBinding();
						eventBindings.forEach(function(e){
							if(uniqueElement.classList.contains(e.className)){
								$.SetEvent(uniqueElement,e.eventName,e.callback)
							} 						
						})
							
						
						
					}
					
					if(	parent instanceof Element	){
						parent.addNode(result);	
					} else {
						parent.appendChild(result);
					}					
					
					//Si tiene hijos
					if(el.hasChilds == true){
						self.SetTable( row,el.Childs,self.elementHTML,eventBindings );
					}									
					
									
				
				})
				
				
			}
				
   
   }
   
   
   
   
}