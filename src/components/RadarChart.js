import React from 'react';
import { Radar } from 'react-chartjs-2';





const RadarChart = ({ selectedCountry }) => {

    const countryKey = selectedCountry && Object.keys(selectedCountry).map(key => key)
    const countryValue = selectedCountry && Object.keys(selectedCountry).map(key => selectedCountry[key])
   


    const data = {
        labels: countryKey,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: countryValue
            }
        ]
    };
    return (<div>
        <h2>Radar Example</h2>
        <Radar data={data} />
    </div>);
}

export default RadarChart;