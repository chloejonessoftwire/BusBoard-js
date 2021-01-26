
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var LongLatRequest = new XMLHttpRequest();

LongLatRequest.responseType='json';
LongLatRequest.open('GET', 'http://api.postcodes.io/postcodes/de451bb', true)

LongLatRequest.onreadystatechange = function () {
    //console.log(LongLatRequest.status)
    if (LongLatRequest.readyState === 4) {
        let LongLatResponse={};
        LongLatResponse=LongLatRequest.responseText;
        //console.log(LongLatRequest.readyState);
        //console.log(LongLatResponse);
        var JSONLongLatResponse=JSON.parse(LongLatResponse)

        longitude=JSONLongLatResponse['result']['longitude']
        latitude=JSONLongLatResponse['result']['latitude']
        console.log(longitude)
        console.log(latitude)
        

     }};


LongLatRequest.send()


//to find bus stops ATCO codes

//http://transportapi.com/v3/uk/places.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36&lat=51.534121&lon=-0.006944&type=bus_stop

//to find bus depature information

//http://transportapi.com/v3/uk/bus/stop/{490003025W}/{date}/{time}/timetable.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36

