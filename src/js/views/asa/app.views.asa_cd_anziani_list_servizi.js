require(['app','bootbox'], function(app,bootbox){
    app.views.asa_cd_anziani_list_servizi = Backbone.View.extend({
        initialize: function (e,servizio) {
            console.log("initializing asa view: ",servizio);
       
    
             
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
           "click-row.bs.table ": "selRow",
          //  "click .create":"addDoc",//viene chiamata da add paziente
          //  "click .removeDoc--":"delDoc",
        //    "click .printPMA":"printPMA"
        },
        selRow:function(e, row, $element,options){
    
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_items" >'+row.servizio+'</a></li>'
            });
            console.log(row);
            app.global.nick_array.arr=row;
           
           
            app.routers.asaRouter.prototype.asa_cd_anziani_items();               //chiama la pagina data_type_edit
      
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
            
            const $routeDefine = app.global.sub.split("_");
            console.log("asa_cd_anziani_list_servizi");
            while (app.global.breadcrumb.length>1) {
                app.global.breadcrumb.pop();
            }
           
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
               
            } 
            var $table=this.$('#table');
            var $headers = {
                "Authorization" : "Bearer " + $token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
            var  URL=app.global.json_url+'asa/'+app.global.sub+'/modulo/'+$person+'/'+$servizio+"/";
      
            $.ajax({
                url:URL,
                type:'get',
                headers : $headers,
               
                success: function (json) {
    
                    $mydata =JSON.parse(json);
    
                    if ($mydata.success){
                       
                        console.log($mydata);
                        if($mydata.selServizi!==""){
                           
                            hrTable($mydata.servizi)
                        
                        }
                    }
                }
            });
       //     hrTable($mydata.servizi)
      
            function  hrTable(my){
                console.log(my,$table);
                $table.bootstrapTable('destroy');
                $table.bootstrapTable({data: my});
            }
        /*    $table.on("click-row.bs.table", function(e,row){
                console.log(row);
                app.global.nick_array.row=row;
                app.routers.asaRouter.prototype.asa_cd_anziani_items();
                 
            });*/
            $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
            return this;

        },
        destroy_view: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.asa_cd_anziani_list_serviziView=null
        }
    });
return app.views.asa_cd_anziani_list_servizi;
});