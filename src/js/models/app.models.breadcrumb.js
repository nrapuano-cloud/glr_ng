app.models.breadcrumb=Backbone.Model.extend({initialize:function(){
		console.log("initializing breadcrunb model")
		},
               
		url: '/breadcrumbs',

		idAttribute: '_id',
                sync: function(method, model, options) {
               // document.write(JSON.stringify(arguments));
            }

	
})
