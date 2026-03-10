/**
 * nicRap2 1.0
 * 
 * Copyright (c) 2009-2016 www.nicolarapuano.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.nicolarapuano.com/license_freeware
 * To use it on other terms please contact us: info@nicolarapuano.com
 *
 */
ver='';
 



function rfa_fornitori(that,$row){
     
  console.log($row);
  console.log(that);
  console.log(app.global.nick_array);
 
  
    // that=this;
    var $headers = {
        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
        "username" : app.global.tokensCollection.first().get("username"),
        "lang" : app.global.languagesCollection.at(0).get("lang"),
        "Content-Type": "application/json"
        };
    var isNew=app.global.nick_array.isNew;  
    var API_URL = app.global.json_url + 'types/';
    var $iEmail=0;
    var $iTel=0;
    var $iReferente=0;
    var $fornitore;
  
  
               
    varForm=  
    '<form class="registrationForm" id="registrationForm" method="post">'+
        '<input type="hidden" class="form-control" name="id" id="id">'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-6">'+
                    '<label id="lblname" for="name">Nome Ditta</label>'+
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Ditta" >'+
                '</div>'+
                '<div class="form-group col-lg-3">'+
                    '<label id="lblname" for="piva">Partita IVA</label>'+
                    '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" >'+
                '</div>'+
                '<div class="form-group col-lg-3">'+
                    '<label id="lblccia" for="ccia">C.C.I.A.</label>'+
                    '<input type="text" class="form-control" name="ccia" id="ccia" placeholder="C.C.I.A." >'+
                '</div>'+
                '<div class="form-group col-lg-10">'+
                    '<label  id="lblindirizzo" for="url">URL</label>'+
                    '<input type="text" class="form-control" name="url" id="url" placeholder="indirizzo URL sito WEB ">'+
                '</div>'+
                 '<div class="form-group col-lg-2">'+
                    '<label id="lblconfig" for="config">Config. campi variabili</label>'+
                    '<div class="form-group " >'+
                        '<button type="button" id="config" name="config" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" data-tipo="AddCatCsv" data-title="Add campi variabili ai prodotti "  title="Add campi variabili ai prodotti">Config.</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="form-group col-lg-3">'+
                    '<label id="lblsettore" for="settore">Tipologia Prodotti</label>'+
                    '<select  name="tipologia" id="tipologia"  class="form-control" ></select>'+
                '</div>'+
                '<div class="form-group col-lg-3">'+
                    '<div class="form-group ">'+
                        '<label  id="lblprovincia" for="tipo_acquisto">Tipologia Acquisto</label>'+
                       '<select  name="tipo_acquisto" id="tipo_acquisto"  class="form-control" ></select>'+
                    '</div>'+
                    '<!--input type="checkbox" class="form-check-input col-lg-1" name="direct" id="direct" title="Acquisto diretto dal portale del Fornitore da  parte dei servizi">'+
                    '<label class="form-check-label" for="direct" > Acquisto dal Fornitore </label>'+
                    '<input type="checkbox" class="form-check-input col-lg-1" name="online" id="online" title="Acquisto diretto dal portale del Fornitore da  parte dell\' ufficio">'+
                    '<label class="form-check-label" for="online" > Acquisto online </label-->'+
             
                '</div>'+
               
                '<div class="form-group col-lg-2">'+
                    '<label id="lblccia" for="ccia">Categorie</label>'+
                    '<div class="form-group " >'+
                        '<button type="button" id="categorie" name="categorie" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Gestione Categorie</button>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label id="lblccia" for="ccia">Prodotti</label>'+
                    '<div class="form-group " >'+
                        '<button type="button" id="prodotti" name="prodotti" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Gestione Prodotti</button>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label id="lblccia" for="addCsv">Data CSV</label>'+
                    '<div class="form-group " >'+
                        '<button type="button" id="addCsv" name="addCsv" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" data-tipo="AddCatCsv" data-title="Add Categorie/Prodotti al Fornitore da file csv"  title="Add Categorie/Prodotti al Fornitore da file csv">Load CSV</button>'+
                    '</div>'+
                '</div>'+

            '</div>'+
            
            '<div class="row">'+
                '<div class="form-group col-lg-12">'+
                    '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>'+
                    '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo">'+
                '</div>'+
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
            '<!--div class="row">'+
                '<div class="form-group col-lg-12">'+
                    '<label  id="lblemailInvioOrdine" for="emailInvioOrdine">Email invio ordine * (separate da ;)</label>'+
                    '<input type="text" class="form-control" name="emailInvioOrdine" id="emailInvioOrdine" placeholder="Email invio ordine: info@email.it;admin@email.it">'+
                '</div>'+
                 
            '</div-->'+    
            '<div class="row ">'+
                '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                    '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>'+
                    //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                    '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                '</div>'+

            '</div>'+
            '<div id="email" name="email[]">';
          that.$("#tipi").append(varForm);
             var el = document.getElementById('tipi');
//el.innerHTML = 'Hello World!';
            //----------------------------------------------------------------------
            //
            email();
            //  fornitore($row.id);
   
                //    console.log($fornitore);
                function  fornitore(id){
          
           
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "rfa_fornitore";
            jsonObj.id = id;
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
                var  dati=$mydata.data[0];
                console.log(dati);
                   $fornitore=dati;
                   email();
               }
           });
       }       
            function email(){
            // if(!isNew && $fornitore.email.length>0){ 
            if(!isNew && app.global.nick_array.data.email.length>0){ 
                    
                // for ($i = 0; $i <$fornitore.email.length; $i++) {
                    for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {    
                        $iEmail=$i;
                        if(app.global.nick_array.data.email[$i]['emailNome']==='emailInvioOrdine'){
                                that.$("#emailInvioOrdine").val(app.global.nick_array.data.email[$i]['email']);
                           }else{
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

                                '</div>';
                   
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
            }
           
           telefoni();
        }       
           function telefoni(){
                 //----------------------------------------------------------------------
            varForm= 
            '</div>'+
            '<div class="row ">'+
                '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                    '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>'+
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
               referenti()
           }    
          
            function referenti(){      
             //-----------------------referenti ditte RFA----------------------------------------------------------- 
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
                //if(!isNew && $fornitore.referente.length>0){ 
                     if(!isNew && app.global.nick_array.data.referente.length>0){       
                    
                        for ($i = 0; $i <app.global.nick_array.data.referente.length; $i++) {
                            $iReferente=$i;
                           //if(){}
                          
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+app.global.nick_array.data.referente[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-2">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+app.global.nick_array.data.referente[$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-2">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+app.global.nick_array.data.referente[$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+app.global.nick_array.data.referente[$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                      '<div class="form-group col-lg-2">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][telefono]" id="referente['+$i+'][telefono]" value="'+app.global.nick_array.data.referente[$i]['telefono']+'" placeholder="Telefono" >'+
                                    '</div>'+
                                    
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][email]" id="referente['+$i+'][email]" value="'+app.global.nick_array.data.referente[$i]['email']+'" placeholder="Email">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                      '<a class="removeReferente'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            ;
                        that.$("#registrationForm").append(varForm);     
                        
                     that.$('.removeReferente'+$iReferente).click(function(e) {
                          alert("Sei sicuro di voler eliminare il referente fornitore?");
                                $idx= $(this).attr("idx");
                                $idxi= that.$("#registrationForm").find('input[name="referente['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="referente_rfa_fornitori";
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
                }//end referenti fornitori    
             endForm();
            }
            
              function endForm(){
            $varNote=""; 
            $varLogo="";
                 
            if(!isNew ){ 
               $varNote=app.global.nick_array.data.note 
               $varLogo=app.global.nick_array.data.logo_link 
            }else{

            }
             var imgDis="";    
            varForm= 
            '</div>'+    
                '<div class="row">'+
                    '<div class="form-group >'+
                        '<label for="note">Note</label>'+
                        '<textarea type="textarea" class="form-control" name="note" id="note" " rows="3">'+$varNote+'</textarea>'+
                    '</div>'+
                '</div>'+  
                '<div class="form-group col-lg-4">'+
                    '<div class="row">'+
                        '<div class="form-group col-lg-12">'+
                            '<label for="file">Seleziona logo del fornitore</label>'+
                            '<input type="file" name="file" id="file" accept="image/*" '+imgDis+'>'+
                            '<p class="help-block"></p>'+
                        '</div>'+
                        '<div id="preview" class="form-group col-lg-12">'+
                            '<img id="blah" src=".\\css\\img\\filed.png" />'+
                        '</div>'+
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
                 
                   that.$('#blah').attr('src', $varLogo);
              
              //-----------------------------------------------------------------------------------
              }
                $.validator.addMethod("username_regex", function(value, element) {   
                   return this.optional(element) || /^\b[a-z0-9\-_àòèù.' ]{3,60}$/i.test(value); 
                    // return this.optional(element) || /^[a-z0-9\.\-_]{3,30}$/i.test(value);   
                }, "Perfavore seleziona solo i caratteri consentiti!");  
                
                $.validator.addMethod("emails", function(value, element) {  
                    $ev=$evN=0;
                    $vT=false;
                    $emailsValue=value.split(";");
                    console.log($emailsValue);
                    $.each($emailsValue, function( index, value ) {
                       console.log( index + ": " + value );
                        filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (filter.test(value)) {
                         console.log( index + ":email valida= " + value );
                        $ev=1;
                        }
                        else
                          {
                             console.log( index + ":email NON valida= " + value );
                             //return false;
                             $evN=1;
                          }

                    });
                    if  ($ev==0 || $evN==1){$evT=false;}else{$evT=true;}
                     
                   return $evT
                }, "Perfavore insrisci una e-mail corretta!");  
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
                        
                         emailInvioOrdine: {
                          required:true,
                         emails:true 
                        
                                
                        }
                    },
                    messages: {
                        name: {
                          required: "Perfavore inserisci il nome dellla Ditta",
                          minlength: "Il nome della Ditta deve contenere perlomeno 3 caratteri"
                        },
                         emailInvioOrdine: {
                          required: "Perfavore inserisci e-mail per invio ordine"
                          
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
            var $selTipologia=that.$("#tipologia");
            var $selTipoAcquisto=that.$("#tipo_acquisto");
           
            regioni();
            tipologia();
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
            jsonObj.type ="province";
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
           //-------------------------------Tipologia Prodotti----------------------------------------
           
            function  tipologia(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "RFA_Tipologie_Fornitura";
            
            if(isNew){
                jsonObj.tipologia = parseInt($selTipologia.val());
           }else{
                jsonObj.tipologia= parseInt($row.tipProd);
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
                   $selTipologia.empty();
                   $aa=$mydata.data;
                   $selTipologia.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                         if($aa[i]["id"]!=='5' && $aa[i]["id"]!=='10' && $aa[i]["id"]!=='11' && $aa[i]["id"]!=='12'){//5->servizi approvvigionamento,10 def Senza,11 DEF CON, 12 Acquisto diretto
                           $selTipologia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>'); 
                       }
                        
                      //$selTipologia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selTipologia.val();//seleziona pr firenze 33
                }else{
                     $selTipologia.val(parseInt($row.id_tip_prod));//seleziona pr firenze 33
                     
                }
                
                }
            });
            tipoAcquisto();
        }     
        function  tipoAcquisto(){  
              var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "RFA_Tipologie_Acquisto";
            
            
            
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
                   $selTipoAcquisto.empty();
                   $aa=$mydata.data;
                   $selTipoAcquisto.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        $selTipoAcquisto.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>'); 
                    
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selTipoAcquisto.val();
                }else{
                     
                        $selTipoAcquisto.val(parseInt($row.id_tip_acquisto));
                     
                }
                
                }
            });
            
           
            
        }   
        
        if(isNew){
            that.$("#url").val();
        }else{
            that.$("#url").val($row.url);

        }
        
        
        
        //-------------------------------------event-------------------------------------------------------------------
            that.$("#file").change(function(){
           
                readURL(this);



            });
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#blah').attr('src', e.target.result);

                    }

                   reader.readAsDataURL(input.files[0]);


                    var file_data = $("#file").prop("files")[0]; // Getting the properties of file from file field
                    var form_data = new FormData();
                    form_data.append("file", file_data); 
                    form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
                    form_data.append("type","rfa_fornitore"); 
                    form_data.append("action","update");
                    
                    form_data.append("par","logo");
                    form_data.append("id_forn",$row.id);
                    
                    console.log(file_data);
                     $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                        //"Content-Type": "application/json"
                    };
                    $.ajax({
                        url: app.global.json_url + 'rfa/',
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
                }

            }
          
    
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
            //--------------------referenti  add-------------------------------------------
            that.$('.referente-Plus').click(function () {
                $iReferente = $iReferente + 1;
                $i = $iReferente
                
                $("#referente").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="referente['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-2">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" placeholder="Nome Referente " require>'+
                        '</div>'+
                         '<div class="form-group col-lg-2">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" placeholder="Cognome Referente " require>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" placeholder="Mansione">'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][telefono]" id="referente['+$i+'][telefono]"  placeholder="Telefono" >'+
                        '</div>'+

                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][email]" id="referente['+$i+'][email]"  placeholder="Email">'+
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
       
            });
            
            that.$('#categorie').click(function () {
                console.log("categorie");
                rfa_fornitori_categorie(that,$row);
            }); 
            that.$('#prodotti').click(function () {
                console.log("prodotti");
                console.log(that);
                 console.log($row);
                rfa_fornitori_prodotti($row.id);
            }); 
            
            that.$('#addCsv').click(function () {
               
                isNew=true;
                isCsv=true;
            console.log(app.global.nick_array);
             $configu =JSON.parse(app.global.nick_array.data.config);
            $str=$configu.campi_csv;//oggetto array
          //    console.log($str);
        
            $arLab=[];
            $arField=[];
                $label= _.each($str,function(num,key){
                //console.log(num.label);
                $arLab[key]=num.label;
                $arField[key]=num.field;
            });
          
           console.log($arLab);
           console.log($arField);
            $str1=_.values($arLab).toString();
          
            $str2 =$str1.replaceAll(",",";");//lista campi csv con separatore giusto in forma testuale
           
            that.$("#modal").find('.modal-title').text('Add Categorie/Prodotti al fornitore '+app.global.nick_array.data.name+' con file CSV');
            
            varForm='<div class="row">'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Formato campi:<br>'+$str2+'</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+ 
                        '<div class="form-group col-lg-6">'+

                            '<label  id="lblCat" for="allegato">Seleziona un file</label>'+
                           // '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato"  accept="application/vnd.ms-excel,.csv">'+
                             '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+
                        '</div>'+
                    '</div>'+
                    '<div id="loader"></div>'; 
            varForm1='<button type="button" id="addCsvCatSub" class="btn btn-primary submit">Submit</button>';
            that.$("#modAlle").empty();
            that.$("#modAlle").append(varForm); 
            that.$(".modal-footer").empty();
            that.$(".modal-footer").append(varForm1);  
            
            
            that.$("#modAlle").validate(); //sets up the validator
            $("input[name=\"allegato\"]").rules( "add", {
                required: true,
             //  extension: "csv",
                //number: true,
                // minlength: 2,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            document.getElementById("loader").style.display = "none";
            that.$("#modal").modal('show'); 
            
            that.$('#addCsvCatSub').click(function(e) {
           
                if($("#modAlle").valid()){
                      console.log($('#allegato')[0].files[0].type);
                console.log("click add CSV");
                   document.getElementById("loader").style.display = "block"; 
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'rfa/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#modAlle")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'rfa_fornitore_catpro_csv');
                form_data.append('id_fornitore', app.global.nick_array.id);
                form_data.append('allegatoTipo', 'allegato');
                             
                
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
                       document.getElementById("loader").style.display = "none";
                        //-------------------------------------------------------
                        if ($mydata.success){
                           bootbox.dialog({
                                            title: "Add Categorie/Prodotti al fornitore da file CSV",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                         console.log("call");
                                                        that.$("#modal").modal('hide'); 
                                                    }
                                                }
                                            }
                                        });
                            
                         
                            
                          
                        }
                    }    
                });
                    
                }
            });  
                
        });
            
            that.$('#config').click(function () {
               
        // isNew=true;
        // isCsv=true;
        var $str=[];
               
        var $link_Txt,$link_Body,$link_Valid='';
                 
        if(app.global.nick_array.data.config){
                    $configu =JSON.parse(app.global.nick_array.data.config);
                    $nota_ordine=$configu.nota_ordine;// nota all'ordine del fornitore
                    $link_indicazione=$configu.link_indicazione;// nota all'ordine del fornitore
                    $str1=$configu.campi_variabili;// array di oggetti
                   
                    $.each( $str1, function( key, value ) {
                   
                     
                        $str[key]=value.label;
                   
                    }); 
                    if($link_indicazione){
                         $.each( $link_indicazione, function( key, value ) {
                        console.log(key);
                      console.log(value);
                      if(value.label=='linkTxt'){$link_Txt=value.field }
                      if(value.label=='linkValid'){
                          if(value.field=='on'){
                              $link_Valid="checked";
                          }else{
                              $link_Valid=""; 
                          }
                         
                         
                      }
                      if(value.label=='linkBody'){$link_Body=value.field }
                      //  $str[key]=value.label;
                   
                    });
                      
                  }else{
                       $link_Txt='';
                   $link_Valid="";
                   $link_Body='';
                  }
                   
                   
                   
               }else{
                   $str=[];
                   $nota_ordine='';
                   $link_Txt='';
                   $link_Valid="";
                   $link_Body='';
                   
               }
            console.log(app.global.nick_array);
             
              console.log($str);
            console.log(_.isObject($str));
            $str1=_.values($str).toString();
             console.log($str1);
            $str2 =$str1.replaceAll(",",";");//lista campi csv con separatore giusto in forma testuale
           
            that.$("#modal").find('.modal-title').text('Configurazione  del fornitore '+app.global.nick_array.data.name);
            
            varForm='<div class="panel panel-default">'+
                        '<div class="panel-heading"><b>Nomi campi variabili separati da virgola:  Campo1,Campo2</b></div>'+
                        '<div class="panel-body">'+
                            '<div class="row">'+ 
                        '<div class="form-group col-lg-12" >'+

                            '<textarea  name="campivar" class="form-input col-lg-12" id="campivar" row="3">'+$str+'</textarea>'+

                        '</div>'+
                    '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading"><b>Nota all\'ordine del fornitore</b></div>'+
                        '<div class="panel-body">'+
                            '<div class="row">'+ 
                                '<div class="form-group col-lg-12" row="3">'+

                                    '<textarea  name="notaOrdine" class="form-input col-lg-12" id="notaOrdine" >'+$nota_ordine+'</textarea>'+

                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading"><b>Indicazione composizione ordine</b></div>'+
                        '<div class="panel-body">'+
                            '<div class="row">'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<div class="checkbox">'+
                                        '<label><input type="checkbox"  name="valid" id="valid" '+$link_Valid+'>Visualizza link</label>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<label  ">Testo link</label>'+
                                    '<input  type="text" name="txtLink" id="txtLink"  class="form-control" value="'+$link_Txt+'">'+
                                '</div>'+
                            '</div>'+    
                            '<div class="row">'+
                                '<div class="form-group col-lg-12" >'+

                                    '<textarea  name="bodyLink" class="form-input col-lg-12" id="bodyLink" row="6">'+$link_Body+'</textarea>'+

                                '</div>'+
                            '</div>'
                        '</div>'+
                    '</div>';
            varForm1='<button type="button" id="addCampivar" class="btn btn-primary submit">Submit</button>';
            that.$("#modAlle").empty();
            that.$("#modAlle").append(varForm); 
            that.$(".modal-footer").empty();
            that.$(".modal-footer").append(varForm1);  
          
            
            that.$("#modAlle").validate(); //sets up the validator
            $("input[name=\"campivar\"]").rules( "add", {
                required: true,
             //  extension: "csv",
                //number: true,
                // minlength: 2,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            
            that.$("#modal").modal('show'); 
            
            that.$('#addCampivar').click(function(e) {
            
                console.log("click add Campivar");
                if($("#modAlle").valid()){
                   
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'rfa/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#modAlle")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'rfa_fornitore_campivar');
                form_data.append('id_fornitore', app.global.nick_array.id);
               
                             
                
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
                       
                      var  $mydata =JSON.parse(datap);
                       
                        //-------------------------------------------------------
                        if ($mydata.success){
                           bootbox.dialog({
                                            title: "Add campi variabili al fornitore",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                      //   console.log( ($mydata.data.config));
                                                        // console.log(app.global.nick_array.data.config);
                                                        that.$("#modal").modal('hide');
                                                        
                                                         app.global.nick_array.data.config=$mydata.data.config;
                                                      //   app.routers.router.prototype.data_type_editView({});
                                                    }
                                                }
                                            }
                                        });
                            
                         
                            
                          
                        }
                    }    
                });
                    
                }
            });  
                
        });
            
            that.$('#csv').click(function () {i
                console.log("csv");
                    // console.log($('.file-input')[0].files[0].type);
                if($("#modAlle").valid()){
                   
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'rfa/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#modAlle")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'rfa_fornitore_catpro_csv');
                form_data.append('id_fornitore', app.global.nick_array.id);
                form_data.append('allegatoTipo', 'allegato');
                             
                
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
                           bootbox.dialog({
                                            title: "Add Prodotti/Categorie al fornitore da file CSV",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                        
                                                      //  fornitore_categorie();
                                                    }
                                                }
                                            }
                                        });
                            
                         
                            
                          
                        }
                    }    
                });
                    
                }
            });  
      
                
       
            
    }//end rfa fornitori-----------------------------------------------------------------------------
