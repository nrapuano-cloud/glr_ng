require(['app','bootbox'], function(app,bootbox){
    app.views.rma_new_contatori = Backbone.View.extend({
        initialize:function(){
            console.log("initializing rma_new_contatori view")},
    
        events:{
            'submit':  'send_'
        },
          
        formUte:function($spec,that,$change,$arr){
          // var $change=false;
          
           var $spec_campi= $spec?JSON.parse($spec.campi_specifici):'';
           var $spec_lettura= $arr?JSON.parse($arr.lettura):'';
           console.log($spec,$change,$spec_campi,$arr);
            var $sezione='<input type="hidden" name="id" id="id" value="'+($arr?$arr.id?$arr.id:'':'')+'" >'+
                         '<input type="hidden" name="id_utenza" id="id_utenza" value="'+($spec?$spec.id?$spec.id:'':'')+'" >';
           switch($spec.tipo){
               
                 case'ENERGIA ELETTRICA':{
                         
                                $sezione+=
                                    '<div class="form-group col-lg-6">'+
                                        '<label  title="Point of Delivery - Punto di prelievo">POD</label>'+
                                        '<input type="text" class="form-control" name="pod" id="pod" value="'+($spec?$spec_campi.pod?$spec_campi.pod:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Codice Cliente</label>'+
                                        '<input type="text" class="form-control" name="codiceCliente" id="codiceCliente" value="'+($spec?$spec_campi.codiceCliente?$spec_campi.codiceCliente:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-10">'+
                                        '<label  >Matricola del contatore</label>'+
                                        '<input type="text" class="form-control" name="matricolaContatore" id="matricolaContatore" value="'+($spec?$spec_campi.matricolaContatore?$spec_campi.matricolaContatore:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  >F1</label>'+
                                        '<input type="text" class="form-control" name="f1" id="f1" value="'+($spec?$spec_lettura?$spec_lettura.f1?$spec_lettura.f1:'':'':'')+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  >F2</label>'+
                                        '<input type="text" class="form-control" name="f2" id="f2" value="'+($spec?$spec_lettura?$spec_lettura.f2?$spec_lettura.f2:'':'':'')+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  >F3</label>'+
                                        '<input type="text" class="form-control" name="f3" id="f3" value="'+($spec?$spec_lettura?$spec_lettura.f3?$spec_lettura.f3:'':'':'')+'">'+
                                    '</div>'
                                ;
                        that.$('#formUtenza').empty().append($sezione);
                        return;
                 }
                 case'GAS':{
                           $sezione+=
                                    '<div class="form-group col-lg-6">'+
                                        '<label  title="Punto di Riconsegna">PDR</label>'+
                                        '<input type="text" class="form-control" name="pdr" id="pdr" value="'+($spec?$spec_campi.pdr?$spec_campi.pdr:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Codice Cliente</label>'+
                                        '<input type="text" class="form-control" name="codiceCliente" id="codiceCliente" value="'+($spec?$spec_campi.codiceCliente?$spec_campi.codiceCliente:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-10">'+
                                        '<label  >Matricola del contatore</label>'+
                                        '<input type="text" class="form-control" name="matricolaContatore" id="matricolaContatore" value="'+($spec?$spec_campi.matricolaContatore?$spec_campi.matricolaContatore:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  title="Leggere nel display le cifre prima della virgola (in caso di contatore elettronico), oppure leggere le cifre su sfondo nero (in caso di contatore meccanico)">Lettura contatore gas in m3</label>'+
                                        '<input type="text" class="form-control" name="lettura" id="lettura" value="'+($spec?$spec_lettura?$spec_lettura.lettura?$spec_lettura.lettura:'':'':'')+'">'+
                                    '</div>'
                                    
                                ;
                       that.$('#formUtenza').empty().append($sezione);
                        return;
                 }
                 case'ACQUA':{
                          $sezione+=
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Codice Cliente</label>'+
                                        '<input type="text" class="form-control" name="codiceCliente" id="codiceCliente" value="'+($spec?$spec_campi.codiceCliente?$spec_campi.codiceCliente:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-10">'+
                                        '<label  >Matricola del contatore</label>'+
                                        '<input type="text" class="form-control" name="matricolaContatore" id="matricolaContatore" value="'+($spec?$spec_campi.matricolaContatore?$spec_campi.matricolaContatore:'':'')+'" readonly>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  title="Per la lettura del contatore dell\'acqua devi prendere solo i numeri interi, ossia quelli neri.">Lettura contatore acqua in m3</label>'+
                                        '<input type="text" class="form-control" name="lettura" id="lettura" value="'+($spec?$spec_lettura?$spec_lettura.lettura?$spec_lettura.lettura:'':'':'')+'">'+
                                    '</div>'
                                ;
                       that.$('#formUtenza').empty().append($sezione);
                        return;
                 }
             }
       },
       
        render:function(){
            $(this.el).html(this.template());
            var $new=true;
            this.$new=true;
            var $arr;
            if (app.global.nick_array.arr){
                this.$new=false;
                $new=false;
                $arr=app.global.nick_array.arr;
                console.log("update",$arr)
               this.$(".lead").empty().append("Update Lettura Contatori ");
            }else{
                this.$(".lead").empty().append("Nuova Lettura Contatori ");
            }
            console.log(app.global.breadcrumb);
            if(app.global.breadcrumb.length>2){
              app.global.breadcrumb.pop();
            }
            for(i=0; i<app.global.breadcrumb.length; i++){
               this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            }
            
            
            this.$('#link_root_rma').tooltip({title: 'window' })
            var $selUtenza=this.$("#utenza");
            var $selFornitura=this.$("#fornitura");
            var $selectorServizio=this.$("#servizi");
            var $selServizio;
            var $fornitore=this.$("#fornitore");
            var $competenza=this.$("#competenza");
            var $dataLettura=this.$("#dataLettura");
            var  $data;
            var $headers = {
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"), 
                    "Content-Type": "application/json"
                };
            var jsonObj = {};
            var  uurl=app.global.json_url+'servizi/';
            $person = app.global.tokensCollection.first().get("id_person");
            if($new){
                $servizio = app.global.tokensCollection.first().get("id_servizio");
            }else{
                $servizio = $arr.id_servizio;
            }
            console.log($servizio);
            this.$('#id_person').prop( "value", $person );
            this.$('#id_servizio').prop( "value", $servizio );
            
            $action = "list";
            $type = "utenza";   
            that=this;
            
            $token=app.global.tokensCollection.first().get("auth").auth;
            
            console.log('person='+$person+' servizio='+$servizio);
            
           
            //-------------------------------utenze---------------------------------
             function selUte($servizio) {
                  $.ajax({
                    url:uurl+$action+"/"+ $type+"/"+$person+"/"+$servizio+"/",
                    type:'get',
                    headers : $headers,
                    //data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                        $mydata =JSON.parse(json);
                        if ($mydata.success){
                            $selUtenza.empty();
                            $selFornitura.empty();
                            $aa=$mydata.data;
                            $data=$mydata;
                            $competenza.val("");
                            $fornitore.val("");
                            $dataLettura.val("");
                            that.$('#formUtenza').empty();
                            $selUtenza.append('<option value="" ></option>');
                            $.each($aa, function(i, value) {
                                $selUtenza.append('<option value="'+value+'">'+value+'</option>');
                            });
                            if(!$new){$selUtenza.val(that.$arr.utenza)}
                            $.each($data.utenza, function(i, value) {
                                console.log(value.tipo,$selUtenza.val());
                                if(value.tipo===$selUtenza.val()){
                                    $selFornitura.append('<option value="'+value.id+'">'+value.fornitura+'</option>');
                                }
                            });
                            
                            if(!$new){$selFornitura.val(that.$arr.id).change()}
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
             }
            //------------------------prima volta ------------------------------------------------------- 
            $.ajax({
                url:uurl+$action+"/"+ $type+"/"+$person+"/"+$servizio+"/",
                type:'get',
                headers : $headers,
                //data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        $selUtenza.empty();
                        $selFornitura.empty();
                        $data=$mydata;
                        $aa=$mydata.data;
                        if($mydata.selServizi!==""){
                            $selectorServizio.append($mydata.selServizi); 
                            $bb=$mydata.servizi;
                             $selServizio=$("#servizio");
                            $selServizio.append('<option value="">Seleziona</option>');
                            $.each($mydata.servizi, function(i, value) {
                                $selServizio.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                            });
                            $selServizio.val($servizio);
                            $selServizio.change(function(sel){
                                console.log('sel=',$selServizio.val());
                                  that.$('#formUtenza').empty();
                              selUte($selServizio.val());
                            });
                        }
    
                        $selUtenza.append('<option value="" ></option>');
                        $.each($aa, function(i, value) {
                            $selUtenza.append('<option value="'+value+'">'+value+'</option>');
                        });
                        //$selFornitura.append('<option value="" ></option>');
                        $.each($data.utenza, function(i, value) {
                            if(value.tipo===$selUtenza.val()){
                                $selFornitura.append('<option value="'+value.id+'">'+value.fornitura+'</option>');
                            }
                        });
                        isUpdate()
                      ///  if(!$new){$selUtenza.val($arr.utenza)}
    
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
          
            //------------------------------------------------------------------------------------
            this.$("#letturaForm").validate({
              
       
                rules:{
                    highlight: function(element, errorClass) {
                            $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizio:{
                        required:true
                    },
                        utenza:{
                        required:true
                    },
                   
                    dataLettura:{
                        required:true,
                       
                       
                    },
                /*    ubicazione:{
                        required:true,
                       // maxlength:20
                       
                    } ,
                   file: {
                        required: false,
                        accept: "image/*"
                    }*/
                    
               },
               messages: {
                    servizio:"Scegliere un Servizio",
                   utenza:"Scegliere una Utenza"
                   
        
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
            this.$('#datetimepicker1').datetimepicker('setStartDate', '-2y');
            this.$('#datetimepicker1').datetimepicker('setEndDate', '+0d');
            that=this;
            var $utenza=[];
            $selUtenza.change(function(sel){
                $selFornitura.empty();
                $id_ser='';
                $fornitore.val('');
                $competenza.val('');
                //$utenza=val;
                if($selServizio.val()){
                    $id_ser=$selServizio.val();
                     console.log($id_ser);
                }else{
                    $id_ser=$servizio;
                    console.log($id_ser); 
                }
                
            //     selUte($id_ser);
                $('textarea[name="note"]').val('');
                
                $dataLettura.val("");
                $($data.utenze).each( function(index,val){
                    if(val.tipo===$selUtenza.val()){
                    
                        $selFornitura.append('<option value="'+val.id+'">'+val.fornitura+'</option>');
                       
                    }
                })
                $selFornitura.change();
             //   that.formUte($utenza,that,$new,$arr);
             });
             $selFornitura.change(function(sel){
                
                $('textarea[name="note"]').val('');
                
                $dataLettura.val("");
                $($data.utenze).each( function(index,val){
                    if(val.id===$selFornitura.val()){
                        $fornitore.val(val.name);
                        $competenza.val(val.competenza);
                        $utenza=val;
                    }
                })
                console.log(sel,$utenza,$data);
                that.formUte($utenza,that,$new,$arr);
             });
            function isUpdate(){
                if(!$new){//visualizzazione x view letture in admin e solo edit x valori letture
                    $selUtenza.val($arr.utenza).change();
                    $selUtenza.attr("disabled", true); 
                    $selFornitura.attr("disabled", true); 
                    $selServizio.attr("disabled", true); 
                    $('textarea[name="note"]').val($arr.note);
                    $dataLettura.val($arr.data_lettura);
                }
            }
            $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
            return this
        },
        //----------------------------------------------------------------------------------------------------------------------
        send_: function (event) {
            event.preventDefault();
            console.log(that.$("#servizio").val(),this.$new);
            that.$("#invio").prop( "disabled", true );
            var form_data = new FormData(this.$('#letturaForm')[0]); 
            var API_URL = app.global.json_url + 'servizi/lettura_contatori/'; 
            if(!this.$new){
                console.log(that.$("#servizio").val());
                form_data.append('action', 'update');
                form_data.append('servizio', that.$("#servizio").val());// con la select disable
                form_data.append('utenza', that.$("#utenza").val());// con la select disable
            }else{
            form_data.append('action', 'add');
            }
            form_data.append('data_lettura', moment(that.$("#dataLettura").val(),"YYYY-MM-DD"));
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
    
    
                    $mydata =JSON.parse(data);
                    console.log("success");
                     if (!app.global.nick_array.arr){
    
                       bootbox.alert({ 
    
                            title: "Nuova lettura contatore",
                            message:  $mydata.message,
    
                            callback: function() {
                               app.routers.rmaRouter.prototype.rma_new_contatori();
                        }
                        });
                        }else{
    
                            bootbox.alert({ 
    
                            title: "Update lettura contatore",
                            message:  $mydata.message,
    
                            callback: function() {
                             app.routers.rmaRouter.prototype.rma_view_contatori();
                        }
                        });
                        }
    
    
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                }
            });
        },
        destroy_view:function(){
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
        }
    })//Backbone.View.extend({
return app.views.rma_new_contatori;
    });


