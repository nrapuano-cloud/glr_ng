/**
 * nicRap1 1.0
 * 
 * Copyright (c) 2009-2023 www.nicolarapuano.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.nicolarapuano.com/license_freeware
 * To use it on other terms please contact us: info@nicolarapuano.com
 *
 */
ver='';



function rap_generali(that,$row){
    var validator="";
    var $iEmail=0;
    var $iTel=0;
    
    var isNew=app.global.nick_array.isNew;
    var API_URL = app.global.json_url + 'types/';
    var imgDis="";
    if(!isNew){imgDis=""}else{imgDis="disabled"}
    that.$("#urbanistici").empty();
    that.$("#generali").empty();
    varForm='<h3>Dati Generali</h3><br>'+
    '<form class="generaliForm" id="generaliForm" name="generaliForm" method="post">'+
        '<input type="hidden" class="form-control" name="id" id="id">'+ 
        '<div class="row">'+

            '<div class="form-group col-lg-8">'+
                '<div class="row">'+
                    '<div class="form-group col-lg-12">'+
                        '<label id="lblname" for="name">Nome Servizio</label>'+
                        '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Servizio" >'+
                    '</div>'+
                    '<div class="form-group col-lg-5">'+
                        '<label for="areaServizio">Area Servizio</label>'+
                        '<select  name="areaServizio" id="areaServizio"  class="form-control" ></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label title="Centro di costo">CDC</label>'+
                        '<input type="number" min="0" step="1" class="form-control" name="cdc" id="cdc" title="Centro di costo" placeholder="345">'+
                    '</div>'+
                    '<div class="form-group col-lg-5">'+
                        '<label for="orariServizio">Orari Servizio</label>'+
                        '<input type="text"  name="orariServizio" id="orariServizio"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-lg-8">'+     
                        '<label for="tipoServizio">Tipologia Servizio</label>'+
                        '<input type="text"  name="tipoServizio" id="tipoServizio"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-sm-4">'+
                        '<label id="lblmoduli" for="moduli">Moduli/Navbar</label>'+
                        '<div class="form-group " >'+
                            '<button type="button" id="moduli" name="moduli" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" data-tipo="Moduli/Navbar" data-title="Configura Moduli/Navbar "  title="Configura Moduli/Navbar alla persona">Moduli/Navbar</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group col-lg-12">'+
                        '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>'+
                        '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo">'+
                    '</div>'+
                '</div>'+    
            '</div>'+ 
            
            '<div class="form-group col-lg-4">'+
                '<div class="row">'+
                    '<div class="form-group col-lg-12">'+
                        '<label for="file">Seleziona immagine del servizio</label>'+
                        '<input type="file" name="file" id="file" accept="image/*" '+imgDis+'>'+
                        '<p class="help-block"></p>'+
                    '</div>'+
                    '<div id="preview" class="form-group col-lg-12">'+
                        '<img id="blah" src=".\\css\\img\\filed.png" />'+
                    '</div>'+
                '</div>'+
            '</div>'+    
        '</div>'+
        
        
      
        '<div class="row">'+
            '<div class="form-group col-lg-6">'+
                '<div class="row">'+
                     
                    '<div class="form-group col-lg-6">'+
                        '<label  id="lblregione" for="regione">Regione</label>'+
                        '<select  name="regione" id="regione"  class="form-control" ></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-6">'+
                        '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                        '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-8">'+
                        '<label  id="lblcomune" for="comune">Comune</label>'+
                        '<select  name="comune" id="comune"  class="form-control"></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label  id="lblcap" for="cap">CAP</label>'+
                        '<select  name="cap" id="cap"  class="form-control" ></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label >alt. Slm</label>'+
                        '<input type="text" class="form-control" name="alt_Slm" id="alt_Slm" placeholder="alt. Slm" readonly>'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label >Gradi giorno</label>'+
                        '<input type="text"  name="gradi_giorno" id="gradi_giorno"  class="form-control" placeholder="Gradi giorno" readonly>'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label >Zona climatica</label>'+
                        '<input type="text"  name="zona_climatica" id="zona_climatica"  class="form-control" placeholder="Zona climatica" readonly>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group col-lg-6">'+
                '<div class="row">'+
                    '<div id="preview" class="form-group col-lg-12">'+
                        '<img id="zona_clima" src=".\\css\\img\\zona_climatica.jpg" />'+
                    '</div>'+
                '</div>'+
            '</div>'+    
        '</div>'+     
       
            '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>'+
                //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
            '</div>'+
       
        '<div id="email" name="email"></div>';
        that.$("#generali").append(varForm);
        console.log(app.global.nick_array.data);
        //----------------------------------------------------------------------
        if(!isNew && app.global.nick_array.data.email.length>0){ 
           
           
                
                console.log(app.global.nick_array.data.email);
                
            for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {
            $iEmail=$i;

            // $("#email").append(  
            varForm=        
                '<div class="row">'+
                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.data.email[$i]['id']+'">'+  

                    '<div class="form-group col-lg-8">'+
                        '<input type="text" class="form-control lab2'+$i+'"  name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.data.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                    '</div>'+
                    '<!--div class="form-group col-lg-3">'+
                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.data.email[$i]['emailNome']+'" placeholder="Nome Email">'+
                    '</div-->'+
                    '<div class="form-group col-lg-3">'+
                    '<select name="email['+$i+'][emailLabel]" id="email['+$i+'][emailLabel]"  class="form-control lab'+$i+'" ></select>'+    '</div>'+
                     '<div class="form-group col-lg-1">'+
                      '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                    '</div>'+

                '</div>'
                //   '<hr class="style13">'   
            ;
            that.$("#email").append(varForm); 
            //-----------------------------------------------------------
           
            var  $selLabelEmail=that.$(".lab"+$i);
            var  $newEmail=that.$(".lab2"+$i);
           
                $selLabelEmail.empty();
                   
                $aa=app.global.nick_array.data.email_label;
                  
                $selLabelEmail.append('<option value="0"></option>');
                    $.each($aa, function(ii,value) {
                      
                    $selLabelEmail.append('<option value="'+value.id+'">'+value.name+'</option>');
                });
                isNew?$selLabelEmail.val(0):$selLabelEmail.val(app.global.nick_array.data.email[$i]['id_label']);//

            //-------------------------------------------------------------------
             
          
            
          /*  $.when(  $mydata.done(function() {
                console.log($mydata);
            $selLabel.empty();
               $aa=$mydata.data;
                $selLabel.append('<option value="0"></option>');
                $.each($aa, function(i, value) {
                  $selLabel.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["nome"]+'</option>');
               });
          
                if(isNew){
                parseInt($selLabel.val());//
            }else{
                $selLabel.val(parseInt($row.email[$i]['emailNome']));//
                console.log("selLabel="+$row.email[$i]['emailNome']+" arr="+_.keys($row));
            }
              
            }));*/
           $newEmail.on('change', function(e) {
                testaEmail($newEmail,$selLabelEmail);
            });
            $selLabelEmail.on('change', function(e) {
                testaEmail($newEmail,$selLabelEmail);
            });
                         
            that.$('.removeEmail'+$iEmail).click(function(e) {
                $idx= $(this).attr("idx");
                $idxi= that.$("#generaliForm").find('input[name="email['+$idx+'][id]"]').val();

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
            that.$("#generaliForm").validate(); //sets up the validator
              
            // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
            that.$("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                required: true,
                // minlength: 2,
                email: true,

                messages: {
                    required: "Required input",
                    minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    email:"Deve essere una email valida!"
                }
            });

        }//end for
  
        }//end if    
    //----------------------------------------------------------------------
varForm=    '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>'+
                   // '<button type="button" id="telefonoPlus" name="telefonoPlus" class="btn btn-default btn-lg telefono-Plus">'+
                    '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                //'</button>'+
            '</div>'+
             
        '<div id="telefoni" name="telefoni" ></div>';
    that.$("#generaliForm").append(varForm);
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

                '</div>' ;
            that.$("#telefoni").append(varForm);     
            that.$('.removeTel'+$iTel).click(function(e) {
                $idx= $(this).attr("idx");
                $idxi= that.$("#generaliForm").find('input[name="telefoni['+$idx+'][id]"]').val();

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
            that.$("#generaliForm").validate(); //sets up the validator
              
            // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
             that.$("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
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
    //---------------------------------------------------------------------------------- 
    varForm=   
            '<div class="row">'+
                '<div class="form-group col-lg-6">'+     
                    '<label for="device1">Dispositivo 1</label>'+
                    '<input type="text" class="form-control" name="device1" id="device1" placeholder="Dispositivo 1">'+
                '</div>'+
                
                '<div class="form-group col-lg-6">'+
                    '<label for="device2">Dispositivo 2</label>'+
                    '<input type="text" class="form-control" name="device2" id="device2" placeholder="Dispositivo 2">'+
                '</div>'+
            '</div>'+  
            '<div class="row">'+
                '<div class="form-group col-lg-4">'+     
                    '<div class="radio-inline">'+
                        '<label><input type="radio" value="1" name="tipoResRef" id="tipoResRef" checked>Referente</label>'+
                    '</div>'+
                    '<div class="radio-inline">'+
                        '<label><input type="radio" value="2" name="tipoResRef" id="tipoResRef">Responsabile</label>'+
                    '</div>'+
                    '<select  name="resRef" id="resRef"  class="form-control" ></select>'+
                '</div>'+

                '<div class="form-group col-lg-4">'+
                    '<label for="coordinatore">Coordinatore</label>'+
                    '<select  name="coordinatore" id="coordinatore"  class="form-control" ></select>'+
                '</div>'+
                '<div class="form-group col-lg-4">'+
                    '<label for="coordinatore">Incaricato registro antincendio</label>'+
                    '<select  name="incaricato" id="incaricato"  class="form-control" ></select>'+
                '</div>'+
            '</div>'+ 
             '<div class="row">'+
                '<div class="form-group col-sm-12">'+
                    '<label>Note </label>'+

                   '<textarea class="form-control" name="note" id="note"  rows="3" ></textarea>'+

                '</div>'+
            '</div>'+ 
                '<div class="form-group">'+
                    '<input type="checkbox" class="form-check-input" name="valid" id="valid" >'+
                    '<label class="form-check-label" for="valid">Valido</label>'+
                '</div>'+
          
            '<div class="row">'+
                '<div class="form-group col-lg-12 ">'+ 
                    '<button type="button" id="btnGenerali" name="btnGenerali" class="btn btn-primary submit ">Submit</button>'+
                '</div>'+

            '</div>'+ //add input box
    '</form>';//end form generali
    that.$("#generaliForm").append(varForm);
              
    //-----------------------------------------------------------------------------------
    $.validator.addMethod("username_regex", function(value, element) {   
        return this.optional(element) || /^\b[a-z0-9\-_àòèù.' ]{3,100}$/i.test(value); 
        // return this.optional(element) || /^[a-z0-9\.\-_]{3,30}$/i.test(value);   
    }, "Perfavore seleziona solo i caratteri consentiti!");  
                
    that.$("#generaliForm").validate({

        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 100,
                username_regex: true
            },
            comune: {
                required: true

            },
            "telefoni":{
                required: true,
                minlength: 6,
                number:true
            },
            "email":{
                required: true,
                email: true
                
            }

        },
        messages: {
            name: {
                required: "Perfavore inserisci il nome del Servizio",
                minlength: "Il nome del Servizio deve contenere perlomeno 3 caratteri"
            },
            comune: {
                required: "Perfavore inserisci il Comune"

            },
            email:"Deve essere una email valida!!"
        }/*,
        submitHandler: function (form) {
         alert("Validation Success!");
         //  return true; // if you need to block normal submit because you used ajax
        }*/
    });
    
    var $tipoServizio=that.$("#tipoServizio");
    var $areaServizio=that.$("#areaServizio");    
    var $selRegione=that.$("#regione");
    var $selProvincia=that.$("#provincia");
    var $selComune=that.$("#comune");
    var $selCap=that.$("#cap");
    var $selCoordinatore=that.$("#coordinatore");
    var $selReferente=that.$("#resRef");
    var $selIncaricato=that.$("#incaricato");
           
    regioni();//catena regioni->province->comuni->cap
    areaServizio();
    if(!isNew){
             referenteA(app.global.nick_array.data.tipoRefRes);
           }else{
                $selReferente.append('<option value="0"></option>');
           }
   
    //tipoServizio();
    coordinatore();
    incaricato();
     //-------------------------------sel label email------------------------------------------
    function  emailLabel($selLabel){
          console.log($selLabel);
        $selLabel=$("#"+$selLabel)  ; 
        var jsonObj = {};
        //jsonObj.action = "regione";
        //jsonObj.type = app.global.nick_array.arr;
        jsonObj.action = "list";
        jsonObj.type = "email_label";

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
           
        $.ajax({
           url:app.global.json_url + 'persons/list/email_label/3/Tutti/',
           type:'get',
           headers : $headers,
           data: jsonObj,
           dataType : 'text',
            success: function (json) {
               $mydata =JSON.parse(json);
               console.log($mydata);
               //return $mydata;
               $selLabel.empty();
               $aa=$mydata.data;
               $selLabel.append('<option value="0"></option>');
                $.each($aa, function(i, value) {
                    console.log($aa[i]["id"],$aa[i]["name"]);
                  $selLabel.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
               });
             // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                if(isNew){
                parseInt($selLabel.val());//
            }else{
                $selLabel.val(parseInt($row.id_label));//seleziona toscana
                console.log("sellab="+$row.id_label+" arr="+_.keys($row));
            }

             
            }  
        });
    }
    
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
            jsonObj.type = "comuni";
            
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
                   $selComune.append('<option value="0">Seleziona il Comune</option>');
                    $.each($aa, function(i, value) {
                      $selComune.append('<option value="'+$aa[i]["id"]+'" data-alt="'+$aa[i]["alt_Slm"]+'" data-gradi="'+$aa[i]["gradi_giorno"]+'" data-zona="'+$aa[i]["zona_climatica"]+'">'+$aa[i]["comune"]+'</option>');
                   
                   });
               // $selComune.val(2797);//seleziona firenze
                if(isNew){
                    parseInt($selComune.val());//seleziona comune firenze 2797
                   
                }else{
                     $selComune.val(parseInt($row.id_comune));//seleziona pr firenze 33
                   
                     
                }
                 $("#alt_Slm").val($selComune.find(':selected').data('alt'));
                    $("#gradi_giorno").val($selComune.find(':selected').data('gradi'));
                    $("#zona_climatica").val($selComune.find(':selected').data('zona'));
                 cap();
                }
            });
        }       
    //-------------------------------cap------------------------------------------
           
    function  cap(){    
            
            var jsonObj = {};
           jsonObj.action = "list";
            jsonObj.type = "cap";
            
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
                
                  
                }
            });
        }       
        
    //-------------------------------coordinatori------------------------------------------
           
    function  coordinatore(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "coordinatore";
            
            jsonObj.area = $areaServizio.val();
            
            if(isNew){
                jsonObj.coordinatore = parseInt($selCoordinatore.val());
           }else{
                jsonObj.coordinatore= parseInt($row.id_coordinatore);
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
                   $selCoordinatore.empty();
                   $aa=$mydata.data;
                    $selCoordinatore.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selCoordinatore.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["coordinatore"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selCoordinatore.val();//seleziona pr firenze 33
                    
                }else{
                     $selCoordinatore.val(parseInt($row.id_coordinatore));//seleziona pr firenze 33
                                        
                }
                
                }
            });
        }       
                
    //-------------------------------referenti------------------------------------------
           
    function  referenteA(tipoResRef){  
            console.log('resRef='+tipoResRef);
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "resRef";
          
                     
            
            if(isNew){
                jsonObj.refRes = parseInt($selReferente.val());
                jsonObj.typeReparto = parseInt($areaServizio.val());
                jsonObj.typeAction = parseInt($("input[name='tipoResRef']:checked").val());
                //jsonObj.typeAction =tipoResRef;
            }else{
                 jsonObj.refRes= parseInt($row.id_refRes);
                 jsonObj.typeReparto = parseInt($row.id_areaServizio);
                 jsonObj.typeAction =tipoResRef;// parseInt($row.tipoRefRes);

            }
           
       //    if(jsonObj.refRes==0){return;}
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
                    $.each($aa, function(i, value){
                        $selReferente.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["refRes"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selReferente.val();//seleziona pr firenze 33
                }else{
                    $("input[name=tipoResRef][value=" + $row.tipoRefRes + "]").attr('checked', 'checked');
                    $selReferente.val(parseInt($row.id_refRes));//seleziona pr firenze 33
                     
                }
               
                }
            });
        }       
      //-------------------------------incaricato registro antincendio------------------------------------------
           
    function  incaricato(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "incaricato";
            
           
            
            if(isNew){
                jsonObj.servizio="";
           }else{
                jsonObj.servizio= parseInt($row.id);
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
                   $selIncaricato.empty();
                   $aa=$mydata.data;
                    $selIncaricato.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selIncaricato.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["incaricato"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selIncaricato.val();//seleziona pr firenze 33
                    
                }else{
                     $selIncaricato.val(parseInt($row.id_incaricato));//seleziona pr firenze 33
                                        
                }
                
                }
            });
        }     
    //-------------------------------area servizio------------------------------------------
           
    function  areaServizio(){  
           
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "areaServizio";
            jsonObj.typeAction = 0;
           
            
          
            
            if(isNew){
                jsonObj.areaServizio = parseInt($areaServizio.val());
               
           }else{
                jsonObj.areaServizio= parseInt($row.id_areaServizio);
               
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
                   $areaServizio.empty();
                   $aa=$mydata.data;
                   $areaServizio.append('<option value="0"></option>');
                   $.each($aa, function(i, value) {
                   $areaServizio.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                    $areaServizio.val();//seleziona pr firenze 33
                }else{
                    $areaServizio.val(parseInt($row.id_areaServizio));//seleziona pr firenze 33
                    
                }
                
                }
            });
        }       
    //-------------------------------tipo servizio------------------------------------------
       
    
    function  tipoServizio(){  
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "tipoServizio";
            jsonObj.typeAction = 0;
           
            
           
            
            if(isNew){
                jsonObj.tipoServizio = parseInt($tipoServizio.val());
               
           }else{
                jsonObj.tipoServizio= parseInt($row.id_tipoServizio);
               
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
                    $tipoServizio.empty();
                    $aa=$mydata.data;
                    $tipoServizio.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        $tipoServizio.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+' (CDC='+$aa[i]["cdc"]+')</option>');
                    });
                    // $selComune.val(2797);//seleziona firenze
                    if(isNew){
                        $tipoServizio.val();//seleziona pr firenze 33
                    }else{
                        $tipoServizio.val(parseInt($row.id_tipoServizio));//seleziona pr firenze 33

                    }
                
                }
            });
        }       
    //-------------------------------------------------------------------------------------------
     if(!isNew){//update
        if(app.global.nick_array.data.valid==="1" | app.global.nick_array.data.valid===true){$active=true}else{$active=false}
        that.$('#id').val( app.global.nick_array.data.id);
       
        that.$('#name').val(he.decode(app.global.nick_array.data.name));
        that.$('#indirizzo').val( app.global.nick_array.data.indirizzo);
        that.$('#orariServizio').val( app.global.nick_array.data.orari);
        that.$('#device1').val( app.global.nick_array.data.device1);
        that.$('#device2').val( app.global.nick_array.data.device2);
        that.$('#cdc').val( app.global.nick_array.data.CDC);
        that.$('#tipoServizio').val( app.global.nick_array.data.categoria);
        that.$('#note').val(he.decode(app.global.nick_array.data.note));
            that.$('#blah').attr('src', app.global.nick_array.data.img_link);
                    
      

     
    }
    //-------------------------------------event----------------------------------------------------------------
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
            }
            
        }
        
        
        that.$('#regione').change(function (e,value,row) {
            isNew=true;
            $("#alt_Slm").val("");
            $("#gradi_giorno").val("");
            $("#zona_climatica").val("");
            province();   
        });
        that.$('#provincia').change(function (e) {
            isNew=true;
            $("#alt_Slm").empty();
            $("#gradi_giorno").empty();
            $("#zona_climatica").empty();
            comuni();
        });
        that.$('#comune').change(function (e,row) {
          
            isNew=true;
           
            $("#alt_Slm").val($(this).find(':selected').data('alt'));
            $("#gradi_giorno").val($(this).find(':selected').data('gradi'));
            $("#zona_climatica").val($(this).find(':selected').data('zona'));
                       
            cap();
        });
        that.$('#areaServizio').change(function (e,value,row) {
            isNew=true;
            //console.log($(this).val());
            tipoServizio($(this).val());
            coordinatore();
            referenteA();
        });
        
        that.$('.email-Plus').click(function () {
            $iEmail = $iEmail + 1;
            $i = $iEmail

            that.$("#email").append(
            '<div class="row">'+
                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                    '<div class="form-group col-lg-8">'+
                        '<input type="text" class="form-control labE'+$i+'" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                    '</div>'+
                    '<div class="form-group col-lg-3">'+
                    '<select name="email['+$i+'][emailLabel]" id="email['+$i+'][emailLabel]"  class="form-control lab'+$i+'" ></select>'+    '</div>'+
                    '<!--div class="form-group col-lg-3">'+
                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                    '</div-->'+
                    '<div class="form-group col-lg-1">'+
                        '<a class="removeEmail'+$iEmail+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                    '</div>'+

                 '</div>'
                  // '<hr class="style13">'   
            );
            var  $selLabelEmail=that.$(".lab"+$i);
            var  $newEmail=that.$(".labE"+$i);
           
            $selLabelEmail.empty();
                   
            $aa=app.global.nick_array.data.email_label;
                  
            $selLabelEmail.append('<option value="0"></option>');
            $.each($aa, function(ii,value) {

                $selLabelEmail.append('<option value="'+value.id+'">'+value.name+'</option>');
            });
            $newEmail.on('change', function(e) {
                testaEmail($newEmail,$selLabelEmail);
            });
            $selLabelEmail.on('change', function(e) {
                testaEmail($newEmail,$selLabelEmail);
            });
        
      
                
            $('.removeEmail'+$iEmail).children().each(function(){
                $(this).click(function() {
                    $(this).closest(".row").remove();

                });
            });
               
            that.$("#generaliForm").validate(); //sets up the validator

            // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
             that.$("input[name=\"email["+$i+"][email]\"]").rules( "add", {
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
                that.$("#generaliForm").validate(
                    {
                         onfocusout: false,
    invalidHandler: function(form, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {                    
            validator.errorList[0].element.focus();
        }
    } 
                    }
                ); //sets up the validator
              
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
        that.$('input[type="radio"]').on('change', function(e) {
          
            if(e.target.value==1){
              
              // isNew=true;
               referenteA(1);
               console.log('1')
               
            }else if(e.target.value==2){
               
            //   isNew=true;
                referenteA(2);
              console.log('2')
            }
        
        });
        that.$('#btnGenerali').click(function(e) {
        console.log("sub_general");
        
        
        if(that.$("#generaliForm").valid()){
        sendGenerali(e);}
        });
        
     
        //-------------MODULI/NAVBAR--------------------------------------------
        that.$('#moduli').click(function () {
            var  uurl=app.global.json_url+'types/';
            // isNew=true;
            // isCsv=true;


            jsonObj = {};
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.id_person = app.global.nick_array.data.id_person;
            jsonObj.id_department = app.global.nick_array.data.id;
            jsonObj.action = "list";  
            jsonObj.type = "navbar";  
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

                $depNavbar= $mydata.department_navbar;//sono la configurazione(en,cheled,active dei navbar x quel servizio in glr_department_navbar
               console.log($depNavbar);
                that.$(".modal-body").empty();//costruisco e valorizzo modularmente

                varForm='<div class="panel panel-default">'+
                           '<div class="panel-heading"><b>Ci sono '+$depNavbar.length+' Moduli/Navbar</b></div>'+
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
                    if(elem.checked !== true){
                        console.log(".L0"+elem.id);
                        $.each($depNavbar, function( key, value) {//$depNavbar ->array stato(active) navbar x quel servizio
                            //mystr=$("#lblactive"+value.id).attr('class');
                            mystr=$(value.activeX).attr('class');
                            console.log(value);
                            console.log('id='+value.id+' -> '+mystr);
                             console.log(mystr+'='+$str+"X");
                            console.log(mystr+'='+"L0"+elem.id+"X");
                        if(mystr.includes("L0"+elem.id+"X")  ){
                            if($str===".L0"+elem.id){ 
                                   console.log($str+"==.L0"+elem.id);
                                that.$($str).hide();
                                that.$($str+"X").prop("checked",false);
                            }else{
                                console.log($str+"X");
                                // $("#lbl"+elem.id).hide();
                                that.$($str).hide();
                                that.$($str+"X").prop("checked",false);
                                that.$($str+"X").prop("disabled",true);
                            }
                        
                        }  
                        
                        });
                       
                    }else{
                    //    console.log("#"+elem.id);
                      //  $("#lbl"+elem.id).show();
                        that.$($str).show();
                        that.$($str+"X").prop("checked",true);
                        that.$($str+"X").prop("disabled",false);
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
                $depLabel= $mydata.department_name.name;
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
                    jsonObj.id_dep = app.global.nick_array.data.id;
                    jsonObj.action = "update";  
                    jsonObj.type = "navbar";  
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
        //----------------------------------------------------------------------
   
    console.log("generali="+isNew);
};
function testaEmail($newEmail,$selLabelEmail){
         var $em,$lbl=0;       
    $.each(app.global.nick_array.data.email,function($key,$value){
                    if($newEmail.val()==$value["email"]){
                       $em=1;
                    }

                });
                   
                $.each(app.global.nick_array.data.email,function($key,$value){
                    if( $selLabelEmail.val()==$value["id_label"]){
                       alert("Attenzione esiste già un'etichetta con questo nome")
                       $selLabelEmail.val(0);
                    }

                });
        }
function sendGenerali(event) {
    event.preventDefault();
     
   
    var API_URL = app.global.json_url + 'types/';
    var that = this;
    var jsonObj = sendGenerali_formToJson(that);
    
       

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
        //-----------------------------
        //data: form_data,
        //contentType: false,       // The content type used when sending data to the server.
        //cache: false,             // To unable request pages to be cached
        //processData:false,        // To send DOMDocument or non processed data file it is set to false 
        //----------------------------
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
            app.routers.router.prototype.data_type_edit();
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

            console.error("send urbans error!!!");
            bootbox.dialog({
            title: that.language.error_message,
            message: that.language.error_message +" = "+response.responseText+" excp="+exception+" 2="+response.getAllResponseHeaders()+" 3="+_.keys(response.statusCode()),
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
       

        
    };
function sendGenerali_formToJson(that) {
    var isNew=app.global.nick_array.isNew;
    var $folder=""
    if(!isNew){$folder=app.global.nick_array.data.name;}
        
    var data = {};
            
        that.$('#generaliForm').find('input[name]').each(
            function () {
                console.log("che="+$(this).attr('name')+"---"+ $(this).prop("checked")) ; 
                if( $(this).attr('name')==="valid") {
                 
                    if($(this).prop("checked")===true){
                        
                        data[$(this).attr('name')] = 1;
                    }else{
                       data[$(this).attr('name')] = 0; 
                    }
                   
                console.log("cheV="+$(this).attr('name')+"---"+ $(this).prop("checked")+"---val="+ data[$(this).attr('name')]);   
                }else{

                    data[$(this).attr('name')] = $(this).val();
                }     
            }
        );
            
        that.$('#generaliForm').find('select[name]').each(
        function () {
                if($(this).val()===null){
                    data[$(this).attr('name')] =""   
                }else{
                    data[$(this).attr('name')] = parseInt($(this).val());    
                }
                

        });
           
          
            
            console.log("uche="+ that.$('#generaliForm').find('input[name="valid"]').prop("checked")) ; 
            console.log("cherow="+ data.id+" - "+data.valid+"---"+_.keys(data)) ; 
       
       
       
        //---------------serialize form-----------------------------------------------
          //  var data = {};

    

$.each(that.$('#generaliForm').serializeArray(), function() {
 //$.each(row, function() {
    var val = this.value;
    var c = this.name.split("[");
    var a = buildInputObject(c, val);
    $.extend(true, data, a);
  });
  
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
    var typeValid= data['valid']===0 ? "0" : "1";
    data['valid']=typeValid 
   
        //-------------------------------------------------------------------------     
          
        //----------------------------------------------------------------------------
        var jsonObj = {};
        function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
      jsonObj.file64= reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

var file = document.getElementById("file").files[0];
//getBase64(file); // prints the base64 string
    
    if (window.File && window.FileList && window.FileReader) {
            function showFile() {
                var preview = document.getElementById("preview");
                var fileInput = document.querySelector("input[type=file]");
                for (var i = 0; i < fileInput.files.length; i++) {
                    var reader = new FileReader();
                    reader.onload = function(readerEvent) {
                        var listItem = document.createElement("li");
                        listItem.innerHTML = "<img src='" + readerEvent.target.result + "' />";
                        preview.append(listItem);
                    }
                    reader.readAsDataURL(fileInput.files[i]);
                }
            }
            } else {
            alert("Your browser is too old to support HTML5 File API");
            }
            function toDataURL(url, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onload = function() {
                var fileReader = new FileReader();
                    fileReader.onloadend = function(){
                        callback(fileReader.result);
                    }
                    fileReader.readAsDataURL(httpRequest.response);
            };
            httpRequest.open('GET', url);
            httpRequest.responseType = 'blob';
            httpRequest.send();
         }
        var selectedfile = document.getElementById("file").files;
          /*
    if (selectedfile.length > 0) {
                console.log("1");
    toDataURL(document.getElementById("file").files, function(dataUrl) {
         //document.write('Result in string:', dataUrl)
         jsonObj.file64= dataUrl;
      })}*/
//----------------------------------------------------------------
            
    
            var typeId =data['id']; 
            var typej= typeId ? 'update' : 'add';
             
           
            jsonObj.action = typej;
            jsonObj.tab = "generali";
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.id_ser = typeId ? app.global.nick_array.data.id : "";
            jsonObj.data=data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            
            if(app.global.nick_array.arr==="DEPARTMENTS"){
                if(data['name']===$folder){
                  
                }else{
                    jsonObj.oldFolder=$folder; 
                }
                
            }
            
            
             
            jsonObj = JSON.stringify(jsonObj);
        return jsonObj;
    

    };

function rap_urbanistici(that,$row){//prima carico i dati urbanistici
   getUrbans(that,$row) 
   
}
function rap_urbanistici1(that,$row){//
    console.log(app.global.nick_array.urbanistici);
    var $iCat=0;
    var $iPratica=0;
    var $iAlle=0;
    var $iUrbAlle=0;
    var $iPraticaAlle=[];
    
    var isNew=app.global.nick_array.isNew;
    var API_URL = app.global.json_url ;
    that.$("#urbanistici").empty();
    varForm='<h3> Dati Urbanistici  - '+app.global.nick_array.data.comune+'</h3><br>'+
            '<form class="urbansForm" id="urbansForm" name="urbansForm" method="post">'+    
                '<input type="hidden" class="form-control" name="id_urb" id="id_urb">'+ 
                '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+ 
                '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                    '<label id="lblCatMas" class="form-group  col-lg-4" ><h4>Dati catastali <span class="badge">'+app.global.nick_array.urbanistici.catastali.length+' </span></h4></label>'+
                    '<a class="cat-Plus"  title="Add Foglio"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+ 
                    '<label  class="form-group pull-right" > Comune Catastale = '+app.global.nick_array.data.cat+'</label>'+
                '</div>'+
                '<div id="catasto" ></div>';
    that.$("#urbanistici").append(varForm);
    //----------------------------------------------------------------------
    if(!isNew && app.global.nick_array.urbanistici.catastali.length>0){ 
                
        for ($i = 0; $i <app.global.nick_array.urbanistici.catastali.length; $i++) {
            $iCat=$i;

            varForm=   
            '<div class="row">'+
                '<input type="hidden" class="form-control" name="cat['+$i+'][id]" id="cat['+$i+'][id]" value="'+app.global.nick_array.urbanistici.catastali[$i]['id']+'">'+ 
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblFog"  for="cat['+$i+'][foglio]">Foglio</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][foglio]" id="cat['+$i+'][foglio]" value="'+app.global.nick_array.urbanistici.catastali[$i]['foglio']+'" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblPart"  for="cat['+$i+'][particella]">Particella</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][particella]" id="cat['+$i+'][particella]" value="'+app.global.nick_array.urbanistici.catastali[$i]['particella']+'" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblCat"  for="cat['+$i+'][sub]">Subalterno</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][sub]" id="cat['+$i+'][sub]" value="'+app.global.nick_array.urbanistici.catastali[$i]['subalterno']+'" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label  >Rendita catastale specifica</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][specifica]" id="cat['+$i+'][specifica]" value="'+app.global.nick_array.urbanistici.catastali[$i]['specifica']+'" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblNote"  for="cat['+$i+'][note]">Note</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][note]" id="cat['+$i+'][note]" value="'+app.global.nick_array.urbanistici.catastali[$i]['note']+'" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-1">'+
                    '<a class="removeCatastali'+$iCat+'" idx="'+$i+'" href="javascript:" title="Elimina Foglio"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                '</div>'+
                 '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">-*-*-</div>'+
            '</div>'    
              
            ;
            that.$("#catasto").append(varForm);     
                           
            that.$('.removeCatastali'+$iCat).click(function(e) {
                $idx= $(this).attr("idx");
                $idxi= that.$("#urbansForm").find('input[name="cat['+$idx+'][id]"]').val();

                $(this).closest(".row").remove();

                var jsonObj = {};
                jsonObj.id=$idxi;
                jsonObj.type="catastali";
                jsonObj.id_ser = app.global.nick_array.urbanistici.id_ser;
                jsonObj.tab = "urbanistici";
                jsonObj.action = "del";
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL+'servizi/',
                    type:'post',
                    headers : $headers,
                    data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);
                   }           
                });
                                   
            });
            $("#urbansForm").validate(); //sets up the validator
              
            // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
            $("input[name=\"catastali["+$i+"][foglio]\"]").rules( "add", {
                required: true,
                // minlength: 2,
                

                messages: {
                    required: "Required input",
                    minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
                   
                }
            });

        }//end for
    }//end if  
    //  
    //--------------------------------------------------------------------------------------------------------------------
        varForm='<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                    '<label id="lblCatMas" class="form-group  col-lg-4" ><h4>Dati rendita catastale </h4></label>'+
                '</div>'+
                '<div id="rendita" >'+
                    '<div class="row">'+
                         
                        '<div class="form-group col-lg-2">'+
                            '<label   id="lblCatCat"  for="catCat">Categoria Catastale</label>'+
                            '<div class="input-group">'+
                                
                                '<input type="text" class="form-control" name="catCat" id="catCat" placeholder=""   onkeyup="this.value = this.value.toUpperCase()" >'+
                                       
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label   id="lblRendCat"  for="rendCat">Rendita Catastale</label>'+
                            
                            '<div class="input-group">'+
                                '<span class="input-group-addon">€</span><input type="text" class="form-control" name="rendCat" id="rendCat"  placeholder="" >'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label   id="lblClasse"  for="rendCat">Classe</label>'+
                            
                            '<div class="input-group">'+
                                '<input type="text" class="form-control" name="classe" id="classe"  placeholder="" >'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label   id="lblConsistenza"  for="consistenza">Consistenza</label>'+
                            
                            '<div class="input-group">'+
                                '<input type="text" class="form-control" name="consistenza" id="consistenza"  placeholder="" >'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label   id="lblLink"  >I dati catastali sono da verificare a questo indirizzo:<a href="https://sister3.agenziaentrate.gov.it/CitizenVisure" target="_blank">Visura</a> </label>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                    '<label id="lblUrbMas" class="form-group  col-lg-4" ><h4>Pratiche urbanistiche in archivio  <span class="badge">'+app.global.nick_array.urbanistici.pratica.length+' </span></h4></label>'+
                    '<a class="urb-Plus"  title="Add Pratica"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+ 
                '</div>'+
                '<div id="pratica" ></div>'+
                
                '<div class="row">'+
                    '<div class="form-group col-lg-12 ">'+ 
                        '<button type="button" id="btnUrbans" name="btnUrbans" class="btn btn-primary submit ">Submit</button>'+
                    '</div>'+
                   
                '</div>'+
        '</form>';//end form urbans

    that.$("#urbansForm").append(varForm);
    //------------------------------------------------------------------------------------------------------------------------------
    if(!isNew && app.global.nick_array.urbanistici.pratica.length>0){ 
        
        for ($i = 0; $i <app.global.nick_array.urbanistici.pratica.length; $i++) {
                $iPratica=$i;
                $dataD="";
                //$iPraticaAlle[$i]
                if(app.global.nick_array.urbanistici.pratica[$i]['data']!=="0000-00-00 00:00:00" && app.global.nick_array.urbanistici.pratica[$i]['data']!==null){
                $dataD=moment(app.global.nick_array.urbanistici.pratica[$i]['data']).format('DD/MM/YYYY');
                }else{
                 $dataD="";   
                }
                console.log("dataD="+$dataD);
                varForm=        
                '<div class="row">'+
                    '<input type="hidden" class="form-control" name="pratica['+$i+'][id]" id="pratica['+$i+'][id]" value="'+app.global.nick_array.urbanistici.pratica[$i]['id']+'">'+  

                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblTipo"  for="pratica['+$i+'][tipo]">Tipologia Pratica</label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][tipo]" id="pratica['+$i+'][tipo]" value="'+app.global.nick_array.urbanistici.pratica[$i]['tipo']+'" placeholder="" col-lg-7>'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label   id="lblDescrizione"  for="pratica['+$i+'][descrizione]">Descrizione Pratica <span class="badge">'+($i+1)+'</span></label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][descrizione]" id="pratica['+$i+'][descrizione]" value="'+app.global.nick_array.urbanistici.pratica[$i]['descrizione']+'" placeholder="" col-lg-7>'+
                    '</div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblData"  for="pratica['+$i+'][data]">Data di presentazione</label>'+        
                        '<div class="input-group date" id="datetimepicker'+$i+'">'+
                            '<input type="text" id="pratica['+$i+'][data]" name="pratica['+$i+'][data]" value="'+$dataD+'" class="form-control" />'+
                            '<span class="input-group-addon">'+
                                '<span class="glyphicon glyphicon-calendar"></span>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblEnte"  for="pratica['+$i+'][ente]">Ente di presentazione</label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][ente]" id="pratica['+$i+'][ente]" value="'+app.global.nick_array.urbanistici.pratica[$i]['ente']+'" placeholder="">'+
                    '</div>'+
                     
                    '<div class="form-group col-lg-1" >'+
                        '<label id="lblAlleMas" >All.<span class="badge">'+app.global.nick_array.urbanistici.pratica[$i].allegato.length+'</span></label>'+
                        '<button type="button" id="alle-Plus" class="alle-Plus form-control"      pratica="'+$i+'" title="Add Allegato" >Add</button>'+ 
                       // '<button type="button" id="alle-Plus" class="alle-Plusss form-control" data-toggle="modal" data-target="#modal"  data-title="Add AllegatoOr"  alle="'+$iPraticaAlle[$i]+'" pratica="'+$i+'" title="Add Allegato">Add File</button>'+ 
                    '</div>'+
                    '<div class="form-group col-lg-1">'+
                        '<a class="removePratica'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Pratica"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                    '</div>'+
                    '<div id="allegati'+$i+'" ></div>'+
                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">-*-*-</div>'+
                '</div>'
                //   '<hr class="style13">'   
            ;
            that.$("#pratica").append(varForm);     
           
            //-----------------------------------------------------------------------------  
            if(!isNew && app.global.nick_array.urbanistici.pratica[$i].allegato.length>0){ 

                for ($ii = 0; $ii <app.global.nick_array.urbanistici.pratica[$i].allegato.length; $ii++) {
                    console.log(app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id_pratica+"=="+app.global.nick_array.urbanistici.pratica[$i]['id']);
                    if(app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id_pratica==app.global.nick_array.urbanistici.pratica[$i]['id']){
                          if($ii%2==0){
                                   $bkg="background-color: #ccf0de";
                               }else{
                                  $bkg="background-color: #d5f5f4"; 
                               }

                        that.$("#allegati"+$i).append(
                            '<div class="alle" style="'+$bkg+'">'+
                                '<input type="hidden" class="form-control" name="pratica['+$i+'][alle]['+$ii+'][id]" id="pratica['+$i+'][alle]['+$ii+'][id]" value="'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'">'+  
                               
                                '<div class="form-group col-lg-9">'+
                                    '<label  id="lblDescrizione"  for="pratica['+$i+'][alle]['+$ii+'][descrizione]">Descrizione Allegato  <span class="badge">'+($ii+1)+'</span></label>'+
                                    '<input type="text" class="form-control" name="pratica['+$i+'][alle]['+$ii+'][descrizione]" id="pratica['+$i+'][alle]['+$ii+'][descrizione]"  value="'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].descrizione+'" placeholder="" >'+
                                '</div>'+
                                '<div class="form-group col-lg-3">'+
                                    '<a class="download'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'" idAlle="'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'" href="javascript:" title="PDF" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;'+
                                    '<a class="view'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'"  idAlle="'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;'+ 
                                    '<a class="removeAlle'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'" idx="'+$ii+'" idAlle="'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id+'" href="javascript:" title="Delete Allegato"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                '</div>'+
                                '<div class="form-group col-lg-12"  style="background-color: #f5f5f5"></div>'+
                            '</div>');
                        that.$('.removeAlle'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id).click(function(e) {
                        
                               
                            $idAlle= $(this).attr("idAlle");
                            console.log("removeAlle id"+$idAlle); 
                            if (confirm('Sei sicuro di voler rimuovere questo allegato ?')) {
                                var jsonObj = {};
                                jsonObj.id=$idAlle;
                                jsonObj.id_ser = app.global.nick_array.urbanistici.id_ser;
                                jsonObj.tab = "urbanistici";
                                jsonObj.type="allegato";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);

                                $.ajax({
                                    url:API_URL+'servizi/',
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
                                            rap_urbanistici(that,1);
                                        }
                                    }           
                                });

                                $(this).closest(".alle").remove();
                                rap_urbanistici(that,1);
                            }
                        }); 
                        that.$('.download'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id).click(function(e) {
                        //'click .download': function (e, value, row,index) {
                        
                            $idAlle= $(this).attr("idAlle");
                            jsonObj = {};
                            jsonObj.action = "download";
                            jsonObj.type = "allegato";
                            jsonObj.id_ser = app.global.nick_array.urbanistici.id_ser;
                            jsonObj.tab = "urbanistici";
                            jsonObj.id=$idAlle;
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
                    
                            $.ajax({
                                url:API_URL+'servizi/',
                                type:'post',
                                headers : $headers,
                                data :  jsonObj,
                                dataType : 'text',
                                 success: function (datap) {
                                   $mydata =JSON.parse(datap);
                                  console.log($mydata);
                                //window.open($mydata.file,'_blank');
                                 
                                    // window.location.href=$mydata.file;
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
                         });
                        that.$('.view'+app.global.nick_array.urbanistici.pratica[$i].allegato[$ii].id).click(function(e) {
                        //'click .download': function (e, value, row,index) {
                        
                            $idAlle= $(this).attr("idAlle");
                            jsonObj = {};
                            jsonObj.id_ser = app.global.nick_array.urbanistici.id_ser;
                            jsonObj.tab = "urbanistici";
                            jsonObj.action = "download";
                            jsonObj.type = "allegato";
                            jsonObj.id=$idAlle;
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
                    
                            $.ajax({
                                url:API_URL+'servizi/',
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

                                      console.log("Download item error!");
                                                    }
                            });
                         });
                   
            
                    }
                }
            }
            //--------------------------------------------------------------------------------
            that.$('.alle-Plus').click(function () {
          
                $prat=$(this).attr("pratica"); 
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
                console.log("pratica="+$prat,"allegato"+$i );
              
     
                //$("#allegati"+$prat).append(
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
                    '<form id="modAlle" >'+
                    '<div id="'+$iAlle+'" class="form-group col-lg-12 alle">'+
                        '<input type="hidden"  name="idPratica" value="'+app.global.nick_array.urbanistici.pratica[$prat]['id']+'">'+ 
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
        
               

                that.$("#modAlle").validate(); //sets up the validator

             
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
        
                that.$("#modal").modal('show'); 
                that.$(".modal-title").text("Add Allegato")
                //qui
                
                that.$('#btnAlle').click(function(e) {
                    if(that.$("#modAlle").valid()){
                        console.log("btnAlle valid allegati"+$prat);
                          //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'types/servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modAlle')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'urbanistici');
                form_data.append('allegato', 'allegato');
                form_data.append('pratica', app.global.nick_array.urbanistici.pratica[$prat]['id']);
                form_data.append('id_ser', app.global.nick_array.urbanistici.id_ser);
              
                
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    //"Content-Type": "application/json"
                };
                console.log("API_URL="+API_URL);
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
                            jsonObj.tab = "urbanistici";
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
                                     rap_urbanistici(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                     });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
              
            
            that.$('.removePratica'+$iPratica).click(function(e) {
                $idx= $(this).attr("idx");
                $idxi= that.$("#urbansForm").find('input[name="pratica['+$idx+'][id]"]').val();
                if (confirm('Sei sicuro di voler rimuovere questa Pratica ?')) {
                    if(app.global.nick_array.urbanistici.pratica[$idx].allegato.length==0){
                       $(this).closest(".row").remove(); 
                
                        var jsonObj = {};
                        jsonObj.id=$idxi;
                        jsonObj.type="pratica";
                        jsonObj.link=app.global.nick_array.urbanistici.pratica[$idx].link;
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
                                //-------------------------------------------------------
                                if ($mydata.success){
                                    $data=$mydata.data
                                    console.log($data);
                                    //app.global.nick_array.urbanistici=$data;
                                    rap_urbanistici(that,1);
                                }
                            }           
                        });
                    }else{
                        alert("Rimuovere prima gli allegati");
                    }
            } //confirm
               
            });
            //--------------------------------------------------------------------------
            that.$("#urbansForm").validate(); //sets up the validator
              
            that.$('#datetimepicker'+$iPratica).datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,

                language: "it"
            });
            that.$("input[name=\"pratica["+$i+"][tipo]\"]").rules( "add", {
                required: true,
                // minlength: 2,
               

                messages: {
                    required: "Required input",
                   
                }
            });
        

        }//end for
    }
    //------------------------------------------------------------------------------------------------------------------------------
     that.$('#modal--').on('show.bs.modal', function (event) {
            that.$(".modal-body").empty();  
         that.$(".modal-body").append(     
         '<form id="modAlle">'+
                        '<input type="hidden"  name="pratica['+$prat+'][alle]['+$i+'][id]">'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lblDescrizione"  for="pratica['+$prat+'][alle]['+$i+'][descrizione]">Descrizione</label>'+
                            '<input type="text" class="form-control" name="pratica['+$prat+'][alle]['+$i+'][descrizione]" id="pratica['+$prat+'][alle]['+$i+'][descrizione]"  placeholder="" >'+
                        '</div>'+

                        '<div class="form-group col-lg-5">'+
                            '<label for="pratica['+$prat+'][alle]['+$i+'][file]">Seleziona file</label>'+
                            '<input type="file" name="pratica['+$prat+'][alle]['+$i+'][file]" class="form-input col-lg-12" id="pratica['+$prat+'][alle]['+$i+'][file]" accept="image/*">'+

                        '</div>'+

                       '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Submit</button>'+
                   '</form >');
            that.$('.modal-title').text("Add Allegato");
           
            });
    jQuery.validator.addMethod("money",function(value, element){
            var isValidMoney = /^\d{1,7}(\,\d{0,2})?$/.test(value);
            return this.optional(element) || isValidMoney;
        }, "Insert ");
    jQuery.validator.addMethod("lettersonly", function(value, element){
        return this.optional(element) || /^[A-Z]+$/i.test(value);
    }, "Solo caratteri alfabetici");
    
    jQuery.validator.addMethod("catast", function(value, element) { 
        return this.optional(element) || /^(([A-Z]{1,3})+\/([0-9]{1,4}))*$/i.test(value);
       
    }, "Solo caratteri catast");

     
    that.$("#urbansForm").validate(); //sets up the validator
    that.$("input[name=\"catCat\"").rules( "add", {
        //required: true,
        catast: true,
        // rangelength: [1, 1],
        messages: {
            required: "Required input",
            catast: "Inserire stringa categoria tipo: A/2 ",
            // minlength: jQuery.validator.format("Please, at least {0} characters are necessary")

        }
    }); 
    that.$("input[name=\"rendCat\"").rules( "add", {
        // required: true,
        //number: true,
        money: true,

        messages: {
            money: "Inserire una valuta in €: 0,00", 

        }
    });     
    that.$("input[name=\"classe\"").rules( "add", {
        // required: true,
        //number: true,

        messages: {
            //number: "Inserire un numero", 

        }
    }); 
      
    if(!isNew){//update
     
        that.$('#id_urb').val( app.global.nick_array.urbanistici["id"]);
        that.$('#id_ser').val( app.global.nick_array.data.id);
        that.$('#catCat').val( app.global.nick_array.urbanistici["categoria_cat"]);
        that.$('#rendCat').val(app.global.nick_array.urbanistici["rendita_cat"]);
        that.$('#classe').val(app.global.nick_array.urbanistici["classe"]);
        that.$('#consistenza').val(app.global.nick_array.urbanistici["consistenza"]);
        
    }
    
     
    that.$('.cat-Plus').click(function () {//dati catastali
        $iCat = $iCat + 1;
        $i = $iCat;

        $("#catasto").append(
            '<div class="row">'+
                '<input type="hidden" class="form-control" name="cat['+$i+'][id]" >'+ 
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblFog"  for="cat['+$i+'][foglio]">Foglio</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][foglio]" id="cat['+$i+'][foglio]" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblPart"  for="cat['+$i+'][particella]">Particella</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][particella]" id="cat['+$i+'][particella]" placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblSub"  for="cat['+$i+'][sub]">Subalterno</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][sub]" id="cat['+$i+'][sub]" placeholder="" >'+
                '</div>'+
                 '<div class="form-group col-lg-2">'+
                    '<label  >Rendita catastale specifica</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][specifica]" id="cat['+$i+'][specifica]"  placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label   id="lblNote"  for="cat['+$i+'][note]">Note</label>'+
                    '<input type="text" class="form-control" name="cat['+$i+'][note]" id="cat['+$i+'][note]" " placeholder="" >'+
                '</div>'+
                '<div class="form-group col-lg-1">'+
                    '<a class="removeCat'+$iCat+'" href="javascript:" title="Elimina Foglio"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                '</div>'+
            '</div>' 
        );
        $('.removeCat'+$iCat).children().each(function(){
            $(this).click(function() {
                    $(this).closest(".row").remove();

            });
        });

        that.$("#urbansForm").validate(); //sets up the validator

             
        $("input[name=\"cat["+$i+"][foglio]\"]").rules( "add", {
            required: true,
            number: true,
            // minlength: 2,

            messages: {
                required: "Required input",
                minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                number:"Inserire un numero!"
            }
        });
        $("input[name=\"cat["+$i+"][particella]\"]").rules( "add", {
            //required: true,
            number: true,
            // minlength: 2,

            messages: {
                //required: "Required input",
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                number:"Inserire un numero!"
            }
        });
       
    }); 
    that.$('.urb-Plus').click(function () {
        $iPratica = $iPratica + 1;
        //$iPraticaAlle[$iPratica] = [];
        $i = $iPratica;
        
        
        $iUrbAlle= $iPratica+'_'+$iAlle;
        
        console.log("pratica="+$iPratica+" $iPraticaAlle[$iPratica] ="+$iPraticaAlle[$iPratica]);
        $("#pratica").append(
           
                '<div class="row">'+
                    '<input type="hidden" class="form-control" name="pratica['+$i+'][id]" >'+ 
                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblTipo"  for="pratica['+$i+'][tipo]">Tipologia Pratica</label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][tipo]" id="pratica['+$i+'][tipo]" placeholder="" >'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label   id="lblDescrizione"  for="pratica['+$i+'][descrizione]">Descrizione Pratica</label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][descrizione]" id="pratica['+$i+'][descrizione]" value="" placeholder="" col-lg-7>'+
                    '</div>'+

                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblData"  for="pratica['+$i+'][data]">Data di presentazione</label>'+        
                        '<div class="input-group date" id="datetimepicker'+$i+'">'+
                            '<input type="text" id="pratica['+$i+'][data]" name="pratica['+$i+'][data]" class="form-control" />'+
                            '<span class="input-group-addon">'+
                                '<span class="glyphicon glyphicon-calendar"></span>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+

                    '<div class="form-group col-lg-2">'+
                        '<label   id="lblEnte"  for="pratica['+$i+'][ente]">Ente di presentazione</label>'+
                        '<input type="text" class="form-control" name="pratica['+$i+'][ente]" id="urb['+$i+'][ente]" placeholder="" >'+
                    '</div>'+
                   
                    '<div class="form-group col-lg-1" >'+
                        '<label id="lblAlleMas" >Allegati</label>'+
                        // '<button type="button" id="alle-Plus" class="alle-Plus form-control" data-toggle="modal" data-target="#modal"  data-title="Add Allegato"   pratica="'+$i+'" title="Add Allegato">Add File</button>'+ 
                 
                        '<button type="button" id="alle-Plus" class="alle-Plus form-control"      pratica="'+$i+'" title="Add Allegato" disabled>Add</button>'+ 
                 
                    '</div>'+
                    '<div class="form-group col-lg-1">'+
                        '<a class="removePratica'+$iPratica+'" alle="'+$iUrbAlle+'" pratica="'+$iPratica+'" href="javascript:" title="Elimina Pratica"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                    '</div>'+

                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5"></div>'+
           
                    '<div id="allegati'+$iPratica+'" ></div>'+
                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">-*-*-</div>'+

                '</div>'
             
           
        );
        $('.removePratica'+$iPratica).children().each(function(){
            $(this).click(function() {
            if($(this).closest(".row").empty())
                    $(this).closest(".row").remove();

            });   
            
        });

        that.$("#urbansForm").validate(); //sets up the validator
        $('#datetimepicker'+$iPratica).datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            
            language: "it"
        });
        
             
        $("input[name=\"pratica["+$i+"][tipo]\"]").rules( "add", {
            required: true,
            //number: true,
            // minlength: 2,

            messages: {
                required: "Required input",
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                //number:"Inserire un numero!"
            }
        });
        
     
    
    }); 
  
    that.$('#btnUrbans').click(function(e) {
        console.log("sub_urban");
       
        if(that.$("#urbansForm").valid()){
            sendUrbans(e);
        }
    });
        
    
    console.log("urbans");
};
function getUrbans(that,$row) {
    
    var isNew=app.global.nick_array.isNew;
    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = {};
    jsonObj.action = "get";
    jsonObj.tab = "urbanistici";
    jsonObj.type = app.global.nick_array.arr;
    if(!isNew){//update
    jsonObj.id_ser = app.global.nick_array.data.id;
    }else{
     jsonObj.id_ser = "";   
    }
    jsonObj.person = app.global.tokensCollection.first().get("id_person");
            
            
             
            jsonObj = JSON.stringify(jsonObj);

       

     if(!isNew){//update
     
    
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
            $data=$mydata.data
            console.log($data);
            app.global.nick_array.urbanistici=$data;
            rap_urbanistici1(that,$row);
               
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
     rap_urbanistici1(that,$row); 
    }   

        
    };
