require(['app'], function(app){
app.routers.gapRouter=Backbone.Router.extend({
    routes:{
		":lang/gap_adm":"gap_adm",
		":lang/gap_doc_new":"gap_doc_new",
		":lang/gap_doc_view":"gap_doc_view",
		":lang/gap_pma":"gap_pma",
		
    },
	gap_adm:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.gap_admView=new app.views.gap_adm;
    	app.global.gap_admView.render();
    	$("#content").html(app.global.gap_admView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
    gap_doc_new:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.gap_doc_newView=new app.views.gap_doc_new;
    	app.global.gap_doc_newView.render();
    	$("#content").html(app.global.gap_doc_newView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
     gap_doc_view:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.gap_doc_viewView=new app.views.gap_doc_view;
    	app.global.gap_doc_viewView.render();
    	$("#content").html(app.global.gap_doc_viewView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
    gap_doc_list:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.gap_doc_listView=new app.views.gap_doc_list;
    	app.global.gap_doc_listView.render();
    	$("#content").html(app.global.gap_doc_listView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
    gap_pma:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.gap_pmaView=new app.views.gap_pma;
    	app.global.gap_pmaView.render();
    	$("#content").html(app.global.gap_pmaView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
  
			
}); 
return app.routers.gapRouter;
}); 
  