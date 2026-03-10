require(['app','bootbox'], function(app,bootbox){
app.views.send = Backbone.View.extend({
       
    
    
    initialize:function(){
    

    	console.log("initializing send view")},

    	events:{
		 'submit':  'send_'
		
    
  },
    
   
   
    render:function(){
    	$(this.el).html(this.template());
    	
        var $form=this.$("#form");
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
        if(app.global.breadcrumb.length>1){
        app.global.breadcrumb.pop();
       }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        /*
        $varForm='<div class="form-group">'+
                    '<div id="servizi"></div>'+
                    '<div id="tipi_doc"></div>'+
                '</div>';
        $form.empty();   
        $form.append( $varForm);
        */
        var $selServizio=this.$("#servizi");
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
        var  uurl=app.global.json_url+'rma/';    
        $action = "list";
        $type = "tipi_doc";  
        $token=app.global.tokensCollection.first().get("auth").auth;
        $person = app.global.tokensCollection.first().get("id_person");
        $.ajax({
            url:uurl+$action+"/"+ $type+"/"+$person+"/"+$token+"/",
            type:'get',
            headers : $headers,
            //data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                if ($mydata.success){

                    $aa=$mydata.data;
                    if($mydata.selServizi!==""){
                        $selServizio.append('<label for="servizio">Invio documenti tecnici per conto del Servizio *</label><select  id="servizio" name="servizio"  class="form-control" ></select><br><br>'); 
                        $servizi=$mydata.servizi;
                        $bb=$mydata.servizi;
                        $("#servizio").append('<option value="">Seleziona</option>');
                        $.each($mydata.servizi, function(i, value) {
                            $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                        });
                        console.log($servizio);
                      $("#servizio").val($servizio);
                        //$("#servizio").val(0);
                    }
                    //--------------------tipo doc-tec----------------------------
                    var $enabled="";
                   
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
       
        function tipo_change($setStartDate){
            
            console.log($("#documento").val())
            switch(that.$("#documento").val()){
                case '1'://buoni di lavoro ditte esterne
                     console.log('buoni di lavoro ditte esterne'); 
                      $varForm='<div class="row">'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label>Nome ditta *</label>'+
                                        '<input type="text" name="ditta" id="ditta" class="form-control ">'+
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
                                        '<input type="text" name="nota" id="nota" class="form-control ">'+
                                    '</div>'+
                                '</div>';
                   
                   
                break;
                case '2'://sorveglianza antincendio
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
                    
                break;
                case '3'://prove di evacuazione
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
                   
                break;
                default:
                      console.log('default');
                     $varForm='<div class="form-group col-lg-12">'+
                                    '<label for="nota">Nota *</label>'+
                                    '<input type="text" name="nota" id="nota" class="form-control ">'+
                                '</div>';
                    
                break;
            }
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
        
        
        this.$("#form").validate({
        
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
                    
                }
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
                    required: "Inserire una breve descrizione"
                    
                }}
         
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
    
     send__:function(e){
      console.log("ssssss");
      alert("esss");
           
            var jsonObj = {};
            
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            
            jsonObj = JSON.stringify(jsonObj);
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
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
                  // $mydata =(datap);
                 
                  console.log( ($mydata));
            //-------------------------------------------------------
                if ($mydata.success){
                  /*  bootbox.dialog({
                        title: that.language.header_hr_message,
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
                   
                }
                else {
                
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
                }
                    
                    
                   
                
                    },
                error: function () {
                   
                     console.log("send error!!!");
                                   }
            });
    
   },
     /** send_2 **/
    send_: function (event) {
        event.preventDefault();
        console.log("ssssss");
        var $dataTemp="";
        this.$("#invio").prop( "disabled", true );
        this.$('#dataTemp').val()==''?$dataTemp=null: $dataTemp=moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
        
             
        var file_data = this.$('#file').prop('files')[0];   
        var form_data = new FormData(this.$('#form')[0]);                  
        //form_data.append('file', file_data);
        form_data.append('dataTempF', $dataTemp);
      
        //alert(_.keys(form_data));    
        var input = document.getElementById('file').files[0];
        
        var nota = document.getElementById('nota').value;
        console.log("ttt0="+input.name+"-"+"-"+nota);
       
        var API_URL = app.global.json_url + 'upload/';
        var usr_id=app.global.tokensCollection.first().get("id_person");
        var jsonObj = {};
            jsonObj.id=usr_id;
            jsonObj.nota=nota;
            jsonObj.foto_stampa=false;
            jsonObj.name_file=input.name;
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.id_persona = app.global.tokensCollection.first().get("id_persona");
            console.log("nvbr="+jsonObj.role);
            jsonObj = JSON.stringify(jsonObj);
            
       
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
                //"Content-Type": "application/json"
            };
            $.ajax({
                url:API_URL+usr_id+"/PDF/web/",
                type:'post',
                headers : $headers,
                //data :  jsonObj,
                // dataType : 'text',
                //data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                data: form_data,
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false    
                beforeSend : function(){
                    //$("#preview").fadeOut();
                   
                    $("#err").fadeOut();
                },
                success: function(data){
                    console.log("success");
                    if(data=='invalid'){
                        // invalid file format.
                        $("#err").html("Invalid File !").fadeIn();
                    }
                    else{
                       
                        bootbox.alert({ 
                            title: "Upload Documenti",
                            message: "Upload del Documento avvenuta con successo !",
                            
                            
                        });    
                         app.routers.rmaRouter.prototype.send();
                        
                        $("#form")[0].reset(); 
                       $('#btnHead').show();
                                          
                    }
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } ,
                
                   xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
                if (percentComplete === 1) {
                    $('.progress').addClass('hide');
                }
            }
        }, false);
        xhr.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
            }
        }, false);
        return xhr;
    }
            });
        }
      
        ,

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({

return app.views.send;
    });

