require(['app','bootbox'], function(app,bootbox){
app.views.rfa_ddt = Backbone.View.extend({
       
    
    
    initialize:function(){
    console.log("initializing rfa_ddt view");
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
                 bootbox.dialog({
                     closeButton:false,
                    title: $mydata.message,
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "OK",
                            className: "btn btn-danger",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                 app.routers.router.prototype.logout();
                            }
                        }
                    }
                });
            }});
    },

    events:{
        'submit':  'send_',
        "click-row.bs.tables": "selRow",
        'click #btnDDT': "addDdt"
       
    },
    addDdt:function (e) {
        var row=app.global.nick_array.ddt;
        var $ddt=[];
       
        
        for (var key in row) {//verifico se nell'array ci sono ddt con file (mi serve per i casi tipo cancelloni)
   
            if (row.hasOwnProperty(key)) {           
                console.log(key, row[key]);
                console.log('key='+key);
                console.log( row[key]);
                for (var key1 in row[key]) {
                    if (row[key].hasOwnProperty(key1)) {
                        console.log(key1, row[key][key1]);
                        console.log('key1='+key1);
                        console.log( row[key][key1]);
                        if((key1=='file' && row[key][key1]==='') || ( key1=='file' && row[key][key1]=== null)){
                        $ddt.push({ddt:row[key]['ddt'],index:key})}
                    }
                }
            }
        }
       
        console.log($ddt);
       
       
        var modalF="";
        var modalField='';
        var form_data = new FormData($("#ddtForm")[0]); 
        var $idOrd=form_data.get('id');
        
        var $num_prog=app.global.nick_array.ordine.num_prog;
        var $index=form_data.get('index');
        var $fornitore=app.global.nick_array.ordine.fornitore;
        var $id_tip_acquisto=app.global.nick_array.ordine.id_tip_acquisto;
        
        
        that.$('.modal-title').empty();  
        
            if(row.length>0){
            console.log($id_tip_acquisto);
            if($id_tip_acquisto==="1"){//ordini diretti tipo cancelloni
         
                if($ddt.length<1){//caso tipo Cancelloni ogni DDT ha già un documento(immagine o pdf) associato
                    that.$('.modal-title').text("Add documento all DDT  del fornitore " + $fornitore); 
                    modalField=
                        '<div class="panel panel-default">'+
                            '<div class="panel-body">'+

                                '<label  >Non ci sono DDT da aggiornare</label></div></div>';
                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalField);
                    that.$(".modal-footer").empty(); 
                }else{
                    that.$('.modal-title').text("Add documento all DDT  del fornitore " + $fornitore); 
                    modalField=
                        '<div class="panel panel-default">'+
                            '<div class="panel-body">'+
                                '<label for="selDDT">Seleziona il DDT *</label>'+
                                '<select  id="selDDT" name="selDDT"  class="form-control" ></select><br></div></div>';

                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalField);
                    that.$(".modal-footer").empty(); 

                    that.$("#selDDT").append('<option value=""></option>');
                    $.each($ddt, function(i, value) {
                        that.$("#selDDT").append('<option value="'+$ddt[i]["index"]+'">'+$ddt[i]["ddt"]+'</option>');
                    });

                    that.$("#selDDT").change(function (e) {
                        console.log(e.target.value);
                       
                        modal1body(e.target.value);
                    });
                }
           
           
                    function modal1body($value){
                     $data=moment(row[$value].data, "DD-MM-YYYY").format('DD/MM/YYYY');
                     
                     that.$('.modal-title').text("Add documento all DDT N° " + row[$value].ddt + " del fornitore " + $fornitore); 
                     modalField=
                             '<div class="panel panel-default">'+
                                 '<div class="panel-body">'+
                                     '<input type="hidden"  name="direct" id="direct" value="true">'+
                                 '<div  class="row">'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblddt"  for="ddt">N° DDT</label>'+
                                     '<input type="text" class="form-control" name="ddt" id="ddt" value="'+row[$value].ddt+'" readonly >'+
                                 '</div>'+
                                  '<div class="form-group col-lg-6">'+
                                     '<label  id="lbldata  for="data">Data DDT</label>'+

                                     '<input type="text" class="form-control" name="dataDdt" id="dataDdt"  value="'+$data+'" readonly>'+


                                 '</div>'+
                                  '<div class="form-group col-lg-12">'+
                                     '<label  id="lblNota"  for="nota">Nota</label>'+
                                     '<input type="text" class="form-control" name="nota" id="nota" " placeholder="" >'+
                                 '</div>'+
                             '</div>';
                     body2Modal()
                 }
                }else{ 
                    modal3body();//ci sono ddt e siamo nel caso differente da cancelloni ed è possibile add altri ddt al solito ordine
                }
          }else{//non ci sono ddt e siamo nel caso differente da cancelloni ed è possibile add  ddt all ordine
           modal3body();
       }
       function modal3body(){
            that.$('.modal-title').text("Add DDT all'ordine N° " + $num_prog + " per " + $fornitore);  
            modalField=
                     '<div class="panel panel-default">'+
                        '<div class="panel-body">'+
                    '<input type="hidden"  name="direct" id="direct" value="false">'+
                    '<div  class="row">'+
                        '<div class="form-group col-lg-3">'+
                            '<label  id="lblddt"  for="ddt">N° DDT</label>'+
                            '<input type="text" class="form-control" name="ddt" id="ddt" " placeholder="" >'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lbldata  for="data">Data DDT</label>'+
                            '<div class="input-group date " id="datetimepicker">'+
                                '<input type="text" class="form-control" name="dataDdt" id="dataDdt"  readonly>'+
                                '<span class="input-group-addon">' + 
                                    '<span class="glyphicon glyphicon-calendar"></span>' +
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-9">'+
                            '<label  id="lblNota"  for="nota">Nota</label>'+
                            '<input type="text" class="form-control" name="nota" id="nota" " placeholder="" >'+
                        '</div>'+
                    '</div>';
            body2Modal();
        }
        function body2Modal(){
                //accept="application/vnd.oasis.opendocument.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/zip,image/*,video/*,application/vnd.ms-powerpoint"> 
        modalF='<form id="modDDT" >'+ modalField +
                    '<div  class="row">'+
                        '<div class="form-group col-lg-12">'+
                            '<label for="allegato">Seleziona file</label>'+
                            '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="image/*,application/pdf">'+
                        '</div>'+
                    '</div>'+ 
                '</div><!-- /.panel-body -->'+
            '</div><!-- /.panel panel-default -->'+
            '<div class="panel panel-default">'+
                '<div class="panel-body">'+
                    '<div class="row">'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                    '<input type="radio" aria-label="..." value="1" name="statoDdt" id="statoDdt">'+
                                '</span>'+
                                '<label class="form-control" aria-label="..." >DDT corretto</label>'+
                            '</div>'+ 
                        '</div><!-- /col-lg-6 -->'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                        '<input type="radio"  value="0" name="statoDdt" id="statoDdt">'+
                                '</span>'+
                                '<label class="form-control" aria-label="..." >DDT merce mancante o non conforme</label>'+
                            '</div>'+ 
                        '</div><!-- /col-lg-6 -->'+
                    '</div><!-- /.row -->'+
                    '<div class="row" id="notaC">'+
                        '<div class="form-group col-lg-12">'+
                            '<label  id="lblNotaC"  for="notaconsegna">Nota alla consegna</label>'+
                            '<input type="text" class="form-control" name="notaconsegna" id="notaconsegna" >'+
                        '</div>'+
                    '</div>'+    
                '</div><!-- /.panel-body -->'+
            '</div><!-- /.panel panel-default -->'+
            '<div class="panel panel-default">'+
                '<div class="panel-body">'+
                        '<div class="row">'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                        '<input type="radio"  name="ordine_completo" id="ordine_completo" value=0>'+
                                '</span>'+
                                '<label class="form-control" aria-label="..." >Ordine parziale</label>'+
                            '</div>'+ 
                        '</div>'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                        '<input type="radio"  name="ordine_completo" id="ordine_completo" value=1>'+
                                '</span>'+
                                '<label class="form-control" aria-label="..." >Ordine completo</label>'+
                            '</div>'+ 
                        '</div>'+
                    '</div>'+         
                '</div><!-- /.panel-body -->'+
            '</div><!-- /.panel panel-default -->'+ 
        '</div>'+   
        '<div class="row">'+
            '<div class="form-group col-lg-12">'+
                '<button type="button" id="btnAddDDT" name="btnAddDDT" class="btn btn-primary submit ">Add DDT</button>'+
            '</div>'+ 
        '</div>'+ 
    '</form >';
                that.$(".modal-body").empty();   
        that.$(".modal-body").append( modalF);
        that.$(".modal-footer").empty(); 
         $('#notaC').hide();
        
        
        
        that.$('input[name=statoDdt]').change(function(){
           
            $('#notaconsegna').val("");
           
            if($('input[name=statoDdt][value=1]').is(":checked")){
                console.log("val=1");//corretto
                 $('#notaC').hide();
            }
            
             if($('input[name=statoDdt][value=0]').is(":checked")){
           
                console.log("val=0");
                 $('#notaC').show();
            }
           
        });
        
        
        that.$('#btnAddDDT').click(function(e) {//add dalle modali
            if(that.$("#modDDT").valid()){

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'rfa/ordini/';
                $selServizioX=that.$("#servizio");
        
                var form_data = new FormData($("#modDDT")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'ddt');
                form_data.append('servizio',$selServizioX.val());
                form_data.append('fornitore',app.global.nick_array.ordine.id_fornitore);
               
                 
                form_data.append('ordine', $idOrd);

                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    //"Content-Type": "application/json"
                };
                console.log(app.global.nick_array);
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,

                        //data :  jsonObj,
                        //dataType : 'text',
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                        success: function (datap) {
                            console.log(datap);
                            $mydata =JSON.parse(datap);

                            //-------------------------------------------------------
                            if ($mydata.success){
                                 console.log("ok");
                                var jsonObj = {};
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj.type ="ddt";
                                jsonObj.action ="list";
                                jsonObj.ordine =$idOrd;
                                jsonObj.servizio =that.$("#servizio").val();
   
                                jsonObj = JSON.stringify(jsonObj);
                                var getDdt =  that.fetchData(jsonObj, app.global.json_url + 'rfa/ordini/',that.headerJson());
                            
                                getDdt.done(function(data) {   
                                     $mydata =JSON.parse(data);
                                      var $tableOrd=that.$('#table');
                                     $tableOrd.bootstrapTable('updateCell', {index: $index, field: 'ddt', value: $mydata.data.length});
                                     $tableOrd.bootstrapTable('toggleDetailView', $index)
                                    var $table=that.$("#tableDdt"); 
                                     $table.bootstrapTable('destroy');
                                     console.log($mydata.data)
                                    $.each( $mydata.data, function( key, value1 ){

                                          if(typeof(value1["stato_ddt"]) == "0" ){   
                                                  value1["stato_ddt"]='<strong>Merce mancante</strong><i class="fas fa-times"></i>';

                                          } 
                                    });    
                                    $table.bootstrapTable({
                                    data:  ($mydata.data),
                                    columns: $mydata.tab,
                                    showColumns:false,
                                    showRefresh:false,
                                    search:false
                                });
                            });
                        }else{
                    
                            bootbox.dialog({
                          closeButton:false,
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "Ok",
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                  //   app.routers.router.prototype.logout();
                                }
                            }
                        }
                    });
                }
                            }
                        });

                        
                    that.$("#modal").modal('hide'); 
                }else{
                console.log("btnAlle invalid");  
            }


            });  
            
             that.$("#modDDT").validate(); //sets up the validator
          $("input[name=\"statoDdt\"]").rules( "add", {
       
                    required:true,
                     messages: {

                required: "Selezionare validità DDT"
               
            }
                   
                   
                });
                
         $("input[name=\"notaconsegna\"]").rules( "add", {
       
                    required:true,
                     messages: {

                required: "Inserire nota"
               
            } 
        });
        
        $("input[name=\"dataDdt\"]").rules( "add", {

            required: true,
           
            //number: true,
            // minlength: 2,

            messages: {

                required: "Ineserire la data del DDT",
                datetime: "Inserire una data valida!",
                // number:"Inserire un numero!"
            }
        });      
          
        $("input[name=\"ddt\"]").rules( "add", {

            required: true,
            //number: true,
            // minlength: 2,

            messages: {

                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        $("input[name=\"allegato\"]").rules( "add", {
            required: true,
            //number: true,
            // minlength: 2,

            messages: {
                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        $("input[name=\"ordine_completo\"]").rules( "add", {
            required: true,
            messages: {
                required: "Scegliere lo stato dell'ordine se parziale o completo."
            }
        });
  
        }
              
        this.$('#datetimepicker').datetimepicker({ 
          format: "dd/mm/yyyy",
          autoclose: true,
          startView: 2,
          minView: 2,
          startDate: "2020-01-01",
          //endDate:"2019/01/15",
          language: "it"
        }).show();
       
        that.$("#modal").modal('show');   
        
        
     //------------------------------------------------------------------------------   
    /*     
        if(row.id_ddt!=''){//ordini diretti
            console.log(row.id);
            that.$('.modal-title').text("Add immagine all DDT N° " + row.ddt + " del fornitore " + $fornitore); 
            modalField=
                '<div class="panel panel-default">'+
                    '<div class="panel-body">'+
                        '<input type="hidden"  name="direct" id="direct" value="true">'+
                        '<div  class="row">'+
                            '<div class="form-group col-lg-3">'+
                                '<label  id="lblddt"  for="ddt">N° DDT</label>'+
                                '<input type="text" class="form-control" name="ddt" id="ddt" value="'+ row.ddt +'" readonly >'+
                            '</div>'+

                             '<div class="form-group col-lg-9">'+
                                '<label  id="lblNota"  for="nota">Nota</label>'+
                                '<input type="text" class="form-control" name="nota" id="nota" " placeholder="" >'+
                            '</div>'+
                        '</div>';
       
        }else{
            that.$('.modal-title').text("Add DDT all'ordine N° " + $num_prog + " per " + $fornitore);  
            modalField=
            '<div class="panel panel-default">'+
                '<div class="panel-body">'+
                    '<input type="hidden"  name="direct" id="direct" value="false">'+
                    '<div  class="row">'+
                        '<div class="form-group col-lg-3">'+
                            '<label  id="lblddt"  for="ddt">N° DDT</label>'+
                            '<input type="text" class="form-control" name="ddt" id="ddt" " placeholder="" >'+
                        '</div>'+
                         '<div class="form-group col-lg-6">'+
                            '<label  id="lbldata  for="data">Data DDT</label>'+
                            '<div class="input-group date " id="datetimepicker">'+
                                '<input type="text" class="form-control" name="dataDdt" id="dataDdt"  readonly>'+
                                '<span class="input-group-addon">' + 
                                    '<span class="glyphicon glyphicon-calendar"></span>' +
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-9">'+
                            '<label  id="lblNota"  for="nota">Nota</label>'+
                            '<input type="text" class="form-control" name="nota" id="nota" " placeholder="" >'+
                        '</div>'+
                    '</div>';
       }
        modalF='<form id="modDDT" >'+ modalField +
                    

                    '<div  class="row">'+



                        '<div class="form-group col-lg-12">'+
                            '<label for="allegato">Seleziona file</label>'+
                            '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="image/*,application/pdf">'+

                        '</div>'+
                        '</div><!-- /.panel-body -->'+
                    '</div><!-- /.panel panel-default -->'+

                    '</div>'+ 
                    '<div class="panel panel-default">'+
                        '<div class="panel-body">'+
                            '<div class="row">'+
                                '<div class="col-lg-6">'+
                                    '<div class="input-group">'+
                                       
                                        '<span class="input-group-addon">'+
                                            '<input type="radio" aria-label="..." value="1" name="statoDdt" id="statoDdt">'+
                                        '</span>'+
                                        '<label class="form-control" aria-label="..." >DDT corretto</label>'+
                                    '</div>'+ 
                                '</div><!-- /col-lg-6 -->'+
                                '<div class="col-lg-6">'+
                                    '<div class="input-group">'+
                                       
                                       
                                        '<span class="input-group-addon">'+
                                            '<input type="radio"  value="0" name="statoDdt" id="statoDdt">'+
                                        '</span>'+
                                         '<label class="form-control" aria-label="..." >DDT merce mancante</label>'+
                                    '</div>'+ 
                                  
                                   
                                '</div><!-- /col-lg-6 -->'+
                            '</div><!-- /.row -->'+
                            '<div class="row" id="notaC">'+
                                '<div class="form-group col-lg-12">'+
                                    '<label  id="lblNotaC"  for="notaconsegna">Nota alla consegna</label>'+
                                    '<input type="text" class="form-control" name="notaconsegna" id="notaconsegna" >'+
                                '</div>'+
                            '</div>'+    
                       '</div><!-- /.panel-body -->'+
                    '</div><!-- /.panel panel-default -->'+
                    '<div class="row">'+
                        '<div class="form-group col-lg-12">'+
                           '<button type="button" id="btnAddDDT" name="btnAddDDT" class="btn btn-primary submit ">Add DDT</button>'+
                        '</div>'+ 
                    '</div>'+ 
                '</form >';
  
              
        that.$(".modal-body").empty();   
        that.$(".modal-body").append( modalF);
        this.$('#datetimepicker').datetimepicker({ 
          format: "dd/mm/yyyy",
          autoclose: true,
          startView: 2,
          minView: 2,
          startDate: "2020-01-01",
          //endDate:"2019/01/15",
          language: "it"
        }).show();

        that.$("#modDDT").validate(); //sets up the validator
         $("input[name=\"statoDdt\"]").rules( "add", {
       
                    required:true,
                     messages: {

                required: "Selezionare validità DDT"
               
            }
                   
                   
                });
                
         $("input[name=\"notaconsegna\"]").rules( "add", {
       
                    required:true,
                     messages: {

                required: "Inserire nota"
               
            }
                   
                   
                });
         $("input[name=\"dataDdt\"]").rules( "add", {

            required: true,
           
            //number: true,
            // minlength: 2,

            messages: {

                required: "Ineserire la data del DDT",
                datetime: "Inserire una data valida!",
                // number:"Inserire un numero!"
            }
        });        
          
        $("input[name=\"ddt\"]").rules( "add", {

            required: true,
            //number: true,
            // minlength: 2,

            messages: {

                required: "Inserire il codice del DDT"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        $("input[name=\"allegato\"]").rules( "add", {
            required: true,
            //number: true,
            // minlength: 2,

            messages: {
                required: "Selezionare un documento"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        
       that.$("#modal").modal('show'); 
         $('#notaC').hide();
        
        
        
        that.$('input[name=statoDdt]').change(function(){
           
            $('#notaconsegna').val("");
           
            if($('input[name=statoDdt][value=1]').is(":checked")){
                console.log("val=1");//corretto
                 $('#notaC').hide();
            }
            
             if($('input[name=statoDdt][value=0]').is(":checked")){
           
                console.log("val=0");
                 $('#notaC').show();
            }
           
        });
        that.$('#btnAddDDT').click(function(e) {//add dalle modali
            if(that.$("#modDDT").valid()){

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'rfa/ordini/';

                //var jsonObj = sendUrbans_formToJson(that);
                $selServizioX=that.$("#servizio");
                var form_data = new FormData($("#modDDT")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'ddt');
                form_data.append('servizio', $selServizioX.val());
                form_data.append('fornitore', app.global.nick_array.ordine.id_fornitore);
                 
                form_data.append('ordine', idOrd);

                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    //"Content-Type": "application/json"
                };
                console.log(app.global.nick_array);
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,

                        //data :  jsonObj,
                        //dataType : 'text',
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                        success: function (datap) {
                            console.log(datap.data);
                            $mydata =JSON.parse(datap);

                            //-------------------------------------------------------
                            if ($mydata.success){
                                // app.routers.router.prototype.data_type_edit();
                                console.log("ok");
                                var jsonObj = {};
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj.type ="ddt";
                                jsonObj.action ="list";
                                jsonObj.ordine =idOrd;
                                jsonObj.servizio =that.$("#servizio").val();
   
                                jsonObj = JSON.stringify(jsonObj);
                                var getDdt =  that.fetchData(jsonObj, app.global.json_url + 'rfa/ordini/',that.headerJson());
                            
                             getDdt.done(function(data) {   
                                  $mydata =JSON.parse(data);
                                   var $tableOrd=that.$('#table');
                                  $tableOrd.bootstrapTable('updateCell', {index: $index, field: 'ddt', value: $mydata.data.length});
                                  $tableOrd.bootstrapTable('toggleDetailView', $index)
                                 var $table=that.$("#tableDdt"); 
                                  $table.bootstrapTable('destroy');
                                  console.log($mydata.data)
                              $.each( $mydata.data, function( key, value1 ){
          
                                    if(typeof(value1["stato_ddt"]) == "0" ){   
                                            value1["stato_ddt"]='<strong>Merce mancante</strong><i class="fas fa-times"></i>';

                                    } 
                              });    
                            $table.bootstrapTable({
                            data:  ($mydata.data),
                            columns: $mydata.tab,
                            showColumns:false,
                            showRefresh:false,
                            search:false
                        });
                       
                      
                    });
                              

                                }else{
                    
                     bootbox.dialog({
                          closeButton:false,
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "Ok",
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
                          closeButton:false,
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "Ok",
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


                    that.$("#modal").modal('hide'); 
                }else{
                console.log("btnAlle invalid");  
            }


            });  
     */
     //--------------------------------------------------------------------      
        },//addDdt
   
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            // "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        return $headers;
    },
    fetchDdt: function ( index,row,$detail) {//record selezionato nella tabella -- scelta servizio
        app.global.nick_array.ordine=row;
        console.log(index);
        console.log(row.id);
        var jsonObj = {};
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type ="ddt";
        jsonObj.action ="list";
        jsonObj.ordine =row.id;
        jsonObj.idCategoria =row.id_categoria;
        jsonObj.index =index;
        jsonObj.indexCall =1001;
        jsonObj.servizio =$("#servizio").val();
   
        jsonObj = JSON.stringify(jsonObj);
    
        var getDdt =  that.fetchData(jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson());
    
        getDdt.done(function(data) {
            $mydata =JSON.parse(data);
            $mydataX=[];
            $detail.append(
                  
                '<form class="ddtForm" id="ddtForm" name="ddtForm" >'+  
                        '<input type="hidden" class="form-control" name="id" id="id" value='+row.id+'>'+
                        '<input type="hidden" class="form-control" name="index" id="index" value='+index+'>'+
                        '<div id="ddt">'+

                            '<p class="toolbar">'+
                                '<div id="btnDdtD">'+
                                        '</div>'+
                                '<span class="alert"></span>'+
                            '</p>'+
                            '<table id="tableDdt"> </table>'+

                        '</div>'+

                '</div>')//end form
             var $table=that.$("#tableDdt"); 
                            console.log($mydata.tab);
                            $.each( $mydata.tab, function( key, value1 ){
                                if(value1["cellStyle"]=="cellStyle"){
                                   
                                    value1["cellStyle"]=cellStyle;
                                }
                                if(value1["events"]=="actionEvents"){
                                   // value1["events"]=actionEventsX;
                                }
                                
                            }); 
                             $.each( $mydata.data, function( key, value1 ){ 
                                    
                                  
                                     if(value1["file"] != null && value1["file"] != '' ){ 
                                   // $mydataX[0]=value1;
                                     $mydataX.push(value1);
                                   
                                }
                              });  
                              console.log($mydata.data);
                              app.global.nick_array.ddt=$mydata.data;
                              console.log($mydataX);
                 that.$("#btnDdtD").append($mydata.newR);// add button
              //   var modalF='<textarea class="form-control" name="descriz" id="descriz" readonly rows="3"></textarea>';
             
               var modalF=$mydata['modalF'];
       
               
                 
            $('#modal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                    if(button.data('id')=="stato"){
                    that.$(".modal-footer").empty(); 
                    that.$(".modal-body").empty();  
                    that.$(".modal-body").append(modalF);  
                
               
                    var title = button.data('title');
                    var bodyMes = button.data('descr');
                    if(button.data('image')){
                       var image = button.data('image'); 
                    }else{
                        var image = "";
                    }
                
                    //console.log(image,button.data('image'));
                    var modal = $(this);
                    modal.find('.modal-title').text( title);
                    modal.find('.modal-body textarea').val(bodyMes);
                   // modal.find('.modal-body img').attr('src', image);
                }
            });
                
                        $table.bootstrapTable('destroy');
                   
                        $table.bootstrapTable({
                           data:  ($mydataX), //data:  ($mydata.data),
                            columns: $mydata.tab,
                            showColumns:false,
                            showRefresh:false,
                            search:false
                        });
                     
            
        });
       
   
  
    },
    fetchData: function  (query, dataURL,headers){
        // Return the $.ajax promise
        return $.ajax({
            headers : headers,
            data: query,
            dataType: 'text',
            type:'post',
            url: dataURL
        });
        
    },
    fetchServizi: function  (){//servizi abilitati per questo utente
        that=this;
      var  $servizio='';
        if(this.$("#servizio").val()){
            $servizio=this.$("#servizio").val()
        }else{
            $servizio=app.global.tokensCollection.first().get("id_servizio")
        }
        var jsonObj = {};
           
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "list";
        jsonObj.type = "servizio";  
        jsonObj.servizio = $servizio;  
            
        jsonObj = JSON.stringify(jsonObj);
        
        var getServizi =  that.fetchData(
            jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson());
            
        getServizi.done(function(data) {
            $mydata =JSON.parse(data);
            //console.log(data);
            console.log($mydata.success);
            var $selServizioEx=false;//se esiste la select x conto servizi?
            var $selServizio=that.$("#servizi");//il div
            var $selServizioX="";//la select
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
                   that.fetchOrdini($selServizioX.val());
                });
               
               that.fetchOrdini($servizio);
            }
            
          
        });
        
    },//servizi abilitati per questo utente
    fetchOrdini: function  (servizio){//ordini in attesa ddt per questo servizio
        that=this; 
       
        var jsonObj = {};
           
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "list";
        jsonObj.type = "ddt-ordine";  
        jsonObj.servizio = servizio;  
            
        jsonObj = JSON.stringify(jsonObj);
        var getOrdini =  that.fetchData(
            jsonObj, app.global.json_url + 'rfa/ordini/',this.headerJson());
            
        getOrdini.done(function(data) {
            $mydata =JSON.parse(data);
             that.hrTable($mydata);
          
        });
    },//ordini in attesa ddt per questo servizio
    callList: function  (){
         that=this; 
        callAja(app.global.tokensCollection.first().get("id_servizio"));//servizio della persona che fa il login
        
        function callAja($servizio)  {
            var jsonObj = {};
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "ddt-ordine";  
            jsonObj.servizio = $servizio;  
            
            jsonObj = JSON.stringify(jsonObj);
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
          
         
        $.ajax({
            url:app.global.json_url + 'rfa/ordini/',
            type:'post',
            headers : that.headerJson(),
            data :  jsonObj,
            dataType : 'text',
            success: function (datap) {
                $mydata =JSON.parse(datap);
                // $mydata =(datap);
                
                console.log( ($mydata));
                //-------------------------------------------------------
                if ($mydata.success){
                    var $selTipo=that.$("#tipo");
                    var $selServizioEx=false;//se esiste la select x conto servizi?
                    var $selServizio=that.$("#servizi");//il div
                    var $selServizioX="";//la select
                    $selTipo.empty();
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
                                that.$("#prodotti").empty();
                                $selTipo.val(0);
                            });
                        }

                        $selTipo.append('<option value="0"></option>');
                        $.each($aa, function(i, value) {
                            $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                        });
                    that.hrTable($mydata);
                    
                     $selServizioX.change(function (e,value,row) {
                        callAja($selServizioX.val());
                     });
                }else{
                    
                     bootbox.dialog({
                          closeButton:false,
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "Ok",
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
                          closeButton:false,
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "Ok",
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
        }

    
    },
    hrTable: function  (my){
        var $table=this.$('#table');
        console.log(my);
        var columns = [];
        $table.bootstrapTable('destroy');
         that=this;   
                      
        $.each( my.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){
                console.log(value1["cellStyle"]);
                value1["cellStyle"]=that.cellStyle;
                 console.log(value1["cellStyle"]);
            }
             if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
            }
          
        });   
        $.each( my.data, function( key, value1 ){
          
            if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){   
               value1["dateT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDD')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
               value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
               
            }
            if(typeof(value1["data_carico"]) !== "undefined" && value1["data_carico"] !== null && value1["data_carico"] !== '1001-01-01 00:00:00'){    
                value1["data_caricoH"]=moment(value1["data_carico"]).format('DD/MM/YYYY H:mm:ss');
                value1["data_carico"]=moment(value1["data_carico"]).format('DD/MM/YYYY');
             
               
            }
            
            if(typeof(value1["data_approva"]) !== "undefined" && value1["data_approva"] !== null && value1["data_approva"] !== '1001-01-01 00:00:00'){    
                value1["data_approvaH"]=moment(value1["data_approva"]).format('DD/MM/YYYY H:mm:ss');
                value1["data_approva"]=moment(value1["data_approva"]).format('DD/MM/YYYY');
             
               
            }
            if(typeof(value1["data_invio"]) !== "undefined" && value1["data_invio"] !== null && value1["data_invio"] !== '1001-01-01 00:00:00'){    
                value1["data_invioH"]=moment(value1["data_invio"]).format('DD/MM/YYYY H:mm:ss');
                value1["data_invio"]=moment(value1["data_invio"]).format('DD/MM/YYYY');
             
               
            }
            
             if(typeof(value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null && value1["data_assegnazione"] !== '1001-01-01 00:00:00'){    
              
               value1["data_assegnazione"]=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
               
            }
           
              if(typeof(value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){    
               value1["data_prevista"]=moment(value1["data_prevista"]).format('DD/MM/YYYY');
               
            }
             if(typeof(value1["data_intervento"]) !== "undefined" && value1["data_intervento"] !== null){ 
           
               value1["data_intervento"]=moment(value1["data_intervento"]).format('DD/MM/YYYY');
               
            }
          
              if(typeof(value1["data_chiusura"]) !== "undefined" && value1["data_chiusura"] !== null && value1["data_chiusura"] !== '1001-01-01 00:00:00'){       
           
                 value1["data_chiusuraH"]=moment(value1["data_chiusura"]).format('DD/MM/YYYY H:mm:ss');
               value1["data_chiusura"]=moment(value1["data_chiusura"]).format('DD/MM/YYYY');
               
            }

        });   
 
        
        $table.bootstrapTable({
          
            columns: my.tab,
            //columns:columns,
            data: my.data,
            detailView:true,
            onExpandRow: function (index, row, $detail) {
               
                console.log(row);
               console.log($detail);
                $table.find('.detail-view').each(function () {
                    if (!$(this).is($detail.parent())) {
                        $(this).prev().find('.detail-icon').click()
                    }
                })
                //$detail.html(row.timestamp);
              that.fetchDdt( index,row,$detail);
              
               
                     
                   
            $('#modal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                var title = "Add DDT all'ordine N° "+row.num_prog+" per "+row.fornitore;
                var bodyMes = button.data('descr');
                if(button.data('image')){
                   var image = button.data('image'); 
                }else{
                    var image = "";
                }
                
                //console.log(image,button.data('image'));
                var modal = $(this);
               // modal.find('.modal-title').text( title);
                modal.find('.modal-body textarea').val(bodyMes);
               // modal.find('.modal-body img').attr('src', image);
            })
                
                
            function showModal(title, row) {
      
            
                $modal.data('id_person', row.id_person);
            
       $modal.find('.modal-title').text(title);
       for (var name in row) {
            
                $modal.find('input[name="' + name + '"]').val(row[name]); 
            }
         
        $modal.modal('show');
    }    
              
            },
            showColumns:true,
            showRefresh:true,
            search:true,
            searchText:app.global.nick_array.arrSearchText,
            pagination:false
           
           
        });
        
            console.log(my.data);
            
             
               
       
            
        },
    cellStyle: function(value, row, index) {
        
        return {css: 
               //{"background-color": row.name_cell_color}
               {"background-color":  row.stato_color}
           };
    },      
   
    render:function(){
        $(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rfa/';
        var $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }

        var that = this;
        
        this.fetchServizi();
        
       
       
       that=this;
       
        
          window.actionEvents = {
            'click .viewDoc': function ($element, value, row,index) {
                $selServizioX=that.$("#servizio");
                console.log(row);
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="ddt";
                jsonObj.action ="download";
                jsonObj.subType =row.id_categoria;
                jsonObj.ddt =row.id_ddt;
                jsonObj.servizio = $selServizioX.val();
               jsonObj = JSON.stringify(jsonObj);
                $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };

               $.ajax({
                   url: $uurl,
                   type:'post',
                   headers : $headers,
                   dataType : 'text',
                   data:jsonObj,

                   success: function (json) {
                                   $mydata =JSON.parse(json);    
                      $filex=$mydata.file;
                      // console.log(id+"=id file="+$filex);
                      // console.log(" filex="+$filex);
                     // window.location=$filex;
                       window.open($filex,'_blank');
                          

                   }

               });
            },  
            'click .uploadDoc': function ($element, value, row,index) {
                console.log(row);
                 that.addDdt(row);
            },
            'click .downloadDoc': function ($element, value, row,index) {
                $selServizioX=that.$("#servizio");
                console.log(row);
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="ddt";
                jsonObj.action ="download";
                jsonObj.subType =row.id_categoria;
                jsonObj.ddt =row.id_ddt;
                jsonObj.servizio = $selServizioX.val();
               
               jsonObj = JSON.stringify(jsonObj);
                $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };

               $.ajax({
                   url: $uurl,
                   type:'post',
                   headers : $headers,
                   dataType : 'text',
                   data:jsonObj,

                   success: function (json) {
                                   $mydata =JSON.parse(json);    
                      
                       var link = document.createElement("a");
                        link.download = $mydata.name;
                        // Construct the uri

                        link.href = $mydata.file;
                        document.body.appendChild(link);
                        link.click();
                        // Cleanup the DOM
                   
                          

                   }

               });
            },  
            
            'click .downloadOrdine': function ($element, value, row,index) {
                that=this;
                console.log(row);
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="pdf";
                jsonObj.action ="download";
                jsonObj.ordine =row.id;
               

               jsonObj.file =row.num_prog+'.pdf';
               jsonObj = JSON.stringify(jsonObj);
                $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };

               $.ajax({
                   url: $uurl,
                   type:'post',
                   headers : $headers,
                   dataType : 'text',
                   data:jsonObj,

                   success: function (json) {
                                   $mydata =JSON.parse(json);    
                      $filex=$mydata.file;
                      // console.log(id+"=id file="+$filex);
                      // console.log(" filex="+$filex);
                     // window.location=$filex;
                       window.open($filex,'_blank');

                   }

               });
            },  
            'click .removeDoc': function (e, value, row,index) {
                
                console.log("id="+row.id);
                if (confirm('Sei sicuro di voler eliminare questo DDT?')) {
                    jsonObj = {};
                    jsonObj.action = "del";
                    jsonObj.type = "ddt";
                    jsonObj.id=row.id_ddt;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:app.global.json_url + 'rfa/ordini/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (json) {
                            $mydata =JSON.parse(json); 
                            var form_data = new FormData($("#ddtForm")[0]); 
                            var $index=form_data.get('index');
                            var $tableOrd=that.$('#table');
                                $tableOrd.bootstrapTable('updateCell', {index: $index, field: 'ddt', value: $mydata.data.length});
                                $tableOrd.bootstrapTable('toggleDetailView', $index)
                          
                            // showAlert('Delete item successful!'+datap, 'success');
                            var $table=that.$("#tableDdt");
                            //  $table.bootstrapTable({ data: $mydata.data });
                            
                            //$table.bootstrapTable('load', $mydata.data);
                            
                            that.fetchDdt(index,app.global.nick_array.ordine,e);
                            },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            }, //remove
            'click .descr': function (e, value, row,index) {
               
                showModal($(this).attr('title'), row);
                
            
            },
            'click .search.form-control': function (e, value, row,index) {
                 console.log("search!="+value);
            }
       
        };
        
        
    	
        
        
        
        
        var $selTipo=this.$("#tipo");
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
        jsonObj.action = "list";
        jsonObj.type = "ddt-ordine";     
        jsonObj = JSON.stringify(jsonObj);
        
        this.$('#id_person').prop( "value", $person );
        
          
        var that=this;
    	
        //-------------------------------ordini inviati in attesa ddt------------------------------------------
           /*
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        $selTipo.empty();
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
                                that.$("#prodotti").empty();
                                $selTipo.val(0);
                            });
                        }

                        $selTipo.append('<option value="0"></option>');
                        $.each($aa, function(i, value) {
                            $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                        });
                        
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
                
            });*/
