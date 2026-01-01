import {   Menu  					} 	from './../Services/menu.js';

export class Router{

	constructor(parentID){
		try{
		
			let that  = this;
			that.myMenu = new Menu();
			that.myRoutes 	= [];

			that.arrModels 	= [];
		 
			that.GetCollection();
			that.parentID 	= parentID;
		 
			
		} catch(ex){
			console.log(ex.message); 	 
		}
		 
	}
	
	 

	
	async GetCollection(){
	
		let that = this;
		
		let menu; 
		let promise_dom = that.myMenu.getMenuJSON(41).then( response => {
			that.arrModels 	= response.collection.routes;
			let display 	= response.collection.display;
			menu = '';
			display.forEach(function(item){
					menu	+=			'<li class="sidenav-item">';
					menu	+=			'	<a href="javascript:void(0)" class="sidenav-link sidenav-toggle">';
					menu	+=			'	  <i class="sidenav-icon ion ion-md-speedometer"></i>';
					menu	+=			'	  <div>' + item.optionName + '</div>';
					menu	+=			'	</a>';
					menu	+=			'	<ul class="sidenav-menu">'
					if(item.childs.length > 0 ){
							item.childs.forEach(function(node){
								menu += '<li class="sidenav-item ">';
								menu += "	<a class='sidenav-link' href='" + node.pathString  + "'><div>" + node.optionName  + '</div></a>';
								menu +='</li>';
							})
					}
					menu+=			'	</ul>'
					menu+=			'</li>'			
			});
			
			document.getElementById("renderMenu").innerHTML = menu;
		},error => {
			console.log(error);	
		});		
				
	}


 
	SetRoute(){
	
			 
			let that = this;
			that.params = {id : 0 };
			const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
			
			const getParams = match => {
				const values = match.result.slice(1);
				const keys = Array.from(match.route.pathString.matchAll(/:(\w+)/g)).map(result => result[1]);

				return Object.fromEntries(keys.map((key, i) => {
					return [key, values[i]];
				}));
			};
			
			
				// Test each route for potential match
			const potentialMatches = that.arrModels.map(route => {
				return {
					route: route,
					result: window.location.hash.match(pathToRegex(route.pathString))
				};
			});

			 

			let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
			let newRoute = "";
			
			
			if (!match) {
				console.log("Does NOT Match");
				match = {
					route: routes[0],
					result: [location.pathname]
				};
				
				
			} else {
				this.params = getParams(match);
				console.log("Match"); 			
			}
			
				
				let controller 		  		= 	match.route.controllerName;
				let folder					= 	match.route.folder;
				let className				= 	match.route.className;
				
				let pathToView = "../Views/" + folder + "/" + className.trim()  + ".js";
			 
				 
			 
				import(pathToView).then((module) => {
					console.log(module);
					let newModel = module.default;
					if(newModel !=undefined){
						let objectToConstruct 	= 	newModel;
						let objView = new objectToConstruct(that.parentID,controller);
			 
						if(typeof this.params.id == null){
							objView.SetView();
						}  else {
							objView.SetView(this.params.id);
						}				
					}
					
				});			
			 
//			return false;
/*
			const potentialMatches = that.arrModels.filter(route => route.pathString.trim() === window.location.hash.trim());
			 
			if(potentialMatches.length > 0){
				
				
				let controller 		  		= 	potentialMatches[0].controllerName;
				let folder					= 	potentialMatches[0].folder;
				let className				= 	potentialMatches[0].className;
				
				let pathToView = "../Views/" + folder + "/" + className.trim()  + ".js";
			 
			 
				import(pathToView).then((module) => {
					let newModel = module.default;
					if(newModel !=undefined){
						let objectToConstruct 	= 	newModel;
						let objView = new objectToConstruct(that.parentID,controller);
			 
						if(typeof this.params.id == null){
							objView.SetView();
						}  else {
							objView.SetView(this.params.id);
						}				
					}
					
				});				
				 
				
		    } else {
				console.log("No hay coincidencias...");
			}		
*/		
	}
 
}
	
 