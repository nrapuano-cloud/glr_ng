require(['app','bootbox'], function(app,bootbox){
app.views.data_type_edit=Backbone.View.extend({

    initialize:function(){
        console.log("initializing data_type_edit view: "+ app.global.nick_array.arr,app.global.sub);
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
             
            }}});
    },
    headerJson: function(){
        var $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            // "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
        return $headers;
    },

    events:{
       'click #listID': "listID" ,
       "change #mese":"changeMonth",
       "change #year":"changeYear",
    
    },
     
   
    changeMonth:function(){
           
        localStorage.setItem("selMonth",  $mese.val());
        this.setSelect(this,$anno.val(),$mese.val(),$week.val());
        this.selCall(this);
       
    },
    changeYear:function(){
       
        localStorage.setItem("selYear",  $anno.val());
        this.setSelect(this,$anno.val(),$mese.val(),$week.val());
        this.selCall(this);
       
    },
    listID: function(){
        var totSer,totAbSer=0+'';
      
      
        $('.modal-body').empty();
        $('.modal-body').append('<textarea class="form-control" name="listIDser" id="listIDser"  rows="3"></textarea>');
        $('.modal-footer').empty();
        $('.modal-footer').append(' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
        // creo array di tutti i servizi con gli id e cast to number
        var listSer=_.pluck($("#table1").bootstrapTable('getData'),( ('id'))).map(Number);;
 

        var servizi_on = [];
        var $listIDstr = '';
        //creo array solo dei servizi selezionati  in base all'indice del check
        $('input[name="btSelectItem"]:checked').each(function () {
            servizi_on.push(listSer[$(this).data('index')]);
       });
       //ordino l'array
         servizi_on = _.sortBy(servizi_on, function( num) {
                return num;
            });
            
         $(servizi_on).each(function (index,id) {
              console.log(index,'-',id);
        
            if(index==0){
              
            $listIDstr=id;  
            }else{
           
            $listIDstr=$listIDstr+','+id; 
            }
           
          
        });
        console.log(listSer);
        console.log(servizi_on);
       totSer=listSer.length;
       totAbSer=servizi_on.length;
          $('.modal-title').text("Lista ID servizi abilitati per un totale di "+totAbSer+" su "+totSer);
         $("#listIDser").val($listIDstr); 
        /*
         var copyText = document.querySelector("#listIDser");
  copyText.select();
  document.execCommand("copy");
   */
        
    },
    setSelect:function(that,anno,mese,week,date,anni=[]){
        
        
        $mese= that.$('#mese');
        $anno= that.$('#year');
        $week= that.$('#week');
        moment.locale('it');  
        date1=moment(date);
        console.log("setSelect",anno,mese,week,date, date1);
       // let date = moment();
        var monday = date1.clone().weekday(0);
        var friday = date.clone().weekday(5);//da 4 venerdi a 5 sabato
        var isNowWeekday = date.isBetween(monday, friday, null, '[]');

     //   console.log(`now: ${date}`);
     //   console.log(`monday: ${monday}`);
     //   console.log(`friday: ${friday}`);

        that.$('#data').empty().append("Settimana n° "+week+" da "+monday.format('dddd D MMMM YYYY ')+" a "+friday.format('dddd D MMMM YYYY '))
     //   console.log(`is now between monday and friday: ${isNowWeekday}`);
     //   console.log(date,week,monday,friday);
        
        $mese.empty();
     //   console.log(date._locale._months);
        date._locale._months.forEach(function(mon,idx) {
        //    console.log(mon,idx);
            $mese.append('<option value="'+idx+'">'+mon+'</option>');
        });
        $anno.empty();
        let $arrAnno=[];
        $arrAnno.push(anno);
        if(anni.length===0){
            for(let i=0;i<anni.length;i++){
                $arrAnno.push(anni[i]);
            
            } 
            var uniq = $arrAnno.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a;
            },[]);
            for(let i=0;i<uniq.length;i++){
                
                $anno.append('<option value="'+uniq[i]+'">'+uniq[i]+'</option>');
            } 
        }else{
            $anno.append('<option value="'+anno+'">'+anno+'</option>');
        }  
        $anno.val(anno);
        $mese.val(mese);
        $week.val("Week n° "+week);
       
      
    } ,
    selCall: function (that,anno,mese,week,date) {//richiesta dati per popolare tabella, status Month 0 1
        console.log("selCall");
        $action="post";
        $url=app.global.json_url+'rma/pmm/';

        that=this;   
        var API_URL =''; 
   //     console.log(app.global.sub); 
            
        API_URL=$url;
        var jsonObj = {};
        jsonObj.action = "get";
        jsonObj.sub_area = app.global.sub;
        jsonObj.type = "pmm";
        jsonObj.year =anno;// that.$("#year").val();
        jsonObj.month =mese;// that.$("#mese").val();
        jsonObj.week_no =week;
        jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
        jsonObj.id_servizio = app.global.nick_array.arr.id;
        jsonObj = JSON.stringify(jsonObj);
        $.ajax({
            url: API_URL,
            type: 'post',
            data :  jsonObj,
            dataType : 'text',
            headers: this.headerJson(),
            
            success: function (datap) {
                $myData = JSON.parse(datap);
                if ($myData.success) {
                    that.utenti=$myData.manutentori
                    app.global.nick_array.data=$myData
                    that.hrTable(that,$myData); 
                }
                else {
                    bootbox.dialog({
                        title: that.language.error_message,
                        message: that.language.error_message + ' : ' + $myData.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function () {
                                    $("body").removeClass("modal-open");
                                        app.routers.router.prototype.logout();
                                }
                            }
                        }
                    });
                }
            },
            error: function () {
                console.error("doc asa load table error!!!");
            }
        });
    }, //end selCall()----------------------------------------------------------------------
    hrTable: function (that,my) {//popola tabella con i dati ricevuti
       console.log("hr Table",localStorage.getItem("date"));
        let $table= that.$('#table');
       // $mese= that.$('#mese');
        //$anno= that.$('#year');
        let $mese=Number(localStorage.getItem("selMonth"));
        let $anno=Number(localStorage.getItem("selYear"));
        let $week=Number(localStorage.getItem("week"));
        let date=moment(localStorage.getItem("date"));
        $planD=my.previste;
        $planF=my.fatti;
        $headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
            
            "username" : app.global.tokensCollection.first().get("username"),
            "lang" : app.global.languagesCollection.at(0).get("lang"),
            "Content-Type": "application/json"
        };
      
        
        that.$(".toolbar").empty().append(my.newR); 
        $format=my.format;
        if(typeof my.newR !== 'undefined'){
            this.$("#newR").append(my.newR);
        }
      
        
      //  let date = new Date();//date default start courrent date
        let date1 = new Date();
        let day = date.toLocaleString('it-IT', {weekday: 'short'});
        let month = date.toLocaleString('it-IT', {month: 'short'});
        var tab = moment(date).daysInMonth();
        console.log(tab);
      
       // $anno.empty();
       
      /*  for(let i=0;i<my.anni.length;i++){//casomai ci fossero anni precedenti
            $anno.append('<option value="'+my.anni[i].anno+'">'+my.anni[i].anno+'</option>');
        }   */ 
       
          //  $anno.val(localStorage.getItem("selYear"));
       
       
          //  $mese.val(localStorage.getItem("selMonth"));
            console.log($anno,$mese,$week,date,date1,moment(date).week());
          
        var columns=[];
       // setDays(tab);
      
      // setDays(5);
       setDays(6);
        function setDays(tab1){
          
            date1.setMonth(Number($mese))
            date1.setYear(Number($anno))
           
            const from_date = date.clone().startOf('week');
            tab = moment(date1).daysInMonth() ;
            console.log(date,date1,tab1,tab,localStorage.getItem("date"),localStorage.getItem("selMonth"),localStorage.getItem("selYear"));
            columns=[];
            let $utenti="";
            if(my.manutentori.length===1){
                $utenti=my.manutentori.length+" Manutentore";
            }else{
                $utenti=my.manutentori.length+" Manutentori";
            }
            columns[0] = {
                "field":0,
                "title":$utenti,
                footerFormatter:idFormatter,
                cellStyle: cellStyle1,
                align: 'center',
                valign: 'middle'
                       
            }
            let setBg="";
            let options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'};
            for (let index = 1; index < tab1+1; index++) {
                date1x =from_date.clone().weekday(index-1);
              
                date1 =moment(date1x);
                date1a =date1.format("L");
               
                datea = moment().format("L");//serve solo per sapere che giorno è oggi
               // console.log(datea,date1a);
                if(datea===date1a){
                    setBg="background-color:#fffdf4";
                }else{
                    setBg="";
                }
             
                day = date1x.format('dddd LL');
                
                columns[index] = {
                    "field":index,
                    "title":day,
                    footerFormatter:colFormatter,
                    valign: 'middle; '+setBg,
                    cellStyle: cellStyle2
                }
               
            }
       
          
        setTable($mese,$anno);
        }
        function cellStyle1(value, row, index, field) {
         
            return {
            
              classes: '" bgcolor="eeeeee" id="R'+(Number(index)+1)+'C0'+field+'"  '
            };
            return {};
        } 
        function cellStyle2(value, row, index, field) {
          
            const from_date = date.clone().startOf('week');
            let datez=from_date.clone().weekday(field-1);
                      
            let date1x=$anno+"-"+$mese+"-"+(field);
            let date1 = new Date(date1x);
          
            
            
            dayL = datez.format('dddd');
            monthL=datez.format('MMMM');
            month=datez.format('MM');
            //dayL = date1.toLocaleString('it-IT', {weekday: 'long'});
           // monthL=date1.toLocaleString('it-IT', {month: 'long'});
            return {
               classes: 'cell R'+(Number(index)+1)+'C'+(field)+'"  day="'+(datez.format("D"))+'" date="'+(datez.format("L"))+'" autoIndex="'+(index)+'" id="R'+(Number(index)+1)+'C'+(field)+'" month="'+(datez.format("MM"))+'" monthL="'+(datez.format("MMMM"))+'" dayL="'+(datez.format('dddd'))+ '"  utente="'+row[0]+ '" idx_utente="'+index + '" id_utente="'+my.manutentori[index].id //
                
            };

            return {};
        }  
        function idFormatter() {
            return 'Riepilogo giornaliero / mensile'
        }
        function nameFormatter(data) {
        return data.length
        }
        function priceFormatter(data) {
        var field = this.field;
            
        return  data.map(function (row) {
            return +row[field]
        }).reduce(function (sum, i) {
            return sum + i
        }, 0)
        }  
        function colFormatter(data) {
            var field = this.field
            
            return  "D="+data.map(function (row) {
                if(row[field]==="D"){
                    return +1 
                }else{
                    return +0   
                }
              //  return +row[field]
            }).reduce(function (sum, i) {
                
                return sum + i
            }, 0);
            
            }   
        function setTable($mese1,$anno1){
                    
            var cells, rows;
            var i, j,row;
           
            var data = [],        
            $el= this.$('#table');
            //cells=5;//giorni del mese prescelto
            cells=6;//giorni del mese prescelto
            
         
            rows=my.manutentori.length;
          
          
            for (i = 0; i < rows; i++) {//per tutti i manutentori
              
                row = {};
                //----------------popolo la prima colonna con il nome manutentori --------------                
           
                row[0] =my.manutentori[i].utente;//

                //---------------popolo le altre celle con i servizi--------------------------------------------------------------
                             
                for (j = 0; j < cells; j++) {//per ogni giorno
                
                    row[j+1]="";
                    for (y = 0; y < $planD.length; y++) { //per ogni intervento previsto
                        var dayOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('DD')); 
                        var monthOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('MM'));
                        var yearOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('YYYY'));   
                        var weekOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('W'));   
                  //      console.log('R'+(i+1)+'C'+(j+1),row[j+1],$planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0,my.manutentori[i].utente,row[0],dayOf,j+1,monthOf,$mese1,yearOf,$anno1);   // if (($planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0) && dayOf===(j+1) && monthOf===(Number($("#mese").val())+1) && yearOf===(Number($("#year").val()))){
                    
                              row[j+1]="";
                       
                    }
                    for (y = 0; y < $planF.length; y++) { //per ogni intervento fatto
                        var dayOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('DD')); 
                        var monthOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('MM'));
                        var yearOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('YYYY'));   
                        var weekOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('W'));   
                  //      console.log('R'+(i+1)+'C'+(j+1),row[j+1],$planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0,my.manutentori[i].utente,row[0],dayOf,j+1,monthOf,$mese1,yearOf,$anno1);   // if (($planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0) && dayOf===(j+1) && monthOf===(Number($("#mese").val())+1) && yearOf===(Number($("#year").val()))){
                    
                              row[j+1]="";
                       
                    }
                }  
                
                data.push(row);
            }//for (i = 0; i < rows; i++) {    
          
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: data,
                columns: columns,
                search: true,
                pagination: false,
                showFooter:false
            });
            var classes = "\" bgcolor='#eeeeee'"
            $table.bootstrapTable('refreshOptions', {
                theadClasses: classes
              });
           
          that=this;
            for (i = 0; i < rows; i++) {//per tutti i manutentori
              
                row = {};
                //----------------popolo la prima colonna con il nome manutentori --------------                
                 
                row[0] =my.manutentori[i].utente;//

                //---------------popolo le altre celle con i servizi--------------------------------------------------------------
                             
                for (j = 0; j < cells; j++) {//per ogni giorno
                 
                    row[j+1]="";
                    //-------------fare-----------------------
                    for (y = 0; y < $planD.length; y++) { //per ogni intervento previsto
                        var dayOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('DD')); 
                        var monthOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('MM'));
                        var yearOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('YYYY'));   
                        var weekOf =Number(moment($planD[y].data_prevista ,'YYYY-MM-DD').format('W'));   
                    console.log('R'+(i+1)+'C'+(j+1),row[j+1],"intervento"+(y+1),"intervento_id="+$planD[y].id,$planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0,my.manutentori[i].utente,row[0],dayOf,Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')),monthOf,Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month')),yearOf,$anno1,weekOf);   // if (($planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0) && dayOf===(j+1) && monthOf===(Number($("#mese").val())+1) && yearOf===(Number($("#year").val()))){
                      console.log( "(("+ $planD[y].idd_impegnati.indexOf(my.manutentori[i].id) +" >= 0 )  && "+my.manutentori[i].utente+"==="+row[0] +" && "+ dayOf+"==="+Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')) +" && "+ monthOf+"==="+Number(Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month')))+" && "+ yearOf+"==="+Number($anno1)+")",weekOf); 
                    if (($planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0)  && my.manutentori[i].utente===row[0] && dayOf===Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')) && monthOf===Number(Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month'))) && ((weekOf===1 && monthOf===12 ) ||(weekOf===1 && monthOf===1 ) || yearOf===Number($anno1))){
                                 row[j+1]='<label id="4" tipo_pill="manutenzione" class="lbl manutenzione pill">'+$planD[y].servizio+'<br>'+$planD[y].num_prog+'</label>';
                               console.log('.C'+(Number(j)+1)+'R'+(Number(i)+1),my.manutentori[i].id+' in '+$planD[y].idd_impegnati+row[j+1],my.manutentori[i].utente,row[0],dayOf,(j+1), monthOf,$mese1, yearOf,$anno1);
                                 $dat='<label id="4" tipo_pill="monitoraggio" class="lbl mmanutenzione pill">'+$planD[y].servizio+'</label><br>'
                        
                                $('.R'+(Number(i)+1)+'C'+(j+1)).append( row[j+1]);
                         
                            }else{
                         
                                //  row[j+1]="";
                            }
                       
                    }
                     //-------------fatti-----------------------
                     for (y = 0; y < $planF.length; y++) { //per ogni intervento previsto
                        var dayOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('DD')); 
                        var monthOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('MM'));
                        var yearOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('YYYY'));   
                        var weekOfF =Number(moment($planF[y].data_effettuata ,'YYYY-MM-DD').format('W'));   
                    console.log('R'+(i+1)+'C'+(j+1),row[j+1],"intervento"+(y+1),"intervento_id="+$planF[y].id,$planF[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0,my.manutentori[i].utente,row[0],dayOfF,Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')),monthOfF,Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month')),yearOfF,$anno1,weekOfF);   // if (($planD[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0) && dayOf===(j+1) && monthOf===(Number($("#mese").val())+1) && yearOf===(Number($("#year").val()))){
                            //if (($planF[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0)  && my.manutentori[i].utente===row[0] && dayOfF===Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')) && monthOfF===Number(Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month'))) && yearOfF===Number($anno1)){
                            if (($planF[y].idd_impegnati.indexOf(my.manutentori[i].id) >= 0)  && my.manutentori[i].utente===row[0] && dayOfF===Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('day')) && monthOfF===Number(Number(document.getElementById('R'+(i+1)+'C'+(j+1)).getAttribute('month'))) && ((weekOfF===1 && monthOfF===12 ) ||(weekOfF===1 && monthOfF===1 ) || yearOfF===Number($anno1)) ){
                          
                                row[j+1]='<label id="4" tipo_pill="manutenzione" class="lbl manutenzioneFatti pill">'+$planF[y].servizio+'<br>'+$planF[y].num_prog+'</label>';
                               console.log('.C'+(Number(j)+1)+'R'+(Number(i)+1),my.manutentori[i].id+' in '+$planF[y].idd_impegnati+row[j+1],my.manutentori[i].utente,row[0],dayOfF,(j+1), monthOfF,$mese1, yearOfF,$anno1);
                                 $dat='<label id="4" tipo_pill="monitoraggio" class="lbl mmanutenzione pill">'+$planF[y].servizio+'</label><br>'
                        
                                $('.R'+(Number(i)+1)+'C'+(j+1)).append( row[j+1]);
                         
                            }else{
                         
                                //  row[j+1]="";
                            }
                       
                    }
                }  
                
              
            }//for (i = 0; i < rows; i++) {   
              
        }
        
        this.$("#countSer").prepend(' '+my.previste.length);
        function actionFormatter(value) {
            return [$format].join('');
        }
        
        function popcell() {    //popolo le celle valorizzate
    
        
        } //popcell()
        
       
      
            
    },
    htmlPdf:function(){
        window.html2canvas = html2canvas;
        var doc = new jsPDF("l", "mm", "a4");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        var w = document.body.offsetWidth;
        var h =document.body.offsetHeight;
        var ratio = h / w;
        html2canvas(document.body).then(function(canvas) {
          //var dpi= 300; // Set to 300 DPI
          //var scale= 3; // Adjusts your resolution
          
            var img = canvas.toDataURL("image/jpeg", 1);
            var widthd = doc.internal.pageSize.getWidth();    
             var heightd = doc.internal.pageSize.getHeight();
            height = ratio * widthd;
            doc.addImage(img, 'JPEG', 5, 5, widthd-10, height-10);
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
            doc.save('Planning Manutentori - Interventi da fare '+datestring+'.pdf');
        
        });
  /*         html2canvas(document.body).then(function(canvas) {
            
                // canvas is the final rendered <canvas> element
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                
                var w = window.open("");
                w.document.write(image.outerHTML);
               // window.open(myImage,'_blank');
               var doc = new jsPDF('l', 'mm');
               doc.addImage(image, 'PNG', 10, 10);
               doc.save('presenza ospiti.pdf');
                
           
        });
      const doc = new jsPDF('p', 'pt', 'landscape');
         html2canvas($('#contrattiForm')[0]).then(function(canvas) {
           // document.body.appendChild(canvas);
           source=canvas;
           margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        doc.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width // max width of content on PDF
              
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                doc.save('Test.pdf');
            }, margins
        );
        });
   
        const doc = new jsPDF('p', 'pt', 'letter');
        source = $('#contrattiForm')[0];
        doc.fromHTML(
            source, // HTML string or DOM elem ref.
           

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                doc.save('Test.pdf');
            }
        );
          
        doc.html(document.body, {
            callback: function (doc) {
              doc.save(a6.pdf);
            }
         });

        // Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();
doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");
       var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#contrattiForm')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins
        );*/
    },
       
    render:function(e){
        $(this.el).html(this.template());
        //------------------------------------------------------------------------
        console.log("glob="+_.keys(app.global));
        console.log("sub1="+app.global.sub1);//chiamate dai menu
        console.log("sub="+app.global.sub);//chiamate dai menu
        var $subTypeX='';//variabile d'appoggio per rfa/rma/adm se voglio fare una call unica adm
        var $actionX='';
        const $routeDefine = app.global.sub.split("_");
        
        var that = this;
        var $headers = {
            
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        switch ($routeDefine[0]) { 
            case "asa":{//chiamo il modulo asa
                      console.log(app.global.breadcrumb) ; 
                    app.routers.router.prototype.asa();
               
                 break;
            }  
            default:
        }   
        switch (app.global.sub) {
            case "gap_adm":{
                 while (app.global.breadcrumb.length>1) {
                     app.global.breadcrumb.pop();
                  } 
                app.global.nick_array.arr="gap_adm";
                console.log("app.global.nick_array.arr="+app.global.nick_array.arr); 
                break;
            }  
            case "rfa_adm_tutorial":{
              /*  app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Servizi</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }
                $subTypeX='rfa';
                app.global.nick_array.arr="adm_tutorial";
                app.global.nick_array.tit="adm_tutorial";
                app.global.nick_array.grp="adm_tutorial".toLowerCase()+".type";
                console.log("app.global.nick_array.arr="+app.global.nick_array.arr); 
                break;
            }  
            case "tipologie_fornitori_ag":{
             
                while (app.global.breadcrumb.length>1) {
                    app.global.breadcrumb.pop();
                 }
                $subTypeX='rfa';
                app.global.nick_array.arr="rfa_tipologie_fornitori_ag";
                app.global.nick_array.tit="rfa_tipologie_fornitori_ag";
                app.global.nick_array.grp="rfa_tipologie_fornitori_ag".toLowerCase()+".type";
                console.log("app.global.nick_array.arr="+app.global.nick_array.arr); 
                break;
            } 
            case "rma_adm_tutorial":{
              /*  app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Servizi</a></li>'
                });*/
                while (app.global.breadcrumb.length>1) {
                    app.global.breadcrumb.pop();
                 }
                $subTypeX='rma';
                app.global.nick_array.arr="adm_tutorial";
                app.global.nick_array.tit="adm_tutorial";
                app.global.nick_array.grp="adm_tutorial".toLowerCase()+".type";
                console.log("app.global.nick_array.arr="+app.global.nick_array.arr); 
                break;
            }  
            case "servizi":{
              /*  app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Servizi</a></li>'
                });*/
                while (app.global.breadcrumb.length>1) {
                    app.global.breadcrumb.pop();
                 }
                console.log("nick_array.arr=RFA_Servizi");
                app.global.nick_array.arr="RFA_Servizi";
                app.global.nick_array.tit="RFA_Servizi";
                app.global.nick_array.grp="RFA_Servizi".toLowerCase()+".type";
                console.log("servizi"); 
                break;
            }    
            case "banche":{
              /*  app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Banche</a></li>'
                });*/
                while (app.global.breadcrumb.length>1) {
                    app.global.breadcrumb.pop();
                 }
                
                console.log("nick_array.arr=RFA_Banche");
                app.global.nick_array.arr="RFA_Banche";
                app.global.nick_array.tit="RFA_Banche";
                app.global.nick_array.grp="RFA_Banche".toLowerCase()+".type";
                console.log("banche"); 
                break;
            }    
            case "fornitori":{
               /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Fornitori</a></li>'
                });*/
                 while (app.global.breadcrumb.length>1) {
                     app.global.breadcrumb.pop();
                  }
               /*
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }
                 */       
                console.log("nick_array.arr=RFA_Fornitori");
                app.global.nick_array.arr="RFA_Fornitori";
                app.global.nick_array.tit="RFA_Fornitori";
                app.global.nick_array.grp="RFA_Fornitori".toLowerCase()+".type";
                console.log("forn"); 
                break;
            }    
            case "fornitori_categorie":{
               /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Fornitori_Categorie</a></li>'
                });*/
                            if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }
                console.log("nick_array.arr=RFA_Fornitori_Categorie");
                app.global.nick_array.arr="RFA_Fornitori_Categorie";
                app.global.nick_array.tit="RFA_Fornitori_Categorie";
                app.global.nick_array.grp="RFA_Fornitori_Categorie".toLowerCase()+".type";
                console.log("forn_cat"); 
                break; 
            }
            case "tipologie_prodotti":{
                /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Tipologie_Fornitura</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }
                console.log("nick_array.arr=RFA_Tipologie_Fornitura");
                app.global.nick_array.arr="RFA_Tipologie_Fornitura";
                app.global.nick_array.tit="RFA_Tipologie_Fornitura";
                app.global.nick_array.grp="RFA_Tipologie_Fornitura".toLowerCase()+".type";
                console.log("tip_prod") 
                break;
            }    
            case "prodotti":{
                /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Prodotti</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                    
                console.log("nick_array.arr=RFA_Prodotti");
                app.global.nick_array.arr="RFA_Prodotti";
                app.global.nick_array.tit="RFA_Prodotti";
                app.global.nick_array.grp="RFA_Prodotti".toLowerCase()+".type";
                console.log("RFA_Prodotti") 
                break;
            }    
            case "servizi_prodotti":{
                 /*app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RFA_Servizi_Prodotti</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                        
                console.log("nick_array.arr=RFA_Servizi_Prodotti");
                app.global.nick_array.arr="RFA_Servizi_Prodotti";
                app.global.nick_array.tit="RFA_Servizi_Prodotti";
                app.global.nick_array.grp="RFA_Servizi_Prodotti".toLowerCase()+".type";
                console.log("RFA_Servizi_Prodotti") 
                break;
            }    
            case "catDispositivi":{
                /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RMA_catDispositivi</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                            
                console.log("nick_array.arr=RMA_catDispositivi");
                app.global.nick_array.arr="RMA_catDispositivi";
                app.global.nick_array.tit="RMA_catDispositivi";
                app.global.nick_array.grp="RMA_catDispositivi".toLowerCase()+".type";
                console.log("RMA_catDispositivi") 
                break;
            }    
            case "reportInterventi":{
                /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RMA_reportInterventi</a></li>'
                });*/
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                                
                console.log("nick_array.arr=RMA_reportInterventi");
                app.global.nick_array.arr="RMA_reportInterventi";
                app.global.nick_array.tit="RMA_reportInterventi";
                app.global.nick_array.grp="RMA_reportInterventi".toLowerCase()+".type";
                console.log("RMA_reportInterventi") 
                break;
            }    
            case "pmaTipologie":{
                /* app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >RMA_pmaTipologia</a></li>'
                });*/
                console.log("nick_array.arr=RMA_pmaTipologie");
                app.global.nick_array.arr="RMA_pmaTipologie";
                app.global.nick_array.tit="RMA_pmaTipologie";
                app.global.nick_array.grp="RMA_pmaTipologie".toLowerCase()+".type";
                console.log("RMA_pmaTipologie") 
                break;
            }    
            case "rma_pma":{
                 if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }
                console.log("nick_array.arr=RMA_pma");
                app.global.nick_array.arr="RMA_pma";
                app.global.nick_array.tit="RMA_pma";
                app.global.nick_array.grp="RMA_pma".toLowerCase()+".type";
                console.log("RMA_pma") 
                 console.log(app.global.nick_array.servizio) ;
                break;
            }
            case "rma_pmm":{
                if(app.global.breadcrumb.length>1){
                   app.global.breadcrumb.pop();
               }
               console.log("nick_array.arr=RMA_pmm");
               app.global.nick_array.arr="RMA_pmm";
               app.global.nick_array.tit="RMA_pmm";
               app.global.nick_array.grp="RMA_pmm".toLowerCase()+".type";
               console.log("RMA_pmm") 
                console.log(app.global.nick_array.servizio) ;
               break;
           }
            case "rma_report":{
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                                
                console.log("nick_array.arr=RMA_report");
                app.global.nick_array.arr="RMA_report";
                app.global.nick_array.tit="RMA_report";
                app.global.nick_array.grp="RMA_report".toLowerCase()+".type";
                console.log("RMA_report") 
                break;
            }
            case "reportRFA":{
                if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                                
                console.log("nick_array.arr=RFA_report");
                app.global.nick_array.arr="RFA_report";
                app.global.nick_array.tit="RFA_report";
                app.global.nick_array.grp="RFA_report".toLowerCase()+".type";
                console.log("RFA_report") 
                break;
            }
          
          
            default:{/*//di dafault non metto nulla perchè app.global.nick_array.arr può essere assegnato anche dalla tabella dei tipi da ammministrazione
                    if(app.global.breadcrumb.length>1){
                    app.global.breadcrumb.pop();
                }                                
                
                app.global.nick_array.arr=app.global.sub;
                app.global.nick_array.tit=app.global.sub;
                app.global.nick_array.grp=app.global.sub.toLowerCase()+".type";
                console.log(app.global.sub) ;
             */ 
            }
            
                
        }
        console.log(app.global.breadcrumb,app.global.breadcrumb.length) ; 
        while(app.global.breadcrumb.length>2){
           app.global.breadcrumb.pop();
        }    
        for(i=0; i<app.global.breadcrumb.length; i++){
            this.$( ".breadcrumb" ).empty().append( app.global.breadcrumb[i]['breadcrumb']);
        }
        console.log(app.global.breadcrumb);
        //-----------------------------------------------------------------------
        var API_URL = app.global.json_url + 'types/';
        
        var isNew=false;    
        var $folder;
        var $iTel=0,$iEmail=0;//indice per contare quante mail o telefoni $iEmail
        var $row={};
        var $myData={};
        var $table =this.$('#table1'); //
        var $modal =this.$('#modal').modal({show: false});
        
        $alert = this.$('.alert').hide();
        console.log(app.global.nick_array.arr);
      
        
      
       
       
        
        setTab();
        //---------------------------------------- callList();-----------------------------------------------------------------------------------
        //carica i tutti i dati e popola la tabella per poter scegliere se fare new/update/delete
       
        function  setTab(){
            var $appendTool='';
            console.log(app.global.nick_array);
            switch (app.global.nick_array.arr) {
                case "Protocolli e relativi allegati/moduli":{
                    asa(that);
                    break; } 
                case "rma_pmm":{
                    rmaPmm(that);
                    break; } 
                case "gap_adm":{
                    callUrl();
                    break; } 
                case "DEPARTMENTS":{
                    console.log(app.global.nick_array.arr);
                    console.log(app.global.breadcrumb);
                    while (app.global.breadcrumb.length>2) {
                        app.global.breadcrumb.pop();
                     }
                   //  app.global.breadcrumb.push({
                   //     breadcrumb: '<li class="breadcrumb-item active" href="" ><a href="#it/data_type_edit" >Servizi</a></li>'
                   // });

                   that.$( ".breadcrumb" ).empty();
                    for(i=0; i<app.global.breadcrumb.length; i++){
                        console.log(i,app.global.breadcrumb[i]);  
                    that.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
                    }
                    that.$("#tipoServizio").append(

                        '<div class="row">'+
                            '<div class="col-md-6 ">'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="1" name="tipoReparto" id="tipoReparto" >Infanzia</label>'+
                                '</div>'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="2" name="tipoReparto" id="tipoReparto">Sociale</label>'+
                                '</div>'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="3" name="tipoReparto" id="tipoReparto">Tecnostruttura</label>'+
                                '</div>'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="4" name="tipoReparto" id="tipoReparto" checked>Tutti</label>'+
                                '</div>'+
                            '</div>'+     
                            '<label id="titleTipo"></label>'+       
                        '</div>'
                    ); //il tab arriva dal server!
                /*    that.$('table tr:first th:eq( 2 )').text('Comune');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","comune"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Tipo Servizio');
                    var tr = $('<th data-field="area">Area </th>');
                    that.$("#table1 thead tr th:eq( 4 )").before(tr);
                    //var tr1 = $('<th data-field="device2">Dispositivo 2</th>');
                    //that.$("#table1 thead tr th:eq( 4 )").before(tr1);*/
                    callUrl();
                    break;}
                case "Ditte":{
                    console.log(app.global.nick_array.arr);
                    that.$('table tr:first th:eq( 2 )').text('P. Iva');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","piva"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Comune');
                    that.$('table tr:first th:eq( 3 )').attr("data-field","comune"); //setter
                    callUrl();
                    break;}
                case "RFA_Fornitori":{
                    console.log(app.global.nick_array.arr);
                    that.$('table tr:first th:eq( 2 )').text('P. Iva');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","piva"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Comune');
                    that.$('table tr:first th:eq( 3 )').attr("data-field","comune"); //setter
                   // var tr = $('<th data-field="direct">Acquisto diretto </th>');
                   // that.$("#table1 thead tr th:eq( 4 )").before(tr);
                   callUrl();
                   
                    break;  }  
                case "RFA_Fornitori_Categorie":{
                    that.$('table tr:first th:eq( 2 )').text('Categoria');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","name"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Descrizione');
                    callUrl();
                    break;}
                case "RFA_Tipologie_Prodotto_Servizio":{
                    that.$('table tr:first th:eq( 2 )').text('Comune');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","comune"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Tipo Servizio');
                    var tr = $('<th data-field="area">Area </th>');
                    that.$("#table1 thead tr th:eq( 4 )").before(tr);
                    callUrl();
                    break;}
                case "RFA_Tipologie_Fornitura":{
                     that.$('table tr:first th:eq( 3 )').text('Tipologia  Prodotto');
                     that.$('table tr:first th:eq( 3 )').attr("data-field","tipologia_prodotto"); //setter
                    callUrl();
                    break;}
                case "rfa_tipologie_fornitori_ag":{
                     that.$('table tr:first th:eq( 1 )').text('Tipologia  Fornitore');
                     that.$('table tr:first th:eq( 1 )').attr("data-field","name"); //setter
                      that.$('table tr:first th:eq( 3 )').remove(); 
                    callUrl();
                    break;}
                case "RFA_Prodotti":{
                    that.$('table tr:first th:eq( 2 )').text('Prodotto');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","comune"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Tipo Servizio');
                    var tr = $('<th data-field="area">Area </th>');
                    that.$("#table1 thead tr th:eq( 4 )").before(tr);
                    callUrl();
                    break;}
                case "RFA_Servizi":{
                     that.$(".toolbar").empty();
                  
                    //appendo al tool solo se ho la risposta success in 541 per non avere visualizzazioni fastidiose
                            
                     $appendTool='<div class="form-group   ">'+
                   
                    '<div class="form-group " >'+
                        '<button type="button" id="listID" name="listID" data-toggle="modal"  readonly data-target="#modal" data-title="Lista ID dei servizi abilitati" class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Genera lista ID servizi abilitati</button>'+
                    '</div>'+
                '</div>'
                ;
                   //tab generato dal server
                    callUrl(subType="RFA_Servizi");
                    break; }  
                case "adm_tutorial":{
                    // that.$(".toolbar").empty();
                    
                    //API_URL=app.global.json_url + 'tutorial/';
                   //tab generato dal server
                    callUrl($subTypeX);
                    
                    break; }
                case "ADM_Attrezzature_Categorie":{
                        API_URL = app.global.json_url + 'servizi/';
                        $actionX='get';
                        $tab=app.global.nick_array.arr;
                        callUrl(null,$actionX,$tab);
                        
                        break; }        
                case "RFA_Servizi_Prodotti":{
                    that.$('table tr:first th:eq( 2 )').text('Servizi Prodotti');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","comune");
                    that.$('table tr:first th:eq( 2 )').text('Servizi Prodotti');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","comune"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Tipo Servizio');
                    var tr = $('<th data-field="area">Area </th>');
                    that.$("#table1 thead tr th:eq( 4 )").before(tr);
                    callUrl();
                    break;}
                case "RFA_Banche":{//determino qui i campi della tabella
                    that.$('table tr:first th:eq( 1 )').text('Banca');
                    that.$('table tr:first th:eq( 1 )').attr("data-field","name"); //setter
                    that.$('table tr:first th:eq( 2 )').text('Agenzia');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","agenzia"); //setter
                    that.$('table tr:first th:eq( 3 )').text('P.Iva');
                    var tr = $('<th data-field="area">Area </th>');
                    that.$("#table1 thead tr th:eq( 4 )").before(tr);
                    callUrl();
                    break;}
                case "RMA_Categorie":{
                    callUrl();
                    break;}
                case "RMA_catDispositivi":{
                    that.$('table tr:first th:eq( 1 )').text('Dispositivo');
                    that.$('table tr:first th:eq( 1 )').attr("data-field","dispositivo"); //setter
                    that.$('table tr:first th:eq( 2 )').text('Tipologia');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","tipologia"); //setter
                    that.$('table tr:first th:eq( 3 )').remove(); //rimuove descrizione,che è la terza colonna
                    that.$('table tr:first th:eq( 3 )').remove(); //rimuove valid,che è diventata la  terza colonna
                    callUrl();
                    break;}
                case "RFA_report":{
                        rfa_report(that);
                    break;}  
                
                case "RMA_reportInterventi":{
                        rma_report(that);
                   // reportServ(that);
                    break;}
                case "RMA_report":{
                        rma_report(that);
                   // reportServ(that);
                    break;}
                case "RMA_pmaTipologie":{
                    API_URL = app.global.json_url + 'rma_pma/';
                    that.$('table tr:first th:eq( 1 )').text('Tipologia Manutenzione');
                    that.$('table tr:first th:eq( 1 )').attr("data-field","name"); //setter
                    that.$('table tr:first th:eq( 2 )').text('Descrizione');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","description"); //setter
                    that.$('table tr:first th:eq( 3 )').remove(); //rimuove descrizione,che è la terza colonna
                    
                    callUrl();
                    break;  }  
                case "RMA_pma":{
                    rmaPma(that);
                    
                    break; }   
                case "RMA_pmm":{
                    rmaPmm(that);
                    
                    break; }  
                case "Tipo_Servizio":{
                    console.log(app.global.nick_array.arr);
                    that.$('table tr:first th:eq( 3 )').text('CDC');
                    that.$('table tr:first th:eq( 3 )').attr("data-field","centro_di_costo_cod"); //setter
                    that.$('table tr:first th:eq( 4 )').text('Area');
                    that.$('table tr:first th:eq( 4 )').attr("data-field","area_servizio"); //setter
                    callUrl()
                    break;}
                case "Committenti":{
                    that.$("#tipoServizio").append(
                        '<div class="row">'+
                            '<div class="col-md-6 ">'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="5" name="tipoNominativo" id="tipoNominativo" >Privato</label>'+
                                '</div>'+
                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="6" name="tipoNominativo" id="tipoNominativo">Pubblico</label>'+
                                '</div>'+

                                '<div class="radio-inline">'+
                                    '<label><input type="radio" value="7" name="tipoNominativo" id="tipoNominativo" checked>Tutti</label>'+
                                '</div>'+
                            '</div>'+     
                            '<label id="titleTipo"></label>'+       
                        '</div>'
                    ); 
                    that.$('table tr:first th:eq( 1 )').text('Nominativo');
                    that.$('table tr:first th:eq( 1 )').attr("data-field","nome"); //setter
                    that.$('table tr:first th:eq( 2 )').text('Cod.Fis/P.IVA');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","cfPiva"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Comune');
                    that.$('table tr:first th:eq( 3 )').attr("data-field","comune"); //setter
                    that.$('table tr:first th:eq( 4 )').text('Valido');
                    that.$('table tr:first th:eq( 4 )').attr("data-field","valid"); //setter
                    that.$( ".breadcrumb" ).empty();
                    for(i=0; i<app.global.breadcrumb.length; i++){
                        console.log(i,app.global.breadcrumb[i]);  
                    that.$( ".breadcrumb" ).append( app.global.breadcrumb[i]['breadcrumb'] );
                    }
                    callUrl();
                    break;}
                case "Moduli-Navbar":{
                    console.log(app.global.nick_array.arr);
                  
                   
                    callUrl();
                    break; } 
                case "UTENZE_Fornitori":{
                    console.log(app.global.nick_array.arr);
                    that.$('table tr:first th:eq( 2 )').text('P. Iva');
                    that.$('table tr:first th:eq( 2 )').attr("data-field","piva"); //setter
                    that.$('table tr:first th:eq( 3 )').text('Tipo Fornitura');
                    that.$('table tr:first th:eq( 3 )').attr("data-field","tipo"); //setter
                    callUrl();
                    break;}
                case "SRA":{
                   sra(that);
                 //   callUrl();
                    break; }       
                case "E-mail_EXTRA":{
                   mail_extra(that);
                 
                    break; }   
                default:
                     callUrl();
                      break;
            }          
            
            
            function callUrl($subType,$action,$tab){
               
                
                var jsonObj = {};
                if($subType!==null && $subType !== undefined){
                   jsonObj.subType = $subType;  
                }
                if($tab!==null && $tab !== undefined){
                    jsonObj.tab = $tab;  
                 }
                console.log('action'+$action,$subType);
                if($action!==null && $action !== undefined){
                    jsonObj.action = $action;  
                 }else{
                    jsonObj.action = "list";
                 }
                // jsonObj.action = "list";
                jsonObj.type = app.global.nick_array.arr;
                //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                jsonObj.id_ser = app.global.tokensCollection.first().get("id_servizio");

                jsonObj = JSON.stringify(jsonObj);


                console.log("API_URL="+API_URL);
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata.message));
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
                            $myData=$mydata.data;
                            that.$(".toolbar").append($appendTool);
                           if($mydata.tab){
                                $tab=$mydata.tab;
                                console.log('tab='+$tab); 
                                 $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                                hrTable($myData,$tab);
                           }else{
                                var xx=null//tab
                    
                                hrTable($myData,xx);
                           }
                           
                           
                        }else 
                        {
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

                        console.error("hr list load table error!!!");
                    }
                });
            }//end callUrl
        }//end setTab()----------------------------------------------------------------------
        //---------------------------------MAIL EXTRA--start-------------
        function mail_extra(that){
            window.actionEventsS = {
                'click .remove_servizio': function (e,value, row,field) {
                    
                    id_notifica=e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.attributes.id_notifica.value;
                    console.log(id_notifica,'remove_servizio',row,field);
                    if (confirm('Vuoi rimuovere questo Servizio: '+row.nome+' ?')) {
                    $.each($mydata.data.notifiche, function( key, notifica ){
                        if(notifica.id==id_notifica){
                            notifica.servizi = notifica.servizi.filter(val => val.id !== row.id)   
                        }
                    });
                    console.log($mydata);
                    update_xmail($mydata.data);
                }
                },
                'click .remove_mail': function (e,value, row,field) {
                    id_notifica=e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.attributes.id_notifica.value;
                    console.log(id_notifica,'remove_mail',row,field);
                   if (confirm('Vuoi rimuovere questa E-mail: '+row.mail+' ?')) {
                    $.each($mydata.data.notifiche, function( key, notifica ){
                        if(notifica.id==id_notifica){
                            notifica.mails = notifica.mails.filter(val => val.mail !== row.mail)   
                        }
                    });
                    console.log($mydata);
                    update_xmail($mydata.data);
                }
                },
                'click .update_mail': function (e,value, row,field) {
                    id_notifica=e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.attributes.id_notifica.value;
                    console.log(id_notifica,'update_mail',row,field);
                    add_mail_notifica(id_notifica,$mydata.data,"update",row,field);
                    /*
                    $.each($mydata.data.notifiche, function( key, notifica ){
                        if(notifica.id==id_notifica){
                            notifica.mails[field] = row.mail;   
                        }
                    });
                    console.log($mydata);
                    update_xmail($mydata.data);*/
                }
        }  
            API_URL = app.global.json_url + 'upload/notifiche/';
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        console.log( ($mydata));
                        if ($mydata.success){
                        that.$('#pdefault .panel-body').empty();
                        that.$('#pdefault .panel-body').append($mydata.form);
                        that.$('#pdefault .panel-heading').text($mydata.head);
                        if($mydata.data.notifiche){
                             $mydata.data.notifiche.forEach(function(notifica) {
                            console.log(notifica.id)
                            $tabS=$mydata.tab[0];//tabella servizi
                            $tabM=$mydata.tab[1];//tabella mail
                            $.each($tabS, function( key, value1 ){
                                if(value1["cellStyle"]=="cellStyle"){
                                    value1["cellStyle"]=cellStyle;
                                }
                                if(value1["events"]=="actionEventsS"){
                                    value1["events"]=actionEventsS;
                                }
                                if(value1["formatter"]=="actionFormatterS"){
                                    value1["formatter"]=actionFormatterS;
                                }

                            });  
                            $.each($tabM, function( key, value1 ){
                                if(value1["cellStyle"]=="cellStyle"){
                                    value1["cellStyle"]=cellStyle(notifica.id);
                                }
                                if(value1["events"]=="actionEventsS"){
                                    value1["events"]=actionEventsS;
                                }
                                if(value1["formatter"]=="actionFormatterS"){
                                    value1["formatter"]=actionFormatterM(notifica.id);
                                }

                            });  
                            that.$('#tservizi_'+notifica.id).bootstrapTable('destroy');
                            that.$('#tservizi_'+notifica.id).bootstrapTable({
                                data: notifica.servizi,
                                columns: $tabS
                            });
                            that.$('#tmail_'+notifica.id).bootstrapTable('destroy');
                            that.$('#tmail_'+notifica.id).bootstrapTable({
                                data: notifica.mails,
                                columns: $tabM
                            });
                            that.$("#btnAddServizio_"+notifica.id).click(function () {
                                console.log("btnAddServizio_"+notifica.id);
                                add_servizio_notifica(notifica.id,$mydata.data);
                            });
                            that.$("#btnAddMail_"+notifica.id).click(function () {
                                console.log("btnAddMail_"+notifica.id);
                                add_mail_notifica(notifica.id,$mydata.data,"add");
                            });
                           
                            that.$("#btnDelNotifica_"+notifica.id).click(function () {
                                console.log("btnDelNotifica_"+notifica.id);
                                if (confirm('Vuoi rimuovere questa notifica con ID: '+notifica.id+' ?')) {
                                    
                                       
                                            $mydata.data.notifiche = $mydata.data.notifiche.filter(val => val.id !== notifica.id)   
                                       
                                    
                                    console.log($mydata);
                                    update_xmail($mydata.data);
                                }
                            });
                        
                         
                        });//foreach notifiche

                        }
                       
                        
                         that.$("#btnAddNotifica").click(function () {
                                console.log("btnAddNotifica");
                                 add_notifica($mydata.data);
                            }); 
                         
                         
                        function actionFormatterS() {
                            return [$mydata.format[0]].join('');
                        }
                        function actionFormatterM() {
                            return [$mydata.format[1]].join('');
                        }
                          function cellStyle(value, row, index, field) {
               console.log(value, row, index, field);
               
                
                return {
                   classes: 'cell"  autoIndex="'+(index)+'"    ' //
                    
                };
    
               
            }  
                      
                           
        }else{ 
                        
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

                        console.error("notifiche sra error!!!");
                    }
                });
           
         
        }
        function update_xmail  ($data) {
            that=this;
           console.log ($data);
              API_URL = app.global.json_url + 'upload/notifiche/';
            var jsonObj = {};
            jsonObj.action = "update";
            jsonObj.type = 'notifiche';
            jsonObj.notifiche = $data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                dataType : 'text',
                    success: function (datap) {
                        console.log(datap);
                        mail_extra(that);
                        return;  
                    },
                    error: function () {
                        console.error("update notifiche error!!!");
                    }
                });
            
            }
        function  add_servizio_notifica($notifica,$data) {//a sotto categoria
            that=this;
            
            console.log("add_servizio_notifica",that);
            that.$('.modal-title').text("Add Servizio");  
            modalF=
                '<form id="mod" >'+
                    '<label>Servizio</label>'+
                    '<select  class="form-control" name="servizio" id="servizio"  required>'+
                '</form >';
            $modalbtn=   '<button type="button" id="btn" name="btn" class="btn btn-primary ">Add</button>'; 
            that.$(".modal-body").empty(); 
            that.$(".modal-footer").empty().append( $modalbtn);  
            that.$(".modal-body").append( modalF);
            that.$("#mod").validate();  
             API_URL = app.global.json_url + 'upload/notifiche/';
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "anagrafica_servizi";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                    success: function (datap) {
                        $mydata1 =JSON.parse(datap);
                        console.log( ($mydata1));
                        if ($mydata1.success){ 
                            $("#servizio").empty();   
                            $.each($mydata1.data, function(i, value) {
                                $("#servizio").append('<option value="'+value["id"]+'">'+value["servizioComPr"]+'</option>');
                            });
                        }
                    }
            });
                          
            $("input[name=\"servizio\"]").rules( "add", {

                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {

                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
            });
            that.$("#modal").modal('show');

            
            that.$('#btn').click(function(e) {//add dalle modali 
             if(that.$("#mod").valid()){
                $nome=$('#servizio').val();
                console.log("click",$nome,$data);
                $duplicato=false;
                    $.each($data.notifiche, function( key1,value1) {
                console.log(value1.id,$notifica);
                if(value1.id==$notifica){  
                    $.each(value1.servizi, function( key,value) {
                        console.log(key,value.id,$nome);
                        if(value.id==$nome){  
                            console.log("duplicato");
                            $duplicato=true;
                             
                            $("#btn").prop('disabled', true);
                            $("#invio").prop('disabled', true);
                            bootbox.dialog({
                                title: "Error",
                                message: "Servizio esistente!",
                                buttons: {
                                    main: {
                                        label: "OK",
                                        className: "btn btn-danger",
                                        callback: function () {
                                            $("body").removeClass("modal-open");
                                            return;
                                        }
                                    }
                                }
                            }); 
                            return;
                        }else{
                            console.log("ok");
                      
               
                        }

                    }); 
                    if(!$duplicato){
                        value1.servizi.push({"id":$nome}); 
                        update_xmail($data);
                    }
                     
                     console.log($data);
                
                }
            });
                that.$("#modal").modal('hide'); 
             
              

             }
             });
          
        }   
        function  add_notifica($data) {//a sotto categoria
            that=this;
            
            console.log("add_notifica",that);
            that.$('.modal-title').text("Add Notifica");  
            modalF=
                '<form id="mod" >'+
                    '<label>Seleziona Modulo</label>'+
                    '<select  class="form-control" name="modulo" id="modulo"  required>'+
                '</form >';
            $modalbtn=   '<button type="button" id="btn" name="btn" class="btn btn-primary ">Add</button>'; 
            that.$(".modal-body").empty(); 
            that.$(".modal-footer").empty().append( $modalbtn);  
            that.$(".modal-body").append( modalF);
            that.$("#mod").validate();  
            
            $("#modulo").empty();   
            $.each($data.moduli, function(i, value) {
                $("#modulo").append('<option value="'+value["id"]+'">'+value["nome"]+'</option>');
            });
                       
                          
            $("input[name=\"modulo\"]").rules( "add", {

                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {

                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
            });
            that.$("#modal").modal('show');

            
            that.$('#btn').click(function(e) {//add dalle modali 
             if(that.$("#mod").valid()){
                $id_mod=$('#modulo').val();
                $nome=$('#modulo').text();
                console.log("click",$nome);
               
                that.$("#modal").modal('hide');
                if($data.notifiche.length>0){
                    $max=$data.notifiche.filter( x => x.id == Math.max(...$data.notifiche.map(x => x.id)) )
                    $id= $max[0].id+1;
                   
                    console.log($max[0].id,$data);
                }else{
                    $id= 1;
                 }
                     $data.notifiche.push({"id":$id,"id_modulo":$id_mod,"servizi":[],"mails":[]}); 
                    update_xmail($data);

             }
             });
          
        }     
        function  add_mail_notifica($notifica,$data,$action,$value,field) {//a sotto categoria
            that=this;
           
            
            $varBtn="Add";
            console.log("add_mail_notifica",that,$action,$value);
           if($action=="update"){
             that.$('.modal-title').text("Update E-mail"); 
             $varMail=$value.mail;
            $varRecipient=$value.recipient; 
             $varLabel=$value.label;
             
             $varBtn="Update";
           }else{
            that.$('.modal-title').text("Add E-mail");
            $varMail="";
            $varLabel="";
            $varRecipient="";
            $varBtn="Add";
           }
             
            modalF=
                '<form id="mod" >'+
                    '<label>Recipient</label>'+
                    '<select class="form-control" name="recipient" id="recipient"   required>'+
                        '<option value="A">A</option>'+
                        '<option value="CC">CC</option>'+
                        '<option value="CCN">CCN</option>'+
                    '</select> '+
                    '<label>E-mail</label>'+
                    '<input type="email" class="form-control" name="mail" id="mail"  value="'+ $varMail+'" required>'+
                     '<label>Label</label>'+
                    '<input type="text" class="form-control" name="label" id="label"  value="'+ $varLabel+'" required>'+
                '</form >';
            $modalbtn=   '<button type="button" id="btn" name="btn" class="btn btn-primary ">'+$varBtn+'</button>'; 
            that.$(".modal-body").empty(); 
            that.$(".modal-footer").empty().append( $modalbtn);  
            that.$(".modal-body").append( modalF);
            that.$("#recipient").val( $varRecipient);
            that.$("#mod").validate();  
             jQuery.validator.addMethod("lettersonly", function(value, element){
                return this.optional(element) || /^[A-Z]+$/i.test(value);
                }, "Solo caratteri alfabetici");
             jQuery.validator.addMethod("laxEmail", function(value, element) {
            // allow any non-whitespace characters as the host part
                return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
             }, "Solo caratteri alfabetici"); 
             
            $("input[name=\"mail\"]").rules( "add", {
                    laxEmail: true,
                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {
                            laxEmail: "essiee",
                            required: "Required input"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
            });
            that.$("#modal").modal('show');
            that.$('#mail').change(function(e) {//add dalle modali mail_notifica_change
                console.log("change");
                mail_notifica_change($(this),$(this).val(),$notifica,$data);
             });
            that.$('#label').change(function(e) {//add dalle modali mail_notifica_change
                console.log("change");
                mail_notifica_change($(this),$(this).val(),$notifica,$data);
             });
             that.$('recipient').change(function(e) {//add dalle modali mail_notifica_change
                console.log("change recipient");
               
             }); 
            
             
            that.$('#btn').click(function(e) {//add dalle modali 
             if(that.$("#mod").valid()){
                $nome=$('#mail').val();
                $label=$('#label').val();
                $recipient=$('#recipient').val();
                console.log("click",$nome,$label,$recipient);
               
                that.$("#modal").modal('hide'); 
                
                $.each($data.notifiche, function( key, notifica1 ){
                    if(notifica1.id==$notifica){
                        if($action=="update"){
                            notifica1.mails[field] = {"mail":$nome,"label":$label,"recipient":$recipient};
                        }else{
                        notifica1.mails.push({"mail":$nome,"label":$label,"recipient":$recipient}); 
                        }
                    }
                });
               
                console.log($data);
                update_xmail($data);

             }
             });
          
        }  
        function  mail_notifica_change($this,$nome,$notifica,$data) {//a sotto categoria
            $duplicato=false;
            $tipo=$this[0].attributes.name.value;
            console.log("change",$this,$nome,$tipo);
           
            const paragraph = $nome;
            
            const regex =/^([a-z0-9_.-]+@[a-z0-9]+\.[a-z0-9]+)$/gi;// /^([a-zA-Z0-9_@. ]+)$/    /^([a-zA-Z0-9_]+)$/    /[A-Z]/g    /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;//  
            const regex1 =/^([a-z0-9_.-\s]+)$/gi;// /^([a-zA-Z0-9_@. ]+)$/    /^([a-zA-Z0-9_]+)$/    /[A-Z]/g    /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;//  
           
            const found = paragraph.match(regex);//mail
            const found1 = paragraph.match(regex1);//label
            console.log(found,found1);
            console.log($nome);
            if($tipo==="mail"){
                $.each($data.notifiche, function( key1,value1) {
                    console.log(value1.id,$notifica);
                    if(value1.id==$notifica){  
                        $.each(value1.mails, function( key,value) {
                            console.log(key,value.mail,$nome);
                            if(value.mail===$nome){  
                                console.log("duplicato");
                                $duplicato=true;
                            }else{
                                console.log("ok");
                        
                            //  $duplicato=false;
                            }
                        }); 
                    }
                });
            }
          
            if($duplicato==false){ 
                if($tipo==="mail"){
                    if(found && $nome!==""){
                        console.log(found,$nome);
                        $("#btn").prop('disabled', false);
                        $("#invio").prop('disabled', false);
                        return ;
                    }else{
                        console.log("not",found);
                        $("#btn").prop('disabled', true);
                        $("#invio").prop('disabled', true);
                        bootbox.dialog({
                            title: "Error",
                            message: "Caratteri non permessi!",
                            buttons: {
                                main: {
                                    label: "OK",
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                        return;
                                    }
                                }
                            }
                        });
                    }
                }else{
                    if(found1 && $nome!==""){
                        console.log(found1,$nome);
                        $("#btn").prop('disabled', false);
                        $("#invio").prop('disabled', false);
                        return ;
                    }else{
                        console.log("not",found);
                        $("#btn").prop('disabled', true);
                        $("#invio").prop('disabled', true);
                        bootbox.dialog({
                            title: "Error",
                            message: "Caratteri non permessi!",
                            buttons: {
                                main: {
                                    label: "OK",
                                    className: "btn btn-danger",
                                    callback: function () {
                                        $("body").removeClass("modal-open");
                                        return;
                                    }
                                }
                            }
                        });
                    }
                }
            }else{
                console.log("duplicato",found);
                $("#btn").prop('disabled', true);
                $("#invio").prop('disabled', true);
                bootbox.dialog({
                    title: "Error",
                    message: "E-mail esistente!",
                    buttons: {
                        main: {
                            label: "OK",
                            className: "btn btn-danger",
                            callback: function () {
                                $("body").removeClass("modal-open");
                                return;
                            }
                        }
                    }
                }); 
            }
        }  
        //-------------------------------MAIL EXTRA----end-------------------------
        function rmaPmm(that){
            API_URL = app.global.json_url + 'rma/pmm/';
            that.$('.panel-heading').empty().append('<h3 style="display:inline-block;"> Planning Manutentori - Interventi da fare </h3>')
            that.$('.panel-body').empty().load('./js/templates/it/app.templates.rma_planning_manutentori.html', function() {
                moment.locale('it');
                let date = moment(new Date(),"L");
                
                populate_form(date);
            });
            function populate_form(date){
                that.$("#right").off("click"); 
                that.$("#left").off("click"); 
                 //-----------first date actual-------------------------------------
            //let date = new Date();
           
            //let mese=date.getUTCMonth();
            let mese=date.format('M');
            //let anno=date.getUTCFullYear();
            let anno=date.format('YYYY');
            let week=moment(date.toDate(), "MM-DD-YYYY").isoWeek();
            localStorage.setItem("selYear",  anno);
            localStorage.setItem("selMonth",  mese); 
            localStorage.setItem("week",  week);
            localStorage.setItem("date",  date);  
            that.setSelect(that,anno,mese,week,date)
            that.selCall(that,anno,mese,week,date);//
            that.$("#right").on("click",function (event) {
                
                date1=moment(date).add(1, 'weeks').endOf('isoWeek');
                populate_form(date1);
               

            });
            that.$("#left").on("click",function () {
              
                date1=moment(date).subtract(1, 'weeks').endOf('isoWeek');
                 populate_form(date1);
             });
             c2=' <button href="pdf.pdf" title="PDF" type="button" class="btn " id="pdf"  style="margin-left:600px;" download> </i><img src="./css/img/pdf.png"  width="30px"/></button>';
   
             that.$("#downFile").empty();  
             that.$("#downFile").append(c2);
             that.$('#pdf').click(function () {
                id=that.id;
                console.log(app.global.nick_array);
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
            
                //that.pdf(this.id,'Presenze Ospiti '+datestring+'.pdf');
                that.htmlPdf();
            });
            } 
                
            
           
            //--------------------------------------------------------------------------------
           
         
        }
        function rmaPma(cct){
            $servizio = app.global.tokensCollection.first().get("id_servizio");
            
            API_URL = app.global.json_url + 'rma_pma/';
            that.$('.panel-body').empty();
            that.$('.panel-body').append(
                '<form class="well" id="rmaPma" method="post" enctype="multipart/form-data">'+    
                    '<div class="row">'+
                        '<div class="col-md-6 ">'+
                            '<div id="servizi"></div>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<label for="datetimepicker1">Anno *</label>'+
                            '<div class="input-group date " id="datetimepicker1">'+

                                '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="col-md-3 "><br>'+
                            '<label  id="pmaCount" ></label>'+
                            '<div id="pmaCount"></div>'+
                        '</div>'+
                        
                        '<!--div class="form-group col-lg-3">'+
                            '<label  id="lblservizi" for="servizi">Invio</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="reqPma"  name="reqPma" value="Invio" title="Invio">Invio</button>'+
                        '</div-->'+
                    '</div>'+
                    '<div class="form-group " id="pma">'+
                        '<div class="row">'+  
                           
                            '<span class="alert"></span>'+
                        //  '<div id="downFile" class="col-md-2 pull-right"></div>'+
                        '</div>'+ 
                        '<div id="planPma"></div>'+
                        
                        '<p class="toolbar"></p>'+ 
                        '<table id="tableR" class="table  table-striped" >'+
                        '</table>'+
                    '</div>'+
                '</form>'  
            );
            that.$('#dataTemp1').val(moment().format('YYYY'));
            that.$('#dataTemp1').change(function (){
                             call_rmaPma('list');
                                
                            });
           
                     
            var $selServizio=that.$("#servizi");
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = app.global.nick_array.arr;
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.person = app.global.tokensCollection.first().get("id_person");

            jsonObj = JSON.stringify(jsonObj);

            $.ajax({
                url:app.global.json_url + 'rma_pma/servizi/',
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                success: function (datap) {
                    $mydata =JSON.parse(datap);
                    if ($mydata.success){
                        $aa=$mydata.data;
                        if($mydata.selServizi!==""){
                            $selServizio.append($mydata.selServizi); 
                            $bb=$mydata.servizi;
                            $("#servizio").append('<option value="">Seleziona</option>');
                            $.each($mydata.servizi, function(i, value) {
                                $("#servizio").append('<option value="'+$bb[i]["id"]+'">'+$bb[i]["name"]+'  ('+$bb[i]["comune"]+'-'+$bb[i]["provincia"]+')</option>');
                            });
                            console.log(app.global.nick_array.servizio+" anno="+app.global.nick_array.anno );
                            app.global.nick_array.servizi=$mydata.servizi;
                            if( app.global.nick_array.servizio){
                                $("#servizio").val(app.global.nick_array.servizio);
                            //    $("#servizio").val(app.global.nick_array.servizio);
                               that.$('#dataTemp1').val(moment(app.global.nick_array.anno).format('YYYY'));
                            }else{
                               $("#servizio").val($servizio);
                            }
                            
                             call_rmaPma('list');
                            $("#servizio").change(function (){
                            console.log(app.global.nick_array)    
                             call_rmaPma('list');
                                
                            });
                          
                        }
                    }else{ 
                    
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

                    console.error("dep list load table error!!!");
                }
            });
            //--------------------------------------------------------------------------------
            
            that.$("#rmaPma").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizio:{
                        required:true
                    },
                    dataTemp1:{
                        required:true
                    }
                    
                },
                messages: {
                    servizio:"Scegliere un Servizio",
                    dataTemp1:"Scegliere un Anno"
                   
                }
            });
            that.$('#datetimepicker1').datetimepicker({ 
                 format: "yyyy",
                autoclose: true,
                startView: 4,
                minView: 4,
                language: "it"
                
            });
           that.$('#datetimepicker1').datetimepicker('setStartDate','-1y');
            that.$('#datetimepicker1').datetimepicker('setEndDate','+1y');
            function call_rmaPma(act){
                if(cct=='copy'){act='copy'}else{act='list'}
                cct='';
                                   var jsonObj = {};
                    jsonObj.action = act;
                    jsonObj.type = "rma_pma";
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.anno = moment(that.$('#dataTemp1').val(),"YYYY").format('YYYY');
                    jsonObj.servizio=that.$('#servizio').val();
                    app.global.nick_array.servizio=that.$('#servizio').val();//così memorizzo il servizio e poi ricarico la select su questo valore
                    app.global.nick_array.anno=that.$('#dataTemp1').val();//così memorizzo l'anno e poi lo ricarico nella select su questo valore 
                 
                    jsonObj = JSON.stringify(jsonObj);
                    
                    var API_URL = app.global.json_url + 'rma_pma/';  
                
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            cct='';
                            hrTablePma($myData,that);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
            }
            that.$("#reqPma").click(function () {
                var validator = that.$( "#rmaPma" ).validate();
                if(validator.form()){
                    console.log("reqPma");
                    event.preventDefault();
                
                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type = "rma_pma";
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.anno = moment(that.$('#datetimepicker1').val(),"YYYY").format('YYYY');
                    jsonObj.servizio=that.$('#servizio').val();

                    jsonObj = JSON.stringify(jsonObj);
                    
                    var API_URL = app.global.json_url + 'rma_pma/';  
                
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTablePma($myData,that);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            });
           
            
         
        }
       
        function sra(that){
           
            API_URL = app.global.json_url + 'upload/notifiche/';
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = app.global.nick_array.arr;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        if ($mydata.success){
                        that.$('.panel-body').empty();
                        that.$('.panel-body').append($mydata.form);
                        that.$('.panel-heading').text($mydata.head);
                        that.$("#sra").validate({
                            rules:{
                                highlight: function(element, errorClass) {
                                    $(element).fadeOut(function() {
                                        $(element).fadeIn();
                                    });
                                },
                                email:{
                                    required:true
                                },
                                name:{
                                    required:true
                                },
                                phone:{
                                    required:true
                                }
                                
                            },
                            messages: {
                                name:"Inserire Nome e Cognome",
                                phone:"Inserire numero telefono",
                                email:"Inserire una E-mail"
                               
                            }
                        });
                        that.$("#btnsra").click(function () {
                            $headers1 = {
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                "username" : app.global.tokensCollection.first().get("username"),
                                "lang" : app.global.languagesCollection.at(0).get("lang")//,
        
                            };
                            
                            var validator = that.$( "#sra" ).validate();
                            if(validator.form()){
                                var form_data = new FormData(that.$("#sra")[0]); 
                                console.log("sra");
                                $id=that.$("#id").val();
                                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                form_data.append('action', $id?"update":"add");
                               
                                
                                var API_URL = app.global.json_url + 'upload/notifiche/';  
                            
                                $.ajax({
                                    url:API_URL,
                                    type:'post',
                                    headers : $headers1,
                                    data: form_data,
                                    contentType: false,       // The content type used when sending data to the server.
                                    cache: false,             // To unable request pages to be cached
                                    processData:false, 
                                   
                                    success: function($data){
                                       
                                        $mydata =JSON.parse($data);
                                        if ($mydata.success){
                                           // that.$('.panel-body').empty();
                                           // that.$('.panel-body').append($mydata.form);
                                          //  that.$('.panel-heading').text($mydata.head);
                                      sra(that);
                                        }else{ 
                                         
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
            
                                        bootbox.dialog({
                                            title: $mydata.message,
                                            message: $mydata.message,
                                            buttons: {
                                                main: {
                                                    label: that.language.label_button,
                                                    className: "btn btn-danger",
                                                    callback: function() {
                                                       /* $("body").removeClass("modal-open");
                                                        app.routers.router.prototype.logout();*/
                                                    }
                                                }
                                            }
                                        });
                                    }
            
                                });
                            }
                        });
                    }else{ 
                        
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

                        console.error("notifiche sra error!!!");
                    }
                });
            
            
           
          
            //--------------------------------------------------------------------------------
            
           
           
          
            function call_rmaPma(act){
                if(cct=='copy'){act='copy'}else{act='list'}
                cct='';
                                   var jsonObj = {};
                    jsonObj.action = act;
                    jsonObj.type = "rma_pma";
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.anno = moment(that.$('#dataTemp1').val(),"YYYY").format('YYYY');
                    jsonObj.servizio=that.$('#servizio').val();
                    app.global.nick_array.servizio=that.$('#servizio').val();//così memorizzo il servizio e poi ricarico la select su questo valore
                    app.global.nick_array.anno=that.$('#dataTemp1').val();//così memorizzo l'anno e poi lo ricarico nella select su questo valore 
                 
                    jsonObj = JSON.stringify(jsonObj);
                    
                    var API_URL = app.global.json_url + 'rma_pma/';  
                
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            cct='';
                            hrTablePma($myData,that);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
            }
          
           
            
         
        }
        function rfa_report(that){
            console.log("rfa_report");
            that.$('.panel-heading').empty().append("Report ");
            that.$('.panel-body').empty().append(   
                '<div class="row">'+
                    '<div class="form-group col-lg-3">'+

                        '<label  >Report</label>'+
                        '<select  id="report" name="report"  class="form-control">'+
                        '<option value=0></option>'+
                        '<option value=1>Acquisti del servizio...</option>'+
                        '<option value=3>Schede tecniche/sicurezza prodotti</option>'+
                        '<option value=4>Numero ordini ricevuti per anno</option>'+
                        '</select>'+

                    '</div>'+
               
                '</div><div id="reports"></div>'  
            ); 
            
             that.$("#report").change(function (e){
               console.log(e.target.value); 
               switch (e.target.value){
                   case "0":
                      rfa_report(that);
                       break;
                   case "1":
                       rfa_report_acquisti_servizio(that);
                       break;
                   case "2":
                       rfa_report_fornitori(that);
                       break;
                    case "3":
                        rfa_report_schede(that);
                        break;  
                    case "4":
                        rfa_report_ordini_anno(that);
                        break;        
               }                       
             });
        }
        function rfa_magazzino(that){
            app.global.nick_array.arr="rfa_magazzino";
            console.log("rfa_magazzino");
            that.$(".toolbar").empty();
            $appendTool='';
             
            that.$('.panel-heading').empty().append(
              
                '<div class="row">'+                
                    '<div class="form-group col-lg-3" >'+
                        '<button type="button" id="fornitori" name="fornitori"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Fornitori Magazzino</button>'+
                    '</div>'+
                    '<div class="form-group col-lg-3" >'+
                        '<button type="button" id="categorie" name="categorie"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Categorie Magazzino</button>'+
                    '</div>'+
                    
                '</div>'
             );
            that.$('.panel-body').empty().append(   
                '<div class="row">'+
                    '<div class="form-group col-lg-3">'+

                        '<label  >Magazzino</label>'+
                        

                    '</div>'+
               
                '</div><div id="magazzino"></div>'  
            ); 
            that.$('#magazzino').empty().append(
                '<form class="well" id="f_magazzino" method="post" enctype="multipart/form-data">'+    
                   
                    '<div class="form-group " id="articoli">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rfaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
            that.$("#fornitori").click(function () {
                app.global.nick_array.arr="rfa_magazzino_fornitori";
               fornitori_click(that);
            });
            that.$("#categorie").click(function () {
                app.global.nick_array.arr="rfa_magazzino_categorie";
                categorie_click(that);

            });
            
            //-----call per popolare tab articoli magazzino
            var $headers = {
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
           var jsonObj = {};
          
           jsonObj.action = "list";
           jsonObj.type = app.global.nick_array.arr;
           //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
           jsonObj.person = app.global.tokensCollection.first().get("id_person");

           jsonObj = JSON.stringify(jsonObj);

            console.log("API_URL="+API_URL);
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data :  jsonObj,
               dataType : 'text',
               success: function (datap) {
                   $mydata =JSON.parse(datap);
                   // $mydata =(datap);

                   console.log( ($mydata.message));
                   //-------------------------------------------------------

                   if ($mydata.success){

                   
                       $myData=$mydata.data;
                       that.$(".toolbar").append($appendTool);
                      if($mydata.tab){
                           $tab=$mydata.tab;
                           console.log('tab='+$tab); 
                            $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                            hrTable_rfa_magazzino($myData,$tab);
                      }else{
                           var xx=null//tab
               
                           hrTable_rfa_magazzino($myData,xx);
                      }
                      
                      
                   }else 
                   {
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

                   console.error("hr list load table error!!!");
               }
            });
            function fornitori_click(that){ 
                $('.panel-heading').empty().append(
                    
                '<div class="row">'+                
                '<div class="form-group col-lg-3" >'+
                    '<button type="button" id="magazzinoF" name="magazzinoF"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Magazzino</button>'+
                '</div>'+
                '<div class="form-group col-lg-3" >'+
                '<button type="button" id="categorie" name="categorie"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Categorie Magazzino</button>'+
            '</div>'+
                '</div>'
                );
                $('.panel-body').empty().append(   
                    '<div class="row">'+
                        '<div class="form-group col-lg-3">'+

                            '<label  >Fornitori Magazzino</label>'+
                            

                        '</div>'+
                
                    '</div><div id="fornitoriF"></div>'  
                ); 
                $('#fornitoriF').empty().append(
                    '<form class="well" id="f_fornitori" method="post" enctype="multipart/form-data">'+    
                    
                        '<div class="form-group " id="articoli">'+
                            '<div class="row">'+  
                                '<div class="form-group col-lg-6">'+
                                '<label  id="rfaCount" ></label>'+
                                '</div>'+
                                '<div class="form-group col-lg-2 pull-right">'+
                                '<div id="downFile" ></div>'+
                                '</div>'+
                            '</div>'+    
                            '<table id="tableR" class="table  table-striped" >'+

                            '</table>'+
                        '</div>'+
                    '</form>'    
                );
                $("#magazzinoF").click(function () {
                    app.global.nick_array.arr="rfa_magazzino";
                    rfa_magazzino(that);
                });
                $("#categorie").click(function () {
                    app.global.nick_array.arr="rfa_magazzino_categorie";
                    categorie_click(that);

                });
                //-----call 
      
                var jsonObj = {};
      
                jsonObj.action = "list";
                jsonObj.type = "rfa_magazzino_fornitori";
                //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                jsonObj.person = app.global.tokensCollection.first().get("id_person");

                jsonObj = JSON.stringify(jsonObj);


                console.log("API_URL="+API_URL);
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata.message));
                        //-------------------------------------------------------

                        if ($mydata.success){

                        
                            $myData=$mydata.data;
                            $(".toolbar").append($appendTool);
                            if($mydata.tab){
                                $tab=$mydata.tab;
                                console.log('tab='+$tab); 
                                    $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                                    hrTable_rfa_magazzino_fornitori($myData,$tab);
                            }else{
                                var xx=null//tab
                    
                                hrTable_rfa_magazzino_fornitori($myData,xx);
                            }
                            
                            
                        }else 
                        {
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

                        console.error("hr list load table error!!!");
                    }
                });
            };

             function categorie_click(that){ 
                that.$('.panel-heading').empty().append(
                    
                    '<div class="row">'+                
                    '<div class="form-group col-lg-3" >'+
                        '<button type="button" id="magazzinoF" name="magazzinoF"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Magazzino</button>'+
                    '</div>'+
                    '<div class="form-group col-lg-3" >'+
                        '<button type="button" id="fornitori" name="fornitori"  class="btn btn-primary col-lg-12" style="background-color:#ffc108;" >Fornitori Magazzino</button>'+
                    '</div>'+
                    '</div>'
                );
                that.$('.panel-body').empty().append(   
                    '<div class="row">'+
                        '<div class="form-group col-lg-3">'+
    
                            '<label  >Categorie Magazzino</label>'+
                            
    
                        '</div>'+
                   
                    '</div><div id="categorieF"></div>'  
                ); 
                that.$('#categorieF').empty().append(
                    '<form  id="f_fornitori" method="post" enctype="multipart/form-data">'+    
                       
                        '<div class="form-group " id="articoli">'+
                            '<div class="row">'+  
                                 '<div class="form-group col-lg-6">'+
                                '<label  id="rfaCount" ></label>'+
                                 '</div>'+
                                 '<div class="form-group col-lg-2 pull-right">'+
                                '<div id="downFile" ></div>'+
                                 '</div>'+
                            '</div>'+    
                            '<table id="tableR" class="table  table-striped" >'+
    
                            '</table>'+
                        '</div>'+
                    '</form>'    
                );
                that.$("#magazzinoF").click(function () {
                    app.global.nick_array.arr="rfa_magazzino";
                    rfa_magazzino(that);
                });
                that.$("#fornitori").click(function () {
                    app.global.nick_array.arr="rfa_magazzino_fornitori";
                    fornitori_click(that);
    
                });
                    //-----call 
          
                var jsonObj = {};
                
                jsonObj.action = "list";
                jsonObj.type = "rfa_magazzino_categorie";
                //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                jsonObj.person = app.global.tokensCollection.first().get("id_person");

                jsonObj = JSON.stringify(jsonObj);


                console.log("API_URL="+API_URL);
                $.ajax({
                    url:API_URL,
                    type:'post',
                    headers : $headers,
                    data :  jsonObj,
                    dataType : 'text',
                    success: function (datap) {
                        $mydata =JSON.parse(datap);
                        // $mydata =(datap);

                        console.log( ($mydata.message));
                        //-------------------------------------------------------

                        if ($mydata.success){
                            $myData=$mydata.data;
                            that.$(".toolbar").append($appendTool);
                            if($mydata.tab){
                                $tab=$mydata.tab;
                                console.log('tab='+$tab); 
                                    $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                                    hrTable_rfa_magazzino_categorie($myData,$tab);
                            }else{
                                var xx=null//tab
                    
                                hrTable_rfa_magazzino_categorie($myData,xx);
                            }
                            
                            
                        }else 
                        {
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

                        console.error("hr list load table error!!!");
                    }
                });
            }
        };
        function rfa_report_acquisti_servizio(that){
            console.log("rfa_report_acquisti_servizio");
            that.$('.panel-heading').empty().append("Report acquisti del servizio ...");
            that.$('#reports').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                    '<div class="row">'+
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker1">Periodo dal... *</label>'+
                            '<div class="input-group date " id="datetimepicker1">'+

                                '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+ 
                        '</div>'+     
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker2">...al *</label>'+
                            '<div class="input-group date " id="datetimepicker2">'+
                                '<input type="text" class="form-control "  id="dataTemp2" name="dataTemp2"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+  
                         '<div class="form-group col-lg-3">'+
                            '<label  id="lblservizi" for="servizi">Servizio *</label>'+
                            '<select  id="servizi" name="servizi"  class="form-control"></select>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<label  >Fornitore *</label>'+
                            '<select  id="ditta" name="ditta"  class="form-control"></select>'+
                        '</div>'+
                        
                         '<div class="form-group col-lg-2">'+
                         '<label >Acquisti</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="report_ditte"  name="report_ditte"" value="Invio" title="Acquisti">Invio</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rfaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
    
             //--select servizi----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "servizi";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#servizi").append('<option value="">Seleziona...</option><option value="0">Tutti</option><option value="1">Area Infanzia</option><option value="2">Area Sociale</option>');
                        $.each($aa, function(i, value) {
                            that.$("#servizi").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                         //app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            //--select ditte----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rfa_fornitori";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#ditta").append('<option value="">Seleziona...</option><option value="0">Tutti</option>');
                        $.each($aa, function(i, value) {
                            that.$("#ditta").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            
            that.$("#reportInt").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizi:{
                        required:true
                    },
                    ditta:{
                        required:true
                    },
                    dataTemp1:{
                        required:true,
                    },
                    dataTemp2:{
                        required:true,
                    },
                },
                messages: {
                    servizi:"Scegliere un Servizio",
                    dataTemp1:"Scegliere una data",
                    dataTemp2:"Scegliere una data",
                }
            });
            that.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            });
            that.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            }); 
            that.$('#datetimepicker1').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker1').datetimepicker('maxDate',moment().subtract(1, 'days'));
            that.$('#datetimepicker2').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker2').datetimepicker('maxDate',moment().add(0, 'days'));
            
            that.$("#report_ditte").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("report_acquisti");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/rfa_acquisti/';  
                var $data_da=moment(that.$('#dataTemp1'),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss');
                form_data.append('id_person', $person);
               
                
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false    
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTable_rfa_report_acquisti($myData,that,1);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            }); 
            
            that.$("#servizi").on('change', function () {
                console.log(that.$("#servizi").val())
                switch (that.$("#servizi").val()) {
                    case '0':
                    case '1':    
                    case '2': 
                        that.$("#ditta option[value='0']").remove(); 
                        if ($('#ditta').find("option[value='']").length) {
                            //  $('#mySelect2').val(data.id).trigger('change');
                            console.log("esiste seleziona");
                          }else{
                        var newOption = new Option("Seleziona...", "", true, true);
                        $('#ditta').prepend(newOption).trigger('change');
                          }
                        console.log("remove tutti")   
                        break;
                
                    default:
                        if ($('#ditta').find("option[value='0']").length) {
                            //  $('#mySelect2').val(data.id).trigger('change');
                            console.log("esiste Tutti");
                          } else { 
                              // Create a DOM Option and pre-select by default
                              console.log("Create Tutti");
                              $("#ditta option[value='']").remove(); 
                              var newOption = new Option("Tutti", "0", true, true);
                              // Append it to the select
                              $('#ditta').prepend(newOption).trigger('change');
                          }  
                        break;
                }
                
                
            }); 
        };
        function rfa_report_schede(that){
            console.log("rfa_report_schede");
            that.$('.panel-heading').empty().append("Report schede tecniche/sicurezza prodotti");
            that.$('#reports').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                    '<div class="row">'+
                        
                         '<!--div class="form-group col-lg-3">'+
                            '<label  id="lblservizi" for="servizi">Servizio *</label>'+
                            '<select  id="servizi" name="servizi"  class="form-control"></select>'+
                        '</div-->'+
                        '<div class="form-group col-lg-3">'+
                            '<label  >Fornitore *</label>'+
                            '<select  id="ditta" name="ditta"  class="form-control"></select>'+
                        '</div>'+
                        '<div class="form-group col-lg-2">'+
                            '<label  >Tutti i prodotti</label>'+
                            '<input id="all" name="all" type="checkbox" class="form-control" disabled="disabled" title="Tutti i prodotti / Solo i prodotti con schede" />'+
                        '</div>'+
                        
                         '<div class="form-group col-lg-2">'+
                         '<label >Schede</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="report_schede"  name="report_schede"" value="Invio" title="Schede">Invio</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rfaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
    
             //--select servizi----------------------------------------------------
         /*   var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "servizi";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#servizi").append('<option value="0">Tutti</option>');
                        $.each($aa, function(i, value) {
                            that.$("#servizi").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                         //app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });*/
            //--select ditte----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "rfa_fornitori";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#ditta").append('<option value="0">Tutti</option>');
                        $.each($aa, function(i, value) {
                            that.$("#ditta").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            
            that.$("#reportInt").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizi:{
                        required:true
                    },
                    dataTemp1:{
                        required:true,
                    },
                    dataTemp2:{
                        required:true,
                    },
                },
                messages: {
                    servizi:"Scegliere un Servizio",
                    dataTemp1:"Scegliere una data",
                    dataTemp2:"Scegliere una data",
                }
            });
       /*     that.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            });
            that.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            }); 
            that.$('#datetimepicker1').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker1').datetimepicker('maxDate',moment().subtract(1, 'days'));
            that.$('#datetimepicker2').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker2').datetimepicker('maxDate',moment().add(0, 'days'));
            */
            that.$("#report_schede").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("report_schede");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/rfa_schede/';  
               // var $data_da=moment(that.$('#dataTemp1'),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss');
                form_data.append('id_person', $person);
               
                
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false    
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTable_rfa_report_schede($myData,that,1);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            }); 
            that.$("#ditta").on('change', function () {
                console.log($("#ditta").val(),that.$("#ditta").val())
                if($("#ditta").val()==0){
                    that.$("#all").prop('disabled', true);
                    that.$("#all").prop('checked', false);
                }else{
                    that.$("#all").prop('disabled', false);
                    that.$("#all").prop('checked', false);
                }
                
            }); 
        };
        function rfa_report_ordini_anno(that){
            console.log("rfa_report_ordini_anno");
            that.$('.panel-heading').empty().append("Report Ordini ricevuti per anno");
            that.$('#reports').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                                       
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rfaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
             c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
            // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
            id=this.id;
      
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
      
            excel_rfa_ordini_anno(this.id,'report ordini per anno '+"-"+datestring+'.xlsx','report/excel/rfa_ordini_anno/');

                });
            API_URL = app.global.json_url + 'report/rfa_ordini_anno/';
            var jsonObj = {};
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $data=$mydata.data;
                        $tab=$mydata.tab;
                        $.each($tab, function( key, value1 ){
                            if(value1["cellStyle"]=="cellStyle"){
                                value1["cellStyle"]=cellStyle;
                            }
                            if(value1["events"]=="actionEvents"){

                                value1["events"]=actionEvents;
                            }
                            if(value1["formatter"]=="actionFormatter"){

                                value1["formatter"]=actionFormatter;
                            }

                        });  

                        that.$('#tableR').bootstrapTable('destroy');
                        that.$('#tableR').bootstrapTable({
                            columns: $tab,
                            data: $data,
                            showColumns: true,
                            showRefresh: true,
                            search: true,
                            pagination: false
                        });
                       

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            
        
        };
        function bsa(that){
            console.log("BSA Beni Strumentali Arcacoop");
           
            $appendTool='';
            that.$('.panel-heading').empty().append("BSA Beni Strumentali Arcacoop ...");
            that.$('.panel-body').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                    
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rfaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+   
                        '<p class="toolbar"><a class="create btn btn-default" href="javascript:">Nuovo</a></p>'+
                       
                     
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
                     //-----call 
           var jsonObj = {};
          
           jsonObj.action = "list";
           jsonObj.type = app.global.nick_array.arr;
           //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
           jsonObj.person = app.global.tokensCollection.first().get("id_person");

           jsonObj = JSON.stringify(jsonObj);


           console.log("API_URL="+API_URL);
           $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data :  jsonObj,
               dataType : 'text',
               success: function (datap) {
                   $mydata =JSON.parse(datap);
                   // $mydata =(datap);

                   console.log( ($mydata.message));
                   //-------------------------------------------------------

                   if ($mydata.success){

                   
                       $myData=$mydata.data;
                       that.$(".toolbar").append($appendTool);
                      if($mydata.tab){
                           $tab=$mydata.tab;
                           console.log('tab='+$tab); 
                            $('#titleTipo').text("Ci sono "+$myData.length+" servizi"); 
                            hrTable_bsa($myData,$tab);
                      }else{
                           var xx=null//tab
               
                           hrTable_bsa($myData,xx);
                      }
                      
                      
                   }else 
                   {
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

                   console.error("hr list load table error!!!");
               }
           });

        };
        function rma_report(that){
            console.log("rma_report");
            that.$('.panel-heading').empty().append("Report ");
            that.$('.panel-body').empty().append(   
                '<div class="row">'+
                    '<div class="form-group col-lg-3">'+

                        '<label  >Report</label>'+
                        '<select  id="report" name="report"  class="form-control">'+
                        '<option value=0></option>'+
                        '<option value=1>Interventi servizi</option>'+
                        '<option value=2>Ditte fornitori</option>'+
                        '</select>'+

                    '</div>'+
               
                '</div><div id="reports"></div>'  
            ); 
            
             that.$("#report").change(function (e){
               console.log(e.target.value); 
               switch (e.target.value){
                   case "0":
                      rma_report(that);
                       break;
                   case "1":
                       rma_report_interventi(that);
                       break;
                   case "2":
                       rma_report_fornitori(that);
                       break;
               }                       
             });
        }
        function rma_report_fornitori(that){
            console.log("rma_report_fornitori");
            that.$('.panel-heading').empty().append("Report fornitori");
            that.$('#reports').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                    '<div class="row">'+
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker1">Periodo dal... *</label>'+
                            '<div class="input-group date " id="datetimepicker1">'+

                                '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+ 
                        '</div>'+     
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker2">...al *</label>'+
                            '<div class="input-group date " id="datetimepicker2">'+
                                '<input type="text" class="form-control "  id="dataTemp2" name="dataTemp2"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+  
                         '<div class="form-group col-lg-3">'+
                            '<label  id="lblservizi" for="servizi">Servizio *</label>'+
                            '<select  id="servizi" name="servizi"  class="form-control"></select>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<label  >Ditta *</label>'+
                            '<select  id="ditta" name="ditta"  class="form-control"></select>'+
                        '</div>'+
                        
                         '<div class="form-group col-lg-2">'+
                         '<label >Pianificazioni</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="report_ditte"  name="report_ditte"" value="Invio" title="Pianificazioni">Invio</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rmaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
    
             //--select servizi----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "servizi";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#servizi").append('<option value="0">Tutti</option>');
                        $.each($aa, function(i, value) {
                            that.$("#servizi").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                         //app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            //--select ditte----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "ditte";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#ditta").append('<option value="0">Tutti</option>');
                        $.each($aa, function(i, value) {
                            that.$("#ditta").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            
            that.$("#reportInt").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizi:{
                       // required:true
                    },
                    dataTemp1:{
                        required:true,
                    },
                    dataTemp2:{
                        required:true,
                    },
                },
                messages: {
                    servizi:"Scegliere un Servizio",
                    dataTemp1:"Scegliere una data",
                    dataTemp2:"Scegliere una data",
                }
            });
            that.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            });
            that.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            }); 
            that.$('#datetimepicker1').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker1').datetimepicker('maxDate',moment().subtract(1, 'days'));
            that.$('#datetimepicker2').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker2').datetimepicker('maxDate',moment().add(0, 'days'));
            
            that.$("#report_ditte").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("report_ditte");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/rma_ditte/';  
                var $data_da=moment(that.$('#dataTemp1'),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss');
                form_data.append('id_person', $person);
               
                
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false    
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTable_rma_report_fornitori($myData,that,1);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            }); 
        };
        function rma_report_interventi(that){
            console.log("report");
            that.$('.panel-heading').empty().append("Report Interventi Servizi");
            that.$('table tr:first th:eq( 0 )').text('Dispositivo');
            that.$('table tr:first th:eq( 0 )').attr("data-field","dispositivo"); //setter
            that.$('table tr:first th:eq( 1 )').text('Tipologia');
            that.$('table tr:first th:eq( 1 )').attr("data-field","tipologia"); //setter
            that.$('table tr:first th:eq( 2 )').remove(); //rimuove descrizione,che è la terza colonna
            that.$('table tr:first th:eq( 2 )').remove(); //rimuove valid,che è diventata la  terza colonna
            
            that.$('#reports').empty().append(
                '<form class="well" id="reportInt" method="post" enctype="multipart/form-data">'+    
                    '<div class="row">'+
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker1">Periodo dal... *</label>'+
                            '<div class="input-group date " id="datetimepicker1">'+

                                '<input type="text" class="form-control "  id="dataTemp1" name="dataTemp1"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+ 
                        '</div>'+     
                        '<div class="form-group col-lg-2">'+
                            '<label for="datetimepicker2">...al *</label>'+
                            '<div class="input-group date " id="datetimepicker2">'+
                                '<input type="text" class="form-control "  id="dataTemp2" name="dataTemp2"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+
                        '</div>'+    
                        '<div class="form-group col-lg-3">'+
                            '<label  id="lblservizi" for="servizi">Servizio *</label>'+
                            '<select  id="servizi" name="servizi"  class="form-control"></select>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<label   for="categorie">Categorie </label>'+
                            '<select  id="categorie" name="categorie"  class="form-control selectpicker" multiple data-actions-box="true"></select>'+
                        '</div>'+
                        '<!--div class="form-group col-lg-2">'+
                         '<label  id="lblservizi" for="servizi">RMA da...a</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="reqReport1"  name="reqReport1" value="Invio" title="RMA da...a con interventi chiusi">Invio</button>'+
                        '</div-->'+
                         '<div class="form-group col-lg-2">'+
                         '<label  id="lblservizi" for="servizi">Interventi da...a</label>'+
                            '<button type="submit"  class="btn btn-info  btn-block btn-large" id="reqReport2"  name="reqReport2" value="Invio" title="Interventi da...a con interventi chiusi">Invio</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group " id="report">'+
                        '<div class="row">'+  
                             '<div class="form-group col-lg-6">'+
                            '<label  id="rmaCount" ></label>'+
                             '</div>'+
                             '<div class="form-group col-lg-2 pull-right">'+
                            '<div id="downFile" ></div>'+
                             '</div>'+
                        '</div>'+    
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'    
            );
            //--select servizi----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "servizi";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;

                        that.$("#servizi").append('<option value="">Seleziona</option>');
                        $.each($aa, function(i, value) {
                            that.$("#servizi").append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'  ('+$aa[i]["comune"]+'-'+$aa[i]["provincia"]+')</option>');
                        });

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                         app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            //----multiselect categorie----------------------------------------------
            jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "categorie";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){

                        $aa=$mydata.data;
                        //versione multiselect con selectpicker
                    var lista   = [];
                   // lista.push('<option value="0"></option>');
                    $.each($aa, function(i, value) {
                        lista.push('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                    });
                     that.$("#categorie").html(lista.join(''));
                     that.$("#categorie").selectpicker('refresh');

                   $('.selectpicker').selectpicker('selectAll');
                        $('.selectpicker').selectpicker('render');
                   
                   
                   //end versione multiselect con selectpicker

                    

                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                    app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            //-------------------------------------------------------------------
            that.$("#reportInt").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizi:{
                        required:true
                    },
                    dataTemp1:{
                        required:true,
                    },
                    dataTemp2:{
                        required:true,
                    },
                },
                messages: {
                    servizi:"Scegliere un Servizio",
                    dataTemp1:"Scegliere una data",
                    dataTemp2:"Scegliere una data",
                }
            });
            that.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            });
            that.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            }); 
            that.$('#datetimepicker1').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker1').datetimepicker('maxDate',moment().subtract(1, 'days'));
            that.$('#datetimepicker2').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker2').datetimepicker('maxDate',moment().add(0, 'days'));
            
            that.$("#reqReport1").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("reqRep");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/';  
                var $data_da=moment(that.$('#dataTemp1'),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss');
                form_data.append('id_person', $person);
                form_data.append('data_da', $data_da);
                form_data.append('query', 1);
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false    
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTableReport($myData,that,1);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            }); 
            that.$("#reqReport2").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("reqRep");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/';  
                    form_data.append('categories',that.$('#categorie').val());
                    form_data.append('id_person', $person);
                var $data_da=moment(that.$('#dataTemp1').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
                    console.log($data_da);
                
                form_data.append('query', 2);
                //--------------------------------------------------------------
                jsonObj = {};
                jsonObj.servizi = that.$('#servizi').val();
                jsonObj.categorie = that.$('#categorie').val();
                jsonObj.dataTemp1 = that.$('#dataTemp1').val();
                jsonObj.dataTemp2 = that.$('#dataTemp2').val();
                jsonObj.id_person = app.global.tokensCollection.first().get("id_person");
                jsonObj.query = 2;
                jsonObj = JSON.stringify(jsonObj);
                    /*
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };*/
                    $.ajax({
                        url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTableReport($myData,that,2);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            });  
             
        
        }
        function asa(that){
            console.log("asa admin");
            var API_URL = app.global.json_url + 'asa/protocolli/';  
            that.$('.panel-heading').empty().append("Protocolli e relativi allegati/moduli");
            that.$('.panel-body').empty().append(   
                '<div id="protocolli">'+ 
                '<form class="well" id="protocolliF" method="post" enctype="multipart/form-data">'+    
                    '<p class="toolbar"><a id="new" class="  btn btn-default">Nuovo Protocollo</a></p>'+
                    '<div id="list"></div>'+
                    '<div class="form-group " id="protocolliT">'+
                            
                        '<table id="tableR" class="table  table-striped" >'+

                        '</table>'+
                    '</div>'+
                '</form>'+
                '</div>'    
            );
            //--select protocolli----------------------------------------------------
            var jsonObj = {};
            jsonObj.action = "get";
            jsonObj.type = "protocolli";
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data :  jsonObj,
                dataType : 'text',
                
                success: function (json) {
                    $mydata =JSON.parse(json);
                    if ($mydata.success){
                        console.log("success");
                       
                       
                        hrTable_protocolli($mydata,that);
                    }else {

                        bootbox.dialog({
                            title: $mydata.message,
                            message: $mydata.message,
                            buttons: {
                                main: {
                                    label: that.language.label_button,
                                    className: "btn btn-danger",
                                    callback: function() {
                                        $("body").removeClass("modal-open");
                                        // app.routers.router.prototype.logout();
                                    }
                                }
                            }
                        });
                    }

                },
                error: function () {

                    bootbox.dialog({
                        title: $mydata.message,
                        message: $mydata.message,
                        buttons: {
                            main: {
                                label: that.language.label_button,
                                className: "btn btn-danger",
                                callback: function() {
                                    $("body").removeClass("modal-open");
                                   // app.routers.router.prototype.logout();
                                }
                            }
                        }
                   });
                }

            });
            
            that.$("#reportInt").validate({
                rules:{
                    highlight: function(element, errorClass) {
                        $(element).fadeOut(function() {
                            $(element).fadeIn();
                        });
                    },
                    servizi:{
                        required:true
                    },
                    dataTemp1:{
                        required:true,
                    },
                    dataTemp2:{
                        required:true,
                    },
                },
                messages: {
                    servizi:"Scegliere un Servizio",
                    dataTemp1:"Scegliere una data",
                    dataTemp2:"Scegliere una data",
                }
            });
       /*     that.$('#datetimepicker1').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            });
            that.$('#datetimepicker2').datetimepicker({ 
                format: "dd/mm/yyyy",
                autoclose: true,
                startView: 2,
                minView: 2,
                language: "it"
            }); 
            that.$('#datetimepicker1').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker1').datetimepicker('maxDate',moment().subtract(1, 'days'));
            that.$('#datetimepicker2').datetimepicker('minDate',moment().subtract(1, 'years'));
            that.$('#datetimepicker2').datetimepicker('maxDate',moment().add(0, 'days'));
            */
            that.$("#report_schede").click(function () {
                var validator = that.$( "#reportInt" ).validate();
                if(validator.form()){
                
                console.log("report_schede");
                event.preventDefault();
                
                var form_data = new FormData(that.$("#reportInt")[0]); 
                
                var $person=app.global.tokensCollection.first().get("id_person");
                var API_URL = app.global.json_url + 'report/rfa_schede/';  
               // var $data_da=moment(that.$('#dataTemp1'),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD HH:mm:ss');
                form_data.append('id_person', $person);
               
                
                    $headers = {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                        "username" : app.global.tokensCollection.first().get("username"),
                        "lang" : app.global.languagesCollection.at(0).get("lang")//,

                    };
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false    
                        
                        success: function($data){
                            
                            console.log("success");
                            $mydata =JSON.parse($data);
                            $myData= $mydata;
                            console.log( $myData);
                            hrTable_rfa_report_schede($myData,that,1);
                            
                        },
                        error: function () {

                            bootbox.dialog({
                                title: $mydata.message,
                                message: $mydata.message,
                                buttons: {
                                    main: {
                                        label: that.language.label_button,
                                        className: "btn btn-danger",
                                        callback: function() {
                                           /* $("body").removeClass("modal-open");
                                            app.routers.router.prototype.logout();*/
                                        }
                                    }
                                }
                            });
                        }

                    });
                }
            }); 
            that.$("#ditta").on('change', function () {
                console.log($("#ditta").val(),that.$("#ditta").val())
                if($("#ditta").val()==0){
                    that.$("#all").prop('disabled', true);
                    that.$("#all").prop('checked', false);
                }else{
                    that.$("#all").prop('disabled', false);
                    that.$("#all").prop('checked', false);
                }
                
            }); 
        };
        function hrTablePma ($myData,that){
            c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"   width="20px"/></button>';
            // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
                id=this.id;
                var d = new Date();
                var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
                excel(this.id,'report '+ that.$("#servizi option:selected").text()+"-"+datestring+'.xlsx');
            });
            this.$(".toolbar").empty();  
            this.$(".toolbar").append($myData.newR); 
            this.$('#new').click(function () {
                modalPMA(true,that);
                id=this.id;
                console.log(app.global.sub );
            }); 
            app.global.nick_array.servizioCP=that.$("#servizi option:selected").text();
           
            console.log(app.global.nick_array.servizio+" anno="+app.global.nick_array.anno );
            $.each( $myData.data, function( key, value1 ){

                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                   value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');

                }
                if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                   value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

                }
            });
            that.$('#pmaCount').empty();
            that.$('#pmaCount').text("Ci sono "+$myData.data.length+" PMA");
            that.$('#tableR').empty();
            if($myData.data.length==0){//se non ci sono PMA creo al volo un button per poter copiare le PMA dell'anno precedente
                this.$('#planPma').empty();//se non ci sono pma è inutile il planning
                this.$(".toolbar").append(  '<div class="form-group col-lg-3">'+
                           
                            '<button type="button"  class="btn btn-info  btn-block btn-large" id="copyPma"  name="copyPma" value="Copia PMA anno precedente" title="Copia PMA anno precedente">Copia PMA anno precedente</button>'+
                        '</div>'); 
            }else{
                this.$('#planPma').empty();
                this.$('#planPma').append(
                        '<div class="form-group col-lg-3" id="planPma">'+
                        '<button type="button"  class="btn btn-info  btn-block btn-large " id="planningPma"  name="planningPma" value="Planning" title="Planning">Planning</button>'+
                        '</div>');
                        
            }
            this.$('#copyPma').click(function () {
                 console.log('#copyPma' );
                 rmaPma('copy');
                 
            });
            this.$('#planningPma').click(function () {
                console.log('#planningPma' );
                app.global.breadcrumb.push({
                    breadcrumb: '<li class="breadcrumb-item ">Planning PMA</li>'
                });
                app.routers.rmaRouter.prototype.planning();
                 
            });
            $.each($myData.tab, function( key, value1 ){


                if(value1["cellStyle"]=="cellStyle"){

                    value1["cellStyle"]=cellStyle;
                }
                 if(value1["events"]=="actionEvents"){

                    value1["events"]=actionEvents;
                }
                 if(value1["formatter"]=="actionFormatter"){

                    value1["formatter"]=actionFormatter;
                }

            });  

            that.$('#tableR').bootstrapTable('destroy');
            that.$('#tableR').bootstrapTable({
                columns: $myData.tab,
                data: $myData.data,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
            
         
        }
        function modalPMA(isNew,row){
            console.log(app.global.sub );
            console.log(row);
            var $man,$dit;
            if(isNew){
              $man=0;
              $dit=0;
            }else{
              $man=row.id_tipo_manutenzione;  
            }

            $("#newModalForm").empty();
                $("#newModalForm").append(
                    '<input type="hidden" class="form-control" name="id" id="id">'+ 
                    '<input type="hidden" class="form-control" name="servizioId" value="'+that.$('#servizio').val()+'" >'+
                    '<div class="form-group col-lg-9">'+
                            '<label  id="lblTip" for="cap">Tipologia Manutenzione</label>'+
                            '<select  name="tipologia" id="tipologia"  class="form-control"  required></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-3">'+
                            '<label for="datetimepickerX">Anno *</label>'+
                            '<div class="input-group date " id="datetimepickerX" name="datetimepickerX">'+

                                '<input type="text" class="form-control "  id="dataTempX" name="dataTempX"/>'+ 
                                '<span class="input-group-addon">'+  
                                    '<span class="glyphicon glyphicon-calendar"></span>'+ 
                                '</span>'+
                            '</div>'+ 
                        '</div>'+  
                    '<div class="form-group col-lg-7">'+
                            '<label  id="lblDitta" for="ditta">Ditta Incaricata</label>'+
                            '<select  name="ditta" id="ditta"  class="form-control"  required></select>'+
                    '</div>'+
                    '<div class="form-group col-lg-3">'+
                        '<label  id="lblComp" for="contratto">N° Contratto</label>'+
                        '<input  type="text" name="contratto" id="contratto"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-lg-2">'+

                        '<label for="valid">Valido</label>'+
                        '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label  id="lblComp" for="competenza">Competenza</label>'+
                        '<input  type="text" name="competenza" id="competenza"  class="form-control" >'+
                    '</div>'+
                    

                    '<div class="form-group col-lg-4">'+
                        '<label id="lblname" for="periodicita">Periodicità</label>'+
                            '<select class="form-control" id="periodicita" name="periodicita" title="Scegli una opzione" required>'+
                              '<option value="Mensile">Mensile</option>'+
                              '<option value="Bimestrale">Bimestrale</option>'+
                              '<option value="Trimestrale">Trimestrale</option>'+
                              '<option value="3 volte">3 volte</option>'+
                              '<option value="Quadrimestrale">Quadrimestrale</option>'+
                              '<option value="Semestrale">Semestrale</option>'+
                              '<option value="Annuale">Annuale</option>'+
                              '<option value="Biennale">Biennale</option>'+
                              '<option value="Quinquennale">Quinquennale</option>'+
                              '<option value="Secondo necessità">Secondo necessità</option>'+
                            '</select>'+

                    '</div>'+
                    '<div class="form-group col-lg-4">'+
                        '<label for="programmazione">Programmazione </label>'+
                        '<div class="input-group date " name="programmazione" id="programmazione">'+
                            '<input type="text" class="form-control "  id="programmazioneX" name="programmazioneX"/>'+ 
                            '<span class="input-group-addon">'+  
                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                            '</span>'+
                        '</div>'+  
                    '</div>'+
                     '<div class="form-group col-lg-12">'+
                        '<label >Note</label>'+
                        '<textarea  name="note" id="note"  class="form-control" ></textarea>'+
                    '</div>'+
                    '<!--div class="form-group col-lg-12">'+
                        '<div class="form-group col-lg-4">'+
                            '<button class="btn btn-default col-lg-12" type="button" name="pianificazione" id="pianificazione" >Pianificazione</button>'+
                        '</div>'+
                        '<div class="form-group col-lg-4">'+
                            '<button class="btn btn-default col-lg-12" type="button" name="monitoraggio" id="monitoraggio" >Monitoraggio</button>'+
                        '</div>'+
                        '<div class="form-group col-lg-4">'+
                            '<button class="btn btn-default col-lg-12" type="button" name="straordinaria" id="straordinaria">Straordinaria</button>'+
                        '</div>'+
                    '</div-->'
                    );
                 
                var $selTipi=$("#tipologia");
                var $selDitte=$("#ditta");
                console.log(that.$('#servizio').val()) ;
                console.log($('#dataTemp1').val()) ;
                
               
                
                tipiManut();
                function  tipiManut(){    
                    console.log("new="+isNew) ;
                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type = "rma_pmatipologie";

                    if(isNew){
                        jsonObj.tipiManut = parseInt($selTipi.val());
                    }else{
                         jsonObj.tipiManut= parseInt(row.id_tipo_manutenzione);
                    }

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data: jsonObj,
                        dataType : 'text',
                        success: function (json) {
                            $mydata =JSON.parse(json);

                            $selTipi.empty();
                            $aa=$mydata.data;
                            $.each($aa, function(i, value) {
                               $selTipi.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                            });
                            // $selComune.val(2797);//seleziona firenze
                            if(isNew){
                                $selTipi.val();//seleziona pr firenze 33
                            }else{
                                $selTipi.val(parseInt(row.id_tipo_manutenzione));//seleziona pr firenze 33

                            }

                        }
                    });
                    tipiDitte();
                }
                function  tipiDitte(){    

                    var jsonObj = {};
                    jsonObj.action = "list";
                    jsonObj.type = "ditte";

                    if(isNew){
                        jsonObj.tipiDitte = parseInt($selDitte.val());
                    }else{
                         jsonObj.tipiDitte= parseInt(row.id_ditta);
                    }
                    

                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj = JSON.stringify(jsonObj);

                    $.ajax({
                       url:app.global.json_url + 'types/',
                       type:'post',
                       headers : $headers,
                       data: jsonObj,
                       dataType : 'text',
                        success: function (json) {
                           $mydata =JSON.parse(json);
                           $selDitte.empty();
                           $aa=$mydata.data;
                           $selDitte.append('<option value="0"></option>');
                           $.each($aa, function(i, value) {
                              $selDitte.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["name"]+'</option>');
                           });
                       // $selComune.val(2797);//seleziona firenze
                       if(isNew){
                             $selDitte.val();//seleziona pr firenze 33
                        }else{
                             $selDitte.val(parseInt(row.id_ditta));

                        }

                        }
                    });
                }  
                $('#datetimepickerX').datetimepicker({ 
                    format: "yyyy",
                    autoclose: true,
                    startView: 4,
                    minView: 4,
                    language: "it"
                
                });
                $('#programmazione').datetimepicker({ 
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    language: "it"
                
                });
                
                $('#datetimepickerX').datetimepicker('setStartDate','-1y');
                $('#datetimepickerX').datetimepicker('setEndDate','+1y');
                
                if(isNew){
                    $('.modal-title').text("Add PMA per il servizio "+that.$('#servizio option:selected').text());
                    $("#competenza").val();
                    $("#contratto").val();
                    $("#valid").val();
                    $("#periodicita").val();
                    $("#id").val();
                    $('#dataTempX').val(moment($('#dataTemp1').val()).format('YYYY'));
                   $("#note").val();
                   
                    
                }else{
                    $('.modal-title').text("Modifica PMA per il servizio "+that.$('#servizio option:selected').text());
                    if(row.valid==="1"){$active=true}else{$active=false}
                    $("#valid").prop("checked", $active);
                    $("#contratto").val(row.contratto);
                    $("#competenza").val(row.competenza);
                    $("#id").val(row.id);
                    $("#periodicita").val(row.periodicita);
                    $('#dataTempX').val(moment(row.anno).format('YYYY'));
                     $("#note").val(row.note);
                    if(row.programmazione!="1000-01-01 00:00:00"){
                        console.log(row.programmazione)
                        $('#programmazioneX').val(moment(row.programmazione,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY'));
                    }
                }
                var d = new Date();
                var currYear = d.getFullYear();
                var currYear1 = moment($('#dataTempX').val()).format('YYYY');
                var startDate = new Date(currYear1,"00","01");
                var endDate = new Date(currYear1,"11","31");
                $('#programmazione').datetimepicker('setStartDate',startDate);
                $('#programmazione').datetimepicker('setEndDate',endDate);
                $('#dataTempX').on('change', function(e) {
                    console.log(moment($('#dataTempX').val()).format('YYYY'));
                     currYear1 = moment($('#dataTempX').val()).format('YYYY');
                      startDate = new Date(currYear1,"00","01");
                 endDate = new Date(currYear1,"11","31");
                  $('#programmazione').datetimepicker('setStartDate',startDate);
                $('#programmazione').datetimepicker('setEndDate',endDate);
                });
                $("#newModalForm").validate({

                rules: {
                    competenza: {
                      required: true,
                      minlength: 2
                    }


                },
                messages: {
                    competenza: {
                      required: "Perfavore inserisci il nome di  Competenza",
                      minlength: "Il nome della  Competenza deve contenere perlomeno 2 caratteri"
                    }
                }
            } );

                $modal.modal('show');
        }
        function modalProtocolli(isNew,row){
            console.log(app.global.sub );
            console.log(row);
           
            this.$("#newModalForm").empty();
                $("#newModalForm").append(
                    '<input type="hidden" class="form-control" name="id" id="id">'+ 
                    '<div class="form-group col-lg">'+
                        '<label>Codice</label>'+
                        '<input  type="text" name="codice" id="codice"  class="form-control" >'+
                    '</div>'+
                    
                    '<div class="form-group col-lg">'+
                        '<label>Titolo</label>'+
                        '<input  type="text" name="titolo" id="titolo"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-lg">'+
                        '<label>IND. REV</label>'+
                        '<input  type="text" name="ind_revisione" id="ind_revisione"  class="form-control" >'+
                    '</div>'+
                    '<div class="form-group col-lg">'+
                        '<label >Data 1° emissione</label>'+
                        '<div class="input-group date " id="data_emissioneX" name="data_emissioneX">'+

                            '<input type="text" class="form-control "  id="data_emissione" name="data_emissione" readonly="true"/>'+ 
                            '<span class="input-group-addon">'+  
                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                            '</span>'+
                        '</div>'+ 
                    '</div>'+  
                    
                    '<div class="form-group col-lg">'+
                        '<label>Data revisione</label>'+
                        '<div class="input-group date " name="data_revisioneX" id="data_revisioneX">'+
                            '<input type="text" class="form-control "  id="data_revisione" name="data_revisione" readonly="true"/>'+ 
                            '<span class="input-group-addon">'+  
                                '<span class="glyphicon glyphicon-calendar"></span>'+ 
                            '</span>'+
                        '</div>'+  
                    '</div>'
                   );
                   $('#data_emissioneX').datetimepicker({ 
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    language: "it"
                
                });
                $('#data_revisioneX').datetimepicker({ 
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    language: "it"
                
                });
                
             //   $('#data_emissioneX').datetimepicker('setStartDate','-1y');
                $('#data_emissioneX').datetimepicker('setEndDate','+1y');
               // $('#data_revisioneX').datetimepicker('setStartDate','-1y');
                $('#data_revisioneX').datetimepicker('setEndDate','+1y');
             
                
                if(isNew){
                    console.log ("isNew",isNew);  
                    $('.modal-title').text("Add Protocollo ");
                    $('#data_emissione').val();
                    $('#data_revisione').val();
                    
                }else{
                    $('.modal-title').text("Modifica Protocollo ");
                    $('#codice').val(decodeEntities(row.codice));
                    $('#id').val(decodeEntities(row.id));
                    $('#titolo').val(decodeEntities(row.titolo));
                    $('#ind_revisione').val(decodeEntities(row.rev));
                    if(row.data_prima_emi!="null"){
                        console.log(row.data_prima_emi)
                        $('#data_emissione').val(row.data_prima_emi);
                    }
                    if(row.data_revisione!="null"){
                        console.log(row.data_revisione)
                        $('#data_revisione').val(row.data_revisione);
                    }
                   
                }
                $("#newModalForm").validate({

                    rules: {
                        codice: {
                          required: true,
                          minlength: 2
                        },
                        titolo: {
                          required: true,
                          minlength: 2
                        },
                        ind_revisione: {
                          required: true,
                          minlength: 2
                        },
                        data_emissione: {
                          required: true,
                          
                        },
                        data_revisione: {
                          required: true,
                         
                        }
    
    
                    },
                    messages: {
                        codice: {
                          required: "Perfavore inserisci il Codice del Protocollo",
                          minlength: "Il Codice  deve contenere perlomeno 2 caratteri"
                        },
                        titolo: {
                          required: "Perfavore inserisci il Titolo del Protocollo",
                          minlength: "Il Titolo  deve contenere perlomeno 2 caratteri"
                        },
                        ind_revisione: {
                          required: "Perfavore inserisci l'indice di revisione",
                          minlength: "L'indice di revisione  deve contenere perlomeno 2 caratteri"
                        },
                        data_emissione: {
                          required: "Perfavore inserisci la data di primo inserimento",
                         
                        },
                        data_revisione: {
                          required: "Perfavore inserisci la data di revisione",
                          
                        }
                    }
                } );
            
                $modal.modal('show');
        }
        function hrTableReport ($myData,that,query){
              c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
          // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
        this.$("#downFile").empty();  
        this.$("#downFile").append(c1); 
        this.$('#excel').click(function () {
        id=this.id;
        
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
        excel(this.id,'report '+ that.$("#servizi option:selected").text()+"-"+datestring+'.xlsx',$myData.totale);

    });
            $.each( $myData.data, function( key, value1 ){
          
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                   //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                    value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
          
                    value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                   
                }
                if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                
                    value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
          
                    value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

                }
            });
            that.$('#rmaCount').empty();
            that.$('#rmaCount').html("Ci sono "+$myData.data.length+" Interventi! Per un totale di "+$myData.totale+" ore. <br>  Relative alle seguenti categorie:<br> -"+$myData.totale_categorie);
            that.$('#tableR').empty();
           
               
             $.each($myData.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=cellStyle;
            }
             if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
            }
             if(value1["formatter"]=="actionFormatter"){

                value1["formatter"]=actionFormatter;
            }

        });  
            
            that.$('#tableR').bootstrapTable('destroy');
             that.$('#tableR').bootstrapTable({
                columns: $myData.tab,
                data: $myData.data,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
         
        }
        
        function hrTable_rma_report_fornitori ($myData,that,query){
              c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
          // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
        this.$("#downFile").empty();  
        this.$("#downFile").append(c1); 
        this.$('#excel').click(function () {
        id=this.id;
        
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
        
        excel2(this.id,'report pianificazioni '+ that.$("#servizi option:selected").text()+"-"+ that.$("#ditte option:selected").text()+"-"+datestring+'.xlsx');

    });
            $.each( $myData.data, function( key, value1 ){
          
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                   //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                    value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
          
                    value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                   
                }
                if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                
                    value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
          
                    value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

                }
            });
            that.$('#rmaCount').empty();
            that.$('#rmaCount').text("Ci sono "+$myData.data.length+" Pianificazioni! Per il periodo dal "+moment($myData.dataDa).format('DD/MM/YYYY')+" al "+moment($myData.dataA).format('DD/MM/YYYY'));
            that.$('#tableR').empty();
           
            $.each( $myData.data, function( key, value1 ){
          
            if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
                value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
                value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
               
            }
            
           

        });    
            $.each($myData.tab, function( key, value1 ){
                
            
            if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=cellStyle;
            }
             if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
            }
             if(value1["formatter"]=="actionFormatter"){

                value1["formatter"]=actionFormatter;
            }

        });  
            
            that.$('#tableR').bootstrapTable('destroy');
             that.$('#tableR').bootstrapTable({
                columns: $myData.tab,
                data: $myData.data,
                showColumns: true,
                showRefresh: true,
                search: true,
                pagination: false
            });
         
        }
        function hrTable_rfa_report_acquisti ($myData,that,query){
            c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
            // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
            id=this.id;
      
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
      
            excel_rfa(this.id,'report acquisti '+ that.$("#servizi option:selected").text()+"-"+ that.$("#ditte option:selected").text()+"-"+datestring+'.xlsx','report/excel/rfa_acquisti/');

                });
            $.each( $myData.data, function( key, value1 ){
            
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                    value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
            
                    value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                    
                }
                if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                
                    value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
            
                    value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

                }
            });
            that.$('#rfaCount').empty();
            that.$('#rfaCount').text("Ci sono "+$myData.data.length+" Acquisti! Per il periodo dal "+moment($myData.dataDa).format('DD/MM/YYYY')+" al "+moment($myData.dataA).format('DD/MM/YYYY'));
            that.$('#tableR').empty();
         
            $.each( $myData.data, function( key, value1 ){
                
          if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
              value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
              value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
             
          }
          
         

            });    
            $.each($myData.tab, function( key, value1 ){
               
          
                if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){

                value1["formatter"]=actionFormatter;
                }

            });  
          
            that.$('#tableR').bootstrapTable('destroy');
            that.$('#tableR').bootstrapTable({
              columns: $myData.tab,
              data: $myData.data,
              showColumns: true,
              showRefresh: true,
              search: true,
              pagination: false
            });
       
        }
        function hrTable_rfa_report_schede ($myData,that,query){
            c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
            // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
            this.$("#downFile").empty();  
            this.$("#downFile").append(c1); 
            this.$('#excel').click(function () {
            id=this.id;
      
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
      
            excel_rfa(this.id,'report schede - '+ that.$("#ditte option:selected").text()+"-"+datestring+'.xlsx','report/excel/rfa_schede/');

                });
            $.each( $myData.data, function( key, value1 ){
            
                if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                    value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
            
                    value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
                    
                }
                if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
                    //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
                
                    value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
            
                    value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

                }
            });
            that.$('#rfaCount').empty();
            that.$('#rfaCount').html("Ci sono "+$myData.data.length+" Articoli!<br>Di cui "+$myData.tot.sicurezza+" con Schede di Sicurezza e "+$myData.tot.tecnica+" con Schede Tecniche" );
            that.$('#tableR').empty();
         
            $.each( $myData.data, function( key, value1 ){
        
          if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
              value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
              value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
             
          }
          
         

            });    
            $.each($myData.tab, function( key, value1 ){
              
          
                if(value1["cellStyle"]=="cellStyle"){

                value1["cellStyle"]=cellStyle;
                }
                if(value1["events"]=="actionEvents"){

                value1["events"]=actionEvents;
                }
                if(value1["formatter"]=="actionFormatter"){

                value1["formatter"]=actionFormatter;
                }

            });  
          
            that.$('#tableR').bootstrapTable('destroy');
            that.$('#tableR').bootstrapTable({
              columns: $myData.tab,
              data: $myData.data,
              showColumns: true,
              showRefresh: true,
              search: true,
              pagination: false
            });
       
        }
      function hrTable_rfa_magazzino ($myData,$tab){
        c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
    // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
  this.$("#downFile").empty();  
  this.$("#downFile").append(c1); 
  this.$('#excel').click(function () {
  id=this.id;
  
  var d = new Date();
  var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
  
  excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');

});
      $.each( $myData, function( key, value1 ){
    
          if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
             //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
              value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');
    
              value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
             
          }
          if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
              //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
          
              value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');
    
              value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

          }
      });
      this.$('#rfaCount').empty();
      this.$('#rfaCount').text("Ci sono "+$myData.length+" articoli in Magazzino");
      this.$('#tableR').empty();
     
      $.each( $myData, function( key, value1 ){
    
      if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
          value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
          value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
         
      }
      
     

  });    
      $.each($tab, function( key, value1 ){
          
      
      if(value1["cellStyle"]=="cellStyle"){

          value1["cellStyle"]=cellStyle;
      }
       if(value1["events"]=="actionEvents"){

          value1["events"]=actionEvents;
      }
       if(value1["formatter"]=="actionFormatter"){

          value1["formatter"]=actionFormatter;
      }

  });  
      
      this.$('#tableR').bootstrapTable('destroy');
       this.$('#tableR').bootstrapTable({
          columns: $tab,
          data: $myData,
          showColumns: true,
          showRefresh: true,
          search: true,
          pagination: true,
         pageSize:"25"
      });
      this.$('.remove').remove();
      this.$('.setEmail').remove();
   
  }
  function hrTable_rfa_magazzino_fornitori ($myData,$tab){
    c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
// ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
this.$("#downFile").empty();  
this.$("#downFile").append(c1); 
this.$('#excel').click(function () {
id=this.id;

var d = new Date();
var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);

excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');

});
  $.each( $myData, function( key, value1 ){

      if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
         //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
          value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');

          value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
         
      }
      if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
          //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
      
          value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

          value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

      }
  });
  this.$('#rfaCount').empty();
  this.$('#rfaCount').text("Ci sono "+$myData.length+" Fornitori Magazzino");
  this.$('#tableR').empty();
 
  $.each( $myData, function( key, value1 ){

  if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
      value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
      value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
     
  }
  
 

});    
  $.each($tab, function( key, value1 ){
      
  
  if(value1["cellStyle"]=="cellStyle"){

      value1["cellStyle"]=cellStyle;
  }
   if(value1["events"]=="actionEvents"){

      value1["events"]=actionEvents;
  }
   if(value1["formatter"]=="actionFormatter"){

      value1["formatter"]=actionFormatter;
  }

});  
  
  this.$('#tableR').bootstrapTable('destroy');
   this.$('#tableR').bootstrapTable({
      columns: $tab,
      data: $myData,
      showColumns: true,
      showRefresh: true,
      search: true,
      pagination: true,
     pageSize:"25"
  });
  this.$('.remove').remove();
  this.$('.setEmail').remove();

}
function hrTable_rfa_magazzino_categorie ($myData,$tab){
    console.log("hrTable_rfa_magazzino_categorie",$myData,$tab);
    this.$("#downFile").empty();
   /*
    c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
// ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
this.$("#downFile").append(c1); 
this.$('#excel').click(function () {
id=this.id;

var d = new Date();
var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);

excel_rfa_magazzino_categorie(this.id,'magazzino '+ "-"+datestring+'.xlsx');

});*/

  $.each( $myData, function( key, value1 ){

      if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
         //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
          value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');

          value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
         
      }
      if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
          //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
      
          value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

          value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

      }
  });
  this.$('#rfaCount').empty();
  this.$('#rfaCount').text("Ci sono "+$myData.length+" Categorie Magazzino");
  this.$('#tableR').empty();
 
  $.each( $myData, function( key, value1 ){

  if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
      value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
      value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
     
  }
  
 

});    
  $.each($tab, function( key, value1 ){
      
  
  if(value1["cellStyle"]=="cellStyle"){

      value1["cellStyle"]=cellStyle;
  }
   if(value1["events"]=="actionEvents"){

      value1["events"]=actionEvents;
  }
   if(value1["formatter"]=="actionFormatter"){

      value1["formatter"]=actionFormatter;
  }

});  
 
    this.$('#tableR').bootstrapTable('destroy');
    this.$('#tableR').bootstrapTable({
        columns: $tab,
        data: $myData,
        showColumns: true,
        showRefresh: true,
        detailView:true,
        onExpandRow: function (index, row, $detail) {
            
            console.log(row,$detail);
            $table.find('.detail-view').each(function () {
                if (!$(this).is($detail.parent())) {
                    $(this).prev().find('.detail-icon').click()
                }
            })
            //$detail.html(row.timestamp);
            var API_URL = app.global.json_url + 'mag/';
            var jsonObj = {};
            var $ordine = {};

            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj.action = "list";
            jsonObj.type = "rfa_magazzino_sub_categorie";        
            jsonObj.id =row.id;
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
                        
                        app.global.nick_array.detail=$detail;
                        hrTable_rfa_magazzino_sub_categorie($mydata.data,$mydata.tab,row.id)
                    }else{

                    }
                },
                error: function () { }
            });
           
        },
        search: true,
        pagination: true,
        pageSize:"25"
    });
 
    this.$('.remove').remove();
    this.$('.setEmail').remove();

}
function hrTable_rfa_magazzino_sub_categorie($dataSub,$tabSub,idCat){
    app.global.nick_array.arr="rfa_magazzino_sub_categorie";
    $detail=app.global.nick_array.detail;
     console.log(idCat);
    $detail.append(
        '<div class="form-group col-lg-8 pull-right">'+
        '<table id="tableSub'+idCat+'" class="table  table-striped col-lg-8 " ></table></div>'
    
        );
    $.each($tabSub, function( key, value1 ){


        if(value1["cellStyle"]=="cellStyle"){
        
            value1["cellStyle"]=cellStyle;
        }
            if(value1["events"]=="actionEvents"){
        
            value1["events"]=actionEvents;
        }
            if(value1["formatter"]=="actionFormatter"){
        
            value1["formatter"]=actionFormatter;
           
        }
        
        });  
    this.$('#tableSub'+idCat).bootstrapTable('destroy');
    this.$('#tableSub'+idCat).bootstrapTable({
        columns: $tabSub,
        data: $dataSub
        
    }); 
    this.$('.setEmail').remove();  
    this.$('.remove').remove();    
} 
  function hrTable_bsa ($myData,$tab){
    console.log("bsa");
    c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
// ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
this.$("#downFile").empty();  
this.$("#downFile").append(c1); 
this.$('#excel').click(function () {
id=this.id;

var d = new Date();
var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);

excel_bsa(this.id,'beni_strumentali_arcacoop '+ "-"+datestring+'.xlsx');

});
  $.each( $myData, function( key, value1 ){

      if(typeof(value1["data_richiesta"]) !== "undefined" && value1["data_richiesta"] !== null){    
         //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
          value1["data_richiestaT"]='<span>'+moment(value1["data_richiesta"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_richiesta"]).format('DD/MM/YYYY');

          value1["data_richiesta"]=moment(value1["data_richiesta"]).format('DD/MM/YYYY');
         
      }
      if(typeof(value1["data_intervento_effettuato"]) !== "undefined" && value1["data_intervento_effettuato"] !== null){    
          //qui aggiungo il formato data YYYYMMDDHHmmss per fare il sort della colonna con sequenze di date corretto,dentro <span> che da css lo rendo invisibile
      
          value1["data_intervento_effettuatoT"]='<span>'+moment(value1["data_intervento_effettuato"]).format('YYYYMMDDHHmmss')+'</span>'+moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

          value1["data_intervento_effettuato"]=moment(value1["data_intervento_effettuato"]).format('DD/MM/YYYY');

      }
  });
  this.$('#rfaCount').empty();
  this.$('#rfaCount').text("Ci sono "+$myData.length+" articoli in BSA");
  this.$('#tableR').empty();
 
  $.each( $myData, function( key, value1 ){

  if(typeof(value1["data"]) !== "undefined" && value1["data"] !== null){    
      value1["dataT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data"]).format('DD/MM/YYYY');
      value1["data"]=moment(value1["data"]).format('DD/MM/YYYY');
     
  }
  
 

});    
  $.each($tab, function( key, value1 ){
      
  
  if(value1["cellStyle"]=="cellStyle"){

      value1["cellStyle"]=cellStyle;
  }
   if(value1["events"]=="actionEvents"){

      value1["events"]=actionEvents;
  }
   if(value1["formatter"]=="actionFormatter"){

      value1["formatter"]=actionFormatter;
  }

});  
  
  this.$('#tableR').bootstrapTable('destroy');
   this.$('#tableR').bootstrapTable({
      columns: $tab,
      data: $myData,
      showColumns: true,
      showRefresh: true,
      search: true,
      pagination: true,
     pageSize:"10"
  });
  this.$('.remove').remove();
  this.$('.setEmail').remove();

}
function hrTable_protocolli ($myData,$that){
    c1=' <button href="'+$myData.fileName+'.xlsx" title="Excel" type="button" class="btn  " id="excel"  download> </i><img src="./css/img/excel.png"  width="20px"/></button>';
    // ' <button href="'+my.fileName+'.csv" title="Csv" type="button" class="btn info icon alternative search" id="csv" onclick="excel(this.id,\''+my.fileName+'.csv\');"  download> </i><img src="./css/img/csv.png"  width="40px"/></button>';
    this.$("#downFile").empty();  
    this.$("#downFile").append(c1); 
    this.$('#excel').click(function () {
        id=this.id;

        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);

        excel_rfa_magazzino(this.id,'magazzino '+ "-"+datestring+'.xlsx');

    });
    
    this.$('#new').click(function () {
        modalProtocolli(true,that);
        id=this.id;
        console.log(app.global.sub );
    }); 
    this.$('#list').empty();
    var $len='';
    if($myData.data){
        $len=$myData.data.length;
    }else{
        $len=0;
    } 
    this.$('#list').text("Ci sono "+$len+" Protocolli");
    this.$('#tableR').empty();
    function actionFormatter1() {
        console.log("format",$myData.format);
        return [$myData.format].join('');
    }
 
    $.each( $myData.data, function( key, value1 ){

        if(typeof(value1["data_prima_emi"]) !== "undefined" && value1["data_prima_emi"] !== null){    
            value1["data_prima_emiT"]='<span>'+moment(value1["data"]).format('YYYYMMDD')+'</span>'+moment(value1["data_prima_emi"]).format('DD/MM/YYYY');
            value1["data_prima_emi"]=moment(value1["data_prima_emi"]).format('DD/MM/YYYY');
            
        }
        if(typeof(value1["data_revisione"]) !== "undefined" && value1["data_revisione"] !== null){    
            value1["data_revisioneT"]='<span>'+moment(value1["data_revisione"]).format('YYYYMMDD')+'</span>'+moment(value1["data_revisione"]).format('DD/MM/YYYY');
            value1["data_revisione"]=moment(value1["data_revisione"]).format('DD/MM/YYYY');
        
        }
  
 

    });    
    $.each($myData.tab, function( key, value1 ){
      
  
        if(value1["cellStyle"]=="cellStyle"){

            value1["cellStyle"]=cellStyle;
        }
        if(value1["events"]=="actionEvents"){

            value1["events"]=actionEvents;
        }
        if(value1["formatter"]=="actionFormatter"){

            value1["formatter"]=actionFormatter1;
        }

    });  
  
    this.$('#tableR').bootstrapTable('destroy');
    $tab=$myData.tab;
    $data=$myData.data;
    console.log($tab,$data);
    this.$('#tableR').bootstrapTable({
        columns: $myData.tab,
        data: $myData.data,
        showColumns: true,
        showRefresh: true,
        search: true,
        pagination: true,
        pageSize:"25"
    });
    

}

