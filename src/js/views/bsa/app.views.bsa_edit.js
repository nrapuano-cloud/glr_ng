require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.bsa_edit = Backbone.View.extend({
        initialize: function () {
            console.log("initializing bsa_edit: ");
      
        },
     
        events: {
            "click #genera":"genera_codice",
            "click #tab1":"ana_tab",
            "click #tab2":"so_tab",
            "click #tab3":"pi_tab",
            "click #invio_articolo":"invio",
            "click #pi_invio":"pi_invio",
            "click .contr-Plus":"ana_elementi_add",
            "click .equipe":"pi_equipe_add",
            "click .obiettivo":"pi_obiettivo_add",
            "click .verifica":"pi_obiettivo_verifica_add",
            "click .ass":"ass_new",
            "click .all":"all_new",
            
          //  "click .so":"addRow_so",
        },
        genera_codice:function () {//allegato new
            console.log("genera");
            that=this;
            $action="post";
            $url=app.global.json_url+'bsa/';

            var API_URL =''; 
           
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.id_categoria = that.$("#id_categoria").val();
            jsonObj.id_sotto_categoria = that.$("#id_sotto_categoria").val();
            jsonObj.type = "bsa_genera_codice";
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
                        that.$("#codice_assegnato").val($myData.new_code); 
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
                    console.error("bsa code generator error!!!");
                }
            });
            
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
                            '<label  >Bene Strumentale</label>'+
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
                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add Assegnazione</button>'+
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
                    var $id_articolo=app.global.nick_array.row.id_articolo;
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
                                                that.bsa_allegati_call(that,$id_articolo);
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
        ass_new:function () {//assegnazioni new
            app.global.nick_array.new_assegnazione=true;
            that=this;
            that.ass_edit(that);
        },
        ass_edit: function (that) {//assegnazioni edit add/update
            console.log(app.global.nick_array,that);
            $new_assegnazione=app.global.nick_array.new_assegnazione;//true/false
            
            that.$('.modal-title').text("Add Assegnazione");  
            //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
            tipoDisp="ass";
            modalF=
                '<div class="row"><form id="mod'+tipoDisp+'" >'+
                '<input type="hidden" id="id_bsa" name="id_bsa" value="'+app.global.nick_array.row.id+'">'+
                    '<div  class="form-row  alle">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  >Bene Strumentale</label>'+
                            '<input type="text" class="form-control" name="descrizione" id="descrizione" value="'+app.global.nick_array.row.descrizione+'" readonly/>'+
                        '</div>'+

                        '<div class="form-group col-sm-6">'+
                            '<label >Data inizio *</label>'+
                            '<div class="input-group date " id="datetimepicker1c">'+
                                '<input type="text" class="form-control "  id="data_inizio" name="data_inizio" />'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                            '<label >Data Fine</label>'+
                            '<div class="input-group date " id="datetimepicker1d">'+
                                '<input type="text" class="form-control "  id="data_fine" name="data_fine" />'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-12">'+
                            '<label  >Servizio **</label>'+
                            '<select class="form-control" name="servizio" id="servizio" />'+
                        '</div>'+

                        '<div class="form-group col-sm-12">'+
                            '<label >Assegnatario **</label>'+
                            '<select  class="form-control" name="persona" id="persona" />'+

                        '</div>'+
                        '<div class="form-group col-sm-12">'+
                            '<label >Nota</label>'+
                            '<textarea  class="form-control" name="nota" id="nota" />'+

                        '</div>'+

                        '<div class="form-group col-sm-12">'+
                            '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add Assegnazione</button>'+
                        '</div>'+
                    '</div>'+ 
                '</form ></div>'
            ;
            
            that.$(".modal-body").empty();   
            that.$(".modal-body").append( modalF);
            //----------------------------------------------------------------------------
            var $sel_person=that.$("#persona");
            var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            var API_URL = app.global.json_url + 'bsa/';
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "bsa_person";
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    $sel_person.append('<option value="0"></option>');
                    $.each($mydata.data, function(i, value) {

                        $sel_person.append('<option value="'+value["id_person"]+'">'+value["last_name"]+" "+value["first_name"]+'</option>');
                    });
                    $new_assegnazione?"": $sel_person.val(app.global.nick_array.row_assegnazione.id_dipendente).change();

                },
                error: function () {
                    console.log("ko");
                      
                }
            });
            //-----------------------------------------------------------------------
            var $sel_servizio=that.$("#servizio");
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "bsa_servizi";
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    $sel_servizio.append('<option value="0"></option>');
                    $.each($mydata.data, function(i, value) {

                        $sel_servizio.append('<option value="'+value["id"]+'">'+value["servizio"]+'</option>');
                    });
                    $new_assegnazione?"": $sel_servizio.val(app.global.nick_array.row_assegnazione.id_servizio).change();

                },
                error: function () {
                    console.log("ko");
                      
                }
            });
            //-------------------------------------------------------------------------
            $.validator.addMethod('onlyOne', function(value, element, param) {
                console.log(value,element, param,param[0],this.optional(element),$('[name="' + param[0] + '"]').is(':blank'),$('[name="' + param[0] + '"]').val());
                return value !== '0' | $('[name="' + param[0] + '"]').val() !== '0';
            }, "Perfavore inserisci almeno un Servizio od una Persona");
        
            that.$("#mod"+tipoDisp).validate({
                
                rules:{
                    servizio:{
                        onlyOne: ["persona"],
                        required: true,
                    },
                    persona:{
                        onlyOne: ["servizio"],
                        required: true,
                    },
                },
                messages: {
                    servizio: {
                        required: "Perfavore inserisci un servizio!"
                    },
                    persona: {
                        required: "Perfavore inserisci un dipendente!"
                    }
                }
            }); //sets up the validator
            var $add="";
            var dateNow = new Date();
            that.$('#datetimepicker1c').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it",
                defaultDate:moment(dateNow).hours(0).minutes(0).seconds(0).milliseconds(0)               
            }).show();
            that.$('#datetimepicker1d').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it",
              //  defaultDate:moment(dateNow).hours(0).minutes(0).seconds(0).milliseconds(0)               
            }).show();
            if( $new_assegnazione){
                $add="Add Assegnazione";
               // app.global.nick_array.elementi_add="add";
               that.$('#datetimepicker1c').datetimepicker('update', new Date());
                $("#btnAlle").val($add).html($add);
               
            }else{
                $add="Update Assegnazione";
                //app.global.nick_array.assegnazione_add="update";
                $data_inizio=app.global.nick_array.row_assegnazione.data_inizio;
                $nota=app.global.nick_array.row_assegnazione.nota;
                that.$("#btn"+tipoDisp).val($add).html($add);
                that.$('#datetimepicker1c').datetimepicker('update', app.global.nick_array.row_assegnazione.data_inizio);  
                that.$('#datetimepicker1d').datetimepicker('update', app.global.nick_array.row_assegnazione.data_fine);  
                that.$("#nota").val($nota).html($nota);
             
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
                    form_data.append('action', $new_assegnazione?'add':"update");
                    form_data.append('type', 'assegna');
                    form_data.append('id_ass', $new_assegnazione?'':app.global.nick_array.row_assegnazione.id);
                    var $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                      //  "Content-Type": "application/json"
                    };

                    var $id_articolo=app.global.nick_array.row.id_articolo;
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
                                    message: "Assegnazione OK!",
                                    buttons: {
                                        main: {
                                            label: "OK",
                                            className: "btn btn-success",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                                that.$("#modal").modal('hide'); 
                                                that.bsa_assegnazioni_call(that,$id_articolo);
                                            }
                                        }
                                    }
                                });
                            }else{
                                console.log("ko");
                                bootbox.dialog({
                                    title: $add,
                                    message: "Assegnazione KO!",
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
                                    title: "Add Assegnazione",
                                    message: "Assegnazione KO!!",
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
        bsa_tab: function () {//anagrafica
            that=this;
            this.$('#tab1_').empty();
            this.$('#tab1_').load('./js/templates/it/app.templates.bsa_form.html', function() {
                that.bsa();
            }); 
        },
        so_tab: function () {
            this.$('#tab1_').empty();
            this.$('#tab2_').empty();
            this.$('#tab3_').empty();
            
            this.$('#tab2_').load('./js/templates/it//app.templates.asa_cd_anziani_so.html', function() {
                that.so();
            });  
            
        },
        
     
        ana_elementi_add: function () {
            
            app.global.nick_array.new_elementi=true;
            this.ana_elementi_edit(this);
        },
        so_add: function () {
            
            app.global.nick_array.new_so=true;
            this.so_edit(this);
        },
      
        ana_elementi_edit:function (that) {
            console.log(app.global.nick_array,that);
            $new_elementi=app.global.nick_array.new_elementi;
           $(".modal-body").empty();   
           $(".modal-body").append(        
               '<form id="modContratto" >'+
               '<div  class="form-group col-lg-12 alle">'+
                   '<div class="form-group col-lg-12">'+
                       '<label>Data  *</label>'+
                       '<div class="input-group date " id="datetimepicker6">'+

                           '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" />'+ 
                           '<span class="input-group-addon">'+  
                               '<span class="glyphicon glyphicon-calendar"></span>'+ 
                       '</span>'+
                       '</div>'+
                   '</div>'+
                   '<div class="form-group col-lg-12">'+
                       '<label  >Note *</label>'+
                       ' <textarea class="form-control" rows="20" name="note_elemento" id="note_elemento"></textarea>'+
                   '</div>'+
                  
               '</div>'+ 
               '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Add </button>'+
               '</form >'
           );
           $('#datetimepicker6').datetimepicker({ 
               format: "dd/mm/yyyy",
               autoclose: true,
               startView: 2,
               minView: 2,
               
               language: "it"
           }).show();
           $('#datetimepicker6').datetimepicker('setStartDate', '-2y');
           $('#datetimepicker6').datetimepicker('setEndDate', '+0d');
          
           $("#modContratto").validate(); //sets up the validator

          
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
           $("input[name=\"note_elemento").rules( "add", {
                required: true,
                //number: true,
                // minlength: 2,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
           var $add="";
            if( $new_elementi){
                $add="Add";
                app.global.nick_array.elementi_add="add";
                $("#btnAlle").val($add).html();
               
            }else{
                $add="Update";
                app.global.nick_array.elementi_add="update";
                $data=app.global.nick_array.row_elementi.data
                $note=app.global.nick_array.row_elementi.note
                $("#btnAlle").val($add).html();
                    
                    $("#dataTemp").val($data);
                    $("#note_elemento").val($note);
                   
                
             
            }
            $("#modal").modal('show');
           $('.modal-title').text($add+" Elemento significativo della storia dell'utente");
           //qui
         
           
           var self = this;
          
          
           $('#btnAlle').on("click",function(e) {
               if($("#modContratto").valid()){
                 
                   //--------------------------------------------------------------
                   var API_URL = app.global.json_url + 'asa/ci/';
                   console.log($add,app.global.nick_array,$new_elementi);
                   //var jsonObj = sendUrbans_formToJson(that);
                   var form_data = new FormData($('#modContratto')[0]); 
                   form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                   form_data.append('action', app.global.nick_array.elementi_add);
                   form_data.append('type', 'anagrafica_elemento');
                   form_data.append('id_anagrafica', app.global.nick_array.row.id);
                   form_data.append('sub_area', app.global.sub);
                   if( !$new_elementi){
                   form_data.append('id_anagrafica_ele', app.global.nick_array.row_elementi.id);
                   }
           
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
                   //app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                   self.ana_elementi_call();
               });
            
           });  

       },
       so_edit:function (that) {
        console.log(app.global.nick_array,that);
            $new_so=app.global.nick_array.new_so;
     that=this;
       $(".modal-body").empty();   
       $(".modal-body").append(        
           '<form id="modOs" >'+
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
                   '<label  >Tipo scheda</label>'+
                   '<select class="form-control" name="schede" id="schede"  ></select>'+
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
           format: "dd/mm/yyyy",
           autoclose: true,
           startView: 2,
           minView: 2,
           
           language: "it"
       }).show();
      
       $('#datetimepicker1').datetimepicker('setStartDate', '-2y');
       $('#datetimepicker1').datetimepicker('setEndDate', '+0d');
       $.each(app.global.nick_array.schede, function(i, value) {
        console.log(i,value);
       that.$('#schede').append('<option value="'+value+'">'+value+'</option>');
        
    });
  
       $("#modOs").validate(); //sets up the validator
       $("input[name=\"schede").rules( "add", {
        required: true,
        //number: true,
         minlength: 2,

        messages: {
            required: "Required input"
            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
            // number:"Inserire un numero!"
        }
    });
      
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
       $("input[name=\"data").rules( "add", {
           required: true,
           //number: true,
           // minlength: 2,

           messages: {
               required: "Required input"
               //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
               // number:"Inserire un numero!"
           }
       });
       var $add="";
       if( $new_so){
           $add="Add";
           app.global.nick_array.so_add="add";
           $("#btnAlle").val($add).html();
          
       }else{
           $add="Update";
           app.global.nick_array.so_add="update";
           $data=app.global.nick_array.row_so.data
           $note=app.global.nick_array.row_so.note
           $("#btnAlle").val($add).html();
               
               $("#dataTemp").val($data);
               $("#note_so").val($note);
              
           
        
       }
      
       $("#modal_os").modal('show');
       $('.modal-title').text($add+" scheda di osservazione");
       console.log("qui")
       //qui
      var self=this;
       $('#btnAlle').on("click",function(e) {
           if($("#modOs").valid()){
            console.log($add,app.global.nick_array,$new_so);
               //--------------------------------------------------------------
               var API_URL = app.global.json_url + 'asa/ci/';
               
               //var jsonObj = sendUrbans_formToJson(that);
               var form_data = new FormData($('#modOs')[0]); 
               form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
               form_data.append('action', 'add');
               form_data.append('type', 'so');
               form_data.append('sub_area', "asa_cd_anziani");
               form_data.append('id_ci', app.global.nick_array.row.id);//id anziano
               form_data.append('id_ser', app.global.nick_array.arr.id);
               if( !$new_so){
                form_data.append('id_so', app.global.nick_array.row_so.id);
                }
       
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
                       
                           $("#modal_os").modal('hide');
                          
                       }
                   }
               });
         
             
                
           }else{
               console.log("btnAlle invalid");  
           }
           $('#modal_os').on('hidden.bs.modal', function () {
            self.so();
           });
        
       });  

   },
        bsa: function () {
            $new=app.global.nick_array.new;
            
            console.log("bsa","new="+$new);
            
            if(typeof app.global.nick_array.newR !== 'undefined'){
                this.$(".toolbar").append(app.global.nick_array.newR);
               
            }
            
            if(!$new){//update

                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'

                $row=app.global.nick_array.row;

                console.log("update", $row);
                
                $('#stepx').empty() ;
                this.bsa_cat(this);
            }else{
                //se è nuovo disabilito  i due tab perchè ancora non ho l id da associare
                //$('#tab2').css('pointer-events', 'none');
                //$('#tab3').css('pointer-events', 'none');
                $('#stepx').empty() ;
                this.bsa_cat(this);
            }
        },
        bsa_allegati_call: function (that,$id) {//
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
                        that.bsa_allegati_table(that,$myData); 
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
                    console.error("bsa load table error!!!");
                }
            });
            
        },
        bsa_allegati_table: function (that,my) {//
            $table =  this.$("#table_all"); 
            this.$("#badge_all").html(my.data.length); 
            var actionFormatter=my.format;
            $format=my.format;
           console.log(my);
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
                                            that.bsa_allegati_call(that,row.id_bsa_articolo);
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
        bsa_fornitore_call: function (that,$row) {//
            $action="post";
            $url=app.global.json_url+'bsa/';

            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.id_fornitore = $row.id_fornitore;
            jsonObj.id_tipo_fornitore = $row.id_tipo_fornitore;
            jsonObj.type = "bsa_fornitore";
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
                        that.$("#fornitore").val($myData.data); 
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
                    console.error("bsa load table error!!!");
                }
            });
            
        },
        bsa_assegnazioni_call: function (that,$id) {//
            $action="post";
            $url=app.global.json_url+'bsa/';

            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.id = $id;
            jsonObj.type = "bsa_assegnazioni_id";
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
                        that.bsa_assegnazioni_table(that,$myData); 
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
                    console.error("bsa load table error!!!");
                }
            });
            
        },
        bsa_assegnazioni_table: function (that,my) {//
            $table =  this.$("#table_ass"); 
            this.$("#badge_ass").html(my.data.length); 
            var actionFormatter=my.format;
            $format=my.format;
           console.log(my);
           window.actionEvents1 = {
     
            'click .remove_ass': function (e, value, row,index) {
                console.log(row);
                if (confirm('Vuoi eliminare quest\'Assegnazione?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.id=row.id;
                    jsonObj.type="bsa_assegnazione";
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url: app.global.json_url + 'bsa/',
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
                                            that.bsa_assegnazioni_call(that,row.id_bsa_articolo);
                                        }
                                    }
                                }
                            });
                        }else{
                            console.log("ko");
                            bootbox.dialog({
                                title: "Remove Assegnazione",
                                message: "Remove Assegnazione KO!",
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
                                    title: "Remove Assegnazione",
                                    message: "Remove Assegnazione KO!!",
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
            'click .edit_ass': function (e, value, row,index) {
                console.log(row);
                
                app.global.nick_array.row_assegnazione=row;
               
                app.global.nick_array.new_assegnazione=false;
                that.ass_edit(that);

              
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
        bsa_cat: function (that) {//richiesta dati per popolare tabella

            $action="post";
            $url=app.global.json_url+'bsa/';
            var $selCat=that.$("#id_categoria");
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
                                $selCat.val(app.global.nick_array.row.id_categoria).change().attr('disabled',true);
                                $aaa='<input type="hidden" id="id_categoria" name="id_categoria" value="'+app.global.nick_array.row.id_categoria+'"/>';
                                $("#edit").append($aaa);
                                that.$("#etichetta_categoria").val(app.global.nick_array.row.etichetta);
                                that.bsa_sub_cat(that,app.global.nick_array.row.id_categoria);
                               //  $selCat.val(that.$arr.id).change()
                                }
                            $selCat.change(function (e) {
                                that.$("#step2").empty();
                                if(e.currentTarget.value!==""){
                                console.log(e);
                               
                                that.bsa_sub_cat(that,e.currentTarget.value);

                                }else{
                                    that.$("#id_sotto_categoria").empty();
                                   
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
                            var $ifcat=$myData.ifcat;
                            var $ifsubcat=$myData.ifsubcat;
                            $selSubCat.append('<option value="">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ 
                                console.log(app.global.nick_array);
                                $selSubCat.val(app.global.nick_array.row.id_sotto_categoria).change().attr('disabled',true);
                                $aaa='<input type="hidden" id="id_sotto_categoria" name="id_sotto_categoria" value="'+app.global.nick_array.row.id_sotto_categoria+'"/>';
                                $("#edit").append($aaa);
                                that.$("#etichetta_sotto_categoria").val(app.global.nick_array.row.etichetta);
                                scheda_out(app.global.nick_array.row.id_sotto_categoria);
                            }
                            $selSubCat.change(function (e) {
                                console.log(e);
                                if(e.currentTarget.value!==""){
                                    console.log(e,$ifcat,$ifsubcat,e.currentTarget.value);
                                    scheda_out(e.currentTarget.value);
                                    }else{
                                        that.$("#step2").empty();
                                    }
                            });
                            function scheda_out($id_sub){
                                var $tt="";
                               
                              console.log($ifcat,$ifsubcat,$id_sub);
                              // if($ifcat.includes(that.$("#id_categoria").val()) && ($ifsubcat.includes(that.$("#id_sotto_categoria").val()))){
                                if(1==1){
                           
                                    $tt=that.$("#id_sotto_categoria :selected").text();
                                    switch(app.global.nick_array.arr){
                                        case "bsa":
                                            var ob1 ;
                                            var ob = _.mapObject($myData.data, function(item) {
                                            //  console.log(item.id,e.target.value);
                                                if(item.id==$id_sub){
                                                console.log(item.id,$id_sub,item);
                                                ob1=item.campi_specifici;
                                                ob2=item.rma_categoria;
                                                }
                                            });
                                            app.global.nick_array.campi_specifici=ob1;
                                            if(ob2!=null && ob2!="0"){
                                                app.global.nick_array.id_rma_categoria=ob2; 
                                            }else{
                                                app.global.nick_array.id_rma_categoria=null;
                                            }
                                            app.global.nick_array.rma_categoria="";
                                            _.mapObject($myData.rma_categorie, function(item) {
                                                console.log(item.id,item.name,app.global.nick_array.id_rma_categoria);
                                                   if(item.id==app.global.nick_array.id_rma_categoria){
                                                  app.global.nick_array.rma_categoria=item.name;
                                                   }
                                               }); 
                                               if(app.global.nick_array.rma_categoria){
                                                $("#rma_categoria").val(app.global.nick_array.rma_categoria);
                                            }else{
                                                $("#rma_categoria").val("");
                                            }   
                                            if(!$new){
                                                that.$('#step2').empty().load('./js/templates/it/app.templates.bsa_anagrafica_edit.html', function() {
                                                    that.bsa_populate_form();
                                                });
                                             }else{
                                                that.$('#step2').empty().load('./js/templates/it/app.templates.bsa_anagrafica.html', function() {
                                                // that.$('#step11').empty()
                                                that.bsa_tipo_fornitori(that);
                                                
                                            }); 
                                        }
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
                    '<input type="'+value.type+'" class="form-control" id="'+value.name+'" name="'+value.name+'" > '+
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
                $("#note").val($row.note);
                this.bsa_fornitore_call(this,$row);
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
                       /*     $selSubCat.change(function (e) {
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
                            });*/
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
        ana_elementi_table: function (that,my) {//popola tabella con i dati ricevuti
            console.log("ana_elementi_table",my);
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents1 = {
     
                'click .remove': function (e, value, row,index) {
                    console.log("row="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="anagrafica_elementi";
                        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                                            
                                            }
                                        }
                                    }
                                });
                              
                                $table.bootstrapTable('refresh',  that.ana_elementi_call(that));
    
                            },
                            error: function () {
    
                                  console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .edit': function (e, value, row,index) {
                    console.log(row);
                    
                    app.global.nick_array.row_elementi=row;
                   
                    app.global.nick_array.new_elementi=false;
                    that.ana_elementi_edit(that);
    
                  
                }   
                
            };
             
           
            that.$(".toolbar").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
            $.each( my.data, function( key, value1 ){
          
                if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
                    value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
                    value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
                   
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
            $table= that.$('#table');        
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
        invio: function () {
            console.log("invio")
            $new=app.global.nick_array.new;
            $("#edit").validate(); //sets up the validator

          
            $("input[name=\"first_name").rules( "add", {
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
             $("input[name=\"codice_fiscale").rules( "add", {
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
                var form_data = new FormData($('#edit')[0]); 
                var API_URL = app.global.json_url + 'bsa/'; 
                form_data.append('type', 'bsa');
                form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
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
                                title: "Nuovo BSA",
                                message:  $mydata.message,
        
                                callback: function() {
                                    app.routers.bsaRouter.prototype.bsa_list();
                                }
                            });
                        }else{
        
                            bootbox.alert({ 
    
                                title: "Update BSA",
                                message:  $mydata.message,
            
                                callback: function() {
                                    app.routers.bsaRouter.prototype.bsa_list();
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
        so: function(){
            console.log("schede osservazione");
            $url=app.global.json_url+'asa/ci/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "so";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_ser = app.global.nick_array.arr.id;
                jsonObj.id_ci = app.global.nick_array.row.id;
            
            
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
                            app.global.nick_array.schede=$myData.schede;
                            that.so_table(that,$myData); 
                            
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
        },
        
        so_table: function (that,my) {//popola tabella con i dati ricevuti
              that=this;  
            $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                   
                    "username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };
                window.actionEvents_os = {
                    'click .download': function (e, value, row,index) {
                        //app.global.nick_array.id=row.id;
                        console.log(row)  ;  	
                       
                        jsonObj = {};
                        jsonObj.action = "download";
                        jsonObj.id=row.id;
                        jsonObj.type=row.tipo;
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
                                            
                        console.log(row);
                        
                        jsonObj = {};
                        jsonObj.action = "download";
                        jsonObj.id=row.id;
                        jsonObj.type=row.tipo;
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
                        console.log(row);
                        if (confirm('Are you sure to delete this item?')) {
                            jsonObj = {};
                            jsonObj.action = "delete";
                            jsonObj.id=row.id;
                        jsonObj.type=row.tipo;
                            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                                       
                                    }
                                }
                            }
                        });
                                  
                                    $table.bootstrapTable('refresh',  that.so());
        
                                },
                                error: function () {
        
                                      console.log("Delete item error!");
                                }
                            });
        
                        }
                    }//remove    
                    
                };
                 
                that.$(".toolbar").empty(); 
                $format=my.format;
                if(typeof my.newR !== 'undefined'){
                    that.$(".toolbar").append(my.newR);
                }
              $.each  ( my.data, function( key, value1 ){
                   
                    if(typeof(value1["data_doc"]) !== "undefined" && value1["data_doc"] !== null){    
                        value1["data_docT"]='<span>'+moment(value1["data_doc"]).format('YYYYMMDD')+'</span>'+moment(value1["data_doc"]).format('DD/MM/YYYY');
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
        
                        value1["events"]=actionEvents_os;
                    }
        
                }); 
                $table= that.$("#table_so");            
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
                }; 
              $('.os').on("click",function(e) {
                    console.log("add")
                    that.so_add();
                } );
                   
            },    
        
        
        pi: function (that,my) {//preparo i punti di aggancio
         
            $('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            
          
           
            $('#id_anagrafica').val(app.global.nick_array.row.id);
            $('#data_inserimento').val(app.global.nick_array.row.data_inserimento);
            $('#data_dimissioni').val(app.global.nick_array.row.data_dimissioni);
           console.log(app.global.nick_array.row.data_inserimento,app.global.nick_array.row.data_dimissioni)
            if(typeof my.newR_equipe !== 'undefined'){
                this.$(".toolbar_equipe").append(my.newR_equipe);
               
            }
            if(typeof my.newR_obiettivo !== 'undefined'){
                this.$(".toolbar_obiettivo").append(my.newR_obiettivo);
               
            }
            $('#tipo_progetto').empty();
            $.each(my.tipo_progetto, function(i, value) {
                console.log(i,value);
                $('#tipo_progetto').append('<option value="'+value+'">'+value+'</option>');
                
            });
            $.each(my.data,function(key,value){
                if(key==="id"){
                    $("#id_pi").val(value); 
                }else{
                    $("#"+key).val(value);
                }
                if(typeof my.data.data_apertura  !== "undefined" && my.data.data_apertura !== null  ){    
                    console.log(my.data.data_apertura,moment(my.data.data_apertura).format('DD/MM/YYYY'));
                     $('#data_apertura').val(moment(my.data.data_apertura).format('DD/MM/YYYY')); 
                 }
                if(typeof my.data.data_dimissioni  !== "undefined" && my.data.data_dimissioni !== null  ){    
                    console.log(my.data.data_dimissioni,moment(my.data.data_dimissioni).format('DD/MM/YYYY'));
                    $('#data_dimissioni').val(moment(my.data.data_dimissioni).format('DD/MM/YYYY')); 
                }
              
                
               
            }) 
            that.pi_equipe_call();
            that.pi_obiettivo_call() 
            $("#pi_invio").prop( "disabled", false );  
            },
        pi_call: function(){
            console.log("progetto individuale", app.global.nick_array);
            
            
            
            $url=app.global.json_url+'asa/ci/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "progetto";
                jsonObj.id_anagrafica = app.global.nick_array.row.id;
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
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
                            app.global.nick_array.schede=$myData.schede;
                            
                            that.pi(that,$myData); 
                            
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
        }, 
        pi_equipe_add: function () {
            
            app.global.nick_array.new_equipe=true;
            app.global.nick_array.row_equipe=[];
            this.pi_equipe_edit(this);
        },
        pi_equipe_call: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'asa/ci/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "pi_equipe";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_anagrafica = app.global.nick_array.row.id;
            
            
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
                            that.pi_equipe_table(that,$myData); 
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
                        console.error("asa element load table error!!!");
                    }
                });
            }, 
          
        pi_equipe_edit:function (that) {
                var $add="";
                row=app.global.nick_array.row_equipe
    
                console.log(app.global.nick_array,that);
                $new_equipe=app.global.nick_array.new_equipe;
                if( $new_equipe){$add="Add";}else{ $add="Update";}
               $(".modal-body").empty();   
               $(".modal-body").append(        
                   '<form id="mod_equipe" >'+
                   '<input type="hidden" class="form-control" name="id" id="id"  value='+(row?row.id?row.id:'':'')+' >'+
                   '<div  class="form-group col-lg-12 alle">'+
                        '<div class="form-group col-lg-12">'+
                           '<label  >Funzione</label>'+
                           ' <input  type="text" class="form-control"  name="funzione" id="funzione" value="'+(row?row.id?row.funzione:'':'')+'"/>'+
                        '</div>'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Nome</label>'+
                            '<input  type="text" class="form-control"  name="nome" id="nome" value="'+(row?row.id?row.nome:'':'')+'"/>'+
                        '</div>'+
                        '<div class="form-group col-lg-4">'+
                        '<label >Referente <input class="form-control " id="referente" name="referente" type="checkbox" '+(row?row.id?row.referente==='X'?'checked':'':'':'')+'></label>'+
                           
                        '</div>'+
                       
                      
                   '</div>'+ 
                   '<button type="button" id="btnAllex" name="btnAllex" class="btn btn-primary submit ">'+$add+' </button>'+
                   '</form >'
               );
             
              
               $("#mod_equipe").validate(); //sets up the validator
    
              
               
               $("input[name=\"funzione").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,
    
                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                $("input[name=\"nome").rules( "add", {
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
               $('.modal-title').text($add+" specialista all'equipe");
               //qui
               var self = this;
               if( $new_equipe){
                    
                app.global.nick_array.equipe_add="add";
                $("#mod_equipe")[0].reset();
               
            }else{
               
                app.global.nick_array.equipe_add="update";
                $funzione=app.global.nick_array.row_equipe.funzione
                $nome=app.global.nick_array.row_equipe.nome
                $referente=app.global.nick_array.row_equipe.referente
               
             
            }
               
              
              
              
               $('#btnAllex').on("click",function(e) {
                   if($("#mod_equipe").valid()){
                     
                       //--------------------------------------------------------------
                       var API_URL = app.global.json_url + 'asa/ci/';
                       console.log($add,app.global.nick_array,$new_equipe);
                       //var jsonObj = sendUrbans_formToJson(that);
                       var form_data = new FormData($('#mod_equipe')[0]); 
                       form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                       form_data.append('action', app.global.nick_array.equipe_add);
                       form_data.append('type', 'pi_equipe');
                       form_data.append('id_anagrafica', app.global.nick_array.row.id);
                       form_data.append('sub_area', app.global.sub);
                       if( !$new_equipe){
                       form_data.append('id_pi_equipe', app.global.nick_array.row_equipe.id);
                       }
               
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
                       //app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                       self.pi_equipe_call();
                   });
                
               });  
    
           },
        pi_equipe_table: function (that,my) {//popola tabella con i dati ricevuti
        console.log("pi_equipe_table",my);
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents1 = {
    
                'click .remove': function (e, value, row,index) {
                    console.log("row="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="pi_equipe";
                        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                                            
                                            }
                                        }
                                    }
                                });
                                
                                $table.bootstrapTable('refresh',  that.pi_equipe_call(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .edit': function (e, value, row,index) {
                    console.log(row);
                    
                    app.global.nick_array.row_equipe=row;
                    
                    app.global.nick_array.new_equipe=false;
                    that.pi_equipe_edit(that);
    
                    
                }   
                
            };
            
            
            that.$(".toolbar_equipe").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
            
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
            $table= that.$('#table_equipe');        
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
        pi_obiettivo_add: function () {
            
            app.global.nick_array.new_obiettivo=true;
            app.global.nick_array.row_obiettivo=[];
            this.pi_obiettivo_edit(this);
        },
        pi_obiettivo_call: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'asa/ci/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "pi_obiettivo";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_anagrafica = app.global.nick_array.row.id;
            
            
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
                            that.pi_obiettivo_table(that,$myData); 
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
                        console.error("asa element load table error!!!");
                    }
                });
            }, 
          
        pi_obiettivo_edit:function (that) {
                var $add="";
                row=app.global.nick_array.row_obiettivo
               
                if(row){
                    row.data_inizio1=moment(row.data_inizio).format('DD/MM/YYYY');
                }
                console.log(app.global.nick_array,that);
                $new_obiettivo=app.global.nick_array.new_obiettivo;
                if( $new_obiettivo){$add="Add";}else{ $add="Update";}
               
               $(".modal-body").empty();   
               $(".modal-body").append(        
                   '<form id="mod_obiettivo" >'+
                   '<input type="hidden" class="form-control" name="id" id="id"  value="'+(row?row.id?row.id:'':'')+'" >'+
                  
                        '<div class="form-group col-lg-6">'+
                           '<label  >Obiettivo N°</label>'+
                           ' <input  type="number" class="form-control"  name="numero" id="numero" value="'+(row?row.id?row.numero:'':'')+'"/>'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  >Data inizio </label>'+
                            '<div class="input-group date " id="datetimepicker3">'+
                                '<input type="text" class="form-control "  id="data_inizio" name="data_inizio" value="'+(row?row.id?row.data_inizio:'':'')+'"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        
                        '<div class="form-group col-lg-6">'+
                        '<label  >Durata</label>'+
                        
                        '<input  type="text" class="form-control"  name="durata" id="durata" value="'+(row?row.id?row.durata:'':'')+'"/>'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  >Frequenza verifica</label>'+
                            '<input  type="text" class="form-control"  name="frequenza" id="frequenza" value="'+(row?row.id?row.frequenza:'':'')+'"/>'+
                        '</div>'+
                        '<div class="form-group col-lg-12">'+
                        '<label  >Descrizione Obiettivo</label>'+
                        '<textarea class="form-control"  name="descrizione" id="descrizione" rows="6" ></textarea>'+
                    '</div>'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Azione 1</label>'+
                            '<textarea class="form-control"  name="azione1" id="azione1" rows="3" ></textarea>'+
                        '</div>'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Azione 2</label>'+
                            '<textarea class="form-control"   name="azione2" id="azione2"  rows="3" ></textarea>'+
                        '</div>'+
                       
                        '<div class="form-group col-lg-12">'+
                        
                            '<p class="toolbar_verifica"><span class="alert"></span></p>'+
                            '<br><br><div id="plus"></div>'+
                            '<table id="table_verifica" class="table-striped def"></table>'+
                           
                            
                        '</div>'+
                        
                      
                   '</div>'+ 
                   '<button type="button" id="btnAllex" name="btnAllex" class="btn btn-primary submit ">'+$add+' </button>'+
                   '</form >'
               );
               $('#datetimepicker3').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();
            $('#datetimepicker3').datetimepicker('setStartDate', '-2y');
            $('#datetimepicker3').datetimepicker('setEndDate', '+0d');
              
               $("#mod_obiettivo").validate(); //sets up the validator
    
              
               
               $("input[name=\"numero").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,
    
                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                $("input[name=\"data_verifica").rules( "add", {
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
               $('.modal-title').text($add+" Obiettivo");
               //qui
             
               var self = this;
               if( $new_obiettivo){
                 console.log($new_obiettivo) ;  
                app.global.nick_array.obiettivo_add="add";
              
  
               
            }else{
               
                app.global.nick_array.obiettivo_add="update";
                
                 $("#azione1").val(row.azione1);
                 $("#azione2").val(row.azione2);
                 $("#descrizione").val(row.descrizione);
                 that.pi_obiettivo_verifica_call();
             
            }
              
              
              
              
               $('#btnAllex').on("click",function(e) {
                   if($("#mod_obiettivo").valid()){
                     
                       //--------------------------------------------------------------
                       var API_URL = app.global.json_url + 'asa/ci/';
                   
                       var form_data = new FormData($('#mod_obiettivo')[0]); 
                       form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                       form_data.append('action', app.global.nick_array.obiettivo_add);
                       form_data.append('type', 'pi_obiettivo');
                       form_data.append('id_anagrafica', app.global.nick_array.row.id);
                       form_data.append('sub_area', app.global.sub);
                      
                       if( !$new_obiettivo){
                       form_data.append('id_pi_obiettivo', app.global.nick_array.row_obiettivo.id);
                       }
               
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
                       //app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                       self.pi_obiettivo_call();
                   });
                
               });  
    
           },
        pi_obiettivo_table: function (that,my) {//popola tabella con i dati ricevuti
        console.log("pi_obiettivo_table",my);
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents2 = {
    
                'click .remove': function (e, value, row,index) {
                    console.log("row="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="pi_obiettivo";
                        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                                            
                                            }
                                        }
                                    }
                                });
                                
                                $table.bootstrapTable('refresh',  that.pi_obiettivo_call(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .edit': function (e, value, row,index) {
                    console.log(row);
                    
                    app.global.nick_array.row_obiettivo=row;
                    
                    app.global.nick_array.new_obiettivo=false;
                    that.pi_obiettivo_edit(that);
    
                    
                }   
                
            };
            
            
            that.$(".toolbar_obiettivo").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
           
            $.each  ( my.data, function( key, value1 ){
                   
                if(typeof(value1["data_inizio"]) !== "undefined" && value1["data_doc"] !== null){    
                    value1["data_inizioT"]='<span>'+moment(value1["data_inizio"]).format('YYYYMMDD')+'</span>'+moment(value1["data_inizio"]).format('DD/MM/YYYY');
                    value1["data_inizio"]=moment(value1["data_inizio"]).format('DD/MM/YYYY');
                   
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
    
                    value1["events"]=actionEvents2;
                }
    
            });   
            $table= that.$('#table_obiettivo');        
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
        pi_obiettivo_verifica_add: function () {
            $(".verifica").prop( "disabled", true );
            app.global.nick_array.new_verifica=true;
            app.global.nick_array.row_verifica=[];
           
            this.pi_obiettivo_verifica_edit(this);
        },
        pi_obiettivo_verifica_call: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'asa/ci/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.nick_array); 
                
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "pi_verifica";
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                if( !app.global.nick_array.new_obiettivo){
                    jsonObj.id_obiettivo = app.global.nick_array.row_obiettivo.id;
                    }
                
            
            
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
                            that.pi_obiettivo_verifica_table(that,$myData); 
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
                        console.error("asa element load table error!!!");
                    }
                });
            }, 
          
        pi_obiettivo_verifica_edit:function (that) {
                var $add="";
                row=app.global.nick_array.row_verifica
               
                console.log(app.global.nick_array,that);
                $new_verifica=app.global.nick_array.new_verifica;
                if( $new_verifica){$add="Salva";}else{ $add="Update";}
              //  $(".modal-body veri").empty();   
             //   $(".modal-body veri").append(  
                $("#plus").empty();   
                 $("#plus").append(  
                    '<div class="panel panel-default" id="p">'+
                    '<div class="panel-heading" >'+
                       // '<h4 class="panel-title"><label >Obiettivo Verifica '+verifica_item+'</label></h4>'+
                        '<h4 class="panel-title"><label >Obiettivo Verifica </label></h4>'+
                    '</div>'+
                   '<div class="panel-body">'+       
                 // '<form id="mod_verifica" >'+
                   '<input type="hidden" class="form-control" name="id_verifica" id="id_verifica"   >'+
                  
                        '<div class="form-group col-lg-6">'+
                            '<label  >Data verifica </label>'+
                            '<div class="input-group date " id="datetimepicker4">'+
                                '<input type="text" class="form-control "  id="data_verifica" name="data_verifica" />'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+
                       
                       '<div class="form-group col-sm-4">'+
                            '<label >Obiettivo:</label>'+
                            '<div class="input-group">'+
                            
                                '<span class="input-group-addon "><input type="radio" value="aperto" name="obiettivo" id="obiettivo1" aria-label="...">  Aperto </span>'+
                                '<span class="input-group-addon "><input type="radio" value="chiuso" name="obiettivo" id="obiettivo2" aria-label="...">  Chiuso </span>'+
                            
                            '</div>'+
                        
                        '</div>'+
                        
                        '<div class="form-group col-lg-12">'+
                            '<label  >Descrizione verifica</label>'+
                            '<textarea class="form-control"  name="descrizione_verifica" id="descrizione_verifica" rows="3" ></textarea>'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<button type="button"  class="btn btn-default  save"> '+$add+' Verifica</button>'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<button type="button"  class="btn btn-danger  remove"><i class="glyphicon glyphicon-remove-circle"></i> Annulla </button>'+
                        '</div>'+
                      
                       
                      
                   '</div>'+ 
               //    '<button type="button" id="btnAllex" name="btnAllex" class="btn btn-primary submit ">'+$add+' </button>'+
              //  '</form >'+
                   '</div>'+ 
                   '</div>'
               );
               $('#datetimepicker4').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                
                language: "it"
            }).show();
            $('#datetimepicker4').datetimepicker('setStartDate', '-2y');
            $('#datetimepicker4').datetimepicker('setEndDate', '+0d');
              
             
               var self = this;
               $('.remove').on("click",function(e) {
                $("#p").remove();
                $(".verifica").prop( "disabled", false );
            });
            if( $new_verifica){
                    
                app.global.nick_array.verifica_add="add";
              
               
            }else{
               
                app.global.nick_array.verifica_add="update";
                if(row.obiettivo==="aperto"){
                    $("#obiettivo1").attr("checked", "checked");
                }
                else  if(row.obiettivo==="chiuso"){
                    $("#obiettivo2").attr("checked", "checked");
                }
                $("#descrizione_verifica").val(row.descrizione);
                $("#id_verifica").val(row.id);
                $("#data_verifica").val(row.data_verifica);
             
            }        
              
              
          //  $('#btnAllex').on("click",function(e) {
               $('.save').on("click",function(e) {
                 // if($("#mod_verifica").valid()){
                     
                       //--------------------------------------------------------------
                       var API_URL = app.global.json_url + 'asa/ci/';
                       console.log($add,app.global.nick_array,$new_verifica);
                       //var jsonObj = sendUrbans_formToJson(that);
                       var form_data = new FormData($('#mod_obiettivo')[0]); 
                       form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                       form_data.append('action', app.global.nick_array.verifica_add);
                       form_data.append('type', 'pi_verifica');
                       
                       form_data.append('id_obiettivo', app.global.nick_array.row_obiettivo.id);
                       form_data.append('sub_area', app.global.sub);
                       if( !$new_verifica){
                       form_data.append('id_pi_verifica', app.global.nick_array.row_verifica.id);
                       }
               
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
                              
                               $mydata =JSON.parse(datap);
                           
                               //-------------------------------------------------------
                               if ($mydata.success){
                               // app.routers.router.prototype.data_type_edit();
                                   console.log("ok");
                               
                                   $("#modal").modal('hide');
                                  
                               }
                           }
                       });
                 
                     
                        
                   
                   $('#modal').on('hidden.bs.modal', function () {
                       //app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                       self.pi_obiettivo_verifica_call();
                       self.pi_obiettivo_call();
                   });
                //  }
               });  
    
           },
        pi_obiettivo_verifica_table: function (that,my) {//popola tabella con i dati ricevuti
        console.log("pi_obiettivo_verifica_table",my);
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents3 = {
    
                'click .remove': function (e, value, row,index) {
                    console.log("row="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="pi_verifica";
                        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                              
                                
                                $table.bootstrapTable('refresh',  that.pi_obiettivo_verifica_call(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .edit': function (e, value, row,index) {
                    console.log(row);
                    
                    app.global.nick_array.row_verifica=row;
                    
                    app.global.nick_array.new_verifica=false;
                    that.pi_obiettivo_verifica_edit(that);
    
                    
                }   
                
            };
            
            
            that.$(".toolbar_verifica").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
           
            $.each  ( my.data, function( key, value1 ){
                   
                if(typeof(value1["data_verifica"]) !== "undefined" && value1["data_verifica"] !== null){    
                    value1["data_verificaT"]='<span>'+moment(value1["data_verifica"]).format('YYYYMMDD')+'</span>'+moment(value1["data_verifica"]).format('DD/MM/YYYY');
                    value1["data_verifica"]=moment(value1["data_verifica"]).format('DD/MM/YYYY');
                   
                }
                $("plus").append(value1["data_verifica"]);
            });
            
            $.each( my.tab, function( key, value1 ){


                if(value1["cellStyle"]=="cellStyle"){
    
                    value1["cellStyle"]=cellStyle;
                }
                
                    if(value1["formatter"]=="actionFormatter"){
    
                    value1["formatter"]=actionFormatter;
                }
                if(value1["events"]=="actionEvents"){
    
                    value1["events"]=actionEvents3;
                }
    
            });   
            $table= that.$('#table_verifica');        
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
        pi_tab: function () {
            this.$('#tab1_').empty();
            this.$('#tab2_').empty();
            this.$('#tab3_').empty();
          
            this.$('#tab3_').load('./js/templates/it//app.templates.asa_cd_anziani_pi.html', function() {
                that.pi_call();
            });  
            
        }, 
        pi_invio: function () {
            console.log("pi_invio")
            $new=app.global.nick_array.new;
            $("#editprogetto").validate(); //sets up the validator

          
            $("input[name=\"data_apertura").rules( "add", {
                required: true,
                //number: true,
                // minlength: 2,
 
                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
           
           
          
            if($("#editprogetto").valid()){
                $("#pi_invio").prop( "disabled", true );
            var form_data = new FormData($('#editprogetto')[0]); 
            var API_URL = app.global.json_url + 'asa/ci/'; 
            form_data.append('type', 'pi');
            form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
            if($("#id_pi").val()!==""){
                form_data.append('action', 'update');
            }else{
                form_data.append('action', 'add');
            }
            

    var formDataObj = Object.fromEntries(form_data.entries());
    console.log(formDataObj);
        that=this;
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
    
                            title: "Progetto Individuale",
                            message:  $mydata.message,
    
                            callback: function() {
                           // app.routers.asaRouter.prototype.asa_cd_anziani_list();
                           that.pi_call();
                        }
                        });
                        }else{
    
                            bootbox.alert({ 
    
                            title: "Progetto Individuale",
                            message:  $mydata.message,
    
                            callback: function() {
                           // app.routers.asaRouter.prototype.asa_cd_anziani_list();
                           that.pi_call();
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
        render: function () {     
            $(this.el).html(this.template()); 
            console.log( app.global.nick_array);
            //-----------breadcrumb-------------------------------------------------------
            while (app.global.breadcrumb.length>2) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //----------------------------------------------------------------------------
                var that=this; 
            //--------bsa_tab default anagrafica------------------------------------------
                this.bsa_tab(that);
              
  
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.bsa_editView=null
    }
});
return app.views.bsa_edit;
});