function rfa_fornitori_categorie(that,$row){
     app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" >Categorie</li>'
                });
     console.log(app.global.breadcrumb) ;
     that.$( ".breadcrumb" ).empty();
    for(i=0; i<app.global.breadcrumb.length; i++){
            that.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb']);
        }
    var API_URL = app.global.json_url;
    var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
    };
    var varForm='';
    that.$("#tipi").empty();
    console.log('rfa_fornitori_categorie')
                
          
        varForm=  
             '<form class="registrationForm" id="registrationForm" method="post">'+

                 '<input type="hidden" class="form-control" name="id" id="id">'+ 
                 '<div class="row">'+
                    '<p class="toolbar">'+
                        '<div class="form-group col-lg-3">'+
                            '<button type="button" id="addCat" class="btn btn-primary col-lg-12" style="background-color:#ffc108;"  data-tipo="addCat" data-title="Add Categoria al Fornitore"  title="Add Categoria al Fornitore">Add Categoria al Fornitore</button>'+ 
                        '</div>'+ 
                        '<!--div class="form-group col-lg-3">'+
                            '<button type="button" id="addCatCsv" class="btn btn-primary col-lg-12" style="background-color:#ffc108;"  data-tipo="AddCatCsv" data-title="Add Categoria al Fornitore da file csv"  title="Add Categoria al Fornitore da file csv">Add Categoria al Fornitore da file csv</button>'+ 
                        '</div-->'+        
                        '<span class="alert"></span>'+
                    '</p>'+
                    '<table id="table"> </table>'+
                '</div>'+
            '</form>';
           
        that.$("#tipi").append(varForm);
     
      
       
       var catPro='';
        var isNew=true;
        var isCsv=false;
        var titleModal='';
        var $table=that.$("#table"); 
        fornitore_categorie();
        function  fornitore_categorie(){
            var jsonObj = {};
            
            jsonObj.type="fornitore_categorie";
            jsonObj.id_fornitore = app.global.nick_array.id;
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       
                        $('#modal').modal('hide');
                        hrfTable($mydata);
                    
                    }
                   
                }  
            });
       }    
        function  hrfTable(my){
            console.log(my.data);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter1;
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
         
        
       
        that.$('.removeCat--').on('click',function ( row, $element, field) {
            console.log($("i").parentsUntil("tbody").children("tr"));
            idPro= $element.id;
            catPro= $element.name;
            descrPro= $element.descrizione;
            
        });
        } 
        function actionFormatter1() {
        
            return [
                '<a  href="javascript:" class="updateCat" title="Update Item"><i class="glyphicon glyphicon-edit "></i></a>&emsp;&emsp;',
                '<a  href="javascript:" class="removeCat" title="Rimuovi Categoria dalla lista"><i class="glyphicon glyphicon-remove "></i></a>&emsp;&emsp;'

            ].join('');
        }
       
        that.$('#addCat').click(function(e) {
           
           
            isNew=true;
            isCsv=false;
            
            var button  = $(event.currentTarget); // Button that triggered the modal 
            var tipoDisp= button.data('tipo');
            console.log(tipoDisp);
            
            that.$("#modal").find('.modal-title').text('Add Categoria');
            
            varForm='<div class="row">'+
                    '<div class="form-group col-lg-6">'+
                        '<label  id="lblCat" for="categoria">Categoria</label>'+
                        '<input  type="text" name="categoria" id="categoria"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-lg-6">'+
                        '<label  id="lblDescr" for="descrizione">Descrizione</label>'+
                        '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+
                    '</div>'+
                    '</div>';
            varForm1='<button type="button" id="addCatSub" class="btn btn-primary submit">Submit</button>';
                    
            that.$("#modAlle").empty();  
            that.$(".modal-footer").empty();
            that.$(".modal-footer").append(varForm1);  
            that.$("#modAlle").append(varForm); 
            that.$("#modAlle").validate(); //sets up the validator
            $("input[name=\"categoria\"]").rules( "add", {
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
            
            that.$('#addCatSub').click(function(e) {
             
                   
                if($("#modAlle").valid()){
                  
                }
                
                
                  var listForn=_.map(_.pluck(that.$("#table").bootstrapTable('getData'), 'name'), function(v){ return v.toLowerCase(); });
            if(isNew && !isCsv){
            if(isNew){
            if(_.size(listForn)){
                
                if(_.contains(listForn,that.$("#categoria").val().toLowerCase())){
                    alert(" Categoria esistente!");
                    return false; 
                }else if(that.$("#categoria").val()==="" || that.$("#categoria").val()===null){
                    alert(" Inserire nome Categoria!"); 
                    return false; 
                }
            } else{
                if(that.$("#categoria").val()==="" || that.$("#categoria").val()===null){
                alert(" Inserire nome Categoria!"); 
                return false; 
            }
                
            }       
        }        
              
                  console.log(e);
                var jsonObj = {};
                
                jsonObj.type="rfa_fornitore_categorie";
                
                jsonObj.id_fornitore = app.global.nick_array.id;
                jsonObj.categoria = that.$("#categoria").val();
                jsonObj.descrizione =that.$("#descrizione").val();
                jsonObj.action = isNew?"add":"update";
                jsonObj.id_forn_categoria =idPro;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                       if ($mydata.success){
                        $myData=$mydata
                       fornitore_categorie();
                    
                    }
                   }           
                });
         }          
            });
        });//addCat
        
    
        that.$('#addCatCsv').click(function(e) {
            isNew=true;
            isCsv=true;
            
            that.$("#modal").find('.modal-title').text('Add Categorie con file CSV');
            
            varForm='<div class="row">'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lblCat" for="allegato">Seleziona un file</label>'+
                            '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato"  >'+

                        '</div>'+
                    '</div>'; 
            varForm1='<button type="button" id="addCsvCatSub" class="btn btn-primary submit">Submit</button>';
            that.$("#modAlle").empty();
            that.$("#modAlle").append(varForm); 
            that.$(".modal-footer").empty();
            that.$(".modal-footer").append(varForm1);  
            
            
            that.$("#modAlle").validate(); //sets up the validator
            $("input[name=\"allegato\"]").rules( "add", {
                required: true,
               extension: "csv",
                  //number: true,
                  // minlength: 2,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            
            that.$("#modal").modal('show'); 
            
            that.$('#addCsvCatSub').click(function(e) {
             //console.log($('#allegato')[0].files[0].type);
                console.log("click add CSV");
                if($("#modAlle").valid()){
                   
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'rfa/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#modAlle")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'rfa_fornitore_categorie_csv');
                form_data.append('id_fornitore', app.global.nick_array.id);
                form_data.append('allegatoTipo', 'allegato');
                             
                
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
                           bootbox.dialog({
                                            title: "Add Categorie al fornitore da file CSV",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                        
                                                        fornitore_categorie();
                                                    }
                                                }
                                            }
                                        });
                            
                         
                            
                          
                        }
                    }    
                });
                    
                }
            });  
                
        });
            
     
            
        var idPro="";
       
        window.actionEvents = {
            
            'click .updateCat': function (e, value, row,index) {
                console.log(value); 
                console.log(row); 
                console.log(index); 
                idPro=row.id
                catPro= row.name;
                descrPro= row.descrizione;
                isNew=false;
                isCsv=false;
                varForm='<div class="row">'+
                            '<div class="form-group col-lg-6">'+
                            '<label  id="lblCat" for="categoria">Categoria</label>'+
                            '<input  type="text" name="categoria" id="categoria"  class="form-control" >'+
                            '</div>'+
                            '<div class="form-group col-lg-6">'+
                                '<label  id="lblDescr" for="descrizione">Descrizione</label>'+
                                '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+

                            '</div>'+
                        '</div>';
                     
                    
                varForm1='<button type="button" id="upCatSub" class="btn btn-primary submit">Submit</button>';
                that.$("#modal").find('.modal-title').text('Update Categoria');   
                that.$("#modAlle").empty(); 
                that.$("#modAlle").append(varForm);  
                that.$(".modal-footer").empty();
                that.$(".modal-footer").append(varForm1); 
                
                that.$("#modAlle").validate(); //sets up the validator
                $("input[name=\"categoria\"]").rules( "add", {
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
                
                that.$("#categoria").val(catPro);
                that.$("#descrizione").val(descrPro);
                that.$('#upCatSub').click(function(e) {
             
                  
                    if($("#modAlle").valid()){
                        var jsonObj = {};
                
                        jsonObj.type="rfa_fornitore_categorie";

                        jsonObj.id_fornitore = app.global.nick_array.id;
                        jsonObj.categoria = that.$("#categoria").val();
                        jsonObj.descrizione =that.$("#descrizione").val();
                        jsonObj.action = "update";
                        jsonObj.id_forn_categoria =idPro;
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);

                        $.ajax({
                            url:API_URL + 'rfa/',
                            type:'post',
                            headers : $headers,
                            data: jsonObj,
                            dataType : 'text',
                            success: function (json) {
                               $mydata =JSON.parse(json);
                               if ($mydata.success){
                                $myData=$mydata
                               fornitore_categorie();

                            }
                           }           
                        });
                    }
                });
            },
            
            'click .removeCat': function (e, value, row,index) {
                  var jsonObj = {};
            if (confirm('Sei sicuro di voler rimuovere questa Categoria dal Fornitore?')) {
                jsonObj.type="fornitore_categorie";
                jsonObj.id_fornitore = row.id_fornitore;
                jsonObj.id_forn_categoria =row.id;

                jsonObj.action = "del";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                        fornitore_categorie();
                   }           
                });
            }
            }
        }
      
    
       } 