function cellStyle(value, row, index) {
           
        return {css: 
               //{"background-color": row.name_cell_color}
               {"background-color":  row.stato_color}
           };
        }  
        //------------------------------------------------------------------------       
        function excel(id,file,oreTotale){
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var $data_da=moment(that.$('#dataTemp1').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        var $data_a=moment(that.$('#dataTemp2').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        var $servizio=that.$('#servizi option:selected').text();
                   
        console.log("file="+file+" data_da="+$data_da+" servizio="+$servizio);
        console.log("id="+id);
        var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
        // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
        $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
            return column.title;
        });
     $fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
        return column.field;
    });
    artw=FindVisibleFields();
    arTable1=$('#tableR').bootstrapTable('getData',artw);
    arTable=$('#tableR').bootstrapTable('getData');
    artw=FindVisibleFields();
    function FindVisibleFields() {
        var columns = $('#tableR').bootstrapTable('getVisibleColumns');
        var fields = [];
        for (var index in columns){
          fields.push(columns[index].field);
    }
     fields.push('Categoria');
        return fields;
    }
    console.log( artw);
    console.log( arTable);
    console.log($fields);
    console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
    for(i=0 ; i< arTable.length; i++){
        row = {};
        for(j=0 ; j< $fields.length; j++){
          // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
            row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
        }
        $ar.push(row);   
     }
      $.each($ar, function( key, value1 ){
          //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
          //per poter generare la data giusta x excel
                
          //  console.log("key="+key+" value="+value1["Data Intervento"]);
            if(value1["Data Intervento"]){
                  
                value1["Data Intervento"]=value1["Data Intervento"].substring(27);
            }
            if(value1["Data Richiesta"]){
                  
                value1["Data Richiesta"]=value1["Data Richiesta"].substring(27);
            }
             

        });  
      console.log($ar);
    var jsonObj = {};
  
    var  $uurl= app.global.json_url + 'report/excel/';
    //jsonObj.nameQuery =$NameQuery;
    jsonObj.da =$data_da;
    jsonObj.a =$data_a;
    jsonObj.ser =$servizio;
    jsonObj.oreTotale =oreTotale;
    
    jsonObj.table =$ar;
    jsonObj.col =$fields;
    jsonObj.person = app.global.tokensCollection.first().get("id_person");
    jsonObj.doc =id;
    //jsonObj.objParT =$arT;
    jsonObj.file =file;
    jsonObj = JSON.stringify(jsonObj);
   
    $.ajax({
        url: $uurl,
        type:'post',
        headers : $headers,
        dataType : 'text',
        data:jsonObj,
        
        success: function (json) {
            $mydata =JSON.parse(json);    
            $filex=$mydata.file;
            // console.log(id+"=id file="+$filex);
            // console.log(" filex="+$filex);
            window.location=$filex;
            //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
        }
                
    });

}  
        function excel2(id,file){
         $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
        var $data_da=moment(that.$('#dataTemp1').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        var $data_a=moment(that.$('#dataTemp2').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
        var $servizio=that.$('#servizi option:selected').text();
         var $ditta=that.$('#ditta option:selected').text();
                   
        console.log("file="+file+" data_da="+$data_da+" servizio="+$servizio);
        console.log("id="+id);
        var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
        // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
        $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
            return column.title;
        });
     $fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
        return column.field;
    });
    artw=FindVisibleFields();
    arTable1=$('#tableR').bootstrapTable('getData',artw);
    arTable=$('#tableR').bootstrapTable('getData');
    artw=FindVisibleFields();
    function FindVisibleFields() {
        var columns = $('#tableR').bootstrapTable('getVisibleColumns');
        var fields = [];
        for (var index in columns){
          fields.push(columns[index].field);
        }
        //fields.push('Categoria');
        return fields;
    }
    console.log( artw);
    console.log( arTable);
    console.log($fields);
    console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
    for(i=0 ; i< arTable.length; i++){
        row = {};
        for(j=0 ; j< $fields.length; j++){
          // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
            row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
        }
        $ar.push(row);   
     }
      $.each($ar, function( key, value1 ){
          //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
          //per poter generare la data giusta x excel
                
          //  console.log("key="+key+" value="+value1["Data Intervento"]);
            if(value1["Data"]){
                  
                value1["Data"]=value1["Data"].substring(21);
            }
           
             

        });  
      console.log($ar);
    var jsonObj = {};
  
    var  $uurl= app.global.json_url + 'report/excel/rma_ditte/';
    //jsonObj.nameQuery =$NameQuery;
    jsonObj.da =$data_da;
    jsonObj.a =$data_a;
    jsonObj.ser =$servizio;
    jsonObj.ditta =$ditta;
    
    
    jsonObj.table =$ar;
    jsonObj.col =$fields;
    jsonObj.person = app.global.tokensCollection.first().get("id_person");
    jsonObj.doc =id;
    //jsonObj.objParT =$arT;
    jsonObj.file =file;
    jsonObj = JSON.stringify(jsonObj);
   
    $.ajax({
        url: $uurl,
        type:'post',
        headers : $headers,
        dataType : 'text',
        data:jsonObj,
        
        success: function (json) {
            $mydata =JSON.parse(json);    
            $filex=$mydata.file;
            // console.log(id+"=id file="+$filex);
            // console.log(" filex="+$filex);
            window.location=$filex;
            //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
        }
                
    });

}  
function excel_rfa(id,file,url){
    $headers = {
           "X-Requested-With": "XMLHttpRequest",
           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
           "username" : app.global.tokensCollection.first().get("username"),
           "lang" : app.global.languagesCollection.at(0).get("lang"),
           "Content-Type": "application/json"
       };
   var $data_da=moment(that.$('#dataTemp1').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
   var $data_a=moment(that.$('#dataTemp2').val(),"DD/MM/YYYY HH:mm:SS").format('YYYY-MM-DD');
   var $servizio=that.$('#servizi option:selected').text();
    var $ditta=that.$('#ditta option:selected').text();
              
   console.log("file="+file+" data_da="+$data_da+" servizio="+$servizio);
   console.log("id="+id);
   var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
   // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
   $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
       return column.title;
   });
$fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
   return column.field;
});
artw=FindVisibleFields();
arTable1=$('#tableR').bootstrapTable('getData',artw);
arTable=$('#tableR').bootstrapTable('getData');
artw=FindVisibleFields();
function FindVisibleFields() {
   var columns = $('#tableR').bootstrapTable('getVisibleColumns');
   var fields = [];
   for (var index in columns){
     fields.push(columns[index].field);
   }
   //fields.push('Categoria');
   return fields;
}
console.log( artw);
console.log( arTable);
console.log($fields);
console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
for(i=0 ; i< arTable.length; i++){
   row = {};
   for(j=0 ; j< $fields.length; j++){
     // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
       row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
   }
   $ar.push(row);   
}
 $.each($ar, function( key, value1 ){
     //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
     //per poter generare la data giusta x excel
           
      console.log("key="+key+" value="+value1["Data ordine"]);
       if(value1["Data ordine"]){
             
           value1["Data ordine"]=value1["Data ordine"].substring(27);
       }
      
        

   });  
 console.log($ar);
var jsonObj = {};

var  $uurl= app.global.json_url + url;
//jsonObj.nameQuery =$NameQuery;
jsonObj.da =$data_da;
jsonObj.a =$data_a;
jsonObj.ser =$servizio;
jsonObj.ditta =$ditta;


