require(['app','bootbox'], function(app,bootbox){
app.views.rfa_view = Backbone.View.extend({
       
    initialize:function(){
     	console.log("initializing rfa_view view");
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
        "click-row.bs.table":"rfa_detail_",//per ora non utilizzata - non interessa vedere il dettaglio ordine.
        "click #reqRFA":"setRequest",
        "changeDate .pic1":"changeDate1",
        "changeDate .pic2":"changeDate2",
        "search.bs.table":"searchTable"
      
           
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
                    if ($mydata.success){
                      
                       
                        if($mydata.selServizi!==""){
                            $.when(that.$("#servizi").append($mydata.selServizi)).then( function(){
                                $bb=$mydata.data;
                                $("#servizio").append('<option value="0">Tutti i servizi</option>');
                                $.each($bb, function(i, value) {
                                    $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                                });
                            });
                           
                        }

                       
                    }else {
                
                       
                    }
                },
                error: function () {
                   
                   
                }
                
            });
        }
        
        console.log(this.$("#servizio").val());
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
        callList(that);
        function  callList(that){
            var API_URL = app.global.json_url + 'rfa/ordini/';
            var jsonObj = {};
            var data1=moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            console.log(data1);
            if (that.$('#servizi').is(':empty')){}else{
                jsonObj.servizio =that.$("#servizio").val();
            }
            jsonObj.action = "list";
            jsonObj.type = "ordine";   
            jsonObj.servizio =that.$("#servizio").val();
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
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
    changeDate1:function(e){
            console.log(e);
              this.$('#datetimepicker2').datetimepicker('setStartDate',this.$('#datetimepicker1').data("datetimepicker").getDate());
     // this.$('#dataTemp2').val(moment(this.$('#datetimepicker1').data("datetimepicker").getDate()).format('DD/MM/YYYY'))
             localStorage.setItem("dataDa", this.$('#datetimepicker1').data("datetimepicker").getDate());
        },
    changeDate2:function(e){
            localStorage.setItem("dataA", this.$('#datetimepicker2').data("datetimepicker").getDate());
        },   
    
    rfa_detail:function(e, row, $element,options,xx){
    
      
        app.global.breadcrumb.push({
               
        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.num_prog+" del "+row.data_richiesta+'</li>'
    });
        app.global.nick_array.arrSearchText=this.$('#table').bootstrapTable('getOptions').searchText;
        app.global.nick_array.arrIndex=$element[0].attributes[0].nodeValue;
        app.global.nick_array.arrTable=this.$('#table').bootstrapTable('getData');
        app.global.nick_array.arr=app.global.nick_array.arrTable[$element[0].attributes[0].nodeValue];
    
     
        app.routers.rfaRouter.prototype.rfa_detail();               //chiama la pagina data_type_edit
  
   },
    callList: function  (){
           
            var jsonObj = {};
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "ordine";          
            
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
        var newArray =JSON.parse(JSON.stringify(my));
         app.global.nick_array.my=newArray;
        var $table=this.$('#table');
        console.log(my);
         console.log(app.global.nick_array);
        var columns = [];
        $table.bootstrapTable('destroy');
         that=this;   
                      
        $.each( my.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=that.cellStyle;
            }
            if(value1["cellStyle"]=="cellStyle1"){

                value1["cellStyle"]=that.cellStyle1;
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
            if(typeof(value1["data_sospeso"]) !== "undefined" && value1["data_sospeso"] !== null && value1["data_sospeso"] !== '1001-01-01 00:00:00'){    
                value1["data_sospesoH"]=moment(value1["data_sospeso"]).format('DD/MM/YYYY H:mm:ss');
                value1["data_sospeso"]=moment(value1["data_sospeso"]).format('DD/MM/YYYY');
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
 
         this.$('#lblCounter').text('Trovate '+my.data.length+' RFA');
        $table.bootstrapTable({
          
            columns: my.tab,
            //columns:columns,
            data: my.data,
            detailView:true,
            onExpandRow: function (index, row, $detail) {
                console.log(row);
                $table.find('.detail-view').each(function () {
                    if (!$(this).is($detail.parent())) {
                        $(this).prev().find('.detail-icon').click()
                    }
                })
                //$detail.html(row.timestamp);
                var API_URL = app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                var $ordine = {};

                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.action = "list";
                jsonObj.type = "details";        
                jsonObj.id =row.id;
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
                       
                        row.person=$mydata.data;
                        detApp(row)
                    }else{

                    }
                },
                error: function () {

                }
            });
                function detApp(row){
                $detail.append(
                    
                    //'<div class="row">'+
                        '<div class="form-group col-sm-3">'+    //color index=id.color-1-> rosso id=3  index array my.color[2]
                            '<label  class="label" style="color:black;background-color:'+my.color[2].color+';"  for="name">Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+_.unescape(row.nota)+' \n '+row.utente+'" data-title="Data richiesta RFA '+row.data_richiesta+'" data-image="'+row.link_immagine+'" value="'+row.data_richiesta+'">'+

                        '</div>');
                        if(typeof( row.data_carico) !== "undefined" && row.data_carico !== null && row.data_carico!== '1001-01-01 00:00:00'){  
                            $data_ass=moment(row.data_presa_carico).format('DD/MM/YYYY');
                            //$descrIz=_.unescape(value1["descrizione"]);
                            var $statoApprova='';
                            if(row.id_categoria=='11'){
                                $statoApprova='In attesa  approvazione dal coordinatore'
                            }
                            $detail.append(
                            '<div class="form-group col-sm-3">'+            //color index=id.color-1-> giallo id=8  index array my.color[7]
                                '<label  class="label" style="color:black;background-color:'+my.color[7].color+';"> Data presa in carico</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="Ordine preso in carico in data '+row.data_caricoH+' \n '+row.person.person_carico+'\n'+$statoApprova+'" data-title="Data presa in carico " value="'+row.data_carico+'">'+

                            '</div>');
                        }
                       
                        if(typeof( row.data_sospeso) !== "undefined" && row.data_sospeso !== null && row.data_sospeso !=='1001-01-01 00:00:00'){  
                            $data_ass=moment(row.data_sospeso).format('DD/MM/YYYY');
                            
                            $detail.append(
                            '<div class="form-group col-sm-3">'+                //color index=id.color-1-> celeste id=10  index array my.color[9]
                                '<label  class="label" style="color:black;background-color:'+my.color[3].color+';"> Data sospensione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="Ordine sospeso in data '+row.data_sospesoH+' \n '+row.descrizione_sospeso+' \n '+row.person.person_sospeso+'" data-title="Sospensione ordine " value="'+row.data_sospeso+'">'+

                            '</div>');
                        }
                        if(typeof( row.data_approva) !== "undefined" && row.data_approva !== null && row.data_approva !=='1001-01-01 00:00:00'){  
                            $data_ass=moment(row.data_approva).format('DD/MM/YYYY');
                            //$descrIz=_.unescape(value1["descrizione"]);
                            $detail.append(
                            '<div class="form-group col-sm-3">'+                //color index=id.color-1-> celeste id=10  index array my.color[9]
                                '<label  class="label" style="color:black;background-color:'+my.color[9].color+';"> Data approvazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="Ordine approvato in data '+row.data_approvaH+' \n '+row.descrizione_approva+' \n '+row.person.person_approva+'" data-title="Approvazione ordine " value="'+row.data_approva+'">'+

                            '</div>');
                        }
                        if(typeof( row.data_invio) !== "undefined" && row.data_invio !== null && row.data_invio!== '1001-01-01 00:00:00'){  
                            $data_ass=moment(row.data_invio).format('DD/MM/YYYY');
                            //$descrIz=_.unescape(value1["descrizione"]);
                            $detail.append(
                            '<div class="form-group col-sm-3">'+            //color index=id.color-1-> blu id=12  index array my.color[11]
                                '<label  class="label" style="color:black;background-color:'+my.color[11].color+';"> '+row.person.lbl_invio+'</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="Ordine inviato in data '+row.data_invioH+' \n '+row.descrizione_invio+' \n '+row.person.person_invio+'" data-title="Invio ordine " value="'+row.data_invio+'">'+

                            '</div>');
                        }
                        $.each(row.interventi, function( key, value1 ){
                        
                          
                        if(typeof( value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){  
                            $data_ass=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
                            $descrIz=_.unescape(value1["descrizione"]);
                            $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:black;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data assegnazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_ass+'" value="'+$data_ass+'">'+

                            '</div>');
                        }
                        if(typeof( value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){  
                                $data_pre=moment(value1["data_prevista"]).format('DD/MM/YYYY');
                                $descrIz=_.unescape(value1["descrizione"]);
                                 
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:black;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data prevista intervento</label>'+
                           // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' previsto per il '+$data_pre+'" value="'+$data_pre+'">'+

                        '</div>');
                        }
                        if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                       $data_eff=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                       $descrIz=_.unescape(value1["descrizione_chiusura"]);
                        $detail.append( varForm=
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:black;background-color:'+my.color[6].color+';"><span class="badge">'+(key+1)+'</span> Data intervento</label>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' effettuato il '+$data_eff+'" value="'+$data_eff+'">'+

                        '</div>');
                        }
                    });
                         if(typeof(row.data_chiusura) !== "undefined" && row.data_chiusura !== null && row.data_chiusura !=='1001-01-01 00:00:00'){ 
                            
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:black;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+
                             
                             '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+_.unescape(row.descrizione_chiusura)+' \n '+row.person.person_chiusura+'" data-title="Data chiusura RMA '+row.data_chiusura+'" value="'+row.data_chiusura+'">'+

                        '</div>');
                        }
                   
            $('#modal').on('show.bs.modal', function (event) {
                  console.log(row);
                var button = $(event.relatedTarget);
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
            })
                
                
            function showModal(title, row) {
    
            
                $modal.data('id_person', row.id_person);
            
       $modal.find('.modal-title').text(title);
       for (var name in row) {
            
                $modal.find('input[name="' + name + '"]').val(row[name]); 
            }
         
        $modal.modal('show');
    }    
               } 
            },
            showColumns:true,
            showRefresh:true,
            search:true,
            searchText:app.global.nick_array.arrSearchText,
            pagination:false
           
           
        });
       
            console.log(my);
            
             
               
       
            
        },
    
   
    cellStyle1: function(value, row, index) {
        
        return {css: 
               //{"background-color": row.name_cell_color}
               {"background-color":  row.stato_ddt}
           };
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
        if(app.global.nick_array.arrSearchText==null){app.global.nick_array.arrSearchText=""};
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
         this.setRequest();
         var that = this;
       // this.callList();
         this.$('input[type="checkbox"]').on('change', function(e) {
            //$('#manutenzione').change(function (e) {
          // alert(_.keys(e)+" - "+" - "+$('input[name=manutenzione]:checked').val()); 
            
               this.$titleReparto="In Infanzia ci sono ";
              //$('#titleTipo').text("In Infanzia ci sono ");
              // callList("Infanzia");
               
               
           
         
           
        });
   
        window.actionEvents = {
            'click .downloadExc': function ($element, value, row,index) {
                that=this;
                console.log(row);
                var  $uurl= app.global.json_url + 'rfa/ordini/';
                var jsonObj = {};
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.type ="excel";
                jsonObj.action ="download";
                jsonObj.ordine =row.id;
               

               jsonObj.file =row.num_prog+'.xsl';
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
                    window.location=$filex;

                   }

               });
            },  
            'click .downloadDoc': function ($element, value, row,index) {
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
                app.routers.rfaRouter.prototype.rfa_management();
              
               
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
    
        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
return app.views.rfa_view;
    });


