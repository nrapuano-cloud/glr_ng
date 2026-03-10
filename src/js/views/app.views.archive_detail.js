app.views.archive_detail = Backbone.View.extend({
    
    initialize:function(){
    

    	console.log("initializing archive_detail view")},

    	events:{
		
		"click-row.bs.table":"archive_detail",
    
  },
    
   
    archive_detail:function(e, row, $element,options){
    
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
    	var API_URL = app.global.json_url + 'archive/';
        var $table=this.$('#table'),
        $nota="",
        $notes="",
        $operatore=this.$('#data'),
        $img=this.$('#img'),
        $ar=this.$('#ar'),
         $ari=this.$('#ari'),
        $modal = $('#modal').modal({show: false}),
        $alert = this.$('.alert').hide(); 
       
       console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>3){
          app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
       }
$ari.attr("href",app.global.archive_url+app.global.nick_array.detail.servizioComPro+"/"+app.global.nick_array.detail.docNome);
$ar.attr("data",app.global.archive_url+app.global.nick_array.detail.servizioComPro+"/"+app.global.nick_array.detail.docNome);
$contentForm=app.global.nick_array.dataOr.contentForm;

console.log(app.global.nick_array);

this.$("#contentForm").empty().append($contentForm);
console.log($contentForm);
this.$('#id').val(app.global.nick_array.detail.id_archivio);
this.$('#id_person').val(app.global.nick_array.detail.id_person);
$data_documento=this.$('#dataTemp');
if( app.global.nick_array.detail.data_evento !== "" ){
    $data_documento.val( moment(app.global.nick_array.detail.data_evento).format('DD/MM/YYYY'));
   
}else{
   $data_documento.val("");
}
//-----------------------------------------------------------------
$incaricato=this.$('#incaricato');


var $incVal=app.global.nick_array.dataOr.incaricati;
console.log($incVal);
if(typeof $incVal !== "undefined" ){
    $incaricato.append('<option value=""></option>');
    $incVal.forEach(function(item){
            $incaricato.append('<option value="'+item.id+'">'+item.incaricato+'</option>');
        }); 
   $incaricato.val( app.global.nick_array.detail.id_incaricato_antincendio); 
}else{
 $incaricato.val( app.global.nick_array.detail.nome_incaricato_antincendio);
}
//----------------------------------------------------------------
$documento=this.$('#documento');
var $docVal=app.global.nick_array.dataOr.tipologia_documenti;
console.log($docVal);
if(typeof $docVal !== "undefined" ){
    $docVal.forEach(function(item){
            $documento.append('<option value="'+item.id+'">'+item.name+'</option>');
        }); 
   $documento.val( app.global.nick_array.detail.id_tipologia_documento); 
}else{
   $documento.val( app.global.nick_array.detail.tipologia_documento); 
}
$ditta=this.$('#ditta');
$ditta.val( app.global.nick_array.detail.ditta);


$nota=this.$('#nota');
$nota.val( app.global.nick_array.detail.nota);

$data_inserimento=this.$('#dataTemp2');
$data_inserimento.val( moment(app.global.nick_array.detail.data).format('DD/MM/YYYY'));
$operatore=this.$('#operatore');
$operatore.val( app.global.nick_array.detail.utente);

this.$('#datetimepicker1').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();
//this.$('#datetimepicker1').datetimepicker('setStartDate', '-1y');
this.$('#datetimepicker1').datetimepicker('setEndDate', '+0d');
 /*this.$('#datetimepicker2').datetimepicker({ 
            format: "dd/mm/yyyy",
            autoclose: true,
            startView: 2,
            minView: 2,
            startDate: "2018/12/20",
            endDate:"2019/01/15",
            language: "it"
        }).show();*/
//this.$('#datetimepicker2').datetimepicker('setStartDate', '-1y');
//this.$('#datetimepicker2').datetimepicker('setEndDate', '+0d');

$img.attr( "src",app.global.archive_url+app.global.nick_array.detail.servizioComPro+"/"+app.global.nick_array.detail.docNome);
console.log(app.global.archive_url+app.global.nick_array.detail.servizioComPro+"/"+app.global.nick_array.detail.docNome);

this.$('#noteBtn').click(function () {
    var API_URL = app.global.json_url + 'archive/servizio/';
    var nota = document.getElementById('nota').value;
       
    var form_data = new FormData(that.$('#registrationForm')[0]);  
      form_data.append("data_doc",moment(that.$('#datetimepicker1').data("datetimepicker").getDate()).format('YYYY-MM-DD'));
              
     form_data.append('type', 'documenti');
     form_data.append('action', 'update');
     form_data.append('person', app.global.tokensCollection.first().get("id_person"));
    $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                //"Content-Type": "application/json"
            };
    jsonObj = {};
    jsonObj.action = "update";
    
    jsonObj.id = app.global.nick_array.detail.id_archivio;
    jsonObj.person = app.global.tokensCollection.first().get("id_person");
    
    jsonObj = JSON.stringify(jsonObj);
   
               
    $.ajax({
        url:API_URL,
        type:'post',
        headers : $headers,
        //data :  jsonObj,
                // dataType : 'text',
                //data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                data: form_data,
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,  
        success: function (datap) {
             showAlert('Nota modificata con successo!', 'success'); 
            console.log("note ok!");
          //  $table.bootstrapTable('refresh',  callList());

        },
        error: function () {
            showAlert('Errore nella modifica della nota!', 'danger'); 
              console.log("note ko!");
        }
    });
          
}); //noteBtn

 function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }   


var that = this;
       // callList();
        hrTable(app.global.nick_array.detail);
       
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


        $(document).attr("title",app.global.app_short_name+" - "+app.global.long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            app.global.archiveView=null;
            app.global.nick_array.arr=null
        }
      })//Backbone.View.extend({




