require(['app','bootbox'], function(app,bootbox){
    app.views.mag = Backbone.View.extend({
        initialize: function (e) {
            console.log("initializing mag view: ");
       
        },
        events: {
            "clickKK .update":"update",
            "click .create":"create",
           //"click .copy":"copy",
            "click #carico":"create_carico",
            "click #scarico":"create_scarico",
            "clickKKK-row.bs.table.update":"update",
            "click #magazzino":"magazzino_tab",
            "click #movimenti":"movimenti_tab",
            "click #fornitori_mag":"fornitori_tab",
            "click #categorie":"categorie_tab",
            "clickkkk-row.bs.table": "selRow",
            
            "click .contr-Plus":"addDoc",//viene chiamata da Nuovo mag
        
        },
      
        selRow: function (){
            console.log("click row table "+app.global.nick_array.arr);
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
        addDoc: function (e) {
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" >Nuovo BSA</li>'
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.routers.bsaRouter.prototype.bsa_edit();
    
            return;                   
     
           
        }, 
        magazzino_tab: function () {//anagrafica
            that=this;
            this.$('#magazzino_').empty();
            this.$('#fornitori_').empty();
            this.$('#categorie_').empty();
            this.$('#magazzino_').load('./js/templates/it/app.templates.mag_list.html', function() {
               
               
                that.magazzino();
            }); 
        },
        movimenti_tab: function () {//movimenti
            that=this;
            this.$('#magazzino_').empty();
            this.$('#fornitori_').empty();
            this.$('#categorie_').empty();
            this.$('#movimenti_').empty();
            this.$('#movimenti_').load('./js/templates/it/app.templates.mag_list.html', function() {
                $('#movimenti').tab('show');
                that.movimenti();
            }); 
        },
        fornitori_tab: function () {
            that=this;
            console.log("fornitori");
            this.$('#magazzino_').empty();
            this.$('#fornitori_').empty();
            this.$('#categorie_').empty();
            this.$('#movimenti_').empty();
            this.$('#fornitori_').load('./js/templates/it/app.templates.mag_list.html', function() {
                
                $('#fornitori_mag').tab('show');
                that.fornitori();
            });  
            
        },
        categorie_tab: function () {
            this.$('#magazzino_').empty();
            this.$('#fornitori_').empty();
            this.$('#categorie_').empty();
            this.$('#movimenti_').empty();
            this.$('#categorie_').load('./js/templates/it/app.templates.mag_list.html', function() {
              
                $('#categorie').tab('show');
                that.categorie();
            });  
            
        },
        copy: function (e,row,value) {//
            $action="post";
            $url=app.global.json_url+'mag/';

            that=this;   
            var API_URL =''; 
            console.log(e,row,value); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "copy";
            jsonObj.id = row.id;
            jsonObj.type = "mag_articolo";
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
                        that.magazzino(); 
                    }
                    else {
                        bootbox.dialog({
                            title: "Errore!",
                            message: $myData.message,
                            buttons: {
                                main: {
                                    label: "OK",
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
                    console.error("mag load table error!!!");
                }
            });
        },
        magazzino: function (that) {//richiesta dati per popolare tabella
            //-----------breadcrumb---------------------------------------------------------
            
            
            this.breadcrumb({breadcrumb: '<li ><a  href="#it/mag/1" >Magazzino</a></li>'});
            
            
            //------------------------------------------------------------------------------
            this.$('.panel-heading').empty().append('<h3>Magazzino</h3>');
            this.$('.toolbar').empty().append('<a class="create  btn btn-default" >Nuovo Articolo</a>');
            $('#magazzino').tab('show');
            app.global.nick_array.arr="rfa_magazzino";
            $action="post";
            $url=app.global.json_url+'mag/';

            that=this;   
            var API_URL =''; 
            console.log(app.global.sub); 
             
            API_URL=$url;
            var jsonObj = {};
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "rfa_magazzino";
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
                        that.hrTable($myData); 
                    }
                    else {
                        bootbox.dialog({
                            title: "Errore!",
                            message: $myData.message,
                            buttons: {
                                main: {
                                    label: "OK",
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
                    console.error("mag load table error!!!");
                }
            });
            }, //end 
        movimenti: function (that) {//richiesta dati per popolare tabella
                //-----------breadcrumb---------------------------------------------------------
                this.breadcrumb({breadcrumb: '<li><a href="#it/mag/2" >Movimenti</a></li>'});
                //------------------------------------------------------------------------------
                this.$('.panel-heading').empty().append('<h3>Movimenti</h3>');
                this.$('.toolbar').empty().append('<a class="btn btn-default" id="carico">Nuovo Carico</a>  <a class="btn btn-default" id="scarico">Nuovo Scarico</a>');
                app.global.nick_array.arr="rfa_movimenti";
                $action="post";
                $url=app.global.json_url+'mag/';
    
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                 
                API_URL=$url;
                var jsonObj = {};
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                jsonObj.action = "list";
                jsonObj.type = "rfa_movimenti";
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
                            that.hrTable($myData); 
                        }
                        else {
                            bootbox.dialog({
                                title: "Errore!",
                                message: $myData.message,
                                buttons: {
                                    main: {
                                        label: "OK",
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
                        console.error("mag load table error!!!");
                    }
                });
                }, //end     
        fornitori:function(){ 
            console.log("fornitori_func");
            app.global.nick_array.arr="rfa_magazzino_fornitori";
            //-----------breadcrumb---------------------------------------------------------
            
            
            //this.breadcrumb({breadcrumb: '<li><a href="#it/mag"  class="breadcrumb-item active">Fornitori</a></li>'});
            this.breadcrumb({breadcrumb: '<li  ><a href="#it/mag/3">Fornitori</a></li>'});
            
            //------------------------------------------------------------------------------
             
            this.$('.panel-heading').empty().append('<h3>Fornitori</h3>');
            this.$('.toolbar').empty().append('<a class="create  btn btn-default" >Nuovo Fornitore</a>');
            that=this;
            $url=app.global.json_url+'mag/';
            
            $appendTool='';
            
            
            //-----call 
    
            var jsonObj = {};
    
            jsonObj.action = "list";
            jsonObj.type = "rfa_magazzino_fornitori";
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");

            jsonObj = JSON.stringify(jsonObj);


            console.log("API_URL="+$url);
            $.ajax({
                url:$url,
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
                        $myData=$mydata.data;
                        that.hrTable($mydata);
                        
                        
                        
                    }else 
                    {
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

                    console.error("hr list load table error!!!");
                }
            });
        },
        categorie: function(){ 
            that=this;
            //-----------breadcrumb---------------------------------------------------------
            
            
            that.breadcrumb({breadcrumb: '<li><a  href="#it/mag/4" >Categorie</a></li>'});
            
            //------------------------------------------------------------------------------
            this.$('.panel-heading').empty().append('<h3>Categorie</h3>');
            this.$('.toolbar').empty().append('<a class="create  btn btn-default" >Nuova Categoria</a>');
            app.global.nick_array.arr="rfa_magazzino_categorie";
            
            /*
            that.$("#magazzinoF_").click(function () {
                app.global.nick_array.arr="rfa_magazzino";
                rfa_magazzino(that);
            });
            that.$("#fornitori_").click(function () {
                app.global.nick_array.arr="rfa_magazzino_fornitori";
                fornitori_click(that);

            });*/
                //-----call 
        
            var jsonObj = {};
            
            jsonObj.action = "list";
            jsonObj.type = "rfa_magazzino_categorie";
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.id_person = app.global.tokensCollection.first().get("id_person");

            jsonObj = JSON.stringify(jsonObj);

            API_URL=app.global.json_url+'mag/';
            console.log("API_URL="+API_URL);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : this.headerJson(),
                data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    // $mydata =(datap);

                    console.log( ($mydata.message));
                    //-------------------------------------------------------

                    if ($mydata.success){
                        $myData=$mydata.data;
                        
                        if($mydata.tab){
                            $tab=$mydata.tab;
                            console.log('tab='+$tab); 
                                $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                                that.hrTable($mydata);
                        }else{
                            var xx=null//tab
                
                            that.hrTable(xx);
                        }
                        
                        
                    }else 
                    {
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

                    console.error("hr list load table error!!!");
                }
            });
        },
        hrTable_: function (my) {//popola tabella con i dati ricevuti
            that=this;
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents = {
                'click .download': function (e, value, row,index) {
                    //app.global.nick_array.id=row.id;
                    console.log(row)  ;  	
                    
                    jsonObj = {};
                    jsonObj.action = "download";
                    jsonObj.id=row.id;
                    jsonObj.tipo=row.tipo;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
    
                    $.ajax({
                        url: app.global.json_url + 'mag/doc/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $mydata =JSON.parse(datap);
                            console.log($mydata);
                            var link = document.createElement("a");
                            link.download = $mydata.name;
                            // Construct the uri
    
                            link.href = $mydata.file;
                            document.body.appendChild(link);
                            link.click();
                            // Cleanup the DOM
                            document.body.removeChild(link);
                        //  window.open($mydata.file,'_blank');
                            //   window.location.href=$mydata.file;
    
    
    
                                },
                            error: function () {
    
                                console.log("Download item error!");
                                            }
                    });
    
                    
                    
                    
                },
                
                'click .view': function (e, value, row,index) {
                    console.log(row.id_person+"index"+index)  ;  	
                    console.log($mydata.data)  ;  
                    console.log("row="+_.keys(row))  ; 
                    
                    console.log("id="+row.id_archivio);
                    
                    jsonObj = {};
                    jsonObj.action = "download";
                    jsonObj.id=row.id;
                    jsonObj.tipo=row.tipo;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
    
                    $.ajax({
                        url: app.global.json_url + 'mag/doc/',
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (datap) {
                            $mydata =JSON.parse(datap);
                            console.log($mydata);
                            
                        window.open($mydata.file,'_blank');
                        // window.location.href=$mydata.link;
                        
                            
    
    
    
                                },
                            error: function () {
    
                                console.log("Download item error!");
                                            }
                    });
    
                    
                    
                },
                'click .remove': function (e, value, row,index) {
                    console.log("id="+row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "delete";
                        jsonObj.id=row.id;
                        jsonObj.type="ci";
                        jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'asa/ci/',
                            type:'post',
                            headers : $headers,
                            data :  jsonObj,
                            dataType : 'text',
                            success: function (datap) {
                                $mydata =JSON.parse(datap);
                                    bootbox.dialog({
                        title: "Delete item successful!",
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: "OK",
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.asaRouter.prototype.asa_cd_anziani_list();
                                }
                            }
                        }
                    });
                                
                             //   $table.bootstrapTable('refresh',  that.selCall(that));
    
                            },
                            error: function () {
    
                                    console.log("Delete item error!");
                            }
                        });
    
                    }
                },//remove 
                'click .edit': function (e, value, row,index) {
                    console.log(row);
                    app.global.nick_array.row=row;
                    app.global.breadcrumb.push({
                   
                        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.last_name+" "+row.first_name+'</li>'
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.asaRouter.prototype.asa_cd_anziani_edit();
                  
                }   
                
            };
            $table =  that.$("#table"); 
            //that.$(".toolbar").empty().append(my.newR); 
            $format=my.format;
            if(typeof my.newR !== 'undefined'){
                this.$("#newR").append(my.newR);
                app.global.nick_array.newR=my.newR;
            }
            $.each( my.data, function( key, value1 ){
            
                if(typeof(value1["data_doc"]) !== "undefined" && value1["data_doc"] !== null){    
                    value1["data_docT"]='<span>'+moment(value1["data_doc"]).format('YYYYMMDD')+'</span>'+moment(value1["data_doc"]).format('MM/YYYY');
                    value1["data_doc"]=moment(value1["data_doc"]).format('DD/MM/YYYY');
                    
                }
            });  
            $.each( my.tab, function( key, value1 ){


                if(value1["cellStyle"]=="cellStyle"){
    
                    value1["cellStyle"]=cellStyle;
                }
                
                    if(value1["formatter"]=="actionFormatter"){
    
                    value1["formatter"]=actionFormatter;
                }
                if(value1["events"]=="actionEvents"){
    
                    value1["events"]=actionEvents;
                }
    
            });              
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                search: true,
                pagination: true
            });
            this.$("#countSer").prepend(' '+my.data.length);
            function actionFormatter(value) {
                return [$format
                            ].join('');
            } 
           
                
        },
        breadcrumb:function($bread){
            
            while (app.global.breadcrumb.length>1) {
                
                app.global.breadcrumb.pop();
            }
            
            app.global.breadcrumb.push($bread);
            
            this.$(".breadcrumb").empty();

            for (var i = 0; i < app.global.breadcrumb.length; i++) {
                
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
                
            } 
            
        },
        
        hrTable:function ($data){
            console.log($data);
            var  $myData=$data.data;
            var   $tab=$data.tab;
            var actionFormatter=$data.format;
            c1=' <button href="'+$data.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
            // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
                id=this.id;
      
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
      
                excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');
    
            });
            $.each( $myData, function( key, value1 ){
              //  console.log("id="+value1["id"]+"data_acquisto="+value1["data_acquisto"]);
              if(typeof(value1["data_acquisto"]) !== "undefined" && value1["data_acquisto"] !== null && value1["data_acquisto"] !== ""){    
                 //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                  value1["data_acquistoT"]='<span>'+moment(value1["data_acquisto"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_acquisto"]).format('DD/MM/YYYY');
        
               //   value1["data_acquisto"]=moment(value1["data_acquisto"]).format('DD/MM/YYYY');
                 
              }
              if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                  //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
              
                  value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
        
                  value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
    
              }
              if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
                value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
                value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
               
            }
            });
            this.$('#list').empty();
            this.$('#list').text("Ci sono "+$myData.length+" items");
            function cellStyle(value, row, index) {

                return {css: 
                       //{"background-color": row.name_cell_color}
                       {"background-color":  row.stato_color}
                   };
    
    
    
    
            }  
         
           
            $.each($tab, function( key, value1 ){
              
          
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
          
            this.$('#table').bootstrapTable('destroy');
            this.$('#table').bootstrapTable({
                columns: $tab,
                data: $myData,
                filterControl:true,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: true,
                pageSize:"25"
            });
          
         
       
        },
        hrTable_rfa_magazzino_fornitori:function ($myData,$tab,$format){
            c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
        // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
        this.$("#downFile").empty();  
        this.$("#downFile").append(c1); 
        this.$('#excel').click(function () {
        id=this.id;
        
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
          d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
        excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');
        
        });
          $.each( $myData, function( key, value1 ){
        
              if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                 //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                  value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
        
                  value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                 
              }
              if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                  //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
              
                  value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
        
                  value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
        
              }
          });
          this.$('#rfaCount').empty();
          this.$('#rfaCount').text("Ci sono "+$myData.length+" Fornitori Magazzino");
          this.$('#tableR').empty();
         
          $.each( $myData, function( key, value1 ){
        
          if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
              value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
              value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
             
          }
          
         
        
        });    
          $.each($tab, function( key, value1 ){
              
          
          if(value1["cellStyle"]=="cellStyle"){
        
              value1["cellStyle"]=cellStyle;
          }
           if(value1["events"]=="actionEvents"){
        
              value1["events"]=actionEvents;
          }
           if(value1["formatter"]=="actionFormatter"){
        
              value1["formatter"]=$format;
          }
        
        });  
          
          this.$('#tableR').bootstrapTable('destroy');
           this.$('#tableR').bootstrapTable({
              columns: $tab,
              data: $myData,
              showColumns: true,
              showRefresh: true,
              search: true,
              pagination: true,
             pageSize:"25"
          });
          this.$('.remove').remove();
          this.$('.setEmail').remove();
        
        },
        
        update: function (e, row, value) {
            console.log("update "+app.global.nick_array.arr,app.global.nick_array,row);
            switch (app.global.nick_array.arr){
                case "rfa_magazzino":{
                    console.log("magazzino",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                   // app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
                case "rfa_magazzino_categorie":{
                    console.log("categorie",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li ><a class="breadcrumb-item active" href="#it/mag_edit/'+row.id+'" >'+row.descrizione+'</a></li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    break;
                }
                case "rfa_magazzino_sub_categorie":{
                    console.log("sub_categorie",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li ><a class="breadcrumb-item active" href="#it/mag_edit/'+row.id+'" >'+row.descrizione+'</a></li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit(row.id);
            
                    break;
                }
                case "rfa_magazzino_fornitori":{
                    console.log("fornitori",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li >'+row.name+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
              
            }
      
        },
        remove: function (e, row, value) {
            that=this;
            console.log("id="+row.id);
            var $titleMsg,$msg,$type="";
            var API_URL = app.global.json_url + 'mag/';
            switch (app.global.nick_array.arr){
                case "rfa_movimenti":{
                    console.log("movimento",row.id);
                    app.global.nick_array.row=row;
                    $tipoTab=2;
                    $type="movimento";
                    $titleMsg="Rimozione  Movimento: "+row.descrizione;
                    $msg="Vuoi rimuovere il Movimento?";
                     
                    break;
                }
                case "rfa_magazzino":{
                    console.log("magazzino",row.id);
                    app.global.nick_array.row=row;
                    $tipoTab=1;
                    $type="articolo";
                    $titleMsg="Rimozione  Articolo: "+row.descrizione;
                    $msg="Vuoi rimuovere l'Articolo?";
                     
                    break;
                }
                case "rfa_magazzino_categorie":
                case "rfa_magazzino_sub_categorie_":{
                    console.log("categorie",row);
                    $tipoTab=4;
                    $type="categoria";
                    $titleMsg="Rimozione  Categoria "+row.descrizione;
                    $msg="Vuoi rimuovere la Categoria?";
                    break;
                }
                case "rfa_magazzino_fornitori_":{
                    console.log("fornitori",row.id);
                    app.global.nick_array.row=row;
                    var $bread='';
                    
                        $bread='<li >'+row.name+'</li>';
                      
                    
                    app.global.breadcrumb.push({
                           
                        breadcrumb: $bread
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.routers.magRouter.prototype.mag_edit();
            
                    return;  
                  
                break;
                }
              
            }
            bootbox.confirm({
                title: $titleMsg,
                message: $msg,
                buttons: {
                confirm: {
                label: 'Yes',
                className: 'btn-success'
                },
                cancel: {
                label: 'No',
                className: 'btn-danger'
                }
                },
                callback: function (result) {
                    if (result){
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = $type;
                    jsonObj.id=row.id;
                    jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : that.headerJson(),
                        data :  jsonObj,
                        dataType : 'text',
                        success: function (data) {
                            $data =JSON.parse(data);
                            bootbox.alert({ 

                                title: $titleMsg,
                                message:  $data.message,
        
                                callback: function() {
                                    console.log("tipo_tab="+$tipoTab);
                                    app.routers.magRouter.prototype.mag("it",$tipoTab);//3 fornitori
                                 
                            }
                            });
                           
    
                        },
                        error: function () {
    
                            bootbox.alert({ 

                                title: $titleMsg,
                                message:  "Qualcosa è andato storto!",
        
                                callback: function() {
                                    
                                    app.routers.magRouter.prototype.mag("it",$tipoTab);//3 fornitori
                                 
                            }
                            });
                        }
                    });
                    }
                }
            });  
        },
        'create': function (e, value, row) {
            
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            switch (app.global.nick_array.arr){
                case "rfa_magazzino_fornitori":
                $bread='<li>Nuovo Fornitore</li>';
                break;
                case "rfa_magazzino":
                $bread='<li>Nuovo Articolo</li>';
                break;
                case "rfa_magazzino_categorie":
                $bread='<li>Nuova Categoria</li>';
                break;
            }
            
            app.global.breadcrumb.push({
                   
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.global.nick_array.event="create"
            app.routers.magRouter.prototype.mag_edit();
    
            return;  
        }, 
        'create_carico': function (e, value, row) {
            app.global.nick_array.arr=app.global.nick_array.arr+"_carico";
            console.log("create "+app.global.nick_array.arr)
            
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" >Nuovo Carico Magazzino</li>'
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.routers.magRouter.prototype.mag_edit();
    
            return;  
        },
        'create_scarico': function (e, value, row) {
            app.global.nick_array.arr=app.global.nick_array.arr+"_scarico";
            console.log("create "+app.global.nick_array.arr)
           
            app.global.breadcrumb.push({
                   
                breadcrumb: '<li class="breadcrumb-item active" href="" >Nuovo Scarico Magazzino</li>'
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.routers.magRouter.prototype.mag_edit();
    
            return;  
        },       
     
render: function (adr) {
    $(this.el).html(this.template());
     console.log("adr="+adr); 
    // adr="1";
    //-----------breadcrumb---------------------------------------------------------
    /*
    while (app.global.breadcrumb.length>2) {
        app.global.breadcrumb.pop();
    }
    for (var i = 0; i < (app.global.breadcrumb).length; i++) {
        this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
    } */
    //--------mag_tab default magazzino---------------------------------------------
    that=this       
    console.log(app.global.nick_array.arr,that);
    /*
    switch(app.global.nick_array.arr){
        case "rfa_magazzino_fornitori":
            console.log("fornitori")
            this.$("#fornitori").show();
          //  this.fornitori_tab(that);
        break;
        default:
            console.log("def magazzino")
          //  this.magazzino_tab(that);
          this.$("#movimenti").show();
    }
    */
   switch (Number(adr)) {
    case 1://magazzino
        this.magazzino_tab(that);
        break;
    case 2://mmovimenti
        this.movimenti_tab(that);
        break;
    case 3://fornitori
        this.fornitori_tab(that);
        break;
    case 4://categorie
        this.categorie_tab(that);
        break;         
   
    default:
        this.magazzino_tab(that);
        break;
   }
    
    window.actionEvents = {
       
             'click .update': function (e, value, row) {
                console.log(e, value, row,app.global.nick_array);
                app.global.nick_array.new=false;
                app.global.nick_array.event="update"
                that.update(e, row,value );
                return;   
          
      
        },
        'click .copy__': function (e, value, row) {
            console.log(e, value, row,app.global.nick_array);
            app.global.nick_array.new=false;
            app.global.nick_array.event="copy"
            that.update(e, row,value );
            return;   
      
  
        },
        'click .copy': function (e, value, row) {
            console.log(e, value, row,app.global.nick_array);
            app.global.nick_array.new=false;
            app.global.nick_array.event="copy"
            that.copy(e, row,value );
            return;   
      
  
        },
        'click .remove': function (e, value, row) {
            
            that.remove(e, row,value );
            return;   
            console.log(app.global.nick_array.arr);
            $lblAlert="";
            switch (app.global.nick_array.arr){
                
                case "adm_tutorial":{//uso il form per uniformità delle altre call update add in tutorial
                     console.log(row);    
                    //API_URL=app.global.json_url + 'tutorial/';      
                    $lblAlert="Tutorial"   
                    if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                       
                        var form_data = new FormData();
                      form_data.append('id', row.id);
                      
                        form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                
                        
                        form_data.append('action', 'del');
                        form_data.append('type', app.global.nick_array.arr);


                        $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        //"username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                        //"Content-Type": "application/json"
                    };
                        $.ajax({
                            url: app.global.json_url + 'tutorial/',
                            type:'post',
                            headers : $headers,

                            //data :  jsonObj,
                            //dataType : 'text',
                            data: form_data,
                            contentType: false,       // The content type used when sending data to the server.
                            cache: false,             // To unable request pages to be cached
                            processData:false,        // To send DOMDocument or non processed data file it is set to false       
                            success: function (datap) {
                                console.log(datap);
                                $mydata =JSON.parse(datap);

                                //-------------------------------------------------------
                                if ($mydata.success){
                                     
                               

                                showAlert('Delete item successful!', 'success');
                              
                                $table.bootstrapTable('refresh',  setTab());
                                //  hrTable($mydata);
                            }else {
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
                               // console.log("refre");
                               // $table.bootstrapTable('refresh',  callList());
                            }
                                }
                        });
                    }return;
                break;}
                 case "rfa_tipologie_fornitori_ag":
                     API_URL=app.global.json_url + 'rfa/'; 
                    $lblAlert="Tipo di fornitura"
                break;
                default://servizi
                    $lblAlert="Servizio"
                
            }
            if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                var jsonObj = {};
                jsonObj.action = "del";
                jsonObj.type = app.global.nick_array.arr;
                //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.data = row;
                jsonObj = JSON.stringify(jsonObj);
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
               
                    success: function (datap) {
                        console.log(datap);
                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata.message));
                        if($mydata.error){
                            bootbox.dialog({
                            // title: that.language.header_hr_message,
                                title:  $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-info",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            //hrTable($mydata);
                                            app.routers.adminTecRouter.prototype.data_type_edit();
                                        }
                                    }
                                }
                            });    
                            //showAlert($mydata.message, 'danger');
                        }else{
                            //showAlert('Delete item successful!', 'success');
                            //showAlert($mydata.message, 'success');
                             bootbox.dialog({
                            // title: that.language.header_hr_message,
                                title:  $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-info",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                            //hrTable($mydata);
                                            app.routers.adminTecRouter.prototype.data_type_edit();
                                        }
                                    }
                                }
                            });  
                           
                        }
                   //app.routers.adminTec.prototype.data_type_edit();
                    //    $table.bootstrapTable('refresh',  setTab());
                    },
                    error: function () {
                        showAlert('Delete item error!', 'danger');
                    }
                })
            }
        }, //remove
       
    };
},
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.bsa_listView=null
    }
    });    
return app.views.mag;
});    