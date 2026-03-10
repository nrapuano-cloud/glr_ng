require(['app','bootbox'], function(app,bootbox){
app.views.rfa_schede = Backbone.View.extend({
    
    initialize:function(){
    
    	console.log("initializing rfa_schede view")
        var jsonObj = {};
            if(app.global.tokensCollection.first()!=null) { 
       console.log("verifico");
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
               
            }
        });
        } else{
             console.log("re-login");
            
        return false;
             app.routers.router.prototype.login();
        }
   
    },
    

    events:{
        'submit':  'send_'
    },
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            // "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        return $headers;
    },
    fetchServizi: function  (){//servizi abilitati per questo utente
        that=this;
        console.log(that.tipo);
      var $selTipo=this.$("#tipo");
      var  $servizio='';
        if(this.$("#servizio").val()){
            $servizio=this.$("#servizio").val()
        }else{
            $servizio=app.global.tokensCollection.first().get("id_servizio")
        }
        var jsonObj = {};
           
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "modulo";
        jsonObj.type = "ordine"; 
        jsonObj.subtype = "schede";  
        jsonObj.servizio = $servizio;  
            
        jsonObj = JSON.stringify(jsonObj);
        
        var getServizi =  that.fetchData(
            jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson());
            
        getServizi.done(function(data) {
            $mydata =JSON.parse(data);
            //console.log(data);
            //console.log($mydata.success);
             $selTipo.empty();
            $aa=$mydata.data;
            var $selServizioEx=false;//se esiste la select x conto servizi?
            var $selServizio=that.$("#servizi");//il div
            var $selServizioX="";//la select
            if($mydata.selServizi!==""){
                $selServizioEx=true;
                console.log($selServizioEx);
                $selServizio.append($mydata.selServizi); 
                $bb=$mydata.servizi;
                $selServizioX=that.$("#servizio");
                $selServizioX.append('<option value="0">Seleziona</option>');
                $.each($mydata.servizi, function(i, value) {
                    $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                });
                $selServizioX.val($servizio);
                
                 
                $selServizioX.change(function (e,value,row) {
                    that.$("#fornitori").empty();
                    that.$("#prodotti").empty();
                    $selTipo.val(0);
                  //that.fetchOrdini($selServizioX.val());
                });
                that.$("#servizi label").html('Schede disponibili per il servizio');
                $selTipo.append('<option value="0"></option>');
                $.each($aa, function(i, value) {
                    $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                });
               //that.fetchFornitori();
            }
            
         
        });
        $selTipo.change(function (e,value,row) {
            
            that.$("#fornitori").empty();
            that.$("#prodotti").empty();
         
           
         
             that.fetchFornitori();
       
        });
        
    },//servizi abilitati per questo utente
    fetchFornitori: function(){  
        varForm='<label for="selFornitori">Seleziona il Fornitore *</label>'+
              '<select  id="selFornitori" name="selFornitori"  class="form-control" ></select><br>';

        that.$("#fornitori").append(varForm);
        var  $servizio='';
        if(this.$("#servizio").val()){
            $servizio=this.$("#servizio").val()
        }else{
            $servizio=app.global.tokensCollection.first().get("id_servizio")
        }
             
        var jsonObj = {};

        jsonObj.servizio =$servizio;
        jsonObj.tipologia = $("#tipo").val();
        jsonObj.action = "modulo";
        jsonObj.type = "fornitori";
        jsonObj.person = app.global.tokensCollection.first().get("id_person");

        jsonObj = JSON.stringify(jsonObj);

        var getFornitori =  that.fetchData(
            jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson()
        );
    
        getFornitori.done(function(data) {
            $mydata =JSON.parse(data);

            that.$("#selFornitori").empty();
            $aa=$mydata.data;
            that.$("#selFornitori").append('<option value="0"></option>');
            $.each($aa, function(i, value) {
                that.$("#selFornitori").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
            });

            that.$("#selFornitori").change(function (e,value,row) {



                  that.$("#prodotti").empty()
                   that.fetchProdotti()

            });


        });
            
        } ,   
    fetchProdotti: function(){ 
        var  $servizio='';
        if(this.$("#servizio").val()){
            $servizio=this.$("#servizio").val()
        }else{
            $servizio=app.global.tokensCollection.first().get("id_servizio")
        }
        var jsonObj = {};
        jsonObj.servizio =$servizio;
        jsonObj.fornitore = that.$("#selFornitori").val();
        jsonObj.action = "modulo";
        jsonObj.type = "schede";

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);

        var getProdotti =  that.fetchData(
            jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson()
        );
    
        getProdotti.done(function(data) {
          
            $mydata =JSON.parse(data);
            /* varForm=varForm='<label for="selCategoria">Seleziona la Categoria</label>'+
            '<select  id="selCategoria" name="selCategoria"  class="form-control" ></select><br>'+*/
            varForm=varForm=
                    '<label ></label>'+ 
                    '<div class="row">'+
                        '<p class="toolbar">'+

                        '<span class="alert"></span>'+
                        '</p>'+
                        '<table id="table" class="table table-striped"> </table>'+
                    '</div>';
            that.$("#prodotti").append(varForm);
                    
                    $table=that.$("#table");
                   
                   
                    that.proTable($mydata);
                    
                });
           
         
        } ,       
    fetchData: function  (query, dataURL,headers){
        // Return the $.ajax promise
        return $.ajax({
            headers : headers,
            data: query,
            dataType: 'text',
            type:'post',
            url: dataURL
        });
        
    },
    proTable: function(my){
        console.log(my);
        $.each( my.tab, function( key, value1 ){
            if(value1["cellStyle"]=="cellStyle"){
                value1["cellStyle"]=cellStyle;
            }
            if(value1["events"]=="actionEvents"){
                value1["events"]=actionEvents;
            }
            if(value1["formatter"]=="actionFormatter"){
                value1["formatter"]=actionFormatter;
            }
            if(value1["formatter"]=="actionFormatter1"){
                value1["formatter"]=actionFormatter1;
            }
            if(value1["formatter"]=="imageFormatter"){
                value1["formatter"]=imageFormatter;
            }
        }); 
        var arr = [];
        $.each( my.data, function( key, value1 ){
           console.log(key,value1)
            value1.quantita=""
          
        
        }); 
       

        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
           
           
           
        });
      
        that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
       
       
        that.$('#quantita').on('change',function ( field, row, cvalue, old,Value, $el,x) {
             console.log(cvalue.quantita)
            
            if(cvalue.quantita !='0' || cvalue.quantita !=''){
                console.log(cvalue.quantita+'ok')
           
                that.$('#invio').prop( "disabled", false);
            }else{
                console.log(cvalue.quantita+'ko')
                that.$('#invio').prop( "disabled", true );
            }
           
        
        });
        that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
            var $els1=that.$('#table').bootstrapTable('getData')
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
           
           

           
        });
            function imageFormatter(value, row) {
      return '<img src="'+value+'" />';
    }

    },
    
    render:function(tipo){
    	$(this.el).html(this.template());
        console.log("tipo="+tipo);
        if(tipo=="sanificazioni"){
       
           app.routers.rfaRouter.prototype.rfa_sanificazioni();
       
       
          }
      
        console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        
        
       
        var $selTipo=this.$("#tipo_");
        var $selServizioEx=false;//se esiste la select x conto servizi?
        var $selServizio=this.$("#servizi");//il div
        var $selServizioX="";//la select
        var $table="";
        this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
        this.$('#datetimepicker1').datetimepicker('setStartDate', '+1w');
        this.$('#datetimepicker1').datetimepicker('setEndDate', '+5m');
        
        this.fetchServizi();
      
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        var  uurl=app.global.json_url+'rfa/';
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.person =$person ;              
        jsonObj.action = "list";
        jsonObj.type = "schede";     
        jsonObj = JSON.stringify(jsonObj);
        
        this.$('#id_person').prop( "value", $person );
        
          
        var that=this;
        
        window.actionEvents = {
            'click .downloadTecnica': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="schede";
                jsonObj.typeSub ="tecnica";
                jsonObj.id_ser = that.$("#servizio").val()
                jsonObj.fornitore = that.$("#selFornitori").val()
                jsonObj.codice=$row.codice;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
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

            },
            'click .downloadSicurezza': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="schede";
                jsonObj.typeSub ="sicurezza";
                jsonObj.id_ser = that.$("#servizio").val()
                jsonObj.fornitore = that.$("#selFornitori").val()
                jsonObj.codice=$row.codice;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
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

            } , 
            'click .removeTecnica': function (e, value, $row,index) {
                askRemove($row.id_fornitore,$row.codice,'tecnica');
                if(that.ask){
                    removeScheda($row.id_fornitore,$row.codice,'tecnica');
                }
            }, 
            'click .removeSicurezza': function (e, value, $row,index) {
                askRemove($row.id_fornitore,$row.codice,'sicurezza');
                if(that.ask){
                    removeScheda($row.id_fornitore,$row.codice,'sicurezza');
                }
            }, 
            'click .managementSchede': function (e, value, $row) {
                console.log($row);
                var $modal =$('#modal').modal({ show: false }); 
                $tipoScheda='Tecnica';//default
                 var modalF=
                '<form id="modSchede" >'+
                    '<div  class="form-group  alle">'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value="1" name="tipoScheda" id="tipoScheda" checked >Tecnica</label>'+
                        '</div>'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value="2" name="tipoScheda" id="tipoScheda">Sicurezza</label>'+
                        '</div>'+
                        '<div class="form-group ">'+
                             '<label class="tipoScheda">Seleziona scheda '+$tipoScheda+'</label>'+
                             '<input type="file" name="allegato" id="allegato" class="form-input  allegato"  accept="image\/jpeg,image/gif,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">'+
                        '</div>'+
                         '<div class="form-group ">'+
                            '<button type="button" id="btnScheda" name="btnScheda" class="btn btn-primary ">Add File</button>'+
                        '</div>'+
                    '</div>'+ 
                '</form >' ;
      
                $(".modal-body").empty();  
                $(".modal-footer").empty();  
                $(".modal-body").append(modalF);  
                $modal.find('.modal-title').text('Gestione Schede');
                $("#modSchede").validate(); //sets up the validator
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
                $('input[type="radio"]').on('change', function(e) {
                    if(e.target.value==1){
                        $tipoScheda='Tecnica';
                    }else if(e.target.value==2){
                        $tipoScheda='Sicurezza';
                    }
                    $modal.find('.tipoScheda').text('Seleziona scheda '+$tipoScheda);
                });
                $('#btnScheda').click(function(e) {
                    if($("#modSchede").valid()){
                        
                        var form_data = new FormData($("#modSchede")[0]); 
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                        form_data.append('action', 'update');
                        form_data.append('type', 'rfa_fornitore_scheda_tec_sic');
                        form_data.append('schedaTipo', $tipoScheda);
                        form_data.append('id_fornitore', $row.id_fornitore);
                        form_data.append('codice_prodotto', $row.codice);
                        form_data.append('id_prodotto', $row.id);
                        call(form_data);
                    }   
                }); 
                function call(form_data){
                    var API_URL = app.global.json_url + 'rfa/';
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

                            //--------------------------------------------------
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
                                
        
                                jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
                                 jsonObj.fornitore = $row.id_fornitore;
                                 jsonObj.action = "modulo";
                                jsonObj.type = "schede";  
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
                                $.ajax({
                                    url: app.global.json_url + 'rfa/ordini/',
                                    type: 'post',
                                    headers: $headers,
                                    data: jsonObj,
                                    dataType: 'text',
                                    success: function (datap) {
                                     var   $myData = JSON.parse(datap);
                                        if ($myData.success) {
                                            //hrTable($myData);
                                            $modal.modal('hide'); 
                                            that.proTable($myData);
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
                  

                }
            }
        }  
        function askRemove(fornitore,codice,tipo){
             bootbox.confirm({
                                title: "Attenzione",
                                message: "vuoi rimuovere la scheda <b>"+tipo+"</b><br>"+ 
                                           "dell'articolo <b>"+codice+"</b>?",
                                buttons: {
                                    cancel: {
                                        label: '<i class="fa fa-times"></i> Cancel'
                                    },
                                    confirm: {
                                        label: '<i class="fa fa-check"></i> Confirm'
                                    }
                                },
                                callback: function (result) {
                                   if(result){
                                        removeScheda(fornitore,codice,tipo);
                                   }
                                }
                            })
        }
        function removeScheda(fornitore,codice,tipo){
              var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("remove "+tipo);
                var jsonObj = {};
                jsonObj.action = "del";
                jsonObj.type ="rfa_fornitore_scheda_tec_sic";
                jsonObj.typeSub =tipo;
               
                jsonObj.fornitore = fornitore;
                jsonObj.codice=codice;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                       
                       that.fetchProdotti();
                    },
                    error: function () {

                        console.log("remove item error!");
                    }
                });
        }
    	
        //-------------------------------schede prodotto------------------------------------------
        function ser(){   
            $.ajax({
                url:uurl,
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        $selTipo.empty();
                        $aa=$mydata.data;
                        if($mydata.selServizi!==""){
                            $selServizioEx=true;
                            console.log($selServizioEx);
                            $selServizio.append($mydata.selServizi); 
                            $bb=$mydata.servizi;
                            $selServizioX=that.$("#servizio");
                            $selServizioX.append('<option value="0">Seleziona</option>');
                            $.each($mydata.servizi, function(i, value) {
                                $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                            });
                            $selServizioX.val($servizio);
                            $selServizioX.change(function (e,value,row) {
                                
                                that.$("#fornitori").empty();
                                that.$("#prodotti").empty();
                                $selTipo.val(0);
                            });
                        }

                        $selTipo.append('<option value="0"></option>');
                        $.each($aa, function(i, value) {
                            $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                        });
                        
                    }else{
                
                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons:{
                                main:{
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function(){
                                        $("body").removeClass("modal-open");
                                        app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                   
                     bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                     app.routers.router.prototype.logout();
                                }
                            }
                        }
                    });
                }
                
            });
        }
