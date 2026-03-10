require(['app','bootbox'], function(app,bootbox){
app.views.rfa_nag = Backbone.View.extend({
       
    
    
    initialize:function(){
    
        this.$isnew=true;
    	console.log("initializing rfa_nag view");
    
    },

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
        jsonObj.type = "nag"; //nuovo acquisto diretto    
        jsonObj = JSON.stringify(jsonObj);
        
        this.$('#id_person').prop( "value", $person );
        
          
        var that=this;
    	
        //-------------------------------servizi--------------------------------
           
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

                          nag($mydata.tipiFornitura,$mydata.data_competenza);
                        });
                        nag($mydata.tipiFornitura,$mydata.data_competenza);
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
        //----------------------------------------------------------------------
       
        function nag(tipiFornitura,data_competenza){
           
            //Acquisto diretto
            that.$("#tempistica").hide();
            varForm=
            '<div class="panel panel-default">'+
                '<div class="panel-body">'+
                    '<div class="form-group row text-center">'+
                        '<label class="text-center">Acquisto giornaliero</label>'+
                    '</div>'+

                    '<div class="row">'+
                        '<div class="col-sm-6">'+  
                            '<label >Tipo fornitura *</label>'+
                            '<select  id="tipoFornitura" name="tipoFornitura" class="form-control" ></select>'+
                        '</div>'+
                        '<div class="col-sm-6">'+  
                            '<label >Fornitore *</label>'+
                            '<input type="text" id="fornitore" name="fornitore" class="form-control" >'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-sm-6">'+  
                            '<label for="dataAcq">Mese di competenza *</label>'+
                            '<div class="input-group date " id="datePicAcq">'+
                                '<input type="text" class="form-control "  id="dataAcquisto" name="dataAcquisto" readonly/>'+
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
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
            $selTipoFornitura=this.$("#tipoFornitura")
            $selTipoFornitura.append('<option></option>');
            $.each(tipiFornitura, function(i, value) {
                                $selTipoFornitura.append('<option value="'+value.id+'">'+value.name+'</option>');
                            });
            $('#datePicAcq').datetimepicker({ 
                format: "mm/yyyy",
                autoclose: true,
                startView: 3,
                minView: 3,

                language: "it"
            }).show();
            $('#datePicAcq').datetimepicker('setStartDate', '-1y');
            $('#datePicAcq').datetimepicker('setEndDate', '+0d');
                   
            //------------------------------------------------------------------
                   
            $( "#dataAcquisto" ).rules( "add", {
                required: true,

                messages: {
                  required: "Selezionare il mese di competenza"

                }
            });

            $( "#tipoFornitura" ).rules( "add", {
                required: true,

                messages: {
                  required: "Selezionare il tipo di fornitura"

                }
            });
            $( "#fornitore" ).rules( "add", {
                required: true,

                messages: {
                  required: "Inserire il nome del fornitore"

                }
            });

            $( "#allegato" ).rules( "add", {
                required: true,

                messages: {
                  required: "Selezionare il file del documento"

                }
            });

            that.$('#invio').prop( "disabled", false);

            that.$("#tipoFornitura").change(function(){
                check();
            });
            that.$("#dataAcquisto").change(function(){
                check();
            });
            function check(){
                $.each(data_competenza, function(i, value) {//check se esiste già il mese ed il tipo di fornitura$( "#myselect option:selected" ).text();
                    $data_comp=moment(value["data_acquisto"]).format('MM/YYYY');
                    $tipo_forn=value["id_tipo_fornitore"];
                   console.log("test",$data_comp,that.$("#dataAcquisto").val(),$tipo_forn,that.$("#tipoFornitura").val(),that.$('#tipoFornitura  option:selected').text());
                        if($data_comp===that.$("#dataAcquisto").val() && $tipo_forn===that.$("#tipoFornitura").val()){
                             console.log("match",$data_comp,that.$("#dataAcquisto").val(),$tipo_forn,that.$("#tipoFornitura").val());
                              bootbox.confirm({
                                title: "Attenzione",
                                message: "Esiste già un documento con data di competenza <b>"+$data_comp+"</b><br>"+ 
                                           " e di tipo fornitura <b>"+that.$('#tipoFornitura option:selected').text()+
                                           "</b><br>vuoi proseguire e sostituirlo?",
                                buttons: {
                                    cancel: {
                                        label: '<i class="fa fa-times"></i> Cancel'
                                    },
                                    confirm: {
                                        label: '<i class="fa fa-check"></i> Confirm'
                                    }
                                },
                                callback: function (result) {
                                   
                                    if(result){that.$isnew=false;
                                        that.$id=value["id"]
                                    }
                                }
                            })
                        }//data_acquisto,id_tipo_fornitore
                    });
               
            }
            function addNew(){
                console.log("add");
            }
        };          
        //----------------------------------------------------------------------
        
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
        return this
    },
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
       
        this.$("#invio").prop( "disabled", true );
        var jsonObj = {};
        var that=this;  
       
        var form_data = new FormData($("#richiestaOrdineForm")[0]);   
     
        form_data.append('id', that.$id);
        form_data.append('action', that.$isnew?'add':'update');
        form_data.append('type', 'nag');
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
                        app.routers.rfaRouter.prototype.rfa_nag();
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
return app.views.rfa_nag;
});


