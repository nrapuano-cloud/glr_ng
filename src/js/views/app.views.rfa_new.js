require(['app','he','bootbox'], function(app,he,bootbox){
app.views.rfa_new = Backbone.View.extend({
     
   
    
    initialize:function(){
        // app.global.nick_array.prodottiON=[]; 
        this.prodottiCarrello=[]; 
        this.tabCarrello=[]; 
   
    	console.log("initializing rfa_new view");
    },

    events:{
        'submit':  'send_',
        'search.bs.table':'searchTable',
        'click #addProdottoxx':'addProdotto',
        'click removeProdx':'removeProdotto'
    
    },
    
    removeProdotto:function(e,text){ 
        console.log('remove');  
    },
    
    addProdotto:function(e,text){ 
       var $tableCarrello=this.$('#tableCarrello'); 
       console.log(e);
   
        if(this.$("#modProd").valid()){
            console.log('pro_valid');  
             var $id=app.global.nick_array.prodottiCONSENZAid +1;        
            app.global.nick_array.prodottiCONSENZA.push({'id':$id,'fornitore':this.$('#fornitore').val(),'codice': this.$('#codice').val(),'descrizione':this.$('#prodotto').val(),'quantita':this.$('#quantita').val()});
            var $prodotti= app.global.nick_array.prodottiCONSENZA;
            console.log($prodotti);
            var tabCarrello=
                    [
                {
                 "field": "fornitore",
                 "title": "Fornitore",
                 "sortable": true
               },
               {
                 "field": "codice",
                 "title": "Codice",
                 "sortable": true
               },
               {
                 "field": "descrizione",
                 "title": "Descrizione",
                 "sortable": true
               },

               {
                 "field": "quantita",
                 "title": "Quantità",
                 "sortable": true,
                 "editable": {
                   "type": "number",
                   "step": "1",
                   "min": 0,
                   "max": 1000,
                   "title": "Quantità"
                 }
               } /*,
               {
                    "field": "action", 
                    "title": "Action", 
                    "align": "center",
                  "events": actionEvents,
                    "formatter": formatter }*/
             ];
           
           $tableCarrello.bootstrapTable('destroy');
            $tableCarrello.bootstrapTable({
                 data: $prodotti,
                 columns: tabCarrello,
                 showColumns:false



             }); 
           
        this.$('#invio').prop( "disabled", false );
        this.$('#fornitore').val('');
        this.$('#codice').val('');
        this.$('#prodotto').val('');
        this.$('#quantita').val('');
         
                }
       
       else{
                         console.log('pro_invalid');  
                      }
           function formatter() {
        return [
           "<a class=\"removeProd\" href=\"javascript:\" title=\"Delete \"><i class=\"glyphicon glyphicon-remove-circle\"></i></a>"
                 ].join('');
    };
              window.actionEvents = {
    
            'click removeProdxx': function (e, value, $row) {
                
                if (confirm('Sei sicura/o di voler rimuovere questo Prodotto?')) { 
                }
            }};
         function actionEvents() {
      console.log('esssie');
    }                   
       //-------------------------------------------
     var that=this;
       $tableCarrello.on('editable-save.bs.table', function (e, field, row,index,old,kk) {//per sincronizzare con tab prodotti
          
                         
            if( row.quantita ==="0" || row.quantita ===""){
                console.log(row.quantita);
                console.log(index);
                console.log(row.id);
               
                that.$('#tableCarrello').bootstrapTable('remove', {
                    field: 'id',
                    values: row.id
                  } );
                 
           
                
            }
                  $prodotti1=_.filter(that.$('#tableCarrello').bootstrapTable('getData'), function(num){ return num.quantita !=="" && num.quantita !==0; });
             that.$('#tableCarrello').bootstrapTable('destroy');
console.log($prodotti1);

      that.$('#tableCarrello').bootstrapTable({
            data: $prodotti1,
            columns: tabCarrello,
            showColumns:true
           
           
           
        });

            }); 
           
          
          
      

       //-------------------------------------------
   },  
    searchTable:function(e,text){
        console.log(text);
        //------------------------------------------------------------------------
     /*
        $prodotti=this.prodottiCarrello;
        
        //$prodotti=_.filter($('#table').bootstrapTable('getData', {useCurrentPage: false}), function(num){ return num.quantita !="" && num.quantita !="0"; });
        console.log($prodotti);
        var totalPrezzo=0; 
        var totalPrezzoConIva=0;
        var totalArticoli = 0;
        var  $totStringa='';
        const formatter = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
          })

        $($prodotti).each(function(i){
            console.log($prodotti[i]);
            console.log($prodotti[i]);
            console.log($prodotti[i].prezzo);
            console.log($prodotti[i].quantita);
            $prezzo0=parseFloat($prodotti[i].prezzo).toFixed(2);
           
            $prodotti[i].prezzo=formatter.format($prezzo0);
            $totImp0=parseFloat(parseFloat($prezzo0)*parseInt($prodotti[i].quantita)).toFixed(2)
            $prodotti[i].totImp=formatter.format($totImp0);
            $totIva0=parseFloat(((parseFloat($totImp0)*parseInt($prodotti[i].iva))/100)+parseFloat($totImp0)).toFixed(2);
            $prodotti[i].totIva=formatter.format($totIva0);
          
             
            totalPrezzo = totalPrezzo+ parseFloat($totImp0);
            totalPrezzoConIva =  totalPrezzoConIva+ parseFloat($totIva0);
            totalArticoli = totalArticoli+1;
            console.log($prodotti[i]);
            console.log(totalArticoli);
        });
        if(totalArticoli!=1){
           $fin ='i';
        }else{
           $fin ='o'; 
        }
       
        console.log(formatter.format(totalPrezzo)); // 
       // console.log(isNaN(totalPrezzo).toString()+' -- '+totalPrezzo);
        if(isNaN(totalPrezzo) || totalPrezzo==0 ){
          $totRow =''; 
        }else{
            $totRow='<div class="row">'+
                        '<div class="form-group col-lg-3"><h3>Importo totale ordine</h3></div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label >IVA esclusa</label>'+
                            '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzo)+'" readonly>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label >IVA inclusa</label>'+
                            '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzoConIva)+'" readonly>'+
                        '</div>'+
                    '</div>'+
                
                    '<div class="row">'+
                
                    '</div>'; 
        }
        
         $('#headCarrello').empty().append( '<h3>Carrello con  '+totalArticoli+' articol'+$fin+'. '+'<h3>');     
        $('#tot').empty().append( $totRow); 
     $.each(this.tabCarrello, function( key, value1 ){
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
        $('#tableCarrello').bootstrapTable('destroy');

      $('#tableCarrello').bootstrapTable({
            data: $prodotti,
            columns: this.tabCarrello,
            showColumns:true
           
           
           
        });
        */
        //-----------------------------------------------------------------------
    },
   
    render:function(){
    	$(this.el).html(this.template());
        
        console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        
        
        this.$('#link_root_rfa').tooltip({title: 'window' })
        var $selTipo=this.$("#tipo");
        var $selServizioEx=false;//se esiste la select x conto servizi?
        var $selServizio=this.$("#servizi");//il div
        var $selServizioX="";//la select
        var $table,$tableCarrello="";
        
        console.log(this.proddottiON);
        
        
        var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        var  uurl=app.global.json_url+'rfa/';
        $person = app.global.tokensCollection.first().get("id_person");
        $servizio = app.global.tokensCollection.first().get("id_servizio");
        console.log($servizio,$person);
        jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
        jsonObj.person =$person ;              
        jsonObj.action = "modulo";
        jsonObj.type = "ordine";     
        jsonObj = JSON.stringify(jsonObj);
        
        this.$('#id_person').prop( "value", $person );
        
          
        var that=this;
    	
        //-------------------------------tipologie prodotto---------------------
           
        $.ajax({
            url:uurl+"ordini/",
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (json) {

                $mydata =JSON.parse(json);

                if ($mydata.success){
                    $selTipo.empty();
                    $aa=$mydata.data;

                    if($mydata.selServizi!==""){
                        $selServizioEx=true;
                        console.log($selServizioEx);
                        $selServizio.append($mydata.selServizi); 
                        $bb=$mydata.servizi;
                        $selServizioX=that.$("#servizio");
                        $selServizioX.append('<option value="0">Seleziona</option>');
                        $.each($mydata.servizi, function(i, value) {
                            $selServizioX.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                        });
                        console.log($servizio);
                        $selServizioX.val($servizio);
                        $selServizioX.change(function (e,value,row) {

                            that.$("#fornitori").empty();
                            that.$("#prodotti").empty();
                            $selTipo.val(0);
                        });
                    }

                    $selTipo.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        $selTipo.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["description"]+'</option>');
                    });

                }else{

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons:{
                            main:{
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function(){
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
//------------------------------------------------------------------------------
        this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
        this.$('#datetimepicker1').datetimepicker('setStartDate', '+1w');
        this.$('#datetimepicker1').datetimepicker('setEndDate', '+5m');
        that=this;
        $selTipo.change(function (e,value,row) {
            
            that.$("#fornitori").empty();
            that.$("#prodotti").empty();
            that.$("#orario").empty();
            that.$('#invio').prop( "disabled", true);
            switch (e.currentTarget.value)//preparo il form adeguato alla categoria selezionata
            {
                case "1": //Alimentari
                { that.$("#tempistica").show();
                    varForm='<label for="selFornitori">Seleziona il Fornitore *</label>'+
                            '<select  id="selFornitori" name="selFornitori"  class="form-control" ></select><br>';
                 
                    that.$("#fornitori").append(varForm);
                    fornitori(); }
                    break;
                case "2": //Prodotti Pulizie
                case "3": //Prodotti medicali
                case "4": //Cancelleria
                case "9": //Materiale per attività 
                case "13": //Prodotti igiene FULL RENT  
                    {that.$('#dataTemp').val('');
                     that.$('#datetimepicker1').datetimepicker('initialDate', new Date());
                     that.$('#datetimepicker1').datetimepicker('setStartDate', '+1w');
                    that.$("#tempistica").show();
                    varForm='<label for="selFornitori">Seleziona il Fornitore *</label>'+
                            '<select  id="selFornitori" name="selFornitori"  class="form-control" ></select><br>';
                 
                    that.$("#fornitori").append(varForm);
                    fornitori(); }
                    break;
                case "5": //Servizi approvvigionamento
                {
                    varForm='<label for="selFornitori">Seleziona categoria *</label>'+
                            '<select  id="selFornitori" name="selFornitori"  class="form-control" ></select><br>';
                 
                    that.$("#fornitori").append(varForm);
                    
                    /*
                    $aa=[{'id':0,'name':''},
                        {'id':1,'name':'Cambio SIM'},
                        {'id':2,'name':'Sostituzione Telefono'},
                        {'id':3,'name':'Sostituzione Tablet'},
                        {'id':4,'name':'Passaggio profilo '},
                        {'id':5,'name':'Ricarica credito'},
                        {'id':6,'name':'Richiesta servizio lavanderia'}]
                       
                    $.each($aa, function(i, value) {
                        that.$("#selFornitori").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    }); */
                   fornitori(); }
                    break;
                case '10': //Definizione Fabbisogno di Fornitura SENZA richiesta di approvazione
                case '11': //Definizione Fabbisogno di Fornitura CON richiesta di approvazione
                { that.$('#dataTemp').val('');
                     that.$('#datetimepicker1').datetimepicker('initialDate', new Date());
                    var $labelTitle='';
                    if(e.currentTarget.value==='11'){
                        $labelTitle=" <strong style=\"color:#FF0000\";>CON</strong> ";
                         that.$('#invio').prop( "disabled", false);
                    }else{
                        $labelTitle=" <strong style=\"color:#FF0000\";>SENZA</strong> ";
                        that.$('#invio').prop( "disabled", false);
                    }
                    varFormX='<div class="panel panel-default">'+
                            '<div class="panel-body">'+
                                '<div class="form-group row text-center">'+
                                    '<label class="text-center">Definizione Fabbisogno di Fornitura '+$labelTitle+' richiesta di approvazione</label>'+
                                '</div>'+
                                '<div class="form-group row">'+
                                    '<div class="col-sm-12">'+  
                                        '<label for="fornitore">Fornitore</label>'+

                                        '<input type="text" id="fornitore" name="fornitore" class="form-control" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group row">'+
                                    '<div class="col-sm-2">'+
                                        '<label for="codice">Codice</label>'+
                                        '<input type="text" id="codice" name="codice" class="form-control" >'+
                                    '</div>'+
                                    '<div class="col-sm-9">'+   
                                        '<label for="prodotto">Descrizione prodotto *</label>'+
                                        '<input type="text" id="prodotto" name="prodotto" class="form-control">'+
                                    '</div>'+  
                                    '<div class="col-sm-1">'+   
                                        '<label for="quantita">Q.tà *</label>'+
                                        '<input type="text" id="quantita" name="quantita" class="form-control">'+
                                    '</div>'+  
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '<br>';
               varForm='<form id="modProd" >'+
			'<div class="panel panel-default">'+
                            '<div class="panel-heading text-center" ><h3>Definizione Fabbisogno di Fornitura '+$labelTitle+' richiesta di approvazione<h3> </div>'+
                     
                            '<div class="panel-body">'+
                               
                                '<div class="form-group row">'+
                                    '<div class="col-sm-12">'+  
                                        '<label for="fornitore">Fornitore</label>'+

                                        '<input type="text" id="fornitore" name="fornitore" class="form-control" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group row">'+
                                    '<div class="col-sm-2">'+
                                        '<label for="codice">Codice</label>'+
                                        '<input type="text" id="codice" name="codice" class="form-control" >'+
                                    '</div>'+
                                    '<div class="col-sm-9">'+   
                                        '<label for="prodotto">Descrizione prodotto *</label>'+
                                        '<input type="text" id="prodotto" name="prodotto" class="form-control">'+
                                    '</div>'+  
                                    '<div class="col-sm-1">'+   
                                        '<label for="quantita">Q.tà *</label>'+
                                        '<input type="text" id="quantita" name="quantita" class="form-control">'+
                                    '</div>'+  
                                '</div>'+
                                '<button type="button"  class="btn btn-info  addProdotto" id="addProdotto"  value="addProdotto" >Add Prodotto</button>'+
                            '</div>'+ 
                                
                            
                        '</div>'+     
                        '<div class="panel panel-default">'+
                            '<div class="panel-heading text-center" id="headCarrello"><h3>Carrello<h3> </div>'+
                            '<div class="panel-body">'+

                                '<div id="tot"></div>'+
                                '<div class="row">'+
                                    '<p class="toolbarCar">'+

                                    '<span class="alert"></span>'+
                                    '</p>'+
                                     '<div id="divTabCar">'+
                                    '<table id="tableCarrello" name="tableCarrello" class="table table-striped"> </table>'+
                                    '</div>'+ 
                                '</div>'+
                            '</div>'+
                        '</div>'+
                         '</form >';
                    that.$("#fornitori").append(varForm);   
                   that.$('#invio').prop( "disabled", true );
                    app.global.nick_array.prodottiCONSENZA=[];
                   
                    that.$("#modProd").validate(); //sets up the validator
                    //this.$(".modal-body").validate(); //sets up the validator
                    $("input[name=\"prodotto\"]").rules( "add", {
                        required: true,
                          //number: true,
                          // minlength: 2,

                        messages: {
                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });
                    $("input[name=\"quantita\"]").rules( "add", {
                        required: true,
                         number: true,
                          // minlength: 2,

                        messages: {
                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });
    
                    that.$("#addProdotto").click(function(e) {


                        var $tableCarrello=$('#tableCarrello'); 
                        console.log(e);

                        if($("#modProd").valid()){
                            console.log('pro_valid');  

                            app.global.nick_array.prodottiCONSENZA.push({'fornitore':$('#fornitore').val(),'codice': $('#codice').val(),'descrizione':$('#prodotto').val(),'quantita':$('#quantita').val()});
                            var $prodotti=[];
                            var $prodotti1=[];
                                    $prodotti=app.global.nick_array.prodottiCONSENZA;
                            console.log($prodotti);
                              $.each($prodotti, function (i, row) {
                                     
                                    row.index = i;
                                     console.log(i);
                                    console.log(row);
                                    console.log(row.index);
                                });
                            var tabCarrello=
                                    [
                                {
                                 "field": "fornitore",
                                 "title": "Fornitore",
                                 "sortable": true
                               },
                               {
                                 "field": "codice",
                                 "title": "Codice",
                                 "sortable": true
                               },
                               {
                                 "field": "descrizione",
                                 "title": "Descrizione",
                                 "sortable": true
                               },

                               {
                                 "field": "quantita",
                                 "title": "Quantità",
                                 "sortable": true,
                                 "editable": {
                                   "type": "number",
                                   "step": "1",
                                   "min": 0,
                                   "max": 1000,
                                   "title": "Quantità"
                                 }
                               }/* ,
                               {
                                    "field": "action", 
                                    "title": "Action", 
                                    "align": "center",
                                  "events": actionEvents,
                                    "formatter": formatter }*/
                            ];

                            $tableCarrello.bootstrapTable('destroy');
                            $tableCarrello.bootstrapTable({
                                data: $prodotti,
                                columns: tabCarrello,
                                showColumns:false
                            }); 

                            $('#invio').prop( "disabled", false );
                            $('#fornitore').val('');
                            $('#codice').val('');
                            $('#prodotto').val('');
                            $('#quantita').val('');
                           
                            $('#tableCarrello').on('editable-save.bs.table', function (e, field, row,index,old,kk) {//per sincronizzare con tab prodotti
                               
                            if( row.quantita ==="0" || row.quantita ===""){
                                console.log(row.quantita);
                                console.log(index);
                                console.log(row.index);

                                $tableCarrello.bootstrapTable('remove', {
                                    field: 'index',
                                    values: [row.index]
                                } );

                                $prodotti1=_.filter($('#tableCarrello').bootstrapTable('getData'), function(num){ return num.quantita !=='' && num.quantita !=='0'; }).slice(0);
                                if($prodotti1.length==0){
                                    $('#invio').prop( "disabled", true ); 
                                }
                                  console.log($('#tableCarrello').bootstrapTable('getData'));  
                                }
                          
                                console.log($('#tableCarrello').bootstrapTable('getData'));
                                app.global.nick_array.prodottiCONSENZA=$prodotti1;
                                articoliCarrello($prodotti1);

                            });  
                            articoliCarrello($prodotti);
                            function articoliCarrello(prodotti){
                                $totalArticoli=prodotti.length;
                                if($totalArticoli!==1){
                                    $fin ='i';
                                 }else{
                                    $fin ='o'; 
                                 }
                                $('#headCarrello').empty().append( '<h3>Carrello con  '+$totalArticoli+' articol'+$fin+'. '+'<h3>');     
                            }
                        }else{
                            console.log('pro_invalid');  
                        }
                        function formatter() {
                        return [
                           "<a class=\"removeProd\" href=\"javascript:\" title=\"Delete \"><i class=\"glyphicon glyphicon-remove-circle\"></i></a>"
                                 ].join('');
                    };

                         function actionEvents() {

                    }                   
                  

                        //-------------------------------------------
                    });
                    
    }
                    break;
                case '12': //Acquisto diretto
                {    that.$('#dataTemp').val('');
                     that.$('#datetimepicker1').datetimepicker('setInitialDate', new Date());
                    that.$("#tempistica").hide();
                    varForm='<div class="panel panel-default">'+
                            '<div class="panel-body">'+
                                '<div class="form-group row text-center">'+
                                    '<label class="text-center">Acquisto diretto</label>'+
                                '</div>'+
                                '<div class="form-group row">'+
                                    '<div class="col-sm-6">'+  
                                        '<label for="dataAcq">Data acquisto *</label>'+
                                        '<div class="input-group date " id="datePicAcq">'+
                                            '<input type="text" class="form-control "  id="dataAcquisto" name="dataAcquisto" readonly/>'+
                                            '<span class="input-group-addon">'+  
                                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                            '</span>'+
                                        '</div>'+
                                      
                                    '</div>'+
                                   
                                    '<div class="col-sm-6">'+  
                                        '<label for="numDoc">Numero documento *</label>'+
                                        '<input type="text" id="numDoc" name="numDoc" class="form-control" >'+
                                    '</div>'+
                                '</div>'+
                                '<div class="panel panel-default">'+
                                    '<div class="panel-heading">Punto vendita</div>'+
                                    '<div class="panel-body">'+
                                        '<div class="form-group row">'+
                                            '<div class="col-sm-12">'+  
                                                '<label for="puntoVendita">Ragione sociale *</label>'+

                                                '<input type="text" id="puntoVendita" name="puntoVendita" class="form-control" >'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group row">'+
                                            '<div class="col-sm-12">'+  
                                                '<label for="indirizzo">Indirizzo *</label>'+

                                                '<input type="text" id="indirizzo" name="indirizzo" class="form-control" >'+
                                            '</div>'+
                                            
                
                                            '<div class="col-sm-4">'+  
                                                '<label for="indirizzoPr">Povincia *</label>'+
                                                '<select  name="indirizzoPr" id="indirizzoPr"  class="form-control" ></select>'+
                                                
                                            '</div>'+
                                            '<div class="col-sm-4">'+  
                                                '<label for="indirizzoCom">Comune *</label>'+
                                                '<select  name="indirizzoCom" id="indirizzoCom"  class="form-control" ></select>'+
                                               
                                            '</div>'+
                                             '<div class="col-sm-4">'+  
                                                '<label for="indirizzoCap">CAP *</label>'+
                                                '<select  name="indirizzoCap" id="indirizzoCap"  class="form-control" ></select>'+
                                               
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div  class="row">'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label for="allegato">Seleziona il file del documento *</label>'+
                                        '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" accept="image/*,application/pdf">'+

                                    '</div>'+
                                '</div>'+
                                
                                
                                
                            '</div>'+
                        '</div>'+
                    '<br>';
                    that.$("#fornitori").append(varForm); 
                    $('#datePicAcq').datetimepicker({ 
                        format: "dd/mm/yyyy",
                        autoclose: true,
                        startView: 2,
                        minView: 2,
                        
                        language: "it"
                    }).show();
                    $('#datePicAcq').datetimepicker('setStartDate', '-1y');
                    $('#datePicAcq').datetimepicker('setEndDate', '+0d');
                    
                    
                    var $selProvincia=that.$("#indirizzoPr");
                    var $selComune=that.$("#indirizzoCom");
                    var $selCap=that.$("#indirizzoCap");
                    province();
                    //-------------------------------province------------------------------------------
           
                    function  province(){  


                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type ="province";
                    jsonObj.regione = '17';//tosacana
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                       url:app.global.json_url + 'types/',
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                           $mydata =JSON.parse(json);
                           $selProvincia.empty();
                           $aa=$mydata.data;
                           $selProvincia.append('<option value=""></option>');
                            $.each($aa, function(i, value) {
                              $selProvincia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["sigla"]+' ('+$aa[i]["nome"]+')</option>');
                           });
                       parseInt($selProvincia.val());//seleziona pr firenze 33
                        

                         comuni();
                        }
                    });
                }       
                    //-------------------------------comuni------------------------------------------

                    function  comuni(){  


                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type ="comuni";
                    jsonObj.provincia = parseInt($selProvincia.val());
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                       url:app.global.json_url + 'types/',
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                           $mydata =JSON.parse(json);
                           $selComune.empty();
                           $aa=$mydata.data;
                           $selComune.append('<option value=""></option>');
                            $.each($aa, function(i, value) {
                              $selComune.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["comune"]+'</option>');
                           });
                       // $selComune.val(2797);//seleziona firenze
                         parseInt($selComune.val());//seleziona comune firenze 2797
                       
                         cap();
                        }
                    });
                }    
                     //-------------------------------cap------------------------------------------
           
                    function  cap(){    
            
                        var jsonObj = {};
                        jsonObj.action = "list";
                        jsonObj.type ="cap";

                        jsonObj.comune = parseInt($selComune.val());
                        
            
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);

                        $.ajax({
                           url:app.global.json_url + 'types/',
                           type:'post',
                           headers : $headers,
                           data: jsonObj,
                           dataType : 'text',
                            success: function (json) {
                               $mydata =JSON.parse(json);
                               $selCap.empty();
                               $aa=$mydata.data;
                               $selCap.append('<option value=""></option>');
                                $.each($aa, function(i, value) {
                                  $selCap.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["cap"]+'</option>');
                               });
                           // $selComune.val(2797);//seleziona firenze
                           
                                 $selCap.val();//seleziona pr firenze 33
                            
                           // referente()
                            }
                        });
                    }       
        
                    
                    //----------------------------------------------------------------------------
                $('#indirizzoPr').change(function (e) {
            
                    comuni();
                });
                $('#indirizzoCom').change(function (e) {
            
                    cap();
                });
                    
                    $( "#dataAcquisto" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare la data d'acquisto"
                          
                        }
                    });
                    
                    $( "#numDoc" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire il numero  del documento"
                          
                        }
                    });
                    $( "#puntoVendita" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire il nome del punto vendita"
                          
                        }
                    });
                    $( "#indirizzo" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Inserire l'indirizzo del punto vendita"
                          
                        }
                    });
                    $( "#indirizzoPr" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare la provincia del punto vendita"
                          
                        }
                    });
                    $( "#indirizzoCom" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare il comune del punto vendita"
                          
                        }
                    });
                    $( "#indirizzoCap" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare il CAP del punto vendita"
                          
                        }
                    });
                    $( "#allegato" ).rules( "add", {
                        required: true,
                        
                        messages: {
                          required: "Selezionare il file del documento"
                          
                        }
                    });
                    
                     that.$('#invio').prop( "disabled", false);
                    
                }   
                    break;
                case "x13": //Prodotti igiene FULL RENT  
                {
                    varForm='<div class="row">'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Formato campi:<br>tipo;</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+ 
                        '<div class="form-group col-lg-6">'+

                            '<label  id="lblCat" for="allegato">Seleziona un file</label>'+
                              '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+
                        '</div>'+
                    '</div>'+
                    '<div id="loader"></div>';   
                    
                }
                
                     break;
               default: 
                 
            }
            
            if(e.currentTarget.value==='10' || e.currentTarget.value==='11'){//10 id-> Definizione Fabbisogno di Fornitura Con 
          
            }else{
           
        }
         that.$('#dataTemp').val('');
                    
                if(e.currentTarget.value==='1' ){//1 id-> Alimentari
          that.$('#datetimepicker1').datetimepicker('todayHighlight',true);
           that.$('#datetimepicker1').datetimepicker('setStartDate', '+1d');
            }else{
            that.$('#datetimepicker1').datetimepicker('setStartDate', '+1w');
        }
        });
        //-------------------------------fornitori------------------------------
           
        function  fornitori(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.tipologia = $("#tipo").val();
            jsonObj.action = "modulo";
            jsonObj.type = "fornitori";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    that.$("#selFornitori").empty();
                    $aa=$mydata.data;
                    that.$("#selFornitori").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selFornitori").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                    
                    that.$("#selFornitori").change(function (e,value,row) {
                        var $link_Txt,$link_Body,$modal_Title='';
                        $array_ordine=_.filter($aa, function(ordine){ return ordine.id ==e.currentTarget.value; });
                       
                        console.log($array_ordine);
                        if($array_ordine[0].link_indicazione){
                            
                            $.each(JSON.parse($array_ordine[0].link_indicazione), function( key, value ) {
                             
                             
                                 if(value.label=='linkTxt'){
                                     $modal_Title=value.field
                                    
                                     $link_Txt='<a  data-toggle="modal"  readonly data-target="#modal" data-descr="test">'+value.field+'</a>'; 
                                 }
                                   if(value.label=='linkBody'){$link_Body=value.field }
                                if(value.label=='linkValid'){
                                    if(value.field=='on'){
                                       // if(value.label=='linkTxt'){$link_Txt=value.field }
                                    }else{
                                        $link_Txt=""; 
                                        $modal_Title="";
                                    }


                                }
                              
                                
                   
                            });
                      
                        }
                        $('#modal').on('show.bs.modal', function (event) {
                            var button = $(event.relatedTarget);
                          
                            var bodyMes = button.data('descr');
                            if(button.data('image')){
                               var image = button.data('image'); 
                            }else{
                                var image = "";
                            }

                            //console.log(image,button.data('image'));
                            var modal = $(this);
                            modal.find('.modal-title').text( $modal_Title);
                            that.$(".modal-body").empty();
                       
                           var doc =he.decode($link_Body);
                          that.$(".modal-body").append(doc);
                        
                           // modal.find('.modal-body textarea').val($link_Body);
                           // modal.find('.modal-body img').attr('src', image);
                        })
                        that.$("#link_indicazione").empty();
                        that.$("#link_indicazione").append($link_Txt);
                        that.prodottiCarrello=[]; 
                        that.tabCarrello=[]; 
                        that.$("#nota_ordine").empty();
                        that.$("#nota_ordine").append(JSON.parse($array_ordine[0].nota_ordine));
                        
                        that.$("#orario").empty();
                        var $orario_zona= '<div class="row"><div class="form-group col-lg-3"><label for="orarioV">Orario consegna: </label><input id="orarioV" class="form-control " type="text" value="'+$array_ordine[0].orario+'" readonly/></div>';
                        if($array_ordine[0].config){
                            
                            $.each(JSON.parse($array_ordine[0].config), function( key, value ) {
                                console.log(key);
                                console.log(value.label);
                                 console.log(value.field);
                                 if(key=='zona'){
                                    
                                    $orario_zona+='<div class="form-group col-lg-3"><label for="zona">Zona: </label><input class="form-control " id="zona" name="zona" type="text" value="'+value+'" readonly/></div>';
                                       }
                            
                            });
                      
                        }
                        $orario_zona+='</div>';
                        that.$("#orario").append($orario_zona);
                          varForm='<div class="row">'+
                        '<div class="form-group col-lg-12">'+
                            '<label  >Formato campi:<br>temp</label>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+ 
                        '<div class="form-group col-lg-6">'+

                            '<label  id="lblCat" for="allegato">Seleziona un file</label>'+
                           // '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato"  accept="application/vnd.ms-excel,.csv">'+
                             '<input type="file" name="allegato" class="form-input col-lg-12" id="allegato" >'+
                        '</div>'+
                    '</div>'+
                    '<div id="loader"></div>'; 
                  //  that.$("#orario").append(varForm);
                        that.$("#prodotti").empty();
                        prodotti();
                        
                    });
               
                }
            });
        }    
        //--------------------------prodotti------------------------------------
        function  prodotti(){  
           
             
            var jsonObj = {};
            if($selServizioEx){
                jsonObj.servizio = $("#servizio").val();
            }
            jsonObj.fornitore = that.$("#selFornitori").val();
            jsonObj.action = "modulo";
            jsonObj.type = "prodotti";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:uurl+"ordini/",
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    /* varForm=varForm='<label for="selCategoria">Seleziona la Categoria</label>'+
                    '<select  id="selCategoria" name="selCategoria"  class="form-control" ></select><br>'+*/
                    varForm='<div class="panel panel-default">'+
                                '<div class="panel-heading" id="headProdotti"><h3>Prodotti </h3></div>'+
                                '<div class="panel-body">'+
                                    '<label >Seleziona le quantità dei Prodotti da ordinare:</label>'+ 
                                    '<div class="row">'+
                                        '<p class="toolbar">'+

                                        '<span class="alert"></span>'+
                                        '</p>'+
                                        '<table id="table" class="table table-striped"> </table>'+
                                    '</div>'+
                                '</div>'+  
                            '</div>'+     
                            ' <div class="panel panel-default">'+
                                '<div class="panel-heading" id="headCarrello"><h3>Carrello<h3> </div>'+
                                '<div class="panel-body">'+
                                  
                                    '<div id="tot"></div>'+
                                    '<div class="row">'+
                                        '<p class="toolbarCar">'+

                                        '<span class="alert"></span>'+
                                        '</p>'+
                                        '<table id="tableCarrello" class="table table-striped"></table>'+
                                    '</div>'+
                                '</div>'+  
                            '</div>';
                            
                    that.$("#prodotti").append(varForm);
                    /*that.$("#selCategoria").empty();
                    $aa=$mydata.data;
                    that.$("#selCategoria").append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        that.$("#selCategoria").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });*/
                    $table=that.$("#table");
                    $tableCarrello=that.$("#tableCarrello");
                    /*
                    that.$("#selCategoria").change(function (e,value,row) {
                        console.log("cat");
                       proTable($mydata);
                        
                    });*/
                   
                    proTable($mydata);
                    console.log("prodTab");
                }
            });
        }
        //----------------------------------------------------------------------
        function  proTable(my){
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
        $.each( my.data, function( key, value1 ){
          // console.log('key='+key,'---value='+value1);
            $.each( value1, function( key3, value3 ){
             //   console.log('key3='+key3,'---value3='+value3);
          
            value1.quantita="";
            if(key3=="prodotto_json" && value3){
                $var=JSON.parse(value3);
                  if($var.product){
                      
                  
                $.each( $var.product, function( key2, value2 ){
                 //   console.log('key2='+key2,'---value2='+value2);
                   value1[key2]=value2;
                });
                }
            }
        });
        
        }); 
         console.log( my.data);

        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            data: my.data,
            columns: my.tab,
            showColumns:true,
            showRefresh:true,
            search:true,
            showPaginationSwitch:true,
            pagination:true
           
           
        });
      
        that.$(".lblIntro").text("  i prodotti selezionati del fornitore "+my["fornitore"]);
        that.$('#headProdotti').empty().append( '<h3>Ci sono  '+my.data.length+' prodotti. '+'<h3>');
       
        that.$('#quantitaX').on('change',function ( field, row, cvalue, old,Value, $el,x) {//non serve viene fatto con l evento editable-save.bs.table
             console.log(cvalue.quantita)
            
            if(cvalue.quantita !='0' || cvalue.quantita !=''){
                console.log(cvalue.quantita+'ok')
           
                that.$('#invio').prop( "disabled", false);
            }else{
                console.log(cvalue.quantita+'ko')
                that.$('#invio').prop( "disabled", true );
            }
           
        
        });
        //---------------------------------------------------------------------------------
        console.log(that.prodottiCarrello); 
       
        that.$('#table').on('editable-save.bs.table', function (e, field, row, old, $el) {
            var $fin,$totRow='';
            var totalPrezzo=0; 
            var totalPrezzoConIva=0;
            var totalArticoli = 0;
            var  $totStringa='';
            const formatter = new Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: 'EUR'
              })
            console.log(that.prodottiCarrello); 
            console.log(_.isArray(that.prodottiCarrello));
            console.log(field);
            console.log(row);
        //-----gestione  button invio?----------------------------------------------
            var $els1=that.$('#table').bootstrapTable('getData', {useCurrentPage: false})
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
        //------------gestione array prodottiON-------------------------------------------------  
         /*
            $prodottix=_.filter(that.$('#table').bootstrapTable('getData', {useCurrentPage: false}), function(num){ return num.quantita !="" && num.quantita !="0"; });
            $.each( $prodottix, function( key, value1 ){
               if(app.global.nick_array.prodottiON.length>0){
                $.each( app.global.nick_array.prodottiON, function( keyON, valueON ){
                     console.log(keyON)
                      console.log(valueON)
                 
                    if(key['id']== keyON['id']){
                        
                    }else{
                        app.global.nick_array.prodottiON.push(value1); 
                    }
                    
                    
           
        });
        }else{
               app.global.nick_array.prodottiON.push(value1);        
                }
      }); 
        */
        //--------------------------------------------------------------------------
        console.log(that.prodottiCarrello.length);
        console.log(that.prodottiCarrello);
        if(that.prodottiCarrello.length > 0){//se esiste già il carrello
           //vado a controllare se esiste nella lista prodotti del carrello
           subProdotti();
    
           
        }else{
            //altrimenti, se il carrello è vuoto lo inserisco 
            that.prodottiCarrello.push(row);
             //totalArticoli = totalArticoli+1;
            console.log(that.prodottiCarrello);
            
            subProdotti();
        };
        
        function subProdotti(){//controllo se il prodotto esiste nel carrello.
            console.log("1");
            function isProdotto(prodotto){
                console.log(prodotto['id']);//id prodotto nell array carrello
                console.log(row['id']);//id prodotto nella tabella prodotti che ha generato l'evento save
                return prodotto['id']==row['id']
                
            }
            $letA=that.prodottiCarrello.findIndex(isProdotto);
            console.log($letA);
            if($letA!=-1){//se il prodotto esiste nel carrello
              
            // app.global.nick_array.prodottiON.forEach(function callbackFn(value1, key) { 
            //  if( row['id'] ==value1['id']){
                console.log("2");
                console.log( row['quantita']);
                //controllo la quantità che non sia stata messa a zero o nulla
                if( row['quantita'] !="" && row['quantita'] !="0"){//
                    //update aggiorno la quantita
                    console.log("3");
                    that.prodottiCarrello[$letA]['quantita']=row['quantita'];

                }else{//se è stata messa a zero elimino il prodotto dall array carrello
                    //delete
                    console.log("4");
                    //$letB= _.find(that.prodottiCarrello, function(num){ return num.codice  ==row.codice; });
                    $letB=that.prodottiCarrello.findIndex(isProdotto);
                    console.log($letB);
                    $.each(that.prodottiCarrello, function(i, el){
                        if (this.codice == row.codice){
                            that.prodottiCarrello.splice(i, 1);
                        }
                      });
                    // that.prodottiCarrello = that.prodottiCarrello.splice($letB,1);
                    console.log(that.prodottiCarrello.length);
                    console.log(that.prodottiCarrello);
                }
            }else{//se il prodotto NON esiste nel carrello lo aggiungo
                that.prodottiCarrello.push(row)
            }     
            console.log(that.prodottiCarrello.length);
           
           
              //   })/*
         
           
            console.log(that.prodottiCarrello);
        //----------------------------------------------------------------------
            that.$prodotti=that.prodottiCarrello;
        

        $(that.$prodotti).each(function(i){
            console.log(that.$prodotti[i].codice);
            console.log(that.$prodotti[i].prezzo);
            console.log(that.$prodotti[i].quantita);
            $prezzo0=parseFloat(that.$prodotti[i].prezzo).toFixed(2);
            console.log($prezzo0);
            that.$prodotti[i].prezzoF=formatter.format($prezzo0);//prezzo che visualizzo nella tabella
            $totImp0=parseFloat(parseFloat($prezzo0)*parseInt(that.$prodotti[i].quantita)).toFixed(2)
            that.$prodotti[i].totImp=formatter.format($totImp0);
            $totIva0=parseFloat(((parseFloat($totImp0)*parseInt(that.$prodotti[i].iva))/100)+parseFloat($totImp0)).toFixed(2);
            that.$prodotti[i].totIva=formatter.format($totIva0);
            totalPrezzo = totalPrezzo+ parseFloat($totImp0);
            totalPrezzoConIva =  totalPrezzoConIva+ parseFloat($totIva0);
            totalArticoli = totalArticoli+1;
            console.log(that.$prodotti[i]);
        });
       
      
        console.log(formatter.format(totalPrezzo)); // 
        //
        console.log(isNaN(totalPrezzo).toString()+' -- '+totalPrezzo);
        if(isNaN(totalPrezzo) || totalPrezzo==0 || that.$prodotti[0].id_fornitore!=10){//se non è borgione
          $totRow =''; 
        }else{
             $totRow= '<div class="row">'+
                    '<div class="form-group col-lg-3"><h3>Importo totale ordine</h3></div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label >IVA esclusa</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzo)+'" readonly>'+
                    '</div>'+
                     '<div class="form-group col-lg-2">'+
                        '<label >IVA inclusa</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzoConIva)+'" readonly>'+
                    '</div>'+
                '</div>'+
                
                    '<div class="row">'+
                
            '</div>'; 
        }
        
        }
        
        if(totalArticoli!=1){
           $fin ='i';
        }else{
           $fin ='o'; 
        }
        $('#headCarrello').empty().append( '<h3>Carrello con  '+totalArticoli+' articol'+$fin+'. '+'<h3>');     
        $('#tot').empty().append( $totRow); 
     that.tabCarrello =  my.tabCarrello;
     $.each(that.tabCarrello, function( key, value1 ){
         console.log(value1);
          if(value1["field"]=="prezzo"){
                value1["field"]="prezzoF";//prezzo con formattazione + €
            }
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
        $('#tableCarrello').bootstrapTable('destroy');

      $('#tableCarrello').bootstrapTable({
            data: that.prodottiCarrello,
            columns: that.tabCarrello,
            showColumns:true
           
           
           
        });
         
          console.log(that.prodottiCarrello); 
    });
        //----------------------------------------------------------------------
      
         that.$('#tableCarrello').on('editable-save.bs.table', function (e, field, row,$el,old,kk) {//per sincronizzare con tab prodotti
            var $els1=that.$('#table').bootstrapTable('getData')
                that.$('#invio').prop( "disabled", true );
                for (i = 0; i < $els1.length; ++i) {//ciclo tutti i record se almeno uno non è vuoto o zero attivo btn invio
                   
                    if( $els1[i].quantita !='0' && $els1[i].quantita !=''){
                        that.$('#invio').prop( "disabled", false );
                    }
                }
             
             $.each( my.data, function( index, value1 ){
           
                    $.each( value1, function( key3, value3 ){

                    if(key3=="id" && value3==row.id){
                       that.$('#table').bootstrapTable('updateCellByUniqueId', {id: index, field: 'quantita', value: row.quantita});
                      console.log(row.id);
                       console.log(row.quantita)
                 console.log(row.id);
            if( row.quantita ==="0" || row.quantita ===""){
                console.log(row.quantita)
                 console.log(row.id);
                 that.$('#tableCarrello').bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                })
                
            }
                        }
                });
                

            }); 
           
          
          
              $prodotti1=_.filter(that.$('#tableCarrello').bootstrapTable('getData'), function(num){ return num.quantita !=="" && num.quantita !==0; });
       //-------------------------------------------------
        calcoloTot(that,my,$prodotti1) 
         console.log(that.$prodotti);
         console.log(that.prodottiCarrello);
            var totalPrezzo=0; 
        var totalPrezzoConIva=0;
        var totalArticoli = 0;
        var  $totStringa='';
        const formatter = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
          })

        $(that.$prodotti).each(function(i){
            console.log(that.$prodotti[i]);
            console.log(that.$prodotti[i].prezzo);
            console.log(that.$prodotti[i].quantita);
            $prezzo0=parseFloat(that.$prodotti[i].prezzo).toFixed(2);
           
           
            $totImp0=parseFloat(parseFloat($prezzo0)*parseInt(that.$prodotti[i].quantita)).toFixed(2)
            that.$prodotti[i].totImp=formatter.format($totImp0);
            that.$prodotti[i].prezzoF=formatter.format($prezzo0);
            
            $totIva0=parseFloat(((parseFloat($totImp0)*parseInt(that.$prodotti[i].iva))/100)+parseFloat($totImp0)).toFixed(2);
            that.$prodotti[i].totIva=formatter.format($totIva0);
          
             
            totalPrezzo = totalPrezzo+ parseFloat($totImp0);
            totalPrezzoConIva =  totalPrezzoConIva+ parseFloat($totIva0);
            totalArticoli = totalArticoli+1;
            console.log(that.$prodotti[i]);
        });
        if(totalArticoli!=1){
           $fin ='i';
        }else{
           $fin ='o'; 
        }
       
        console.log(formatter.format(totalPrezzo)); // 
       // console.log(isNaN(totalPrezzo).toString()+' -- '+totalPrezzo);
         if(isNaN(totalPrezzo) || totalPrezzo==0 || that.$prodotti[0].id_fornitore!=10){
          $totRow =''; 
        }else{
             $totRow= '<div class="row">'+
                    '<div class="form-group col-lg-3"><h3>Importo totale ordine</h3></div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label >IVA esclusa</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzo)+'" readonly>'+
                    '</div>'+
                     '<div class="form-group col-lg-2">'+
                        '<label >IVA inclusa</label>'+
                        '<input type="text" class="form-control" name="piva" id="piva" value="'+formatter.format(totalPrezzoConIva)+'" readonly>'+
                    '</div>'+
                '</div>'+
                
                    '<div class="row">'+
                
            '</div>'; 
        }
              $('#headCarrello').empty().append( '<h3>Carrello con  '+totalArticoli+' articol'+$fin+'. '+'<h3>');    
        $('#tot').empty().append( $totRow); 
     $.each( that.tabCarrello, function( key, value1 ){
         if(value1["field"]=="prezzo"){
                value1["field"]="prezzoF";
            }
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
        that.$('#tableCarrello').bootstrapTable('destroy');

      that.$('#tableCarrello').bootstrapTable({
            data: that.$prodotti,
            columns:that.tabCarrello,
            showColumns:true
           
           
           
        });
       
        });        

    }
       
      
       //-----------------------------------------------------------------------
         function calcoloTot(that,my,$prodotti) {
         
  
         }
        //----------------------------------------------------------------------
    
     function actionFormatter(value, row, index) {
         
    }
      function actionFormatter1(value, row, index) {
        
    }
         function imageFormatter(value, row) {
      return '<img src="'+value+'" />';
    }
    function actionEvents() {
      
    }
 
     function cellStyle(value, row, index, field) {
    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+field
                         };
                  
                }  

    //-----------------------------------------------------------------------------------
        
        this.$("#richiestaOrdineForm").validate({
          
   
            rules:{
                highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                        $(element).fadeIn();
                    });
                },
                tipo:{
                    required:true
                },
                 quantita:{
                    required:true,
                    number:true
                },
                 prodotto:{
                    required:true
                },
                        ".editable":{
                    required:true
                },
           	selFornitore:{
                    required:true,
                  
                    
                },
                dataTemp:{
                    required:true,
                   // maxlength:20
                   
                }/* ,
               file: {
                    required: false,
                    accept: "image/*"
                }*/
                
           },
           dataAcquisto:{
                    required:true
                   
                   
            } ,
               
                
           
           messages: {
              prodotto: "Inserire la descrizione del prodotto",
             quantita:{ required:"Inserire la quantità",
              number: "Inserire un numero"},
                tipo: "Selezionare una Tipologia Prodotto",
                dataTemp: "Inserire la data",
                ".editable":"inserire la quantità"
            }
        });    
        
        this.$("#temp").change(function(){
            $('#dataTemp').val("");
            $('#datetimepicker1').datetimepicker().toggle();
        });
         
       
      
        
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
       
        this.$("#invio").prop( "disabled", true );
        var jsonObj = {};
        var that=this;  
        
        var form_data = new FormData($("#richiestaOrdineForm")[0]);   
     
        if(this.$("#tipo").val()==10 || this.$("#tipo").val()==11){
           /*
            $prodotti=[];
            var element={};
            
            element.prodotto=this.$("#prodotto").val();
            element.codice=this.$("#codice").val();
            element.quantita=this.$("#quantita").val();
            $prodotti.push(element);
            Object.assign( jsonObj, {prodotti:$prodotti})
           $prodotti1 = JSON.stringify($prodotti);
            form_data.append('prodotti', $prodotti1);
            console.log(jsonObj);
             * 
            */
            //ricambiato non un prodotto ma più prodotti!!
            $prodotti=_.filter(this.$('#tableCarrello').bootstrapTable('getData'), function(num){ return num.quantita !=""; });
           
            $prodotti1 = JSON.stringify($prodotti);
            form_data.append('prodotti', $prodotti1);
        }else{
          //  $prodotti=_.filter(this.$('#table').bootstrapTable('getData'), function(num){ return num.quantita !=""; });
            
            $prodotti1 = JSON.stringify(this.prodottiCarrello);
            form_data.append('prodotti', $prodotti1);
            
        }
       
        s=this.$('#tipo option:selected').text();
        form_data.append('categoriaC', s);
        form_data.append('categoria', this.$('#tipo option:selected').val());
        form_data.append('action', 'add');
        form_data.append('type', 'ordine');
        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
       
        
        $headers = {
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "lang" : app.global.languagesCollection.at(0).get("lang"), 
            };
        $.ajax({
            url:app.global.json_url+'rfa/ordini/',
            type:'post',
            headers : $headers,
            data: form_data,
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false     
            success: function(data){
                 var  $mydata =JSON.parse(data);
                bootbox.alert({ 
                    title: that.language.header_rfa_new_message,
                   // message: "Richiesta Fabbisogno Approvvigionamento inviata correttamente",
                   message: $mydata.message,

                    callback: function() {
                        app.routers.rfaRouter.prototype.rfa_new();
                    }
                });
                       
                   
            },
            error: function(e) {
                $("#err").html(e).fadeIn();
            } 
                
       
        });
    },
    
  

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);


    }
})//Backbone.View.extend({
return app.views.rfa_new;
});


