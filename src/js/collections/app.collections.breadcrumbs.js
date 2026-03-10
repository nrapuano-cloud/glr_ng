/* global breadcrumb */

app.collections.breadcrumbs=Backbone.Collection.extend({
       
	initialize:function(){
            console.log("initializing breadcrumbs collection");
        },
          model : app.models.breadcrumb,
         url: '/breadcrumbs'
      
       });