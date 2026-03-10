
require(['app'],function(app){

 var vent = {}; // or App.vent depending how you want to do this
            _.extend(vent, Backbone.Events);
            $(function() {
                if (checkBrowser()) {
                   if (checkCookie()) {
                      app.utils.init(true);       /** www startup **/
                    }
                    else {
                    $("#content").append("<img src='css/img/logo.png' width='600'/>");
                    alert("I'm sorry, GLR requires that cookies are enabled.");
                    }
                }
                else {
                    $("#content").append("<img src='css/img/logo.png' width='600'/>");
                    alert("I'm sorry, is not compliant with your IE version. Upgrade it or use another browser like Firefox, Chrome or Safari.");
                }

            //check for browser compatibility
            function checkBrowser() {
                var ver = -1; // Return value assumes failure.
                var ret = true;
                if (navigator.appName ==='Microsoft Internet Explorer')
                {
                    var ua = navigator.userAgent;
                    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) !== null)
                        ver = parseFloat( RegExp.$1 );
                }
                if ( ver > -1 )     {
                    if ( ver < 8.0 )
                        ret = false;
                }
                return ret;
            }

            //check for coockie enabled
            function checkCookie()  {
                var cookieEnabled=(navigator.cookieEnabled)? true : false;
                if (typeof navigator.cookieEnabled==="undefined" && !cookieEnabled){
                    document.cookie="testcookie";
                    cookieEnabled=(document.cookie.indexOf("testcookie")!==-1)? true : false;
                }
                return (cookieEnabled) ? true : false;
            }

        });
    });

