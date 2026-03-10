require(['app','bootbox'], function(app,bootbox){
app.views.gap_doc_list = Backbone.View.extend({
    
    initialize:function(){
       
     	console.log("initializing gap_doc_list view")
    },

    events:{
		
        "click-row.bs.table":"gap_doc_detail_",
    
    },
    
   
    gap_doc_detail:function(e, row, $element,options){
    
    app.global.breadcrumb.push({
               
        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.tipo+' / '+row.data+'</li>'
    });
        app.global.nick_array.arr=row.name;
        app.global.nick_array.tit=row.description;
        app.global.nick_array.detail=row;
        console.log("row="+app.global.nick_array.detail.nota);

        app.routers.gapRouter.prototype.gap_doc_detail();     
  
   },

 

    render:function(){
    	$(this.el).html(this.template());
    	var API_URL = app.global.json_url + 'gap/';
        var $table=this.$('#table'),
        $selAnno=this.$("#anno"),        
        $format="",
        $notes="",
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
        var $dataOr=new Array;
        var $data=new Array();
       
       
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
       }

var that = this;
        callList();
       
        function  callList(){
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.servizio = app.global.nick_array.servizio_id;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type = "doc_inviati_servizio";
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
              
                    $format=$mydata.format;
                    $notes=$mydata.notes;
                  
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
                   
                     console.log("archive list load table error!!!");
                                   }
            });

    
    }

    function  anno($data){
        var anniDist=new Array();
        $data.data.forEach(function(item){
             console.log(item.data_evento);
             if(typeof item.data_evento !== "undefined" && item.data_evento !== null && item.data_evento !== ""){
            anniDist.push(moment(item.data_evento).format('YYYY'))
        }else{
             anniDist.push('ANNI PRECEDENTI');
        }
        });
        anniDist=_.uniq(anniDist);
        console.log(anniDist);
        anniDist.forEach(function(item){
            $selAnno.append('<option value="'+item+'">'+item+'</option>');
        });
        
         $selAnno.change(function () {
                        console.log($dataOr);
                         hrTable($dataOr);
                     });
     }
    function  hrTable(my){
        console.log(my.data);
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
        $.each(my.data, function(key, value1){
            if(typeof( value1['data_doc']) !== "undefined" && value1['data_doc'] !== null && value1['data_doc'] !== ""){    
                value1['data_docT']='<span>'+moment(value1['data_doc']).format('YYYYMMDD')+'</span>'+moment(value1['data_doc']).format('DD/MM/YYYY');
               // item.data_evento=moment(item.data_evento).format('DD/MM/YYYY');
                }else{value1['data_docT']=""}
            if(typeof(value1['modified']) !== "undefined" && value1['modified'] !== null && value1['modified'] !== ""){    
                value1['dataT']='<span>'+moment(value1['modified']).format('YYYYMMDD')+'</span>'+moment(value1['modified']).format('DD/MM/YYYY');
                //item.data=moment(item.data).format('DD/MM/YYYY');
                }else{value1['dataT']=""}
                
        });
       console.log(my.data);
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
           
            pagination:false
            
            
        
        
        });
       that.$("#info").html("Ci sono "+my.data.length+" documenti");
          console.log(my.data);
        }
    function actionFormatter(value) {
        return [$format
                 ].join('');
    }   
     
        // update and delete events
        window.actionEvents = {
            'click .download': function (e, value, row,index) {
                //app.global.nick_array.id=row.id;
            	console.log(row.id_person+"index"+index)  ;  	
                console.log($mydata.data)  ;  
                console.log("row="+_.keys(row))  ; 
                
                console.log("id="+row.id_archivio);
                
                jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type = "doc_inviati";
                jsonObj.id=row.id;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        console.log($mydata);
                        var link = document.createElement("a");
                        link.download = $mydata.name;
                        // Construct the uri

                        link.href = $mydata.link;
                        document.body.appendChild(link);
                        link.click();
                        // Cleanup the DOM
                        document.body.removeChild(link);
                    //  window.open($mydata.file,'_blank');
                     //   window.location.href=$mydata.file;



                         },
                     error: function () {

                          console.log("Download item error!");
                                        }
              });

               
               
               
            },
            
            'click .view': function (e, value, row,index) {
              console.log(row.id_person+"index"+index)  ;  	
                console.log($mydata.data)  ;  
                console.log("row="+_.keys(row))  ; 
                
                console.log("id="+row.id_archivio);
                
                jsonObj = {};
                jsonObj.action = "download";
                jsonObj.type = "doc_inviati";
                jsonObj.id=row.id;
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj = JSON.stringify(jsonObj);

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        console.log($mydata);
                       
                   window.open($mydata.link,'_blank');
                    // window.location.href=$mydata.link;
                    
                      



                         },
                     error: function () {

                          console.log("Download item error!");
                                        }
              });

               
               
            },
            'click .remove': function (e, value, row,index) {
                console.log("id="+row.id_archivio);
                if (confirm('Are you sure to delete this item?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "archivio";
                    jsonObj.id=row.id_archivio;
                    jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
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
            }//remove    
            
        };
  
        
        
       
        
        function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }   
console.log(app.global.long_name);

           $(document).attr("title",app.global.app_short_name+" - "+app.global.long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.archiveView=null;
            app.global.nick_array.arr=null
        }
      })//Backbone.View.extend({
return app.views.gap_doc_list;
    });


