require(['app.min',"he.js","bootbox.all.min.js"], function(app,he,bootbox){


    /**
     * nicRap1 1.0
     * 
     * Copyright (c) 2009-2030 www.nicolarapuano.com. All rights reserved.
     *
     * Licensed under the freeware license: http://www.nicolarapuano.com/license_freeware
     * To use it on other terms please contact us: info@nicolarapuano.com
     *
     */

    app.functions['rap_attrezzature'] = function (that,$row){//prima carico i dati attrezzature
        if (app.global.attrezzatureCollection ) {
       
            console.log("attrezzatureCollection  esiste",app) 
            app.global.nick_array.attrezzature=app.global.attrezzatureCollection;
            app.functions.rap_attrezzature1(that);
      
           //that.listenTo( app.global.attrezzatureCollection, 'add', that.renderBook );
           // that.listenTo( app.global.attrezzatureCollection, 'reset', that.initialize );
        }else {
            console.log("attrezzatureCollection NON esiste la creo") ;
            app.models.attrezzature = Backbone.Model.extend({
                // idAttribute: '_id',
            });
            app.collections.attrezzature = Backbone.Collection.extend({
                model: app.models.attrezzature,
                parse: function(response) {
                    console.log(response);
                    // Save this scope inside a variable.
                    var self = this;
                    self.tab=response.tab;
                    self.format=response.format;
                    self.newR=response.newR;
                    self.data=response.data;
                    app.global.nick_array.attrezzature=response;
                
                    _.forEach(response.data, function(item) {
                        var member = new self.model();
                        _.forEach(item, function(value, key) {
                            member.set(key, value);
                        });
                        self.push(member);
                    });
                
                    // Check to see that the collection has been populated by models.
                    console.log('length of this collection: ' + this.length);
                    // Log the collection to the console to see if it gets populated correctly.
                    console.log(this);
                    return this.models;
                }
            });
            app.global.attrezzatureCollection = new app.collections.attrezzature;
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            app.global.attrezzatureCollection.fetch({
                url: app.global.json_url+ 'servizi/',
                type:"POST",
                headers: $headers,
                data :  JSON.stringify( {
                    person : app.global.tokensCollection.first().get("id_person"),
                    action : "get",
                    type : "DEPARTMENTS",
                    tab : "adm_attrezzature",
                    id_ser : app.global.nick_array.data.id
                }),
                parse: true,
                success: function(returnitem) {
                    console.log('ok retrieving item')
                    app.functions.rap_attrezzature1(that);
    
                   // self.listenTo( app.global.attrezzatureCollection, 'add', this.renderBook );
                   // self.listenTo( app.global.attrezzatureCollection, 'reset', this.render );
                },
                error: function(){
                    alert('error retrieving item');
                }
            });
        }
        app.functions.get_attrezzature(that,$row);
    };
    app.functions['get_attrezzature'] = function (that,$row) {
   
        var isNew=app.global.nick_array.isNew;
        console.log("isNew="+isNew,app.global.nick_array.data);
        var API_URL = app.global.json_url + 'servizi/';
        var that = this;
        var jsonObj = {};
        jsonObj.action = "get";
        jsonObj.tab = "adm_attrezzature";
        jsonObj.type = app.global.nick_array.arr;
        if(!isNew){//update
            jsonObj.id_ser = app.global.nick_array.data.id;
        }else{
            jsonObj.id_ser = "";   
        }
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        
        if(!isNew){//update
            console.log("isNew="+isNew); 
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            console.log("API_URL="+API_URL);
        $.ajax({
            url:API_URL,
            type:'post',
            headers : $headers,
           
            data :  jsonObj,
            dataType : 'text',
                   
            success: function (datap) {
            
            $mydata =JSON.parse(datap);
           
    
            console.log($mydata.message);
            
            //-------------------------------------------------------
            if ($mydata.success){
                $data=$mydata
                console.log($data);
                app.global.nick_array.attrezzature=$data;
                app.functions.rap_attrezzature1(that,$row);
                   
                }else {
                    bootbox.dialog({
                        title: "error",
                        message: "error " +$mydata.message,
                        buttons: {
                            main: {
                                label: "error",
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                }
                            }
                        }
                    });
                       
                }
            },
            error: function (response,exception) {
               
                // $mydata =JSON.parse(datap);
    
                bootbox.dialog({
                        title: "error",
                        message: "error " +$mydata.message,
                        buttons: {
                            main: {
                                label: "error",
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                }
                            }
                        }
                    });
                        
            }
        });
        }else{//new
            app.functions.rap_attrezzature1(that,$row); 
        }   
    
            
    };
    app.functions['actionEventsAA'] =  {
        'click .update': function (e, value, row) {
            console.log(e, value, row,app.global.nick_array);
            app.global.nick_array.new=false;
            app.global.nick_array.event="update"
            console.log("update attrezzature"+app.global.nick_array.arr,app.global.nick_array,row);
            app.global.nick_array.row=row;
            var $bread='';
            $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
            app.global.breadcrumb.push({
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            // app.global.nick_array.new=false;
           // app.routers.adminTecRouter.prototype.attrezzature_edit();
            app.functions.rap_attrezzature_edit(this);
            return;   
        },
        'click .remove': function (e, value, row) {
            
            //this.remove(e, row,value );
              
            console.log(app.global.nick_array.arr);
            
         that=this
            if (confirm('Sei sicuro di voler rimuovere quest\'Attrezzatura?')) {
                var jsonObj = {};
                jsonObj.action = "del";
                jsonObj.type = app.global.nick_array.arr;
                jsonObj.id_ser = app.global.nick_array.data.id;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_attrezzatura = row.id_attrezzatura;
                jsonObj.tab = "adm_attrezzature";
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                    url: app.global.json_url + 'servizi/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
               
                    success: function (datap) {
                        console.log(datap);
                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata.message));
                        if($mydata.error){
                            bootbox.dialog({
                            // title: that.language.header_hr_message,
                                title:  "Delete attrezzatura",
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: "OK",
                                        className: "btn btn-info",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            //hrTable($mydata);
                                            app.functions.rap_attrezzature(this,1);
                                        }
                                    }
                                }
                            });    
                            //showAlert($mydata.message, 'danger');
                        }else{
                            //showAlert('Delete item successful!', 'success');
                            //showAlert($mydata.message, 'success');
                             bootbox.dialog({
                            // title: that.language.header_hr_message,
                                title:  $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: "Delete attrezzatura",
                                        className: "btn btn-info",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            //hrTable($mydata);
                                            app.functions.rap_attrezzature(this,1);
                                        }
                                    }
                                }
                            });  
                           
                        }
                   //app.routers.adminTec.prototype.data_type_edit();
                    //    $table.bootstrapTable('refresh',  setTab());
                    },
                    error: function () {
                       // showAlert('Delete item error!', 'danger');
                        bootbox.dialog({
                            // title: that.language.header_hr_message,
                                title:  "Delete attrezzatura",
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: "OK",
                                        className: "btn btn-info",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            //hrTable($mydata);
                                            app.functions.rap_attrezzature(this,1);
                                        }
                                    }
                                }
                            });    
                    }
                })
            }
        }, //remove
        'click .remove_attrezzature': function (e, value, $row) {
            console.log("remove");
            if (confirm('Sei sicuro di voler rimuovere questo allegato ?')) {
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };
                var jsonObj = {};
                jsonObj.type="allegato";
                jsonObj.action = "del";
                jsonObj.id_ser = $row.id_ser;
                jsonObj.tab="attrezzature";
    
                jsonObj.id=$row.id;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);
    
    
                $.ajax({
                    url:app.global.json_url + 'servizi/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                        $mydata =JSON.parse(json);
                        //-------------------------------------------------------
                        if ($mydata.success){
                            $data=$mydata.data
                            console.log($data);
                            app.functions.rap_attrezzature(this,1);
                        }
                    }           
                });
                            
            }
        },
        'click .view_attrezzature': function (e, value, $row) {
            console.log("view");
            jsonObj = {};
            jsonObj.action = "download";
            jsonObj.type = "allegato";
            jsonObj.id_ser = $row.id_ser;
            jsonObj.tab="attrezzature";
    
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
        'click .download_attrezzature': function (e, value, $row) {
            
            console.log("download");
            jsonObj = {};
            jsonObj.action = "download";
            jsonObj.type = "allegato";
            jsonObj.id_ser = $row.id_ser;
            jsonObj.tab="attrezzature";
    
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
                   
        },
        update: function (e, row, value) {
            console.log("update "+app.global.nick_array.arr,app.global.nick_array,row);
            switch (app.global.nick_array.arr){
                case "rfa_magazzino":{
                    console.log("magazzino",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                   // app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
               
              
            }
      
        },
        remove: function (e, row, value) {
            that=this;
            console.log("id="+row.id);
            var $titleMsg,$msg,$type="";
            var API_URL = app.global.json_url + 'mag/';
            switch (app.global.nick_array.arr){
                case "rfa_magazzino":{
                    console.log("magazzino",row.id);
                    app.global.nick_array.row=row;
                    $tipoTab=1;
                    $type="articolo";
                    $titleMsg="Rimozione  Articolo: "+row.descrizione;
                    $msg="Vuoi rimuovere l'Articolo?";
                     
                    break;
                }
                case "rfa_magazzino_categorie":
                case "rfa_magazzino_sub_categorie_":{
                    console.log("categorie",row);
                    $tipoTab=4;
                    $type="categoria";
                    $titleMsg="Rimozione  Categoria "+row.descrizione;
                    $msg="Vuoi rimuovere la Categoria?";
                    break;
                }
                case "rfa_magazzino_fornitori_":{
                    console.log("fornitori",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li >'+row.name+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
              
            }
            bootbox.confirm({
                title: $titleMsg,
                message: $msg,
                buttons: {
                confirm: {
                label: 'Yes',
                className: 'btn-success'
                },
                cancel: {
                label: 'No',
                className: 'btn-danger'
                }
                },
                callback: function (result) {
                    if (result){
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = $type;
                    jsonObj.id=row.id;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : that.headerJson(),
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (data) {
                            $data =JSON.parse(data);
                            bootbox.alert({ 

                                title: $titleMsg,
                                message:  $data.message,
        
                                callback: function() {
                                    console.log("tipo_tab="+$tipoTab);
                                    app.routers.magRouter.prototype.mag("it",$tipoTab);//3 fornitori
                                 
                            }
                            });
                           
    
                        },
                        error: function () {
    
                            bootbox.alert({ 

                                title: $titleMsg,
                                message:  "Qualcosa è andato storto!",
        
                                callback: function() {
                                    
                                    app.routers.magRouter.prototype.mag("it",$tipoTab);//3 fornitori
                                 
                            }
                            });
                        }
                    });
                    }
                }
            });  
        },
    };  
    app.functions['rap_attrezzature1'] = function (that,$row){//
        console.log(app.global.nick_array.attrezzature);
        var $iAlle=0;
        
        var isNew=app.global.nick_array.isNew;
        
        $("#attrezzatures").empty();
        varForm='<h3><span class="badge">'+app.global.nick_array.attrezzature.data.length+' </span> Attrezzature  </h3><br>'+
                '<form class="attrezzatureForm" id="attrezzatureForm" name="attrezzatureForm" method="post">'+    
                    '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+
                    '<div id="contrattiL"></div>'+
                    '<div id="contrattiT">'+
                        
                        '<p class="toolbar">'+
                            '<button type="button"  class="btn btn-default contr-Plus"  data-title="Add Attrezzatura"  title="Add Attrezzatura">Add Attrezzatura</button>'+ 
                            //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                            '<span class="alert"></span>'+
                        '</p>'+
                        '<table id="tableAttrezzature" class="table table-striped"> </table>'+
                        
                    '</div>'+
                '</div>';//end form
                    
        $("#attrezzatures").append(varForm);
        //----------------------------------------------------------------------
        console.log(isNew,app.global.nick_array.attrezzature.data.length);
        //------------------------------------------------------------------------------------------------------------------------------
        if(!isNew && app.global.nick_array.attrezzature.data.length>0){ 
            hrfTable(app.global.nick_array.attrezzature);
        }
        //-------------------------------------------------------------------------------        
        function  hrfTable(my){
            var $table=$("#tableAttrezzature"); 
            console.log(my);
          
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                  //   value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=app.functions.actionEventsAA;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatterAA;
                }
            }); 
            $.each( my.data, function( key, value1 ){
                if(typeof( value1["data_acquisto"]) !== "undefined" && value1["data_acquisto"] !== null){  
                    value1["data_acquistoT"]='<span>'+moment(value1["data_acquisto"]).format('YYYYMMDD')+'</span>'+moment(value1["data_acquisto"]).format('DD/MM/YYYY');
                    value1["data_acquisto"]=moment(value1["data_acquisto"]).format('DD/MM/YYYY');
                }  
              
            });  
            $table.bootstrapTable('destroy');
                    
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                
                search:true
            });
             
            function actionFormatterAA() {
        
            return [my.format].join('');
            }

        }
        function  servizio_attrezzature_descrizione(row){
                var jsonObj = {};
                
                jsonObj.tab="attrezzature_descrizione";
                jsonObj.id = row.id;
                jsonObj.id_ser = row.id_ser;
                jsonObj.descrizione = row.descrizione;
                
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.action = "update";
                
                jsonObj = JSON.stringify(jsonObj);
               
                $.ajax({
                    url:app.global.json_url + 'servizi/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        if ($mydata.success){
                           
                            app.functions.rap_attrezzature(that,row);
                        
                        }else{
                            alert("Problema nell'inserimento dati nel DB!")
                        }
                       
                    }  
                });
        } 
            
        function cellStyle() {
            
               
        }
        $("#attrezzatureForm").validate(); //sets up the validator
            
        if(!isNew){//update
            $('#id_ser').val( app.global.nick_array.data.id);
        }
        
        $('.contr-Plus').click(function (e, value, row) {
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            switch (app.global.nick_array.arr){
                
                case "departments":
                $bread='<li>Nuova attrezzatura</li>';
                break;
            }
            
            app.global.breadcrumb.push({
                    
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.global.nick_array.event="create"
            //app.routers.adminTecRouter.prototype.attrezzature_edit();
            app.functions.rap_attrezzature_edit(that);
            return;  
        });
       
        $('.contr-Plus---').click(function () {
              
                   
                    $iAlle =  $iAlle + 1;
                    $i =  $iAlle;
                    console.log("attrezzature="+$i );
                  
                    $(".modal-body").empty();   
                    $(".modal-body").append(        
                        '<form id="modContratto" >'+
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
                        '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Add File</button>'+
                        '</form >'
                    );
            
                   
    
                    $("#mod_attrezzature").validate(); //sets up the validator
    
                 
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
            
                    $("#modal").modal('show');
                    $('.modal-title').text("Add attrezzatura");
                    //qui
                    
                    $('#btnAlle').click(function(e) {
                        if($("#mod_attrezzature").valid()){
                            console.log("btnAlle valid allegati"+$iAlle);
                            //--------------------------------------------------------------
                    var API_URL = app.global.json_url + 'servizi/';
                    
                    //var jsonObj = sendUrbans_formToJson(that);
                    var form_data = new FormData($('#modContratto')[0]); 
                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                    form_data.append('action', 'add');
                    form_data.append('tab', 'attrezzature');
                    form_data.append('allegato', 'allegato');
                    
                    form_data.append('id_ser', app.global.nick_array.data.id);
                  
                    
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
                              
                                var jsonObj = {};
                                jsonObj.action = "get";
                                jsonObj.tab = "attrezzature";
                                jsonObj.type = app.global.nick_array.arr;
    
                                jsonObj.id_ser = app.global.nick_array.data.id;
    
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                
                
                 
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
    
                                    $mydata =JSON.parse(datap);
     
            
                                    //-------------------------------------------------------
                                    if ($mydata.success){
                                        $data=$mydata.data
                                        console.log($data);
                                        //app.global.nick_array.urbanistici=$data;
                                        app.functions.rap_attrezzature(that,1);
                                        
    
                                            }
                                        }
                                    });
                                }
                            }
                         });
                      
                        
                        $("#modal").modal('hide'); 
                    }else{
                        console.log("btnAlle invalid");  
                    }
                       
              
                    });  
         
        });
    }; 
    app.functions['rap_attrezzature_edit'] = function (that,$row=null){//
        var isNew=app.global.nick_array.isNew;
        console.log("edit=",isNew);
      /*  $("#attrezzatures").empty();
        $('#attrezzatures').load('./js/templates/it/app.templates.attrezzature_form.html', function() {
        });   */
       
        app.views.attrezzature_edit.prototype.render();
       // console.log(app.views.attrezzature_edit.prototype.attrezzature_tab())
        
    };
});