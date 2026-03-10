require(['app','bootbox'], function(app,bootbox){
app.views.gap_doc_view = Backbone.View.extend({
       
    
    
    initialize:function(){
        console.log("initializing gap_doc_view")},

    	 events:{
        "click-row.bs.table":"gap_doc_list"
    },
    
    gap_doc_list:function(e, row, $element,options){
    
        app.global.breadcrumb.push({
           // breadcrumb: '<li><a class="breadcrumb-item active" href="#it/gap_doc_list" >'+row.shortDescription+' </a></li>'
           breadcrumb: '<li>'+row.shortDescription+'</li>'
        });
        app.global.nick_array.arr=row.name;
        app.global.nick_array.tit=row.description;
        app.global.nick_array.short=row.shortDescription;
        app.global.nick_array.servizio_id=row.id;
        app.global.nick_array.grp=row.name.toLowerCase()+".type";
        app.routers.gapRouter.prototype.gap_doc_list(); 
        
  
   },

    
   
   
    render:function(){
    	$(this.el).html(this.template());
        
        var API_URL = app.global.json_url + 'gap/';
        var $table=this.$('#table'),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
        console.log(app.global.breadcrumb);
        while (app.global.breadcrumb.length>1) {
            app.global.breadcrumb.pop();
        }
        
        for(i=0; i<app.global.breadcrumb.length; i++){
          this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
          console.log(app.global.breadcrumb);
        var that = this;
        callList();
       
        function  callList(){
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "doc_inviati";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            //jsonObj.servizio = app.global.tokensCollection.first().get("id_servizio");
            
            
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

    function  hrTable(my){
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({data: my.data});
            console.log(my.data);
    }
       
           $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
  

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);


    }
})//Backbone.View.extend({
return app.views.gap_doc_view;
});


