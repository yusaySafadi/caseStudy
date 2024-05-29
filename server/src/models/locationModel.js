const db = require('../db');

function findLocation(streetAddress,houseNumber, city,postalCode,country){
    return db.oneOrNone('SELECT location_id from locations WHERE street_address =$1 AND locations.house_number =$2 AND city =$3 AND postal_code=$4 AND country=$5',
        [streetAddress,houseNumber,city,postalCode, country]);
}

function insertLocation(streetAddress,city,state,country, postalCode,latitude,longitude, additionalInfo, house_number){
    return db.one('INSERT INTO locations (street_address, city, state, country, postal_code, latitude, longitude, additional_info, house_number) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)',
        [streetAddress,city,state,country, postalCode,latitude,longitude, additionalInfo, house_number]);
}

module.exports = {
    findLocation,
    insertLocation
}