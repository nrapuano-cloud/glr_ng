require(['app','bootbox'], function(app,bootbox){
app.views.rma_new = Backbone.View.extend({
       
    
    
    initialize:function(){
    

    	console.log("initializing rma_new view")},

    	events:{
		    'submit':  'send_',
           // 'click .image-Plus':'add_image',
           'change #categoria':'attrezzature',
           'change #servizio':'servizio',
         //   'load #file':'add_image1'
		},
        headerJson: function(){
            var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            return $headers;
        },
        servizio:function(){
            $person=this.$("#id_person").val();
            $servizio=this.$("#servizio").val();
            this.$("#richiestaManutenzioneForm")[0].reset();
            this.$("#servizio").val($servizio);
            this.$("#attrezzature").empty();
        }, 
        attrezzature:function(){
            var $selAttrezzatura=this.$("#attrezzature");
            $selAttrezzatura.empty();
            $person = app.global.tokensCollection.first().get("id_person");
            $servizio = this.$("#servizio").val();
            $action = "list";
            $type = "attrezzature";
            $cat = this.$("#categoria").val();
            if($cat){
            $token=app.global.tokensCollection.first().get("auth").auth; 
            $.ajax({
                url:app.global.json_url+'rma/'+$action+"/"+ $type+"/"+$cat+"/"+$servizio+"/"+$person+"/"+$token+"/",
                type:'get',
                headers : this.headerJson(),
                //data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        
                        console.log($mydata.data);
                        if($mydata.data.length!==0){
                            $selAttrezzatura.append($mydata.selAttrezzature); 
                           console.log($mydata.selAttrezzature)
                           
                            $("#attrezzatura").append('<option value="">Seleziona</option>');
                            $.each($mydata.data, function(i, value) {
                                $("#attrezzatura").append('<option value="'+value["id"]+'">'+value["tipo"]+" - "+value["codice"]+" - "+value["descrizione"]+'</option>');
                            });
                           
                        }

                    }else {
                
                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: "Errore...",
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                      //   app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                   
                     bootbox.dialog({
                        title: "Errore...",
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "KO",
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    // app.routers.router.prototype.logout();
                                }
                            }
                        }
                    });
                }
                
            });
        }
        },    
    add_image:function(that,$i,$src){
        this.$("#image").append(
            '<div class="row">'+
        
                '<img name="image['+$i+']" id="image['+$i+']" src='+$src+' />'+
                '<input type="hidden" class="form-control" name="image['+$i+'][id]" >'+  
           
                '<div class="form-group col-lg-1">'+
                    '<a class="removeImage'+$i+'" href="javascript:" title="Delete Image"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                '</div>'+

            '</div>'
        );
        this.$('.removeImage'+$i).children().each(function(){
            $(this).click(function() {
                $(this).closest(".row").remove();

            });
        });
   
    }, 
   
    render:function(){
    	$(this.el).html(this.template());
        
        console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        
        
        this.$('#link_root_rma').tooltip({title: 'window' })
        var $selCategoria=this.$("#categoria");
        var $selServizio=this.$("#servizi");
        
        
        
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        var  uurl=app.global.json_url+'rma/';
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        
        this.$('#id_person').prop( "value", $person );
        
        $action = "list";
        $type = "categoria";   
        that=this;
    	
        $token=app.global.tokensCollection.first().get("auth").auth;
        
        console.log('person='+$person+' servizio='+$servizio);
        
        //-------------------------------categorie------------------------------------------
           
            $.ajax({
                url:uurl+$action+"/"+ $type+"/"+$person+"/"+$token+"/",
                type:'get',
                headers : $headers,
                //data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        $selCategoria.empty();
                        $aa=$mydata.data;
                        console.log($mydata.servizi);
                        if($mydata.servizi){
                            $selServizio.append($mydata.selServizi); 
                            $bb=$mydata.servizi;
                            $("#servizio").append('<option value="">Seleziona</option>');
                            $.each($mydata.servizi, function(i, value) {
                                $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                            });
                            $("#servizio").val($servizio);
                        }

                        $selCategoria.append('<option value="" ></option>');
                        $.each($aa, function(i, value) {
                            $selCategoria.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
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
                                      //   app.routers.router.prototype.logout();
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
//--------------------------------------------------------------------------------------------------------------------------------
       
     
       
        this.$("#richiestaManutenzioneForm").validate({
          
   
            rules:{
                highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                        $(element).fadeIn();
                    });
                },
                servizio:{
                    required:true
                },
                    categoria:{
                    required:true
                },
           	descrizione:{
                    required:true,
                   // maxlength:16
                    
                },
                dataTemp:{
                    required:true,
                   
                   
                },
                ubicazione:{
                    required:true,
                   // maxlength:20
                   
                }/* ,
               file: {
                    required: false,
                    accept: "image/*"
                }*/
                
           },
           messages: {
                servizio:"Scegliere un Servizio",
               categoria:"Scegliere una Categoria",
                descrizione: "Inserire una descrizione della richiesta di manutenzione da effettuare",
                ubicazione: "Inserire dove la manutenzione va effettuata"
    
            }
        });
         
              
        
        
        this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            language: "it"
        });
        if($('input[name="temp"]')){
             console.log("exist");
        }
        if($('input[name="temp"]:checked').val()==1){
                console.log("val=1");//urgente
                 $('#datetimepicker1').datetimepicker().hide();
            }else
           {
                console.log("val=2");
                 $('#datetimepicker1').datetimepicker().show();
            }
        this.$('#datetimepicker1').datetimepicker('setStartDate', '+7d');
        this.$('#datetimepicker1').datetimepicker('setEndDate', '+5m');
        this.$("#temp").change(function(){
            $('#dataTemp').val("");
            if($('input[name="temp"]:checked').val()==1){
                console.log("val=1");//urgente
                 $('#datetimepicker1').datetimepicker().hide();
            }else
           {
                console.log("val=2");
                 $('#datetimepicker1').datetimepicker().show();
            }
           
        });
        var $iImage=0;
        that=this;
        this.$("#file").change(function(){
            handleFiles(this.files);
           // readURL(this);
             //that.$("#invio").prop( "disabled", false );
            }
        );
       
            function readURL(input) {
            if (input.files && input.files[0]) {
              
                var reader = new FileReader();

                reader.onload = function (e) {
                    
                    $iImage = $iImage + 1;
                  //  $('#blah').attr('src', e.target.result);
                     document.getElementById('invio').disabled = false;
                     console.log($iImage, e.target.result);
                     that.add_image(that,$iImage, e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
                //$("#invio").attr( 'disabled', false );
               
                console.log(reader.LOADING);
            }
        }
      
        function handleFiles(files) {
            console.log(files[0]);
            this.$("#image").empty();
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const img = document.createElement("img");
                img.classList.add("obj");
                img.file = file;
           
          
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
                this.$("#image").append(
                
                    '<div class="panel panel-default">'+
                        '<div class="panel-body" id="bod'+i+'">'+
                      
                        '</div>'+
                    '</div>'
                    
                ); 
                $("#bod"+i).append(
                    img, img.file.name
                )
            }
          }
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
        console.log("ssssss");
        that.$("#invio").prop( "disabled", true );
        
        var form_data = new FormData(this.$('#richiestaManutenzioneForm')[0]); 
        s=this.$('#categoria option:selected').text();
        var $person=app.global.tokensCollection.first().get("id_person");
        var API_URL = app.global.json_url + 'rma/new/';  
        form_data.append('categoriaC', s);
        form_data.append('id_servizio', $servizio);
        if(this.$('#attrezzatura')){
            form_data.append('attrezzatura_text',this.$("#attrezzatura option:selected").text());
        }
          
        
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
                    console.log("success");
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
                        bootbox.alert({ 
                            title: that.language.header_rma_new_message,
                            message: that.language.body_message,
                            
                            callback: function() {
                            app.routers.rmaRouter.prototype.rma_new();
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
return app.views.rma_new;
    });


