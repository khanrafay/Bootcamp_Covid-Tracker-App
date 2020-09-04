import React from 'react';
import { Pie } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';


const PieChart = ({ statistics }) => {
    const key = (Object.keys(statistics).map((key, ind) => key.replace(/_/g, " ")));
    const keyValue = (Object.keys(statistics).map((key, ind) => statistics[key]));
    
    let randomColors = randomColor({ count: '9', hue: "random" });
    const data = {
        labels: key,
        datasets: [{
            data: keyValue,
            backgroundColor: randomColors,
            hoverBackgroundColor: randomColors
        }]
    };

    return (
        <div>

            <Pie data={data} className="pie"/>
        </div>
    );
}

export default PieChart;