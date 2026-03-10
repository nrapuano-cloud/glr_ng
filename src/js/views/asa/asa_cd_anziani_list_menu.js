console.log("asa_cd_anziani_list_menu");
function start(menu,row){
 console.log(app.global.breadcrumb.length,app.global.breadcrumb);
    app.global.breadcrumb.push({
            
            breadcrumb: '<li><a class="breadcrumb-item " href="' + app.global.breadcrumb[0].href +'/'+row.id +'">'+ row.servizio+'</a></li>',
            href:row.href,
            name:row.servizio,
            id:row.id
        });
             console.log('<li><a class="breadcrumb-item " href="' +  app.global.breadcrumb[0].href +'/'+row.id +'">'+ row.servizio+' </a></li>'
        );
        console.log(app.global.breadcrumb.length,app.global.breadcrumb[1]);
   /* while (app.global.breadcrumb.length>1) {
       app.global.breadcrumb.pop();
     }*/
this.$(".breadcrumb").empty();
 console.log(app.global.breadcrumb.length,app.global.breadcrumb);
     for (var i = 0; i < (app.global.breadcrumb).length; i++) {
         this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
           console.log((app.global.breadcrumb).length + "append->" + (app.global.breadcrumb)[i]['breadcrumb']);
     }  
   var $table=this.$('#table');
    hrTable(menu)
    function  hrTable(my){
        $table.bootstrapTable('destroy');
        $table.bootstrapTable({data: my});
    }
    $table.on("click-row.bs.table", function(e,row){
      console.log(row);
                $.ajax({
                            url: './js/views/asa/'+app.global.sub+'.html',
                            dataType: "html",
                            success: function (varForm) {
                                $("#boot").empty();
                                $("#boot").append(varForm);
                                console.log('load '+app.global.sub+'.html');
                             
                            },
                            error: function(){console.log('NOT load '+app.global.sub+'_list_menu.html');}
                        });  
                   $.ajax({
                                    url: "./js/views/asa/"+app.global.sub+".js",
                                    dataType: "script",
                                    success: function () {
                                        console.log('load '+app.global.sub+'.js');
                                        start($mydata,row);
                                    },
                                    error: function(){console.log('NOT load '+app.global.sub+'.js');}
                                });        
    });

}