require(['app','bootbox'], function(app,bootbox){
app.views.gap_adm = Backbone.View.extend({
       
    initialize:function(){
         console.log("initializing gap_management")
        console.log(app.global.nick_array)
         Tipo = Backbone.Model.extend();
         Tipi = Backbone.Collection.extend({
            model: Tipo
          });
          Car = Backbone.Model.extend();
         Cars = Backbone.Collection.extend({
            model: Car
          });
        
    },

    events:{
        "click .set":"set",
        "click #editkm":"editKM",
        "click #fornitori":"setFornitori",
        "click #assicurazioni":"setAssicurazioni",
        "click #tipologie":"setTipologie",
        "click .annulla":"set"
       
    }, 
   
    headerJson: function(){
        $headers = {
            "X-Requested-With": "XMLHttpRequest",
           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        return $headers;
    },
    set:function(e){
       var that=this;
          console.log(e);
        var tipo=e.currentTarget.dataset.tipo;
        var lblTipo='';
        console.log(e);
        console.log(tipo);
        switch (tipo){
            case 'auto':
                lblTipo='Autovetture';
                
                break;
             case 'fornitori':
                lblTipo='Fornitori';
               
                break;    
            default:
                lblTipo='??';
        }
    
       
       
        that.$(".subMain").empty();
        $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        jsonObj.action = "list";
        jsonObj.type = tipo;
        jsonObj.table = true;

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        console.log(this.headerJson);
        console.log($headers);
        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                $data=$mydata.data;
              
                set1($mydata);
            }  
        }); 
        function set1($data){
            $count=0;
            console.log($data);
          
           
      /*      Object.keys($data).forEach(function (item) {
   
                cars = new Cars();
           
           
                 $count+=1;
                           
                 
                   car= new Car({
                        description: item.description,
                        type:item.type,
                        targa: item.targa,
                        accordion:$count,
                        valid:item.valid
                      });
                console.log(car)  ; 
                 cars.add(car);
            
             
             
             });*/
                     
                
      $varForm='<div class="panel panel-default">'+
                    '<div class="panel-heading" role="tab" id="heading">'+
                        '<h4 class="panel-title">'+lblTipo+
                                     ' <span class="badge">'+$data.data.length+' </span>'+
                          
                        '</h4>'+
                    '</div>'+
                    '<div id="collapse" class="panel-collapse" role="tabpanel" aria-labelledby="heading">'+
                        '<div class="panel-body">'+
                            '<input type="hidden" class="form-control" name="id" id="id">'+
                            '<div id="autov">'+

                                '<p class="toolbar">'+
                                    '<button type="button" class="btn btn-default contr-Plus"  data-tipo='+tipo+'  title="Add '+lblTipo+'">Add '+lblTipo+'</button>'+ 

                                    '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table" > </table>'+

                            '</div>'+

                        '</div>'+
                    '</div>'+
                '</div>';
            that.$(".subMain").append($varForm);
            $.each( $data.tab, function( key, value1 ){
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
            that.$("#table").bootstrapTable('destroy');
            that.$("#table").bootstrapTable({
                                    data: $data.data,
                                    columns: $data.tab,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                  
           
           
             function actionFormatter() {
        
                                return [
                                    '<a class="update" href="javascript:"   data-accordion='+$count+'  title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>&emsp;&emsp;',
                                    '<a class="remove" href="javascript:" data-accordion='+$count+' title="Delete Item"><i class="glyphicon glyphicon-remove-circle"></i></a>'
                                     ].join('');
                            }    
       
            
            that.$('.contr-Plus').click(function (event) {
                console.log(tipo);
              
                 switch (tipo){
            case 'auto':
               
               that.editAuto(event);
                break;
             case 'fornitori':
               
               that.editFornitore(event);
                break;    
            default:
              
        }

                 }); 
         
                                  
       
     
        } 
         window.actionEvents = {
    
    
            'click .update': function (e, value, $row,indx) {

                console.log("update");
                 switch (tipo){
            case 'auto':
                that.editAuto(e,$row,indx);
                
                break;
            case 'fornitori':
                  e.currentTarget.dataset.tipo='fornitori'
               that.editFornitore(e,$row,indx);
               
                break;    
            default:
               
        }
                
            },
            'click .remove': function (e, value, $row) {
                console.log($row);
                if (confirm('Sei sicuro di voler rimuovere '+$row.name+'?')) {
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                        "Content-Type": "application/json"
                    };
                    var jsonObj = {};
                    jsonObj.type=tipo;
                    jsonObj.action = "del";
                    jsonObj.id=$row.id;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);


                    $.ajax({
                        url:app.global.json_url + 'gap/',
                        type:'post',
                        headers : $headers,
                        data: jsonObj,
                        dataType : 'text',
                        success: function (json) {
                           var $mydata =JSON.parse(json);
                            //-------------------------------------------------------
                            if ($mydata.success){
                                 e.currentTarget.dataset.tipo=tipo
                                that.set(e);//
                               

                            }
                        }           
                    });

        }

            }
};
         
    },
   
  
    setTipologie:function(open){
        
        console.log("tipologie");
        console.log(open);
          
        var that=this;
        that.$(".subMain").empty();
        $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var jsonObj = {};
        jsonObj.action = "list";
        jsonObj.type = "types";

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        console.log(this.headerJson);
        console.log($headers);
        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                $data=$mydata.data;
                set($mydata);
            }  
        });
        
        function set($data){
              $count=0;
            $varForm='<div ><h2>Tipologie</h2></div>';
            that.$(".subMain").append($varForm);
            tipiColl = new Tipi();
           
            _.filter($data.data, function(num){return num.type=="type"}).forEach(function(item){
                 $count+=1;
                tipiditipo=_.filter($data.data, function(num2){return num2.type==item.name});
               
                 
                   tipo= new Tipo({
                        description: item.description,
                        type:item.type,
                        name: item.name,
                        accordion:$count,
                        tipiditipo:tipiditipo
                      });
                console.log(tipo)  ; 
                 tipiColl.add(tipo);
                
                    
               
                if($count==open){$collapse=''}else{$collapse='collapse'}
                      $varForm= '<div class="panel-group" id="accordion'+$count+'" role="tablist" aria-multiselectable="true">'+
                
                '<div class="panel panel-default">'+
                    '<div class="panel-heading" role="tab" id="heading'+$count+'">'+
                        '<h4 class="panel-title">'+
                            '<a role="button" data-toggle="collapse" data-parent="#accordion'+$count+'" href="#collapse'+$count+'" aria-expanded="true" aria-controls="collapse'+$count+'">'+
                                  item.description+' <span class="badge">'+tipiditipo.length+' </span>'+
                            '</a>'+
                        '</h4>'+
                    '</div>'+
                    '<div id="collapse'+$count+'" class="panel-collapse '+$collapse+'" role="tabpanel" aria-labelledby="heading'+$count+'">'+
                        '<div class="panel-body">'+
                            '<input type="hidden" class="form-control" name="id" id="id">'+
                            '<div id="'+item.name+'">'+

                                '<p class="toolbar">'+
                                    '<button type="button" class="btn btn-default contr-Plus"   data-accordion='+$count+'  title="Add tipo di '+item.description+'">Add tipo di '+item.description+'</button>'+ 

                                    '<span class="alert"></span>'+
                                '</p>'+
                                '<table id="table'+item.name+'" > </table>'+

                            '</div>'+

                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            that.$(".subMain").append($varForm);
              $.each( $data.tab, function( key, value1 ){
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
            that.$("#table"+item.name).bootstrapTable('destroy');
            that.$("#table"+item.name).bootstrapTable({
                                    data: _.filter($data.data, function(num){return num.type==item.name}),
                                    columns: $data.tab,
                                    showColumns:true,
                                    showRefresh:true,
                                    search:true
                                });
                  
            });
           
             function actionFormatter() {
        
                                return [
                                    '<a class="update" href="javascript:"   data-accordion='+$count+'  title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>&emsp;&emsp;',
                                    '<a class="remove" href="javascript:" data-accordion='+$count+' title="Delete Item"><i class="glyphicon glyphicon-remove-circle"></i></a>'
                                     ].join('');
                            }    
            that.$('.contr-Plus').click(function (event) {
                that.setModale(event);

                 }); 
         
                                  
            
     
        }
        window.actionEvents = {
    
    
            'click .update': function (e, value, $row) {

                console.log("update");
                that.setModale(e,$row);
            },
            'click .remove': function (e, value, $row) {
                console.log("remove");
                   if (confirm('Sei sicuro di voler rimuovere '+$row.name+'?')) {
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            var jsonObj = {};
            jsonObj.type='type';
            jsonObj.action = "del";
            jsonObj.id=$row.id;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);


            $.ajax({
                url:app.global.json_url + 'gap/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                   var $mydata =JSON.parse(json);
                    //-------------------------------------------------------
                    if ($mydata.success){
                       var button=$(e.currentTarget);
                        var accordion= 0;
                        accordion= button[0].dataset.accordion;
                        that.setTipologie(accordion);
                        
                    }
                }           
            });

        }

            }
};
      
        
        
    },
    setModale:function(e,row){
     if(typeof row==='undefined'){row=0}//perchè  uglufy in ecma6 non gestisce i valore di default per le funzioni!
    
        var button=$(e.currentTarget);
        var upCr="";
        var tipoNome="";
        var tipoDescrizione= "";
        var accordion= 0;
         var isNew=false;
        that=this;
        
        if(row===null){row=''};
        console.log("modale");
        console.log(row);
        if(row.id){
            console.log('upadatee'); 
            upCr="Edit";
            accordion= button[0].dataset.accordion-1;
            console.log(accordion);
            console.log(tipiColl.models[accordion]);
            isNew=false;
            
            tipoNome= tipiColl.models[accordion].attributes.name;
            tipoDescrizione=tipiColl.models[accordion].attributes.description; 
            console.log(tipoNome)  ;
            console.log(tipoDescrizione)  ;
            
        }else{
            console.log('createe');
            upCr="Add";
            accordion= button[0].dataset.accordion-1;
            console.log(accordion);
            console.log(tipiColl.models[accordion]);
          isNew=true;
            tipoNome= tipiColl.models[accordion].attributes.name;
            tipoDescrizione=tipiColl.models[accordion].attributes.description; 
            console.log(tipoNome);
            console.log(tipoDescrizione);
           
        }
        var modalF="";
        this.$('.modal-title').text(upCr+" tipo di "+tipoDescrizione);  
                     
        modalBody='<form id="mod'+tipoNome+'" >'+
                 '<input type="hidden" class="form-control" name="id" id="id"  value='+(row.id?row.id:'')+' >'+
                    '<div  class="row  alle">'+

                        '<div class="form-group col-lg-6">'+
                            '<label  >Nome</label>'+
                            '<input type="text" class="form-control" name="name" id="name"  value='+(row.id?row.name:'')+' >'+
                        '</div>'+

                        '<div class="form-group col-lg-6">'+
                            '<label  >Descrizione</label>'+
                            '<input type="text" class="form-control" name="descrizione" id="descrizione" value='+(row.id?row.description:'')+' >'+
                        '</div>'+

                       '<div class="form-group col-sm-2">'+

                           '<label for="valid">Valido</label>'+
                           '<input type="checkbox" class="form-control " name="valid" id="valid" '+(row.id?row.valid==='1'?'checked':'':'')+'>'+
                       '</div>';
                       if( tipoNome==="tipoContratto"){
                          modalBody+= '<div class="form-group col-sm-4">'+

                           '<label for="valid">Fornitore assicurazione</label>'+
                           '<select  class="form-control" name="fornitoreAssicurazione" id="fornitoreAssicurazione"   ></select>'+
                       '</div>';
                       }
                    modalBody+= '</div>'+

                  
               '</form >'
           ;
        modalFoot= '<div class="row">'+
                     '<div class="form-group col-lg-6">'+
                         '<a href="#" class="btn" data-dismiss="modal">Close</a>'+
                         '<button type="button" id="btn'+tipoNome+'" name="btn'+tipoNome+'" class="btn btn-primary submit ">Salva tipo '+tipoDescrizione+'</button>'+
                     '</div>'+ 
                 '</div>'
                ;
                
        this.$(".modal-body").empty();   
        this.$(".modal-body").append( modalBody);
        this.$(".modal-footer").empty();   
        this.$(".modal-footer").append( modalFoot);
        if( tipoNome==="tipoContratto"){
        var $selfornitoreAssicurazione=this.$("#fornitoreAssicurazione");
          
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "fornitoriAssicurazione";
            

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            console.log(app.global.json_url + 'gap/');
            console.log($headers);
            $.ajax({
                url:app.global.json_url + 'gap/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                     $mydata =JSON.parse(json);
                    $selfornitoreAssicurazione.empty();
                    $aa=$mydata.data;
                   
                    $selfornitoreAssicurazione.append('<option value="0"></option>');
                    $aa.forEach(function(item){
                        console.log(item);
                        $selfornitoreAssicurazione.append('<option value="'+item.id+'">'+item.name+'</option>');
                        
                       

                    });
                     if(isNew){
                            parseInt($selfornitoreAssicurazione.val());//
                        }else{
                            $selfornitoreAssicurazione.val(parseInt(row.fornitore_assicurazione));//seleziona toscana

                        }
                   
                },

            });
               
             
        }
        this.$("#mod"+tipoNome).validate(); //sets up the validator
       
        $("input[name=\"descrizione\"]").rules( "add", {

            required: true,
            //number: true,
            // minlength: 2,

            messages: {

                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        $("input[name=\"name\"]").rules( "add", {
            required: true,
            //number: true,
            // minlength: 2,

            messages: {
                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        this.$("#modal").modal('show'); 
        //qui

        this.$('#btn'+tipoNome).click(function(e) {//add dalle modali
            
            if($("#mod"+tipoNome).valid()){

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'gap/';

                var jsonObj ={};

               //jsonObj.action = row.id?"update":"add";
               // jsonObj.type = "type";

               // jsonObj.person = app.global.tokensCollection.first().get("id_person");
               // jsonObj = JSON.stringify(jsonObj);
                var  form_data=new FormData($('#mod'+tipoNome)[0]) ;                     
               form_data.append("action",row.id?"update":"add");
               form_data.append("typed",tipoNome);
               form_data.append("type","type");
               form_data.append("person",app.global.tokensCollection.first().get("id_person"));
               
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                   // "Content-Type": "application/json"
                };
                
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,

                       // data :  jsonObj,
                       // dataType : 'text',
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
                                console.log("ok",accordion);

                                that.setTipologie(accordion+1);//perchè finora lo usavo come indice della collezione

                                }
                            }
                        });


                    $("#modal").modal('hide'); 
                }else{
                console.log("btnAlle invalid");  
            }


            });  

      
  },
    editAuto:function(e,row,index){
        if(typeof row==='undefined'){row=0}//perchè  uglufy in ecma6 non gestisce i valore di default per le funzioni!
        var tipo='';
        var upCr="";
        var tipoNome="";
        var $doc;
        var tipoDescrizione= "";
        var $enabled= "";
        var isNew=false;
        var $tipoPdf='';
        that=this;
      
        
        console.log("edit auto rowId="+row.id);
        if (typeof row.id !== 'undefined') {
       // if(row.id){
            console.log(row);
            console.log(index);
            console.log('upadatee'); 
            upCr="Edit";
            isNew=false;
            console.log(row.targa);
            
            $enabled="";
            
            
        }else{
            console.log('createe');
            upCr="Add";
           
            isNew=true;
            tipo=e.currentTarget.dataset.tipo;
          
             $enabled="disabled";
            console.log(tipo);
          
           
        }
        $varForm="";
        console.log(row.id?row.modello:'');
        console.log(row.id?row.modello?row.modello:'':'');
        $varForm='<div class="panel panel-default">'+
                    '<div class="panel-heading" role="tab" id="heading">'+
                        '<h4 class="panel-title">'+upCr+' autovettura</h4>'+
                    '</div>'+
                    '<div id="collapse" class="panel-collapse" role="tabpanel" aria-labelledby="heading">'+
                        '<div class="panel-body">'+
                            
                            '<form id="modAuto" >'+
                                '<input type="hidden" class="form-control" name="id" id="id"  value="'+(row.id?row.id:'')+'" >'+
                                '<div class="row col-lg-12">'+
                                    '<div class="panel panel-default ">'+
                                        '<div class="panel-heading">'+
                                            '<h1 class="panel-title">Autovettura</h1>'+
                                        '</div>'+
                                        '<div class="panel-body ">'+
                                              '<div class="row col-lg-12">'+
                                                '<div class="form-group col-lg-2">'+
                                                    '<label  >Targa *</label>'+
                                                    '<input type="text" class="form-control" name="targa" id="targa" value="'+(row.id?row.targa:'')+'" >'+
                                                '</div>'+
                                                '<div class="form-group col-lg-2">'+
                                                    '<label  >Modello</label>'+
                                                    '<input type="text" class="form-control" name="modello" id="modello"   value="'+(row.id?row.modello?row.modello:'':'')+'">'+
                                                '</div>'+
                                                '<div class="form-group col-lg-2">'+
                                                    '<label  >Telaio</label>'+
                                                    '<input type="text" class="form-control" name="telaio" id="telaio" value="'+(row.id?row.telaio?row.telaio:'':'')+'" >'+
                                                '</div>'+ 
                                                
                                                '<div class="form-group col-lg-2">'+
                                                    '<label  >Data immatricolazione</label>'+
                                                    '<div class="input-group date " id="datetimepicker1">'+
                                                        '<input type="text" class="form-control "  name="dataImmatricolazione" id="dataImmatricolazione"  value="'+(row.id?row.data_immatricolazione?moment(row.data_immatricolazione).format('DD/MM/YYYY'):'':'')+'" />'+ 
                                                        '<span class="input-group-addon">'+  
                                                            '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                                        '</span>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="form-group col-lg-2">'+
                                                    '<label  >Classe ambientale</label>'+
                                                    '<select  class="form-control" name="clAmbientale" id="clAmbientale"   ></select>'+
                                                '</div>'+
                                                '<div id="pdflibretto" >'+
                                              
                                                '</div>'+    
                                            '</div>'+
                                            '<div class="row col-lg-12">'+
                                                '<div class="form-group col-lg-4">'+
                                                   '<label  >Tipo contratto</label>'+
                                                   '<select  class="form-control" name="tipoContratto" id="tipoContratto"  title="Tipo contratto \nDato inserito in: \nSetting->Tipologie->Contratto" ></select>'+
                                                '</div>'+
                                    
                                                '<div class="form-group col-lg-4">'+
                                                    '<label  >Fornitore contratto</label>'+
                                                    '<select  class="form-control" name="fornitoreContratto" id="fornitoreContratto"   title="Fornitore contratto \nDato inserito in: \nAnagrafica->Fornitori->Tipologia=Contratto"></select>'+
                                                '</div>'+
                                                 '<div class="form-group col-lg-2">'+
                                                    '<label  >Sc. contratto</label>'+
                                                    '<div class="input-group date " id="datetimepicker4">'+
                                                        '<input type="text" class="form-control "  name="dataScContratto" id="dataScContratto"  value="'+(row.id?row.dataScContratto?moment(row.dataScContratto).format('DD/MM/YYYY'):'':'')+'" />'+ 
                                                        '<span class="input-group-addon">'+  
                                                            '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                                        '</span>'+
                                                    '</div>'+
                                                '</div>'+
                                                
                                                '<div id="pdfcontratto" >'+
                                                   
                                                '</div>'+
                                             '</div>'+
                                             '<div class="row col-lg-12">'+
                                                '<div class="form-group col-lg-3">'+
                                                    '<label  >Tipologia di automezzo</label>'+
                                                    '<select  class="form-control" name="tipoAutomezzo" id="tipoAutomezzo"   ></select>'+
                                                '</div>'+
                                                 '<div class="form-group col-lg-3">'+
                                                    '<label  >Alimentazione</label>'+
                                                    '<select  class="form-control" name="alimentazione" id="alimentazione"   ></select>'+
                                                '</div>'+
                                                '<div class="form-group col-lg-3">'+
                                                    '<label  >scad. Bollo (se di proprietà)</label>'+
                                                    '<div class="input-group date " id="datetimepicker2">'+
                                                        '<input type="text" class="form-control "  name="scadenza_bollo" id="scadenza_bollo"  value="'+(row.id?row.data_sc_bollo?moment(row.data_sc_bollo).format('DD/MM/YYYY'):'':'')+'"/>'+ 
                                                        '<span class="input-group-addon">'+  
                                                            '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                                        '</span>'+
                                                    '</div>'+
                                                   
                                                '</div>'+
                                                 '<div class="form-group col-sm-2">'+
                                                    '<div class="form-check ">'+
                                                        '<input class="form-check-input" type="checkbox" id="esente"  name="esente" '+(row.id?row.esente_bollo==='1'?'checked':'':'')+'>'+
                                                        '<label class="form-check-label" for="defaultCheck1"> Esente bollo</label>'+
                                                    '</div>'+
                                                    '<div class="form-check ">'+
                                                        '<input class="form-check-input" type="checkbox" id="valid" name="valid" '+(row.id?row.valid==='1'?'checked':'':'checked')+'>'+
                                                        '<label class="form-check-label" for="valid"> Mezzo attivo</label>'+
                                                    '</div>'+
                                                '</div>'+  
                                            '</div>'+
                                          
                                            '<div class="row col-lg-12">'+
                                                
                                                '<div class="form-group col-lg-12 " style="border-style: groove;">'+
                                               
                                                    '<div class="form-group col-lg-4">'+
                                                        '<label >Data lettura km</label>'+
                                                        //'<input type="text" class="form-control" title="Data lettura kilometri" name="data_km" id="data_km" value="'+(row.id?row.data_km?row.data_km:'':'')+'" >'+
                                                        
                                                            '<input type="text" class="form-control "  title="Data lettura kilometri" name="data_km-" id="data_km-"  value="'+(row.id?row.data_km?moment(row.data_km).format('DD/MM/YYYY'):'':'')+'" readonly/>'+ 
                                                       
                                                       
                                                    '</div>'+
                                                    '<div class="form-group col-lg-4">'+
                                                        '<label >Km</label>'+
                                                        '<input type="number" class="form-control" title="Kilometri" id="km-" name="km-" value="'+(row.id?row.km?row.km:'':'')+'" readonly>'+
                                                    '</div>'+
                                                    
                                                    '<div class="form-group col-lg-4">'+
                                                        '<label for="editkm" style="color:white;">Km</label>'+
                                                        '<button type="button" id="editkm" name="editkm" class="btn btn-primary  col-lg-12" >Edit Km</button>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+  
                                    '</div>'+ 
                                '</div>'+    
                                '<div class="row col-lg-12">'+
                                    '<div class="panel panel-default ">'+
                                        '<div class="panel-heading">'+
                                            '<h1 class="panel-title">Assicurazione</h1>'+
                                        '</div>'+
                                        '<div class="panel-body ">'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label >Fornitore assicurazione</label>'+
                                                '<input type="text" class="form-control" title="Fornitore assicurazione \nDato inserito in: \nSetting->Tipologie->Contratto->Fornitore assicurazione" name="fornitore_assicurativo" id="fornitore_assicurativo" value="'+(row.id?row.fornitore_assicurazione?row.fornitore_assicurazione:'':'')+'" readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label >Compagnia assicurativa</label>'+
                                                '<select  class="form-control" name="compagnia_assicurativa" id="compagnia_assicurativa"   ></select>'+
                                                '<!--input type="text" class="form-control" title="Compagnia  Assicurativa \nDato inserito manualmente.\nSe non compilato e se il fornitore assicurazione non è un broker \nla Compagnia assicurativa corrisponde al Fornitore assicurazione." name="compagnia_assicurativa" id="compagnia_assicurativa" value="'+(row.id?row.compagnia_assicurativax?row.compagnia_assicurativax:'':'')+'" -->'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label  >N° polizza</label>'+
                                                '<input type="text" class="form-control" name="polizza" id="polizza" value="'+(row.id?row.polizza?row.polizza:'':'')+'" >'+
                                            '</div>'+
                                            '<div class="form-group col-sm-2">'+

                                                '<label for="valid">Kasco</label>'+
                                                '<input type="checkbox" class="form-control " name="kasco" id="kasco" '+(row.id?row.kasco==='1'?'checked':'':'')+'>'+
                                            '</div>'+
                                              '<div id="pdfcertificato" >'+
                                                   
                                                '</div>'+
                                        '</div>'+
                                    '</div>'+  
                                '</div>'+
                                '<div class="row col-lg-12">'+
                                    '<div class="panel panel-default ">'+
                                        '<div class="panel-heading">'+
                                            '<h1 class="panel-title">Assegnazione auto</h1>'+
                                        '</div>'+
                                        '<div class="panel-body ">'+
                                            '<div class="form-group col-lg-5">'+
                                                '<label  >Servizio</label>'+
                                                '<select  class="form-control" name="servizio" id="servizio"   ></select>'+
                                            '</div>'+
                                             '<div class="form-group col-lg-3">'+
                                                '<label  >E-mail servizio</label>'+
                                                '<input type="text" class="form-control" name="servizio_email" id="servizio_email" value="'+(row.id?row.cdc?row.cdc:'':'')+'" readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label  >Telefono servizio</label>'+
                                                '<input type="text" class="form-control" name="servizio_telefono" id="servizio_telefono"  readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-1">'+
                                                '<label  >CDC</label>'+
                                                '<input type="text" class="form-control" name="cdc" id="cdc" title="Centro di costo" value="'+(row.id?row.cdc?row.cdc:'':'')+'" readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-5">'+
                                                '<label  >Coordinatore</label>'+
                                                '<input type="text" class="form-control" name="coordinatore" id="coordinatore"  readonly>'+
                                            '</div>'+
                                             '<div class="form-group col-lg-3">'+
                                                '<label  >E-mail coordinatore</label>'+
                                                '<input type="text" class="form-control" name="coordinatore_email" id="coordinatore_email" readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label  >Telefono coordinatore</label>'+
                                                '<input type="text" class="form-control" name="coordinatore_telefono" id="coordinatore_telefono"  readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-5">'+
                                                '<label  >Referente/Responsabile</label>'+
                                                '<input type="text" class="form-control" name="refres" id="refres"  readonly>'+
                                            '</div>'+
                                             '<div class="form-group col-lg-3">'+
                                                '<label  >E-mail Ref/Res</label>'+
                                                '<input type="text" class="form-control" name="refres_email" id="refres_email"  readonly>'+
                                            '</div>'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label  >Telefono Ref/Res</label>'+
                                                '<input type="text" class="form-control" name="refres_telefono" id="refres_telefono"  readonly>'+
                                            '</div>'+
                                            
                                            
                                             '<div class="form-group col-lg-5">'+
                                                '<label  >Dipendente</label>'+
                                                '<input type="text"  class="form-control" name="dipendente" id="dipendente" value="'+(row.id?row.dipendente?row.dipendente:'':'')+'">'+
                                            '</div>'+
                                            '<div class="form-group col-sm-3">'+
                                                '<label >Ad uso esclusivo</label>'+
                                                '<input type="checkbox" class="form-control " name="uso_esclusivo" id="uso_esclusivo" '+(row.id?row.uso_esclusivo==='1'?'checked':'':'')+'>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+  
                                '</div>'+
                               
                                '<div class="row col-lg-12">'+
                                    '<div class="panel panel-default ">'+
                                    '<div class="panel-heading">'+
                                        '<h1 class="panel-title">Telepass</h1>'+
                                    '</div>'+
                                        '<div class="panel-body ">'+
                               
                                    '<div class="form-group col-lg-3">'+
                                        '<label  >Telepass</label>'+
                                        '<input type="text" class="form-control" name="telepass" id="telepass"   value="'+(row.id?row.telepass?row.telepass:'':'')+'">'+
                                    '</div>'+
                                     '<div class="form-group col-sm-2">'+

                                        '<label >Viacard</label>'+
                                        '<input type="text" class="form-control" name="viacard" id="viacard"  value="'+(row.id?row.viacard?row.viacard:'':'')+'" >'+
                                    '</div>'+
                                    
                                 '</div>'+
                                    '</div>'+  
                                '</div>'+
                                '<div class="row col-lg-12">'+
                                    '<div class="panel panel-default ">'+
                                        '<div class="panel-heading">'+
                                            '<h1 class="panel-title">Permesso ZTL</h1>'+
                                        '</div>'+
                                        '<div class="panel-body ">'+
                                            '<div class="form-group col-lg-3">'+
                                                '<label>N° Permesso ZTL</label>'+
                                                '<input type="text" class="form-control" name="numZtl" id="numZtl" value="'+(row.id?row.ztl?row.ztl:'':'')+'">'+
                                            '</div>'+

                                            '<div class="form-group col-lg-3">'+
                                                '<label  >Scadenza Permesso ZTL</label>'+
                                                '<div class="input-group date " id="datetimepicker3">'+
                                                    '<input type="text" class="form-control "  name="scZtl" id="scZtl"  value="'+(row.id?row.data_sc_ztl?moment(row.data_sc_ztl).format('DD/MM/YYYY'):'':'')+'"/>'+ 
                                                    '<span class="input-group-addon">'+  
                                                        '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                                    '</span>'+
                                                '</div>'+
                                                
                                            '</div>'+
                                            '<div id="pdfpermesso" >'+

                                            '</div>'+
                                        '</div>'+    
                                    '</div>'+
                                '</div>'+    
                                '<div class="row col-lg-12">'+
                                    '<div class="form-group col-lg-12">'+
                                                '<label>Note</label>'+
                                                '<textarea class="form-control" name="note" id="note" row="3">'+(row.id?row.note?row.note:'':'')+'</textarea>'+
                                            '</div>'+
                                    '<div class="form-group col-lg-2">'+
                                                             '<button type="button" data-tipo="auto" class="btn btn-danger annulla"><span aria-hidden="true">&times;</span> Annulla</button>'+
                                    '</div>'+ 
                                    '<div class="form-group col-lg-2">'+                       
                                        '<button type="button" id="btn'+tipoNome+'" name="btn'+tipoNome+'" class="btn btn-primary submit ">'+upCr+' autovettura</button>'+
                                    '</div>'+ 
                                '</div>'+
                            '</form >'

                        '</div>'+
                    '</div>'+
                '</div>';            
       
        
        
                
        this.$(".subMain").empty();   
        this.$(".subMain").append( $varForm);
        console.log(row.id);
        //----------------------------------------------------------------------
        this.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
               
               // initialDate:'-2m'
                
            
            });
        this.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                // initialDate:'+2w'
              
            }); 
        this.$('#datetimepicker3').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                // initialDate:'+2w'
              
            }); 
        this.$('#datetimepicker4').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                // initialDate:'+2w'
              
            });       
        
        //---gestisco load pdf libretto-----------------------------------------
        $tipoPdf='libretto';
        $doc=_.find(row.doc,function(doc){return doc.tipo===$tipoPdf;});
        console.log($doc );
        if (typeof $doc !== 'undefined' && $doc.tipo==$tipoPdf){
            $enabled='';
        }else{
             $enabled='disabled';
        }
        $formPdf=formPdf($enabled,$tipoPdf);
      
        this.$("#pdf"+$tipoPdf).empty().append( $formPdf)
           
        $('.upload'+$tipoPdf).click(function(e) {//fa aprire il folder cliccando sul button e simulando
           $tipoPdf=e.currentTarget.dataset.tipo;
           $('input[name=file-upload'+$tipoPdf+']').click();
        })
        $('.download'+$tipoPdf).click(function(e) {//
        console.log(this.dataset.tipo);


        var $headers = {
                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                   
                    "lang": app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };

        var jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "pdf";
        jsonObj.subType = this.dataset.tipo;

        jsonObj.id=row.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);


        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data :  jsonObj,
            //cache:false,
            dataType : 'text',
            success: function (datap) {
              var  $mydata =JSON.parse(datap);
                console.log($mydata);


                window.open($mydata.file+'?t'+Math.floor(Math.random() * 999),'_blank');
             //   window.open($mydata.file,'_blank');

                // window.location.href=$mydata.file;

            },
            error: function () {

                console.log("View item error!");
            }
        });

    }); 
        $('input[name=file-upload'+$tipoPdf+']').change( function () {
            if(isNew){   alert('Inserire targa.');return}
            //--------------------------------------------------------------

            var API_URL = app.global.json_url + 'gap/';

            var jsonObj ={};

            subType= $tipoPdf;
            that=this;
            console.log(this.value);

            var file_data = $("#file-upload"+$tipoPdf).prop("files")[0]; // Getting the properties of file from file field
            console.log(file_data);
       if( typeof file_data !== 'undefined'){
               $("#download"+$tipoPdf).attr('disabled',true);
        var form_data = new FormData();
        form_data.append("file", file_data); 
        form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
        form_data.append("id",row.id);
        form_data.append("targa",row.targa);
        form_data.append("action",row.id?"update":"add");
        form_data.append("type",'pdf');
        form_data.append("subType",subType);
        form_data.append("person",app.global.tokensCollection.first().get("id_person"));
        
        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
           // "Content-Type": "application/json"
        };

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,

                   // data :  jsonObj,
                   // dataType : 'text',
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
                            $("#download"+$tipoPdf).attr('disabled',false);
                            that.value=null;
                          //  that.setAuto();//
                          alert("Aggiornamento del documento avvenuto correttamente.")
                            }else{
                                 bootbox.dialog({
                title: "Attenzione!",
                message: $mydata.message,
                buttons: {
                    main: {
                        label: "Annulla",
                        className: "btn btn-danger",
                        callback: function() {
                            $("body").removeClass("modal-open");

                        }
                    }
                }
            });  
                            }
                        }
                    });

    }
      })   
    
       
        //---gestisco load pdf Contratto----------------------------------------
      
        
        $tipoPdf='contratto';
        $doc=_.find(row.doc,function(doc){return doc.tipo===$tipoPdf;});
        console.log($doc );
        if (typeof $doc !== 'undefined' && $doc.tipo==$tipoPdf){
            $enabled='';
        }else{
             $enabled='disabled';
        }
        $formPdf=formPdf($enabled,$tipoPdf);
      
        this.$("#pdf"+$tipoPdf).empty().append( $formPdf)
           
        $('.upload'+$tipoPdf).click(function(e) {//fa aprire il folder cliccando sul button e simulando
            $tipoPdf=e.currentTarget.dataset.tipo;
           $('input[name=file-upload'+$tipoPdf+']').click();
        })
        $('.download'+$tipoPdf).click(function(e) {//
        console.log(this.dataset.tipo);


        var $headers = {
                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "lang": app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };

        var jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "pdf";
        jsonObj.subType = this.dataset.tipo;

        jsonObj.id=row.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);


        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data :  jsonObj,
            dataType : 'text',
            success: function (datap) {
              var  $mydata =JSON.parse(datap);
                console.log($mydata);


                window.open($mydata.file+'?t'+Math.floor(Math.random() * 999),'_blank');

                // window.location.href=$mydata.file;

            },
            error: function () {

                console.log("View item error!");
            }
        });

    }); 
        $('input[name=file-upload'+$tipoPdf+']').change( function () {
     if(isNew){   alert('Inserire targa.');return}
        //--------------------------------------------------------------

       var API_URL = app.global.json_url + 'gap/';

        var jsonObj ={};

        subType=$tipoPdf;
        that=this;
        console.log(this.value);

        var file_data = $("#file-upload"+$tipoPdf).prop("files")[0]; // Getting the properties of file from file field
       console.log(file_data);
       if( typeof file_data !== 'undefined'){
               $("#download"+$tipoPdf).attr('disabled',true);
        var form_data = new FormData();
        form_data.append("file", file_data); 
        form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
        form_data.append("id",row.id);
        form_data.append("targa",row.targa);
        form_data.append("action",row.id?"update":"add");
        form_data.append("type",'pdf');
        form_data.append("subType",subType);
        form_data.append("person",app.global.tokensCollection.first().get("id_person"));

        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
           // "Content-Type": "application/json"
        };

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,

                   // data :  jsonObj,
                   // dataType : 'text',
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
                            $("#download"+$tipoPdf).attr('disabled',false);
                            that.value=null;
                          //  that.setAuto();//
                          alert("Aggiornamento del documento avvenuto correttamente.")
                            }else{
                                 bootbox.dialog({
                title: "Attenzione!",
                message: $mydata.message,
                buttons: {
                    main: {
                        label: "Annulla",
                        className: "btn btn-danger",
                        callback: function() {
                            $("body").removeClass("modal-open");

                        }
                    }
                }
            });  
                            }
                        }
                    });

    }
      })   
    
        //---gestisco load pdf Assicurazione------------------------------------
      
        
        $tipoPdf='certificato';
       
            $doc=_.find(row.doc,function(doc){return doc.tipo===$tipoPdf});
            console.log($doc );
            if (typeof $doc !== 'undefined' && $doc.tipo===$tipoPdf){
                $enabled='';
            }else{
                 $enabled='disabled';
            }
        
        $formPdf=formPdf($enabled,$tipoPdf);
      
        this.$("#pdf"+$tipoPdf).empty().append( $formPdf)
           
        $('.upload'+$tipoPdf).click(function(e) {//fa aprire il folder cliccando sul button e simulando
           
           $tipoPdf=e.currentTarget.dataset.tipo;
           $('input[name=file-upload'+$tipoPdf+']').click();
        })
        $('.download'+$tipoPdf).click(function(e) {//
        console.log(this.dataset.tipo);


        var $headers = {
                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "lang": app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };

        var jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "pdf";
        jsonObj.subType = this.dataset.tipo;

        jsonObj.id=row.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);


        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data :  jsonObj,
            dataType : 'text',
            success: function (datap) {
              var  $mydata =JSON.parse(datap);
                console.log($mydata);


                window.open($mydata.file+'?t'+Math.floor(Math.random() * 999),'_blank');

                // window.location.href=$mydata.file;

            },
            error: function () {

                console.log("View item error!");
            }
        });

    }); 
        $('input[name=file-upload'+$tipoPdf+']').change( function () {
     if(isNew){   alert('Inserire targa.');return}
        //--------------------------------------------------------------

       var API_URL = app.global.json_url + 'gap/';

        var jsonObj ={};

        subType= $tipoPdf;
        that=this;
        console.log(this.value);

        var file_data = $("#file-upload"+$tipoPdf).prop("files")[0]; // Getting the properties of file from file field
       console.log(file_data);
       if( typeof file_data !== 'undefined'){
               $("#download"+$tipoPdf).attr('disabled',true);
        var form_data = new FormData();
        form_data.append("file", file_data); 
        form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
        form_data.append("id",row.id);
        form_data.append("targa",row.targa);
        form_data.append("action",row.id?"update":"add");
        form_data.append("type",'pdf');
        form_data.append("subType",subType);
        form_data.append("person",app.global.tokensCollection.first().get("id_person"));

        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
           // "Content-Type": "application/json"
        };

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,

                 //   data :  jsonObj,
                   // dataType : 'text',
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
                            $("#download"+$tipoPdf).attr('disabled',false);
                            that.value=null;
                          //  that.setAuto();//
                          alert("Aggiornamento del documento avvenuto correttamente.")
                            }else{
                                 bootbox.dialog({
                title: "Attenzione!",
                message: $mydata.message,
                buttons: {
                    main: {
                        label: "Annulla",
                        className: "btn btn-danger",
                        callback: function() {
                            $("body").removeClass("modal-open");

                        }
                    }
                }
            });  
                            }
                        }
                    });

    }
      })   
      
        //---gestisco load pdf Permesso ztl-------------------------------------
      
        
        $tipoPdf='permesso';
        $doc=_.find(row.doc,function(doc){return doc.tipo===$tipoPdf});
        console.log($doc );
        if (typeof $doc !== 'undefined' && $doc.tipo===$tipoPdf){
            $enabled='';
        }else{
             $enabled='disabled';
        }
        $formPdf=formPdf($enabled,$tipoPdf);
      
        this.$("#pdf"+$tipoPdf).empty().append( $formPdf)
           
        $('.upload'+$tipoPdf).click(function(e) {//fa aprire il folder cliccando sul button e simulando
          $tipoPdf=e.currentTarget.dataset.tipo;
           $('input[name=file-upload'+$tipoPdf+']').click();
        })
        $('.download'+$tipoPdf).click(function(e) {//
        console.log(this.dataset.tipo);


        var $headers = {
                    "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    "lang": app.global.languagesCollection.at(0).get("lang"),
                    "Content-Type": "application/json"
                };

        var jsonObj = {};
        jsonObj.action = "download";
        jsonObj.type = "pdf";
        jsonObj.subType = this.dataset.tipo;

        jsonObj.id=row.id;
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);


        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : $headers,
            data :  jsonObj,
            dataType : 'text',
            success: function (datap) {
              var  $mydata =JSON.parse(datap);
                console.log($mydata);


                window.open($mydata.file+'?t'+Math.floor(Math.random() * 999),'_blank');

                // window.location.href=$mydata.file;

            },
            error: function () {

                console.log("View item error!");
            }
        });

    }); 
        $('input[name=file-upload'+$tipoPdf+']').change( function () {
            
        if(isNew){   alert('Inserire targa.');return}
        //----------------------------------------------------------------------

        var API_URL = app.global.json_url + 'gap/';

        var jsonObj ={};

        subType= $tipoPdf;
        that=this;
        console.log(this.value);

        var file_data = $("#file-upload"+$tipoPdf).prop("files")[0]; // Getting the properties of file from file field
       console.log(file_data);
       if( typeof file_data !== 'undefined'){
               $("#download"+$tipoPdf).attr('disabled',true);
        var form_data = new FormData();
        form_data.append("file", file_data); 
        form_data.append("person",app.global.tokensCollection.first().get("id_person")); 
        form_data.append("id",row.id);
        form_data.append("targa",row.targa);
        form_data.append("action",row.id?"update":"add");
        form_data.append("type",'pdf');
        form_data.append("subType",subType);
        form_data.append("person",app.global.tokensCollection.first().get("id_person"));

        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
           // "Content-Type": "application/json"
        };

                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,

                   // data :  jsonObj,
                   // dataType : 'text',
                   data: form_data,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                  processData:false,        // To send DOMDocument or non processed data file it is set to false       
                    success: function (datap) {
                     
                        $mydata =JSON.parse(datap);

                        //-------------------------------------------------------
                        if ($mydata.success){
                            // app.routers.router.prototype.data_type_edit();
                            console.log("ok");
                            $("#download"+$tipoPdf).attr('disabled',false);
                            that.value=null;
                          //  that.setAuto();//
                          alert("Aggiornamento del documento avvenuto correttamente.")
                            }else{
                                 bootbox.dialog({
                title: "Attenzione!",
                message: $mydata.message,
                buttons: {
                    main: {
                        label: "Annulla",
                        className: "btn btn-danger",
                        callback: function() {
                            $("body").removeClass("modal-open");

                        }
                    }
                }
            });  
                            }
                        }
                    });

    }
      })   
    
    
        //----------------------------------------------------------------------
       
        function formPdf($enabled,$tipoPdf){
               $formPdf= 
            '<div  class="col-lg-2 pdfzone" >'+
                '<label >PDF '+$tipoPdf+'</label>'+
                '<div class="row col-lg-12">'+
                    '<div class="col-lg-6  ">'+
                       '<button href="undefined.pdf" title="Pdf upload" type="button" id="upload'+$tipoPdf+'" data-tipo="'+$tipoPdf+'" class="btn upload'+$tipoPdf+'" name="upload'+$tipoPdf+'" '+(isNew?'disabled':'')+'>'+
                           '<i class="fa fa-upload "></i>'+
                       '</button>'+
                       '<input id="file-upload'+$tipoPdf+'" data-tipo="'+$tipoPdf+'"  name="file-upload'+$tipoPdf+'" type="file" title="Pdf upload" accept=".pdf" style=" display: none; " />'+// 
                    '</div>'+
                    '<div id="downFile" class="col-lg-6 " >'+
                        '<button href="undefined.pdf" title="Pdf download" data-tipo="'+$tipoPdf+'" type="button" id="download'+$tipoPdf+'"  name="download'+$tipoPdf+'" class="btn download'+$tipoPdf+'" download=""  '+$enabled+'>'+
                        '<i class="fa fa-download"></i>'+
                        '</button>'+
                    '</div>'+      
                '</div>'+      
            '</div>';
        return $formPdf;
        }
        
        //---popolo select------------------------------------------------------
        var $seltipoContratto=that.$("#tipoContratto");
        var $seltipoAutomezzo=that.$("#tipoAutomezzo");
        var $selAlimentazione=that.$("#alimentazione");
        var $selclAmbientale=that.$("#clAmbientale");
        var $selAssicurazione=that.$("#compagnia_assicurativa");
        var $selservizio=that.$("#servizio");
       // var $selDipendente=that.$("#dipendente");
        var $selfornitoreContratto=that.$("#fornitoreContratto");
        /*       var $selProvincia=that.$("#provincia");
                    var $selComune=that.$("#comune");
                    var $selCap=that.$("#cap");
                    var $selCoordinatore=that.$("#coordinatore");
                    var $selReferente=that.$("#referente");
           */
        sel();
        //-------------------------------select---------------------------------
        function sel(){
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "types";

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'gap/',
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $seltipoContratto.empty();
                    $aa=$mydata.data;
                    //-----------------------------------------------------------------

                    $seltipoContratto.append('<option value="0"></option>');
                    _.filter($aa, function(num){return num.type=="tipoContratto"}).forEach(function(item){
                        console.log(item);

                        $seltipoContratto.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($seltipoContratto.val());//
                        }else{
                            $seltipoContratto.val(parseInt(row.id_tipo_contratto));//
                            console.log("seltipoContratto="+row.id_tipo_contratto+" arr="+_.keys(row));
                        }

                    });
                    //-----------------------------------------------------------------
                    $seltipoAutomezzo.empty();
                    $seltipoAutomezzo.append('<option value="0"></option>');
                    _.filter($aa, function(num){return num.type=="tipoAutomezzo"}).forEach(function(item){
                        console.log(item);
                        $seltipoAutomezzo.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($seltipoAutomezzo.val());//
                        }else{
                            $seltipoAutomezzo.val(parseInt(row.tipo_automezzo));//seleziona toscana
                            console.log("seltipoAutomezzo="+row.tipo_automezzo+" arr="+_.keys(row));
                        }

                    });
                    //-----------------------------------------------------------------
                    $selAlimentazione.empty();
                    $selAlimentazione.append('<option value="0"></option>');
                    _.filter($aa, function(num){return num.type=="tipoAlimentazione"}).forEach(function(item){
                        console.log(item);
                        $selAlimentazione.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($selAlimentazione.val());//
                        }else{
                            $selAlimentazione.val(parseInt(row.tipo_alimentazione));//seleziona toscana
                            console.log("alimentazione="+row.tipo_alimentazione+" arr="+_.keys(row));
                        }

                    });
                     //-----------------------------------------------------------------
                    $selclAmbientale.empty(); 
                    $selclAmbientale.append('<option value="0"></option>');
                    _.filter($aa, function(num){return num.type=="tipoClasseAmbientale"}).forEach(function(item){
                      //  console.log(item);
                        $selclAmbientale.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($selclAmbientale.val());//
                        }else{
                            $selclAmbientale.val(parseInt(row.classe_ambientale));//
                          //  console.log("seltipoAutomezzo="+row.classe_ambientale+" arr="+_.keys(row));
                        }

                    });

            }
            });
           servizi ();
        }
        function servizi(){
                 var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "servizi";

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'gap/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selservizio.empty();
                  
                    $aa=$mydata.data;
                       //-----------------------------------------------------------------
                    $selservizio.append('<option value="0"></option>');
                        $aa.forEach(function(item){
                       // console.log(item);
                        $selservizio.append('<option value="'+item.id+'">'+item.shortDescription+'</option>');




                 });
                  if(that.isNew){
                            parseInt($selservizio.val());//
                        }else{
                            $selservizio.val(parseInt(row.id_servizio));//

                        }
                }
            });
          fornitoriContratto() 
         }
        function servizirow(){
             console.log($selservizio.val()); 
            if($selservizio.val()!="0"){
              
            var jsonObj = {};
           
            jsonObj.action = "get";
            jsonObj.type = "anagrafica_servizi_detail";
             jsonObj.servizio = $selservizio.val();

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'doc/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    
                  
                    $aa=$mydata.data[0];
                       //-----------------------------------------------------------------
                                            
                       that.$("#servizio_telefono").empty().val($aa.telServizio);
                       that.$("#servizio_email").empty().val($aa.emailServizio);
                       that.$("#coordinatore").empty().val($aa.coordinatore);
                       that.$("#coordinatore_telefono").empty().val($aa.telCoordinatore);
                       that.$("#coordinatore_email").empty().val($aa.emailCoordinatore);
                       that.$("#refres").empty().val($aa.refRes);
                       that.$("#refres_telefono").empty().val($aa.telRefRes);
                       that.$("#refres_email").empty().val($aa.emailRefRes);
                       that.$("#cdc").empty().val($aa.cdc);
                      
                 
                }
            });
            }
           
        }
        function fornitoriContratto(){
                 var jsonObj = {};

            jsonObj.action = "list";
            jsonObj.type = "fornitori";
            jsonObj.table = false;
            if(isNew){
                jsonObj.tipoContratto = parseInt(that.$("#tipoContratto").val());
            }else{
                jsonObj.tipoContratto= parseInt(row.id_tipo_contratto);
            }

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'gap/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selfornitoreContratto.empty();
                    $aa=$mydata.data;
                       //-----------------------------------------------------------------
                   $selfornitoreContratto.append('<option value="0"></option>');
                        $aa.forEach(function(item){
                       // console.log(item);
                        $selfornitoreContratto.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($selfornitoreContratto.val());//
                        }else{
                            $selfornitoreContratto.val(parseInt(row.id_fornitore));//

                        }


                 });
                 servizirow();
                compagniaAssicurativa();

                }
            });

         }  
        function compagniaAssicurativa(){
                 var jsonObj = {};

            jsonObj.action = "list";
            jsonObj.type = "compagnia_assicurativa";

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'gap/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selAssicurazione.empty();
                    $aa=$mydata.data;
                       //-----------------------------------------------------------------
                    $selAssicurazione.append('<option value="0"></option>');
                        $aa.forEach(function(item){
                       // console.log(item);
                        $selAssicurazione.append('<option value="'+item.id+'">'+item.name+'</option>');

                        if(that.isNew){
                            parseInt($selAssicurazione.val());//
                        }else{
                            $selAssicurazione.val(parseInt(row.compagnia_assicurativa));//

                        }


                 });
                  fornitoriAssicurazione();
                }
            });

         }
        function fornitoriAssicurazione(){ 
            console.log($seltipoContratto.val());
            that.$("#fornitore_assicurativo").val("");
            switch ($seltipoContratto.val()){
                case "3"://tipoContratto=3->LEASING
                    $("#compagnia_assicurativa").val(row.id?row.id_compagnia_assicurativa?row.id_compagnia_assicurativa:'':'');
                    $("#fornitore_assicurativo").attr('readonly',false);
                    $("#fornitore_assicurativo").val(row.id?row.fornitore_assicurativo?row.fornitore_assicurativo:'':'');

                    break;
                 case "13"://tipoContratto=13->Lungo noleggio
                    $("#compagnia_assicurativa").val(row.id?row.id_compagnia_assicurativa?row.id_compagnia_assicurativa:'':'');
                    $("#fornitore_assicurativo").attr('readonly',true);
                    $("#fornitore_assicurativo").empty();
                    break;
                default:
                    var jsonObj = {};

                    jsonObj.action = "list";
                    jsonObj.type = "fornitoreAssicurazione";
                    jsonObj.tipoContratto = parseInt($seltipoContratto.val());
                    jsonObj.fornitoreContratto = parseInt($selfornitoreContratto.val());
                    console.log($seltipoContratto.val());
                    console.log($selfornitoreContratto.val());

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url:app.global.json_url + 'gap/',
                        type:'post',
                        headers : $headers,
                        data: jsonObj,
                        dataType : 'text',
                        success: function (json) {
                            $mydata =JSON.parse(json);
                            if ($mydata.data.length !==0 ){
                                console.log($mydata.data[0].name);

                                that.$("#fornitore_assicurativo").val($mydata.data[0].name);
                                switch ($mydata.data[0].id_tipologia){//tipologia fornitori
                                    case "8"://8=broker assicurativo
                                       // that.$("#compagnia_assicurativa").val($mydata.data[0].compagnia); //se non è stata impostata è = al fornitore
                                        that.$("#compagnia_assicurativa").val(row.id_compagnia_assicurativa );
                                        break;

                                    default:
                                        that.$("#compagnia_assicurativa").val(row.id_compagnia_assicurativa ); //se non è stata impostata è = al fornitore 
                                }

                            }else{
                                that.$("#fornitore_assicurativo").val('');
                                that.$("#compagnia_assicurativa").val(row.id_compagnia_assicurativa);
                                console.log("array0");
                            }
                        }
                    });
                    break;

            }

        }   
       
              
        this.$("#modAuto").validate(); //sets up the validator
        
        $("input[name=\"descrizione\"]").rules( "add", {

            required: true,
            //number: true,
            // minlength: 2,

            messages: {

                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
        $("input[name=\"targa\"]").rules( "add", {
            required: true,
            //number: true,
            // minlength: 2,

            messages: {
                required: "Required input"
                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                // number:"Inserire un numero!"
            }
        });
       
        this.$('#btn'+tipoNome).click(function(e) {//
            
            if($("#modAuto").valid()){

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'gap/';
 
                var jsonObj ={};

                //jsonObj.action = row.id?"update":"add";
                // jsonObj.type = "type";

                // jsonObj.person = app.global.tokensCollection.first().get("id_person");
                // jsonObj = JSON.stringify(jsonObj);
                $('#scZtl').val()==''?null:that.$('#scZtl').val(moment(that.$('#datetimepicker3').data("datetimepicker").getDate()).format('YYYY-MM-DD'));
           
                that.$('#scadenza_bollo').val()==''?null:that.$('#scadenza_bollo').val(moment(that.$('#datetimepicker2').data("datetimepicker").getDate()).format('YYYY-MM-DD'));
                that.$('#dataImmatricolazione').val()==''?null: that.$('#dataImmatricolazione').val(moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD'));

                var  form_data=new FormData($('#modAuto')[0]) ;  
                form_data.append("action",row.id?"update":"add");
                form_data.append("type",'auto');
                form_data.append("person",app.global.tokensCollection.first().get("id_person"));
                console.log(form_data);
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                   // "Content-Type": "application/json"
                };
                
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,

                   // data :  jsonObj,
                   // dataType : 'text',
                   data: form_data,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData:false,        // To send DOMDocument or non processed data file it is set to false       
                    success: function (datap) {
                        console.log(datap.data);
                        $mydata =JSON.parse(datap);

                        //-------------------------------------------------------
                        if ($mydata.success){
                            bootbox.dialog({
                                title: (row.id?"Update":"Add ")+" Auto OK!",
                                message: (row.id?"Update":"Add ")+" Auto OK!",
                                buttons: {
                                    main: {
                                        label: "Success",
                                        className: "btn btn-success",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            e.currentTarget.dataset.tipo='auto'
                                            that.set(e);//
                                        }
                                    }
                                }
                            });  
                        }else{
                            bootbox.dialog({
                                title: "Attenzione!",
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: "Annulla",
                                        className: "btn btn-danger",
                                        callback: function() {
                                            $("body").removeClass("modal-open");

                                        }
                                    }
                                }
                            });  
                        }
                    }
                });
            }else{
            console.log("btnAlle invalid");  
            }
        }); 
        this.$('#sendkm').click(function(e) {//
            
           

            //--------------------------------------------------------------
            var API_URL = app.global.json_url + 'gap/';
 
            var jsonObj ={};
           
            jsonObj.action = "update";
            jsonObj.type = "km";
            jsonObj.id = $('#id').val();
            jsonObj.km = $('#km').val();
            jsonObj.data_km = moment($('#datetimepicker2a').data("datetimepicker").getDate()).format('YYYY-MM-DD');
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
                            console.log(datap.data);
                            $mydata =JSON.parse(datap);

                            //-------------------------------------------------------
                            if ($mydata.success){
                               
                                console.log("ok",$('#km').val());
                                $('#sendkm').prop("disabled",true);
                                row.km=$('#km').val();
                                   setTimeout(function(){
                          that.$(".km").prop(' style="border-style: green;"')
                        },1000);

                                }else{
                                     bootbox.dialog({
                    title: "Attenzione!",
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "Annulla",
                            className: "btn btn-danger",
                            callback: function() {
                                $('#km').val(row.km);
                                $('#sendkm').prop("disabled",true);
                                $("body").removeClass("modal-open");
                                
                            }
                        }
                    }
                });  
                                }
                            }
                        });


                  
               


            }); 
        var editKm={ 
            edit:function (){
              
                var API_URL = app.global.json_url + 'gap/';
                var jsonObj ={};
           
            jsonObj.action = "list";
            jsonObj.type = "km";
            jsonObj.id_auto = row.id;
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
                            console.log($mydata);
                            //-------------------------------------------------------
                            if ($mydata.success){
                               exemodal($mydata.data);
                            
                            }
                }
            });
            var $modal = $('#modal').modal({ show: false });  
            that=this;
            function exemodal($data){
       
             $varForm='<div class="panel panel-default">'+
                            '<div class="panel-heading" role="tab" id="heading">'+
                                '<h4 class="panel-title"><span class="badge">'+$data.length+' </span> Letture Km </h4>'+

                            '</div>'+
                            '<div id="collapse" class="panel-collapse" role="tabpanel" aria-labelledby="heading">'+
                                '<div class="panel-body">'+
                                    '<input type="hidden" class="form-control" name="id" id="id">'+
                                    '<p class="toolbar">'+
                                        '<span class="alert"></span>'+
                                    '</p>'+
                                    '<div  class="form-group col-lg-12 km" style="border-style: groove;">'+
                                        '<div class="form-group col-lg-4">'+
                                            '<label >Data lettura km</label>'+
                                            //'<input type="text" class="form-control" title="Data lettura kilometri" name="data_km" id="data_km" value="'+(row.id?row.data_km?row.data_km:'':'')+'" >'+
                                            '<div class="input-group date " id="datetimepicker2a">'+
                                                '<input type="text" class="form-control "  title="Data lettura kilometri" name="data_km" id="data_km"  value="'+(row.id?row.data_km?moment(row.data_km).format('DD/MM/YYYY'):'':'')+'"/>'+ 
                                                '<span class="input-group-addon">'+  
                                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                                '</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="form-group col-lg-4">'+
                                            '<label >Km</label>'+
                                            '<input type="number" class="form-control" title="Kilometri" id="km" name="km"  value="'+(row.id?row.km?row.km:'':'')+'"/>'+
                                        '</div>'+
                                        '<div class="form-group col-lg-4">'+
                                            '<label for="sendkm" style="color:white;">Km</label>'+
                                            '<button type="button" id="sendkm" name="sendkm" class="btn btn-primary  col-lg-12" disabled>Add lettura Km</button>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-12">'+
                                        '<table id="tablekm" name="tablekm"> </table>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            
          
          
            $(".modal-footer").empty();  
            $(".modal-body").empty();
            $(".modal-body").append($varForm);
            $(".modal-title").empty().append("Edit Km");
          
           
            $("#modEdit").validate(); //sets up the validator
            $('#datetimepicker2a').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                // initialDate:'+2w'
              
            });  
            $('#datetimepicker2a').datetimepicker('setEndDate', '+0d');    
            /*
            $.each( $data, function( key, value1 ){
                
                if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
                   value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');

                }
            
             

            });  */ 
            $("#tablekm").bootstrapTable('destroy');
            $("#tablekm").bootstrapTable({
                                    data:  $data,
                                    columns: row.tabkm,
                                    showColumns:false,
                                    showRefresh:false,
                                    search:false
                                });
            $modal.modal('show'); 
             console.log( $data);
            $('#km').change(function (e,value,row) {
            console.log("chng km",$('#data_km').val(),$('#km').val(),$('#id').val());
            
            if($('#data_km').val()!='' && $('#km').val()!='' &&  $('#id').val()!=''){
                $('#sendkm').prop("disabled",false);
            }else{
                $('#sendkm').prop("disabled",true);
            }
            
        });  
            $('#data_km').change(function (e,value,row) {
            console.log("chng km",$('#data_km').val());
            if($('#km').val()!='' && $('#data_km').val()!='' &&  $('#id').val()!=''){
                $('#sendkm').prop("disabled",false);
            }else{
                $('#sendkm').prop("disabled",true);
            }
            
        });  
            $("#sendkm").click(function(e) {//
               
                  //--------------------------------------------------------------
            var API_URL = app.global.json_url + 'gap/';
 
            var jsonObj ={};
           
            jsonObj.action = "update";
            jsonObj.type = "km";
            jsonObj.id = $('#id').val();
            jsonObj.km = $('#km').val();
            jsonObj.data_km = moment($('#datetimepicker2a').data("datetimepicker").getDate()).format('YYYY-MM-DD');
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
                            
                            //-------------------------------------------------------
                            if ($mydata.success){
                               
                                console.log("ok",$('#km').val());
                                $('#sendkm').prop("disabled",true);
                                row.km=$('#km').val();
                                row.data_km=$('#data_km').val();
                                $('#km-').val(row.km);
                                $('#data_km-').val(row.data_km);
                                $(".km").css("border-color","#9bf280");
                                editKm.setv();
                             
                         
                                }else{
                                     bootbox.dialog({
                    title: "Attenzione!",
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "Annulla",
                            className: "btn btn-danger",
                            callback: function() {
                                $('#km').val(row.km);
                                $('#sendkm').prop("disabled",true);
                                $("body").removeClass("modal-open");
                                
                            }
                        }
                    }
                });  
                                }
                            }
                        });


            });
            $("#tablekm").on('editable-save.bs.table', function (e, field, row,$el , old) {
                var API_URL = app.global.json_url + 'gap/';
                var jsonObj ={};
           
                jsonObj.action = "update";
                jsonObj.type = "km_tab";
                jsonObj.id_auto = row.id_auto;
                jsonObj.data_km = row.data;
                jsonObj.km = row.km;
                
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
                    console.log($mydata);
                    //-------------------------------------------------------
                    if ($mydata.success){
                        $("#tablekm").css("background-color","#9bf280");
                   
                        setTimeout(function(){
                       $("#tablekm").css("background-color","#fff");
                       editKm.edit();
                       
                  },1000);
                            
                    }else{
                        $("#tablekm").css("background-color","#00ffff");
                   
                        setTimeout(function(){
                            $("#tablekm").css("background-color","#fff");
                        },1000); 
                    }
                }
            });
                  
              });
             
            }
       
    } , 
            
            setv: function (){setTimeout(function(){
                        
                         
                         editKm.edit();
                        },2000)}
        } 
        this.$('#editkm').click(function(e) {//
            
          editKm.edit();
               


            });     
        
       
        this.$('#loadContratto').click(function(e) {//add dalle modali
            
            if($("#modAuto").valid()){

                //--------------------------------------------------------------
                var API_URL = app.global.json_url + 'gap/';

                var jsonObj ={};

               //jsonObj.action = row.id?"update":"add";
               // jsonObj.type = "type";

               // jsonObj.person = app.global.tokensCollection.first().get("id_person");
               // jsonObj = JSON.stringify(jsonObj);
               var  form_data=new FormData($('#modAuto')[0]) ;                     
               form_data.append("action",row.id?"update":"add");
               form_data.append("type",'auto');
               form_data.append("person",app.global.tokensCollection.first().get("id_person"));
               
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                   // "Content-Type": "application/json"
                };
                
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,

                      //  data :  jsonObj,
                       // dataType : 'text',
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

                                that.setAuto();//

                                }else{
                                     bootbox.dialog({
                    title: "Attenzione!",
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "Annulla",
                            className: "btn btn-danger",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                
                            }
                        }
                    }
                });  
                                }
                            }
                        });


                  
                }else{
                console.log("btnAlle invalid");  
            }


            }); 
        this.$('#tipoContratto').change(function (e,value,row) {
            isNew=true;
            
            fornitoriContratto();   
        }); 
        this.$('#fornitoreContratto').change(function (e,value,row) {
            isNew=true;
            
            fornitoriAssicurazione();   
        }); 
        this.$('#tipoContrattox').change(function (e,value,row) {
            isNew=true;
            
            fornitoriContratto();   
        }); 
        this.$('#fornitoreContratto').change(function (e,value,row) {
            isNew=true;
            
            fornitoriAssicurazione();   
        }); 
        $selservizio.change(function (e,value,row) {
            isNew=true;
            
           servizirow();   
        }); 
        window.actionEvents = {
    
    
            'click .updatekm': function (e, value, $row) {

                console.log("updatekm");
                this.setModale(e,$row);
            },
            'click .removekm': function (e,xxx ,row,ind) {
                console.log("removekm",row,ind);
                   if (confirm('Sei sicuro di voler rimuovere la lettura di '+row.km+' Km del '+row.data+'?')) {
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            var jsonObj = {};
            jsonObj.type='km';
            jsonObj.action = "del";
            jsonObj.data=row.data;
            jsonObj.id_auto=row.id_auto;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);


            $.ajax({
                url:app.global.json_url + 'gap/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                   var $mydata =JSON.parse(json);
                    //-------------------------------------------------------
                    if ($mydata.success){
                      
                        setTimeout(function(){
                            console.log("rem");
                            editKm.edit();
                        },1000);
                        
                        
                    }
                }           
            });

        }

            }
};
      
  },
    editFornitore:function(e,row,index){
        if(typeof row==='undefined'){row=0;}//perchè  uglufy in ecma6 non gestisce i valore di default per le funzioni!
        var tipo='';
        var upCr="";
        var tipoNome="";
        var $doc;
        var tipoDescrizione= "";
        var $enabled= "";
        var isNew=false;
        var $tipoPdf='';
        var $iTel=0,$iEmail=0,$iReferente=0;//indice per contare quante mail o telefoni o referenti_ditte 
        that=this;
      
        console.log(row);
        console.log("edit fornitore rowId="+row.id);
        if (typeof row.id !== 'undefined') {
        // if(row.id){
            console.log(row);
            console.log(index);
            console.log('upadatee'); 
            upCr="Edit";
            isNew=false;
            console.log(row.name);
          
            $enabled="";
           
        }else{
            console.log('createe');
            upCr="Add";
            
            isNew=true;
            tipo=e.currentTarget.dataset.tipo;
            
           
            $enabled="disabled";
            console.log(tipo);
          
           
        }
        this.$(".subMain").empty();  
        $varForm="";
        
       
            $varForm+=
                '<div class="panel panel-default">'+
                    '<div class="panel-heading" role="tab" id="heading">'+
                        '<h4 class="panel-title">'+upCr+' fornitore</h4>'+
                    '</div>'+
                    '<div id="collapse" class="panel-collapse" role="tabpanel" aria-labelledby="heading">'+
                        '<div class="panel-body">'+
                            '<form  id="fornitoreEdit" class="fornitoreEdit">'+
                                '<input type="hidden" class="form-control" name="id" id="id"  value="'+(row.id?row.id:'')+'" >'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-8">'+
                                        '<label id="lblname" for="name">Nome Ditta *</label>'+
                                        '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Ditta"  value="'+(row.id?row.name:'')+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label id="lblname" for="piva">Partita IVA</label>'+
                                        '<input type="text" class="form-control" name="piva" id="piva" placeholder="Partita IVA" value="'+(row.id?row.piva:'')+'">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  >Tipologia</label>'+
                                        '<select  name="tipologia" id="tipologia"  class="form-control" ></select>'+

                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  >Tipo contratto</label>'+
                                        '<select  name="tipo_contratto" id="tipo_contratto"  class="form-control" ></select>'+

                                    '</div>'+
                                     '<div class="form-group col-lg-4">'+
                                        '<label  >Compagnia assicurativa</label>'+
                                        '<select  name="compagnia_assicurativa" id="compagnia_assicurativa"  class="form-control" ></select>'+

                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label id="lblccia" for="ccia">C.C.I.A.</label>'+
                                        '<input type="text" class="form-control" name="ccia" id="ccia" placeholder="C.C.I.A." value="'+(row.id?row.CCIA:'')+'">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-12">'+
                                        '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>'+
                                        '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo" value="'+(row.id?row.indirizzo:'')+'">'+
                                    '</div>'+
                                '</div>'+    
                                '<div class="row">'+
                                    '<div class="form-group col-lg-4">'+
                                        '<label  id="lblcomune" for="comune">Comune</label>'+
                                        '<select  name="comune" id="comune"  class="form-control" ></select>'+

                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<label  id="lblcap" for="cap">CAP</label>'+
                                        '<select  name="cap" id="cap"  class="form-control" ></select>'+

                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+
                                        '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                                       '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                                    '</div>'+

                                    '<div class="form-group col-lg-3">'+
                                        '<label  id="lblregione" for="regione">Regione</label>'+
                                        '<select  name="regione" id="regione"  class="form-control" ></select>'+

                                    '</div>'+

                                '</div>'+
                
                                '<div class="row ">'+
                                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                        '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>'+
                                        //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                                        '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                                    '</div>'+

                                '</div>'+
                                '<div id="email" name="email[]"></div></form>';
                                this.$(".subMain").append( $varForm);
                                //----------------------------------------------------------------------
                   
                                if(!isNew && row.email.length>0){ 
                                     $varEmail= "";
                                    for ($i = 0; $i <row.email.length; $i++) {
                                        $iEmail=$i;

                                         $("#email").append(  
                                               
                                           '<div class="row">'+//                                                                                 
                                               '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+(row.id?row.email[$i]['id']:'')+'">'+  

                                               '<div class="form-group col-lg-8">'+
                                                   '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+(row.id?row.email[$i]['email']:'')+'" placeholder="Email" col-lg-7>'+
                                               '</div>'+
                                               '<div class="form-group col-lg-3">'+
                                                   '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+(row.id?row.email[$i]['emailNome']:'')+'" placeholder="Nome Email">'+
                                               '</div>'+
                                                '<div class="form-group col-lg-1">'+
                                                 '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                               '</div>'+

                                           '</div>');
                                          
                                       
                             

                                        that.$('.removeEmail'+$iEmail).click(function(e) {
                                            console.log('.removeEmail'+$iEmail);
                                    $idx= $(this).attr("idx");
                                    $idxi= that.$("#fornitoreEdit").find('input[name="email['+$idx+'][id]"]').val();

                                    $(this).closest(".row").remove();

                                    var jsonObj = {};
                                    jsonObj.id=$idxi;
                                    jsonObj.type="email";
                                    jsonObj.action = "del";
                                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                    jsonObj = JSON.stringify(jsonObj);

                                    $.ajax({
                                       url:app.global.json_url + 'gap/',
                                       type:'post',
                                       headers : $headers,
                                       data: jsonObj,
                                       dataType : 'text',
                                        success: function (json) {
                                           $mydata =JSON.parse(json);
                                       }           
                                    });

                                });
                                        $("#fornitoreEdit").validate(); //sets up the validator

                                        // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                            required: true,
                                            // minlength: 2,
                                            email: true,

                                            messages: {
                                              required: "Required input",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                              email:"Deve essere una email valida!"
                                            }
                                        });

                                    }
                                 
                                }    
                    
                                //----------------------------------------------------------------------
                                $varForm= 
                               
                                '<div class="row ">'+
                                    '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                                        '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>'+
                                           // '<button type="button" id="telefonoPlus" name="telefonoPlus" class="btn btn-default btn-lg telefono-Plus">'+
                                            '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                                        //'</button>'+
                                    '</div>'+
                                '</div>'+    
                                '<div id="telefoni" name="telefoni[]"></div>';
                                 this.$("#fornitoreEdit").append( $varForm);
                                //--------------------------------------------------------------------------
                                if(!isNew && row.telefoni.length>0){
                    
                                    console.log("telefoniL=" + row.telefoni.length);
                                    for ($i = 0; $i <row.telefoni.length; $i++) {
                                        $iTel=$i;
                                        console.log("telefoni i=" + $iTel);
                                      $("#telefoni").append(  
                                         
                                            '<div class="row">'+
                                                 '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+(row.id?row.telefoni[$i]['id']:'')+'">'+  

                                                '<div class="form-group col-lg-8">'+
                                                // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                                '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+(row.id?row.telefoni[$i]['telefonoNumero']:'')+'"  placeholder="Telefono" col-lg-7>'+


                                                '</div>'+
                                                 '<div class="form-group col-lg-3">'+
                                                   // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+(row.id?row.telefoni[$i]['telefonoNome']:'')+'" placeholder="Nome Telefono">'+
                                                '</div>'+
                                                 '<div class="form-group col-lg-1">'+
                                                 //   '<label >Del</label>'+

                                                '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                                '</div>'+

                                            '</div>') ;
                                        
                                  
                                 that.$('.removeTel'+$iTel).click(function(e) {
                                            $idx= $(this).attr("idx");
                                            $idxi= that.$("#fornitoreEdit").find('input[name="telefoni['+$idx+'][id]"]').val();

                                            $(this).closest(".row").remove();

                                            var jsonObj = {};
                                            jsonObj.id=$idxi;
                                            jsonObj.type="telefoni";
                                            jsonObj.action = "del";
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
                                               }           
                                            });

                                        });
                                  that.$(".fornitoreEdit").validate(); //sets up the validator

                                   // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                    $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                            required: true,
                                           minlength: 6,
                                            number: true,

                                            messages: {
                                              required: "Perfavore inserisci il numero di telefono",
                                              minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                              number:"Deve essere un numero di Telefono  valido!"
                                            }
                                          });

                                     
                                    }
                                }                
                
                                //-----------------------referenti ditte----------------------------------------------------------- 
                                $varForm= 
                                      
                                '<div class="row ">'+
                                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                                        '<label id="lblrefMas" class="form-group col-lg-4" >Referente</label>'+
                                        '<a class="referente-Plus"  title="Add Referente"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                                    '</div>'+

                                '</div>'+
                                '<div id="referente" name="referente[]"></div>';
                                this.$("#fornitoreEdit").append( $varForm);
                        //----------------------------------------------------------------------
                  
                                if(!isNew && row.referente.length>0){ 
                    
                                    for ($i = 0; $i <row.referente.length; $i++) {
                                            $iReferente=$i;


                                            $("#referente").append(    
                                                '<div class="row">'+
                                                    '<input type="hidden" class="form-control" name="referente['+$i+'][id]" id="referente['+$i+'][id]" value="'+(row.id?row.referente[$i]['id']:'')+'">'+  

                                                    '<div class="form-group col-lg-4">'+
                                                        '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" value="'+(row.id?row.referente[$i]['first_name']:'')+'" placeholder="Nome Referente">'+
                                                    '</div>'+
                                                     '<div class="form-group col-lg-4">'+
                                                        '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" value="'+(row.id?row.referente[$i]['last_name']:'')+'" placeholder="Cognome Referente" >'+
                                                    '</div>'+
                                                    '<div class="form-group col-lg-3">'+
                                                        '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" value="'+(row.id?row.referente[$i]['mansione']:'')+'" placeholder="Mansione">'+
                                                    '</div>'+
                                                     '<div class="form-group col-lg-1">'+
                                                      '<a class="removeReferente'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                                    '</div>'+

                                                '</div>') ;
                                                
                                           


                                     that.$('.removeReferente'+$iReferente).click(function(e) {
                                                $idx= $(this).attr("idx");
                                                $idxi= that.$("#fornitoreEdit").find('input[name="referente['+$idx+'][id]"]').val();

                                                $(this).closest(".row").remove();

                                                var jsonObj = {};
                                                jsonObj.id=$idxi;
                                                jsonObj.type="referente_ditta";
                                                jsonObj.action = "del";
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
                                                   }           
                                                });

                                            });
                                             $("#fornitoreEdit").validate(); //sets up the validator

                                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                                        $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                                                required: true,
                                                minlength: 2,


                                                messages: {
                                                  required: "Required input",
                                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                                 // email:"Deve essere una email valida!"
                                                }
                                              });

                                        }
                                }    
             
                                $varNote="";  

                                if(!isNew ){ 
                            $varNote=row.note 
                        }else{

                        }
                
                    $varForm=  
                                '<div class="row">'+
                                      '<div class="form-group col-lg-12">'+
                                        '<label for="note">Note</label>'+

                                        '<textarea type="textarea" class="form-control" name="note" id="note" " rows="3" >'+(row.id?row.note:'')+'</textarea>'+

                                    '</div>'+
                                '</div>'+  
                                '<div class="row">'+
                                    '<div class="form-group col-lg-12" >'+
                                        '<input type="checkbox" class="form-check-input" name="valid" id="valid" '+(row.id?row.valid==='1'?'checked':'':'')+'>'+
                                        '<label class="form-check-label" for="valid">Valido</label>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row">'+
                                    '<div class="form-group col-lg-12 ">'+ 
                                        '<button type="button" id="btn'+tipoNome+'" name="btn'+tipoNome+'" class="btn btn-primary ">Submit</button>'+
                                    '</div>'+
                                '</div>';
                         this.$("#fornitoreEdit").append( $varForm);    
                    $varForm='</div>'+
                    '</div>'+
                '</div>'
                    ; //add input box
        
         
        this.$(".subMain").append( $varForm);
        console.log(row.id);
        //------------------------------------------------------------------------
        this.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
               
               // initialDate:'-2m'
                
            
            });
        this.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it",
                // initialDate:'+2w'
              
            }); 
       
      
        //---popolo select--------------------------------------------
        var $selTipologia=that.$("#tipologia");
        var $seltipoContratto=that.$("#tipo_contratto");
        var $selCompagniaAssicurativa=that.$("#compagnia_assicurativa");
        var $selRegione=that.$("#regione");
        var $selProvincia=that.$("#provincia");
        var $selComune=that.$("#comune");
        var $selCap=that.$("#cap");
        var $selReferente=that.$("#referente");
        
         
        var  $tipi;          
        selTipologia();
                   //-------------------------------select------------------------------------------
        function  selTipologia(){


                    var jsonObj = {};
                    
                    jsonObj.action = "list";
                    jsonObj.type = "types";

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    console.log(app.global.json_url + 'gap/');
                    console.log($headers);
                    $.ajax({
                        url:app.global.json_url + 'gap/',
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                             $mydata =JSON.parse(json);
                            $selTipologia.empty();
                            
                            $aa=$mydata.data;
                            $tipi=$aa
                            //-----------------------------------------------------------------
                            
                            $selTipologia.append('<option value="0"></option>');
                            _.filter($aa, function(num){return num.type=="tipoFornitori"}).forEach(function(item){
                                console.log(item);
                                $selTipologia.append('<option value="'+item.id+'">'+item.name+'</option>');
                                 console.log(isNew);
                                if(isNew){
                                    parseInt($selTipologia.val());//
                                }else{
                                    $selTipologia.val(parseInt(row.id_tipologia));//seleziona toscana
                                  
                                }
                        
                            });
                           
                            selTipoContratto();
                        },
                      
                    });
               
                }
        function  selTipoContratto(){
            console.log($tipi);
            $seltipoContratto.empty();
                         
            $seltipoContratto.append('<option value="0"></option>');
            console.log($selTipologia.val());
            switch($selTipologia.val()){
                case "10"://tipologia contratti
                    _.filter($tipi, function(num){return num.type=="tipoContratto"}).forEach(function(item){
                    console.log(item);
                    $seltipoContratto.append('<option value="'+item.id+'">'+item.name+'</option>');
                    });

                    if(isNew){
                        parseInt($seltipoContratto.val());//
                    }else{
                        $seltipoContratto.val(parseInt(row.id_tipo_contratto));//
                        console.log("seltipoContratto="+row.id_tipo_contratto+" arr="+_.keys(row));
                    }
                    $seltipoContratto.attr('disabled',false); 
                    $selCompagniaAssicurativa.attr('disabled',false); 
                    selCompagniaAssicurativa();
                    break;
                case "8"://tipologia broker
                    $seltipoContratto.empty();
                    $seltipoContratto.attr('disabled',true);
                    $selCompagniaAssicurativa.attr('disabled',false);
                    //$selCompagniaAssicurativa.empty();
                    selCompagniaAssicurativa();
                    break;
                default:  
                    fornitore_assicurativo
                    $seltipoContratto.empty();
                    $seltipoContratto.attr('disabled',true);
                    $selCompagniaAssicurativa.empty();
                    $selCompagniaAssicurativa.attr('disabled',true); 
             }
          
        }   
        function  selCompagniaAssicurativa(){
                    console.log($seltipoContratto.val());
                      if($seltipoContratto.val()!=0){//
                           var jsonObj = {};
                    //jsonObj.action = "regione";
                    //jsonObj.type = app.global.nick_array.arr;
                    jsonObj.action = "list";
                    jsonObj.type = "fornitoriAssicurazione";

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    console.log(app.global.json_url + 'gap/');
                    console.log($headers);
                    $.ajax({
                        url:app.global.json_url + 'gap/',
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                             $mydata =JSON.parse(json);
                            $selCompagniaAssicurativa.empty();
                            $aa=$mydata.data;
                            //-----------------------------------------------------------------
                            
                            $selCompagniaAssicurativa.append('<option value="0"></option>');
                          
                                $aa.forEach(function(item){
                                    console.log(item);
                                    $selCompagniaAssicurativa.append('<option value="'+item.id+'">'+item.name+'</option>');
                                });
                                
                               
                                if(isNew){
                                    parseInt($selCompagniaAssicurativa.val());//
                                }else{
                                    $selCompagniaAssicurativa.val(parseInt(row.id_compagnia_assicurativa));//seleziona toscana
                                  
                                }
                        
                        },
                      
                    });
                      }else{
                           $selCompagniaAssicurativa.empty();
                      }
                   
               
                }
        regioni();
        //-------------------------------regioni------------------------------------------
        function  regioni(){


         var jsonObj = {};
         //jsonObj.action = "regione";
         //jsonObj.type = app.global.nick_array.arr;
         jsonObj.action = "list";
         jsonObj.type = "regioni";

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
                $selRegione.empty();
                $aa=$mydata.data;
                $selRegione.append('<option value="0"></option>');
                 $.each($aa, function(i, value) {
                   $selRegione.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["nome"]+'</option>');
                });
              // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                 if(isNew){
                 parseInt($selRegione.val(17));//seleziona toscana 17
             }else{
                 $selRegione.val(parseInt(row.id_regione));//seleziona toscana

             }

               province();
             }  
         });
     }
        //-------------------------------province------------------------------------------

        function  province(){  


            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "province";
            if(isNew){
               jsonObj.regione = parseInt($selRegione.val());
            }else{
               jsonObj.regione = parseInt(row.id_regione);
            }




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
                   $selProvincia.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selProvincia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["sigla"]+' ('+$aa[i]["nome"]+')</option>');
                   });
                if(isNew){
                     parseInt($selProvincia.val());//seleziona pr firenze 33
                }else{
                      $selProvincia.val(parseInt(row.id_provincia));//seleziona pr firenze 33

                }

                 comuni();
                }
            });
            }       
        //-------------------------------comuni------------------------------------------

        function  comuni(){  


            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="comuni";

            if(isNew){
             jsonObj.provincia = parseInt($selProvincia.val());
            }else{
               jsonObj.provincia  = parseInt(row.id_provincia);
            }



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
                   $selComune.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selComune.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["comune"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
                if(isNew){
                     parseInt($selComune.val());//seleziona comune firenze 2797
                }else{
                     $selComune.val(parseInt(row.id_comune));//seleziona pr firenze 33

                }
                 cap();
                }
            });
            }       
        //-------------------------------cap------------------------------------------

        function  cap(){    

        var jsonObj = {};
        jsonObj.action = "list";
        jsonObj.type ="cap";

        if(isNew){
         jsonObj.comune = parseInt($selComune.val());
        }else{
            jsonObj.comune= parseInt(row.id_comune);
        }

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
               $selCap.append('<option value="0"></option>');
                $.each($aa, function(i, value) {
                  $selCap.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["cap"]+'</option>');
               });
           // $selComune.val(2797);//seleziona firenze
           if(isNew){
                 $selCap.val();//seleziona pr firenze 33
            }else{
                 $selCap.val(parseInt(row.id_cap));//seleziona pr firenze 33

            }
           // referente()
            }
        });
        }       
               
        //-------------------------------referenti-----------------------------------------

        function  referente(){    

            var jsonObj = {};
            jsonObj.action = "list";
             jsonObj.type = "referente_ditta";


            if(isNew){
                jsonObj.referente = parseInt($selReferente.val());
            }else{
                jsonObj.referente= parseInt(row.id_referente);
            }

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
                   $selReferente.empty();
                   $aa=$mydata.data;
                   $selReferente.append('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                      $selReferente.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["referente"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
               if(isNew){
                     $selReferente.val();//seleziona pr firenze 33
                }else{
                     $selReferente.val(parseInt(row.id_referente));//seleziona pr firenze 33

                }

                }
            });
            }   
                        
              
        //-------------------------------------event---------------------------------------------------------------
        this.$('#tipologia').change(function (e,value,row) {
           isNew=true;
            
            
            selTipoContratto();  
        }); 
        this.$('#tipo_contratto').change(function (e,value,row) {
           isNew=true;
            
            
            selCompagniaAssicurativa();  
        }); 
        this.$('#regione').change(function (e,value,row) {
            isNew=true;
            province();   
        });
        this.$('#provincia').change(function (e) {
            isNew=true;
            comuni();
        });
        this.$('#comune').change(function (e) {
            isNew=true;
            cap();
        });

        this.$('.email-Plus').click(function () {
                $iEmail = $iEmail + 1;
                $i = $iEmail

                $("#email").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeEmail'+$iEmail+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                     '</div>'
                      // '<hr class="style13">'   
                );
                $('.removeEmail'+$iEmail).children().each(function(){
                    $(this).click(function() {
                        $(this).closest(".row").remove();

                    });
                });

                $("#registrationForm").validate(); //sets up the validator

                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,

                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                              });

            }); 
        this.$('.telefono-Plus').click(function () {

                $iTel = $iTel + 1;
                $i = $iTel

                $("#telefoni").append(  


                    '<div class="row">'+
                        '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" >'+  

                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefono]" placeholder="Telefono" col-lg-7>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" placeholder="Nome Telefono">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeTel'+$iTel+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                    '</div>'
                    //   '<hr class="style13">'   
                );
                $("#registrationForm").validate(); //sets up the validator

                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                                minlength: 8,
                                number: true,

                                messages: {
                                  required: "Inserire numero del Telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono valido"
                                }
                              });
                $('.removeTel'+$iTel).children().each(function(){

                    $(this).click(function() {
                        $(this).closest(".row").remove();

                    });
                });

            }) ;
        //--------------------referenti  add-------------------------------------------
        this.$('.referente-Plus').click(function () {
                $iReferente = $iReferente + 1;
                $i = $iReferente

                $("#referente").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="referente['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-4">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][nome]" id="referente['+$i+'][nome]" placeholder="Nome Referente " require>'+
                        '</div>'+
                         '<div class="form-group col-lg-4">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][cognome]" id="referente['+$i+'][cognome]" placeholder="Cognome Referente " require>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="referente['+$i+'][mansione]" id="referente['+$i+'][mansione]" placeholder="Mansione">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeReferente'+$iReferente+'" href="javascript:" title="Delete Referente"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                     '</div>'
                      // '<hr class="style13">'   
                );
                $('.removeReferente'+$iReferente).children().each(function(){
                    $(this).click(function() {
                        $(this).closest(".row").remove();

                    });
                });

                $("#registrationForm").validate(); //sets up the validator

                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"referente["+$i+"][nome]\"]").rules( "add", {
                                required: true,
                                minlength: 2,


                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),

                                }
                              });
                           $("input[name=\"referente["+$i+"][cognome]\"]").rules( "add", {
                                required: true,
                                minlength: 2,


                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),

                                }
                              });

            }); //end referenti  add--------
        //------------------------------------------------------------------------------------------------------
        
        
        
        this.$("#fornitoreEdit").validate(); //sets up the validator
               
        $("input[name=\"name\"]").rules( "add", {
            required: true,
            messages: {
                required: "Required input"

            }
        });

       
        this.$('#btn'+tipoNome).click(function(e) {//
            
         
            if($("#fornitoreEdit").valid()){
 
                //--------------------------------------------------------------
              
              var API_URL = app.global.json_url + 'gap/';
 
               // var jsonObj ={};

               //jsonObj.action = row.id?"update":"add";
               // jsonObj.type = "type";

               // jsonObj.person = app.global.tokensCollection.first().get("id_person");
               // jsonObj = JSON.stringify(jsonObj);
               var  form_data1=new FormData($('#fornitoreEdit')[0]) ;  
           //    form_data.append("data_immatricolazione",moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD'));
               form_data1.append("action",row.id?"update":"add");
               form_data1.append("type",'fornitori');
               form_data1.append("person",app.global.tokensCollection.first().get("id_person"));
               console.log( form_data1);
           
                $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang")
                   // "Content-Type": "application/json"
                };
                
                    $.ajax({
                        url:app.global.json_url + 'gap/',
                        type:'post',
                        headers : $headers,

                        // data :  jsonObj,
                        // dataType : 'text',
                        data: form_data1,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,    
                        success: function (datap) {
                            console.log(datap.data);
                            $mydata =JSON.parse(datap);

                            //-------------------------------------------------------
                            if ($mydata.success){
                                // app.routers.router.prototype.data_type_edit();
                                console.log("ok");

                                e.currentTarget.dataset.tipo='fornitori';
                                
                            //   that.set(e);//
                                           bootbox.dialog({
                    title: "Update OK!",
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "Success",
                            className: "btn btn-success",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                
                            }
                        }
                    }
                });  

                               
                               
                             }else{
                                     bootbox.dialog({
                    title: "Attenzione!",
                    message: $mydata.message,
                    buttons: {
                        main: {
                            label: "Annulla",
                            className: "btn btn-danger",
                            callback: function() {
                                $("body").removeClass("modal-open");
                                
                            }
                        }
                    }
                });  
                                }
                        },
                        error: function (datap) {
                       console.log('error');
                            
                        }
                        });


                  
                }else{
                console.log("btnAlle invalid");  
            }


            }); 
       
       
       
      
  },
 
   
    render:function(){
    	$(this.el).html(this.template());
        var API_URL = app.global.json_url + 'gap/';
        console.log(API_URL);
        console.log(app.global.breadcrumb);
        var $counter=new Array();
        var jsonObj = {};
        
        var that=this;
        jsonObj.action = "list";
        jsonObj.type = 'counter';
        jsonObj.table = true;

        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        console.log(this.headerJson);
       
        $.ajax({
            url:app.global.json_url + 'gap/',
            type:'post',
            headers : this.headerJson(),
            data: jsonObj,
            dataType : 'text',
            success: function (json) {
                $mydata =JSON.parse(json);
                $data=$mydata.data[0];
                console.log($data.auto);
                that.$('.auto .counter-value').html(function(){
                    $(this).prop('Counter',0).animate({

                       Counter:  $data.auto

                    },{
                        duration: 3500,
                        easing: 'swing',
                        step: function (now){
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
                that.$('.km .counter-value').html(function(){
                    $(this).prop('Counter',0).animate({

                       Counter:  $data.km

                    },{
                        duration: 3500,
                        easing: 'swing',
                        step: function (now){
                            $(this).text( (Math.ceil(now)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                        }
                    });
                });
                   
             
            }  
        }); 
        console.log(app.global.nick_array);
        // console.log(tipiColl);
     
        
        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this;
    },
    
    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
    }
})//Backbone.View.extend({
return app.views.gap_adm;
});