jsonObj.table =$ar;
jsonObj.col =$fields;
jsonObj.person = app.global.tokensCollection.first().get("id_person");
jsonObj.doc =id;
//jsonObj.objParT =$arT;
jsonObj.file =file;
jsonObj = JSON.stringify(jsonObj);

$.ajax({
   url: $uurl,
   type:'post',
   headers : $headers,
   dataType : 'text',
   data:jsonObj,
   
   success: function (json) {
       $mydata =JSON.parse(json);    
       $filex=$mydata.file;
       // console.log(id+"=id file="+$filex);
       // console.log(" filex="+$filex);
       window.location=$filex;
       //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
   }
           
});

} 
function excel_rfa_ordini_anno(id,file,url){
    $headers = {
           "X-Requested-With": "XMLHttpRequest",
           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
           "username" : app.global.tokensCollection.first().get("username"),
           "lang" : app.global.languagesCollection.at(0).get("lang"),
           "Content-Type": "application/json"
       };
                 
   console.log("file="+file );
   console.log("id="+id);
   var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
   // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
   $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
       return column.title;
   });
$fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
   return column.field;
});
artw=FindVisibleFields();
arTable1=$('#tableR').bootstrapTable('getData',artw);
arTable=$('#tableR').bootstrapTable('getData');
artw=FindVisibleFields();
function FindVisibleFields() {
   var columns = $('#tableR').bootstrapTable('getVisibleColumns');
   var fields = [];
   for (var index in columns){
     fields.push(columns[index].field);
   }
   //fields.push('Categoria');
   return fields;
}
console.log( artw);
console.log( arTable);
console.log($fields);
console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
for(i=0 ; i< arTable.length; i++){
   row = {};
   for(j=0 ; j< $fields.length; j++){
     // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
       row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
   }
   $ar.push(row);   
}
 $.each($ar, function( key, value1 ){
     //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
     //per poter generare la data giusta x excel
           
      console.log("key="+key+" value="+value1["Data ordine"]);
       if(value1["Data ordine"]){
             
           value1["Data ordine"]=value1["Data ordine"].substring(27);
       }
      
        

   });  
 console.log($ar);
