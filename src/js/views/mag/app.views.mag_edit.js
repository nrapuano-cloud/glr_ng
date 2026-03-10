require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.mag_edit = Backbone.View.extend({
        initialize: function () {
            console.log("initializing mag_edit: ");
      this.enne=0;
        },
     
        events: {
            "click .create":"create",
            "click #add_campo":"add_campo",
            "click .all":"all_new",
            "click #tab1":"ana_tab",
            "click #tab2":"so_tab",
            "click #tab3":"pi_tab",
            "click #invio":"invio",
            "click #invio_articolo":"invio_articolo",
            "click #pi_invio":"pi_invio",
            "click .contr-Plus":"ana_elementi_add",
            "click .equipe":"pi_equipe_add",
            "click .obiettivo":"pi_obiettivo_add",
            "click .verifica":"pi_obiettivo_verifica_add",
            'change input[type="radio"]':"change_radio",
            'change #fornitori':"change_fornitori"
          //  "click .so":"addRow_so",
        },
        all_new:function () {//allegato new
            app.global.nick_array.new_allegato=true;
            that=this;
            that.all_edit(that);
        },
        all_edit: function (that) {//assegnazioni edit add/update
            console.log(app.global.nick_array,that);
            $new_allegato=app.global.nick_array.new_allegato;//true/false
            
            that.$('.modal-title').text("Add Allegato");  
            //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
            tipoDisp="all";
            modalF=
            
                '<div class="row"><form id="mod'+tipoDisp+'" >'+
                '<input type="hidden" id="id_bsa" name="id_bsa" value="'+app.global.nick_array.row.id+'"/>'+
                    '<div  class="form-row  alle">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  >Articolo</label>'+
                            '<input type="text" class="form-control" name="bsa_descrizione" id="bsa_descrizione" value="'+app.global.nick_array.row.descrizione+'" readonly/>'+
                        '</div>'+

                        
                        '<div class="form-group col-lg-6">'+
                        '<label  >Descrizione *</label>'+
                        '<input type="text" class="form-control" name="descrizione_all" id="descrizione_all" >'+
                    '</div>'+

                    '<div class="form-group col-lg-6">'+
                        '<label for="allegato">Seleziona file *</label>'+
                        '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="application/pdf,image/*">'+

                    '</div>'+
                        '<!--div class="form-group col-sm-12">'+
                            '<label >Nota</label>'+
                            '<textarea  class="form-control" name="nota" id="nota" />'+

                        '</div-->'+

                        '<div class="form-group col-sm-12">'+
                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add Allegato</button>'+
                        '</div>'+
                    '</div>'+ 
                '</form ></div>'
            ;
            
            that.$(".modal-body").empty();   
            that.$(".modal-body").append( modalF);
            that.$("#mod"+tipoDisp).validate({
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
             
                that.$("#btn"+tipoDisp).val($add).html($add);
               
            }else{
                $add="Update Allegato";
                //app.global.nick_array.assegnazione_add="update";
                $descrizione=app.global.nick_array.row_allegato.descrizione;
                $file=app.global.nick_array.row_allegato.file;
               // $nota=app.global.nick_array.row_allegato.nota;
                that.$("#btn"+tipoDisp).val($add).html($add);
                  that.$("#descrizione_all").val($descrizione);
                //  that.$("#allegato").val($file);
             
            }
            that.$("#modal").modal('show'); 
            $('.modal-title').text($add);
     
          
            
           // $('#datetimepicker6').datetimepicker('setStartDate', '-2y');
           // $('#datetimepicker6').datetimepicker('setEndDate', '+0d');
            //qui
            
            that.$('#btn'+tipoDisp).click(function(e) {//add dalle modali
                if(that.$("#mod"+tipoDisp).valid()){
                    console.log(app.global.nick_array);
                    //--------------------------------------------------------------
                    

                    var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                    form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                    form_data.append('action', $new_allegato?'add':"update");
                    form_data.append('type', 'allega');
                     var $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                      //  "Content-Type": "application/json"
                    };
                    var API_URL = app.global.json_url + 'bsa/';
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
                                                that.$("#modal").modal('hide'); 
                                                that.mag_allegati_call(that,$id_articolo);
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
        mag_allegati_call: function (that,$id) {//
            $action="post";
            $url=app.global.json_url+'bsa/';

            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.id = $id;
            jsonObj.type = "bsa_allegati_id";
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
                        that.mag_allegati_table(that,$myData); 
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
            
        },
        mag_allegati_table: function (that,my) {//
            $table =  this.$("#table_all"); 
            this.$("#badge_all").html(my.data.length); 
            var actionFormatter=my.format;
            $format=my.format;
            app.global.nick_array.allegati=my.data;
           console.log(my,app.global.nick_array);
          
           window.actionEvents1 = {
     
            'click .remove_all': function (e, value, row,index) {
                console.log(row);
                if (confirm('Vuoi eliminare quest\'Allegato?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.id=row.id;
                    jsonObj.type="bsa_allegato";
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url: app.global.json_url + 'bsa/',
                        type:'post',
                        headers : that.headerJson(),
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
                                            that.mag_allegati_call(that,row.id_bsa_articolo);
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
                var $headers = {
               "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
               "lang": app.global.languagesCollection.at(0).get("lang"),
               "Content-Type": "application/json"
           };
               console.log("view");
               var jsonObj = {};
               jsonObj.action = "download";
               jsonObj.type="bsa_allegato";
              
               jsonObj.id=$row.id;
               jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
               jsonObj = JSON.stringify(jsonObj);


               $.ajax({
                   url:app.global.json_url + 'bsa/',
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
               jsonObj.type="bsa_allegato";
              
               jsonObj.id=$row.id;
               jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
               jsonObj = JSON.stringify(jsonObj);


               $.ajax({
                   url:app.global.json_url + 'bsa/',
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
        add_campo: function () {//a sotto categoria
            that=this;
            this.enne+=1;
            console.log("add_campo_"+this.enne,that);
           /* that.$("#pre_sub").append('<li>'+
            '<label>Inserire nome campo</label><input type="text" class="form-group-sm-4"/>&mpg;'+
            '<button type="button" class="btn btn-secondary" id="add_campo_'+this.enne+'" name="add_campo_'+this.enne+'">Add</button>'+
            '<button type="button" class="btn btn-danger  id="del_campo_'+this.enne+'" name="del_campo_'+this.enne+'">Delete</button></li>');
            $("del_campo_"+this.enne).on("click",function (e) {
                $("del_campo_"+this.enne).closest("li").remove();
             
               
            });*/
            //---------------------------------------------------------
            that.$('.modal-title').text("Add Campo");  
            modalF=
                '<form id="mod" >'+
                    
                        '<label>Campo</label>'+
                        '<input type="text" class="form-control" name="campo" id="campo" placeholder="Nome Campo">'+
                        '<!--label>Label</label>'+
                        '<input type="text" class="form-control" name="label" id="label" placeholder="Label"-->'+
                        
                       
                        
                    
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
        change_fornitori:function (e) {
            that=this;
            console.log(e.target.value,app.global.nick_array.arr_fornitori);
            this.$('#step3').empty().load('./js/templates/it/app.templates.mag_fornitori_form_details.html', function() {
                var ob1;
                var ob = _.mapObject(app.global.nick_array.arr_fornitori, function(item) {
                  //  console.log(item.id,e.target.value);
                    if(item.id==e.target.value){
                    console.log(item.id,e.target.value,item);
                    ob1=item;
                    }
                 });
                 console.log(ob1.name,ob1);
                 that.mag_cat();
                $("#settore").val(ob1.settore).prop('readonly', true);  
                $("#id_fornitore").val(ob1.id).prop('readonly', true); 
                $("#ccia").val(ob1.CCIA).prop('readonly', true);
                $("#piva").val(ob1.piva).prop('readonly', true);
                $("#indirizzo").val(ob1.indirizzo).prop('readonly', true);
                $("#note").val(ob1.note).prop('readonly', true);
            });
        },
        change_radio:function (e) {
            
            that.$("#step2").empty()
            switch(app.global.nick_array.arr+"-"+e.target.value){
                case "rfa_magazzino_fornitori-1":
                    
                    console.log("radio="+e.target.value,app.global.nick_array.arr);
                  
                    this.fornitori_tipo(1);
                break;
                case "rfa_magazzino_fornitori-2":
                    console.log("radio="+e.target.value,app.global.nick_array.arr);
                    this.fornitori_tipo(2);
                break;
                case "rfa_magazzino_fornitori-3":
                    
                    console.log("radio="+e.target.value,app.global.nick_array.arr);
                    this.fornitori_tipo(3);
                break;
            }
            app.global.nick_array.tipo_fornitore=e.target.value;
            console.log("radio="+e.target.value,app.global.nick_array);
        },
        mag_tab: function () {//magazzino
            that=this;
            this.$('#tab1').empty().append("ARTICOLO MAGAZZINO");
            this.$('#tab1_').empty();
            this.$('#tab1_').load('./js/templates/it/app.templates.mag_form.html', function() {
                that.mag();
            }); 
        },
        fornitori_tab: function () {
            that=this;
            this.$('#tab1').empty().append("FORNITORE");
            this.$('#tab1_').empty();
            
            this.$('#tab1_').load('./js/templates/it/app.templates.mag_fornitori_form.html', function() {
                that.fornitori(that);
            });  
            
        },
     
        categorie_tab: function (that,adr) {
            if(adr){
                console.log("adr="+adr);
            }else{
                console.log("adr=unde "+adr);
            }
            
            //that=this;
            this.$('#tab1').empty().append("CATEGORIA");
            this.$('#tab1_').empty();
            
            this.$('#tab1_').load('./js/templates/it/app.templates.mag_categorie_form.html', function() {
                that.categorie();
            });  
            
        },
        sotto_categorie_tab: function (that,adr) {
            if(adr){
                console.log("adr="+adr);
            }else{
                console.log("adr=unde "+adr);
            }
            
            //that=this;
            this.$('#tab1').empty().append("CATEGORIA"+app.global.nick_array.row.descrizione);
            this.$('#tab1_').empty();
            
            this.$('#tab1_').load('./js/templates/it/app.templates.mag_categorie_form.html', function() {
                that.sotto_categorie();
            });  
            
        },
        fornitori: function (that) {
           
           // that=this;
            $row=app.global.nick_array.row;
            $new=app.global.nick_array.new;
            console.log($new,app.global.nick_array);
            if(!$new){//update
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'
                $tipo="";
                switch($row.tipo){
                    case "MAG":
                        $tipo=1;
                        break;
                    case "RFA":
                        $tipo=2;
                        break;
                    case "RMA":
                        $tipo=3;
                        break;        
                }
                
                console.log($tipo,"update", $row);
                that.$('#step1').empty().load('./js/templates/it/app.templates.mag_fornitori_radio.html', function() {
                if(!$new){that.$('input[name=tipoFornitore][value=' + $tipo + ']').prop('checked', true)} 
                    that.$('#step11').empty()
                //   that.mag();
                    that.fornitori_tipo($tipo);
                });  
            }else{
                $('#stepx').empty() ;
                that.$('#step1').empty().load('./js/templates/it/app.templates.mag_fornitori_radio.html', function() {
                    if(!$new){that.$('input[name=tipoFornitore][value=' + $tipo + ']').prop('checked', true)} 
                    that.$('input[name=tipoFornitore][value=1]').prop('disabled', false);
                    that.$('input[name=tipoFornitore][value=2]').prop('disabled', false);
                    that.$('input[name=tipoFornitore][value=3]').prop('disabled', false);
                    that.$('#step11').empty()
                //   that.mag();
                    that.fornitori_tipo(1);//default fornitore magazzino
                });                        
            }
          
        },
        categorie: function () {
           
            that=this;
            $row=app.global.nick_array.row;
            $new=app.global.nick_array.new;
            console.log($new,app.global.nick_array);
            if(!$new){//update
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'
                $tipo="";
                
                $('#descrizione').val($row.descrizione);
                console.log($tipo,"update", $row);

                this.mag_sub_cat(this,$row.id)
                 
                
                
            }else{
                $('#stepx').empty() ;
                $('#sub').empty() ;                     
            }
          
        },
        sotto_categorie: function () {
           
            that=this;
            app.global.nick_array.arr="rfa_magazzino_sotto_categorie"
            $row=app.global.nick_array.row;
            $new=app.global.nick_array.new;
            console.log($new,app.global.nick_array);
            that.$("#lab").html("Sotto Categoria *");
            that.$("#h3").html("Categoria "+app.global.nick_array.categoria);
            if(!$new){//update
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'
                $tipo="";
                
                $('#descrizione').val(app.global.nick_array.row.descrizione);
                console.log($tipo,"update", row);

               
                 
                
                
            }else{
                $('#stepx').empty() ;
                $('#pre_sub').empty() ;                     
            }
          
        },
        fornitori_tipo: function (tipo) {//richiesta dati per popolare tabella
           
            that=this
            var $tipo='';
            console.log(tipo, $new); 
            switch(Number(tipo)){
                case 1://magazzino
                $tipo='mag_fornitori_magazzino';
                $select=' <div class="row"><div class="form-group col-sm-6">'+
                '<label >Fornitore Magazzino*</label>'+
                '<input type="text"   class="form-control" name="name" id="name" value="" placeholder="Nome" />'+
            '</div></div>';
            that.$("#step2").empty();
            //that.$("#step2").empty().append( $select);
            this.$('#step3').empty().load('./js/templates/it/app.templates.mag_fornitori_form_details.html', function() {
                if(!$new){
                    that.mag_cat();
                    $("#name").val($row.name);
                    $("#id_fornitore").val($row.id);
                    $("#ccia").val($row.CCIA);
                    $("#piva").val($row.piva);
                    $("#indirizzo").val($row.indirizzo);
                    $("#note").val($row.note);
                }else{
                    that.mag_cat();
                    $("#name").val('');
                    $("#id_fornitore").val();
                    $("#ccia").val('');
                    $("#piva").val('');
                    $("#indirizzo").val('');
                    $("#note").val('');
                }       
              });
          
                    break;
                case 2:
                    
                    $tipo='mag_fornitori_rfa';
                    console.log(tipo,$tipo);
                    if(!$new){
                        $inp='<input type="text"   class="form-control" name="name" id="name" value="" placeholder="Nome" readonly/>';
                        $select=' <div class="row"><div class="form-group col-sm-6">'+
                            '<label >Fornitori RFA</label>'+$inp+
                            '</div></div>';
                        that.$("#step2").empty().append( $select);
                        $("#name").val($row.name);
                        this.$('#step3').empty().load('./js/templates/it/app.templates.mag_fornitori_form_details.html', function() {
            
                                that.mag_cat();
                                $("#id_fornitore").val($row.id);
                                $("#ccia").val($row.CCIA).prop('readonly', true);
                                $("#piva").val($row.piva).prop('readonly', true);
                                $("#indirizzo").val($row.indirizzo).prop('readonly', true);
                                $("#note").val($row.note).prop('readonly', true);
                            });
                    }else{
                        $inp='<select  class="form-control" name="fornitori" id="fornitori" ></select>';
                        $select='<div class="row"><div class="form-group col-sm-6">'+
                            '<label >Fornitori RMA</label>'+$inp+
                            '</div></div>';
                        that.$("#step2").empty().append( $select);
                    }
                    
                    
               
                    break;
                case 3:
                    $tipo='mag_fornitori_rma';
                    console.log(tipo,$tipo); 
                    if(!$new){
                        $inp='<input type="text"   class="form-control" name="name" id="name" value="" placeholder="Nome" readonly/>';
                        $select='<div class="row"><div class="form-group col-sm-6">'+
                            '<label >Fornitori RMA</label>'+$inp+
                            '</div><div class="row"><div class="form-group col-sm-6"><label >Settore RMA</label><input type="text"   class="form-control" name="settore" id="settore"  readonly/></div></div>';
                        that.$("#step2").empty().append( $select);
                        $("#name").val($row.name);
                        this.$('#step3').empty().load('./js/templates/it/app.templates.mag_fornitori_form_details.html', function() {
          
                            that.mag_cat();
                            $("#id_fornitore").val($row.id);
                            $("#settore").val($row.settore).prop('readonly', true);
                            $("#ccia").val($row.CCIA).prop('readonly', true);
                            $("#piva").val($row.piva).prop('readonly', true);
                            $("#indirizzo").val($row.indirizzo).prop('readonly', true);
                            $("#note").val($row.note).prop('readonly', true);
                        });
                    }else{
                        $inp='<select  class="form-control" name="fornitori" id="fornitori" ></select>';
                        $select='<div class="row"><div class="form-group col-sm-6">'+
                            '<label >Fornitori RMA</label>'+$inp+
                            '</div><div class="form-group col-sm-6"><label >Settore RMA</label><input type="text"   class="form-control" name="settore" id="settore"  readonly/></div></div>';
                        that.$("#step2").empty().append( $select);
                       
                    }
                   
                    break;        
            }
            if(tipo==1){
               // that.mag_cat();
            }else{
            $action="post";
            $url=app.global.json_url+'mag/';
            var $selCat=that.$("#fornitori");
            $selCat.empty();
            that.$("#step3").empty();
          // that=this;   
            var API_URL =''; 
            console.log(app.global.sub,$tipo); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.tipoFornitore = tipo;    
            jsonObj.type = $tipo;
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
                            app.global.nick_array.arr_fornitori=$myData.data;
                            $selCat.append('<option value="">Seleziona Fornitore</option>');
                            $.each($myData.data, function(i, value) {
                             //   console.log(value.id);
                                
                                $selCat.append('<option value="'+value.id+'">'+value.name+'</option>');
                              
                            });
                            
                            if(!$new){ $selCat.val(app.global.nick_array.row.id).change()}
                         
                            
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
            }
            }, 
        mag: function () {
            $new=app.global.nick_array.new;
            $event=app.global.nick_array.event;
            
            console.log("mag","new="+$new);
            
            if(typeof app.global.nick_array.newR !== 'undefined'){
                this.$(".toolbar").append(app.global.nick_array.newR);
               
            }
           
            if(!$new && ($event==="update" | $event==="copy")){//update
                $('#stepx').empty() ;
                this.mag_cat(this);
            }else{
                //se è nuovo disabilito  i due tab perchè ancora non ho l id da associare
                //$('#tab2').css('pointer-events', 'none');
                //$('#tab3').css('pointer-events', 'none');
                $('#stepx').empty() ;
                this.mag_cat(this);
            }
        },
        mag_cat: function () {//richiesta dati per popolare tabella

            that=this;
            $new=app.global.nick_array.new;
            $event=app.global.nick_array.event;
            $action="post";
            $url=app.global.json_url+'mag/';
            var $selCat=$("#categoria");
            var $selCat1;
            $selCat.empty();
          //  that.$("#step2").empty();
            
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "rfa_magazzino_categorie";
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
                            $selCat.append('<option value="0">Seleziona Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               // console.log(value.id);
                                
                                $selCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                              
                            });
                            
                            if(!$new && ($event==="update" | $event==="copy")){
                                console.log(app.global.nick_array.row);
                                $selCat.val(app.global.nick_array.row.id_categoria).change()
                                that.mag_sub_cat(that,app.global.nick_array.row.id_categoria);
                                that.mag_fornitori(that); 
                            }
                            $selCat.change(function (e) {
                                that.$("#step2").empty();
                                if(e.currentTarget.value!==""){
                                    console.log(e);
                               
                                    that.mag_sub_cat(that,e.currentTarget.value);
                                    that.mag_fornitori(that);     
                                }else{
                                    that.$("#sub_categoria").empty();
                                   
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
                        console.error("bsa categorie error!!!");
                    }
                });
            },
        mag_sub_cat: function (that,$id) {//

            console.log($id,app.global.nick_array);
            var $selSubCat=that.$("#sub_categoria");
            $selSubCat.off("change");
            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'mag/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "rfa_magazzino_sub_categorie";
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
                        app.global.nick_array.sub_categorie=$myData.data;
                        if ($myData.success) {
                            switch (app.global.nick_array.arr) {
                                case 'rfa_magazzino_categorie':
                                    app.global.nick_array.categoria=app.global.nick_array.row.descrizione;
                                    that.$("#h3").html("Categoria "+app.global.nick_array.categoria);
                                    console.log($myData);
                                    that.hrTable($myData);
                                    break;
                                case 'rfa_magazzino_sotto_categorie':
                                    console.log($myData);
                                    that.$("#h3").html("Categoria "+app.global.nick_array.categoria);
                                    that.$("#lab").html("Sotto Categoria *");
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
                                    
                                    that.$(".panel-heading").html("Campi Specifici");
                                    that.$(".panel-body").empty();
                                    $campi_specifici = JSON.parse(app.global.nick_array.row.campi_specifici);
                                    that.enne=0;
                                    console.log( "$campi_specifici=", $campi_specifici);
                                   
                                    if(typeof($campi_specifici) !== "undefined" && $campi_specifici !== null){   
                                    $.each( $campi_specifici.campo_spec, function( key, value ) {
                                        console.log(key, value);
                                     /*   $camp='<ww class="col-lg-12 " style="border: thin solid #F0F0F0"><div class="form-group col-lg-5" >'+
               
                                        '<label>Label</label>'+
                                        '<input type="text" name="label_'+that.enne+'" class="form-control" id="label_'+that.enne+'" value="'+value.label+'" >'+
                                        '</div>'+
                                        '<div class="form-group col-lg-5" >'+
                                        '<label>Campo</label>'+
                                        '<input type="text" name="campo_'+that.enne+'" class="form-control" id="campo_'+that.enne+'" value="'+value.name+'" >'+
                                        '</div>'+
                                        '<div class="form-group col-lg-2"  >'+
                                        '<button type="button" class="btn btn-danger" style="margin:23px;" id="del_'+that.enne+'" name="del_'+that.enne+'" >Delete</button>'+
                                        '</div>'+
                                        '</ww>';*/
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
                                      

                                    that.$("#pre_sub").append(
                                        '<div class="form-group-sm-4"><button type="button" class="btn btn-info" id="add_campo" name="add_campo">Add campo specifico</button></div>'
                                       
                                        );
                                    break;    
                            
                                default:
                                    $selSubCat.append('<option value="0">Seleziona una Sotto Categoria</option>');
                                    $.each($myData.data, function(i, value) {
                                        $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                    });
                                    $selSubCat.on("change",function (e) {
                                        if(e.currentTarget.value!==""){
                                        console.log(e);
                                        
                                         scheda_out(e.currentTarget.value); 
                                     
                                        }else{
                                            that.$("#step2").empty();
                                        }
                                    });
                                    function scheda_out($id_sub){
                                        var $tt="";
                                        //if(that.$("#categoria").val()==5 && (that.$("#sub_categoria").val()==25)){
                                        if(1==1){    
                                            $tt=that.$("#sub_categoria :selected").text();
                                           switch(app.global.nick_array.arr){
                                                case "rfa_magazzino_fornitori":
                                                 // that.$('#step2').empty().load('./js/templates/it/app.templates.mag_fornitori_radio.html', function() {
                                                    that.$('#step2').empty(function() {
                                                        that.$('#step11').empty()
                                                        //that.bsa();
                                                    }); 
                                                    break;
                                                case "rfa_magazzino":
                                                    that.$('#step2').empty().load('./js/templates/it/app.templates.mag_anagrafica.html', function() {
                                                    // that.$('#step11').empty()
                                                    var ob1 ;
                                                    var ob = _.mapObject(app.global.nick_array.sub_categorie, function(item) {
                                                    //  console.log(item.id,e.target.value);
                                                        if(item.id==$id_sub){
                                                        console.log(item.id,$id_sub,item,app.global.nick_array);
                                                        ob1=item.campi_specifici;
                                                        }
                                                    });
                                                    app.global.nick_array.campi_specifici=ob1;
                                                  //  that.mag_fornitori(that);
                                                  that.mag_populate_form();
                                                }); 
                                            break;
                                            }
                                            
                                        }else{
                                            $tt="SCHEDA in lavorazione"
                                        }
                                        that.$("#step2").empty().append(
                                           // $tt
                                            );
                                    }
                                    break;
                            }
                           
                            
                            if(!app.global.nick_array.new){
                                console.log(app.global.nick_array);
                                $selSubCat.val(app.global.nick_array.row.id_sotto_categoria).change();
                                $("#etichetta").val(app.global.nick_array.row.etichetta);
                               
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
                        console.error("bsa sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },
        mag_fornitori: function () {//richiesta dati per popolare tabella
            
                $action="post";
                $url=app.global.json_url+'mag/';
                var $selFornitori=$("#fornitore");
                $selFornitori.empty();
                //that.$("#step2").empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                 
                    API_URL=$url;
                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.sub_area = app.global.sub;
                    jsonObj.type = "rfa_magazzino_fornitori";
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
                            console.log($myData);
                            if ($myData.success) {
                                $selFornitori.append('<option value="">Seleziona Fornitore</option>');
                                $.each($myData.data, function(i, value) {
                                 // console.log(value.id,value.tipo);
                                    
                                    $selFornitori.append('<option value="'+value.id+"-"+value.tipo+'">'+value.name+' - '+value.tipo+'</option>');
                                  
                                });
                               
                                
                                $selFornitori.change(function (e) {
                                    //  that.$("#step2").empty();
                                    if(e.currentTarget.value!==""){
                                        console.log(e,app.global.nick_array.arr);
                                        switch(app.global.nick_array.arr){
                                            case "rfa_magazzino":
                                                console.log(app.global.nick_array.arr);
                                               // that.mag_populate_form();
                                                break;
                                            default:
                                                console.log(app.global.nick_array.arr);
                                                that.bsa_sub_cat(that,e.currentTarget.value);
                                        }
                                    }else{
                                        console.log(e,e.currentTarget.value,app.global.nick_array.arr);
                                        switch(app.global.nick_array.arr){
                                            case "rfa_magazzino":
                                                console.log(app.global.nick_array.arr);
                                             //   that.mag_populate_form();
                                                break;
                                            default:
                                                console.log(app.global.nick_array.arr);
                                                that.$("#sub_categoria").empty();
                                        }
                                        
                                       
                                    }
                                });
                                console.log($new,app.global.nick_array);
                                if(!$new){ 
                                    console.log(app.global.nick_array.row.id_fornitore,app.global.nick_array.row);
                                   
                                    $selFornitori.val(app.global.nick_array.row.id_fornitore+"-"+app.global.nick_array.row.tipo_fornitore).change()
                                    
                                }else{
                                    console.log("empty allegati");
                                    $("#p_all").empty();
                                }
                               
                             // that.mag_populate_form();
                                
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
        mag_movimento: function () {//richiesta dati per popolare tabella
            $ele='<div class="row">';
                   
                       
            $ele+='<div class="form-group col-sm-4">'+
                '<label>Ultimo movimento</label>'+
                '<select class="form-control" id="movimenti" name="movimenti"> '+
            '</div>';
        
        $ele+= '</div >'; 

        $("#movimento").append($ele); 
            $action="post";
            $url=app.global.json_url+'mag/';
            var $selMovimento=$("#movimenti");
            $selMovimento.empty();
            
            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "mag_movimenti_color";
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
                        console.log($myData);
                        if ($myData.success) {
                            $selMovimento.append('<option value="">Seleziona Azione</option>');
                            $.each($myData.data, function(i, value) {
                                // console.log(value.id,value.tipo);
                                
                                $selMovimento.append('<option value="'+value.id+'" style="background-color:'+value.color+';">'+value.tipo_movimento+' - '+value.movimento+'</option>');
                                
                            });
                            
                            
                            $selMovimento.change(function (e,val) {
                                console.log(val,e);
                                //$(this).css('backgroundColor','red');
                                $(this).css('backgroundColor',$('option:selected',this).css('backgroundColor'));
                               
                            });
                            console.log($new,app.global.nick_array);
                            if(!$new){ 
                                console.log(app.global.nick_array.row.id_movimento,app.global.nick_array.row);
                                
                                $selMovimento.val(app.global.nick_array.row.id_movimento).change()
                                
                            }
                            
                            // that.mag_populate_form();
                            
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
                        console.error("mag movimento error!!!");
                    }
                });
            },                    
        mag_populate_form: function (){
            console.log(app.global.nick_array);
            $row_camp=app.global.nick_array.campi_specifici;
            $('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();
            $('#datetimepicker1').datetimepicker('setStartDate', '-2y');
            $('#datetimepicker1').datetimepicker('setEndDate', '+0d');
            $('#datetimepicker1a').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();
            $('#datetimepicker1a').datetimepicker('setStartDate', '-2y');
            $('#datetimepicker1a').datetimepicker('setEndDate', '+0d');
            $('#datetimepicker1b').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();
            $('#datetimepicker1b').datetimepicker('setStartDate', '-2y');
            $('#datetimepicker1b').datetimepicker('setEndDate', '+2y');
            if(typeof($row_camp) !== "undefined" && $row_camp!==null){
                var parsedrow = JSON.parse($row_camp);
                console.log(parsedrow);
                if(typeof(parsedrow) !== "undefined" && parsedrow!==null){
              //  $("#campi_specifici").empty().append(parsedrow.html);
                    $ele='<div class="row">';
                    $.each(parsedrow.campo_spec, function(i, value) {
                        console.log(i,value);
                        $ele+='<div class="form-group col-sm-'+value.width+'">'+
                            '<label>'+value.label+'</label>'+
                            '<input type="'+value.type+'" class="form-control" id="'+value.name+'" name="'+value.name+'"> '+
                        '</div>';
                    });
                    $ele+= '</div >'; 

                    $("#campi_specifici").append($ele); 
                      }
            }
            $("#cs .panel-heading").empty().html('Campi comuni della sotto categoria: <h4>'+$("#sub_categoria option").filter(":selected").text()+'</h4>'); 
            
            if(app.global.nick_array.new){
                $('#p_all .panel-heading').empty();//disabilito inserimento allegati
            }else{
                $row=app.global.nick_array.row;
                if(typeof($row.data_acquisto) !== "undefined" && $row.data_acquisto !== null){   
                    $('#data_acquisto').val(moment($row.data_acquisto).format('DD/MM/YYYY'));
                }
                if(typeof($row.data_fattura) !== "undefined" && $row.data_fattura !== null){   
                    $('#data_fattura').val(moment($row.data_fattura).format('DD/MM/YYYY'));
                }
                if(typeof($row.data_fine_garanzia) !== "undefined" && $row.data_fine_garanzia !== null){   
                    $('#data_fine_garanzia').val(moment($row.data_fine_garanzia).format('DD/MM/YYYY'));
                }
                
                
                $("#codice").val($row.codice);
                $("#descrizione").val($row.descrizione);
                $("#id").val($row.id);
                $("#marca").val($row.marca);
                $("#modello").val($row.modello);
                $("#note").val($row.note);
                $("#numero_fattura").val($row.numero_fattura);
                $("#numero_seriale").val($row.numero_seriale);
                $("#codice_bsa").val($row.codice_bsa);
                $("#proprieta").val($row.proprieta);
                $("#blah").attr("src",$row.img_link);
                var parse_camp = JSON.parse($row.campi_specifici);
                if(typeof(parse_camp) !== "undefined" && parse_camp !== null && parse_camp !== ""){   
                    $.each(parse_camp.campo_spec, function(i, value) {
                        console.log(i,value);
                        $("#"+_.keys(value)).val(_.values(value));
                    });
                }
               
                    that.mag_movimento();
                    this.mag_allegati_call(this, app.global.nick_array.row.id);
            }
            
            $("#file").change(function(){
           
                readURL(this);
                
                 
                  
            });
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
    
                    reader.onload = function (e) {
                        $('#blah').attr('src', e.target.result);
                        
                    }
    
                   reader.readAsDataURL(input.files[0]);
                        
               /*
                    var file_data = $("#file").prop("files")[0]; // Getting the properties of file from file field
                    var form_data = new FormData();
                    form_data.append("file", file_data); 
                    form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
                    form_data.append("tab","generali"); 
                    form_data.append("action","update");
                    form_data.append("id_ser",app.global.nick_array.data.id);
                    console.log(file_data);
                     $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                        //"Content-Type": "application/json"
                    };
                    $.ajax({
                        url:API_URL+'servizi/',
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
                            app.global.nick_array.data.img_link= $mydata.img_link;
                           
                            //rap_generali(that,1);
    
                      }
                    });
                    */
                }
                
                
            }
            
            this.mag_fornitori(this);
           
           
        },
        bsa_cat: function (that) {//richiesta dati per popolare tabella

            $action="post";
            $url=app.global.json_url+'bsa/';
            var $selCat=that.$("#categoria");
            $selCat.empty();
            that.$("#step2").empty();
            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "bsa_categorie";
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
                            $selCat.append('<option value="">Seleziona Categoria</option>');
                            $.each($myData.data, function(i, value) {
                                console.log(value.id);
                                
                                $selCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                              
                            });
                            
                            if(!$new){
                               
                                $selCat.val(app.global.nick_array.row.id_categoria).change()
                                that.bsa_sub_cat(that,app.global.nick_array.row.id_categoria);
                            }
                            $selCat.change(function (e) {
                                that.$("#step2").empty();
                                if(e.currentTarget.value!==""){
                                console.log(e);
                               
                                that.bsa_sub_cat(that,e.currentTarget.value);

                                }else{
                                    that.$("#sub_categoria").empty();
                                   
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
                        console.error("bsa categorie error!!!");
                    }
                });
            }, 
        bsa_sub_cat: function (that,$id) {//

            console.log($id);
            var $selSubCat=that.$("#sub_categoria");

            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'bsa/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
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
                            $selSubCat.empty().append('<option value="0">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ 
                                console.log(app.global.nick_array.row.id_sotto_categoria);
                                $selSubCat.val(app.global.nick_array.row.id_sotto_categoria).change();
                                scheda_out(app.global.nick_array.row.id_sotto_categoria);
                              
                            }
                            $selSubCat.on("change",function (e) {
                                if(e.currentTarget.value!==""){
                                console.log(e);
                                scheda_out(e.currentTarget.value);
                                }else{
                                    that.$("#step2").empty();
                                }
                            });
                            function scheda_out($id_sub){
                                var $tt="";
                                //if(that.$("#categoria").val()==5 && (that.$("#sub_categoria").val()==25)){
                                if(1==1){     
                                    $tt=that.$("#sub_categoria :selected").text();
                                   switch(app.global.nick_array.arr){
                                        case "rfa_magazzino_fornitori":
                                            that.$('#step2').empty().load('./js/templates/it/app.templates.mag_fornitori_radio.html', function() {
                                                that.$('#step11').empty()
                                                //that.bsa();
                                            }); 
                                            break;
                                        case "rfa_magazzino":
                                            that.$('#step2').empty().load('./js/templates/it/app.templates.mag_anagrafica.html', function() {
                                            // that.$('#step11').empty()
                                            var ob1 ;
                                            var ob = _.mapObject($myData.data, function(item) {
                                            //  console.log(item.id,e.target.value);
                                                if(item.id==$id_sub){
                                                console.log(item.id,$id_sub,item);
                                                ob1=item.campi_specifici;
                                                }
                                            });
                                            app.global.nick_array.campi_specifici=ob1;
                                            that.mag_fornitori(that);
                                        }); 
                                    break;
                                    }
                                    
                                }else{
                                    $tt="SCHEDA in lavorazione"
                                }
                                that.$("#step2").empty().append(
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
                        console.error("bsa sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },
        bsa_form: function (that,$id) {//

            console.log($id);
            var $selSubCat=that.$("#sub_categoria");

            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'bsa/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
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
                            $selSubCat.empty().append('<option value="0">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ $selSubCat.val(that.$arr.id).change()}
                            $selSubCat.change(function (e) {
                                if(e.currentTarget.value!==""){
                                console.log(e);
                                var $tt="";
                                //if(that.$("#categoria").val()==5 && (that.$("#sub_categoria").val()==25)){
                                if(1==1){    
                                    $tt=that.$("#sub_categoria :selected").text();
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
            that=this;
            $titleMsg="";
            $tipoTab=1;//default magazzino
            console.log("invio",app.global.nick_array)
            $new=app.global.nick_array.new;
            $("#edit").validate(); //sets up the validator

          
          
            var form_data = new FormData($('#edit')[0]); 
            var API_URL = app.global.json_url + 'mag/'; 
            
            form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
            if(!$new){
                switch (app.global.nick_array.arr) {
                    case 'rfa_magazzino_fornitori':
                        $tipoTab=3
                        $titleMsg="Update Fornitore";
                        form_data.append('type', 'fornitore');
                        app.global.nick_array.tipo_fornitore=app.global.nick_array.row.id_tipo;
                       form_data.append('tipoFornitore',app.global.nick_array.tipo_fornitore );
                        break;
                    case 'rfa_magazzino_categorie':
                        $tipoTab=4;
                        $titleMsg="Update Categoria";
                        $("input[name=\"descrizione").rules( "add", {
                            required: true,
                            messages: {
                                required: "Required input"
                            }
                        });
                        form_data.append('id', app.global.nick_array.row.id);
                        form_data.append('type', 'rfa_magazzino_categorie');
                        break; 
                    case 'rfa_magazzino_sotto_categorie':
                            $tipoTab=4;
                            $titleMsg="Update Sotto Categoria";
                            $("input[name=\"descrizione").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"
                                }
                            });
                            form_data.append('id', app.global.nick_array.row.id);
                            
                            form_data.append('type', 'rfa_magazzino_sub_categorie');
                            break;         
                
                    default:
                        break;
                }
                console.log(app.global.nick_array);
                if(app.global.nick_array.event==="copy"){
                    form_data.append('action', 'add');
                }else{
                    form_data.append('action', 'update');
                }
                
               
            }else{
                console.log(app.global.nick_array);
                switch (app.global.nick_array.arr) {

                    case 'rfa_magazzino_fornitori':
                        $tipoTab=3;
                        $titleMsg="Add Fornitore"
                        form_data.append('type', 'fornitore');
                        $("input[name=\"name").rules( "add", {
                            required: true,
                            messages: {
                                required: "Required input"
                            }
                        });
                        
                        //app.global.nick_array.tipo_fornitore= $("#tipoFornitore").val()
                      //  console.log( app.global.nick_array.tipo_fornitore);
                        // app.global.nick_array.tipo_fornitore=app.global.nick_array.row.id_tipo;
                     //  form_data.append('tipoFornitore',app.global.nick_array.tipo_fornitore );
                        break;
                    case 'rfa_magazzino_categorie':
                        $tipoTab=4;
                        $titleMsg="Add Categoria"
                        $("input[name=\"descrizione").rules( "add", {
                            required: true,
                            messages: {
                                required: "Required input"
                            }
                        });
                        form_data.append('type', 'categoria');
                        break; 
                    case 'rfa_magazzino_sotto_categorie':
                            $tipoTab=4;
                            $titleMsg="Add Sotto Categoria"
                            $("input[name=\"descrizione").rules( "add", {
                                required: true,
                                messages: {
                                    required: "Required input"
                                }
                            });
                            form_data.append('type', 'sotto_categoria');
                            form_data.append('id_categoria', app.global.nick_array.row.id);
                            break;        
                
                    default:
                        break;
                }
                form_data.append('action', 'add');
            }
            
            if($("#edit").valid()){
                $("#invio").prop( "disabled", true );
                console.log($new,app.global.nick_array);
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
                                    console.log("tipo_tab="+$tipoTab);
                                    app.routers.magRouter.prototype.mag("it",$tipoTab);
                                }
                            });
                        }else{

                            bootbox.alert({ 

                            title: $titleMsg,
                            message:  $mydata.message,

                            callback: function() {
                                console.log("tipo_tab="+$tipoTab);
                                app.routers.magRouter.prototype.mag("it",$tipoTab);//3 fornitori
                            // that.fornitori_tipo(app.global.nick_array.tipo_fornitore);
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
        invio_articolo: function () {
            console.log(app.global.nick_array);
       
            that=this;
            console.log("invio_articolo")
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
            $("input[name=\"codice").rules( "add", {
                 required: true,
                 //number: true,
                 // minlength: 2,
 
                 messages: {
                     required: "Required input"
                     //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                     // number:"Inserire un numero!"
                 }
             });
             $("select[name=\"fornitore").rules( "add", {
                required: true,
               // number: true,
                // minlength: 1,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
           
          
            if($("#edit").valid()){
                $("#invio").prop( "disabled", true );
           
            var form_data = new FormData($('#edit')[0]); 
            var API_URL = app.global.json_url + 'mag/'; 
            form_data.append('type', 'mag_articolo');
            form_data.append('allegati', JSON.stringify(app.global.nick_array.allegati));
           
            form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
            if(!$new){
                if(app.global.nick_array.event==="copy"){
                    form_data.append('action', 'add');
                }else{
                    form_data.append('action', 'update');
                }
               // form_data.append('action', 'update');
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
                    console.log("success",app.global.nick_array.arr);
                    
    
                        bootbox.alert({ 
        
                            title: "Articolo",
                            message:  $mydata.message,

                            callback: function() {
                                console.log("call mag");
                                app.routers.magRouter.prototype.mag("it",1);//1 magazzino articoli
                                
                            }
                        });
                  
                    
                  
    
    
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                }
            });
           
        }
           
        },
        hrTable:function ($data){
           
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
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
                case "rfa_magazzino_categorie":
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
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
               
                    break;
                }
                case "rfa_magazzino_sotto_categorie":
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
                        this.render(app.global.nick_array.row.id);//categoria
                
                         
                   
                        break;
                    }  
                case "rfa_magazzino_fornitori":{
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
      
        },
        remove: function (e, row, value) {
            that=this;
            console.log(row,app.global.nick_array);
            var API_URL = app.global.json_url + 'mag/';
            switch (app.global.nick_array.arr){
                case "rfa_magazzino_":{
                    console.log("magazzino",row.id);
                    app.global.nick_array.row=row;
                    
            
                    return;  
                  
                break;
                }
                case "rfa_magazzino_categorie"://siamo in categoria e remove è x la row sotto_categoria selezionata
                {
                    console.log("sotto_categoria",row);
                    $tipoTab=4;
                    $type="sotto_categoria";
                    $titleMsg="Rimozione  Sotto Categoria "+row.descrizione;
                    
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
                message: 'Are you sure to delete this item?',
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
        'create': function (e, value, row) {
            
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            switch (app.global.nick_array.arr){
                case "rfa_magazzino_categorie"://siamo in sotto_categorie
                    {
                        console.log(app.global.nick_array);
                        $bread='<li>Nuova Sotto Categoria</li>';
                    }
                case "rfa_magazzino_fornitori_":
                $bread='<li>Nuovo Fornitore</li>';
                break;
                case "rfa_magazzino_":
                $bread='<li>Nuovo Articolo</li>';
                break;
              
            }
            
            app.global.breadcrumb.push({
                   
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            this.sotto_categorie_tab(this,4);
    
            return;  
        },
       
        
        render: function (adr) {  
            console.log("adr="+adr);    
            $(this.el).html(this.template()); 
            console.log( app.global.nick_array);
            //-----------breadcrumb-------------------------------------------------------
            if(app.global.nick_array.arr=='rfa_magazzino_sotto_categorie'){
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
            //-------- anagrafica---form------------------------------------------
                switch ( app.global.nick_array.arr){
                    case "rfa_magazzino":
                        this.mag_tab(that);
                        break;
                    case "rfa_magazzino_fornitori":
                        this.fornitori_tab(that);
                        break;
                    case "rfa_magazzino_categorie":
                        this.categorie_tab(that,adr);
                        break; 
                    case "rfa_magazzino_sotto_categorie":
                            this.categorie_tab(that,adr);
                            break;        
                }
            
                window.actionEventsub = {
       
                    'click .update': function (e, value, row) {
                       console.log(e, value, row,app.global.nick_array);
                       app.global.nick_array.new=false;
                       app.global.nick_array.arr="rfa_magazzino_sotto_categorie"
                       that.update(e, row,value );
                       return;   
                 
             
               },
               'click .remove': function (e, value, row) {
                   
                   that.remove(e, row,value );
                   return;   
                   console.log(app.global.nick_array.arr);
                   $lblAlert="";
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
        app.global.bsa_editView=null
    }
});
return app.views.mag_edit;
});