require(['app'], function(app){
app.routers.bsaRouter=Backbone.Router.extend({
    routes:{
		":lang/bsa_list":"bsa_list",
		
		":lang/bsa_edit":"bsa_edit",
		
		
    },
		   
	bsa_list:function(e,servizio){
    
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.bsa_listView=new app.views.bsa_list;
        app.global.bsa_listView.initialize();
    	app.global.bsa_listView.render();
    	$("#content").html(app.global.bsa_listView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
        
	
	bsa_edit:function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.bsa_editView=new app.views.bsa_edit;
        app.global.bsa_editView.initialize();
    	app.global.bsa_editView.render();
    	$("#content").html(app.global.bsa_editView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}
	
			
}); 
return app.routers.bsaRouter;
}); 
  