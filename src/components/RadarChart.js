import React from 'react';
import { Radar } from 'react-chartjs-2';





const RadarChart = ({ selectedCountry }) => {

    const filterStats = selectedCountry && (
        delete selectedCountry.continent,
        delete selectedCountry.updated,
        delete selectedCountry.countryInfo,
        delete selectedCountry.population
       )
        
    
       let countryKey = selectedCountry && Object.keys(selectedCountry).map((key, ind) => key)
       let countryValue = selectedCountry && Object.keys(selectedCountry).map((key, ind) => selectedCountry[key])
   
       let countryKey1 = selectedCountry &&  countryKey.filter(val => val !== 'country');
       let countryValue1 = selectedCountry && countryValue.filter(val => typeof val !== 'string');
    
       // let randomColors = selectedCountry && randomColor({ count: '23', hue: "random" });


    const data = {
        labels: countryKey1,
        datasets: [
            {
                label: 'Radar',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: countryValue1
            }
        ]
    };
    return (<div>
        <h2>Radar</h2>
        <Radar data={data} />
    </div>);
}

export default RadarChart;