require(['app','bootbox'], function(app,bootbox){
app.views.planning=Backbone.View.extend({
    
    initialize:function(){
        this.$modal;
       
      
        this.$pmaPillColl = new app.collections.pmaPills(); 
        
        console.log("initializing planning view")
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
        "click .pill":"subPill",
        "click-row.bs.table":"popup_note",
      
       // "click #del.submit":"showModal",
       
        
    },
    popup_note:function(e, row, $element,options){
       // console.log(e,row,$element,options,$element.attr('data-index'));
       $note=app.global.nick_array.pma[$element.attr('data-index')].note;
       if($note===null){$note='';}
          this.$("#modalF").empty();
                     this.$("#modalF").append( 
                    
                    '<div class="form-group col-lg">'+
                        '<label for="nota">Nota PMA</label>'+
                        '<textarea rows="4"  class="form-control" name="nota" id="nota" >'+$note+'</textarea>'+
                       
                    '</div>');
             this.$modal.find('.modal-title').text('Nota della PMA n°'+(Number($element.attr('data-index'))+1));
             this.$modal.find('.submit').hide();
            this.$modal.modal('show');
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
    subPill:function(ev){//update
         console.log(ev);
        console.log(Number(ev.target.attributes[0].value));
        this.$pmaPill = this.$pmaPillColl.get(Number(ev.target.attributes[0].value));//.attributes["nota"];
        var pill=this.$pmaPill;
        var  nome=pill.get('label'); 
        var  nota=pill.get('nota'); 
        var  data=pill.get('data'); 
        var $yearM =moment(data).format('YYYY-MM');
          
        // alert('nota: '+book.attributes.nota);
        this.$("#modalF").empty();
        this.$("#modalF").append(
           '<div class="form-group col-lg-4">'+

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
       '</div>'); 
        this.$("#del").remove();//..nel caso ci fose già
        this.$modal.find('.submit').text('Update');
        this.$modal.find('.submit').show();
        this.$(".modal-footer").append('<button type="button" id="del" class="btn btn-danger pull-left submit"><i class="fa fa-trash"></i> Delete</button>');
        this.$modal.find('.modal-title').text(nome);
       
        this.$modal.find('input[name="dataTemp1"').val(moment(data).format('DD/MM/YYYY'));
        this.$modal.find('input[name="nota"').val(nota);
        $startDate= moment($yearM+'-01').startOf('month').format('DD-MM-YYYY');
        $lastdate=moment($yearM+'-01').endOf('month').format("DD-MM-YYYY"); 
       
        $('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            language: "it"
        });
        $('#datetimepicker1').datetimepicker('setStartDate',$startDate);
        $('#datetimepicker1').datetimepicker('setEndDate',$lastdate); 
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
        if ( ev.target.classList.contains('drop')) {
            ev.target.style.opacity = "";
           //  var $pmaPill = new app.models.pmaPill(); 
            console.log( ev.target.classList);
            var data = dragged.cloneNode(true);
            console.log(data);
            this.$pmaPill = new app.models.pmaPill(); 
            console.log(this.$pmaPill);
         
            this.$pmaPill.set('tipoPill',data.getAttribute("id"));
            this.$pmaPill.set('idCell',ev.target.getAttribute("id")); 
            this.$pmaPill.set('label',data.innerText);
            this.$pmaPill.set('idmonth',Number(ev.target.getAttribute('month')));
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
         this.$("#modalF").empty();
                     this.$("#modalF").append( 
                        '<div class="form-group col-lg-4">'+

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
                    '</div>');
          this.$("#del").remove();//..nel caso ci fose già          
        console.log(this.$pmaPill);           
        console.log(row);
        var $year =this.$('#year').val();
        
       if(!this.$pmaPill){
          console.log(Number(row.target.attributes[0].value));
        
    }else{
        console.log(row.getAttribute('idpma'));
        //console.log(row.getAttribute(row.firstElementChild.idx));
        // row['tipoPill']=row.firstElementChild.idx;//label
        nome=this.$pmaPill.get('label');//
        //nome=data.getAttribute('id');
        mese=this.$pmaPill.get('idmonth');
        //pma=row.getAttribute('idpma');
        //console.log(mese,nome,pma);
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
        }  
       }
        this.$modal.find('.modal-title').text(nome);
        
       
        $startDate= moment($year+'-'+mese+'-01').startOf('month').format('DD-MM-YYYY');
        $lastdate=moment($year+'-'+mese+'-01').endOf('month').format("DD-MM-YYYY"); 
       
        $('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            language: "it"
        });
        $('#datetimepicker1').datetimepicker('setStartDate',$startDate);
        $('#datetimepicker1').datetimepicker('setEndDate',$lastdate); 
           this.$modal.find('.submit').text('Add');
          this.$modal.find('.submit').show();
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
        //var dataT=moment(data.dataTemp1, ["MM/DD/YYYY", "YYYY-MM-DD"]);//moment(data.dataTemp1).format('YYYY-MM-DD');
        //var dataT1=moment(data.dataTemp1).valueOf();
         var dataT=moment(data.dataTemp1, 'DD/MM/YYYY').format('YYYY-MM-DD');//moment(dataT1).format('YYYY-MM-DD');
        this.$pmaPill.set(data);
        this.$pmaPill.set('data', dataT);
       this.$pmaPill.set('data', dataT);
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
       //app.routers.rmaRouter.prototype.planning();
                   
                }, 
                error: function(model,errors){ 
                    console.log('Failed to save model '+model);
                      console.log(model);
                    
                }
        };
        options.private=true;
        options.type='POST';
        options.url=app.global.json_url + 'rma_pma/planning/';
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
    planTable: function(){
        
        var $selyear=this.$("#year");
        var $selServizio=this.$("#servizi");
        var $planData;
        var $month=[];
        var $monthx;
        var d = new Date();
        var n = d.getFullYear();
        var m = d.getMonth();
        var langx=this.language.lang;
        var $person=app.global.tokensCollection.first().get("id_person");
        var that=this;
        $.each(app.global.nick_array.servizi, function(i, value) {
            $selServizio.append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
        });
        $selServizio.val(app.global.nick_array.servizio);
        $selServizio.change(function (){
            console.log(app.global.nick_array.servizio);    
            app.global.nick_array.servizio= $selServizio.val();
            console.log(app.global.nick_array.servizio); 
            app.routers.rmaRouter.prototype.planning();
        });
        
       
        console.log( that);
        jsonObj = {};
        jsonObj.person = $person
        jsonObj.action = "list";    
        jsonObj.type = "pma";
        jsonObj.year = app.global.nick_array.anno;
        jsonObj.servizio = app.global.nick_array.servizio;
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
            url:app.global.json_url+'rma_pma/planning/',
            type:'post',
            headers : this.headerJson(),
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                $selyear.empty();
                $aa=$mydata.anni;
                $.each($mydata.anni, function(i, value) {
                    $selyear.append('<option value="'+value.anno+'">'+value.anno+'</option>'); 
                });
                $selyear.val(app.global.nick_array.anno);
                $planData=$mydata;
                that.$('#pmaCount').empty();
                that.$('#pmaCount').text("Ci sono "+$planData.pma.length+" PMA");
                that.$pmaPillColl.reset();
                for(i=0;i<$planData.pmaData.length;i++){
                    that.$pmaPillColl.add($planData.pmaData[i]);
                }
                console.log(that.$pmaPillColl); 
           
                 app.global.nick_array.pma=$planData.pma;
                 console.log(app.global.nick_array); 
                month();
            }
        });
        $selyear.change(function (){
            console.log(app.global.nick_array.anno);    
            app.global.nick_array.anno= $selyear.val();
            console.log(app.global.nick_array.anno); 
            app.routers.rmaRouter.prototype.planning();
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
                    $.each($monthx, function(key, val){
                        $selmonth.append('<option value='+(key)+'>'+ val.month+ '</option>');
                    });
                    $selmonth.prop('selectedIndex', m);

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
                rows=$planData.pma.length;
                console.log($monthx+"=month cells="+cells+" rows="+rows);
                //-------------1 colonna  tipologie
                columns.push({

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
                //---------------dalla quinta colonna i mesi contemplati-----------------------
                // aggiungo 4 perchè nelle prime  4 colonne ci sono i nomi composti

                for (i = 0; i < cells; i++) {
                    //----------creo array head colonne----------------------------------------------------

                    columns.push({
                        //events: operateEvent,
                        // field: 'field' + String(i+1)+"-"+$user[0]['days'][i]['kw'],
                        field: i+4,
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
                    row[0] =$planData.pma[i].tipologia;//nome tipologie

                    //----------------popolo la seconda colonna con  competenza-------------      
                    row[1] =$planData.pma[i].competenza;

                    //----------------popolo la terza colonna con  ditta --------------      
                    row[2] =$planData.pma[i].ditta;

                    //---------------- popolo la quarta colonna con periodicita--------------      
                    row[3] =$planData.pma[i].periodicita;

                    //---------------popolo le altre celle----------------------------------------------------------------

                    for (j = 0; j < cells; j++) {
                        
                        row[j+4]='';
                    }

                    data.push(row);
                }//for (i = 0; i < rows; i++) {

                // console.log(columns);
            
                $el.bootstrapTable('destroy').bootstrapTable({
                    // height:450,
                    columns: columns,
                    data: data,
                    // fixedColumns: true
                // }).done(popcell());
            });
                popcell();           
            //end build table
        }
        function cellStyle1(value, row, index, field) {
           $note=app.global.nick_array.pma[index].note;
            if($note!==null && $note!==""){$style="background-color:#FBE3DE;"}else{$style=''}
            return {
                classes: '" id="R'+(Number(index)+1)+'C0'+field+'" style="'+$style+'"  idPma="'+$planD[index]['id']
            };
            return {};
        }     
        function cellStyle2(value, row, index, field) {

                    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+(field-3)+'" month="'+(field-3)+'" idPma="'+$planD[index]['id']//dato che ci sono 4 colonne prima dei dati e per iniziare con la prima colonna dati =1 per avere cosi la prima colonna di dati!
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
             for(i=0;i<$planD.length;i++){
               // console.log($planD[i].id);
               // console.log($planD[i].month);
                that.$pmaPillColl.each(function(pill) {    //ciclo per ogni pill 
               // console.log(pill);  
                  
               // console.log('i='+i+'->mese='+pill.attributes.idmonth+' && '+$planD[i].id+'=='+pill.attributes.id_rma_pma); 
                  
                if( $planD[i].id==pill.attributes.id_rma_pma){
                   var dayOf =moment(pill.attributes.data ,'YYYY-MM-DD').format('DD');  
                    var cellp='#R'+(i+1)+'C'+pill.attributes.idmonth;
                    var c1 =  '<label id="'+pill.attributes.id+'" tipo_pill="'+pill.attributes.tipo_pill+'" class="lbl '+pill.attributes.tipo_pill+' pill"   >'+pill.attributes.label+'<span id="badge'+pill.attributes.id+'" class="badge">'+dayOf+'</span></>';
                    this.$(cellp).append(c1);
                  //  console.log(c1);   
                }
                  
                    
                }); 
                    
                }
           
               
               
               
            }
            c2=' <button href="'+$planData.fileName+'.pdf" title="Pdf" type="button" class="btn " id="excel"  download> </i><img src="./css/img/pdf.png"  width="20px"/></button>';
   
            that.$("#downFile").empty();  
            that.$("#downFile").append(c2); 
            console.log(c1);
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
         console.log(app.global.nick_array);
        var $year;
        var $dayP;
        var $monthx;
        var $dateD=[];
        var $planD=[];
       
        var langx=this.language.lang;
      
       this.$modal =this.$('#modal').modal({show: false});
        var jsonObj = {};
        var  uurl=app.global.json_url+'rma_pma/calenda/'

        //------------------dropdown  work---------------------------------------------------------------------
        var $selwork=this.$("#work")
      //  var $btnServ=this.$("#btnServizio");
       // $btnServ.html(app.global.nick_array.servizioCP);
        

        //-------------------------------year------------------------------------------
        var $selyear=this.$("#year");
        var d = new Date();
        var n = d.getFullYear();
        var m = d.getMonth();
       
       this.planTable();
        //--------------------------------------------------------------------------------------------------
       

        function planTable_($planData) {
            
            console.log($planData);
            var $el, cells, rows;
            var i, j,row,  ndrop, res;
            var columns = [];
            var data = [],        
            $el= this.$('#table');
            cells=$monthx.length;
            $planD=$planData.pma;
            rows=$planData.pma.length;
            console.log($monthx+"=month cells="+cells+" rows="+rows);
            //-------------1 colonna  tipologie
            columns.push({

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
            //---------------dalla quinta colonna i mesi contemplati-----------------------
            // aggiungo 4 perchè nelle prime  4 colonne ci sono i nomi composti

            for (i = 0; i < cells; i++) {
                //----------creo array head colonne----------------------------------------------------

                columns.push({
                    //events: operateEvent,
                    // field: 'field' + String(i+1)+"-"+$user[0]['days'][i]['kw'],
                    field: i+4,
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
                row[0] =$planData.pma[i].tipologia;//nome tipologie

                //----------------popolo la seconda colonna con  competenza-------------      
                row[1] =$planData.pma[i].competenza;

                //----------------popolo la terza colonna con  ditta --------------      
                row[2] =$planData.pma[i].ditta;

                //---------------- popolo la quarta colonna con periodicita--------------      
                row[3] =$planData.pma[i].periodicita;

                //---------------popolo le altre celle----------------------------------------------------------------

                for (j = 0; j < cells; j++) {
                    row[j+4]='';
                }

                data.push(row);
            }//for (i = 0; i < rows; i++) {

            // console.log(columns);
            $table0.bootstrapTable('destroy').bootstrapTable({
                // height:450,
                columns: columns,
                // data: data,
                // fixedColumns: true
                //}).done(popcell());
            });
            $el.bootstrapTable('destroy').bootstrapTable({
                // height:450,
                columns: columns,
                data: data,
                // fixedColumns: true
                //}).done(popcell());
            });
                         
        }//build table

        function cellStyle1(value, row, index, field) {

            return {
                classes: '" id="R'+(Number(index)+1)+'C0'+field+'"  idPma="'+$planD[index]['id']
            };
            return {};
        }     
        function cellStyle2(value, row, index, field) {

                    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+(field-3)+'" month="'+(field-3)+'" idPma="'+$planD[index]['id']//dato che ci sono 4 colonne prima dei dati e per iniziare con la prima colonna dati =1 per avere cosi la prima colonna di dati!
                         };

                    return {};
                }  
        
        //----------evento cambio anno------------------------------------
 
        this.$('#year').change(function (e) { 

            $year=$("#"+e.target.id).val();
            console.log($year+','+$month);
            $dayP=dayYear($year,$month);
            dateDd($year,$month, $dayP);   


        });

        //-----------evento cambio mese----------------------------------------------
        this.$('#month').change(function (e) { 

            $month=Number($("#"+e.target.id).val())+1;
            console.log($year+','+$month);
            $dayP=dayYear($year,$month);
            dateDd($year,$month,$dayP);  

        });
        //----------------------------------------------------------------------------------------------------------
        function dateDd_($year,$month,$dayYear){
            console.log("$year="+$year+$month+$dayYear);
            //var API_URL = app.global.json_url + '/json/plan/days?year=2017';
            //var API_URL = app.global.json_url + '/json/plan/days?year='+$year+'&'+($month-2)+'&'+$dayYear;
            API_URL = app.global.json_url + 'planning/days/'+$year+'/'+$month+'/'+$dayYear+'/';
            console.log("API_URL="+API_URL);
          var request1=  $.ajax({
               headers : $headers,
                url: API_URL,
                type:'get',

                dataType : 'text',
                success: function (datap) {

                    var $mydatax =JSON.parse(datap);

                    console.log("API_URL="+API_URL);
                    $dateD=$mydatax.data;
                     tablestart();
                    

                },
                error: function () {

                    console.error("Date  error!!!");
                }
            }); 
            $.when(  request1.done(function() {
                console.log("request1")
              
            }));
            
        }
        //--------------------giorni periodo anno selezionat0----------------------------------------------------------------

        function dayYear($year,$month) {
            var d0 = new Date($year,String(Number($month)-1),0); //anno,mese,giorno (2017,0,1) -> 1483228800000 
                                          //Returns the number of milliseconds since midnight Jan 1 1970, and a specified date
            var d1 = new Date($year,String(Number($month)+0),0);
             $dayP = Math.round(Math.abs((d1.valueOf()-d0.valueOf())/864e5));
             //dateArr=addDay(d0,$dayP);

            console.log('-1 month='+d0+'  '+' +1 month= '+d1+' days='+$dayP+' $month='+$month);

            return    $dayP;


        }
        //---------------------------------------------------------------------------------------------------------------
        function addDay(d0,days) {
            dateArr=[];
            var d = Date.parse(d0); //anno,mese,giorno (2017,0,1) -> 1483228800000 
            for (i=0;i<days;i++){
                var  dayd=new Date( d + 864e5 * i); // 1 giorno=86.400.000 millisecondi

                dateArr.push({
                    data0: dayd.valueOf()
                })
                  // console.log(i+"day: "+dateArr[i].data0)
            }

           // console.log("day: "+dateArr[0].index+" inmilli="+dateArr[0].data0)
           //cityy();
            return   dateArr;
        }
        //-------------------------------------------------------------------------------------------------------
        var $usertt = [];
        var $user = [];
        var $infoT=this.$('#info');
        var $CityT=this.$('#city');
        var $table = this.$('#table');
        var $table0 = this.$('#table0');
        var  days=120;

        var dateArr=[];
        var $info;
        var  operateEvent;
        var $dayWeek=0;

    
        //dateD($year);

        // tableinfo($infoT);
        if(app.global.tokensCollection.first().get("nvbr")==='3'){
        //tableday($CityT);
    }

        // prepareUser()
        //   tablestart();
 
        //------------------tabella left typeDay---------------------------------------------------------------------
        //------------------dropdown     typeDay---------------------------------------------------------------------

        var $city = [];
        function tableday_($el) {
            var API_URL_day = app.global.json_url + '/planning/days/type/';
            $.ajax({
                headers : $headers,
                url: API_URL_day,
                type:'get',

                dataType : 'text',
                success: function (datap) {
        
                    var $mydatax =JSON.parse(datap);
                    //console.log("mycity="+$mydatax['data'][0]['city']);
                    $city=$mydatax.data;
                    loadTypeDay();
                },
                error: function () {
                   
                    console.error("day  error!!!");
                }
            });


            function loadTypeDay() {
                var cells=1;
                var rows=$city.length;
                var i, j, row, columns = [], data = []; 
                 stickyHeaderOffsetY = 0;

                columns.push({
                    field: 'field0',
                    title: 'Giorno \n tipo',

                    align: 'center',
                    valign: 'middle',
                });
         
                for (i = 1; i < rows+1; i++) {
                    row = {};
                    if($city[i-1].name==null){ }else{
                        row['field0'] ='<label id="TypeDay'+$city[i-1].shortDescription+'"  cid="'+$city[i-1].shortDescription+'" flag="1"  class="lbl '+$city[i-1].shortDescription+'"  draggable="true"  >'+$city[i-1].shortDescription+'</>';
                      // $select.append('<option value='+$city[i-1].id+'>' + $city[i-1].city+ '</option>');
                        data.push(row);
                    }
                }
                if ( $('.navbar-fixed-top').css('height') ) {
                    stickyHeaderOffsetY = +$('.navbar-fixed-top').css('height').replace('px','');
                }

                $el.bootstrapTable('destroy').bootstrapTable({
                    columns: columns,
                    data: data,
                    stickyHeader: true,
                    stickyHeaderOffsetY: stickyHeaderOffsetY + 'px'
                   // height: 250
                });
    
  
            }
        } //tableday()
        function formatter2(value, row, index) {


    var aas=this.fieldIndex;
    // console.log("aas="+aas+" index="+index);

    // console.log($user[index]['days'][aas]['infcit']+"=aas="+aas+" index="+index+" $user[index]['days'][aas]['selection']="+$user[index]['days'][aas]['selection']);

     // if ($user[index]['days'][aas]['selection'] ===0) {
        // console.log($user[index]['days'][aas]['selection']+"=sel aas="+aas+" index="+index);
          return '<td id="R'+String(index+1)+'C'+String(aas+1)+'" class="drop"></td>';


        return {};
    }  
        function tablestart(){
            var API_URL_user = app.global.json_url + 'planning/users/';

            $.ajax({
                headers : $headers,
                url: API_URL_user,
                type:'get',
                dataType : 'text',
                success: function (datap) {
                    var $mydatax =JSON.parse(datap);
                    $user=$mydatax.data;
                    console.log("esssi:"+$user[0]);
                    loadR();
                },
                error: function () {
                    console.error("user  error!!!");
                }
            });
            function loadR(){
                // var $table=this.$('#table');
                var $mydata=[];
                var columns = [],
                row1=[],
                data1 = [], 
                data = [];
                 //  buildTable($table, 120 , $user.length);
                $.when(  buildTable($table, $dateD.length , $user.length)).done(function() {
                    console.log("table fine");
                    console.time('popcell');
                    popcell();
                    console.timeEnd('popcell');
                });
                function buildTable($el, cells, rows) {
                    var i, j,row,  ndrop, res;
                    //-------------1 colonna  dipendenti/user
                    columns.push({

                        // field: 'field0-0',
                        field: 0,
                        title: '<label class="lbl hdate" >User</>',
                        align: 'center',
                        valign: 'middle',
                        cellStyle: cellStyle1
                    });
                    //---------------dalla seconda colonna i giorni contemplati-----------------------
                    // aggiungo 1 perchè nella prima colonna ci sono i nomi 

                    for (i = 0; i < cells; i++) {
                        //----------creo array head colonne----------------------------------------------------
                        columns.push({
                            //events: operateEvent,
                            // field: 'field' + String(i+1)+"-"+$user[0]['days'][i]['kw'],
                            field: i+1,
                            title:'<label class="lbl hdate" >'+$dateD[i]['dateL']+'</>',
                            align: 'center',
                            //  formatter:formatter2,
                            // class: 'drop',
                            cellStyle: cellStyle2, 
                            valign: 'middle;" date="'+$dateD[i]['date']+'" id="R0C'+String(i+1)+'"'
                            //  sortable: false
                        });
                    } // for (i = 0; i < cells; i++) {

                    //----------------popolo la prima cella con il nome user di tutta la prima colonna--------------      

                    for (i = 0; i < rows; i++) {
                        row = {};

                        // row['field' + 0] =$user[i-1].lastName+", "+$user[i-1].firstname;//nome dipendenti
                        row[0] ='<label class="lbl user" >'+$user[i].label+'</>';//nome dipendenti


                        //---------------popolo le altre celle----------------------------------------------------------------

                        for (j = 0; j < cells; j++) {
                               row[j+1]='';
                        }

                        data.push(row);
                    }//for (i = 0; i < rows; i++) {

                    // console.log(columns);
                    $table0.bootstrapTable('destroy').bootstrapTable({
                        // height:450,
                        columns: columns,
                        // data: data,
                        // fixedColumns: true
                        //}).done(popcell());
                    });
                    $el.bootstrapTable('destroy').bootstrapTable({
                        // height:450,
                        columns: columns,
                        data: data,
                        // fixedColumns: true
                        //}).done(popcell());
                    });
                   
                    
                    
                }//build table
                //-----------Gestione------Font piu grandi---font meno grandi----di tutto il documento-------------------------------------------
                this.$('#apiu').click(function () {resizeText(1);});
                this.$('#ameno').click(function () {resizeText(-1);});

                function resizeText(multiplier) {
                    if (document.body.style.fontSize == "") {
                        document.body.style.fontSize = "1.0em";
                    }
                    document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.2) + "em";
                }

                //-----------Gestione------Font piu grandi---font meno grandi----della tabella a destra-------------------------------------------
        
                var x = document.getElementById("table");

                this.$('#tapiu').click(function () {resizeTextT(1);});
                this.$('#tameno').click(function () {resizeTextT(-1);});

                function resizeTextT(multiplier) {
                    if (x.style.fontSize == "") {
                        x.style.fontSize = "1.0em";
                    }
                    x.style.fontSize = parseFloat(x.style.fontSize) + (multiplier * 0.2) + "em";
                }

                //---------------------------------------------------------------------------
                //----------------------------------------------------------------------------------------------
                // formatto le celle tipo RXCX a partire dalla colonna 1 e rigo 1, cioè escludo intestazione
                // colonne e intestazione righe

                function cellStyle2(value, row, index, field) {

                    return {
                        // classes: 'drop"  id="R'+(Number(index)+1)+'C'+field.substr(5)
                        classes: 'drop" id="R'+(Number(index)+1)+'C'+field
                         };

                    return {};
                }  


                function cellStyle1(value, row, index, field) {

                      return {


                            classes: '" id="R'+(Number(index)+1)+'C0"  idx="'+$user[index]['id']
                            };
                      return {};
                }  

//-------------------------se ci sono celle già valorizzate----------------------------------------------
 

                function popcell() {    //popolo le celle valorizzate
                    console.log("date="+$dateD[0]['date']);
                    var kw=0;
                    var aa=0;
                    var $mydatax;
                    var uidx='';
                    var columnsx = [],
                        datax = [],
                        rowx=[];
                   // console.log("date="+$dateD[0]['date']);
                    var start;
                    

                    var end;
                    var date='';
                    var dateIndx=null;
                    var infoId='';
                    var selection='';
                    var cityId='';
                    var deferr=0;
                   // console.log( " dateS="+start +" dateE="+end  );//"data="+rtstart+" end="+end);

                   // $.each($user, function(i, value) { 
                    start=$dateD[0].date;
                   end= $dateD[$dateD.length-1]['date'];

                    for (var i = 0; i < $user.length; i++) {        // ciclo per tutti gli operai
                        rowx = {};  
                        uidx=$user[i].id;   //id dipendenti
                        var start_ajax = new Date().getTime();
                        var  urlpop=app.global.json_url + 'planning/days/list/'+uidx+'/'+start+'/'+end+'/';
                       // console.log( "each user", uidx, " at ", start_ajax );//"data="+rtstart+" end="+end);

                        var request = $.ajax({
                            headers : $headers,
                            url:urlpop,
                            async:false});
                        $.when(  request.done(function(datap) {

                            var $mydata =JSON.parse(datap);
                              $mydatax = $mydata.data;
                           // console.log( "jmposto deferred=0 di uid="+uidx);

                             daycell($mydatax);
                             var end = new Date().getTime();
                             console.log('time populate user: '+i+" - ", ( end - start_ajax) , "ms");                 
                        }));

   
                        /*
                           $.get(urlpop).done(function(datap){
                             var $mydata =JSON.parse(datap);
                             var $mydatax = $mydata.data;


                               daycell($mydatax);
                              }); //$.get  */
         
                        function daycell($mydatax) {   
                            //console.log( " date="+$mydatax.data[i]['date'] +" infoId="+$mydatax.data[i]['infoId']  );


                            // $.each($mydatax, function(j, value) { 
                            for (var j = 0; j < $mydatax.length; j++) {    //ciclo per ogni operaio tutti i giorni

                                dateIndx  =j;
                                date  =$mydatax[j]['TURN_DAY'];
                                infoId  = $mydatax[j]['infoId'];
                                selection =$mydatax[j]['selection'];
                                typeDay =$mydatax[j]['TYPE_DAY'];
                                kw=$mydatax[j]['kw'];
                                var cellp='#R'+(Number(i)+1)+'C'+(Number(j)+1);

                                var medt = new Date().getTime();
                                if(date===this.$(cellp).attr('date')){
                                  
                                    if(typeDay !=null){
                                        var c1 =  '<label id="typeDay'+typeDay+'" cid="'+typeDay+'" idx="'+typeDay+'" flag="1"  class="lbl '+typeDay+'"  draggable="true"  >'+typeDay+'</>';
                                        this.$(cellp).append(c1);
                                    }//if(typeDay !=null)
                                }
                            }
                        }
                    }
                } //popcell()



//-------------------------------------------------------------------------------------------------


 
//---------------------------------------------------------------------------


    
//------------------------------------------------------------------------------------------------------
     } // loadR() 
        } // tablestart() right

        //---------------------------------------------------------------------------------------------------
        if(app.global.tokensCollection.first().get("nvbr")==='3'){
            var dragged;
          

         
            /*
          document.addEventListener("mousedown", function( ev ) {

          if (  ev.shiftKey) {
             event.preventDefault();
        //console.log("mousedown+ shift+down");
          if ( ev.target.hasChildNodes() ) { 


                        var action="delete";
                        var uid= ev.target.parentNode.firstChild.getAttribute('idx');
                        var iid= ev.target.childNodes[0].getAttribute('iid');
                       var cid= ev.target.childNodes[0].getAttribute('cid');
                        var start = ev.target.getAttribute('date');
                    //  console.log("action="+action+" iid="+iid+" cid="+cid+" start="+start+" uid="+uid);
                      sendND(action,iid,cid,start,uid);
                     ev.target.removeChild( ev.target.childNodes[0] );
                          }

          }
        }, false);

            */
           

            var $iot=0;
           

          
          

        }//if nvb3=3
        //---------------------------------------------------------------------------

        function sendND(action,typeDay,Data,operaio) {      //invio nuovi dati al server
            // console.log("nuovi dati da inviare al server: action="+action+" "+iidcid+" Data="+Data+" UID="+operaio)

            urlj=  app.global.json_url + 'planning/select/'+action+'/'+operaio+'/'+Data+'/'+typeDay+'/';
            $.ajax({
                headers : $headers,
                url:urlj ,
                type:'get',
                crossDomain : true,
                success: function () {
                //showAlert1(($uid ? 'Update' : 'add') + ' TourYear item successful!', 'success');
                },
                error: function () {
                // showAlert1(($modal.data('id') ? 'Update' : 'add') + ' item error!', 'danger');
                }
            }); 
        } //sendND
       

       
      
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
return app.views.planning;
});