var jsonObj = {};

var  $uurl= app.global.json_url + url;

jsonObj.table =$ar;
jsonObj.col =$fields;
jsonObj.person = app.global.tokensCollection.first().get("id_person");
jsonObj.doc =id;
//jsonObj.objParT =$arT;
jsonObj.file =file;
jsonObj = JSON.stringify(jsonObj);

$.ajax({
   url: $uurl,
   type:'post',
   headers : $headers,
   dataType : 'text',
   data:jsonObj,
   
   success: function (json) {
       $mydata =JSON.parse(json);    
       $filex=$mydata.file;
       // console.log(id+"=id file="+$filex);
       // console.log(" filex="+$filex);
       window.location=$filex;
       //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
   }
           
});

}
function excel_rfa_magazzino(id,file){
    $headers = {
           "X-Requested-With": "XMLHttpRequest",
           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
           "username" : app.global.tokensCollection.first().get("username"),
           "lang" : app.global.languagesCollection.at(0).get("lang"),
           "Content-Type": "application/json"
       };
                
   console.log("file="+file);
   console.log("id="+id);
   var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
   // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
   $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
       return column.title;
   });
$fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
   return column.field;
});
artw=FindVisibleFields();
arTable1=$('#tableR').bootstrapTable('getData',artw);
arTable=$('#tableR').bootstrapTable('getData');
artw=FindVisibleFields();
function FindVisibleFields() {
   var columns = $('#tableR').bootstrapTable('getVisibleColumns');
   var fields = [];
   for (var index in columns){
     fields.push(columns[index].field);
   }
   //fields.push('Categoria');
   return fields;
}
console.log( artw);
console.log( arTable);
console.log($fields);
console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
for(i=0 ; i< arTable.length; i++){
   row = {};
   for(j=0 ; j< $fields.length; j++){
     // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
       row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
   }
   $ar.push(row);   
}
 $.each($ar, function( key, value1 ){
     //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
     //per poter generare la data giusta x excel
           
      console.log("key="+key+" value="+value1["Data ordine"]);
       if(value1["Data ordine"]){
             
           value1["Data ordine"]=value1["Data ordine"].substring(27);
       }
      
        

   });  
 console.log($ar);
