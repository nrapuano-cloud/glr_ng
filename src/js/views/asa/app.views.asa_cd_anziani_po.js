
require(['app','bootbox'], function(app,bootbox){
    
    app.views.asa_cd_anziani_po = Backbone.View.extend({
        
        initialize: function () {
            console.log("initializing asa po: ");
            this.utenti=[];
           
        },
        events: {
            "click .contr-Plus":"addRow",
            "click #archivio":"archivio",
           // "mouseenter .cell":"overCell",
           // "mouseleave .cell":"exitCell",
            "click-cell.bs.table":"subCell",
            "click .submit":"submitModal",
            "change #mese":"changeMonth",
            "change #year":"changeYear",
          
            
        },
       
        changeMonth:function(){
           
            localStorage.setItem("selMonth",  $mese.val());
            this.setSelect(this,$anno.val(),$mese.val());
            this.selCall(this);
           
        },
        changeYear:function(){
           
            localStorage.setItem("selYear",  $anno.val());
            this.setSelect(this,$anno.val(),$mese.val());
            this.selCall(this);
           
        },
        overCell:function(ev){// 
           
            localStorage.setItem("bgCell",  ev.target.style.backgroundColor.value);
            app.global.nick_array.bgCell=ev.target.style.background.value;
            console.log("enter", app.global.nick_array.bgCell,ev);
             //    ev.target.style.background = "yellow";
                 console.log("enter", app.global.nick_array.bgCell,ev.target.style.background);
             
           },
           exitCell:function(ev){// update
           
           
           
              ev.target.style.background = app.global.nick_array.bgCell;
              console.log("exit",app.global.nick_array.bgCell,ev.target.style.background);
          
        },   
        submitModal: function(e){
            console.log(e);
            var data =$('#newModalForm').serializeJSON();
         
            console.log(data);
           
            
            that=this;
            $action="post";
            $url=app.global.json_url+'asa/po/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
            API_URL=$url;
            var jsonObj = {};
            jsonObj.action = "update";
            jsonObj.sub_area = app.global.sub;
            jsonObj.type = "presenze";
            jsonObj.data = data.data;
            jsonObj.id = data.id;
            jsonObj.id_cell = data.cell;
            jsonObj.presenza = data.tipo_presenza;
            jsonObj.id_utente = data.id_utente;
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.id_servizio = app.global.nick_array.arr.id;
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url: API_URL,
                type: 'post',
                data :  jsonObj,
                dataType : 'text',
                headers: this.headerJson(),
                
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        that.$("#modal").modal('hide'); 
                      /*    that.$("#table").bootstrapTable('updateCell', {
                            index: data.index,
                            field: data.day,
                            value: data.tipo_presenza,
                            reinit: true
                          })
                      //  $("#"+data.cell).html( data.tipo_presenza);
                        oddNumber = _.find(app.global.nick_array.data.presenze, function (num) {  
                         $data= moment(num.data).format('YYYY-MM-DD');
                           $data1= moment(data.data).format('YYYY-MM-DD');
                             if(num.id_utente===data.id_utente && $data===$data1){
                                console.log( $data,$data1 );
                                num.presenza=data.tipo_presenza;
                                num.id_person=app.global.tokensCollection.first().get("id_person");
                                return num
                             }
                     } ); */
                         //   console.log( app.global.nick_array.data.presenze);
                       that.selCall(that); //1 selMonth è già impostato quindi lo vado a leggere getLocalStorage per rimanere in quel mese
                    }else{
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $myData.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                           // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("doc asa load table error!!!");
                }
            });
    
           
            
          
    
        
        },
        formPill:function(){
            var $formPill= 
                '<div class="row " >'+
                    '<input type="hidden" id="cell" name="cell" />'+
                    '<input type="hidden" id="day" name="day" />'+
                    '<input type="hidden" id="id" name="id" />'+
                    '<input type="hidden" id="data" name="data" />'+
                    '<input type="hidden" id="index" name="index" />'+
                    '<input type="hidden" id="id_utente" name="id_utente" />'+
                    '<div class="form-group col-lg-6">'+
                        '<label >Data </label>'+
                        '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1" readonly/>'+ 
                    '</div>'+
                    '<div class="form-group col-lg-12">'+
                        '<label for="tipo">Tipo presenza</label>'+
                        '<select  class="form-control" name="tipo_presenza" id="tipo_presenza">'+
                        '<option value=""></option>'+
                        '<option value="D">D (Diurno)</option>'+
                        '<option value="MG">MG (Mezza Giornata)</option>'+
                        '<option value="A">A (Assente)</option>'+
                        '</select>'+
                        '<span class="help-inline"></span>'+    
                    '</div>'+
                '</div>';
            return $formPill;
        },
        subCell:function(ev,field, value, row, $element,ind){// update
          let $table=$("#table");
          console.log(field, value, row, $element,ind);
            console.log($element[0].attributes.preUT);
            if($element[0].attributes.preUT.value=="false"){return}
         /*   console.log(ev);
            console.log((ev.currentTarget.attributes.day));
            console.log((ev.currentTarget.attributes.id_presenza));
            console.log((ev.currentTarget.attributes.presenza));
            console.log((ev.currentTarget.attributes.utente));
            console.log((ev.currentTarget.attributes.idx_utente));
            console.log((ev.currentTarget.attributes.id_utente));*/
            var  dataL=$element[0].attributes.dayL.value+" "+$element[0].attributes.day.value+" "+$element[0].attributes.monthL.value+" "+$("#year").val();
           
            var  data=$("#year").val()+"-"+(Number($("#mese").val())+1)+"-"+$element[0].attributes.day.value;
            console.log(data,dataL);
            // alert('nota: '+book.attributes.nota);
            this.$("#newModalForm").empty();
            this.$("#newModalForm").append(
            this.formPill()      
           
            );

          //  if(typeof($element[0].attributes.id_presenza) !== "undefined"){
                this.$("#modal").find('#tipo_presenza').val(value);
                this.$("#modal").find('#id').val(value);
          //  }
            this.$("#modal").find('#day').val($element[0].attributes.day.value);    
            this.$("#modal").find('#cell').val($element[0].attributes.id.value);
            this.$("#modal").find('#index').val($element[0].attributes.autoindex.value);
            this.$("#modal").find('#id_utente').val($element[0].attributes.id_utente.value);
            this.$("#modal").find('#data').val(data);
            this.$("#modal").find('#dataTemp1').val(dataL);
            this.$("#modal").find('.submit').text('Update');
            this.$("#modal").find('.modal-title').text("Presenza ospite "+$element[0].attributes.utente.value);
            
            this.$("#modal").modal('show'); 
        },
        archivio:function (that) {
            console.log("archivio");
         
            app.routers.asaRouter.prototype.asa_cd_anziani_po_archivio();               //chiama la pagina data_type_edit
      
        },    
        selRow:function(e, row, $element,options){
    
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/asa_cd_anziani_items" >'+row.servizio+'</a></li>'
            });
            console.log(row);
            app.global.nick_array.arr=row;
           
            app.routers.asaRouter.prototype.asa_cd_anziani_items();               //chiama la pagina data_type_edit
      
        },
        addRow:function (that) {
        console.log(app.global.nick_array.arr.id,that);
     
       $(".modal-body").empty();   
       $(".modal-body").append(        
           '<form id="modContratto" >'+
           '<div  class="form-group col-lg-12 alle">'+
               '<div class="form-group col-lg-6">'+
                   '<label>Data del documento *</label>'+
                   '<div class="input-group date " id="datetimepicker1">'+

                       '<input type="text" class="form-control "  id="dataTemp" name="dataTemp" />'+ 
                       '<span class="input-group-addon">'+  
                           '<span class="glyphicon glyphicon-calendar"></span>'+ 
                   '</span>'+
                   '</div>'+
               '</div>'+
               '<div class="form-group col-lg-6">'+
                   '<label  >Note</label>'+
                   '<input type="text" class="form-control" name="note" id="note"  >'+
               '</div>'+

               '<div class="form-group col-lg-5">'+
                   '<label for="allegato">Seleziona file</label>'+
                   '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+

               '</div>'+


           '</div>'+ 
           '<button type="button" id="btnAlle" name="btnAlle" class="btn btn-primary submit ">Add File</button>'+
           '</form >'
       );
       $('#datetimepicker1').datetimepicker({ 
           format: "mm/yyyy",
           autoclose: true,
           startView: 3,
           minView: 3,
           
           language: "it"
       }).show();
       $('#datetimepicker1').datetimepicker('setStartDate', '-2y');
       $('#datetimepicker1').datetimepicker('setEndDate', '+0d');
      
       $("#modContratto").validate(); //sets up the validator

       $("input[name=\"allegato").rules( "add", {
           required: true,
           //number: true,
           // minlength: 2,

           messages: {
               required: "Required input"
               //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
               // number:"Inserire un numero!"
           }
       });
       $("input[name=\"dataTemp").rules( "add", {
           required: true,
           //number: true,
           // minlength: 2,

           messages: {
               required: "Required input"
               //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
               // number:"Inserire un numero!"
           }
       });
       $("#modal").modal('show');
       $('.modal-title').text("Add Presenza ospiti");
       //qui
       
       $('#btnAlle').on("click",function(e) {
           if($("#modContratto").valid()){
             
               //--------------------------------------------------------------
               var API_URL = app.global.json_url + 'asa/doc/';
               
               //var jsonObj = sendUrbans_formToJson(that);
               var form_data = new FormData($('#modContratto')[0]); 
               form_data.append('person', app.global.tokensCollection.first().get("id_person"));
               form_data.append('action', 'add');
               form_data.append('tipo', 'po');
               form_data.append('sub_area', app.global.sub);
               
               form_data.append('id_ser', app.global.nick_array.arr.id);
     
       
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
                       
                           $("#modal").modal('hide');
                          
                       }
                   }
               });
         
             
                
           }else{
               console.log("btnAlle invalid");  
           }
           $('#modal').on('hidden.bs.modal', function () {
               app.routers.asaRouter.prototype.asa_cd_anziani_po();
           });
        
       });  

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
       
        selCall: function (that) {//richiesta dati per popolare tabella, status Month 0 1
            $action="post";
            $url=app.global.json_url+'asa/po/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
                
            API_URL=$url;
            var jsonObj = {};
            jsonObj.action = "get";
            jsonObj.sub_area = app.global.sub;
            jsonObj.type = "PO";
            jsonObj.year = that.$("#year").val();
            jsonObj.month =  that.$("#mese").val();
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.id_servizio = app.global.nick_array.arr.id;
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url: API_URL,
                type: 'post',
                data :  jsonObj,
                dataType : 'text',
                headers: this.headerJson(),
                
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        that.utenti=$myData.utenti
                        app.global.nick_array.data=$myData
                        that.hrTable(that,$myData); 
                    }
                    else {
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $myData.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }
                },
                error: function () {
                    console.error("doc asa load table error!!!");
                }
            });
        }, //end selCall()----------------------------------------------------------------------
        hrTable: function (that,my) {//popola tabella con i dati ricevuti
            $table= that.$('#table');
            $mese= that.$('#mese');
            $anno= that.$('#year');
            $planD=my.presenze;
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
          
            
            that.$(".toolbar").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
            }
            $.each( my.utenti, function( key, value1 ){
                console.log(value1);
                if(typeof(value1.data_dimissioni) !== "undefined" && value1.data_dimissioni !== null){ 
                    $annoEnd=moment(value1.data_dimissioni).format('YYYY');
                    $meseEnd=moment(value1.data_dimissioni).format('MM');
                }else{$annoEnd='',$meseEnd=''}
                if(typeof(value1.data_inserimento) !== "undefined" && value1.data_inserimento !== null){ 
                    $annoStart=moment(value1.data_inserimento).format('YYYY');
                    $meseStart=moment(value1.data_inserimento).format('MM');
                }else{$annoStart='';$meseStart=''}
               
             
                
                
                console.log($annoStart,$annoEnd,that.$("#year").val(),that.$("#mese").val());
                if(typeof($annoEnd) !== "undefined" && $annoEnd !== null){  
                    if ($annoEnd >= that.$("#year").val() && $annoStart <= that.$("#year").val()){
                        console.log($annoEnd,that.$("#year").val(),$annoStart)
                    }
                }else{
                    console.log(that.$("#year").val(),$annoStart)}
                if(typeof(value1["data_doc"]) !== "undefined" && value1["data_doc"] !== null){    
                    value1["data_docT"]='<span>'+moment(value1["data_doc"]).format('YYYYMMDD')+'</span>'+moment(value1["data_doc"]).format('MM/YYYY');
                    value1["data_doc"]=moment(value1["data_doc"]).format('DD/MM/YYYY');
                    
                }
            }); 
            
            let date = new Date();//date default start courrent date
            let date1 = new Date();
            let day = date.toLocaleString('it-IT', {weekday: 'short'});
            let month = date.toLocaleString('it-IT', {month: 'short'});
            var tab = moment(date).daysInMonth();
           
            $anno.empty();
           
            for(let i=0;i<my.anni.length;i++){//casomai ci fossero anni precedenti
                $anno.append('<option value="'+my.anni[i].anno+'">'+my.anni[i].anno+'</option>');
            }    
           
                $anno.val(localStorage.getItem("selYear"));
           
           
                $mese.val(localStorage.getItem("selMonth"));
               
              
            var columns=[];
            setDays(tab);
            function setDays(tab1){
                  
                date1.setMonth(Number($mese.val()))
                date1.setYear(Number($anno.val()))
              
                tab = moment(date1).daysInMonth() ;
                console.log(date1,tab);
                columns=[];
                let $utenti="";
                if(my.utenti.length===1){
                    $utenti=my.utenti.length+" Utente";
                }else{
                    $utenti=my.utenti.length+" Utenti";
                }
                columns[0] = {
                    "field":0,
                    "title":$utenti,
                    footerFormatter:idFormatter,
                    cellStyle: cellStyle1,
                    align: 'center',
                    valign: 'middle'
                           
                }
                let setBg="";
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'};
                for (let index = 1; index < tab+1; index++) {
                    date1x=$anno.val()+"-"+(Number($mese.val())+1)+"-"+(index);
                    date1 = new Date(date1x);
                    date1a =date1.toLocaleDateString("en-US");
                    datea =date.toLocaleDateString("en-US");
                  //  console.log(datea,date1a);
                    if(datea===date1a){
                        setBg="background-color:LightSalmon";
                    }else{
                        setBg="";
                    }
                    day = date1.toLocaleString('it-IT', {weekday: 'short'});
                    columns[index] = {
                        "field":index,
                        "title":index+"<br>"+day,
                        footerFormatter:colFormatter,
                        valign: 'middle; '+setBg,
                        cellStyle: cellStyle2 
                    }
                   
                }
              
                columns[tab+1] = {
                    "field":tab+1,
                    "title":"D",
                    footerFormatter:priceFormatter,
                    cellStyle: cellStyle1,
                    align: 'center',
                    valign: 'middle'
                           
                }
                columns[tab+2] = {
                    "field":tab+2,
                    "title":"MG",
                    footerFormatter:priceFormatter,
                    cellStyle: cellStyle1,
                    align: 'center',
                    valign: 'middle'
                           
                }
                columns[tab+3] = {
                    "field":tab+3,
                    "title":"A",
                    footerFormatter:priceFormatter,
                    cellStyle: cellStyle1,
                    align: 'center',
                    valign: 'middle'
                           
                }
            setTable();
            }
            function cellStyle1(value, row, index, field) {
              
                return {
                
                  classes: '" bgcolor="eeeeee" id="R'+(Number(index)+1)+'C0'+field+'"  '
                };
                return {};
            } 
            function cellStyle2(value, row, index, field) {
               
                let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                let date1x=$anno.val()+"-"+(Number($mese.val())+1)+"-"+(field);
                let date1 = new Date(date1x);
                let date1a= date1.toLocaleString('it-IT', options);
                let obliv="";
                let preUT=my.presenzeUt;
                /*
                for(let xx=0;xx< my.presenze.length; xx++){
                    console.log( Date.now(),xx,my.presenze.length); 
                    let date2 = new Date(my.presenze[xx].data);
                let date2a= date2.toLocaleString('it-IT', options);
                    if(date1a==date2a && my.presenze[xx].id_utente==my.utenti[index].id){
                        obliv="id_presenza="+my.presenze[xx].id+ " presenza="+my.presenze[xx].presenza
                    }
                }*/
                dayL = date1.toLocaleString('it-IT', {weekday: 'long'});
                monthL=date1.toLocaleString('it-IT', {month: 'long'});
                return {
                   classes: 'cell" '+obliv+' preUT='+preUT+' autoIndex="'+(index)+'" id="R'+(Number(index)+1)+'C'+(field)+'" monthL="'+(monthL)+'" dayL="'+(dayL)+ '" day="'+(field)+ '" utente="'+row[0]+ '" idx_utente="'+index + '" id_utente="'+my.utenti[index].id //
                    
                };
    
                return {};
            }  
            function idFormatter() {
                return 'Riepilogo giornaliero / mensile'
            }
            function nameFormatter(data) {
            return data.length
            }
            function priceFormatter(data) {
            var field = this.field;
                
            return  data.map(function (row) {
                return +row[field]
            }).reduce(function (sum, i) {
                return sum + i
            }, 0)
            }  
            function colFormatter(data) {
                var field = this.field
                
                return  "D="+data.map(function (row) {
                    if(row[field]==="D"){
                        return +1 
                    }else{
                        return +0   
                    }
                  //  return +row[field]
                }).reduce(function (sum, i) {
                    
                    return sum + i
                }, 0);
                
                }   
            function setTable(){
                console.log("tab(giorni)="+tab);
              
                var cells, rows;
                var i, j,row;
               
                var data = [],        
                $el= this.$('#table');
                cells=tab;//giorni del mese prescelto
                
             
                rows=my.utenti.length;
              
              
                for (i = 0; i < rows; i++) {
                  
                    row = {};
                    //----------------popolo la prima colonna con il nome utenti --------------                
                    //  console.log(" utente="+my.utenti[i].utente,my.utenti);
                    row[0] =my.utenti[i].utente;//
    
                    //---------------popolo le altre celle----------------------------------------------------------------
                    let sumA=0;
                    let sumD=0;
                    let sumMG=0;
                   
                    for (j = 0; j < cells; j++) {
                        
                        row[j+1]="";
                        for (y = 0; y < $planD.length; y++) { 
                            var dayOf =Number(moment($planD[y].data ,'YYYY-MM-DD').format('DD')); 
                            var monthOf =Number(moment($planD[y].data ,'YYYY-MM-DD').format('MM'));
                            var yearOf =Number(moment($planD[y].data ,'YYYY-MM-DD').format('YYYY'));   
                         //  console.log(my.utenti[i].id,$planD[y].id_utente,dayOf,j+1,Number($("#mese").val())+1,monthOf, yearOf,Number($("#year").val()));
                            if (my.utenti[i].id===$planD[y].id_utente && dayOf===(j+1) && monthOf===(Number($("#mese").val())+1) && yearOf===(Number($("#year").val()))){
                              //  console.log("IF OK",my.utenti[i].id,$planD[y].id_utente,dayOf,j+1,Number($("#mese").val())+1,monthOf,$planD[y].presenza);
                                row[j+1]=$planD[y].presenza;
                               
                                switch ($planD[y].presenza) {
                                    case "D":
                                        sumD+=1;
                                        break;
                                        case "MG":
                                            sumMG+=1;
                                        break;
                                        case "A":
                                            sumA+=1;
                                        break;    
                                
                                }
                              
                            }else{
                          //      console.log("IF KO",my.utenti[i].id,$planD[y].id_utente,dayOf,j+1);
                                //  row[j+1]="";
                            }
                        }
                    }  
                    row[cells+1] =sumD;//  
                    row[cells+2] =sumMG;//  
                    row[cells+3] =sumA;//  
                    data.push(row);
                }//for (i = 0; i < rows; i++) {    
                console.log(" data0="+data[0],data);
               
                $table.bootstrapTable('destroy');
                $table.bootstrapTable({
                    data: data,
                    columns: columns,
                    search: true,
                    pagination: false,
                    showFooter:true
                });
              
              
            }
            
            this.$("#countSer").prepend(' '+my.presenze.length);
            function actionFormatter(value) {
                return [$format].join('');
            }  
          
                
        },
        summa: function () {
            let sumA=0;
            let sumD=0;
            let sumMG=0;
           
           $data=this.$("#table").bootstrapTable('getData');
           console.log("summa",$data);
           $.each($data,function(index,$value) {
            $.each($value,function(index1,$day) {
                switch ($day) {
                    case "D":
                        sumD+=1;
                        break;
                        case "MG":
                            sumMG+=1;
                        break;
                        case "A":
                            sumA+=1;
                        break;    
                
                }
           });
        });
       
        console.log(sumA,sumD,sumMG);
        this.$("#table").bootstrapTable('refresh');
            } , 
        setSelect:function(that,anno,mese,anni=[]){
            console.log(anno,mese,anni);
            $mese= that.$('#mese');
            $anno= that.$('#year');
            let date = new Date();
            $mese.empty();
            
            for (let index = 0; index < 12; index++) {
                date.setMonth(index)
                month = date.toLocaleString('it-IT', {month: 'long'});
              
                $mese.append('<option value="'+index+'">'+month+'</option>');
            }
            $anno.empty();
            let $arrAnno=[];
            $arrAnno.push(anno);
            if(anni.length===0){
                for(let i=0;i<anni.length;i++){
                    $arrAnno.push(anni[i]);
                
                } 
                var uniq = $arrAnno.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                },[]);
                for(let i=0;i<uniq.length;i++){
                    
                    $anno.append('<option value="'+uniq[i]+'">'+uniq[i]+'</option>');
                } 
            }else{
                $anno.append('<option value="'+anno+'">'+anno+'</option>');
            }  
            $anno.val(anno);
            $mese.val(mese);
           
          
        },
        htmlPdf:function(){
            window.html2canvas = html2canvas;
            var doc = new jsPDF("l", "mm", "a4");
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            var w = document.body.offsetWidth;
            var h =document.body.offsetHeight;
            var ratio = h / w;
            html2canvas(document.body).then(function(canvas) {
              //var dpi= 300; // Set to 300 DPI
              //var scale= 3; // Adjusts your resolution
              
                var img = canvas.toDataURL("image/jpeg", 1);
                var widthd = doc.internal.pageSize.getWidth();    
                 var heightd = doc.internal.pageSize.getHeight();
                height = ratio * widthd;
                doc.addImage(img, 'JPEG', 5, 5, widthd-10, height-10);
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
            
                doc.save('presenze ospiti '+app.global.nick_array.arr.servizio+' '+datestring+'.pdf');
            
            });
      /*         html2canvas(document.body).then(function(canvas) {
                
                    // canvas is the final rendered <canvas> element
                    var image = new Image();
                    image.src = canvas.toDataURL("image/png");
                    
                    var w = window.open("");
                    w.document.write(image.outerHTML);
                   // window.open(myImage,'_blank');
                   var doc = new jsPDF('l', 'mm');
                   doc.addImage(image, 'PNG', 10, 10);
                   doc.save('presenza ospiti.pdf');
                    
               
            });
          const doc = new jsPDF('p', 'pt', 'landscape');
             html2canvas($('#contrattiForm')[0]).then(function(canvas) {
               // document.body.appendChild(canvas);
               source=canvas;
               margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            doc.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width // max width of content on PDF
                  
                },
    
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    doc.save('Test.pdf');
                }, margins
            );
            });
       
            const doc = new jsPDF('p', 'pt', 'letter');
            source = $('#contrattiForm')[0];
            doc.fromHTML(
                source, // HTML string or DOM elem ref.
               
    
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    doc.save('Test.pdf');
                }
            );
              
            doc.html(document.body, {
                callback: function (doc) {
                  doc.save(a6.pdf);
                }
             });
   
            // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
           var pdf = new jsPDF('p', 'pt', 'letter');
            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            source = $('#contrattiForm')[0];
    
            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },
    
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    pdf.save('Test.pdf');
                }, margins
            );*/
        },
        pdf:function(id,file){
        
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
              // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
                row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
            }
            $ar.push(row);   
         }
     
        var jsonObj = {};
      
        var  $uurl= app.global.json_url + 'asa/po/';
        //jsonObj.nameQuery =$NameQuery;
        //jsonObj.table =arTable;
        jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type ="pdf";
        jsonObj.table =$ar;
        jsonObj.action ="download";
        jsonObj.year = that.$("#year").val();
        jsonObj.month =  that.$("#mese").val();
        jsonObj.id_servizio = app.global.nick_array.arr.id;
        //jsonObj.objParT =$arT;
        jsonObj.file =file;
        jsonObj = JSON.stringify(jsonObj);
       
        $.ajax({
            url: $uurl,
            type:'post',
            headers : this.headerJson(),
            dataType : 'text',
            data:jsonObj,
            
            success: function (json) {
                            $mydata =JSON.parse(json);    
               $filex=$mydata.file;
               // console.log(id+"=id file="+$filex);
               // console.log(" filex="+$filex);
              // window.location=$filex;
                window.open($filex,'_blank');
                

               //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
            }
                    
        });
    
      
        },
        render: function () {
            $(this.el).html(this.template());
            
            console.log(app.global.sub); // value=asa_cd_anziani | asa_cd_socializzazione   --app.global.sub viene impostato dalla selezione del navbar tramito il click sul selettore rifraf
           
            
            $person = app.global.tokensCollection.first().get("id_person");
            $servizio = app.global.tokensCollection.first().get("id_servizio");
            $token = app.global.tokensCollection.first().get("auth").token;
            //-----------breadcrumb---------------------------------------------------------
            while (app.global.breadcrumb.length>3) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //-------------------------------------------------------------------------------
            this.item="po";
            //-----------first date actual-------------------------------------
            let date = new Date();
            let mese=date.getUTCMonth();
            let anno=date.getUTCFullYear();
            localStorage.setItem("selYear",  anno);
            localStorage.setItem("selMonth",  mese);  
            this.setSelect(this,anno,mese)
            this.selCall(this);//
            //----------------------------------------------------
            c2=' <button href="pdf.pdf" title="PDF" type="button" class="btn " id="pdf"  download> </i><img src="./css/img/pdf.png"  width="30px"/></button>';
   
            this.$("#downFile").empty();  
            this.$("#downFile").append(c2); 
            that=this;
            this.$('#pdf').click(function () {
                id=this.id;
                console.log(app.global.nick_array);
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
            
                //that.pdf(this.id,'Presenze Ospiti '+datestring+'.pdf');
                that.htmlPdf();
            });
            
            $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
            return this;

        },
        destroy_view: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.asa_cd_anziani_poView=null
        }
    });
return app.views.asa_cd_anziani_po;
});