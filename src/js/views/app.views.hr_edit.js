require(['app','bootbox'], function(app,bootbox){
app.views.hr_edit = Backbone.View.extend({

    /** init view **/
    initialize: function() {
        console.log('initializing registration view');
    },

    /** submit event for registration **/
    events: {
        'submit':                           'registration',
        'click #btnRegistrationHome':       'registration_home'
    },

    registration_home: function() {
        app.routers.router.prototype.index();
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
        console.log(app.global.nick_array.hr);
        console.log(app.global.nick_array);
        var isNew = app.global.nick_array.hr === "New"; //se app.global.nick_array.hr="New" isNew è true
        console.log(isNew);
        var $selRoles=this.$("#roles").selectpicker();
        $selRoles.data('max-options', 2);
        var $selRole=this.$("#role");
        var $selDevice=this.$("#device");
        var $selDep=this.$("#department");
        var $selDepPlus=this.$("#department_plus").selectpicker();
       
        var $check=this.$('#active');
        var $opz_man=this.$('#opz_man');
        var $incaricato_antincendio=this.$('#incaricato_antincendio');
        var $role,$action,$type,$uid;
        var $iTel=0,$iEmail=0;
        $alert = this.$('.alert').hide();
        $alert1 = this.$('.alert1').hide();
        
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        var  uurl=app.global.json_url+'persons/';
        var API_URL=uurl;
        $role = app.global.tokensCollection.first().get("nvbr");
        
        $action = "list";
        $type = "role";
         var $person=app.global.tokensCollection.first().get("id_person");
        
        var $aa;
        that=this;
 //-------------------------------role------------------------------------------
           
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:uurl+$action+"/"+ $type+"/"+$person+"/Tutti/",
                type:'get',
                headers : $headers,
                //data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selRoles.empty();
                    $aa=$mydata.data;
                  
                    //--------------------------------------------------------------------------------
                    //versione multiselect con selectpicker
                    var lista   = [];
                    lista.push('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        lista.push('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                    });
                    $selRoles.html(lista.join(''));
                    $selRoles.selectpicker('refresh');

                    if( !isNew){//update
                        $ruoli=app.global.nick_array.data.rolesPerson;
                        lista   = [];
                        $.each($ruoli, function(i, value) {
                            lista.push($ruoli[i]['id_role']);
                        });

                        $selRoles.selectpicker('val', lista);
                        $selRoles.selectpicker('render');

                    }else{$selRoles.selectpicker('val', '0');
                    $selRoles.selectpicker('render');
                    }
                   
                   //end versione multiselect con selectpicker
                   //--------------------------------------------------------------------------
                   
                    $selRole.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selRole.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                    });
                    isNew?$selRole.val(0):$selRole.val(app.global.nick_array.data.id_role);//app.global.nick_array.data.id_role
                  
                   
                }
            });
//-------------------------------device------------------------------------------
           
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
               url:uurl+$action+"/device/"+$person+"/Tutti/",
               type:'get',
               headers : $headers,
               //data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selDevice.empty();
                   $aa=$mydata.data;
                    $selDevice.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selDevice.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                   });
                isNew?$selDevice.val(0):$selDevice.val(app.global.nick_array.data.id_device);//app.global.nick_array.data.id_device
                }
            });
  
    //-------------------------------department------------------------------------------
        jsonObj = {};
        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
        jsonObj.action = "list";     
        $type ="department";
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
               url:uurl+$action+"/"+ $type+"/"+$person+"/Tutti/",
               type:'get',
               headers : $headers,
              // data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selDep.empty();
                   
                   $aa=$mydata.data;
                    $selDep.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selDep.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+')</option>');
                   });
                    isNew?$selDep.val(0):$selDep.val(app.global.nick_array.data.id_department);//app.global.nick_array.data.id_role
                    department_plus($aa);
                }
                
            });
       //-------------------------------department_plus------------------------------------------
    function department_plus($aa){
       console.log($aa)
        $selDepPlus.empty();
        
        var lista   = [];
        lista.push('<option value="0"></option>');
        $.each($aa, function(i, value) {
            lista.push('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+')</option>');
        });
        $selDepPlus.html(lista.join(''));
        $selDepPlus.selectpicker('refresh');
        if( !isNew){//update
            $dep_plus=app.global.nick_array.data.servizi_aggiuntivi;
            lista   = [];
            $.each($dep_plus, function(i, value) {
                lista.push($dep_plus[i]['id_servizio']);
            });

            $selDepPlus.selectpicker('val', lista);
            $selDepPlus.selectpicker('render');

        }else{ $selDepPlus.selectpicker('val', '0');
        $selDepPlus.selectpicker('render');
        }
    }       
   //-------------------------------email label------------------------------------------
        jsonObj = {};
        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
        jsonObj.action = "list";     
        $type ="email_label";
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
               url:uurl+$action+"/"+ $type+"/"+$person+"/Tutti/",
               type:'get',
               headers : $headers,
              // data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                  
                  
                   app.global.nick_array.email_label=$mydata.data;//
                
                }
            });
             
                        