var jsonObj = {};

var  $uurl= app.global.json_url + 'report/excel/rfa_magazzino/';
//jsonObj.nameQuery =$NameQuery;

jsonObj.table =$ar;
jsonObj.col =$fields;
jsonObj.person = app.global.tokensCollection.first().get("id_person");
jsonObj.doc =id;
//jsonObj.objParT =$arT;
jsonObj.file =file;
jsonObj = JSON.stringify(jsonObj);

$.ajax({
   url: $uurl,
   type:'post',
   headers : $headers,
   dataType : 'text',
   data:jsonObj,
   
   success: function (json) {
       $mydata =JSON.parse(json);    
       $filex=$mydata.file;
       // console.log(id+"=id file="+$filex);
       // console.log(" filex="+$filex);
       window.location=$filex;
       //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
   }
           
});

} 
function excel_bsa(id,file){
    $headers = {
           "X-Requested-With": "XMLHttpRequest",
           "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
           "username" : app.global.tokensCollection.first().get("username"),
           "lang" : app.global.languagesCollection.at(0).get("lang"),
           "Content-Type": "application/json"
       };
                
   console.log("file="+file);
   console.log("id="+id);
   var $ar=[],$arT=[],$fields={},$fieldsIndex={},row,arTable;
   // console.log( "dataKeys="+_.keys($('#tableR').bootstrapTable('getData')));
   $fields = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
       return column.title;
   });
$fieldsIndex = $('#tableR').bootstrapTable('getVisibleColumns').map(function (column) {
   return column.field;
});
artw=FindVisibleFields();
arTable1=$('#tableR').bootstrapTable('getData',artw);
arTable=$('#tableR').bootstrapTable('getData');
artw=FindVisibleFields();
function FindVisibleFields() {
   var columns = $('#tableR').bootstrapTable('getVisibleColumns');
   var fields = [];
   for (var index in columns){
     fields.push(columns[index].field);
   }
   //fields.push('Categoria');
   return fields;
}
console.log( artw);
console.log( arTable);
console.log($fields);
console.log( $fields.length+"=n dataKeysF="+$fields+"     "+arTable[0][0]);
for(i=0 ; i< arTable.length; i++){
   row = {};
   for(j=0 ; j< $fields.length; j++){
     // console.log(i+"=i j="+j+"  "+ $fields[j]+"="+arTable[i][$fieldsIndex[j]]+"-----"+$fieldsIndex[j]);
       row[ $fields[j]]=arTable[i][$fieldsIndex[j]];
   }
   $ar.push(row);   
}
 $.each($ar, function( key, value1 ){
     //qui tolgo la data e lo span che mi servivano per il sort e sono i primi 28 caratteri, 
     //per poter generare la data giusta x excel
           
      console.log("key="+key+" value="+value1["Data ordine"]);
       if(value1["Data ordine"]){
             
           value1["Data ordine"]=value1["Data ordine"].substring(27);
       }
      
        

   });  
 console.log($ar);
var jsonObj = {};

var  $uurl= app.global.json_url + 'report/excel/bsa/';
//jsonObj.nameQuery =$NameQuery;

jsonObj.table =$ar;
jsonObj.col =$fields;
jsonObj.person = app.global.tokensCollection.first().get("id_person");
jsonObj.doc =id;
//jsonObj.objParT =$arT;
jsonObj.file =file;
jsonObj = JSON.stringify(jsonObj);