function rfa_fornitori_prodotti($id){ 
 that=this;
   
    app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" >Prodotti</li>'
                });
     console.log(app.global.breadcrumb) ;
     that.$( ".breadcrumb" ).empty();
    for(i=0; i<app.global.breadcrumb.length; i++){
            that.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb']);
        }
           
    var API_URL = app.global.json_url;
    var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
    };
    that.$("#tipi").empty();
    console.log('rfa_fornitori_prodotti');
                
         
    varForm=  
    '<form class="registrationForm" id="registrationForm" method="post">'+
'<div class="row">'+   
        '<p class="toolbar">'+
            '<button type="button" id="addProd" class="btn btn-default"   data-title="Add Prodotto al Fornitore"  title="Add Prodotto al Fornitore">Add Prodotto al Fornitore</button>'+ 
            //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
            '<span class="alert"></span>'+
            '<span class="totProdotti"></span>'+
        '</p>'+
        '<label  id="lblTot" ></label>'+
        '<table id="table"> </table>'+
    '</div>'+
       '</form>'
           ;
                      
  

      that.$("#tipi").append(varForm);
        var isNew=true;
        var $table=that.$("#table"); 
        var $selCategoria;
        var $selIVA; 
        fornitore_prodotti();
       
        function  fornitore_prodotti(){
            var jsonObj = {};
            
            jsonObj.type="fornitore_prodotti";
            jsonObj.id_fornitore = $id;
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       
                        $('#modal').modal('hide');
                        hrfTable($mydata);
                        app.global.nick_array.tab=$mydata.tab;
                    console.log( app.global.nick_array.tab);
                   
                     that.$("#tipi").append(modal_form());
                     validatorModale();
                       fornitore_categorie();
                       prodotti_iva();
                    }
                   
                }  
            });
       }    
        function  hrfTable(my){
            console.log(my.data);
           if(my.data.length!==0){
            $.each( my.tab, function( key, value1 ){
                if(value1["formatter"]=="imageFormatter"){
                value1["formatter"]=imageFormatter;
            }
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter1;
                }
            }); 
                
            $table.bootstrapTable('destroy');
                   
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns:true,
                showRefresh:true,  
                search:true,
                showPaginationSwitch:true,
                pagination:true
            });
            that.$("#lblTot").html('Ci sono '+my.data.length+' prodotti'); 
        }
        } 
        function actionFormatter1() {
        
            return [
                '<a  href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit updateProd"></i></a>&emsp;&emsp;',
                '<a  href="javascript:" title="Rimuovi Prodotto dalla lista"><i class="glyphicon glyphicon-remove removeProd"></i></a>&emsp;&emsp;'

            ].join('');
        }
        function imageFormatter(value, row) {
            return '<img src="'+value+'" />';
        }
            
      
   
       
    function fornitore_categorie(){
        $selCategoria=that.$("#categoria"); 
        console.log("ceso2");
        var jsonObj = {};
            
        jsonObj.type="fornitore_categorie";
        jsonObj.id_fornitore = $id;

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "list";


        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);

        $.ajax({
            url:API_URL + 'rfa/',
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (datap) {
                $mydata =JSON.parse(datap);
                $selCategoria.empty();
                $aa=$mydata.data;
                $selCategoria.append('<option value="0"></option>');
                $.each($aa, function(i, value) {
                    $selCategoria.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                });

            }  
        });
    }    
    function prodotti_iva(){
         $selIVA=that.$("#IVA"); 
         var jsonObj = {};

         jsonObj.type="prodotti_iva";


         jsonObj.person = app.global.tokensCollection.first().get("id_person");
         jsonObj.action = "list";


         jsonObj.person = app.global.tokensCollection.first().get("id_person");
         jsonObj = JSON.stringify(jsonObj);

         $.ajax({
             url:API_URL + 'rfa/',
             type:'post',
             headers : $headers,
             data: jsonObj,
             dataType : 'text',
             success: function (datap) {
                 $mydata =JSON.parse(datap);
                 $selIVA.empty();
                 $aa=$mydata.data;
                 $selIVA.append('<option value="0"></option>');
                 $.each($aa, function(i, value) {
                     $selIVA.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["iva"]+'</option>');
                 });

             }  
         });
    }    
    function modal_form(){
      // if($id==9){//essity testing
      console.log("modal");

        if(1==1){//essity testing
               varForm= '<!-- Modal -->'+
             '<div id="modal" class="modal fade">'+
                 '<div class="modal-dialog">'+
                     '<div class="modal-content">'+
                         '<div class="modal-header">'+

                             '<h4 class="modal-title"></h4>'+
                         '</div>'+
                         '<div class="modal-body">'+
                             '<h3 id="myModalLabel"></h3>'+
                                 '<form id="modProd">'+
                                 '<input type="hidden" class="form-control" name="id" id="id">'+ 
                                 '<div class="row">'+
                                 '<div class="form-group col-lg-12">'+
                                     '<label  id="lblCat" for="categoria">Seleziona Categoria</label>'+
                                     '<select  name="categoria" id="categoria"  class="form-control" required></select>'+

                                 '</div>';
                           


                            for (var key in app.global.nick_array.tab) {
                                var value = app.global.nick_array.tab[key];
                                             console.log(key, value);
                                             if(value.field!='action' && value.field!='categoria' && value.field!='valid'){
                                                 if(value.field=='valid'){  
                                                     var $checked='';
                                                    // if(app.global.nick_array.data.valid==="1" | app.global.nick_array.data.valid===true){$active=true}else{$active=false}

                                                     $active=app.global.nick_array.data.valid;
                                                     if($active){
                                                         $checked='checked';
                                                     }
                                                    // that.$('#valid').prop("checked", $active);
                                                     varForm+='<div class="row">'+
                                                         '<div class="form-group">'+
                                                             '<input type="checkbox" class="form-check-input" name="valid" id="valid" '+$checked+'>'+
                                                             '<label class="form-check-label" for="valid">'+value.title+'</label>'+
                                                         '</div>'+
                                                     '</div>'; 
                                         }else{
                                                     varForm+=  '<div class="form-group col-lg-6">'+
                                                         '<label  id="lblcodice" for="'+value.field+'">'+value.title+'</label>'+
                                                         '<input  type="text" name='+value.field+'" id="'+value.field+'"  class="form-control" >'+
                                                     '</div>';
                                                 }  

                                             }
                                       }         


                    varForm+='<div class="form-group col-lg-12">'+
                              '<input type="checkbox" class="form-check-input" name="valid" id="valid">'+ 
                                '<label class="form-check-label" for="valid">Valido</label>'+
                   
                                 '</div>'+
                             '<div class="form-group col-lg-12">'+    
                            '<button type="button" id="prodSub" class="btn btn-primary ">Submit</button>'+
                             '</div>'+
                             '</div>'+
                    '</form >'+
                         '</div>'+
                     '<div class="modal-footer">'+
                         '</div>'+
                     '</div>'+
             '</div>'+
             '</div>';


                         }else{
                                 varForm= '<!-- Modal -->'+
             '<div id="modal" class="modal fade">'+
                 '<div class="modal-dialog">'+
                     '<div class="modal-content">'+
                         '<div class="modal-header">'+

                             '<h4 class="modal-title"></h4>'+
                         '</div>'+
                         '<div class="modal-body">'+
                             '<h3 id="myModalLabel"></h3>'+
                                 '<form id="modProd">'+
                                 '<input type="hidden" class="form-control" name="id" id="id">'+ 
                                 '<div class="row">'+
                                 '<div class="form-group col-lg-12">'+
                                     '<label  id="lblCat" for="categoria">Seleziona Categoria</label>'+
                                     '<select  name="categoria" id="categoria"  class="form-control" required></select>'+

                                 '</div>'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblcodice" for="codice">Codice</label>'+
                                     '<input  type="text" name="codice" id="codice"  class="form-control" >'+
                                 '</div>'+

                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblDescr" for="descrizione">Descrizione</label>'+
                                     '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+

                                 '</div>'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblUM" for="prodotto">UM</label>'+
                                     '<input  type="text" name="UM" id="UM"  class="form-control" >'+

                                 '</div>'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblMinOrd" for="minOrd">Minimo Ordinabile</label>'+
                                     '<input  type="text" name="minOrd" id="minOrd"  class="form-control" >'+

                                 '</div>'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblconfezione" for="confezione">Confezione</label>'+
                                     '<input  type="text" name="confezione" id="confezione"  class="form-control" >'+

                                 '</div>'+
                                 '<div class="form-group col-lg-3">'+
                                     '<label  id="lblPrezzo" for="prezzo">Prezzo</label>'+
                                     '<input  type="text" name="prezzo" id="prezzo"  class="form-control" value=0.00>'+

                                 '</div>'+
                                 '<div class="form-group col-lg-3">'+
                                     '<label  id="lblIVA" for="IVA">IVA</label>'+
                                      '<input  type="text" name="iva" id="iva"   class="form-control" >'+
                                     '<!--select  name="IVA" id="IVA"  class="form-control" ></select-->'+


                                 '</div>'+
                                 '<div class="form-group col-lg-3">'+
                                     '<label  id="lblIVA" for="tipo_IVA">Tipo IVA: 0=normale; 1=esente; 2=escluso</label>'+
                                    '<input  type="text"  name="tipo_IVA" id="tipo_IVA"  class="form-control" readonly>'+


                                 '</div>'+
                              
                              '<div class="form-group col-lg-12">'+
                              '<input type="checkbox" class="form-check-input" name="valid" id="valid">'+ 
                                '<label class="form-check-label" for="valid">Valido</label>'+
                   
                                 '</div>'+
                                 '<div class="form-group col-lg-12">'+
                             '<button type="button" id="prodSub" class="btn btn-primary ">Submit</button>'+
                              '</div>'+
                              '</div>'+
                             '</form >'+
                         '</div>'+
                     '<div class="modal-footer">'+
                         '</div>'+
                     '</div>'+
             '</div>'+
             '</div>';
     } 

     return varForm;
    }
    function validatorModale(){
            var validator= that.$("#modProd").validate(); //sets up the validator
         $.validator.addMethod("money", function(value, element) {
            var isValidMoney = /^\d{0,4}(\,\d{0,3})?$/.test(value);
                return this.optional(element) || isValidMoney;
            }
        );

             
          validator.resetForm();
               $("#categoria").rules( "add", {
                    required: true,
                    //number: true,
                     min: 1,

                    messages: {
                        required: "Required input",
                       min: "Required input!!"
                        // number:"Inserire un numero!"
                    }
                });
                $("#codice").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                 $("#prezzo").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,
                    money: true,
                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
       }
        that.$('#prodSub').click(function(e) {
            alert('aaoooooooooooooooooo');
           e.stopPropagation();
            console.log('aooooo');
             if($("#modProd").valid()){
                  var idPro=that.$("#id").val();
            var listForn=_.map(_.pluck(that.$("#table").bootstrapTable('getData'), 'codice'), function(v){ return v; });
      // console.log(listForn)
        if(!idPro){//add prodotto
            
            if(_.size(listForn)){
                
                if(_.contains(listForn,that.$("#codice").val())){
                    alert(" Prodotto esistente!");
                    return false; 
                }else if(that.$("#codice").val()==="" || that.$("#codice").val()===null){
                    alert(" Inserire codice Prodotto!"); 
                    return false; 
                }
            } else{
                if(that.$("#codice").val()==="" || that.$("#codice").val()===null){
                alert(" Inserire codice Prodotto!"); 
                return false; 
            }
                
            }
          var idPro='';  
        } else{//update prodotto
         
        }       
              
                  console.log(e);
                var jsonObj = {};
                console.log(app.global.nick_array.id);
              //   if(app.global.nick_array.id=="9"){ 
                 if(1==1){ 
                for (var key in app.global.nick_array.tab) {
                                   var value = app.global.nick_array.tab[key];
                    console.log(key, value);
                    if(value.field!='action' ){
                        jsonObj[value.field]=that.$("#"+value.field).val();
                       
                                            
                                              
                        }
                    }       
                }
               
                jsonObj.type="rfa_fornitore_prodotto";
                jsonObj.id_fornitore = app.global.nick_array.id;
                jsonObj.categoria = that.$("#categoria").val();
                jsonObj.codice =that.$("#codice").val();
               // jsonObj.UM = that.$("#UM").val();
                jsonObj.minOrd = that.$("#minOrd").val();
                jsonObj.descrizione =that.$("#descrizione").val();
                jsonObj.confezione =that.$("#confezione").val();
                jsonObj.prezzo = that.$("#prezzo").val();
                jsonObj.iva = that.$("#iva").val();
                jsonObj.action = idPro?"update":"add";
                jsonObj.id_forn_prodotto =idPro;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                       if ($mydata.success){
                        $myData=$mydata
                       fornitore_prodotti();
                    
                    }
                   }           
                });
            }                    
            });
       
        that.$('#addProd').click(function(e) {
           // jsonForm.destroy("modProd");
            isNew=true;
            that.$("#modal").find('.modal-title').text('Add Prodotto al fornitore '+app.global.nick_array.data.name);
            that.$(".modal-footer").empty(); 
          //  that.$(".modal-content").empty(); 
            
             var validator= that.$("#modProd").validate(); //sets up the validator
          validator.resetForm();
               $("#categoria").rules( "add", {
                    required: true,
                    //number: true,
                     min: 1,

                    messages: {
                        required: "Required input",
                       min: "Required input!!"
                        // number:"Inserire un numero!"
                    }
                });
                $("#codice").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {
                        required: "Required input"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
             
     
   // jsonForm.registerSubmit(Form1Handler, "modProd");
            that.$("#modal").modal('show');
            that.$("#id").val('');
            that.$("#categoria").val('');
                //if($id==9){ 
                if(9==9){     
                    for (var key in app.global.nick_array.tab) {
                        var value = app.global.nick_array.tab[key];  
               
                        console.log(key, value);
                        if(value.field!='action'){
                            that.$("#"+value.field).val( '');
                         
                        }
                    }       
                }else{
            that.$("#codice").val('');
            
            that.$("#UM").val( '');
            that.$("#minOrd").val('');

            that.$("#confezione").val('');

           
            that.$("#descrizione").val('');
            that.$("#prezzo").val('');
            that.$("#iva").val('');
        }
            that.$('#prodSub ').click(function(e) {//siamo nella procedura di add 
               e.stopPropagation();

                if($("#modProd").valid()){
                var listCodice=_.pluck(that.$("#table").bootstrapTable('getData'), 'codice');
                console.log(listCodice);
                
                if(listCodice.length>0){
                     console.log(_.size(listCodice));
                    if(_.contains(listCodice,that.$("#codice").val())){
                        console.log(that.$("#codice").val()+'='+listCodice);
                        alert(" Prodotto esistente!");
                        return false; 
                    }else if(that.$("#codice").val()==="" || that.$("#codice").val()===null){
                        alert(" Inserire codice Prodotto!"); 
                        return false; 
                    }
                } else{
                    if(that.$("#codice").val()==="" || that.$("#codice").val()===null){
                        alert(" Inserire codice Prodotto!"); 
                        return false; 
                    }
                
                }
                var jsonObj = {};

                       jsonObj.type="rfa_fornitore_prodotto";

                       jsonObj.id_fornitore = app.global.nick_array.id;
                       jsonObj.categoria = that.$("#categoria").val();
                        jsonObj.codice = that.$("#codice").val();
                         jsonObj.descrizione =that.$("#descrizione").val();
                       // if(jsonObj.id_fornitore==9){ 
                       if(9==9){
                            for (var key in app.global.nick_array.tab) {
                                   var value = app.global.nick_array.tab[key];
                            console.log(key, value);
                            if(value.field!='action'){//essity uso per test
                                if(value.field=='prezzo'){
                                    jsonObj[value.field] = parseFloat( that.$("#"+value.field).val().replace(",","."));
                                }else{
                                    jsonObj[value.field] = that.$("#"+value.field).val();
                                }
                                
                             

                                }
                            } 
                        }else{//end essity uso per test
                    jsonObj.codice = that.$("#codice").val();
                        
                        jsonObj.descrizione =that.$("#descrizione").val();
                        jsonObj.UM = that.$("#UM").val();
                        jsonObj.minOrd = that.$("#minOrd").val();
                        jsonObj.confezione = that.$("#confezione").val();
                        jsonObj.prezzo = parseFloat( that.$("#prezzo").val().replace(",","."));
                        jsonObj.iva = that.$("#iva").val();
                    }
                       jsonObj.action = "add";
                       
                       jsonObj.person = app.global.tokensCollection.first().get("id_person");
                       jsonObj = JSON.stringify(jsonObj);

                       $.ajax({
                           url:API_URL + 'rfa/',
                           type:'post',
                           headers : $headers,
                           data: jsonObj,
                           dataType : 'text',
                           success: function (json) {
                              $mydata =JSON.parse(json);
                              if ($mydata.success){
                               $myData=$mydata
                              
                                bootbox.dialog({
                                            title: "Add Prodotto al fornitore ",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: 'OK',
                                                    className: "btn btn-success",
                                                    callback: function () {
                                                        
                                                        that.$("#modal").modal('hide'); 
                              fornitore_prodotti();
                                                    }
                                                }
                                            }
                                        });

                           }else{
                                bootbox.dialog({
                                            title: "Add Prodotto al fornitore ",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: 'OK',
                                                    className: "btn btn-danger",
                                                    callback: function () {
                                                        
                                                        that.$("#modal").modal('hide'); 
                              fornitore_prodotti();
                                                    }
                                                }
                                            }
                                        });
                           }
                           
                           
                          },
                    error: function () {
                        console.log('error');
                       
                    }         
                       });
                   }
                   else{
                       return false;
                   }
                $(this).unbind();
               });
            });
       
        
        window.actionEvents = {
            
            'click .updateProd': function (e, value, row,index) {
               
                e.stopPropagation();
               //  modal_form();
                console.log(value); 
                console.log(row); 
                console.log(index); 
                idProdotto=row.id
                catPro= row.codice;
                descrPro= row.descrizione;
                isNew=false;
                isCsv=false;
                
                    
                that.$("#modal").find('.modal-title').text('Update Prodotto del fornitore '+app.global.nick_array.data.name);   
               
                that.$(".modal-footer").empty();
                var validator= that.$("#modProd").validate(); //sets up the validator
                
               validator.resetForm();
             
               $("#categoria").rules( "add", {
                    required: true,
                    //number: true,
                     min: 1,

                    messages: {
                        required: "Required input",
                       min: "Required input!"
                        // number:"Inserire un numero!"
                    }
                });
                $("#prezzo").rules( "add", {
                    //required: true,
                  //  number: true,
                  //  range:['0,000','1000,00'],  

                    messages: {
                      //  required: "Required input",
                     //  min: "Required input!"
                        // number:"Inserire un numero!"
                    }
                });
                $("#codice").rules( "add", {
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
                that.$("#id").val(row.id);
                
                that.$("#categoria").val(row.id_categoria);
                 that.$("#iva").val(row.iva);
                $valid=false;
                row.valid=='1'?$valid=true:$valid=false;
                 that.$('#valid').prop("checked", $valid);
                
                 // if($id==9){ 
                if(1==1){ 
                for (var key in app.global.nick_array.tab) {
                    
                    var value = app.global.nick_array.tab[key];
                    console.log(key, value);
                    if(value.field!='action' && value.field!='categoria'){
                         that.$("#"+value.field).val( eval('row.'+value.field));
                                            
                                              
                        }
                    }       
                }else{
                
                
                that.$("#codice").val(row.codice);
                that.$("#UM").val( row.UM);
                that.$("#minOrd").val( row.minimo_ordinabile);

                that.$("#confezione").val(row.confezione);
           
                
                that.$("#descrizione").val(row.descrizione);
                that.$("#prezzo").val(row.prezzo);
              //  that.$("#IVA").val(row.id_iva);
                that.$("#tipo_IVA").val(row.tipo_iva);
            }
               
                $("#prezzoffffff").on('blur' , function() {       
      var value = parseFloat($(this).val().replace(",","."));
      $(this).val(value.toFixed(2).replace(".",","))
    });
                
                that.$('#prodSub').click(function(e) {
                   e.stopPropagation();
                  
                    if($("#modProd").valid()){
                        var jsonObj = {};
                
                        jsonObj.type="rfa_fornitore_prodotto";

                        jsonObj.id_fornitore = app.global.nick_array.id;
                        jsonObj.categoria = that.$("#categoria").val();
                        //if(jsonObj.id_fornitore==9){
                        if(1==1){
                            for (var key in app.global.nick_array.tab) {
                                   var value = app.global.nick_array.tab[key];
                            console.log(key, value);
                            if(value.field!='action'){//essity uso per test
                                if(value.field=='prezzo'){
                                    jsonObj[value.field] = parseFloat( that.$("#"+value.field).val().replace(",","."));
                                }else{
                                    jsonObj[value.field] = that.$("#"+value.field).val();
                               
                                }
                                
                              console.log('jsonObj'+ value.field+'='+that.$("#"+value.field).val());

                                }
                            } 
                        }else{//end essity uso per test
                        jsonObj.codice = that.$("#codice").val();
                        
                        jsonObj.descrizione =that.$("#descrizione").val();
                        jsonObj.UM = that.$("#UM").val();
                        jsonObj.minOrd = that.$("#minOrd").val();
                        jsonObj.confezione = that.$("#confezione").val();
                        jsonObj.prezzo =parseFloat( that.$("#prezzo").val().replace(",","."));
                       // jsonObj.iva = that.$("#IVA").val();
                    }
                        jsonObj.iva = that.$("#iva").val();
                        jsonObj.valid = that.$('#valid').prop("checked");
                        jsonObj.action = "update";
                        jsonObj.id_forn_prodotto =idProdotto;
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);

                        $.ajax({
                            url:API_URL + 'rfa/',
                            type:'post',
                            headers : $headers,
                            data: jsonObj,
                            dataType : 'text',
                            success: function (json) {
                               $mydata =JSON.parse(json);
                                if ($mydata.success){
                                    $myData=$mydata
                                    that.$("#modal").modal('hide');
                                   
                                   // validator.destroy();
                                   fornitore_prodotti();
                                }else{
                                    bootbox.dialog({
                                        title: "Attenzione",
                                        message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: 'OK',
                                                    className: "btn btn-danger",
                                                    callback: function () {
                                                        
                                                      
                                                    }
                                                }
                                            }
                                        });
                                }
                            }           
                        });
                        
                    }else{
                       // validator.destroy();
                        console.log('not valid')
                        return false;
                    }
                   // $(this).unbind();
                });
              $('#modal').on('hidden.bs.modal', function (event) {
           // alert('esssiee');
            that.$('#prodSub').unbind(); //qui è necessario perchè se viene aperta la modale e richiusa senza usare il submit  
                                         //il listener viene creato e quindi va anche distrutto!
        });
            },
            
            'click .removeProd': function (e, value, row,index) {
                e.stopPropagation();
                  var jsonObj = {};
                   console.log(row); 
            if (confirm('Sei sicuro di voler rimuovere questo Prodotto* dal Fornitore?')) {
                jsonObj.type="fornitore_prodotto";
                jsonObj.id_prodotto =row.id;

                jsonObj.action = "del";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                        that.$("#modal").modal('hide'); 
                               fornitore_prodotti();
                   }           
                });
            }
            },
            
           
          'click .downloadTecnica': function (e, value, $row) {
              e.stopPropagation();
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
              e.stopPropagation();
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

            }
        
       
        };
    
       }       
