require(['app','bootbox'], function(app,bootbox){
app.views.rma_int_fatti = Backbone.View.extend({
       
    initialize:function(){
     	console.log("initializing rma_int_fatti view")},

    	events:{
             "click-row.bs.table":"rma_detail--",
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
             initialDate:'+0d'
          
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
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "intervento";
            jsonObj.dataDa =moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataA = moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD');
                      
            
            jsonObj = JSON.stringify(jsonObj);
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
           
   $.ajax({
            url:API_URL+"fatti/",
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
                        title: $mydata.title,
                        message:  $mydata.message,
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
        var columns = [];
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
               value1["data_prevista"]=moment(value1["data_prevista"]).format('DD/MM/YYYY');
               
            }
            if(typeof(value1["data_intervento"]) !== "undefined" && value1["data_intervento"] !== null){ 
           
               value1["data_intervento"]=moment(value1["data_intervento"]).format('DD/MM/YYYY');
               
            }
            if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                value1["data_effettuataT"]='<span>'+moment(value1["data_effettuata"]).format('YYYYMMDD')+'</span>'+moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                value1["data_effettuata"]=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
              
            }
           
            if(typeof(value1["data_chiusura_richiesta"]) !== "undefined" && value1["data_chiusura_richiesta"] !== null){       
           
             
               value1["data_chiusura_richiesta"]=moment(value1["data_chiusura_richiesta"]).format('DD/MM/YYYY');
               
            }
             
            if(value1["manutenzione"]==="1"){value1["manutenzioneL"]="Interna";}
            if(value1["manutenzione"]==="2"){value1["manutenzioneL"]="Ditta Esterna";}
            if(value1["manutenzione"]==="3"){value1["manutenzioneL"]="Committente";}
                

        });   
 
        
        $table.bootstrapTable({
          
          columns: my.tab,
            //columns:columns,
            data: my.data,
            detailView:true,
            onExpandRow: function (index, row, $detail) {
                $table.find('.detail-view').each(function () {
                    if (!$(this).is($detail.parent())) {
                        $(this).prev().find('.detail-icon').click()
                    }
                })
                //$detail.html(row.timestamp);
               
                $detail.append(
                    
                    //'<div class="row">'+
                     
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:white;background-color:'+my.color[2].color+';"  for="name">Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descr_richiesta+'" data-title="Data richiesta RMA '+row.data_richiesta+'" data-image="'+row.link_immagine+'" value="'+row.data_richiesta+'">'+

                        '</div>');
                            
                        if(typeof( row.data_assegnazione) !== "undefined" && row.data_assegnazione !== null){  
                            $data_ass=row.data_assegnazione;
                            $descrIz=row.descrizione;
                            $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:White;background-color:'+my.color[7].color+';">Data assegnazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento assegnato il '+$data_ass+'" data-image=""  value="'+$data_ass+'">'+

                            '</div>');
                        }
                        if(typeof( row.data_prevista) !== "undefined" && row.data_prevista !== null){  
                                $data_pre=row.data_prevista;
                                $descrIz=row.descrizione;
                                 
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[7].color+';">Data prevista intervento</label>'+
                           // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  data-image="" readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento assegnato il '+$data_pre+'" value="'+$data_pre+'">'+

                        '</div>');
                        }
                        if(typeof(row.data_effettuata) !== "undefined" && row.data_effettuata !== null){
                       $data_eff=row.data_effettuata;
                       $descrIz=row.descrizione_chiusura;
                        $detail.append( varForm=
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:White;background-color:'+my.color[6].color+';">Data intervento</label>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'"   data-title="Intervento assegnato il '+$data_eff+'" data-image="'+row.link_immagine_chiusura+'" value="'+$data_eff+'">'+

                        '</div>');
                        }
                   
                         if(typeof(row.data_chiusura_richiesta) !== "undefined" && row.data_chiusura_richiesta !== null){ 
                            
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:White;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+
                             
                             '<input type="text"  class="form-control" data-toggle="modal" data-target="#modal" data-descr="'+row.descr_chiusura_richiesta+'"   data-title="Data chiusura RMA '+row.data_chiusura_richiesta+'" data-image="" value="'+row.data_chiusura_richiesta+'"  readonly >'+

                        '</div>');
                        }
               
                   
                   
                $('#modal').on('show.bs.modal', function (event) {
                   
                var button = $(event.relatedTarget)
                var title = button.data('title')
                var bodyMes = button.data('descr')
                var image = button.data('image')
                
                var modal = $(this)
                
                modal.find('.modal-title').text( title)
                modal.find('.modal-body textarea').val(bodyMes)
                modal.find('.modal-body img').attr('src', image)
            });
                
                
                function showModal(title, row) {
       
      
    // // default row value
    console.log("title=" + title + " row=" + _.keys(row)+_.values(row));
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
            pagination:false
           
           
        });
        
            console.log(my.data);
            
             
               
       
            
        }
       
    
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
        });
        
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
   return app.views.rma_int_fatti;
    });



