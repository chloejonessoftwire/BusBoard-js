
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var ATCORequest = new XMLHttpRequest();

ATCORequest.responseType='json';
ATCORequest.open('GET', 'http://transportapi.com/v3/uk/places.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36&lat=51.534121&lon=-0.006944&type=bus_stop', true)

ATCORequest.onreadystatechange = function () {
    //console.log(ATCORequest.status)
    if (ATCORequest.readyState === 4) {
        let ATCOResponse={};
        ATCOResponse=ATCORequest.responseText;
        //console.log(ATCORequest.readyState);
        //console.log(ATCOResponse);
        var JSONATCOResponse=JSON.parse(ATCOResponse)
        //console.log(JSONATCOResponse)
        var ATCOCode=JSONATCOResponse['member'][0]['atcocode']
        console.log('ATCO Code to input:',ATCOCode);

     }};


ATCORequest.send()


//to find bus stops ATCO codes

//http://transportapi.com/v3/uk/places.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36&lat=51.534121&lon=-0.006944&type=bus_stop

//to find bus depature information

//http://transportapi.com/v3/uk/bus/stop/{490003025W}/{date}/{time}/timetable.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36

