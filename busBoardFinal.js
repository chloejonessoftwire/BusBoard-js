const readline = require('readline-sync');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var request = new XMLHttpRequest()

console.log('Please enter a valid postcode:');
const postCode = readline.prompt();

getLongitudeLatitude(postCode);

function getLongitudeLatitude(postCode) 
{
  request.open('GET', `https://api.postcodes.io/postcodes/${postCode}` , false)
  request.onload = function () 
  {
    var postCodeData = JSON.parse(request.responseText);
  
    console.log(postCodeData)
    var longitude = postCodeData.result.longitude
    var latitude = postCodeData.result.latitude // not gonna pretend i know why, changing to var fixed the repeated long/lat

    console.log('Longitude:',longitude,'and latitude', latitude)
    getStopCode(longitude, latitude)
  } 
  
  request.send()
}


function getStopCode (longitude, latitude) 
{console.log('Check:  Longitude:',longitude,'and latitude', latitude) //i added this in to check they were being called correctly
  request.open('GET', `http://transportapi.com/v3/uk/places.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&lat=${latitude}&lon=${longitude}&type=bus_stop`, true) //chloe url
  console.log('Check URL:', `https://api.tfl.gov.uk/Stoppoint?lat=${latitude}lon=${longitude}&stoptypes=NaptanPublicBusCoachTram` ) // your url was broken i've replaced it with mine incl. my app id and key, this was your old one
  request.onload = function () 
  {
    var stopCodeData = JSON.parse(request.responseText);
   
    console.log('stop code data:',stopCodeData)
    console.log(stopCodeData[0]) // so basically idk why this doesnt work, if youre stuck look at mine! :) 
    //var stopCode = stopCodeData.stopPoints[0].naptanId

    //return stopCode;
    //here instead of return stopCode you'd call another function if required! 
    
  }
  
  request.send()
  }