//---------------------------------------------------------------------------------------
  

    if( !isNew){
        $uid = app.global.nick_array.data.id_person;
        console.log("!isNew="+isNew);
    }else{
        console.log("!isNewElse="+isNew);
        $uid;
    }
 //-------------MODULI/NAVBAR------------------------------------------------------------------------
   this.$('#moduli').click(function () {
         console.log(app.global.nick_array.data);      
        // isNew=true;
        // isCsv=true;
      
        
        jsonObj = {};
        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
        jsonObj.id_person = app.global.nick_array.data.id_person;
        jsonObj.id_role = app.global.nick_array.data.id_role;
        jsonObj.id_dep = app.global.nick_array.data.id_department;
        jsonObj.action = "view";  
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
                var $navbar,$roleNavbar=[];
               
                var $roleLabel,varForm='';
              
                $navbar= $mydata.navbar;
                $roleNavbar= $mydata.role_navbar;
                $userNavbarEnabled= $mydata.user_navEnabled;
                $userNavbarChecked= $mydata.user_navChecked;
                that.$(".navpanel").empty();//costruisco e valorizzo modularmente
                //console.log($roleNavbar);
                varForm='<form class="navForm" id="navForm" name="navForm" method="post">'+
                         '<table id="table" class="table table-striped" ></table>';
                that.$(".navpanel").append(varForm);
                that.$("#table").bootstrapTable({
                data: $navbar,
                columns: $mydata.tab
               
            });
                that.$(".modal-dialog").css("width", "70%");
                  //--------------------------------------------------------------
               
                $.each($navbar, function( key, value) {//$depNavbar ->array stato(active) navbar x quel servizio
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
             /*   $.each( $navbar, function( key, value ) {//root--modulo
                
                    if(value.parent==0){
                       
                      //  console.log(value.name+' id='+value.id+' par='+value.parent)
                        varForm='<div class="row">'+ 
                                    '<div class="form-group col-sm-12">'+
                                        '<label><input id="id'+value.id+'" name="'+value.id+'" type="checkbox" value="'+value.id+'" > '+value.name+'</label>'+
                                    '</div>'+
                                '</div>';    
                                   
                        that.$("#navForm").append(varForm);
                        reveal(that,$roleNavbar,value.id);  //controllo se questo id/modulo appartiene al gruppo visualizzabile del ruolo impostato
                       if($userNavbarEnabled){//se non  é   null
                            revealUserEnabled(that,$userNavbarEnabled,value.id);
                       }
                       if($userNavbarChecked){
                           revealUserChecked(that,$userNavbarChecked,value.id);
                       }
                       
                        
                        $.each( $navbar, function(  key,value1 ) {//navbar primo livello

                            if(value1.parent==value.id){ 
                                //console.log('--'+value1.name+'--'+value1.parent+'='+value.id+' par='+value.parent)
                                varForm=                              
                                    '<div class="row">'+ 
                                        '<div class="form-group col-lg-12" >'+
                                            '<label>------<input id="id'+value1.id+'" name="group'+value.id+'" type="checkbox"  value="'+value1.id+'" > '+value1.name+'</label>'+
                                        '</div>'+
                                    '</div>';
                                that.$("#navForm").append(varForm);
                                reveal(that,$roleNavbar,value1.id); 
                                if($userNavbarEnabled){//se non  é   null
                                    revealUserEnabled(that,$userNavbarEnabled,value1.id);
                                }
                                if($userNavbarChecked){
                                    revealUserChecked(that,$userNavbarChecked,value1.id);
                                }                          
                                $.each( $navbar, function(  key,value2 ) {//navbar secondo livello

                                    if(value2.parent==value1.id){ 
                                        //console.log('------'+value2.name+'--'+value2.parent+'='+value1.id+' par='+value1.parent)
                                        varForm='<div class="row">'+ 
                                                    '<div class="form-group col-lg-12" >'+
                                                        '<label>-------------<input id="id'+value2.id+'" name="group'+value.id+'" type="checkbox" value="'+value2.id+'" > '+value2.name+'</label>'+
                                                    '</div>'+
                                                '</div>';
                                        that.$("#navForm").append(varForm);
                                        reveal(that,$roleNavbar,value2.id) 
                                        if($userNavbarEnabled){//se non  é   null
                                            revealUserEnabled(that,$userNavbarEnabled,value2.id);
                                        }
                                        if($userNavbarChecked){
                                            revealUserChecked(that,$userNavbarChecked,value2.id);
                                        }
                                    }

                                });
                            }

                        });
                       
                    }
                    
                    that.$('input[type="checkbox"]').click(function(e) { 
                        var  rootId=this.id;
                          
                        $('input[name="group' + this.value + '"]').each( function( key, values ) {
                            if(that.$('#'+rootId).is(':checked')) { 
                                if(_.contains($roleNavbar,this.value) ){   
                                   $('#id'+values.value).removeAttr("disabled");
                                  //  console.log( '0checked--'+key + "=key : id=" + values.id+ " : value=" + values.value );
                                }else{
                                    $('#id'+values.value).attr('disabled', 'disabled');
                                    //$('#id'+values.id).removeAttr("checked");
                                    //console.log( '1unchecked--'+key + "=key : id=" + values.id+ " : value=" + values.value );
                                    
                                }
                            }else{
                                
                                $('#id'+values.value).attr('disabled', 'disabled');
                                // that.$('#id'+values.value).removeAttr("checked");
                                //console.log( '2unchecked--'+key + "=key : id=" + values.id+ " : value=" + values.value );
                            }
                        });
                        //   console.log( key + "=key : id=" + values.id+ " : value=" + values.value );
                    });              
                });
                varForm='</form>';
                that.$(".navpanel").append(varForm);  
                function reveal(that,$roleNavbar,value){
                    if( _.contains($roleNavbar,value)){
                        that.$('#id'+value).removeAttr("disabled");
                        that.$('#id'+value).attr('checked', 'checked');

                        console.log('enabled='+value);
                        //return true;
                    }else{

                        that.$('#id'+value).attr('disabled', 'disabled');
                        that.$('#id'+value).removeAttr("checked");
                      console.log('disabled='+value);
                     //return false
                    }
                }
                function revealUserEnabled(that,$userNavbarEnabled,value){
                    if( _.contains($userNavbarEnabled,parseInt(value))){
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
                
                function revealUserChecked(that,$userNavbarChecked,value){
                    if( _.contains($userNavbarChecked,parseInt(value))){
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
                }*/
                $roleLabel= $mydata.role_name.name;
                that.$("#modal").find('.modal-title').html('Configurazione  Moduli/Navbar per: '+
                                                    '<br/> utente '+app.global.nick_array.data.id_person+' > '+app.global.nick_array.data.first_name+' '+app.global.nick_array.data.last_name+
                                                    '<br/> con ruolo '+app.global.nick_array.data.id_role+' > '+$roleLabel+
                                                    '<br/> con servizio '+that.$('#department').val()+' > '+that.$('#department option:selected').text());
                   that.$("#modal").find('.panel-heading').html('<b>Ci sono '+$navbar.length+' Moduli/Navbar</b>');
                         
                varForm1='<button type="button" id="setNavbar" class="btn btn-primary">Update  Moduli/Navbar</button>';
                // that.$(".modal-body").empty();
                // that.$(".modal-body").append(varForm); 
                that.$(".modal-footer").empty();
                that.$(".modal-footer").append(varForm1);  
                
                
                that.$("#setNavbar").click(function(e) {
            
                //console.log("click set Navbar");
                  
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'person/';
                 
                 var navOn=[];
                 var navEn=[];
                 that.$('.modal input[type="checkbox"]').each( function( key, values ) {
                     if(that.$('#'+values.id).is(':checked')) {
                         console.log(values.id);
                         navOn.push(values.value);
                     } 
                      if(!that.$('#'+values.id).is(':disabled')) {
                         console.log(values.id);
                         navEn.push(values.value);
                     } 
                 });
                
                console.log(navOn);
                console.log(navEn);
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
             
                //var jsonObj = sendUrbans_formToJson(that);
               var   jsonObj = {};
                    jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj.id_person = app.global.nick_array.data.id_person;
                    jsonObj.id_role = app.global.nick_array.data.id_role;
                    jsonObj.id_dep = app.global.nick_array.data.id_department;
                    jsonObj.action = "update";  
                    jsonObj.type = "navbar";  
                    jsonObj.navChecked = navOn;  
                    jsonObj.navEnabled = navEn; 
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
//----------------------------email--------------------------------------------------------   
    if(!isNew && app.global.nick_array.data.email.length>0){ 
                    
        for ($i = 0; $i <app.global.nick_array.data.email.length; $i++) {
            $iEmail=$i;

             this.$("#email").append(  
          //  varForm=        
                '<div class="row">'+
                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.data.email[$i]['id']+'">'+  

                    '<div class="form-group col-lg-8">'+
                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.data.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                    '</div>'+
                   
                     '<div class="form-group col-lg-3">'+
                        ' <select  id="email['+$i+'][emailLbl]" name="email['+$i+'][emailLbl]"  class="form-control lab'+$i+'" ></select>'+
                    '</div>'+
                    
                     '<div class="form-group col-lg-1">'+
                      '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                    '</div>'+

                '</div>'
                );
                //   '<hr class="style13">'   
            
           // this.$("#registrationForm").append(varForm); 
          
                        
            this.$('.removeEmail'+$iEmail).click(function(e) {
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
           var  $selLabelEmail=this.$(".lab"+$i);
           
                $selLabelEmail.empty();
                   
                $aa=app.global.nick_array.data.email_label;
                  
                $selLabelEmail.append('<option value="0"></option>');
                    $.each($aa, function(ii,value) {
                      
                    $selLabelEmail.append('<option value="'+value.id+'">'+value.name+'</option>');
                });
                isNew?$selLabelEmail.val(0):$selLabelEmail.val(app.global.nick_array.data.email[$i]['id_label']);//
              
                     
        }
       
    }
//------------------------------telefoni---------------------------------------------
  if(!isNew && app.global.nick_array.data.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.data.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.data.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                            this.$("#telefoni").append(  
                                 
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

                                '</div>')
                                //   '<hr class="style13">'   
                            ;
                       
                            this.$('.removeTel'+$iTel).click(function(e) {
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
                                      // $mydata =JSON.parse(json);
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
        this.$('.email-Plus').click(function () {
                $iEmail = $iEmail + 1;
                $i = $iEmail
                
                $("#email").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                        '</div>'+
                        '<!--div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                        '</div-->'+
                         '<div class="form-group col-lg-3">'+
                        ' <select  id="email['+$i+'][emailLbl]" name="email['+$i+'][emailLbl]"  class="form-control lab'+$i+'" ></select>'+
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
                 var  $selLabelEmail=$(".lab"+$i);
           
                $selLabelEmail.empty();
                   
                $aa=app.global.nick_array.email_label;
                  
                $selLabelEmail.append('<option value="0"></option>');
                    $.each($aa, function(ii,value) {
                      
                    $selLabelEmail.append('<option value="'+value.id+'">'+value.name+'</option>');
                });
                isNew?$selLabelEmail.val(0):$selLabelEmail.val(app.global.nick_array.data.email[$i]['id_label']);//
              
                
           
        }); 
    this.$('.telefono-Plus').click(function () {
             
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



//----------------------------------------------------------------------------------
    function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }
    function showAlert1(title, type) {
        $alert1.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert1.hide();
        }, 3000);
    }
        
//--------------------------------------------------------------------------------------        
        var  that=this;
        
        
        console.log( "---isNew="+isNew); 
        if(!isNew){
            if(app.global.nick_array.data.active_person==1){$active=true}else{$active=false}
            if(app.global.nick_array.data.opz_manutentore==1){$opz=true}else{$opz=false}
            if(app.global.nick_array.data.incaricato_antincendio==1){$antincendio=true}else{$antincendio=false}
            // init_person(this, app.global.nick_array.data, isNew);
            that.$('#id_person').val( app.global.nick_array.data.id_person);
            console.log(app.global.nick_array.data.active_person+"=act="+$active);
            $check.prop("checked", $active);
            $opz_man.prop("checked", $opz);
            $incaricato_antincendio.prop("checked", $antincendio);
            that.$('#first_name').val( app.global.nick_array.data.first_name);
            that.$('#last_name').val( app.global.nick_array.data.last_name);
            that.$('#codice').val( app.global.nick_array.data.codice);
            that.$('#codice_fiscale').val( app.global.nick_array.data.codice_fiscale);

            that.$('#telefono').val( app.global.nick_array.data.telefono);
            that.$("#submit").html(that.language.submit);  

        }//  if( !isNew)
        else{
            that.$('#codice_fiscale').val( "");
            that.$('#first_name').val("");
            that.$('#last_name').val( "");

            $check.prop("checked",false);
            $opz_man.prop("checked",false);
            that.$("#submit").html(that.language.submit); 
          
        }
              /** validate form **/
            
        this.$("#registrationForm").validate({
        
            rules: {
                first_name: "required",
                last_name: "required",
            //  codice: "required",
                codice_fiscale: {
                   required: true,
                   rangelength: [16, 16], 

                },
                role: "required",
                roles: "required"
                },
            messages: this.language.form_messages
        });
        return this;
      
    },

    /** registration **/
    registration: function (event) {
        event.preventDefault();
 

        var that = this;
        var jsonObj = this.registration_formToJson();

        var _userModel = new app.models.person();

        /** POST USER **/
     
    
        _userModel.save(jsonObj, {
            success: function (model,response) {
                console.log(model);
                 console.log(response);
                if (model.changed.success){
                    bootbox.dialog({
                        title: that.language.header_registration_message,
                        message: that.language.body_registration_message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.hrRouter.prototype.hr();
                                }
                            }
                        }
                    });
                }
                else {
                 // console.log(JSON.parse(response.responseText.message));
                    console.log(model);
                    bootbox.dialog({
                        title: that.language.error_message,
                        message: that.language.error_message + ' : ' +model.changed.message,
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
                console.log(model);
                console.log(model.changed);
            },
           error: function(model, response) {
           //var responseObj = $.parseJSON(response.responseText);
           //console.log('Type: ' + responseObj.error + ' Message: ' + responseObj.message);
    
            
           
               console.log(response);
                bootbox.dialog({
                    title: that.language.error_message,
                    message: that.language.error_message +" = "+response.responseText,
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
                console.log(response);
            },
            //url: app.const.apiurl() + 'user',
            url:app.global.json_url+'persons/',
          
            private: true
        });
        
    },

    /** render user form data to JSON obj **/
    registration_formToJson: function() {
        var data = {};
        var isNew = app.global.nick_array.hr === "New";
        var jsonObj = {};
        console.log(app.global.nick_array.hr)
        console.log(isNew)
        if(isNew){
            jsonObj.action = "create";
        }else{
            jsonObj.action = "update";
            jsonObj.id_role_old = app.global.nick_array.data.id_role;
            jsonObj.id_department_old = app.global.nick_array.data.id_department;
        }
        jsonObj.type="person";
        jsonObj.id_person = this.$('#id_person').val(); //questo è id della persona in lavorazione che è valorizzato per update altrimenti è nullo per il create
        jsonObj.person = app.global.tokensCollection.first().get("id_person");//questo è  id dell amministratore abilitato per fare l operazione
        jsonObj.id_device = this.$('#device').val();
        jsonObj.first_name = this.$('#first_name').val();
        jsonObj.last_name = this.$("#last_name").val();
        jsonObj.codice = this.$("#codice").val();
        jsonObj.telefono = this.$('#telefono').val();
       
        
        jsonObj.id_role = this.$('#role').val();
        jsonObj.id_roles = this.$('#roles').val();
        jsonObj.id_department = this.$('#department').val();
        jsonObj.servizi_aggiuntivi = this.$('#department_plus').val();
        
        jsonObj.active_person = this.$('#active').prop("checked");
        jsonObj.opz_man = this.$('#opz_man').prop("checked");
        jsonObj.incaricato_antincendio = this.$('#incaricato_antincendio').prop("checked");
        jsonObj.role = app.global.tokensCollection.first().get("nvbr");
       
        jsonObj.codice_fiscale = this.$('#codice_fiscale').val();
         $.each(this.$('#email').serializeArray(), function() {
             console.log(this.value);
         });
         this.$('#email').each(function(index, obj){
     console.log(obj);
});
        //---------------------------------------------------------------------
         $.each(this.$('#registrationForm').serializeArray(), function() {
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
        jsonObj.data=data;
        //---------------------------------------------------------------------
        
        return jsonObj;
    

    },

    /** destroy view and unbind all event **/
    destroy_view: function() {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.hr_editView = null;
    }
});
                
return app.views.hr_edit ;
    });