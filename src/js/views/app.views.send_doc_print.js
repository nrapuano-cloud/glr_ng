require(['app','bootbox'], function(app,bootbox){
app.views.send_doc_print = Backbone.View.extend({
       
   
    
    initialize:function(){
    

    	console.log("initializing send view")
       var jsonObj = {};
           
         jsonObj.person = app.global.tokensCollection.first().get("id_person");
       jsonObj = JSON.stringify(jsonObj);
        $.ajax({
        url:app.global.json_url+'auth/',
        type:'post',
        headers : this.headerJson(),
        data: jsonObj,
        dataType : 'text',
        success: function (datap) {
            $mydata =JSON.parse(datap);
            // $mydata =(datap);

            console.log( ($mydata));
            //-------------------------------------------------------
            if ($mydata.success){

            }else{
                 app.routers.router.prototype.logout();
               
            }
        },
        error: function () {
            app.routers.router.prototype.logout();
               
           }
        });
   
    },
 
    	events:{
		 'submit':  'send_'
		
    
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
   
   
    render:function(){
    	$(this.el).html(this.template());
    	
        
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
       if(app.global.breadcrumb.length>1){
        app.global.breadcrumb.pop();
       }
       for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
       }

        //document.getElementById("#invio").disabled = true;
        this.$("#invio").prop( "disabled", true );
        
        that=this;
        this.$("#file").change(function(){
            // that.$("#preview").fadeOut();  
            readURL(this);
             that.$("#invio").prop( "disabled", false );
             
              
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
        this.$("#form").validate({
        
            rules: {

                copie: {
                    required: true,
                    range: [1,500],
                    number: true
                }
            },
            messages: this.language.form_messages
         
        });
       
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this;
    },
   
    /** send_ **/
   send_: function (event) {
        event.preventDefault();
        console.log("ssssss");
        that.$("#invio").prop( "disabled", true );
         
        var form_data = new FormData(this.$('#form')[0]);                  
       //form_data.append('file', file_data);
        form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
        var usr_id=app.global.tokensCollection.first().get("id_person");
       
        var API_URL = app.global.json_url + 'upload/';
        
        
            
       
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
                //"Content-Type": "application/json"
            };
            $.ajax({
                url:API_URL+usr_id+"/stampa/doc/",
                type:'post',
                headers : $headers,
                //data :  jsonObj,
                // dataType : 'text',
                data:form_data,
                //data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
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
                       
                         bootbox.alert({ 
                            title: "Upload Documenti",
                            message: "Upload del Documento avvenuta con successo !",
                            
                            
                        });    
                          app.routers.router.prototype.send_doc_stampa();      
                        $("#form")[0].reset(); 
                        that.$('#btnHead').show();
                        
                        // that.$("#invio").prop( "disabled", true );
                   
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
        },

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
           
    }

})//Backbone.View.extend({
return app.views.send_doc_print;
});



