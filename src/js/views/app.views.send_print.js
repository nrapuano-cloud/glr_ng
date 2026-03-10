require(['app','bootbox'], function(app,bootbox){
app.views.send_print = Backbone.View.extend({
      
    initialize:function(){
    
    	console.log("initializing send_print view");
        var jsonObj = {};
           
        jsonObj.person = app.global.tokensCollection.first().get("id_person");
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
        url:app.global.json_url+'auth/',
        type:'post',
        headers : this.headerJson(),
        data: jsonObj,
        dataType : 'text',
        success: function (datap) {
            $mydata =JSON.parse(datap);
            // $mydata =(datap);

            console.log( ($mydata));
            //-------------------------------------------------------
            if ($mydata.success){

            }else{
                 app.routers.router.prototype.logout();
             
            }
        },
        error: function () {
             app.routers.router.prototype.logout();
                
            }
        });
       
           
        
    },

    events:{
        'submit':  'send_'
        
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
    render:function(){
        $(this.el).html(this.template());
         
        
        var $num_file_totale,$size_file_totale;
     var nVer = window.navigator.appVersion;
    // console.log(nVer);
   //   console.log((window.navigator));
     
        
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide(); 
       
        if(app.global.breadcrumb.length>1){
            app.global.breadcrumb.pop();
        }
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
        }

        //document.getElementById("#invio").disabled = true;
        this.$("#invio").prop( "disabled", true );
        
        that=this;
        
        console.log("platform="+navigator.platform);
        //---------------------------------------------------------------------------------
        function fileSelected() {
            
        var file = document.getElementById('fileToUpload').files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
          else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

          document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
          document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
          document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
        }
      }

      function uploadFile() {
           alert("upload");
        var fd = new FormData();
        fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "UploadMinimal.aspx");
        xhr.send(fd);
      }

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
      }

      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
      }

      function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }
    
        //document.getElementById("Upload").addEventListener("click", uploadFile());
        //document.getElementById("fileToUpload").addEventListener("onchange", fileSelected);
        
     //  document.getElementById("Upload").onclick =  uploadFile();
    //document.getElementById("fileToUpload").onchange =  fileSelected();
    
    
    $output = this.$('#output');     
    //var output = document.getElementById('output');
   // let output = this.$('#listing');
          //  let item = document.createElement("li");
    if(navigator.platform=="Win32"){  
          this.$('#inpFile').append('<input type="file" id="files" name="files[]" multiple="" webkitdirectory="" mozdirectory  class="filestyle" />​ ');
      
        
    this.$('#files').filestyle({buttonText: "Cartella con le immagini da stampare",buttonName:"btn-primary",badge: true,input: false});
    }else{
          this.$('#inpFile').append('<input type="file" id="files" name="files[]" multiple="" class="filestyle" />​ ');
      
         this.$('#files').filestyle({buttonText: "Seleziona le immagini da stampare",buttonName:"btn-primary",badge: true,input: false,});
    }
  
            
	// Detect when the value of the files input changes.
	this.$('#files').change(function (e) {
            totSize="";
            console.log(e);
            $output.html("").fadeOut();
            var totalSize = [].reduce.call(
                this.files, function(tot, currFile) {
                    console.log(currFile.name , ' size=', currFile.size/1024/1024);
                    return tot + currFile.size/1024/1024;
                }, 0
            );
            totSize=totalSize.toFixed(2);
            console.log('Total size = ', totSize)
            if (e.target.files.length>250){
                //alert (" Upload superiore di 250 file max consentito, totale numero file="+e.target.files.length);
                bootbox.alert({ 
                    title: "Upload Immagini Errore",
                    message: " Upload superiore di 250 file max consentito, totale numero file="+e.target.files.length,
                });
                $(":file").filestyle('clear');
                return;
            }
            if (totalSize>500){
                //alert ("Upload file totale size  superiore a 500 MB, totale size="+totalSize.toFixed(2) + " MB");
                bootbox.alert({ 
                    title: "Upload Immagini Errore",
                    message: "Upload file totale size  superiore a 500 MB, totale size="+totalSize.toFixed(2) + " MB",
                });
                $(":file").filestyle('clear');
                return;
            }
         
                       
            //console.log("a1="+e.target.files.length+" A2="+totSize);
            // Retrieve the file list from the input element
            // $output.innerText = "";	
            //uploadFiless(e.target.files);
            if(navigator.platform=="Win32"){
                uploadFilex(totSize);
            }else{
                uploadFilexx(totSize); 
            }
             
		
            // Outputs file names to div id "output"

            //for (var i in e.target.files){
            //item.innerHTML = (1+i)+") "+e.target.files[i].webkitRelativePath;
            //$output.append(item);
           // $output.append( i+") "+ e.target.files[i].webkitRelativePath+" \r\n" );	

            //$output.innerText  = $output.innerText + e.target.files[i].webkitRelativePath+"\n";
            //    }
   
     
            $output.fadeIn()
       
        });
        
    function uploadajax(ttl,cl,$data,$dataPr,totSize,$data1,s){
       
        $("#tot").text("File trasferiti " + (cl+1) +" di "+(ttl+1));
        percentT = Math.ceil((cl+1) / (ttl+1) * 100);
        $("#progbT").css("width", percentT + "%").text(percentT + " %");
       
        var fileList = this.$('#files').prop("files");
       
        $('#prog'+cl).removeClass('loading-prep').addClass('upload-image');
        console.log( "data="+$data);
         console.log( "A3="+totSize);
        var form_data =  "";
        form_data = new FormData();
        form_data.append("appver", that.nVer);
        form_data.append("navig", window.navigator);
        form_data.append("platform", navigator.platform);
        form_data.append("file", fileList[cl]);
       
        form_data.append('paths', fileList[cl].webkitRelativePath+"###");     
        
          
        form_data.append("fileAtt",cl+1);
        form_data.append("fileTot",ttl+1);
        form_data.append("fileSizeTot", totSize);
        form_data.append('data', $data);
        form_data.append('dataPr', $dataPr);
        form_data.append('dataTot', s);
        var usr_id=app.global.tokensCollection.first().get("id_person");
        var API_URL = app.global.json_url + 'upload/';
        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,

            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang")//,
            //"Content-Type": "application/json"
        };

        $.ajax({
            url: API_URL+usr_id+"/stampa/foto/",
            cache: false,
            contentType: false,
            processData: false,
            headers:$headers,
            async: true,
            data: form_data,
            type: 'POST', 
            xhr: function() {  
                var xhr = $.ajaxSettings.xhr();
                if(xhr.upload){ 
                    xhr.upload.addEventListener('progress', function(event){
                        var percent = 0;
                        if (event.lengthComputable) {
                            percent = Math.ceil(event.loaded / event.total * 100);
                        }
                        
                        $('#prog').text((cl+1)+' di '+(ttl+1)+'  ' +fileList[cl].name+"  "+percent+'%');
                        $("#progb").css("width", percent + "%").text(percent + " %");
                    }, false);
                }
                return xhr;
            },    
       
            success: function(res,status) {
                console.log("status="+status+" res="+res);          
                if(status == 'success'){
                    $dataPr =  moment().format("YYYY-MM-DD_HH-mm-ss_ww");
                    $dataPr1 =  moment().format("DD/MM/YYYY HH:mm:ss");
                    var s=moment.utc(moment($dataPr1).diff(moment($data1))).format("HH:mm:ss");
                    percent = 0;
                    $('#prog').text('');            
                    $('#prog').text('--Success: ');
                    if(cl < ttl){
                        uploadajax(ttl,cl+1,$data,$dataPr,totSize,$data1,s);
                    }else{
                        $(":file").filestyle('clear');
                        $('#uploadsts').empty();
                        $('#uploadstsT').empty();
                        bootbox.alert({ 
                            title: "Upload Immagini",
                            //message: "Upload dei file avvenuta con successo in "+s+" !",
                            message: "Upload dei file avvenuta con successo!",
                        });
                  
                        app.routers.sraRouter.prototype.send_stampa();
                    }     
                }
            },
            fail: function(res) {
                bootbox.alert({ 
                    title: "Upload Immaggini Errore!",
                    message: "Errore nel caricamento delle immagini: "+res.message,


                });
                app.routers.sraRouter.prototype.send_stampa();
            
            }
        });
    }
