import {useEffect, useState} from 'react';

const getAllFromTable = async () => {
    try {

        const table = "Kurssi"

        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json());

        console.log(result)
        //return result;

    } catch (error) {
        console.error('Error:', error);
    }
};

useEffect(() => {
    getAllFromTable();
  }); // 👈️ empty dependencies array


export default getAllFromTable;