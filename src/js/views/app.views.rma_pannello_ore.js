require(['app','bootbox'], function(app,bootbox){
app.views.rma_pannello_ore = Backbone.View.extend({
       
    initialize:function(){
     	console.log("initializing rma_pannello_ore view");
        localStorage.removeItem("dataDa");
        localStorage.removeItem("dataA");
        
    },

    events:{
        "click-row.bs.table":"orario--",
        "search.bs.table":"rma_search",
         "changeDate .pic1":"changeDate1",
        "changeDate .pic2":"changeDate2",
         "click #reqRMA":"render",
         "click #excel": "excelreq" 
        
	   
    },
       excel: function (file){
           var id="excel";
        console.log("file="+file);
        console.log("id="+id);
        var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
        var $data_da=moment(this.$('#dataTemp1').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        var $data_a=moment(this.$('#dataTemp2').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        console.log( "dataKeys="+_.keys($('#table').bootstrapTable('getData')));
        $fields = $('#table').bootstrapTable('getVisibleColumns').map(function (column){
            return column.title;
        });
    $fieldsIndex = $('#table').bootstrapTable('getVisibleColumns').map(function (column) {
        return column.field;
    });
    arTable=this.$('#table').bootstrapTable('getData');
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
     $.each($ar, function( key, value1 ){
          //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
          //per poter generare la data giusta x excel
                
          
            if(value1["Data"]){
                  
                value1["Data"]=value1["Data"].substring(21);
            }
                      

        });
    var jsonObj = {};
  
    var  $uurl= app.global.json_url + 'report/ore_manutentori/excel/';
    //jsonObj.nameQuery =$NameQuery;
    jsonObj.da =$data_da;
    jsonObj.a =$data_a;
    jsonObj.oreTotale =app.global.nick_array.totOre;
    jsonObj.col =$fields;
    jsonObj.table =$ar;
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

}  ,
    'excelreq': function () { 
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);

            this.excel('arca-ore manutentori '+datestring+'.xlsx');

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
    rma_search:function(e, row, $element,options,xx){
        visibleRows = $('#table').bootstrapTable('getData');
        totOre=0.00;
            $.each( visibleRows, function( key, value1 ){
                
                totOre = totOre+ parseFloat(value1["ore"]);
                 
            });
             $('#lblTitleOre').text( " Tot ore="+totOre);
        console.log(totOre);
        app.global.nick_array.totOre=totOre;
    },
    rma_detail:function(e, row, $element,options){
    
        app.global.breadcrumb.push({
               
            breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.num_prog+" del "+row.data_richiesta+'</li>'
        });
        app.global.nick_array.arr=row;
        
        app.routers.rmaRouter.prototype.rma_detail();               //chiama la pagina data_type_edit
  
    },
    orario:function(e, row, $element,options){
        $modal = $('#modal').modal({show: true}); 
        $('#modal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var title = row.date
            var image = button.data('image')
            var bodyMes = button.data('descr')
            var modal = $(this)
            modal.find('.modal-title').text( title)
            modal.find('.modal-body textarea').val(bodyMes)
            modal.find('.modal-body img').attr('src', image)
        })
      
    },
    setRequest:function(e){
       
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
            var jsonObj = {};
            jsonObj.dataDa =moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataA = moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD');
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "orario";
                       
            
            jsonObj = JSON.stringify(jsonObj);
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
           
            $.ajax({
                url: app.global.json_url + 'rma/orario/',
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                success: function (datap){
                    $mydata =JSON.parse(datap);
                    
                    if ($mydata.success){
                        that.hrTable($mydata);
                       
                    }else{
                
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

       
    },
    hrTable: function  (my){
            var $table=this.$('#table');
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
                if(value1["footerFormatter"]=="priceFormatter"){

                    value1["footerFormatter"]=this.priceFormatter;
                }
                if(value1["formatter"]=="editEv"){

                    value1["formatter"]=this.editEv;
                }
                if(value1["field"]=="ore" ){

                    value1["cellStyle"]=this.cellStyle1;
                    value1["editable"]= false;/*{
                            
                            type: 'text',
                            title: 'Ore lavorate',
                            validate: function (value) {
                                value = $.trim(value);
                                if (!value) {
                                    return 'This field is required';
                                }
                                if (!/^\$/.test(value)) {
                                    return 'This field needs to start width $.'
                                }
                                var data = $table.bootstrapTable('getData'),
                                    index = $(this).parents('tr').data('index');
                                console.log(data[index]);
                                return '';
                            }
                        }*/
                    }

        });   
             totOre=0.00;
            $.each( my.data, function( key, value1 ){
                
                totOre = totOre+ parseFloat(value1["ore"]);
                
           

          
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                   value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');

                }
            
                if(typeof(value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){    

                   value1["data_assegnazione"]=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');

                }
           
                if(typeof(value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){    
                   value1["data_prevista"]=moment(value1["data_prevista"]).format('DD/MM/YYYY');

                }
                if(typeof(value1["date"]) !== "undefined" && value1["date"] !== null){    
                    value1["date1"]=value1["date"];
                   
                    value1["dateT"]='<span>'+moment(value1["date"]).format('YYYYMMDD')+'</span>'+moment(value1["date"]).format('DD/MM/YYYY');
                    value1["date"]=moment(value1["date"]).format('DD/MM/YYYY');
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
               //  if(value1["ore"]===""){value1["ore"]="<input type=\"text\"  class=\"form-control \" name=\"num_ore\" id=\"num_ore\"  value=\"0.00\"/>";}


            });   
  
            $table.bootstrapTable({

                columns: my.tab,
                //columns:columns,
                data: my.data,
                detailView:false,
                onExpandRow: function (index, row, $detail) {
                    console.log(row);
                    $table.find('.detail-view').each(function () {
                        if (!$(this).is($detail.parent())) {
                            $(this).prev().find('.detail-icon').click()
                        }
                    })
                    //$detail.html(row.timestamp);

                    $detail.append(
                    
                    //'<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[6].color+';"  for="name">Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descrizione+'" data-title="Data richiesta RMA '+row.data_richiesta+'" value="'+row.data_richiesta+'">'+

                        '</div>');
                        //console.log("row="+row.interventi[0]["data_assegnazione"]);
                        $.each(row.interventi, function( key, value1 ){
                            console.log("row="+value1["data_assegnazione"]);
                          
                          
                        if(typeof( value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){  
                            $data_ass=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
                            $descrIz=value1["descrizione"];
                            $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data assegnazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_ass+'" value="'+$data_ass+'">'+

                            '</div>');
                        }
                        if(typeof( value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){  
                                $data_pre=moment(value1["data_prevista"]).format('DD/MM/YYYY');
                                $descrIz=value1["descrizione"];
                                 
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data prevista intervento</label>'+
                           // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_pre+'" value="'+$data_pre+'">'+

                        '</div>');
                        }
                        if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                       $data_eff=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                       $descrIz=value1["descrizione_chiusura"];
                        $detail.append( varForm=
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data intervento</label>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_eff+'" value="'+$data_eff+'">'+

                        '</div>');
                        }
                    });
                         if(typeof(row.data_chiusura) !== "undefined" && row.data_chiusura !== null){ 
                            
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+
                             
                             '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descrizione_chiusura+'" data-title="Data chiusura RMA '+row.data_chiusura+'" value="'+row.data_chiusura+'">'+

                        '</div>');
                        }
                   
          
                
                
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
                searchText:app.global.nick_array.arrSearchText,
                pagination:false,
                showFooter:true
           
           
            });
            arrData=my.data;
           
            //console.log(my.data);
           
            $("input[name='num_ore']").TouchSpin({
                min: 0,
                max: 24,
                step: 0.25,
                decimals: 2,
                boostat: 5,
                maxboostedstep: 10
                //postfix: '0.00'
            });  
                 //$('#lblTitle').text( my.titolo+" Tot ore="+totOre);
                  $('#lblTitle').text( my.titolo);
                  $('#lblTitleOre').text( " Tot ore="+totOre);
                  app.global.nick_array.totOre=totOre;
        },
    cellStyle1:  function (value, row, index) {
        
        return {
              classes: '" class="col-md-1" note="" idx="R'+(Number(index)+1)+'C0" name="num_ore" id="num_ore'
           };
   
    
    
    
    } , 
    priceFormatter:  function (data) {
        /*var field = this.field
        return 'Tot' + data.map(function (row) {
            return +row[field].substring(1)
        }).reduce(function (sum, i) {
        return sum + i
        }, 0)*/
       
        visibleRows = $('#table').bootstrapTable('getData');
        totOre=0.00;
            $.each( data, function( key, value1 ){
                
                totOre = totOre+ parseFloat(value1["ore"]);
                console.log(totOre);
            });
        console.log(totOre);
         return 'Tot ore=' + totOre;
    },
    editEv:  function (value, row, index, field){
           
           console.log(value, row.date, index, field,row,tempRow);
            if (row.id_ore !== null) {
                if(row.edit==1){
                    $action="update";
                    var modTitle="Modifica ore di "+row.manutentore+" del "+row.date+" fatte  nel servizio "+row.servizio;
                    return [
                     
                        '<input id="num_ore_" name="num_ore_" type="text" class=" form-control" data-ind="'+index+'" data-toggle="modal"  readonly  data-act="'+$action+'" data-row="'+row.date1+'" data-target="#modal"  data-value="'+value+'" data-id_ore="'+row.id_ore+'" data-id_man="'+row.id_manutentore+'" data-id_ser="'+row.id_servizio+'" data-title="'+modTitle+'" value="'+value+'">'

                    ].join('');
                }else{
                     return '' + value ;
                }
            }else{$action="add";

            var modTitle="Inserimento ore di "+row.manutentore+" del "+row.date+" fatte  nel servizio "+row.servizio;
            return [
                '<input id="num_ore_" name="num_ore_" type="text" class=" form-control" data-toggle="modal"  readonly  data-ind="'+index+'" data-act="'+$action+'" data-target="#modal"  data-value="'+value+'" data-title="'+modTitle+'" value="'+value+'">'

            ].join('');

            }  
        },
   
    render:function(){
        
    	$(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rma/orario/';
        var $table=this.$('#table'),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
        var arrData;
        var visibleRows;
        var totOre = 0;
        var tempRow={};
        var $action="";
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
       
        var diff=this.$('#datetimepicker2').data("datetimepicker").getDate().getTime()-this.$('#datetimepicker1').data("datetimepicker").getDate().getTime();
            console.log(diff); 
        if(diff<0){
            alert('Data 2 non può essere minore di Data1');
            return;
        };
        $dataDa=this.$('#datetimepicker1').data("datetimepicker").getDate()
        console.log($dataDa);
        that=this;
        
        callList();
       
        function  callList(){
           
            var jsonObj = {};
            jsonObj.dataDa =moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.dataA = moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD');
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "orario";
                       
            
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
                success: function (datap){
                    $mydata =JSON.parse(datap);
                    // $mydata =(datap);
                    console.log($mydata);
                    //-------------------------------------------------------
                    if ($mydata.success){
                        
                        hrTable($mydata);
                    }else{
                
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
           if (my.data.length>0){
               this.$("#excel").prop('disabled', false);
           }else{
                this.$("#excel").prop('disabled', true);
           }
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
                if(value1["footerFormatter"]=="priceFormatter"){

                    value1["footerFormatter"]=priceFormatter;
                }
                if(value1["formatter"]=="editEv"){

                    value1["formatter"]=editEv;
                }
                if(value1["field"]=="ore" ){

                    value1["cellStyle"]=cellStyle1;
                    value1["editable"]= false;/*{
                            
                            type: 'text',
                            title: 'Ore lavorate',
                            validate: function (value) {
                                value = $.trim(value);
                                if (!value) {
                                    return 'This field is required';
                                }
                                if (!/^\$/.test(value)) {
                                    return 'This field needs to start width $.'
                                }
                                var data = $table.bootstrapTable('getData'),
                                    index = $(this).parents('tr').data('index');
                                console.log(data[index]);
                                return '';
                            }
                        }*/
                    }

        });   
            totOre=0.00;
            $.each( my.data, function( key, value1 ){
                
                totOre = totOre+ parseFloat(value1["ore"]);
               
               
                
          
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                   value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');

                }
            
                if(typeof(value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){    

                   value1["data_assegnazione"]=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');

                }
           
                if(typeof(value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){    
                   value1["data_prevista"]=moment(value1["data_prevista"]).format('DD/MM/YYYY');

                }
                if(typeof(value1["date"]) !== "undefined" && value1["date"] !== null){    
                    value1["date1"]=value1["date"];
                   
                    value1["dateT"]='<span>'+moment(value1["date"]).format('YYYYMMDD')+'</span>'+moment(value1["date"]).format('DD/MM/YYYY');
                    value1["date"]=moment(value1["date"]).format('DD/MM/YYYY');
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
               //  if(value1["ore"]===""){value1["ore"]="<input type=\"text\"  class=\"form-control \" name=\"num_ore\" id=\"num_ore\"  value=\"0.00\"/>";}


            });   
  
            $table.bootstrapTable({

                columns: my.tab,
                //columns:columns,
                data: my.data,
                detailView:false,
                onExpandRow: function (index, row, $detail) {
                    console.log(row);
                    $table.find('.detail-view').each(function () {
                        if (!$(this).is($detail.parent())) {
                            $(this).prev().find('.detail-icon').click()
                        }
                    })
                    //$detail.html(row.timestamp);

                    $detail.append(
                    
                    //'<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[6].color+';"  for="name">Data richiesta</label>'+
                            
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descrizione+'" data-title="Data richiesta RMA '+row.data_richiesta+'" value="'+row.data_richiesta+'">'+

                        '</div>');
                        //console.log("row="+row.interventi[0]["data_assegnazione"]);
                        $.each(row.interventi, function( key, value1 ){
                            console.log("row="+value1["data_assegnazione"]);
                          
                          
                        if(typeof( value1["data_assegnazione"]) !== "undefined" && value1["data_assegnazione"] !== null){  
                            $data_ass=moment(value1["data_assegnazione"]).format('DD/MM/YYYY');
                            $descrIz=value1["descrizione"];
                            $detail.append(
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data assegnazione</label>'+
                                '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_ass+'" value="'+$data_ass+'">'+

                            '</div>');
                        }
                        if(typeof( value1["data_prevista"]) !== "undefined" && value1["data_prevista"] !== null){  
                                $data_pre=moment(value1["data_prevista"]).format('DD/MM/YYYY');
                                $descrIz=value1["descrizione"];
                                 
                            $detail.append( 
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data prevista intervento</label>'+
                           // '<a id="myDescr" name="myDescr" class="myDescriz" ><input type="text" class="form-control" value="'+$data_pre+'"  readonly></a>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_pre+'" value="'+$data_pre+'">'+

                        '</div>');
                        }
                        if(typeof(value1["data_effettuata"]) !== "undefined" && value1["data_effettuata"] !== null){ 
                       $data_eff=moment(value1["data_effettuata"]).format('DD/MM/YYYY');
                       $descrIz=value1["descrizione_chiusura"];
                        $detail.append( varForm=
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[7].color+';"><span class="badge">'+(key+1)+'</span> Data intervento</label>'+
                            '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+$descrIz+'" data-title="Intervento N°'+(key+1)+' assegnato il '+$data_eff+'" value="'+$data_eff+'">'+

                        '</div>');
                        }
                    });
                        if(typeof(row.data_chiusura) !== "undefined" && row.data_chiusura !== null){ 
                            
                            $detail.append( 
                            '<div class="form-group col-sm-3">'+
                                '<label  class="label" style="color:grey;background-color:'+row.stato_color+';"  for="name">Data chiusura</label>'+

                                 '<input type="text" class=" form-control" data-toggle="modal"  readonly data-target="#modal" data-descr="'+row.descrizione_chiusura+'" data-title="Data chiusura RMA '+row.data_chiusura+'" value="'+row.data_chiusura+'">'+

                            '</div>');
                        }
                   
          
                
                
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
                filterControl:true,
                searchText:app.global.nick_array.arrSearchText,
                pagination:false,
                showFooter:true
           
           
            });
            arrData=my.data;
          
           
            $("input[name='num_ore']").TouchSpin({
                min: 0,
                max: 24,
                step: 0.25,
                decimals: 2,
                boostat: 5,
                maxboostedstep: 10
                //postfix: '0.00'
            });  
                 //$('#lblTitle').text( my.titolo+" Tot ore="+totOre);
                  $('#lblTitle').text( my.titolo);
                  $('#lblTitleOre').text( " Tot ore="+totOre);
                  app.global.nick_array.totOre=totOre;
                 
        }
        
        
    
        function editEv(value, row, index, field){
           
           // console.log(value, row.date, index, field,row,tempRow);
            if (row.id_ore !== null) {
                if(row.edit==1){
                    $action="update";
                    var modTitle="Modifica ore di "+row.manutentore+" del "+row.date+" fatte  nel servizio "+row.servizio;
                    return [
                     
                        '<input id="num_ore_" name="num_ore_" type="text" class=" form-control" data-ind="'+index+'" data-toggle="modal"  readonly  data-act="'+$action+'" data-row="'+row.date1+'" data-target="#modal"  data-value="'+value+'" data-id_ore="'+row.id_ore+'" data-id_man="'+row.id_manutentore+'" data-id_ser="'+row.id_servizio+'" data-title="'+modTitle+'" value="'+value+'">'

                    ].join('');
                }else{
                     return '' + value ;
                }
            }else{$action="add";

            var modTitle="Inserimento ore di "+row.manutentore+" del "+row.date+" fatte  nel servizio "+row.servizio;
            return [
                '<input id="num_ore_" name="num_ore_" type="text" class=" form-control" data-toggle="modal"  readonly  data-ind="'+index+'" data-act="'+$action+'" data-target="#modal"  data-value="'+value+'" data-title="'+modTitle+'" value="'+value+'">'

            ].join('');

            }  
        }
      
      
        this.$('#modal').on('show.bs.modal', function (event) {
           visibleRows = $('#table').bootstrapTable('getData');
         app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
             var button = $(event.relatedTarget);
            console.log(visibleRows,button.data('ind'));
            
           
            var title = button.data('title');
            var servizio = button.data('id_ser');
            var valOre = button.data('value');
            var ind = button.data('ind');
            var id_ore = button.data('id_ore');
            var actio = button.data('act');
            var modal = $(this);
            modal.find('.modal-title').text(title);
            if(valOre==null){
                valOre="0.00";
                $("#modalForm #saveOra").text("Modifica");
            };
            $("#modalForm #num_ore").val(valOre);
            $("#modalForm #row_ore").val(ind);
            $("#modalForm #id_ore").val(id_ore);
            $action=actio;
            console.log(tempRow);
            console.log(tempRow.date1);
            console.log(arrData[ind].date1);
            console.log(actio);
            console.log(id_ore);
               
        });
            
        this.$('#saveOra').click(function(e){
            e.preventDefault();
            console.log(visibleRows);
            
        
            var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,

                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
       
       
            rowInd=$("#modalForm #row_ore").val();
            console.log(rowInd);
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type='orario';
            jsonObj.action=$action;
            jsonObj.date=visibleRows[rowInd].date1;
            jsonObj.id_ore=visibleRows[rowInd].id_ore;
            jsonObj.id_man=visibleRows[rowInd].id_manutentore;
            jsonObj.id_servizio=visibleRows[rowInd].id_servizio;
            jsonObj.tipo_man=visibleRows[rowInd].tipo_man;
            jsonObj.ore=$("#modalForm #num_ore").val();
            
            jsonObj = JSON.stringify(jsonObj);
            console.log(jsonObj);
            $.ajax({
               url:app.global.json_url + 'rma/orario/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                $action="";    
                $('#modal').modal('hide');
             callList();
                  
            }
            });
           
  
      });
   
    function actionFormatter(value) {
        return [
            '<!--a class="update" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a-->',
             '<a class="management" href="javascript:" title="Gestione RMA"><i class="glyphicon glyphicon-cog"></i></a>&emsp;&emsp;'
           
        ].join('');
    }
    function priceFormatter(data) {
        /*var field = this.field
        return 'Tot' + data.map(function (row) {
            return +row[field].substring(1)
        }).reduce(function (sum, i) {
        return sum + i
        }, 0)*/
        console.log(totOre);
        visibleRows = $('#table').bootstrapTable('getData');
        totOre=0.00;
            $.each( data, function( key, value1 ){
                
                totOre = totOre+ parseFloat(value1["ore"]);
             
            });
       
        app.global.nick_array.totOre=totOre;
         return 'Tot ore=' + totOre;
    }
    function cellStyle(value, row, index) {
        
        return {css: 
               //{"background-color": row.name_cell_color}
               {"background-color":  row.stato_color}
           };
   
    
    
    
    }  
    function cellStyle1(value, row, index) {
        
        return {
              classes: '" class="col-md-1" note="" idx="R'+(Number(index)+1)+'C0" name="num_ore" id="num_ore'
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
return app.views.rma_pannello_ore;
    });