function rfa_tipologie_prodotto_servizio(that,$row){
          
    varForm=  
        '<form class="registrationForm" id="registrationForm" method="post">'+

            '<input type="hidden" class="form-control" name="id" id="id">'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-8">'+
                    '<label id="lblname" for="name">Tipi Prodotti Servizio</label>'+
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Ditta" >'+
                '</div>'+
                '<div class="form-group col-lg-4">'+
                    '<label id="lblname" for="piva">Partita IVA</label>'+
                    '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" >'+
                '</div>'+
            '</div>'+
        '</form>';
    that.$("#tipi").append(varForm);
}   
function rfa_tipologie_fornitori_acquisto_generale(that,$row){
    $isNew=app.global.nick_array.isNew;
    $txtButton='';
    $txtButton=$isNew?'Add':'Update';
    
          
    varForm=  
        '<form class="registrationForm" id="registrationForm" method="post">'+

            '<input type="hidden" class="form-control" name="id" id="id">'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-4">'+
                    '<label id="lblname" for="name">Tipologia Fornitore*</label>'+
                    '<input type="text" class="form-control" name="name" id="name" required>'+
                '</div>'+
                '<div class="form-group col-lg-5">'+
                    '<label id="lblname" for="piva">Descrizione</label>'+
                    '<input type="text" class="form-control" name="description" id="description"  >'+
                '</div>'+
                   '<div class="form-group">'+
                        '<input type="checkbox" class="form-check-input" name="valid" id="valid" >'+
                        '<label class="form-check-label" for="valid">Valido</label>'+
                    '</div>'+
                '<button type="button" id="addTipoFornitoreAG" class="btn btn-primary submit">'+$txtButton+'</button>'+
            '</div>'+
        '</form>';
    that.$("#tipi").append(varForm);
     $("#registrationForm").validate();
    that.$('#addTipoFornitoreAG').click(function(e) {
        if($("#registrationForm").valid()){
     
        console.log(e);
        var jsonObj = {};
                
        jsonObj.type="rfa_tipologie_fornitori_ag";

        jsonObj.name = that.$("#name").val();
        jsonObj.valid = that.$('#valid').prop("checked");
       
        jsonObj.description =that.$("#description").val();
        jsonObj.action = $isNew?"add":"update";
        jsonObj.id = $isNew?null:$row.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
         var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
                $.ajax({
                    url:app.global.json_url + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                       if ($mydata.success){
                        $myData=$mydata
                        app.routers.router.prototype.data_type_edit({});
                    
                    }
                   }           
                });
            }
       });                     
           
            
}   
function rfa_servizi(that,$row){
        var API_URL = app.global.json_url;
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
       
        var isNew=app.global.nick_array.isNew;  
        varForm=  
                '<form class="registrationForm" id="registrationForm" method="post">'+
               
                    '<input type="hidden" class="form-control" name="id" id="id">'+
                    '<div id="generale"></div>'+
                    
                    '<div id="fornitori"></div>'+
                '</form>'+
                ' <!-- Modal -->'+
                '<div id="modal" class="modal fade">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+

                                '<h4 class="modal-title"></h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                                '<h3 id="myModalLabel"></h3>'+
                                '<form id="modForn">'+
                                    
                                    '<div class="form-group col-lg-6">'+
                                        '<label  id="lbltipo" for="tipologia">Seleziona Tipologia Prodotto</label>'+
                                        '<select  name="tipologia" id="tipologia"  class="form-control" ></select>'+

                                '</div>'+
                                '<div class="form-group col-lg-6">'+
                                    '<label  id="lblfornitore" for="fornitore">Seleziona Fornitore</label>'+
                                    '<select  name="fornitore" id="fornitore"  class="form-control" ></select>'+

                                '</div>'+
                                 '<button type="button" id="addFornSub" class="btn btn-primary submit">Submit</button>'+
                                '</form >'+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        that.$("#tipi").append(varForm);
        //------------------------------------------------------------------------------------------
        varForm='<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingUno">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion1" href="#collapseUno" aria-expanded="false" aria-controls="collapseUno">'+

                                   '<label id="lblInt-prog" ></label> Anagrafica'+
                                '</a>'+
                            '</h4>'+   
                        '</div>'+
                        '<div id="collapseUno" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingUno">'+
                            '<div class="panel-body">'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-7">'+
                                        '<label id="lblEnte" for="ente">Committente</label>'+
                                        '<input type="text" class="form-control" name="ente" id="ente" placeholder="Committente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<label id="lblCIG" for="CIG">CIG</label>'+
                                        '<input type="text" class="form-control" name="CIG" id="CIG" placeholder="CIG" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+
                                        '<label   id="lblData"  for="CIG_scad">Data di scadenza CIG</label>'+        
                                        '<div class="input-group date" id="datetimepicker">'+
                                            '<input type="text" id="CIG_scad" name="CIG_scad" class="form-control" />'+
                                            '<span class="input-group-addon">'+
                                                '<span class="glyphicon glyphicon-calendar"></span>'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label id="lblnota_CIG" for="nota_CIG">Nota CIG</label>'+
                                        '<textarea type="textarea" class="form-control" name="nota_CIG" id="nota_CIG" rows="3"></textarea>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label >Indirizzo di spedizione</label>'+
                                        '<input type="text" class="form-control" name="indirizzo_spedizione" id="indirizzo_spedizione" />'+
                                    '</div>'+
                        
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-12 ">'+ 
                                        '<button type="button" id="btnSub" name="btnSub" class="btn btn-primary submit ">Submit</button>'+
                                    '</div>'+
                   
                                '</div>'+
        
                            '</div>  <!--div class="panel-body"-->'+
                        '</div>  <!--div class="panel-collapse collapse'+
                    '</div>  <!--div class="panel panel-default"-->'+
                '</div><!--div class="panel-group"-->';
        that.$("#generale").append(varForm);
        //------------------------------------------------------------------------------------------
        varForm=   '<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="heading2">'+
                            '<h4 class="panel-title">'+
                                '<a  role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapse2" aria-expanded="false" aria-controls="collapse2">'+

                                   '<label id="lblInt-prog" ></label> Fornitori e relativi Prodotti per il servizio '+app.global.nick_array.data.name+
                                '</a>'+
                            '</h4>'+   
                        '</div>'+
                        '<div id="collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading2">'+
                            '<div class="panel-body">'+
                                '<p class="toolbar">'+
                                    '<button type="button" id="addForn" class="btn btn-default" data-toggle="modal" data-target="#modal"  data-title="Add Fornitore al Servizio"  title="Add Fornitore">Add Fornitore</button>'+ 
                                    //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                                    '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table11"> </table>'+
                            '</div>  <!--div class="panel-body"-->'+
                        '</div>  <!--div class="panel-collapse collapse'+
                    '</div>  <!--div class="panel panel-default"-->'+
                '</div><!--div class="panel-group"-->';
        that.$("#fornitori").append(varForm);
        var isNew=true;
        var $table11=that.$("#table11"); 
           fornitori_servizio();
        var  $email;  
        function  fornitori_servizio(){
            var jsonObj = {};
            
            jsonObj.type="fornitore_servizio";
            jsonObj.id_ser = app.global.nick_array.id;
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       app.global.nick_array.dataOr=$mydata.data;
                       console.log( app.global.nick_array.dataOr);
                        $('#modal').modal('hide');
                        hrfTable($mydata);
                    
                    }
                   
                }  
            });
       }    
        function  hrfTable(my){
           
            $.each( my.tab, function( key, value1 ){
               
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter1;
                }
            }); 
             
            $table11.bootstrapTable('destroy');
                   
            $table11.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns:true,
                showRefresh:true,
                search:true,
                selectItemName:"selectItemName"
        });
            $.each( my.data, function( key, value1 ){
                console.log(key+" pre: "+value1["id"]+"-"+value1["valid"]);
                if(value1["valid"]=="on"){
                    console.log("aa: "+value1["id"]);
                    $table11.bootstrapTable('check', key)
                }
                
            
            }); 
          
    
         } 
        $table11.on('editable-init.bs.table', function(e){
                var $els =  $table11.find('.editable[data-name="email"]');
    
                //populating defaults
                $els.each(function(index,value){
                   
                    console.log(index,value);
                    $(this).editable('option', 'source',  app.global.nick_array.dataOr[index].email);
                   
                    if(app.global.nick_array.dataOr[index].config){
                        $email= JSON.parse( app.global.nick_array.dataOr[index].config);

                        //   console.log($email.email);
                        console.log($email);
                        $(this).editable('option', 'value',  $email.email);   
                    }      
                  
                });

            });
        $table11.on('check.bs.table',function ( e, row) {
               e.preventDefault(); 
                console.log(e);
                  console.log(row);
             fornitori_servizio_check(row,'on');
              
                 
             });
        $table11.on('uncheck.bs.table',function ( e, row) {
              e.preventDefault();  
                fornitori_servizio_check(row,'off');
              
                 
             });
        
        $(document).on('editable-save.bs.table', '#table11', function (e, field, row, rowIndex, oldValue, $el) {
            var jsonObj = {};
            jsonObj.type="rfa_fornitore_servizio";
            jsonObj.id = row.id;
            jsonObj.value =row[field];
            jsonObj.field =field;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "update";
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                      
                   fornitori_servizio()
                 
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
        });
            
        function  fornitori_servizio_check(row,valid){
            var jsonObj = {};
            
            jsonObj.type="rfa_fornitore_servizio_check";
            jsonObj.id = row.id;
            jsonObj.valid = valid;
            jsonObj.oldValid = row.valid;
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "update";
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       
                      // fornitori_servizio()
                    
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
       }  
      
        function actionFormatter1() {
        
            return [
                '<a  href="javascript:" title="Update Item" class="updateForn"><i  class="glyphicon glyphicon-edit"></i></a>&emsp;&emsp;',
                '<a  href="javascript:" title="Rimuovi Fornitore dalla lista" class="removeForn"><i class="glyphicon glyphicon-remove"></i></a>&emsp;&emsp;'

            ].join('');
        }
       
        tipoprod();
        if(1==1 ){
            $dataPrev=app.global.nick_array.data.CIG_scadenza;
                that.$('#datetimepicker').datetimepicker(
                {                              
                    
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,

                   // defaultDate: $dataPrev,
                    language: "it"
                });
            that.$('#CIG').val( app.global.nick_array.data.CIG);
            //that.$('#CIG_scad').val(moment(app.global.nick_array.data.CIG_scadenza,"YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY'));
            that.$('#CIG_scad').val(app.global.nick_array.data.CIG_scadenza);
            that.$('#nota_CIG').val( app.global.nick_array.data.CIG_nota);
            $indSpe=JSON.parse( app.global.nick_array.data.config)
            if($indSpe){
                that.$('#indirizzo_spedizione').val( $indSpe.indirizzo_spedizione);
            }
            
            
        }
        var $selTipo=that.$("#tipologia");
        var $selFornitore=that.$("#fornitore");
        //-------------------------------Tipologia Prodotto------------------------------------------
        function  tipoprod(){
          
           
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "RFA_Tipologie_Fornitura";

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selTipo.empty();
                    $aa=$mydata.data;
                    $selTipo.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        if($aa[i]["id"]!=='5' && $aa[i]["id"]!=='10' && $aa[i]["id"]!=='11' && $aa[i]["id"]!=='12'){//5->servizi approvvigionamento,10 def Senza,11 DEF CON, 12 Acquisto diretto
                           $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>'); 
                       }
                      
                    });
                   
                }  
            });
           // fornitori();
        }
        function  fornitori(){
          
           
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "RFA_Fornitori";
            jsonObj.id_tipoProd =  parseInt($selTipo.val());

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selFornitore.empty();
                    $aa=$mydata.data;
                    $selFornitore.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        $selFornitore.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                   
                }  
            });
          
        }
        
       
        that.$('#tipologia').change(function () {
            
            fornitori();   
        });
        that.$('#addForn').click(function(e) {
           isNew=true;
                                 
            });
        that.$('#addFornSub').click(function(e) {
            var listForn=_.pluck(that.$("#table11").bootstrapTable('getData'), 'id_fornitore');
            console.log(listForn)
        if(isNew){
            if(_.size(listForn) ){
            if(_.contains(listForn,$selFornitore.val())){
                alert(" Fornitore già nella lista!");
                return false; 
            }else if($selFornitore.val()==="0" || $selFornitore.val()===null){
                alert(" Seleziona un Fornitore!"); 
                return false; 
            }
            } else{
                if($selFornitore.val()==="0" || $selFornitore.val()===null){
                alert(" Seleziona un Fornitore!"); 
                return false; 
            }
                
            }       
                    
      }    
                  console.log(e);
                var jsonObj = {};
                
                jsonObj.type="fornitore_servizio";
                jsonObj.id_ser = app.global.nick_array.id;
                jsonObj.id_forn =$selFornitore.val();
                jsonObj.action = "add";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                       if ($mydata.success){
                        $myData=$mydata
                       fornitori_servizio();
                    
                    }
                   }           
                });
                                 
            });
        
    
    
    that.$('#btnSub').click(function(e) {
         console.log("btnSub");
         var jsonObj = {};
            
                jsonObj.type="rfa_servizio";
                jsonObj.id_ser = app.global.nick_array.id;
                jsonObj.CIG =that.$('#CIG').val();  
                jsonObj.CIG_scad =that.$('#CIG_scad').val();
                jsonObj.nota_CIG =that.$('#nota_CIG').val();
                jsonObj.indirizzo_spedizione =that.$('#indirizzo_spedizione').val();
                jsonObj.action = "update";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                        $mydata =JSON.parse(json);
                        alert("Update Servizio OK");
                        console.log("ok upd");
                        $mydata.data.CIG_scadenza= moment($mydata.data.CIG_scadenza,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
                       
                        app.global.nick_array.data=$mydata.data;
                       
                   }           
                });
           
    });
      window.actionEvents = {
            'click .updateForn': function (e, value, row) {
                  console.log( value);
               console.log(row);
                 app.global.nick_array.config=row.config; 
               rfa_servizi_prodotti(that,row.id_fornitore);//idPro id fornitore
            },
            'click .removeForn': function (e, value, row) {
             //   console.log("removeForn");
              // console.log(row);    
            var jsonObj = {};
            if (confirm('Sei sicuro di voler rimuovere questo Fornitore dal Servizio?\n Attenzione rimuovendo il fornitore togli anche le impostazioni dei prodotti che quel servizio può acquistare da quel fornitore.\n'
                    +'Altrimenti lo puoi deselezionare e qundi disattivarlo dalla checkbox all\'inizio del record.')) {
                jsonObj.type="fornitore_servizio";
                jsonObj.id_ser = row.id_servizio;
                jsonObj.id_forn_servizio =row.id_fornitore;//id  del fornitore collegato al servizio
                jsonObj.id =row.id;//id del record della lista del fornitore collegato al servizio
                jsonObj.action = "del";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                        fornitori_servizio();
                   }           
                });
            }
            }
        };
} 
 
