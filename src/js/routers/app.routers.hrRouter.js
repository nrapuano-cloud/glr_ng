require(['app'], function(app){
app.routers.hrRouter=Backbone.Router.extend({
    routes:{
		":lang/hr":"hr",
		":lang/hr_edit":"hr_edit",
		":lang/hr_user":"hr_user",
		":lang/hr_mnt":"hr_mnt",
		":lang/hr_crd":"hr_crd"
    },
	hr:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
                
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.hrView=new app.views.hr;
		app.global.hrView.render();
		$("#content").html(app.global.hrView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		this.navigate("#!"+e,{trigger:false})
            }
        },
        
    hr_crd:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.hr_crdView=new app.views.hr_crd;
    	app.global.hr_crdView.render();
    	$("#content").html(app.global.hr_crdView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
       
    hr_edit:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.hr_editView=new app.views.hr_edit;
    	app.global.hr_editView.render();
    	$("#content").html(app.global.hr_editView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
    
    hr_mnt:function(){
    		
    	app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
    	var e=app.utils.getLanguage();

    	app.global.navbarView=new app.views.navbar;
    	app.global.navbarView.render();
    	$("#navbar_content").html(app.global.navbarView.el);

    	app.global.hr_mntView=new app.views.hr_mnt;
    	app.global.hr_mntView.render();
    	$("#content").html(app.global.hr_mntView.el);

    	app.global.footerView=new app.views.footer;
    	app.global.footerView.render();
    	$("#footer_content").html(app.global.footerView.el);
    	this.navigate("#!"+e,{trigger:false})
    }},
    
    hr_user:function(){
        app.utils.loadTokens();
         if (app.global.tokensCollection.length == 0) {
            app.routers.router.prototype.index();
        }else{
        var lang = app.utils.getLanguage();


        app.global.navbarView=new app.views.navbar;
        app.global.navbarView.render();
        $("#navbar_content").html(app.global.navbarView.el);

        app.global.hr_userView=new app.views.hr_user;
        app.global.hr_userView.render();
        $("#content").html(app.global.hr_userView.el);

        app.global.footerView=new app.views.footer;
        app.global.footerView.render();
        $("#footer_content").html(app.global.footerView.el);
        this.navigate("#!"+ lang ,{trigger:false})

        }},

}); 
return app.routers.hrRouter;
}); 
  