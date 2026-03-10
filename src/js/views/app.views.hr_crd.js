require(['app','bootbox'], function(app,bootbox){
app.views.hr_crd = Backbone.View.extend({
       
    
    
    initialize:function(){
    

    	console.log("initializing hr_crd view")},

    	events:{
		 'submit':  'send_'
		
    
  },
    
   
   
    render:function(e){
     
     
        $(this.el).html(this.template());
        var $headers={};
    	var $mydata=[];
    	var API_URL = app.global.json_url + 'persons/';
        var $selDep=this.$("#department");
        var $table=this.$('#table');//.bootstrapTable({url: API_URL}),
        var $modal = this.$('#modal').modal({show: false}),
            $alert = $('.alert').hide();
        var $titleReparto="";
    
       
       if(app.global.breadcrumb.length>1){
        app.global.breadcrumb.pop();
       }
       for(i=0; i<app.global.breadcrumb.length; i++){
       this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
       }
      this.$("#new").html(this.language.new);
    // this.$(".active").html(app.global.breadcrumb);
   var that = this;
        callList("Tutti");
       
        function  callList($typeReparto){
      
            var $action="list";
            var $type="coordinators";
            var $person=app.global.tokensCollection.first().get("id_person");
            
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            console.log("API_URL="+API_URL);
            $.ajax({
                url:API_URL+$action+"/"+$type+"/"+$person+"/"+$typeReparto+"/",
                type:'get',
                headers : $headers,
                //data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                   $mydata =JSON.parse(datap);
                  // $mydata =(datap);
                 
                  console.log( ($mydata.message));
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
                   
                     console.error("hr list load table error!!!");
                                   }
            });

    
    }

     this.$('input[type="radio"]').on('change', function(e) {
            //$('#manutenzione').change(function (e) {
          // alert(_.keys(e)+" - "+" - "+$('input[name=manutenzione]:checked').val()); 
            if(e.target.value==1){
               this.$titleReparto="In Infanzia ci sono ";
              //$('#titleTipo').text("In Infanzia ci sono ");
               callList("Infanzia");
               
               
            }else if(e.target.value==2){
              titleReparto="In Sociale ci sono "; 
              //that.$('#titleTipo').text("In Sociale ci sono ");
               callList("Sociale");
              
            }else if(e.target.value==3){
                titleReparto="In Tecnostruttura ci sono ";
                // $('#titleTipo').text("In Tecnostruttura ci sono "); 
                callList("Tecnostruttura");
              
            }else if(e.target.value==4){
                titleReparto="Complessivamente ci sono ";
                //$('#titleTipo').text("Complessivamente ci sono "); 
                callList("Tutti");
            }
               
        });
     
    
    function  hrTable(my){
        c1=' <button href="'+my.fileName+'.xlsx" title="Excel" type="button" class="btn " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
          // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
        this.$("#downFile").empty();  
        this.$("#downFile").append(c1); 
        this.$('#excel').click(function () {
        id=this.id;
        
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
        excel(this.id,'coordinatori '+datestring+'.xlsx');

    });
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({data: my.data});
        
        console.log(my.data);
           $table.bootstrapTable('destroy');
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
                });
                $detail.append( 
                        '<div class="form-group col-sm-2">'+
                            '<label  class="label" ><span class="badge">Servizio </span> <a style="cursor: pointer;" class="addServizio" data-toggle="modal" data-target="#modal"  data-idCoordinatore="'+row["id"]+'" data-nomeCoordinatore="'+row["name"]+'" title="Aggiungi Servizio"><i class="glyphicon glyphicon-plus"></span>'+
                        '</div>');
                $.each(row.servizi, function( key, value1 ){
                           
                          
                        $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label"><span class="badge">Servizio '+(key+1)+'</span>   <a class="removeServizio" idServizio="'+value1["id"]+'" nomeS="'+value1["name"]+'" idCoordinatore="'+row["id"]+'" nomeCoor="'+row["name"]+'" href="javascript:" title="Rimuovi Servizio"><i class="glyphicon glyphicon-remove"></i></a></label>'+
                                '<input type="text" class=" form-control"   readonly    value="'+value1["name"]+' ('+value1["comune"]+')">'+

                            '</div>');
                       
                });
                 $('.addServizioo').click(function () {
          
        alert("so qui="+' idCoor='+ $(this).attr("idCoordinatore"));	
            
        });
        $('.removeServizio').click(function () {
                    
        
                 if (confirm('Sei sicuro di voler togliere il Servizio '+ $(this).attr("nomeS")+' al Coordinatore '+ $(this).attr("nomeCoor")+'?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "coordinatore";
                    jsonObj.coordinatore=$(this).attr("idCoordinatore");
                    jsonObj.servizio=$(this).attr("idServizio");
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:app.global.json_url+'persons/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $mydata =JSON.parse(datap);
                            if ($mydata.success){
                                bootbox.dialog({
                                    title: "Cancellazione del Servizio al Coordinatore ",
                                    message: "Cancellazione del  Servizio dal Coordinatore eseguita correttamente",
                                    buttons: {
                                        main: {
                                            label: that.language.label_button,
                                            className: "btn btn-success",
                                            callback: function() {
                                                $table.bootstrapTable('refresh',  callList("Tutti"));
                                            }
                                        }
                                    }
                                });
                           
                           //showAlert('Delete item successful!'+datap, 'success');
                           //  $table.bootstrapTable('refresh',  callList("Tutti"));

                            }
                            else {
                
                                bootbox.dialog({
                                    title: $mydata.title,
                                    message: $mydata.message,
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
                       $table.bootstrapTable('refresh',  callList("Tutti"));
                },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            }); //remove
            //-------------------------------------------------------------------------
        $('#modal').on('show.bs.modal', function (event) {
                $role = app.global.tokensCollection.first().get("id_person");
        
                $action = "list";
                jsonObj = {};
                jsonObj.role = app.global.tokensCollection.first().get("id_person");
                jsonObj.action = "list";     
                $type ="department";
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                    url:app.global.json_url+'persons/list/'+ $type+"/"+$role+"/Tutti/",
                    type:'get',
                    headers : $headers,
                    // data: jsonObj,
                    dataType : 'text',
                    success: function (json) {
                        $mydata =JSON.parse(json);
                        $selDep.empty();

                        $aa=$mydata.data;
                        $selDep.append('<option value="0"></option>');
                        $.each($aa, function(i, value) {
                            $selDep.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+')</option>');
                        });
                    },
                    error: function () {
                    bootbox.dialog({
                        title: $mydata.title,
                        message: $mydata.title + ' : ' +$mydata.message,
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

                });
                
                var button = $(event.relatedTarget);
              
                var title = button.data('nomecoordinatore');
                var idx = button.data('idcoordinatore');
               
                var modal = $(this);
                modal.find('#lblName').text( title);
                modal.find('#idCoordinatore').val( idx);
              
            })
            
            
            
            },
            showColumns:true,
            showRefresh:true,
            search:true,
            pagination:false
           
           
        });
      
    $('#titleTipo').text($titleReparto+my.data.length+" persone.");
    
    
    
    
    
    
    }
 //------------------------------------------------------------------------       
    function excel(id,file){
        console.log("file="+file);
        console.log("id="+id);
        var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
        console.log( "dataKeys="+_.keys($('#table').bootstrapTable('getData')));
        $fields = $('#table').bootstrapTable('getVisibleColumns').map(function (column) {
            return column.title;
        });
     $fieldsIndex = $('#table').bootstrapTable('getVisibleColumns').map(function (column) {
        return column.field;
    });
    arTable=$('#table').bootstrapTable('getData');
    console.log( arTable);
    console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
    for(i=0 ; i< arTable.length; i++){
      row = {};
        for(j=0 ; j< $fields.length; j++){
           console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
            row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
        }
        $ar.push(row);   
     }
 
    var jsonObj = {};
  
    var  $uurl= app.global.json_url + 'persons/excel/';
    //jsonObj.nameQuery =$NameQuery;
    jsonObj.table =arTable;
     jsonObj.person = app.global.tokensCollection.first().get("id_person");
    jsonObj.doc =id;
    //jsonObj.objParT =$arT;
    jsonObj.file =file;
    jsonObj = JSON.stringify(jsonObj);
   
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
           window.location=$filex;
           //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
        }
                
    });

}  
 
        
  
     // create event
        

        this.$('.create').click(function () {
          
        	 app.global.nick_array.hr="New";
        	 app.global.hrView.destroy_view();  
        	 app.routers.hrRouter.prototype.hr_edit();
            
        });
        
     
        // update and delete events
        window.actionEvents = {
            'click .update': function (e, value, row,index) {
                app.global.nick_array.id=row.id;
            	console.log(row.id_person+"index"+index)  ;  	
                console.log($mydata.data)  ;  
                console.log("row="+_.keys(row))  ;  
                var	$arrByID=row;
            	     // alert(row.id+"lastn:"+_.values($mydata.data[0])+ _.values($arrByID[0]) );
            	    app.global.nick_array.data=row;
            	   app.global.nick_array.hr=row.last_name;
            	console.log(row.last_name)  ;
                console.log("lastn:"+row.last_name+app.global.nick_array.data.last_name);
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.last_name+'</li>'
                 });

                	app.global.hrView.destroy_view();  
                 
             
             
               app.routers.hrRouter.prototype.hr_edit({});
               
            },
            'click .remove': function (e, value, row,index) {
        console.log("id="+row.id);
                 if (confirm('Sei sicuro di voler eliminare questo Coordinatore?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "coordinators**";
                    jsonObj.id=row.id;
                    jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
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
            } //remove
       
       
        
       
        };
        
    //---------------------------------------------------------------------------------------
            
        $modal.find('.submit').click(function () 
            {
            var row = {};

            $modal.find('input[name]').each(
            function () {
                     console.log($(this).attr('name')+"="+ $(this).val()); 
                     row[$(this).attr('name')] = $(this).val(); 
                     
                 });
             $modal.find('select[name]').each(
            function () {
                     console.log($(this).attr('name')+"="+ $(this).val()); 
                     row[$(this).attr('name')] = $(this).val(); 
                     
                 });    
           
                         
            var jsonObj = {};
            jsonObj.type = "coordinatore";
            jsonObj.action = "update";    
            jsonObj.servizio = row.department;
            jsonObj.coordinatore = row.idCoordinatore;
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
               url:app.global.json_url+'persons/',
               type:'post',
               headers : $headers,
               data :  jsonObj,
               dataType : 'text',
               success: function (datap) {
                  console.log(datap.data);
                    $mydata =JSON.parse(datap);
                  // $mydata =(datap);
                 
                  console.log( ($mydata.message));
            //-------------------------------------------------------
                if ($mydata.success){
                    $modal.modal('hide');
                     bootbox.dialog({
                        title: "Associazione del Servizio al Coordinatore ",
                        message: "Associazione del Servizio al Coordinatore eseguita correttamente",
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-success",
                                callback: function() {
                                    $table.bootstrapTable('refresh',  callList("Tutti"));
                                }
                            }
                        }
                    });
                     //  showAlert('Il Servizio è stato associato al Coordinatore correttamente!', 'success');
                     
                  // $table.bootstrapTable('refresh',  callList("Tutti"));
                     //  hrTable($mydata);
                }
                else {
                
                    bootbox.dialog({
                        title: $mydata.title,
                        message: $mydata.message,
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
                      console.log("refre");
                       $table.bootstrapTable('refresh',  callList("Tutti"));
                }
                    
                    
                   
                
                    },
                error: function () {
                   
                     console.error("hr list load table error!!!");
                                   }
            });

    
    

    
           
        
});
//-----------------------------------------------------------------------------------------
    function refresh(){
        $.get(API_URL, function(datap, message){
            $mydata =JSON.parse(datap);
            $table.bootstrapTable('load', $mydata.data);
        }); 
    } 
        
    function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }   
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    
    
   


        destroy_view:function(){
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
            
        app.global.hr_crdView=null;
            
           
        }
      })//Backbone.View.extend({
   return app.views.hr_crd ;
    });



