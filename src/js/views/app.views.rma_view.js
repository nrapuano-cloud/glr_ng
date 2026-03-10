require(['app','bootbox'], function(app,bootbox){
app.views.rma_view = Backbone.View.extend({
       
    initialize:function(e,$type){
          this.type=$type;
     	console.log("initializing rma_view view",$type)
       // localStorage.removeItem("dataDa");
       // localStorage.removeItem("dataA");
        //this.auth();
    },
      
    events:{
        "click-row.bs.table":"rma_detail",
        "click #reqRMA":"setRequest",
        "changeDate .pic1":"changeDate1",
        "changeDate .pic2":"changeDate2",
        "change #cbRA":"changeCbRA",
        "change #cbIA":"changeCbIA",
        "change #cbIC":"changeCbIC",
        "change #cbRS":"changeCbRS",
        "change #servizio":"changeServizio",
        "search.bs.table":"searchTable"
        


    },
    changeServizio:function(e){
            localStorage.setItem("selServizio", this.$('#servizio').val());
        }, 
    searchTable:function(e,text){
        console.log(text);
        localStorage.setItem("search", text);
        //app.global.nick_array.arrSearchText=text;
        
    },
    changeCbRA:function(e){
            localStorage.setItem("cbRA", this.$('#cbRA').is(":checked"));
        }, 
    changeCbIA:function(e){
        localStorage.setItem("cbIA", this.$('#cbIA').is(":checked"));
    }, 
    changeCbIC:function(e){
        localStorage.setItem("cbIC", this.$('#cbIC').is(":checked"));
    }, 
    changeCbRS:function(e){
        localStorage.setItem("cbRS", this.$('#cbRS').is(":checked"));
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
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
            
            
        };
        return $headers;
    },
    auth:function(){
        
        var API_URL = app.global.json_url + 'api/auth';
        var jsonObj = {};
    $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };      
           
   $.ajax({
            url:API_URL,
            type:'get',
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
                  //  that.hrTable($mydata);
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
            }});
    },
    setRequest:function(e){
        if (this.$('#servizi').is(':empty')){
            that=this;
           console.log('servizi è vuoto');
             $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,

                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
           var API_URL = app.global.json_url + 'types/';
            var jsonObj = {};
          
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type ='servizi';
            jsonObj.action ='list';
              jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data: jsonObj,
               
                success: function (json) {
                  
                    $mydata =JSON.parse(json);
                    console.log($mydata.success,$mydata);
                    if ($mydata.success){
                      
                       
                        if($mydata.selServizi!==""){
                            $.when(that.$("#servizi").append($mydata.selServizi)).then( function(){
                                $bb=$mydata.data;
                                $("#servizio").append('<option value="0">Tutti i servizi</option>');
                                $.each($bb, function(i, value) {
                                    $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                                });
                                if(localStorage.getItem("selServizio")!=="" && localStorage.getItem("selServizio")!==null){
                                    console.log("servizio="+localStorage.getItem("selServizio"));
                                    $('#servizio').val(localStorage.getItem("selServizio")).change();

                                }
                                 callList(that);
                            });
                           
                        }

                       
                    }else {
                        callList(that);
                       
                    }
                },
                error: function () {
                   
                   
                }
                
            });
        }else{
            if(localStorage.getItem("selServizio")!=="" && localStorage.getItem("selServizio")!==null){
                console.log("servizio="+localStorage.getItem("selServizio"));
                $('#servizio').val(localStorage.getItem("selServizio")).change();

            }
            callList(this);  
          }      
        //app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
        console.log(this.$("#servizio").val());
        console.log(this.$('#cbRA').is(":checked"));
        console.log(this.$('#cbRC').is(":checked"));
        console.log(this.$('#cbIA').is(":checked"));
        console.log(this.$('#cbIC').is(":checked"));
        console.log(this.$('#cbRR').is(":checked"));
        console.log(this.$('#cbRS').is(":checked"));
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
        that=this;
       // callList(that);
        function  callList(that){
            var API_URL = app.global.json_url + 'rma/list/req/';
            var jsonObj = {};
            var data1=moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            console.log(data1,that.$('#servizi').is(':empty'));
            if (that.$('#servizi').is(':empty')){}else{
                jsonObj.servizio =that.$("#servizio").val();
            }
            jsonObj.servizio =that.$("#servizio").val();
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.dataDa =moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataA = moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataCb=[that.$('#cbRA').is(":checked"),that.$('#cbIA').is(":checked"),that.$('#cbIC').is(":checked"),that.$('#cbRS').is(":checked"),that.$('#cbRC').is(":checked"),that.$('#cbRR').is(":checked")]
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

       
    },
    hrTable:function(my){
        hrTable(my);
        function hrTable(my){
        console.log(my);
        var columns = [];
        var $table=this.$('#table');
        $table.bootstrapTable('destroy');
                 
        columns.push({
            field: "data_richiesta",
            title: 'Data Richiesta',              
            sortable: true
                        });
        columns.push({
            field: "servizio",
            title: 'Servizio',              
            
            sortable: true
                        });
        
        columns.push({
            field: "utente",
            title: 'Referente',              
            
            sortable: true
                        });
        columns.push({
            field: "categoria",
            title: 'Categoria',              
            
            sortable: true
                        });                
        columns.push({
            field: "stato",
            title: 'Stato',              
            cellStyle: cellStyle, 
            sortable: true
                        });  
        columns.push({
            field: "action",
            align:"center",
            formatter:actionFormatter,
            events:actionEvents
           
                        });      
                      
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
                value1["dateT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDD')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
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
          
              if(typeof(value1["data_chiusura"]) !== "undefined" && value1["data_chiusura"] !== null){       
           
             
               value1["data_chiusura"]=moment(value1["data_chiusura"]).format('DD/MM/YYYY');
               
            }

        });   
 
            this.$('#lblCounter').text('Trovate '+my.data.length+' RMA');
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
                var API_URL = app.global.json_url + 'rma/list/req/intervento/';
                var jsonObj = {};
                var $intervento = {};
            
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.idRma =row.id;
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
                    dataType : 'text',
                    success: function (datap) {

                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata));
                        //-------------------------------------------------------
                        if ($mydata.success){
                            row.interventi=$mydata.data;
                        $intervento=$mydata.data;
                        
                            detApp($intervento)
                        }else{

                        }
                    },
                    error: function () {

                    }
                });
                function detApp($intervento){
                console.log($intervento);  
                $detail.append(
                        
                        //'<div class="row">'+
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[2].color+';"  for="name">Data richiesta</label>'+
                                
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descrizione+'" data-title="Data richiesta RMA '+row.data_richiesta+'" data-image="'+row.link_immagine+'" value="'+row.data_richiesta+'">'+

                            '</div>');
                            //console.log("row="+row.interventi[0]["data_assegnazione"]);
                            $.each($intervento, function( key, value1 ){
                                console.log("row="+value1["data_assegnazione"]);
                            
                            

                            
                            
                            if(typeof( value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){  
                                $data_ass=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
                            $descrIz=_.unescape(value1["descrizione"]);
                                
                                $detail.append(
                                '<div class="form-group col-sm-3">'+
                                    '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data assegnazione</label>'+
                                    '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_ass+'" value="'+$data_ass+'">'+

                                '</div>');
                            }
                            if(typeof( value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){  
                                    $data_pre=moment(value1["data_prevista"]).format('DD/MM/YYYY');
                                    $descrIz=_.unescape(value1["descrizione"]);
                                    console.log("row="+value1["data_assegnazione"]);
                                $detail.append( 
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data prevista intervento</label>'+
                            // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' previsto per il '+$data_pre+'" value="'+$data_pre+'">'+

                            '</div>');
                            }
                            if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                        $data_eff=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                        $descrIz=_.unescape(value1["descrizione_chiusura"]);
                        $link_img=_.unescape(value1["link_immagine"]);
                            $detail.append( varForm=
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[6].color+';"><span class="badge">'+(key+1)+'</span> Data intervento</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' effettuato il '+$data_eff+'" data-image="'+$link_img+'" value="'+$data_eff+'">'+

                            '</div>');
                            }
                        });
                            if(typeof(row.data_chiusura) !== "undefined" && row.data_chiusura !== null){ 
                                
                                $detail.append( 
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+
                                
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+_.unescape(row.descrizione_chiusura)+'" data-title="Data chiusura RMA '+row.data_chiusura+'" value="'+row.data_chiusura+'">'+

                            '</div>');
                            }
                }
                $("#modal").on('hide.bs.modal', function(event){
                  
                  console.log('The modal is about to be hidden.');
                
                 // return event.preventDefault();
                  });   
                    
                $('#modal').on('show.bs.modal', function (event) {
                  //  event.preventDefault();
                    var image,$hrefLabel,$href = "";
                    var multiple=[];
                    var button = $(event.relatedTarget);
                    var title = button.data('title');
                    var bodyMes = button.data('descr');
                    var modal = $(this);
                    $('#modal .modal-body').empty().append(
                        '<h3 id="myModalLabel"></h3>'+
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
                                    '<a   href="'+$res[0]+'" target="_blank">'+
                                       element.nome_originale+ '</a></div>'+
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
                                '<a   href="'+$res[0]+'" target="_blank">'+
                                   row.nome_originale+ '</a></div>'+
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
                trimOnSearch:false,
                searchText:localStorage.getItem("search"),
                pagination:false,
            
            
            
            });
           // $table.bootstrapTable('hideColumn', 'ubicazione');
        
            console.log(my.data);
            
             
               
       
            
        }
       
        function queryParams1 (params) { 
            console.log(params.search);

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
    },
    rma_detail:function(e, row, $element,options,xx){
    
      
        app.global.breadcrumb.push({
               
        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.num_prog+" del "+row.data_richiesta+'</li>'
    });
        app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
        app.global.nick_array.arrIndex=$element[0].attributes[0].nodeValue;
        app.global.nick_array.arrTable=this.$('#table').bootstrapTable('getData');
        app.global.nick_array.arr=app.global.nick_array.arrTable[$element[0].attributes[0].nodeValue];
    
     
        app.routers.rmaRouter.prototype.rma_detail();               //chiama la pagina data_type_edit
  
   },
   
    render:function(){
    	$(this.el).html(this.template());
        console.log(this.type);
        var API_URL = app.global.json_url + 'rma/list/req/';
        var $table=this.$('#table'),
        $selServizio=this.$("#servizi");
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        if(app.global.nick_array.arrSearchText==null){app.global.nick_array.arrSearchText=""};
        this.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
               
                initialDate:'-4m'
                
            
            });
        this.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
              
            }); 
        
        this.$('#datetimepicker1').datetimepicker('setStartDate', '2018-01-01');
        this.$('#datetimepicker1').datetimepicker('setEndDate','-1w');
        this.$('#datetimepicker2').datetimepicker('setStartDate',this.$('#datetimepicker1').data("datetimepicker").getDate());
        this.$('#datetimepicker2').datetimepicker('setEndDate','+0d');
        // this.$('#dataTemp1').val( this.$('#datetimepicker1').datetimepicker('initialDate').toString());
        console.log(localStorage.getItem("dataDa")); 
        if(localStorage.getItem("dataDa")!=="" && localStorage.getItem("dataDa")!==null){
            
             this.$('#dataTemp1').val(moment(localStorage.getItem("dataDa")).format('DD/MM/YYYY'));
             this.$('#datetimepicker1').datetimepicker('update');
     
         }else {
             this.$('#dataTemp1').val(moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('DD/MM/YYYY'))
             this.$('#datetimepicker1').datetimepicker('update');
         } 
        if(localStorage.getItem("dataA")!=="" && localStorage.getItem("dataA")!==null){
             
             this.$('#dataTemp2').val(moment(localStorage.getItem("dataA")).format('DD/MM/YYYY'));
             this.$('#datetimepicker2').datetimepicker('update');
         }else {
             this.$('#dataTemp2').val(moment(this.$('#datetimepicker2').data("datetimepicker").getDate()).format('DD/MM/YYYY'))
             this.$('#datetimepicker2').datetimepicker('update');
         }  
       
        if(localStorage.getItem("cbRA")!=="" && localStorage.getItem("cbRA")!==null){
         var $AA=localStorage.getItem("cbRA")==="true"?true:false;
           this.$('#cbRA').prop('checked', $AA);
           
        }
        if(localStorage.getItem("cbIA")!=="" && localStorage.getItem("cbIA")!==null){
              var $AA=localStorage.getItem("cbIA")==="true"?true:false;
           this.$('#cbIA').prop('checked', $AA);
        }
        if(localStorage.getItem("cbIC")!=="" && localStorage.getItem("cbIC")!==null){
            var $AA=localStorage.getItem("cbIC")==="true"?true:false;
           this.$('#cbIC').prop('checked', $AA);
        }
        if(localStorage.getItem("cbRS")!=="" && localStorage.getItem("cbRS")!==null){
             var $AA=localStorage.getItem("cbRS")==="true"?true:false;
           this.$('#cbRS').prop('checked', $AA);
        }
         
              
        this.setRequest();
        var that = this;
        
        // callList();
       
        function  callList(){
           
            var jsonObj = {};
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
           // jsonObj.dataDa =moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY/MM/DD');
          //  jsonObj.dataA = moment(this.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY/MM/DD');
            jsonObj.dataCb=[this.$('#cbRA').is(":checked"),this.$('#cbIA').is(":checked"),this.$('#cbRR').is(":checked"),this.$('#cbRC').is(":checked"),this.$('#cbIC').is(":checked")]
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

    
    function  hrTable(my){
        console.log(my);
        var columns = [];
        $table.bootstrapTable('destroy');
                 
        columns.push({
            field: "data_richiesta",
            title: 'Data Richiesta',              
            sortable: true
                        });
        columns.push({
            field: "servizio",
            title: 'Servizio',              
            
            sortable: true
                        });
        
        columns.push({
            field: "utente",
            title: 'Referente',              
            
            sortable: true
                        });
        columns.push({
            field: "categoria",
            title: 'Categoria',              
            
            sortable: true
                        });                
        columns.push({
            field: "stato",
            title: 'Stato',              
            cellStyle: cellStyle, 
            sortable: true
                        });  
        columns.push({
            field: "action",
            align:"center",
            formatter:actionFormatter,
            events:actionEvents
           
                        });      
                      
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
                value1["dateT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDD')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
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
          
              if(typeof(value1["data_chiusura"]) !== "undefined" && value1["data_chiusura"] !== null){       
           
             
               value1["data_chiusura"]=moment(value1["data_chiusura"]).format('DD/MM/YYYY');
               
            }

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
                            '<label  class="label" style="color:grey;background-color:'+my.color[2].color+';"  for="name">Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+_.unescape(row.descrizione)+'" data-title="Data richiesta RMA '+row.data_richiesta+'" data-image="'+row.link_immagine+'" value="'+row.data_richiesta+'">'+

                        '</div>');
                        //console.log("row="+row.interventi[0]["data_assegnazione"]);
                        $.each(row.interventi, function( key, value1 ){
                            console.log("row="+value1["data_assegnazione"]);
                          
                          
                        if(typeof( value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){  
                            $data_ass=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
                            $descrIz=_.unescape(value1["descrizione"]);
                            $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data assegnazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_ass+'" value="'+$data_ass+'">'+

                            '</div>');
                        }
                        if(typeof( value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){  
                                $data_pre=moment(value1["data_prevista"]).format('DD/MM/YYYY');
                                $descrIz=_.unescape(value1["descrizione"]);
                                 
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data prevista intervento</label>'+
                           // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' previsto per il '+$data_pre+'" value="'+$data_pre+'">'+

                        '</div>');
                        }
                        if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                       $data_eff=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                       $descrIz=_.unescape(value1["descrizione_chiusura"]);
                        $detail.append( varForm=
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[6].color+';"><span class="badge">'+(key+1)+'</span> Data intervento</label>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' effettuato il '+$data_eff+'" value="'+$data_eff+'">'+

                        '</div>');
                        }
                    });
                         if(typeof(row.data_chiusura) !== "undefined" && row.data_chiusura !== null){ 
                            
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+
                             
                             '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+_.unescape(row.descrizione_chiusura)+'" data-title="Data chiusura RMA '+row.data_chiusura+'" value="'+row.data_chiusura+'">'+

                        '</div>');
                        }
                   
            $('#modal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                var title = button.data('title');
                var bodyMes = button.data('descr');
                if(button.data('image')){
                   var image = button.data('image'); 
                }else{
                    var image = "";
                }
                
                console.log(image,button.data('image'));
                var modal = $(this);
                modal.find('.modal-title').text( title);
                modal.find('.modal-body textarea').val(bodyMes);
                modal.find('.modal-body img').attr('src', image);
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
            trimOnSearch:false,
            searchText:app.global.nick_array.arrSearchText, 
            pagination:false
           
           
        });
        
            console.log(my.data);
            
             
               
       
            
        }
       
    function queryParams1 (params) { 
        console.log(params.search);
        
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
            'click .management': function ($element, value, row,index) {
                app.global.nick_array.id=row.id;
            	
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rma_management" >'+row.num_prog+ " del "+row.data_richiesta+'</a></li>'
                   //    breadcrumb: '<li><a class="breadcrumb-item active" href="#it/rma_management" >'+row.num_prog+ " del "+row.data_richiesta+'</a></li>'
        
                });

                  
                //------------------------------------------------------------------------------------
                app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
                app.global.nick_array.arrIndex=index;
                app.global.nick_array.arrTable=$('#table').bootstrapTable('getData');
                app.global.nick_array.arr=app.global.nick_array.arrTable[index];
               
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
                
            
            },
            'click .search.form-control': function (e, value, row,index) {
                 console.log("search!="+value);
            }
       
        };
     
        
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
return app.views.rma_view;
    });


