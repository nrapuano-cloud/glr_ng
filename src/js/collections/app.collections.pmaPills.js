require(['app.min','backbone-min'], function(app,Backbone){
app.collections.pmaPills=Backbone.Collection.extend({
        url: app.global.json_url + 'rma_pma/pma_data/',
	initialize:function(){
            console.log("initializing pmaPill s collection");
        },
        model:app.models.pmaPill});
  return   app.collections.pmaPills;    
});      