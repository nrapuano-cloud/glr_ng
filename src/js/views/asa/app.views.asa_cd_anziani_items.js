require(['app','bootbox'], function(app,bootbox){
    app.views.asa_cd_anziani_items = Backbone.View.extend({
        initialize: function (e) {
            console.log("initializing asa items: ");
       
    
        },
        events: {
          "click-row.bs.table ": "selRow",
         
          //  "click .create":"addDoc",//viene chiamata da add paziente
          //  "click .removeDoc--":"delDoc",
        //    "click .printPMA":"printPMA"
        },
        selRow:function(e, row, $element,options){
           
            switch(row.item){
                case "PIANO DI LAVORO":{
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_pdl" >'+row.item+'</a></li>'
                    });
                    app.routers.asaRouter.prototype.asa_cd_anziani_pdl();
                 break;   
                }
                case "PRESENZE OSPITI":{
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_po" >'+row.item+'</a></li>'
                    });
                    app.routers.asaRouter.prototype.asa_cd_anziani_po();
                    break;   
                   }
                   case "PIANO DELLE ATTIVITA'":{
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_pda" >'+row.item+'</a></li>'
                    });
                    app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                    break;   
                   }
                   case "CARTELLE INDIVIDUALI":{
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_list" >'+row.item+'</a></li>'
                    });
                    app.routers.asaRouter.prototype.asa_cd_anziani_list();
                       break;   
                      }    
            }
           
            console.log(row);
            app.global.nick_array.items=row;
            
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
          
            
            const $routeDefine = app.global.sub.split("_");
            console.log("asa_cd_anziani_list_servizi");
            while (app.global.breadcrumb.length>2) {
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
            var  URL=app.global.json_url+'asa/'+app.global.sub+'/items/'+$person+'/'+$servizio+"/";
            console.log( URL);
            $.ajax({
                url:URL,
                type:'get',
                headers : $headers,
               
                success: function (json) {
    
                    $mydata =JSON.parse(json);
    
                    if ($mydata.success){
                       
                        console.log($mydata);
                        if($mydata.selServizi!==""){
                           
                            hrTable($mydata)
                        
                        }
                    }
                }
            });
       //     hrTable($mydata.servizi)
      
            function  hrTable(my){
                 
                console.log(my,$table);
                $table.bootstrapTable('destroy');
                $table.bootstrapTable({
                    columns:my.tab,
                    data: my.items});
                
                
            }
       /*     $table.on("click-row.bs.table", function(e,row){
                console.log(row);
                app.global.nick_array.row=row;
                app.routers.asaRouter.prototype.asa_cd_anziani_list();
                 
            });*/
            $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
            return this;

        },
        destroy_view: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.asa_cd_anziani_itemsView=null
        }
    });
return app.views.asa_cd_anziani_items;
});