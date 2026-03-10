require(['app'], function(app){
app.routers.sraRouter=Backbone.Router.extend({
    routes:{
		":lang/send_type_stampa":"send_stampa",
		":lang/send_type_doc_stampa":"send_doc_stampa",
		
    },
	
      // private function 
	 send_stampa:function(){
		
		app.utils.loadTokens();
                 if (app.global.tokensCollection.length == 0) {
                    app.routers.router.prototype.index();
                }else{
		var e=app.utils.getLanguage();

		app.global.navbarView=new app.views.navbar;
		app.global.navbarView.render();
		$("#navbar_content").html(app.global.navbarView.el);

		app.global.send_printView=new app.views.send_print;
		app.global.send_printView.render();
		$("#content").html(app.global.send_printView.el);

		app.global.footerView=new app.views.footer;
		app.global.footerView.render();
		$("#footer_content").html(app.global.footerView.el);
		
		this.navigate("#!"+e,{trigger:false})
            }},
    
        // private function 
    send_doc_stampa:function(){
		
		app.utils.loadTokens();
		if (app.global.tokensCollection.length == 0) {
			app.routers.router.prototype.index();
		}else{
			var e=app.utils.getLanguage();

			app.global.navbarView=new app.views.navbar;
			app.global.navbarView.render();
			$("#navbar_content").html(app.global.navbarView.el);

			app.global.send_doc_printView=new app.views.send_doc_print;
			app.global.send_doc_printView.render();
			$("#content").html(app.global.send_doc_printView.el);

			app.global.footerView=new app.views.footer;
			app.global.footerView.render();
			$("#footer_content").html(app.global.footerView.el);
			
			this.navigate("#!"+e,{trigger:false})
		}
	},
			
}); 
return app.routers.sraRouter;
}); 
  