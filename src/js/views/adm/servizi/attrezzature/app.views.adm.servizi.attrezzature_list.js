require(['app','bootbox'], function(app,bootbox){
    app.views.attrezzature_list = Backbone.View.extend({
        initialize: function (e) {
            console.log("initializing attrezzature_list view: ");
       
      },
        events: {
            "click .create":"create",
           // "click .update":"update",
           "click-row.bs.table": "selRow",
           "click .contr-Plus":"addDoc",//viene chiamata da Nuovo BSA
        
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
        selRow: function (){
            console.log("click row table "+app.global.nick_array.arr);
        },
        addDoc: function (e) {
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" >Nuovo BSA</li>'
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.routers.bsaRouter.prototype.bsa_edit();
    
            return;                   
     
           
        }, 
        selCall: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'bsa/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "bsa";
            jsonObj = JSON.stringify(jsonObj);
            
            $.ajax({
                url: API_URL,
                type: 'post',
                data :  jsonObj,
                dataType : 'text',
                headers: this.headerJson(),
                
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        that.hrTable(that,$myData); 
                    }
                    else {
                        bootbox.dialog({
                            title: "Errore!",
                            message: $myData.message,
                            buttons: {
                                main: {
                                    label: "OK",
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
                    console.error("bsa load table error!!!");
                }
            });
            }, //end 
        hrTable: function (that,my) {//popola tabella con i dati ricevuti
            var actionFormatter=my.format;
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents = {
                'click .download': function (e, value, row,index) {
                    //app.global.nick_array.id=row.id;
                    console.log(row)  ;  	
                    
                    jsonObj = {};
                    jsonObj.action = "download";
                    jsonObj.id=row.id;
                    jsonObj.tipo=row.tipo;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
    
                    $.ajax({
                        url: app.global.json_url + 'asa/doc/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $mydata =JSON.parse(datap);
                            console.log($mydata);
                            var link = document.createElement("a");
                            link.download = $mydata.name;
                            // Construct the uri
    
                            link.href = $mydata.file;
                            document.body.appendChild(link);
                            link.click();
                            // Cleanup the DOM
                            document.body.removeChild(link);
                        //  window.open($mydata.file,'_blank');
                            //   window.location.href=$mydata.file;
    
    
    
                                },
                            error: function () {
    
                                console.log("Download item error!");
                                            }
                    });
    
                    
                    
                    
                },
                
                'click .view': function (e, value, row,index) {
                    console.log(row.id_person+"index"+index)  ;  	
                    console.log($mydata.data)  ;  
                    console.log("row="+_.keys(row))  ; 
                    
                    console.log("id="+row.id_archivio);
                    
                    jsonObj = {};
                    jsonObj.action = "download";
                    jsonObj.id=row.id;
                    jsonObj.tipo=row.tipo;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
    
                    $.ajax({
                        url: app.global.json_url + 'asa/doc/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $mydata =JSON.parse(datap);
                            console.log($mydata);
                            
                        window.open($mydata.file,'_blank');
                        // window.location.href=$mydata.link;
                        
                            
    
    
    
                                },
                            error: function () {
    
                                console.log("Download item error!");
                                            }
                    });
    
                    
                    
                },
                'click .remove': function (e, value, row,index) {
                    console.log("id="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="ci";
                        jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'asa/ci/',
                            type:'post',
                            headers : $headers,
                            data :  jsonObj,
                            dataType : 'text',
                            success: function (datap) {
                                $mydata =JSON.parse(datap);
                                    bootbox.dialog({
                        title: "Delete item successful!",
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "OK",
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.asaRouter.prototype.asa_cd_anziani_list();
                                }
                            }
                        }
                    });
                                
                             //   $table.bootstrapTable('refresh',  that.selCall(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .update': function (e, value, row,index) {
                    console.log("update "+app.global.nick_array.arr,e, value, row);
            switch (app.global.nick_array.arr){
                case "bsa":{
                    console.log("bsa update",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.bsaRouter.prototype.bsa_edit();
            
                    return;  
                  
                break;
                }
               
            }
                  
                }   
                
            };
            $table =  that.$("#table"); 
            that.$(".toolbar").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
                app.global.nick_array.newR=my.newR;
            }
            $.each( my.data, function( key, value1 ){
            
                if(typeof(value1["data_acquisto"]) !== "undefined" && value1["data_acquisto"] !== null){    
                    value1["data_acquistoT"]='<span>'+moment(value1["data_acquisto"]).format('YYYYMMDD')+'</span>'+moment(value1["data_acquisto"]).format('DD/MM/YYYY');
                    value1["data_acquisto"]=moment(value1["data_acquisto"]).format('DD/MM/YYYY');
                    
                }
                if(typeof(value1["data_fine_garanzia"]) !== "undefined" && value1["data_fine_garanzia"] !== null){    
                    value1["data_fine_garanziaT"]='<span>'+moment(value1["data_fine_garanzia"]).format('YYYYMMDD')+'</span>'+moment(value1["data_fine_garanzia"]).format('DD/MM/YYYY');
                    value1["data_fine_garanzia"]=moment(value1["data_fine_garanzia"]).format('DD/MM/YYYY');
                    
                }
                if(typeof(value1["data_fattura"]) !== "undefined" && value1["data_fattura"] !== null){    
                    value1["data_fatturaT"]='<span>'+moment(value1["data_fattura"]).format('YYYYMMDD')+'</span>'+moment(value1["data_fattura"]).format('DD/MM/YYYY');
                    value1["data_fattura"]=moment(value1["data_fattura"]).format('DD/MM/YYYY');
                    
                }
            });  
            $.each( my.tab, function( key, value1 ){


                if(value1["cellStyle"]=="cellStyle"){
    
                    value1["cellStyle"]=cellStyle;
                }
                
                    if(value1["formatter"]=="actionFormatter"){
    
                    value1["formatter"]=actionFormatter;
                }
                if(value1["events"]=="actionEvents"){
    
                    value1["events"]=actionEvents;
                }
    
            });              
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                search: true,
                pagination: true
            });
          
            this.$("#countSer").prepend(' '+my.data.length);
         /*   function actionFormatter(value) {
                return [$format
                            ].join('');
            }  */
                
        },
        'update': function (e, row, value) {
            console.log("update "+app.global.nick_array.arr,e, value, row);
            switch (app.global.nick_array.arr){
                case "bsa":{
                    console.log("bsa update",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.bsaRouter.prototype.bsa_edit();
            
                    return;  
                  
                break;
                }
               
            }
      
        },
        'create': function (e, value, row) {
            
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            switch (app.global.nick_array.arr){
                case "bsa":
                $bread='<li class="breadcrumb-item active" href="" >Nuovo BSA</li>';
                break;
            }
            
            app.global.breadcrumb.push({
                   
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.routers.bsaRouter.prototype.bsa_edit();
    
            return;  
        }, 
     
render: function () {
    $(this.el).html(this.template());
      
    //-----------breadcrumb---------------------------------------------------------
    app.global.breadcrumb=[];//perchè parte da qui!
                app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item "><a href="#it/bsa_list" >BSA</a></li>'
                   //  breadcrumb: '<li class="breadcrumb-item active">'+row.name+'</li>'
                    
                });
    while (app.global.breadcrumb.length>1) {
        app.global.breadcrumb.pop();
    }
    for (var i = 0; i < (app.global.breadcrumb).length; i++) {
        this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
    } 
    //-------------------------------------------------------------------------------
    app.global.nick_array.arr="bsa";
    this.selCall(this);
 
},
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.views.adm.servizi.attrezzature_listView=null
    }
    });    
return app.views.attrezzature_list;
});    