require(['app','bootbox'], function(app,bootbox){
    app.views.formazione_list = Backbone.View.extend({
        initialize: function (e) {
            console.log("initializing formazione_list view: ");
       
      },
        events: {
            "click .create":"create",
            "click #gestio_video":"gestione_video",
            "click #gestio_utenti":"gestione_utenti",
            "click #add_video":"add_video",
            "click #excel":"downExcel",
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
        add_video: function (){
            console.log("click add_video ");
            app.global.nick_array.new=true;
           
                            var modalF="";
                            
                                    this.$('.modal-title').text("Add Video Formazione");  
                                    modalF=
                                        '<form id="mod_add" >'+
                                        '<div  class="form-group col-lg-12 alle">'+

                                            '<div class="form-group col-lg-6">'+
                                                '<label>Titolo</label>'+
                                                '<input type="text" class="form-control" name="titolo" id="titolo" >'+
                                            '</div>'+
                                            '<div class="form-group col-lg-6">'+
                                                '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                                '<input type="text" class="form-control" name="descrizione" id="descrizione" >'+
                                            '</div>'+

                                            '<div class="form-group col-lg-5">'+
                                                '<label for="allegato">Seleziona file</label>'+
                                                '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato"  accept="video/mp4,video/mkv, video/x-m4v,video/*">'+

                                            '</div>'+


                                        '</div>'+ 
                                        '<button type="button" id="btn_add" name="btn_add" class="btn btn-primary submit ">Add Video</button>'+
                                        '</form >'
                                    ;
                               
                           
                            this.$(".modal-body").empty();   
                            this.$(".modal-body").append(  modalF  );  
                            this.$("#mod_add").validate(); //sets up the validator
                            $("input[name=\"titolo\"]").rules( "add", {

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
                            this.$(".modal-footer").empty();  
                            this.$("#modal").modal('show'); 
                             that=this; 
                            this.$('#btn_add').click(function(e) {//add dalle modali
                                if( that.$("#mod_add").valid()){
                                   
                                    var API_URL = app.global.json_url + 'formazione/';
                                    var form_data = new FormData($("#mod_add")[0]); 
                                    form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'add');
                                    form_data.append('type', 'video');
                                                                   
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
                                        data: form_data,
                                        contentType: false,       // The content type used when sending data to the server.
                                        cache: false,             // To unable request pages to be cached
                                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                                        success: function ($mydata) {
                                            if ($mydata.success){
                                               that.selCall(that,"video");
                                            }
                                        }
                                    });
                                    that.$("#modal").modal('hide'); 
                                }else{
                                    console.log("btnAlle invalid");  
                                }

                            });  
                       
            
        },
        gestione_video: function (){
           
            app.global.nick_array.formazione="video";
            console.log("click gestione_video ",app.global.nick_array.formazione);
            this.selCall (this,"video"); 
        },
        gestione_utenti: function (){
            
            app.global.nick_array.formazione="utenti";
            console.log("click gestione_utenti ",app.global.nick_array.formazione);
            this.selCall (this,"utenti");
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
        selCall: function (that,$selezione) {//richiesta dati per popolare tabella
           
            $url=app.global.json_url+'formazione/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = $selezione;
            jsonObj = JSON.stringify(jsonObj);
            
            $.ajax({
                url: API_URL,
                type: 'post',
                data :  jsonObj,
                headers: this.headerJson(),
                success: function ($myData) {
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
                                           // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("formazione load table error!!!");
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
             
                'click .remove': function (e, value, row,index) {
                    console.log(app.global.nick_array,row);
                    if(app.global.nick_array.formazione=="video"){
                        $type="video";
                    }else{
                       $type="utenti"; 
                    }
                   
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "del";
                        jsonObj.id=row.id;
                        jsonObj.type=$type;
                        jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'formazione/',
                            type:'post',
                            headers : $headers,
                            data :  jsonObj,
                            success: function ( $mydata) {
                                bootbox.dialog({
                                    title: "Delete item successful!",
                                    message: $mydata.message,
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-info",
                                            callback: function() {
                                                $("body").removeClass("modal-open");
                                                that.selCall(that,"video");
                                            }
                                        }
                                    }
                                });
                             },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .update': function (e, value, row,index) {
                    console.log("update video",e, value, row);
                     app.global.nick_array.new=true;
           
                            var modalF="";
                            
                                    that.$('.modal-title').text("Update Video Formazione");  
                                    modalF=
                                        '<form id="mod_add" >'+
                                        '<input type="hidden" name="id" id="id" >'+
                                        '<div  class="form-group col-lg-12 alle">'+

                                            '<div class="form-group col-lg-6">'+
                                                '<label>Titolo</label>'+
                                                '<input type="text" class="form-control" name="titolo" id="titolo" >'+
                                            '</div>'+
                                            '<div class="form-group col-lg-6">'+
                                                '<label  id="lblDescrizione"  for="descrizione">Descrizione</label>'+
                                                '<input type="text" class="form-control" name="descrizione" id="descrizione" >'+
                                            '</div>'+
                                            '<div class="form-group col-lg-6">'+
                                                '<label >Nome File Video</label>'+
                                                '<input type="text" class="form-control" name="nome_file" id="nome_file" disabled>'+
                                            '</div>'+

                                            '<div class="form-group col-lg-5">'+
                                                '<label for="allegato">Update file</label>'+
                                                '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato"  accept="video/mp4,video/mkv, video/x-m4v,video/*">'+

                                            '</div>'+
                                             '<div class="form-check">'+
                                            '<input class="form-check-input" type="checkbox" id="online" name="online">'+
                                            '<label class="form-check-label" for="online">Online</label>'+
                                        '</div>'+

                                        '</div>'+ 
                                       
                                        '<button type="button" id="btn_add" name="btn_add" class="btn btn-primary submit ">Update Video</button>'+
                                        '</form >'
                                    ;
                               
                            that.$(".modal-footer").empty();  
                            that.$(".modal-body").empty();   
                            that.$(".modal-body").append(  modalF  );  
                            that.$("#mod_add").validate(); //sets up the validator
                            $("input[name=\"titolo\"]").rules( "add", {

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
                                required: false,
                                //number: true,
                                // minlength: 2,

                                messages: {
                                    required: "Required input"
                                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                    // number:"Inserire un numero!"
                                }
                            });
                            that.$("#modal").modal('show'); 

                            that.$("#titolo").val(row["titolo"]);
                            that.$("#descrizione").val(row["descrizione"]);
                            that.$("#nome_file").val(row["original_name"]);
                            that.$("#id").val(row["id"]);
                            if (row["online"]==1){
                                that.$("#online").prop('checked', true);
                            }else{
                                that.$("#online").prop('checked', false);
                            }
                            
                            that.$('#btn_add').click(function(e) {//add dalle modali
                                if( that.$("#mod_add").valid()){
                                   
                                    var API_URL = app.global.json_url + 'formazione/';
                                    var form_data = new FormData($("#mod_add")[0]); 
                                    form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', 'update');
                                    form_data.append('type', 'video');
                                                                   
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
                                        data: form_data,
                                        contentType: false,       // The content type used when sending data to the server.
                                        cache: false,             // To unable request pages to be cached
                                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                                        success: function ( $mydata) {
                                            if ($mydata.success){
                                               that.selCall(that,"video");
                                            }
                                        }
                                    });
                                    that.$("#modal").modal('hide'); 
                                }else{
                                    console.log("btnAlle invalid");  
                                }

                            }); 
                           
                  
                }
               
                
            };
            $table =  that.$("#table"); 
            that.$(".toolbar").empty().append(my.newR); 
            var $titolo_pannello=my.titolo_pannello;
            that.$("#pannello").empty().append($titolo_pannello);
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
                app.global.nick_array.newR=my.newR;
            }
           
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
        downExcel: function (){
            console.log("click downExcel "+app.global.nick_array.formazione);
            
            $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };
       
       
            var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable,$type=app.global.nick_array.formazione;
            // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
            $fields = $('#table').bootstrapTable('getVisibleColumns').map(function (column) {
                return column.title;
            });
            $fieldsIndex = $('#table').bootstrapTable('getVisibleColumns').map(function (column) {
                return column.field;
            });
            artw=FindVisibleFields();
            arTable1=$('#table').bootstrapTable('getData',artw);
            arTable=$('#table').bootstrapTable('getData');
            artw=FindVisibleFields();
            function FindVisibleFields() {
                var columns = $('#table').bootstrapTable('getVisibleColumns');
                var fields = [];
                for (var index in columns){
                //   console.log( columns[index].field,typeof(columns[index].field));
                    
                if(columns[index].field!="action") {
                    fields.push(columns[index].title);
                }
                
            }
            
                return fields;
            }
            $fields=FindVisibleFields();
            // console.log($("input"));
            console.log( artw);
            console.log( arTable);
            console.log($fields);
            console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
            for(i=0 ; i< arTable.length; i++){
                row = {};
                for(j=0 ; j< $fields.length; j++){
                console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j+1]]+"-----"+$fieldsIndex[j+1]);
                    row[ $fields[j]]=arTable[i][$fieldsIndex[j+1]];
                }
                $ar.push(row);   
            }
     
            console.log($ar);
            var jsonObj = {};
  
            var  $uurl= app.global.json_url + 'formazione/excel/';
            //jsonObj.nameQuery =$NameQuery;
            const table = $('#table');

            const visibleColumns = table
            .bootstrapTable('getVisibleColumns')
            .map((col) => col.field);

            const filteredData = table.bootstrapTable('getData');

            const exportConfig = {
                columns: $fields,
                data: filteredData
            };
           
            jsonObj.type =$type;
            jsonObj.exportConfig = exportConfig;
            jsonObj.table =$ar;
            jsonObj.col =$fields;
            jsonObj.doc ='excel';
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            file="BSA "+moment().format('YYYYMMDD HH:mm:ss')+".xlsx";
            //jsonObj.objParT =$arT;
            //jsonObj.file =file;
            jsonObj = JSON.stringify(jsonObj);
   
            $.ajax({
                url: $uurl,
                type:'post',
                headers : $headers,
            // dataType : 'text',
                data:jsonObj,
                
                success: function (json) {
                    $mydata =json;    
                    $filex=$mydata.file;
                    //window.location=$filex;
                    window.open($filex,'_blank');
                }
                        
            });


        },
      
     
render: function () {
    $(this.el).html(this.template());
      
    //-----------breadcrumb---------------------------------------------------------
    console.log(app.global.breadcrumb);
    while (app.global.breadcrumb.length>2) {//siamo al secondo livello
        app.global.breadcrumb.pop();
    }
    for (var i = 0; i < (app.global.breadcrumb).length; i++) {
        this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
    } 
    //-------------------------------------------------------------------------------
    console.log(app.global.nick_array.arr);
    //call x video o utenti default video
     app.global.nick_array.formazione="video";
    this.selCall(this,"video");
 
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