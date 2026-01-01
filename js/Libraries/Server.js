import {   Client  		} 	from './Client.js';

export class Server{
	
/*
	let client =
	{
		"id"				:		0,      			enviar data int
		"parentid"			:		"",					enviar data int
		"model"				:		"",					null | siempre
		"entity"			:		model, 				enviar data object | array
		"filter"			:		"",					enviar data string	
		"data"				:		"",					enviar data string | array 
		"typeof" 			:		"html_element",		enviar type of model 
		"cardinality" 		:		"object",			enviar object 	| collection
		"namespace"   		:		"Models"			"Models" 
	} 
*/

	
	//0
	constructor(){
		this.url = "";
		this.client = new Client(
			0,			
			0,					
			"",						
			"",						
			"",						
			"",						
			"",						
			"", 				
			"Models"   				
		);
	}
	
 
	
	
	/* 	
		JSON Request  JSON Response
		1
	*/	
	async  GetObjectByID(id) 
	{
		 
		
		this.client.id = id;
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	

	
	async  GetCollection() 
	{
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}
	


	/* 	
		JSON Request  JSON Response
		3
	*/	
	async  GetCollectionByObject(model,modelName) 
	{
		
		this.client.model 			= 	'';
		this.client.filter 			= 	'';
		this.client.data 			= 	'';
		this.client.type 			= 	modelName;
		this.client.entity 			= 	JSON.stringify(model);
		this.client.cardinality 	= 	'object';
		this.client.parentID 		= 	0;
		this.client.id 				= 	0;
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	

	

	/* 	
		JSON Request  JSON Response
		4
	*/	
	async  GetCollectionByFilter(filter) 
	{
		 
		this.client.filter 	= filter;
		 
		
		let response = await fetch(
			this.url, 
			{
				method		: 'POST',
				headers		: 
				{
					'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	
	
	
	
	/* 	
		JSON Request  JSON Response
		5
	*/	
	async  GetCollectionByParentID(parentID) 
	{
		
		this.client.id 			= 0;
		this.client.parentID 	= parentID;
		 
		
		let response = await fetch(
			this.url, 
			{
				method		: 'POST',
				headers		: 
				{
					'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	


	/* 	
		JSON Request  JSON Response
		10
		model 		: 	object 
		modelName  	: 	type of objects
		action     	:	C U D  ya como propiedad del objeto
	*/	
	async  PostObject(model, modelName) 
	{
 
		
		this.client.model 			= 	'';
		this.client.filter 			= 	'';
		this.client.data 			= 	'';
		this.client.type 			= 	modelName;
		this.client.entity 			= 	JSON.stringify(model);
		this.client.cardinality 	= 	'object';
		this.client.parentID 		= 	0;
		this.client.id 				= 	0;
		 
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	



	/* 	
		JSON Request  JSON Response
		11
		collection : 	Array of objects 
		modelName  : 	type of objects
		action     :	C U D 
		
	*/	
	async  PostCollection(collection, modelName) 
	{
		
		this.client.model 			= 	'';
		this.client.filter 			= 	'';
		this.client.data 			= 	'';
		this.client.type 			= 	modelName;
		this.client.entity 			= 	JSON.stringify(collection);
		this.client.cardinality 	= 	"collection";
		this.client.parentID 		= 	0;
		this.client.id 				= 	0;

		
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	
	 



	/* 	
		JSON Request  JSON Response
		10
		Eliminar?
	*/	
	async  RemoveObject(id) 
	{
		
		this.client.id	= id;
		 
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	



	/* 	
		JSON Request  JSON Response
		10
		Optativa 
		no todos tienen parentID
	*/	
	async  RemoveCollectionByParentID(parentID) 
	{
		
		this.client.parentID	= parentID;
		 
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}
	 
	 
	/* 	
		Files to Server
		12
	*/	
	async  PostFiles(data)
	{
		
		this.client.data 	= data;
		
		const formData = new FormData();
		 
		for (const file of this.client.data ) {
			formData.append(file.name, file.files[0]);
		}		
		
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 		formData
		});
		
		data 		= await response.json();
		 
		return data;
	}	 



	/* 	
		Files to Client
		12
		Pendiente la descarga
	*/	
	async  GetFiles()
	{
		
		let response = await fetch(
			this.url, {
			method		: 'POST',
			headers		: 
			{
				'Content-Type'	: 	'application/json;charset=utf-8'
			},
			body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.blob();
		var file 		= window.URL.createObjectURL(blob);
		window.location.assign(file); 
		return data;
	}	 
	 
	 
	 

	/* 	
		JSON Request  JSON Response
		6
	*/	
	async  GetJSONtoDOM() 
	{
		
		this.client.parentID 	= id;
		 
		
		let response = await fetch(
			this.url, 
			{
				method		: 'POST',
				headers		: 
				{
					'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		return data;
	}	 
	 


	/* 	
		JSON Request  HTML Response
	*/	
	async  GetResponse() 
	{
		 
		 
		console.log(this.url);
		let response = await fetch(this.url, 
		{
				method		: 'POST',
				headers		: 
				{
					'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
		});
		
		let data 		= await response.json();
		 
		 
		return data;
	}	
	
	
	
	async  GetResponseText(id) 
	{
	    let data = {};
		
		
		
		this.client.id = id || 0;
		
		try{
			
			
			let response = await fetch(this.url, 
			{
				method		: 	'POST',
				headers		: 	{
						'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
			}).then(function(res) {                      // first then()
				  if(res.ok)
				  {
				 
					var str = res.headers.get("Content-Type");		
					var strArray  = str.split(";");	
					var responseType = strArray[0];
					 
					switch(responseType){
						case 'text/html':
							return res.text();
							break;
						case 'application/json':
							return res.json();
							break;			
						case 'application/pdf':
							return res.blob();
							break;							
					}
					         
				  } else if(res.status == 403){
						console.log("Contenido prohibido");  
				  }	else if(res.status == 500){
						console.log("Error en el servidor");  
				  }else if(res.status == 404){
						console.log("Recurso no encontrado");  
				  }
				  
				  
                   
				  throw new Error('');
			})  
			.then(function(text) {                          // second then()
				 
				data = text;
				
			})  
			.catch(function(error) {                        // catch
				console.log('Error en la petición');
			});
			
			
	 
						
		} catch(e){
			console.log(e.message);
		}
	 
		return data;
	}
	 
	 
	handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
	
    return response;
}
	
	async  GetResponseTextFilter(filter) 
	{
	    let data = {};
		
		
		
		this.client.filter = filter || 0;
		
		try{
			
			
			let response = await fetch(this.url, 
			{
				method		: 	'POST',
				headers		: 	{
						'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
			}).then(function(res) {                      // first then()
				  if(res.ok)
				  {
				 
					var str = res.headers.get("Content-Type");		
					var strArray  = str.split(";");	
					var responseType = strArray[0];
					 
					switch(responseType){
						case 'text/html':
							return res.text();
							break;
						case 'application/json':
							return res.json();
							break;			
						case 'application/pdf':
							return res.blob();
							break;							
					}
					         
				  } else if(res.status == 403){
						console.log("Contenido prohibido");  
				  }	else if(res.status == 500){
						console.log("Error en el servidor");  
				  }else if(res.status == 404){
						console.log("Recurso no encontrado");  
				  }
				  
				  
                   
				  throw new Error('');
			})  
			.then(function(text) {                          // second then()
				 
				data = text;
				
			})  
			.catch(function(error) {                        // catch
				console.log('Error en la petición');
			});
			
			
	 
						
		} catch(e){
			console.log(e.message);
		}
	 
		return data;
	}
	 
	 
	handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
	
    return response;
}	
	 
	 
	 
	async  GetResponseTextObject(model,modelName) 
	{
	    let data = {};
		
		
		
		this.client.model 			= 	'';
		this.client.filter 			= 	'';
		this.client.data 			= 	'';
		this.client.type 			= 	modelName;
		this.client.entity 			= 	JSON.stringify(model);
		this.client.cardinality 	= 	'object';
		this.client.parentID 		= 	0;
		this.client.id 				= 	0;
		
		try{
			
			
			let response = await fetch(this.url, 
			{
				method		: 	'POST',
				headers		: 	{
						'Content-Type'	: 	'application/json;charset=utf-8'
				},
				body: 	JSON.stringify(this.client)
			}).then(function(res) {                      // first then()
				  if(res.ok)
				  {
				 
					var str = res.headers.get("Content-Type");		
					var strArray  = str.split(";");	
					var responseType = strArray[0];
					 
					switch(responseType){
						case 'text/html':
							return res.text();
							break;
						case 'application/json':
							return res.json();
							break;			
						case 'application/pdf':
							return res.blob();
							break;							
					}
					         
				  } else if(res.status == 403){
						console.log("Contenido prohibido");  
				  }	else if(res.status == 500){
						console.log("Error en el servidor");  
				  }else if(res.status == 404){
						console.log("Recurso no encontrado");  
				  }
				  
				  
                   
				  throw new Error('');
			})  
			.then(function(text) {                          // second then()
				 
				data = text;
				
			})  
			.catch(function(error) {                        // catch
				console.log('Error en la petición');
			});
			
			
	 
						
		} catch(e){
			console.log(e.message);
		}
	 
		return data;
	}
	 
	 
	handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
	
    return response;
}	
}