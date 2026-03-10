require(['app.min','backbone-min'], function(app,Backbone){
app.collections.bsa=Backbone.Collection.extend({
         // URL to be used in the fetch operation.
      //  url: app.global.json_url + 'bsa/',
	initialize:function(){
            console.log("initializing bsa collection");
        },
       
         // Model reference 
        model:app.models.bsa,
       

      
   tab:function(response) {
    return response.tab;
   },
    
    /* The `parse` function is called by Backbone whenever a 
     * collections's models are returned by the server in `fetch`.
     * The default implementation simply passes through the raw
     * JSON response.
     * If this response is not what you were expecting to populate
     * your models, you will need to override it.
     */
    parse: function(response) {
        // Uncomment if you need to see the raw response.
         console.log(response);

        // Save this scope inside a variable.
        var self = this;

        /* Iterate through the `hits` array of Objects using the `UnderscoreJS`
         * `each` function, create a Model for each array item, set its 
         * attributes taking the values from any object `fields` property and
         * push it into the collection.
         */
        _.each(response.data, function(item, index) {
             console.log(item);
            // console.log(item.fields.item_name);

            var member = new self.model();
            /* Set the idAttribute explicitly to make sure every Model has
             * its unique one [Stackoverflow](http://stackoverflow.com/questions/
             * 18007118/backbone-collection-length-always-set-to-one-with-nested-views).
             */
          // member.set('_id', index);
            // Set the defaul attributes.
          /*  member.set('id', item.id);
            member.set('codice', item.codice);
            member.set('categoria', item.categoria);
            member.set('assegnatario_corrente', item.assegnatario_corrente);
          */      
            member=item;
            self.push(member);
        });
        // Check to see that the collection has been populated by models.
        console.log('length of this collection: ' + this.length);
        // Log the collection to the console to see if it gets populated correctly.
         console.log(this);
        return this.models;
    }
});
  return   app.collections.bsa;    
});      