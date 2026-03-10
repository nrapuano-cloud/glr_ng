require(['app','bootbox'], function(app,bootbox){
app.views.gap_pma=Backbone.View.extend({
    
    initialize:function(){
        this.$modal;
       
       this.$servizi=new Array();
       this.$auto=new Array();
       this.$tipiManutenzione=new Array();
        this.$pmaPillColl = new app.collections.pmaPills(); 
        
        console.log("initializing gap_pma view")
    },
    events:{
        "drag":"dragEvent",
        "dragstart":"dragStartEvent",
        "dragenter":"dragEnterEvent",
        "dragover":"dragOverEvent",
        "dragleave":"dragLeaveEvent",
        "dragend":"dragEndEvent",
        "drop":"dropEvent",
        "click .submit":"submitModal",
        "click .pill":"subPill"
        // "click .pill":"showModal"
       
      
       // "click #del.submit":"showModal",
       
        
    },
   
    subPill1:function(ev){
        console.log(ev);
        alert('dddd');
        bootbox.dialog({
                        title: "test",
                        message: 'teeest',
                        buttons: {
                            main: {
                                label: 'teeeeest',
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                }
                            }
                        }
                    });
    },
    formPill:function(){
        var $formPill= '  <div class="row " ><div class="form-group col-lg-6">'+
                '<label for="datetimepicker1">Data *</label>'+
                '<div class="input-group date " id="datetimepicker1">'+
                    '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1" required/>'+ 
                    '<span class="input-group-addon">'+ 
                        '<span class="fa fa-calendar"></span>'+
                    '</span>'+
                '</div>'+
            '</div>'+
             '<div class="form-group col-lg-6">'+

                           '<label for="repeat">Si ripete ogni anno</label>'+
                           '<input type="checkbox" class="form-control " name="repeat" id="repeat" >'+
                       '</div>'+
            '<div class="form-group col-lg-12">'+
                '<label for="nota">Nota</label>'+
                '<input type="text" class="form-control" name="nota" id="nota" placeholder="Nota" >'+
                '<span class="help-inline"></span>'+
            '</div>'+    
            '<div class="form-group col-lg-12">'+
                '<label for="tipo">Tipo manutenzione</label>'+
                '<select  class="form-control" name="tipo_manutenzione" id="tipo_manutenzione"  >'+
                '<span class="help-inline"></span>'+    
            '</div></div>';
        return $formPill;
    },
    subPill:function(ev){//update
        console.log(ev);
        console.log(Number(ev.target.attributes[0].value));
        this.$pmaPill = this.$pmaPillColl.get(Number(ev.target.attributes[0].value));//.attributes["nota"];
        var pill=this.$pmaPill;
        console.log(pill);
        var  nome=pill.get('label'); 
        var  nota=pill.get('nota'); 
        var  data=pill.get('data');
        var  repeat=pill.get('repeat'); 
        var  tipo_manutenzione=pill.get('id_tipo_manutenzione'); 
        var $yearM =moment(data).format('YYYY-MM');
          
        // alert('nota: '+book.attributes.nota);
        this.$("#modalF").empty();
        this.$("#modalF").append(
          this.formPill()      
         /* '  <div class="row " ><div class="form-group col-lg-6">'+
                '<label for="datetimepicker1">Data *</label>'+
                '<div class="input-group date " id="datetimepicker1">'+
                    '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1" required/>'+ 
                    '<span class="input-group-addon">'+ 
                        '<span class="fa fa-calendar"></span>'+
                    '</span>'+
                '</div>'+
            '</div>'+
             '<div class="form-group col-lg-6">'+

                           '<label for="repeat">Si ripete ogni anno</label>'+
                           '<input type="checkbox" class="form-control " name="repeat" id="repeat" '+(repeat==='1'?'checked':'')+'>'+
                       '</div>'+
            '<div class="form-group col-lg-12">'+
                '<label for="nota">Nota</label>'+
                '<input type="text" class="form-control" name="nota" id="nota" placeholder="Nota" >'+
                '<span class="help-inline"></span>'+
            '</div>'+    
            '<div class="form-group col-lg-12">'+
                '<label for="tipo">Tipo manutenzione</label>'+
                '<select  class="form-control" name="tipo_manutenzione" id="tipo_manutenzione"  >'+
                '<span class="help-inline"></span>'+    
            '</div></div>'*/
            );
            $("#tipo_manutenzione").append('<option value="0">Seleziona</option>'); 
               $.each(this.$tipiManutenzione, function(i, value) {
                    $("#tipo_manutenzione").append('<option value="'+value.id+'">'+value.name+'</option>'); 
                });
        this.$("#del").remove();//..nel caso ci fose già
        this.$modal.find('.submit').text('Update');
        this.$(".modal-footer").append('<button type="button" id="del" class="btn btn-danger pull-left submit"><i class="fa fa-trash"></i> Delete</button>');
        this.$modal.find('.modal-title').text(nome);
       
        this.$modal.find('input[name="dataTemp1"').val(moment(data).format('DD/MM/YYYY'));
        this.$modal.find('input[name="nota"').val(nota);
        if(typeof tipo_manutenzione !== 'undefined'){
                   $("#tipo_manutenzione").val( tipo_manutenzione);
               }
       
        
        $startDate= moment($yearM+'-01').startOf('month').format('DD-MM-YYYY');
        $lastdate=moment($yearM+'-01').endOf('month').format("DD-MM-YYYY"); 
       
        $('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            language: "it"
        });
       // $('#datetimepicker1').datetimepicker('setStartDate',$startDate);
       // $('#datetimepicker1').datetimepicker('setEndDate',$lastdate); 
      this.$modal.modal('show'); 
    },
    dragEvent:function(ev){
        
    },
    dragStartEvent:function(ev){
        console.log(ev.target.id);
        ev.target.style.opacity = .5;
        //ev.dataTransfer.setData("text/plain", event.target.id);
        //ev.dataTransfer.setData("text/plain", null);
      
        dragged = ev.target;
         // ev.dataTransfer.dropEffect = "copy";
       
    },
    dragEnterEvent:function(ev){
        
           
            console.log(ev.target.id);
             // $zzz = $(ev.target);
              // highlight potential drop target when the draggable element enters it
              console.log(ev.target.classList.contains('drop'));
                if ( ev.target.classList.contains('drop')) {
                  

             //  var headRow= ev.target.parentNode.firstChild.innerHTML;
              //  var uid= ev.target.parentNode.firstChild.getAttribute('idx');
                //    var start =  ev.target.getAttribute('date');
         //  console.log(uid+" dragenter==="+headRow+"  "+ start);
                 ev.target.style.background = "yellow";


        //--------------------------------------------------------------------------------------------------------
              }

          },
    dragOverEvent:function(ev){    
        // console.log("dragover");
        // prevent default to allow drop
        ev.preventDefault();
    },
    dragLeaveEvent:function(ev){
    
            // console.log("dragleave");

            if ( ev.target.classList.contains('overmar') &&  ev.ctrlKey) {

                if ( ev.target.hasChildNodes() ) { 
                    ev.target.removeChild( ev.target.childNodes[0] );
                }

                //dragged.style.opacity = "";
                //ev.target.appendChild(dragged.cloneNode(true));


                        ev.target.classList.remove('overmar');
                        ev.target.classList.remove('overSun');
                        ev.target.classList.remove('over');

                        var action="add";
                        var uid= ev.target.parentNode.firstChild.getAttribute('idx');
                        var iid= dragged.getAttribute('iid');
                        var cid= dragged.getAttribute('cid');
                        var start = ev.target.getAttribute('date');
                        console.log("action="+action+" iid="+iid+" cid="+cid+" start="+start+" uid="+uid);
                        //sendND(action,cid,start,uid);
                    ev.target.style.background = "";
                    } // event.ctrlKey
                    else{
                    event.target.style.background = "";
                    ev.target.classList.remove('overmar');
                    ev.target.classList.remove('overSun');
                    ev.target.classList.remove('over'); 

           }


          }, 
    dragEndEvent:function(ev){
           // console.log("dragend");
            // reset the transparency
         ev.target.style.opacity = "";
          //event.dataTransfer.clearData();
         
        },
    dropEvent:function(ev){
        ev.preventDefault();
        console.log(ev.target);
        console.log(this.$servizi);
        that=this;
        if ( ev.target.classList.contains('drop')) {
            ev.target.style.opacity = "";
           //  var $pmaPill = new app.models.pmaPill(); 
            console.log( ev.target.classList);
            var data = dragged.cloneNode(true);
            console.log(data);
            this.$pmaPill = new app.models.pmaPill(); 
          
            this.$pmaPill.set('tipoPill',data.getAttribute("id"));
            this.$pmaPill.set('idCell',ev.target.getAttribute("id")); 
            this.$pmaPill.set('label',data.innerText);
            this.$pmaPill.set('idmonth',Number(ev.target.getAttribute('month')));
            this.$pmaPill.set('idAuto',this.$servizi[Number(ev.target.getAttribute('autoindex'))].id_auto);
            this.$pmaPill.set('targa',this.$servizi[Number(ev.target.getAttribute('autoindex'))].targa);
            this.$pmaPill.set('idServizio',this.$servizi[Number(ev.target.getAttribute('autoindex'))].id_servizio);
            this.$pmaPill.set('idpma',ev.target.getAttribute('idpma'));
           
            data.setAttribute("id",'');//niente id quando è nuovo
           
            //data.removeAttribute("draggable");
           // data.style.opacity = ""; 
         // ev.target.appendChild( data );
           // var action="add";
            //var idPma= ev.target.parentNode.firstChild.getAttribute('idPma');
            //var iid= ev.target.getAttribute('iid');
            //var cid= ev.target.getAttribute('cid');
            ev.target.style.background = "";
           // var start = ev.target.getAttribute('date');
            console.log(data);
           
            console.log(this.$pmaPill);
           
            this.showModal(data);
                   
        }
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
    showModal: function( row) {//nuovo
    
        this.$("#modalF").empty().append(
            this.formPill()
                /*
 
            '  <div class="row " ><div class="form-group col-lg-4">'+
                '<label for="datetimepicker1">Data *</label>'+
                '<div class="input-group date " id="datetimepicker1">'+
                    '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1" required/>'+ 
                    '<span class="input-group-addon">'+ 
                        '<span class="fa fa-calendar"></span>'+
                    '</span>'+
                '</div>'+
            '</div>'+
            '<div class="form-group col-lg-8">'+
                '<label for="nota">Nota</label>'+
                '<input type="text" class="form-control" name="nota" id="nota" placeholder="Nota" >'+
                '<span class="help-inline"></span>'+
            '</div>'+    
            '<div class="form-group col-lg-8">'+
                '<label for="tipo">Tipo manutenzione</label>'+
                '<select  class="form-control" name="tipo_manutenzione" id="tipo_manutenzione"  >'+
                '<span class="help-inline"></span>'+    
            '</div></div>'*/
            );
            //-----------tipi-----------------------
               this.$("#tipo_manutenzione").empty();
               $("#tipo_manutenzione").append('<option value="0">Seleziona</option>'); 
                $.each(this.$tipiManutenzione, function(i, value) {
                    $("#tipo_manutenzione").append('<option value="'+value.id+'">'+value.name+'</option>'); 
                });
                /*if(typeof app.global.nick_array.anno !== 'undefined'){
                    this.$("#tipo").val(app.global.nick_array.anno);
                }*/
          this.$("#del").remove();//..nel caso ci fose già          
        console.log(this.$pmaPill);           
        console.log(row);
        var $year =this.$('#year').val();
        
        if(!this.$pmaPill){
            console.log(Number(row.target.attributes[0].value));
        }else{
            console.log(this.$pmaPill);  
            nome=this.$pmaPill.get('label');//
        //nome=data.getAttribute('id');
        mese=this.$pmaPill.get('idmonth');
         auto=this.$pmaPill.get('idAuto');
          console.log(this.$pmaPill);
        //pma=row.getAttribute('idpma');
        console.log($year,mese,nome,auto);
        //row['idpma']=pma;
        //  row['id']=  "";
        //row['idmonth']=mese; 
        // console.log('id='+row.lastElementChild.id);
        // console.log('tipoPill='+row.tipoPill);
        if(row.id==''){//nuovo
            for (var name in row) {
            // console.log(name+"-"+row[name]);
            this.$modal.find('input[name="' + name + '"]').val(row[name]); 
        }
        this.$modal.find('input[name="dataTemp1"').val('');
        this.$modal.find('input[name="nota"').val('');   
        
       }else{
            for (var name in row) {
            // console.log(name+"-"+row[name])
            this.$modal.find('input[name="' + name + '"]').val(row[name]); 
            this.$modal.find('select[name="' + name + '"]').val(row[name]); 
        }  
       }
        this.$modal.find('.modal-title').text(nome);
        
        $setDate= moment($year+'-'+mese+'-01').format('DD-MM-YYYY');
        $startDate= moment($year +'-'+mese+'-01').startOf('month').format('DD-MM-YYYY');
        $lastdate=moment(Number($year+1).toString()+'-'+mese+'-01').endOf('month').format("DD-MM-YYYY"); 
        console.log($setDate);
        $('#datetimepicker1').datetimepicker({ 
          //  setDate: $setDate,
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            language: "it"
            
        });
   //   $('#datetimepicker1').datetimepicker('setDate','2020-05-03');
       $('#datetimepicker1').datetimepicker('setInitialDate',$startDate);
      //  $('#datetimepicker1').datetimepicker('setEndDate',$lastdate); 
           this.$modal.find('.submit').text('Add');
        this.$modal.modal('show');
    }},
    submitModal: function(e){
        console.log(e);
        console.log(this.$pmaPill);
        if(this.$pmaPill.get('id')==null){
            console.log('new');
             this.$pmaPill.set('action','add');
        }else if(e.target.attributes[1].value=='del'){
           var delPill = confirm('vuoi eliminare questa Pill?');

               if(delPill){ this.$pmaPill.set('action','del');} 
            
            
        }else{  console.log('update');
              this.$pmaPill.set('action','update');
        }
      
        console.log(e);
       
      
           var data =this.$('form').serializeJSON();
            //this.model.set(data);
       // var data = Backbone.Syphon.serialize(this);
        console.log(data);
        console.log(this.$('#tipo_manutenzione').val(),this.$('#tipo_manutenzione option:selected' ).text());
         this.$pmaPill.set('label', this.$('#tipo_manutenzione option:selected' ).text());
        //var dataT=moment(data.dataTemp1, ["MM/DD/YYYY", "YYYY-MM-DD"]);//moment(data.dataTemp1).format('YYYY-MM-DD');
        //var dataT1=moment(data.dataTemp1).valueOf();
         var dataT=moment(data.dataTemp1, 'DD/MM/YYYY').format('YYYY-MM-DD');//moment(dataT1).format('YYYY-MM-DD');
        this.$pmaPill.set(data);
        this.$pmaPill.set('data', dataT);
     //   this.$pmaPill.set('data', dataT);
      // this.$pmaPill.set('tipoPill', data.tipo_pill);
        //var $pmaPill = new app.models.pmaPill(); 
        console.log(this.$pmaPill);
        
        that=this;
        var options={
            success: function(model, response, options){ 
                
                console.log(model);
                console.log( $('#'+model.get('tipoPill')));
                console.log( $('#'+model.get('idx')));
                //   $('#'+model.get('tipoPill')).attr("id",model.get('tipoPill')+response.id);
                //  $('#'+model.get('tipoPill')+' .badge').attr("id",response.id);
             // console.log(document.getElementById(model.get('idx')+response.id).lastChild.id); //innerText=moment(moment(model.get('data')).format('YYYY-MM-DD')).format('DD');
              // document.getElementById(model.get('idx')+response.id).lastChild.setAttribute("id",'badge'+response.id);
                 // $('#'+model.get('id')+' span.badge').append(moment(moment(model.get('data')).format('YYYY-MM-DD')).format('DD'));
              //   document.getElementById('badge'+response.id).innerText =moment(moment(model.get('data')).format('YYYY-MM-DD')).format('DD');  
                 console.log(response);
                    console.log('Id: '  +response.id); 
                   that.$modal.modal('hide');
                    that.planTable();
                   // this.$pmaPill.destroy();
       //app.routers.router.prototype.planning();
                
                }, 
                error: function(model,errors){ 
                    console.log('Failed to save model '+model);
                      console.log(model);
                    
                }
        };
        options.private=true;
        options.type='POST';
        options.url=app.global.json_url + 'gap_pma/planning/';
        // $pmaPill.sync("create",$pmaPill,options);
        //data.data=moment(moment(this.$('#dataTemp1').val()).format('DD/MM/YYYY')).format('YYYY-MM-DD');//niente id quando è nuovo
        
        // document.write("What's my name: ", $pmaPill.get('nota'));
        console.log(this.$pmaPill.attributes);
        this.$pmaPill.set('person',app.global.tokensCollection.first().get("id_person"));
        // this.$pmaPill.set('idCell',this.$pmaPill.get("id"));
        this.$pmaPill.set('type','pills'); 
       
        console.log( moment(moment(this.$('#dataTemp1').val()).format('DD/MM/YYYY')).format('YYYY-MM-DD'));
        console.log( data.dataTemp1);
        console.log(moment(moment(data.dataTemp1).format('DD/MM/YYYY')).format('YYYY-MM-DD'));
        // this.$pmaPill.set('data', moment(moment(this.$('#dataTemp1').val()).format('DD/MM/YYYY')).format('YYYY-MM-DD'));
        
        this.$pmaPill.set('id_pill_riferimento','0');
        
        this.$pmaPill.set('servizio',app.global.nick_array.servizio);
        //console.log('Check nota change: ' + $pmaPill.get('nota'));
        // this.$modal.modal('hide');
        this.$pmaPill.save(this.$pmaPill.attributes,options);
        //this.$pmaPill.save(null,options);
        console.log( this.$pmaPill);
        this.$pmaPill.on('invalid', function() {

        this.arguments;

        });
        
      

    
    },
    hideErrors: function () {
        this.$('.control-group').removeClass('error');
        this.$('.help-inline').text('');
    },
    showErrors: function(errors) {
        _.each(errors, function (error) {
            var controlGroup = this.$('.' + error.name);
            console.log(error.name);
            controlGroup.addClass('error');
            controlGroup.find('.help-inline').text(error.message);
        }, this);
    },
    planPrepare: function() {
        var $selManutenzioni=this.$("#manutenzioni");
        var $selServizio=this.$("#servizi");
        var $selVeicolo=this.$("#veicoli");
        var $selyear=this.$("#year");
        var $person=app.global.tokensCollection.first().get("id_person");
        var that=this;
        jsonObj = {};
        jsonObj.person = $person
        jsonObj.action = "list";    
        jsonObj.type = "pma";
       
        
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
            url:app.global.json_url+'gap_pma/planning/',
            type:'post',
            headers : this.headerJson(),
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
              $servizi=$mydata.servizi;
              that.$servizi=$mydata.servizi;
               that.$auto=$mydata.auto;
                that.$tipiManutenzione=$mydata.tipoPmaManutenzione;
            
                 $veicoli=$mydata.veicoli;
                //--------veicoli------------------------------
                $selVeicolo.empty();
                 $selVeicolo.append('<option value="0">Tutti</option>');
                $.each($veicoli, function(i, value) {
                    
                        $selVeicolo.append('<option value="'+value.id+'">'+value.targa+'</option>');
                   
                });
                 if(typeof app.global.nick_array.auto !== 'undefined'){
                    $selServizio.val(app.global.nick_array.auto);
                }
                //$selVeicolo.val($servizio);
                //--------servizio------------------------------
                $selServizio.empty();
                $selServizio.append('<option value="0">Tutti</option>');
                $.each($servizi, function(i, value) {
                    $selServizio.append('<option value="'+value.id_servizio+'">'+value.nome_servizio+'</option>');
                });
                if(typeof app.global.nick_array.servizio !== 'undefined'){
                    $selServizio.val(app.global.nick_array.servizio);
                }
               // $selServizio.val($servizio);
                //-----------anni-----------------------
                $selyear.empty();
                $aa=$mydata.anni;
                // $selyear.append('<option value="0"></option>'); 
                $.each($mydata.anni, function(i, value) {
                    $selyear.append('<option value="'+value.anno+'">'+value.anno+'</option>'); 
                });
                if(typeof app.global.nick_array.anno !== 'undefined'){
                    $selyear.val(app.global.nick_array.anno);
                }
               //------------manutenz---------------------------
                $selManutenzioni.empty();
                $selManutenzioni.append('<option value="0">Tutti</option>');
                $.each($mydata.tipoPmaManutenzione, function(i, value) {
                    
                         $selManutenzioni.append('<option value="'+value.id+'">'+value.name+'</option>');
                   
                });
                console.log(that.$tipiManutenzione);
                 console.log(app.global.nick_array);
                if(typeof app.global.nick_array.manutenzione !== 'undefined'){
                     $selManutenzioni.val(app.global.nick_array.manutenzione);
                }
            }
               
        });
        $selyear.change(function (){
            console.log(app.global.nick_array.anno);    
            app.global.nick_array.anno= $selyear.val();
            console.log(app.global.nick_array.anno); 
            that.planTable();
           // app.routers.router.prototype.gap_pma();
        }); 
        $selServizio.change(function (){
            console.log(app.global.nick_array.servizio);    
            app.global.nick_array.servizio= $selServizio.val();
            console.log(app.global.nick_array.servizio); 
            that.planTable();
        });  
        $selVeicolo.change(function (){ 
            console.log(app.global.nick_array.auto);    
            app.global.nick_array.auto= $selVeicolo.val();
            console.log(app.global.nick_array.auto); 
            that.planTable();
        }); 
        $selManutenzioni.change(function (){ 
            console.log(app.global.nick_array.manutenzione);    
            app.global.nick_array.manutenzione= $selManutenzioni.val();
            console.log(app.global.nick_array.manutenzione); 
            that.planTable();
        }); 
       
        this.planTable();
               
   },
    planTable: function(){
        
       
        var $tipoManutenzione="";
        var $planData;
        var $month=[];
        var $monthx;
      
        var langx=this.language.lang;
        var $person=app.global.tokensCollection.first().get("id_person");
        var $servizi=[];
        
        var that=this;
       console.log(app.global.tokensCollection.first().get("id_servizio"));   
       
      
        
       
        console.log( that);
        jsonObj = {};
        jsonObj.person = $person
        jsonObj.action = "list";    
        jsonObj.type = "pills";
        jsonObj.year = app.global.nick_array.anno;
        jsonObj.auto = app.global.nick_array.auto;
        jsonObj.servizio = app.global.nick_array.servizio;
        jsonObj.manutenzione = app.global.nick_array.manutenzione;
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
            url:app.global.json_url+'gap_pma/planning/',
            type:'post',
            headers : this.headerJson(),
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                $servizi=$mydata.dataSx;
                that.$servizi=$mydata.dataSx;
                console.log(that.$servizi);
             
               
                //---------------------------------------
                $planData=$mydata;
                that.$('#pmaCount').empty();
                if($planData.pma){
                   $count=$planData.pma.length;
                }else{
                  $count=0;
                }
                that.$('#pmaCount').text("Ci sono "+$count.toString()+" PMA"); 
                that.$pmaPillColl.reset();
                for(i=0;i<$planData.pma.length;i++){
                    that.$pmaPillColl.add($planData.pma[i]);
                }
                console.log(that.$pmaPillColl); 
                month();
            }
        });
  
     
       
        //------------------dropdown month---------------------------------------------------------------------
        function month(){
            console.log($planData);
        var $selmonth=this.$("#month");
        //var  $monthx=this.$("#elementId :selected").text()
        var $dayMonth;

        //var API_URL_city = app.global.json_url + '/plan/list/city';

        $.ajax({
            url:'js/json/month-'+langx+'.json',
            type:'get',

            dataType : 'text',
            success: function (data) {
              //  console.log(data);
                $monthx=JSON.parse( data );
               
               // var  $yearx=data;
               $month=$monthx
               /*
                $.each($monthx, function(key, val){
                    $selmonth.append('<option value='+(key)+'>'+ val.month+ '</option>');
                });
                $selmonth.prop('selectedIndex', m);
                */
                $month = Number($selmonth.val())+1;
                //var qq= $monthx;
               // console.log($year+','+$month+','+langx);   
               // $dayp=dayYear($year,$month);  
                //dateDd($year,$month, $dayP);  
                 table();   
            },
            error: function () {
                   
                   // showAlert1(($modal.data('id') ? 'Update' : 'add') + ' item error!', 'danger');
            }
        }); 
    }
        function table(){
            console.log($monthx.length);
            var $el, cells, rows;
            var i, j,row,  ndrop, res;
            var columns = [];
            var data = [],        
            $el= this.$('#table');
            cells=$monthx.length;
            $planD=$planData.pma;
            // rows=$planData.pma.length;
            rows=$servizi.length;
            console.log($monthx+"=month cells="+cells+" rows="+rows);
            console.log($servizi);
            //-------------1 colonna  tipologie --------------------------------
            /*       columns.push({

                // field: 'field0-0',
                field: 0,
                //title: '<label class="lbl hdate" >Tipo Manutenzione</>',
                title: 'Tipo Manutenzione',
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
                    
            //-------------1 colonna  ditte
            columns.push({

                // field: 'field0-0',
                field: 1,
                //title: '<label class="lbl hdate" >Tipo Manutenzione</>',
                title: 'Competenza',
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
            //-------------1 colonna  ditte
            columns.push({

                // field: 'field0-0',
                field: 2,
                //title: '<label class="lbl hdate" >Tipo Manutenzione</>',
                title: 'Ditta',
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
            //-------------1 colonna  ditte
            columns.push({

                // field: 'field0-0',
                field: 3,
                //title: '<label class="lbl hdate" >Tipo Periodicità</>',
                title: 'Periodicità',
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
            //---------------dalla quinta colonna i mesi contemplati------------
            // aggiungo 4 perchè nelle prime  4 colonne ci sono i nomi composti
            */
            //-------------1 veicolo -------------------------------------------
            columns.push({

                // field: 'field0-0',
                field: 0,
                //title: '<label class="lbl hdate" >Tipo Manutenzione</>',
                title: 'Targa veicolo',
               // filterControl: "select",
               // sortable: true,
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
                    
            //-------------2 colonna  servizio ---------------------------------
            columns.push({

                // field: 'field0-0',
                field: 1,
                //title: '<label class="lbl hdate" >Tipo Manutenzione</>',
                title: 'Servizio',
               // filterControl: "select",
                // sortable: true,
                align: 'center',
                valign: 'middle',
                cellStyle: cellStyle1
            });
            for (i = 0; i < cells; i++) {
            //----------creo array head colonne---------------------------------

                columns.push({
                    //events: operateEvent,
                    // field: 'field' + String(i+1)+"-"+$user[0]['days'][i]['kw'],
                    field: i+2,
                    //title:'<label class="lbl hdate" >'+$monthx[i].month+'</>',
                    title: $monthx[i].month,
                    align: 'center',
                    //  formatter:formatter2,
                    // class: 'drop',
                    cellStyle: cellStyle2, 
                    valign: 'middle;" date="'+'" id="R0C'+String(i+1)+'"'
                    //  sortable: false
                });
            } // for (i = 0; i < cells; i++) {
            for (i = 0; i < rows; i++) {
                row = {};

                //----------------popolo la prima colonna con il nome tipologia --------------                
                //row[0] =$planData.pma[i].tipologia;//nome tipologie
                row[0] =$servizi[i].targa;//
                //----------------popolo la seconda colonna con  competenza-------------      
                row[1] = $servizi[i].nome_servizio;

                //----------------popolo la terza colonna con  ditta --------------      
                //  row[2] =$planData.pma[i].ditta;

                //---------------- popolo la quarta colonna con periodicita--------------      
                //  row[3] =$planData.pma[i].periodicita;

                //---------------popolo le altre celle----------------------------------------------------------------

                for (j = 0; j < cells; j++) {
                   // row[j+4]='';
                    row[j+2]='';
                }

                data.push(row);
            }//for (i = 0; i < rows; i++) {

            // console.log(columns);
           
            $el.bootstrapTable('destroy').bootstrapTable({
                // height:450,
                columns: columns,
                data: data
                
                // fixedColumns: true
               // }).done(popcell());
           });
            popcell();           
        //end build table
     }
        function cellStyle1(value, row, index, field) {

            return {
             //   classes: '" id="R'+(Number(index)+1)+'C0'+field+'"  idPma="'+$planD[index]['id']
              classes: '" id="R'+(Number(index)+1)+'C0'+field+'"  '
            };
            return {};
        }     
        function cellStyle2(value, row, index, field) {
           
            return {
                // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                // classes: 'drop" id="R'+(Number(index)+1)+'C'+(field-3)+'" month="'+(field-3)+'" idPma="'+$planD[index]['id']//dato che ci sono 4 colonne prima dei dati e per iniziare con la prima colonna dati =1 per avere cosi la prima colonna di dati!
                classes: 'drop" autoIndex="'+(index)+'" id="R'+(Number(index)+1)+'C'+(field-1)+'" month="'+(field-1) //dato che ci sono 2 colonne prima dei dati e per iniziare con la prima colonna dati =1 per avere cosi la prima colonna di dati!
                
            };

            return {};
        }  
       
        function popcell(){
         //   console.log(that.$pmaPillColl);
             //console.log($planData);
            // if($planData.pmaData.length>0){
            if(that.$pmaPillColl.length>0){
            $planD=$planData.pma;
            // console.log($planD);
         //    for(i=0;i<$planD.length;i++){
               // console.log($planD[i].id);
               // console.log($planD[i].month);
                that.$pmaPillColl.each(function(pill) {    //ciclo per ogni pill 
               // console.log(pill);  
                  
                console.log('i='+i+'->mese='+pill.attributes.idmonth+' && idCell=='+pill.attributes.idCell); 
                  
              //  if( $planD[i].id==pill.attributes.id_rma_pma){
                   var dayOf =moment(pill.attributes.data ,'YYYY-MM-DD').format('DD');  
                    var cellp='#'+pill.attributes.idCell;//idcell costruito tipo schema excel R1C1
                    var c1 =  '<label id="'+pill.attributes.id+'" tipo_pill="'+pill.attributes.tipo_pill+'" class="lbl '+pill.attributes.tipo_pill+' pill"   >'+pill.attributes.label+'<span id="badge'+pill.attributes.id+'" class="badge">'+dayOf+'</span></>';
                    this.$(cellp).append(c1);
                  //  console.log(c1);   
              //  }
                  
                   
                }); 
                    
               // }
           
               
               
               
            }
            
            c2=' <button href="'+$planData.fileName+'.pdf" title="Pdf" type="button" class="btn " id="excel"  download> </i><img src="./css/img/pdf.png"  width="20px"/></button>';
   
            that.$("#downFile").empty();  
            that.$("#downFile").append(c2); 
           // console.log(c1);
            that.$('#excel').click(function () {
             id=this.id;
        
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
            that.excel(this.id,'PMA '+datestring+'.pdf');

    });
        }        
    },
    excel:function(id,file){
        
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
  
    var  $uurl= app.global.json_url + 'rma_pma/planning/doc/';
    //jsonObj.nameQuery =$NameQuery;
    //jsonObj.table =arTable;
    jsonObj.person = app.global.tokensCollection.first().get("id_person");
    jsonObj.type ="pdf";
    jsonObj.action ="download";
    jsonObj.year = app.global.nick_array.anno;
    jsonObj.servizio = app.global.nick_array.servizio;
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
    render:function(){
        
        
    	$(this.el).html(this.template());
         
        console.log(app.global.breadcrumb) ; 
        if(app.global.breadcrumb.length>2){
            app.global.breadcrumb.pop();
            
             
        }    
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb']);
        } 
        
        console.log(app.global.nick_array.servizio+" anno="+app.global.nick_array.anno );
       
        var $monthx;
     
        var $planD=[];
      
       this.$modal =this.$('#modal').modal({show: false});
        this.planPrepare();
      //   this.planTable();
     

      
        $(document).attr("title","GLR - Gestione Logistica Remota | "+this.language.type+" | "+this.language.lang);
        return this;
    },
    destroy_view:function(){
       
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.planningView=null;
        //  document.location.href = this.language.lang+"/logout";
    }
    

});
return app.views.gap_pma;
});





