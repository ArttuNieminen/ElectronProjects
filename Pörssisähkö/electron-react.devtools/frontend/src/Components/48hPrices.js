import { React, useState, useEffect } from "react";

export default function Get48HourElecPrice() {
    //const [hourPrices, SetHourPrices] = useState({});


    const getHours = async () => {
        try {
            const result = await fetch(`http://localhost:5002/prices`, {
                method: 'GET'
              }).then(result => result.json());
            console.log(result.prices);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getHours();
    }, []);

    /*return (
        hourPrices
    );*/
}
