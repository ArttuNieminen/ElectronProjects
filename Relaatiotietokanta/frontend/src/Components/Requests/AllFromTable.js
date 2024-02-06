import {useEffect, useState} from 'react';

const getAllFromTable = async () => {
    try {
        const table = "Student"
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        console.log(result)
        //return result;
        return result[0].ID;
    } catch (error) {
        console.error('Error:', error);

    }    
};

export default getAllFromTable;