//--------------------------------------------------------------------------------------------------------------------------------
       
        
    
        //-------------------------------fornitori-------------------------------
           
        function  fornitori(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.tipologia = $("#tipo").val();
            jsonObj.action = "modulo";
            jsonObj.type = "fornitori";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:uurl+"ordini/",
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$("#selFornitori").empty();
                    $aa=$mydata.data;
                    that.$("#selFornitori").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selFornitori").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                    
                    that.$("#selFornitori").change(function (e,value,row) {
                        
                          
                        $orario=_.filter($aa, function(orario){ return orario.id ==e.currentTarget.value; });
                        console.log($orario);
                        that.$("#orario").empty();
                        that.$("#orario").append('Orario consegna: '+$orario[0].orario)+"<br>/";
                        that.$("#prodotti").empty()
                        prodotti()
                        
                    });
               
                }
            });
        }    
        //--------------------------prodotti-----------------------------------------------------
        function  prodotti(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.fornitore = that.$("#selFornitori").val();
            jsonObj.action = "modulo";
            jsonObj.type = "prodotti";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    /* varForm=varForm='<label for="selCategoria">Seleziona la Categoria</label>'+
                    '<select  id="selCategoria" name="selCategoria"  class="form-control" ></select><br>'+*/
                    varForm=varForm=
                            '<label >Seleziona le quantità dei Prodotti da ordinare:</label>'+ 
                            '<div class="row">'+
                                '<p class="toolbar">'+
                                
                                '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table" class="table table-striped"> </table>'+
                            '</div>';
                    that.$("#prodotti").append(varForm);
                    /*that.$("#selCategoria").empty();
                    $aa=$mydata.data;
                    that.$("#selCategoria").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selCategoria").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });*/
                    $table=that.$("#table");
                    /*
                    that.$("#selCategoria").change(function (e,value,row) {
                        console.log("cat");
                       proTable($mydata);
                        
                    });*/
                   
                    proTable($mydata);
                    console.log("prodTab");
                }
            });
        }
        //----------------------------------------------------
