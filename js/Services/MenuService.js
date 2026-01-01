import {   Server  				} 	from './../Libraries/Server.js';
 
export class MenuService {
 
 
 
	//Controller/Action
	constructor(){
		try{
			//New Model
			this.model 				= 	{};
			this.collection 		= 	[];
			this.controllerName		=   'menu';
 	
			this.server 			= 	new Server();
			this.modelName			= 	'sys_menu';
			
			this.appRoute			= 	window.location.origin + '/' + window.location.pathname.split ('/') [1] + '/';
			
			this.api				=   "/HospitalAPI/";
			
		} catch(ex){
			console.log(ex.message); 	 
		}
		 
	}
	
	
	
	/*
		Create  Object
		id 		= 0;
		action 	= 0;
	*/		
	async addRow(model){
		 
		try{
			this.server.url 	= 	 this.api + "menu/addRow";
 			var responseModel   =    await this.server.PostObject(model, this.modelName);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
	}


	/*
		Create Collection
		id 		= 0;
		action 	= 0;
	*/		
	async addRows(collection){
		 
		try{
			this.server.url 	= 	 this.api + "menu/addRows";
 			var responseModel   =    await this.server.PostCollection(collection, this.modelName);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
	}	
	
	/*
		Update object
		id 		> 0;
		action 	= 0;
	*/	
	async editRow(model){
		try{
			this.server.url 	= 	 this.api + "menu/editRow";
 			var responseModel   =    await this.server.PostObject(model, this.modelName);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
		 
	}
	

	/*
		Update Collection
		id 		> 0;
		action 	= 0;
	*/	
	async editRows(collection){
		try{
			this.server.url 	= 	 this.api + "menu/editRows";
 			var responseModel   =    await this.server.PostCollection(collection, this.modelName);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
		 
	}	
	
	
	
	/*
		Delete object
		id 		> 0;
		action 	= 1;
	*/		
	async removeRow(id){
		try{
			this.server.url 	= 	 this.api + "menu/removeRow";
 			var responseModel   =    await this.server.RemoveObject(id);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
		 
	}	
	
	
/*
		Delete Collection
		id 		> 0;
		action 	= 1;
	*/		
	async removeRows(collection){
		try{
			this.server.url 	= 	 this.api + "menu/removeRows";
 			var responseModel   =    await this.server.PostCollection(collection, this.modelName);
			return responseModel;
		}catch(e){
			console.log(e.message);
		}
		 
	}	
	
	
	/*
		getObject/id 
		id 		> 0;
		action 	= 0;
	*/		
	async getObject(id){
		this.server.url 		= 	this.api + "menu/getObject";
		this.response 			= 	await this.server.GetObjectByID(id);
		this.model 				= 	this.response;
		return this.model;	 
	}	
	

	/*
		Get/id 
		id 		> 0;
		action 	= 0;
	*/
	async getCollection(){
		this.server.url 		= 	this.api + "menu/getCollection";
		this.response 			= 	await this.server.GetCollection();
		this.collection 		= 	this.response;
		return this.collection;			 
	}



	/*
		
	*/	
	async getCollectionFilter(filter){
		this.server.url 		= 	this.api + "menu/getCollectionsFilter";
		this.response 			= 	await this.server.GetCollectionsFilter(filter);
		this.collection 		= 	this.response;
		return this.collection;	 
	}
	
	/*
 
	*/	
	async getCollectionFilterAll(model){
		this.server.url 		= 	this.api + "menu/getCollectionFilterAll";
		this.response 			= 	await this.server.GetCollertionFilterAll(model);
		this.collection 		= 	this.response;
		return this.collection;	 
	}

	/*
 
	*/	
	async getCollectionByParentID(id){
		this.server.url 		= 	this.api + "menu/getCollectionByParentID";
		this.response 			= 	await this.server.GetCollectionByParentID(id);
		this.collection 		= 	this.response;
		return this.collection;	 
	}	 
	

	/*
 
	*/
	async getCollectionByReflectionID(id){
		this.server.url 		= 	this.api + "menu/getCollectionByReflectionID";
		this.response 			= 	await this.server.GetCollectionByParentID(id);
		this.collection 		= 	this.response;
		return this.collection;	 
	}	
	
	async getCollectionParents(id){
		this.server.url 		= 	this.api + "menu/getCollectionParents";
		this.response 			= 	await this.server.GetCollectionByParentID(id);
		this.collection 		= 	this.response;
		return this.collection;	 
	}

 	/*
 
	*/	
	async getMenuJSON(id){
		this.server.url 		= 	this.api + "menu/getMenuJSON";
		this.response 			= 	await this.server.GetCollectionByParentID(id);
		this.collection 		= 	this.response;
		return this.collection;	 
	}
 
 
}
	
 