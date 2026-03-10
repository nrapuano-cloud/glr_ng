require(['app'], function(app){
app.routers.magRouter=Backbone.Router.extend({
    routes:{
		":lang/mag/:adr":"mag",
		
		":lang/mag_edit/:adr":"mag_edit",
		
		
    },
		   
	mag:function(lang,adr){
		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.magView=new app.views.mag;
        app.global.magView.initialize();
    	app.global.magView.render(adr);
		
    	$("#content").html(app.global.magView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
        
	
	mag_edit:function(lang,adr){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.mag_editView=new app.views.mag_edit;
        app.global.mag_editView.initialize();
    	app.global.mag_editView.render(adr);
    	$("#content").html(app.global.mag_editView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}
	
			
}); 
return app.routers.magRouter;
}); 
  