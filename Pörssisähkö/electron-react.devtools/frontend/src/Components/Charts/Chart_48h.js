import "../../App.css";
import chartdata from "./Chart_48hData";
import React from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const options = { 
    plugins:{
        title: {
            display: true,
            text: "Pörssi sähkö 48h"
        },
        legend: {
            onClick: null
        },
    }
};


export default function Bar(){
    return (
        <div className="Chart_BaseLook">
            <Chart type="bar" data={chartdata} options={options} />
        </div>
    );
}


