const axios = require("axios");
const HERE_API_KEY = process.env.HERE_API_KEY;
const BASE_URL = 'https://geocode.search.hereapi.com/v1/geocode'

async function geocodeAddress({street, houseNumber, city, postalCode, country }){
    const qqParams = `street=${street};houseNumber=${houseNumber};city=${city};postalCode=${postalCode};country=${country}`;
    try {
        const response = await axios.get(BASE_URL,{
            params:{
                qq:qqParams,
                apiKey: HERE_API_KEY,
            }
        });

        if(response.data.items && response.data.items.length > 0){
            const {lat, lng} = response.data.items[0].position;
            return {latitude:lat, longitude:lng};
        } else{
            throw new Error("No geolocation found for the specified address.");
        }
    }catch(error){
        console.error('Failed to geocode address: ', error);
        throw error;
    }
}

module.exports = {
    geocodeAddress
}