require(['app','bootbox'], function(app,bootbox){
app.views.rfa_approva = Backbone.View.extend({
       
    
    
    initialize:function(){
    console.log("initializing rfa_approva view");
    //console.log('key='+app.global.tokenKey);
    
    },

    events:{
        'submit':  'send_',
        "click-row.bs.tables": "selRow",
        'click #btnDDT': "addDdt"
       
    },
    headerJson: function(){
        var $headers = {
                "X-Requested-With": "XMLHttpRequest",
                 "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "lang" : app.global.languagesCollection.at(0).get("lang")
            };
        return $headers;
    },
    
    fetchData: function  (query, dataURL,headers){
        // Return the $.ajax promise
        console.log(headers);
        return $.ajax({
            headers : headers,
            data: query,
            dataType: 'text',
            type:'post',
            url: dataURL
        });
        
    },
    showData: function ( $dataFull) {//record selezionato nella tabella -- scelta servizio
        var $data=$dataFull.data;
        console.log($data);
        console.log($dataFull.pdf);
        console.log($dataFull.prodotti);
        var $data_richiesta=$data.data_richiesta
        if(typeof($data_richiesta) !== "undefined" && $data_richiesta !== null && $data_richiesta !== '1001-01-01 00:00:00'){    
               $data_richiesta=moment($data.data_richiesta).format('DD/MM/YYYY');
         
        }else{
             $data_richiesta="";
            
        }
        this.$('#tokenKey').val($data.tokenKey);        
        this.$('#id_ordine').val($data.id);    
        this.$('#headRichiesta').text($data.num_prog+'  del  '+$data_richiesta); 
        this.$('#servizio').val($data.servizio); 
        this.$('#nota').val($data.nota); 
        if($data.id_categoria!=="11"){
           console.log($data.id_categoria);
            this.$('#fornitore').val($data.fornitore);   
            var $pdfDown= '<a class="downloadDoc" href="javascript:" title="Download" download=""><label >Apri ordine '+$data.num_prog+' </label><i class="fas fa-file-pdf "></i></a>';
            this.$('#prodotti').empty().append($pdfDown);
            
             
         }else{
            console.log($data.id_categoria);
            this.$('#fornitore').val($data.fornitore10);   
            
           /*
            this.$('#codice').val($data.prodotti[0].codice);   
            this.$('#prodotto').val($data.prodotti[0].prodotto);   
            this.$('#quantita').val($data.prodotti[0].quantita);   */
             var $pdfDown= '<a class="downloadDoc" href="javascript:" title="Download" download=""><label >Apri ordine '+$data.num_prog+' </label><i class="fas fa-file-pdf "></i></a>';
            this.$('#prodotti').empty().append($pdfDown);
         }
         
         this.$('.downloadDoc').click(function(e) {
                 
                    
                      $filex=$dataFull.pdf;
                      console.log($filex);
                      // console.log(id+"=id file="+$filex);
                      // console.log(" filex="+$filex);
                     // window.location=$filex;
                       window.open($filex,'_blank');
                 });
       
       // this.$('.panel-heading').text('RFA > Valutazione ordine <label >'+$data.num_prog+'  del  '+$data_richiesta+'</label>'); 
       
       
       
    },
   
    render:function(){
        $(this.el).html(this.template());
        var API_URL = app.global.json_url + 'rfa/';
        var $modal = $('#modal').modal({show: false}),
        $alert = this.$('.alert').hide(); 
        $that=this;
        var jsonObj = {};
        
        jsonObj.tokenKey = app.global.tokenKey;    
        jsonObj.action = "modulo";
        jsonObj.type = "approva";     
        jsonObj = JSON.stringify(jsonObj);
         console.log(jsonObj,$that.headerJson());
        var getDoc =  this.fetchData(jsonObj, app.global.json_url + 'rfa/approva/'+app.global.tokenKey+'/',$that.headerJson());
        getDoc.done(function(data) {
            
            $mydata =JSON.parse(data);
            if($mydata.success){
             
                   $that.showData($mydata);
                  
            console.log($mydata);
            }else{
              /*
                $alert.attr('class', 'alert alert-danger')
                        .html('<i class="glyphicon glyphicon-check"></i>'+$mydata.message).show();
                setTimeout(function () {
                    $alert.hide();
                     app.global.tokenKey=null;//token x approvaRFA
                     app.routers.router.prototype.dashboard();    
                }, 3000); 
               */
                 bootbox.alert({ 
                            title: "Valutazione ordine",
                            message: $mydata.message,
                            
                            callback: function() {
                                app.global.tokenKey=null;//token x approvaRFA
                                app.routers.router.prototype.dashboard();
                            }
                        });
            }
        });
          this.$("#approvaForm").validate({
                    rules:{

                       motivazione:{
                            required:
                                {  depends: function(element) {//cambia se 
                                        console.log($("input:radio[name=approva]:checked").val());
                                        if($("input:radio[name=approva]:checked").val()=="no"){$ev=true}else{$ev=false}
                                    console.log($ev);
                                        return $ev
                                }
                        
                                }
                   }, messages: {

                            motivazione: "Per favore inserisci la motivazione della scelta"


                    }
                }
                });
             this.$('input[type="radio"]').on('change', function(e) {
            console.log(e.target);
           console.log(e.target.value);
            
           
        });
       
        
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    //----------------------------------------------------------------------------------------------------------------------
    send_: function (event) {
        event.preventDefault();
          
        var $tokenKey=this.$('#tokenKey').val(); 
        var jsonObj = {};
        app.global.tokenKey=null; //va impostata a null altrimenti rimango su questa pagina!  
        jsonObj.motivazione=this.$("#motivazione").val();
       
        jsonObj.approva=this.$("input:radio[name=approva]:checked").val();
       
        jsonObj.ordine = this.$('#id_ordine').val();
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        
        $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"), 
                "Content-Type": "application/json"
            };
         $.ajax({
                url:app.global.json_url+'rfa/approva/esito/'+$tokenKey+'/',
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
        
                success: function(data){
                          var  $mydata =JSON.parse(data);                             
                        bootbox.alert({ 
                            title: "Valutazione ordine",
                            message: $mydata.message,
                            
                            callback: function() {
                                app.routers.router.prototype.dashboard();
                            }
                        });
                       
                   
                },
                error: function(e) {
                     bootbox.alert({ 
                            title: "Valutazione ordine",
                            message: $mydata.message,
                            
                            callback: function() {
                                app.routers.router.prototype.dashboard();
                            }
                        });
                } 
                
       
            });
        }
      
        ,
    
  

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
 return  app.views.rfa_approva;
    });