//--------------------------------------------------------------------------------------------------------------------------------
       
        
        $selTipo.change(function (e,value,row) {
            
            that.$("#fornitori").empty();
            that.$("#prodotti").empty();
            that.$("#orario").empty();
            if(e.currentTarget.value==='10'){//10 id-> Definizione Fabbisogno di Fornitura
            varForm='<div class="panel panel-default">'+
                        '<div class="panel-body">'+
                            '<div class="form-group row text-center">'+
                                '<label class="text-center">Definizione Fabbisogno di Fornitura</label>'+
                            '</div>'+
                            '<div class="form-group row">'+
                                '<div class="col-sm-12">'+  
                                    '<label for="fornitore">Fornitore</label>'+

                                    '<input type="text" id="fornitore" name="fornitore" class="form-control" >'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group row">'+
                                '<div class="col-sm-2">'+
                                    '<label for="codice">Codice</label>'+
                                    '<input type="text" id="codice" name="codice" class="form-control" >'+
                                '</div>'+
                                '<div class="col-sm-9">'+   
                                    '<label for="prodotto">Descrizione prodotto *</label>'+
                                    '<input type="text" id="prodotto" name="prodotto" class="form-control">'+
                                '</div>'+  
                                '<div class="col-sm-1">'+   
                                    '<label for="quantita">Q.tà *</label>'+
                                    '<input type="text" id="quantita" name="quantita" class="form-control">'+
                                '</div>'+  
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '<br>';
            that.$("#fornitori").append(varForm);   
              that.$('#invio').prop( "disabled", false );
            }else{
            varForm='<label for="selFornitori">Seleziona il Fornitore *</label>'+
                   '<select  id="selFornitori" name="selFornitori"  class="form-control" ></select><br>';
                 
            that.$("#fornitori").append(varForm);
            fornitori(); 
        }
        });
        //-------------------------------fornitori-------------------------------
           
        function  fornitori(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.tipologia = $("#tipo").val();
            jsonObj.action = "modulo";
            jsonObj.type = "fornitori";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:uurl+"ordini/",
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$("#selFornitori").empty();
                    $aa=$mydata.data;
                    that.$("#selFornitori").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selFornitori").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                    
                    that.$("#selFornitori").change(function (e,value,row) {
                        
                          
                        $orario=_.filter($aa, function(orario){ return orario.id ==e.currentTarget.value; });
                        console.log($orario);
                        that.$("#orario").empty();
                        that.$("#orario").append('Orario consegna: '+$orario[0].orario)+"<br>/";
                        that.$("#prodotti").empty()
                        prodotti()
                        
                    });
               
                }
            });
        }    
        //--------------------------prodotti-----------------------------------------------------
        function  prodotti(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.fornitore = that.$("#selFornitori").val();
            jsonObj.action = "modulo";
            jsonObj.type = "prodotti";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    /* varForm=varForm='<label for="selCategoria">Seleziona la Categoria</label>'+
                    '<select  id="selCategoria" name="selCategoria"  class="form-control" ></select><br>'+*/
                    varForm=varForm=
                            '<label >Seleziona le quantità dei Prodotti da ordinare:</label>'+ 
                            '<div class="row">'+
                                '<p class="toolbar">'+
                                
                                '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table" class="table table-striped"> </table>'+
                            '</div>';
                    that.$("#prodotti").append(varForm);
                    /*that.$("#selCategoria").empty();
                    $aa=$mydata.data;
                    that.$("#selCategoria").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selCategoria").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });*/
                    $table=that.$("#table");
                    /*
                    that.$("#selCategoria").change(function (e,value,row) {
                        console.log("cat");
                       proTable($mydata);
                        
                    });*/
                   
                    proTable($mydata);
                    console.log("prodTab");
                }
            });
        }
        //----------------------------------------------------
        function  proTable(my){
        console.log(my);
        $.each( my.tab, function( key, value1 ){
            if(value1["cellStyle"]=="cellStyle"){
                value1["cellStyle"]=cellStyle;
            }
            if(value1["events"]=="actionEvents"){
                value1["events"]=actionEvents;
            }
            if(value1["formatter"]=="actionFormatter"){
                value1["formatter"]=actionFormatter;
            }
            if(value1["formatter"]=="actionFormatter1"){
                value1["formatter"]=actionFormatter1;
            }
        }); 
        var arr = [];
        $.each( my.data, function( key, value1 ){
           console.log(key,value1)
            value1.quantita=""
          
        
        }); 
         console.log( arr)

        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
           
           
           
        });
      
        that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
       
       
        that.$('#quantita').on('change',function ( field, row, cvalue, old,Value, $el,x) {
             console.log(cvalue.quantita)
            
            if(cvalue.quantita !='0' || cvalue.quantita !=''){
                console.log(cvalue.quantita+'ok')
           
                that.$('#invio').prop( "disabled", false);
            }else{
                console.log(cvalue.quantita+'ko')
                that.$('#invio').prop( "disabled", true );
            }
           
        
        });
        that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
            var $els1=that.$('#table').bootstrapTable('getData')
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
           
           

           
        });

    }
    
     function actionFormatter(value, row, index) {
         
    }
      function actionFormatter1(value, row, index) {
        
    }
    function actionEvents() {
      
    }
 
     function cellStyle(value, row, index, field) {
    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+field
                         };
                  
                }  

    //-----------------------------------------------------------------------------------
        
        this.$("#richiestaOrdineForm").validate({
          
   
            rules:{
                highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                        $(element).fadeIn();
                    });
                },
                tipo:{
                    required:true
                },
                 quantita:{
                    required:true,
                    number:true
                },
                 prodotto:{
                    required:true
                },
                        ".editable":{
                    required:true
                },
           	selFornitore:{
                    required:true,
                  
                    
                },
                dataTemp:{
                    required:true,
                   // maxlength:20
                   
                }/* ,
               file: {
                    required: false,
                    accept: "image/*"
                }*/
                
           },
           messages: {
              prodotto: "Inserire la descrizione del prodotto",
             quantita:{ required:"Inserire la quantità",
              number: "Inserire un numero"},
                tipo: "Selezionare una Tipologia Prodotto",
                dataTemp: "Inserire la data",
                ".editable":"inserire la quantità"
            }
        });    
        
        this.$("#temp").change(function(){
            $('#dataTemp').val("");
            $('#datetimepicker1').datetimepicker().toggle();
        });
         
       
      
        
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
     send_: function (event) {
        event.preventDefault();
       
        this.$("#invio").prop( "disabled", true );
         var jsonObj = {};
          var that=this;  
          console.log(this.$("#tipo").val());
          console.log(this.$("#fornitore").val())
     
        if(this.$("#tipo").val()==10){
           
            $prodotti=[];
            var element={};
            
            jsonObj.fornitore=this.$("#fornitore").val();
            element.prodotto=this.$("#prodotto").val();
            element.codice=this.$("#codice").val();
            element.quantita=this.$("#quantita").val();
            $prodotti.push(element);
            Object.assign( jsonObj, {prodotti:$prodotti})
            
            console.log(jsonObj);
        }else{
            $prodotti=_.filter(this.$('#table').bootstrapTable('getData'), function(num){ return num.quantita !=""; });
           jsonObj.prodotti =$prodotti;
           jsonObj.fornitore =$("#selFornitori").val();
        }
        
        if(this.$selServizioEx){
            jsonObj.servizio = $("#servizio").val();
        }else{
            jsonObj.servizio = $("#servizio").val();
        }
        jsonObj.dataTemp = $('#dataTemp').val();
        jsonObj.temp =this.$("input[name=temp]:checked").val();
       
        s=this.$('#tipo option:selected').text();
        jsonObj.categoriaC = s;
        jsonObj.categoria = this.$('#tipo option:selected').val();
        jsonObj.action = "add";
        jsonObj.type = "ordine";
       
        
        jsonObj.note = this.$('#note').val();
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        
        $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
         $.ajax({
                url:app.global.json_url+'rfa/ordini/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
        
                success: function(data){
                    console.log("success");
                                       
                        bootbox.alert({ 
                            title: that.language.header_rfa_new_message,
                            message: "Richiesta Fabbisogno Approvvigionamento inviata correttamente",
                            
                            callback: function() {
                                app.routers.rfaRouter.prototype.rfa_new();
                            }
                        });
                       
                   
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });
        }
      
        ,
    
  

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
return app.views.rfa_schede;
    });


