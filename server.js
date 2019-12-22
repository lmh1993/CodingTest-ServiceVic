//Install express server
const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
var ignoreCase = require('ignore-case');
const fs = require('fs');
var weatherData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 8080;


//local testing

app.listen(PORT, function(){
    console.log('Server running on localhost: ' + PORT)
});


// Serve the react files from the '/public' directory for deployment purpose
// app.use(express.static(__dirname + '/public'));
// app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname+'/public/index.html'));
// });

// Start the app by listening on port 8080
//     app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });


//testing api route
app.get('/api/test', function(req,res){
  res.send('hi from test')
});




// Generate API ROUTES BELOW

  /*  "/api/weatherdata"
   *    GET: finds all data
   */

  app.get("/api/weatherdata", function(req, res) {
        res.status(200).json(weatherData);
  });
  

  /*  "/api/weatherdata"  POST {searchstring: ''}
   *   POST: find cities with their name matched the substring in the request
   *   respond with {found: []}
   */
  app.post("/api/weatherdata", function(req, res) {
    const searchByName = req.body.searchstring;
    let founds = [];
    let indexes = [];
    let re = new RegExp(searchByName, 'i');
    weatherData.forEach(function(item, ix) {
        if (item.name.match(re)) {
          indexes.push(ix);
        }
    })
    indexes.forEach(function(item) {
        founds.push(weatherData[item]);
      })
    const result = {found: founds}
    res.status(200).json(result);
  });

  
  /*  "/api/weatherdata/:cityname" (assuming city name can be treated as id, 
   *  otherwise use http post method to search by city name.)
   *   GET: find weatherdata for a city by name
   */
  
  app.get("/api/weatherdata/:id", function(req, res) {
    const cityName = req.params.id;
    const found = weatherData.filter(data => ignoreCase.equals(data.name, cityName));
    if (found.length !== 0) {
        const data = found[0];
        res.status(200).json(data);
    } else {
        res.status(404).send('No data');
    }
  });






 