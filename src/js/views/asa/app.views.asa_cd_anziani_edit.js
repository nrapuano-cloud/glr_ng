require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.asa_cd_anziani_edit = Backbone.View.extend({
        initialize: function () {
            console.log("initializing asa_cd_anziani_edit: ");
      
        },
     
        events: {
            "click #expPDF_pi":"expPDF_pi",//piano individuale
            "click #expPDF_ana":"expPDF_ana",//anagrafica
            "click #btn_agg":"set_data",
            "click #tab1":"ana_tab",
            "click #tab2":"so_tab",
            "click #tab3":"pi_tab",
            "click #invio":"invio",
            "click #pi_invio":"pi_invio",
            "click .contr-Plus":"ana_elementi_add",
            "click .equipe":"pi_equipe_add",
            "click .obiettivo":"pi_obiettivo_add",
            "click .verifica":"pi_obiettivo_verifica_add",
          //  "click .so":"addRow_so",
        },
        expPDF_ana: function () {//anagrafica
            console.log("expPDF_ana");
            $action="post";
            $url=app.global.json_url+'asa/protocolli/';

           that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.sub_tipo = 'ana';
                jsonObj.tipo= "pdf";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
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
                            $filex=$myData.file;
                            window.open($filex,'_blank');
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
                                             // app.routers.router.prototype.logout();
                                        }
                                    }
                                }
                            });
                        }
                    },
                    error: function () {
                        console.error("asa download error!!!");
                    }
                });
        },
        expPDF_pi: function () {//anagrafica
            console.log("expPDF_pi");
        },
        set_data: function () {//anagrafica
        console.log("set")
        console.log(app.global.nick_array,that);
           
           $(".modal-body").empty();   
           $(".modal-body").append(        
               '<form id="modData" >'+
               '<div  class="form-group col-lg-12 alle">'+
                   '<div class="form-group col-lg-12">'+
                       '<label>Data  aggiornamento</label>'+
                       '<div class="input-group date " id="datetimepicker6">'+

                           '<input type="text" class="form-control "  id="dataAggiornamento" name="dataAggiornamento" />'+ 
                           '<span class="input-group-addon">'+  
                               '<span class="glyphicon glyphicon-calendar"></span>'+ 
                       '</span>'+
                       '</div>'+
                   '</div>'+
                   
                  
               '</div>'+ 
               '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Set Data </button>'+
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
          
           
           
          
            $("#modal").modal('show');
           $('.modal-title').text("Set Data aggiornamento");
           $('#dataAggiornamento').val(app.global.nick_array.row.data_aggiornamento);
           //qui
           $("#modData").validate(); //sets up the validator

          
           $("input[name='dataAggiornamento']").rules( "add", {
               required: true,
               //number: true,
               // minlength: 2,

               messages: {
                   required: "Required input"
                   //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                   // number:"Inserire un numero!"
               }
           });
           
           var self = this;
          
          
           $('#btnAlle').on("click",function(e) {
               if($("#modData").valid()){
                 
                   //--------------------------------------------------------------
                   var API_URL = app.global.json_url + 'asa/ci/';
                   var form_data = new FormData($('#modData')[0]); 
                   form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                   form_data.append('action', 'update');
                   form_data.append('type', 'anagrafica_data_aggiornamento');
                   form_data.append('id_anagrafica', app.global.nick_array.row.id);
                   
                              
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
                               app.global.nick_array.row.data_aggiornamento=$('#dataAggiornamento').val()
                               $('#data_aggiornamento').val($('#dataAggiornamento').val());
                               $("#modal").modal('hide');
                              
                           }
                       }
                   });
             
                 
                    
               }else{
                   console.log("btnAlle invalid");  
               }
               $('#modal').on('hidden.bs.modal', function () {
                   //app.routers.asaRouter.prototype.asa_cd_anziani_pda();
                  
               });
            
           });  
        },
        ana_tab: function () {//anagrafica
            that=this;
            this.$('#tab1_').empty();
            this.$('#tab2_').empty();
            this.$('#tab3_').empty();
            this.$('#tab1_').load('./js/templates/it//app.templates.asa_cd_anziani_anagrafica.html', function() {
                that.ana();
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
        ana: function () {
            $new=app.global.nick_array.new;
            
            console.log("anagrafica","new="+$new);
            $('#id_servizio').val($id_servizio=app.global.nick_array.arr.id);
            $('#servizio').val(he.decode(app.global.nick_array.arr.servizio));
            $('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            $('#datetimepicker1a').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            $('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            $('#datetimepicker3').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-120y',
                endDate: '+0d'
            }).show();
            $('#datetimepicker4').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            $('#datetimepicker5').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                startDate:'-2y',
                endDate: '+0d'
            }).show();
            if(typeof app.global.nick_array.newR !== 'undefined'){
                this.$(".toolbar").append(app.global.nick_array.newR);
               
            }
           
            if(!$new){//update
                $re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;//regular expression for date 'DD/MM/YYYY'

                $row=app.global.nick_array.row;
                console.log("update", $row);
                $.each( $row, function( key, value1 ){
                    console.log(key,value1);
                        if(key==="data_aggiornamento" && (value1 !== "undefined" && value1 !== null && !value1.match($re)) ){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        if(key==="data_inserimento" && (value1 !== "undefined" && value1 !== null && value1 !== "" && !value1.match($re))){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        if(key==="data_dimissioni" && (value1 !== "undefined" && value1 !== null && value1 !== "" && !value1.match($re))){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        if(key==="data_invalidita" && (value1 !== "undefined" && value1 !== null && value1 !== "" && !value1.match($re))){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        if(key==="data_nascita" && (value1 !== "undefined" && value1 !== null && value1 !== "" && !value1.match($re))){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        if(key==="pro_data" && (value1 !== "undefined" && value1 !== null && value1 !== "" && !value1.match($re))){    
                            $row[key]=moment(value1).format('DD/MM/YYYY');
                            
                        }
                        
                  
                    if(key==="interdizione" && value1==="SI"){
                        $("#"+key+"1").attr("checked", "checked");
                    }
                    else  if(key==="interdizione" && value1==="NO"){
                        $("#"+key+"2").attr("checked", "checked");
                    }
                    if(key==="invalidita" && value1==="SI"){
                        $("#"+key+"1").attr("checked", "checked");
                    }
                    else  if(key==="invalidita" && value1==="NO"){
                        $("#"+key+"2").attr("checked", "checked");
                    }
                    if(key==="inf_fumatore" && value1==="SI"){
                        $("#"+key+"1").attr("checked", "checked");
                    }
                    else  if(key==="inf_fumatore" && value1==="NO"){
                        $("#"+key+"2").attr("checked", "checked");
                    }
                    if(key==="sesso" && value1==="Maschio"){
                        $("#"+key+"1").attr("checked", "checked");
                    }
                    else  if(key==="sesso" && value1==="Femmina"){
                        $("#"+key+"2").attr("checked", "checked");
                    }
                });  
                $.each($row,function(key,value){
                    $("#"+key).val(value);
                   
                }) 
                $('#tab2').css('pointer-events', 'auto');
                $('#tab3').css('pointer-events', 'auto');
                
                //$("#invalidita_percentuale").val($row.invalidita_percentuale);
                that.ana_elementi_call(that);//chiamata per popolare la tabella elementi
            }else{
                //se è nuovo disabilito  i due tab perchè ancora non ho l id da associare
                $('#tab2').css('pointer-events', 'none');
                $('#tab3').css('pointer-events', 'none');
            }
        },
        ana_elementi_call: function (that) {//richiesta dati per popolare tabella
            $action="post";
            $url=app.global.json_url+'asa/ci/';

           that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "get";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "anagrafica_elementi";
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
                            that.ana_elementi_table(that,$myData); 
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
            if(typeof my.set_data !== 'undefined'){
                
                this.$("#data_agg").empty().append(my.set_data);
                
                $("#data_aggiornamento").val(app.global.nick_array.row.data_aggiornamento);
                $('#datetimepicker6x').datetimepicker({ 
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    language: "it",
                    startDate:'-2y',
                    endDate: '+0d'
                }).show();
                
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
            var API_URL = app.global.json_url + 'asa/ci/'; 
            form_data.append('type', 'anagrafica');
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
    
                            title: "Nuovo Utente",
                            message:  $mydata.message,
    
                            callback: function() {
                            app.routers.asaRouter.prototype.asa_cd_anziani_list();
                        }
                        });
                        }else{
    
                            bootbox.alert({ 
    
                            title: "Update Utente",
                            message:  $mydata.message,
    
                            callback: function() {
                            app.routers.asaRouter.prototype.asa_cd_anziani_list();
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
            while (app.global.breadcrumb.length>4) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //----------------------------------------------------------------------------
                var that=this; 
            //--------ana_tab default anagrafica---------------------------------------------
                this.ana_tab(that);
              
  
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.asa_cd_anziani_editView=null
    }
});
return app.views.asa_cd_anziani_edit;
});