function rfa_servizi_prodotti(that,$row){
    var id_fornitore=$row;
  
    var API_URL = app.global.json_url;
    var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
    };
    that.$("#tipi").empty();
    console.log('rfa_servizi_prodotti');
                           
    varForm= 
           
        '<form class="registrationForm" id="registrationForm" method="post">'+
            '<div id="config"></div>'+
            '<input type="hidden" class="form-control" name="id" id="id">'+ 
            '<br><div class="row">'+
                '<div class="form-group col-lg-12 ">'+ 
                    '<button type="button"  class="btn btn-primary submit assegna">Assegna</button>'+
                    '&nbsp;<label class="lblIntro"></label>'+
                '</div>'+
                   
            '</div>'+
                
            '</div>'+
           
            '<div class="row">'+
                '<p class="toolbar">'+
                                
                    '<span class="alert"></span>'+
                '</p>'+
                '<table id="table"> </table>'+
            '</div>'+
            
            '<br><div class="row">'+
                '<div class="form-group col-lg-12 ">'+ 
                    '<button type="button"  class="btn btn-primary submit assegna">Assegna</button>'+
                    '&nbsp;<label class="lblIntro"></label>'+
                '</div>'+
                   
            '</div>'+
        '</form>';
    that.$("#tipi").append(varForm);
    var $table=that.$("#table");
    var prodotti_on = []; 
   
    servizi_prodotti();
    function  servizi_prodotti(){
            var jsonObj = {};
            
            jsonObj.type="servizi_prodotti";
            jsonObj.id_servizio = app.global.nick_array.id;
            jsonObj.id_fornitore =id_fornitore;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                                               
                        $('#modal').modal('hide');
                        hrfTable($mydata);
                    
                    }
                   
                }  
            });
       }
    function  hrfTable(my){
        $table.unbind();
        that.$('.assegna').unbind();
        //  console.log(my);
        $.each( my.tab, function( key, value1 ){
            if(value1["cellStyle"]=="cellStyle"){
                value1["cellStyle"]=cellStyle;
            }
            if(value1["events"]=="actionEvents"){
                value1["events"]=actionEvents;
            }
            if(value1["formatter"]=="actionFormatter"){
                value1["formatter"]=actionFormatter1;
            }
        }); 
       

        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
            selectItemName:"selectItemName",
           showPaginationSwitch:true,
            pagination:true
        });
        var $countCheck=0;
        
        prodotti_on.splice(0, prodotti_on.length);//svuoto l'array
         $.each( my.data, function( key, value1 ){
          //  console.log(key+" pre: "+value1["id"]+"-"+value1["valid"]);
             if(value1["valid"]=="on"){
                 $countCheck+=1;
                 prodotti_on.push(value1['id']);
              // console.log("aa: "+value1["id"]);
            //   console.log(prodotti_on);
               $table.bootstrapTable('check', key)
            }
            
        }); 
      //  console.log(my["fornitore"]); 
        that.$(".lblIntro").text( $countCheck+" prodotti selezionati del fornitore "+my["fornitore"]);
        that.$("#config").empty().append(my["config"]);//append zona inside config
       
        var $zonaC= '';
        if(app.global.nick_array.config){
            $zonaC= JSON.parse( app.global.nick_array.config);
        }
        console.log( $zonaC.zona);
        that.$("#zona").editable({
            value:$zonaC.zona,
            type: 'text',
            emptytext:'Empty',
            mode: 'inline',
            placeholder:'inserisci la zona',
            params: function(params) {
                //originally params contain pk, name and value
                
                 params.type="rfa_fornitore_zona";
            params.id_servizio = app.global.nick_array.id;
            params.id_fornitore =id_fornitore;
            params.person = app.global.tokensCollection.first().get("id_person");
            params.action = "update";
                return params;
            },
            url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
              //  data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                                               
                     
                       console.log($mydata.success)
                    
                    }
                   
                } ,
                error: function () {
                     console.log('error');
                }
           
        });
        $table.on('check.bs.table',function ( e,row, $el) {
            e.stopPropagation();
            // console.log(row);
            //  console.log($el);
           
            $countCheck+=1;
            prodotti_on.push(row['id']);
            console.log(prodotti_on);
            that.$(".lblIntro").text( $countCheck+" prodotti selezionati del fornitore "+my["fornitore"]);
             
        });
        $table.on('check-all.bs.table',function ( e,row, $el) {
         prodotti_on.splice(0, prodotti_on.length);//svuoto l'array
          $countCheck=0;
            $.each( my.data, function( key, value1 ){
           
                // prodotti_on.push(value1['id']);
            
              
               $table.bootstrapTable('check', key)
           
            
        }); 
       //  console.log(prodotti_on);
           
          //  that.$(".lblIntro").text( $countCheck+" prodotti selezionati del fornitore "+my["fornitore"]);
             
        });
        $table.on('uncheck.bs.table',function ( e,row, $el) {
             e.stopPropagation();
            // console.log(row);
            //  console.log($el);
              
              $countCheck-=1;
             prodotti_on = _.without(prodotti_on,row['id']);
             // prodotti_on = prodotti_on.filter(item => item !== row['id'])
               console.log(prodotti_on);
               that.$(".lblIntro").text( $countCheck+" prodotti selezionati del fornitore "+my["fornitore"]);
        });
        $table.on('uncheck-all.bs.table',function ( e,row, $el) {
           
                prodotti_on.splice(0, prodotti_on.length);//svuoto l'array
              $countCheck=my.data.length;
            $.each( my.data, function( key, value1 ){
           
               $table.bootstrapTable('uncheck', key)
                      
        });
       //  console.log(prodotti_on);
          //     that.$(".lblIntro").text( $countCheck+" prodotti selezionati del fornitore "+my["fornitore"]);
     });
    function actionFormatter1() {

    }
    
    that.$('.assegna').click(function () {
        var  prodotti_on1=[];
       
            var listForn=_.map(that.$("#table").bootstrapTable('getData', {useCurrentPage: false}), function(num, key){ 
                 console.log(_.values(num)+'-'+key+'-'+listForn);
                if(num[0]==true){
                       prodotti_on1.push(num['id']);
                      
                       
               
                }
                });
                 console.log(prodotti_on1);
                        console.log(prodotti_on);
       
     var jsonObj = {};
            
            jsonObj.type="servizi_prodotti_on";
            jsonObj.id_servizio = app.global.nick_array.id;
            jsonObj.id_fornitore =id_fornitore;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "update";
            jsonObj.prodotti_on = prodotti_on;
            

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'rfa/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       alert("Prodotti assegnati al Servizio correttamente!");
                         servizi_prodotti();
                    
                    }
                   
                }  
            });
    });
    
}
}   

