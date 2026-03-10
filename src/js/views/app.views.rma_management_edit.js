require(['app','bootbox'], function(app,bootbox){
app.views.rma_management_edit = Backbone.View.extend({

    /** init view **/
    initialize: function() {
        console.log('initializing rma_management_edit');
    },

    /** submit event for registration **/
    events: {
        'submit':                           'registration',
        'click #btnRegistrationHome':       'registration_home',
        'submit_':       'assegna_intervento'   
    },

    registration_home: function() {
        app.routers.router.prototype.index();
    },

    /** render template--------------------------------------------------- **/
    render: function() {
        $(this.el).html(this.template());
        console.log(app.global.breadcrumb+app.global.breadcrumb.length);
        if(app.global.breadcrumb.length>3){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        var isNew = app.global.nick_array.isNew ; //se app.global.nick_array.hr="New" isNew è true
        console.log("isnew="+isNew);
        var API_URL = app.global.json_url + 'rma/list/';
        var $iTel=0,$iEmail=0,$iReferente=0;//indice per contare quante mail o telefoni o referenti_ditte 
        var $folder,$id,$group="";
        var $active=false;
        var $role,$action,$type,$uid;
        $alert = this.$('.alert').hide();
        $alert1 = this.$('.alert1').hide();
        var $selManutentore=this.$("#manutentore").selectpicker();
         var $list;
        
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
        if(!isNew){//update
            console.log(app.global.nick_array);//dati+richiesta selezionata
            console.log(app.global.nick_array.arr);//richiesta selezionata
            $uid = app.global.nick_array.id_int;//id intervento
            $manutenzione = app.global.nick_array.arr.int.manutenzione;
            
            this.$('input[name=manutenzione]').val([$manutenzione]);
          

             manutentori($manutenzione,this);
          
        }else{//create
            console.log("!isNewElse="+isNew);
            console.log(app.global.nick_array);//dati+richiesta selezionata
            
              manutentori(1,this);
        }
        
        //------------------------------------------------------------------------------------  
      
         
        function  manutentori(man,that){
            console.log(man);
            // $selManutentore=$("#manutentore").selectpicker();
            var jsonObj = {};
            if(man==1){
                jsonObj.type= "manutentori"; 
                that.$('#lblmanutentore').text("Manutentori");
            }else if(man==2){
                jsonObj.type = "ditte_ext"; 
                 that.$('#lblmanutentore').text("Ditte esterne");
            }else{
                jsonObj.type = "committente";  
                that.$('#lblmanutentore').text("Committente");
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
                   $selManutentore.empty();
                   $aa=$mydata.data;
                   $list=$aa;
                   var lista   = [];
                   //$selManutentore.append('<option value="0"></option>');
                   var $cognome="";
                    lista.push('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        if($aa[i]["cognome"]){$cognome=$aa[i]["cognome"]}
                       
                      //$selManutentore.append('<option value="'+$aa[i]["id_person"]+'">'+$aa[i]["nome"]+'</option>');
                        lista.push('<option  value="' + $aa[i]["id_person"] + '">' + $aa[i]["nome"] + ' ' + $cognome + '</option>');
                   });
                  $selManutentore.html(lista.join(''));
                   $selManutentore.selectpicker('refresh');
                   if( !isNew){//update
                       $operatori=app.global.nick_array.arr.int.interventi_operatori;
                         lista   = [];
                         $.each($operatori, function(i, value) {
                             lista.push($operatori[i]["id"])
                         });
                        
                         $('.selectpicker').selectpicker('val', lista);
                        $('.selectpicker').selectpicker('render');
                  
                   }
              
                }  
            });
        }
        //------------------------------------------------------------------------------------- 
              
        eventManutentori(this); 
         
       
        
        //----------------event manutenzione-----------------------------------------
        function  eventManutentori(_that){
        _that.$('input[type="radio"]').on('change', function(e) {
            //$('#manutenzione').change(function (e) {
         //  alert(_.keys(e)+" - "+" - "+$('input[name=manutenzione]:checked').val()); 
            if(e.target.value==1){
                $('#lblmanutentore').text("Manutentori");
                $selManutentore.data('max-options', 4);
               
               
            }else if(e.target.value==2){
               that.$('#lblmanutentore').text("Ditte Esterne");
               $selManutentore.data('max-options', 3);
              
            }else{
               $('#lblmanutentore').text("Committente"); 
               $selManutentore.data('max-options', 1);
               
            }
         
            $('#intervento').empty();
            $('#chiusura').empty();
            
            manutentori(e.target.value,_that);
        });
            //------------------------------event---Manutentore-------------------------------------------------------------


           // _that.$("#manutentore").change(function (e,value,row) {
            _that.$("#manutentore") .on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {  


                    eventManutentore();


            });
        }
      
        function eventManutentore(){
            // alert(_.keys(e)+" - "+value+" - "+row+$('input[name=manutenzione]:checked').val()); 
            if($('input[name=manutenzione]:checked').val()==1){//se è manutentore
              
                $('#intervento').empty();
                $('#chiusura').empty();
                
                if( (typeof $selManutentore.selectpicker('val') !== "undefined") && ($selManutentore.selectpicker('val')!==null) && ($selManutentore.selectpicker('val')!="0") ){
                //if($selManutentore.selectpicker('val') && $selManutentore.selectpicker('val')!="0" ){
                //if($selManutentore.selectpicker('val').length>0 ){ 
                //if($selManutentore.selectpicker('val')!==0 ){ 
                console.log("manut="+$selManutentore.selectpicker('val')+" lenght="+$selManutentore.selectpicker('val').length);
                
                    for ($i=0;$i<$selManutentore.selectpicker('val').length;$i++){
                        
                        if($selManutentore.selectpicker('val')[$i]!="0"  ){ //se non è selezionato nessun manutentore
                            console.log($selManutentore.selectpicker('val').length+" - "+$i+" - "+$selManutentore.selectpicker('val'));
                            $manut= _.findWhere($list, {id_person:$selManutentore.val()[$i]});
                            console.log($manut);
                            $('#intervento').append(

                                '<div class="row">'+
                                    '<div class="form-group col-sm-3">'+
                                        '<input type="hidden" class="form-control" name="manutentori['+$i+'][id_person]" id="manutentori['+$i+'][id_person]" value="'+$manut['id_person']+'">'+  

                                        '<label   id="lblname"  for="name">Nome Manutentore</label>'+
                                        '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$manut["nome"]+'" readonly>'+
                                    '</div>'+
                                '</div>'+
                               //-------------------email--------------------------------------------------------------------
                                '<div class="row ">'+
                                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                        '<label  class="form-group col-lg-4" >E-mail</label>'+
                                    '</div>'+
                                '</div>'+
                                '<div id="email'+$i+'"></div>'
                            );
               
                            // if($list[ $selManutentore.prop('selectedIndex')-1]["email"].length>0){ 
                            console.log($manut["email"].length);
                            if($manut["email"].length>0){ 
                                console.log($manut["email"].length);
                                for ($ii = 0; $ii <$manut["email"].length; $ii++) {
                                    console.log($ii+" ="+$manut["email"].length);
                           
                                    $("#email"+$i).append(  

                                        '<div class="row">'+
                                            '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][id]" id="manutentori['+$i+'][email]['+$ii+'][id]" value="'+$manut["email"][$ii]['id']+'">'+  

                                            '<div class="form-group col-lg-8">'+
                                                '<a href="mailto:'+$manut["email"][$ii]['email']+'"><input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][email]" id="manutentori['+$i+'][email]['+$ii+'][email]" value="'+$manut["email"][$ii]['email']+'" readonly col-lg-7></a>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][emailNome]" id="manutentori['+$i+'][email]['+$ii+'][emailNome]" value="'+$manut["email"][$ii]['emailNome']+'" readonly>'+
                                            '</div>'+

                                        '</div>');
                                         
                                }
                            }
                   
                            //-------------------------------telefono------------------------------------------------------
                            $('#intervento').append(
                           '<div class="row ">'+
                               '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                                   '<label class="form-group col-lg-4">Telefono</label>'+

                               '</div>'+
                           '</div>'+    
                           '<div id="telefoni'+$i+'"></div>');
                           if($manut["telefoni"].length>0){ 
                        for ($iii = 0; $iii <$manut["telefoni"].length; $iii++) {
                            $("#telefoni"+$i).append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][id]" id="manutentori['+$i+'][telefoni]['+$iii+'][id]" value="'+$manut["telefoni"][$iii]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefono]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNumero]" value="'+$manut["telefoni"][$iii]['telefonoNumero']+'"  col-lg-7 readonly>'+
                                '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" value="'+$manut["telefoni"][$iii]['telefonoNome']+'" readonly>'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                        }
                    }
                    setIntervento("aa"); 
                }
            
              
            //--------------------------------------------------------------------------------------------------------------------------------  
            
            }else if($('input[name=manutenzione]:checked').val()==2){//se è  ditta
             $('#intervento').empty();
              $('#chiusura').empty();
                
                if( (typeof $selManutentore.selectpicker('val') !== "undefined") && ($selManutentore.selectpicker('val')!==null) && ($selManutentore.selectpicker('val')!="0") ){
       
                for ($i=0;$i<$selManutentore.selectpicker('val').length;$i++){
                    if($selManutentore.selectpicker('val')[$i]!="0"  ){ //se non è selezionato nessuna ditta
                       
                        $ditta= _.findWhere($list, {id:$selManutentore.val()[$i]})  ;
                        console.log($ditta);
              
             
                $('#intervento').append(
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<input type="hidden" class="form-control" name="manutentori['+$i+'][id_person]" id="manutentori['+$i+'][id_person]" value="'+$ditta['id_person']+'">'+  
                       
                            '<label   id="lblname"  for="name">Nome Ditta</label>'+
                            '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$ditta["nome"]+'" readonly>'+
                        '</div>'+
                                   
                    '</div>'+    
            
                //-------------------email--------------------------------------------------------------------
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label  class="form-group col-lg-4" >E-mail</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>'
                );
               
                    if($ditta["email"].length>0){ 
                    
                        for ($ii = 0; $ii <$ditta["email"].length; $ii++) {
                         
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][id]" id="manutentori['+$i+'][email]['+$ii+'][id]" value="'+$ditta["email"][$ii]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<a href="mailto:'+$ditta["email"][$ii]['email']+'"><input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][email]" id="manutentori['+$i+'][email]['+$ii+'][email]" value="'+$ditta["email"][$ii]['email']+'"  col-lg-7 readonly></a> '+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][emailNome]" id="manutentori['+$i+'][email]['+$ii+'][emailNome]" value="'+$ditta["email"][$ii]['emailNome']+'" readonly>'+
                                    '</div>'+
                                   
                                '</div>');
                                         
                        }
                    }
                   
                    //-------------------------------telefono------------------------------------------------------
                     $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4">Telefono</label>'+
                                
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>');
                    if($ditta["telefoni"].length>0){ 
                        for ($iii = 0; $iii <$ditta["telefoni"].length; $iii++) {
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][id]" id="manutentori['+$i+'][telefoni]['+$iii+'][id]" value="'+$ditta["telefoni"][$iii]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefono]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNumero]" value="'+$ditta["telefoni"][$iii]['telefonoNumero']+'"  col-lg-7 readonly>'+
                                '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" value="'+$ditta["telefoni"][$iii]['telefonoNome']+'" readonly>'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                     //-------------------------------referente------------------------------------------------------
               /*      $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4" >Referente</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="referente" ></div>');
                  
                    if($list[$selManutentore.prop('selectedIndex')-1]["referente"].length>0){ 
                    
                        for ($i = 0; $i <$list[$selManutentore.prop('selectedIndex')-1]["referente"].length; $i++) {
                                                      
                            $("#referente").append(  
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     
                                '</div>'
                            );
                        }      
                    }        
                    */     
                //-------------------------------------------------------------------------------------------------------------------------------------
                }
            }
            setIntervento("bb");
            }
            
             
            
             
            }else{//se è committente
            $('#intervento').empty();
            $('#chiusura').empty();
            console.log("val="+$selManutentore.selectpicker('val'));
            
            if( (typeof $selManutentore.selectpicker('val') !== "undefined") && ($selManutentore.selectpicker('val')!==null) && ($selManutentore.selectpicker('val')!="0") ){
                 console.log("val1="+$selManutentore.selectpicker('val'));                     
             
                for ($i=0;$i<$selManutentore.selectpicker('val').length;$i++){
                    if($selManutentore.selectpicker('val')[$i]!="0"  ){ //se non è selezionato nessun comm
                       
                        $commi= _.findWhere($list, {id:$selManutentore.val()[$i]})  ;
                        console.log($commi);
                    
                
                    
                   
               
                $('#intervento').append(
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label   id="lblname"  for="name">Nome Committente</label>'+
                            '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$commi["nome"]+'" readonly>'+
                        '</div>'+
                        '<div id="cogn"></div>'
                    );    
                    
                    if($commi["committenza_cod"]==="1"){
                      $('#cogn').append(
                        '<div class="form-group col-sm-4">'+
                            '<label   id="lblcognome"  for="cognome">Cognome</label>'+
                            '<input type="text" id="manutentori['+$i+'][cognome]" name="manutentori['+$i+'][cognome]" class="form-control" value="'+$commi["cognome"]+'" readonly>'+
                        '</div>'      
                              
                               );
                    }        
                    $('#intervento').append(    
                    '</div>'+    
            
                //-------------------email--------------------------------------------------------------------
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label  class="form-group col-lg-4" >E-mail</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>'
                );
               
                    if($commi["email"].length>0){ 
                    
                        for ($i0 = 0; $i0 <$commi["email"].length; $i0++) {
                         
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][id]" id="manutentori['+$i+'][email]['+$i0+'][id]" value="'+$commi["email"][$i0]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<a href="mailto:'+$commi["email"][$i0]['email']+'"><input type="text" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][email]" id="manutentori['+$i+'][email]['+$i0+'][email]" value="'+$commi["email"][$i0]['email']+'"  col-lg-7 readonly></a>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][emailNome]" id="manutentori['+$i+'][email]['+$i0+'][emailNome]" value="'+$commi["email"][$i0]['emailNome']+'" readonly>'+
                                    '</div>'+
                                   
                                '</div>');
                                         
                        }
                    }
                   
                    //-------------------------------telefono------------------------------------------------------
                    $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4">Telefono</label>'+
                                
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>');
                    if($commi["telefoni"].length>0){ 
                        for ($i1 = 0; $i1 <$commi["telefoni"].length; $i1++) {
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][id]" id="manutentori['+$i+'][telefoni]['+$i1+'][id]" value="'+$commi["telefoni"][$i1]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][telefono]" id="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNumero]" value="'+$commi["telefoni"][$i1]['telefonoNumero']+'"  col-lg-7 readonly>'+
                                '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                      
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNome]" value="'+$commi["telefoni"][$i1]['telefonoNome']+'" readonly>'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                     //-------------------------------referente------------------------------------------------------
               /*      $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4" >Referente</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="referente" ></div>');
                  
                    if($list[$selManutentore.prop('selectedIndex')-1]["referente"].length>0){ 
                    
                        for ($i = 0; $i <$list[$selManutentore.prop('selectedIndex')-1]["referente"].length; $i++) {
                                                      
                            $("#referente").append(  
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     
                                '</div>'
                            );
                        }      
                    }        
                    */     
                //-------------------------------------------------------------------------------------------------------------------
            }}
                setIntervento("cc");
                }
              
            }//end committente
        }
        function setIntervento($manu){ 
            console.log(app.global.nick_array.arr);
            //console.log("setIntervento"+_.keys(app.global.nick_array.arr.int)+"  --- "+_.values(app.global.nick_array.arr.int));
            $num_intervento=0;
            $aa;
            jsonObj={};
            jsonObj.type ="intervento";
            jsonObj.rma = app.global.nick_array.arr.id;  //id richiesta   
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            console.log(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $aa=$mydata.data[0];
                  
                    if($aa["numero"]===null){
                  
                        $num_intervento=1 ;
                        
                  }else{
                     $num_intervento=parseInt($aa['numero']) +1
                  }
                   
                    setIntervento1($num_intervento);
               
                }  
            });
         
            function  setIntervento1($num_intervento){
                $descrInt="";
                $imgInt="";
                $descrChiuInt="";
                console.log(app.global.nick_array);
                if( !isNew){//update

                    $num_intervento=$num_intervento-1;
                    $descrInt= $('<div />').html(app.global.nick_array.arr.int.descrizione).text();
                    $descrChiuInt= $('<div/>').html(app.global.nick_array.arr.int.descrizione_chiusura).text();
                    $imgInt=app.global.nick_array.arr.int.link_immagine;
                }else{//create
                    if(app.global.nick_array.arr.interventi.length>0){
                       $index=app.global.nick_array.arr.interventi.length-1;

                        $descrInt= $('<div/>').html("**************************************************\nDescrizione ultimo intervento effettuato: \n"+app.global.nick_array.arr.interventi[$index].descrizione_chiusura).text()+"\n**************************************************"; 
                        $imgInt=app.global.nick_array.arr.interventi[$index].link_immagine;
                        
                    }

                }
                    console.log("setIntervento1");
                    var appF=
                // $('#intervento').append(
                        '<div class="row ">'+
                            '<div class="form-group  col-sm-12"  style="background-color: #f5f5f5">';
                            if( !isNew){//update
                                appF=appF+'<label class="form-group" >Intervento</label></div></div>';

                            }else{//create
                                appF=appF+'<label class="form-group" >Intervento N° '+$num_intervento+' </label></div></div>';
                            }

                         $('#intervento').append( appF+       

                            '<div class="row ">'+
                                '<div class="form-group col-sm-6" >'+
                                    '<label for="descrIntervento" >Descrizione intervento</label>'+ 
                                    '<textarea   id="descrIntervento" name="descrIntervento" class="md-textarea form-control" rows="3" >'+$descrInt+'</textarea>'+

                                '</div>'+
                                '<div class="form-group col-sm-6">'+
                                    '<label for="file">Immagine inviata a chiusura intervento</label>'+
                                    '<img id="blah1" src="'+$imgInt+'" />'+

                                '</div>'+

                                '<br>'+
                            '</div>'+    
                            '<div class="row ">'+    
                                '<div class="form-group col-sm-6" >'+
                                    '<label class="form-group col-sm-4" >Previsto per il:</label>'+    
                                    '<div class="input-group date " id="datetimepicker1">'+
                                        '<input type="text" class="form-control col-sm-2"  id="data_prevista" name="data_prevista" readonly/>'+ 
                                        '<span class="input-group-addon">'+  
                                            '<span class="glyphicon glyphicon-calendar"  ></span>'+ 
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group col-sm-6" >'+
                                    '<button type="button" id="assegna" name="assegna" class="btn btn-primary form-group col-sm-12" style="background-color:#ffc108;" >Assegna</button>'+
                                '</div>'+
                            '</div>');
                        if( !isNew){//update

                            $intImm="";     
                            if( app.global.nick_array.arr.int.data_effettuata != ""){ 
                          $intImm+=   
                                  '<div class="row ">'+
                                      '<div class="form-group col-sm-6" >'+
                                          '<label for="descrChiusuraIntervento" >Descrizione chiusura intervento</label>'+ 
                                          '<textarea   id="descrChiusuraIntervento" name="descrChiusuraIntervento" class="md-textarea form-control" rows="8" >'+$descrChiuInt+'</textarea>'+

                                      '</div>'+
                               // '</div>';

                                 // if(app.global.nick_array.arr.int.link_immagine != ""){
                                 //   $intImm+='<div class="row">'+
                                      '<div class="form-group col-sm-6">'+
                                          '<label for="file">Immagine inviata a chiusura intervento</label>'+
                                          '<img id="blah1" src="'+app.global.nick_array.arr.int.link_immagine+'" />'+

                                      '</div>'+

                                      '<br>'+
                                  '</div>';  
                                }
                            $intImm+=
                            '<div class="row">'+
                                '<div class="form-group col-sm-4">'+
                                    '<label for="file">Seleziona immagine da inviare(.jpg, .jpeg, .png)</label>'+
                                    '<input type="file" name="file" id="file" accept="image/jpeg,image/gif,image/png">'+
                                    '<p class="help-block"></p>'+
                                '</div>'+
                                '<div id="preview" class="form-group col-sm-8">'+
                                    '<img id="blah" src=".\\css\\img\\filed.png" />'+
                                '</div>'+
                                '<br>'+
                            '</div>'+
                            '<div class="row ">'+    
                                '<div class="form-group col-sm-6" >'+
                                    '<label class="form-group col-sm-4" >Intervento chiuso il:</label>'+    
                                    '<div class="input-group date " id="datetimepicker2" >'+
                                        '<input type="text" class="form-control col-sm-2"  id="data_chiusura_int" name="data_chiusura_int" readonly/>'+ 
                                        '<span class="input-group-addon">'+  
                                            '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                                /*'<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:grey;background-color:blue">Numero ore compreso viaggio</label>'+
                                    '<input type="text"  class="form-control " name="num_ore" id="num_ore"  value="0.00"/>'+

                                '</div>'+*/
                                '<div class="form-group col-sm-6" >'+

                                    '<button type="button" id="chiusuraInt" name="chiusuraInt" class="btn btn-primary form-control" style="background-color:#ffc108;">Chiudi Intervento</button>'+
                                '</div>'+
                            '</div>';
                            $('#intervento').append($intImm );
                        }   


                        $('#chiusura').append(
                            '<div class="row ">'+
                                    '<div class="form-group  col-sm-12"  style="background-color: #f5f5f5">'+

                                    '<label class="form-group col-sm-4" >Chiudi richiesta manutenzione</label>'+   

                                    '<div class="form-group col-sm-2" >'+

                                        '<button type="button" id="closeKO" name="closeKO" class="btn btn-danger">Chiudi KO</button>'+
                                          '</div>'+
                                        '<div class="form-group col-sm-2" >'+

                                    '<button type="button" id="closeOK" name="closeOK" class="btn btn-success">Chiudi OK</button>'+
                                '</div>'+
                            ' </div>'
                        );

                        if( !isNew){//update
                        $('#assegna').text("Modifica");
                        $dataPrev=app.global.nick_array.arr.int.data_prevista;
                        $('#datetimepicker1').datetimepicker(
                        {                              

                            format: "dd/mm/yyyy",
                            autoclose: true,
                            startView: 2,
                            minView: 2,

                            defaultDate: $dataPrev,
                            language: "it"
                        }).hide();

                        //$('#datetimepicker1').datetimepicker('setStartDate', '+0d');
                        $('#datetimepicker1').datetimepicker('setEndDate', '+5m').show();
                        $('#data_prevista').val($dataPrev);

                        $descrChiuInt=app.global.nick_array.arr.int.data_effettuata;
                         if($descrChiuInt!=null){
                         // $('#datetimepicker1').datetimepicker('remove'); 

                         }
                        $('#datetimepicker2').datetimepicker(
                        {                              

                            format: "dd/mm/yyyy",
                            autoclose: true,
                            startView: 2,
                            minView: 2,

                            defaultDate: $descrChiuInt,
                            language: "it"
                        }).hide();


                        //$('#datetimepicker2').datetimepicker('setStartDate', '+0d');
                        $('#datetimepicker2').datetimepicker('setEndDate', '+5m').show();
                        $('#data_chiusura_int').val($descrChiuInt);
                        $('#descrChiusuraIntervento').val(app.global.nick_array.arr.int.descrizione_chiusura);

                    }else{//create
                        $('#datetimepicker1').datetimepicker(
                            {                              

                            format: "dd/mm/yyyy",
                            autoclose: true,
                            startView: 2,
                            minView: 2,
                           language: "it"
                        }).hide();
                        //$('#datetimepicker1').datetimepicker('setStartDate', '+0d');
                        $('#datetimepicker1').datetimepicker('setEndDate', '+5m').show();

                    } 

                    $("#manageForm").validate(); //sets up the validator
                    if($('input[name=manutenzione]:checked').val()==!2){//select ditte =manutenzione esterna
                        $("input[name=\"data_prevista\"]").rules( "add", {
                            required: true,
                            //date: true,
                            messages: {
                                required: "Per favore inserisci la data dell'intervento",
                            // date: "Data valida!"
                            }
                        });
                    }
                    if( !isNew){
                        $("input[name=\"data_chiusura_int\"]").rules( "add", {
                           // required: true,
                           //date: true,
                            messages: {
                              //  required: "Per favore inserisci la data dell'intervento",
                                date: "Data valida!"
                            }
                        });
                    }
                    $('#assegna').click(function () {
                        id=this.id;
                        //$("#data_chiusura_int").val("");
                            // alert("id="+id);
                           // dateInt=$("#datetimepicker1").data("DateTimePicker").date();
                             //return false;

                        if ($('#manageForm').valid()) {
                            // alert('form is valid - not submitted');
                            $("#assegna").prop( "disabled", true );
                            $("#data_chiusura_int").prop( "disabled", true );
                            assegna_intervento(id);
                            } else {
                                //alert('Inserire data intervento');
                            }
                             //assegna_intervento(id);
                    }); 
                    $('#chiusuraInt').click(function () {
                        id=this.id;
                            // alert("id="+id);
                            // dateInt=$("#datetimepicker1").data("DateTimePicker").date();
                             //return false;

                        if ($('#data_chiusura_int').val()!=="") {
                               // alert('form is valid - not submitted');
                               $("#assegna").prop( "disabled", true );
                               $("#data_chiusura_int").prop( "disabled", true );
                            assegna_intervento(id);
                            } else {
                                alert('Inserire data intervento chiuso/effettuato ');
                            }
                             //assegna_intervento(id);
                    }); 

                    $('#closeKO').click(function () {
                       id=this.id;
                       //  alert("id="+id);
                          assegna_intervento(id);
                        // return false;
                    }); 

                    $('#closeOK').click(function () {
                        id=this.id;
                        //  alert("id="+id);
                        assegna_intervento(id);

                    }); 
                    $("#file").change(function(){

                        readURL(this);
                        //that.$("#invio").prop( "disabled", false );
                    });
                    function readURL(input) {
                        if (input.files && input.files[0]) {
                            var reader = new FileReader();

                            reader.onload = function (e) {
                                $('#blah').attr('src', e.target.result);
                               // document.getElementById('invio').disabled = false;
                            }

                            reader.readAsDataURL(input.files[0]);

                        }
                    }    

                }//end set intervento1 
        }//end set intervento
        console.log(app.global.nick_array);
        function assegna_intervento(id){
            console.log(id);
            var form_data = new FormData(this.$('#manageForm')[0]);
            $idInterv=this.$("#id").val();
            dateInt=this.$("#data_prevista").val();
            dateChiuInt=this.$("#data_chiusura_int").val();
            console.log('data_intervento='+dateInt);
            
            if($idInterv){//update
                console.log(dateInt+"true="+$idInterv);
                $action='update'
                dateAssInt=app.global.nick_array.arr.int.data_assegnazione;
                if(id=="assegna"){//siamo in modifica 
                   
                    if(app.global.nick_array.arr.int.data_prevista!=dateInt){//se è cambiata la data del previsto intervento : modifica e invia mail
                        console.log("date diverse")
                        form_data.append('data_assegnazione',moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));//nuova data assegnazione intervento
                        //form_data.append('data_chiusura_int', moment(dateChiuInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('mode','new');
                   
                    }else{// altrimenti modifica senza inviare mail ... modifica solo descrizione intervento senza modificare la firma
                        console.log("date uguali")
                        form_data.append('data_assegnazione',moment(dateAssInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        //form_data.append('data_chiusura_int', moment(dateChiuInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('mode','same');
                    }
                }
                if(id=="chiusuraInt"){//siamo in chiusura intervento
                    if(app.global.nick_array.arr.int.data_effettuata!=dateChiuInt){//se è cambiata la data di chiusura intervento : modifica e invia mail
                        console.log("date chiusura diverse")
                        form_data.append('data_assegnazione',moment(dateAssInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('data_chiusura_int', moment(dateChiuInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('mode','close');
                    }else{ //altrimenti modifica senza inviare mail ... modifica solo descrizione chiusura intervento senza modificare la firma
                        form_data.append('data_assegnazione',moment(dateAssInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('data_chiusura_int', moment(dateChiuInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
                        form_data.append('mode','closeSame');    
                    }    
                  
                    
                }
                
               
            }else{//new
                console.log('data_intervento='+dateInt+" false="+$idInterv);
                $action='add';
              form_data.append('data_assegnazione',moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            }
            var data = {};
            //dateInt=this.$("#datetimepicker1").data().date;
            
          
            s=this.$('#manutenzione option:selected').text();
            var $person=app.global.tokensCollection.first().get("id_person");
            var API_URL = app.global.json_url + 'rma/intervento/';  
            form_data.append('id_type',id);
            form_data.append('type','intervento');
            form_data.append('action',$action);
            form_data.append('person', $person);
            form_data.append('numero_RMA', app.global.nick_array.arr.num_prog);
            form_data.append('id_rma', app.global.nick_array.arr.id);
            form_data.append('id_intervento', app.global.nick_array.id_int);
            form_data.append('numero_intervento', $num_intervento);
            
            form_data.append('numero_manutentori', $selManutentore.selectpicker('val').length);
            if( dateInt !== null && dateInt !== ""){
                form_data.append('data_prevista1', moment(dateInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));       
            }else{
                form_data.append('data_prevista1',"");
            }
            console.log( $selManutentore.selectpicker('val').length);
            var $tipoMan=$('input[name=manutenzione]:checked').val();
            var $manutentori=[];
            console.log( $selManutentore.selectpicker('val')[0]['id_person']);
            
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

               $.each(that.$('#manageForm').serializeArray(), function() {
               //$.each(row, function() {
                  var val = this.value;
                  var c = this.name.split("[");
                  var a = buildInputObject(c, val);
                  $.extend(true, data, a);
                });

            //--------------------------------------------------------------------------
            
            $.each($selManutentore.selectpicker('val'), function(i, value) {
                console.log(_.keys(value));
                $manutentori['id_RMA']=app.global.nick_array.arr.num_prog;
                $manutentori['num_intervento']=$num_intervento;
                $manutentori['tipo_man']=$tipoMan;
                $manutentori['id_man']=$selManutentore.selectpicker('val')[i]['id_person'];
            });
            console.log(form_data[0]);
         
            /*
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
              
            };
            */
            $headers1 = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
              
            };
            $.ajax({
               // url:API_URL+"//asas",
                url:API_URL,
                type:'post',
                headers : $headers1,
                data: form_data,
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false    
                beforeSend : function(){
                    //$("#preview").fadeOut();
                    $("#err").fadeOut();
                },
                success: function(data){
                    console.log("success"+data);
                    if(data=='invalid'){
                        // invalid file format.
                        $("#err").html("Invalid File !").fadeIn();
                    }
                    else{
                        // view uploaded file.
                      /*  $("#preview").html("Invio nuova richiesta con successo!").fadeIn().fadeOut(4000,function(){
                        app.routers.rmaRouter.prototype.rma_new();
                        });
                        $("#richiestaManutenzioneForm")[0].reset(); 
                        that.$('#btnHead').show();
                        */
                        // that.$("#invio").prop( "disabled", true );
                       var obj=JSON.parse(data);
                        bootbox.alert({ 
                            title:that.language.header_rma_intervento_message,
                            //message:that.language.body_message,
                            message:obj.message,
                            
                            callback: function() {
                            
                                // loadDataInterventi(app.global.nick_array.arr.id);
                                 app.routers.rmaRouter.prototype.rma_view();
                                //app.routers.rmaRouter.prototype.rma_management();
                        }
                        });
                        /*
                        bootbox.dialog({
                        title: that.language.header_registration_message,
                        message: that.language.body_message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.rmaRouter.prototype.rma_new();
                                }
                            }
                        }
                    });*/
                   
                    }
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });
            return false; // avoid to execute the actual submit of the form.
        }//end assegna intervento
// setForm(this,app.global.nick_array.arr);
        //------------------------------------------------------------------------------------          
        function setForm(that,$row){
            //-------------------------------------------------------------------------------------
            console.log("arr="+app.global.nick_array.arr.int);
            if(app.global.nick_array.arr.int=="DEPARTMENTS"){
            console.log("arr="+app.global.nick_array.arr);
            that.$("#registrationForm").empty();
            // that.$("#registrationForm").append(
              varForm=  '<input type="hidden" class="form-control" name="id" id="id">'+ 
                '<div class="form-group">'+
                    '<label id="lblname" for="name">Nome Servizio</label>'+
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Servizio" >'+
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
              that.$("#registrationForm").append(varForm);
                      //----------------------------------------------------------------------
                        if(!isNew && app.global.nick_array.arr.email.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.arr.email.length; $i++) {
                            $iEmail=$i;
                           
                           // $("#email").append(  
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.arr.email[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.arr.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.arr.email[$i]['emailNome']+'" placeholder="Nome Email">'+
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
                        //'</button>'+
                    '</div>'+
                '</div>'+    
                '<div id="telefoni" >';
        that.$("#registrationForm").append(varForm);
                              //--------------------------------------------------------------------------
       
              if(!isNew && app.global.nick_array.arr.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.arr.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.arr.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                           // $("#telefoni").append(  
                         varForm=          
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+app.global.nick_array.arr.telefoni[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+app.global.nick_array.arr.telefoni[$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+app.global.nick_array.arr.telefoni[$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
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
                
//---------------------------------------------------------------------------------- 
                   varForm= '</div>'+    
                
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
                    '<div class="form-group col-lg-6">'+     
                      '<label for="referente">Referente  '+
                      
                    
                       '<input type="checkbox" class="form-check-input" name="responsabile" id="responsabile" >'+
                    
                      ' Responsabile </label>'+  
                      '<select  name="referente" id="referente"  class="form-control" ></select>'+
                        
                    '</div>'+
                   
                    '<div class="form-group col-lg-6">'+
                        '<label for="coordinatore">Coordinatore</label>'+
                        '<select  name="coordinatore" id="coordinatore"  class="form-control" ></select>'+
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
                   
                '</div>'
                        ; //add input box
                 that.$("#registrationForm").append(varForm);
              
              //-----------------------------------------------------------------------------------
     
                 that.$("#registrationForm").validate({

                    rules: {
                        name: {
                          required: true,
                          minlength: 2
                        },
                        "telefoni[]":{
                             required: true,
                          minlength: 6,
                          number:true
                        }
                        

                    },
                    messages: {
                        name: {
                          required: "Perfavore inserisci il nome del Servizio",
                          minlength: "Il nome del Servizio deve contenere perlomeno 2 caratteri"
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
                 coordinatore();
                }
            });
        }       
        
             //-------------------------------coordinatori------------------------------------------
           
        function  coordinatore(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "coordinatore";
            
            
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
                referente();
                }
            });
        }       
                
        //-------------------------------referenti------------------------------------------
           
        function  referente(){    
            
            var jsonObj = {};
            jsonObj.action = "referente";
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
              //-------------------------------------event----------------------------------------------------------------
 
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
              
        }
        //---------------------------------Ditte-----------------------------------------------------------------------    
            else if (app.global.nick_array.arr=="Ditte") {
                that.$("#registrationForm").empty();
                // that.$("#registrationForm").append(
                varForm=  '<input type="hidden" class="form-control" name="id" id="id">'+ 
                 '<div class="row">'+
                    '<div class="form-group col-lg-8">'+
                        '<label id="lblname" for="name">Nome Ditta</label>'+
                        '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Ditta" >'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label id="lblname" for="piva">Partita IVA</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" >'+
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
                that.$("#registrationForm").append(varForm);
                      //----------------------------------------------------------------------
                   
                    if(!isNew && app.global.nick_array.arr.email.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.arr.email.length; $i++) {
                            $iEmail=$i;
                           
                           // $("#email").append(  
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+app.global.nick_array.arr.email[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+app.global.nick_array.arr.email[$i]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+app.global.nick_array.arr.email[$i]['emailNome']+'" placeholder="Nome Email">'+
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
                          if(!isNew && app.global.nick_array.arr.telefoni.length>0){
                    
                 
                      
                        console.log("telefoniL=" + app.global.nick_array.arr.telefoni.length);
                        for ($i = 0; $i <app.global.nick_array.arr.telefoni.length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                           // $("#telefoni").append(  
                         varForm=          
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+app.global.nick_array.arr.telefoni[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+app.global.nick_array.arr.telefoni[$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+app.global.nick_array.arr.telefoni[$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
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
                  
                    if(!isNew && app.global.nick_array.arr.referente.length>0){ 
                    
                        for ($i = 0; $i <app.global.nick_array.arr.referente.length; $i++) {
                            $iReferente=$i;
                           
                          
                             varForm=        
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+app.global.nick_array.arr.referente[$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+app.global.nick_array.arr.referente[$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+app.global.nick_array.arr.referente[$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+app.global.nick_array.arr.referente[$i]['mansione']+'" placeholder="Mansione">'+
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
                    $varNote=app.global.nick_array.arr.note 
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
                   
                '</div>'
                        ; //add input box
                 that.$("#registrationForm").append(varForm);
              
              //-----------------------------------------------------------------------------------
     
                 that.$("#registrationForm").validate({

                    rules: {
                        name: {
                          required: true,
                          minlength: 2
                        },
                        "telefoni[]":{
                             required: true,
                          minlength: 6,
                          number:true
                        }
                        

                    },
                    messages: {
                        name: {
                          required: "Perfavore inserisci il nome dellla Ditta",
                          minlength: "Il nome della Ditta deve contenere perlomeno 2 caratteri"
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
       
            }); //end referenti ditte add-----------------------------------------------------------------------------
            
            
        }
            else{//se non siamo nei servizi/ditte that.$("#registrationForm").empty();
            that.$("#registrationForm").empty();
            that.$("#registrationForm").append(
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
            '<button type="submit" class="btn btn-primary submit">Submit</button>');
                 
                   
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
                } );
             
      
                 
           
      } 
        }//end setForm   
        //------------------------------------------------------------------------------------
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
        //------------------------------------------------------------------------------------                  
        function showAlert(title, type) {
            $alert.attr('class', 'alert alert-' + type || 'success')
                  .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
            setTimeout(function () {
                $alert.hide();
            }, 3000);
        }
        //------------------------------------------------------------------------------------    
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
        if(!isNew){//update
            console.log("uppppdate"+app.global.nick_array.arr.int.valid);
            console.log(app.global.nick_array)
        
            if(app.global.nick_array.arr.int.valid==="1" | app.global.nick_array.arr.int.valid===true){$active=true}else{$active=false}
            console.log(app.global.nick_array.arr.int); 
            console.log("=act="+$active+"id="+app.global.nick_array.arr.int.id);
            that.$('#id').val( app.global.nick_array.arr.id);
            console.log(app.global.nick_array.arr.valid+"=act="+$active)
            that.$('#valid').prop("checked", $active);
            that.$('#name').val( app.global.nick_array.arr.int.name);
            that.$('#indirizzo').val( app.global.nick_array.arr.int.indirizzo);
            that.$('#comune').val( app.global.nick_array.arr.int.id_comune);
            that.$('#cap').val( app.global.nick_array.arr.int.id_cap);
            that.$('#provincia').val( app.global.nick_array.arr.id_provincia);
            that.$('#regione').val( app.global.nick_array.arr.id_regione);
            that.$('#description').val( app.global.nick_array.arr.description);
            that.$('#shortDescription').val( app.global.nick_array.arr.shortDescription);
            that.$('#referente').val( app.global.nick_array.arr.referente);
            that.$('#coordinatore').val( app.global.nick_array.arr.coordinatore);
            that.$('#piva').val( app.global.nick_array.arr.piva);
            
            console.log("uppppdate"+app.global.nick_array.arr.id_regione);
            
       
        //---------------------------------------------------------------------------
        that.$('#email').val( app.global.nick_array.arr.email);

            that.$('#telefono').val( app.global.nick_array.arr.telefono);
            
            that.$('#device1').val( app.global.nick_array.arr.device1);
            that.$('#device2').val( app.global.nick_array.arr.device2);
            that.$("#submit").html(that.language.submit);  

        }//  if( !isNew)
        else{//create
            that.$('#id').val("");
            console.log("=act="+$active)
            
            that.$('#valid').prop("checked", false);
            that.$('#name').val( "");
            that.$('#indirizzo').val( "");
            that.$('#comune').val( "");
            that.$('#cap').val( "");
            that.$('#provincia').val( "");
            that.$('#regione').val( "");
             that.$('#piva').val( "");
            
            that.$('#email').val( "");

            that.$('#telefono').val( "");
            that.$('#description').val("");
            that.$('#shortDescription').val("");
            
            that.$('#device1').val( "");
            that.$('#device2').val( "");
            that.$("#submit").html(that.language.submit); 
          
        }
      //  setData (that,app.global.nick_array.arr)          
        /** validate form **/
            
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
        return this;
      
    },

    /** registration **/
    registration_: function (event) {
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

                    console.log( ($mydata.message));
                    console.log( ($mydata.errorCode));
                   
                   
                    
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
                   
                    console.error("hr list load table error!!!");
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
       

        
    },

    /** render user form data to JSON obj **/
    registration_formToJson: function(that) {
      
        var $folder="";
        var data = {};
            
        that.$('#registrationForm').find('input[name]').each(
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
            
        that.$('#registrationForm').find('select[name]').each(
        function () {
                if($(this).val()===null){
                    data[$(this).attr('name')] =""   
                }else{
                    data[$(this).attr('name')] = parseInt($(this).val());    
                }
                

        });
           
          
            
            console.log("uche="+ that.$('#registrationForm').find('input[name="valid"]').prop("checked")) ; 
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

 $.each(that.$('#registrationForm').serializeArray(), function() {
 //$.each(row, function() {
    var val = this.value;
    var c = this.name.split("[");
    var a = buildInputObject(c, val);
    $.extend(true, data, a);
  });
    console.log(data['id'] );
    console.log(data['valid'] );
    var typeValid= data['valid']===0 ? "0" : "1";
    data['valid']=typeValid 
     console.log(data['valid'] );
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
return app.views.rma_management_edit;
});               
