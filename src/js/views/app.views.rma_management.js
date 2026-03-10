require(['app','bootbox'], function(app,bootbox){
app.views.rma_management = Backbone.View.extend({
       
    initialize:function(){
     	console.log("initializing rma_management");
        console.log(app.global.nick_array);
    },
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
            
           
           
           
        };
        return $headers;
    },

    events:{
        'submit_':       'assegna_intervento' ,
        'click #updateP1':  'updateP1'     
	   
    },
    updateP1:function(){
       
        console.log("updateP1", this.$('#servizio').val(),this.$('#categoria').val(), this.$('#id').val());
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
           
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        var jsonObj = {};
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type='p1';
        jsonObj.action='update';
        jsonObj.id_richiesta=this.$('#id').val();
        jsonObj.id_servizio=this.$('#servizio').val();
        jsonObj.id_categoria=this.$('#categoria').val();
        
        jsonObj = JSON.stringify(jsonObj);
       $that=this;
        $.ajax({
            url:app.global.json_url + 'rma/manage/',
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
             
                $mydata =JSON.parse(json);
                if($mydata.success){

                    
                    app.global.nick_array.arr=$mydata.row;
                    console.log($mydata, app.global.nick_array.arr) ;
                    var index = _.indexOf(app.global.nick_array.arrTable, _.findWhere(app.global.nick_array.arrTable, {id: $that.$('#id').val()}));
                    app.global.nick_array.arrTable[index]=$mydata.row;
                    console.log(index);
                    app.routers.rmaRouter.prototype.rma_management();  
                }
                
               
                
        }
        });
     
   },
     
    render:function(){
    	$(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rma/list/';
        var $table=this.$('#table1'),
        $num_intervento=0,
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
        var $list,$dataInterventi;//$list=lista manutentori in select
        
        if(app.global.breadcrumb.length>2){
          app.global.breadcrumb.pop();
        }
       
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        
        this.$('#lblnum-prog').text( app.global.nick_array.arr.num_prog);
        this.$('#lbldata').text( app.global.nick_array.arr.data_richiesta);
        //this.$('#lbldata').text( moment(app.global.nick_array.arr.data_richiesta).format('DD/MM/YYYY'));
        this.$('#lblcategoria').text( app.global.nick_array.arr.categoria);
        this.$('#lbltempistica').text( app.global.nick_array.arr.tempistica);
        this.$('#lblstatus').css("background-color", app.global.nick_array.arr.stato_color);
        this.$('#lblServizio').text( app.global.nick_array.arr.servizio);
        this.$('#name').val( app.global.nick_array.arr.servizio);
        this.$('#operatore').val( app.global.nick_array.arr.utente);
        this.$('#id').val( app.global.nick_array.arr.id);
        this.$('#descrizione').val($('<div />').html(app.global.nick_array.arr.descrizione).text());
        this.$('#ubicazione').val( $('<div />').html(app.global.nick_array.arr.ubicazione).text());
        this.$('#descr_chiusura').val( $('<div />').html(app.global.nick_array.arr.descrizione_chiusura).text());
        this.$('#note').val( $('<div />').html(app.global.nick_array.arr.nota).text());
        if(app.global.nick_array.arr.attrezzature){
            this.$("#attrezzature").empty().append('<div class="row">'+
                                        '<div class="form-group col-lg-12">'+     
                                            '<label >Attrezzature (Attr) / Beni Strumentali (BeSt)</label>'+
                                            '<input type="text"     class="form-control" name="attrezzatura" id="attrezzatura" value="'+app.global.nick_array.arr.attrezzature[0].text_oggetto+'" readonly/>'+
                                        '</div>'+
                                    '</div>'); 
        }
        var that = this;
        //-----------multifile----------------------------------------
       function work(fileX){
            console.log(fileX);
            var parts = fileX.split('.');
            var ext = parts[parts.length - 1];
            switch (ext.toLowerCase()) {
                case 'doc':
                case 'docx': 
                    image = "";
                    $href =fileX;
                    $hrefLabel ='<img src="./css/img/word.png" width="20px">';
                    break;   
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
        var fileX=app.global.nick_array.arr.link_immagine;
        var $row=app.global.nick_array.arr;
        var multiple=[];
        if(fileX=='multiple'){
            console.log($row);
            multiple=$row.multiple;
            $i=0;
            $.each(multiple, function( key, element ){
                $res=work(element.link_immagine);
                console.log(element.id,$res[0],$res[1],$res[2]);
                
                that.$('#immagini').append(
                    '<br/><div class="panel panel-default">'+
                        '<div class="panel-body" id="bod'+$i+'">'+
                      '<img  class="img-fluid" src="'+ $res[2]+'">'+ 
                    '<a   href="'+$res[0]+'" target="_blank">'+
                    $row.nome_originale+ '</a></div>'+
                    '</div>'
                    
                );
            });    
            
           
        }else{
            $res=work(fileX);
            console.log( "0-"+$res[0],"1-"+ $res[1],"2-"+ $res[2]);
            that.$('#immagini').append(
                '<br/><div class="panel panel-default">'+
                    '<div class="panel-body" id="bod">'+
                  '<img  class="img-fluid" src="'+ $res[2]+'">'+ 
                '<a   href="'+$res[0]+'" target="_blank">'+
                $row.nome_originale+ '</a></div>'+
                '</div>'
                
            );
            //  modal.find('.modal-body img').attr('src', $res[2]); 
            //  modal.find('.modal-body a').attr('href', $res[0]);
            //  modal.find('.modal-body a').html( $res[1]);
        } 
        //------------------------------------------------------------------
        var $selManutentore=this.$("#manutentore").selectpicker();
        var $selServizio=this.$("#servizio");
        var $selCategoria=this.$("#categoria");
       
        this.$('#lblInt-prog').text(app.global.nick_array.arr.numero_interventi);
        
       console.log(app.global.nick_array);
      
        var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        //manutentori(1);
       
        loadDataInterventi(app.global.nick_array.arr.id);
        function loadDataInterventi(idRMA){
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type='intervento';
            jsonObj.action='list';
            jsonObj.idRMA=idRMA;
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:app.global.json_url + 'rma/intervento/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                 
                    $mydata =JSON.parse(json);
                    $num= $mydata.data.length;
                  
                 
                    if( $num >0 ){
                        $('#lblInt-prog').text( $num.toString() );
                        $dataInterventi=$mydata.data;
                        app.global.nick_array.arr.numero_interventi=$num.toString();
                        

                    }else{
                        $('#lblInt-prog').text("0" )
                       
                        console.log('0 interventi');
                    }
                    app.global.nick_array.arr.interventi=$mydata.data;
                        console.log(app.global.nick_array.arr.interventi.length);
                    setServizi($mydata.servizi,$mydata.categorie);
                      hrTable($mydata);
            }
            });
           
            
            
        }
        runningFormatter=function(value, row, index) {
            return index+1;
        }
       
        function  setServizi(servizi,categorie){
           
            $selServizio.append('<option >Seleziona servizio</option>');
            $.each(servizi, function(i, value) {
                $selServizio .append('<option value="'+value["id"]+'">'+value["name"]+'</option>');
            });           
           $selServizio.val(app.global.nick_array.arr.id_servizio);
           //---------------------------------------------------------
           $selCategoria.append('<option >Seleziona categoria</option>');
            $.each(categorie, function(i, value) {
                $selCategoria .append('<option value="'+value["id"]+'">'+value["name"]+'</option>');
            });           
           $selCategoria.val(app.global.nick_array.arr.id_categoria)

             
         }
        function  hrTable(my){
            
            for(i=0; i<my.data.length; i++){
                if (my.data[i].manutenzione==="1"){
                    my.data[i].manutenzioneL="Interna";
                }else if(my.data[i].manutenzione==="2"){
                    my.data[i].manutenzioneL="Ditta Esterna";
                }else{
                    my.data[i].manutenzioneL="Committente";
                }
                my.data[i].number=i+1;
                my.data[i].number_operator=my.data[i].interventi_operatori.length;
                my.data[i].data_assegnazione=moment(my.data[i].data_assegnazione,"YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY');
                if( my.data[i].data_prevista !== null){
                    
                    my.data[i].data_prevista=moment(my.data[i].data_prevista,"YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY');
                    console.log(my.data[i].data_prevista);
                }
                if( my.data[i].data_effettuata !== null){
                    
                    my.data[i].data_effettuata=moment(my.data[i].data_effettuata,"YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY');
                    console.log(my.data[i].data_effettuata);
                }
                
            }
            
            var columns = [];
        $table.bootstrapTable('destroy');
        
               
               
        columns.push({
            field: "number",
            title: 'N° Intervento',              
            sortable: true
                        });
        columns.push({
            field: "data_assegnazione",
            title: 'Assegnato',              
            sortable: true
                        });
        columns.push({
            field: "data_prevista",
            title: 'Previsto',              
            sortable: true
                        });
        columns.push({
            field: "data_effettuata",
            title: 'Effettuato',              
            cellStyle: cellStyle, 
            sortable: true
                        });
        columns.push({
            field: "descrizione_chiusura",
            title: 'Descrizione',              
            
            sortable: true
                        });                 
        columns.push({
            field: "manutenzioneL",
            title: 'Manutenzione',              
            cellStyle: cellStyle, 
            sortable: true
                        }); 
        
        columns.push({
            field: "number_operator",
            title: 'N° Manutentori',              
            cellStyle: cellStyle, 
            sortable: true
                        }); 
       
            
        
          
            
            columns.push({
            field: "action",
            align:"center",
            formatter:actionFormatter,
            events:actionEvents
           
        });      
       
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({
            columns:columns,
            data: my.data,
           
            showColumns:true,
            showRefresh:true,
            search:true,
            pagination:false
           
           
        });

          
        }
        
        //------------------------------------------------------------------------
        /*
        
        this.$('#accordion').on('show.bs.collapse', function (e) {
            if(e.target.id=="collapseTwo"){//interventi programmati
                _loadInterventiRow(app.global.nick_array.arr.numero_interventi);
               // loadInterventi(app.global.nick_array.arr.id,"update");
            }else if(e.target.id=="collapseThree"){//nuovo intervento
                loadInterventi(app.global.nick_array.arr.id,"new");
            }
            //alert('Event fired on #' + e.target.id);
        })
        this.$('#accordion').on('hidden.bs.collapse', function (e) {
            if(e.target.id=="collapseTwo"){//interventi programmati
                 $('#listInterventi').empty();
              
            }else if(e.target.id=="collapseThree"){//nuovo intervento
               $('#newIntervento').empty();
            }
            //alert('Event fired on #' + e.target.id);
        })
        */
        //-----------------------------------------------------------------------------
       
      
        
       var that=this;
        //-------------------------------new intervent(id RMA)------------------------------------------
        function  loadInterventi(idRMA,action){
            if (action==="new"){
               $element="#newIntervento" ;
               $toi="o"
            }else{//update
             //  $element=idpanel ; 
               $toi="i"
               
            }
            $('#listInterventi').empty();//mi assicuro che sia vuota la lista interventi
            $($element).empty();
            $($element).append(
                    ' <div class="row">'+
                    
                        '<div class="form-group col-sm-6">'+
                            '<label >Assegna manutenzione a:   </label><br>'+
                            '<div class="radio-inline">'+
                                '<label><input type="radio" value=1 name="manutenzione" id="manutenzione" checked>Interna</label>'+
                            '</div>'+
                            '<div class="radio-inline">'+
                              '<label><input type="radio" value=2 name="manutenzione" id="manutenzione">Esterna</label>'+
                            '</div>'+
                            '<div class="radio-inline">'+
                              '<label><input type="radio" value=3 name="manutenzione" id="manutenzione">Committente</label>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-6">'+
                            '<label id="lblmanutentore" for="manutentore"></label>'+
                            '<select  id="manutentore" name="manutentore" class="form-control selectpicker"  multiple="multiple" ></select>'+
                        '</div>'+
                    '</div>'+
                    '<div id="intervento"></div>');
         
          if (action==="new"){
               manutentori(1);
            }else{//update
              // _loadInterventi(idRMA);
            }
          
          
            eventManutentori(this); 
         
       
        }
        //----------------event manutenzione-----------------------------------------
        function  eventManutentori(_that){
        _that.$('input[type="radio"]').on('change', function(e) {
            //$('#manutenzione').change(function (e) {
          // alert(_.keys(e)+" - "+" - "+$('input[name=manutenzione]:checked').val()); 
            if(e.target.value==1){
                $('#lblmanutentore').text("Manutentori");
                $selManutentore.data('max-options', 4);
               
               
            }else if(e.target.value==2){
               that.$('#lblmanutentore').text("Ditte Esterne");
               $selManutentore.data('max-options', 3);
              
            }else{
               $('#lblmanutentore').text("Committente"); 
               $selManutentore.data('max-options', 1);
               
            }
         
            $('#intervento').empty();
            $('#chiusura').empty();
          manutentori(e.target.value);
        });
        //------------------------------event---Manutentore-------------------------------------------------------------
               
  
        _that.$("#manutentore").change(function (e,value,row) {
                         
        // alert(_.keys(e)+" - "+value+" - "+row+$('input[name=manutenzione]:checked').val()); 
            if($('input[name=manutenzione]:checked').val()==1){//se è manutentore
              
                $('#intervento').empty();
                $('#chiusura').empty();
                
                
                if($selManutentore.selectpicker('val') && $selManutentore.selectpicker('val')!="0" ){
                //if($selManutentore.selectpicker('val').length>0 ){ 
                //if($selManutentore.selectpicker('val')!==0 ){ 
                console.log("manut="+$selManutentore.selectpicker('val')+" lenght="+$selManutentore.selectpicker('val').length);
                
                    for ($i=0;$i<$selManutentore.selectpicker('val').length;$i++){
                        
                        if($selManutentore.selectpicker('val')[$i]!="0"  ){ //se non è selezionato nessun manutentore
                        console.log($selManutentore.selectpicker('val').length+" - "+$i+" - "+$selManutentore.selectpicker('val'));
                        $manut= _.findWhere($list, {id_person:$selManutentore.val()[$i]});
                        console.log($manut);
                        $('#intervento').append(

                            '<div class="row">'+
                                '<div class="form-group col-sm-3">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][id_person]" id="manutentori['+$i+'][id_person]" value="'+$manut['id_person']+'">'+  
                       
                                    '<label   id="lblname"  for="name">Nome Manutentore</label>'+
                                    '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$manut["nome"]+'" readonly>'+
                                '</div>'+
                            '</div>'+
                           //-------------------email--------------------------------------------------------------------
                            '<div class="row ">'+
                                '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                    '<label  class="form-group col-lg-4" >E-mail</label>'+
                                '</div>'+
                            '</div>'+
                            '<div id="email"></div>'
                        );
               
                   // if($list[ $selManutentore.prop('selectedIndex')-1]["email"].length>0){ 
                    if($manut["email"].length>0){ 
                    
                        for ($ii = 0; $ii <$manut["email"].length; $ii++) {
                         
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][id]" id="manutentori['+$i+'][email]['+$ii+'][id]" value="'+$manut["email"][$ii]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][email]" id="manutentori['+$i+'][email]['+$ii+'][email]" value="'+$manut["email"][$ii]['email']+'" readonly col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][emailNome]" id="manutentori['+$i+'][email]['+$ii+'][emailNome]" value="'+$manut["email"][$ii]['emailNome']+'" readonly>'+
                                    '</div>'+
                                    
                                '</div>');
                                         
                        }
                    }
                   
                    //-------------------------------telefono------------------------------------------------------
                     $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4">Telefono</label>'+
                                
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>');
                    if($manut["telefoni"].length>0){ 
                        for ($iii = 0; $iii <$manut["telefoni"].length; $iii++) {
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][id]" id="manutentori['+$i+'][telefoni]['+$iii+'][id]" value="'+$manut["telefoni"][$iii]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefono]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNumero]" value="'+$manut["telefoni"][$iii]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+
                                '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" value="'+$manut["telefoni"][$iii]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                }
                }
                  setIntervento("aa"); 
                }
            
              
            //--------------------------------------------------------------------------------------------------------------------------------  
            }else if($('input[name=manutenzione]:checked').val()==2){//se è  ditta
             $('#intervento').empty();
              $('#chiusura').empty();
               if($selManutentore.selectpicker('val')!==null && $selManutentore.selectpicker('val')!==0  ){
                
                for ($i=0;$i<$selManutentore.selectpicker('val').length;$i++){
                    if($selManutentore.selectpicker('val')[$i]!="0"  ){ //se non è selezionato nessuna ditta
                       
                        $ditta= _.findWhere($list, {id:$selManutentore.val()[$i]})  ;
                        console.log($ditta);
              
             
                $('#intervento').append(
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<input type="hidden" class="form-control" name="manutentori['+$i+'][id_person]" id="manutentori['+$i+'][id_person]" value="'+$ditta['id_person']+'">'+  
                       
                            '<label   id="lblname"  for="name">Nome Ditta</label>'+
                            '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$ditta["nome"]+'" readonly>'+
                        '</div>'+
                                   
                    '</div>'+    
            
                //-------------------email--------------------------------------------------------------------
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label  class="form-group col-lg-4" >E-mail</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>'
                );
               
                    if($ditta["email"].length>0){ 
                    
                        for ($ii = 0; $ii <$ditta["email"].length; $ii++) {
                         
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][id]" id="manutentori['+$i+'][email]['+$ii+'][id]" value="'+$ditta["email"][$ii]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][email]" id="manutentori['+$i+'][email]['+$ii+'][email]" value="'+$ditta["email"][$ii]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][emailNome]" id="manutentori['+$i+'][email]['+$ii+'][emailNome]" value="'+$ditta["email"][$ii]['emailNome']+'" placeholder="Nome Email">'+
                                    '</div>'+
                                   
                                '</div>');
                                         
                        }
                    }
                   
                    //-------------------------------telefono------------------------------------------------------
                     $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4">Telefono</label>'+
                                
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>');
                    if($ditta["telefoni"].length>0){ 
                        for ($iii = 0; $iii <$ditta["telefoni"].length; $iii++) {
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][id]" id="manutentori['+$i+'][telefoni]['+$iii+'][id]" value="'+$ditta["telefoni"][$iii]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefono]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNumero]" value="'+$ditta["telefoni"][$iii]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+
                                '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" value="'+$ditta["telefoni"][$iii]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                     //-------------------------------referente------------------------------------------------------
               /*      $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4" >Referente</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="referente" ></div>');
                  
                    if($list[$selManutentore.prop('selectedIndex')-1]["referente"].length>0){ 
                    
                        for ($i = 0; $i <$list[$selManutentore.prop('selectedIndex')-1]["referente"].length; $i++) {
                                                      
                            $("#referente").append(  
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     
                                '</div>'
                            );
                        }      
                    }        
                    */     
                //-------------------------------------------------------------------------------------------------------------------------------------
                }
            }
            setIntervento("bb");
            }
            
             
            
             
            }else{//se è committente
            $('#intervento').empty();
            $('#chiusura').empty();
            if($selManutentore.selectpicker('val')!==null && $selManutentore.selectpicker('val')!==0  ){
                                      
                $commi= _.findWhere($list, {id:$selManutentore.val()})  ;
                console.log($commi);
                $('#intervento').append(
                    
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label   id="lblname"  for="name">Nome Committente</label>'+
                            '<input type="text" id="manutentori['+$i+'][name]" name="manutentori['+$i+'][name]" class="form-control" value="'+$commi["nome"]+'" readonly>'+
                        '</div>'+
                        
                        
                    '</div>'+    
            
                //-------------------email--------------------------------------------------------------------
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label  class="form-group col-lg-4" >E-mail</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="email"></div>'
                );
               
                    if($commi["email"].length>0){ 
                    
                        for ($i0 = 0; $i0 <$commi["email"].length; $i0++) {
                         
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][id]" id="manutentori['+$i+'][email]['+$i0+'][id]" value="'+$commi["email"][$i0]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][email]" id="manutentori['+$i+'][email]['+$i0+'][email]" value="'+$commi["email"][$i0]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$i0+'][emailNome]" id="manutentori['+$i+'][email]['+$i0+'][emailNome]" value="'+$commi["email"][$i0]['emailNome']+'" placeholder="Nome Email">'+
                                    '</div>'+
                                   
                                '</div>');
                                         
                        }
                    }
                   
                    //-------------------------------telefono------------------------------------------------------
                     $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4">Telefono</label>'+
                                
                        '</div>'+
                    '</div>'+    
                    '<div id="telefoni"></div>');
                    if($commi["telefoni"].length>0){ 
                        for ($i1 = 0; $i1 <$commi["telefoni"].length; $i1++) {
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][id]" id="manutentori['+$i+'][telefoni]['+$i1+'][id]" value="'+$commi["telefoni"][$i1]['id']+'">'+  
                                    '<div class="form-group col-lg-8">'+
                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][telefono]" id="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNumero]" value="'+$commi["telefoni"][$i1]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+
                                '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                      
                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$i1+'][telefonoNome]" value="'+$commi["telefoni"][$i1]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                    
                                '</div>'
                               
                            );
                        }
                    }
                     //-------------------------------referente------------------------------------------------------
               /*      $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                            '<label class="form-group col-lg-4" >Referente</label>'+
                        '</div>'+
                    '</div>'+
                    '<div id="referente" ></div>');
                  
                    if($list[$selManutentore.prop('selectedIndex')-1]["referente"].length>0){ 
                    
                        for ($i = 0; $i <$list[$selManutentore.prop('selectedIndex')-1]["referente"].length; $i++) {
                                                      
                            $("#referente").append(  
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['first_name']+'" placeholder="Nome Referente">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['last_name']+'" placeholder="Cognome Referente" >'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+$list[$selManutentore.prop('selectedIndex')-1]["referente"][$i]['mansione']+'" placeholder="Mansione">'+
                                    '</div>'+
                                     
                                '</div>'
                            );
                        }      
                    }        
                    */     
                //-------------------------------------------------------------------------------------------------------------------
                setIntervento("cc");
                }
              
            }//end committente
        
                
        });
        
        //------------------------------------------------------------------------
        
        }
        //-------------------------------load interventirow(numero_interventi)------------------------------------------
        function  _loadInterventiRow(num_interventi){//inizializza accordion1 per quanti interventi ci sono
            $('#listInterventi').empty();
            $('#listInterventi').append(' <div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">');
            for ($i=0;$i<num_interventi;$i++){
                        
                $('#accordion1').append(
                    
                        '<div class="panel panel-default">'+
                            '<div class="panel-heading" role="tab" id="heading'+$i+'">'+
                                '<h4 class="panel-title">'+
                                    '<a role="button" data-toggle="collapse" data-parent="#accordion1"  href="#collapse'+$i+'" aria-expanded="true" aria-controls="collapse'+$i+'">'+
                                        
                                        'Intervento <label>'+($i+1)+'</label>'+
                                    '</a>'+
                                '</h4>'+
                            '</div>'+
                            '<div id="collapse'+$i+'" class="panel-collapse collapse"  role="tabpanel" aria-labelledby="heading'+$i+'">'+
                                '<div class="panel-body">'+
                                    '<div id="body">'+
                                    //------------------------------------body-----------------------------------------------------------------   
                                   '</div>'+//chiude panel-body
                            '</div>'+//chiude heading'+$i
                        '</div>');//chiude panel-default

            }   // interventi.length fine
           // _loadIntervento(app.global.nick_array.arr.id);
          // eventManutentori(this);
        //eventi accordion1---------------------------------------------------------------------------------------------
            $('#accordion1').on('show.bs.collapse', function (e) {
                 $("#accordion1 .panel-body").empty();
              loadInterventiData($dataInterventi,e.target.id);
                 console.log("xxx"+"#"+e.target.id+"-load");
           // _loadIntervento(app.global.nick_array.arr.id,e.target.id)
              //  _loadInterventi(app.global.nick_array.arr.id,e.target.id);
             //  loadInterventi(app.global.nick_array.arr.id,"update",e.target.id);
              
        //  $ccc=$("#"+e.target.id);
        //  console.log($ccc.attr("num"));
         //alert(_.keys(e.target)+"-"+_.values(e.target)+"-"+$ccc.attr("num")+'=Event fired on #' + e.target.id);
        });
        
        $('#accordion1').on('hidden.bs.collapse', function (e) {
            console.log("xxx"+"#"+e.target.id+"-empty");
               // $("#"+e.target.id).empty();
                $("#"+e.target.id+" .panel-body").empty();
             
          //alert('Event fired on #' + e.target.id);
        });
        
        }
        
        //-------------------------------load interventi(id RMA)------------------------------------------
        function  _loadIntervento(idRMA,idPanel){
           console.log("xxx"+idRMA+"-"+idPanel);
             var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type='intervento';
            jsonObj.action='list';
            jsonObj.idRMA=idRMA;
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:app.global.json_url + 'rma/intervento/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                   $mydata =JSON.parse(json);
                   $num= $mydata.data.length;
                  
                 
                 if( $num >0 ){
                    $('#lblInt-prog').text( $num.toString() );
                    loadInterventiData($mydata.data,idPanel);
               
                    
                 }else{
                   $('#lblInt-prog').text("0" )
                }
            }
            });
           
        }
        
        
        function  _loadInterventi(idRMA){
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.type='intervento';
            jsonObj.action='list';
            jsonObj.idRMA=idRMA;
            
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:app.global.json_url + 'rma/intervento/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                   $mydata =JSON.parse(json);
                   $num= $mydata.data.length;
                  
                 
                 if( $num >0 ){
                    $('#lblInt-prog').text( $num.toString() );
                    loadInterventiData($mydata.data);
               
                    
                 }else{
                   $('#lblInt-prog').text("0" )
                }
            }
            });
           
        }
        
        //-------------------------------load InterventiData(interventi)------------------------------------------
        function  loadInterventiData(interventi,idPanel){
            var $check;
            $i=parseInt(idPanel.substr(8));//estraggo l' indice per settare quale numero dell'intervento dopo collapse 8chr
               console.log("xxx"+idPanel+$dataInterventi[$i]['manutenzione']+_.keys($dataInterventi[$i]));
            if($dataInterventi[$i]['manutenzione']==1){
                $check1="checked";
                $check2="";
                $check3=""
                $tipoId='id_manutentore';
            }else if($dataInterventi[$i]['manutenzione']==2){
                $check2="checked";
                $check1="";
                $check3="";
                $tipoId='id_ditta';
                
            }else if($dataInterventi[$i]['manutenzione']==3){
                $check3="checked";
                $check1="";
                $check2="";
                $tipoId='id_committente';
                
            }
            
           
           $('#'+idPanel+" .panel-body").empty();
           $('#'+idPanel+" .panel-body").append(
           // $('#body').empty();
            //$('#body').append(
                    
                       
                                    //------------------------------------body-----------------------------------------------------------------    
                                        '<div class="row">'+ 
                    
                                            '<div class="form-group col-sm-6">'+
                                                '<label >Assegna manutenzione a:   </label><br>'+
                                                '<div class="radio-inline">'+
                                                    '<label><input type="radio" value=1 name="manutenzione" id="manutenzione" '+$check1+'>Interna</label>'+
                                                '</div>'+
                                                '<div class="radio-inline">'+
                                                  '<label><input type="radio" value=2 name="manutenzione" id="manutenzione" '+$check2+'>Esterna</label>'+
                                                '</div>'+
                                                '<div class="radio-inline">'+
                                                  '<label><input type="radio" value=3 name="manutenzione" id="manutenzione" '+$check3+'>Committente</label>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="form-group col-sm-6">'+
                                                '<label id="lblmanutentore" for="manutentore"></label>'+
                                                '<select  id="manutentore" name="manutentore" class="form-control selectpicker"  multiple="multiple" ></select>'+
                                            '</div>'+
                                        '</div>');
                                     manutentori($dataInterventi[$i]['manutenzione']); //carico  la select con i parametri memorizzati in base al tipo 
                            
                                    $memManutentori=$dataInterventi[$i]['interventi_operatori']; //carico l'array dei manutentori/ditte/committenti
                                    console.log($i+"--"+$memManutentori);
                                    if($memManutentori != null && $memManutentori.length>0){ 
                                        

                                        for ($ii = 0; $ii <$memManutentori.length; $ii++) {
                                       
            
                                            $('#'+idPanel+" .panel-body").append(
                                                '<div class="row">'+
                                                   '<div class="form-group col-sm-3">'+
                                                       '<input type="hidden" class="form-control" name="manutentori['+$ii+'][id_person]" id="manutentori['+$ii+'][id_person]" value="'+$memManutentori[$ii][$tipoId]+'">'+  

                                                       '<label   id="lblname"  for="name">Nome </label>'+
                                                       '<input type="text" id="manutentori['+$ii+'][name]" name="manutentori['+$ii+'][name]" class="form-control" value="'+$memManutentori[$ii]['operatore']+'" readonly>'+
                                                   '</div>'+
                                                '</div>'+
                                                //-------------------email--------------------------------------------------------------------
                                                '<div class="row ">'+
                                                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                                        '<label  class="form-group col-lg-4" >E-mail</label>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div id="email'+$i+'"></div>'+
                                            '</div>'//end div body
                                            );
                                        }   //end for  
                                    }//end if
                                  
                                    if(interventi[$i]["email"]!=null && interventi[$i]["email"].length>0){ 

                                        for ($ii = 0; $ii <interventi[$i]["email"].length; $ii++) {


                                            $("#email"+$i).append(  

                                                '<div class="row">'+
                                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][id]" id="manutentori['+$i+'][email]['+$ii+'][id]" value="'+interventi[$i]["email"][$ii]['id']+'">'+  

                                                    '<div class="form-group col-lg-8">'+
                                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][email]" id="manutentori['+$i+'][email]['+$ii+'][email]" value="'+interventi[$i]["email"][$ii]['email']+'" readonly col-lg-7>'+
                                                    '</div>'+
                                                    '<div class="form-group col-lg-3">'+
                                                        '<input type="text" class="form-control" name="manutentori['+$i+'][email]['+$ii+'][emailNome]" id="manutentori['+$i+'][email]['+$ii+'][emailNome]" value="'+interventi[$i]["email"][$ii]['emailNome']+'" readonly>'+
                                                    '</div>'+

                                                '</div>');

                                        }
                                    }
                   
                                    //-------------------------------telefono------------------------------------------------------
                                     $('#'+idPanel+" .panel-body").append(
                                    '<div class="row ">'+
                                        '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                                            '<label class="form-group col-lg-4">Telefono</label>'+

                                        '</div>'+
                                    '</div>'+    
                                    '<div id="telefoni'+$i+'"></div>');
                                    if(interventi[$i]["telefoni"]!=null && interventi[$i]["telefoni"].length>0){ 
                                        for ($iii = 0; $iii <interventi[$i]["telefoni"].length; $iii++) {
                                            $("#telefoni"+$i).append(  

                                                '<div class="row">'+
                                                    '<input type="hidden" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][id]" id="manutentori['+$i+'][telefoni]['+$iii+'][id]" value="'+interventi[$i]["telefoni"][$iii]['id']+'">'+  
                                                    '<div class="form-group col-lg-8">'+
                                                    '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefono]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNumero]" value="'+interventi[$i]["telefoni"][$iii]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+
                                                '</div>'+
                                                    '<div class="form-group col-lg-3">'+
                                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                                        '<input type="text" class="form-control" name="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" id="manutentori['+$i+'][telefoni]['+$iii+'][telefonoNome]" value="'+interventi[$i]["telefoni"][$iii]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                                    '</div>'+

                                                '</div>'

                                            );
                                        }
                                    }
                
                               

            //}   // interventi.length fine
            //  $('#interventi').append('</div>');//chiude accordion1
            
            eventManutentori(this);
           
        }
        
        
        //-------------------------------manutentori/ditte_ext------------------------------------------
          
        function  manutentori(man){
           $selManutentore=$("#manutentore").selectpicker();
            var jsonObj = {};
            if(man==1){
                jsonObj.type= "manutentori"; 
                that.$('#lblmanutentore').text("Manutentori");
            }else if(man==2){
                jsonObj.type = "ditte_ext"; 
                 that.$('#lblmanutentore').text("Ditte esterne");
            }else{
                jsonObj.type = "committente";  
                 that.$('#lblmanutentore').text("Committente");
            }
              
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                 
                    $mydata =JSON.parse(json);
                   $selManutentore.empty();
                   $aa=$mydata.data;
                   $list=$aa;
                   var lista   = [];
                   //$selManutentore.append('<option value="0"></option>');
                 
                    lista.push('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      //$selManutentore.append('<option value="'+$aa[i]["id_person"]+'">'+$aa[i]["nome"]+'</option>');
                        lista.push('<option  value="' + $aa[i]["id_person"] + '">' + $aa[i]["nome"] + '</option>');
                   });
                  $selManutentore.html(lista.join(''));
                   $selManutentore.selectpicker('refresh');
              
                }  
            });
        }
        
       
        
        function  setIntervento($manu){ 
            console.log("setIntervento");
            $num_intervento=0;
            $aa;
            jsonObj={};
            jsonObj.type ="intervento";
            jsonObj.rma = app.global.nick_array.arr.id;  //id richiesta   
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $aa=$mydata.data[0];
                  
                    if($aa["numero"]===null){
                  
                        $num_intervento=1 ;
                        
                  }else{
                     $num_intervento=parseInt($aa['numero']) +1
                  }
                   
                    setIntervento1($num_intervento);
               
                }  
            });
         
        function  setIntervento1($num_intervento){
                console.log("setIntervento1");
                $('#intervento').append(
                    '<div class="row ">'+
                        '<div class="form-group  col-sm-12"  style="background-color: #f5f5f5">'+
                            '<label class="form-group" >Intervento N° '+$num_intervento+' </label>'+
                        '</div>'+
                        '<div class="row ">'+
                            '<div class="form-group col-sm-12" >'+
                                '<label for="descrIntervento" >Descrizione intervento</label>'+ 
                        '<textarea   id="descrIntervento" name="descrIntervento" class="md-textarea form-control" rows="3" maxlength="100"></textarea>'+
                       
                    '</div>'+
                        '<div class="form-group col-sm-6" >'+
                         '<label class="form-group col-sm-4" >Previsto per il:</label>'+    
                        '<div class="input-group date " id="datetimepicker1" >'+
                                        '<input type="text" class="form-control col-sm-2"  id="data_prevista" name="data_prevista"/>'+ 
                                        '<span class="input-group-addon">'+  
                                            '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                      '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group col-sm-2" >'+
                         
                            '<button type="button" id="assegna" name="assegna" class="btn btn-primary form-control" style="background-color:#ffc108;">Assegna</button>'+
                  
                        
                        '</div>'+
                    '</div>'
                    
                );
                
               
                $('#datetimepicker1').datetimepicker(
                    {                              
                    
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    startDate: "2018/12/20",
                    endDate:"2019/01/15",
                    language: "it"
                }).hide();
                $('#datetimepicker1').datetimepicker('setStartDate', '+1d');
                $('#datetimepicker1').datetimepicker('setEndDate', '+5m').show();
                
                $("#manageForm").validate(); //sets up the validator
                $("input[name=\"data_prevista\"]").rules( "add", {
                    required: true,
                    messages: {
                        required: "Per favore inserisci la data dell'intervento"
                    }
                });

                $('#assegna').click(function () {
                    id=this.id;
                        // alert("id="+id);
                       // dateInt=$("#datetimepicker1").data("DateTimePicker").date();
                         //return false;
                      
                    if ($('#manageForm').valid()) {
                           // alert('form is valid - not submitted');
                        assegna_intervento(id);
                        } else {
                            //alert('Inserire data intervento');
                        }
                         //assegna_intervento(id);
                }); 
                
                
                    
          
            }//end set intervento1 
        }//end set intervento
        
    this.$("#manageForm").validate({
                     validClass: "success"
                 //  onsubmit: false
                });
       
        
    function assegna_intervento(id){
            var data = {};
            dateInt=this.$("#datetimepicker1").data().date;
           
            var form_data = new FormData(this.$('#manageForm')[0]); 
            s=this.$('#manutenzione option:selected').text();
            var $person=app.global.tokensCollection.first().get("id_person");
            var API_URL = app.global.json_url + 'rma/intervento/';  
            form_data.append('type','intervento');
            form_data.append('action','add');
            form_data.append('person', $person);
            form_data.append('numero_RMA', app.global.nick_array.arr.num_prog);
            form_data.append('numero_intervento', $num_intervento);
            form_data.append('data_assegnazione',moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            form_data.append('numero_manutentori', $selManutentore.selectpicker('val').length);
            form_data.append('data_prevista1', moment(dateInt,"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss'));
            console.log( $selManutentore.selectpicker('val').length);
            var $tipoMan=$('input[name=manutenzione]:checked').val();
            var $manutentori=[];
            console.log( $selManutentore.selectpicker('val')[0]['id_person']);
            
                   //---------------serialize form-----------------------------------------------
                        //  var data = {};

            function buildInputObject(arr, val) {
                      if (arr.length < 1)
                          return val;  
                          var objkey = arr[0];
                      if (objkey.slice(-1) == "]") {
                          objkey = objkey.slice(0,-1);
                      }  
                      var result = {};
                      if (arr.length == 1){
                        result[objkey] = val;

                      } else {
                        arr.shift();
                        var nestedVal = buildInputObject(arr,val);
                        result[objkey] = nestedVal;

                      }
                      return result;
                  }

               $.each(that.$('#manageForm').serializeArray(), function() {
               //$.each(row, function() {
                  var val = this.value;
                  var c = this.name.split("[");
                  var a = buildInputObject(c, val);
                  $.extend(true, data, a);
                });

            //--------------------------------------------------------------------------
            
            
            
            $.each($selManutentore.selectpicker('val'), function(i, value) {
                       console.log(_.keys(value));
                        $manutentori['id_RMA']=app.global.nick_array.arr.num_prog;
                        $manutentori['num_intervento']=$num_intervento;
                        $manutentori['tipo_man']=$tipoMan;
                        $manutentori['id_man']=$selManutentore.selectpicker('val')[i]['id_person'];
            });
           console.log($manutentori);
         
            /*
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
              
            };
            */
            $headers1 = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
              
            };
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers1,
                data: form_data,
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
                      /*  $("#preview").html("Invio nuova richiesta con successo!").fadeIn().fadeOut(4000,function(){
                        app.routers.rmaRouter.prototype.rma_new();
                        });
                        $("#richiestaManutenzioneForm")[0].reset(); 
                        that.$('#btnHead').show();
                        */
                        // that.$("#invio").prop( "disabled", true );
                       
                        bootbox.alert({ 
                            title:that.language.header_rma_intervento_message,
                            message:that.language.body_message,
                            
                            callback: function() {
                            
                                // loadDataInterventi(app.global.nick_array.arr.id);
                                app.routers.rmaRouter.prototype.rma_management();
                             
                            }
                        });
                        /*
                        bootbox.dialog({
                        title: that.language.header_registration_message,
                        message: that.language.body_message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.rmaRouter.prototype.rma_new();
                                }
                            }
                        }
                    });*/
                   
                    }
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } 
                
       
            });
            return false; // avoid to execute the actual submit of the form.
        }//end assegna intervento
       
        
        
        
        //callList();
       
    function  callList(){
           
            var jsonObj = {};
           
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
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

    
    function  hrTable_(my){
        console.log(my);
        var columns = [];
        $table.bootstrapTable('destroy');
        
               
               
        columns.push({
            field: "timestamp",
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
            title: 'Operatore',              
            
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
        
        $table.bootstrapTable({
          
          columns: my.tab,
            //columns:columns,
            data: my.data,
            detailView:true,
            onExpandRow: function (index, row, $detail) {
                $table.find('.detail-view').each(function () {
                    if (!$(this).is($detail.parent())) {
                        $(this).prev().find('.detail-icon').click();
                    }
                });
                //$detail.html(row.timestamp);
               
                $detail.append(
                    varForm=
                    '<div class="row">'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[6].color+';"  for="name">Data Richiesta</label>'+
                            '<input type="text" class="form-control" value="'+row.timestamp+'" readonly>'+
                        '</div>'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[4].color+';">Data Assegnazione</label>'+
                             '<input type="text" class="form-control" value="'+row.data_assegnazione+'" readonly>'+
                        '</div>'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[5].color+';"  for="name">Data Intervento</label>'+
                             '<input type="text" class="form-control" value="'+row.data_intervento+'" readonly>'+
                        '</div>'+
                        '<div class="form-group col-sm-3">'+
                            '<label  class="label" style="color:grey;background-color:'+my.color[1].color+';"  for="name">Data Chiusura</label>'+
                             '<input type="text" class="form-control" value="'+row.data_chiusura+'" readonly>'+
                        '</div>'+
                        
                    '</div>'    
                );
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
            '<a class="update" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>',
             '<!--a class="create_user" href="javascript:" title="Attiva/Disattiva User Web"><i class="glyphicon glyphicon-user"></i></a-->&emsp;&emsp;',
            '<a class="remove" href="javascript:" title="Delete User Web"><i class="glyphicon glyphicon-remove-circle"></i></a>'
        ].join('');
    }
    
    function cellStyle(value, row, index) {
        
        return {css: 
            //{"background-color": row.name_cell_color}
            {"background-color":  row.stato_color}
        };
   
    }   
    this.$('.create').click(function () {
        isNew=true;
        app.global.nick_array.arr.id_rma= app.global.nick_array.arr.id;
        app.global.nick_array.isNew=isNew; 
        console.log(app.global.nick_array.arr.id_rma+app.global.nick_array.isNew);
        //  console.log(_.keys(app.global.nick_array.arr)+" -- "+_.values(app.global.nick_array.arr));
        app.global.rma_managementView.destroy_view();   
        app.routers.rmaRouter.prototype.rma_management_edit();
            
    });   
    this.$('#closeSBY').click(function () {
                   id=this.id;
                    // alert("id="+id);
                     assegna_chiusura(id);
                    // return false;
                }); 
    this.$('#closeKO').click(function () {
                   id=this.id;
                    // alert("id="+id);
                     assegna_chiusura(id);
                    // return false;
                }); 
                
    this.$('#closeOK').click(function () {
        id=this.id;
         //alert("id="+id);
        assegna_chiusura(id);

    }); 
    
      this.$('.next1').click(function () {
         
          
             
            if(app.global.nick_array.arrIndex== Number(app.global.nick_array.arrTable.length)-1){
                app.global.nick_array.arrIndex =0;
            }else{
                app.global.nick_array.arrIndex=Number(app.global.nick_array.arrIndex)+1; 
            }
          
            app.global.nick_array.arr=app.global.nick_array.arrTable[ app.global.nick_array.arrIndex];  
            
             
            app.global.breadcrumb.pop();
            app.global.breadcrumb.push({
               
                breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rma_management" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</a></li>'
            });
            console.log(app.global.nick_array.arr);
            app.routers.rmaRouter.prototype.rma_management();    
        });
        this.$('.pre1').click(function () {
             
            if(app.global.nick_array.arrIndex== 0){
                app.global.nick_array.arrIndex =Number(app.global.nick_array.arrTable.length)-1;
            }else{
                app.global.nick_array.arrIndex=Number(app.global.nick_array.arrIndex)-1; 
            }
          
            app.global.nick_array.arr=app.global.nick_array.arrTable[ app.global.nick_array.arrIndex];    
           
            app.global.breadcrumb.pop();
            app.global.breadcrumb.push({
               
                breadcrumb: '<li class="breadcrumb-item active"><a href="#it/rma_management" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</a></li>'
            });
            console.log(app.global.nick_array.arr);
            app.routers.rmaRouter.prototype.rma_management();    
        });
    
    function assegna_chiusura(typeEnd){
       $close=1;
         //console.log(app.global.nick_array.arr.interventi.length+"="+$close);
          console.log( (  app.global.nick_array.arr.interventi));
        if(app.global.nick_array.arr.interventi.length >0){
        for(i=0;i<app.global.nick_array.arr.interventi.length;i++){
           
            if(app.global.nick_array.arr.interventi[i].data_effettuata==null){//se la data non esiste 
                $close=0;
            }
            
        }
        }
       if($close==0){
           alert("Attenzione ci sono interventi da chiudere!");
           return;
       }
        var jsonObj = {};
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj.type = "rma";
        jsonObj.action = "close";
        jsonObj.id_rma = app.global.nick_array.arr.id;
        jsonObj.type_end = typeEnd;
        jsonObj.descr_end = this.$("#descr_chiusura").val();
        jsonObj.data_chiusura = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        
        
        
        
        
        jsonObj = JSON.stringify(jsonObj);
           
           
        
        $headers1 = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang")//,

        };
        $.ajax({
            url:app.global.json_url + 'rma/close/',
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',       // To send DOMDocument or non processed data file it is set to false    
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
                  /*  $("#preview").html("Invio nuova richiesta con successo!").fadeIn().fadeOut(4000,function(){
                    app.routers.rmaRouter.prototype.rma_new();
                    });
                    $("#richiestaManutenzioneForm")[0].reset(); 
                    that.$('#btnHead').show();
                    */
                    // that.$("#invio").prop( "disabled", true );

                    bootbox.alert({ 
                        title:that.language.header_rma_chiusura_message,
                        message:that.language.body_chiusura_message,

                        callback: function() {

                           // loadDataInterventi(app.global.nick_array.arr.id);
                            app.global.rma_managementView.destroy_view(); 
                            app.routers.rmaRouter.prototype.rma_view();

                        }
                    });
                        
                }
            },
            error: function(e) {
                $("#err").html(e).fadeIn();
            } 
            
        });
    }  //end chiusura rma      
        
    window.actionEvents = {
            'click .update': function (e, value, row,index) {//intervento
                 
                //--------------------------------------------------------------------------
               
                isNew=false;
              
                $row=row;
                //setForm();
                app.global.nick_array.isNew=isNew; 
                app.global.nick_array.id_int=row.id; 
                app.global.nick_array.arr.int=row;
                console.log(app.global.nick_array)
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active" href="" >Intervento '+row.number+'</li>'
                });
                app.global.rma_managementView.destroy_view();  
                   
                app.routers.rmaRouter.prototype.rma_management_edit();
                //----------------------------------------------------------------------------
             
             
            
               
            },
            'click .remove': function (e, value, row,index) {
                    
                 if (confirm('Sei sicuro di voler eliminare questo Intervento?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "intervento";
                    jsonObj.num =app.global.nick_array.arr.numero_interventi;
                    jsonObj.id_rma =app.global.nick_array.arr.id;//id rma
                    jsonObj.id=row.id;//id intervento
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:app.global.json_url + 'rma/intervento/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            bootbox.alert({ 
                            title:that.language.header_rma_del_intervento_message,
                            message:that.language.body_del_message,
                        
                        });
                           
                          
                             //$table.bootstrapTable('refresh',   loadDataInterventi(row.id_rma));
                            app.global.rma_managementView.destroy_view();  
                            app.routers.rmaRouter.prototype.rma_view();
                             },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            } //remove
       
        };
        
        
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this;
    },
    
    assegna_intervento__:function(id){
      
            alert(id);
            // alert(_.keys(this)+"intervento assegnato!"+_.keys(_.values(e.currentTarget))+" id="+e.currentTarget);
                    
            return false; // avoid to execute the actual submit of the form.
        },
    chiudi_rma :function(e){
     alert("RMA chiusa");
    },
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
return app.views.rma_management;
});