function rfa_banche(that,$row){
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var isNew=app.global.nick_array.isNew;  
        var API_URL = app.global.json_url + 'types/';
        var $iEmail=0;
        var $iTel=0;
        var $iReferente=0;
               
        varForm=  
                         '<form class="registrationForm" id="registrationForm" method="post">'+
               
           
         
           
                        '<input type="hidden" class="form-control" name="id" id="id">'+ 
                '<div class="row">'+
                    '<div class="form-group col-lg-8">'+
                        '<label id="lblname" for="name">Nome Banca</label>'+
                        '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Banca" >'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label id="lblname" for="piva">Partita IVA</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" >'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="form-group col-lg-8">'+
                        '<label id="lblagenzia" for="agenzia">Agenzia</label>'+
                        '<input type="text" class="form-control" name="agenzia" id="agenzia" placeholder="Agenzia" >'+
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
                        '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>'+
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
                
//-----------------------referenti banche----------------------------------------------------------- 
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
                                jsonObj.type="referente_banca";
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
                    that.$('#agenzia').val( app.global.nick_array.data.agenzia);
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
                        "telefoni[]":{
                             required: true,
                          minlength: 6,
                          number:true
                        }
                        

                    },
                    messages: {
                        name: {
                          required: "Perfavore inserisci il nome dellla Banca",
                          minlength: "Il nome della Banca deve contenere perlomeno 3 caratteri"
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
        
        
                
            //-------------------------------referenti--banche----------------------------------------
           
        function  referente(){    
            
            var jsonObj = {};
            jsonObj.action = "referente_banca";
            jsonObj.type = app.global.nick_array.arr;
            
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
        //-------------------------------------event--banche--------------------------------------------------------------
 
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
       
            });
        }//end referenti banche add-----------

