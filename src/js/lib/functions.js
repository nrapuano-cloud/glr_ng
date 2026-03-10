var API_URL_types = app.global.json_url + 'types/';

function $_headers () { 
   var $headers={"Authorization" : "Bearer " + app.global.tokensCollection.first().get("auth").token,
                "username" : app.global.tokensCollection.first().get("username"),
                "lang" : app.global.languagesCollection.at(0).get("lang"),
                "Content-Type": "application/json"
            };
            return $headers
        }
function _province(jsonObj){
    console.log("essie" + jsonObj.regione);
    console.log(jsonObj);
    $.ajax({
        url:API_URL_types,
        type:'post',
        headers : $_headers (),
        data: jsonObj,
        dataType : 'text',
        success: function (json) {
            $mydata =JSON.parse(json);
            console.log($mydata);
            return $mydata;
        },
        error: function (json) {
            $mydata =JSON.parse(json);
            console.log($mydata);
            return $mydata;
        }
    });
    
    
}
