import { React, useState, useEffect } from "react";

export default function GetHourElecPrice() {
    const [hourPrice, SetHourPrice] = useState();


    const getHour = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            const dateAndTimeNow = new Date();
            const date = dateAndTimeNow.toISOString().split('T')[0];
            const hour = dateAndTimeNow.getHours();

            const result = await fetch(`http://localhost:5002/price/${date}/${hour}`, {
                method: 'GET'
              }).then(result => result.json());

            let {price} = result;
            SetHourPrice(price);
            console.log(price);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getHour();
    }, []);



    return (
        <div>

            <p>
                {hourPrice}
            </p>
        </div>
    );
}
