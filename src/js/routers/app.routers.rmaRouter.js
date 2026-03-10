require(['app'], function(app){
app.routers.rmaRouter=Backbone.Router.extend({
    routes:{
        ":lang/rma_adm":"rma_adm",
		":lang/rma_new":"rma_new",
		":lang/rma_new_contatori":"rma_new_contatori",
		":lang/rma_view":"rma_view",
		":lang/rma_view_contatori":"rma_view_contatori",
		":lang/rma_management":"rma_management",
		":lang/rma_management_edit":"rma_management_edit",
		":lang/rma_int_fare":"rma_int_fare",
		":lang/rma_int_fatti":"rma_int_fatti",
		":lang/rma_pannello_ore":"rma_pannello_ore",
		":lang/rma_detail":"rma_detail",
		":lang/planning":"planning",
		":lang/send_type":"rma_doc_tec_new", //da cambiare quando aggiorno il db
		":lang/archive":"rma_doc_tec_view",//da cambiare quando aggiorno il db
		":lang/archive_list":"rma_doc_tec_list",//da cambiare quando aggiorno il db
		":lang/archive_detail":"rma_doc_tec_detail",//da cambiare quando aggiorno il db
    },
	rma_adm:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_admView=new app.views.rma_adm;
    	app.global.rma_admView.render();
    	$("#content").html(app.global.rma_admView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
        
    rma_new:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_newView=new app.views.rma_new;
    	app.global.rma_newView.render();
    	$("#content").html(app.global.rma_newView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
        
    rma_view:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_viewView=new app.views.rma_view;
        app.global.rma_viewView.render();
    	$("#content").html(app.global.rma_viewView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
    rma_new_contatori:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_new_contatoriView=new app.views.rma_new_contatori;
    	app.global.rma_new_contatoriView.render();
    	$("#content").html(app.global.rma_new_contatoriView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
        
    rma_view_contatori:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_view_contatoriView=new app.views.rma_view_contatori;
        app.global.rma_view_contatoriView.render();
    	$("#content").html(app.global.rma_view_contatoriView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
        
    rma_detail:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_detailView=new app.views.rma_detail;
    	app.global.rma_detailView.render();
    	$("#content").html(app.global.rma_detailView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
    
    rma_int_fare:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_int_fareView=new app.views.rma_int_fare;
    	app.global.rma_int_fareView.render();
    	$("#content").html(app.global.rma_int_fareView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
    
    rma_int_fatti:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_int_fattiView=new app.views.rma_int_fatti;
    	app.global.rma_int_fattiView.render();
    	$("#content").html(app.global.rma_int_fattiView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
      
     
     rma_pannello_ore:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_pannello_oreView=new app.views.rma_pannello_ore;
    	app.global.rma_pannello_oreView.render();
    	$("#content").html(app.global.rma_pannello_oreView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
     
        
    
    rma_management:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_managementView=new app.views.rma_management;
    	app.global.rma_managementView.render();
    	$("#content").html(app.global.rma_managementView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
    
    rma_management_edit:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.rma_management_editView=new app.views.rma_management_edit;
    	app.global.rma_management_editView.render();
    	$("#content").html(app.global.rma_management_editView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }}, 
	  // private function 
	planning:function(){
        // load data from localstorage service 
        app.utils.loadTokens();
        var lang = app.utils.getLanguage();

        if (app.global.tokensCollection.length == 0) {
            app.routers.router.prototype.index();
        }
        else {
    
			app.utils.loadTokens();
			var e=app.utils.getLanguage();
					
					
			app.global.navbarView=new app.views.navbar;
			app.global.navbarView.render();
			$("#navbar_content").html(app.global.navbarView.el);
				
			app.global.planningView=new app.views.planning;
					
			app.global.planningView.render();
			$("#content").html(app.global.planningView.el);

			app.global.footerView=new app.views.footer;
			app.global.footerView.render();
			$("#footer_content").html(app.global.footerView.el);
			this.navigate('#!' + lang + '/planning', { 
				trigger : false 
			});
		}
    }, 
	 // private function 
	 rma_doc_tec_new:function(){
	
		app.utils.loadTokens();
			if (app.global.tokensCollection.length == 0) {
			app.routers.router.prototype.index();
		}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.rma_doc_tec_newView=new app.views.rma_doc_tec_new;
		app.global.rma_doc_tec_newView.render();
		$("#content").html(app.global.rma_doc_tec_newView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
	
		this.navigate("#!"+e,{trigger:false})
	}},
	rma_doc_tec_view:function(){

		app.utils.loadTokens();
			if (app.global.tokensCollection.length == 0) {
			app.routers.router.prototype.index();
		}else{
			var e=app.utils.getLanguage();

			app.global.navbarView=new app.views.navbar;
			app.global.navbarView.render();
			$("#navbar_content").html(app.global.navbarView.el);

			app.global.rma_doc_tec_viewView=new app.views.rma_doc_tec_view;
			app.global.rma_doc_tec_viewView.render();
			$("#content").html(app.global.rma_doc_tec_viewView.el);

			app.global.footerView=new app.views.footer;
			app.global.footerView.render();
			$("#footer_content").html(app.global.footerView.el);
		
			this.navigate("#!"+e,{trigger:false})
		}
	},
	rma_doc_tec_list:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.rma_doc_tec_listView=new app.views.rma_doc_tec_list;
		app.global.rma_doc_tec_listView.render();
		$("#content").html(app.global.rma_doc_tec_listView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
            } },  
	rma_doc_tec_detail:function(){

		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.rma_doc_tec_detailView=new app.views.rma_doc_tec_detail;
		app.global.rma_doc_tec_detailView.render();
		$("#content").html(app.global.rma_doc_tec_detailView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
			}},		  		

});   
return app.routers.rmaRouter;
});