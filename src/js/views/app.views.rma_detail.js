require(['app','bootbox'], function(app,bootbox){
app.views.rma_detail = Backbone.View.extend({
    
    initialize:function(){
    

    	console.log("initializing rma_detail view")},

    	events:{
		
		"click-row.bs.table":"archive_detail--",
    
  },
    
   
    archive_detail:function(e, row, $element,options){
          console.log(row);
    
        app.global.breadcrumb.push({
               
            breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.data+'</li>'
        });
        app.global.nick_array.arr=row.name;
        app.global.nick_array.tit=row.description;
        app.global.nick_array.grp=row.name.toLowerCase()+".type";
        app.routers.router.prototype.archive_detail();               //chiama la pagina data_type_edit
  
    },

 

    render:function(){
    	$(this.el).html(this.template());
    	var API_URL = app.global.json_url + 'rma/';
        var $table=this.$('#table'),
        $nota=this.$('#nota'),
        $operatore=this.$('#operatore'),
        $servizio=this.$('#servizio'),
        $descrizione=this.$('#descrizione'),
        $categoria=this.$('#categoria'),
        $ubicazione=this.$('#ubicazione'),
        $tempistica=this.$('#tempistica'),       
        
        $img=this.$('#img'),
        $ar=this.$('#ar'),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
       console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>2){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb']);
        }
        this.$('#lblstatus').css("background-color", app.global.nick_array.arr.stato_color);
        this.$('#lblstatus').text(app.global.nick_array.arr.testoStato);
        console.log(app.global.nick_array);
        $categoria.val( app.global.nick_array.arr.categoria);
        $descrizione.val($('<div />').html(app.global.nick_array.arr.descrizione).text());
        $ubicazione.val($('<div />').html(app.global.nick_array.arr.ubicazione).text());
        $tempistica.val( app.global.nick_array.arr.tempistica);
        $servizio.val( app.global.nick_array.arr.servizio);
        $nota.val( $('<div />').html(app.global.nick_array.arr.nota).text());
        $operatore.val( app.global.nick_array.arr.utente);
if(app.global.nick_array.arr.attrezzature){
    this.$("#attrezzature").empty().append('<div class="row">'+
                                '<div class="form-group col-lg-12">'+     
                                    '<label >Attrezzature (Attr) / Beni Strumentali (BeSt)</label>'+
                                    '<input type="text"     class="form-control" name="attrezzatura" id="attrezzatura" value="'+app.global.nick_array.arr.attrezzature[0].text_oggetto+'" readonly/>'+
                                '</div>'+
                            '</div>'); 
}
      //  $ar.attr("href",app.global.nick_array.arr.link_immagine);
      //  $img.attr( "src",app.global.nick_array.arr.link_immagine);
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
            console.log( $res[0], $res[1], $res[2]);
            that.$('#immagini').append(
                '<br/><div class="panel panel-default">'+
                    '<div class="panel-body" id="bod">'+
                  '<img  class="img-fluid" src="'+ $res[2]+'">'+ 
                '<a   href="'+$res[0]+'" target="_blank">'+
                $row.nome_originale+ '</a></div>'+
                '</div>'
                
            );
          //  modal.find('.modal-body img').attr('src', $res[2]); 
           // modal.find('.modal-body a').attr('href', $res[0]);
          //  modal.find('.modal-body a').html( $res[1]);
        } 
           
       
        // callList();
        //hrTable(app.global.nick_array.);
        //--------------------------------------------------------------------------
        if(app.global.nick_array.arr.progress){
            console.log("arr="+app.global.nick_array.arr.progress);
            
           // that.$("#registrationForm").append(
              varForm=  '<input type="hidden" class="form-control" name="id" id="id">'+ 
                '<div class="form-group">'+
                    '<label id="lblname" for="name">Nome Servizio</label>'+
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Servizio" >'+
                '</div>';
         that.$("#accordion").append(varForm);
        } 
        
        function  callList(){
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "department";
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
                   $mydata =(datap);
                 
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
                   // hrTable($mydata);
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

    function  hrTable(my){
         $table.bootstrapTable('destroy');
        $table.bootstrapTable({data: my.data});
        
          console.log(my.data);
        }
       
        this.$('.next1').click(function () {
             
            if(app.global.nick_array.arrIndex== Number(app.global.nick_array.arrTable.length)-1){
                app.global.nick_array.arrIndex =0;
            }else{
                app.global.nick_array.arrIndex=Number(app.global.nick_array.arrIndex)+1; 
            }
          
            app.global.nick_array.arr=app.global.nick_array.arrTable[ app.global.nick_array.arrIndex];    
             
            app.global.breadcrumb.pop();
            app.global.breadcrumb.push({
               
                breadcrumb: '<li class="breadcrumb-item active" href="" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</li>'
            });
         
            app.routers.rmaRouter.prototype.rma_detail();    
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
               
                breadcrumb: '<li class="breadcrumb-item active" href="" >'+app.global.nick_array.arr.num_prog+" del "+app.global.nick_array.arr.data_richiesta+'</li>'
            });
         
            app.routers.rmaRouter.prototype.rma_detail();    
        });

        

           $(document).attr("title",app.global.app_short_name+" - "+app.global.long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.archiveView=null;
            app.global.nick_array.arr=null
        }
      });//Backbone.View.extend({
return app.views.rma_detail;
    });


