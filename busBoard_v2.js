const readline = require('readline-sync');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

regexPostcodeCheck()
function regexPostcodeCheck()
{
    console.log('Please input your postcode with no spaces and lowercase. (e.g. DE45 1BB would be inputted as de451bb)');
    var userPostcode=''
    const regex= /^([a-z]{1,2}\d[a-z\d]?\d[a-z]{2}|GIR ?0A{2})$/g
    while (userPostcode.match(regex)==null)

    { userPostcode=readline.prompt();
      try
      { 
        if (userPostcode.match(regex)==null)
        {
          throw 'invalid postcode'
        }
      }
      catch(e)
      {
        console.log('Invalid postcode: Please input your postcode with no spaces and lowercase (e.g. DE45 1BB would be inputted as de451bb)')
      }
    }
    console.log(`Your inputted postcode is: ${userPostcode}`) 
    postcodeValidation(userPostcode)
    
}

function postcodeValidation(userPostcode)
{
    const postcodeValidationRequest = new XMLHttpRequest();
    const postcodeValidationURL = `http://api.postcodes.io/postcodes/${userPostcode}/validate`
    postcodeValidationRequest.responseType = 'json';
    postcodeValidationRequest.open('GET', postcodeValidationURL);
    postcodeValidationRequest.onreadystatechange = () => {
        console.log(postcodeValidationRequest.readyState);
        if (postcodeValidationRequest.readyState === 4) {
            let postcodeValidation = JSON.parse(postcodeValidationRequest.responseText);
            console.log(postcodeValidation)

            if (!postcodeValidation.result) {
                console.log('The postcode you entered doesn\'t exsist')
            }
            else {
                postcodeGeoLoc(userPostcode)
            }
        }
    }
    postcodeValidationRequest.send();
}


function postcodeGeoLoc(userPostcode)
{
    const postcodeGeoLocRequest = new XMLHttpRequest();
    const postcodeGeoLocURL = `http://api.postcodes.io/postcodes/${userPostcode}`
    postcodeGeoLocRequest.responseType = 'json';
    postcodeGeoLocRequest.open('GET', postcodeGeoLocURL);
    postcodeGeoLocRequest.onreadystatechange = () => {

        if (postcodeGeoLocRequest.readyState === 4) {
            let postcodeGeoLoc = JSON.parse(postcodeGeoLocRequest.responseText);

            console.log(postcodeGeoLoc);

            let postcodeLong = postcodeGeoLoc.result.longitude;
            let postcodeLat = postcodeGeoLoc.result.latitude;

            console.log(postcodeLat + ' and ' + postcodeLong);

            twoClosestBusStop(postcodeLat, postcodeLong);
        }
    }

    postcodeGeoLocRequest.send();
}




function twoClosestBusStop(postcodeLat, postcodeLong)
{
    const nearStopRequest = new XMLHttpRequest();
    const nearStopsURL = `http://transportapi.com/v3/uk/places.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&lat=${postcodeLat}&lon=${postcodeLong}&type=bus_stop`

    console.log(nearStopsURL);
    nearStopRequest.responseType = 'json';
    nearStopRequest.open('GET', nearStopsURL);
    nearStopRequest.onreadystatechange = () => {

        if (nearStopRequest.readyState === 4) {

            let nearStops = JSON.parse(nearStopRequest.responseText);
            console.log(nearStops);

            let firstStop = ''

            let firstStopName = ''


            if (nearStops.member.length === 0) {
                console.log('There are not bus stops close by.')
            }

            for (let i = 0; i < nearStops.member.length && i < 2; i++) {
                firstStop = nearStops.member[i].atcocode
                firstStopName = nearStops.member[i].name
                BusTimesForOneStop(firstStop, firstStopName);

            }

        }
    }
    nearStopRequest.send();
}






function BusTimesForOneStop(busStopCode, busStopName){
    const busTimeRequest = new XMLHttpRequest();
    const busTimeUrl = `https://transportapi.com/v3/uk/bus/stop/${busStopCode}/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes`

    busTimeRequest.responseType = 'json';
    busTimeRequest.open('GET', busTimeUrl);
    busTimeRequest.onreadystatechange = () => {

        if (busTimeRequest.readyState === 4) {
            let busTimeResponse = JSON.parse(busTimeRequest.responseText);

            let presentBusLines = Object.getOwnPropertyNames(busTimeResponse.departures); //this is an array of string
            console.log(presentBusLines);

            if (presentBusLines.length === 0) {
                console.log('They are no sheduled departures.')
            }

            for (let i = 0; i < presentBusLines.length; i++) {
                let lineDepartures = busTimeResponse.departures[presentBusLines[i]]

                let nextDepartures = []
                for (let j = 0; j < lineDepartures.length; j++) {
                    nextDepartures.push(lineDepartures[j].expected_departure_time)

                }

                if (nextDepartures.length > 0) {
                    console.log(`The next departures times for line ${presentBusLines[i]} at ${busStopName} are ${nextDepartures}.`)
                }

                else {
                    console.log('There is no expected departure for this bus.')
                }

            }

        }
    }


    busTimeRequest.send();

}