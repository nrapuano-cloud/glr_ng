require(['app'], function(app){
app.routers.adminTecRouter=Backbone.Router.extend({
    routes:{
        ":lang/data_type":"data_type",
        ":lang/data_type_edit":"data_type_edit",
     //   ":lang/data_type_edit/:id":"data_type_edit_id",
       	":lang/data_type_editType":"data_type_editType",
	   	":lang/data_type_editType":"data_type_editType",
	   	":lang/attrezzature/:adr":"attrezzature_list",
		":lang/attrezzature_edit/:adr":"attrezzature_edit",
		":lang/attrezzature_categorie/:adr":"attrezzature_categorie",
		":lang/attrezzature_categorie_edit/:adr":"attrezzature_categorie_edit",
		":lang/formazione_list":"formazione_list",
		":lang/formazione_edit":"formazione_edit",
	},
    data_type:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.data_typeView=new app.views.data_type;
		app.global.data_typeView.render();
		$("#content").html(app.global.data_typeView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
	}},
        
/*    data_type_edit_id:function(lang,id){
       app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    this.index();
                }else{
        var e=app.utils.getLanguage();

        app.global.navbarView=new app.views.navbar;
        app.global.navbarView.render();
        $("#navbar_content").html(app.global.navbarView.el);
      
        //rfa_fornitori(lang,id);
        app.global.data_type_editTypeView=new app.views.data_type_editType;
		app.global.data_type_editTypeView.render();
		$("#content").html(app.global.data_type_editTypeView.el);
        
        app.global.footerView=new app.views.footer;
        app.global.footerView.render();
        $("#footer_content").html(app.global.footerView.el);

        this.navigate("#!"+e,{trigger:false})
                }},*/
    data_type_edit:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.data_type_editView=new app.views.data_type_edit;
		app.global.data_type_editView.render();
		$("#content").html(app.global.data_type_editView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
	}},
   	data_type_editType:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.data_type_editTypeView=new app.views.data_type_editType;
		app.global.data_type_editTypeView.render();
		$("#content").html(app.global.data_type_editTypeView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
	}},
  
	attrezzature_list:function(lang,adr){

		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.attrezzature_listView=new app.views.attrezzature_list;
		app.global.attrezzature_listView.initialize();
		app.global.attrezzature_listView.render(adr);
		
		$("#content").html(app.global.attrezzature_listView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}}, 
			
	attrezzature_edit:function(lang,adr){
		
		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.attrezzature_editView=new app.views.attrezzature_edit;
		app.global.attrezzature_editView.initialize();
		app.global.attrezzature_editView.render(adr);
		$("#content").html(app.global.attrezzature_editView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}},

	attrezzature_categorie:function(lang,adr){
		
		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.attrezzature_categorieView=new app.views.attrezzature_categorie;
		app.global.attrezzature_categorieView.initialize();
		app.global.attrezzature_categorieView.render(adr);
		$("#content").html(app.global.attrezzature_categorieView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}},
	attrezzature_categorie_edit:function(lang,adr){
		
		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.attrezzature_categorie_editView=new app.views.attrezzature_categorie_edit;
		app.global.attrezzature_categorie_editView.initialize();
		app.global.attrezzature_categorie_editView.render(adr);
		$("#content").html(app.global.attrezzature_categorie_editView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}},
	formazione_list:function(lang){

		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.formazione_listView=new app.views.formazione_list;
		app.global.formazione_listView.render();
		
		$("#content").html(app.global.formazione_listView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}}, 
			
	formazione_edit:function(lang){
		
		app.utils.loadTokens();
					if (app.global.tokensCollection.length == 0) {
					app.routers.router.prototype.index();
				}else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.formazione_editView=new app.views.formazione_edit;
		app.global.formazione_editView.render();
		$("#content").html(app.global.formazione_editView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
	}},
}); 
return app.routers.adminTecRouter;
});  