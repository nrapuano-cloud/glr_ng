require(['app','bootbox','he'], function(app,bootbox,he){
    app.views.attrezzature_categorie = Backbone.View.extend({
        initialize: function () {
            console.log("initializing attrezzature_edit: ");
      
        },
     
        events: {
            "click .create":"create",
           
        },
        'create': function (e, value, row) {
            
            console.log("create "+app.global.nick_array.arr)
            var $bread='';
            switch (app.global.nick_array.arr){
                case "ADM_Attrezzature_Categorie":
                $bread='<li class="breadcrumb-item active" href="" >Nuova Categoria</li>';
                break;
            }
            
            app.global.breadcrumb.push({
                   
                breadcrumb: $bread
            });
            console.log(app.global.breadcrumb);
            app.global.nick_array.new=true;
            app.global.nick_array.sub=false;
            console.log("new="+app.global.nick_array.new,"sub="+app.global.nick_array.sub,);
            app.routers.adminTecRouter.prototype.attrezzature_categorie_edit();
    
            return;  
        }, 
        categorie: function(){ 
            that=this;
            //-----------breadcrumb---------------------------------------------------------
            
            
            that.breadcrumb({breadcrumb: '<li><a  href="#it/attrezzature_categorie/4" >Categorie Attrezzature Impianti</a></li>'});
            
            //------------------------------------------------------------------------------
            this.$('.panel-heading').empty().append('<h3>Categorie</h3>');
            this.$('.toolbar').empty().append('<a class="create  btn btn-default" >Nuova Categoria</a>');
           
            var jsonObj = {};
            
            $url=app.global.json_url+'servizi/';
            API_URL=$url;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "get";
            jsonObj.tab = "adm_attrezzature_categorie";
            jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
            jsonObj.type = "attrezzatura_categorie";
           
            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:API_URL,
                type:'post',
                headers : this.headerJson(),
                data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    
                    if ($mydata.success){
                        $myData=$mydata.data;
                        
                        if($mydata.tab){
                            $tab=$mydata.tab;
                            console.log($tab); 
                           if($myData.length>1){
                            $('#list').text("Ci sono "+$myData.length+" categorie"); 
                           
                           }else{
                            $('#list').text("C'è' "+$myData.length+" categoria"); 
                           }
                               
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
   
        sub_cat: function (that,$id) {//

            console.log($id);
            var $selSubCat=that.$("#id_sotto_categoria");

            if($id !== ""){
                $action="post";
                $url=app.global.json_url+'bsa/';
                
                $selSubCat.empty();
                that=this;   
                var API_URL =''; 
                console.log(app.global.sub); 
                    
                API_URL=$url;
                var jsonObj = {};
                jsonObj.action = "list";
                jsonObj.sub_area = app.global.sub;
                jsonObj.type = "bsa_sub_categorie";
                jsonObj.id_categoria = $id;
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                
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
                            var $ifcat=$myData.ifcat;
                            var $ifsubcat=$myData.ifsubcat;
                            $selSubCat.append('<option value="">Seleziona una Sotto Categoria</option>');
                            $.each($myData.data, function(i, value) {
                               
                                $selSubCat.append('<option value="'+value.id+'">'+value.descrizione+'</option>');
                                
                            });
                            
                            if(!$new){ 
                                console.log(app.global.nick_array.row.id_sotto_categoria);
                                $selSubCat.val(app.global.nick_array.row.id_sotto_categoria).change();
                                scheda_out(app.global.nick_array.row.id_sotto_categoria);
                            }
                            $selSubCat.change(function (e) {
                                console.log(e);
                                if(e.currentTarget.value!==""){
                                    console.log(e,$ifcat,$ifsubcat,e.currentTarget.value);
                                    scheda_out(e.currentTarget.value);
                                    }else{
                                        that.$("#step2").empty();
                                    }
                            });
                            function scheda_out($id_sub){
                                var $tt="";
                               
                              console.log($ifcat,$ifsubcat,$id_sub);
                              // if($ifcat.includes(that.$("#id_categoria").val()) && ($ifsubcat.includes(that.$("#id_sotto_categoria").val()))){
                                if(1==1){
                           
                                    $tt=that.$("#id_sotto_categoria :selected").text();
                                    switch(app.global.nick_array.arr){
                                        case "bsa":
                                            var ob1 ;
                                            var ob = _.mapObject($myData.data, function(item) {
                                            //  console.log(item.id,e.target.value);
                                                if(item.id==$id_sub){
                                                console.log(item.id,$id_sub,item);
                                                ob1=item.campi_specifici;
                                                }
                                            });
                                            app.global.nick_array.campi_specifici=ob1;
                                            if(!$new){
                                                that.$('#step2').empty().load('./js/templates/it/app.templates.bsa_anagrafica_edit.html', function() {
                                                    that.bsa_populate_form();
                                                });
                                             }else{
                                                that.$('#step2').empty().load('./js/templates/it/app.templates.bsa_anagrafica.html', function() {
                                                // that.$('#step11').empty()
                                                that.bsa_tipo_fornitori(that);
                                                
                                            }); 
                                        }
                                    break;
                                    }
                                    
                                }else{
                                    $tt="SCHEDA in lavorazione"
                                }
                                that.$("#step2").empty().append(
                                    $tt
                                    );
                            }

                        }
                        else {
                            bootbox.dialog({
                                title: "Error",
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
                        console.error("bsa sub_categorie error!!!");
                    }
                });
            }else{
                $selSubCat.empty();
            }
        },
            
        hrTable: function(data){
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            window.actionEvents = {
                'click .remove': function (e, value, row,index) {
                   
                    console.log(row);
                    if (confirm('Are you sure to delete this item?')) {
                        jsonObj = {};
                        jsonObj.action = "del";
                        jsonObj.id=row.id;
                        jsonObj.type=app.global.nick_array.arr;
                        jsonObj.tab=app.global.nick_array.arr;
                        jsonObj.person = app.global.tokensCollection.first().get("id_person");
                        jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");
                        jsonObj = JSON.stringify(jsonObj);
                        
                        $.ajax({
                            url: app.global.json_url + 'servizi/',
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
                                    app.routers.adminTecRouter.prototype.attrezzature_categorie();
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
                'click .update': function (e, value, row,index) {
                    console.log(row);
                    app.global.nick_array.row=row;
                    app.global.breadcrumb.push({
                   
                        breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.descrizione+'</li>'
                    });
                    console.log(app.global.breadcrumb);
                    app.global.nick_array.new=false;
                    app.global.nick_array.sub=false;
                    app.global.nick_array.arr="adm_attrezzature_categorie"
                    console.log("new="+app.global.nick_array.new,"sub="+app.global.nick_array.sub,);
                    app.routers.adminTecRouter.prototype.attrezzature_categorie_edit();
                  
                }   
                
            };
            $table =  that.$("#table"); 
            $table.bootstrapTable('destroy');
            if(data.tab!==null && data.tab!==undefined){

                $.each(data.tab, function( key, value1 ){
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
                $table.empty();
                $table.bootstrapTable({
                    data: data.data,
                    columns: data.tab
                });
            }else{
               $table.bootstrapTable({data: data.data});  
            }
            function actionFormatter() {
                return [data.format].join('');
            }
            
        },
      
        invio: function () {
            console.log("invio")
            $new=app.global.nick_array.new;
            $("#edit").validate(); //sets up the validator

          
            $("input[name=\"first_name").rules( "add", {
                required: true,
                //number: true,
                // minlength: 2,
 
                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            $("input[name=\"last_name").rules( "add", {
                 required: true,
                 //number: true,
                 // minlength: 2,
 
                 messages: {
                     required: "Required input"
                     //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                     // number:"Inserire un numero!"
                 }
             });
             $("input[name=\"codice_fiscale").rules( "add", {
                required: true,
                //number: true,
                // minlength: 2,

                messages: {
                    required: "Required input"
                    //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                    // number:"Inserire un numero!"
                }
            });
            console.log($("#servizio").val(),$new);
          
            if($("#edit").valid()){
                $("#invio").prop( "disabled", true );
                var form_data = new FormData($('#edit')[0]); 
                var API_URL = app.global.json_url + 'bsa/'; 
                form_data.append('type', 'bsa');
                form_data.append('id_person', app.global.tokensCollection.first().get("id_person"));
                if(!$new){
                    form_data.append('action', 'update');
                }else{
                    form_data.append('action', 'add');
                }
            

                var formDataObj = Object.fromEntries(form_data.entries());
                console.log(formDataObj);
        
                $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,
                    
                    };
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data: form_data,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData:false,        // To send DOMDocument or non processed data file it is set to false    
                    beforeSend : function(){
                        //$("#preview").fadeOut();
                        $("#err").fadeOut();
                    },
                    success: function(data){
                        $mydata =JSON.parse(data);
                        console.log("success");
                        if (!app.global.nick_array.arr){
                            bootbox.alert({ 
                                title: "Nuovo BSA",
                                message:  $mydata.message,
        
                                callback: function() {
                                    app.routers.bsaRouter.prototype.bsa_list();
                                }
                            });
                        }else{
        
                            bootbox.alert({ 
    
                                title: "Update BSA",
                                message:  $mydata.message,
            
                                callback: function() {
                                    app.routers.bsaRouter.prototype.bsa_list();
                                }
                            });
                        }
        
        
                    },
                    error: function(e) {
                        $("#err").html(e).fadeIn();
                    }
                });
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
        breadcrumb:function($bread){
            
            while (app.global.breadcrumb.length>1) {
                
                app.global.breadcrumb.pop();
            }
            
            app.global.breadcrumb.push($bread);
            console.log(app.global.breadcrumb);
            this.$(".breadcrumb").empty();

            for (var i = 0; i < app.global.breadcrumb.length; i++) {
                
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
                
            } 
            
        },
        render: function () {     
            $(this.el).html(this.template()); 
            console.log( app.global.nick_array);
            //-----------breadcrumb-------------------------------------------------------
            while (app.global.breadcrumb.length>2) {
                app.global.breadcrumb.pop();
            }
            for (var i = 0; i < (app.global.breadcrumb).length; i++) {
                this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
            } 
            //----------------------------------------------------------------------------
                var that=this; 
            //--------attrezzature_tab default anagrafica---------------------------------------------
                this.categorie(that);
              
  
    },
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.attrezzature_categorie_editView=null
    }
});
return app.views.attrezzature_categorie;
});