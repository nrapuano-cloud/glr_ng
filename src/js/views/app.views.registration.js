require(['app','lib/bootbox.all.min.js'], function(app,bootbox){
app.views.registration = Backbone.View.extend({

    /** init view **/
    initialize: function() {
        console.log('initializing registration view');
     
    },

    /** submit event for registration **/
    events: {
        'submit':                           'registration',
        'click #btnRegistrationHome':       'registration_home'
    },

    registration_home: function() {
        app.routers.router.prototype.index();
    },

    /** render template **/
    render: function() {
        $(this.el).html(this.template());
        var $form,$txtDescriz,$txtcodFisc='';
        var params = get_params_from_href(window.location.href);
        console.log(params);  
        function get_params_from_href(href){
            var paramstr = href.split('?')[1];        // get what's after '?' in the href
            var paramsarr = paramstr.split('&');      // get all key-value items
            var params = Array();
            for (var i = 0; i < paramsarr.length; i++) {
                var tmparr = paramsarr[i].split('='); // split key from value
                params[tmparr[0]] = tmparr[1];        // sort them in a arr[key] = value way
            }
            return params;
          }
         
        
        console.log(params.c);
        console.log(params.msg);
         console.log(params.codFisc);
         if(params.msg){
             $txtDescriz=unescape(params.msg);
         }else{
             $txtDescriz='';
         }
         if(params.codFisc){
              $txtcodFisc=unescape(params.codFisc);
         }else{
              $txtcodFisc='';
         }
         if(params.codMsg){
              $txtcodMsg=unescape(params.codMsg);
            
         }else{
              $txtcodMsg='';
         }
        
        that=this;
        switch(params.c) {
            case "1":
                console.log('1');
            case "2":{    
               console.log('2');
                $avv='Per ricevere la nuova password inserisci il tuo codice fiscale.\n'+
                     'La nuova password verrà inviata alla e-mail aziendale che ti è stata assegnata.\n';
                            
                $form='<div class="row">'+
                        '<p><center><strong><h3>Richiesta password</h3></strong></center></p>'+
                       
                    '</div><br/>'+ 
                    '<div class="row col-md-6 col-md-offset-3">'+
                        '<form id="reg">'+
                            '<div  class="row">'+
                                '<div class="form-group col-lg-12">'+
                                    '<textarea  class="form-control" name="avvertenza" id="avvertenza" rows="3" readonly>'+$avv+'</textarea>'+
                                '</div>'+
                                '<div class="form-group col-lg-12">'+
                                    '<label  >Codice fiscale</label>'+
                                    '<input type="text" class="form-control" name="codFiscale" id="codFiscale" >'+
                                '</div>'+
                                '<div class="form-group col-lg-12">'+
                                    '<label >Ho letto ed accetto la <a href="http://www.iubenda.com/privacy-policy/94527847" target="_blank">privacy policy</a> <input type="checkbox" name="agree" id="agree" value=""></label><br>'+
                               '</div>'+
                            '</div>'+
                            '<div  class="row">'+
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button" id="btnPass" name="btnPass" class="btn btn-primary submit col-lg-6 btn-block">Invia la richiesta</button>'+
                                '</div>'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button"  class="btn btn-danger col-lg-6 btn-block" OnClick=" location.href=\'#it/login\' "><span aria-hidden="true">&times;</span> Annulla</button>'+
                                '</div>'+ 
                            '</div>'+
                        '</form>'+//end form 
                    '</div>'; //
               //----------------------------------------------
               that.$('#boot').empty();

                that.$('#boot').append($form);
                $.validator.addMethod("check_cod_fiscale", function(value, element) {
                    return /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/.test(value) 
                }); // consists of only these
                 that.$("#reg").validate({//sets up the validator
                    rules: {
                        codFiscale: {
                            required: true,
                            check_cod_fiscale: true
                        },
                         agree: {
                            required: true,
                        }
                        
                    },
                    messages:{
                        codFiscale: {
                            required: "Inserire il Codice fiscale",
                            check_cod_fiscale:"Il codice fiscale inserito non è valido!"
                        },
                        agree:{
                            required: "Seleziona questa casella se intendi procedere",
                        }
                       

                    }
                });
                that.$('#btnPass').click(function(e) {//
                   
                    if(that.$("#reg").valid()){
                       this.disabled = true;
                    //--------------------------------------------------------------
                    var API_URL = app.global.json_url + 'registration/';
                    var jsonObj = {};
                        jsonObj.codiceFiscale = that.$("#codFiscale").val();
                       
                        jsonObj.action = 'password';
                        jsonObj = JSON.stringify(jsonObj);
                        $headers = {
                            "X-Requested-With": "XMLHttpRequest",

                            //"username" : app.global.tokensCollection.first().get("username"),
                            "lang" : app.global.languagesCollection.at(0).get("lang"),
                            "Content-Type": "application/json"
                        };
                            
                        $.ajax({
                            url:API_URL,
                            type:'post',
                            headers : $headers,

                            data :  jsonObj,
                            //dataType: "json",
                            dataType : 'text',
                            success: function (datap) {
                                console.log(datap);
                                $mydata =JSON.parse(datap);
                                 console.log($mydata);
                                //-------------------------------------------------------
                                if ($mydata.success){
                                    bootbox.dialog({
                                        title: "Richiesta password",
                                        message:  $mydata.message,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                 app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });


                                }else{
                                   bootbox.dialog({
                                        title: "Richiesta password Errore",
                                        message:  $mydata.message,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });
 
                                }
                            },error : function (datap) {
                                console.log(datap);
                                $mydata =JSON.parse(datap.responseText);
                                 console.log($mydata);
                                  bootbox.dialog({
                                        title: "Richiesta password - Errore",
                                        message:  $mydata.error,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });
                             }
                        });

                    }else{
                    console.log("reg invalid");  
                    }
                });  
                
                break;}
            case "30"://arriva da utente non esistente
                 console.log('30');
              
            case "3"://
                bootbox.hideAll();
                console.log('3');
               
                 $form='<div class="row">'+
                        '<p><center><strong><h3>Richiesta di aiuto</h3></strong></center></p>'+
                       
                    '</div><br/>'+ 
                    '<div class="row col-md-6 col-md-offset-3">'+
                        '<form id="reg">'+
                              '<input type="hidden"  name="codMsg" id="codMsg" value="'+$txtcodMsg+'">'+
                            
                            '<div  class="row ">'+
                                '<div class="form-group col-lg-12">'+
                                    '<label >Codice Fiscale</label>'+
                                    '<input type="text" class="form-control" name="codFiscale" id="codFiscale" value="'+$txtcodFisc+'">'+
                                '</div>'+
                                '<div class="form-group col-lg-12">'+
                                    '<label >Nome e Cognome</label>'+
                                    '<input type="text" class="form-control" name="nome" id="nome" >'+
                                '</div>'+
                                '<div class="form-group col-lg-12">'+
                                    '<label >Inserisci la tua e-mail</label>'+
                                    '<input type="text" class="form-control" name="email" id="email" >'+
                                '</div>'+
                                '<div class="form-group col-lg-12">'+
                                    '<label >Inserisci il tuo numero di telefono</label>'+
                                    '<input type="text" class="form-control" name="phone" id="phone" >'+
                                '</div>'+

                                '<div class="form-group col-lg-12">'+
                                   '<label >Descrivi il problema</label>'+
                                   '<textarea  class="form-control" name="descrizione" id="descrizione" rows="6" ></textarea>'+
                               '</div>'+
                               '<div class="form-group col-lg-12">'+
                                    '<label >Ho letto ed accetto la <a href="http://www.iubenda.com/privacy-policy/94527847" target="_blank">privacy policy</a> <input type="checkbox" name="agree" id="agree" value=""></label><br>'+
                               '</div>'+
                            '</div>'+ 
                            '<div  class="row">'+
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button" id="btnHelp" name="btnHelp" class="btn btn-primary submit col-lg-6 btn-block">Invia la richiesta</button>'+
                                '</div>'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<button type="button"  class="btn btn-danger col-lg-6 btn-block" OnClick=" location.href=\'#it/login\' "><span aria-hidden="true">&times;</span> Annulla</button>'+
                                '</div>'+ 
                              
                            '</div>'+
                        '</form>'+//end form 
                    '</div>'; //
                //----------------------------------------------
                that.$('#boot').empty();

                that.$('#boot').append($form);
               
                $.validator.addMethod("check_cod_fiscale", function(value, element) {
                    return /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/.test(value) 
                }); // consists of only these
                $.validator.addMethod("check_email", function(value, element) {
                    return /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(value) 
                }); // consists of only these
                $.validator.addMethod("check_numero", function(value, element) {
                    return /^[0-9]+$/.test(value) 
                }); // consists of only these
                                                     
                                    
             
                that.$("#reg").validate({//sets up the validator
                    rules: {
                        codFiscale: {
                            required: true,
                            check_cod_fiscale: true
                        },
                        nome: {
                            required: true,
                            
                        },
                        email: {
                            required: true,
                            check_email: true
                        },
                        phone: {
                            required: true,
                            check_numero: true
                        },
                        descrizione: {
                            required: true,
                        },
                         agree: {
                            required: true
                        }
                    },
                    messages:{
                        codFiscale: {
                            required: "Inserire il Codice fiscale",
                            check_cod_fiscale:"Il codice fiscale inserito non è valido!"
                        },
                        nome: {
                            required: "Inserire il nome e cognome"
                        },
                        email: {
                            required: "Inserire la e-mail",
                            check_email:"La e-mail inserita non è valida!"
                        },
                        phone: {
                            required: "Inserire il numero di telefono",
                            check_numero:"Il numero inserito non è valido!"
                        },
                        descrizione: {
                            required: "Inserire la descrizione del problema"
                        },
                        agree:{
                            required: "Seleziona questa casella se intendi procedere",
                        }

                    }
                });
                that.$('#btnHelp').click(function(e) {//
                    if(that.$("#reg").valid()){

                    //--------------------------------------------------------------
                    var API_URL = app.global.json_url + 'registration/';
                    var jsonObj = {};
                        jsonObj.codiceFiscale = that.$("#codFiscale").val();
                        jsonObj.nome = that.$("#nome").val();
                        jsonObj.email = that.$("#email").val();
                        jsonObj.phone = that.$("#phone").val();
                        jsonObj.descrizione = that.$("#descrizione").val();
                        jsonObj.codMsg = that.$("#codMsg").val();
                        jsonObj.action = 'help';
                        jsonObj = JSON.stringify(jsonObj);
                        $headers = {
                            "X-Requested-With": "XMLHttpRequest",

                            //"username" : app.global.tokensCollection.first().get("username"),
                            "lang" : app.global.languagesCollection.at(0).get("lang"),
                            "Content-Type": "application/json"
                        };
                            
                        $.ajax({
                            url:API_URL,
                            type:'post',
                            headers : $headers,

                            data :  jsonObj,
                            //dataType: "json",
                            dataType : 'text',
                            success: function (datap) {
                                console.log(datap);
                                $mydata =JSON.parse(datap);
                                 console.log($mydata);
                                //-------------------------------------------------------
                                if ($mydata.success){
                                    bootbox.dialog({
                                        title: "Richiesta aiuto",
                                        message:  $mydata.message,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                 app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });


                                }else{
                                   bootbox.dialog({
                                        title: "Richiesta aiuto",
                                        message:  $mydata.message,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });
 
                                }
                            },error : function (datap) {
                                console.log(datap);
                                $mydata =JSON.parse(datap.responseText);
                                 console.log($mydata);
                                  bootbox.dialog({
                                        title: "Richiesta aiuto - Errore",
                                        message:  $mydata.error,
                                        buttons: {
                                            main: {
                                                label: that.language.label_button,
                                                className: "btn btn-succes",
                                                callback: function () {

                                                app.routers.router.prototype.login();
                                                }
                                            }
                                        }
                                    });
                             }
                        });

                    }else{
                    console.log("reg invalid");  
                    }
                });  
                break;
            default:
              that.$('#boot').empty();

          }
       /*

        $.validator.addMethod("check_username", function(value, element) {
            return this.optional(element) || value.match(/^[a-zA-Z0-9._-]+$/);
        });

        $.validator.addMethod("check_password", function(value, element) {
            return this.optional(element) || value.match(/^[a-zA-Z0-9@!$%._-]+$/);
        });

       
        this.$("#registrationForm").validate({
            rules: {
               // first_name: "required",
              //  last_name: "required",
                username: {
                    required: true,
                    check_username: true,
                    maxlength: 20,
                    minlength: 8
                },
                password: {
                    required: true,
                    check_password: true,
                    maxlength: 20,
                    minlength: 8
                },
                repassword: {
                    required: true,
                    
                    equalTo: "#password"
                },
                codice_fiscale: {
                   required: true,
                rangelength: [16, 16]  
                },
                agree: "required"
            },
            messages: this.language.form_messages
        });*/
        return this;
    },

    /** registration **/
    registration: function (event) {
        event.preventDefault();

        var that = this;
        var jsonObj = this.registration_formToJson();

        var _userModel = new app.models.user();

        /** POST USER **/
     
    
        _userModel.save(jsonObj, {
            success: function (model,response) {
                 console.log(model);
                  console.log(response);
                if (model.changed.success){
                    bootbox.dialog({
                        title: that.language.header_registration_message,
                        message: model.changed.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-info",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.router.prototype.index();
                                }
                            }
                        }
                    });
                }
                else {
                 // console.log(JSON.parse(response.responseText.message));
                    console.log(model);
                    bootbox.dialog({
                        title: that.language.error_message,
                        message: that.language.error_message + ' : ' +model.changed.message,
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
                console.log(model);
                console.log(model.changed);
            },
           error: function(model, response) {
        //var responseObj = $.parseJSON(response.responseText);
        //console.log('Type: ' + responseObj.error + ' Message: ' + responseObj.message);
    
            
           
               console.log(JSON.parse(response.message));
                bootbox.dialog({
                    title: that.language.error_message,
                    message: that.language.error_message +" = "+JSON.parse(response.responseText.message),
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
                console.log(response);
            },
            //url: app.const.apiurl() + 'user',
           url:app.global.json_url+'registration/',
          
            private: false
        });
         console.log(app.global.json_url+'registration/');
    },

    /** render user form data to JSON obj **/
    registration_formToJson: function() {
        var jsonObj = {};
        jsonObj.p="";
        jsonObj.p = hex_sha512(this.$("#password").val());
        // Assicurati che la password non venga inviata in chiaro.
        this.$("#password").val("") ;
        jsonObj.f_name = this.$('#first_name').val();
        jsonObj.l_name = this.$("#last_name").val();
        jsonObj.username = this.$('#username').val();
        jsonObj.password = this.$('#password').val();
        jsonObj.codice_fiscale = this.$('#codice_fiscale').val();
        return jsonObj;
    },

    /** destroy view and unbind all event **/
    destroy_view: function() {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.registrationView = null;
    }
});
return app.views.registration;
});