function sendUrbans(event) {
    event.preventDefault();

    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = sendUrbans_formToJson(that);
    var form_data = new FormData(this.$('#urbansForm')[0]); 
    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
    form_data.append('action', 'update');
    form_data.append('tab', 'urbanistici');
    jsonObj.action = "update";
    jsonObj.tab = "urbanistici";   

    /** POST USER **/
     
    
    $headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
        //"username" : app.global.tokensCollection.first().get("username"),
        "lang" : app.global.languagesCollection.at(0).get("lang"),
        //"Content-Type": "application/json"
    };
    console.log("API_URL="+API_URL);
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
        // $mydata =(datap);

        console.log($mydata.message);
        console.log($mydata.errorCode);
        //-------------------------------------------------------
        if ($mydata.success){
            //app.routers.router.prototype.data_type_edit();
            rap_urbanistici(that,1);
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

            console.error("send urbans error!!!");
            bootbox.dialog({
            title: that.language.error_message,
            message: that.language.error_message +" = "+response.responseText+" excp="+exception+" 2="+response.getAllResponseHeaders()+" 3="+_.keys(response.statusCode()),
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
       

        
    };
function sendUrbans_formToJson(that) {
      
        var $folder="";
        var data = {};
            
        that.$('#urbansForm').find('input[name]').each(
            function () {
                  console.log("che="+$(this).attr('name')+"---"+ $(this).prop("checked")) ; 
                if( $(this).attr('name')==="valid") {
                 
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
            
        that.$('#urbansForm').find('select[name]').each(
        function () {
                if($(this).val()===null){
                    data[$(this).attr('name')] =""  ; 
                }else{
                    data[$(this).attr('name')] = parseInt($(this).val());    
                }
                

        });
           
          
            
            console.log("uche="+ that.$('#urbanistici').find('input[name="valid"]').prop("checked")) ; 
            console.log("cherow="+ data.id+" - "+data.valid+"---"+_.keys(data)) ; 
       
       
       
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

$.each(that.$('#urbansForm').serializeArray(), function() {
 //$.each(row, function() {
    var val = this.value;
    var c = this.name.split("[");
    var a = buildInputObject(c, val);
    $.extend(true, data, a);
  });
  /*
    console.log(data['id'] );
    console.log(data['valid'] );
    var typeValid= data['valid']===0 ? "0" : "1";
    data['valid']=typeValid 
     console.log(data['valid'] ); */
        //-------------------------------------------------------------------------     
           
            var typeId =data['id_urb']; 
            var typej= typeId ? 'update' : 'add';
             
            var jsonObj = {};
            jsonObj.action = typej;
            jsonObj.tab = "urbanistici";
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.id_ser = app.global.nick_array.data.id;
            jsonObj.data=data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            
            
             
            jsonObj = JSON.stringify(jsonObj);
        return jsonObj;
    

    };

function rap_contratti(that,$row){//prima carico i dati contratti
   getContratti(that,$row);
   
}
function getContratti(that,$row) {
   
    var isNew=app.global.nick_array.isNew;
    console.log("isNew="+isNew);
    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = {};
    jsonObj.action = "get";
    jsonObj.tab = "contratti";
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
            app.global.nick_array.contratti=$data;
            rap_contratti1(that,$row);
               
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
     rap_contratti1(that,$row); 
    }   

        
    };
window.actionEvents1 = {
    
    'click .removeContratto': function (e, value, $row) {
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
            jsonObj.tab="contratti";

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
                        rap_contratti(this,1);
                    }
                }           
            });
                        
        }
    },
    'click .viewContratto': function (e, value, $row) {
        console.log("view");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="contratti";

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
    'click .downloadContratto': function (e, value, $row) {
        
        console.log("download");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="contratti";

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
               
    }
};
function rap_contratti1(that,$row){//
    console.log(app.global.nick_array.contratti);
    var $iAlle=0;
    
    var isNew=app.global.nick_array.isNew;
    
    that.$("#contratti").empty();
    varForm='<h3> Contratti in Archivio <span class="badge">'+app.global.nick_array.contratti.data.length+' </span></h3><br>'+
            '<form class="contrattiForm" id="contrattiForm" name="contrattiForm" method="post">'+    
                '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+
               
                '<div id="contrattiL"></div>'+
                '<div id="contrattiT">'+
                    
                    '<p class="toolbar">'+
                        '<button type="button"  class="btn btn-default contr-Plus"  data-title="Add Contratto"  title="Add Contratto">Add Contratto</button>'+ 
                        //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                        '<span class="alert"></span>'+
                    '</p>'+
                    '<table id="table"> </table>'+
                    
                '</div>'+
            '</div>';//end form
                
    that.$("#contratti").append(varForm);
    //----------------------------------------------------------------------
   
    //------------------------------------------------------------------------------------------------------------------------------
    if(!isNew && app.global.nick_array.contratti.data.length>0){ 
                
         hrfTable(app.global.nick_array.contratti);
    }
    //-------------------------------------------------------------------------------        
    function  hrfTable(my){
        var $table=that.$("#table"); 
            console.log(my.tab);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents1;
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
            $table.on('editable-save.bs.table',function ( field, rowIndex,row , oldValue, $el,x) {
            if(rowIndex=="descrizione"){
            console.log(row);
                    servizio_contratti_descrizione(row);
            }
           });
            
        }
           function  servizio_contratti_descrizione(row){
            var jsonObj = {};
            
            jsonObj.tab="contratti_descrizione";
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
                       
                       rap_contratti(that,row);
                    
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
       } 
    function actionFormatter1() {
        
            return [
               
                '<a class="downloadContratto" href="javascript:" title="Download" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;',
                '<a class="viewContratto" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;',
                '<a class="removeContratto" href="javascript:" title="Delete Contratto"><i class="glyphicon glyphicon-remove-circle"></i></a>'
            ].join('');
        }
   
    that.$("#contrattiForm").validate(); //sets up the validator
        
    if(!isNew){//update
        that.$('#id_ser').val( app.global.nick_array.data.id);
    }
    
    that.$('.contr-Plus').click(function () {
          
               
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
                console.log("contratto="+$i );
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
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
        
               

                that.$("#modContratto").validate(); //sets up the validator

             
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
        
                that.$("#modal").modal('show');
                that.$('.modal-title').text("Add Contratto");
                //qui
                
                that.$('#btnAlle').click(function(e) {
                    if(that.$("#modContratto").valid()){
                        console.log("btnAlle valid allegati"+$iAlle);
                        //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modContratto')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'contratti');
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
                            jsonObj.tab = "contratti";
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
                                     rap_contratti(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                     });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
   
     that.$('.contr-Plus---').click(function () {
          
               
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
                console.log("contratto="+$i );
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
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
        
               

                that.$("#modContratto").validate(); //sets up the validator

             
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
        
                that.$("#modal").modal('show');
                that.$('.modal-title').text("Add Contratto");
                //qui
                
                that.$('#btnAlle').click(function(e) {
                    if(that.$("#modContratto").valid()){
                        console.log("btnAlle valid allegati"+$iAlle);
                        //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modContratto')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'contratti');
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
                            jsonObj.tab = "contratti";
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
                                     rap_contratti(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                     });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
    };

function rap_impianti(that,$row){//prima carico i dati urbanistici
   getImpianti(that,$row);
   
} 
function getImpianti(that,$row) {
   
    var isNew=app.global.nick_array.isNew;
    console.log("isNew="+isNew);
    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = {};
    jsonObj.action = "get";
    jsonObj.tab = "impianti";
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
            app.global.nick_array.impianti=$data;
            rap_impianti1(that,$row);
               
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
     rap_impianti1(that,$row); 
    }   

        
    };
window.actionEvents2 = {
    
    'click .removeImpianto': function (e, value, $row) {
        console.log("remove");
        if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
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
            jsonObj.tab="impianti";

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
                        rap_impianti(this,1);
                    }
                }           
            });
                        
        }
    },
    'click .viewImpianto': function (e, value, $row) {
        console.log("view");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="impianti";

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
    'click .downloadImpianto': function (e, value, $row) {
        
        console.log("download");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="impianti";

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
               
    }
};
function rap_impianti1(that,$row){//
    console.log(app.global.nick_array.impianti);
    var $iAlle=0;
    
    var isNew=app.global.nick_array.isNew;
    
    that.$("#impianti").empty();
    varForm='<h3> Impianti in Archivio <span class="badge">'+app.global.nick_array.impianti.data.length+' </span></h3><br>'+
            '<form class="impiantiForm" id="urbansForm" name="urbansForm" method="post">'+    
                '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+
               
                '<div id="impiantiL"></div>'+
                '<div id="impiantiT">'+
                    
                    '<p class="toolbar">'+
                        '<button type="button"  class="btn btn-default impianto-Plus"  data-title="Add Impianto"  title="Add Impianto">Add Impianto</button>'+ 
                        
                        '<span class="alert"></span>'+
                    '</p>'+
                    '<table id="tableImpianti"> </table>'+
                    
                '</div>'+
            '</div>';//end form
                
    that.$("#impianti").append(varForm);
    //----------------------------------------------------------------------
   
    //------------------------------------------------------------------------------------------------------------------------------
    if(!isNew && app.global.nick_array.impianti.data.length>0){ 
                
         hrfTable(app.global.nick_array.impianti);
    }
    //-------------------------------------------------------------------------------        
    function  hrfTable(my){
        var $table=that.$("#tableImpianti"); 
            console.log(my.tab);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents2;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter2;
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
            $table.on('editable-save.bs.table',function ( field, rowIndex,row , oldValue, $el,x) {
            if(rowIndex=="descrizione"){
            console.log(row);
                    servizio_impianti_descrizione(row);
            }
           });
            
        }
           function  servizio_impianti_descrizione(row){
            var jsonObj = {};
            
            jsonObj.tab="impianti_descrizione";
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
                       
                       rap_impianti(that,row);
                    
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
       } 
    function actionFormatter2() {
        
            return [
               
                '<a class="downloadImpianto" href="javascript:" title="Download" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;',
                '<a class="viewImpianto" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;',
                '<a class="removeImpianto" href="javascript:" title="Delete "><i class="glyphicon glyphicon-remove-circle"></i></a>'
            ].join('');
        }
   
    that.$("#impiantiForm").validate(); //sets up the validator
        
    if(!isNew){//update
        that.$('#id_ser').val( app.global.nick_array.data.id);
    }
    
    that.$('.impianto-Plus').click(function () {
          
               
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
               
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
                    '<form id="modImpianto" >'+
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
                    '<button type="button" id="btnAlle1" name="btnAlle1" class="btn btn-primary submit ">Add File</button>'+
                    '</form >'
                );
        
               

                that.$("#modImpianto").validate(); //sets up the validator

             
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
                
                that.$("#modal").modal('show'); 
                that.$('.modal-title').text("Add Impianto");
                //qui
                
                that.$('#btnAlle1').click(function(e) {
                    if(that.$("#modImpianto").valid()){
                        //--------------------------------------------------------------
                        var API_URL = app.global.json_url + 'servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modImpianto')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'impianti');
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
                            jsonObj.tab = "impianti";
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
                                     rap_impianti(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                    });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle Impianti invalid");  
                }
                   
          
                }); 
               
            });
   
    
    };
    
