require(['app','bootbox'], function(app,bootbox){
app.views.rma_int_fare = Backbone.View.extend({
       
    initialize:function(){
     	console.log("initializing rma_int_fare view")},

    	events:{
             "changeDate .pic1":"changeDate1",
        "changeDate .pic2":"changeDate2"
	   
        },
    rma_detail:function(e, row, $element,options){
    
  
        app.global.breadcrumb.push({
               
        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.num_prog+" del "+row.data_richiesta+'</li>'
    });
        app.global.nick_array.arr=row;
     
     
      app.routers.rmaRouter.prototype.rma_detail();               //chiama la pagina data_type_edit
  
   },
    changeDate1:function(e){
            console.log(e);
              this.$('#datetimepicker2').datetimepicker('setStartDate',this.$('#datetimepicker1').data("datetimepicker").getDate());
     // this.$('#dataTemp2').val(moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('DD/MM/YYYY'))
             localStorage.setItem("dataDa", this.$('#datetimepicker1').data("datetimepicker").getDate());
        },
    changeDate2:function(e){
            localStorage.setItem("dataA", this.$('#datetimepicker2').data("datetimepicker").getDate());
        },   
  
   
    render:function(){
    	$(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rma/intervento/int/';
        var $table=this.$('#table'),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
        
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        
        this.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
               
                initialDate:'-2m'
                
            
            });
        this.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                 initialDate:'+2w'
              
            }); 
        
        this.$('#datetimepicker1').datetimepicker('setStartDate', '2018-01-01');
        this.$('#datetimepicker1').datetimepicker('setEndDate','-1w');
        this.$('#datetimepicker2').datetimepicker('setStartDate',this.$('#datetimepicker1').data("datetimepicker").getDate());
        this.$('#datetimepicker2').datetimepicker('setEndDate','+1m');
        
        console.log(localStorage.getItem("dataDaInt")); 
        if(localStorage.getItem("dataDaInt")!=="" && localStorage.getItem("dataDaInt")!==null){
            
             this.$('#dataTemp1').val(moment(localStorage.getItem("dataDaInt")).format('DD/MM/YYYY'));
             this.$('#datetimepicker1').datetimepicker('update');
     
         }else {
             this.$('#dataTemp1').val(moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('DD/MM/YYYY'));
             this.$('#datetimepicker1').datetimepicker('update');
         } 
        if(localStorage.getItem("dataAInt")!=="" && localStorage.getItem("dataAInt")!==null){
             
             this.$('#dataTemp2').val(moment(localStorage.getItem("dataAInt")).format('DD/MM/YYYY'));
             this.$('#datetimepicker2').datetimepicker('update');
         }else {
             this.$('#dataTemp2').val(moment(this.$('#datetimepicker2').data("datetimepicker").getDate()).format('DD/MM/YYYY'))
             this.$('#datetimepicker2').datetimepicker('update');
         }  
        console.log(this.$('#dataTemp1').val());
        console.log(this.$('#datetimepicker1').data("datetimepicker").getDate().getTime());
        console.log(this.$('#dataTemp2').val());
        console.log(this.$('#datetimepicker2').data("datetimepicker").getDate().getTime());
        console.log(this.$('#datetimepicker1').data("datetimepicker").getDate());
         var diff=this.$('#datetimepicker2').data("datetimepicker").getDate().getTime()-this.$('#datetimepicker1').data("datetimepicker").getDate().getTime();
            console.log(diff); 
        if(diff<0){
            alert('Data 2 non può essere minore di Data1');
            return;
        };
        $dataDa=this.$('#datetimepicker1').data("datetimepicker").getDate()
            console.log($dataDa);
      
        var that = this;
      callList();
       
        function  callList(){
            
            var jsonObj = {};
              var data1=moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            console.log(data1);
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.dataDa =moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataA = moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.action = "list";
            jsonObj.type = "intervento";
           
           
                       
            
            jsonObj = JSON.stringify(jsonObj);
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
           
   $.ajax({
            url:API_URL+"fare/",
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
                    hrTable($mydata);
                }
                else {
                
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
               error: function (datap) {
                     $mydata =JSON.parse(datap);
                   
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

    
    function  hrTable(my){
      $('#lblTitle').text( my.titolo);
        console.log('tableee');
        $table.bootstrapTable('destroy');
                        
        $.each( my.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=cellStyle;
            }
            if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
            }
            if(value1["formatter"]=="actionFormatter"){

                value1["formatter"]=actionFormatter;
            }

        });   
        $.each( my.data, function( key, value1 ){
          
            if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
               value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
               
            }
            
             if(typeof(value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){    
              
               value1["data_assegnazione"]=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
               
            }
           
              if(typeof(value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){    
               value1["data_previstaT"]='<span>'+moment(value1["data_prevista"]).format('YYYYMMDD')+'</span>'+moment(value1["data_prevista"]).format('DD/MM/YYYY');
               value1["data_prevista"]=moment(value1["data_prevista"]).format('DD/MM/YYYY');
               
            }
             if(typeof(value1["data_intervento"]) !== "undefined" && value1["data_intervento"] !== null){ 
           
               value1["data_intervento"]=moment(value1["data_intervento"]).format('DD/MM/YYYY');
               
            }
          
            if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
           
               value1["data_effettuata"]=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
               
            }
            if(typeof(value1["data_chiusura"]) !== "undefined" && value1["data_chiusura"] !== null){       
           
             
               value1["data_chiusura"]=moment(value1["data_chiusura"]).format('DD/MM/YYYY');
               
            }
            if(value1["manutenzione"]==="1"){value1["manutenzioneL"]="Interna";}
            if(value1["manutenzione"]==="2"){value1["manutenzioneL"]="Ditta Esterna";}
            if(value1["manutenzione"]==="3"){value1["manutenzioneL"]="Committente";}

        });   
        
        console.log(my.data);
        $table.bootstrapTable({
          
            columns: my.tab,
            //columns:columns,
            data: my.data,
            detailView:true,
            onExpandRow: function (index, row, $detail) {
                $('#modal').off('hide.bs.modal');
                $('#modal').off('show.bs.modal');
                $table.find('.detail-view').each(function () {
                    if (!$(this).is($detail.parent())) {
                        $(this).prev().find('.detail-icon').click()
                    }
                })
                //$detail.html(row.timestamp);
                var $numK=2;//2 righe servizio+indirizzo
                $serDescr= 'Servizio: '+row.servizio+'\nIndirizzo: '+row.indirizzo+' ('+row.comune+')';
                $.each( row.telefoni, function( key, value1 ){
                    $numK=$numK+1;   
                    $serDescr=$serDescr+ '\nTelefono : '+ value1.telefonoNome+' '+ value1.telefonoNumero;
                });
                $.each( row.email, function( key, value1 ){
                    $numK=$numK+1; 
                    $serDescr=$serDescr+ '\nEmail : '+ value1.emailNome+' '+ value1.email;
                });
                var $pic='';
                if(row.link_immagine && row.link_immagine!=''){}else{
                    $pic='disabled';
                }
                
                $detail.append(
                        '<div class="panel panel-default" style="border-width:2px;border-color:'+my.color[2].color+';">'+
        '<div class="panel-heading"><h3>Dati Richiesta</h3></div>'+
        '<div class="panel-body">'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-12">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Dati servizio</label>'+
                            '<textarea   id="descrizione" name="descrdescrizione" class="md-textarea form-control" style="field-sizing:content;" readonly>'+$serDescr+'</textarea>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly  data-descr="'+row.descrizione+'" data-title="Data richiesta RMA '+row.data_richiesta+'" value="'+row.data_richiesta+'">'+

                        '</div>'+
                        '<div class="form-group col-sm-9">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Descrizione richiesta</label>'+
                            '<textarea   id="descrizione" name="descrdescrizione" class="md-textarea form-control" style="field-sizing:content;" readonly>'+row.descr_richiesta+'</textarea>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="form-group col-sm-5">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Ubicazione</label>'+
                            
                            '<textarea  class="md-textarea form-control" style="field-sizing:content;"  readonly>'+row.ubicazione+'</textarea>'+

                        '</div>'+
                        '<div class="form-group col-sm-1">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Pic</label>'+
                            
                             '<button type="button" id="pic" name="pic" data-toggle="modal"  data-target="#modal" data-title="Pic Richiesta" data-image="'+row.link_immagine+'" class="btn btn-primary form-control"  '+$pic+'>Pic</button>'+
                  
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[2].color+';" >Nota della richiesta</label>'+
                            '<textarea   class="md-textarea form-control" style="field-sizing:content;" readonly>'+row.nota_richiesta+'</textarea>'+
                        '</div>'+
                    '</div></div></div>'
                        );
                          
                    if(typeof( row.data_assegnazione) !== "undefined" && row.data_assegnazione !== null){  
                        $data_ass=row.data_assegnazione;
                        $descrIz=row.descrizione;}else{
                            $data_ass='';
                        $descrIz='';
                        }
                    if(typeof( row.data_prevista) !== "undefined" && row.data_prevista !== null){  
                            $data_pre=row.data_prevista;
                            $descrIz=row.descrizione;}else{
                                $data_pre='';
                            $descrIz='';
                            } 
                       $numP=0;     
                       $.each( row.interventi_pre, function( key, value1 ){
                        var $pic1='';
                        if(value1['link_immagine'] && value1['link_immagine']!=''){}else{
                            $pic1='disabled';
                        }
                        $numP=$numP+1; 
                        console.log(value1);
                      $detail.append(
                    '<div class="panel panel-default" style="border-width:2px;border-color:'+my.color[7].color+';">'+
                        '<div class="panel-heading"><h3>Intervento '+$numP+'</h3></div>'+
                        '<div class="panel-body">'+
                            '<div class="row">'+        
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';"> Data intervento effettuato</label>'+
                                    '<input type="text" class=" form-control" data-toggle="modal"  readonly  data-descr="'+value1['descrizione_chiusura']+'" data-title="Intervento effettuato il '+value1['data_effettuata']+'" value="'+value1['data_effettuata']+'">'+
                                '</div>'+
                                '<div class="form-group col-sm-9">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';" >Descrizione chiusura intervento</label>'+
                                    '<textarea   id="descrizione" name="descrdescrizione" class="md-textarea form-control" style="field-sizing:content;" readonly>'+value1['descrizione_chiusura']+'</textarea>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group col-sm-1">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[7].color+';" >Pic</label>'+
                            
                             '<button type="button" id="pic" name="pic" data-toggle="modal"  data-target="#modal" data-title="Pic intervento" data-image="'+value1['link_immagine']+'" class="btn btn-primary form-control"  '+$pic1+'>Pic</button>'+
                  
                        '</div>'+
                         
                        '</div></div>'
                     );
                });         
                        $detail.append(
                    '<div class="panel panel-default" style="border-width:2px;border-color:'+my.color[7].color+';">'+
                        '<div class="panel-heading"><h3>Intervento assegnato</h3></div>'+
                        '<div class="panel-body">'+
                            '<div class="row">'+        
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';"> Data assegnazione</label>'+
                                    '<input type="text" class=" form-control" data-toggle="modal"  readonly  data-descr="'+$descrIz+'" data-title="Intervento assegnato il '+$data_ass+'" value="'+$data_ass+'">'+
                                '</div>'+
                                '<div class="form-group col-sm-9">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';" >Descrizione assegnazione</label>'+
                                    '<textarea   id="descrizione" name="descrdescrizione" class="md-textarea form-control" style="field-sizing:content;" readonly>'+row.descrizione+'</textarea>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+           
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';"> Data prevista intervento</label>'+
                                    '<input type="text" class=" form-control" data-toggle="modal"  readonly  data-descr="'+$descrIz+'" data-title="Intervento  assegnato il '+$data_pre+'" value="'+$data_pre+'">'+
                                '</div>'+
                                '<div class="form-group col-sm-9">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[7].color+';" >Descrizione prevista</label>'+
                                    '<textarea   id="descrizione" name="descrdescrizione" class="md-textarea form-control" style="field-sizing:content;" readonly>'+row.descrizione+'</textarea>'+
                                '</div>'+
                            '</div>'+
                         '<div class="row">'+           
                            '<div class="form-group col-sm-12">'+
                                '<label  class="label" style="color:White;background-color:'+my.color[7].color+';" >Manutentori impegnati</label>'+
                                '<textarea   id="impegnati" name="impegnati" class="md-textarea form-control" style="field-sizing:content;" readonly>'+row.impegnati+'</textarea>'+
                            '</div>'+
                        '</div></div></div>'+
                     '<div class="panel panel-default" style="border-width:2px;border-color:'+my.color[6].color+';" >'+
                        '<div class="panel-heading"><h3>Intervento effettuato</h3></div>'+
                        '<div class="panel-body">'+       
                        ' <form class="closeIntForm" id="closeInt" method="post">'+
                            '<div class="row">'+             
                                '<div class="form-group col-sm-12">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[6].color+';" >Descrizione intervento effettuato *</label>'+
                                    '<textarea   id="descrizione_int_effettuato" name="descrizione_int_effettuato" class="md-textarea form-control" rows="3" ></textarea>'+
                                '</div>'+
                            '</div>'+
                            
                            '<div class="row">'+
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[6].color+';">Nome *</label>'+
                                    '<input type="text"  class="form-control " name="nome_man" id="nome_man"  />'+
                                '</div>'+
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:White;background-color:'+my.color[6].color+';">Cognome *</label>'+
                                    '<input type="text"  class="form-control " name="cognome_man" id="cognome_man"  />'+
                                '</div>'+
                            '</div>'+    
                            '<div class="row">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="file">Seleziona immagine da inviare(.jpg, .jpeg, .png)</label>'+
                                    '<input type="file" name="file" id="file" accept="image/jpeg,image/gif,image/png">'+
                                    '<p class="help-block"></p>'+
                                '</div>'+
                                '<div id="preview">'+
                                    '<img id="blah" src=".\\css\\img\\filed.png" />'+
                                '</div>'+
                                '<br>'+
                            '</div>'+
                        
                            '<div class="row">'+
                                '<div class="form-group col-sm-12 " >'+
                                    '<label  class="label form-control" style="color:White;background-color:'+my.color[6].color+';">Chiudi intervento</label>'+        
                                    '<button type="button" id="chiusuraInt" name="chiusuraInt" class="btn btn-primary form-control">Invio</button>'+
                                '</div>'+
                            '</div></div></div>'+
                        '</form>');
                    $("input[name='num_ore']").TouchSpin({
                      min: 0,
                      max: 24,
                      step: 0.25,
                      decimals: 2,
                      boostat: 5,
                      maxboostedstep: 10
                      //postfix: '0.00'
                    });
              
               
                $("#closeInt").validate(); //sets up the validator
                $("#num_ore").prop( "disabled",false );
                
                $("#onOre").prop( "disabled",my.oreDis );
                $("input[name=\"num_ore\"]").rules( "add", {
                    required: true,
                    rangelength: [1, 24],
                    messages: {
                        required: "Perfavore inserisci le ore lavorate!"
                    }
                });
                $('#onOre').click(function (){
                if($(this).prop("checked"))
                  {
                    //alert('checked1');
                    $("input[name=\"num_ore\"]").rules( "add", {
                    required: true,
                    rangelength: [1, 24],
                    messages: {
                        required: "Perfavore inserisci le ore lavorate!"
                    }
                });
                $("#num_ore").prop( "disabled", false );
                }
                else
                {
                  //alert('unchecked');
                  $("input[name=\"num_ore\"]").rules( "remove" );
                  $("#num_ore").prop( "disabled", true );
                }}); 
               
                
                
                $("input[name=\"nome_man\"]").rules( "add", {
                    required: true,
                    
                    messages: {
                        required: "Perfavore inserisci il nome !"
                    }
                });
                 $("input[name=\"cognome_man\"]").rules( "add", {
                    required: true,
                    
                    messages: {
                        required: "Perfavore inserisci il cognome !"
                    }
                });
                
                
                $("textarea[name=\"descrizione_int_effettuato\"]").rules( "add", {
                    required: true,
                    
                    messages: {
                        required: "Perfavore inserisci la descrizione dell' intervento!"
                    }
                });
                $('#chiusuraInt').click(function () {
                    console.log($("#descrizione_int_effettuato").val());
                    if (typeof($("#descrizione_int_effettuato").val()) !== "undefined" && $("#descrizione_int_effettuato").val()==""){
                            alert('Perfavore inserisci la descrizione dell\' intervento!');
                    }else{
                        if($("#num_ore").prop( "disabled")===false && $("#num_ore").val()=="0.00"){
                            
                            alert('Perfavore inserisci le ore lavorate!');
                           
                        }else{
                        if ($('#closeInt').valid()) {
                            var domanda = confirm('Sei sicuro di inviare i dati inseriti?');
                            if (domanda === true) {    

                                assegna_intervento(row.id_rma,row.id);
                            }else{
                                alert('Invio dati  annullato');
                            }
                        }
                            //assegna_intervento(id);
                        }
                    }   
                });    
                   
                $("#closeInt").validate({
                         validClass: "success"
                     //  onsubmit: false
                    });
                $('#modal').on('show.bs.modal', function (event) {
                    var multiple=[];
                    var button = $(event.relatedTarget); 
                    var title = button.data('title');
                    var image = button.data('image');
                    //var bodyMes = row.descr_richiesta;
                    var bodyMes = button.data('descr');
                    console.log("image="+image,button);
                    var modal = $(this);
                    $('#modal .modal-body').empty().append(
                       
                        '<textarea class="form-control" name="descriz" id="descriz" readonly rows="5"></textarea>'
                    );
                    modal.find('.modal-title').text( title);
                    modal.find('.modal-body textarea').val(bodyMes);
                    if(button.data('image') && button.data('image')!==''){
                       
                        var fileX = button.data('image');
                        function work(fileX){
                            console.log(fileX);
                            var parts = fileX.split('.');
                            var ext = parts[parts.length - 1];
                            switch (ext.toLowerCase()) {
                                case 'pdf':
                                    image = "";
                                    $href =fileX;
                                    $hrefLabel ='<img src="./css/img/pdf.png" width="20px">';
                                    break;
                                default:
                                    $href ="";
                                    $hrefLabel ="";
                                    image = fileX;
                            } 
                            return  [$href,$hrefLabel,image];
                        }
                       
                        if(fileX=='multiple'){
                            console.log(row);
                            multiple=row.multiple;
                            $i=0;
                            $.each(multiple, function( key, element ){
                                $res=work(element.link_immagine);
                                console.log(element.id,$res[0],$res[1],$res[2]);
                                
                                $('#modal .modal-body').append(
                                    '<br/><div class="panel panel-default">'+
                                        '<div class="panel-body" id="bod'+$i+'">'+
                                      '<img  class="img-fluid" src="'+ $res[2]+'">'+ 
                                    '<a   href="'+$res[0]+'" target="_blank"></a>'+
                                       element.nome_originale+ '</div>'+
                                    '</div>'
                                    
                                );
                            });    
                            
                           
                        }else{
                            $res=work(fileX);
                            console.log( $res[0], $res[1], $res[2]);
                            $('#modal .modal-body').append(
                                '<br/><div class="panel panel-default">'+
                                    '<div class="panel-body" id="bod">'+
                                  '<img  class="img-fluid" src="'+ $res[2]+'">'+ 
                                '<a   href="'+$res[0]+'" target="_blank"></a>'+
                                   row.nome_originale+ '</div>'+
                                '</div>'
                                
                            );
                          //  modal.find('.modal-body img').attr('src', $res[2]); 
                           // modal.find('.modal-body a').attr('href', $res[0]);
                          //  modal.find('.modal-body a').html( $res[1]);
                        }     
                    }else{
                        modal.find('.modal-body img').attr('src', ''); 
                        modal.find('.modal-body a').attr('href', '');
                        modal.find('.modal-body a').html( '');
                    }
                })
                
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
                function showModal(title, row) {
       
      
    // // default row value
    console.log("title=" + title + " row=" + _.keys(row)+_.values(row));
        $modal.data('id_person', row.id_person);
            
       $modal.find('.modal-title').text(title);
       for (var name in row) {
             console.log("name=" + name + " val=" + row[name]);
                $modal.find('input[name="' + name + '"]').val(row[name]); 
            }
         
        $modal.modal('show');
    }    
             
            },
            showColumns:true,
            showRefresh:true,
            search:true,
            pagination:false
           
           
        });
        
            console.log(my.data);
            
             
               
       
            
        }
       
    function assegna_intervento(id_rma,id_int){
            var data = {};
           
           
            var form_data = new FormData(this.$('#closeInt')[0]); 
            
            var $person=app.global.tokensCollection.first().get("id_person");
            var API_URL = app.global.json_url + 'rma/intervento/int/fare/';  
            form_data.append('type','intervento');
            form_data.append('action','update');
            form_data.append('person', $person);
            form_data.append('id_rma', id_rma);
            form_data.append('id_intervento', id_int);
            form_data.append('data_chiusura_intervento',moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            
            
            $headers1 = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
              
            };
            $.ajax({
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
                            title:that.language.header_rma_intervento_chiuso_message,
                            message:that.language.body_intervento_chiuso_message,
                            
                            callback: function() {
                            
                               // loadDataInterventi(app.global.nick_array.data.id);
                                app.routers.rmaRouter.prototype.rma_int_fare();
                             
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
    function actionFormatter(value) {
        return [
            '<!--a class="update" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a-->',
             '<a class="management" href="javascript:" title="Gestione RMA"><i class="glyphicon glyphicon-cog"></i></a>&emsp;&emsp;'
           
        ].join('');
    }
    function cellStyle(value, row, index) {
        
        return {css: 
               //{"background-color": row.name_cell_color}
               {"background-color":  row.stato_color}
           };
   
    
    
    
    }   
       window.actionEvents = {
            'click .management': function (e, value, row,index) {
                app.global.nick_array.id=row.id;
            	console.log(row.id_person+"index"+index)  ;  	
                 
                var	$arrByID=row;
            	   
            	    app.global.nick_array.data=row;
            	   
            	
              
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active" href="#it/rma_management" >'+row.num_prog+ " del "+row.data_richiesta+'</li>'
                   //    breadcrumb: '<li><a class="breadcrumb-item active" href="#it/rma_management" >'+row.num_prog+ " del "+row.data_richiesta+'</a></li>'
        
                });

                	app.global.rma_viewView.destroy_view();  
                 
             
             
              app.routers.rmaRouter.prototype.rma_management({});
               
            },
            'click .remove': function (e, value, row,index) {
        console.log("id="+row.id);
                 if (confirm('Sei sicuro di voler eliminare questo User?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "user";
                    jsonObj.id=row.id;
                    jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL__,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                         success: function (datap) {
                           
                           showAlert('Delete item successful!'+datap, 'success');
                             $table.bootstrapTable('refresh',  callList());

                             },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            }, //remove
            'click .descr': function (e, value, row,index) {
               
                showModal($(this).attr('title'), row);
                
            
            }
            
       
        };
       
         this.$('#reqRMA').click(function(e){
       
               console.log('req'),
               callList()
                
            
          
   
            
         }  );
     
        
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
        that.$("#invio").prop( "disabled", true );
        var file_data = this.$('#file').prop('files')[0];   
        var form_data = new FormData(this.$('#form')[0]);                  
        form_data.append('file', file_data);
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
                data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
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
                        $("#preview").html("File Upload Success!").fadeIn().fadeOut(4000,function(){
                        app.routers.router.prototype.send();
                                });
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
        }
      
        ,

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
   return app.views.rma_int_fare;
    });