function uploadFilexx(totSize){
    
    console.log('Total size1 = ', totSize)
    var fileList = this.$('#files').prop("files");
    var r = confirm("Vuoi caricare queste "+fileList.length+" immagini?");
    if (r == true) {
       
        this.$('#uploadsts').html('');
         var i;
        $data =  moment().format("YYYY-MM-DD_HH-mm-ss_ww");
        $data1 =  moment().format("DD/MM/YYYY HH:mm:ss");
        $('#uploadstsT').append('<p class="upload-page" id="tot"></span><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  id="progbT" aria-valuemin="0" aria-valuemax="100" ></div></div>');
        $('#uploadsts').append('<p class="upload-page"><span class="loading-prep" id="prog"></span><div class="progress">'+
        '<div class="progress-bar progress-bar-striped active" role="progressbar"  id="progb" aria-valuemin="0" aria-valuemax="100" ></div></div></p>');


        for ( i = 0; i < fileList.length; i++) {
           // $('#uploadsts').append('<p class="upload-page">'+(i+1)+' di '+fileList.length+'  ' +fileList[i].name+'<span class="loading-prep" id="prog'+i+'"></span><div class="progress">'+
           //         '<div class="progress-bar progress-bar-striped active" role="progressbar"  id="progb'+i+'" aria-valuemin="0" aria-valuemax="100" ></div></div></p>');

            if(i == fileList.length-1){

                uploadajax(fileList.length-1,0,$data,0,totSize,$data1,0);
            }
        }

    //   });
    } 
}
  

           // $('#upcvr').click(function(){
