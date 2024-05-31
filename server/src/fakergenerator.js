console.log(__dirname);
const { fakerDE:faker} = require('@faker-js/faker');
const pgp = require('pg-promise')();
const dbConfig ={
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'restaurant_case_study',
    user: 'postgres',
    password: 'conejo123',
};
const db = pgp(dbConfig);
async function generateFakeData(numLocations, numRestaurantsPerLocation) {
    try {
        for (let i = 0; i < numLocations; i++) {
            const streetName = faker.location.street();
            const city = faker.location.city();
            const state = faker.location.state();
            const country = 'Germany'; // Static country as Germany
            const postalCode = faker.location.zipCode();
            const latitude = faker.location.latitude({min:47.26171, max:55.05832, precision:5}); // Range for Germany
            const longitude = faker.location.longitude({min:5.86624, max:15.04176,precision: 5}); // Range for Germany

            // Insert location into the database
            const locationInsert = `INSERT INTO locations (Street_address, City, State, Country, postal_code, Latitude, Longitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING location_id`;
            const locationResult = await db.one(locationInsert, [`${streetName}`, `${city}`, `${state}`, `${country}`, `${postalCode}`, `${latitude}`, `${longitude}`]);

            for (let j = 0; j < numRestaurantsPerLocation; j++) {
                const restaurantName = faker.company.name();
                const description = faker.lorem.sentence();


                // Insert restaurant linked to the location
                const restaurantInsert = `INSERT INTO restaurants (Name, location_id, Description) VALUES ($1, $2, $3)`;
                await db.none(restaurantInsert, [restaurantName, j+1, description]);
            }
        }
    } catch (error) {
        console.error('Failed to generate fake data:', error);
    }
}

generateFakeData(70, 1); // Generate 10 locations each with 5 restaurants
