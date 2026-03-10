
  require(['app','appx'], function(app,appx){
  // console.log(jQuery().jquery,Backbone.VERSION,_.VERSION);
 // console.log(app);
  $("head").prepend(
  "<title>GLR</title>"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap.min.css\" >"+
  "<link rel=\"stylesheet\" href=\"css/ext/ie10-viewport-bug-workaround.css\" >"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-glyphicons.css\" 	media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-table.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-table-filter-control.min.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/dropzone.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/responsiveslides.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-select.min.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-datetimepicker.min.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/jquery.bootstrap-touchspin.min.css\" media=\"screen\">"+
  "<link rel=\"stylesheet\" href=\"css/ext/bootstrap-editable.css\" media=\"screen\">"+
  "<link rel=\"shortcut icon\" href=\"favicon.ico\" type=\"image/x-icon\">"+
  "<!--Meta Tag Specifici per OS Windows-->"+
  "<meta name=\"application-name\" content=\"GLR Gestione Logistica Remota\" />"+
  "<link rel=\"stylesheet\" href=\"css/app/style.css\" type=\"text/css\" />"+
  "<script type='text/javascript' src='js/lib/sha512.js'></script>"+
  "<script type='text/javascript' src='js/lib/moment-langs.min.js'></script>"+
   "<script type='text/javascript' src='js/lib/moment-with-locales.min.js'></script>"
  
);
$("body").append(
  "<noscript><img src='css/img/ind.jpg' width='600' /><br> &nbsp;&nbsp;I'm sorry, GLR Gestione Logistica Remota require <b>javascript enabled</b></noscript>"+
  "<div id='scriptBundle'>"+
  "<script type='text/javascript' src='https://use.fontawesome.com/releases/v5.12.0/js/all.js' data-auto-replace-svg='nest'></script>"+
  "<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'></script>"+
  "<script src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js' integrity='sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/' crossorigin='anonymous'></script>"+
"</div>"+
"<div id='wrap'>"+
"<div id='navbar_content'></div>"+
"<div id='content'></div>"+
"<div id='push'></div>"+
"</div>"+
"<div id='footer_content'></div>"

  );
 
  });
 
 
 