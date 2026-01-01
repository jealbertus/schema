import {   Router  			} 	from './Libraries/Router.js';
 

const navigateTo = url => {
    history.pushState({}, 'newUrl', url);
    router();
};

const router = async () => {
	 
	let route = new Router("app-root");
	
	 
	let t = setTimeout(function(){
		route.SetRoute();
	},500);

	
};

const init = () => {
	 
	
	window.addEventListener("hashchange", () => {
		
		navigateTo(window.location.hash);
		
	});
	 
	 
	 navigateTo(window.location.hash);
};

window.addEventListener("load", init);



 