require(['app.min','backbone-min'], function(app,Backbone){
app.views.dashboard=Backbone.View.extend({
    initialize:function(){
        console.log("initializing dashboard view",app.global.debug);
        if (app.global.tokensCollection.length == 0) {
            this.login();
        };
       
        var jsonObj = {};
           
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
        url:app.global.json_url+'auth/',
        type:'post',
        headers : this.headerJson(),
        data: jsonObj,
        dataType : 'text',
        success: function (datap) {
            $mydata =JSON.parse(datap);
            // $mydata =(datap);

            console.log( ($mydata));
            //-------------------------------------------------------
            if ($mydata.success){

            }else{
                 app.routers.router.prototype.logout();
           
            }
        },
        error: function () {
                 app.routers.router.prototype.logout();
                 bootbox.dialog({
                     closeButton:false,
                    title: $mydata.message,
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "OK",
                            className: "btn btn-danger",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                 app.routers.router.prototype.logout();
                            }
                        }
                    }
                });
            }});
        
       
    },
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        return $headers;
    },
    fetchData: function  (query, dataURL,headers){
        // Return the $.ajax promise
        console.log(query,headers);
        return $.ajax({
            headers : headers,
            data: query,
            dataType: 'text',
            type:'post',
            url: dataURL
        });
        
    },
    showData: function ( $dataFull) {//record selezionato nella tabella -- scelta servizio
        var $data=$dataFull.ordiniApprova;
        var $form=
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingOne">'+
                            '<h4 class="panel-title">'+
                                '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                   
                                  $dataFull.message+
                               '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'+
                            '<div class="panel-body">';
                             
                                $data.forEach(function(item){
           
                                $form += '<div class="form-group ">'+ 
                                            '<label>'+item+'</label>'+
                                        '</div><p>';              
                  
                                });

                $form +=    '</div>'+
                       '</div>'+
                   '</div>';
       
       
        
         
         this.$(".info").append($form);         
       
       // this.$('.panel-heading').text('RFA > Valutazione ordine <label >'+$data.num_prog+'  del  '+$data_richiesta+'</label>'); 
       
       
       
    },
    events:{},
       
    toTitleCase:function(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    render:function(){
        $(this.el).html(this.template({
            
        name:app.global.tokensCollection.at(0).get("first_name")}));
       
        this.$("#temp_short_title").html(app.global.app_short_name);
	    this.$("#temp_long_title").html(app.global.app_long_name);
        this.$("#inazX").attr("href",app.global.tokensCollection.first().get("links").inaz)
        this.$("#alfaX").attr("href",app.global.tokensCollection.first().get("links").alfa)
        this.$("#zucchettiX").attr("href",app.global.tokensCollection.first().get("links").zucchetti)
         $that=this;
        var API_URL = app.global.json_url + 'rfa/';
        var jsonObj = {};
         
        jsonObj.action = "list";
        jsonObj.person = app.global.tokensCollection.first().get("id_person");  
        jsonObj = JSON.stringify(jsonObj);
        var getDoc =  this.fetchData(jsonObj, app.global.json_url + 'rfa/approva/',this.headerJson());
        getDoc.done(function(data) {
            
            $mydata =JSON.parse(data);
            if($mydata.success){
                if($mydata.ordiniApprova){
                    if($mydata.ordiniApprova.length>0){
                        $that.showData($mydata);
                    }
                }
                  
            console.log($mydata);
            }else{
            
                 bootbox.alert({ 
                            title: "Valutazione ordine",
                            message: $mydata.message,
                            
                            callback: function() {
                                app.global.tokenKey=null;//token x approvaRFA
                                app.routers.router.prototype.dashboard();
                            }
                        });
            }
        });
       
        
        return this;
    },

    destroy_view:function(){
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.dashboardView=null;
    }
});
return app.views.dashboard;
  })