
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const readline = require('readline-sync');

function regexPostcodeCheck()
{
    console.log('Please input your postcode with no spaces and lowercase. (e.g. DE45 1BB would be inputted as de451bb)');
    var postcode=''
    const regex= /^([a-z]{1,2}\d[a-z\d]?\d[a-z]{2}|GIR ?0A{2})$/g
    while (postcode.match(regex)==null)

    { postcode=readline.prompt();
      try
      { 
        if (postcode.match(regex)==null)
        {
          throw 'invalid postcode'

        }
      }
      catch(e)
      {
        console.log('Invalid postcode: Please input your postcode with no spaces and lowercase (e.g. DE45 1BB would be inputted as de451bb)')
      }
    }
    console.log(`Your inputted postcode is: ${postcode}`) 
    postcodeLongLat(postcode)
}

regexPostcodeCheck()

function postcodeLongLat(postcode)
{
    var LongLatRequest = new XMLHttpRequest();

    LongLatRequest.responseType='json';
    LongLatRequest.open('GET', `http://api.postcodes.io/postcodes/${postcode}`, true)

    LongLatRequest.onreadystatechange = function () 
    {

        if (LongLatRequest.readyState === 4) 
        {
            let LongLatResponse={};
            LongLatResponse=LongLatRequest.responseText;
            var JSONLongLatResponse=JSON.parse(LongLatResponse)
            var longitude=JSONLongLatResponse['result']['longitude']
            var latitude=JSONLongLatResponse['result']['latitude']
            console.log('Longitude:', longitude, ', Latitude:', latitude)
            longlatATOC(postcode, longitude, latitude)

        }
    };
    LongLatRequest.send()
    
  }

function longlatATOC(postcode, longitude, latitude)
{
    var ATCORequest = new XMLHttpRequest();
    ATCORequest.responseType='json';
    ATCORequest.open('GET', `http://transportapi.com/v3/uk/places.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36&lat=${latitude}&lon=${longitude}&type=bus_stop`, true)

    ATCORequest.onreadystatechange = function () 
    {
        if (ATCORequest.readyState === 4) {
            let ATCOResponse={};
            ATCOResponse=ATCORequest.responseText;
            var JSONATCOResponse=JSON.parse(ATCOResponse)
            var ATCOCode1=JSONATCOResponse['member'][0]['atcocode']
            var ATCOCode2=JSONATCOResponse['member'][1]['atcocode']
            console.log('Nearest two bus stops ATCO codes to input:', ATCOCode1,',', ATCOCode2);

        }
    }
    ATCORequest.send()
}





//to find bus stops ATCO codes

//http://transportapi.com/v3/uk/places.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36&lat=51.534121&lon=-0.006944&type=bus_stop

//to find bus depature information

//http://transportapi.com/v3/uk/bus/stop/{490003025W}/{date}/{time}/timetable.json?app_id=b6378be6&app_key=3452b0e10264a506211e8609d6083b36

