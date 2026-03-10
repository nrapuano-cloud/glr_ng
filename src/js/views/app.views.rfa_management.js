require(['app','bootbox'], function(app,bootbox){
app.views.rfa_management = Backbone.View.extend({
       
    initialize:function(){
        console.log("initializing rfa_management")
        console.log(app.global.nick_array)
    },

    events:{
        'submit_': 'assegna_intervento_',
        'save': 'editSave',
        'click .contr-Plus': 'addProduct',//btn add product che apre e prepara la modale
        'click #btnAlle': 'saveProduct',//btn add product nella modale
        'click #sospeso': 'sospeso',
        'click #approva': 'approva',
        'click #ordine': 'ordine',
        'click #amagazzino': 'amagazzino',
        'click #btnEdit': 'saveProductDFF',//categoria 10
        'click #btnDDT': "addDdt",
        'click #chiudi': "chiudiOrdine",
        'click #closeKO': "respingiOrdine",
        "click-row.bs.table #tableDDT":"modalDDT",
        "click #btnNotaUA":"notaUA",
        "click #downExcel":"downExcel",
        'click #btnPreventivo': "modPreventivo",
        'click #btnPreventivoView': "preventivoView", 
        'click #btnPreventivoDel': "preventivoDel",
        
    }, 
    modPreventivo: function(){
        console.log('addPreventivo',app.global.nick_array);
        var row=app.global.nick_array.preventivo;
        that=this;
        that.$('.modal-title').empty();    
        that.$('.modal-title').append('Aggiungi Preventivo');
        var modalField=
            '<div class="panel panel-default">'+
                '<div class="panel-body">'+
                    '<form id="preventivForm" name="preventivForm" >'+
                        '<div  class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label for="allegato">Seleziona file</label>'+
                                '<input type="file" name="prev" class="form-input col-lg-12" id="prev" accept="image/*,application/pdf">'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-lg-12">'+
                            '<button type="button" id="btnAddPreventivo" name="btnAddPreventivo" class="btn btn-primary submit ">Add Preventivo</button>'+
                        '</div>'+  
                    '</form>'+
                    '</div>'+   
                '</div>';
        that.$(".modal-body").empty();   
        that.$(".modal-body").append(modalField);
        that.$(".modal-footer").empty(); 
           that.$("#modal").modal('show');  
        that.$("#preventivForm").validate(); //sets up the validator 
    
       that.$("input[name=\"prev\"]").rules( "add", {
                required:true,
                messages: {
                    required: "Selezionare un Preventivo!"
                }
            })
        that.$('#btnAddPreventivo').click(function(e) {//add dalle modali
            console.log(e);
            if($("#preventivForm").valid()){
                
                var API_URL = app.global.json_url + 'rfa/ordini/';

                var form_data = new FormData(that.$("#preventivForm")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('rfa_id', app.global.nick_array.arr.id);
                form_data.append('servizio', app.global.nick_array.arr.id_servizio);
                form_data.append('type', 'preventivo');
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
                            $('#preventivo').val( $mydata.preventivo.file); 
                            $('#btnPreventivoView').attr('disabled',false);
                            $('#btnPreventivoDel').attr('disabled',false);
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
      
             
    },
    preventivoView: function(){
        that=this;
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "download";
        jsonObj.type = "preventivo";
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
             $mydata =JSON.parse(data);
             $filex=$mydata.file;
            window.open($filex,'_blank');
             //window.location=$filex;
             
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
    },
    preventivoDel: function(){
        that=this;
        var $alert= $('.alert').hide();
         if (confirm('Rimuovere questo Documento?')) {
                           
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "del";
        jsonObj.type = "preventivo";
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
               if ($mydata.success){
                    $('#preventivo').val( 'No file preventivo'); 
            $('#btnPreventivoView').attr('disabled',true);
            $('#btnPreventivoDel').attr('disabled',true);
                }
             
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
    }
    },
    addPreventivo: function(){
        console.log('addPreventivo',app.global.nick_array);
        var row=app.global.nick_array.preventivo;
         that=this;
       
        var form_data = new FormData($("#preventivoForm")[0]); 
        console.log(form_data);
            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
            form_data.append('action', 'add');
            form_data.append('type', 'preventivo');
            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
        
        
        $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"), 
            //"Content-Type": "application/json"
        };
       $.ajax({
            url:app.global.json_url+'rfa/ordini/',
            type:'post',
            headers : $headers,
            data: form_data,
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false, 

            success: function(data){
             $mydata =JSON.parse(data);
            
             
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
    },
    downExcel: function(row){
        console.log('downExcel',row);
      
        that=this;
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "download";
        jsonObj.type = "excel";
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
             $mydata =JSON.parse(data);
             $filex=$mydata.file;
             window.location=$filex;
             
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
    },
    notaUA: function(e,row){
         var $alert= $('.alert').hide();
        console.log(e)
     // alert(e);  
      var API_URL = app.global.json_url + 'doc/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#modcomunicazione")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'update');
                form_data.append('type', 'ddt');
                form_data.append('idDDT', app.global.nick_array.ddtx.id_ddt);
                form_data.append('ddt', app.global.nick_array.ddtx.ddt);
                form_data.append('dataDDT', app.global.nick_array.ddtx.data);
                form_data.append('subType', 'notaUA');
                form_data.append('servizio', app.global.nick_array.arr.id_servizio);
                form_data.append('fornitore', app.global.nick_array.arr.fornitore);
                form_data.append('nota', app.global.nick_array.ddtx.nota);
               
               
                
              
                
                var $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    //"Content-Type": "application/json"
                };
                console.log(app.global.nick_array);
                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,

                    //data :  jsonObj,
                    //dataType : 'text',
                    data: form_data,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData:false,        // To send DOMDocument or non processed data file it is set to false       
                    success: function (datap) {
                         $mydata =JSON.parse(datap);
                        that.$("#modal").modal('hide');
                        $alert.attr('class', 'alert alert-success')
                          .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                           setTimeout(function () {
                           $alert.hide();
                        }, 3000);
               
                         that.loadDataDDT(app.global.nick_array.arr.id);
                    }
                });
    },
    modalDDT: function(e,row){
       app.global.nick_array.ddtx=row;//mi serve per recuperare i dati
     console.log(row);
    },
    respingiOrdine:function  (e,field, row, rowIndex, oldValue, $el){
        //in questa fase si può chiudere l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
        that=this;
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "update";
        jsonObj.subAction = "respingi";
         jsonObj.descrizione =  that.$('#descr_chiusura').val();
        jsonObj.type = "ordine";
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
             $mydata =JSON.parse(data);
              //   that.$("#approvaDiv").empty();
              //  that.$("#approvaDiv").append($mydata.btnOrdine);
              //  that.$('#lblstatus').css("background-color", $mydata.stato_color);
                $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
               that.loadDataProdotti(app.global.nick_array.arr.id);
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
      
    },
    chiudiOrdine:function  (e,field, row, rowIndex, oldValue, $el){
        //in questa fase si può chiudere l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
        that=this;
            
        that.$("#manageForm").validate(); //sets up the validator
        $("input[name=\"invio_email\"]").rules( "add", {
     
                  required:true,
                   messages: {

              required: "Selezionare se inviare l'email!"
             
          }
        });  
        if($("#manageForm").valid()){
            var $alert= $('.alert').hide();
            var jsonObj = {};
            jsonObj.ordine = app.global.nick_array.arr.id;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "update";
            jsonObj.descrizione = $("#descr_chiusura").val();
            jsonObj.invio_email = $("input[name='invio_email']:checked").val();
            jsonObj.subAction = "chiudi";
            jsonObj.type = "ordine";
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
                $mydata =JSON.parse(data);
                //   that.$("#approvaDiv").empty();
                //  that.$("#approvaDiv").append($mydata.btnOrdine);
                //  that.$('#lblstatus').css("background-color", $mydata.stato_color);
                    $alert.attr('class', 'alert alert-success')
                            .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                    setTimeout(function () {
                        $alert.hide();
                    }, 3000);
                that.loadDataDDT(app.global.nick_array.arr.id);
                },
                error: function(e) {
                // $("#err").html(e).fadeIn();
                } 
                    
        
            });
        }  
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
                         $ddt.push({ddt:row[key]['ddt']})}
                    }
                }
            }
        }
       
        console.log($ddt);
       
        var modalF="";
        var modalField='';
        var $idOrd=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].id;
        var $selServizioX=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].id_servizio;
        var $num_prog=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].num_prog;
        var $fornitore=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].fornitore;
        var $id_fornitore=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].id_fornitore;
        var $id_tip_acquisto=app.global.nick_array.arrTable[app.global.nick_array.arrIndex].id_tip_acquisto;
        that.$('.modal-title').empty();     
        if(row.length>0){//array ddt
            console.log($id_tip_acquisto);
            if($id_tip_acquisto==="1"){//ordini diretti tipo cancelloni
         
                if($ddt.length<1){//caso tipo Cancelloni ogni DDT ha già un documento(immagine o pdf) associato
                    that.$('.modal-title').text("Add documento all DDT  del fornitore " + $fornitore); 
                    modalField=
                        '<div class="panel panel-default">'+
                            '<div class="panel-body">'+

                                '<label  >Non ci sono DDT da aggiornare</label>'+
                            
                                '</div></div><div id="doc" />';
                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalField);
                    that.$(".modal-footer").empty(); 
                    modal1Abody();
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

                    that.$("#selDDT").append('<option value="0"></option>');
                    $.each($ddt, function(i, value) {
                        that.$("#selDDT").append('<option value="'+$ddt[i]["ddt"]+'">'+$ddt[i]["ddt"]+'</option>');
                    });

                    that.$("#selDDT").change(function () {
                        $row=_.findWhere(row, {ddt: ($("#selDDT").val())});
                       //console.log($row);
                        modal1body($row);
                    });
                }
           
                function modal1Abody(){
                    // console.log(parseInt($("#selDDT").val()));
                   //  console.log(row);
                     
                  $data=moment(row.data, "DD-MM-YYYY").format('DD/MM/YYYY');

                  that.$('.modal-title').text("Add Documento all'ordine N° " + $num_prog + " per " + $fornitore); 
                  modalField=
                          '<div class="panel panel-default">'+
                              '<div class="panel-body">'+
                                  '<input type="hidden"  name="direct" id="direct" value="true">'+
                              '<div  class="row">'+
                              '<div class="form-group col-lg-6">'+
                                  '<label  id="lblddt"  for="ddt">N° Documento</label>'+
                                  '<input type="text" class="form-control" name="ddt" id="ddt"   >'+
                              '</div>'+
                              '<div class="form-group col-lg-6">'+
                              '<label  id="lbldata  for="data">Data Documento</label>'+
                              '<div class="input-group date " id="datetimepicker">'+
                                  '<input type="text" class="form-control" name="dataDdt" id="dataDdt"  readonly>'+
                                  '<span class="input-group-addon">' + 
                                      '<span class="glyphicon glyphicon-calendar"></span>' +
                                  '</span>'+
                              '</div>'+
                          '</div>'+
                               '<div class="form-group col-lg-12">'+
                                  '<label  id="lblNota"  for="nota">Nota</label>'+
                                  '<input type="text" class="form-control" name="nota" id="nota" " placeholder="" >'+
                              '</div>'+
                          '</div>';
                  body2AModal()
             }
                function modal1body(row){
                       // console.log(parseInt($("#selDDT").val()));
                      //  console.log(row);
                        
                     $data=moment(row.data, "DD-MM-YYYY").format('DD/MM/YYYY');

                     that.$('.modal-title').text("Add documento all DDT N° " + row.ddt + " del fornitore " + $fornitore); 
                     modalField=
                             '<div class="panel panel-default">'+
                                 '<div class="panel-body">'+
                                     '<input type="hidden"  name="direct" id="direct" value="true">'+
                                 '<div  class="row">'+
                                 '<div class="form-group col-lg-6">'+
                                     '<label  id="lblddt"  for="ddt">N° DDT</label>'+
                                     '<input type="text" class="form-control" name="ddt" id="ddt" value="'+row.ddt+'" readonly >'+
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
            that.$('.modal-title').text("Add Documento all'ordine N° " + $num_prog + " per " + $fornitore);  
            modalField=
                     '<div class="panel panel-default">'+
                        '<div class="panel-body">'+
                    '<input type="hidden"  name="direct" id="direct" value="false">'+
                    '<div  class="row">'+
                        '<div class="form-group col-lg-3">'+
                            '<label  id="lblddt"  for="ddt">N° Documento</label>'+
                            '<input type="text" class="form-control" name="ddt" id="ddt" " placeholder="" >'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lbldata  for="data">Data Documento</label>'+
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
                        '</div>'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                    '<input type="radio"  value="0" name="statoDdt" id="statoDdt">'+
                                '</span>'+
                                    '<label class="form-control" aria-label="..." >DDT merce mancante</label>'+
                            '</div>'+ 
                        '</div> <br><br>'+
                        '<div class="col-lg-6">'+
                            '<div class="input-group">'+
                                '<span class="input-group-addon">'+
                                    '<input type="radio"  value="2" name="statoDdt" id="statoDdt">'+
                                '</span>'+
                                    '<label class="form-control" aria-label="..." >Nota di credito</label>'+
                            '</div>'+ 
                        '</div>'+
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
                '<button type="button" id="btnAddDDT" name="btnAddDDT" class="btn btn-primary submit ">Add Documento</button>'+
            '</div>'+ 
        '</div>'+ 
    '</form >';
                that.$(".modal-body").empty();   
        that.$(".modal-body").append( modalF);
        that.$(".modal-footer").empty(); 
         $('#notaC').hide();
        
        
        
        that.$('input[name=statoDdt]').change(function(){
           
            $('#notaconsegna').val("");
           
            if($('input[name=statoDdt][value=1]').is(":checked") || $('input[name=statoDdt][value=2]').is(":checked")){
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
                 var listDDT=_.pluck(that.$("#tableDDT").bootstrapTable('getData'), 'ddt');
                console.log(listDDT);
                
                if(_.size(listDDT)){
                
                    if(_.contains(listDDT,that.$("#ddt").val())){
                        alert(" Ddt esistente!");
                        return false; 
                    }else if(that.$("#ddt").val()==="" || that.$("#ddt").val()===null){
                        alert(" Inserire codice Ddt!"); 
                        return false; 
                    }
                } else{
                    if(that.$("#ddt").val()==="" || that.$("#ddt").val()===null){
                        alert(" Inserire codice Ddt!"); 
                        return false; 
                    }
                
                }
                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'rfa/ordini/';

                //var jsonObj = sendUrbans_formToJson(that);
               
               
        
                var form_data = new FormData($("#modDDT")[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', 'ddt');
                form_data.append('servizio', $selServizioX);
                form_data.append('fornitore', $id_fornitore);
                form_data.append('fornitoreF', $fornitore);
                
                 
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
                                // app.routers.router.prototype.data_type_edit();
                                console.log("ok=>load idOrd=",$idOrd);
                                 that.loadDataDDT($idOrd);
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
             $("input[name=\"ordine_completo\"]").rules( "add", {
                required:true,
                messages: {
                    required: "Selezionare stato ordine"
                }
            });
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
       
  
        }
        function body2AModal(){
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
                                        '<input type="radio"  value="2" name="statoDdt" id="statoDdt">'+
                                    '</span>'+
                                     '<label class="form-control" aria-label="..." >Nota di credito</label>'+
                                '</div>'+ 
                            '</div>'+
                        
                        '</div><!-- /.row -->'+
                        '<div class="row" id="notaC">'+
                            '<div class="form-group col-lg-12">'+
                                '<label  id="lblNotaC"  for="notaconsegna">Nota alla consegna</label>'+
                                '<input type="text" class="form-control" name="notaconsegna" id="notaconsegna" >'+
                            '</div>'+
                        '</div>'+    
                    '</div><!-- /.panel-body -->'+
                    '</div><!-- /.panel panel-default -->'+
                '</div>'+     
                '<div class="row">'+
                    '<div class="form-group col-lg-12">'+
                       '<button type="button" id="btnAddDDT" name="btnAddDDT" class="btn btn-primary submit ">Add Documento</button>'+
                    '</div>'+ 
                '</div>'+ 
            '</form >';
            
            that.$("#doc").append( modalF);
            that.$(".modal-footer").empty(); 
            $('#notaC').hide();
        
        
        
            that.$('input[name=statoDdt]').change(function(){
            
                $('#notaconsegna').val("");
            
                if($('input[name=statoDdt][value=1]').is(":checked") || $('input[name=statoDdt][value=2]').is(":checked")){
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
                    var listDDT=_.pluck(that.$("#tableDDT").bootstrapTable('getData'), 'ddt');
                    console.log(listDDT);
                    
                    if(_.size(listDDT)){
                    
                        if(_.contains(listDDT,that.$("#ddt").val())){
                            alert(" Ddt esistente!");
                            return false; 
                        }else if(that.$("#ddt").val()==="" || that.$("#ddt").val()===null){
                            alert(" Inserire codice Ddt!"); 
                            return false; 
                        }
                    } else{
                        if(that.$("#ddt").val()==="" || that.$("#ddt").val()===null){
                            alert(" Inserire codice Ddt!"); 
                            return false; 
                        }
                    
                    }
                    //--------------------------------------------------------------
                    var API_URL = app.global.json_url + 'rfa/ordini/';

                    //var jsonObj = sendUrbans_formToJson(that);
                
                
            
                    var form_data = new FormData($("#modDDT")[0]); 
                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                    form_data.append('action', 'add');
                    form_data.append('type', 'ddt');
                    form_data.append('servizio', $selServizioX);
                    form_data.append('fornitore', $id_fornitore);
                    form_data.append('fornitoreF', $fornitore);
                    
                    
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
                                    // app.routers.router.prototype.data_type_edit();
                                    console.log("ok=>load idOrd=",$idOrd);
                                    that.loadDataDDT($idOrd);
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
    

        }
        this.$('#datetimepicker').datetimepicker({ 
          format: "dd/mm/yyyy",
          autoclose: true,
          startView: 2,
          minView: 2,
         // startDate: "2020-01-01",
          //endDate:"2019/01/15",
          language: "it"
        }).show();
       
        that.$("#modal").modal('show'); 
        //qui
    },//addDdt
    ordine:function  (e,field, row, rowIndex, oldValue, $el){
        //in questa fase si può inviare  l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
        that=this;
        console.log(app.global.nick_array);
        $prezzoOk=true;
        if(app.global.nick_array.arr.id_categoria==='10' ||app.global.nick_array.arr.id_categoria==='11' ){
        $.each(app.global.nick_array.prodotti, function(i, value) {
            console.log(value.prezzo,value.id_iva); 
            if(typeof value.prezzo === 'undefined' || value.prezzo==='0' || value.prezzo===null || typeof value.id_iva === 'undefined' || value.id_iva==='5' || value.id_iva==='13'){// id_iva =5->null  id_iva =13->0
                $prezzoOk=false;
               // alert("Inserire prezzo e iva per tutti i prodotti!");
              //  return false;
            }
            console.log(i,$prezzoOk);
           
         });
         if($prezzoOk){
            // 
             console.log('invio');
             invioOrd();
         }else{
             console.log('return');
             bootbox.dialog({
                title: 'Prodotti senza prezzo/iva',
                message: "Inserire prezzo e iva per tutti i prodotti!",
                buttons: {
                    main: {
                        label: "OK",
                        className: "btn btn-danger",
                        callback: function () {
                           
                            console.log($prezzoOk);
                           // $("body").removeClass("modal-open");
                           
                        }
                    }
                }
            });
           //  return;
         }
        }else{
            console.log('invio no 10 11');
             invioOrd(); 
        }
        
       function invioOrd(){
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "update";
        jsonObj.subAction = "invia";
        jsonObj.type = "ordine";
        jsonObj.descr_invio =  $("#descr_invio").val();
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
             $mydata =JSON.parse(data);
                 that.$("#approvaDiv").empty();
                that.$("#approvaDiv").append($mydata.btnOrdine);
                that.$('#lblstatus').css("background-color", $mydata.stato_color);
                $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
                that.loadDataProdotti(app.global.nick_array.arr.id);
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
    }
    },
    amagazzino:function  (e,field, row, rowIndex, oldValue, $el){
        //in questa fase si può inviare  l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
        that=this;
        
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        jsonObj.fornitore = app.global.nick_array.arr.id_fornitore;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "update";
        jsonObj.subAction = "amagazzino";
        jsonObj.type = "ordine";
        jsonObj.descr_invio =  $("#descr_invio").val();
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
                $mydata =JSON.parse(data);
                that.$("#approvaDiv").empty();
                that.$("#approvaDiv").append($mydata.btnOrdine);
                that.$('#lblstatus').css("background-color", $mydata.stato_color);
                $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
                that.loadDataProdotti(app.global.nick_array.arr.id);
            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
      
    },
    approva:function  (){
       //in questa fase si può approvare l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
       
       //this.$('#lblstatus').css("background-color", '#99cbff');
        that=this;
        var $alert= $('.alert').hide();
        var jsonObj = {};
        jsonObj.ordine = app.global.nick_array.arr.id;
        
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "update";
        jsonObj.subAction = "approva";
        jsonObj.type = "ordine";
        jsonObj.descr_approva =  $("#descr_approva").val();
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
                $mydata =JSON.parse(data);
                that.$("#approvaDiv").empty();
                that.$("#approvaDiv").append($mydata.btnOrdine);
                that.$('#lblstatus').css("background-color", $mydata.stato_color);
                $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
                that.loadDataProdotti(app.global.nick_array.arr.id);
                                
                  


            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
      
    },
    sospeso:function  (){
        //in questa fase si può mettere in attesa per la richiesta di un sospeso l'ordine cosi come è: i dati sono già salvati con le modifiche precedenti
        
        //this.$('#lblstatus').css("background-color", '#99cbff');
         that=this;
         var $alert= $('.alert').hide();
         var jsonObj = {};
         jsonObj.ordine = app.global.nick_array.arr.id;
         jsonObj.person = app.global.tokensCollection.first().get("id_person");
         jsonObj.action = "update";
         jsonObj.subAction = "sospeso";
         jsonObj.type = "ordine";
         jsonObj.descr_sospeso =  $("#descr_sospeso").val();
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
                 $mydata =JSON.parse(data);
                 that.$("#sospesoDiv").empty();
                 that.$("#sospesoDiv").append($mydata.btnOrdine);
                 that.$('#lblstatus').css("background-color", $mydata.stato_color);
                 $alert.attr('class', 'alert alert-success')
                         .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                 setTimeout(function () {
                     $alert.hide();
                 }, 3000);
                 that.loadDataProdotti(app.global.nick_array.arr.id);
                                 
                   
 
 
             },
             error: function(e) {
                // $("#err").html(e).fadeIn();
             } 
                 
        
         });
       
     },
    saveProductQuantity:function  (e,field, row, rowIndex, oldValue, $el){
        $('#table1').off('editable-save.bs.table');
         var $alert= $('.alert').hide();
         var jsonObj = {};
        console.log('row:',  row);
        jsonObj.ordine = row.id_rfa_ordine;
        jsonObj.prodotto = row.id;
        jsonObj.categoria = app.global.nick_array.arr.id_categoria;
        jsonObj.quantita = row.quantita;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.action = "update";
        jsonObj.type = "quantita";
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
             
                $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i> Update quantità OK').show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
                                
                   that.loadDataProdotti(row.id_rfa_ordine);


            },
            error: function(e) {
               // $("#err").html(e).fadeIn();
            } 
                
       
        });
      
    },
    headerJson: function(){
        var $headers = {
             "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            
          
          
          
           
           
        };
        return $headers;
    },
    editProduct:function  (row){
        jsonObj = {};
        jsonObj.action = "list";
        jsonObj.type = "iva";
        jsonObj.person = app.global.tokensCollection.first().get("id_person");

        jsonObj = JSON.stringify(jsonObj);

        $.ajax({
            url:app.global.json_url + 'rfa/ordini/',
            type:'post',
            headers : $headers,
            data :  jsonObj,
            dataType : 'text',
            success: function (datap) {
                $mydata =JSON.parse(datap);
              loadModal(row,$mydata.data);
                 },
             error: function () {

                  console.log("get iva item error!");
                                }
      });
       function loadModal(row,iva){
        console.log('row:',  row,iva);
        var $modal = $('#modal').modal({ show: false }); 
        var modalF=
            '<form id="modEdit" >'+
            '<input type="hidden"  name="idx" id="idx" value="'+row.id+'">'+
            '<div class="row">'+
               '<div class="form-group col-lg-2">'+
                    '<label  id="lblCodice"  for="codice">Codice</label>'+
                    '<input type="text" class="form-control" name="codice" id="codice" " placeholder="" value="'+row.codice+'">'+
                '</div>'+
                '<div class="form-group col-lg-10">'+
                    '<label  id="lblDescrizione"  for="descrizione">Descrizione *</label>'+
                    '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" value="'+row.name+'">'+
                '</div>'+
            '</div>'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-10">'+
                    '<label  id="lblFornitore"  for="fornitore">Fornitore</label>'+
                    '<input type="text" class="form-control" name="fornitorex" id="fornitorex" " placeholder="" value="'+row.fornitore+'">'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label  id="lblQuantita"  for="quantita">Quantità *</label>'+
                    '<input type="text" class="form-control" name="quantita" id="quantita" " placeholder="" value="'+row.quantita+'">'+
                '</div>'+
            '</div>'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-10">'+
                    '<label>Prezzo netto</label>'+
                    '<input type="number" min="0.1" step="any"  class="form-control" name="prezzo" id="prezzo" " placeholder="" value="'+row.prezzo+'">'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label >I.V.A. %</label>'+
                    '<select class="form-control" name="id_iva" id="id_iva"  placeholder="" value="'+row.id_iva+'"></select>'+
                '</div>'+
            '</div>'+ 
                 '</form >';
             var modalFoot=  '<span class="alert"></span>'+   
                '<button type="button" id="btnEdit" name="btnEdit" class="btn btn-primary " >Modifica Prodotto DFF</button>';
          
            that.$(".modal-body").empty();  
            that.$(".modal-footer").empty();  
            that.$(".modal-body").append(modalF);
            that.$(".modal-footer").append(modalFoot);
            $modal.find('.modal-title').text("Modifica Prodotto DFF");
           
            $modal.modal('show'); 
            
            that.$("#id_iva").empty();
                       
            $.each(iva, function(i, value) {
               console.log(value.id,value.iva);  
               that.$("#id_iva").append('<option value="'+value.id+'">'+value.iva+'</option>');
            });
            $("#id_iva").val(row.id_iva);//
             
       }
    },
    saveProductDFF:function  (){//categoria 10
        that.$("#modEdit").validate(); //sets up the validator
        that.$("input[name=\"quantita\"]").rules( "add", {
            required:true,
            messages: {
                required: "Inserire la quantità del prodotto!"
            }
        });
        that.$("input[name=\"descrizione\"]").rules( "add", {
            required:true,
            messages: {
                required: "Inserire il nome o la descrizione del prodotto!"
            }
        });
      /*  that.$("input[name=\"prezzo\"]").rules( "add", {
            required:true,
            messages: {
                required: "Inserire il prezzo netto del prodotto!"
            }
        });
        that.$("input[name=\"id_iva\"]").rules( "add", {
            required:true,
            messages: {
                required: "Inserire la percentuale dell'I.V.A.!"
            }
        });*/
        
        if(that.$("#modEdit").valid()){
        var jsonObj = {};
       
            if( app.global.nick_array.arr.id_categoria==10 || app.global.nick_array.arr.id_categoria==11){
                jsonObj.idProdotto = this.$("#idx").val();
                jsonObj.fornitore = this.$("#fornitorex").val();
                jsonObj.prodotto=this.$("#descrizione").val();
                jsonObj.codice=this.$("#codice").val();
                jsonObj.quantita=this.$("#quantita").val();
                jsonObj.prezzo=this.$("#prezzo").val();
                jsonObj.id_iva=this.$("#id_iva").val();

            }
            jsonObj.servizio = app.global.nick_array.arr.id_servizio;
            jsonObj.categoria = app.global.nick_array.arr.id_categoria;
            jsonObj.action = "update";
            jsonObj.subAction = "modifica";
            jsonObj.type = "ordine";
            jsonObj.ordine = app.global.nick_array.arr.id;
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
                   
                       that.$('#modal').modal('hide');     
                       that.$("#fornitore").val(that.$("#fornitorex").val());
                       that.loadDataProdotti(app.global.nick_array.arr.id);
                       
                   
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });}
    },
    saveProduct:function  (){
        var jsonObj = {};
        var $els1=this.$('#table').bootstrapTable('getData');//tabella prodotti add
        for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record per non riproporli in add
            if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                //  that.$('#invio').prop( "disabled", false );

                if( app.global.nick_array.arr.id_categoria==10){

                    $prodotti=[];
                    var element={};

                    jsonObj.fornitore = app.global.nick_array.arr.id_fornitore;
                    element.prodotto=this.$("#prodotto").val();
                    element.codice=this.$("#codice").val();
                    element.quantita=this.$("#quantita").val();
                    $prodotti.push(element);
                    Object.assign( jsonObj, {prodotti:$prodotti})

                    console.log(jsonObj);
                }else{
                    $prodotti=_.filter(this.$('#table').bootstrapTable('getData'), function(num){ return num.quantita !=""; });
                    jsonObj.prodotti =$prodotti;
                    jsonObj.fornitore = app.global.nick_array.arr.id_fornitore;
                }
                jsonObj.servizio = app.global.nick_array.arr.id_servizio;
                jsonObj.categoria = app.global.nick_array.arr.id_categoria;
                jsonObj.action = "update";
                jsonObj.subAction = "modifica";
                jsonObj.type = "ordine";
                jsonObj.ordine = app.global.nick_array.arr.id;
            }
            console.log($els1);
        }
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
                   
                       that.$('#modal').modal('hide');                 
                       that.loadDataProdotti(app.global.nick_array.arr.id);
                       
                   
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });
    },
    addProduct:function  (){
        console.log(app.global.nick_array.arr);
        var $table = this.$('#table');
        var $modal = this.$('#modal').modal({ show: false });  
        that=this;
        tipoDoc="addProduct";
        if(app.global.nick_array.arr.id_categoria==10){
            var modalF=
            '<form id="modEdit" >'+
            '<input type="hidden"  name="idx" id="idx" value="">'+
            '<div class="row">'+
               '<div class="form-group col-lg-2">'+
                    '<label  id="lblCodice"  for="codice">Codice</label>'+
                    '<input type="text" class="form-control" name="codice" id="codice" " placeholder="" value="">'+
                '</div>'+
                '<div class="form-group col-lg-10">'+
                    '<label  id="lblDescrizione"  for="descrizione">Descrizione *</label>'+
                    '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" value="">'+
                '</div>'+
            '</div>'+ 
            '<div class="row">'+
                '<div class="form-group col-lg-10">'+
                    '<label  id="lblFornitore"  for="fornitore">Fornitore</label>'+
                    '<input type="text" class="form-control" name="fornitorex" id="fornitorex" " placeholder="" value="">'+
                '</div>'+
                '<div class="form-group col-lg-2">'+
                    '<label  id="lblQuantita"  for="quantita">Quantità *</label>'+
                    '<input type="text" class="form-control" name="quantita" id="quantita" " placeholder="" value="">'+
                '</div>'+
            '</div>'+ 
                 '</form >';
             var modalFoot=  '<span class="alert"></span>'+   
                '<button type="button" id="btnEdit" name="btnEdit" class="btn btn-primary " >Add Prodotto DFF</button>';
          
            that.$(".modal-body").empty();  
            that.$(".modal-footer").empty();  
            that.$(".modal-body").append(modalF);
            that.$(".modal-footer").append(modalFoot);
            $modal.find('.modal-title').text("Add Prodotto DFF");
            that.$("#modEdit").validate(); //sets up the validator
            $modal.modal('show'); 
            
                    that.proTable($mydata);
           
        }else{
              var jsonObj = {};
            jsonObj.categoria = app.global.nick_array.arr.id_categoria;
            jsonObj.servizio = app.global.nick_array.arr.id_servizio;
            jsonObj.fornitore = app.global.nick_array.arr.id_fornitore;
            jsonObj.action = "modulo";
            jsonObj.type = "prodotti";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url+'rfa/ordini/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    var modalF=
                        '<form id="mod'+tipoDoc+'" >'+
                        '<label >Seleziona le quantità dei Prodotti da ordinare:</label>'+ 
                           
                                '<p class="toolbar">'+
                                
                                '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table" class="table table-striped"> </table><br/>'+
                          
                        '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary " disabled>Add Prodotto</button>'+
                        '</form >';
                    that.$(".modal-body").empty();  
                    that.$(".modal-footer").empty();  
                    that.$(".modal-body").append(modalF);
                    $modal.find('.modal-title').text("Add Prodotto");
                    that.$("#mod"+tipoDoc).validate(); //sets up the validator


                    $modal.modal('show'); 
                    that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
                        var $els1=that.$('#table').bootstrapTable('getData')
                        that.$('#btnAlle').prop( "disabled", true );
                        for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio

                            if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                                that.$('#btnAlle').prop( "disabled", false );
                            }
                        }
                    });
                    that.proTable($mydata);
                   
                }
            });
        }
          
        //-----------------------------------------------------------
   
     
   
        this.$('#btnAlle').click(function(e) {
        if($("#mod"+tipoDoc).valid()){
                      
                //--------------------------------------------------------------
                 var API_URL = app.global.json_url + 'rfa/';
                
                //var jsonObj = sendUrbans_formToJson(that);
                var form_data = new FormData($("#mod"+tipoDoc)[0]); 
                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                form_data.append('action', 'add');
                form_data.append('type', tipoDoc);
                form_data.append('allegatoTipo', 'allegato');
                
                form_data.append('id_ser', servizio);
              
                
                var $headers = {
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
                      var  $mydata =JSON.parse(datap);
                       
                        //-------------------------------------------------------
                        if ($mydata.success){
                           // app.routers.router.prototype.data_type_edit();
                            console.log("ok");
                            //render();
                            var $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };
                    var jsonObj = {};
                    jsonObj.action = "get";
                    jsonObj.servizio = servizio;
                    jsonObj.type = app.global.nick_array.arr + "ROW";
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (datap) {
                         var   $myData = JSON.parse(datap);
                            if ($myData.success) {
                                hrTable($myData);
                            }
                            else {
                                bootbox.dialog({
                                    title: that.language.error_message,
                                    message: that.language.error_message + ' : ' + $mydata.message,
                                    buttons: {
                                        main: {
                                            label: that.language.label_button,
                                            className: "btn btn-danger",
                                            callback: function () {
                                                $("body").removeClass("modal-open");
                                            }
                                        }
                                    }
                                });
                            }
                        },
                        error: function () {
                            console.error("hr list load table error!!!");
                        }
                    });
                        }
                    }   
                });
            }
        });
    },
    proTable:   function  (my){
        $table=this.$("#table");
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
        var $els2=that.$('#table1').bootstrapTable('getData');//tabella prodotti main
        arr = my.data.filter(function(objOne) {
            return !$els2.some(function(objTwo) {
                return objOne.codice == objTwo.codice;
            });
        });
        console.log(my.data,$els2,arr);
        $.each( arr, function( key, value ){
         //  console.log(key,value)
            value.quantita=""
          
        }); 
      
        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: arr,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
           
           
           
        });
      
        that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
       
       
        that.$('#quantita').on('change',function ( field) {
             console.log(field.target.value);
            $value=field.target.value;
            if($value !='0' || $value !=''){
                console.log($value+'ok')
           
                that.$('#btnAlle').prop( "disabled", false);
            }else{
                console.log($value+'ko')
                that.$('#btnAlle').prop( "disabled", true );
            }
           
        
        });
        that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
           
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < arr.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( arr[i].quantita !='0' && arr[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
           
           

           
        });

    },
    editSave:function  (){
        $('#table1').on('save', function(e, params) {
         alert('Saved value: ' + params.newValue);
        });
    },
    loadDataProdotti: function (idOrdine){
        var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type='prodotti';
            jsonObj.action='list';
            jsonObj.categoria=app.global.nick_array.arr.id_categoria;
            jsonObj.fornitore=app.global.nick_array.arr.fornitore;
            jsonObj.id_fornitore=app.global.nick_array.arr.id_fornitore;
            jsonObj.idServizio=app.global.nick_array.arr.id_servizio;
            jsonObj.idOrdine=idOrdine;
            //jsonObj.data_carico=app.global.nick_array.arr.data_carico;
            
            jsonObj = JSON.stringify(jsonObj);
            $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
           that=this;
            $.ajax({
               url:app.global.json_url + 'rfa/ordini/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                   $mydata =JSON.parse(json);
                   $num= $mydata.data.length;
                   app.global.nick_array.prodotti=$mydata.data;
                 
                    if( $num >0 ){
                        $('#lblInt-prog').text( $num.toString() );
                       

                    }else{
                        $('#lblInt-prog').text("0" )
                    }
                      that.hrTable($mydata);
            }
            });
           
    },
    hrTable:function  (my){
        var $alert= $('.alert1').hide();
       // this.$('#headingOne0').val( my.anagrafe[0].servizio);
       var $selServizio=this.$("#servizio");
       setServizi(my.servizi)
       function  setServizi(servizi){
          
            $selServizio.append('<option >Seleziona servizio</option>');
            $.each(servizi, function(i, value) {
                $selServizio .append('<option value="'+value["id"]+'">'+value["name"]+'</option>');
            });           
            $selServizio.val(my.anagrafe.id);
                   
        }
        this.$('#servizio').change(function () {
            if (confirm('Vuoi cambiare il Servizio attribuito all\'ordine?')) {
            var jsonObj = {};
                jsonObj.id_servizio = $('#servizio').val();
                jsonObj.ordine = app.global.nick_array.arr.id;//id ordine
                jsonObj.action = "update";
                jsonObj.type = "servizio";
                
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);
               
                $.ajax({
                   url:app.global.json_url+"rfa/ordini/",
                   type:'post',
                   headers : $headers,
                   data: jsonObj,
                   dataType : 'text',
                    success: function (json) {
                       $mydata =JSON.parse(json);                    
                       $alert.attr('class', 'alert alert-success')
                            .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                    setTimeout(function () {
                        $alert.hide();
                    }, 3000);
                    app.global.nick_array.arr=$mydata.row;
                    console.log($mydata, app.global.nick_array.arr) ;
                    var index = _.indexOf(app.global.nick_array.arrTable, _.findWhere(app.global.nick_array.arrTable, {id: $that.$('#id').val()}));
                    app.global.nick_array.arrTable[index]=$mydata.row;
                    console.log(index);
                    app.routers.rfaRouter.prototype.rfa_management();                    
                    },
                    error: function (json) {
                        $mydata =JSON.parse(json);                      
                       $alert.attr('class', 'alert alert-danger')
                            .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                    setTimeout(function () {
                        $alert.hide();
                    }, 3000);
                   
                    }
                });
            } 
        }); 
        this.$('#name').val( my.anagrafe.servizio);
        this.$('#emailServizio').val( my.anagrafe.emailServizio);
        this.$('#telServizio').val( my.anagrafe.telServizio);
        this.$('#categoriaServizio').val( my.anagrafe.categoria);
        this.$('#areaServizio').val( my.anagrafe.area);
        this.$('#orariServizio').val( my.anagrafe.orari);
        this.$('#indirizzo').val( my.anagrafe.indirizzo);
        this.$('#cap').val( my.anagrafe.cap);
        this.$('#comune').val( my.anagrafe.comune);
        this.$('#provincia').val( my.anagrafe.provincia);
        this.$('#coordinatore').val( my.anagrafe.coordinatore);
        this.$('#emailCoord').val( my.anagrafe.emailCoordinatore);
        this.$('#telCoord').val( my.anagrafe.telCoordinatore);
        this.$('#refRes').val( my.anagrafe.refRes);
        this.$('#emailRefRes').val( my.anagrafe.emailRefRes);
        this.$('#telRefRes').val( my.anagrafe.telRefRes);
        this.$('#ordine_fornitore').val( my.fornitore_ordine.num_ordine_fornitore);
        this.$('#data_ordine_fornitore').val( my.fornitore_ordine.data_ordine_fornitore);
        this.$('#fattura_fornitore').val( my.fornitore_fattura.numero);
        this.$('#data_fattura_fornitore').val(my.fornitore_fattura.data);
        if(typeof my.details_fornitore_servizio !== 'undefined'){
            this.$('#orario_consegna').val(my.details_fornitore_servizio.orario);
             this.$('#codice_cliente').val(my.details_fornitore_servizio.cod_cliente);
               this.$('#codice_servizio').val(my.details_fornitore_servizio.cod_servizio);
        }
       
        
        //this.$('#fornitore').val( my.fornitore);
        if(typeof(my.fornitore_ordine.data_ordine_fornitore) !== "undefined" && my.fornitore_ordine.data_ordine_fornitore !== null && my.fornitore_ordine.data_ordine_fornitore !== '1001-01-01 00:00:00'){    
               this.$('#data_ordine_fornitore').val(moment(my.fornitore_ordine.data_ordine_fornitore).format('DD/MM/YYYY'));
         
        }else{
              this.$('#data_ordine_fornitore').val("");
            
            }
        if(typeof my.stato_color !== 'undefined'){
            this.$('#lblstatus').css("background-color", my.stato_color);
        }
        console.log(my.preventivo);
      
        $('#divProduct').empty();
        if(typeof my.newR !== 'undefined'){
             $('#divProduct').append(my.newR);
        }
        $('#sospesoDiv').empty();
        $('#approvaDiv').empty();
        if(typeof my.btnOrdine !== 'undefined'){
            $('#approvaDiv').append(my.btnOrdine);
            $sospesoText='';
            $approvaText='';
            $invioText='';
            $chiusuraText='';
            //----------------sospeso----------------------------------------------------
            if(my.details.descrizione_sospeso){
                $sospesoText=my.details.descrizione_sospeso+'\n'+my.details.person_sospeso;
                
            }else{
                $asospesoText=my.details.person_sospeso;
            } 
            $('#descr_sospeso').val( $('<div />').html($sospesoText).text());
            //-----------------approva----------------------------------------------
            if(my.details.descrizione_approva){
                $approvaText=my.details.descrizione_approva+'\n'+my.details.person_approva;
                
            }else{
                $approvaText=my.details.person_approva;
            } 
            $('#descr_approva').val( $('<div />').html($approvaText).text()); 
            //-----------------invio--------------------------
            if(my.details.descrizione_invio){
                $invioText=my.details.descrizione_invio+'\n'+my.details.person_invio;
                
            }else{
                $invioText=my.details.person_invio;
            } 
            $('#descr_invio').val( $('<div />').html($invioText).text());
            //-----------chiusura---------------------------------------
            if(my.details.descrizione_chiusura){
                $chiusuraText=my.details.descrizione_chiusura+'\n'+my.details.person_chiusura;
                
            }else{
                $chiusuraText=my.details.person_chiusura;
            } 
            $('#descr_chiusura').val( $('<div />').html($chiusuraText).text());
              if(my.preventivo){
            console.log(my.preventivo);
            $('#preventivo').val( my.preventivo.file);
            $('#btnPreventivoView').attr('disabled',false);
             $('#btnPreventivoDel').attr('disabled',false);
        }else{
              console.log(my.preventivo);
           $('#preventivo').val( 'No file preventivo'); 
            $('#btnPreventivoView').attr('disabled',true);
            $('#btnPreventivoDel').attr('disabled',true);
        }
        }
        
        var $table=this.$('#table1');
        //--------------------------------------------
        $.each( my.data, function( key, value1 ){
            console.log('key='+key,'---value='+value1);
            $.each( value1, function( key3, value3 ){
                console.log('key3='+key3,'---value3='+value3);
          
               // value1.quantita="";
                if(key3=="prodotto_json"){
                    $var=JSON.parse(value3);
                    $.each( $var, function( key2, value2 ){
                        console.log('key2='+key2,'---value2='+value2);
                        value1[key2]=value2;
                    });
                }
            });
        
        }); 
        //-------------------------------------------
        $.each( my.tab, function( key, value1 ){
             console.log(value1);
            if(value1["formatter"]=="imageFormatter"){
                value1["formatter"]=imageFormatter;
            }
         });
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
            columns:my.tab,
            data: my.data,
            showColumns:true,
            showRefresh:true,
            search:true,
            pagination:false,
            
           
        }); 
       $table.on('editable-save.bs.table', this.saveProductQuantity);
       // $table.on('editable-save.bs.table', console.log('save'));
        if(my.ddt==1){//se è abilitata la visualizzazione del pannello ddt
            console.log(my.idOrdine)
            this.loadDataDDT(my.idOrdine);
        }else{
            $('#accordion3').empty();
        }
        function imageFormatter(value, row) {
            return '<img src="'+value+'" />';
        }
         
      
    },
    cellStyle: function (value, row, index) {
        
        return {css: 
            //{"background-color": row.name_cell_color}
            {"background-color":  row.stato_color}
        };
   
    },  
    loadDataDDT: function (idOrdine){
        console.log(idOrdine);
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        var jsonObj = {};
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type='ddt';
        jsonObj.action='list';
        jsonObj.idCategoria=app.global.nick_array.arr.id_categoria
        jsonObj.indexCall =1002;
        jsonObj.idServizio=app.global.nick_array.arr.id_servizio;
        jsonObj.ordine=idOrdine;
        //jsonObj.data_carico=app.global.nick_array.arr.data_carico;

        jsonObj = JSON.stringify(jsonObj);
            that=this;
            $.ajax({
               url:app.global.json_url + 'rfa/ordini/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                    $mydata =JSON.parse(json);
                    $num= $mydata.data.length;
                  
                    
                        if( $num >0 ){
                            $('#lblInt-ddt').text( $num.toString()+" DDT" );


                        }else{
                            $('#lblInt-ddt').text("0 DDT" )
                        }
                        
                   
                    that.hrTableDDT($mydata);
            }
            });
           
    },
    hrTableDDT:function  (my){
        console.log(my);
        // this.$('#headingOne0').val( my.anagrafe[0].servizio);
         $mydataX=[];
        /*//qui devo capire come gestire le varie note!
        $('#approvaDiv').empty();
        if(typeof my.btnOrdine !== 'undefined'){
             $('#approvaDiv').append(my.btnOrdine);
        }
        */
        $('#divDDT').empty();
        if(typeof my.newR !== 'undefined'){
             $('#divDDT').append(my.newR);
        }
        
        $('#chiudiDiv').empty();
        if(typeof my.btnChiudiOrdine !== 'undefined'){
             $('#chiudiDiv').append(my.btnChiudiOrdine);
             if(my.details.descrizione_chiusura){
                $chiusuraText=my.details.descrizione_chiusura+'\n'+my.details.person_chiusura;
                
            }else{
                $chiusuraText=my.details.person_chiusura;
            }
            $('#descr_chiusura').val( $('<div />').html($chiusuraText).text());
        }
        var $table=this.$('#tableDDT');
        
        $.each( my.data, function( key, value1 ){
                                    
           
            if(value1["file"] != null && value1["file"] != '' ){ 
                                    //$mydataX[0]=value1;
                                    $mydataX.push(value1);
                                
            }

        }); 
        
           app.global.nick_array.ddt=$mydata.data;
        
        
        
       // var modalF='<textarea class="form-control" name="descriz" id="descriz" readonly rows="3"></textarea>'
             var modalF=my['modalF'];
               
       ;
        $('#modal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                    if(button.data('id')=="stato"){
                    that.$(".modal-footer").empty(); 
                    that.$(".modal-body").empty();  
                    that.$(".modal-body").append(modalF);  
                
                   
                    var title = button.data('title');
                   
                    if(button.data('image')){
                       var image = button.data('image'); 
                    }else{
                        var image = "";
                    }
            
               
                    var modal = $(this);
                    modal.find('.modal-title').text( title);
                    modal.find('.modal-body #descriz').val(app.global.nick_array.ddtx.nota_consegna);
                    modal.find('.modal-body #descrizAdm').val(app.global.nick_array.ddtx.notaUA);
                   
                   // modal.find('.modal-body img').attr('src', image);
                }
            });
        
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
            columns:my.tab,
             data:  $mydataX, //data:  ($my.data),
            showColumns:true,
            showRefresh:true,
            search:true,
            pagination:false
           
           
        }); 
       // $table.on('editable-save.bs.table', this.saveProductQuantity);
       
         
       that.$('#lblstatus').css("background-color", my.stato_color);
    },
    loadDataServizi: function (){
        
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        var jsonObj = {};
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type='ddt';
        jsonObj.action='list';
        jsonObj.idCategoria=app.global.nick_array.arr.id_categoria
        jsonObj.indexCall =1002;
        jsonObj.idServizio=app.global.nick_array.arr.id_servizio;
        jsonObj.ordine=idOrdine;
        //jsonObj.data_carico=app.global.nick_array.arr.data_carico;

        jsonObj = JSON.stringify(jsonObj);
            that=this;
            $.ajax({
               url:app.global.json_url + 'rfa/ordini/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                    $mydata =JSON.parse(json);
                    $num= $mydata.data.length;
                  
                    
                        if( $num >0 ){
                            $('#lblInt-ddt').text( $num.toString()+" DDT" );


                        }else{
                            $('#lblInt-ddt').text("0 DDT" )
                        }
                        
                   
                    that.hrTableDDT($mydata);
            }
            });
           
    },
    render:function(){
    	$(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rfa/list/';
        var $list,$dataInterventi;//$list=lista manutentori in select
        
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
       
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        console.log(app.global.nick_array.arr.servizio);
        console.log(app.global.nick_array.arr.id_servizio);
        console.log(app.global.nick_array);
      
        this.$('#name').val( app.global.nick_array.arr.servizio);
        this.$('#lblServizio').text( app.global.nick_array.arr.servizio);
        this.$('#lblnum-prog').text( app.global.nick_array.arr.num_prog);
        this.$('#num-prog').val( app.global.nick_array.arr.num_prog);
        this.$('#lbldata').text( app.global.nick_array.arr.data_richiesta);
        this.$('#lblfornitore').text( app.global.nick_array.arr.fornitore);
        this.$('#lblcategoria1').text( app.global.nick_array.arr.categoria1);
        this.$('#lbltempistica').text( app.global.nick_array.arr.tempistica);
        this.$('#dataConsegna').val( app.global.nick_array.arr.tempistica);
       
        this.$('#cig').val( app.global.nick_array.arr.CIG);
        this.$('#scadenzaCIG').val( app.global.nick_array.arr.CIG_scadenza);
        this.$('#notaCIG').val( app.global.nick_array.arr.CIG_nota);
       
        this.$('#fornitore').val( app.global.nick_array.arr.fornitore);
     
        this.$('#categoria').val( app.global.nick_array.arr.categoria1);
       
        
        this.$('#lblstatus').css("background-color", app.global.nick_array.arr.stato_color)
       
       
        this.$('#operatore').val( app.global.nick_array.arr.utente);
        this.$('#id').val( app.global.nick_array.arr.id);
        this.$('#nota').val($('<div />').html(app.global.nick_array.arr.nota).text());
        
        this.$('#descr_chiusura').val( $('<div />').html(app.global.nick_array.arr.descrizione_chiusura).text());
        this.$('#descr_invio').val( $('<div />').html(app.global.nick_array.arr.descrizione_invio).text());
        if(typeof(app.global.nick_array.arr.data_approva) !== "undefined" && app.global.nick_array.arr.data_approva !== null && app.global.nick_array.arr.data_approva !== '1001-01-01 00:00:00'){    
            this.$("#approvaDiv").empty();
            var butt='<button style="background-color: #225af5  !important;" type="button" id="ordine" name="ordine" class="btn btn-success">Invia Ordine</button>';
                     
            this.$("#approvaDiv").append(butt); 
        }
        if(typeof(app.global.nick_array.arr.data_invio) !== "undefined" && app.global.nick_array.arr.data_invio !== null && app.global.nick_array.arr.data_invio !== '1001-01-01 00:00:00'){    
            this.$("#approvaDiv").empty();
            var butt='<label style="background-color: #225af5  !important;"   class="btn btn-success">Ordine inviato</label>';
            this.$("#approvaDiv").append(butt); 
        }
        
        //acquisto diretto
        if(app.global.nick_array.arr.id_categoria==12){//acquisto diretto
            this.loadDataDDT(app.global.nick_array.arr.id);
        }else{
            this.loadDataProdotti(app.global.nick_array.arr.id);//id ordine
        }
        // this.loadDataDDT(app.global.nick_array.arr.id);//id ordine
        var that=this;
       
          
        this.$("#manageForm").validate({
            validClass: "success"
                 //  onsubmit: false
        });
       
        this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
        this.$('#datetimepicker1').datetimepicker('setStartDate', '+1d');
        this.$('#datetimepicker1').datetimepicker('setEndDate', '+5m');
    
        this.$('#dataConsegna').change(function () {
        var $alert= $('.alert1').hide();
        var jsonObj = {};
            jsonObj.dataC = $('#dataConsegna').val();
            jsonObj.ordine = app.global.nick_array.arr.id;//id ordine
            jsonObj.action = "update";
            jsonObj.type = "dataConsegna";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:app.global.json_url+"rfa/ordini/",
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);                    
                   $alert.attr('class', 'alert alert-success')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
                app.global.nick_array.arr.tempistica=$('#dataConsegna').val();
                $('#lbltempistica').text( app.global.nick_array.arr.tempistica);
               
                },
                error: function (json) {
                    $mydata =JSON.parse(json);                      
                   $alert.attr('class', 'alert alert-danger')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                }, 3000);
               
                }
            });
                }); 
    
        this.$('#closeSBY').click(function () {
                       id=this.id;
                        // alert("id="+id);
                       //  assegna_chiusura(id);
                        // return false;
                    }); 
        this.$('#closeKO').click(function () {
                       id=this.id;
                        alert("id="+id);
                        // assegna_chiusura(id);
                        // return false;
                    }); 

        this.$('#closeOK').click(function () {
            id=this.id;
             //alert("id="+id);
          //  assegna_chiusura(id);

        }); 

        this.$('.next1').click(function () {

                if(app.global.nick_array.arrIndex== Number(app.global.nick_array.arrTable.length)-1){
                    app.global.nick_array.arrIndex =0;
                }else{
                    app.global.nick_array.arrIndex=Number(app.global.nick_array.arrIndex)+1; 
                }

                app.global.nick_array.arr=app.global.nick_array.arrTable[ app.global.nick_array.arrIndex];    

                app.global.breadcrumb.pop();
                app.global.breadcrumb.push({

                    breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rfa_management" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</a></li>'
                });
                console.log(app.global.nick_array.arr);
                app.routers.rfaRouter.prototype.rfa_management();    
            });
        this.$('.pre1').click(function () {

                if(app.global.nick_array.arrIndex== 0){
                    app.global.nick_array.arrIndex =Number(app.global.nick_array.arrTable.length)-1;
                }else{
                    app.global.nick_array.arrIndex=Number(app.global.nick_array.arrIndex)-1; 
                }

                app.global.nick_array.arr=app.global.nick_array.arrTable[ app.global.nick_array.arrIndex];    

                app.global.breadcrumb.pop();
                app.global.breadcrumb.push({

                    breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rfa_management" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</a></li>'
                });
                console.log(app.global.nick_array.arr);
                app.routers.rfaRouter.prototype.rfa_management();    
            });
        this.$('#changeStato').click(function () {
            console.log("change");
               
                    var modalF="";
                  console.log(app.global.nick_array.my.color);               
                    that.$('.modal-title').text("Modifica stato");  
                    
                    modalF=
                        '<form id="modProf" >'+
                            '<div  class="row">'+

                                '<div class="form-group col-lg-6">'+
                                    '<label  >Stato</label>'+
                                    '<select  class="form-control" name="stato" id="stato" >'+
                                '</div>'+
                                                            
                                
                            '</div>'+ 
                        '</form >'
                    ;

                    $foot=  '<div  class="row">'+
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button" id="btnMod" name="btnMod" class="btn btn-primary submit col-lg-6 btn-block">Modifica stato</button>'+
                                '</div>'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button"  class="btn btn-danger col-lg-6 btn-block" data-dismiss="modal"><span aria-hidden="true">&times;</span> Annulla</button>'+
                                '</div>'+ 
                              
                            '</div>';


                    that.$(".modal-body").empty();   
                    that.$(".modal-body").append( modalF);
                    that.$(".modal-footer").empty();   
                    that.$(".modal-footer").append($foot);
                  

                
                  
                   
                    that.$("#modal").modal('show'); 
                      that.$("#modProf")[0].reset();
                    //qui
                    
                      that.$("#stato").empty();
               $aa=app.global.nick_array.my.color;
              
                $.each($aa, function(i, value) {
                    if($aa[i]["id"]=='8' ||$aa[i]["id"]=='12'){
                        that.$("#stato").append('<option value="'+$aa[i]["id"]+'" style="background-color:'+$aa[i]["color"]+'">'+$aa[i]["testo_RFA"]+'</option>');
           
                    }
                       });
             // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
              
                 that.$("#stato").val(parseInt(app.global.nick_array.arr.idStato)).css('background-color',app.global.nick_array.arr.stato_color);//
                  that.$("#stato").change(
                    function (){
                        var color = $('option:selected',this).css('background-color');
                        $(this).css('background-color',color);
                        }
                    );   


                    that.$('#btnMod').click(function(e) {//add dalle modali
                        if(that.$("#modProf").valid()){

                            //--------------------------------------------------------------
                            var API_URL = app.global.json_url + 'rfa/ordini/';
                            var jsonObj = {};
                                jsonObj.action = 'update';
                                jsonObj.type = 'rfa_stato';
                                jsonObj.id_ordine = app.global.nick_array.arr.id;
                                jsonObj.id_colore = that.$("#stato").val();
                                jsonObj.person =app.global.tokensCollection.first().get("id_person");//
                                
                            
                             jsonObj = JSON.stringify(jsonObj);
                          
                            $headers = {
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                //"username" : app.global.tokensCollection.first().get("username"),
                                "lang" : app.global.languagesCollection.at(0).get("lang"),
                                "Content-Type": "application/json"
                            };
                            
                            $.ajax({
                                url:API_URL,
                                type:'post',
                                headers : $headers,

                                data :  jsonObj,
                                //dataType: "json",
                                dataType : 'text',
                                success: function (datap) {
                                    console.log(datap);
                                    $mydata =JSON.parse(datap);

                                    //-------------------------------------------------------
                                    if ($mydata.success){
                                        bootbox.dialog({
                                            title: "Aggiornamento stato RFA",
                                            message:  $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-succes",
                                                    callback: function () {
                                                        $("body").removeClass("modal-open");
                                                        app.routers.rfaRouter.prototype.rfa_management();  
                                                    }
                                                }
                                            }
                                        });


                                    }else{
                                        
                                    }
                                }
                            });


                                that.$("#modal").modal('hide'); 
                            }else{
                            console.log("modProf invalid");  
                        }


                        });  

                  
         
        //   app.routers.router.prototype.rfa_management();    
       });
    
   
               
        window.actionEvents = {
        'click .edit': function (e, value, row) { 
            that.editProduct(row);
        },
        'click .delete': function ($element, value, row,index) { 
            console.log($element);
       
       console.log(row);
       console.log(index);
      
       
        if (confirm('Sei sicuro di voler eliminare questo Prodotto?')) {
             jsonObj = {};
                jsonObj.action = "del";
                jsonObj.type = "prodotto";
                jsonObj.id_categoria = app.global.nick_array.arr.id_categoria;
                jsonObj.id_rfa =app.global.nick_array.arr.id;
                jsonObj.id=row.id;//id prodotto
                jsonObj.person = app.global.tokensCollection.first().get("id_person");

                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                      that.loadDataProdotti(app.global.nick_array.arr.id);
                         },
                     error: function () {

                          console.log("Delete item error!");
                                        }
              });

            
        } //remove
           
    },
        'click .update': function (e, value, row,index) {//intervento

            //--------------------------------------------------------------------------

            isNew=false;

            $row=row;
            //setForm();
            app.global.nick_array.isNew=isNew; 
            app.global.nick_array.id_int=row.id; 
            app.global.nick_array.arr.int=row;
            console.log(app.global.nick_array)
            app.global.breadcrumb.push({
               breadcrumb: '<li class="breadcrumb-item active" href="" >Intervento '+row.number+'</li>'
            });
            app.global.rma_managementView.destroy_view();  

            app.routers.rfaRouter.prototype.rma_management_edit();
            //----------------------------------------------------------------------------




        },
       
        'click .viewDoc': function ($element, value, row,index) {
               
               
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="ddt";
                jsonObj.subType =app.global.nick_array.arr.id_categoria;
                jsonObj.action ="download";
                jsonObj.ddt =row.id_ddt;
                jsonObj.servizio = app.global.nick_array.arr.id_servizio;
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
        that.addDdt(row);
        },
       
        'click .downloadDoc': function ($element, value, row,index) {

            console.log(row);
            var  $uurl= app.global.json_url + 'rfa/ordini/';
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type ="ddt";
            jsonObj.subType =app.global.nick_array.arr.id_categoria;
            jsonObj.action ="download";
            jsonObj.ddt =row.id_ddt;
            jsonObj.servizio = app.global.nick_array.arr.id_servizio;

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
        'click .removeDoc': function (e, value, row,index) {

           // console.log(row);
           
            if (confirm('Sei sicuro di voler eliminare questo DDT?')) {
                jsonObj = {};
                jsonObj.action = "del";
                jsonObj.type = "ddt";
                jsonObj.id=row.id_ddt;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

               $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : "text",
                    success: function (json) {
                        $mydata =JSON.parse(json); 
                       // that.$('#lblInt-ddt').text( $mydata.data.length.toString() );
                            
                        // showAlert('Delete item successful!'+datap, 'success');
                      //  var $table=that.$("#tableDDT");
                        //  $table.bootstrapTable({ data: $mydata.data });
                      //  console.log($mydata.data);
                        //$table.bootstrapTable('load', $mydata.data);
                              that.loadDataDDT(app.global.nick_array.id);

                         },
                    error: function () {

                          console.log("Delete item error!");
                                        }
              });

            }
        } //remove
       
    };
        
        
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this;
    },
    
    assegna_intervento__:function(id){
      
            alert(id);
            // alert(_.keys(this)+"intervento assegnato!"+_.keys(_.values(e.currentTarget))+" id="+e.currentTarget);
                    
            return false; // avoid to execute the actual submit of the form.
        },
    chiudi_rma :function(e){
     alert("RMA chiusa");
    },
 
  

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
    }
})//Backbone.View.extend({
return app.views.rfa_management;
});



