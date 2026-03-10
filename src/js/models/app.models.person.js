require(['app.min','backbone-min'], function(app,Backbone){
app.models.person = Backbone.Model.extend({
    initialize: function(){
        console.log("initializing person model");
    },

    sync: function(method, model, options) {
       
        sync = function(method, model, options) {

    var params = _.extend({
        type:         'POST',
        dataType:     'json',
        //url: wpBackboneGlobals.ajaxurl,
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
    }, options);

    if (method == 'read') {
        params.type = 'GET';
        params.data = model.id
    }

    if (!params.data && model && (method == 'create' || method == 'update' || method == 'delete')) {
        params.data = JSON.stringify(model.toJSON());
    }


    if (params.type !== 'GET') {
        params.processData = false;
    }

    params.data = $.param({action:'backbone',backbone_method:method,backbone_model:model.dbModel,content:params.data});

    // Make the request.
    return $.ajax(params);


};
        
        
        options = options || {};

        options.crossDomain = true;

        if (options.private) {
            var headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")
            };
            options.headers = headers;
        }
        else {
            var headers = {
                "X-Requested-With": "XMLHttpRequest",
                "lang" : app.global.languagesCollection.at(0).get("lang")
            };
        options.headers = headers;
        }

        Backbone.sync(method, model, options);
    }

  
});
return app.models.person;
})