const readline = require('readline-sync');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var request = new XMLHttpRequest()

console.log('Please a valid bus stop code:');
const stopCode = readline.prompt();
//stopCode = "490008660N"


// This function takes the orginal object an returns an array containing the values
// of the following properties ID and time to arrival
function busFilter (busData) {
  let busDataFilter = [];
     for (let i = 0; i < busData.length; i++) {
    //converts time to station in seconds to minutes
          let minsToStation = Math.round(busData[i].timeToStation/60)
     //console.log(busData[i].lineId)
     busDataFilter.push({'Bus Number': busData[i].lineId ,  
                        'Time to station in minutes': minsToStation})
     };
     return busDataFilter;
   }



//   //This part of the code makes the request to the API  
var URL = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`
function getBuses (method, URL) { 
   request.open('GET', URL , true)
   request.onload = function () {
          //the request is returned as a string JSON.parse converts it into an array of objects
     const busData = JSON.parse(request.responseText);
//         //console.log(typeof(busData))
console.log(busData)
        
     const nextBuses = busFilter(busData)
    //ensures that the array is no longer than 5 elements i.e. only prints next 5 buses
   nextBuses.length = 5;
   nextBuses.sort(function(a, b){return a - b});
     console.log(nextBuses)
     return nextBuses
//     // const nextBuses is an array of objects, each object containing the values of the 2 properties
//     // which we filtered using the busFilter function defined above.

    

    
   
            
 }

request.send()

  }

 getBuses('GET', URL)

