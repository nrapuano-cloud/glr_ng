require(['app'], function(app){
app.views.hr_user=Backbone.View.extend(
{
    
    initialize:function(){
    
    	
    	console.log("initializing hr_user view")},
    	
  

    render:function(e){
     
     
        $(this.el).html(this.template());
        var $headers={};
    	var $mydata=[];
    	var API_URL = app.global.json_url + 'persons/';
    
        var $table=this.$('#table');//.bootstrapTable({url: API_URL}),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
    
       
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }
        this.$("#new").html(this.language.new);
        // this.$(".active").html(app.global.breadcrumb);
        var that = this;
        callList();
       
        function  callList(){
      
            var $action="list";
            var $type="user";
            var $role=app.global.tokensCollection.first().get("nvbr");
            var $person = app.global.tokensCollection.first().get("id_person");
          
        
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            console.log("API_URL="+API_URL);
   $.ajax({
               url:API_URL+$action+"/"+$type+"/"+$person+"/Tutti/",
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
                  
                    hrTable($mydata);
                }
                else {
                 app.routers.router.prototype.logout();
                  
                }
                    
                    
                   
                
                    },
                error: function () {
                   
                     console.error("hr list load table error!!!");
                                   }
            });

    
    }

    function  hrTable(my){
         $table.bootstrapTable('destroy');
        $table.bootstrapTable({data: my.data});
        
          console.log(my.data);
        }
 //------------------------------------------------------------------------       
      
 
        
  
     // create event
        

        this.$('.create').click(function () {
          
        	 app.global.nick_array.hr="New";
        	 app.global.hrView.destroy_view();  
        	 app.routers.hrRouter.prototype.hr_edit();
            
        });
        
     
        // update and delete events
        window.actionEvents = {
            'click .update': function (e, value, row,index) {
                app.global.nick_array.id=row.id;
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
            'click .remove': function (e, value, row,index) {
        console.log("id="+row.id);
                 if (confirm('Sei sicuro di voler eliminare questo User?')) {
                    jsonObj = {};
                    jsonObj.action = "delete";
                    jsonObj.type = "user";
                    jsonObj.id=row.id;
                    //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                         success: function (datap) {
                           
                           showAlert('Delete item successful!'+datap, 'success');
                             $table.bootstrapTable('refresh',  callList());

                             },
                         error: function () {

                              console.log("Delete item error!");
                                            }
                  });

                }
            }, //remove
                 'click .create_user': function (e, value, row,index) {
       
                
                    jsonObj = {};
                    jsonObj.action = "active";
                    jsonObj.type = "user";
                    jsonObj.id=row.id;
                    jsonObj.active =row.active;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                         success: function (datap) {
                           
                         
                             $table.bootstrapTable('refresh',  callList());

                             },
                         error: function () {

                              console.log("active_user item error!");
                                            }
                  });

              
            }, //active
             'click .off_user': function (e, value, row,index) {
       
                
                    jsonObj = {};
                    jsonObj.action = "off";
                    jsonObj.type = "user";
                    jsonObj.id=row.id;
                    jsonObj.isOnline =row.IsOnline;
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                         success: function (datap) {
                           
                         
                             $table.bootstrapTable('refresh',  callList());

                             },
                         error: function () {

                              console.log("off_user item error!");
                                            }
                  });

              
            } //off
       
        };
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

return app.views.hr_user ;
});




