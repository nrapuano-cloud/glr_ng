require(['app','he','bootbox'], function(app,he,bootbox){
app.views.data_type_editType = Backbone.View.extend({

    /** init view **/
    initialize: function() {
        console.log('initializing data_type_editType');
    },

    /** submit event for registration **/
    events: {
        'submit':                           'registration',
        'click #btnRegistrationHome':       'registration_home'
    },
     
    registration_home: function() {
        app.routers.adminTecRouter.prototype.index();
    },

    /** render template--------------------------------------------------- **/
    render: function() {
        $(this.el).html(this.template());

        console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>2){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        var isNew = app.global.nick_array.isNew ; //se app.global.nick_array.hr="New" isNew è true
        console.log("isnew="+isNew);
        var API_URL = app.global.json_url + 'types/';
        var $iTel=0,$iEmail=0,$iReferente=0;//indice per contare quante mail o telefoni o referenti_ditte 
        var $folder,$id,$group="";
        var $active=false;
        var $tipo_prodotto=false;
        var $role,$action,$type,$uid;
        $alert = this.$('.alert').hide();
        $alert1 = this.$('.alert1').hide();
        
        var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        var jsonObj = {};
        var $row = {};
       
        $role = app.global.tokensCollection.first().get("nvbr");
        
        $action = "list";
        $type = "role";   
        
        var $aa;
    
        //---------------------------------------------------------------------------------------
        if( !isNew){
            $uid = app.global.nick_array.data.id;
            console.log("!isNew="+isNew+ $uid);
        }else{
            console.log("!isNewElse="+isNew);
            
        }
        //------------------------------------------------------------------------------------------
        var isOnline = window.navigator.onLine;
                if (isOnline) {
                 console.log('online');
                    } else {
                    console.log('offline');
            }
        //------------------------------------------------------------------------------------  
        setForm(this,app.global.nick_array.data);
        //------------------------------------------------------------------------------------          
        function setForm(that,$row){
            //-------------------------------------------------------------------------------------
            console.log("arr="+app.global.nick_array.arr);
            switch(app.global.nick_array.arr) {
                case "DEPARTMENTS":{
                       
                    console.log("arr="+app.global.nick_array.arr);
                    that.$("#tipi").empty();

                    // that.$("#tipi").append(
                    varForm=  
                    '<div id="exTab3" >'+
                        '<ul class="nav nav-tabs" id="tabX">'+
                            '<li class="active" ><a href="#generali" id="generale" role="tab" data-toggle="tab">Generali</a></li>'+
                            '<li><a href="#urbanistici" id="urbanistico" role="tab" data-toggle="tab">Dati Urbanistici</a></li>'+
                            '<li><a href="#impianti" id="impianto" data-toggle="tab">Certificazione Impianti</a></li>'+
                            '<li><a href="#contratti" id="contratto"  role="tab" data-toggle="tab">Contratti</a></li>'+
                            '<li><a href="#attrezzatures" id="attrezzature" data-toggle="tab">Attrezzature ed Impianti</a></li>'+
                            '<li><a href="#antincendi" id="antincendio" data-toggle="tab">Dispositivi Antincendio</a></li>'+
                            '<li><a href="#planimetrie" id="planimetria" data-toggle="tab">Planimetrie</a></li>'+
                            '<li><a href="#utenze" id="utenza" data-toggle="tab">Utenze</a></li>'+
                        '</ul>'+
                        '<div class="tab-content">'+
                            '<div class="tab-pane active" id="generali" name="generali">'+

                            '</div>'+

                            '<div class="tab-pane " id="urbanistici" name="urbanistici">'+

                            '</div>'+

                            '<div class="tab-pane" id="impianti" name="impianti">'+
                                '<h3>Certificazione Impianti</h3>'+
                            '</div>'+
                            '<div class="tab-pane" id="contratti" name="contratti">'+
                                '<h3>Contratti</h3>'+
                            '</div>'+
                            '<div class="tab-pane" id="attrezzatures" name="attrezzatures">'+
                                '<h3>Attrezzature ed Impianti</h3>'+
                            '</div>'+
                            '<div class="tab-pane" id="antincendi" name="antincendi">'+
                                '<h3>Dispositivi Antincendio</h3>'+
                            '</div>'+
                            '<div class="tab-pane" id="planimetrie" name="planimetrie">'+
                                '<h3>Planimetrie</h3>'+
                            '</div>'+
                             '<div class="tab-pane" id="utenze" name="utenze">'+
                                '<h3>Utenze</h3>'+
                            '</div>'+

                        '</div>'+
                    '</div>';
                    that.$("#tipi").append(varForm);


                    //-------------------------------------event----------------------------------------------------------------
                    that.$('#generale').on('shown.bs.tab', function (e) {
                        console.log("show rap_generali",isNew)
                        app.functions.rap_generali(that,$row);

                    });



                    that.$('#urbanistico').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --se il servizio è nuovo prima bisogna salvare i dati generali, quando esiste allora si può popolare i tab seguenti
                            app.functions.rap_urbanistici(that,$row);
                        }
                    });
                    
                    that.$('#contratto').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --idem
                            app.functions.rap_contratti(that,$row);
                        }
                    });
                    that.$('#impianto').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --idem
                            app.functions.rap_impianti(that,$row);
                        }
                    });
                    that.$('#attrezzature').on('shown.bs.tab', function (e) {
                        console.log("isNew="+isNew);
                        if( !isNew){//update --idem
                            app.functions.rap_attrezzature(that,$row);
                      
                         
                        }
                    });
                    that.$('#antincendio').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --idem
                            app.functions.rap_antincendi(that,$row);
                        }
                    });
                    that.$('#planimetria').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --idem
                            app.functions.rap_planimetrie(that,$row);
                        }
                    });
                    that.$('#utenza').on('shown.bs.tab', function (e) {
                        if( !isNew){//update --idem
                            app.functions.rap_utenze(that,$row);
                        }
                    });
                    console.log("default show rap_generali",isNew)  ;
                    app.functions.rap_generali(that,$row);//default
                    break;
                }    
                case "RFA_Fornitori":{
                    that.$("#tipi").empty();
                      console.log(that);
                      app.functions.rfa_fornitori(that,$row);
                    break;
                }
                case "RFA_Tipologie_Prodotto_Servizio":{
                    that.$("#tipi").empty();
                    console.log('rfa_tipologie_prodotto_servizio');
                    app.functions.rfa_tipologie_prodotto_servizio($row,that); 
                    break;
                }    
                case "rfa_tipologie_fornitori_ag":{
                    that.$("#tipi").empty();
                    console.log('rfa_tipologie_fornitori_ag');
                    console.log("arr="+app.global.nick_array.data);
                    app.functions.rfa_tipologie_fornitori_acquisto_generale(that,$row); 
                    break;
                }    
                case "RFA_Servizi":{
                    that.$("#tipi").empty();
                    console.log('rfa_servizi');
                    app.functions.rfa_servizi(that,$row); 
                    //rfa_adm;
                    break;
                }
                case "RFA_Banche":{
                    that.$("#tipi").empty();
                    console.log('rfa_banche')
                    app.functions.rfa_banche(that,$row); 
                    break;
                }    
                case "RMA_catDispositivi":{
                    that.$("#tipi").empty();
                    console.log('RMA_catDispositivi')
                    app.functions.rma_catDispositivi(that,$row); 
                    break;
                }
                case "RMA_pmaTipologie":{
                    that.$("#tipi").empty();
                    console.log('RMA_pmaTipologie');
                    //rma_pmaTipologie(that,$row); 
                    break;
                }
                case "Ditte":{
                    that.$("#tipi").empty();
                    // that.$("#registrationForm").append(
                    varForm=  
                    '<form class="registrationForm" id="registrationForm" method="post">'+
                        '<input type="hidden" class="form-control" name="id" id="id">'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-8">'+
                                '<label id="lblname" for="name">Nome Ditta *</label>'+
                                '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Ditta" >'+
                            '</div>'+
                            '<div class="form-group col-lg-4">'+
                                '<label id="lblname" for="piva">Partita IVA</label>'+
                                '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" >'+
                            '</div>'+
                        '</div>'+
                        '<div class="row">'+
                            '<div class="form-group col-lg-8">'+
                                '<label id="lblsettore" for="settore">Settore *</label>'+
                                '<input type="text" class="form-control" name="settore" id="settore" placeholder="Settore" >'+
                            '</div>'+
                            '<div class="form-group col-lg-4">'+
                                '<label id="lblccia" for="ccia">C.C.I.A.</label>'+
                                '<input type="text" class="form-control" name="ccia" id="ccia" placeholder="C.C.I.A." >'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>'+
                            '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo">'+
                        '</div>'+
                        '<div class="row">'+
                            '<div class="form-group col-lg-4">'+
                                '<label  id="lblcomune" for="comune">Comune</label>'+
                                '<select  name="comune" id="comune"  class="form-control" ></select>'+

                            '</div>'+
                            '<div class="form-group col-lg-3">'+
                                '<label  id="lblcap" for="cap">CAP</label>'+
                                '<select  name="cap" id="cap"  class="form-control" ></select>'+

                            '</div>'+
                            '<div class="form-group col-lg-2">'+
                                '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                               '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                            '</div>'+

                            '<div class="form-group col-lg-3">'+
                                '<label  id="lblregione" for="regione">Regione</label>'+
                                '<select  name="regione" id="regione"  class="form-control" ></select>'+

                            '</div>'+

                        '</div>'+
                
                        '<div class="row ">'+
                            '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>'+
                                //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                                '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                            '</div>'+

                        '</div>'+
                        '<div id="email" name="email[]">';
                        that.$("#tipi").append(varForm);
                        //----------------------------------------------------------------------
                   
                        if(!isNew && app.global.nick_array.data.email.length>0){ 

                            for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {
                                $iEmail=$i;

                               // $("#email").append(  
                                 varForm=        
                                    '<div class="row">'+
                                        '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.data.email[$i]['id']+'">'+  

                                        '<div class="form-group col-lg-8">'+
                                            '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.data.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                                        '</div>'+
                                        '<div class="form-group col-lg-3">'+
                                            '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.data.email[$i]['emailNome']+'" placeholder="Nome Email">'+
                                        '</div>'+
                                         '<div class="form-group col-lg-1">'+
                                          '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                        '</div>'+

                                    '</div>'
                                    //   '<hr class="style13">'   
                                ;
                            that.$("#registrationForm").append(varForm);     

                            that.$('.removeEmail'+$iEmail).click(function(e) {
                                    $idx= $(this).attr("idx");
                                    $idxi= that.$("#registrationForm").find('input[name="email['+$idx+'][id]"]').val();

                                    $(this).closest(".row").remove();

                                    var jsonObj = {};
                                    jsonObj.id=$idxi;
                                    jsonObj.type="email";
                                    jsonObj.action = "del";
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);

                                    $.ajax({
                                       url:API_URL,
                                       type:'post',
                                       headers : $headers,
                                       data: jsonObj,
                                       dataType : 'text',
                                        success: function (json) {
                                           $mydata =JSON.parse(json);
                                       }           
                                    });

                                });
                                 $("#registrationForm").validate(); //sets up the validator

                           // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                            $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                    required: true,
                                   // minlength: 2,
                                    email: true,

                                    messages: {
                                      required: "Required input",
                                      minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                      email:"Deve essere una email valida!"
                                    }
                                  });

                            }
                    }    
                    
                        //----------------------------------------------------------------------
                        varForm= 
                        '</div>'+
                            '<div class="row ">'+
                                '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                                    '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono </label>'+
                                       // '<button type="button" id="telefonoPlus" name="telefonoPlus" class="btn btn-default btn-lg telefono-Plus">'+
                                        '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                                    '</button>'+
                                    '</div>'+
                            '</div>'+    
                        '<div id="telefoni" name"telefoni[]">';
                        that.$("#registrationForm").append(varForm);
                        //--------------------------------------------------------------------------
                        if(!isNew && app.global.nick_array.data.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.data.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.data.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                           // $("#telefoni").append(  
                         varForm=          
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+app.global.nick_array.data.telefoni[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                     //   '<label >Del</label>'+

                                    '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                      that.$("#registrationForm").append(varForm);     
                     that.$('.removeTel'+$iTel).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="telefoni['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="telefoni";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                      $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                               minlength: 6,
                                number: true,
                                
                                messages: {
                                  required: "Perfavore inserisci il numero di telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono  valido!"
                                }
                              });
                        
                            //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                            
                            //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                            //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                            //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                        }
                    }                
                
                        //-----------------------referenti ditte----------------------------------------------------------- 
                        varForm= 
                        '<div class="row ">'+
                            '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                '<label id="lblrefMas" class="form-group col-lg-4" >Referente</label>'+
                                '<a class="referente-Plus"  title="Add Referente"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                            '</div>'+

                        '</div>'+
                        '<div id="referente" name="referente[]">';
                        that.$("#registrationForm").append(varForm);
                        //----------------------------------------------------------------------
                  
                        if(!isNew && app.global.nick_array.data.referente.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.data.referente.length; $i++) {
                            $iReferente=$i;
                           
                          
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+app.global.nick_array.data.referente[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+app.global.nick_array.data.referente[$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+app.global.nick_array.data.referente[$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+app.global.nick_array.data.referente[$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                      '<a class="removeReferente'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                        that.$("#registrationForm").append(varForm);     
                        
                     that.$('.removeReferente'+$iReferente).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="referente['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="referente_ditta";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                             $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                                required: true,
                                minlength: 2,
                                
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                 // email:"Deve essere una email valida!"
                                }
                              });
                        
                        }
                }    
             
                        $varNote="";  

                        if(!isNew ){ 
                            $varNote=app.global.nick_array.data.note 
                        }else{

                        }
                
                        varForm= '</div>'+    
                
                
                        '<div class="row">'+

                            '<div class="form-group >'+
                                '<label for="note">Note</label>'+

                                '<textarea type="textarea" class="form-control" name="note" id="note" " rows="3">'+$varNote+'</textarea>'+

                            '</div>'+
                        '</div>'+  
                        '<div class="row">'+
                            '<div class="form-group">'+
                                '<input type="checkbox" class="form-check-input" name="valid" id="valid" >'+
                                '<label class="form-check-label" for="valid">Valido</label>'+
                            '</div>'+
                        '</div>'+
                        '<div class="row">'+
                            '<div class="form-group col-lg-12 ">'+ 
                                '<button type="submit"  class="btn btn-primary submit ">Submit</button>'+
                            '</div>'+

                        '</div>'+
                    '</form>'
                    ; //add input box
                    that.$("#registrationForm").append(varForm);
              
                    //-----------------------------------------------------------------------------------
                    $.validator.addMethod("username_regex", function(value, element) {   
                        return this.optional(element) || /^\b[a-z0-9\&-_àòèùì.' ]{3,60}$/i.test(value); 
                        // return this.optional(element) || /^[a-z0-9\.\-_]{3,30}$/i.test(value);   
                    }, "Perfavore seleziona solo i caratteri consentiti!");  
                    that.$("#registrationForm").validate({

                        rules: {
                            name: {
                              required: true,
                              minlength: 3,
                              username_regex: true
                            },
                            "telefoni[]":{
                                 required: true,
                              minlength: 6,
                              number:true
                            },
                             settore: {
                              required: true
                             // username_regex: true
                            }


                        },
                        messages: {
                            name: {
                              required: "Perfavore inserisci il nome dellla Ditta",
                              minlength: "Il nome della Ditta deve contenere perlomeno 3 caratteri"
                            },
                              settore: {
                              required: "Perfavore inserisci il settore dellla Ditta"
                             
                            }
                        }/*,
                        submitHandler: function (form) {
                        alert("Validation Success!");
                        //  return true; // if you need to block normal submit because you used ajax
                        }*/
                    } );
             
         

                    var $selRegione=that.$("#regione");
                    var $selProvincia=that.$("#provincia");
                    var $selComune=that.$("#comune");
                    var $selCap=that.$("#cap");
                    var $selCoordinatore=that.$("#coordinatore");
                    var $selReferente=that.$("#referente");
           
                    regioni();
                   //-------------------------------regioni------------------------------------------
                   function  regioni(){


                    var jsonObj = {};
                    //jsonObj.action = "regione";
                    //jsonObj.type = app.global.nick_array.arr;
                    jsonObj.action = "list";
                    jsonObj.type = "regioni";

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                       url:API_URL,
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                           $mydata =JSON.parse(json);
                           $selRegione.empty();
                           $aa=$mydata.data;
                           $selRegione.append('<option value="0"></option>');
                            $.each($aa, function(i, value) {
                              $selRegione.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["nome"]+'</option>');
                           });
                         // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                            if(isNew){
                            parseInt($selRegione.val(17));//seleziona toscana 17
                        }else{
                            $selRegione.val(parseInt($row.id_regione));//seleziona toscana
                            console.log("selReg="+$row.id_regione+" arr="+_.keys($row));
                        }

                          province();
                        }  
                    });
                }
                    //-------------------------------province------------------------------------------
           
                    function  province(){  
           
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "province";
           if(isNew){
               jsonObj.regione = parseInt($selRegione.val());
           }else{
               jsonObj.regione = parseInt($row.id_regione);
           }
            
           
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selProvincia.empty();
                   $aa=$mydata.data;
                   $selProvincia.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selProvincia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["sigla"]+' ('+$aa[i]["nome"]+')</option>');
                   });
                if(isNew){
                     parseInt($selProvincia.val());//seleziona pr firenze 33
                }else{
                      $selProvincia.val(parseInt($row.id_provincia));//seleziona pr firenze 33
                     
                }
                  
                 comuni();
                }
            });
        }       
                    //-------------------------------comuni------------------------------------------
           
                    function  comuni(){  
         
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="comuni";
            
            if(isNew){
             jsonObj.provincia = parseInt($selProvincia.val());
           }else{
               jsonObj.provincia  = parseInt($row.id_provincia);
           }
            
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selComune.empty();
                   $aa=$mydata.data;
                   $selComune.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selComune.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["comune"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
                if(isNew){
                     parseInt($selComune.val());//seleziona comune firenze 2797
                }else{
                     $selComune.val(parseInt($row.id_comune));//seleziona pr firenze 33
                     
                }
                 cap();
                }
            });
        }       
                    //-------------------------------cap------------------------------------------
           
                    function  cap(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="cap";
            
            if(isNew){
             jsonObj.comune = parseInt($selComune.val());
           }else{
                jsonObj.comune= parseInt($row.id_comune);
           }
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selCap.empty();
                   $aa=$mydata.data;
                   $selCap.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selCap.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["cap"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selCap.val();//seleziona pr firenze 33
                }else{
                     $selCap.val(parseInt($row.id_cap));//seleziona pr firenze 33
                     
                }
               // referente()
                }
            });
        }       
        
        
                
                    //-------------------------------referenti--ditte----------------------------------------
           
                    function  referente(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
             jsonObj.type = "referente_ditta";
           
            
            if(isNew){
                jsonObj.referente = parseInt($selReferente.val());
           }else{
                jsonObj.referente= parseInt($row.id_referente);
           }
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selReferente.empty();
                   $aa=$mydata.data;
                   $selReferente.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selReferente.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["referente"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selReferente.val();//seleziona pr firenze 33
                }else{
                     $selReferente.val(parseInt($row.id_referente));//seleziona pr firenze 33
                     
                }
                
                }
            });
        }       
                    //-------------------------------------event--ditte--------------------------------------------------------------
 
                    that.$('#regione').change(function (e,value,row) {
                        isNew=true;
                        province();   
                    });
                    that.$('#provincia').change(function (e) {
                        isNew=true;
                        comuni();
                    });
                    that.$('#comune').change(function (e) {
                        isNew=true;
                        cap();
                    });

                    that.$('.email-Plus').click(function () {
                            $iEmail = $iEmail + 1;
                            $i = $iEmail

                            $("#email").append(
                            '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-1">'+
                                        '<a class="removeEmail'+$iEmail+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                 '</div>'
                                  // '<hr class="style13">'   
                            );
                            $('.removeEmail'+$iEmail).children().each(function(){
                                $(this).click(function() {
                                    $(this).closest(".row").remove();

                                });
                            });

                            $("#registrationForm").validate(); //sets up the validator

                                   // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                    $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                            required: true,
                                           // minlength: 2,
                                            email: true,

                                            messages: {
                                              required: "Required input",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                              email:"Deve essere una email valida!"
                                            }
                                          });

                        }); 
                    that.$('.telefono-Plus').click(function () {

                            $iTel = $iTel + 1;
                            $i = $iTel

                            $("#telefoni").append(  


                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" >'+  

                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefono]" placeholder="Telefono" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" placeholder="Nome Telefono">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-1">'+
                                        '<a class="removeTel'+$iTel+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            );
                            $("#registrationForm").validate(); //sets up the validator

                                   // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                    $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                            required: true,
                                            minlength: 8,
                                            number: true,

                                            messages: {
                                              required: "Inserire numero del Telefono",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                              number:"Deve essere un numero di Telefono valido"
                                            }
                                          });
                            $('.removeTel'+$iTel).children().each(function(){

                                $(this).click(function() {
                                    $(this).closest(".row").remove();

                                });
                            });

                        }) ;
                    //--------------------referenti ditta add-------------------------------------------
                    that.$('.referente-Plus').click(function () {
                            $iReferente = $iReferente + 1;
                            $i = $iReferente

                            $("#referente").append(
                            '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" >'+  
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" placeholder="Nome Referente " require>'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" placeholder="Cognome Referente " require>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" placeholder="Mansione">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-1">'+
                                        '<a class="removeReferente'+$iReferente+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                 '</div>'
                                  // '<hr class="style13">'   
                            );
                            $('.removeReferente'+$iReferente).children().each(function(){
                                $(this).click(function() {
                                    $(this).closest(".row").remove();

                                });
                            });

                            $("#registrationForm").validate(); //sets up the validator

                                   // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                    $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                                            required: true,
                                            minlength: 2,


                                            messages: {
                                              required: "Required input",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),

                                            }
                                          });
                                       $("input[name=\"referente["+$i+"][cognome]\"]").rules( "add", {
                                            required: true,
                                            minlength: 2,


                                            messages: {
                                              required: "Required input",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),

                                            }
                                          });

                        }); //end referenti ditte add--------
                    break;
                }    
                case "Committenti":{
                   //----------------------------------------committenti-----------------------------------------
                if(!isNew && app.global.nick_array.data.committenza_cod==="2"){
                   $checked1="";
                  $checked2="checked"; 
                  
                }else{
                   $checked1="checked";
                   $checked2="";
                }
                that.$("#tipi").empty();
                // that.$("#registrationForm").append(
                varForm=  
                        '<form class="registrationForm" id="registrationForm" method="post">'+
                       
                        '<input type="hidden" class="form-control" name="id" id="id">'+ 
                '<div class="row">'+
                    '<div class="form-group col-sm-6">'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value=1 name="committenza" id="committenza" '+$checked1+'>Privato</label>'+
                        '</div>'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value=2 name="committenza" id="committenza" '+$checked2+'>Ente</label>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="committ"></div>';
                    that.$("#tipi").append(varForm);
                    if(!isNew && app.global.nick_array.data.committenza_cod==="2"){
                   comm(2); 
                }else{
                  comm(1);  
                }
                
                    function  comm(comm){
                if(comm==1){//privati
                     varForm=  
                
                    '<div class="row">'+
                        '<div class="form-group col-sm-4">'+
                            '<label id="lblnome" for="name">Nome</label>'+
                            '<input type="text" class="form-control" name="name" id="name" placeholder="Nome" >'+
                        '</div>'+
                        '<div class="form-group col-sm-5">'+
                            '<label id="lblcognome" for="cognome">Cognome</label>'+
                            '<input type="text" class="form-control" name="cognome" id="cognome" placeholder="Cognome" >'+
                        '</div>'+
                         '<div class="form-group col-sm-3">'+
                            '<label id="lblcf" for="cf">Codice Fiscale</label>'+
                            '<input type="text" class="form-control" name="cf" id="cf" placeholder="Codice Fiscale" >'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  id="lblindirizzo" for="indirizzo">Indirizzo invio comunicazioni</label>'+
                            '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo invio comunicazioni">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-4">'+
                            '<label  id="lblcomune" for="comune">Comune</label>'+
                            '<select  name="comune" id="comune"  class="form-control" ></select>'+

                        '</div>'+
                        '<div class="form-group col-sm-2">'+
                            '<label  id="lblcap" for="cap">CAP</label>'+
                            '<select  name="cap" id="cap"  class="form-control" ></select>'+

                        '</div>'+
                        '<div class="form-group col-sm-3">'+
                            '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                           '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                        '</div>'+

                        '<div class="form-group col-sm-3">'+
                            '<label  id="lblregione" for="regione">Regione</label>'+
                            '<select  name="regione" id="regione"  class="form-control" ></select>'+

                        '</div>'+

                    '</div>'+
                
                    '<div class="row">'+
                        '<div class="form-group col-sm-12"  style="background-color: #f5f5f5">'+
                            '<label id="lblemailMas" class="form-group col-sm-4" >E-mail</label>'+
                            '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>';
                    that.$("#committ").append(varForm);
                    if(!isNew && app.global.nick_array.data.email.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {
                            $iEmail=$i;
                           
                        // $("#email").append(  
                        varForm=        
                        '<div class="row">'+
                            '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.data.email[$i]['id']+'">'+  

                            '<div class="form-group col-lg-8">'+
                                '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.data.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                            '</div>'+
                            '<div class="form-group col-lg-3">'+
                                '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.data.email[$i]['emailNome']+'" placeholder="Nome Email">'+
                            '</div>'+
                            '<div class="form-group col-lg-1">'+
                              '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                            '</div>'+

                        '</div>'
                         //   '<hr class="style13">'   
                        ;
                        that.$("#email").append(varForm);     
                           
                        that.$('.removeEmail'+$iEmail).click(function(e) {
                            $idx= $(this).attr("idx");
                            $idxi= that.$("#registrationForm").find('input[name="email['+$idx+'][id]"]').val();

                            $(this).closest(".row").remove();
                               
                            var jsonObj = {};
                            jsonObj.id=$idxi;
                            jsonObj.type="email";
                            jsonObj.action = "del";
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
           
                            $.ajax({
                               url:API_URL,
                               type:'post',
                               headers : $headers,
                               data: jsonObj,
                               dataType : 'text',
                                success: function (json) {
                                   $mydata =JSON.parse(json);
                               }           
                            });
                                   
                        });
                        $("#registrationForm").validate(); //sets up the validator
              
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                            required: true,
                           // minlength: 2,
                            email: true,
                                
                            messages: {
                              required: "Required input",
                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                              email:"Deve essere una email valida!"
                            }
                        });
                        
                    }
                } 
                varForm= 
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-12" style="background-color: #f5f5f5">'+
                            '<label id="lblTelefonoMas" class="form-group col-sm-4">Telefono</label>'+
                            '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>';
                    that.$("#committ").append(varForm);
                    if(!isNew && app.global.nick_array.data.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.data.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.data.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                           // $("#telefoni").append(  
                        varForm=          
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+app.global.nick_array.data.telefoni[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                     //   '<label >Del</label>'+

                                    '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                      that.$("#telefoni").append(varForm);     
                     that.$('.removeTel'+$iTel).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="telefoni['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="telefoni";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                      $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                               minlength: 6,
                                number: true,
                                
                                messages: {
                                  required: "Perfavore inserisci il numero di telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono  valido!"
                                }
                              });
                        
                            //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                            
                            //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                            //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                            //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                        }
                    }  
             
                    $varNote="";  
                 
                    if(!isNew ){ 
                        $varNote=app.global.nick_array.data.note 
                    }else{
                     
                    }
                
                    varForm= 
                    '</div>'+  
            
                    '<div class="row">'+

                        '<div class="form-group col-lg-12>'+
                            '<label for="note">Note</label>'+

                            '<textarea type="textarea" class="form-control" name="note" id="note" " rows="3">'+$varNote+'</textarea>'+

                        '</div>'+
                    '</div>'+  
                    '<div class="row">'+
                        '<div class="form-group">'+
                            '<input type="checkbox" class="form-check-input" name="valid" id="valid" >'+
                            '<label class="form-check-label" for="valid">Valido</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-lg-12 ">'+ 
                            '<button type="submit"  class="btn btn-primary submit ">Submit</button>'+
                        '</div>'+
                    '</div>'+ 
                     '</div>'+ 
                    
                '</div>'+ //end div committ 
         '</form>'
                        ; //add input box
                 that.$("#committ").append(varForm);
                    }else{//enti
                     varForm=  
                
                    '<div class="row">'+
                        '<div class="form-group col-sm-9">'+
                            '<label id="lblnome" for="name">Nominativo</label>'+
                            '<input type="text" class="form-control" name="name" id="name" placeholder="Nominativo" >'+
                        '</div>'+
                        
                         '<div class="form-group col-sm-3">'+
                            '<label id="lblcf" for="cf">P.IVA</label>'+
                            '<input type="text" class="form-control" name="piva" id="piva" placeholder="P.IVA" >'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  id="lblindirizzo" for="indirizzo">Indirizzo invio comunicazioni</label>'+
                            '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo invio comunicazioni">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-4">'+
                            '<label  id="lblcomune" for="comune">Comune</label>'+
                            '<select  name="comune" id="comune"  class="form-control" ></select>'+

                        '</div>'+
                        '<div class="form-group col-sm-2">'+
                            '<label  id="lblcap" for="cap">CAP</label>'+
                            '<select  name="cap" id="cap"  class="form-control" ></select>'+

                        '</div>'+
                        '<div class="form-group col-sm-3">'+
                            '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                           '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                        '</div>'+

                        '<div class="form-group col-sm-3">'+
                            '<label  id="lblregione" for="regione">Regione</label>'+
                            '<select  name="regione" id="regione"  class="form-control" ></select>'+

                        '</div>'+

                    '</div>'+
                
                    '<div class="row">'+
                        '<div class="form-group col-sm-12"  style="background-color: #f5f5f5">'+
                            '<label id="lblemailMas" class="form-group col-sm-4" >E-mail</label>'+
                            '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>';
                    that.$("#committ").append(varForm);
                    if(!isNew && app.global.nick_array.data.email.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {
                            $iEmail=$i;
                           
                        // $("#email").append(  
                        varForm=        
                        '<div class="row">'+
                            '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.data.email[$i]['id']+'">'+  

                            '<div class="form-group col-lg-8">'+
                                '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.data.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                            '</div>'+
                            '<div class="form-group col-lg-3">'+
                                '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.data.email[$i]['emailNome']+'" placeholder="Nome Email">'+
                            '</div>'+
                            '<div class="form-group col-lg-1">'+
                              '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                            '</div>'+

                        '</div>'
                         //   '<hr class="style13">'   
                        ;
                        that.$("#email").append(varForm);     
                           
                        that.$('.removeEmail'+$iEmail).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="email['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="email";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                            $("#registrationForm").validate(); //sets up the validator
              
                            $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                            });
                        
                        }
                    } 
                     varForm= 
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-12" style="background-color: #f5f5f5">'+
                            '<label id="lblTelefonoMas" class="form-group col-sm-4">Telefono</label>'+
                            '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>';
                  that.$("#committ").append(varForm);
                     if(!isNew && app.global.nick_array.data.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.data.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.data.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                           // $("#telefoni").append(  
                        varForm=          
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+app.global.nick_array.data.telefoni[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+app.global.nick_array.data.telefoni[$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                     //   '<label >Del</label>'+

                                    '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                      that.$("#telefoni").append(varForm);     
                     that.$('.removeTel'+$iTel).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="telefoni['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="telefoni";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                      $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                               minlength: 6,
                                number: true,
                                
                                messages: {
                                  required: "Perfavore inserisci il numero di telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono  valido!"
                                }
                              });
                        
                            //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                            
                            //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                            //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                            //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                        }
                    }  
                        // -----------------------referenti enti----------------------------------------------------------- 
                 varForm= 
                '<div class="row ">'+
                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                        '<label id="lblrefMas" class="form-group col-lg-4" >Referente</label>'+
                        '<a class="referente-Plus"  title="Add Referente"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                    '</div>'+
                     
                '</div>'+
                '<div id="referente"></div>';
              that.$("#committ").append(varForm);
                      //----------------------------------------------------------------------
                  
                    if(!isNew && app.global.nick_array.data.referente.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.data.referente.length; $i++) {
                            $iReferente=$i;
                           
                          
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+app.global.nick_array.data.referente[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+app.global.nick_array.data.referente[$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+app.global.nick_array.data.referente[$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+app.global.nick_array.data.referente[$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                      '<a class="removeReferente'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                        that.$("#referente").append(varForm);     
                        
                     that.$('.removeReferente'+$iReferente).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="referente['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="referente_ditta";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                            $("#registrationForm").validate(); //sets up the validator
              
                        // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                            required: true,
                            minlength: 2,
                                
                                
                                messages: {
                                    required: "Required input",
                                    minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  // email:"Deve essere una email valida!"
                                }
                              });
                        
                        }
                }   
                //---------------------------------------------------------------------        
                  $varNote="";  
                 
                    if(!isNew ){ 
                        $varNote=app.global.nick_array.data.note 
                    }else{
                     
                    }
                
                    varForm= 
                    '</div>'+  
            
                    '<div class="row">'+

                        '<div class="form-group col-lg-12>'+
                            '<label for="note">Note</label>'+

                            '<textarea type="textarea" class="form-control" name="note" id="note" " rows="3">'+$varNote+'</textarea>'+

                        '</div>'+
                    '</div>'+  
                    '<div class="row">'+
                        '<div class="form-group">'+
                            '<input type="checkbox" class="form-check-input" name="valid" id="valid" >'+
                            '<label class="form-check-label" for="valid">Valido</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-lg-12 ">'+ 
                            '<button type="submit"  class="btn btn-primary submit ">Submit</button>'+
                        '</div>'+
                    '</div>'+ 
                     '</div>'+ 
                    
                '</div>' //end div committ 
                        ; //add input box
                 that.$("#committ").append(varForm);
                    
                }
                
               finComm (that)
                }
                 
              
                    //-----------------------------------------------------------------------------------
                    function finComm (that){
                 $.validator.addMethod("username_regex", function(value, element) {   
                   return this.optional(element) || /^\b[a-z0-9\-_àòèù.' ]{3,60}$/i.test(value); 
                    // return this.optional(element) || /^[a-z0-9\.\-_]{3,30}$/i.test(value);   
                }, "Perfavore seleziona solo i caratteri consentiti!");  
         
         
                    that.$("#registrationForm").validate({

                    rules: {
                        name: {
                          required: true,
                          minlength: 3,
                          username_regex: true
                        },
                         cognome: {
                          required: true,
                          minlength: 2,
                          username_regex: true
                        },
                        "telefoni[]":{
                             required: true,
                          minlength: 6,
                          number:true
                        }
                        

                    },
                    messages: {
                        name: {
                          required: "Perfavore inserisci il nominativo",
                          minlength: "Il nominativo deve contenere perlomeno 3 caratteri"
                        },
                        cognome: {
                          required: "Perfavore inserisci il nominativo",
                          minlength: "Il nominativo deve contenere perlomeno 2 caratteri"
                        }
                    }/*,
                    submitHandler: function (form) {
                     alert("Validation Success!");
                     //  return true; // if you need to block normal submit because you used ajax
                    }*/
                } );
             
         

            var $selRegione=that.$("#regione");
            var $selProvincia=that.$("#provincia");
            var $selComune=that.$("#comune");
            var $selCap=that.$("#cap");
            var $selCoordinatore=that.$("#coordinatore");
            var $selReferente=that.$("#referente");
           
            regioni();
           //-------------------------------regioni------------------------------------------
           function  regioni(){
          
           
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "regioni";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selRegione.empty();
                   $aa=$mydata.data;
                   $selRegione.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selRegione.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["nome"]+'</option>');
                   });
                 // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                    if(isNew){
                    parseInt($selRegione.val(17));//seleziona toscana 17
                }else{
                    $selRegione.val(parseInt($row.id_regione));//seleziona toscana
                    console.log("selReg="+$row.id_regione+" arr="+_.keys($row));
                }
                    
                  province();
                }  
            });
        }
            //-------------------------------province------------------------------------------
           
        function  province(){  
           
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "province";
           if(isNew){
               jsonObj.regione = parseInt($selRegione.val());
           }else{
               jsonObj.regione = parseInt($row.id_regione);
           }
            
           
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selProvincia.empty();
                   $aa=$mydata.data;
                   $selProvincia.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selProvincia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["sigla"]+' ('+$aa[i]["nome"]+')</option>');
                   });
                if(isNew){
                     parseInt($selProvincia.val());//seleziona pr firenze 33
                }else{
                      $selProvincia.val(parseInt($row.id_provincia));//seleziona pr firenze 33
                     
                }
                  
                 comuni();
                }
            });
        }       
             //-------------------------------comuni------------------------------------------
           
        function  comuni(){  
         
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="comuni";
            
            if(isNew){
             jsonObj.provincia = parseInt($selProvincia.val());
           }else{
               jsonObj.provincia  = parseInt($row.id_provincia);
           }
            
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selComune.empty();
                   $aa=$mydata.data;
                   $selComune.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selComune.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["comune"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
                if(isNew){
                     parseInt($selComune.val());//seleziona comune firenze 2797
                }else{
                     $selComune.val(parseInt($row.id_comune));//seleziona pr firenze 33
                     
                }
                 cap();
                }
            });
        }       
             //-------------------------------cap------------------------------------------
           
        function  cap(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="cap";
            
            if(isNew){
             jsonObj.comune = parseInt($selComune.val());
           }else{
                jsonObj.comune= parseInt($row.id_comune);
           }
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selCap.empty();
                   $aa=$mydata.data;
                   $selCap.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selCap.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["cap"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selCap.val();//seleziona pr firenze 33
                }else{
                     $selCap.val(parseInt($row.id_cap));//seleziona pr firenze 33
                     
                }
               // referente()
                }
            });
        }       
        
        
                
        //-------------------------------referenti--committenti----------------------------------------
           
        function  referente(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "referente_ditta";
            
            
            if(isNew){
                jsonObj.referente = parseInt($selReferente.val());
           }else{
                jsonObj.referente= parseInt($row.id_referente);
           }
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selReferente.empty();
                   $aa=$mydata.data;
                   $selReferente.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selReferente.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["referente"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selReferente.val();//seleziona pr firenze 33
                }else{
                     $selReferente.val(parseInt($row.id_referente));//seleziona pr firenze 33
                     
                }
                
                }
            });
        }       
        //-------------------------------------event--committenti--------------------------------------------------------------
 
        that.$('#regione').change(function (e,value,row) {
            isNew=true;
            province();   
        });
        that.$('#provincia').change(function (e) {
            isNew=true;
            comuni();
        });
        that.$('#comune').change(function (e) {
            isNew=true;
            cap();
        });
        
        that.$('.email-Plus').click(function () {
                $iEmail = $iEmail + 1;
                $i = $iEmail
                
                $("#email").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeEmail'+$iEmail+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                     '</div>'
                      // '<hr class="style13">'   
                );
                $('.removeEmail'+$iEmail).children().each(function(){
                    $(this).click(function() {
                        $(this).closest(".row").remove();
                   
                    });
                });
               
                $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                              });
       
            }); 
        that.$('.telefono-Plus').click(function () {
             
                $iTel = $iTel + 1;
                $i = $iTel
                
                $("#telefoni").append(  
                        

                    '<div class="row">'+
                        '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" >'+  
                       
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefono]" placeholder="Telefono" col-lg-7>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" placeholder="Nome Telefono">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeTel'+$iTel+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+
                       
                    '</div>'
                    //   '<hr class="style13">'   
                );
                $("#registrationForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                                minlength: 8,
                                number: true,
                                
                                messages: {
                                  required: "Inserire numero del Telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono valido"
                                }
                              });
                $('.removeTel'+$iTel).children().each(function(){
                 
                    $(this).click(function() {
                        $(this).closest(".row").remove();
                   
                    });
                });
                
            }) ;
        //--------------------referenti comm add-------------------------------------------
        that.$('.referente-Plus').click(function () {
                $iReferente = $iReferente + 1;
                $i = $iReferente
                
                $("#referente").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="referente['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-4">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" placeholder="Nome Referente " require>'+
                        '</div>'+
                         '<div class="form-group col-lg-4">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" placeholder="Cognome Referente " require>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" placeholder="Mansione">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeReferente'+$iReferente+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                     '</div>'
                      // '<hr class="style13">'   
                );
                $('.removeReferente'+$iReferente).children().each(function(){
                    $(this).click(function() {
                        $(this).closest(".row").remove();
                   
                    });
                });
               
                $("#registrationForm").validate(); //sets up the validator
              
                        // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                                required: true,
                                minlength: 2,
                              
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                               
                                }
                              });
                           $("input[name=\"referente["+$i+"][cognome]\"]").rules( "add", {
                                required: true,
                                minlength: 2,
                              
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                
                                }
                              });
       
            }); //end referenti committ add-----------------------------------------------------------------------------
         
        that.$('input[type="radio"]').on('change', function(e) {
            
            if(e.target.value==1){
              
              $('#committ').empty();
                comm(e.target.value)
               
               
            }else if(e.target.value==2){
             
              $('#committ').empty();
               comm(e.target.value)
            }else{
            
            }
         
            
            
            //manutentori(e.target.value,_that);    
        
        });
    }
                    //---------------------------------------------end Committenti-----------------------
                    break;
                }    
                case "Tipo_Servizio":{
                    that.$("#tipi").empty();
                    that.$("#tipi").append(
                    '<form class="registrationForm" id="registrationForm" method="post">'+ 
                      
                    '<input type="hidden" class="form-control" name="id" id="id" >'+ 


                          '<div class="form-group">'+
                       '<label>Nome Tipologia Servizio</label>'+
                       '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Tipologia Servizio" >'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label  id="lbldescription" for="description">Descrizione Tipologia Servizio</label>'+
                        '<input type="text" class="form-control" name="description" id="description" placeholder="Descrizione Tipologia Servizio">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label id="lblcdc" for="centro_di_costo_cod">CDC</label>'+
                        '<input type="text" class="form-control" name="centro_di_costo_cod" id="centro_di_costo_cod" placeholder="CDC">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label id="lblarea" for="area_servizio">Area</label>'+
                         '<select  name="id_area_servizio" id="id_area_servizio"  class="form-control" ></select>'+

                    '</div>'+

                    '<div class="input_fields_wrap">'+ 
                    '</div>'+    
                    '<div class="form-group">'+
                         '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                        '<label class="form-check-label" for="exampleCheck1">Valido</label>'+
                    '</div>'+
                     '</div>'+
                    '<button type="submit" class="btn btn-primary submit">Submit</button>');
                    var $area_servizio=that.$("#id_area_servizio");
                    area_servizio()
                    //-------------------------------area_servizio---------------------------------------------------
           
                    function  area_servizio(){  
           
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "areaServizio";
            
           if(isNew){
             
               jsonObj.id_area_servizio = parseInt($area_servizio.val());
           }else{
              
               jsonObj.id_area_servizio = parseInt($row.id_area_servizio);
           }
            
           
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $area_servizio.empty();
                   $aa=$mydata.data;
                   $area_servizio.append('<option value="0"></option>');
                   $.each($aa, function(i, value) {
                      $area_servizio.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                   });
                if(isNew){
                     parseInt($area_servizio.val());//seleziona pr firenze 33
                }else{
                      $area_servizio.val(parseInt($row.id_area_servizio));//seleziona pr firenze 33
                     
                }
                  
                
                }
            });
        }       
                    break;
                }    
                case "RFA_Tipologie_Fornitura":{
                     that.$("#tipi").empty();
                      that.$("#tipi").append(
                         '<form class="registrationForm" id="registrationForm" method="post">'+ 
                         '<input type="hidden" class="form-control" name="id" id="id" >'+ 

                               '<div class="form-group">'+
                            '<label>Nome</label>'+
                            '<input type="text" class="form-control" name="name" id="name" placeholder="Nome" >'+
                         '</div>'+
                         '<div class="form-group">'+
                             '<label  id="lbldescription" for="description">Descrizione</label>'+
                             '<input type="text" class="form-control" name="description" id="description" placeholder="Descrizione">'+
                         '</div>'+


                         '<div class="input_fields_wrap">'+ 
                         '</div>'+    
                        '<div class="form-group">'+
                              '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                             '<label class="form-check-label" for="exampleCheck1">Valido</label>'+
                          '</div>'+
                           '<div class="form-group">'+
                              '<input type="checkbox" class="form-check-input" name="tipo_prodotto" id="tipo_prodotto"  value="">'+
                             '<label class="form-check-label" for="tipo_prodotto">Tipologia  Prodotto</label>'+
                          '</div>'+
                           '</div>'+
                          '<button type="submit" class="btn btn-primary submit">Submit</button>'+
                            '</form>'
                     );


                     that.$("#registrationForm").validate({

                         rules: {
                             name: {
                               required: true,
                               minlength: 2
                             }


                         },
                         messages: {
                             name: {
                               required: "Perfavore inserisci il nome",
                               minlength: "Il nome  deve contenere perlomeno 2 caratteri"
                             }
                         }
                     });    
                     break;
                }    
                case "Moduli-Navbar":{
                    that.$("#tipi").empty();
                    that.$("#tipi").append(
                        ' <div class="panel panel-default">'+
                            '<!--div class="panel-heading">Panel heading without title</div-->'+
                            '<div class="panel-body"> '+     
                                '<form class="registrationForm" id="registrationForm" method="post">'+ 
                                    '<input type="hidden" class="form-control" name="id" id="id" >'+ 

                                    '<div class="form-group">'+
                                        '<label>Nome</label>'+
                                        '<input type="text" class="form-control" name="name" id="name" placeholder="Nome" >'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<label  id="lbldescription" for="description">Descrizione</label>'+
                                        '<input type="text" class="form-control" name="description" id="description" placeholder="Descrizione">'+
                                    '</div>'+


                                    '<div class="input_fields_wrap">'+ 
                                    '</div>'+    
                                    '<div class="form-group">'+
                                          '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                                         '<label class="form-check-label" for="exampleCheck1">Valido</label>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                       '<input type="checkbox" class="form-check-input" name="tipo_prodotto" id="tipo_prodotto"  value="">'+
                                      '<label class="form-check-label" for="tipo_prodotto">Tipologia  Prodotto</label>'+
                                    '</div>'+
                                
                                    '<button type="submit" class="btn btn-primary submit">Submit</button>'+
                                '</form>'+
                            '</div>'+
                        '</div>'    
                     );


                     that.$("#registrationForm").validate({

                         rules: {
                             name: {
                               required: true,
                               minlength: 2
                             }


                         },
                         messages: {
                             name: {
                               required: "Perfavore inserisci il nome",
                               minlength: "Il nome  deve contenere perlomeno 2 caratteri"
                             }
                         }
                     });    
                     break;
                }  
                case "ROLES":{
                    that.$("#tipi").empty(); 
                    that.$("#tipi").append(
                        '<div class="panel panel-default">'+
                            '<!--div class="panel-heading">Panel heading without title</div-->'+
                            '<div class="panel-body"> '+     
                                '<form class="registrationForm" id="registrationForm" method="post">'+ 
                                    '<input type="hidden" class="form-control" name="id" id="id" >'+ 
                                    '<div class="row">'+
                                        '<div class="form-group col-sm-6">'+
                                            '<label>Nome</label>'+
                                            '<input type="text" class="form-control" name="name" id="name" placeholder="Nome" >'+
                                        '</div>'+
                                        '<div class="form-group col-sm-6">'+
                                            '<label  id="lbldescription" for="description">Descrizione</label>'+
                                            '<input type="text" class="form-control" name="description" id="description" placeholder="Descrizione">'+
                                        '</div>'+
                                        
                                    '</div>'+
                                    '<div class="row">'+ 
                                        '<div class="form-group col-sm-6">'+
                                            '<label>Descrizione breve</label>'+
                                            '<input type="text" class="form-control" name="shortDescription" id="shortDescription" placeholder="Descrizione breve" >'+
                                        '</div>'+
                                        '<div class="form-group col-sm-2">'+
                                            '<label class="form-check-label" ><input type="checkbox"  name="valid" id="valid"  value=""> Valido</label>'+

                                        '</div>'+
                                    '</div>'+
                                    '<div class="row">'+  
                                        '<div class="form-group col-sm-6">'+

                                            '<div class="form-group " >'+
                                                '<button type="button" id="moduli" name="moduli" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" data-tipo="Moduli/Navbar" data-title="Configura Moduli/Navbar "  title="Configura Moduli/Navbar alla persona">Moduli/Navbar</button>'+
                                            '</div>'+
                                        '</div>'+

                                    '</div>'+
                                    '<br/><br/><div class="form-group ">'+
                                        '<button type="submit" class="btn btn-primary submit">Submit</button>'+
                                    '</div>'+    
                                '</form>'+
                            '</div>'+
                        '</div>'    
                   );

                 //-------------MODULI/NAVBAR--------------------------------------------
                that.$('#moduli').click(function () {
            var  uurl=app.global.json_url+'types/';
             // isNew=true;
             // isCsv=true;


            jsonObj = {};
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.id_person = app.global.nick_array.data.id_person;
            jsonObj.id_role = app.global.nick_array.data.id;
            jsonObj.action = "list";  
            jsonObj.type = "role-navbar";  
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:uurl,
                type:'post',
                headers : $headers,
                data: jsonObj,

                success: function (json) {
                    $mydata =JSON.parse(json);
                    setMod($mydata);

                }

            });
              //*****function setMod**************************************************
            //* prepara la modale con il pannello per la gestione dei moduli/navabar
            //modulo=navbar root o 0; navbar i  navbar sottostanti root
             function setMod($mydata){
                var $depNavbar=[];

                var $depLabel,varForm='';

                $depNavbar= $mydata.role_navbar;//sono la configurazione(en,cheled,active dei navbar x quel servizio in glr_department_navbar
               
                that.$(".modal-body").empty();//costruisco e valorizzo modularmente

                varForm='<div class="panel panel-default">'+
                           '<div class="panel-heading"><b>Ci sono '+$depNavbar.length+' Moduli/Navbar </b></div>'+
                           '<div class="panel-body    navpanel"></div>'+
                       '</div>';    
                that.$(".modal-body").append(varForm);
                console.log($depNavbar);
                that.$(".navpanel").empty();//costruisco e valorizzo modularmente
               
              
                varForm='<form class="navForm" id="navForm" name="navForm" method="post">'+
                      '<table id="table" class="table table-striped" ></table>';
                       
                that.$(".navpanel").append(varForm);           
                 that.$("#table").bootstrapTable({
                data: $depNavbar,
                columns: $mydata.tab
               
            });
                that.$(".modal-dialog").css("width", "70%");
              
                 
                       
                varForm=     
                        '</form>';
                that.$(".navpanel").append(varForm);
                //--------------------------------------------------------------
               
                $.each($depNavbar, function( key, value) {//$depNavbar ->array stato(active) navbar x quel servizio
                    //mystr=$("#lblactive"+value.id).attr('class');
                    mystr=$(value.activeX).attr('class');
                    console.log(value);
                    console.log('id='+value.id+' -> '+mystr);
                    var myarr = mystr.split(" ");
                    console.log(myarr);
                    
                    var $str='';
                    $.each(myarr, function( key1, value1) {
                       if(myarr.length==key1+1){
                           $str="."+value1;
                       }
                       
                   });
                    console.log( $str);
                    /*
                    if(value.active==="1"){//imposto la visibilità per il primo giro
                       that.$($str).show();
                              //     that.$($str+"X").attr("checked",true);
                    }else{
                       that.$($str).hide();
                           //         that.$($str+"X").attr("checked",false);
                    } 
                    */
                    //-----------evento per ogni checkbox-----------------------
                    that.$("#active"+value.id).change(  function(e){
                         
                        checkStato(this); 
                    });
                       console.log(value.activeX);
                 //  checkStato(value.activeX); 
                });
                //--------------------------------------------------------------
                function checkStato(elem){
                    console.log(elem);
                   mystr=$("#lbl"+elem.id).attr('class');
                   var myarr = mystr.split(" ");
                   var $str='';
                   $.each(myarr, function( key, value) {
                       if(myarr.length==key+1){
                           $str="."+value;
                       }
                       
                   });
                   
                    console.log($str);
                    if(elem.checked != true){
                            console.log(".L0"+elem.id);
                             console.log($str+"X");
                                   // $("#lbl"+elem.id).hide();
                                    that.$($str).hide();
                                    that.$($str+"X").prop("checked",false);
                               }
                            else{
                             //    console.log("#"+elem.id);
                               //  $("#lbl"+elem.id).show();
                                  that.$($str).show();
                                   that.$($str+"X").prop("checked",true);
                            }
                }
                
           

             //------------------------------------------------------------------  
                function reveal(that,$depNavbar,value){
                
                    $.each($depNavbar, function( key, value2 ) {//$depNavbar ->array stato(active) navbar x quel servizio
                         console.log(value2.id_navbar+'='+value);
                        if(value2.id_navbar==value){
                            if(value2.enabled=="0"){
                                 that.$('#id'+value).attr("disabled");
                                  console.log('id_nav='+value+' disabled value='+value2.enabled);
                            }else{
                                that.$('#id'+value).removeAttr("disabled"); 
                                 console.log('id_nav='+value+' enabled value='+value2.enabled);
                            }
                            if(value2.checked=="0"){
                                  that.$('#id'+value).removeAttr("checked");
                            }else{
                                that.$('#id'+value).attr('checked', 'checked');
                            }

                        }else{

                        that.$('#id'+value).attr('disabled', 'disabled');
                        that.$('#id'+value).removeAttr("checked");
                      console.log('disabled='+value+' idDepNav='+value2.id_navbar);
                     //return false
                    }
                    });
                       
                        //return true;
                   
                }
                function revealDepEnabled(that,$depNavbarEnabled,value){
                    if( _.contains($depNavbarEnabled,parseInt(value))){
                        that.$('#id'+value).removeAttr("disabled");
                      //  that.$('#id'+value).attr('checked', 'checked');

                     //   console.log('enabled='+value);
                        //return true;
                    }else{

                        that.$('#id'+value).attr('disabled', 'disabled');
                       // that.$('#id'+value).removeAttr("checked");
                   //   console.log('disabled='+value);
                     //return false
                    }
                }

                function revealDepChecked(that,$depNavbarChecked,value){
                    if( _.contains($depNavbarChecked,parseInt(value))){
                       // that.$('#id'+value).removeAttr("disabled");
                       that.$('#id'+value).attr('checked', 'checked');

                      //  console.log('enabled='+value);
                        //return true;
                    }else{

                     //   that.$('#id'+value).attr('disabled', 'disabled');
                       that.$('#id'+value).removeAttr("checked");
                    //  console.log('disabled='+value);
                     //return false
                    }
                }
                $depLabel= $mydata.role_name.name;
                that.$("#modal").find('.modal-title').html('Configurazione  Moduli/Navbar per '+app.global.nick_array.data.name);

                varForm1='<button type="button" id="setNavbar" class="btn btn-primary">Update  Moduli/Navbar</button>';
                // that.$(".modal-body").empty();
                // that.$(".modal-body").append(varForm); 
                that.$(".modal-footer").empty();
                that.$(".modal-footer").append(varForm1);  


                that.$("#setNavbar").click(function(e) {

                //console.log("click set Navbar");

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'person/';

                var nav=[];
                
                that.$('.modal input[type="checkbox"]').each( function( key, values ) {
                      
                    console.log(that.$('#'+values.id).attr("idx"));
                    if(that.$('#'+values.id).is(':checked')) {
                       console.log(key+'-'+values.idx+'-'+values.value);
                        nav.push({'id':that.$('#'+values.id).attr("idx"),'active':1});
                    } else{
                         nav.push({'id':that.$('#'+values.id).attr("idx"),'active':0});
                    }
                    
                 });
               

                console.log(nav);
              
                //var jsonObj = sendUrbans_formToJson(that);
               var   jsonObj = {};
                   // jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj.id_person = app.global.nick_array.data.id_person;
                    jsonObj.id_role = app.global.nick_array.data.id;
                    jsonObj.action = "update";  
                    jsonObj.type = "role-navbar";  
                    jsonObj.nav= nav;  
                   
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:uurl,
                type:'post',
                headers : $headers,
                data: jsonObj,  
                    success: function (datap) {

                        var  $mydata =JSON.parse(datap);

                        //-------------------------------------------------------
                        if ($mydata.success){
                           bootbox.dialog({
                                            title: "Set Navbar",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                      //   console.log( ($mydata.data.config));
                                                        // console.log(app.global.nick_array.data.config);
                                                        that.$("#modal").modal('hide');

                                                     //    app.global.nick_array.data.config=$mydata.data.config;
                                                      //   app.routers.router.prototype.data_type_editView({});
                                                    }
                                                }
                                            }
                                        });




                        }
                    }    
                });


            }); 
             

            }      

            that.$("#modal").modal('show'); 
        });
              
           
                that.$("#registrationForm").validate({

                       rules: {
                           name: {
                             required: true,
                             minlength: 2
                           }


                       },
                       messages: {
                           name: {
                             required: "Perfavore inserisci il nome",
                             minlength: "Il nome  deve contenere perlomeno 2 caratteri"
                           }
                       }
                   });    
                   break;
                }  
                case "UTENZE_Fornitori":{
                    that.$("#tipi").empty();
                      console.log(that);
                    app.functions.utenze_fornitori(that,$row);
                    break;
                }
                case "bsa":{
                    that.$("#tipi").empty();
                    console.log('bsa_new');
                    app.functions.bsa_new(that,$row); 
                    break;
                }
                case "rfa_magazzino":{
                    that.$("#tipi").empty();
                    console.log('rfa_magazzino new');
                   // app.functions.bsa_new(that,$row); 
                   that.$('.modal-title').text("Add Comunicazione");  
                   //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
                   modalF=
                       '<form id="mod" >'+
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
                               '<button type="button" id="btn" name="btn" class="btn btn-primary submit ">Add File</button>'+
                           '</div>'+ 
                       '</form >'
                   ;
                   that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);
                    that.$("#modal").modal('show'); 
                    that.$('#btn').click(function(e) {//add dalle modali
                        if(that.$("#mod").valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'doc/';

                            //var jsonObj = sendUrbans_formToJson(that);
                            var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                            form_data.append('action', 'add');
                            form_data.append('type', 'rfa_magazzino');
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
                                         //   reqTab(that,tipoDisp);


                                            }
                                        }
                                    });


                                that.$("#modal").modal('hide'); 
                            }else{
                            console.log("btnAlle invalid");  
                        }


                        });
                    break;
                }
                case "rfa_magazzino_sub_categorie":{
                    that.$("#tipi").empty();
                    console.log('rfa_magazzino new');
                   // app.functions.bsa_new(that,$row); 
                   that.$('.modal-title').text("Add Comunicazione");  
                   //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
                   modalF=
                       '<form id="mod" >'+
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
                               '<button type="button" id="btn" name="btn" class="btn btn-primary submit ">Add File</button>'+
                           '</div>'+ 
                       '</form >'
                   ;
                   that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);
                    that.$("#modal").modal('show'); 
                    that.$('#btn').click(function(e) {//add dalle modali
                        if(that.$("#mod").valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'doc/';

                            //var jsonObj = sendUrbans_formToJson(that);
                            var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                            form_data.append('action', 'add');
                            form_data.append('type', 'rfa_magazzino');
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
                    break;
                }
                case "ADM_Attrezzature_Categorie":{
                    that.$("#tipi").empty();
                    console.log('ADM_Attrezzature_Categorie new');
                   // app.functions.bsa_new(that,$row); 
                   that.$('.modal-title').text("Add Categoria Attrezature/Impianti");  
                   //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
                   modalF=
                        '<form id="mod" >'+
                            '<div  class="row ">'+

                               '<div class="form-group col-lg-10">'+
                                   '<label  id="lblDescrizione">Categoria</label>'+
                                   '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" >'+
                               '</div>'+
                                '<div class="form-group col-lg-2">'+
                                    '<label class="form-check-label" for="active">Attivo</label>'+
                                    '<input type="checkbox" class="form-control" name="active" id="active" checked>'+
                                    '</div>'+
                                '</div>'+ 
                           '<div class="row">'+
                           '<div class="form-group col-lg-6">'+
                               '<button type="button" id="btn" name="btn" class="btn btn-primary submit ">Add Categoria</button>'+
                           '</div>'+ 
                           '</div>'+
                       '</form >'
                   ;
                   that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);
                    that.$("#modal").modal('show'); 
                    that.$('#btn').click(function(e) {//add dalle modali
                        if(that.$("#mod").valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'servizi/';

                            //var jsonObj = sendUrbans_formToJson(that);
                            var form_data = new FormData($("#mod")[0]); 
                            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                            form_data.append('action', 'add');
                            form_data.append('type', 'adm_attrezzature_categorie');
                           
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
                    break;
                }
                
                
                default:{
                    that.$("#tipi").empty();
                    that.$("#tipi").append(
                        '<form class="registrationForm" id="registrationForm" method="post">'+ 
                        '<input type="hidden" class="form-control" name="id" id="id" >'+ 

                              '<div class="form-group">'+
                           '<label>Nome</label>'+
                           '<input type="text" class="form-control" name="name" id="name" placeholder="Nome" >'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label  id="lbldescription" for="description">Descrizione</label>'+
                            '<input type="text" class="form-control" name="description" id="description" placeholder="Descrizione">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label id="lblshortDescription" for="shortDescription">Descrizione breve</label>'+
                            '<input type="text" class="form-control" name="shortDescription" id="shortDescription" placeholder="Descrizione breve">'+
                        '</div>'+

                        '<div class="input_fields_wrap">'+ 
                        '</div>'+    
                       '<div class="form-group">'+
                             '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                            '<label class="form-check-label" for="exampleCheck1">Valido</label>'+
                         '</div>'+
                          '</div>'+
                         '<button type="submit" class="btn btn-primary submit">Submit</button>'+
                           '</form>'
                    );
                 
                   
                    that.$("#registrationForm").validate({

                        rules: {
                            name: {
                              required: true,
                              minlength: 2
                            }


                        },
                        messages: {
                            name: {
                              required: "Perfavore inserisci il nome",
                              minlength: "Il nome  deve contenere perlomeno 2 caratteri"
                            }
                        }/*,
                        submitHandler: function (form) {
                         alert("Validation Success!");
                         //  return true; // if you need to block normal submit because you used ajax
                        }*/
                    });
                }    
            }//end switch
            console.log("affanno!!");
        }//end set form
           
      
        //----------------------------------------------------------------------
        function setData (that,row){
        row = row || {
            id: '',
            name: '',
            valid: '',
            shortDescription: '',
            description: '',
            device1: '',
            device2: '',
            indirizzo: '',
            regione: 0,
            provincia: 0,
            cap: 0,
            comune: 0  /*,
            email:[{id:'',
            emailNome: '',
            email: ''}],
            telefoni:[{id:'',
            telefonoNome: '',
            telefonoNumero: ''}]*/
            }; // default row value
            console.log("row="+row);
            //----------------------------------------------------------------------------------------------
            if(app.global.nick_array.arr !== "DEPARTMENTS" || app.global.nick_array.arr!== "Ditte"){
               
                for (var name in row) {
                    console.log("title=" + name);
                    if(name=="description"){

                        that.$("#registrationForm").find('label[id="lbl' +name + '"]').html("Descrizione");
                        that.$("#registrationForm").find('input[id="' +name + '"]').attr( "placeholder", "Descrizione");
                    }
                    if(name=="shortDescription"){

                        that.$("#registrationForm").find('label[id="lbl' +name + '"]').html("Descrizione breve");
                        that.$("#registrationForm").find('input[id="' +name + '"]').attr( "placeholder", "Descrizione breve");
                    }
                  
                }
            }
            //---------------------------------------------------------------------------------------------------    
             
            for (var name in row) {
                if(name=="valid"){
                    that.$("#registrationForm").find('input[name="valid"]').prop("checked", row[name]);
                }else if(name==="telefoni")
                    
                    {
                      
                        console.log("telefoniL=" + row[name].length);
                        for ($i = 0; $i <row[name].length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+row[name][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+row[name][$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+row[name][$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                     //   '<label >Del</label>'+

                                    '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            );
                            $('.removeTel'+$iTel).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= $modal.find('input[name="telefoni['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="telefoni";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                                $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                               minlength: 6,
                                number: true,
                                
                                messages: {
                                  required: "Perfavore inserisci il numero di telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono  valido!"
                                }
                              });
                        
                            //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                            
                            //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                            //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                            //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                        }
                       
                    
                    }else if(name==="email" ){    
                    
                        for ($i = 0; $i <row[name].length; $i++) {
                            $iEmail=$i;
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+row[name][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+row[name][$i]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+row[name][$i]['emailNome']+'" placeholder="Nome Email">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                      '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            );
                            $('.removeEmail'+$iEmail).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= $modal.find('input[name="email['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="email";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                             $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                              });
                        
                        }
                    
                    
                    
                    
                    }else{
                       that.$("#registrationForm").find('input[name="' + name + '"]').val(row[name]); 
                       console.log('input[name=' + name + ']='+row[name]);
                    }
                
                
            }
            for (var name in row) {
               
                    
                    console.log('select[name=' + name + ']='+row[name])
                   that.$("#registrationForm").find('select[name="' + name + '"]').val(row[name]);
                
            }
    }  //setData       
        //----------------------------------------------------------------------                
        
        function showAlert(title, type) {
            $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
            setTimeout(function () {
            $alert.hide();
        }, 3000);
    }
        //----------------------------------------------------------------------  
        function showAlert1(title, type) {
        $alert1.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert1.hide();
        }, 3000);
    }
        
        //----------------------------------------------------------------------   
        if(app.global.nick_array.arr=="RFA_Servizi" | app.global.nick_array.arr=="rfa_magazzino_categorie" ){
            console.log(app.global.nick_array.arr);
        }else{
            var  that=this;
        
        if(!isNew){//update
         
           
        
        if(app.global.nick_array.data.valid==="1" | app.global.nick_array.data.valid===true){$active=true}else{$active=false}
        if(app.global.nick_array.data.tipologia_prodotto==="1" | app.global.nick_array.data.tipologia_prodotto===true){$tipo_prodotto=true}else{$tipo_prodotto=false}
        // if(app.global.nick_array.data.direct==="1" | app.global.nick_array.data.direct===true){$direct=true}else{$direct=false}
            if(!app.global.nick_array.data.config){
                //se non è impostato config con i campi variabili non posso ne gestire o caricare i prodotti!
                that.$('#addCsv').attr("disabled", true);
                that.$('#prodotti').attr("disabled", true);
            }   
            that.$('#id').val( app.global.nick_array.data.id);
            console.log(app.global.nick_array.data.valid+"=act="+$active)
            that.$('#valid').prop("checked", $active);
            //that.$('#tipo_prodotto').prop("checked", $tipo_prodotto);
            //that.$('#direct').prop("checked", $direct);
           
            that.$('#cap').val(app.global.nick_array.data.id_cap);
            that.$('#name').val( he.decode(app.global.nick_array.data.name));
            that.$('#cognome').val( app.global.nick_array.data.cognome);
            that.$('#indirizzo').val( app.global.nick_array.data.indirizzo);
            that.$('#settore').val( app.global.nick_array.data.settore);
            that.$('#piva').val( app.global.nick_array.data.piva);
            that.$('#ccia').val(app.global.nick_array.data.CCIA);
            that.$('#comune').val(app.global.nick_array.data.id_comune);
            that.$('#cap').val(app.global.nick_array.data.id_cap);
            that.$('#cat').val(app.global.nick_array.data.cat);
            that.$('#provincia').val(app.global.nick_array.data.id_provincia);
            that.$('#regione').val(app.global.nick_array.data.id_regione);
            that.$('#description').val(app.global.nick_array.data.description);
            that.$('#shortDescription').val(app.global.nick_array.data.shortDescription);
            that.$('#referente').val( app.global.nick_array.data.referente);
            that.$('#coordinatore').val( app.global.nick_array.data.coordinatore);
            that.$('#cf').val( app.global.nick_array.data.codice_fiscale);
           
            that.$('#id_area_servizio').val( app.global.nick_array.data.id_area_servizio);
            that.$('#centro_di_costo_cod').val( app.global.nick_array.data.centro_di_costo_cod);
            
            console.log("uppppdate"+app.global.nick_array.data.id_regione);
            
       
        //----------------------------------------------------------------------
        that.$('#email').val( app.global.nick_array.data.email);
            that.$('#telefono').val( app.global.nick_array.data.telefono);
            that.$('#device1').val( app.global.nick_array.data.device1);
            that.$('#device2').val( app.global.nick_array.data.device2);
            that.$("#submit").html(that.language.submit);  

        }//  if( !isNew)
        else{//create
            if ( that.$( "#generali" ).length ) {
 
                that.$( "#generali" ).show();
             console.log("generali show");
            }else{
                console.log("#generali non esiste");
            }
            if ( that.$( "#name" ).length ) {
 
                that.$( "#name" ).show();
             console.log("name show");
            }else{
                console.log("#name non esiste");
            }
            that.$('#id').val("");
            console.log("=act="+$active)
            that.$('#tipo_prodotto').prop("checked",true);
          //  that.$('#direct').prop("checked", false);
            that.$('#valid').prop("checked", false);
            that.$('#name').val( "");
            that.$('#cognome').val( "");
            that.$('#indirizzo').val( "");
            that.$('#comune').val( "");
            that.$('#cap').val( "");
            that.$('#cat').val( "");
            that.$('#provincia').val( "");
            that.$('#regione').val( "");
            that.$('#piva').val( "");
            that.$('#cf').val( "");
            that.$('#id_area_servizio').val("");
            that.$('#area_servizio').val("");
            that.$('#centro_di_costo_cod').val("");
            
            that.$('#email').val( "");
            that.$('#moduli').prop("disabled",true);
            that.$('#telefono').val( "");
            that.$('#description').val("");
            that.$('#shortDescription').val("");
            that.$('#addCsv').attr("disabled", true);
            that.$('#prodotti').attr("disabled", true);
            that.$('#categorie').attr("disabled", true);
            that.$('#device1').val( "");
            that.$('#device2').val( "");
            that.$("#submit").html(that.language.submit); 
           // that.$('#tabX a[href="#urbanistici"]').tab('show');
           
            
        }
        //setData(that,app.global.nick_array.data)          
        /** validate form **/
       
        
        this.$('#tabX a[href="#generali"]').tab('show');  
        this.$("#registrationForm").validate({
        
            rules: {
                name: "required",
                last_name: "required",
            //  codice: "required",
                codice_fiscale: {
                   required: true,
                   rangelength: [16, 16], 

                },
                role: "required"
                },
            messages: this.language.form_messages
        });
    }
        return this;
      
    },
    generali:function (event){
        console.log("generali="+event)
    },
    /** registration **/
    registration: function (event) {
        event.preventDefault();
 
        var API_URL = app.global.json_url + 'types/';
        var that = this;
        var jsonObj = this.registration_formToJson(that);

       

        /** POST USER **/
     
    
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
                    console.log(datap.data);
                    $mydata =JSON.parse(datap);
                    // $mydata =(datap);

                    console.log($mydata.message);
                    console.log($mydata.errorCode);
                   
                   
                    
                    //-------------------------------------------------------
                    if ($mydata.success){
                         app.routers.adminTecRouter.prototype.data_type_edit();
                        //showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
                        /*
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
                                    hrTable($mydata);
                                }
                            }
                        }
                        });*/
                       // $table.bootstrapTable('refresh',  setTab());
                        //  hrTable($mydata);
                    }else {
                         console.log(that);
                              console.log(this);
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
                },
                error: function (response,exception) {
           
                   // $mydata =JSON.parse(datap);
                    var testo='';
                    console.error("hr list load table error!!!");
                    if(response.status===0){
                       testo="Trouble connecting: check your connection and try again.";
                    }else{
                        testo= response.responseText;
                    }
                    bootbox.dialog({
                    title: that.language.error_message,
                    message: that.language.error_message +" = "+testo+" excp="+exception,
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
                    
                }
            });
       

        
    },

    /** render user form data to JSON obj **/
    registration_formToJson: function(that) {
      
        var $folder="";
        var data = {};
            
        that.$('#registrationForm').find('input[name]').each(
            function () {
                  console.log("che="+$(this).attr('name')+"---"+ $(this).prop("checked")) ; 
                if(  $(this).attr('name')==="valid" ) {
                 
                    if($(this).prop("checked")===true){
                        
                        data[$(this).attr('name')] = 1;
                    }else{
                       data[$(this).attr('name')] = 0; 
                    }
                 
                    
                }else{

                    data[$(this).attr('name')] = $(this).val();
                }     
            }
        );
            
        that.$('#registrationForm').find('select[name]').each(
        function () {
                console.log("select="+$(this).attr('name')+"---"+ $(this).val()) ; 
                if($(this).val()===null){
                    data[$(this).attr('name')] =""   
                }else if($(this).attr('name')==="tipo"){
                   console.log($(this).val());
                    data["tipo1"] = $(this).val();    
                
            }else{
                    data[$(this).attr('name')] = parseInt($(this).val());    
                }
                

        });
           
          
            
            console.log("uche="+ that.$('#registrationForm').find('input[name="valid"]').prop("checked")) ; 
            console.log("cherow="+ data.id+" - "+data.valid+"---"+_.keys(data)) ; 
       
     console.log(data) ;  
       
        //---------------serialize form-----------------------------------------------
          //  var data = {};

    function buildInputObject(arr, val) {
        if (arr.length < 1)
            return val;  
            var objkey = arr[0];
        if (objkey.slice(-1) == "]") {
            objkey = objkey.slice(0,-1);
        }  
        var result = {};
        if (arr.length == 1){
          result[objkey] = val;

        } else {
          arr.shift();
          var nestedVal = buildInputObject(arr,val);
          result[objkey] = nestedVal;

        }
        return result;
    }

 $.each(that.$('#registrationForm').serializeArray(), function() {
 //$.each(row, function() {
    var val = this.value;
    var c = this.name.split("[");
    var a = buildInputObject(c, val);
    $.extend(true, data, a);
  });
    
   var typeTipoProd= data['tipo_prodotto']===0 ? "0" : "1";
    data['tipo_prodotto']=typeTipoProd; 
    var typeValid= data['valid']===0 ? "0" : "1";
    data['valid']=typeValid; 
   console.log(data);
    
        //-------------------------------------------------------------------------     
           
            var typeId =data['id']; 
            var typej= typeId ? 'update' : 'add';
             
            var jsonObj = {};
            jsonObj.action = typej;
            jsonObj.type = app.global.nick_array.arr;
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.data=data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            if(app.global.nick_array.arr==="DEPARTMENTS"){
                if(data.name===$folder){
                  
                }else{
                    jsonObj.oldFolder=$folder; 
                }
                
            }
            
             
             jsonObj = JSON.stringify(jsonObj);
        return jsonObj;
    

    },

    /** destroy view and unbind all event **/
    destroy_view: function() {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.registrationView = null;
    }
});
return app.views.data_type_editType;
});

                