function rap_antincendi(that,$row){//prima carico i dati urbanistici
   
    var isNew=app.global.nick_array.isNew;
    console.log("isNew="+isNew);
    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = {};
    jsonObj.action = "get";
    jsonObj.tab = "antincendio";
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
            app.global.nick_array.antincendio=$data;
            rap_antincendi1(that,$row);
               
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
     rap_antincendi1(that,$row); 
    }   

        
    };
window.actionEvents3 = {
    
    'click .removeImpianto': function (e, value, $row) {
        console.log("remove");
         console.log(e);
        if (confirm('Sei sicuro di voler rimuovere questo Documento?')) {
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
            jsonObj.tab="antincendio";

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
                     
                        rap_antincendi(this,1);
                    }
                }           
            });
                        
        }
    },
    'click .viewImpianto': function (e, value, $row) {
        console.log("view");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="antincendi";

        jsonObj.id=$row.id;
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
    'click .downloadImpianto': function (e, value, $row) {
        
        console.log("download");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="antincendi";

        jsonObj.id=$row.id;
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
               
    }
};
window.actionEvents4 = {
    
    'click .removeDispositivo': function (e, value, $row) {
        console.log("remove");
         console.log(e);
        if (confirm('Sei sicuro di voler rimuovere questo Dispositivo?')) {
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            var jsonObj = {};
            jsonObj.type="dispositivo";
            jsonObj.action = "del";
            jsonObj.id_ser = $row.id_ser;
            jsonObj.tab="antincendio";

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
                     
                        rap_antincendi(this,1);
                    }
                }           
            });
                        
        }
    },
    'click .editDispositivo': function (e, value, $row) {
        console.log($row);
        $tipoDisp=$row.dispositivo;
        modalF=
                  '<form id="mod'+$tipoDisp+'" >'+
                 '<input type="hidden"  name="id" id="id"  value='+$row.id+'>'+
            
                ' <div class="form-group col-lg-6">'+
                     '<label    for="num">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name="num" id="num"  placeholder="" value='+$row.num_attribuito+'>'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="tipologia">Tipologia</label>'+
                     '<select  name="tipologia" class="form-control disp" id="tipologia" ></select>'+

                 '</div>'+
                 ' <div class="form-group col-lg-6">'+
                     '<label   for="ubicazione">Ubicazione</label>'+
                     '<input type="text" class="form-control" name="ubicazione" id="ubicazione"  placeholder="" value='+$row.ubicazione+'>'+
                 '</div>'+

                '<button type="button" id="btn'+$tipoDisp+'" name="btn'+$tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
            '</form >';
        $(".modal-body").empty();   
    $(".modal-body").append(modalF); 
    var jsonObj = {};
        switch ($tipoDisp){
            case "estintore":
                $tipoDispT="estintore";
            break;
            case "maniglione":
                $tipoDispT="maniglione antipanico";
            break;
            case "fumo":
                $tipoDispT="rilevatore fumo";
            break;
            case "luce":
                $tipoDispT="luce emergenza";
            break;
            case "idrante":
                $tipoDispT="idrante";
            break;
                
        }
          
           console.log($tipoDisp);
                jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= $tipoDispT;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
        $.ajax({
           url:app.global.json_url + 'types/',
           type:'post',
           headers : $headers,
           data: jsonObj,
           dataType : 'text',
            success: function (json) {
               $mydata =JSON.parse(json);
               $('.disp').empty();
               $aa=$mydata.data;
               console.log($aa);
              $('.disp').append('<option ></option>');
                $.each($aa, function(i, value) {
                    console.log($aa[i]["tipologia"]);
                 $('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
               });
             
             $('.disp').val($row.tipologia);
            }  
        });
       
    var title = "Modifica Dispositivo";
    
    $('.modal-title').text(title);
    $(".modal-body").validate(); //sets up the validator
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
        
        
        
          $("#modal").modal('show'); 
        
          $('#btn'+$tipoDisp).click(function(e) {
                    if($("#mod"+$tipoDisp).valid()){
                      
                        //--------------------------------------------------------------
                        var API_URL = app.global.json_url + 'servizi/';
                
                        //var jsonObj = sendUrbans_formToJson(that);
                        var form_data = new FormData($("#mod"+$tipoDisp)[0]); 
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                        form_data.append('action', 'update');
                        form_data.append('tab', 'antincendio');
                        form_data.append('allegatoTipo', 'dispositivo');
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
                                    jsonObj.tab = "antincendio";
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
                                             rap_antincendi(this,1);


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
        
        
        
        
        
        
        console.log("edit");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="antincendi";

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
               // window.open($mydata.file,'_blank');

                // window.location.href=$mydata.file;

            },
            error: function () {

                console.log("View item error!");
            }
        });
               
    }
   
};
function rap_antincendi1(that,$row){//
    console.log(app.global.nick_array.antincendio);
    var $iAlle=0;
    
    var isNew=app.global.nick_array.isNew;
    
    that.$("#antincendi").empty();
    varForm='<h3> Dispositivi Antincendio</h3><br>'+
            '<form class="antincendioForm" id="antincendioForm" name="antincendioForm" method="post">'+    
               
                '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+

                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingOne">'+
                            '<h4 class="panel-title">'+
                                '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                                    //<!--i class="more-less glyphicon glyphicon-plus"></i-->
                                    'Planimetria Dispositivi <span class="badge">'+app.global.nick_array.antincendio.data.planimetrie.length+' </span>'+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">'+
                            '<div class="panel-body">'+
                                '<input type="hidden" class="form-control" name="id" id="id">'+
                                '<div id="impiantiT">'+

                                    '<p class="toolbar">'+
                                        '<button type="button"  class="btn btn-default contr-Plus"    data-tipo="planimetria" data-title="Add Planimetria Dispositivi"  title="Add Contratto">Add Planimetria Dispositivi</button>'+ 

                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="tablePlanimetria"> </table>'+

                                '</div>'+

                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+        

    
    
                '<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingUno">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapseUno" aria-expanded="false" aria-controls="collapseUno">'+

                                   '<label id="lblInt-prog" ></label> Estintori <span class="badge">'+_.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="estintore"}).length+' </span>'+
                                '</a>'+
                            '</h4>'+   
                        '</div>'+
                        '<div id="collapseUno" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingUno">'+
                            '<div class="panel-body">'+
                                '<div id="impiantiT">'+

                                '<p class="toolbar">'+
                                    '<button type="button"  class="btn btn-default contr-Plus"  data-tipo="estintori" data-title="Add Estintore"  title="Add Estintore">Add Estintore</button>'+ 

                                    '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="tableEstintori"> </table>'+

                            '</div>'+
                            '</div>  <!--div class="panel-body"-->'+
                        '</div>  <!--div class="panel-collapse collapse"-->'+
                    '</div>  <!--div class="panel panel-default"-->'+
                '</div><!--div class="panel-group"-->'+
     
                '<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">'+    
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="headingFour">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion1" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">'+

                                    'Maniglioni Antipanico <span class="badge">'+_.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="maniglione"}).length+' </span>'+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">'+
                            '<div class="panel-body">'+

                                '<div id="impiantiT">'+

                                    '<p class="toolbar">'+
                                        '<button type="button"  class="btn btn-default contr-Plus"  data-tipo="maniglioni" data-title="Add Maniglione Antipanico"  title="Add Maniglioni Antipanico">Add Maniglioni Antipanico</button>'+ 

                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="tableManiglioni"> </table>'+

                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div><!-- panel-group -->'+
                
                '<div class="panel-group" id="accordion3" role="tablist" aria-multiselectable="true">'+    
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="heading3">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion3" href="#collapse3" aria-expanded="false" aria-controls="collapse3">'+

                                    'Rilevazione Fumi <span class="badge">'+_.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="fumo"}).length+' </span>'+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">'+
                            '<div class="panel-body">'+

                                '<div id="impiantiT">'+

                                    '<p class="toolbar">'+
                                        '<button type="button"  class="btn btn-default contr-Plus"  data-tipo="fumi" data-title="Add Rilevatore Fumi"  title="Add Rilevatore Fumi">Add Rilevatore Fumi</button>'+ 

                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="tableFumi"> </table>'+

                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div><!-- panel-group -->'+
                
                '<div class="panel-group" id="accordion4" role="tablist" aria-multiselectable="true">'+    
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="heading4">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion4" href="#collapse4" aria-expanded="false" aria-controls="collapse4">'+

                                    'Luci Emergenza <span class="badge">'+_.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="luce"}).length+' </span>'+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading4">'+
                            '<div class="panel-body">'+

                                '<div id="impiantiT">'+

                                    '<p class="toolbar">'+
                                        '<button type="button"  class="btn btn-default contr-Plus"  data-tipo="luci" data-title="Add Luce Emergenza"  title="Add Luci Emergenza">Add Luci Emergenza</button>'+ 

                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="tableLuci"> </table>'+

                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div><!-- panel-group -->'+
                
                '<div class="panel-group" id="accordion5" role="tablist" aria-multiselectable="true">'+    
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab" id="heading5">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion5" href="#collapse5" aria-expanded="false" aria-controls="collapse5">'+

                                    'Idranti <span class="badge">'+_.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="idrante"}).length+' </span>'+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading5">'+
                            '<div class="panel-body">'+

                                '<div id="impiantiT">'+

                                    '<p class="toolbar">'+
                                        '<button type="button"  class="btn btn-default contr-Plus"  data-tipo="idranti" data-title="Add Idrante"  title="Add Idrante">Add Idrante</button>'+ 

                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<table id="tableIdranti"> </table>'+

                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div><!-- panel-group -->'+
            '</div>';//end form
                
    that.$("#antincendi").append(varForm);
    //----------------------------------------------------------------------
   
    //------------------------------------------------------------------------------------------------------------------------------
   // if(!isNew && app.global.nick_array.antincendio.data.planimetrie.length>0){ 
   if(!isNew ){ 
                
         hrfTable(app.global.nick_array.antincendio);
    }
    //-------------------------------------------------------------------------------        
    function  hrfTable(my){
        var $table=that.$("#tablePlanimetria"); 
            console.log(my.tab);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents3;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter2;
                }
            }); 
                
            $table.bootstrapTable('destroy');
                   
            $table.bootstrapTable({
                data: my.data.planimetrie,
                columns: my.tab,
                showColumns:true,
                showRefresh:true,
                search:true
            });
           
            console.log(my.tab1);
            $.each( my.tab1, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents4;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter4;
                }
            }); 
                
            that.$("#tableEstintori").bootstrapTable('destroy');
            that.$("#tableEstintori").bootstrapTable({
                data: _.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="estintore"}),
                columns: my.tab1,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            that.$("#tableManiglioni").bootstrapTable('destroy');
            that.$("#tableManiglioni").bootstrapTable({
                data: _.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="maniglione"}),
                columns: my.tab1,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            that.$("#tableFumi").bootstrapTable('destroy');
            that.$("#tableFumi").bootstrapTable({
                data: _.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="fumo"}),
                columns: my.tab1,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            that.$("#tableLuci").bootstrapTable('destroy');
            that.$("#tableLuci").bootstrapTable({
                data: _.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="luce"}),
                columns: my.tab1,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            that.$("#tableIdranti").bootstrapTable('destroy');
            that.$("#tableIdranti").bootstrapTable({
                data: _.filter(app.global.nick_array.antincendio.data.dispositivi, function(num){return num.dispositivo=="idrante"}),
                columns: my.tab1,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            
        } 
    function actionFormatter2() {
        
            return [
               
                '<a class="downloadImpianto" href="javascript:" title="Download" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;',
                '<a class="viewImpianto" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;',
                '<a class="removeImpianto" href="javascript:" title="Delete "><i class="glyphicon glyphicon-remove-circle"></i></a>'
            ].join('');
        }
        
   function actionFormatter4() {
        
            return [
               
                '<a class="editDispositivo" href="javascript:" title="Edit"><i class="glyphicon glyphicon-edit"></i></a>&emsp;&emsp;',
                '<a class="removeDispositivo" href="javascript:" title="Delete "><i class="glyphicon glyphicon-remove-circle"></i></a>'
            ].join('');
        }
    that.$("#antincendioForm").validate(); //sets up the validator
        
    if(!isNew){//update
        that.$('#id_ser').val( app.global.nick_array.data.id);
    }
    $('#modal--').on('show.bs.modal', function (event) {
    var button  = $(event.relatedTarget); // Button that triggered the modal 
    var tipoDisp= button.data('tipo');
    switch(tipoDisp) {
        case "planimetria":
            $tipoDisp=tipoDisp;
                 var modalF=
                    '<form id="modPlanimetria" >'+
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
                ;
           /*     
                var modalF=
                ' <div class="form-group col-lg-6">'+
                     '<label  id="lblDescrizione"  for="'+$tipoDisp+'[descrizione]">Descrizione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[descrizione] id='+$tipoDisp+'[descrizione]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="allegato">Seleziona file</label>'+
                     '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

                 '</div>'+

                '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Submit</button>'; 
                */
            break;
        case "estintori":
            $tipoDisp=tipoDisp;
            var modalF=
                ' <div class="form-group col-lg-6">'+
                     '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="'+$tipoDisp+'[file]">Tipologia</label>'+
                     '<select  name=""'+$tipoDisp+'[tipologia]" class="form-control" id="'+$tipoDisp+'[tipologia]" ></select>'+

                 '</div>'+
                 ' <div class="form-group col-lg-6">'+
                     '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                 '</div>'+

                '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Submit</button>'; 
            break;
            case "maniglioni":
           $tipoDisp=tipoDisp;
            break;
          case "fumi":
           $tipoDisp=tipoDisp
            break;
            case "luci":
           $tipoDisp=tipoDisp
            break;
          case "idranti":
           $tipoDisp=tipoDisp
            break;
          default:
          
    }
   
    var modal       = $(this);
    that.$(".modal-body").empty();   
    that.$(".modal-body").append(modalF);  
       
    var title = button.data('title');
    console.log( button.data('tipo'));
    modal.find('.modal-title').text(title)
    that.$(".modal-body").validate(); //sets up the validator
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
    
    that.$('#btnAlle').click(function(e) {
        if(that.$(".modal-body").valid()){
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'servizi--/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modAlle')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'antincendio');
                form_data.append('allegatoTipo', $tipoDisp);
                
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
                             jsonObj.tab = "antincendio";
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
                                     rap_impianti(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                    });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                }); 
});
   
    that.$('.contr-Plus').click(function (event) {
        var modalF="";
        var button  = $(event.currentTarget); // Button that triggered the modal 
        var tipoDisp= button.data('tipo');
      
        console.log(tipoDisp)  ;
        
        $iAlle =  $iAlle + 1;
        $i =  $iAlle;
        switch(tipoDisp) {
        case "planimetria":
            $tipoDisp=tipoDisp;
                 that.$('.modal-title').text("Add Planimetria Dispositivi");  
                modalF=
                    '<form id="mod'+tipoDisp+'" >'+
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
                    '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Add File</button>'+
                    '</form >'
                ;
           
            break;
        case "estintori":
            
          
            $tipoDisp=tipoDisp;
            that.$('.modal-title').text("Add Estintore"); 
             modalF=
                  '<form id="mod'+tipoDisp+'" >'+
                ' <div class="form-group col-lg-6">'+
                     '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="'+$tipoDisp+'">Tipologia</label>'+
                     '<select  name="tipologia" class="form-control disp" id="tipologia" ></select>'+

                 '</div>'+
                 ' <div class="form-group col-lg-6">'+
                     '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                 '</div>'+

                '<button type="button" id="btn'+$tipoDisp+'" name="btn'+$tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
            '</form >'; 
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= "estintore"
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$('.disp').empty();
                    $aa=$mydata.data;
                    console.log($aa);
                    that.$('.disp').append('<option ></option>');
                    $.each($aa, function(i, value) {
                        console.log($aa[i]["tipologia"]);
                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                    });

                       
                }  
            });
            break;
        case "maniglioni":
                $tipoDisp=tipoDisp;
                that.$('.modal-title').text("Add Maniglione Antipanico"); 
                 modalF=
                       '<form id="mod'+tipoDisp+'" >'+
                     ' <div class="form-group col-lg-6">'+
                          '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                          '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                      '</div>'+

                      '<div class="form-group col-lg-6">'+
                          '<label for="'+$tipoDisp+'[file]">Tipologia</label>'+
                          '<select  name="tipologia" class="form-control disp" id="tipologia" ></select>'+

                      '</div>'+
                      ' <div class="form-group col-lg-6">'+
                          '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                          '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                      '</div>'+

                     '<button type="button" id="btn'+$tipoDisp+'" name="btn'+$tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
                 '</form >';
         var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= "maniglione antipanico";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$('.disp').empty();
                    $aa=$mydata.data;
                    console.log($aa);
                    that.$('.disp').append('<option ></option>');
                    $.each($aa, function(i, value) {
                        console.log($aa[i]["tipologia"]);
                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                    });


                }  
            });
        break;
          case "fumi":
           $tipoDisp=tipoDisp;
           that.$('.modal-title').text("Add Rilevatore Fumi"); 
            modalF=
                  '<form id="mod'+tipoDisp+'" >'+
                ' <div class="form-group col-lg-6">'+
                     '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="'+$tipoDisp+'[file]">Tipologia</label>'+
                     '<select  name="tipologia" class="form-control disp" id="tipologia"></select>'+

                 '</div>'+
                 ' <div class="form-group col-lg-6">'+
                     '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                 '</div>'+

                '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
            '</form >';
             var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= "Rilevatore Fumo";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$('.disp').empty();
                    $aa=$mydata.data;
                    console.log($aa);
                    that.$('.disp').append('<option ></option>');
                    $.each($aa, function(i, value) {
                        console.log($aa[i]["tipologia"]);
                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                    });


                }  
            });
            break;
            case "luci":
           $tipoDisp=tipoDisp;
           that.$('.modal-title').text("Add Luce di Emergenza"); 
           modalF=
                  '<form id="mod'+tipoDisp+'" >'+
                ' <div class="form-group col-lg-6">'+
                     '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="'+$tipoDisp+'[file]">Tipologia</label>'+
                     '<select  name="tipologia" class="form-control disp" id="tipologia" ></select>'+

                 '</div>'+
                 ' <div class="form-group col-lg-6">'+
                     '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                 '</div>'+

                '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
            '</form >'; 
     var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= "luce emergenza"
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$('.disp').empty();
                    $aa=$mydata.data;
                    console.log($aa);
                    that.$('.disp').append('<option ></option>');
                    $.each($aa, function(i, value) {
                        console.log($aa[i]["tipologia"]);
                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                    });


                }  
            });
            break;
          case "idranti":
           $tipoDisp=tipoDisp;
           that.$('.modal-title').text("Add Idrante"); 
            modalF=
                  '<form id="mod'+tipoDisp+'" >'+
                ' <div class="form-group col-lg-6">'+
                     '<label    for="'+$tipoDisp+'[num]">Numero Attribuito</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[num] id='+$tipoDisp+'[num]  placeholder="" >'+
                 '</div>'+

                 '<div class="form-group col-lg-6">'+
                     '<label for="'+$tipoDisp+'[file]">Tipologia</label>'+
                     '<select  name="tipologia" class="form-control disp" id="tipologia" ></select>'+

                 '</div>'+
                 '<div class="form-group col-lg-6">'+
                     '<label   for="'+$tipoDisp+'[ubicazione]">Ubicazione</label>'+
                     '<input type="text" class="form-control" name='+$tipoDisp+'[ubicazione] id='+$tipoDisp+'[ubicazione]  placeholder="" >'+
                 '</div>'+

                '<button type="button" id="btn'+tipoDisp+'" name="btn'+tipoDisp+'" class="btn btn-primary submit ">Submit</button>'+
            '</form >';
    var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rma_catDispositivi";
            jsonObj.device= "idrante"
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'types/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$('.disp').empty();
                    $aa=$mydata.data;
                    console.log($aa);
                    that.$('.disp').append('<option ></option>');
                    $.each($aa, function(i, value) {
                        console.log($aa[i]["tipologia"]);
                        that.$('.disp').append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["tipologia"]+'</option>');
                    });


                }  
            });
    
            break;
          default:
          
    }
               
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(  modalF      
                  
                );
        
               

                that.$("#mod"+tipoDisp).validate(); //sets up the validator
                if(tipoDisp==="planimetria"){
                    console.log('planimetriaVal');
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
                }else{
                    console.log(tipoDisp+'Val');
                    $("input[name=\""+tipoDisp+"[num]\"]").rules( "add", {
                        required: true,

                        messages: {
                            required: "Required input"

                        }
                    });
                    $("input[name=\""+tipoDisp+"[ubicazione]\"]").rules( "add", {
                        required: true,

                        messages: {
                            required: "Required input"

                        }
                    });
                    $("input[name=\"tipologia\"]").rules( "add", {
                        required: true,

                        messages: {
                            required: "Required input"

                        }
                    });
                }
        
                that.$("#modal").modal('show'); 
                //qui
                
                that.$('#btn'+tipoDisp).click(function(e) {
                    if(that.$("#mod"+tipoDisp).valid()){
                      
                        //--------------------------------------------------------------
                        var API_URL = app.global.json_url + 'servizi/';
                
                        //var jsonObj = sendUrbans_formToJson(that);
                        var form_data = new FormData($("#mod"+tipoDisp)[0]); 
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                        form_data.append('action', 'add');
                        form_data.append('tab', 'antincendio');
                        form_data.append('allegatoTipo', tipoDisp);
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
                                    jsonObj.tab = "antincendio";
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
                                             rap_antincendi(that,1);


                                                }
                                            }
                                        });
                                    }
                                }
                            });
                  
                    
                        that.$("#modal").modal('hide'); 
                    }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
   
    
    };
    
