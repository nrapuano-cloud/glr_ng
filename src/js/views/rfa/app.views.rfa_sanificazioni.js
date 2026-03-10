require(['app','bootbox'], function(app,bootbox){
    app.views.rfa_sanificazioni = Backbone.View.extend({
        initialize:function(){
            
            console.log("rfa_sanificazioni");
        },
        events:{},
        headerJson:function(){
            var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                // "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            return $headers;
        },
        fetchServizi:function (that){//servizi abilitati per questo utente
           that=this;
            console.log(that.tipo);
            var $selTipo=this.$("#tipo");
            var $servizioName='';
            var $servizio;
            if(this.$("#servizio1").val()){
                $servizio=this.$("#servizio1").val()
                $servizioName=this.$("#servizio1 option:selected").text()
            }else{
                $servizio=app.global.tokensCollection.first().get("id_servizio")
            }
            var jsonObj = {};
                   
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "modulo";
            jsonObj.type = "ordine"; 
            jsonObj.subtype = "sanificazioni";   
            jsonObj.servizio = $servizio;
            jsonObj.servizioname = $servizioName ;  
             
            jsonObj = JSON.stringify(jsonObj);
                
            var getServizi =  that.fetchData(jsonObj, app.global.json_url + 'rfa/ordini/',that.headerJson());
                    
            getServizi.done(function(data) {
                $mydata =JSON.parse(data);
                console.log(data);
                
                
                $aa=$mydata.data;
               
                var $selServizioX="";//la select
                if($mydata.selServizi!==""){
                   
        
                    $bb=$mydata.servizi;
                    $selServizioX=$("#servizio1");
                    $selServizioX.append('<option value="0">Seleziona</option>');
                    $.each($mydata.servizi, function(i, value) {
                        $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                    });
                    $selServizioX.val($servizio);
        
        
                    $selServizioX.change(function (e,value,row) {
                        that.$("#piani").empty();
                       console.log("change");
                        that.fetchPiani(that,$selServizioX.val());
                    });
                    that.$("#servizi label").html('Schede disponibili per il servizio');
                   
                     that.fetchPiani(that,$servizio);
                }
        
        
            });
           
                
        },//servizi abilitati per questo utente 
        fetchData:function(query, dataURL,headers){
            // Return the $.ajax promise
            return $.ajax({
                headers : headers,
                data: query,
                dataType: 'text',
                type:'post',
                url: dataURL
            });
            
        },
         fetchPiani:function (that,id_servizio){ 
            $servizio=id_servizio;
         /* if(this.$("#servizio").val()){
              $servizio=this.$("#servizio").val()
          }else{
              $servizio=app.global.tokensCollection.first().get("id_servizio")
          }*/
          var jsonObj = {};
          jsonObj.servizio =id_servizio;
          jsonObj.servizioname =that.$('#servizio1 option:selected').text();
          jsonObj.fornitore = that.$("#selFornitori").val();
          jsonObj.action = "modulo";
          jsonObj.type = "sanificazioni";
  
          jsonObj.person = app.global.tokensCollection.first().get("id_person");
          jsonObj = JSON.stringify(jsonObj);
  
          var getProdotti =  that.fetchData(
              jsonObj, app.global.json_url + 'rfa/ordini/',that.headerJson()
          );
      
          getProdotti.done(function(data) {
            
              $mydata =JSON.parse(data);
              /* varForm=varForm='<label for="selCategoria">Seleziona la Categoria</label>'+
              '<select  id="selCategoria" name="selCategoria"  class="form-control" ></select><br>'+*/
              varForm=varForm=
                      '<label ></label>'+ 
                      '<div class="row">'+
                          '<p class="toolbar">'+
  
                          '<span class="alert"></span>'+
                          '</p>'+
                          '<table id="table" class="table table-striped"> </table>'+
                      '</div>';
              $("#piani").append(varForm);
                      
                      $table=that.$("#table");
                     
                     
                      that.proTable(that,$mydata);
                      
                  });
             
           
          },
        proTable:function(that,my){
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
                if(value1["formatter"]=="imageFormatter"){
                    value1["formatter"]=imageFormatter;
                }
            }); 
            var arr = [];
            
          
          
            $table.bootstrapTable('destroy');
          
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns:true,
                showRefresh:true,
                search:true,
          
          
          
            });
          
            that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
          
          
            
                function imageFormatter(value, row) {
          return '<img src="'+value+'" />';
          }
          
          },
        askRemove:function(fornitore,id_fornitore,tipo){
            that=this;
            $tipo="";
            if(tipo=="piani"){
                $tipo=" i piani";
            }else if(tipo=="procedure"){
                $tipo=" le procedure";
            }
                bootbox.confirm({
                                   title: "Attenzione",
                                   message: "vuoi rimuovere <b>"+$tipo+" di sanificazione</b><br>"+ 
                                              "dell fornitore <b>"+fornitore+"</b>?",
                                   buttons: {
                                       cancel: {
                                           label: '<i class="fa fa-times"></i> Cancel'
                                       },
                                       confirm: {
                                           label: '<i class="fa fa-check"></i> Confirm'
                                       }
                                   },
                                   callback: function (result) {
                                      if(result){
                                           that.removeScheda(fornitore,id_fornitore,tipo);
                                      }
                                   }
                               })
        } ,
         removeScheda:function(fornitore,id_fornitore,tipo){
            var $headers = {
              "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
              "lang": app.global.languagesCollection.at(0).get("lang"),
              "Content-Type": "application/json"
          };
              console.log("remove "+tipo);
              var jsonObj = {};
              jsonObj.action = "del";
              jsonObj.type ="rfa_fornitore_sanificazioni";
              jsonObj.typeSub =tipo;
             jsonObj.id_fornitore = id_fornitore;
              jsonObj.fornitore = fornitore;
              jsonObj.id_servizio = that.$("#servizio1").val();
              jsonObj.servizioname =  that.$("#servizio1 option:selected").text();
              jsonObj.person = app.global.tokensCollection.first().get("id_person");
              jsonObj = JSON.stringify(jsonObj);


              $.ajax({
                  url:app.global.json_url + 'rfa/',
                  type:'post',
                  headers : $headers,
                  data :  jsonObj,
                  dataType : 'text',
                  success: function (datap) {
                     
                     that.fetchPiani(that,$servizio);
                  },
                  error: function () {

                      console.log("remove item error!");
                  }
              });
      } , 
      render:function(){
        $(this.el).html(this.template()); 
    // this.$(".panel-body").empty().load('./js/views/rfa/rfa_sanificazioni.html');  
   // this.$("#push").empty().load('./js/views/rfa/rfa_sanificazioni.html');  
    if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
for(i=0; i<app.global.breadcrumb.length; i++){
    this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
}
 var  $servizio='';
 console.log("render");
this.fetchServizi(this);  
var that=this;
     window.actionEvents = {
            'click .downloadPiano': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="sanificazioni";
                jsonObj.typeSub ="piani";
                jsonObj.id_ser = that.$("#servizio1").val();
                jsonObj.servizioname =  that.$("#servizio1 option:selected").text();
                jsonObj.id_fornitore = $row.id;
                jsonObj.fornitore = $row.fornitore;
               
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        var   $mydata =JSON.parse(datap);
                        var link = document.createElement("a");
                        link.download = $mydata.name;
                        // Construct the uri

                        link.href = $mydata.file;
                        document.body.appendChild(link);
                        link.click();
                        // Cleanup the DOM
                        document.body.removeChild(link);
                       
                    },
                    error: function () {

                        console.log("Download item error!");
                    }
                });

            },
            'click .viewPiano': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="sanificazioni";
                jsonObj.typeSub ="piani";
                jsonObj.id_ser = that.$("#servizio1").val();
                jsonObj.servizioname =  that.$("#servizio1 option:selected").text();
                jsonObj.id_fornitore = $row.id;
                jsonObj.fornitore = $row.fornitore;
               
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        var   $mydata =JSON.parse(datap);
                        $filex=$mydata.file;
                        // console.log(id+"=id file="+$filex);
                        // console.log(" filex="+$filex);
                       // window.location=$filex;
                         window.open($filex,'_blank');
                       
                    },
                    error: function () {

                        console.log("View item error!");
                    }
                });

            },
            'click .downloadProcedura': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="sanificazioni";
                jsonObj.typeSub ="procedure";
                jsonObj.id_ser = that.$("#servizio1").val()
                jsonObj.servizioname =  that.$("#servizio1 option:selected").text();
                jsonObj.id_fornitore = $row.id;
                jsonObj.fornitore = $row.fornitore;
               
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        var   $mydata =JSON.parse(datap);
                        var link = document.createElement("a");
                        link.download = $mydata.name;
                        // Construct the uri

                        link.href = $mydata.file;
                        document.body.appendChild(link);
                        link.click();
                        // Cleanup the DOM
                        document.body.removeChild(link);
                       
                    },
                    error: function () {

                        console.log("Download item error!");
                    }
                });

            } ,
            'click .viewProcedura': function (e, value, $row) {
              
                var $headers = {
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
                console.log("download");
                var jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type ="sanificazioni";
                jsonObj.typeSub ="procedure";
                jsonObj.id_ser = that.$("#servizio1").val()
                jsonObj.servizioname =  that.$("#servizio1 option:selected").text();
                jsonObj.id_fornitore = $row.id;
                jsonObj.fornitore = $row.fornitore;
               
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);


                $.ajax({
                    url:app.global.json_url + 'rfa/ordini/',
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        var   $mydata =JSON.parse(datap);
                        $filex=$mydata.file;
                        // console.log(id+"=id file="+$filex);
                        // console.log(" filex="+$filex);
                       // window.location=$filex;
                         window.open($filex,'_blank');
                       
                    },
                    error: function () {

                        console.log("View item error!");
                    }
                });

            } ,  
            'click .removePiano': function (e, value, $row,index) {
                that.askRemove($row.fornitore,$row.id,'piani');
                if(that.ask){
                    removeScheda($row.fornitore,$row.id,'piani');
                }
            }, 
            'click .removeProcedura': function (e, value, $row,index) {
                that.askRemove($row.fornitore,$row.id,'procedure');
                if(that.ask){
                    removeScheda($row.fornitore,$row.id,'procedure');
                }
            }, 
            'click .managementSanificazioni': function (e, value, $row) {
                console.log($row);
                var $modal =$('#modal').modal({ show: false }); 
                $tipoScheda='Piano di Sanificazione per il fornitore '+$row.fornitore;//default
                $tipoSchedaShort='piano';
                 var modalF=
                '<form id="modSchede" >'+
                    '<div  class="form-group  alle">'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value="3" name="tipoScheda" id="tipoScheda" checked >Piani</label>'+
                        '</div>'+
                        '<div class="radio-inline">'+
                            '<label><input type="radio" value="4" name="tipoScheda" id="tipoScheda">Procedure</label>'+
                        '</div>'+
                        '<div class="form-group ">'+
                             '<label class="tipoScheda">Seleziona '+$tipoScheda+'</label>'+
                             '<input type="file" name="allegato" id="allegato" class="form-input  allegato"  accept="application/pdf">'+
                        '</div>'+
                         '<div class="form-group ">'+
                            '<button type="button" id="btnScheda" name="btnScheda" class="btn btn-primary ">Add File</button>'+
                        '</div>'+
                    '</div>'+ 
                '</form >' ;
      
                $(".modal-body").empty();  
                $(".modal-footer").empty();  
                $(".modal-body").append(modalF);  
                $modal.find('.modal-title').text('Gestione Schede di Sanificazione');
                $("#modSchede").validate(); //sets up the validator
                //this.$(".modal-body").validate(); //sets up the validator
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
               
                $modal.modal('show'); 
                $('input[type="radio"]').on('change', function(e) {
                    if(e.target.value==3){
                        $tipoScheda='Piano di Sanificazione per il fornitore '+$row.fornitore;
                        $tipoSchedaShort='piano';
                    }else if(e.target.value==4){
                        $tipoScheda='Procedura di Sanificazione per il fornitore '+$row.fornitore;
                        $tipoSchedaShort='procedura';
                    }
                    $modal.find('.tipoScheda').text('Seleziona '+$tipoScheda);
                });
                $('#btnScheda').click(function(e) {
                    if($("#modSchede").valid()){
                        
                        var form_data = new FormData($("#modSchede")[0]); 
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                        form_data.append('action', 'update');
                        form_data.append('type', 'rfa_fornitore_scheda_sanificazione');
                        form_data.append('schedaTipo', $tipoSchedaShort);
                        form_data.append('id_fornitore', $row.id);
                        form_data.append('fornitore', $row.fornitore);
                        form_data.append('id_servizio', that.$("#servizio1").val());
                        form_data.append('servizio', that.$("#servizio1 option:selected").text());
                       
                        call(form_data);
                    }   
                }); 
                function call(form_data){
                    var API_URL = app.global.json_url + 'rfa/';
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

                            //--------------------------------------------------
                            if ($mydata.success){
                               // app.routers.router.prototype.data_type_edit();
                               $servizio=that.$('#servizio1').val();
                               $servizioname=that.$('#servizio1 option:selected').text();
                                console.log("ok",$servizio,$servizioname);
                                //render();
                                var $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                        "Content-Type": "application/json"
                    };
                                var jsonObj = {};
                                
        
                                jsonObj.servizio = $servizio;
                                jsonObj.servizioname = $servizioname;
                                jsonObj.fornitore = $row.id_fornitore;
                                jsonObj.action = "modulo";
                                jsonObj.type = "sanificazioni";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
                                $.ajax({
                                    url: app.global.json_url + 'rfa/ordini/',
                                    type: 'post',
                                    headers: $headers,
                                    data: jsonObj,
                                    dataType: 'text',
                                    success: function (datap) {
                                     var   $myData = JSON.parse(datap);
                                        if ($myData.success) {
                                             console.log("ok2");
                                            //hrTable($myData);
                                            $modal.modal('hide'); 
                                            that.proTable(that,$myData);
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
            }
        }  
     
       
        $(document).attr("title",app.global.app_short_name+" - "+app.global.long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        } 
    });  
 return   app.views.rfa_sanificazioni;  
});      