$.ajax({
   url: $uurl,
   type:'post',
   headers : $headers,
   dataType : 'text',
   data:jsonObj,
   
   success: function (json) {
       $mydata =JSON.parse(json);    
       $filex=$mydata.file;
       // console.log(id+"=id file="+$filex);
       // console.log(" filex="+$filex);
       window.location=$filex;
       //   $.when(window.location=file).done(delFile(file)).fail(excel(id,file));
   }
           
});

}  
        
        
        this.$('input[type="radio"]').on('change', function(e) {
            switch (e.target.value) {
                case "1":
                    var filtered = _.filter($myData, function(item) {
                        return item.id_areaServizio === "1"
                    });
                    $('#titleTipo').text("Nell'area infanzia ci sono "+filtered.length+" servizi");
                   
                    hrTable(filtered,$tab );
                    break;
                case "2":
                    var filtered = _.filter($myData, function(item) {
                        return item.id_areaServizio === "2"
                    });
                    $('#titleTipo').text("Nell'area sociale ci sono "+filtered.length+" servizi");
                   
                    hrTable(filtered,$tab );
                    break;
                case "3":
                    var filtered = _.filter($myData, function(item) {
                        return item.id_areaServizio === "3"
                    });
                    $('#titleTipo').text("Nell'area tecnostruttura ci sono "+filtered.length+" servizi");
                   
                    hrTable(filtered,$tab );
                    break;
                case "4":
                    $('#titleTipo').text("Ci sono "+$myData.length+" servizi");  
                    
                    hrTable($myData,$tab);
                    break;
                case "5":
                    var filtered = _.filter($myData, function(item) {
                        return item.committenza_cod === "1"
                    });
                    $('#titleTipo').text("Ci sono "+filtered.length+" Committenti Privati");
                    var xx=null//tab
                    hrTable(filtered,xx );
                    break;
                case "6":
                    var filtered = _.filter($myData, function(item) {
                        return item.committenza_cod === "2"
                    });
                    $('#titleTipo').text("Ci sono "+filtered.length+" Committenti Pubblici");
                    var xx=null//tab
                    hrTable(filtered,xx );
                    break;
                case "7":
                    
                    $('#titleTipo').text("In totale ci sono "+$myData.length+" Committenti");
                    var xx=null//tab
                    hrTable($myData,xx);
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
            'click .setEmail': function (e, value, row) {
                console.log(app.global.nick_array.arr);
                
                switch (app.global.nick_array.arr){
                    case "DEPARTMENTS":{
                        var email = '';
                        var subject =' ';
                        var Tel,Ora ='';
                        if(row.telefoni[0]!=null){Tel=row.telefoni[0]['telefonoNumero']}else{Tel=''}
                        if(row.orari!=null){Ora=row.orari}else{Ora=''}
                        var emailBody = 'Servizio:  '+row.name+'%20%0A'+
                        'Indirizzo:  '+row.indirizzo+' - '+row.cap+' '+row.comune+' ('+row.provincia+')%20%0A'  +
                        'Telefono:  '+Tel+'%20%0AOrario:  '+Ora ;
                        //document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        window.location.href = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        
                        break;
                    }    
                    case "Ditte":{
                        var email = '';
                        var subject =' ';
                        var Tel,Ora ='';
                        if(row.email[0]!=null){email=row.email[0]['email']}else{email=''}
                        if(row.telefoni[0]!=null){Tel=row.telefoni[0]['telefonoNumero']}else{Tel=''}
                        if(row.orari!=null){Ora=row.orari}else{Ora=''}
                        var emailBody = '';
                        //document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        window.location.href = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        
                        break;
                    }
                    case "RFA_Fornitori":{
                        var email = '';
                        var subject =' ';
                        var Tel,Ora ='';
                        if(row.email[0]!=null){email=row.email[0]['email']}else{email=''}
                        if(row.telefoni[0]!=null){Tel=row.telefoni[0]['telefonoNumero']}else{Tel=''}
                        if(row.orari!=null){Ora=row.orari}else{Ora=''}
                        var emailBody = '';
                        //document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        window.location.href = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                        
                        break; 
                    }
                    default:
                        break;
                }      
                
             
            },
            
            'click .removeTel': function (e, value, row) {
                console.log("--removeTelK="+_.keys($row)+"--removeTelV="+_.values($row));
            },
            'click .update': function (e, value, row) {
                console.log(e,value,app.global.nick_array.arr);
                switch (app.global.nick_array.arr){
                    case'Protocolli e relativi allegati/moduli':{
                        console.log('Protocolli edit');
                        modalProtocolli(false,row);
                       break;
                    }
                    case "RMA_catDispositivi":{
                        console.log('dispositivi edit');
                        $("#newModalForm").empty();
                        $("#newModalForm").append(
                            '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                            '<div class="form-group col-lg-6">'+
                                '<label id="lblname" for="dispositivo">Dispositivo</label>'+
                                    '<select class="form-control disp" id="dispositivo" name="dispositivo" title="Scegli una opzione">'+
                                      '<option value="Estintore">Estintore</option>'+
                                      '<option value="Maniglione Antipanico">Maniglione Antipanico</option>'+
                                      '<option value="Rilevatore Fumo">Rilevatore Fumo</option>'+
                                      '<option value="Luce Emergenza">Luce Emergenza</option>'+
                                      '<option value="Idrante">Idrante</option>'+
                                    '</select>'+

                            '</div>'+
                            '<div class="form-group col-lg-6">'+
                                '<label  id="lblCat" for="categoria">Tipologia</label>'+
                                '<input  type="text" name="tipologia" id="tipologia"  class="form-control" value="'+row.tipologia+'">'+
                            '</div>');

                        $('.modal-title').text("Modifica Tipologia Dispositivo");  
                        $('.disp').find( 'option[value="'+row.dispositivo+'"]').attr('selected', 'selected'); 
                        $modal.modal('show');
                        break;
                    }    
                    case "RMA_pmaTipologie":{
                        console.log('tipologie manutenzioni edit');
                        var $valid =row.valid==="1"?true:false;
                        $("#newModalForm").empty();
                        $("#newModalForm").append(
                            '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                            '<div class="form-group col-lg-6">'+
                                '<label  id="lblName" for="name">Tipologia</label>'+
                                '<input  type="text" name="name" id="name"  class="form-control" value="'+row.name+'">'+
                            '</div>'+
                            '<div class="form-group col-lg-6">'+
                                '<label  id="lblDesc" for="descrizione">Descrizione</label>'+
                                '<input  type="text" name="description" id="description"  class="form-control" value="'+row.description+'" >'+
                            '</div>'+
                            '<div class="form-group col-lg-6">'+
                                '<label id="lblshortDescription" for="shortDescription">Descrizione breve</label>'+
                                '<input type="text" class="form-control" name="shortDescription" id="shortDescription" value="'+row.shortDescription+'">'+
                            '</div>'+
                            '<div class="form-group col-lg-4">'+
                            '<label >Ordine</label>'+
                                '<input type="number" class="form-control" name="ordine" id="ordine" value="'+row.ordine+'">'+
                         
                        '</div>'+
                            '<div class="form-group col-lg-2">'+

                                '<label for="valid">Valido</label>'+
                                '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                            '</div>'+
                            '<br/>');
                        $('#valid').prop("checked", $valid);
                        $('.modal-title').text("Modifica Tipologia Manutenzione");  
                       
                        $modal.modal('show');
                        break;
                    }    
                    case "RMA_pma":{
                        modalPMA(false,row);
                    break;
                    }
                    case "Moduli-Navbar":{
                        console.log('Moduli-Navbar');
                        var $valid =row.active==="1"?true:false;
                        $("#newModalForm").empty();
                        $("#newModalForm").append(
                            ' <div class="panel panel-default">'+
                                '<!--div class="panel-heading">Panel heading without title</div-->'+
                                '<div class="panel-body"> '+     
                                    '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                                    '<div class="form-group">'+
                                        '<label  id="lblName" for="name">Nome</label>'+
                                        '<input  type="text" name="name" id="name"  class="form-control" value="'+row.name+'" disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label >Parent</label>'+
                                        '<input  type="text" name="id_parent" id="id_parent"  class="form-control" value="'+row.id_parent+'"  disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Ordine (Peso)</label>'+
                                        '<input type="text" class="form-control" name="ordine" id="ordine" value="'+row.ordine+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+

                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+

                                        '<label for="valid">Valido</label>'+
                                        '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                                    '</div>'+
                                    '<br/>'+
                                '</div>'+
                            '</div>'   
                        );
                        $('#valid').prop("checked", $valid);
                        $('.modal-title').text("Modifica Modulo-Navbar "+row.name+' con ID='+row.id);  
                       
                        $modal.modal('show');
                        break;
                    } 
                    case "adm_tutorial":{//uso modale
                        console.log('rfa tutorial update - subType='+$subTypeX);   
                        var $valid =row.valid==="1"?true:false;  
                    $("#newModalForm").empty();
                    $("#newModalForm").append(
                        '<input type="hidden" class="form-control" name="id" value="'+row.id+'" >'+ //id senza value determina che è nuovo
                        '<input type="hidden" class="form-control" name="modulo" value="'+$subTypeX+'">'+ 
                        '<div class="row">'+
                            '<div class="form-group col-md-12">'+
                                '<label  >Titolo *</label>'+
                                '<input  type="text" name="titolo" id="titolo"  class="form-control"  value="'+row.titolo+'" >'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label >Descrizione</label>'+
                                '<input  type="text" name="descrizione" id="descrizione"  class="form-control" value="'+row.descrizione+'">'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label >File</label>'+
                                '<input  type="text" name="file" id="file"  class="form-control" value="'+row.file+'"  readonly>'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label for="allegato">Update file</label>'+
                                '<input type="file" name="allegato" class="form-input col-lg-12 allegato" id="allegato" accept="video\/mp4"  >'+
                            '</div>'+ 
                        '</div>'+ 
                    
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                                '<label class="form-check-label">Valido</label>'+
                            '</div>'+
                        '</div>' 
                        );
                        $('#valid').prop("checked", $valid);
                        $('.modal-title').text("Update Tutorial RFA");
                        /*
                        var input = $( "form input:checkbox" )
                            .wrap( "<span></span>" )
                            .parent()
                            .css({
                              background: "yellow",
                              border: "1px red solid"
                            });
                        */           
                        $("#newModalForm").validate(); //sets up the validator
                         $("input[name=\"allegato\"]").rules( "remove","required");
                        $("input[name=\"titolo\"]").rules( "add", {
                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {
                            required: "Inserire il Titolo del Tutorial"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });
                       /* $("input[name=\"allegato\"]").rules( "add", {
                        required: true,
                        //number: true,
                        // minlength: 2,

                        messages: {
                            required: "Inserire il File del Tutorial"
                            //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                            // number:"Inserire un numero!"
                        }
                    });*/
                        $modal.modal('show');
                    break;}
                    case "xadm_tutorial":{
                        console.log('rfa tutorial update - subType='+$subTypeX);
                        var $valid =row.active==="1"?true:false;
                        $("#newModalForm").empty();
                        $("#newModalForm").append(
                            ' <div class="panel panel-default">'+
                                '<!--div class="panel-heading">Panel heading without title</div-->'+
                                '<div class="panel-body"> '+     
                                    '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                                    '<div class="form-group">'+
                                        '<label  id="lblName" for="name">Nome</label>'+
                                        '<input  type="text" name="name" id="name"  class="form-control" value="'+row.name+'" disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label >Parent</label>'+
                                        '<input  type="text" name="id_parent" id="id_parent"  class="form-control" value="'+row.id_parent+'"  disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Ordine (Peso)</label>'+
                                        '<input type="text" class="form-control" name="ordine" id="ordine" value="'+row.ordine+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+

                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+

                                        '<label for="valid">Valido</label>'+
                                        '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                                    '</div>'+
                                    '<br/>'+
                                '</div>'+
                            '</div>'   
                        );
                        $('#valid').prop("checked", $valid);
                        $('.modal-title').text("Modifica Modulo-Navbar "+row.name+' con ID='+row.id);  
                       
                        $modal.modal('show');
                        break;
                    }      
                    case "xadm_tutorial_":{
                        console.log('rfa tutorial update - subType='+$subTypeX);
                        var $valid =row.active==="1"?true:false;
                        $("#newModalForm").empty();
                        $("#newModalForm").append(
                            ' <div class="panel panel-default">'+
                                '<!--div class="panel-heading">Panel heading without title</div-->'+
                                '<div class="panel-body"> '+     
                                    '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                                    '<div class="form-group">'+
                                        '<label  id="lblName" for="name">Nome</label>'+
                                        '<input  type="text" name="name" id="name"  class="form-control" value="'+row.name+'" disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label >Parent</label>'+
                                        '<input  type="text" name="id_parent" id="id_parent"  class="form-control" value="'+row.id_parent+'"  disabled>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-6">'+
                                        '<label  >Ordine (Peso)</label>'+
                                        '<input type="text" class="form-control" name="ordine" id="ordine" value="'+row.ordine+'">'+
                                    '</div>'+
                                    '<div class="form-group col-lg-4">'+

                                    '</div>'+
                                    '<div class="form-group col-lg-2">'+

                                        '<label for="valid">Valido</label>'+
                                        '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                                    '</div>'+
                                    '<br/>'+
                                '</div>'+
                            '</div>'   
                        );
                        $('#valid').prop("checked", $valid);
                        $('.modal-title').text("Modifica Modulo-Navbar "+row.name+' con ID='+row.id);  
                       
                        $modal.modal('show');
                        break;
                    }  
                    case "rfa_magazzino_categorie":
                    case "rfa_magazzino_sub_categorie":{
                        if(!row.id_categoria){
                        $("#newModalForm").empty();
                        console.log('rfa_magazzino_categorie ',isNew,row);
                        var $edit='';
                       if(isNew){
                        $edit="Add";
                       }else{
                        $edit="Update";
                       }
                        $('.modal-title').text($edit+" Categoria");  
                        modalF=
                        ' <div class="panel panel-default">'+
                            '<!--div class="panel-heading">Panel heading without title</div-->'+
                            '<div class="panel-body"> '+     
                                '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                                '<div class="form-group col-lg-6">'+
                                    '<label  id="lblDescrizione"  for="descrizione">Categoria</label>'+
                                    '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" value="'+row.descrizione+'">'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                        $btn='<div class="form-row">'+
                               '<button type="button" id="btn" name="btn" class="btn btn-primary submit ">'+$edit+' Categoria</button>'+
                           '</div>';
                        $("#newModalForm").append( modalF);
                        $('.modal-footer').empty().append($btn);
                        $modal.modal('show');
                        that.$('#btn').click(function(e) {//add dalle modali
                            if(that.$("#newModalForm").valid()){
    
                                //--------------------------------------------------------------
                                var API_URL = app.global.json_url + 'mag/';
    
                                //var jsonObj = sendUrbans_formToJson(that);
                                var form_data = new FormData($("#newModalForm")[0]); 
                                form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                form_data.append('action', $edit.toLowerCase());
                                form_data.append('type', 'rfa_magazzino_categorie');
                                
    
                                $headers = {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                    //"username" : app.global.tokensCollection.first().get("username"),
                                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                                    //"Content-Type": "application/json"
                                };
                                console.log(app.global.nick_array);
                                    $.ajax({
                                        url:API_URL,
                                        type:'post',
                                        headers : $headers,
    
                                        //data :  jsonObj,
                                        //dataType : 'text',
                                        data: form_data,
                                        contentType: false,       // The content type used when sending data to the server.
                                        cache: false,             // To unable request pages to be cached
                                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                                        success: function (datap) {
                                           
                                            $myData =JSON.parse(datap);
                                           
                                            //-------------------------------------------------------
                                            if ($myData.success){
                                               // app.routers.router.prototype.data_type_edit();
                                                console.log("ok");
                                                //$table.bootstrapTable('refresh',  setTab());
                                                //rfa_magazzino(that);//.
                                               //categorie_click(that);
                                               hrTable_rfa_magazzino_categorie($myData.data,$myData.tab);
    
    
                                                }
                                            }
                                        });
    
    
                                    that.$("#modal").modal('hide'); 
                                }else{
                                console.log("btnAlle invalid");  
                            }
    
    
                            });
                        }else{
                            $("#newModalForm").empty();
                            console.log('rfa_magazzino_sub_categorie ',isNew,row);
                            var $edit='';
                           if(isNew){
                            $edit="Add";
                           }else{
                            $edit="Update";
                           }
                            $('.modal-title').text($edit+" Sub Categoria");  
                            modalF=
                            ' <div class="panel panel-default">'+
                                '<!--div class="panel-heading">Panel heading without title</div-->'+
                                '<div class="panel-body"> '+     
                                    '<input type="hidden" class="form-control" name="id" value="'+row.id+'">'+ 
                                    '<div class="form-group col-lg-6">'+
                                        '<label  id="lblDescrizione"  for="descrizione">Sub Categoria</label>'+
                                        '<input type="text" class="form-control" name="descrizione" id="descrizione" " placeholder="" value="'+row.descrizione+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                            $btn='<div class="form-row">'+
                                   '<button type="button" id="btn" name="btn" class="btn btn-primary submit ">'+$edit+' Sub Categoria</button>'+
                               '</div>';
                            $("#newModalForm").append( modalF);
                            $('.modal-footer').empty().append($btn);
                            $modal.modal('show');
                            that.$('#btn').click(function(e) {//add dalle modali
                                if(that.$("#newModalForm").valid()){
        
                                    //--------------------------------------------------------------
                                    var API_URL = app.global.json_url + 'mag/';
        
                                    //var jsonObj = sendUrbans_formToJson(that);
                                    var form_data = new FormData($("#newModalForm")[0]); 
                                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                                    form_data.append('action', $edit.toLowerCase());
                                    form_data.append('type', 'rfa_magazzino_sub_categorie');
                                    form_data.append('id_cat', row.id_categoria);
                                    
        
                                    $headers = {
                                        "X-Requested-With": "XMLHttpRequest",
                                        "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                                        //"username" : app.global.tokensCollection.first().get("username"),
                                        "lang" : app.global.languagesCollection.at(0).get("lang"),
                                        //"Content-Type": "application/json"
                                    };
                                    console.log(app.global.nick_array);
                                        $.ajax({
                                            url:API_URL,
                                            type:'post',
                                            headers : $headers,
        
                                            //data :  jsonObj,
                                            //dataType : 'text',
                                            data: form_data,
                                            contentType: false,       // The content type used when sending data to the server.
                                            cache: false,             // To unable request pages to be cached
                                            processData:false,        // To send DOMDocument or non processed data file it is set to false       
                                            success: function (datap) {
                                               
                                                $myData =JSON.parse(datap);
                                               
                                                //-------------------------------------------------------
                                                if ($myData.success){
                                                   // app.routers.router.prototype.data_type_edit();
                                                    console.log("ok");
                                                    //$table.bootstrapTable('refresh',  setTab());
                                                    //rfa_magazzino(that);//.
                                                   //categorie_click(that);
                                                  
                                                   hrTable_rfa_magazzino_sub_categorie($myData.data,$myData.tab,row.id_categoria);
        
        
                                                    }
                                                }
                                            });
        
        
                                        that.$("#modal").modal('hide'); 
                                    }else{
                                    console.log("btnAlle invalid");  
                                }
        
        
                                });  
                        }
                        break;
                    }
                    case "rfa_magazzino_fornitori":{
                        console.log("fornitori");
                    break;
                    }
                    
                   
                    default:{
                         app.global.breadcrumb.push({
               
                            breadcrumb: '<li class="breadcrumb-item active" href="" >'+row.name+'</li>'
                        });
                        $folder=row.name;
                        console.log(row);
                        if(row.valid==1){row.valid=true}else{row.valid=false}
                        isNew=false;
                      
                        $row=row;
                        //setForm();
                        app.global.nick_array.isNew=isNew; 
                        app.global.nick_array.id=row.id; 
                        app.global.nick_array.data=row;
                        app.global.nick_array.Type=row.name;
                        app.global.breadcrumb.push({
                            breadcrumb: '<li class="breadcrumb-item "><a href="#it/data_type_editType" >'+row.name+'</a></li>'
                           //  breadcrumb: '<li class="breadcrumb-item active">'+row.name+'</li>'

                        });
                        app.global.data_type_editView.destroy_view();  
                        app.routers.adminTecRouter.prototype.data_type_editType({});
                        break;
                    }
                }
          
            },
            'click .remove': function (e, value, row) {
                console.log(app.global.nick_array.arr);
                $lblAlert="";
                switch (app.global.nick_array.arr){
                     case "Protocolli e relativi allegati/moduli":
                        API_URL=app.global.json_url + 'asa/protocolli/'; 
                         $lblAlert="Protocollo"
                     break;
                    case "Ditte":
                        $lblAlert="Ditta"
                    break;
                    case "Committenti":
                        $lblAlert="Committente"
                    break;
                    case "RMA_catDispositivi":
                        $lblAlert="Dispositivo"
                    break;
                    case "RMA_pmaTipologie":
                        $lblAlert="Tipologia"
                    break;
                     case "RMA_pma":
                        $lblAlert="PMA Pianificazione Manutenzione Arca"
                    break;
                    case "adm_tutorial":{//uso il form per uniformità delle altre call update add in tutorial
                         console.log(row);    
                        //API_URL=app.global.json_url + 'tutorial/';      
                        $lblAlert="Tutorial"   
                        if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                           
                            var form_data = new FormData();
                          form_data.append('id', row.id);
                          
                            form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                    
                            
                            form_data.append('action', 'del');
                            form_data.append('type', app.global.nick_array.arr);


                            $headers = {
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                            //"username" : app.global.tokensCollection.first().get("username"),
                            "lang" : app.global.languagesCollection.at(0).get("lang"),
                            //"Content-Type": "application/json"
                        };
                            $.ajax({
                                url: app.global.json_url + 'tutorial/',
                                type:'post',
                                headers : $headers,

                                //data :  jsonObj,
                                //dataType : 'text',
                                data: form_data,
                                contentType: false,       // The content type used when sending data to the server.
                                cache: false,             // To unable request pages to be cached
                                processData:false,        // To send DOMDocument or non processed data file it is set to false       
                                success: function (datap) {
                                    console.log(datap);
                                    $mydata =JSON.parse(datap);

                                    //-------------------------------------------------------
                                    if ($mydata.success){
                                         
                                   

                                    showAlert('Delete item successful!', 'success');
                                  
                                    $table.bootstrapTable('refresh',  setTab());
                                    //  hrTable($mydata);
                                }else {
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
                                   // console.log("refre");
                                   // $table.bootstrapTable('refresh',  callList());
                                }
                                    }
                            });
                        }return;
                    break;}
                     case "rfa_tipologie_fornitori_ag":
                         API_URL=app.global.json_url + 'rfa/'; 
                        $lblAlert="Tipo di fornitura"
                    break;
                    default://servizi
                        $lblAlert="Servizio"
                    
                }
                if (confirm('Sei sicuro di voler rimuovere questo '+$lblAlert+'?')) {
                    var jsonObj = {};
                    jsonObj.action = "del";
                    jsonObj.type = app.global.nick_array.arr;
                    //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
                    jsonObj.person = app.global.tokensCollection.first().get("id_person");
                    jsonObj.data = row;
                    jsonObj = JSON.stringify(jsonObj);
                    $.ajax({
                        url:API_URL,
                        type:'post',
                        headers : $headers,
                        data :  jsonObj,
                        dataType : 'text',
                   
                        success: function (datap) {
                            console.log(datap);
                            $mydata =JSON.parse(datap);
                            // $mydata =(datap);

                            console.log( ($mydata.message));
                            if($mydata.error){
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
                                                //hrTable($mydata);
                                                app.routers.adminTecRouter.prototype.data_type_edit();
                                            }
                                        }
                                    }
                                });    
                                //showAlert($mydata.message, 'danger');
                            }else{
                                //showAlert('Delete item successful!', 'success');
                                //showAlert($mydata.message, 'success');
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
                                                //hrTable($mydata);
                                                app.routers.adminTecRouter.prototype.data_type_edit();
                                            }
                                        }
                                    }
                                });  
                               
                            }
                       //app.routers.adminTec.prototype.data_type_edit();
                        //    $table.bootstrapTable('refresh',  setTab());
                        },
                        error: function () {
                            showAlert('Delete item error!', 'danger');
                        }
                    })
                }
            }, //remove
            'click .viewDoc': function (e, value, $row) {
                  handler(e,$row);
                  /*
                             var $headers = {
                            "Authorization": "Bearer " + app.global.tokensCollection.first().get("auth").token,
                            "lang": app.global.languagesCollection.at(0).get("lang"),
                            "Content-Type": "application/json"
                        };
                            console.log($row);
                            var jsonObj = {};
                            jsonObj.action = "download";
                            jsonObj.type = 'adm_tutorial';
                            jsonObj.id_ser = $row.id_ser;
                            jsonObj.id=$row.id;
                            jsonObj.person = app.global.tokensCollection.first().get("id_person");
                            jsonObj = JSON.stringify(jsonObj);


                            $.ajax({
                                url:app.global.json_url + 'tutorial/',
                                type:'post',
                                headers : $headers,
                                data :  jsonObj,
                                dataType : 'text',
                                success: function (datap) {
                                    var  $mydata =JSON.parse(datap);
                                    console.log($mydata);
                                  
                                    // window.open($mydata.file,'_blank','location=0,status=0,toolbar=0,scrollbars=1,resizeable=1,width=750,height=375,menubar=0');

                                    //---------------------------------------------
                                    $contenuto='<p></p><p></p><div "class col-lg-8">'+
                                                    '<p><center><strong><h1>Tutorial RFA : '+$row.titolo+'</h1></strong></center></p>'+
                                                    '<video id="video" width="70%" poster="..\..\css\img\arca.png" controls controlsList="nodownload"  style="display:block; margin: 0 auto;">'+
                                                        '<source src="" type="video/mp4">'+
                                                    '</video>'+
                                                '</div>'+
                                        '<figure id="video_player">'+
	'<div id="video_container">'+
		'<video controls poster="vid-glacier.jpg">'+
			'<source src="glacier.webm" type="video/webm">'+
			'<source src="glacier.mp4" type="video/mp4">'+
		'</video>'+
	'</div>'+
	'<figcaption>'+
		'<a href="glacier.mp4" class="currentvid">'+
			'<img src="glacier.jpg" alt="Athabasca Glacier">'+
		'</a>'+
		'<a href="lake.mp4">'+
			'<img src="lake.jpg" alt="Athabasca Lake">'+
		'</a>'+
		'<a href="mountain.mp4">'+
			'<img src="mountain.jpg" alt="Mountain">'+
		'</a>'+
	'</figcaption>'+
'</figure>'
                                    ;
                                    //----------------------------------------------
                                     $("#html_contents").empty();
                                  
                                    $("#html_contents").append($contenuto);
                                   
                                    var $video = $('#video'),
                                    videoSrc = $('source', $video).attr('src', $mydata.file);
                             videoPoster = $('video', $video).attr('poster', "..\..\css\img\arca.png");
                              
                                    $video[0].load();
                                  //  $video[0].play();
                                    $video.get(0).play()
                                    $('html,body').animate({scrollTop: $video.offset().top},'slow');
                                   
                                },
                                error: function () {

                                    console.log("View item error!");
                                }
                            });*/

                        } 
        };
        
        function setForm(){
            if(app.global.nick_array.arr=="DEPARTMENTS"){
           
            this.$("#newModalForm").empty();
            this.$("#newModalForm").append(
                '<input type="hidden" class="form-control" name="id" >'+ 
                '<div class="form-group">'+
                    '<label id="lblname" for="name">Nome Servizio</label>'+
                    '<input type="text" class="form-control" name="name" id="name" placeholder="Nome Servizio" >'+
                '</div>'+
                '<div class="form-group">'+
                    '<label  id="lblindirizzo" for="indirizzo">Indirizzo</label>'+
                    '<input type="text" class="form-control" name="indirizzo" id="indirizzo" placeholder="Indirizzo">'+
                '</div>'+
                '<div class="row">'+
                    '<div class="form-group col-lg-4">'+
                        '<label  id="lblcomune" for="comune">Comune</label>'+
                        '<select  name="comune" id="comune"  class="form-control" ></select>'+
                    
                    '</div>'+
                    '<div class="form-group col-lg-3">'+
                        '<label  id="lblcap" for="cap">CAP</label>'+
                        '<select  name="cap" id="cap"  class="form-control" ></select>'+
                   
                    '</div>'+
                    '<div class="form-group col-lg-2">'+
                        '<label  id="lblprovincia" for="provincia">Prov.</label>'+
                       '<select  name="provincia" id="provincia"  class="form-control" ></select>'+
                    '</div>'+
                    
                    '<div class="form-group col-lg-3">'+
                        '<label  id="lblregione" for="regione">Regione</label>'+
                        '<select  name="regione" id="regione"  class="form-control" ></select>'+
                    
                    '</div>'+
                
                '</div>'+
                
                '<div class="row ">'+
                    '<div class="form-group col-lg-12"  style="background-color: #f5f5f5">'+
                        '<label id="lblemailMas" class="form-group col-lg-4" >E-mail</label>'+
                        //'<button type="button" id="emailPlus" name="emailPlus" class="btn btn-default email-Plus glyphicon glyphicon-plus "></button>'+
                        '<a class="email-Plus"  title="Add Email"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                    '</div>'+
                     
                '</div>'+
                '<div id="email"></div>'+
                '<div class="row ">'+
                    '<div class="form-group col-lg-12" style="background-color: #f5f5f5">'+
                        '<label id="lblTelefonoMas" class="form-group col-lg-4">Telefono</label>'+
                           // '<button type="button" id="telefonoPlus" name="telefonoPlus" class="btn btn-default btn-lg telefono-Plus">'+
                            '<a class="telefono-Plus"  title="Add Telefono"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></a>'+
                        '</button>'+
                        '</div>'+
                '</div>'+    
                '<div id="telefoni" name"telefoni[]"></div>'+    
                
                '<div class="row">'+
                    '<div class="form-group col-lg-6">'+     
                        '<label for="device1">Dispositivo 1</label>'+
                        '<input type="text" class="form-control" name="device1" id="device1" placeholder="Dispositivo 1">'+
                    '</div>'+
                
                    '<div class="form-group col-lg-6">'+
                        '<label for="device2">Dispositivo 2</label>'+
                        '<input type="text" class="form-control" name="device2" id="device2" placeholder="Dispositivo 2">'+
                    '</div>'+
                '</div>'+  
                '<div class="form-group">'+
                    '<label>Valido</label>'+
                    '<input type="checkbox" class="form-control" name="valid" id="valid" placeholder="Valido" value="1">'+
                '</div>' /*+
                '<div class="row">'+
                    '<div class="form-group col-lg-3 col-lg-push-3">'+ 
                        '<button type="button"   id="butMod" class="btn btn-primary submit ">Submit</button>'+
                    '</div>'+
                    '<div class="form-group col-lg-3 col-lg-push-3">'+ 
                        '<button type="button" class="btn btn-default " data-dismiss="modal">Close</button>'+
                    '</div>'+
                '</div>'*/
                        ); //add input box
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
                    }
                });
             
         

            var $selRegione=this.$("#regione");
            var $selProvincia=this.$("#provincia");
            var $selComune=this.$("#comune");
            var $selCap=this.$("#cap");
           
            regioni();
           //-------------------------------regioni------------------------------------------
           function  regioni(){
          
           
            var jsonObj = {};
            //jsonObj.action = "regione";
            //jsonObj.type = app.global.nick_array.arr;
            jsonObj.action = "list";
            jsonObj.type = "regioni";
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selRegione.empty();
                   $aa=$mydata.data;
                   $.each($aa, function(i, value) {
                      $selRegione.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["nome"]+'</option>');
                   });
                 // isNew?$selRegione.val(17):$selRegione.val(parseInt($row.id_regione));//seleziona toscana or il suo
                    if(isNew){
                    parseInt($selRegione.val(17));//seleziona toscana 17
                }else{
                    $selRegione.val(parseInt($row.id_regione));//seleziona toscana
                    console.log("selReg="+$row.id_regione+" arr="+_.keys($row));
                }
                    
                  province();
                }  
            });
        }
            //-------------------------------province------------------------------------------
           
        function  province(){  
           
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type = "province";
           if(isNew){
               jsonObj.regione = parseInt($selRegione.val());
           }else{
               jsonObj.regione = parseInt($row.id_regione);
           }
            
           
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selProvincia.empty();
                   $aa=$mydata.data;
                   $.each($aa, function(i, value) {
                      $selProvincia.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["sigla"]+' ('+$aa[i]["nome"]+')</option>');
                   });
                if(isNew){
                     parseInt($selProvincia.val());//seleziona pr firenze 33
                }else{
                      $selProvincia.val(parseInt($row.id_provincia));//seleziona pr firenze 33
                     
                }
                  
                 comuni();
                }
            });
        }       
             //-------------------------------comuni------------------------------------------
           
        function  comuni(){  
         
             
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="comuni";
            
            if(isNew){
             jsonObj.provincia = parseInt($selProvincia.val());
           }else{
               jsonObj.provincia  = parseInt($row.id_provincia);
           }
            
            
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
               url:API_URL,
               type:'post',
               headers : $headers,
               data: jsonObj,
               dataType : 'text',
                success: function (json) {
                   $mydata =JSON.parse(json);
                   $selComune.empty();
                   $aa=$mydata.data;
                   $.each($aa, function(i, value) {
                      $selComune.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["comune"]+'</option>');
                   });
               // $selComune.val(2797);//seleziona firenze
                if(isNew){
                     parseInt($selComune.val());//seleziona comune firenze 2797
                }else{
                     $selComune.val(parseInt($row.id_comune));//seleziona pr firenze 33
                     
                }
                 cap();
                }
            });
        }       
             //-------------------------------cap------------------------------------------
           
        function  cap(){    
            
            var jsonObj = {};
            jsonObj.action = "list";
            jsonObj.type ="cap";
            
            if(isNew){
             jsonObj.comune = parseInt($selComune.val());
           }else{
                jsonObj.comune= parseInt($row.id_comune);
           }
            
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            jsonObj = JSON.stringify(jsonObj);
           
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                data: jsonObj,
                dataType : 'text',
                success: function (json) {
                    $mydata =JSON.parse(json);
                    $selCap.empty();
                    $aa=$mydata.data;
                    $.each($aa, function(i, value) {
                       $selCap.append('<option value="'+$aa[i]["id"]+'">'+$aa[i]["cap"]+'</option>');
                    });
                    // $selComune.val(2797);//seleziona firenze
                    if(isNew){
                        $selCap.val();//seleziona pr firenze 33
                    }else{
                        $selCap.val(parseInt($row.id_cap));//seleziona pr firenze 33

                    }

                }
            });
        }       
        
                
        //-------------------------------------event----------------------------------------------------------------
 
        this.$('#regione').change(function (e,value,row) {
            isNew=true;
            province();   
        });
        this.$('#provincia').change(function (e) {
            isNew=true;
            comuni();
        });
        this.$('#comune').change(function (e) {
            isNew=true;
            cap();
        });
    
        
       
            
      }//end if   

          
            
         
    //----------------------------------------------------------------------------------------------
    };//end callForm
       
        
       
        // emailPlus event------------------------------------------------------------------------
        this.$('#modal').on('show.bs.modal', function (e) {
          
            console.log("modale show-");
            $modal.find('.email-Plus').click(function () {
                $iEmail = $iEmail + 1;
                $i = $iEmail
                
                $("#email").append(
                '<div class="row">'+
                        '<input type="hidden" class="form-control" name="email['+$i+'][id]" >'+  
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" placeholder="Email" require>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" placeholder="Nome Email">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeEmail'+$iEmail+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+

                     '</div>'
                      // '<hr class="style13">'   
                );
                $('.removeEmail'+$iEmail).children().each(function(){
                    $(this).click(function() {
                        $(this).closest(".row").remove();
                   
                    });
                });
               
                $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                              });
       
            }); 
            $modal.find('.telefono-Plus').click(function () {
             
                $iTel = $iTel + 1;
                $i = $iTel
                
                $("#telefoni").append(  
                        

                    '<div class="row">'+
                        '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" >'+  
                       
                        '<div class="form-group col-lg-8">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefono]" placeholder="Telefono" col-lg-7>'+
                        '</div>'+
                        '<div class="form-group col-lg-3">'+
                            '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" placeholder="Nome Telefono">'+
                        '</div>'+
                        '<div class="form-group col-lg-1">'+
                            '<a class="removeTel'+$iTel+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                        '</div>'+
                       
                    '</div>'
                    //   '<hr class="style13">'   
                );
                $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                                minlength: 8,
                                number: true,
                                
                                messages: {
                                  required: "Inserire numero del Telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono valido"
                                }
                              });
                $('.removeTel'+$iTel).children().each(function(){
                 
                    $(this).click(function() {
                        $(this).closest(".row").remove();
                   
                    });
                });
                
            }) ;
            
            
        }) ;
        // create event------------------------------------------------------------------------
        this.$('.create').click(function () {
         
            /*        
            isNew=true;
            $row={};
            
            setForm();
            showModal($(this).text());
            */
           
            isNew=true;
            app.global.nick_array.isNew=isNew; 
            app.global.nick_array.Type="New";
            console.log("isNew="+isNew,app.global.nick_array);
            switch (app.global.sub) {//scelgo tra pagina nuova(se ci sono molti dati)/modale
                
                case "catDispositivi":{//uso modale
                    $("#newModalForm").empty();
                    $("#newModalForm").append(
                        '<input type="hidden" class="form-control" name="id" >'+ 
                        '<div class="form-group col-lg-6">'+
                            '<label id="lblname" for="dispositivo">Dispositivo</label>'+
                            '<select class="form-control" id="dispositivo" name="dispositivo" title="Scegli una opzione">'+
                              '<option value="Estintore">Estintore</option>'+
                              '<option value="Maniglione Antipanico">Maniglione Antipanico</option>'+
                              '<option value="Rilevatore Fumo">Rilevatore Fumo</option>'+
                              '<option value="Luce Emergenza">Luce Emergenza</option>'+
                              '<option value="Idrante">Idrante</option>'+
                            '</select>'+

                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lblCat" for="categoria">Tipologia</label>'+
                            '<input  type="text" name="tipologia" id="tipologia"  class="form-control" >'+
                        '</div>');
                    $('.modal-title').text("Add Tipologia Dispositivo");  
                    $modal.modal('show');
                    break;}
                case "pmaTipologie":{//uso modale
                    $("#newModalForm").empty();
                    $("#newModalForm").append(
                        '<input type="hidden" class="form-control" name="id" >'+ 
                        
                        '<div class="form-group col-lg-6">'+
                            '<label id="lblname" for="dispositivo">Tipologia</label>'+
                            '<input type="text" name="name" id="name"  class="form-control" >'+

                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label  id="lblDesc" for="descrizione">Descrizione</label>'+
                            '<input  type="text" name="description" id="description"  class="form-control" >'+
                        '</div>'+
                        '<div class="form-group col-lg-6">'+
                            '<label id="lblshortDescription" for="shortDescription">Descrizione breve</label>'+
                            '<input type="text" class="form-control" name="shortDescription" id="shortDescription" placeholder="">'+
                        '</div>'+
                         '<div class="form-group col-lg-4">'+
                             '<label >Ordine</label>'+
                            '<input type="number" class="form-control" name="ordine" id="ordine" placeholder="">'+
                     
                        '</div>'+
                            '<div class="form-group col-lg-2">'+

                                '<label for="valid">Valido</label>'+
                                '<input type="checkbox" class="form-control " name="valid" id="valid" >'+
                            '</div>'+
                            '<br/>');
                    $('.modal-title').text("Add Tipologia Manutenzione");  
                    $modal.modal('show');
            
                    break;}
                case "rfa_adm_tutorial":{//uso modale
                    $("#newModalForm").empty();
                    $("#newModalForm").append(
                        '<input type="hidden" class="form-control" name="id"  >'+ //id senza value determina che è nuovo
                        '<input type="hidden" class="form-control" name="modulo" value="rfa">'+ 
                        '<div class="row">'+
                            '<div class="form-group col-md-12">'+
                                '<label  >Titolo *</label>'+
                                '<input  type="text" name="titolo" id="titolo"  class="form-control" >'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label >Descrizione</label>'+
                                '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+
                            '</div>'+
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<label for="allegato">Seleziona file *</label>'+
                                '<input type="file" name="allegato" class="form-input col-lg-12 allegato" id="allegato" accept="video\/mp4">'+
                            '</div>'+ 
                        '</div>'+ 
                        '<div class="row">'+
                            '<div class="form-group col-lg-12">'+
                                '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                                '<label class="form-check-label">Valido</label>'+
                            '</div>'+
                        '</div>' 
                        );
                    $('.modal-title').text("Add Tutorial RFA");
                    /*
                    var input = $( "form input:checkbox" )
                        .wrap( "<span></span>" )
                        .parent()
                        .css({
                          background: "yellow",
                          border: "1px red solid"
                        });
                    */           
                    $("#newModalForm").validate(); //sets up the validator
                    $("input[name=\"titolo\"]").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {
                        required: "Inserire il Titolo del Tutorial"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                    $("input[name=\"allegato\"]").rules( "add", {
                    required: true,
                    //number: true,
                    // minlength: 2,

                    messages: {
                        required: "Inserire il File del Tutorial"
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                        // number:"Inserire un numero!"
                    }
                });
                    $modal.modal('show');
                    break;}
                case "rma_adm_tutorial":{//uso modale
                  $("#newModalForm").empty();
                  $("#newModalForm").append(
                      '<input type="hidden" class="form-control" name="id"  >'+ //id senza value determina che è nuovo
                      '<input type="hidden" class="form-control" name="modulo" value="rma">'+ 
                      '<div class="row">'+
                          '<div class="form-group col-md-12">'+
                              '<label  >Titolo *</label>'+
                              '<input  type="text" name="titolo" id="titolo"  class="form-control" >'+
                          '</div>'+
                      '</div>'+ 
                      '<div class="row">'+
                          '<div class="form-group col-lg-12">'+
                              '<label >Descrizione</label>'+
                              '<input  type="text" name="descrizione" id="descrizione"  class="form-control" >'+
                          '</div>'+
                      '</div>'+ 
                      '<div class="row">'+
                          '<div class="form-group col-lg-12">'+
                              '<label for="allegato">Seleziona file *</label>'+
                              '<input type="file" name="allegato" class="form-input col-lg-12 allegato" id="allegato" accept="video\/mp4">'+
                          '</div>'+ 
                      '</div>'+ 
                      '<div class="row">'+
                          '<div class="form-group col-lg-12">'+
                              '<input type="checkbox" class="form-check-input" name="valid" id="valid"  value="">'+
                              '<label class="form-check-label">Valido</label>'+
                          '</div>'+
                      '</div>' 
                      );
                  $('.modal-title').text("Add Tutorial RMA");
                  /*
                  var input = $( "form input:checkbox" )
                      .wrap( "<span></span>" )
                      .parent()
                      .css({
                        background: "yellow",
                        border: "1px red solid"
                      });
                  */           
                  $("#newModalForm").validate(); //sets up the validator
                  $("input[name=\"titolo\"]").rules( "add", {
                  required: true,
                  //number: true,
                  // minlength: 2,

                  messages: {
                      required: "Inserire il Titolo del Tutorial"
                      //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                      // number:"Inserire un numero!"
                  }
              });
                  $("input[name=\"allegato\"]").rules( "add", {
                  required: true,
                  //number: true,
                  // minlength: 2,

                  messages: {
                      required: "Inserire il File del Tutorial"
                      //minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                      // number:"Inserire un numero!"
                  }
              });
                  $modal.modal('show');
                  break;}
               
            
                   
                default:{//uso pagina nuova
                    app.global.data_type_editView.destroy_view();    
                    app.routers.adminTecRouter.prototype.data_type_editType();
                    break;}
            }
            
        });
           
        //-------submit event---------------------------------------------------
        var that = this;
        
       
       
        $modal.find('.submit').click(function (){
            var validatore = that.$( "#newModalForm" ).validate();
            if(validatore.form()){
                if(app.global.nick_array.arr=='adm_tutorial'){
                    console.log('adm');
                    var typeId,typej='';
                    var form_data = new FormData($('#newModalForm')[0]);
                    $modal.find('input[name]').each(
                        function () {
                            // console.log("che="+$(this).attr('name')+"---"+ $(this).prop("checked")) ; 
                            // that.$("#registrationForm").find('input[name="valid"]').prop("checked", row[name]);

                            if( $(this).attr('name')=="valid") {
                               // console.log($(this).attr('name'));
                              //  console.log($(this).prop("checked"));
                                  
                                    form_data.append('valido', $(this).prop("checked"));
                      
                           
                            }   
                              if( $(this).attr('name')=="id") {
                             
                                  typeId=$(this).val();
                                   
                      console.log('typeId='+typeId);
                           
                            }   
                        }
                    );
                    form_data.append('person', app.global.tokensCollection.first().get("id_person"));
                    
            typej= typeId ? 'update' : 'add';
                    form_data.append('action', typej);
                    form_data.append('type', app.global.nick_array.arr);
                  
           
                    $headers = {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                    //"username" : app.global.tokensCollection.first().get("username"),
                    "lang" : app.global.languagesCollection.at(0).get("lang"),
                    //"Content-Type": "application/json"
                };
                    $.ajax({
                        url: app.global.json_url + 'tutorial/',
                        type:'post',
                        headers : $headers,

                        //data :  jsonObj,
                        //dataType : 'text',
                        data: form_data,
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false       
                        success: function (datap) {
                            console.log(datap);
                            $mydata =JSON.parse(datap);

                            //-------------------------------------------------------
                            if ($mydata.success){
                                  console.log(typeId);
                            $modal.modal('hide');

                            showAlert((typeId ? 'Update' : 'Create') + ' item successful!', 'success');
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
                            $table.bootstrapTable('refresh',  setTab());
                            //  hrTable($mydata);
                        }else {
                          
                            bootbox.dialog({
                                title: "Errore nell'inserimento dati",
                                message: 'Errore : ' +$mydata.message,
                                buttons: {
                                    main: {
                                        label: 'Chiudi',
                                        className: "btn btn-danger",
                                        callback: function() {
                                            $("body").removeClass("modal-open");
                                        }
                                    }
                                }
                            });
                           // console.log("refre");
                           // $table.bootstrapTable('refresh',  callList());
                        }
                            }
                    });
                }else{
           
                    var feed = {
                        name: that.$('#name').val(),
                        comune:  that.$('#comune').val(),
                        indirizzo: that.$('#indirizzo').val(),
                        device1: that.$('#device1').val(),
                        device2: that.$('#device2').val()
                    };

                    var row = {};
            
                    $modal.find('input[name]').each(
                        function () {
                            console.log("che="+$(this).attr('name')+"---"+ $(this).prop("checked")) ; 
                            if( $(this).attr('name')=="valid") {
                                row[$(this).attr('name')] = $(this).prop("checked");
                            }else{

                                row[$(this).attr('name')] = $(this).val();
                            }     
                        }
                    );
          
                    $modal.find('select[name]').each(
                   
                    function () {

                        row[$(this).attr('name')] = parseInt($(this).val());
                        console.log($(this).attr('name')+'='+parseInt($(this).val()));
                    });
           
            console.log("che="+ $modal.find('input[name="valid"]').prop("checked")); 
            console.log("cherow="+ row.id+" - "+row.valid+"---"+_.keys(row)) ; 
            console.log(app.global.nick_array.arr);
            var typeName =row.name; 
            var typeComune =row.comune; 
            var typeCartella =row.shortDescription; 
            switch (app.global.nick_array.arr) {
                case "Protocolli e relativi allegati/moduli" :{
                    API_URL=app.global.json_url + 'asa/protocolli/'; 
                    break;
                }
                case "DEPARTMENTS":{
                    if(feed.device1==""){
                        row.device1=""
                    }
                    if(feed.device2==""){
                         row.device2=""
                    }
                
                    if(feed.name==""){
                        bootbox.alert({ 
                            title: "Nuovo Servizio  Errore",
                            message: "Inserire il Nome del Servizio!",

                        });
                        return;
                    }
               
                    if(typeComune==""){
                      row.comune=""

                        bootbox.alert({ 
                            title: "Nuovo Servizio  Errore",
                            message: "Inserire il Comune!",

                        });

                        return;

                    }
             
                    if(typeCartella==""){
                        bootbox.alert({ 
                            title: "Nuovo Servizio Errore",
                            message: "Inserire il nome della cartella!",

                        });

                        return;
                    }
              
                    break;}
                case "RMA_pmaTipologie":{
                    if(typeName==""){
                        bootbox.alert({ 
                            title: " Errore",
                            message: "Inserire il Nome!",

                        });

                        return;
                    }
                    
                break;}
                case "RMA_pma":{

                    if(typeName==""){
                        bootbox.alert({ 
                            title: " Errore",
                            message: "Inserire il Nome!",

                    });

                    return;
                    }

                break;}
                
                default:{
                    if(typeName==""){
                        bootbox.alert({ 
                            title: " Errore",
                            message: "Inserire il Nome!",

                        });

                        return;
                    }
                    if(typeComune==""){
                        bootbox.alert({ 
                            title: " Errore",
                            message: "Inserire la descrizione!",

                        });
                        return;
                    }
                    if(typeCartella==""){
                        bootbox.alert({ 
                            title: " Errore",
                            message: "Inserire la descrizione breve!",
                        });
                        return;
                    }
                    break;
            }
            }
        
    //---------------serialize form-----------------------------------------------
            var data = {};

    function buildInputObject(arr, val) {
        if (arr.length < 1)
        return val;  
        var objkey = arr[0];
        if (objkey.slice(-1) == "]") {
            objkey = objkey.slice(0,-1);
        }  
        var result = {};
        if (arr.length == 1){
            result[objkey] = val;
        } else {
            arr.shift();
            var nestedVal = buildInputObject(arr,val);
            result[objkey] = nestedVal;
        }
        return result;
    }

 $.each(that.$('#newModalForm').serializeArray(), function() {
 //$.each(row, function() {
    var val = this.value;
    var c = this.name.split("[");
    var a = buildInputObject(c, val);
    console.log(c+'='+val);
    $.extend(true, data, a);//Merge the contents of two or more objects together into the first object.
  });
    var $vali=0;
        if($modal.find('input[name="valid"]').prop("checked")){$vali=1}else{$vali=0}
        var validoVal= {valido:$vali};
        console.log(row.programmazioneX);
        if(row.programmazioneX){row.programmazioneX={programmazioneX:moment(row.programmazioneX, "DD/MM/YYYY").format('YYYY-MM-DD')};}else{
            
        }
       
        console.log(row.programmazioneX);
        $.extend(true, data, validoVal);
        $.extend(true, data, row.programmazioneX);
        console.log( data );
        //----------------------------------------------------------------------     
        console.log( data.id);     
            var typeId =data.id; 
            var typej= typeId ? 'update' : 'add';
             
            var jsonObj = {};
            jsonObj.action = typej;
            jsonObj.type = app.global.nick_array.arr;
            //jsonObj.role = app.global.tokensCollection.first().get("nvbr");
            jsonObj.data=data;
            jsonObj.person = app.global.tokensCollection.first().get("id_person");
            if(app.global.nick_array.arr==="DEPARTMENTS"){
                if(row.name===$folder){
                  
                }else{
                    jsonObj.oldFolder=$folder; 
                }
                
            }
            
             
            jsonObj = JSON.stringify(jsonObj);
        
            $headers = {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                //"username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
               "Content-Type": "application/json"
            };
            console.log("API_URL="+API_URL);
            $.ajax({
                url:API_URL,
                type:'post',
                headers : $headers,
                
                data :  jsonObj,
                dataType : 'text',
               
                success: function (datap) {
                    console.log(datap.data);
                    $mydata =JSON.parse(datap);
                    // $mydata =(datap);

                    console.log( ($mydata.message));
                    console.log( ($mydata.errorCode));
                   
                   
                    
                    //-----------------------------------------------------------
                    if ($mydata.success){
                        console.log(data.id);
                        $modal.modal('hide');
                        
                        showAlert((data.id ? 'Update' : 'Create') + ' item successful!', 'success');
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
                        $table.bootstrapTable('refresh',  setTab());
                        //  hrTable($mydata);
                    }else {
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
                       // console.log("refre");
                       // $table.bootstrapTable('refresh',  callList());
                    }
                },
                error: function (response,exception) {
           
                   // $mydata =JSON.parse(datap);
                   
                    console.error("hr list load table error!!!");
                    bootbox.dialog({
                    title: that.language.error_message,
                    message: that.language.error_message +" = Errore in Add",
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
            });
        }}
        });
        
    
        function  hrTable(my,tab){
            console.log(tab);
            for(i=0; i<my.length; i++){
                if (my[i].CIG_scadenza){
                    my[i].CIG_scadenza= moment(my[i].CIG_scadenza,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
                }
                if (app.global.nick_array.arr=="RFA_Servizi") {
                if (my[i].name){
                    my[i].name= my[i].name+" ("+my[i].comune+"-"+my[i].provincia+")";
                }}
                if (my[i].id_user===null){
                    my[i].id_user="NO";
                }else{
                    my[i].id_user="SI";
                }
            }
            
            
            $table.bootstrapTable('destroy');
           
            if(tab!==null){
                console.log('okkk');
                $table.empty();
               
                 $table.bootstrapTable({
                     data: my,
                     columns: tab
                    
                    
                    });
                   
                
            }else{
               $table.bootstrapTable({data: my});  
            }
            
            if ( app.global.nick_array.arr=="ROLES" || 
                 app.global.nick_array.arr=="lblEmail" || 
                 app.global.nick_array.arr=="Tipo_Servizio" || 
                 app.global.nick_array.arr=="RMA_Categorie" || 
                 app.global.nick_array.arr=="lblTelefoni" || 
                 app.global.nick_array.arr=="UTENZE_Fornitori" || 
                 app.global.nick_array.arr=="rfa_tipologie_fornitori_ag") {
           
                that.$('.setEmail').remove();
            }
            if (app.global.nick_array.arr=="Moduli-Navbar" || 
                app.global.nick_array.arr=="RFA_Banche" || 
                app.global.nick_array.arr=="RFA_Fornitori" || 
                
                app.global.nick_array.arr=="RFA_Servizi_Prodotti" || 
                app.global.nick_array.arr=="RFA_Tipologie_Fornitura"  || 
                app.global.nick_array.arr=="RFA_Servizi") {
                    that.$('.remove').remove();
                    that.$('.setEmail').remove();
                    if(app.global.nick_array.arr=="Moduli-Navbar" ){
                        that.$('.create').remove();
                    }
            }
            console.log(my);
            console.log(app.global.nick_array.arr);
           
            if ( app.global.nick_array.arr=="adm_tutorial" && my.length>0){ 
             videoP(my);

            }
            if(app.global.nick_array.arr=="RFA_magazzino"){
                that.$('.remove').remove();
                    that.$('.setEmail').remove();
                   

            }
        
        }
        //-----------------------------------------------------------------------------------------------
    
        function videoP(my){
              $rowTitolo=my[0].titolo;
             
                $contenuto='<p></p><p></p><div "class col-lg-8">'+
                                '<p><center><strong><h1>Tutorial '+my[0].modulo+' : <label id="tit"></>'+$rowTitolo+'</h1></strong></center></p>'+
                                '<figure id="video_player">'+
                                    '<div id="video_container">'+
                                        '<video controls poster="" id="video" controlsList="nodownload"  style="display:block; margin: 0 auto;" preload="metadata">'+
                                            '<source src="'+my[0].link+'#t=0.5" type="video/mp4">'+
                                        '</video>'+
                                    '</div>'+
                                    '<figcaption  ">';
                                        my.forEach(function(item){
                                            this.$rowTitolo=item.titolo;
                                            $contenuto += '<a href="'+item.link+'#t=0.5" class="currentvid">'+item.titolo+
                                                            '<img src="./\css/\img/\arca-logo.jpg" title="'+item.titolo+'">'+

                                                            '</a>';  
                                        });

                                    $contenuto +='</figcaption>'+
                                '</figure>'+
                            '</div>';
                //----------------------------------------------
                $("#html_contents").empty();

                $("#html_contents").append($contenuto);
               
                var video_player = document.getElementById("video_player"),
               
                links = video_player.getElementsByTagName('a');
                that=this;
              
                console.log(this);
                for (var i=0; i<links.length; i++) {
                    links[i].onclick = handler;
                }

              
            
        }
        function handler(e,row) {

            e.preventDefault();
            console.log(that);
            console.log(this);
            console.log(row);
            if(row){
               tit = document.querySelector("#tit");
                tit.innerHTML =row.titolo;  
               videotarget =row.link;   
            }else{
                tit = document.querySelector("#tit");
                tit.innerHTML=this.children[0].getAttribute("title");
                videotarget = this.getAttribute("href");
            }
          
            console.log(tit);
            
            function handleEvent(event) {
                var inco="incomplete";
                var dataxx="";
                switch (event.type) {
                    case "play":
                        dataxx=new Date();
                        timeStarted = new Date().getTime()/1000;
                        
                        break;
                    case "pause":
                    case "ended":
                        
                        if(timeStarted>0) {
                            var playedFor = new Date().getTime()/1000 - timeStarted;
                            timeStarted = -1;
                            // add the new number of seconds played
                            timePlayed+=playedFor;
                          }
                          if(timePlayed>=duration && event.type=="ended") {
                           inco="complete";
                          }
                          dataxx=new Date();
                        break;        
                
                    default:
                        break;
                }
              //  eventLog.textContent += `${event.type}\n`;
                console.log('AA',dataxx,event.type,timeStarted,timePlayed,inco);
            }
               
            console.log(videotarget);
            filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
            console.log(filename);
            var  video =  $('#video_player video');
            var timeStarted = -1;
            var timePlayed = 0;
            var duration = 0;
            video.off('play');
            video.off('pause');
            video.off('ended');
           // video.removeEventListener("play", handleEvent);
          //  video.addEventListener("loadstart", handleEvent);
          //  video.addEventListener("progress", handleEvent);
          video.on('ended',handleEvent);
          video.on('pause',handleEvent);
            video.on('play',handleEvent);
            //video.removeAttribute("controls");
            
          //  video.removeAttribute("poster");
          videoSrc = $('source', video).attr('src', filename + ".mp4");
          //  source = document.querySelectorAll("#video_player video source");
           // source[0].src = filename + ".mp4";
            //source[1].src = filename + ".webm";
            video[0].load();
            video[0].play();    
    } 

        //--------------------------------------------------------------------------------------  
        // update and delete events
     
        function showModal(title, row) {
            var t=this;
      
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
                comune: 0  /*,
               email:[{id:'',
                emailNome: '',
                email: ''}],
                telefoni:[{id:'',
                telefonoNome: '',
                telefonoNumero: ''}]*/
            }; // default row value
            console.log("title=" + title + " row=" + _.keys(row)+_.values(row));
            $modal.data('id', row.id);
            $modal.find('.modal-title').text(title);
          
            if(app.global.nick_array.arr !== "DEPARTMENTS"){
               
                for (var name in row) {
                    console.log("title=" + name);
                    if(name=="description"){

                        $modal.find('label[id="lbl' +name + '"]').html("Descrizione");
                        $modal.find('input[id="' +name + '"]').attr( "placeholder", "Descrizione");
                    }
                    if(name=="shortDescription"){

                        $modal.find('label[id="lbl' +name + '"]').html("Descrizione breve");
                        $modal.find('input[id="' +name + '"]').attr( "placeholder", "Descrizione breve");
                    }
                  
                }
            }
                
             
            for (var name in row) {
                if(name=="valid"){
                    $modal.find('input[name="valid"]').prop("checked", row[name]);
                }else if(name==="telefoni")
                    
                    {
                      
                        console.log("telefoniL=" + row[name].length);
                        for ($i = 0; $i <row[name].length; $i++) {
                            $iTel=$i;
                            console.log("telefoni i=" + $iTel);
                            $("#telefoni").append(  
                                    
                                '<div class="row">'+
                                     '<input type="hidden" class="form-control" name="telefoni['+$i+'][id]" id="telefoni['+$i+'][id]" value="'+row[name][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                    // '<label id="lblTelefono'+$iTel+'" for="telefono'+$iTel+'">Telefono</label>'+
                                    '<input type="text" class="form-control" name="telefoni['+$i+'][telefono]" id="telefoni['+$i+'][telefonoNumero]" value="'+row[name][$i]['telefonoNumero']+'" placeholder="Telefono" col-lg-7>'+


                                    '</div>'+
                                     '<div class="form-group col-lg-3">'+
                                       // '<label id="lbltelefonoNome'+$iTel+'" for="telefonoNome'+$iTel+'">Nome Telefono</label>'+
                                        '<input type="text" class="form-control" name="telefoni['+$i+'][telefonoNome]" id="telefoni['+$i+'][telefonoNome]" value="'+row[name][$i]['telefonoNome']+'" placeholder="Nome Telefono">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                     //   '<label >Del</label>'+

                                    '<a class="removeTel'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Tel"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            );
                            $('.removeTel'+$iTel).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= $modal.find('input[name="telefoni['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="telefoni";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                                $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"telefoni["+$i+"][telefono]\"]").rules( "add", {
                                required: true,
                               minlength: 6,
                                number: true,
                                
                                messages: {
                                  required: "Perfavore inserisci il numero di telefono",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  number:"Deve essere un numero di Telefono  valido!"
                                }
                              });
                        
                            //   $modal.find('input[name="telefoni['+$i+'][id]"]').val(row[name][$i]['id']); 
                            
                            //  $modal.find('input[name="telefoni['+$i+'][telefono]"]').val(row[name][$i]['telefonoNumero']); 
                            //    $modal.find('input[name="telefoni['+$i+'][telefonoNome]"]').val(row[name][$i]['telefonoNome']); 
                            //  console.log('input[name="telefono' + $iTel  + '"]='+row[name][$i]['telefonoNumero'])
                        }
                       
                    
                    }else if(name==="email" ){    
                    
                        for ($i = 0; $i <row[name].length; $i++) {
                            $iEmail=$i;
                           
                            $("#email").append(  
                                    
                                '<div class="row">'+
                                    '<input type="hidden" class="form-control" name="email['+$i+'][id]" id="email['+$i+'][id]" value="'+row[name][$i]['id']+'">'+  
                       
                                    '<div class="form-group col-lg-8">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][email]" id="email['+$i+'][email]" value="'+row[name][$i]['email']+'" placeholder="Email" col-lg-7>'+
                                    '</div>'+
                                    '<div class="form-group col-lg-3">'+
                                        '<input type="text" class="form-control" name="email['+$i+'][emailNome]" id="email['+$i+'][emailNome]" value="'+row[name][$i]['emailNome']+'" placeholder="Nome Email">'+
                                    '</div>'+
                                     '<div class="form-group col-lg-1">'+
                                      '<a class="removeEmail'+$i+'" idx="'+$i+'" href="javascript:" title="Delete Email"><i class="glyphicon glyphicon-remove-circle"></i></a>'+
                                    '</div>'+

                                '</div>'
                                //   '<hr class="style13">'   
                            );
                            $('.removeEmail'+$iEmail).click(function(e) {
                                $idx= $(this).attr("idx");
                                $idxi= $modal.find('input[name="email['+$idx+'][id]"]').val();
                               
                                $(this).closest(".row").remove();
                               
                                var jsonObj = {};
                                jsonObj.id=$idxi;
                                jsonObj.type="email";
                                jsonObj.action = "del";
                                jsonObj.person = app.global.tokensCollection.first().get("id_person");
                                jsonObj = JSON.stringify(jsonObj);
           
                                $.ajax({
                                   url:API_URL,
                                   type:'post',
                                   headers : $headers,
                                   data: jsonObj,
                                   dataType : 'text',
                                    success: function (json) {
                                       $mydata =JSON.parse(json);
                                   }           
                                });
                                   
                            });
                             $("#newModalForm").validate(); //sets up the validator
              
                       // $("input[name=\"telefoni["+$i+"][telefono]\"]").rules("add", "required");
                        $("input[name=\"email["+$i+"][email]\"]").rules( "add", {
                                required: true,
                               // minlength: 2,
                                email: true,
                                
                                messages: {
                                  required: "Required input",
                                  minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
                                  email:"Deve essere una email valida!"
                                }
                              });
                        
                        }
                    
                    
                    
                    
                    }else{
                       $modal.find('input[name="' + name + '"]').val(row[name]); 
                       console.log('input[name=' + name + ']='+row[name]);
                    }
                
                
            }
            for (var name in row) {
               
                    
                    console.log('select[name=' + name + ']='+row[name])
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
        function decodeEntities(encodedString) {
            var textArea = document.createElement('textarea');
            textArea.innerHTML = encodedString;
            return textArea.value;
          }

        $(document).attr("title",app.global.app_short_name+" - "+app.global.app_long_name+" | "+this.language.type+" | "+this.language.lang);
       
   
        return this
    }, //end render
 
   
    destroy_view:function(){

        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.data_type_editView=null

    }
   
})
return app.views.data_type_edit;
})