function rap_planimetrie(that,$row){//prima carico i dati planimetrie
   getPlanimetrie(that,$row);
   
}
function getPlanimetrie(that,$row) {
   
    var isNew=app.global.nick_array.isNew;
    console.log("isNew="+isNew);
    var API_URL = app.global.json_url + 'servizi/';
    var that = this;
    var jsonObj = {};
    jsonObj.action = "get";
    jsonObj.tab = "planimetrie";
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
            app.global.nick_array.planimetrie=$data;
            rap_planimetrie1(that,$row);
               
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
     rap_planimetrie1(that,$row); 
    }   

        
    };
window.actionEvents5 = {
    
    'click .removePlanimetria': function (e, value, $row) {
        console.log("remove");
        if (confirm('Sei sicuro di voler rimuovere questo allegato?')) {
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
            jsonObj.tab="planimetrie";

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
                        rap_planimetrie(this,1);
                    }
                }           
            });
                        
        }
    },
    'click .viewPlanimetria': function (e, value, $row) {
        console.log("view");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="planimetrie";

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
    'click .downloadPlanimetria': function (e, value, $row) {
        
        console.log("download");
        jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "allegato";
        jsonObj.id_ser = $row.id_ser;
        jsonObj.tab="planimetrie";

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
               
    }
};
function rap_planimetrie1(that,$row){//
    console.log(app.global.nick_array.planimetrie);
    var $iAlle,$num=0;
    
    var isNew=app.global.nick_array.isNew;
    
    that.$("#planimetrie").empty();
    varForm='<h3> Planimetrie in Archivio <span class="badge">'+app.global.nick_array.planimetrie.data.length+' </span></h3><br>'+
            '<form class="planimetrieForm" id="planimetrieForm" name="planimetrieForm" method="post">'+    
                '<input type="hidden" class="form-control" name="id_ser" id="id_ser">'+
               
                '<div id="planimetrieL"></div>'+
                '<div id="planimetrieT">'+
                    
                    '<p class="toolbar">'+
                        '<button type="button"  class="btn btn-default contr-Plus"  data-title="Add Planimetria"  title="Add Planimetria">Add Planimetria</button>'+ 
                        //'<a class="addForn btn btn-default" id="addForn" href="javascript:" >Add Fornitore</a>'+
                        '<span class="alert"></span>'+
                    '</p>'+
                    '<table id="table"> </table>'+
                    
                '</div>'+
            '</div>';//end form
                
    that.$("#planimetrie").append(varForm);
    //----------------------------------------------------------------------
   
    //------------------------------------------------------------------------------------------------------------------------------
    if(!isNew && app.global.nick_array.planimetrie.data.length>0){ 
                
         hrfTable(app.global.nick_array.planimetrie);
    }
    //-------------------------------------------------------------------------------        
    function  hrfTable(my){
        var $table=that.$("#table"); 
            console.log(my.tab);
            $.each( my.tab, function( key, value1 ){
                if(value1["cellStyle"]=="cellStyle"){
                    value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){
                    value1["events"]=actionEvents5;
                }
                if(value1["formatter"]=="actionFormatter"){
                    value1["formatter"]=actionFormatter1;
                }
            }); 
                
            $table.bootstrapTable('destroy');
               console.log(my.data);      
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns:true,
                showRefresh:true,
                search:true
            });
            $table.on('editable-save.bs.table',function ( field, rowIndex,row , oldValue, $el,x) {
            if(rowIndex=="descrizione"){
            console.log(row);
                    servizio_planimetrie_descrizione(row);
            }
           });
            
        }
           function  servizio_planimetrie_descrizione(row){
            var jsonObj = {};
            
            jsonObj.tab="planimetrie_descrizione";
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
                       
                       rap_contratti(that,row);
                    
                    }else{
                        alert("Problema nell'inserimento dati nel DB!")
                    }
                   
                }  
            });
       } 
    function actionFormatter1() {
        
            return [
               
                '<a class="downloadPlanimetria" href="javascript:" title="Download" download=""><i class="glyphicon glyphicon-download-alt"></i></a>&emsp;',
                '<a class="viewPlanimetria" href="javascript:" title="View"><i class="glyphicon glyphicon-eye-open"></i></a>&emsp;&emsp;',
                '<a class="removePlanimetria" href="javascript:" title="Delete Planimetria"><i class="glyphicon glyphicon-remove-circle"></i></a>'
            ].join('');
        }
   
    that.$("#planimetrieForm").validate(); //sets up the validator
        
    if(!isNew){//update
        that.$('#id_ser').val( app.global.nick_array.data.id);
    }
    
    that.$('.contr-Plus').click(function () {
          
               
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
                console.log("planimetria="+$i );
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
                    '<form id="modPlanimetria" >'+
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
        
               

                that.$("#modPlanimetria").validate(); //sets up the validator

             
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
        
                that.$("#modal").modal('show');
                that.$('.modal-title').text("Add Planimetria");
                //qui
                
                that.$('#btnAlle').click(function(e) {
                    if(that.$("#modPlanimetria").valid()){
                        console.log("btnAlle valid allegati"+$iAlle);
                        //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modPlanimetria')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'planimetrie');
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
                            jsonObj.tab = "planimetrie";
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
                                     rap_planimetrie(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                     });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
   
     that.$('.contr-Plus---').click(function () {
          
               
                $iAlle =  $iAlle + 1;
                $i =  $iAlle;
                console.log("contratto="+$i );
              
                that.$(".modal-body").empty();   
                that.$(".modal-body").append(        
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
        
               

                that.$("#modContratto").validate(); //sets up the validator

             
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
        
                that.$("#modal").modal('show');
                that.$('.modal-title').text("Add Contratto");
                //qui
                
                that.$('#btnAlle').click(function(e) {
                    if(that.$("#modContratto").valid()){
                        console.log("btnAlle valid allegati"+$iAlle);
                        //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'servizi/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($('#modContratto')[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('tab', 'contratti');
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
                            jsonObj.tab = "contratti";
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
                                     rap_contratti(that,1);
                                    

                                        }
                                    }
                                });
                            }
                        }
                     });
                  
                    
                    that.$("#modal").modal('hide'); 
                }else{
                    console.log("btnAlle invalid");  
                }
                   
          
                });  
     
            });
    };