function rma_pmaTipologie(that,$row){
    var API_URL = app.global.json_url;
    var $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
    };
    that.$("#tipi").empty();
    console.log('rma_pmaTipologie')
    varForm=  
        '<form class="registrationForm" id="registrationForm" method="post">'+

            '<input type="hidden" class="form-control" name="id" id="id">'+ 
            '<div class="row">'+
                '<p class="toolbar">'+
                    '<button type="button" id="addCat" class="btn btn-default" data-toggle="modal" data-target="#modal"  data-title="Add Tipologia Dispositivo"  title="Add Tipologia Dispositivo">Nuova Tipologia </button>'+ 
                    //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                    '<span class="alert"></span>'+
                '</p>'+
                '<table id="table"> </table>'+
            '</div>'+
        '</form>'+
        '<!-- Modal -->'+
            '<div id="modal" class="modal fade">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+

                            '<h4 class="modal-title"></h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<h3 id="myModalLabel"></h3>'+
                            '<form id="modForn">'+
                                '<div class="form-group col-lg-6">'+
                                    '<label  id="lblCat" for="categoria">Categoria</label>'+
                                    '<input  type="text" name="categoria" id="categoria"  class="form-control" >'+
                                '</div>'+
                                '<div class="form-group col-lg-6">'+
                                    '<label  id="lblDescr" for="descrizione">Descrizione</label>'+
                                    '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+

                                '</div>'+
                            '<button type="button" id="addCatSub" class="btn btn-primary submit">Submit</button>'+
                            '</form >'+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        that.$("#tipi").append(varForm);
        var isNew=true;
        var $table=that.$("#table"); 
        manutenzione_categorie();
        function  manutenzione_categorie(){
            var jsonObj = {};
            
            jsonObj.type=app.global.nick_array.arr;
            jsonObj.id_fornitore = app.global.nick_array.id;
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL + 'pma/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                       
                        $('#modal').modal('hide');
                        hrfTable($mydata);
                    
                    }
                   
                }  
            });
       }    
        function  hrfTable(my){
            console.log(my.data);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter1;
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
         
        
       
        that.$('.removeCat--').on('click',function ( row, $element, field) {
            console.log($("i").parentsUntil("tbody").children("tr"));
            idPro= $element.id;
            catPro= $element.name;
            descrPro= $element.descrizione;
            
        });
        } 
        function actionFormatter1() {
        
            return [
                '<a  href="javascript:" class="updateCat" title="Update Item"><i class="glyphicon glyphicon-edit "></i></a>&emsp;&emsp;',
                '<a  href="javascript:" class="removeCat" title="Rimuovi Categoria dalla lista"><i class="glyphicon glyphicon-remove "></i></a>&emsp;&emsp;'

            ].join('');
        }
       
        that.$('#addCat').click(function(e) {
           isNew=true;
                                 
            });
        that.$('#addCatSub').click(function(e) {
            var listForn=_.map(_.pluck(that.$("#table").bootstrapTable('getData'), 'name'), function(v){ return v.toLowerCase(); });
       
        if(isNew){
            if(_.size(listForn)){
                
                if(_.contains(listForn,that.$("#categoria").val().toLowerCase())){
                    alert(" Categoria esistente!");
                    return false; 
                }else if(that.$("#categoria").val()==="" || that.$("#categoria").val()===null){
                    alert(" Inserire nome Categoria!"); 
                    return false; 
                }
            } else{
                if(that.$("#categoria").val()==="" || that.$("#categoria").val()===null){
                alert(" Inserire nome Categoria!"); 
                return false; 
            }
                
            }       
        }        
              
                  console.log(e);
                var jsonObj = {};
                
                jsonObj.type="rfa_fornitore_categorie";
                
                jsonObj.id_fornitore = app.global.nick_array.id;
                jsonObj.categoria = that.$("#categoria").val();
                jsonObj.descrizione =that.$("#descrizione").val();
                jsonObj.action = isNew?"add":"update";
                jsonObj.id_forn_categoria =idPro;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                       if ($mydata.success){
                        $myData=$mydata
                       fornitore_categorie();
                    
                    }
                   }           
                });
                                 
            });
        var idPro="";
       
        
        
        that.$('#modal').on('show.bs.modal', function (event) {
            console.log("is"+isNew);
            if(isNew){
               that.$("#categoria").val(""); 
               that.$("#descrizione").val(""); 
            }else{
                that.$("#categoria").val(catPro);
                that.$("#descrizione").val(descrPro);
            }
        });
         window.actionEvents = {
            
            'click .updateCat': function (e, value, row,index) {
                console.log(value); 
                console.log(row); 
                console.log(index); 
                idPro=row.id
                catPro= row.name;
                descrPro= row.descrizione;
                 isNew=false;
                
                that.$("#modal").modal('show');
            },
            'click .removeCat': function (e, value, row,index) {
                  var jsonObj = {};
            if (confirm('Sei sicuro di voler rimuovere questa Categoria dal Fornitore?')) {
                jsonObj.type="fornitore_categorie";
                jsonObj.id_fornitore = row.id_fornitore;
                jsonObj.id_forn_categoria =row.id;

                jsonObj.action = "del";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL + 'rfa/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                        fornitore_categorie();
                   }           
                });
            }
            }
        }
      
    
       }        
        
      