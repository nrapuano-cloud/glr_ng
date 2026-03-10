require(['app'], function(app){
app.routers.docRouter=Backbone.Router.extend({
    routes:{
		
		
		":lang/doc":"doc",
    },
	
	doc:function(e,b){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();
           
		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.docView=new app.views.doc;
		app.global.docView.render();
		$("#content").html(app.global.docView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
            }},   
			
}); 
return app.routers.docRouter;
}); 
  