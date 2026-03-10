require(['app.min','backbone-min'], function(app,Backbone){
app.models.pmaPill = Backbone.Model.extend({
    urlRoot: app.global.json_url + 'rma_pma/pma_data/',
    initialize: function(){
       
       // console.log("initializing pmaPill model");
      //  console.log(this);
        // document.write("Welcome to RapPoint");
        this.on("invalid", function(model, error){
            console.log("**Validation Error : " + error[0].name + "**");
            return 'The nota has changed from ';
        });
        this.on("change", function(){
            console.log('Model Changes Detected:');
            if(this.hasChanged('nota')){
                console.log('The nota has changed from '  + this.previous('nota') + ' to ' + this.get('nota'));
                return 'The nota has changed from '  + this.previous('nota') + ' to ' + this.get('nota');
          
            }
            if(this.hasChanged('dataTemp1')){
                console.log('The Data has changed')
            }
            console.log('Changed attributes: ' + JSON.stringify(this.changed));
            console.log('Previous attributes: ' + JSON.stringify(this.previousAttributes()));
        });
        this.on("change:name", function(){
            console.log('The name attribute has changed');  
        });
    },
    parse : function(response, options){  
        // document.write(JSON.stringify(response));  
        return JSON.stringify(response);
    } ,
    
    printDetails: function(){
        console.log(this.get('name') + ' by ' + this.get('author'));
    }, 

    
    validate: function(attrs){
        var errors = [];
        if(attrs.year < 2000){
                //return 'Year must be after 2000';
                errors.push({name: 'year', message: 'Please fill year field.'});
        }
        if(!attrs.dataTemp1){
               // return 'A nota must be provided';
                  errors.push({name: 'Data', message: 'Please fill Data field.'});
        }
        
        console.log(errors);
        return errors.length > 0 ? errors : false;
    },
    
    
    sync:function(method, model, options) {
        console.log(method);
        console.log(model);
        console.log(options);
	options=options||{};
        options.crossDomain=true;
	console.log(options.private);
        if(options.private){
            var r = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")
            };
            options.headers=r;
        }else{
            var r={"X-Requested-With":"XMLHttpRequest"};
            options.headers=r;
        }
        Backbone.sync(method,model,options)
    }
   
  
});
return app.models.pmaPill;
});