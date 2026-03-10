require(['app','bootbox'], function(app,bootbox){
app.views.doc = Backbone.View.extend({
    initialize: function () {
        console.log("initializing doc view: ");
    },
    events: {
        "click-row.bs.table .def": "selRow",
       // "click-row.bs.table .attre": "selRowAttrezzature",
        "click .create":"addDoc",//non viene chiamata!
        "click .removeDoc--":"delDoc",
        "click .printPMA":"printPMA"
    },
    selRowAttrezzature: function ($element, row, field) {//record selezionato nella tabella -- scelta servizio
        console.log($element);
        console.log(row);
        console.log(field);
        console.log(app.global.nick_array.arr);
        var that=this;
    },   
    printPMA: function (e) {
       
        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        var jsonObj = {};
        jsonObj.type="PMA_all";
        jsonObj.action = "download";
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);


            $.ajax({
                url:app.global.json_url + 'rma_pma/planning/doc/',

                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    var  $mydata =JSON.parse(json);
                    console.log($mydata);
                    window.open($mydata.file,'_blank');
                }           
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
    delDoc: function (e) {
        console.log(e); 
         console.log("del doc");
          if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            var jsonObj = {};
            jsonObj.type="doc_personale";
            jsonObj.action = "del";
            jsonObj.id_ser = $row.id_ser;
            jsonObj.tab="antincendio";

            jsonObj.id=$row.id;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);


            $.ajax({
                url:app.global.json_url + 'doc/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    //-------------------------------------------------------
                    if ($mydata.success){
                        app.functions.rap_antincendi(this,1);
                    }
                }           
            });
                        
        }
         
     },
    addDoc: function (e) {
     console.log(e);
    var button  = $(e.currentTarget); 
    var tipoDoc= button.data('tipo');
    var title = button.data('title');
    var servizio = button.data('servizio');
    var $table = this.$('#table');
    var $modal = this.$('#modal').modal({ show: false });  
        console.log(tipoDoc);
    var modalF=
            '<form id="mod'+tipoDoc+'" >'+
            '<div  class="form-group col-lg-12 alle">'+

                '<div class="form-group col-lg-6">'+
                    '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                    '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                '</div>'+

                '<div class="form-group col-lg-5">'+
                    '<label for="allegato">Seleziona file</label>'+
                    '<input type="file" name="allegato" class="form-input col-lg-12 allegato" id="allegato" accept="image\/jpeg,image/gif,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">'+

                '</div>'+


            '</div>'+ 
            '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary ">Add File</button>'+
            '</form >'
       ;
   
    this.$(".modal-body").empty();  
    this.$(".modal-footer").empty();  
    this.$(".modal-body").append(modalF);  
    $modal.find('.modal-title').text(title);
    this.$("#mod"+tipoDoc).validate(); //sets up the validator
    //this.$(".modal-body").validate(); //sets up the validator
    $("input[name=\"allegato\"]").rules( "add", {
        required: true,
          //number: true,
          // minlength: 2,

        messages: {
            required: "Required input"
            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
            // number:"Inserire un numero!"
        }
    });
     $modal.modal('show'); 
        this.$('#btnAlle').click(function(e) {
        if($("#mod"+tipoDoc).valid()){
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'doc/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#mod"+tipoDoc)[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', tipoDoc);
                form_data.append('allegatoTipo', 'allegato');
                
                form_data.append('id_ser', servizio);
              
                
                var $headers = {
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
                      var  $mydata =JSON.parse(datap);
                       
                        //-------------------------------------------------------
                        if ($mydata.success){
                           // app.routers.router.prototype.data_type_edit();
                            console.log("ok");
                            //render();
                            var $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };
                            var jsonObj = {};
                            jsonObj.action = "get";
                            jsonObj.servizio = servizio;
                            jsonObj.type = app.global.nick_array.arr + "ROW";
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
                            $.ajax({
                                url: API_URL,
                                type: 'post',
                                headers: $headers,
                                data: jsonObj,
                                dataType: 'text',
                                success: function (datap) {
                                 var   $myData = JSON.parse(datap);
                                    if ($myData.success) {
                                        hrTable($myData);
                                    }
                                    else {
                                        bootbox.dialog({
                                            title: that.language.error_message,
                                            message: that.language.error_message + ' : ' + $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-danger",
                                                    callback: function () {
                                                        $("body").removeClass("modal-open");
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
                        }
                    }    
                });
                 function hrTable(my) {
            console.log(my);
             $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEventsX;
                }
                if(value1["formatter--"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter2;
                }
            }); 
                     $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
            $modal.modal('hide'); 
        }
            }   
        }); 
       
    },
    selRow: function ($element, row, field) {//record selezionato nella tabella -- scelta servizio
        console.log($element);
        console.log(row);
        console.log(field);
        console.log(app.global.nick_array.arr);
        var that=this;
      
        switch (app.global.nick_array.arr) {
            case 'rma_attrezzature':{
                var  $uurl= app.global.json_url + 'doc/';
                var reload=false;//
                var $bread =   that.$(".breadcrumb");
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="rma_attrezzature_detail";
                jsonObj.action ="get";
                jsonObj.servizio =row.id;
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url: $uurl,
                    type:'post',
                    headers : this.headerJson(),
                    dataType : 'text',
                    data:jsonObj,

                    success: function (json) {
                        $mydata =JSON.parse(json);
                        $moduli=$mydata.data;
                        that.$("#boot").empty();  
                        that.$("#tipi").empty();
                        console.log("rma_attrezzature");

                        that.$("#tipi").empty();
                        varForm='<h3> Attrezzature & Beni del Servizio  '+row.shortDescription+'</h3><br>'+
                            '<form class="personaleForm" id="personaleForm" name="personaleForm" method="post">'+    

                                     '<div class="panel panel-default">'+
                                        '<div class="panel-heading" role="tab" id="headingOne">'+
                                            '<h4 class="panel-title">'+
                                               
                                                    //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                                    'Attrezzature & Beni <span class="badge">'+$moduli.length+' </span>'+
                                              
                                            '</h4>'+
                                        '</div>'+

                                            '<div class="panel-body">'+
                                                '<input type="hidden" class="form-control" name="id" id="id">'+
                                                '<div id="moduli">'+

                                                    '<p class="toolbar">'+
                                                        '<div id="btnModulo">'+
                                                                '</div>'+
                                                        '<span class="alert"></span>'+
                                                    '</p>'+
                                                    '<table id="table" class="table-striped"> </table>'+

                                                '</div>'+


                                        '</div>'+
                                    '</div>'+

                            '</form>';
                        that.$("#boot").append('');
                        that.$("#tipi").append(varForm);

                        hrTable($mydata);
                    }

                });    
            
                function hrTable(my) {
                    console.log(reload);
                    that.$('.badge').text(my.data.length);
                  
                    reload=true;
                    while (app.global.breadcrumb.length>1) {
                        app.global.breadcrumb.pop();
                    }
        
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active">'+row.name+'</li>'
                    });
                    $bread.empty();
                    for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                        console.log((app.global.breadcrumb).length + "append->" + (app.global.breadcrumb)[i]['breadcrumb']);
                        $bread.append((app.global.breadcrumb)[i]['breadcrumb']);
                    }     
                   
                    $.each( my.tab, function( key, value1 ){
                        if(value1["cellStyle"]=="cellStyle"){
                            value1["cellStyle"]=cellStyle;
                        }
                        if(value1["events"]=="actionEvents"){
                            value1["events"]=actionEventsX;
                        }
                        if(value1["formatter--"]=="actionFormatter"){
                            value1["formatter"]=actionFormatter2;
                        }
                    }); 
                    console.log(my);
                    $table=this.$("#table");
                    $table.bootstrapTable('destroy');
                    $table.bootstrapTable({
                        data: my.data,
                        columns: my.tab,
                        detailView:true,
                        onExpandRow: function (index, row, $detail) {
                    
                            $table.find('.detail-view').each(function () {
                                if (!$(this).is($detail.parent())) {
                                    $(this).prev().find('.detail-icon').click()
                                }
                            })
                            //$detail.html(row.timestamp);
                            var API_URL = app.global.json_url + 'doc/';
                            var jsonObj = {};
                            
                            jsonObj.type ="rma_attrezzature_allegati";
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj.id_attrezzatura =row.id;
                            jsonObj.action ="get";
                            jsonObj = JSON.stringify(jsonObj);
                    
                            $headers = {
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            
                                //"username" : app.global.tokensCollection.first().get("username"),
                                "lang" : app.global.languagesCollection.at(0).get("lang"),
                                "Content-Type": "application/json"
                            };
                        
                            $.ajax({
                                url:API_URL,
                                type:'post',
                                headers : $headers,
                                data :  jsonObj,
                                dataType : 'text',
                                success: function (datap) {
            
                                    $mydata_all =JSON.parse(datap);
                                    // $mydata =(datap);
            
                                    console.log( ($mydata_all));
                                    //-------------------------------------------------------
                                    if ($mydata_all.success){
                                    
                                    
                                        detApp($mydata_all)
                                    }else{
            
                                    }
                                },
                                error: function () {
            
                                }
                            });
                            function detApp($allegati){
                                $data=$allegati.data;
                                $tab=$allegati.tab;
                                console.log($allegati);  
                                $detail.append(
                                        
                                    '<table id="table_all" class="table-striped "></table>'
                                );
                                $.each( $tab, function( key, value1 ){
                                    if(value1["cellStyle"]=="cellStyle"){
                                        value1["cellStyle"]=cellStyle;
                                    }
                                    if(value1["events"]=="actionEvents"){
                                        value1["events"]=actionEventsXX;
                                    }
                                    if(value1["formatter--"]=="actionFormatter"){
                                        value1["formatter"]=actionFormatter2;
                                    }
                                }); 
                                $table_all=this.$("#table_all");
                                $table_all.bootstrapTable('destroy');
                                $table_all.bootstrapTable({
                                    data:$data ,
                                    columns: $tab
                                })
                                    
                            }
                            window.actionEventsXX = {
                                'click .viewDoc': function (e, value, $row) {
                                     var $headers = {
                                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                    "lang": app.global.languagesCollection.at(0).get("lang"),
                                    "Content-Type": "application/json"
                                    };
                                    console.log("view");
                                    var jsonObj = {};
                                    jsonObj.action = "download";
                                    jsonObj.type = "doc_attrezzatura_allegato";
                                    jsonObj.id_ser = $row.id_ser;
                                    jsonObj.id=$row.id;
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);
             
             
                                    $.ajax({
                                        url:app.global.json_url + 'doc/',
                                        type:'post',
                                        headers : $headers,
                                        data :  jsonObj,
                                        dataType : 'text',
                                        success: function (datap) {
                                          var  $mydata =JSON.parse(datap);
                                            console.log($mydata);
                                            window.open($mydata.file,'_blank');
             
                                            // window.location.href=$mydata.file;
             
                                        },
                                        error: function () {
             
                                            console.log("View item error!");
                                        }
                                    });
             
                                },
                                'click .downloadDoc': function (e, value, $row) {
                                    var $headers = {
                                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                    "lang": app.global.languagesCollection.at(0).get("lang"),
                                    "Content-Type": "application/json"
                                };
                                    console.log("download");
                                    var jsonObj = {};
                                    jsonObj.action = "download";
                                    jsonObj.type = "doc_attrezzatura_allegato";
                                    jsonObj.id_ser = $row.id_ser;
                                    jsonObj.id=$row.id;
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);
             
             
                                    $.ajax({
                                        url:app.global.json_url + 'doc/',
                                        type:'post',
                                        headers : $headers,
                                        data :  jsonObj,
                                        dataType : 'text',
                                        success: function (datap) {
                                            var   $mydata =JSON.parse(datap);
                                            var link = document.createElement("a");
                                            link.download = $mydata.name;
                                            // Construct the uri
             
                                            link.href = $mydata.file;
                                            document.body.appendChild(link);
                                            link.click();
                                            // Cleanup the DOM
                                            document.body.removeChild(link);
             
                                        },
                                        error: function () {
             
                                            console.log("Download item error!");
                                        }
                                    });
             
                                }
                            };
                       
                        },
                        showColumns: false,
                        showRefresh: false,
                        search: true,
                        pagination: false
                    });
                }
                window.actionEventsX = {

                   'click .removeDoc': function (e, value, $row) {

                       if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
                           $headers = {
                               "X-Requested-With": "XMLHttpRequest",
                               "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                               //"username" : app.global.tokensCollection.first().get("username"),
                               "lang" : app.global.languagesCollection.at(0).get("lang"),
                               "Content-Type": "application/json"
                           };
                           var jsonObj = {};
                           jsonObj.type="doc_modulistica";
                           jsonObj.action = "del";
                           jsonObj.id_ser = $row.id_ser;


                           jsonObj.id=$row.id;
                           jsonObj.person = app.global.tokensCollection.first().get("id_person");
                           jsonObj = JSON.stringify(jsonObj);


                           $.ajax({
                               url:app.global.json_url + 'doc/',
                               type:'post',
                               headers : $headers,
                               data: jsonObj,
                               dataType : 'text',
                               success: function (json) {
                                  var $mydata =JSON.parse(json);
                                   //-------------------------------------------------------
                                   if ($mydata.success){
                                      
                                       reload=true;
                                     
                                       that.selRow($element, row, field);//reload SelRow
                                     
                                   }
                               }           
                           });

                       }
                   },
                   'click .viewDoc': function (e, value, $row) {
                        var $headers = {
                       "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                       "lang": app.global.languagesCollection.at(0).get("lang"),
                       "Content-Type": "application/json"
                   };
                       console.log("view");
                       var jsonObj = {};
                       jsonObj.action = "download";
                       jsonObj.type = "doc_modulistica";
                       jsonObj.id_ser = $row.id_ser;
                       jsonObj.id=$row.id;
                       jsonObj.person = app.global.tokensCollection.first().get("id_person");
                       jsonObj = JSON.stringify(jsonObj);


                       $.ajax({
                           url:app.global.json_url + 'doc/',
                           type:'post',
                           headers : $headers,
                           data :  jsonObj,
                           dataType : 'text',
                           success: function (datap) {
                             var  $mydata =JSON.parse(datap);
                               console.log($mydata);
                               window.open($mydata.file,'_blank');

                               // window.location.href=$mydata.file;

                           },
                           error: function () {

                               console.log("View item error!");
                           }
                       });

                   },
                   'click .downloadDoc': function (e, value, $row) {
                       var $headers = {
                       "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                       "lang": app.global.languagesCollection.at(0).get("lang"),
                       "Content-Type": "application/json"
                   };
                       console.log("download");
                       var jsonObj = {};
                       jsonObj.action = "download";
                       jsonObj.type = "doc_modulistica";
                       jsonObj.id_ser = $row.id_ser;
                       jsonObj.id=$row.id;
                       jsonObj.person = app.global.tokensCollection.first().get("id_person");
                       jsonObj = JSON.stringify(jsonObj);


                       $.ajax({
                           url:app.global.json_url + 'doc/',
                           type:'post',
                           headers : $headers,
                           data :  jsonObj,
                           dataType : 'text',
                           success: function (datap) {
                               var   $mydata =JSON.parse(datap);
                               var link = document.createElement("a");
                               link.download = $mydata.name;
                               // Construct the uri

                               link.href = $mydata.file;
                               document.body.appendChild(link);
                               link.click();
                               // Cleanup the DOM
                               document.body.removeChild(link);

                           },
                           error: function () {

                               console.log("Download item error!");
                           }
                       });

                   }
               };
                   
             break;}
            case 'rma_schede_sicurezza':{
               var  $uurl= app.global.json_url + 'doc/';
               var reload=false;//
               var $bread =   that.$(".breadcrumb");
               var jsonObj = {};
               jsonObj.person = app.global.tokensCollection.first().get("id_person");
               jsonObj.type ="rma_schede_sicurezza";
               jsonObj.action ="get";
               
               jsonObj = JSON.stringify(jsonObj);

               $.ajax({
                   url: $uurl,
                   type:'post',
                   headers : this.headerJson(),
                   dataType : 'text',
                   data:jsonObj,

                   success: function (json) {
                       $mydata =JSON.parse(json);
                       $moduli=$mydata.data;
                       that.$("#boot").empty();  
                       that.$("#tipi").empty();
                       console.log("rma_schede_sicurezza");

                       that.$("#tipi").empty();
                    
                       varForm='<h3>  Schede sicurezza manutenzione</h3><br>'+
                           '<form class="personaleForm" id="personaleForm" name="personaleForm" method="post">'+    

                                    '<div class="panel panel-default">'+
                                       '<div class="panel-heading" role="tab" id="headingOne">'+
                                           '<h4 class="panel-title">'+
                                               '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                                   //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                                   'Schede <span class="badge">'+$moduli.length+' </span>'+
                                               '</a>'+
                                           '</h4>'+
                                       '</div>'+

                                           '<div class="panel-body">'+
                                               '<input type="hidden" class="form-control" name="id" id="id">'+
                                               '<div id="moduli">'+

                                                   '<p class="toolbar">'+
                                                       '<div id="btnModulo">'+
                                                               '</div>'+
                                                       '<span class="alert"></span>'+
                                                   '</p>'+
                                                   '<table id="table" class="table-striped"> </table>'+

                                               '</div>'+


                                       '</div>'+
                                   '</div>'+

                           '</form>';
                       that.$("#boot").append('');
                       that.$("#tipi").append(varForm);

                       hrTablexx($mydata);
                   }

               });    

               function hrTablexx(my) {
                   console.log(reload);
                    console.log(app.global.breadcrumb.length);
                     console.log(app.global);
                    that.$('.badge').text(my.data.length);
                   if( reload!=true ){
                       reload=true;
                       while (app.global.breadcrumb.length>1) {
                           app.global.breadcrumb.pop();
                       }

                        console.log(reload,app.global.breadcrumb.length);
                       $bread.empty();
                       for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                           console.log((app.global.breadcrumb).length + "append->" + (app.global.breadcrumb)[i]['breadcrumb']);
                           $bread.append((app.global.breadcrumb)[i]['breadcrumb']);
                       }     
                       var newR=my.newR;

                       that.$('.toolbar').append(newR);
                       that.$('.contr-Plus').click(function (event) {
                            console.log("ceso");
                           var modalF="";
                           var button  = $(event.currentTarget); // Button that triggered the modal 
                           var tipoDisp= button.data('tipo');
                           console.log(tipoDisp);
                         
                            $tipoDisp=tipoDisp;
                            that.$('.modal-title').text("Add Scheda sicurezza RMA");  
                            modalF=
                                '<form id="mod'+tipoDisp+'" >'+
                                '<div  class="form-group col-lg-12 alle">'+

                                    '<div class="form-group col-lg-6">'+
                                        '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                        '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                                    '</div>'+

                                    '<div class="form-group col-lg-5">'+
                                        '<label for="allegato">Seleziona file</label>'+
                                        '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

                                    '</div>'+


                                '</div>'+ 
                                '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add File</button>'+
                                '</form >'
                            ;
                            
                                   
                                 
                           that.$(".modal-body").empty();   
                           that.$(".modal-body").append(  modalF  );  
                           that.$("#mod"+tipoDisp).validate(); //sets up the validator
                           $("input[name=\"descrizione\"]").rules( "add", {

                               required: true,
                               //number: true,
                               // minlength: 2,

                               messages: {

                                   required: "Required input"
                                   //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                   // number:"Inserire un numero!"
                               }
                           });
                           $("input[name=\"allegato\"]").rules( "add", {
                               required: true,
                               //number: true,
                               // minlength: 2,

                               messages: {
                                   required: "Required input"
                                   //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                   // number:"Inserire un numero!"
                               }
                           });
                           that.$("#modal").modal('show');  
                           that.$('#btn'+tipoDisp).click(function(e) {//add dalle modali
                               if(that.$("#mod"+tipoDisp).valid()){
                                   var API_URL = app.global.json_url + 'doc/';
                                   var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'add');
                                    form_data.append('type', 'rma_schede_sicurezza');
                                  
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

                                               that.selRow($element, row, field);//reload SelRow
                                           }
                                       }
                                   });
                                   that.$("#modal").modal('hide'); 
                               }else{
                                   console.log("btnAlle invalid");  
                               }

                           });  
                       });
                  } 
                   $.each( my.tab, function( key, value1 ){
                       if(value1["cellStyle"]=="cellStyle"){
                           value1["cellStyle"]=cellStyle;
                       }
                       if(value1["events"]=="actionEvents"){
                           value1["events"]=actionEventsX;
                       }
                       if(value1["formatter--"]=="actionFormatter"){
                           value1["formatter"]=actionFormatter2;
                       }
                   }); 
                   console.log(my);
                   $table=this.$("#table");
                   $table.bootstrapTable('destroy');
                   $table.bootstrapTable({
                       data: my.data,
                       columns: my.tab,
                       showColumns: false,
                       showRefresh: false,
                       search: true,
                       pagination: false
                   });
               }
               window.actionEventsX = {

                  'click .removeDoc': function (e, value, $row) {

                      if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
                          $headers = {
                              "X-Requested-With": "XMLHttpRequest",
                              "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                              //"username" : app.global.tokensCollection.first().get("username"),
                              "lang" : app.global.languagesCollection.at(0).get("lang"),
                              "Content-Type": "application/json"
                          };
                          var jsonObj = {};
                          jsonObj.type="rma_schede_sicurezza";
                          jsonObj.action = "del";
                          jsonObj.id=$row.id;
                          jsonObj.person = app.global.tokensCollection.first().get("id_person");
                          jsonObj = JSON.stringify(jsonObj);


                          $.ajax({
                              url:app.global.json_url + 'doc/',
                              type:'post',
                              headers : $headers,
                              data: jsonObj,
                              dataType : 'text',
                              success: function (json) {
                                 var $mydata =JSON.parse(json);
                                  //-------------------------------------------------------
                                  if ($mydata.success){

                                      reload=true;

                                      that.selRow($element, row, field);//reload SelRow

                                  }
                              }           
                          });

                      }
                  },
                  'click .viewDoc': function (e, value, $row) {
                       var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("view");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                            var  $mydata =JSON.parse(datap);
                              console.log($mydata);
                              window.open($mydata.file,'_blank');

                              // window.location.href=$mydata.file;

                          },
                          error: function () {

                              console.log("View item error!");
                          }
                      });

                  },
                  'click .downloadDoc': function (e, value, $row) {
                      var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("download");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                              var   $mydata =JSON.parse(datap);
                              var link = document.createElement("a");
                              link.download = $mydata.name;
                              // Construct the uri

                              link.href = $mydata.file;
                              document.body.appendChild(link);
                              link.click();
                              // Cleanup the DOM
                              document.body.removeChild(link);

                          },
                          error: function () {

                              console.log("Download item error!");
                          }
                      });

                  }
              };
                 $(document).on('editable-save.bs.table', '#table', function (e, field, row, rowIndex, oldValue, $el) {
            var jsonObj = {};
             var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
            jsonObj.type="rma_schede_sicurezza_descrizione";
            jsonObj.id = row.id;
            jsonObj.value =row[field];
            jsonObj.field =field;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "update";
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:app.global.json_url + 'doc/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                      
                    that.selRow($element, row, field);//reload SelRow
                 
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
        });

            break;}
            case 'rma_modulistica':{
                var  $uurl= app.global.json_url + 'doc/';
                var reload=false;//
                var $bread =   that.$(".breadcrumb");
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="rma_modulistica_detail";
                jsonObj.action ="get";
                jsonObj.servizio =row.id;
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url: $uurl,
                    type:'post',
                    headers : this.headerJson(),
                    dataType : 'text',
                    data:jsonObj,

                    success: function (json) {
                        $mydata =JSON.parse(json);
                        $moduli=$mydata.data;
                        that.$("#boot").empty();  
                        that.$("#tipi").empty();
                        console.log("rma_modulistica");

                        that.$("#tipi").empty();
                        varForm='<h3> Modulistica del Servizio  '+row.shortDescription+'</h3><br>'+
                            '<form class="personaleForm" id="personaleForm" name="personaleForm" method="post">'+    

                                     '<div class="panel panel-default">'+
                                        '<div class="panel-heading" role="tab" id="headingOne">'+
                                            '<h4 class="panel-title">'+
                                                '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                                    //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                                    'Moduli <span class="badge">'+$moduli.length+' </span>'+
                                                '</a>'+
                                            '</h4>'+
                                        '</div>'+

                                            '<div class="panel-body">'+
                                                '<input type="hidden" class="form-control" name="id" id="id">'+
                                                '<div id="moduli">'+

                                                    '<p class="toolbar">'+
                                                        '<div id="btnModulo">'+
                                                                '</div>'+
                                                        '<span class="alert"></span>'+
                                                    '</p>'+
                                                    '<table id="table" > </table>'+

                                                '</div>'+


                                        '</div>'+
                                    '</div>'+

                            '</form>';
                        that.$("#boot").append('');
                        that.$("#tipi").append(varForm);

                        hrTable($mydata);
                    }

                });    
            
                function hrTable(my) {
                    console.log(reload);
                     that.$('.badge').text(my.data.length);
                   // if( reload ){
                        reload=true;
                        while (app.global.breadcrumb.length>1) {
                            app.global.breadcrumb.pop();
                        }
        
                        app.global.breadcrumb.push({
                            breadcrumb: '<li class="breadcrumb-item active">'+row.name+'</li>'
                        });
                       $bread.empty();
                        for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                            console.log((app.global.breadcrumb).length + "append-"+i+">" + (app.global.breadcrumb)[i]['breadcrumb']);
                            $bread.append((app.global.breadcrumb)[i]['breadcrumb']);
                        }     
                        var newR=my.newR;
                       
                        that.$('.toolbar').append(newR);
                        that.$('.contr-Plus').click(function (event) {
                            var modalF="";
                            var button  = $(event.currentTarget); // Button that triggered the modal 
                            var tipoDisp= button.data('tipo');
                            switch(tipoDisp) {
                                case "modulistica":
                                    $tipoDisp=tipoDisp;
                                    that.$('.modal-title').text("Add Modulistica RMA");  
                                    modalF=
                                        '<form id="mod'+tipoDisp+'" >'+
                                        '<div  class="form-group col-lg-12 alle">'+

                                            '<div class="form-group col-lg-6">'+
                                                '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                                '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                                            '</div>'+

                                            '<div class="form-group col-lg-5">'+
                                                '<label for="allegato">Seleziona file</label>'+
                                                '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

                                            '</div>'+


                                        '</div>'+ 
                                        '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add File</button>'+
                                        '</form >'
                                    ;
                                break;
                            }
                            that.$(".modal-body").empty();   
                            that.$(".modal-body").append(  modalF  );  
                            that.$("#mod"+tipoDisp).validate(); //sets up the validator
                            $("input[name=\"descrizione\"]").rules( "add", {

                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {

                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            $("input[name=\"allegato\"]").rules( "add", {
                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {
                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            that.$("#modal").modal('show');  
                            that.$('#btn'+tipoDisp).click(function(e) {//add dalle modali
                                if(that.$("#mod"+tipoDisp).valid()){
                                    var API_URL = app.global.json_url + 'doc/';
                                    var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'add');
                                    form_data.append('type', 'doc_modulistica');
                                    form_data.append('subtype', "rma");
                                    if(row.id_ser === undefined || row.id_ser === null){ $ser= row.id; }else{$ser= row.id_ser; }
                                    console.log(row.id_ser,reload,row.id);
                                    form_data.append('id_ser', $ser);
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
                                              
                                                that.selRow($element, row, field);//reload SelRow
                                            }
                                        }
                                    });
                                    that.$("#modal").modal('hide'); 
                                }else{
                                    console.log("btnAlle invalid");  
                                }

                            });  
                        });
                    //} 
                    $.each( my.tab, function( key, value1 ){
                        if(value1["cellStyle"]=="cellStyle"){
                            value1["cellStyle"]=cellStyle;
                        }
                        if(value1["events"]=="actionEvents"){
                            value1["events"]=actionEventsX;
                        }
                        if(value1["formatter--"]=="actionFormatter"){
                            value1["formatter"]=actionFormatter2;
                        }
                    }); 
                    console.log(my);
                    $table=this.$("#table");
                    $table.bootstrapTable('destroy');
                    $table.bootstrapTable({
                        data: my.data,
                        columns: my.tab,
                        showColumns: false,
                        showRefresh: false,
                        search: true,
                        pagination: false
                    });
                }
                window.actionEventsX = {

                   'click .removeDoc': function (e, value, $row) {
                        var $testo='';
                        
                        if (confirm('Sei sicuro di voler rimuovere questo Modulo?')) {
                        
                            if($row.modulo_condiviso=="1"){
                                bootbox.confirm({
                                    message: 'Questo Modulo è condiviso con altri servizi,<br>vuoi rimuoverlo solo per questo  o per tutti i servizi?',
                                    buttons: {
                                    confirm: {
                                    label: 'Solo per questo Servizio',
                                    className: 'btn-success'
                                    },
                                    cancel: {
                                    label: 'Per tutti i Servizi',
                                    className: 'btn-danger'
                                    }
                                    },
                                    callback: function (result) {
                                    console.log('remove_one: ' + result);
                                    resp (result)
                                    }
                                });
    
                            }else{
                                resp (true);//elimino solo questo modulo x questo servizio
                            }
                            function resp (result) {
                                $headers = {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                    //"username" : app.global.tokensCollection.first().get("username"),
                                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                                    "Content-Type": "application/json"
                                };
                                var jsonObj = {};
                                jsonObj.remove_one = result;
                                jsonObj.type="doc_modulistica";
                                jsonObj.action = "del";
                                jsonObj.id_ser = $row.id_ser;
                                jsonObj.modulo_condiviso = $row.modulo_condiviso;
    
    
                                jsonObj.id=$row.id;
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
                                $.ajax({
                                    url:app.global.json_url + 'doc/',
                                    type:'post',
                                    headers : $headers,
                                    data: jsonObj,
                                    dataType : 'text',
                                    success: function (json) {
                                    var $mydata =JSON.parse(json);
                                        //-------------------------------------------------------
                                        if ($mydata.success){
                                        
                                            reload=true;
                                        
                                            that.selRow($element, row, field);//reload SelRow
                                        
                                        }
                                    }           
                                });
                            } 
                       
                        }
                    },
                   'click .viewDoc': function (e, value, $row) {
                        var $headers = {
                       "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                       "lang": app.global.languagesCollection.at(0).get("lang"),
                       "Content-Type": "application/json"
                   };
                       console.log("view");
                       var jsonObj = {};
                       jsonObj.action = "download";
                       jsonObj.type = "doc_modulistica";
                       jsonObj.id_ser = $row.id_ser;
                       jsonObj.id=$row.id;
                       jsonObj.person = app.global.tokensCollection.first().get("id_person");
                       jsonObj = JSON.stringify(jsonObj);


                       $.ajax({
                           url:app.global.json_url + 'doc/',
                           type:'post',
                           headers : $headers,
                           data :  jsonObj,
                           dataType : 'text',
                           success: function (datap) {
                             var  $mydata =JSON.parse(datap);
                               console.log($mydata);
                               window.open($mydata.file,'_blank');

                               // window.location.href=$mydata.file;

                           },
                           error: function () {

                               console.log("View item error!");
                           }
                       });

                   },
                   'click .downloadDoc': function (e, value, $row) {
                       var $headers = {
                       "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                       "lang": app.global.languagesCollection.at(0).get("lang"),
                       "Content-Type": "application/json"
                   };
                       console.log("download");
                       var jsonObj = {};
                       jsonObj.action = "download";
                       jsonObj.type = "doc_modulistica";
                       jsonObj.id_ser = $row.id_ser;
                       jsonObj.id=$row.id;
                       jsonObj.person = app.global.tokensCollection.first().get("id_person");
                       jsonObj = JSON.stringify(jsonObj);


                       $.ajax({
                           url:app.global.json_url + 'doc/',
                           type:'post',
                           headers : $headers,
                           data :  jsonObj,
                           dataType : 'text',
                           success: function (datap) {
                               var   $mydata =JSON.parse(datap);
                               var link = document.createElement("a");
                               link.download = $mydata.name;
                               // Construct the uri

                               link.href = $mydata.file;
                               document.body.appendChild(link);
                               link.click();
                               // Cleanup the DOM
                               document.body.removeChild(link);

                           },
                           error: function () {

                               console.log("Download item error!");
                           }
                       });

                   }
               };
                   
             break;}
            case 'anagrafica_servizi':{
                var  $uurl= app.global.json_url + 'doc/';
                    var jsonObj = {};
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.type ="anagrafica_servizi_detail";
                    jsonObj.action ="get";
                    jsonObj.servizio =row.id;
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                        url: $uurl,
                        type:'post',
                        headers : this.headerJson(),
                        dataType : 'text',
                        data:jsonObj,

                        success: function (json) {
                                        $mydata =JSON.parse(json);
                                        $servizio=$mydata.data[0];
                            that.$("#boot").empty();  
                that.$("#tipi").empty();
                console.log("anagrafica_servizi");
                 console.log($servizio.lista);
                that.$("#tipi").empty();
                varForm='<h3>'+row.servizioComPr+'</h3><br>'+
                           '<form class="anagrafica" id="anagrafica" name="anagrafica" >'+ 
                           '<div class="form-group col-lg-7" >'+ 
                                '<ul class="list-group">';
                                    $rowIndx=0
                                    $.each($servizio.lista, function( key, value1 ){
                                        console.log(key, value1);
                                        $rowIndx+=1;
                                       if($rowIndx%2==0){
                                          varForm+='<li class="list-group-item odd"><label>'+key+':</label>&nbsp;&nbsp;&nbsp;&nbsp;'+value1+'</li>';

                                       }else{
                                           varForm+='<li class="list-group-item even"><label>'+key+':</label>&nbsp;&nbsp;&nbsp;&nbsp;'+value1+'</li>';

                                       }

                                    });
                varForm+='</ul></div><div class="form-group col-lg-5" ><div id="preview2" class="form-group "><img id="blah" src="'+$servizio.img_link+'"></div></div>'+

                '</form>';
                that.$("#boot").append('');
                that.$("#tipi").append(varForm);
                         

                        }

                    });    
              
                
            break;}
            case 'DOC_PMA':
                if(row.num_pma!="PMA non disponibile"){
                    var  $uurl= app.global.json_url + 'rma_pma/planning/doc/';
                    var jsonObj = {};
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.type ="pdf";
                    jsonObj.action ="download";
                    jsonObj.year =  new Date().getFullYear()
                    jsonObj.servizio =row.id;

                    jsonObj.file ='PMA.pdf';
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                        url: $uurl,
                        type:'post',
                        headers : this.headerJson(),
                        dataType : 'text',
                        data:jsonObj,

                        success: function (json) {
                                        $mydata =JSON.parse(json);    
                           $filex=$mydata.file;
                           // console.log(id+"=id file="+$filex);
                           // console.log(" filex="+$filex);
                          // window.location=$filex;
                            window.open($filex,'_blank');

                        }

                    });
                } 
                break;
            case 'xDOC_Dispositivi':
                console.log('dispositivi');
                console.log(app.global.nick_array.data);
                app.global.nick_array.data=row;
                 console.log(app.global.nick_array.data);
                 app.functions.rap_antincendi(that,row);
                break;
            default:{
             
                var $ser,reload;//
                var $bread =   that.$(".breadcrumb");

                SelRow($element, row, field);  
                function SelRow($element, row, field){
                    console.log(row.id);
                    if(row.id_ser){  $ser= row.id_ser;}else{
                        $ser= row.id;
                         app.global.breadcrumb.push({
                            breadcrumb: '<li class="breadcrumb-item active">'+row.name+'</li>'

                         });
                     $bread.empty();
                                for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                                    console.log((app.global.breadcrumb).length + "append->" + (app.global.breadcrumb)[i]['breadcrumb']);
                                    $bread.append((app.global.breadcrumb)[i]['breadcrumb']);
                                }     
                    console.log(app.global.breadcrumb);
                    console.log((app.global.breadcrumb).length);
                    }//row.id -> il primo click sulla tabella dei servizi, altrimenti è il click sulla tabella dei documenti


                    var $table = that.$('#table');
                    var API_URL = app.global.json_url + 'doc/';
                    var $row = {};
                    var $myData = {};


                    var $modal = that.$('#modal').modal({ show: false });
                    var $alert = that.$('.alert').hide();
                    $alert = that.$('.alert').hide();
                    console.log((app.global.breadcrumb).length);
                    while ((app.global.breadcrumb).length > 1) {
                        (app.global.breadcrumb).pop();
                    }


                    var $headers = {
                        "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "lang": app.global.languagesCollection.at(0).get("lang"),
                        "Content-Type": "application/json"
                    };
                    $table.empty();
                    selCall(row.tipologia);
                    function selCall(tipologia) {//pulisco form e creo intestazione
                        console.log(app.global.nick_array.arr);
                        switch (app.global.nick_array.arr.toLowerCase()) {
                            
                          
                            case "doc_personale":
                                that.$("#boot").empty();  
                                that.$("#tipi").empty();

                                varForm=  
                                    '<div  id="docPersonale" name="docPersonale">'+
                                        '<h3>Documenti Personale</h3>'+
                                    '</div>';
                                that.$("#tipi").append(varForm);

                                break;
                            case "doc_contratti":
                                that.$("#boot").empty();  
                                that.$("#tipi").empty();

                                varForm=  
                                    '<div  id="docPersonale" name="docPersonale">'+
                                        '<h3>Contratti manutenzione</h3>'+
                                        '<div >'+
                                            '<p class="toolbar">'+
                                                '<div id="btnComunicazione"></div>'+
                                                '<span class="alert"></span>'+
                                            '</p>'+
                                            '<table id="table"> </table>'+

                                        '</div>'+
                                    '</div>';
                                that.$("#tipi").append(varForm);

                                break;
                            case "doc_planimetrie":
                                that.$("#boot").empty();  
                                that.$("#tipi").empty();

                                varForm=  
                                    '<div  id="docPlanimetrie" name="docPlanimetrie">'+
                                        '<h3>Planimetrie</h3>'+
                                        '<div >'+
                                            '<p class="toolbar">'+
                                                '<div id="btnComunicazione"></div>'+
                                                '<span class="alert"></span>'+
                                            '</p>'+
                                            '<table id="table"> </table>'+

                                        '</div>'+
                                    '</div>';
                                that.$("#tipi").append(varForm);

                                break;      
                            case "doc_dispositivi":
                                that.$("#boot").empty();  
                                that.$("#tipi").empty();

                                varForm=  
                                    '<div  id="docDispositivi" name="docDispositivi">'+
                                        '<h3>Dispositivi antincendio</h3>'+
                                    '</div>';
                                that.$("#tipi").append(varForm);

                                break;    
                            default:
                        }
                        reqTab(this,tipologia);
                    }
                    function reqTab(that,$tipoDisp) {//richiesta dati per popolare le diverse tabelle 
                        console.log(that);
                        var $headers = {
                        "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "lang": app.global.languagesCollection.at(0).get("lang"),
                        "Content-Type": "application/json"
                    };  

                        var jsonObj = {};
                        jsonObj.action = "get";
                        jsonObj.servizio = $ser;
                        jsonObj.type = app.global.nick_array.arr + "ROW";//qui determino se personale,iso,etc
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        $.ajax({
                            url: API_URL,
                            type: 'post',
                            headers: $headers,
                            data: jsonObj,
                            dataType: 'text',
                            success: function (datap) {
                                $myData = JSON.parse(datap);
                                if ($myData.success) {
                                    setTab(that,$myData,$tipoDisp);
                                   // hrTable($myData);
                                }
                                else {
                                    bootbox.dialog({
                                        title: that.language.error_message,
                                        message: that.language.error_message + ' : ' + $mydata.message,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-danger",
                                                callback: function () {
                                                    $("body").removeClass("modal-open");
                                                }
                                            }
                                        }
                                    });
                                }
                            },
                            error: function () {
                                console.error("Personale list error!!!");
                            }
                        });
                    } //end reqTab()---------------------------

                    function setTab(that,data,$tipoDisp){//tipodisp è una sub categoria se esiste
                    console.log("setTab");
                    console.log(app.global.nick_array.arr.toLowerCase());

                    switch (app.global.nick_array.arr.toLowerCase()) {
                        case "rma_attrezzature":
                            console.log("rma_attrezzature");

                               hrTable(data);
                            break;
                        case "doc_certificazioni":
                            console.log("certificazioni");

                               hrTable(data);
                            break;
                         case "doc_contratti":
                            console.log("contratti");

                               hrTable(data);
                            break;
                         case "doc_planimetrie":
                            console.log("planimetrie");

                               hrTable(data);
                            break;  
                            
                         case "doc_dispositivi":{
                            console.log("dispositivi");
                            that.$("#tipi").empty();
                            varForm='<h3> Dispositivi Antincendio del Servizio '+row.shortDescription+'</h3><br>'+
                                    '<form class="antincendioForm" id="antincendioForm" name="antincendioForm" method="post">'+    

                                        '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+

                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="headingOne">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                                            //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                                            'Planimetria Dispositivi <span class="badge">'+data.data.length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'+
                                                    '<div class="panel-body">'+
                                                        '<input type="hidden" class="form-control" name="id" id="id">'+
                                                        '<div id="impiantiT">'+
   
                                                            '<table id="tablePlanimetria"> </table>'+

                                                        '</div>'+

                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+        

    
    
                                        '<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">'+
                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="headingUno">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseUno" aria-expanded="false" aria-controls="collapseUno">'+

                                                           '<label id="lblInt-prog" ></label> Estintori <span class="badge">'+_.filter(data.dataDisp, function(num){return num.dispositivo=="estintore"}).length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+   
                                                '</div>'+
                                                '<div id="collapseUno" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingUno">'+
                                                    '<div class="panel-body">'+
                                                        '<div id="impiantiT">'+

                                                        '<table id="tableEstintori"> </table>'+

                                                    '</div>'+
                                                    '</div>  <!--div class="panel-body"-->'+
                                                '</div>  <!--div class="panel-collapse collapse"-->'+
                                            '</div>  <!--div class="panel panel-default"-->'+
                                        '</div><!--div class="panel-group"-->'+
     
                                        '<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">'+    
                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="headingFour">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion1" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">'+

                                                            'Maniglioni Antipanico <span class="badge">'+_.filter(data.dataDisp, function(num){return num.dispositivo=="maniglione"}).length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">'+
                                                    '<div class="panel-body">'+

                                                        '<div id="impiantiT">'+

                                                            '<table id="tableManiglioni"> </table>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div><!-- panel-group -->'+
                
                                        '<div class="panel-group" id="accordion3" role="tablist" aria-multiselectable="true">'+    
                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="heading3">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion3" href="#collapse3" aria-expanded="false" aria-controls="collapse3">'+

                                                            'Rilevazione Fumi <span class="badge">'+_.filter(data.dataDisp, function(num){return num.dispositivo=="fumo"}).length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">'+
                                                    '<div class="panel-body">'+

                                                        '<div id="impiantiT">'+

                                                            '<table id="tableFumi"> </table>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div><!-- panel-group -->'+
                
                                        '<div class="panel-group" id="accordion4" role="tablist" aria-multiselectable="true">'+    
                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="heading4">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#collapse4" aria-expanded="false" aria-controls="collapse4">'+

                                                            'Luci Emergenza <span class="badge">'+_.filter(data.dataDisp, function(num){return num.dispositivo=="luce"}).length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading4">'+
                                                    '<div class="panel-body">'+

                                                        '<div id="impiantiT">'+

                                                            '<table id="tableLuci"> </table>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div><!-- panel-group -->'+
                
                                        '<div class="panel-group" id="accordion5" role="tablist" aria-multiselectable="true">'+    
                                            '<div class="panel panel-default">'+
                                                '<div class="panel-heading" role="tab" id="heading5">'+
                                                    '<h4 class="panel-title">'+
                                                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#collapse5" aria-expanded="false" aria-controls="collapse5">'+

                                                            'Idranti <span class="badge">'+_.filter(data.dataDisp, function(num){return num.dispositivo=="idrante"}).length+' </span>'+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading5">'+
                                                    '<div class="panel-body">'+

                                                        '<div id="impiantiT">'+

                                                            '<table id="tableIdranti"> </table>'+

                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div><!-- panel-group -->'+
                                    '</div>';//end form

                            that.$("#tipi").append(varForm);
                            

                            hrAntTable(data);
                            function  hrAntTable(my){
                            var $table=that.$("#tablePlanimetria"); 
                                console.log(my.tab,app.functions);
                                $.each( my.tab, function( key, value1 ){
                                    if(value1["cellStyle"]=="cellStyle"){
                                        value1["cellStyle"]=cellStyle;
                                    }
                                    if(value1["events"]=="actionEvents"){
                                        value1["events"]=app.functions.actionEvents3;
                                    }
                                    if(value1["formatter"]=="actionFormatter"){
                                        value1["formatter"]=actionFormatter2;
                                    }
                                }); 

                                $table.bootstrapTable('destroy');

                                $table.bootstrapTable({
                                    data: my.data,
                                    columns: my.tab,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });

                                console.log(my.tab1);
                                $.each( my.tab1, function( key, value1 ){
                                    if(value1["cellStyle"]=="cellStyle"){
                                        value1["cellStyle"]=cellStyle;
                                    }
                                    if(value1["events"]=="actionEvents"){
                                        value1["events"]=actionEvents4;
                                    }
                                    if(value1["formatter"]=="actionFormatter"){
                                        value1["formatter"]=actionFormatter4;
                                    }
                                }); 

                                that.$("#tableEstintori").bootstrapTable('destroy');
                                that.$("#tableEstintori").bootstrapTable({
                                    data: _.filter(my.dataDisp, function(num){return num.dispositivo=="estintore"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#tableManiglioni").bootstrapTable('destroy');
                                that.$("#tableManiglioni").bootstrapTable({
                                    data: _.filter(my.dataDisp, function(num){return num.dispositivo=="maniglione"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#tableFumi").bootstrapTable('destroy');
                                that.$("#tableFumi").bootstrapTable({
                                    data: _.filter(my.dataDisp, function(num){return num.dispositivo=="fumo"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#tableLuci").bootstrapTable('destroy');
                                that.$("#tableLuci").bootstrapTable({
                                    data: _.filter(my.dataDisp, function(num){return num.dispositivo=="luce"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#tableIdranti").bootstrapTable('destroy');
                                that.$("#tableIdranti").bootstrapTable({
                                    data: _.filter(my.dataDisp, function(num){return num.dispositivo=="idrante"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });

                            } 
                            
                            function actionFormatter2() {
        
                                return [

                                    '<a class="downloadImpianto" href="javascript:" title="Download" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;',
                                    '<a class="viewImpianto" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;'
                                    ].join('');
                            }
        
                            function actionFormatter4() {

                                return [

                                    '<a class="editDispositivo" href="javascript:" title="Edit"><i class="glyphicon glyphicon-edit"></i></a>&emsp;&emsp;',
                                    '<a class="removeDispositivo" href="javascript:" title="Delete "><i class="glyphicon glyphicon-remove-circle"></i></a>'
                                ].join('');
                            }
                            window.actionEvents3 = {
    
    
                                'click .viewImpianto': function (e, value, $row) {
                                    console.log("view");
                                    jsonObj = {};
                                    jsonObj.action = "download";
                                    jsonObj.type = "allegato";
                                    jsonObj.id_ser = $row.id_ser;
                                    jsonObj.tab="antincendi";

                                    jsonObj.id=$row.id;
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);


                                    $.ajax({
                                        url:app.global.json_url + 'servizi/',
                                        type:'post',
                                        headers : $headers,
                                        data :  jsonObj,
                                        dataType : 'text',
                                        success: function (datap) {
                                            $mydata =JSON.parse(datap);
                                            console.log($mydata);
                                            window.open($mydata.file,'_blank');

                                            // window.location.href=$mydata.file;

                                        },
                                        error: function () {

                                            console.log("View item error!");
                                        }
                                    });

                                },
                                'click .downloadImpianto': function (e, value, $row) {

                                    console.log("download");
                                    jsonObj = {};
                                    jsonObj.action = "download";
                                    jsonObj.type = "allegato";
                                    jsonObj.id_ser = $row.id_ser;
                                    jsonObj.tab="antincendi";

                                    jsonObj.id=$row.id;
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);


                                    $.ajax({
                                        url:app.global.json_url + 'servizi/',
                                        type:'post',
                                        headers : $headers,
                                        data :  jsonObj,
                                        dataType : 'text',
                                        success: function (datap) {
                                            $mydata =JSON.parse(datap);
                                            var link = document.createElement("a");
                                            link.download = $mydata.name;
                                            // Construct the uri

                                            link.href = $mydata.file;
                                            document.body.appendChild(link);
                                            link.click();
                                            // Cleanup the DOM
                                            document.body.removeChild(link);

                                        },
                                        error: function () {

                                            console.log("Download item error!");
                                        }
                                    });

                                }
};}
                            break;  
                        case "doc_personale": {
                            var $iAlle=0,$a,$b,$c;
                            switch ($tipoDisp) {
                                case "":
                                    $a=$b=$c="";
                                    break;
                                case "comunicazione":
                                    $a="in";
                                    $b=$c="";
                                    break;
                                case "formazione":
                                    $b="in";
                                    $a=$c="";
                                    break;
                                case "studio":
                                    $c="in";
                                    $b=$a="";
                                    break;
                                default:
                                   
                            }
                            that.$("#tipi").empty();
                            varForm='<h3> Documenti Personale del Servizio  '+row.shortDescription+'</h3><br>'+
                                '<form class="personaleForm" id="personaleForm" name="personaleForm" method="post">'+    

                                    '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+

                                        '<div class="panel panel-default">'+
                                            '<div class="panel-heading" role="tab" id="headingOne">'+
                                                '<h4 class="panel-title">'+
                                                    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                                        //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                                        'Comunicazioni <span class="badge">'+_.filter(data.data, function(tipo){return tipo.tipologia=="comunicazione"}).length+' </span>'+
                                                    '</a>'+
                                                '</h4>'+
                                            '</div>'+
                                            '<div id="collapseOne" class="panel-collapse collapse '+$a+'" role="tabpanel" aria-labelledby="headingOne">'+
                                                '<div class="panel-body">'+
                                                    '<input type="hidden" class="form-control" name="id" id="id">'+
                                                    '<div id="impiantiT">'+

                                                        '<p class="toolbar">'+
                                                            '<div id="btnComunicazione">'+
                                                                    '</div>'+
                                                            '<span class="alert"></span>'+
                                                        '</p>'+
                                                        '<table id="tableComunicazioni"> </table>'+

                                                    '</div>'+

                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+        



                                    '<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">'+
                                        '<div class="panel panel-default">'+
                                            '<div class="panel-heading" role="tab" id="headingUno">'+
                                                '<h4 class="panel-title">'+
                                                    '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseUno" aria-expanded="false" aria-controls="collapseUno">'+

                                                       '<label id="lblInt-prog" ></label> Attestati di Formazione <span class="badge">'+_.filter(data.data, function(tipo){return tipo.tipologia=="formazione"}).length+' </span>'+
                                                    '</a>'+
                                                '</h4>'+   
                                            '</div>'+
                                            '<div id="collapseUno" class="panel-collapse collapse '+$b+'" role="tabpanel" aria-labelledby="headingUno">'+
                                                '<div class="panel-body">'+
                                                    '<div id="impiantiT">'+

                                                    '<p class="toolbar">'+
                                                        '<div id="btnFormazione">'+
                                                             '</div>'+
                                                        '<span class="alert"></span>'+
                                                    '</p>'+
                                                    '<table id="tableFormazione"> </table>'+

                                                '</div>'+
                                                '</div>  <!--div class="panel-body"-->'+
                                            '</div>  <!--div class="panel-collapse collapse"-->'+
                                        '</div>  <!--div class="panel panel-default"-->'+
                                    '</div><!--div class="panel-group"-->'+

                                    '<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">'+    
                                        '<div class="panel panel-default">'+
                                            '<div class="panel-heading" role="tab" id="headingFour">'+
                                                '<h4 class="panel-title">'+
                                                    '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion1" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">'+

                                                        'Titoli di Studio <span class="badge">'+_.filter(data.data, function(tipo){return tipo.tipologia=="studio"}).length+' </span>'+
                                                    '</a>'+
                                                '</h4>'+
                                            '</div>'+
                                            '<div id="collapseFour" class="panel-collapse collapse '+$c+'" role="tabpanel" aria-labelledby="headingFour">'+
                                                '<div class="panel-body">'+

                                                    '<div id="impiantiT">'+

                                                        '<p class="toolbar">'+
                                                            '<div id="btnStudio">'+
                                                                 '</div>'+        
                                                            '<span class="alert"></span>'+
                                                        '</p>'+
                                                        '<table id="tableStudio"> </table>'+

                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div><!-- panel-group -->'+

                                '</div>';//end form

                            that.$("#tipi").append(varForm);

                            console.log(app.global.nick_array.length);
                            if( data.length>0){ 


                            }
                            hrfTable(data);
                            //-------------------------------------------------------------------------------        
                            function  hrfTable(my){

                                console.log(_.filter(my.data, function(tipo){return tipo.tipologia=="comunicazione"}));  
                                var $table=that.$("#tableComunicazioni"); 
                                    console.log(my.tab);
                                    $.each( my.tab, function( key, value1 ){
                                        if(value1["cellStyle"]=="cellStyle"){
                                            value1["cellStyle"]=cellStyle;
                                        }
                                        if(value1["events"]=="actionEvents"){
                                            value1["events"]=actionEventsX;
                                        }

                                    }); 

                                $table.bootstrapTable('destroy');

                                $table.bootstrapTable({
                                    data:  _.filter(my.data, function(tipo){return tipo.tipologia=="comunicazione"}),
                                    columns: my.tab,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#btnComunicazione").append(my.newR);
                                // -------------------------------------------------------------------------
                                console.log(my.tab1);
                                $.each( my.tab1, function( key, value1 ){
                                    if(value1["cellStyle"]=="cellStyle"){
                                        value1["cellStyle"]=cellStyle;
                                    }
                                    if(value1["events"]=="actionEvents"){
                                        value1["events"]=actionEventsX;
                                    }

                                }); 
                                console.log(my.tab2);
                                $.each( my.tab2, function( key, value1 ){
                                    if(value1["cellStyle"]=="cellStyle"){
                                        value1["cellStyle"]=cellStyle;
                                    }
                                    if(value1["events"]=="actionEvents"){
                                        value1["events"]=actionEventsX;
                                    }

                                }); 

                                that.$("#tableFormazione").bootstrapTable('destroy');
                                that.$("#tableFormazione").bootstrapTable({
                                    data:  _.filter(my.data, function(tipo){return tipo.tipologia=="formazione"}),
                                    columns: my.tab1,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#btnFormazione").append(my.newR1);
                                //-----------------------------------------------------------------------
                                that.$("#tableStudio").bootstrapTable('destroy');
                                that.$("#tableStudio").bootstrapTable({
                                    data:  _.filter(my.data, function(tipo){return tipo.tipologia=="studio"}),
                                    columns: my.tab2,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                                that.$("#btnStudio").append(my.newR2);
                                //---------------------------------------------------------------------------


                            } //end hrfTable



                that.$("#personaleForm").validate(); //sets up the validator


                that.$('.contr-Plus').click(function (event) {
                    var modalF="";
                    var button  = $(event.currentTarget); // Button that triggered the modal 
                    var tipoDisp= button.data('tipo');

                    console.log(tipoDisp)  ;

                    $iAlle =  $iAlle + 1;
                    $i =  $iAlle;
                    switch(tipoDisp) {
                        case "comunicazione":
                            $tipoDisp=tipoDisp;
                                 that.$('.modal-title').text("Add Comunicazione");  
                                //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
                                modalF=
                                    '<form id="mod'+tipoDisp+'" >'+
                                        '<div  class="form-row  alle">'+

                                            '<div class="form-group col-lg-6">'+
                                                '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                                '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                                            '</div>'+

                                            '<div class="form-group col-lg-6">'+
                                                '<label for="allegato">Seleziona file</label>'+
                                                '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="application/pdf">'+

                                            '</div>'+


                                        '</div>'+ 
                                        '<div class="form-row">'+
                                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add File</button>'+
                                        '</div>'+ 
                                    '</form >'
                                ;

                            break;
                        case "formazione":


                            $tipoDisp=tipoDisp;
                            that.$('.modal-title').text("Add Attestato di Formazione"); 
                            modalF=
                                '<form id="mod'+tipoDisp+'" >'+
                                    '<div class="form-row">'+
                                        '<div class="form-group col-lg-6">'+
                                            '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                            '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="Descrizione" >'+
                                        '</div>'+
                                        '<div class="form-group col-lg-6">'+
                                            '<label for="'+$tipoDisp+'">Tipologia</label>'+
                                            '<select  name="tipologia" class="form-control disp required" id="tipologia" ></select>'+

                                        '</div>'+
                                     '</div>'+
                                     '<div class="form-row">'+
                                        '<div class="form-group col-lg-6">'+
                                           '<label  id="lblNome"  for="nome">Nome Cognome</label>'+
                                           '<input type="text" class="form-control" name="nome" id="nome" " placeholder="Nome Cognome" >'+
                                       '</div>'+
                                       '<div class="form-group col-lg-6">'+
                                           '<label for="allegato">Seleziona file</label>'+
                                           '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="application/pdf">'+

                                       '</div>'+
                                    '</div>'+
                                    '<div class="form-row">'+
                                        '<button type="button" id="btn'+$tipoDisp+'" name="btn'+$tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
                                    '</div>'+
                                '</form >'; 
                            var $headers = {
                                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                "lang": app.global.languagesCollection.at(0).get("lang"),
                                "Content-Type": "application/json"
                            };
                            var jsonObj = {};
                            jsonObj.action = "get";
                            jsonObj.type = "doc_catAttestatiFormazione";

                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);

                            $.ajax({
                                url:app.global.json_url + 'doc/',
                                type:'post',
                                headers : $headers,
                                data: jsonObj,
                                dataType : 'text',
                                success: function (json) {
                                    $mydata =JSON.parse(json);
                                    that.$('.disp').empty();
                                    $aa=$mydata.data;

                                    that.$('.disp').append('<option ></option>');
                                    $.each($aa, function(i, value) {

                                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                                    });


                                }  
                            });
                            break;
                        case "studio":
                            $tipoDisp=tipoDisp;
                            that.$('.modal-title').text("Add Titolo di Studio"); 
                            modalF=
                                '<form id="mod'+tipoDisp+'" >'+
                                    '<div  class="form-row">'+
                                        '<div class="form-group col-lg-6">'+
                                            '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                            '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                                        '</div>'+
                                        '<div class="form-group col-lg-6">'+
                                           '<label  id="lblNome"  for="nome">Nome Cognome</label>'+
                                           '<input type="text" class="form-control" name="nome" id="nome" " placeholder="Nome Cognome" >'+
                                       '</div>'+
                                    '</div>'+   
                                    '<div  class="form-row">'+    
                                        '<div class="form-group col-lg-12">'+
                                            '<label for="allegato">Seleziona file</label>'+
                                            '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="application/pdf">'+

                                        '</div>'+
                                    '</div>'+
                                    '<div  class="form-row">'+
                                        '<div class="form-group col-lg-12">'+
                                            '<button type="button" id="btn'+$tipoDisp+'" name="btn'+$tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</form >';

                            break;

                        default:
                            break;

                    }


                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);

                    that.$("#mod"+tipoDisp).validate(); //sets up the validator
                    switch(tipoDisp) {
                        case "comunicazione":
                            console.log('comunicazione-Val');

                             break;
                        case "studio":
                            console.log('studio-Val');
                            $("input[name=\"nome\"]").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"

                                }
                            });

                            break;
                        case "formazione":    
                            console.log(tipoDisp+'Val');
                            $("input[name=\"nome\"]").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"

                                }
                            });

                            $("input[name=\"tipologia\"]").rules( "add", {
                                required: true,

                                messages: {
                                    required: "Required input",
                                }
                            });
                            break;
                        default:
                            break;
                    }
                    $("input[name=\"descrizione\"]").rules( "add", {

                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {

                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });
                    $("input[name=\"allegato\"]").rules( "add", {
                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {
                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });
                    that.$("#modal").modal('show'); 
                    //qui

                    that.$('#btn'+tipoDisp).click(function(e) {//add dalle modali
                        if(that.$("#mod"+tipoDisp).valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'doc/';

                            //var jsonObj = sendUrbans_formToJson(that);
                            var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                            form_data.append('action', 'add');
                            form_data.append('type', 'doc_personale');
                            form_data.append('allegatoTipo', tipoDisp);
                            if(row.id_ser === undefined || row.id_ser === null){ $ser= row.id; }else{$ser= row.id_ser; }
                            //if(reload){form_data.append('id_ser', row.id_ser);}else{form_data.append('id_ser', row.id);}
                            console.log(row.id_ser,reload,row.id);
                            form_data.append('id_ser', $ser);

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
                                            reqTab(that,tipoDisp);


                                            }
                                        }
                                    });


                                that.$("#modal").modal('hide'); 
                            }else{
                            console.log("btnAlle invalid");  
                        }


                        });  

                    });}
                            break;
                        default:
                            break;

                    }//end switch
                };//end setTab
                    function hrTable(my) {
                        console.log(reload);
                          if( typeof reload !== 'undefined'){
                                var $breadx='<li class="breadcrumb-item active" href="" >' + row.shortDescription + '<\/li>';
                                    (app.global.breadcrumb).push($breadx);

                                    console.log((app.global.breadcrumb).length);
                                    $bread.empty();
                                    for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                                        console.log((app.global.breadcrumb).length + "append->" + (app.global.breadcrumb)[i]);
                                        $bread.append((app.global.breadcrumb)[i]);
                                    }
                           
                                var newR=my.newR;

                                $('.toolbar').append(newR);
                            } 
                        $.each( my.tab, function( key, value1 ){
                            if(value1["cellStyle"]=="cellStyle"){
                                value1["cellStyle"]=cellStyle;
                            }
                            if(value1["events"]=="actionEvents"){
                                value1["events"]=actionEventsX;
                            }
                            if(value1["formatter--"]=="actionFormatter"){
                                value1["formatter"]=actionFormatter2;
                            }
                        }); 
                        console.log(my);
                        $table=this.$("#table");
                        $table.bootstrapTable('destroy');
                        $table.bootstrapTable({
                            data: my.data,
                            columns: my.tab,
                            showColumns: true,
                            showRefresh: true,
                            search: true,
                            pagination: false
                        });
                    }
                    window.actionEventsX = {

                        'click .removeDoc': function (e, value, $row) {

                            if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
                                $headers = {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                    //"username" : app.global.tokensCollection.first().get("username"),
                                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                                    "Content-Type": "application/json"
                                };
                                var jsonObj = {};
                                jsonObj.type=app.global.sub;
                                jsonObj.action = "del";
                                jsonObj.id_ser = $row.id_ser;


                                jsonObj.id=$row.id;
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);


                                $.ajax({
                                    url:app.global.json_url + 'doc/',
                                    type:'post',
                                    headers : $headers,
                                    data: jsonObj,
                                    dataType : 'text',
                                    success: function (json) {
                                       var $mydata =JSON.parse(json);
                                        //-------------------------------------------------------
                                        if ($mydata.success){
                                            reload=true;

                                            SelRow($element, $row, field);//reload SelRow
                                            //reqTab(that,$row.tipologia);
                                        }
                                    }           
                                });

                            }
                        },
                        'click .viewDoc': function (e, value, $row) {
                             var $headers = {
                            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                            "lang": app.global.languagesCollection.at(0).get("lang"),
                            "Content-Type": "application/json"
                        };
                            console.log("view");
                            var jsonObj = {};
                            jsonObj.action = "download";
                            jsonObj.type = app.global.sub;
                            jsonObj.id_ser = $row.id_ser;
                            jsonObj.id=$row.id;
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);


                            $.ajax({
                                url:app.global.json_url + 'doc/',
                                type:'post',
                                headers : $headers,
                                data :  jsonObj,
                                dataType : 'text',
                                success: function (datap) {
                                  var  $mydata =JSON.parse(datap);
                                    console.log($mydata);
                                    window.open($mydata.file,'_blank');

                                    // window.location.href=$mydata.file;

                                },
                                error: function () {

                                    console.log("View item error!");
                                }
                            });

                        },
                        'click .downloadDoc': function (e, value, $row) {
                            var $headers = {
                            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                            "lang": app.global.languagesCollection.at(0).get("lang"),
                            "Content-Type": "application/json"
                        };
                            console.log("download");
                            var jsonObj = {};
                            jsonObj.action = "download";
                            jsonObj.type = app.global.sub;
                            jsonObj.id_ser = $row.id_ser;
                            jsonObj.id=$row.id;
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);


                            $.ajax({
                                url:app.global.json_url + 'doc/',
                                type:'post',
                                headers : $headers,
                                data :  jsonObj,
                                dataType : 'text',
                                success: function (datap) {
                                    var   $mydata =JSON.parse(datap);
                                    var link = document.createElement("a");
                                    link.download = $mydata.name;
                                    // Construct the uri

                                    link.href = $mydata.file;
                                    document.body.appendChild(link);
                                    link.click();
                                    // Cleanup the DOM
                                    document.body.removeChild(link);

                                },
                                error: function () {

                                    console.log("Download item error!");
                                }
                            });

                        }
                    };
                    
                }//end function SelRow
            } //end switch default         
        }//end switch
        
    },//end function selRow
   
    selCall: function (that) {//preparo i punti di aggancio
        console.log(app.global.sub);
        var $action,$url='';
        switch (app.global.sub) {
            case "doc_schede_sicurezza":{
              app.global.nick_array.arr = "rma_schede_sicurezza";
              console.log(app.global.nick_array.arr);
              that.$("#boot").empty();
              varForm=' <div id="newR"></div>'+
                      '<p class="toolbar">'+

                      '<span class="alert"></span>'+
                      '</p>'+
                      '<label id="countSer">   Schede sicurezza manutenzione * </label>'+
                      '<div id="tipoServizio"></div>'+
                      '<table id="table" class="table-striped def"></table>'
                         ;
              that.$("#boot").append(varForm);
              $table= that.$('#table'); 
              $action="get";
              $url=app.global.json_url + 'doc/';
             that.selRow("","","");
             return;
              break;}
            case "doc_modulistica":{
              app.global.nick_array.arr = "rma_modulistica";
              console.log(app.global.nick_array.arr);
              that.$("#boot").empty();
              varForm=' <div id="newR"></div>'+
                      '<p class="toolbar">'+

                      '<span class="alert"></span>'+
                      '</p>'+
                      '<label id="countSer">   Servizi  </label>'+
                      '<div id="tipoServizio"></div>'+
                      '<table id="table" class="table-striped def"></table>'
                         ;
              that.$("#boot").append(varForm);
              $table= that.$('#table'); 
              $action="get";
              $url=app.global.json_url + 'doc/';

              break;}
            case "doc_attrezzature":{
                app.global.nick_array.arr = "rma_attrezzature";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+
  
                        '<span class="alert"></span>'+
                        '</p>'+
                        '<label id="countSer">   Servizi  </label>'+
                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); 
                $action="get";
                $url=app.global.json_url + 'doc/';
  
                break;}  
            case "anagrafica_servizi":{
                app.global.nick_array.arr = "anagrafica_servizi";
                app.global.nick_array.tit = "anagrafica_servizi";
                app.global.nick_array.grp = "anagrafica_servizi".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+
                        '<label id="countSer">   Servizi  </label>'+
                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); 
                $action="get";
                $url=app.global.json_url + 'doc/';

                break;}
            case "doc_personale":{
                app.global.nick_array.arr = "DOC_Personale";
                app.global.nick_array.tit = "DOC_Personale";
                app.global.nick_array.grp = "DOC_Personale".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+

                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); 
                $action="get";
                $url=app.global.json_url + 'doc/';

                break;}
            case "doc_ISO":{
                app.global.nick_array.arr = "DOC_ISO";
                app.global.nick_array.tit = "DOC_ISO";
                app.global.nick_array.grp = "DOC_ISO".toLowerCase() + ".type";
               
                console.log(app.global.nick_array.arr);
                $action="get";
                $url=app.global.json_url + 'doc/';
                break;}
            case "doc_PMA":{
                app.global.nick_array.arr = "DOC_PMA";
                app.global.nick_array.tit = "DOC_PMA";
                app.global.nick_array.grp = "DOC_PMA".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+

                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                that.$("#boot").append(varForm);

                $table= that.$('#table'); //
                $action="get";
                $url=app.global.json_url + 'doc/';
                break;}   
            case "doc_Contratti":{
                app.global.nick_array.arr = "DOC_Contratti";
                app.global.nick_array.tit = "DOC_Contratti";
                app.global.nick_array.grp = "DOC_Contratti".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+

                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                    that.$("#boot").append(varForm);

                    $table= that.$('#table'); //
                $action="get";
                $url=app.global.json_url + 'doc/';
                break;}   
            case "doc_certificazioni":{
                app.global.nick_array.arr = "DOC_Certificazioni";
                app.global.nick_array.tit = "DOC_Certificazioni";
                app.global.nick_array.grp = "DOC_Certificazioni".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+

                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                    that.$("#boot").append(varForm);

                    $table= that.$('#table'); //
                $action="get";
                $url=app.global.json_url + 'doc/';
                break; }  
            case "doc_Planimetrie":{
                app.global.nick_array.arr = "DOC_Planimetrie";
                app.global.nick_array.tit = "DOC_Planimetrie";
                app.global.nick_array.grp = "DOC_Planimetrie".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                that.$("#boot").empty();
                varForm=' <div id="newR"></div>'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+

                        '<div id="tipoServizio"></div>'+
                        '<table id="table" class="table-striped def"></table>'
                           ;
                    that.$("#boot").append(varForm);

                    $table= that.$('#table'); //
                $action="get";
                $url=app.global.json_url + 'doc/';
                break;}  
            case "doc_dispositivi":{
              app.global.nick_array.arr = "DOC_Dispositivi";
              app.global.nick_array.tit = "DOC_Dispositivi";
              app.global.nick_array.grp = "DOC_Dispositivi".toLowerCase() + ".type";
              console.log(app.global.nick_array.arr);
              console.log(app.global.nick_array);
              that.$("#boot").empty();
              varForm=' <div id="newR"></div>'+
                      '<p class="toolbar">'+

                      '<span class="alert"></span>'+
                      '</p>'+

                      '<div id="tipoServizio"></div>'+
                      '<table id="table" class="table-striped def"></table>'
                         ;
                that.$("#boot").append(varForm);

                $table= that.$('#table'); //
                $action="get";
                $url=app.global.json_url + 'doc/';
              break; } 
            case "rfa_tutorial":{
               app.global.nick_array.arr = "rfa_tutorial";
               app.global.nick_array.tit = "rfa_tutorial";
               app.global.nick_array.grp = "rfa_tutorial".toLowerCase() + ".type";
               console.log(app.global.nick_array.arr);
               that.$("#boot").empty();
               varForm=' <div id="newR"></div>'+
                       '<p class="toolbar">'+

                       '<span class="alert"></span>'+
                       '</p>'+

                       '<div id="tipoServizio"></div>'+
                       '<table id="table"></table>'+
                        '<div id="html_contents"></div>'
                          ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); //
                $action="list";
                $url=app.global.json_url + 'tutorial/';
             
               break;}
            case "rma_tutorial":{
               app.global.nick_array.arr = "rma_tutorial";
               app.global.nick_array.tit = "rma_tutorial";
               app.global.nick_array.grp = "rma_tutorial".toLowerCase() + ".type";
               console.log(app.global.nick_array.arr);
               that.$("#boot").empty();
               varForm=' <div id="newR"></div>'+
                       '<p class="toolbar">'+

                       '<span class="alert"></span>'+
                       '</p>'+

                       '<div id="tipoServizio"></div>'+
                       '<table id="table"></table>'+
                        '<div id="html_contents"></div>'
                          ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); //
                $action="list";
                $url=app.global.json_url + 'tutorial/';
            
               break;}
            case "profile":{
              app.global.nick_array.arr = "profile";
              app.global.nick_array.tit = "profile";
              app.global.nick_array.grp = "profile".toLowerCase() + ".type";
              console.log(app.global.nick_array.arr);
              that.$("#boot").empty();
              varForm=' <div id="newR"></div>'+
                      '<p class="toolbar">'+

                      '<span class="alert"></span>'+
                      '</p>'+

                      '<div id="tipoServizio"></div>'+
                      '<table id="table"></table>'+
                       '<div id="html_contents"></div>'
                         ;
                that.$("#boot").append(varForm);
                $table= that.$('#table'); //
                $action="list";
                $url=app.global.json_url + 'profile/';
             
              break;}
            default:{
                app.global.nick_array.arr = "DOC_null";
                app.global.nick_array.tit = "DOC_null";
                app.global.nick_array.grp = "DOC_null".toLowerCase() + ".type";
                console.log(app.global.nick_array.arr);
                $action="get";
                $url=app.global.json_url + 'doc/';

                break;} 
        }
        this.setTab($action,$url);
            
        },
    setTab: function ($action,$url) {//richiesta dati per popolare tabella
        that=this;   
        var API_URL =''; 
        console.log("setTab");
         
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
                        case "DOC_ISO":{
                            that.doc_iso($myData); 
                            
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
        }, //end setTab()----------------------------------------------------------------------
    hrTable: function (my) {//popola tabella con i dati ricevuti
           console.log(my);
            if(typeof my.newR !== 'undefined'){
                            this.$("#newR").append(my.newR);
                        }
            $table=this.$("#table");           
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                search: true,
                pagination: false
            });
            this.$("#countSer").prepend(' '+my.data.length);
            that.$('.contr-Plus').click(function (event) {
                var modalF="";
                var button  = $(event.currentTarget); // Button that triggered the modal 
                var tipoDisp= button.data('tipo');
                switch(tipoDisp) {
                    case "modulistica":
                        $tipoDisp=tipoDisp;
                        that.$('.modal-title').text("Add Modulistica RMA");  
                        modalF=
                            '<form id="mod'+tipoDisp+'" >'+
                            '<div  class="form-group col-lg-12 alle">'+
                                '<div class="form-group col-lg-12">'+
                                    '<label  >Servizi</label>'+
                                    '<select class="selectpicker form-control" name="departmentplus[]" id="departmentplus" multiple data-actions-box="true"></select>'+
                                '</div>'+
                                '<div class="form-group col-lg-6">'+
                                    '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                    '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                                '</div>'+

                                '<div class="form-group col-lg-5">'+
                                    '<label for="allegato">Seleziona file</label>'+
                                    '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

                                '</div>'+


                            '</div>'+ 
                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add File</button>'+
                            '</form >'
                        ;
                    break;
                }
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(  modalF  );
                
                var $selDepPlus=that.$("#departmentplus").selectpicker();
                 //-------------------------------department_plus------------------------------------------
       jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.action = "get";     
                jsonObj.type = "anagrafica_servizi";
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                url:app.global.json_url + "doc/",
                type:'post',
                headers : that.headerJson(),
                data: jsonObj,
                dataType : 'text',
                    success: function (json) {
                    $mydata =JSON.parse(json);
                    $aa=$mydata.data;
                    department_plus($aa);
                    }
                    
                });
                function department_plus($aa){
                    console.log($aa)
                    $selDepPlus.empty();
        
                    var lista   = [];
                  //  lista.push('<option value="0">Tutti</option>');
                    $.each($aa, function(i, value) {
                        lista.push('<option value="'+$aa[i]["id"]+'">'+$aa[i]["servizioComPr"]+')</option>');
                    });
                    $selDepPlus.html(lista.join(''));
                    $selDepPlus.selectpicker('refresh');
                    $selDepPlus.selectpicker('val', '0');
                    $selDepPlus.selectpicker('render');
      
                }   
                $('.validate-form select').on('change', function(e) {
                    $('.validate-form').validate().element($(this));
                });   
                that.$("#mod"+tipoDisp).validate(); //sets up the validator
                $("input[name=\"departmentplus\"]").rules( "add", {

                    required: true,
                   
                    messages: {

                        required: "Required input"
                       
                    }
                });
                $("input[name=\"descrizione\"]").rules( "add", {

                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {

                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                $("input[name=\"allegato\"]").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                that.$("#modal").on('hide.bs.modal', function(){
                    console.log("test1")
                    that.render();
                  });
                that.$("#modal").modal('show');  
                that.$('#btn'+tipoDisp).click(function(e) {//add dalle modali
                    if(that.$("#mod"+tipoDisp).valid()){
                        var API_URL = app.global.json_url + 'doc/';
                        var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                        form_data.append('action', 'add');
                        form_data.append('type', 'doc_modulistica_condivisa');
                        form_data.append('subtype', "rma");
                        form_data.append('id_ser', "0");
                        
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
                                console.log(datap.message);
                                $mydata =JSON.parse(datap);

                                //-------------------------------------------------------
                                if ($mydata.success){
                                    // that.$("#modal").modal('hide')
                                  
                                console.log("test")
                              
                            
                                  //  that.selCall(that);//reload tabel
                                 // that.$("#modal").modal('hide'); 
                                 // that.render();
                                   // app.routers.docRouter.prototype.doc();
                                }
                            }
                        });
                        
                        that.$("#modal").modal('hide'); 
                        
                         

                    }else{
                        console.log("btnAlle invalid");  
                    }

                });  
            });
        },
    schede_sicurezza: function (my) {//popola tabella con i dati ricevuti
        console.log(my);
        if(typeof my.newR !== 'undefined'){
                            
          this.$("#newR").empty().append(my.newR);
            $('.contr-Plus').on("click",function (event) {
                that.$('.modal-title').text("Add Scheda sicurezza");  
                modalF=
                    '<form id="mod" >'+
                    '<div  class="form-group col-lg-12 alle">'+

                        '<div class="form-group col-lg-6">'+
                            '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                            '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                        '</div>'+

                        '<div class="form-group col-lg-5">'+
                            '<label for="allegato">Seleziona file</label>'+
                            '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

                        '</div>'+


                    '</div>'+ 
                    '<button type="button" id="btnScheda" name="btnScheda" class="btn btn-primary submit ">Add File</button>'+
                    '</form >'
                ;
                               
                            that.$(".modal-body").empty();   
                            that.$(".modal-body").append(  modalF  );  
                            that.$("#mod").validate(); //sets up the validator
                            $("input[name=\"descrizione\"]").rules( "add", {

                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {

                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            $("input[name=\"allegato\"]").rules( "add", {
                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {
                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            that.$("#modal").modal('show');  
                            that.$('#btnScheda').click(function(e) {//add dalle modali
                                if(that.$("#mod").valid()){
                                    var API_URL = app.global.json_url + 'doc/';
                                    var form_data = new FormData(document.getElementById("mod")); 
                                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'add');
                                    form_data.append('type', 'rma_schede_sicurezza');
                                   
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
                                                 reload=true;
                                                $action="get";
                                                 $url=app.global.json_url + 'doc/';
                                                that.setTab($action, $url);//reload tab
                                            }
                                        }
                                    });
                                    that.$("#modal").modal('hide'); 
                                }else{
                                    console.log("btnAlle invalid");  
                                }

                            });  
                        });
                        }
                           window.actionEventsX = {

                  'click .removeDoc': function (e, value, $row) {

                      if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
                          $headers = {
                              "X-Requested-With": "XMLHttpRequest",
                              "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                              //"username" : app.global.tokensCollection.first().get("username"),
                              "lang" : app.global.languagesCollection.at(0).get("lang"),
                              "Content-Type": "application/json"
                          };
                          var jsonObj = {};
                          jsonObj.type="rma_schede_sicurezza";
                          jsonObj.action = "del";
                          
                          jsonObj.id=$row.id;
                          jsonObj.person = app.global.tokensCollection.first().get("id_person");
                          jsonObj = JSON.stringify(jsonObj);


                          $.ajax({
                              url:app.global.json_url + 'doc/',
                              type:'post',
                              headers : $headers,
                              data: jsonObj,
                              dataType : 'text',
                              success: function (json) {
                                 var $mydata =JSON.parse(json);
                                  //-------------------------------------------------------
                                  if ($mydata.success){

                                      reload=true;
                                      hrTable(my);
                                     // that.selRow($element, row, field);//reload SelRow

                                  }
                              }           
                          });

                      }
                  },
                  'click .viewDoc': function (e, value, $row) {
                       var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("view");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                      
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                            var  $mydata =JSON.parse(datap);
                              console.log($mydata);
                              window.open($mydata.file,'_blank');
                               hrTable(my);
                              // window.location.href=$mydata.file;

                          },
                          error: function () {

                              console.log("View item error!");
                          }
                      });

                  },
                  'click .downloadDoc': function (e, value, $row) {
                      var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("download");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                     
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                              var   $mydata =JSON.parse(datap);
                              var link = document.createElement("a");
                              link.download = $mydata.name;
                              // Construct the uri

                              link.href = $mydata.file;
                              document.body.appendChild(link);
                              link.click();
                              // Cleanup the DOM
                              document.body.removeChild(link);
                              hrTable(my);
                          },
                          error: function () {

                              console.log("Download item error!");
                          }
                      });

                  }
              };
                      this.hrTable(my);
                        function hrTable(my) {
                        
                        $.each( my.tab, function( key, value1 ){
                            if(value1["cellStyle"]=="cellStyle"){
                                value1["cellStyle"]=cellStyle;
                            }
                            if(value1["events"]=="actionEvents"){
                                value1["events"]=actionEventsX;
                            }
                            if(value1["formatter--"]=="actionFormatter"){
                                value1["formatter"]=actionFormatter2;
                            }
                        }); 
                        console.log(my);
                        $table=this.$("#table");
                        $table.bootstrapTable('destroy');
                        $table.bootstrapTable({
                            data: my.data,
                            columns: my.tab,
                            showColumns: true,
                            showRefresh:false,
                            search: true,
                            pagination: false
                        });
                    }
                      
                    
       
        
       },  
    doc_iso: function (my) {//popola tabella con i dati ricevuti
        console.log(my);
        if(typeof my.newR !== 'undefined'){
                            
            this.$("#newR").empty().append(my.newR);
            $('.contr-Plus').on("click",function (event) {
                that.$('.modal-title').text("Add Folder");  
                modalF=
                    '<form id="mod" >'+
                    '<div  class="form-group col-lg-12 alle">'+

                        '<div class="form-group col-lg-6">'+
                            '<label  >Cartella</label>'+
                            '<input type="text" class="form-control" name="name_folder" id="name_folder" ">'+
                        '</div>'+

                    '</div>'+ 
                    '<button type="button" id="btnScheda" name="btnScheda" class="btn btn-primary submit ">Add Folder</button>'+
                    '</form >'
                ;
                               
                            that.$(".modal-body").empty();   
                            that.$(".modal-body").append(  modalF  );  
                            that.$("#mod").validate(); //sets up the validator
                            $("input[name=\"name_folder\"]").rules( "add", {

                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {

                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            $("input[name=\"allegato\"]").rules( "add", {
                                required: true,
                                //number: true,
                                // minlength: 2,

                                messages: {
                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            that.$("#modal").modal('show');  
                            that.$('#btnScheda').click(function(e) {//add dalle modali
                                if(that.$("#mod").valid()){
                                    var API_URL = app.global.json_url + 'doc/';
                                    var form_data = new FormData(document.getElementById("mod")); 
                                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'add');
                                    form_data.append('type', 'rma_schede_sicurezza');
                                   
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
                                                 reload=true;
                                                $action="get";
                                                 $url=app.global.json_url + 'doc/';
                                                that.setTab($action, $url);//reload tab
                                            }
                                        }
                                    });
                                    that.$("#modal").modal('hide'); 
                                }else{
                                    console.log("btnAlle invalid");  
                                }

                            });  
                        });
                        }
                           window.actionEventsX = {

                  'click .removeDoc': function (e, value, $row) {

                      if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
                          $headers = {
                              "X-Requested-With": "XMLHttpRequest",
                              "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                              //"username" : app.global.tokensCollection.first().get("username"),
                              "lang" : app.global.languagesCollection.at(0).get("lang"),
                              "Content-Type": "application/json"
                          };
                          var jsonObj = {};
                          jsonObj.type="rma_schede_sicurezza";
                          jsonObj.action = "del";
                          
                          jsonObj.id=$row.id;
                          jsonObj.person = app.global.tokensCollection.first().get("id_person");
                          jsonObj = JSON.stringify(jsonObj);


                          $.ajax({
                              url:app.global.json_url + 'doc/',
                              type:'post',
                              headers : $headers,
                              data: jsonObj,
                              dataType : 'text',
                              success: function (json) {
                                 var $mydata =JSON.parse(json);
                                  //-------------------------------------------------------
                                  if ($mydata.success){

                                      reload=true;
                                      hrTable(my);
                                     // that.selRow($element, row, field);//reload SelRow

                                  }
                              }           
                          });

                      }
                  },
                  'click .viewDoc': function (e, value, $row) {
                       var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("view");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                      
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                            var  $mydata =JSON.parse(datap);
                              console.log($mydata);
                              window.open($mydata.file,'_blank');
                               hrTable(my);
                              // window.location.href=$mydata.file;

                          },
                          error: function () {

                              console.log("View item error!");
                          }
                      });

                  },
                  'click .downloadDoc': function (e, value, $row) {
                      var $headers = {
                      "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                      "lang": app.global.languagesCollection.at(0).get("lang"),
                      "Content-Type": "application/json"
                  };
                      console.log("download");
                      var jsonObj = {};
                      jsonObj.action = "download";
                      jsonObj.type = "rma_schede_sicurezza";
                     
                      jsonObj.id=$row.id;
                      jsonObj.person = app.global.tokensCollection.first().get("id_person");
                      jsonObj = JSON.stringify(jsonObj);


                      $.ajax({
                          url:app.global.json_url + 'doc/',
                          type:'post',
                          headers : $headers,
                          data :  jsonObj,
                          dataType : 'text',
                          success: function (datap) {
                              var   $mydata =JSON.parse(datap);
                              var link = document.createElement("a");
                              link.download = $mydata.name;
                              // Construct the uri

                              link.href = $mydata.file;
                              document.body.appendChild(link);
                              link.click();
                              // Cleanup the DOM
                              document.body.removeChild(link);
                              hrTable(my);
                          },
                          error: function () {

                              console.log("Download item error!");
                          }
                      });

                  }
              };
                     hrTable(my);
                        function hrTable(my) {
                        
                        $.each( my.tab, function( key, value1 ){
                            if(value1["cellStyle"]=="cellStyle"){
                                value1["cellStyle"]=cellStyle;
                            }
                            if(value1["events"]=="actionEvents"){
                                value1["events"]=actionEventsX;
                            }
                            if(value1["formatter--"]=="actionFormatter"){
                                value1["formatter"]=actionFormatter2;
                            }
                        }); 
                        console.log(my);
                        $table=this.$("#table");
                        $table.bootstrapTable('destroy');
                        $table.bootstrapTable({
                            data: my.data,
                            columns: my.tab,
                            showColumns: true,
                            showRefresh:false,
                            search: true,
                            pagination: false
                        });
                    }
                      
                    
       
        
       },       
    tutorial: function (my) {//popola tabella con i dati ricevuti
           console.log(my);
           videoP(my.data);
          //-----------------------------------------------------------------------------------------------
        function videoP(my){
             $rowTitolo=my[0].titolo;
             $rowDescrizione=my[0].descrizione;
               $contenuto='<p></p><p></p><div "class col-lg-8">'+
                               '<p><center><strong><h1>Tutorial '+my[0].modulo+' </h1></strong></center></p>'+
                               '<p><center><h2>Titolo : <label id="tit"></>'+$rowTitolo+'</h2></center></p>'+
                               '<p><center><strong><h3>Descrizione : <label id="des"></>'+$rowDescrizione+'</h1></strong></center></p>'+
                               '<figure id="video_player">'+
                                   '<div id="video_container">'+
                                       '<video controls poster=""  controlsList="nodownload"  style="display:block; margin: 0 auto;" preload="metadata">'+
                                           '<source src="'+my[0].link+'#t=0.5" type="video/mp4">'+
                                       '</video>'+
                                   '</div>'+
                                   '<figcaption>';
                                       $ro=0;
                                       my.forEach(function(item){
                                           this.$rowTitolo=item.titolo;
                                           $contenuto += '<a href="'+item.link+'#t=0.5" class="currentvid" idx="'+$ro+'">'+
                                                           '<img src="./\css/\img/\arca-logo.jpg" title="'+item.titolo+'">'+

                                                           '</a>';  
                                                   $ro+=1;
                                       });

                                   $contenuto +='</figcaption>'+
                               '</figure>'+
                           '</div>';
               //----------------------------------------------
               $("#html_contents").empty();

               $("#html_contents").append($contenuto);

               var video_player = document.getElementById("video_player"),
               links = video_player.getElementsByTagName('a');
               that=this;
               console.log(this);
               for (var i=0; i<links.length; i++) {
                   links[i].onclick = handler;
               }



       }
         function handler(e,row) {

                       e.preventDefault();
                       console.log(that);
                      console.log(this);
                       console.log(row);
                      if(row){
                          tit = document.querySelector("#tit");
                      tit.innerHTML =row.titolo;  
                          videotarget =row.link;   
                      }else{

                           des = document.querySelector("#des");
                         tit = document.querySelector("#tit");
                      tit.innerHTML=this.children[0].getAttribute("title");
                        console.log(this.getAttribute("idx"));
                        $id=this.getAttribute("idx");
                       des.innerHTML=my.data[$id].descrizione;

                       videotarget = this.getAttribute("href");
                      }

                       console.log(tit);

                       console.log(videotarget);
                       filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
                        console.log(filename);
                       video = document.querySelector("#video_player video");
                       //video.removeAttribute("controls");
                       video.removeAttribute("poster");
                       source = document.querySelectorAll("#video_player video source");
                       source[0].src = filename + ".mp4";
                       //source[1].src = filename + ".webm";
                       video.load();
                       video.play();    
               } 
       //--------------------------------------------------------------------------------------  
       },    
    profile: function (my) {//popola tabella con i dati ricevuti
        console.log(my);
        $contenuto='<div class="row">'+
                        '<p><center><strong><h3>Profilo di '+my['data'].nome+' '+my['data'].cognome+'</h3></strong></center></p>'+
                        '<p><center><h4>E-mail : <label id="tit"></>'+my['data'].email+'</h4></center></p>'+

                    '</div>'+ 
                    '<div class="row">'+
                        '<form id="prof">'+
                            '<div class="form-group col-lg-12 ">'+ 
                                '<button type="button" id="btnPw" name="btnPw" class="btn btn-primary  ">Modifica password</button>'+
                            '</div>'+
                        '</form>';//end form 
                    '</div>'+ //
               //----------------------------------------------
               $("#html_contents").empty();

               $("#html_contents").append($contenuto);
               //----------------modale------------------------------
                  that.$('#btnPw').click(function (event) {
                    var modalF="";
                    var button  = $(event.currentTarget); // Button that triggered the modal 
               
                    that.$('.modal-title').text("Modifica password");  
                    $avv='Per garantire i livelli minimi di sicurezza, la password dovrà rispettare i seguenti criteri:\n'+
                            '- Minimo 8 caratteri massimo 20\n'+
                            '- Almeno un carattere minuscolo\n'+
                            '- Almeno un carattere MAIUSCOLO\n'+
                            '- Almeno un numero';
                    modalF=
                        '<form id="modProf" >'+
                            '<div  class="row">'+

                                '<div class="form-group col-lg-6">'+
                                    '<label  >Nome</label>'+
                                    '<input type="text" class="form-control" name="nome" id="nome" value="'+my['data'].nome+' '+my['data'].cognome+'" readonly >'+
                                '</div>'+
                                 '<div class="form-group col-lg-6">'+
                                    '<label  >Username</label>'+
                                    '<input type="text" class="form-control" name="username" id="username" value="'+app.global.tokensCollection.at(0).get("username")+'" readonly >'+
                                '</div>'+

                                  '<div class="form-group col-lg-6">'+
                                    '<label  >Nuova Password</label>'+
                                    '<input type="password" class="form-control" name="password" id="password" >'+
                                '</div>'+
                                  '<div class="form-group col-lg-6">'+
                                    '<label  >Ripeti Password</label>'+
                                    '<input type="password" class="form-control" name="replyPassword" id="replyPassword" >'+
                                '</div>'+
                                 '<div class="form-group col-lg-12">'+
                                    '<label  >Avvertenza</label>'+
                                    '<textarea  class="form-control" name="avvertenza" id="avvertenza" rows="6" readonly>'+$avv+'</textarea>'+
                                '</div>'+


                            
                                
                            '</div>'+ 
                        '</form >'
                    ;

                    $foot=  '<div  class="row">'+
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button" id="btnMod" name="btnMod" class="btn btn-primary submit col-lg-6 btn-block">Modifica password</button>'+
                                '</div>'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button"  class="btn btn-danger col-lg-6 btn-block" data-dismiss="modal"><span aria-hidden="true">&times;</span> Annulla</button>'+
                                '</div>'+ 
                              
                            '</div>';


                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);
                    that.$(".modal-footer").empty();   
                    that.$(".modal-footer").append($foot);
                  

                    $.validator.addMethod("check_password", function(value, element) {
                     //   return this.optional(element) || value.match(/^[a-zA-Z0-9@*_-.!]+$/);
                       return /^[a-zA-Z0-9\d=!\-@._*^]*$/.test(value) // consists of only these
                            && /[a-z]/.test(value) // has a lowercase letter
                            && /[A-Z]/.test(value) // has a lowercase letter
                            && /\d/.test(value) // has a digit
                           
                                         });
             
                      that.$("#modProf").validate({//sets up the validator
            rules: {
              
              
                password: {
                    required: true,
                    check_password: true,
                    maxlength: 20,
                    minlength: 8
                },
                replyPassword: {
                    required: true,
                    
                    equalTo: "#password"
                   
                }
                
            },
            messages:{
                 password: {
                        required: "Inserire la Password",
                         check_password:"Caratteri ammessi: a-z A-Z 0-9 @*^_-.!"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        },
                   replyPassword: {

                            required: "Reinserire la Password",
                             equalTo:"Le due password non corrispondono"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }       
                 }
            });
                  
                   
                    that.$("#modal").modal('show'); 
                      that.$("#modProf")[0].reset();
                    //qui

                    that.$('#btnMod').click(function(e) {//add dalle modali
                        if(that.$("#modProf").valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'profile/';
                            var jsonObj = {};
                                jsonObj.action = 'update';
                                jsonObj.type = 'password';
                                jsonObj.user =app.global.tokensCollection.first().get("id");//id user
                                jsonObj.person =app.global.tokensCollection.first().get("id_person");//
                                //jsonObj.password = that.$("#password").val();
                                jsonObj.p="";
                                jsonObj.p = hex_sha512(that.$("#password").val());
                            
                             jsonObj = JSON.stringify(jsonObj);
                          
                            $headers = {
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                //"username" : app.global.tokensCollection.first().get("username"),
                                "lang" : app.global.languagesCollection.at(0).get("lang"),
                                "Content-Type": "application/json"
                            };
                            
                            $.ajax({
                                url:API_URL,
                                type:'post',
                                headers : $headers,

                                data :  jsonObj,
                                //dataType: "json",
                                dataType : 'text',
                                success: function (datap) {
                                    console.log(datap);
                                    $mydata =JSON.parse(datap);

                                    //-------------------------------------------------------
                                    if ($mydata.success){
                                        bootbox.dialog({
                                            title: "Aggiornamento Password",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-succes",
                                                    callback: function () {
                                                        $("body").removeClass("modal-open");

                                                    }
                                                }
                                            }
                                        });


                                    }
                                }
                            });


                                that.$("#modal").modal('hide'); 
                            }else{
                            console.log("modProf invalid");  
                        }


                        });  

                    });



     
       //--------------------------------------------------------------------------------------  
       },       
    render: function (e) {
        $(this.el).html(this.template());
        console.log(app.global.sub); //app.global.sub viene impostato dalla selezione del navbar tramito il click sul selettore rifraf
        while ((app.global.breadcrumb).length > 1) {
            (app.global.breadcrumb).pop();
        }
        for (var i = 0; i < (app.global.breadcrumb).length; i++) {
            this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        console.log(app.global.breadcrumb);
        console.log((app.global.breadcrumb).length);
        var API_URL = app.global.json_url + 'doc/';
       
        var $myData = {};
        var $table; 
      
        var $headers = {
            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang": app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        this.selCall(this);
       
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
return app.views.doc;
});
