require(['app','bootbox'], function(app,bootbox){
    app.views.asa_cd_anziani_po_archivio = Backbone.View.extend({
        initialize: function () {
            console.log("initializing asa po: ");
       
        },
        events: {
            "click .contr-Plus":"addRow",
            "click #archivio":"archivio",
        },
        archivio:function (that) {
            console.log("archivio");
         
            app.routers.asaRouter.prototype.asa_cd_anziani_po();               //chiama la pagina data_type_edit
      
        },    
        selRow:function(e, row, $element,options){
    
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_items" >'+row.servizio+'</a></li>'
            });
            console.log(row);
            app.global.nick_array.arr=row;
           
           
            app.routers.asaRouter.prototype.asa_cd_anziani_items();               //chiama la pagina data_type_edit
      
        },
        addRow:function (that) {
        console.log(app.global.nick_array.arr.id,that);
     
       $(".modal-body").empty();   
       $(".modal-body").append(        
           '<form id="modContratto" >'+
           '<div  class="form-group col-lg-12 alle">'+
               '<div class="form-group col-lg-6">'+
                   '<label>Data del documento *</label>'+
                   '<div class="input-group date " id="datetimepicker1">'+

                       '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" />'+ 
                       '<span class="input-group-addon">'+  
                           '<span class="glyphicon glyphicon-calendar"></span>'+ 
                   '</span>'+
                   '</div>'+
               '</div>'+
               '<div class="form-group col-lg-6">'+
                   '<label  >Note</label>'+
                   '<input type="text" class="form-control" name="note" id="note"  >'+
               '</div>'+

               '<div class="form-group col-lg-5">'+
                   '<label for="allegato">Seleziona file</label>'+
                   '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

               '</div>'+


           '</div>'+ 
           '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Add File</button>'+
           '</form >'
       );
       $('#datetimepicker1').datetimepicker({ 
           format: "mm/yyyy",
           autoclose: true,
           startView: 3,
           minView: 3,
           
           language: "it"
       }).show();
       $('#datetimepicker1').datetimepicker('setStartDate', '-2y');
       $('#datetimepicker1').datetimepicker('setEndDate', '+0d');
      
       $("#modContratto").validate(); //sets up the validator

       $("input[name=\"allegato").rules( "add", {
           required: true,
           //number: true,
           // minlength: 2,

           messages: {
               required: "Required input"
               //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
               // number:"Inserire un numero!"
           }
       });
       $("input[name=\"dataTemp").rules( "add", {
           required: true,
           //number: true,
           // minlength: 2,

           messages: {
               required: "Required input"
               //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
               // number:"Inserire un numero!"
           }
       });
       $("#modal").modal('show');
       $('.modal-title').text("Add Presenza ospiti");
       //qui
       
       $('#btnAlle').click(function(e) {
           if($("#modContratto").valid()){
             
               //--------------------------------------------------------------
               var API_URL = app.global.json_url + 'asa/doc/';
               
               //var jsonObj = sendUrbans_formToJson(that);
               var form_data = new FormData($('#modContratto')[0]); 
               form_data.append('person', app.global.tokensCollection.first().get("id_person"));
               form_data.append('action', 'add');
               form_data.append('tipo', 'po');
               form_data.append('sub_area', app.global.sub);
               
               form_data.append('id_ser', app.global.nick_array.arr.id);
     
       
               $headers = {
                   "X-Requested-With": "XMLHttpRequest",
                   "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                   //"username" : app.global.tokensCollection.first().get("username"),
                   "lang" : app.global.languagesCollection.at(0).get("lang"),
                   //"Content-Type": "application/json"
               };
               console.log(app.global.nick_array);
              
               $.ajax({
                   url:API_URL,
                   type:'post',
                   headers : $headers,

                   //data :  jsonObj,
                   //dataType : 'text',
                   data: form_data,
                   contentType: false,       // The content type used when sending data to the server.
                   cache: false,             // To unable request pages to be cached
                   processData:false,        // To send DOMDocument or non processed data file it is set to false       
                   success: function (datap) {
                       console.log(datap.data);
                       $mydata =JSON.parse(datap);
                   
                       //-------------------------------------------------------
                       if ($mydata.success){
                       // app.routers.router.prototype.data_type_edit();
                           console.log("ok");
                       
                           $("#modal").modal('hide');
                          
                       }
                   }
               });
         
             
                
           }else{
               console.log("btnAlle invalid");  
           }
           $('#modal').on('hidden.bs.modal', function () {
               app.routers.asaRouter.prototype.asa_cd_anziani_po();
           });
        
       });  

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
        setTab: function (that,my) {//preparo i punti di aggancio
            console.log(that.item);
          
            switch (that.item) {
                case "po":{// Presenza ospiti
                    that.$("#boot").empty();
                    varForm='<div ><h3 style="display:inline-block;"> Presenze ospiti Archivio<span class="badge">'+my.data.length+' </span></h3><button type="button"  class="btn btn-default  " id="archivio" name="archivio" style="background-color:#ffc108;margin-left:100px;" data-title="Archivio "  title="Archivio ">Presenze ospiti </button></div>'+
                  
                            '<form class="contrattiForm" id="contrattiForm" name="contrattiForm" method="post">'+    
                           
                            '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+
                               
                                '<div id="contrattiL"></div>'+
                                '<div id="contrattiT">'+
                                    
                                    '<p class="toolbar">'+
                                       // '<button type="button"  class="btn btn-default contr-Plus"  data-title="Add "  title="Add ">Add </button>'+ 
                                        //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="table" class="table-striped def"></table>'+
                                    
                                '</div>'+
                            '</div>';//end form
                                
                    $("#boot").append(varForm);
                    $table= that.$('#table'); 
                  
                    break;}
            }
            this.hrTable(that,my);
                
        },
        selCall: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'asa/doc/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.tipo = "PO";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_ser = app.global.nick_array.arr.id;
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
                            that.setTab(that,$myData); 
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
                        console.error("doc asa load table error!!!");
                    }
                });
        }, //end setTab()----------------------------------------------------------------------
        hrTable: function (that,my) {//popola tabella con i dati ricevuti
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
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
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
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
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
                    console.log("id="+row.id_archivio);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                    jsonObj.tipo=row.tipo;
                        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'asa/doc/',
                            type:'post',
                            headers : $headers,
                            data :  jsonObj,
                            dataType : 'text',
                            success: function (datap) {
                                    bootbox.dialog({
                        title: "Delete item successful!",
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "OK",
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    
                                }
                            }
                        }
                    });
                                
                                $table.bootstrapTable('refresh',  that.selCall(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                }//remove    
                
            };
                
            that.$(".toolbar").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
            $.each( my.data, function( key, value1 ){
            
                if(typeof(value1["data_doc"]) !== "undefined" && value1["data_doc"] !== null){    
                    value1["data_docT"]='<span>'+moment(value1["data_doc"]).format('YYYYMMDD')+'</span>'+moment(value1["data_doc"]).format('MM/YYYY');
                    value1["data_doc"]=moment(value1["data_doc"]).format('DD/MM/YYYY');
                    
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
                pagination: false
            });
            this.$("#countSer").prepend(' '+my.data.length);
            function actionFormatter(value) {
                return [$format
                            ].join('');
            }  
                
        },
        render: function () {
            $(this.el).html(this.template());
            
            console.log(app.global.sub); // value=asa_cd_anziani | asa_cd_socializzazione   --app.global.sub viene impostato dalla selezione del navbar tramito il click sul selettore rifraf
             
            
            $person = app.global.tokensCollection.first().get("id_person");
            $servizio = app.global.tokensCollection.first().get("id_servizio");
            $token = app.global.tokensCollection.first().get("auth").token;
            //-----------breadcrumb---------------------------------------------------------
            while (app.global.breadcrumb.length>3) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //-------------------------------------------------------------------------------
            this.item="po";
            this.selCall(this);
      
            $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
            return this;

        },
        destroy_view: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.asa_cd_anziani_po_archivioView=null
        }
    });
return app.views.asa_cd_anziani_po_archivio;
});