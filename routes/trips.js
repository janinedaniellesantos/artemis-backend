// Here we are going to code the API!!!!
// REST application
// Our API works over HTTP
// Using request from the HTTP verbs:
// - POST
// - GET
// - PATCH / PUT
// - DELETE

// For the routes
let express = require('express');
let router = express.Router();
// For the Data Model
let tripSchema = require('../models/trips');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.post('/', (request, response, next) => {
    let newTrip = request.body;
    //console.log(request.body);
    if (!newTrip.tripName || !newTrip.tripDuration || !newTrip.trashGallon || !newTrip.trashLog){
        HandleError(response, 'Missing Info', 'Form data missing', 500);
    }
    else{
        let trip = new tripSchema({
            tripName: newTrip.tripName,
            tripDuration: newTrip.tripDuration,
            trashGallon: newTrip.trashGallon,
            trashLog: newTrip.trashLog
        });

        trip.save((error) => {
            if (error){
                response.send({"error": error});
            }else{
                response.send({"id": trip.id});
            }
        });
    }
});