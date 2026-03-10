require(['app.min','backbone-min'], function(app,Backbone){
	app.models.bsa=Backbone.Model.extend({
		initialize:function(){
			console.log("initializing bsa model")
			},
			//idAttribute: 'ID',
		/*	parse : function(response, options){  
                document.write(JSON.stringify(response));  
        },*/
		
	
		idAttribute: '_id'
		
			
	});
});