function  proTable(my){
        console.log(my);
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
            if(value1["formatter"]=="actionFormatter1"){
                value1["formatter"]=actionFormatter1;
            }
        }); 
        var arr = [];
        $.each( my.data, function( key, value1 ){
           console.log(key,value1)
            value1.quantita=""
          
        
        }); 
         console.log( arr)

        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
           
           
           
        });
      
        that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
       
       
        that.$('#quantita').on('change',function ( field, row, cvalue, old,Value, $el,x) {
             console.log(cvalue.quantita)
            
            if(cvalue.quantita !='0' || cvalue.quantita !=''){
                console.log(cvalue.quantita+'ok')
           
                that.$('#invio').prop( "disabled", false);
            }else{
                console.log(cvalue.quantita+'ko')
                that.$('#invio').prop( "disabled", true );
            }
           
        
        });
        that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
            var $els1=that.$('#table').bootstrapTable('getData')
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
           
           

           
        });

    }
    
     function actionFormatter(value, row, index) {
         
    }
      function actionFormatter1(value, row, index) {
        
    }
    function actionEvents() {
      
    }
 
     function cellStyle1(value, row, index, field) {
    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+field
                         };
                  
                }  

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
          console.log(this.$("#tipo").val());
          console.log(this.$("#fornitore").val())
     
        if(this.$("#tipo").val()==10){
           
            $prodotti=[];
            var element={};
            
            jsonObj.fornitore=this.$("#fornitore").val();
            element.prodotto=this.$("#prodotto").val();
            element.codice=this.$("#codice").val();
            element.quantita=this.$("#quantita").val();
            $prodotti.push(element);
            Object.assign( jsonObj, {prodotti:$prodotti})
            
            console.log(jsonObj);
        }else{
            $prodotti=_.filter(this.$('#table').bootstrapTable('getData'), function(num){ return num.quantita !=""; });
           jsonObj.prodotti =$prodotti;
           jsonObj.fornitore =$("#selFornitori").val();
        }
        
        if(this.$selServizioEx){
            jsonObj.servizio = $("#servizio").val();
        }else{
            jsonObj.servizio = $("#servizio").val();
        }
        jsonObj.dataTemp = $('#dataTemp').val();
        jsonObj.temp =this.$("input[name=temp]:checked").val();
       
        s=this.$('#tipo option:selected').text();
        jsonObj.categoriaC = s;
        jsonObj.categoria = this.$('#tipo option:selected').val();
        jsonObj.action = "add";
        jsonObj.type = "ordine";
       
        
        jsonObj.note = this.$('#note').val();
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        
        $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
         $.ajax({
                url:app.global.json_url+'rfa/ordini/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
        
                success: function(data){
                    console.log("success");
                                       
                        bootbox.alert({ 
                            title: that.language.header_rfa_new_message,
                            message: "Richiesta Fabbisogno Approvvigionamento inviata correttamente",
                            
                            callback: function() {
                                app.routers.rfaRouter.prototype.rfa_new();
                            }
                        });
                       
                   
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });
        }
      
        ,
    
  

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
return app.views.rfa_ddt;
    });


