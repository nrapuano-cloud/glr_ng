require(['app.min','backbone-min',], function(app,Backbone){
app.collections.persons=Backbone.Collection.extend({
	initialize:function(){
		console.log("initializing users collection")
	},
	model:app.models.person
});
return app.collections.persons;
  });