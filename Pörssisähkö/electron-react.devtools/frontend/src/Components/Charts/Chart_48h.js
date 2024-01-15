import "../../App.css";
import chartdata from "./Chart_48hData";
import React from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const options = {
    plugins: {
        title: {
            display: true,
            text: "Pörssi sähkö 48h"
        },
        legend: {
            onClick: null
        },
    },
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        x: {
            beginAtZero: true,
            min: 0,
            max: 25,
        },
        y: {
            beginAtZero: true,
            min: 0,
            max: 48,
            barPercentage: 1, // Adjust the bar thickness (e.g., 50% of the available space)
            categoryPercentage: 0.8, // Adjust the gap between bars (e.g., 80% of the available space)
        },
    },
};
export default function BarPrices() {
    return (
        <div className="Chart_BaseLook" style={{ width: '1000x', height: '1000px' }} >
            <Chart type="bar" data={chartdata}
                options={options} />
        </div>
    );
}
