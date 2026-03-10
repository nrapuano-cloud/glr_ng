require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.attrezzature_categorie_edit = Backbone.View.extend({
        initialize: function () {
            console.log("initializing attrezzature_edit: ");
      
        },
     
        events: {
           "click #invio":"invio",
           "click .create":"create",
           "click #add_campo":"add_campo",
           
        },
        add_campo: function () {//a sotto categoria
            that=this;
            this.enne+=1;
            console.log("add_campo_"+this.enne,that);
            that.$('.modal-title').text("Add Campo");  
            modalF=
                '<form id="mod" >'+
                    '<label>Campo</label>'+
                    '<input type="text" class="form-control" name="campo" id="campo" placeholder="Nome Campo">'+
                '</form >';
            $modalbtn=   '<button type="button" id="btn" name="btn" class="btn btn-primary ">Add</button>'; 
            that.$(".modal-body").empty(); 
            that.$(".modal-footer").empty().append( $modalbtn);  
            that.$(".modal-body").append( modalF);
            that.$("#modal").modal('show'); 
            that.$('#campo').change(function(e) {//add dalle modali 
              that.campo_change($(this),$(this).val());
             });
             that.$('#label').change(function(e) {//add dalle modali 
                that.campo_change($(this),$(this).val());
               });
            that.$('#btn').click(function(e) {//add dalle modali 
                
                $nome=$('#campo').val();
                $label=$('#label').val();
                $var_nome=$nome.replace(" ", "_").toLowerCase();
               
                $var_label=$label;
                console.log("click");
                $(".panel-body").append('<ww class=" col-lg-5" style="borderz:thin solid #F0F0F0;margin:10px">'+
                    '<input type="hidden" name="campo_'+that.enne+'"  id="campo_'+that.enne+'" value="'+$var_nome+'" >'+
                    '<div class="input-group">'+
                        '<input type="text" name="label_'+that.enne+'" class="form-control" id="label_'+that.enne+'" value="'+$nome+'" >'+
                        '<span class="input-group-btn">'+
                            '<button type="button" class="btn btn-danger"  id="del_'+that.enne+'" name="del_'+that.enne+'" >Delete</button>'+
                        '</span>'+
                    '</div>'+
                '</ww>');
                
                
                $("#del_"+that.enne).on("click",function (e) {
                    console.log("#del_"+that.enne,this,e);
                    $("#"+e.currentTarget.id).closest("ww").remove();
                 
                   
                });
            
            that.$("#modal").modal('hide'); 
             });
          
        },
        campo_change: function ($this,$nome) {//a sotto categoria
            $duplicato=false;
            $test_field=$this[0].id
            console.log("change",$nome,$test_field);
           // $nome=$('#campo').val();
            $var_nome=$nome.replace(/\s/g, "_").toLowerCase();
            const paragraph = $nome;
            const regex =/^([a-zA-Z0-9_ ]+)$/;///^([a-zA-Z0-9_]+)$/    /[A-Z]/g
            const found = paragraph.match(regex);
            console.log(found);
            console.log($nome,$var_nome);
            console.log($('input, text').filter('[id^=campo_]').get());
            $.each($('input, text').filter('[id^=label_]').get(), function( key,value) {
                console.log(key,value.id,$test_field);
                console.log(value,value.value,$nome);
                 $test=value.value;
                if(value.id!==$test_field){  
                    if($test===$nome){  
                        console.log("duplicato");
                        $duplicato=true;
                    }else{
                        console.log("ok");
                      
                    //  $duplicato=false;
                    }
                }else{
                    console.log("campo test="+$test_field); 
                }
            });
          if($duplicato==false){ 
          if(found && $nome!==""){

            console.log(found,$nome);
            if($test_field!=="campo"){
                console.log("ok",$("#"+$test_field).parent('div').siblings('input')[0].id);
                $("#"+$test_field).parent('div').siblings('input')[0].value=$var_nome;
            }
           
            $("#btn").prop('disabled', false);
            $("#invio").prop('disabled', false);
          return;
        }else{
            console.log("not",found);
            $("#btn").prop('disabled', true);
            $("#invio").prop('disabled', true);
            bootbox.dialog({
                title: "Error",
                message: "Caratteri non permessi!",
                buttons: {
                    main: {
                        label: "OK",
                        className: "btn btn-danger",
                        callback: function () {
                            $("body").removeClass("modal-open");
                            return;
                        }
                    }
                }
            });
          }
        }else{
            console.log("duplicato",found);
            $("#btn").prop('disabled', true);
            $("#invio").prop('disabled', true);
            bootbox.dialog({
                title: "Error",
                message: "Nome campo esistente!",
                buttons: {
                    main: {
                        label: "OK",
                        className: "btn btn-danger",
                        callback: function () {
                            $("body").removeClass("modal-open");
                            return;
                        }
                    }
                }
            }); 
        }
        },
        create: function (e, value, row) {//add new sub_categoria
            app.global.nick_array.arr="adm_attrezzature_sub_categorie"
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            $bread='<li class="breadcrumb-item active" href="" >Nuova sotto Categoria</li>';
            app.global.breadcrumb.push({
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.global.nick_array.sub=true;
            console.log("new="+app.global.nick_array.new,"sub="+app.global.nick_array.sub,);
            app.routers.adminTecRouter.prototype.attrezzature_categorie_edit();
    
            return;  
        }, 
   
        cat: function (that) {//richiesta dati per popolare tabella
            that=this;
            $row=app.global.nick_array.row;
            $new=app.global.nick_array.new;
            $is_sub_category=app.global.nick_array.sub;
            console.log($new,app.global.nick_array);
            if(!$new ){//update categorie
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'
                $tipo="";
                
                that.$('#descrizione').val($row.descrizione);
                that.$('#id').val($row.id);
                if($row.active==="1"){ 
                    that.$('#active').attr("checked", "checked");
                }
               
                console.log($tipo,"update", $row);

                this.cat_id(this,$row.id)
                 
                
                
            }else{ //add categorie
                that.$('#stepx').empty() ;
                that.$('#sub').empty() ;                     
            }
            }, 
        sub_cat: function (that,$row) {//
            console.log($myData);
            that.$("#id").val($row.id);
            that.$("#h3").html("Categoria "+app.global.nick_array.categoria);
            that.$("#lab").html("Sotto Categoria *");
            that.$("#descrizione").val($row.descrizione);
            $rma_categorie='<div class="form-group col-sm-12">'+
                                '<label >RMA Categorie</label>'+
                                '<select class="form-control "  id="rma_categorie" name="rma_categorie" />'+ 
                            '</div>';
            that.$("#step1_1").append($rma_categorie); 
            $sel_rma_categorie=that.$("#rma_categorie");
            $sel_rma_categorie.append('<option value="0"></option>');
            $.each($myData.rma_categorie, function(i, value) {
                $sel_rma_categorie.append('<option value="'+value["id"]+'">'+value["name"]+'</option>');
            });
            if($row.rma_categoria){
                $sel_rma_categorie.val(parseInt($row.rma_categoria));//
            }else{
                $sel_rma_categorie.val(0);//
            }
            
           
            that.$("#active_div").empty();  
            that.$(".panel-heading").html("Campi Specifici");
            that.$(".panel-body").empty();
            $campi_specifici = JSON.parse($row.campi_specifici);
            that.enne=0;
            console.log( "$campi_specifici=", $campi_specifici);
           
            if(typeof($campi_specifici) !== "undefined" && $campi_specifici !== null){   
            $.each( $campi_specifici.campo_spec, function( key, value ) {
                console.log(key, value);
             
                $camp='<ww class="col-lg-5 " style="borderz:thin solid #F0F0F0;margin:10px">'+
                    '<input type="hidden" name="campo_'+that.enne+'" class="form-control" id="campo_'+that.enne+'" value="'+value.name+'" >'+
                    '<div class="input-group">'+
                        '<input type="text" name="label_'+that.enne+'" class="form-control" id="label_'+that.enne+'" value="'+value.label+'" >'+
                        '<span class="input-group-btn">'+
                            '<button type="button" class="btn btn-danger"  id="del_'+that.enne+'" name="del_'+that.enne+'" >Delete</button>'+
                            '</span>'+
                    '</div>'+
                '</ww>';
                   
                    that.$(".panel-body").append($camp);
                    that.$("#del_"+that.enne).on("click",function (e) {
                        console.log("#del_"+that.enne,this,e);
                        that.$("#"+e.currentTarget.id).closest("ww").remove();
                     
                       
                    });
                
                  
                    that.$('#label_'+that.enne).change(function(e) {//add dalle modali 
                        that.campo_change($(this),$(this).val());
                       });
                       that.enne+=1;
              });
            } 
              

            that.$("#sub").append('<div class="form-group-sm-4"><button type="button" class="btn btn-info" id="add_campo" name="add_campo">Add campo specifico</button></div>');
          
           
        },
        cat_id: function (that,$id) {//

            console.log($id,app.global.nick_array);
            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'servizi/';
                
                that=this;   
                var API_URL =''; 
                  
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "adm_attrezzature_categorie_id";
                jsonObj.tab = "adm_attrezzature_categorie_id";
                jsonObj.id_categoria = $id;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
                
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                    url: API_URL,
                    type: 'post',
                    data :  jsonObj,
                    dataType : 'text',
                    headers: this.headerJson(),
                    
                    success: function (datap) {
                        $myData = JSON.parse(datap);
                        app.global.nick_array.sub_categorie=$myData.data;
                        if ($myData.success) {
                            app.global.nick_array.categoria=app.global.nick_array.row.descrizione;
                            that.$("#h3").html("Categoria "+app.global.nick_array.categoria);
                            console.log($myData);
                            that.hrTable($myData);
                            
                            if(!app.global.nick_array.new){
                                console.log(app.global.nick_array);
                               
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
                        console.error("adm sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },
        hrTable:function ($data){
           console.log($data);
            var  $myData=$data.data;
            var   $tab=$data.tab;
            var actionFormatter=$data.format;
            c1=' <button href="'+$data.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
        // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
                id=this.id;
      
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
      
                excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');
    
            });
            $.each( $myData, function( key, value1 ){
        
              if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                 //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                  value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
        
                  value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                 
              }
              if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                  //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
              
                  value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
        
                  value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
    
              }
            });
            this.$('#list').empty();
            this.$('#list').text("Ci sono "+$myData.length+" items");
         
         
            $.each( $myData, function( key, value1 ){
        
          if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
              value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
              value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
             
          }
          
         
    
            });    
            $.each($tab, function( key, value1 ){
              
          
                if(value1["cellStyle"]=="cellStyle"){
            
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
            
                    value1["events"]=actionEventsub;
                }
                if(value1["formatter"]=="actionFormatter"){
            
                    value1["formatter"]=actionFormatter;
                }
    
            });  
          
            this.$('#table').bootstrapTable('destroy');
            this.$('#table').bootstrapTable({
                columns: $tab,
                data: $myData,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: true,
                pageSize:"25"
            });
         
       
        },
        hrTable_: function(data){
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents = {
                'click .remove': function (e, value, row,index) {
                   
                    console.log("id="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "del";
                        jsonObj.id=row.id;
                        jsonObj.type=app.global.nick_array.arr;
                        jsonObj.tab=app.global.nick_array.arr;
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'servizi/',
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
                                    app.routers.adminTecRouter.prototype.attrezzature_categorie();
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
                    console.log(row);
                    app.global.nick_array.row=row;
                    app.global.breadcrumb.push({
                   
                        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>'
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.global.nick_array.sub=true;
                    app.global.nick_array.arr='adm_attrezzature_sub_categorie';
                    console.log("new="+app.global.nick_array.new,"sub="+app.global.nick_array.sub,);
                    app.routers.adminTecRouter.prototype.attrezzature_categorie_edit();
                  
                }   
                
            };
            $table =  that.$("#table"); 
            $table.bootstrapTable('destroy');
            if(data.tab!==null && data.tab!==undefined){

                $.each(data.tab, function( key, value1 ){
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
                $table.empty();
                $table.bootstrapTable({
                    data: data.data,
                    columns: data.tab
                });
            }else{
               $table.bootstrapTable({data: data.data});  
            }
            function actionFormatter() {
                return [data.format].join('');
            }
            
        },    
        bsa_populate_form: function (){
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
                    '<input type="'+value.type+'" class="form-control" id="'+value.name+'" name="'+value.name+'" readonly> '+
                '</div>';
            });
            $ele+= '</div >'; 

            $("#campi_specifici").append($ele); 
            
            }
            if(app.global.nick_array.new){
                if(app.global.nick_array.row){
                    $row=app.global.nick_array.row;
                $("#descrizione").val($row.descrizione);
                $("#id").val($row.id); 
                }
                console.log(app.global.nick_array);
                

            }else{
                $row=app.global.nick_array.row;
                console.log( $row );
                
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
                            //------------------------------
                        /*
                              $camp_value=JSON.parse(value);
                         //   $camp_spec=JSON.parse($camp_value.campi_spec);
                     //  $camp_prov=JSON.parse($camp_value.campi_prov);
                            $.each($camp_value.campi_spec, function( index1, value1 ) {
                                console.log( index1,value1 );
                                $("#"+ _.keys(value1)).val(_.values(value1));
                            });
                            $.each($camp_value.campi_prov, function( index1, value1 ) {
                                console.log( index1,value1 );
                                $("#"+  _.keys(value1)).val(_.values(value1));
                            });
                        }
                        */
                      //  console.log( $camp_value,$camp_value.campi_spec, $camp_value.campi_prov);
                     
                       
                      
                           
                          
                    }else{
                        console.log( index + ": " + value );
                        $("#"+index).val(value);
                    }
                });
                //$("#descrizione").val($row.descrizione);

                //$("#id").val($row.id);
               // $("#fornitore").val($row.fornitore+" - "+$row.tipo_fornitore);
                //$("#data_acquisto").val($row.data_acquisto);
                //$("#codice_fornitore").val($row.codice_fornitore);
                //$("#codice_assegnato").val($row.codice_assegnato);
                //$("#note").val($row.note);
                this.bsa_assegnazioni_call(this,$row.id);
                this.bsa_allegati_call(this,$row.id);
            }
            
                //  This gives you an HTMLElement object
            var element = document.getElementById('campi_specifici');
            //  This gives you a string representing that element and its content
            var html = element.outerHTML;       
            //  This gives you a JSON object that you can send with jQuery.ajax's `data`
            // option, you can rename the property to whatever you want.
            var data = { html: html }; 
            
            //  This gives you a string in JSON syntax of the object above that you can 
            // send with XMLHttpRequest.
            var json = JSON.stringify(data);
            console.log(data);
            console.log(json);
            var parsed = JSON.parse(json);
    
    
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
                                console.log(e);
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
        update: function (e, row, value) {
            console.log("update "+app.global.nick_array.arr,app.global.nick_array,row);
            switch (app.global.nick_array.arr){
                case "adm_attrezzature_categorie":
                {
                    console.log("categorie",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.adminTecRouter.prototype.attrezzature_categorie_edit();
            
                    return;  
               
                    break;
                }
                case "adm_attrezzature_sub_categorie":
                    {
                        console.log("sotto_categorie",row.id);
                        app.global.nick_array.id_categoria=app.global.nick_array.row.id;
                        app.global.nick_array.row=row;
                        var $bread='';
                        
                            $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                          
                        
                        app.global.breadcrumb.push({
                               
                            breadcrumb: $bread
                        });
                        console.log(app.global.breadcrumb);
                        app.global.nick_array.new=false;
                        this.sub_cat(this,row);//categoria
                
                         
                   
                        break;
                    }  
            }
        },
        invio: function () {
            that=this;
            $titleMsg="";
            console.log("invio",app.global.nick_array)
            $new=app.global.nick_array.new;
            $("#edit").validate(); //sets up the validator
            var form_data = new FormData($('#edit')[0]); 
            var API_URL = app.global.json_url + 'servizi/'; 
            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
            form_data.append('id_ser', app.global.tokensCollection.first().get("id_servizio"));
            if(!$new){
                switch (app.global.nick_array.arr.toLowerCase()) {
                    case 'adm_attrezzature_categorie':
                        $tipoTab=4;
                        $titleMsg="Update Categoria";
                        $("input[name=\"descrizione").rules( "add", {
                            required: true,
                            messages: {
                                required: "Required input"
                            }
                        });
                        form_data.append('id', app.global.nick_array.row.id);
                        form_data.append('type', 'adm_attrezzature_categorie');
                        form_data.append('tab', 'adm_attrezzature_categorie');
                        break; 
                    case 'adm_attrezzature_sub_categorie':
                            $tipoTab=4;
                            $titleMsg="Update Sotto Categoria";
                            $("input[name=\"descrizione").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"
                                }
                            });
                            form_data.append('id', app.global.nick_array.row.id);
                            form_data.append('type', 'adm_attrezzature_sub_categorie');
                            form_data.append('tab', 'adm_attrezzature_sub_categorie');
                            break;         
                    default:
                        break;
                }
                console.log(app.global.nick_array);
                form_data.append('action', 'update');
            }else{
                switch (app.global.nick_array.arr.toLowerCase()) {
                    case 'adm_attrezzature_categorie':
                        $titleMsg="Add Categoria"
                        $("input[name=\"descrizione").rules( "add", {
                            required: true,
                            messages: {
                                required: "Required input"
                            }
                        });
                        form_data.append('type', 'adm_attrezzature_categorie');
                        form_data.append('tab', 'adm_attrezzature_categorie');
                        break; 
                    case 'adm_attrezzature_sub_categorie':
                            $titleMsg="Add Sotto Categoria"
                            $("input[name=\"descrizione").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"
                                }
                            });
                            form_data.append('type', 'adm_attrezzature_sub_categorie');
                            form_data.append('tab', 'adm_attrezzature_sub_categorie');
                            form_data.append('id_categoria', app.global.nick_array.row.id);
                            break;        
                
                    default:
                        break;
                }
                form_data.append('action', 'add');
            }
          
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
            $("input[name=\"last_name").rules( "add", {
                 required: true,
                 //number: true,
                 // minlength: 2,
 
                 messages: {
                     required: "Required input"
                     //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                     // number:"Inserire un numero!"
                 }
             });
             
            console.log($("#servizio").val(),$new);
          
            if($("#edit").valid()){
                $("#invio").prop( "disabled", true );
                
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang")//,
                
                };
                
            

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
                                title: $titleMsg,
                                message:  $mydata.message,
        
                                callback: function() {
                                    app.routers.adminTecRouter.prototype.attrezzature_categorie();
                                }
                            });
                        }else{
        
                            bootbox.alert({ 
    
                                title: $titleMsg,
                                message:  $mydata.message,
            
                                callback: function() {
                                    app.routers.adminTecRouter.prototype.attrezzature_categorie();
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
            if(app.global.nick_array.arr=='adm_attrezzature_sub_categorie'){
                while (app.global.breadcrumb.length>4) {
                    app.global.breadcrumb.pop();
                }
            }else{
                while (app.global.breadcrumb.length>3) {
                    app.global.breadcrumb.pop();
                }
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //----------------------------------------------------------------------------
                var that=this; 
            //--------attrezzature_tab default anagrafica---------------------------------
          /*  if(app.global.nick_array.arr=='adm_attrezzature_sub_categorie'){
                this.sub_cat(that);
            }else{
                this.cat(that);
            }*/
            this.cat(that);
            window.actionEventsub = {
             
                'click .update': function (e, value, row) {
                   console.log(e, value, row,app.global.nick_array);
                   app.global.nick_array.new=false;
                   app.global.nick_array.arr="adm_attrezzature_sub_categorie"
                   that.update(e, row,value );
                   return;   
             
         
           },
           'click .remove': function (e, value, row,index) {
                   
            console.log(row);
            if (confirm('Are you sure to delete this item?')) {
                jsonObj = {};
                jsonObj.action = "del";
                jsonObj.id=row.id;
                jsonObj.type="adm_attrezzature_sub_categorie";
                jsonObj.tab="adm_attrezzature_sub_categorie";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
                jsonObj = JSON.stringify(jsonObj);
                
                $.ajax({
                    url: app.global.json_url + 'servizi/',
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
                            app.routers.adminTecRouter.prototype.attrezzature_categorie();
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
           'click .remove_': function (e, value, row) {
               
               that.remove(e, row,value );
                
               console.log(e, row,value ,app.global.nick_array.arr);
               $lblAlert="";
               return; 
               switch (app.global.nick_array.arr){
                   
                   case "adm_tutorial":{//uso il form per uniformità delle altre call update add in tutorial
                        console.log(row);    
                       //API_URL=app.global.json_url + 'tutorial/';      
                       $lblAlert="Tutorial"   
                       if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                          
                           var form_data = new FormData();
                         form_data.append('id', row.id);
                         
                           form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                   
                           
                           form_data.append('action', 'del');
                           form_data.append('type', app.global.nick_array.arr);
   
   
                           $headers = {
                           "X-Requested-With": "XMLHttpRequest",
                           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                           //"username" : app.global.tokensCollection.first().get("username"),
                           "lang" : app.global.languagesCollection.at(0).get("lang"),
                           //"Content-Type": "application/json"
                       };
                           $.ajax({
                               url: app.global.json_url + 'tutorial/',
                               type:'post',
                               headers : $headers,
   
                               //data :  jsonObj,
                               //dataType : 'text',
                               data: form_data,
                               contentType: false,       // The content type used when sending data to the server.
                               cache: false,             // To unable request pages to be cached
                               processData:false,        // To send DOMDocument or non processed data file it is set to false       
                               success: function (datap) {
                                   console.log(datap);
                                   $mydata =JSON.parse(datap);
   
                                   //-------------------------------------------------------
                                   if ($mydata.success){
                                        
                                  
   
                                   showAlert('Delete item successful!', 'success');
                                 
                                   $table.bootstrapTable('refresh',  setTab());
                                   //  hrTable($mydata);
                               }else {
                                   bootbox.dialog({
                                       title: that.language.error_message,
                                       message: that.language.error_message + ' : ' +$mydata.message,
                                       buttons: {
                                           main: {
                                               label: that.language.label_button,
                                               className: "btn btn-danger",
                                               callback: function() {
                                                   $("body").removeClass("modal-open");
                                               }
                                           }
                                       }
                                   });
                                  // console.log("refre");
                                  // $table.bootstrapTable('refresh',  callList());
                               }
                                   }
                           });
                       }return;
                   break;}
                    case "rfa_tipologie_fornitori_ag":
                        API_URL=app.global.json_url + 'rfa/'; 
                       $lblAlert="Tipo di fornitura"
                   break;
                   default://servizi
                       $lblAlert="Servizio"
                   
               }
               if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                   var jsonObj = {};
                   jsonObj.action = "del";
                   jsonObj.type = app.global.nick_array.arr;
                   //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                   jsonObj.person = app.global.tokensCollection.first().get("id_person");
                   jsonObj.data = row;
                   jsonObj = JSON.stringify(jsonObj);
                   $.ajax({
                       url:API_URL,
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
                                   title:  $mydata.message,
                                   message: $mydata.message,
                                   buttons: {
                                       main: {
                                           label: that.language.label_button,
                                           className: "btn btn-info",
                                           callback: function() {
                                               $("body").removeClass("modal-open");
                                               //hrTable($mydata);
                                               app.routers.adminTecRouter.prototype.data_type_edit();
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
                                           label: that.language.label_button,
                                           className: "btn btn-info",
                                           callback: function() {
                                               $("body").removeClass("modal-open");
                                               //hrTable($mydata);
                                               app.routers.adminTecRouter.prototype.data_type_edit();
                                           }
                                       }
                                   }
                               });  
                              
                           }
                      //app.routers.adminTec.prototype.data_type_edit();
                       //    $table.bootstrapTable('refresh',  setTab());
                       },
                       error: function () {
                           showAlert('Delete item error!', 'danger');
                       }
                   })
               }
           }, //remove
          
       };   
  
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.attrezzature_categorie_editView=null
    }
});
return app.views.attrezzature_categorie_edit;
});