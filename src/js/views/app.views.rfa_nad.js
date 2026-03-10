require(['app','bootbox'], function(app,bootbox){
app.views.rfa_nad = Backbone.View.extend({
       
    
    
    initialize:function(){
    

    	console.log("initializing rfa_nad view")},

    	events:{
		 'submit':  'send_'
       
		
    
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
        
        
        this.$('#link_root_rfa').tooltip({title: 'window' })
        
        var $selServizioEx=false;//se esiste la select x conto servizi?
        var $selServizio=this.$("#servizi");//il div
        var $selServizioX="";//la select
        var $table="";
        this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
        this.$('#datetimepicker1').datetimepicker('setStartDate', '+1w');
        this.$('#datetimepicker1').datetimepicker('setEndDate', '+5m');
        
        
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        var  uurl=app.global.json_url+'rfa/';
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.person =$person ;              
        jsonObj.action = "modulo";
        jsonObj.type = "nad"; //nuovo acquisto diretto    
        jsonObj = JSON.stringify(jsonObj);
        
        this.$('#id_person').prop( "value", $person );
        
          
        var that=this;
    	
        //-------------------------------servizi------------------------------------------
           
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                   
                    $mydata =JSON.parse(json);
                    
                    if ($mydata.success){
                        
                        $aa=$mydata.data;
                      
                        if($mydata.selServizi!==""){
                            $selServizioEx=true;
                            console.log($selServizioEx);
                            $selServizio.append($mydata.selServizi); 
                            $bb=$mydata.servizi;
                            $selServizioX=that.$("#servizio");
                            $selServizioX.append('<option value="0">Seleziona</option>');
                            $.each($mydata.servizi, function(i, value) {
                                $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                            });
                            $selServizioX.val($servizio);
                            $selServizioX.change(function (e,value,row) {
                                
                                that.$("#fornitori").empty();
                               
                               nad();
                            });
                            nad();
                        }

                        
                    }else{
                
                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons:{
                                main:{
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function(){
                                        $("body").removeClass("modal-open");
                                       // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                   // $mydata =JSON.parse(json);
                     bootbox.dialog({
                        title: "Errore ...",
                        message: "Errore ...",
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
                
            });
//--------------------------------------------------------------------------------------------------------------------------------
       
        function nad(){
            //Acquisto diretto
                    that.$("#tempistica").hide();
                    varForm='<div class="panel panel-default">'+
                            '<div class="panel-body">'+
                                '<div class="form-group row text-center">'+
                                    '<label class="text-center">Acquisto diretto</label>'+
                                '</div>'+
                                '<div class="form-group row">'+
                                    '<div class="col-sm-6">'+  
                                        '<label for="dataAcq">Data acquisto *</label>'+
                                        '<div class="input-group date " id="datePicAcq">'+
                                            '<input type="text" class="form-control "  id="dataAcquisto" name="dataAcquisto" readonly/>'+
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                            '</span>'+
                                        '</div>'+
                                      
                                    '</div>'+
                                   
                                    '<div class="col-sm-6">'+  
                                        '<label for="numDoc">Numero documento *</label>'+
                                        '<input type="text" id="numDoc" name="numDoc" class="form-control" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="panel panel-default">'+
                                    '<div class="panel-heading">Punto vendita</div>'+
                                    '<div class="panel-body">'+
                                        '<div class="form-group row">'+
                                            '<div class="col-sm-12">'+  
                                                '<label for="puntoVendita">Ragione sociale *</label>'+

                                                '<input type="text" id="puntoVendita" name="puntoVendita" class="form-control" >'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row">'+
                                            '<div class="col-sm-12">'+  
                                                '<label for="indirizzo">Indirizzo *</label>'+

                                                '<input type="text" id="indirizzo" name="indirizzo" class="form-control" >'+
                                            '</div>'+
                                            
                
                                           
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div  class="row">'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label for="allegato">Seleziona il file del documento *</label>'+
                                        '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="image/*,application/pdf">'+

                                    '</div>'+
                                '</div>'+
                                
                                
                                
                            '</div>'+
                        '</div>'+
                    '<br>';
                    that.$("#fornitori").append(varForm); 
                    $('#datePicAcq').datetimepicker({ 
                        format: "dd/mm/yyyy",
                        autoclose: true,
                        startView: 2,
                        minView: 2,
                        
                        language: "it"
                    }).show();
                    $('#datePicAcq').datetimepicker('setStartDate', '-1y');
                    $('#datePicAcq').datetimepicker('setEndDate', '+0d');
                    
                    //-------------------------------------------------------------
                    //
       //  document.getElementById('allegato').addEventListener('change', (e) => { 
     /*  $( "#allegato" ).change(function(e) {
        var reader = new FileReader();
         var [file] = e.target.files;
        reader.onload=function(e){
  
    // read the content
    var versionString = e.target.result;
    console.log("pdf_vers="+versionString);
  };
  reader.readAsText(file.slice(5, 8));
                   
            });     
            */
                    //----------------------------------------------------------------------------
                   
                    $( "#dataAcquisto" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare la data d'acquisto"
                          
                        }
                    });
                    
                    $( "#numDoc" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire il numero  del documento"
                          
                        }
                    });
                    $( "#puntoVendita" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire il nome del punto vendita"
                          
                        }
                    });
                    $( "#indirizzo" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire l'indirizzo del punto vendita"
                          
                        }
                    });
                   
                    $( "#allegato" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare il file del documento"
                          
                        }
                    });
                    
                     that.$('#invio').prop( "disabled", false);
                    
                    
        };          
            
           
       
    //-----------------------------------------------------------------------------------
        
        this.$("#richiestaOrdineForm").validate({
          
   
            rules:{
                highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                        $(element).fadeIn();
                    });
                },
                tipo:{
                    required:true
                },
                 quantita:{
                    required:true,
                    number:true
                },
                 prodotto:{
                    required:true
                },
                        ".editable":{
                    required:true
                },
           	selFornitore:{
                    required:true,
                  
                    
                },
                dataTemp:{
                    required:true,
                   // maxlength:20
                   
                }/* ,
               file: {
                    required: false,
                    accept: "image/*"
                }*/
                
           },
           dataAcquisto:{
                    required:true
                   
                   
            } ,
               
                
           
           messages: {
              prodotto: "Inserire la descrizione del prodotto",
             quantita:{ required:"Inserire la quantità",
              number: "Inserire un numero"},
                tipo: "Selezionare una Tipologia Prodotto",
                dataTemp: "Inserire la data",
                ".editable":"inserire la quantità"
            }
        });    
        
        this.$("#temp").change(function(){
            $('#dataTemp').val("");
            $('#datetimepicker1').datetimepicker().toggle();
        });
         
       
      
        
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
       
        this.$("#invio").prop( "disabled", true );
        var jsonObj = {};
        var that=this;  
       
        var form_data = new FormData($("#richiestaOrdineForm")[0]);   
     
        
        form_data.append('action', 'add');
        form_data.append('type', 'nad');
        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
       
        
        $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "lang" : app.global.languagesCollection.at(0).get("lang"), 
            };
        $.ajax({
            url:app.global.json_url+'rfa/ordini/',
            type:'post',
            headers : $headers,
            data: form_data,
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false     
            success: function(data){
                 var  $mydata =JSON.parse(data);
                bootbox.alert({ 
                    title: that.language.header_rfa_new_message,
                   // message: "Richiesta Fabbisogno Approvvigionamento inviata correttamente",
                   message: $mydata.message,

                    callback: function() {
                        app.routers.rfaRouter.prototype.rfa_new();
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
return app.views.rfa_nad;
});