function uploadFilex(totSize){
                console.log('Total size1 = ', totSize)
                var fileList = this.$('#files').prop("files");
                this.$('#uploadsts').html('');
                var i;
                $data =  moment().format("YYYY-MM-DD_HH-mm-ss_ww");
                 $data1 =  moment().format("DD/MM/YYYY HH:mm:ss");
                    $('#uploadstsT').append('<p class="upload-page" id="tot"></span><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  id="progbT" aria-valuemin="0" aria-valuemax="100" ></div></div>');
                     $('#uploadsts').append('<p class="upload-page"><span class="loading-prep" id="prog"></span><div class="progress">'+
                    '<div class="progress-bar progress-bar-striped active" role="progressbar"  id="progb" aria-valuemin="0" aria-valuemax="100" ></div></div></p>');
       
             
    for ( i = 0; i < fileList.length; i++) {
               // $('#uploadsts').append('<p class="upload-page">'+(i+1)+' di '+fileList.length+'  ' +fileList[i].name+'<span class="loading-prep" id="prog'+i+'"></span><div class="progress">'+
               //         '<div class="progress-bar progress-bar-striped active" role="progressbar"  id="progb'+i+'" aria-valuemin="0" aria-valuemax="100" ></div></div></p>');
       
        if(i == fileList.length-1){
             
                    uploadajax(fileList.length-1,0,$data,0,totSize,$data1,0);
                }
                }

         //   });
         }



