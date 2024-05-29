const db = require('../db');

function getAllCuisines(){
    return db.any('SELECT * FROM cuisines');
}

function getCuisineById(id){
    return db.oneOrNone('SELECT * FROM cuisines where cuisine_id = $1', [id]);
}

function updateCuisines(id,cuisine){
    return db.oneOrNone('UPDATE cuisines SET name=$1 WHERE cuisine_id = $2',[cuisine.name,id])
}
function deleteCuisine(id){
    return db.result('DELETE FROM cuisines WHERE cuisine_id=$1', [id]);
}

module.exports = {
    getAllCuisines,
    getCuisineById,
    deleteCuisine,
    updateCuisines
}