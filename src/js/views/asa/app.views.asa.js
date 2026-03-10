require(['app','bootbox'], function(app,bootbox){
app.views.asa = Backbone.View.extend({
    initialize: function (e) {
        console.log("initializing asa view: ");
   

         
     /*    if(servizio){
              $.ajax({
                            url: './js/views/asa/'+app.global.sub+'_list_menu.html',
                           
                            dataType: "html",
                            success: function (varForm) {
                                $("#boot").empty();
                                $("#boot").append(varForm);
                                console.log('load '+app.global.sub+'_list_menu.html');
                             
                            },
                            error: function(){console.log('NOT load '+app.global.sub+'_list_menu.html');}
                        });  
                   $.ajax({
                                    url: "./js/views/asa/"+app.global.sub+"_list_menu.js",
                                   
                                    dataType: "script",
                                    success: function () {
                                        console.log('load '+app.global.sub+'_list_menu.js');
                                        start($mydata.menu,row);
                                    },
                                    error: function(){console.log('NOT load '+app.global.sub+'_list_menu.js');}
                                });        
    
 
         }
     */
    },
    events: {
        "click-row.bs.table .def": "selRow",
        "click .create":"addDoc",//viene chiamata da add paziente
        "click .removeDoc--":"delDoc",
        "click .printPMA":"printPMA"
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
  
    setTab: function ($action,$url) {//richiesta dati per popolare tabella
        that=this;   
        var API_URL =''; 
        console.log("setTab",$url);
         
            var jsonObj = {};
            
            jsonObj.action = $action; 
            API_URL=$url;
            console.log(app.global.nick_array.arr);
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url: API_URL,
                type: 'post',
                headers: this.headerJson(),
                data: jsonObj,
                dataType: 'text',
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        switch (app.global.nick_array.arr) {
                            case "rma_tutorial":
                            case "rfa_tutorial":{
                                that.tutorial($myData); 
                                break;}
                            case "profile":{
                                that.profile($myData); 
                                break;}
                            case "rma_schede_sicurezza":{
                              that.schede_sicurezza($myData); 
                                
                                break;}
                            
                            default:{
                                that.hrTable($myData); 
                            }
                        }
                    }
                    else {
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $myData.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                          app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("hr list load table error!!!");
                }
            });
        }, //end setTab()--------------
    hrTable: function (my) {//popola tabella con i dati ricevuti
           
            if(typeof my.newR !== 'undefined'){
                            this.$("#newR").append(my.newR);
                        }
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                search: true,
                pagination: false
            });
            this.$("#countSer").prepend(' '+my.data.length);
        },
        
    render: function () {
        $(this.el).html(this.template());
        
        console.log(app.global.sub); // value=asa_cd_anziani | asa_cd_socializzazione   --app.global.sub viene impostato dalla selezione del navbar tramito il click sul selettore rifraf
         
        
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        $token = app.global.tokensCollection.first().get("auth").token;
        
        //------------------test con modulo angular----abilitato se app.global.glr2=true-------------------------------------
        if(app.global.glr2){
        //var $ource="http://localhost/glr2/asa/"+app.global.sub+"/"+$person+"/"+$servizio+"/"+$token+"/";
         var $ource="http://localhost:4200/asa/"+app.global.sub+"/"+$person+"/"+$servizio+"/"+$token+"/";
        // var $ource="http://localhost/glr2feasax/asa/"+app.global.sub+"/"+$person+"/"+$servizio+"/"+$token+"/";
        console.log($ource);
        $iframe='<iframe id="ifra"   src="" frameborder="0" style="overflow:hidden;height:100vh;width:100vw" ></iframe>';
        this.$('#overBoot').empty().append($iframe); 
        this.$('#ifra').prop( "src", $ource );
        this.$url = app.global.json_url ;
        return;
       
        }
        
        //------------------fine test angular---------------------------------------------
        
               
         while (app.global.breadcrumb.length>1) {
            app.global.breadcrumb.pop();
        }
       
        for (var i = 0; i < (app.global.breadcrumb).length; i++) {
            this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
           
        }  
       
        var $headers = {
                "Authorization" : "Bearer " + $token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
               
        
                
        this.$('#id_person').prop( "value", $person );
        var  URL=app.global.json_url+'asa/'+app.global.sub+'/modulo/'+$person+'/'+$servizio+"/";
          
        var that=this; 
    	
        //------------------------------servizi/o--------------------
        $aa="aaaa";
        $ab= app.routers.asaRouter.prototype+"."+$aa+"()";
     console.log(app.routers.asaRouter.prototype);
  //   app.routers.asaRouter.prototype=$aa;
  //   app.routers.asaRouter.prototype.aaaa();
    // app.routers.asaRouter.prototype+"."+$aa+"()";
      //  this.$("#boot").empty().load('./js/views/asa/'+app.global.sub+'_list_servizi.html');   
     /*   $.ajax({
            url:URL,
            type:'get',
            headers : $headers,
           
            success: function (json) {

                $mydata =JSON.parse(json);

                if ($mydata.success){
                   
                    console.log($mydata);
                    if($mydata.selServizi!==""){
                           $.ajax({
                                    url: "./js/views/asa/"+app.global.sub+"_list_servizi.js",
                                    dataType: "script",
                                    success: function () {
                                        console.log('load '+app.global.sub+'_list_servizi.js');
                                        start($mydata);
                                    },
                                    error: function(){console.log('NOT load '+app.global.sub+'_list_servizi.js');}
                                });
                       /* $.ajax({
                            url: './js/views/asa/'+app.global.sub+'_list_servizi.html',
                            dataType: "html",
                            success: function (varForm) {
                                $("#boot").empty();
                                $("#boot").append(varForm);
                                console.log('load '+app.global.sub+'_list_servizi.html');
                               
                            },
                            error: function(){console.log('NOT load '+app.global.sub+'_list_servizi.html');}
                        });*/
                       /*
                        $selServizioEx=true;
                        console.log($selServizioEx,$('#servizio').length);
                        console.log($selServizio);
                        $selServizio.append($mydata.selServizi); 
                        console.log($mydata.selServizi,$('#servizio').length);
                         if ($('#servizio').length > 0) {
  console.log('#servizio esiste');
}else{
    console.log('#servizio NON esiste'); 
}
                      
                        $bb=$mydata.servizi;
                        $selServizioX=that.$("#servizio");
                        $selServizioX.append('<option value="0">Seleziona</option>');
                        $.each($mydata.servizi, function(i, value) {
                            $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                        });
                        $selServizioX.val($servizio);
                        $selServizioX.change(function (e,value,row) {

                           
                        });
                    }else{ 
                        that.$('#servizix').empty();
                         $.ajax({
           url: './js/views/asa/'+app.global.sub+'.html',
           dataType: "html",
           success: function (varForm) {
               $("#boot").empty();
               $("#boot").append(varForm);
               console.log('load '+app.global.sub+'.html');
                $.ajax({
            url: "./js/views/asa/"+app.global.sub+".js",
            dataType: "script",
            success: function () {
              
                console.log('load '+app.global.sub+'.js');
                 start();
               
            },
            error: function(){console.log('NOT load '+app.global.sub+'.js');}
        });
           },
           error: function(){console.log('NOT load '+app.global.sub+'.html');}
       });*/
    /*               }

                   

                }else{

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons:{
                            main:{
                                label: "",
                                className: "btn btn-danger",
                                callback: function(){
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                  
                                }
                            }
                        }
                    });
                }
                 console.log("servizio0="+$('#servizio').length);
            },
            error: function () {

                 bootbox.dialog({
                    title: $mydata.message,
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "",
                            className: "btn btn-danger",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                 app.routers.router.prototype.logout();
                            }
                        }
                    }
                });
            }

        });*/
       
 
   
     
       
        $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
        return this;
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.docView = null;
    }
});
return app.views.asa;
});
