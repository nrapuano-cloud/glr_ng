require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.formazione_edit = Backbone.View.extend({
        initialize: function () {
            console.log("initializing formazione_edit: ");
      
        },
     
        events: {
            
            "click #invio_articolo":"invio",
            "click #pi_invio":"pi_invio",
            "click .contr-Plus":"ana_elementi_add",
            "click .equipe":"pi_equipe_add",
            "click .obiettivo":"pi_obiettivo_add",
            "click .verifica":"pi_obiettivo_verifica_add",
            "click .ass":"ass_new",
            "click #nuovo_allegato":"all_new",
            
           
        },
        all_new:function () {//allegato new
            app.global.nick_array.new_allegato=true;
            that=this;
            that.all_edit(that);
        },
        all_edit: function (that) {//assegnazioni edit add/update
            console.log(app.global.nick_array,that);
            $new_allegato=app.global.nick_array.new_allegato;//true/false
            
            $('.modal-title').text("Add Allegato");  
            //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
            tipoDisp="all";
            modalF=
            
                '<div class="row"><form id="mod'+tipoDisp+'" >'+
                '<input type="hidden" id="id_attrezzatura" name="id_attrezzatura" value="'+app.global.nick_array.row.id_attrezzatura+'"/>'+
                    '<div  class="form-row  alle">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  >Attrezzatura/Impianto</label>'+
                            '<input type="text" class="form-control" name="descrizione_attr" id="descrizione_attr" value="'+app.global.nick_array.row.descrizione+'" readonly/>'+
                        '</div>'+

                        
                        '<div class="form-group col-lg-6">'+
                        '<label  >Descrizione *</label>'+
                        '<input type="text" class="form-control" name="descrizione_all" id="descrizione_all" >'+
                    '</div>'+

                    '<div class="form-group col-lg-6">'+
                        '<label for="allegato">Seleziona file *</label>'+
                        '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="application/pdf,image/*">'+

                    '</div>'+
                     
                        '<div class="form-group col-sm-12">'+
                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add Allegato</button>'+
                        '</div>'+
                    '</div>'+ 
                '</form ></div>'
            ;
            
            $(".modal-body").empty();   
            $(".modal-body").append( modalF);
            $("#mod"+tipoDisp).validate({
                rules:{
                    descrizione:{
                        required: true,
                    },
                    allegato:{
                        required: true,
                    },
                },
                messages: {
                    descrizione: {
                        required: "Perfavore inserisci una descrizione dell'allegato!"
                    },
                    allegato: {
                        required: "Perfavore inserisci l'allegato!"
                    }
                }
                
            }); //sets up the validator
           
            var $add,$nota="";
           
           
     
            if( $new_allegato){
                $add="Add Allegato";
             
                $("#btn"+tipoDisp).val($add).html($add);
               
            }else{
                $add="Update Allegato";
                //app.global.nick_array.assegnazione_add="update";
                $descrizione=app.global.nick_array.row_allegato.descrizione;
                $file=app.global.nick_array.row_allegato.file;
               // $nota=app.global.nick_array.row_allegato.nota;
                $("#btn"+tipoDisp).val($add).html($add);
                  $("#descrizione_all").val($descrizione);
                //  that.$("#allegato").val($file);
             
            }
            $("#modal").modal('show'); 
            $('.modal-title').text($add);
     
          
            
           // $('#datetimepicker6').datetimepicker('setStartDate', '-2y');
           // $('#datetimepicker6').datetimepicker('setEndDate', '+0d');
            //qui
            
            $('#btn'+tipoDisp).click(function(e) {//add dalle modali
                if($("#mod"+tipoDisp).valid()){
                    console.log(app.global.nick_array);
                    //--------------------------------------------------------------
                    

                    var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                    form_data.append('action', $new_allegato?'add':"update");
                    form_data.append('type', 'adm_attrezzature_allegato');
                    form_data.append('tab', 'adm_attrezzature_allegato');
                    form_data.append('id_ser', app.global.nick_array.data.id);
                     var $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                      //  "Content-Type": "application/json"
                    };
                    var API_URL = app.global.json_url + 'servizi/';
                    var $id_articolo=app.global.nick_array.row.id;
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
                                console.log("ok");
                                bootbox.dialog({
                                    title: $add,
                                    message: "Allegato OK!",
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-success",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                                $("#modal").modal('hide'); 
                                                that.attrezzature_allegati_call(that,app.global.nick_array.row.id_attrezzatura);
                                            }
                                        }
                                    }
                                });
                            }else{
                                console.log("ko");
                                bootbox.dialog({
                                    title: $add,
                                    message: "Allegato KO!",
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-danger",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                                $("#modal").modal('hide'); 
                                            }
                                        }
                                    }
                                });

                            }
                        },
                        error: function () {
                            console.log("ko");
                                bootbox.dialog({
                                    title: "Add Allegato",
                                    message: "Allegato KO!!",
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-danger",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                                that.$("#modal").modal('hide'); 
                                            }
                                        }
                                    }
                                });
                        }
                    });


                    
                }else{
                    console.log("btnAlle invalid");  
                }
            });
        },
       
        attrezzature_tab: function () {//anagrafica
            that=this;
            $('#attrezzatures').empty();
            $('#attrezzatures').load('./js/templates/it/app.templates.attrezzature_form.html', function() {
                that.attrezzature();
            }); 
        },
        attrezzature: function () {
            $new=app.global.nick_array.new;
            console.log("attrezzature","new="+$new);
            if(typeof app.global.nick_array.newR !== 'undefined'){
                this.$(".toolbar").append(app.global.nick_array.newR);
            }
            
            if(!$new){//update
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'
                $row=app.global.nick_array.row;
                console.log("update", $row);
                $('#stepx').empty() ;
                this.cat(this);
            }else{
              $('#stepx').empty() ;
                this.cat(this);
            }
        },
        attrezzature_allegati_call: function (that,$id) {//
            $action="post";
            $url=app.global.json_url+'servizi/';

            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
            jsonObj.action = "get";
            jsonObj.id = $id;
            jsonObj.type = "adm_attrezzature_allegati_id";
            jsonObj.tab = "adm_attrezzature_allegati_id";
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
                        that.attrezzature_allegati_table(that,$myData); 
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
                                            //app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("attrezzature load table error!!!");
                }
            });
            
        },
       
        attrezzature_allegati_table: function (that,my) {//
            $table =  $("#table_all"); 
            $("#badge_all").html(my.data.length); 
            var actionFormatter=my.format;
            $format=my.format;
            $id_ser=my.data_id.id_servizio;
           console.log(my);
           window.actionEvents1 = {
     
                'click .remove_all': function (e, value, row,index) {
                    console.log(row);
                    if (confirm('Vuoi eliminare quest\'Allegato?')) {
                        jsonObj = {};
                        jsonObj.action = "del";
                        jsonObj.tab='adm_attrezzature_allegato';
                        jsonObj.id=row.id;
                        jsonObj.id_ser=my.data_id.id_servizio;
                        jsonObj.type="allegato";
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'servizi/',
                            type:'post',
                            headers : $headers,
                            data :  jsonObj,
                            dataType : 'text',
                            success: function (datap) {
                                $mydata =JSON.parse(datap);
                                if ($mydata.success){
                                bootbox.dialog({
                                    title: "Delete item successful!",
                                    message: $mydata.message,
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-info",
                                            callback: function() {
                                                $("body").removeClass("modal-open");
                                                that.attrezzature_allegati_call(that,my.data_id.id);
                                            }
                                        }
                                    }
                                });
                            }else{
                                console.log("ko");
                                bootbox.dialog({
                                    title: "Remove Allegato",
                                    message: "Remove Allegato KO!",
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-danger",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                                that.$("#modal").modal('hide'); 
                                            }
                                        }
                                    }
                                });

                            }
                            },
                            error: function () {
                                console.log("ko");
                                    bootbox.dialog({
                                        title: "Remove Allegato",
                                        message: "Remove Allegato KO!!",
                                        buttons: {
                                            main: {
                                                label: "OK",
                                                className: "btn btn-danger",
                                                callback: function () {
                                                    $("body").removeClass("modal-open");
                                                    that.$("#modal").modal('hide'); 
                                                }
                                            }
                                        }
                                    });
                            }
                            
                        });

                    }
                },//remove 
                'click .edit_all': function (e, value, row,index) {
                    console.log(row);
                    
                    app.global.nick_array.row_allegato=row;
                
                    app.global.nick_array.new_allegato=false;
                    that.all_edit(that);

                
                },
                'click .viewDoc': function (e, value, $row) {
                    console.log($row);
                    var $headers = {
                        "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "lang": app.global.languagesCollection.at(0).get("lang"),
                        "Content-Type": "application/json"
                    };
                    console.log("view");
                    var jsonObj = {};
                    jsonObj.action = "download";
                    jsonObj.type="allegato";
                    jsonObj.tab="adm_attrezzature";
                    jsonObj.id_ser=$id_ser;
                    jsonObj.id=$row.id;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    jsonObj.tab="adm_attrezzature";

                    $.ajax({
                        url:app.global.json_url + 'servizi/',
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
                    jsonObj.type="allegato";
                    jsonObj.tab="adm_attrezzature";
                    jsonObj.id=$row.id;
                    jsonObj.id_ser=$id_ser;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);


                    $.ajax({
                        url:app.global.json_url + 'servizi/',
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
            $.each( my.data, function( key, value1 ){
            
                if(typeof(value1["data_inizio"]) !== "undefined" && value1["data_inizio"] !== null){    
                    value1["data_inizioT"]='<span>'+moment(value1["data_inizio"]).format('YYYYMMDD')+'</span>'+moment(value1["data_inizio"]).format('DD/MM/YYYY');
                    value1["data_inizio"]=moment(value1["data_inizio"]).format('DD/MM/YYYY');
                    
                }
                if(typeof(value1["data_fine"]) !== "undefined" && value1["data_fine"] !== null){    
                    value1["data_fineT"]='<span>'+moment(value1["data_fine"]).format('YYYYMMDD')+'</span>'+moment(value1["data_fine"]).format('DD/MM/YYYY');
                    value1["data_fine"]=moment(value1["data_fine"]).format('DD/MM/YYYY');
                    
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
    
                    value1["events"]=actionEvents1;
                }
    
            });              
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                search: true,
                pagination: true
            });
            $("#nuovo_allegato").on("click", function(){ 
               
                that.all_new();
            });

        },
     
        cat: function (that) {//richiesta dati per popolare tabella
            console.log(app.global.nick_array);
            $action="post";
            $url=app.global.json_url+'servizi/';
            var $selCat=$("#id_categoria");
            $selCat.empty();
            $("#step2").empty();
            that=this;   
            var API_URL =''; 
            API_URL=$url;
            var jsonObj = {};
            jsonObj.action = "get";
            jsonObj.tab = "adm_attrezzature_categorie";
            jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
            jsonObj.type = "adm_attrezzature_categorie";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            
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
                            $selCat.append('<option value="">Seleziona Categoria</option>');
                            $.each($myData.data, function(i, value) {
                                console.log(value.id);
                                
                                $selCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                              
                            });
                            
                            if(!$new){
                                $selCat.val(app.global.nick_array.row.id_categoria).change().attr('disabled',true);
                                $aaa='<input type="hidden" id="id_categoria" name="id_categoria" value="'+app.global.nick_array.row.id_categoria+'"/>';
                                $("#edit").append($aaa);
                                that.sub_cat(that,app.global.nick_array.row.id_categoria);
                              
                                }
                            $selCat.change(function (e) {
                               
                                $("#step2").empty();
                                if(e.currentTarget.value!==""){
                                console.log(e);
                                $("#rma_categoria").val("");
                                that.sub_cat(that,e.currentTarget.value);

                                }else{
                                    $("#id_sotto_categoria").empty();
                                    $("#rma_categoria").val("");
                                }
                            });
                            $("#attr_list").on("click", function(){ 
               
                                app.functions.rap_attrezzature(that,1);
                            });
                            
                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
                                message: $myData.message,
                                buttons: {
                                    main: {
                                        label: "OK",
                                        className: "btn btn-danger",
                                        callback: function () {
                                            $("body").removeClass("modal-open");
                                              app.routers.adminTecRouter.prototype.attrezzature(1);
                                        }
                                    }
                                }
                            });
                        }
                    },
                    error: function () {
                        console.error("bsa categorie error!!!");
                    }
                });
            }, 
        sub_cat: function (that,$id) {//

            console.log($id);
            var $selSubCat=$("#id_sotto_categoria");

            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'servizi/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.tab = "adm_attrezzature_categorie_id";
                jsonObj.type = "adm_attrezzature_categorie_id";
                jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_categoria = $id;
                
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                    url: API_URL,
                    type: 'post',
                    data :  jsonObj,
                    dataType : 'text',
                    headers: this.headerJson(),
                    
                    success: function (datap) {
                        $myData = JSON.parse(datap);
                        console.log($myData);
                        if ($myData.success) {
                            var $ifcat=$myData.ifcat;
                            var $ifsubcat=$myData.ifsubcat;
                            $selSubCat.append('<option value="">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ 
                                console.log(app.global.nick_array.row);
                                $selSubCat.val(app.global.nick_array.row.id_sotto_categoria).change().attr('disabled',true);
                                $aaa='<input type="hidden" id="id_sotto_categoria" name="id_sotto_categoria" value="'+app.global.nick_array.row.id_sotto_categoria+'"/>';
                                $("#edit").append($aaa);
                                scheda_out(app.global.nick_array.row.id_sotto_categoria);
                            }
                            
                            $selSubCat.change(function (e) {
                                console.log(e);
                                if(e.currentTarget.value!==""){
                                    console.log(e,$ifcat,$ifsubcat,e.currentTarget.value);
                                    $("#rma_categoria").val("");
                                    scheda_out(e.currentTarget.value);
                                    }else{
                                       $("#rma_categoria").val("");
                                       $("#step2").empty();
                                    }
                            });
                            function scheda_out($id_sub){
                                var $tt="";
                                console.log($ifcat,$ifsubcat,$id_sub);
                              if(1==1){
                           
                                    $tt=$("#id_sotto_categoria :selected").text();
                                    switch(app.global.nick_array.arr.toLowerCase()){
                                        case "departments":
                                            var ob1 ;
                                            var ob = _.mapObject($myData.data, function(item) {
                                            //  console.log(item.id,e.target.value);
                                                if(item.id==$id_sub){
                                                console.log(item.id,$id_sub,item,$new);
                                                ob1=item.campi_specifici;
                                                ob2=item.rma_categoria;
                                                }
                                            });
                                            if(ob2!=null && ob2!="0"){
                                                app.global.nick_array.id_rma_categoria=ob2; 
                                            }else{
                                                app.global.nick_array.id_rma_categoria=null;
                                            }
                                            
                                            app.global.nick_array.campi_specifici=ob1;
                                            app.global.nick_array.rma_categoria=""; 
                                            _.mapObject($myData.rma_categorie, function(item) {
                                                 console.log(item.id,item.name,app.global.nick_array.id_rma_categoria);
                                                    if(item.id==app.global.nick_array.id_rma_categoria){
                                                   app.global.nick_array.rma_categoria=item.name;
                                                    }
                                                });
                                            console.log(app.global.nick_array.rma_categoria);   
                                            if(app.global.nick_array.rma_categoria){
                                                $("#rma_categoria").val(app.global.nick_array.rma_categoria);
                                            }else{
                                                $("#rma_categoria").val("");
                                            }
                                            if(!$new){
                                                $('#step2').empty().load('./js/templates/it/app.templates.attrezzature_anagrafica.html', function() {
                                                    that.attrezzature_form(that);
                                                    
                                                });
                                             }else{
                                                $('#step2').empty().load('./js/templates/it/app.templates.attrezzature_anagrafica.html', function() {
                                                // that.$('#step11').empty()
                                               // that.bsa_tipo_fornitori(that);
                                                that.attrezzature_form(that);
                                                
                                            }); 
                                        }
                                    break;
                                    }
                                    
                                }else{
                                    $tt="SCHEDA in lavorazione"
                                }
                                $("#step2").empty().append(
                                    $tt
                                    );
                            }

                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
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
                        console.error("attrezzature sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },
        bsa_tipo_fornitori: function () {//richiesta dati per popolare tabella
            
            $action="post";
            $url=app.global.json_url+'bsa/';
            var $selTipoFornitori=$("#tipo_fornitore");
            $selTipoFornitori.empty();
            //that.$("#step2").empty();
            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
            
            API_URL=$url;
            var jsonObj = {};
            jsonObj.action = "list";
           
            jsonObj.type = "mag_tipo_fornitore";
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            
        
        
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
                        //  $selTipoFornitori.append('<option value="">Seleziona Fornitore</option>');
                        $.each($myData.data, function(i, value) {
                            console.log(value.id,value.tipo);
                            
                            $selTipoFornitori.append('<option value="'+value.id+'">'+value.tipo+'</option>');
                            
                        });
                        
                        
                        $selTipoFornitori.change(function (e) {
                           
                            that.bsa_fornitori($selTipoFornitori.val());
                        });
                        console.log($new,app.global.nick_array);
                        if(!$new){ 
                            console.log(app.global.nick_array.row.id_fornitore,app.global.nick_array.row);
                            
                            $selFornitori.val(app.global.nick_array.row.id_fornitore+"-"+app.global.nick_array.row.tipo_fornitore).change()
                            
                        }
                        that.bsa_fornitori($selTipoFornitori.val());
                        // that.bsa_populate_form();
                        
                    }
                    else {
                        bootbox.dialog({
                            title: "Error",
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
                    console.error("bsa tipo fornitori error!!!");
                }
            });
        }, 
        bsa_fornitori: function ($tipo_fornitore) {//richiesta dati per popolare tabella
            
            $action="post";
            $url=app.global.json_url+'bsa/';
            var $selFornitori=$("#fornitore");
            $selFornitori.empty();
            //that.$("#step2").empty();
            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_type =$tipo_fornitore;
                jsonObj.type = "bsa_fornitori";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
               
            
            
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
                            $selFornitori.append('<option value="">Seleziona Fornitore</option>');
                            $.each($myData.data, function(i, value) {
                                console.log(value.id,value.tipo,value.id_tipo,$("#tipo_fornitore").val());
                                if(value.id_tipo===$("#tipo_fornitore").val()){
                                $selFornitori.append('<option value="'+value.id+'">'+value.name+'</option>');
                                }
                            });
                           
                            
                            $selFornitori.change(function (e) {
                                //  that.$("#step2").empty();
                                if(e.currentTarget.value!==""){
                                    console.log(e,app.global.nick_array.arr);
                                    switch(app.global.nick_array.arr){
                                        case "bsa":
                                            console.log(app.global.nick_array.arr);
                                            that.bsa_articoli(e.currentTarget.value);
                                            //that.bsa_populate_form();
                                            break;
                                        default:
                                            console.log(app.global.nick_array.arr);
                                            that.bsa_sub_cat(that,e.currentTarget.value);
                                    }
                                }else{
                                    console.log(e,e.currentTarget.value,app.global.nick_array.arr);
                                    switch(app.global.nick_array.arr){
                                        case "bsa":
                                            console.log(app.global.nick_array.arr);
                                           // that.bsa_populate_form();
                                            break;
                                        default:
                                            console.log(app.global.nick_array.arr);
                                            that.$("#id_sotto_categoria").empty();
                                    }
                                    
                                   
                                }
                            });
                            console.log($new,app.global.nick_array);
                            if(!$new){ 
                                console.log(app.global.nick_array.row.id_fornitore,app.global.nick_array.row);
                               
                                $selFornitori.val(app.global.nick_array.row.id_fornitore+"-"+app.global.nick_array.row.tipo_fornitore).change()
                                
                            }
                           
                           // that.bsa_populate_form();
                            
                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
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
                        console.error("bsa categorie error!!!");
                    }
                });
            }, 
        bsa_articoli: function ($id_fornitore) {//richiesta dati per popolare tabella
        
            $action="post";
            $idSubCategoria=$("#id_sotto_categoria").val();
            $url=app.global.json_url+'bsa/';
            var $selArticoli=$("#articolo");
            $selArticoli.empty();
            //that.$("#step2").empty();
            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.id_fornitore = $id_fornitore;
                jsonObj.sub_categoria = $idSubCategoria;
                jsonObj.type = "bsa_articoli_fornitore";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                
            
            
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
                            $selArticoli.append('<option value="0">Seleziona Articolo</option>');
                            $.each($myData.data, function(i, value) {
                                console.log(value.id);
                                
                                $selArticoli.append('<option value="'+value.id+'">'+value.codice+' - '+value.descrizione+'</option>');
                                
                            });
                            
                            
                            $selArticoli.change(function (e) {
                                //  that.$("#step2").empty();
                                if(e.currentTarget.value!==""){
                                    console.log(e,app.global.nick_array.arr);
                                    switch(app.global.nick_array.arr){
                                        case "bsa":

                                            console.log(app.global.nick_array.arr);
                                            var ob1 ;
                                            var ob = _.mapObject($myData.data, function(item) {
                                            //  console.log(item.id,e.target.value);
                                                if(item.id==e.currentTarget.value){
                                                console.log(item.id,e.currentTarget.value,item);
                                                ob1=item;
                                                }
                                            });
                                            app.global.nick_array.row=ob1;
                                            
                                            that.bsa_populate_form();
                                            break;
                                        default:
                                            console.log(app.global.nick_array.arr);
                                            that.bsa_sub_cat(that,e.currentTarget.value);
                                    }
                                }else{
                                    console.log(e,e.currentTarget.value,app.global.nick_array.arr);
                                    switch(app.global.nick_array.arr){
                                        case "bsa":
                                            console.log(app.global.nick_array.arr);
                                           // that.bsa_populate_form();
                                            break;
                                        default:
                                            console.log(app.global.nick_array.arr);
                                            that.$("#id_sotto_categoria").empty();
                                    }
                                    
                                    
                                }
                            });
                            console.log($new,app.global.nick_array);
                            if(!$new){ 
                                console.log(app.global.nick_array.row.id_fornitore,app.global.nick_array.row);
                                
                                $selArticoli.val(app.global.nick_array.row.id).change()
                                
                            }
                            
                           // that.bsa_populate_form();
                            
                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
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
                        console.error("bsa categorie error!!!");
                    }
                });
            },       
        attrezzature_form: function (that){
           
            console.log(app.global.nick_array);
            $row_camp=app.global.nick_array.campi_specifici;
            $('#datetimepicker1').datetimepicker({ //data_acquisto
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show(); 
            $('#datetimepicker1').prop("disabled", true);
            $('#datetimepicker1a').datetimepicker({ //data fattura
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();  
            $('#datetimepicker1b').datetimepicker({ // data garanzia
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();   
            if($row_camp){
                var parsedrow = JSON.parse($row_camp);
            console.log(parsedrow);
            // $("#campi_specifici").empty().append(parsedrow.html);
            $ele='<div class="row">';
            $.each(parsedrow.campo_spec, function(i, value) {
                console.log(i,value);
                $ele+='<div class="form-group col-sm-'+value.width+'">'+
                    '<label>'+value.label+'</label>'+
                    '<input type="'+value.type+'" class="form-control" id="'+value.name+'" name="'+value.name+'" > '+
                '</div>';
            });
            $ele+= '</div >'; 

            $("#campi_specifici").append($ele); 
            
            }
            if(app.global.nick_array.new){
                $("#p_all").empty();
                this.attrezzature_end_form(that);
               
            }else{
                console.log(app.global.nick_array);
                $row_=app.global.nick_array.row;
                this.attrezzatura_call(this,$row_.id_attrezzatura);
               
            }
            

        },
        attrezzatura_call: function (that,$id) {//
            $action="post";
            $url=app.global.json_url+'servizi/';

            var API_URL =''; 
            console.log($id,app.global.nick_array); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
            jsonObj.action = "get";
            jsonObj.id_attrezzatura = $id;
            jsonObj.type = "adm_attrezzatura_id";
            jsonObj.tab = "adm_attrezzatura_id";
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
                        console.log($myData);
                     that.attrezzature_populate_form ($myData); 
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
                                            //app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("attrezzature  error!!!");
                }
            });
            
        },
        attrezzature_populate_form: function ($myData){
            console.log( $myData );
            $row=$myData.data;
                
            $.each($row, function( index, value ) {
                if(index=="campi_specifici"){
                    console.log( index, value );
                    
                    if (  value != null ) {
                        //-------------------------------
                        var parse_camp = JSON.parse($row.campi_specifici);
                        if(typeof(parse_camp) !== "undefined" && parse_camp !== null && parse_camp !== ""){   
                            $.each(parse_camp.campo_spec, function(i, value) {
                                console.log(i,value);
                                $("#"+_.keys(value)).val(_.values(value));
                            });
                        }
                    }    
                    
                }else{
                    if(index=="data_acquisto"){
                    if(typeof(value) !== "undefined" && value !== null){   
                        $("#"+index).val(moment(value).format('DD/MM/YYYY'));
                        //$('#data_acquisto').val();
                    }
                    }
                    else if(index=="data_fattura"){
                    if(typeof(value) !== "undefined" && value !== null){   
                        $('#data_fattura').val(moment(value).format('DD/MM/YYYY'));
                    }
                }
                else if(index=="data_fine_garanzia"){
                    if(typeof(value) !== "undefined" && value !== null){   
                            $('#data_fine_garanzia').val(moment(value).format('DD/MM/YYYY'));
                    }
                }
                else if(index=="img_link"){  
                    console.log( index + ": " + value );  
                    $('#blahh').attr('src', value);
                
                }else{
                    console.log( index + ": " + value );
                    $("#"+index).val(value);
                }
            }

            });
            this.attrezzature_allegati_call(this,$row.id);
            this.attrezzature_end_form(this);
        },
       
        attrezzature_end_form: function (that){
            console.log( "end form" );
           
           
            $("#file3").change(function(){
                console.log("file3");
                readURL(this);
            });
            function readURL(input) {
                console.log(input);
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
    
                    reader.onload = function (e) {
                        console.log(e)
                        $('#blahh').attr('src', e.target.result);
                        
                    }
    
                   reader.readAsDataURL(input.files[0]);
                }
            }
            
            $("#invio_articolo").on("click", function(){ 
                console.log("esssieee");
            that.invio();
            });
        },
        bsa_form: function (that,$id) {//

            console.log($id);
            var $selSubCat=that.$("#id_sotto_categoria");

            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'bsa/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "bsa_sub_categorie";
                jsonObj.id_categoria = $id;
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                
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
                            $selSubCat.append('<option value="">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ $selSubCat.val(that.$arr.id).change()}
                            $selSubCat.change(function (e) {
                                if(e.currentTarget.value!==""){
                                console.log(e.currentTarget.value);
                                var $tt="";
                                //if(that.$("#id_categoria").val()==5 && (that.$("#id_sotto_categoria").val()==25 | that.$("#id_sotto_categoria").val()==26)){
                                if(1==1){
                              
                                    $tt=that.$("#id_sotto_categoria :selected").text();
                                    this.$('#step2').empty().load('./js/templates/it/app.templates.bsa_anagrafica.html', function() {
                                        //that.bsa();
                                    }); 
                                }else{
                                    $tt="SCHEDA in lavorazione"
                                    that.$("#step2").empty().append(
                                        $tt
                                        ); 
                                }
                                
                                }else{
                                    that.$("#step2").empty();
                                }
                            });
                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
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
                        console.error("bsa sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },     
       
        invio: function () {
            console.log("invio",app.global.nick_array)
            $new=app.global.nick_array.new;
            $("#edit").validate(); //sets up the validator
            $("input[name=\"descrizione").rules( "add", {
                required: true,
                //number: true,
                // minlength: 2,
                 messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            console.log($new);
          
            if($("#edit").valid()){
                $("#invio").prop( "disabled", true );
                var form_data = new FormData($('#edit')[0]); 
                var API_URL = app.global.json_url + 'servizi/'; 
                form_data.append('id_servizio', app.global.nick_array.data.id);
                form_data.append('type', 'adm_attrezzature');
                form_data.append('tab', 'adm_attrezzature');
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('id_ser', app.global.tokensCollection.first().get("id_servizio"));
                if(!$new){
                    form_data.append('action', 'update');
                }else{
                    form_data.append('action', 'add');
                }
            

                var formDataObj = Object.fromEntries(form_data.entries());
                console.log(formDataObj);
        
                $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,
                    
                    };
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data: form_data,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData:false,        // To send DOMDocument or non processed data file it is set to false    
                    beforeSend : function(){
                        //$("#preview").fadeOut();
                        $("#err").fadeOut();
                    },
                    success: function(data){
                        $mydata =JSON.parse(data);
                        console.log("success");
                        if (!app.global.nick_array.arr){
                            bootbox.alert({ 
                                title: "Nuova Attrezzatura/Impianto",
                                message:  $mydata.message,
        
                                callback: function() {
                                    app.functions.rap_attrezzature(that,$row);
                                    //app.routers.adminTecRouter.prototype.attrezzature_list("it",1);
                                }
                            });
                        }else{
        
                            bootbox.alert({ 
    
                                title: "Update Attrezzature",
                                message:  $mydata.message,
            
                                callback: function() {
                                    //app.routers.adminTecRouter.prototype.attrezzature_list("it",1);
                                    app.functions.rap_attrezzature(that,$mydata);
                               
                                }
                            });
                        }
        
        
                    },
                    error: function(e) {
                        $("#err").html(e).fadeIn();
                    }
                });
            }
            
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
            console.log( app.global.nick_array);
            //-----------breadcrumb-------------------------------------------------------
      /*      while (app.global.breadcrumb.length>2) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                $(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } */
            //----------------------------------------------------------------------------
                var that=this; 
            //--------attrezzature_tab default anagrafica---------------------------------------------
               
                window.actionEvents = {
                    'click #invio_articolo':function (e, value, row,index) {
                        console.log(row);
                        
                        that.invio(that);
        
                      
                    },
                }
                this.attrezzature_tab(that);
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.bsa_editView=null
    }
});
return app.views.attrezzature_edit;
});