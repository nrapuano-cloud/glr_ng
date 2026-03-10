require(['app','bootbox'], function(app,bootbox){
app.views.rfa_vag = Backbone.View.extend({//visualizza acquisto diretto
       
    initialize:function(){
     	console.log("initializing rfa_vag view");
        var jsonObj = {};
         var that=this;  
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

    events:{
             "click-row.bs.table":"rfa_detail_"
             
	   
        },
    
    
    rfa_detail:function(e, row, $element,options,xx){
    
      
        app.global.breadcrumb.push({
               
        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.num_prog+" del "+row.data_richiesta+'</li>'
    });
        app.global.nick_array.arrSearchText=this.$('#table').bootstrapTable('getOptions').searchText;
        app.global.nick_array.arrIndex=$element[0].attributes[0].nodeValue;
        app.global.nick_array.arrTable=this.$('#table').bootstrapTable('getData');
        app.global.nick_array.arr=app.global.nick_array.arrTable[$element[0].attributes[0].nodeValue];
    
     
        app.routers.rfaRouter.prototype.rma_detail();               //chiama la pagina data_type_edit
  
   },
    callList: function  (){
           
            var jsonObj = {};
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "vag";          
            
            jsonObj = JSON.stringify(jsonObj);
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
          
         that=this;  
        $.ajax({
            url:app.global.json_url + 'rfa/ordini/',
            type:'post',
            headers : this.headerJson(),
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
                    that.hrTable($mydata);
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

    
    },
    hrTable: function  (my){
        var $table=this.$('#table');
        console.log(my);
        var columns = [];
        $table.bootstrapTable('destroy');
         that=this;   
                      
        $.each( my.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=that.cellStyle;
            }
             if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
            }
          
        });   
        
        $.each( my.data, function( key, value1 ){
          
            if(typeof(value1["data_acquisto"]) !== "undefined" && value1["data_acquisto"] !== null){   
                value1["dateT"]='<span>'+moment(value1["data_acquisto"]).format('YYYYMM')+'</span>'+moment(value1["data_acquisto"]).format('MM/YYYY');
                value1["data_acquisto"]=moment(value1["data_acquisto"]).format('MM/YYYY');
               
            }
            
           
             

        });   
 
        
        $table.bootstrapTable({
          
            columns: my.tab,
            //columns:columns,
            data: my.data,
                    
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
        this.callList();
       
    

    
    
       
   
        window.actionEvents = {
            'click .downloadDoc': function ($element, value, row,index) {
                that=this;
                console.log(row);
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="ag";//acquisto giornaliero
                jsonObj.action ="download";
                jsonObj.id =row.id;
               
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
            'click .managementRFA': function ($element, value, row,index) {
                app.global.nick_array.id=row.id;
              
            	
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rfa_management" >'+row.num_prog+ " del "+row.data_richiesta+'</a></li>'
                   //    breadcrumb: '<li><a class="breadcrumb-item active" href="#it/rma_management" >'+row.num_prog+ " del "+row.data_richiesta+'</a></li>'
        
                });

                  
                //------------------------------------------------------------------------------------
                app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
                app.global.nick_array.arrIndex=index;
                app.global.nick_array.arrTable=$('#table').bootstrapTable('getData');
                app.global.nick_array.arr=app.global.nick_array.arrTable[index];
               
                app.global.rfa_viewView.destroy_view();  
                app.routers.rfaRouter.prototype.rfa_management({});
              
               
            },
            'click .remove': function (e, value, row,index) {
                console.log("id="+row.id);
                if (confirm('Sei sicuro di voler eliminare questo  Acquisto Giornaliero?')) {
                    jsonObj = {};
                    jsonObj.action = "del";
                    jsonObj.type = "ag";
                    jsonObj.id=row.id;
                   jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:app.global.json_url + 'rfa/ordini/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $dec=JSON.parse(datap)
                            alert($dec.message, 'success');
                            that.callList();
                        },
                        error: function () {

                              console.log("Delete Acquisto Giornaliero error!");
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
     
        
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
   

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
return app.views.rfa_vag;
    });


