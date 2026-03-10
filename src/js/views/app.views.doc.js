"use strict";
app.views.doc = Backbone.View.extend({
    initialize: function () {
        console.log("initializing doc view: ");
    },
    events: {
        "click-row.bs.table": "selRow"
    },
    selRow: function ($element, row, field) {
        console.log(row);
        var $table = this.$('#table');
        var API_URL = app.global.json_url + 'doc/';
        var $row = {};
        var $myData = {};
        var $ser = row.id;
        var $modal = this.$('#modal').modal({ show: false });
        var $alert = this.$('.alert').hide();
        $alert = this.$('.alert').hide();
        console.log(app.global.nick_array.arr);
        if (app.global.breadcrumb.length > 2) {
            app.global.breadcrumb.pop();
        }
        console.log(app.global.breadcrumb);
        console.log(app.global.breadcrumb.length);
        this.$(".breadcrumb").empty();
        for (var i = 0; i < app.global.breadcrumb.length; i++) {
            console.log(app.global.breadcrumb.length + "append->" + app.global.breadcrumb[i]['breadcrumb']);
            this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        var $headers = {
            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
            "lang": app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        $table.empty();
        selCall();
        function selCall() {
            switch (app.global.sub) {
                case "doc_personale":
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/doc" >' + row.shortDescription + '</a></li>'
                    });
                    console.log("nick_array.arr=DOC_Personale");
                    app.global.nick_array.arr = "DOC_Personale";
                    app.global.nick_array.tit = "DOC_Personale";
                    app.global.nick_array.grp = "DOC_Personale".toLowerCase() + ".type";
                    console.log(row.shortDescription);
                    break;
                default:
            }
            setTab();
        }
        function setTab() {
            var jsonObj = {};
            jsonObj.action = "get";
            jsonObj.servizio = $ser;
            jsonObj.type = app.global.nick_array.arr + "ROW";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url: API_URL,
                type: 'post',
                headers: $headers,
                data: jsonObj,
                dataType: 'text',
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        hrTable($myData);
                    }
                    else {
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
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
        } //end setTab()---------------------------
        function hrTable(my) {
            console.log(my);
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
        }
    },
    render: function (e) {
        $(this.el).html(this.template());
        console.log(app.global.sub); //app.global.sub viene impostato dalla selezione del navbar tramito il click sul selettore rifraf
        if (app.global.breadcrumb.length > 1) {
            app.global.breadcrumb.pop();
        }
        for (var i = 0; i < app.global.breadcrumb.length; i++) {
            this.$(".breadcrumb").append(app.global.breadcrumb[i]['breadcrumb']);
        }
        console.log(app.global.breadcrumb);
        var API_URL = app.global.json_url + 'doc/';
        var $row = {};
        var $myData = {};
        var $table = this.$('#table'); //
        var $modal = this.$('#modal').modal({ show: false });
        var $alert = this.$('.alert').hide();
        console.log(app.global.nick_array.arr);
        var $headers = {
            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
            //"username" : app.global.tokensCollection.first().get("username"),
            "lang": app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        selCall();
        function selCall() {
            switch (app.global.sub) {
                case "doc_personale":
                    console.log("nick_array.arr=DOC_Personale");
                    app.global.nick_array.arr = "DOC_Personale";
                    app.global.nick_array.tit = "DOC_Personale";
                    app.global.nick_array.grp = "DOC_Personale".toLowerCase() + ".type";
                    console.log("DOC_Personale");
                    break;
                default:
            }
            setTab();
        }
        function setTab() {
            var jsonObj = {};
            jsonObj.action = "get";
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url: API_URL,
                type: 'post',
                headers: $headers,
                data: jsonObj,
                dataType: 'text',
                success: function (datap) {
                    $myData = JSON.parse(datap);
                    if ($myData.success) {
                        hrTable($myData);
                    }
                    else {
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
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
        } //end setTab()----------------------------------------------------------------------
        this.$('input[type="radio"]').on('change', function (e) {
            switch (e.target.value) {
                case "1":
                    var filtered = _.filter($myData, function (item) {
                        return item.id_areaServizio === "1";
                    });
                    $('#titleTipo').text("Nell'area infanzia ci sono " + filtered.length + " servizi");
                    hrTable(filtered);
                    break;
                case "2":
                    var filtered = _.filter($myData, function (item) {
                        return item.id_areaServizio === "2";
                    });
                    $('#titleTipo').text("Nell'area sociale ci sono " + filtered.length + " servizi");
                    hrTable(filtered);
                    break;
                case "3":
                    var filtered = _.filter($myData, function (item) {
                        return item.id_areaServizio === "3";
                    });
                    $('#titleTipo').text("Nell'area tecnostruttura ci sono " + filtered.length + " servizi");
                    hrTable(filtered);
                    break;
                case "4":
                    $('#titleTipo').text("Complessivamente ci sono " + $myData.length + " servizi");
                    hrTable($myData);
                    break;
                case "5":
                    var filtered = _.filter($myData, function (item) {
                        return item.committenza_cod === "1";
                    });
                    $('#titleTipo').text("Ci sono " + filtered.length + " Committenti Privati");
                    hrTable(filtered);
                    break;
                case "6":
                    var filtered = _.filter($myData, function (item) {
                        return item.committenza_cod === "2";
                    });
                    $('#titleTipo').text("Ci sono " + filtered.length + " Committenti Pubblici");
                    hrTable(filtered);
                    break;
                case "7":
                    $('#titleTipo').text("In totale ci sono " + $myData.length + " Committenti");
                    hrTable($myData);
                    break;
                default:
            }
            /*   if(e.target.value==1){
                  
           
               
                   var filtered = _.filter($myData, function(item) {
                      
                       return item.id_areaServizio === "1"
                   });
                 $('#titleTipo').text("Nell'area infanzia ci sono "+filtered.length+" servizi");
                           hrTable(filtered );
                  
                  
               }else if(e.target.value==2){
                
                   var filtered = _.filter($myData, function(item) {
                      
                       return item.id_areaServizio === "2"
                   });
                 $('#titleTipo').text("Nell'area sociale ci sono "+filtered.length+" servizi");
                           hrTable(filtered );
                 
               }else if(e.target.value==3){
               
                 var filtered = _.filter($myData, function(item) {
                      
                       return item.id_areaServizio === "3"
                   });
                  $('#titleTipo').text("Nell'area tecnostruttura ci sono "+filtered.length+" servizi");
                           hrTable(filtered );
                  
               
                }else if(e.target.value==4){
                   
                   $('#titleTipo').text("Complessivamente ci sono "+$myData.length+" servizi");
                           hrTable($myData);
                  
               }*/
        });
        window.actionEvents = {
            'click .removeTel': function (e, value, row) {
                console.log("--removeTelK=" + _.keys($row) + "--removeTelV=" + _.values($row));
            },
            'click .update': function (e, value, row) {
                if (app.global.nick_array.arr === "RMA_catDispositivi") {
                    console.log('dispositivi edit');
                    $("#newModalForm").empty();
                    $("#newModalForm").append('<input type="hidden" class="form-control" name="id" value="' + row.id + '">' +
                        '<div class="form-group col-lg-6">' +
                        '<label id="lblname" for="dispositivo">Dispositivo</label>' +
                        '<select class="form-control disp" id="dispositivo" name="dispositivo" title="Scegli una opzione">' +
                        '<option value="Estintore">Estintore</option>' +
                        '<option value="Maniglione Antipanico">Maniglione Antipanico</option>' +
                        '<option value="Rilevatore Fumo">Rilevatore Fumo</option>' +
                        '<option value="Luce Emergenza">Luce Emergenza</option>' +
                        '<option value="Idrante">Idrante</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="form-group col-lg-6">' +
                        '<label  id="lblCat" for="categoria">Tipologia</label>' +
                        '<input  type="text" name="tipologia" id="tipologia"  class="form-control" value="' + row.tipologia + '">' +
                        '</div>');
                    $('.modal-title').text("Modifica Tipologia Dispositivo");
                    $('.disp').find('option[value="' + row.dispositivo + '"]').attr('selected', 'selected');
                    $modal.modal('show');
                }
                else {
                    $folder = row.name;
                    if (row.valid == 1) {
                        row.valid = true;
                    }
                    else {
                        row.valid = false;
                    }
                    isNew = false;
                    $row = row;
                    //setForm();
                    app.global.nick_array.isNew = isNew;
                    app.global.nick_array.id = row.id;
                    app.global.nick_array.data = row;
                    app.global.nick_array.Type = row.name;
                    app.global.breadcrumb.push({
                        breadcrumb: '<li class="breadcrumb-item active">' + row.name + '</li>'
                    });
                    app.global.data_type_editView.destroy_view();
                    app.routers.router.prototype.data_type_editType({});
                }
            },
            'click .remove': function (e, value, row) {
                console.log(app.global.nick_array.arr);
                $lblAlert = "";
                switch (app.global.nick_array.arr) {
                    case "Ditte":
                        $lblAlert = "Ditta";
                        break;
                    case "Committenti":
                        $lblAlert = "Committente";
                        break;
                    case "RMA_catDispositivi":
                        $lblAlert = "Dispositivo";
                        break;
                    default: //servizi
                        $lblAlert = "Servizio";
                }
                if (confirm('Sei sicuro di voler rimuovere questo ' + $lblAlert + '?')) {
                    var jsonObj = {};
                    jsonObj.action = "del";
                    jsonObj.type = app.global.nick_array.arr;
                    //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.data = row;
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (datap) {
                            console.log(datap.data);
                            $mydata = JSON.parse(datap);
                            // $mydata =(datap);
                            console.log(($mydata.message));
                            if ($mydata.error) {
                                showAlert($mydata.message, 'danger');
                            }
                            else {
                                //showAlert('Delete item successful!', 'success');
                                showAlert($mydata.message, 'success');
                            }
                            app.routers.router.prototype.data_type_edit();
                            //    $table.bootstrapTable('refresh',  setTab());
                        },
                        error: function () {
                            showAlert('Delete item error!', 'danger');
                        }
                    });
                }
            } //remove
        };
        function setForm() {
            if (app.global.nick_array.arr == "DEPARTMENTS") {
                this.$("#newModalForm").empty();
                this.$("#newModalForm").append('<input type="hidden" class="form-control" name="id" >' +
                    '<div class="form-group">' +
                    '<label id="lblname" for="name">Nome Servizio</label>' +
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Servizio" >' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>' +
                    '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo">' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="form-group col-lg-4">' +
                    '<label  id="lblcomune" for="comune">Comune</label>' +
                    '<select  name="comune" id="comune"  class="form-control" ></select>' +
                    '</div>' +
                    '<div class="form-group col-lg-3">' +
                    '<label  id="lblcap" for="cap">CAP</label>' +
                    '<select  name="cap" id="cap"  class="form-control" ></select>' +
                    '</div>' +
                    '<div class="form-group col-lg-2">' +
                    '<label  id="lblprovincia" for="provincia">Prov.</label>' +
                    '<select  name="provincia" id="provincia"  class="form-control" ></select>' +
                    '</div>' +
                    '<div class="form-group col-lg-3">' +
                    '<label  id="lblregione" for="regione">Regione</label>' +
                    '<select  name="regione" id="regione"  class="form-control" ></select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row ">' +
                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">' +
                    '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>' +
                    //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                    '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>' +
                    '</div>' +
                    '</div>' +
                    '<div id="email"></div>' +
                    '<div class="row ">' +
                    '<div class="form-group col-lg-12" style="background-color: #f5f5f5">' +
                    '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>' +
                    // '<button type="button" id="telefonoPlus" name="telefonoPlus" class="btn btn-default btn-lg telefono-Plus">'+
                    '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '<div id="telefoni" name"telefoni[]"></div>' +
                    '<div class="row">' +
                    '<div class="form-group col-lg-6">' +
                    '<label for="device1">Dispositivo 1</label>' +
                    '<input type="text" class="form-control" name="device1" id="device1" placeholder="Dispositivo 1">' +
                    '</div>' +
                    '<div class="form-group col-lg-6">' +
                    '<label for="device2">Dispositivo 2</label>' +
                    '<input type="text" class="form-control" name="device2" id="device2" placeholder="Dispositivo 2">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label>Valido</label>' +
                    '<input type="checkbox" class="form-control" name="valid" id="valid" placeholder="Valido" value="1">' +
                    '</div>' /*+
                '<div class="row">'+
                    '<div class="form-group col-lg-3 col-lg-push-3">'+
                        '<button type="button"   id="butMod" class="btn btn-primary submit ">Submit</button>'+
                    '</div>'+
                    '<div class="form-group col-lg-3 col-lg-push-3">'+
                        '<button type="button" class="btn btn-default " data-dismiss="modal">Close</button>'+
                    '</div>'+
                '</div>'*/); //add input box
                this.$("#newModalForm").validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        }
                    },
                    messages: {
                        name: {
                            required: "Perfavore inserisci il nome del Servizio",
                            minlength: "Il nome del Servizio deve contenere perlomeno 2 caratteri"
                        }
                    } /*,
                    submitHandler: function (form) {
                     alert("Validation Success!");
                     //  return true; // if you need to block normal submit because you used ajax
                    }*/
                });
                var $selRegione = this.$("#regione");
                var $selProvincia = this.$("#provincia");
                var $selComune = this.$("#comune");
                var $selCap = this.$("#cap");
                regioni();
                //-------------------------------regioni------------------------------------------
                function regioni() {
                    var jsonObj = {};
                    //jsonObj.action = "regione";
                    //jsonObj.type = app.global.nick_array.arr;
                    jsonObj.action = "list";
                    jsonObj.type = "regioni";
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (json) {
                            $mydata = JSON.parse(json);
                            $selRegione.empty();
                            $aa = $mydata.data;
                            $.each($aa, function (i, value) {
                                $selRegione.append('<option value="' + $aa[i]["id"] + '">' + $aa[i]["nome"] + '</option>');
                            });
                            // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                            if (isNew) {
                                parseInt($selRegione.val(17)); //seleziona toscana 17
                            }
                            else {
                                $selRegione.val(parseInt($row.id_regione)); //seleziona toscana
                                console.log("selReg=" + $row.id_regione + " arr=" + _.keys($row));
                            }
                            province();
                        }
                    });
                }
                //-------------------------------province------------------------------------------
                function province() {
                    var jsonObj = {};
                    jsonObj.action = "provincia";
                    jsonObj.type = app.global.nick_array.arr;
                    if (isNew) {
                        jsonObj.regione = parseInt($selRegione.val());
                    }
                    else {
                        jsonObj.regione = parseInt($row.id_regione);
                    }
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (json) {
                            $mydata = JSON.parse(json);
                            $selProvincia.empty();
                            $aa = $mydata.data;
                            $.each($aa, function (i, value) {
                                $selProvincia.append('<option value="' + $aa[i]["id"] + '">' + $aa[i]["sigla"] + ' (' + $aa[i]["nome"] + ')</option>');
                            });
                            if (isNew) {
                                parseInt($selProvincia.val()); //seleziona pr firenze 33
                            }
                            else {
                                $selProvincia.val(parseInt($row.id_provincia)); //seleziona pr firenze 33
                            }
                            comuni();
                        }
                    });
                }
                //-------------------------------comuni------------------------------------------
                function comuni() {
                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type = "comuni";
                    if (isNew) {
                        jsonObj.provincia = parseInt($selProvincia.val());
                    }
                    else {
                        jsonObj.provincia = parseInt($row.id_provincia);
                    }
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (json) {
                            $mydata = JSON.parse(json);
                            $selComune.empty();
                            $aa = $mydata.data;
                            $.each($aa, function (i, value) {
                                $selComune.append('<option value="' + $aa[i]["id"] + '">' + $aa[i]["comune"] + '</option>');
                            });
                            // $selComune.val(2797);//seleziona firenze
                            if (isNew) {
                                parseInt($selComune.val()); //seleziona comune firenze 2797
                            }
                            else {
                                $selComune.val(parseInt($row.id_comune)); //seleziona pr firenze 33
                            }
                            cap();
                        }
                    });
                }
                //-------------------------------cap------------------------------------------
                function cap() {
                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type = "cap";
                    if (isNew) {
                        jsonObj.comune = parseInt($selComune.val());
                    }
                    else {
                        jsonObj.comune = parseInt($row.id_comune);
                    }
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url: API_URL,
                        type: 'post',
                        headers: $headers,
                        data: jsonObj,
                        dataType: 'text',
                        success: function (json) {
                            $mydata = JSON.parse(json);
                            $selCap.empty();
                            $aa = $mydata.data;
                            $.each($aa, function (i, value) {
                                $selCap.append('<option value="' + $aa[i]["id"] + '">' + $aa[i]["cap"] + '</option>');
                            });
                            // $selComune.val(2797);//seleziona firenze
                            if (isNew) {
                                $selCap.val(); //seleziona pr firenze 33
                            }
                            else {
                                $selCap.val(parseInt($row.id_cap)); //seleziona pr firenze 33
                            }
                        }
                    });
                }
                //-------------------------------------event----------------------------------------------------------------
                this.$('#regione').change(function (e, value, row) {
                    isNew = true;
                    province();
                });
                this.$('#provincia').change(function (e) {
                    isNew = true;
                    comuni();
                });
                this.$('#comune').change(function (e) {
                    isNew = true;
                    cap();
                });
            } //end if   
            //----------------------------------------------------------------------------------------------
        } //end callForm
        // emailPlus event------------------------------------------------------------------------
        this.$('#modal').on('show.bs.modal', function (e) {
            console.log("modale show-");
            $modal.find('.email-Plus').click(function () {
                $iEmail = $iEmail + 1;
                $i = $iEmail;
                $("#email").append('<div class="row">' +
                    '<input type="hidden" class="form-control" name="email[' + $i + '][id]" >' +
                    '<div class="form-group col-lg-8">' +
                    '<input type="text" class="form-control" name="email[' + $i + '][email]" id="email[' + $i + '][email]" placeholder="Email" require>' +
                    '</div>' +
                    '<div class="form-group col-lg-3">' +
                    '<input type="text" class="form-control" name="email[' + $i + '][emailNome]" id="email[' + $i + '][emailNome]" placeholder="Nome Email">' +
                    '</div>' +
                    '<div class="form-group col-lg-1">' +
                    '<a class="removeEmail' + $iEmail + '" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>' +
                    '</div>' +
                    '</div>'
                // '<hr class="style13">'   
                );
                $('.removeEmail' + $iEmail).children().each(function () {
                    $(this).click(function () {
                        $(this).closest(".row").remove();
                    });
                });
                $("#newModalForm").validate(); //sets up the validator
                // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                $("input[name=\"email[" + $i + "][email]\"]").rules("add", {
                    required: true,
                    // minlength: 2,
                    email: true,
                    messages: {
                        required: "Required input",
                        minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        email: "Deve essere una email valida!"
                    }
                });
            });
            $modal.find('.telefono-Plus').click(function () {
                $iTel = $iTel + 1;
                $i = $iTel;
                $("#telefoni").append('<div class="row">' +
                    '<input type="hidden" class="form-control" name="telefoni[' + $i + '][id]" >' +
                    '<div class="form-group col-lg-8">' +
                    '<input type="text" class="form-control" name="telefoni[' + $i + '][telefono]" id="telefoni[' + $i + '][telefono]" placeholder="Telefono" col-lg-7>' +
                    '</div>' +
                    '<div class="form-group col-lg-3">' +
                    '<input type="text" class="form-control" name="telefoni[' + $i + '][telefonoNome]" id="telefoni[' + $i + '][telefonoNome]" placeholder="Nome Telefono">' +
                    '</div>' +
                    '<div class="form-group col-lg-1">' +
                    '<a class="removeTel' + $iTel + '" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>' +
                    '</div>' +
                    '</div>'
                //   '<hr class="style13">'   
                );
                $("#newModalForm").validate(); //sets up the validator
                // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                $("input[name=\"telefoni[" + $i + "][telefono]\"]").rules("add", {
                    required: true,
                    minlength: 8,
                    number: true,
                    messages: {
                        required: "Inserire numero del Telefono",
                        minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        number: "Deve essere un numero di Telefono valido"
                    }
                });
                $('.removeTel' + $iTel).children().each(function () {
                    $(this).click(function () {
                        $(this).closest(".row").remove();
                    });
                });
            });
        });
        // create event------------------------------------------------------------------------
        this.$('.create').click(function () {
            /*
            isNew=true;
            $row={};
            console.log("isNew="+isNew);
            setForm();
            showModal($(this).text());
            */
            isNew = true;
            app.global.nick_array.isNew = isNew;
            app.global.nick_array.Type = "New";
            if (app.global.sub == "catDispositivi") {
                $("#newModalForm").empty();
                $("#newModalForm").append('<input type="hidden" class="form-control" name="id" >' +
                    '<div class="form-group col-lg-6">' +
                    '<label id="lblname" for="dispositivo">Dispositivo</label>' +
                    '<select class="form-control" id="dispositivo" name="dispositivo" title="Scegli una opzione">' +
                    '<option value="Estintore">Estintore</option>' +
                    '<option value="Maniglione Antipanico">Maniglione Antipanico</option>' +
                    '<option value="Rilevatore Fumo">Rilevatore Fumo</option>' +
                    '<option value="Luce Emergenza">Luce Emergenza</option>' +
                    '<option value="Idrante">Idrante</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="form-group col-lg-6">' +
                    '<label  id="lblCat" for="categoria">Tipologia</label>' +
                    '<input  type="text" name="tipologia" id="tipologia"  class="form-control" >' +
                    '</div>');
                $('.modal-title').text("Add Tipologia Dispositivo");
                $modal.modal('show');
            }
            else {
                app.global.data_type_editView.destroy_view();
                app.routers.router.prototype.data_type_editType();
            }
        });
        // submit event------------------------------------------------------------------------
        var that = this;
        this.$("#newModalForm").validate();
        $modal.find('.submit').click(function () {
            var feed = {
                name: that.$('#name').val(),
                comune: that.$('#comune').val(),
                indirizzo: that.$('#indirizzo').val(),
                device1: that.$('#device1').val(),
                device2: that.$('#device2').val()
            };
            var row = {};
            $modal.find('input[name]').each(function () {
                console.log("che=" + $(this).attr('name') + "---" + $(this).prop("checked"));
                if ($(this).attr('name') == "valid") {
                    row[$(this).attr('name')] = $(this).prop("checked");
                }
                else {
                    row[$(this).attr('name')] = $(this).val();
                }
            });
            $modal.find('select[name]').each(function () {
                row[$(this).attr('name')] = parseInt($(this).val());
            });
            console.log("che=" + $modal.find('input[name="valid"]').prop("checked"));
            console.log("cherow=" + row.id + " - " + row.valid + "---" + _.keys(row));
            var typeName = row.name;
            var typeComune = row.comune;
            var typeCartella = row.shortDescription;
            if (app.global.nick_array.arr !== "DEPARTMENTS") {
                if (typeName == "") {
                    bootbox.alert({
                        title: " Errore",
                        message: "Inserire il Nome!",
                    });
                    return;
                }
                if (typeComune == "") {
                    bootbox.alert({
                        title: " Errore",
                        message: "Inserire la descrizione!",
                    });
                    return;
                }
                if (typeCartella == "") {
                    bootbox.alert({
                        title: " Errore",
                        message: "Inserire la descrizione breve!",
                    });
                    return;
                }
            }
            else { //siamo nei servizi
                if (feed.device1 == "") {
                    row.device1 = "";
                }
                if (feed.device2 == "") {
                    row.device2 = "";
                }
                if (feed.name == "") {
                    bootbox.alert({
                        title: "Nuovo Servizio  Errore",
                        message: "Inserire il Nome del Servizio!",
                    });
                    return;
                }
                if (typeComune == "") {
                    row.comune = "";
                    bootbox.alert({
                        title: "Nuovo Servizio  Errore",
                        message: "Inserire il Comune!",
                    });
                    return;
                }
                if (typeCartella == "") {
                    bootbox.alert({
                        title: "Nuovo Servizio Errore",
                        message: "Inserire il nome della cartella!",
                    });
                    return;
                }
            }
            //---------------serialize form-----------------------------------------------
            var data = {};
            function buildInputObject(arr, val) {
                if (arr.length < 1)
                    return val;
                var objkey = arr[0];
                if (objkey.slice(-1) == "]") {
                    objkey = objkey.slice(0, -1);
                }
                var result = {};
                if (arr.length == 1) {
                    result[objkey] = val;
                }
                else {
                    arr.shift();
                    var nestedVal = buildInputObject(arr, val);
                    result[objkey] = nestedVal;
                }
                return result;
            }
            $.each(that.$('#newModalForm').serializeArray(), function () {
                //$.each(row, function() {
                var val = this.value;
                var c = this.name.split("[");
                var a = buildInputObject(c, val);
                $.extend(true, data, a);
            });
            console.log(data);
            //-------------------------------------------------------------------------     
            console.log(data.id);
            var typeId = data.id;
            var typej = typeId ? 'update' : 'add';
            var jsonObj = {};
            jsonObj.action = typej;
            jsonObj.type = app.global.nick_array.arr;
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.data = data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            if (app.global.nick_array.arr === "DEPARTMENTS") {
                if (row.name === $folder) {
                }
                else {
                    jsonObj.oldFolder = $folder;
                }
            }
            jsonObj = JSON.stringify(jsonObj);
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang": app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            console.log("API_URL=" + API_URL);
            $.ajax({
                url: API_URL,
                type: 'post',
                headers: $headers,
                data: jsonObj,
                dataType: 'text',
                success: function (datap) {
                    console.log(datap.data);
                    $mydata = JSON.parse(datap);
                    // $mydata =(datap);
                    console.log(($mydata.message));
                    console.log(($mydata.errorCode));
                    //-------------------------------------------------------
                    if ($mydata.success) {
                        $modal.modal('hide');
                        showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
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
                        $table.bootstrapTable('refresh', setTab());
                        //  hrTable($mydata);
                    }
                    else {
                        bootbox.dialog({
                            title: that.language.error_message,
                            message: that.language.error_message + ' : ' + $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                    }
                                }
                            }
                        });
                        // console.log("refre");
                        // $table.bootstrapTable('refresh',  callList());
                    }
                },
                error: function (response, exception) {
                    // $mydata =JSON.parse(datap);
                    console.error("hr list load table error!!!");
                    bootbox.dialog({
                        title: that.language.error_message,
                        message: that.language.error_message + " = " + response.responseText + " excp=" + exception + " 2=" + response.getAllResponseHeaders() + " 3=" + _.keys(response.statusCode()),
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function () {
                                    $("body").removeClass("modal-open");
                                }
                            }
                        }
                    });
                }
            });
        });
        function hrTable(my) {
            console.log(my);
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: my.data,
                columns: my.tab,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
        }
        function showModal(title, row) {
            var t = this;
            row = row || {
                id: '',
                name: '',
                valid: '',
                shortDescription: '',
                description: '',
                device1: '',
                device2: '',
                indirizzo: '',
                regione: 0,
                provincia: 0,
                cap: 0,
                comune: 0 /*,
               email:[{id:'',
                emailNome: '',
                email: ''}],
                telefoni:[{id:'',
                telefonoNome: '',
                telefonoNumero: ''}]*/
            }; // default row value
            console.log("title=" + title + " row=" + _.keys(row) + _.values(row));
            $modal.data('id', row.id);
            $modal.find('.modal-title').text(title);
            if (app.global.nick_array.arr !== "DEPARTMENTS") {
                for (var name in row) {
                    console.log("title=" + name);
                    if (name == "description") {
                        $modal.find('label[id="lbl' + name + '"]').html("Descrizione");
                        $modal.find('input[id="' + name + '"]').attr("placeholder", "Descrizione");
                    }
                    if (name == "shortDescription") {
                        $modal.find('label[id="lbl' + name + '"]').html("Descrizione breve");
                        $modal.find('input[id="' + name + '"]').attr("placeholder", "Descrizione breve");
                    }
                }
            }
            for (var name in row) {
                if (name == "valid") {
                    $modal.find('input[name="valid"]').prop("checked", row[name]);
                }
                else if (name === "telefoni") {
                    console.log("telefoniL=" + row[name].length);
                    for ($i = 0; $i < row[name].length; $i++) {
                        $iTel = $i;
                        console.log("telefoni i=" + $iTel);
                        $("#telefoni").append('<div class="row">' +
                            '<input type="hidden" class="form-control" name="telefoni[' + $i + '][id]" id="telefoni[' + $i + '][id]" value="' + row[name][$i]['id'] + '">' +
                            '<div class="form-group col-lg-8">' +
                            // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                            '<input type="text" class="form-control" name="telefoni[' + $i + '][telefono]" id="telefoni[' + $i + '][telefonoNumero]" value="' + row[name][$i]['telefonoNumero'] + '" placeholder="Telefono" col-lg-7>' +
                            '</div>' +
                            '<div class="form-group col-lg-3">' +
                            // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                            '<input type="text" class="form-control" name="telefoni[' + $i + '][telefonoNome]" id="telefoni[' + $i + '][telefonoNome]" value="' + row[name][$i]['telefonoNome'] + '" placeholder="Nome Telefono">' +
                            '</div>' +
                            '<div class="form-group col-lg-1">' +
                            //   '<label >Del</label>'+
                            '<a class="removeTel' + $i + '" idx="' + $i + '" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>' +
                            '</div>' +
                            '</div>'
                        //   '<hr class="style13">'   
                        );
                        $('.removeTel' + $iTel).click(function (e) {
                            $idx = $(this).attr("idx");
                            $idxi = $modal.find('input[name="telefoni[' + $idx + '][id]"]').val();
                            $(this).closest(".row").remove();
                            var jsonObj = {};
                            jsonObj.id = $idxi;
                            jsonObj.type = "telefoni";
                            jsonObj.action = "del";
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
                            $.ajax({
                                url: API_URL,
                                type: 'post',
                                headers: $headers,
                                data: jsonObj,
                                dataType: 'text',
                                success: function (json) {
                                    $mydata = JSON.parse(json);
                                }
                            });
                        });
                        $("#newModalForm").validate(); //sets up the validator
                        // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni[" + $i + "][telefono]\"]").rules("add", {
                            required: true,
                            minlength: 6,
                            number: true,
                            messages: {
                                required: "Perfavore inserisci il numero di telefono",
                                minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                number: "Deve essere un numero di Telefono  valido!"
                            }
                        });
                        //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                        //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                        //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                        //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                    }
                }
                else if (name === "email") {
                    for ($i = 0; $i < row[name].length; $i++) {
                        $iEmail = $i;
                        $("#email").append('<div class="row">' +
                            '<input type="hidden" class="form-control" name="email[' + $i + '][id]" id="email[' + $i + '][id]" value="' + row[name][$i]['id'] + '">' +
                            '<div class="form-group col-lg-8">' +
                            '<input type="text" class="form-control" name="email[' + $i + '][email]" id="email[' + $i + '][email]" value="' + row[name][$i]['email'] + '" placeholder="Email" col-lg-7>' +
                            '</div>' +
                            '<div class="form-group col-lg-3">' +
                            '<input type="text" class="form-control" name="email[' + $i + '][emailNome]" id="email[' + $i + '][emailNome]" value="' + row[name][$i]['emailNome'] + '" placeholder="Nome Email">' +
                            '</div>' +
                            '<div class="form-group col-lg-1">' +
                            '<a class="removeEmail' + $i + '" idx="' + $i + '" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>' +
                            '</div>' +
                            '</div>'
                        //   '<hr class="style13">'   
                        );
                        $('.removeEmail' + $iEmail).click(function (e) {
                            $idx = $(this).attr("idx");
                            $idxi = $modal.find('input[name="email[' + $idx + '][id]"]').val();
                            $(this).closest(".row").remove();
                            var jsonObj = {};
                            jsonObj.id = $idxi;
                            jsonObj.type = "email";
                            jsonObj.action = "del";
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);
                            $.ajax({
                                url: API_URL,
                                type: 'post',
                                headers: $headers,
                                data: jsonObj,
                                dataType: 'text',
                                success: function (json) {
                                    $mydata = JSON.parse(json);
                                }
                            });
                        });
                        $("#newModalForm").validate(); //sets up the validator
                        // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email[" + $i + "][email]\"]").rules("add", {
                            required: true,
                            // minlength: 2,
                            email: true,
                            messages: {
                                required: "Required input",
                                minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                email: "Deve essere una email valida!"
                            }
                        });
                    }
                }
                else {
                    $modal.find('input[name="' + name + '"]').val(row[name]);
                    console.log('input[name=' + name + ']=' + row[name]);
                }
            }
            for (var name in row) {
                console.log('select[name=' + name + ']=' + row[name]);
                $modal.find('select[name="' + name + '"]').val(row[name]);
            }
            $modal.modal('show');
        }
        function showAlert(title, type) {
            $alert.attr('class', 'alert alert-' + type || 'success')
                .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
            setTimeout(function () {
                $alert.hide();
            }, 3000);
        }
        $(document).attr("title", app.global.app_short_name + " - " + app.global.app_long_name + " | " + this.language.type + " | " + this.language.lang);
        return this;
    }, //end render
    destroy_view: function () {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.data_type_editView = null;
    }
});
