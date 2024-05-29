const db = require('../db');


function findLocation(streetAddress,houseNumber, city,postalCode,country){
    return db.oneOrNone('SELECT location_id from locations WHERE street_address =$1 AND locations.house_number =$2 AND city =$3 AND postal_code=$4 AND country=$5',
        [streetAddress,houseNumber,city,postalCode, country]);
}

function insertLocation(location){
    return db.one(
        'INSERT INTO locations (street_address, city, state, country, postal_code, latitude, longitude, additional_info, house_number) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING *',
        [
            location.street,
            location.city,
            location.state,
            location.country,
            location.postalCode,
            location.latitude,
            location.longitude,
            location.additionalInfo,
            location.houseNumber]);
}

function getAllLocations(){
    return db.any('SELECT * FROM locations');
}
function getLocationById(id){
    return db.oneOrNone('SELECT * FROM locations WHERE locations.house_number =$1',[id]);
}
function updateLocation(id, location){
    return db.oneOrNone(
        'UPDATE locations SET street_address = $1, house_number = $2, city = $3, state = $4, country = $5, postal_code = $6, latitude = $7, longitude = $8, additional_info = $9 WHERE location_id = $10 RETURNING *',
        [
            location.street,
            location.houseNumber,
            location.city,
            location.state,
            location.country,
            location.postalCode,
            location.latitude,
            location.longitude,
            location.additionalInfo,
            id
        ]
    );
}

function deleteLocation(id){
    return db.result('DELETE FROM locations WHERE location_id = $1',[id], r =>r.rowCount);
}
module.exports = {
    findLocation,
    insertLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getAllLocations
}