require(['app'], function(app){
app.routers.rfaRouter=Backbone.Router.extend({
    routes:{
		":lang/rfa_approva":"rfa_approva",
		":lang/rfa_new":"rfa_new",
		":lang/rfa_view":"rfa_view",
		":lang/rfa_ddt":"rfa_ddt",
		":lang/rfa_nad":"rfa_nad",
		":lang/rfa_vad":"rfa_vad",
		":lang/rfa_nag":"rfa_nag",
		":lang/rfa_vag":"rfa_vag",
		":lang/rfa_fornitori":"rfa_fornitori",
		":lang/rfa_schede/:tipo":"rfa_schede",
		":lang/rfa_sanificazioni/:tipo":"rfa_sanificazioni",
		":lang/rfa_management":"rfa_management",
		":lang/rfa_sanificazioni":"rfa_sanificazioni",
		
    },
	
    rfa_approva:function($key,$tokenKey){
        app.global.tokenKey=$tokenKey;
        
    	app.utils.loadTokens();
        if (app.global.tokensCollection.length == 0) {
			app.routers.router.prototype.index();
               }else{	
    	var e=app.utils.getLanguage();
      
        app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);
        app.global.tokenKey=$tokenKey;
    	
    	app.global.rfa_approvaView=new app.views.rfa_approva;
    	app.global.rfa_approvaView.render();
    	$("#content").html(app.global.rfa_approvaView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }
    },   
    
    rfa_fornitori:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_fornitoriView=new app.views.rfa_fornitori;
    	app.global.rfa_fornitoriView.render();
    	$("#content").html(app.global.rfa_fornitoriView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
    rfa_ddt:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_ddtView=new app.views.rfa_ddt;
    	app.global.rfa_ddtView.render();
    	$("#content").html(app.global.rfa_ddtView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},    
    rfa_schede:function(e,tipo){
      
        app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    		
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();
       
    	app.global.navbarView=new app.views.navbar;
        app.global.navbarView.render();
    	
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_schedeView=new app.views.rfa_schede;
       
    	app.global.rfa_schedeView.render(tipo);
    	$("#content").html(app.global.rfa_schedeView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }
        },    
    rfa_new:function(){
          app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    		
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_newView=new app.views.rfa_new;
    	app.global.rfa_newView.render();
    	$("#content").html(app.global.rfa_newView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
        
    rfa_view:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_viewView=new app.views.rfa_view;
    	app.global.rfa_viewView.render();
    	$("#content").html(app.global.rfa_viewView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
    rfa_management:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_managementView=new app.views.rfa_management;
    	app.global.rfa_managementView.render();
    	$("#content").html(app.global.rfa_managementView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
    
    rfa_nad:function(){
          app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    		
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_nadView=new app.views.rfa_nad;
    	app.global.rfa_nadView.render();
    	$("#content").html(app.global.rfa_nadView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
        
    rfa_vad:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_vadView=new app.views.rfa_vad;
    	app.global.rfa_vadView.render();
    	$("#content").html(app.global.rfa_vadView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},   
    rfa_nag:function(){
          app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    		
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_nagView=new app.views.rfa_nag;
    	app.global.rfa_nagView.render();
    	$("#content").html(app.global.rfa_nagView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
        
    rfa_vag:function(){
    	  app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{	
    	//app.utils.loadTokens();
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rfa_vagView=new app.views.rfa_vag;
    	app.global.rfa_vagView.render();
    	$("#content").html(app.global.rfa_vagView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
        }},
		rfa_sanificazioni:function($key,$tokenKey){
			app.global.tokenKey=$tokenKey;
			
			app.utils.loadTokens();
			if (app.global.tokensCollection.length == 0) {
				app.routers.router.prototype.index();
				   }else{	
			var e=app.utils.getLanguage();
			
			app.global.navbarView=new app.views.navbar;
			app.global.navbarView.render();
			$("#navbar_content").html(app.global.navbarView.el);
			app.global.tokenKey=$tokenKey;
			
			app.global.rfa_sanificazioniView=new app.views.rfa_sanificazioni;
			app.global.rfa_sanificazioniView.render();
			$("#content").html(app.global.rfa_sanificazioniView.el);
	
			app.global.footerView=new app.views.footer;
			app.global.footerView.render();
			$("#footer_content").html(app.global.footerView.el);
			this.navigate("#!"+e,{trigger:false})
			}
		},   
			
}); 
return app.routers.rfaRouter;
}); 
  