function uploadFiles(files){

	// Create a new HTTP requests, Form data item (data we will send to the server) and an empty string for the file paths.
	xhr = new XMLHttpRequest();
	data = new FormData();
	paths = "";
         var API_URL = app.global.json_url + 'upload/';
         var usr_id=app.global.tokensCollection.first().get("id_person");
	
                 
               
                
                
           
	// Set how to handle the response text from the server
	xhr.onreadystatechange = function(ev){
		console.debug(xhr.responseText);
	};
        xhr.upload.addEventListener("progress", uploadProgress, false);
	
	// Loop through the file list
	for (var i in files){
		// Append the current file path to the paths variable (delimited by tripple hash signs - ###)
		paths += files[i].webkitRelativePath+"###";
		// Append current file to our FormData with the index of i
		data.append(i, files[i]);
	};
	// Append the paths variable to our FormData to be sent to the server
	// Currently, As far as I know, HTTP requests do not natively carry the path data
	// So we must add it to the request manually.
	data.append('paths', paths);
	console.log("paths="+paths)	
	// Open and send HHTP requests to upload.php
	xhr.open('POST', API_URL+usr_id+"/stampa/foto/", true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Authorization" , "Bearer " + app.global.tokensCollection.first().get("auth").token);
        xhr.setRequestHeader( "username" , app.global.tokensCollection.first().get("username"));
        xhr.setRequestHeader("lang" , app.global.languagesCollection.at(0).get("lang"));
        xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(this.data);
	
}
     
        /** send_3 **/
     function uploadFiless(files){
    
        event.preventDefault();
        console.log("send invio foto stampass");
        this.$(":file").filestyle('disabled', true);
      //  this.$("#invio").prop( "disabled", true );
        data = new FormData(this.$('#form')); 
	paths = "";
        
        // Loop through the file list
	for (var i in files){
		// Append the current file path to the paths variable (delimited by tripple hash signs - ###)
		paths += files[i].webkitRelativePath+"###";
		// Append current file to our FormData with the index of i
		data.append(i, files[i]);
	};
	// Append the paths variable to our FormData to be sent to the server
	// Currently, As far as I know, HTTP requests do not natively carry the path data
	// So we must add it to the request manually.
	data.append('paths', paths);
	console.log("paths="+paths)
        $output.removeClass('hide');
        
        var file_data = this.$('#files').prop('files')[0];   
        var form_data = new FormData(this.$('#form')[0]);                  
        form_data.append('file', file_data);
        //alert(_.keys(form_data));    
        var input = document.getElementById('files').files[0];
        var inputTot = document.getElementById('files').files.length;
        //var nota = document.getElementById('nota').value;
       // console.log("ttt="+input.name+"-"+nota);
       // console.log("ttt0="+input.name+"-"+"ttt1="+inputTot+"-"+nota);
       
        var API_URL = app.global.json_url + 'upload/';
        var usr_id=app.global.tokensCollection.first().get("id_person");
        var jsonObj = {};
            jsonObj.id=usr_id;
            jsonObj.num_file_totale=$num_file_totale;
            jsonObj.size_file_totale=$size_file_totale;
            //jsonObj.nota=nota;
            jsonObj.foto_stampa='true';
            jsonObj.name_file=input.name;
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            console.log("nvbr="+jsonObj.role);
            jsonObj = JSON.stringify(jsonObj);
        data.append('num_file_totale', $num_file_totale);   
        data.append('size_file_totale', $size_file_totale);
        data.append('id_servizio', app.global.tokensCollection.first().get("id_servizio"));
        data.append('id_person', app.global.tokensCollection.first().get("id_person"));
       
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
                //"Content-Type": "application/json"
            };
            $.ajax({
                url:API_URL+usr_id+"/stampa/foto/",
                type:'post',
                headers : $headers,
                //data :  jsonObj,
               // dataType : 'text',
                //data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                data: data  ,
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false    
                beforeSend : function(){
                    //$("#preview").fadeOut();
                   
                    $("#err").fadeOut();
                },
                success: function(data){
                    console.log("success");
                    $("#upsuccess").html("File Upload Success!").fadeIn().fadeOut(2000,function(){
                          alert ("Upload dei file avvenuta con successo!");
                        app.routers.sraRouter.prototype.send_stampa();
                       
                         });
                    
                },
                error: function(e) {
                    bootbox.alert({ 
                            title: "Upload Immaggini Errore!",
                            message: "Errore nel caricamento delle immagini: "+e.message,
                            
                            
                        });
                        app.routers.sraRouter.prototype.send_stampa();
                } ,
                
                   xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
                 var percentComplete1 = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete1.toString() + '%';
                if (percentComplete === 1) {
                    $('.progress').addClass('hide');
                    $('#progressNumber').addClass('hide');
                    $output.addClass('hide');
                }
            }
        }, false);
        xhr.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
            }
        }, false);
        return xhr;
    }
            });
        }
    //----------------------------------------------------------------------------------
       
     $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
        return this},
    
     send__:function(e){
      console.log("ssssss");
      alert("esss");
           
            var jsonObj = {};
            
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
                   
                     console.log("send error!!!");
                                   }
            });
    
   },
     /** send_2 **/
    send_: function (event) {
        event.preventDefault();
        console.log("send invio foto stampa");
        that.$("#invio").prop( "disabled", true );
        var file_data = this.$('#files').prop('files')[0];   
        var form_data = new FormData(this.$('#form')[0]);                  
        form_data.append('file', file_data);
        //alert(_.keys(form_data));    
        var input = document.getElementById('files').files[0];
        var inputTot = document.getElementById('files').files.length;
        var nota = document.getElementById('nota').value;
        if(inputTot>250){
            bootbox.alert({ 
                            title: "Stampa Foto Upload Error",
                            message: "Max 250 immagini!"
                            
                           
                        });
        }
        console.log("ttt="+input.name+"-"+nota);
        console.log("ttt0="+input.name+"-"+"ttt1="+inputTot+"-"+nota);
       
        var API_URL = app.global.json_url + 'upload/';
        var usr_id=app.global.tokensCollection.first().get("id_person");
        var jsonObj = {};
            jsonObj.id=usr_id;
            jsonObj.nota=nota;
            jsonObj.foto_stampa='true';
            jsonObj.name_file=input.name;
            jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            console.log("nvbr="+jsonObj.role);
            jsonObj = JSON.stringify(jsonObj);
            
       
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
               
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang")//,
                //"Content-Type": "application/json"
            };
            $.ajax({
                url:API_URL+usr_id+"/PDF/web/",
                type:'post',
                headers : $headers,
                //data :  jsonObj,
               // dataType : 'text',
                data: new FormData(this.$('#form')[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false    
                beforeSend : function(){
                    //$("#preview").fadeOut();
                   
                    $("#err").fadeOut();
                },
                success: function(data){
                    console.log("success");
                    if(data=='invalid'){
                        // invalid file format.
                        $("#err").html("Invalid File !").fadeIn();
                    }
                    else{
                        // view uploaded file.
                        $("#preview").html("File Upload Success!").fadeIn().fadeOut(4000,function(){
                        app.routers.sraRouter.prototype.send_stampa();
                                });
                        $("#form")[0].reset(); 
                        that.$('#btnHead').show();
                        
                        // that.$("#invio").prop( "disabled", true );
                   
                    }
                },
                error: function(e) {
                    $("#err").html(e).fadeIn();
                } ,
                
                   xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
                if (percentComplete === 1) {
                    $('.progress').addClass('hide');
                }
            }
        }, false);
        xhr.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
            }
        }, false);
        return xhr;
    }
            });
        }
        
    
        ,

        destroy_view:function(){this.undelegateEvents();$(this.el).removeData().unbind();
            this.remove();
            Backbone.View.prototype.remove.call(this);
            
           
        }
      })//Backbone.View.extend({
   return app.views.send_print;
    });



