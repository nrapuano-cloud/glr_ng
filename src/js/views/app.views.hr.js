require(['app','bootbox'], function(app,bootbox){
app.views.hr=Backbone.View.extend(
{
    
    initialize:function(){
    
    	
    	console.log("initializing hr view")},
    	
  

    render:function(e){
     
     
        $(this.el).html(this.template());
        var $headers={};
    	var $mydata=[];
    	var API_URL = app.global.json_url + 'persons/';
        
        var $table=this.$('#table');//.bootstrapTable({url: API_URL});
        var $modal =this.$('#modal').modal({show: false}),
            $alert = $('.alert').hide(); 
        var $titleReparto="";
        if(app.global.nick_array.arrSearchText==null){app.global.nick_array.arrSearchText=""};
       
       if(app.global.breadcrumb.length>1){
        app.global.breadcrumb.pop();
       }
       for(i=0; i<app.global.breadcrumb.length; i++){
       this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
       }
      this.$("#new").html(this.language.new);
    // this.$(".active").html(app.global.breadcrumb);
    var that = this;
        callList("Tutti");
       
        function  callList($typeReparto){
      
            var $action="list";
            var $type="person";
            var $person = app.global.tokensCollection.first().get("id_person");
            var $role=app.global.tokensCollection.first().get("nvbr");
            
          
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            console.log("API_URL="+API_URL);
            $.ajax({
                url:API_URL+$action+"/"+$type+"/"+$person+"/"+$typeReparto+"/",
                type:'get',
                headers : $headers,
                //data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    // $mydata =(datap);
                 
                    console.log( ($mydata.message));
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
                   
                    console.error("hr list load table error!!!");
                }
            });
  
        }

      this.$('input[type="radio"]').on('change', function(e) {
            //$('#manutenzione').change(function (e) {
          // alert(_.keys(e)+" - "+" - "+$('input[name=manutenzione]:checked').val()); 
            if(e.target.value==1){
               this.$titleReparto="In Infanzia ci sono ";
              //$('#titleTipo').text("In Infanzia ci sono ");
               callList("Infanzia");
               
               
            }else if(e.target.value==2){
              titleReparto="In Sociale ci sono "; 
              //that.$('#titleTipo').text("In Sociale ci sono ");
               callList("Sociale");
              
            }else if(e.target.value==3){
              titleReparto="In Tecnostruttura ci sono ";
             // $('#titleTipo').text("In Tecnostruttura ci sono "); 
              callList("Tecnostruttura");
               
            
             }else if(e.target.value==4){
                  titleReparto="Complessivamente ci sono ";
               //$('#titleTipo').text("Complessivamente ci sono "); 
               callList("Tutti");
               
            }
         
           
        });
        
        function  hrTable(my){
        // console.log("my0="+my.data[0].id_user);
            for(i=0; i<my.data.length; i++){
                if (my.data[i].id_user===null){
                    my.data[i].id_user="NO";
                }else{
                    my.data[i].id_user="SI";
                }
            }
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                searchText:app.global.nick_array.arrSearchText
            });
            $('#titleTipo').text($titleReparto+my.data.length+" persone. ");
            $('#titleTipoFilter').empty(); 
            $('#titleTipoFilter').append(" di cui "+$table.bootstrapTable('getData').length+" filtrati con '"+app.global.nick_array.arrSearchText+"'");
            console.log(my.data);
       
        }
 //------------------------------------------------------------------------       
    
     // create event
   
    $table.on('search.bs.table', function (t,e ) {
         console.log(e )  ;
         $('#titleTipoFilter').empty(); 
        $('#titleTipoFilter').append(" di cui "+$table.bootstrapTable('getData').length+" filtrati con '"+e+"'");
});
        
        
    
        this.$('#titleTipo').append($table.bootstrapTable('getData').length);
      
    
        this.$('.create').click(function () {
          
        	 app.global.nick_array.hr="New";
        	 app.global.hrView.destroy_view();  
        	 app.routers.hrRouter.prototype.hr_edit();
            
        });
        
        $modal.find('.genPw').click(function (){
       
            pwcod=generatePassword(8)
            //alert(generatePassword(8));
            $modal.find('input[name="codice"]').val(pwcod); 
            
        });
        
        function generatePassword(passwordLength) {
            var numberChars = "0123456789";
            var extrarChars = "@+-.*#";
            var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var lowerChars = "abcdefghiklmnopqrstuvwxyz";
            var allChars = numberChars + upperChars + lowerChars;
            var randPasswordArray = Array(passwordLength);
            randPasswordArray[0] = numberChars;
            randPasswordArray[1] = upperChars;
            randPasswordArray[2] = lowerChars;
            randPasswordArray[3] = extrarChars;
            randPasswordArray = randPasswordArray.fill(allChars, 4);
            return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
        }

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }     
             
             
        $modal.find('.submit').click(function () 
            {
            var row = {};

            $modal.find('input[name]').each(
            function () {
                  
                
                     row[$(this).attr('name')] = $(this).val(); 
                     
                 });
           
            if(row.id_user==="SI"){
              $modal.modal('hide');
                      
                showAlert("User già eistente!", "warning");
                console.log( ("User già eistente!"));
                alert('User già eistente!');
              return;
            }
             console.log( (row.codice.length+"La password deve essere minimo di 8 caratteri!"));
            if(row.codice.length<8){
              $modal.modal('hide');
                      
                showAlert("La password deve essere minimo di 8 caratteri!", "warning");
                console.log( ("La password deve essere minimo di 8 caratteri!"));
                alert('La password deve essere minimo di 8 caratteri!');
              return;
            }
                         
            var jsonObj = {};
                jsonObj.username = row.username;
                jsonObj.codice = row.codice;
                jsonObj.p="";
                jsonObj.p = hex_sha512(row.codice);
                jsonObj.codice_fiscale = row.codice_fiscale;
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
               url:app.global.json_url+'registration/',
               type:'post',
               headers : $headers,
               data :  jsonObj,
               dataType : 'text',
               success: function (datap) {
                  console.log(datap.data);
                    $mydata =JSON.parse(datap);
                  // $mydata =(datap);
                 
                  console.log( ($mydata.message));
            //-------------------------------------------------------
                if ($mydata.success){
                    $modal.modal('hide');
                       showAlert('Creazione del nuovo User completata correttamente!', 'success');
                       /*
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
                                    hrTable($mydata);
                                }
                            }
                        }
                    });*/
                   $table.bootstrapTable('refresh',  callList("Tutti"));
                     //  hrTable($mydata);
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
                      console.log("refre");
                       $table.bootstrapTable('refresh',  callList("Tutti"));
                }
                    
                    
                   
                
                    },
                error: function () {
                   
                     console.error("hr list load table error!!!");
                                   }
            });

    
    

    
           
        
});
     
        // update and delete events
        window.actionEvents = {
            
            'click .update': function (e, value, row,index) {
                app.global.nick_array.id=row.id;
                app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
            	console.log(row.id_person+"index"+index)  ;  	
                console.log($mydata.data)  ;  
                console.log("row="+_.keys(row))  ;  
                var	$arrByID=row;
            	     // alert(row.id+"lastn:"+_.values($mydata.data[0])+ _.values($arrByID[0]) );
            	    app.global.nick_array.data=row;
            	   app.global.nick_array.hr=row.last_name;
            	console.log(row.last_name)  ;
                console.log("lastn:"+row.last_name+app.global.nick_array.data.last_name);
                app.global.breadcrumb.push({
                   breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.last_name+'</li>'
                 });

                	app.global.hrView.destroy_view();  
                 
             
             
               app.routers.hrRouter.prototype.hr_edit({});
               
            },
            
            'click .create_user': function (e, value, row,index) {
                app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
                showModal($(this).attr('title'), row);
                
            
            },
            'click .remove': function (e, value, row,index) {
                app.global.nick_array.arrSearchText=$('#table').bootstrapTable('getOptions').searchText;
                console.log("id="+row.id_person);
                if (confirm('Are you sure to delete this item?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "person";
                    jsonObj.id=row.id_person;
                    
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                         success: function (datap) {
                           
                           showAlert('Delete item successful!', 'success');
                             $table.bootstrapTable('refresh',  callList());

                             },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            } //remove
       
        };
      
        
        function showModal(title, row) {
       
        row = row || {
            id_person: '',
            first_name: '',
            last_name: '',
            codice: '',
            codice_fiscale: '',
            id_user: ''
           
             
           
        }; 
    // // default row value
    nome=row.first_name.replace(/[&\/\\#,+()$~%. '":*?<>{}]/g,'');
    cognome=row.last_name.replace(/[&\/\\#,+()$~%. '":*?<>{}]/g,'');
            username=nome+"."+cognome;
            row.username=username;
            console.log(username+"=title=" + title + " row=" + _.keys(row)+_.values(row));
        $modal.data('id_person', row.id_person);
            
       $modal.find('.modal-title').text(title);
       for (var name in row) {
            
                $modal.find('input[name="' + name + '"]').val(row[name]); 
            }
         
        $modal.modal('show');
    }
        
        // refresh();
       function refresh() {
          $.get(API_URL, function(datap, message){
          $mydata =JSON.parse(datap);
          $table.bootstrapTable('load', $mydata.data);
          }); 
       } 
        
    function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }   



           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},

        destroy_view:function(){
          this.undelegateEvents();
          $(this.el).removeData().unbind();
          this.remove();
          Backbone.View.prototype.remove.call(this);
          app.global.data_typeView=null
        }
}//Backbone.View.extend
)//Backbone.View.extend

return app.views.hr ; 
});






