require(['app'], function(app){
app.routers.asaRouter=Backbone.Router.extend({
    routes:{
		":lang/asa_cd_anziani":"asa_cd_anziani_list_servizi",
		":lang/asa_cd_anziani_items":"asa_cd_anziani_items",
		":lang/asa_cd_anziani_list":"asa_cd_anziani_list",
		":lang/asa_cd_anziani_edit":"asa_cd_anziani_edit",
		":lang/asa_cd_anziani_pdl":"asa_cd_anziani_pdl",
		":lang/asa_cd_anziani_po":"asa_cd_anziani_po",
		":lang/asa_cd_anziani_po":"asa_cd_anziani_po_archivio",
		":lang/asa_cd_anziani_pda":"asa_cd_anziani_pda",
		
    },
	asa_cd_anziani_items:function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_itemsView=new app.views.asa_cd_anziani_items;
        app.global.asa_cd_anziani_itemsView.initialize();
    	app.global.asa_cd_anziani_itemsView.render();
    	$("#content").html(app.global.asa_cd_anziani_itemsView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
	asa_cd_anziani_list_servizi:function(e,servizio){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_list_serviziView=new app.views.asa_cd_anziani_list_servizi;
        app.global.asa_cd_anziani_list_serviziView.initialize(e,servizio);
    	app.global.asa_cd_anziani_list_serviziView.render();
    	$("#content").html(app.global.asa_cd_anziani_list_serviziView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},   
	asa_cd_anziani_list:function(e,servizio){
    
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_listView=new app.views.asa_cd_anziani_list;
        app.global.asa_cd_anziani_listView.initialize();
    	app.global.asa_cd_anziani_listView.render();
    	$("#content").html(app.global.asa_cd_anziani_listView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
        
	
	asa_cd_anziani_edit:function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_editView=new app.views.asa_cd_anziani_edit;
        app.global.asa_cd_anziani_editView.initialize();
    	app.global.asa_cd_anziani_editView.render();
    	$("#content").html(app.global.asa_cd_anziani_editView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
	asa_cd_anziani_pdl:function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_pdlView=new app.views.asa_cd_anziani_pdl;
        app.global.asa_cd_anziani_pdlView.initialize();
    	app.global.asa_cd_anziani_pdlView.render();
    	$("#content").html(app.global.asa_cd_anziani_pdlView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
	asa_cd_anziani_po: function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_poView=new app.views.asa_cd_anziani_po;
        app.global.asa_cd_anziani_poView.initialize();
    	app.global.asa_cd_anziani_poView.render();
    	$("#content").html(app.global.asa_cd_anziani_poView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
	asa_cd_anziani_po_archivio: function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_po_archivioView=new app.views.asa_cd_anziani_po_archivio;
        app.global.asa_cd_anziani_po_archivioView.initialize();
    	app.global.asa_cd_anziani_po_archivioView.render();
    	$("#content").html(app.global.asa_cd_anziani_po_archivioView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
	asa_cd_anziani_pda:function(){
    	
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.asa_cd_anziani_pdaView=new app.views.asa_cd_anziani_pda;
        app.global.asa_cd_anziani_pdaView.initialize();
    	app.global.asa_cd_anziani_pdaView.render();
    	$("#content").html(app.global.asa_cd_anziani_pdaView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
			
}); 
return app.routers.asaRouter;
}); 
  