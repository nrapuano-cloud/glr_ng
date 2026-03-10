require(['app','bootbox'], function(app,bootbox){
app.views.gap_doc_new = Backbone.View.extend({
       
    
    
    initialize:function(){
    

    	console.log("initializing gap_doc_new")},

    	events:{
		 'submit':  'send_'
       
		
    
  },
    
   
   
     render:function(){
    	$(this.el).html(this.template());
    	
        var $varForm='';
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
        if(app.global.breadcrumb.length>1){
        app.global.breadcrumb.pop();
       }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
       
        var $selServizio=this.$("#servizi");
        var $selVeicolo=this.$("#veicoli");
        var $selTipo=this.$("#tipi_doc");
        //document.getElementById("#invio").disabled = true;
        this.$("#invio").prop( "disabled", true );
        var $servizi=new Array();
        //-------------------------------servizi---+-----tipo doc-tec----------------------------------
       
        $servizio = app.global.tokensCollection.first().get("id_servizio");
         console.log($servizio);
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var  uurl=app.global.json_url+'gap/'; 
        var jsonObj = {};
       
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.person =$person ;              
        jsonObj.action = "modulo";
        jsonObj.type = "gap_doc_new"; //nuovo doc
        jsonObj = JSON.stringify(jsonObj);
        
        $.ajax({
            url:uurl,
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                if ($mydata.success){

                    
                    if($mydata.selServizi!==""){
                        $selServizio.append('<label for="servizio">Invio documenti  per conto del Servizio *</label><select  id="servizio" name="servizio"  class="form-control" ></select><br><br>'); 
                        $servizi=$mydata.servizi;
                        $bb=$mydata.servizi;
                        $("#servizio").append('<option value="">Seleziona</option>');
                        $.each($mydata.servizi, function(i, value) {
                            $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                        });
                        console.log($servizio);
                      $("#servizio").val($servizio);
                      targa($servizio);
                        //$("#servizio").val(0);
                    }
                    
                    //--------------------tipo doc-tec----------------------------
                    var $enabled="";
                    $aa=$mydata.tipoDoc;
                    $selTipo.append('<label>Tipologia del documento *</label><select  id="documento" name="documento"  class="form-control" '+$enabled+'></select><br><br>'); 
                       
                   $("#documento").append('<option value="">Seleziona</option>');
                    $.each($aa, function(i, value) {
                        $("#documento").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                    var $setStartDate='';
                    if (typeof $mydata.setStartDate !== 'undefined'){
                        $setStartDate=$mydata.setStartDate;
                    }  else{
                        $setStartDate='-1y';
                    }
                     $("#documento").change(function () {
                         tipo_change($setStartDate);
                     });
                     $("#servizio").change(function () {
                         $("#documento").val("");
                         targa($("#servizio").val());
                         tipo_change($setStartDate);
                     });
                      


                }else {

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
        var that=this;
        $varNota=false;
        function targa($serv){
                 //--------------------targa veicolo----------------------------
                var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var  uurl=app.global.json_url+'gap/'; 
        var jsonObj = {};
       
        $person = app.global.tokensCollection.first().get("id_person");
        
        jsonObj.servizio =$serv;
        jsonObj.person =$person ;              
        jsonObj.action = "modulo";
        jsonObj.type = "targa"; //nuovo doc
        jsonObj = JSON.stringify(jsonObj);
        
            $.ajax({
                url:uurl,
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){


                        if($mydata.targa!==[]){
                            $selVeicolo.empty().append('<label >Targa del veicolo *</label><select  id="targa" name="targa"  class="form-control" ></select><br><br>'); 
                            $targa=$mydata.targa;

                            $("#targa").append('<option value="">Seleziona</option>');
                            $.each($targa, function(i, value) {
                                $("#targa").append('<option value="'+value["id"]+'">'+value["targa"]+'</option>');
                            });

                        }    
                    }
                }
            });
        }
        function tipo_change($setStartDate){
            
            console.log($("#documento").val())
            switch(that.$("#documento option:selected").text()){
                case 'ALTRO':{//Altro
                     console.log('Altro'); 
                      $varForm='<div class="row">'+
                                   
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Data del documento *</label>'+
                                        '<div class="input-group date " id="datetimepicker1">'+

                                            '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" readonly/>'+ 
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                           '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label >Nota *</label>'+
                                        '<input type="text" name="nota" id="nota" class="form-control ">'+
                                    '</div>'+
                                '</div>';
                   $varNota=true;
                
                }  
                break;
                case 'REVISIONE':{//Revisione
                     console.log('Revisione'); 
                      $varForm='<div class="row">'+
                                   
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Data del documento *</label>'+
                                        '<div class="input-group date " id="datetimepicker1">'+

                                            '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" readonly/>'+ 
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                           '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label >Nota </label>'+
                                        '<input type="text" name="notax" id="notax" class="form-control ">'+
                                    '</div>'+
                                '</div>';
                  
                   $varNota=false;
                }  
                break;
               /* case '2':{//sorveglianza antincendio
                    console.log('sorveglianza antincendio');
                    console.log($("#servizio").val())
                  
                   var $nome_inc = _.map(_.where($servizi,{id: $("#servizio").val()}),function( num ) {
                       return num.incaricato_antincendio
                   });
                   var $id_inc = _.map(_.where($servizi,{id: $("#servizio").val()}),function( num ) {
                       return num.id_incaricato_antincendio
                   });
    
                    console.log($nome_inc,$id_inc );
                       $varForm='<div class="row">'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Incaricato registro antincendio *</label>'+
                                        '<input type="text" name="incaricato" id="incaricato" class="form-control " value="'+$nome_inc+'" readonly>'+
                                        '<input type="hidden" name="id_incaricato_antincendio" id="id_incaricato_antincendio" class="form-control " value="'+$id_inc+'" readonly>'+
                                
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Data del documento *</label>'+
                                        '<div class="input-group date " id="datetimepicker1">'+

                                            '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" readonly/>'+ 
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                           '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label >Breve descrizione dell\'intervento effettuato *</label>'+
                                        '<input type="text" name="nota" id="nota" class="form-control " readonly value="Sorveglianza antincendio">'+
                                    '</div>'+
                                '</div>';
                }  
                break;
                case '3':{//prove di evacuazione
                  console.log('prove di evacuazione');
                      var $nome_inc = _.map(_.where($servizi,{id: $("#servizio").val()}),function( num ) {
                       return num.incaricato_antincendio
                   });
                   var $id_inc = _.map(_.where($servizi,{id: $("#servizio").val()}),function( num ) {
                       return num.id_incaricato_antincendio
                   });
    
                    console.log($nome_inc,$id_inc );
                       $varForm='<div class="row">'+
                                    '<!--div class="form-group col-lg-6">'+
                                        '<label>Incaricato registro antincendio *</label>'+
                                        '<input type="text" name="incaricato" id="incaricato" class="form-control " value="'+$nome_inc+'" readonly>'+
                                        '<input type="hidden" name="id_incaricato_antincendio" id="id_incaricato_antincendio" class="form-control " value="'+$id_inc+'" readonly>'+
                                
                                    '</div-->'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Data del documento *</label>'+
                                        '<div class="input-group date " id="datetimepicker1">'+

                                            '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" readonly/>'+ 
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                           '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label >Breve descrizione dell\'intervento effettuato *</label>'+
                                        '<input type="text" name="nota" id="nota" class="form-control "  value="Prova di evacuazione">'+
                                    '</div>'+
                                '</div>';
                }  
                break;*/
                default:{
                      console.log('default');
                    
                break;
            }}
            
            that.$("#tipi_form").empty();   
            that.$("#tipi_form").append( $varForm);
            that.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
            that.$('#datetimepicker1').datetimepicker('setStartDate', $setStartDate);
            that.$('#datetimepicker1').datetimepicker('setEndDate', '+0d');
        
        }
        
      //  $('#nota').rules('add',  { required: true });
        this.$("#formData").validate({
        
            rules: {
                servizio: {
                    required: true
                },
                documento: {
                    required: true
                },
                ditta: {
                    required: true
                    
                },
                   incaricato: {
                    required: true
                    
                },
                dataTemp: {
                    required: true
                    
                },
                 nota: {
                    required: true
                    
                },
                targa: {
                    required: true
                    
                },
                
                
               
            },
            messages:{  servizio: {
                    required: "Selezionare il servizio"
                    
                    
                },
                 documento: {
                    required: "Selezionare il tipo di documento"
                    
                },
                 dataTemp: {
                    required: "Inserire la data"
                    
                },
                ditta: {
                    required: "Inserire il nome della ditta"
                    
                },
                   incaricato: {
                    required: "Nome incaricato registro antincendio non presente!<br> Contattare ufficio logistica."
                    
                },

                nota: {
                    required: "Inserire il tipo di documento"
                    
                },
                targa: {
                    required: "Selezionare la targa di un veicolo"
                    
                },
            }
         
        });
       
       
        
        that=this;
        
          
     
        this.$("#file").change(function(){
            // that.$("#preview").fadeOut();  
            readURL(this);
            that.$("#invio").prop( "disabled", false );
             
              
             });
             
         this.$("#documento").change(function(){
           console.log(this.val());
            tipo_change();
             
              
             });
       
       
       
       
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                     document.getElementById('invio').disabled = false;
                }

                reader.readAsDataURL(input.files[0]);
                //$("#invio").attr( 'disabled', false );
               

            }
        }
        
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
       
        this.$("#invio").prop( "disabled", true );
        var jsonObj = {};
        var that=this;  
       
        var form_data = new FormData($("#formData")[0]);   
        form_data.append('documento_doc', this.$("#documento option:selected").text());
        form_data.append('targa_targa', this.$("#targa option:selected").text());
        form_data.append('action', 'add');
        form_data.append('type', 'gap_doc_new');
        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
       
        
        $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "lang" : app.global.languagesCollection.at(0).get("lang"), 
            };
        $.ajax({
            url:app.global.json_url+'gap/',
            type:'post',
            headers : $headers,
            data: form_data,
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false     
            success: function(data){
                 var  $mydata =JSON.parse(data);
                
                bootbox.alert({ 
                    title: "GAP Invio documento",
                  
                   message: $mydata.message,

                    callback: function() {
                        app.routers.gapRouter.prototype.gap_doc_new();
                    }
                });
                       
                   
            },
            error: function(e) {
                $("#err").html(e).fadeIn();
            } 
                
       
        });
    },
    
  

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);


    }
})//Backbone.View.extend({
return app.views.gap_doc_new;
});


