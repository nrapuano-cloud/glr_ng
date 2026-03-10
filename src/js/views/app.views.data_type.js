require(['app'], function(app){
app.views.data_type=Backbone.View.extend({
    
    initialize:function(){
    
        console.log("initializing data_type view")
    },

    events:{
		
        "click-row.bs.table":"data_type_edit_",
    
    },
    
   
    data_type_edit_:function(e, row, $element,options){
    
       
        $name=row.name.toLowerCase();
        console.log("nick_array.arr="+$name,row.description);
        app.global.nick_array.arr=row.name;
        app.global.nick_array.tit=row.description;
        app.global.nick_array.grp=$name+".type";
        switch ($name) {
            case 'adm_attrezzature_categorie':
                app.global.breadcrumb.push({
               
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >'+row.description+'</a></li>'
                });
                app.routers.adminTecRouter.prototype.attrezzature_categorie();               //chiama la pagina data_type_edit
                break;
            case 'formazione':
                app.global.breadcrumb.push({
               
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/formazione_list" >'+row.description+'</a></li>'
                });
                app.global.breadcrumb.push({
               
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >'+row.description+'</a></li>'
                });
                 app.routers.adminTecRouter.prototype.formazione_list(); 
                               //chiama la pagina data_type_edit
                break; 
            case 'departments':
            case 'committenti':    
                app.global.breadcrumb.push({
                
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >'+row.description+'</a></li>'
                });
                app.routers.adminTecRouter.prototype.data_type_edit();               //chiama la pagina data_type_edit
                break;       
            default:
                app.routers.adminTecRouter.prototype.data_type_edit();               //chiama la pagina data_type_edit
            break;
        }
       
   },

 

    render:function(){
    	$(this.el).html(this.template());
        console.log(app);
    	var API_URL = app.global.json_url + 'types/';
        var $table=this.$('#table'),
         $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       console.log(app.global.breadcrumb);
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
           this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }

        var that = this;

        callList();
      
        function  callList(){
           
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "types";
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
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
                    // $mydata =(datap);
                 
                    console.log( ($mydata));
                    //-------------------------------------------------------
                    if ($mydata.success){

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
                   
                    console.log("hr list load table error!!!");
                }
            });
        }

        function  hrTable(my){
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({data: my.data});

                console.log(my.data);
        }


        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.lang);
        return this
    },

    destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.data_typeView=null;
        app.global.nick_array.arr=null
    }
});//Backbone.View.extend({
    return app.views.data_type;
});    






